/**
 * Description:
 */
if (window.console && typeof console.log != "function") {
    window.console = undefined;
}
if (!window.console) {
    window.console = {
        log: function(){},
        error: function(){},
        dir: function(){},
        debug: function(){},
        table: function(){}
    };
}

!(function (global) {
    var DEBUG = (function () {
        if (location.search && /(\?|\&)debug=1(\&|$)/.test(location.search)) {
            return true;
        }
        return false;
    })();

    var error = function (msg) {
        if (DEBUG) {
            console.error('[E] ' + msg);
        }
    };

    /* 骞垮憡娓叉煋 */
    global.adRender = function (isForce) {
        var match = location.pathname.match(/^\/(star|v)\/([\w-]+)\b/);
        var sFlag = match == null || match[2] != "2333";
        if (sFlag || (!sFlag && isForce)) {
            var elements = document.querySelectorAll('[data-slot]');
            if (elements && elements.length) {
                [].slice.call(elements, 0).forEach(function (element) {
                    var slotUrl = element.getAttribute('data-slot');
                    element.removeAttribute('data-slot');
                    if (/swf(?=\?|$)/.test(slotUrl)) {
                        // wrapper
                        var wrapper = document.createElement('div');
                        wrapper.style.width = '20px';
                        wrapper.style.height = '20px';
                        wrapper.style.overflow = 'hidden';
                        element.parentNode.replaceChild(wrapper, element);

                        // outer
                        var outer = document.createElement('div');
                        outer.style.width = '400px';
                        outer.style.height = '400px';
                        outer.style.transform = 'scale(0.05)';
                        outer.style.webkitTransform = 'scale(0.05)';
                        outer.style.transformOrigin = '0';
                        outer.style.webkitTransformOrigin = '0';
                        wrapper.appendChild(outer);

                        // inner
                        var inner = document.createElement('div');
                        var id = ['ad', +(new Date), Math.floor(Math.random() * 100000)].join('-');
                        inner.setAttribute('id', id);
                        outer.appendChild(inner);

                        // embed
                        var fparams = {
                            quality: 'high',
                            wmode: 'transparent'
                        };
                        swfobject.embedSWF(slotUrl, id, '100%', '100%', "10.0.0.0", "", {}, fparams);
                        setTimeout(function () {
                            wrapper.style.width = '100%';
                            wrapper.style.height = '100%';

                            outer.style.width = '100%';
                            outer.style.height = '100%';
                            outer.style.transform = 'none';
                            outer.style.webkitTransform = 'none';
                        }, 50);
                    } else {
                        element.src = slotUrl;
                        element.style.opacity = 1;
                    }
                });
            } else {
                error('鏈壘鍒板箍鍛婁綅鍏冪礌');
            }
        }
    };
})(window);
!(function(win, doc, undefined) {

    /*------------------------------------------------------Tick(https://github.com/ErosZy/Tick.js) Animate-----------------------------------------------------------------*/
    var window = win;
    var isIE = !window.getComputedStyle;
    var Tick = {};

    var animateType = {
        "easeInSine":{a:{x:0.47,y:0},b:{x:0.745,y:0.715}},
        "easeOutSine":{a:{x:0.39,y:0.575},b:{x:0.565,y:1}},
        "easeInOutSine":{a:{x:0.445,y:0.05},b:{x:0.55,y:0.95}},
        "easeInQuad":{a:{x:0.55,y:0.085},b:{x:0.68,y:0.53}},
        "easeOutQuad":{a:{x:0.25,y:0.46},b:{x:0.45,y:0.94}},
        "easeInOutQuad":{a:{x:0.455,y:0.03},b:{x:0.515,y:0.955}},
        "easeInCubic":{a:{x:0.55,y:0.055},b:{x:0.675,y:0.19}},
        "easeOutCubic":{a:{x:0.215,y:0.61},b:{x:0.355,y:1}},
        "easeInOutCubic":{a:{x:0.645,y:0.045},b:{x:0.355,y:1}},
        "easeInQuart":{a:{x:0.895,y:0.03},b:{x:0.685,y:0.22}},
        "easeOutQuart":{a:{x:0.165,y:0.84},b:{x:0.44,y:1}},
        "easeInOutQuart":{a:{x:0.77,y:0},b:{x:0.0175,y:1}},
        "easeInQuint":{a:{x:0.755,y:0.05},b:{x:0.855,y:0.06}},
        "easeOutQuint":{a:{x:0.23,y:1},b:{x:0.32,y:1}},
        "easeInOutQuint":{a:{x:0.86,y:0},b:{x:0.07,y:1}},
        "easeInExpo":{a:{x:0.95,y:0.05},b:{x:0.795,y:0.035}},
        "easeOutExpo":{a:{x:0.19,y:1},b:{x:0.22,y:1}},
        "easeInOutExpo":{a:{x:1,y:0},b:{x:0,y:1}},
        "easeInCirc":{a:{x:0.6,y:0.04},b:{x:0.98,y:0.335}},
        "easeOutCirc":{a:{x:0.075,y:0.82},b:{x:0.165,y:1}},
        "easeInOutCirc":{a:{x:0.785,y:0.135},b:{x:0.15,y:0.86}},
        "easeInBack":{a:{x:0.6,y:-0.28},b:{x:0.735,y:0.045}},
        "easeOutBack":{a:{x:0.175,y:0.885},b:{x:0.32,y:1.275}},
        "easeInOutBack":{a:{x:0.68,y:-0.55},b:{x:0.265,y:1.55}}
    };

    Tick.init = function(target, params) {
        var _me = this,
            attr = {},
            fn = null,
            fnParams = [],
            type = '',
            speed = 0,
            val = [];

        for (var item in params) {
            if (params.hasOwnProperty(item)) {
                if (item == "onComplete") {
                    fn = params[item];
                } else if (item == "onCompleteParam") {
                    fnParams = params[item];
                } else {
                    attr[item] = params[item];
                }
            }
        }

        if (_me._isString(arguments[2])) {
            type = animateType[arguments[2]] || animateType["easeInSine"];
            speed = arguments[3] || 1000;
        } else {
            type = animateType["easeInSine"];
            speed = arguments[2] || 1000;
        }

        val.push(target, attr, type, speed, fn, fnParams);

        return val;
    };

    Tick.to = function(target, params) {
        var _me = this;

        if (!_me._isObject(params)) {
            return;
        }

        params = _me.init.apply(_me, arguments);
        _me._animate.apply(_me, params);
    };

    Tick._css = function() {
        var _me = this,
            argsLen = arguments.length,
            isSet = argsLen > 2 || _me._isObject(arguments[1]),
            target = arguments[0],
            attr, val, isJson;

        if (argsLen < 2) {
            return;
        }

        if (isSet) {
            attr = arguments[1];
            val = arguments[2];
            isJson = _me._isObject(attr);

            if (isJson) {
                for (var item in attr) {
                    if (attr.hasOwnProperty(item)) {
                        _me._setAttr(target, item, attr[item]);
                    }
                }
            } else {
                _me._setAttr(target, attr, val);
            }

        } else {
            attr = arguments[1];
            return _me._getAttr(target, attr);
        }

    };

    Tick._setAttr = function(target, attr, val) {
        if (attr == "opacity") {
            if (isIE) {
                var reg = /(opacity=)(\d+(\.\d+)?)/i,
                    filter = target.currentStyle.filter;

                val *= 100;
                attr = "filter";

                val = filter && filter.replace(reg, function() {
                        return arguments[1] + val;
                    });
            }
        } else if (attr != "zIndex") {
            val = val + "px";
        }

        target.style[attr] = val;
    };

    Tick._getAttr = function(target, attr) {
        var val, match;

        if (attr == "opacity" && isIE) {
            var reg = /alpha\((?:opacity=(\d+(\.\d+)?))\)/i,
                filter = target.currentStyle["filter"];

            match = filter.match(reg);

            if (match && match.length > 0) {
                val = "" + (match[1] / 100);
            }

        } else {
            if (isIE) {
                val = target.currentStyle[attr];
            } else {
                val = window.getComputedStyle(target, null)[attr];
            }
        }

        val += '';
        if ((match = val && val.match(/(\d+(\.\d+)?)px/i))) {
            val = match[1];
        }

        return val;
    };

    Tick._isObject = function(obj) {
        return Object.prototype.toString.call(obj) == "[object Object]";
    };

    Tick._isString = function(str) {
        return Object.prototype.toString.call(str) == "[object String]";
    };

    Tick._cubicBezier = function(type, t) {
        var _me = this,
            pa = {
                x: 0,
                y: 0
            },
            pb = type["a"],
            pc = type["b"],
            pd = {
                x: 1,
                y: 1
            },
            x, y;

        x = pa.x * Math.pow(1 - t, 3) + 3 * pb.x * t * Math.pow(1 - t, 2) + 3 * pc.x * Math.pow(t, 2) * (1 - t) + pd.x * Math.pow(t, 3);
        y = pa.y * Math.pow(1 - t, 3) + 3 * pb.y * t * Math.pow(1 - t, 2) + 3 * pc.y * Math.pow(t, 2) * (1 - t) + pd.y * Math.pow(t, 3);

        return {
            x: x,
            y: y
        };
    };

    Tick._animate = function(target, json, type, speed, fn, fnParams) {
        var _me = this,
            timeScale = 1000 / 60,
            timeCount = 0;

        for (var item in json) {
            target[item] = {};
            target[item].oldValue = parseFloat(_me._css(target, item));
        }

        target.timer = target.timer ? target.timer : {};

        if (target.timer) {
            clearTimeout(target.timer);
        }

        target.timer = setInterval(function() {
            var shouldStop = false,
                scale, param;

            timeCount += timeScale;
            shouldStop = speed - timeCount < timeScale;
            param = shouldStop ? 1 : timeCount / speed;
            scale = _me._cubicBezier(type, param);

            if (shouldStop) {
                for (var item in json) {
                    var newValue = target[item].oldValue + (json[item] - target[item].oldValue) * scale.y;
                    _me._css(target, item, newValue);
                }

                clearInterval(target.timer);

                if (typeof fn == "function") {
                    fn.apply(target, fnParams);
                }

            } else {
                for (var item in json) {
                    var newValue = target[item].oldValue + (json[item] - target[item].oldValue) * scale.y;
                    _me._css(target, item, newValue);
                }
            }
        }, timeScale);
    };

    /*------------------------------------------------------$ 瑕嗙洊-----------------------------------------------------------------*/
    function M(param, context) {
        var _me = this;
        _me._elems = [];
        _me._context = null;
        _me._prev = [];

        if (this instanceof M) {
            if (typeof param == "string") {
                _me._elems = toArray(doc.querySelectorAll(param));
                _me._context = context || doc;
            } else if (param instanceof M) {
                _me._elems = param._elems;
                _me._context = param._context;
            } else if (typeof param == "object") {
                param = toArray(param);
                _me._elems = _me._elems.concat(param);
                _me._context = context || doc;
            }
        } else {
            return new M(param, context);
        }
    }

    M.prototype = {
        find: function(query) {
            var _me = this;
            var tmp = [];
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                var elem = _me._elems[i];
                var childs = elem.querySelectorAll(query);
                childs = toArray(childs);
                tmp = tmp.concat(childs);
            }

            var m = new M();
            m._context = _me._elems;
            m._prev = _me._elems;
            m._elems = tmp;
            return m;
        },
        html: function(str) {
            var _me = this;
            if (!str) {
                var elem = _me._elems[0];
                return elem ? elem.innerHTML : '';
            } else {
                for (var i = 0, len = _me._elems.length; i < len; i++) {
                    _me._elems[i].innerHTML = str;
                }
            }
            return _me;
        },
        resize: function(callback) {
            var _me = this;
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                on(_me._elems[i], "resize", function(event) {
                    callback.call(this, event);
                });
            }
            return _me;
        },
        mouseover: function(callback) {
            var _me = this;
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                on(_me._elems[i], "mouseover", function(event) {
                    callback.call(this, event);
                });
            }
            return _me;
        },
        mouseleave: function(callback) {
            var _me = this;
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                on(_me._elems[i], "mouseleave", function(event) {
                    callback.call(this, event);
                });
            }
            return _me;
        },
        on: function() {
            var _me = this;
            if (arguments.length == 2) {
                for (var i = 0, len = _me._elems.length; i < len; i++) {
                    on(_me._elems[i], arguments[0], arguments[1]);
                }
            } else {
                for (var i = 0, len = _me._elems.length; i < len; i++) {
                    proxy(_me._elems[i], arguments[0], arguments[1], arguments[2]);
                }
            }
            return _me;
        },
        width: function(width) {
            var _me = this;
            if (width) {
                this.css({
                    width: width + "px"
                });
            } else {
                if (_me._elems.length) {
                    return _me._elems[0].offsetWidth || _me._elems[0].clientWidth;
                } else {
                    return 0;
                }
            }
            return _me;
        },
        css: function(styles) {
            var _me = this;
            var val = {};
            if (typeof styles == "string") {
                val[styles] = arguments[1];
            } else if (typeof styles == "object") {
                val = styles;
            }
            setCss(_me._elems, val);
            return _me;
        },
        eq: function(index) {
            var _me = this;
            var m = new M(_me._elems[index]);
            return m;
        },
        each: function(callback) {
            var _me = this;
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                callback.call(_me._elems[i], i, _me._elems[i], _me._elems);
            }
            return _me;
        },
        animate: function(styles, speed) {
            var _me = this;
            for (var i = 0, len = _me._elems.length; i < len; i++) {
                Tick.to(_me._elems[i], styles, "easeInShine", speed);
            }
            return _me;
        },
        removeClass: function(className) {
            var _me = this;
            removeClass(_me._elems, className);
            return _me;
        },
        addClass: function(className) {
            var _me = this;
            addClass(_me._elems, className);
            return _me;
        },
        index: function() {
            var _me = this;
            if (_me._elems.length) {
                var elem = _me._elems[0];
                var childs = elem.parentNode.children;
                for (var i = 0, len = childs.length; i < len; i++) {
                    if (childs[i] == elem) {
                        return i;
                    }
                }
                return 0;
            } else {
                return -1;
            }
        }
    };

    M.extend = extend;

    function extend(target) {
        var params = Array.prototype.slice.call(arguments, 1);
        if (params.length) {
            for (var i = 0, len = params.length; i < len; i++) {
                var param = params[i];
                for (var key in param) {
                    if (param.hasOwnProperty(key)) {
                        target[key] = param[key];
                    }
                }
            }
        }
        return target;
    }

    function on(target, eventName, callback) {
        if (target.addEventListener) {
            target.addEventListener(eventName, callback);
        } else if (target.attachEvent) {
            target.attachEvent("on" + eventName, function(event) {
                event = event || window.event;
                callback.call(target, event);
            });
        } else {
            target["on" + eventName] = function(event) {
                event = event || window.event;
                callback.call(target, event);
            };
        }
    }

    function proxy(parent, eventName, child, callback) {
        var childs = parent.querySelectorAll(child);
        on(parent, eventName, function(event) {
            var isProxy = false;
            var target = event.target || event.srcElement;
            for (var i = 0, len = childs.length; i < len; i++) {
                if (childs[i] == target) {
                    isProxy = true;
                    break;
                }
            }

            if (isProxy) {
                callback.call(target, event);
            }
        });
    }

    function isArray(elems) {
        return typeof elems == "object" && "length" in elems && elems[0];
    }

    function toArray(elems) {
        if (isArray(elems)) {
            var tmp = [];
            for (var i = 0, len = elems.length; i < len; i++) {
                tmp.push(elems[i]);
            }
            return tmp;
        }
        return elems;
    }

    function indexOf(target, list) {
        var index = -1;
        list = isArray(list) ? toArray(list) : [].concat(list);
        for (var i = 0, len = list.length; i < len; i++) {
            if (target == list[i]) {
                index = i;
                break;
            }
        }
        return index;
    }

    function eq(elems, index) {
        if (isArray(elems)) {
            return elems[index];
        } else {
            return eq([].concat(elems), index);
        }
    }

    function setCss(elems, cssList) {
        elems = isArray(elems) ? toArray(elems) : [].concat(elems);
        for (var i = 0, len = elems.length; i < len; i++) {
            for (var key in cssList) {
                if (cssList.hasOwnProperty(key)) {
                    if (key != "opacity" && key != "zIndex" && key != "display") {
                        elems[i].style[key] = '' + cssList[key] + "px";
                    } else if (key == "opacity") {
                        elems[i].style[key] = parseFloat(cssList[key]);
                        elems[i].style["filter"] = "alpha(opacity=" + cssList[key] * 100 + ")";
                    } else if (key == "zIndex" || key == "display") {
                        elems[i].style[key] = '' + cssList[key];
                    }
                }
            }
        }
    }

    function removeClass(elems, className) {
        elems = isArray(elems) ? toArray(elems) : [].concat(elems);
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            var index = elem.className.indexOf(className);
            while (index > -1) {
                var prev = elem.className.slice(0, index);
                var next = elem.className.slice(index + className.length);
                elem.className = prev + " " + next;
                index = elem.className.indexOf(className);
            }
        }
    }

    function addClass(elems, className) {
        elems = isArray(elems) ? toArray(elems) : [].concat(elems);
        removeClass(elems, className);
        for (var i = 0, len = elems.length; i < len; i++) {
            elems[i].className += (" " + className).replace(/^\s+|\s+$/, "");
        }
    }

    var $ = M;

    /*------------------------------------------------------Carousel-----------------------------------------------------------------*/

    function s(t) {
        if (t.data.length < 3)
            try {
                console.log("鑷冲皯3涓摕~")
            } catch (i) {}
        else {
            var e = this;
            this.options = $.extend({}, s.options, t);
            this.parent = $(this.options.elm);
            this.index = this.options.index;
            this.maxIndex = this.options.data.length - 1;
            this.parent.html(this.tpl(this.options.data));
            this.nav = this.parent.find(".xxSlider-nav li");
            this.list = this.parent.find(".xxSlider-list li");
            this.draw();
            this.bind();
            this.options.auto && this.start();
            window.onresize = function() {
                e.resize()
            };
        }
    }

    s.options = {
        elm: "#xxx",
        index: 0,
        auto: !0,
        delay: 4e3,
        speed: 500,
        width: 640,
        height: 210,
        data: [],
        change: function() {}
    },
        s.prototype = {
            tpl: function(t) {
                for (var i = "", e = [], s = 0; s < t.length; s++)
                    e.push("<li" + (this.index == s ? ' class="on"' : "") + "></li>");
                i = '<ol class="xxSlider-nav">' + e.join("") + "</ol>";
                for (var n = '<div class="xxSlider-ctrl"><span class="xxSlider-prev J_prev"><i></i></span><span class="xxSlider-next J_next"><i></i></span></div>', o = "", h = [], a = 0; a < t.length; a++)
                    h.push('<li class="' + (this.index == a ? "on" : "") + '"><a href="' + t[a].url + '" target="_blank" title="' + t[a].title + '"><img src="' + t[a].img + '" alt="' + t[a].title + '"/></a><span class="xxSlider-overlay"></span><span class="xxSlider-shadow-l J_prev"></span><span class="xxSlider-shadow-r J_next"></span></li>');
                return o = '<ol class="xxSlider-list" style="height:' + this.options.height + 'px;">' + h.join("") + "</ol>",
                '<div class="xxSlider">' + o + n + i + "</div>"
            },
            bind: function() {
                var t = this;
                this.parent.on("mouseover", function() {
                    $(".xxSlider .xxSlider-ctrl span").css({
                        display: "block"
                    });
                }).on("mouseleave", function() {
                    $(".xxSlider .xxSlider-ctrl span").css({
                        display: "none"
                    });
                }), this.parent.on("click", ".J_prev", function(i) {
                    t.prev();
                }).on("click", ".J_prev i", function(i) {
                    t.prev();
                }).on("click", ".J_next", function(i) {
                    t.next();
                }).on("click", ".J_next i", function(i) {
                    t.next();
                }),
                    this.nav.on("click", function(i) {
                        var e = $(this).index();
                        t.go(e);
                    }),
                    this.list.on("click", function(i) {
                        var e = $(this).index();
                        t.index != e && t.go(e);
                    })
            },
            draw: function() {
                if (!this.locked) {
                    var t = this.parent.width();
                    this.unitStyle = {
                        hide: {
                            zIndex: 0,
                            opacity: 0,
                            width: 0,
                            height: 0,
                            left: t / 2,
                            top: this.options.height / 2
                        },
                        show: {
                            zIndex: 3,
                            opacity: 1,
                            width: this.options.width,
                            height: this.options.height,
                            left: (t - this.options.width) / 2,
                            top: 0
                        },
                        prev: {
                            zIndex: 2,
                            opacity: 1,
                            width: .8 * this.options.width,
                            height: .8 * this.options.height,
                            left: 0,
                            top: .1 * this.options.height
                        },
                        next: {
                            zIndex: 2,
                            opacity: 1,
                            width: .8 * this.options.width,
                            height: .8 * this.options.height,
                            left: t - .8 * this.options.width,
                            top: .1 * this.options.height
                        },
                        subPrev: {
                            zIndex: 1,
                            opacity: 0,
                            width: .5 * this.options.width,
                            height: .5 * this.options.height,
                            left: .5 * -this.options.width,
                            top: .25 * this.options.height
                        },
                        subNext: {
                            zIndex: 1,
                            opacity: 0,
                            height: .5 * this.options.height,
                            width: .5 * this.options.width,
                            left: t,
                            top: .25 * this.options.height
                        }
                    };
                    this.list.css(this.unitStyle.hide);
                    this.list.eq(this.index).css(this.unitStyle.show);
                    this.list.eq(0 == this.index ? this.maxIndex : this.index - 1).css(this.unitStyle.prev);
                    this.list.eq(this.index == this.maxIndex ? 0 : this.index + 1).css(this.unitStyle.next);
                    this.list.find(".xxSlider-overlay").eq(this.index).css({
                        display: "none"
                    });
                }
            },
            resize: function() {
                var t = this;
                clearTimeout(t.resizeTimeout),
                    t.resizeTimeout = setTimeout(function() {
                        t.draw()
                    }, 30)
            },
            go: function(t) {
                var i = this;
                if (!(i.locked || t == i.index || 0 > t || t > i.maxIndex)) {
                    i.locked = !0;
                    var e, s = 0 == t ? i.maxIndex : t - 1,
                        n = t == i.maxIndex ? 0 : t + 1,
                        o = 0 == s ? i.maxIndex : s - 1,
                        h = n == i.maxIndex ? 0 : n + 1,
                        a = 1 == Math.abs(t - i.index) || Math.abs(t - i.index) == i.maxIndex;
                    e = t - i.index > 0 ? t - i.index <= i.maxIndex - t + i.index ? "R" : "L" : i.index - t <= i.maxIndex - i.index + t ? "L" : "R",
                        i.list.each(function(d, l) {
                            d == t || d == s || d == n || a && "R" == e && d == o || a && "L" == e && d == h || ($(l).css({
                                zIndex: 0
                            }).animate(i.unitStyle.hide, i.options.speed));
                        });
                    i.maxIndex > 2 ? ("R" == e ? i.list.eq(n).css(i.unitStyle.subNext) : i.list.eq(s).css(i.unitStyle.subPrev),
                    a && ("R" == e ? i.list.eq(o).css({
                        zIndex: 1
                    }).animate(i.unitStyle.subPrev, i.options.speed) : i.list.eq(h).css({
                        zIndex: 1
                    }).animate(i.unitStyle.subNext, i.options.speed)),
                        i.list.eq(t).css({
                            zIndex: 3
                        }).animate(i.unitStyle.show, i.options.speed),
                        i.list.eq(s).css({
                            zIndex: 2
                        }).animate(i.unitStyle.prev, i.options.speed),
                        i.list.eq(n).css({
                            zIndex: 2
                        }).animate(i.unitStyle.next, i.options.speed)) : (i.list.eq(t).css({
                        zIndex: 3
                    }).animate(i.unitStyle.show, i.options.speed),
                        i.list.eq(s).css({
                            zIndex: "R" == e ? 2 : 1
                        }).animate(i.unitStyle.prev, i.options.speed),
                        i.list.eq(n).css({
                            zIndex: "L" == e ? 2 : 1
                        }).animate(i.unitStyle.next, i.options.speed)),
                        setTimeout(function() {
                            i.locked = !1;
                            i.resize();
                        }, i.options.speed),
                        i.index = t,
                        i.list.removeClass("on").eq(t).addClass("on"),
                        i.nav.removeClass("on").eq(t).addClass("on"),
                        i.options.change.call(i, t),
                        i.list.find(".xxSlider-overlay").css({
                            display: "block"
                        }).eq(t).css({
                            display: "none"
                        });
                }
            },
            next: function() {
                this.go(this.index == this.maxIndex ? 0 : this.index + 1)
            },
            prev: function() {
                this.go(0 == this.index ? this.maxIndex : this.index - 1)
            },
            start: function() {
                var t = this;
                this.stop(),
                    this.timerId = setInterval(function() {
                        t.next()
                    }, this.options.delay)
            },
            stop: function() {
                clearInterval(this.timerId)
            }
        };

    window.Carousel = s;

}(window, document));
function fullAvatarEditor() {
    var id = 'fullAvatarEditor'			//flash鏂囦欢鐨処D
    var file = 'fullAvatarEditor.swf';		//flash鏂囦欢鐨勮矾寰�
    var version = "10.1.0";						//鎾斁璇lash鎵€闇€鐨勬渶浣庣増鏈�
    var expressInstall = 'expressInstall.swf';			//expressInstall.swf鐨勮矾寰�
    var width = 630;							//flash鏂囦欢鐨勫搴�
    var height = 430;							//flash鏂囦欢鐨勯珮搴�
    var container = id;							//瑁呰浇flash鏂囦欢鐨勫鍣�(濡俤iv)鐨刬d
    var flashvars = {};
    var callback = function () {
    };
    var heightChanged = false;
    //鏅鸿兘鑾峰彇鍙傛暟锛屽瓧绗︾被鍨嬩负瑁呰浇flash鏂囦欢鐨勫鍣�(濡俤iv)鐨刬d锛岀涓€涓暟瀛楃被鍨嬬殑涓洪珮搴︼紝绗簩涓负瀹藉害锛岀涓€涓猳bject绫诲瀷鐨勪负鍙傛暟瀵硅薄锛屽姝�4涓弬鏁扮殑椤哄簭鍙殢鎰忋€�
    for (var i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        if (typeof a == 'string') {
            if (a.lastIndexOf("fullAvatarEditor.swf") != -1) {
                file = a;
            }
            else if (a.lastIndexOf('expressInstall.swf') != -1) {
                expressInstall = a;
            }
            else {
                container = a;
            }
        }
        else if (typeof a == 'number') {
            if (heightChanged) {
                width = a;
            }
            else {
                height = a;
                heightChanged = true;
            }
        }
        else if (typeof a == 'function') {
            callback = a;
        }
        else {
            flashvars = a;
        }
    }
    var vars = {
        id: id
    };
    //鍚堝苟鍙傛暟
    for (var name in flashvars) {
        if (flashvars[name] != null) {
            if (name == 'upload_url' || name == 'src_url') {
                vars[name] = encodeURIComponent(flashvars[name]);
            }
            else {
                vars[name] = flashvars[name];
            }
        }
    }
    var params = {
        menu: 'true',
        scale: 'noScale',
        allowFullscreen: 'true',
        allowScriptAccess: 'always',
        wmode: 'transparent'
    };
    var attributes = {
        id: vars.id,
        name: vars.id
    };
    var swf = null;
    var callbackFn = function (e) {
        swf = e.ref;
        swf.eventHandler = function (json) {
            callback.call(swf, json);
        };
    };

    swfobject.embedSWF(
        file,
        container,
        width,
        height,
        version,
        expressInstall,
        vars,
        params,
        attributes,
        callbackFn
    );
    return swf;
}
;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-72740474-1', 'auto');
ga('send', 'pageview');
!function(){
    // Created by zhangyunlong, at 2016/05/13
    function getAnchor(node){
        var count = 100;
        while (count--){
            if(node){
                var tagName = node.tagName ? node.tagName.toLocaleLowerCase() : 'unknown';
                switch (tagName){
                    case 'a':
                        return node;
                        break;
                    case 'body':
                        return null;
                        break;
                }
                node = node.parentNode;
            } else {
                break;
            }
        }
        return null;
    }

    var method, eventType;
    if(document.documentElement.addEventListener){
        method = 'addEventListener';
        eventType = 'click';
    } else {
        method = 'attachEvent';
        eventType = 'onclick';
    }
    document.documentElement[method](eventType, function(e){
        var anchor = getAnchor(e.target);
        if(anchor && anchor.href){
            anchor.href = anchor.href.replace(/\/heartstone(?=[\/\?]|$)/g, '/hearthstone');
        }
    }, true);
}();
~function () {
    if (window.addEventListener) return;
    /*
     * by zhangxinxu(.com) on 2013-12-11
     * under MIT license
     */

    (function(window, document, undefined) {
        /*
         * Object ES5 extend
         */
        if (!Object.create) {
            Object.create = function (o) {
                if (arguments.length > 1) {
                    throw new Error('Object.create implementation only accepts the first parameter.');
                }
                function F() {}
                F.prototype = o;
                return new F();
            };
        }

        if (!Object.keys) {
            Object.keys = function(o) {
                if (o !== Object(o)) {
                    throw new TypeError('Object.keys called on a non-object');
                }
                var k=[], p;
                for (p in o) {
                    if (Object.prototype.hasOwnProperty.call(o,p)) {
                        k.push(p);
                    }
                }
                return k;
            };
        }

        /*
         * Date ES5 extend
         */
        if (!Date.now) {
            Date.now = function now() {
                return (new Date).valueOf();
            };
        }


        /*
         * JSON ES5 extend
         * Now use json2.js at the bottom of this file
         */
        /*if (!window.JSON) {
         window.JSON = {
         parse: function (sJSON) { return eval("(" + sJSON + ")"); },
         stringify: function (vContent) {
         if (vContent instanceof Object) {
         var sOutput = "";
         if (vContent.constructor === Array) {
         for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
         return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
         }
         if (vContent.toString !== Object.prototype.toString) {
         return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
         }
         for (var sProp in vContent) {
         sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
         }
         return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
         }
         return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
         }
         };
         }*/

        /*
         * Function ES5 extend
         */
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis || window,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        /*
         * String ES5 extend
         */
        if(!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g,'');
            };
        }

        /*
         * Array ES5 extend
         */
        if(!Array.isArray) {
            Array.isArray = function (vArg) {
                return Object.prototype.toString.call(vArg) === "[object Array]";
            };
        }

        if (typeof Array.prototype.forEach != "function") {
            Array.prototype.forEach = function (fn, scope) {
                var i, len;
                for (i = 0, len = this.length; i < len; ++i) {
                    if (i in this) {
                        fn.call(scope, this[i], i, this);
                    }
                }
            };
        }

        if (typeof Array.prototype.map != "function") {
            Array.prototype.map = function (fn, context) {
                var arr = [];
                if (typeof fn === "function") {
                    for (var k = 0, length = this.length; k < length; k++) {
                        arr.push(fn.call(context, this[k], k, this));
                    }
                }
                return arr;
            };
        }

        if (typeof Array.prototype.filter != "function") {
            Array.prototype.filter = function (fn, context) {
                var arr = [];
                if (typeof fn === "function") {
                    for (var k = 0, length = this.length; k < length; k++) {
                        fn.call(context, this[k], k, this) && arr.push(this[k]);
                    }
                }
                return arr;
            };
        }

        if (typeof Array.prototype.some != "function") {
            Array.prototype.some = function (fn, context) {
                var passed = false;
                if (typeof fn === "function") {
                    for (var k = 0, length = this.length; k < length; k++) {
                        if (passed === true) break;
                        passed = !!fn.call(context, this[k], k, this);
                    }
                }
                return passed;
            };
        }

        if (typeof Array.prototype.every != "function") {
            Array.prototype.every = function (fn, context) {
                var passed = true;
                if (typeof fn === "function") {
                    for (var k = 0, length = this.length; k < length; k++) {
                        if (passed === false) break;
                        passed = !!fn.call(context, this[k], k, this);
                    }
                }
                return passed;
            };
        }

        if (typeof Array.prototype.indexOf != "function") {
            Array.prototype.indexOf = function (searchElement, fromIndex) {
                var index = -1;
                fromIndex = fromIndex * 1 || 0;

                for (var k = 0, length = this.length; k < length; k++) {
                    if (k >= fromIndex && this[k] === searchElement) {
                        index = k;
                        break;
                    }
                }
                return index;
            };
        }

        if (typeof Array.prototype.lastIndexOf != "function") {
            Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
                var index = -1, length = this.length;
                fromIndex = fromIndex * 1 || length - 1;

                for (var k = length - 1; k > -1; k-=1) {
                    if (k <= fromIndex && this[k] === searchElement) {
                        index = k;
                        break;
                    }
                }
                return index;
            };
        }

        if (typeof Array.prototype.reduce != "function") {
            Array.prototype.reduce = function (callback, initialValue ) {
                var previous = initialValue, k = 0, length = this.length;
                if (typeof initialValue === "undefined") {
                    previous = this[0];
                    k = 1;
                }

                if (typeof callback === "function") {
                    for (k; k < length; k++) {
                        this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
                    }
                }
                return previous;
            };
        }

        if (typeof Array.prototype.reduceRight != "function") {
            Array.prototype.reduceRight = function (callback, initialValue ) {
                var length = this.length, k = length - 1, previous = initialValue;
                if (typeof initialValue === "undefined") {
                    previous = this[length - 1];
                    k--;
                }
                if (typeof callback === "function") {
                    for (k; k > -1; k-=1) {
                        this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
                    }
                }
                return previous;
            };
        }

        /**
         * dom method that extend
         */
        var oDomExtend = {
            // selector realtive
            querySelector: function(selector) {
                return oDomExtend.querySelectorAll.call(this, selector)[0] || null;
            },
            querySelectorAll: function(selector) {
                return fDomExtend(Sizzle(selector, this));
            },
            getElementsByClassName: function(classNames) {
                return this.querySelectorAll("." + classNames.trim().replace(/\s+/, "."));
            },
            // addEventListener
            addEventListener: function(eventType, funcHandle, useCapture) {
                var element = this, eventStoreType = '';
                if (eventType == "input") { eventType = "propertychange"; }
                if (typeof funcHandle != "function") return;
                // some compatibility deal
                var eventHandle = function(event) {
                    event = event || window.event || {};

                    if (!event.target) event.target = event.srcElement;
                    if (!event.preventDefault) event.preventDefault = function() {
                        event.returnValue = false;
                    };

                    if (eventType == "propertychange") {
                        if (event.propertyName !== "value" || element.r_oldvalue === element.value) return;
                        element.r_oldvalue = element.value;
                    }
                    return funcHandle.call(element, event || {});
                };
                eventHandle.initFuncHandle = funcHandle;

                // event bind
                element.attachEvent("on" + eventType, eventHandle);

                // event store
                if (element["event" + eventType]) {
                    element["event" + eventType].push(eventHandle);
                } else {
                    element["event" + eventType] = [eventHandle];
                }
            },
            dispatchEvent: function(event) {
                var eventType = event && event.type;
                if (eventType && this["event" + eventType]) {
                    event.target = this;
                    this["event" + eventType].forEach(function(eventHandle) {
                        event.timeStamp = Date.now();
                        eventHandle.call(this, event);
                    }.bind(this));
                }
            },
            removeEventListener: function(eventType, funcHandle, useCapture) {
                var arrEventStore = this["event" + eventType];
                if (Array.isArray(arrEventStore)) {
                    this["event" + eventType] = arrEventStore.filter(function(eventHandle) {
                        if (eventHandle.initFuncHandle === funcHandle) {
                            this.detachEvent("on" + eventType, eventHandle);
                            return false;
                        }
                        return true;
                    }.bind(this));
                }
            }

        };

        var fDomExtend = function(collection) {
            // collection extend some dom method
            collection.forEach(function(element, index) {
                for (var key in oDomExtend) {
                    element[key] = oDomExtend[key].bind(element);
                }
            });
            return collection;
        };

        /*
         * document.querySelector, document.querySelectorAll
         */
        document.querySelector = function(selector) {
            return document.querySelectorAll(selector)[0] || null;
        };
        document.querySelectorAll = function(selector) {
            var collection = Sizzle(selector);
            return fDomExtend(collection);
        };
        /*
         * getElementsByClassName
         */
        if (!document.getElementsByClassName) {
            document.getElementsByClassName = function(classNames) {
                return oDomExtend.getElementsByClassName.call(document, classNames);
            };
        }
        /*
         * addEventListener
         * include event of "input"
         */
        /*
         if (typeof document.addEventListener == "undefined") {
         [window, document].forEach(function(global) {
         global.addEventListener = function(eventType, funcHandle, useCapture) {
         oDomExtend.addEventListener.call(global, eventType, funcHandle, useCapture);
         };
         global.dispatchEvent = function(event) {
         oDomExtend.dispatchEvent.call(global, event);
         };
         global.removeEventListener = function() {
         oDomExtend.removeEventListener.call(global, eventType, funcHandle, useCapture);
         };
         });
         }
         if (!document.createEvent) {
         document.createEvent = function(type) {
         var event = {};
         switch (type) {
         case "Event": case "Events": case "HTMLEvents": {
         event = {
         initEvent: function(eventType, canBubble, cancelable) {
         event.type = eventType;
         event.canBubble = canBubble || false;
         event.cancelable = cancelable || false;
         delete(event.initEvent);
         },
         bubbles: false,
         cancelBubble: false,
         cancelable: false,
         clipboardData: undefined,
         currentTarget: null,
         defaultPrevented: false,
         eventPhase: 0,
         returnValue: true,
         srcElement: null,
         target: null,
         timeStamp: Date.now(),
         type: ""
         };

         break;
         }
         case "MouseEvents": {
         event = {
         initMouseEvent: function(eventType, canBubble, cancelable, view,
         detail, screenX, screenY, clientX, clientY,
         ctrlKey, altKey, shiftKey, metaKey,
         button, relatedTarget
         ) {
         event.type = eventType;
         event.canBubble = canBubble || false;
         event.cancelable = cancelable || false;
         event.view = view || null;
         event.screenX = screenX || 0;
         event.screenY = screenY || 0;
         event.clientX = clientX || 0;
         event.clientY = clientY || 0;
         event.ctrlKey = ctrlKey || false;
         event.altKey = altKey || false;
         event.shiftKey = shiftKey || false;
         event.metaKey = metaKey || false;
         event.button = button || 0;
         event.relatedTarget = relatedTarget || null;
         delete(event.initMouseEvent);
         },
         altKey: false,
         bubbles: false,
         button: 0,
         cancelBubble: false,
         cancelable: false,
         charCode: 0,
         clientX: 0,
         clientY: 0,
         clipboardData: undefined,
         ctrlKey: false,
         currentTarget: null,
         dataTransfer: null,
         defaultPrevented: false,
         detail: 0,
         eventPhase: 0,
         fromElement: null,
         keyCode: 0,
         layerX: 0,
         layerY: 0,
         metaKey: false,
         offsetX: 0,
         offsetY: 0,
         pageX: 0,
         pageY: 0,
         relatedTarget: null,
         returnValue: true,
         screenX: 0,
         screenY: 0,
         shiftKey: false,
         srcElement: null,
         target: null,
         timeStamp: Date.now(),
         toElement: null,
         type: "",
         view: null,
         webkitMovementX: 0,
         webkitMovementY: 0,
         which: 0,
         x: 0,
         y: 0
         };

         break;
         }
         case "UIEvents": {
         event = {
         initUIEvent: function(eventType, canBubble, cancelable, view, detail) {
         event.type = eventType;
         event.canBubble = canBubble || false;
         event.cancelable = cancelable || false;
         event.view = view || null;
         event.detail = detail || 0;
         delete(event.initUIEvent);
         },
         bubbles: false,
         cancelBubble: false,
         cancelable: false,
         charCode: 0,
         clipboardData: undefined,
         currentTarget: null,
         defaultPrevented: false,
         detail: 0,
         eventPhase: 0,
         keyCode: 0,
         layerX: 0,
         layerY: 0,
         pageX: 0,
         pageY: 0,
         returnValue: true,
         srcElement: null,
         target: null,
         timeStamp: Date.now(),
         type: "",
         view: null,
         which: 0
         };
         break;
         }
         default: {
         throw new TypeError("NotSupportedError: The implementation did not support the requested type of object or operation.");
         }
         }
         return event;
         };
         }
         */

        /**
         * onhashchange
         */
        // exit if the browser implements that event
        if (!("addEventListener" in document.createElement("div"))) {
            var location = window.location,
                oldURL = location.href,
                oldHash = location.hash;

            // check the location hash on a 100ms interval
            setInterval(function() {
                var newURL = location.href,
                    newHash = location.hash;

                // if the hash has changed and a handler has been bound...
                if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
                    // execute the handler
                    window.onhashchange({
                        type: "hashchange",
                        oldURL: oldURL,
                        newURL: newURL
                    });

                    oldURL = newURL;
                    oldHash = newHash;
                }
            }, 100);
        }

        /**
         * getComputedStyle
         */
        if (typeof window.getComputedStyle !== "function") {
            window.getComputedStyle = function(el, pseudo) {
                var oStyle = {};
                var oCurrentStyle = el.currentStyle || {};
                for (var key in oCurrentStyle) {
                    oStyle[key] = oCurrentStyle[key];
                }

                oStyle.styleFloat = oStyle.cssFloat;

                oStyle.getPropertyValue = function(prop) {
                    // return oCurrentStyle.getAttribute(prop) || null;  // IE6 do not support "key-key" but "keyKey"
                    var re = /(\-([a-z]){1})/g;
                    if (prop == 'float') prop = 'styleFloat';
                    if (re.test(prop)) {
                        prop = prop.replace(re, function () {
                            return arguments[2].toUpperCase();
                        });
                    }
                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
                }
                return oStyle;
            }
        }

    })(window, document);

    /*!
     * Sizzle CSS Selector Engine v@VERSION
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: @DATE
     */
    (function( window ) {

        var i,
            support,
            cachedruns,
            Expr,
            getText,
            isXML,
            compile,
            outermostContext,
            sortInput,
            hasDuplicate,

            // Local document vars
            setDocument,
            document,
            docElem,
            documentIsHTML,
            rbuggyQSA,
            rbuggyMatches,
            matches,
            contains,

            // Instance-specific data
            expando = "sizzle" + -(new Date()),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            sortOrder = function( a, b ) {
                if ( a === b ) {
                    hasDuplicate = true;
                }
                return 0;
            },

            // General-purpose constants
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,

            // Instance methods
            hasOwn = ({}).hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            // Use a stripped-down indexOf if we can't use a native one
            indexOf = arr.indexOf || function( elem ) {
                    var i = 0,
                        len = this.length;
                    for ( ; i < len; i++ ) {
                        if ( this[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier = characterEncoding.replace( "w", "w#" ),

            // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

            // Prefer arguments quoted,
            //   then not containing pseudos/brackets,
            //   then attribute selectors/non-parenthetical expressions,
            //   then anything else
            // These preferences are here to reduce the number of selectors
            //   needing tokenize in the PSEUDO preFilter
            pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

            rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
            rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

            rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

            rpseudo = new RegExp( pseudos ),
            ridentifier = new RegExp( "^" + identifier + "$" ),

            matchExpr = {
                "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                "ATTR": new RegExp( "^" + attributes ),
                "PSEUDO": new RegExp( "^" + pseudos ),
                "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
            },

            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,

            rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

            rsibling = /[+~]/,
            rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
            funescape = function( _, escaped, escapedWhitespace ) {
                var high = "0x" + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace ?
                    escaped :
                    high < 0 ?
                        // BMP codepoint
                        String.fromCharCode( high + 0x10000 ) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
            };

        // Optimize for push.apply( _, NodeList )
        try {
            push.apply(
                (arr = slice.call( preferredDoc.childNodes )),
                preferredDoc.childNodes
            );
            // Support: Android<4.0
            // Detect silently failing push.apply
            arr[ preferredDoc.childNodes.length ].nodeType;
        } catch ( e ) {
            push = { apply: arr.length ?

                // Leverage slice if possible
                function( target, els ) {
                    push_native.apply( target, slice.call(els) );
                } :

                // Support: IE<9
                // Otherwise append directly
                function( target, els ) {
                    var j = target.length,
                        i = 0;
                    // Can't trust NodeList.length
                    while ( (target[j++] = els[i++]) ) {}
                    target.length = j - 1;
                }
            };
        }

        function Sizzle( selector, context, results, seed ) {
            var match, elem, m, nodeType,
                // QSA vars
                i, groups, old, nid, newContext, newSelector;

            if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                setDocument( context );
            }

            context = context || document;
            results = results || [];

            if ( !selector || typeof selector !== "string" ) {
                return results;
            }

            if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
                return [];
            }

            if ( documentIsHTML && !seed ) {

                // Shortcuts
                if ( (match = rquickExpr.exec( selector )) ) {
                    // Speed-up: Sizzle("#ID")
                    if ( (m = match[1]) ) {
                        if ( nodeType === 9 ) {
                            elem = context.getElementById( m );
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document (jQuery #6963)
                            if ( elem && elem.parentNode ) {
                                // Handle the case where IE, Opera, and Webkit return items
                                // by name instead of ID
                                if ( elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            // Context is not a document
                            if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                contains( context, elem ) && elem.id === m ) {
                                results.push( elem );
                                return results;
                            }
                        }

                        // Speed-up: Sizzle("TAG")
                    } else if ( match[2] ) {
                        push.apply( results, context.getElementsByTagName( selector ) );
                        return results;

                        // Speed-up: Sizzle(".CLASS")
                    } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
                        push.apply( results, context.getElementsByClassName( m ) );
                        return results;
                    }
                }

                // QSA path
                if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;

                    // qSA works strangely on Element-rooted queries
                    // We can work around this by specifying an extra ID on the root
                    // and working up from there (Thanks to Andrew Dupont for the technique)
                    // IE 8 doesn't work on object elements
                    if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                        groups = tokenize( selector );

                        if ( (old = context.getAttribute("id")) ) {
                            nid = old.replace( rescape, "\\$&" );
                        } else {
                            context.setAttribute( "id", nid );
                        }
                        nid = "[id='" + nid + "'] ";

                        i = groups.length;
                        while ( i-- ) {
                            groups[i] = nid + toSelector( groups[i] );
                        }
                        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                        newSelector = groups.join(",");
                    }

                    if ( newSelector ) {
                        try {
                            push.apply( results,
                                newContext.querySelectorAll( newSelector )
                            );
                            return results;
                        } catch(qsaError) {
                        } finally {
                            if ( !old ) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }

            // All others
            return select( selector.replace( rtrim, "$1" ), context, results, seed );
        }

        /**
         * Create key-value caches of limited size
         * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
         *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
         *	deleting the oldest entry
         */
        function createCache() {
            var keys = [];

            function cache( key, value ) {
                // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                if ( keys.push( key + " " ) > Expr.cacheLength ) {
                    // Only keep the most recent entries
                    delete cache[ keys.shift() ];
                }
                return (cache[ key + " " ] = value);
            }
            return cache;
        }

        /**
         * Mark a function for special use by Sizzle
         * @param {Function} fn The function to mark
         */
        function markFunction( fn ) {
            fn[ expando ] = true;
            return fn;
        }

        /**
         * Support testing using an element
         * @param {Function} fn Passed the created div and expects a boolean result
         */
        function assert( fn ) {
            var div = document.createElement("div");

            try {
                return !!fn( div );
            } catch (e) {
                return false;
            } finally {
                // Remove from its parent by default
                if ( div.parentNode ) {
                    div.parentNode.removeChild( div );
                }
                // release memory in IE
                div = null;
            }
        }

        /**
         * Adds the same handler for all of the specified attrs
         * @param {String} attrs Pipe-separated list of attributes
         * @param {Function} handler The method that will be applied
         */
        function addHandle( attrs, handler ) {
            var arr = attrs.split("|"),
                i = attrs.length;

            while ( i-- ) {
                Expr.attrHandle[ arr[i] ] = handler;
            }
        }

        /**
         * Checks document order of two siblings
         * @param {Element} a
         * @param {Element} b
         * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
         */
        function siblingCheck( a, b ) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    ( ~b.sourceIndex || MAX_NEGATIVE ) -
                    ( ~a.sourceIndex || MAX_NEGATIVE );

            // Use IE sourceIndex if available on both nodes
            if ( diff ) {
                return diff;
            }

            // Check if b follows a
            if ( cur ) {
                while ( (cur = cur.nextSibling) ) {
                    if ( cur === b ) {
                        return -1;
                    }
                }
            }

            return a ? 1 : -1;
        }

        /**
         * Returns a function to use in pseudos for input types
         * @param {String} type
         */
        function createInputPseudo( type ) {
            return function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        /**
         * Returns a function to use in pseudos for buttons
         * @param {String} type
         */
        function createButtonPseudo( type ) {
            return function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

        /**
         * Returns a function to use in pseudos for positionals
         * @param {Function} fn
         */
        function createPositionalPseudo( fn ) {
            return markFunction(function( argument ) {
                argument = +argument;
                return markFunction(function( seed, matches ) {
                    var j,
                        matchIndexes = fn( [], seed.length, argument ),
                        i = matchIndexes.length;

                    // Match elements found at the specified indexes
                    while ( i-- ) {
                        if ( seed[ (j = matchIndexes[i]) ] ) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }

        /**
         * Checks a node for validity as a Sizzle context
         * @param {Element|Object=} context
         * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
         */
        function testContext( context ) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }

        // Expose support vars for convenience
        support = Sizzle.support = {};

        /**
         * Detects XML nodes
         * @param {Element|Object} elem An element or a document
         * @returns {Boolean} True iff elem is a non-HTML XML node
         */
        isXML = Sizzle.isXML = function( elem ) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        /**
         * Sets document-related variables once based on the current document
         * @param {Element|Object} [doc] An element or document object to use to set the document
         * @returns {Object} Returns the current document
         */
        setDocument = Sizzle.setDocument = function( node ) {
            var hasCompare,
                doc = node ? node.ownerDocument || node : preferredDoc,
                parent = doc.defaultView;

            // If no document and documentElement is available, return
            if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                return document;
            }

            // Set our document
            document = doc;
            docElem = doc.documentElement;

            // Support tests
            documentIsHTML = !isXML( doc );

            // Support: IE>8
            // If iframe document is assigned to "document" variable and if iframe has been reloaded,
            // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
            // IE6-8 do not support the defaultView property so parent will be undefined
            if ( parent && parent !== parent.top ) {
                // IE11 does not have attachEvent, so all must suffer
                if ( parent.addEventListener ) {
                    parent.addEventListener( "unload", function() {
                        setDocument();
                    }, false );
                } else if ( parent.attachEvent ) {
                    parent.attachEvent( "onunload", function() {
                        setDocument();
                    });
                }
            }

            /* Attributes
             ---------------------------------------------------------------------- */

            // Support: IE<8
            // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
            support.attributes = assert(function( div ) {
                div.className = "i";
                return !div.getAttribute("className");
            });

            /* getElement(s)By*
             ---------------------------------------------------------------------- */

            // Check if getElementsByTagName("*") returns only elements
            support.getElementsByTagName = assert(function( div ) {
                div.appendChild( doc.createComment("") );
                return !div.getElementsByTagName("*").length;
            });

            // Check if getElementsByClassName can be trusted
            support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
                    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                    // Support: Safari<4
                    // Catch class over-caching
                    div.firstChild.className = "i";
                    // Support: Opera<10
                    // Catch gEBCN failure to find non-leading classes
                    return div.getElementsByClassName("i").length === 2;
                });

            // Support: IE<10
            // Check if getElementById returns elements by name
            // The broken getElementById methods don't pick up programatically-set names,
            // so use a roundabout getElementsByName test
            support.getById = assert(function( div ) {
                docElem.appendChild( div ).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
            });

            // ID find and filter
            if ( support.getById ) {
                Expr.find["ID"] = function( id, context ) {
                    if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
                        var m = context.getElementById( id );
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter["ID"] = function( id ) {
                    var attrId = id.replace( runescape, funescape );
                    return function( elem ) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                // Support: IE6/7
                // getElementById is not reliable as a find shortcut
                delete Expr.find["ID"];

                Expr.filter["ID"] =  function( id ) {
                    var attrId = id.replace( runescape, funescape );
                    return function( elem ) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }

            // Tag
            Expr.find["TAG"] = support.getElementsByTagName ?
                function( tag, context ) {
                    if ( typeof context.getElementsByTagName !== strundefined ) {
                        return context.getElementsByTagName( tag );
                    }
                } :
                function( tag, context ) {
                    var elem,
                        tmp = [],
                        i = 0,
                        results = context.getElementsByTagName( tag );

                    // Filter out possible comments
                    if ( tag === "*" ) {
                        while ( (elem = results[i++]) ) {
                            if ( elem.nodeType === 1 ) {
                                tmp.push( elem );
                            }
                        }

                        return tmp;
                    }
                    return results;
                };

            // Class
            Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
                        return context.getElementsByClassName( className );
                    }
                };

            /* QSA/matchesSelector
             ---------------------------------------------------------------------- */

            // QSA and matchesSelector support

            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            rbuggyMatches = [];

            // qSa(:focus) reports false when true (Chrome 21)
            // We allow this because of a bug in IE8/9 that throws an error
            // whenever `document.activeElement` is accessed on an iframe
            // So, we allow :focus to pass through QSA all the time to avoid the IE error
            // See http://bugs.jquery.com/ticket/13378
            rbuggyQSA = [];

            if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function( div ) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // http://bugs.jquery.com/ticket/12359
                    div.innerHTML = "<select t=''><option selected=''></option></select>";

                    // Support: IE8, Opera 10-12
                    // Nothing should be selected when empty strings follow ^= or $= or *=
                    if ( div.querySelectorAll("[t^='']").length ) {
                        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                    }

                    // Support: IE8
                    // Boolean attributes and "value" are not treated correctly
                    if ( !div.querySelectorAll("[selected]").length ) {
                        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here and will not see later tests
                    if ( !div.querySelectorAll(":checked").length ) {
                        rbuggyQSA.push(":checked");
                    }
                });

                assert(function( div ) {
                    // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    var input = doc.createElement("input");
                    input.setAttribute( "type", "hidden" );
                    div.appendChild( input ).setAttribute( "name", "D" );

                    // Support: IE8
                    // Enforce case-sensitivity of name attribute
                    if ( div.querySelectorAll("[name=d]").length ) {
                        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here and will not see later tests
                    if ( !div.querySelectorAll(":enabled").length ) {
                        rbuggyQSA.push( ":enabled", ":disabled" );
                    }

                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }

            if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector) )) ) {

                assert(function( div ) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support.disconnectedMatch = matches.call( div, "div" );

                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches.call( div, "[s!='']:x" );
                    rbuggyMatches.push( "!=", pseudos );
                });
            }

            rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
            rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

            /* Contains
             ---------------------------------------------------------------------- */
            hasCompare = rnative.test( docElem.compareDocumentPosition );

            // Element contains another
            // Purposefully does not implement inclusive descendent
            // As in, an element does not contain itself
            contains = hasCompare || rnative.test( docElem.contains ) ?
                function( a, b ) {
                    var adown = a.nodeType === 9 ? a.documentElement : a,
                        bup = b && b.parentNode;
                    return a === bup || !!( bup && bup.nodeType === 1 && (
                            adown.contains ?
                                adown.contains( bup ) :
                            a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                        ));
                } :
                function( a, b ) {
                    if ( b ) {
                        while ( (b = b.parentNode) ) {
                            if ( b === a ) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

            /* Sorting
             ---------------------------------------------------------------------- */

            // Document order sorting
            sortOrder = hasCompare ?
                function( a, b ) {

                    // Flag for duplicate removal
                    if ( a === b ) {
                        hasDuplicate = true;
                        return 0;
                    }

                    // Sort on method existence if only one input has compareDocumentPosition
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if ( compare ) {
                        return compare;
                    }

                    // Calculate position if both inputs belong to the same document
                    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                        a.compareDocumentPosition( b ) :

                        // Otherwise we know they are disconnected
                        1;

                    // Disconnected nodes
                    if ( compare & 1 ||
                        (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                        // Choose the first element that is related to our preferred document
                        if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                            return -1;
                        }
                        if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                            return 1;
                        }

                        // Maintain original order
                        return sortInput ?
                            ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                            0;
                    }

                    return compare & 4 ? -1 : 1;
                } :
                function( a, b ) {
                    // Exit early if the nodes are identical
                    if ( a === b ) {
                        hasDuplicate = true;
                        return 0;
                    }

                    var cur,
                        i = 0,
                        aup = a.parentNode,
                        bup = b.parentNode,
                        ap = [ a ],
                        bp = [ b ];

                    // Parentless nodes are either documents or disconnected
                    if ( !aup || !bup ) {
                        return a === doc ? -1 :
                            b === doc ? 1 :
                                aup ? -1 :
                                    bup ? 1 :
                                        sortInput ?
                                            ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                                            0;

                        // If the nodes are siblings, we can do a quick check
                    } else if ( aup === bup ) {
                        return siblingCheck( a, b );
                    }

                    // Otherwise we need full lists of their ancestors for comparison
                    cur = a;
                    while ( (cur = cur.parentNode) ) {
                        ap.unshift( cur );
                    }
                    cur = b;
                    while ( (cur = cur.parentNode) ) {
                        bp.unshift( cur );
                    }

                    // Walk down the tree looking for a discrepancy
                    while ( ap[i] === bp[i] ) {
                        i++;
                    }

                    return i ?
                        // Do a sibling check if the nodes have a common ancestor
                        siblingCheck( ap[i], bp[i] ) :

                        // Otherwise nodes in our document sort first
                        ap[i] === preferredDoc ? -1 :
                            bp[i] === preferredDoc ? 1 :
                                0;
                };

            return doc;
        };

        Sizzle.matches = function( expr, elements ) {
            return Sizzle( expr, null, null, elements );
        };

        Sizzle.matchesSelector = function( elem, expr ) {
            // Set document vars if needed
            if ( ( elem.ownerDocument || elem ) !== document ) {
                setDocument( elem );
            }

            // Make sure that attribute selectors are quoted
            expr = expr.replace( rattributeQuotes, "='$1']" );

            if ( support.matchesSelector && documentIsHTML &&
                ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                try {
                    var ret = matches.call( elem, expr );

                    // IE 9's matchesSelector returns false on disconnected nodes
                    if ( ret || support.disconnectedMatch ||
                        // As well, disconnected nodes are said to be in a document
                        // fragment in IE 9
                        elem.document && elem.document.nodeType !== 11 ) {
                        return ret;
                    }
                } catch(e) {}
            }

            return Sizzle( expr, document, null, [elem] ).length > 0;
        };

        Sizzle.contains = function( context, elem ) {
            // Set document vars if needed
            if ( ( context.ownerDocument || context ) !== document ) {
                setDocument( context );
            }
            return contains( context, elem );
        };

        Sizzle.attr = function( elem, name ) {
            // Set document vars if needed
            if ( ( elem.ownerDocument || elem ) !== document ) {
                setDocument( elem );
            }

            var fn = Expr.attrHandle[ name.toLowerCase() ],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                    fn( elem, name, !documentIsHTML ) :
                    undefined;

            return val !== undefined ?
                val :
                support.attributes || !documentIsHTML ?
                    elem.getAttribute( name ) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                        val.value :
                        null;
        };

        Sizzle.error = function( msg ) {
            throw new Error( "Syntax error, unrecognized expression: " + msg );
        };

        /**
         * Document sorting and removing duplicates
         * @param {ArrayLike} results
         */
        Sizzle.uniqueSort = function( results ) {
            var elem,
                duplicates = [],
                j = 0,
                i = 0;

            // Unless we *know* we can detect duplicates, assume their presence
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice( 0 );
            results.sort( sortOrder );

            if ( hasDuplicate ) {
                while ( (elem = results[i++]) ) {
                    if ( elem === results[ i ] ) {
                        j = duplicates.push( i );
                    }
                }
                while ( j-- ) {
                    results.splice( duplicates[ j ], 1 );
                }
            }

            // Clear input after sorting to release objects
            // See https://github.com/jquery/sizzle/pull/225
            sortInput = null;

            return results;
        };

        /**
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        getText = Sizzle.getText = function( elem ) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if ( !nodeType ) {
                // If no nodeType, this is expected to be an array
                while ( (node = elem[i++]) ) {
                    // Do not traverse comment nodes
                    ret += getText( node );
                }
            } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                // Use textContent for elements
                // innerText usage removed for consistency of new lines (jQuery #11153)
                if ( typeof elem.textContent === "string" ) {
                    return elem.textContent;
                } else {
                    // Traverse its children
                    for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                        ret += getText( elem );
                    }
                }
            } else if ( nodeType === 3 || nodeType === 4 ) {
                return elem.nodeValue;
            }
            // Do not include comment or processing instruction nodes

            return ret;
        };

        Expr = Sizzle.selectors = {

            // Can be adjusted by the user
            cacheLength: 50,

            createPseudo: markFunction,

            match: matchExpr,

            attrHandle: {},

            find: {},

            relative: {
                ">": { dir: "parentNode", first: true },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: true },
                "~": { dir: "previousSibling" }
            },

            preFilter: {
                "ATTR": function( match ) {
                    match[1] = match[1].replace( runescape, funescape );

                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

                    if ( match[2] === "~=" ) {
                        match[3] = " " + match[3] + " ";
                    }

                    return match.slice( 0, 4 );
                },

                "CHILD": function( match ) {
                    /* matches from matchExpr["CHILD"]
                     1 type (only|nth|...)
                     2 what (child|of-type)
                     3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                     4 xn-component of xn+y argument ([+-]?\d*n|)
                     5 sign of xn-component
                     6 x of xn-component
                     7 sign of y-component
                     8 y of y-component
                     */
                    match[1] = match[1].toLowerCase();

                    if ( match[1].slice( 0, 3 ) === "nth" ) {
                        // nth-* requires argument
                        if ( !match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        // numeric x and y parameters for Expr.filter.CHILD
                        // remember that false/true cast respectively to 0/1
                        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                        // other types prohibit arguments
                    } else if ( match[3] ) {
                        Sizzle.error( match[0] );
                    }

                    return match;
                },

                "PSEUDO": function( match ) {
                    var excess,
                        unquoted = !match[5] && match[2];

                    if ( matchExpr["CHILD"].test( match[0] ) ) {
                        return null;
                    }

                    // Accept quoted arguments as-is
                    if ( match[3] && match[4] !== undefined ) {
                        match[2] = match[4];

                        // Strip excess characters from unquoted arguments
                    } else if ( unquoted && rpseudo.test( unquoted ) &&
                        // Get excess from tokenize (recursively)
                        (excess = tokenize( unquoted, true )) &&
                        // advance to the next closing parenthesis
                        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                        // excess is a negative index
                        match[0] = match[0].slice( 0, excess );
                        match[2] = unquoted.slice( 0, excess );
                    }

                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice( 0, 3 );
                }
            },

            filter: {

                "TAG": function( nodeNameSelector ) {
                    var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                    return nodeNameSelector === "*" ?
                        function() { return true; } :
                        function( elem ) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                },

                "CLASS": function( className ) {
                    var pattern = classCache[ className + " " ];

                    return pattern ||
                        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                        classCache( className, function( elem ) {
                            return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
                        });
                },

                "ATTR": function( name, operator, check ) {
                    return function( elem ) {
                        var result = Sizzle.attr( elem, name );

                        if ( result == null ) {
                            return operator === "!=";
                        }
                        if ( !operator ) {
                            return true;
                        }

                        result += "";

                        return operator === "=" ? result === check :
                            operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf( check ) === 0 :
                                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                                        operator === "$=" ? check && result.slice( -check.length ) === check :
                                            operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                                                operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                    false;
                    };
                },

                "CHILD": function( type, what, argument, first, last ) {
                    var simple = type.slice( 0, 3 ) !== "nth",
                        forward = type.slice( -4 ) !== "last",
                        ofType = what === "of-type";

                    return first === 1 && last === 0 ?

                        // Shortcut for :nth-*(n)
                        function( elem ) {
                            return !!elem.parentNode;
                        } :

                        function( elem, context, xml ) {
                            var cache, outerCache, node, diff, nodeIndex, start,
                                dir = simple !== forward ? "nextSibling" : "previousSibling",
                                parent = elem.parentNode,
                                name = ofType && elem.nodeName.toLowerCase(),
                                useCache = !xml && !ofType;

                            if ( parent ) {

                                // :(first|last|only)-(child|of-type)
                                if ( simple ) {
                                    while ( dir ) {
                                        node = elem;
                                        while ( (node = node[ dir ]) ) {
                                            if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                                return false;
                                            }
                                        }
                                        // Reverse direction for :only-* (if we haven't yet done so)
                                        start = dir = type === "only" && !start && "nextSibling";
                                    }
                                    return true;
                                }

                                start = [ forward ? parent.firstChild : parent.lastChild ];

                                // non-xml :nth-child(...) stores cache data on `parent`
                                if ( forward && useCache ) {
                                    // Seek `elem` from a previously-cached index
                                    outerCache = parent[ expando ] || (parent[ expando ] = {});
                                    cache = outerCache[ type ] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = cache[0] === dirruns && cache[2];
                                    node = nodeIndex && parent.childNodes[ nodeIndex ];

                                    while ( (node = ++nodeIndex && node && node[ dir ] ||

                                        // Fallback to seeking `elem` from the start
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                        // When found, cache indexes on `parent` and break
                                        if ( node.nodeType === 1 && ++diff && node === elem ) {
                                            outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                            break;
                                        }
                                    }

                                    // Use previously-cached element index if available
                                } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                                    diff = cache[1];

                                    // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                } else {
                                    // Use the same loop as above to seek `elem` from the start
                                    while ( (node = ++nodeIndex && node && node[ dir ] ||
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                        if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                            // Cache the index of each encountered element
                                            if ( useCache ) {
                                                (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                            }

                                            if ( node === elem ) {
                                                break;
                                            }
                                        }
                                    }
                                }

                                // Incorporate the offset, then check against cycle size
                                diff -= last;
                                return diff === first || ( diff % first === 0 && diff / first >= 0 );
                            }
                        };
                },

                "PSEUDO": function( pseudo, argument ) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args,
                        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                            Sizzle.error( "unsupported pseudo: " + pseudo );

                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if ( fn[ expando ] ) {
                        return fn( argument );
                    }

                    // But maintain support for old signatures
                    if ( fn.length > 1 ) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                            markFunction(function( seed, matches ) {
                                var idx,
                                    matched = fn( seed, argument ),
                                    i = matched.length;
                                while ( i-- ) {
                                    idx = indexOf.call( seed, matched[i] );
                                    seed[ idx ] = !( matches[ idx ] = matched[i] );
                                }
                            }) :
                            function( elem ) {
                                return fn( elem, 0, args );
                            };
                    }

                    return fn;
                }
            },

            pseudos: {
                // Potentially complex pseudos
                "not": markFunction(function( selector ) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [],
                        results = [],
                        matcher = compile( selector.replace( rtrim, "$1" ) );

                    return matcher[ expando ] ?
                        markFunction(function( seed, matches, context, xml ) {
                            var elem,
                                unmatched = matcher( seed, null, xml, [] ),
                                i = seed.length;

                            // Match elements unmatched by `matcher`
                            while ( i-- ) {
                                if ( (elem = unmatched[i]) ) {
                                    seed[i] = !(matches[i] = elem);
                                }
                            }
                        }) :
                        function( elem, context, xml ) {
                            input[0] = elem;
                            matcher( input, null, xml, results );
                            return !results.pop();
                        };
                }),

                "has": markFunction(function( selector ) {
                    return function( elem ) {
                        return Sizzle( selector, elem ).length > 0;
                    };
                }),

                "contains": markFunction(function( text ) {
                    return function( elem ) {
                        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                    };
                }),

                // "Whether an element is represented by a :lang() selector
                // is based solely on the element's language value
                // being equal to the identifier C,
                // or beginning with the identifier C immediately followed by "-".
                // The matching of C against the element's language value is performed case-insensitively.
                // The identifier C does not have to be a valid language name."
                // http://www.w3.org/TR/selectors/#lang-pseudo
                "lang": markFunction( function( lang ) {
                    // lang value must be a valid identifier
                    if ( !ridentifier.test(lang || "") ) {
                        Sizzle.error( "unsupported lang: " + lang );
                    }
                    lang = lang.replace( runescape, funescape ).toLowerCase();
                    return function( elem ) {
                        var elemLang;
                        do {
                            if ( (elemLang = documentIsHTML ?
                                    elem.lang :
                                elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                            }
                        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                        return false;
                    };
                }),

                // Miscellaneous
                "target": function( elem ) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice( 1 ) === elem.id;
                },

                "root": function( elem ) {
                    return elem === docElem;
                },

                "focus": function( elem ) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },

                // Boolean properties
                "enabled": function( elem ) {
                    return elem.disabled === false;
                },

                "disabled": function( elem ) {
                    return elem.disabled === true;
                },

                "checked": function( elem ) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },

                "selected": function( elem ) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if ( elem.parentNode ) {
                        elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                },

                // Contents
                "empty": function( elem ) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                    //   but not by others (comment: 8; processing instruction: 7; etc.)
                    // nodeType < 6 works because attributes (2) do not appear as children
                    for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                        if ( elem.nodeType < 6 ) {
                            return false;
                        }
                    }
                    return true;
                },

                "parent": function( elem ) {
                    return !Expr.pseudos["empty"]( elem );
                },

                // Element/input types
                "header": function( elem ) {
                    return rheader.test( elem.nodeName );
                },

                "input": function( elem ) {
                    return rinputs.test( elem.nodeName );
                },

                "button": function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },

                "text": function( elem ) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" &&
                        elem.type === "text" &&

                        // Support: IE<8
                        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                },

                // Position-in-collection
                "first": createPositionalPseudo(function() {
                    return [ 0 ];
                }),

                "last": createPositionalPseudo(function( matchIndexes, length ) {
                    return [ length - 1 ];
                }),

                "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                    return [ argument < 0 ? argument + length : argument ];
                }),

                "even": createPositionalPseudo(function( matchIndexes, length ) {
                    var i = 0;
                    for ( ; i < length; i += 2 ) {
                        matchIndexes.push( i );
                    }
                    return matchIndexes;
                }),

                "odd": createPositionalPseudo(function( matchIndexes, length ) {
                    var i = 1;
                    for ( ; i < length; i += 2 ) {
                        matchIndexes.push( i );
                    }
                    return matchIndexes;
                }),

                "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                    var i = argument < 0 ? argument + length : argument;
                    for ( ; --i >= 0; ) {
                        matchIndexes.push( i );
                    }
                    return matchIndexes;
                }),

                "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                    var i = argument < 0 ? argument + length : argument;
                    for ( ; ++i < length; ) {
                        matchIndexes.push( i );
                    }
                    return matchIndexes;
                })
            }
        };

        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        // Add button/input type pseudos
        for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
            Expr.pseudos[ i ] = createInputPseudo( i );
        }
        for ( i in { submit: true, reset: true } ) {
            Expr.pseudos[ i ] = createButtonPseudo( i );
        }

        // Easy API for creating new setFilters
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();

        function tokenize( selector, parseOnly ) {
            var matched, match, tokens, type,
                soFar, groups, preFilters,
                cached = tokenCache[ selector + " " ];

            if ( cached ) {
                return parseOnly ? 0 : cached.slice( 0 );
            }

            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;

            while ( soFar ) {

                // Comma and first run
                if ( !matched || (match = rcomma.exec( soFar )) ) {
                    if ( match ) {
                        // Don't consume trailing commas as valid
                        soFar = soFar.slice( match[0].length ) || soFar;
                    }
                    groups.push( (tokens = []) );
                }

                matched = false;

                // Combinators
                if ( (match = rcombinators.exec( soFar )) ) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        // Cast descendant combinators to space
                        type: match[0].replace( rtrim, " " )
                    });
                    soFar = soFar.slice( matched.length );
                }

                // Filters
                for ( type in Expr.filter ) {
                    if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                        (match = preFilters[ type ]( match ))) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice( matched.length );
                    }
                }

                if ( !matched ) {
                    break;
                }
            }

            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            return parseOnly ?
                soFar.length :
                soFar ?
                    Sizzle.error( selector ) :
                    // Cache the tokens
                    tokenCache( selector, groups ).slice( 0 );
        }

        function toSelector( tokens ) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for ( ; i < len; i++ ) {
                selector += tokens[i].value;
            }
            return selector;
        }

        function addCombinator( matcher, combinator, base ) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;

            return combinator.first ?
                // Check against closest ancestor/preceding element
                function( elem, context, xml ) {
                    while ( (elem = elem[ dir ]) ) {
                        if ( elem.nodeType === 1 || checkNonElements ) {
                            return matcher( elem, context, xml );
                        }
                    }
                } :

                // Check against all ancestor/preceding elements
                function( elem, context, xml ) {
                    var data, cache, outerCache,
                        dirkey = dirruns + " " + doneName;

                    // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                    if ( xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                if ( matcher( elem, context, xml ) ) {
                                    return true;
                                }
                            }
                        }
                    } else {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                outerCache = elem[ expando ] || (elem[ expando ] = {});
                                if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
                                    if ( (data = cache[1]) === true || data === cachedruns ) {
                                        return data === true;
                                    }
                                } else {
                                    cache = outerCache[ dir ] = [ dirkey ];
                                    cache[1] = matcher( elem, context, xml ) || cachedruns;
                                    if ( cache[1] === true ) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                };
        }

        function elementMatcher( matchers ) {
            return matchers.length > 1 ?
                function( elem, context, xml ) {
                    var i = matchers.length;
                    while ( i-- ) {
                        if ( !matchers[i]( elem, context, xml ) ) {
                            return false;
                        }
                    }
                    return true;
                } :
                matchers[0];
        }

        function condense( unmatched, map, filter, context, xml ) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;

            for ( ; i < len; i++ ) {
                if ( (elem = unmatched[i]) ) {
                    if ( !filter || filter( elem, context, xml ) ) {
                        newUnmatched.push( elem );
                        if ( mapped ) {
                            map.push( i );
                        }
                    }
                }
            }

            return newUnmatched;
        }

        function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
            if ( postFilter && !postFilter[ expando ] ) {
                postFilter = setMatcher( postFilter );
            }
            if ( postFinder && !postFinder[ expando ] ) {
                postFinder = setMatcher( postFinder, postSelector );
            }
            return markFunction(function( seed, results, context, xml ) {
                var temp, i, elem,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,

                    // Get initial elements from seed or context
                    elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && ( seed || !selector ) ?
                        condense( elems, preMap, preFilter, context, xml ) :
                        elems,

                    matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                            // ...intermediate processing is necessary
                            [] :

                            // ...otherwise use results directly
                            results :
                        matcherIn;

                // Find primary matches
                if ( matcher ) {
                    matcher( matcherIn, matcherOut, context, xml );
                }

                // Apply postFilter
                if ( postFilter ) {
                    temp = condense( matcherOut, postMap );
                    postFilter( temp, [], context, xml );

                    // Un-match failing elements by moving them back to matcherIn
                    i = temp.length;
                    while ( i-- ) {
                        if ( (elem = temp[i]) ) {
                            matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                        }
                    }
                }

                if ( seed ) {
                    if ( postFinder || preFilter ) {
                        if ( postFinder ) {
                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
                            temp = [];
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) ) {
                                    // Restore matcherIn since elem is not yet a final match
                                    temp.push( (matcherIn[i] = elem) );
                                }
                            }
                            postFinder( null, (matcherOut = []), temp, xml );
                        }

                        // Move matched elements from seed to results to keep them synchronized
                        i = matcherOut.length;
                        while ( i-- ) {
                            if ( (elem = matcherOut[i]) &&
                                (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }

                    // Add elements to results, through postFinder if defined
                } else {
                    matcherOut = condense(
                        matcherOut === results ?
                            matcherOut.splice( preexisting, matcherOut.length ) :
                            matcherOut
                    );
                    if ( postFinder ) {
                        postFinder( null, results, matcherOut, xml );
                    } else {
                        push.apply( results, matcherOut );
                    }
                }
            });
        }

        function matcherFromTokens( tokens ) {
            var checkContext, matcher, j,
                len = tokens.length,
                leadingRelative = Expr.relative[ tokens[0].type ],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator( function( elem ) {
                    return elem === checkContext;
                }, implicitRelative, true ),
                matchAnyContext = addCombinator( function( elem ) {
                    return indexOf.call( checkContext, elem ) > -1;
                }, implicitRelative, true ),
                matchers = [ function( elem, context, xml ) {
                    return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                            (checkContext = context).nodeType ?
                                matchContext( elem, context, xml ) :
                                matchAnyContext( elem, context, xml ) );
                } ];

            for ( ; i < len; i++ ) {
                if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                    matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                } else {
                    matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                    // Return special upon seeing a positional matcher
                    if ( matcher[ expando ] ) {
                        // Find the next relative operator (if any) for proper handling
                        j = ++i;
                        for ( ; j < len; j++ ) {
                            if ( Expr.relative[ tokens[j].type ] ) {
                                break;
                            }
                        }
                        return setMatcher(
                            i > 1 && elementMatcher( matchers ),
                            i > 1 && toSelector(
                                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                            ).replace( rtrim, "$1" ),
                            matcher,
                            i < j && matcherFromTokens( tokens.slice( i, j ) ),
                            j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                            j < len && toSelector( tokens )
                        );
                    }
                    matchers.push( matcher );
                }
            }

            return elementMatcher( matchers );
        }

        function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
            // A counter to specify which element is currently being matched
            var matcherCachedRuns = 0,
                bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function( seed, context, xml, results, outermost ) {
                    var elem, j, matcher,
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        setMatched = [],
                        contextBackup = outermostContext,
                        // We must always have either seed elements or outermost context
                        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                        // Use integer dirruns iff this is the outermost matcher
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                        len = elems.length;

                    if ( outermost ) {
                        outermostContext = context !== document && context;
                        cachedruns = matcherCachedRuns;
                    }

                    // Add elements passing elementMatchers directly to results
                    // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                    // Support: IE<9, Safari
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                    for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                        if ( byElement && elem ) {
                            j = 0;
                            while ( (matcher = elementMatchers[j++]) ) {
                                if ( matcher( elem, context, xml ) ) {
                                    results.push( elem );
                                    break;
                                }
                            }
                            if ( outermost ) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++matcherCachedRuns;
                            }
                        }

                        // Track unmatched elements for set filters
                        if ( bySet ) {
                            // They will have gone through all possible matchers
                            if ( (elem = !matcher && elem) ) {
                                matchedCount--;
                            }

                            // Lengthen the array for every element, matched or not
                            if ( seed ) {
                                unmatched.push( elem );
                            }
                        }
                    }

                    // Apply set filters to unmatched elements
                    matchedCount += i;
                    if ( bySet && i !== matchedCount ) {
                        j = 0;
                        while ( (matcher = setMatchers[j++]) ) {
                            matcher( unmatched, setMatched, context, xml );
                        }

                        if ( seed ) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if ( matchedCount > 0 ) {
                                while ( i-- ) {
                                    if ( !(unmatched[i] || setMatched[i]) ) {
                                        setMatched[i] = pop.call( results );
                                    }
                                }
                            }

                            // Discard index placeholder values to get only actual matches
                            setMatched = condense( setMatched );
                        }

                        // Add matches to results
                        push.apply( results, setMatched );

                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if ( outermost && !seed && setMatched.length > 0 &&
                            ( matchedCount + setMatchers.length ) > 1 ) {

                            Sizzle.uniqueSort( results );
                        }
                    }

                    // Override manipulation of globals by nested matchers
                    if ( outermost ) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }

                    return unmatched;
                };

            return bySet ?
                markFunction( superMatcher ) :
                superMatcher;
        }

        compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[ selector + " " ];

            if ( !cached ) {
                // Generate a function of recursive functions that can be used to check each element
                if ( !group ) {
                    group = tokenize( selector );
                }
                i = group.length;
                while ( i-- ) {
                    cached = matcherFromTokens( group[i] );
                    if ( cached[ expando ] ) {
                        setMatchers.push( cached );
                    } else {
                        elementMatchers.push( cached );
                    }
                }

                // Cache the compiled function
                cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
            }
            return cached;
        };

        function multipleContexts( selector, contexts, results ) {
            var i = 0,
                len = contexts.length;
            for ( ; i < len; i++ ) {
                Sizzle( selector, contexts[i], results );
            }
            return results;
        }

        function select( selector, context, results, seed ) {
            var i, tokens, token, type, find,
                match = tokenize( selector );

            if ( !seed ) {
                // Try to minimize operations if there is only one group
                if ( match.length === 1 ) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice( 0 );
                    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[ tokens[1].type ] ) {

                        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                        if ( !context ) {
                            return results;
                        }
                        selector = selector.slice( tokens.shift().value.length );
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                    while ( i-- ) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if ( Expr.relative[ (type = token.type) ] ) {
                            break;
                        }
                        if ( (find = Expr.find[ type ]) ) {
                            // Search, expanding context for leading sibling combinators
                            if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice( i, 1 );
                                selector = seed.length && toSelector( tokens );
                                if ( !selector ) {
                                    push.apply( results, seed );
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }
            }

            // Compile and execute a filtering function
            // Provide `match` to avoid retokenization if we modified the selector above
            compile( selector, match )(
                seed,
                context,
                !documentIsHTML,
                results,
                rsibling.test( selector ) && testContext( context.parentNode ) || context
            );
            return results;
        }

        // One-time assignments

        // Sort stability
        support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

        // Support: Chrome<14
        // Always assume duplicates if they aren't passed to the comparison function
        support.detectDuplicates = !!hasDuplicate;

        // Initialize against the default document
        setDocument();

        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
        // Detached nodes confoundingly follow *each other*
        support.sortDetached = assert(function( div1 ) {
            // Should return 1, but returns 4 (following)
            return div1.compareDocumentPosition( document.createElement("div") ) & 1;
        });

        // Support: IE<8
        // Prevent attribute/property "interpolation"
        // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
        if ( !assert(function( div ) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#" ;
            }) ) {
            addHandle( "type|href|height|width", function( elem, name, isXML ) {
                if ( !isXML ) {
                    return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                }
            });
        }

        // Support: IE<9
        // Use defaultValue in place of getAttribute("value")
        if ( !support.attributes || !assert(function( div ) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute( "value", "" );
                return div.firstChild.getAttribute( "value" ) === "";
            }) ) {
            addHandle( "value", function( elem, name, isXML ) {
                if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                    return elem.defaultValue;
                }
            });
        }

        // Support: IE<9
        // Use getAttributeNode to fetch booleans when getAttribute lies
        if ( !assert(function( div ) {
                return div.getAttribute("disabled") == null;
            }) ) {
            addHandle( booleans, function( elem, name, isXML ) {
                var val;
                if ( !isXML ) {
                    return elem[ name ] === true ? name.toLowerCase() :
                        (val = elem.getAttributeNode( name )) && val.specified ?
                            val.value :
                            null;
                }
            });
        }

        // EXPOSE
        if ( typeof define === "function" && define.amd ) {
            define(function() { return Sizzle; });
            // Sizzle requires that there be a global window in Common-JS like environments
        } else if ( typeof module !== "undefined" && module.exports ) {
            module.exports = Sizzle;
        } else {
            window.Sizzle = Sizzle;
        }
        // EXPOSE

    })( window );




    /*
     json2.js
     2013-05-26

     Public Domain.

     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

     See http://www.JSON.org/js.html


     This code should be minified before deployment.
     See http://javascript.crockford.com/jsmin.html
     */


    // Create a JSON object only if one does not already exist. We create the
    // methods in a closure to avoid creating global variables.

    if (typeof JSON !== 'object') {
        JSON = {};
    }

    (function () {
        'use strict';

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function () {

                return isFinite(this.valueOf())
                    ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                    : null;
            };

            String.prototype.toJSON      =
                Number.prototype.toJSON  =
                    Boolean.prototype.toJSON = function () {
                        return this.valueOf();
                    };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }


        function str(key, holder) {

            // Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

            // What happens next depends on the value's type.

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

                    // JSON numbers must be finite. Encode non-finite numbers as null.

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.

                    return String(value);

                // If the type is 'object', we might be dealing with an object or an array or
                // null.

                case 'object':

                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.

                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.

                    gap += indent;
                    partial = [];

                    // Is the value an array?

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.

                        v = partial.length === 0
                            ? '[]'
                            : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // If the replacer is an array, use it to select the members to be stringified.

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

                        // Otherwise, iterate through all of the keys in the object.

                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.

                    v = partial.length === 0
                        ? '{}'
                        : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        // If the JSON object does not yet have a stringify method, give it one.

        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = function (value, replacer, space) {

                // The stringify method takes a value and an optional replacer, and an optional
                // space parameter, and returns a JSON text. The replacer can be a function
                // that can replace values, or an array of strings that will select the keys.
                // A default replacer method can be provided. Use of the space parameter can
                // produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

                // If the space parameter is a number, make an indent string containing that
                // many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

                    // If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

                // If there is a replacer, it must be a function or an array.
                // Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

                // Make a fake root object containing our value under the key of ''.
                // Return the result of stringifying the value.

                return str('', {'': value});
            };
        }


        // If the JSON object does not yet have a parse method, give it one.

        if (typeof JSON.parse !== 'function') {
            JSON.parse = function (text, reviver) {

                // The parse method takes a text and an optional reviver function, and returns
                // a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

                    // The walk method is used to recursively walk the resulting structure so
                    // that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


                // Parsing happens in four stages. In the first stage, we replace certain
                // Unicode characters with escape sequences. JavaScript handles many characters
                // incorrectly, either silently deleting them, or treating them as line endings.

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                // In the second stage, we run the text against regular expressions that look
                // for non-JSON patterns. We are especially concerned with '()' and 'new'
                // because they can cause invocation, and '=' because it can cause mutation.
                // But just to be safe, we want to reject all unexpected forms.

                // We split the second stage into 4 regexp operations in order to work around
                // crippling inefficiencies in IE's and Safari's regexp engines. First we
                // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                // replace all simple value tokens with ']' characters. Third, we delete all
                // open brackets that follow a colon or comma or that begin the text. Finally,
                // we look to see that the remaining characters are only whitespace or ']' or
                // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/
                        .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                    // In the third stage we use the eval function to compile the text into a
                    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                    // in JavaScript: it can begin a block or an object literal. We wrap the text
                    // in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

                    // In the optional fourth stage, we recursively walk the new structure, passing
                    // each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function'
                        ? walk({'': j}, '')
                        : j;
                }

                // If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            };
        }
    }());

}();



