const emoji_celeb = "&#x1F389"
const news = [
    {
      date: "2026. 04.",
      msg: `${emoji_celeb}Two papers (One main track, one poster track) will be presented at SIGGRAPH 2026.`
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
  