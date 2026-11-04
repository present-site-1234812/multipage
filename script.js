'use strict';
/* Все сведения о компании меняются здесь. Пустые контакты не создают ссылок.
   Telegram: имя без @ или полный адрес https://t.me/username.
   Дополнительные контакты: { label: 'Email', value: 'mail@example.ru', href: 'mailto:mail@example.ru' }.
   Для своих проектов замените фото и установите demo: false. */
const CONFIG = {
  companyName: '[НАЗВАНИЕ КОМПАНИИ]',
  phone: '', telegram: '', extraContacts: [],
  region: 'Алтайский край', city: '', districts: [],
  owner: '', experience: '', legal: '',
  services: [
    {title:'Внутренняя отделка',description:'Комплекс работ для жилых помещений.',icon:'home'},
    {title:'Малярные работы',description:'Покраска стен и потолков.',icon:'roller'},
    {title:'Шпаклёвка стен',description:'Подготовка поверхностей к отделке.',icon:'trowel'},
    {title:'Укладка напольных покрытий',description:'Укладка ламината и других покрытий.',icon:'floor'},
    {title:'Плиточные работы',description:'Облицовка стен и пола плиткой.',icon:'tiles'},
    {title:'Отделка коммерческих помещений',description:'Отделка офисов и рабочих пространств.',icon:'building'}
  ],
  projects: [
    {title:'Светлая гостиная',type:'Пример отделки стен и пола',image:'assets/images/living-room.webp',alt:'Светлая гостиная с мягкой мебелью',demo:true},
    {title:'Спокойная палитра',type:'Пример внутренней отделки',image:'assets/images/interior.webp',alt:'Современный интерьер в нейтральных тонах',demo:true},
    {title:'Детали интерьера',type:'Пример сочетания отделочных материалов',image:'assets/images/bathroom.webp',alt:'Пример современного интерьерного решения',demo:true}
  ]
};
const icons={home:'M3 20V9l9-6 9 6v11M8 20v-8h8v8M3 20h18',roller:'M4 3h14v7H4zM18 6h3v8h-9v7M10 18h4v4h-4z',trowel:'M3 3h18l-4 9H7zM10 12v8a2 2 0 0 0 4 0v-8',floor:'m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5',tiles:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',building:'M4 21V3h16v18M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M10 21v-6h4v6'};
function svg(path){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('aria-hidden','true');const p=document.createElementNS(s.namespaceURI,'path');p.setAttribute('d',path);s.append(p);return s;}
function element(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
const region=[CONFIG.region,CONFIG.city,...CONFIG.districts].filter(Boolean).join(', ');
document.querySelectorAll('[data-company]').forEach(n=>n.textContent=CONFIG.companyName);
document.querySelectorAll('[data-region]').forEach(n=>n.textContent=region);
for(const key of ['owner','experience','legal'])if(CONFIG[key] && document.getElementById(key))document.getElementById(key).textContent=CONFIG[key];
if(document.getElementById('services-grid')) document.getElementById('services-grid').replaceChildren();
if(document.getElementById('services-grid')) CONFIG.services.forEach(service=>{const card=element('article','service');const copy=element('div');copy.append(element('h3','',service.title),element('p','',service.description));card.append(svg(icons[service.icon]||icons.home),copy);document.getElementById('services-grid').append(card);});
const dialog=document.getElementById('lightbox');let opener;
if(document.getElementById('projects-grid')) document.getElementById('projects-grid').replaceChildren();
if(document.getElementById('projects-grid')) CONFIG.projects.forEach(project=>{const card=element('article','project');const button=element('button','project-photo');button.type='button';button.setAttribute('aria-label','Увеличить: '+project.title);const img=element('img');img.src=project.image;img.alt=(project.demo?'Демонстрационное фото: ':'')+project.alt;img.loading='lazy';img.width=800;img.height=533;const zoom=element('span','zoom');zoom.append(svg('M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'));button.append(img,zoom);const heading=element('div','project-heading');heading.append(element('h3','',project.title));if(project.demo)heading.append(element('span','demo','Демо'));card.append(button,heading,element('p','',project.type));button.addEventListener('click',()=>{opener=button;const full=document.getElementById('lightbox-image');full.src=project.image;full.alt=img.alt;document.getElementById('lightbox-title').textContent=project.title;document.getElementById('lightbox-description').textContent=project.demo?'Демонстрационный интерьер. Не является выполненным нами проектом.':project.type;dialog.showModal();document.body.classList.add('modal-open');});document.getElementById('projects-grid').append(card);});
document.getElementById('close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(opener)opener.focus();});
function link(text,href){const a=element('a','',text);a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}return a;}
const phone=CONFIG.phone.replace(/[^\d+]/g,'');
if(document.getElementById('phone') && /^\+?\d{7,15}$/.test(phone)){document.getElementById('phone').replaceChildren(link(CONFIG.phone,'tel:'+phone));const call=link('Позвонить','tel:'+phone);call.className='button primary';document.getElementById('call-action').replaceChildren(call);const header=document.querySelector('.header-contact');header.textContent=CONFIG.phone;header.href='tel:'+phone;}
const telegram=CONFIG.telegram.trim().replace(/^https:\/\/t\.me\//,'').replace(/^@/,'');
if(document.getElementById('telegram') && /^[a-zA-Z0-9_]{5,32}$/.test(telegram)){document.getElementById('telegram').replaceChildren(link('@'+telegram,'https://t.me/'+telegram));if(!/^\+?\d{7,15}$/.test(phone)){const message=link('Написать в Telegram','https://t.me/'+telegram);message.className='button primary';document.getElementById('call-action').replaceChildren(message);}}
if(document.getElementById('extra-contacts')) CONFIG.extraContacts.forEach(contact=>{const row=element('p');row.append(element('span','contact-label',contact.label));if(/^(https:\/\/|mailto:|tel:)/i.test(contact.href||''))row.append(link(contact.value,contact.href));else row.append(document.createTextNode(contact.value));document.getElementById('extra-contacts').append(row);});
const toggle=document.getElementById('theme-toggle'),system=matchMedia('(prefers-color-scheme: dark)');
const themeState=window.siteTheme;
let manual=themeState.manual;
function syncThemeLinks(theme){
 if(!themeState.portable)return;
 document.querySelectorAll('a[href]').forEach(a=>{
  const raw=a.getAttribute('href');if(raw.startsWith('#'))return;
  const url=new URL(raw,location.href);
  if(url.protocol!==location.protocol||url.host!==location.host||!url.pathname.endsWith('.html'))return;
  if(manual)url.searchParams.set('theme',theme);else url.searchParams.delete('theme');
  a.href=url.href;
 });
 // Preserve the selection on reload without relying on file-origin storage.
 const url=new URL(location.href);
 if(manual)url.searchParams.set('theme',theme);else url.searchParams.delete('theme');
 try{history.replaceState(history.state,'',url.href);}catch(e){}
}
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;
 toggle.setAttribute('aria-pressed',String(theme==='dark'));
 toggle.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');
 document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#151A19':'#FFFFFF';
 syncThemeLinks(theme);
}
applyTheme(document.documentElement.dataset.theme);
requestAnimationFrame(()=>document.body.classList.add('theme-ready'));
toggle.addEventListener('click',()=>{
 manual=true;const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
 try{localStorage.setItem(themeState.key,next);}catch(e){}
 applyTheme(next);
});
const onSystemChange=event=>{if(!manual)applyTheme(event.matches?'dark':'light');};
if(system.addEventListener)system.addEventListener('change',onSystemChange);else system.addListener(onSystemChange);
function restoreSavedTheme(){
 let saved=null;try{saved=localStorage.getItem(themeState.key);}catch(e){}
 if(themeState.portable){const query=new URLSearchParams(location.search).get('theme');if(query==='light'||query==='dark')saved=query;}
 manual=saved==='light'||saved==='dark';applyTheme(manual?saved:system.matches?'dark':'light');
}
window.addEventListener('storage',event=>{if(event.key===themeState.key||event.key===null)restoreSavedTheme();});
window.addEventListener('pageshow',event=>{if(event.persisted)restoreSavedTheme();});

// Disclosure navigation: non-modal; normal Tab order remains available.
const menuButton=document.querySelector('.menu-toggle');
const menu=document.getElementById('site-nav');
const mobile=matchMedia('(max-width: 800px)');
function closeMenu(restoreFocus=false){menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');if(restoreFocus)menuButton.focus();}
menuButton.hidden=false;
document.body.classList.add('menu-enabled');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menu.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');if(open)menu.querySelector('a').focus();});
menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu(true);}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
const resetMenu=()=>{const focused=menu.contains(document.activeElement);closeMenu(mobile.matches&&focused);};
if(mobile.addEventListener)mobile.addEventListener('change',resetMenu);else mobile.addListener(resetMenu);
// Content stays visible without JS or if IntersectionObserver is unavailable.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal-once');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('main>.editorial').forEach(section=>observer.observe(section));}

if(/^\+?\d{7,15}$/.test(phone)){const headerCall=document.querySelector(".header-contact");headerCall.textContent="Связаться";headerCall.href="tel:"+phone;headerCall.classList.add("available");}
