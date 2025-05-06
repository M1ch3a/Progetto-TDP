from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Configura CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Monta la cartella del frontend
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

NEWS_API_KEY = "29301ef09e5c426a96143b785681a53b"

@app.get("/news")
def get_mafia_news():
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "mafia OR camorra OR ndrangheta",
        "language": "it",
        "pageSize": 10,
        "sortBy": "publishedAt",
        "apiKey": NEWS_API_KEY,
    }
    response = requests.get(url, params=params)
    return response.json()
