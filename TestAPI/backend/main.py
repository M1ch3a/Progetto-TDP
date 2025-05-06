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
    print("Richiesta API ricevuta!")  # Vedrai questo nei log
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "mafia OR camorra OR ndrangheta",
        "language": "it",
        "apiKey": NEWS_API_KEY,
    }
    try:
        response = requests.get(url, params=params)
        print("Stato NewsAPI:", response.status_code)  # Debug
        return response.json()
    except Exception as e:
        print("Errore:", str(e))  # Vedrai l'errore nei log
        return {"error": str(e)}
