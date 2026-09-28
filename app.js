/* ═══════════════════════════════════════════════════════════════
   SOHO FLOWERS · MOTOR DE CONVERSIÓN v3 (COMPLETO)
   Webpay (Flow) + PayPal · Worker independiente
   Hereda: calendario, cupos, tracking 4D, persistencia
   Elimina: club de puntos, upsells (no aplican al concepto boutique)
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  brand: "Soho Flowers",
  whatsapp: "56994783520",
  api: {
    worker:        "https://soho-flowers.sebjmz.workers.dev",
    flowCreate:    "https://soho-flowers.sebjmz.workers.dev/flow/create",
    paypalCreate:  "https://soho-flowers.sebjmz.workers.dev/paypal/create-order",
    paypalCapture: "https://soho-flowers.sebjmz.workers.dev/paypal/capture-order",
    track:         "https://soho-flowers.sebjmz.workers.dev/api/track",
    cupos:         "https://soho-flowers.sebjmz.workers.dev/cupos"
  },
  paypalClientId: "PON_AQUI_TU_NUEVO_CLIENT_ID_DE_PAYPAL",
  freeShipThreshold: 69990,
  freeShipBonus: 7250,
  expressMultiplier: 1.5,
  expressCutoffHour: 18,
  cuposPorDia: 30,
  zones: [
    { id:1, name:"Central",     price:3500,  detail:"Reñaca Centro, Los Almendros, Jardín del Mar, Los Pinos" },
    { id:2, name:"Local",       price:5000,  detail:"Reñaca Norte, Montemar, Higuerillas, Gómez Carreño, Glorias Navales" },
    { id:3, name:"Intermedia",  price:7500,  detail:"Viña Centro y Cerros, Chorrillos, Concón Los Romeros, Costa de Montemar" },
    { id:4, name:"Extendida",   price:10000, detail:"Mantagua, Valparaíso Plan y Cerros, Quilpué Centro" },
    { id:5, name:"Extendida+",  price:15000, detail:"Quintero, Curauma, Placilla, El Belloto" }
  ]
};

const CATALOG = [
  { id:13,  occ:"homenajes",   name:"Luz Infinita",         price:45900,  img:"img/luz-infinita.webp", desc:"Ramo de rosas blancas. Sobrio y luminoso." },
  { id:14,  occ:"homenajes",   name:"Luz del Alba",         price:68900,  img:"img/luz-del-alba.webp", desc:"Lirios blancos y alstroemerias en cesto." },
  { id:15,  occ:"homenajes",   name:"Sereno",               price:59900,  img:"img/sereno.webp",       desc:"Rosas y lirios blancos en caja gris." },
  { id:17,  occ:"homenajes",   name:"Esperanza",            price:138900, img:"img/esperanza.webp",    desc:"Cesto grande de lirios y rosas blancas." },
  { id:201, occ:"homenajes",   name:"Cubre Urna Sublime",   price:129900, img:"img/cubre-urna.webp",   desc:"Homenaje en blancos y crema." },
  { id:202, occ:"homenajes",   name:"Cojín de Condolencias",price:58900,  img:"img/cojin.webp",        desc:"Composición sobria en rosas y astromelias." },
  { id:3,   occ:"romance",     name:"Amor Eterno",          price:230900, img:"img/RAMOS03.webp",      desc:"70 rosas premium seleccionadas." },
  { id:10,  occ:"romance",     name:"Susurro Rosé",         price:48900,  img:"img/RAMOS10.webp",      desc:"Tulipanes y limonium." },
  { id:16,  occ:"romance",     name:"Dulce Amor",           price:48900,  img:"img/dulce-amor.webp",   desc:"Tonos rosados y blancos." },
  { id:11,  occ:"romance",     name:"Luz de Atardecer",     price:42900,  img:"img/RAMOS11.webp",      desc:"Rosas, astromelias y limonium." },
  { id:7,   occ:"celebracion", name:"Golden Bloom",         price:47900,  img:"img/RAMOS07.webp",      desc:"Girasoles, lisianthus y clavelinas." },
  { id:4,   occ:"celebracion", name:"Pasión de Sol",        price:45900,  img:"img/RAMOS04.webp",      desc:"Girasoles, rosas y gypso." },
  { id:6,   occ:"celebracion", name:"Brisa de Primavera",   price:36900,  img:"img/RAMOS06.webp",      desc:"Gerberas, astromelias y ruscus." },
  { id:12,  occ:"celebracion", name:"Encanto Vivo",         price:37900,  img:"img/RAMOS12.webp",      desc:"Mix vibrante de temporada." }
];

const MSGS = {
  condolencias:[
    "Sé que no hay palabras para este dolor, pero quiero que sepas que estoy aquí. Que estas flores te abracen en la distancia.",
    "Las almas que dejan huella nunca se marchan: florecen en nuestros recuerdos. Con el mayor de los respetos, te acompaño."
  ],
  romance:[
    "Cada pétalo de este ramo me recuerda a un momento a tu lado. Gracias por hacer que mi vida florezca. Te amo.",
    "Ninguna obra de la naturaleza se compara al privilegio de tenerte en mi vida. Eres mi lugar seguro."
  ],
  cumpleanos:[
    "Que este nuevo año florezca con la misma luz y alegría que transmites. Celebro tu vida hoy y siempre.",
    "Brindo por ti y por todo lo que has logrado. Que hoy recibas tanto amor como el que siempre entregas."
  ]
};

/* ═══ ESTADO GLOBAL ═══ */
let cart = [];
let S = {
  logistics:"envio",
  zone:null,
  date:"",           // "hoy" | "YYYY-MM-DD"
  time:"",
  express:false,
  occasion:"todos",
  code:null,
  calendarDate: new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}))
};
let cuposMes = {};
const pageStartTime = Date.now();

