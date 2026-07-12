const works = [
    {
      title: "Part-time Software Engineer",
      company: "<a href='https://www.sketchsoft3d.com/'>Sketchsoft Inc.</a>, Seoul, Republic of Korea",
      date: "2022. 09. - 2023. 08.",
    },
    {
      title: "Full-time Software Engineer",
      company: "<a href='https://www.sketchsoft3d.com/'>Sketchsoft Inc.</a>, Seoul, Republic of Korea",
      date: "2022. 01. - 2022. 07.",
    },
    {
      title: "Full-time Software Engineer Intern",
      company: "DEMO, Pohang, Republic of Korea",
      date: "2020.12. - 2021.02.",
    },
  ];
  
  function renderWorks() {
    const workList = document.getElementById('work-list');
    works.forEach(p => {
      const el = document.createElement('div');
      el.className = 'works';
      el.innerHTML = `
        <div class="work-title">${p.title}</div>
        <div class="work-company">${p.company}</div>
        <div class="sub">${p.date}</div>
      `;
      workList.appendChild(el);
    });
  }
  
  renderWorks();
  