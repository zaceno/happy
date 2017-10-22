!function(){"use strict";function n(n,t){var e,o=[];for(s=arguments.length;s-- >2;)c.push(arguments[s]);for(;c.length;)if(Array.isArray(e=c.pop()))for(s=e.length;s--;)c.push(e[s]);else null!=e&&!0!==e&&!1!==e&&o.push("number"==typeof e?e+="":e);return"string"==typeof n?{type:n,props:t||{},children:o}:n(t||{},o)}function t(n){n.parentNode&&n.parentNode.removeChild(n)}function e(n,t){t.style.transition=`all ${n.easing} ${n.time}ms`}function o(n){return t=>{var e="function"==typeof n?n():n;return Object.assign({},U,e)}}function r(n,t){return function(e){const r=o(e),a=n=>t(r(),n);return function(t){if(!t||!t.props)return;const e=t.props[n]||(n=>{});return t.props[n]=((...n)=>(e(...n),a(...n),()=>{})),t}}}function a(n){const t=+n.getAttribute("data-t-x"),e=+n.getAttribute("data-t-y"),{left:o,top:r}=n.getBoundingClientRect();return n.setAttribute("data-t-x",o),n.setAttribute("data-t-y",r),t?[t-o,e-r]:[null,null]}function i(...n){const t=[...n],e=t.length;var o=t[0];if(1===e)return o;var r;return r=e>2?i(...t.slice(1)):t[1],n=>o(r(n))}!function(n){if(n||window){var t=document.createElement("style");t.setAttribute("media","screen"),t.innerHTML=n,document.head.appendChild(t)}}(".slide-forward-leave,\n.slide-back-enter {\n  transform: translateX(-110%);\n}\n.slide-back-leave,\n.slide-forward-enter {\n  transform: translateX(110%);\n}\n.slide-forward-run,\n.slide-back-run {\n  transition: transform 0.35s ease-in-out;\n}\n*,\nul,\nli,\nbutton,\ninput,\nbody {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 17px;\n}\n@media (min-height: 500px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 20px;\n  }\n}\n@media (min-height: 600px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 25px;\n  }\n}\n@media (min-height: 800px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 30px;\n  }\n}\n@media (min-height: 1000px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 35px;\n  }\n}\n/*\n448px: 17px\n20px : 568\n667:  25px\n\n1024: \n*/\nhtml,\nbody,\n#app {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background: #aaa;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n}\n.page .panel {\n  flex: 1 0 auto;\n  margin: 0.5em;\n  background: #eee;\n  border: 1px #bbbbbb solid;\n  padding: 0.5em;\n  color: #555;\n  text-shadow: 0px 1px 1px #ffffff;\n}\n.page button.nav-button {\n  flex: 0 0 auto;\n  position: relative;\n  height: 15%;\n  color: #fff;\n  background-color: #d6975c;\n  text-shadow: 0 0 1px #29190a;\n}\n.page button.nav-button.active {\n  background-color: #a36429;\n  text-shadow: #140c05;\n}\n.page button.nav-button .button-text-extra {\n  font-size: 0.6em;\n}\n.page button.nav-button .button-text-main {\n  text-transform: uppercase;\n  font-size: 1.2em;\n}\n.page button.nav-button.forward .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  right: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.forward .icon svg path,\n.page button.nav-button.forward .icon svg line,\n.page button.nav-button.forward .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.forward .icon.hflip svg {\n  transform: scale(-1, 1);\n}\n.page button.nav-button.back .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  left: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.back .icon svg path,\n.page button.nav-button.back .icon svg line,\n.page button.nav-button.back .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.back .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector {\n  list-style-type: none;\n  text-indent: none;\n  display: flex;\n  flex-direction: column;\n  margin: 0.5em;\n  margin-top: 0;\n}\nul.option-selector li {\n  flex: 1 1 auto;\n  padding: 0.5em;\n  padding-left: 3em;\n  position: relative;\n  color: #fff;\n  background: #3cb8ea;\n  text-shadow: 0 0 1px #093c51;\n  border-bottom: 1px #81d1f1 solid;\n}\nul.option-selector li.active {\n  color: #ffffff;\n  background: #1381ad;\n  text-shadow: 0 0 1px #041a23;\n}\nul.option-selector li .icon {\n  filter: drop-shadow(0 0 1px #093c51);\n  position: absolute;\n  left: 0.5em;\n  top: 0.5em;\n  bottom: 0.5em;\n  width: 2em;\n}\nul.option-selector li .icon svg path,\nul.option-selector li .icon svg line,\nul.option-selector li .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\nul.option-selector li .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector li .label {\n  font-size: 0.9em;\n}\nul.option-selector li .extra {\n  font-size: 0.65em;\n  font-style: italic;\n}\nul.option-selector li .extra:before {\n  content: '\"';\n}\nul.option-selector li .extra:after {\n  content: '\"';\n}\n.result-display {\n  color: #555;\n  font-size: 2.5em;\n  display: block;\n  width: 4em;\n  height: 4em;\n  border-radius: 2em;\n  border: 3px #555 solid;\n  background: #fff;\n  text-align: center;\n  line-height: 3.8em;\n  box-sizing: border-box;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 1em;\n}\n");var s,c=[],u=function(n,t){var e={};for(var o in n)e[o]=t(o,n[o]);return e},l=function(n,t){return function(e,o,r){return n(e,o,r,t)}},p=function(n,t){return u(n,function(n,e){return("function"==typeof e?l:p)(e,t)})},f=function(n,t){return n.modules=u(n.modules,function(n,e){return f(e,t)}),n.actions=p(n.actions,t),n},d=function(n,t){var e=u(n,function(n,t){return t});for(var o in t)e[o]=[].concat(e[o]||[],t[o]);return e},m=function(n,t){return u(t,function(t,e){return e.map(function(t){return function(e,o,r){return t(e[n],o[n],r)}})})},v=function(n){var t={};for(var e in n.modules||{})t=d(t,m(e,v(n.modules[e])));return t=d(t,n.events)},g=function(n){return function(t,e,o){return function(){return(n[o[0]]||[]).reduce(function(n,r){return r(t,e,o[1])},null)}}},h={state:{current:0,sum:0,count:0},actions:{set:(n,t,e)=>({current:e}),commit:({current:n,sum:t,count:e})=>{if(0!==n)return{sum:t+n,count:e+1,current:0}},reset:n=>({sum:0,count:0,current:0})}},y={state:{current:"initial",direction:null},actions:{goTo:(n,t,[e,o],r)=>(r("navigation:"+e),{current:e,direction:o})}},x=(t,e)=>n("div",{class:"app-container"},e),b=(t,e)=>n("div",{class:"panel"},e),w=function(t){return t.replace(/\s/g,"").split(",").map(t=>(e,o)=>"object"!=typeof e||Array.isArray(e)?n(t,{},e):n(t,e,o))};const[k]=w("button"),T=n=>t=>{t.preventDefault(!0),t.currentTarget.classList.add("active"),n()};var $=({cls:n,action:t},e)=>k({class:n,ontouchstart:T(t),onmousedown:T(t)},e);const[A,C,F,V,z]=w("div, svg, path, circle, line"),H=(n,t)=>(n.width="100%",n.height="100%",n.xmlns="http://www.w3.org/2000/svg",C(n,t)),L=n=>H({viewBox:"-50 -50 100 100"},n),[M,N,B]=(n=>n.map(n=>t=>(t.fill="transparent",t["stroke-width"]=5,t["stroke-linecap"]="round",n(t))))([V,z,F]),I={chevron:H({viewBox:"-10 -20 20 40"},[F({d:"M -7 -17 L 7 0 L -7 17","stroke-linecap":"butt","stroke-width":"3"})]),noFace:L([M({cx:0,cy:0,r:40})]),veryHappyFace:L([M({cx:0,cy:0,r:40}),N({x1:-18,y1:-10,x2:-8,y2:-18}),N({x1:18,y1:-10,x2:8,y2:-18}),B({d:"M -15 15 C 0 20 0 20 15 15"})]),happyFace:L([M({cx:0,cy:0,r:40}),M({cx:-15,cy:-8,r:2}),M({cx:15,cy:-8,r:2}),B({d:"M -15 15 C 0 20 0 20 15 15"})]),uncertainFace:L([M({cx:0,cy:0,r:40}),M({cx:-15,cy:-8,r:2}),M({cx:15,cy:-8,r:2}),N({x1:-8,y1:15,x2:8,y2:15})]),unhappyFace:L([M({cx:0,cy:0,r:40}),M({cx:-15,cy:-8,r:2}),M({cx:15,cy:-8,r:2}),B({d:"M -15 15 C 0 10 0 10 15 15"})]),veryUnhappyFace:L([M({cx:0,cy:0,r:40}),N({x1:-15,y1:-7,x2:-8,y2:-15}),N({x1:-8,y1:-15,x2:-15,y2:-18}),N({x1:15,y1:-7,x2:8,y2:-15}),N({x1:8,y1:-15,x2:15,y2:-18}),B({d:"M -18 20 C -15 5 15 5 18 20"})])};var j=({name:n,effect:t})=>A({class:`icon ${t}`},[I[n]]),E=({direction:n})=>j({name:"chevron",effect:"back"===n?"hflip":""}),S=({goTo:t,target:e,direction:o,text:r,extra:a})=>$({cls:`nav-button ${o}`,action:n=>t([e,o])},[E({direction:o}),n("p",{class:"button-text-extra"},[a]),n("p",{class:"button-text-main"},[r])]);const U={name:"",time:0,delay:0,ready:0,easing:"",last:!0},_=r("onremove",(n,o)=>{const r=`${n.name}-leave`;o.style.transition="",o.style.transform="",o.classList.add(r);const i=getComputedStyle(o).getPropertyValue("transform"),[s,c,u,l,p,f]="none"===i?[1,0,0,1,0,0]:i.match(/^matrix\(([^\)]*)\)$/)[1].split(", ").map(n=>+n);o.classList.remove(r);const[d,m]=a(o);o.style.transform=`translate(${d}px, ${m}px)`,setTimeout(a=>{o.classList.add(r),o.style.transform=`matrix(${s}, ${c}, ${u}, ${l}, ${p+d}, ${f+m})`,e(n,o),n.last&&setTimeout(n=>t(o),n.time)},n.delay)}),R=r("oncreate",(n,t)=>setTimeout(n=>a(t),n.ready)),D=r("oncreate",(n,t)=>{const o=`${n.name}-enter`;t.classList.add(o),setTimeout(r=>{e(n,t),t.classList.remove(o)},n.delay)}),O=r("oncreate",(n,t)=>e(n,t)),P=r("onupdate",(n,t)=>{const[o,r]=a(t);t.style.transition="",t.style.transform=`translate(${o}px, ${r}px)`,setTimeout(o=>{e(n,t),t.style.transform="translate(0,0)",setTimeout(n=>{t.style.transform="",t.style.transition=""},n.time)})}),W=r("oncreate",(n,t)=>setTimeout(n=>a(t),n.ready));var X={change:O,enter:D,leave:n=>i(R(n),_(n)),move:n=>i(W(n),P(n)),group:function(n){return t=>(t.children.forEach(n),t)},combine:i};const q=(()=>{const{combine:n,enter:t,leave:e}=X;var o,r=n=>({name:"slide-"+o,easing:"ease-in-out",time:400,ready:500});return a=>(o=a,n(t(r),e(r)))})();var G=({name:t,direction:e,next:o},r)=>q(e)(n("div",{class:"page",key:t},[].concat(r,S(o))));const[J,K,Q]=w("ul, li, p"),Y=[{value:0,icon:"noFace",label:"No Vote",extra:"I don't want to participate."},{value:5,icon:"veryHappyFace",label:"Very Happy",extra:"It should always be this way!"},{value:4,icon:"happyFace",label:"Happy",extra:"It can always get better!"},{value:3,icon:"uncertainFace",label:"Don't know",extra:"Meh... / Mixed feelings"},{value:2,icon:"unhappyFace",label:"Unhappy",extra:"A lot needs to change!"},{value:1,icon:"veryUnhappyFace",label:"Very Unhappy",extra:"Why even bother..."}];var Z=({value:n,set:t})=>J({class:"option-selector"},Y.map(({value:e,icon:o,label:r,extra:a})=>K({onmousedown:n=>t(e),ontouchstart:n=>t(e),class:e===n?"active":""},[j({name:o}),Q({class:"label"},[r]),Q({class:"extra"},[a])])));const nn=({sum:n,count:t})=>0===t?"":""+Math.round(10*n/t)/10;var tn=t=>n("p",{class:"result-display"},[nn(t)]),en={initial:({direction:n,goTo:t})=>G({name:"initial",direction:n,next:{goTo:t,target:"start",direction:"forward",extra:"Tap here to...",text:"Start"}},[b(0,["Happiness Index Calculator"])]),start:({direction:n,goTo:t})=>G({name:"start",direction:n,next:{goTo:t,target:"vote",direction:"forward",extra:"When you're ready, tap here to...",text:"Vote"}},[b(0,["Please hand the phone to the first person to vote."])]),vote:({direction:n,goTo:t,votes:e})=>G({name:"vote",direction:n,next:{goTo:t,target:"pass",direction:"forward",extra:"Make your selection, then tap here to...",text:"Cast Vote"}},[b(0,["How happy are you about your job?"]),Z({value:e.state.current,set:e.actions.set})]),pass:({direction:n,goTo:t})=>G({name:"pass",direction:n,next:{goTo:t,target:"vote",direction:"back",extra:"Are you the next person? Tap here to...",text:"Vote"}},[S({goTo:t,target:"result",direction:"forward",extra:"Has everyone voted? Tap here to...",text:"Check Result"}),b(0,["Thank you! Now, please hand the phone to the next person."])]),result:({direction:n,goTo:t,votes:e})=>G({name:"result",direction:n,next:{goTo:t,target:"reset",direction:"forward",extra:"Need to do it again? Tap here to...",text:"Reset Votes"}},[b(0,["Happiness Index",tn({count:e.state.count,sum:e.state.sum})])]),reset:({direction:n,goTo:t,votes:e})=>G({name:"reset",direction:n,next:{goTo:t,target:"start",direction:"back",extra:"Tap here to...",text:"Start again"}},[b(0,["Votes cleared from memory",tn({count:e.state.count,sum:e.state.sum})])])};(function(n){return function(t,e){var o=function(){};(t=f(t,function(n,t){return o(n,t)})).actions.__emit=g(v(t));var r=n(t,e);return o=function(n,t){return r.__emit([n,t])},r}})(function(t,e){function o(){t.view&&!h&&requestAnimationFrame(r,h=!h)}function r(){a(b=g(e,b,w,w=t.view(y,x),h=!h))}function a(n){for(;n=k.pop();)n()}function i(t,e){return t&&n(t.tagName.toLowerCase(),{},e.call(t.childNodes,function(n){return 3===n.nodeType?n.nodeValue:i(n,e)}))}function s(n,t,e){n.init&&k.push(function(){n.init(t,e)}),u(t,n.state),c(t,e,n.actions);for(var o in n.modules)s(n.modules[o],t[o]={},e[o]={})}function c(n,t,e){function r(t){return"function"==typeof t?r(t(n)):t&&o(u(n,t)),n}Object.keys(e||{}).map(function(o){"function"==typeof e[o]?t[o]=function(a){return"function"==typeof(a=e[o](n,t,a))?a(r):r(a)}:c(n[o]||(n[o]={}),t[o]={},e[o])})}function u(n,t){for(var e in t)n[e]=t[e];return n}function l(n,t){return u(u({},n),t)}function p(n,t){if("string"==typeof n)e=document.createTextNode(n);else{var e=(t=t||"svg"===n.type)?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type);for(n.props&&n.props.oncreate&&k.push(function(){n.props.oncreate(e)}),o=0;o<n.children.length;o++)e.appendChild(p(n.children[o],t));for(var o in n.props)f(e,o,n.props[o])}return e}function f(n,t,e,o){if("key"===t);else if("style"===t)for(var t in l(o,e=e||{}))n.style[t]=e[t]||"";else{try{n[t]=e}catch(n){}"function"!=typeof e&&(e?n.setAttribute(t,e):n.removeAttribute(t))}}function d(n,t,e){for(var o in l(t,e)){var r=e[o],a="value"===o||"checked"===o?n[o]:t[o];r!==a&&r!==a&&f(n,o,r,a)}e&&e.onupdate&&k.push(function(){e.onupdate(n,t)})}function m(n,t,e){function o(){n.removeChild(t)}e&&e.onremove&&"function"==typeof(e=e.onremove(t))?e(o):o()}function v(n){if(n&&n.props)return n.props.key}function g(n,t,e,o,r,a){if(null==e)t=n.insertBefore(p(o,r),t);else if(null!=o.type&&o.type===e.type){d(t,e.props,o.props),r=r||"svg"===o.type;for(var i=o.children.length,s=e.children.length,c={},u=[],l={},f=0;f<s;f++)y=u[f]=t.childNodes[f],null!=(T=v(x=e.children[f]))&&(c[T]=[y,x]);for(var f=0,h=0;h<i;){var y=u[f],x=e.children[f],b=o.children[h];if(l[T=v(x)])f++;else{var w=v(b),k=c[w]||[];null==w?(null==T&&(g(t,y,x,b,r),h++),f++):(T===w?(g(t,k[0],k[1],b,r),f++):k[0]?(t.insertBefore(k[0],y),g(t,k[0],k[1],b,r)):g(t,y,null,b,r),h++,l[w]=b)}}for(;f<s;){var T=v(x=e.children[f]);null==T&&m(t,u[f],x.props),f++}for(var f in c){var $=(k=c[f])[1];l[$.props.key]||m(t,k[0],$.props)}}else t&&o!==t.nodeValue&&("string"==typeof o&&"string"==typeof e?t.nodeValue=o:(t=n.insertBefore(p(o,r),a=t),m(n,a,e.props)));return t}var h,y,x,b=(e=e||document.body).children[0],w=i(b,[].map),k=[];return o(a(s(t,y={},x={}))),x})({modules:{votes:h,navigation:y},events:{"navigation:reset":(n,t)=>t.votes.reset(),"navigation:pass":(n,t)=>t.votes.commit()},view:(n,t)=>x(0,[en[n.navigation.current]({direction:n.navigation.direction,goTo:t.navigation.goTo,votes:{state:n.votes,actions:t.votes}})])})}();
