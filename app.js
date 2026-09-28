/* ═══════════════════════════════════════════════════════════════
   SOHO FLOWERS · MOTOR DE CONVERSIÓN v5 (FINAL)
   Catálogo 21 + Bolsa con miniaturas + Calendario con cupos
   Flow/Webpay + PayPal · Tracking 4D completo · Persistencia total
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
  paypalClientId: "BAA-hxfOCTSXES_tu6wf7VYtunGXQ_mqxd13k29F0Y64v9BnXBZX88yykOwR3Piv7kqBdDDKhZHSZ82iTA", // Pega aquí tu Client ID de PayPal
  freeShipThreshold: 69990,
  freeShipBonus: 7250,
  expressMultiplier: 1.5,
  expressCutoffHour: 19,
  cuposPorDia: 30,
  zones: [
    { id:1, name:"Central",     price:3500,  detail:"Reñaca Centro, Los Almendros, Jardín del Mar, Los Pinos" },
    { id:2, name:"Local",       price:5000,  detail:"Reñaca Norte, Montemar, Higuerillas, Gómez Carreño, Glorias Navales" },
    { id:3, name:"Intermedia",  price:7500,  detail:"Viña Centro y Cerros, Reñaca Alto, Concón Los Romeros, Costa de Montemar" },
    { id:4, name:"Extendida",   price:10000, detail:"Mantagua, Chorrillos, Valparaíso Plan y Cerros, Quilpué Centro" },
    { id:5, name:"Extendida+",  price:15000, detail:"Quintero, Curauma, Placilla, El Belloto" }
  ]
};

/* Catálogo maestro completo, clasificado por ocasión */
const CATALOG = [
  { id:1,   occ:"romance",     name:"Amor Delicado",        price:28900,  img:"img/RAMOS01.webp", desc:"Lisianthus, lilium, limonium y astromelias." },
  { id:2,   occ:"romance",     name:"Susurro de Amor",      price:28900,  img:"img/RAMOS02.webp", desc:"Lilium, rosas, gypso y maule." },
  { id:3,   occ:"romance",     name:"Amor Eterno",          price:230900, img:"img/RAMOS03.webp", desc:"Arreglo de 70 rosas premium seleccionadas." },
  { id:4,   occ:"celebracion", name:"Pasión de Sol",        price:45900,  img:"img/RAMOS04.webp", desc:"Girasoles, rosas, gypso y maule." },
  { id:5,   occ:"celebracion", name:"Monte Mar Signature",  price:31900,  img:"img/RAMOS05.webp", desc:"Gerberas, rosas, maules y gypso." },
  { id:6,   occ:"celebracion", name:"Brisa de Primavera",   price:36900,  img:"img/RAMOS06.webp", desc:"Gerberas, astromelias, lisianthus y ruscus." },
  { id:7,   occ:"celebracion", name:"Golden Bloom",         price:47900,  img:"img/RAMOS07.webp", desc:"Girasoles, lisianthus, maule y clavelinas." },
  { id:8,   occ:"romance",     name:"Suave Amanecer",       price:37900,  img:"img/RAMOS08.webp", desc:"Lisianthus, rosas, maules y gypso." },
  { id:9,   occ:"celebracion", name:"Jardín de Verano",     price:28900,  img:"img/RAMOS09.webp", desc:"Astromelias, gerberas, lilium y limonium." },
  { id:10,  occ:"romance",     name:"Susurro Rosé",         price:48900,  img:"img/RAMOS10.webp", desc:"Tulipanes y limonium." },
  { id:11,  occ:"romance",     name:"Luz de Atardecer",     price:42900,  img:"img/RAMOS11.webp", desc:"Rosas, astromelias y limonium." },
  { id:12,  occ:"celebracion", name:"Encanto Vivo",         price:37900,  img:"img/RAMOS12.webp", desc:"Astromelias, lisianthus, gypso y gerberas." },
  { id:13,  occ:"homenajes",   name:"Luz Infinita",         price:45900,  img:"img/luz-infinita.webp", desc:"Ramo de rosas blancas. Sobrio y luminoso." },
  { id:14,  occ:"homenajes",   name:"Luz del Alba",         price:68900,  img:"img/luz-del-alba.webp", desc:"Lirios blancos y alstroemerias en cesto." },
  { id:15,  occ:"homenajes",   name:"Sereno",               price:59900,  img:"img/sereno.webp",       desc:"Rosas y lirios blancos en caja gris." },
  { id:16,  occ:"romance",     name:"Dulce Amor",           price:48900,  img:"img/dulce-amor.webp",   desc:"Selección en tonos rosados y blancos." },
  { id:17,  occ:"homenajes",   name:"Esperanza",            price:138900, img:"img/esperanza.webp",    desc:"Cesto grande de lirios y rosas blancas." },
  { id:18,  occ:"celebracion", name:"Luz de Primavera",     price:47900,  img:"img/luz-de-primavera.webp", desc:"Girasoles, gerberas y rosas amarillas." },
  { id:19,  occ:"celebracion", name:"Destello de Primavera",price:21990,  img:"img/destello-de-primavera.webp", desc:"Girasol central con gerberas y rosas." },
  { id:201, occ:"homenajes",   name:"Cubre Urna Sublime",   price:129900, img:"img/cubre-urna.webp",   desc:"Delicado homenaje en blancos y crema." },
  { id:202, occ:"homenajes",   name:"Cojín de Condolencias",price:58900,  img:"img/cojin.webp",        desc:"Composición sobria en rosas y astromelias." }
];
const BADGES = [3,5,8,10,11]; // "Más Vendidos"

