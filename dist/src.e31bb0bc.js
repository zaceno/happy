// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/hyperapp/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = exports.h = exports.Lazy = void 0;
var RECYCLED_NODE = 1;
var LAZY_NODE = 2;
var TEXT_NODE = 3;
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var map = EMPTY_ARR.map;
var isArray = Array.isArray;
var defer = requestAnimationFrame || setTimeout;

var createClass = function (obj) {
  var out = "";
  if (typeof obj === "string") return obj;

  if (isArray(obj) && obj.length > 0) {
    for (var k = 0, tmp; k < obj.length; k++) {
      if ((tmp = createClass(obj[k])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (var k in obj) {
      if (obj[k]) {
        out += (out && " ") + k;
      }
    }
  }

  return out;
};

var merge = function (a, b) {
  var out = {};

  for (var k in a) out[k] = a[k];

  for (var k in b) out[k] = b[k];

  return out;
};

var batch = function (list) {
  return list.reduce(function (out, item) {
    return out.concat(!item || item === true ? false : typeof item[0] === "function" ? [item] : batch(item));
  }, EMPTY_ARR);
};

var isSameAction = function (a, b) {
  return isArray(a) && isArray(b) && a[0] === b[0] && typeof a[0] === "function";
};

var shouldRestart = function (a, b) {
  for (var k in merge(a, b)) {
    if (a[k] !== b[k] && !isSameAction(a[k], b[k])) return true;
    b[k] = a[k];
  }
};

var patchSubs = function (oldSubs, newSubs, dispatch) {
  for (var i = 0, oldSub, newSub, subs = []; i < oldSubs.length || i < newSubs.length; i++) {
    oldSub = oldSubs[i];
    newSub = newSubs[i];
    subs.push(newSub ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [newSub[0], newSub[1], newSub[0](newSub[1], dispatch), oldSub && oldSub[2]()] : oldSub : oldSub && oldSub[2]());
  }

  return subs;
};

var patchProperty = function (node, key, oldValue, newValue, listener, isSvg) {
  if (key === "key") {} else if (key === "style") {
    for (var k in merge(oldValue, newValue)) {
      oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];

      if (k[0] === "-") {
        node[key].setProperty(k, oldValue);
      } else {
        node[key][k] = oldValue;
      }
    }
  } else if (key[0] === "o" && key[1] === "n") {
    if (!((node.actions || (node.actions = {}))[key = key.slice(2)] = newValue)) {
      node.removeEventListener(key, listener);
    } else if (!oldValue) {
      node.addEventListener(key, listener, newValue.passive ? newValue : false);
    }
  } else if (!isSvg && key !== "list" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
};

var createNode = function (vnode, listener, isSvg) {
  var node = vnode.type === TEXT_NODE ? document.createTextNode(vnode.name) : (isSvg = isSvg || vnode.name === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", vnode.name) : document.createElement(vnode.name);
  var props = vnode.props;

  for (var k in props) {
    patchProperty(node, k, null, props[k], listener, isSvg);
  }

  for (var i = 0, len = vnode.children.length; i < len; i++) {
    node.appendChild(createNode(vnode.children[i] = getVNode(vnode.children[i]), listener, isSvg));
  }

  return vnode.node = node;
};

var getKey = function (vnode) {
  return vnode == null ? null : vnode.key;
};

var patch = function (parent, node, oldVNode, newVNode, listener, isSvg) {
  if (oldVNode === newVNode) {} else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
    if (oldVNode.name !== newVNode.name) node.nodeValue = newVNode.name;
  } else if (oldVNode == null || oldVNode.name !== newVNode.name) {
    node = parent.insertBefore(createNode(newVNode = getVNode(newVNode), listener, isSvg), node);
    if (oldVNode != null) parent.removeChild(oldVNode.node);
  } else {
    var tmpVKid;
    var oldVKid;
    var oldKey;
    var newKey;
    var oldVProps = oldVNode.props;
    var newVProps = newVNode.props;
    var oldVKids = oldVNode.children;
    var newVKids = newVNode.children;
    var oldHead = 0;
    var newHead = 0;
    var oldTail = oldVKids.length - 1;
    var newTail = newVKids.length - 1;
    isSvg = isSvg || newVNode.name === "svg";

    for (var i in merge(oldVProps, newVProps)) {
      if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldVProps[i]) !== newVProps[i]) {
        patchProperty(node, i, oldVProps[i], newVProps[i], listener, isSvg);
      }
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
        break;
      }

      patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = getVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
        break;
      }

      patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = getVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(createNode(newVKids[newHead] = getVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node);
      }
    } else {
      for (var i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i];
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey(oldVKid = oldVKids[oldHead]);
        newKey = getKey(newVKids[newHead] = getVNode(newVKids[newHead], oldVKid));

        if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node);
          }

          oldHead++;
          continue;
        }

        if (newKey == null || oldVNode.type === RECYCLED_NODE) {
          if (oldKey == null) {
            patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
            newHead++;
          }

          oldHead++;
        } else {
          if (oldKey === newKey) {
            patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
            newKeyed[newKey] = true;
            oldHead++;
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
            } else {
              patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
            }
          }

          newHead++;
        }
      }

      while (oldHead <= oldTail) {
        if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
          node.removeChild(oldVKid.node);
        }
      }

      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node);
        }
      }
    }
  }

  return newVNode.node = node;
};

