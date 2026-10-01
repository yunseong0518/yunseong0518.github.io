const services = [
    {
      role: "Reviewer",
      // Add `years: "2025, 2026"` to a venue to show when you reviewed for it.
      venues: [
        { name: "ACM Transactions on Graphics", abbr: "TOG" },
        { name: "IEEE Transactions on Visualization and Computer Graphics", abbr: "TVCG" },
        { name: "Asian Conference on Computer Vision", abbr: "ACCV" },
      ],
    },
  ];

  function renderServices() {
    const serviceList = document.getElementById('service-list');
    services.forEach(s => {
      const el = document.createElement('div');
      el.className = 'services';
      const venues = s.venues.map(v => {
        const years = v.years ? ` <span class="sub">${v.years}</span>` : '';
        return `<li>${v.name} (${v.abbr})${years}</li>`;
      }).join('');
      el.innerHTML = `
        <div class="service-role">${s.role}</div>
        <ul class="service-venues">${venues}</ul>
      `;
      serviceList.appendChild(el);
    });
  }

  renderServices();
