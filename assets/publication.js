const publications = [
  {
      id: "pdir",
      title: "Snapshot Polarimetric Display Inverse Rendering",
      authors: "Seokjun Choi*, <strong><u>Yunseong Moon*</u></strong>, Kaizhang Kang, Hoon-Gyu Chung, Jin-Nyeong Kim, Giljoo Nam, Seung-Hwan Baek",
      venue: "ACM Transactions on Graphics (Proceedings of SIGGRAPH Asia 2026)",
      links: [
        { name: "Project", url: "https://michaelcsj.github.io/PDIR/" },
        { name: "Paper", url: "." },
      ],
      thumbnail: "assets/thumbnail_siga2026_choi.jpg"
    },
    {
      id: "penvmap",
      title: "Real-world Polarimetric Environment Map Dataset",
      authors: "Yonghee Oh, Ryota Maeda, <strong><u>Yunseong Moon</u></strong>, Seung-Hwan Baek",
      venue: "SIGGRAPH Asia 2026",
      links: [
        { name: "Project", url: "." },
        { name: "Paper", url: "." },
      ],
      thumbnail: "assets/thumbnail_siga2026_oh.jpg"
    },
    {
      id: "transient",
      title: "Transient Polarimetry",
      authors: "Oscar Pueyo-Ciutad, Guillermo Enguita-Lahoz, <strong><u>Yunseong Moon</u></strong>, Ryota Maeda, Seung-Hwan Baek, Albert Redo-Sanchez, Diego Gutierrez",
      venue: "SIGGRAPH 2026 (Poster)",
      links: [
        { name: "Paper", url: "https://dl.acm.org/doi/10.1145/3799825.3818744" },
      ],
      thumbnail: "assets/thumbnail_sig2026_oscar.jpg"
    },
    {
      id: "broadband",
      title: "Broadband Hyperspectral 3D Imaging under Dispersed Structured Light",
      authors: "Suhyun Shin, <strong><u>Yunseong Moon</u></strong>, Ryota Maeda, David B. Lindell, Kiriakos N. Kutulakos, Seung-Hwan Baek",
      venue: "SIGGRAPH 2026",
      links: [
        { name: "Project", url: "https://shshin1210.github.io/BH3D/" },
        { name: "Paper", url: "https://dl.acm.org/doi/10.1145/3799902.3811086" },
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
        { name: "Paper", url: "https://dl.acm.org/doi/10.1145/3757377.3763853" },
        { name: "Dataset", url: "https://huggingface.co/datasets/yunseongmoon/Hyperspectral-Polarimetric-BRDF" },
      ],
      thumbnail: "assets/thumbnail_sigasia2025_moon.jpg"
    },
    {
      id: "event",
      title: "Event Ellipsometer: Event-based Mueller-Matrix Video Imaging",
      authors: "Ryota Maeda, <strong><u>Yunseong Moon</u></strong>, Seung-Hwan Baek",
      venue: "CVPR 2025 (Highlight)",
      links: [
        { name: "Project", url: "https://elerac.github.io/projects/eventellipsometer/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2411.17313" },
      ],
      thumbnail: "assets/thumbnail_cvpr2025_ryota.jpg"
    },
    {
      id: "spectral",
      title: "Spectral and Polarization Vision: Spectro-polarimetric Real-world Dataset",
      authors: "Yujin Jeon, Eunsue Choi, Youngchan Kim, <strong><u>Yunseong Moon</u></strong>, Khalid Omer, Felix Heide, Seung-Hwan Baek",
      venue: "CVPR 2024 (Highlight)",
      links: [
        { name: "Project", url: "https://eschoi.com/SPDataset/" },
        { name: "Paper", url: "https://arxiv.org/pdf/2311.17396" },
        { name: "Dataset", url: "https://huggingface.co/datasets/jyj7913/spectro-polarimetric" }
      ],
      thumbnail: "assets/thumbnail_cvpr2024_jeon.jpg"
    }
  ];

  // Links whose url is still a placeholder ("." or "") are not rendered, so an
  // unreleased paper/project page never shows up as a dead link.
  function renderLinks(links, paperId) {
    const real = links.filter(l => l.url && l.url !== '.');
    if (!real.length) return '';
    const track = l => `data-track="publication_click" data-track-paper="${paperId}" data-track-link-type="${l.name.toLowerCase()}"`;
    return `<div class="publication-links">${real.map(l => `<a class="pill pill-sm" ${track(l)} href="${l.url}">${l.name}</a>`).join('')}</div>`;
  }

  // Plain-text title for alt attributes (authors carry <strong>/<u> markup).
  function altText(p) {
    return `${p.title} (${p.venue})`.replace(/"/g, '&quot;');
  }

  function renderPublicationList() {
    const pubList = document.getElementById('publication-list');
    publications.forEach(p => {
      const el = document.createElement('div');
      el.className = 'publication-list';
      if (p.id) el.id = 'pub-' + p.id;
      el.innerHTML = `
        <div class="photo-with-text">
          <div class="photo">
            <img src="${p.thumbnail}" alt="${altText(p)}" loading="lazy">
          </div>
          <div class="text">
            <div class="publication-title">${p.title}</div>
            <div class="sub">${p.authors}</div>
            <div class="publication-venue">${p.venue}</div>
            ${renderLinks(p.links, p.id)}
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
      // Own class: reusing the container's class made every card a 3-column grid too.
      el.className = 'pub-card';
      if (p.id) el.id = 'pub-' + p.id;
      el.innerHTML = `
        <img class="pub-card-img" src="${p.thumbnail}" alt="${altText(p)}" loading="lazy">
        <div class="pub-card-text">
          <div class="publication-title">${p.title}</div>
          <div class="sub">${p.authors}</div>
          <div class="publication-venue">${p.venue}</div>
          ${renderLinks(p.links, p.id)}
        </div>
      `;
      pubArray?.appendChild(el);
    });
  }
  
  renderPublicationList();
  renderPublicationArray();
  