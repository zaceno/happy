parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xJOT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=exports.h=exports.Lazy=void 0;var e=1,n=2,r=3,t={},o=[],i=o.map,l=Array.isArray,u="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,f=function(e){var n="";if("string"==typeof e)return e;if(l(e)&&e.length>0)for(var r,t=0;t<e.length;t++)""!==(r=f(e[t]))&&(n+=(n&&" ")+r);else for(var t in e)e[t]&&(n+=(n&&" ")+t);return n},a=function(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r},s=function(e){return e.reduce(function(e,n){return e.concat(n&&!0!==n?"function"==typeof n[0]?[n]:s(n):0)},o)},c=function(e,n){return l(e)&&l(n)&&e[0]===n[0]&&"function"==typeof e[0]},d=function(e,n){if(e!==n)for(var r in a(e,n)){if(e[r]!==n[r]&&!c(e[r],n[r]))return!0;n[r]=e[r]}},p=function(e,n,r){for(var t,o,i=0,l=[];i<e.length||i<n.length;i++)t=e[i],o=n[i],l.push(o?!t||o[0]!==t[0]||d(o[1],t[1])?[o[0],o[1],o[0](r,o[1]),t&&t[2]()]:t:t&&t[2]());return l},v=function(e,n,r,t,o,i){if("key"===n);else if("style"===n)for(var l in a(r,t))r=null==t||null==t[l]?"":t[l],"-"===l[0]?e[n].setProperty(l,r):e[n][l]=r;else"o"===n[0]&&"n"===n[1]?((e.actions||(e.actions={}))[n=n.slice(2).toLowerCase()]=t)?r||e.addEventListener(n,o):e.removeEventListener(n,o):!i&&"list"!==n&&n in e?e[n]=null==t?"":t:null==t||!1===t||"class"===n&&!(t=f(t))?e.removeAttribute(n):e.setAttribute(n,t)},y=function(e,n,t){var o=e.props,i=e.type===r?document.createTextNode(e.name):(t=t||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name,{is:o.is}):document.createElement(e.name,{is:o.is});for(var l in o)v(i,l,null,o[l],n,t);for(var u=0,f=e.children.length;u<f;u++)i.appendChild(y(e.children[u]=z(e.children[u]),n,t));return e.node=i},h=function(e){return null==e?null:e.key},m=function(n,t,o,i,l,u){if(o===i);else if(null!=o&&o.type===r&&i.type===r)o.name!==i.name&&(t.nodeValue=i.name);else if(null==o||o.name!==i.name)t=n.insertBefore(y(i=z(i),l,u),t),null!=o&&n.removeChild(o.node);else{var f,s,c,d,p=o.props,g=i.props,w=o.children,x=i.children,C=0,k=0,A=w.length-1,L=x.length-1;for(var b in u=u||"svg"===i.name,a(p,g))("value"===b||"selected"===b||"checked"===b?t[b]:p[b])!==g[b]&&v(t,b,p[b],g[b],l,u);for(;k<=L&&C<=A&&null!=(c=h(w[C]))&&c===h(x[k]);)m(t,w[C].node,w[C],x[k]=z(x[k++],w[C++]),l,u);for(;k<=L&&C<=A&&null!=(c=h(w[A]))&&c===h(x[L]);)m(t,w[A].node,w[A],x[L]=z(x[L--],w[A--]),l,u);if(C>A)for(;k<=L;)t.insertBefore(y(x[k]=z(x[k++]),l,u),(s=w[C])&&s.node);else if(k>L)for(;C<=A;)t.removeChild(w[C++].node);else{b=C;for(var N={},E={};b<=A;b++)null!=(c=w[b].key)&&(N[c]=w[b]);for(;k<=L;)c=h(s=w[C]),d=h(x[k]=z(x[k],s)),E[c]||null!=d&&d===h(w[C+1])?(null==c&&t.removeChild(s.node),C++):null==d||o.type===e?(null==c&&(m(t,s&&s.node,s,x[k],l,u),k++),C++):(c===d?(m(t,s.node,s,x[k],l,u),E[d]=!0,C++):null!=(f=N[d])?(m(t,t.insertBefore(f.node,s&&s.node),f,x[k],l,u),E[d]=!0):m(t,s&&s.node,null,x[k],l,u),k++);for(;C<=A;)null==h(s=w[C++])&&t.removeChild(s.node);for(var b in N)null==E[b]&&t.removeChild(N[b].node)}}return i.node=t},g=function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0},w=function(e){return"object"==typeof e?e:C(e)},z=function(e,r){return e.type===n?((!r||r.type!==n||g(r.lazy,e.lazy))&&((r=w(e.lazy.view(e.lazy))).lazy=e.lazy),r):e},x=function(e,n,r,t,o,i){return{name:e,props:n,children:r,node:t,type:i,key:o}},C=function(e,n){return x(e,t,o,n,void 0,r)},k=function(n){return n.nodeType===r?C(n.nodeValue,n):x(n.nodeName.toLowerCase(),t,i.call(n.childNodes,k),n,void 0,e)},A=function(e){return{lazy:e,type:n}};exports.Lazy=A;var L=function(e,n){for(var r,o=[],i=[],u=arguments.length;u-- >2;)o.push(arguments[u]);for(;o.length>0;)if(l(r=o.pop()))for(u=r.length;u-- >0;)o.push(r[u]);else!1===r||!0===r||null==r||i.push(w(r));return n=n||t,"function"==typeof e?e(n,i):x(e,n,i,void 0,n.key)};exports.h=L;var b=function(e){var n={},r=!1,t=e.view,o=e.node,i=o&&k(o),f=e.subscriptions,a=[],c=function(e){v(this.actions[e.type],e)},d=function(e){return n!==e&&(n=e,f&&(a=p(a,s([f(n)]),v)),t&&!r&&u(y,r=!0)),n},v=(e.middleware||function(e){return e})(function(e,r){return"function"==typeof e?v(e(n,r)):l(e)?"function"==typeof e[0]||l(e[0])?v(e[0],"function"==typeof e[1]?e[1](r):e[1]):(s(e.slice(1)).map(function(e){e&&e[0](v,e[1])},d(e[0])),n):d(e)}),y=function(){r=!1,o=m(o.parentNode,o,i,i=w(t(n)),c)};v(e.init)};exports.app=b;
},{}],"jqOm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mapPass=exports.mapVNode=exports.mapSubs=exports.makeMap=void 0;const e=e=>"function"==typeof e,s=e=>Array.isArray(e),p=t=>e(t)||s(t)&&p(t[0]),t=(s,p)=>e(p)?s(p):[t(s,p[0]),p[1]],r=(t,o,a)=>e(t)?r(t(o,a),o):s(t)?p(t)?r(t[0],o,e(t[1])?t[1](a):t[1]):t:[t],o=(e,s)=>{let p=t=>{let a=p.memo.get(t);return a||(a=(p=>(t,a,m=r(p,e(t),a),c=r(s,t,m[0]))=>[c[0],...n(o,m.slice(1)),...c.slice(1)])(t),p.memo.set(t,a)),a};p.memo=new Map;let o=e=>t(p,e);return o};exports.makeMap=o;const a=(e,s,p)=>Object.entries(s).map(([e,s])=>[e,p(e,s)]).reduce((e,[s,p])=>(e[s]=p,e),{}),m=e=>(p,t)=>s(t)?t.map(s=>e(p,s)):e(p,t),n=m((e,[s,t])=>[s,a(0,t,(s,t)=>p(t)?e(t):t)]);exports.mapSubs=n;const c=m((e,s)=>s.props?{...s,props:a(0,s.props,(s,p)=>p&&s.startsWith("on")?p.pass?p.pass:e(p):p),children:s.children.map(s=>c(e,s))}:s);exports.mapVNode=c;const i=e=>c(e=>({pass:e}),e);exports.mapPass=i;
},{}],"o6XP":[function(require,module,exports) {
module.exports={navContainer:"_navContainer_f6a3f",navPage:"_navPage_f6a3f","left-enter":"_left-enter_f6a3f","left-run":"_left-run_f6a3f","left-exit":"_left-exit_f6a3f","right-enter":"_right-enter_f6a3f","right-run":"_right-run_f6a3f","right-exit":"_right-exit_f6a3f","fade-enter":"_fade-enter_f6a3f","fade-run":"_fade-run_f6a3f","fade-exit":"_fade-exit_f6a3f"};
},{}],"T9Vs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getLeaving=exports.getEntering=exports.view=exports.show=exports.init=void 0;var t=require("hyperapp"),n=e(require("./style.css"));function e(t){return t&&t.__esModule?t:{default:t}}const r=(t=>n=>[t,{a:n}])((t,{a:n})=>requestAnimationFrame(e=>t(n))),i=t=>({current:t,prev:null,transition:null,running:!1});exports.init=i;const s=(t,{value:n,transition:e})=>t.prev||!n?t:e?[{...t,current:n,prev:t.current,transition:e},r(a)]:i(n);exports.show=s;const a=t=>({...t,running:!0}),o=t=>({current:t.current,running:!1,transition:null,prev:null}),u=t=>t.prev?t.current:null;exports.getEntering=u;const l=t=>t.prev;exports.getLeaving=l;const p=({state:e,entering:r,exiting:i},s)=>(0,t.h)("section",{class:[n.default.navPage,{[n.default[e.transition+"-enter"]]:r,[n.default[e.transition+"-exit"]]:i,[n.default[e.transition+"-run"]]:e.running}],ontransitionend:r?o:null},s),c=(e,r)=>(0,t.h)("main",{class:n.default.navContainer},e.transition&&(0,t.h)(p,{state:e,exiting:!0},r(e.prev)),e.transition&&(0,t.h)(p,{state:e,entering:!0},r(e.current)),!e.transition&&(0,t.h)(p,{state:e},r(e.current)));exports.view=c;
},{"hyperapp":"xJOT","./style.css":"o6XP"}],"TD3r":[function(require,module,exports) {
module.exports={selector:"_selector_bfd1a",label:"_label_bfd1a",extra:"_extra_bfd1a",selected:"_selected_bfd1a",result:"_result_bfd1a",face:"_face_bfd1a"};
},{}],"zpxl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VeryUnhappy=exports.Unhappy=exports.Meh=exports.Happy=exports.VeryHappy=exports.None=void 0;var e=require("hyperapp"),r=c(require("./style.css"));function c(e){return e&&e.__esModule?e:{default:e}}const p=(c,p)=>(0,e.h)("svg",{class:r.default.face,viewBox:"-50 -50 100 100"},(0,e.h)("circle",{cx:"0",cy:"0",r:"40"}),p),h=()=>(0,e.h)(p,null);exports.None=h;const y=()=>(0,e.h)(p,null,(0,e.h)("line",{x1:"-18",y1:"-10",x2:"-8",y2:"-18"}),(0,e.h)("line",{x1:"18",y1:"-10",x2:"8",y2:"-18"}),(0,e.h)("path",{d:"M -15 15 C 0 20 0 20 15 15"}));exports.VeryHappy=y;const x=()=>(0,e.h)(p,null,(0,e.h)("circle",{cx:"-15",cy:"-8",r:"2"}),(0,e.h)("circle",{cx:"15",cy:"-8",r:"2"}),(0,e.h)("path",{d:"M -15 15 C 0 20 0 20 15 15"}));exports.Happy=x;const l=()=>(0,e.h)(p,null,(0,e.h)("circle",{cx:"-15",cy:"-8",r:"2"}),(0,e.h)("circle",{cx:"15",cy:"-8",r:"2"}),(0,e.h)("line",{x1:"-15",y1:"15",x2:"15",y2:"15"}));exports.Meh=l;const t=()=>(0,e.h)(p,null,(0,e.h)("circle",{cx:"-15",cy:"-8",r:"2"}),(0,e.h)("circle",{cx:"15",cy:"-8",r:"2"}),(0,e.h)("path",{d:"M -15 15 C 0 10 0 10 15 15"}));exports.Unhappy=t;const n=()=>(0,e.h)(p,null,(0,e.h)("line",{x1:"-15",y1:"-7",x2:"-8",y2:"-15"}),(0,e.h)("line",{x1:"-8",y1:"-15",x2:"-15",y2:"-18"}),(0,e.h)("line",{x1:"15",y1:"-7",x2:"8",y2:"-15"}),(0,e.h)("line",{x1:"8",y1:"-15",x2:"15",y2:"-18"}),(0,e.h)("path",{d:"M -18 20 C -15 5 15 5 18 20"}));exports.VeryUnhappy=n;
},{"hyperapp":"xJOT","./style.css":"TD3r"}],"kVJN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=s(require("./style.css")),l=r(require("./faces"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function r(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var l={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u=r?Object.getOwnPropertyDescriptor(e,s):null;u&&(u.get||u.set)?Object.defineProperty(l,s,u):l[s]=e[s]}return l.default=e,t&&t.set(e,l),l}function s(e){return e&&e.__esModule?e:{default:e}}var u=({value:a,select:r},s,u=(e=>({ontouchstart:[r,e],onmousedown:[r,e],class:{[t.default.selected]:a===e}})))=>(0,e.h)("ul",{class:t.default.selector},(0,e.h)("li",u(0),(0,e.h)(l.None,null),(0,e.h)("p",{class:t.default.label},"No Vote"),(0,e.h)("p",{class:t.default.extra},"I don't want to participate")),(0,e.h)("li",u(5),(0,e.h)(l.VeryHappy,null),(0,e.h)("p",{class:t.default.label},"Very Happy"),(0,e.h)("p",{class:t.default.extra},"It should always be this way!")),(0,e.h)("li",u(4),(0,e.h)(l.Happy,null),(0,e.h)("p",{class:t.default.label},"Happy"),(0,e.h)("p",{class:t.default.extra},"It can always get better!")),(0,e.h)("li",u(3),(0,e.h)(l.Meh,null),(0,e.h)("p",{class:t.default.label},"Don't know"),(0,e.h)("p",{class:t.default.extra},"Meh... / Mixed feelings")),(0,e.h)("li",u(2),(0,e.h)(l.Unhappy,null),(0,e.h)("p",{class:t.default.label},"Unhappy"),(0,e.h)("p",{class:t.default.extra},"A lot needs to change!")),(0,e.h)("li",u(1),(0,e.h)(l.VeryHappy,null),(0,e.h)("p",{class:t.default.label},"Very Unhappy"),(0,e.h)("p",{class:t.default.extra},"Why even bother...")));exports.default=u;
},{"hyperapp":"xJOT","./style.css":"TD3r","./faces":"zpxl"}],"QN4M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),r=require("./style.css"),s=({value:s})=>(0,e.h)("p",{class:r.result},s||"");exports.default=s;
},{"hyperapp":"xJOT","./style.css":"TD3r"}],"CkPa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.result=exports.reset=exports.commit=exports.select=exports.init=void 0;const t={votes:0,total:0,current:0};exports.init=t;const e=({votes:t,total:e},o)=>({votes:t,total:e,current:o});exports.select=e;const o=({votes:t,total:e,current:o})=>({votes:o>0?t+1:t,total:o>0?e+o:e,current:0});exports.commit=o;const s=e=>({...t});exports.reset=s;const r=({votes:t,total:e})=>t?Math.round(10*e/t)/10:0;exports.result=r;
},{}],"reCU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.init=exports.reset=exports.commit=exports.result=exports.selector=void 0;var e=s(require("./selector")),t=s(require("./result")),r=n(require("./model"));function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function n(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u=n?Object.getOwnPropertyDescriptor(e,s):null;u&&(u.get||u.set)?Object.defineProperty(r,s,u):r[s]=e[s]}return r.default=e,t&&t.set(e,r),r}function s(e){return e&&e.__esModule?e:{default:e}}const u=({current:t})=>(0,e.default)({select:r.select,value:t});exports.selector=u;const i=e=>(0,t.default)({value:r.result(e)});exports.result=i;const{commit:c,reset:l,init:p}=r;exports.init=p,exports.reset=l,exports.commit=c;
},{"./selector":"kVJN","./result":"QN4M","./model":"CkPa"}],"JDu1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pollMap=exports.pollGet=exports.screenMap=exports.screenGet=exports.init=void 0;var e=require("hyperapp-map"),t=o(require("./screens")),r=o(require("./poll"));function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function o(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var p in e)if(Object.prototype.hasOwnProperty.call(e,p)){var s=o?Object.getOwnPropertyDescriptor(e,p):null;s&&(s.get||s.set)?Object.defineProperty(r,p,s):r[p]=e[p]}return r.default=e,t&&t.set(e,r),r}const p=(e=>t=>[e,{a:t}])((e,{a:t})=>t&&e(t)),s=e=>({screens:t.init("init"),poll:r.init});exports.init=s;const i=e=>e.poll;exports.pollGet=i;const c=(0,e.makeMap)(i,(e,t)=>({...e,poll:t}));exports.pollMap=c;const a=e=>e.screens;exports.screenGet=a;const l=(0,e.makeMap)(a,(e,n)=>[{...e,screens:n},"vote"===t.getLeaving(n)&&p(c(r.commit)),"cleared"===t.getEntering(n)&&p(c(r.reset))]);exports.screenMap=l;
},{"hyperapp-map":"jqOm","./screens":"T9Vs","./poll":"reCU"}],"g9Sd":[function(require,module,exports) {
module.exports={navButton:"_navButton_b6a89",chevron:"_chevron_b6a89",right:"_right_b6a89",left:"_left_b6a89",active:"_active_b6a89",label:"_label_b6a89",extra:"_extra_b6a89",panel:"_panel_b6a89"};
},{}],"OqA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Panel=exports.Page=exports.PollSelector=exports.PollResult=exports.NavButton=void 0;var e=require("hyperapp"),t=require("hyperapp-map"),r=require("../model"),o=u(require("../screens")),l=u(require("../poll")),a=n(require("./style.css"));function n(e){return e&&e.__esModule?e:{default:e}}function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if(Object.prototype.hasOwnProperty.call(e,l)){var a=o?Object.getOwnPropertyDescriptor(e,l):null;a&&(a.get||a.set)?Object.defineProperty(r,l,a):r[l]=e[l]}return r.default=e,t&&t.set(e,r),r}const p=({direction:t})=>(0,e.h)("svg",{class:[a.default.chevron,a.default[t]],viewBox:"-10 -20 20 40"},(0,e.h)("path",{d:"M -7 -17 L 7 0 L -7 17"})),c=({state:t,to:l,direction:n,extra:s,label:u},c,i=[(0,r.screenMap)(o.show),{value:l,transition:n}])=>(0,e.h)("button",{class:[a.default.navButton,a.default[n],{[a.default.active]:o.getEntering((0,r.screenGet)(t))===l}],onmousedown:i,ontouchstart:i},(0,e.h)(p,{direction:n}),(0,e.h)("p",{class:a.default.extra},s),(0,e.h)("p",{class:a.default.label},u));exports.NavButton=c;const i=({state:e})=>(0,t.mapVNode)(r.pollMap,l.result((0,r.pollGet)(e)));exports.PollResult=i;const f=({state:e})=>(0,t.mapVNode)(r.pollMap,l.selector((0,r.pollGet)(e)));exports.PollSelector=f;const d=({},e)=>e;exports.Page=d;const v=({},t)=>(0,e.h)("div",{class:a.default.panel},t);exports.Panel=v;
},{"hyperapp":"xJOT","hyperapp-map":"jqOm","../model":"JDu1","../screens":"T9Vs","../poll":"reCU","./style.css":"g9Sd"}],"m7Ki":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),r=r=>(0,e.h)(t.Page,null,(0,e.h)(t.Panel,null,"Happiness Index Calculator"),(0,e.h)(t.NavButton,{state:r,to:"start",direction:"right",extra:"Tap here to...",label:"Start"}));exports.default=r;
},{"hyperapp":"xJOT","../common":"OqA9"}],"YPme":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),r=r=>(0,e.h)(t.Page,null,(0,e.h)(t.Panel,null,"Please pass the phone to the first person"),(0,e.h)(t.NavButton,{state:r,to:"vote",direction:"right",extra:"When you're ready, tap here to...",label:"Vote"}));exports.default=r;
},{"hyperapp":"xJOT","../common":"OqA9"}],"kUNo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),o=o=>(0,e.h)(t.Page,null,(0,e.h)(t.Panel,null,"How happy are you about your job?"),(0,e.h)(t.PollSelector,{state:o}),(0,e.h)(t.NavButton,{state:o,to:"pass",direction:"right",extra:"Make your selection, then tap here to...",label:"Cast Vote"}));exports.default=o;
},{"hyperapp":"xJOT","../common":"OqA9"}],"V8yi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),o=o=>(0,e.h)(t.Page,null,(0,e.h)(t.NavButton,{state:o,to:"result",direction:"right",extra:"Has everyone voted? Tap here to...",label:"Check Result"}),(0,e.h)(t.Panel,null,"Thank you! Now, please hand the phone to the next person"),(0,e.h)(t.NavButton,{state:o,to:"vote",direction:"left",extra:"Are you the next person? Tap here to...",label:"Vote"}));exports.default=o;
},{"hyperapp":"xJOT","../common":"OqA9"}],"UYZK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),a=a=>(0,e.h)(t.Page,null,(0,e.h)(t.Panel,null,"Happiness Index:",(0,e.h)(t.PollResult,{state:a})),(0,e.h)(t.NavButton,{state:a,to:"cleared",direction:"right",extra:"Need to do it again? Tap here to...",label:"Reset Votes"}));exports.default=a;
},{"hyperapp":"xJOT","../common":"OqA9"}],"Lyng":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../common"),r=r=>(0,e.h)(t.Page,null,(0,e.h)(t.Panel,null,"Votes cleared from memory!",(0,e.h)(t.PollResult,{state:r})),(0,e.h)(t.NavButton,{state:r,to:"start",direction:"left",extra:"Tap here to...",label:"Start Again"}));exports.default=r;
},{"hyperapp":"xJOT","../common":"OqA9"}],"And1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"init",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"start",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"vote",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"pass",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(exports,"result",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"cleared",{enumerable:!0,get:function(){return i.default}});var e=o(require("./init")),r=o(require("./start")),t=o(require("./vote")),u=o(require("./pass")),n=o(require("./result")),i=o(require("./cleared"));function o(e){return e&&e.__esModule?e:{default:e}}
},{"./init":"m7Ki","./start":"YPme","./vote":"kUNo","./pass":"V8yi","./result":"UYZK","./cleared":"Lyng"}],"wxwQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp-map"),r=u(require("./pages")),t=require("../model"),n=require("../screens");function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=o();if(r&&r.has(e))return r.get(e);var t={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=n?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(t,u,a):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}var a=o=>(0,e.mapVNode)(t.screenMap,(0,n.view)((0,t.screenGet)(o),t=>(0,e.mapPass)(r[t](o))));exports.default=a;
},{"hyperapp-map":"jqOm","./pages":"And1","../model":"JDu1","../screens":"T9Vs"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),r=require("./model"),i=u(require("./view"));function u(e){return e&&e.__esModule?e:{default:e}}(0,e.app)({init:r.init,view:i.default,node:document.querySelector("main")});
},{"hyperapp":"xJOT","./model":"JDu1","./view":"wxwQ"}]},{},["Focm"], null)
//# sourceMappingURL=/happy/src.767f211b.js.map