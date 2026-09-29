/* ═══════════════════════════════════════════════════════════════
   SOHO FLOWERS · MOTOR DE CONVERSIÓN EDITORIAL
   Catálogo 21 + Bolsa con miniaturas + Checkout Paso a Paso
   Flow/Webpay + PayPal · Tracking 4D · Persistencia
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  brand: "Soho Flowers",
  whatsapp: "56951134778",
  api: {
    worker:        "https://api.sohoflowers.cl",
    flowCreate:    "https://api.sohoflowers.cl/flow/create",
    paypalCreate:  "https://api.sohoflowers.cl/paypal/create-order",
    paypalCapture: "https://api.sohoflowers.cl/paypal/capture-order",
    track:         "https://api.sohoflowers.cl/api/track",
    cupos:         "https://api.sohoflowers.cl/cupos"
  },
  paypalClientId: "BAA-hxfOCTSXES_tu6wf7VYtunGXQ_mqxd13k29F0Y64v9BnXBZX88yykOwR3Piv7kqBdDDKhZHSZ82iTA",
  freeShipThreshold: 69990,
  freeShipBonus: 7250,
  expressMultiplier: 1.5,
  expressCutoffHour: 19,
  cuposPorDia: 30,
  zones: [
    { id: 1, name: "Central",     price: 3500,  detail: "Reñaca Centro, Los Almendros, Jardín del Mar, Los Pinos" },
    { id: 2, name: "Local",       price: 5000,  detail: "Reñaca Norte, Montemar, Higuerillas, Gómez Carreño, Glorias Navales" },
    { id: 3, name: "Intermedia",  price: 7500,  detail: "Viña Centro y Cerros, Reñaca Alto, Concón Los Romeros, Costa de Montemar" },
    { id: 4, name: "Extendida",   price: 10000, detail: "Mantagua, Chorrillos, Valparaíso Plan y Cerros, Quilpué Centro" },
    { id: 5, name: "Extendida+",  price: 15000, detail: "Quintero, Curauma, Placilla, El Belloto" }
  ]
};

const CATALOG = [
  { id: 1,   occ: "romance",     name: "Amor Delicado",         price: 28900,  img: "img/RAMOS01.webp", desc: "Lisianthus, lilium, limonium y astromelias." },
  { id: 2,   occ: "romance",     name: "Susurro de Amor",       price: 28900,  img: "img/RAMOS02.webp", desc: "Lilium, rosas, gypso y maule." },
  { id: 3,   occ: "romance",     name: "Amor Eterno",           price: 230900, img: "img/RAMOS03.webp", desc: "Arreglo de 70 rosas premium seleccionadas." },
  { id: 4,   occ: "celebracion", name: "Pasión de Sol",         price: 45900,  img: "img/RAMOS04.webp", desc: "Girasoles, rosas, gypso y maule." },
  { id: 5,   occ: "celebracion", name: "Monte Mar Signature",   price: 31900,  img: "img/RAMOS05.webp", desc: "Gerberas, rosas, maules y gypso." },
  { id: 6,   occ: "celebracion", name: "Brisa de Primavera",    price: 36900,  img: "img/RAMOS06.webp", desc: "Gerberas, astromelias, lisianthus y ruscus." },
  { id: 7,   occ: "celebracion", name: "Golden Bloom",          price: 47900,  img: "img/RAMOS07.webp", desc: "Girasoles, lisianthus, maule y clavelinas." },
  { id: 8,   occ: "romance",     name: "Suave Amanecer",        price: 37900,  img: "img/RAMOS08.webp", desc: "Lisianthus, rosas, maules y gypso." },
  { id: 9,   occ: "celebracion", name: "Jardín de Verano",      price: 28900,  img: "img/RAMOS09.webp", desc: "Astromelias, gerberas, lilium y limonium." },
  { id: 10,  occ: "romance",     name: "Susurro Rosé",          price: 48900,  img: "img/RAMOS10.webp", desc: "Tulipanes y limonium." },
  { id: 11,  occ: "romance",     name: "Luz de Atardecer",      price: 42900,  img: "img/RAMOS11.webp", desc: "Rosas, astromelias y limonium." },
  { id: 12,  occ: "celebracion", name: "Encanto Vivo",          price: 37900,  img: "img/RAMOS12.webp", desc: "Astromelias, lisianthus, gypso y gerberas." },
  { id: 13,  occ: "homenajes",   name: "Luz Infinita",          price: 45900,  img: "img/luz-infinita.webp", desc: "Ramo de rosas blancas. Sobrio y luminoso." },
  { id: 14,  occ: "homenajes",   name: "Luz del Alba",          price: 68900,  img: "img/luz-del-alba.webp", desc: "Lirios blancos y alstroemerias en cesto." },
  { id: 15,  occ: "homenajes",   name: "Sereno",                price: 59900,  img: "img/sereno.webp",       desc: "Rosas y lirios blancos en caja gris." },
  { id: 16,  occ: "romance",     name: "Dulce Amor",            price: 48900,  img: "img/dulce-amor.webp",   desc: "Selección en tonos rosados y blancos." },
  { id: 17,  occ: "homenajes",   name: "Esperanza",             price: 138900, img: "img/esperanza.webp",    desc: "Cesto grande de lirios y rosas blancas." },
  { id: 18,  occ: "celebracion", name: "Luz de Primavera",      price: 47900,  img: "img/luz-de-primavera.webp", desc: "Girasoles, gerberas y rosas amarillas." },
  { id: 19,  occ: "celebracion", name: "Destello de Primavera", price: 21990,  img: "img/destello-de-primavera.webp", desc: "Girasol central con gerberas y rosas." },
  { id: 201, occ: "homenajes",   name: "Cubre Urna Sublime",    price: 129900, img: "img/cubre-urna.webp",   desc: "Delicado homenaje en blancos y crema." },
  { id: 202, occ: "homenajes",   name: "Cojín de Condolencias", price: 58900,  img: "img/cojin.webp",        desc: "Composición sobria en rosas y astromelias." }
];

const BADGES = [3, 5, 8, 10, 11];

const MSGS = {
  condolencias: [
    "Sé que no hay palabras para este dolor, pero quiero que sepas que estoy aquí. Que estas flores te abracen en la distancia.",
    "Las almas que dejan huella nunca se marchan: florecen en nuestros recuerdos. Con el mayor de los respetos, te acompaño.",
    "Te envío toda mi fuerza y cariño en este momento de tristeza. Que los recuerdos hermosos te sirvan de consuelo."
  ],
  romance: [
    "Cada pétalo de este ramo me recuerda a un momento a tu lado. Gracias por hacer que mi vida florezca. Te amo.",
    "Ninguna obra de la naturaleza se compara al privilegio de tenerte en mi vida. Eres mi lugar seguro.",
    "Aunque el tiempo pase y las estaciones cambien, lo que siento por ti solo crece. Gracias por ser mi refugio."
  ],
  cumpleanos: [
    "Que este nuevo año florezca con la misma luz y alegría que transmites. Celebro tu vida hoy y siempre.",
    "Brindo por ti y por todo lo que has logrado. Que hoy recibas tanto amor como el que siempre entregas."
  ],
  agradecimiento: [
    "Hay gestos que cambian el rumbo de las cosas, y el tuyo fue uno de ellos. Gracias por tu apoyo incondicional; nunca lo olvidaré.",
    "Las palabras a veces quedan cortas para expresar la verdadera gratitud. Espero que este detalle transmita lo mucho que valoro tu tiempo y tu confianza."
  ]
};

/* ═══ ESTADO GLOBAL ═══ */
let cart = [];
let S = {
  logistics: "envio",
  zone: null,
  date: "",
  dateMode: "",
  time: "",
  express: false,
  occasion: "todos",
  code: null,
  calendarDate: new Date(new Date().toLocaleString("en-US", { timeZone: "America/Santiago" }))
};
let cuposMes = {};
const pageStartTime = Date.now();
let paypalLoaded = false;
let paypalRendered = false;

