from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="../frontend"), name="static")  # Modifica qui

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = "29301ef09e5c426a96143b785681a53b"

@app.get("/news")
async def get_mafia_news():  # Nota: aggiunto async
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "mafia OR camorra OR ndrangheta",
        "language": "it",
        "pageSize": 10,
        "sortBy": "publishedAt",
        "apiKey": NEWS_API_KEY,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Solleva un'eccezione per status 4xx/5xx
        return response.json()
    except Exception as e:
        return {"error": str(e)}
