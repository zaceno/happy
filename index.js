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

__$styleInject("*,\nul,\nli,\nbutton,\ninput,\nbody {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 17px;\n}\n@media (min-height: 500px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 20px;\n  }\n}\n@media (min-height: 600px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 25px;\n  }\n}\n@media (min-height: 800px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 30px;\n  }\n}\n@media (min-height: 1000px) {\n  *,\n  ul,\n  li,\n  button,\n  input,\n  body {\n    font-size: 35px;\n  }\n}\n/*\n448px: 17px\n20px : 568\n667:  25px\n\n1024: \n*/\nhtml,\nbody,\n#app {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background: #aaa;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n}\n.page .panel {\n  flex: 1 0 auto;\n  margin: 0.5em;\n  background: #eee;\n  border: 1px #bbbbbb solid;\n  padding: 0.5em;\n  color: #555;\n  text-shadow: 0px 1px 1px #ffffff;\n}\n.page button.nav-button {\n  flex: 0 0 auto;\n  position: relative;\n  height: 15%;\n  color: #fff;\n  background-color: #d6975c;\n  text-shadow: 0 0 1px #29190a;\n}\n.page button.nav-button.active {\n  background-color: #a36429;\n  text-shadow: #140c05;\n}\n.page button.nav-button .button-text-extra {\n  font-size: 0.6em;\n}\n.page button.nav-button .button-text-main {\n  text-transform: uppercase;\n  font-size: 1.2em;\n}\n.page button.nav-button.forward .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  right: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.forward .icon svg path,\n.page button.nav-button.forward .icon svg line,\n.page button.nav-button.forward .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.forward .icon.hflip svg {\n  transform: scale(-1, 1);\n}\n.page button.nav-button.back .icon {\n  filter: drop-shadow(0 0 1px #523214);\n  position: absolute;\n  top: 20%;\n  left: 0;\n  height: 60%;\n  width: 2em;\n}\n.page button.nav-button.back .icon svg path,\n.page button.nav-button.back .icon svg line,\n.page button.nav-button.back .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\n.page button.nav-button.back .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector {\n  list-style-type: none;\n  text-indent: none;\n  display: flex;\n  flex-direction: column;\n  margin: 0.5em;\n  margin-top: 0;\n}\nul.option-selector li {\n  flex: 1 1 auto;\n  padding: 0.5em;\n  padding-left: 3em;\n  position: relative;\n  color: #fff;\n  background: #3cb8ea;\n  text-shadow: 0 0 1px #093c51;\n  border-bottom: 1px #81d1f1 solid;\n}\nul.option-selector li.active {\n  color: #ffffff;\n  background: #1381ad;\n  text-shadow: 0 0 1px #041a23;\n}\nul.option-selector li .icon {\n  filter: drop-shadow(0 0 1px #093c51);\n  position: absolute;\n  left: 0.5em;\n  top: 0.5em;\n  bottom: 0.5em;\n  width: 2em;\n}\nul.option-selector li .icon svg path,\nul.option-selector li .icon svg line,\nul.option-selector li .icon svg circle {\n  stroke: #fff;\n  fill: transparent;\n}\nul.option-selector li .icon.hflip svg {\n  transform: scale(-1, 1);\n}\nul.option-selector li .label {\n  font-size: 0.9em;\n}\nul.option-selector li .extra {\n  font-size: 0.65em;\n  font-style: italic;\n}\nul.option-selector li .extra:before {\n  content: '\"';\n}\nul.option-selector li .extra:after {\n  content: '\"';\n}\n.result-display {\n  color: #555;\n  font-size: 2.5em;\n  display: block;\n  width: 4em;\n  height: 4em;\n  border-radius: 2em;\n  border: 3px #555 solid;\n  background: #fff;\n  text-align: center;\n  line-height: 3.8em;\n  box-sizing: border-box;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 1em;\n}\n");

function h(name, props) {
  var node;
  var rest = [];
  var children = [];
  var length = arguments.length;

  while (length-- > 2) rest.push(arguments[length]);

  while (rest.length) {
    if (Array.isArray((node = rest.pop()))) {
      for (length = node.length; length--; ) {
        rest.push(node[length]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node);
    }
  }

  return typeof name === "function"
    ? name(props || {}, children)
    : {
        name: name,
        props: props || {},
        children: children
      }
}

function app(state, actions, view, container) {
  var renderLock;
  var invokeLaterStack = [];
  var rootElement = (container && container.children[0]) || null;
  var lastNode = rootElement && toVNode(rootElement, [].map);
  var globalState = copy(state);
  var wiredActions = copy(actions);

  scheduleRender(wireStateToActions([], globalState, wiredActions));

  return wiredActions

  function toVNode(element, map) {
    return {
      name: element.nodeName.toLowerCase(),
      props: {},
      children: map.call(element.childNodes, function(element) {
        return element.nodeType === 3
          ? element.nodeValue
          : toVNode(element, map)
      })
    }
  }

  function render() {
    renderLock = !renderLock;

    var next = view(globalState, wiredActions);
    if (container && !renderLock) {
      rootElement = patch(container, rootElement, lastNode, (lastNode = next));
    }

    while ((next = invokeLaterStack.pop())) next();
  }

  function scheduleRender() {
    if (!renderLock) {
      renderLock = !renderLock;
      setTimeout(render);
    }
  }

  function copy(target, source) {
    var obj = {};

    for (var i in target) obj[i] = target[i];
    for (var i in source) obj[i] = source[i];

    return obj
  }

  function set(path, value, source) {
    var target = {};
    if (path.length) {
      target[path[0]] =
        path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value;
      return copy(source, target)
    }
    return value
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]];
    }
    return source
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ? (function(key, action) {
            actions[key] = function(data) {
              if (typeof (data = action(data)) === "function") {
                data = data(get(path, globalState), actions);
              }

              if (
                data &&
                data !== (state = get(path, globalState)) &&
                !data.then // Promise
              ) {
                scheduleRender(
                  (globalState = set(path, copy(state, data), globalState))
                );
              }

              return data
            };
          })(key, actions[key])
        : wireStateToActions(
            path.concat(key),
            (state[key] = state[key] || {}),
            (actions[key] = copy(actions[key]))
          );
    }
  }

  function getKey(node) {
    return node && node.props ? node.props.key : null
  }

  function setElementProp(element, name, value, isSVG, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in copy(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i];
      }
    } else {
      if (typeof value === "function" || (name in element && !isSVG)) {
        element[name] = value == null ? "" : value;
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }

      if (value == null || value === false) {
        element.removeAttribute(name);
      }
    }
  }

  function createElement(node, isSVG) {
    var element =
      typeof node === "string" || typeof node === "number"
        ? document.createTextNode(node)
        : (isSVG = isSVG || node.name === "svg")
          ? document.createElementNS("http://www.w3.org/2000/svg", node.name)
          : document.createElement(node.name);

    if (node.props) {
      if (node.props.oncreate) {
        invokeLaterStack.push(function() {
          node.props.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG));
      }

      for (var name in node.props) {
        setElementProp(element, name, node.props[name], isSVG);
      }
    }

    return element
  }

  function updateElement(element, oldProps, props, isSVG) {
    for (var name in copy(oldProps, props)) {
      if (
        props[name] !==
        (name === "value" || name === "checked"
          ? element[name]
          : oldProps[name])
      ) {
        setElementProp(element, name, props[name], isSVG, oldProps[name]);
      }
    }

    if (props.onupdate) {
      invokeLaterStack.push(function() {
        props.onupdate(element, oldProps);
      });
    }
  }

  function removeChildren(element, node, props) {
    if ((props = node.props)) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }

      if (props.ondestroy) {
        props.ondestroy(element);
      }
    }
    return element
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }

    if (node.props && (cb = node.props.onremove)) {
      cb(element, done);
    } else {
      done();
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {
    } else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element);
    } else if (node.name && node.name === oldNode.name) {
      updateElement(
        element,
        oldNode.props,
        node.props,
        (isSVG = isSVG || node.name === "svg")
      );

      var oldElements = [];
      var oldKeyed = {};
      var newKeyed = {};

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i];

        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < node.children.length) {
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKey(oldChild);
        var newKey = getKey(newChild);

        if (newKeyed[oldKey]) {
          i++;
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG);
            j++;
          }
          i++;
        } else {
          var recyledNode = oldKeyed[newKey] || [];

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG);
            i++;
          } else if (recyledNode[0]) {
            patch(
              element,
              element.insertBefore(recyledNode[0], oldElements[i]),
              recyledNode[1],
              newChild,
              isSVG
            );
          } else {
            patch(element, oldElements[i], null, newChild, isSVG);
          }

          j++;
          newKeyed[newKey] = newChild;
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i];
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild);
        }
        i++;
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].props.key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    } else if (node.name === oldNode.name) {
      element.nodeValue = node;
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      );
      removeElement(parent, nextSibling, oldNode);
    }
    return element
  }
}

const state = {
    current: 0,
    sum: 0,
    count: 0,
};

const actions = {

    set: vote => ({current: vote}),

    commit: _ => ({current, sum, count}) => {
        if (current === 0) return
        return {
            sum: sum + current,
            count: count + 1,
            current: 0
        }
    },

    reset: _ => ({
        sum: 0,
        count: 0,
        current: 0
    })

};

const state$1 = {
    current: 'initial',
    direction: null,
};