try {
  cart = JSON.parse(localStorage.getItem("soho_cart")) || [];
  S.logistics = localStorage.getItem("soho_logistics") || "envio";
  S.date      = localStorage.getItem("soho_date")      || "";
  S.time      = localStorage.getItem("soho_time")      || "";
  S.express   = localStorage.getItem("soho_express")   === "true";
  const savedZ = localStorage.getItem("soho_zone_id");
  if (savedZ) S.zone = CONFIG.zones.find(z => z.id === parseInt(savedZ, 10)) || null;
} catch (e) {
  console.warn("Storage no disponible.");
}

/* ═══ SESIÓN & TRACKING 4D ═══ */
const sid = sessionStorage.getItem("soho_sid") || ("sid_" + Date.now() + "_" + Math.floor(Math.random() * 1e5));
sessionStorage.setItem("soho_sid", sid);

let pagePath = window.location.pathname || "/";
if (pagePath === "/") pagePath = "/index.html";

window.trackEvent4D = function(name, data = {}) {
  fetch(CONFIG.api.track, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({ session_id: sid, event_name: name, event_data: data, url: pagePath })
  }).catch(() => {});
};

window.trackEvent4D("page_view");

if (pagePath.includes("gracias.html")) {
  cart.forEach(item => window.trackEvent4D("purchase", {
    product_id: item.id, product_name: item.name, price: item.price, qty: item.qty
  }));
}

/* ═══ UTILIDADES CRÍTICAS ═══ */
const $ = id => document.getElementById(id);
const clp = n => "$" + (n || 0).toLocaleString("es-CL");

function flowersSubtotal() {
  return cart.reduce((a, i) => a + i.price * i.qty, 0);
}

const hoyDate = () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Santiago" }));

const hoyStr = () => {
  const d = hoyDate();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const mananaStr = () => {
  const d = hoyDate();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola Soho Flowers, necesito un arreglo:")}`;
  if ($("wa-float")) $("wa-float").href = wa;
  if ($("wa-footer")) $("wa-footer").href = wa;
});

/* ═══ EMBUDO HERO & OCASIÓN ═══ */
function startFunnel(mode) {
  S.dateMode = mode;
  window.trackEvent4D("intent_click", { mode });
  S.date = mode === "hoy" ? "hoy" : "";
  document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
}

function filterOccasion(occ) {
  S.occasion = occ;
  window.trackEvent4D("occasion_filter", { occ });
  document.querySelectorAll(".occ-btn").forEach(b => b.classList.toggle("on", b.dataset.occ === occ));
  const t = $("catalog-title");
  if (t) {
    t.innerText = occ === "todos" ? "Colección completa" :
      occ === "homenajes" ? "Homenajes y condolencias" : occ === "romance" ? "Romance" : "Celebración";
  }
  renderGrid();
  document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
}

