/**
 * EFFETTO NAVBAR AL SCROLL
 * Aggiunge/rimuove la classe 'scrolled' alla navbar quando si scrolla la pagina
 * Viene attivato dopo 50px di scroll per migliorare le performance
 */
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  // Aggiunge la classe 'scrolled' se lo scroll supera 50px, altrimenti la rimuove
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function() {
  /**
   * GESTIONE CLICK SU LINK HOME
   * Comportamento speciale quando si clicca sul link della home:
   * - Se siamo già nella home, previene il ricaricamento e fa scroll al top
   * - Altrimenti si comporta come un normale link
   */
  document.querySelector('a[href="index.html"]').addEventListener('click', function(e) {
    // Verifica se siamo già nella homepage (3 casi possibili)
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname === '') {
      e.preventDefault(); // Blocca il comportamento predefinito del link
      // Scroll fluido verso l'alto della pagina
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Se non siamo nella home, il link funziona normalmente
  });
});

/**
 * SCROLLA VERSO LA SEZIONE NEWS
 * Funzione chiamata dal pulsante "Esplora" nella hero section
 */
function scrollToInvestigations() {
  const section = document.getElementById('news');
  if (section) {
    // Scroll fluido fino alla sezione news
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * GESTIONE LINK INTERNI (ANCHOR #)
 * Applica lo scroll fluido a tutti i link che iniziano con #
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault(); // Blocca il salto improvviso
        // Scroll fluido all'elemento target
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
});

/**
 * GESTIONE LINK INVESTIGAZIONI SPECIALE
 * Comportamento personalizzato per un link specifico
 */
document.getElementById('investigationLink').addEventListener('click', function(e) {
    e.preventDefault(); // Blocca il comportamento normale
    // Scroll fluido verso l'alto della pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
});