/* ═══ STORAGE SEGURO ═══ */
try {
  cart = JSON.parse(localStorage.getItem("soho_cart")) || [];
  S.logistics  = localStorage.getItem("soho_logistics")  || "envio";
  S.date       = localStorage.getItem("soho_date")       || "";
  S.time       = localStorage.getItem("soho_time")       || "";
  S.express    = localStorage.getItem("soho_express")    === "true";
} catch(e) { console.warn("Storage privado, funciones limitadas."); }

/* ═══ SESIÓN & TRACKING 4D ═══ */
const sid = sessionStorage.getItem("soho_sid") || ("sid_"+Date.now()+"_"+Math.floor(Math.random()*1e5));
sessionStorage.setItem("soho_sid", sid);
let pagePath = window.location.pathname || "/";
if (pagePath === "/") pagePath = "/index.html";

window.trackEvent4D = function(name, data={}){
  const payload = JSON.stringify({ session_id:sid, event_name:name, event_data:data, url:pagePath });
  fetch(CONFIG.api.track, { method:"POST", headers:{"Content-Type":"application/json"}, keepalive:true, body:payload }).catch(()=>{});
};
window.trackEvent4D("page_view");

/* Registro de compra en gracias.html */
if (pagePath.includes("gracias.html")){
  cart.forEach(item => window.trackEvent4D("purchase", { product_id:item.id, product_name:item.name, price:item.price, qty:item.qty }));
}