/* ═══ CATÁLOGO EDITORIAL ═══ */
function renderGrid() {
  const grid = $("product-grid");
  if (!grid) return;
  const items = S.occasion === "todos" ? CATALOG : CATALOG.filter(p => p.occ === S.occasion);
  grid.className = "grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16";
  grid.innerHTML = items.map(p => `
    <div class="group flex flex-col cursor-pointer" onclick="addToCart(${p.id})">
      <div class="relative aspect-[4/5] bg-ink/5 rounded-none overflow-hidden mb-4">
        <img src="${p.img}" loading="lazy" alt="${p.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
        ${BADGES.includes(p.id) ? `<span class="absolute top-4 left-4 z-10 bg-ivory/80 backdrop-blur-md px-3 py-1.5 micro text-[8px] text-ink">Más Vendidos</span>` : ""}
      </div>
      <h3 class="display text-2xl md:text-3xl leading-none text-ink">${p.name}</h3>
      <p class="text-[11px] font-sans opacity-50 mt-2 line-clamp-2 leading-relaxed">${p.desc}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="display text-2xl text-ink">${clp(p.price)}</span>
        <span class="micro font-bold text-goldink cursor-pointer hover:opacity-70 transition-opacity duration-300">Agregar +</span>
      </div>
    </div>`).join("");
}

/* ═══ BOLSA (DRAWER) ═══ */
function addToCart(id) {
  const p = CATALOG.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++; else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();

  const n = $("cart-count");
  if (n) {
    n.classList.add("scale-150");
    setTimeout(() => n.classList.remove("scale-150"), 300);
  }
  toggleBag(true);
  window.trackEvent4D("add_to_cart", { product_id: id, product_name: p.name, value: p.price });
}

function chooseProduct(id) { addToCart(id); }
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
}

function updateQty(id, d) {
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
}

function toggleBag(force) {
  const bag = $("atelier-bag"), ov = $("cart-overlay");
  if (!bag) return;
  const open = force !== undefined ? force : !bag.classList.contains("translate-x-0");
  if (open) {
    if (ov) { ov.classList.remove("hidden"); setTimeout(() => ov.classList.remove("opacity-0"), 10); }
    bag.classList.remove("translate-x-full");
    bag.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  } else {
    if (ov) { ov.classList.add("opacity-0"); setTimeout(() => ov.classList.add("hidden"), 300); }
    bag.classList.add("translate-x-full");
    bag.classList.remove("translate-x-0");
    document.body.style.overflow = "";
  }
}

function updateCartUI() {
  const cont = $("cart-items-container");
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const cc = $("cart-count");
  if (cc) cc.innerText = count;

  const sub = flowersSubtotal();
  const cartTotalEl = $("cart-total");
  if (cartTotalEl) cartTotalEl.innerText = clp(sub);

  if (!cont) return;

  if (!cart.length) {
    cont.innerHTML = `<div class="text-center py-20 opacity-60">
      <p class="display text-3xl">Su bolsa está vacía</p>
      <button onclick="toggleBag(false); document.getElementById('coleccion').scrollIntoView({behavior:'smooth'})" class="micro underline underline-offset-4 mt-4 text-goldink">Ir a la Colección</button>
    </div>`;
    if (cartTotalEl) cartTotalEl.innerText = "$0";
    return;
  }

  cont.innerHTML = cart.map(item => `
    <div class="flex gap-6 items-center">
      <div class="w-24 h-32 flex-shrink-0 bg-ink/5 relative overflow-hidden">
        <img src="${item.img}" onerror="this.style.opacity='0'" class="w-full h-full object-cover relative z-10" alt="${item.name}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="display text-2xl leading-none truncate text-ink">${item.name}</h4>
        <p class="text-sm font-light mt-2 opacity-70">${clp(item.price)}</p>
        <div class="flex items-center gap-6 mt-4">
          <div class="flex items-center gap-3 micro opacity-60">
            <button type="button" onclick="updateQty(${item.id},-1)" class="hover:text-ink transition select-none" aria-label="Disminuir">−</button>
            <span class="w-4 text-center">${item.qty}</span>
            <button type="button" onclick="updateQty(${item.id},1)" class="hover:text-ink transition select-none" aria-label="Aumentar">+</button>
          </div>
          <button type="button" onclick="removeFromCart(${item.id})" class="micro opacity-30 hover:opacity-100 transition">Quitar</button>
        </div>
      </div>
    </div>`).join("");
}

function procederCheckout() {
  if (!cart.length) return alert("Su bolsa está vacía. Añada un arreglo primero.");
  toggleBag(false);
  openCheckout();
}

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT SECUENCIAL PASO A PASO
   ═══════════════════════════════════════════════════════════════ */
