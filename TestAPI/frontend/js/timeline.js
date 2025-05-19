// Seleziona tutti gli elementi della timeline da animare
const timelineItems = document.querySelectorAll('.timeline-item');

// Crea un IntersectionObserver per rilevare quando gli elementi entrano nel viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Se l'elemento è visibile almeno al 10%, attiva l'animazione di comparsa
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 }); // La soglia indica che l'animazione parte quando il 10% dell'elemento è visibile

// Imposta lo stato iniziale degli elementi e li osserva per l'animazione
timelineItems.forEach(item => {
  item.style.opacity = '0'; // Elemento inizialmente trasparente
  item.style.transform = 'translateY(20px)'; // Spostato verso il basso
  item.style.transition = 'all 0.6s ease'; // Transizione fluida per animazione
  observer.observe(item); // Inizia a osservare l'elemento
});