const polarImages = [
    { name: "Aluminum" },
    { name: "SUJ2" },
    { name: "Fake gold" },
    { name: "Black glass" },
    { name: "White Billiard" },
    { name: "White smooth plastic" },
    { name: "White rough plastic" },
    { name: "Black rough plastic" },
    { name: "Silver rough plastic" },
    { name: "Red rough plastic" },
    { name: "Yellow rough plastic" },
    { name: "Plum rough plastic" },
    { name: "Green silicon" },
    { name: "Gray silicon" },
]

function renderPolarImage() {
    const polarImageList = document.getElementById('polar-image-list');
    const imageContainer = document.createElement('div')
    imageContainer.className = 'polar-image-container'
    polarImageList.appendChild(imageContainer)

    const materialName = document.createElement('div')
    materialName.className = 'polar-image-name'
    polarImageList.appendChild(materialName)

    const thumbnailViewer = document.createElement('div')
    thumbnailViewer.className = 'polar-image-thumbnail-list'

    let pos_vertical = 0;
    let pos_horizontal = 0;
    let current = 0;
    let angle = 0;
    let view_direction = 1

    polarImages.forEach((p, idx) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        const img_thumbnail = document.createElement('img');
        img_thumbnail.src = `assets/${p.name}_srgb.png`;
        thumbnail.appendChild(img_thumbnail);
        thumbnailViewer.appendChild(thumbnail);
        thumbnail.onmousedown = () => {
            current = idx
            showSelected(idx)
        }
    })

    polarImages.forEach(p => {
        const el = document.createElement('div');
        el.classList = ['polar-image']
        el.id = `${p.name}`;

        const srgb = document.createElement('div');
        srgb.className = 'srgb';
        const label_srgb = document.createElement('span');
        label_srgb.innerText = 'RGB';
        srgb.appendChild(label_srgb);
        const img_srgb = document.createElement('img');
        img_srgb.src = `assets/${p.name}_srgb.png`;
        srgb.appendChild(img_srgb);
        el.appendChild(srgb);

        const aolp = document.createElement('div');
        aolp.className = 'aolp';
        const label_aolp = document.createElement('span');
        label_aolp.innerText = 'AoLP';
        aolp.appendChild(label_aolp);
        const img_aolp = document.createElement('img');
        img_aolp.src = `assets/${p.name}_aolp.png`;
        aolp.appendChild(img_aolp);
        el.appendChild(aolp);
        
        const top = document.createElement('div');
        top.className = 'top';
        const label_top = document.createElement('span');
        label_top.innerText = 'ToP';
        top.appendChild(label_top);
        const img_top = document.createElement('img');
        img_top.src = `assets/${p.name}_top.png`;
        top.appendChild(img_top);
        el.appendChild(top);
        
        const dop = document.createElement('div');
        dop.className = 'dop';
        const label_dop = document.createElement('span');
        label_dop.innerText = 'DoP';
        dop.appendChild(label_dop);
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
        
        imageContainer.appendChild(el);
        
        const rectOf = () => el.getBoundingClientRect();

        handle.onmousedown = (e) => {
            e.preventDefault();
            const onMove = (e) => {
            const r = rectOf();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            pos_vertical = Math.min(el.clientWidth, Math.max(0, clientX - r.left));
            pos_horizontal = Math.min(Math.max(0, clientY - r.top), el.offsetHeight);
            updateSlider();
            };
            const stop = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', stop);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', stop);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', stop);
            window.addEventListener('touchmove', onMove);
            window.addEventListener('touchend', stop);
        };
        handle.ontouchstart = (e) => {
            e.preventDefault();
            const onMove = (e) => {
            const r = rectOf();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            pos_vertical = Math.min(el.clientWidth, Math.max(0, clientX - r.left));
            pos_horizontal = Math.min(Math.max(0, clientY - r.top), el.offsetHeight);
            updateSlider();
            };
            const stop = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', stop);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', stop);
            };
            window.addEventListener('touchmove', onMove);
            window.addEventListener('touchend', stop);
        };
    });

    const controller = document.createElement('div')
    controller.className = 'polar-image-controller'
    const prevButton = document.createElement('button')
    prevButton.className = 'prev'
    const nextButton = document.createElement('button')
    nextButton.className = 'next'

    nextButton.innerHTML = '>';
    prevButton.innerHTML = '<';

    polarImageList.append(controller)
    imageContainer.append(prevButton)
    controller.append(thumbnailViewer)
    imageContainer.append(nextButton)

    function animate() {
        const activeView = document.querySelector(['.active'])
        const activeSrgb = activeView.querySelector(['.srgb img'])
        const activeAolp = activeView.querySelector(['.aolp img'])
        const activeDop = activeView.querySelector(['.dop img'])
        const activeTop = activeView.querySelector(['.top img'])
        const activeName = activeView.id
        
        angle += view_direction * 0.3;

        if (angle >= 10 || angle <= 0) {
            view_direction *= -1;
        }
        let angle_sync = Math.round(angle) * 3;
        activeSrgb.src = `assets/${activeName}_${angle_sync}_srgb.png`;
        activeDop.src = `assets/${activeName}_${angle_sync}_dop.png`;
        activeAolp.src = `assets/${activeName}_${angle_sync}_aolp.png`;
        activeTop.src = `assets/${activeName}_${angle_sync}_top.png`;
        requestAnimationFrame(animate);
    }

    function showSelected(idx) {
        materialName.textContent = `${polarImages[idx].name}`
        views = document.querySelectorAll('.polar-image');
        views.forEach((view, i) => {
            view.classList.toggle('active', i === idx)
        })
        thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === idx)
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
        handle.style.left = `${pos_vertical - 12}px`
        handle.style.top = `${pos_horizontal - 12}px`
    }

    function initSlider() {
        const activeImage = document.querySelector('.polar-image.active');
        pos_horizontal = activeImage.clientHeight / 2;
        pos_vertical = activeImage.clientWidth / 2;
        updateSlider();
    }

    function initViewer() {
        showSelected(current)
        initSlider();
        requestAnimationFrame(animate)
    }

    function nextView() {
        current = (current + 1) % views.length;
        showSelected(current)
    }

    function prevView() {
        current = (current - 1 + views.length) % views.length;
        console.log(current)
        showSelected(current)
    }

    nextButton.addEventListener('click', nextView)
    prevButton.addEventListener('click', prevView)
    window.addEventListener('load', initViewer);
}

renderPolarImage();