const LINKS = {
  x: "https://x.com/milfdonaldscoin",
  solana: {
    ca: "CCdydK4q2yQTAFBgxxoapmgENbcj5kp58uJ9MYXwpump",
    buy: "https://pump.fun/coin/CCdydK4q2yQTAFBgxxoapmgENbcj5kp58uJ9MYXwpump",
    chart: "#"
  },
  base: {
    ca: "(base token address)",
    buy: "https://cc0.company/",
    chart: "#"
  },
  telegram: "https://t.me/milfdonalds"
};

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

const BRANCHES = [
  {
    key: "solana",
    label: "Original Kitchen",
    name: "Solana Street",
    manager: "Misty Buns",
    character: "blonde MilfDonalds cashier",
    text: "The original Solana kitchen. Fast orders, hot fries and pump.fun chaos.",
    chain: "Solana",
    image: "public/assets/milfdonalds-shift-manager.png",
    orderText: "Order on Solana",
    buyLink: "solana-buy",
    chartLink: "solana-chart"
  },
  {
    key: "base",
    label: "New Branch",
    name: "Base Street",
    manager: "Sasha Sauce",
    character: "blue-haired alt/zoomer MilfDonalds cashier",
    text: "The new Base branch. Blue hair, onchain orders and extra EVM sauce.",
    chain: "Base",
    image: "public/assets/milfdonalds-base-manager.png",
    orderText: "Order on Base",
    buyLink: "base-buy",
    chartLink: "base-chart"
  }
];

const LINK_URLS = {
  x: LINKS.x,
  telegram: LINKS.telegram,
  "solana-buy": LINKS.solana.buy,
  "solana-chart": LINKS.solana.chart,
  "base-buy": LINKS.base.buy,
  "base-chart": LINKS.base.chart
};

function applyConfiguredLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const url = LINK_URLS[link.dataset.link] || "#";
    link.href = url;

    if (url !== "#") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
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
          <a class="order-link" href="${LINKS.solana.buy}" data-link="solana-buy">Order</a>
        </div>
      </article>
    `
  ).join("");
}

function renderBranches() {
  const branchGrid = document.querySelector("#branch-grid");

  if (!branchGrid) {
    return;
  }

  branchGrid.innerHTML = BRANCHES.map(
    (branch) => `
      <article class="branch-card ${branch.key === "base" ? "base-branch" : ""}">
        <div class="branch-image">
          <img src="${branch.image}" alt="${branch.character}" loading="lazy" />
        </div>
        <div class="branch-copy">
          <span class="branch-label">${branch.label}</span>
          <h3>${branch.name}</h3>
          <p>${branch.text}</p>
          <dl class="branch-fields">
            <div>
              <dt>Chain</dt>
              <dd>${branch.chain}</dd>
            </div>
            <div>
              <dt>Manager</dt>
              <dd>${branch.manager}</dd>
            </div>
            <div>
              <dt>CA</dt>
              <dd>${LINKS[branch.key].ca}</dd>
            </div>
          </dl>
          <div class="branch-actions">
            <a class="order-link" href="${LINKS[branch.key].buy}" data-link="${branch.buyLink}">
              ${branch.orderText}
            </a>
            <a class="order-link chart-link" href="${LINKS[branch.key].chart}" data-link="${branch.chartLink}">
              View Chart
            </a>
          </div>
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

function setupTokenText() {
  document.querySelectorAll("[data-ca-value]").forEach((element) => {
    const chain = element.dataset.caValue;
    element.textContent = LINKS[chain]?.ca || "";
  });
}

function setupCopyButtons() {
  document.querySelectorAll("[data-copy-chain]").forEach((copyButton) => {
    const chain = copyButton.dataset.copyChain;
    const copyText = LINKS[chain]?.ca || "";

    copyButton.addEventListener("click", async () => {
      const originalText = copyButton.textContent;

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
  });
}

renderMenu();
renderBranches();
setupTokenText();
applyConfiguredLinks();
setupCopyButtons();