function openCheckout() {
  if (!cart.length) {
    alert("Su bolsa está vacía. Añada un arreglo primero.");
    document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  
  S.code = localStorage.getItem("soho_draft_code") || ("SF-" + Date.now());
  localStorage.setItem("soho_draft_code", S.code);

  const flow = $("checkout-flow");
  if (!flow) return;
  
  flow.classList.remove("hidden");
  setTimeout(() => flow.classList.add("open"), 10);
  document.body.style.overflow = "hidden";

  restaurarProgresoCheckout();
  cargarCupos(S.calendarDate);
  actualizarVistaHoyCheckout();
  
  goToStep("step-1");
  window.trackEvent4D("begin_checkout", { value: flowersSubtotal(), order_code: S.code });
}

function closeCheckout() {
  const flow = $("checkout-flow");
  if (!flow) return;
  flow.classList.remove("open");
  setTimeout(() => {
    flow.classList.add("hidden");
    document.body.style.overflow = "";
  }, 600);
}

function goToStep(stepId) {
  document.querySelectorAll(".checkout-step").forEach(s => s.classList.remove("active"));
  const target = $(stepId);
  if (target) {
    target.classList.add("active");
    target.scrollTop = 0;
  }
  guardarProgresoCheckout();

  if (stepId === "step-time") renderHorariosInteligentes();
  if (stepId === "step-calendario") renderCalendarView();
  if (stepId === "step-6") renderResumenFinal();

  window.trackEvent4D("checkout_step", { step_target: stepId });
}

/* ── Validaciones y Navegación ── */
function validarEmailYContinuar() {
  const email = $("buyer-email")?.value.trim() || "";
  const phone = $("buyer-whatsapp")?.value.trim() || "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Por favor ingresa un correo electrónico válido para tu confirmación.");
    $("buyer-email")?.focus();
    return;
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    alert("Por favor ingresa tu número de WhatsApp o teléfono de contacto.");
    $("buyer-whatsapp")?.focus();
    return;
  }

  window.trackEvent4D("lead_captured", {
    email,
    step_name: "step-buyer-email",
    cart_value: flowersSubtotal(),
    name: $("sender-name")?.value || ""
  });

  goToStep("step-2");
}

function validarReceptorYContinuar() {
  const name = $("receiver-name")?.value.trim() || "";
  if (name.length < 2) {
    alert("Por favor indica el nombre de la persona que recibirá las flores.");
    $("receiver-name")?.focus();
    return;
  }
  goToStep("step-3");
}

function seleccionarModalidad(m) {
  S.logistics = m;
  if (m === "envio") {
    goToStep("step-zona");
  } else {
    S.zone = null;
    goToStep("step-quien-retira");
  }
  guardarProgresoCheckout();
}

function seleccionarZona(id) {
  S.zone = CONFIG.zones.find(z => z.id === id) || null;
  guardarProgresoCheckout();
  goToStep("step-direccion");
}

function confirmarDireccion() {
  const addr = $("address")?.value.trim() || "";
  if (addr.length < 5) {
    alert("Por favor ingresa la dirección completa de entrega (calle, número y depto/casa).");
    $("address")?.focus();
    return;
  }
  goToStep("step-fecha");
}

function confirmarRetiro() {
  const pick = $("pickup-name")?.value.trim() || "";
  if (pick.length < 3) {
    alert("Por favor ingresa el nombre de la persona que retirará en el taller.");
    $("pickup-name")?.focus();
    return;
  }
  goToStep("step-fecha");
}

function regresarDesdeFecha() {
  if (S.logistics === "envio") goToStep("step-direccion");
  else goToStep("step-quien-retira");
}

function seleccionarFecha(modo) {
  if (modo === "futuro") {
    goToStep("step-calendario");
  } else {
    S.date = modo;
    S.express = false;
    S.time = "";
    guardarProgresoCheckout();
    goToStep("step-time");
  }
}

/* ── Calendario Visual ── */
function renderCalendarView() {
  const grid = $("calendar-grid-view"), title = $("cal-month-title-view");
  if (!grid || !title) return;

  const today = hoyDate();
  const y = S.calendarDate.getFullYear(), m = S.calendarDate.getMonth();
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  title.innerText = `${meses[m]} ${y}`;

  if ($("cal-prev-btn")) $("cal-prev-btn").style.visibility = (y === today.getFullYear() && m === today.getMonth()) ? "hidden" : "visible";

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const parts = [];

  for (let g = 0; g < firstDay; g++) parts.push("<div></div>");

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(y, m, day); d.setHours(0, 0, 0, 0);
    const t = new Date(today); t.setHours(0, 0, 0, 0);
    const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const libres = getCuposLibres(dateStr);

    if (d.getTime() < t.getTime()) {
      parts.push(`<div class="py-4 text-center opacity-25 font-serif text-lg">${day}</div>`);
    } else if (libres <= 0) {
      parts.push(`<div class="py-4 font-serif text-lg line-through opacity-30 text-center">${day}</div>`);
    } else {
      const badge = libres <= 5 ? `<span class="text-[9px] text-goldink block leading-none mt-1">Disp ${libres}</span>` : "";
      parts.push(`
        <button onclick="seleccionarDiaCalendario('${dateStr}')" class="py-3 font-serif text-xl font-bold hover:text-gold transition flex flex-col items-center justify-center border border-ink/10 hover:border-gold bg-white">
          <span>${day}</span>${badge}
        </button>`);
    }
  }
  grid.innerHTML = parts.join("");
}

function cambiarMesCalendario(dir) {
  S.calendarDate.setMonth(S.calendarDate.getMonth() + dir);
  cargarCupos(S.calendarDate);
  renderCalendarView();
}

