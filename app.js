const $ = id => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function content(m){if(m.kind==='video')return `<div class="film-fragment"><img src="${m.poster}" alt="${m.title}"><span class="film-mark">▷</span><small>${m.label}</small></div>`;if(m.kind==='photo')return `<div class="photo"><img src="${m.image}" alt="${m.alt}"><span class="caption">${m.label}</span></div>`;if(m.kind==='ticket')return '<div class="ticket"><span>留存 / A JOURNEY REMEMBERED</span><strong>HERE · HOME</strong><small>ONE WAY / NO. 004</small></div>';if(m.kind==='note')return '<div class="note">“Have you<br>eaten yet?”<small>妈妈的话 / A FAMILIAR VOICE</small></div>';return '<div class="writing">Some things<br>come with me.<small>随身携带的记忆</small></div>';}
memories.forEach((m,i)=>{const b=document.createElement('button');b.className='fragment';b.style.cssText=`--x:${m.x};--y:${m.y};--w:${m.w}px`;b.innerHTML=content(m);b.setAttribute('aria-label',`Open memory: ${m.title}`);b.onclick=()=>openMemory(i);$('fragments').append(b)});
let previousFocus;
function openMemory(i,collection=memories){const m=collection[i];previousFocus=document.activeElement;$('memoryVisual').innerHTML=m.kind==='video'?`<video controls playsinline poster="${m.poster}" preload="metadata" aria-label="${m.title}"><source src="${m.video}" type="video/mp4"><source src="${m.original}" type="video/quicktime"></video><p class="media-error" hidden>This browser cannot play this recording. <a href="${m.original}" download>Download the original video</a>.</p>`:m.kind==='photo'?`<img src="${m.image}" alt="${m.alt}">`:content(m);$('memoryNumber').textContent=m.label;$('memoryTitle').textContent=m.title;$('memoryBody').textContent=m.story;$('memoryDialog').showModal();const video=$('memoryVisual').querySelector('video');if(video){video.addEventListener('play',()=>waveAudio.pause());video.addEventListener('error',()=>{$('memoryVisual').querySelector('.media-error').hidden=false})}}
function closeMemory(){$('memoryDialog').close();previousFocus?.focus()}
$('closeMemory').onclick=closeMemory;$('backMemory').onclick=closeMemory;
$('memoryDialog').addEventListener('click',e=>{if(e.target===$('memoryDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMemory()}});
function showView(name){document.querySelectorAll('.view').forEach(v=>v.hidden=v.id!==name);document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));target=0;window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'})}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>showView(b.dataset.view));document.querySelectorAll('[data-memory]').forEach(b=>b.onclick=()=>openMemory(+b.dataset.memory));$('brand').onclick=()=>showView('archive');
let target=0,current=0,px=0,py=0;const canvas=$('canvas'),fragments=[...document.querySelectorAll('.fragment')];
canvas.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=canvas.getBoundingClientRect();px=(e.clientX-r.left-r.width/2)/(r.width/2);py=(e.clientY-r.top-r.height*.49)/(r.height/2);target=Math.min(1,Math.hypot(px,py)/1.05)});canvas.addEventListener('pointerleave',()=>target=.65);
function animate(){current+=(target-current)*.025;fragments.forEach((el,i)=>{const m=memories[i],d=reduced.matches?0:current;const scale=innerWidth<850?.4:1;const dx=(m.x-50)*d*1.4*scale,dy=(m.y-49)*d*1.3*scale;el.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${m.r+d*m.r*.32}deg)`;const focused=el.matches(':hover,:focus-visible');el.style.opacity=focused?1:1-d*(i%2?.42:.25);el.style.filter=focused?'none':`blur(${d*(i%3===0?1.7:.35)}px)`});requestAnimationFrame(animate)}animate();
$('intro').showModal();$('aboutIntro').showModal();$('enter').onclick=()=>{if(reduced.matches){$('intro').close();return}$('intro').style.opacity=0;setTimeout(()=>$('intro').close(),700)};
try{$('response').value=localStorage.getItem('home-from-here-response')||''}catch{}
$('reflectionForm').onsubmit=e=>{e.preventDefault();if(!$('response').value.trim()){$('saveStatus').textContent='Leave a few words to keep.';return}try{localStorage.setItem('home-from-here-response',$('response').value);$('saveStatus').textContent='Your memory is kept here, in this browser.'}catch{$('saveStatus').textContent='This browser cannot save right now. Your words are still here until you leave.'}};

// Real hometown sound; playback starts only on an explicit click.
const waveAudio=$('waveAudio'),waveToggle=$('waveToggle');
function syncWaves(){waveToggle.setAttribute('aria-pressed',String(!waveAudio.paused));waveToggle.textContent=waveAudio.paused?'Listen to home · 海浪声':'Pause the waves · 暂停';}
waveToggle.onclick=async()=>{if(waveAudio.paused){document.querySelectorAll('video').forEach(v=>v.pause());try{await waveAudio.play()}catch{$('audioStatus').textContent='Unable to play the recording in this browser.'}}else waveAudio.pause();};
waveAudio.addEventListener('play',syncWaves);waveAudio.addEventListener('pause',syncWaves);
$('memoryDialog').addEventListener('close',()=>{document.querySelectorAll('#memoryVisual video').forEach(v=>v.pause())});
document.addEventListener('visibilitychange',()=>{if(document.hidden){waveAudio.pause();document.querySelectorAll('video').forEach(v=>v.pause())}});

personalMemories.forEach((m,i)=>{const b=document.createElement('button');b.className='personal-photo';b.style.setProperty('--tilt',`${[-5,4,-2,6,-4,3][i%6]}deg`);b.innerHTML=content(m);b.setAttribute('aria-label',`Open personal memory: ${m.title}`);b.onclick=()=>openMemory(i,personalMemories);$('personalCollage').append(b)});
$('enlargeMap').onclick=()=>$('mapDialog').showModal();$('closeMap').onclick=()=>$('mapDialog').close();
// Haversine, approximate town/city centers. Geographic positions do not represent a flight route.
const rad=v=>v*Math.PI/180;
const lat1=rad(29.20622),lat2=rad(40.7128),dlat=lat2-lat1,dlon=rad(-74.006-121.92718);
const hav=Math.sin(dlat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2;
const totalDistance=6371*2*Math.atan2(Math.sqrt(hav),Math.sqrt(1-hav));
function updateJourney(){const fraction=Number($('journeyRange').value)/1000;const km=Math.round(totalDistance*fraction/10)*10;$('journeyDistance').textContent=`${km.toLocaleString('en-US')} km from home`;$('journeyRange').setAttribute('aria-valuetext',`${km} kilometers from Shipu, ${Math.round(fraction*100)} percent of the way toward New York`);$('journeyRange').style.setProperty('--progress',`${fraction*100}%`);}
$('journeyRange').addEventListener('input',updateJourney);updateJourney();

// A personal note overlays the opening title. Clicking its backdrop reveals the title.
let dismissingAbout=false;
function dismissAbout(){if(dismissingAbout)return;dismissingAbout=true;const about=$('aboutIntro');about.classList.add('leaving');setTimeout(()=>{about.close();$('enter').focus()},reduced.matches?0:650)}
$('dismissAbout').onclick=dismissAbout;
$('aboutIntro').addEventListener('click',e=>{if(e.target!==$('aboutIntro'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismissAbout()});
$('aboutIntro').addEventListener('cancel',e=>{e.preventDefault();dismissAbout()});
