(function(){
  var burger=document.querySelector('.burger'),menu=document.querySelector('.menu');
  if(burger){burger.addEventListener('click',function(){
    var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);
  });}
  var top=document.querySelector('.top');
  if(top){
    window.addEventListener('scroll',function(){top.classList.toggle('show',window.scrollY>500)},{passive:true});
    top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  }
  // Accordion: only one open
  var ds=document.querySelectorAll('.faq details');
  ds.forEach(function(d){d.addEventListener('toggle',function(){
    if(d.open)ds.forEach(function(o){if(o!==d)o.open=false});
  })});
  // Carousel
  var c=document.querySelector('.carousel');
  if(c){
    var sl=c.querySelectorAll('.slide'),dots=c.querySelector('.dots'),i=0,t;
    sl.forEach(function(_,n){
      var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Reseña '+(n+1));
      b.addEventListener('click',function(){go(n);restart()});dots.appendChild(b);
    });
    function go(n){i=n;sl.forEach(function(s,k){s.classList.toggle('active',k===n)});
      dots.querySelectorAll('button').forEach(function(b,k){b.setAttribute('aria-current',k===n)})}
    function restart(){clearInterval(t);t=setInterval(function(){go((i+1)%sl.length)},7000)}
    go(0);restart();
  }
  // Form validation
  var f=document.querySelector('form.validate');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    f.querySelectorAll('[required]').forEach(function(el){
      var field=el.closest('.field')||el.closest('.check');
      var bad=!el.value.trim()||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value))||(el.type==='checkbox'&&!el.checked);
      if(field)field.classList.toggle('invalid',bad);
      if(bad)ok=false;
    });
    if(ok){f.querySelector('.form-ok').style.display='block';f.reset();}
  });}
})();
