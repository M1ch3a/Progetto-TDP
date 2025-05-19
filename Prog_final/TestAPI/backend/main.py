from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

# Istanzia l'applicazione FastAPI
app = FastAPI()

# ===================== CORS Middleware =====================
# Configura il middleware CORS per consentire richieste cross-origin.
# In questo caso, tutte le origini sono permesse (allow_origins=["*"]),
# ma in ambiente di produzione è consigliato specificare solo il dominio del frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In produzione: sostituire con l'URL reale del frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permette tutti i metodi HTTP (GET, POST, ecc.)
    allow_headers=["*"],  # Permette tutti gli header
)

# ===================== Configurazione API Key =====================
# Chiave API per accedere al servizio NewsAPI.
# ATTENZIONE: Non lasciare chiavi sensibili hardcodate in produzione.
NEWS_API_KEY = "29301ef09e5c426a96143b785681a53b"

# ===================== Endpoint: /news =====================
@app.get("/news")
def get_mafia_news():
    """
    Recupera le ultime notizie relative a mafia, camorra e ndrangheta tramite NewsAPI.
    - Query: cerca articoli che contengano almeno uno dei termini specificati.
    - Lingua: italiano.
    - pageSize: limita a 10 risultati.
    - sortBy: ordina per data di pubblicazione (dal più recente).
    - apiKey: autenticazione tramite chiave API.
    Restituisce la risposta JSON fornita da NewsAPI.
    """
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "mafia OR camorra OR ndrangheta",  # Termini di ricerca
        "language": "it",                       # Solo articoli in italiano
        "pageSize": 10,                         # Numero massimo di risultati
        "sortBy": "publishedAt",                # Ordina per data di pubblicazione
        "apiKey": NEWS_API_KEY,                 # Chiave API per autenticazione
    }
    response = requests.get(url, params=params)  # Effettua la richiesta HTTP a NewsAPI
    return response.json()                       # Restituisce la risposta in formato JSON