var propsChanged = function (a, b) {
  for (var k in a) if (a[k] !== b[k]) return true;

  for (var k in b) if (a[k] !== b[k]) return true;
};

var getVNode = function (newVNode, oldVNode) {
  return newVNode.type === LAZY_NODE ? ((!oldVNode || propsChanged(oldVNode.lazy, newVNode.lazy)) && ((oldVNode = newVNode.lazy.view(newVNode.lazy)).lazy = newVNode.lazy), oldVNode) : newVNode;
};

var createVNode = function (name, props, children, node, key, type) {
  return {
    name: name,
    props: props,
    children: children,
    node: node,
    type: type,
    key: key
  };
};

var createTextVNode = function (value, node) {
  return createVNode(value, EMPTY_OBJ, EMPTY_ARR, node, null, TEXT_NODE);
};

var recycleNode = function (node) {
  return node.nodeType === TEXT_NODE ? createTextVNode(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), node, null, RECYCLED_NODE);
};

var Lazy = function (props) {
  return {
    lazy: props,
    type: LAZY_NODE
  };
};

exports.Lazy = Lazy;

var h = function (name, props) {
  for (var vnode, rest = [], children = [], i = arguments.length; i-- > 2;) {
    rest.push(arguments[i]);
  }

  while (rest.length > 0) {
    if (isArray(vnode = rest.pop())) {
      for (var i = vnode.length; i-- > 0;) {
        rest.push(vnode[i]);
      }
    } else if (vnode === false || vnode === true || vnode == null) {} else {
      children.push(typeof vnode === "object" ? vnode : createTextVNode(vnode));
    }
  }

  props = props || EMPTY_OBJ;
  return typeof name === "function" ? name(props, children) : createVNode(name, props, children, null, props.key);
};

exports.h = h;

var app = function (props, enhance) {
  var state = {};
  var lock = false;
  var view = props.view;
  var node = props.node;
  var vdom = node && recycleNode(node);
  var subscriptions = props.subscriptions;
  var subs = [];

  var listener = function (event) {
    var action = this.actions[event.type];
    if (action.preventDefault) event.preventDefault();
    if (action.stopPropagation) event.stopPropagation();
    dispatch(action.action || action, event);
  };

  var setState = function (newState) {
    return state === newState || lock || defer(render, lock = true), state = newState;
  };

  var dispatch = (enhance || function (a) {
    return a;
  })(function (action, props) {
    return typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], typeof action[1] === "function" ? action[1](props) : action[1]) : (batch(action.slice(1)).map(function (fx) {
      fx && fx[0](fx[1], dispatch);
    }, setState(action[0])), state) : setState(action);
  });

  var render = function () {
    lock = false;

    if (subscriptions) {
      subs = patchSubs(subs, batch(subscriptions(state)), dispatch);
    }

    if (view) {
      node = patch(node.parentNode, node, vdom, typeof (vdom = view(state)) === "string" ? createTextVNode(vdom) : vdom, listener);
    }
  };

  dispatch(props.init);
};

