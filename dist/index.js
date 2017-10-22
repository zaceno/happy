(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
'use strict';

function __$styleInject(css) {
  if(!(css || window)) {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('media', 'screen');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

var h = function(tag, data) {
  var node;
  var stack = [];
  var children = [];

  for (var i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i];
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i];
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + "";
      }
      children[children.length] = node;
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        data: data || {},
        children: children
      }
    : tag(data, children)
};

var app = function(app) {
  var state = {};
  var view = app.view;
  var actions = {};
  var events = {};
  var node;
  var element;

  for (var i = -1, mixins = app.mixins || []; i < mixins.length; i++) {
    var mixin = mixins[i] ? mixins[i](app) : app;

    if (mixin.mixins != null && mixin !== app) {
      mixins = mixins.concat(mixin.mixins);
    }

    if (mixin.state != null) {
      state = merge(state, mixin.state);
    }

    init(actions, mixin.actions);

    Object.keys(mixin.events || []).map(function(key) {
      events[key] = (events[key] || []).concat(mixin.events[key]);
    });
  }

  if (document.readyState[0] !== "l") {
    load();
  } else {
    addEventListener("DOMContentLoaded", load);
  }

  function init(namespace, children, lastName) {
    Object.keys(children || []).map(function(key) {
      var action = children[key];
      var name = lastName ? lastName + "." + key : key;

      if (typeof action === "function") {
        namespace[key] = function(data) {
          var result = action(
            state,
            actions,
            emit("action", {
              name: name,
              data: data
            }).data,
            emit
          );

          if (result == null || typeof result.then === "function") {
            return result
          }

          render((state = merge(state, emit("update", result))), view);
        };
      } else {
        init(namespace[key] || (namespace[key] = {}), action, name);
      }
    });
  }

  function load() {
    render(state, view);
    emit("loaded");
  }

  function emit(name, data) {
    (events[name] || []).map(function(cb) {
      var result = cb(state, actions, data, emit);
      if (result != null) {
        data = result;
      }
    });

    return data
  }

  function render(state, view) {
    element = patch(
      app.root || (app.root = document.body),
      element,
      node,
      (node = emit("render", view)(state, actions))
    );
  }

  function merge(a, b) {
    var obj = {};

    if (typeof b !== "object" || Array.isArray(b)) {
      return b
    }

    for (var i in a) {
      obj[i] = a[i];
    }
    for (var i in b) {
      obj[i] = b[i];
    }

    return obj
  }

  function createElementFrom(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node);
    } else {
      var element = (isSVG = isSVG || node.tag === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.tag)
        : document.createElement(node.tag);

      for (var i = 0; i < node.children.length; ) {
        element.appendChild(createElementFrom(node.children[i++], isSVG));
      }

      for (var i in node.data) {
        if (i === "oncreate") {
          node.data[i](element);
        } else {
          setElementData(element, i, node.data[i]);
        }
      }
    }

    return element
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in merge(oldValue, (value = value || {}))) {
        element.style[i] = value[i] || "";
      }
    } else {
      try {
        element[name] = value;
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value);
        } else {
          element.removeAttribute(name);
        }
      }
    }
  }

  function updateElementData(element, oldData, data) {
    for (var name in merge(oldData, data)) {
      var value = data[name];
      var oldValue = name === "value" || name === "checked"
        ? element[name]
        : oldData[name];

      if (name === "onupdate" && value) {
        value(element);
      } else if (value !== oldValue) {
        setElementData(element, name, value, oldValue);
      }
    }
  }

  function getKeyFrom(node) {
    if (node && (node = node.data)) {
      return node.key
    }
  }

  function removeElement(parent, element, node) {
    ((node.data && node.data.onremove) || removeChild)(element, removeChild);
    function removeChild() {
      parent.removeChild(element);
    }
  }

  function patch(parent, element, oldNode, node) {
    if (oldNode == null) {
      element = parent.insertBefore(createElementFrom(node), element);
    } else if (node.tag && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data);

      var len = node.children.length;
      var oldLen = oldNode.children.length;
      var reusableChildren = {};
      var oldElements = [];
      var newKeys = {};

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i];
        oldElements[i] = oldElement;

        var oldChild = oldNode.children[i];
        var oldKey = getKeyFrom(oldChild);

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < len) {
        var oldElement = oldElements[i];
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKeyFrom(oldChild);
        if (newKeys[oldKey]) {
          i++;
          continue
        }

        var newKey = getKeyFrom(newChild);

        var reusableChild = reusableChildren[newKey] || [];

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild);
            j++;
          }
          i++;
        } else {
          if (oldKey === newKey) {
            patch(element, reusableChild[0], reusableChild[1], newChild);
            i++;
          } else if (reusableChild[0]) {
            element.insertBefore(reusableChild[0], oldElement);
            patch(element, reusableChild[0], reusableChild[1], newChild);
          } else {
            patch(element, oldElement, null, newChild);
          }

          j++;
          newKeys[newKey] = newChild;
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i];
        var oldKey = getKeyFrom(oldChild);
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild);
        }
        i++;
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i];
        var reusableNode = reusableChild[1];
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode);
        }
      }
    } else if (node !== oldNode) {
      var i = element;
      parent.replaceChild((element = createElementFrom(node)), i);
    }

    return element
  }
};

var AppContainer = (props, children) => h('div', {class: 'app-container'}, children);

var Panel = (props, children) => h('div', {'class': 'panel'}, children);

var tags = function (tags) {
    return tags.replace(/\s/g, '').split(',').map(tagName => (props, children) => {
        return (typeof props === 'object' && !Array.isArray(props)) 
        ? h(tagName, props, children)
        : h(tagName, {}, props)
    })   
};

const [button] = tags('button');

const onActivate = action => ev => {
    ev.preventDefault(true);
    ev.currentTarget.classList.add('active');
    action();
};

var Button = ({cls, action}, children) => button({
    class: cls,
    ontouchstart: onActivate(action),
    onmousedown: onActivate(action)
}, children);

const [div, _svg, path, circle, line] = tags('div, svg, path, circle, line');

const svg = (props, children) => {
    props.width = '100%',
    props.height = '100%',
    props.xmlns = 'http://www.w3.org/2000/svg';
    return _svg(props, children)
};

const fSvg = children => svg({viewBox: '-50 -50 100 100'}, children);
const [fCircle, fLine, fPath] = (tags$$1 => tags$$1.map(tag => props => {
    props.fill = 'transparent';
    props['stroke-width'] = 5;
    props['stroke-linecap'] = 'round';
    return tag(props)
}))([circle, line, path]);

const icons = {
    
    chevron: svg({viewBox: '-10 -20 20 40'}, [
        path({
            d: 'M -7 -17 L 7 0 L -7 17',
            'stroke-linecap': 'butt',
            'stroke-width': '3'
        })
    ]),
    
    noFace: fSvg([ fCircle({cx: 0, cy: 0, r: 40}) ]),

    veryHappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fLine({x1: -18, y1: -10, x2: -8, y2: -18}),
        fLine({x1: 18, y1: -10, x2: 8, y2: -18}),
        fPath({d: 'M -15 15 C 0 20 0 20 15 15'}),
    ]),
    
    happyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fCircle({cx: -15, cy: -8, r: 2}),
        fCircle({cx: 15, cy: -8, r: 2}),
        fPath({d: 'M -15 15 C 0 20 0 20 15 15'}),
    ]),

    uncertainFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40 }),
        fCircle({cx: -15, cy: -8, r: 2 }),
        fCircle({cx: 15, cy: -8, r: 2}),
        fLine({x1: -8, y1: 15, x2: 8, y2: 15}),
    ]),

    unhappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fCircle({cx: -15, cy: -8, r: 2}),
        fCircle({cx: 15, cy: -8, r: 2}),
        fPath({d: 'M -15 15 C 0 10 0 10 15 15'}),
    ]),

    veryUnhappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fLine({x1: -15, y1: -7, x2: -8, y2: -15}),
        fLine({x1: -8, y1: -15, x2: -15,  y2: -18}),
        fLine({x1: 15, y1: -7, x2: 8, y2: -15}),
        fLine({x1: 8, y1: -15, x2: 15, y2: -18}),
        fPath({d: 'M -18 20 C -15 5 15 5 18 20'}),
    ])
};

var Icon = ({name, effect}) => div({class: `icon ${effect}`}, [icons[name]]);

var Chevron = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
});

