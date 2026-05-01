const awards = [
    {
      date: "2026. 01.",
      msg: "BK21 Outstanding paper award (1st prize, 대상)"
    },
  ];
  
  function renderAwards() {
    const awardsList = document.getElementById('award-list');
    awards.forEach(p => {
      const el = document.createElement('div');
      el.className = 'awards';
      el.innerHTML = `
      <div class="awards-msg">${p.msg}</div>
      <div class="sub">${p.date}</div>
      `;
      awardsList.appendChild(el);
    });
  }
  
  renderAwards();
  