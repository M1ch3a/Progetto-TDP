/**
 * DATI DI BACKUP
 * Array di oggetti contenente notizie predefinite da mostrare se l'API fallisce
 * Ogni oggetto rappresenta un articolo con:
 * - title: Titolo dell'articolo
 * - description: Descrizione/anteprima
 * - url: Link all'articolo completo
 * - urlToImage: URL dell'immagine associata
 * - source.name: Nome della fonte giornalistica
 * - publishedAt: Data di pubblicazione in formato ISO
 */
const backupNews = [
  {
    title: "Operazione anti-mafia nel Mediterraneo",
    description: "Blitz internazionale contro il traffico di droga coordinato dalla 'ndrangheta",
    url: "#", // Placeholder per il link
    urlToImage: "https://media.istockphoto.com/id/1199091755/it/foto/retro-mafia-gangster.jpg", 
    source: { name: "Interno" }, // Fonte giornalistica
    publishedAt: new Date().toISOString() // Data corrente
  }
  // Altri articoli possono essere aggiunti qui...
];

/**
 * FUNZIONE PRINCIPALE: loadNews()
 * Responsabile di:
 * 1. Mostrare uno stato di caricamento
 * 2. Effettuare la chiamata API alle news
 * 3. Gestire errori con fallback ai dati backup
 * 4. Visualizzare i risultati
 */
async function loadNews() {
  // 1. Seleziona il container HTML dove inserire le news
  const container = document.getElementById('news-container');
  
  // 2. Mostra l'indicatore di caricamento
  showLoadingState(container);

  try {
    
    // 3. Fetch dei dati sul sito hostato su Render
    
    const response = await fetch(
      `https://mafiawatch.onrender.com/news`
    );

    // 4. Verifica se la risposta è OK (status 200-299)
    if (!response.ok) throw new Error('Network response was not ok');
    
    // 5. Converti la risposta in JSON
    const data = await response.json();

    // 6. Mostra gli articoli (massimo 6) o fallback
    displayNews(
      container,
      data.articles?.length > 0 ? data.articles.slice(0, 6) : backupNews
    );

  } catch (error) {
    // 7. Gestione errori: log in console e fallback
    console.error('Error fetching news:', error);
    displayNews(container, backupNews);
  }
}

/**
 * FUNZIONE: showLoadingState()
 * Mostra un'animazione di caricamento nel container
 * @param {HTMLElement} container - Elemento HTML dove inserire lo spinner
 */

