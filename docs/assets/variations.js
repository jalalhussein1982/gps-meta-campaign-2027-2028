const directions=[
 {id:'editorial',letter:'A',name:'Bold editorial',description:'The original direction: emphatic type, crimson panels and a Prague skyline.'},
 {id:'prague-night',letter:'B',name:'Prague after dark',description:'Atmospheric photography, deep blue and a confident serif voice.'},
 {id:'community',letter:'C',name:'Campus & community',description:'Real student life, a bright background and welcoming typography.'},
 {id:'academic',letter:'D',name:'Academic classic',description:'Formal typography and institutional crimson, with no photography.'}
];
const params=new URLSearchParams(location.search);
let view=['simple','informative','pairs'].includes(params.get('view'))?params.get('view'):'simple';const qr=document.querySelector('#variation-qr');
qr.checked=params.get('qr')!=='0';
function artwork(d,post){
 if(post==='simple'&&qr.checked){
  const stem=`gps-${d.id}-simple-feed-1440x1800-qr`;
  return {preview:`previews/${stem}.jpg`,base:`artwork/${stem}`};
 }
 const noQR=post==='informative'&&!qr.checked,suffix=noQR?'-no-qr':'';
 if(d.id==='editorial'){
  const stem=`gps-${post}-feed-1440x1800${suffix}`;
  return {preview:`previews/${stem}.jpg`,base:`artwork/${stem}`};
 }
 const stem=`gps-${d.id}-${post}-feed-1440x1800${suffix}`;
 return {preview:`previews/${stem}.jpg`,base:`artwork/${stem}`};
}
function update(){
 document.querySelector('#qr-control').hidden=false;
 document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
 const posts=view==='pairs'?['simple','informative']:[view];
 document.querySelector('#choices').innerHTML=directions.map(d=>`<article class="choice ${view==='pairs'?'pair':''}" data-direction="${d.id}"><div class="choice-head"><span class="choice-code">${d.letter}</span><h2>${d.name}</h2></div><p>${d.description}</p><div class="choice-images">${posts.map(post=>{const file=artwork(d,post),label=post==='simple'?'Simple announcement':'Informative post';return `<figure><figcaption>${label}</figcaption><a href="${file.base}.png" target="_blank" aria-label="Open ${d.letter}: ${d.name}, ${label}"><img src="${file.preview}" alt="${d.name}: ${label} for the Master in Geopolitical Studies, 2027–2028"></a><div class="downloads"><a href="${file.base}.png" download>PNG ↓</a><a href="${file.base}.jpg" download>JPEG ↓</a></div></figure>`}).join('')}</div></article>`).join('');
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;update()}));qr.addEventListener('change',update);update();
