import requests
from bs4 import BeautifulSoup

def scrape_website(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
            
        text = soup.get_text(separator=" ", strip=True)
        # Limit the text length so it doesn't overwhelm the LLM context
        return text[:10000]
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return ""