/*  
showLoadingState() // Mostra subito lo spinner (non aspetta)
loadNews()         // Fa il vero lavoro in background
   ↓
[API call...]     // Attende la risposta
   ↓
displayNews()     // Sostituisce lo spinner con i dati veri
*/
function showLoadingState(container) {
  // Template HTML con spinner Bootstrap e testo
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <p class="mt-3">Caricamento notizie in corso...</p>
    </div>
  `;
}

/**
 * FUNZIONE: displayNews()
 * Genera e inserisce le card delle notizie nel DOM
 * @param {HTMLElement} container - Elemento HTML di destinazione
 * @param {Array} articles - Array di articoli da visualizzare
 */
function displayNews(container, articles) {
  // 1. Mappa ogni articolo in HTML e unisci il tutto
  container.innerHTML = articles.map((article, index) => `
    <!-- Inizio Card (responsive: 2 colonne su tablet, 3 su desktop) -->
    <div class="col-md-6 col-lg-4 mb-4">
      
      <!-- Contenitore Card -->
      <div class="news-card">
        
        <!-- Sezione Immagine con Overlay -->
        <div class="position-relative overflow-hidden" style="height: 200px;">
          <!-- 
            Immagine articolo con fallback:
            1. Prima prova urlToImage
            2. Se manca, usa placeholder generico
            3. Se errore caricamento, sostituisci con placeholder di errore
          -->
          <img src="${article.urlToImage || 'https://via.placeholder.com/600x400?text=MAFIAWATCH'}" 
               class="w-100 h-100 object-fit-cover"
               alt="${article.title}"
               onerror="this.src='https://via.placeholder.com/600x400?text=Immagine+non+disponibile'">
          
          <!-- Overlay semi-trasparente per migliorare leggibilità testo -->
          <div class="position-absolute top-0 start-0 w-100 h-100" 
               style="background: linear-gradient(to top, rgba(10,15,15,0.9) 0%, transparent 50%);"></div>
        </div>
        
        <!-- Badge "NUOVO" solo per il primo articolo
            OPERATORE TERNARIO PER RENDERING CONDIZIONALE
  
            Struttura: condizione ? se_vero : se_falso   
            Nel nostro caso:
              - condizione: index === 0 (se è il primo articolo)
              - se_vero: mostra il badge "NUOVO" 
              - se_falso: stringa vuota '' (non mostra nulla)
         -->
        ${index === 0 ? `
        <div class="position-absolute top-0 end-0 m-2">
          <span class="news-badge">
            <i class="fas fa-star me-1"></i> NUOVO
          </span>
        </div>` : ''}
        
        <!-- Corpo della Card -->
        <div class="news-content">
          <!-- Titolo come link cliccabile -->
          <h3 class="news-title">
            <a href="${article.url || '#'}" 
               class="text-decoration-none text-white hover-underline" 
               target="_blank">
              ${article.title || 'Titolo non disponibile'}
            </a>
          </h3>
          
          <!-- Descrizione/anteprima -->
          <p class="news-excerpt">
            ${article.description || 'Descrizione non disponibile'}
          </p>
          
          <!-- Footer con Fonte e Data -->
          <div class="d-flex justify-content-between align-items-center small">
            <span class="text-gradient fw-bold">
              <i class="fas fa-newspaper me-1"></i> 
              ${article.source?.name || 'Fonte sconosciuta'}
            </span>
            <span class="text-white-50">
              ${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('it-IT') : 'Data sconosciuta'}
            </span>
          </div>
          
          <!-- Link "Leggi tutto" -->
          <a href="${article.url || '#'}" class="news-link mt-3">
            Leggi tutto <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `).join(''); // Converti array in stringa
}

/* 
  SPIEGAZIONE DEL CICLO DI ESECUZIONE PER 6 CARD:

  Questo codice viene eseguito 6 volte perché:
  
  1. articles.map() itera sull'array articles (che contiene 6 elementi)
  2. Per ogni articolo (index 0-5) viene generata una card
  3. La parte ${index === 0 ? ... : ''} viene valutata ogni volta perché:
     - È dentro la funzione di mappatura
     - Deve verificare per ogni card se è la prima (index 0)
  
  Flusso esecuzione:
  - Index 0: true → mostra il badge "NUOVO"
  - Index 1-5: false → inserisce stringa vuota ('')
  
  Nota: articles.slice(0, 6) garantisce sempre max 6 iterazioni
*/

/* 
  FUNZIONAMENTO COMPLETO DEL CODICE:

  1. PARTE INIZIALE:
  - Lo script riceve un array di 6 articoli (es. [art1, art2,..., art6])
  - articles.map() inizia a scorrere gli articoli uno per uno

  2. PER OGNI ARTICOLO (6 VOLTE):
  - Crea la struttura base della card
  - Controlla se è il PRIMO articolo (index === 0)
    - SE PRIMO: aggiunge il badge "NUOVO"
    - SE NON PRIMO: non aggiunge nulla (stringa vuota '')
  - Completa la card con titolo, descrizione, etc.

  3. RISULTATO FINALE:
  - Card 1 (index 0): con badge "NUOVO"
  - Card 2-6 (index 1-5): senza badge
  - Tutte le card hanno la stessa struttura, solo la prima è evidenziata
*/

// INIZIALIZZAZIONE: Avvia il caricamento quando il DOM è pronto
document.addEventListener('DOMContentLoaded', loadNews);
