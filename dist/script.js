(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).transitions=t()}}(function(){return function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return o(n||t)},f,f.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){function r(t,e){e.style.transition=`all ${t.easing} ${t.time}ms`}function o(t){return e=>{var n="function"==typeof t?t():t;return Object.assign({},u,n)}}function i(t,e){return function(n){const r=o(n),i=(...t)=>e(r(),...t);return function(e){const n=e.data[t]||(t=>{});return e.data[t]=((...t)=>{n(...t),i(...t)}),e}}}function s(t){const e=+t.getAttribute("data-t-x"),n=+t.getAttribute("data-t-y"),{left:r,top:o}=t.getBoundingClientRect();return t.setAttribute("data-t-x",r),t.setAttribute("data-t-y",o),e?[e-r,n-o]:[null,null]}function a(...t){const e=[...t],n=e.length;var r=e[0];if(1===n)return r;var o;return o=n>2?a(...e.slice(1)):e[1],t=>r(o(t))}const u={name:"",time:0,delay:0,ready:0,easing:"",last:!0},l=i("onremove",(t,e,n)=>{const o=`${t.name}-leave`;e.style.transition="",e.style.transform="",e.classList.add(o);const i=getComputedStyle(e).getPropertyValue("transform"),[a,u,l,f,c,d]="none"===i?[1,0,0,1,0,0]:i.match(/^matrix\(([^\)]*)\)$/)[1].split(", ").map(t=>+t);e.classList.remove(o);const[m,y]=s(e);e.style.transform=`translate(${m}px, ${y}px)`,setTimeout(i=>{e.classList.add(o),e.style.transform=`matrix(${a}, ${u}, ${l}, ${f}, ${c+m}, ${d+y})`,r(t,e),t.last&&setTimeout(n,t.time)},t.delay)}),f=i("oncreate",(t,e)=>setTimeout(t=>s(e),t.ready)),c=i("oncreate",(t,e)=>{const n=`${t.name}-enter`;e.classList.add(n),setTimeout(o=>{r(t,e),e.classList.remove(n)},t.delay)}),d=i("oncreate",(t,e)=>r(t,e)),m=i("onupdate",(t,e)=>{const[n,o]=s(e);e.style.transition="",e.style.transform=`translate(${n}px, ${o}px)`,setTimeout(n=>{r(t,e),e.style.transition=`all ${t.easing} ${t.time}ms`,e.style.transform="translate(0,0)",setTimeout(t=>{e.style.transform="",e.style.transition=""},t.time)})}),y=i("oncreate",(t,e)=>setTimeout(t=>s(e),t.ready));e.exports={change:d,enter:c,leave:t=>a(f(t),l(t)),move:t=>a(y(t),m(t)),group:function(t){return e=>(e.children.forEach(t),e)},combine:a}},{}]},{},[1])(1)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.hyperapp=e.hyperapp||{})}(this,function(e){"use strict";var t=function(e,t){for(var n,r=[],a=[],o=arguments.length;o-- >2;)r[r.length]=arguments[o];for(;r.length;)if(Array.isArray(n=r.pop()))for(o=n.length;o--;)r[r.length]=n[o];else null!=n&&!0!==n&&!1!==n&&("number"==typeof n&&(n+=""),a[a.length]=n);return"string"==typeof e?{tag:e,data:t||{},children:a}:e(t,a)},n=function(e){function t(e,n,i){Object.keys(n||[]).map(function(u){var c=n[u],f=i?i+"."+u:u;"function"==typeof c?e[u]=function(e){var t=c(h,g,r("action",{name:f,data:e}).data,r);if(null==t||"function"==typeof t.then)return t;a(h=o(h,r("update",t)),v)}:t(e[u]||(e[u]={}),c,f)})}function n(){a(h,v),r("loaded")}function r(e,t){return(m[e]||[]).map(function(e){var n=e(h,g,t,r);null!=n&&(t=n)}),t}function a(t,n){p=d(e.root||(e.root=document.body),p,s,s=r("render",n)(t,g))}function o(e,t){var n={};if("object"!=typeof t||Array.isArray(t))return t;for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n}function i(e,t){if("string"==typeof e)n=document.createTextNode(e);else{for(var n=(t=t||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag),r=0;r<e.children.length;)n.appendChild(i(e.children[r++],t));for(var r in e.data)"oncreate"===r?e.data[r](n):u(n,r,e.data[r])}return n}function u(e,t,n,r){if("key"===t);else if("style"===t)for(var a in o(r,n=n||{}))e.style[a]=n[a]||"";else{try{e[t]=n}catch(e){}"function"!=typeof n&&(n?e.setAttribute(t,n):e.removeAttribute(t))}}function c(e,t,n){for(var r in o(t,n)){var a=n[r],i="value"===r||"checked"===r?e[r]:t[r];"onupdate"===r&&a?a(e):a!==i&&u(e,r,a,i)}}function f(e){if(e&&(e=e.data))return e.key}function l(e,t,n){function r(){e.removeChild(t)}(n.data&&n.data.onremove||r)(t,r)}function d(e,t,n,r){if(null==n)t=e.insertBefore(i(r),t);else if(r.tag&&r.tag===n.tag){c(t,n.data,r.data);for(var a=r.children.length,o=n.children.length,u={},s=[],p={},h=0;h<o;h++){g=t.childNodes[h];s[h]=g,null!=(x=f(m=n.children[h]))&&(u[x]=[g,m])}for(var h=0,v=0;v<a;){var g=s[h],m=n.children[h],y=r.children[v];if(p[x=f(m)])h++;else{var w=f(y),b=u[w]||[];null==w?(null==x&&(d(t,g,m,y),v++),h++):(x===w?(d(t,b[0],b[1],y),h++):b[0]?(t.insertBefore(b[0],g),d(t,b[0],b[1],y)):d(t,g,null,y),v++,p[w]=y)}}for(;h<o;){var x=f(m=n.children[h]);null==x&&l(t,s[h],m),h++}for(var h in u){var k=(b=u[h])[1];p[k.data.key]||l(t,b[0],k)}}else if(r!==n){h=t;e.replaceChild(t=i(r),h)}return t}for(var s,p,h={},v=e.view,g={},m={},y=-1,w=e.mixins||[];y<w.length;y++){var b=w[y]?w[y](e):e;null!=b.mixins&&b!==e&&(w=w.concat(b.mixins)),null!=b.state&&(h=o(h,b.state)),t(g,b.actions),Object.keys(b.events||[]).map(function(e){m[e]=(m[e]||[]).concat(b.events[e])})}"l"!==document.readyState[0]?n():addEventListener("DOMContentLoaded",n)},r=function(e,t){function n(n){for(var r,a={},o=0,i=e.view.length;o<i;o++){var u=e.view[o][0],c=[];r||n.replace(RegExp("*"===u?"."+u:"^"+u.replace(/\//g,"\\/").replace(/:([\w]+)/g,function(e,t){return c.push(t),"([-\\.\\w]+)"})+"/?$","g"),function(){for(var n=1;n<arguments.length-2;)a[c.shift()]=arguments[n++];r=u,t=e.view[o][1]})}return{match:r,params:a}}return{state:{router:n(location.pathname)},actions:{router:{match:function(e,t,r,a){return{router:a("route",n(r))}},go:function(e,t,n){history.pushState({},"",n),t.router.match(n.split("?")[0])}}},events:{loaded:function(e,t){function n(){t.router.match(location.pathname)}n(),addEventListener("popstate",n)},render:function(){return t}}}};e.h=t,e.app=n,e.Router=r});


},{}],3:[function(require,module,exports){
const {h} = require('hyperapp')
module.exports = (props, children) => h('div', {class: 'app-container'}, children)
},{"hyperapp":2}],4:[function(require,module,exports){
const tags = require('./tags')
const [button] = tags('button')

const onActivate = action => ev => {
    ev.preventDefault(true)
    ev.currentTarget.classList.add('active')
    action()
}

module.exports = ({cls, action}, children) => button({
    class: cls,
    ontouchstart: onActivate(action),
    onmousedown: onActivate(action)
}, children)


},{"./tags":11}],5:[function(require,module,exports){
const Icon = require('./icon')
module.exports = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
})
},{"./icon":6}],6:[function(require,module,exports){
const tags = require('./tags')
const [div, _svg, path, circle, line] = tags('div, svg, path, circle, line')

const svg = (props, children) => {
    props.width = '100%',
    props.heihgt = '100%',
    props.xmlns = 'http://www.w3.org/2000/svg'
    return _svg(props, children)
}

const fSvg = children => svg({viewBox: '-50 -50 100 100'}, children)
const [fCircle, fLine, fPath] = (tags => tags.map(tag => props => {
    props.fill = 'transparent'
    props['stroke-width'] = 5
    props['stroke-linecap'] = 'round'
    return tag(props)
}))([circle, line, path])

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
}

module.exports = ({name, effect}) => div({class: `icon ${effect}`}, [icons[name]])
},{"./tags":11}],7:[function(require,module,exports){
const {h} = require('hyperapp')
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
            h('p', {class: 'button-text-extra'}, [extra]),
            h('p', {class: 'button-text-main'}, [text])
        ]
    )
}
},{"./button":4,"./chevron":5,"hyperapp":2}],8:[function(require,module,exports){
const {h} = require('hyperapp')
const NavButton = require('./navbutton')
const {combine, enter, leave} = require('hyperapp-transitions')
const cache = {direction: null}

const pageSlideOpts = _ => {
    return {
        name: 'slide-' + cache.direction,
        easing: 'ease-in-out',
        time: 400,
        ready: 420,
    }
}

const pageSlide = combine(
    enter(pageSlideOpts),
    leave(pageSlideOpts)
)

module.exports = ({name, direction, next}, children) => {
    cache.direction = direction
    return pageSlide(h('div', {class: 'page', key: name }, [].concat(children, NavButton(next))))
}
},{"./navbutton":7,"hyperapp":2,"hyperapp-transitions":1}],9:[function(require,module,exports){
const {h} = require('hyperapp')
module.exports = (props, children) => h('div', {'class': 'panel'}, children)

},{"hyperapp":2}],10:[function(require,module,exports){
const {h} = require('hyperapp')
const avg = ({sum, count}) => {
    if (count === 0) return ''
    return '' + Math.round(10 * sum / count) / 10
}

module.exports = (data) => h('p', {class: 'result-display'}, [avg(data)])
},{"hyperapp":2}],11:[function(require,module,exports){
const {h} = require('hyperapp')
module.exports = function (tags) {
    return tags.replace(/\s/g, '').split(',').map(tagName => (props, children) => {
        return (typeof props === 'object' && !Array.isArray(props)) 
        ? h(tagName, props, children)
        : h(tagName, {}, props)
    })   
}
},{"hyperapp":2}],12:[function(require,module,exports){
const tags = require('./tags')
const [ul, li, p] = tags('ul, li, p')
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





module.exports = ({value:current, set}) => ul(
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
)
},{"./icon":6,"./tags":11}],13:[function(require,module,exports){
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
            direction: null,
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
                if (state.votes.current === 0) return state
                state.votes.sum = state.votes.sum + state.votes.current
                state.votes.count = state.votes.count + 1
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

},{"./components/app-container":3,"./pages":14,"hyperapp":2}],14:[function(require,module,exports){
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

},{"../components/page":8,"../components/panel":9}],16:[function(require,module,exports){
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

},{"../components/navbutton":7,"../components/page":8,"../components/panel":9}],17:[function(require,module,exports){
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

},{"../components/page":8,"../components/panel":9,"../components/result":10}],18:[function(require,module,exports){
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
},{"../components/page":8,"../components/panel":9,"../components/result":10}],19:[function(require,module,exports){
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

},{"../components/page":8,"../components/panel":9}],20:[function(require,module,exports){
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

},{"../components/page":8,"../components/panel":9,"../components/voter":12}]},{},[13]);
