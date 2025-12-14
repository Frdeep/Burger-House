/* Club Mawon — présentation + e-commerce (démo UI) */

const CARDS = [
  {
    id: "1",
    kicker: "Carte 1",
    title: "Identité visuelle (Mawón x Ghetball)",
    chip: { label: "Branding", variant: "red" },
    kpi: { value: "1 maillot", label: "emblématique" },
    short:
      "Le maillot officiel (fabriqué par Ghetball) devient le point d’entrée du branding : reconnaissance immédiate, fierté, cohérence.",
    bullets: [
      "Maillot rouge (identité forte du club)",
      "Visuels premium (site + réseaux)",
      "Déclinaisons : posts, stories, bannières",
    ],
    backTitle: "Assets & Branding",
    backBullets: [
      "Pack visuel : logo, palette, règles d’usage",
      "Templates social media (matchday, résultats, annonces)",
      "Guide de ton (voix, slogans, hashtags)",
    ],
    modal: {
      title: "Identité visuelle : le maillot au centre",
      sections: [
        {
          h: "Pourquoi c’est stratégique",
          p: "Le maillot est l’objet le plus mémorisable : il porte l’histoire du club, facilite la reconnaissance et soutient la fidélisation.",
        },
        {
          h: "Intégration (site + social)",
          ul: [
            "Hero et carte 1 avec visuel du maillot",
            "Pack de déclinaisons pour les réseaux (formats vertical/horizontal)",
            "Ligne graphique cohérente : rouge club + contraste slate",
          ],
        },
      ],
      primaryAction: { label: "Ajouter le maillot (démo)", action: "add-jersey" },
      media: { src: "./assets/maillot-mawon.svg", caption: "Maillot officiel (placeholder)" },
    },
  },
  {
    id: "2",
    kicker: "Carte 2",
    title: "Mission stratégique",
    chip: { label: "Stratégie", variant: "orange" },
    kpi: { value: "2 axes", label: "majeurs" },
    short:
      "Mettre en place une plateforme e-commerce pour les maillots officiels, et déployer une stratégie social media dynamique.",
    bullets: ["Axe 1 : Boutique dédiée", "Axe 2 : Social media & communauté", "Pilotage par objectifs (KPI)"],
    backTitle: "KPI & Pilotage",
    backBullets: [
      "Notoriété : portée, impressions, croissance abonnés",
      "Engagement : commentaires, partages, UGC",
      "Conversion : CTR, ajout panier, achats",
    ],
    modal: {
      title: "Mission stratégique : e-commerce + social media",
      sections: [
        {
          h: "Axe 1 — Plateforme e-commerce",
          ul: [
            "Page produit claire (tailles, stock, guide des tailles)",
            "Tunnel d’achat simple (mobile-first)",
            "Paiement sécurisé (à intégrer : Stripe/PayPal/MTN/MoMo selon pays)",
          ],
        },
        {
          h: "Axe 2 — Social media",
          ul: [
            "Calendrier éditorial (matchs, coulisses, joueurs, communauté)",
            "Campagnes de lancement maillot + drops",
            "Mécaniques d’engagement : sondages, concours, challenges",
          ],
        },
      ],
      primaryAction: { label: "Voir la carte e-commerce", action: "open-card-5" },
    },
  },
  {
    id: "3",
    kicker: "Carte 3",
    title: "Objectifs commerciaux",
    chip: { label: "Business", variant: "orange" },
    kpi: { value: "3 objectifs", label: "prioritaires" },
    short:
      "Faciliter l’achat, optimiser la gestion (stocks/commandes), et créer une nouvelle source de revenus via la vente en ligne.",
    bullets: ["UX d’achat rapide", "Gestion stocks & commandes", "Revenus additionnels pour le club"],
    backTitle: "Résultats attendus",
    backBullets: [
      "Diminution des abandons (parcours simplifié)",
      "Visibilité stock en temps réel (à intégrer backend)",
      "Rapports ventes et best-sellers",
    ],
    modal: {
      title: "Objectifs commerciaux : simplifier, gérer, générer",
      sections: [
        {
          h: "1) Faciliter l’achat",
          ul: ["Mobile-first", "CTA clairs", "Pages produit détaillées", "Panier persistant"],
        },
        {
          h: "2) Gestion optimisée",
          ul: ["Stocks par taille", "Suivi commandes", "Base clients (RGPD/consentement)"],
        },
        {
          h: "3) Revenus additionnels",
          ul: ["Ventes directes", "Bundles (maillot + accessoires)", "Drops / éditions limitées"],
        },
      ],
      primaryAction: { label: "Ouvrir le panier (démo)", action: "open-cart" },
    },
  },
  {
    id: "4",
    kicker: "Carte 4",
    title: "Objectifs digitaux",
    chip: { label: "Digital", variant: "orange" },
    kpi: { value: "3 piliers", label: "digital" },
    short: "Notoriété, engagement et acquisition : attirer de nouveaux fans, partenaires et acheteurs.",
    bullets: ["Notoriété", "Engagement", "Acquisition"],
    backTitle: "Canaux & Contenus",
    backBullets: [
      "Instagram/TikTok : formats courts, coulisses",
      "Facebook : communauté locale, événements",
      "WhatsApp : diffusion infos, précommandes (option)",
    ],
    modal: {
      title: "Objectifs digitaux : notoriété, engagement, acquisition",
      sections: [
        {
          h: "Notoriété",
          p: "Visuels cohérents, storytelling club, relais partenaires, campagnes sponsorisées ciblées.",
        },
        {
          h: "Engagement",
          ul: ["UGC (photos supporters)", "Sondages", "Lives", "Matchday posts", "Jeux concours"],
        },
        {
          h: "Acquisition",
          ul: ["Publicités conversion", "Landing page maillot", "Retargeting (pixel)", "Newsletter (option)"],
        },
      ],
      primaryAction: { label: "Voir planning", action: "open-card-6" },
    },
  },
  {
    id: "5",
    kicker: "Carte 5",
    title: "Site web & features",
    chip: { label: "Produit", variant: "orange" },
    kpi: { value: "100%", label: "responsive" },
    short:
      "Catalogue, gestion intelligente (admin), expérience optimisée : design mobile, paiements sécurisés, base clients.",
    bullets: ["Catalogue maillots", "Admin stocks/commandes (roadmap)", "Paiements sécurisés (roadmap)"],
    backTitle: "Démo catalogue (UI)",
    backBullets: [
      "Ajout panier (localStorage)",
      "Sélection taille + quantité",
      "Modal panier + total",
    ],
    modal: {
      title: "Features : catalogue, admin, paiement",
      sections: [
        {
          h: "Catalogue",
          ul: ["Fiches produits", "Variantes (tailles)", "Stock", "Photos + zoom", "Avis (option)"],
        },
        {
          h: "Gestion intelligente (admin)",
          ul: ["Stocks par taille", "Commandes", "Clients", "Exports", "Notifications"],
        },
        {
          h: "Paiements sécurisés",
          ul: ["Stripe/PayPal", "Mobile Money (selon cible)", "Webhooks & anti-fraude"],
        },
      ],
      primaryAction: { label: "Ajouter au panier (démo)", action: "add-jersey" },
    },
    product: {
      id: "jersey-2025",
      name: "Maillot Officiel Mawon x Ghetball",
      priceCents: 4900,
      currency: "EUR",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: "6",
    kicker: "Carte 6",
    title: "Planning & investissement",
    chip: { label: "Roadmap", variant: "orange" },
    kpi: { value: "3 semaines", label: "timeline" },
    short:
      "S1-2 : développement + design. S2-3 : tests & débogage. S3 : lancement + campagne de communication.",
    bullets: ["S1-2 : build plateforme", "S2-3 : tests & data", "S3 : lancement + campagne"],
    backTitle: "Budget",
    backBullets: ["Lancement : 500€ (remise spéciale)", "Maintenance : 60€/mois", "Accompagnement & assistance continue"],
    modal: {
      title: "Planning (3 semaines) & budget",
      sections: [
        {
          h: "Timeline",
          ul: [
            "Semaines 1-2 : développement e-commerce + intégration design",
            "Semaines 2-3 : tests complets, débogage, intégration des données",
            "Semaine 3 : lancement officiel + démarrage communication",
          ],
        },
        {
          h: "Investissement",
          ul: ["Coût de lancement : 500€ (avec remise)", "Accompagnement mensuel : 60€/mois", "Maintenance & support"],
        },
      ],
      primaryAction: { label: "Revenir aux cartes", action: "close" },
    },
  },
];

const CART_KEY = "mawon.cart.v1";
let MEMORY_CART_FALLBACK = [];

function euros(cents) {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return Array.isArray(MEMORY_CART_FALLBACK) ? MEMORY_CART_FALLBACK : [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    MEMORY_CART_FALLBACK = Array.isArray(items) ? items : [];
  }
}

function cartCount(items) {
  return items.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
}

function cartTotal(items) {
  return items.reduce((acc, it) => acc + (Number(it.qty) || 0) * (Number(it.priceCents) || 0), 0);
}

function upsertCartItem(items, item) {
  const idx = items.findIndex((x) => x.id === item.id && x.size === item.size);
  if (idx === -1) return [...items, item];
  const next = [...items];
  next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
  return next;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === false || v == null) continue;
    else if (k in node) node[k] = v;
    else node.setAttribute(k, String(v));
  }
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  }
  return node;
}

