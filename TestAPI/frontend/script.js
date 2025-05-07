
    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // News API Configuration
    const API_KEY = '29301ef09e5c426a96143b785681a53b';
    const backupNews = [
      {
        title: "Operazione anti-mafia nel Mediterraneo",
        description: "Blitz internazionale contro il traffico di droga coordinato dalla 'ndrangheta",
        url: "#",
        urlToImage: "https://media.istockphoto.com/id/1199091755/it/foto/retro-mafia-gangster.jpg?s=612x612&w=0&k=20&c=8oHMYhGykAxxBqDo9ExQVPNLNqqm-bPAwrAzTbYuNX4=",
        source: { name: "Interno" },
        publishedAt: new Date().toISOString()
      },
      {
        title: "Nuovi arresti nel clan dei Casalesi",
        description: "La polizia ha sgominato un'importante cella operativa in Campania",
        url: "#",
        urlToImage: "https://cdn.pixabay.com/photo/2019/04/22/14/55/gangster-4146707_640.jpg",
        source: { name: "Polizia" },
        publishedAt: new Date().toISOString()
      },
      {
        title: "Maxi sequestro di beni alla mafia",
        description: "Confiscati beni per oltre 50 milioni di euro in Lombardia",
        url: "#",
        urlToImage: "https://media.istockphoto.com/id/837345268/it/foto/personaggio-del-film-noir.jpg?s=612x612&w=0&k=20&c=kOssRoKSFnxHSz_O4mVu5BPLa03BZpNSLZN_tTlawqI=",
        source: { name: "Guardia di Finanza" },
        publishedAt: new Date().toISOString()
      },
      {
        title: "Pentito di mafia racconta i segreti del clan",
        description: "Nuove rivelazioni sulle infiltrazioni nella politica locale",
        url: "#",
        urlToImage: "https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_640.jpg",
        source: { name: "Repubblica" },
        publishedAt: new Date().toISOString()
      },
      {
        title: "Traffico di armi: 15 arresti in tutta Italia",
        description: "Operazione congiunta tra Polizia e Guardia di Finanza",
        url: "#",
        urlToImage: "https://cdn.pixabay.com/photo/2017/09/02/19/15/pistol-2708982_640.jpg",
        source: { name: "Corriere" },
        publishedAt: new Date().toISOString()
      },
      {
        title: "Infiltrazioni mafiose nel settore delle costruzioni",
        description: "Indagine rivela appalti truccati in 5 regioni",
        url: "#",
        urlToImage: "https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_640.jpg",
        source: { name: "Il Sole 24 Ore" },
        publishedAt: new Date().toISOString()
      }
    ];

    // Load news when page is ready
    document.addEventListener('DOMContentLoaded', function() {
      loadNews();
    });

    // Function to load news
    function loadNews() {
      // Show loading state
      const container = document.getElementById('news-container');
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Caricamento...</span>
          </div>
          <p class="mt-3">Caricamento notizie in corso...</p>
        </div>
      `;

      // Try to fetch from NewsAPI first
      fetch(`https://newsapi.org/v2/everything?q=mafia OR camorra OR 'ndrangheta&language=it&sortBy=publishedAt&apiKey=${API_KEY}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          if (data.articles && data.articles.length > 0) {
            displayNews(data.articles.slice(0, 6));
          } else {
            displayNews(backupNews);
          }
        })
        .catch(error => {
          console.error('Error fetching news:', error);
          displayNews(backupNews);
        });
    }

    // Function to display news
    function displayNews(articles) {
      const container = document.getElementById('news-container');
      container.innerHTML = '';
      
      articles.forEach((article, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        col.innerHTML = `
          <div class="news-card h-100">
            <div class="news-img-container">
              <img src="${article.urlToImage || 'https://via.placeholder.com/600x400?text=MAFIAWATCH'}" 
                   alt="${article.title}" 
                   onerror="this.src='https://via.placeholder.com/600x400?text=Immagine+non+disponibile'">
            </div>
            <div class="news-content">
              ${index === 0 ? '<span class="news-badge">NUOVO</span>' : ''}
              <h3><a href="${article.url || '#'}" target="_blank">${article.title || 'Titolo non disponibile'}</a></h3>
              <p>${article.description || 'Descrizione non disponibile'}</p>
              <div class="news-meta">
                <span><i class="fas fa-newspaper"></i> ${article.source?.name || 'Fonte sconosciuta'}</span>
                <span>${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('it-IT') : 'Data sconosciuta'}</span>
              </div>
            </div>
          </div>
        `;
        
        container.appendChild(col);
      });
    }