exports.app = app;
},{}],"logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var lock = false;

var _default = function _default(dispatch) {
  return function () {
    if (lock) return dispatch.apply(void 0, arguments);
    lock = true;
    var ret = dispatch.apply(void 0, arguments);
    var action = arguments.length <= 0 ? undefined : arguments[0];
    if (Array.isArray(action)) action = action[0];
    if (typeof action !== 'function') action = '_';else action = action.name;
    console.log(action, ret);
    lock = false;
    return ret;
  };
};

exports.default = _default;
},{}],"html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = new Proxy({}, {
  get: function get(cache, name) {
    if (!cache[name]) {
      cache[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args[0] && _typeof(args[0]) === 'object' && !Array.isArray(args[0])) return _hyperapp.h.apply(void 0, [name].concat(args));
        return _hyperapp.h.apply(void 0, [name, {}].concat(args));
      };
    }

    return cache[name];
  }
});

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/voter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ul = _html.default.ul,
    li = _html.default.li;

var _default = function _default(_ref) {
  var value = _ref.value,
      set = _ref.set;
  return ul({
    class: 'voter'
  }, [li({
    onclick: [set, 0],
    class: {
      selected: value === 0
    }
  }, 'Non vote'), li({
    onclick: [set, 5],
    class: {
      selected: value === 5
    }
  }, 'Very Happy'), li({
    onclick: [set, 4],
    class: {
      selected: value === 4
    }
  }, 'Happy'), li({
    onclick: [set, 3],
    class: {
      selected: value === 3
    }
  }, "Don't know"), li({
    onclick: [set, 2],
    class: {
      selected: value === 2
    }
  }, 'Unhappy'), li({
    onclick: [set, 1],
    class: {
      selected: value === 1
    }
  }, 'Very Unhappy')]);
};

exports.default = _default;
},{"../html":"html.js"}],"pages/init.js":[function(require,module,exports) {

},{}],"index.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _logger = _interopRequireDefault(require("./logger"));

var _html = _interopRequireDefault(require("./html"));

var _voter = _interopRequireDefault(require("./components/voter"));

