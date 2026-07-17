// Click-to-copy module.
//
// Mark any element with `data-copy` and clicking it copies its text to the
// clipboard. If the element contains a <pre>, only the <pre> text is copied
// (so labels like the "Click to copy" hint are left out). An element with
// class `copy-hint` inside is used for feedback.
//
//   <div class="bibtex" data-copy>
//     <span class="copy-hint">Click to copy</span>
//     <pre>@inproceedings{...}</pre>
//   </div>

const COPY_HINT_IDLE = "Click to copy";
const COPY_HINT_DONE = "Copied!";
const COPY_HINT_FAIL = "Press Ctrl+C";
const COPY_FEEDBACK_MS = 1600;

// navigator.clipboard needs a secure context (https/localhost); fall back to a
// hidden textarea + execCommand so this still works over file:// and http://.
async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      /* fall through to the legacy path */
    }
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

function initCopyBlocks() {
  document.querySelectorAll("[data-copy]").forEach((el) => {
    // The <pre> holds the payload; everything else is chrome.
    const source = el.querySelector("pre") || el;
    const hint = el.querySelector(".copy-hint");
    let timer = null;

    // Make it keyboard-operable without relying on <button> styling resets.
    if (!el.hasAttribute("tabindex")) el.tabIndex = 0;
    if (!el.hasAttribute("role")) el.setAttribute("role", "button");
    if (hint && !hint.textContent.trim()) hint.textContent = COPY_HINT_IDLE;

    function feedback(ok) {
      el.classList.toggle("is-copied", ok);
      el.classList.toggle("is-failed", !ok);
      if (hint) hint.textContent = ok ? COPY_HINT_DONE : COPY_HINT_FAIL;
      clearTimeout(timer);
      timer = setTimeout(() => {
        el.classList.remove("is-copied", "is-failed");
        if (hint) hint.textContent = COPY_HINT_IDLE;
      }, COPY_FEEDBACK_MS);
    }

    async function copy() {
      const ok = await writeClipboard(source.textContent.trim());
      feedback(ok);
    }

    el.addEventListener("click", copy);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Space would otherwise scroll the page
        copy();
      }
    });
  });
}

initCopyBlocks();
