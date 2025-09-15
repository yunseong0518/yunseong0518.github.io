const emoji_celeb = "&#x1F389"
const news = [
    {
      date: "2025. 09.",
      msg: `${emoji_celeb}One paper has been accepted at SIGGRAPH Asia 2025.`
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
  