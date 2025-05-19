/**
 * PARTICLES.JS - SISTEMA AVANZATO DI PARTICELLE ANIMATE
 * 
 * Funzionalità principali:
 * 1. Crea effetti particellari interattivi
 * 2. Gestisce due configurazioni diverse (hero/simple)
 * 3. Pulisce la memoria quando non serve
 * 4. Si adatta al ridimensionamento
 */

// Array globale per memorizzare tutte le istanze create
let particlesInstances = [];

/**
 * FUNZIONE PRINCIPALE: initParticles()
 * Responsabilità: Inizializza gli effetti particellari
 */
function initParticles() {
  // 1. Prima pulisci le istanze esistenti per evitare memory leak
  destroyParticles();

  // 2. Configurazioni predefinite per i due tipi di effetti
  const particlesConfig = {
    // Configurazione per la HERO SECTION (complessa)
    hero: {
      particles: {
        // Numero particelle: 80 con densità proporzionale all'area
        number: { value: 80, density: { enable: true, value_area: 800 } },
        
        // Colori usati (tema arancione/giallo)
        color: { value: ["#FF6B35", "#FFBE0B", "#E05A2B"] },
        
        // Forma circolare
        shape: { type: "circle" },
        
        // Opacità: base 0.5, varia casualmente con animazione
        opacity: { 
          value: 0.5, 
          random: true, 
          anim: { 
            enable: true,   // Animazione attiva
            speed: 0.5,    // Velocità animazione
            opacity_min: 0.1 // Opacità minima
          } 
        },
        
        // Dimensione: base 3px, varia casualmente
        size: { 
          value: 3, 
          random: true, 
          anim: { 
            enable: true, 
            speed: 2, 
            size_min: 0.1 
          } 
        },
        
        // Linee di connessione tra particelle
        line_linked: { 
          enable: true,    // Linee attive
          distance: 150,  // Distanza massima per collegamento
          color: "#FF6B35", 
          opacity: 0.4, 
          width: 1 
        },
        
        // Movimento particelle
        move: { 
          enable: true,   // Movimento attivo
          speed: 1,      // Velocità base
          direction: "none", // Nessuna direzione privilegiata
          random: true,  // Movimento casuale
          straight: false // Non solo in linea retta
        }
      },
      
      // Interattività (risposta al mouse)
      interactivity: {
        detect_on: "canvas", // Rileva eventi sul canvas
        events: {
          onhover: { 
            enable: true, // Reagisce al passaggio mouse
            mode: "grab" // Modalità "afferra" (avvicina le particelle)
          },
          onclick: { 
            enable: true, // Reagisce al click
            mode: "push" // Modalità "spingi" (allontana le particelle)
          },
          resize: true // Si adatta al ridimensionamento
        },
        // Modalità disponibili
        modes: {
          grab: { 
            distance: 140, // Raggio di influenza
            line_linked: { opacity: 1 } // Linee più visibili
          },
          bubble: { 
            distance: 400, 
            size: 40, 
            duration: 2 
          },
          repulse: { 
            distance: 200, 
            duration: 0.4 
          },
          push: { 
            particles_nb: 4 // Numero particelle coinvolte
          },
          remove: { 
            particles_nb: 2 
          }
        }
      },
      retina_detect: true // Ottimizzazione per schermi Retina
    },

    // Configurazione SEMPLIFICATA per altre pagine
    simple: {
      particles: {
        number: { value: 150, density: { enable: true, value_area: 600 } },
        color: { value: ["#FFA500", "#FF8C00", "#FF6B00"] },
        shape: { 
          type: "circle", 
          stroke: { width: 0, color: "#000000" } // Senza bordo
        },
        opacity: { 
          value: 0.9, 
          random: true,
          anim: { 
            enable: true, 
            speed: 0.5, 
            opacity_min: 0.3, 
            sync: false 
          }
        },
        size: { 
          value: 4,
          random: true,
          anim: { 
            enable: true, 
            speed: 2, 
            size_min: 1, 
            sync: false 
          }
        },
        line_linked: { 
          enable: false // Nessuna connessione tra particelle
        },
        move: { 
          enable: true, 
          speed: 1,
          direction: "none", 
          random: true,
          straight: false,
          out_mode: "out", // Particelle escono dal bordo
          bounce: false // Non rimbalzano
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { 
            enable: true, 
            mode: "bubble" // Crea bolle al passaggio mouse
          },
          onclick: { 
            enable: true, 
            mode: "push" 
          },
          resize: true
        },
        modes: {
          bubble: { 
            distance: 200, 
            size: 6, 
            duration: 2, 
            opacity: 0.8, 
            speed: 1 
          },
          push: { 
            particles_nb: 4 
          }
        }
      },
      retina_detect: true
    }
  };

  // INIZIALIZZAZIONE HERO PARTICLES (solo homepage)
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    if (document.getElementById('hero-particles')) {
      // Crea l'istanza particlesJS con configurazione hero
      const heroInstance = particlesJS('hero-particles', particlesConfig.hero);
      // Salva l'istanza per poterla distruggere dopo
      particlesInstances.push(heroInstance);
      
      // Stile personalizzato per il container
      const heroContainer = document.getElementById('hero-particles');
      heroContainer.style.position = 'absolute'; // Posizionamento assoluto
      heroContainer.style.zIndex = '1'; // Sopra lo sfondo ma sotto il contenuto
    }
  }

  // INIZIALIZZAZIONE SIMPLE PARTICLES (tutte le pagine)
  if (document.getElementById('simple-particles')) {
    const simpleInstance = particlesJS('simple-particles', particlesConfig.simple);
    particlesInstances.push(simpleInstance);
    
    const simpleContainer = document.getElementById('simple-particles');
    simpleContainer.style.position = 'fixed'; // Fissa rispetto alla viewport
    simpleContainer.style.zIndex = '-1'; // Sotto tutto il contenuto
    simpleContainer.style.pointerEvents = 'none'; // Ignora interazioni mouse
  }
}

