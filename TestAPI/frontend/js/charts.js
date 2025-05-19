/**
 * charts.js
 * 
 * Questo file gestisce la creazione di quattro grafici tramite Chart.js per confrontare
 * le organizzazioni "Mafia" e "'Ndrangheta" su diversi aspetti: struttura, economia,
 * distribuzione territoriale e presenza internazionale.
 * 
 * Ogni grafico è configurato per essere visualizzato su uno sfondo scuro, con colori
 * distintivi per ciascuna organizzazione e opzioni di leggibilità ottimizzate.
 */

// ===================== Structure Chart =====================
const structureCtx = document.getElementById('structureChart').getContext('2d');
new Chart(structureCtx, {
  type: 'radar',
  data: {
    labels: ['Gerarchia', 'Centralizzazione', 'Familiarità', 'Riti', 'Segretezza', 'Violenza'],
    datasets: [
      {
        label: 'Mafia',
        data: [90, 85, 40, 95, 90, 80],
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderColor: 'rgba(255, 107, 53, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 107, 53, 1)'
      },
      {
        label: "'Ndrangheta",
        data: [60, 30, 95, 70, 85, 60],
        backgroundColor: 'rgba(255, 190, 11, 0.2)',
        borderColor: 'rgba(255, 190, 11, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 190, 11, 1)'
      }
    ]
  },
  options: {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'white' },
        ticks: { display: false, backdropColor: 'transparent' }
      }
    },
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});

// ===================== Economy Chart =====================
const economyCtx = document.getElementById('economyChart').getContext('2d');
new Chart(economyCtx, {
  type: 'bar',
  data: {
    labels: ['Droga', 'Appalti', 'Estorsioni', 'Armi', 'Riciclaggio'],
    datasets: [
      {
        label: 'Mafia',
        data: [45, 85, 90, 30, 70],
        backgroundColor: 'rgba(255, 107, 53, 0.7)',
        borderColor: 'rgba(255, 107, 53, 1)',
        borderWidth: 1
      },
      {
        label: "'Ndrangheta",
        data: [95, 60, 70, 65, 85],
        backgroundColor: 'rgba(255, 190, 11, 0.7)',
        borderColor: 'rgba(255, 190, 11, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'white' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'white' }
      }
    },
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});

// ===================== Territory Chart =====================
const territoryCtx = document.getElementById('territoryChart').getContext('2d');
new Chart(territoryCtx, {
  type: 'doughnut',
  data: {
    labels: ['Sicilia', 'Calabria', 'Nord Italia', 'Internazionale'],
    datasets: [
      {
        label: 'Mafia',
        data: [70, 10, 15, 5],
        backgroundColor: [
          'rgba(255, 107, 53, 0.7)',
          'rgba(255, 107, 53, 0.5)',
          'rgba(255, 107, 53, 0.3)',
          'rgba(255, 107, 53, 0.1)'
        ],
        borderColor: 'rgba(10, 15, 15, 0.8)',
        borderWidth: 1
      },
      {
        label: "'Ndrangheta",
        data: [5, 60, 20, 15],
        backgroundColor: [
          'rgba(255, 190, 11, 0.7)',
          'rgba(255, 190, 11, 0.5)',
          'rgba(255, 190, 11, 0.3)',
          'rgba(255, 190, 11, 0.1)'
        ],
        borderColor: 'rgba(10, 15, 15, 0.8)',
        borderWidth: 1
      }
    ]
  },
  options: {
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});

// ===================== International Chart =====================
const internationalCtx = document.getElementById('internationalChart').getContext('2d');
new Chart(internationalCtx, {
  type: 'line',
  data: {
    labels: ['1980', '1990', '2000', '2010', '2020'],
    datasets: [
      {
        label: 'Mafia - Paesi',
        data: [5, 8, 12, 15, 18],
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderColor: 'rgba(255, 107, 53, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      },
      {
        label: "'Ndrangheta - Paesi",
        data: [3, 10, 25, 35, 42],
        backgroundColor: 'rgba(255, 190, 11, 0.2)',
        borderColor: 'rgba(255, 190, 11, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'white' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'white' }
      }
    },
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});