var NavButton = ({goTo, target, direction, text, extra}) => {
    return Button(
        {
            cls: `nav-button ${direction}`,
            action: _ => goTo([target, direction]),
        },
        [
            Chevron({direction}),
            h('p', {class: 'button-text-extra'}, [extra]),
            h('p', {class: 'button-text-main'}, [text])
        ]
    )
};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {
!function(t){module.exports=t();}(function(){return function t(e,n,r){function o(i,s){if(!n[i]){if(!e[i]){var u="function"==typeof commonjsRequire&&commonjsRequire;if(!s&&u)return u(i,!0);if(a)return a(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};e[i][0].call(l.exports,function(t){var n=e[i][1][t];return o(n||t)},l,l.exports,t,e,n,r);}return n[i].exports}for(var a="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(t,e,n){function r(t){t.parentNode&&t.parentNode.removeChild(t);}function o(t,e){e.style.transition=`all ${t.easing} ${t.time}ms`;}function a(t){return e=>{var n="function"==typeof t?t():t;return Object.assign({},f,n)}}function i(t,e){return function(n){const r=a(n),o=(...t)=>e(r(),...t);return function(e){if(!e||!e.data)return;const n=e.data[t]||(t=>{});return e.data[t]=((...t)=>{n(...t),o(...t);}),e}}}function s(t){const e=+t.getAttribute("data-t-x"),n=+t.getAttribute("data-t-y"),{left:r,top:o}=t.getBoundingClientRect();return t.setAttribute("data-t-x",r),t.setAttribute("data-t-y",o),e?[e-r,n-o]:[null,null]}function u(...t){const e=[...t],n=e.length;var r=e[0];if(1===n)return r;var o;return o=n>2?u(...e.slice(1)):e[1],t=>r(o(t))}const f={name:"",time:0,delay:0,ready:0,easing:"",last:!0},l=i("onremove",(t,e)=>{const n=`${t.name}-leave`;e.style.transition="",e.style.transform="",e.classList.add(n);const a=getComputedStyle(e).getPropertyValue("transform"),[i,u,f,l,c,d]="none"===a?[1,0,0,1,0,0]:a.match(/^matrix\(([^\)]*)\)$/)[1].split(", ").map(t=>+t);e.classList.remove(n);const[m,p]=s(e);e.style.transform=`translate(${m}px, ${p}px)`,setTimeout(a=>{e.classList.add(n),e.style.transform=`matrix(${i}, ${u}, ${f}, ${l}, ${c+m}, ${d+p})`,o(t,e),t.last&&setTimeout(t=>r(e),t.time);},t.delay);}),c=i("oncreate",(t,e)=>setTimeout(t=>s(e),t.ready)),d=i("oncreate",(t,e)=>{const n=`${t.name}-enter`;e.classList.add(n),setTimeout(r=>{o(t,e),e.classList.remove(n);},t.delay);}),m=i("oncreate",(t,e)=>o(t,e)),p=i("onupdate",(t,e)=>{const[n,r]=s(e);e.style.transition="",e.style.transform=`translate(${n}px, ${r}px)`,setTimeout(n=>{o(t,e),e.style.transform="translate(0,0)",setTimeout(t=>{e.style.transform="",e.style.transition="";},t.time);});}),y=i("oncreate",(t,e)=>setTimeout(t=>s(e),t.ready));e.exports={change:m,enter:d,leave:t=>u(c(t),l(t)),move:t=>u(y(t),p(t)),group:function(t){return e=>(e.children.forEach(t),e)},combine:u};},{}]},{},[1])(1)});
});

const {combine, enter, leave} = dist;
const cache = {direction: null};

const pageSlideOpts = _ => {
    return {
        name: 'slide-' + cache.direction,
        easing: 'ease-in-out',
        time: 400,
        ready: 420,
    }
};

const pageSlide = combine(
    enter(pageSlideOpts),
    leave(pageSlideOpts)
);

var Page = ({name, direction, next}, children) => {
    cache.direction = direction;
    return pageSlide(h('div', {class: 'page', key: name }, [].concat(children, NavButton(next))))
};

var initial = (state, actions) => Page(
    {
        name: 'initial',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'start',
            direction: 'forward',
            extra: 'Tap here to...',
            text: 'Start',
        }
    },
    [
        Panel({}, ['Happiness Index Calculator'])
    ]
);

var start = (state, actions) => Page(
    {
        name: 'start',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'vote',
            direction: 'forward',
            extra: "When you're ready, tap here to...",
            text: "Vote"
        }
    },
    [
        Panel({}, ['Please hand the phone to the first person to vote.'])
    ]
);

const [ul, li, p] = tags('ul, li, p');
const options = [
    {
        value: 0,
        icon: 'noFace',
        label: 'No Vote',
        extra: 'I don\'t want to participate.'
    },
    {
        value: 5,
        icon: 'veryHappyFace',
        label: 'Very Happy',
        extra: 'It should always be this way!'
    },
    {
        value: 4,
        icon: 'happyFace',
        label: 'Happy',
        extra: 'It can always get better!'
    },
    {
        value: 3,
        icon: 'uncertainFace',
        label: 'Don\'t know',
        extra: 'Meh... / Mixed feelings'
    },
    {
        value: 2,
        icon: 'unhappyFace',
        label: 'Unhappy',
        extra: 'A lot needs to change!'
    },
    {
        value: 1,
        icon: 'veryUnhappyFace',
        label: 'Very Unhappy',
        extra: 'Why even bother...'
    }
];





var Voter = ({value:current, set}) => ul(
    {class: 'option-selector'},
    options.map(({value, icon, label, extra}) => li(
        {
            onmousedown: _ => set(value),
            ontouchstart: _ => set(value),
            class: (value === current ? 'active' : ''),
        },
        [
            Icon({name: icon}),
            p({class: 'label'}, [label]),
            p({class: 'extra'}, [extra]),
        ]
    ))
);

var vote = (state, actions) => Page({
        name: 'vote',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'pass',
            direction: 'forward',
            extra: "Make your selection, then tap here to...",
            text: "Cast Vote",
        }
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter({
            value: state.votes.current,
            set: actions.votes.set
        })
    ]
);

var pass = (state, actions) => Page(
    {
        name: 'pass',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'vote',
            direction: 'back',
            extra: "Are you the next person? Tap here to...",
            text: "Vote",
        }
    },
    [
        NavButton({
            goTo: actions.goTo,
            target: 'result',
            direction: 'forward',
            extra: 'Has everyone voted? Tap here to...',
            text: 'Check Result'
        }),
        Panel({}, ['Thank you! Now, please hand the phone to the next person.'])
    ]
);

const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
};

var Result = (data) => h('p', {class: 'result-display'}, [avg(data)]);

var result = (state, actions) => Page(
    {
        name: 'result',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
        }
    },
    [
        Panel({}, [
            'Happiness Index',
            Result(state.votes)
        ])
    ]
);

var reset = (state, actions) => Page(
    {
        name: 'reset',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'start',
            direction: 'back',
            extra: 'Tap here to...',
            text: 'Start again',
        }
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result(state.votes)
        ])
    ]
);

var pages = {initial, start, vote, pass, result, reset};

