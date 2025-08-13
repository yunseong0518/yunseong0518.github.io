const polarImages = [
    { name: "White Billiard" },
    { name: "White smooth plastic" },
    { name: "White rough plastic" },
    { name: "Black rough plastic" },
    { name: "Silver rough plastic" },
    { name: "Red rough plastic" },
    { name: "Yellow rough plastic" },
    { name: "Plum rough plastic" },
    { name: "Aluminium" },
    { name: "Fake gold" },
    { name: "SUJ2" },
    { name: "Black glass" },
    { name: "Gray silicon" },
    { name: "Green silicon" },
]

function renderPolarImage() {
    const polarImageList = document.getElementById('polar-image-list');
    const container = document.createElement('div')
    container.className = 'polar-image-container'
    polarImageList.appendChild(container)

    let pos_vertical = 0;
    let pos_horizontal = 0;
        
    polarImages.forEach(p => {
        const el = document.createElement('div');
        el.classList = ['polar-image']
        el.id = `${p.name}`;

        const srgb = document.createElement('div');
        srgb.className = 'srgb';
        const img_srgb = document.createElement('img');
        img_srgb.src = `assets/${p.name}_srgb.png`;
        srgb.appendChild(img_srgb);
        el.appendChild(srgb);

        const aolp = document.createElement('div');
        aolp.className = 'aolp';
        const img_aolp = document.createElement('img');
        img_aolp.src = `assets/${p.name}_aolp.png`;
        aolp.appendChild(img_aolp);
        el.appendChild(aolp);
        
        const top = document.createElement('div');
        top.className = 'top';
        const img_top = document.createElement('img');
        img_top.src = `assets/${p.name}_top.png`;
        top.appendChild(img_top);
        el.appendChild(top);

        const dop = document.createElement('div');
        dop.className = 'dop';
        const img_dop = document.createElement('img');
        img_dop.src = `assets/${p.name}_dop.png`;
        dop.appendChild(img_dop);
        el.appendChild(dop);

        const slider_horizontal = document.createElement('div');
        slider_horizontal.className = 'slider-horizontal';
        el.appendChild(slider_horizontal);

        const slider_vertical = document.createElement('div');
        slider_vertical.className = 'slider-vertical';
        el.appendChild(slider_vertical);

        const handle = document.createElement('div');
        handle.className = 'slider-handle';
        el.appendChild(handle);
        
        container.appendChild(el);
        
        const rectOf = () => el.getBoundingClientRect();

        handle.onmousedown = () => {
            const onMove = (e) => {
                const r = rectOf();
                pos_vertical = Math.min(el.clientWidth, Math.max(0, e.clientX - r.left));
                pos_horizontal = Math.min(Math.max(0, e.clientY - r.top), el.offsetHeight);
                updateSlider();
            };
            const stop = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', stop); };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', stop);
        };
    });

    let current = 0;

    function showSelected(idx) {
        console.log('show', idx)
        views = document.querySelectorAll('.polar-image');
        views.forEach((view, i) => {
            view.classList.toggle('active', i === idx)
        })
        updateSlider()
    }

    function updateSlider() {
        const aolp = document.querySelector('.active .aolp')
        const dop = document.querySelector('.active .dop')
        const top = document.querySelector('.active .top')
        const slider_vertical = document.querySelector('.active .slider-vertical')
        const slider_horizontal = document.querySelector('.active .slider-horizontal')
        const handle = document.querySelector('.active .slider-handle')
        const activeImage = document.querySelector('.polar-image.active');

        aolp.style.clipPath = `inset(${pos_horizontal}px 0px 0px 0px)`;
        dop.style.clipPath = `inset(0px 0px ${activeImage.clientHeight - pos_horizontal}px ${pos_vertical}px`;
        top.style.clipPath = `inset(0px 0px 0px ${pos_vertical}px`;
        slider_vertical.style.left = `${pos_vertical}px`
        slider_horizontal.style.top = `${pos_horizontal}px`
        handle.style.left = `${pos_vertical}px`
        handle.style.top = `${pos_horizontal}px`
    }

    function initSlider() {
        const activeImage = document.querySelector('.polar-image.active');
        pos_horizontal = activeImage.clientHeight / 2;
        pos_vertical = activeImage.clientWidth / 2;
        updateSlider();
        console.log('initSlider')
    }

    function initViewer() {
        startAutoView()
        showSelected(0)
        initSlider();
    }

    function nextView() {
        current = (current + 1) % views.length;
        showSelected(current)
    }

    function startAutoView() {
        interval = setInterval(nextView, 3000); // 3초마다 자동 전환
    }
    window.addEventListener('load', initViewer);
}

renderPolarImage();