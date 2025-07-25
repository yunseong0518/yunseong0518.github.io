const patents = [
    {
      title: "METHOD AND APPARATUS FOR 3D MODELING",
      no: "10-2023-0059316 (Korea Patent)",
      date: "2023.05.08"
    },
  ];
  
  function renderPatents() {
    const patentList = document.getElementById('patent-list');
    patents.forEach(p => {
      const el = document.createElement('div');
      el.className = 'patent';
      el.innerHTML = `
        <div class="patent-title">${p.title}</div>
        <div class="sub">Patent No. ${p.no}</div>
        <div class="sub">Date of Registration: ${p.date}</div>
      `;
      patentList.appendChild(el);
    });
  }
  
  renderPatents();
  