const MSGS = {
  condolencias:[
    "Sé que no hay palabras para este dolor, pero quiero que sepas que estoy aquí. Que estas flores te abracen en la distancia.",
    "Las almas que dejan huella nunca se marchan: florecen en nuestros recuerdos. Con el mayor de los respetos, te acompaño.",
    "Te envío toda mi fuerza y cariño en este momento de tristeza. Que los recuerdos hermosos te sirvan de consuelo."
  ],
  romance:[
    "Cada pétalo de este ramo me recuerda a un momento a tu lado. Gracias por hacer que mi vida florezca. Te amo.",
    "Ninguna obra de la naturaleza se compara al privilegio de tenerte en mi vida. Eres mi lugar seguro.",
    "Aunque el tiempo pase y las estaciones cambien, lo que siento por ti solo crece. Gracias por ser mi refugio."
  ],
  cumpleanos:[
    "Que este nuevo año florezca con la misma luz y alegría que transmites. Celebro tu vida hoy y siempre.",
    "Brindo por ti y por todo lo que has logrado. Que hoy recibas tanto amor como el que siempre entregas."
  ],
  agradecimiento:[
    "Hay gestos que cambian el rumbo de las cosas, y el tuyo fue uno de ellos. Gracias por tu apoyo incondicional; nunca lo olvidaré.",
    "Las palabras a veces quedan cortas para expresar la verdadera gratitud. Espero que este detalle transmita lo mucho que valoro tu tiempo y tu confianza."
  ]
};

/* ═══ ESTADO GLOBAL ═══ */
let cart = [];
let S = {
  logistics:"envio", zone:null, date:"", dateMode:"", time:"", express:false,
  occasion:"todos", code:null,
  calendarDate: new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}))
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
} catch(e) { console.warn("Storage privado, memoria limitada."); }

/* ═══ SESIÓN & TRACKING 4D ═══ */
const sid = sessionStorage.getItem("soho_sid") || ("sid_"+Date.now()+"_"+Math.floor(Math.random()*1e5));
sessionStorage.setItem("soho_sid", sid);
let pagePath = window.location.pathname || "/";
if (pagePath === "/") pagePath = "/index.html";

window.trackEvent4D = function(name, data={}){
  fetch(CONFIG.api.track, { method:"POST", headers:{"Content-Type":"application/json"}, keepalive:true,
    body: JSON.stringify({ session_id:sid, event_name:name, event_data:data, url:pagePath }) }).catch(()=>{});
};
window.trackEvent4D("page_view");
if (pagePath.includes("gracias.html")){
  cart.forEach(item => window.trackEvent4D("purchase", { product_id:item.id, product_name:item.name, price:item.price, qty:item.qty }));
}

