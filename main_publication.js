const publications = [
    {
      title: "Event Ellipsometer: Event-based Mueller-Matrix Video Imaging",
      authors: "Ryota Maeda, <strong>Yunseong Moon</strong>, Seung-Hwan Baek",
      venue: "CVPR 2025 highlight",
      links: [
        { name: "Project", url: "https://elerac.github.io/projects/eventellipsometer/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2411.17313" },
      ],
      thumbnail: "./assets/thumbnail_cvpr2025_ryota.png"
    },
    {
      title: "Spectral and Polarization Vision: Spectro-polarimetric Real-world Dataset",
      authors: "Yujin Jeon, Eunsue Choi, Youngchan Kim, <strong>Yunseong Moon</strong>, Khalid Omer, Felix Heide, Seung-Hwan Baek",
      venue: "CVPR 2024 highlight",
      links: [
        { name: "Project", url: "https://eschoi.com/SPDataset/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2311.17396" },
        { name: "Dataset", url: "https://huggingface.co/datasets/jyj7913/spectro-polarimetric" }
      ],
      thumbnail: "./assets/thumbnail_cvpr2024_jeon.png"
    }
  ];
  
  function renderPublications() {
    const pubList = document.getElementById('publication-list');
    publications.forEach(p => {
      const el = document.createElement('div');
      el.className = 'publication';
      el.innerHTML = `
        <div style="display: flex; align-items: flex-start; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <img src="${p.thumbnail}" style="width: 100%; max-width: 200px;">
          </div>
          <div style="flex: 2; min-width: 200px;">
            <div class="publication-title">${p.title}</div>
            <div class="sub">${p.authors}</div>
            <div class="sub">${p.venue}</div>
            <div class="publication-links">[${p.links.map(l => `<a href="${l.url}">${l.name}</a>`).join('] [')}]</div>
          </div>
        </div>
      `;
      pubList.appendChild(el);
    });
  }
  
  renderPublications();
  