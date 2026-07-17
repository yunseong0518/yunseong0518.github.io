const polarImages = [
    { name: "Aluminum" },
    { name: "SUJ2" },
    { name: "Fake gold" },
    { name: "Black glass" },
    { name: "White billiard" },
    { name: "White smooth plastic" },
    { name: "White rough plastic" },
    { name: "Black rough plastic" },
    { name: "Silver rough plastic" },
    { name: "Red rough plastic" },
    { name: "Yellow rough plastic" },
    { name: "Plum rough plastic" },
    { name: "Green silicone" },
    { name: "Gray silicone" },
]

// Material names carry spaces, which are not valid in an id. The name is kept
// on dataset.name (it is also the asset filename stem) and the id is slugged.
function materialId(name) {
    return 'material-' + name.toLowerCase().replace(/\s+/g, '-');
}

function renderPolarImage() {
    const polarImageList = document.getElementById('polar-image-list');

    const nirController = document.createElement('div')
    nirController.className = 'nir-controller'
    const visButton = document.createElement('button')
    visButton.className = 'vis-button'
    const nirButton = document.createElement('button')
    nirButton.className = 'nir-button'
    visButton.innerText = 'VIS'
    nirButton.innerText = 'NIR'
    nirController.append(visButton)
    nirController.append(nirButton)
    polarImageList.append(nirController)

    const imageContainer = document.createElement('div')
    imageContainer.className = 'polar-image-container'
    polarImageList.appendChild(imageContainer)

    const materialName = document.createElement('div')
    materialName.className = 'polar-image-name'
    polarImageList.appendChild(materialName)

    const thumbnailViewer = document.createElement('div')
    thumbnailViewer.className = 'polar-image-thumbnail-list'

    const viewEls = [];
    const thumbEls = [];

    let pos_vertical = 0;
    let pos_horizontal = 0;
    let current = 0;
    let angle = 0;
    let view_direction = 1
    let is_nir = false; // true if NIR, false if visible
    let lastFrameKey = '';  // only re-assign img.src when the frame actually changes

    polarImages.forEach((p, idx) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        const img_thumbnail = document.createElement('img');
        img_thumbnail.src = `assets/${p.name}_0_srgb.png`;
        img_thumbnail.alt = p.name;
        img_thumbnail.loading = 'lazy';
        thumbnail.appendChild(img_thumbnail);
        thumbnailViewer.appendChild(thumbnail);
        thumbEls.push(thumbnail);
        thumbnail.onmousedown = () => {
            current = idx
            showSelected(idx)
        }
    })

    polarImages.forEach(p => {
        const el = document.createElement('div');
        el.className = 'polar-image';
        el.id = materialId(p.name);
        el.dataset.name = p.name;

        const srgb = document.createElement('div');
        srgb.className = 'srgb';
        const label_srgb = document.createElement('span');
        label_srgb.innerText = 'RGB';
        srgb.appendChild(label_srgb);
        const img_srgb = document.createElement('img');
        img_srgb.src = `assets/${p.name}_0_srgb.png`;
        srgb.appendChild(img_srgb);
        el.appendChild(srgb);

        const aolp = document.createElement('div');
        aolp.className = 'aolp';
        const label_aolp = document.createElement('span');
        label_aolp.innerText = 'AoLP';
        aolp.appendChild(label_aolp);
        const img_aolp = document.createElement('img');
        img_aolp.src = `assets/${p.name}_0_aolp.png`;
        aolp.appendChild(img_aolp);
        el.appendChild(aolp);

        const top = document.createElement('div');
        top.className = 'top';
        const label_top = document.createElement('span');
        label_top.innerText = 'ToP';
        top.appendChild(label_top);
        const img_top = document.createElement('img');
        img_top.src = `assets/${p.name}_0_top.png`;
        top.appendChild(img_top);
        el.appendChild(top);

        const dop = document.createElement('div');
        dop.className = 'dop';
        const label_dop = document.createElement('span');
        label_dop.innerText = 'DoP';
        dop.appendChild(label_dop);
        const img_dop = document.createElement('img');
        img_dop.src = `assets/${p.name}_0_dop.png`;
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
        viewEls.push(el);

        // One handler drives both mouse and touch dragging.
        const startDrag = (e) => {
            e.preventDefault();
            const onMove = (ev) => {
                const r = el.getBoundingClientRect();
                const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
                const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
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
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', stop);
        };
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: false });
    });

    const controller = document.createElement('div')
    controller.className = 'polar-image-controller'
    const prevButton = document.createElement('button')
    prevButton.className = 'prev'
    const nextButton = document.createElement('button')
    nextButton.className = 'next'

    nextButton.innerHTML = '>';
    prevButton.innerHTML = '<';
    nextButton.setAttribute('aria-label', 'Next material');
    prevButton.setAttribute('aria-label', 'Previous material');

    polarImageList.append(controller)
    imageContainer.append(prevButton)
    controller.append(thumbnailViewer)
    imageContainer.append(nextButton)

    function animate() {
        const activeView = document.querySelector('.polar-image.active')
        if (!activeView) { requestAnimationFrame(animate); return; }

        angle += view_direction * 0.3;

        if (angle >= 9 || angle <= 0) {
            view_direction *= -1;
        }
        const angle_sync = Math.round(angle) * 3;
        const activeName = activeView.dataset.name;

        // The sweep only steps every few frames; skip the redundant src writes.
        const key = `${activeName}|${angle_sync}|${is_nir}`;
        if (key !== lastFrameKey) {
            lastFrameKey = key;
            const band = is_nir ? '_nir' : '';
            activeView.querySelector('.srgb img').src = `assets/${activeName}_${angle_sync}${band}_srgb.png`;
            activeView.querySelector('.dop img').src = `assets/${activeName}_${angle_sync}${band}_dop.png`;
            activeView.querySelector('.aolp img').src = `assets/${activeName}_${angle_sync}${band}_aolp.png`;
            activeView.querySelector('.top img').src = `assets/${activeName}_${angle_sync}${band}_top.png`;
        }
        requestAnimationFrame(animate);
    }

    function showSelected(idx) {
        materialName.textContent = `${polarImages[idx].name}`
        viewEls.forEach((view, i) => {
            view.classList.toggle('active', i === idx)
        })
        thumbEls.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === idx)
        })
        updateSlider()
    }

    function updateSlider() {
        const activeImage = document.querySelector('.polar-image.active');
        if (!activeImage) return;
        const aolp = activeImage.querySelector('.aolp')
        const dop = activeImage.querySelector('.dop')
        const top = activeImage.querySelector('.top')
        const slider_vertical = activeImage.querySelector('.slider-vertical')
        const slider_horizontal = activeImage.querySelector('.slider-horizontal')
        const handle = activeImage.querySelector('.slider-handle')

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
        if (!activeImage || !activeImage.clientHeight) return;
        pos_horizontal = activeImage.clientHeight / 2;
        pos_vertical = activeImage.clientWidth / 2;
        updateSlider();
    }

    function initViewer() {
        showSelected(current)
        visView();
        requestAnimationFrame(animate)
        // The slider is centred from the rendered size, so wait for the first
        // image to have one rather than for every page resource to finish.
        const firstImg = document.querySelector('.polar-image.active .srgb img');
        if (firstImg && firstImg.complete && firstImg.naturalWidth) initSlider();
        else if (firstImg) firstImg.addEventListener('load', initSlider, { once: true });
    }

    function nextView() {
        current = (current + 1) % viewEls.length;
        showSelected(current)
    }

    function prevView() {
        current = (current - 1 + viewEls.length) % viewEls.length;
        showSelected(current)
    }

    function visView() {
        is_nir = false
        visButton.classList.toggle('selected', true)
        nirButton.classList.toggle('selected', false)
    }
    function nirView() {
        is_nir = true
        visButton.classList.toggle('selected', false)
        nirButton.classList.toggle('selected', true)
    }

    nextButton.addEventListener('click', nextView)
    prevButton.addEventListener('click', prevView)
    visButton.addEventListener('click', visView)
    nirButton.addEventListener('click', nirView)

    // This script is deferred, so the DOM is ready: no need to wait on `load`
    // (which would stall the viewer behind every image, video and the iframe).
    initViewer();
}

renderPolarImage();