function renderCards() {
  const track = document.querySelector("[data-cards-track]");
  track.innerHTML = "";

  for (const card of CARDS) {
    const node = el(
      "article",
      { class: "card", dataset: { cardId: card.id, flipped: "false" }, role: "listitem" },
      [
        el("div", { class: "card__inner" }, [
          // Face avant
          el("div", { class: "face face--front" }, [
            el("div", { class: "card__content" }, [
              el("div", { class: "card__top" }, [
                el("div", { class: `chip ${card.chip.variant === "red" ? "chip--red" : ""}` }, [
                  el("span", { class: "chip__dot", "aria-hidden": "true" }),
                  el("span", {}, [card.chip.label]),
                ]),
                el("div", { class: "kpi" }, [
                  el("div", { class: "kpi__value" }, [card.kpi.value]),
                  el("div", { class: "kpi__label" }, [card.kpi.label]),
                ]),
              ]),
              el("div", { class: "card__title" }, [card.title]),
              el("p", { class: "card__desc" }, [card.short]),
              card.id === "1"
                ? el("div", { class: "media" }, [
                    el("img", {
                      class: "media__img",
                      src: "./assets/maillot-mawon.svg",
                      alt: "Maillot officiel du Club Mawon (placeholder)",
                      loading: "lazy",
                    }),
                    el("div", { class: "media__cap" }, ["Maillot officiel • fabriqué par Ghetball"]),
                  ])
                : null,
              card.id === "5" && card.product
                ? renderProductTeaser(card.product)
                : el("ul", { class: "card__list" }, card.bullets.map((b) => el("li", {}, [b]))),
              el("div", { class: "card__spacer" }),
              el("div", { class: "card__actions" }, [
                el(
                  "button",
                  {
                    class: "link",
                    type: "button",
                    dataset: { action: "open-card", cardId: card.id },
                  },
                  ["Voir détails ?"],
                ),
                el(
                  "button",
                  {
                    class: "flip-btn",
                    type: "button",
                    dataset: { action: "flip-card", cardId: card.id },
                    "aria-label": "Retourner la carte",
                  },
                  ["Flip"],
                ),
              ]),
            ]),
          ]),

          // Face arrière
          el("div", { class: "face face--back" }, [
            el("div", { class: "card__content" }, [
              el("div", { class: "card__top" }, [
                el("div", { class: "chip" }, [
                  el("span", { class: "chip__dot", "aria-hidden": "true" }),
                  el("span", {}, ["Verso"]),
                ]),
                el("div", { class: "kpi" }, [
                  el("div", { class: "kpi__value" }, [card.kpi.value]),
                  el("div", { class: "kpi__label" }, ["en bref"]),
                ]),
              ]),
              el("div", { class: "card__title" }, [card.backTitle]),
              el("ul", { class: "card__list" }, card.backBullets.map((b) => el("li", {}, [b]))),
              el("div", { class: "card__spacer" }),
              el("div", { class: "card__actions" }, [
                el(
                  "button",
                  { class: "link", type: "button", dataset: { action: "open-card", cardId: card.id } },
                  ["Ouvrir modal ?"],
                ),
                el(
                  "button",
                  {
                    class: "flip-btn",
                    type: "button",
                    dataset: { action: "flip-card", cardId: card.id },
                    "aria-label": "Revenir au recto",
                  },
                  ["Flip"],
                ),
              ]),
            ]),
          ]),
        ]),
      ],
    );

    track.appendChild(node);
  }
}