/**
 * DISTRUGGI PARTICLES - Pulisce tutto in memoria
 */
function destroyParticles() {
  // Per ogni istanza registrata...
  particlesInstances.forEach(instance => {
    try {
      // Se l'istanza esiste e ha il metodo di distruzione...
      if (instance && instance.pJS && typeof instance.pJS.fn.vendors.destroypJS === 'function') {
        // Chiama il distruttore della libreria
        instance.pJS.fn.vendors.destroypJS();
      }
      // Rimuovi manualmente il canvas dal DOM
      if (instance && instance.pJS && instance.pJS.canvas && instance.pJS.canvas.el) {
        instance.pJS.canvas.el.remove();
      }
    } catch (e) {
      console.error('Errore nella distruzione delle particles:', e);
    }
  });
  // Svuota l'array delle istanze
  particlesInstances = [];
}

/**
 * SETUP NAVIGAZIONE - Gestione speciale per la Home
 */
function setupNavigation() {
  // Seleziona tutti i link che puntano alla home
  document.querySelectorAll('a[href="index.html"], a[href="/"]').forEach(link => {
    // Aggiungi un listener per il click
    link.addEventListener('click', function(e) {
      // Se siamo già nella home...
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Previeni il comportamento normale
        e.preventDefault();
        // Pulisci le particles
        destroyParticles();
        // Dopo 50ms ricarica la pagina (timeout per sicurezza)
        setTimeout(() => {
          window.location.href = link.href;
        }, 50);
      }
    });
  });
}

// ==================== EVENT LISTENER ====================

// Quando il DOM è completamente caricato...
document.addEventListener('DOMContentLoaded', function() {
  initParticles(); // Inizializza le particles
  setupNavigation(); // Configura la navigazione
});

// Quando la finestra viene ridimensionata...
window.addEventListener('resize', function() {
  initParticles(); // Reinizializza per adattarsi
});

// Prima che la pagina venga chiusa...
window.addEventListener('beforeunload', function() {
  destroyParticles(); // Pulisci tutto
});