function seleccionarDiaCalendario(dateStr) {
  S.date = dateStr;
  S.express = false;
  S.time = "";
  guardarProgresoCheckout();
  goToStep("step-time");
}

/* ── Horarios ── */
function renderHorariosInteligentes() {
  const cont = $("time-slots-view");
  const label = $("time-chosen-date-label");
  if (!cont) return;

  const isHoy = S.date === "hoy" || S.date === hoyStr();
  const now = hoyDate();
  const h = now.getHours() + now.getMinutes() / 60;

  if (label) {
    label.innerText = isHoy ? `Entregas para HOY (${hoyDate().toLocaleDateString("es-CL", { day: "numeric", month: "long" })})` : `Fecha de entrega elegida: ${S.date}`;
  }

  let html = "";
  if (!isHoy) {
    html = ["Mañana (10:00–13:00)", "Mediodía (14:00–17:00)", "Tarde (18:00–21:00)"].map(t => `
      <button onclick="definirHorario('${t}', false)" class="step-option-big w-full py-5 text-sm uppercase tracking-widest font-bold bg-white text-ink">${t}</button>
    `).join("");
  } else {
    if (h < 9)  html += `<button onclick="definirHorario('Mañana (10:00–13:00)', false)" class="step-option-big w-full py-5 text-sm uppercase tracking-widest font-bold bg-white text-ink">Mañana (10:00–13:00)</button>`;
    if (h < 11) html += `<button onclick="definirHorario('Mediodía (14:00–17:00)', false)" class="step-option-big w-full py-5 text-sm uppercase tracking-widest font-bold bg-white text-ink">Mediodía (14:00–17:00)</button>`;
    if (h < 14) html += `<button onclick="definirHorario('Tarde (18:00–21:00)', false)" class="step-option-big w-full py-5 text-sm uppercase tracking-widest font-bold bg-white text-ink">Tarde (18:00–21:00)</button>`;

    if (S.logistics === "envio") {
      let start = now.getMinutes() === 0 ? now.getHours() + 1 : now.getHours() + 2;
      start = Math.max(10, start);
      if (start <= 20) {
        html += `<p class="micro text-goldink pt-4 pb-1 text-left">Express 1–2 h (+50% solo sobre el envío):</p>`;
        for (let a = start; a <= 20; a++) {
          const tName = `Express (${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00)`;
          html += `<button onclick="definirHorario('${tName}', true)" class="step-option-big w-full py-4 text-xs uppercase tracking-widest font-bold border border-gold text-goldink bg-white">${tName}</button>`;
        }
      }
    }
  }

  cont.innerHTML = html || `<p class="text-sm opacity-50 py-4">Cupos cerrados para hoy. Elige otra fecha.</p><button onclick="goToStep('step-fecha')" class="btn-line micro py-4 px-6 mt-2">Ver fechas disponibles</button>`;
}

function regresarDesdeTime() {
  if (S.date === "hoy" || S.date === "manana") goToStep("step-fecha");
  else goToStep("step-calendario");
}

function definirHorario(slot, isExp) {
  S.time = slot;
  S.express = isExp;
  guardarProgresoCheckout();
  setTimeout(() => goToStep("step-4"), 250);
}

function escribirMensaje(kind) {
  const list = MSGS[kind] || [];
  if (!list.length) return;
  const msg = list[Math.floor(Math.random() * list.length)];
  const t = $("card-message");
  if (!t) return;
  t.value = "";
  let i = 0;
  const iv = setInterval(() => {
    t.value += msg.charAt(i++);
    if (i >= msg.length) {
      clearInterval(iv);
      guardarProgresoCheckout();
    }
  }, 15);
}
const writeMsg = escribirMensaje;

function validarTelefonoYContinuar() {
  const phone = $("receiver-phone")?.value.trim() || "";
  if (phone && phone.replace(/\D/g, "").length < 8) {
    alert("Si ingresas un teléfono, debe tener al menos 8 dígitos.");
    $("receiver-phone")?.focus();
    return;
  }
  goToStep("step-6");
}

/* ── Cálculo y Resumen Final ── */
function calcTotals() {
  const sub = flowersSubtotal();
  const baseShip = (S.logistics === "retiro" || !S.zone) ? 0 : (S.zone.price || 0);
  const ship = S.express ? Math.round(baseShip * CONFIG.expressMultiplier) : baseShip;
  const bonus = sub >= CONFIG.freeShipThreshold ? Math.min(ship, CONFIG.freeShipBonus) : 0;
  return { sub, baseShip, ship, bonus, total: sub + ship - bonus };
}