/* ═══ UTILIDADES ═══ */
const $ = id => document.getElementById(id);
const clp = n => "$" + n.toLocaleString("es-CL");
const hoyDate = () => new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}));
const hoyStr = () => { const d=hoyDate(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const mananaStr = () => { const d=hoyDate(); d.setDate(d.getDate()+1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };

document.addEventListener("DOMContentLoaded", () => {
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola Soho Flowers, necesito un arreglo:")}`;
  if ($("wa-float")) $("wa-float").href = wa;
  if ($("wa-footer")) $("wa-footer").href = wa;
});

/* ═══ PERSISTENCIA DEL CHECKOUT TOTAL ═══ */
function guardarProgreso(){
  const data = {
    buyerEmail:    $("buyer-email")?.value    || "",
    buyerWhatsapp: $("buyer-whatsapp")?.value || "",
    senderName:    $("sender-name")?.value    || "",
    receiverName:  $("receiver-name")?.value  || "",
    receiverPhone: $("receiver-phone")?.value || "",
    address:       $("address")?.value        || "",
    pickupName:    $("pickup-name")?.value    || "",
    deliveryNote:  $("delivery-note")?.value  || "",
    cardMessage:   $("card-message")?.value   || "",
    isAnon:        $("envio-anonimo")?.checked || false
  };
  
  localStorage.setItem("soho_checkout_inputs", JSON.stringify(data));
  localStorage.setItem("soho_logistics", S.logistics);
  if (S.zone && S.zone.id) {
    localStorage.setItem("soho_zone_id", String(S.zone.id));
  } else {
    localStorage.removeItem("soho_zone_id");
  }
  localStorage.setItem("soho_date", S.date || "");
  localStorage.setItem("soho_time", S.time || "");
  localStorage.setItem("soho_express", String(S.express));
}

function restaurarProgreso(){
  // 1. Restaurar textos y checkbox
  const data = JSON.parse(localStorage.getItem("soho_checkout_inputs") || "{}");
  const fields = [
    "buyer-email", "buyer-whatsapp", "sender-name", "receiver-name",
    "receiver-phone", "address", "pickup-name", "delivery-note", "card-message"
  ];
  fields.forEach(id => {
    const el = $(id);
    const key = id.replace(/-([a-z])/g, (_,l) => l.toUpperCase());
    if (el && data[key] !== undefined) {
      el.value = data[key];
    }
  });
  if ($("envio-anonimo") && data.isAnon !== undefined) {
    $("envio-anonimo").checked = data.isAnon;
  }

  // 2. Restaurar modalidad (Envío vs Retiro)
  const savedLogistics = localStorage.getItem("soho_logistics") || "envio";
  setLogistics(savedLogistics);

  // 3. Restaurar zona y marcar su botón
  const savedZoneId = parseInt(localStorage.getItem("soho_zone_id"), 10);
  if (savedZoneId) {
    setZone(savedZoneId);
  }

  // 4. Restaurar fecha y marcar su botón
  const savedDate = localStorage.getItem("soho_date");
  if (savedDate) {
    S.date = savedDate;
    $("date-hoy")?.classList.toggle("on", savedDate === "hoy");
    $("date-manana")?.classList.toggle("on", savedDate === "manana");
    renderTimes();
  }

  // 5. Restaurar horario y marcar chip activo
  const savedTime = localStorage.getItem("soho_time");
  const savedExpress = localStorage.getItem("soho_express") === "true";
  if (savedTime) {
    S.time = savedTime;
    S.express = savedExpress;
    document.querySelectorAll("#time-chips .chip").forEach(b => {
      if (b.innerText.trim() === savedTime.trim()) {
        b.classList.add("on");
      }
    });
  }

  renderTotals();
}

/* ═══ EMBUDO ═══ */
function startFunnel(mode){
  S.dateMode = mode;
  window.trackEvent4D("intent_click", { mode });
  S.date = mode === "hoy" ? "hoy" : "";
  document.getElementById("coleccion").scrollIntoView({behavior:"smooth"});
}
function filterOccasion(occ){
  S.occasion = occ;
  window.trackEvent4D("occasion_filter", { occ });
  document.querySelectorAll(".occ-btn").forEach(b => b.classList.toggle("on", b.dataset.occ === occ));
  $("catalog-title").innerText = occ === "todos" ? "Colección completa" :
    occ === "homenajes" ? "Homenajes y condolencias" : occ === "romance" ? "Romance" : "Celebración";
  renderGrid();
  document.getElementById("coleccion").scrollIntoView({behavior:"smooth"});
}

/* ═══ CATÁLOGO ═══ */
function renderGrid(){
  const items = S.occasion === "todos" ? CATALOG : CATALOG.filter(p => p.occ === S.occasion);
  $("product-grid").className = "grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16";
  
  $("product-grid").innerHTML = items.map(p => `
    <div class="group flex flex-col cursor-pointer" onclick="addToCart(${p.id})">
      <div class="relative aspect-[4/5] bg-ink/5 rounded-none overflow-hidden mb-4">
        <img src="${p.img}" loading="lazy" alt="${p.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
        ${BADGES.includes(p.id) ? `<span class="absolute top-4 left-4 z-10 bg-ivory/80 backdrop-blur-md px-3 py-1.5 micro text-[8px] text-ink">Más Vendidos</span>` : ""}
      </div>
      <h3 class="display text-2xl md:text-3xl leading-none text-ink">${p.name}</h3>
      <p class="text-[11px] font-sans opacity-50 mt-2 line-clamp-2 leading-relaxed">${p.desc}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="display text-2xl text-ink">${clp(p.price)}</span>
        <span class="micro opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-goldink">Agregar +</span>
      </div>
    </div>`).join("");
}

/* ═══ BOLSA CON MINIATURAS ═══ */
function addToCart(id){
  const p = CATALOG.find(x => x.id === id); if (!p) return;
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++; else cart.push({ id:p.id, name:p.name, price:p.price, img:p.img, qty:1 });
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
  const n = $("cart-count");
  if (n){ n.classList.add("scale-150"); setTimeout(() => n.classList.remove("scale-150"), 300); }
  toggleBag(true);
  window.trackEvent4D("add_to_cart", { product_id:id, product_name:p.name, value:p.price });
}
function chooseProduct(id){ addToCart(id); }
function removeFromCart(id){ cart = cart.filter(i => i.id !== id); localStorage.setItem("soho_cart", JSON.stringify(cart)); updateCartUI(); }
function updateQty(id, d){
  const it = cart.find(i => i.id === id); if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
}
function toggleBag(force){
  const bag = $("atelier-bag"), ov = $("cart-overlay"); if (!bag) return;
  const open = force !== undefined ? force : !bag.classList.contains("translate-x-0");
  if (open){
    ov.classList.remove("hidden"); setTimeout(() => ov.classList.remove("opacity-0"), 10);
    bag.classList.remove("translate-x-full"); bag.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  } else {
    ov.classList.add("opacity-0"); setTimeout(() => ov.classList.add("hidden"), 300);
    bag.classList.add("translate-x-full"); bag.classList.remove("translate-x-0");
    document.body.style.overflow = "";
  }
}
function updateCartUI(){
  const cont = $("cart-items-container");
  const count = cart.reduce((a,i) => a + i.qty, 0);
  const cc = $("cart-count"); if (cc) cc.innerText = count;
  if (!cont) return;
  if (!cart.length){
    cont.innerHTML = `<div class="text-center py-20 opacity-60">
      <p class="display text-3xl">Su bolsa está vacía</p>
      <button onclick="toggleBag(false); document.getElementById('coleccion').scrollIntoView({behavior:'smooth'})" class="micro underline underline-offset-4 mt-4 text-goldink">Ir a la Colección</button>
    </div>`;
    $("cart-total").innerText = "$0";
    return;
  }
  cont.innerHTML = cart.map(item => `
    <div class="flex gap-4 items-center border border-ink/5 rounded-2xl bg-white p-3">
      <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-ivory relative flex items-center justify-center border border-ink/5">
        <span class="display text-lg text-ink/10 absolute">SF</span>
        <img src="${item.img}" onerror="this.style.opacity='0'" class="w-full h-full object-cover relative z-10" alt="${item.name}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="display text-xl leading-tight truncate">${item.name}</h4>
        <p class="text-xs font-bold mt-0.5">${clp(item.price)}</p>
        <div class="flex items-center gap-4 mt-2">
          <div class="flex items-center gap-1 border border-ink/10 rounded-full px-2 py-0.5">
            <button onclick="updateQty(${item.id},-1)" class="px-1 opacity-60 hover:opacity-100" aria-label="Disminuir">−</button>
            <span class="text-xs font-bold w-4 text-center">${item.qty}</span>
            <button onclick="updateQty(${item.id},1)" class="px-1 opacity-60 hover:opacity-100" aria-label="Aumentar">+</button>
          </div>
          <button onclick="removeFromCart(${item.id})" class="micro opacity-40 hover:opacity-100">Eliminar</button>
        </div>
      </div>
    </div>`).join("");
  $("cart-total").innerText = clp(flowersSubtotal());
}
function procederCheckout(){
  if (!cart.length) return alert("Su bolsa está vacía. Añada un arreglo primero.");
  toggleBag(false);
  openCheckout();
}

/* ═══ CHECKOUT ═══ */
function flowersSubtotal(){ return cart.reduce((a,i) => a + i.price*i.qty, 0); }
function openCheckout(){
  if (!cart.length) { document.getElementById("coleccion").scrollIntoView({behavior:"smooth"}); return; }
  S.code = localStorage.getItem("soho_draft_code") || ("SF-" + Date.now());
  localStorage.setItem("soho_draft_code", S.code);
  $("checkout-overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderZones(); 
  renderSummary();
  restaurarProgreso();
  goStep(1);
  cargarCupos(S.calendarDate);
  window.trackEvent4D("begin_checkout", { value: flowersSubtotal(), order_code: S.code });
}
function closeCheckout(){ $("checkout-overlay").classList.add("hidden"); document.body.style.overflow = "auto"; }

/* ═══ VALIDACIÓN ESTRICTA DE CAMPOS ═══ */
function validarPaso(paso) {
  if (paso === 1) {
    // 1. Logística y Dirección / Retiro
    if (S.logistics === "envio") {
      if (!S.zone) {
        alert("Debes seleccionar la comuna o sector de entrega.");
        $("zone-chips")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
      }
      const addr = $("address")?.value.trim() || "";
      if (addr.length < 5) {
        alert("Debes ingresar la dirección exacta de entrega (calle, número y depto/casa).");
        $("address")?.focus();
        return false;
      }
    } else if (S.logistics === "retiro") {
      const pick = $("pickup-name")?.value.trim() || "";
      if (pick.length < 3) {
        alert("Debes indicar el nombre completo de la persona que retirará en el taller.");
        $("pickup-name")?.focus();
        return false;
      }
    }

    // 2. Fecha
    if (!S.date) {
      alert("Debes seleccionar una fecha de entrega (Hoy, Mañana o Calendario).");
      return false;
    }

    // 3. Bloque Horario (comprobación en memoria y en UI)
    const activeChip = document.querySelector("#time-chips .chip.on");
    if (!S.time || !activeChip) {
      alert("Debes seleccionar obligatoriamente un bloque horario de entrega.");
      $("time-chips")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  }

  if (paso === 2) {
    // 1. Quien envía (Comprador)
    const sender = $("sender-name")?.value.trim() || "";
    if (sender.length < 2) {
      alert("Debes ingresar tu nombre (quien realiza el pedido).");
      $("sender-name")?.focus();
      return false;
    }

    // 2. Correo del comprador
    const email = $("buyer-email")?.value.trim() || "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Debes ingresar un correo electrónico válido para recibir la confirmación y boleta.");
      $("buyer-email")?.focus();
      return false;
    }

    // 3. Teléfono / WhatsApp del comprador (si el campo existe)
    const buyerPhone = $("buyer-whatsapp")?.value.trim() || "";
    if ($("buyer-whatsapp") && buyerPhone.replace(/\D/g, "").length < 8) {
      alert("Debes ingresar tu número de teléfono / WhatsApp de contacto.");
      $("buyer-whatsapp")?.focus();
      return false;
    }

    // 4. Quien recibe (Destinatario)
    const receiver = $("receiver-name")?.value.trim() || "";
    if (receiver.length < 2) {
      alert("Debes ingresar el nombre de la persona que recibe las flores.");
      $("receiver-name")?.focus();
      return false;
    }

    // 5. Teléfono de destino (Receptor)
    const receiverPhone = $("receiver-phone")?.value.trim() || "";
    if (receiverPhone.replace(/\D/g, "").length < 8) {
      alert("Debes ingresar un teléfono de contacto válido para coordinar la entrega.");
      $("receiver-phone")?.focus();
      return false;
    }

    // Mensaje de tarjeta y nota de entrega permanecen como los únicos dos campos opcionales

    window.trackEvent4D("lead_captured", {
      email, 
      step_name: "step-buyer-email", 
      cart_value: flowersSubtotal(),
      name: sender
    });

    return true;
  }

  return true;
}

function goStep(n) {
  let currentStep = 1;
  if ($("step-2") && !$("step-2").classList.contains("hidden")) currentStep = 2;
  else if ($("step-3") && !$("step-3").classList.contains("hidden")) currentStep = 3;

  // Bloqueo estricto al intentar avanzar
  if (n > currentStep) {
    if (currentStep === 1 && !validarPaso(1)) return;
    if (currentStep === 2 && !validarPaso(2)) return;
    if (n === 3 && (!validarPaso(1) || !validarPaso(2))) return;
  }

  [1, 2, 3].forEach(i => {
    $("step-" + i)?.classList.toggle("hidden", i !== n);
    $("prog-" + i)?.classList.toggle("on", i <= n);
  });

  if (n === 2) $("sender-name")?.focus();
  if (n === 3) renderTotals();

  guardarProgreso();
  window.trackEvent4D("checkout_step", { step: n });
}


function renderSummary(){
  $("cart-summary").innerHTML = cart.map(i => `
    <div class="flex justify-between items-center border border-ink/10 rounded-xl px-4 py-3 bg-white">
      <span class="display text-xl">${i.name} <span class="text-xs opacity-50 not-italic font-sans">×${i.qty}</span></span>
      <span class="display text-xl text-goldink">${clp(i.price*i.qty)}</span>
    </div>`).join("");
}
function setLogistics(m){
  S.logistics = m;
  $("mod-envio").classList.toggle("on", m === "envio");
  $("mod-retiro").classList.toggle("on", m === "retiro");
  $("zone-block").style.display = m === "envio" ? "" : "none";
  const pb = $("pickup-block");
  if (pb) pb.style.display = m === "retiro" ? "" : "none";
  renderTimes(); guardarProgreso();
}
function renderZones(){
  $("zone-chips").innerHTML = CONFIG.zones.map(z => `
    <button onclick="setZone(${z.id})" id="zone-${z.id}" class="chip px-4 py-2 micro rounded-full">${z.name} +${clp(z.price)}</button>`).join("");
  if (S.zone) setZone(S.zone.id);
}
function setZone(id){
  S.zone = CONFIG.zones.find(z => z.id === id);
  CONFIG.zones.forEach(z => $("zone-"+z.id).classList.toggle("on", z.id === id));
  $("zone-detail").innerText = S.zone.detail;
  renderTotals(); guardarProgreso();
}
function setDate(v){
  S.date = v; 
  S.express = false;
  S.time = ""; // Resetear horario para obligar a elegir uno en la nueva fecha
  localStorage.removeItem("soho_time");
  $("date-hoy")?.classList.toggle("on", v === "hoy");
  $("date-manana")?.classList.toggle("on", v === "manana");
  renderTimes(); 
  guardarProgreso();
}

/* ═══ CALENDARIO CON CUPOS ═══ */
function showCalendar(){
  cargarCupos(S.calendarDate); renderCalendar();
  $("calendar-modal").classList.remove("hidden");
  setTimeout(() => $("calendar-modal").classList.remove("opacity-0"), 10);
}
function closeCalendar(){
  $("calendar-modal").classList.add("opacity-0");
  setTimeout(() => $("calendar-modal").classList.add("hidden"), 250);
}
async function cargarCupos(fechaDate){
  const yyyy = fechaDate.getFullYear(), mm = String(fechaDate.getMonth()+1).padStart(2,"0");
  try { const r = await fetch(`${CONFIG.api.cupos}?mes=${yyyy}-${mm}`); if (r.ok) cuposMes = await r.json(); } catch(e){}
  updateHoyButton();
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
    const horasPasadas = Math.min(h - 10, 9); // Calcula hasta las 19:00 max
    descuentoTiempo = horasPasadas * 3;
  }
  
  // Se descuenta el mayor valor entre el paso del tiempo y las ventas reales
  const descuentoTotal = Math.max(descuentoTiempo, vendidos);
  return Math.max(0, CONFIG.cuposPorDia - descuentoTotal);
}

function updateHoyButton(){
  const btn = $("date-hoy"); if (!btn) return;
  const libres = getCuposLibres(hoyStr());
  const now = hoyDate();
  
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour){
    btn.innerHTML = `<span class="line-through opacity-50">Hoy</span><span class="text-[9px] text-goldink block mt-0.5">Agotado</span>`;
    btn.disabled = true;
  } else if (libres <= 5){
    btn.innerHTML = `Hoy<span class="text-[9px] text-goldink block mt-0.5">Solo ${libres} cupos</span>`;
    btn.disabled = false;
  } else { btn.innerHTML = `Hoy`; btn.disabled = false; }
}

function renderCalendar(){
  const grid = $("calendar-grid"), title = $("cal-month-title"); if (!grid || !title) return;
  const today = hoyDate();
  const r = S.calendarDate.getFullYear(), o = S.calendarDate.getMonth();
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  title.innerText = `${meses[o]} ${r}`;
  $("cal-prev").style.visibility = (r === today.getFullYear() && o === today.getMonth()) ? "hidden" : "visible";
  grid.innerHTML = "";
  const firstDay = new Date(r, o, 1).getDay();
  const daysInMonth = new Date(r, o + 1, 0).getDate();
  for (let g = 0; g < firstDay; g++) grid.innerHTML += "<div></div>";
  for (let day = 1; day <= daysInMonth; day++){
    const d = new Date(r, o, day); d.setHours(0,0,0,0);
    const t = new Date(today); t.setHours(0,0,0,0);
    const dateStr = `${r}-${String(o+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const libres = getCuposLibres(dateStr);
    if (d.getTime() < t.getTime()) grid.innerHTML += `<div class="py-3 text-center opacity-30 font-serif">${day}</div>`;
    else if (libres <= 0) grid.innerHTML += `<button disabled class="py-3 font-serif line-through opacity-40 cursor-not-allowed">${day}</button>`;
    else {
      const badge = libres <= 5 ? `<span class="text-[9px] text-goldink block">${libres}</span>` : "";
      grid.innerHTML += `<button onclick="pickCalendarDay('${dateStr}')" class="py-3 font-serif hover:text-goldink transition font-bold">${day}${badge}</button>`;
    }
  }
}
function changeMonth(dir){ S.calendarDate.setMonth(S.calendarDate.getMonth() + dir); cargarCupos(S.calendarDate); renderCalendar(); }

function pickCalendarDay(dateStr){
  S.date = dateStr; 
  S.express = false;
  S.time = ""; // Resetear horario para obligar a elegir uno en el nuevo día
  localStorage.removeItem("soho_time");
  ["date-hoy","date-manana"].forEach(id => $(id)?.classList.remove("on"));
  closeCalendar(); 
  renderTimes(); 
  guardarProgreso();
}

function slotMatches(btn, timeValue){
  if (!timeValue) return false;
  const slot = (btn.getAttribute("data-slot") || "").trim();
  const text = (btn.innerText || "").trim();
  return slot === timeValue || text === timeValue || timeValue.indexOf(text) !== -1 && text.length >= 8;
}

function highlightTimeChip(timeValue){
  let matched = false;
  document.querySelectorAll("#time-chips .chip").forEach(b => {
    const on = slotMatches(b, timeValue);
    b.classList.toggle("on", on);
    if (on) matched = true;
  });
  return matched;
}

function timeChip(label, express){
  return `<button type="button" data-slot="${label}" onclick="setTime(this,'${label}',${express})" class="chip px-4 py-3 micro rounded-full${express ? " !border-gold text-goldink" : ""}">${express ? label.replace(/^Express \((.+)\)$/, "$1") : label}</button>`;
}

/* ═══ HORARIOS INTELIGENTES + EXPRESS ═══ */
function renderTimes(){
  const chips = $("time-chips"); if (!chips) return;
  const isHoy = S.date === "hoy" || S.date === hoyStr();
  const now = hoyDate();
  const h = now.getHours() + now.getMinutes()/60;
  let html = "";
  
  if (!S.date){
    html = "";
  } else if (!isHoy){
    html = ["Mañana (10:00–13:00)","Mediodía (14:00–17:00)","Tarde (18:00–21:00)"].map(t => timeChip(t, false)).join("");
  } else {
    if (h < 9)  html += timeChip("Mañana (10:00–13:00)", false);
    if (h < 11) html += timeChip("Mediodía (14:00–17:00)", false);
    if (h < 14) html += timeChip("Tarde (18:00–21:00)", false);
    
    if (S.logistics === "envio") {
      let startExpress = now.getMinutes() === 0 ? now.getHours() + 1 : now.getHours() + 2;
      startExpress = Math.max(10, startExpress);
      
      if (startExpress <= 20) {
        html += `<p class="w-full micro text-goldink pt-3">Express 1–2 h (+50% solo sobre el envío):</p>`;
        let a = startExpress;
        while (a <= 20){
          html += timeChip(`Express (${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00)`, true);
          a++;
        }
      }
    }
  }
  
  chips.innerHTML = html || `<p class="micro opacity-50">${S.date ? "Entregas de hoy cerradas. Elige otra fecha." : "Elige una fecha para ver horarios."}</p>`;
  
  if (S.time && !highlightTimeChip(S.time)) {
    S.time = "";
    S.express = false;
  }
}

function setTime(el, t, express){
  S.time = t; S.express = express;
  document.querySelectorAll("#time-chips .chip").forEach(b => b.classList.remove("on"));
  el.classList.add("on");
  renderTotals(); guardarProgreso();
}

/* ═══ TOTALES (Regla Soho: transparencia total) ═══ */
function calcTotals(){
  const sub = flowersSubtotal();
  const baseShip = (S.logistics === "retiro" || !S.zone) ? 0 : S.zone.price;
  const ship = S.express ? Math.round(baseShip * CONFIG.expressMultiplier) : baseShip;
  const bonus = sub >= CONFIG.freeShipThreshold ? Math.min(ship, CONFIG.freeShipBonus) : 0;
  return { sub, baseShip, ship, bonus, total: sub + ship - bonus };
}
function renderTotals(){
  const t = calcTotals();
  let rows = `<div class="flex justify-between"><span class="opacity-60">Arreglos</span><span>${clp(t.sub)}</span></div>`;
  if (S.logistics === "envio" && S.zone){
    rows += `<div class="flex justify-between"><span class="opacity-60">Envío ${S.zone.name}</span><span>${clp(t.baseShip)}</span></div>`;
    if (S.express) rows += `<div class="flex justify-between"><span class="opacity-60">Express 1–2 h (+50% del envío)</span><span>+${clp(t.ship - t.baseShip)}</span></div>`;
    if (t.bonus)   rows += `<div class="flex justify-between text-goldink"><span>Envío de cortesía</span><span>−${clp(t.bonus)}</span></div>`;
  } else {
    rows += `<div class="flex justify-between"><span class="opacity-60">Retiro en atelier</span><span>$0</span></div>`;
  }
  rows += `<div class="flex justify-between items-end pt-2 border-t border-ink/10">
    <span class="micro opacity-60">Total</span><span class="display text-4xl text-goldink">${clp(t.total)}</span></div>`;
  $("total-breakdown").innerHTML = rows;
}

/* ═══ DEDICATORIAS (typewriter) ═══ */
function writeMsg(kind){
  const list = MSGS[kind] || [];
  const msg = list[Math.floor(Math.random()*list.length)];
  const t = $("card-message"); if (!t) return;
  t.value = ""; let i = 0;
  const iv = setInterval(() => { t.value += msg.charAt(i++); if (i >= msg.length){ clearInterval(iv); guardarProgreso(); } }, 15);
}

/* ═══ PAYLOAD (compatible con worker, D1 y panel) ═══ */
function orderPayload(){
  const t = calcTotals();
  const anon = $("envio-anonimo")?.checked;
  const senderRaw = $("sender-name")?.value || "No especificado";
  const note = $("delivery-note")?.value || "";
  let logistics = S.logistics === "envio"
    ? `Envío a Domicilio (${S.zone ? S.zone.name : ""})\n• DIRECCIÓN: ${$("address")?.value || ""}`
    : `Retiro en Atelier\n• RETIRA: ${$("pickup-name")?.value || ""}`;
  if (note.trim()) logistics += `\n• NOTA: ${note.trim()}`;
  if (S.express && S.logistics === "envio") logistics = "[SERVICIO EXPRESS] " + logistics;

  // Garantizar fecha en formato ISO YYYY-MM-DD para D1 y cupos
  let fEntrega = S.date;
  if (fEntrega === "hoy" || !fEntrega) fEntrega = hoyStr();
  else if (fEntrega === "manana") fEntrega = mananaStr();

  return {
    totalCLP: t.total,
    metadata: {
      order_code: S.code,
      sender_name: anon ? "Alguien que te quiere (Anónimo)" : senderRaw,
      real_buyer_name: senderRaw,
      receiver_name: $("receiver-name")?.value || "No especificado",
      palette: "Predeterminada del Diseño",
      logistics_detail: logistics,
      time_slot: S.time || "No especificado",
      destination_phone: ($("receiver-phone")?.value || "") + ($("buyer-whatsapp")?.value ? " / Comprador: " + $("buyer-whatsapp").value : ""),
      card_text: $("card-message")?.value || "",
      card_format: "Física",
      total_price: t.total,
      flowers_subtotal_clp: t.sub,
      points_discount_clp: 0,
      order_summary: cart.map(i => `- ${i.name} (Cant: ${i.qty}) [c/u: ${clp(i.price)}]`).join("\n"),
      fecha_entrega: fEntrega,
      valor_envio: t.ship - t.bonus,
      comprador_email: $("buyer-email")?.value || "",
      buyer_whatsapp: $("buyer-whatsapp")?.value || $("receiver-phone")?.value || "",
      express: S.express
    }
  };
}

/* ═══ PAGO 1: WEBPAY vía FLOW ═══ */
async function payFlow(){
  if (!validarPaso(1)) { goStep(1); return; }
  if (!validarPaso(2)) { goStep(2); return; }

  window.trackEvent4D("payment_initiated", { method:"FlowWebpay", cart_value: flowersSubtotal(), order_code: S.code });
  
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
    if (d.url){ 
      localStorage.removeItem("soho_draft_code"); 
      window.location.href = d.url; 
    } else {
      throw new Error(d.error || "No se pudo generar el enlace de pago");
    }
  } catch(e){ 
    alert("Error al conectar con Webpay: " + (e.message || "Intenta nuevamente o usa PayPal.")); 
  }
}

/* ═══ PAGO 2: PAYPAL ═══ */
function payPayPal(){
  if (!validarPaso(1)) { goStep(1); return; }
  if (!validarPaso(2)) { goStep(2); return; }

  window.trackEvent4D("payment_initiated", { method:"PayPal", cart_value: flowersSubtotal(), order_code: S.code });

  const container = $("paypal-container");
  if (!container) return;

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
        throw Error("PayPal create");
      },
      onApprove: async (data) => {
        const r = await fetch(CONFIG.api.paypalCapture, { 
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ orderID: data.orderID, metadata: orderPayload().metadata }) 
        });
        const d = await r.json();
        if (d.status === "COMPLETED"){ 
          localStorage.removeItem("soho_draft_code"); 
          location.href = location.origin + "/gracias.html?payment_id=" + d.id + "&code=" + S.code; 
        } else {
          alert("El pago no pudo completarse.");
        }
      },
      onError: () => alert("PayPal falló. Prueba con Webpay.")
    }).render("#paypal-container");

    paypalRendered = true;
    const btnPaypalTrigger = document.querySelector("button[onclick='payPayPal()']");
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

/* ═══ COUNTDOWN EXPRESS ═══ */
function updateCountdown(){
  const el = $("express-status"); if (!el) return;
  const now = hoyDate();
  const libres = getCuposLibres(hoyStr());
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour){ el.innerText = "Express de hoy agotado · Agenda para mañana"; return; }
  const cutoff = new Date(now); cutoff.setHours(CONFIG.expressCutoffHour,0,0,0);
  const ms = cutoff - now;
  el.innerHTML = `Express 1–2 h · cupos hoy: <b>${libres}</b> · cierra en <span class="font-mono">${String(Math.floor(ms/3600000)).padStart(2,"0")}:${String(Math.floor(ms%3600000/60000)).padStart(2,"0")}:${String(Math.floor(ms%60000/1000)).padStart(2,"0")}</span>`;
}

/* ═══ HEARTBEAT + ABANDONO ═══ */
function reportTime(evt){
  const seconds = Math.round((Date.now() - pageStartTime) / 1000);
  const cartVal = flowersSubtotal();
  const email = $("buyer-email")?.value?.trim() || "";
  const name = $("sender-name")?.value || $("receiver-name")?.value || "";
  const phone = $("receiver-phone")?.value?.trim() || "";
  window.trackEvent4D("time_on_page", { seconds, cart_value: cartVal, email, name, phone });
  if (evt && (evt.type === "beforeunload" || evt.type === "pagehide") && email && cartVal > 0){
    window.trackEvent4D("abandonment_or_close", { step_name: document.querySelector(".chip.on")?.innerText || "checkout", cart_value: cartVal, email, name, phone });
  }
}
setInterval(reportTime, 15000);
window.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") reportTime({type:"visibilitychange"}); });
window.addEventListener("pagehide", reportTime);
window.addEventListener("beforeunload", reportTime);

/* ═══ SCROLL DEPTH ═══ */
let scrollFlags = {25:false,50:false,75:false,100:false};
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  if (docH <= 0) return;
  const pct = Math.round((window.scrollY / docH) * 100);
  [25,50,75,100].forEach(d => { if (pct >= d && !scrollFlags[d]){ scrollFlags[d] = true; window.trackEvent4D("scroll_depth", {depth:d}); } });
}, { passive:true });

/* ═══ SENSOR UNIVERSAL DE CLICS (Monitor 4D) ═══ */
document.addEventListener("click", function(e){
  const target = e.target.closest("button, a, .occ-btn, .chip");
  if (!target) return;
  const onclickAttr = target.getAttribute("onclick") || "";
  if (onclickAttr.includes("addToCart(") || onclickAttr.includes("payFlow(") || onclickAttr.includes("payPayPal(")) return; // ya tienen evento propio
  const hrefAttr = target.getAttribute("href") || "";
  if (hrefAttr.startsWith("#") && hrefAttr.length > 1){
    window.trackEvent4D("click", { target: hrefAttr });
    return;
  }
  const text = (target.innerText || "").trim().replace(/\s+/g, " ");
  if (text && text.length > 0 && text.length < 40 && !hrefAttr){
    window.trackEvent4D("click", { target: text });
  }
}, true);

/* ═══ INIT (a prueba de páginas sin catálogo: gracias, seguimiento, etc.) ═══ */
document.addEventListener("DOMContentLoaded", () => {
   // Auto-guardado inmediato en cada pulsación o cambio dentro del checkout
  const chkOverlay = $("checkout-overlay");
  if (chkOverlay) {
    chkOverlay.addEventListener("input", guardarProgreso);
    chkOverlay.addEventListener("change", guardarProgreso);
  }
  if ($("product-grid")) renderGrid();
  updateCartUI();
  cargarCupos(S.calendarDate);
  if ($("date-input")) $("date-input").min = mananaStr();
  if ($("time-chips") && S.date) setDate(S.date);
  if ($("mod-retiro") && S.logistics === "retiro") setLogistics("retiro");
  updateCountdown(); setInterval(updateCountdown, 1000);
  restaurarProgreso();
});

window.addEventListener("pageshow", e => { if (e.persisted){ restaurarProgreso(); updateCartUI(); } });
