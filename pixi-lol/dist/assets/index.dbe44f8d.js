import{A as t,a as e,G as i,R as s,T as n,C as a,S as o,f as r,b as l,c as h,E as d}from"./vendor.2b34de43.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(i){const s=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((i,a)=>{const o=new URL(t,s);if(self[e].moduleMap[o])return i(self[e].moduleMap[o]);const r=new Blob([`import * as m from '${o}';`,`${e}.moduleMap['${o}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){a(new Error(`Failed to import: ${t}`)),n(l)},onload(){i(self[e].moduleMap[o]),n(l)}});document.head.appendChild(l)})),self[e].moduleMap={}}}("assets/");const c={x:500,y:300,scale:.3,width:356,height:220,speed:3},u=1,p=800;class m extends e{constructor(t,e){super(t),this.options={},Object.assign(this.options,e,c),this.radian=0,this.anchor.set(.5,.5),this.targetX=this.options.x,this.targetY=this.options.y,this.position.set(this.options.x,this.options.y),this.animationSpeed=this.options.animationSpeed,this.scale.set(this.options.scale,this.options.scale)}goto(t,e){this.targetX=t,this.targetY=e,this.radian=Math.atan2(e-this.y,t-this.x),this.rotation=this.radian}walk(){if(this.targetX===this.x&&this.targetY===this.y)return;const t=this.x-this.targetX,e=this.y-this.targetY;Math.sqrt(Math.pow(t,2)+Math.pow(e,2))<this.options.speed?(this.x=this.targetX,this.y=this.targetY):(this.x=this.x+this.options.speed*Math.cos(this.radian),this.y=this.y+this.options.speed*Math.sin(this.radian))}reset(){this.radian=0,this.x=this.options.x,this.y=this.options.y,this.targetX=this.options.x,this.targetY=this.options.y}}class g extends i{constructor(t){super(),this.beginFill(10053375),this.drawCircle(0,0,t.size||32),this.endFill(),this.x=t.x,this.y=t.y}goto(t,e){this.targetX=t,this.targetY=e,this.radian=Math.atan2(e-this.y,t-this.x),this.rotation=this.radian}walk(){this.x=this.x+3*Math.cos(this.radian),this.y=this.y+3*Math.sin(this.radian)}}function f(t=255,e=0){return Math.floor(Math.random()*(t-e+1))+e}function w(t){const e=new i;if(e.lineStyle(2,0,.3),e.beginFill(16115735),e.drawPolygon([0,0,180,0,150,48,0,48]),e.endFill(),e.interactive=!0,t){const i=new n(t);i.x=28,i.y=12,i.style={fill:"black",fontSize:24},e.addChild(i),e.on("mouseover",(()=>{i.style.fill="white"})),e.on("mouseout",(()=>{i.style.fill="black"}))}return e}const y=function(){const e=new t({width:1e3,height:600,antialias:!0,transparent:!1,resolution:1});return document.body.appendChild(e.view),e.view.oncontextmenu=t=>{t.preventDefault()},e}();let x,b,v,C,k,M,F,j;function E(t){[x,b,v].forEach((e=>{M=t,t===e.name?(e.visible=!0,"start"===t&&(j.visible=!1),"play"===t?(j.visible=!0,F=0,C.reset(),k=function(t,e,i,s=300){const n=[[0,1e3,0,0],[0,0,0,600],[1e3,1e3,0,600],[0,1e3,600,600]];return setInterval((()=>{for(let s=0;s<i;s++){const s=n[f(i,0)],a=f(s[1],s[0]),o=f(s[3],s[2]),r=new g({x:a,y:o});r.goto(e.x,e.y),t.addChild(r)}}),s)}(b,C,u,p)):k&&(clearInterval(k),k=null)):e.visible=!1,"start"===t&&b.children.forEach((t=>{"yaoji"!==t.name&&"map"!==t.name&&b.removeChild(t)}))}))}function R(t,e){let i=!1;const s=t.x-e.x,n=t.y-e.y,a=(t.width+e.width)/2,o=(t.height+e.height)/2;return Math.abs(s)<a&&Math.abs(n)<o&&(i=!0),i}y.loader.add([{name:"player",url:"images/1.png"},{name:"background",url:"images/2.png"},{name:"starBackground",url:"images/lol-bg.jpg"}]).load((function(){(function(){x=new a,x.name="start";const t=new o(y.loader.resources.starBackground.texture);t.name="background";const e=1e3/t.width,u=600/t.height;t.scale.set(e,u),x.addChild(t);const p=w("开始游戏");p.position.set(24,240),x.addChild(p),p.on("click",(()=>{E("play")}));const g=w("其他功能");g.position.set(24,320),x.addChild(g),y.stage.addChild(x),x.visible=!0,function(){if(x){let t=function(){m=requestAnimationFrame(t),g.update()};const e=100,n=32,a=(new i).beginFill(16711680).drawCircle(e+n,e+n,e).endFill();a.filters=[new r.BlurFilter(n)];const c=new s(0,0,1e3,600),u=y.renderer.generateTexture(a,l.NEAREST,1,c),p=new o(u);y.stage.addChild(p);x.getChildByName("background").mask=p;let m=null;const g=new h(p.scale).to({x:5,y:5},1500).easing(d.Quadratic.In).onComplete((()=>{m&&(cancelAnimationFrame(m),m=null)})).start();requestAnimationFrame(t)}}(),b=new a,b.name="play";const f=y.loader.resources.background.texture,k=new s(0,1080,1550,900);f.frame=k;const M=new o(f);M.name="map";const R=1e3/M.width,S=600/M.height;M.scale.set(R,S),b.addChild(M),C=function(t){if(!t)return console.warn("请先加载图片资源"),null;let e=[];const i=t.texture,{width:n,height:a}=c;for(let o=0;o<4;o++){const t=i.clone(),r=new s(592+n*o,152,n,a);t.frame=r,e.push(t)}return new m(e)}(y.loader.resources.player),C.name="yaoji",b.addChild(C),b.interactive=!0,b.on("rightclick",(t=>{const{x:e,y:i}=t.data.global;C.goto(e,i)})),y.stage.addChild(b),b.visible=!1,v=new a,v.name="over";const X=w("重新开始");X.position.set(24,320),X.on("click",(()=>{E("start")})),v.addChild(X);const Y=new n("加油，再来一次，你是下一个Faker");Y.x=300,Y.y=300,Y.align="center",Y.style={fill:"white",fontSize:32},v.visible=!1,v.addChild(Y),F=0,j=new n(`${F}`),j.style={fill:"red",fontSize:32},j.position.set(500,200),j.visible=!1,y.stage.addChild(j),y.stage.addChild(v)})(),y.ticker.add((()=>{if("play"===M){for(let t=0;t<b.children.length;t++){let e=b.children[t];if("yaoji"!==e.name&&"map"!==e.name&&R(C,e))return void E("over")}j.text=""+ ++F,C.walk(),b.children.forEach((t=>{"yaoji"!==t.name&&"map"!==t.name&&t.walk()}))}}))})),window.onbeforeload=()=>{clearInterval(k)};
