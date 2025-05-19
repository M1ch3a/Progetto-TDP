// Gestisce lo scroll fluido per tutti i link ancora che puntano ad ancore interne della pagina
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      // Seleziona l'elemento di destinazione tramite l'attributo href del link
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault(); // Previene il comportamento di default del link
        target.scrollIntoView({ behavior: 'smooth' }); // Scroll fluido verso la sezione desiderata
      }
    });
});

// Gestisce lo scroll fluido verso l'inizio della pagina quando si clicca sul link con id 'chisiamoLink'
document.getElementById('chisiamoLink').addEventListener('click', function(e) {
    e.preventDefault(); // Previene il comportamento di default del link
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll fluido verso l'alto della pagina
});