__$styleInject(".slide-forward-leave,\n.slide-back-enter {\n  transform: translateX(-110%);\n}\n.slide-back-leave,\n.slide-forward-enter {\n  transform: translateX(110%);\n}\n.slide-forward-run,\n.slide-back-run {\n  transition: transform 0.35s ease-in-out;\n}\n*,\nul,\nli,\nbutton,\ninput,\nbody {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 17px;\n}\n@media (min-height: 500px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 20px;\n  }\n}\n@media (min-height: 600px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 25px;\n  }\n}\n@media (min-height: 800px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 30px;\n  }\n}\n@media (min-height: 1000px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 35px;\n  }\n}\n/*\n448px: 17px\n20px : 568\n667:  25px\n\n1024: \n*/\nhtml,\nbody,\n#app {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background: #aaa;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n}\n.page .panel {\n  flex: 1 0 auto;\n  margin: 0.5em;\n  background: #eee;\n  border: 1px #bbbbbb solid;\n  padding: 0.5em;\n  color: #555;\n  text-shadow: 0px 1px 1px #ffffff;\n}\n.page button.nav-button {\n  flex: 0 0 auto;\n  position: relative;\n  height: 15%;\n  color: #fff;\n  background-color: #d6975c;\n  text-shadow: 0 0 1px #29190a;\n}\n.page button.nav-button.active {\n  background-color: #a36429;\n  text-shadow: #140c05;\n}\n.page button.nav-button .button-text-extra {\n  font-size: 0.6em;\n}\n.page button.nav-button .button-text-main {\n  text-transform: uppercase;\n  font-size: 1.2em;\n}\n.page button.nav-button.forward .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  right: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.forward .icon svg path,\n.page button.nav-button.forward .icon svg line,\n.page button.nav-button.forward .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.forward .icon.hflip svg {\n  transform: scale(-1, 1);\n}\n.page button.nav-button.back .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  left: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.back .icon svg path,\n.page button.nav-button.back .icon svg line,\n.page button.nav-button.back .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.back .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector {\n  list-style-type: none;\n  text-indent: none;\n  display: flex;\n  flex-direction: column;\n  margin: 0.5em;\n  margin-top: 0;\n}\nul.option-selector li {\n  flex: 1 1 auto;\n  padding: 0.5em;\n  padding-left: 3em;\n  position: relative;\n  color: #fff;\n  background: #3cb8ea;\n  text-shadow: 0 0 1px #093c51;\n  border-bottom: 1px #81d1f1 solid;\n}\nul.option-selector li.active {\n  color: #ffffff;\n  background: #1381ad;\n  text-shadow: 0 0 1px #041a23;\n}\nul.option-selector li .icon {\n  filter: drop-shadow(0 0 1px #093c51);\n  position: absolute;\n  left: 0.5em;\n  top: 0.5em;\n  bottom: 0.5em;\n  width: 2em;\n}\nul.option-selector li .icon svg path,\nul.option-selector li .icon svg line,\nul.option-selector li .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\nul.option-selector li .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector li .label {\n  font-size: 0.9em;\n}\nul.option-selector li .extra {\n  font-size: 0.65em;\n  font-style: italic;\n}\nul.option-selector li .extra:before {\n  content: '\"';\n}\nul.option-selector li .extra:after {\n  content: '\"';\n}\n.result-display {\n  color: #555;\n  font-size: 2.5em;\n  display: block;\n  width: 4em;\n  height: 4em;\n  border-radius: 2em;\n  border: 3px #555 solid;\n  background: #fff;\n  text-align: center;\n  line-height: 3.8em;\n  box-sizing: border-box;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 1em;\n}\n");

