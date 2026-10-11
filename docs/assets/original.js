let format='feed';
const qr=document.querySelector('#qr'),safe=document.querySelector('#safe');
function update(){
 const height=format==='story'?2560:1800;
 document.querySelector('#safe-label').hidden=format!=='story';
 document.querySelectorAll('[data-format]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.format===format)));
 document.querySelectorAll('[data-post]').forEach(article=>{
  const post=article.dataset.post,noQR=post==='informative'&&!qr.checked;
  const stem=`gps-${post}-${format}-1440x${height}${noQR?'-no-qr':''}`;
  const base=`artwork/${stem}`;
  article.querySelector('.art').src=`previews/${stem}.jpg`;
  article.querySelector('.art-link').href=base+'.png';
  article.querySelector('.png').href=base+'.png';
  article.querySelector('.jpg').href=base+'.jpg';
  article.querySelector('.size').textContent=`1440 × ${height}`;
  article.querySelector('.safe-guide').hidden=!(format==='story'&&safe.checked);
 });
}
document.querySelectorAll('[data-format]').forEach(b=>b.addEventListener('click',()=>{format=b.dataset.format;update()}));
qr.addEventListener('change',update);safe.addEventListener('change',update);update();