/* ═══ UTILIDADES ═══ */
const $ = id => document.getElementById(id);
const clp = n => "$" + n.toLocaleString("es-CL");
const hoyDate = () => new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}));
const hoyStr = () => { const d=hoyDate(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const mananaStr = () => { const d=hoyDate(); d.setDate(d.getDate()+1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };

const waText = encodeURIComponent("Hola Soho Flowers, necesito un arreglo:");
document.addEventListener("DOMContentLoaded", () => { $("wa-float").href = $("wa-footer").href = `https://wa.me/${CONFIG.whatsapp}?text=${waText}`; });

/* ═══ PERSISTENCIA DEL CHECKOUT ═══ */
function guardarProgreso(){
  const data = {
    buyerEmail:    $("buyer-email")?.value    || "",
    senderName:    $("sender-name")?.value    || "",
    receiverName:  $("receiver-name")?.value  || "",
    receiverPhone: $("receiver-phone")?.value || "",
    address:       $("address")?.value        || "",
    deliveryNote:  $("delivery-note")?.value  || "",
    cardMessage:   $("card-message")?.value   || "",
    isAnon:        $("envio-anonimo")?.checked || false
  };
  localStorage.setItem("soho_checkout_inputs", JSON.stringify(data));
  localStorage.setItem("soho_logistics", S.logistics);
  localStorage.setItem("soho_date", S.date);
  localStorage.setItem("soho_time", S.time);
  localStorage.setItem("soho_express", String(S.express));
}
function restaurarProgreso(){
  const data = JSON.parse(localStorage.getItem("soho_checkout_inputs") || "{}");
  if (!data) return;
  ["buyer-email","sender-name","receiver-name","receiver-phone","address","delivery-note","card-message"].forEach(id => {
    const el = $(id);
    const key = id.replace(/-([a-z])/g, (_,l) => l.toUpperCase());
    if (el && data[key]) el.value = data[key];
  });
  if ($("envio-anonimo") && data.isAnon !== undefined) $("envio-anonimo").checked = data.isAnon;
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
  $("product-grid").innerHTML = items.map(p => `
    <div class="group flex flex-col">
      <div class="relative aspect-square bg-white rounded-2xl overflow-hidden border border-ink/5">
        <span class="display text-4xl text-ink/10 absolute inset-0 flex items-center justify-center">SF</span>
        <img src="${p.img}" onerror="this.style.opacity='0'" loading="lazy" alt="${p.name}" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105">
      </div>
      <h3 class="display text-xl md:text-2xl mt-3 leading-tight">${p.name}</h3>
      <p class="text-[10px] uppercase tracking-widest opacity-50 mt-1 line-clamp-2">${p.desc}</p>
      <div class="mt-auto pt-3 flex items-center justify-between gap-2">
        <span class="display text-xl md:text-2xl">${clp(p.price)}</span>
        <button onclick="chooseProduct(${p.id})" class="btn-gold micro px-4 py-3 rounded-full whitespace-nowrap">Elegir →</button>
      </div>
    </div>`).join("");
}
function chooseProduct(id){
  const p = CATALOG.find(x => x.id === id);
  cart = [{ id:p.id, name:p.name, price:p.price, img:p.img, qty:1 }];
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
  window.trackEvent4D("add_to_cart", { product_id:id, product_name:p.name, value:p.price });
  openCheckout();
}

/* ═══ CHECKOUT ═══ */
function openCheckout(){
  if (!cart.length) { document.getElementById("coleccion").scrollIntoView({behavior:"smooth"}); return; }
  S.code = localStorage.getItem("soho_draft_code") || ("SF-" + Date.now());
  localStorage.setItem("soho_draft_code", S.code);
  $("checkout-overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderZones(); renderTimes(); renderSummary();
  restaurarProgreso();
  goStep(1);
  cargarCupos(S.calendarDate);
  window.trackEvent4D("begin_checkout", { value: flowersSubtotal(), order_code: S.code });
}
function closeCheckout(){ $("checkout-overlay").classList.add("hidden"); document.body.style.overflow = "auto"; }
function goStep(n){
  [1,2,3].forEach(i => { $("step-"+i).classList.toggle("hidden", i !== n); $("prog-"+i).classList.toggle("on", i <= n); });
  if (n === 2) $("buyer-email").focus();
  if (n === 3) renderTotals();
  guardarProgreso();
  window.trackEvent4D("checkout_step", { step:n });
}
function flowersSubtotal(){ return cart.reduce((a,i) => a + i.price*i.qty, 0); }
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
  renderTimes();
  guardarProgreso();
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
  guardarProgreso();
}

/* ═══ FECHA (3 botones + calendario visual) ═══ */
function setDate(v){
  S.date = v; S.express = false;
  $("date-hoy").classList.toggle("on", v === "hoy");
  $("date-manana").classList.toggle("on", v === "manana");
  if (v === "hoy" || v === "manana") {
    renderTimes();
    updateHoyButton();
    guardarProgreso();
  } else {
    renderTimes();
    guardarProgreso();
  }
}
function showCalendar(){
  cargarCupos(S.calendarDate);
  renderCalendar();
  $("calendar-modal").classList.remove("hidden");
  setTimeout(() => $("calendar-modal").classList.remove("opacity-0"), 10);
}
function closeCalendar(){
  $("calendar-modal").classList.add("opacity-0");
  setTimeout(() => $("calendar-modal").classList.add("hidden"), 250);
}
async function cargarCupos(fechaDate){
  const yyyy = fechaDate.getFullYear();
  const mm = String(fechaDate.getMonth() + 1).padStart(2,"0");
  try {
    const r = await fetch(`${CONFIG.api.cupos}?mes=${yyyy}-${mm}`);
    if (r.ok) cuposMes = await r.json();
  } catch(e){ console.warn("Cupos offline"); }
  updateHoyButton();
}
function updateHoyButton(){
  const btn = $("date-hoy"); if (!btn) return;
  const hoy = hoyStr();
  const ocupados = cuposMes[hoy] || 0;
  const libres = CONFIG.cuposPorDia - ocupados;
  const now = hoyDate();
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour){
    btn.innerHTML = `<span class="line-through opacity-50">Hoy</span><span class="text-[9px] text-goldink block mt-0.5">Agotado</span>`;
    btn.disabled = true;
  } else if (libres <= 5){
    btn.innerHTML = `Hoy<span class="text-[9px] text-goldink block mt-0.5">Solo ${libres} cupos</span>`;
    btn.disabled = false;
  } else {
    btn.innerHTML = `Hoy`;
    btn.disabled = false;
  }
}
function renderCalendar(){
  const grid = $("calendar-grid"), title = $("cal-month-title");
  if (!grid || !title) return;
  const today = hoyDate();
  const r = S.calendarDate.getFullYear(), o = S.calendarDate.getMonth();
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  title.innerText = `${meses[o]} ${r}`;

  const prevBtn = $("cal-prev"), nextBtn = $("cal-next");
  if (prevBtn) prevBtn.style.visibility = (r === today.getFullYear() && o === today.getMonth()) ? "hidden" : "visible";
  if (nextBtn) nextBtn.style.visibility = "visible";

  grid.innerHTML = "";
  const firstDay = new Date(r, o, 1).getDay();
  const daysInMonth = new Date(r, o + 1, 0).getDate();
  for (let g = 0; g < firstDay; g++) grid.innerHTML += "<div></div>";
  for (let day = 1; day <= daysInMonth; day++){
    const d = new Date(r, o, day); d.setHours(0,0,0,0);
    const t = new Date(today); t.setHours(0,0,0,0);
    const dateStr = `${r}-${String(o + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const ocupados = cuposMes[dateStr] || 0;
    const libres = CONFIG.cuposPorDia - ocupados;
    if (d.getTime() < t.getTime()){
      grid.innerHTML += `<div class="py-3 text-center opacity-30 font-serif">${day}</div>`;
    } else if (libres <= 0){
      grid.innerHTML += `<button disabled class="py-3 font-serif line-through opacity-40 cursor-not-allowed">${day}</button>`;
    } else {
      const badge = libres <= 5 ? `<span class="text-[9px] text-goldink block">${libres}</span>` : "";
      grid.innerHTML += `<button onclick="pickCalendarDay('${dateStr}')" class="py-3 font-serif hover:text-goldink transition font-bold">${day}${badge}</button>`;
    }
  }
}
function changeMonth(dir){
  S.calendarDate.setMonth(S.calendarDate.getMonth() + dir);
  cargarCupos(S.calendarDate);
  renderCalendar();
}
function pickCalendarDay(dateStr){
  S.date = dateStr; S.express = false;
  ["date-hoy","date-manana"].forEach(id => $(id).classList.remove("on"));
  closeCalendar();
  renderTimes();
  guardarProgreso();
}

/* ═══ HORARIOS ═══ */
function renderTimes(){
  const isHoy = S.date === "hoy" || S.date === hoyStr();
  const now = hoyDate();
  const h = now.getHours() + now.getMinutes()/60;
  let html = "";
  if (!isHoy){
    html = ["Mañana (11:00–13:00)","Mediodía (14:00–17:00)","Tarde (18:00–21:00)"]
      .map(t => `<button onclick="setTime(this,'${t}',false)" class="chip px-4 py-3 micro rounded-full">${t}</button>`).join("");
  } else {
    if (h < 7)  html += `<button onclick="setTime(this,'Mañana (11:00–13:00)',false)" class="chip px-4 py-3 micro rounded-full">Mañana (11:00–13:00)</button>`;
    if (h < 11) html += `<button onclick="setTime(this,'Mediodía (14:00–17:00)',false)" class="chip px-4 py-3 micro rounded-full">Mediodía (14:00–17:00)</button>`;
    if (h < 14) html += `<button onclick="setTime(this,'Tarde (18:00–21:00)',false)" class="chip px-4 py-3 micro rounded-full">Tarde (18:00–21:00)</button>`;
    if (S.logistics === "envio" && h < CONFIG.expressCutoffHour){
      html += `<p class="w-full micro text-goldink pt-3">Express 1–2 h (+50% solo sobre el envío):</p>`;
      let a = Math.max(10, Math.ceil(h+1));
      while (a < 20){
        html += `<button onclick="setTime(this,'Express (${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00)',true)" class="chip px-4 py-3 micro rounded-full !border-gold text-goldink">${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00</button>`;
        a++;
      }
    }
  }
  $("time-chips").innerHTML = html || `<p class="micro opacity-50">Entregas de hoy cerradas. Elige otra fecha.</p>`;
}
function setTime(el, t, express){
  S.time = t; S.express = express;
  document.querySelectorAll("#time-chips .chip").forEach(b => b.classList.remove("on"));
  el.classList.add("on");
  guardarProgreso();
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
  let rows = `<div class="flex justify-between"><span class="opacity-60">Arreglo(s)</span><span>${clp(t.sub)}</span></div>`;
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

/* ═══ MENSAJES DE TARJETA (typewriter) ═══ */
function writeMsg(kind){
  const list = MSGS[kind] || [];
  const msg = list[Math.floor(Math.random()*list.length)];
  const t = $("card-message"); if (!t) return;
  t.value = ""; let i = 0;
  const iv = setInterval(() => {
    t.value += msg.charAt(i++);
    if (i >= msg.length){ clearInterval(iv); guardarProgreso(); }
  }, 15);
}

/* ═══ PAYLOAD (compatible con tu worker y panel 4D) ═══ */
function orderPayload(){
  const t = calcTotals();
  const anon = $("envio-anonimo")?.checked;
  const senderRaw = $("sender-name")?.value || "No especificado";
  const sender = anon ? "Alguien que te quiere (Anónimo)" : senderRaw;
  const address = $("address")?.value || "";
  const note = $("delivery-note")?.value || "";
  let logistics = S.logistics === "envio"
    ? `Envío a Domicilio (${S.zone ? S.zone.name : ""})\n• DIRECCIÓN: ${address}`
    : "Retiro en Atelier";
  if (note.trim()) logistics += `\n• NOTA: ${note.trim()}`;
  if (S.express && S.logistics === "envio") logistics = "[SERVICIO EXPRESS] " + logistics;

  return {
    totalCLP: t.total,
    metadata: {
      order_code: S.code,
      sender_name: sender,
      real_buyer_name: senderRaw,
      receiver_name: $("receiver-name")?.value || "No especificado",
      palette: "Predeterminada del Diseño",
      logistics_detail: logistics,
      time_slot: S.time || "No especificado",
      destination_phone: $("receiver-phone")?.value || "",
      card_text: $("card-message")?.value || "",
      total_price: t.total,
      flowers_subtotal_clp: t.sub,
      points_discount_clp: 0,
      order_summary: cart.map(i => `- ${i.name} (Cant: ${i.qty}) [c/u: ${clp(i.price)}]`).join("\n"),
      fecha_entrega: S.date === "hoy" ? "Hoy" : S.date,
      valor_envio: t.ship - t.bonus,
      comprador_email: $("buyer-email")?.value || "",
      express: S.express
    }
  };
}

/* ═══ PAGO 1: WEBPAY vía FLOW ═══ */
async function payFlow(){
  const email = $("buyer-email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Necesitamos tu correo para la confirmación.");
  if (S.logistics === "envio" && (!S.zone || !$("address").value.trim())) return alert("Falta zona o dirección de entrega.");
  if (!S.time) return alert("Elige un bloque horario.");
  const cartVal = flowersSubtotal();
  window.trackEvent4D("payment_initiated", { method:"FlowWebpay", cart_value: cartVal, order_code: S.code, email });
  try {
    const r = await fetch(CONFIG.api.flowCreate, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(orderPayload()) });
    const d = await r.json();
    if (d.url){ localStorage.removeItem("soho_draft_code"); window.location.href = d.url; }
    else throw 0;
  } catch(e){ alert("Error al conectar con Webpay. Intenta nuevamente o usa PayPal."); }
}

/* ═══ PAGO 2: PAYPAL ═══ */
let paypalLoaded = false;
function payPayPal(){
  const email = $("buyer-email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Necesitamos tu correo para la confirmación.");
  const cartVal = flowersSubtotal();
  window.trackEvent4D("payment_initiated", { method:"PayPal", cart_value: cartVal, order_code: S.code, email });
  const run = () => {
    paypal.Buttons({
      style:{ color:"gold", shape:"rect", label:"pay", height:45 },
      createOrder: async () => {
        const r = await fetch(CONFIG.api.paypalCreate, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(orderPayload()) });
        const d = await r.json(); if (d.id) return d.id; throw Error("PayPal create");
      },
      onApprove: async (data) => {
        const r = await fetch(CONFIG.api.paypalCapture, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ orderID:data.orderID, metadata: orderPayload().metadata }) });
        const d = await r.json();
        if (d.status === "COMPLETED"){ localStorage.removeItem("soho_draft_code"); location.href = location.origin + "/gracias.html?payment_id=" + d.id; }
        else alert("El pago no pudo completarse.");
      },
      onError: () => alert("PayPal falló. Prueba con Webpay.")
    }).render("#paypal-container");
  };
  if (paypalLoaded || typeof paypal !== "undefined") return run();
  const s = document.createElement("script");
  s.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.paypalClientId}&currency=USD`;
  s.onload = () => { paypalLoaded = true; run(); };
  document.body.appendChild(s);
}

/* ═══ COUNTDOWN EXPRESS (urgencia visual) ═══ */
function updateCountdown(){
  const el = $("express-status"); if (!el) return;
  const now = hoyDate();
  const libres = CONFIG.cuposPorDia - (cuposMes[hoyStr()] || 0);
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour){
    el.innerText = "Express de hoy agotado · Agenda para mañana";
    return;
  }
  const cutoff = new Date(now); cutoff.setHours(CONFIG.expressCutoffHour,0,0,0);
  const ms = cutoff - now;
  const hh = String(Math.floor(ms/3600000)).padStart(2,"0");
  const mm = String(Math.floor(ms%3600000/60000)).padStart(2,"0");
  const ss = String(Math.floor((ms%60000)/1000)).padStart(2,"0");
  el.innerHTML = `Express 1–2 h · cupos hoy: <b>${libres}</b> · cierra en <span class="font-mono">${hh}:${mm}:${ss}</span>`;
}

/* ═══ HEARTBEAT & ABANDONO (crítico para recuperación) ═══ */
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
let scrollFlags = {25:false, 50:false, 75:false, 100:false};
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  if (docH <= 0) return;
  const pct = Math.round((window.scrollY / docH) * 100);
  [25,50,75,100].forEach(d => {
    if (pct >= d && !scrollFlags[d]){ scrollFlags[d] = true; window.trackEvent4D("scroll_depth", {depth:d}); }
  });
}, { passive:true });

/* ═══ CARRO UI ═══ */
function updateCartUI(){ $("cart-count").innerText = cart.reduce((a,i) => a + i.qty, 0); }

/* ═══ INIT ═══ */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid(); updateCartUI(); cargarCupos(S.calendarDate);
  $("date-input").min = mananaStr();
  if (S.date) setDate(S.date);
  updateCountdown();
  setInterval(updateCountdown, 1000);
  restaurarProgreso();
});

/* Restaurar al volver con botón Atrás del navegador (bfcache) */
window.addEventListener("pageshow", e => { if (e.persisted) { restaurarProgreso(); updateCartUI(); } });
