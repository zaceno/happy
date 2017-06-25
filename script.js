(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":1}],3:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.picodom=e.picodom||{})}(this,function(e){"use strict";function t(e,t){for(var n,r=[],o=[],a=arguments.length;a-- >2;)r[r.length]=arguments[a];for(;r.length;)if(Array.isArray(n=r.pop()))for(a=n.length;a--;)r[r.length]=n[a];else null!=n&&!0!==n&&!1!==n&&("number"==typeof n&&(n+=""),o[o.length]=n);return"string"==typeof e?{tag:e,data:t||{},children:o}:e(t,o)}function n(e,t,r,a){if(null==r)t=e.insertBefore(o(a),t);else if(a.tag&&a.tag===r.tag){i(t,r.data,a.data);for(var c=a.children.length,d=r.children.length,u={},h=[],s={},v=0;v<d;v++){p=t.childNodes[v];h[v]=p,null!=(k=f(y=r.children[v]))&&(u[k]=[p,y])}for(var v=0,g=0;g<c;){var p=h[v],y=r.children[v],m=a.children[g];if(s[k=f(y)])v++;else{var A=f(m),b=u[A]||[];null==A?(null==k&&(n(t,p,y,m),g++),v++):(k===A?(n(t,b[0],b[1],m),v++):b[0]?(t.insertBefore(b[0],p),n(t,b[0],b[1],m)):n(t,p,null,m),g++,s[A]=m)}}for(;v<d;){var k=f(y=r.children[v]);null==k&&l(t,h[v],y),v++}for(var v in u){var w=(b=u[v])[1];s[w.data.key]||l(t,b[0],w)}}else if(a!==r){v=t;e.replaceChild(t=o(a),v)}return t}function r(e,t){var n={};if("object"!=typeof t||Array.isArray(t))return t;for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n}function o(e,t){if("string"==typeof e)n=document.createTextNode(e);else{for(var n=(t=t||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag),r=0;r<e.children.length;)n.appendChild(o(e.children[r++],t));for(var r in e.data)"oncreate"===r?e.data[r](n):a(n,r,e.data[r])}return n}function a(e,t,n,o){if("key"===t);else if("style"===t)for(var a in r(o,n=n||{}))e.style[a]=n[a]||"";else{try{e[t]=n}catch(e){}"function"!=typeof n&&(n?e.setAttribute(t,n):e.removeAttribute(t))}}function i(e,t,n){for(var o in r(t,n)){var i=n[o],f="value"===o||"checked"===o?e[o]:t[o];"onupdate"===o?i(e):i!==f&&a(e,o,i,f)}}function f(e){if(e&&(e=e.data))return e.key}function l(e,t,n){function r(){e.removeChild(t)}(n.data&&n.data.onremove||r)(t,r)}e.h=t,e.patch=n});


},{}],4:[function(require,module,exports){
const {h, render, renderer} = require('../dom')
const Store = require('../store')

const isObj = x => (Object.prototype.toString.call(x) === '[object Object]') 
const defaultInitVal = store => ({get: store.getter(x => x), set:store.setter((_, x) => x)})
const defaultInitObj = store => ({get: store.getter(x => x), set:store.setter((o, x) => Object.assign(o, x))})

function appNoInit(store, view, container, el) {
    const render = renderer(view, container, el)
    store.onupdate(render)
    render()
}

function appStoreInit(store, init, view, container, el) {
    const defs = init(store)
    appNoInit(store, _ => view(defs), container, el)
}

function appStateInit(state, init, view, container, el) {
    appStoreInit(new Store(state), init, view, container, el)
}

function appStateBasicInit(state, view, container, el) {
    const init = isObj(state) ? defaultInitObj : defaultInitVal
    const prefetchedStateView = ({get, set}) => view(get(), set)
    appStateInit(state, init, prefetchedStateView, container, el)
}

module.exports = ({state, store, init, view, container, el}) => {
    view = view || (_ => '')
    if (state !== undefined) {
        if (init)  return appStateInit(state, init, view, container, el)
        if (!init) return appStateBasicInit(state, view, container, el)
    }
    if (store) {
        if (init) return appStoreInit(store, init, view, container, el)  
        if (!init) return appNoInit(store, view, container, el)
    }
    //still here... just render once..
    render(view(), container, el)
}

},{"../dom":6,"../store":10}],5:[function(require,module,exports){
const {h} = require('picodom')
module.exports = h

},{"picodom":3}],6:[function(require,module,exports){
const h = require('./h')
const render = require('./render')
const renderer = require('./renderer')
module.exports = {h, render, renderer}
},{"./h":5,"./render":7,"./renderer":8}],7:[function(require,module,exports){
const {h, patch} = require('picodom')

module.exports = (vtree, container, elem, prev) => {
    container = container || document.body
    return [container, patch(container, elem, prev, vtree), vtree]
}

},{"picodom":3}],8:[function(require,module,exports){
const render = require('./render')

module.exports = (view, container, el) => {
    var vdx = [container, el]
    return _ => (vdx = render(view(), ...vdx))
}
},{"./render":7}],9:[function(require,module,exports){
class Event {
    constructor () {
        this.listeners = []
    }
    on (f) {
        this.listeners.push(f)
    }
    off (f) {
        const i = this.listeners.indexOf(f)
        this.listeners.splice(i, 1)
    }
    trigger (payload) {
        this.listeners.forEach(f => f(payload))
    }
}

module.exports = Event
},{}],10:[function(require,module,exports){
const Event = require('./Event')

const clone = o => JSON.parse(JSON.stringify(o))

class Store {
    constructor (initialState) {
        this._updateEvent = new Event()
        this._state = initialState
    }
    /**
     * Used to set the state, without callign an update
     */
    init (f) {
        this._state = this._call(f)
    }

    _call (f, ...args) {
        return f(clone(this._state), ...args)
    }

    getter (f) {
        return function (...args) {
            return this._call(f, ...args)
        }.bind(this)
    }

    setter (f, meta) {
        return function (...args) {
            this._state = this._call(f, ...args)
            this._updateEvent.trigger(meta)
        }.bind(this)
    }

    onupdate (f) {
        this._updateEvent.on(f)
    }
}

module.exports = Store
},{"./Event":9}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
const hyperx = require('hyperx')
const h = require('zx-app-utils/dom/h')
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

},{"hyperx":2,"zx-app-utils/dom/h":5}],13:[function(require,module,exports){
const h = require('zx-app-utils/dom/h')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const Icon = require('./icon')

const AppContainer = ({page}) => html`<div class="app-container">${page()}</div>`

const Panel = (props, children) => html`<div class="panel">${children}</div>`

const Button = ({cls, active, activate}, children) => html`
    <button
        class="${cls} ${active ? 'active' : ''}"
        ontouchstart=${activate}
        onmousedown=${activate}
    >
        ${children}
    </button>`

const Chevron = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
})

