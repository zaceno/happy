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
let lock = false;

var _default = dispatch => (...args) => {
  if (typeof args[0] !== 'function') return dispatch(...args);
  const name = args[0].name || '-';
  const payload = args[1];
  const ret = dispatch(...args);
  console.log(name, payload, ret);
  return ret;
};

exports.default = _default;
},{}],"html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _default = new Proxy({}, {
  get(cache, name) {
    if (!cache[name]) {
      cache[name] = (...args) => {
        if (args[0] && typeof args[0] === 'object' && !Array.isArray(args[0])) return (0, _hyperapp.h)(name, ...args);
        return (0, _hyperapp.h)(name, {}, ...args);
      };
    }

    return cache[name];
  }

});

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"fx/immediate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (f => (...a) => [f, a])((a, d) => d(...a));

exports.default = _default;
},{}],"fx/after-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (f => a => [f, a])((a, d) => requestAnimationFrame(_ => d(a)));

exports.default = _default;
},{}],"dispatch-main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = f => f;

exports.default = _default;
},{}],"dispatch-navigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dispatchMain = _interopRequireDefault(require("./dispatch-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = f => (0, _dispatchMain.default)((state, payload) => {
  let news = f(state.navigation, payload);
  let fx = [];
  if (Array.isArray(news)) [news, ...fx] = news;
  news = { ...state,
    navigation: news
  };
  return fx.length ? [news, ...fx] : news;
});

exports.default = _default;
},{"./dispatch-main":"dispatch-main.js"}],"calcs/navigate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finish = exports.run = exports.start = exports.reset = void 0;

const reset = (_, page) => ({
  page,
  mode: 'idle'
});

exports.reset = reset;

const start = (state, {
  page,
  direction
}) => ({
  mode: 'start',
  prev: state.page,
  page,
  direction
});

exports.start = start;

const run = state => ({ ...state,
  mode: 'run'
});

exports.run = run;

const finish = state => ({ ...state,
  mode: 'idle'
});

exports.finish = finish;
},{}],"navigation-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndTransition = exports.Navigate = exports.Init = void 0;

var _afterRender = _interopRequireDefault(require("./fx/after-render"));

var _immediate = _interopRequireDefault(require("./fx/immediate"));

var _dispatchNavigation = _interopRequireDefault(require("./dispatch-navigation"));

var calc = _interopRequireWildcard(require("./calcs/navigate"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Navigate = (0, _dispatchNavigation.default)((state, props) => {
  if (state.mode !== 'idle') return state;
  return [calc.start(state, props), (0, _afterRender.default)(RunTransition), props.onnavigate && (0, _immediate.default)(props.onnavigate)];
});
exports.Navigate = Navigate;
const RunTransition = (0, _dispatchNavigation.default)(calc.run);
const EndTransition = (0, _dispatchNavigation.default)(calc.finish);
exports.EndTransition = EndTransition;
const Init = (0, _dispatchNavigation.default)(calc.reset);
exports.Init = Init;
},{"./fx/after-render":"fx/after-render.js","./fx/immediate":"fx/immediate.js","./dispatch-navigation":"dispatch-navigation.js","./calcs/navigate":"calcs/navigate.js"}],"navigation-page.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("./html"));

var _navigationActions = require("./navigation-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (props, children) => _html.default.section({
  class: {
    page: true,
    exit: props.exit,
    enter: props.enter,
    run: props.run,
    left: props.left,
    right: props.right
  },
  ontransitionend: _navigationActions.EndTransition
}, children);

exports.default = _default;
},{"./html":"html.js","./navigation-actions":"navigation-actions.js"}],"navigation-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("./html"));

var _navigationActions = require("./navigation-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (props, children) => _html.default.button({
  onclick: [_navigationActions.Navigate, props]
}, children);

exports.default = _default;
},{"./html":"html.js","./navigation-actions":"navigation-actions.js"}],"calcs/vote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.avg = exports.vote = exports.reset = void 0;

