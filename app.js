/* ═══════════════════════════════════════════════════════
   SOHO FLOWERS — MOTOR DE CONVERSIÓN
   Modular: cambia CONFIG y CATALOG y tienes otro cliente.
   ═══════════════════════════════════════════════════════ */
const CONFIG = {
  brand: "Soho Flowers",
  whatsapp: "56994783520",
  api: {
    mpPreference: "https://old-brook-bf01.sebjmz.workers.dev/",
    mpWebhook:    "https://old-brook-bf01.sebjmz.workers.dev/webhook",
    paypalCreate: "https://old-brook-bf01.sebjmz.workers.dev/paypal/create-order",
    paypalCapture:"https://old-brook-bf01.sebjmz.workers.dev/paypal/capture-order",
    track:        "https://club-laforesta.sebjmz.workers.dev/api/track",
    cupos:        "https://old-brook-bf01.sebjmz.workers.dev/cupos"
  },
  paypalClientId: "AbfBLeAuXrylWnzDIOQcvpfJwrzBAy0N8281_ip4dFmH1k6H8kW70tPOE_IH6sc05OafIHHfe1PE1Mv1",
  freeShipThreshold: 69990,
  freeShipBonus: 7250,
  expressMultiplier: 1.5,   // +50% SOLO sobre el envío
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

/* Catálogo curado: pocos productos, decisión rápida */
const CATALOG = [
  { id:13,  occ:"homenajes",   name:"Luz Infinita",        price:45900,  img:"img/luz-infinita.webp",      desc:"Ramo de rosas blancas. Sobrio y luminoso." },
  { id:14,  occ:"homenajes",   name:"Luz del Alba",        price:68900,  img:"img/luz-del-alba.webp",      desc:"Lirios blancos y alstroemerias en cesto." },
  { id:15,  occ:"homenajes",   name:"Sereno",              price:59900,  img:"img/sereno.webp",            desc:"Rosas y lirios blancos en caja gris." },
  { id:17,  occ:"homenajes",   name:"Esperanza",           price:138900, img:"img/esperanza.webp",         desc:"Cesto grande de lirios y rosas blancas." },
  { id:201, occ:"homenajes",   name:"Cubre Urna Sublime",  price:129900, img:"img/cubre-urna.webp",        desc:"Homenaje en blancos y crema." },
  { id:202, occ:"homenajes",   name:"Cojín de Condolencias",price:58900, img:"img/cojin.webp",             desc:"Composición sobria en rosas y astromelias." },
  { id:3,   occ:"romance",     name:"Amor Eterno",         price:230900, img:"img/RAMOS03.webp",           desc:"70 rosas premium seleccionadas." },
  { id:10,  occ:"romance",     name:"Susurro Rosé",        price:48900,  img:"img/RAMOS10.webp",           desc:"Tulipanes y limonium." },
  { id:16,  occ:"romance",     name:"Dulce Amor",          price:48900,  img:"img/dulce-amor.webp",        desc:"Tonos rosados y blancos." },
  { id:11,  occ:"romance",     name:"Luz de Atardecer",    price:42900,  img:"img/RAMOS11.webp",           desc:"Rosas, astromelias y limonium." },
  { id:7,   occ:"celebracion", name:"Golden Bloom",        price:47900,  img:"img/RAMOS07.webp",           desc:"Girasoles, lisianthus y clavelinas." },
  { id:4,   occ:"celebracion", name:"Pasión de Sol",       price:45900,  img:"img/RAMOS04.webp",           desc:"Girasoles, rosas y gypso." },
  { id:6,   occ:"celebracion", name:"Brisa de Primavera",  price:36900,  img:"img/RAMOS06.webp",           desc:"Gerberas, astromelias y ruscus." },
  { id:12,  occ:"celebracion", name:"Encanto Vivo",        price:37900,  img:"img/RAMOS12.webp",           desc:"Mix vibrante de temporada." }
];

const MSGS = {
  condolencias:["Sé que no hay palabras para este dolor, pero quiero que sepas que estoy aquí. Que estas flores te abracen en la distancia.","Las almas que dejan huella nunca se marchan: florecen en nuestros recuerdos. Con el mayor de los respetos, te acompaño."],
  romance:["Cada pétalo de este ramo me recuerda a un momento a tu lado. Gracias por hacer que mi vida florezca. Te amo.","Ninguna obra de la naturaleza se compara al privilegio de tenerte en mi vida. Eres mi lugar seguro."],
  cumpleanos:["Que este nuevo año florezca con la misma luz y alegría que transmites. Celebro tu vida hoy y siempre.","Brindo por ti y por todo lo que has logrado. Que hoy recibas tanto amor como el que siempre entregas."]
};

/* ── Estado ── */
let cart = JSON.parse(localStorage.getItem("soho_cart") || "[]");
let S = { logistics:"envio", zone:null, date:"", dateMode:"", time:"", express:false, occasion:"todos" };
let cuposMes = {};

/* ── Telemetría (misma API que tu panel 4D) ── */
const sid = sessionStorage.getItem("soho_sid") || ("sid_"+Date.now()+"_"+Math.floor(Math.random()*1e5));
sessionStorage.setItem("soho_sid", sid);
function track(name, data={}){
  fetch(CONFIG.api.track, { method:"POST", headers:{"Content-Type":"application/json"}, keepalive:true,
    body: JSON.stringify({ session_id:sid, event_name:name, event_data:data, url:location.pathname }) }).catch(()=>{});
}
track("page_view");

/* ── Utilidades ── */
const $ = id => document.getElementById(id);
const clp = n => "$" + n.toLocaleString("es-CL");
const hoyStr = () => { const d = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"})); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const mananaStr = () => { const d = new Date(new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}))); d.setDate(d.getDate()+1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };

/* ── WhatsApp ─ */
const waText = encodeURIComponent("Hola Soho Flowers, necesito un arreglo para hoy/fecha específica:");
$("wa-float").href = $("wa-footer").href = `https://wa.me/${CONFIG.whatsapp}?text=${waText}`;

/* ── Embudo: intención primero ── */
function startFunnel(mode){
  S.dateMode = mode;
  track("intent_click", { mode });
  if (mode === "hoy") { S.date = "hoy"; }
  if (mode === "fecha") { S.date = ""; }
  document.getElementById("coleccion").scrollIntoView({behavior:"smooth"});
}
function filterOccasion(occ){
  S.occasion = occ;
  track("occasion_filter", { occ });
  document.querySelectorAll(".occ-btn").forEach(b => b.classList.toggle("on", b.dataset.occ === occ));
  $("catalog-title").innerText = occ === "todos" ? "Colección completa" :
    occ === "homenajes" ? "Homenajes y condolencias" : occ === "romance" ? "Romance" : "Celebración";
  renderGrid();
  document.getElementById("coleccion").scrollIntoView({behavior:"smooth"});
}

/* ── Catálogo ── */
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
  cart = [{ id:p.id, name:p.name, price:p.price, img:p.img, qty:1 }]; // compra rápida: 1 arreglo, sin ruido
  localStorage.setItem("soho_cart", JSON.stringify(cart));
  updateCartUI();
  track("add_to_cart", { product_id:id, product_name:p.name, value:p.price });
  openCheckout();
}

/* ── Checkout ── */
function openCheckout(){
  if (!cart.length) { document.getElementById("coleccion").scrollIntoView({behavior:"smooth"}); return; }
  $("checkout-overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderZones(); renderTimes(); renderSummary();
  goStep(1);
  track("begin_checkout", { value: flowersSubtotal() });
}
function closeCheckout(){ $("checkout-overlay").classList.add("hidden"); document.body.style.overflow = "auto"; }
function goStep(n){
  [1,2,3].forEach(i => { $("step-"+i).classList.toggle("hidden", i !== n); $("prog-"+i).classList.toggle("on", i <= n); });
  if (n === 2 && !$("buyer-email").value) $("buyer-email").focus();
  if (n === 3) renderTotals();
  track("checkout_step", { step:n });
}
function flowersSubtotal(){ return cart.reduce((a,i) => a + i.price*i.qty, 0); }

function renderSummary(){
  $("cart-summary").innerHTML = cart.map(i => `
    <div class="flex justify-between items-center border border-ink/10 rounded-xl px-4 py-3 bg-white">
      <span class="display text-xl">${i.name} <span class="text-xs opacity-50 not-italic font-sans">×${i.qty}</span></span>
      <span class="display text-xl text-gold">${clp(i.price*i.qty)}</span>
    </div>`).join("");
}

function setLogistics(m){
  S.logistics = m;
  $("mod-envio").classList.toggle("on", m === "envio");
  $("mod-retiro").classList.toggle("on", m === "retiro");
  $("zone-block").style.display = m === "envio" ? "" : "none";
  renderTimes();
}
function renderZones(){
  $("zone-chips").innerHTML = CONFIG.zones.map(z => `
    <button onclick="setZone(${z.id})" id="zone-${z.id}" class="chip px-4 py-2 micro rounded-full">${z.name} +${clp(z.price)}</button>`).join("");
}
function setZone(id){
  S.zone = CONFIG.zones.find(z => z.id === id);
  CONFIG.zones.forEach(z => $("zone-"+z.id).classList.toggle("on", z.id === id));
  $("zone-detail").innerText = S.zone.detail;
}
function setDate(v){
  S.date = v;
  S.express = false;
  $("date-hoy").classList.toggle("on", v === "hoy");
  $("date-manana").classList.toggle("on", v === "manana");
  renderTimes();
}
function renderTimes(){
  const isHoy = S.date === "hoy" || S.date === hoyStr();
  const now = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}));
  const h = now.getHours() + now.getMinutes()/60;
  let html = "";
  if (!isHoy){
    html = ["Mañana (11:00–13:00)","Mediodía (14:00–17:00)","Tarde (18:00–21:00)"]
      .map(t => `<button onclick="setTime('${t}',false)" class="chip px-4 py-3 micro rounded-full">${t}</button>`).join("");
  } else {
    if (h < 7)  html += `<button onclick="setTime('Mañana (11:00–13:00)',false)" class="chip px-4 py-3 micro rounded-full">Mañana (11:00–13:00)</button>`;
    if (h < 11) html += `<button onclick="setTime('Mediodía (14:00–17:00)',false)" class="chip px-4 py-3 micro rounded-full">Mediodía (14:00–17:00)</button>`;
    if (h < 14) html += `<button onclick="setTime('Tarde (18:00–21:00)',false)" class="chip px-4 py-3 micro rounded-full">Tarde (18:00–21:00)</button>`;
    if (S.logistics === "envio" && h < CONFIG.expressCutoffHour){
      html += `<p class="w-full micro text-gold pt-2">Express 1–2 h (+50% solo sobre el envío):</p>`;
      let a = Math.max(10, Math.ceil(h+1));
      while (a < 20){
        html += `<button onclick="setTime('Express (${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00)',true)" class="chip px-4 py-3 micro rounded-full !border-gold text-gold">${String(a).padStart(2,"0")}:00–${String(a+1).padStart(2,"0")}:00</button>`;
        a++;
      }
    }
  }
  $("time-chips").innerHTML = html || `<p class="micro opacity-50">Entregas de hoy cerradas. Elige otra fecha.</p>`;
}
function setTime(t, express){
  S.time = t; S.express = express;
  document.querySelectorAll("#time-chips .chip").forEach(b => b.classList.toggle("on", b.innerText.includes(t.split(" (")[0]) && b.classList.contains("on") ? true : b.innerText === t.replace("Express ","").replace(/\d{2}:00–\d{2}:00/, m => express ? m : m) && false));
  // marcado simple:
  document.querySelectorAll("#time-chips .chip").forEach(b => b.classList.remove("on"));
  event.target.classList.add("on");
  renderTotals();
}