const actions$1 = {
    goTo: ([current, direction]) => ({current, direction})
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

var NavButton = ({goTo, target, direction, text, extra, onGo}) => {
    return Button(
        {
            cls: `nav-button ${direction}`,
            action: _ => {
                if (onGo) onGo();
                goTo([target, direction]);
            },
        },
        [
            Chevron({direction}),
            h('p', {class: 'button-text-extra'}, [extra]),
            h('p', {class: 'button-text-main'}, [text])
        ]
    )
};

addEventListener('resize', updateAllTracked);
addEventListener('scroll', updateAllTracked);

var trackingRegistry = [];

function removeElement (el) {
    el.parentNode.removeChild(el);
}

function setStyle (el, props) {
    Object.keys(props)
    .forEach(function (name) {
        el.style[name] = props[name];
    });
}

function registerTracking (el) {
    if (trackingRegistry.indexOf(el) > -1 ) return
    updateTracking(el);
    trackingRegistry.push(el);
}

function unregisterTracking(el) {
    var i = trackingRegistry.indexOf(el);
    if (i === -1) return
    trackingRegistry.splice(i, 1);
}

function updateAllTracked () {
    trackingRegistry.forEach(updateTracking);  
} 

function invertLastMove (el) {
    var x = el._x;
    var y = el._y;
    if (!x) return 'translate(0, 0)'
    var n = updateTracking(el);
    var dx = Math.floor(x - n.x);
    var dy = Math.floor(y - n.y);
    return 'translate(' + dx + 'px, ' + dy + 'px)'
}

function updateTracking (el) {
    var rect = el.getBoundingClientRect();
    el._x = rect.left;
    el._y = rect.top;
    return {x: rect.left, y: rect.top}
}

function runTransition (el, props, before, after, ondone) {
    var easing = props.easing || 'linear';
    var time = props.time || 300;
    var delay = props.delay || 0;
    setStyle(el, before);
    setTimeout(function () {
        requestAnimationFrame(function () {
            setStyle(el, after);
            el.style.transition = 'all ' + easing + ' ' + time + 'ms';
            setTimeout(function () {
                el.style.transition = null;
                ondone && ondone();
            }, time);
        });
    }, delay);
}

function runEnter (el, props, css) {
    if (typeof css === 'function') css = css();
    runTransition(
        el, props,
        css,
        Object.keys(css).reduce(function (o, n) {
            o[n] = null;
            return o
        }, {}),
        function () { updateTracking(el); }
    );
}

function runMove (el, props) {
    runTransition(
        el, props,
        {transform: invertLastMove(el)},
        {transform: null}
    );
}

function runExit (el, props, css, done) {
    if (typeof css === 'function') css = css();
    unregisterTracking(el);
    var translation = invertLastMove(el);
    css.transform = translation + (css.transform ? (' ' + css.transform) : '');
    runTransition(
        el, props,
        {transform: translation},
        css,
        done
    );
}
    
function noop () {}
    
function composeHandlers (f1, f2) {
    if (!f1) return f2
    if (!f2) return f1
    return function (el, done) {
        f1 && f1(el, done);
        f2 && f2(el, done);
        return noop
    }
}

function transitionComponent (handlersFn) {
    return function (props, children) {
        var handlers = handlersFn(props || {});
        return children
        .filter(function (child) { return !!child.props})
        .map(function (child) {
            ['oncreate', 'onupdate', 'onremove'].forEach(function (n) {
                child.props[n] = composeHandlers(child.props[n], handlers[n]);
            });  
            return child
        })
    }
}

var _track = transitionComponent(function (props) { 
    return {oncreate: function (el) { registerTracking(el);} }
});

var _move = transitionComponent(function (props) { 
    return { onupdate: function (el) { runMove(el, props); } }
});

var _exit = transitionComponent(function (props) {
    return {
        onremove: function (el, done) {
            done = done || function () { removeElement(el); };
            runExit(el, props, props.css || {}, !props.keep && done);
        }
    }
});

var enter = transitionComponent(function (props) {
    return { oncreate: function (el) { runEnter(el, props, props.css || {}); } }
});

var exit = function (props, children) {
    return _exit(props, _track(null, children))
};

const cache = {
    direction: null
};

const TxTranslation = {
    enter: {
        back: '-110%',
        forward: '110%',
    },
    exit: {
        back: '110%',
        forward: '-110%',
    }
};

const getTxCSS = inOrOut => _ => ({
    transform: `translateX(${TxTranslation[inOrOut][cache.direction]})`
});


var Page = ({name, direction, next}, children) => {
    cache.direction = direction;
    return enter(
        {
            css: getTxCSS('enter'),
            easing: 'ease-in-out',
            time: 400
        },
        exit(
            {
                css: getTxCSS('exit'),
                easing: 'ease-in-out',
                time: 400
            },
            [
                h(
                    'div',
                    {
                        class: 'page',
                        key: name
                    },
                    [].concat(children, NavButton(next))
                )
            ]
        )
    )[0]
};

var initial = ({navigation, votes}) => Page(
    {
        name: 'initial',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
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

var start = ({navigation, votes}) => Page(
    {
        name: 'start',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
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

var vote = ({navigation, votes}) => Page({
        name: 'vote',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'pass',
            direction: 'forward',
            extra: "Make your selection, then tap here to...",
            text: "Cast Vote",
            onGo: votes.actions.commit,
        }
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter({
            value: votes.state.current,
            set: votes.actions.set
        })
    ]
);

var pass = ({navigation, votes}) => Page(
    {
        name: 'pass',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'vote',
            direction: 'back',
            extra: "Are you the next person? Tap here to...",
            text: "Vote",
        }
    },
    [
        NavButton({
            goTo: navigation.actions.goTo,
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

var result = ({navigation, votes}) => Page(
    {
        name: 'result',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
            onGo: votes.actions.reset,
        }
    },
    [
        Panel({}, [
            'Happiness Index',
            Result({
                count: votes.state.count,
                sum: votes.state.sum,
            })
        ])
    ]
);

var reset = ({navigation, votes}) => Page(
    {
        name: 'reset',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'start',
            direction: 'back',
            extra: 'Tap here to...',
            text: 'Start again',
        }
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result({
                count: votes.state.count,
                sum: votes.state.sum,
            })
        ])
    ]
);

const pages = {initial, start, vote, pass, result, reset};
var Pages = ({votes, navigation}) => pages[navigation.state.current]({votes, navigation});

app(
    //STATE
    {
        votes: state,
        navigation: state$1
    },

    //ACTIONS
    {
        votes: actions,
        navigation: actions$1
    },

    //VIEW
    (state$$1, actions$$1) => AppContainer({}, Pages({
        votes: {state: state$$1.votes, actions: actions$$1.votes},
        navigation: {state: state$$1.navigation, actions: actions$$1.navigation}
    })),

    //CONTAINER
    document.body
);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9oeXBlcmFwcC9zcmMvaW5kZXguanMiLCIuLi9zcmMvdm90ZXMuanMiLCIuLi9zcmMvbmF2aWdhdGlvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2FwcC1jb250YWluZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9wYW5lbC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RhZ3MuanMiLCIuLi9zcmMvY29tcG9uZW50cy9idXR0b24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9pY29uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2hldnJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25hdmJ1dHRvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9oeXBlcmFwcC10cmFuc2l0aW9ucy9zcmMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9wYWdlLmpzIiwiLi4vc3JjL3BhZ2VzL2luaXRpYWwuanMiLCIuLi9zcmMvcGFnZXMvc3RhcnQuanMiLCIuLi9zcmMvY29tcG9uZW50cy92b3Rlci5qcyIsIi4uL3NyYy9wYWdlcy92b3RlLmpzIiwiLi4vc3JjL3BhZ2VzL3Bhc3MuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZXN1bHQuanMiLCIuLi9zcmMvcGFnZXMvcmVzdWx0LmpzIiwiLi4vc3JjL3BhZ2VzL3Jlc2V0LmpzIiwiLi4vc3JjL3BhZ2VzL2luZGV4LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBoKG5hbWUsIHByb3BzKSB7XG4gIHZhciBub2RlXG4gIHZhciByZXN0ID0gW11cbiAgdmFyIGNoaWxkcmVuID0gW11cbiAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICB3aGlsZSAobGVuZ3RoLS0gPiAyKSByZXN0LnB1c2goYXJndW1lbnRzW2xlbmd0aF0pXG5cbiAgd2hpbGUgKHJlc3QubGVuZ3RoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoKG5vZGUgPSByZXN0LnBvcCgpKSkpIHtcbiAgICAgIGZvciAobGVuZ3RoID0gbm9kZS5sZW5ndGg7IGxlbmd0aC0tOyApIHtcbiAgICAgICAgcmVzdC5wdXNoKG5vZGVbbGVuZ3RoXSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUgIT0gbnVsbCAmJiBub2RlICE9PSB0cnVlICYmIG5vZGUgIT09IGZhbHNlKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCJcbiAgICA/IG5hbWUocHJvcHMgfHwge30sIGNoaWxkcmVuKVxuICAgIDoge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBwcm9wczogcHJvcHMgfHwge30sXG4gICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwKHN0YXRlLCBhY3Rpb25zLCB2aWV3LCBjb250YWluZXIpIHtcbiAgdmFyIHJlbmRlckxvY2tcbiAgdmFyIGludm9rZUxhdGVyU3RhY2sgPSBbXVxuICB2YXIgcm9vdEVsZW1lbnQgPSAoY29udGFpbmVyICYmIGNvbnRhaW5lci5jaGlsZHJlblswXSkgfHwgbnVsbFxuICB2YXIgbGFzdE5vZGUgPSByb290RWxlbWVudCAmJiB0b1ZOb2RlKHJvb3RFbGVtZW50LCBbXS5tYXApXG4gIHZhciBnbG9iYWxTdGF0ZSA9IGNvcHkoc3RhdGUpXG4gIHZhciB3aXJlZEFjdGlvbnMgPSBjb3B5KGFjdGlvbnMpXG5cbiAgc2NoZWR1bGVSZW5kZXIod2lyZVN0YXRlVG9BY3Rpb25zKFtdLCBnbG9iYWxTdGF0ZSwgd2lyZWRBY3Rpb25zKSlcblxuICByZXR1cm4gd2lyZWRBY3Rpb25zXG5cbiAgZnVuY3Rpb24gdG9WTm9kZShlbGVtZW50LCBtYXApIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgcHJvcHM6IHt9LFxuICAgICAgY2hpbGRyZW46IG1hcC5jYWxsKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlVHlwZSA9PT0gM1xuICAgICAgICAgID8gZWxlbWVudC5ub2RlVmFsdWVcbiAgICAgICAgICA6IHRvVk5vZGUoZWxlbWVudCwgbWFwKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmVuZGVyTG9jayA9ICFyZW5kZXJMb2NrXG5cbiAgICB2YXIgbmV4dCA9IHZpZXcoZ2xvYmFsU3RhdGUsIHdpcmVkQWN0aW9ucylcbiAgICBpZiAoY29udGFpbmVyICYmICFyZW5kZXJMb2NrKSB7XG4gICAgICByb290RWxlbWVudCA9IHBhdGNoKGNvbnRhaW5lciwgcm9vdEVsZW1lbnQsIGxhc3ROb2RlLCAobGFzdE5vZGUgPSBuZXh0KSlcbiAgICB9XG5cbiAgICB3aGlsZSAoKG5leHQgPSBpbnZva2VMYXRlclN0YWNrLnBvcCgpKSkgbmV4dCgpXG4gIH1cblxuICBmdW5jdGlvbiBzY2hlZHVsZVJlbmRlcigpIHtcbiAgICBpZiAoIXJlbmRlckxvY2spIHtcbiAgICAgIHJlbmRlckxvY2sgPSAhcmVuZGVyTG9ja1xuICAgICAgc2V0VGltZW91dChyZW5kZXIpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29weSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB7fVxuXG4gICAgZm9yICh2YXIgaSBpbiB0YXJnZXQpIG9ialtpXSA9IHRhcmdldFtpXVxuICAgIGZvciAodmFyIGkgaW4gc291cmNlKSBvYmpbaV0gPSBzb3VyY2VbaV1cblxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChwYXRoLCB2YWx1ZSwgc291cmNlKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG4gICAgaWYgKHBhdGgubGVuZ3RoKSB7XG4gICAgICB0YXJnZXRbcGF0aFswXV0gPVxuICAgICAgICBwYXRoLmxlbmd0aCA+IDEgPyBzZXQocGF0aC5zbGljZSgxKSwgdmFsdWUsIHNvdXJjZVtwYXRoWzBdXSkgOiB2YWx1ZVxuICAgICAgcmV0dXJuIGNvcHkoc291cmNlLCB0YXJnZXQpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KHBhdGgsIHNvdXJjZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgc291cmNlID0gc291cmNlW3BhdGhbaV1dXG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHdpcmVTdGF0ZVRvQWN0aW9ucyhwYXRoLCBzdGF0ZSwgYWN0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiBhY3Rpb25zKSB7XG4gICAgICB0eXBlb2YgYWN0aW9uc1trZXldID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyAoZnVuY3Rpb24oa2V5LCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbnNba2V5XSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSA9IGFjdGlvbihkYXRhKSkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhKGdldChwYXRoLCBnbG9iYWxTdGF0ZSksIGFjdGlvbnMpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZGF0YSAmJlxuICAgICAgICAgICAgICAgIGRhdGEgIT09IChzdGF0ZSA9IGdldChwYXRoLCBnbG9iYWxTdGF0ZSkpICYmXG4gICAgICAgICAgICAgICAgIWRhdGEudGhlbiAvLyBQcm9taXNlXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlUmVuZGVyKFxuICAgICAgICAgICAgICAgICAgKGdsb2JhbFN0YXRlID0gc2V0KHBhdGgsIGNvcHkoc3RhdGUsIGRhdGEpLCBnbG9iYWxTdGF0ZSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KShrZXksIGFjdGlvbnNba2V5XSlcbiAgICAgICAgOiB3aXJlU3RhdGVUb0FjdGlvbnMoXG4gICAgICAgICAgICBwYXRoLmNvbmNhdChrZXkpLFxuICAgICAgICAgICAgKHN0YXRlW2tleV0gPSBzdGF0ZVtrZXldIHx8IHt9KSxcbiAgICAgICAgICAgIChhY3Rpb25zW2tleV0gPSBjb3B5KGFjdGlvbnNba2V5XSkpXG4gICAgICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5wcm9wcyA/IG5vZGUucHJvcHMua2V5IDogbnVsbFxuICB9XG5cbiAgZnVuY3Rpb24gc2V0RWxlbWVudFByb3AoZWxlbWVudCwgbmFtZSwgdmFsdWUsIGlzU1ZHLCBvbGRWYWx1ZSkge1xuICAgIGlmIChuYW1lID09PSBcImtleVwiKSB7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgIGZvciAodmFyIGkgaW4gY29weShvbGRWYWx1ZSwgdmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnRbbmFtZV1baV0gPSB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlW2ldID09IG51bGwgPyBcIlwiIDogdmFsdWVbaV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IChuYW1lIGluIGVsZW1lbnQgJiYgIWlzU1ZHKSkge1xuICAgICAgICBlbGVtZW50W25hbWVdID0gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlLCBpc1NWRykge1xuICAgIHZhciBlbGVtZW50ID1cbiAgICAgIHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBub2RlID09PSBcIm51bWJlclwiXG4gICAgICAgID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcbiAgICAgICAgOiAoaXNTVkcgPSBpc1NWRyB8fCBub2RlLm5hbWUgPT09IFwic3ZnXCIpXG4gICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBub2RlLm5hbWUpXG4gICAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUubmFtZSlcblxuICAgIGlmIChub2RlLnByb3BzKSB7XG4gICAgICBpZiAobm9kZS5wcm9wcy5vbmNyZWF0ZSkge1xuICAgICAgICBpbnZva2VMYXRlclN0YWNrLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm9kZS5wcm9wcy5vbmNyZWF0ZShlbGVtZW50KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KG5vZGUuY2hpbGRyZW5baV0sIGlzU1ZHKSlcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgbmFtZSBpbiBub2RlLnByb3BzKSB7XG4gICAgICAgIHNldEVsZW1lbnRQcm9wKGVsZW1lbnQsIG5hbWUsIG5vZGUucHJvcHNbbmFtZV0sIGlzU1ZHKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVFbGVtZW50KGVsZW1lbnQsIG9sZFByb3BzLCBwcm9wcywgaXNTVkcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIGNvcHkob2xkUHJvcHMsIHByb3BzKSkge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wc1tuYW1lXSAhPT1cbiAgICAgICAgKG5hbWUgPT09IFwidmFsdWVcIiB8fCBuYW1lID09PSBcImNoZWNrZWRcIlxuICAgICAgICAgID8gZWxlbWVudFtuYW1lXVxuICAgICAgICAgIDogb2xkUHJvcHNbbmFtZV0pXG4gICAgICApIHtcbiAgICAgICAgc2V0RWxlbWVudFByb3AoZWxlbWVudCwgbmFtZSwgcHJvcHNbbmFtZV0sIGlzU1ZHLCBvbGRQcm9wc1tuYW1lXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvcHMub251cGRhdGUpIHtcbiAgICAgIGludm9rZUxhdGVyU3RhY2sucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvcHMub251cGRhdGUoZWxlbWVudCwgb2xkUHJvcHMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKGVsZW1lbnQsIG5vZGUsIHByb3BzKSB7XG4gICAgaWYgKChwcm9wcyA9IG5vZGUucHJvcHMpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4oZWxlbWVudC5jaGlsZE5vZGVzW2ldLCBub2RlLmNoaWxkcmVuW2ldKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25kZXN0cm95KSB7XG4gICAgICAgIHByb3BzLm9uZGVzdHJveShlbGVtZW50KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChwYXJlbnQsIGVsZW1lbnQsIG5vZGUsIGNiKSB7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChyZW1vdmVDaGlsZHJlbihlbGVtZW50LCBub2RlKSlcbiAgICB9XG5cbiAgICBpZiAobm9kZS5wcm9wcyAmJiAoY2IgPSBub2RlLnByb3BzLm9ucmVtb3ZlKSkge1xuICAgICAgY2IoZWxlbWVudCwgZG9uZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZSgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGF0Y2gocGFyZW50LCBlbGVtZW50LCBvbGROb2RlLCBub2RlLCBpc1NWRywgbmV4dFNpYmxpbmcpIHtcbiAgICBpZiAobm9kZSA9PT0gb2xkTm9kZSkge1xuICAgIH0gZWxzZSBpZiAob2xkTm9kZSA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVFbGVtZW50KG5vZGUsIGlzU1ZHKSwgZWxlbWVudClcbiAgICB9IGVsc2UgaWYgKG5vZGUubmFtZSAmJiBub2RlLm5hbWUgPT09IG9sZE5vZGUubmFtZSkge1xuICAgICAgdXBkYXRlRWxlbWVudChcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgb2xkTm9kZS5wcm9wcyxcbiAgICAgICAgbm9kZS5wcm9wcyxcbiAgICAgICAgKGlzU1ZHID0gaXNTVkcgfHwgbm9kZS5uYW1lID09PSBcInN2Z1wiKVxuICAgICAgKVxuXG4gICAgICB2YXIgb2xkRWxlbWVudHMgPSBbXVxuICAgICAgdmFyIG9sZEtleWVkID0ge31cbiAgICAgIHZhciBuZXdLZXllZCA9IHt9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBvbGRFbGVtZW50c1tpXSA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXVxuXG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgdmFyIG9sZEtleSA9IGdldEtleShvbGRDaGlsZClcblxuICAgICAgICBpZiAobnVsbCAhPSBvbGRLZXkpIHtcbiAgICAgICAgICBvbGRLZXllZFtvbGRLZXldID0gW29sZEVsZW1lbnRzW2ldLCBvbGRDaGlsZF1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaSA9IDBcbiAgICAgIHZhciBqID0gMFxuXG4gICAgICB3aGlsZSAoaiA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgdmFyIG5ld0NoaWxkID0gbm9kZS5jaGlsZHJlbltqXVxuXG4gICAgICAgIHZhciBvbGRLZXkgPSBnZXRLZXkob2xkQ2hpbGQpXG4gICAgICAgIHZhciBuZXdLZXkgPSBnZXRLZXkobmV3Q2hpbGQpXG5cbiAgICAgICAgaWYgKG5ld0tleWVkW29sZEtleV0pIHtcbiAgICAgICAgICBpKytcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0tleSA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKG9sZEtleSA9PSBudWxsKSB7XG4gICAgICAgICAgICBwYXRjaChlbGVtZW50LCBvbGRFbGVtZW50c1tpXSwgb2xkQ2hpbGQsIG5ld0NoaWxkLCBpc1NWRylcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKytcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVjeWxlZE5vZGUgPSBvbGRLZXllZFtuZXdLZXldIHx8IFtdXG5cbiAgICAgICAgICBpZiAob2xkS2V5ID09PSBuZXdLZXkpIHtcbiAgICAgICAgICAgIHBhdGNoKGVsZW1lbnQsIHJlY3lsZWROb2RlWzBdLCByZWN5bGVkTm9kZVsxXSwgbmV3Q2hpbGQsIGlzU1ZHKVxuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgfSBlbHNlIGlmIChyZWN5bGVkTm9kZVswXSkge1xuICAgICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKHJlY3lsZWROb2RlWzBdLCBvbGRFbGVtZW50c1tpXSksXG4gICAgICAgICAgICAgIHJlY3lsZWROb2RlWzFdLFxuICAgICAgICAgICAgICBuZXdDaGlsZCxcbiAgICAgICAgICAgICAgaXNTVkdcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0Y2goZWxlbWVudCwgb2xkRWxlbWVudHNbaV0sIG51bGwsIG5ld0NoaWxkLCBpc1NWRylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqKytcbiAgICAgICAgICBuZXdLZXllZFtuZXdLZXldID0gbmV3Q2hpbGRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaSA8IG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZE5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgaWYgKGdldEtleShvbGRDaGlsZCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoZWxlbWVudCwgb2xkRWxlbWVudHNbaV0sIG9sZENoaWxkKVxuICAgICAgICB9XG4gICAgICAgIGkrK1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpIGluIG9sZEtleWVkKSB7XG4gICAgICAgIGlmICghbmV3S2V5ZWRbb2xkS2V5ZWRbaV1bMV0ucHJvcHMua2V5XSkge1xuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoZWxlbWVudCwgb2xkS2V5ZWRbaV1bMF0sIG9sZEtleWVkW2ldWzFdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLm5hbWUgPT09IG9sZE5vZGUubmFtZSkge1xuICAgICAgZWxlbWVudC5ub2RlVmFsdWUgPSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQgPSBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICBjcmVhdGVFbGVtZW50KG5vZGUsIGlzU1ZHKSxcbiAgICAgICAgKG5leHRTaWJsaW5nID0gZWxlbWVudClcbiAgICAgIClcbiAgICAgIHJlbW92ZUVsZW1lbnQocGFyZW50LCBuZXh0U2libGluZywgb2xkTm9kZSlcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHN0YXRlID0ge1xuICAgIGN1cnJlbnQ6IDAsXG4gICAgc3VtOiAwLFxuICAgIGNvdW50OiAwLFxufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcblxuICAgIHNldDogdm90ZSA9PiAoe2N1cnJlbnQ6IHZvdGV9KSxcblxuICAgIGNvbW1pdDogXyA9PiAoe2N1cnJlbnQsIHN1bSwgY291bnR9KSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSAwKSByZXR1cm5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1bTogc3VtICsgY3VycmVudCxcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCArIDEsXG4gICAgICAgICAgICBjdXJyZW50OiAwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzZXQ6IF8gPT4gKHtcbiAgICAgICAgc3VtOiAwLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgY3VycmVudDogMFxuICAgIH0pXG5cbn1cbiIsImV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcbiAgICBjdXJyZW50OiAnaW5pdGlhbCcsXG4gICAgZGlyZWN0aW9uOiBudWxsLFxufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgICBnb1RvOiAoW2N1cnJlbnQsIGRpcmVjdGlvbl0pID0+ICh7Y3VycmVudCwgZGlyZWN0aW9ufSlcbn1cbiIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5leHBvcnQgZGVmYXVsdCAocHJvcHMsIGNoaWxkcmVuKSA9PiBoKCdkaXYnLCB7Y2xhc3M6ICdhcHAtY29udGFpbmVyJ30sIGNoaWxkcmVuKSIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5leHBvcnQgZGVmYXVsdCAocHJvcHMsIGNoaWxkcmVuKSA9PiBoKCdkaXYnLCB7J2NsYXNzJzogJ3BhbmVsJ30sIGNoaWxkcmVuKVxuIiwiaW1wb3J0IHtofSBmcm9tICdoeXBlcmFwcCdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0YWdzKSB7XG4gICAgcmV0dXJuIHRhZ3MucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpLm1hcCh0YWdOYW1lID0+IChwcm9wcywgY2hpbGRyZW4pID0+IHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgcHJvcHMgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHByb3BzKSkgXG4gICAgICAgID8gaCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG4gICAgICAgIDogaCh0YWdOYW1lLCB7fSwgcHJvcHMpXG4gICAgfSkgICBcbn0iLCJpbXBvcnQgdGFncyBmcm9tICcuL3RhZ3MnXG5jb25zdCBbYnV0dG9uXSA9IHRhZ3MoJ2J1dHRvbicpXG5cbmNvbnN0IG9uQWN0aXZhdGUgPSBhY3Rpb24gPT4gZXYgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KHRydWUpXG4gICAgZXYuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIGFjdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7Y2xzLCBhY3Rpb259LCBjaGlsZHJlbikgPT4gYnV0dG9uKHtcbiAgICBjbGFzczogY2xzLFxuICAgIG9udG91Y2hzdGFydDogb25BY3RpdmF0ZShhY3Rpb24pLFxuICAgIG9ubW91c2Vkb3duOiBvbkFjdGl2YXRlKGFjdGlvbilcbn0sIGNoaWxkcmVuKVxuXG4iLCJpbXBvcnQgdGFncyBmcm9tICcuL3RhZ3MnXG5jb25zdCBbZGl2LCBfc3ZnLCBwYXRoLCBjaXJjbGUsIGxpbmVdID0gdGFncygnZGl2LCBzdmcsIHBhdGgsIGNpcmNsZSwgbGluZScpXG5cbmNvbnN0IHN2ZyA9IChwcm9wcywgY2hpbGRyZW4pID0+IHtcbiAgICBwcm9wcy53aWR0aCA9ICcxMDAlJyxcbiAgICBwcm9wcy5oZWlnaHQgPSAnMTAwJScsXG4gICAgcHJvcHMueG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgcmV0dXJuIF9zdmcocHJvcHMsIGNoaWxkcmVuKVxufVxuXG5jb25zdCBmU3ZnID0gY2hpbGRyZW4gPT4gc3ZnKHt2aWV3Qm94OiAnLTUwIC01MCAxMDAgMTAwJ30sIGNoaWxkcmVuKVxuY29uc3QgW2ZDaXJjbGUsIGZMaW5lLCBmUGF0aF0gPSAodGFncyA9PiB0YWdzLm1hcCh0YWcgPT4gcHJvcHMgPT4ge1xuICAgIHByb3BzLmZpbGwgPSAndHJhbnNwYXJlbnQnXG4gICAgcHJvcHNbJ3N0cm9rZS13aWR0aCddID0gNVxuICAgIHByb3BzWydzdHJva2UtbGluZWNhcCddID0gJ3JvdW5kJ1xuICAgIHJldHVybiB0YWcocHJvcHMpXG59KSkoW2NpcmNsZSwgbGluZSwgcGF0aF0pXG5cbmNvbnN0IGljb25zID0ge1xuICAgIFxuICAgIGNoZXZyb246IHN2Zyh7dmlld0JveDogJy0xMCAtMjAgMjAgNDAnfSwgW1xuICAgICAgICBwYXRoKHtcbiAgICAgICAgICAgIGQ6ICdNIC03IC0xNyBMIDcgMCBMIC03IDE3JyxcbiAgICAgICAgICAgICdzdHJva2UtbGluZWNhcCc6ICdidXR0JyxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAnMydcbiAgICAgICAgfSlcbiAgICBdKSxcbiAgICBcbiAgICBub0ZhY2U6IGZTdmcoWyBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwfSkgXSksXG5cbiAgICB2ZXJ5SGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmTGluZSh7eDE6IC0xOCwgeTE6IC0xMCwgeDI6IC04LCB5MjogLTE4fSksXG4gICAgICAgIGZMaW5lKHt4MTogMTgsIHkxOiAtMTAsIHgyOiA4LCB5MjogLTE4fSksXG4gICAgICAgIGZQYXRoKHtkOiAnTSAtMTUgMTUgQyAwIDIwIDAgMjAgMTUgMTUnfSksXG4gICAgXSksXG4gICAgXG4gICAgaGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogLTE1LCBjeTogLTgsIHI6IDJ9KSxcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDE1LCBjeTogLTgsIHI6IDJ9KSxcbiAgICAgICAgZlBhdGgoe2Q6ICdNIC0xNSAxNSBDIDAgMjAgMCAyMCAxNSAxNSd9KSxcbiAgICBdKSxcblxuICAgIHVuY2VydGFpbkZhY2U6IGZTdmcoW1xuICAgICAgICBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwIH0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogLTE1LCBjeTogLTgsIHI6IDIgfSksXG4gICAgICAgIGZDaXJjbGUoe2N4OiAxNSwgY3k6IC04LCByOiAyfSksXG4gICAgICAgIGZMaW5lKHt4MTogLTgsIHkxOiAxNSwgeDI6IDgsIHkyOiAxNX0pLFxuICAgIF0pLFxuXG4gICAgdW5oYXBweUZhY2U6IGZTdmcoW1xuICAgICAgICBmQ2lyY2xlKHtjeDogMCwgY3k6IDAsIHI6IDQwfSksXG4gICAgICAgIGZDaXJjbGUoe2N4OiAtMTUsIGN5OiAtOCwgcjogMn0pLFxuICAgICAgICBmQ2lyY2xlKHtjeDogMTUsIGN5OiAtOCwgcjogMn0pLFxuICAgICAgICBmUGF0aCh7ZDogJ00gLTE1IDE1IEMgMCAxMCAwIDEwIDE1IDE1J30pLFxuICAgIF0pLFxuXG4gICAgdmVyeVVuaGFwcHlGYWNlOiBmU3ZnKFtcbiAgICAgICAgZkNpcmNsZSh7Y3g6IDAsIGN5OiAwLCByOiA0MH0pLFxuICAgICAgICBmTGluZSh7eDE6IC0xNSwgeTE6IC03LCB4MjogLTgsIHkyOiAtMTV9KSxcbiAgICAgICAgZkxpbmUoe3gxOiAtOCwgeTE6IC0xNSwgeDI6IC0xNSwgIHkyOiAtMTh9KSxcbiAgICAgICAgZkxpbmUoe3gxOiAxNSwgeTE6IC03LCB4MjogOCwgeTI6IC0xNX0pLFxuICAgICAgICBmTGluZSh7eDE6IDgsIHkxOiAtMTUsIHgyOiAxNSwgeTI6IC0xOH0pLFxuICAgICAgICBmUGF0aCh7ZDogJ00gLTE4IDIwIEMgLTE1IDUgMTUgNSAxOCAyMCd9KSxcbiAgICBdKVxufVxuXG5leHBvcnQgZGVmYXVsdCAoe25hbWUsIGVmZmVjdH0pID0+IGRpdih7Y2xhc3M6IGBpY29uICR7ZWZmZWN0fWB9LCBbaWNvbnNbbmFtZV1dKSIsImltcG9ydCBJY29uIGZyb20gJy4vaWNvbidcbmV4cG9ydCBkZWZhdWx0ICh7ZGlyZWN0aW9ufSkgPT4gSWNvbih7XG4gICAgbmFtZTogJ2NoZXZyb24nLFxuICAgIGVmZmVjdDogKChkaXJlY3Rpb24gPT09ICdiYWNrJykgPyAnaGZsaXAnIDogJycpXG59KSIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJ1xuaW1wb3J0IENoZXZyb24gZnJvbSAnLi9jaGV2cm9uJ1xuXG5leHBvcnQgZGVmYXVsdCAoe2dvVG8sIHRhcmdldCwgZGlyZWN0aW9uLCB0ZXh0LCBleHRyYSwgb25Hb30pID0+IHtcbiAgICByZXR1cm4gQnV0dG9uKFxuICAgICAgICB7XG4gICAgICAgICAgICBjbHM6IGBuYXYtYnV0dG9uICR7ZGlyZWN0aW9ufWAsXG4gICAgICAgICAgICBhY3Rpb246IF8gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvbkdvKSBvbkdvKClcbiAgICAgICAgICAgICAgICBnb1RvKFt0YXJnZXQsIGRpcmVjdGlvbl0pXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgICBDaGV2cm9uKHtkaXJlY3Rpb259KSxcbiAgICAgICAgICAgIGgoJ3AnLCB7Y2xhc3M6ICdidXR0b24tdGV4dC1leHRyYSd9LCBbZXh0cmFdKSxcbiAgICAgICAgICAgIGgoJ3AnLCB7Y2xhc3M6ICdidXR0b24tdGV4dC1tYWluJ30sIFt0ZXh0XSlcbiAgICAgICAgXVxuICAgIClcbn0iLCJhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVBbGxUcmFja2VkKVxuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlQWxsVHJhY2tlZClcblxudmFyIHRyYWNraW5nUmVnaXN0cnkgPSBbXVxuXG5mdW5jdGlvbiByZW1vdmVFbGVtZW50IChlbCkge1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlIChlbCwgcHJvcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wcylcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBlbC5zdHlsZVtuYW1lXSA9IHByb3BzW25hbWVdXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJUcmFja2luZyAoZWwpIHtcbiAgICBpZiAodHJhY2tpbmdSZWdpc3RyeS5pbmRleE9mKGVsKSA+IC0xICkgcmV0dXJuXG4gICAgdXBkYXRlVHJhY2tpbmcoZWwpXG4gICAgdHJhY2tpbmdSZWdpc3RyeS5wdXNoKGVsKVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyVHJhY2tpbmcoZWwpIHtcbiAgICB2YXIgaSA9IHRyYWNraW5nUmVnaXN0cnkuaW5kZXhPZihlbClcbiAgICBpZiAoaSA9PT0gLTEpIHJldHVyblxuICAgIHRyYWNraW5nUmVnaXN0cnkuc3BsaWNlKGksIDEpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFsbFRyYWNrZWQgKCkge1xuICAgIHRyYWNraW5nUmVnaXN0cnkuZm9yRWFjaCh1cGRhdGVUcmFja2luZykgIFxufSBcblxuZnVuY3Rpb24gaW52ZXJ0TGFzdE1vdmUgKGVsKSB7XG4gICAgdmFyIHggPSBlbC5feFxuICAgIHZhciB5ID0gZWwuX3lcbiAgICBpZiAoIXgpIHJldHVybiAndHJhbnNsYXRlKDAsIDApJ1xuICAgIHZhciBuID0gdXBkYXRlVHJhY2tpbmcoZWwpXG4gICAgdmFyIGR4ID0gTWF0aC5mbG9vcih4IC0gbi54KVxuICAgIHZhciBkeSA9IE1hdGguZmxvb3IoeSAtIG4ueSlcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZHggKyAncHgsICcgKyBkeSArICdweCknXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYWNraW5nIChlbCkge1xuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBlbC5feCA9IHJlY3QubGVmdFxuICAgIGVsLl95ID0gcmVjdC50b3BcbiAgICByZXR1cm4ge3g6IHJlY3QubGVmdCwgeTogcmVjdC50b3B9XG59XG5cbmZ1bmN0aW9uIHJ1blRyYW5zaXRpb24gKGVsLCBwcm9wcywgYmVmb3JlLCBhZnRlciwgb25kb25lKSB7XG4gICAgdmFyIGVhc2luZyA9IHByb3BzLmVhc2luZyB8fCAnbGluZWFyJ1xuICAgIHZhciB0aW1lID0gcHJvcHMudGltZSB8fCAzMDBcbiAgICB2YXIgZGVsYXkgPSBwcm9wcy5kZWxheSB8fCAwXG4gICAgc2V0U3R5bGUoZWwsIGJlZm9yZSlcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldFN0eWxlKGVsLCBhZnRlcilcbiAgICAgICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsICcgKyBlYXNpbmcgKyAnICcgKyB0aW1lICsgJ21zJ1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IG51bGxcbiAgICAgICAgICAgICAgICBvbmRvbmUgJiYgb25kb25lKClcbiAgICAgICAgICAgIH0sIHRpbWUpXG4gICAgICAgIH0pXG4gICAgfSwgZGVsYXkpXG59XG5cbmZ1bmN0aW9uIHJ1bkVudGVyIChlbCwgcHJvcHMsIGNzcykge1xuICAgIGlmICh0eXBlb2YgY3NzID09PSAnZnVuY3Rpb24nKSBjc3MgPSBjc3MoKVxuICAgIHJ1blRyYW5zaXRpb24oXG4gICAgICAgIGVsLCBwcm9wcyxcbiAgICAgICAgY3NzLFxuICAgICAgICBPYmplY3Qua2V5cyhjc3MpLnJlZHVjZShmdW5jdGlvbiAobywgbikge1xuICAgICAgICAgICAgb1tuXSA9IG51bGxcbiAgICAgICAgICAgIHJldHVybiBvXG4gICAgICAgIH0sIHt9KSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyB1cGRhdGVUcmFja2luZyhlbCkgfVxuICAgIClcbn1cblxuZnVuY3Rpb24gcnVuTW92ZSAoZWwsIHByb3BzKSB7XG4gICAgcnVuVHJhbnNpdGlvbihcbiAgICAgICAgZWwsIHByb3BzLFxuICAgICAgICB7dHJhbnNmb3JtOiBpbnZlcnRMYXN0TW92ZShlbCl9LFxuICAgICAgICB7dHJhbnNmb3JtOiBudWxsfVxuICAgIClcbn1cblxuZnVuY3Rpb24gcnVuRXhpdCAoZWwsIHByb3BzLCBjc3MsIGRvbmUpIHtcbiAgICBpZiAodHlwZW9mIGNzcyA9PT0gJ2Z1bmN0aW9uJykgY3NzID0gY3NzKClcbiAgICB1bnJlZ2lzdGVyVHJhY2tpbmcoZWwpXG4gICAgdmFyIHRyYW5zbGF0aW9uID0gaW52ZXJ0TGFzdE1vdmUoZWwpXG4gICAgY3NzLnRyYW5zZm9ybSA9IHRyYW5zbGF0aW9uICsgKGNzcy50cmFuc2Zvcm0gPyAoJyAnICsgY3NzLnRyYW5zZm9ybSkgOiAnJylcbiAgICBydW5UcmFuc2l0aW9uKFxuICAgICAgICBlbCwgcHJvcHMsXG4gICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0aW9ufSxcbiAgICAgICAgY3NzLFxuICAgICAgICBkb25lXG4gICAgKVxufVxuICAgIFxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuICAgIFxuZnVuY3Rpb24gY29tcG9zZUhhbmRsZXJzIChmMSwgZjIpIHtcbiAgICBpZiAoIWYxKSByZXR1cm4gZjJcbiAgICBpZiAoIWYyKSByZXR1cm4gZjFcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCBkb25lKSB7XG4gICAgICAgIGYxICYmIGYxKGVsLCBkb25lKVxuICAgICAgICBmMiAmJiBmMihlbCwgZG9uZSlcbiAgICAgICAgcmV0dXJuIG5vb3BcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25Db21wb25lbnQgKGhhbmRsZXJzRm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSBoYW5kbGVyc0ZuKHByb3BzIHx8IHt9KVxuICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuICEhY2hpbGQucHJvcHN9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgWydvbmNyZWF0ZScsICdvbnVwZGF0ZScsICdvbnJlbW92ZSddLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wc1tuXSA9IGNvbXBvc2VIYW5kbGVycyhjaGlsZC5wcm9wc1tuXSwgaGFuZGxlcnNbbl0pXG4gICAgICAgICAgICB9KSAgXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbnZhciBfdHJhY2sgPSB0cmFuc2l0aW9uQ29tcG9uZW50KGZ1bmN0aW9uIChwcm9wcykgeyBcbiAgICByZXR1cm4ge29uY3JlYXRlOiBmdW5jdGlvbiAoZWwpIHsgcmVnaXN0ZXJUcmFja2luZyhlbCl9IH1cbn0pXG5cbnZhciBfbW92ZSA9IHRyYW5zaXRpb25Db21wb25lbnQoZnVuY3Rpb24gKHByb3BzKSB7IFxuICAgIHJldHVybiB7IG9udXBkYXRlOiBmdW5jdGlvbiAoZWwpIHsgcnVuTW92ZShlbCwgcHJvcHMpIH0gfVxufSlcblxudmFyIF9leGl0ID0gdHJhbnNpdGlvbkNvbXBvbmVudChmdW5jdGlvbiAocHJvcHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbnJlbW92ZTogZnVuY3Rpb24gKGVsLCBkb25lKSB7XG4gICAgICAgICAgICBkb25lID0gZG9uZSB8fCBmdW5jdGlvbiAoKSB7IHJlbW92ZUVsZW1lbnQoZWwpIH1cbiAgICAgICAgICAgIHJ1bkV4aXQoZWwsIHByb3BzLCBwcm9wcy5jc3MgfHwge30sICFwcm9wcy5rZWVwICYmIGRvbmUpXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG52YXIgZW50ZXIgPSB0cmFuc2l0aW9uQ29tcG9uZW50KGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHJldHVybiB7IG9uY3JlYXRlOiBmdW5jdGlvbiAoZWwpIHsgcnVuRW50ZXIoZWwsIHByb3BzLCBwcm9wcy5jc3MgfHwge30pIH0gfVxufSlcblxudmFyIG1vdmUgPSBmdW5jdGlvbiAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIF9tb3ZlKHByb3BzLCBfdHJhY2sobnVsbCwgY2hpbGRyZW4pKVxufVxuXG52YXIgZXhpdCA9IGZ1bmN0aW9uIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gX2V4aXQocHJvcHMsIF90cmFjayhudWxsLCBjaGlsZHJlbikpXG59XG5cbmV4cG9ydCB7ZW50ZXIsIG1vdmUsIGV4aXR9ICAgICIsImltcG9ydCB7aH0gZnJvbSAnaHlwZXJhcHAnXG5pbXBvcnQgTmF2QnV0dG9uIGZyb20gJy4vbmF2YnV0dG9uJ1xuaW1wb3J0IHtlbnRlciBhcyBUeEVudGVyLCBleGl0IGFzIFR4RXhpdH0gZnJvbSAnaHlwZXJhcHAtdHJhbnNpdGlvbnMnXG5cbmNvbnN0IGNhY2hlID0ge1xuICAgIGRpcmVjdGlvbjogbnVsbFxufVxuXG5jb25zdCBUeFRyYW5zbGF0aW9uID0ge1xuICAgIGVudGVyOiB7XG4gICAgICAgIGJhY2s6ICctMTEwJScsXG4gICAgICAgIGZvcndhcmQ6ICcxMTAlJyxcbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgYmFjazogJzExMCUnLFxuICAgICAgICBmb3J3YXJkOiAnLTExMCUnLFxuICAgIH1cbn1cblxuY29uc3QgZ2V0VHhDU1MgPSBpbk9yT3V0ID0+IF8gPT4gKHtcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7VHhUcmFuc2xhdGlvbltpbk9yT3V0XVtjYWNoZS5kaXJlY3Rpb25dfSlgXG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0ICh7bmFtZSwgZGlyZWN0aW9uLCBuZXh0fSwgY2hpbGRyZW4pID0+IHtcbiAgICBjYWNoZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICByZXR1cm4gVHhFbnRlcihcbiAgICAgICAge1xuICAgICAgICAgICAgY3NzOiBnZXRUeENTUygnZW50ZXInKSxcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgICAgIHRpbWU6IDQwMFxuICAgICAgICB9LFxuICAgICAgICBUeEV4aXQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3NzOiBnZXRUeENTUygnZXhpdCcpLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgICAgICAgICB0aW1lOiA0MDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAncGFnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW10uY29uY2F0KGNoaWxkcmVuLCBOYXZCdXR0b24obmV4dCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICApXG4gICAgKVswXVxufSIsImltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9wYWdlJ1xuXG5leHBvcnQgZGVmYXVsdCAoe25hdmlnYXRpb24sIHZvdGVzfSkgPT4gUGFnZShcbiAgICB7XG4gICAgICAgIG5hbWU6ICdpbml0aWFsJyxcbiAgICAgICAgZGlyZWN0aW9uOiBuYXZpZ2F0aW9uLnN0YXRlLmRpcmVjdGlvbixcbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ29UbzogbmF2aWdhdGlvbi5hY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICdzdGFydCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIGV4dHJhOiAnVGFwIGhlcmUgdG8uLi4nLFxuICAgICAgICAgICAgdGV4dDogJ1N0YXJ0JyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBQYW5lbCh7fSwgWydIYXBwaW5lc3MgSW5kZXggQ2FsY3VsYXRvciddKVxuICAgIF1cbilcbiIsImltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcGFnZSdcbmltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuXG5leHBvcnQgZGVmYXVsdCAoe25hdmlnYXRpb24sIHZvdGVzfSkgPT4gUGFnZShcbiAgICB7XG4gICAgICAgIG5hbWU6ICdzdGFydCcsXG4gICAgICAgIGRpcmVjdGlvbjogbmF2aWdhdGlvbi5zdGF0ZS5kaXJlY3Rpb24sXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdvVG86IG5hdmlnYXRpb24uYWN0aW9ucy5nb1RvLFxuICAgICAgICAgICAgdGFyZ2V0OiAndm90ZScsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIGV4dHJhOiBcIldoZW4geW91J3JlIHJlYWR5LCB0YXAgaGVyZSB0by4uLlwiLFxuICAgICAgICAgICAgdGV4dDogXCJWb3RlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgICBQYW5lbCh7fSwgWydQbGVhc2UgaGFuZCB0aGUgcGhvbmUgdG8gdGhlIGZpcnN0IHBlcnNvbiB0byB2b3RlLiddKVxuICAgIF1cbilcbiIsImltcG9ydCB0YWdzIGZyb20gJy4vdGFncydcbmNvbnN0IFt1bCwgbGksIHBdID0gdGFncygndWwsIGxpLCBwJylcbmltcG9ydCBJY29uIGZyb20gJy4vaWNvbidcblxuY29uc3Qgb3B0aW9ucyA9IFtcbiAgICB7XG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgICBpY29uOiAnbm9GYWNlJyxcbiAgICAgICAgbGFiZWw6ICdObyBWb3RlJyxcbiAgICAgICAgZXh0cmE6ICdJIGRvblxcJ3Qgd2FudCB0byBwYXJ0aWNpcGF0ZS4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgICBpY29uOiAndmVyeUhhcHB5RmFjZScsXG4gICAgICAgIGxhYmVsOiAnVmVyeSBIYXBweScsXG4gICAgICAgIGV4dHJhOiAnSXQgc2hvdWxkIGFsd2F5cyBiZSB0aGlzIHdheSEnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiA0LFxuICAgICAgICBpY29uOiAnaGFwcHlGYWNlJyxcbiAgICAgICAgbGFiZWw6ICdIYXBweScsXG4gICAgICAgIGV4dHJhOiAnSXQgY2FuIGFsd2F5cyBnZXQgYmV0dGVyISdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGljb246ICd1bmNlcnRhaW5GYWNlJyxcbiAgICAgICAgbGFiZWw6ICdEb25cXCd0IGtub3cnLFxuICAgICAgICBleHRyYTogJ01laC4uLiAvIE1peGVkIGZlZWxpbmdzJ1xuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogMixcbiAgICAgICAgaWNvbjogJ3VuaGFwcHlGYWNlJyxcbiAgICAgICAgbGFiZWw6ICdVbmhhcHB5JyxcbiAgICAgICAgZXh0cmE6ICdBIGxvdCBuZWVkcyB0byBjaGFuZ2UhJ1xuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgaWNvbjogJ3ZlcnlVbmhhcHB5RmFjZScsXG4gICAgICAgIGxhYmVsOiAnVmVyeSBVbmhhcHB5JyxcbiAgICAgICAgZXh0cmE6ICdXaHkgZXZlbiBib3RoZXIuLi4nXG4gICAgfVxuXVxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0ICh7dmFsdWU6Y3VycmVudCwgc2V0fSkgPT4gdWwoXG4gICAge2NsYXNzOiAnb3B0aW9uLXNlbGVjdG9yJ30sXG4gICAgb3B0aW9ucy5tYXAoKHt2YWx1ZSwgaWNvbiwgbGFiZWwsIGV4dHJhfSkgPT4gbGkoXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9ubW91c2Vkb3duOiBfID0+IHNldCh2YWx1ZSksXG4gICAgICAgICAgICBvbnRvdWNoc3RhcnQ6IF8gPT4gc2V0KHZhbHVlKSxcbiAgICAgICAgICAgIGNsYXNzOiAodmFsdWUgPT09IGN1cnJlbnQgPyAnYWN0aXZlJyA6ICcnKSxcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgICAgSWNvbih7bmFtZTogaWNvbn0pLFxuICAgICAgICAgICAgcCh7Y2xhc3M6ICdsYWJlbCd9LCBbbGFiZWxdKSxcbiAgICAgICAgICAgIHAoe2NsYXNzOiAnZXh0cmEnfSwgW2V4dHJhXSksXG4gICAgICAgIF1cbiAgICApKVxuKSIsImltcG9ydCBWb3RlciBmcm9tICcuLi9jb21wb25lbnRzL3ZvdGVyJ1xuaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0ICh7bmF2aWdhdGlvbiwgdm90ZXN9KSA9PiBQYWdlKHtcbiAgICAgICAgbmFtZTogJ3ZvdGUnLFxuICAgICAgICBkaXJlY3Rpb246IG5hdmlnYXRpb24uc3RhdGUuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBuYXZpZ2F0aW9uLmFjdGlvbnMuZ29UbyxcbiAgICAgICAgICAgIHRhcmdldDogJ3Bhc3MnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnZm9yd2FyZCcsXG4gICAgICAgICAgICBleHRyYTogXCJNYWtlIHlvdXIgc2VsZWN0aW9uLCB0aGVuIHRhcCBoZXJlIHRvLi4uXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIkNhc3QgVm90ZVwiLFxuICAgICAgICAgICAgb25Hbzogdm90ZXMuYWN0aW9ucy5jb21taXQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgICAgUGFuZWwoe30sIFsnSG93IGhhcHB5IGFyZSB5b3UgYWJvdXQgeW91ciBqb2I/J10pLFxuICAgICAgICBWb3Rlcih7XG4gICAgICAgICAgICB2YWx1ZTogdm90ZXMuc3RhdGUuY3VycmVudCxcbiAgICAgICAgICAgIHNldDogdm90ZXMuYWN0aW9ucy5zZXRcbiAgICAgICAgfSlcbiAgICBdXG4pXG4iLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcbmltcG9ydCBOYXZCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9uYXZidXR0b24nXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0ICh7bmF2aWdhdGlvbiwgdm90ZXN9KSA9PiBQYWdlKFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3Bhc3MnLFxuICAgICAgICBkaXJlY3Rpb246IG5hdmlnYXRpb24uc3RhdGUuZGlyZWN0aW9uLFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnb1RvOiBuYXZpZ2F0aW9uLmFjdGlvbnMuZ29UbyxcbiAgICAgICAgICAgIHRhcmdldDogJ3ZvdGUnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnYmFjaycsXG4gICAgICAgICAgICBleHRyYTogXCJBcmUgeW91IHRoZSBuZXh0IHBlcnNvbj8gVGFwIGhlcmUgdG8uLi5cIixcbiAgICAgICAgICAgIHRleHQ6IFwiVm90ZVwiLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICAgIE5hdkJ1dHRvbih7XG4gICAgICAgICAgICBnb1RvOiBuYXZpZ2F0aW9uLmFjdGlvbnMuZ29UbyxcbiAgICAgICAgICAgIHRhcmdldDogJ3Jlc3VsdCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIGV4dHJhOiAnSGFzIGV2ZXJ5b25lIHZvdGVkPyBUYXAgaGVyZSB0by4uLicsXG4gICAgICAgICAgICB0ZXh0OiAnQ2hlY2sgUmVzdWx0J1xuICAgICAgICB9KSxcbiAgICAgICAgUGFuZWwoe30sIFsnVGhhbmsgeW91ISBOb3csIHBsZWFzZSBoYW5kIHRoZSBwaG9uZSB0byB0aGUgbmV4dCBwZXJzb24uJ10pXG4gICAgXVxuKVxuIiwiaW1wb3J0IHtofSBmcm9tICdoeXBlcmFwcCdcbmNvbnN0IGF2ZyA9ICh7c3VtLCBjb3VudH0pID0+IHtcbiAgICBpZiAoY291bnQgPT09IDApIHJldHVybiAnJ1xuICAgIHJldHVybiAnJyArIE1hdGgucm91bmQoMTAgKiBzdW0gLyBjb3VudCkgLyAxMFxufVxuXG5leHBvcnQgZGVmYXVsdCAoZGF0YSkgPT4gaCgncCcsIHtjbGFzczogJ3Jlc3VsdC1kaXNwbGF5J30sIFthdmcoZGF0YSldKSIsImltcG9ydCBSZXN1bHQgZnJvbSAnLi4vY29tcG9uZW50cy9yZXN1bHQnXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2UnXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcblxuZXhwb3J0IGRlZmF1bHQgKHtuYXZpZ2F0aW9uLCB2b3Rlc30pID0+IFBhZ2UoXG4gICAge1xuICAgICAgICBuYW1lOiAncmVzdWx0JyxcbiAgICAgICAgZGlyZWN0aW9uOiBuYXZpZ2F0aW9uLnN0YXRlLmRpcmVjdGlvbixcbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ29UbzogbmF2aWdhdGlvbi5hY3Rpb25zLmdvVG8sXG4gICAgICAgICAgICB0YXJnZXQ6ICdyZXNldCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIGV4dHJhOiAnTmVlZCB0byBkbyBpdCBhZ2Fpbj8gVGFwIGhlcmUgdG8uLi4nLFxuICAgICAgICAgICAgdGV4dDogJ1Jlc2V0IFZvdGVzJyxcbiAgICAgICAgICAgIG9uR286IHZvdGVzLmFjdGlvbnMucmVzZXQsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgICAgUGFuZWwoe30sIFtcbiAgICAgICAgICAgICdIYXBwaW5lc3MgSW5kZXgnLFxuICAgICAgICAgICAgUmVzdWx0KHtcbiAgICAgICAgICAgICAgICBjb3VudDogdm90ZXMuc3RhdGUuY291bnQsXG4gICAgICAgICAgICAgICAgc3VtOiB2b3Rlcy5zdGF0ZS5zdW0sXG4gICAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgIF1cbikiLCJpbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcbmltcG9ydCBSZXN1bHQgZnJvbSAnLi4vY29tcG9uZW50cy9yZXN1bHQnXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0ICAoe25hdmlnYXRpb24sIHZvdGVzfSkgPT4gUGFnZShcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyZXNldCcsXG4gICAgICAgIGRpcmVjdGlvbjogbmF2aWdhdGlvbi5zdGF0ZS5kaXJlY3Rpb24sXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdvVG86IG5hdmlnYXRpb24uYWN0aW9ucy5nb1RvLFxuICAgICAgICAgICAgdGFyZ2V0OiAnc3RhcnQnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnYmFjaycsXG4gICAgICAgICAgICBleHRyYTogJ1RhcCBoZXJlIHRvLi4uJyxcbiAgICAgICAgICAgIHRleHQ6ICdTdGFydCBhZ2FpbicsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgICAgUGFuZWwoe30sIFtcbiAgICAgICAgICAgICdWb3RlcyBjbGVhcmVkIGZyb20gbWVtb3J5JyxcbiAgICAgICAgICAgIFJlc3VsdCh7XG4gICAgICAgICAgICAgICAgY291bnQ6IHZvdGVzLnN0YXRlLmNvdW50LFxuICAgICAgICAgICAgICAgIHN1bTogdm90ZXMuc3RhdGUuc3VtLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICBdXG4pXG4iLCJpbXBvcnQgaW5pdGlhbCBmcm9tICcuL2luaXRpYWwnXG5pbXBvcnQgc3RhcnQgICBmcm9tICcuL3N0YXJ0J1xuaW1wb3J0IHZvdGUgICAgZnJvbSAnLi92b3RlJ1xuaW1wb3J0IHBhc3MgICAgZnJvbSAnLi9wYXNzJ1xuaW1wb3J0IHJlc3VsdCAgZnJvbSAnLi9yZXN1bHQnXG5pbXBvcnQgcmVzZXQgICBmcm9tICcuL3Jlc2V0J1xuXG5jb25zdCBwYWdlcyA9IHtpbml0aWFsLCBzdGFydCwgdm90ZSwgcGFzcywgcmVzdWx0LCByZXNldH1cbmV4cG9ydCBkZWZhdWx0ICh7dm90ZXMsIG5hdmlnYXRpb259KSA9PiBwYWdlc1tuYXZpZ2F0aW9uLnN0YXRlLmN1cnJlbnRdKHt2b3RlcywgbmF2aWdhdGlvbn0pIiwiaW1wb3J0ICcuL3N0eWxlL21haW4ubGVzcydcbmltcG9ydCB7YXBwfSBmcm9tICdoeXBlcmFwcCdcblxuLy9tb2R1bGVzXG5pbXBvcnQgKiBhcyB2b3RlcyBmcm9tICcuL3ZvdGVzJ1xuaW1wb3J0ICogYXMgbmF2aWdhdGlvbiBmcm9tICcuL25hdmlnYXRpb24nXG5cbi8vY29tcG9uZW50c1xuaW1wb3J0IEFwcENvbnRhaW5lciBmcm9tICcuL2NvbXBvbmVudHMvYXBwLWNvbnRhaW5lcidcbmltcG9ydCBQYWdlcyBmcm9tICcuL3BhZ2VzL2luZGV4LmpzJ1xuXG5cblxuYXBwKFxuICAgIC8vU1RBVEVcbiAgICB7XG4gICAgICAgIHZvdGVzOiB2b3Rlcy5zdGF0ZSxcbiAgICAgICAgbmF2aWdhdGlvbjogbmF2aWdhdGlvbi5zdGF0ZVxuICAgIH0sXG5cbiAgICAvL0FDVElPTlNcbiAgICB7XG4gICAgICAgIHZvdGVzOiB2b3Rlcy5hY3Rpb25zLFxuICAgICAgICBuYXZpZ2F0aW9uOiBuYXZpZ2F0aW9uLmFjdGlvbnNcbiAgICB9LFxuXG4gICAgLy9WSUVXXG4gICAgKHN0YXRlLCBhY3Rpb25zKSA9PiBBcHBDb250YWluZXIoe30sIFBhZ2VzKHtcbiAgICAgICAgdm90ZXM6IHtzdGF0ZTogc3RhdGUudm90ZXMsIGFjdGlvbnM6IGFjdGlvbnMudm90ZXN9LFxuICAgICAgICBuYXZpZ2F0aW9uOiB7c3RhdGU6IHN0YXRlLm5hdmlnYXRpb24sIGFjdGlvbnM6IGFjdGlvbnMubmF2aWdhdGlvbn1cbiAgICB9KSksXG5cbiAgICAvL0NPTlRBSU5FUlxuICAgIGRvY3VtZW50LmJvZHlcbilcbiJdLCJuYW1lcyI6WyJzdGF0ZSIsImFjdGlvbnMiLCJ0YWdzIiwiVHhFbnRlciIsIlR4RXhpdCIsInZvdGVzLnN0YXRlIiwibmF2aWdhdGlvbi5zdGF0ZSIsInZvdGVzLmFjdGlvbnMiLCJuYXZpZ2F0aW9uLmFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7RUFDN0IsSUFBSSxLQUFJO0VBQ1IsSUFBSSxJQUFJLEdBQUcsR0FBRTtFQUNiLElBQUksUUFBUSxHQUFHLEdBQUU7RUFDakIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU07O0VBRTdCLE9BQU8sTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFDOztFQUVqRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDbEIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtNQUN0QyxLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDO09BQ3hCO0tBQ0YsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO01BQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDO0tBQ3BCO0dBQ0Y7O0VBRUQsT0FBTyxPQUFPLElBQUksS0FBSyxVQUFVO01BQzdCLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQztNQUMzQjtRQUNFLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2xCLFFBQVEsRUFBRSxRQUFRO09BQ25CO0NBQ047O0FBRUQsQUFBTyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7RUFDbkQsSUFBSSxXQUFVO0VBQ2QsSUFBSSxnQkFBZ0IsR0FBRyxHQUFFO0VBQ3pCLElBQUksV0FBVyxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSTtFQUM5RCxJQUFJLFFBQVEsR0FBRyxXQUFXLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFDO0VBQzFELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUM7RUFDN0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQzs7RUFFaEMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUM7O0VBRWpFLE9BQU8sWUFBWTs7RUFFbkIsU0FBUyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUM3QixPQUFPO01BQ0wsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO01BQ3BDLEtBQUssRUFBRSxFQUFFO01BQ1QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLE9BQU8sRUFBRTtRQUN2RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssQ0FBQztZQUN6QixPQUFPLENBQUMsU0FBUztZQUNqQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztPQUMxQixDQUFDO0tBQ0g7R0FDRjs7RUFFRCxTQUFTLE1BQU0sR0FBRztJQUNoQixVQUFVLEdBQUcsQ0FBQyxXQUFVOztJQUV4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBQztJQUMxQyxJQUFJLFNBQVMsSUFBSSxDQUFDLFVBQVUsRUFBRTtNQUM1QixXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUU7S0FDekU7O0lBRUQsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFFO0dBQy9DOztFQUVELFNBQVMsY0FBYyxHQUFHO0lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUU7TUFDZixVQUFVLEdBQUcsQ0FBQyxXQUFVO01BQ3hCLFVBQVUsQ0FBQyxNQUFNLEVBQUM7S0FDbkI7R0FDRjs7RUFFRCxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQzVCLElBQUksR0FBRyxHQUFHLEdBQUU7O0lBRVosS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUM7O0lBRXhDLE9BQU8sR0FBRztHQUNYOztFQUVELFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQ2hDLElBQUksTUFBTSxHQUFHLEdBQUU7SUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7TUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQUs7TUFDdEUsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztLQUM1QjtJQUNELE9BQU8sS0FBSztHQUNiOztFQUVELFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7TUFDcEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7S0FDekI7SUFDRCxPQUFPLE1BQU07R0FDZDs7RUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO0lBQ2hELEtBQUssSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFO01BQ3ZCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVU7VUFDOUIsQ0FBQyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxFQUFFO2NBQzVCLElBQUksUUFBUSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUMvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFDO2VBQzdDOztjQUVEO2dCQUNFLElBQUk7Z0JBQ0osSUFBSSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNWO2dCQUNBLGNBQWM7bUJBQ1gsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUM7a0JBQ3pEO2VBQ0Y7O2NBRUQsT0FBTyxJQUFJO2NBQ1o7V0FDRixFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDckIsa0JBQWtCO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO2FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DO0tBQ047R0FDRjs7RUFFRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDcEIsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJO0dBQ2xEOztFQUVELFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7SUFDN0QsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO0tBQ25CLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO01BQzNCLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFDO09BQ3JFO0tBQ0YsTUFBTTtNQUNMLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM5RCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsTUFBSztPQUMzQyxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO1FBQzNDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBQztPQUNsQzs7TUFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtRQUNwQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBQztPQUM5QjtLQUNGO0dBQ0Y7O0VBRUQsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtJQUNsQyxJQUFJLE9BQU87TUFDVCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtVQUNoRCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztVQUM3QixDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLO1lBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqRSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7O0lBRXpDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtNQUNkLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDdkIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVc7VUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDO1NBQzdCLEVBQUM7T0FDSDs7TUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBQztPQUM1RDs7TUFFRCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDM0IsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUM7T0FDdkQ7S0FDRjs7SUFFRCxPQUFPLE9BQU87R0FDZjs7RUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEQsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO01BQ3RDO1FBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNWLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxLQUFLLFNBQVM7WUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQjtRQUNBLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDO09BQ2xFO0tBQ0Y7O0lBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO01BQ2xCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXO1FBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQztPQUNsQyxFQUFDO0tBQ0g7R0FDRjs7RUFFRCxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtJQUM1QyxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHO01BQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDO09BQ3hEOztNQUVELElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNuQixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQztPQUN6QjtLQUNGO0lBQ0QsT0FBTyxPQUFPO0dBQ2Y7O0VBRUQsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO0lBQ2hELFNBQVMsSUFBSSxHQUFHO01BQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFDO0tBQ2xEOztJQUVELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtNQUM1QyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBQztLQUNsQixNQUFNO01BQ0wsSUFBSSxHQUFFO0tBQ1A7R0FDRjs7RUFFRCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtJQUNqRSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7S0FDckIsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDMUIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUM7S0FDbkUsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFO01BQ2xELGFBQWE7UUFDWCxPQUFPO1FBQ1AsT0FBTyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsS0FBSztTQUNULEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLO1FBQ3RDOztNQUVELElBQUksV0FBVyxHQUFHLEdBQUU7TUFDcEIsSUFBSSxRQUFRLEdBQUcsR0FBRTtNQUNqQixJQUFJLFFBQVEsR0FBRyxHQUFFOztNQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEQsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDOztRQUV0QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDOztRQUU3QixJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7VUFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBQztTQUM5QztPQUNGOztNQUVELElBQUksQ0FBQyxHQUFHLEVBQUM7TUFDVCxJQUFJLENBQUMsR0FBRyxFQUFDOztNQUVULE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQy9CLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDO1FBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDOztRQUUvQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7O1FBRTdCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1VBQ3BCLENBQUMsR0FBRTtVQUNILFFBQVE7U0FDVDs7UUFFRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7VUFDbEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1lBQ3pELENBQUMsR0FBRTtXQUNKO1VBQ0QsQ0FBQyxHQUFFO1NBQ0osTUFBTTtVQUNMLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFFOztVQUV4QyxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDckIsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7WUFDL0QsQ0FBQyxHQUFFO1dBQ0osTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixLQUFLO2NBQ0gsT0FBTztjQUNQLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNwRCxXQUFXLENBQUMsQ0FBQyxDQUFDO2NBQ2QsUUFBUTtjQUNSLEtBQUs7Y0FDTjtXQUNGLE1BQU07WUFDTCxLQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztXQUN0RDs7VUFFRCxDQUFDLEdBQUU7VUFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUTtTQUM1QjtPQUNGOztNQUVELE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2xDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDO1FBQ2xDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRTtVQUM1QixhQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUM7U0FDakQ7UUFDRCxDQUFDLEdBQUU7T0FDSjs7TUFFRCxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7VUFDdkMsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1NBQ3ZEO09BQ0Y7S0FDRixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFO01BQ3JDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSTtLQUN6QixNQUFNO01BQ0wsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZO1FBQzNCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3pCLFdBQVcsR0FBRyxPQUFPO1FBQ3ZCO01BQ0QsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFDO0tBQzVDO0lBQ0QsT0FBTyxPQUFPO0dBQ2Y7Q0FDRjs7QUMxVE0sTUFBTSxLQUFLLEdBQUc7SUFDakIsT0FBTyxFQUFFLENBQUM7SUFDVixHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxDQUFDO0VBQ1g7O0FBRUQsQUFBTyxNQUFNLE9BQU8sR0FBRzs7SUFFbkIsR0FBRyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFFOUIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSztRQUNwQyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUUsTUFBTTtRQUN6QixPQUFPO1lBQ0gsR0FBRyxFQUFFLEdBQUcsR0FBRyxPQUFPO1lBQ2xCLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQztZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNiO0tBQ0o7O0lBRUQsS0FBSyxFQUFFLENBQUMsS0FBSztRQUNULEdBQUcsRUFBRSxDQUFDO1FBQ04sS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQztLQUNiLENBQUM7O0NBRUw7O0FDekJNLE1BQU1BLE9BQUssR0FBRztJQUNqQixPQUFPLEVBQUUsU0FBUztJQUNsQixTQUFTLEVBQUUsSUFBSTtFQUNsQjs7QUFFRCxBQUFPLE1BQU1DLFNBQU8sR0FBRztJQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztDQUN6RDs7QUNORCxtQkFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsRUFBRSxRQUFROztvRkFBQyxwRkNBaEYsWUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxRQUFRLENBQUM7O0FDQTFFLFdBQWUsVUFBVSxJQUFJLEVBQUU7SUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEtBQUs7UUFDMUUsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1VBQ3hELENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztVQUMzQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUM7S0FDMUIsQ0FBQzs7O0NBQ0wsRENORCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQzs7QUFFL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSTtJQUMvQixFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBQztJQUN2QixFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO0lBQ3hDLE1BQU0sR0FBRTtFQUNYOztBQUVELGFBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxRQUFRLEtBQUssTUFBTSxDQUFDO0lBQy9DLEtBQUssRUFBRSxHQUFHO0lBQ1YsWUFBWSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDaEMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDbEMsRUFBRSxRQUFRLENBQUM7O0FDWlosTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLEVBQUM7O0FBRTVFLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsS0FBSztJQUM3QixLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU07SUFDcEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNO0lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUcsNkJBQTRCO0lBQzFDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7RUFDL0I7O0FBRUQsTUFBTSxJQUFJLEdBQUcsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsRUFBQztBQUNwRSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDQyxPQUFJLElBQUlBLE9BQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssSUFBSTtJQUM5RCxLQUFLLENBQUMsSUFBSSxHQUFHLGNBQWE7SUFDMUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUM7SUFDekIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsUUFBTztJQUNqQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7Q0FDcEIsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQzs7QUFFekIsTUFBTSxLQUFLLEdBQUc7O0lBRVYsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsRUFBRTtRQUNyQyxJQUFJLENBQUM7WUFDRCxDQUFDLEVBQUUsd0JBQXdCO1lBQzNCLGdCQUFnQixFQUFFLE1BQU07WUFDeEIsY0FBYyxFQUFFLEdBQUc7U0FDdEIsQ0FBQztLQUNMLENBQUM7O0lBRUYsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDOztJQUVoRCxhQUFhLEVBQUUsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztLQUMzQyxDQUFDOztJQUVGLFNBQVMsRUFBRSxJQUFJLENBQUM7UUFDWixPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztLQUMzQyxDQUFDOztJQUVGLGFBQWEsRUFBRSxJQUFJLENBQUM7UUFDaEIsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekMsQ0FBQzs7SUFFRixXQUFXLEVBQUUsSUFBSSxDQUFDO1FBQ2QsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLDRCQUE0QixDQUFDLENBQUM7S0FDM0MsQ0FBQzs7SUFFRixlQUFlLEVBQUUsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0tBQzVDLENBQUM7RUFDTDs7QUFFRCxXQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7NEVBQUMsNUVDbkVoRixjQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDakMsSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEdBQUcsQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7Q0FDbEQ7O0VBQUMsRkNBRixnQkFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztJQUM3RCxPQUFPLE1BQU07UUFDVDtZQUNJLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5QixNQUFNLEVBQUUsQ0FBQyxJQUFJO2dCQUNULElBQUksSUFBSSxFQUFFLElBQUksR0FBRTtnQkFDaEIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFDO2FBQzVCO1NBQ0o7UUFDRDtZQUNJLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlDO0tBQ0o7OztBQ2xCTCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUM7QUFDNUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDOztBQUU1QyxJQUFJLGdCQUFnQixHQUFHLEdBQUU7O0FBRXpCLFNBQVMsYUFBYSxFQUFFLEVBQUUsRUFBRTtJQUN4QixFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUM7Q0FDaEM7O0FBRUQsU0FBUyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRTtJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNqQixPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUU7UUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFDO0tBQy9CLEVBQUM7Q0FDTDs7QUFFRCxTQUFTLGdCQUFnQixFQUFFLEVBQUUsRUFBRTtJQUMzQixJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNO0lBQzlDLGNBQWMsQ0FBQyxFQUFFLEVBQUM7SUFDbEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQztDQUM1Qjs7QUFFRCxTQUFTLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtJQUM1QixJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDO0lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU07SUFDcEIsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUM7Q0FDaEM7O0FBRUQsU0FBUyxnQkFBZ0IsSUFBSTtJQUN6QixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFDO0NBQzNDOztBQUVELFNBQVMsY0FBYyxFQUFFLEVBQUUsRUFBRTtJQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRTtJQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFFO0lBQ2IsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLGlCQUFpQjtJQUNoQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsRUFBRSxFQUFDO0lBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUM1QixPQUFPLFlBQVksR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxLQUFLO0NBQ2pEOztBQUVELFNBQVMsY0FBYyxFQUFFLEVBQUUsRUFBRTtJQUN6QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEdBQUU7SUFDckMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSTtJQUNqQixFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFHO0lBQ2hCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNyQzs7QUFFRCxTQUFTLGFBQWEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQ3RELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksU0FBUTtJQUNyQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUc7SUFDNUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFDO0lBQzVCLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFDO0lBQ3BCLFVBQVUsQ0FBQyxZQUFZO1FBQ25CLHFCQUFxQixDQUFDLFlBQVk7WUFDOUIsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUM7WUFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUk7WUFDekQsVUFBVSxDQUFDLFlBQVk7Z0JBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUk7Z0JBQzFCLE1BQU0sSUFBSSxNQUFNLEdBQUU7YUFDckIsRUFBRSxJQUFJLEVBQUM7U0FDWCxFQUFDO0tBQ0wsRUFBRSxLQUFLLEVBQUM7Q0FDWjs7QUFFRCxTQUFTLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtJQUMvQixJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFFO0lBQzFDLGFBQWE7UUFDVCxFQUFFLEVBQUUsS0FBSztRQUNULEdBQUc7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUk7WUFDWCxPQUFPLENBQUM7U0FDWCxFQUFFLEVBQUUsQ0FBQztRQUNOLFlBQVksRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFDLEVBQUU7TUFDckM7Q0FDSjs7QUFFRCxTQUFTLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFO0lBQ3pCLGFBQWE7UUFDVCxFQUFFLEVBQUUsS0FBSztRQUNULENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7TUFDcEI7Q0FDSjs7QUFFRCxTQUFTLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDcEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRTtJQUMxQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUM7SUFDdEIsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLEVBQUUsRUFBQztJQUNwQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBQztJQUMxRSxhQUFhO1FBQ1QsRUFBRSxFQUFFLEtBQUs7UUFDVCxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7UUFDeEIsR0FBRztRQUNILElBQUk7TUFDUDtDQUNKOztBQUVELFNBQVMsSUFBSSxJQUFJLEVBQUU7O0FBRW5CLFNBQVMsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDOUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7SUFDbEIsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7SUFDbEIsT0FBTyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUU7UUFDdkIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFDO1FBQ2xCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBQztRQUNsQixPQUFPLElBQUk7S0FDZDtDQUNKOztBQUVELFNBQVMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFO0lBQ3RDLE9BQU8sVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQzlCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFDO1FBQ3RDLE9BQU8sUUFBUTtTQUNkLE1BQU0sQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoRCxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUU7WUFDbEIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUM7YUFDaEUsRUFBQztZQUNGLE9BQU8sS0FBSztTQUNmLENBQUM7S0FDTDtDQUNKOztBQUVELElBQUksTUFBTSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsS0FBSyxFQUFFO0lBQzlDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFO0NBQzVELEVBQUM7O0FBRUYsSUFBSSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxLQUFLLEVBQUU7SUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFDLEVBQUUsRUFBRTtDQUM1RCxFQUFDOztBQUVGLElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsS0FBSyxFQUFFO0lBQzdDLE9BQU87UUFDSCxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFO1lBQzFCLElBQUksR0FBRyxJQUFJLElBQUksWUFBWSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUMsR0FBRTtZQUNoRCxPQUFPLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFDO1NBQzNEO0tBQ0o7Q0FDSixFQUFDOztBQUVGLElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsS0FBSyxFQUFFO0lBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUU7Q0FDOUUsRUFBQzs7QUFFRixBQUlBLElBQUksSUFBSSxHQUFHLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRTtJQUNsQyxPQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUM5Qzs7QUNySkQsTUFBTSxLQUFLLEdBQUc7SUFDVixTQUFTLEVBQUUsSUFBSTtFQUNsQjs7QUFFRCxNQUFNLGFBQWEsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsT0FBTztLQUNuQjtFQUNKOztBQUVELE1BQU0sUUFBUSxHQUFHLE9BQU8sSUFBSSxDQUFDLEtBQUs7SUFDOUIsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RFLEVBQUM7OztBQUdGLFdBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsUUFBUSxLQUFLO0lBQ2xELEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBUztJQUMzQixPQUFPQyxLQUFPO1FBQ1Y7WUFDSSxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN0QixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsR0FBRztTQUNaO1FBQ0RDLElBQU07WUFDRjtnQkFDSSxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsTUFBTSxFQUFFLGFBQWE7Z0JBQ3JCLElBQUksRUFBRSxHQUFHO2FBQ1o7WUFDRDtnQkFDSSxDQUFDO29CQUNHLEtBQUs7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLE1BQU07d0JBQ2IsR0FBRyxFQUFFLElBQUk7cUJBQ1o7b0JBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QzthQUNKO1NBQ0o7S0FDSixDQUFDLENBQUMsQ0FBQzs7O0NBQ1AsREMvQ0QsY0FBZSxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUk7SUFDeEM7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDckMsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUM3QixNQUFNLEVBQUUsT0FBTztZQUNmLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsSUFBSSxFQUFFLE9BQU87U0FDaEI7S0FDSjtJQUNEO1FBQ0ksS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDNUM7Q0FDSjs7QUNmRCxZQUFlLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSTtJQUN4QztRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBUyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUztRQUNyQyxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzdCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLG1DQUFtQztZQUMxQyxJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0o7SUFDRDtRQUNJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO0tBQ3BFO0NBQ0o7O0FDakJELE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUM7QUFDckMsQUFFQSxNQUFNLE9BQU8sR0FBRztJQUNaO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEtBQUssRUFBRSwrQkFBK0I7S0FDekM7SUFDRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsS0FBSyxFQUFFLCtCQUErQjtLQUN6QztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUUsV0FBVztRQUNqQixLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSwyQkFBMkI7S0FDckM7SUFDRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLGFBQWE7UUFDcEIsS0FBSyxFQUFFLHlCQUF5QjtLQUNuQztJQUNEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUUsYUFBYTtRQUNuQixLQUFLLEVBQUUsU0FBUztRQUNoQixLQUFLLEVBQUUsd0JBQXdCO0tBQ2xDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsS0FBSyxFQUFFLGNBQWM7UUFDckIsS0FBSyxFQUFFLG9CQUFvQjtLQUM5QjtFQUNKOzs7Ozs7QUFNRCxZQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7SUFDdkMsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUM7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUMzQztZQUNJLFdBQVcsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM1QixZQUFZLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDN0IsS0FBSyxHQUFHLEtBQUssS0FBSyxPQUFPLEdBQUcsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUM3QztRQUNEO1lBQ0ksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0tBQ0osQ0FBQzs7O0NBQ0wsREN6REQsV0FBZSxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNyQyxJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDckMsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUM3QixNQUFNLEVBQUUsTUFBTTtZQUNkLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTtTQUM3QjtLQUNKO0lBQ0Q7UUFDSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNoRCxLQUFLLENBQUM7WUFDRixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQzFCLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUc7U0FDekIsQ0FBQztLQUNMO0NBQ0o7O0FDbkJELFdBQWUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJO0lBQ3hDO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTO1FBQ3JDLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDN0IsTUFBTSxFQUFFLE1BQU07WUFDZCxTQUFTLEVBQUUsTUFBTTtZQUNqQixLQUFLLEVBQUUseUNBQXlDO1lBQ2hELElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSjtJQUNEO1FBQ0ksU0FBUyxDQUFDO1lBQ04sSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUM3QixNQUFNLEVBQUUsUUFBUTtZQUNoQixTQUFTLEVBQUUsU0FBUztZQUNwQixLQUFLLEVBQUUsb0NBQW9DO1lBQzNDLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUM7UUFDRixLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsMkRBQTJELENBQUMsQ0FBQztLQUMzRTtDQUNKOztBQ3pCRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFLO0lBQzFCLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUU7SUFDMUIsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUU7RUFDaEQ7O0FBRUQsYUFBZSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O3FFQUFDLHJFQ0Z2RSxhQUFlLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSTtJQUN4QztRQUNJLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUztRQUNyQyxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzdCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLHFDQUFxQztZQUM1QyxJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1NBQzVCO0tBQ0o7SUFDRDtRQUNJLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDTixpQkFBaUI7WUFDakIsTUFBTSxDQUFDO2dCQUNILEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7YUFDdkIsQ0FBQztTQUNMLENBQUM7S0FDTDs7O0NBQ0osREN0QkQsWUFBZ0IsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJO0lBQ3pDO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTO1FBQ3JDLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDN0IsTUFBTSxFQUFFLE9BQU87WUFDZixTQUFTLEVBQUUsTUFBTTtZQUNqQixLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLElBQUksRUFBRSxhQUFhO1NBQ3RCO0tBQ0o7SUFDRDtRQUNJLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDTiwyQkFBMkI7WUFDM0IsTUFBTSxDQUFDO2dCQUNILEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7YUFDdkIsQ0FBQztTQUNMLENBQUM7S0FDTDtDQUNKOztBQ2xCRCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO0FBQ3pELFlBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUM7O3lGQUFDLHpGQ0s1RixHQUFHOztJQUVDO1FBQ0ksS0FBSyxFQUFFQyxLQUFXO1FBQ2xCLFVBQVUsRUFBRUMsT0FBZ0I7S0FDL0I7OztJQUdEO1FBQ0ksS0FBSyxFQUFFQyxPQUFhO1FBQ3BCLFVBQVUsRUFBRUMsU0FBa0I7S0FDakM7OztJQUdELENBQUNSLFFBQUssRUFBRUMsVUFBTyxLQUFLLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO1FBQ3ZDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRUQsUUFBSyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUVDLFVBQU8sQ0FBQyxLQUFLLENBQUM7UUFDbkQsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFRCxRQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRUMsVUFBTyxDQUFDLFVBQVUsQ0FBQztLQUNyRSxDQUFDLENBQUM7OztJQUdILFFBQVEsQ0FBQyxJQUFJO0NBQ2hCOzs7OyJ9
