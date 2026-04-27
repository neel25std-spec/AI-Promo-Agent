from playwright.sync_api import sync_playwright
import os
import time
from dotenv import load_dotenv

load_dotenv()

def post_to_twitter(post_text):
    username = os.getenv("TWITTER_USERNAME")
    password = os.getenv("TWITTER_PASSWORD")

    if not username or not password:
        raise Exception("X credentials are missing in backend configuration.")

    with sync_playwright() as p:
        # Launch headed browser so you can see if captchas appear
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Login
            page.goto("https://twitter.com/i/flow/login")
            
            # Enter Username
            page.wait_for_selector('input[autocomplete="username"]', timeout=15000)
            page.fill('input[autocomplete="username"]', username)
            page.get_by_role("button", name="Next").click()
            
            # Enter Password
            page.wait_for_selector('input[name="password"]', timeout=15000)
            page.fill('input[name="password"]', password)
            page.get_by_role("button", name="Log in").first.click()
            
            # Wait for home page (tweet textarea)
            page.wait_for_selector('[data-testid="tweetTextarea_0"]', timeout=20000)

            # Type tweet
            page.click('[data-testid="tweetTextarea_0"]')
            page.fill('[data-testid="tweetTextarea_0"]', post_text)
            time.sleep(1)
            
            # Click Post
            page.get_by_test_id("tweetButtonInline").click()
            
            # Wait for post to complete
            page.wait_for_timeout(3000)
            
            return True
        except Exception:
            # Take screenshot on failure for debugging
            page.screenshot(path="twitter_error.png")
            raise Exception("X posting failed due to a login or page interaction issue.")
        finally:
            browser.close()
