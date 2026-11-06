(function(){
  var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  root.classList.add('js');

  // reveal on scroll
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
    })},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // scroll progress (throttled)
  var bar=document.getElementById('bar'),tick=false;
  function upd(){tick=false;var m=root.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')'}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});

  // blue bubbles on hover / click
  function pop(el,n,big){
    if(reduce||el.querySelectorAll('.bub').length>12)return;
    for(var i=0;i<n;i++){
      var b=document.createElement('i'),s=6+Math.random()*(big?20:12);
      b.className='bub';
      b.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(8+Math.random()*84)+'%;--dx:'+((Math.random()-.5)*(big?110:40))+'px;--r:'+((el.closest('nav')?22:44)+Math.random()*(big?60:40))+'px;--t:'+(1+Math.random())+'s';
      b.addEventListener('animationend',function(){this.remove()});
      el.appendChild(b);
    }
  }
  document.querySelectorAll('[data-bub]').forEach(function(el){
    var iv=0;function stop(){clearInterval(iv);iv=0}
    el.addEventListener('pointerenter',function(){pop(el,3);stop();iv=setInterval(function(){pop(el,1)},300)});
    el.addEventListener('pointerleave',stop);el.addEventListener('pointercancel',stop);
    el.addEventListener('click',function(){pop(el,10,true)});
  });
})();
