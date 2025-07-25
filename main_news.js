const news = [
    {
      date: "2025. 03.",
      msg: "One paper has been accepted at CVPR 2025. (highlight)"
    },
  ];
  
  function renderNews() {
    const newsList = document.getElementById('news-list');
    news.forEach(p => {
      const el = document.createElement('div');
      el.className = 'news';
      el.innerHTML = `
        <div class="news-date">${p.date}</div>
        <div class="news-msg">${p.msg}</div>
      `;
      newsList.appendChild(el);
    });
  }
  
  renderNews();
  