/*! lazyload 1.5.8 by Andrea "verlok" Verlicchi*/
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.LazyLoad=b()}(this,function(){function a(){q||(m={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,show_while_loading:!1,callback_load:null,callback_set:null,callback_processed:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},n=!!window.addEventListener,o=!!window.attachEvent,p=!!document.body.classList,q=!0)}function b(a,b,c){return n?void a.addEventListener(b,c):void(o&&(a.attachEvent("on"+b,function(a){return function(){c.call(a,window.event)}}(a)),a=null))}function c(a,b,c){return n?void a.removeEventListener(b,c):void(o&&a.detachEvent("on"+b,c))}function d(a,b,c){function d(){return window.innerWidth||l.documentElement.clientWidth||document.body.clientWidth}function e(){return window.innerHeight||l.documentElement.clientHeight||document.body.clientHeight}function f(a){return a.getBoundingClientRect().top+m-l.documentElement.clientTop}function g(a){return a.getBoundingClientRect().left+n-l.documentElement.clientLeft}function h(){var d;return d=b===window?e()+m:f(b)+b.offsetHeight,d<=f(a)-c}function i(){var e;return e=b===window?d()+window.pageXOffset:g(b)+d(),e<=g(a)-c}function j(){var d;return d=b===window?m:f(b),d>=f(a)+c+a.offsetHeight}function k(){var d;return d=b===window?n:g(b),d>=g(a)+c+a.offsetWidth}var l,m,n;return l=a.ownerDocument,m=window.pageYOffset||l.body.scrollTop,n=window.pageXOffset||l.body.scrollLeft,!(h()||j()||i()||k())}function e(){var a=new Date;return a.getTime()}function f(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&(d[c]=a[c]);for(c in b)b.hasOwnProperty(c)&&(d[c]=b[c]);return d}function g(a){try{return Array.prototype.slice.call(a)}catch(b){var c,d=[],e=a.length;for(c=0;e>c;c++)d.push(a[c]);return d}}function h(a,b){return p?void a.classList.add(b):void(a.className+=(a.className?" ":"")+b)}function i(a,b){return p?void a.classList.remove(b):void(a.className=a.className.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,""))}function j(a,b,c,d){var e=b.getAttribute("data-"+c),f=b.getAttribute("data-"+d);e&&a.setAttribute("srcset",e),f&&a.setAttribute("src",f)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(c){a(),this._settings=f(m,c),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=k(this.handleScroll,this),b(window,"resize",this._handleScrollFn),this.update()}var m,n,o,p,q=!1;return l.prototype._showOnLoad=function(a){function d(){null!==f&&(f.callback_load&&f.callback_load(a),j(a,a,f.data_srcset,f.data_src),f.callback_set&&f.callback_set(a),i(a,f.class_loading),h(a,f.class_loaded),c(e,"load",d))}var e,f=this._settings;a.getAttribute("src")||a.setAttribute("src",f.placeholder),e=document.createElement("img"),b(e,"load",d),h(a,f.class_loading),j(e,a,f.data_srcset,f.data_src)},l.prototype._showOnAppear=function(a){function d(){null!==e&&(e.callback_load&&e.callback_load(a),i(a,e.class_loading),h(a,e.class_loaded),c(a,"load",d))}var e=this._settings;b(a,"load",d),h(a,e.class_loading),j(a,a,e.data_srcset,e.data_src),e.callback_set&&e.callback_set(a)},l.prototype._loopThroughElements=function(){var a,b,c=this._settings,e=this._elements,f=e?e.length:0,g=[];for(a=0;f>a;a++)b=e[a],c.skip_invisible&&null===b.offsetParent||d(b,c.container,c.threshold)&&(c.show_while_loading?this._showOnAppear(b):this._showOnLoad(b),g.push(a),b.wasProcessed=!0);for(;g.length>0;)e.splice(g.pop(),1),c.callback_processed&&c.callback_processed(e.length);0===f&&this._stopScrollHandler()},l.prototype._purgeElements=function(){var a,b,c=this._elements,d=c.length,e=[];for(a=0;d>a;a++)b=c[a],b.wasProcessed&&e.push(a);for(;e.length>0;)c.splice(e.pop(),1)},l.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,b(this._settings.container,"scroll",this._handleScrollFn))},l.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,c(this._settings.container,"scroll",this._handleScrollFn))},l.prototype.handleScroll=function(){var a,b,c;this._settings&&(b=e(),c=this._settings.throttle,0!==c?(a=c-(b-this._previousLoopTime),0>=a||a>c?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=b,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(k(function(){this._previousLoopTime=e(),this._loopTimeout=null,this._loopThroughElements()},this),a))):this._loopThroughElements())},l.prototype.update=function(){this._elements=g(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},l.prototype.destroy=function(){c(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},l});
//# sourceMappingURL=lazyload.min.js.map
(function(global){
    var PLATFORM = 5;
    var BLOCK_TIME = 500;
    var DEVICE_COOKIE_KEY = 'qm_di';
    var CHANNEL_COOKIE_KEY = 'qm_ch';
    var LOG_API = 'http://log.quanmin.tv/q.gif?';
    var LOG_CLICK_ATTRIBUTE_NAME = 'data-log-info';
    var CHANNEL_QUERY_KEY = [ 'utm_source', 'hmsr', 'ptag', 'from' ];
    var _ = {
        on: (function(){
            var prefix = "", _addEventListener;
            if ( global.addEventListener ) {
                _addEventListener = "addEventListener";
            } else {
                _addEventListener = "attachEvent";
                prefix = "on";
            }
            return function(elem, type, callback){
                return elem[_addEventListener](prefix + type, function(originalEvent){
                    !originalEvent && ( originalEvent = global.event );
                    callback(originalEvent);
                }, true);
            };
        })(),
        stringify: function(ret){
            var url = [];
            for(var key in ret){
                if(ret.hasOwnProperty(key)){
                    url.push(key + '=' + encodeURIComponent(ret[key]));
                }
            }
            return url.join('&');
        },
        bool2num: function(val){
            return val ? 1 : 0;
        },
        getCookie: function(key){
            var cookies = document.cookie.split(/\s*;\s*/);
            for(var i = 0, len = cookies.length; i < len; i++){
                var cookie = cookies[i].split('=');
                if(key == cookie[0]){
                    return cookie[1];
                }
            }
            return null;
        },
        setCookie: function(key, value, days){
            var exp = new Date();
            days = days || 1;
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            var domain = '.quanmin.tv';
            var path = '/';
            document.cookie = [
                key + '=' + encodeURIComponent(value),
                'expires=' + exp.toGMTString(),
                'domain=' + domain,
                'path=' + path
            ].join(';');
        },
        delCookie: function(key){
            var val = _.getCookie(key);
            if (val != null) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
            }
        },
        blockSend: function(src){
            if(typeof XDomainRequest !== 'undefined'){
                var xhr = new XDomainRequest();
                xhr.open('GET', src, false);
                xhr.send();
                return;
            } else if(global.XMLHttpRequest){
                xhr = new XMLHttpRequest();
                if('withCredentials' in xhr){
                    xhr.open('GET', src, false);
                    xhr.send();
                    return;
                }
            }
            _.log(src);
            var start = (new Date).getTime();
            while((new Date).getTime() - start < BLOCK_TIME){}
        },
        log: (function(){
            var list = [];
            return function(src){
                var index = list.push(new Image) - 1;
                list[index].src = src;
                if(list.length > 20){
                    list.splice(0, 10);
                }
            };
        })()
    };
    var genUUID = (function() {
        var _time = new Date,
            getBits = function (val, start, end) {
                val = val.toString(36).split('');
                start = start / 4 | 0;
                end = end / 4 | 0;
                for (var i = start; i <= end; i++) !val[i] && (val[i] = 0);
                return val.slice(start, end + 1).join('');
            },
            rand = function (max) {
                return Math.random() * (max + 1) | 0;
            },
            hnv1a = function (key) {
                key = key.replace(/./g, function (m) {
                    return m.charCodeAt();
                }).split('');
                var p = 16777619, hash = 0x811C9DC5, l = key.length;
                for (var i = 0; i < l; i++) {
                    hash = (hash ^ key[i]) * p;
                }
                hash += hash << 13;
                hash ^= hash >> 7;
                hash += hash << 3;
                hash ^= hash >> 17;
                hash += hash << 5;
                hash = hash & 0x7FFFFFFF; //鍙栨.
                hash = hash.toString(36);
                hash.length < 6 && (hash += (l % 36).toString(36));
                return hash;
            },
            info = [
                screen.width,
                screen.height,
                navigator.plugins.length,
                navigator.javaEnabled(),
                screen.colorDepth,
                location.href,
                navigator.userAgent
            ].join('');
        return function () {
            var s = new Date,
                t = (+s + 0x92f3973c00).toString(36),
                m = getBits(rand(0xfff), 0, 7) +
                    getBits(rand(0x1fff), 0, 7) +
                    getBits(rand(0x1fff), 0, 8),
                c = Math.random() * (251) + 50 | 0,// random from 50 - 300
                a = [];
            t.length < 9 && (t += (s % 36).toString(36));
            for (; c--;) {//鍊熷姪涓嶅畾娆℃暟,澶氭闅忔満锛屾墦鏁ｅ鎴风锛屽洜杞‖鐜绫讳技锛屽鑷翠骇鐢熼殢鏈虹瀛愮殑绾挎€ц寰嬫€э紝浠ュ強閲嶅鎬�.
                a.push(Math.random());
            }

            return hnv1a(info) + //澧炲姞鐗╃悊缁村害鍒嗘祦.
                hnv1a([//澧炲姞鐢ㄦ埛闅忔満鎬у垎娴�.
                    document.documentElement.offsetWidth,
                    document.documentElement.offsetHeight,
                    history.length,
                    new Date - _time
                ].join('')) +
                t +
                m +
                hnv1a(a.slice(0, 10).join('')) +
                hnv1a(a.slice(c - 9).join(''));
        };
    })();
    var device = _.getCookie(DEVICE_COOKIE_KEY);
    if(!device){
        device = genUUID();
        _.setCookie(DEVICE_COOKIE_KEY, device, 365);
    }
    var channel = _.getCookie(CHANNEL_COOKIE_KEY) || '';
    var startTime = now();
    function check(opt){
        if(!opt.c){
            console.error('[E] 鏃ュ織缁熻閿欒: 鏈畾涔塦c`瀛楁');
            return false;
        }
        if(!opt.a){
            console.error('[E] 鏃ュ織缁熻閿欒: 鏈畾涔塦a`瀛楁');
            return false;
        }
        return true;
    }
    function getPageName(pathname){
        pathname = pathname || location.pathname;
        var path = pathname.split('/');
        switch (path[1]){
            case '':
                return 'index';
            case 'game':
                return 'list/' + path[2];
            case 'v':
            case 'star':
                return 'room/' + path[2];
            case 'my':
                var hash = location.hash.split('/');
                return hash[1] || 'my';
            default:
                return path[1];
        }
    }
    function getRoomId(){
        var pathname = location.pathname;
        pathname = pathname.split('/');
        if(pathname[1] == 'v' || pathname[1] == 'star'){
            return pathname[2];
        }
        return -1;
    }
    function genOption(opt){
        var defaults = {
            p: PLATFORM,
            rid: global.__roomID__ || getRoomId(),
            rcat: global.__roomCategoryID__ || -1,
            uid: global.__userId__ || -1,
            net: 0,
            screen: 3,
            device: device,
            sw: screen.width,
            sh: screen.height
        };
        if(channel){
            defaults.ch = channel;
        }
        defaults.refer = getPageName();
        opt = opt || {};
        for(var key in opt){
            if(opt.hasOwnProperty(key)){
                defaults[key] = opt[key];
            }
        }
        return defaults;
    }
    function  send(opt, block){
        opt = genOption(opt);
        var url = LOG_API + _.stringify(opt);
        if(block){
            _.blockSend(url);
        } else {
            _.log(url);
        }
    }
    function checkChannel(){
        var search = location.search;
        if(search){
            var query = {};
            search = search.substring(1).split('&');
            for(var i = 0; i < search.length; i++){
                var kv = search[i].split('=');
                query[kv[0]] = decodeURIComponent(kv[1]);
            }
            for(i = 0; i < CHANNEL_QUERY_KEY.length; i++){
                var key = CHANNEL_QUERY_KEY[i];
                if(query.hasOwnProperty(key)){
                    channel = query[key];
                    _.setCookie(CHANNEL_COOKIE_KEY, channel, 90);
                    return;
                }
            }
        }
    }
    function now(){
        var d = new Date;
        return d.getTime();
    }
    function getPageNameByUrl(url){
        url = url || '';
        url = url.replace(/^https?:\/\//, '');
        if(url.indexOf(location.host) > 0){
            url = url.replace(/^[^\/]+/, '');   // remove host
            url = url.replace(/#.*$/, '');      // remove hash
            url = url.replace(/\?.*$/, '');     // remove search
            url = getPageName(url);
        } else {
            url = url.substring(0, 40);
        }
        return url;
    }
    global.logger = {
        evt: function(opt, block){
            if(check(opt)){
                send(opt, block);
            }
        },
        pv: function(){
            checkChannel();
            send({
                c: 'page',
                a: 'view',
                v1: getPageName(),
                refer: getPageNameByUrl(document.referrer)
            });
        },
        getParams: function(opt){
            opt = genOption(opt);
            return _.stringify(opt);
        }
    };
    var unloaded = false;
    var unload = function(){
        if(unloaded) return;
        unloaded = true;
        send({
            c: 'page',
            a: 'leave',
            v4: Math.round((now() - startTime)/1000)
        }, false);
    };
    _.on(window, 'beforeunload', unload);
    _.on(window, 'unload', unload);
    _.on(document.documentElement, 'click', function(e){
        var target = e.target;
        while(target && target.nodeType == 1){
            if(target.hasAttribute && target.hasAttribute(LOG_CLICK_ATTRIBUTE_NAME)){
                var info = target.getAttribute(LOG_CLICK_ATTRIBUTE_NAME);
                try {
                    info = JSON.parse(info);
                    info.c = 'page';
                    info.a = 'click';
                    send(info);
                } catch (e) {
                    console.error('[E] 鏃ュ織鏍囪閿欒', target);
                }
            }
            target = target.parentNode;
        }
    });
})(window);

/**
 * Created by xuyu on 4/25/16.
 */
function __parse__(__cond__, __data__){
    if(__cond__ && typeof __cond__ === 'string'){
        try {
            with(__data__) {
                return !!eval('(' + __cond__ + ')');
            }
        } catch(e) {
            return false;
        }
    } else if(typeof __cond__ == 'boolean') {
        return __cond__;
    } else {
        return false;
    }
}
function __filter__(data, user, room){
    if(typeof data === 'string'){
        try {
            data = JSON.parse(data);
        } catch(e) {
            return false;
        }
    }
    if(typeof user === 'string'){
        try {
            user = JSON.parse(user);
        } catch(e) {}
    }
    data.user = user || {};
    if(typeof room === 'string'){
        try {
            room = JSON.parse(room);
        } catch(e) {}
    }
    data.room = room || {};
    if(data.cmd && data.cmd.type == 0){
        // 濡傛灉鏄墦寮€椤甸潰鐨勬寚浠わ紝蹇呴』鍒ゆ柇鏄惁涓�*.quanmin.tv鍩熶笅鐨勮祫婧愶紝鍚﹀垯涓嶈兘鎵ц
        var url = (data.cmd.args || {}).url || '';
        if(!(/^https?:\/\/\w+\.quanmin\.tv(?=[:\/]|$)/.test(url) || url[0] === '/')){
            return false;
        }
    }
    var cond = data.cmd.filter;
    return __parse__(cond, data);
}
/** server now by solidco2 **/
~function (global) {
    var serverDiff = null;
    var quality = null;
    var sendTime, receiveTime;

    global._setServerTime = function (ts) {
        receiveTime = new Date();
        ts += (receiveTime - sendTime) / 2;
        var df = new Date - ts;
        if (serverDiff == null) {
            serverDiff = df;
        } else if (df < serverDiff) {
            serverDiff = df;
        }
    };
    global.serverNow = function () {
        var now = +new Date();
        return now - (serverDiff || 0);
    };
    global._getServerDiff = function () {
        return serverDiff;
    };
    function getServerTime() {
        sendTime = new Date();
        var head = document.head;
        if (!head) {
            var fs = document.getElementsByTagName("script")[0];
            if (fs) {
                head = fs.parentNode;
            }
        }
        if (head) {
            var scr = document.createElement("script");
            scr.src = "http://time.quanmin.tv/";
            head.appendChild(scr);
        } else {
            document.write("<script src=\"http://time.quanmin.tv/\"></scri" + "pt>");
        }
    }

    getServerTime();
}(window, undefined);

var swfobject = function () {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function () {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1", ag = [0, 0, 0], ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } catch (Z) {
                }
            }
        }
        return {w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac}
    }(), k = function () {
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function () {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) {
                    (function () {
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) {
                (function () {
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {success: false, id: Y};
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {success: false, id: X};
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {
        }
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }

    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({success: false, id: ab})
                }
            }
        }, getObjectById: function (X) {
            if (M.w3) {
                return z(X)
            }
        }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {success: false, id: ah};
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function () {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        }, switchOffAutoHideShow: function () {
            m = false
        }, ua: M, getFlashPlayerVersion: function () {
            return {major: M.pv[0], minor: M.pv[1], release: M.pv[2]}
        }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        }, showExpressInstall: function (Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        }, removeSWF: function (X) {
            if (M.w3) {
                y(X)
            }
        }, createCSS: function (aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        }, expressInstallCallback: function () {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();