/* ── Totales transparentes (La Regla Soho) ── */
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
    if (t.bonus)   rows += `<div class="flex justify-between text-gold"><span>Envío de cortesía</span><span>−${clp(t.bonus)}</span></div>`;
  } else {
    rows += `<div class="flex justify-between"><span class="opacity-60">Retiro en atelier</span><span>$0</span></div>`;
  }
  rows += `<div class="flex justify-between items-end pt-2 border-t border-ink/10">
    <span class="micro opacity-60">Total</span><span class="display text-4xl text-gold">${clp(t.total)}</span></div>`;
  $("total-breakdown").innerHTML = rows;
}

/* ── Mensajes de tarjeta ── */
function writeMsg(kind){
  const list = MSGS[kind] || [];
  $("card-message").value = list[Math.floor(Math.random()*list.length)];
}

/* ── Payload compatible con tu backend actual ── */
function orderPayload(){
  const t = calcTotals();
  const anon = $("envio-anonimo").checked;
  return {
    totalCLP: t.total,
    metadata: {
      sender_name: anon ? "Alguien que te quiere (Anónimo)" : ($("sender-name").value || "No especificado"),
      real_buyer_name: $("sender-name").value || "",
      receiver_name: $("receiver-name").value || "No especificado",
      palette: "Predeterminada del Diseño",
      logistics_detail: S.logistics === "envio"
        ? `Envío a Domicilio (${S.zone ? S.zone.name : ""})\n• DIRECCIÓN: ${$("address").value}`
        : "Retiro en Atelier",
      time_slot: S.time || "No especificado",
      destination_phone: $("receiver-phone").value || "",
      card_text: $("card-message").value || "",
      total_price: t.total,
      flowers_subtotal_clp: t.sub,
      points_discount_clp: 0,
      order_summary: cart.map(i => `- ${i.name} (Cant: ${i.qty}) [c/u: ${clp(i.price)}]`).join("\n"),
      fecha_entrega: S.date === "hoy" ? "Hoy" : S.date,
      valor_envio: t.ship - t.bonus,
      comprador_email: $("buyer-email").value || "",
      express: S.express
    }
  };
}

