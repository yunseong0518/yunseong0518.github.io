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
    polarImages.forEach(p => {
        const el = document.createElement('div');
        el.className = `polar-image`;
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
        
        polarImageList.appendChild(el);

        window.addEventListener('load', initSlider);

        let pos_vertical = el.clientHeight / 2;
        let pos_horizontal = el.clientWidth / 2;
        
        function updateSlider() {
            aolp.style.clipPath = `inset(${pos_horizontal}px 0px 0px 0px)`;
            dop.style.clipPath = `inset(0px 0px ${el.clientHeight - pos_horizontal}px ${pos_vertical}px`;
            top.style.clipPath = `inset(0px 0px 0px ${pos_vertical}px`;
            slider_vertical.style.left = `${pos_vertical}px`
            slider_horizontal.style.top = `${pos_horizontal}px`
            handle.style.left = `${pos_vertical}px`
            handle.style.top = `${pos_horizontal}px`
        }

        function initSlider() {
            pos_horizontal = el.clientHeight / 2;
            pos_vertical = el.clientWidth / 2;
            updateSlider();
        }
        
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
}

renderPolarImage();