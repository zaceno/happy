(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.hyperapp=e.hyperapp||{})}(this,function(e){"use strict";var t=function(e,t){for(var n,r=[],a=[],o=arguments.length;o-- >2;)r[r.length]=arguments[o];for(;r.length;)if(Array.isArray(n=r.pop()))for(o=n.length;o--;)r[r.length]=n[o];else null!=n&&!0!==n&&!1!==n&&("number"==typeof n&&(n+=""),a[a.length]=n);return"string"==typeof e?{tag:e,data:t||{},children:a}:e(t,a)},n=function(e){function t(e,n,i){Object.keys(n||[]).map(function(u){var c=n[u],f=i?i+"."+u:u;"function"==typeof c?e[u]=function(e){var t=c(h,g,r("action",{name:f,data:e}).data,r);if(null==t||"function"==typeof t.then)return t;a(h=o(h,r("update",t)),v)}:t(e[u]||(e[u]={}),c,f)})}function n(){a(h,v),r("loaded")}function r(e,t){return(m[e]||[]).map(function(e){var n=e(h,g,t,r);null!=n&&(t=n)}),t}function a(t,n){p=d(e.root||(e.root=document.body),p,s,s=r("render",n)(t,g))}function o(e,t){var n={};if("object"!=typeof t||Array.isArray(t))return t;for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n}function i(e,t){if("string"==typeof e)n=document.createTextNode(e);else{for(var n=(t=t||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag),r=0;r<e.children.length;)n.appendChild(i(e.children[r++],t));for(var r in e.data)"oncreate"===r?e.data[r](n):u(n,r,e.data[r])}return n}function u(e,t,n,r){if("key"===t);else if("style"===t)for(var a in o(r,n=n||{}))e.style[a]=n[a]||"";else{try{e[t]=n}catch(e){}"function"!=typeof n&&(n?e.setAttribute(t,n):e.removeAttribute(t))}}function c(e,t,n){for(var r in o(t,n)){var a=n[r],i="value"===r||"checked"===r?e[r]:t[r];"onupdate"===r&&a?a(e):a!==i&&u(e,r,a,i)}}function f(e){if(e&&(e=e.data))return e.key}function l(e,t,n){function r(){e.removeChild(t)}(n.data&&n.data.onremove||r)(t,r)}function d(e,t,n,r){if(null==n)t=e.insertBefore(i(r),t);else if(r.tag&&r.tag===n.tag){c(t,n.data,r.data);for(var a=r.children.length,o=n.children.length,u={},s=[],p={},h=0;h<o;h++){g=t.childNodes[h];s[h]=g,null!=(x=f(m=n.children[h]))&&(u[x]=[g,m])}for(var h=0,v=0;v<a;){var g=s[h],m=n.children[h],y=r.children[v];if(p[x=f(m)])h++;else{var w=f(y),b=u[w]||[];null==w?(null==x&&(d(t,g,m,y),v++),h++):(x===w?(d(t,b[0],b[1],y),h++):b[0]?(t.insertBefore(b[0],g),d(t,b[0],b[1],y)):d(t,g,null,y),v++,p[w]=y)}}for(;h<o;){var x=f(m=n.children[h]);null==x&&l(t,s[h],m),h++}for(var h in u){var k=(b=u[h])[1];p[k.data.key]||l(t,b[0],k)}}else if(r!==n){h=t;e.replaceChild(t=i(r),h)}return t}for(var s,p,h={},v=e.view,g={},m={},y=-1,w=e.mixins||[];y<w.length;y++){var b=w[y]?w[y](e):e;null!=b.mixins&&b!==e&&(w=w.concat(b.mixins)),null!=b.state&&(h=o(h,b.state)),t(g,b.actions),Object.keys(b.events||[]).map(function(e){m[e]=(m[e]||[]).concat(b.events[e])})}"l"!==document.readyState[0]?n():addEventListener("DOMContentLoaded",n)},r=function(e,t){function n(n){for(var r,a={},o=0,i=e.view.length;o<i;o++){var u=e.view[o][0],c=[];r||n.replace(RegExp("*"===u?"."+u:"^"+u.replace(/\//g,"\\/").replace(/:([\w]+)/g,function(e,t){return c.push(t),"([-\\.\\w]+)"})+"/?$","g"),function(){for(var n=1;n<arguments.length-2;)a[c.shift()]=arguments[n++];r=u,t=e.view[o][1]})}return{match:r,params:a}}return{state:{router:n(location.pathname)},actions:{router:{match:function(e,t,r,a){return{router:a("route",n(r))}},go:function(e,t,n){history.pushState({},"",n),t.router.match(n.split("?")[0])}}},events:{loaded:function(e,t){function n(){t.router.match(location.pathname)}n(),addEventListener("popstate",n)},render:function(){return t}}}};e.h=t,e.app=n,e.Router=r});


},{}],2:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],3:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":2}],4:[function(require,module,exports){
module.exports = (props, children) => ({
    'tag': 'div',
    'data': {'class': 'app-container'},
    children
})
},{}],5:[function(require,module,exports){

module.exports = ({cls, action}, children) => {
    const onActivate = ev => {
        ev.currentTarget.classList.add('active')
        action()
    }
    return {
        tag: 'button',
        data:{
            class: cls,
            ontouchstart: onActivate,
            onmousedown: onActivate
        },
        children
    }
}
},{}],6:[function(require,module,exports){
const Icon = require('./icon')
module.exports = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
})
},{"./icon":7}],7:[function(require,module,exports){
const hyperx = require('hyperx')
const {h} = require('hyperapp')
const html = hyperx(h, {attrToProp: false})


const svg = {
    chevron:  html`<svg width="100%" height="100%" viewBox="-10 -20 20 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M -7 -17 L 7 0 L -7 17" stroke-linecap="butt" stroke-width="3"/>
    </svg>`,

    noFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
    </svg>`,

    veryHappyFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
        <line x1="-18" y1="-10" x2="-8" y2="-18" stroke-linecap="round" stroke-width="5"/>
        <line x1="18" y1="-10" x2="8" y2="-18" stroke-linecap="round" stroke-width="5"/>
        <path d="M -18 10 C -15 25 15 25 18 10" stroke-linecap="round"  fill="transparent" stroke-width="5"/>
    </svg>`,

    happyFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
        <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <path d="M -15 15 C 0 20 0 20 15 15" stroke-linecap="round" stroke-width="5"/>
    </svg>`,

    uncertainFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
        <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <line x1="-10" x2="10" y1="18" y2="18" stroke-linecap="round" stroke-width="5"/>
    </svg>`,

    unhappyFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
        <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
        <path d="M -15 15 C 0 10 0 10 15 15" stroke-linecap="round" stroke-width="5"/>
    </svg>`,

    veryUnhappyFace: html`<svg width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
        <line x1="-15" y1="-7" x2="-8" y2="-15" stroke-linecap="round" stroke-width="5"/>
        <line x1="-8" y1="-15" x2="-15" y2="-18" stroke-linecap="round" stroke-width="5"/>
        <line x1="15" y1="-7" x2="8" y2="-15" stroke-linecap="round" stroke-width="5"/>
        <line x1="8" y1="-15" x2="15" y2="-18" stroke-linecap="round" stroke-width="5"/>
        <path d="M -18 20 C -15 5 15 5 18 20" stroke-linecap="round" fill="transparent" stroke-width="5"/>
    </svg>`,
}

module.exports = ({name, effect}) => html`<div class="icon ${effect}">${svg[name]}</div>`

},{"hyperapp":1,"hyperx":3}],8:[function(require,module,exports){
const {h} = require('hyperapp')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const Button = require('./button')
const Chevron = require('./chevron')

module.exports = ({goTo, target, direction, text, extra}) => {
    return Button(
        {
            cls: `nav-button ${direction}`,
            action: _ => goTo([target, direction]),
        },
        [
            Chevron({direction}),
            html`<p class="button-text-extra">${extra}</p>`,
            html`<p class="button-text-main">${text}</p>`,
        ]
    )
}
},{"./button":5,"./chevron":6,"hyperapp":1,"hyperx":3}],9:[function(require,module,exports){
const NavButton = require('./navbutton')
const transitions = require('../transitions')


const cache = {
    direction: null
}

module.exports = ({name, direction, next}, children) => {
    cache.direction = direction
    const tx = transitions.both(_ => ({
        name: 'slide-' + cache.direction,
        time: 300
    }))
    return tx({
        'tag': 'div',
        data: {
            class: 'page',
            key: name,
        },
        children: [].concat(children, NavButton(next))
    })
}
},{"../transitions":21,"./navbutton":8}],10:[function(require,module,exports){
module.exports = (props, children) => ({
    'tag': 'div',
    'data': {'class': 'panel'},
    children
})
},{}],11:[function(require,module,exports){
const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
}

module.exports = (data) => ({
    tag: 'p',
    data: {class: 'result-display'},
    children: [avg(data)]//[ avg(data) ]
})
},{}],12:[function(require,module,exports){
const hyperx = require('hyperx')
const {h} = require('hyperapp')
const html = hyperx(h, {attrToProp: false})
const Icon = require('./icon')

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
]





module.exports = ({value:current, set}) => html`<ul class="option-selector">
    ${options.map(({value, icon, label, extra}) => html`
    <li
        onmousedown=${_ => set(value)}
        ontouchstart=${_ => set(value)}
        class=${(value === current ? 'active' : '')}
    >
        ${Icon({name:icon})}
        <p class="label">${label}</p>
        <p class="extra">${extra}</p>
    </li>
    `)}
</ul>`
},{"./icon":7,"hyperapp":1,"hyperx":3}],13:[function(require,module,exports){
const {app} = require('hyperapp')
const AppContainer = require('./components/app-container')
const pages = require('./pages')

app({
    state: {
        votes: {
            current: 0,
            sum: 0,
            count: 0,
        },
        page: {
            current: 'initial',
            previous: null
        }
    },
    actions: {
        goTo (state, actions, [current, direction], emit) {
            emit('goTo:' + current)
            state.page = {current, direction}
            return state
        },
        votes: {
            set (state, actions, vote) {
                state.votes.current = vote
                return state
            },
            commit (state) {
                state.votes.sum += state.votes.current
                state.votes.count += 1
                state.votes.current = 0
                return state
            },
            reset (state) {
                state.votes.sum = 0
                state.votes.count = 0
                state.votes.current = 0
                return state
            }
        }
    },
    events: {
        'goTo:reset': (state, actions) => setTimeout(actions.votes.reset,0),
        'goTo:pass': (state, actions) => setTimeout(actions.votes.commit, 0)
    },
    view: (state, actions) => AppContainer({}, [pages[state.page.current](state, actions)])
})

},{"./components/app-container":4,"./pages":14,"hyperapp":1}],14:[function(require,module,exports){
const pages = {
    initial: require('./initial'),
    start:   require('./start'),
    vote:    require('./vote'),
    pass:    require('./pass'),
    result:  require('./result'),
    reset:   require('./reset'),
}
module.exports = pages
},{"./initial":15,"./pass":16,"./reset":17,"./result":18,"./start":19,"./vote":20}],15:[function(require,module,exports){
const Panel = require('../components/panel')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
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
)

},{"../components/page":9,"../components/panel":10}],16:[function(require,module,exports){
const Panel = require('../components/panel')
const NavButton = require('../components/navbutton')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
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
)

},{"../components/navbutton":8,"../components/page":9,"../components/panel":10}],17:[function(require,module,exports){
const Panel = require('../components/panel')
const Result = require('../components/result')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
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
)

},{"../components/page":9,"../components/panel":10,"../components/result":11}],18:[function(require,module,exports){
const Result = require('../components/result')
const Page = require('../components/page')
const Panel = require('../components/panel')

module.exports = (state, actions) => Page(
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
)
},{"../components/page":9,"../components/panel":10,"../components/result":11}],19:[function(require,module,exports){
const Page = require('../components/page')
const Panel = require('../components/panel')

module.exports = (state, actions) => Page(
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
)

},{"../components/page":9,"../components/panel":10}],20:[function(require,module,exports){
const Voter = require('../components/voter')
const Panel = require('../components/panel')
const Page = require('../components/page')

module.exports = (state, actions) => Page({
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
)

},{"../components/page":9,"../components/panel":10,"../components/voter":12}],21:[function(require,module,exports){
function handler(prop, fn) {
    return function (view) {
        const orig = view.data[prop]
        view.data[prop] = function (el, remove) {
            orig && orig(el)
            fn(el, remove)
        }
        return view
    }
}

function enter(fn, time, delay) {
    if (time) return enter(_ => ({name: fn, time, delay}))
    if (typeof fn !== 'function') return enter(_=>fn)
    return handler('oncreate', function (el) {
        const {name, time, delay} = fn()
        const enterClass = name + '-enter'
        const runClass = name + '-run'
        el.classList.add(enterClass)
        setTimeout(_ => {
            el.classList.add(runClass)
            el.classList.remove(enterClass)
            setTimeout(_ => {
                el.classList.remove(runClass)
            }, time)
        }, delay || 0)
    })
}

function leave(fn, time, delay) {
    if (time) return leave(_ => ({name: fn, time, delay}))
    if (typeof fn !== 'function') return leave(_=>fn)
    return handler('onremove', function (el, remove) {
        const {name, time, delay} = fn()
        const leaveClass = name + '-leave'
        const runClass = name + '-run'
        setTimeout(_ => {
            el.classList.add(runClass)
            el.classList.add(leaveClass)
            setTimeout(function () {
                el.classList.remove(runClass)
                remove()
            }, time)
        }, delay || 0)
    })
}

function change(fn) {
    if (typeof fn !== 'function') return change(_=>fn)
    return function (view) {
        const name = fn()
        view.data.class += ' ' + name + '-run'
        return view
    }
}

function both (name, time, delay) {
    const a = enter(name, time, delay)
    const b = leave(name, time, delay)
    return v => a(b(v))
}

module.exports = {
    enter,
    leave,
    both,
    change,
}
},{}]},{},[13]);