function renderProductTeaser(product) {
  const sizeId = `size-${product.id}`;
  const qtyId = `qty-${product.id}`;

  const node = el("div", { class: "product" }, [
    el("div", { class: "product__row" }, [
      el("div", { class: "product__name" }, [product.name]),
      el("div", { class: "product__price" }, [euros(product.priceCents)]),
    ]),
    el("div", { class: "product__meta" }, ["Sélectionne ta taille, ajoute au panier (démo locale)."]),
    el("div", { class: "product__form" }, [
      el("label", { htmlFor: sizeId }, [
        "Taille",
        el(
          "select",
          { id: sizeId, name: "size" },
          product.sizes.map((s) => el("option", { value: s }, [s])),
        ),
      ]),
      el("label", { htmlFor: qtyId }, [
        "Quantité",
        el("input", { id: qtyId, type: "number", min: "1", max: "10", value: "1", inputMode: "numeric" }),
      ]),
      el(
        "button",
        {
          class: "btn",
          type: "button",
          dataset: { action: "add-to-cart", productId: product.id },
        },
        ["Ajouter au panier"],
      ),
      el(
        "button",
        { class: "btn btn--ghost", type: "button", dataset: { action: "open-cart" } },
        ["Voir panier"],
      ),
    ]),
  ]);

  node.dataset.sizeId = sizeId;
  node.dataset.qtyId = qtyId;
  return node;
}

function flipCard(cardId) {
  const card = document.querySelector(`.card[data-card-id="${cardId}"]`);
  if (!card) return;
  const isFlipped = card.dataset.flipped === "true";
  card.dataset.flipped = isFlipped ? "false" : "true";
}

function openModalForCard(cardId) {
  const card = CARDS.find((c) => c.id === String(cardId));
  if (!card) return;

  const modal = document.querySelector("[data-modal]");
  const panel = modal.querySelector(".modal__panel");
  const kicker = modal.querySelector("[data-modal-kicker]");
  const title = modal.querySelector("[data-modal-title]");
  const body = modal.querySelector("[data-modal-body]");
  const primary = modal.querySelector('[data-action="primary-modal-action"]');

  kicker.textContent = card.kicker;
  title.textContent = card.modal?.title ?? card.title;
  body.innerHTML = "";

  if (card.modal?.media?.src) {
    body.appendChild(
      el("div", { class: "media" }, [
        el("img", {
          class: "media__img",
          src: card.modal.media.src,
          alt: "Maillot officiel (placeholder)",
          loading: "lazy",
        }),
        el("div", { class: "media__cap" }, [card.modal.media.caption ?? ""]),
      ]),
    );
  }

  const sections = card.modal?.sections ?? [];
  for (const s of sections) {
    if (s.h) body.appendChild(el("h3", {}, [s.h]));
    if (s.p) body.appendChild(el("p", {}, [s.p]));
    if (s.ul) body.appendChild(el("ul", {}, s.ul.map((x) => el("li", {}, [x]))));
  }

  const action = card.modal?.primaryAction;
  primary.textContent = action?.label ?? "OK";
  primary.dataset.modalAction = action?.action ?? "close";
  primary.dataset.cardId = String(cardId);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  panel.focus();
}

function closeModal() {
  const modal = document.querySelector("[data-modal]");
  modal.hidden = true;
  document.body.style.overflow = "";
}

function openCart() {
  const modal = document.querySelector("[data-cart-modal]");
  const panel = modal.querySelector(".modal__panel");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  renderCart();
  panel.focus();
}

function closeCart() {
  const modal = document.querySelector("[data-cart-modal]");
  modal.hidden = true;
  document.body.style.overflow = "";
}

function updateCartCount() {
  const items = loadCart();
  const count = cartCount(items);
  const badge = document.querySelector("[data-cart-count]");
  badge.textContent = String(count);
}

function addJerseyToCart({ size = "M", qty = 1 } = {}) {
  const card5 = CARDS.find((c) => c.id === "5");
  const product = card5?.product;
  if (!product) return;

  const items = loadCart();
  const next = upsertCartItem(items, {
    id: product.id,
    name: product.name,
    priceCents: product.priceCents,
    size,
    qty,
  });
  saveCart(next);
  updateCartCount();
}

function renderCart() {
  const body = document.querySelector("[data-cart-body]");
  const items = loadCart();
  body.innerHTML = "";

  if (items.length === 0) {
    body.appendChild(
      el("p", {}, [
        "Ton panier est vide. Ajoute le maillot depuis la carte 5 (features) ou depuis la modal du maillot.",
      ]),
    );
    return;
  }

  const list = el("div", { class: "grid2" }, []);
  for (const it of items) {
    list.appendChild(
      el("div", { class: "product" }, [
        el("div", { class: "product__row" }, [
          el("div", { class: "product__name" }, [it.name]),
          el("div", { class: "product__price" }, [euros(it.priceCents * it.qty)]),
        ]),
        el("div", { class: "product__meta" }, [`Taille : ${it.size} • Quantité : ${it.qty}`]),
        el(
          "button",
          {
            class: "btn btn--ghost",
            type: "button",
            dataset: { action: "remove-cart-item", itemId: it.id, size: it.size },
          },
          ["Retirer"],
        ),
      ]),
    );
  }

  const total = cartTotal(items);
  body.appendChild(list);
  body.appendChild(el("h3", {}, ["Total"]));
  body.appendChild(el("p", {}, [euros(total)]));
  body.appendChild(
    el("p", {}, [
      "Paiement sécurisé et gestion stocks/commandes : à connecter au backend (Stripe/PayPal/Mobile Money + base de données).",
    ]),
  );
}

function removeCartItem(itemId, size) {
  const items = loadCart();
  const next = items.filter((x) => !(x.id === itemId && x.size === size));
  saveCart(next);
  updateCartCount();
  renderCart();
}

function clearCart() {
  saveCart([]);
  updateCartCount();
  renderCart();
}

function checkout() {
  // Démo UI : on simule une validation et on vide.
  const items = loadCart();
  if (items.length === 0) return;
  clearCart();
  closeCart();
  openModalForCard("6");
}

function openCardInTrack(cardId) {
  const track = document.querySelector("[data-cards-track]");
  const card = document.querySelector(`.card[data-card-id="${cardId}"]`);
  if (!track || !card) return;
  card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

function setupEvents() {
  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target.closest("[data-action]") : null;
    if (!target) return;

    const action = target.dataset.action;
    if (action === "flip-card") {
      flipCard(target.dataset.cardId);
    } else if (action === "open-card") {
      openModalForCard(target.dataset.cardId);
    } else if (action === "close-modal") {
      closeModal();
    } else if (action === "open-cart") {
      openCart();
    } else if (action === "close-cart") {
      closeCart();
    } else if (action === "clear-cart") {
      clearCart();
    } else if (action === "checkout") {
      checkout();
    } else if (action === "remove-cart-item") {
      removeCartItem(target.dataset.itemId, target.dataset.size);
    } else if (action === "add-to-cart") {
      const productId = target.dataset.productId;
      const card5 = CARDS.find((c) => c.id === "5");
      const product = card5?.product;
      if (!product || product.id !== productId) return;

      const container = target.closest(".product");
      const sizeEl = container ? document.getElementById(container.dataset.sizeId) : null;
      const qtyEl = container ? document.getElementById(container.dataset.qtyId) : null;
      const size = sizeEl && "value" in sizeEl ? String(sizeEl.value) : "M";
      const qty = qtyEl && "value" in qtyEl ? Math.max(1, Math.min(10, Number(qtyEl.value) || 1)) : 1;
      addJerseyToCart({ size, qty });
      openCart();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const modal = document.querySelector("[data-modal]");
    const cartModal = document.querySelector("[data-cart-modal]");
    if (!cartModal.hidden) closeCart();
    else if (!modal.hidden) closeModal();
  });
}

function setupModalPrimaryAction() {
  const modal = document.querySelector("[data-modal]");
  const primary = modal.querySelector('[data-action="primary-modal-action"]');
  primary.addEventListener("click", () => {
    const act = primary.dataset.modalAction;
    if (act === "add-jersey") {
      addJerseyToCart({ size: "M", qty: 1 });
      openCart();
      return;
    }
    if (act === "open-card-5") {
      closeModal();
      openCardInTrack("5");
      return;
    }
    if (act === "open-card-6") {
      closeModal();
      openCardInTrack("6");
      return;
    }
    closeModal();
  });
}

function init() {
  renderCards();
  setupEvents();
  setupModalPrimaryAction();
  updateCartCount();

  // Bonus UX: sur desktop, molette verticale => scroll horizontal sur les cartes
  const track = document.querySelector("[data-cards-track]");
  track.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) < 2) return;
      // Si l'utilisateur tient Shift, on laisse le comportement natif horizontal.
      if (e.shiftKey) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    },
    { passive: false },
  );
}

init();

