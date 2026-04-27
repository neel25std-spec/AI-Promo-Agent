import os
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright


def main() -> None:
    """
    One-time helper:
    - Opens a headed browser
    - Lets you complete LinkedIn login/verification manually
    - Saves session cookies/localStorage to linkedin_state.json

    After this succeeds, linkedin_service.py will reuse linkedin_state.json
    and should be able to post without re-auth each time.
    """
    _ = load_dotenv()

    storage_path = "linkedin_state.json"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        try:
            _ = page.goto("https://www.linkedin.com/login")
            print("Complete LinkedIn login in the opened browser window.")
            print("If you see captcha/2FA/checkpoint, finish it.")
            print("Waiting for LinkedIn feed to load...")

            _ = page.wait_for_selector(
                "div.share-box-feed-entry__closed-share-box, button:has-text('Start a post')",
                timeout=300000,
            )

            _ = context.storage_state(path=storage_path)
            print(f"Saved LinkedIn session to: {os.path.abspath(storage_path)}")
        finally:
            browser.close()


if __name__ == "__main__":
    main()