/* ── Pagos ── */
async function payMercadoPago(){
  const email = $("buyer-email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Necesitamos tu correo para la confirmación.");
  if (S.logistics === "envio" && (!S.zone || !$("address").value.trim())) return alert("Falta zona o dirección de entrega.");
  if (!S.time) return alert("Elige un bloque horario.");
  track("payment_initiated", { method:"MercadoPago", cart_value: flowersSubtotal() });
  const payload = orderPayload();
  const items = cart.map(i => ({ id:String(i.id), title:i.name, description:i.name, quantity:i.qty, unit_price:i.price, currency_id:"CLP" }));
  if (payload.metadata.valor_envio > 0) items.push({ id:"ENVIO", title:`Envío${S.express?" Express":""} - ${S.zone.name}`, description:"Servicio de logística", quantity:1, unit_price:payload.metadata.valor_envio, currency_id:"CLP" });
  try {
    const r = await fetch(CONFIG.api.mpPreference, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({
      external_reference: "SF-" + Date.now(),
      items,
      payer: { name: (payload.metadata.sender_name.split(" ")[0] || "Cliente"), surname: "Soho Flowers", email },
      back_urls: { success: location.origin+"/gracias.html", failure: location.origin+"?payment_result=failure", pending: location.origin+"?payment_result=pending" },
      auto_return: "approved",
      notification_url: CONFIG.api.mpWebhook,
      metadata: payload.metadata
    })});
    const d = await r.json();
    if (d.init_point) location.href = d.init_point; else throw 0;
  } catch(e){ alert("Error al conectar con MercadoPago. Intenta nuevamente."); }
}

