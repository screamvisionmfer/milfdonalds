const PUMPFUN_URL = "#";
const TOKEN_CA = "(token address)";
const DEXSCREENER_URL = "#";
const TELEGRAM_URL = "#";
const X_URL = "#";

const MENU_ITEMS = [
  {
    name: "Big Thighs Burger",
    price: "$8.88",
    description: "Stacked. Saucy. Financially irresponsible.",
    image: "public/assets/food-big-thighs-burger.png"
  },
  {
    name: "Mommy Fries",
    price: "$4.20",
    description: "Crispy support for bad decisions.",
    image: "public/assets/food-mommy-fries.png"
  },
  {
    name: "Thicc Shake",
    price: "$6.66",
    description: "Zero utility. Maximum flavor.",
    image: "public/assets/food-thicc-shake.png"
  },
  {
    name: "Hot Momma Wrap",
    price: "$9.99",
    description: "Wrapped tight. Served loud.",
    image: "public/assets/food-hot-momma-wrap.png"
  },
  {
    name: "Degen Nuggets",
    price: "$13.37",
    description: "For traders who never log off.",
    image: "public/assets/food-degen-nuggets.png"
  },
  {
    name: "Liquidity Sundae",
    price: "$7.77",
    description: "Melts faster than your conviction.",
    image: "public/assets/food-liquidity-sundae.png"
  }
];

const LINK_URLS = {
  pumpfun: PUMPFUN_URL,
  dexscreener: DEXSCREENER_URL,
  telegram: TELEGRAM_URL,
  x: X_URL
};

function applyConfiguredLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const url = LINK_URLS[link.dataset.link] || "#";
    link.href = url;

    if (url !== "#") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function renderMenu() {
  const menuGrid = document.querySelector("#menu-grid");

  if (!menuGrid) {
    return;
  }

  menuGrid.innerHTML = MENU_ITEMS.map(
    (item) => `
      <article class="food-card">
        <div class="food-image-frame">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="food-card-body">
          <div class="food-card-heading">
            <h3>${item.name}</h3>
            <span>${item.price}</span>
          </div>
          <p>${item.description}</p>
          <a class="order-link" href="${PUMPFUN_URL}" data-link="pumpfun">Order</a>
        </div>
      </article>
    `
  ).join("");
}

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

function setupCopyButton() {
  const copyButton = document.querySelector(".copy-button");
  const contractAddress = document.querySelector("#contract-address");
  const tokenCa = document.querySelector("[data-token-ca]");

  if (contractAddress) {
    contractAddress.textContent = `CA: ${TOKEN_CA}`;
  }

  if (tokenCa) {
    tokenCa.textContent = TOKEN_CA;
  }

  if (!copyButton) {
    return;
  }

  copyButton.dataset.copy = TOKEN_CA;

  copyButton.addEventListener("click", async () => {
    const originalText = copyButton.textContent;

    try {
      await writeClipboard(TOKEN_CA);
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
}

renderMenu();
applyConfiguredLinks();
setupCopyButton();
