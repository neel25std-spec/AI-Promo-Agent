from playwright.sync_api import sync_playwright
import os
import time
from dotenv import load_dotenv

load_dotenv()

def post_to_linkedin(post_text):
    username = os.getenv("LINKEDIN_USERNAME")
    password = os.getenv("LINKEDIN_PASSWORD")

    if not username or not password:
        raise Exception("LinkedIn credentials are missing in backend configuration.")

    with sync_playwright() as p:
        # Launch headed browser so you can see if captchas appear
        browser = p.chromium.launch(headless=False)
        # Persist auth to reduce repeated logins / checkpoints.
        storage_path = "linkedin_state.json"
        if os.path.exists(storage_path):
            context = browser.new_context(storage_state=storage_path)
        else:
            context = browser.new_context()
        page = context.new_page()

        try:
            # Login
            page.goto("https://www.linkedin.com/feed/")

            # If we aren't authenticated, go through login.
            if "login" in page.url or "checkpoint" in page.url:
                page.goto("https://www.linkedin.com/login")

            # Wait for login form to be ready (LinkedIn can vary selectors by locale/experiment)
            if "login" in page.url:
                # LinkedIn experiments/locales sometimes change attributes. Use broad, visible-only selectors.
                user_selector = (
                    "input#username, input[name='session_key'], input[name='email'], "
                    "input[autocomplete='username'], input[type='email'], input[type='text']"
                )
                pass_selector = "input#password, input[name='session_password'], input[type='password']"

                page.wait_for_selector(user_selector, timeout=20000)
                page.wait_for_selector(pass_selector, timeout=20000)

                page.locator(user_selector).filter(has_not=page.locator("[type='password']")).first.fill(username)
                page.locator(pass_selector).first.fill(password)
                page.locator("button[type='submit'], button:has-text('Sign in')").first.click()
            
            # Wait for login to complete by checking for home feed element
            try:
                page.wait_for_selector(
                    "div.share-box-feed-entry__closed-share-box, button:has-text('Start a post')",
                    # LinkedIn may require captcha/verification; give time for manual completion
                    # in the headed browser window.
                    timeout=120000,
                )
            except Exception:
                # Common blockers: captcha / 2FA / checkpoint screens
                current_url = page.url
                page.screenshot(path="linkedin_error.png")
                raise Exception(
                    "LinkedIn login did not reach the home feed. "
                    "If a verification/captcha prompt appeared in the opened browser window, "
                    "complete it and retry.\n"
                    f"Current URL: {current_url}"
                )
            else:
                # Save session after successful login (or session reuse)
                context.storage_state(path=storage_path)

            # Start post
            start_button = page.locator("button:has-text('Start a post'), div.share-box-feed-entry__closed-share-box").first
            start_button.click()
            
            # Wait for editor
            page.wait_for_selector("div.ql-editor", timeout=10000)
            
            # Type post
            page.fill("div.ql-editor", post_text)
            time.sleep(1) # Small pause to simulate human interaction
            
            # Click Post
            # Look for the primary action button (Post)
            page.locator("button.share-actions__primary-action:not([disabled])").click()
            
            # Wait for post to complete (toast notification or modal close)
            page.wait_for_timeout(3000)
            
            return True
        except Exception:
            # Take screenshot on failure for debugging
            page.screenshot(path="linkedin_error.png")
            raise Exception("LinkedIn posting failed due to a login or page interaction issue.")
        finally:
            browser.close()