var _init = _interopRequireDefault(require("./pages/init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var body = _html.default.body,
    main = _html.default.main,
    section = _html.default.section,
    button = _html.default.button,
    p = _html.default.p,
    ul = _html.default.ul,
    li = _html.default.li;

var CalcAverage = function CalcAverage(tally) {
  if (!tally.num) return 0;
  var avg = tally.tot / tally.num;
  return Math.round(avg * 10) / 10;
};

var SelectVote = function SelectVote(state, vote) {
  return _objectSpread({}, state, {
    voter: _objectSpread({}, state.voter, {
      vote: vote
    })
  });
};

var ResetVotes = function ResetVotes(state) {
  return _objectSpread({}, state, {
    voter: {
      vote: 0,
      tally: {
        num: 0,
        tot: 0
      }
    }
  });
};

var CommitVote = function CommitVote(state) {
  return !state.voter.vote ? state : _objectSpread({}, state, {
    voter: {
      vote: 0,
      tally: {
        num: state.voter.tally.num + 1,
        tot: state.voter.tally.tot + state.voter.vote
      }
    }
  });
};

var InitVoter = function InitVoter(_) {
  return {
    tally: {
      num: 0,
      tot: 0
    },
    vote: 0
  };
};

var AfterRender = function (f) {
  return function (a) {
    return [f, a];
  };
}(function (a, d) {
  return requestAnimationFrame(function (_) {
    return d(a);
  });
});

var StartTransition = function StartTransition(state, _ref) {
  var page = _ref.page,
      direction = _ref.direction;
  return state.nav.mode !== 'idle' ? state : [_objectSpread({}, state, {
    nav: _objectSpread({}, state.nav, {
      mode: 'start',
      page: page,
      direction: direction,
      prev: state.nav.page
    })
  }), AfterRender(RunTransition)];
};

var RunTransition = function RunTransition(state) {
  return _objectSpread({}, state, {
    nav: _objectSpread({}, state.nav, {
      mode: 'run'
    })
  });
};

var EndTransition = function EndTransition(state) {
  return _objectSpread({}, state, {
    nav: _objectSpread({}, state.nav, {
      mode: 'idle'
    })
  });
};

var Page = function Page(props, children) {
  return section({
    class: {
      page: true,
      exit: props.exit,
      enter: props.enter,
      run: props.run,
      left: props.left,
      right: props.right
    },
    ontransitionend: EndTransition
  }, children);
};

var Navigate = function Navigate(state, _ref2) {
  var onnavigate = _ref2.onnavigate,
      page = _ref2.page,
      direction = _ref2.direction;
  return StartTransition(onnavigate ? onnavigate(state) : state, {
    direction: direction,
    page: page
  });
};

var NavButton = function NavButton(props, children) {
  return button({
    onclick: [Navigate, props]
  }, children);
};

var StartPage = function StartPage(props) {
  return Page(props, [p({}, 'Please pass the phone to the first person'), NavButton({
    direction: 'left',
    page: VotePage
  }, 'Vote')]);
};

var VotePage = function VotePage(props) {
  return Page(props, [(0, _voter.default)({
    value: props.state.voter.vote,
    set: SelectVote
  }), NavButton({
    direction: 'left',
    page: PassPage,
    onnavigate: CommitVote
  }, 'Cast vote!')]);
};

var PassPage = function PassPage(props) {
  return Page(props, [p('Thanks! Pass the phone to the next person'), NavButton({
    direction: 'right',
    page: VotePage
  }, 'Vote'), NavButton({
    direction: 'left',
    page: ResultPage
  }, 'Result')]);
};

var ResultPage = function ResultPage(props) {
  return Page(props, [p(['Happiness Index:', CalcAverage(props.state.voter.tally)]), NavButton({
    direction: 'left',
    page: ResetPage,
    onnavigate: ResetVotes
  }, 'Reset')]);
};

var ResetPage = function ResetPage(props) {
  return Page(props, [p(['Memory Cleared!', CalcAverage(props.state.voter.tally)]), NavButton({
    direction: 'right',
    page: StartPage
  }, 'Start Again')]);
};

var InitNavigator = function InitNavigator(initialPage) {
  return {
    mode: 'idle',
    page: initialPage
  };
};

var NavFrame = function NavFrame(_ref3) {
  var _navstate$prev, _navstate$page, _navstate$prev2, _navstate$page2;

  var navstate = _ref3.navstate,
      appstate = _ref3.appstate;
  return main({
    class: 'container'
  }, navstate.mode === 'start' ? [navstate.prev((_navstate$prev = {}, _defineProperty(_navstate$prev, navstate.direction, true), _defineProperty(_navstate$prev, "exit", true), _defineProperty(_navstate$prev, "state", appstate), _navstate$prev)), navstate.page((_navstate$page = {}, _defineProperty(_navstate$page, navstate.direction, true), _defineProperty(_navstate$page, "enter", true), _defineProperty(_navstate$page, "state", appstate), _navstate$page))] : navstate.mode === 'run' ? [navstate.prev((_navstate$prev2 = {}, _defineProperty(_navstate$prev2, navstate.direction, true), _defineProperty(_navstate$prev2, "exit", true), _defineProperty(_navstate$prev2, "run", true), _defineProperty(_navstate$prev2, "state", appstate), _navstate$prev2)), navstate.page((_navstate$page2 = {}, _defineProperty(_navstate$page2, navstate.direction, true), _defineProperty(_navstate$page2, "enter", true), _defineProperty(_navstate$page2, "run", true), _defineProperty(_navstate$page2, "state", appstate), _navstate$page2))] : [navstate.page({
    state: appstate
  })]);
};

(0, _hyperapp.app)({
  init: function init(_) {
    return {
      nav: InitNavigator(_init.default),
      voter: InitVoter()
    };
  },
  view: function view(state) {
    return body({}, NavFrame({
      navstate: state.nav,
      appstate: state
    }));
  },
  node: document.body
}, //*
_logger.default //*/
);
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./logger":"logger.js","./html":"html.js","./components/voter":"components/voter.js","./pages/init":"pages/init.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57690" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map