app({
    state: {
        votes: {
            current: 0,
            sum: 0,
            count: 0,
        },
        page: {
            current: 'initial',
            direction: null,
        }
    },
    actions: {
        goTo (state, actions, [current, direction], emit) {
            emit('goTo:' + current);
            state.page = {current, direction};
            return state
        },
        votes: {
            set (state, actions, vote) {
                state.votes.current = vote;
                return state
            },
            commit (state) {
                if (state.votes.current === 0) return state
                state.votes.sum = state.votes.sum + state.votes.current;
                state.votes.count = state.votes.count + 1;
                state.votes.current = 0;
                return state
            },
            reset (state) {
                state.votes.sum = 0;
                state.votes.count = 0;
                state.votes.current = 0;
                return state
            }
        }
    },
    events: {
        'goTo:reset': (state, actions) => setTimeout(actions.votes.reset,0),
        'goTo:pass': (state, actions) => setTimeout(actions.votes.commit, 0)
    },
    view: (state, actions) => AppContainer({}, [pages[state.page.current](state, actions)])
});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9oeXBlcmFwcC9zcmMvaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9oeXBlcmFwcC9zcmMvYXBwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYXBwLWNvbnRhaW5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3BhbmVsLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdGFncy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2ljb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9jaGV2cm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbmF2YnV0dG9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2h5cGVyYXBwLXRyYW5zaXRpb25zL2Rpc3QvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9wYWdlLmpzIiwiLi4vc3JjL3BhZ2VzL2luaXRpYWwuanMiLCIuLi9zcmMvcGFnZXMvc3RhcnQuanMiLCIuLi9zcmMvY29tcG9uZW50cy92b3Rlci5qcyIsIi4uL3NyYy9wYWdlcy92b3RlLmpzIiwiLi4vc3JjL3BhZ2VzL3Bhc3MuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZXN1bHQuanMiLCIuLi9zcmMvcGFnZXMvcmVzdWx0LmpzIiwiLi4vc3JjL3BhZ2VzL3Jlc2V0LmpzIiwiLi4vc3JjL3BhZ2VzL2luZGV4LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhZywgZGF0YSkge1xuICB2YXIgbm9kZVxuICB2YXIgc3RhY2sgPSBbXVxuICB2YXIgY2hpbGRyZW4gPSBbXVxuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoOyBpLS0gPiAyOyApIHtcbiAgICBzdGFja1tzdGFjay5sZW5ndGhdID0gYXJndW1lbnRzW2ldXG4gIH1cblxuICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoKG5vZGUgPSBzdGFjay5wb3AoKSkpKSB7XG4gICAgICBmb3IgKHZhciBpID0gbm9kZS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aF0gPSBub2RlW2ldXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlICE9IG51bGwgJiYgbm9kZSAhPT0gdHJ1ZSAmJiBub2RlICE9PSBmYWxzZSkge1xuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlICsgXCJcIlxuICAgICAgfVxuICAgICAgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoXSA9IG5vZGVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIlxuICAgID8ge1xuICAgICAgICB0YWc6IHRhZyxcbiAgICAgICAgZGF0YTogZGF0YSB8fCB7fSxcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICB9XG4gICAgOiB0YWcoZGF0YSwgY2hpbGRyZW4pXG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcHApIHtcbiAgdmFyIHN0YXRlID0ge31cbiAgdmFyIHZpZXcgPSBhcHAudmlld1xuICB2YXIgYWN0aW9ucyA9IHt9XG4gIHZhciBldmVudHMgPSB7fVxuICB2YXIgbm9kZVxuICB2YXIgZWxlbWVudFxuXG4gIGZvciAodmFyIGkgPSAtMSwgbWl4aW5zID0gYXBwLm1peGlucyB8fCBbXTsgaSA8IG1peGlucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBtaXhpbiA9IG1peGluc1tpXSA/IG1peGluc1tpXShhcHApIDogYXBwXG5cbiAgICBpZiAobWl4aW4ubWl4aW5zICE9IG51bGwgJiYgbWl4aW4gIT09IGFwcCkge1xuICAgICAgbWl4aW5zID0gbWl4aW5zLmNvbmNhdChtaXhpbi5taXhpbnMpXG4gICAgfVxuXG4gICAgaWYgKG1peGluLnN0YXRlICE9IG51bGwpIHtcbiAgICAgIHN0YXRlID0gbWVyZ2Uoc3RhdGUsIG1peGluLnN0YXRlKVxuICAgIH1cblxuICAgIGluaXQoYWN0aW9ucywgbWl4aW4uYWN0aW9ucylcblxuICAgIE9iamVjdC5rZXlzKG1peGluLmV2ZW50cyB8fCBbXSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgZXZlbnRzW2tleV0gPSAoZXZlbnRzW2tleV0gfHwgW10pLmNvbmNhdChtaXhpbi5ldmVudHNba2V5XSlcbiAgICB9KVxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGVbMF0gIT09IFwibFwiKSB7XG4gICAgbG9hZCgpXG4gIH0gZWxzZSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbG9hZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQobmFtZXNwYWNlLCBjaGlsZHJlbiwgbGFzdE5hbWUpIHtcbiAgICBPYmplY3Qua2V5cyhjaGlsZHJlbiB8fCBbXSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGFjdGlvbiA9IGNoaWxkcmVuW2tleV1cbiAgICAgIHZhciBuYW1lID0gbGFzdE5hbWUgPyBsYXN0TmFtZSArIFwiLlwiICsga2V5IDoga2V5XG5cbiAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbmFtZXNwYWNlW2tleV0gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbihcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgICAgIGVtaXQoXCJhY3Rpb25cIiwge1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KS5kYXRhLFxuICAgICAgICAgICAgZW1pdFxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlbmRlcigoc3RhdGUgPSBtZXJnZShzdGF0ZSwgZW1pdChcInVwZGF0ZVwiLCByZXN1bHQpKSksIHZpZXcpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXQobmFtZXNwYWNlW2tleV0gfHwgKG5hbWVzcGFjZVtrZXldID0ge30pLCBhY3Rpb24sIG5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgcmVuZGVyKHN0YXRlLCB2aWV3KVxuICAgIGVtaXQoXCJsb2FkZWRcIilcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQobmFtZSwgZGF0YSkge1xuICAgIDsoZXZlbnRzW25hbWVdIHx8IFtdKS5tYXAoZnVuY3Rpb24oY2IpIHtcbiAgICAgIHZhciByZXN1bHQgPSBjYihzdGF0ZSwgYWN0aW9ucywgZGF0YSwgZW1pdClcbiAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICBkYXRhID0gcmVzdWx0XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIoc3RhdGUsIHZpZXcpIHtcbiAgICBlbGVtZW50ID0gcGF0Y2goXG4gICAgICBhcHAucm9vdCB8fCAoYXBwLnJvb3QgPSBkb2N1bWVudC5ib2R5KSxcbiAgICAgIGVsZW1lbnQsXG4gICAgICBub2RlLFxuICAgICAgKG5vZGUgPSBlbWl0KFwicmVuZGVyXCIsIHZpZXcpKHN0YXRlLCBhY3Rpb25zKSlcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gICAgdmFyIG9iaiA9IHt9XG5cbiAgICBpZiAodHlwZW9mIGIgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShiKSkge1xuICAgICAgcmV0dXJuIGJcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIGEpIHtcbiAgICAgIG9ialtpXSA9IGFbaV1cbiAgICB9XG4gICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICBvYmpbaV0gPSBiW2ldXG4gICAgfVxuXG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEZyb20obm9kZSwgaXNTVkcpIHtcbiAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSAoaXNTVkcgPSBpc1NWRyB8fCBub2RlLnRhZyA9PT0gXCJzdmdcIilcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBub2RlLnRhZylcbiAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUudGFnKVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyApIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50RnJvbShub2RlLmNoaWxkcmVuW2krK10sIGlzU1ZHKSlcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSBpbiBub2RlLmRhdGEpIHtcbiAgICAgICAgaWYgKGkgPT09IFwib25jcmVhdGVcIikge1xuICAgICAgICAgIG5vZGUuZGF0YVtpXShlbGVtZW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEVsZW1lbnREYXRhKGVsZW1lbnQsIGksIG5vZGUuZGF0YVtpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFbGVtZW50RGF0YShlbGVtZW50LCBuYW1lLCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICBpZiAobmFtZSA9PT0gXCJrZXlcIikge1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBmb3IgKHZhciBpIGluIG1lcmdlKG9sZFZhbHVlLCAodmFsdWUgPSB2YWx1ZSB8fCB7fSkpKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVbaV0gPSB2YWx1ZVtpXSB8fCBcIlwiXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsZW1lbnRbbmFtZV0gPSB2YWx1ZVxuICAgICAgfSBjYXRjaCAoXykge31cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVFbGVtZW50RGF0YShlbGVtZW50LCBvbGREYXRhLCBkYXRhKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBtZXJnZShvbGREYXRhLCBkYXRhKSkge1xuICAgICAgdmFyIHZhbHVlID0gZGF0YVtuYW1lXVxuICAgICAgdmFyIG9sZFZhbHVlID0gbmFtZSA9PT0gXCJ2YWx1ZVwiIHx8IG5hbWUgPT09IFwiY2hlY2tlZFwiXG4gICAgICAgID8gZWxlbWVudFtuYW1lXVxuICAgICAgICA6IG9sZERhdGFbbmFtZV1cblxuICAgICAgaWYgKG5hbWUgPT09IFwib251cGRhdGVcIiAmJiB2YWx1ZSkge1xuICAgICAgICB2YWx1ZShlbGVtZW50KVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgc2V0RWxlbWVudERhdGEoZWxlbWVudCwgbmFtZSwgdmFsdWUsIG9sZFZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleUZyb20obm9kZSkge1xuICAgIGlmIChub2RlICYmIChub2RlID0gbm9kZS5kYXRhKSkge1xuICAgICAgcmV0dXJuIG5vZGUua2V5XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChwYXJlbnQsIGVsZW1lbnQsIG5vZGUpIHtcbiAgICA7KChub2RlLmRhdGEgJiYgbm9kZS5kYXRhLm9ucmVtb3ZlKSB8fCByZW1vdmVDaGlsZCkoZWxlbWVudCwgcmVtb3ZlQ2hpbGQpXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGQoKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXRjaChwYXJlbnQsIGVsZW1lbnQsIG9sZE5vZGUsIG5vZGUpIHtcbiAgICBpZiAob2xkTm9kZSA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVFbGVtZW50RnJvbShub2RlKSwgZWxlbWVudClcbiAgICB9IGVsc2UgaWYgKG5vZGUudGFnICYmIG5vZGUudGFnID09PSBvbGROb2RlLnRhZykge1xuICAgICAgdXBkYXRlRWxlbWVudERhdGEoZWxlbWVudCwgb2xkTm9kZS5kYXRhLCBub2RlLmRhdGEpXG5cbiAgICAgIHZhciBsZW4gPSBub2RlLmNoaWxkcmVuLmxlbmd0aFxuICAgICAgdmFyIG9sZExlbiA9IG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoXG4gICAgICB2YXIgcmV1c2FibGVDaGlsZHJlbiA9IHt9XG4gICAgICB2YXIgb2xkRWxlbWVudHMgPSBbXVxuICAgICAgdmFyIG5ld0tleXMgPSB7fVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZExlbjsgaSsrKSB7XG4gICAgICAgIHZhciBvbGRFbGVtZW50ID0gZWxlbWVudC5jaGlsZE5vZGVzW2ldXG4gICAgICAgIG9sZEVsZW1lbnRzW2ldID0gb2xkRWxlbWVudFxuXG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgdmFyIG9sZEtleSA9IGdldEtleUZyb20ob2xkQ2hpbGQpXG5cbiAgICAgICAgaWYgKG51bGwgIT0gb2xkS2V5KSB7XG4gICAgICAgICAgcmV1c2FibGVDaGlsZHJlbltvbGRLZXldID0gW29sZEVsZW1lbnQsIG9sZENoaWxkXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpID0gMFxuICAgICAgdmFyIGogPSAwXG5cbiAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgIHZhciBvbGRFbGVtZW50ID0gb2xkRWxlbWVudHNbaV1cbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkTm9kZS5jaGlsZHJlbltpXVxuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBub2RlLmNoaWxkcmVuW2pdXG5cbiAgICAgICAgdmFyIG9sZEtleSA9IGdldEtleUZyb20ob2xkQ2hpbGQpXG4gICAgICAgIGlmIChuZXdLZXlzW29sZEtleV0pIHtcbiAgICAgICAgICBpKytcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0tleSA9IGdldEtleUZyb20obmV3Q2hpbGQpXG5cbiAgICAgICAgdmFyIHJldXNhYmxlQ2hpbGQgPSByZXVzYWJsZUNoaWxkcmVuW25ld0tleV0gfHwgW11cblxuICAgICAgICBpZiAobnVsbCA9PSBuZXdLZXkpIHtcbiAgICAgICAgICBpZiAobnVsbCA9PSBvbGRLZXkpIHtcbiAgICAgICAgICAgIHBhdGNoKGVsZW1lbnQsIG9sZEVsZW1lbnQsIG9sZENoaWxkLCBuZXdDaGlsZClcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKytcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAob2xkS2V5ID09PSBuZXdLZXkpIHtcbiAgICAgICAgICAgIHBhdGNoKGVsZW1lbnQsIHJldXNhYmxlQ2hpbGRbMF0sIHJldXNhYmxlQ2hpbGRbMV0sIG5ld0NoaWxkKVxuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXVzYWJsZUNoaWxkWzBdKSB7XG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShyZXVzYWJsZUNoaWxkWzBdLCBvbGRFbGVtZW50KVxuICAgICAgICAgICAgcGF0Y2goZWxlbWVudCwgcmV1c2FibGVDaGlsZFswXSwgcmV1c2FibGVDaGlsZFsxXSwgbmV3Q2hpbGQpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoKGVsZW1lbnQsIG9sZEVsZW1lbnQsIG51bGwsIG5ld0NoaWxkKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGorK1xuICAgICAgICAgIG5ld0tleXNbbmV3S2V5XSA9IG5ld0NoaWxkXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGkgPCBvbGRMZW4pIHtcbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkTm9kZS5jaGlsZHJlbltpXVxuICAgICAgICB2YXIgb2xkS2V5ID0gZ2V0S2V5RnJvbShvbGRDaGlsZClcbiAgICAgICAgaWYgKG51bGwgPT0gb2xkS2V5KSB7XG4gICAgICAgICAgcmVtb3ZlRWxlbWVudChlbGVtZW50LCBvbGRFbGVtZW50c1tpXSwgb2xkQ2hpbGQpXG4gICAgICAgIH1cbiAgICAgICAgaSsrXG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgaW4gcmV1c2FibGVDaGlsZHJlbikge1xuICAgICAgICB2YXIgcmV1c2FibGVDaGlsZCA9IHJldXNhYmxlQ2hpbGRyZW5baV1cbiAgICAgICAgdmFyIHJldXNhYmxlTm9kZSA9IHJldXNhYmxlQ2hpbGRbMV1cbiAgICAgICAgaWYgKCFuZXdLZXlzW3JldXNhYmxlTm9kZS5kYXRhLmtleV0pIHtcbiAgICAgICAgICByZW1vdmVFbGVtZW50KGVsZW1lbnQsIHJldXNhYmxlQ2hpbGRbMF0sIHJldXNhYmxlTm9kZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZSAhPT0gb2xkTm9kZSkge1xuICAgICAgdmFyIGkgPSBlbGVtZW50XG4gICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKChlbGVtZW50ID0gY3JlYXRlRWxlbWVudEZyb20obm9kZSkpLCBpKVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cbn1cbiIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5leHBvcnQgZGVmYXVsdCAocHJvcHMsIGNoaWxkcmVuKSA9PiBoKCdkaXYnLCB7Y2xhc3M6ICdhcHAtY29udGFpbmVyJ30sIGNoaWxkcmVuKSIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5leHBvcnQgZGVmYXVsdCAocHJvcHMsIGNoaWxkcmVuKSA9PiBoKCdkaXYnLCB7J2NsYXNzJzogJ3BhbmVsJ30sIGNoaWxkcmVuKVxuIiwiaW1wb3J0IHtofSBmcm9tICdoeXBlcmFwcCdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0YWdzKSB7XG4gICAgcmV0dXJuIHRhZ3MucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpLm1hcCh0YWdOYW1lID0+IChwcm9wcywgY2hpbGRyZW4pID0+IHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgcHJvcHMgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHByb3BzKSkgXG4gICAgICAgID8gaCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG4gICAgICAgIDogaCh0YWdOYW1lLCB7fSwgcHJvcHMpXG4gICAgfSkgICBcbn0iLCJpbXBvcnQgdGFncyBmcm9tICcuL3RhZ3MnXG5jb25zdCBbYnV0dG9uXSA9IHRhZ3MoJ2J1dHRvbicpXG5cbmNvbnN0IG9uQWN0aXZhdGUgPSBhY3Rpb24gPT4gZXYgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KHRydWUpXG4gICAgZXYuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIGFjdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7Y2xzLCBhY3Rpb259LCBjaGlsZHJlbikgPT4gYnV0dG9uKHtcbiAgICBjbGFzczogY2xzLFxuICAgIG9udG91Y2hzdGFydDogb25BY3RpdmF0ZShhY3Rpb24pLFxuICAgIG9ubW91c2Vkb3duOiBvbkFjdGl2YXRlKGFjdGlvbilcbn0sIGNoaWxkcmVuKVxuXG4iLCJpbXBvcnQgdGFncyBmcm9tICcuL3RhZ3MnXG5jb25zdCBbZGl2LCBfc3ZnLCBwYXRoLCBjaXJjbGUsIGxpbmVdID0gdGFncygnZGl2LCBzdmcsIHBhdGgsIGNpcmNsZSwgbGluZScpXG5cbmNvbnN0IHN2ZyA9IChwcm9wcywgY2hpbGRyZW4pID0+IHtcbiAgICBwcm9wcy53aWR0aCA9ICcxMDAlJyxcbiAgICBwcm9wcy5oZWlnaHQgPSAnMTAwJScsXG4gICAgcHJvcHMueG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgcmV0dXJuIF9zdmcocHJvcHMsIGNoaWxkcmVuKVxufVxuXG5jb25zdCBmU3ZnID0gY2hpbGRyZW4gPT4gc3ZnKHt2aWV3Qm94OiAnLTUwIC01MCAxMDAgMTAwJ30sIGNoaWxkcmVuKVxuY29uc3QgW2ZDaXJjbGUsIGZMaW5lLCBmUGF0aF0gPSAodGFncyA9PiB0YWdzLm1hcCh0YWcgPT4gcHJvcHMgPT4ge1xuICAgIHByb3BzLmZpbGwgPSAndHJhbnNwYXJlbnQnXG4gICAgcHJvcHNbJ3N0cm9rZS13aWR0aCddID0gNVxuICAgIHByb3BzWydzdHJva2UtbGluZWNhcCddID0gJ3JvdW5kJ1xuICAgIHJldHVybiB0YWcocHJvcHMpXG59KSkoW2NpcmNsZSwgbGluZSwgcGF0aF0pXG5cbmNvbnN0IGljb25zID0ge1xuICAgIFxuICAgIGNoZXZyb246IHN2Zyh7dmlld0JveDogJy0xMCAtMjAgMjAgNDAnfSwgW1xuICAgICAgICBwYXRoKHtcbiAgICAgICAgICAgIGQ6ICdNIC03IC0xNyBMIDcgMCBMIC03IDE3JyxcbiAgICAgICAgICAgICdzdHJva2UtbGluZWNhcCc6ICdidXR0JyxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAnMydcbiAgICAgICAgfSlcbiAgICBdKSxcbiAgICBcbiAgICBub0ZhY2U6IGZTdmcoWyBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwfSkgXSksXG5cbiAgICB2ZXJ5SGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmTGluZSh7eDE6IC0xOCwgeTE6IC0xMCwgeDI6IC04LCB5MjogLTE4fSksXG4gICAgICAgIGZMaW5lKHt4MTogMTgsIHkxOiAtMTAsIHgyOiA4LCB5MjogLTE4fSksXG4gICAgICAgIGZQYXRoKHtkOiAnTSAtMTUgMTUgQyAwIDIwIDAgMjAgMTUgMTUnfSksXG4gICAgXSksXG4gICAgXG4gICAgaGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogLTE1LCBjeTogLTgsIHI6IDJ9KSxcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDE1LCBjeTogLTgsIHI6IDJ9KSxcbiAgICAgICAgZlBhdGgoe2Q6ICdNIC0xNSAxNSBDIDAgMjAgMCAyMCAxNSAxNSd9KSxcbiAgICBdKSxcblxuICAgIHVuY2VydGFpbkZhY2U6IGZTdmcoW1xuICAgICAgICBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwIH0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogLTE1LCBjeTogLTgsIHI6IDIgfSksXG4gICAgICAgIGZDaXJjbGUoe2N4OiAxNSwgY3k6IC04LCByOiAyfSksXG4gICAgICAgIGZMaW5lKHt4MTogLTgsIHkxOiAxNSwgeDI6IDgsIHkyOiAxNX0pLFxuICAgIF0pLFxuXG4gICAgdW5oYXBweUZhY2U6IGZTdmcoW1xuICAgICAgICBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwfSksXG4gICAgICAgIGZDaXJjbGUoe2N4OiAtMTUsIGN5OiAtOCwgcjogMn0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogMTUsIGN5OiAtOCwgcjogMn0pLFxuICAgICAgICBmUGF0aCh7ZDogJ00gLTE1IDE1IEMgMCAxMCAwIDEwIDE1IDE1J30pLFxuICAgIF0pLFxuXG4gICAgdmVyeVVuaGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmTGluZSh7eDE6IC0xNSwgeTE6IC03LCB4MjogLTgsIHkyOiAtMTV9KSxcbiAgICAgICAgZkxpbmUoe3gxOiAtOCwgeTE6IC0xNSwgeDI6IC0xNSwgIHkyOiAtMTh9KSxcbiAgICAgICAgZkxpbmUoe3gxOiAxNSwgeTE6IC03LCB4MjogOCwgeTI6IC0xNX0pLFxuICAgICAgICBmTGluZSh7eDE6IDgsIHkxOiAtMTUsIHgyOiAxNSwgeTI6IC0xOH0pLFxuICAgICAgICBmUGF0aCh7ZDogJ00gLTE4IDIwIEMgLTE1IDUgMTUgNSAxOCAyMCd9KSxcbiAgICBdKVxufVxuXG5leHBvcnQgZGVmYXVsdCAoe25hbWUsIGVmZmVjdH0pID0+IGRpdih7Y2xhc3M6IGBpY29uICR7ZWZmZWN0fWB9LCBbaWNvbnNbbmFtZV1dKSIsImltcG9ydCBJY29uIGZyb20gJy4vaWNvbidcbmV4cG9ydCBkZWZhdWx0ICh7ZGlyZWN0aW9ufSkgPT4gSWNvbih7XG4gICAgbmFtZTogJ2NoZXZyb24nLFxuICAgIGVmZmVjdDogKChkaXJlY3Rpb24gPT09ICdiYWNrJykgPyAnaGZsaXAnIDogJycpXG59KSIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJ1xuaW1wb3J0IENoZXZyb24gZnJvbSAnLi9jaGV2cm9uJ1xuXG5leHBvcnQgZGVmYXVsdCAoe2dvVG8sIHRhcmdldCwgZGlyZWN0aW9uLCB0ZXh0LCBleHRyYX0pID0+IHtcbiAgICByZXR1cm4gQnV0dG9uKFxuICAgICAgICB7XG4gICAgICAgICAgICBjbHM6IGBuYXYtYnV0dG9uICR7ZGlyZWN0aW9ufWAsXG4gICAgICAgICAgICBhY3Rpb246IF8gPT4gZ29UbyhbdGFyZ2V0LCBkaXJlY3Rpb25dKSxcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgICAgQ2hldnJvbih7ZGlyZWN0aW9ufSksXG4gICAgICAgICAgICBoKCdwJywge2NsYXNzOiAnYnV0dG9uLXRleHQtZXh0cmEnfSwgW2V4dHJhXSksXG4gICAgICAgICAgICBoKCdwJywge2NsYXNzOiAnYnV0dG9uLXRleHQtbWFpbid9LCBbdGV4dF0pXG4gICAgICAgIF1cbiAgICApXG59IiwiIWZ1bmN0aW9uKHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXsoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzKS50cmFuc2l0aW9ucz10KCl9fShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiB0KGUsbixyKXtmdW5jdGlvbiBvKGkscyl7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFzJiZ1KXJldHVybiB1KGksITApO2lmKGEpcmV0dXJuIGEoaSwhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKHQpe3ZhciBuPWVbaV1bMV1bdF07cmV0dXJuIG8obnx8dCl9LGwsbC5leHBvcnRzLHQsZSxuLHIpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8ci5sZW5ndGg7aSsrKW8ocltpXSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbih0LGUsbil7ZnVuY3Rpb24gcih0KXt0LnBhcmVudE5vZGUmJnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KX1mdW5jdGlvbiBvKHQsZSl7ZS5zdHlsZS50cmFuc2l0aW9uPWBhbGwgJHt0LmVhc2luZ30gJHt0LnRpbWV9bXNgfWZ1bmN0aW9uIGEodCl7cmV0dXJuIGU9Pnt2YXIgbj1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3QoKTp0O3JldHVybiBPYmplY3QuYXNzaWduKHt9LGYsbil9fWZ1bmN0aW9uIGkodCxlKXtyZXR1cm4gZnVuY3Rpb24obil7Y29uc3Qgcj1hKG4pLG89KC4uLnQpPT5lKHIoKSwuLi50KTtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoIWV8fCFlLmRhdGEpcmV0dXJuO2NvbnN0IG49ZS5kYXRhW3RdfHwodD0+e30pO3JldHVybiBlLmRhdGFbdF09KCguLi50KT0+e24oLi4udCksbyguLi50KX0pLGV9fX1mdW5jdGlvbiBzKHQpe2NvbnN0IGU9K3QuZ2V0QXR0cmlidXRlKFwiZGF0YS10LXhcIiksbj0rdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXQteVwiKSx7bGVmdDpyLHRvcDpvfT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVybiB0LnNldEF0dHJpYnV0ZShcImRhdGEtdC14XCIsciksdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXQteVwiLG8pLGU/W2UtcixuLW9dOltudWxsLG51bGxdfWZ1bmN0aW9uIHUoLi4udCl7Y29uc3QgZT1bLi4udF0sbj1lLmxlbmd0aDt2YXIgcj1lWzBdO2lmKDE9PT1uKXJldHVybiByO3ZhciBvO3JldHVybiBvPW4+Mj91KC4uLmUuc2xpY2UoMSkpOmVbMV0sdD0+cihvKHQpKX1jb25zdCBmPXtuYW1lOlwiXCIsdGltZTowLGRlbGF5OjAscmVhZHk6MCxlYXNpbmc6XCJcIixsYXN0OiEwfSxsPWkoXCJvbnJlbW92ZVwiLCh0LGUpPT57Y29uc3Qgbj1gJHt0Lm5hbWV9LWxlYXZlYDtlLnN0eWxlLnRyYW5zaXRpb249XCJcIixlLnN0eWxlLnRyYW5zZm9ybT1cIlwiLGUuY2xhc3NMaXN0LmFkZChuKTtjb25zdCBhPWdldENvbXB1dGVkU3R5bGUoZSkuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKSxbaSx1LGYsbCxjLGRdPVwibm9uZVwiPT09YT9bMSwwLDAsMSwwLDBdOmEubWF0Y2goL15tYXRyaXhcXCgoW15cXCldKilcXCkkLylbMV0uc3BsaXQoXCIsIFwiKS5tYXAodD0+K3QpO2UuY2xhc3NMaXN0LnJlbW92ZShuKTtjb25zdFttLHBdPXMoZSk7ZS5zdHlsZS50cmFuc2Zvcm09YHRyYW5zbGF0ZSgke219cHgsICR7cH1weClgLHNldFRpbWVvdXQoYT0+e2UuY2xhc3NMaXN0LmFkZChuKSxlLnN0eWxlLnRyYW5zZm9ybT1gbWF0cml4KCR7aX0sICR7dX0sICR7Zn0sICR7bH0sICR7YyttfSwgJHtkK3B9KWAsbyh0LGUpLHQubGFzdCYmc2V0VGltZW91dCh0PT5yKGUpLHQudGltZSl9LHQuZGVsYXkpfSksYz1pKFwib25jcmVhdGVcIiwodCxlKT0+c2V0VGltZW91dCh0PT5zKGUpLHQucmVhZHkpKSxkPWkoXCJvbmNyZWF0ZVwiLCh0LGUpPT57Y29uc3Qgbj1gJHt0Lm5hbWV9LWVudGVyYDtlLmNsYXNzTGlzdC5hZGQobiksc2V0VGltZW91dChyPT57byh0LGUpLGUuY2xhc3NMaXN0LnJlbW92ZShuKX0sdC5kZWxheSl9KSxtPWkoXCJvbmNyZWF0ZVwiLCh0LGUpPT5vKHQsZSkpLHA9aShcIm9udXBkYXRlXCIsKHQsZSk9Pntjb25zdFtuLHJdPXMoZSk7ZS5zdHlsZS50cmFuc2l0aW9uPVwiXCIsZS5zdHlsZS50cmFuc2Zvcm09YHRyYW5zbGF0ZSgke259cHgsICR7cn1weClgLHNldFRpbWVvdXQobj0+e28odCxlKSxlLnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIsc2V0VGltZW91dCh0PT57ZS5zdHlsZS50cmFuc2Zvcm09XCJcIixlLnN0eWxlLnRyYW5zaXRpb249XCJcIn0sdC50aW1lKX0pfSkseT1pKFwib25jcmVhdGVcIiwodCxlKT0+c2V0VGltZW91dCh0PT5zKGUpLHQucmVhZHkpKTtlLmV4cG9ydHM9e2NoYW5nZTptLGVudGVyOmQsbGVhdmU6dD0+dShjKHQpLGwodCkpLG1vdmU6dD0+dSh5KHQpLHAodCkpLGdyb3VwOmZ1bmN0aW9uKHQpe3JldHVybiBlPT4oZS5jaGlsZHJlbi5mb3JFYWNoKHQpLGUpfSxjb21iaW5lOnV9fSx7fV19LHt9LFsxXSkoMSl9KTtcbiIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5pbXBvcnQgTmF2QnV0dG9uIGZyb20gJy4vbmF2YnV0dG9uJ1xuaW1wb3J0IHRyYW5zaXRpb25zIGZyb20gJ2h5cGVyYXBwLXRyYW5zaXRpb25zJ1xuXG5jb25zdCB7Y29tYmluZSwgZW50ZXIsIGxlYXZlfSA9IHRyYW5zaXRpb25zXG5jb25zdCBjYWNoZSA9IHtkaXJlY3Rpb246IG51bGx9XG5cbmNvbnN0IHBhZ2VTbGlkZU9wdHMgPSBfID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnc2xpZGUtJyArIGNhY2hlLmRpcmVjdGlvbixcbiAgICAgICAgZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuICAgICAgICB0aW1lOiA0MDAsXG4gICAgICAgIHJlYWR5OiA0MjAsXG4gICAgfVxufVxuXG5jb25zdCBwYWdlU2xpZGUgPSBjb21iaW5lKFxuICAgIGVudGVyKHBhZ2VTbGlkZU9wdHMpLFxuICAgIGxlYXZlKHBhZ2VTbGlkZU9wdHMpXG4pXG5cbmV4cG9ydCBkZWZhdWx0ICh7bmFtZSwgZGlyZWN0aW9uLCBuZXh0fSwgY2hpbGRyZW4pID0+IHtcbiAgICBjYWNoZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICByZXR1cm4gcGFnZVNsaWRlKGgoJ2RpdicsIHtjbGFzczogJ3BhZ2UnLCBrZXk6IG5hbWUgfSwgW10uY29uY2F0KGNoaWxkcmVuLCBOYXZCdXR0b24obmV4dCkpKSlcbn0iLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBhY3Rpb25zKSA9PiBQYWdlKFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2luaXRpYWwnLFxuICAgICAgICBkaXJlY3Rpb246IHN0YXRlLnBhZ2UuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBhY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICdzdGFydCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIGV4dHJhOiAnVGFwIGhlcmUgdG8uLi4nLFxuICAgICAgICAgICAgdGV4dDogJ1N0YXJ0JyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBQYW5lbCh7fSwgWydIYXBwaW5lc3MgSW5kZXggQ2FsY3VsYXRvciddKVxuICAgIF1cbilcbiIsImltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcbmltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUsIGFjdGlvbnMpID0+IFBhZ2UoXG4gICAge1xuICAgICAgICBuYW1lOiAnc3RhcnQnLFxuICAgICAgICBkaXJlY3Rpb246IHN0YXRlLnBhZ2UuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBhY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICd2b3RlJyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgICAgICAgICAgZXh0cmE6IFwiV2hlbiB5b3UncmUgcmVhZHksIHRhcCBoZXJlIHRvLi4uXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIlZvdGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICAgIFBhbmVsKHt9LCBbJ1BsZWFzZSBoYW5kIHRoZSBwaG9uZSB0byB0aGUgZmlyc3QgcGVyc29uIHRvIHZvdGUuJ10pXG4gICAgXVxuKVxuIiwiaW1wb3J0IHRhZ3MgZnJvbSAnLi90YWdzJ1xuY29uc3QgW3VsLCBsaSwgcF0gPSB0YWdzKCd1bCwgbGksIHAnKVxuaW1wb3J0IEljb24gZnJvbSAnLi9pY29uJ1xuXG5jb25zdCBvcHRpb25zID0gW1xuICAgIHtcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIGljb246ICdub0ZhY2UnLFxuICAgICAgICBsYWJlbDogJ05vIFZvdGUnLFxuICAgICAgICBleHRyYTogJ0kgZG9uXFwndCB3YW50IHRvIHBhcnRpY2lwYXRlLidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICAgIGljb246ICd2ZXJ5SGFwcHlGYWNlJyxcbiAgICAgICAgbGFiZWw6ICdWZXJ5IEhhcHB5JyxcbiAgICAgICAgZXh0cmE6ICdJdCBzaG91bGQgYWx3YXlzIGJlIHRoaXMgd2F5ISdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdmFsdWU6IDQsXG4gICAgICAgIGljb246ICdoYXBweUZhY2UnLFxuICAgICAgICBsYWJlbDogJ0hhcHB5JyxcbiAgICAgICAgZXh0cmE6ICdJdCBjYW4gYWx3YXlzIGdldCBiZXR0ZXIhJ1xuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgaWNvbjogJ3VuY2VydGFpbkZhY2UnLFxuICAgICAgICBsYWJlbDogJ0RvblxcJ3Qga25vdycsXG4gICAgICAgIGV4dHJhOiAnTWVoLi4uIC8gTWl4ZWQgZmVlbGluZ3MnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiAyLFxuICAgICAgICBpY29uOiAndW5oYXBweUZhY2UnLFxuICAgICAgICBsYWJlbDogJ1VuaGFwcHknLFxuICAgICAgICBleHRyYTogJ0EgbG90IG5lZWRzIHRvIGNoYW5nZSEnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiAxLFxuICAgICAgICBpY29uOiAndmVyeVVuaGFwcHlGYWNlJyxcbiAgICAgICAgbGFiZWw6ICdWZXJ5IFVuaGFwcHknLFxuICAgICAgICBleHRyYTogJ1doeSBldmVuIGJvdGhlci4uLidcbiAgICB9XG5dXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgKHt2YWx1ZTpjdXJyZW50LCBzZXR9KSA9PiB1bChcbiAgICB7Y2xhc3M6ICdvcHRpb24tc2VsZWN0b3InfSxcbiAgICBvcHRpb25zLm1hcCgoe3ZhbHVlLCBpY29uLCBsYWJlbCwgZXh0cmF9KSA9PiBsaShcbiAgICAgICAge1xuICAgICAgICAgICAgb25tb3VzZWRvd246IF8gPT4gc2V0KHZhbHVlKSxcbiAgICAgICAgICAgIG9udG91Y2hzdGFydDogXyA9PiBzZXQodmFsdWUpLFxuICAgICAgICAgICAgY2xhc3M6ICh2YWx1ZSA9PT0gY3VycmVudCA/ICdhY3RpdmUnIDogJycpLFxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgICBJY29uKHtuYW1lOiBpY29ufSksXG4gICAgICAgICAgICBwKHtjbGFzczogJ2xhYmVsJ30sIFtsYWJlbF0pLFxuICAgICAgICAgICAgcCh7Y2xhc3M6ICdleHRyYSd9LCBbZXh0cmFdKSxcbiAgICAgICAgXVxuICAgICkpXG4pIiwiaW1wb3J0IFZvdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvdm90ZXInXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBhY3Rpb25zKSA9PiBQYWdlKHtcbiAgICAgICAgbmFtZTogJ3ZvdGUnLFxuICAgICAgICBkaXJlY3Rpb246IHN0YXRlLnBhZ2UuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBhY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICdwYXNzJyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgICAgICAgICAgZXh0cmE6IFwiTWFrZSB5b3VyIHNlbGVjdGlvbiwgdGhlbiB0YXAgaGVyZSB0by4uLlwiLFxuICAgICAgICAgICAgdGV4dDogXCJDYXN0IFZvdGVcIixcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBQYW5lbCh7fSwgWydIb3cgaGFwcHkgYXJlIHlvdSBhYm91dCB5b3VyIGpvYj8nXSksXG4gICAgICAgIFZvdGVyKHtcbiAgICAgICAgICAgIHZhbHVlOiBzdGF0ZS52b3Rlcy5jdXJyZW50LFxuICAgICAgICAgICAgc2V0OiBhY3Rpb25zLnZvdGVzLnNldFxuICAgICAgICB9KVxuICAgIF1cbilcbiIsImltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuaW1wb3J0IE5hdkJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL25hdmJ1dHRvbidcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBhY3Rpb25zKSA9PiBQYWdlKFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3Bhc3MnLFxuICAgICAgICBkaXJlY3Rpb246IHN0YXRlLnBhZ2UuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBhY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICd2b3RlJyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2JhY2snLFxuICAgICAgICAgICAgZXh0cmE6IFwiQXJlIHlvdSB0aGUgbmV4dCBwZXJzb24/IFRhcCBoZXJlIHRvLi4uXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIlZvdGVcIixcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBOYXZCdXR0b24oe1xuICAgICAgICAgICAgZ29UbzogYWN0aW9ucy5nb1RvLFxuICAgICAgICAgICAgdGFyZ2V0OiAncmVzdWx0JyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgICAgICAgICAgZXh0cmE6ICdIYXMgZXZlcnlvbmUgdm90ZWQ/IFRhcCBoZXJlIHRvLi4uJyxcbiAgICAgICAgICAgIHRleHQ6ICdDaGVjayBSZXN1bHQnXG4gICAgICAgIH0pLFxuICAgICAgICBQYW5lbCh7fSwgWydUaGFuayB5b3UhIE5vdywgcGxlYXNlIGhhbmQgdGhlIHBob25lIHRvIHRoZSBuZXh0IHBlcnNvbi4nXSlcbiAgICBdXG4pXG4iLCJpbXBvcnQge2h9IGZyb20gJ2h5cGVyYXBwJ1xuY29uc3QgYXZnID0gKHtzdW0sIGNvdW50fSkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gMCkgcmV0dXJuICcnXG4gICAgcmV0dXJuICcnICsgTWF0aC5yb3VuZCgxMCAqIHN1bSAvIGNvdW50KSAvIDEwXG59XG5cbmV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiBoKCdwJywge2NsYXNzOiAncmVzdWx0LWRpc3BsYXknfSwgW2F2ZyhkYXRhKV0pIiwiaW1wb3J0IFJlc3VsdCBmcm9tICcuLi9jb21wb25lbnRzL3Jlc3VsdCdcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcbmltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUsIGFjdGlvbnMpID0+IFBhZ2UoXG4gICAge1xuICAgICAgICBuYW1lOiAncmVzdWx0JyxcbiAgICAgICAgZGlyZWN0aW9uOiBzdGF0ZS5wYWdlLmRpcmVjdGlvbixcbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ29UbzogYWN0aW9ucy5nb1RvLFxuICAgICAgICAgICAgdGFyZ2V0OiAncmVzZXQnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnZm9yd2FyZCcsXG4gICAgICAgICAgICBleHRyYTogJ05lZWQgdG8gZG8gaXQgYWdhaW4/IFRhcCBoZXJlIHRvLi4uJyxcbiAgICAgICAgICAgIHRleHQ6ICdSZXNldCBWb3RlcycsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgICAgUGFuZWwoe30sIFtcbiAgICAgICAgICAgICdIYXBwaW5lc3MgSW5kZXgnLFxuICAgICAgICAgICAgUmVzdWx0KHN0YXRlLnZvdGVzKVxuICAgICAgICBdKVxuICAgIF1cbikiLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcbmltcG9ydCBSZXN1bHQgZnJvbSAnLi4vY29tcG9uZW50cy9yZXN1bHQnXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0ICAoc3RhdGUsIGFjdGlvbnMpID0+IFBhZ2UoXG4gICAge1xuICAgICAgICBuYW1lOiAncmVzZXQnLFxuICAgICAgICBkaXJlY3Rpb246IHN0YXRlLnBhZ2UuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBhY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICdzdGFydCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdiYWNrJyxcbiAgICAgICAgICAgIGV4dHJhOiAnVGFwIGhlcmUgdG8uLi4nLFxuICAgICAgICAgICAgdGV4dDogJ1N0YXJ0IGFnYWluJyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBQYW5lbCh7fSwgW1xuICAgICAgICAgICAgJ1ZvdGVzIGNsZWFyZWQgZnJvbSBtZW1vcnknLFxuICAgICAgICAgICAgUmVzdWx0KHN0YXRlLnZvdGVzKVxuICAgICAgICBdKVxuICAgIF1cbilcbiIsImltcG9ydCBpbml0aWFsIGZyb20gJy4vaW5pdGlhbCdcbmltcG9ydCBzdGFydCAgIGZyb20gJy4vc3RhcnQnXG5pbXBvcnQgdm90ZSAgICBmcm9tICcuL3ZvdGUnXG5pbXBvcnQgcGFzcyAgICBmcm9tICcuL3Bhc3MnXG5pbXBvcnQgcmVzdWx0ICBmcm9tICcuL3Jlc3VsdCdcbmltcG9ydCByZXNldCAgIGZyb20gJy4vcmVzZXQnXG5cbmV4cG9ydCBkZWZhdWx0IHtpbml0aWFsLCBzdGFydCwgdm90ZSwgcGFzcywgcmVzdWx0LCByZXNldH1cbiIsImltcG9ydCB7YXBwfSBmcm9tICdoeXBlcmFwcCdcbmltcG9ydCBBcHBDb250YWluZXIgZnJvbSAnLi9jb21wb25lbnRzL2FwcC1jb250YWluZXInXG5pbXBvcnQgcGFnZXMgZnJvbSAnLi9wYWdlcydcbmltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlL21haW4ubGVzcydcblxuYXBwKHtcbiAgICBzdGF0ZToge1xuICAgICAgICB2b3Rlczoge1xuICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICBjdXJyZW50OiAnaW5pdGlhbCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFjdGlvbnM6IHtcbiAgICAgICAgZ29UbyAoc3RhdGUsIGFjdGlvbnMsIFtjdXJyZW50LCBkaXJlY3Rpb25dLCBlbWl0KSB7XG4gICAgICAgICAgICBlbWl0KCdnb1RvOicgKyBjdXJyZW50KVxuICAgICAgICAgICAgc3RhdGUucGFnZSA9IHtjdXJyZW50LCBkaXJlY3Rpb259XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSxcbiAgICAgICAgdm90ZXM6IHtcbiAgICAgICAgICAgIHNldCAoc3RhdGUsIGFjdGlvbnMsIHZvdGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS52b3Rlcy5jdXJyZW50ID0gdm90ZVxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbW1pdCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudm90ZXMuY3VycmVudCA9PT0gMCkgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICAgICAgc3RhdGUudm90ZXMuc3VtID0gc3RhdGUudm90ZXMuc3VtICsgc3RhdGUudm90ZXMuY3VycmVudFxuICAgICAgICAgICAgICAgIHN0YXRlLnZvdGVzLmNvdW50ID0gc3RhdGUudm90ZXMuY291bnQgKyAxXG4gICAgICAgICAgICAgICAgc3RhdGUudm90ZXMuY3VycmVudCA9IDBcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS52b3Rlcy5zdW0gPSAwXG4gICAgICAgICAgICAgICAgc3RhdGUudm90ZXMuY291bnQgPSAwXG4gICAgICAgICAgICAgICAgc3RhdGUudm90ZXMuY3VycmVudCA9IDBcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdnb1RvOnJlc2V0JzogKHN0YXRlLCBhY3Rpb25zKSA9PiBzZXRUaW1lb3V0KGFjdGlvbnMudm90ZXMucmVzZXQsMCksXG4gICAgICAgICdnb1RvOnBhc3MnOiAoc3RhdGUsIGFjdGlvbnMpID0+IHNldFRpbWVvdXQoYWN0aW9ucy52b3Rlcy5jb21taXQsIDApXG4gICAgfSxcbiAgICB2aWV3OiAoc3RhdGUsIGFjdGlvbnMpID0+IEFwcENvbnRhaW5lcih7fSwgW3BhZ2VzW3N0YXRlLnBhZ2UuY3VycmVudF0oc3RhdGUsIGFjdGlvbnMpXSlcbn0pXG4iXSwibmFtZXMiOlsidGFncyIsInJlcXVpcmUiLCJ0cmFuc2l0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFFBQWUsU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFO0VBQ2pDLElBQUksS0FBSTtFQUNSLElBQUksS0FBSyxHQUFHLEdBQUU7RUFDZCxJQUFJLFFBQVEsR0FBRyxHQUFFOztFQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBQztHQUNuQzs7RUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUU7SUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtNQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUk7UUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFDO09BQzlCO0tBQ0YsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO01BQzFELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRTtPQUNqQjtNQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSTtLQUNqQztHQUNGOztFQUVELE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUTtNQUMxQjtRQUNFLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ2hCLFFBQVEsRUFBRSxRQUFRO09BQ25CO01BQ0QsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7Q0FDeEI7O0FDN0JELFVBQWUsU0FBUyxHQUFHLEVBQUU7RUFDM0IsSUFBSSxLQUFLLEdBQUcsR0FBRTtFQUNkLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFJO0VBQ25CLElBQUksT0FBTyxHQUFHLEdBQUU7RUFDaEIsSUFBSSxNQUFNLEdBQUcsR0FBRTtFQUNmLElBQUksS0FBSTtFQUNSLElBQUksUUFBTzs7RUFFWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUc7O0lBRTVDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtNQUN6QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO0tBQ3JDOztJQUVELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7TUFDdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQztLQUNsQzs7SUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUM7O0lBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUU7TUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBQztLQUM1RCxFQUFDO0dBQ0g7O0VBRUQsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtJQUNsQyxJQUFJLEdBQUU7R0FDUCxNQUFNO0lBQ0wsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDO0dBQzNDOztFQUVELFNBQVMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcs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QUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPQSxlQUFPLEVBQUVBLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O0FDSWxvRixNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBR0MsS0FBVztBQUMzQyxNQUFNLEtBQUssR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUM7O0FBRS9CLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBSTtJQUN2QixPQUFPO1FBQ0gsSUFBSSxFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUztRQUNoQyxNQUFNLEVBQUUs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LEVBQUM7WUFDdkIsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUM7WUFDakMsT0FBTyxLQUFLO1NBQ2Y7UUFDRCxLQUFLLEVBQUU7WUFDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSTtnQkFDMUIsT0FBTyxLQUFLO2FBQ2Y7WUFDRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLO2dCQUMzQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQU87Z0JBQ3ZELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUM7Z0JBQ3ZCLE9BQU8sS0FBSzthQUNmO1lBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUM7Z0JBQ25CLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUM7Z0JBQ3ZCLE9BQU8sS0FBSzthQUNmO1NBQ0o7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEtBQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDdkU7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUMxRixDQUFDOzs7OyJ9
