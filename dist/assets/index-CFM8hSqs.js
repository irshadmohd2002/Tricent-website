var Hm=Object.defineProperty;var Vm=(r,t,e)=>t in r?Hm(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var wt=(r,t,e)=>Vm(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();var Ih="1.3.25";function Ed(r,t,e){return Math.max(r,Math.min(t,e))}function Gm(r,t,e){return(1-e)*r+e*t}function Wm(r,t,e,n){return Gm(r,t,1-Math.exp(-e*n))}function Xm(r,t){return(r%t+t)%t}var Ym=class{constructor(){wt(this,"isRunning",!1);wt(this,"value",0);wt(this,"from",0);wt(this,"to",0);wt(this,"currentTime",0);wt(this,"lerp");wt(this,"duration");wt(this,"easing");wt(this,"onUpdate")}advance(r){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Ed(0,this.currentTime/this.duration,1);t=n>=1;const i=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Wm(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function qm(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,n)},t)}}var $m=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){wt(this,"width",0);wt(this,"height",0);wt(this,"scrollHeight",0);wt(this,"scrollWidth",0);wt(this,"debouncedResize");wt(this,"wrapperResizeObserver");wt(this,"contentResizeObserver");wt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});wt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});wt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=qm(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Td=class{constructor(){wt(this,"events",{})}emit(r,...t){var n;const e=this.events[r]||[];for(let i=0,s=e.length;i<s;i++)(n=e[i])==null||n.call(e,...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}}off(r,t){var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}};const Km=100/6,Xi={passive:!1};function Uh(r,t){return r===1?Km:r===2?t:1}var Zm=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){wt(this,"touchStart",{x:0,y:0});wt(this,"lastDelta",{x:0,y:0});wt(this,"window",{width:0,height:0});wt(this,"emitter",new Td);wt(this,"onTouchStart",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});wt(this,"onTouchMove",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});wt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});wt(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=Uh(n,this.window.width),s=Uh(n,this.window.height);t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});wt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Xi),this.element.addEventListener("touchstart",this.onTouchStart,Xi),this.element.addEventListener("touchmove",this.onTouchMove,Xi),this.element.addEventListener("touchend",this.onTouchEnd,Xi)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Xi),this.element.removeEventListener("touchstart",this.onTouchStart,Xi),this.element.removeEventListener("touchmove",this.onTouchMove,Xi),this.element.removeEventListener("touchend",this.onTouchEnd,Xi)}};const Nh=r=>Math.min(1,1.001-2**(-10*r));var Jm=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:m=1,autoResize:g=!0,prevent:p,virtualScroll:_,overscroll:S=!0,autoRaf:x=!1,anchors:M=!1,autoToggle:A=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:y=!1,naiveDimensions:R=y,stopInertiaOnNavigate:D=!1}={}){wt(this,"_isScrolling",!1);wt(this,"_isStopped",!1);wt(this,"_isLocked",!1);wt(this,"_preventNextNativeScrollEvent",!1);wt(this,"_resetVelocityTimeout",null);wt(this,"_rafId",null);wt(this,"_isDraggingSelection",!1);wt(this,"isTouching");wt(this,"isIos");wt(this,"time",0);wt(this,"userData",{});wt(this,"lastVelocity",0);wt(this,"velocity",0);wt(this,"direction",0);wt(this,"options");wt(this,"targetScroll");wt(this,"animatedScroll");wt(this,"animate",new Ym);wt(this,"emitter",new Td);wt(this,"dimensions");wt(this,"virtualScroll");wt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});wt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});wt(this,"onTransitionEnd",r=>{var t;(t=r.propertyName)!=null&&t.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});wt(this,"onClick",r=>{const t=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});wt(this,"onPointerDown",r=>{r.button===1&&this.reset()});wt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(m=>{var g,p,_,S,x;return m instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(m))||((g=m.hasAttribute)==null?void 0:g.call(m,"data-lenis-prevent"))||u==="vertical"&&((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent-vertical"))||u==="horizontal"&&((_=m.hasAttribute)==null?void 0:_.call(m,"data-lenis-prevent-horizontal"))||i&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,f=i&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});wt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});wt(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Ih,window.lenis||(window.lenis={}),window.lenis.version=Ih,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Nh:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:m,autoResize:g,prevent:p,virtualScroll:_,overscroll:S,autoRaf:x,anchors:M,autoToggle:A,allowNestedScroll:w,naiveDimensions:R,stopInertiaOnNavigate:D},this.dimensions=new $m(r,t,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Zm(e,{touchMultiplier:f,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-s.right,e.clientY-s.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if((this.isStopped||this.isLocked)&&!u)return;let h=r,f=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let m=null;if(typeof h=="string"?(m=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),m||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(m=h),m){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?M.left:M.top}const g=m.getBoundingClientRect(),p=getComputedStyle(m),_=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),S=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);h=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(_)?0:_)-(Number.isNaN(x)?0:x)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const m=h-this.animatedScroll;m>this.limit/2?h-=this.limit:m<-this.limit/2&&(h+=this.limit)}}else h=Ed(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=Nh:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(m,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),i&&(this.targetScroll=m),g||this.emit(),g&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,o,a,l,c,u,d,h,f,m;if(n-(i.time??0)>2e3){i.time=Date.now();const w=window.getComputedStyle(r);if(i.computedStyle=w,s=["auto","overlay","scroll"].includes(w.overflowX),o=["auto","overlay","scroll"].includes(w.overflowY),c=["auto"].includes(w.overscrollBehaviorX),u=["auto"].includes(w.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;d=r.scrollWidth,h=r.scrollHeight,f=r.clientWidth,m=r.clientHeight,a=d>f,l=h>m,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=h,i.clientWidth=f,i.clientHeight=m,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=u}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,h=i.scrollHeight,f=i.clientWidth,m=i.clientHeight,c=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const g=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let p,_,S,x,M,A;if(g==="horizontal")p=Math.round(r.scrollLeft),_=d-f,S=t,x=s,M=a,A=c;else if(g==="vertical")p=Math.round(r.scrollTop),_=h-m,S=e,x=o,M=l,A=u;else return!1;return!A&&(p>=_||p<=0)?!0:(S>0?p<_:p>0)&&x&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Xm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function Ii(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function bd(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Yn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},No={duration:.5,overwrite:!1,delay:0},zu,ln,Re,ei=1e8,Ee=1/ei,wc=Math.PI*2,jm=wc/4,Qm=0,wd=Math.sqrt,t_=Math.cos,e_=Math.sin,rn=function(t){return typeof t=="string"},Ne=function(t){return typeof t=="function"},Hi=function(t){return typeof t=="number"},ku=function(t){return typeof t>"u"},Ei=function(t){return typeof t=="object"},wn=function(t){return t!==!1},Hu=function(){return typeof window<"u"},ea=function(t){return Ne(t)||rn(t)},Ad=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},mn=Array.isArray,n_=/random\([^)]+\)/g,i_=/,\s*/g,Oh=/(?:-?\.?\d|\.)+/gi,Cd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ts=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ll=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Rd=/[+-]=-?[.\d]+/,r_=/[^,'"\[\]\s]+/gi,s_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,De,mi,Ac,Vu,qn={},tl={},Pd,Ld=function(t){return(tl=Bs(t,qn))&&Dn},Gu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Oo=function(t,e){return!e&&console.warn(t)},Dd=function(t,e){return t&&(qn[t]=e)&&tl&&(tl[t]=e)||qn},Fo=function(){return 0},o_={suppressEvents:!0,isStart:!0,kill:!1},Ba={suppressEvents:!0,kill:!1},a_={suppressEvents:!0},Wu={},sr=[],Cc={},Id,kn={},Dl={},Fh=30,za=[],Xu="",Yu=function(t){var e=t[0],n,i;if(Ei(e)||Ne(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=za.length;i--&&!za[i].targetTest(e););n=za[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new ep(t[i],n)))||t.splice(i,1);return t},Hr=function(t){return t._gsap||Yu(ni(t))[0]._gsap},Ud=function(t,e,n){return(n=t[e])&&Ne(n)?t[e]():ku(n)&&t.getAttribute&&t.getAttribute(e)||n},An=function(t,e){return(t=t.split(",")).forEach(e)||t},ke=function(t){return Math.round(t*1e5)/1e5||0},Le=function(t){return Math.round(t*1e7)/1e7||0},Cs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},l_=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},el=function(){var t=sr.length,e=sr.slice(0),n,i;for(Cc={},sr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},qu=function(t){return!!(t._initted||t._startAt||t.add)},Nd=function(t,e,n,i){sr.length&&!ln&&el(),t.render(e,n,!!(ln&&e<0&&qu(t))),sr.length&&!ln&&el()},Od=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(r_).length<2?e:rn(t)?t.trim():t},Fd=function(t){return t},$n=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},c_=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Bs=function(t,e){for(var n in e)t[n]=e[n];return t},Bh=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ei(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},nl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},xo=function(t){var e=t.parent||De,n=t.keyframes?c_(mn(t.keyframes)):$n;if(wn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},u_=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Bd=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},gl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},hr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Vr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},h_=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Rc=function(t,e,n,i){return t._startAt&&(ln?t._startAt.revert(Ba):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},f_=function r(t){return!t||t._ts&&r(t.parent)},zh=function(t){return t._repeat?zs(t._tTime,t=t.duration()+t._rDelay)*t:0},zs=function(t,e){var n=Math.floor(t=Le(t/e));return t&&n===t?n-1:n},il=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},vl=function(t){return t._end=Le(t._start+(t._tDur/Math.abs(t._ts||t._rts||Ee)||0))},xl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Le(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),vl(t),n._dirty||Vr(n,t)),t},zd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=il(t.rawTime(),e),(!e._dur||Ko(0,e.totalDuration(),n)-e._tTime>Ee)&&e.render(n,!0)),Vr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Ee}},xi=function(t,e,n,i){return e.parent&&hr(e),e._start=Le((Hi(n)?n:n||t!==De?Jn(t,n,e):t._time)+e._delay),e._end=Le(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Bd(t,e,"_first","_last",t._sort?"_start":0),Pc(e)||(t._recent=e),i||zd(t,e),t._ts<0&&xl(t,t._tTime),t},kd=function(t,e){return(qn.ScrollTrigger||Gu("scrollTrigger",e))&&qn.ScrollTrigger.create(e,t)},Hd=function(t,e,n,i,s){if(Ku(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!ln&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Id!==Vn.frame)return sr.push(t),t._lazy=[s,i],1},d_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Pc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},p_=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&d_(t)&&!(!t._initted&&Pc(t))||(t._ts<0||t._dp._ts<0)&&!Pc(t))?0:1,a=t._rDelay,l=0,c,u,d;if(a&&t._repeat&&(l=Ko(0,t._tDur,e),u=zs(l,a),t._yoyo&&u&1&&(o=1-o),u!==zs(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||ln||i||t._zTime===Ee||!e&&t._zTime){if(!t._initted&&Hd(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?Ee:0),n||(n=e&&!d),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Rc(t,e,n,!0),t._onUpdate&&!n&&Wn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Wn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&hr(t,1),!n&&!ln&&(Wn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},m_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},ks=function(t,e,n,i){var s=t._repeat,o=Le(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Le(o*(s+1)+t._rDelay*s):o,a>0&&!i&&xl(t,t._tTime=t._tDur*a),t.parent&&vl(t),n||Vr(t.parent,t),t},kh=function(t){return t instanceof bn?Vr(t):ks(t,t._dur)},__={_start:0,endTime:Fo,totalDuration:Fo},Jn=function r(t,e,n){var i=t.labels,s=t._recent||__,o=t.duration()>=ei?s.endTime(!1):t._dur,a,l,c;return rn(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(mn(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},So=function(t,e,n){var i=Hi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=wn(l.vars.inherit)&&l.parent;o.immediateRender=wn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new We(e[0],o,e[s+1])},gr=function(t,e){return t||t===0?e(t):e},Ko=function(t,e,n){return n<t?t:n>e?e:n},dn=function(t,e){return!rn(t)||!(e=s_.exec(t))?"":e[1]},g_=function(t,e,n){return gr(n,function(i){return Ko(t,e,i)})},Lc=[].slice,Vd=function(t,e){return t&&Ei(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ei(t[0]))&&!t.nodeType&&t!==mi},v_=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return rn(i)&&!e||Vd(i,1)?(s=n).push.apply(s,ni(i)):n.push(i)})||n},ni=function(t,e,n){return Re&&!e&&Re.selector?Re.selector(t):rn(t)&&!n&&(Ac||!Hs())?Lc.call((e||Vu).querySelectorAll(t),0):mn(t)?v_(t,n):Vd(t)?Lc.call(t,0):t?[t]:[]},Dc=function(t){return t=ni(t)[0]||Oo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return ni(e,n.querySelectorAll?n:n===t?Oo("Invalid scope")||Vu.createElement("div"):t)}},Gd=function(t){return t.sort(function(){return .5-Math.random()})},Wd=function(t){if(Ne(t))return t;var e=Ei(t)?t:{each:t},n=Gr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,u=i,d=i;return rn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(h,f,m){var g=(m||e).length,p=o[g],_,S,x,M,A,w,y,R,D;if(!p){if(D=e.grid==="auto"?0:(e.grid||[1,ei])[1],!D){for(y=-ei;y<(y=m[D++].getBoundingClientRect().left)&&D<g;);D<g&&D--}for(p=o[g]=[],_=l?Math.min(D,g)*u-.5:i%D,S=D===ei?0:l?g*d/D-.5:i/D|0,y=0,R=ei,w=0;w<g;w++)x=w%D-_,M=S-(w/D|0),p[w]=A=c?Math.abs(c==="y"?M:x):wd(x*x+M*M),A>y&&(y=A),A<R&&(R=A);i==="random"&&Gd(p),p.max=y-R,p.min=R,p.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(D>g?g-1:c?c==="y"?g/D:D:Math.max(D,g/D))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=dn(e.amount||e.each)||0,n=n&&g<0?L_(n):n}return g=(p[h]-p.min)/p.max||0,Le(p.b+(n?n(g):g)*p.v)+p.u}},Ic=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Le(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Hi(n)?0:dn(n))}},Xd=function(t,e){var n=mn(t),i,s;return!n&&Ei(t)&&(i=n=t.radius||ei,t.values?(t=ni(t.values),(s=!Hi(t[0]))&&(i*=i)):t=Ic(t.increment)),gr(e,n?Ne(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=ei,u=0,d=t.length,h,f;d--;)s?(h=t[d].x-a,f=t[d].y-l,h=h*h+f*f):h=Math.abs(t[d]-a),h<c&&(c=h,u=d);return u=!i||c<=i?t[u]:o,s||u===o||Hi(o)?u:u+dn(o)}:Ic(t))},Yd=function(t,e,n,i){return gr(mn(t)?!e:n===!0?!!(n=0):!i,function(){return mn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},x_=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},S_=function(t,e){return function(n){return t(parseFloat(n))+(e||dn(n))}},M_=function(t,e,n){return $d(t,e,0,1,n)},qd=function(t,e,n){return gr(n,function(i){return t[~~e(i)]})},y_=function r(t,e,n){var i=e-t;return mn(t)?qd(t,r(0,t.length),e):gr(n,function(s){return(i+(s-t)%i)%i+t})},E_=function r(t,e,n){var i=e-t,s=i*2;return mn(t)?qd(t,r(0,t.length-1),e):gr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Bo=function(t){return t.replace(n_,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(i_);return Yd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},$d=function(t,e,n,i,s){var o=e-t,a=i-n;return gr(s,function(l){return n+((l-t)/o*a||0)})},T_=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var o=rn(t),a={},l,c,u,d,h;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(mn(t)&&!mn(e)){for(u=[],d=t.length,h=d-2,c=1;c<d;c++)u.push(r(t[c-1],t[c]));d--,s=function(m){m*=d;var g=Math.min(h,~~m);return u[g](m-g)},n=e}else i||(t=Bs(mn(t)?[]:{},t));if(!u){for(l in e)$u.call(a,t,l,"get",e[l]);s=function(m){return ju(m,a)||(o?t.p:t)}}}return gr(n,s)},Hh=function(t,e,n){var i=t.labels,s=ei,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Wn=function(t,e,n){var i=t.vars,s=i[e],o=Re,a=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&sr.length&&el(),a&&(Re=a),u=l?s.apply(c,l):s.call(c),Re=o,u},uo=function(t){return hr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!ln),t.progress()<1&&Wn(t,"onInterrupt"),t},bs,Kd=[],Zd=function(t){if(t)if(t=!t.name&&t.default||t,Hu()||t.headless){var e=t.name,n=Ne(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Fo,render:ju,add:$u,kill:H_,modifier:k_,rawVars:0},o={targetTest:0,get:0,getSetter:Ju,aliases:{},register:0};if(Hs(),t!==i){if(kn[e])return;$n(i,$n(nl(t,s),o)),Bs(i.prototype,Bs(s,nl(t,o))),kn[i.prop=e]=i,t.targetTest&&(za.push(i),Wu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Dd(e,i),t.register&&t.register(Dn,i,Cn)}else Kd.push(t)},ye=255,ho={aqua:[0,ye,ye],lime:[0,ye,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ye],navy:[0,0,128],white:[ye,ye,ye],olive:[128,128,0],yellow:[ye,ye,0],orange:[ye,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ye,0,0],pink:[ye,192,203],cyan:[0,ye,ye],transparent:[ye,ye,ye,0]},Il=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ye+.5|0},Jd=function(t,e,n){var i=t?Hi(t)?[t>>16,t>>8&ye,t&ye]:0:ho.black,s,o,a,l,c,u,d,h,f,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ho[t])i=ho[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ye,i&ye,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ye,t&ye]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(Oh),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Il(l+1/3,s,o),i[1]=Il(l,s,o),i[2]=Il(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Cd),n&&i.length<4&&(i[3]=1),i}else i=t.match(Oh)||ho.transparent;i=i.map(Number)}return e&&!m&&(s=i[0]/ye,o=i[1]/ye,a=i[2]/ye,d=Math.max(s,o,a),h=Math.min(s,o,a),u=(d+h)/2,d===h?l=c=0:(f=d-h,c=u>.5?f/(2-d-h):f/(d+h),l=d===s?(o-a)/f+(o<a?6:0):d===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},jd=function(t){var e=[],n=[],i=-1;return t.split(or).forEach(function(s){var o=s.match(Ts)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Vh=function(t,e,n){var i="",s=(t+i).match(or),o=e?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return t;if(s=s.map(function(h){return(h=Jd(h,e,1))&&o+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=jd(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(or,"1").split(Ts),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(or),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},or=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ho)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),b_=/hsl[a]?\(/,Qd=function(t){var e=t.join(" "),n;if(or.lastIndex=0,or.test(e))return n=b_.test(e),t[1]=Vh(t[1],n),t[0]=Vh(t[0],n,jd(t[1])),!0},zo,Vn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,h,f,m=function g(p){var _=r()-i,S=p===!0,x,M,A,w;if((_>t||_<0)&&(n+=_-e),i+=_,A=i-n,x=A-o,(x>0||S)&&(w=++d.frame,h=A-d.time*1e3,d.time=A=A/1e3,o+=x+(x>=s?4:s-x),M=1),S||(l=c(g)),M)for(f=0;f<a.length;f++)a[f](A,h,w,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return h/(1e3/(p||60))},wake:function(){Pd&&(!Ac&&Hu()&&(mi=Ac=window,Vu=mi.document||{},qn.gsap=Dn,(mi.gsapVersions||(mi.gsapVersions=[])).push(Dn.version),Ld(tl||mi.GreenSockGlobals||!mi.gsap&&mi||{}),Kd.forEach(Zd)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(p){return setTimeout(p,o-d.time*1e3+1|0)},zo=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),zo=0,c=Fo},lagSmoothing:function(p,_){t=p||1/0,e=Math.min(_||33,t)},fps:function(p){s=1e3/(p||240),o=d.time*1e3+s},add:function(p,_,S){var x=_?function(M,A,w,y){p(M,A,w,y),d.remove(x)}:p;return d.remove(p),a[S?"unshift":"push"](x),Hs(),x},remove:function(p,_){~(_=a.indexOf(p))&&a.splice(_,1)&&f>=_&&f--},_listeners:a},d}(),Hs=function(){return!zo&&Vn.wake()},ce={},w_=/^[\d.\-M][\d.\-,\s]/,A_=/["']/g,C_=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(A_,"").trim():+c,i=l.substr(a+1).trim();return e},R_=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},P_=function(t){var e=(t+"").split("("),n=ce[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[C_(e[1])]:R_(t).split(",").map(Od)):ce._CE&&w_.test(t)?ce._CE("",t):n},L_=function(t){return function(e){return 1-t(1-e)}},Gr=function(t,e){return t&&(Ne(t)?t:ce[t]||P_(t))||e},ts=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return An(t,function(a){ce[a]=qn[a]=s,ce[o=a.toLowerCase()]=n;for(var l in s)ce[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ce[a+"."+l]=s[l]}),s},tp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Ul=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/wc*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*e_((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:tp(a);return s=wc/s,l.config=function(c,u){return r(t,c,u)},l},Nl=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:tp(n);return i.config=function(s){return r(t,s)},i};An("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;ts(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ce.Linear.easeNone=ce.none=ce.Linear.easeIn;ts("Elastic",Ul("in"),Ul("out"),Ul());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};ts("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ts("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ts("Circ",function(r){return-(wd(1-r*r)-1)});ts("Sine",function(r){return r===1?1:-t_(r*jm)+1});ts("Back",Nl("in"),Nl("out"),Nl());ce.SteppedEase=ce.steps=qn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Ee;return function(a){return((i*Ko(0,o,a)|0)+s)*n}}};No.ease=ce["quad.out"];An("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Xu+=r+","+r+"Params,"});var ep=function(t,e){this.id=Qm++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Ud,this.set=e?e.getSetter:Ju},ko=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ks(this,+e.duration,1,1),this.data=e.data,Re&&(this._ctx=Re,Re.data.push(this)),zo||Vn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ks(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Hs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(xl(this,n),!s._dp||s.parent||zd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&xi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Ee||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Nd(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+zh(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+zh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?zs(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Ee?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?il(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ee?0:this._rts,this.totalTime(Ko(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),vl(this),h_(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Hs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ee&&(this._tTime-=Ee)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Le(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&xi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(wn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?il(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=a_);var i=ln;return ln=n,qu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),ln=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,kh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,kh(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Jn(this,n),wn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,wn(i)),this._dur||(this._zTime=-Ee),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ee:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ee,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Ee)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=Ne(n)?n:Fd,l=function(){var u=i.then;i.then=null,s&&s(),Ne(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){uo(this)},r}();$n(ko.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ee,_prom:0,_ps:!1,_rts:1});var bn=function(r){bd(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=wn(n.sortChildren),De&&xi(n.parent||De,Ii(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&kd(Ii(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return So(0,arguments,this),this},e.from=function(i,s,o){return So(1,arguments,this),this},e.fromTo=function(i,s,o,a){return So(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,xo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new We(i,s,Jn(this,o),1),this},e.call=function(i,s,o){return xi(this,We.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new We(i,o,Jn(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,xo(o).immediateRender=wn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},e.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,xo(a).immediateRender=wn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Le(i),d=this._zTime<0!=i<0&&(this._initted||!c),h,f,m,g,p,_,S,x,M,A,w,y;if(this!==De&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),h=u,M=this._start,x=this._ts,_=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(h=Le(u%p),u===l?(g=this._repeat,h=c):(A=Le(u/p),g=~~A,g&&g===A&&(h=c,g--),h>c&&(h=c)),A=zs(this._tTime,p),!a&&this._tTime&&A!==g&&this._tTime-A*p-this._dur<=0&&(A=g),w&&g&1&&(h=c-h,y=1),g!==A&&!this._lock){var R=w&&A&1,D=R===(w&&g&1);if(g<A&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(y?0:Le(g*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Wn(this,"onRepeat"),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,A=g),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,D&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!_)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=m_(this,Le(a),Le(h)),S&&(u-=h-(h=S._start))),this._tTime=u,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&c&&!s&&!A&&(Wn(this,"onStart"),this._tTime!==u))return this;if(h>=a&&i>=0)for(f=this._first;f;){if(m=f._next,(f._act||h>=f._start)&&f._ts&&S!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,o),h!==this._time||!this._ts&&!_){S=0,m&&(u+=this._zTime=-Ee);break}}f=m}else{f=this._last;for(var v=i<0?i:h;f;){if(m=f._prev,(f._act||v<=f._end)&&f._ts&&S!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(v-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(v-f._start)*f._ts,s,o||ln&&qu(f)),h!==this._time||!this._ts&&!_){S=0,m&&(u+=this._zTime=v?-Ee:Ee);break}}f=m}}if(S&&!s&&(this.pause(),S.render(h>=a?0:-Ee)._zTime=h>=a?1:-1,this._ts))return this._start=M,vl(this),this.render(i,s,o);this._onUpdate&&!s&&Wn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(M===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&hr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Wn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Hi(s)||(s=Jn(this,s,i)),!(i instanceof ko)){if(mn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(rn(i))return this.addLabel(i,s);if(Ne(i))i=We.delayedCall(0,i);else return this}return this!==i?xi(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ei);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof We?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return rn(i)?this.removeLabel(i):Ne(i)?this.killTweensOf(i):(i.parent===this&&gl(this,i),i===this._recent&&(this._recent=this._last),Vr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Le(Vn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Jn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=We.delayedCall(0,s||Fo,o);return a.data="isPause",this._hasPause=1,xi(this,a,Jn(this,i))},e.removePause=function(i){var s=this._first;for(i=Jn(this,i);s;)s._start===i&&s.data==="isPause"&&hr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)tr!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=ni(i),l=this._first,c=Hi(s),u;l;)l instanceof We?l_(l._targets,a)&&(c?(!tr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Jn(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,h=l.immediateRender,f,m=We.to(o,$n({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ee,onStart:function(){if(o.pause(),!f){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());m._dur!==p&&ks(m,p,0,1).render(m._time,!0,!0),f=1}u&&u.apply(m,d||[])}},s));return h?m.render(0):m},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,$n({startAt:{time:Jn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Hh(this,Jn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Hh(this,Jn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Ee)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Le(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Vr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Vr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=ei,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,xi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=Le(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ks(o,o===De&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(De._ts&&(Nd(De,il(i,De)),Id=Vn.frame),Vn.frame>=Fh){Fh+=Yn.autoSleep||120;var s=De._first;if((!s||!s._ts)&&Yn.autoSleep&&Vn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Vn.sleep()}}},t}(ko);$n(bn.prototype,{_lock:0,_hasPause:0,_forcing:0});var D_=function(t,e,n,i,s,o,a){var l=new Cn(this._pt,t,e,0,1,ap,null,s),c=0,u=0,d,h,f,m,g,p,_,S;for(l.b=n,l.e=i,n+="",i+="",(_=~i.indexOf("random("))&&(i=Bo(i)),o&&(S=[n,i],o(S,t,e),n=S[0],i=S[1]),h=n.match(Ll)||[];d=Ll.exec(i);)m=d[0],g=i.substring(c,d.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),m!==h[u++]&&(p=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:p,c:m.charAt(1)==="="?Cs(p,m)-p:parseFloat(m)-p,m:f&&f<4?Math.round:0},c=Ll.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Rd.test(i)||_)&&(l.e=0),this._pt=l,l},$u=function(t,e,n,i,s,o,a,l,c,u){Ne(i)&&(i=i(s||0,t,o));var d=t[e],h=n!=="get"?n:Ne(d)?c?t[e.indexOf("set")||!Ne(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=Ne(d)?c?F_:sp:Zu,m;if(rn(i)&&(~i.indexOf("random(")&&(i=Bo(i)),i.charAt(1)==="="&&(m=Cs(h,i)+(dn(h)||0),(m||m===0)&&(i=m))),!u||h!==i||Uc)return!isNaN(h*i)&&i!==""?(m=new Cn(this._pt,t,e,+h||0,i-(h||0),typeof d=="boolean"?z_:op,0,f),c&&(m.fp=c),a&&m.modifier(a,this,t),this._pt=m):(!d&&!(e in t)&&Gu(e,i),D_.call(this,t,e,h,i,f,l||Yn.stringFilter,c))},I_=function(t,e,n,i,s){if(Ne(t)&&(t=Mo(t,s,e,n,i)),!Ei(t)||t.style&&t.nodeType||mn(t)||Ad(t))return rn(t)?Mo(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Mo(t[a],s,e,n,i);return o},np=function(t,e,n,i,s,o){var a,l,c,u;if(kn[t]&&(a=new kn[t]).init(s,a.rawVars?e[t]:I_(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Cn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==bs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},tr,Uc,Ku=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,h=i.keyframes,f=i.autoRevert,m=t._dur,g=t._startAt,p=t._targets,_=t.parent,S=_&&_.data==="nested"?_.vars.targets:p,x=t._overwrite==="auto"&&!zu,M=t.timeline,A=i.easeReverse||d,w,y,R,D,v,T,I,z,H,q,k,Y,W;if(M&&(!h||!s)&&(s="none"),t._ease=Gr(s,No.ease),t._rEase=A&&(Gr(A)||t._ease),t._from=!M&&!!i.runBackwards,t._from&&(t.ratio=1),!M||h&&!i.stagger){if(z=p[0]?Hr(p[0]).harness:0,Y=z&&i[z.prop],w=nl(i,Wu),g&&(g._zTime<0&&g.progress(1),e<0&&u&&a&&!f?g.render(-1,!0):g.revert(u&&m?Ba:o_),g._lazy=0),o){if(hr(t._startAt=We.set(p,$n({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!g&&wn(l),startAt:null,delay:0,onUpdate:c&&function(){return Wn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(ln||!a&&!f)&&t._startAt.revert(Ba),a&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&m&&!g){if(e&&(a=!1),R=$n({overwrite:!1,data:"isFromStart",lazy:a&&!g&&wn(l),immediateRender:a,stagger:0,parent:_},w),Y&&(R[z.prop]=Y),hr(t._startAt=We.set(p,R)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(ln?t._startAt.revert(Ba):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Ee,Ee);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&wn(l)||l&&!m,y=0;y<p.length;y++){if(v=p[y],I=v._gsap||Yu(p)[y]._gsap,t._ptLookup[y]=q={},Cc[I.id]&&sr.length&&el(),k=S===p?y:S.indexOf(v),z&&(H=new z).init(v,Y||w,t,k,S)!==!1&&(t._pt=D=new Cn(t._pt,v,H.name,0,1,H.render,H,0,H.priority),H._props.forEach(function(it){q[it]=D}),H.priority&&(T=1)),!z||Y)for(R in w)kn[R]&&(H=np(R,w,t,k,v,S))?H.priority&&(T=1):q[R]=D=$u.call(t,v,R,"get",w[R],k,S,0,i.stringFilter);t._op&&t._op[y]&&t.kill(v,t._op[y]),x&&t._pt&&(tr=t,De.killTweensOf(v,q,t.globalTime(e)),W=!t.parent,tr=0),t._pt&&l&&(Cc[I.id]=1)}T&&lp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!W,h&&e<=0&&M.render(ei,!0,!0)},U_=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,d,h,f;if(!c)for(c=t._ptCache[e]=[],h=t._ptLookup,f=t._targets.length;f--;){if(u=h[f][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Uc=1,t.vars[e]="+=0",Ku(t,a),Uc=0,l?Oo(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=ke(n)+dn(d.e)),d.b&&(d.b=u.s+dn(d.b))},N_=function(t,e){var n=t[0]?Hr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Bs({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},O_=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(mn(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Mo=function(t,e,n,i,s){return Ne(t)?t.call(e,n,i,s):rn(t)&&~t.indexOf("random(")?Bo(t):t},ip=Xu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",rp={};An(ip+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return rp[r]=1});var We=function(r){bd(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:xo(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,h=l.stagger,f=l.overwrite,m=l.keyframes,g=l.defaults,p=l.scrollTrigger,_=i.parent||De,S=(mn(n)||Ad(n)?Hi(n[0]):"length"in i)?[n]:ni(n),x,M,A,w,y,R,D,v;if(a._targets=S.length?Yu(S):Oo("GSAP target "+n+" not found. https://gsap.com",!Yn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,m||h||ea(c)||ea(u)){i=a.vars;var T=i.easeReverse||i.yoyoEase;if(x=a.timeline=new bn({data:"nested",defaults:g||{},targets:_&&_.data==="nested"?_.vars.targets:S}),x.kill(),x.parent=x._dp=Ii(a),x._start=0,h||ea(c)||ea(u)){if(w=S.length,D=h&&Wd(h),Ei(h))for(y in h)~ip.indexOf(y)&&(v||(v={}),v[y]=h[y]);for(M=0;M<w;M++)A=nl(i,rp),A.stagger=0,T&&(A.easeReverse=T),v&&Bs(A,v),R=S[M],A.duration=+Mo(c,Ii(a),M,R,S),A.delay=(+Mo(u,Ii(a),M,R,S)||0)-a._delay,!h&&w===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),x.to(R,A,D?D(M,R,S):0),x._ease=ce.none;x.duration()?c=u=0:a.timeline=0}else if(m){xo($n(x.vars.defaults,{ease:"none"})),x._ease=Gr(m.ease||i.ease||"none");var I=0,z,H,q;if(mn(m))m.forEach(function(k){return x.to(S,k,">")}),x.duration();else{A={};for(y in m)y==="ease"||y==="easeEach"||O_(y,m[y],A,m.easeEach);for(y in A)for(z=A[y].sort(function(k,Y){return k.t-Y.t}),I=0,M=0;M<z.length;M++)H=z[M],q={ease:H.e,duration:(H.t-(M?z[M-1].t:0))/100*c},q[y]=H.v,x.to(S,q,I),I+=q.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return f===!0&&!zu&&(tr=Ii(a),De.killTweensOf(S),tr=0),xi(_,Ii(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!m&&a._start===Le(_._time)&&wn(d)&&f_(Ii(a))&&_.data!=="nested")&&(a._tTime=-Ee,a.render(Math.max(0,-u)||0)),p&&kd(Ii(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Ee&&!u?l:i<Ee?0:i,h,f,m,g,p,_,S,x;if(!c)p_(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(h=Le(d%g),d===l?(m=this._repeat,h=c):(p=Le(d/g),m=~~p,m&&m===p?(h=c,m--):h>c&&(h=c)),_=this._yoyo&&m&1,_&&(h=c-h),p=zs(this._tTime,g),h===a&&!o&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!_&&!this._lock&&h!==g&&this._initted&&(this._lock=o=1,this.render(Le(g*m),!0).invalidate()._lock=0)}if(!this._initted){if(Hd(this,u?i:h,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var M=h<a;if(M!==this._inv){var A=M?a:c-a;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=A?(M?-1:1)/A:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=S=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=S=this._ease(h/c);if(this._from&&(this.ratio=S=1-S),this._tTime=d,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!s&&!p&&(Wn(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(S,f.d),f=f._next;x&&x.render(i<0?i:x._dur*x._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Rc(this,i,s,o),Wn(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!s&&this.parent&&Wn(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Rc(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&hr(this,1),!s&&!(u&&!a)&&(d||a||_)&&(Wn(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){zo||Vn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Ku(this,c),u=this._ease(c/this._dur),U_(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(xl(this,0),this.parent||Bd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?uo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!ln),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,tr&&tr.vars.overwrite!==!0)._first||uo(this),this.parent&&o!==this.timeline.totalDuration()&&ks(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ni(i):a,c=this._ptLookup,u=this._pt,d,h,f,m,g,p,_;if((!s||s==="all")&&u_(a,l))return s==="all"&&(this._pt=0),uo(this);for(d=this._op=this._op||[],s!=="all"&&(rn(s)&&(g={},An(s,function(S){return g[S]=1}),s=g),s=N_(a,s)),_=a.length;_--;)if(~l.indexOf(a[_])){h=c[_],s==="all"?(d[_]=s,m=h,f={}):(f=d[_]=d[_]||{},m=s);for(g in m)p=h&&h[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&gl(this,p,"_pt"),delete h[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&u&&uo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return So(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return So(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return De.killTweensOf(i,s,o)},t}(ko);$n(We.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});An("staggerTo,staggerFrom,staggerFromTo",function(r){We[r]=function(){var t=new bn,e=Lc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Zu=function(t,e,n){return t[e]=n},sp=function(t,e,n){return t[e](n)},F_=function(t,e,n,i){return t[e](i.fp,n)},B_=function(t,e,n){return t.setAttribute(e,n)},Ju=function(t,e){return Ne(t[e])?sp:ku(t[e])&&t.setAttribute?B_:Zu},op=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},z_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},ap=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},ju=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},k_=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},H_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?gl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},V_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},lp=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},Cn=function(){function r(e,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||op,this.d=l||this,this.set=c||Zu,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=V_,this.m=n,this.mt=s,this.tween=i},r}();An(Xu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Wu[r]=1});qn.TweenMax=qn.TweenLite=We;qn.TimelineLite=qn.TimelineMax=bn;De=new bn({sortChildren:!1,defaults:No,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Yn.stringFilter=Qd;var Wr=[],ka={},G_=[],Gh=0,W_=0,Ol=function(t){return(ka[t]||G_).map(function(e){return e()})},Nc=function(){var t=Date.now(),e=[];t-Gh>2&&(Ol("matchMediaInit"),Wr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=mi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Ol("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Gh=t,Ol("matchMedia"))},cp=function(){function r(e,n){this.selector=n&&Dc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=W_++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Ne(n)&&(s=i,i=n,n=Ne);var o=this,a=function(){var c=Re,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=Dc(s)),Re=o,d=i.apply(o,arguments),Ne(d)&&o._r.push(d),Re=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===Ne?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Re;Re=null,n(this),Re=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof We&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof bn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof We)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Wr.length;o--;)Wr[o].id===this.id&&Wr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),X_=function(){function r(e){this.contexts=[],this.scope=e,Re&&Re.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Ei(n)||(n={matches:n});var o=new cp(0,s||this.scope),a=o.conditions={},l,c,u;Re&&!o.selector&&(o.selector=Re.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=mi.matchMedia(n[c]),l&&(Wr.indexOf(o)<0&&Wr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Nc):l.addEventListener("change",Nc)));return u&&i(o,function(d){return o.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),rl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Zd(i)})},timeline:function(t){return new bn(t)},getTweensOf:function(t,e){return De.getTweensOf(t,e)},getProperty:function(t,e,n,i){rn(t)&&(t=ni(t)[0]);var s=Hr(t||{}).get,o=n?Fd:Od;return n==="native"&&(n=""),t&&(e?o((kn[e]&&kn[e].get||s)(t,e,n,i)):function(a,l,c){return o((kn[a]&&kn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=ni(t),t.length>1){var i=t.map(function(u){return Dn.quickSetter(u,e,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}t=t[0]||{};var o=kn[e],a=Hr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var d=new o;bs._pt=0,d.init(t,n?u+n:u,bs,0,[t]),d.render(1,d),bs._pt&&ju(1,bs)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=Dn.to(t,$n((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return De.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Gr(t.ease,No.ease)),Bh(No,t||{})},config:function(t){return Bh(Yn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!kn[a]&&!qn[a]&&Oo(e+" effect requires "+a+" plugin.")}),Dl[e]=function(a,l,c){return n(ni(a),$n(l||{},s),c)},o&&(bn.prototype[e]=function(a,l,c){return this.add(Dl[e](a,Ei(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ce[t]=Gr(e)},parseEase:function(t,e){return arguments.length?Gr(t,e):ce},getById:function(t){return De.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new bn(t),i,s;for(n.smoothChildTiming=wn(t.smoothChildTiming),De.remove(n),n._dp=0,n._time=n._tTime=De._time,i=De._first;i;)s=i._next,(e||!(!i._dur&&i instanceof We&&i.vars.onComplete===i._targets[0]))&&xi(n,i,i._start-i._delay),i=s;return xi(De,n,0),n},context:function(t,e){return t?new cp(t,e):Re},matchMedia:function(t){return new X_(t)},matchMediaRefresh:function(){return Wr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Nc()},addEventListener:function(t,e){var n=ka[t]||(ka[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=ka[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:y_,wrapYoyo:E_,distribute:Wd,random:Yd,snap:Xd,normalize:M_,getUnit:dn,clamp:g_,splitColor:Jd,toArray:ni,selector:Dc,mapRange:$d,pipe:x_,unitize:S_,interpolate:T_,shuffle:Gd},install:Ld,effects:Dl,ticker:Vn,updateRoot:bn.updateRoot,plugins:kn,globalTimeline:De,core:{PropTween:Cn,globals:Dd,Tween:We,Timeline:bn,Animation:ko,getCache:Hr,_removeLinkedListItem:gl,reverting:function(){return ln},context:function(t){return t&&Re&&(Re.data.push(t),t._ctx=Re),Re},suppressOverwrites:function(t){return zu=t}}};An("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return rl[r]=We[r]});Vn.add(bn.updateRoot);bs=rl.to({},{duration:0});var Y_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},q_=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=Y_(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Fl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(rn(s)&&(l={},An(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}q_(a,s)}}}},Dn=rl.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)ln?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Fl("roundProps",Ic),Fl("modifiers"),Fl("snap",Xd))||rl;We.version=bn.version=Dn.version="3.15.0";Pd=1;Hu()&&Hs();ce.Power0;ce.Power1;ce.Power2;ce.Power3;ce.Power4;ce.Linear;ce.Quad;ce.Cubic;ce.Quart;ce.Quint;ce.Strong;ce.Elastic;ce.Back;ce.SteppedEase;ce.Bounce;ce.Sine;ce.Expo;ce.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Wh,er,Rs,Qu,Fr,Xh,th,$_=function(){return typeof window<"u"},Vi={},Rr=180/Math.PI,Ps=Math.PI/180,ns=Math.atan2,Yh=1e8,eh=/([A-Z])/g,K_=/(left|right|width|margin|padding|x)/i,Z_=/[\s,\(]\S/,Si={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Oc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},J_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},j_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Q_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},tg=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},up=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},hp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},eg=function(t,e,n){return t.style[e]=n},ng=function(t,e,n){return t.style.setProperty(e,n)},ig=function(t,e,n){return t._gsap[e]=n},rg=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},sg=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},og=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Ie="transform",Rn=Ie+"Origin",ag=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Vi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Si[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Ui(i,a)}):this.tfm[t]=o.x?o[t]:Ui(i,t),t===Rn&&(this.tfm.zOrigin=o.zOrigin);else return Si.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Ie)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Rn,e,"")),t=Ie}(s||e)&&this.props.push(t,e,s[t])},fp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},lg=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(eh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=th(),(!s||!s.isStart)&&!n[Ie]&&(fp(n),i.zOrigin&&n[Rn]&&(n[Rn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},dp=function(t,e){var n={target:t,props:[],revert:lg,save:ag};return t._gsap||Dn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},pp,Fc=function(t,e){var n=er.createElementNS?er.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):er.createElement(t);return n&&n.style?n:er.createElement(t)},Xn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(eh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Vs(e)||e,1)||""},qh="O,Moz,ms,Ms,Webkit".split(","),Vs=function(t,e,n){var i=e||Fr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(qh[o]+t in s););return o<0?null:(o===3?"ms":o>=0?qh[o]:"")+t},Bc=function(){$_()&&window.document&&(Wh=window,er=Wh.document,Rs=er.documentElement,Fr=Fc("div")||{style:{}},Fc("div"),Ie=Vs(Ie),Rn=Ie+"Origin",Fr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",pp=!!Vs("perspective"),th=Dn.core.reverting,Qu=1)},$h=function(t){var e=t.ownerSVGElement,n=Fc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Rs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Rs.removeChild(n),s},Kh=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},mp=function(t){var e,n;try{e=t.getBBox()}catch{e=$h(t),n=1}return e&&(e.width||e.height)||n||(e=$h(t)),e&&!e.width&&!e.x&&!e.y?{x:+Kh(t,["x","cx","x1"])||0,y:+Kh(t,["y","cy","y1"])||0,width:0,height:0}:e},_p=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&mp(t))},fr=function(t,e){if(e){var n=t.style,i;e in Vi&&e!==Rn&&(e=Ie),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(eh,"-$1").toLowerCase())):n.removeAttribute(e)}},nr=function(t,e,n,i,s,o){var a=new Cn(t._pt,e,n,0,1,o?hp:up);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},Zh={deg:1,rad:1,turn:1},cg={grid:1,flex:1},dr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Fr.style,l=K_.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,h=i==="px",f=i==="%",m,g,p,_;if(i===o||!s||Zh[i]||Zh[o])return s;if(o!=="px"&&!h&&(s=r(t,e,n,"px")),_=t.getCTM&&_p(t),(f||o==="%")&&(Vi[e]||~e.indexOf("adius")))return m=_?t.getBBox()[l?"width":"height"]:t[u],ke(f?s/m*d:s/100*m);if(a[l?"width":"height"]=d+(h?o:i),g=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===er||!g.appendChild)&&(g=er.body),p=g._gsap,p&&f&&p.width&&l&&p.time===Vn.time&&!p.uncache)return ke(s/p.width*d);if(f&&(e==="height"||e==="width")){var S=t.style[e];t.style[e]=d+i,m=t[u],S?t.style[e]=S:fr(t,e)}else(f||o==="%")&&!cg[Xn(g,"display")]&&(a.position=Xn(t,"position")),g===t&&(a.position="static"),g.appendChild(Fr),m=Fr[u],g.removeChild(Fr),a.position="absolute";return l&&f&&(p=Hr(g),p.time=Vn.time,p.width=g[u]),ke(h?m*s/d:m&&s?d/m*s:0)},Ui=function(t,e,n,i){var s;return Qu||Bc(),e in Si&&e!=="transform"&&(e=Si[e],~e.indexOf(",")&&(e=e.split(",")[0])),Vi[e]&&e!=="transform"?(s=Vo(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:ol(Xn(t,Rn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=sl[e]&&sl[e](t,e,n)||Xn(t,e)||Ud(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?dr(t,e,s,n)+n:s},ug=function(t,e,n,i){if(!n||n==="none"){var s=Vs(e,t,1),o=s&&Xn(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=Xn(t,"borderTopColor"))}var a=new Cn(this._pt,t.style,e,0,1,ap),l=0,c=0,u,d,h,f,m,g,p,_,S,x,M,A;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Xn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=t.style[e],t.style[e]=i,i=Xn(t,e)||i,g?t.style[e]=g:fr(t,e)),u=[n,i],Qd(u),n=u[0],i=u[1],h=n.match(Ts)||[],A=i.match(Ts)||[],A.length){for(;d=Ts.exec(i);)p=d[0],S=i.substring(l,d.index),m?m=(m+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(m=1),p!==(g=h[c++]||"")&&(f=parseFloat(g)||0,M=g.substr((f+"").length),p.charAt(1)==="="&&(p=Cs(f,p)+M),_=parseFloat(p),x=p.substr((_+"").length),l=Ts.lastIndex-x.length,x||(x=x||Yn.units[e]||M,l===i.length&&(i+=x,a.e+=x)),M!==x&&(f=dr(t,e,g,x)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:f,c:_-f,m:m&&m<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?hp:up;return Rd.test(i)&&(a.e=0),this._pt=a,a},Jh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},hg=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Jh[n]||n,e[1]=Jh[i]||i,e.join(" ")},fg=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Vi[a]&&(l=1,a=a==="transformOrigin"?Rn:Ie),fr(n,a);l&&(fr(n,Ie),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Vo(n,1),o.uncache=1,fp(i)))}},sl={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new Cn(t._pt,e,n,0,0,fg);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Ho=[1,0,0,1,0,0],gp={},vp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},jh=function(t){var e=Xn(t,Ie);return vp(e)?Ho:e.substr(7).match(Cd).map(ke)},nh=function(t,e){var n=t._gsap||Hr(t),i=t.style,s=jh(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ho:s):(s===Ho&&!t.offsetParent&&t!==Rs&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Rs.appendChild(t)),s=jh(t),l?i.display=l:fr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Rs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},zc=function(t,e,n,i,s,o){var a=t._gsap,l=s||nh(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,h=a.yOffset||0,f=l[0],m=l[1],g=l[2],p=l[3],_=l[4],S=l[5],x=e.split(" "),M=parseFloat(x[0])||0,A=parseFloat(x[1])||0,w,y,R,D;n?l!==Ho&&(y=f*p-m*g)&&(R=M*(p/y)+A*(-g/y)+(g*S-p*_)/y,D=M*(-m/y)+A*(f/y)-(f*S-m*_)/y,M=R,A=D):(w=mp(t),M=w.x+(~x[0].indexOf("%")?M/100*w.width:M),A=w.y+(~(x[1]||x[0]).indexOf("%")?A/100*w.height:A)),i||i!==!1&&a.smooth?(_=M-c,S=A-u,a.xOffset=d+(_*f+S*g)-_,a.yOffset=h+(_*m+S*p)-S):a.xOffset=a.yOffset=0,a.xOrigin=M,a.yOrigin=A,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Rn]="0px 0px",o&&(nr(o,a,"xOrigin",c,M),nr(o,a,"yOrigin",u,A),nr(o,a,"xOffset",d,a.xOffset),nr(o,a,"yOffset",h,a.yOffset)),t.setAttribute("data-svg-origin",M+" "+A)},Vo=function(t,e){var n=t._gsap||new ep(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=Xn(t,Rn)||"0",u,d,h,f,m,g,p,_,S,x,M,A,w,y,R,D,v,T,I,z,H,q,k,Y,W,it,P,at,zt,Yt,$,Q;return u=d=h=g=p=_=S=x=M=0,f=m=1,n.svg=!!(t.getCTM&&_p(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ie]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ie]!=="none"?l[Ie]:"")),i.scale=i.rotate=i.translate="none"),y=nh(t,n.svg),n.svg&&(n.uncache?(W=t.getBBox(),c=n.xOrigin-W.x+"px "+(n.yOrigin-W.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),zc(t,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,y)),A=n.xOrigin||0,w=n.yOrigin||0,y!==Ho&&(T=y[0],I=y[1],z=y[2],H=y[3],u=q=y[4],d=k=y[5],y.length===6?(f=Math.sqrt(T*T+I*I),m=Math.sqrt(H*H+z*z),g=T||I?ns(I,T)*Rr:0,S=z||H?ns(z,H)*Rr+g:0,S&&(m*=Math.abs(Math.cos(S*Ps))),n.svg&&(u-=A-(A*T+w*z),d-=w-(A*I+w*H))):(Q=y[6],Yt=y[7],P=y[8],at=y[9],zt=y[10],$=y[11],u=y[12],d=y[13],h=y[14],R=ns(Q,zt),p=R*Rr,R&&(D=Math.cos(-R),v=Math.sin(-R),Y=q*D+P*v,W=k*D+at*v,it=Q*D+zt*v,P=q*-v+P*D,at=k*-v+at*D,zt=Q*-v+zt*D,$=Yt*-v+$*D,q=Y,k=W,Q=it),R=ns(-z,zt),_=R*Rr,R&&(D=Math.cos(-R),v=Math.sin(-R),Y=T*D-P*v,W=I*D-at*v,it=z*D-zt*v,$=H*v+$*D,T=Y,I=W,z=it),R=ns(I,T),g=R*Rr,R&&(D=Math.cos(R),v=Math.sin(R),Y=T*D+I*v,W=q*D+k*v,I=I*D-T*v,k=k*D-q*v,T=Y,q=W),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,_=180-_),f=ke(Math.sqrt(T*T+I*I+z*z)),m=ke(Math.sqrt(k*k+Q*Q)),R=ns(q,k),S=Math.abs(R)>2e-4?R*Rr:0,M=$?1/($<0?-$:$):0),n.svg&&(Y=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!vp(Xn(t,Ie)),Y&&t.setAttribute("transform",Y))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(f*=-1,S+=g<=0?180:-180,g+=g<=0?180:-180):(m*=-1,S+=S<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=ke(f),n.scaleY=ke(m),n.rotation=ke(g)+a,n.rotationX=ke(p)+a,n.rotationY=ke(_)+a,n.skewX=S+a,n.skewY=x+a,n.transformPerspective=M+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Rn]=ol(c)),n.xOffset=n.yOffset=0,n.force3D=Yn.force3D,n.renderTransform=n.svg?pg:pp?xp:dg,n.uncache=0,n},ol=function(t){return(t=t.split(" "))[0]+" "+t[1]},Bl=function(t,e,n){var i=dn(e);return ke(parseFloat(e)+parseFloat(dr(t,"x",n+"px",i)))+i},dg=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,xp(t,e)},xr="0deg",no="0px",Sr=") ",xp=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,h=n.skewX,f=n.skewY,m=n.scaleX,g=n.scaleY,p=n.transformPerspective,_=n.force3D,S=n.target,x=n.zOrigin,M="",A=_==="auto"&&t&&t!==1||_===!0;if(x&&(d!==xr||u!==xr)){var w=parseFloat(u)*Ps,y=Math.sin(w),R=Math.cos(w),D;w=parseFloat(d)*Ps,D=Math.cos(w),o=Bl(S,o,y*D*-x),a=Bl(S,a,-Math.sin(w)*-x),l=Bl(S,l,R*D*-x+x)}p!==no&&(M+="perspective("+p+Sr),(i||s)&&(M+="translate("+i+"%, "+s+"%) "),(A||o!==no||a!==no||l!==no)&&(M+=l!==no||A?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Sr),c!==xr&&(M+="rotate("+c+Sr),u!==xr&&(M+="rotateY("+u+Sr),d!==xr&&(M+="rotateX("+d+Sr),(h!==xr||f!==xr)&&(M+="skew("+h+", "+f+Sr),(m!==1||g!==1)&&(M+="scale("+m+", "+g+Sr),S.style[Ie]=M||"translate(0, 0)"},pg=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,h=n.scaleY,f=n.target,m=n.xOrigin,g=n.yOrigin,p=n.xOffset,_=n.yOffset,S=n.forceCSS,x=parseFloat(o),M=parseFloat(a),A,w,y,R,D;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ps,c*=Ps,A=Math.cos(l)*d,w=Math.sin(l)*d,y=Math.sin(l-c)*-h,R=Math.cos(l-c)*h,c&&(u*=Ps,D=Math.tan(c-u),D=Math.sqrt(1+D*D),y*=D,R*=D,u&&(D=Math.tan(u),D=Math.sqrt(1+D*D),A*=D,w*=D)),A=ke(A),w=ke(w),y=ke(y),R=ke(R)):(A=d,R=h,w=y=0),(x&&!~(o+"").indexOf("px")||M&&!~(a+"").indexOf("px"))&&(x=dr(f,"x",o,"px"),M=dr(f,"y",a,"px")),(m||g||p||_)&&(x=ke(x+m-(m*A+g*y)+p),M=ke(M+g-(m*w+g*R)+_)),(i||s)&&(D=f.getBBox(),x=ke(x+i/100*D.width),M=ke(M+s/100*D.height)),D="matrix("+A+","+w+","+y+","+R+","+x+","+M+")",f.setAttribute("transform",D),S&&(f.style[Ie]=D)},mg=function(t,e,n,i,s){var o=360,a=rn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Rr:1),c=l-i,u=i+c+"deg",d,h;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Yh)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Yh)%o-~~(c/o)*o)),t._pt=h=new Cn(t._pt,e,n,i,c,J_),h.e=u,h.u="deg",t._props.push(n),h},Qh=function(t,e){for(var n in e)t[n]=e[n];return t},_g=function(t,e,n){var i=Qh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,h,f,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ie]=e,a=Vo(n,1),fr(n,Ie),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ie],o[Ie]=e,a=Vo(n,1),o[Ie]=c);for(l in Vi)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=dn(c),m=dn(u),d=f!==m?dr(n,l,c,m):parseFloat(c),h=parseFloat(u),t._pt=new Cn(t._pt,a,l,d,h-d,Oc),t._pt.u=m||0,t._props.push(l));Qh(a,i)};An("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});sl[t>1?"border"+r:r]=function(a,l,c,u,d){var h,f;if(arguments.length<4)return h=o.map(function(m){return Ui(a,m,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(u+"").split(" "),f={},o.forEach(function(m,g){return f[m]=h[g]=h[g]||h[(g-1)/2|0]}),a.init(l,f,d)}});var Sp={name:"css",register:Bc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,d,h,f,m,g,p,_,S,x,M,A,w,y,R,D;Qu||Bc(),this.styles=this.styles||dp(t),R=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(u=e[g],!(kn[g]&&np(g,e,n,i,t,s)))){if(f=typeof u,m=sl[g],f==="function"&&(u=u.call(n,i,t,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=Bo(u)),m)m(this,t,g,u,n)&&(y=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",or.lastIndex=0,or.test(c)||(p=dn(c),_=dn(u),_?p!==_&&(c=dr(t,g,c,_)+_):p&&(u+=p)),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),R.push(g,0,a[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,s):l[g],rn(c)&&~c.indexOf("random(")&&(c=Bo(c)),dn(c+"")||c==="auto"||(c+=Yn.units[g]||dn(Ui(t,g))||""),(c+"").charAt(1)==="="&&(c=Ui(t,g))):c=Ui(t,g),h=parseFloat(c),S=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),d=parseFloat(u),g in Si&&(g==="autoAlpha"&&(h===1&&Ui(t,"visibility")==="hidden"&&d&&(h=0),R.push("visibility",0,a.visibility),nr(this,a,"visibility",h?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Si[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in Vi,x){if(this.styles.save(g),D=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=Xn(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var v=t.style.perspective;t.style.perspective=u,u=Xn(t,"perspective"),v?t.style.perspective=v:fr(t,"perspective")}d=parseFloat(u)}if(M||(A=t._gsap,A.renderTransform&&!e.parseTransform||Vo(t,e.parseTransform),w=e.smoothOrigin!==!1&&A.smooth,M=this._pt=new Cn(this._pt,a,Ie,0,1,A.renderTransform,A,0,-1),M.dep=1),g==="scale")this._pt=new Cn(this._pt,A,"scaleY",A.scaleY,(S?Cs(A.scaleY,S+d):d)-A.scaleY||0,Oc),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){R.push(Rn,0,a[Rn]),u=hg(u),A.svg?zc(t,u,0,w,0,this):(_=parseFloat(u.split(" ")[2])||0,_!==A.zOrigin&&nr(this,A,"zOrigin",A.zOrigin,_),nr(this,a,g,ol(c),ol(u)));continue}else if(g==="svgOrigin"){zc(t,u,1,w,0,this);continue}else if(g in gp){mg(this,A,g,h,S?Cs(h,S+u):u);continue}else if(g==="smoothOrigin"){nr(this,A,"smooth",A.smooth,u);continue}else if(g==="force3D"){A[g]=u;continue}else if(g==="transform"){_g(this,u,t);continue}}else g in a||(g=Vs(g)||g);if(x||(d||d===0)&&(h||h===0)&&!Z_.test(u)&&g in a)p=(c+"").substr((h+"").length),d||(d=0),_=dn(u)||(g in Yn.units?Yn.units[g]:p),p!==_&&(h=dr(t,g,c,_)),this._pt=new Cn(this._pt,x?A:a,g,h,(S?Cs(h,S+d):d)-h,!x&&(_==="px"||g==="zIndex")&&e.autoRound!==!1?tg:Oc),this._pt.u=_||0,x&&D!==u?(this._pt.b=c,this._pt.e=D,this._pt.r=Q_):p!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=j_);else if(g in a)ug.call(this,t,g,c,S?S+u:u);else if(g in t)this.add(t,g,c||t[g],S?S+u:u,i,s);else if(g!=="parseTransform"){Gu(g,u);continue}x||(g in a?R.push(g,0,a[g]):typeof t[g]=="function"?R.push(g,2,t[g]()):R.push(g,1,c||t[g])),o.push(g)}}y&&lp(this)},render:function(t,e){if(e.tween._time||!th())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ui,aliases:Si,getSetter:function(t,e,n){var i=Si[e];return i&&i.indexOf(",")<0&&(e=i),e in Vi&&e!==Rn&&(t._gsap.x||Ui(t,"x"))?n&&Xh===n?e==="scale"?rg:ig:(Xh=n||{})&&(e==="scale"?sg:og):t.style&&!ku(t.style[e])?eg:~e.indexOf("-")?ng:Ju(t,e)},core:{_removeProperty:fr,_getMatrix:nh}};Dn.utils.checkPrefix=Vs;Dn.core.getStyleSaver=dp;(function(r,t,e,n){var i=An(r+","+t+","+e,function(s){Vi[s]=1});An(t,function(s){Yn.units[s]="deg",gp[s]=1}),Si[i[13]]=r+","+t,An(n,function(s){var o=s.split(":");Si[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");An("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Yn.units[r]="px"});Dn.registerPlugin(Sp);var ri=Dn.registerPlugin(Sp)||Dn;ri.core.Tween;function gg(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function vg(r,t,e){return t&&gg(r.prototype,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var an,Ha,Gn,ir,rr,Ls,Mp,Pr,Ds,yp,Fi,ui,Ep,Tp=function(){return an||typeof window<"u"&&(an=window.gsap)&&an.registerPlugin&&an},bp=1,ws=[],ne=[],yi=[],yo=Date.now,kc=function(t,e){return e},xg=function(){var t=Ds.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,ne),i.push.apply(i,yi),ne=n,yi=i,kc=function(o,a){return e[o](a)}},ar=function(t,e){return~yi.indexOf(t)&&yi[yi.indexOf(t)+1][e]},Eo=function(t){return!!~yp.indexOf(t)},gn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},_n=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},na="scrollLeft",ia="scrollTop",Hc=function(){return Fi&&Fi.isPressed||ne.cache++},al=function(t,e){var n=function i(s){if(s||s===0){bp&&(Gn.history.scrollRestoration="manual");var o=Fi&&Fi.isPressed;s=i.v=Math.round(s)||(Fi&&Fi.iOS?1:0),t(s),i.cacheID=ne.cache,o&&kc("ss",s)}else(e||ne.cache!==i.cacheID||kc("ref"))&&(i.cacheID=ne.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},En={s:na,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:al(function(r){return arguments.length?Gn.scrollTo(r,Ye.sc()):Gn.pageXOffset||ir[na]||rr[na]||Ls[na]||0})},Ye={s:ia,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:En,sc:al(function(r){return arguments.length?Gn.scrollTo(En.sc(),r):Gn.pageYOffset||ir[ia]||rr[ia]||Ls[ia]||0})},Tn=function(t,e){return(e&&e._ctx&&e._ctx.selector||an.utils.toArray)(t)[0]||(typeof t=="string"&&an.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Sg=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},pr=function(t,e){var n=e.s,i=e.sc;Eo(t)&&(t=ir.scrollingElement||rr);var s=ne.indexOf(t),o=i===Ye.sc?1:2;!~s&&(s=ne.push(t)-1),ne[s+o]||gn(t,"scroll",Hc);var a=ne[s+o],l=a||(ne[s+o]=al(ar(t,n),!0)||(Eo(t)?i:al(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=an.getProperty(t,"scrollBehavior")==="smooth"),l},Vc=function(t,e,n){var i=t,s=t,o=yo(),a=o,l=e||50,c=Math.max(500,l*3),u=function(m,g){var p=yo();g||p-o>l?(s=i,i=m,a=o,o=p):n?i+=m:i=s+(m-s)/(p-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},h=function(m){var g=a,p=s,_=yo();return(m||m===0)&&m!==i&&u(m),o===a||_-a>c?0:(i+(n?p:-p))/((n?_:o)-g)*1e3};return{update:u,reset:d,getVelocity:h}},io=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},tf=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},wp=function(){Ds=an.core.globals().ScrollTrigger,Ds&&Ds.core&&xg()},Ap=function(t){return an=t||Tp(),!Ha&&an&&typeof document<"u"&&document.body&&(Gn=window,ir=document,rr=ir.documentElement,Ls=ir.body,yp=[Gn,ir,rr,Ls],an.utils.clamp,Ep=an.core.context||function(){},Pr="onpointerenter"in Ls?"pointer":"mouse",Mp=He.isTouch=Gn.matchMedia&&Gn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Gn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ui=He.eventTypes=("ontouchstart"in rr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in rr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return bp=0},500),Ha=1),Ds||wp(),Ha};En.op=Ye;ne.cache=0;var He=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Ha||Ap(an)||console.warn("Please gsap.registerPlugin(Observer)"),Ds||wp();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,h=n.onStopDelay,f=n.ignore,m=n.wheelSpeed,g=n.event,p=n.onDragStart,_=n.onDragEnd,S=n.onDrag,x=n.onPress,M=n.onRelease,A=n.onRight,w=n.onLeft,y=n.onUp,R=n.onDown,D=n.onChangeX,v=n.onChangeY,T=n.onChange,I=n.onToggleX,z=n.onToggleY,H=n.onHover,q=n.onHoverEnd,k=n.onMove,Y=n.ignoreCheck,W=n.isNormalizer,it=n.onGestureStart,P=n.onGestureEnd,at=n.onWheel,zt=n.onEnable,Yt=n.onDisable,$=n.onClick,Q=n.scrollSpeed,ft=n.capture,ot=n.allowClicks,At=n.lockAxis,yt=n.onLockAxis;this.target=a=Tn(a)||rr,this.vars=n,f&&(f=an.utils.toArray(f)),i=i||1e-9,s=s||0,m=m||1,Q=Q||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Gn.getComputedStyle(Ls).lineHeight)||22);var Xt,Gt,Ot,L,oe,Ft,kt,B=this,jt=0,Dt=0,C=n.passive||!u&&n.passive!==!1,E=pr(a,En),X=pr(a,Ye),J=E(),et=X(),Z=~o.indexOf("touch")&&!~o.indexOf("pointer")&&ui[0]==="pointerdown",St=Eo(a),rt=a.ownerDocument||ir,dt=[0,0,0],Vt=[0,0,0],nt=0,vt=function(){return nt=yo()},xt=function(Tt,ue){return(B.event=Tt)&&f&&Sg(Tt.target,f)||ue&&Z&&Tt.pointerType!=="touch"||Y&&Y(Tt,ue)},Ut=function(){B._vx.reset(),B._vy.reset(),Gt.pause(),d&&d(B)},gt=function(){var Tt=B.deltaX=tf(dt),ue=B.deltaY=tf(Vt),pt=Math.abs(Tt)>=i,It=Math.abs(ue)>=i;T&&(pt||It)&&T(B,Tt,ue,dt,Vt),pt&&(A&&B.deltaX>0&&A(B),w&&B.deltaX<0&&w(B),D&&D(B),I&&B.deltaX<0!=jt<0&&I(B),jt=B.deltaX,dt[0]=dt[1]=dt[2]=0),It&&(R&&B.deltaY>0&&R(B),y&&B.deltaY<0&&y(B),v&&v(B),z&&B.deltaY<0!=Dt<0&&z(B),Dt=B.deltaY,Vt[0]=Vt[1]=Vt[2]=0),(L||Ot)&&(k&&k(B),Ot&&(p&&Ot===1&&p(B),S&&S(B),Ot=0),L=!1),Ft&&!(Ft=!1)&&yt&&yt(B),oe&&(at(B),oe=!1),Xt=0},qt=function(Tt,ue,pt){dt[pt]+=Tt,Vt[pt]+=ue,B._vx.update(Tt),B._vy.update(ue),c?Xt||(Xt=requestAnimationFrame(gt)):gt()},Bt=function(Tt,ue){At&&!kt&&(B.axis=kt=Math.abs(Tt)>Math.abs(ue)?"x":"y",Ft=!0),kt!=="y"&&(dt[2]+=Tt,B._vx.update(Tt,!0)),kt!=="x"&&(Vt[2]+=ue,B._vy.update(ue,!0)),c?Xt||(Xt=requestAnimationFrame(gt)):gt()},ae=function(Tt){if(!xt(Tt,1)){Tt=io(Tt,u);var ue=Tt.clientX,pt=Tt.clientY,It=ue-B.x,Pt=pt-B.y,Ht=B.isDragging;B.x=ue,B.y=pt,(Ht||(It||Pt)&&(Math.abs(B.startX-ue)>=s||Math.abs(B.startY-pt)>=s))&&(Ot||(Ot=Ht?2:1),Ht||(B.isDragging=!0),Bt(It,Pt))}},N=B.onPress=function(Rt){xt(Rt,1)||Rt&&Rt.button||(B.axis=kt=null,Gt.pause(),B.isPressed=!0,Rt=io(Rt),jt=Dt=0,B.startX=B.x=Rt.clientX,B.startY=B.y=Rt.clientY,B._vx.reset(),B._vy.reset(),gn(W?a:rt,ui[1],ae,C,!0),B.deltaX=B.deltaY=0,x&&x(B))},tt=B.onRelease=function(Rt){if(!xt(Rt,1)){_n(W?a:rt,ui[1],ae,!0);var Tt=!isNaN(B.y-B.startY),ue=B.isDragging,pt=ue&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),It=io(Rt);!pt&&Tt&&(B._vx.reset(),B._vy.reset(),u&&ot&&an.delayedCall(.08,function(){if(yo()-nt>300&&!Rt.defaultPrevented){if(Rt.target.click)Rt.target.click();else if(rt.createEvent){var Pt=rt.createEvent("MouseEvents");Pt.initMouseEvent("click",!0,!0,Gn,1,It.screenX,It.screenY,It.clientX,It.clientY,!1,!1,!1,!1,0,null),Rt.target.dispatchEvent(Pt)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,d&&ue&&!W&&Gt.restart(!0),Ot&&gt(),_&&ue&&_(B),M&&M(B,pt)}},K=function(Tt){return Tt.touches&&Tt.touches.length>1&&(B.isGesturing=!0)&&it(Tt,B.isDragging)},j=function(){return(B.isGesturing=!1)||P(B)},lt=function(Tt){if(!xt(Tt)){var ue=E(),pt=X();qt((ue-J)*Q,(pt-et)*Q,1),J=ue,et=pt,d&&Gt.restart(!0)}},ct=function(Tt){if(!xt(Tt)){Tt=io(Tt,u),at&&(oe=!0);var ue=(Tt.deltaMode===1?l:Tt.deltaMode===2?Gn.innerHeight:1)*m;qt(Tt.deltaX*ue,Tt.deltaY*ue,0),d&&!W&&Gt.restart(!0)}},$t=function(Tt){if(!xt(Tt)){var ue=Tt.clientX,pt=Tt.clientY,It=ue-B.x,Pt=pt-B.y;B.x=ue,B.y=pt,L=!0,d&&Gt.restart(!0),(It||Pt)&&Bt(It,Pt)}},xe=function(Tt){B.event=Tt,H(B)},Ae=function(Tt){B.event=Tt,q(B)},re=function(Tt){return xt(Tt)||io(Tt,u)&&$(B)};Gt=B._dc=an.delayedCall(h||.25,Ut).pause(),B.deltaX=B.deltaY=0,B._vx=Vc(0,50,!0),B._vy=Vc(0,50,!0),B.scrollX=E,B.scrollY=X,B.isDragging=B.isGesturing=B.isPressed=!1,Ep(this),B.enable=function(Rt){return B.isEnabled||(gn(St?rt:a,"scroll",Hc),o.indexOf("scroll")>=0&&gn(St?rt:a,"scroll",lt,C,ft),o.indexOf("wheel")>=0&&gn(a,"wheel",ct,C,ft),(o.indexOf("touch")>=0&&Mp||o.indexOf("pointer")>=0)&&(gn(a,ui[0],N,C,ft),gn(rt,ui[2],tt),gn(rt,ui[3],tt),ot&&gn(a,"click",vt,!0,!0),$&&gn(a,"click",re),it&&gn(rt,"gesturestart",K),P&&gn(rt,"gestureend",j),H&&gn(a,Pr+"enter",xe),q&&gn(a,Pr+"leave",Ae),k&&gn(a,Pr+"move",$t)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=L=Ot=!1,B._vx.reset(),B._vy.reset(),J=E(),et=X(),Rt&&Rt.type&&N(Rt),zt&&zt(B)),B},B.disable=function(){B.isEnabled&&(ws.filter(function(Rt){return Rt!==B&&Eo(Rt.target)}).length||_n(St?rt:a,"scroll",Hc),B.isPressed&&(B._vx.reset(),B._vy.reset(),_n(W?a:rt,ui[1],ae,!0)),_n(St?rt:a,"scroll",lt,ft),_n(a,"wheel",ct,ft),_n(a,ui[0],N,ft),_n(rt,ui[2],tt),_n(rt,ui[3],tt),_n(a,"click",vt,!0),_n(a,"click",re),_n(rt,"gesturestart",K),_n(rt,"gestureend",j),_n(a,Pr+"enter",xe),_n(a,Pr+"leave",Ae),_n(a,Pr+"move",$t),B.isEnabled=B.isPressed=B.isDragging=!1,Yt&&Yt(B))},B.kill=B.revert=function(){B.disable();var Rt=ws.indexOf(B);Rt>=0&&ws.splice(Rt,1),Fi===B&&(Fi=0)},ws.push(B),W&&Eo(a)&&(Fi=B),B.enable(g)},vg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();He.version="3.15.0";He.create=function(r){return new He(r)};He.register=Ap;He.getAll=function(){return ws.slice()};He.getById=function(r){return ws.filter(function(t){return t.vars.id===r})[0]};Tp()&&an.registerPlugin(He);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Mt,Ms,ee,ge,Hn,de,ih,ll,Go,To,fo,ra,hn,Sl,Gc,Mn,ef,nf,ys,Cp,zl,Rp,Sn,Wc,Pp,Lp,ji,Xc,rh,Is,sh,bo,Yc,kl,sa=1,fn=Date.now,Hl=fn(),si=0,po=0,rf=function(t,e,n){var i=zn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},sf=function(t,e){return e&&(!zn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},Mg=function r(){return po&&requestAnimationFrame(r)},of=function(){return Sl=1},af=function(){return Sl=0},_i=function(t){return t},mo=function(t){return Math.round(t*1e5)/1e5||0},Dp=function(){return typeof window<"u"},Ip=function(){return Mt||Dp()&&(Mt=window.gsap)&&Mt.registerPlugin&&Mt},Kr=function(t){return!!~ih.indexOf(t)},Up=function(t){return(t==="Height"?sh:ee["inner"+t])||Hn["client"+t]||de["client"+t]},Np=function(t){return ar(t,"getBoundingClientRect")||(Kr(t)?function(){return Ya.width=ee.innerWidth,Ya.height=sh,Ya}:function(){return Ni(t)})},yg=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=ar(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?Up(s):t["client"+s])||0}},Eg=function(t,e){return!e||~yi.indexOf(t)?Np(t):function(){return Ya}},Mi=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=ar(t,n))?o()-Np(t)()[s]:Kr(t)?(Hn[n]||de[n])-Up(i):t[n]-t["offset"+i])},oa=function(t,e){for(var n=0;n<ys.length;n+=3)(!e||~e.indexOf(ys[n+1]))&&t(ys[n],ys[n+1],ys[n+2])},zn=function(t){return typeof t=="string"},pn=function(t){return typeof t=="function"},_o=function(t){return typeof t=="number"},Lr=function(t){return typeof t=="object"},ro=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},is=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},rs=Math.abs,Op="left",Fp="top",oh="right",ah="bottom",Xr="width",Yr="height",wo="Right",Ao="Left",Co="Top",Ro="Bottom",Ge="padding",jn="margin",Gs="Width",lh="Height",Xe="px",Qn=function(t){return ee.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},Tg=function(t){var e=Qn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},lf=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Ni=function(t,e){var n=e&&Qn(t)[Gc]!=="matrix(1, 0, 0, 1, 0, 0)"&&Mt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},cl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Bp=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},bg=function(t){return function(e){return Mt.utils.snap(Bp(t),e)}},ch=function(t){var e=Mt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},wg=function(t){return function(e,n){return ch(Bp(t))(e,n.direction)}},aa=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Qe=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},je=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},la=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},cf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ca={toggleActions:"play",anticipatePin:0},ul={top:0,left:0,center:.5,bottom:1,right:1},Va=function(t,e){if(zn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in ul?ul[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},ua=function(t,e,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,h=s.indent,f=s.fontWeight,m=ge.createElement("div"),g=Kr(n)||ar(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,_=g?de:n.tagName==="IFRAME"?n.contentDocument.body:n,S=t.indexOf("start")!==-1,x=S?c:u,M="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return M+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(M+=(i===Ye?oh:ah)+":"+(o+parseFloat(h))+"px;"),a&&(M+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),m._isStart=S,m.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),m.style.cssText=M,m.innerText=e||e===0?t+"-"+e:t,_.children[0]?_.insertBefore(m,_.children[0]):_.appendChild(m),m._offset=m["offset"+i.op.d2],Ga(m,0,i,S),m},Ga=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Gs]=1,s["border"+a+Gs]=0,s[n.p]=e+"px",Mt.set(t,s)},te=[],qc={},Wo,uf=function(){return fn()-si>34&&(Wo||(Wo=requestAnimationFrame(ki)))},ss=function(){(!Sn||!Sn.isPressed||Sn.startX>de.clientWidth)&&(ne.cache++,Sn?Wo||(Wo=requestAnimationFrame(ki)):ki(),si||Jr("scrollStart"),si=fn())},Vl=function(){Lp=ee.innerWidth,Pp=ee.innerHeight},go=function(t){ne.cache++,(t===!0||!hn&&!Rp&&!ge.fullscreenElement&&!ge.webkitFullscreenElement&&(!Wc||Lp!==ee.innerWidth||Math.abs(ee.innerHeight-Pp)>ee.innerHeight*.25))&&ll.restart(!0)},Zr={},Ag=[],zp=function r(){return je(Wt,"scrollEnd",r)||Br(!0)},Jr=function(t){return Zr[t]&&Zr[t].map(function(e){return e()})||Ag},Bn=[],kp=function(t){for(var e=0;e<Bn.length;e+=5)(!t||Bn[e+4]&&Bn[e+4].query===t)&&(Bn[e].style.cssText=Bn[e+1],Bn[e].getBBox&&Bn[e].setAttribute("transform",Bn[e+2]||""),Bn[e+3].uncache=1)},Hp=function(){return ne.forEach(function(t){return pn(t)&&++t.cacheID&&(t.rec=t())})},uh=function(t,e){var n;for(Mn=0;Mn<te.length;Mn++)n=te[Mn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));bo=!0,e&&kp(e),e||Jr("revert")},Vp=function(t,e){ne.cache++,(e||!yn)&&ne.forEach(function(n){return pn(n)&&n.cacheID++&&(n.rec=0)}),zn(t)&&(ee.history.scrollRestoration=rh=t)},yn,qr=0,hf,Cg=function(){if(hf!==qr){var t=hf=qr;requestAnimationFrame(function(){return t===qr&&Br(!0)})}},Gp=function(){de.appendChild(Is),sh=!Sn&&Is.offsetHeight||ee.innerHeight,de.removeChild(Is)},ff=function(t){return Go(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Br=function(t,e){if(Hn=ge.documentElement,de=ge.body,ih=[ee,ge,Hn,de],si&&!t&&!bo){Qe(Wt,"scrollEnd",zp);return}Gp(),yn=Wt.isRefreshing=!0,bo||Hp();var n=Jr("refreshInit");Cp&&Wt.sort(),e||uh(),ne.forEach(function(i){pn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),te.slice(0).forEach(function(i){return i.refresh()}),bo=!1,te.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Yc=1,ff(!0),te.forEach(function(i){var s=Mi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),ff(!1),Yc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ne.forEach(function(i){pn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Vp(rh,1),ll.pause(),qr++,yn=2,ki(2),te.forEach(function(i){return pn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),yn=Wt.isRefreshing=!1,Jr("refresh")},$c=0,Wa=1,Po,ki=function(t){if(t===2||!yn&&!bo){Wt.isUpdating=!0,Po&&Po.update(0);var e=te.length,n=fn(),i=n-Hl>=50,s=e&&te[0].scroll();if(Wa=$c>s?-1:1,yn||($c=s),i&&(si&&!Sl&&n-si>200&&(si=0,Jr("scrollEnd")),fo=Hl,Hl=n),Wa<0){for(Mn=e;Mn-- >0;)te[Mn]&&te[Mn].update(0,i);Wa=1}else for(Mn=0;Mn<e;Mn++)te[Mn]&&te[Mn].update(0,i);Wt.isUpdating=!1}Wo=0},Kc=[Op,Fp,ah,oh,jn+Ro,jn+wo,jn+Co,jn+Ao,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Xa=Kc.concat([Xr,Yr,"boxSizing","max"+Gs,"max"+lh,"position",jn,Ge,Ge+Co,Ge+wo,Ge+Ro,Ge+Ao]),Rg=function(t,e,n){Us(n);var i=t._gsap;if(i.spacerIsNative)Us(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Gl=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Kc.length,o=e.style,a=t.style,l;s--;)l=Kc[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[ah]=a[oh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Xr]=cl(t,En)+Xe,o[Yr]=cl(t,Ye)+Xe,o[Ge]=a[jn]=a[Fp]=a[Op]="0",Us(i),a[Xr]=a["max"+Gs]=n[Xr],a[Yr]=a["max"+lh]=n[Yr],a[Ge]=n[Ge],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},Pg=/([A-Z])/g,Us=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||Mt.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(Pg,"-$1").toLowerCase())}},ha=function(t){for(var e=Xa.length,n=t.style,i=[],s=0;s<e;s++)i.push(Xa[s],n[Xa[s]]);return i.t=t,i},Lg=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},Ya={left:0,top:0},df=function(t,e,n,i,s,o,a,l,c,u,d,h,f,m){pn(t)&&(t=t(l)),zn(t)&&t.substr(0,3)==="max"&&(t=h+(t.charAt(4)==="="?Va("0"+t.substr(3),n):0));var g=f?f.time():0,p,_,S;if(f&&f.seek(0),isNaN(t)||(t=+t),_o(t))f&&(t=Mt.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,h,t)),a&&Ga(a,n,i,!0);else{pn(e)&&(e=e(l));var x=(t||"0").split(" "),M,A,w,y;S=Tn(e,l)||de,M=Ni(S)||{},(!M||!M.left&&!M.top)&&Qn(S).display==="none"&&(y=S.style.display,S.style.display="block",M=Ni(S),y?S.style.display=y:S.style.removeProperty("display")),A=Va(x[0],M[i.d]),w=Va(x[1]||"0",n),t=M[i.p]-c[i.p]-u+A+s-w,a&&Ga(a,w,i,n-w<20||a._isStart&&w>20),n-=n-w}if(m&&(l[m]=t||-.001,t<0&&(t=0)),o){var R=t+n,D=o._isStart;p="scroll"+i.d2,Ga(o,R,i,D&&R>20||!D&&(d?Math.max(de[p],Hn[p]):o.parentNode[p])<=R+1),d&&(c=Ni(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Xe))}return f&&S&&(p=Ni(S),f.seek(h),_=Ni(S),f._caScrollDist=p[i.p]-_[i.p],t=t/f._caScrollDist*h),f&&f.seek(g),f?t:Math.round(t)},Dg=/(webkit|moz|length|cssText|inset)/i,pf=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===de){t._stOrig=s.cssText,a=Qn(t);for(o in a)!+o&&!Dg.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;Mt.core.getCache(t).uncache=1,e.appendChild(t)}},Wp=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},fa=function(t,e,n){var i={};i[e.p]="+="+n,Mt.set(t,i)},mf=function(t,e){var n=pr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,u,d){var h=o.tween,f=l.onComplete,m={};c=c||n();var g=Wp(n,c,function(){h.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,h&&h.kill(),l[i]=a,l.inherit=!1,l.modifiers=m,m[i]=function(){return g(c+u*h.ratio+d*h.ratio*h.ratio)},l.onUpdate=function(){ne.cache++,o.tween&&ki()},l.onComplete=function(){o.tween=0,f&&f.call(h)},h=o.tween=Mt.to(t,l),h};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Qe(t,"wheel",n.wheelHandler),Wt.isTouch&&Qe(t,"touchmove",n.wheelHandler),s},Wt=function(){function r(e,n){Ms||r.register(Mt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Xc(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!po){this.update=this.refresh=this.kill=_i;return}n=lf(zn(n)||_o(n)||n.nodeType?{trigger:n}:n,ca);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,h=s.trigger,f=s.pin,m=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,_=s.onScrubComplete,S=s.onSnapComplete,x=s.once,M=s.snap,A=s.pinReparent,w=s.pinSpacer,y=s.containerAnimation,R=s.fastScrollEnd,D=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?En:Ye,T=!d&&d!==0,I=Tn(n.scroller||ee),z=Mt.core.getCache(I),H=Kr(I),q=("pinType"in n?n.pinType:ar(I,"pinType")||H&&"fixed")==="fixed",k=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Y=T&&n.toggleActions.split(" "),W="markers"in n?n.markers:ca.markers,it=H?0:parseFloat(Qn(I)["border"+v.p2+Gs])||0,P=this,at=n.onRefreshInit&&function(){return n.onRefreshInit(P)},zt=yg(I,H,v),Yt=Eg(I,H),$=0,Q=0,ft=0,ot=pr(I,v),At,yt,Xt,Gt,Ot,L,oe,Ft,kt,B,jt,Dt,C,E,X,J,et,Z,St,rt,dt,Vt,nt,vt,xt,Ut,gt,qt,Bt,ae,N,tt,K,j,lt,ct,$t,xe,Ae;if(P._startClamp=P._endClamp=!1,P._dir=v,p*=45,P.scroller=I,P.scroll=y?y.time.bind(y):ot,Gt=ot(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(Cp=1,n.refreshPriority===-9999&&(Po=P)),z.tweenScroll=z.tweenScroll||{top:mf(I,Ye),left:mf(I,En)},P.tweenTo=At=z.tweenScroll[v.p],P.scrubDuration=function(pt){K=_o(pt)&&pt,K?tt?tt.duration(pt):tt=Mt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:K,paused:!0,onComplete:function(){return _&&_(P)}}):(tt&&tt.progress(1).kill(),tt=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(d),ae=0,l||(l=i.vars.id)),M&&((!Lr(M)||M.push)&&(M={snapTo:M}),"scrollBehavior"in de.style&&Mt.set(H?[de,Hn]:I,{scrollBehavior:"auto"}),ne.forEach(function(pt){return pn(pt)&&pt.target===(H?ge.scrollingElement||Hn:I)&&(pt.smooth=!1)}),Xt=pn(M.snapTo)?M.snapTo:M.snapTo==="labels"?bg(i):M.snapTo==="labelsDirectional"?wg(i):M.directional!==!1?function(pt,It){return ch(M.snapTo)(pt,fn()-Q<500?0:It.direction)}:Mt.utils.snap(M.snapTo),j=M.duration||{min:.1,max:2},j=Lr(j)?To(j.min,j.max):To(j,j),lt=Mt.delayedCall(M.delay||K/2||.1,function(){var pt=ot(),It=fn()-Q<500,Pt=At.tween;if((It||Math.abs(P.getVelocity())<10)&&!Pt&&!Sl&&$!==pt){var Ht=(pt-L)/E,Fe=i&&!T?i.totalProgress():Ht,Kt=It?0:(Fe-N)/(fn()-fo)*1e3||0,Ce=Mt.utils.clamp(-Ht,1-Ht,rs(Kt/2)*Kt/.185),Be=Ht+(M.inertia===!1?0:Ce),Te,Se,_e=M,Un=_e.onStart,be=_e.onInterrupt,b=_e.onComplete;if(Te=Xt(Be,P),_o(Te)||(Te=Be),Se=Math.max(0,Math.round(L+Te*E)),pt<=oe&&pt>=L&&Se!==pt){if(Pt&&!Pt._initted&&Pt.data<=rs(Se-pt))return;M.inertia===!1&&(Ce=Te-Ht),At(Se,{duration:j(rs(Math.max(rs(Be-Fe),rs(Te-Fe))*.185/Kt/.05||0)),ease:M.ease||"power3",data:rs(Se-pt),onInterrupt:function(){return lt.restart(!0)&&be&&is(P,be)},onComplete:function(){P.update(),$=ot(),i&&!T&&(tt?tt.resetTo("totalProgress",Te,i._tTime/i._tDur):i.progress(Te)),ae=N=i&&!T?i.totalProgress():P.progress,S&&S(P),b&&is(P,b)}},pt,Ce*E,Se-pt-Ce*E),Un&&is(P,Un,At.tween)}}else P.isActive&&$!==pt&&lt.restart(!0)}).pause()),l&&(qc[l]=P),h=P.trigger=Tn(h||f!==!0&&f),Ae=h&&h._gsap&&h._gsap.stRevert,Ae&&(Ae=Ae(P)),f=f===!0?h:Tn(f),zn(a)&&(a={targets:h,className:a}),f&&(m===!1||m===jn||(m=!m&&f.parentNode&&f.parentNode.style&&Qn(f.parentNode).display==="flex"?!1:Ge),P.pin=f,yt=Mt.core.getCache(f),yt.spacer?X=yt.pinState:(w&&(w=Tn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),yt.spacerIsNative=!!w,w&&(yt.spacerState=ha(w))),yt.spacer=Z=w||ge.createElement("div"),Z.classList.add("pin-spacer"),l&&Z.classList.add("pin-spacer-"+l),yt.pinState=X=ha(f)),n.force3D!==!1&&Mt.set(f,{force3D:!0}),P.spacer=Z=yt.spacer,Bt=Qn(f),vt=Bt[m+v.os2],rt=Mt.getProperty(f),dt=Mt.quickSetter(f,v.a,Xe),Gl(f,Z,Bt),et=ha(f)),W){Dt=Lr(W)?lf(W,cf):cf,B=ua("scroller-start",l,I,v,Dt,0),jt=ua("scroller-end",l,I,v,Dt,0,B),St=B["offset"+v.op.d2];var re=Tn(ar(I,"content")||I);Ft=this.markerStart=ua("start",l,re,v,Dt,St,0,y),kt=this.markerEnd=ua("end",l,re,v,Dt,St,0,y),y&&(xe=Mt.quickSetter([Ft,kt],v.a,Xe)),!q&&!(yi.length&&ar(I,"fixedMarkers")===!0)&&(Tg(H?de:I),Mt.set([B,jt],{force3D:!0}),Ut=Mt.quickSetter(B,v.a,Xe),qt=Mt.quickSetter(jt,v.a,Xe))}if(y){var Rt=y.vars.onUpdate,Tt=y.vars.onUpdateParams;y.eventCallback("onUpdate",function(){P.update(0,0,1),Rt&&Rt.apply(y,Tt||[])})}if(P.previous=function(){return te[te.indexOf(P)-1]},P.next=function(){return te[te.indexOf(P)+1]},P.revert=function(pt,It){if(!It)return P.kill(!0);var Pt=pt!==!1||!P.enabled,Ht=hn;Pt!==P.isReverted&&(Pt&&(ct=Math.max(ot(),P.scroll.rec||0),ft=P.progress,$t=i&&i.progress()),Ft&&[Ft,kt,B,jt].forEach(function(Fe){return Fe.style.display=Pt?"none":"block"}),Pt&&(hn=P,P.update(Pt)),f&&(!A||!P.isActive)&&(Pt?Rg(f,Z,X):Gl(f,Z,Qn(f),xt)),Pt||P.update(Pt),hn=Ht,P.isReverted=Pt)},P.refresh=function(pt,It,Pt,Ht){if(!((hn||!P.enabled)&&!It)){if(f&&pt&&si){Qe(r,"scrollEnd",zp);return}!yn&&at&&at(P),hn=P,At.tween&&!Pt&&(At.tween.kill(),At.tween=0),tt&&tt.pause(),g&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Qt){return Qt.vars.immediateRender&&Qt.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var Fe=zt(),Kt=Yt(),Ce=y?y.duration():Mi(I,v),Be=E<=.01||!E,Te=0,Se=Ht||0,_e=Lr(Pt)?Pt.end:n.end,Un=n.endTrigger||h,be=Lr(Pt)?Pt.start:n.start||(n.start===0||!h?0:f?"0 0":"0 100%"),b=P.pinnedContainer=n.pinnedContainer&&Tn(n.pinnedContainer,P),F=h&&Math.max(0,te.indexOf(P))||0,V=F,G,O,st,_t,ht,ut,Ct,Nt,bt,le,se,ve,Ze;for(W&&Lr(Pt)&&(ve=Mt.getProperty(B,v.p),Ze=Mt.getProperty(jt,v.p));V-- >0;)ut=te[V],ut.end||ut.refresh(0,1)||(hn=P),Ct=ut.pin,Ct&&(Ct===h||Ct===f||Ct===b)&&!ut.isReverted&&(le||(le=[]),le.unshift(ut),ut.revert(!0,!0)),ut!==te[V]&&(F--,V--);for(pn(be)&&(be=be(P)),be=rf(be,"start",P),L=df(be,h,Fe,v,ot(),Ft,B,P,Kt,it,q,Ce,y,P._startClamp&&"_startClamp")||(f?-.001:0),pn(_e)&&(_e=_e(P)),zn(_e)&&!_e.indexOf("+=")&&(~_e.indexOf(" ")?_e=(zn(be)?be.split(" ")[0]:"")+_e:(Te=Va(_e.substr(2),Fe),_e=zn(be)?be:(y?Mt.utils.mapRange(0,y.duration(),y.scrollTrigger.start,y.scrollTrigger.end,L):L)+Te,Un=h)),_e=rf(_e,"end",P),oe=Math.max(L,df(_e||(Un?"100% 0":Ce),Un,Fe,v,ot()+Te,kt,jt,P,Kt,it,q,Ce,y,P._endClamp&&"_endClamp"))||-.001,Te=0,V=F;V--;)ut=te[V]||{},Ct=ut.pin,Ct&&ut.start-ut._pinPush<=L&&!y&&ut.end>0&&(G=ut.end-(P._startClamp?Math.max(0,ut.start):ut.start),(Ct===h&&ut.start-ut._pinPush<L||Ct===b)&&isNaN(be)&&(Te+=G*(1-ut.progress)),Ct===f&&(Se+=G));if(L+=Te,oe+=Te,P._startClamp&&(P._startClamp+=Te),P._endClamp&&!yn&&(P._endClamp=oe||-.001,oe=Math.min(oe,Mi(I,v))),E=oe-L||(L-=.01)&&.001,Be&&(ft=Mt.utils.clamp(0,1,Mt.utils.normalize(L,oe,ct))),P._pinPush=Se,Ft&&Te&&(G={},G[v.a]="+="+Te,b&&(G[v.p]="-="+ot()),Mt.set([Ft,kt],G)),f&&!(Yc&&P.end>=Mi(I,v)))G=Qn(f),_t=v===Ye,st=ot(),Vt=parseFloat(rt(v.a))+Se,!Ce&&oe>1&&(se=(H?ge.scrollingElement||Hn:I).style,se={style:se,value:se["overflow"+v.a.toUpperCase()]},H&&Qn(de)["overflow"+v.a.toUpperCase()]!=="scroll"&&(se.style["overflow"+v.a.toUpperCase()]="scroll")),Gl(f,Z,G),et=ha(f),O=Ni(f,!0),Nt=q&&pr(I,_t?En:Ye)(),m?(xt=[m+v.os2,E+Se+Xe],xt.t=Z,V=m===Ge?cl(f,v)+E+Se:0,V&&(xt.push(v.d,V+Xe),Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=V+Xe)),Us(xt),b&&te.forEach(function(Qt){Qt.pin===b&&Qt.vars.pinSpacing!==!1&&(Qt._subPinOffset=!0)}),q&&ot(ct)):(V=cl(f,v),V&&Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=V+Xe)),q&&(ht={top:O.top+(_t?st-L:Nt)+Xe,left:O.left+(_t?Nt:st-L)+Xe,boxSizing:"border-box",position:"fixed"},ht[Xr]=ht["max"+Gs]=Math.ceil(O.width)+Xe,ht[Yr]=ht["max"+lh]=Math.ceil(O.height)+Xe,ht[jn]=ht[jn+Co]=ht[jn+wo]=ht[jn+Ro]=ht[jn+Ao]="0",ht[Ge]=G[Ge],ht[Ge+Co]=G[Ge+Co],ht[Ge+wo]=G[Ge+wo],ht[Ge+Ro]=G[Ge+Ro],ht[Ge+Ao]=G[Ge+Ao],J=Lg(X,ht,A),yn&&ot(0)),i?(bt=i._initted,zl(1),i.render(i.duration(),!0,!0),nt=rt(v.a)-Vt+E+Se,gt=Math.abs(E-nt)>1,q&&gt&&J.splice(J.length-2,2),i.render(0,!0,!0),bt||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),zl(0)):nt=E,se&&(se.value?se.style["overflow"+v.a.toUpperCase()]=se.value:se.style.removeProperty("overflow-"+v.a));else if(h&&ot()&&!y)for(O=h.parentNode;O&&O!==de;)O._pinOffset&&(L-=O._pinOffset,oe-=O._pinOffset),O=O.parentNode;le&&le.forEach(function(Qt){return Qt.revert(!1,!0)}),P.start=L,P.end=oe,Gt=Ot=yn?ct:ot(),!y&&!yn&&(Gt<ct&&ot(ct),P.scroll.rec=0),P.revert(!1,!0),Q=fn(),lt&&($=-1,lt.restart(!0)),hn=0,i&&T&&(i._initted||$t)&&i.progress()!==$t&&i.progress($t||0,!0).render(i.time(),!0,!0),(Be||ft!==P.progress||y||g||i&&!i._initted)&&(i&&!T&&(i._initted||ft||i.vars.immediateRender!==!1)&&i.totalProgress(y&&L<-.001&&!ft?Mt.utils.normalize(L,oe,0):ft,!0),P.progress=Be||(Gt-L)/E===ft?0:ft),f&&m&&(Z._pinOffset=Math.round(P.progress*nt)),tt&&tt.invalidate(),isNaN(ve)||(ve-=Mt.getProperty(B,v.p),Ze-=Mt.getProperty(jt,v.p),fa(B,v,ve),fa(Ft,v,ve-(Ht||0)),fa(jt,v,Ze),fa(kt,v,Ze-(Ht||0))),Be&&!yn&&P.update(),u&&!yn&&!C&&(C=!0,u(P),C=!1)}},P.getVelocity=function(){return(ot()-Ot)/(fn()-fo)*1e3||0},P.endAnimation=function(){ro(P.callbackAnimation),i&&(tt?tt.progress(1):i.paused()?T||ro(i,P.direction<0,1):ro(i,i.reversed()))},P.labelToScroll=function(pt){return i&&i.labels&&(L||P.refresh()||L)+i.labels[pt]/i.duration()*E||0},P.getTrailing=function(pt){var It=te.indexOf(P),Pt=P.direction>0?te.slice(0,It).reverse():te.slice(It+1);return(zn(pt)?Pt.filter(function(Ht){return Ht.vars.preventOverlaps===pt}):Pt).filter(function(Ht){return P.direction>0?Ht.end<=L:Ht.start>=oe})},P.update=function(pt,It,Pt){if(!(y&&!Pt&&!pt)){var Ht=yn===!0?ct:P.scroll(),Fe=pt?0:(Ht-L)/E,Kt=Fe<0?0:Fe>1?1:Fe||0,Ce=P.progress,Be,Te,Se,_e,Un,be,b,F;if(It&&(Ot=Gt,Gt=y?ot():Ht,M&&(N=ae,ae=i&&!T?i.totalProgress():Kt)),p&&f&&!hn&&!sa&&si&&(!Kt&&L<Ht+(Ht-Ot)/(fn()-fo)*p?Kt=1e-4:Kt===1&&oe>Ht+(Ht-Ot)/(fn()-fo)*p&&(Kt=.9999)),Kt!==Ce&&P.enabled){if(Be=P.isActive=!!Kt&&Kt<1,Te=!!Ce&&Ce<1,be=Be!==Te,Un=be||!!Kt!=!!Ce,P.direction=Kt>Ce?1:-1,P.progress=Kt,Un&&!hn&&(Se=Kt&&!Ce?0:Kt===1?1:Ce===1?2:3,T&&(_e=!be&&Y[Se+1]!=="none"&&Y[Se+1]||Y[Se],F=i&&(_e==="complete"||_e==="reset"||_e in i))),D&&(be||F)&&(F||d||!i)&&(pn(D)?D(P):P.getTrailing(D).forEach(function(st){return st.endAnimation()})),T||(tt&&!hn&&!sa?(tt._dp._time-tt._start!==tt._time&&tt.render(tt._dp._time-tt._start),tt.resetTo?tt.resetTo("totalProgress",Kt,i._tTime/i._tDur):(tt.vars.totalProgress=Kt,tt.invalidate().restart())):i&&i.totalProgress(Kt,!!(hn&&(Q||pt)))),f){if(pt&&m&&(Z.style[m+v.os2]=vt),!q)dt(mo(Vt+nt*Kt));else if(Un){if(b=!pt&&Kt>Ce&&oe+1>Ht&&Ht+1>=Mi(I,v),A)if(!pt&&(Be||b)){var V=Ni(f,!0),G=Ht-L;pf(f,de,V.top+(v===Ye?G:0)+Xe,V.left+(v===Ye?0:G)+Xe)}else pf(f,Z);Us(Be||b?J:et),gt&&Kt<1&&Be||dt(Vt+(Kt===1&&!b?nt:0))}}M&&!At.tween&&!hn&&!sa&&lt.restart(!0),a&&(be||x&&Kt&&(Kt<1||!kl))&&Go(a.targets).forEach(function(st){return st.classList[Be||x?"add":"remove"](a.className)}),o&&!T&&!pt&&o(P),Un&&!hn?(T&&(F&&(_e==="complete"?i.pause().totalProgress(1):_e==="reset"?i.restart(!0).pause():_e==="restart"?i.restart(!0):i[_e]()),o&&o(P)),(be||!kl)&&(c&&be&&is(P,c),k[Se]&&is(P,k[Se]),x&&(Kt===1?P.kill(!1,1):k[Se]=0),be||(Se=Kt===1?1:3,k[Se]&&is(P,k[Se]))),R&&!Be&&Math.abs(P.getVelocity())>(_o(R)?R:2500)&&(ro(P.callbackAnimation),tt?tt.progress(1):ro(i,_e==="reverse"?1:!Kt,1))):T&&o&&!hn&&o(P)}if(qt){var O=y?Ht/y.duration()*(y._caScrollDist||0):Ht;Ut(O+(B._isFlipped?1:0)),qt(O)}xe&&xe(-Ht/y.duration()*(y._caScrollDist||0))}},P.enable=function(pt,It){P.enabled||(P.enabled=!0,Qe(I,"resize",go),H||Qe(I,"scroll",ss),at&&Qe(r,"refreshInit",at),pt!==!1&&(P.progress=ft=0,Gt=Ot=$=ot()),It!==!1&&P.refresh())},P.getTween=function(pt){return pt&&At?At.tween:tt},P.setPositions=function(pt,It,Pt,Ht){if(y){var Fe=y.scrollTrigger,Kt=y.duration(),Ce=Fe.end-Fe.start;pt=Fe.start+Ce*pt/Kt,It=Fe.start+Ce*It/Kt}P.refresh(!1,!1,{start:sf(pt,Pt&&!!P._startClamp),end:sf(It,Pt&&!!P._endClamp)},Ht),P.update()},P.adjustPinSpacing=function(pt){if(xt&&pt){var It=xt.indexOf(v.d)+1;xt[It]=parseFloat(xt[It])+pt+Xe,xt[1]=parseFloat(xt[1])+pt+Xe,Us(xt)}},P.disable=function(pt,It){if(pt!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,It||tt&&tt.pause(),ct=0,yt&&(yt.uncache=1),at&&je(r,"refreshInit",at),lt&&(lt.pause(),At.tween&&At.tween.kill()&&(At.tween=0)),!H)){for(var Pt=te.length;Pt--;)if(te[Pt].scroller===I&&te[Pt]!==P)return;je(I,"resize",go),H||je(I,"scroll",ss)}},P.kill=function(pt,It){P.disable(pt,It),tt&&!It&&tt.kill(),l&&delete qc[l];var Pt=te.indexOf(P);Pt>=0&&te.splice(Pt,1),Pt===Mn&&Wa>0&&Mn--,Pt=0,te.forEach(function(Ht){return Ht.scroller===P.scroller&&(Pt=1)}),Pt||yn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,pt&&i.revert({kill:!1}),It||i.kill()),Ft&&[Ft,kt,B,jt].forEach(function(Ht){return Ht.parentNode&&Ht.parentNode.removeChild(Ht)}),Po===P&&(Po=0),f&&(yt&&(yt.uncache=1),Pt=0,te.forEach(function(Ht){return Ht.pin===f&&Pt++}),Pt||(yt.spacer=0)),n.onKill&&n.onKill(P)},te.push(P),P.enable(!1,!1),Ae&&Ae(P),i&&i.add&&!E){var ue=P.update;P.update=function(){P.update=ue,ne.cache++,L||oe||P.refresh()},Mt.delayedCall(.01,P.update),E=.01,L=oe=0}else P.refresh();f&&Cg()},r.register=function(n){return Ms||(Mt=n||Ip(),Dp()&&window.document&&r.enable(),Ms=po),Ms},r.defaults=function(n){if(n)for(var i in n)ca[i]=n[i];return ca},r.disable=function(n,i){po=0,te.forEach(function(o){return o[i?"kill":"disable"](n)}),je(ee,"wheel",ss),je(ge,"scroll",ss),clearInterval(ra),je(ge,"touchcancel",_i),je(de,"touchstart",_i),aa(je,ge,"pointerdown,touchstart,mousedown",of),aa(je,ge,"pointerup,touchend,mouseup",af),ll.kill(),oa(je);for(var s=0;s<ne.length;s+=3)la(je,ne[s],ne[s+1]),la(je,ne[s],ne[s+2])},r.enable=function(){if(ee=window,ge=document,Hn=ge.documentElement,de=ge.body,Mt){if(Go=Mt.utils.toArray,To=Mt.utils.clamp,Xc=Mt.core.context||_i,zl=Mt.core.suppressOverwrites||_i,rh=ee.history.scrollRestoration||"auto",$c=ee.pageYOffset||0,Mt.core.globals("ScrollTrigger",r),de){po=1,Is=document.createElement("div"),Is.style.height="100vh",Is.style.position="absolute",Gp(),Mg(),He.register(Mt),r.isTouch=He.isTouch,ji=He.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Wc=He.isTouch===1,Qe(ee,"wheel",ss),ih=[ee,ge,Hn,de],Mt.matchMedia?(r.matchMedia=function(u){var d=Mt.matchMedia(),h;for(h in u)d.add(h,u[h]);return d},Mt.addEventListener("matchMediaInit",function(){Hp(),uh()}),Mt.addEventListener("matchMediaRevert",function(){return kp()}),Mt.addEventListener("matchMedia",function(){Br(0,1),Jr("matchMedia")}),Mt.matchMedia().add("(orientation: portrait)",function(){return Vl(),Vl})):console.warn("Requires GSAP 3.11.0 or later"),Vl(),Qe(ge,"scroll",ss);var n=de.hasAttribute("style"),i=de.style,s=i.borderTopStyle,o=Mt.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Ni(de),Ye.m=Math.round(a.top+Ye.sc())||0,En.m=Math.round(a.left+En.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(de.setAttribute("style",""),de.removeAttribute("style")),ra=setInterval(uf,250),Mt.delayedCall(.5,function(){return sa=0}),Qe(ge,"touchcancel",_i),Qe(de,"touchstart",_i),aa(Qe,ge,"pointerdown,touchstart,mousedown",of),aa(Qe,ge,"pointerup,touchend,mouseup",af),Gc=Mt.utils.checkPrefix("transform"),Xa.push(Gc),Ms=fn(),ll=Mt.delayedCall(.2,Br).pause(),ys=[ge,"visibilitychange",function(){var u=ee.innerWidth,d=ee.innerHeight;ge.hidden?(ef=u,nf=d):(ef!==u||nf!==d)&&go()},ge,"DOMContentLoaded",Br,ee,"load",Br,ee,"resize",go],oa(Qe),te.forEach(function(u){return u.enable(0,1)}),l=0;l<ne.length;l+=3)la(je,ne[l],ne[l+1]),la(je,ne[l],ne[l+2])}else if(ge){var c=function u(){r.enable(),ge.removeEventListener("DOMContentLoaded",u)};ge.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(kl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ra)||(ra=i)&&setInterval(uf,i),"ignoreMobileResize"in n&&(Wc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(oa(je)||oa(Qe,n.autoRefreshEvents||"none"),Rp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Tn(n),o=ne.indexOf(s),a=Kr(s);~o&&ne.splice(o,a?6:2),i&&(a?yi.unshift(ee,i,de,i,Hn,i):yi.unshift(s,i))},r.clearMatchMedia=function(n){te.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(zn(n)?Tn(n):n).getBoundingClientRect(),a=o[s?Xr:Yr]*i||0;return s?o.right-a>0&&o.left+a<ee.innerWidth:o.bottom-a>0&&o.top+a<ee.innerHeight},r.positionInViewport=function(n,i,s){zn(n)&&(n=Tn(n));var o=n.getBoundingClientRect(),a=o[s?Xr:Yr],l=i==null?a/2:i in ul?ul[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ee.innerWidth:(o.top+l)/ee.innerHeight},r.killAll=function(n){if(te.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Zr.killAll||[];Zr={},i.forEach(function(s){return s()})}},r}();Wt.version="3.15.0";Wt.saveStyles=function(r){return r?Go(r).forEach(function(t){if(t&&t.style){var e=Bn.indexOf(t);e>=0&&Bn.splice(e,5),Bn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Mt.core.getCache(t),Xc())}}):Bn};Wt.revert=function(r,t){return uh(!r,t)};Wt.create=function(r,t){return new Wt(r,t)};Wt.refresh=function(r){return r?go(!0):(Ms||Wt.register())&&Br(!0)};Wt.update=function(r){return++ne.cache&&ki(r===!0?2:0)};Wt.clearScrollMemory=Vp;Wt.maxScroll=function(r,t){return Mi(r,t?En:Ye)};Wt.getScrollFunc=function(r,t){return pr(Tn(r),t?En:Ye)};Wt.getById=function(r){return qc[r]};Wt.getAll=function(){return te.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Wt.isScrolling=function(){return!!si};Wt.snapDirectional=ch;Wt.addEventListener=function(r,t){var e=Zr[r]||(Zr[r]=[]);~e.indexOf(t)||e.push(t)};Wt.removeEventListener=function(r,t){var e=Zr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};Wt.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var d=[],h=[],f=Mt.delayedCall(i,function(){u(d,h),d=[],h=[]}).pause();return function(m){d.length||f.restart(!0),d.push(m.trigger),h.push(m),s<=d.length&&f.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&pn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return pn(s)&&(s=s(),Qe(Wt,"refresh",function(){return s=t.batchMax()})),Go(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(Wt.create(c))}),e};var _f=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Wl=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(He.isTouch?" pinch-zoom":""):"none",t===Hn&&r(de,e)},da={auto:1,scroll:1},Ig=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Mt.core.getCache(s),a=fn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==de&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(da[(l=Qn(s)).overflowY]||da[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Kr(s)&&(da[(l=Qn(s)).overflowY]||da[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},Xp=function(t,e,n,i){return He.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&Ig,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Qe(ge,He.eventTypes[0],vf,!1,!0)},onDisable:function(){return je(ge,He.eventTypes[0],vf,!0)}})},Ug=/(input|label|select|textarea)/i,gf,vf=function(t){var e=Ug.test(t.target.tagName);(e||gf)&&(t._gsapAllow=!0,gf=e)},Ng=function(t){Lr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Tn(t.target)||Hn,u=Mt.core.globals().ScrollSmoother,d=u&&u.get(),h=ji&&(t.content&&Tn(t.content)||d&&t.content!==!1&&!d.smooth()&&d.content()),f=pr(c,Ye),m=pr(c,En),g=1,p=(He.isTouch&&ee.visualViewport?ee.visualViewport.scale*ee.visualViewport.width:ee.outerWidth)/ee.innerWidth,_=0,S=pn(i)?function(){return i(a)}:function(){return i||2.8},x,M,A=Xp(c,t.type,!0,s),w=function(){return M=!1},y=_i,R=_i,D=function(){l=Mi(c,Ye),R=To(ji?1:0,l),n&&(y=To(0,Mi(c,En))),x=qr},v=function(){h._gsap.y=mo(parseFloat(h._gsap.y)+f.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},T=function(){if(M){requestAnimationFrame(w);var W=mo(a.deltaY/2),it=R(f.v-W);if(h&&it!==f.v+f.offset){f.offset=it-f.v;var P=mo((parseFloat(h&&h._gsap.y)||0)-f.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",h._gsap.y=P+"px",f.cacheID=ne.cache,ki()}return!0}f.offset&&v(),M=!0},I,z,H,q,k=function(){D(),I.isActive()&&I.vars.scrollY>l&&(f()>l?I.progress(1)&&f(l):I.resetTo("scrollY",l))};return h&&Mt.set(h,{y:"+=0"}),t.ignoreCheck=function(Y){return ji&&Y.type==="touchmove"&&T()||g>1.05&&Y.type!=="touchstart"||a.isGesturing||Y.touches&&Y.touches.length>1},t.onPress=function(){M=!1;var Y=g;g=mo((ee.visualViewport&&ee.visualViewport.scale||1)/p),I.pause(),Y!==g&&Wl(c,g>1.01?!0:n?!1:"x"),z=m(),H=f(),D(),x=qr},t.onRelease=t.onGestureStart=function(Y,W){if(f.offset&&v(),!W)q.restart(!0);else{ne.cache++;var it=S(),P,at;n&&(P=m(),at=P+it*.05*-Y.velocityX/.227,it*=_f(m,P,at,Mi(c,En)),I.vars.scrollX=y(at)),P=f(),at=P+it*.05*-Y.velocityY/.227,it*=_f(f,P,at,Mi(c,Ye)),I.vars.scrollY=R(at),I.invalidate().duration(it).play(.01),(ji&&I.vars.scrollY>=l||P>=l-1)&&Mt.to({},{onUpdate:k,duration:it})}o&&o(Y)},t.onWheel=function(){I._ts&&I.pause(),fn()-_>1e3&&(x=0,_=fn())},t.onChange=function(Y,W,it,P,at){if(qr!==x&&D(),W&&n&&m(y(P[2]===W?z+(Y.startX-Y.x):m()+W-P[1])),it){f.offset&&v();var zt=at[2]===it,Yt=zt?H+Y.startY-Y.y:f()+it-at[1],$=R(Yt);zt&&Yt!==$&&(H+=$-Yt),f($)}(it||W)&&ki()},t.onEnable=function(){Wl(c,n?!1:"x"),Wt.addEventListener("refresh",k),Qe(ee,"resize",k),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=m.smooth=!1),A.enable()},t.onDisable=function(){Wl(c,!0),je(ee,"resize",k),Wt.removeEventListener("refresh",k),A.kill()},t.lockAxis=t.lockAxis!==!1,a=new He(t),a.iOS=ji,ji&&!f()&&f(1),ji&&Mt.ticker.add(_i),q=a._dc,I=Mt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Wp(f,f(),function(){return I.pause()})},onUpdate:ki,onComplete:q.vars.onComplete}),a};Wt.sort=function(r){if(pn(r))return te.sort(r);var t=ee.pageYOffset||0;return Wt.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ee.innerHeight}),te.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Wt.observe=function(r){return new He(r)};Wt.normalizeScroll=function(r){if(typeof r>"u")return Sn;if(r===!0&&Sn)return Sn.enable();if(r===!1){Sn&&Sn.kill(),Sn=r;return}var t=r instanceof He?r:Ng(r);return Sn&&Sn.target===t.target&&Sn.kill(),Kr(t.target)&&(Sn=t),t};Wt.core={_getVelocityProp:Vc,_inputObserver:Xp,_scrollers:ne,_proxies:yi,bridge:{ss:function(){si||Jr("scrollStart"),si=fn()},ref:function(){return hn}}};Ip()&&Mt.registerPlugin(Wt);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hh="169",Og=0,xf=1,Fg=2,Yp=1,Bg=2,Di=3,mr=0,Pn=1,Oi=2,lr=0,Ns=1,Sf=2,Mf=3,yf=4,zg=5,Ur=100,kg=101,Hg=102,Vg=103,Gg=104,Wg=200,Xg=201,Yg=202,qg=203,Zc=204,Jc=205,$g=206,Kg=207,Zg=208,Jg=209,jg=210,Qg=211,t0=212,e0=213,n0=214,jc=0,Qc=1,tu=2,Ws=3,eu=4,nu=5,iu=6,ru=7,qp=0,i0=1,r0=2,cr=0,s0=1,o0=2,a0=3,$p=4,l0=5,c0=6,u0=7,Kp=300,Xs=301,Ys=302,su=303,ou=304,Ml=306,au=1e3,zr=1001,lu=1002,ii=1003,h0=1004,pa=1005,hi=1006,Xl=1007,kr=1008,Gi=1009,Zp=1010,Jp=1011,Xo=1012,fh=1013,jr=1014,Bi=1015,Zo=1016,dh=1017,ph=1018,qs=1020,jp=35902,Qp=1021,tm=1022,di=1023,em=1024,nm=1025,Os=1026,$s=1027,im=1028,mh=1029,rm=1030,_h=1031,gh=1033,qa=33776,$a=33777,Ka=33778,Za=33779,cu=35840,uu=35841,hu=35842,fu=35843,du=36196,pu=37492,mu=37496,_u=37808,gu=37809,vu=37810,xu=37811,Su=37812,Mu=37813,yu=37814,Eu=37815,Tu=37816,bu=37817,wu=37818,Au=37819,Cu=37820,Ru=37821,Ja=36492,Pu=36494,Lu=36495,sm=36283,Du=36284,Iu=36285,Uu=36286,f0=3200,d0=3201,om=0,p0=1,Qi="",gi="srgb",vr="srgb-linear",vh="display-p3",yl="display-p3-linear",hl="linear",we="srgb",fl="rec709",dl="p3",os=7680,Ef=519,m0=512,_0=513,g0=514,am=515,v0=516,x0=517,S0=518,M0=519,Tf=35044,bf="300 es",zi=2e3,pl=2001;class js{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wf=1234567;const Lo=Math.PI/180,Yo=180/Math.PI;function Qs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(cn[r&255]+cn[r>>8&255]+cn[r>>16&255]+cn[r>>24&255]+"-"+cn[t&255]+cn[t>>8&255]+"-"+cn[t>>16&15|64]+cn[t>>24&255]+"-"+cn[e&63|128]+cn[e>>8&255]+"-"+cn[e>>16&255]+cn[e>>24&255]+cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function tn(r,t,e){return Math.max(t,Math.min(e,r))}function xh(r,t){return(r%t+t)%t}function y0(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function E0(r,t,e){return r!==t?(e-r)/(t-r):0}function Do(r,t,e){return(1-e)*r+e*t}function T0(r,t,e,n){return Do(r,t,1-Math.exp(-e*n))}function b0(r,t=1){return t-Math.abs(xh(r,t*2)-t)}function w0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function A0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function C0(r,t){return r+Math.floor(Math.random()*(t-r+1))}function R0(r,t){return r+Math.random()*(t-r)}function P0(r){return r*(.5-Math.random())}function L0(r){r!==void 0&&(wf=r);let t=wf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function D0(r){return r*Lo}function I0(r){return r*Yo}function U0(r){return(r&r-1)===0&&r!==0}function N0(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function O0(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function F0(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),u=o((t+n)/2),d=s((t-n)/2),h=o((t-n)/2),f=s((n-t)/2),m=o((n-t)/2);switch(i){case"XYX":r.set(a*u,l*d,l*h,a*c);break;case"YZY":r.set(l*h,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*h,a*u,a*c);break;case"XZX":r.set(a*u,l*m,l*f,a*c);break;case"YXY":r.set(l*f,a*u,l*m,a*c);break;case"ZYZ":r.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Es(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Nu={DEG2RAD:Lo,RAD2DEG:Yo,generateUUID:Qs,clamp:tn,euclideanModulo:xh,mapLinear:y0,inverseLerp:E0,lerp:Do,damp:T0,pingpong:b0,smoothstep:w0,smootherstep:A0,randInt:C0,randFloat:R0,randFloatSpread:P0,seededRandom:L0,degToRad:D0,radToDeg:I0,isPowerOfTwo:U0,ceilPowerOfTwo:N0,floorPowerOfTwo:O0,setQuaternionFromProperEuler:F0,normalize:vn,denormalize:Es};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(tn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,n,i,s,o,a,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],g=i[0],p=i[3],_=i[6],S=i[1],x=i[4],M=i[7],A=i[2],w=i[5],y=i[8];return s[0]=o*g+a*S+l*A,s[3]=o*p+a*x+l*w,s[6]=o*_+a*M+l*y,s[1]=c*g+u*S+d*A,s[4]=c*p+u*x+d*w,s[7]=c*_+u*M+d*y,s[2]=h*g+f*S+m*A,s[5]=h*p+f*x+m*w,s[8]=h*_+f*M+m*y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,m=e*d+n*h+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=d*g,t[1]=(i*c-u*n)*g,t[2]=(a*n-i*o)*g,t[3]=h*g,t[4]=(u*e-i*l)*g,t[5]=(i*s-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yl.makeScale(t,e)),this}rotate(t){return this.premultiply(Yl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yl=new Jt;function lm(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ml(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function B0(){const r=ml("canvas");return r.style.display="block",r}const Af={};function ja(r){r in Af||(Af[r]=!0,console.warn(r))}function z0(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function k0(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function H0(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Cf=new Jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Rf=new Jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),so={[vr]:{transfer:hl,primaries:fl,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[gi]:{transfer:we,primaries:fl,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[yl]:{transfer:hl,primaries:dl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(Rf),fromReference:r=>r.applyMatrix3(Cf)},[vh]:{transfer:we,primaries:dl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(Rf),fromReference:r=>r.applyMatrix3(Cf).convertLinearToSRGB()}},V0=new Set([vr,yl]),pe={enabled:!0,_workingColorSpace:vr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!V0.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=so[t].toReference,i=so[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return so[r].primaries},getTransfer:function(r){return r===Qi?hl:so[r].transfer},getLuminanceCoefficients:function(r,t=this._workingColorSpace){return r.fromArray(so[t].luminanceCoefficients)}};function Fs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ql(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let as;class G0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{as===void 0&&(as=ml("canvas")),as.width=t.width,as.height=t.height;const n=as.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=as}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ml("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Fs(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fs(e[n]/255)*255):e[n]=Fs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let W0=0;class cm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=Qs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push($l(i[o].image)):s.push($l(i[o]))}else s=$l(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function $l(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?G0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let X0=0;class Ln extends js{constructor(t=Ln.DEFAULT_IMAGE,e=Ln.DEFAULT_MAPPING,n=zr,i=zr,s=hi,o=kr,a=di,l=Gi,c=Ln.DEFAULT_ANISOTROPY,u=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=Qs(),this.name="",this.source=new cm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case au:t.x=t.x-Math.floor(t.x);break;case zr:t.x=t.x<0?0:1;break;case lu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case au:t.y=t.y-Math.floor(t.y);break;case zr:t.y=t.y<0?0:1;break;case lu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=Kp;Ln.DEFAULT_ANISOTROPY=1;class Ue{constructor(t=0,e=0,n=0,i=1){Ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],g=l[2],p=l[6],_=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+g)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,M=(f+1)/2,A=(_+1)/2,w=(u+h)/4,y=(d+g)/4,R=(m+p)/4;return x>M&&x>A?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=y/n):M>A?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=w/i,s=R/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=y/s,i=R/s),this.set(n,i,s,e),this}let S=Math.sqrt((p-m)*(p-m)+(d-g)*(d-g)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(p-m)/S,this.y=(d-g)/S,this.z=(h-u)/S,this.w=Math.acos((c+f+_-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Y0 extends js{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ln(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new cm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qr extends Y0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class um extends Ln{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ii,this.minFilter=ii,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class q0 extends Ln{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ii,this.minFilter=ii,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=s[o+0],f=s[o+1],m=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=m,t[e+3]=g;return}if(d!==g||l!==h||c!==f||u!==m){let p=1-a;const _=l*h+c*f+u*m+d*g,S=_>=0?1:-1,x=1-_*_;if(x>Number.EPSILON){const A=Math.sqrt(x),w=Math.atan2(A,_*S);p=Math.sin(p*w)/A,a=Math.sin(a*w)/A}const M=a*S;if(l=l*p+h*M,c=c*p+f*M,u=u*p+m*M,d=d*p+g*M,p===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],h=s[o+1],f=s[o+2],m=s[o+3];return t[e]=a*m+u*d+l*f-c*h,t[e+1]=l*m+u*h+c*d-a*f,t[e+2]=c*m+u*f+a*h-l*d,t[e+3]=u*m-a*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),h=l(n/2),f=l(i/2),m=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(tn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),u=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kl.copy(this).projectOnVector(t),this.sub(Kl)}reflect(t){return this.sub(Kl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(tn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kl=new U,Pf=new Jo;class jo{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ai.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ai.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ai.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ai):ai.fromBufferAttribute(s,o),ai.applyMatrix4(t.matrixWorld),this.expandByPoint(ai);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ma.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ma.copy(n.boundingBox)),ma.applyMatrix4(t.matrixWorld),this.union(ma)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ai),ai.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(oo),_a.subVectors(this.max,oo),ls.subVectors(t.a,oo),cs.subVectors(t.b,oo),us.subVectors(t.c,oo),Yi.subVectors(cs,ls),qi.subVectors(us,cs),Mr.subVectors(ls,us);let e=[0,-Yi.z,Yi.y,0,-qi.z,qi.y,0,-Mr.z,Mr.y,Yi.z,0,-Yi.x,qi.z,0,-qi.x,Mr.z,0,-Mr.x,-Yi.y,Yi.x,0,-qi.y,qi.x,0,-Mr.y,Mr.x,0];return!Zl(e,ls,cs,us,_a)||(e=[1,0,0,0,1,0,0,0,1],!Zl(e,ls,cs,us,_a))?!1:(ga.crossVectors(Yi,qi),e=[ga.x,ga.y,ga.z],Zl(e,ls,cs,us,_a))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ai).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ai).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ai=[new U,new U,new U,new U,new U,new U,new U,new U],ai=new U,ma=new jo,ls=new U,cs=new U,us=new U,Yi=new U,qi=new U,Mr=new U,oo=new U,_a=new U,ga=new U,yr=new U;function Zl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){yr.fromArray(r,s);const a=i.x*Math.abs(yr.x)+i.y*Math.abs(yr.y)+i.z*Math.abs(yr.z),l=t.dot(yr),c=e.dot(yr),u=n.dot(yr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const $0=new jo,ao=new U,Jl=new U;class El{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ao.subVectors(t,this.center);const e=ao.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ao,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ao.copy(t.center).add(Jl)),this.expandByPoint(ao.copy(t.center).sub(Jl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new U,jl=new U,va=new U,$i=new U,Ql=new U,xa=new U,tc=new U;class hm{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){jl.copy(t).add(e).multiplyScalar(.5),va.copy(e).sub(t).normalize(),$i.copy(this.origin).sub(jl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(va),a=$i.dot(this.direction),l=-$i.dot(va),c=$i.lengthSq(),u=Math.abs(1-o*o);let d,h,f,m;if(u>0)if(d=o*l-a,h=o*a-l,m=s*u,d>=0)if(h>=-m)if(h<=m){const g=1/u;d*=g,h*=g,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(jl).addScaledVector(va,h),f}intersectSphere(t,e){Ci.subVectors(t.center,this.origin);const n=Ci.dot(this.direction),i=Ci.dot(Ci)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,i=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,i=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,n,i,s){Ql.subVectors(e,t),xa.subVectors(n,t),tc.crossVectors(Ql,xa);let o=this.direction.dot(tc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,t);const l=a*this.direction.dot(xa.crossVectors($i,xa));if(l<0)return null;const c=a*this.direction.dot(Ql.cross($i));if(c<0||l+c>o)return null;const u=-a*$i.dot(tc);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(t,e,n,i,s,o,a,l,c,u,d,h,f,m,g,p){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,u,d,h,f,m,g,p)}set(t,e,n,i,s,o,a,l,c,u,d,h,f,m,g,p){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=u,_[10]=d,_[14]=h,_[3]=f,_[7]=m,_[11]=g,_[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/hs.setFromMatrixColumn(t,0).length(),s=1/hs.setFromMatrixColumn(t,1).length(),o=1/hs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const h=o*u,f=o*d,m=a*u,g=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=h-g*c,e[9]=-a*l,e[2]=g-h*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,f=l*d,m=c*u,g=c*d;e[0]=h+g*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=g+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,f=l*d,m=c*u,g=c*d;e[0]=h-g*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=g-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,f=o*d,m=a*u,g=a*d;e[0]=l*u,e[4]=m*c-f,e[8]=h*c+g,e[1]=l*d,e[5]=g*c+h,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*u,e[4]=g-h*d,e[8]=m*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*d+m,e[10]=h-g*d}else if(t.order==="XZY"){const h=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+g,e[5]=o*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=g*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(K0,t,Z0)}lookAt(t,e,n){const i=this.elements;return On.subVectors(t,e),On.lengthSq()===0&&(On.z=1),On.normalize(),Ki.crossVectors(n,On),Ki.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),Ki.crossVectors(n,On)),Ki.normalize(),Sa.crossVectors(On,Ki),i[0]=Ki.x,i[4]=Sa.x,i[8]=On.x,i[1]=Ki.y,i[5]=Sa.y,i[9]=On.y,i[2]=Ki.z,i[6]=Sa.z,i[10]=On.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],g=n[6],p=n[10],_=n[14],S=n[3],x=n[7],M=n[11],A=n[15],w=i[0],y=i[4],R=i[8],D=i[12],v=i[1],T=i[5],I=i[9],z=i[13],H=i[2],q=i[6],k=i[10],Y=i[14],W=i[3],it=i[7],P=i[11],at=i[15];return s[0]=o*w+a*v+l*H+c*W,s[4]=o*y+a*T+l*q+c*it,s[8]=o*R+a*I+l*k+c*P,s[12]=o*D+a*z+l*Y+c*at,s[1]=u*w+d*v+h*H+f*W,s[5]=u*y+d*T+h*q+f*it,s[9]=u*R+d*I+h*k+f*P,s[13]=u*D+d*z+h*Y+f*at,s[2]=m*w+g*v+p*H+_*W,s[6]=m*y+g*T+p*q+_*it,s[10]=m*R+g*I+p*k+_*P,s[14]=m*D+g*z+p*Y+_*at,s[3]=S*w+x*v+M*H+A*W,s[7]=S*y+x*T+M*q+A*it,s[11]=S*R+x*I+M*k+A*P,s[15]=S*D+x*z+M*Y+A*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],m=t[3],g=t[7],p=t[11],_=t[15];return m*(+s*l*d-i*c*d-s*a*h+n*c*h+i*a*f-n*l*f)+g*(+e*l*f-e*c*h+s*o*h-i*o*f+i*c*u-s*l*u)+p*(+e*c*d-e*a*f-s*o*d+n*o*f+s*a*u-n*c*u)+_*(-i*a*u-e*l*d+e*a*h+i*o*d-n*o*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],m=t[12],g=t[13],p=t[14],_=t[15],S=d*p*c-g*h*c+g*l*f-a*p*f-d*l*_+a*h*_,x=m*h*c-u*p*c-m*l*f+o*p*f+u*l*_-o*h*_,M=u*g*c-m*d*c+m*a*f-o*g*f-u*a*_+o*d*_,A=m*d*l-u*g*l-m*a*h+o*g*h+u*a*p-o*d*p,w=e*S+n*x+i*M+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const y=1/w;return t[0]=S*y,t[1]=(g*h*s-d*p*s-g*i*f+n*p*f+d*i*_-n*h*_)*y,t[2]=(a*p*s-g*l*s+g*i*c-n*p*c-a*i*_+n*l*_)*y,t[3]=(d*l*s-a*h*s-d*i*c+n*h*c+a*i*f-n*l*f)*y,t[4]=x*y,t[5]=(u*p*s-m*h*s+m*i*f-e*p*f-u*i*_+e*h*_)*y,t[6]=(m*l*s-o*p*s-m*i*c+e*p*c+o*i*_-e*l*_)*y,t[7]=(o*h*s-u*l*s+u*i*c-e*h*c-o*i*f+e*l*f)*y,t[8]=M*y,t[9]=(m*d*s-u*g*s-m*n*f+e*g*f+u*n*_-e*d*_)*y,t[10]=(o*g*s-m*a*s+m*n*c-e*g*c-o*n*_+e*a*_)*y,t[11]=(u*a*s-o*d*s-u*n*c+e*d*c+o*n*f-e*a*f)*y,t[12]=A*y,t[13]=(u*g*i-m*d*i+m*n*h-e*g*h-u*n*p+e*d*p)*y,t[14]=(m*a*i-o*g*i-m*n*l+e*g*l+o*n*p-e*a*p)*y,t[15]=(o*d*i-u*a*i+u*n*l-e*d*l-o*n*h+e*a*h)*y,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,m=s*d,g=o*u,p=o*d,_=a*d,S=l*c,x=l*u,M=l*d,A=n.x,w=n.y,y=n.z;return i[0]=(1-(g+_))*A,i[1]=(f+M)*A,i[2]=(m-x)*A,i[3]=0,i[4]=(f-M)*w,i[5]=(1-(h+_))*w,i[6]=(p+S)*w,i[7]=0,i[8]=(m+x)*y,i[9]=(p-S)*y,i[10]=(1-(h+g))*y,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=hs.set(i[0],i[1],i[2]).length();const o=hs.set(i[4],i[5],i[6]).length(),a=hs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],li.copy(this);const c=1/s,u=1/o,d=1/a;return li.elements[0]*=c,li.elements[1]*=c,li.elements[2]*=c,li.elements[4]*=u,li.elements[5]*=u,li.elements[6]*=u,li.elements[8]*=d,li.elements[9]*=d,li.elements[10]*=d,e.setFromRotationMatrix(li),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=zi){const l=this.elements,c=2*s/(e-t),u=2*s/(n-i),d=(e+t)/(e-t),h=(n+i)/(n-i);let f,m;if(a===zi)f=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===pl)f=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=zi){const l=this.elements,c=1/(e-t),u=1/(n-i),d=1/(o-s),h=(e+t)*c,f=(n+i)*u;let m,g;if(a===zi)m=(o+s)*d,g=-2*d;else if(a===pl)m=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const hs=new U,li=new Pe,K0=new U(0,0,0),Z0=new U(1,1,1),Ki=new U,Sa=new U,On=new U,Lf=new Pe,Df=new Jo;class Ti{constructor(t=0,e=0,n=0,i=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(tn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-tn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(tn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Lf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Df.setFromEuler(this),this.setFromQuaternion(Df,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class fm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let J0=0;const If=new U,fs=new Jo,Ri=new Pe,Ma=new U,lo=new U,j0=new U,Q0=new Jo,Uf=new U(1,0,0),Nf=new U(0,1,0),Of=new U(0,0,1),Ff={type:"added"},tv={type:"removed"},ds={type:"childadded",child:null},ec={type:"childremoved",child:null};class qe extends js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J0++}),this.uuid=Qs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new U,e=new Ti,n=new Jo,i=new U(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Jt}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(Uf,t)}rotateY(t){return this.rotateOnAxis(Nf,t)}rotateZ(t){return this.rotateOnAxis(Of,t)}translateOnAxis(t,e){return If.copy(t).applyQuaternion(this.quaternion),this.position.add(If.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uf,t)}translateY(t){return this.translateOnAxis(Nf,t)}translateZ(t){return this.translateOnAxis(Of,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ma.copy(t):Ma.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(lo,Ma,this.up):Ri.lookAt(Ma,lo,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),fs.setFromRotationMatrix(Ri),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ff),ds.child=t,this.dispatchEvent(ds),ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tv),ec.child=t,this.dispatchEvent(ec),ec.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ff),ds.child=t,this.dispatchEvent(ds),ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,j0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,Q0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}qe.DEFAULT_UP=new U(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new U,Pi=new U,nc=new U,Li=new U,ps=new U,ms=new U,Bf=new U,ic=new U,rc=new U,sc=new U,oc=new Ue,ac=new Ue,lc=new Ue;class fi{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),ci.subVectors(t,e),i.cross(ci);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){ci.subVectors(i,e),Pi.subVectors(n,e),nc.subVectors(t,e);const o=ci.dot(ci),a=ci.dot(Pi),l=ci.dot(nc),c=Pi.dot(Pi),u=Pi.dot(nc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,m=(o*u-a*l)*h;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Li.x),l.addScaledVector(o,Li.y),l.addScaledVector(a,Li.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return oc.setScalar(0),ac.setScalar(0),lc.setScalar(0),oc.fromBufferAttribute(t,e),ac.fromBufferAttribute(t,n),lc.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(oc,s.x),o.addScaledVector(ac,s.y),o.addScaledVector(lc,s.z),o}static isFrontFacing(t,e,n,i){return ci.subVectors(n,e),Pi.subVectors(t,e),ci.cross(Pi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ci.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ci.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return fi.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ps.subVectors(i,n),ms.subVectors(s,n),ic.subVectors(t,n);const l=ps.dot(ic),c=ms.dot(ic);if(l<=0&&c<=0)return e.copy(n);rc.subVectors(t,i);const u=ps.dot(rc),d=ms.dot(rc);if(u>=0&&d<=u)return e.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(ps,o);sc.subVectors(t,s);const f=ps.dot(sc),m=ms.dot(sc);if(m>=0&&f<=m)return e.copy(s);const g=f*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(ms,a);const p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return Bf.subVectors(s,i),a=(d-u)/(d-u+(f-m)),e.copy(i).addScaledVector(Bf,a);const _=1/(p+g+h);return o=g*_,a=h*_,e.copy(n).addScaledVector(ps,o).addScaledVector(ms,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},ya={h:0,s:0,l:0};function cc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class he{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=gi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=pe.workingColorSpace){if(t=xh(t,1),e=tn(e,0,1),n=tn(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=cc(o,s,t+1/3),this.g=cc(o,s,t),this.b=cc(o,s,t-1/3)}return pe.toWorkingColorSpace(this,i),this}setStyle(t,e=gi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=gi){const n=dm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}copyLinearToSRGB(t){return this.r=ql(t.r),this.g=ql(t.g),this.b=ql(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=gi){return pe.fromWorkingColorSpace(un.copy(this),t),Math.round(tn(un.r*255,0,255))*65536+Math.round(tn(un.g*255,0,255))*256+Math.round(tn(un.b*255,0,255))}getHexString(t=gi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.fromWorkingColorSpace(un.copy(this),e);const n=un.r,i=un.g,s=un.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.fromWorkingColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=gi){pe.fromWorkingColorSpace(un.copy(this),t);const e=un.r,n=un.g,i=un.b;return t!==gi?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(ya);const n=Do(Zi.h,ya.h,e),i=Do(Zi.s,ya.s,e),s=Do(Zi.l,ya.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new he;he.NAMES=dm;let ev=0;class to extends js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=Qs(),this.name="",this.type="Material",this.blending=Ns,this.side=mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zc,this.blendDst=Jc,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ef,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(n.blending=this.blending),this.side!==mr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zc&&(n.blendSrc=this.blendSrc),this.blendDst!==Jc&&(n.blendDst=this.blendDst),this.blendEquation!==Ur&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ef&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pm extends to{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=qp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ve=new U,Ea=new Et;class pi{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tf,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ea.fromBufferAttribute(this,e),Ea.applyMatrix3(t),this.setXY(e,Ea.x,Ea.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Es(e,this.array)),e}setX(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Es(e,this.array)),e}setY(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Es(e,this.array)),e}setW(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),i=vn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),i=vn(i,this.array),s=vn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tf&&(t.usage=this.usage),t}}class mm extends pi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _m extends pi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Oe extends pi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let nv=0;const Zn=new Pe,uc=new qe,_s=new U,Fn=new jo,co=new jo,Je=new U;class In extends js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nv++}),this.uuid=Qs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lm(t)?_m:mm)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Jt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,e,n){return Zn.makeTranslation(t,e,n),this.applyMatrix4(Zn),this}scale(t,e,n){return Zn.makeScale(t,e,n),this.applyMatrix4(Zn),this}lookAt(t){return uc.lookAt(t),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Oe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Je.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(Je),Je.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(Je)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new El);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Fn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];co.setFromBufferAttribute(a),this.morphTargetsRelative?(Je.addVectors(Fn.min,co.min),Fn.expandByPoint(Je),Je.addVectors(Fn.max,co.max),Fn.expandByPoint(Je)):(Fn.expandByPoint(co.min),Fn.expandByPoint(co.max))}Fn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Je.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Je));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Je.fromBufferAttribute(a,c),l&&(_s.fromBufferAttribute(t,c),Je.add(_s)),i=Math.max(i,n.distanceToSquared(Je))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new U,l[R]=new U;const c=new U,u=new U,d=new U,h=new Et,f=new Et,m=new Et,g=new U,p=new U;function _(R,D,v){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,D),d.fromBufferAttribute(n,v),h.fromBufferAttribute(s,R),f.fromBufferAttribute(s,D),m.fromBufferAttribute(s,v),u.sub(c),d.sub(c),f.sub(h),m.sub(h);const T=1/(f.x*m.y-m.x*f.y);isFinite(T)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(T),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(T),a[R].add(g),a[D].add(g),a[v].add(g),l[R].add(p),l[D].add(p),l[v].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let R=0,D=S.length;R<D;++R){const v=S[R],T=v.start,I=v.count;for(let z=T,H=T+I;z<H;z+=3)_(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const x=new U,M=new U,A=new U,w=new U;function y(R){A.fromBufferAttribute(i,R),w.copy(A);const D=a[R];x.copy(D),x.sub(A.multiplyScalar(A.dot(D))).normalize(),M.crossVectors(w,D);const T=M.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,T)}for(let R=0,D=S.length;R<D;++R){const v=S[R],T=v.start,I=v.count;for(let z=T,H=T+I;z<H;z+=3)y(t.getX(z+0)),y(t.getX(z+1)),y(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new U,s=new U,o=new U,a=new U,l=new U,c=new U,u=new U,d=new U;if(t)for(let h=0,f=t.count;h<f;h+=3){const m=t.getX(h+0),g=t.getX(h+1),p=t.getX(h+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)i.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Je.fromBufferAttribute(t,e),Je.normalize(),t.setXYZ(e,Je.x,Je.y,Je.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,m=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*u;for(let _=0;_<u;_++)h[m++]=c[f++]}return new pi(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new In,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=t(h,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zf=new Pe,Er=new hm,Ta=new El,kf=new U,ba=new U,wa=new U,Aa=new U,hc=new U,Ca=new U,Hf=new U,Ra=new U;class ie extends qe{constructor(t=new In,e=new pm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Ca.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(hc.fromBufferAttribute(d,t),o?Ca.addScaledVector(hc,u):Ca.addScaledVector(hc.sub(e),u))}e.add(Ca)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(s),Er.copy(t.ray).recast(t.near),!(Ta.containsPoint(Er.origin)===!1&&(Er.intersectSphere(Ta,kf)===null||Er.origin.distanceToSquared(kf)>(t.far-t.near)**2))&&(zf.copy(s).invert(),Er.copy(t.ray).applyMatrix4(zf),!(n.boundingBox!==null&&Er.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Er)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,g=h.length;m<g;m++){const p=h[m],_=o[p.materialIndex],S=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let M=S,A=x;M<A;M+=3){const w=a.getX(M),y=a.getX(M+1),R=a.getX(M+2);i=Pa(this,_,t,n,c,u,d,w,y,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let p=m,_=g;p<_;p+=3){const S=a.getX(p),x=a.getX(p+1),M=a.getX(p+2);i=Pa(this,o,t,n,c,u,d,S,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,g=h.length;m<g;m++){const p=h[m],_=o[p.materialIndex],S=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=S,A=x;M<A;M+=3){const w=M,y=M+1,R=M+2;i=Pa(this,_,t,n,c,u,d,w,y,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=m,_=g;p<_;p+=3){const S=p,x=p+1,M=p+2;i=Pa(this,o,t,n,c,u,d,S,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function iv(r,t,e,n,i,s,o,a){let l;if(t.side===Pn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===mr,a),l===null)return null;Ra.copy(a),Ra.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ra);return c<e.near||c>e.far?null:{distance:c,point:Ra.clone(),object:r}}function Pa(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,ba),r.getVertexPosition(l,wa),r.getVertexPosition(c,Aa);const u=iv(r,t,e,n,ba,wa,Aa,Hf);if(u){const d=new U;fi.getBarycoord(Hf,ba,wa,Aa,d),i&&(u.uv=fi.getInterpolatedAttribute(i,a,l,c,d,new Et)),s&&(u.uv1=fi.getInterpolatedAttribute(s,a,l,c,d,new Et)),o&&(u.normal=fi.getInterpolatedAttribute(o,a,l,c,d,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new U,materialIndex:0};fi.getNormal(ba,wa,Aa,h.normal),u.face=h,u.barycoord=d}return u}class nn extends In{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;m("z","y","x",-1,-1,n,e,t,o,s,0),m("z","y","x",1,-1,n,e,-t,o,s,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(u,3)),this.setAttribute("uv",new Oe(d,2));function m(g,p,_,S,x,M,A,w,y,R,D){const v=M/y,T=A/R,I=M/2,z=A/2,H=w/2,q=y+1,k=R+1;let Y=0,W=0;const it=new U;for(let P=0;P<k;P++){const at=P*T-z;for(let zt=0;zt<q;zt++){const Yt=zt*v-I;it[g]=Yt*S,it[p]=at*x,it[_]=H,c.push(it.x,it.y,it.z),it[g]=0,it[p]=0,it[_]=w>0?1:-1,u.push(it.x,it.y,it.z),d.push(zt/y),d.push(1-P/R),Y+=1}}for(let P=0;P<R;P++)for(let at=0;at<y;at++){const zt=h+at+q*P,Yt=h+at+q*(P+1),$=h+(at+1)+q*(P+1),Q=h+(at+1)+q*P;l.push(zt,Yt,Q),l.push(Yt,$,Q),W+=6}a.addGroup(f,W,D),f+=W,h+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ks(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function xn(r){const t={};for(let e=0;e<r.length;e++){const n=Ks(r[e]);for(const i in n)t[i]=n[i]}return t}function rv(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function gm(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const sv={clone:Ks,merge:xn};var ov=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,av=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _r extends to{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ov,this.fragmentShader=av,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=rv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class vm extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=zi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new U,Vf=new Et,Gf=new Et;class ti extends vm{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Yo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Yo*2*Math.atan(Math.tan(Lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,Vf,Gf),e.subVectors(Gf,Vf)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Lo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const gs=-90,vs=1;class lv extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ti(gs,vs,t,e);i.layers=this.layers,this.add(i);const s=new ti(gs,vs,t,e);s.layers=this.layers,this.add(s);const o=new ti(gs,vs,t,e);o.layers=this.layers,this.add(o);const a=new ti(gs,vs,t,e);a.layers=this.layers,this.add(a);const l=new ti(gs,vs,t,e);l.layers=this.layers,this.add(l);const c=new ti(gs,vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class xm extends Ln{constructor(t,e,n,i,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Xs,super(t,e,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class cv extends Qr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new xm(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:hi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new nn(5,5,5),s=new _r({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:lr});s.uniforms.tEquirect.value=e;const o=new ie(i,s),a=e.minFilter;return e.minFilter===kr&&(e.minFilter=hi),new lv(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const fc=new U,uv=new U,hv=new Jt;class Dr{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=fc.subVectors(n,e).cross(uv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||hv.getNormalMatrix(t),i=this.coplanarPoint(fc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new El,La=new U;class Sh{constructor(t=new Dr,e=new Dr,n=new Dr,i=new Dr,s=new Dr,o=new Dr){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zi){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],h=i[7],f=i[8],m=i[9],g=i[10],p=i[11],_=i[12],S=i[13],x=i[14],M=i[15];if(n[0].setComponents(l-s,h-c,p-f,M-_).normalize(),n[1].setComponents(l+s,h+c,p+f,M+_).normalize(),n[2].setComponents(l+o,h+u,p+m,M+S).normalize(),n[3].setComponents(l-o,h-u,p-m,M-S).normalize(),n[4].setComponents(l-a,h-d,p-g,M-x).normalize(),e===zi)n[5].setComponents(l+a,h+d,p+g,M+x).normalize();else if(e===pl)n[5].setComponents(a,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Tr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(t){return Tr.center.set(0,0,0),Tr.radius=.7071067811865476,Tr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(La.x=i.normal.x>0?t.max.x:t.min.x,La.y=i.normal.y>0?t.max.y:t.min.y,La.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(La)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sm(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function fv(r){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){const m=d[h],g=d[f];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++h,d[h]=g)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){const g=d[f];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Tl extends In{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=t/a,h=e/l,f=[],m=[],g=[],p=[];for(let _=0;_<u;_++){const S=_*h-o;for(let x=0;x<c;x++){const M=x*d-s;m.push(M,-S,0),g.push(0,0,1),p.push(x/a),p.push(1-_/l)}}for(let _=0;_<l;_++)for(let S=0;S<a;S++){const x=S+c*_,M=S+c*(_+1),A=S+1+c*(_+1),w=S+1+c*_;f.push(x,M,w),f.push(M,A,w)}this.setIndex(f),this.setAttribute("position",new Oe(m,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tl(t.width,t.height,t.widthSegments,t.heightSegments)}}var dv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_v=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ev=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Av=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Iv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ov=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wv=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$v=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ex=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ix=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ox=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ax=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ux=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,px=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_x=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ex=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ax=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Px=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ux=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ox=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$x=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Kx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,oS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,aS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,SS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,MS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ES=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,AS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,LS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,IS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,US=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,FS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,HS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,VS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,WS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,XS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:dv,alphahash_pars_fragment:pv,alphamap_fragment:mv,alphamap_pars_fragment:_v,alphatest_fragment:gv,alphatest_pars_fragment:vv,aomap_fragment:xv,aomap_pars_fragment:Sv,batching_pars_vertex:Mv,batching_vertex:yv,begin_vertex:Ev,beginnormal_vertex:Tv,bsdfs:bv,iridescence_fragment:wv,bumpmap_pars_fragment:Av,clipping_planes_fragment:Cv,clipping_planes_pars_fragment:Rv,clipping_planes_pars_vertex:Pv,clipping_planes_vertex:Lv,color_fragment:Dv,color_pars_fragment:Iv,color_pars_vertex:Uv,color_vertex:Nv,common:Ov,cube_uv_reflection_fragment:Fv,defaultnormal_vertex:Bv,displacementmap_pars_vertex:zv,displacementmap_vertex:kv,emissivemap_fragment:Hv,emissivemap_pars_fragment:Vv,colorspace_fragment:Gv,colorspace_pars_fragment:Wv,envmap_fragment:Xv,envmap_common_pars_fragment:Yv,envmap_pars_fragment:qv,envmap_pars_vertex:$v,envmap_physical_pars_fragment:sx,envmap_vertex:Kv,fog_vertex:Zv,fog_pars_vertex:Jv,fog_fragment:jv,fog_pars_fragment:Qv,gradientmap_pars_fragment:tx,lightmap_pars_fragment:ex,lights_lambert_fragment:nx,lights_lambert_pars_fragment:ix,lights_pars_begin:rx,lights_toon_fragment:ox,lights_toon_pars_fragment:ax,lights_phong_fragment:lx,lights_phong_pars_fragment:cx,lights_physical_fragment:ux,lights_physical_pars_fragment:hx,lights_fragment_begin:fx,lights_fragment_maps:dx,lights_fragment_end:px,logdepthbuf_fragment:mx,logdepthbuf_pars_fragment:_x,logdepthbuf_pars_vertex:gx,logdepthbuf_vertex:vx,map_fragment:xx,map_pars_fragment:Sx,map_particle_fragment:Mx,map_particle_pars_fragment:yx,metalnessmap_fragment:Ex,metalnessmap_pars_fragment:Tx,morphinstance_vertex:bx,morphcolor_vertex:wx,morphnormal_vertex:Ax,morphtarget_pars_vertex:Cx,morphtarget_vertex:Rx,normal_fragment_begin:Px,normal_fragment_maps:Lx,normal_pars_fragment:Dx,normal_pars_vertex:Ix,normal_vertex:Ux,normalmap_pars_fragment:Nx,clearcoat_normal_fragment_begin:Ox,clearcoat_normal_fragment_maps:Fx,clearcoat_pars_fragment:Bx,iridescence_pars_fragment:zx,opaque_fragment:kx,packing:Hx,premultiplied_alpha_fragment:Vx,project_vertex:Gx,dithering_fragment:Wx,dithering_pars_fragment:Xx,roughnessmap_fragment:Yx,roughnessmap_pars_fragment:qx,shadowmap_pars_fragment:$x,shadowmap_pars_vertex:Kx,shadowmap_vertex:Zx,shadowmask_pars_fragment:Jx,skinbase_vertex:jx,skinning_pars_vertex:Qx,skinning_vertex:tS,skinnormal_vertex:eS,specularmap_fragment:nS,specularmap_pars_fragment:iS,tonemapping_fragment:rS,tonemapping_pars_fragment:sS,transmission_fragment:oS,transmission_pars_fragment:aS,uv_pars_fragment:lS,uv_pars_vertex:cS,uv_vertex:uS,worldpos_vertex:hS,background_vert:fS,background_frag:dS,backgroundCube_vert:pS,backgroundCube_frag:mS,cube_vert:_S,cube_frag:gS,depth_vert:vS,depth_frag:xS,distanceRGBA_vert:SS,distanceRGBA_frag:MS,equirect_vert:yS,equirect_frag:ES,linedashed_vert:TS,linedashed_frag:bS,meshbasic_vert:wS,meshbasic_frag:AS,meshlambert_vert:CS,meshlambert_frag:RS,meshmatcap_vert:PS,meshmatcap_frag:LS,meshnormal_vert:DS,meshnormal_frag:IS,meshphong_vert:US,meshphong_frag:NS,meshphysical_vert:OS,meshphysical_frag:FS,meshtoon_vert:BS,meshtoon_frag:zS,points_vert:kS,points_frag:HS,shadow_vert:VS,shadow_frag:GS,sprite_vert:WS,sprite_frag:XS},mt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},vi={basic:{uniforms:xn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:xn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new he(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:xn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:xn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:xn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new he(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:xn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:xn([mt.points,mt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:xn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:xn([mt.common,mt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:xn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:xn([mt.sprite,mt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:xn([mt.common,mt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:xn([mt.lights,mt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};vi.physical={uniforms:xn([vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Da={r:0,b:0,g:0},br=new Ti,YS=new Pe;function qS(r,t,e,n,i,s,o){const a=new he(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function m(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function g(S){let x=!1;const M=m(S);M===null?_(a,l):M&&M.isColor&&(_(M,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(S,x){const M=m(x);M&&(M.isCubeTexture||M.mapping===Ml)?(u===void 0&&(u=new ie(new nn(1,1,1),new _r({name:"BackgroundCubeMaterial",uniforms:Ks(vi.backgroundCube.uniforms),vertexShader:vi.backgroundCube.vertexShader,fragmentShader:vi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),br.copy(x.backgroundRotation),br.x*=-1,br.y*=-1,br.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(YS.makeRotationFromEuler(br)),u.material.toneMapped=pe.getTransfer(M.colorSpace)!==we,(d!==M||h!==M.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ie(new Tl(2,2),new _r({name:"BackgroundMaterial",uniforms:Ks(vi.background.uniforms),vertexShader:vi.background.vertexShader,fragmentShader:vi.background.fragmentShader,side:mr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=pe.getTransfer(M.colorSpace)!==we,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function _(S,x){S.getRGB(Da,gm(r)),n.buffers.color.setClear(Da.r,Da.g,Da.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,_(a,l)},render:g,addToRenderList:p}}function $S(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,o=!1;function a(v,T,I,z,H){let q=!1;const k=d(z,I,T);s!==k&&(s=k,c(s.object)),q=f(v,z,I,H),q&&m(v,z,I,H),H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,M(v,T,I,z),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function u(v){return r.deleteVertexArray(v)}function d(v,T,I){const z=I.wireframe===!0;let H=n[v.id];H===void 0&&(H={},n[v.id]=H);let q=H[T.id];q===void 0&&(q={},H[T.id]=q);let k=q[z];return k===void 0&&(k=h(l()),q[z]=k),k}function h(v){const T=[],I=[],z=[];for(let H=0;H<e;H++)T[H]=0,I[H]=0,z[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:I,attributeDivisors:z,object:v,attributes:{},index:null}}function f(v,T,I,z){const H=s.attributes,q=T.attributes;let k=0;const Y=I.getAttributes();for(const W in Y)if(Y[W].location>=0){const P=H[W];let at=q[W];if(at===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(at=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(at=v.instanceColor)),P===void 0||P.attribute!==at||at&&P.data!==at.data)return!0;k++}return s.attributesNum!==k||s.index!==z}function m(v,T,I,z){const H={},q=T.attributes;let k=0;const Y=I.getAttributes();for(const W in Y)if(Y[W].location>=0){let P=q[W];P===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(P=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(P=v.instanceColor));const at={};at.attribute=P,P&&P.data&&(at.data=P.data),H[W]=at,k++}s.attributes=H,s.attributesNum=k,s.index=z}function g(){const v=s.newAttributes;for(let T=0,I=v.length;T<I;T++)v[T]=0}function p(v){_(v,0)}function _(v,T){const I=s.newAttributes,z=s.enabledAttributes,H=s.attributeDivisors;I[v]=1,z[v]===0&&(r.enableVertexAttribArray(v),z[v]=1),H[v]!==T&&(r.vertexAttribDivisor(v,T),H[v]=T)}function S(){const v=s.newAttributes,T=s.enabledAttributes;for(let I=0,z=T.length;I<z;I++)T[I]!==v[I]&&(r.disableVertexAttribArray(I),T[I]=0)}function x(v,T,I,z,H,q,k){k===!0?r.vertexAttribIPointer(v,T,I,H,q):r.vertexAttribPointer(v,T,I,z,H,q)}function M(v,T,I,z){g();const H=z.attributes,q=I.getAttributes(),k=T.defaultAttributeValues;for(const Y in q){const W=q[Y];if(W.location>=0){let it=H[Y];if(it===void 0&&(Y==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),Y==="instanceColor"&&v.instanceColor&&(it=v.instanceColor)),it!==void 0){const P=it.normalized,at=it.itemSize,zt=t.get(it);if(zt===void 0)continue;const Yt=zt.buffer,$=zt.type,Q=zt.bytesPerElement,ft=$===r.INT||$===r.UNSIGNED_INT||it.gpuType===fh;if(it.isInterleavedBufferAttribute){const ot=it.data,At=ot.stride,yt=it.offset;if(ot.isInstancedInterleavedBuffer){for(let Xt=0;Xt<W.locationSize;Xt++)_(W.location+Xt,ot.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Xt=0;Xt<W.locationSize;Xt++)p(W.location+Xt);r.bindBuffer(r.ARRAY_BUFFER,Yt);for(let Xt=0;Xt<W.locationSize;Xt++)x(W.location+Xt,at/W.locationSize,$,P,At*Q,(yt+at/W.locationSize*Xt)*Q,ft)}else{if(it.isInstancedBufferAttribute){for(let ot=0;ot<W.locationSize;ot++)_(W.location+ot,it.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ot=0;ot<W.locationSize;ot++)p(W.location+ot);r.bindBuffer(r.ARRAY_BUFFER,Yt);for(let ot=0;ot<W.locationSize;ot++)x(W.location+ot,at/W.locationSize,$,P,at*Q,at/W.locationSize*ot*Q,ft)}}else if(k!==void 0){const P=k[Y];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(W.location,P);break;case 3:r.vertexAttrib3fv(W.location,P);break;case 4:r.vertexAttrib4fv(W.location,P);break;default:r.vertexAttrib1fv(W.location,P)}}}}S()}function A(){R();for(const v in n){const T=n[v];for(const I in T){const z=T[I];for(const H in z)u(z[H].object),delete z[H];delete T[I]}delete n[v]}}function w(v){if(n[v.id]===void 0)return;const T=n[v.id];for(const I in T){const z=T[I];for(const H in z)u(z[H].object),delete z[H];delete T[I]}delete n[v.id]}function y(v){for(const T in n){const I=n[T];if(I[v.id]===void 0)continue;const z=I[v.id];for(const H in z)u(z[H].object),delete z[H];delete I[v.id]}}function R(){D(),o=!0,s!==i&&(s=i,c(s.object))}function D(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:D,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:y,initAttributes:g,enableAttribute:p,disableUnusedAttributes:S}}function KS(r,t,e){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let m=0;m<d;m++)f+=u[m];e.update(f,n,1)}function l(c,u,d,h){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];for(let g=0;g<h.length;g++)e.update(m,n,h[g])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ZS(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const y=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(y){return!(y!==di&&n.convert(y)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){const R=y===Zo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==Gi&&n.convert(y)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==Bi&&!R)}function l(y){if(y==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(h===!0){const y=t.get("EXT_clip_control");y.clipControlEXT(y.LOWER_LEFT_EXT,y.ZERO_TO_ONE_EXT)}const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:p,maxAttributes:_,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:A,maxSamples:w}}function JS(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Dr,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){const m=d.clippingPlanes,g=d.clipIntersection,p=d.clipShadows,_=r.get(d);if(!i||m===null||m.length===0||s&&!p)s?u(null):c();else{const S=s?0:n,x=S*4;let M=_.clippingState||null;l.value=M,M=u(m,h,x,f);for(let A=0;A!==x;++A)M[A]=e[A];_.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,m){const g=d!==null?d.length:0;let p=null;if(g!==0){if(p=l.value,m!==!0||p===null){const _=f+g*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(p===null||p.length<_)&&(p=new Float32Array(_));for(let x=0,M=f;x!==g;++x,M+=4)o.copy(d[x]).applyMatrix4(S,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function jS(r){let t=new WeakMap;function e(o,a){return a===su?o.mapping=Xs:a===ou&&(o.mapping=Ys),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===su||a===ou)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new cv(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Mm extends vm{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const As=4,Wf=[.125,.215,.35,.446,.526,.582],Nr=20,dc=new Mm,Xf=new he;let pc=null,mc=0,_c=0,gc=!1;const Ir=(1+Math.sqrt(5))/2,xs=1/Ir,Yf=[new U(-Ir,xs,0),new U(Ir,xs,0),new U(-xs,0,Ir),new U(xs,0,Ir),new U(0,Ir,-xs),new U(0,Ir,xs),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class qf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),_c=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(pc,mc,_c),this._renderer.xr.enabled=gc,t.scissorTest=!1,Ia(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xs||t.mapping===Ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),_c=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:hi,minFilter:hi,generateMipmaps:!1,type:Zo,format:di,colorSpace:vr,depthBuffer:!1},i=$f(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$f(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=QS(s)),this._blurMaterial=tM(s,t,e)}return i}_compileMaterial(t){const e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,dc)}_sceneToCubeUV(t,e,n,i){const a=new ti(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Xf),u.toneMapping=cr,u.autoClear=!1;const f=new pm({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),m=new ie(new nn,f);let g=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,g=!0):(f.color.copy(Xf),g=!0);for(let _=0;_<6;_++){const S=_%3;S===0?(a.up.set(0,l[_],0),a.lookAt(c[_],0,0)):S===1?(a.up.set(0,0,l[_]),a.lookAt(0,c[_],0)):(a.up.set(0,l[_],0),a.lookAt(0,0,c[_]));const x=this._cubeSize;Ia(i,S*x,_>2?x:0,x,x),u.setRenderTarget(i),g&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Xs||t.mapping===Ys;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kf());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ie(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ia(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,dc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Yf[(i-s-1)%Yf.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ie(this._lodPlanes[i],c),h=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Nr-1),g=s/m,p=isFinite(s)?1+Math.floor(u*g):Nr;p>Nr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Nr}`);const _=[];let S=0;for(let y=0;y<Nr;++y){const R=y/g,D=Math.exp(-R*R/2);_.push(D),y===0?S+=D:y<p&&(S+=2*D)}for(let y=0;y<_.length;y++)_[y]=_[y]/S;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=_,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=m,h.mipInt.value=x-n;const M=this._sizeLods[i],A=3*M*(i>x-As?i-x+As:0),w=4*(this._cubeSize-M);Ia(e,A,w,3*M,2*M),l.setRenderTarget(e),l.render(d,dc)}}function QS(r){const t=[],e=[],n=[];let i=r;const s=r-As+1+Wf.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-As?l=Wf[o-r+As-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,m=6,g=3,p=2,_=1,S=new Float32Array(g*m*f),x=new Float32Array(p*m*f),M=new Float32Array(_*m*f);for(let w=0;w<f;w++){const y=w%3*2/3-1,R=w>2?0:-1,D=[y,R,0,y+2/3,R,0,y+2/3,R+1,0,y,R,0,y+2/3,R+1,0,y,R+1,0];S.set(D,g*m*w),x.set(h,p*m*w);const v=[w,w,w,w,w,w];M.set(v,_*m*w)}const A=new In;A.setAttribute("position",new pi(S,g)),A.setAttribute("uv",new pi(x,p)),A.setAttribute("faceIndex",new pi(M,_)),t.push(A),i>As&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $f(r,t,e){const n=new Qr(r,t,e);return n.texture.mapping=Ml,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ia(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function tM(r,t,e){const n=new Float32Array(Nr),i=new U(0,1,0);return new _r({name:"SphericalGaussianBlur",defines:{n:Nr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function Kf(){return new _r({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function Zf(){return new _r({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function Mh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function eM(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===su||l===ou,u=l===Xs||l===Ys;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new qf(r)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new qf(r)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function nM(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ja("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function iM(r,t,e,n){const i={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const g=h.morphAttributes[m];for(let p=0,_=g.length;p<_;p++)t.remove(g[p])}h.removeEventListener("dispose",o),delete i[h.id];const f=s.get(h);f&&(t.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const g=f[m];for(let p=0,_=g.length;p<_;p++)t.update(g[p],r.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,m=d.attributes.position;let g=0;if(f!==null){const S=f.array;g=f.version;for(let x=0,M=S.length;x<M;x+=3){const A=S[x+0],w=S[x+1],y=S[x+2];h.push(A,w,w,y,y,A)}}else if(m!==void 0){const S=m.array;g=m.version;for(let x=0,M=S.length/3-1;x<M;x+=3){const A=x+0,w=x+1,y=x+2;h.push(A,w,w,y,y,A)}}else return;const p=new(lm(h)?_m:mm)(h,1);p.version=g;const _=s.get(d);_&&t.remove(_),s.set(d,p)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function rM(r,t,e){let n;function i(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,f){r.drawElements(n,f,s,h*o),e.update(f,n,1)}function c(h,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,h*o,m),e.update(f,n,m))}function u(h,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,h,0,m);let p=0;for(let _=0;_<m;_++)p+=f[_];e.update(p,n,1)}function d(h,f,m,g){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<h.length;_++)c(h[_]/o,f[_],g[_]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,g,0,m);let _=0;for(let S=0;S<m;S++)_+=f[S];for(let S=0;S<g.length;S++)e.update(_,n,g[S])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function sM(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function oM(r,t,e){const n=new WeakMap,i=new Ue;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let v=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var f=v;h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;m===!0&&(M=1),g===!0&&(M=2),p===!0&&(M=3);let A=a.attributes.position.count*M,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const y=new Float32Array(A*w*4*d),R=new um(y,A,w,d);R.type=Bi,R.needsUpdate=!0;const D=M*4;for(let T=0;T<d;T++){const I=_[T],z=S[T],H=x[T],q=A*w*4*T;for(let k=0;k<I.count;k++){const Y=k*D;m===!0&&(i.fromBufferAttribute(I,k),y[q+Y+0]=i.x,y[q+Y+1]=i.y,y[q+Y+2]=i.z,y[q+Y+3]=0),g===!0&&(i.fromBufferAttribute(z,k),y[q+Y+4]=i.x,y[q+Y+5]=i.y,y[q+Y+6]=i.z,y[q+Y+7]=0),p===!0&&(i.fromBufferAttribute(H,k),y[q+Y+8]=i.x,y[q+Y+9]=i.y,y[q+Y+10]=i.z,y[q+Y+11]=H.itemSize===4?i.w:1)}}h={count:d,texture:R,size:new Et(A,w)},n.set(a,h),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function aM(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class ym extends Ln{constructor(t,e,n,i,s,o,a,l,c,u=Os){if(u!==Os&&u!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Os&&(n=jr),n===void 0&&u===$s&&(n=qs),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ii,this.minFilter=l!==void 0?l:ii,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Em=new Ln,Jf=new ym(1,1),Tm=new um,bm=new q0,wm=new xm,jf=[],Qf=[],td=new Float32Array(16),ed=new Float32Array(9),nd=new Float32Array(4);function eo(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=jf[i];if(s===void 0&&(s=new Float32Array(i),jf[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function $e(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ke(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function bl(r,t){let e=Qf[t];e===void 0&&(e=new Int32Array(t),Qf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function lM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function cM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;r.uniform2fv(this.addr,t),Ke(e,t)}}function uM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if($e(e,t))return;r.uniform3fv(this.addr,t),Ke(e,t)}}function hM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;r.uniform4fv(this.addr,t),Ke(e,t)}}function fM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ke(e,t)}else{if($e(e,n))return;nd.set(n),r.uniformMatrix2fv(this.addr,!1,nd),Ke(e,n)}}function dM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ke(e,t)}else{if($e(e,n))return;ed.set(n),r.uniformMatrix3fv(this.addr,!1,ed),Ke(e,n)}}function pM(r,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ke(e,t)}else{if($e(e,n))return;td.set(n),r.uniformMatrix4fv(this.addr,!1,td),Ke(e,n)}}function mM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function _M(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;r.uniform2iv(this.addr,t),Ke(e,t)}}function gM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;r.uniform3iv(this.addr,t),Ke(e,t)}}function vM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;r.uniform4iv(this.addr,t),Ke(e,t)}}function xM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function SM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;r.uniform2uiv(this.addr,t),Ke(e,t)}}function MM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;r.uniform3uiv(this.addr,t),Ke(e,t)}}function yM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;r.uniform4uiv(this.addr,t),Ke(e,t)}}function EM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Jf.compareFunction=am,s=Jf):s=Em,e.setTexture2D(t||s,i)}function TM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||bm,i)}function bM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||wm,i)}function wM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Tm,i)}function AM(r){switch(r){case 5126:return lM;case 35664:return cM;case 35665:return uM;case 35666:return hM;case 35674:return fM;case 35675:return dM;case 35676:return pM;case 5124:case 35670:return mM;case 35667:case 35671:return _M;case 35668:case 35672:return gM;case 35669:case 35673:return vM;case 5125:return xM;case 36294:return SM;case 36295:return MM;case 36296:return yM;case 35678:case 36198:case 36298:case 36306:case 35682:return EM;case 35679:case 36299:case 36307:return TM;case 35680:case 36300:case 36308:case 36293:return bM;case 36289:case 36303:case 36311:case 36292:return wM}}function CM(r,t){r.uniform1fv(this.addr,t)}function RM(r,t){const e=eo(t,this.size,2);r.uniform2fv(this.addr,e)}function PM(r,t){const e=eo(t,this.size,3);r.uniform3fv(this.addr,e)}function LM(r,t){const e=eo(t,this.size,4);r.uniform4fv(this.addr,e)}function DM(r,t){const e=eo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function IM(r,t){const e=eo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function UM(r,t){const e=eo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function NM(r,t){r.uniform1iv(this.addr,t)}function OM(r,t){r.uniform2iv(this.addr,t)}function FM(r,t){r.uniform3iv(this.addr,t)}function BM(r,t){r.uniform4iv(this.addr,t)}function zM(r,t){r.uniform1uiv(this.addr,t)}function kM(r,t){r.uniform2uiv(this.addr,t)}function HM(r,t){r.uniform3uiv(this.addr,t)}function VM(r,t){r.uniform4uiv(this.addr,t)}function GM(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);$e(n,s)||(r.uniform1iv(this.addr,s),Ke(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Em,s[o])}function WM(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);$e(n,s)||(r.uniform1iv(this.addr,s),Ke(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||bm,s[o])}function XM(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);$e(n,s)||(r.uniform1iv(this.addr,s),Ke(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||wm,s[o])}function YM(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);$e(n,s)||(r.uniform1iv(this.addr,s),Ke(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Tm,s[o])}function qM(r){switch(r){case 5126:return CM;case 35664:return RM;case 35665:return PM;case 35666:return LM;case 35674:return DM;case 35675:return IM;case 35676:return UM;case 5124:case 35670:return NM;case 35667:case 35671:return OM;case 35668:case 35672:return FM;case 35669:case 35673:return BM;case 5125:return zM;case 36294:return kM;case 36295:return HM;case 36296:return VM;case 35678:case 36198:case 36298:case 36306:case 35682:return GM;case 35679:case 36299:case 36307:return WM;case 35680:case 36300:case 36308:case 36293:return XM;case 36289:case 36303:case 36311:case 36292:return YM}}class $M{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=AM(e.type)}}class KM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=qM(e.type)}}class ZM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const vc=/(\w+)(\])?(\[|\.)?/g;function id(r,t){r.seq.push(t),r.map[t.id]=t}function JM(r,t,e){const n=r.name,i=n.length;for(vc.lastIndex=0;;){const s=vc.exec(n),o=vc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){id(e,c===void 0?new $M(a,r,t):new KM(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new ZM(a),id(e,d)),e=d}}}class Qa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);JM(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function rd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const jM=37297;let QM=0;function ty(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function ey(r){const t=pe.getPrimaries(pe.workingColorSpace),e=pe.getPrimaries(r);let n;switch(t===e?n="":t===dl&&e===fl?n="LinearDisplayP3ToLinearSRGB":t===fl&&e===dl&&(n="LinearSRGBToLinearDisplayP3"),r){case vr:case yl:return[n,"LinearTransferOETF"];case gi:case vh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function sd(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+ty(r.getShaderSource(t),o)}else return i}function ny(r,t){const e=ey(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function iy(r,t){let e;switch(t){case s0:e="Linear";break;case o0:e="Reinhard";break;case a0:e="Cineon";break;case $p:e="ACESFilmic";break;case c0:e="AgX";break;case u0:e="Neutral";break;case l0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ua=new U;function ry(){pe.getLuminanceCoefficients(Ua);const r=Ua.x.toFixed(4),t=Ua.y.toFixed(4),e=Ua.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function oy(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ay(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function vo(r){return r!==""}function od(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ad(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ly=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ou(r){return r.replace(ly,uy)}const cy=new Map;function uy(r,t){let e=Zt[t];if(e===void 0){const n=cy.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ou(e)}const hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ld(r){return r.replace(hy,fy)}function fy(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function cd(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dy(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Yp?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Bg?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function py(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Xs:case Ys:t="ENVMAP_TYPE_CUBE";break;case Ml:t="ENVMAP_TYPE_CUBE_UV";break}return t}function my(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ys:t="ENVMAP_MODE_REFRACTION";break}return t}function _y(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case qp:t="ENVMAP_BLENDING_MULTIPLY";break;case i0:t="ENVMAP_BLENDING_MIX";break;case r0:t="ENVMAP_BLENDING_ADD";break}return t}function gy(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function vy(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=dy(e),c=py(e),u=my(e),d=_y(e),h=gy(e),f=sy(e),m=oy(s),g=i.createProgram();let p,_,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(vo).join(`
`),p.length>0&&(p+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(vo).join(`
`),_.length>0&&(_+=`
`)):(p=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),_=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cr?"#define TONE_MAPPING":"",e.toneMapping!==cr?Zt.tonemapping_pars_fragment:"",e.toneMapping!==cr?iy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,ny("linearToOutputTexel",e.outputColorSpace),ry(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vo).join(`
`)),o=Ou(o),o=od(o,e),o=ad(o,e),a=Ou(a),a=od(a,e),a=ad(a,e),o=ld(o),a=ld(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["#define varying in",e.glslVersion===bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const x=S+p+o,M=S+_+a,A=rd(i,i.VERTEX_SHADER,x),w=rd(i,i.FRAGMENT_SHADER,M);i.attachShader(g,A),i.attachShader(g,w),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function y(T){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(g).trim(),z=i.getShaderInfoLog(A).trim(),H=i.getShaderInfoLog(w).trim();let q=!0,k=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,A,w);else{const Y=sd(i,A,"vertex"),W=sd(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+I+`
`+Y+`
`+W)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(z===""||H==="")&&(k=!1);k&&(T.diagnostics={runnable:q,programLog:I,vertexShader:{log:z,prefix:p},fragmentShader:{log:H,prefix:_}})}i.deleteShader(A),i.deleteShader(w),R=new Qa(i,g),D=ay(i,g)}let R;this.getUniforms=function(){return R===void 0&&y(this),R};let D;this.getAttributes=function(){return D===void 0&&y(this),D};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(g,jM)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=QM++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=A,this.fragmentShader=w,this}let xy=0;class Sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new My(t),e.set(t,n)),n}}class My{constructor(t){this.id=xy++,this.code=t,this.usedTimes=0}}function yy(r,t,e,n,i,s,o){const a=new fm,l=new Sy,c=new Set,u=[],d=i.logarithmicDepthBuffer,h=i.reverseDepthBuffer,f=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return c.add(v),v===0?"uv":`uv${v}`}function _(v,T,I,z,H){const q=z.fog,k=H.geometry,Y=v.isMeshStandardMaterial?z.environment:null,W=(v.isMeshStandardMaterial?e:t).get(v.envMap||Y),it=W&&W.mapping===Ml?W.image.height:null,P=g[v.type];v.precision!==null&&(m=i.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const at=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,zt=at!==void 0?at.length:0;let Yt=0;k.morphAttributes.position!==void 0&&(Yt=1),k.morphAttributes.normal!==void 0&&(Yt=2),k.morphAttributes.color!==void 0&&(Yt=3);let $,Q,ft,ot;if(P){const Rt=vi[P];$=Rt.vertexShader,Q=Rt.fragmentShader}else $=v.vertexShader,Q=v.fragmentShader,l.update(v),ft=l.getVertexShaderID(v),ot=l.getFragmentShaderID(v);const At=r.getRenderTarget(),yt=H.isInstancedMesh===!0,Xt=H.isBatchedMesh===!0,Gt=!!v.map,Ot=!!v.matcap,L=!!W,oe=!!v.aoMap,Ft=!!v.lightMap,kt=!!v.bumpMap,B=!!v.normalMap,jt=!!v.displacementMap,Dt=!!v.emissiveMap,C=!!v.metalnessMap,E=!!v.roughnessMap,X=v.anisotropy>0,J=v.clearcoat>0,et=v.dispersion>0,Z=v.iridescence>0,St=v.sheen>0,rt=v.transmission>0,dt=X&&!!v.anisotropyMap,Vt=J&&!!v.clearcoatMap,nt=J&&!!v.clearcoatNormalMap,vt=J&&!!v.clearcoatRoughnessMap,xt=Z&&!!v.iridescenceMap,Ut=Z&&!!v.iridescenceThicknessMap,gt=St&&!!v.sheenColorMap,qt=St&&!!v.sheenRoughnessMap,Bt=!!v.specularMap,ae=!!v.specularColorMap,N=!!v.specularIntensityMap,tt=rt&&!!v.transmissionMap,K=rt&&!!v.thicknessMap,j=!!v.gradientMap,lt=!!v.alphaMap,ct=v.alphaTest>0,$t=!!v.alphaHash,xe=!!v.extensions;let Ae=cr;v.toneMapped&&(At===null||At.isXRRenderTarget===!0)&&(Ae=r.toneMapping);const re={shaderID:P,shaderType:v.type,shaderName:v.name,vertexShader:$,fragmentShader:Q,defines:v.defines,customVertexShaderID:ft,customFragmentShaderID:ot,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:Xt,batchingColor:Xt&&H._colorsTexture!==null,instancing:yt,instancingColor:yt&&H.instanceColor!==null,instancingMorph:yt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:At===null?r.outputColorSpace:At.isXRRenderTarget===!0?At.texture.colorSpace:vr,alphaToCoverage:!!v.alphaToCoverage,map:Gt,matcap:Ot,envMap:L,envMapMode:L&&W.mapping,envMapCubeUVHeight:it,aoMap:oe,lightMap:Ft,bumpMap:kt,normalMap:B,displacementMap:f&&jt,emissiveMap:Dt,normalMapObjectSpace:B&&v.normalMapType===p0,normalMapTangentSpace:B&&v.normalMapType===om,metalnessMap:C,roughnessMap:E,anisotropy:X,anisotropyMap:dt,clearcoat:J,clearcoatMap:Vt,clearcoatNormalMap:nt,clearcoatRoughnessMap:vt,dispersion:et,iridescence:Z,iridescenceMap:xt,iridescenceThicknessMap:Ut,sheen:St,sheenColorMap:gt,sheenRoughnessMap:qt,specularMap:Bt,specularColorMap:ae,specularIntensityMap:N,transmission:rt,transmissionMap:tt,thicknessMap:K,gradientMap:j,opaque:v.transparent===!1&&v.blending===Ns&&v.alphaToCoverage===!1,alphaMap:lt,alphaTest:ct,alphaHash:$t,combine:v.combine,mapUv:Gt&&p(v.map.channel),aoMapUv:oe&&p(v.aoMap.channel),lightMapUv:Ft&&p(v.lightMap.channel),bumpMapUv:kt&&p(v.bumpMap.channel),normalMapUv:B&&p(v.normalMap.channel),displacementMapUv:jt&&p(v.displacementMap.channel),emissiveMapUv:Dt&&p(v.emissiveMap.channel),metalnessMapUv:C&&p(v.metalnessMap.channel),roughnessMapUv:E&&p(v.roughnessMap.channel),anisotropyMapUv:dt&&p(v.anisotropyMap.channel),clearcoatMapUv:Vt&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:nt&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:qt&&p(v.sheenRoughnessMap.channel),specularMapUv:Bt&&p(v.specularMap.channel),specularColorMapUv:ae&&p(v.specularColorMap.channel),specularIntensityMapUv:N&&p(v.specularIntensityMap.channel),transmissionMapUv:tt&&p(v.transmissionMap.channel),thicknessMapUv:K&&p(v.thicknessMap.channel),alphaMapUv:lt&&p(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(B||X),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!k.attributes.uv&&(Gt||lt),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:H.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:zt,morphTextureStride:Yt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ae,decodeVideoTexture:Gt&&v.map.isVideoTexture===!0&&pe.getTransfer(v.map.colorSpace)===we,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Oi,flipSided:v.side===Pn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return re.vertexUv1s=c.has(1),re.vertexUv2s=c.has(2),re.vertexUv3s=c.has(3),c.clear(),re}function S(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)T.push(I),T.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(x(T,v),M(T,v),T.push(r.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function x(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reverseDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.alphaToCoverage&&a.enable(20),v.push(a.mask)}function A(v){const T=g[v.type];let I;if(T){const z=vi[T];I=sv.clone(z.uniforms)}else I=v.uniforms;return I}function w(v,T){let I;for(let z=0,H=u.length;z<H;z++){const q=u[z];if(q.cacheKey===T){I=q,++I.usedTimes;break}}return I===void 0&&(I=new vy(r,T,v,s),u.push(I)),I}function y(v){if(--v.usedTimes===0){const T=u.indexOf(v);u[T]=u[u.length-1],u.pop(),v.destroy()}}function R(v){l.remove(v)}function D(){l.dispose()}return{getParameters:_,getProgramCacheKey:S,getUniforms:A,acquireProgram:w,releaseProgram:y,releaseShaderCache:R,programs:u,dispose:D}}function Ey(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Ty(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function ud(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function hd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(d,h,f,m,g,p){let _=r[t];return _===void 0?(_={id:d.id,object:d,geometry:h,material:f,groupOrder:m,renderOrder:d.renderOrder,z:g,group:p},r[t]=_):(_.id=d.id,_.object=d,_.geometry=h,_.material=f,_.groupOrder=m,_.renderOrder=d.renderOrder,_.z=g,_.group=p),t++,_}function a(d,h,f,m,g,p){const _=o(d,h,f,m,g,p);f.transmission>0?n.push(_):f.transparent===!0?i.push(_):e.push(_)}function l(d,h,f,m,g,p){const _=o(d,h,f,m,g,p);f.transmission>0?n.unshift(_):f.transparent===!0?i.unshift(_):e.unshift(_)}function c(d,h){e.length>1&&e.sort(d||Ty),n.length>1&&n.sort(h||ud),i.length>1&&i.sort(h||ud)}function u(){for(let d=t,h=r.length;d<h;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function by(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new hd,r.set(n,[o])):i>=s.length?(o=new hd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function wy(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new he};break;case"SpotLight":e={position:new U,direction:new U,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new he,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new he,groundColor:new he};break;case"RectAreaLight":e={color:new he,position:new U,halfWidth:new U,halfHeight:new U};break}return r[t.id]=e,e}}}function Ay(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Cy=0;function Ry(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Py(r){const t=new wy,e=Ay(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const i=new U,s=new Pe,o=new Pe;function a(c){let u=0,d=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let f=0,m=0,g=0,p=0,_=0,S=0,x=0,M=0,A=0,w=0,y=0;c.sort(Ry);for(let D=0,v=c.length;D<v;D++){const T=c[D],I=T.color,z=T.intensity,H=T.distance,q=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=I.r*z,d+=I.g*z,h+=I.b*z;else if(T.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(T.sh.coefficients[k],z);y++}else if(T.isDirectionalLight){const k=t.get(T);if(k.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const Y=T.shadow,W=e.get(T);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=T.shadow.matrix,S++}n.directional[f]=k,f++}else if(T.isSpotLight){const k=t.get(T);k.position.setFromMatrixPosition(T.matrixWorld),k.color.copy(I).multiplyScalar(z),k.distance=H,k.coneCos=Math.cos(T.angle),k.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),k.decay=T.decay,n.spot[g]=k;const Y=T.shadow;if(T.map&&(n.spotLightMap[A]=T.map,A++,Y.updateMatrices(T),T.castShadow&&w++),n.spotLightMatrix[g]=Y.matrix,T.castShadow){const W=e.get(T);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.spotShadow[g]=W,n.spotShadowMap[g]=q,M++}g++}else if(T.isRectAreaLight){const k=t.get(T);k.color.copy(I).multiplyScalar(z),k.halfWidth.set(T.width*.5,0,0),k.halfHeight.set(0,T.height*.5,0),n.rectArea[p]=k,p++}else if(T.isPointLight){const k=t.get(T);if(k.color.copy(T.color).multiplyScalar(T.intensity),k.distance=T.distance,k.decay=T.decay,T.castShadow){const Y=T.shadow,W=e.get(T);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,W.shadowCameraNear=Y.camera.near,W.shadowCameraFar=Y.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=T.shadow.matrix,x++}n.point[m]=k,m++}else if(T.isHemisphereLight){const k=t.get(T);k.skyColor.copy(T.color).multiplyScalar(z),k.groundColor.copy(T.groundColor).multiplyScalar(z),n.hemi[_]=k,_++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==g||R.rectAreaLength!==p||R.hemiLength!==_||R.numDirectionalShadows!==S||R.numPointShadows!==x||R.numSpotShadows!==M||R.numSpotMaps!==A||R.numLightProbes!==y)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=p,n.point.length=m,n.hemi.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=y,R.directionalLength=f,R.pointLength=m,R.spotLength=g,R.rectAreaLength=p,R.hemiLength=_,R.numDirectionalShadows=S,R.numPointShadows=x,R.numSpotShadows=M,R.numSpotMaps=A,R.numLightProbes=y,n.version=Cy++)}function l(c,u){let d=0,h=0,f=0,m=0,g=0;const p=u.matrixWorldInverse;for(let _=0,S=c.length;_<S;_++){const x=c[_];if(x.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),d++}else if(x.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),h++}else if(x.isHemisphereLight){const M=n.hemi[g];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function fd(r){const t=new Py(r),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Ly(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new fd(r),t.set(i,[a])):s>=o.length?(a=new fd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Dy extends to{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=f0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Iy extends to{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Uy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ny=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Oy(r,t,e){let n=new Sh;const i=new Et,s=new Et,o=new Ue,a=new Dy({depthPacking:d0}),l=new Iy,c={},u=e.maxTextureSize,d={[mr]:Pn,[Pn]:mr,[Oi]:Oi},h=new _r({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Uy,fragmentShader:Ny}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new In;m.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ie(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yp;let _=this.type;this.render=function(w,y,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const D=r.getRenderTarget(),v=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),I=r.state;I.setBlending(lr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const z=_!==Di&&this.type===Di,H=_===Di&&this.type!==Di;for(let q=0,k=w.length;q<k;q++){const Y=w[q],W=Y.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const it=W.getFrameExtents();if(i.multiply(it),s.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/it.x),i.x=s.x*it.x,W.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/it.y),i.y=s.y*it.y,W.mapSize.y=s.y)),W.map===null||z===!0||H===!0){const at=this.type!==Di?{minFilter:ii,magFilter:ii}:{};W.map!==null&&W.map.dispose(),W.map=new Qr(i.x,i.y,at),W.map.texture.name=Y.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const P=W.getViewportCount();for(let at=0;at<P;at++){const zt=W.getViewport(at);o.set(s.x*zt.x,s.y*zt.y,s.x*zt.z,s.y*zt.w),I.viewport(o),W.updateMatrices(Y,at),n=W.getFrustum(),M(y,R,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===Di&&S(W,R),W.needsUpdate=!1}_=this.type,p.needsUpdate=!1,r.setRenderTarget(D,v,T)};function S(w,y){const R=t.update(g);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Qr(i.x,i.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(y,null,R,h,g,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(y,null,R,f,g,null)}function x(w,y,R,D){let v=null;const T=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)v=T;else if(v=R.isPointLight===!0?l:a,r.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const I=v.uuid,z=y.uuid;let H=c[I];H===void 0&&(H={},c[I]=H);let q=H[z];q===void 0&&(q=v.clone(),H[z]=q,y.addEventListener("dispose",A)),v=q}if(v.visible=y.visible,v.wireframe=y.wireframe,D===Di?v.side=y.shadowSide!==null?y.shadowSide:y.side:v.side=y.shadowSide!==null?y.shadowSide:d[y.side],v.alphaMap=y.alphaMap,v.alphaTest=y.alphaTest,v.map=y.map,v.clipShadows=y.clipShadows,v.clippingPlanes=y.clippingPlanes,v.clipIntersection=y.clipIntersection,v.displacementMap=y.displacementMap,v.displacementScale=y.displacementScale,v.displacementBias=y.displacementBias,v.wireframeLinewidth=y.wireframeLinewidth,v.linewidth=y.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const I=r.properties.get(v);I.light=R}return v}function M(w,y,R,D,v){if(w.visible===!1)return;if(w.layers.test(y.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===Di)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const z=t.update(w),H=w.material;if(Array.isArray(H)){const q=z.groups;for(let k=0,Y=q.length;k<Y;k++){const W=q[k],it=H[W.materialIndex];if(it&&it.visible){const P=x(w,it,D,v);w.onBeforeShadow(r,w,y,R,z,P,W),r.renderBufferDirect(R,null,z,P,w,W),w.onAfterShadow(r,w,y,R,z,P,W)}}}else if(H.visible){const q=x(w,H,D,v);w.onBeforeShadow(r,w,y,R,z,q,null),r.renderBufferDirect(R,null,z,q,w,null),w.onAfterShadow(r,w,y,R,z,q,null)}}const I=w.children;for(let z=0,H=I.length;z<H;z++)M(I[z],y,R,D,v)}function A(w){w.target.removeEventListener("dispose",A);for(const R in c){const D=c[R],v=w.target.uuid;v in D&&(D[v].dispose(),delete D[v])}}}const Fy={[jc]:Qc,[tu]:iu,[eu]:ru,[Ws]:nu,[Qc]:jc,[iu]:tu,[ru]:eu,[nu]:Ws};function By(r){function t(){let N=!1;const tt=new Ue;let K=null;const j=new Ue(0,0,0,0);return{setMask:function(lt){K!==lt&&!N&&(r.colorMask(lt,lt,lt,lt),K=lt)},setLocked:function(lt){N=lt},setClear:function(lt,ct,$t,xe,Ae){Ae===!0&&(lt*=xe,ct*=xe,$t*=xe),tt.set(lt,ct,$t,xe),j.equals(tt)===!1&&(r.clearColor(lt,ct,$t,xe),j.copy(tt))},reset:function(){N=!1,K=null,j.set(-1,0,0,0)}}}function e(){let N=!1,tt=!1,K=null,j=null,lt=null;return{setReversed:function(ct){tt=ct},setTest:function(ct){ct?ft(r.DEPTH_TEST):ot(r.DEPTH_TEST)},setMask:function(ct){K!==ct&&!N&&(r.depthMask(ct),K=ct)},setFunc:function(ct){if(tt&&(ct=Fy[ct]),j!==ct){switch(ct){case jc:r.depthFunc(r.NEVER);break;case Qc:r.depthFunc(r.ALWAYS);break;case tu:r.depthFunc(r.LESS);break;case Ws:r.depthFunc(r.LEQUAL);break;case eu:r.depthFunc(r.EQUAL);break;case nu:r.depthFunc(r.GEQUAL);break;case iu:r.depthFunc(r.GREATER);break;case ru:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=ct}},setLocked:function(ct){N=ct},setClear:function(ct){lt!==ct&&(r.clearDepth(ct),lt=ct)},reset:function(){N=!1,K=null,j=null,lt=null}}}function n(){let N=!1,tt=null,K=null,j=null,lt=null,ct=null,$t=null,xe=null,Ae=null;return{setTest:function(re){N||(re?ft(r.STENCIL_TEST):ot(r.STENCIL_TEST))},setMask:function(re){tt!==re&&!N&&(r.stencilMask(re),tt=re)},setFunc:function(re,Rt,Tt){(K!==re||j!==Rt||lt!==Tt)&&(r.stencilFunc(re,Rt,Tt),K=re,j=Rt,lt=Tt)},setOp:function(re,Rt,Tt){(ct!==re||$t!==Rt||xe!==Tt)&&(r.stencilOp(re,Rt,Tt),ct=re,$t=Rt,xe=Tt)},setLocked:function(re){N=re},setClear:function(re){Ae!==re&&(r.clearStencil(re),Ae=re)},reset:function(){N=!1,tt=null,K=null,j=null,lt=null,ct=null,$t=null,xe=null,Ae=null}}}const i=new t,s=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},u={},d=new WeakMap,h=[],f=null,m=!1,g=null,p=null,_=null,S=null,x=null,M=null,A=null,w=new he(0,0,0),y=0,R=!1,D=null,v=null,T=null,I=null,z=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,k=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=k>=1):Y.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=k>=2);let W=null,it={};const P=r.getParameter(r.SCISSOR_BOX),at=r.getParameter(r.VIEWPORT),zt=new Ue().fromArray(P),Yt=new Ue().fromArray(at);function $(N,tt,K,j){const lt=new Uint8Array(4),ct=r.createTexture();r.bindTexture(N,ct),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $t=0;$t<K;$t++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(tt,0,r.RGBA,1,1,j,0,r.RGBA,r.UNSIGNED_BYTE,lt):r.texImage2D(tt+$t,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,lt);return ct}const Q={};Q[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ft(r.DEPTH_TEST),s.setFunc(Ws),Ft(!1),kt(xf),ft(r.CULL_FACE),L(lr);function ft(N){c[N]!==!0&&(r.enable(N),c[N]=!0)}function ot(N){c[N]!==!1&&(r.disable(N),c[N]=!1)}function At(N,tt){return u[N]!==tt?(r.bindFramebuffer(N,tt),u[N]=tt,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=tt),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=tt),!0):!1}function yt(N,tt){let K=h,j=!1;if(N){K=d.get(tt),K===void 0&&(K=[],d.set(tt,K));const lt=N.textures;if(K.length!==lt.length||K[0]!==r.COLOR_ATTACHMENT0){for(let ct=0,$t=lt.length;ct<$t;ct++)K[ct]=r.COLOR_ATTACHMENT0+ct;K.length=lt.length,j=!0}}else K[0]!==r.BACK&&(K[0]=r.BACK,j=!0);j&&r.drawBuffers(K)}function Xt(N){return f!==N?(r.useProgram(N),f=N,!0):!1}const Gt={[Ur]:r.FUNC_ADD,[kg]:r.FUNC_SUBTRACT,[Hg]:r.FUNC_REVERSE_SUBTRACT};Gt[Vg]=r.MIN,Gt[Gg]=r.MAX;const Ot={[Wg]:r.ZERO,[Xg]:r.ONE,[Yg]:r.SRC_COLOR,[Zc]:r.SRC_ALPHA,[jg]:r.SRC_ALPHA_SATURATE,[Zg]:r.DST_COLOR,[$g]:r.DST_ALPHA,[qg]:r.ONE_MINUS_SRC_COLOR,[Jc]:r.ONE_MINUS_SRC_ALPHA,[Jg]:r.ONE_MINUS_DST_COLOR,[Kg]:r.ONE_MINUS_DST_ALPHA,[Qg]:r.CONSTANT_COLOR,[t0]:r.ONE_MINUS_CONSTANT_COLOR,[e0]:r.CONSTANT_ALPHA,[n0]:r.ONE_MINUS_CONSTANT_ALPHA};function L(N,tt,K,j,lt,ct,$t,xe,Ae,re){if(N===lr){m===!0&&(ot(r.BLEND),m=!1);return}if(m===!1&&(ft(r.BLEND),m=!0),N!==zg){if(N!==g||re!==R){if((p!==Ur||x!==Ur)&&(r.blendEquation(r.FUNC_ADD),p=Ur,x=Ur),re)switch(N){case Ns:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sf:r.blendFunc(r.ONE,r.ONE);break;case Mf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ns:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sf:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Mf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}_=null,S=null,M=null,A=null,w.set(0,0,0),y=0,g=N,R=re}return}lt=lt||tt,ct=ct||K,$t=$t||j,(tt!==p||lt!==x)&&(r.blendEquationSeparate(Gt[tt],Gt[lt]),p=tt,x=lt),(K!==_||j!==S||ct!==M||$t!==A)&&(r.blendFuncSeparate(Ot[K],Ot[j],Ot[ct],Ot[$t]),_=K,S=j,M=ct,A=$t),(xe.equals(w)===!1||Ae!==y)&&(r.blendColor(xe.r,xe.g,xe.b,Ae),w.copy(xe),y=Ae),g=N,R=!1}function oe(N,tt){N.side===Oi?ot(r.CULL_FACE):ft(r.CULL_FACE);let K=N.side===Pn;tt&&(K=!K),Ft(K),N.blending===Ns&&N.transparent===!1?L(lr):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),i.setMask(N.colorWrite);const j=N.stencilWrite;o.setTest(j),j&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),jt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ft(r.SAMPLE_ALPHA_TO_COVERAGE):ot(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(N){D!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),D=N)}function kt(N){N!==Og?(ft(r.CULL_FACE),N!==v&&(N===xf?r.cullFace(r.BACK):N===Fg?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ot(r.CULL_FACE),v=N}function B(N){N!==T&&(q&&r.lineWidth(N),T=N)}function jt(N,tt,K){N?(ft(r.POLYGON_OFFSET_FILL),(I!==tt||z!==K)&&(r.polygonOffset(tt,K),I=tt,z=K)):ot(r.POLYGON_OFFSET_FILL)}function Dt(N){N?ft(r.SCISSOR_TEST):ot(r.SCISSOR_TEST)}function C(N){N===void 0&&(N=r.TEXTURE0+H-1),W!==N&&(r.activeTexture(N),W=N)}function E(N,tt,K){K===void 0&&(W===null?K=r.TEXTURE0+H-1:K=W);let j=it[K];j===void 0&&(j={type:void 0,texture:void 0},it[K]=j),(j.type!==N||j.texture!==tt)&&(W!==K&&(r.activeTexture(K),W=K),r.bindTexture(N,tt||Q[N]),j.type=N,j.texture=tt)}function X(){const N=it[W];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Vt(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ut(N){zt.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),zt.copy(N))}function gt(N){Yt.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Yt.copy(N))}function qt(N,tt){let K=l.get(tt);K===void 0&&(K=new WeakMap,l.set(tt,K));let j=K.get(N);j===void 0&&(j=r.getUniformBlockIndex(tt,N.name),K.set(N,j))}function Bt(N,tt){const j=l.get(tt).get(N);a.get(tt)!==j&&(r.uniformBlockBinding(tt,j,N.__bindingPointIndex),a.set(tt,j))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},W=null,it={},u={},d=new WeakMap,h=[],f=null,m=!1,g=null,p=null,_=null,S=null,x=null,M=null,A=null,w=new he(0,0,0),y=0,R=!1,D=null,v=null,T=null,I=null,z=null,zt.set(0,0,r.canvas.width,r.canvas.height),Yt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:ft,disable:ot,bindFramebuffer:At,drawBuffers:yt,useProgram:Xt,setBlending:L,setMaterial:oe,setFlipSided:Ft,setCullFace:kt,setLineWidth:B,setPolygonOffset:jt,setScissorTest:Dt,activeTexture:C,bindTexture:E,unbindTexture:X,compressedTexImage2D:J,compressedTexImage3D:et,texImage2D:vt,texImage3D:xt,updateUBOMapping:qt,uniformBlockBinding:Bt,texStorage2D:Vt,texStorage3D:nt,texSubImage2D:Z,texSubImage3D:St,compressedTexSubImage2D:rt,compressedTexSubImage3D:dt,scissor:Ut,viewport:gt,reset:ae}}function dd(r,t,e,n){const i=zy(n);switch(e){case Qp:return r*t;case em:return r*t;case nm:return r*t*2;case im:return r*t/i.components*i.byteLength;case mh:return r*t/i.components*i.byteLength;case rm:return r*t*2/i.components*i.byteLength;case _h:return r*t*2/i.components*i.byteLength;case tm:return r*t*3/i.components*i.byteLength;case di:return r*t*4/i.components*i.byteLength;case gh:return r*t*4/i.components*i.byteLength;case qa:case $a:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ka:case Za:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case uu:case fu:return Math.max(r,16)*Math.max(t,8)/4;case cu:case hu:return Math.max(r,8)*Math.max(t,8)/2;case du:case pu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case mu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case _u:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case gu:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case vu:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case xu:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Su:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Mu:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case yu:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Eu:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Tu:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case bu:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case wu:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Au:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Cu:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Ru:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ja:case Pu:case Lu:return Math.ceil(r/4)*Math.ceil(t/4)*16;case sm:case Du:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Iu:case Uu:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zy(r){switch(r){case Gi:case Zp:return{byteLength:1,components:1};case Xo:case Jp:case Zo:return{byteLength:2,components:1};case dh:case ph:return{byteLength:2,components:4};case jr:case fh:case Bi:return{byteLength:4,components:1};case jp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function ky(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,E){return f?new OffscreenCanvas(C,E):ml("canvas")}function g(C,E,X){let J=1;const et=Dt(C);if((et.width>X||et.height>X)&&(J=X/Math.max(et.width,et.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(J*et.width),St=Math.floor(J*et.height);d===void 0&&(d=m(Z,St));const rt=E?m(Z,St):d;return rt.width=Z,rt.height=St,rt.getContext("2d").drawImage(C,0,0,Z,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Z+"x"+St+")."),rt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==ii&&C.minFilter!==hi}function _(C){r.generateMipmap(C)}function S(C,E,X,J,et=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=E;if(E===r.RED&&(X===r.FLOAT&&(Z=r.R32F),X===r.HALF_FLOAT&&(Z=r.R16F),X===r.UNSIGNED_BYTE&&(Z=r.R8)),E===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.R8UI),X===r.UNSIGNED_SHORT&&(Z=r.R16UI),X===r.UNSIGNED_INT&&(Z=r.R32UI),X===r.BYTE&&(Z=r.R8I),X===r.SHORT&&(Z=r.R16I),X===r.INT&&(Z=r.R32I)),E===r.RG&&(X===r.FLOAT&&(Z=r.RG32F),X===r.HALF_FLOAT&&(Z=r.RG16F),X===r.UNSIGNED_BYTE&&(Z=r.RG8)),E===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RG8UI),X===r.UNSIGNED_SHORT&&(Z=r.RG16UI),X===r.UNSIGNED_INT&&(Z=r.RG32UI),X===r.BYTE&&(Z=r.RG8I),X===r.SHORT&&(Z=r.RG16I),X===r.INT&&(Z=r.RG32I)),E===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RGB8UI),X===r.UNSIGNED_SHORT&&(Z=r.RGB16UI),X===r.UNSIGNED_INT&&(Z=r.RGB32UI),X===r.BYTE&&(Z=r.RGB8I),X===r.SHORT&&(Z=r.RGB16I),X===r.INT&&(Z=r.RGB32I)),E===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(Z=r.RGBA16UI),X===r.UNSIGNED_INT&&(Z=r.RGBA32UI),X===r.BYTE&&(Z=r.RGBA8I),X===r.SHORT&&(Z=r.RGBA16I),X===r.INT&&(Z=r.RGBA32I)),E===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),E===r.RGBA){const St=et?hl:pe.getTransfer(J);X===r.FLOAT&&(Z=r.RGBA32F),X===r.HALF_FLOAT&&(Z=r.RGBA16F),X===r.UNSIGNED_BYTE&&(Z=St===we?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(C,E){let X;return C?E===null||E===jr||E===qs?X=r.DEPTH24_STENCIL8:E===Bi?X=r.DEPTH32F_STENCIL8:E===Xo&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===jr||E===qs?X=r.DEPTH_COMPONENT24:E===Bi?X=r.DEPTH_COMPONENT32F:E===Xo&&(X=r.DEPTH_COMPONENT16),X}function M(C,E){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==ii&&C.minFilter!==hi?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function A(C){const E=C.target;E.removeEventListener("dispose",A),y(E),E.isVideoTexture&&u.delete(E)}function w(C){const E=C.target;E.removeEventListener("dispose",w),D(E)}function y(C){const E=n.get(C);if(E.__webglInit===void 0)return;const X=C.source,J=h.get(X);if(J){const et=J[E.__cacheKey];et.usedTimes--,et.usedTimes===0&&R(C),Object.keys(J).length===0&&h.delete(X)}n.remove(C)}function R(C){const E=n.get(C);r.deleteTexture(E.__webglTexture);const X=C.source,J=h.get(X);delete J[E.__cacheKey],o.memory.textures--}function D(C){const E=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let et=0;et<E.__webglFramebuffer[J].length;et++)r.deleteFramebuffer(E.__webglFramebuffer[J][et]);else r.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)r.deleteFramebuffer(E.__webglFramebuffer[J]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const X=C.textures;for(let J=0,et=X.length;J<et;J++){const Z=n.get(X[J]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(X[J])}n.remove(C)}let v=0;function T(){v=0}function I(){const C=v;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),v+=1,C}function z(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function H(C,E){const X=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){const J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Yt(X,C,E);return}}e.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+E)}function q(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Yt(X,C,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+E)}function k(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Yt(X,C,E);return}e.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+E)}function Y(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){$(X,C,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+E)}const W={[au]:r.REPEAT,[zr]:r.CLAMP_TO_EDGE,[lu]:r.MIRRORED_REPEAT},it={[ii]:r.NEAREST,[h0]:r.NEAREST_MIPMAP_NEAREST,[pa]:r.NEAREST_MIPMAP_LINEAR,[hi]:r.LINEAR,[Xl]:r.LINEAR_MIPMAP_NEAREST,[kr]:r.LINEAR_MIPMAP_LINEAR},P={[m0]:r.NEVER,[M0]:r.ALWAYS,[_0]:r.LESS,[am]:r.LEQUAL,[g0]:r.EQUAL,[S0]:r.GEQUAL,[v0]:r.GREATER,[x0]:r.NOTEQUAL};function at(C,E){if(E.type===Bi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===hi||E.magFilter===Xl||E.magFilter===pa||E.magFilter===kr||E.minFilter===hi||E.minFilter===Xl||E.minFilter===pa||E.minFilter===kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,W[E.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,W[E.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,W[E.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,it[E.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,it[E.minFilter]),E.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,P[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ii||E.minFilter!==pa&&E.minFilter!==kr||E.type===Bi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function zt(C,E){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",A));const J=E.source;let et=h.get(J);et===void 0&&(et={},h.set(J,et));const Z=z(E);if(Z!==C.__cacheKey){et[Z]===void 0&&(et[Z]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,X=!0),et[Z].usedTimes++;const St=et[C.__cacheKey];St!==void 0&&(et[C.__cacheKey].usedTimes--,St.usedTimes===0&&R(E)),C.__cacheKey=Z,C.__webglTexture=et[Z].texture}return X}function Yt(C,E,X){let J=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=r.TEXTURE_3D);const et=zt(C,E),Z=E.source;e.bindTexture(J,C.__webglTexture,r.TEXTURE0+X);const St=n.get(Z);if(Z.version!==St.__version||et===!0){e.activeTexture(r.TEXTURE0+X);const rt=pe.getPrimaries(pe.workingColorSpace),dt=E.colorSpace===Qi?null:pe.getPrimaries(E.colorSpace),Vt=E.colorSpace===Qi||rt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let nt=g(E.image,!1,i.maxTextureSize);nt=jt(E,nt);const vt=s.convert(E.format,E.colorSpace),xt=s.convert(E.type);let Ut=S(E.internalFormat,vt,xt,E.colorSpace,E.isVideoTexture);at(J,E);let gt;const qt=E.mipmaps,Bt=E.isVideoTexture!==!0,ae=St.__version===void 0||et===!0,N=Z.dataReady,tt=M(E,nt);if(E.isDepthTexture)Ut=x(E.format===$s,E.type),ae&&(Bt?e.texStorage2D(r.TEXTURE_2D,1,Ut,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,Ut,nt.width,nt.height,0,vt,xt,null));else if(E.isDataTexture)if(qt.length>0){Bt&&ae&&e.texStorage2D(r.TEXTURE_2D,tt,Ut,qt[0].width,qt[0].height);for(let K=0,j=qt.length;K<j;K++)gt=qt[K],Bt?N&&e.texSubImage2D(r.TEXTURE_2D,K,0,0,gt.width,gt.height,vt,xt,gt.data):e.texImage2D(r.TEXTURE_2D,K,Ut,gt.width,gt.height,0,vt,xt,gt.data);E.generateMipmaps=!1}else Bt?(ae&&e.texStorage2D(r.TEXTURE_2D,tt,Ut,nt.width,nt.height),N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,vt,xt,nt.data)):e.texImage2D(r.TEXTURE_2D,0,Ut,nt.width,nt.height,0,vt,xt,nt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Bt&&ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,tt,Ut,qt[0].width,qt[0].height,nt.depth);for(let K=0,j=qt.length;K<j;K++)if(gt=qt[K],E.format!==di)if(vt!==null)if(Bt){if(N)if(E.layerUpdates.size>0){const lt=dd(gt.width,gt.height,E.format,E.type);for(const ct of E.layerUpdates){const $t=gt.data.subarray(ct*lt/gt.data.BYTES_PER_ELEMENT,(ct+1)*lt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,ct,gt.width,gt.height,1,vt,$t,0,0)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,gt.width,gt.height,nt.depth,vt,gt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,K,Ut,gt.width,gt.height,nt.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?N&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,gt.width,gt.height,nt.depth,vt,xt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,K,Ut,gt.width,gt.height,nt.depth,0,vt,xt,gt.data)}else{Bt&&ae&&e.texStorage2D(r.TEXTURE_2D,tt,Ut,qt[0].width,qt[0].height);for(let K=0,j=qt.length;K<j;K++)gt=qt[K],E.format!==di?vt!==null?Bt?N&&e.compressedTexSubImage2D(r.TEXTURE_2D,K,0,0,gt.width,gt.height,vt,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,K,Ut,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?N&&e.texSubImage2D(r.TEXTURE_2D,K,0,0,gt.width,gt.height,vt,xt,gt.data):e.texImage2D(r.TEXTURE_2D,K,Ut,gt.width,gt.height,0,vt,xt,gt.data)}else if(E.isDataArrayTexture)if(Bt){if(ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,tt,Ut,nt.width,nt.height,nt.depth),N)if(E.layerUpdates.size>0){const K=dd(nt.width,nt.height,E.format,E.type);for(const j of E.layerUpdates){const lt=nt.data.subarray(j*K/nt.data.BYTES_PER_ELEMENT,(j+1)*K/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,vt,xt,lt)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,vt,xt,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ut,nt.width,nt.height,nt.depth,0,vt,xt,nt.data);else if(E.isData3DTexture)Bt?(ae&&e.texStorage3D(r.TEXTURE_3D,tt,Ut,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,vt,xt,nt.data)):e.texImage3D(r.TEXTURE_3D,0,Ut,nt.width,nt.height,nt.depth,0,vt,xt,nt.data);else if(E.isFramebufferTexture){if(ae)if(Bt)e.texStorage2D(r.TEXTURE_2D,tt,Ut,nt.width,nt.height);else{let K=nt.width,j=nt.height;for(let lt=0;lt<tt;lt++)e.texImage2D(r.TEXTURE_2D,lt,Ut,K,j,0,vt,xt,null),K>>=1,j>>=1}}else if(qt.length>0){if(Bt&&ae){const K=Dt(qt[0]);e.texStorage2D(r.TEXTURE_2D,tt,Ut,K.width,K.height)}for(let K=0,j=qt.length;K<j;K++)gt=qt[K],Bt?N&&e.texSubImage2D(r.TEXTURE_2D,K,0,0,vt,xt,gt):e.texImage2D(r.TEXTURE_2D,K,Ut,vt,xt,gt);E.generateMipmaps=!1}else if(Bt){if(ae){const K=Dt(nt);e.texStorage2D(r.TEXTURE_2D,tt,Ut,K.width,K.height)}N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,vt,xt,nt)}else e.texImage2D(r.TEXTURE_2D,0,Ut,vt,xt,nt);p(E)&&_(J),St.__version=Z.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function $(C,E,X){if(E.image.length!==6)return;const J=zt(C,E),et=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+X);const Z=n.get(et);if(et.version!==Z.__version||J===!0){e.activeTexture(r.TEXTURE0+X);const St=pe.getPrimaries(pe.workingColorSpace),rt=E.colorSpace===Qi?null:pe.getPrimaries(E.colorSpace),dt=E.colorSpace===Qi||St===rt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Vt=E.isCompressedTexture||E.image[0].isCompressedTexture,nt=E.image[0]&&E.image[0].isDataTexture,vt=[];for(let j=0;j<6;j++)!Vt&&!nt?vt[j]=g(E.image[j],!0,i.maxCubemapSize):vt[j]=nt?E.image[j].image:E.image[j],vt[j]=jt(E,vt[j]);const xt=vt[0],Ut=s.convert(E.format,E.colorSpace),gt=s.convert(E.type),qt=S(E.internalFormat,Ut,gt,E.colorSpace),Bt=E.isVideoTexture!==!0,ae=Z.__version===void 0||J===!0,N=et.dataReady;let tt=M(E,xt);at(r.TEXTURE_CUBE_MAP,E);let K;if(Vt){Bt&&ae&&e.texStorage2D(r.TEXTURE_CUBE_MAP,tt,qt,xt.width,xt.height);for(let j=0;j<6;j++){K=vt[j].mipmaps;for(let lt=0;lt<K.length;lt++){const ct=K[lt];E.format!==di?Ut!==null?Bt?N&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt,0,0,ct.width,ct.height,Ut,ct.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt,qt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt,0,0,ct.width,ct.height,Ut,gt,ct.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt,qt,ct.width,ct.height,0,Ut,gt,ct.data)}}}else{if(K=E.mipmaps,Bt&&ae){K.length>0&&tt++;const j=Dt(vt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,tt,qt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){Bt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,vt[j].width,vt[j].height,Ut,gt,vt[j].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qt,vt[j].width,vt[j].height,0,Ut,gt,vt[j].data);for(let lt=0;lt<K.length;lt++){const $t=K[lt].image[j].image;Bt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt+1,0,0,$t.width,$t.height,Ut,gt,$t.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt+1,qt,$t.width,$t.height,0,Ut,gt,$t.data)}}else{Bt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ut,gt,vt[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qt,Ut,gt,vt[j]);for(let lt=0;lt<K.length;lt++){const ct=K[lt];Bt?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt+1,0,0,Ut,gt,ct.image[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,lt+1,qt,Ut,gt,ct.image[j])}}}p(E)&&_(r.TEXTURE_CUBE_MAP),Z.__version=et.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Q(C,E,X,J,et,Z){const St=s.convert(X.format,X.colorSpace),rt=s.convert(X.type),dt=S(X.internalFormat,St,rt,X.colorSpace);if(!n.get(E).__hasExternalTextures){const nt=Math.max(1,E.width>>Z),vt=Math.max(1,E.height>>Z);et===r.TEXTURE_3D||et===r.TEXTURE_2D_ARRAY?e.texImage3D(et,Z,dt,nt,vt,E.depth,0,St,rt,null):e.texImage2D(et,Z,dt,nt,vt,0,St,rt,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),kt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,et,n.get(X).__webglTexture,0,Ft(E)):(et===r.TEXTURE_2D||et>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,et,n.get(X).__webglTexture,Z),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ft(C,E,X){if(r.bindRenderbuffer(r.RENDERBUFFER,C),E.depthBuffer){const J=E.depthTexture,et=J&&J.isDepthTexture?J.type:null,Z=x(E.stencilBuffer,et),St=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,rt=Ft(E);kt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,rt,Z,E.width,E.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,rt,Z,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Z,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,C)}else{const J=E.textures;for(let et=0;et<J.length;et++){const Z=J[et],St=s.convert(Z.format,Z.colorSpace),rt=s.convert(Z.type),dt=S(Z.internalFormat,St,rt,Z.colorSpace),Vt=Ft(E);X&&kt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Vt,dt,E.width,E.height):kt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Vt,dt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,dt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ot(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),H(E.depthTexture,0);const J=n.get(E.depthTexture).__webglTexture,et=Ft(E);if(E.depthTexture.format===Os)kt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,J,0,et):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,J,0);else if(E.depthTexture.format===$s)kt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,J,0,et):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function At(C){const E=n.get(C),X=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const et=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",et)};J.addEventListener("dispose",et),E.__depthDisposeCallback=et}E.__boundDepthTexture=J}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ot(E.__webglFramebuffer,C)}else if(X){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=r.createRenderbuffer(),ft(E.__webglDepthbuffer[J],C,!1);else{const et=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,et,r.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),ft(E.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,et=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,et),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,et)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function yt(C,E,X){const J=n.get(C);E!==void 0&&Q(J.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&At(C)}function Xt(C){const E=C.texture,X=n.get(C),J=n.get(E);C.addEventListener("dispose",w);const et=C.textures,Z=C.isWebGLCubeRenderTarget===!0,St=et.length>1;if(St||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=E.version,o.memory.textures++),Z){X.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[rt]=[];for(let dt=0;dt<E.mipmaps.length;dt++)X.__webglFramebuffer[rt][dt]=r.createFramebuffer()}else X.__webglFramebuffer[rt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let rt=0;rt<E.mipmaps.length;rt++)X.__webglFramebuffer[rt]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(St)for(let rt=0,dt=et.length;rt<dt;rt++){const Vt=n.get(et[rt]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=r.createTexture(),o.memory.textures++)}if(C.samples>0&&kt(C)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let rt=0;rt<et.length;rt++){const dt=et[rt];X.__webglColorRenderbuffer[rt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[rt]);const Vt=s.convert(dt.format,dt.colorSpace),nt=s.convert(dt.type),vt=S(dt.internalFormat,Vt,nt,dt.colorSpace,C.isXRRenderTarget===!0),xt=Ft(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,xt,vt,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+rt,r.RENDERBUFFER,X.__webglColorRenderbuffer[rt])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),ft(X.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),at(r.TEXTURE_CUBE_MAP,E);for(let rt=0;rt<6;rt++)if(E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)Q(X.__webglFramebuffer[rt][dt],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,dt);else Q(X.__webglFramebuffer[rt],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(E)&&_(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let rt=0,dt=et.length;rt<dt;rt++){const Vt=et[rt],nt=n.get(Vt);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),at(r.TEXTURE_2D,Vt),Q(X.__webglFramebuffer,C,Vt,r.COLOR_ATTACHMENT0+rt,r.TEXTURE_2D,0),p(Vt)&&_(r.TEXTURE_2D)}e.unbindTexture()}else{let rt=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(rt=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(rt,J.__webglTexture),at(rt,E),E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)Q(X.__webglFramebuffer[dt],C,E,r.COLOR_ATTACHMENT0,rt,dt);else Q(X.__webglFramebuffer,C,E,r.COLOR_ATTACHMENT0,rt,0);p(E)&&_(rt),e.unbindTexture()}C.depthBuffer&&At(C)}function Gt(C){const E=C.textures;for(let X=0,J=E.length;X<J;X++){const et=E[X];if(p(et)){const Z=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,St=n.get(et).__webglTexture;e.bindTexture(Z,St),_(Z),e.unbindTexture()}}}const Ot=[],L=[];function oe(C){if(C.samples>0){if(kt(C)===!1){const E=C.textures,X=C.width,J=C.height;let et=r.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,St=n.get(C),rt=E.length>1;if(rt)for(let dt=0;dt<E.length;dt++)e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let dt=0;dt<E.length;dt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(et|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(et|=r.STENCIL_BUFFER_BIT)),rt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,St.__webglColorRenderbuffer[dt]);const Vt=n.get(E[dt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Vt,0)}r.blitFramebuffer(0,0,X,J,0,0,X,J,et,r.NEAREST),l===!0&&(Ot.length=0,L.length=0,Ot.push(r.COLOR_ATTACHMENT0+dt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ot.push(Z),L.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),rt)for(let dt=0;dt<E.length;dt++){e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,St.__webglColorRenderbuffer[dt]);const Vt=n.get(E[dt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,Vt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Ft(C){return Math.min(i.maxSamples,C.samples)}function kt(C){const E=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function B(C){const E=o.render.frame;u.get(C)!==E&&(u.set(C,E),C.update())}function jt(C,E){const X=C.colorSpace,J=C.format,et=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==vr&&X!==Qi&&(pe.getTransfer(X)===we?(J!==di||et!==Gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function Dt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=T,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=k,this.setTextureCube=Y,this.rebindTextures=yt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=kt}function Hy(r,t){function e(n,i=Qi){let s;const o=pe.getTransfer(i);if(n===Gi)return r.UNSIGNED_BYTE;if(n===dh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ph)return r.UNSIGNED_SHORT_5_5_5_1;if(n===jp)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Zp)return r.BYTE;if(n===Jp)return r.SHORT;if(n===Xo)return r.UNSIGNED_SHORT;if(n===fh)return r.INT;if(n===jr)return r.UNSIGNED_INT;if(n===Bi)return r.FLOAT;if(n===Zo)return r.HALF_FLOAT;if(n===Qp)return r.ALPHA;if(n===tm)return r.RGB;if(n===di)return r.RGBA;if(n===em)return r.LUMINANCE;if(n===nm)return r.LUMINANCE_ALPHA;if(n===Os)return r.DEPTH_COMPONENT;if(n===$s)return r.DEPTH_STENCIL;if(n===im)return r.RED;if(n===mh)return r.RED_INTEGER;if(n===rm)return r.RG;if(n===_h)return r.RG_INTEGER;if(n===gh)return r.RGBA_INTEGER;if(n===qa||n===$a||n===Ka||n===Za)if(o===we)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===qa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===qa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cu||n===uu||n===hu||n===fu)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===cu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===hu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===du||n===pu||n===mu)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===du||n===pu)return o===we?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===mu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_u||n===gu||n===vu||n===xu||n===Su||n===Mu||n===yu||n===Eu||n===Tu||n===bu||n===wu||n===Au||n===Cu||n===Ru)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===_u)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Su)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Au)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cu)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ru)return o===we?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===Pu||n===Lu)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ja)return o===we?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sm||n===Du||n===Iu||n===Uu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ja)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Du)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Iu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Vy extends ti{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class en extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gy={type:"move"};class xc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),_=this._getHandJoint(c,g);p!==null&&(_.matrix.fromArray(p.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=p.radius),_.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Yy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ln,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new _r({vertexShader:Wy,fragmentShader:Xy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new Tl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qy extends js{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null;const g=new Yy,p=e.getContextAttributes();let _=null,S=null;const x=[],M=[],A=new Et;let w=null;const y=new ti;y.layers.enable(1),y.viewport=new Ue;const R=new ti;R.layers.enable(2),R.viewport=new Ue;const D=[y,R],v=new Vy;v.layers.enable(1),v.layers.enable(2);let T=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=x[$];return Q===void 0&&(Q=new xc,x[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=x[$];return Q===void 0&&(Q=new xc,x[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=x[$];return Q===void 0&&(Q=new xc,x[$]=Q),Q.getHandSpace()};function z($){const Q=M.indexOf($.inputSource);if(Q===-1)return;const ft=x[Q];ft!==void 0&&(ft.update($.inputSource,$.frame,c||o),ft.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",q);for(let $=0;$<x.length;$++){const Q=M[$];Q!==null&&(M[$]=null,x[$].disconnect(Q))}T=null,I=null,g.reset(),t.setRenderTarget(_),f=null,h=null,d=null,i=null,S=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(_=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",H),i.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(A),i.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,Q),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Qr(f.framebufferWidth,f.framebufferHeight,{format:di,type:Gi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,ft=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=p.stencil?$s:Os,ft=p.stencil?qs:jr);const At={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};d=new XRWebGLBinding(i,e),h=d.createProjectionLayer(At),i.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Qr(h.textureWidth,h.textureHeight,{format:di,type:Gi,depthTexture:new ym(h.textureWidth,h.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Yt.setContext(i),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q($){for(let Q=0;Q<$.removed.length;Q++){const ft=$.removed[Q],ot=M.indexOf(ft);ot>=0&&(M[ot]=null,x[ot].disconnect(ft))}for(let Q=0;Q<$.added.length;Q++){const ft=$.added[Q];let ot=M.indexOf(ft);if(ot===-1){for(let yt=0;yt<x.length;yt++)if(yt>=M.length){M.push(ft),ot=yt;break}else if(M[yt]===null){M[yt]=ft,ot=yt;break}if(ot===-1)break}const At=x[ot];At&&At.connect(ft)}}const k=new U,Y=new U;function W($,Q,ft){k.setFromMatrixPosition(Q.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);const ot=k.distanceTo(Y),At=Q.projectionMatrix.elements,yt=ft.projectionMatrix.elements,Xt=At[14]/(At[10]-1),Gt=At[14]/(At[10]+1),Ot=(At[9]+1)/At[5],L=(At[9]-1)/At[5],oe=(At[8]-1)/At[0],Ft=(yt[8]+1)/yt[0],kt=Xt*oe,B=Xt*Ft,jt=ot/(-oe+Ft),Dt=jt*-oe;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Dt),$.translateZ(jt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),At[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const C=Xt+jt,E=Gt+jt,X=kt-Dt,J=B+(ot-Dt),et=Ot*Gt/E*C,Z=L*Gt/E*C;$.projectionMatrix.makePerspective(X,J,et,Z,C,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function it($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,ft=$.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),v.near=R.near=y.near=Q,v.far=R.far=y.far=ft,(T!==v.near||I!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),T=v.near,I=v.far);const ot=$.parent,At=v.cameras;it(v,ot);for(let yt=0;yt<At.length;yt++)it(At[yt],ot);At.length===2?W(v,y,R):v.projectionMatrix.copy(y.projectionMatrix),P($,v,ot)};function P($,Q,ft){ft===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(ft.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Yo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(v)};let at=null;function zt($,Q){if(u=Q.getViewerPose(c||o),m=Q,u!==null){const ft=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let ot=!1;ft.length!==v.cameras.length&&(v.cameras.length=0,ot=!0);for(let yt=0;yt<ft.length;yt++){const Xt=ft[yt];let Gt=null;if(f!==null)Gt=f.getViewport(Xt);else{const L=d.getViewSubImage(h,Xt);Gt=L.viewport,yt===0&&(t.setRenderTargetTextures(S,L.colorTexture,h.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(S))}let Ot=D[yt];Ot===void 0&&(Ot=new ti,Ot.layers.enable(yt),Ot.viewport=new Ue,D[yt]=Ot),Ot.matrix.fromArray(Xt.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(Xt.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),yt===0&&(v.matrix.copy(Ot.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ot===!0&&v.cameras.push(Ot)}const At=i.enabledFeatures;if(At&&At.includes("depth-sensing")){const yt=d.getDepthInformation(ft[0]);yt&&yt.isValid&&yt.texture&&g.init(t,yt,i.renderState)}}for(let ft=0;ft<x.length;ft++){const ot=M[ft],At=x[ft];ot!==null&&At!==void 0&&At.update(ot,Q,c||o)}at&&at($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),m=null}const Yt=new Sm;Yt.setAnimationLoop(zt),this.setAnimationLoop=function($){at=$},this.dispose=function(){}}}const wr=new Ti,$y=new Pe;function Ky(r,t){function e(p,_){p.matrixAutoUpdate===!0&&p.updateMatrix(),_.value.copy(p.matrix)}function n(p,_){_.color.getRGB(p.fogColor.value,gm(r)),_.isFog?(p.fogNear.value=_.near,p.fogFar.value=_.far):_.isFogExp2&&(p.fogDensity.value=_.density)}function i(p,_,S,x,M){_.isMeshBasicMaterial||_.isMeshLambertMaterial?s(p,_):_.isMeshToonMaterial?(s(p,_),d(p,_)):_.isMeshPhongMaterial?(s(p,_),u(p,_)):_.isMeshStandardMaterial?(s(p,_),h(p,_),_.isMeshPhysicalMaterial&&f(p,_,M)):_.isMeshMatcapMaterial?(s(p,_),m(p,_)):_.isMeshDepthMaterial?s(p,_):_.isMeshDistanceMaterial?(s(p,_),g(p,_)):_.isMeshNormalMaterial?s(p,_):_.isLineBasicMaterial?(o(p,_),_.isLineDashedMaterial&&a(p,_)):_.isPointsMaterial?l(p,_,S,x):_.isSpriteMaterial?c(p,_):_.isShadowMaterial?(p.color.value.copy(_.color),p.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(p,_){p.opacity.value=_.opacity,_.color&&p.diffuse.value.copy(_.color),_.emissive&&p.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(p.map.value=_.map,e(_.map,p.mapTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.bumpMap&&(p.bumpMap.value=_.bumpMap,e(_.bumpMap,p.bumpMapTransform),p.bumpScale.value=_.bumpScale,_.side===Pn&&(p.bumpScale.value*=-1)),_.normalMap&&(p.normalMap.value=_.normalMap,e(_.normalMap,p.normalMapTransform),p.normalScale.value.copy(_.normalScale),_.side===Pn&&p.normalScale.value.negate()),_.displacementMap&&(p.displacementMap.value=_.displacementMap,e(_.displacementMap,p.displacementMapTransform),p.displacementScale.value=_.displacementScale,p.displacementBias.value=_.displacementBias),_.emissiveMap&&(p.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,p.emissiveMapTransform)),_.specularMap&&(p.specularMap.value=_.specularMap,e(_.specularMap,p.specularMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest);const S=t.get(_),x=S.envMap,M=S.envMapRotation;x&&(p.envMap.value=x,wr.copy(M),wr.x*=-1,wr.y*=-1,wr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),p.envMapRotation.value.setFromMatrix4($y.makeRotationFromEuler(wr)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=_.reflectivity,p.ior.value=_.ior,p.refractionRatio.value=_.refractionRatio),_.lightMap&&(p.lightMap.value=_.lightMap,p.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,p.lightMapTransform)),_.aoMap&&(p.aoMap.value=_.aoMap,p.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,p.aoMapTransform))}function o(p,_){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,_.map&&(p.map.value=_.map,e(_.map,p.mapTransform))}function a(p,_){p.dashSize.value=_.dashSize,p.totalSize.value=_.dashSize+_.gapSize,p.scale.value=_.scale}function l(p,_,S,x){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,p.size.value=_.size*S,p.scale.value=x*.5,_.map&&(p.map.value=_.map,e(_.map,p.uvTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest)}function c(p,_){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,p.rotation.value=_.rotation,_.map&&(p.map.value=_.map,e(_.map,p.mapTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest)}function u(p,_){p.specular.value.copy(_.specular),p.shininess.value=Math.max(_.shininess,1e-4)}function d(p,_){_.gradientMap&&(p.gradientMap.value=_.gradientMap)}function h(p,_){p.metalness.value=_.metalness,_.metalnessMap&&(p.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,p.metalnessMapTransform)),p.roughness.value=_.roughness,_.roughnessMap&&(p.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,p.roughnessMapTransform)),_.envMap&&(p.envMapIntensity.value=_.envMapIntensity)}function f(p,_,S){p.ior.value=_.ior,_.sheen>0&&(p.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),p.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(p.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,p.sheenColorMapTransform)),_.sheenRoughnessMap&&(p.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,p.sheenRoughnessMapTransform))),_.clearcoat>0&&(p.clearcoat.value=_.clearcoat,p.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(p.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,p.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(p.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Pn&&p.clearcoatNormalScale.value.negate())),_.dispersion>0&&(p.dispersion.value=_.dispersion),_.iridescence>0&&(p.iridescence.value=_.iridescence,p.iridescenceIOR.value=_.iridescenceIOR,p.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(p.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,p.iridescenceMapTransform)),_.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),_.transmission>0&&(p.transmission.value=_.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),_.transmissionMap&&(p.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,p.transmissionMapTransform)),p.thickness.value=_.thickness,_.thicknessMap&&(p.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=_.attenuationDistance,p.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(p.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(p.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=_.specularIntensity,p.specularColor.value.copy(_.specularColor),_.specularColorMap&&(p.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,p.specularColorMapTransform)),_.specularIntensityMap&&(p.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,_){_.matcap&&(p.matcap.value=_.matcap)}function g(p,_){const S=t.get(_).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Zy(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const M=x.program;n.uniformBlockBinding(S,M)}function c(S,x){let M=i[S.id];M===void 0&&(m(S),M=u(S),i[S.id]=M,S.addEventListener("dispose",p));const A=x.program;n.updateUBOMapping(S,A);const w=t.render.frame;s[S.id]!==w&&(h(S),s[S.id]=w)}function u(S){const x=d();S.__bindingPointIndex=x;const M=r.createBuffer(),A=S.__size,w=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const x=i[S.id],M=S.uniforms,A=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let w=0,y=M.length;w<y;w++){const R=Array.isArray(M[w])?M[w]:[M[w]];for(let D=0,v=R.length;D<v;D++){const T=R[D];if(f(T,w,D,A)===!0){const I=T.__offset,z=Array.isArray(T.value)?T.value:[T.value];let H=0;for(let q=0;q<z.length;q++){const k=z[q],Y=g(k);typeof k=="number"||typeof k=="boolean"?(T.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,I+H,T.__data)):k.isMatrix3?(T.__data[0]=k.elements[0],T.__data[1]=k.elements[1],T.__data[2]=k.elements[2],T.__data[3]=0,T.__data[4]=k.elements[3],T.__data[5]=k.elements[4],T.__data[6]=k.elements[5],T.__data[7]=0,T.__data[8]=k.elements[6],T.__data[9]=k.elements[7],T.__data[10]=k.elements[8],T.__data[11]=0):(k.toArray(T.__data,H),H+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,T.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(S,x,M,A){const w=S.value,y=x+"_"+M;if(A[y]===void 0)return typeof w=="number"||typeof w=="boolean"?A[y]=w:A[y]=w.clone(),!0;{const R=A[y];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[y]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function m(S){const x=S.uniforms;let M=0;const A=16;for(let y=0,R=x.length;y<R;y++){const D=Array.isArray(x[y])?x[y]:[x[y]];for(let v=0,T=D.length;v<T;v++){const I=D[v],z=Array.isArray(I.value)?I.value:[I.value];for(let H=0,q=z.length;H<q;H++){const k=z[H],Y=g(k),W=M%A,it=W%Y.boundary,P=W+it;M+=it,P!==0&&A-P<Y.storage&&(M+=A-P),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=M,M+=Y.storage}}}const w=M%A;return w>0&&(M+=A-w),S.__size=M,S.__cache={},this}function g(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function _(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:_}}class Jy{constructor(t={}){const{canvas:e=B0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const f=new Uint32Array(4),m=new Int32Array(4);let g=null,p=null;const _=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gi,this.toneMapping=cr,this.toneMappingExposure=1;const x=this;let M=!1,A=0,w=0,y=null,R=-1,D=null;const v=new Ue,T=new Ue;let I=null;const z=new he(0);let H=0,q=e.width,k=e.height,Y=1,W=null,it=null;const P=new Ue(0,0,q,k),at=new Ue(0,0,q,k);let zt=!1;const Yt=new Sh;let $=!1,Q=!1;const ft=new Pe,ot=new Pe,At=new U,yt=new Ue,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Ot(){return y===null?Y:1}let L=n;function oe(b,F){return e.getContext(b,F)}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hh}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),L===null){const F="webgl2";if(L=oe(F,b),L===null)throw oe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ft,kt,B,jt,Dt,C,E,X,J,et,Z,St,rt,dt,Vt,nt,vt,xt,Ut,gt,qt,Bt,ae,N;function tt(){Ft=new nM(L),Ft.init(),Bt=new Hy(L,Ft),kt=new ZS(L,Ft,t,Bt),B=new By(L),kt.reverseDepthBuffer&&B.buffers.depth.setReversed(!0),jt=new sM(L),Dt=new Ey,C=new ky(L,Ft,B,Dt,kt,Bt,jt),E=new jS(x),X=new eM(x),J=new fv(L),ae=new $S(L,J),et=new iM(L,J,jt,ae),Z=new aM(L,et,J,jt),Ut=new oM(L,kt,C),nt=new JS(Dt),St=new yy(x,E,X,Ft,kt,ae,nt),rt=new Ky(x,Dt),dt=new by,Vt=new Ly(Ft),xt=new qS(x,E,X,B,Z,h,l),vt=new Oy(x,Z,kt),N=new Zy(L,jt,kt,B),gt=new KS(L,Ft,jt),qt=new rM(L,Ft,jt),jt.programs=St.programs,x.capabilities=kt,x.extensions=Ft,x.properties=Dt,x.renderLists=dt,x.shadowMap=vt,x.state=B,x.info=jt}tt();const K=new qy(x,L);this.xr=K,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ft.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ft.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(q,k,!1))},this.getSize=function(b){return b.set(q,k)},this.setSize=function(b,F,V=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,k=F,e.width=Math.floor(b*Y),e.height=Math.floor(F*Y),V===!0&&(e.style.width=b+"px",e.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(q*Y,k*Y).floor()},this.setDrawingBufferSize=function(b,F,V){q=b,k=F,Y=V,e.width=Math.floor(b*V),e.height=Math.floor(F*V),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(v)},this.getViewport=function(b){return b.copy(P)},this.setViewport=function(b,F,V,G){b.isVector4?P.set(b.x,b.y,b.z,b.w):P.set(b,F,V,G),B.viewport(v.copy(P).multiplyScalar(Y).round())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,F,V,G){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,F,V,G),B.scissor(T.copy(at).multiplyScalar(Y).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(b){B.setScissorTest(zt=b)},this.setOpaqueSort=function(b){W=b},this.setTransparentSort=function(b){it=b},this.getClearColor=function(b){return b.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor.apply(xt,arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha.apply(xt,arguments)},this.clear=function(b=!0,F=!0,V=!0){let G=0;if(b){let O=!1;if(y!==null){const st=y.texture.format;O=st===gh||st===_h||st===mh}if(O){const st=y.texture.type,_t=st===Gi||st===jr||st===Xo||st===qs||st===dh||st===ph,ht=xt.getClearColor(),ut=xt.getClearAlpha(),Ct=ht.r,Nt=ht.g,bt=ht.b;_t?(f[0]=Ct,f[1]=Nt,f[2]=bt,f[3]=ut,L.clearBufferuiv(L.COLOR,0,f)):(m[0]=Ct,m[1]=Nt,m[2]=bt,m[3]=ut,L.clearBufferiv(L.COLOR,0,m))}else G|=L.COLOR_BUFFER_BIT}F&&(G|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),dt.dispose(),Vt.dispose(),Dt.dispose(),E.dispose(),X.dispose(),Z.dispose(),ae.dispose(),N.dispose(),St.dispose(),K.dispose(),K.removeEventListener("sessionstart",ue),K.removeEventListener("sessionend",pt),It.stop()};function j(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=jt.autoReset,F=vt.enabled,V=vt.autoUpdate,G=vt.needsUpdate,O=vt.type;tt(),jt.autoReset=b,vt.enabled=F,vt.autoUpdate=V,vt.needsUpdate=G,vt.type=O}function ct(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function $t(b){const F=b.target;F.removeEventListener("dispose",$t),xe(F)}function xe(b){Ae(b),Dt.remove(b)}function Ae(b){const F=Dt.get(b).programs;F!==void 0&&(F.forEach(function(V){St.releaseProgram(V)}),b.isShaderMaterial&&St.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,V,G,O,st){F===null&&(F=Xt);const _t=O.isMesh&&O.matrixWorld.determinant()<0,ht=_e(b,F,V,G,O);B.setMaterial(G,_t);let ut=V.index,Ct=1;if(G.wireframe===!0){if(ut=et.getWireframeAttribute(V),ut===void 0)return;Ct=2}const Nt=V.drawRange,bt=V.attributes.position;let le=Nt.start*Ct,se=(Nt.start+Nt.count)*Ct;st!==null&&(le=Math.max(le,st.start*Ct),se=Math.min(se,(st.start+st.count)*Ct)),ut!==null?(le=Math.max(le,0),se=Math.min(se,ut.count)):bt!=null&&(le=Math.max(le,0),se=Math.min(se,bt.count));const ve=se-le;if(ve<0||ve===1/0)return;ae.setup(O,G,ht,V,ut);let Ze,Qt=gt;if(ut!==null&&(Ze=J.get(ut),Qt=qt,Qt.setIndex(Ze)),O.isMesh)G.wireframe===!0?(B.setLineWidth(G.wireframeLinewidth*Ot()),Qt.setMode(L.LINES)):Qt.setMode(L.TRIANGLES);else if(O.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),B.setLineWidth(Lt*Ot()),O.isLineSegments?Qt.setMode(L.LINES):O.isLineLoop?Qt.setMode(L.LINE_LOOP):Qt.setMode(L.LINE_STRIP)}else O.isPoints?Qt.setMode(L.POINTS):O.isSprite&&Qt.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Qt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))Qt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Lt=O._multiDrawStarts,sn=O._multiDrawCounts,fe=O._multiDrawCount,oi=ut?J.get(ut).bytesPerElement:1,es=Dt.get(G).currentProgram.getUniforms();for(let Nn=0;Nn<fe;Nn++)es.setValue(L,"_gl_DrawID",Nn),Qt.render(Lt[Nn]/oi,sn[Nn])}else if(O.isInstancedMesh)Qt.renderInstances(le,ve,O.count);else if(V.isInstancedBufferGeometry){const Lt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,sn=Math.min(V.instanceCount,Lt);Qt.renderInstances(le,ve,sn)}else Qt.render(le,ve)};function re(b,F,V){b.transparent===!0&&b.side===Oi&&b.forceSinglePass===!1?(b.side=Pn,b.needsUpdate=!0,Be(b,F,V),b.side=mr,b.needsUpdate=!0,Be(b,F,V),b.side=Oi):Be(b,F,V)}this.compile=function(b,F,V=null){V===null&&(V=b),p=Vt.get(V),p.init(F),S.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),b!==V&&b.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const G=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const st=O.material;if(st)if(Array.isArray(st))for(let _t=0;_t<st.length;_t++){const ht=st[_t];re(ht,V,O),G.add(ht)}else re(st,V,O),G.add(st)}),S.pop(),p=null,G},this.compileAsync=function(b,F,V=null){const G=this.compile(b,F,V);return new Promise(O=>{function st(){if(G.forEach(function(_t){Dt.get(_t).currentProgram.isReady()&&G.delete(_t)}),G.size===0){O(b);return}setTimeout(st,10)}Ft.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Rt=null;function Tt(b){Rt&&Rt(b)}function ue(){It.stop()}function pt(){It.start()}const It=new Sm;It.setAnimationLoop(Tt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(b){Rt=b,K.setAnimationLoop(b),b===null?It.stop():It.start()},K.addEventListener("sessionstart",ue),K.addEventListener("sessionend",pt),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(F),F=K.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,F,y),p=Vt.get(b,S.length),p.init(F),S.push(p),ot.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Yt.setFromProjectionMatrix(ot),Q=this.localClippingEnabled,$=nt.init(this.clippingPlanes,Q),g=dt.get(b,_.length),g.init(),_.push(g),K.enabled===!0&&K.isPresenting===!0){const st=x.xr.getDepthSensingMesh();st!==null&&Pt(st,F,-1/0,x.sortObjects)}Pt(b,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(W,it),Gt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Gt&&xt.addToRenderList(g,b),this.info.render.frame++,$===!0&&nt.beginShadows();const V=p.state.shadowsArray;vt.render(V,b,F),$===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const st=F.cameras;if(O.length>0)for(let _t=0,ht=st.length;_t<ht;_t++){const ut=st[_t];Fe(G,O,b,ut)}Gt&&xt.render(b);for(let _t=0,ht=st.length;_t<ht;_t++){const ut=st[_t];Ht(g,b,ut,ut.viewport)}}else O.length>0&&Fe(G,O,b,F),Gt&&xt.render(b),Ht(g,b,F);y!==null&&(C.updateMultisampleRenderTarget(y),C.updateRenderTargetMipmap(y)),b.isScene===!0&&b.onAfterRender(x,b,F),ae.resetDefaultState(),R=-1,D=null,S.pop(),S.length>0?(p=S[S.length-1],$===!0&&nt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Pt(b,F,V,G){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Yt.intersectsSprite(b)){G&&yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ot);const _t=Z.update(b),ht=b.material;ht.visible&&g.push(b,_t,ht,V,yt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Yt.intersectsObject(b))){const _t=Z.update(b),ht=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),yt.copy(b.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),yt.copy(_t.boundingSphere.center)),yt.applyMatrix4(b.matrixWorld).applyMatrix4(ot)),Array.isArray(ht)){const ut=_t.groups;for(let Ct=0,Nt=ut.length;Ct<Nt;Ct++){const bt=ut[Ct],le=ht[bt.materialIndex];le&&le.visible&&g.push(b,_t,le,V,yt.z,bt)}}else ht.visible&&g.push(b,_t,ht,V,yt.z,null)}}const st=b.children;for(let _t=0,ht=st.length;_t<ht;_t++)Pt(st[_t],F,V,G)}function Ht(b,F,V,G){const O=b.opaque,st=b.transmissive,_t=b.transparent;p.setupLightsView(V),$===!0&&nt.setGlobalState(x.clippingPlanes,V),G&&B.viewport(v.copy(G)),O.length>0&&Kt(O,F,V),st.length>0&&Kt(st,F,V),_t.length>0&&Kt(_t,F,V),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function Fe(b,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Qr(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Zo:Gi,minFilter:kr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace}));const st=p.state.transmissionRenderTarget[G.id],_t=G.viewport||v;st.setSize(_t.z,_t.w);const ht=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(z),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),Gt&&xt.render(V);const ut=x.toneMapping;x.toneMapping=cr;const Ct=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),$===!0&&nt.setGlobalState(x.clippingPlanes,G),Kt(b,V,G),C.updateMultisampleRenderTarget(st),C.updateRenderTargetMipmap(st),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let bt=0,le=F.length;bt<le;bt++){const se=F[bt],ve=se.object,Ze=se.geometry,Qt=se.material,Lt=se.group;if(Qt.side===Oi&&ve.layers.test(G.layers)){const sn=Qt.side;Qt.side=Pn,Qt.needsUpdate=!0,Ce(ve,V,G,Ze,Qt,Lt),Qt.side=sn,Qt.needsUpdate=!0,Nt=!0}}Nt===!0&&(C.updateMultisampleRenderTarget(st),C.updateRenderTargetMipmap(st))}x.setRenderTarget(ht),x.setClearColor(z,H),Ct!==void 0&&(G.viewport=Ct),x.toneMapping=ut}function Kt(b,F,V){const G=F.isScene===!0?F.overrideMaterial:null;for(let O=0,st=b.length;O<st;O++){const _t=b[O],ht=_t.object,ut=_t.geometry,Ct=G===null?_t.material:G,Nt=_t.group;ht.layers.test(V.layers)&&Ce(ht,F,V,ut,Ct,Nt)}}function Ce(b,F,V,G,O,st){b.onBeforeRender(x,F,V,G,O,st),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(x,F,V,G,b,st),O.transparent===!0&&O.side===Oi&&O.forceSinglePass===!1?(O.side=Pn,O.needsUpdate=!0,x.renderBufferDirect(V,F,G,O,b,st),O.side=mr,O.needsUpdate=!0,x.renderBufferDirect(V,F,G,O,b,st),O.side=Oi):x.renderBufferDirect(V,F,G,O,b,st),b.onAfterRender(x,F,V,G,O,st)}function Be(b,F,V){F.isScene!==!0&&(F=Xt);const G=Dt.get(b),O=p.state.lights,st=p.state.shadowsArray,_t=O.state.version,ht=St.getParameters(b,O.state,st,F,V),ut=St.getProgramCacheKey(ht);let Ct=G.programs;G.environment=b.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(b.isMeshStandardMaterial?X:E).get(b.envMap||G.environment),G.envMapRotation=G.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Ct===void 0&&(b.addEventListener("dispose",$t),Ct=new Map,G.programs=Ct);let Nt=Ct.get(ut);if(Nt!==void 0){if(G.currentProgram===Nt&&G.lightsStateVersion===_t)return Se(b,ht),Nt}else ht.uniforms=St.getUniforms(b),b.onBeforeCompile(ht,x),Nt=St.acquireProgram(ht,ut),Ct.set(ut,Nt),G.uniforms=ht.uniforms;const bt=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(bt.clippingPlanes=nt.uniform),Se(b,ht),G.needsLights=be(b),G.lightsStateVersion=_t,G.needsLights&&(bt.ambientLightColor.value=O.state.ambient,bt.lightProbe.value=O.state.probe,bt.directionalLights.value=O.state.directional,bt.directionalLightShadows.value=O.state.directionalShadow,bt.spotLights.value=O.state.spot,bt.spotLightShadows.value=O.state.spotShadow,bt.rectAreaLights.value=O.state.rectArea,bt.ltc_1.value=O.state.rectAreaLTC1,bt.ltc_2.value=O.state.rectAreaLTC2,bt.pointLights.value=O.state.point,bt.pointLightShadows.value=O.state.pointShadow,bt.hemisphereLights.value=O.state.hemi,bt.directionalShadowMap.value=O.state.directionalShadowMap,bt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,bt.spotShadowMap.value=O.state.spotShadowMap,bt.spotLightMatrix.value=O.state.spotLightMatrix,bt.spotLightMap.value=O.state.spotLightMap,bt.pointShadowMap.value=O.state.pointShadowMap,bt.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Nt,G.uniformsList=null,Nt}function Te(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=Qa.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function Se(b,F){const V=Dt.get(b);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function _e(b,F,V,G,O){F.isScene!==!0&&(F=Xt),C.resetTextureUnits();const st=F.fog,_t=G.isMeshStandardMaterial?F.environment:null,ht=y===null?x.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:vr,ut=(G.isMeshStandardMaterial?X:E).get(G.envMap||_t),Ct=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Nt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),bt=!!V.morphAttributes.position,le=!!V.morphAttributes.normal,se=!!V.morphAttributes.color;let ve=cr;G.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(ve=x.toneMapping);const Ze=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qt=Ze!==void 0?Ze.length:0,Lt=Dt.get(G),sn=p.state.lights;if($===!0&&(Q===!0||b!==D)){const Kn=b===D&&G.id===R;nt.setState(G,b,Kn)}let fe=!1;G.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==sn.state.version||Lt.outputColorSpace!==ht||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==ut||G.fog===!0&&Lt.fog!==st||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==nt.numPlanes||Lt.numIntersection!==nt.numIntersection)||Lt.vertexAlphas!==Ct||Lt.vertexTangents!==Nt||Lt.morphTargets!==bt||Lt.morphNormals!==le||Lt.morphColors!==se||Lt.toneMapping!==ve||Lt.morphTargetsCount!==Qt)&&(fe=!0):(fe=!0,Lt.__version=G.version);let oi=Lt.currentProgram;fe===!0&&(oi=Be(G,F,O));let es=!1,Nn=!1,Cl=!1;const ze=oi.getUniforms(),Wi=Lt.uniforms;if(B.useProgram(oi.program)&&(es=!0,Nn=!0,Cl=!0),G.id!==R&&(R=G.id,Nn=!0),es||D!==b){kt.reverseDepthBuffer?(ft.copy(b.projectionMatrix),k0(ft),H0(ft),ze.setValue(L,"projectionMatrix",ft)):ze.setValue(L,"projectionMatrix",b.projectionMatrix),ze.setValue(L,"viewMatrix",b.matrixWorldInverse);const Kn=ze.map.cameraPosition;Kn!==void 0&&Kn.setValue(L,At.setFromMatrixPosition(b.matrixWorld)),kt.logarithmicDepthBuffer&&ze.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ze.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),D!==b&&(D=b,Nn=!0,Cl=!0)}if(O.isSkinnedMesh){ze.setOptional(L,O,"bindMatrix"),ze.setOptional(L,O,"bindMatrixInverse");const Kn=O.skeleton;Kn&&(Kn.boneTexture===null&&Kn.computeBoneTexture(),ze.setValue(L,"boneTexture",Kn.boneTexture,C))}O.isBatchedMesh&&(ze.setOptional(L,O,"batchingTexture"),ze.setValue(L,"batchingTexture",O._matricesTexture,C),ze.setOptional(L,O,"batchingIdTexture"),ze.setValue(L,"batchingIdTexture",O._indirectTexture,C),ze.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&ze.setValue(L,"batchingColorTexture",O._colorsTexture,C));const Rl=V.morphAttributes;if((Rl.position!==void 0||Rl.normal!==void 0||Rl.color!==void 0)&&Ut.update(O,V,oi),(Nn||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,ze.setValue(L,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Wi.envMap.value=ut,Wi.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(Wi.envMapIntensity.value=F.environmentIntensity),Nn&&(ze.setValue(L,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Un(Wi,Cl),st&&G.fog===!0&&rt.refreshFogUniforms(Wi,st),rt.refreshMaterialUniforms(Wi,G,Y,k,p.state.transmissionRenderTarget[b.id]),Qa.upload(L,Te(Lt),Wi,C)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Qa.upload(L,Te(Lt),Wi,C),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ze.setValue(L,"center",O.center),ze.setValue(L,"modelViewMatrix",O.modelViewMatrix),ze.setValue(L,"normalMatrix",O.normalMatrix),ze.setValue(L,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Kn=G.uniformsGroups;for(let Pl=0,km=Kn.length;Pl<km;Pl++){const Dh=Kn[Pl];N.update(Dh,oi),N.bind(Dh,oi)}}return oi}function Un(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function be(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(b,F,V){Dt.get(b.texture).__webglTexture=F,Dt.get(b.depthTexture).__webglTexture=V;const G=Dt.get(b);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,F){const V=Dt.get(b);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,V=0){y=b,A=F,w=V;let G=!0,O=null,st=!1,_t=!1;if(b){const ut=Dt.get(b);if(ut.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(ut.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(ut.__hasExternalTextures)C.rebindTextures(b,Dt.get(b.texture).__webglTexture,Dt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const bt=b.depthTexture;if(ut.__boundDepthTexture!==bt){if(bt!==null&&Dt.has(bt)&&(b.width!==bt.image.width||b.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const Ct=b.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(_t=!0);const Nt=Dt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Nt[F])?O=Nt[F][V]:O=Nt[F],st=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?O=Dt.get(b).__webglMultisampledFramebuffer:Array.isArray(Nt)?O=Nt[V]:O=Nt,v.copy(b.viewport),T.copy(b.scissor),I=b.scissorTest}else v.copy(P).multiplyScalar(Y).floor(),T.copy(at).multiplyScalar(Y).floor(),I=zt;if(B.bindFramebuffer(L.FRAMEBUFFER,O)&&G&&B.drawBuffers(b,O),B.viewport(v),B.scissor(T),B.setScissorTest(I),st){const ut=Dt.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,ut.__webglTexture,V)}else if(_t){const ut=Dt.get(b.texture),Ct=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,ut.__webglTexture,V||0,Ct)}R=-1},this.readRenderTargetPixels=function(b,F,V,G,O,st,_t){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=Dt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(ht=ht[_t]),ht){B.bindFramebuffer(L.FRAMEBUFFER,ht);try{const ut=b.texture,Ct=ut.format,Nt=ut.type;if(!kt.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!kt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-G&&V>=0&&V<=b.height-O&&L.readPixels(F,V,G,O,Bt.convert(Ct),Bt.convert(Nt),st)}finally{const ut=y!==null?Dt.get(y).__webglFramebuffer:null;B.bindFramebuffer(L.FRAMEBUFFER,ut)}}},this.readRenderTargetPixelsAsync=async function(b,F,V,G,O,st,_t){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=Dt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(ht=ht[_t]),ht){const ut=b.texture,Ct=ut.format,Nt=ut.type;if(!kt.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!kt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=b.width-G&&V>=0&&V<=b.height-O){B.bindFramebuffer(L.FRAMEBUFFER,ht);const bt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.bufferData(L.PIXEL_PACK_BUFFER,st.byteLength,L.STREAM_READ),L.readPixels(F,V,G,O,Bt.convert(Ct),Bt.convert(Nt),0);const le=y!==null?Dt.get(y).__webglFramebuffer:null;B.bindFramebuffer(L.FRAMEBUFFER,le);const se=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await z0(L,se,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,st),L.deleteBuffer(bt),L.deleteSync(se),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,F=null,V=0){b.isTexture!==!0&&(ja("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,b=arguments[1]);const G=Math.pow(2,-V),O=Math.floor(b.image.width*G),st=Math.floor(b.image.height*G),_t=F!==null?F.x:0,ht=F!==null?F.y:0;C.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,_t,ht,O,st),B.unbindTexture()},this.copyTextureToTexture=function(b,F,V=null,G=null,O=0){b.isTexture!==!0&&(ja("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,b=arguments[1],F=arguments[2],O=arguments[3]||0,V=null);let st,_t,ht,ut,Ct,Nt;V!==null?(st=V.max.x-V.min.x,_t=V.max.y-V.min.y,ht=V.min.x,ut=V.min.y):(st=b.image.width,_t=b.image.height,ht=0,ut=0),G!==null?(Ct=G.x,Nt=G.y):(Ct=0,Nt=0);const bt=Bt.convert(F.format),le=Bt.convert(F.type);C.setTexture2D(F,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const se=L.getParameter(L.UNPACK_ROW_LENGTH),ve=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Ze=L.getParameter(L.UNPACK_SKIP_PIXELS),Qt=L.getParameter(L.UNPACK_SKIP_ROWS),Lt=L.getParameter(L.UNPACK_SKIP_IMAGES),sn=b.isCompressedTexture?b.mipmaps[O]:b.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,sn.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,sn.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ht),L.pixelStorei(L.UNPACK_SKIP_ROWS,ut),b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Ct,Nt,st,_t,bt,le,sn.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Ct,Nt,sn.width,sn.height,bt,sn.data):L.texSubImage2D(L.TEXTURE_2D,O,Ct,Nt,st,_t,bt,le,sn),L.pixelStorei(L.UNPACK_ROW_LENGTH,se),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ze),L.pixelStorei(L.UNPACK_SKIP_ROWS,Qt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Lt),O===0&&F.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(b,F,V=null,G=null,O=0){b.isTexture!==!0&&(ja("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,b=arguments[2],F=arguments[3],O=arguments[4]||0);let st,_t,ht,ut,Ct,Nt,bt,le,se;const ve=b.isCompressedTexture?b.mipmaps[O]:b.image;V!==null?(st=V.max.x-V.min.x,_t=V.max.y-V.min.y,ht=V.max.z-V.min.z,ut=V.min.x,Ct=V.min.y,Nt=V.min.z):(st=ve.width,_t=ve.height,ht=ve.depth,ut=0,Ct=0,Nt=0),G!==null?(bt=G.x,le=G.y,se=G.z):(bt=0,le=0,se=0);const Ze=Bt.convert(F.format),Qt=Bt.convert(F.type);let Lt;if(F.isData3DTexture)C.setTexture3D(F,0),Lt=L.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)C.setTexture2DArray(F,0),Lt=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const sn=L.getParameter(L.UNPACK_ROW_LENGTH),fe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),oi=L.getParameter(L.UNPACK_SKIP_PIXELS),es=L.getParameter(L.UNPACK_SKIP_ROWS),Nn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ve.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ut),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ct),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Nt),b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Lt,O,bt,le,se,st,_t,ht,Ze,Qt,ve.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Lt,O,bt,le,se,st,_t,ht,Ze,ve.data):L.texSubImage3D(Lt,O,bt,le,se,st,_t,ht,Ze,Qt,ve),L.pixelStorei(L.UNPACK_ROW_LENGTH,sn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,fe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,oi),L.pixelStorei(L.UNPACK_SKIP_ROWS,es),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Nn),O===0&&F.generateMipmaps&&L.generateMipmap(Lt),B.unbindTexture()},this.initRenderTarget=function(b){Dt.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),B.unbindTexture()},this.resetState=function(){A=0,w=0,y=null,B.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===vh?"display-p3":"srgb",e.unpackColorSpace=pe.workingColorSpace===yl?"display-p3":"srgb"}}class yh{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new he(t),this.near=e,this.far=n}clone(){return new yh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class jy extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Am extends to{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pd=new Pe,Fu=new hm,Na=new El,Oa=new U;class Qy extends qe{constructor(t=new In,e=new Am){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(i),Na.radius+=s,t.ray.intersectsSphere(Na)===!1)return;pd.copy(i).invert(),Fu.copy(t.ray).applyMatrix4(pd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=h,g=f;m<g;m++){const p=c.getX(m);Oa.fromBufferAttribute(d,p),md(Oa,p,l,i,t,e,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,g=f;m<g;m++)Oa.fromBufferAttribute(d,m),md(Oa,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function md(r,t,e,n,i,s,o){const a=Fu.distanceSqToPoint(r);if(a<e){const l=new U;Fu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class wi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(o-u)/h;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new Et:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new U,i=[],s=[],o=[],a=new U,l=new Pe;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new U)}s[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(tn(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(tn(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Eh extends wi{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class tE extends Eh{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Th(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,d){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,i(o,a,h,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Fa=new U,Sc=new Th,Mc=new Th,yc=new Th;class Bu extends wi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new U){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(Fa.subVectors(i[0],i[1]).add(i[0]),c=Fa);const d=i[a%s],h=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(Fa.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=Fa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);g<1e-4&&(g=1),m<1e-4&&(m=g),p<1e-4&&(p=g),Sc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,g,p),Mc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,g,p),yc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,g,p)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Mc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),yc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Sc.calc(l),Mc.calc(l),yc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new U().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _d(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function eE(r,t){const e=1-r;return e*e*t}function nE(r,t){return 2*(1-r)*r*t}function iE(r,t){return r*r*t}function Io(r,t,e,n){return eE(r,t)+nE(r,e)+iE(r,n)}function rE(r,t){const e=1-r;return e*e*e*t}function sE(r,t){const e=1-r;return 3*e*e*r*t}function oE(r,t){return 3*(1-r)*r*r*t}function aE(r,t){return r*r*r*t}function Uo(r,t,e,n,i){return rE(r,t)+sE(r,e)+oE(r,n)+aE(r,i)}class Cm extends wi{constructor(t=new Et,e=new Et,n=new Et,i=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Et){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Uo(t,i.x,s.x,o.x,a.x),Uo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class lE extends wi{constructor(t=new U,e=new U,n=new U,i=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new U){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Uo(t,i.x,s.x,o.x,a.x),Uo(t,i.y,s.y,o.y,a.y),Uo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Rm extends wi{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cE extends wi{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pm extends wi{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Io(t,i.x,s.x,o.x),Io(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uE extends wi{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Io(t,i.x,s.x,o.x),Io(t,i.y,s.y,o.y),Io(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lm extends wi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(_d(a,l.x,c.x,u.x,d.x),_d(a,l.y,c.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Et().fromArray(i))}return this}}var gd=Object.freeze({__proto__:null,ArcCurve:tE,CatmullRomCurve3:Bu,CubicBezierCurve:Cm,CubicBezierCurve3:lE,EllipseCurve:Eh,LineCurve:Rm,LineCurve3:cE,QuadraticBezierCurve:Pm,QuadraticBezierCurve3:uE,SplineCurve:Lm});class hE extends wi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gd[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new gd[i.type]().fromJSON(i))}return this}}class fE extends hE{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Rm(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Pm(this.currentPoint.clone(),new Et(t,e),new Et(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Cm(this.currentPoint.clone(),new Et(t,e),new Et(n,i),new Et(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Lm(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new Eh(t,e,n,i,s,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class wl extends In{constructor(t=[new Et(0,-.5),new Et(.5,0),new Et(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=tn(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/e,d=new U,h=new Et,f=new U,m=new U,g=new U;let p=0,_=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:p=t[S+1].x-t[S].x,_=t[S+1].y-t[S].y,f.x=_*1,f.y=-p,f.z=_*0,g.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(g.x,g.y,g.z);break;default:p=t[S+1].x-t[S].x,_=t[S+1].y-t[S].y,f.x=_*1,f.y=-p,f.z=_*0,m.copy(f),f.x+=g.x,f.y+=g.y,f.z+=g.z,f.normalize(),l.push(f.x,f.y,f.z),g.copy(m)}for(let S=0;S<=e;S++){const x=n+S*u*i,M=Math.sin(x),A=Math.cos(x);for(let w=0;w<=t.length-1;w++){d.x=t[w].x*M,d.y=t[w].y,d.z=t[w].x*A,o.push(d.x,d.y,d.z),h.x=S/e,h.y=w/(t.length-1),a.push(h.x,h.y);const y=l[3*w+0]*M,R=l[3*w+1],D=l[3*w+0]*A;c.push(y,R,D)}}for(let S=0;S<e;S++)for(let x=0;x<t.length-1;x++){const M=x+S*t.length,A=M,w=M+t.length,y=M+t.length+1,R=M+1;s.push(A,w,R),s.push(y,R,w)}this.setIndex(s),this.setAttribute("position",new Oe(o,3)),this.setAttribute("uv",new Oe(a,2)),this.setAttribute("normal",new Oe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.points,t.segments,t.phiStart,t.phiLength)}}class Zs extends wl{constructor(t=1,e=1,n=4,i=8){const s=new fE;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Zs(t.radius,t.length,t.capSegments,t.radialSegments)}}class bh extends In{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new U,u=new Et;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(a,3)),this.setAttribute("uv",new Oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class bi extends In{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],f=[];let m=0;const g=[],p=n/2;let _=0;S(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Oe(d,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(f,2));function S(){const M=new U,A=new U;let w=0;const y=(e-t)/n;for(let R=0;R<=s;R++){const D=[],v=R/s,T=v*(e-t)+t;for(let I=0;I<=i;I++){const z=I/i,H=z*l+a,q=Math.sin(H),k=Math.cos(H);A.x=T*q,A.y=-v*n+p,A.z=T*k,d.push(A.x,A.y,A.z),M.set(q,y,k).normalize(),h.push(M.x,M.y,M.z),f.push(z,1-v),D.push(m++)}g.push(D)}for(let R=0;R<i;R++)for(let D=0;D<s;D++){const v=g[D][R],T=g[D+1][R],I=g[D+1][R+1],z=g[D][R+1];t>0&&(u.push(v,T,z),w+=3),e>0&&(u.push(T,I,z),w+=3)}c.addGroup(_,w,0),_+=w}function x(M){const A=m,w=new Et,y=new U;let R=0;const D=M===!0?t:e,v=M===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,p*v,0),h.push(0,v,0),f.push(.5,.5),m++;const T=m;for(let I=0;I<=i;I++){const H=I/i*l+a,q=Math.cos(H),k=Math.sin(H);y.x=D*k,y.y=p*v,y.z=D*q,d.push(y.x,y.y,y.z),h.push(0,v,0),w.x=q*.5+.5,w.y=k*.5*v+.5,f.push(w.x,w.y),m++}for(let I=0;I<i;I++){const z=A+I,H=T+I;M===!0?u.push(H,H+1,z):u.push(H+1,H,z),R+=3}c.addGroup(_,R,M===!0?1:2),_+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class wh extends bi{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new wh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ah extends In{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new U,h=new U,f=[],m=[],g=[],p=[];for(let _=0;_<=n;_++){const S=[],x=_/n;let M=0;_===0&&o===0?M=.5/e:_===n&&l===Math.PI&&(M=-.5/e);for(let A=0;A<=e;A++){const w=A/e;d.x=-t*Math.cos(i+w*s)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(i+w*s)*Math.sin(o+x*a),m.push(d.x,d.y,d.z),h.copy(d).normalize(),g.push(h.x,h.y,h.z),p.push(w+M,1-x),S.push(c++)}u.push(S)}for(let _=0;_<n;_++)for(let S=0;S<e;S++){const x=u[_][S+1],M=u[_][S],A=u[_+1][S],w=u[_+1][S+1];(_!==0||o>0)&&f.push(x,M,w),(_!==n-1||l<Math.PI)&&f.push(M,A,w)}this.setIndex(f),this.setAttribute("position",new Oe(m,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ah(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ch extends In{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new U,d=new U,h=new U;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const g=m/i*s,p=f/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(g),d.y=(t+e*Math.cos(p))*Math.sin(g),d.z=e*Math.sin(p),a.push(d.x,d.y,d.z),u.x=t*Math.cos(g),u.y=t*Math.sin(g),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const g=(i+1)*f+m-1,p=(i+1)*(f-1)+m-1,_=(i+1)*(f-1)+m,S=(i+1)*f+m;o.push(g,p,S),o.push(p,_,S)}this.setIndex(o),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ch(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ss extends to{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=om,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Dm extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class dE extends Dm{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ec=new Pe,vd=new U,xd=new U;class pE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sh,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;vd.setFromMatrixPosition(t.matrixWorld),e.position.copy(vd),xd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xd),e.updateMatrixWorld(),Ec.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ec)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class mE extends pE{constructor(){super(new Mm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tc extends Dm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new mE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hh);const me={graphite:()=>new Ss({color:2369067,metalness:.45,roughness:.6}),titanium:()=>new Ss({color:10134189,metalness:.9,roughness:.32}),dark:()=>new Ss({color:1513500,metalness:.3,roughness:.7}),glass:()=>new Ss({color:790806,metalness:1,roughness:.12,emissive:661542,emissiveIntensity:.7}),saffron:()=>new Ss({color:3810320,emissive:14257727,emissiveIntensity:.55,roughness:.5}),green:()=>new Ss({color:926743,emissive:4166503,emissiveIntensity:.7,roughness:.5})};function _E(){const r=[],t=[[0,.02],[.1,.045],[.28,.068],[.55,.085],[.85,.09],[1.1,.088],[1.3,.078],[1.45,.058],[1.55,.034],[1.6,.001]];for(const[o,a]of t)r.push(new Et(a,o));const e=new wl(r,40),n=new ie(e,me.graphite());n.rotation.z=-Math.PI/2,n.position.x=-.8;const i=new en;i.add(n);for(const o of[-.42,.02,.38]){const a=.086-Math.abs(o)*.02,l=new ie(new Ch(a,.0035,8,48),me.dark());l.rotation.y=Math.PI/2,l.position.x=o,i.add(l)}for(const o of[-1,1]){const a=new ie(new nn(.34,.012,.004),me.saffron());a.position.set(.18,.012,o*.089),i.add(a)}const s=new ie(new bi(.004,.004,.12,8),me.titanium());return s.rotation.z=Math.PI/2,s.position.set(.84,.02,0),i.add(s),i}function gE(){const r=new en,t=3,e=.3,n=.052,i=new Zs(.11,t-.22,6,20);i.scale(e/.22,1,n/.22),i.rotateX(Math.PI/2);const s=new ie(i,me.graphite());s.position.set(.05,.1,0),r.add(s);const o=new ie(new bi(.008,.008,t*.94,8),me.titanium());o.rotation.x=Math.PI/2,o.position.set(.05+e*.48,.1,0),r.add(o);for(const a of[-1,1]){const l=new ie(new nn(.05,.014,.02),a>0?me.green():me.saffron());l.position.set(.05,.105,a*(t/2-.03)),r.add(l)}return r}function vE(){const r=new en,t=.55,e=1.5;for(const s of[-1,1]){const o=new ie(new bi(.03,.026,e,14),me.graphite());o.rotation.z=Math.PI/2,o.position.set(-.25,.02,s*t),r.add(o);const a=new ie(new Zs(.075,.22,4,10),me.graphite());a.scale.set(1.5,1,.16),a.position.set(-.96,.16,s*t),a.rotation.z=-.22,r.add(a)}const n=new Zs(.075,2*t-.1,4,10);n.scale(1.6,1,.28),n.rotateX(Math.PI/2);const i=new ie(n,me.graphite());return i.position.set(-.96,.3,0),r.add(i),r}function xE(){const r=new en,t=.55;let e=0;for(const n of[-1,1])for(const i of[.32,-.82]){const s=new en,o=new ie(new bi(.045,.05,.075,18),me.dark());o.position.y=.055,s.add(o);const a=new ie(new bi(.02,.03,.02,12),me.titanium());a.position.y=.1,s.add(a);const l=new en;for(const c of[0,1]){const u=new ie(new nn(.42,.006,.032),me.dark());u.position.x=(c===0?1:-1)*.21,u.rotation.x=(c===0?1:-1)*.12,l.add(u)}l.position.y=.115,l.rotation.y=.5+e*.9,s.add(l),s.position.set(i,.02,n*t),r.add(s),e++}return r}function SE(){const r=new en,t=new ie(new wh(.032,.09,14),me.titanium());t.rotation.z=Math.PI/2,t.position.x=-.85,r.add(t);for(const e of[0,1]){const n=new ie(new nn(.006,.34,.03),me.dark());n.position.set(-.83,(e===0?1:-1)*.17,0),n.rotation.x=(e===0?1:-1)*.16,r.add(n)}return r}function ME(){const r=new en,t=new ie(new bi(.055,.06,.05,20),me.titanium());t.position.y=.06,r.add(t);const e=new ie(new Ah(.085,28,20),me.graphite());r.add(e);const n=new ie(new bi(.038,.045,.03,16),me.dark());n.rotation.x=Math.PI/2,n.position.set(.045,-.045,0),n.rotation.z=-.7,r.add(n);const i=new ie(new bh(.034,20),me.glass());return i.position.set(.062,-.062,0),i.lookAt(new U(.6,-.6,0)),r.add(i),r.position.set(.52,-.115,0),r}function yE(){const r=new en,t=new ie(new nn(.34,.06,.12),me.dark());r.add(t);const e=new ie(new nn(.34,.008,.015),me.titanium());e.position.y=-.032,r.add(e);const n=new ie(new nn(.02,.012,.005),me.green());return n.position.set(.14,0,.061),r.add(n),r.position.set(.02,-.095,0),r}function EE(){const r=new en,t=new ie(new nn(.16,.05,.1),me.dark());r.add(t);for(let e=0;e<6;e++){const n=new ie(new nn(.14,.016,.006),me.titanium());n.position.set(0,.033,-.04+e*.016),r.add(n)}return r.position.set(.3,.045,.1),r}function TE(){const r=new en,t=new ie(new nn(.09,.03,.06),me.dark());r.add(t);const e=new ie(new Zs(.02,.08,4,10),me.graphite());e.scale.set(.9,1,.28),e.position.y=.07,r.add(e);const n=new ie(new nn(.012,.012,.012),me.saffron());return n.position.set(.03,.02,0),r.add(n),r.position.set(-.3,.095,0),r}function bE(){const r=new en,t=new ie(new nn(.26,.035,.09),me.graphite());r.add(t);const e=new ie(new nn(.24,.006,.07),me.titanium());return e.position.y=.021,r.add(e),r.position.set(.12,.085,0),r}function wE(){const r=new en,t=new en;t.add(_E(),gE(),vE(),xE(),SE()),r.add(t);const e={gimbal:ME(),battery:yE(),edgeai:EE(),gcslink:TE(),autonomy:bE()};for(const i of Object.values(e))r.add(i);const n=new qe;n.position.set(-.1,-.85,0),r.add(n);for(const i of Object.values(e))i.userData.rest=i.position.clone();return r.userData.modules=e,r.userData.airframe=t,r.userData.groundSeg=n,r}function AE(r){const t=new Tc(10470631,3.2);t.position.set(-3,4,-4),r.add(t);const e=new Tc(13094100,1.5);e.position.set(4,1.5,3),r.add(e);const n=new Tc(3752527,.7);n.position.set(.5,-3,1),r.add(n),r.add(new dE(2765120,329226,.55))}function Rh(r=260,t=5){const e=new In,n=new Float32Array(r*3);for(let s=0;s<r*3;s++)n[s]=(Math.random()-.5)*t;e.setAttribute("position",new pi(n,3));const i=new Am({color:9147036,size:.008,transparent:!0,opacity:.45,sizeAttenuation:!0,depthWrite:!1});return new Qy(e,i)}const CE=Math.min(window.devicePixelRatio||1,1.75);function Ph(r){const t=new Jy({canvas:r,antialias:!0,alpha:!0});t.setPixelRatio(CE),t.toneMapping=$p,t.toneMappingExposure=1.35;const e=new jy,n=new ti(32,1,.05,60);AE(e);const i=wE();e.add(i);const s={renderer:t,scene:e,camera:n,uas:i,progress:0,active:!1,resize(){const o=r.clientWidth,a=r.clientHeight;!o||!a||(t.setSize(o,a,!1),n.aspect=o/a,n.updateProjectionMatrix())}};return s.resize(),s}function RE(r){const t=Ph(r);t.camera.position.set(4,.85,4),t.camera.lookAt(0,0,0),t.uas.position.y=-.08;const e=Rh(300,6);return t.scene.add(e),t.tick=n=>{const i=t.progress;t.uas.rotation.y=i*Math.PI*2+.6,t.uas.rotation.z=Math.sin(n*4e-4)*.02,t.uas.position.y=-.08+Math.sin(n*6e-4)*.035,e.rotation.y=n*2e-5,e.position.y=Math.sin(n*2e-4)*.1,t.renderer.render(t.scene,t.camera)},t.azimuth=()=>(t.uas.rotation.y*180/Math.PI%360+360)%360,t}function PE(r){const t=Ph(r);t.camera.fov=26,t.camera.updateProjectionMatrix(),t.scene.fog=new yh(658189,2.2,6.5);const e=Rh(160,3);t.scene.add(e);const n=new Bu([new U(1.35,-.22,.75),new U(.9,.1,.85),new U(.35,.42,.8),new U(-.3,.4,.85),new U(-1,.35,.95)]),i=new Bu([new U(.52,-.14,0),new U(.45,-.02,0),new U(.3,.06,.05),new U(-.28,.1,0),new U(-.95,.2,0)]),s=new U;return t.tick=o=>{const a=Nu.clamp(t.progress,0,1);n.getPointAt(a,t.camera.position),i.getPointAt(a,s),t.camera.position.y+=Math.sin(o*7e-4)*.008,t.camera.lookAt(s),e.rotation.y=o*3e-5,t.renderer.render(t.scene,t.camera)},t}const LE={gimbal:new U(.55,-.45,.15),battery:new U(.05,-.55,-.35),edgeai:new U(.25,.45,.55),gcslink:new U(-.45,.55,.3),autonomy:new U(.1,.65,-.3)};function DE(r){const t=Ph(r);t.camera.position.set(3.1,1.35,4),t.camera.lookAt(0,.05,0),t.uas.rotation.y=.7;const e=Rh(200,5);t.scene.add(e);const n=t.uas.userData.modules,i=o=>1-Math.pow(1-o,3);t.tick=o=>{const a=Nu.clamp(t.progress,0,1),l=1-i(Math.min(a/.8,1));for(const[c,u]of Object.entries(n))u.position.copy(u.userData.rest).addScaledVector(LE[c],l),u.rotation.y=l*.5;t.uas.rotation.y=.7+a*.55,t.uas.position.y=Math.sin(o*5e-4)*.02,e.rotation.y=o*2e-5,t.renderer.render(t.scene,t.camera)};const s=new U;return t.project=o=>(o.getWorldPosition(s).project(t.camera),{x:(s.x*.5+.5)*r.clientWidth,y:(-s.y*.5+.5)*r.clientHeight}),t.assembly=()=>1-i(Math.min(Nu.clamp(t.progress,0,1)/.8,1)),t}const Me=1600,on=9600;function IE(r){let t=r>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function UE(){const r=document.createElement("canvas");r.width=Me,r.height=on;const t=r.getContext("2d"),e=IE(20260707);t.fillStyle="#3a3d31",t.fillRect(0,0,Me,on);const n=["#43503a","#4f5a41","#5a5f46","#575243","#4a4536","#3f4a3c","#525c3e","#464b38"];let i=0;for(;i<on;){const h=120+e()*220;let f=-40;for(;f<Me;){const m=140+e()*320;if(t.fillStyle=n[e()*n.length|0],t.fillRect(f,i,m+2,h+2),e()>.35){t.strokeStyle="rgba(0,0,0,0.08)",t.lineWidth=1;const g=e()>.5,p=7+e()*6;if(t.save(),t.beginPath(),t.rect(f,i,m,h),t.clip(),t.beginPath(),g)for(let _=f;_<f+m;_+=p)t.moveTo(_,i),t.lineTo(_,i+h);else for(let _=i;_<i+h;_+=p)t.moveTo(f,_),t.lineTo(f+m,_);t.stroke(),t.restore()}t.strokeStyle="rgba(30,32,24,0.5)",t.strokeRect(f,i,m,h),f+=m}i+=h}t.strokeStyle="#5c5642",t.lineWidth=4;for(let h=0;h<14;h++){t.beginPath();const f=e()*on;t.moveTo(0,f),t.bezierCurveTo(Me*.3,f+(e()-.5)*300,Me*.7,f+(e()-.5)*300,Me,f+(e()-.5)*200),t.stroke()}const s=[];for(let h=0;h<=60;h++){const f=on*h/60;s.push([Me*.68+Math.sin(h*.55)*160+Math.sin(h*.13)*240,f])}t.lineJoin="round",t.lineCap="round",t.strokeStyle="#4a4f3c",t.lineWidth=96,t.beginPath(),s.forEach(([h,f],m)=>m?t.lineTo(h,f):t.moveTo(h,f)),t.stroke(),t.strokeStyle="#2c3a41",t.lineWidth=58,t.beginPath(),s.forEach(([h,f],m)=>m?t.lineTo(h,f):t.moveTo(h,f)),t.stroke(),t.strokeStyle="rgba(150,170,175,0.14)",t.lineWidth=3,t.beginPath(),s.forEach(([h,f],m)=>m?t.lineTo(h,f):t.moveTo(h,f)),t.stroke();const o=h=>Me*.3+Math.sin(h*6e-4)*120;t.strokeStyle="#4e5158",t.lineWidth=26,t.beginPath();for(let h=0;h<=on;h+=40){const f=o(h);h?t.lineTo(f,h):t.moveTo(f,h)}t.stroke(),t.strokeStyle="rgba(210,214,220,0.35)",t.lineWidth=2,t.setLineDash([26,30]),t.beginPath();for(let h=0;h<=on;h+=40){const f=o(h);h?t.lineTo(f,h):t.moveTo(f,h)}t.stroke(),t.setLineDash([]),t.strokeStyle="#4a4d54",t.lineWidth=14;for(let h=0;h<8;h++){const f=500+h*1150+e()*300;t.beginPath(),t.moveTo(o(f),f),t.lineTo(f%2?Me:0,f+(e()-.5)*260),t.stroke()}for(let h=0;h<90;h++){const f=e()*on,m=(e()-.5)*14;t.fillStyle=e()>.5?"#b9bdc4":"#6d7076",t.fillRect(o(f)+m-3,f,6,11)}const a=on*.42;t.fillStyle="#3c3e42",t.fillRect(Me*.08,a,Me*.42,900);for(let h=0;h<12;h++){const f=Me*.1+h%4*Me*.1,m=a+60+Math.floor(h/4)*280,g=Me*.075+e()*30,p=190+e()*50;t.fillStyle="#565b63",t.fillRect(f,m,g,p),t.strokeStyle="rgba(20,22,26,0.5)",t.lineWidth=2,t.beginPath();for(let _=f;_<f+g;_+=18)t.moveTo(_,m),t.lineTo(_,m+p);t.stroke(),t.fillStyle="rgba(170,176,186,0.5)",t.fillRect(f,m,g,5)}t.fillStyle="#43464c",t.fillRect(Me*.1,a+640,Me*.36,180);for(let h=0;h<140;h++)t.fillStyle=["#9aa0a8","#787d85","#b9bdc4","#5c6067"][e()*4|0],t.fillRect(Me*.11+e()*Me*.34,a+652+e()*150,5,9);const l=h=>Me*.52+h/on*260;t.strokeStyle="rgba(200,205,212,0.20)",t.lineWidth=1.5,t.beginPath();for(let h=0;h<=on;h+=30){const f=l(h);h?t.lineTo(f,h):t.moveTo(f,h)}t.stroke(),t.beginPath();for(let h=0;h<=on;h+=30){const f=l(h)+10;h?t.lineTo(f,h):t.moveTo(f,h)}t.stroke();for(let h=140;h<on;h+=240){const f=l(h);t.strokeStyle="rgba(15,17,14,0.35)",t.lineWidth=3,t.beginPath(),t.moveTo(f+5,h),t.lineTo(f+58,h+26),t.stroke(),t.strokeStyle="#8f959d",t.lineWidth=2.5,t.beginPath(),t.moveTo(f-9,h-9),t.lineTo(f+19,h+9),t.moveTo(f+19,h-9),t.lineTo(f-9,h+9),t.stroke()}for(let h=0;h<260;h++){const f=e()*Me,m=e()*on,g=3+e()*14;for(let p=0;p<g;p++){const _=f+(e()-.5)*90,S=m+(e()-.5)*90,x=3+e()*6;t.fillStyle="rgba(18,26,16,0.55)",t.beginPath(),t.arc(_+4,S+3,x,0,7),t.fill(),t.fillStyle=["#2e4229","#354b2c","#28381f"][e()*3|0],t.beginPath(),t.arc(_,S,x,0,7),t.fill()}}const c=1400,u=h=>c+Math.sin(h*.008)*60+Math.sin(h*.0021)*140,d=t.createLinearGradient(0,0,0,c+200);d.addColorStop(0,"#16222b"),d.addColorStop(1,"#22333e"),t.fillStyle=d,t.beginPath(),t.moveTo(0,0),t.lineTo(Me,0);for(let h=Me;h>=0;h-=20)t.lineTo(h,u(h));t.closePath(),t.fill(),t.strokeStyle="#6b6350",t.lineWidth=26,t.beginPath();for(let h=0;h<=Me;h+=20){const f=u(h)+14;h?t.lineTo(h,f):t.moveTo(h,f)}t.stroke();for(let h=0;h<3;h++){t.strokeStyle=`rgba(220,228,232,${.22-h*.06})`,t.lineWidth=2.5-h*.6,t.beginPath();for(let f=0;f<=Me;f+=20){const m=u(f)-12-h*22+Math.sin(f*.05+h)*4;f?t.lineTo(f,m):t.moveTo(f,m)}t.stroke()}t.fillStyle="rgba(255,255,255,0.022)";for(let h=0;h<9e3;h++)t.fillRect(e()*Me,e()*on,1.5,1.5);t.fillStyle="rgba(0,0,0,0.05)";for(let h=0;h<9e3;h++)t.fillRect(e()*Me,e()*on,2,2);return r}function NE(r){const t=r.getContext("2d"),e=UE(),n={progress:0,shown:0,active:!1};function i(){const o=Math.min(window.devicePixelRatio||1,1.5);r.width=r.clientWidth*o,r.height=r.clientHeight*o}i();function s(o){n.shown+=(n.progress-n.shown)*.09;const a=r.width,l=r.height;if(!a||!l)return;const c=Me,u=Math.round(l/a*c),h=(on-u)*(1-n.shown),f=Math.sin(n.shown*4.2)*26;t.save(),t.imageSmoothingEnabled=!0,t.imageSmoothingQuality="high",t.clearRect(0,0,a,l),t.drawImage(e,f,h,c-60,u,0,0,a,l),t.fillStyle="rgba(6, 9, 11, 0.42)",t.fillRect(0,0,a,l);const m=t.createRadialGradient(a/2,l/2,l*.32,a/2,l/2,l*.85);m.addColorStop(0,"rgba(0,0,0,0)"),m.addColorStop(1,"rgba(2,3,4,0.55)"),t.fillStyle=m,t.fillRect(0,0,a,l),t.restore()}return{state:n,tick:s,resize:i}}function OE(r){const t=r.getContext("2d"),e={progress:0,shown:0,active:!1};function n(){const c=Math.min(window.devicePixelRatio||1,1.5);r.width=r.clientWidth*c,r.height=r.clientHeight*c}n();const i="rgba(199,204,212,",s="rgba(217,142,63,",o="rgba(111,191,143,";function a(c,u,d){t.save(),t.translate(c,u),t.strokeStyle=i+"0.95)",t.fillStyle="rgba(20,22,26,0.9)",t.lineWidth=d*.06,t.beginPath(),t.moveTo(d,0),t.lineTo(d*.25,d*.16),t.lineTo(d*.1,d*1.05),t.lineTo(-d*.12,d*1.05),t.lineTo(-d*.28,d*.16),t.lineTo(-d*.85,d*.4),t.lineTo(-d*.95,d*.4),t.lineTo(-d*.75,0),t.lineTo(-d*.95,-d*.4),t.lineTo(-d*.85,-d*.4),t.lineTo(-d*.28,-d*.16),t.lineTo(-d*.12,-d*1.05),t.lineTo(d*.1,-d*1.05),t.lineTo(d*.25,-d*.16),t.closePath(),t.fill(),t.stroke(),t.restore()}function l(c){e.shown+=(e.progress-e.shown)*.1;const u=Math.max(0,Math.min(1,e.shown)),d=r.width,h=r.height;if(!d||!h)return;t.clearRect(0,0,d,h);const f=Math.min(d,h)/800,m=d*.34,g=h*.56;t.lineWidth=1;for(let A=1;A<=5;A++)t.strokeStyle=i+"0.07)",t.beginPath(),t.arc(m,g,A*130*f,0,Math.PI*2),t.stroke();for(let A=0;A<12;A++){const w=A/12*Math.PI*2;t.strokeStyle=i+"0.05)",t.beginPath(),t.moveTo(m+Math.cos(w)*60*f,g+Math.sin(w)*60*f),t.lineTo(m+Math.cos(w)*660*f,g+Math.sin(w)*660*f),t.stroke()}t.font=`${10*f+6}px "IBM Plex Mono", monospace`,t.fillStyle=i+"0.35)";for(let A=2;A<=5;A++)t.fillText(`R${A-1}`,m+A*130*f-22*f,g-6*f);const p=(80+u*560)*f,_=-.62,S=.62,x=t.createRadialGradient(m,g,30*f,m,g,p);x.addColorStop(0,s+"0.10)"),x.addColorStop(.8,s+"0.035)"),x.addColorStop(1,s+"0)"),t.fillStyle=x,t.beginPath(),t.moveTo(m,g),t.arc(m,g,p,_,S),t.closePath(),t.fill(),t.strokeStyle=s+"0.35)",t.setLineDash([4,7]),t.beginPath(),t.arc(m,g,p,_,S),t.stroke(),t.setLineDash([]);for(let A=0;A<2;A++){const w=((c*12e-5+A*.5)%1*.5+u*.5)*640*f;t.strokeStyle=i+`${.1*(1-w/(660*f))})`,t.beginPath(),t.arc(m,g,Math.max(w,1),0,Math.PI*2),t.stroke()}a(m,g,26*f),t.fillStyle=i+"0.5)",t.fillText("TRC-0107 · STATION",m-48*f,g+52*f);const M=.32;if(u>M){const A=(u-M)/(1-M),w=m+(520-A*90)*f,y=g-(200-A*50)*f,R=(Math.sin(c*.008)+1)/2;if(u>.72){t.fillStyle=o+"0.5)";for(let Y=1;Y<=6;Y++){const W=Math.max(0,A-Y*.06),it=m+(520-W*90)*f,P=g-(200-W*50)*f;t.fillRect(it-1.5,P-1.5,3,3)}t.strokeStyle=o+"0.8)",t.lineWidth=1.2,t.beginPath(),t.moveTo(w,y),t.lineTo(w-46*f,y+26*f),t.stroke()}t.fillStyle=`rgba(224, 120, 80, ${.6+R*.4})`,t.beginPath(),t.arc(w,y,4.5*f,0,Math.PI*2),t.fill();const D=26*f,v=u>.72?o+"0.95)":u>.52?s+"0.95)":i+"0.9)";t.strokeStyle=v,t.lineWidth=1.4;const T=D*.4;t.beginPath(),t.moveTo(w-D,y-D+T),t.lineTo(w-D,y-D),t.lineTo(w-D+T,y-D),t.moveTo(w+D-T,y-D),t.lineTo(w+D,y-D),t.lineTo(w+D,y-D+T),t.moveTo(w+D,y+D-T),t.lineTo(w+D,y+D),t.lineTo(w+D-T,y+D),t.moveTo(w-D+T,y+D),t.lineTo(w-D,y+D),t.lineTo(w-D,y+D-T),t.stroke(),t.fillStyle=v;const I=10*f+6;t.font=`${I}px "IBM Plex Mono", monospace`;let z="DETECTED",H=`CONF ${(.42+A*.55).toFixed(2)}`;u>.52&&(z="CLASSIFIED",H="CLASS · MICRO-UAS QUADCOPTER"),u>.72&&(z="TRACKED",H="TRK-014 · UNAUTHORISED · ALT 90 M");const q=w+D+240*f>d;t.textAlign=q?"right":"left";const k=q?w-D-12*f:w+D+12*f;t.fillText(z,k,y-4*f),t.fillStyle=i+"0.65)",t.fillText(H,k,y+I),t.textAlign="left",t.strokeStyle=i+"0.18)",t.setLineDash([2,6]),t.beginPath(),t.moveTo(m,g),t.lineTo(w,y),t.stroke(),t.setLineDash([])}}return{state:e,tick:l,resize:n}}const Ar="http://www.w3.org/2000/svg";function FE(r){const t=document.getElementById("wp-rail"),e=document.createElementNS(Ar,"svg");t.appendChild(e);let n=[],i,s,o,a=0,l=[];function c(){e.innerHTML="",n=[];const h=window.innerHeight,f=h*.1,m=h*.9,p=document.documentElement.scrollHeight-h,_=r.map((x,M)=>{const A=Math.min(1,Math.max(0,x.scrollStart/p));return{t:A,x:24+M%2*14,y:f+A*(m-f),wp:x.wp,label:x.label}}),S=_.map((x,M)=>`${M?"L":"M"}${x.x},${x.y}`).join(" ");i=document.createElementNS(Ar,"path"),i.setAttribute("d",S),i.setAttribute("class","wp-path-base"),e.appendChild(i),s=document.createElementNS(Ar,"path"),s.setAttribute("d",S),s.setAttribute("class","wp-path-live"),e.appendChild(s),a=s.getTotalLength(),s.style.strokeDasharray=`${a}`,s.style.strokeDashoffset=`${a}`,l=[0];for(let x=1;x<_.length;x++){const M=_[x].x-_[x-1].x,A=_[x].y-_[x-1].y;l.push(l[x-1]+Math.hypot(M,A))}for(const x of _){const M=document.createElementNS(Ar,"g");M.setAttribute("class","wp-node");const A=document.createElementNS(Ar,"circle");A.setAttribute("cx",x.x),A.setAttribute("cy",x.y),A.setAttribute("r",3);const w=document.createElementNS(Ar,"text");w.setAttribute("x",x.x+9),w.setAttribute("y",x.y+2.5),w.textContent=x.wp,M.append(A,w),e.appendChild(M),x.g=M,n.push(x)}o=document.createElementNS(Ar,"path"),o.setAttribute("class","wp-marker"),o.setAttribute("d","M0,-5 L3.4,4 L0,2.2 L-3.4,4 Z"),e.appendChild(o)}const u=document.querySelector(".hud-sec-label");function d(h){if(!s)return;const f=a*h;s.style.strokeDashoffset=`${Math.max(0,a-f)}`;const m=s.getPointAtLength(f),g=s.getPointAtLength(Math.min(a,f+2)),p=Math.atan2(g.y-m.y,g.x-m.x)*180/Math.PI+90;o.setAttribute("transform",`translate(${m.x},${m.y}) rotate(${p})`);let _=n[0];for(const S of n){const x=h>=S.t-.002;S.g.classList.toggle("hit",x),x&&(_=S)}u&&_&&(u.textContent=`${_.wp} · ${_.label}`)}return c(),{layout:c,update:d}}ri.registerPlugin(Wt);"scrollRestoration"in history&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("load",()=>{requestAnimationFrame(()=>{window.scrollTo(0,0),Wt.refresh()})});const Lh=document.getElementById("boot"),BE=Lh.querySelectorAll(".boot-line"),zE=Lh.querySelector(".boot-bar-fill");ri.to(zE,{scaleX:1,duration:1.15,ease:"power1.inOut"});BE.forEach((r,t)=>setTimeout(()=>r.classList.add("on"),120+t*340));setTimeout(()=>{Lh.classList.add("done"),WE()},1350);const Al=new Jm({duration:1.1});Al.on("scroll",Wt.update);ri.ticker.add(r=>Al.raf(r*1e3));ri.ticker.lagSmoothing(0);const Im=document.getElementById("nav-links"),kE=document.getElementById("nav-burger");kE.addEventListener("click",()=>Im.classList.toggle("open"));document.querySelectorAll("a[data-nav]").forEach(r=>{r.addEventListener("click",t=>{const e=r.getAttribute("href");if(!e||!e.startsWith("#"))return;const n=document.querySelector(e);if(!n)return;t.preventDefault(),Im.classList.remove("open");const i=n.getBoundingClientRect().top+window.scrollY;Al.scrollTo(i,{duration:1.4})})});const $r=RE(document.getElementById("hero-canvas")),qo=PE(document.getElementById("macro-canvas")),ur=DE(document.getElementById("exploded-canvas")),Js=NE(document.getElementById("terrain-canvas")),$o=OE(document.getElementById("sweep-canvas")),Or=new Set,HE=new IntersectionObserver(r=>{var t;for(const e of r){const n=(t=e.target.closest("section"))==null?void 0:t.id;n&&(e.isIntersecting?Or.add(n):Or.delete(n))}});document.querySelectorAll(".stage canvas").forEach(r=>HE.observe(r));function Qo(r,t,e){const n=document.getElementById(r),i=n.querySelector(".stage");return Wt.create({trigger:n,start:"top top",end:`+=${t}%`,pin:i,scrub:!0,anticipatePin:1,onUpdate:s=>e(s.progress)})}const VE=document.querySelector(".hero-copy"),GE=document.getElementById("hero-hint"),Um=document.getElementById("hero-azimuth");Qo("home",300,r=>{$r.progress=r,GE.style.opacity=String(Math.max(0,1-r*9));const t=r<.6?1:Math.max(0,1-(r-.6)/.28);VE.style.opacity=String(t)});function WE(){ri.fromTo("#hero-logo",{opacity:0,y:-16},{opacity:1,y:0,duration:1.2,ease:"power3.out"}),ri.fromTo("#hero-title .line",{opacity:0,letterSpacing:"0.55em"},{opacity:1,letterSpacing:"0.18em",duration:1.7,ease:"power3.out",stagger:.14}),ri.fromTo(["#hero-tagline","#hero-subline","#hero-hint","#hero-readout"],{opacity:0,y:14},{opacity:1,y:0,duration:1.1,ease:"power2.out",stagger:.1,delay:.55,clearProps:"opacity,transform"})}const Cr={alt:document.getElementById("t-alt"),gs:document.getElementById("t-gs"),hdg:document.getElementById("t-hdg"),lat:document.getElementById("t-lat"),lon:document.getElementById("t-lon"),bat:document.getElementById("t-bat"),tc:document.getElementById("t-tc")};Qo("operations",350,r=>{Js.state.progress=r});function Nm(r){const t=Js.state.shown;Cr.alt.textContent=`${(120+Math.sin(t*40)*2.4+Math.sin(r*.001)*.7).toFixed(1)} M`,Cr.gs.textContent=`${(18.2+Math.sin(t*25)*.5).toFixed(1)} M/S`,Cr.hdg.textContent=`${String(Math.round((7+Math.sin(t*30)*3+360)%360)).padStart(3,"0")}°`,Cr.lat.textContent=`${(26.8467+t*.04512).toFixed(5)} N`,Cr.lon.textContent=`${(80.94981+Math.sin(t*3.1)*.0012).toFixed(5)} E`,Cr.bat.textContent=`${Math.round(94-t*13)}%`;const e=t*372,n="00",i=String(Math.floor(e/60)).padStart(2,"0"),s=String(Math.floor(e%60)).padStart(2,"0"),o=String(Math.floor(e%1*25)).padStart(2,"0");Cr.tc.textContent=`${n}:${i}:${s}:${o}`}const XE=["EO/IR GIMBAL · 3-AXIS STABILISED","CFRP COMPOSITE SKIN · PANELISED ACCESS","EDGE-AI BAY · PASSIVE THERMAL VENTING · SEALED AVIONICS","C2 / TELEMETRY LINK · ENCRYPTED"],YE=document.getElementById("mc-index"),Sd=document.getElementById("mc-text");let Md=-1;Qo("payload",280,r=>{qo.progress=r;const t=Math.min(3,Math.floor(r*4));t!==Md&&(Md=t,YE.textContent=`0${t+1} / 04`,Sd.textContent=XE[t],ri.fromTo(Sd,{opacity:0,x:10},{opacity:1,x:0,duration:.4}))});const qE=[{key:"autonomy",off:[-280,-175],label:"AUTONOMY STACK",sub:"ONE STACK, EVERY PLATFORM"},{key:"gcslink",off:[200,-95],label:"RUGGED GCS LINK",sub:"COMMON GCS LAYER"},{key:"edgeai",off:[230,-30],label:"EDGE-AI COMPUTE MODULE",sub:"ONBOARD INFERENCE · SENSOR-TO-DECISION"},{key:"gimbal",off:[180,140],label:"EO/IR PAYLOAD",sub:"COMMON PAYLOAD INTERFACE"},{key:"battery",off:[-280,120],label:"BATTERY / PROPULSION PACK",sub:"FIELD-SWAPPABLE"},{key:"groundSeg",off:[200,40],label:"AI MISSION ANALYTICS PLATFORM",sub:"ONE ANALYTICS LAYER ACROSS THE FLEET"}],$E=document.getElementById("leader-svg"),Om=document.getElementById("arch-callouts"),KE=qE.map(r=>{const t=document.createElement("div");t.className="arch-co",t.innerHTML=`<span>${r.label}</span>${r.sub?`<small>${r.sub}</small>`:""}`,Om.appendChild(t);const e=document.createElementNS("http://www.w3.org/2000/svg","line"),n=document.createElementNS("http://www.w3.org/2000/svg","line"),i=document.createElementNS("http://www.w3.org/2000/svg","circle");return i.setAttribute("r",2.5),$E.append(e,n,i),{...r,div:t,line:e,line2:n,dot:i}}),ta=document.createElement("p");ta.className="mono arch-co";ta.style.cssText="left:50%;top:78%;transform:translateX(-50%);color:#dfe4ea;";ta.innerHTML='INTEGRATION COMPLETE · <span style="color:var(--ok)">ONE AIRCRAFT</span>';Om.appendChild(ta);Qo("technology",300,r=>{ur.progress=r});function Fm(){const r=document.querySelector("#technology .stage"),t=r.clientWidth,e=r.clientHeight,n=ur.assembly(),i=Math.max(0,Math.min(1,(n-.06)*2.4)),s=ur.uas.userData,o=t<900;for(const[a,l]of KE.entries()){const c=l.key==="groundSeg"?s.groundSeg:s.modules[l.key],u=ur.project(c);let d,h;if(o)d=Math.round(t*.08),h=Math.round(e*.6+a*52);else{const m=Math.min(1,t/1300);d=u.x+l.off[0]*m,h=u.y+l.off[1]*m,d=Math.max(12,Math.min(t-330,d)),h=Math.max(240,Math.min(e-60,h))}l.div.style.left=`${d}px`,l.div.style.top=`${h}px`,l.div.style.opacity=String(i);const f=d>u.x?d-8:d+l.div.offsetWidth+8;l.line.setAttribute("x1",u.x),l.line.setAttribute("y1",u.y),l.line.setAttribute("x2",f),l.line.setAttribute("y2",h),l.line2.setAttribute("x1",f),l.line2.setAttribute("y1",h),l.line2.setAttribute("x2",d>u.x?d-2:d+l.div.offsetWidth+2),l.line2.setAttribute("y2",h),l.dot.setAttribute("cx",u.x),l.dot.setAttribute("cy",u.y);for(const m of[l.line,l.line2,l.dot])m.style.opacity=String(o?0:i)}ta.style.opacity=String(n<.02?1:0)}const bc=document.querySelectorAll("#sweep-status .ss");Qo("airspace",280,r=>{$o.state.progress=r,bc[0].classList.toggle("on",r>.32),bc[1].classList.toggle("on",r>.52),bc[2].classList.toggle("on",r>.72)});ri.utils.toArray(".reveal").forEach(r=>{ri.to(r,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:r,start:"top 88%",end:"top 58%",scrub:!0}})});const Bm=[...document.querySelectorAll("section[data-wp]")].map(r=>({el:r,wp:r.dataset.wp,label:r.dataset.label,scrollStart:0}));function zm(){for(const r of Bm)r.scrollStart=r.el.getBoundingClientRect().top+window.scrollY}zm();const _l=FE(Bm);Wt.addEventListener("refresh",()=>{zm(),_l.layout()});const ZE=document.querySelector(".hud-utc");setInterval(()=>{ZE.textContent=`UTC ${new Date().toISOString().slice(11,19)}`},1e3);document.getElementById("quote-form").addEventListener("submit",r=>{r.preventDefault();const t=new FormData(r.target),e=encodeURIComponent(`Enquiry — ${t.get("sector")} — ${t.get("org")}`),n=encodeURIComponent(`Name: ${t.get("name")}
Organisation: ${t.get("org")}
Email: ${t.get("email")}
Sector: ${t.get("sector")}

Requirement:
${t.get("msg")}`);window.location.href=`mailto:info@tricentaerospace.in?subject=${e}&body=${n}`});ri.ticker.add(r=>{const t=r*1e3;Or.has("home")&&($r.tick(t),Um.textContent=`AZ ${$r.azimuth().toFixed(1).padStart(5,"0")}°`),Or.has("operations")&&(Js.tick(t),Nm(t)),Or.has("payload")&&qo.tick(t),Or.has("technology")&&(ur.tick(t),Fm()),Or.has("airspace")&&$o.tick(t);const n=document.documentElement.scrollHeight-window.innerHeight;_l.update(n>0?Math.min(1,Math.max(0,window.scrollY/n)):0)});let yd;window.addEventListener("resize",()=>{clearTimeout(yd),yd=setTimeout(()=>{$r.resize(),qo.resize(),ur.resize(),Js.resize(),$o.resize(),Wt.refresh()},150)});window.__tricent={hero:$r,macro:qo,exploded:ur,terrain:Js,sweep:$o,rail:_l,lenis:Al,ScrollTrigger:Wt,frame(r=performance.now()){$r.tick(r),qo.tick(r),ur.tick(r),Js.tick(r),$o.tick(r),Nm(r),Fm(),Um.textContent=`AZ ${$r.azimuth().toFixed(1).padStart(5,"0")}°`;const t=document.documentElement.scrollHeight-window.innerHeight;_l.update(t>0?Math.min(1,Math.max(0,window.scrollY/t)):0)}};
