// Show the CV button only once assets/cv.pdf actually exists, so a missing
// file never shows up as a broken link. Drop the PDF in place to enable it.
function revealCvLink() {
  const link = document.getElementById('cv-link');
  if (!link) return;
  fetch(link.getAttribute('href'), { method: 'HEAD', cache: 'no-cache' })
    .then(res => { if (res.ok) link.hidden = false; })
    .catch(() => {}); // offline / file:// preview: keep it hidden
}

revealCvLink();
