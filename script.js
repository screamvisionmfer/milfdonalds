const copyButton = document.querySelector(".copy-button");

async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

copyButton?.addEventListener("click", async () => {
  const originalText = copyButton.textContent;
  const copyText = copyButton.dataset.copy || "CA: (token address)";

  try {
    await writeClipboard(copyText);
    copyButton.textContent = "Copied";
    copyButton.classList.add("copied");
  } catch {
    copyButton.textContent = "Try Again";
  }

  window.setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.classList.remove("copied");
  }, 1400);
});
