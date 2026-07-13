const publications = [
    {
      id: "transient",
      title: "Transient Polarimetry",
      authors: "Oscar Pueyo-Ciutad, Guillermo Enguita-Lahoz, <strong><u>Yunseong Moon</u></strong>, Ryota Maeda, Seung-Hwan Baek, Albert Redo-Sanchez, Diego Gutierrez",
      venue: "SIGGRAPH 2026 (Poster)",
      links: [
        { name: "Project", url: "" },
        { name: "Paper", url: "" },
      ],
      thumbnail: "assets/thumbnail_sig2026_oscar.jpg"
    },
    {
      id: "broadband",
      title: "Broadband Hyperspectral 3D Imaging under Dispersed Structured Light",
      authors: "Suhyun Shin, <strong><u>Yunseong Moon</u></strong>, Ryota Maeda, David B. Lindell, Kiriakos N. Kutulakos, Seung-Hwan Baek",
      venue: "SIGGRAPH 2026",
      links: [
        { name: "Project", url: "" },
        { name: "Paper", url: "" },
      ],
      thumbnail: "assets/thumbnail_sig2026_shin.png"
    },
    {
      id: "hpbrdf",
      title: "Hyperspectral Polarimetric BRDFs of Real-world Materials",
      authors: "<strong><u>Yunseong Moon</u></strong>, Ryota Maeda, Suhyun Shin, Inseung Hwang, Youngchan Kim, Min H. Kim, Seung-Hwan Baek",
      venue: "SIGGRAPH Asia 2025",
      links: [
        { name: "Project", url: "https://yunseong0518.github.io/projects/hpBRDF/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2509.13779" },
        { name: "Dataset", url: "https://huggingface.co/datasets/yunseongmoon/Hyperspectral-Polarimetric-BRDF" },
      ],
      thumbnail: "assets/thumbnail_sigasia2025_moon.jpg"
    },
    {
      id: "event",
      title: "Event Ellipsometer: Event-based Mueller-Matrix Video Imaging",
      authors: "Ryota Maeda, <strong><u>Yunseong Moon</u></strong>, Seung-Hwan Baek",
      venue: "CVPR 2025 highlight",
      links: [
        { name: "Project", url: "https://elerac.github.io/projects/eventellipsometer/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2411.17313" },
      ],
      thumbnail: "assets/thumbnail_cvpr2025_ryota.png"
    },
    {
      id: "spectral",
      title: "Spectral and Polarization Vision: Spectro-polarimetric Real-world Dataset",
      authors: "Yujin Jeon, Eunsue Choi, Youngchan Kim, <strong><u>Yunseong Moon</u></strong>, Khalid Omer, Felix Heide, Seung-Hwan Baek",
      venue: "CVPR 2024 highlight",
      links: [
        { name: "Project", url: "https://eschoi.com/SPDataset/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2311.17396" },
        { name: "Dataset", url: "https://huggingface.co/datasets/jyj7913/spectro-polarimetric" }
      ],
      thumbnail: "assets/thumbnail_cvpr2024_jeon.png"
    }
  ];

  function renderPublicationList() {
    const pubList = document.getElementById('publication-list');
    publications.forEach(p => {
      const el = document.createElement('div');
      el.className = 'publication-list';
      if (p.id) el.id = 'pub-' + p.id;
      el.innerHTML = `
        <div class="photo-with-text">
          <div class="photo">
            <img src="${p.thumbnail}">
          </div>
          <div class="text">
            <div class="publication-title">${p.title}</div>
            <div class="sub">${p.authors}</div>
            <div class="sub">${p.venue}</div>
            <div class="publication-links">[${p.links.map(l => `<a href="${l.url}">${l.name}</a>`).join('] [')}]</div>
          </div>
        </div>
      `;
      pubList?.appendChild(el);
    });
  }

  function renderPublicationArray() {
    const pubArray = document.getElementById('publication-array');
    publications.forEach(p => {
      const el = document.createElement('div');
      el.className = 'publication-array';
      if (p.id) el.id = 'pub-' + p.id;
      el.innerHTML = `
        <div>
          <div>
            <div style="min-width: 200px;">
              <img src="${p.thumbnail}" style="width: 100%;">
            </div>
            <div style="min-width: 250px;">
              <div class="publication-title">${p.title}</div>
              <div class="sub">${p.authors}</div>
              <div class="sub">${p.venue}</div>
              <div class="publication-links">[${p.links.map(l => `<a href="${l.url}">${l.name}</a>`).join('] [')}]</div>
            </div>
          </div>
        </div>
      `;
      pubArray?.appendChild(el);
    });
  }
  
  renderPublicationList();
  renderPublicationArray();
  