const reset = _ => ({
  num: 0,
  tot: 0
});

exports.reset = reset;

const vote = ({
  num,
  tot
}, val) => ({
  num: num + 1,
  tot: tot + val
});

exports.vote = vote;

const avg = ({
  num,
  tot
}) => num ? Math.round(tot / num * 10) / 10 : 0;

exports.avg = avg;
},{}],"pages/reset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _start = _interopRequireDefault(require("./start"));

var _vote = require("../calcs/vote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

var _default = props => (0, _navigationPage.default)(props, [p(['Memory Cleared!', (0, _vote.avg)(props.tally)]), (0, _navigationButton.default)({
  direction: 'right',
  page: _start.default
}, 'Start Again')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./start":"pages/start.js","../calcs/vote":"calcs/vote.js"}],"dispatch-tally.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dispatchMain = _interopRequireDefault(require("./dispatch-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = f => (0, _dispatchMain.default)((state, payload) => {
  return { ...state,
    tally: f(state.tally, payload)
  };
});

exports.default = _default;
},{"./dispatch-main":"dispatch-main.js"}],"tally-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Init = exports.CommitVote = exports.ResetVotes = void 0;

var _dispatchTally = _interopRequireDefault(require("./dispatch-tally"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResetVotes = (0, _dispatchTally.default)(_ => ({
  num: 0,
  tot: 0
}));
exports.ResetVotes = ResetVotes;
const CommitVote = (0, _dispatchTally.default)(({
  num,
  tot
}, vote) => ({
  num: num + 1,
  tot: tot + vote
}));
exports.CommitVote = CommitVote;
const Init = ResetVotes;
exports.Init = Init;
},{"./dispatch-tally":"dispatch-tally.js"}],"pages/result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _reset = _interopRequireDefault(require("./reset"));

var _vote = require("../calcs/vote");

var _tallyActions = require("../tally-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

var _default = props => (0, _navigationPage.default)(props, [p(['Happiness Index:', (0, _vote.avg)(props.tally)]), (0, _navigationButton.default)({
  direction: 'left',
  page: _reset.default,
  onnavigate: _tallyActions.ResetVotes
}, 'Reset')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./reset":"pages/reset.js","../calcs/vote":"calcs/vote.js","../tally-actions":"tally-actions.js"}],"pages/pass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _vote = _interopRequireDefault(require("./vote"));

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

var _default = props => (0, _navigationPage.default)(props, [p('Thanks! Pass the phone to the next person'), (0, _navigationButton.default)({
  direction: 'right',
  page: _vote.default
}, 'Vote'), (0, _navigationButton.default)({
  direction: 'left',
  page: _result.default
}, 'Result')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./vote":"pages/vote.js","./result":"pages/result.js"}],"calcs/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.select = void 0;

const select = (old, val) => val;

exports.select = select;

const reset = _ => 0;

exports.reset = reset;
},{}],"happiness-selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.Init = void 0;

var calc = _interopRequireWildcard(require("./calcs/select"));

var _html = _interopRequireDefault(require("./html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const {
  ul,
  li
} = _html.default;

const Select = (state, x) => ({ ...state,
  happiness: calc.select(state.happiness, x)
});

const Init = (state, x) => ({ ...state,
  happiness: calc.reset(state.happiness)
});

exports.Init = Init;

const View = ({
  value
}) => ul({
  class: 'voter'
}, [li({
  onclick: [Select, 0],
  class: {
    selected: value === 0
  }
}, 'Non vote'), li({
  onclick: [Select, 5],
  class: {
    selected: value === 5
  }
}, 'Very Happy'), li({
  onclick: [Select, 4],
  class: {
    selected: value === 4
  }
}, 'Happy'), li({
  onclick: [Select, 3],
  class: {
    selected: value === 3
  }
}, "Don't know"), li({
  onclick: [Select, 2],
  class: {
    selected: value === 2
  }
}, 'Unhappy'), li({
  onclick: [Select, 1],
  class: {
    selected: value === 1
  }
}, 'Very Unhappy')]);

exports.View = View;
},{"./calcs/select":"calcs/select.js","./html":"html.js"}],"pages/vote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _pass = _interopRequireDefault(require("./pass"));

var HappinessSelector = _interopRequireWildcard(require("../happiness-selector"));

var _tallyActions = require("../tally-actions");

var _immediate = _interopRequireDefault(require("../fx/immediate"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

const CommitAndReset = (state, happiness) => [state, (0, _immediate.default)(_tallyActions.CommitVote, happiness), (0, _immediate.default)(HappinessSelector.Init)];

var _default = props => (0, _navigationPage.default)(props, [HappinessSelector.View({
  value: props.happiness
}), (0, _navigationButton.default)({
  direction: 'left',
  page: _pass.default,
  onnavigate: [CommitAndReset, props.happiness]
}, 'Cast vote!')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./pass":"pages/pass.js","../happiness-selector":"happiness-selector.js","../tally-actions":"tally-actions.js","../fx/immediate":"fx/immediate.js"}],"pages/start.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _vote = _interopRequireDefault(require("./vote"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

var _default = props => (0, _navigationPage.default)(props, [p({}, 'Please pass the phone to the first person'), (0, _navigationButton.default)({
  direction: 'left',
  page: _vote.default
}, 'Vote')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./vote":"pages/vote.js"}],"pages/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html"));

var _navigationPage = _interopRequireDefault(require("../navigation-page"));

var _navigationButton = _interopRequireDefault(require("../navigation-button"));

var _start = _interopRequireDefault(require("./start"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  p
} = _html.default;

var _default = props => (0, _navigationPage.default)(props, [p({}, 'Happiness Index Calculator'), (0, _navigationButton.default)({
  direction: 'left',
  page: _start.default
}, 'Start')]);

exports.default = _default;
},{"../html":"html.js","../navigation-page":"navigation-page.js","../navigation-button":"navigation-button.js","./start":"pages/start.js"}],"navigation-container.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("./html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = props => {
  return _html.default.main({
    class: 'container'
  }, props.navigation.mode == 'idle' ? props.navigation.page({ ...props
  }) : [props.navigation.prev({ ...props,
    [props.navigation.direction]: true,
    exit: true,
    run: props.navigation.mode === 'run'
  }), props.navigation.page({ ...props,
    [props.navigation.direction]: true,
    enter: true,
    run: props.navigation.mode === 'run'
  })]);
};

exports.default = _default;
},{"./html":"html.js"}],"main-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Init = void 0;

var _navigationActions = require("./navigation-actions");

var _happinessSelector = require("./happiness-selector");

var _tallyActions = require("./tally-actions");

const Init = (_, initialPage) => (0, _navigationActions.Init)((0, _tallyActions.Init)((0, _happinessSelector.Init)({})), initialPage); //NavInit(TallyInit(HappinessInit({})), initialPage)


exports.Init = Init;
},{"./navigation-actions":"navigation-actions.js","./happiness-selector":"happiness-selector.js","./tally-actions":"tally-actions.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _logger = _interopRequireDefault(require("./logger"));

var _html = _interopRequireDefault(require("./html"));

var _immediate = _interopRequireDefault(require("./fx/immediate"));

var _init = _interopRequireDefault(require("./pages/init"));

var _navigationContainer = _interopRequireDefault(require("./navigation-container"));

var _mainActions = require("./main-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _hyperapp.app)({
  init: [{}, (0, _immediate.default)(_mainActions.Init, _init.default)],
  view: state => {
    return _html.default.body({}, (0, _navigationContainer.default)({
      navigation: state.navigation,
      happiness: state.happiness,
      tally: state.tally
    }));
  },
  node: document.body
}, //*
_logger.default //*/
);
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./logger":"logger.js","./html":"html.js","./fx/immediate":"fx/immediate.js","./pages/init":"pages/init.js","./navigation-container":"navigation-container.js","./main-actions":"main-actions.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51755" + '/');

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