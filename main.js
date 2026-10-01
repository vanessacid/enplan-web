// Completa estos datos antes de publicar. No se inventan datos de contacto.
window.ENPLAN_CONFIG = {
  email: "enplancomunicacion.online@gmail.com",
  whatsapp: "34641577061", // Prefijo internacional y número, solo dígitos. Ejemplo de formato: 34...
  instagram: "https://www.instagram.com/enplan.comunicacion/" // URL completa del perfil de ENPLAN.
};

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  const closeMenu = () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
  menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => {if(e.key === 'Escape'){closeMenu();menu.focus();}});
}
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {const select = document.querySelector('#interest');if(select) select.value=link.dataset.plan;}));
const year = document.querySelector('#year'); if(year) year.textContent=new Date().getFullYear();
const config = window.ENPLAN_CONFIG || {};
const direct = document.querySelector('#direct-contact');
const email = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ? config.email : '';
const phone = typeof config.whatsapp === 'string' && /^\d{8,15}$/.test(config.whatsapp) ? config.whatsapp : '';
if(direct){
  const addLink=(text,href)=>{const a=document.createElement('a');a.textContent=text;a.href=href;direct.append(a);};
  if(phone) addLink('WhatsApp','https://wa.me/'+phone);
  if(email) addLink('Correo','mailto:'+email);
  if(config.instagram && /^https:\/\/(www\.)?instagram\.com\//.test(config.instagram)) addLink('Instagram',config.instagram);
}
const form=document.querySelector('#contact-form');
if(form){
  const note=document.querySelector('#form-note');
  const status=document.querySelector('#form-status');
  if(email) {document.querySelector('#submit-button').textContent='Preparar mi correo';note.textContent='Se abrirá tu aplicación de correo con la consulta preparada. Solo se enviará cuando tú lo confirmes allí.';}
  else if(phone){document.querySelector('#submit-button').textContent='Continuar en WhatsApp';note.textContent='Se abrirá WhatsApp con tu consulta preparada. Tú confirmas el envío.';}
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const data=new FormData(form);
    const text=`Hola, ENPLAN. Soy ${data.get('name')}.\nNegocio: ${data.get('business')}\nCorreo: ${data.get('email')}\nCiudad: ${data.get('location') || 'Sin indicar'}\nMe interesa: ${data.get('interest')}\n\n${data.get('message')}`;
    if(email){location.href='mailto:'+email+'?subject='+encodeURIComponent('Consulta ENPLAN · '+data.get('business'))+'&body='+encodeURIComponent(text);status.textContent='Tu correo está preparado. Revisa y envía desde tu aplicación de correo.';return;}
    if(phone){location.href='https://wa.me/'+phone+'?text='+encodeURIComponent(text);return;}
    const output=document.querySelector('#prepared-message');output.hidden=false;output.value=text;
    try{await navigator.clipboard.writeText(text);status.textContent='Mensaje copiado. No se ha enviado ninguna consulta.';}catch{output.focus();output.select();status.textContent='Tu mensaje está listo para copiar. No se ha enviado.';}
  });
}
