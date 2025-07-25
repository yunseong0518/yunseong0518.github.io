const educations = [
    {
      title: "M.S. - Ph.D. in Computer Science and Engineering",
      school: "Pohang University of Science and Technology (POSTECH), Republic of Korea",
      lab: "Computer Graphics Lab",
      lab_link: "https://cg.postech.ac.kr",
      advisor: "Seung-Hwan Baek",
      advisor_link: "https://shbaek.com",
      date: "2024. 02. - Present",
    },
    {
      title: "B.S. in Computer Science and Engineering",
      school: "Pohang University of Science and Technology (POSTECH), Republic of Korea",
      date: "2019. 02. - 2024. 02",
    },
  ];
  
  function renderNews() {
    const educationList = document.getElementById('education-list');
    educations.forEach(p => {
      let labHTML = p.lab ? `
        <div class="education-lab">
          <a href="${p.lab_link}"><strong>${p.lab}</strong></a>
          advised by <a href="${p.advisor_link}"><strong>${p.advisor}</strong></a>
        </div>` : '';
      const el = document.createElement('div');
      el.className = 'educations';
      el.innerHTML = `
        <div class="education-title">${p.title}</div>
        <div class="education-school">${p.school}</div>
        ${labHTML}
        <div class="sub">${p.date}</div>
      `;
      educationList.appendChild(el);
    });
  }
  
  renderNews();
  