module.exports = {
    AppContainer,
    Panel,
    Button,
    Chevron
}
},{"./icon":12,"hyperx":2,"zx-app-utils/dom/h":5}],14:[function(require,module,exports){
const h = require('zx-app-utils/dom/h')
const hyperx = require('hyperx')
const html = hyperx(h, {attrToProp: false})
const {go, directionTo} = require('../model/navigation')
const {Button, Chevron} = require('./misc')

module.exports = ({target, text, extra, onGo}) => {
    const direction = directionTo(target)
    return Button(
        {
            cls: `nav-button ${direction}`,
            activate: ev => {
                ev.currentTarget.classList.add('active')
                go(target)
                onGo && onGo()
            }
        },
        [
            Chevron({direction}),
            html`<p class="button-text-extra">${extra}</p>`,
            html`<p class="button-text-main">${text}</p>`,
        ]
    )
}
},{"../model/navigation":19,"./misc":13,"hyperx":2,"zx-app-utils/dom/h":5}],15:[function(require,module,exports){
const h = require('zx-app-utils/dom/h')
const transition = require('zx-app-utils/transition')
const {direction} = require('../model/navigation')
const NavButton = require('./navbutton')
const tx = transition.both(_ => ({name: 'slide-' + direction(), time: 350}))

module.exports = ({name, target, text, extra, onGo}, children) => tx(h(
    'div',
    {key: name, class: 'page'},
    [].concat(children, NavButton({target, text, extra, onGo}))
))
},{"../model/navigation":19,"./navbutton":14,"zx-app-utils/dom/h":5,"zx-app-utils/transition":11}],16:[function(require,module,exports){
const h = require('zx-app-utils/dom/h')
const {result} = require('../model/votes')
module.exports = _ => h('p', {class: 'result-display'}, [result() || ''])

},{"../model/votes":21,"zx-app-utils/dom/h":5}],17:[function(require,module,exports){
const hyperx = require('hyperx')
const h = require('zx-app-utils/dom/h')
const html = hyperx(h, {attrToProp: false})
const {set: setVote, get: getVote} = require('../model/votes')
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





module.exports = _ => html`<ul class="option-selector">
    ${options.map(({value, icon, label, extra}) => html`
    <li
        onmousedown=${_ => setVote(value)}
        ontouchstart=${_ => setVote(value)}
        class=${(value === getVote() ? 'active' : '')}
    >
        ${Icon({name:icon})}
        <p class="label">${label}</p>
        <p class="extra">${extra}</p>
    </li>
    `)}
</ul>`
},{"../model/votes":21,"./icon":12,"hyperx":2,"zx-app-utils/dom/h":5}],18:[function(require,module,exports){
const app = require('zx-app-utils/app/main')
const store = require('./model/store')
const {page: currentPage} = require('./model/navigation')
const {AppContainer}  = require('./components/misc')
const pages = {
    initial: require('./pages/initial'),
    start:   require('./pages/start'),
    vote:    require('./pages/vote'),
    pass:    require('./pages/pass'),
    result:  require('./pages/result'),
    reset:   require('./pages/reset')
}
app({store, view: _ => AppContainer({page: pages[currentPage()]})})

},{"./components/misc":13,"./model/navigation":19,"./model/store":20,"./pages/initial":22,"./pages/pass":23,"./pages/reset":24,"./pages/result":25,"./pages/start":26,"./pages/vote":27,"zx-app-utils/app/main":4}],19:[function(require,module,exports){
const store = require('./store')

function directionFromTo (from, to) {
    if (from === 'reset' && to === 'start') return 'back'
    if (from === 'pass' && to === 'vote') return 'back'
    return 'forward'
}

//init navigation state
store.init(state => Object.assign(state, {navigation: {
    current: 'initial',
    previous: null
}}))

module.exports = {
    direction:   store.getter(state => directionFromTo(state.navigation.previous, state.navigation.current)),

    directionTo: store.getter((state, page) => directionFromTo(state.navigation.current, page)),

    page: store.getter(state => state.navigation.current),

    go: store.setter((state, page) => {
        state.navigation.previous = state.navigation.current
        state.navigation.current = page
        return state
    }),
}

},{"./store":20}],20:[function(require,module,exports){
const Store = require('zx-app-utils/store')
module.exports = new Store({})

},{"zx-app-utils/store":10}],21:[function(require,module,exports){
const store = require('./store')

//init store vote data
const initialState = {votes: {
    current: 0,
    sum: 0,
    count: 0
}}

store.init(state => Object.assign(state, initialState))

module.exports = {

    get: store.getter(state => state.votes.current),

    set: store.setter((state, val) => {
        state.votes.current = val
        return state
    }),

    commit: store.setter((state, val) => {
        state.votes.sum = state.votes.sum + state.votes.current
        state.votes.count = state.votes.count + 1
        state.votes.current = 0
        return state
    }),

    result: store.getter(state => {
        if (state.votes.count === 0) return 0
        return Math.round(10 * state.votes.sum / state.votes.count ) / 10
    }),

    reset: store.setter(state => Object.assign(state, initialState))
}

},{"./store":20}],22:[function(require,module,exports){
const {Panel} = require('../components/misc')
const Page = require('../components/page')
module.exports = _ => Page(
    {
        name: 'initial',
        target: 'start',
        extra: 'Tap here to...',
        text: 'Start'
    },
    [
        Panel({}, ['Happiness Index Calculator'])
    ]
)

},{"../components/misc":13,"../components/page":15}],23:[function(require,module,exports){
const {Panel} = require('../components/misc')
const NavButton = require('../components/navbutton')
const Page = require('../components/page')

module.exports = _ => Page(
    {
        name: 'pass',
        target: 'vote',
        extra: "Are you the next person? Tap here to...",
        text: "Vote",
    },
    [
        NavButton({
            target: 'result',
            extra: 'Has everyone voted? Tap here to...',
            text: 'Check Result'
        }),
        Panel({}, ['Thank you! Now, please hand the phone to the next person.'])
    ]
)

},{"../components/misc":13,"../components/navbutton":14,"../components/page":15}],24:[function(require,module,exports){
const {Panel} = require('../components/misc')
const Result = require('../components/result')
const Page = require('../components/page')

module.exports = _ => Page(
    {
        name: 'reset',
        target: 'start',
        extra: 'Tap here to...',
        text: 'Start again',
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result()
        ])
    ]
)

},{"../components/misc":13,"../components/page":15,"../components/result":16}],25:[function(require,module,exports){
const {reset: resetVotes} = require('../model/votes')
const Result = require('../components/result')
const Page = require('../components/page')
const {Panel} = require('../components/misc')
module.exports = _ => Page(
    {
        name: 'result',
        target: 'reset',
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset Votes',
        onGo: resetVotes,
    },
    [
        Panel({}, [
            'Happiness Index',
            Result()
        ])
    ]
)
},{"../components/misc":13,"../components/page":15,"../components/result":16,"../model/votes":21}],26:[function(require,module,exports){
const Page = require('../components/page')
const {Panel} = require('../components/misc')

module.exports = _ => Page(
    {
        name: 'start',
        target: 'vote',
        extra: "When you're ready, tap here to...",
        text: "Vote"
    },
    [
        Panel({}, ['Please hand the phone to the first person to vote.'])
    ]
)

},{"../components/misc":13,"../components/page":15}],27:[function(require,module,exports){
const Voter = require('../components/voter')
const {Panel} = require('../components/misc')
const Page = require('../components/page')
const {commit: commitVote} = require('../model/votes')

module.exports = _ => Page({
        name: 'vote',
        target: 'pass',
        extra: "Make your selection, then tap here to...",
        text: "Cast Vote",
        onGo: commitVote
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter()
    ]
)

},{"../components/misc":13,"../components/page":15,"../components/voter":17,"../model/votes":21}]},{},[18]);