function renderResumenFinal() {
  const cont = $("checkout-final-summary");
  if (!cont) return;

  const t = calcTotals();
  const isEnvio = S.logistics === "envio";

  cont.innerHTML = `
    <div class="border-b border-ink/10 pb-4 mb-4">
      <p class="micro opacity-50 mb-2">Arreglos Seleccionados</p>
      ${cart.map(i => `
        <div class="flex justify-between items-center text-sm mb-1">
          <span>${i.name} <span class="opacity-50">×${i.qty}</span></span>
          <span class="font-bold">${clp(i.price * i.qty)}</span>
        </div>
      `).join("")}
    </div>

    <div class="space-y-1.5 text-sm pb-4 border-b border-ink/10">
      <div class="flex justify-between text-xs opacity-70">
        <span>Destino</span>
        <span class="font-bold">${isEnvio ? (S.zone ? S.zone.name : "Envío a Domicilio") : "Retiro en Atelier"}</span>
      </div>
      <div class="flex justify-between text-xs opacity-70">
        <span>Fecha y Hora</span>
        <span>${S.date} · ${S.time}</span>
      </div>
      <div class="flex justify-between pt-2">
        <span>Subtotal Flores</span>
        <span>${clp(t.sub)}</span>
      </div>
      <div class="flex justify-between">
        <span>Costo Logística</span>
        <span>${isEnvio ? clp(t.ship) : "$0"}</span>
      </div>
      ${t.bonus ? `
        <div class="flex justify-between text-goldink">
          <span>Envío de Cortesía</span>
          <span>−${clp(t.bonus)}</span>
        </div>` : ""}
    </div>

    <div class="flex justify-between items-end pt-2">
      <span class="micro opacity-60">Total a Pagar</span>
      <span class="display text-3xl md:text-4xl text-goldink font-bold">${clp(t.total)}</span>
    </div>
  `;
}

function actualizarVistaHoyCheckout() {
  const btn = $("btn-fecha-hoy");
  if (!btn) return;
  const libres = getCuposLibres(hoyStr());
  const now = hoyDate();

  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour) {
    btn.innerHTML = `<span class="line-through opacity-40">Hoy</span><span class="text-[9px] text-goldink block mt-1">Agotado</span>`;
    btn.disabled = true;
    btn.classList.add("opacity-40", "cursor-not-allowed");
  } else if (libres <= 5) {
    btn.innerHTML = `Hoy <span class="text-[9px] text-goldink block mt-1">Solo ${libres} cupos</span>`;
    btn.disabled = false;
    btn.classList.remove("opacity-40", "cursor-not-allowed");
  } else {
    btn.innerHTML = `Hoy`;
    btn.disabled = false;
    btn.classList.remove("opacity-40", "cursor-not-allowed");
  }
}

/* ── Validación General antes de Pagar ── */
function validarPasoCheckout() {
  if (!cart.length) {
    alert("Su bolsa está vacía. Seleccione un arreglo primero.");
    closeCheckout();
    return false;
  }
  const email = $("buyer-email")?.value.trim() || "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Debes ingresar un correo electrónico válido para tu confirmación.");
    goToStep("step-buyer-email");
    return false;
  }
  const sender = $("sender-name")?.value.trim() || "";
  if (sender.length < 2) {
    alert("Debes ingresar tu nombre (quien envía).");
    goToStep("step-1");
    return false;
  }
  const receiver = $("receiver-name")?.value.trim() || "";
  if (receiver.length < 2) {
    alert("Debes ingresar el nombre de quien recibe.");
    goToStep("step-2");
    return false;
  }
  if (S.logistics === "envio") {
    if (!S.zone) {
      alert("Debes seleccionar la comuna o sector de entrega.");
      goToStep("step-zona");
      return false;
    }
    const addr = $("address")?.value.trim() || "";
    if (addr.length < 5) {
      alert("Debes ingresar la dirección exacta de entrega.");
      goToStep("step-direccion");
      return false;
    }
  } else if (S.logistics === "retiro") {
    const pick = $("pickup-name")?.value.trim() || "";
    if (pick.length < 3) {
      alert("Debes indicar el nombre de la persona que retirará en taller.");
      goToStep("step-quien-retira");
      return false;
    }
  }
  if (!S.date) {
    alert("Debes seleccionar una fecha de entrega.");
    goToStep("step-fecha");
    return false;
  }
  if (!S.time) {
    alert("Debes seleccionar un bloque horario de entrega.");
    goToStep("step-time");
    return false;
  }
  return true;
}

/* ── Persistencia ── */
function guardarProgresoCheckout() {
  const data = {
    senderName:    $("sender-name")?.value    || "",
    buyerEmail:    $("buyer-email")?.value    || "",
    buyerWhatsapp: $("buyer-whatsapp")?.value || "",
    receiverName:  $("receiver-name")?.value  || "",
    receiverPhone: $("receiver-phone")?.value || "",
    address:       $("address")?.value        || "",
    deliveryNote:  $("delivery-note")?.value  || "",
    pickupName:    $("pickup-name")?.value    || "",
    cardMessage:   $("card-message")?.value   || "",
    isAnon:        $("envio-anonimo")?.checked || false
  };

  localStorage.setItem("soho_checkout_inputs", JSON.stringify(data));
  localStorage.setItem("soho_logistics", S.logistics);
  if (S.zone && S.zone.id) localStorage.setItem("soho_zone_id", String(S.zone.id));
  else localStorage.removeItem("soho_zone_id");
  localStorage.setItem("soho_date", S.date || "");
  localStorage.setItem("soho_time", S.time || "");
  localStorage.setItem("soho_express", String(S.express));
}

function restaurarProgresoCheckout() {
  const data = JSON.parse(localStorage.getItem("soho_checkout_inputs") || "{}");
  const fields = ["sender-name", "buyer-email", "buyer-whatsapp", "receiver-name", "receiver-phone", "address", "delivery-note", "pickup-name", "card-message"];
  
  fields.forEach(id => {
    const el = $(id);
    const key = id.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
    if (el && data[key] !== undefined) el.value = data[key];
  });

  if ($("envio-anonimo") && data.isAnon !== undefined) {
    $("envio-anonimo").checked = data.isAnon;
  }

  S.logistics = localStorage.getItem("soho_logistics") || "envio";
  const savedZone = localStorage.getItem("soho_zone_id");
  if (savedZone) S.zone = CONFIG.zones.find(z => z.id === parseInt(savedZone, 10)) || null;
  S.date = localStorage.getItem("soho_date") || "";
  S.time = localStorage.getItem("soho_time") || "";
  S.express = localStorage.getItem("soho_express") === "true";
}

/* ═══ CALENDARIO Y CUPOS ═══ */
async function cargarCupos(fechaDate) {
  const yyyy = fechaDate.getFullYear(), mm = String(fechaDate.getMonth() + 1).padStart(2, "0");
  try {
    const r = await fetch(`${CONFIG.api.cupos}?mes=${yyyy}-${mm}`);
    if (r.ok) cuposMes = await r.json();
  } catch (e) {}
  actualizarVistaHoyCheckout();
}

function getCuposLibres(dateStr) {
  const vendidos = cuposMes[dateStr] || 0;
  if (dateStr !== hoyStr()) {
    return Math.max(0, CONFIG.cuposPorDia - vendidos);
  }
  const now = hoyDate();
  const h = now.getHours();
  let descuentoTiempo = 0;
  if (h >= 10) {
    const horasPasadas = Math.min(h - 10, 9);
    descuentoTiempo = horasPasadas * 3;
  }
  const descuentoTotal = Math.max(descuentoTiempo, vendidos);
  return Math.max(0, CONFIG.cuposPorDia - descuentoTotal);
}

/* ═══ PAYLOAD DE PAGO ═══ */
function orderPayload() {
  const t = calcTotals();
  const anon = $("envio-anonimo")?.checked;
  const senderRaw = $("sender-name")?.value.trim() || "No especificado";
  const note = $("delivery-note")?.value.trim() || "";
  let logistics = S.logistics === "envio"
    ? `Envío a Domicilio (${S.zone ? S.zone.name : ""})\n• DIRECCIÓN: ${$("address")?.value.trim() || ""}`
    : `Retiro en Atelier\n• RETIRA: ${$("pickup-name")?.value.trim() || ""}`;
  if (note) logistics += `\n• NOTA: ${note}`;
  if (S.express && S.logistics === "envio") logistics = "[SERVICIO EXPRESS] " + logistics;

  let fEntrega = S.date;
  if (fEntrega === "hoy" || !fEntrega) fEntrega = hoyStr();
  else if (fEntrega === "manana") fEntrega = mananaStr();

  return {
    totalCLP: t.total,
    metadata: {
      order_code: S.code,
      sender_name: anon ? "Alguien que te quiere (Anónimo)" : senderRaw,
      real_buyer_name: senderRaw,
      receiver_name: $("receiver-name")?.value.trim() || "No especificado",
      palette: "Predeterminada del Diseño",
      logistics_detail: logistics,
      time_slot: S.time || "No especificado",
      destination_phone: ($("receiver-phone")?.value.trim() || "") + ($("buyer-whatsapp")?.value.trim() ? " / Comprador: " + $("buyer-whatsapp").value.trim() : ""),
      card_text: $("card-message")?.value.trim() || "",
      card_format: "Física",
      total_price: t.total,
      flowers_subtotal_clp: t.sub,
      points_discount_clp: 0,
      order_summary: cart.map(i => `- ${i.name} (Cant: ${i.qty}) [c/u: ${clp(i.price)}]`).join("\n"),
      fecha_entrega: fEntrega,
      valor_envio: t.ship - t.bonus,
      comprador_email: $("buyer-email")?.value.trim() || "",
      buyer_whatsapp: $("buyer-whatsapp")?.value.trim() \vert{}\vert{} $("receiver-phone")?.value.trim() || "",
      express: S.express
    }
  };
}

/* ═══ PASARELA 1: WEBPAY FLOW ═══ */
async function payFlow() {
  if (!validarPasoCheckout()) return;

  window.trackEvent4D("payment_initiated", { method: "FlowWebpay", cart_value: flowersSubtotal(), order_code: S.code });
  try {
    const payload = orderPayload();
    const flowBody = {
      ...payload.metadata,
      total_price: payload.totalCLP,
      totalCLP: payload.totalCLP
    };
    const r = await fetch(CONFIG.api.flowCreate, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flowBody)
    });
    const d = await r.json();
    if (d.url) {
      localStorage.removeItem("soho_draft_code");
      window.location.href = d.url;
    } else {
      throw new Error(d.error || "No se pudo generar el enlace de pago");
    }
  } catch (e) {
    alert("Error al conectar con Webpay: " + (e.message || "Intenta nuevamente o usa PayPal."));
  }
}

/* ═══ PASARELA 2: PAYPAL ═══ */
function payPayPal() {
  if (!validarPasoCheckout()) return;

  window.trackEvent4D("payment_initiated", { method: "PayPal", cart_value: flowersSubtotal(), order_code: S.code });
  const container = $("paypal-container");
  if (!container) return;
  container.classList.remove("hidden");

  if (paypalRendered && container.children.length > 0) {
    container.scrollIntoView({ behavior: "smooth" });
    return;
  }

  container.innerHTML = "";
  const run = () => {
    paypal.Buttons({
      style: { color: "gold", shape: "rect", label: "pay", height: 45 },
      createOrder: async () => {
        const r = await fetch(CONFIG.api.paypalCreate, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload())
        });
        const d = await r.json();
        if (d.id) return d.id;
        throw Error("PayPal create error");
      },
      onApprove: async (data) => {
        const r = await fetch(CONFIG.api.paypalCapture, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID, metadata: orderPayload().metadata })
        });
        const d = await r.json();
        if (d.status === "COMPLETED") {
          localStorage.removeItem("soho_draft_code");
          location.href = location.origin + "/gracias.html?payment_id=" + d.id + "&code=" + S.code;
        } else {
          alert("El pago no pudo completarse.");
        }
      },
      onError: () => alert("PayPal falló. Prueba con Webpay.")
    }).render("#paypal-container");

    paypalRendered = true;
    const btnPaypalTrigger = $("btn-paypal-trigger");
    if (btnPaypalTrigger) btnPaypalTrigger.style.display = "none";
  };

  if (paypalLoaded || typeof paypal !== "undefined") return run();

  const s = document.createElement("script");
  s.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.paypalClientId}&currency=USD`;
  s.onload = () => {
    paypalLoaded = true;
    run();
  };
  document.body.appendChild(s);
}

/* ═══ COUNTDOWN EXPRESS HERO ═══ */
function updateCountdown() {
  const el = $("express-status");
  if (!el) return;
  const now = hoyDate();
  const libres = getCuposLibres(hoyStr());
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour) {
    el.innerText = "Express de hoy agotado · Agenda para mañana";
    return;
  }
  const cutoff = new Date(now);
  cutoff.setHours(CONFIG.expressCutoffHour, 0, 0, 0);
  const ms = cutoff - now;
  el.innerHTML = `Express 1–2 h · cupos hoy: <b>${libres}</b> · cierra en <span class="font-mono">${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms % 3600000 / 60000)).padStart(2, "0")}:${String(Math.floor(ms % 60000 / 1000)).padStart(2, "0")}</span>`;
}

/* ═══ HEARTBEAT & ABANDONO ═══ */
function reportTime(evt) {
  const seconds = Math.round((Date.now() - pageStartTime) / 1000);
  const cartVal = flowersSubtotal();
  const email = $("buyer-email")?.value?.trim() || "";
  const sName = $("sender-name")?.value || "";
  const rName = $("receiver-name")?.value || "";
  const name = sName ? sName : rName;
  const phone = $("receiver-phone")?.value?.trim() || "";
  window.trackEvent4D("time_on_page", { seconds, cart_value: cartVal, email, name, phone });
  if (evt && (evt.type === "beforeunload" || evt.type === "pagehide") && email && cartVal > 0) {
    const activeStep = document.querySelector(".checkout-step.active");
    const stepName = activeStep ? activeStep.id : "checkout";
    window.trackEvent4D("abandonment_or_close", {
      step_name: stepName,
      cart_value: cartVal, email, name, phone
    });
  }
}

setInterval(reportTime, 15000);
window.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") reportTime({ type: "visibilitychange" }); });
window.addEventListener("pagehide", reportTime);
window.addEventListener("beforeunload", reportTime);

/* ═══ SCROLL DEPTH ═══ */
let scrollFlags = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  if (docH <= 0) return;
  const pct = Math.round((window.scrollY / docH) * 100);
  [25, 50, 75, 100].forEach(d => {
    if (pct >= d && !scrollFlags[d]) {
      scrollFlags[d] = true;
      window.trackEvent4D("scroll_depth", { depth: d });
    }
  });
}, { passive: true });

/* ═══ SENSOR DE CLICS ═══ */
document.addEventListener("click", function(e) {
  const target = e.target.closest("button, a, .occ-btn, .chip, .step-option-big");
  if (!target) return;
  const onclickAttr = target.getAttribute("onclick") || "";
  if (onclickAttr.includes("addToCart(") || onclickAttr.includes("payFlow(") || onclickAttr.includes("payPayPal(")) return;
  const hrefAttr = target.getAttribute("href") || "";
  if (hrefAttr.startsWith("#") && hrefAttr.length > 1) {
    window.trackEvent4D("click", { target: hrefAttr });
    return;
  }
  const text = (target.innerText || "").trim().replace(/\s+/g, " ");
  if (text && text.length > 0 && text.length < 40 && !hrefAttr) {
    window.trackEvent4D("click", { target: text });
  }
}, true);

/* ═══ INICIALIZACIÓN ═══ */
document.addEventListener("DOMContentLoaded", () => {
  const chkFlow = $("checkout-flow");
  if (chkFlow) {
    chkFlow.addEventListener("input", guardarProgresoCheckout);
    chkFlow.addEventListener("change", guardarProgresoCheckout);
  }
  if ($("product-grid")) renderGrid();
  updateCartUI();
  cargarCupos(S.calendarDate);
  updateCountdown();
  setInterval(updateCountdown, 1000);
  restaurarProgresoCheckout();
});

window.addEventListener("pageshow", e => {
  if (e.persisted) {
    restaurarProgresoCheckout();
    updateCartUI();
  }
});
