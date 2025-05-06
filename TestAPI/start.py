import subprocess
import sys
import threading
import time
import os
import webbrowser

# 1. Installa i pacchetti richiesti
def install_requirements():
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    except Exception as e:
        print(f"Errore durante l'installazione dei pacchetti: {e}")
        sys.exit(1)

# 2. Avvia il backend FastAPI
def start_backend():
    subprocess.run([sys.executable, "-m", "uvicorn", "backend.main:app", "--reload"])

# Esegui l'installazione
install_requirements()

# Avvia il backend in un thread separato
threading.Thread(target=start_backend, daemon=True).start()

# 3. Attendi un attimo
time.sleep(2)

# 4. Avvia server HTTP per il frontend
os.chdir("frontend")
server_port = 5500
webbrowser.open(f"http://127.0.0.1:{server_port}/index.html")

# Rimani attivo col server statico
subprocess.run([sys.executable, "-m", "http.server", str(server_port)])
