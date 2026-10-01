// Completa estos datos antes de publicar. No se inventan datos de contacto.
window.ENPLAN_CONFIG = {
  email: "enplancomunicacion.online@gmail.com",
  whatsapp: "34641577061", // Prefijo internacional y número, solo dígitos. Ejemplo de formato: 34...
  instagram: "https://www.instagram.com/enplan.comunicacion/", // URL completa del perfil de ENPLAN.
  // Clave de Web3Forms para que el formulario os llegue por correo automáticamente.
  // Pídela gratis en https://web3forms.com con enplancomunicacion.online@gmail.com y pégala entre las comillas.
  formKey: ""
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
  const button=document.querySelector('#submit-button');
  // Solo se usa si se configura un servicio de formularios (Web3Forms). Si está vacío, el formulario continúa en WhatsApp.
  const formKey=typeof config.formKey==='string' && config.formKey.trim().length>10 ? config.formKey.trim() : '';
  if(formKey){button.textContent='Enviar mi consulta';note.textContent='Te respondemos en menos de 48 horas laborables.';}
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    if(data.get('botcheck'))return;
    const lines=[`Hola, ENPLAN. Soy ${data.get('name')}.`,`Correo: ${data.get('email')}`];
    if(data.get('business'))lines.push(`Negocio: ${data.get('business')}`);
    if(data.get('interest'))lines.push(`Me interesa: ${data.get('interest')}`);
    lines.push('',data.get('message'));
    const text=lines.join('\n');
    if(formKey){
      button.disabled=true;const label=button.textContent;button.textContent='Enviando…';status.textContent='';
      try{
        const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({
          access_key:formKey,subject:'Nueva consulta web · '+(data.get('business')||data.get('name')),from_name:'Web ENPLAN Comunicación',replyto:data.get('email'),
          Nombre:data.get('name'),Correo:data.get('email'),Negocio:data.get('business')||'—',Interes:data.get('interest'),Mensaje:data.get('message')})});
        const json=await res.json().catch(()=>({}));
        if(res.ok && json.success!==false){form.reset();status.textContent='¡Recibido! Te respondemos en menos de 48 horas laborables.';}
        else throw new Error('envío');
      }catch(err){status.textContent='No hemos podido enviar tu consulta. Escríbenos por WhatsApp al 641 577 061.';}
      finally{button.disabled=false;button.textContent=label;}
      return;
    }
    if(phone){
      window.open('https://wa.me/'+phone+'?text='+encodeURIComponent(text),'_blank','noopener');
      status.textContent='Hemos abierto WhatsApp con tu mensaje. Revísalo y pulsa enviar para que nos llegue.';
      return;
    }
    if(email){location.href='mailto:'+email+'?subject='+encodeURIComponent('Consulta ENPLAN')+'&body='+encodeURIComponent(text);}
  });
}
