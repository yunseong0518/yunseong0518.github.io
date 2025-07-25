const patents = [
    {
      title: "METHOD AND APPARATUS FOR 3D MODELING",
      no: "10-2023-0059316 (Korea Patent)",
      date: "2023.05.08",
      thumbnail: "assets/thumbnail_patent.jpg"
    },
  ];
  
  function renderPatents() {
    const patentList = document.getElementById('patent-list');
    patents.forEach(p => {
      const el = document.createElement('div');
      el.className = 'patent';
      el.innerHTML = `
      <div style="display: flex; align-items: flex-start; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <img src="${p.thumbnail}" style="width: 100%; max-width: 200px;">
        </div>
        <div style="flex: 2; min-width: 200px;">
          <div class="patent-title">${p.title}</div>
          <div class="sub">Patent No. ${p.no}</div>
          <div class="sub">Date of Registration: ${p.date}</div>   
        </div>
      </div>
      `;
      patentList.appendChild(el);
    });
  }
  
  renderPatents();
  