let paypalLoaded = false;
function payPayPal(){
  const email = $("buyer-email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Necesitamos tu correo para la confirmación.");
  track("payment_initiated", { method:"PayPal", cart_value: flowersSubtotal() });
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
        if (d.status === "COMPLETED") location.href = location.origin + "/gracias.html?payment_id=" + d.id;
        else alert("El pago no pudo completarse.");
      },
      onError: () => alert("PayPal falló. Prueba con Mercado Pago.")
    }).render("#paypal-container");
  };
  if (paypalLoaded || typeof paypal !== "undefined") return run();
  const s = document.createElement("script");
  s.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.paypalClientId}&currency=USD`;
  s.onload = () => { paypalLoaded = true; run(); };
  document.body.appendChild(s);
}

/* ── Cupos + countdown express ── */
async function loadCupos(){
  const d = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}));
  try {
    const r = await fetch(`${CONFIG.api.cupos}?mes=${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);
    if (r.ok) cuposMes = await r.json();
  } catch(e){}
  const ocupados = cuposMes[hoyStr()] || 0;
  const libres = CONFIG.cuposPorDia - ocupados;
  const now = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"}));
  const el = $("express-status");
  if (libres <= 0 || now.getHours() >= CONFIG.expressCutoffHour){
    el.innerText = "Express de hoy agotado · Agenda para mañana";
    $("date-hoy").disabled = true;
  } else {
    const cutoff = new Date(now); cutoff.setHours(CONFIG.expressCutoffHour,0,0,0);
    const ms = cutoff - now;
    const hh = String(Math.floor(ms/3600000)).padStart(2,"0"), mm = String(Math.floor(ms%3600000/60000)).padStart(2,"0");
    el.innerText = `Express 1–2 h disponible · cupos hoy: ${libres} · cierra en ${hh}:${mm}`;
  }
}

/* ── Carrito UI ── */
function updateCartUI(){
  const n = cart.reduce((a,i) => a + i.qty, 0);
  $("cart-count").innerText = n;
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCartUI();
  loadCupos();
  const di = $("date-input"); di.min = mananaStr();
  if (S.dateMode === "hoy") setDate("hoy");
});
