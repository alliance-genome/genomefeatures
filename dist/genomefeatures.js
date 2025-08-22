function gn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function uo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ia(t) {
  let e, n, i;
  t.length !== 2 ? (e = gn, n = (o, f) => gn(t(o), f), i = (o, f) => t(o) - f) : (e = t === gn || t === uo ? t : ho, n = t, i = t);
  function r(o, f, c = 0, u = o.length) {
    if (c < u) {
      if (e(f, f) !== 0) return u;
      do {
        const _ = c + u >>> 1;
        n(o[_], f) < 0 ? c = _ + 1 : u = _;
      } while (c < u);
    }
    return c;
  }
  function a(o, f, c = 0, u = o.length) {
    if (c < u) {
      if (e(f, f) !== 0) return u;
      do {
        const _ = c + u >>> 1;
        n(o[_], f) <= 0 ? c = _ + 1 : u = _;
      } while (c < u);
    }
    return c;
  }
  function s(o, f, c = 0, u = o.length) {
    const _ = r(o, f, c, u - 1);
    return _ > c && i(o[_ - 1], f) > -i(o[_], f) ? _ - 1 : _;
  }
  return { left: r, center: s, right: a };
}
function ho() {
  return 0;
}
function po(t) {
  return t === null ? NaN : +t;
}
const _o = Ia(gn), go = _o.right;
Ia(po).center;
const mo = Math.sqrt(50), vo = Math.sqrt(10), wo = Math.sqrt(2);
function kn(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= mo ? 10 : a >= vo ? 5 : a >= wo ? 2 : 1;
  let o, f, c;
  return r < 0 ? (c = Math.pow(10, -r) / s, o = Math.round(t * c), f = Math.round(e * c), o / c < t && ++o, f / c > e && --f, c = -c) : (c = Math.pow(10, r) * s, o = Math.round(t / c), f = Math.round(e / c), o * c < t && ++o, f * c > e && --f), f < o && 0.5 <= n && n < 2 ? kn(t, e, n * 2) : [o, f, c];
}
function yo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, a, s] = i ? kn(e, t, n) : kn(t, e, n);
  if (!(a >= r)) return [];
  const o = a - r + 1, f = new Array(o);
  if (i)
    if (s < 0) for (let c = 0; c < o; ++c) f[c] = (a - c) / -s;
    else for (let c = 0; c < o; ++c) f[c] = (a - c) * s;
  else if (s < 0) for (let c = 0; c < o; ++c) f[c] = (r + c) / -s;
  else for (let c = 0; c < o; ++c) f[c] = (r + c) * s;
  return f;
}
function _i(t, e, n) {
  return e = +e, t = +t, n = +n, kn(t, e, n)[2];
}
function xo(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? _i(e, t, n) : _i(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function bo(t) {
  return t;
}
var mn = 1, Zn = 2, gi = 3, nn = 4, ir = 1e-6;
function ko(t) {
  return "translate(" + t + ",0)";
}
function Eo(t) {
  return "translate(0," + t + ")";
}
function To(t) {
  return (e) => +t(e);
}
function $o(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function So() {
  return !this.__axis;
}
function Da(t, e) {
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, f = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, c = t === mn || t === nn ? -1 : 1, u = t === nn || t === Zn ? "x" : "y", _ = t === mn || t === gi ? ko : Eo;
  function p(g) {
    var k = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), F = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : bo), R = Math.max(a, 0) + o, A = e.range(), E = +A[0] + f, b = +A[A.length - 1] + f, y = (e.bandwidth ? $o : To)(e.copy(), f), S = g.selection ? g.selection() : g, D = S.selectAll(".domain").data([null]), T = S.selectAll(".tick").data(k, e).order(), z = T.exit(), H = T.enter().append("g").attr("class", "tick"), C = T.select("line"), w = T.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), T = T.merge(H), C = C.merge(H.append("line").attr("stroke", "currentColor").attr(u + "2", c * a)), w = w.merge(H.append("text").attr("fill", "currentColor").attr(u, c * R).attr("dy", t === mn ? "0em" : t === gi ? "0.71em" : "0.32em")), g !== S && (D = D.transition(g), T = T.transition(g), C = C.transition(g), w = w.transition(g), z = z.transition(g).attr("opacity", ir).attr("transform", function(G) {
      return isFinite(G = y(G)) ? _(G + f) : this.getAttribute("transform");
    }), H.attr("opacity", ir).attr("transform", function(G) {
      var V = this.parentNode.__axis;
      return _((V && isFinite(V = V(G)) ? V : y(G)) + f);
    })), z.remove(), D.attr("d", t === nn || t === Zn ? s ? "M" + c * s + "," + E + "H" + f + "V" + b + "H" + c * s : "M" + f + "," + E + "V" + b : s ? "M" + E + "," + c * s + "V" + f + "H" + b + "V" + c * s : "M" + E + "," + f + "H" + b), T.attr("opacity", 1).attr("transform", function(G) {
      return _(y(G) + f);
    }), C.attr(u + "2", c * a), w.attr(u, c * R).text(F), S.filter(So).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Zn ? "start" : t === nn ? "end" : "middle"), S.each(function() {
      this.__axis = y;
    });
  }
  return p.scale = function(g) {
    return arguments.length ? (e = g, p) : e;
  }, p.ticks = function() {
    return n = Array.from(arguments), p;
  }, p.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), p) : n.slice();
  }, p.tickValues = function(g) {
    return arguments.length ? (i = g == null ? null : Array.from(g), p) : i && i.slice();
  }, p.tickFormat = function(g) {
    return arguments.length ? (r = g, p) : r;
  }, p.tickSize = function(g) {
    return arguments.length ? (a = s = +g, p) : a;
  }, p.tickSizeInner = function(g) {
    return arguments.length ? (a = +g, p) : a;
  }, p.tickSizeOuter = function(g) {
    return arguments.length ? (s = +g, p) : s;
  }, p.tickPadding = function(g) {
    return arguments.length ? (o = +g, p) : o;
  }, p.offset = function(g) {
    return arguments.length ? (f = +g, p) : f;
  }, p;
}
function rr(t) {
  return Da(mn, t);
}
function Ao(t) {
  return Da(gi, t);
}
var No = { value: () => {
} };
function Ra() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new vn(n);
}
function vn(t) {
  this._ = t;
}
function Io(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
vn.prototype = Ra.prototype = {
  constructor: vn,
  on: function(t, e) {
    var n = this._, i = Io(t + "", n), r, a = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((r = (t = i[a]).type) && (r = Do(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (r = (t = i[a]).type) n[r] = ar(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = ar(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new vn(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, a; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], i = 0, r = a.length; i < r; ++i) a[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, a = i.length; r < a; ++r) i[r].value.apply(e, n);
  }
};
function Do(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function ar(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = No, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var mi = "http://www.w3.org/1999/xhtml";
const sr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Bn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), sr.hasOwnProperty(e) ? { space: sr[e], local: t } : t;
}
function Ro(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === mi && e.documentElement.namespaceURI === mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Mo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ma(t) {
  var e = Bn(t);
  return (e.local ? Mo : Ro)(e);
}
function Lo() {
}
function Li(t) {
  return t == null ? Lo : function() {
    return this.querySelector(t);
  };
}
function Oo(t) {
  typeof t != "function" && (t = Li(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), f, c, u = 0; u < s; ++u)
      (f = a[u]) && (c = t.call(f, f.__data__, u, a)) && ("__data__" in f && (c.__data__ = f.__data__), o[u] = c);
  return new Ht(i, this._parents);
}
function La(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Co() {
  return [];
}
function Oa(t) {
  return t == null ? Co : function() {
    return this.querySelectorAll(t);
  };
}
function Fo(t) {
  return function() {
    return La(t.apply(this, arguments));
  };
}
function Bo(t) {
  typeof t == "function" ? t = Fo(t) : t = Oa(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && (i.push(t.call(f, f.__data__, c, s)), r.push(f));
  return new Ht(i, r);
}
function Ca(t) {
  return function() {
    return this.matches(t);
  };
}
function Fa(t) {
  return function(e) {
    return e.matches(t);
  };
}
var zo = Array.prototype.find;
function Po(t) {
  return function() {
    return zo.call(this.children, t);
  };
}
function Ho() {
  return this.firstElementChild;
}
function Vo(t) {
  return this.select(t == null ? Ho : Po(typeof t == "function" ? t : Fa(t)));
}
var Uo = Array.prototype.filter;
function Go() {
  return Array.from(this.children);
}
function Zo(t) {
  return function() {
    return Uo.call(this.children, t);
  };
}
function qo(t) {
  return this.selectAll(t == null ? Go : Zo(typeof t == "function" ? t : Fa(t)));
}
function Wo(t) {
  typeof t != "function" && (t = Ca(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new Ht(i, this._parents);
}
function Ba(t) {
  return new Array(t.length);
}
function Xo() {
  return new Ht(this._enter || this._groups.map(Ba), this._parents);
}
function En(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
En.prototype = {
  constructor: En,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Ko(t) {
  return function() {
    return t;
  };
}
function Yo(t, e, n, i, r, a) {
  for (var s = 0, o, f = e.length, c = a.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new En(t, a[s]);
  for (; s < f; ++s)
    (o = e[s]) && (r[s] = o);
}
function Jo(t, e, n, i, r, a, s) {
  var o, f, c = /* @__PURE__ */ new Map(), u = e.length, _ = a.length, p = new Array(u), g;
  for (o = 0; o < u; ++o)
    (f = e[o]) && (p[o] = g = s.call(f, f.__data__, o, e) + "", c.has(g) ? r[o] = f : c.set(g, f));
  for (o = 0; o < _; ++o)
    g = s.call(t, a[o], o, a) + "", (f = c.get(g)) ? (i[o] = f, f.__data__ = a[o], c.delete(g)) : n[o] = new En(t, a[o]);
  for (o = 0; o < u; ++o)
    (f = e[o]) && c.get(p[o]) === f && (r[o] = f);
}
function Qo(t) {
  return t.__data__;
}
function jo(t, e) {
  if (!arguments.length) return Array.from(this, Qo);
  var n = e ? Jo : Yo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), f = new Array(a), c = 0; c < a; ++c) {
    var u = i[c], _ = r[c], p = _.length, g = tl(t.call(u, u && u.__data__, c, i)), k = g.length, F = o[c] = new Array(k), R = s[c] = new Array(k), A = f[c] = new Array(p);
    n(u, _, F, R, A, g, e);
    for (var E = 0, b = 0, y, S; E < k; ++E)
      if (y = F[E]) {
        for (E >= b && (b = E + 1); !(S = R[b]) && ++b < k; ) ;
        y._next = S || null;
      }
  }
  return s = new Ht(s, i), s._enter = o, s._exit = f, s;
}
function tl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function el() {
  return new Ht(this._exit || this._groups.map(Ba), this._parents);
}
function nl(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function il(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), f = 0; f < s; ++f)
    for (var c = n[f], u = i[f], _ = c.length, p = o[f] = new Array(_), g, k = 0; k < _; ++k)
      (g = c[k] || u[k]) && (p[k] = g);
  for (; f < r; ++f)
    o[f] = n[f];
  return new Ht(o, this._parents);
}
function rl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function al(t) {
  t || (t = sl);
  function e(_, p) {
    return _ && p ? t(_.__data__, p.__data__) : !_ - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, f = r[a] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (f[u] = c);
    f.sort(e);
  }
  return new Ht(r, this._parents).order();
}
function sl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ol() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ll() {
  return Array.from(this);
}
function cl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function fl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ul() {
  return !this.node();
}
function hl(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function dl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function pl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function _l(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function gl(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ml(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function vl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function wl(t, e) {
  var n = Bn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? pl : dl : typeof e == "function" ? n.local ? vl : ml : n.local ? gl : _l)(n, e));
}
function za(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function yl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function bl(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function kl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? yl : typeof e == "function" ? bl : xl)(t, e, n ?? "")) : Le(this.node(), t);
}
function Le(t, e) {
  return t.style.getPropertyValue(e) || za(t).getComputedStyle(t, null).getPropertyValue(e);
}
function El(t) {
  return function() {
    delete this[t];
  };
}
function Tl(t, e) {
  return function() {
    this[t] = e;
  };
}
function $l(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Sl(t, e) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? $l : Tl)(t, e)) : this.node()[t];
}
function Pa(t) {
  return t.trim().split(/^|\s+/);
}
function Oi(t) {
  return t.classList || new Ha(t);
}
function Ha(t) {
  this._node = t, this._names = Pa(t.getAttribute("class") || "");
}
Ha.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Va(t, e) {
  for (var n = Oi(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Ua(t, e) {
  for (var n = Oi(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Al(t) {
  return function() {
    Va(this, t);
  };
}
function Nl(t) {
  return function() {
    Ua(this, t);
  };
}
function Il(t, e) {
  return function() {
    (e.apply(this, arguments) ? Va : Ua)(this, t);
  };
}
function Dl(t, e) {
  var n = Pa(t + "");
  if (arguments.length < 2) {
    for (var i = Oi(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Il : e ? Al : Nl)(n, e));
}
function Rl() {
  this.textContent = "";
}
function Ml(t) {
  return function() {
    this.textContent = t;
  };
}
function Ll(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ol(t) {
  return arguments.length ? this.each(t == null ? Rl : (typeof t == "function" ? Ll : Ml)(t)) : this.node().textContent;
}
function Cl() {
  this.innerHTML = "";
}
function Fl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Bl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function zl(t) {
  return arguments.length ? this.each(t == null ? Cl : (typeof t == "function" ? Bl : Fl)(t)) : this.node().innerHTML;
}
function Pl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Hl() {
  return this.each(Pl);
}
function Vl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ul() {
  return this.each(Vl);
}
function Gl(t) {
  var e = typeof t == "function" ? t : Ma(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Zl() {
  return null;
}
function ql(t, e) {
  var n = typeof t == "function" ? t : Ma(t), i = e == null ? Zl : typeof e == "function" ? e : Li(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Wl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Xl() {
  return this.each(Wl);
}
function Kl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Yl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Jl(t) {
  return this.select(t ? Yl : Kl);
}
function Ql(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function jl(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function tc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function ec(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function nc(t, e, n) {
  return function() {
    var i = this.__on, r, a = jl(e);
    if (i) {
      for (var s = 0, o = i.length; s < o; ++s)
        if ((r = i[s]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = a, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), r = { type: t.type, name: t.name, value: e, listener: a, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function ic(t, e, n) {
  var i = tc(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var f = 0, c = o.length, u; f < c; ++f)
        for (r = 0, u = o[f]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? nc : ec, r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ga(t, e, n) {
  var i = za(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function rc(t, e) {
  return function() {
    return Ga(this, t, e);
  };
}
function ac(t, e) {
  return function() {
    return Ga(this, t, e.apply(this, arguments));
  };
}
function sc(t, e) {
  return this.each((typeof e == "function" ? ac : rc)(t, e));
}
function* oc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length, s; r < a; ++r)
      (s = i[r]) && (yield s);
}
var Ci = [null];
function Ht(t, e) {
  this._groups = t, this._parents = e;
}
function Te() {
  return new Ht([[document.documentElement]], Ci);
}
function lc() {
  return this;
}
Ht.prototype = Te.prototype = {
  constructor: Ht,
  select: Oo,
  selectAll: Bo,
  selectChild: Vo,
  selectChildren: qo,
  filter: Wo,
  data: jo,
  enter: Xo,
  exit: el,
  join: nl,
  merge: il,
  selection: lc,
  order: rl,
  sort: al,
  call: ol,
  nodes: ll,
  node: cl,
  size: fl,
  empty: ul,
  each: hl,
  attr: wl,
  style: kl,
  property: Sl,
  classed: Dl,
  text: Ol,
  html: zl,
  raise: Hl,
  lower: Ul,
  append: Gl,
  insert: ql,
  remove: Xl,
  clone: Jl,
  datum: Ql,
  on: ic,
  dispatch: sc,
  [Symbol.iterator]: oc
};
function pt(t) {
  return typeof t == "string" ? new Ht([[document.querySelector(t)]], [document.documentElement]) : new Ht([[t]], Ci);
}
function vi(t) {
  return typeof t == "string" ? new Ht([document.querySelectorAll(t)], [document.documentElement]) : new Ht([La(t)], Ci);
}
function Fi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Za(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function je() {
}
var Xe = 0.7, Tn = 1 / Xe, Re = "\\s*([+-]?\\d+)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cc = /^#([0-9a-f]{3,8})$/, fc = new RegExp(`^rgb\\(${Re},${Re},${Re}\\)$`), uc = new RegExp(`^rgb\\(${ne},${ne},${ne}\\)$`), hc = new RegExp(`^rgba\\(${Re},${Re},${Re},${Ke}\\)$`), dc = new RegExp(`^rgba\\(${ne},${ne},${ne},${Ke}\\)$`), pc = new RegExp(`^hsl\\(${Ke},${ne},${ne}\\)$`), _c = new RegExp(`^hsla\\(${Ke},${ne},${ne},${Ke}\\)$`), or = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Fi(je, xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: lr,
  // Deprecated! Use color.formatHex.
  formatHex: lr,
  formatHex8: gc,
  formatHsl: mc,
  formatRgb: cr,
  toString: cr
});
function lr() {
  return this.rgb().formatHex();
}
function gc() {
  return this.rgb().formatHex8();
}
function mc() {
  return qa(this).formatHsl();
}
function cr() {
  return this.rgb().formatRgb();
}
function xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = cc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? fr(e) : n === 3 ? new Ut(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? rn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? rn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = fc.exec(t)) ? new Ut(e[1], e[2], e[3], 1) : (e = uc.exec(t)) ? new Ut(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = hc.exec(t)) ? rn(e[1], e[2], e[3], e[4]) : (e = dc.exec(t)) ? rn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = pc.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, 1) : (e = _c.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, e[4]) : or.hasOwnProperty(t) ? fr(or[t]) : t === "transparent" ? new Ut(NaN, NaN, NaN, 0) : null;
}
function fr(t) {
  return new Ut(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function rn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new Ut(t, e, n, i);
}
function vc(t) {
  return t instanceof je || (t = xe(t)), t ? (t = t.rgb(), new Ut(t.r, t.g, t.b, t.opacity)) : new Ut();
}
function wi(t, e, n, i) {
  return arguments.length === 1 ? vc(t) : new Ut(t, e, n, i ?? 1);
}
function Ut(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Fi(Ut, wi, Za(je, {
  brighter(t) {
    return t = t == null ? Tn : Math.pow(Tn, t), new Ut(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xe : Math.pow(Xe, t), new Ut(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ut(we(this.r), we(this.g), we(this.b), $n(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ur,
  // Deprecated! Use color.formatHex.
  formatHex: ur,
  formatHex8: wc,
  formatRgb: hr,
  toString: hr
}));
function ur() {
  return `#${me(this.r)}${me(this.g)}${me(this.b)}`;
}
function wc() {
  return `#${me(this.r)}${me(this.g)}${me(this.b)}${me((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hr() {
  const t = $n(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${we(this.r)}, ${we(this.g)}, ${we(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function $n(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function we(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function me(t) {
  return t = we(t), (t < 16 ? "0" : "") + t.toString(16);
}
function dr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Qt(t, e, n, i);
}
function qa(t) {
  if (t instanceof Qt) return new Qt(t.h, t.s, t.l, t.opacity);
  if (t instanceof je || (t = xe(t)), !t) return new Qt();
  if (t instanceof Qt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, f = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= f < 0.5 ? a + r : 2 - a - r, s *= 60) : o = f > 0 && f < 1 ? 0 : s, new Qt(s, o, f, t.opacity);
}
function yc(t, e, n, i) {
  return arguments.length === 1 ? qa(t) : new Qt(t, e, n, i ?? 1);
}
function Qt(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Fi(Qt, yc, Za(je, {
  brighter(t) {
    return t = t == null ? Tn : Math.pow(Tn, t), new Qt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xe : Math.pow(Xe, t), new Qt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new Ut(
      qn(t >= 240 ? t - 240 : t + 120, r, i),
      qn(t, r, i),
      qn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Qt(pr(this.h), an(this.s), an(this.l), $n(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = $n(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${pr(this.h)}, ${an(this.s) * 100}%, ${an(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function pr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function an(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function qn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Bi = (t) => () => t;
function xc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function bc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function kc(t) {
  return (t = +t) == 1 ? Wa : function(e, n) {
    return n - e ? bc(e, n, t) : Bi(isNaN(e) ? n : e);
  };
}
function Wa(t, e) {
  var n = e - t;
  return n ? xc(t, n) : Bi(isNaN(t) ? e : t);
}
const Sn = function t(e) {
  var n = kc(e);
  function i(r, a) {
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), f = n(r.b, a.b), c = Wa(r.opacity, a.opacity);
    return function(u) {
      return r.r = s(u), r.g = o(u), r.b = f(u), r.opacity = c(u), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Ec(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(a) {
    for (r = 0; r < n; ++r) i[r] = t[r] * (1 - a) + e[r] * a;
    return i;
  };
}
function Tc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function $c(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = zi(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < i; ++s) a[s] = r[s](o);
    return a;
  };
}
function Sc(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function Jt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ac(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = zi(t[r], e[r]) : i[r] = e[r];
  return function(a) {
    for (r in n) i[r] = n[r](a);
    return i;
  };
}
var yi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Wn = new RegExp(yi.source, "g");
function Nc(t) {
  return function() {
    return t;
  };
}
function Ic(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Xa(t, e) {
  var n = yi.lastIndex = Wn.lastIndex = 0, i, r, a, s = -1, o = [], f = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Wn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, f.push({ i: s, x: Jt(i, r) })), n = Wn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? f[0] ? Ic(f[0].x) : Nc(e) : (e = f.length, function(c) {
    for (var u = 0, _; u < e; ++u) o[(_ = f[u]).i] = _.x(c);
    return o.join("");
  });
}
function zi(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Bi(e) : (n === "number" ? Jt : n === "string" ? (i = xe(e)) ? (e = i, Sn) : Xa : e instanceof xe ? Sn : e instanceof Date ? Sc : Tc(e) ? Ec : Array.isArray(e) ? $c : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ac : Jt)(t, e);
}
function Dc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var _r = 180 / Math.PI, xi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ka(t, e, n, i, r, a) {
  var s, o, f;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (f = t * n + e * i) && (n -= t * f, i -= e * f), (o = Math.sqrt(n * n + i * i)) && (n /= o, i /= o, f /= o), t * i < e * n && (t = -t, e = -e, f = -f, s = -s), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(e, t) * _r,
    skewX: Math.atan(f) * _r,
    scaleX: s,
    scaleY: o
  };
}
var sn;
function Rc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? xi : Ka(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Mc(t) {
  return t == null || (sn || (sn = document.createElementNS("http://www.w3.org/2000/svg", "g")), sn.setAttribute("transform", t), !(t = sn.transform.baseVal.consolidate())) ? xi : (t = t.matrix, Ka(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ya(t, e, n, i) {
  function r(c) {
    return c.length ? c.pop() + " " : "";
  }
  function a(c, u, _, p, g, k) {
    if (c !== _ || u !== p) {
      var F = g.push("translate(", null, e, null, n);
      k.push({ i: F - 4, x: Jt(c, _) }, { i: F - 2, x: Jt(u, p) });
    } else (_ || p) && g.push("translate(" + _ + e + p + n);
  }
  function s(c, u, _, p) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), p.push({ i: _.push(r(_) + "rotate(", null, i) - 2, x: Jt(c, u) })) : u && _.push(r(_) + "rotate(" + u + i);
  }
  function o(c, u, _, p) {
    c !== u ? p.push({ i: _.push(r(_) + "skewX(", null, i) - 2, x: Jt(c, u) }) : u && _.push(r(_) + "skewX(" + u + i);
  }
  function f(c, u, _, p, g, k) {
    if (c !== _ || u !== p) {
      var F = g.push(r(g) + "scale(", null, ",", null, ")");
      k.push({ i: F - 4, x: Jt(c, _) }, { i: F - 2, x: Jt(u, p) });
    } else (_ !== 1 || p !== 1) && g.push(r(g) + "scale(" + _ + "," + p + ")");
  }
  return function(c, u) {
    var _ = [], p = [];
    return c = t(c), u = t(u), a(c.translateX, c.translateY, u.translateX, u.translateY, _, p), s(c.rotate, u.rotate, _, p), o(c.skewX, u.skewX, _, p), f(c.scaleX, c.scaleY, u.scaleX, u.scaleY, _, p), c = u = null, function(g) {
      for (var k = -1, F = p.length, R; ++k < F; ) _[(R = p[k]).i] = R.x(g);
      return _.join("");
    };
  };
}
var Lc = Ya(Rc, "px, ", "px)", "deg)"), Oc = Ya(Mc, ", ", ")", ")"), Oe = 0, Ve = 0, ze = 0, Ja = 1e3, An, Ue, Nn = 0, be = 0, zn = 0, Ye = typeof performance == "object" && performance.now ? performance : Date, Qa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Pi() {
  return be || (Qa(Cc), be = Ye.now() + zn);
}
function Cc() {
  be = 0;
}
function In() {
  this._call = this._time = this._next = null;
}
In.prototype = ja.prototype = {
  constructor: In,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Pi() : +n) + (e == null ? 0 : +e), !this._next && Ue !== this && (Ue ? Ue._next = this : An = this, Ue = this), this._call = t, this._time = n, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function ja(t, e, n) {
  var i = new In();
  return i.restart(t, e, n), i;
}
function Fc() {
  Pi(), ++Oe;
  for (var t = An, e; t; )
    (e = be - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Oe;
}
function gr() {
  be = (Nn = Ye.now()) + zn, Oe = Ve = 0;
  try {
    Fc();
  } finally {
    Oe = 0, zc(), be = 0;
  }
}
function Bc() {
  var t = Ye.now(), e = t - Nn;
  e > Ja && (zn -= e, Nn = t);
}
function zc() {
  for (var t, e = An, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : An = n);
  Ue = t, bi(i);
}
function bi(t) {
  if (!Oe) {
    Ve && (Ve = clearTimeout(Ve));
    var e = t - be;
    e > 24 ? (t < 1 / 0 && (Ve = setTimeout(gr, t - Ye.now() - zn)), ze && (ze = clearInterval(ze))) : (ze || (Nn = Ye.now(), ze = setInterval(Bc, Ja)), Oe = 1, Qa(gr));
  }
}
function mr(t, e, n) {
  var i = new In();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var Pc = Ra("start", "end", "cancel", "interrupt"), Hc = [], ts = 0, vr = 1, ki = 2, wn = 3, wr = 4, Ei = 5, yn = 6;
function Pn(t, e, n, i, r, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Vc(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Pc,
    tween: Hc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ts
  });
}
function Hi(t, e) {
  var n = jt(t, e);
  if (n.state > ts) throw new Error("too late; already scheduled");
  return n;
}
function ie(t, e) {
  var n = jt(t, e);
  if (n.state > wn) throw new Error("too late; already running");
  return n;
}
function jt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Vc(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = ja(a, 0, n.time);
  function a(c) {
    n.state = vr, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, _, p, g;
    if (n.state !== vr) return f();
    for (u in i)
      if (g = i[u], g.name === n.name) {
        if (g.state === wn) return mr(s);
        g.state === wr ? (g.state = yn, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[u]) : +u < e && (g.state = yn, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[u]);
      }
    if (mr(function() {
      n.state === wn && (n.state = wr, n.timer.restart(o, n.delay, n.time), o(c));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = wn, r = new Array(p = n.tween.length), u = 0, _ = -1; u < p; ++u)
        (g = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++_] = g);
      r.length = _ + 1;
    }
  }
  function o(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(f), n.state = Ei, 1), _ = -1, p = r.length; ++_ < p; )
      r[_].call(t, u);
    n.state === Ei && (n.on.call("end", t, t.__data__, n.index, n.group), f());
  }
  function f() {
    n.state = yn, n.timer.stop(), delete i[e];
    for (var c in i) return;
    delete t.__transition;
  }
}
function Uc(t, e) {
  var n = t.__transition, i, r, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        a = !1;
        continue;
      }
      r = i.state > ki && i.state < Ei, i.state = yn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function Gc(t) {
  return this.each(function() {
    Uc(this, t);
  });
}
function Zc(t, e) {
  var n, i;
  return function() {
    var r = ie(this, t), a = r.tween;
    if (a !== n) {
      i = n = a;
      for (var s = 0, o = i.length; s < o; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function qc(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = ie(this, t), s = a.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var o = { name: e, value: n }, f = 0, c = r.length; f < c; ++f)
        if (r[f].name === e) {
          r[f] = o;
          break;
        }
      f === c && r.push(o);
    }
    a.tween = r;
  };
}
function Wc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = jt(this.node(), n).tween, r = 0, a = i.length, s; r < a; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Zc : qc)(n, t, e));
}
function Vi(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = ie(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return jt(r, i).value[e];
  };
}
function es(t, e) {
  var n;
  return (typeof e == "number" ? Jt : e instanceof xe ? Sn : (n = xe(e)) ? (e = n, Sn) : Xa)(t, e);
}
function Xc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Kc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Yc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Jc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Qc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), f;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), f = o + "", s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o)));
  };
}
function jc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), f;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), f = o + "", s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o)));
  };
}
function tf(t, e) {
  var n = Bn(t), i = n === "transform" ? Oc : es;
  return this.attrTween(t, typeof e == "function" ? (n.local ? jc : Qc)(n, i, Vi(this, "attr." + t, e)) : e == null ? (n.local ? Kc : Xc)(n) : (n.local ? Jc : Yc)(n, i, e));
}
function ef(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function nf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function rf(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && nf(t, a)), n;
  }
  return r._value = e, r;
}
function af(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && ef(t, a)), n;
  }
  return r._value = e, r;
}
function sf(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = Bn(t);
  return this.tween(n, (i.local ? rf : af)(i, e));
}
function of(t, e) {
  return function() {
    Hi(this, t).delay = +e.apply(this, arguments);
  };
}
function lf(t, e) {
  return e = +e, function() {
    Hi(this, t).delay = e;
  };
}
function cf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? of : lf)(e, t)) : jt(this.node(), e).delay;
}
function ff(t, e) {
  return function() {
    ie(this, t).duration = +e.apply(this, arguments);
  };
}
function uf(t, e) {
  return e = +e, function() {
    ie(this, t).duration = e;
  };
}
function hf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ff : uf)(e, t)) : jt(this.node(), e).duration;
}
function df(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ie(this, t).ease = e;
  };
}
function pf(t) {
  var e = this._id;
  return arguments.length ? this.each(df(e, t)) : jt(this.node(), e).ease;
}
function _f(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ie(this, t).ease = n;
  };
}
function gf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_f(this._id, t));
}
function mf(t) {
  typeof t != "function" && (t = Ca(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new ce(i, this._parents, this._name, this._id);
}
function vf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var f = e[o], c = n[o], u = f.length, _ = s[o] = new Array(u), p, g = 0; g < u; ++g)
      (p = f[g] || c[g]) && (_[g] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new ce(s, this._parents, this._name, this._id);
}
function wf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function yf(t, e, n) {
  var i, r, a = wf(e) ? Hi : ie;
  return function() {
    var s = a(this, t), o = s.on;
    o !== i && (r = (i = o).copy()).on(e, n), s.on = r;
  };
}
function xf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? jt(this.node(), n).on.on(t) : this.each(yf(n, t, e));
}
function bf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function kf() {
  return this.on("end.remove", bf(this._id));
}
function Ef(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Li(t));
  for (var i = this._groups, r = i.length, a = new Array(r), s = 0; s < r; ++s)
    for (var o = i[s], f = o.length, c = a[s] = new Array(f), u, _, p = 0; p < f; ++p)
      (u = o[p]) && (_ = t.call(u, u.__data__, p, o)) && ("__data__" in u && (_.__data__ = u.__data__), c[p] = _, Pn(c[p], e, n, p, c, jt(u, n)));
  return new ce(a, this._parents, e, n);
}
function Tf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Oa(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var f = i[o], c = f.length, u, _ = 0; _ < c; ++_)
      if (u = f[_]) {
        for (var p = t.call(u, u.__data__, _, f), g, k = jt(u, n), F = 0, R = p.length; F < R; ++F)
          (g = p[F]) && Pn(g, e, n, F, p, k);
        a.push(p), s.push(u);
      }
  return new ce(a, s, e, n);
}
var $f = Te.prototype.constructor;
function Sf() {
  return new $f(this._groups, this._parents);
}
function Af(t, e) {
  var n, i, r;
  return function() {
    var a = Le(this, t), s = (this.style.removeProperty(t), Le(this, t));
    return a === s ? null : a === n && s === i ? r : r = e(n = a, i = s);
  };
}
function ns(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Nf(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = Le(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function If(t, e, n) {
  var i, r, a;
  return function() {
    var s = Le(this, t), o = n(this), f = o + "";
    return o == null && (f = o = (this.style.removeProperty(t), Le(this, t))), s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o));
  };
}
function Df(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var f = ie(this, t), c = f.on, u = f.value[a] == null ? o || (o = ns(e)) : void 0;
    (c !== n || r !== u) && (i = (n = c).copy()).on(s, r = u), f.on = i;
  };
}
function Rf(t, e, n) {
  var i = (t += "") == "transform" ? Lc : es;
  return e == null ? this.styleTween(t, Af(t, i)).on("end.style." + t, ns(t)) : typeof e == "function" ? this.styleTween(t, If(t, i, Vi(this, "style." + t, e))).each(Df(this._id, t)) : this.styleTween(t, Nf(t, i, e), n).on("end.style." + t, null);
}
function Mf(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Lf(t, e, n) {
  var i, r;
  function a() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Mf(t, s, n)), i;
  }
  return a._value = e, a;
}
function Of(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Lf(t, e, n ?? ""));
}
function Cf(t) {
  return function() {
    this.textContent = t;
  };
}
function Ff(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Bf(t) {
  return this.tween("text", typeof t == "function" ? Ff(Vi(this, "text", t)) : Cf(t == null ? "" : t + ""));
}
function zf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Pf(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && zf(r)), e;
  }
  return i._value = t, i;
}
function Hf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Pf(t));
}
function Vf() {
  for (var t = this._name, e = this._id, n = is(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, f, c = 0; c < o; ++c)
      if (f = s[c]) {
        var u = jt(f, e);
        Pn(f, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new ce(i, this._parents, t, n);
}
function Uf() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, f = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var c = ie(this, i), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(f)), c.on = e;
    }), r === 0 && a();
  });
}
var Gf = 0;
function ce(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function is() {
  return ++Gf;
}
var se = Te.prototype;
ce.prototype = {
  constructor: ce,
  select: Ef,
  selectAll: Tf,
  selectChild: se.selectChild,
  selectChildren: se.selectChildren,
  filter: mf,
  merge: vf,
  selection: Sf,
  transition: Vf,
  call: se.call,
  nodes: se.nodes,
  node: se.node,
  size: se.size,
  empty: se.empty,
  each: se.each,
  on: xf,
  attr: tf,
  attrTween: sf,
  style: Rf,
  styleTween: Of,
  text: Bf,
  textTween: Hf,
  remove: kf,
  tween: Wc,
  delay: cf,
  duration: hf,
  ease: pf,
  easeVarying: gf,
  end: Uf,
  [Symbol.iterator]: se[Symbol.iterator]
};
function Zf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Zf
};
function Wf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Xf(t) {
  var e, n;
  t instanceof ce ? (e = t._id, t = t._name) : (e = is(), (n = qf).time = Pi(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && Pn(f, t, e, c, s, n || Wf(f, e));
  return new ce(i, this._parents, t, e);
}
Te.prototype.interrupt = Gc;
Te.prototype.transition = Xf;
const Ti = Math.PI, $i = 2 * Ti, ge = 1e-6, Kf = $i - ge;
function rs(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Yf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return rs;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, a = i.length; r < a; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Jf {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? rs : Yf(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, i, r) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +r}`;
  }
  bezierCurveTo(e, n, i, r, a, s) {
    this._append`C${+e},${+n},${+i},${+r},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, i, r, a) {
    if (e = +e, n = +n, i = +i, r = +r, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, f = i - e, c = r - n, u = s - e, _ = o - n, p = u * u + _ * _;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > ge) if (!(Math.abs(_ * f - c * u) > ge) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = i - s, k = r - o, F = f * f + c * c, R = g * g + k * k, A = Math.sqrt(F), E = Math.sqrt(p), b = a * Math.tan((Ti - Math.acos((F + p - R) / (2 * A * E))) / 2), y = b / E, S = b / A;
      Math.abs(y - 1) > ge && this._append`L${e + y * u},${n + y * _}`, this._append`A${a},${a},0,0,${+(_ * g > u * k)},${this._x1 = e + S * f},${this._y1 = n + S * c}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), f = i * Math.sin(r), c = e + o, u = n + f, _ = 1 ^ s, p = s ? r - a : a - r;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > ge || Math.abs(this._y1 - u) > ge) && this._append`L${c},${u}`, i && (p < 0 && (p = p % $i + $i), p > Kf ? this._append`A${i},${i},0,1,${_},${e - o},${n - f}A${i},${i},0,1,${_},${this._x1 = c},${this._y1 = u}` : p > ge && this._append`A${i},${i},0,${+(p >= Ti)},${_},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function Qf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Dn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function Ce(t) {
  return t = Dn(Math.abs(t)), t ? t[1] : NaN;
}
function jf(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], f = 0; r > 0 && o > 0 && (f + o + 1 > i && (o = Math.max(1, i - f)), a.push(n.substring(r -= o, r + o)), !((f += o + 1) > i)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function tu(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var eu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Rn(t) {
  if (!(e = eu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Ui({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Rn.prototype = Ui.prototype;
function Ui(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ui.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function nu(t) {
  t: for (var e = t.length, n = 1, i = -1, r; n < e; ++n)
    switch (t[n]) {
      case ".":
        i = r = n;
        break;
      case "0":
        i === 0 && (i = n), r = n;
        break;
      default:
        if (!+t[n]) break t;
        i > 0 && (i = 0);
        break;
    }
  return i > 0 ? t.slice(0, i) + t.slice(r + 1) : t;
}
var as;
function iu(t, e) {
  var n = Dn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (as = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return a === s ? i : a > s ? i + new Array(a - s + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + Dn(t, Math.max(0, e + a - 1))[0];
}
function yr(t, e) {
  var n = Dn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const xr = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Qf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => yr(t * 100, e),
  r: yr,
  s: iu,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function br(t) {
  return t;
}
var kr = Array.prototype.map, Er = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ru(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? br : jf(kr.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? br : tu(kr.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(_) {
    _ = Rn(_);
    var p = _.fill, g = _.align, k = _.sign, F = _.symbol, R = _.zero, A = _.width, E = _.comma, b = _.precision, y = _.trim, S = _.type;
    S === "n" ? (E = !0, S = "g") : xr[S] || (b === void 0 && (b = 12), y = !0, S = "g"), (R || p === "0" && g === "=") && (R = !0, p = "0", g = "=");
    var D = F === "$" ? n : F === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", T = F === "$" ? i : /[%p]/.test(S) ? s : "", z = xr[S], H = /[defgprs%]/.test(S);
    b = b === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b));
    function C(w) {
      var G = D, V = T, J, at, ct;
      if (S === "c")
        V = z(w) + V, w = "";
      else {
        w = +w;
        var L = w < 0 || 1 / w < 0;
        if (w = isNaN(w) ? f : z(Math.abs(w), b), y && (w = nu(w)), L && +w == 0 && k !== "+" && (L = !1), G = (L ? k === "(" ? k : o : k === "-" || k === "(" ? "" : k) + G, V = (S === "s" ? Er[8 + as / 3] : "") + V + (L && k === "(" ? ")" : ""), H) {
          for (J = -1, at = w.length; ++J < at; )
            if (ct = w.charCodeAt(J), 48 > ct || ct > 57) {
              V = (ct === 46 ? r + w.slice(J + 1) : w.slice(J)) + V, w = w.slice(0, J);
              break;
            }
        }
      }
      E && !R && (w = e(w, 1 / 0));
      var nt = G.length + w.length + V.length, ot = nt < A ? new Array(A - nt + 1).join(p) : "";
      switch (E && R && (w = e(ot + w, ot.length ? A - V.length : 1 / 0), ot = ""), g) {
        case "<":
          w = G + w + V + ot;
          break;
        case "=":
          w = G + ot + w + V;
          break;
        case "^":
          w = ot.slice(0, nt = ot.length >> 1) + G + w + V + ot.slice(nt);
          break;
        default:
          w = ot + G + w + V;
          break;
      }
      return a(w);
    }
    return C.toString = function() {
      return _ + "";
    }, C;
  }
  function u(_, p) {
    var g = c((_ = Rn(_), _.type = "f", _)), k = Math.max(-8, Math.min(8, Math.floor(Ce(p) / 3))) * 3, F = Math.pow(10, -k), R = Er[8 + k / 3];
    return function(A) {
      return g(F * A) + R;
    };
  }
  return {
    format: c,
    formatPrefix: u
  };
}
var on, ss, os;
au({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function au(t) {
  return on = ru(t), ss = on.format, os = on.formatPrefix, on;
}
function su(t) {
  return Math.max(0, -Ce(Math.abs(t)));
}
function ou(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ce(e) / 3))) * 3 - Ce(Math.abs(t)));
}
function lu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ce(e) - Ce(t)) + 1;
}
function cu(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function fu(t) {
  return function() {
    return t;
  };
}
function uu(t) {
  return +t;
}
var Tr = [0, 1];
function De(t) {
  return t;
}
function Si(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : fu(isNaN(e) ? NaN : 0.5);
}
function hu(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function du(t, e, n) {
  var i = t[0], r = t[1], a = e[0], s = e[1];
  return r < i ? (i = Si(r, i), a = n(s, a)) : (i = Si(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function pu(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Si(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var f = go(t, o, 1, i) - 1;
    return a[f](r[f](o));
  };
}
function _u(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function gu() {
  var t = Tr, e = Tr, n = zi, i, r, a, s = De, o, f, c;
  function u() {
    var p = Math.min(t.length, e.length);
    return s !== De && (s = hu(t[0], t[p - 1])), o = p > 2 ? pu : du, f = c = null, _;
  }
  function _(p) {
    return p == null || isNaN(p = +p) ? a : (f || (f = o(t.map(i), e, n)))(i(s(p)));
  }
  return _.invert = function(p) {
    return s(r((c || (c = o(e, t.map(i), Jt)))(p)));
  }, _.domain = function(p) {
    return arguments.length ? (t = Array.from(p, uu), u()) : t.slice();
  }, _.range = function(p) {
    return arguments.length ? (e = Array.from(p), u()) : e.slice();
  }, _.rangeRound = function(p) {
    return e = Array.from(p), n = Dc, u();
  }, _.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : De, u()) : s !== De;
  }, _.interpolate = function(p) {
    return arguments.length ? (n = p, u()) : n;
  }, _.unknown = function(p) {
    return arguments.length ? (a = p, _) : a;
  }, function(p, g) {
    return i = p, r = g, u();
  };
}
function mu() {
  return gu()(De, De);
}
function vu(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = Rn(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = ou(r, s)) && (i.precision = a), os(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = lu(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = su(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return ss(i);
}
function wu(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return yo(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return vu(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], f, c, u = 10;
    for (o < s && (c = s, s = o, o = c, c = r, r = a, a = c); u-- > 0; ) {
      if (c = _i(s, o, n), c === f)
        return i[r] = s, i[a] = o, e(i);
      if (c > 0)
        s = Math.floor(s / c) * c, o = Math.ceil(o / c) * c;
      else if (c < 0)
        s = Math.ceil(s * c) / c, o = Math.floor(o * c) / c;
      else
        break;
      f = c;
    }
    return t;
  }, t;
}
function ue() {
  var t = mu();
  return t.copy = function() {
    return _u(t, ue());
  }, cu.apply(t, arguments), wu(t);
}
function ln(t) {
  return function() {
    return t;
  };
}
const Gi = Math.sqrt, ls = Math.PI, yu = 2 * ls;
function xu(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = i;
    }
    return t;
  }, () => new Jf(e);
}
const bu = {
  draw(t, e) {
    const n = Gi(e / ls);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, yu);
  }
}, Xn = Gi(3), cs = {
  draw(t, e) {
    const n = -Gi(e / (Xn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Xn * n, -n), t.lineTo(Xn * n, -n), t.closePath();
  }
};
function fs(t, e) {
  let n = null, i = xu(r);
  t = typeof t == "function" ? t : ln(t || bu), e = typeof e == "function" ? e : ln(e === void 0 ? 64 : +e);
  function r() {
    let a;
    if (n || (n = a = i()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return r.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : ln(a), r) : t;
  }, r.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : ln(+a), r) : e;
  }, r.context = function(a) {
    return arguments.length ? (n = a ?? null, r) : n;
  }, r;
}
function Ge(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ge.prototype = {
  constructor: Ge,
  scale: function(t) {
    return t === 1 ? this : new Ge(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ge(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Ge.prototype;
function Zi(t, e, n) {
  let i = 0, r, a;
  if (t.length == 0)
    i = 1;
  else {
    for (let s = 1; s < t.length; s++) {
      for (const o of t[s]) {
        const [f, c] = o.split(":");
        if (n < +f || e > +c)
          a = 1;
        else {
          a = 0;
          break;
        }
      }
      if (a) {
        r = 1, i = s;
        break;
      }
    }
    r || (i = t.length);
  }
  return i;
}
function us(t, e, n, i, r) {
  let a = -1, s = -1;
  const o = [];
  if (!i && !r) {
    for (const c of t) {
      const u = c.children;
      u && u.forEach((_) => {
        e.includes(_.type) && ((a < 0 || _.fmin < a) && (a = _.fmin), (s < 0 || _.fmax > s) && (s = _.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  const f = [];
  for (const c of t)
    (i && c.name?.toLowerCase().includes(i.toLowerCase()) || r && (c.name?.includes(r) || c.id?.includes(r))) && f.push(c);
  if (f.length === 0) {
    for (const c of t) {
      const u = c.children;
      u && u.forEach((_) => {
        e.includes(_.type) && ((a < 0 || _.fmin < a) && (a = _.fmin), (s < 0 || _.fmax > s) && (s = _.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  for (const c of f) {
    const u = c.children;
    u && u.forEach((_) => {
      if (e.includes(_.type)) {
        if (n) {
          const p = _.fmin < n.start, g = _.fmax > n.end;
          if (p && g)
            return;
        }
        (a < 0 || _.fmin < a) && (a = _.fmin), (s < 0 || _.fmax > s) && (s = _.fmax, o.push({
          name: _.name || "unnamed",
          type: _.type,
          fmin: _.fmin,
          fmax: _.fmax
        }));
      }
    });
  }
  return {
    fmin: a,
    fmax: s
  };
}
function Fe(t) {
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = vi(i).nodes();
  let a = 0;
  return r.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function qi(t, e) {
  const n = e.node()?.getBBox().height ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((r) => {
    let a = !1;
    return r.alleles?.length && (r.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((o) => {
      t.includes(o) && (a = !0);
    }), r.alleles.forEach((o) => {
      t.includes(o) && (a = !0);
    })), a;
  }).datum((r) => (r.selected = "true", r)).style("stroke", "black").each(function() {
    let r = pt(this).attr("x"), a = +pt(this).attr("width");
    (a === 0 || Number.isNaN(a)) && (a = 3, r = String(+r - a / 2));
    const s = e.select(".variants.track");
    (s.empty() ? e : s).append("rect").attr("class", "highlight").attr("x", r).attr("width", a).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const ku = [
  "mRNA",
  "ncRNA",
  "piRNA",
  "lincRNA",
  "miRNA",
  "pre_miRNA",
  "snoRNA",
  "lnc_RNA",
  "tRNA",
  "snRNA",
  "rRNA",
  "ARS",
  "antisense_RNA",
  "C_gene_segment",
  "V_gene_segment",
  "pseudogene_attribute",
  "snoRNA_gene",
  "polypeptide_region",
  "mature_protein_region"
], Eu = [
  "point_mutation",
  "MNV",
  "Deletion",
  "Insertion",
  "Delins"
];
function Ze(t) {
  return t.replace(/\|/g, " ").replace(/"/g, "").replace(/^\[/, "").replace(/\]$/, "").trim();
}
const xn = {
  transcript_ablation: {
    impact: "HIGH",
    color: "#ff0000"
  },
  splice_acceptor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  splice_donor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  stop_gained: {
    impact: "HIGH",
    color: "#ff0000"
  },
  frameshift_variant: {
    impact: "HIGH",
    color: "#9400D3"
  },
  stop_lost: {
    impact: "HIGH",
    color: "#ff0000"
  },
  start_lost: {
    impact: "HIGH",
    color: "#ffd700"
  },
  transcript_amplification: {
    impact: "HIGH",
    color: "#ff69b4"
  },
  inframe_insertion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  inframe_deletion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  missense_variant: {
    impact: "MODERATE",
    color: "#ffd700"
  },
  protein_altering_variant: {
    impact: "MODERATE",
    color: "#ff0080"
  },
  splice_region_variant: {
    impact: "LOW",
    color: "#ff7f50"
  },
  incomplete_terminal_codon_variant: {
    impact: "LOW",
    color: "#ff00ff"
  },
  start_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  stop_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  synonymous_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  coding_sequence_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  mature_miRNA_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  five_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  three_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  non_coding_transcript_exon_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  intron_variant: {
    impact: "MODIFIER",
    color: "#02599c"
  },
  NMD_transcript_variant: {
    impact: "MODIFIER",
    color: "#ff4500"
  },
  non_coding_transcript_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  upstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  downstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  TFBS_ablation: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TFBS_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TF_binding_site_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  regulatory_region_ablation: {
    impact: "MODERATE",
    color: "#a52a2a"
  },
  regulatory_region_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_elongation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  regulatory_region_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_truncation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  intergenic_variant: {
    impact: "MODIFIER",
    color: "#636363"
  }
};
function hs(t) {
  if (!t)
    return "black";
  const e = Ze(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const i = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return hs(i);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = xn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? xn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? xn.three_prime_UTR_variant.color : "#f0f";
}
const ye = 10, fe = 10;
function Wi(t) {
  return `${t},${ye} ${t + fe / 2},${ye / 2} ${t},0 ${t - fe / 2},${ye / 2}`;
}
function ds(t) {
  return `${t - fe / 2},${ye} ${t},0 ${t + fe / 2},${ye}`;
}
function ps(t) {
  return `${t - fe / 2},${ye} ${t + fe / 2},${ye} ${t - fe / 2},0 ${t + fe / 2},0`;
}
function Tu(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((i) => i[1]?.length ?? 0)
    ),
    descriptionHeight: e
  };
}
function $u(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, f = s.fmax - n;
    return a !== s.type ? !1 : o <= r && f >= r || f <= i && f >= i || o >= r && f <= i;
  });
}
function _s(t, e) {
  const n = [];
  return t.forEach((i) => {
    const r = ys(i), { type: a, fmax: s, fmin: o } = i, f = $u(
      n,
      i,
      e
    );
    if (f >= 0 && a != "deletion") {
      const c = n[f], u = c.variantSet ? c.variantSet.findIndex(
        (_) => _.type === a && _.consequence === r
      ) : -1;
      if (u >= 0) {
        const _ = Math.min(
          c.variantSet[u].fmin,
          o
        ), p = Math.max(
          c.variantSet[u].fmax,
          s
        );
        c.fmin = _, c.fmax = p, c.variantSet[u].fmin = _, c.variantSet[u].fmax = p, c.variantSet[u].variants?.push(
          i
        );
      } else {
        const _ = Math.min(c.fmin, o), p = Math.max(c.fmax, s);
        c.fmin = _, c.fmax = p, c.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      c.variants?.push(i), c.fmin = Math.min(o, c.fmin), c.fmax = Math.max(s, c.fmax), n[f] = c;
    } else
      n.push({
        fmin: o,
        fmax: s,
        type: a,
        consequence: r,
        variantSet: [
          // @ts-expect-error
          {
            variants: [i],
            type: a,
            consequence: r,
            fmin: o,
            fmax: s
          }
        ],
        variants: [i]
      });
  }), n;
}
function gs(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += $r(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${$r(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function $r(t) {
  const { descriptionWidth: e } = Tu(t);
  let n = "";
  const i = t.location, [r, a] = i.split(":")[1].split("..");
  let s = t.alternative_alleles, o = t.reference_allele, f;
  if (t.type === "SNV")
    f = "1bp";
  else if (t.type === "deletion")
    f = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (f = "unknown length inserted", s = "n+") : f = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    f = `${o.length}bp`;
  else if (t.type === "delins") {
    const u = `${o.length - 1}bp deleted`;
    let _;
    s === "ALT_MISSING" ? (_ = "unknown length inserted", s = "n+") : _ = `${s.length - 1}bp inserted`, f = `${u}; ${_}`;
  } else
    f = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let c = "";
  return t.type === "insertion" ? c = `ins: ${s}` : t.type === "deletion" ? c = `del: ${o}` : c = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td style="word-break: break-all; max-width: 600px;">${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${f}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td style="word-break: break-all; max-width: 600px;">${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${c}</td></tr>`), n += "</tbody></table>", n;
}
function ms(t) {
  return (t.variants ?? []).map((n) => {
    const i = Su(n);
    return {
      ...i,
      consequence: i.consequence || "UNKNOWN"
    };
  });
}
function vs(t) {
  return (t.variants ?? []).flatMap((e) => {
    const n = e.allele_ids?.values?.[0];
    if (!n)
      return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const i = JSON.parse(n);
        return (Array.isArray(i) ? i : [i]).map(String);
      } catch {
      }
    return n.replace(/"/g, "").split(",").map((i) => i.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function ws(t) {
  return t.map((e) => hs(e.consequence));
}
function ys(t) {
  if (t.geneLevelConsequence?.values && t.geneLevelConsequence.values.length > 0)
    return Ze(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return Ze(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return Ze(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const n of e)
      if (n.consequence && typeof n.consequence == "string")
        return Ze(n.consequence);
  }
  return "UNKNOWN";
}
function cn(t) {
  return (Array.isArray(t?.values) ? t.values.join(" ") : t?.values) ?? "";
}
function Su(t) {
  return {
    symbol: Hn(t),
    symbolDetail: xs(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: ys(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: t.allele_of_gene_ids?.values[0].replace(/"/g, ""),
    geneSymbol: t.allele_of_gene_symbols?.values[0].replace(/"/g, ""),
    allele_of_genes: cn(t.allele_of_genes),
    allele_ids: cn(t.allele_ids),
    alternative_alleles: cn(t.alternative_alleles),
    impact: cn(t.impact)
  };
}
function xs(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xs(t.variants[0]);
  if (t.allele_symbols?.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const e = [], n = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), i = t.allele_ids?.values[0].replace(/"|\[|\]/g, "") ?? "", r = n.split(","), a = i.split(",");
        for (let s = 0; s < a.length; s++)
          e.push(
            `${r[s].trim()} (${a[s].trim()})`
          );
        return e.join(", ");
      } catch {
        return `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${t.allele_ids?.values[0].replace(
        /"|\[|\]/g,
        ""
      )})`;
  return "";
}
function Hn(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Hn(t.variants[0]);
  if (t.allele_symbols_text?.values) {
    const e = t.allele_symbols_text.values[0].split(",");
    return e.length > 1 ? `${e.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function Au(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Nu(t, e = 15) {
  const n = [], i = [...t].sort((a, s) => a.fmin - s.fmin), r = [];
  return i.forEach((a) => {
    let s = "";
    const o = a.type.toLowerCase();
    if (o === "snv" || o === "point_mutation" ? s = "snv" : o === "insertion" ? s = "insertion" : o === "delins" || o === "substitution" || o === "indel" || o === "mnv" ? s = "delins" : o === "deletion" && (s = "deletion"), !s) return;
    let f = !1, c = 0, u = a.pixelFmin !== void 0 ? a.pixelFmin : a.fmin, _ = a.pixelFmax !== void 0 ? a.pixelFmax : a.fmax;
    if (s === "snv") {
      const p = (u + _) / 2;
      u = p - 5, _ = p + 5;
    }
    if (s === "delins" && Math.abs(_ - u) < 10) {
      const p = (u + _) / 2;
      u = p - 5, _ = p + 5;
    }
    if (s === "deletion" && Math.abs(_ - u) < 5) {
      const p = (u + _) / 2;
      u = p - 2.5, _ = p + 2.5;
    }
    for (console.log(`🔍 Placing ${s} variant at ${a.fmin}: pixelMin=${u}, pixelMax=${_}`); !f; )
      r[c] || (r[c] = []), r[c].some((g) => {
        const k = g.pixelFmin - e, F = g.pixelFmax + e, R = !(_ < k || u > F);
        return R && console.log(`  Row ${c}: Overlap detected! variant[${u}-${_}] vs existing[${g.pixelFmin}-${g.pixelFmax}] (buffered: ${k}-${F})`), R;
      }) ? c++ : (r[c].push({ pixelFmin: u, pixelFmax: _ }), n.push({ variant: a, row: c, type: s }), f = !0, console.log(`  Placed in row ${c}`));
  }), n;
}
function Ai(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Mt(t) {
  return t == "unknown" ? Ai("grey", t.replace(/_/g, " ")) : Ai(
    xn[t].color,
    t.replace(/_/g, " ")
  );
}
function Iu() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Wi(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ai("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ds(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ps(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Mt("transcript_ablation")}</li>`, t += `<li>${Mt("splice_acceptor_variant")}</li>`, t += `<li>${Mt("splice_donor_variant")}</li>`, t += `<li>${Mt("stop_gained")}</li>`, t += `<li>${Mt("frameshift_variant")}</li>`, t += `<li>${Mt("stop_lost")}</li>`, t += `<li>${Mt("start_lost")}</li>`, t += `<li>${Mt("inframe_insertion")}</li>`, t += `<li>${Mt("inframe_deletion")}</li>`, t += `<li>${Mt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Mt("protein_altering_variant")}</li>`, t += `<li>${Mt("splice_region_variant")}</li>`, t += `<li>${Mt("start_retained_variant")}</li>`, t += `<li>${Mt("stop_retained_variant")}</li>`, t += `<li>${Mt("synonymous_variant")}</li>`, t += `<li>${Mt("coding_sequence_variant")}</li>`, t += `<li>${Mt("five_prime_UTR_variant")}</li>`, t += `<li>${Mt("three_prime_UTR_variant")}</li>`, t += `<li>${Mt("intron_variant")}</li>`, t += `<li>${Mt("non_coding_transcript_variant")}</li>`, t += `<li>${Mt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Du(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ot(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Du(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function bs(t, e, n, i) {
  let r = "";
  if (t === "FlyBase")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "MGI")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "WormBase")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "ZFIN")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "SGD")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "RGD")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "human")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else
    return console.warn("no source found", t), "Maximum features displayed.  See full view for more.";
  return `<a href="${r}">Maximum features displayed.  See full view for more.</a>`;
}
class Ru {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    binRatio: f,
    isoformFilter: c,
    initialHighlight: u,
    trackData: _,
    variantData: p,
    geneBounds: g,
    geneSymbol: k,
    geneId: F
  }) {
    this.trackData = _ ?? [], this.variantData = p ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = c, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = f, this.showVariantLabel = s ?? !0, this.geneBounds = g, this.geneSymbol = k, this.geneId = F;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.binRatio;
    let c = Au(r).length;
    if (!this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0)
      throw new Error("trackData must be a non-empty array");
    const u = this.trackData[0].source, _ = this.trackData[0].seqId, p = !e || e.length === 0 ? 9 : 30, g = ["UTR", "five_prime_UTR", "three_prime_UTR"], k = ["CDS"], F = ["exon"], R = this.transcriptTypes, A = us(n, R, this.geneBounds, this.geneSymbol, this.geneId);
    let E = A.fmin, b = A.fmax;
    this.geneBounds && (E = this.geneBounds.start, b = this.geneBounds.end, A.fmin < E && (E = A.fmin), A.fmax > b && (b = A.fmax));
    const y = 10, S = 10, D = 40, T = 20, z = 0, H = 10, C = 10, w = 5, G = 4, V = 20, J = 10, at = `0,0 0,${V} ${J},${J}`, ct = 22.5, L = ue().domain([E, b]).range([0, s]), nt = a.append("g").attr("class", "label"), ot = {};
    for (let q = 0, gt = g.length; q < gt; q++)
      ot[g[q]] = 200;
    for (let q = 0, gt = k.length; q < gt; q++)
      ot[k[q]] = 1e3;
    for (let q = 0, gt = F.length; q < gt; q++)
      ot[F[q]] = 100;
    const st = {};
    n = n.sort((q, gt) => {
      if (q.selected && !gt.selected)
        return -1;
      if (!q.selected && gt.selected)
        return 1;
      const tt = q.fmin || 0, dt = gt.fmin || 0;
      return tt - dt;
    });
    let it = 0;
    const _t = pt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ut = () => {
      _t.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, kt = _s(
      r,
      (b - E) * o
    );
    (!r || r.length === 0) && a.append("g").attr("class", "variant-message track").attr("transform", "translate(0,5)").append("text").attr("x", 10).attr("y", 15).attr("fill", "#d9534f").attr("opacity", 0.8).attr("font-size", "12px").text("No variant data available for this region. Please contact help@alliancegenome.org if this is unexpected.");
    const ft = [...kt], ht = Fe(this.viewer);
    console.log(`🔍 DEBUG: variantTrackAdjust=${ht}`);
    const lt = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${ht})`), xt = ft.map((q) => ({
      ...q,
      pixelFmin: L(q.fmin),
      pixelFmax: L(q.fmax)
    }));
    console.log("🔍 DEBUG: variantBinsWithPixelPositions:", xt), console.log("🔍 DEBUG: Sample variant pixels:", xt.slice(0, 3).map((q) => ({
      fmin: q.fmin,
      fmax: q.fmax,
      pixelFmin: q.pixelFmin,
      pixelFmax: q.pixelFmax,
      type: q.type
    })));
    const St = Nu(xt, 15);
    console.log("🔍 DEBUG: variantLayout result:", St), console.log("🔍 DEBUG: variantLayout length:", St.length), console.log("🔍 DEBUG: First few items:", St.slice(0, 5));
    let At = 0;
    St.forEach((q) => {
      q.row > At && (At = q.row), console.log(`🔍 DEBUG: Variant at ${q.variant.fmin}, type: ${q.type}, assigned row: ${q.row}`);
    }), c = Math.max(At + 1, 1), console.log("🔍 DEBUG: maxVariantRow:", At), console.log("🔍 DEBUG: numVariantTracks set to:", c);
    const rt = /* @__PURE__ */ new Map();
    St.forEach((q) => {
      const gt = `${q.variant.fmin}-${q.type.toLowerCase()}`;
      rt.set(gt, q.row), console.log(`🔍 DEBUG: Setting variantRowMap['${gt}'] = ${q.row}`);
    }), console.log("🔍 DEBUG: variantRowMap size:", rt.size), console.log("🔍 DEBUG: variantRowMap entries:", Array.from(rt.entries()));
    const Z = [];
    for (let q = 0; q < c; q++) {
      const gt = lt.append("g").attr("class", `variant-row-${q}`).attr("transform", `translate(0,${q * (C + w)})`).style("pointer-events", "all").style("isolation", "isolate");
      Z.push(gt);
    }
    for (let q = Z.length - 1; q >= 0; q--)
      Z[q].raise();
    [...ft].sort((q, gt) => {
      const tt = q.type.toLowerCase(), dt = gt.type.toLowerCase(), j = `${q.fmin}-${tt === "snv" || tt === "point_mutation" ? "snv" : tt === "insertion" ? "insertion" : tt === "deletion" ? "deletion" : "delins"}`, K = `${gt.fmin}-${dt === "snv" || dt === "point_mutation" ? "snv" : dt === "insertion" ? "insertion" : dt === "deletion" ? "deletion" : "delins"}`, m = rt.get(j) || 0, B = rt.get(K) || 0;
      return m - B;
    }).forEach((q, gt) => {
      const { type: tt, fmax: dt, fmin: j } = q;
      let K = !0, m = !1;
      const B = this.width, O = Hn(q), W = ms(q), x = vs(q), M = gs(W), h = ws(W)[0];
      if (tt.toLowerCase() === "snv" || tt.toLowerCase() === "point_mutation") {
        m = !0;
        const P = rt.get(`${j}-snv`) || 0;
        console.log(`🎯 DEBUG SNV: fmin=${j}, key='${j}-snv'`), console.log(`    variantRow=${P}`), (Z[P] || lt).append("polygon").attr("class", "variant-SNV").attr("id", `variant-${j}`).attr("points", Wi(L(j))).attr("fill", h).attr("x", L(j)).attr("z-index", 30).on("click", () => {
          $t(_t, M, ut);
        }).on("mouseover", function(l) {
          const N = pt(this).datum();
          N && (pt(this).style("stroke", "black"), pt(".label").selectAll(".variantLabel,.variantLabelBackground").filter(($) => $ && $.variant === N.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const l = pt(this).datum();
          (!l || l.selected !== "true") && pt(this).style("stroke", null), pt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: j,
          fmax: dt,
          variant: O + j,
          alleles: x
        });
      } else if (tt.toLowerCase() === "insertion") {
        m = !0;
        const P = rt.get(`${j}-insertion`) || 0;
        (Z[P] || lt).append("polygon").attr("class", "variant-insertion").attr("id", `variant-${j}`).attr("points", ds(L(j))).attr("fill", h).attr("x", L(j)).attr("z-index", 30).on("click", () => {
          $t(_t, M, ut);
        }).on("mouseover", function(l) {
          const N = pt(this).datum();
          N && (pt(this).style("stroke", "black"), pt(".label").selectAll(".variantLabel,.variantLabelBackground").filter(($) => $ && $.variant === N.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const l = pt(this).datum();
          (!l || l.selected !== "true") && pt(this).style("stroke", null), pt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: j,
          fmax: dt,
          variant: O + j,
          alleles: x
        });
      } else if (tt.toLowerCase() === "delins" || tt.toLowerCase() === "substitution" || tt.toLowerCase() === "indel" || tt.toLowerCase() === "mnv") {
        m = !0;
        const P = rt.get(`${j}-delins`) || 0;
        (Z[P] || lt).append("polygon").attr("class", "variant-delins").attr("id", `variant-${j}`).attr("points", ps(L(j))).attr("x", L(j)).attr("fill", h).attr("z-index", 30).on("click", () => {
          $t(_t, M, ut);
        }).on("mouseover", function(l) {
          const N = pt(this).datum();
          N && (pt(this).style("stroke", "black"), pt(".label").selectAll(".variantLabel,.variantLabelBackground").filter(($) => $ && $.variant === N.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const l = pt(this).datum();
          (!l || l.selected !== "true") && pt(this).style("stroke", null), pt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: j,
          fmax: dt,
          variant: O + j,
          alleles: x
        });
      } else if (tt.toLowerCase() === "deletion") {
        const P = rt.get(`${j}-deletion`) || 0, et = Math.max(Math.ceil(L(dt) - L(j)), 5), l = {
          fmin: j,
          fmax: dt,
          variant: O + j,
          alleles: x,
          selected: !1
        };
        console.log(`🎯 DEBUG DELETION ${gt}:`), console.log(`    Symbol: ${O}`), console.log(`    fmin=${j}, fmax=${dt}`), console.log(`    Map key='${j}-deletion'`), console.log(`    Retrieved row=${P}`), console.log(`    Pixel X: ${L(j)} to ${L(dt)}`), console.log(`    Width: ${et}px (min 5px for visibility)`), console.log(`    Height: ${C}px`), console.log(`    Row group: ${P}`), console.log(`    Datum variant key: ${l.variant}`);
        const d = (Z[P] || lt).append("rect").attr("class", "variant-deletion").attr("id", `variant-${j}`).attr("x", L(j)).attr("y", 0).attr("width", et).attr("height", C).attr("fill", h).attr("stroke-width", 2).style("cursor", "pointer").on("click", () => {
          $t(_t, M, ut);
        }).on("mouseover", function(v) {
          const I = pt(this).datum();
          I && (pt(this).style("stroke", "black").style("stroke-width", 3), pt(".label").selectAll(".variantLabel,.variantLabelBackground").filter((Q) => Q && Q.variant === I.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const v = pt(this).datum();
          (!v || v.selected !== "true") && pt(this).style("stroke", null).style("stroke-width", 2), pt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum(l).node();
        if (d) {
          const v = d.getBBox();
          console.log(`    Actual rect BBox: x=${v.x}, y=${v.y}, width=${v.width}, height=${v.height}`);
        }
      } else
        K = !1;
      if (K) {
        const P = tt.toLowerCase() === "deletion", et = L(P ? dt : j), l = m ? 15 : 10;
        let N = et + l;
        const $ = tt.toLowerCase();
        let d = 0;
        $ === "deletion" ? d = rt.get(`${j}-deletion`) || 0 : $ === "snv" || $ === "point_mutation" ? d = rt.get(`${j}-snv`) || 0 : $ === "insertion" ? d = rt.get(`${j}-insertion`) || 0 : ($ === "delins" || $ === "substitution" || $ === "indel" || $ === "mnv") && (d = rt.get(`${j}-delins`) || 0);
        const v = (C + w) * d + ct;
        console.log(`  📝 Label for variant at ${j}:`), console.log(`    Symbol: ${O}`), console.log(`    Type: ${$}`), console.log(`    Row: ${d}`), console.log(`    Label X offset: ${N} (${P ? "after deletion end" : "after variant start"})`), console.log(`    Label Y height: ${v}`), console.log(`    Label datum variant key: ${O + j}`);
        const I = nt.append("text").attr("class", "variantLabel").attr("fill", "black").attr("opacity", 0).attr("height", z).attr("transform", `translate(${N},${v})`).text(O).style("pointer-events", "none").datum({ fmin: j, variant: O + j }), Q = I.node()?.getBBox().width ?? 0;
        N + Q > B - 5 && (N = (P ? L(j) : et) - Q - l, console.log(`    📝 Label repositioned to left: ${N}`), I.attr("transform", `translate(${N},${v})`));
      }
    });
    const yt = ht;
    nt.attr("transform", `translate(0,${yt})`), nt.raise();
    const Et = Fe(this.viewer) + ct, wt = a.append("g").attr("transform", `translate(0,${Et})`).attr("class", "track");
    let U = 0;
    const Nt = [];
    let zt = -1, Ft = -1;
    const $t = this.renderTooltipDescription, Zt = [];
    for (let q = 0; q < n.length && U < p; q++) {
      const gt = n[q];
      let tt = gt.children;
      if (tt) {
        const dt = gt.selected;
        tt = tt.sort((K, m) => {
          const B = K.name || "", O = m.name || "";
          return B.localeCompare(O);
        });
        let j = !1;
        tt.forEach((K) => {
          if (e && e.length !== 0 && !(e.includes(K.id) || e.includes(K.name)))
            return;
          if (this.geneBounds) {
            const B = K.fmin < this.geneBounds.start, O = K.fmax > this.geneBounds.end;
            if (B && O)
              return;
          }
          if (Zt.includes(K.id))
            return;
          Zt.push(K.id);
          const m = K.type;
          if (R.includes(m)) {
            let B = Zi(
              Nt,
              L(K.fmin),
              L(K.fmax)
            );
            if (U < p) {
              let O = "", W, x = !1;
              const M = gt.name;
              Object.keys(st).includes(M) || (it += T, x = !0, st[M] = "Green");
              const h = wt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${U * D + 10 + it})`
              );
              x && (O = M, W = h.append("text").attr("class", "geneLabel").attr("fill", dt ? "sandybrown" : "black").attr("height", z).attr(
                "transform",
                `translate(${L(K.fmin)},-${T})`
              ).text(O).on("click", () => {
                $t(
                  _t,
                  Ot(gt),
                  ut
                );
              }).datum({
                fmin: K.fmin
              })), h.append("polygon").datum(() => ({
                fmin: K.fmin,
                fmax: K.fmax,
                strand: gt.strand
              })).attr("class", "transArrow").attr("points", at).attr(
                "transform",
                ($) => gt.strand > 0 ? `translate(${Number(L($.fmax))},0)` : `translate(${Number(L($.fmin))},${V}) rotate(180)`
              ).on("click", () => {
                $t(
                  _t,
                  Ot(K),
                  ut
                );
              });
              const P = L(K.fmin), et = L(K.fmax) - L(K.fmin);
              h.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + z).attr("height", G).attr("transform", `translate(${P},0)`).attr("width", et).on("click", () => {
                $t(
                  _t,
                  Ot(K),
                  ut
                );
              }).datum({
                fmin: K.fmin,
                fmax: K.fmax
              }), O = K.name || "", W = h.append("text").attr("class", "transcriptLabel").attr("fill", dt ? "sandybrown" : "gray").attr("opacity", dt ? 1 : 0.5).attr("height", z).attr("transform", `translate(${L(K.fmin)},0)`).text(O).on("click", () => {
                $t(
                  _t,
                  Ot(K),
                  ut
                );
              }).datum({
                fmin: K.fmin
              });
              let l = O.length * 2;
              try {
                l = W.node()?.getBBox().width ?? 0;
              } catch {
              }
              Number(l + L(K.fmin)) > s;
              const N = l > L(K.fmax) - L(K.fmin) ? L(K.fmin) + l : L(K.fmax);
              if (Nt[B]) {
                const $ = Nt[B];
                $.push(`${L(K.fmin)}:${N}`), Nt[B] = $;
              } else
                Nt[B] = [
                  `${L(K.fmin)}:${N}`
                ];
              (zt < 0 || zt > K.fmin) && (zt = K.fmin), (Ft < 0 || Ft < K.fmax) && (Ft = K.fmax), K.children && (K.children = K.children.sort(($, d) => {
                const v = ot[$.type], I = ot[d.type];
                if (typeof v == "number" && typeof I == "number")
                  return v - I;
                if (typeof v == "number" && typeof I != "number")
                  return -1;
                if (typeof v != "number" && typeof I == "number")
                  return 1;
                const Q = $.type || "", X = d.type || "";
                return Q.localeCompare(X);
              }), K.children.forEach(($) => {
                const d = $.type;
                F.includes(d) ? h.append("rect").attr("class", "exon").attr("x", L($.fmin)).attr(
                  "transform",
                  `translate(0,${y - G})`
                ).attr("height", y).attr("z-index", 10).attr("width", L($.fmax) - L($.fmin)).on("click", () => {
                  $t(
                    _t,
                    Ot(K),
                    ut
                  );
                }).datum({ fmin: $.fmin, fmax: $.fmax }) : k.includes(d) ? h.append("rect").attr("class", "CDS").attr("x", L($.fmin)).attr(
                  "transform",
                  `translate(0,${S - G})`
                ).attr("z-index", 20).attr("height", S).attr("width", L($.fmax) - L($.fmin)).on("click", () => {
                  $t(
                    _t,
                    Ot(K),
                    ut
                  );
                }).datum({ fmin: $.fmin, fmax: $.fmax }) : g.includes(d) && h.append("rect").attr("class", "UTR").attr("x", L($.fmin)).attr(
                  "transform",
                  `translate(0,${H - G})`
                ).attr("z-index", 20).attr("height", H).attr("width", L($.fmax) - L($.fmin)).on("click", () => {
                  $t(
                    _t,
                    Ot(K),
                    ut
                  );
                }).datum({ fmin: $.fmin, fmax: $.fmax });
              })), U += 1;
            }
            if (U === p && !j) {
              const O = bs(u, _, E, b);
              ++B, j = !0, wt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${U * D + 20 + it})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", z).html(O);
            }
          }
        });
      }
    }
    i && qi(i, a), U === 0 && wt.append("text").attr("x", 30).attr("y", z + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    );
    const Dt = c * (C + w) + ct;
    return U * D + it + Dt;
  }
  filterVariantData(e, n) {
    return !n || n.length === 0 ? e : !e || !Array.isArray(e) ? [] : e.filter((i) => {
      let r = !1;
      return (n.includes(i.name) || i.allele_symbols?.values && n.includes(
        i.allele_symbols.values[0].replace(/"/g, "")
      ) || i.symbol?.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || i.symbol_text?.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (i.allele_ids?.values[0]?.replace(/"|\[|\]| /g, "").split(",") ?? []).forEach((s) => {
        n.includes(s) && (r = !0);
      }), r;
    });
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("max-width", "700px").style("height", "auto").style("overflow-wrap", "break-word").style("word-break", "break-all").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  setInitialHighlight(e, n) {
    const i = n.node()?.getBBox().height ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((a) => {
      let s = !1;
      return a.alleles && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
        e.includes(f) && (s = !0);
      }), a.alleles.forEach((f) => {
        e.includes(f) && (s = !0);
      })), s;
    }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
      const a = +(pt(this).attr("width") || 3), s = +pt(this).attr("x") - a / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", s).attr("width", a).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Mu {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    initialHighlight: f,
    trackData: c,
    variantData: u
  }) {
    this.trackData = c ?? [], this.variantData = u ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = f, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let i = this.trackData;
    const r = this.filterVariantData(
      e,
      this.variantFilter
    ), a = _s(
      r,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    a.forEach((Z) => {
      const bt = vs(Z);
      s.set(Z, bt);
    });
    const o = this.viewer, f = this.width, c = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], _ = ["CDS"], p = ["exon"], g = this.transcriptTypes, k = us(i, g), F = k.fmin, R = k.fmax, A = 10, E = 10, b = 10, y = 40, S = 20, D = 2, T = 0, z = 10, H = 10, C = 20, w = 4, G = 20, V = 10, J = `0,0 0,${G} ${V},${V}`, at = 10, ct = 10, L = (Z) => `${Z - ct / 2},${at} ${Z},0 ${Z + ct / 2},${at}`, nt = (Z) => `${Z - ct / 2},${at} ${Z + ct / 2},${at} ${Z - ct / 2},0 ${Z + ct / 2},0`, ot = (Z) => `${Z},${at} ${Z + ct / 2},${at / 2} ${Z},0 ${Z - ct / 2},${at / 2}`, st = ue().domain([F, R]).range([0, f]), it = Fe(this.viewer), _t = o.append("g").attr("transform", `translate(0,${it})`).attr("class", "track"), ut = {};
    for (const Z of u)
      ut[Z] = 200;
    for (const Z of _)
      ut[Z] = 1e3;
    for (const Z of p)
      ut[Z] = 100;
    const kt = {};
    i = i.sort((Z, bt) => Z.selected && !bt.selected ? -1 : !Z.selected && bt.selected ? 1 : Z.name - bt.name);
    let Tt = 0;
    const ft = pt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ht = () => {
      ft.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let lt = 0;
    const xt = [];
    let St = -1, At = -1;
    const rt = this.renderTooltipDescription;
    for (let Z = 0; Z < i.length && lt < A; Z++) {
      const bt = i[Z];
      let yt = bt.children;
      if (yt) {
        const Et = bt.selected;
        yt = yt.sort((U, Nt) => U.name < Nt.name ? -1 : U.name > Nt.name ? 1 : U - Nt);
        let wt = !1;
        yt.forEach((U) => {
          const Nt = U.type;
          if (g.includes(Nt)) {
            let zt = Zi(
              xt,
              st(U.fmin),
              st(U.fmax)
            );
            if (lt < A) {
              let Ft, $t, Zt = !1;
              Object.keys(kt).includes(bt.name) || (Tt += S, Zt = !0, kt[bt.name] = "Green");
              const Dt = _t.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${lt * y + 10 + Tt})`
              );
              Zt && (Ft = bt.name, $t = Dt.append("text").attr("class", "geneLabel").attr("fill", Et ? "sandybrown" : "black").attr("height", T).attr(
                "transform",
                `translate(${st(U.fmin)},-${S})`
              ).text(Ft).on("click", () => {
                rt(
                  ft,
                  Ot(bt),
                  ht
                );
              }).datum({ fmin: U.fmin })), Dt.append("polygon").datum(() => ({
                fmin: U.fmin,
                fmax: U.fmax,
                strand: bt.strand
              })).attr("class", "transArrow").attr("points", J).attr("transform", (tt) => bt.strand > 0 ? `translate(${Number(st(tt.fmax))},0)` : `translate(${Number(st(tt.fmin))},${G}) rotate(180)`).on("click", () => {
                rt(
                  ft,
                  Ot(U),
                  ht
                );
              }), Dt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + T).attr("height", w).attr("transform", `translate(${st(U.fmin)},0)`).attr("width", st(U.fmax) - st(U.fmin)).on("click", () => {
                rt(
                  ft,
                  Ot(U),
                  ht
                );
              }).datum({ fmin: U.fmin, fmax: U.fmax }), Ft = U.name, $t = Dt.append("text").attr("class", "transcriptLabel").attr("fill", Et ? "sandybrown" : "gray").attr("opacity", Et ? 1 : 0.5).attr("height", T).attr("transform", `translate(${st(U.fmin)},0)`).text(Ft).on("click", () => {
                rt(
                  ft,
                  Ot(U),
                  ht
                );
              }).datum({ fmin: U.fmin });
              let q = Ft.length * 2;
              try {
                q = $t.node().getBBox().width;
              } catch {
              }
              Number(q + st(U.fmin)) > f;
              const gt = q > st(U.fmax) - st(U.fmin) ? st(U.fmin) + q : st(U.fmax);
              if (xt[zt]) {
                const tt = xt[zt];
                tt.push(`${st(U.fmin)}:${gt}`), xt[zt] = tt;
              } else
                xt[zt] = [
                  `${st(U.fmin)}:${gt}`
                ];
              (St < 0 || St > U.fmin) && (St = U.fmin), (At < 0 || At < U.fmax) && (At = U.fmax), U.children && (U.children = U.children.sort((tt, dt) => {
                const j = ut[tt.type], K = ut[dt.type];
                return typeof j == "number" && typeof K == "number" ? j - K : typeof j == "number" && typeof K != "number" ? -1 : typeof j != "number" && typeof K == "number" ? 1 : tt.type - dt.type;
              }), U.children.forEach((tt) => {
                const dt = tt.type;
                let j = !1;
                p.includes(dt) ? (j = !0, Dt.append("rect").attr("class", "exon").attr("x", st(tt.fmin)).attr(
                  "transform",
                  `translate(0,${E - w})`
                ).attr("height", E).attr("z-index", 10).attr("width", st(tt.fmax) - st(tt.fmin)).on("click", () => {
                  rt(
                    ft,
                    Ot(U),
                    ht
                  );
                }).datum({ fmin: tt.fmin, fmax: tt.fmax })) : _.includes(dt) ? (j = !0, Dt.append("rect").attr("class", "CDS").attr("x", st(tt.fmin)).attr(
                  "transform",
                  `translate(0,${b - w})`
                ).attr("z-index", 20).attr("height", b).attr("width", st(tt.fmax) - st(tt.fmin)).on("click", () => {
                  rt(
                    ft,
                    Ot(U),
                    ht
                  );
                }).datum({ fmin: tt.fmin, fmax: tt.fmax })) : u.includes(dt) && (j = !0, Dt.append("rect").attr("class", "UTR").attr("x", st(tt.fmin)).attr(
                  "transform",
                  `translate(0,${z - w})`
                ).attr("z-index", 20).attr("height", z).attr("width", st(tt.fmax) - st(tt.fmin)).on("click", () => {
                  rt(
                    ft,
                    Ot(U),
                    ht
                  );
                }).datum({ fmin: tt.fmin, fmax: tt.fmax })), j && a.forEach((K) => {
                  const { type: m, fmax: B, fmin: O } = K;
                  if (O < tt.fmin && B > tt.fmin || B > tt.fmax && O < tt.fmax || B <= tt.fmax && O >= tt.fmin) {
                    let x = !0;
                    const M = ms(K), h = ws(M)[0], P = gs(M), et = Math.max(
                      Math.ceil(st(B) - st(O)),
                      D
                    );
                    if (m.toLowerCase() === "deletion" || m.toLowerCase() === "mnv" ? Dt.append("rect").attr("class", "variant-deletion").attr("x", st(O)).attr(
                      "transform",
                      `translate(0,${C - w})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", H).attr("width", et).on("click", () => {
                      rt(
                        ft,
                        P,
                        ht
                      );
                    }).datum({
                      fmin: O,
                      fmax: B,
                      alleles: s.get(K) ?? []
                    }) : m.toLowerCase() === "snv" || m.toLowerCase() === "point_mutation" ? Dt.append("polygon").attr("class", "variant-SNV").attr("points", ot(st(O))).attr("fill", h).attr("x", st(O)).attr(
                      "transform",
                      `translate(0,${C - w})`
                    ).attr("z-index", 30).on("click", () => {
                      rt(
                        ft,
                        P,
                        ht
                      );
                    }).datum({
                      fmin: O,
                      fmax: B,
                      alleles: s.get(K) ?? []
                    }) : m.toLowerCase() === "insertion" ? Dt.append("polygon").attr("class", "variant-insertion").attr("points", L(st(O))).attr("fill", h).attr("x", st(O)).attr(
                      "transform",
                      `translate(0,${C - w})`
                    ).attr("z-index", 30).on("click", () => {
                      rt(
                        ft,
                        P,
                        ht
                      );
                    }).datum({
                      fmin: O,
                      fmax: B,
                      alleles: s.get(K) ?? []
                    }) : m.toLowerCase() === "delins" || m.toLowerCase() === "substitution" || m.toLowerCase() === "indel" ? Dt.append("polygon").attr("class", "variant-delins").attr("points", nt(st(O))).attr("x", st(O)).attr(
                      "transform",
                      `translate(0,${C - w})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      rt(
                        ft,
                        P,
                        ht
                      );
                    }).datum({
                      fmin: O,
                      fmax: B,
                      alleles: s.get(K) ?? []
                    }) : x = !1, x && c) {
                      const l = Hn(K), N = l.length || 1;
                      Dt.append("text").attr("class", "variantLabel").attr("fill", "black").attr("opacity", Et ? 1 : 0.5).attr("height", T).attr(
                        "transform",
                        `translate(${st(O - N / 2 * 100)},${C * 2.2 - w})`
                      ).html(l).on("click", () => {
                        rt(
                          ft,
                          P,
                          ht
                        );
                      }).datum({ fmin: U.fmin });
                    }
                  }
                });
              })), lt += 1;
            }
            lt === A && !wt && (++zt, wt = !0, _t.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${lt * y + 20 + Tt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", T).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (lt === 0 && _t.append("text").attr("x", 30).attr("y", T + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        qi(this.initialHighlight, this.viewer);
      } catch {
      }
    return lt * y + Tt;
  }
  filterVariantData(e, n) {
    if (!n || n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a) => {
      let s = !1;
      try {
        if (i.has(a.name) && (s = !0), a.allele_symbols?.values) {
          const f = a.allele_symbols.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(f) && (s = !0);
        }
        if (a.symbol?.values) {
          const f = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(f) && (s = !0);
        }
        if (a.symbol_text?.values) {
          const f = a.symbol_text.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(f) && (s = !0);
        }
        const o = a.allele_ids?.values?.[0];
        if (o) {
          let f = [];
          if (o.startsWith("[") && o.endsWith("]"))
            try {
              const c = JSON.parse(o);
              f = (Array.isArray(c) ? c : [c]).map(String);
            } catch {
              f = o.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            f = o.replace(/"|\\[|\\]| /g, "").split(",");
          for (const c of f)
            if (i.has(c)) {
              s = !0;
              break;
            }
        }
      } catch {
        s = !0;
      }
      return s;
    });
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
}
class Lu {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    htpVariant: a,
    trackData: s,
    region: o,
    genome: f
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = i, this.height = n, this.transcriptTypes = r, this.htpVariant = a, this.region = o, this.genome = f;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  DrawTrack() {
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = e[0]?.seqId, o = 10, f = ["UTR", "five_prime_UTR", "three_prime_UTR"], c = ["CDS"], u = ["exon"], _ = this.transcriptTypes, p = 10, g = 10, k = 40, F = 0, R = 10, A = 4, E = 20, b = 10, y = `0,0 0,${E} ${b},${b}`, S = this.renderTooltipDescription, D = ue().domain([this.region.start, this.region.end]).range([0, r]), T = {};
    for (let L = 0, nt = f.length; L < nt; L++)
      T[f[L]] = 200;
    for (let L = 0, nt = c.length; L < nt; L++)
      T[c[L]] = 1e3;
    for (let L = 0, nt = u.length; L < nt; L++)
      T[u[L]] = 100;
    e = e.sort((L, nt) => L.selected && !nt.selected ? -1 : !L.selected && nt.selected ? 1 : L.name - nt.name);
    const z = pt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), H = () => {
      z.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const L = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, nt] = n.split(":");
      L.append("polygon").attr("class", "variant-SNV").attr("points", Wi(D(+nt))).attr("fill", "red").attr("x", D(+nt)).attr("z-index", 30);
    }
    const C = Fe(this.viewer), w = i.append("g").attr("transform", `translate(0,${C})`).attr("class", "track");
    let G = 0;
    const V = [];
    let J = -1, at = -1;
    const ct = [];
    for (let L = 0; L < e.length && G < o; L++) {
      const nt = e[L];
      let ot = nt.children;
      if (ot) {
        const st = nt.selected;
        ot = ot.sort((it, _t) => it.name < _t.name ? -1 : it.name > _t.name ? 1 : 0), ot.forEach((it) => {
          const _t = it.type;
          if (!ct.includes(it.id) && (ct.push(it.id), _.includes(_t))) {
            let ut = Zi(
              V,
              D(it.fmin),
              D(it.fmax)
            );
            if (G < o) {
              const kt = w.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${G * k + 10})`
              ), Tt = Math.max(D(it.fmin), 0), ft = Math.min(D(it.fmax), this.width);
              kt.append("polygon").datum(() => ({
                strand: nt.strand
              })).attr("class", "transArrow").attr("points", y).attr(
                "transform",
                () => nt.strand > 0 ? `translate(${ft},0)` : `translate(${Tt},${E}) rotate(180)`
              ).on("click", () => {
                S(
                  z,
                  Ot(it),
                  H
                );
              }), kt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", A).attr("transform", `translate(${Tt},0)`).attr("width", ft - Tt).datum({
                fmin: it.fmin,
                fmax: it.fmax
              }).on("click", () => {
                S(
                  z,
                  Ot(it),
                  H
                );
              });
              let ht = it.name;
              nt.name !== it.name && (ht += ` (${nt.name})`);
              let lt = Math.max(D(it.fmin), 0);
              const xt = kt.append("svg:text").attr("class", "transcriptLabel").attr("fill", st ? "sandybrown" : "gray").attr("opacity", st ? 1 : 0.5).attr("height", F).attr("transform", `translate(${lt},0)`).text(ht).datum({
                fmin: it.fmin
              }).on("click", () => {
                S(
                  z,
                  Ot(it),
                  H
                );
              });
              let St = 100;
              try {
                St = xt.node()?.getBBox().width ?? 0;
              } catch {
              }
              if (St + lt > this.width) {
                const Z = St + lt - this.width;
                lt -= Z, xt.attr("transform", `translate(${lt},0)`);
              }
              let At = ht.length * 2;
              try {
                At = xt.node()?.getBBox().width ?? 0;
              } catch {
              }
              Number(At + D(it.fmin)) > r;
              const rt = At > D(it.fmax) - D(it.fmin) ? D(it.fmin) + At : D(it.fmax);
              if (V[ut]) {
                const Z = V[ut];
                Z.push(`${D(it.fmin)}:${rt}`), V[ut] = Z;
              } else
                V[ut] = [`${D(it.fmin)}:${rt}`];
              (J < 0 || J > it.fmin) && (J = it.fmin), (at < 0 || at < it.fmax) && (at = it.fmax), it.children && (it.children = it.children.sort(
                function(Z, bt) {
                  const yt = T[Z.type], Et = T[bt.type];
                  if (typeof yt == "number" && typeof Et == "number")
                    return yt - Et;
                  if (typeof yt == "number" && typeof Et != "number")
                    return -1;
                  if (typeof yt != "number" && typeof Et == "number")
                    return 1;
                  const wt = Z.type || "", U = bt.type || "";
                  return wt.localeCompare(U);
                }
              ), it.children.forEach((Z) => {
                const bt = Z.type;
                if (D(Z.fmin) > this.width || D(Z.fmax) < 0)
                  return;
                const yt = Math.max(D(Z.fmin), 0), Et = Math.min(D(Z.fmax), this.width);
                u.includes(bt) ? kt.append("rect").attr("class", "exon").attr("x", yt).attr(
                  "transform",
                  `translate(0,${p - A})`
                ).attr("height", p).attr("z-index", 10).attr("width", Et - yt).datum({
                  fmin: Z.fmin,
                  fmax: Z.fmax
                }).on("click", () => {
                  S(
                    z,
                    Ot(it),
                    H
                  );
                }) : c.includes(bt) ? kt.append("rect").attr("class", "CDS").attr("x", yt).attr(
                  "transform",
                  `translate(0,${g - A})`
                ).attr("z-index", 20).attr("height", g).attr("width", Et - yt).datum({
                  fmin: Z.fmin,
                  fmax: Z.fmax
                }).on("click", () => {
                  S(
                    z,
                    Ot(it),
                    H
                  );
                }) : f.includes(bt) && kt.append("rect").attr("class", "UTR").attr("x", yt).attr(
                  "transform",
                  `translate(0,${R - A})`
                ).attr("z-index", 20).attr("height", R).attr("width", Et - yt).datum({
                  fmin: Z.fmin,
                  fmax: Z.fmax
                }).on("click", () => {
                  S(
                    z,
                    Ot(it),
                    H
                  );
                });
              })), G += 1;
            }
            if (G === o) {
              const kt = bs(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++ut, w.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${G * k + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(kt);
            }
          }
        });
      }
    }
    return G === 0 && w.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), G * k;
  }
}
class Ou {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = ue().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = Ao(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((f, c) => n[c]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = rr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = vi(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), vi(".x-local-axis .tick text").each(function() {
      const c = pt(this).text();
      let u = "nucleotide nt-a";
      c === "T" ? u = "nucleotide nt-t" : c === "C" ? u = "nucleotide nt-c" : c === "G" && (u = "nucleotide nt-g"), pt(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = ue().domain([n, i]).range(this.track.range), s = rr(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", r).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, i) {
    return i ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((r, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((r, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const Pe = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var Xt = "$";
function Mn() {
}
Mn.prototype = Xi.prototype = {
  constructor: Mn,
  has: function(t) {
    return Xt + t in this;
  },
  get: function(t) {
    return this[Xt + t];
  },
  set: function(t, e) {
    return this[Xt + t] = e, this;
  },
  remove: function(t) {
    var e = Xt + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === Xt && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === Xt && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === Xt) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === Xt && t(this[e], e.slice(1), this);
  }
};
function Xi(t, e) {
  var n = new Mn();
  if (t instanceof Mn) t.each(function(o, f) {
    n.set(f, o);
  });
  else if (Array.isArray(t)) {
    var i = -1, r = t.length, a;
    if (e == null) for (; ++i < r; ) n.set(i, t[i]);
    else for (; ++i < r; ) n.set(e(a = t[i], i, t), a);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Sr() {
}
var de = Xi.prototype;
Sr.prototype = {
  constructor: Sr,
  has: de.has,
  add: function(t) {
    return t += "", this[Xt + t] = t, this;
  },
  remove: de.remove,
  clear: de.clear,
  values: de.keys,
  size: de.size,
  empty: de.empty,
  each: de.each
};
var Ni = "http://www.w3.org/1999/xhtml";
const Ar = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ni,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ks(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ar.hasOwnProperty(e) ? { space: Ar[e], local: t } : t;
}
function Cu(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ni && e.documentElement.namespaceURI === Ni ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Fu(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = ks(t);
  return (e.local ? Fu : Cu)(e);
}
function Bu() {
}
function Ts(t) {
  return t == null ? Bu : function() {
    return this.querySelector(t);
  };
}
function zu(t) {
  typeof t != "function" && (t = Ts(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), f, c, u = 0; u < s; ++u)
      (f = a[u]) && (c = t.call(f, f.__data__, u, a)) && ("__data__" in f && (c.__data__ = f.__data__), o[u] = c);
  return new Gt(i, this._parents);
}
function Pu() {
  return [];
}
function Hu(t) {
  return t == null ? Pu : function() {
    return this.querySelectorAll(t);
  };
}
function Vu(t) {
  typeof t != "function" && (t = Hu(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && (i.push(t.call(f, f.__data__, c, s)), r.push(f));
  return new Gt(i, r);
}
function Uu(t) {
  return function() {
    return this.matches(t);
  };
}
function Gu(t) {
  typeof t != "function" && (t = Uu(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new Gt(i, this._parents);
}
function $s(t) {
  return new Array(t.length);
}
function Zu() {
  return new Gt(this._enter || this._groups.map($s), this._parents);
}
function Ln(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ln.prototype = {
  constructor: Ln,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function qu(t) {
  return function() {
    return t;
  };
}
var Nr = "$";
function Wu(t, e, n, i, r, a) {
  for (var s = 0, o, f = e.length, c = a.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Ln(t, a[s]);
  for (; s < f; ++s)
    (o = e[s]) && (r[s] = o);
}
function Xu(t, e, n, i, r, a, s) {
  var o, f, c = {}, u = e.length, _ = a.length, p = new Array(u), g;
  for (o = 0; o < u; ++o)
    (f = e[o]) && (p[o] = g = Nr + s.call(f, f.__data__, o, e), g in c ? r[o] = f : c[g] = f);
  for (o = 0; o < _; ++o)
    g = Nr + s.call(t, a[o], o, a), (f = c[g]) ? (i[o] = f, f.__data__ = a[o], c[g] = null) : n[o] = new Ln(t, a[o]);
  for (o = 0; o < u; ++o)
    (f = e[o]) && c[p[o]] === f && (r[o] = f);
}
function Ku(t, e) {
  if (!t)
    return g = new Array(this.size()), c = -1, this.each(function(D) {
      g[++c] = D;
    }), g;
  var n = e ? Xu : Wu, i = this._parents, r = this._groups;
  typeof t != "function" && (t = qu(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), f = new Array(a), c = 0; c < a; ++c) {
    var u = i[c], _ = r[c], p = _.length, g = t.call(u, u && u.__data__, c, i), k = g.length, F = o[c] = new Array(k), R = s[c] = new Array(k), A = f[c] = new Array(p);
    n(u, _, F, R, A, g, e);
    for (var E = 0, b = 0, y, S; E < k; ++E)
      if (y = F[E]) {
        for (E >= b && (b = E + 1); !(S = R[b]) && ++b < k; ) ;
        y._next = S || null;
      }
  }
  return s = new Gt(s, i), s._enter = o, s._exit = f, s;
}
function Yu() {
  return new Gt(this._exit || this._groups.map($s), this._parents);
}
function Ju(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function Qu(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var f = e[o], c = n[o], u = f.length, _ = s[o] = new Array(u), p, g = 0; g < u; ++g)
      (p = f[g] || c[g]) && (_[g] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new Gt(s, this._parents);
}
function ju() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function th(t) {
  t || (t = eh);
  function e(_, p) {
    return _ && p ? t(_.__data__, p.__data__) : !_ - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, f = r[a] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (f[u] = c);
    f.sort(e);
  }
  return new Gt(r, this._parents).order();
}
function eh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ih() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function rh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function ah() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function sh() {
  return !this.node();
}
function oh(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function lh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ch(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function uh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function dh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ph(t, e) {
  var n = ks(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ch : lh : typeof e == "function" ? n.local ? dh : hh : n.local ? uh : fh)(n, e));
}
function Ss(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _h(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function mh(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function vh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _h : typeof e == "function" ? mh : gh)(t, e, n ?? "")) : wh(this.node(), t);
}
function wh(t, e) {
  return t.style.getPropertyValue(e) || Ss(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yh(t) {
  return function() {
    delete this[t];
  };
}
function xh(t, e) {
  return function() {
    this[t] = e;
  };
}
function bh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function kh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yh : typeof e == "function" ? bh : xh)(t, e)) : this.node()[t];
}
function As(t) {
  return t.trim().split(/^|\s+/);
}
function Ki(t) {
  return t.classList || new Ns(t);
}
function Ns(t) {
  this._node = t, this._names = As(t.getAttribute("class") || "");
}
Ns.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Is(t, e) {
  for (var n = Ki(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Ds(t, e) {
  for (var n = Ki(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Eh(t) {
  return function() {
    Is(this, t);
  };
}
function Th(t) {
  return function() {
    Ds(this, t);
  };
}
function $h(t, e) {
  return function() {
    (e.apply(this, arguments) ? Is : Ds)(this, t);
  };
}
function Sh(t, e) {
  var n = As(t + "");
  if (arguments.length < 2) {
    for (var i = Ki(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? $h : e ? Eh : Th)(n, e));
}
function Ah() {
  this.textContent = "";
}
function Nh(t) {
  return function() {
    this.textContent = t;
  };
}
function Ih(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Dh(t) {
  return arguments.length ? this.each(t == null ? Ah : (typeof t == "function" ? Ih : Nh)(t)) : this.node().textContent;
}
function Rh() {
  this.innerHTML = "";
}
function Mh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Lh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Oh(t) {
  return arguments.length ? this.each(t == null ? Rh : (typeof t == "function" ? Lh : Mh)(t)) : this.node().innerHTML;
}
function Ch() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fh() {
  return this.each(Ch);
}
function Bh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zh() {
  return this.each(Bh);
}
function Ph(t) {
  var e = typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Hh() {
  return null;
}
function Vh(t, e) {
  var n = typeof t == "function" ? t : Es(t), i = e == null ? Hh : typeof e == "function" ? e : Ts(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Uh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gh() {
  return this.each(Uh);
}
function Zh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function qh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wh(t) {
  return this.select(t ? qh : Zh);
}
function Xh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Rs = {};
if (typeof document < "u") {
  var Kh = document.documentElement;
  "onmouseenter" in Kh || (Rs = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Yh(t, e, n) {
  return t = Ms(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Ms(t, e, n) {
  return function(i) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function Jh(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Qh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function jh(t, e, n) {
  var i = Rs.hasOwnProperty(t.type) ? Yh : Ms;
  return function(r, a, s) {
    var o = this.__on, f, c = i(e, a, s);
    if (o) {
      for (var u = 0, _ = o.length; u < _; ++u)
        if ((f = o[u]).type === t.type && f.name === t.name) {
          this.removeEventListener(f.type, f.listener, f.capture), this.addEventListener(f.type, f.listener = c, f.capture = n), f.value = e;
          return;
        }
    }
    this.addEventListener(t.type, c, n), f = { type: t.type, name: t.name, value: e, listener: c, capture: n }, o ? o.push(f) : this.__on = [f];
  };
}
function td(t, e, n) {
  var i = Jh(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var f = 0, c = o.length, u; f < c; ++f)
        for (r = 0, u = o[f]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? jh : Qh, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ls(t, e, n) {
  var i = Ss(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ed(t, e) {
  return function() {
    return Ls(this, t, e);
  };
}
function nd(t, e) {
  return function() {
    return Ls(this, t, e.apply(this, arguments));
  };
}
function id(t, e) {
  return this.each((typeof e == "function" ? nd : ed)(t, e));
}
var Os = [null];
function Gt(t, e) {
  this._groups = t, this._parents = e;
}
function Ii() {
  return new Gt([[document.documentElement]], Os);
}
Gt.prototype = Ii.prototype = {
  constructor: Gt,
  select: zu,
  selectAll: Vu,
  filter: Gu,
  data: Ku,
  enter: Zu,
  exit: Yu,
  join: Ju,
  merge: Qu,
  order: ju,
  sort: th,
  call: nh,
  nodes: ih,
  node: rh,
  size: ah,
  empty: sh,
  each: oh,
  attr: ph,
  style: vh,
  property: kh,
  classed: Sh,
  text: Dh,
  html: Oh,
  raise: Fh,
  lower: zh,
  append: Ph,
  insert: Vh,
  remove: Gh,
  clone: Wh,
  datum: Xh,
  on: td,
  dispatch: id
};
function Ir(t) {
  return typeof t == "string" ? new Gt([[document.querySelector(t)]], [document.documentElement]) : new Gt([[t]], Os);
}
function rd() {
  var t = c, e = u, n = _, i = document.body, r = D(), a = null, s = null, o = null;
  function f(w) {
    a = T(w), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  f.show = function() {
    var w = Array.prototype.slice.call(arguments);
    w[w.length - 1] instanceof SVGElement && (o = w.pop());
    var G = n.apply(this, w), V = e.apply(this, w), J = t.apply(this, w), at = z(), ct = g.length, L, nt = document.documentElement.scrollTop || i.scrollTop, ot = document.documentElement.scrollLeft || i.scrollLeft;
    for (at.html(G).style("opacity", 1).style("pointer-events", "all"); ct--; ) at.classed(g[ct], !1);
    return L = p.get(J).apply(this), at.classed(J, !0).style("top", L.top + V[0] + nt + "px").style("left", L.left + V[1] + ot + "px"), f;
  }, f.hide = function() {
    var w = z();
    return w.style("opacity", 0).style("pointer-events", "none"), f;
  }, f.attr = function(w, G) {
    if (arguments.length < 2 && typeof w == "string")
      return z().attr(w);
    var V = Array.prototype.slice.call(arguments);
    return Ii.prototype.attr.apply(z(), V), f;
  }, f.style = function(w, G) {
    if (arguments.length < 2 && typeof w == "string")
      return z().style(w);
    var V = Array.prototype.slice.call(arguments);
    return Ii.prototype.style.apply(z(), V), f;
  }, f.direction = function(w) {
    return arguments.length ? (t = w == null ? w : C(w), f) : t;
  }, f.offset = function(w) {
    return arguments.length ? (e = w == null ? w : C(w), f) : e;
  }, f.html = function(w) {
    return arguments.length ? (n = w == null ? w : C(w), f) : n;
  }, f.rootElement = function(w) {
    return arguments.length ? (i = w == null ? w : C(w), f) : i;
  }, f.destroy = function() {
    return r && (z().remove(), r = null), f;
  };
  function c() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function _() {
    return " ";
  }
  var p = Xi({
    n: k,
    s: F,
    e: R,
    w: A,
    nw: E,
    ne: b,
    sw: y,
    se: S
  }), g = p.keys();
  function k() {
    var w = H(this);
    return {
      top: w.n.y - r.offsetHeight,
      left: w.n.x - r.offsetWidth / 2
    };
  }
  function F() {
    var w = H(this);
    return {
      top: w.s.y,
      left: w.s.x - r.offsetWidth / 2
    };
  }
  function R() {
    var w = H(this);
    return {
      top: w.e.y - r.offsetHeight / 2,
      left: w.e.x
    };
  }
  function A() {
    var w = H(this);
    return {
      top: w.w.y - r.offsetHeight / 2,
      left: w.w.x - r.offsetWidth
    };
  }
  function E() {
    var w = H(this);
    return {
      top: w.nw.y - r.offsetHeight,
      left: w.nw.x - r.offsetWidth
    };
  }
  function b() {
    var w = H(this);
    return {
      top: w.ne.y - r.offsetHeight,
      left: w.ne.x
    };
  }
  function y() {
    var w = H(this);
    return {
      top: w.sw.y,
      left: w.sw.x - r.offsetWidth
    };
  }
  function S() {
    var w = H(this);
    return {
      top: w.se.y,
      left: w.se.x
    };
  }
  function D() {
    var w = Ir(document.createElement("div"));
    return w.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), w.node();
  }
  function T(w) {
    var G = w.node();
    return G ? G.tagName.toLowerCase() === "svg" ? G : G.ownerSVGElement : null;
  }
  function z() {
    return r == null && (r = D(), i.appendChild(r)), Ir(r);
  }
  function H(w) {
    for (var G = o || w; G.getScreenCTM == null && G.parentNode != null; )
      G = G.parentNode;
    var V = {}, J = G.getScreenCTM(), at = G.getBBox(), ct = at.width, L = at.height, nt = at.x, ot = at.y;
    return s.x = nt, s.y = ot, V.nw = s.matrixTransform(J), s.x += ct, V.ne = s.matrixTransform(J), s.y += L, V.se = s.matrixTransform(J), s.x -= ct, V.sw = s.matrixTransform(J), s.y -= L / 2, V.w = s.matrixTransform(J), s.x += ct, V.e = s.matrixTransform(J), s.x -= ct / 2, s.y -= L / 2, V.n = s.matrixTransform(J), s.y += L, V.s = s.matrixTransform(J), V;
  }
  function C(w) {
    return typeof w == "function" ? w : function() {
      return w;
    };
  }
  return f;
}
class ad {
  constructor({
    region: e,
    viewer: n,
    height: i,
    width: r,
    range: a
  }) {
    this.variants = [], this.viewer = n, this.width = r, this.height = i, this.region = e, this.range = a;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end + 1]).range(this.range), r = fs().type(cs).size(20), a = rd();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (_) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${_.position}</td></tr><tr><td>Mutation</td> <td>${_.ref} > ${_.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = Fe(this.viewer), f = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    f.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), f.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (_) => `translate(${i(_.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = pt("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    u.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), u.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class sd {
  constructor({
    viewer: e,
    track: n,
    height: i,
    width: r,
    region: a
  }) {
    this.variants = [], this.region = a, this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end]).range(this.track.range), r = fs().type(cs).size(20), a = 20, s = Fe(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (f) => `translate(${i(f.position)},10)`);
  }
  async getTrackData() {
  }
}
function Yi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Kn, Dr;
function od() {
  if (Dr) return Kn;
  Dr = 1;
  class t {
    constructor(n = {}) {
      if (!(n.maxSize && n.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      this.maxSize = n.maxSize, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
    }
    _set(n, i) {
      this.cache.set(n, i), this._size++, this._size >= this.maxSize && (this._size = 0, this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
    }
    get(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n)) {
        const i = this.oldCache.get(n);
        return this.oldCache.delete(n), this._set(n, i), i;
      }
    }
    set(n, i) {
      return this.cache.has(n) ? this.cache.set(n, i) : this._set(n, i), this;
    }
    has(n) {
      return this.cache.has(n) || this.oldCache.has(n);
    }
    peek(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n))
        return this.oldCache.get(n);
    }
    delete(n) {
      const i = this.cache.delete(n);
      return i && this._size--, this.oldCache.delete(n) || i;
    }
    clear() {
      this.cache.clear(), this.oldCache.clear(), this._size = 0;
    }
    *keys() {
      for (const [n] of this)
        yield n;
    }
    *values() {
      for (const [, n] of this)
        yield n;
    }
    *[Symbol.iterator]() {
      for (const n of this.cache)
        yield n;
      for (const n of this.oldCache) {
        const [i] = n;
        this.cache.has(i) || (yield n);
      }
    }
    get size() {
      let n = 0;
      for (const i of this.oldCache.keys())
        this.cache.has(i) || n++;
      return this._size + n;
    }
  }
  return Kn = t, Kn;
}
var ld = od();
const Vn = /* @__PURE__ */ Yi(ld);
class cd {
}
class fd {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new cd()) {
    if (this.signal.aborted)
      throw new Error("cannot add a signal, already aborted!");
    this.signals.add(e), e.aborted ? this.handleAborted(e) : typeof e.addEventListener == "function" && e.addEventListener("abort", () => {
      this.handleAborted(e);
    });
  }
  handleAborted(e) {
    this.signals.delete(e), this.signals.size === 0 && this.abortController.abort();
  }
  get signal() {
    return this.abortController.signal;
  }
  abort() {
    this.abortController.abort();
  }
}
class ud {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set();
  }
  addCallback(e = () => {
  }) {
    this.callbacks.add(e), this.currentMessage && e(this.currentMessage);
  }
  callback(e) {
    this.currentMessage = e;
    for (const n of this.callbacks)
      n(e);
  }
}
class ke {
  constructor({ fill: e, cache: n }) {
    if (typeof e != "function")
      throw new TypeError("must pass a fill function");
    if (typeof n != "object")
      throw new TypeError("must pass a cache object");
    if (typeof n.get != "function" || typeof n.set != "function" || typeof n.delete != "function")
      throw new TypeError("cache must implement get(key), set(key, val), and and delete(key)");
    this.cache = n, this.fillCallback = e;
  }
  static isAbortException(e) {
    return (
      // DOMException
      e.name === "AbortError" || // standard-ish non-DOM abort exception
      //@ts-ignore
      e.code === "ERR_ABORTED" || // stringified DOMException
      e.message === "AbortError: aborted" || // stringified standard-ish exception
      e.message === "Error: aborted"
    );
  }
  evict(e, n) {
    this.cache.get(e) === n && this.cache.delete(e);
  }
  fill(e, n, i, r) {
    const a = new fd(), s = new ud();
    s.addCallback(r);
    const o = {
      aborter: a,
      promise: this.fillCallback(n, a.signal, (f) => {
        s.callback(f);
      }),
      settled: !1,
      statusReporter: s,
      get aborted() {
        return this.aborter.signal.aborted;
      }
    };
    o.aborter.addSignal(i), o.aborter.signal.addEventListener("abort", () => {
      o.settled || this.evict(e, o);
    }), o.promise.then(() => {
      o.settled = !0;
    }, () => {
      o.settled = !0, this.evict(e, o);
    }).catch((f) => {
      throw console.error(f), f;
    }), this.cache.set(e, o);
  }
  static checkSinglePromise(e, n) {
    function i() {
      if (n?.aborted)
        throw Object.assign(new Error("aborted"), { code: "ERR_ABORTED" });
    }
    return e.then((r) => (i(), r), (r) => {
      throw i(), r;
    });
  }
  has(e) {
    return this.cache.has(e);
  }
  /**
   * Callback for getting status of the pending async
   *
   * @callback statusCallback
   * @param {any} status, current status string or message object
   */
  /**
   * @param {any} key cache key to use for this request
   * @param {any} data data passed as the first argument to the fill callback
   * @param {AbortSignal} [signal] optional AbortSignal object that aborts the request
   * @param {statusCallback} a callback to get the current status of a pending async operation
   */
  get(e, n, i, r) {
    if (!i && n instanceof AbortSignal)
      throw new TypeError("second get argument appears to be an AbortSignal, perhaps you meant to pass `null` for the fill data?");
    const a = this.cache.get(e);
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, i, r)) : a.settled ? a.promise : (a.aborter.addSignal(i), a.statusReporter.addCallback(r), ke.checkSinglePromise(a.promise, i)) : (this.fill(e, n, i, r), ke.checkSinglePromise(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.cache.get(e).promise,
      i
    ));
  }
  /**
   * delete the given entry from the cache. if it exists and its fill request has
   * not yet settled, the fill will be signaled to abort.
   *
   * @param {any} key
   */
  delete(e) {
    const n = this.cache.get(e);
    n && (n.settled || n.aborter.abort(), this.cache.delete(e));
  }
  /**
   * Clear all requests from the cache. Aborts any that have not settled.
   * @returns {number} count of entries deleted
   */
  clear() {
    const e = this.cache.keys();
    let n = 0;
    for (let i = e.next(); !i.done; i = e.next())
      this.delete(i.value), n += 1;
    return n;
  }
}
var bn = { exports: {} }, hd = bn.exports, Rr;
function dd() {
  return Rr || (Rr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(hd, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(E) {
        return n.test(E);
      }
      function s(E) {
        return E.startsWith("//");
      }
      function o(E) {
        return E.startsWith("/");
      }
      function f(E) {
        return E.startsWith("file:");
      }
      function c(E) {
        return /^[.?#]/.test(E);
      }
      function u(E) {
        const b = i.exec(E);
        return p(b[1], b[2] || "", b[3], b[4] || "", b[5] || "/", b[6] || "", b[7] || "");
      }
      function _(E) {
        const b = r.exec(E), y = b[2];
        return p("file:", "", b[1] || "", "", o(y) ? y : "/" + y, b[3] || "", b[4] || "");
      }
      function p(E, b, y, S, D, T, z) {
        return {
          scheme: E,
          user: b,
          host: y,
          port: S,
          path: D,
          query: T,
          hash: z,
          type: 7
        };
      }
      function g(E) {
        if (s(E)) {
          const y = u("http:" + E);
          return y.scheme = "", y.type = 6, y;
        }
        if (o(E)) {
          const y = u("http://foo.com" + E);
          return y.scheme = "", y.host = "", y.type = 5, y;
        }
        if (f(E))
          return _(E);
        if (a(E))
          return u(E);
        const b = u("http://foo.com/" + E);
        return b.scheme = "", b.host = "", b.type = E ? E.startsWith("?") ? 3 : E.startsWith("#") ? 2 : 4 : 1, b;
      }
      function k(E) {
        if (E.endsWith("/.."))
          return E;
        const b = E.lastIndexOf("/");
        return E.slice(0, b + 1);
      }
      function F(E, b) {
        R(b, b.type), E.path === "/" ? E.path = b.path : E.path = k(b.path) + E.path;
      }
      function R(E, b) {
        const y = b <= 4, S = E.path.split("/");
        let D = 1, T = 0, z = !1;
        for (let C = 1; C < S.length; C++) {
          const w = S[C];
          if (!w) {
            z = !0;
            continue;
          }
          if (z = !1, w !== ".") {
            if (w === "..") {
              T ? (z = !0, T--, D--) : y && (S[D++] = w);
              continue;
            }
            S[D++] = w, T++;
          }
        }
        let H = "";
        for (let C = 1; C < D; C++)
          H += "/" + S[C];
        (!H || z && !H.endsWith("/..")) && (H += "/"), E.path = H;
      }
      function A(E, b) {
        if (!E && !b)
          return "";
        const y = g(E);
        let S = y.type;
        if (b && S !== 7) {
          const T = g(b), z = T.type;
          switch (S) {
            case 1:
              y.hash = T.hash;
            // fall through
            case 2:
              y.query = T.query;
            // fall through
            case 3:
            case 4:
              F(y, T);
            // fall through
            case 5:
              y.user = T.user, y.host = T.host, y.port = T.port;
            // fall through
            case 6:
              y.scheme = T.scheme;
          }
          z > S && (S = z);
        }
        R(y, S);
        const D = y.query + y.hash;
        switch (S) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return D;
          case 4: {
            const T = y.path.slice(1);
            return T ? c(b || E) && !c(T) ? "./" + T + D : T + D : D || ".";
          }
          case 5:
            return y.path + D;
          default:
            return y.scheme + "//" + y.user + y.host + y.port + y.path + D;
        }
      }
      return A;
    });
  }(bn)), bn.exports;
}
var pd = dd();
const _d = /* @__PURE__ */ Yi(pd);
async function Ji(t, e, n = {}) {
  const { defaultContent: i = {} } = n;
  try {
    const r = await e(t, { encoding: "utf8" }), a = new TextDecoder("utf8");
    return JSON.parse(a.decode(r));
  } catch (r) {
    if (r.code === "ENOENT" || r.status === 404 || r.message.includes("404") || r.message.includes("ENOENT"))
      return i;
    throw r;
  }
}
function Qi(t, e = ".") {
  return _d(t, e);
}
class gd {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new ke({
      cache: new Vn({ maxSize: n }),
      fill: this.readChunkItems.bind(this)
    }), this.readFile = e, !this.readFile)
      throw new Error('must provide a "readFile" function');
  }
  importExisting(e, n, i, r, a) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = a, this.baseURL = i, this.lazyUrlTemplate = r;
  }
  binarySearch(e, n, i) {
    let r = -1, a = e.length, s;
    for (; a - r > 1; )
      s = r + a >>> 1, i(e[s]) >= n ? a = s : r = s;
    return i === this.end ? a : r;
  }
  readChunkItems(e) {
    const n = Qi(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return Ji(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, i, r, a, s, o) {
    const f = this.attrs.makeGetter("Chunk"), c = this.attrs.makeGetter("Sublist"), u = [];
    for (let _ = this.binarySearch(e, n, a); _ < e.length && _ >= 0 && r * s(e[_]) < r * i; _ += r) {
      if (e[_][0] === this.lazyClass) {
        const g = f(e[_]), k = this.chunkCache.get(g, g).then((F) => [F, g]);
        u.push(k);
      } else
        yield [e[_], o.concat(_)];
      const p = c(e[_]);
      p && (yield* this.iterateSublist(p, n, i, r, a, s, o.concat(_)));
    }
    for (const _ of u) {
      const [p, g] = await _;
      p && (yield* this.iterateSublist(p, n, i, r, a, s, [
        ...o,
        g
      ]));
    }
  }
  async *iterate(e, n) {
    const i = e > n ? -1 : 1, r = e > n ? this.start : this.end, a = e > n ? this.end : this.start;
    this.topList.length > 0 && (yield* this.iterateSublist(this.topList, e, n, i, r, a, [0]));
  }
  async histogram(e, n, i) {
    const r = new Array(i);
    r.fill(0);
    const a = (n - e) / i;
    for await (const s of this.iterate(e, n)) {
      const o = Math.max(0, (this.start(s) - e) / a | 0), f = Math.min(i, (this.end(s) - e) / a | 0);
      for (let c = o; c <= f; c += 1)
        r[c] += 1;
    }
    return r;
  }
}
class md {
  constructor(e) {
    this.classes = e, this.fields = [];
    for (let n = 0; n < e.length; n += 1) {
      this.fields[n] = {};
      for (let i = 0; i < e[n].attributes.length; i += 1)
        this.fields[n][e[n].attributes[i]] = i + 1;
      e[n].proto === void 0 && (e[n].proto = {}), e[n].isArrayAttr === void 0 && (e[n].isArrayAttr = {});
    }
  }
  /**
   * @private
   */
  attrIndices(e) {
    return this.classes.map((n) => n.attributes.indexOf(e) + 1 || n.attributes.indexOf(e.toLowerCase()) + 1 || void 0);
  }
  get(e, n) {
    if (n in this.fields[e[0]])
      return e[this.fields[e[0]][n]];
    const i = n.toLowerCase();
    if (i in this.fields[e[0]])
      return e[this.fields[e[0]][i]];
    const r = this.classes[e[0]].attributes.length + 1;
    return r >= e.length || !(n in e[r]) ? n in this.classes[e[0]].proto ? this.classes[e[0]].proto[n] : void 0 : e[r][n];
  }
  makeSetter(e) {
    return (n, i) => {
      this.set(n, e, i);
    };
  }
  makeGetter(e) {
    return (n) => this.get(n, e);
  }
  makeFastGetter(e) {
    const n = this.attrIndices(e);
    return function(r) {
      if (n[r[0]] !== void 0)
        return r[n[r[0]]];
    };
  }
  // construct(self, obj, klass) {
  //   const result = new Array(self.classes[klass].length)
  //   Object.keys(obj).forEach(attr => {
  //     this.set(result, attr, obj[attr])
  //   })
  //   return result
  // }
  /**
   * Returns fast pre-compiled getter and setter functions for use with
   * Arrays that use this representation.
   * When the returned <code>get</code> and <code>set</code> functions are
   * added as methods to an Array that contains data in this
   * representation, they provide fast access by name to the data.
   *
   * @returns {Object} <code>{ get: function() {...}, set: function(val) {...} }</code>
   *
   * @example
   * var accessors = attrs.accessors();
   * var feature = get_feature_from_someplace();
   * feature.get = accessors.get;
   * // print out the feature start and end
   * console.log( feature.get('start') + ',' + feature.get('end') );
   */
  accessors() {
    return this._accessors || (this._accessors = this._makeAccessors()), this._accessors;
  }
  /**
   * @private
   */
  _makeAccessors() {
    const e = {}, n = {
      get(r) {
        const a = this.get.field_accessors[r.toLowerCase()];
        if (a)
          return a.call(this);
      },
      set(r, a) {
        const s = this.set.field_accessors[r];
        if (s)
          return s.call(this, a);
      },
      tags() {
        return i[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((r, a) => {
      (r.attributes || []).forEach((s, o) => {
        e[s] = e[s] || [], e[s][a] = o + 1, s = s.toLowerCase(), e[s] = e[s] || [], e[s][a] = o + 1;
      });
    });
    const i = this.classes.map((r) => r.attributes);
    return Object.keys(e).forEach((r) => {
      const a = e[r];
      n.get.field_accessors[r] = a ? function() {
        return this[a[this[0]]];
      } : function() {
      };
    }), n;
  }
}
class vd {
  constructor({ urlTemplate: e, chunkSize: n, length: i, cacheSize: r = 100, readFile: a }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = i, this.baseUrl = s === void 0 ? "" : s, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new ke({
      cache: new Vn({ maxSize: r }),
      fill: this.getChunk.bind(this)
    });
  }
  /**
   * call the callback on one element of the array
   * @param i index
   * @param callback callback, gets called with (i, value, param)
   * @param param (optional) callback will get this as its last parameter
   */
  index(e, n, i) {
    this.range(e, e, n, void 0, i);
  }
  /**
   * async generator for the elements in the range [start,end]
   *
   * @param start index of first element to call the callback on
   * @param end index of last element to call the callback on
   */
  async *range(e, n) {
    e = Math.max(0, e), n = Math.min(n, this.length - 1);
    const i = Math.floor(e / this.chunkSize), r = Math.floor(n / this.chunkSize), a = [];
    for (let s = i; s <= r; s += 1)
      a.push(this.chunkCache.get(s, s));
    for (const s of a) {
      const [o, f] = await s;
      yield* this.filterChunkData(e, n, o, f);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = Qi(n, this.baseUrl));
    const i = await Ji(n, this.readFile);
    return [e, i];
  }
  *filterChunkData(e, n, i, r) {
    const a = i * this.chunkSize, s = Math.max(0, e - a), o = Math.min(n - a, this.chunkSize - 1);
    for (let f = s; f <= o; f += 1)
      yield [f + a, r[f]];
  }
}
function wd() {
  return this._uniqueID;
}
function yd() {
  return this._parent;
}
function xd() {
  return this.get("subfeatures");
}
class bd {
  constructor({ baseUrl: e, urlTemplate: n, readFile: i, cacheSize: r = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = i, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new ke({
      cache: new Vn({ maxSize: r }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new gd({ readFile: this.readFile });
  }
  loadNCList(e, n, i) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, i, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = Qi(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return Ji(n, this.readFile).then((i) => (
      // trackInfo = JSON.parse( trackInfo );
      this.parseTrackInfo(i, n)
    ));
  }
  parseTrackInfo(e, n) {
    const i = {
      nclist: this.makeNCList(),
      stats: {
        featureCount: e.featureCount || 0
      }
    };
    e.intervals && (i.attrs = new md(e.intervals.classes), this.loadNCList(i, e, n));
    const { histograms: r } = e;
    if (r?.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new vd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
      i._histograms = r;
    }
    return i._histograms && Object.keys(i._histograms).forEach((a) => {
      i._histograms[a].forEach((o) => {
        Object.keys(o).forEach((f) => {
          typeof o[f] == "string" && String(Number(o[f])) === o[f] && (o[f] = Number(o[f]));
        });
      });
    }), i;
  }
  async getRegionStats(e) {
    return (await this.getDataRoot(e.ref)).stats;
  }
  /**
   * fetch binned counts of feature coverage in the given region.
   *
   * @param {object} query
   * @param {string} query.refName reference sequence name
   * @param {number} query.start region start
   * @param {number} query.end region end
   * @param {number} query.numBins number of bins desired in the feature counts
   * @param {number} query.basesPerBin number of bp desired in each feature counting bin
   * @returns {object} as:
   *    `{ bins: hist, stats: statEntry }`
   */
  async getRegionFeatureDensities({ refName: e, start: n, end: i, numBins: r, basesPerBin: a }) {
    const s = await this.getDataRoot(e);
    if (r)
      a = (i - n) / r;
    else if (a)
      r = Math.ceil((i - n) / a);
    else
      throw new TypeError("numBins or basesPerBin arg required for getRegionFeatureDensities");
    const f = (s._histograms.stats || []).find((p) => p.basesPerBin >= a);
    let c = s._histograms.meta[0];
    for (let p = 0; p < s._histograms.meta.length; p += 1)
      a >= s._histograms.meta[p].basesPerBin && (c = s._histograms.meta[p]);
    let u = a / c.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const p = Math.floor(n / c.basesPerBin);
      u = Math.round(u);
      const g = [];
      for (let k = 0; k < r; k += 1)
        g[k] = 0;
      for await (const [k, F] of c.lazyArray.range(p, p + u * r - 1))
        g[Math.floor((k - p) / u)] += F;
      return { bins: g, stats: f };
    }
    return { bins: await s.nclist.histogram(n, i, r), stats: f };
  }
  /**
   * Fetch features in a given region. This method is an asynchronous generator
   * yielding feature objects.
   *
   * @param {object} args
   * @param {string} args.refName reference sequence name
   * @param {number} args.start start of region. 0-based half-open.
   * @param {number} args.end end of region. 0-based half-open.
   * @yields {object}
   */
  async *getFeatures({ refName: e, start: n, end: i }) {
    const r = await this.getDataRoot(e), a = r.attrs?.accessors();
    for await (const [s, o] of r.nclist.iterate(n, i)) {
      if (!s.decorated) {
        const f = o.join(",");
        this.decorateFeature(a, s, `${e},${f}`);
      }
      yield s;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, i, r) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = wd, n._parent = r, n.parent = yd, n.children = xd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${i}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const kd = 3, Ed = 258, Cs = 29, Td = 256, $d = Td + 1 + Cs, Fs = 30, Sd = 512, Ad = new Array(($d + 2) * 2);
Be(Ad);
const Nd = new Array(Fs * 2);
Be(Nd);
const Id = new Array(Sd);
Be(Id);
const Dd = new Array(Ed - kd + 1);
Be(Dd);
const Rd = new Array(Cs);
Be(Rd);
const Md = new Array(Fs);
Be(Md);
const Ld = (t, e, n, i) => {
  let r = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
  for (; n !== 0; ) {
    s = n > 2e3 ? 2e3 : n, n -= s;
    do
      r = r + e[i++] | 0, a = a + r | 0;
    while (--s);
    r %= 65521, a %= 65521;
  }
  return r | a << 16 | 0;
};
var Di = Ld;
const Od = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, Cd = new Uint32Array(Od()), Fd = (t, e, n, i) => {
  const r = Cd, a = i + n;
  t ^= -1;
  for (let s = i; s < a; s++)
    t = t >>> 8 ^ r[(t ^ e[s]) & 255];
  return t ^ -1;
};
var ee = Fd, Ri = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Bs = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const Bd = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var zd = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const i in n)
        Bd(n, i) && (t[i] = n[i]);
    }
  }
  return t;
}, Pd = (t) => {
  let e = 0;
  for (let i = 0, r = t.length; i < r; i++)
    e += t[i].length;
  const n = new Uint8Array(e);
  for (let i = 0, r = 0, a = t.length; i < a; i++) {
    let s = t[i];
    n.set(s, r), r += s.length;
  }
  return n;
}, zs = {
  assign: zd,
  flattenChunks: Pd
};
let Ps = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Ps = !1;
}
const Je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  Je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
Je[254] = Je[254] = 1;
var Hd = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, i, r, a, s = t.length, o = 0;
  for (r = 0; r < s; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, r = 0; a < o; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const Vd = (t, e) => {
  if (e < 65534 && t.subarray && Ps)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let i = 0; i < e; i++)
    n += String.fromCharCode(t[i]);
  return n;
};
var Ud = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let i, r;
  const a = new Array(n * 2);
  for (r = 0, i = 0; i < n; ) {
    let s = t[i++];
    if (s < 128) {
      a[r++] = s;
      continue;
    }
    let o = Je[s];
    if (o > 4) {
      a[r++] = 65533, i += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && i < n; )
      s = s << 6 | t[i++] & 63, o--;
    if (o > 1) {
      a[r++] = 65533;
      continue;
    }
    s < 65536 ? a[r++] = s : (s -= 65536, a[r++] = 55296 | s >> 10 & 1023, a[r++] = 56320 | s & 1023);
  }
  return Vd(a, r);
}, Gd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + Je[t[n]] > e ? n : e;
}, Mi = {
  string2buf: Hd,
  buf2string: Ud,
  utf8border: Gd
};
function Zd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var qd = Zd;
const fn = 16209, Wd = 16191;
var Xd = function(e, n) {
  let i, r, a, s, o, f, c, u, _, p, g, k, F, R, A, E, b, y, S, D, T, z, H, C;
  const w = e.state;
  i = e.next_in, H = e.input, r = i + (e.avail_in - 5), a = e.next_out, C = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), f = w.dmax, c = w.wsize, u = w.whave, _ = w.wnext, p = w.window, g = w.hold, k = w.bits, F = w.lencode, R = w.distcode, A = (1 << w.lenbits) - 1, E = (1 << w.distbits) - 1;
  t:
    do {
      k < 15 && (g += H[i++] << k, k += 8, g += H[i++] << k, k += 8), b = F[g & A];
      e:
        for (; ; ) {
          if (y = b >>> 24, g >>>= y, k -= y, y = b >>> 16 & 255, y === 0)
            C[a++] = b & 65535;
          else if (y & 16) {
            S = b & 65535, y &= 15, y && (k < y && (g += H[i++] << k, k += 8), S += g & (1 << y) - 1, g >>>= y, k -= y), k < 15 && (g += H[i++] << k, k += 8, g += H[i++] << k, k += 8), b = R[g & E];
            n:
              for (; ; ) {
                if (y = b >>> 24, g >>>= y, k -= y, y = b >>> 16 & 255, y & 16) {
                  if (D = b & 65535, y &= 15, k < y && (g += H[i++] << k, k += 8, k < y && (g += H[i++] << k, k += 8)), D += g & (1 << y) - 1, D > f) {
                    e.msg = "invalid distance too far back", w.mode = fn;
                    break t;
                  }
                  if (g >>>= y, k -= y, y = a - s, D > y) {
                    if (y = D - y, y > u && w.sane) {
                      e.msg = "invalid distance too far back", w.mode = fn;
                      break t;
                    }
                    if (T = 0, z = p, _ === 0) {
                      if (T += c - y, y < S) {
                        S -= y;
                        do
                          C[a++] = p[T++];
                        while (--y);
                        T = a - D, z = C;
                      }
                    } else if (_ < y) {
                      if (T += c + _ - y, y -= _, y < S) {
                        S -= y;
                        do
                          C[a++] = p[T++];
                        while (--y);
                        if (T = 0, _ < S) {
                          y = _, S -= y;
                          do
                            C[a++] = p[T++];
                          while (--y);
                          T = a - D, z = C;
                        }
                      }
                    } else if (T += _ - y, y < S) {
                      S -= y;
                      do
                        C[a++] = p[T++];
                      while (--y);
                      T = a - D, z = C;
                    }
                    for (; S > 2; )
                      C[a++] = z[T++], C[a++] = z[T++], C[a++] = z[T++], S -= 3;
                    S && (C[a++] = z[T++], S > 1 && (C[a++] = z[T++]));
                  } else {
                    T = a - D;
                    do
                      C[a++] = C[T++], C[a++] = C[T++], C[a++] = C[T++], S -= 3;
                    while (S > 2);
                    S && (C[a++] = C[T++], S > 1 && (C[a++] = C[T++]));
                  }
                } else if ((y & 64) === 0) {
                  b = R[(b & 65535) + (g & (1 << y) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", w.mode = fn;
                  break t;
                }
                break;
              }
          } else if ((y & 64) === 0) {
            b = F[(b & 65535) + (g & (1 << y) - 1)];
            continue e;
          } else if (y & 32) {
            w.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", w.mode = fn;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  S = k >> 3, i -= S, k -= S << 3, g &= (1 << k) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), w.hold = g, w.bits = k;
};
const Se = 15, Mr = 852, Lr = 592, Or = 0, Yn = 1, Cr = 2, Kd = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), Yd = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), Jd = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), Qd = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), jd = (t, e, n, i, r, a, s, o) => {
  const f = o.bits;
  let c = 0, u = 0, _ = 0, p = 0, g = 0, k = 0, F = 0, R = 0, A = 0, E = 0, b, y, S, D, T, z = null, H;
  const C = new Uint16Array(Se + 1), w = new Uint16Array(Se + 1);
  let G = null, V, J, at;
  for (c = 0; c <= Se; c++)
    C[c] = 0;
  for (u = 0; u < i; u++)
    C[e[n + u]]++;
  for (g = f, p = Se; p >= 1 && C[p] === 0; p--)
    ;
  if (g > p && (g = p), p === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (_ = 1; _ < p && C[_] === 0; _++)
    ;
  for (g < _ && (g = _), R = 1, c = 1; c <= Se; c++)
    if (R <<= 1, R -= C[c], R < 0)
      return -1;
  if (R > 0 && (t === Or || p !== 1))
    return -1;
  for (w[1] = 0, c = 1; c < Se; c++)
    w[c + 1] = w[c] + C[c];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (s[w[e[n + u]]++] = u);
  if (t === Or ? (z = G = s, H = 20) : t === Yn ? (z = Kd, G = Yd, H = 257) : (z = Jd, G = Qd, H = 0), E = 0, u = 0, c = _, T = a, k = g, F = 0, S = -1, A = 1 << g, D = A - 1, t === Yn && A > Mr || t === Cr && A > Lr)
    return 1;
  for (; ; ) {
    V = c - F, s[u] + 1 < H ? (J = 0, at = s[u]) : s[u] >= H ? (J = G[s[u] - H], at = z[s[u] - H]) : (J = 96, at = 0), b = 1 << c - F, y = 1 << k, _ = y;
    do
      y -= b, r[T + (E >> F) + y] = V << 24 | J << 16 | at | 0;
    while (y !== 0);
    for (b = 1 << c - 1; E & b; )
      b >>= 1;
    if (b !== 0 ? (E &= b - 1, E += b) : E = 0, u++, --C[c] === 0) {
      if (c === p)
        break;
      c = e[n + s[u]];
    }
    if (c > g && (E & D) !== S) {
      for (F === 0 && (F = g), T += _, k = c - F, R = 1 << k; k + F < p && (R -= C[k + F], !(R <= 0)); )
        k++, R <<= 1;
      if (A += 1 << k, t === Yn && A > Mr || t === Cr && A > Lr)
        return 1;
      S = E & D, r[S] = g << 24 | k << 16 | T - a | 0;
    }
  }
  return E !== 0 && (r[T + E] = c - F << 24 | 64 << 16 | 0), o.bits = g, 0;
};
var We = jd;
const t0 = 0, Hs = 1, Vs = 2, {
  Z_FINISH: Fr,
  Z_BLOCK: e0,
  Z_TREES: un,
  Z_OK: Ee,
  Z_STREAM_END: n0,
  Z_NEED_DICT: i0,
  Z_STREAM_ERROR: Kt,
  Z_DATA_ERROR: Us,
  Z_MEM_ERROR: Gs,
  Z_BUF_ERROR: r0,
  Z_DEFLATED: Br
} = Bs, Un = 16180, zr = 16181, Pr = 16182, Hr = 16183, Vr = 16184, Ur = 16185, Gr = 16186, Zr = 16187, qr = 16188, Wr = 16189, On = 16190, oe = 16191, Jn = 16192, Xr = 16193, Qn = 16194, Kr = 16195, Yr = 16196, Jr = 16197, Qr = 16198, hn = 16199, dn = 16200, jr = 16201, ta = 16202, ea = 16203, na = 16204, ia = 16205, jn = 16206, ra = 16207, aa = 16208, It = 16209, Zs = 16210, qs = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, sa = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function c0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const $e = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Un || e.mode > qs ? 1 : 0;
}, Ws = (t) => {
  if ($e(t))
    return Kt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Un, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(a0), e.distcode = e.distdyn = new Int32Array(s0), e.sane = 1, e.back = -1, Ee;
}, Xs = (t) => {
  if ($e(t))
    return Kt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Ws(t);
}, Ks = (t, e) => {
  let n;
  if ($e(t))
    return Kt;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Kt : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, Xs(t));
}, Ys = (t, e) => {
  if (!t)
    return Kt;
  const n = new c0();
  t.state = n, n.strm = t, n.window = null, n.mode = Un;
  const i = Ks(t, e);
  return i !== Ee && (t.state = null), i;
}, f0 = (t) => Ys(t, l0);
let oa = !0, ti, ei;
const u0 = (t) => {
  if (oa) {
    ti = new Int32Array(512), ei = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (We(Hs, t.lens, 0, 288, ti, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    We(Vs, t.lens, 0, 32, ei, 0, t.work, { bits: 5 }), oa = !1;
  }
  t.lencode = ti, t.lenbits = 9, t.distcode = ei, t.distbits = 5;
}, Js = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, h0 = (t, e) => {
  let n, i, r, a, s, o, f, c, u, _, p, g, k, F, R = 0, A, E, b, y, S, D, T, z;
  const H = new Uint8Array(4);
  let C, w;
  const G = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if ($e(t) || !t.output || !t.input && t.avail_in !== 0)
    return Kt;
  n = t.state, n.mode === oe && (n.mode = Jn), s = t.next_out, r = t.output, f = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, c = n.hold, u = n.bits, _ = o, p = f, z = Ee;
  t:
    for (; ; )
      switch (n.mode) {
        case Un:
          if (n.wrap === 0) {
            n.mode = Jn;
            break;
          }
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.wrap & 2 && c === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, H[0] = c & 255, H[1] = c >>> 8 & 255, n.check = ee(n.check, H, 2, 0), c = 0, u = 0, n.mode = zr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((c & 255) << 8) + (c >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = It;
            break;
          }
          if ((c & 15) !== Br) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (c >>>= 4, u -= 4, T = (c & 15) + 8, n.wbits === 0 && (n.wbits = T), T > 15 || T > n.wbits) {
            t.msg = "invalid window size", n.mode = It;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = c & 512 ? Wr : oe, c = 0, u = 0;
          break;
        case zr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.flags = c, (n.flags & 255) !== Br) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = It;
            break;
          }
          n.head && (n.head.text = c >> 8 & 1), n.flags & 512 && n.wrap & 4 && (H[0] = c & 255, H[1] = c >>> 8 & 255, n.check = ee(n.check, H, 2, 0)), c = 0, u = 0, n.mode = Pr;
        /* falls through */
        case Pr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = c), n.flags & 512 && n.wrap & 4 && (H[0] = c & 255, H[1] = c >>> 8 & 255, H[2] = c >>> 16 & 255, H[3] = c >>> 24 & 255, n.check = ee(n.check, H, 4, 0)), c = 0, u = 0, n.mode = Hr;
        /* falls through */
        case Hr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = c & 255, n.head.os = c >> 8), n.flags & 512 && n.wrap & 4 && (H[0] = c & 255, H[1] = c >>> 8 & 255, n.check = ee(n.check, H, 2, 0)), c = 0, u = 0, n.mode = Vr;
        /* falls through */
        case Vr:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.length = c, n.head && (n.head.extra_len = c), n.flags & 512 && n.wrap & 4 && (H[0] = c & 255, H[1] = c >>> 8 & 255, n.check = ee(n.check, H, 2, 0)), c = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Ur;
        /* falls through */
        case Ur:
          if (n.flags & 1024 && (g = n.length, g > o && (g = o), g && (n.head && (T = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + g
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            T
          )), n.flags & 512 && n.wrap & 4 && (n.check = ee(n.check, i, g, a)), o -= g, a += g, n.length -= g), n.length))
            break t;
          n.length = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            g = 0;
            do
              T = i[a + g++], n.head && T && n.length < 65536 && (n.head.name += String.fromCharCode(T));
            while (T && g < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ee(n.check, i, g, a)), o -= g, a += g, T)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Zr;
        /* falls through */
        case Zr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            g = 0;
            do
              T = i[a + g++], n.head && T && n.length < 65536 && (n.head.comment += String.fromCharCode(T));
            while (T && g < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ee(n.check, i, g, a)), o -= g, a += g, T)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = qr;
        /* falls through */
        case qr:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = It;
              break;
            }
            c = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = oe;
          break;
        case Wr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          t.adler = n.check = sa(c), c = 0, u = 0, n.mode = On;
        /* falls through */
        case On:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, i0;
          t.adler = n.check = 1, n.mode = oe;
        /* falls through */
        case oe:
          if (e === e0 || e === un)
            break t;
        /* falls through */
        case Jn:
          if (n.last) {
            c >>>= u & 7, u -= u & 7, n.mode = jn;
            break;
          }
          for (; u < 3; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          switch (n.last = c & 1, c >>>= 1, u -= 1, c & 3) {
            case 0:
              n.mode = Xr;
              break;
            case 1:
              if (u0(n), n.mode = hn, e === un) {
                c >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = Yr;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = It;
          }
          c >>>= 2, u -= 2;
          break;
        case Xr:
          for (c >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if ((c & 65535) !== (c >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = It;
            break;
          }
          if (n.length = c & 65535, c = 0, u = 0, n.mode = Qn, e === un)
            break t;
        /* falls through */
        case Qn:
          n.mode = Kr;
        /* falls through */
        case Kr:
          if (g = n.length, g) {
            if (g > o && (g = o), g > f && (g = f), g === 0)
              break t;
            r.set(i.subarray(a, a + g), s), o -= g, a += g, f -= g, s += g, n.length -= g;
            break;
          }
          n.mode = oe;
          break;
        case Yr:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.nlen = (c & 31) + 257, c >>>= 5, u -= 5, n.ndist = (c & 31) + 1, c >>>= 5, u -= 5, n.ncode = (c & 15) + 4, c >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = It;
            break;
          }
          n.have = 0, n.mode = Jr;
        /* falls through */
        case Jr:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.lens[G[n.have++]] = c & 7, c >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[G[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, C = { bits: n.lenbits }, z = We(t0, n.lens, 0, 19, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid code lengths set", n.mode = It;
            break;
          }
          n.have = 0, n.mode = Qr;
        /* falls through */
        case Qr:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; R = n.lencode[c & (1 << n.lenbits) - 1], A = R >>> 24, E = R >>> 16 & 255, b = R & 65535, !(A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (b < 16)
              c >>>= A, u -= A, n.lens[n.have++] = b;
            else {
              if (b === 16) {
                for (w = A + 2; u < w; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                if (c >>>= A, u -= A, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = It;
                  break;
                }
                T = n.lens[n.have - 1], g = 3 + (c & 3), c >>>= 2, u -= 2;
              } else if (b === 17) {
                for (w = A + 3; u < w; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                c >>>= A, u -= A, T = 0, g = 3 + (c & 7), c >>>= 3, u -= 3;
              } else {
                for (w = A + 7; u < w; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                c >>>= A, u -= A, T = 0, g = 11 + (c & 127), c >>>= 7, u -= 7;
              }
              if (n.have + g > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = It;
                break;
              }
              for (; g--; )
                n.lens[n.have++] = T;
            }
          }
          if (n.mode === It)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = It;
            break;
          }
          if (n.lenbits = 9, C = { bits: n.lenbits }, z = We(Hs, n.lens, 0, n.nlen, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid literal/lengths set", n.mode = It;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, C = { bits: n.distbits }, z = We(Vs, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, C), n.distbits = C.bits, z) {
            t.msg = "invalid distances set", n.mode = It;
            break;
          }
          if (n.mode = hn, e === un)
            break t;
        /* falls through */
        case hn:
          n.mode = dn;
        /* falls through */
        case dn:
          if (o >= 6 && f >= 258) {
            t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, Xd(t, p), s = t.next_out, r = t.output, f = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, c = n.hold, u = n.bits, n.mode === oe && (n.back = -1);
            break;
          }
          for (n.back = 0; R = n.lencode[c & (1 << n.lenbits) - 1], A = R >>> 24, E = R >>> 16 & 255, b = R & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (E && (E & 240) === 0) {
            for (y = A, S = E, D = b; R = n.lencode[D + ((c & (1 << y + S) - 1) >> y)], A = R >>> 24, E = R >>> 16 & 255, b = R & 65535, !(y + A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            c >>>= y, u -= y, n.back += y;
          }
          if (c >>>= A, u -= A, n.back += A, n.length = b, E === 0) {
            n.mode = ia;
            break;
          }
          if (E & 32) {
            n.back = -1, n.mode = oe;
            break;
          }
          if (E & 64) {
            t.msg = "invalid literal/length code", n.mode = It;
            break;
          }
          n.extra = E & 15, n.mode = jr;
        /* falls through */
        case jr:
          if (n.extra) {
            for (w = n.extra; u < w; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.length += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = ta;
        /* falls through */
        case ta:
          for (; R = n.distcode[c & (1 << n.distbits) - 1], A = R >>> 24, E = R >>> 16 & 255, b = R & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if ((E & 240) === 0) {
            for (y = A, S = E, D = b; R = n.distcode[D + ((c & (1 << y + S) - 1) >> y)], A = R >>> 24, E = R >>> 16 & 255, b = R & 65535, !(y + A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            c >>>= y, u -= y, n.back += y;
          }
          if (c >>>= A, u -= A, n.back += A, E & 64) {
            t.msg = "invalid distance code", n.mode = It;
            break;
          }
          n.offset = b, n.extra = E & 15, n.mode = ea;
        /* falls through */
        case ea:
          if (n.extra) {
            for (w = n.extra; u < w; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.offset += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = It;
            break;
          }
          n.mode = na;
        /* falls through */
        case na:
          if (f === 0)
            break t;
          if (g = p - f, n.offset > g) {
            if (g = n.offset - g, g > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = It;
              break;
            }
            g > n.wnext ? (g -= n.wnext, k = n.wsize - g) : k = n.wnext - g, g > n.length && (g = n.length), F = n.window;
          } else
            F = r, k = s - n.offset, g = n.length;
          g > f && (g = f), f -= g, n.length -= g;
          do
            r[s++] = F[k++];
          while (--g);
          n.length === 0 && (n.mode = dn);
          break;
        case ia:
          if (f === 0)
            break t;
          r[s++] = n.length, f--, n.mode = dn;
          break;
        case jn:
          if (n.wrap) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c |= i[a++] << u, u += 8;
            }
            if (p -= f, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ee(n.check, r, p, s - p) : Di(n.check, r, p, s - p)), p = f, n.wrap & 4 && (n.flags ? c : sa(c)) !== n.check) {
              t.msg = "incorrect data check", n.mode = It;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = ra;
        /* falls through */
        case ra:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = It;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = aa;
        /* falls through */
        case aa:
          z = n0;
          break t;
        case It:
          z = Us;
          break t;
        case Zs:
          return Gs;
        case qs:
        /* falls through */
        default:
          return Kt;
      }
  return t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, (n.wsize || p !== t.avail_out && n.mode < It && (n.mode < jn || e !== Fr)) && Js(t, t.output, t.next_out, p - t.avail_out), _ -= t.avail_in, p -= t.avail_out, t.total_in += _, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ee(n.check, r, p, t.next_out - p) : Di(n.check, r, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === oe ? 128 : 0) + (n.mode === hn || n.mode === Qn ? 256 : 0), (_ === 0 && p === 0 || e === Fr) && z === Ee && (z = r0), z;
}, d0 = (t) => {
  if ($e(t))
    return Kt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ee;
}, p0 = (t, e) => {
  if ($e(t))
    return Kt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Kt : (n.head = e, e.done = !1, Ee);
}, _0 = (t, e) => {
  const n = e.length;
  let i, r, a;
  return $e(t) || (i = t.state, i.wrap !== 0 && i.mode !== On) ? Kt : i.mode === On && (r = 1, r = Di(r, e, n, 0), r !== i.check) ? Us : (a = Js(t, e, n, n), a ? (i.mode = Zs, Gs) : (i.havedict = 1, Ee));
};
var g0 = Xs, m0 = Ks, v0 = Ws, w0 = f0, y0 = Ys, x0 = h0, b0 = d0, k0 = p0, E0 = _0, T0 = "pako inflate (from Nodeca project)", le = {
  inflateReset: g0,
  inflateReset2: m0,
  inflateResetKeep: v0,
  inflateInit: w0,
  inflateInit2: y0,
  inflate: x0,
  inflateEnd: b0,
  inflateGetHeader: k0,
  inflateSetDictionary: E0,
  inflateInfo: T0
};
function $0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var S0 = $0;
const Qs = Object.prototype.toString, {
  Z_NO_FLUSH: A0,
  Z_FINISH: N0,
  Z_OK: Qe,
  Z_STREAM_END: ni,
  Z_NEED_DICT: ii,
  Z_STREAM_ERROR: I0,
  Z_DATA_ERROR: la,
  Z_MEM_ERROR: D0
} = Bs;
function Gn(t) {
  this.options = zs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new qd(), this.strm.avail_out = 0;
  let n = le.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== Qe)
    throw new Error(Ri[n]);
  if (this.header = new S0(), le.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Mi.string2buf(e.dictionary) : Qs.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = le.inflateSetDictionary(this.strm, e.dictionary), n !== Qe)))
    throw new Error(Ri[n]);
}
Gn.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? N0 : A0, Qs.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = le.inflate(n, s), a === ii && r && (a = le.inflateSetDictionary(n, r), a === Qe ? a = le.inflate(n, s) : a === la && (a = ii)); n.avail_in > 0 && a === ni && n.state.wrap > 0 && t[n.next_in] !== 0; )
      le.inflateReset(n), a = le.inflate(n, s);
    switch (a) {
      case I0:
      case la:
      case ii:
      case D0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === ni))
      if (this.options.to === "string") {
        let f = Mi.utf8border(n.output, n.next_out), c = n.next_out - f, u = Mi.buf2string(n.output, f);
        n.next_out = c, n.avail_out = i - c, c && n.output.set(n.output.subarray(f, f + c), 0), this.onData(u);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === Qe && o === 0)) {
      if (a === ni)
        return a = le.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
Gn.prototype.onData = function(t) {
  this.chunks.push(t);
};
Gn.prototype.onEnd = function(t) {
  t === Qe && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = zs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function R0(t, e) {
  const n = new Gn(e);
  if (n.push(t), n.err) throw n.msg || Ri[n.err];
  return n.result;
}
var M0 = R0, L0 = {
  inflate: M0
};
const { inflate: O0 } = L0;
var C0 = O0;
const F0 = { refName: "seq_id" }, B0 = { seq_id: "refName" };
class Cn {
  constructor(e, n, i) {
    this.ncFeature = e, this.uniqueId = i || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (F0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return B0[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((i) => new Cn(i, this)) : n;
  }
  /**
   * Get an array listing which data keys are present in this feature.
   */
  tags() {
    return this.ncFeature.tags().map((e) => this.jb1TagToJb2Tag(e));
  }
  /**
   * Get the unique ID of this feature.
   */
  id() {
    return this.uniqueId;
  }
  /**
   * Get this feature's parent feature, or undefined if none.
   */
  parent() {
    return this.parentHandle;
  }
  /**
   * Get an array of child features, or undefined if none.
   */
  children() {
    return this.get("subfeatures");
  }
  toJSON() {
    const e = { uniqueId: this.id(), subfeatures: [] };
    return this.ncFeature.tags().forEach((n) => {
      const i = this.jb1TagToJb2Tag(n), r = this.ncFeature.get(n);
      i === "subfeatures" ? e.children = (r || []).map(
        (a) => new Cn(a, this).toJSON()
      ) : e[i] = r;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function z0(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function P0(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return z0(new Uint8Array(n)) ? C0(n) : n;
}
async function Ep({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const i = new bd({
    urlTemplate: t,
    baseUrl: e,
    readFile: P0
  }), r = [];
  for await (const a of i.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    r.push(new Cn(a).toJSON());
  return r;
}
async function Tp({
  region: t,
  baseUrl: e,
  genome: n,
  track: i,
  extra: r = ".json?ignoreCache=true&flatten=false"
}) {
  const a = `${t.chromosome}:${t.start}..${t.end}`, s = `${e}/${encodeURI(n)}/${encodeURI(i)}/${encodeURIComponent(a)}${r}`, o = await fetch(s);
  if (!o.ok)
    throw new Error(`HTTP ${o.status} fetching ${s}`);
  return o.json();
}
const pn = {};
function ca(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class ve {
  constructor(e, n = {}) {
    this.baseOverrides = {}, this.url = e;
    const i = n.fetch || globalThis.fetch.bind(globalThis);
    n.overrides && (this.baseOverrides = n.overrides), this.fetchImplementation = i;
  }
  async fetch(e, n) {
    let i;
    try {
      i = await this.fetchImplementation(e, n);
    } catch (r) {
      if (`${r}`.includes("Failed to fetch")) {
        console.warn(`generic-filehandle: refetching ${e} to attempt to work around chrome CORS header caching bug`);
        try {
          i = await this.fetchImplementation(e, {
            ...n,
            cache: "reload"
          });
        } catch (a) {
          throw new Error(`${ca(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${ca(r)} fetching ${e}`, { cause: r });
    }
    return i;
  }
  async read(e, n, i = {}) {
    const { headers: r = {}, signal: a, overrides: s = {} } = i;
    e < 1 / 0 ? r.range = `bytes=${n}-${n + e}` : e === 1 / 0 && n !== 0 && (r.range = `bytes=${n}-`);
    const o = await this.fetch(this.url, {
      ...this.baseOverrides,
      ...s,
      headers: {
        ...r,
        ...s.headers,
        ...this.baseOverrides.headers
      },
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a
    });
    if (!o.ok)
      throw new Error(`HTTP ${o.status} fetching ${this.url}`);
    if (o.status === 200 && n === 0 || o.status === 206) {
      const f = await o.arrayBuffer(), c = o.headers.get("content-range"), u = /\/(\d+)$/.exec(c || "");
      return u?.[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(f.slice(0, e));
    }
    throw o.status === 200 ? new Error(`${this.url} fetch returned status 200, expected 206`) : new Error(`HTTP ${o.status} fetching ${this.url}`);
  }
  async readFile(e = {}) {
    let n, i;
    typeof e == "string" ? (n = e, i = {}) : (n = e.encoding, i = e, delete i.encoding);
    const { headers: r = {}, signal: a, overrides: s = {} } = i, o = await this.fetch(this.url, {
      headers: r,
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a,
      ...this.baseOverrides,
      ...s
    });
    if (o.status !== 200)
      throw new Error(`HTTP ${o.status} fetching ${this.url}`);
    if (n === "utf8")
      return o.text();
    if (n)
      throw new Error(`unsupported encoding: ${n}`);
    return new Uint8Array(await o.arrayBuffer());
  }
  async stat() {
    if (!this._stat && (await this.read(10, 0), !this._stat))
      throw new Error(`unable to determine size of file at ${this.url}`);
    return this._stat;
  }
  async close() {
  }
}
var ri = {}, fa;
function he() {
  return fa || (fa = 1, function(t) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function n(a, s) {
      return Object.prototype.hasOwnProperty.call(a, s);
    }
    t.assign = function(a) {
      for (var s = Array.prototype.slice.call(arguments, 1); s.length; ) {
        var o = s.shift();
        if (o) {
          if (typeof o != "object")
            throw new TypeError(o + "must be non-object");
          for (var f in o)
            n(o, f) && (a[f] = o[f]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, s) {
      return a.length === s ? a : a.subarray ? a.subarray(0, s) : (a.length = s, a);
    };
    var i = {
      arraySet: function(a, s, o, f, c) {
        if (s.subarray && a.subarray) {
          a.set(s.subarray(o, o + f), c);
          return;
        }
        for (var u = 0; u < f; u++)
          a[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, f, c, u, _;
        for (f = 0, s = 0, o = a.length; s < o; s++)
          f += a[s].length;
        for (_ = new Uint8Array(f), c = 0, s = 0, o = a.length; s < o; s++)
          u = a[s], _.set(u, c), c += u.length;
        return _;
      }
    }, r = {
      arraySet: function(a, s, o, f, c) {
        for (var u = 0; u < f; u++)
          a[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, r));
    }, t.setTyped(e);
  }(ri)), ri;
}
var Ae = {}, Yt = {}, pe = {}, ua;
function H0() {
  if (ua) return pe;
  ua = 1;
  var t = he(), e = 4, n = 0, i = 1, r = 2;
  function a(m) {
    for (var B = m.length; --B >= 0; )
      m[B] = 0;
  }
  var s = 0, o = 1, f = 2, c = 3, u = 258, _ = 29, p = 256, g = p + 1 + _, k = 30, F = 19, R = 2 * g + 1, A = 15, E = 16, b = 7, y = 256, S = 16, D = 17, T = 18, z = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), H = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), C = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = 512, V = new Array((g + 2) * 2);
  a(V);
  var J = new Array(k * 2);
  a(J);
  var at = new Array(G);
  a(at);
  var ct = new Array(u - c + 1);
  a(ct);
  var L = new Array(_);
  a(L);
  var nt = new Array(k);
  a(nt);
  function ot(m, B, O, W, x) {
    this.static_tree = m, this.extra_bits = B, this.extra_base = O, this.elems = W, this.max_length = x, this.has_stree = m && m.length;
  }
  var st, it, _t;
  function ut(m, B) {
    this.dyn_tree = m, this.max_code = 0, this.stat_desc = B;
  }
  function kt(m) {
    return m < 256 ? at[m] : at[256 + (m >>> 7)];
  }
  function Tt(m, B) {
    m.pending_buf[m.pending++] = B & 255, m.pending_buf[m.pending++] = B >>> 8 & 255;
  }
  function ft(m, B, O) {
    m.bi_valid > E - O ? (m.bi_buf |= B << m.bi_valid & 65535, Tt(m, m.bi_buf), m.bi_buf = B >> E - m.bi_valid, m.bi_valid += O - E) : (m.bi_buf |= B << m.bi_valid & 65535, m.bi_valid += O);
  }
  function ht(m, B, O) {
    ft(
      m,
      O[B * 2],
      O[B * 2 + 1]
      /*.Len*/
    );
  }
  function lt(m, B) {
    var O = 0;
    do
      O |= m & 1, m >>>= 1, O <<= 1;
    while (--B > 0);
    return O >>> 1;
  }
  function xt(m) {
    m.bi_valid === 16 ? (Tt(m, m.bi_buf), m.bi_buf = 0, m.bi_valid = 0) : m.bi_valid >= 8 && (m.pending_buf[m.pending++] = m.bi_buf & 255, m.bi_buf >>= 8, m.bi_valid -= 8);
  }
  function St(m, B) {
    var O = B.dyn_tree, W = B.max_code, x = B.stat_desc.static_tree, M = B.stat_desc.has_stree, h = B.stat_desc.extra_bits, P = B.stat_desc.extra_base, et = B.stat_desc.max_length, l, N, $, d, v, I, Q = 0;
    for (d = 0; d <= A; d++)
      m.bl_count[d] = 0;
    for (O[m.heap[m.heap_max] * 2 + 1] = 0, l = m.heap_max + 1; l < R; l++)
      N = m.heap[l], d = O[O[N * 2 + 1] * 2 + 1] + 1, d > et && (d = et, Q++), O[N * 2 + 1] = d, !(N > W) && (m.bl_count[d]++, v = 0, N >= P && (v = h[N - P]), I = O[N * 2], m.opt_len += I * (d + v), M && (m.static_len += I * (x[N * 2 + 1] + v)));
    if (Q !== 0) {
      do {
        for (d = et - 1; m.bl_count[d] === 0; )
          d--;
        m.bl_count[d]--, m.bl_count[d + 1] += 2, m.bl_count[et]--, Q -= 2;
      } while (Q > 0);
      for (d = et; d !== 0; d--)
        for (N = m.bl_count[d]; N !== 0; )
          $ = m.heap[--l], !($ > W) && (O[$ * 2 + 1] !== d && (m.opt_len += (d - O[$ * 2 + 1]) * O[$ * 2], O[$ * 2 + 1] = d), N--);
    }
  }
  function At(m, B, O) {
    var W = new Array(A + 1), x = 0, M, h;
    for (M = 1; M <= A; M++)
      W[M] = x = x + O[M - 1] << 1;
    for (h = 0; h <= B; h++) {
      var P = m[h * 2 + 1];
      P !== 0 && (m[h * 2] = lt(W[P]++, P));
    }
  }
  function rt() {
    var m, B, O, W, x, M = new Array(A + 1);
    for (O = 0, W = 0; W < _ - 1; W++)
      for (L[W] = O, m = 0; m < 1 << z[W]; m++)
        ct[O++] = W;
    for (ct[O - 1] = W, x = 0, W = 0; W < 16; W++)
      for (nt[W] = x, m = 0; m < 1 << H[W]; m++)
        at[x++] = W;
    for (x >>= 7; W < k; W++)
      for (nt[W] = x << 7, m = 0; m < 1 << H[W] - 7; m++)
        at[256 + x++] = W;
    for (B = 0; B <= A; B++)
      M[B] = 0;
    for (m = 0; m <= 143; )
      V[m * 2 + 1] = 8, m++, M[8]++;
    for (; m <= 255; )
      V[m * 2 + 1] = 9, m++, M[9]++;
    for (; m <= 279; )
      V[m * 2 + 1] = 7, m++, M[7]++;
    for (; m <= 287; )
      V[m * 2 + 1] = 8, m++, M[8]++;
    for (At(V, g + 1, M), m = 0; m < k; m++)
      J[m * 2 + 1] = 5, J[m * 2] = lt(m, 5);
    st = new ot(V, z, p + 1, g, A), it = new ot(J, H, 0, k, A), _t = new ot(new Array(0), C, 0, F, b);
  }
  function Z(m) {
    var B;
    for (B = 0; B < g; B++)
      m.dyn_ltree[B * 2] = 0;
    for (B = 0; B < k; B++)
      m.dyn_dtree[B * 2] = 0;
    for (B = 0; B < F; B++)
      m.bl_tree[B * 2] = 0;
    m.dyn_ltree[y * 2] = 1, m.opt_len = m.static_len = 0, m.last_lit = m.matches = 0;
  }
  function bt(m) {
    m.bi_valid > 8 ? Tt(m, m.bi_buf) : m.bi_valid > 0 && (m.pending_buf[m.pending++] = m.bi_buf), m.bi_buf = 0, m.bi_valid = 0;
  }
  function yt(m, B, O, W) {
    bt(m), Tt(m, O), Tt(m, ~O), t.arraySet(m.pending_buf, m.window, B, O, m.pending), m.pending += O;
  }
  function Et(m, B, O, W) {
    var x = B * 2, M = O * 2;
    return m[x] < m[M] || m[x] === m[M] && W[B] <= W[O];
  }
  function wt(m, B, O) {
    for (var W = m.heap[O], x = O << 1; x <= m.heap_len && (x < m.heap_len && Et(B, m.heap[x + 1], m.heap[x], m.depth) && x++, !Et(B, W, m.heap[x], m.depth)); )
      m.heap[O] = m.heap[x], O = x, x <<= 1;
    m.heap[O] = W;
  }
  function U(m, B, O) {
    var W, x, M = 0, h, P;
    if (m.last_lit !== 0)
      do
        W = m.pending_buf[m.d_buf + M * 2] << 8 | m.pending_buf[m.d_buf + M * 2 + 1], x = m.pending_buf[m.l_buf + M], M++, W === 0 ? ht(m, x, B) : (h = ct[x], ht(m, h + p + 1, B), P = z[h], P !== 0 && (x -= L[h], ft(m, x, P)), W--, h = kt(W), ht(m, h, O), P = H[h], P !== 0 && (W -= nt[h], ft(m, W, P)));
      while (M < m.last_lit);
    ht(m, y, B);
  }
  function Nt(m, B) {
    var O = B.dyn_tree, W = B.stat_desc.static_tree, x = B.stat_desc.has_stree, M = B.stat_desc.elems, h, P, et = -1, l;
    for (m.heap_len = 0, m.heap_max = R, h = 0; h < M; h++)
      O[h * 2] !== 0 ? (m.heap[++m.heap_len] = et = h, m.depth[h] = 0) : O[h * 2 + 1] = 0;
    for (; m.heap_len < 2; )
      l = m.heap[++m.heap_len] = et < 2 ? ++et : 0, O[l * 2] = 1, m.depth[l] = 0, m.opt_len--, x && (m.static_len -= W[l * 2 + 1]);
    for (B.max_code = et, h = m.heap_len >> 1; h >= 1; h--)
      wt(m, O, h);
    l = M;
    do
      h = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[
        1
        /*SMALLEST*/
      ] = m.heap[m.heap_len--], wt(
        m,
        O,
        1
        /*SMALLEST*/
      ), P = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[--m.heap_max] = h, m.heap[--m.heap_max] = P, O[l * 2] = O[h * 2] + O[P * 2], m.depth[l] = (m.depth[h] >= m.depth[P] ? m.depth[h] : m.depth[P]) + 1, O[h * 2 + 1] = O[P * 2 + 1] = l, m.heap[
        1
        /*SMALLEST*/
      ] = l++, wt(
        m,
        O,
        1
        /*SMALLEST*/
      );
    while (m.heap_len >= 2);
    m.heap[--m.heap_max] = m.heap[
      1
      /*SMALLEST*/
    ], St(m, B), At(O, et, m.bl_count);
  }
  function zt(m, B, O) {
    var W, x = -1, M, h = B[0 * 2 + 1], P = 0, et = 7, l = 4;
    for (h === 0 && (et = 138, l = 3), B[(O + 1) * 2 + 1] = 65535, W = 0; W <= O; W++)
      M = h, h = B[(W + 1) * 2 + 1], !(++P < et && M === h) && (P < l ? m.bl_tree[M * 2] += P : M !== 0 ? (M !== x && m.bl_tree[M * 2]++, m.bl_tree[S * 2]++) : P <= 10 ? m.bl_tree[D * 2]++ : m.bl_tree[T * 2]++, P = 0, x = M, h === 0 ? (et = 138, l = 3) : M === h ? (et = 6, l = 3) : (et = 7, l = 4));
  }
  function Ft(m, B, O) {
    var W, x = -1, M, h = B[0 * 2 + 1], P = 0, et = 7, l = 4;
    for (h === 0 && (et = 138, l = 3), W = 0; W <= O; W++)
      if (M = h, h = B[(W + 1) * 2 + 1], !(++P < et && M === h)) {
        if (P < l)
          do
            ht(m, M, m.bl_tree);
          while (--P !== 0);
        else M !== 0 ? (M !== x && (ht(m, M, m.bl_tree), P--), ht(m, S, m.bl_tree), ft(m, P - 3, 2)) : P <= 10 ? (ht(m, D, m.bl_tree), ft(m, P - 3, 3)) : (ht(m, T, m.bl_tree), ft(m, P - 11, 7));
        P = 0, x = M, h === 0 ? (et = 138, l = 3) : M === h ? (et = 6, l = 3) : (et = 7, l = 4);
      }
  }
  function $t(m) {
    var B;
    for (zt(m, m.dyn_ltree, m.l_desc.max_code), zt(m, m.dyn_dtree, m.d_desc.max_code), Nt(m, m.bl_desc), B = F - 1; B >= 3 && m.bl_tree[w[B] * 2 + 1] === 0; B--)
      ;
    return m.opt_len += 3 * (B + 1) + 5 + 5 + 4, B;
  }
  function Zt(m, B, O, W) {
    var x;
    for (ft(m, B - 257, 5), ft(m, O - 1, 5), ft(m, W - 4, 4), x = 0; x < W; x++)
      ft(m, m.bl_tree[w[x] * 2 + 1], 3);
    Ft(m, m.dyn_ltree, B - 1), Ft(m, m.dyn_dtree, O - 1);
  }
  function Dt(m) {
    var B = 4093624447, O;
    for (O = 0; O <= 31; O++, B >>>= 1)
      if (B & 1 && m.dyn_ltree[O * 2] !== 0)
        return n;
    if (m.dyn_ltree[9 * 2] !== 0 || m.dyn_ltree[10 * 2] !== 0 || m.dyn_ltree[13 * 2] !== 0)
      return i;
    for (O = 32; O < p; O++)
      if (m.dyn_ltree[O * 2] !== 0)
        return i;
    return n;
  }
  var q = !1;
  function gt(m) {
    q || (rt(), q = !0), m.l_desc = new ut(m.dyn_ltree, st), m.d_desc = new ut(m.dyn_dtree, it), m.bl_desc = new ut(m.bl_tree, _t), m.bi_buf = 0, m.bi_valid = 0, Z(m);
  }
  function tt(m, B, O, W) {
    ft(m, (s << 1) + (W ? 1 : 0), 3), yt(m, B, O);
  }
  function dt(m) {
    ft(m, o << 1, 3), ht(m, y, V), xt(m);
  }
  function j(m, B, O, W) {
    var x, M, h = 0;
    m.level > 0 ? (m.strm.data_type === r && (m.strm.data_type = Dt(m)), Nt(m, m.l_desc), Nt(m, m.d_desc), h = $t(m), x = m.opt_len + 3 + 7 >>> 3, M = m.static_len + 3 + 7 >>> 3, M <= x && (x = M)) : x = M = O + 5, O + 4 <= x && B !== -1 ? tt(m, B, O, W) : m.strategy === e || M === x ? (ft(m, (o << 1) + (W ? 1 : 0), 3), U(m, V, J)) : (ft(m, (f << 1) + (W ? 1 : 0), 3), Zt(m, m.l_desc.max_code + 1, m.d_desc.max_code + 1, h + 1), U(m, m.dyn_ltree, m.dyn_dtree)), Z(m), W && bt(m);
  }
  function K(m, B, O) {
    return m.pending_buf[m.d_buf + m.last_lit * 2] = B >>> 8 & 255, m.pending_buf[m.d_buf + m.last_lit * 2 + 1] = B & 255, m.pending_buf[m.l_buf + m.last_lit] = O & 255, m.last_lit++, B === 0 ? m.dyn_ltree[O * 2]++ : (m.matches++, B--, m.dyn_ltree[(ct[O] + p + 1) * 2]++, m.dyn_dtree[kt(B) * 2]++), m.last_lit === m.lit_bufsize - 1;
  }
  return pe._tr_init = gt, pe._tr_stored_block = tt, pe._tr_flush_block = j, pe._tr_tally = K, pe._tr_align = dt, pe;
}
var ai, ha;
function js() {
  if (ha) return ai;
  ha = 1;
  function t(e, n, i, r) {
    for (var a = e & 65535 | 0, s = e >>> 16 & 65535 | 0, o = 0; i !== 0; ) {
      o = i > 2e3 ? 2e3 : i, i -= o;
      do
        a = a + n[r++] | 0, s = s + a | 0;
      while (--o);
      a %= 65521, s %= 65521;
    }
    return a | s << 16 | 0;
  }
  return ai = t, ai;
}
var si, da;
function to() {
  if (da) return si;
  da = 1;
  function t() {
    for (var i, r = [], a = 0; a < 256; a++) {
      i = a;
      for (var s = 0; s < 8; s++)
        i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
      r[a] = i;
    }
    return r;
  }
  var e = t();
  function n(i, r, a, s) {
    var o = e, f = s + a;
    i ^= -1;
    for (var c = s; c < f; c++)
      i = i >>> 8 ^ o[(i ^ r[c]) & 255];
    return i ^ -1;
  }
  return si = n, si;
}
var oi, pa;
function ji() {
  return pa || (pa = 1, oi = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  }), oi;
}
var _a;
function V0() {
  if (_a) return Yt;
  _a = 1;
  var t = he(), e = H0(), n = js(), i = to(), r = ji(), a = 0, s = 1, o = 3, f = 4, c = 5, u = 0, _ = 1, p = -2, g = -3, k = -5, F = -1, R = 1, A = 2, E = 3, b = 4, y = 0, S = 2, D = 8, T = 9, z = 15, H = 8, C = 29, w = 256, G = w + 1 + C, V = 30, J = 19, at = 2 * G + 1, ct = 15, L = 3, nt = 258, ot = nt + L + 1, st = 32, it = 42, _t = 69, ut = 73, kt = 91, Tt = 103, ft = 113, ht = 666, lt = 1, xt = 2, St = 3, At = 4, rt = 3;
  function Z(l, N) {
    return l.msg = r[N], N;
  }
  function bt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function yt(l) {
    for (var N = l.length; --N >= 0; )
      l[N] = 0;
  }
  function Et(l) {
    var N = l.state, $ = N.pending;
    $ > l.avail_out && ($ = l.avail_out), $ !== 0 && (t.arraySet(l.output, N.pending_buf, N.pending_out, $, l.next_out), l.next_out += $, N.pending_out += $, l.total_out += $, l.avail_out -= $, N.pending -= $, N.pending === 0 && (N.pending_out = 0));
  }
  function wt(l, N) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, N), l.block_start = l.strstart, Et(l.strm);
  }
  function U(l, N) {
    l.pending_buf[l.pending++] = N;
  }
  function Nt(l, N) {
    l.pending_buf[l.pending++] = N >>> 8 & 255, l.pending_buf[l.pending++] = N & 255;
  }
  function zt(l, N, $, d) {
    var v = l.avail_in;
    return v > d && (v = d), v === 0 ? 0 : (l.avail_in -= v, t.arraySet(N, l.input, l.next_in, v, $), l.state.wrap === 1 ? l.adler = n(l.adler, N, v, $) : l.state.wrap === 2 && (l.adler = i(l.adler, N, v, $)), l.next_in += v, l.total_in += v, v);
  }
  function Ft(l, N) {
    var $ = l.max_chain_length, d = l.strstart, v, I, Q = l.prev_length, X = l.nice_match, Y = l.strstart > l.w_size - ot ? l.strstart - (l.w_size - ot) : 0, mt = l.window, re = l.w_mask, Rt = l.prev, vt = l.strstart + nt, Ct = mt[d + Q - 1], Pt = mt[d + Q];
    l.prev_length >= l.good_match && ($ >>= 2), X > l.lookahead && (X = l.lookahead);
    do
      if (v = N, !(mt[v + Q] !== Pt || mt[v + Q - 1] !== Ct || mt[v] !== mt[d] || mt[++v] !== mt[d + 1])) {
        d += 2, v++;
        do
          ;
        while (mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && mt[++d] === mt[++v] && d < vt);
        if (I = nt - (vt - d), d = vt - nt, I > Q) {
          if (l.match_start = N, Q = I, I >= X)
            break;
          Ct = mt[d + Q - 1], Pt = mt[d + Q];
        }
      }
    while ((N = Rt[N & re]) > Y && --$ !== 0);
    return Q <= l.lookahead ? Q : l.lookahead;
  }
  function $t(l) {
    var N = l.w_size, $, d, v, I, Q;
    do {
      if (I = l.window_size - l.lookahead - l.strstart, l.strstart >= N + (N - ot)) {
        t.arraySet(l.window, l.window, N, N, 0), l.match_start -= N, l.strstart -= N, l.block_start -= N, d = l.hash_size, $ = d;
        do
          v = l.head[--$], l.head[$] = v >= N ? v - N : 0;
        while (--d);
        d = N, $ = d;
        do
          v = l.prev[--$], l.prev[$] = v >= N ? v - N : 0;
        while (--d);
        I += N;
      }
      if (l.strm.avail_in === 0)
        break;
      if (d = zt(l.strm, l.window, l.strstart + l.lookahead, I), l.lookahead += d, l.lookahead + l.insert >= L)
        for (Q = l.strstart - l.insert, l.ins_h = l.window[Q], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[Q + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[Q + L - 1]) & l.hash_mask, l.prev[Q & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = Q, Q++, l.insert--, !(l.lookahead + l.insert < L)); )
          ;
    } while (l.lookahead < ot && l.strm.avail_in !== 0);
  }
  function Zt(l, N) {
    var $ = 65535;
    for ($ > l.pending_buf_size - 5 && ($ = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if ($t(l), l.lookahead === 0 && N === a)
          return lt;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var d = l.block_start + $;
      if ((l.strstart === 0 || l.strstart >= d) && (l.lookahead = l.strstart - d, l.strstart = d, wt(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - ot && (wt(l, !1), l.strm.avail_out === 0))
        return lt;
    }
    return l.insert = 0, N === f ? (wt(l, !0), l.strm.avail_out === 0 ? St : At) : (l.strstart > l.block_start && (wt(l, !1), l.strm.avail_out === 0), lt);
  }
  function Dt(l, N) {
    for (var $, d; ; ) {
      if (l.lookahead < ot) {
        if ($t(l), l.lookahead < ot && N === a)
          return lt;
        if (l.lookahead === 0)
          break;
      }
      if ($ = 0, l.lookahead >= L && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + L - 1]) & l.hash_mask, $ = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), $ !== 0 && l.strstart - $ <= l.w_size - ot && (l.match_length = Ft(l, $)), l.match_length >= L)
        if (d = e._tr_tally(l, l.strstart - l.match_start, l.match_length - L), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= L) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + L - 1]) & l.hash_mask, $ = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        d = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (d && (wt(l, !1), l.strm.avail_out === 0))
        return lt;
    }
    return l.insert = l.strstart < L - 1 ? l.strstart : L - 1, N === f ? (wt(l, !0), l.strm.avail_out === 0 ? St : At) : l.last_lit && (wt(l, !1), l.strm.avail_out === 0) ? lt : xt;
  }
  function q(l, N) {
    for (var $, d, v; ; ) {
      if (l.lookahead < ot) {
        if ($t(l), l.lookahead < ot && N === a)
          return lt;
        if (l.lookahead === 0)
          break;
      }
      if ($ = 0, l.lookahead >= L && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + L - 1]) & l.hash_mask, $ = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = L - 1, $ !== 0 && l.prev_length < l.max_lazy_match && l.strstart - $ <= l.w_size - ot && (l.match_length = Ft(l, $), l.match_length <= 5 && (l.strategy === R || l.match_length === L && l.strstart - l.match_start > 4096) && (l.match_length = L - 1)), l.prev_length >= L && l.match_length <= l.prev_length) {
        v = l.strstart + l.lookahead - L, d = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - L), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= v && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + L - 1]) & l.hash_mask, $ = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = L - 1, l.strstart++, d && (wt(l, !1), l.strm.avail_out === 0))
          return lt;
      } else if (l.match_available) {
        if (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), d && wt(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return lt;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < L - 1 ? l.strstart : L - 1, N === f ? (wt(l, !0), l.strm.avail_out === 0 ? St : At) : l.last_lit && (wt(l, !1), l.strm.avail_out === 0) ? lt : xt;
  }
  function gt(l, N) {
    for (var $, d, v, I, Q = l.window; ; ) {
      if (l.lookahead <= nt) {
        if ($t(l), l.lookahead <= nt && N === a)
          return lt;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= L && l.strstart > 0 && (v = l.strstart - 1, d = Q[v], d === Q[++v] && d === Q[++v] && d === Q[++v])) {
        I = l.strstart + nt;
        do
          ;
        while (d === Q[++v] && d === Q[++v] && d === Q[++v] && d === Q[++v] && d === Q[++v] && d === Q[++v] && d === Q[++v] && d === Q[++v] && v < I);
        l.match_length = nt - (I - v), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= L ? ($ = e._tr_tally(l, 1, l.match_length - L), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : ($ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), $ && (wt(l, !1), l.strm.avail_out === 0))
        return lt;
    }
    return l.insert = 0, N === f ? (wt(l, !0), l.strm.avail_out === 0 ? St : At) : l.last_lit && (wt(l, !1), l.strm.avail_out === 0) ? lt : xt;
  }
  function tt(l, N) {
    for (var $; ; ) {
      if (l.lookahead === 0 && ($t(l), l.lookahead === 0)) {
        if (N === a)
          return lt;
        break;
      }
      if (l.match_length = 0, $ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, $ && (wt(l, !1), l.strm.avail_out === 0))
        return lt;
    }
    return l.insert = 0, N === f ? (wt(l, !0), l.strm.avail_out === 0 ? St : At) : l.last_lit && (wt(l, !1), l.strm.avail_out === 0) ? lt : xt;
  }
  function dt(l, N, $, d, v) {
    this.good_length = l, this.max_lazy = N, this.nice_length = $, this.max_chain = d, this.func = v;
  }
  var j;
  j = [
    /*      good lazy nice chain */
    new dt(0, 0, 0, 0, Zt),
    /* 0 store only */
    new dt(4, 4, 8, 4, Dt),
    /* 1 max speed, no lazy matches */
    new dt(4, 5, 16, 8, Dt),
    /* 2 */
    new dt(4, 6, 32, 32, Dt),
    /* 3 */
    new dt(4, 4, 16, 16, q),
    /* 4 lazy matches */
    new dt(8, 16, 32, 32, q),
    /* 5 */
    new dt(8, 16, 128, 128, q),
    /* 6 */
    new dt(8, 32, 128, 256, q),
    /* 7 */
    new dt(32, 128, 258, 1024, q),
    /* 8 */
    new dt(32, 258, 258, 4096, q)
    /* 9 max compression */
  ];
  function K(l) {
    l.window_size = 2 * l.w_size, yt(l.head), l.max_lazy_match = j[l.level].max_lazy, l.good_match = j[l.level].good_length, l.nice_match = j[l.level].nice_length, l.max_chain_length = j[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = L - 1, l.match_available = 0, l.ins_h = 0;
  }
  function m() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = D, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(at * 2), this.dyn_dtree = new t.Buf16((2 * V + 1) * 2), this.bl_tree = new t.Buf16((2 * J + 1) * 2), yt(this.dyn_ltree), yt(this.dyn_dtree), yt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ct + 1), this.heap = new t.Buf16(2 * G + 1), yt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * G + 1), yt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function B(l) {
    var N;
    return !l || !l.state ? Z(l, p) : (l.total_in = l.total_out = 0, l.data_type = S, N = l.state, N.pending = 0, N.pending_out = 0, N.wrap < 0 && (N.wrap = -N.wrap), N.status = N.wrap ? it : ft, l.adler = N.wrap === 2 ? 0 : 1, N.last_flush = a, e._tr_init(N), u);
  }
  function O(l) {
    var N = B(l);
    return N === u && K(l.state), N;
  }
  function W(l, N) {
    return !l || !l.state || l.state.wrap !== 2 ? p : (l.state.gzhead = N, u);
  }
  function x(l, N, $, d, v, I) {
    if (!l)
      return p;
    var Q = 1;
    if (N === F && (N = 6), d < 0 ? (Q = 0, d = -d) : d > 15 && (Q = 2, d -= 16), v < 1 || v > T || $ !== D || d < 8 || d > 15 || N < 0 || N > 9 || I < 0 || I > b)
      return Z(l, p);
    d === 8 && (d = 9);
    var X = new m();
    return l.state = X, X.strm = l, X.wrap = Q, X.gzhead = null, X.w_bits = d, X.w_size = 1 << X.w_bits, X.w_mask = X.w_size - 1, X.hash_bits = v + 7, X.hash_size = 1 << X.hash_bits, X.hash_mask = X.hash_size - 1, X.hash_shift = ~~((X.hash_bits + L - 1) / L), X.window = new t.Buf8(X.w_size * 2), X.head = new t.Buf16(X.hash_size), X.prev = new t.Buf16(X.w_size), X.lit_bufsize = 1 << v + 6, X.pending_buf_size = X.lit_bufsize * 4, X.pending_buf = new t.Buf8(X.pending_buf_size), X.d_buf = 1 * X.lit_bufsize, X.l_buf = 3 * X.lit_bufsize, X.level = N, X.strategy = I, X.method = $, O(l);
  }
  function M(l, N) {
    return x(l, N, D, z, H, y);
  }
  function h(l, N) {
    var $, d, v, I;
    if (!l || !l.state || N > c || N < 0)
      return l ? Z(l, p) : p;
    if (d = l.state, !l.output || !l.input && l.avail_in !== 0 || d.status === ht && N !== f)
      return Z(l, l.avail_out === 0 ? k : p);
    if (d.strm = l, $ = d.last_flush, d.last_flush = N, d.status === it)
      if (d.wrap === 2)
        l.adler = 0, U(d, 31), U(d, 139), U(d, 8), d.gzhead ? (U(
          d,
          (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)
        ), U(d, d.gzhead.time & 255), U(d, d.gzhead.time >> 8 & 255), U(d, d.gzhead.time >> 16 & 255), U(d, d.gzhead.time >> 24 & 255), U(d, d.level === 9 ? 2 : d.strategy >= A || d.level < 2 ? 4 : 0), U(d, d.gzhead.os & 255), d.gzhead.extra && d.gzhead.extra.length && (U(d, d.gzhead.extra.length & 255), U(d, d.gzhead.extra.length >> 8 & 255)), d.gzhead.hcrc && (l.adler = i(l.adler, d.pending_buf, d.pending, 0)), d.gzindex = 0, d.status = _t) : (U(d, 0), U(d, 0), U(d, 0), U(d, 0), U(d, 0), U(d, d.level === 9 ? 2 : d.strategy >= A || d.level < 2 ? 4 : 0), U(d, rt), d.status = ft);
      else {
        var Q = D + (d.w_bits - 8 << 4) << 8, X = -1;
        d.strategy >= A || d.level < 2 ? X = 0 : d.level < 6 ? X = 1 : d.level === 6 ? X = 2 : X = 3, Q |= X << 6, d.strstart !== 0 && (Q |= st), Q += 31 - Q % 31, d.status = ft, Nt(d, Q), d.strstart !== 0 && (Nt(d, l.adler >>> 16), Nt(d, l.adler & 65535)), l.adler = 1;
      }
    if (d.status === _t)
      if (d.gzhead.extra) {
        for (v = d.pending; d.gzindex < (d.gzhead.extra.length & 65535) && !(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), Et(l), v = d.pending, d.pending === d.pending_buf_size)); )
          U(d, d.gzhead.extra[d.gzindex] & 255), d.gzindex++;
        d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), d.gzindex === d.gzhead.extra.length && (d.gzindex = 0, d.status = ut);
      } else
        d.status = ut;
    if (d.status === ut)
      if (d.gzhead.name) {
        v = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), Et(l), v = d.pending, d.pending === d.pending_buf_size)) {
            I = 1;
            break;
          }
          d.gzindex < d.gzhead.name.length ? I = d.gzhead.name.charCodeAt(d.gzindex++) & 255 : I = 0, U(d, I);
        } while (I !== 0);
        d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), I === 0 && (d.gzindex = 0, d.status = kt);
      } else
        d.status = kt;
    if (d.status === kt)
      if (d.gzhead.comment) {
        v = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), Et(l), v = d.pending, d.pending === d.pending_buf_size)) {
            I = 1;
            break;
          }
          d.gzindex < d.gzhead.comment.length ? I = d.gzhead.comment.charCodeAt(d.gzindex++) & 255 : I = 0, U(d, I);
        } while (I !== 0);
        d.gzhead.hcrc && d.pending > v && (l.adler = i(l.adler, d.pending_buf, d.pending - v, v)), I === 0 && (d.status = Tt);
      } else
        d.status = Tt;
    if (d.status === Tt && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && Et(l), d.pending + 2 <= d.pending_buf_size && (U(d, l.adler & 255), U(d, l.adler >> 8 & 255), l.adler = 0, d.status = ft)) : d.status = ft), d.pending !== 0) {
      if (Et(l), l.avail_out === 0)
        return d.last_flush = -1, u;
    } else if (l.avail_in === 0 && bt(N) <= bt($) && N !== f)
      return Z(l, k);
    if (d.status === ht && l.avail_in !== 0)
      return Z(l, k);
    if (l.avail_in !== 0 || d.lookahead !== 0 || N !== a && d.status !== ht) {
      var Y = d.strategy === A ? tt(d, N) : d.strategy === E ? gt(d, N) : j[d.level].func(d, N);
      if ((Y === St || Y === At) && (d.status = ht), Y === lt || Y === St)
        return l.avail_out === 0 && (d.last_flush = -1), u;
      if (Y === xt && (N === s ? e._tr_align(d) : N !== c && (e._tr_stored_block(d, 0, 0, !1), N === o && (yt(d.head), d.lookahead === 0 && (d.strstart = 0, d.block_start = 0, d.insert = 0))), Et(l), l.avail_out === 0))
        return d.last_flush = -1, u;
    }
    return N !== f ? u : d.wrap <= 0 ? _ : (d.wrap === 2 ? (U(d, l.adler & 255), U(d, l.adler >> 8 & 255), U(d, l.adler >> 16 & 255), U(d, l.adler >> 24 & 255), U(d, l.total_in & 255), U(d, l.total_in >> 8 & 255), U(d, l.total_in >> 16 & 255), U(d, l.total_in >> 24 & 255)) : (Nt(d, l.adler >>> 16), Nt(d, l.adler & 65535)), Et(l), d.wrap > 0 && (d.wrap = -d.wrap), d.pending !== 0 ? u : _);
  }
  function P(l) {
    var N;
    return !l || !l.state ? p : (N = l.state.status, N !== it && N !== _t && N !== ut && N !== kt && N !== Tt && N !== ft && N !== ht ? Z(l, p) : (l.state = null, N === ft ? Z(l, g) : u));
  }
  function et(l, N) {
    var $ = N.length, d, v, I, Q, X, Y, mt, re;
    if (!l || !l.state || (d = l.state, Q = d.wrap, Q === 2 || Q === 1 && d.status !== it || d.lookahead))
      return p;
    for (Q === 1 && (l.adler = n(l.adler, N, $, 0)), d.wrap = 0, $ >= d.w_size && (Q === 0 && (yt(d.head), d.strstart = 0, d.block_start = 0, d.insert = 0), re = new t.Buf8(d.w_size), t.arraySet(re, N, $ - d.w_size, d.w_size, 0), N = re, $ = d.w_size), X = l.avail_in, Y = l.next_in, mt = l.input, l.avail_in = $, l.next_in = 0, l.input = N, $t(d); d.lookahead >= L; ) {
      v = d.strstart, I = d.lookahead - (L - 1);
      do
        d.ins_h = (d.ins_h << d.hash_shift ^ d.window[v + L - 1]) & d.hash_mask, d.prev[v & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = v, v++;
      while (--I);
      d.strstart = v, d.lookahead = L - 1, $t(d);
    }
    return d.strstart += d.lookahead, d.block_start = d.strstart, d.insert = d.lookahead, d.lookahead = 0, d.match_length = d.prev_length = L - 1, d.match_available = 0, l.next_in = Y, l.input = mt, l.avail_in = X, d.wrap = Q, u;
  }
  return Yt.deflateInit = M, Yt.deflateInit2 = x, Yt.deflateReset = O, Yt.deflateResetKeep = B, Yt.deflateSetHeader = W, Yt.deflate = h, Yt.deflateEnd = P, Yt.deflateSetDictionary = et, Yt.deflateInfo = "pako deflate (from Nodeca project)", Yt;
}
var _e = {}, ga;
function eo() {
  if (ga) return _e;
  ga = 1;
  var t = he(), e = !0, n = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    e = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    n = !1;
  }
  for (var i = new t.Buf8(256), r = 0; r < 256; r++)
    i[r] = r >= 252 ? 6 : r >= 248 ? 5 : r >= 240 ? 4 : r >= 224 ? 3 : r >= 192 ? 2 : 1;
  i[254] = i[254] = 1, _e.string2buf = function(s) {
    var o, f, c, u, _, p = s.length, g = 0;
    for (u = 0; u < p; u++)
      f = s.charCodeAt(u), (f & 64512) === 55296 && u + 1 < p && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (f = 65536 + (f - 55296 << 10) + (c - 56320), u++)), g += f < 128 ? 1 : f < 2048 ? 2 : f < 65536 ? 3 : 4;
    for (o = new t.Buf8(g), _ = 0, u = 0; _ < g; u++)
      f = s.charCodeAt(u), (f & 64512) === 55296 && u + 1 < p && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (f = 65536 + (f - 55296 << 10) + (c - 56320), u++)), f < 128 ? o[_++] = f : f < 2048 ? (o[_++] = 192 | f >>> 6, o[_++] = 128 | f & 63) : f < 65536 ? (o[_++] = 224 | f >>> 12, o[_++] = 128 | f >>> 6 & 63, o[_++] = 128 | f & 63) : (o[_++] = 240 | f >>> 18, o[_++] = 128 | f >>> 12 & 63, o[_++] = 128 | f >>> 6 & 63, o[_++] = 128 | f & 63);
    return o;
  };
  function a(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var f = "", c = 0; c < o; c++)
      f += String.fromCharCode(s[c]);
    return f;
  }
  return _e.buf2binstring = function(s) {
    return a(s, s.length);
  }, _e.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), f = 0, c = o.length; f < c; f++)
      o[f] = s.charCodeAt(f);
    return o;
  }, _e.buf2string = function(s, o) {
    var f, c, u, _, p = o || s.length, g = new Array(p * 2);
    for (c = 0, f = 0; f < p; ) {
      if (u = s[f++], u < 128) {
        g[c++] = u;
        continue;
      }
      if (_ = i[u], _ > 4) {
        g[c++] = 65533, f += _ - 1;
        continue;
      }
      for (u &= _ === 2 ? 31 : _ === 3 ? 15 : 7; _ > 1 && f < p; )
        u = u << 6 | s[f++] & 63, _--;
      if (_ > 1) {
        g[c++] = 65533;
        continue;
      }
      u < 65536 ? g[c++] = u : (u -= 65536, g[c++] = 55296 | u >> 10 & 1023, g[c++] = 56320 | u & 1023);
    }
    return a(g, c);
  }, _e.utf8border = function(s, o) {
    var f;
    for (o = o || s.length, o > s.length && (o = s.length), f = o - 1; f >= 0 && (s[f] & 192) === 128; )
      f--;
    return f < 0 || f === 0 ? o : f + i[s[f]] > o ? f : o;
  }, _e;
}
var li, ma;
function no() {
  if (ma) return li;
  ma = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return li = t, li;
}
var va;
function U0() {
  if (va) return Ae;
  va = 1;
  var t = V0(), e = he(), n = eo(), i = ji(), r = no(), a = Object.prototype.toString, s = 0, o = 4, f = 0, c = 1, u = 2, _ = -1, p = 0, g = 8;
  function k(E) {
    if (!(this instanceof k)) return new k(E);
    this.options = e.assign({
      level: _,
      method: g,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, E || {});
    var b = this.options;
    b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var y = t.deflateInit2(
      this.strm,
      b.level,
      b.method,
      b.windowBits,
      b.memLevel,
      b.strategy
    );
    if (y !== f)
      throw new Error(i[y]);
    if (b.header && t.deflateSetHeader(this.strm, b.header), b.dictionary) {
      var S;
      if (typeof b.dictionary == "string" ? S = n.string2buf(b.dictionary) : a.call(b.dictionary) === "[object ArrayBuffer]" ? S = new Uint8Array(b.dictionary) : S = b.dictionary, y = t.deflateSetDictionary(this.strm, S), y !== f)
        throw new Error(i[y]);
      this._dict_set = !0;
    }
  }
  k.prototype.push = function(E, b) {
    var y = this.strm, S = this.options.chunkSize, D, T;
    if (this.ended)
      return !1;
    T = b === ~~b ? b : b === !0 ? o : s, typeof E == "string" ? y.input = n.string2buf(E) : a.call(E) === "[object ArrayBuffer]" ? y.input = new Uint8Array(E) : y.input = E, y.next_in = 0, y.avail_in = y.input.length;
    do {
      if (y.avail_out === 0 && (y.output = new e.Buf8(S), y.next_out = 0, y.avail_out = S), D = t.deflate(y, T), D !== c && D !== f)
        return this.onEnd(D), this.ended = !0, !1;
      (y.avail_out === 0 || y.avail_in === 0 && (T === o || T === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(y.output, y.next_out))) : this.onData(e.shrinkBuf(y.output, y.next_out)));
    } while ((y.avail_in > 0 || y.avail_out === 0) && D !== c);
    return T === o ? (D = t.deflateEnd(this.strm), this.onEnd(D), this.ended = !0, D === f) : (T === u && (this.onEnd(f), y.avail_out = 0), !0);
  }, k.prototype.onData = function(E) {
    this.chunks.push(E);
  }, k.prototype.onEnd = function(E) {
    E === f && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = E, this.msg = this.strm.msg;
  };
  function F(E, b) {
    var y = new k(b);
    if (y.push(E, !0), y.err)
      throw y.msg || i[y.err];
    return y.result;
  }
  function R(E, b) {
    return b = b || {}, b.raw = !0, F(E, b);
  }
  function A(E, b) {
    return b = b || {}, b.gzip = !0, F(E, b);
  }
  return Ae.Deflate = k, Ae.deflate = F, Ae.deflateRaw = R, Ae.gzip = A, Ae;
}
var Ne = {}, Wt = {}, ci, wa;
function G0() {
  if (wa) return ci;
  wa = 1;
  var t = 30, e = 12;
  return ci = function(i, r) {
    var a, s, o, f, c, u, _, p, g, k, F, R, A, E, b, y, S, D, T, z, H, C, w, G, V;
    a = i.state, s = i.next_in, G = i.input, o = s + (i.avail_in - 5), f = i.next_out, V = i.output, c = f - (r - i.avail_out), u = f + (i.avail_out - 257), _ = a.dmax, p = a.wsize, g = a.whave, k = a.wnext, F = a.window, R = a.hold, A = a.bits, E = a.lencode, b = a.distcode, y = (1 << a.lenbits) - 1, S = (1 << a.distbits) - 1;
    t:
      do {
        A < 15 && (R += G[s++] << A, A += 8, R += G[s++] << A, A += 8), D = E[R & y];
        e:
          for (; ; ) {
            if (T = D >>> 24, R >>>= T, A -= T, T = D >>> 16 & 255, T === 0)
              V[f++] = D & 65535;
            else if (T & 16) {
              z = D & 65535, T &= 15, T && (A < T && (R += G[s++] << A, A += 8), z += R & (1 << T) - 1, R >>>= T, A -= T), A < 15 && (R += G[s++] << A, A += 8, R += G[s++] << A, A += 8), D = b[R & S];
              n:
                for (; ; ) {
                  if (T = D >>> 24, R >>>= T, A -= T, T = D >>> 16 & 255, T & 16) {
                    if (H = D & 65535, T &= 15, A < T && (R += G[s++] << A, A += 8, A < T && (R += G[s++] << A, A += 8)), H += R & (1 << T) - 1, H > _) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (R >>>= T, A -= T, T = f - c, H > T) {
                      if (T = H - T, T > g && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (C = 0, w = F, k === 0) {
                        if (C += p - T, T < z) {
                          z -= T;
                          do
                            V[f++] = F[C++];
                          while (--T);
                          C = f - H, w = V;
                        }
                      } else if (k < T) {
                        if (C += p + k - T, T -= k, T < z) {
                          z -= T;
                          do
                            V[f++] = F[C++];
                          while (--T);
                          if (C = 0, k < z) {
                            T = k, z -= T;
                            do
                              V[f++] = F[C++];
                            while (--T);
                            C = f - H, w = V;
                          }
                        }
                      } else if (C += k - T, T < z) {
                        z -= T;
                        do
                          V[f++] = F[C++];
                        while (--T);
                        C = f - H, w = V;
                      }
                      for (; z > 2; )
                        V[f++] = w[C++], V[f++] = w[C++], V[f++] = w[C++], z -= 3;
                      z && (V[f++] = w[C++], z > 1 && (V[f++] = w[C++]));
                    } else {
                      C = f - H;
                      do
                        V[f++] = V[C++], V[f++] = V[C++], V[f++] = V[C++], z -= 3;
                      while (z > 2);
                      z && (V[f++] = V[C++], z > 1 && (V[f++] = V[C++]));
                    }
                  } else if ((T & 64) === 0) {
                    D = b[(D & 65535) + (R & (1 << T) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((T & 64) === 0) {
              D = E[(D & 65535) + (R & (1 << T) - 1)];
              continue e;
            } else if (T & 32) {
              a.mode = e;
              break t;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && f < u);
    z = A >> 3, s -= z, A -= z << 3, R &= (1 << A) - 1, i.next_in = s, i.next_out = f, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = f < u ? 257 + (u - f) : 257 - (f - u), a.hold = R, a.bits = A;
  }, ci;
}
var fi, ya;
function Z0() {
  if (ya) return fi;
  ya = 1;
  var t = he(), e = 15, n = 852, i = 592, r = 0, a = 1, s = 2, o = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ], f = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ], c = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ], u = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  return fi = function(p, g, k, F, R, A, E, b) {
    var y = b.bits, S = 0, D = 0, T = 0, z = 0, H = 0, C = 0, w = 0, G = 0, V = 0, J = 0, at, ct, L, nt, ot, st = null, it = 0, _t, ut = new t.Buf16(e + 1), kt = new t.Buf16(e + 1), Tt = null, ft = 0, ht, lt, xt;
    for (S = 0; S <= e; S++)
      ut[S] = 0;
    for (D = 0; D < F; D++)
      ut[g[k + D]]++;
    for (H = y, z = e; z >= 1 && ut[z] === 0; z--)
      ;
    if (H > z && (H = z), z === 0)
      return R[A++] = 1 << 24 | 64 << 16 | 0, R[A++] = 1 << 24 | 64 << 16 | 0, b.bits = 1, 0;
    for (T = 1; T < z && ut[T] === 0; T++)
      ;
    for (H < T && (H = T), G = 1, S = 1; S <= e; S++)
      if (G <<= 1, G -= ut[S], G < 0)
        return -1;
    if (G > 0 && (p === r || z !== 1))
      return -1;
    for (kt[1] = 0, S = 1; S < e; S++)
      kt[S + 1] = kt[S] + ut[S];
    for (D = 0; D < F; D++)
      g[k + D] !== 0 && (E[kt[g[k + D]]++] = D);
    if (p === r ? (st = Tt = E, _t = 19) : p === a ? (st = o, it -= 257, Tt = f, ft -= 257, _t = 256) : (st = c, Tt = u, _t = -1), J = 0, D = 0, S = T, ot = A, C = H, w = 0, L = -1, V = 1 << H, nt = V - 1, p === a && V > n || p === s && V > i)
      return 1;
    for (; ; ) {
      ht = S - w, E[D] < _t ? (lt = 0, xt = E[D]) : E[D] > _t ? (lt = Tt[ft + E[D]], xt = st[it + E[D]]) : (lt = 96, xt = 0), at = 1 << S - w, ct = 1 << C, T = ct;
      do
        ct -= at, R[ot + (J >> w) + ct] = ht << 24 | lt << 16 | xt | 0;
      while (ct !== 0);
      for (at = 1 << S - 1; J & at; )
        at >>= 1;
      if (at !== 0 ? (J &= at - 1, J += at) : J = 0, D++, --ut[S] === 0) {
        if (S === z)
          break;
        S = g[k + E[D]];
      }
      if (S > H && (J & nt) !== L) {
        for (w === 0 && (w = H), ot += T, C = S - w, G = 1 << C; C + w < z && (G -= ut[C + w], !(G <= 0)); )
          C++, G <<= 1;
        if (V += 1 << C, p === a && V > n || p === s && V > i)
          return 1;
        L = J & nt, R[L] = H << 24 | C << 16 | ot - A | 0;
      }
    }
    return J !== 0 && (R[ot + J] = S - w << 24 | 64 << 16 | 0), b.bits = H, 0;
  }, fi;
}
var xa;
function q0() {
  if (xa) return Wt;
  xa = 1;
  var t = he(), e = js(), n = to(), i = G0(), r = Z0(), a = 0, s = 1, o = 2, f = 4, c = 5, u = 6, _ = 0, p = 1, g = 2, k = -2, F = -3, R = -4, A = -5, E = 8, b = 1, y = 2, S = 3, D = 4, T = 5, z = 6, H = 7, C = 8, w = 9, G = 10, V = 11, J = 12, at = 13, ct = 14, L = 15, nt = 16, ot = 17, st = 18, it = 19, _t = 20, ut = 21, kt = 22, Tt = 23, ft = 24, ht = 25, lt = 26, xt = 27, St = 28, At = 29, rt = 30, Z = 31, bt = 32, yt = 852, Et = 592, wt = 15, U = wt;
  function Nt(x) {
    return (x >>> 24 & 255) + (x >>> 8 & 65280) + ((x & 65280) << 8) + ((x & 255) << 24);
  }
  function zt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Ft(x) {
    var M;
    return !x || !x.state ? k : (M = x.state, x.total_in = x.total_out = M.total = 0, x.msg = "", M.wrap && (x.adler = M.wrap & 1), M.mode = b, M.last = 0, M.havedict = 0, M.dmax = 32768, M.head = null, M.hold = 0, M.bits = 0, M.lencode = M.lendyn = new t.Buf32(yt), M.distcode = M.distdyn = new t.Buf32(Et), M.sane = 1, M.back = -1, _);
  }
  function $t(x) {
    var M;
    return !x || !x.state ? k : (M = x.state, M.wsize = 0, M.whave = 0, M.wnext = 0, Ft(x));
  }
  function Zt(x, M) {
    var h, P;
    return !x || !x.state || (P = x.state, M < 0 ? (h = 0, M = -M) : (h = (M >> 4) + 1, M < 48 && (M &= 15)), M && (M < 8 || M > 15)) ? k : (P.window !== null && P.wbits !== M && (P.window = null), P.wrap = h, P.wbits = M, $t(x));
  }
  function Dt(x, M) {
    var h, P;
    return x ? (P = new zt(), x.state = P, P.window = null, h = Zt(x, M), h !== _ && (x.state = null), h) : k;
  }
  function q(x) {
    return Dt(x, U);
  }
  var gt = !0, tt, dt;
  function j(x) {
    if (gt) {
      var M;
      for (tt = new t.Buf32(512), dt = new t.Buf32(32), M = 0; M < 144; )
        x.lens[M++] = 8;
      for (; M < 256; )
        x.lens[M++] = 9;
      for (; M < 280; )
        x.lens[M++] = 7;
      for (; M < 288; )
        x.lens[M++] = 8;
      for (r(s, x.lens, 0, 288, tt, 0, x.work, { bits: 9 }), M = 0; M < 32; )
        x.lens[M++] = 5;
      r(o, x.lens, 0, 32, dt, 0, x.work, { bits: 5 }), gt = !1;
    }
    x.lencode = tt, x.lenbits = 9, x.distcode = dt, x.distbits = 5;
  }
  function K(x, M, h, P) {
    var et, l = x.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), P >= l.wsize ? (t.arraySet(l.window, M, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (et = l.wsize - l.wnext, et > P && (et = P), t.arraySet(l.window, M, h - P, et, l.wnext), P -= et, P ? (t.arraySet(l.window, M, h - P, P, 0), l.wnext = P, l.whave = l.wsize) : (l.wnext += et, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += et))), 0;
  }
  function m(x, M) {
    var h, P, et, l, N, $, d, v, I, Q, X, Y, mt, re, Rt = 0, vt, Ct, Pt, Vt, tn, en, Lt, qt, Bt = new t.Buf8(4), ae, te, nr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!x || !x.state || !x.output || !x.input && x.avail_in !== 0)
      return k;
    h = x.state, h.mode === J && (h.mode = at), N = x.next_out, et = x.output, d = x.avail_out, l = x.next_in, P = x.input, $ = x.avail_in, v = h.hold, I = h.bits, Q = $, X = d, qt = _;
    t:
      for (; ; )
        switch (h.mode) {
          case b:
            if (h.wrap === 0) {
              h.mode = at;
              break;
            }
            for (; I < 16; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if (h.wrap & 2 && v === 35615) {
              h.check = 0, Bt[0] = v & 255, Bt[1] = v >>> 8 & 255, h.check = n(h.check, Bt, 2, 0), v = 0, I = 0, h.mode = y;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((v & 255) << 8) + (v >> 8)) % 31) {
              x.msg = "incorrect header check", h.mode = rt;
              break;
            }
            if ((v & 15) !== E) {
              x.msg = "unknown compression method", h.mode = rt;
              break;
            }
            if (v >>>= 4, I -= 4, Lt = (v & 15) + 8, h.wbits === 0)
              h.wbits = Lt;
            else if (Lt > h.wbits) {
              x.msg = "invalid window size", h.mode = rt;
              break;
            }
            h.dmax = 1 << Lt, x.adler = h.check = 1, h.mode = v & 512 ? G : J, v = 0, I = 0;
            break;
          case y:
            for (; I < 16; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if (h.flags = v, (h.flags & 255) !== E) {
              x.msg = "unknown compression method", h.mode = rt;
              break;
            }
            if (h.flags & 57344) {
              x.msg = "unknown header flags set", h.mode = rt;
              break;
            }
            h.head && (h.head.text = v >> 8 & 1), h.flags & 512 && (Bt[0] = v & 255, Bt[1] = v >>> 8 & 255, h.check = n(h.check, Bt, 2, 0)), v = 0, I = 0, h.mode = S;
          /* falls through */
          case S:
            for (; I < 32; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            h.head && (h.head.time = v), h.flags & 512 && (Bt[0] = v & 255, Bt[1] = v >>> 8 & 255, Bt[2] = v >>> 16 & 255, Bt[3] = v >>> 24 & 255, h.check = n(h.check, Bt, 4, 0)), v = 0, I = 0, h.mode = D;
          /* falls through */
          case D:
            for (; I < 16; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            h.head && (h.head.xflags = v & 255, h.head.os = v >> 8), h.flags & 512 && (Bt[0] = v & 255, Bt[1] = v >>> 8 & 255, h.check = n(h.check, Bt, 2, 0)), v = 0, I = 0, h.mode = T;
          /* falls through */
          case T:
            if (h.flags & 1024) {
              for (; I < 16; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              h.length = v, h.head && (h.head.extra_len = v), h.flags & 512 && (Bt[0] = v & 255, Bt[1] = v >>> 8 & 255, h.check = n(h.check, Bt, 2, 0)), v = 0, I = 0;
            } else h.head && (h.head.extra = null);
            h.mode = z;
          /* falls through */
          case z:
            if (h.flags & 1024 && (Y = h.length, Y > $ && (Y = $), Y && (h.head && (Lt = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              P,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              Y,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Lt
            )), h.flags & 512 && (h.check = n(h.check, P, Y, l)), $ -= Y, l += Y, h.length -= Y), h.length))
              break t;
            h.length = 0, h.mode = H;
          /* falls through */
          case H:
            if (h.flags & 2048) {
              if ($ === 0)
                break t;
              Y = 0;
              do
                Lt = P[l + Y++], h.head && Lt && h.length < 65536 && (h.head.name += String.fromCharCode(Lt));
              while (Lt && Y < $);
              if (h.flags & 512 && (h.check = n(h.check, P, Y, l)), $ -= Y, l += Y, Lt)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = C;
          /* falls through */
          case C:
            if (h.flags & 4096) {
              if ($ === 0)
                break t;
              Y = 0;
              do
                Lt = P[l + Y++], h.head && Lt && h.length < 65536 && (h.head.comment += String.fromCharCode(Lt));
              while (Lt && Y < $);
              if (h.flags & 512 && (h.check = n(h.check, P, Y, l)), $ -= Y, l += Y, Lt)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = w;
          /* falls through */
          case w:
            if (h.flags & 512) {
              for (; I < 16; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              if (v !== (h.check & 65535)) {
                x.msg = "header crc mismatch", h.mode = rt;
                break;
              }
              v = 0, I = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), x.adler = h.check = 0, h.mode = J;
            break;
          case G:
            for (; I < 32; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            x.adler = h.check = Nt(v), v = 0, I = 0, h.mode = V;
          /* falls through */
          case V:
            if (h.havedict === 0)
              return x.next_out = N, x.avail_out = d, x.next_in = l, x.avail_in = $, h.hold = v, h.bits = I, g;
            x.adler = h.check = 1, h.mode = J;
          /* falls through */
          case J:
            if (M === c || M === u)
              break t;
          /* falls through */
          case at:
            if (h.last) {
              v >>>= I & 7, I -= I & 7, h.mode = xt;
              break;
            }
            for (; I < 3; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            switch (h.last = v & 1, v >>>= 1, I -= 1, v & 3) {
              case 0:
                h.mode = ct;
                break;
              case 1:
                if (j(h), h.mode = _t, M === u) {
                  v >>>= 2, I -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = ot;
                break;
              case 3:
                x.msg = "invalid block type", h.mode = rt;
            }
            v >>>= 2, I -= 2;
            break;
          case ct:
            for (v >>>= I & 7, I -= I & 7; I < 32; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if ((v & 65535) !== (v >>> 16 ^ 65535)) {
              x.msg = "invalid stored block lengths", h.mode = rt;
              break;
            }
            if (h.length = v & 65535, v = 0, I = 0, h.mode = L, M === u)
              break t;
          /* falls through */
          case L:
            h.mode = nt;
          /* falls through */
          case nt:
            if (Y = h.length, Y) {
              if (Y > $ && (Y = $), Y > d && (Y = d), Y === 0)
                break t;
              t.arraySet(et, P, l, Y, N), $ -= Y, l += Y, d -= Y, N += Y, h.length -= Y;
              break;
            }
            h.mode = J;
            break;
          case ot:
            for (; I < 14; ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if (h.nlen = (v & 31) + 257, v >>>= 5, I -= 5, h.ndist = (v & 31) + 1, v >>>= 5, I -= 5, h.ncode = (v & 15) + 4, v >>>= 4, I -= 4, h.nlen > 286 || h.ndist > 30) {
              x.msg = "too many length or distance symbols", h.mode = rt;
              break;
            }
            h.have = 0, h.mode = st;
          /* falls through */
          case st:
            for (; h.have < h.ncode; ) {
              for (; I < 3; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              h.lens[nr[h.have++]] = v & 7, v >>>= 3, I -= 3;
            }
            for (; h.have < 19; )
              h.lens[nr[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, ae = { bits: h.lenbits }, qt = r(a, h.lens, 0, 19, h.lencode, 0, h.work, ae), h.lenbits = ae.bits, qt) {
              x.msg = "invalid code lengths set", h.mode = rt;
              break;
            }
            h.have = 0, h.mode = it;
          /* falls through */
          case it:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; Rt = h.lencode[v & (1 << h.lenbits) - 1], vt = Rt >>> 24, Ct = Rt >>> 16 & 255, Pt = Rt & 65535, !(vt <= I); ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              if (Pt < 16)
                v >>>= vt, I -= vt, h.lens[h.have++] = Pt;
              else {
                if (Pt === 16) {
                  for (te = vt + 2; I < te; ) {
                    if ($ === 0)
                      break t;
                    $--, v += P[l++] << I, I += 8;
                  }
                  if (v >>>= vt, I -= vt, h.have === 0) {
                    x.msg = "invalid bit length repeat", h.mode = rt;
                    break;
                  }
                  Lt = h.lens[h.have - 1], Y = 3 + (v & 3), v >>>= 2, I -= 2;
                } else if (Pt === 17) {
                  for (te = vt + 3; I < te; ) {
                    if ($ === 0)
                      break t;
                    $--, v += P[l++] << I, I += 8;
                  }
                  v >>>= vt, I -= vt, Lt = 0, Y = 3 + (v & 7), v >>>= 3, I -= 3;
                } else {
                  for (te = vt + 7; I < te; ) {
                    if ($ === 0)
                      break t;
                    $--, v += P[l++] << I, I += 8;
                  }
                  v >>>= vt, I -= vt, Lt = 0, Y = 11 + (v & 127), v >>>= 7, I -= 7;
                }
                if (h.have + Y > h.nlen + h.ndist) {
                  x.msg = "invalid bit length repeat", h.mode = rt;
                  break;
                }
                for (; Y--; )
                  h.lens[h.have++] = Lt;
              }
            }
            if (h.mode === rt)
              break;
            if (h.lens[256] === 0) {
              x.msg = "invalid code -- missing end-of-block", h.mode = rt;
              break;
            }
            if (h.lenbits = 9, ae = { bits: h.lenbits }, qt = r(s, h.lens, 0, h.nlen, h.lencode, 0, h.work, ae), h.lenbits = ae.bits, qt) {
              x.msg = "invalid literal/lengths set", h.mode = rt;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, ae = { bits: h.distbits }, qt = r(o, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, ae), h.distbits = ae.bits, qt) {
              x.msg = "invalid distances set", h.mode = rt;
              break;
            }
            if (h.mode = _t, M === u)
              break t;
          /* falls through */
          case _t:
            h.mode = ut;
          /* falls through */
          case ut:
            if ($ >= 6 && d >= 258) {
              x.next_out = N, x.avail_out = d, x.next_in = l, x.avail_in = $, h.hold = v, h.bits = I, i(x, X), N = x.next_out, et = x.output, d = x.avail_out, l = x.next_in, P = x.input, $ = x.avail_in, v = h.hold, I = h.bits, h.mode === J && (h.back = -1);
              break;
            }
            for (h.back = 0; Rt = h.lencode[v & (1 << h.lenbits) - 1], vt = Rt >>> 24, Ct = Rt >>> 16 & 255, Pt = Rt & 65535, !(vt <= I); ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if (Ct && (Ct & 240) === 0) {
              for (Vt = vt, tn = Ct, en = Pt; Rt = h.lencode[en + ((v & (1 << Vt + tn) - 1) >> Vt)], vt = Rt >>> 24, Ct = Rt >>> 16 & 255, Pt = Rt & 65535, !(Vt + vt <= I); ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              v >>>= Vt, I -= Vt, h.back += Vt;
            }
            if (v >>>= vt, I -= vt, h.back += vt, h.length = Pt, Ct === 0) {
              h.mode = lt;
              break;
            }
            if (Ct & 32) {
              h.back = -1, h.mode = J;
              break;
            }
            if (Ct & 64) {
              x.msg = "invalid literal/length code", h.mode = rt;
              break;
            }
            h.extra = Ct & 15, h.mode = kt;
          /* falls through */
          case kt:
            if (h.extra) {
              for (te = h.extra; I < te; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              h.length += v & (1 << h.extra) - 1, v >>>= h.extra, I -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = Tt;
          /* falls through */
          case Tt:
            for (; Rt = h.distcode[v & (1 << h.distbits) - 1], vt = Rt >>> 24, Ct = Rt >>> 16 & 255, Pt = Rt & 65535, !(vt <= I); ) {
              if ($ === 0)
                break t;
              $--, v += P[l++] << I, I += 8;
            }
            if ((Ct & 240) === 0) {
              for (Vt = vt, tn = Ct, en = Pt; Rt = h.distcode[en + ((v & (1 << Vt + tn) - 1) >> Vt)], vt = Rt >>> 24, Ct = Rt >>> 16 & 255, Pt = Rt & 65535, !(Vt + vt <= I); ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              v >>>= Vt, I -= Vt, h.back += Vt;
            }
            if (v >>>= vt, I -= vt, h.back += vt, Ct & 64) {
              x.msg = "invalid distance code", h.mode = rt;
              break;
            }
            h.offset = Pt, h.extra = Ct & 15, h.mode = ft;
          /* falls through */
          case ft:
            if (h.extra) {
              for (te = h.extra; I < te; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              h.offset += v & (1 << h.extra) - 1, v >>>= h.extra, I -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              x.msg = "invalid distance too far back", h.mode = rt;
              break;
            }
            h.mode = ht;
          /* falls through */
          case ht:
            if (d === 0)
              break t;
            if (Y = X - d, h.offset > Y) {
              if (Y = h.offset - Y, Y > h.whave && h.sane) {
                x.msg = "invalid distance too far back", h.mode = rt;
                break;
              }
              Y > h.wnext ? (Y -= h.wnext, mt = h.wsize - Y) : mt = h.wnext - Y, Y > h.length && (Y = h.length), re = h.window;
            } else
              re = et, mt = N - h.offset, Y = h.length;
            Y > d && (Y = d), d -= Y, h.length -= Y;
            do
              et[N++] = re[mt++];
            while (--Y);
            h.length === 0 && (h.mode = ut);
            break;
          case lt:
            if (d === 0)
              break t;
            et[N++] = h.length, d--, h.mode = ut;
            break;
          case xt:
            if (h.wrap) {
              for (; I < 32; ) {
                if ($ === 0)
                  break t;
                $--, v |= P[l++] << I, I += 8;
              }
              if (X -= d, x.total_out += X, h.total += X, X && (x.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, et, X, N - X) : e(h.check, et, X, N - X)), X = d, (h.flags ? v : Nt(v)) !== h.check) {
                x.msg = "incorrect data check", h.mode = rt;
                break;
              }
              v = 0, I = 0;
            }
            h.mode = St;
          /* falls through */
          case St:
            if (h.wrap && h.flags) {
              for (; I < 32; ) {
                if ($ === 0)
                  break t;
                $--, v += P[l++] << I, I += 8;
              }
              if (v !== (h.total & 4294967295)) {
                x.msg = "incorrect length check", h.mode = rt;
                break;
              }
              v = 0, I = 0;
            }
            h.mode = At;
          /* falls through */
          case At:
            qt = p;
            break t;
          case rt:
            qt = F;
            break t;
          case Z:
            return R;
          case bt:
          /* falls through */
          default:
            return k;
        }
    return x.next_out = N, x.avail_out = d, x.next_in = l, x.avail_in = $, h.hold = v, h.bits = I, (h.wsize || X !== x.avail_out && h.mode < rt && (h.mode < xt || M !== f)) && K(x, x.output, x.next_out, X - x.avail_out), Q -= x.avail_in, X -= x.avail_out, x.total_in += Q, x.total_out += X, h.total += X, h.wrap && X && (x.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, et, X, x.next_out - X) : e(h.check, et, X, x.next_out - X)), x.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === J ? 128 : 0) + (h.mode === _t || h.mode === L ? 256 : 0), (Q === 0 && X === 0 || M === f) && qt === _ && (qt = A), qt;
  }
  function B(x) {
    if (!x || !x.state)
      return k;
    var M = x.state;
    return M.window && (M.window = null), x.state = null, _;
  }
  function O(x, M) {
    var h;
    return !x || !x.state || (h = x.state, (h.wrap & 2) === 0) ? k : (h.head = M, M.done = !1, _);
  }
  function W(x, M) {
    var h = M.length, P, et, l;
    return !x || !x.state || (P = x.state, P.wrap !== 0 && P.mode !== V) ? k : P.mode === V && (et = 1, et = e(et, M, h, 0), et !== P.check) ? F : (l = K(x, M, h, h), l ? (P.mode = Z, R) : (P.havedict = 1, _));
  }
  return Wt.inflateReset = $t, Wt.inflateReset2 = Zt, Wt.inflateResetKeep = Ft, Wt.inflateInit = q, Wt.inflateInit2 = Dt, Wt.inflate = m, Wt.inflateEnd = B, Wt.inflateGetHeader = O, Wt.inflateSetDictionary = W, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var ui, ba;
function io() {
  return ba || (ba = 1, ui = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  }), ui;
}
var hi, ka;
function W0() {
  if (ka) return hi;
  ka = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return hi = t, hi;
}
var Ea;
function X0() {
  if (Ea) return Ne;
  Ea = 1;
  var t = q0(), e = he(), n = eo(), i = io(), r = ji(), a = no(), s = W0(), o = Object.prototype.toString;
  function f(_) {
    if (!(this instanceof f)) return new f(_);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, _ || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(_ && _.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var g = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (g !== i.Z_OK)
      throw new Error(r[g]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (g = t.inflateSetDictionary(this.strm, p.dictionary), g !== i.Z_OK)))
      throw new Error(r[g]);
  }
  f.prototype.push = function(_, p) {
    var g = this.strm, k = this.options.chunkSize, F = this.options.dictionary, R, A, E, b, y, S = !1;
    if (this.ended)
      return !1;
    A = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof _ == "string" ? g.input = n.binstring2buf(_) : o.call(_) === "[object ArrayBuffer]" ? g.input = new Uint8Array(_) : g.input = _, g.next_in = 0, g.avail_in = g.input.length;
    do {
      if (g.avail_out === 0 && (g.output = new e.Buf8(k), g.next_out = 0, g.avail_out = k), R = t.inflate(g, i.Z_NO_FLUSH), R === i.Z_NEED_DICT && F && (R = t.inflateSetDictionary(this.strm, F)), R === i.Z_BUF_ERROR && S === !0 && (R = i.Z_OK, S = !1), R !== i.Z_STREAM_END && R !== i.Z_OK)
        return this.onEnd(R), this.ended = !0, !1;
      g.next_out && (g.avail_out === 0 || R === i.Z_STREAM_END || g.avail_in === 0 && (A === i.Z_FINISH || A === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (E = n.utf8border(g.output, g.next_out), b = g.next_out - E, y = n.buf2string(g.output, E), g.next_out = b, g.avail_out = k - b, b && e.arraySet(g.output, g.output, E, b, 0), this.onData(y)) : this.onData(e.shrinkBuf(g.output, g.next_out))), g.avail_in === 0 && g.avail_out === 0 && (S = !0);
    } while ((g.avail_in > 0 || g.avail_out === 0) && R !== i.Z_STREAM_END);
    return R === i.Z_STREAM_END && (A = i.Z_FINISH), A === i.Z_FINISH ? (R = t.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i.Z_OK) : (A === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), g.avail_out = 0), !0);
  }, f.prototype.onData = function(_) {
    this.chunks.push(_);
  }, f.prototype.onEnd = function(_) {
    _ === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = _, this.msg = this.strm.msg;
  };
  function c(_, p) {
    var g = new f(p);
    if (g.push(_, !0), g.err)
      throw g.msg || r[g.err];
    return g.result;
  }
  function u(_, p) {
    return p = p || {}, p.raw = !0, c(_, p);
  }
  return Ne.Inflate = f, Ne.inflate = c, Ne.inflateRaw = u, Ne.ungzip = c, Ne;
}
var di, Ta;
function K0() {
  if (Ta) return di;
  Ta = 1;
  var t = he().assign, e = U0(), n = X0(), i = io(), r = {};
  return t(r, e, n, i), di = r, di;
}
var Y0 = K0();
const J0 = /* @__PURE__ */ Yi(Y0);
function Q0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ro(t) {
  const e = new Uint8Array(Q0(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: ao, Inflate: so } = J0;
async function tr(t) {
  try {
    let e, n = 0, i;
    const r = [];
    do {
      const a = t.subarray(n);
      if (i = new so(), { strm: e } = i, i.push(a, ao), i.err)
        throw new Error(i.msg);
      n += e.next_in, r.push(i.result);
    } while (e.avail_in);
    return ro(r);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function j0(t, e) {
  try {
    let n;
    const { minv: i, maxv: r } = e;
    let a = i.blockPosition, s = i.dataPosition;
    const o = [], f = [], c = [];
    let u = 0;
    do {
      const _ = t.subarray(a - i.blockPosition), p = new so();
      if ({ strm: n } = p, p.push(_, ao), p.err)
        throw new Error(p.msg);
      const g = p.result;
      o.push(g);
      let k = g.length;
      f.push(a), c.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), k = o[0].length);
      const F = a;
      if (a += n.next_in, s += k, F >= r.blockPosition) {
        o[u] = o[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), f.push(a), c.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: ro(o),
      cpositions: f,
      dpositions: c
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class Fn {
  constructor(e, n, i, r = void 0) {
    this.minv = e, this.maxv = n, this.bin = i, this._fetchedSize = r;
  }
  toUniqueString() {
    return `${this.minv}..${this.maxv} (bin ${this.bin}, fetchedSize ${this.fetchedSize()})`;
  }
  toString() {
    return this.toUniqueString();
  }
  compareTo(e) {
    return this.minv.compareTo(e.minv) || this.maxv.compareTo(e.maxv) || this.bin - e.bin;
  }
  fetchedSize() {
    return this._fetchedSize !== void 0 ? this._fetchedSize : this.maxv.blockPosition + 65536 - this.minv.blockPosition;
  }
}
class oo {
  constructor({ filehandle: e, renameRefSeqs: n = (i) => i }) {
    this.filehandle = e, this.renameRefSeq = n;
  }
  async getMetadata(e = {}) {
    const { indices: n, ...i } = await this.parse(e);
    return i;
  }
  _findFirstData(e, n) {
    return e ? e.compareTo(n) > 0 ? n : e : n;
  }
  async parse(e = {}) {
    return this.parseP || (this.parseP = this._parse(e).catch((n) => {
      throw this.parseP = void 0, n;
    })), this.parseP;
  }
  async hasRefSeq(e, n = {}) {
    return !!(await this.parse(n)).indices[e]?.binIndex;
  }
}
const $a = 65536, tp = $a * $a;
function lo(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * tp + (n >>> 0);
}
class ep extends Error {
}
function qe(t) {
  if (t && t.aborted) {
    if (typeof DOMException < "u")
      throw new DOMException("aborted", "AbortError");
    {
      const e = new ep("aborted");
      throw e.code = "ERR_ABORTED", e;
    }
  }
}
function np(t, e) {
  return e.minv.blockPosition - t.maxv.blockPosition < 65e3 && e.maxv.blockPosition - t.minv.blockPosition < 5e6;
}
function co(t, e) {
  const n = [];
  let i = null;
  return t.length === 0 ? t : (t.sort(function(r, a) {
    const s = r.minv.blockPosition - a.minv.blockPosition;
    return s !== 0 ? s : r.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((r) => {
    (!e || r.maxv.compareTo(e) > 0) && (i === null ? (n.push(r), i = r) : np(i, r) ? r.maxv.compareTo(i.maxv) > 0 && (i.maxv = r.maxv) : (n.push(r), i = r));
  }), n);
}
class er {
  constructor(e, n) {
    this.blockPosition = e, this.dataPosition = n;
  }
  toString() {
    return `${this.blockPosition}:${this.dataPosition}`;
  }
  compareTo(e) {
    return this.blockPosition - e.blockPosition || this.dataPosition - e.dataPosition;
  }
}
function Me(t, e = 0) {
  return new er(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const ip = 21582659, rp = 38359875, ap = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function sp(t, e) {
  return t * 2 ** e;
}
function Sa(t, e) {
  return Math.floor(t / 2 ** e);
}
class pi extends oo {
  constructor(e) {
    super(e), this.maxBinNumber = 0, this.depth = 0, this.minShift = 0;
  }
  async lineCount(e, n = {}) {
    const i = await this.parse(n), r = i.refNameToId[e];
    if (r === void 0 || !i.indices[r])
      return -1;
    const { stats: s } = i.indices[r];
    return s ? s.lineCount : -1;
  }
  indexCov() {
    throw new Error("CSI indexes do not support indexcov");
  }
  parseAuxData(e, n) {
    const i = new DataView(e.buffer), r = i.getInt32(n, !0), a = r & 65536 ? "zero-based-half-open" : "1-based-closed", s = ap[r & 15];
    if (!s)
      throw new Error(`invalid Tabix preset format flags ${r}`);
    const o = {
      ref: i.getInt32(n + 4, !0),
      start: i.getInt32(n + 8, !0),
      end: i.getInt32(n + 12, !0)
    }, f = i.getInt32(n + 16, !0), c = f ? String.fromCharCode(f) : null, u = i.getInt32(n + 20, !0), _ = i.getInt32(n + 24, !0), { refIdToName: p, refNameToId: g } = this._parseNameBytes(e.subarray(n + 28, n + 28 + _));
    return {
      refIdToName: p,
      refNameToId: g,
      skipLines: u,
      metaChar: c,
      columnNumbers: o,
      format: s,
      coordinateType: a
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (i < o) {
          const f = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = f, a[f] = n;
        }
        i = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await tr(await this.filehandle.readFile(e)), i = new DataView(n.buffer);
    let r;
    if (i.getUint32(0, !0) === ip)
      r = 1;
    else if (i.getUint32(0, !0) === rp)
      r = 2;
    else
      throw new Error("Not a CSI file");
    this.minShift = i.getInt32(4, !0), this.depth = i.getInt32(8, !0), this.maxBinNumber = ((1 << (this.depth + 1) * 3) - 1) / 7;
    const a = 2 ** (this.minShift + this.depth * 3), s = i.getInt32(12, !0), o = s && s >= 30 ? this.parseAuxData(n, 16) : {
      refIdToName: [],
      refNameToId: {},
      metaChar: null,
      columnNumbers: { ref: 0, start: 1, end: 2 },
      coordinateType: "zero-based-half-open",
      format: "generic"
    }, f = i.getInt32(16 + s, !0);
    let c, u = 16 + s + 4;
    const _ = new Array(f).fill(0).map(() => {
      const p = i.getInt32(u, !0);
      u += 4;
      const g = {};
      let k;
      for (let F = 0; F < p; F += 1) {
        const R = i.getUint32(u, !0);
        if (R > this.maxBinNumber)
          k = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const A = Me(n, u + 4);
          c = this._findFirstData(c, A);
          const E = i.getInt32(u + 12, !0);
          u += 16;
          const b = new Array(E);
          for (let y = 0; y < E; y += 1) {
            const S = Me(n, u), D = Me(n, u + 8);
            u += 16, b[y] = new Fn(S, D, R);
          }
          g[R] = b;
        }
      }
      return { binIndex: g, stats: k };
    });
    return {
      ...o,
      csi: !0,
      refCount: f,
      maxBlockSize: 65536,
      firstDataLine: c,
      csiVersion: r,
      indices: _,
      depth: this.depth,
      maxBinNumber: this.maxBinNumber,
      maxRefLength: a
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: lo(e, n + 28)
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    const f = this.reg2bins(n, i), c = [];
    for (const [u, _] of f)
      for (let p = u; p <= _; p++)
        if (o.binIndex[p])
          for (const g of o.binIndex[p])
            c.push(new Fn(g.minv, g.maxv, p));
    return co(c, new er(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += sp(1, i * 3), i += 1) {
      const o = r + Sa(e, a), f = r + Sa(n, a);
      if (f - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, f]);
    }
    return s;
  }
}
const op = 21578324, Aa = 14;
function lp(t, e) {
  return t += 1, e -= 1, [
    [0, 0],
    [1 + (t >> 26), 1 + (e >> 26)],
    [9 + (t >> 23), 9 + (e >> 23)],
    [73 + (t >> 20), 73 + (e >> 20)],
    [585 + (t >> 17), 585 + (e >> 17)],
    [4681 + (t >> 14), 4681 + (e >> 14)]
  ];
}
class He extends oo {
  async lineCount(e, n = {}) {
    const i = await this.parse(n), r = i.refNameToId[e];
    return r === void 0 || !i.indices[r] ? -1 : i.indices[r].stats?.lineCount ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), i = await tr(n);
    qe(e.signal);
    const r = new DataView(i.buffer);
    if (r.getUint32(0, !0) !== op)
      throw new Error("Not a TBI file");
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), f = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const _ = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, p = r.getInt32(24, !0), g = 5, k = ((1 << (g + 1) * 3) - 1) / 7, F = 2 ** (14 + g * 3), R = p ? String.fromCharCode(p) : null, A = r.getInt32(28, !0), E = r.getInt32(32, !0), { refNameToId: b, refIdToName: y } = this._parseNameBytes(i.slice(36, 36 + E));
    let S = 36 + E, D;
    return {
      indices: new Array(s).fill(0).map(() => {
        const z = r.getInt32(S, !0);
        S += 4;
        const H = {};
        let C;
        for (let V = 0; V < z; V += 1) {
          const J = r.getUint32(S, !0);
          if (S += 4, J > k + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (J === k + 1) {
            const at = r.getInt32(S, !0);
            S += 4, at === 2 && (C = this.parsePseudoBin(i, S)), S += 16 * at;
          } else {
            const at = r.getInt32(S, !0);
            S += 4;
            const ct = new Array(at);
            for (let L = 0; L < at; L += 1) {
              const nt = Me(i, S), ot = Me(i, S + 8);
              S += 16, D = this._findFirstData(D, nt), ct[L] = new Fn(nt, ot, J);
            }
            H[J] = ct;
          }
        }
        const w = r.getInt32(S, !0);
        S += 4;
        const G = new Array(w);
        for (let V = 0; V < w; V += 1)
          G[V] = Me(i, S), S += 8, D = this._findFirstData(D, G[V]);
        return {
          binIndex: H,
          linearIndex: G,
          stats: C
        };
      }),
      metaChar: R,
      maxBinNumber: k,
      maxRefLength: F,
      skipLines: A,
      firstDataLine: D,
      columnNumbers: _,
      coordinateType: f,
      format: u,
      refIdToName: y,
      refNameToId: b,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: lo(e, n + 16)
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (i < o) {
          const f = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = f, a[f] = n;
        }
        i = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    (o.linearIndex.length ? o.linearIndex[n >> Aa >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> Aa] : new er(0, 0)) || console.warn("querying outside of possible tabix range");
    const c = lp(n, i), u = [];
    for (const [F, R] of c)
      for (let A = F; A <= R; A++)
        if (o.binIndex[A])
          for (const E of o.binIndex[A])
            u.push(new Fn(E.minv, E.maxv, A));
    const _ = o.linearIndex.length;
    let p = null;
    const g = Math.min(n >> 14, _ - 1), k = Math.min(i >> 14, _ - 1);
    for (let F = g; F <= k; ++F) {
      const R = o.linearIndex[F];
      R && (!p || R.compareTo(p) < 0) && (p = R);
    }
    return co(u, p);
  }
}
function cp(t) {
  return /^[\u0000-\u007F]*$/.test(t);
}
class fp {
  /**
   * @param {object} args
   *
   * @param {string} [args.path]
   *
   * @param {filehandle} [args.filehandle]
   *
   * @param {string} [args.tbiPath]
   *
   * @param {filehandle} [args.tbiFilehandle]
   *
   * @param {string} [args.csiPath]
   *
   * @param {filehandle} [args.csiFilehandle]
   *
   * @param {url} [args.url]
   *
   * @param {csiUrl} [args.csiUrl]
   *
   * @param {tbiUrl} [args.tbiUrl]
   *
   * @param {function} [args.renameRefSeqs] optional function with sig `string
   * => string` to transform reference sequence names for the purpose of
   * indexing and querying. note that the data that is returned is not altered,
   * just the names of the reference sequences that are used for querying.
   */
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: f, csiFilehandle: c, renameRefSeqs: u = (p) => p, chunkCacheSize: _ = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new pn(e);
    else if (i)
      this.filehandle = new ve(i);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new He({
        filehandle: s,
        renameRefSeqs: u
      });
    else if (c)
      this.index = new pi({
        filehandle: c,
        renameRefSeqs: u
      });
    else if (r)
      this.index = new He({
        filehandle: new pn(r),
        renameRefSeqs: u
      });
    else if (o)
      this.index = new pi({
        filehandle: new pn(o),
        renameRefSeqs: u
      });
    else if (e)
      this.index = new He({
        filehandle: new pn(`${e}.tbi`),
        renameRefSeqs: u
      });
    else if (f)
      this.index = new pi({
        filehandle: new ve(f)
      });
    else if (a)
      this.index = new He({
        filehandle: new ve(a)
      });
    else if (i)
      this.index = new He({
        filehandle: new ve(`${i}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = u, this.chunkCache = new ke({
      cache: new Vn({ maxSize: Math.floor(_ / 65536) }),
      fill: (p, g) => this.readChunk(p, { signal: g })
    });
  }
  /**
   * @param refName name of the reference sequence
   *
   * @param start start of the region (in 0-based half-open coordinates)
   *
   * @param end end of the region (in 0-based half-open coordinates)
   *
   * @param opts callback called for each line in the region. can also pass a
   * object param containing obj.lineCallback, obj.signal, etc
   *
   * @returns promise that is resolved when the whole read is finished,
   * rejected on error
   */
  async getLines(e, n, i, r) {
    let a, s = {}, o;
    typeof r == "function" ? o = r : (s = r, o = r.lineCallback, a = r.signal);
    const f = await this.index.getMetadata(s);
    qe(a);
    const c = n ?? 0, u = i ?? f.maxRefLength;
    if (!(c <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (c === u)
      return;
    const _ = await this.index.blocksForRange(e, c, u, s);
    qe(a);
    const p = new TextDecoder("utf8");
    for (const g of _) {
      const { buffer: k, cpositions: F, dpositions: R } = await this.chunkCache.get(g.toString(), g, a);
      qe(a);
      let A = 0, E = 0;
      const b = p.decode(k), y = cp(b);
      for (; A < b.length; ) {
        let S, D;
        if (y) {
          if (D = b.indexOf(`
`, A), D === -1)
            break;
          S = b.slice(A, D);
        } else {
          if (D = k.indexOf(10, A), D === -1)
            break;
          const H = k.slice(A, D);
          S = p.decode(H);
        }
        if (R) {
          for (; A + g.minv.dataPosition >= R[E++]; )
            ;
          E--;
        }
        const { startCoordinate: T, overlaps: z } = this.checkLine(f, e, c, u, S);
        if (z)
          o(
            S,
            // cpositions[pos] refers to actual file offset of a bgzip block
            // boundaries
            //
            // we multiply by (1 <<8) in order to make sure each block has a
            // "unique" address space so that data in that block could never
            // overlap
            //
            // then the blockStart-dpositions is an uncompressed file offset
            // from that bgzip block boundary, and since the cpositions are
            // multiplied by (1 << 8) these uncompressed offsets get a unique
            // space
            F[E] * 256 + (A - R[E]) + g.minv.dataPosition + 1
          );
        else if (T !== void 0 && T >= u)
          return;
        A = D + 1;
      }
    }
  }
  async getMetadata(e = {}) {
    return this.index.getMetadata(e);
  }
  /**
   * get a buffer containing the "header" region of the file, which are the
   * bytes up to the first non-meta line
   */
  async getHeaderBuffer(e = {}) {
    const { firstDataLine: n, metaChar: i, maxBlockSize: r } = await this.getMetadata(e);
    qe(e.signal);
    const a = (n?.blockPosition || 0) + r, s = await this.filehandle.read(a, 0, e), o = await tr(s);
    if (i) {
      let f = -1;
      const c = 10, u = i.charCodeAt(0);
      for (let _ = 0; _ < o.length && !(_ === f + 1 && o[_] !== u); _ += 1)
        o[_] === c && (f = _);
      return o.subarray(0, f + 1);
    }
    return o;
  }
  /**
   * get a string containing the "header" region of the file, is the portion up
   * to the first non-meta line
   *
   * @returns {Promise} for a string
   */
  async getHeader(e = {}) {
    const n = new TextDecoder("utf8"), i = await this.getHeaderBuffer(e);
    return n.decode(i);
  }
  /**
   * get an array of reference sequence names, in the order in which they occur
   * in the file. reference sequence renaming is not applied to these names.
   */
  async getReferenceSequenceNames(e = {}) {
    return (await this.getMetadata(e)).refIdToName;
  }
  /**
   * @param {object} metadata metadata object from the parsed index, containing
   * columnNumbers, metaChar, and format
   *
   * @param {string} regionRefName
   *
   * @param {number} regionStart region start coordinate (0-based-half-open)
   *
   * @param {number} regionEnd region end coordinate (0-based-half-open)
   *
   * @param {array[string]} line
   *
   * @returns {object} like `{startCoordinate, overlaps}`. overlaps is boolean,
   * true if line is a data line that overlaps the given region
   */
  checkLine(e, n, i, r, a) {
    const { columnNumbers: s, metaChar: o, coordinateType: f, format: c } = e;
    if (o && a.startsWith(o))
      return { overlaps: !1 };
    let { ref: u, start: _, end: p } = s;
    u || (u = 0), _ || (_ = 0), p || (p = 0), c === "VCF" && (p = 8);
    const g = Math.max(u, _, p);
    let k = 1, F = 0, R = "", A = -1 / 0;
    const E = a.length;
    for (let b = 0; b < E + 1; b++)
      if (a[b] === "	" || b === E) {
        if (k === u) {
          if (this.renameRefSeq(a.slice(F, b)) !== n)
            return {
              overlaps: !1
            };
        } else if (k === _) {
          if (A = parseInt(a.slice(F, b), 10), f === "1-based-closed" && (A -= 1), A >= r)
            return {
              startCoordinate: A,
              overlaps: !1
            };
          if ((p === 0 || p === _) && A + 1 <= i)
            return {
              startCoordinate: A,
              overlaps: !1
            };
        } else if (c === "VCF" && k === 4)
          R = a.slice(F, b);
        else if (k === p && (c === "VCF" ? this._getVcfEnd(A, R, a.slice(F, b)) : Number.parseInt(a.slice(F, b), 10)) <= i)
          return {
            overlaps: !1
          };
        if (F = b + 1, k += 1, k > g)
          break;
      }
    return {
      startCoordinate: A,
      overlaps: !0
    };
  }
  _getVcfEnd(e, n, i) {
    let r = e + n.length;
    const a = i.includes("SVTYPE=TRA");
    if (i[0] !== "." && !a) {
      let s = ";";
      for (let o = 0; o < i.length; o += 1) {
        if (s === ";" && i.slice(o, o + 4) === "END=") {
          let f = i.indexOf(";", o);
          f === -1 && (f = i.length), r = parseInt(i.slice(o + 4, f), 10);
          break;
        }
        s = i[o];
      }
    } else if (a)
      return e + 1;
    return r;
  }
  /**
   * return the approximate number of data lines in the given reference
   * sequence
   *
   * @param refSeq reference sequence name
   *
   * @returns number of data lines present on that reference sequence
   */
  async lineCount(e, n = {}) {
    return this.index.lineCount(e, n);
  }
  /**
   * read and uncompress the data in a chunk (composed of one or more
   * contiguous bgzip blocks) of the file
   */
  async readChunk(e, n = {}) {
    const i = await this.filehandle.read(e.fetchedSize(), e.minv.blockPosition, n);
    return j0(i, e);
  }
}
function up(t, e, n) {
  const i = e.split("	"), r = {};
  let a = 0;
  if (t.includes("GT")) {
    const s = t.split(":");
    if (s.length === 1)
      for (const o of n)
        r[o] = i[a++];
    else {
      const o = s.indexOf("GT");
      if (o === 0)
        for (const f of n) {
          const c = i[a++], u = c.indexOf(":");
          r[f] = u !== -1 ? c.slice(0, u) : c;
        }
      else
        for (const f of n) {
          const c = i[a++].split(":");
          r[f] = c[o];
        }
    }
  }
  return r;
}
function hp(t) {
  const e = [];
  let n = "", i = !1, r = !1;
  for (const a of t)
    a === '"' ? (i = !i, n += a) : a === "[" ? (r = !0, n += a) : a === "]" ? (r = !1, n += a) : a === "," && !i && !r ? (e.push(n.trim()), n = "") : n += a;
  return n && e.push(n.trim()), e;
}
function dp(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function pp(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(hp(e).map((n) => {
    const [i, r] = dp(n, "=");
    return r && r.startsWith("[") && r.endsWith("]") ? [
      i,
      r.slice(1, -1).split(",").map((a) => a.trim())
    ] : r && r.startsWith('"') && r.endsWith('"') ? [i, r.slice(1, -1)] : [i, r?.replaceAll(/^"|"$/g, "")];
  }));
}
const _n = {
  // INFO fields
  InfoFields: {
    // from the VCF4.3 spec, https://samtools.github.io/hts-specs/VCFv4.3.pdf
    AA: { Number: 1, Type: "String", Description: "Ancestral allele" },
    AC: {
      Number: "A",
      Type: "Integer",
      Description: "Allele count in genotypes, for each ALT allele, in the same order as listed"
    },
    AD: {
      Number: "R",
      Type: "Integer",
      Description: "Total read depth for each allele"
    },
    ADF: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the forward strand"
    },
    ADR: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the reverse strand"
    },
    AF: {
      Number: "A",
      Type: "Float",
      Description: "Allele frequency for each ALT allele in the same order as listed (estimated from primary data, not called genotypes)"
    },
    AN: {
      Number: 1,
      Type: "Integer",
      Description: "Total number of alleles in called genotypes"
    },
    BQ: {
      Number: 1,
      Type: "Float",
      Description: "RMS base quality"
    },
    CIGAR: {
      Number: 1,
      Type: "Float",
      Description: "Cigar string describing how to align an alternate allele to the reference allele"
    },
    DB: {
      Number: 0,
      Type: "Flag",
      Description: "dbSNP membership"
    },
    DP: {
      Number: 1,
      Type: "Integer",
      Description: "combined depth across samples"
    },
    END: {
      Number: 1,
      Type: "Integer",
      Description: "End position (for use with symbolic alleles)"
    },
    H2: {
      Number: 0,
      Type: "Flag",
      Description: "HapMap2 membership"
    },
    H3: {
      Number: 0,
      Type: "Flag",
      Description: "HapMap3 membership"
    },
    MQ: {
      Number: 1,
      Type: null,
      Description: "RMS mapping quality"
    },
    MQ0: {
      Number: 1,
      Type: "Integer",
      Description: "Number of MAPQ == 0 reads"
    },
    NS: {
      Number: 1,
      Type: "Integer",
      Description: "Number of samples with data"
    },
    SB: {
      Number: 4,
      Type: "Integer",
      Description: "Strand bias"
    },
    SOMATIC: {
      Number: 0,
      Type: "Flag",
      Description: "Somatic mutation (for cancer genomics)"
    },
    VALIDATED: {
      Number: 0,
      Type: "Flag",
      Description: "Validated by follow-up experiment"
    },
    "1000G": {
      Number: 0,
      Type: "Flag",
      Description: "1000 Genomes membership"
    },
    // specifically for structural variants
    IMPRECISE: {
      Number: 0,
      Type: "Flag",
      Description: "Imprecise structural variation"
    },
    NOVEL: {
      Number: 0,
      Type: "Flag",
      Description: "Indicates a novel structural variation"
    },
    // For precise variants, END is POS + length of REF allele - 1,
    // and the for imprecise variants the corresponding best estimate.
    SVTYPE: {
      Number: 1,
      Type: "String",
      Description: "Type of structural variant"
    },
    // Value should be one of DEL, INS, DUP, INV, CNV, BND. This key can
    // be derived from the REF/ALT fields but is useful for filtering.
    SVLEN: {
      Number: null,
      Type: "Integer",
      Description: "Difference in length between REF and ALT alleles"
    },
    // One value for each ALT allele. Longer ALT alleles (e.g. insertions)
    // have positive values, shorter ALT alleles (e.g. deletions)
    // have negative values.
    CIPOS: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around POS for imprecise variants"
    },
    CIEND: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around END for imprecise variants"
    },
    HOMLEN: {
      Type: "Integer",
      Description: "Length of base pair identical micro-homology at event breakpoints"
    },
    HOMSEQ: {
      Type: "String",
      Description: "Sequence of base pair identical micro-homology at event breakpoints"
    },
    BKPTID: {
      Type: "String",
      Description: "ID of the assembled alternate allele in the assembly file"
    },
    // For precise variants, the consensus sequence the alternate allele assembly
    // is derivable from the REF and ALT fields. However, the alternate allele
    // assembly file may contain additional information about the characteristics
    // of the alt allele contigs.
    MEINFO: {
      Number: 4,
      Type: "String",
      Description: "Mobile element info of the form NAME,START,END,POLARITY"
    },
    METRANS: {
      Number: 4,
      Type: "String",
      Description: "Mobile element transduction info of the form CHR,START,END,POLARITY"
    },
    DGVID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in Database of Genomic Variation"
    },
    DBVARID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in DBVAR"
    },
    DBRIPID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in DBRIP"
    },
    MATEID: {
      Number: null,
      Type: "String",
      Description: "ID of mate breakends"
    },
    PARID: {
      Number: 1,
      Type: "String",
      Description: "ID of partner breakend"
    },
    EVENT: {
      Number: 1,
      Type: "String",
      Description: "ID of event associated to breakend"
    },
    CILEN: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around the inserted material between breakend"
    },
    DPADJ: { Type: "Integer", Description: "Read Depth of adjacency" },
    CN: {
      Number: 1,
      Type: "Integer",
      Description: "Copy number of segment containing breakend"
    },
    CNADJ: {
      Number: null,
      Type: "Integer",
      Description: "Copy number of adjacency"
    },
    CICN: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around copy number for the segment"
    },
    CICNADJ: {
      Number: null,
      Type: "Integer",
      Description: "Confidence interval around copy number for the adjacency"
    }
  },
  // FORMAT fields
  GenotypeFields: {
    // from the VCF4.3 spec, https://samtools.github.io/hts-specs/VCFv4.3.pdf
    AD: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele"
    },
    ADF: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the forward strand"
    },
    ADR: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the reverse strand"
    },
    DP: {
      Number: 1,
      Type: "Integer",
      Description: "Read depth"
    },
    EC: {
      Number: "A",
      Type: "Integer",
      Description: "Expected alternate allele counts"
    },
    FT: {
      Number: 1,
      Type: "String",
      Description: 'Filter indicating if this genotype was "called"'
    },
    GL: {
      Number: "G",
      Type: "Float",
      Description: "Genotype likelihoods"
    },
    GP: {
      Number: "G",
      Type: "Float",
      Description: "Genotype posterior probabilities"
    },
    GQ: {
      Number: 1,
      Type: "Integer",
      Description: "Conditional genotype quality"
    },
    GT: {
      Number: 1,
      Type: "String",
      Description: "Genotype"
    },
    HQ: {
      Number: 2,
      Type: "Integer",
      Description: "Haplotype quality"
    },
    MQ: {
      Number: 1,
      Type: "Integer",
      Description: "RMS mapping quality"
    },
    PL: {
      Number: "G",
      Type: "Integer",
      Description: "Phred-scaled genotype likelihoods rounded to the closest integer"
    },
    PQ: {
      Number: 1,
      Type: "Integer",
      Description: "Phasing quality"
    },
    PS: {
      Number: 1,
      Type: "Integer",
      Description: "Phase set"
    }
  },
  // ALT fields
  AltTypes: {
    DEL: {
      Description: "Deletion relative to the reference"
    },
    INS: {
      Description: "Insertion of novel sequence relative to the reference"
    },
    DUP: {
      Description: "Region of elevated copy number relative to the reference"
    },
    INV: {
      Description: "Inversion of reference sequence"
    },
    CNV: {
      Description: "Copy number variable region (may be both deletion and duplication)"
    },
    "DUP:TANDEM": {
      Description: "Tandem duplication"
    },
    "DEL:ME": {
      Description: "Deletion of mobile element relative to the reference"
    },
    "INS:ME": {
      Description: "Insertion of a mobile element relative to the reference"
    },
    NON_REF: {
      Description: "Represents any possible alternative allele at this location"
    },
    "*": {
      Description: "Represents any possible alternative allele at this location"
    }
  },
  // FILTER fields
  FilterTypes: {
    PASS: {
      Description: "Passed all filters"
    }
  }
};
function _p(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class gp {
  constructor({ header: e = "", strict: n = !0 }) {
    if (!e.length)
      throw new Error("empty header received");
    const i = e.split(/[\r\n]+/).filter(Boolean);
    if (!i.length)
      throw new Error("no non-empty header lines specified");
    this.strict = n, this.metadata = JSON.parse(JSON.stringify({
      INFO: _n.InfoFields,
      FORMAT: _n.GenotypeFields,
      ALT: _n.AltTypes,
      FILTER: _n.FilterTypes
    }));
    let r;
    if (i.forEach((f) => {
      if (f.startsWith("#"))
        f.startsWith("##") ? this.parseMetadata(f) : r = f;
      else throw new Error(`Bad line in header:
${f}`);
    }), !r)
      throw new Error("No format line found in header");
    const a = r.trim().split("	"), s = a.slice(0, 8), o = [
      "#CHROM",
      "POS",
      "ID",
      "REF",
      "ALT",
      "QUAL",
      "FILTER",
      "INFO"
    ];
    if (a.length < 8)
      throw new Error(`VCF header missing columns:
${r}`);
    if (s.length !== o.length || !s.every((f, c) => f === o[c]))
      throw new Error(`VCF column headers not correct:
${r}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const i = {};
    if (e) {
      const r = n.split("	"), a = e.split(":"), s = a.map((o) => {
        const f = this.getMetadata("FORMAT", o, "Type");
        return f === "Integer" || f === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const f = this.samples[o];
        i[f] = {};
        const c = r[o].split(":");
        for (let u = 0; u < c.length; u++) {
          const _ = c[u];
          i[f][a[u]] = _ === "" || _ === "." ? void 0 : _.split(",").map((p) => p === "." ? void 0 : s[u] ? +p : p);
        }
      }
    }
    return i;
  }
  /**
   * Parse a VCF metadata line (i.e. a line that starts with "##") and add its
   * properties to the object.
   *
   * @param {string} line - A line from the VCF. Supports both LF and CRLF
   * newlines.
   */
  parseMetadata(e) {
    const n = /^##(.+?)=(.*)/.exec(e.trim());
    if (!n)
      throw new Error(`Line is not a valid metadata line: ${e}`);
    const [i, r] = n.slice(1, 3), a = i;
    if (r?.startsWith("<")) {
      a in this.metadata || (this.metadata[a] = {});
      const [s, o] = this.parseStructuredMetaVal(r);
      s ? this.metadata[a][s] = o : this.metadata[a] = o;
    } else
      this.metadata[a] = r;
  }
  /**
   * Parse a VCF header structured meta string (i.e. a meta value that starts
   * with "<ID=...")
   *
   * @param {string} metaVal - The VCF metadata value
   *
   * @returns {Array} - Array with two entries, 1) a string of the metadata ID
   * and 2) an object with the other key-value pairs in the metadata
   */
  parseStructuredMetaVal(e) {
    const n = pp(e), i = n.ID;
    return delete n.ID, "Number" in n && (Number.isNaN(Number(n.Number)) || (n.Number = Number(n.Number))), [i, n];
  }
  /**
   * Get metadata filtered by the elements in args. For example, can pass
   * ('INFO', 'DP') to only get info on an metadata tag that was like
   * "##INFO=<ID=DP,...>"
   *
   * @param  {...string} args - List of metadata filter strings.
   *
   * @returns {any} An object, string, or number, depending on the filtering
   */
  getMetadata(...e) {
    let n = this.metadata;
    for (const i of e)
      if (n = n[i], !n)
        return n;
    return n;
  }
  /**
   * Parse a VCF line into an object like
   *
   * ```typescript
   * {
   *   CHROM: 'contigA',
   *   POS: 3000,
   *   ID: ['rs17883296'],
   *   REF: 'G',
   *   ALT: ['T', 'A'],
   *   QUAL: 100,
   *   FILTER: 'PASS',
   *   INFO: {
   *     NS: [3],
   *     DP: [14],
   *     AF: [0.5],
   *     DB: true,
   *     XYZ: ['5'],
   *   },
   *   SAMPLES: () => ({
   *     HG00096: {
   *       GT: ['0|0'],
   *       AP: ['0.000', '0.000'],
   *     }
   *   }),
   *   GENOTYPES: () => ({
   *     HG00096: '0|0'
   *   })
   * }
   * ```
   *
   * SAMPLES and GENOTYPES methods are functions instead of static data fields
   * because it avoids parsing the potentially long list of samples from e.g.
   * 1000 genotypes data unless requested.
   *
   * The SAMPLES function gives all info about the samples
   *
   * The GENOTYPES function only extracts the raw GT string if it exists, for
   * potentially optimized parsing by programs that need it
   *
   * @param {string} line - A string of a line from a VCF
   */
  parseLine(e) {
    let n = 0;
    for (let D = 0; n < e.length && (e[n] === "	" && (D += 1), D !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, f, c, u, _] = i, p = a, g = +s, k = o === "." ? void 0 : o.split(";"), F = f, R = c === "." ? void 0 : c.split(","), A = u === "." ? void 0 : +u, E = _ === "." ? void 0 : _.split(";"), b = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const y = i[7]?.includes("%"), S = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((D) => {
      const [T, z] = D.split("="), H = z?.split(",").map((w) => w === "." ? void 0 : w).map((w) => w && y ? _p(w) : w), C = this.getMetadata("INFO", T, "Type");
      return C === "Integer" || C === "Float" ? [
        T,
        H?.map((w) => w === void 0 ? void 0 : Number(w))
      ] : C === "Flag" ? [T, !0] : [T, H ?? !0];
    }));
    return {
      CHROM: p,
      POS: g,
      ALT: R,
      INFO: S,
      REF: F,
      FILTER: E && E.length === 1 && E[0] === "PASS" ? "PASS" : E,
      ID: k,
      QUAL: A,
      FORMAT: b,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => up(i[8] ?? "", r, this.samples)
    };
  }
}
function mp(t) {
  const e = t.split(/[[\]]/);
  if (e.length > 1) {
    const n = t.includes("[") ? "right" : "left";
    let i, r, a;
    for (const s of e)
      s && (s.includes(":") ? (a = s, i = r ? "right" : "left") : r = s);
    if (!(a && i && r))
      throw new Error(`Invalid breakend: ${t}`);
    return { MatePosition: a, Join: i, Replacement: r, MateDirection: n };
  } else {
    if (t.startsWith("."))
      return {
        Join: "left",
        SingleBreakend: !0,
        Replacement: t.slice(1)
      };
    if (t.endsWith("."))
      return {
        Join: "right",
        SingleBreakend: !0,
        Replacement: t.slice(0, -1)
      };
    if (t.startsWith("<")) {
      const n = /<(.*)>(.*)/.exec(t);
      if (!n)
        throw new Error(`failed to parse ${t}`);
      const i = n[2];
      return i ? {
        Join: "left",
        Replacement: i,
        MateDirection: "right",
        MatePosition: `<${n[1]}>:1`
      } : void 0;
    } else if (t.includes("<")) {
      const n = /(.*)<(.*)>/.exec(t);
      if (!n)
        throw new Error(`failed to parse ${t}`);
      const i = n[1];
      return i ? {
        Join: "right",
        Replacement: i,
        MateDirection: "right",
        MatePosition: `<${n[2]}>:1`
      } : void 0;
    }
  }
}
const vp = {
  DEL: "deletion",
  INS: "insertion",
  DUP: "duplication",
  INV: "inversion",
  INVDUP: "inverted_duplication",
  CNV: "copy_number_variation",
  TRA: "translocation",
  "DUP:TANDEM": "tandem_duplication",
  NON_REF: "sequence_variant",
  "*": "sequence_variant"
};
function wp(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const i = /* @__PURE__ */ new Set();
  let r = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [s, o] = fo(a, n);
    s || ([s, o] = yp(t, a)), s && o && (i.add(s), r.add(o));
  }), r.size > 1) {
    const a = [...r], s = new Set(
      a.map((o) => {
        const f = o.split("->");
        return f[1] ? f[0] : o;
      }).filter((o) => !!o)
    );
    r = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const f = a.map((c) => c.split("->").map((u) => u.trim())).map((c) => c[1] && c[0] === o ? c[1] : "").filter((c) => !!c);
        return f.length ? `${o} -> ${f.join(",")}` : o;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function fo(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = vp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? fo(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function yp(t, e) {
  if (mp(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", Ie("SNV", t, e)];
  if (e === "<INS>")
    return ["insertion", e];
  if (e === "<DEL>")
    return ["deletion", e];
  if (e === "<DUP>")
    return ["duplication", e];
  if (e === "<CNV>")
    return ["cnv", e];
  if (e === "<INV>")
    return ["inversion", e];
  if (e === "<TRA>")
    return ["translocation", e];
  if (e.includes("<"))
    return ["sv", e];
  if (t.length === e.length)
    return t.split("").reverse().join("") === e ? ["inversion", Ie("inversion", t, e)] : ["substitution", Ie("substitution", t, e)];
  if (t.length <= e.length) {
    const i = e.length - t.length, r = i.toLocaleString("en-US");
    return [
      "insertion",
      i > 5 ? `${r}bp INS` : Ie("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const i = t.length - e.length, r = i.toLocaleString("en-US");
    return [
      "deletion",
      i > 5 ? `${r}bp DEL` : Ie("deletion", t, e)
    ];
  }
  return ["indel", Ie("indel", t, e)];
}
function Ie(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function xp(t, e) {
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [f, c] = wp(n, i, e);
  return {
    refName: a,
    start: o,
    end: bp(t),
    description: c,
    type: f,
    name: s?.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function bp(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i?.includes("<TRA>"), a = e - 1;
  if (i?.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !r)
      return +o.END[0];
  }
  return a + n.length;
}
class kp {
  constructor(e) {
    this.variant = e.variant, this.parser = e.parser, this.data = xp(this.variant, this.parser), this._id = e.id;
  }
  get(e) {
    return e === "samples" ? this.variant.SAMPLES() : e === "genotypes" ? this.variant.GENOTYPES() : this.data[e] ?? this.variant[e];
  }
  parent() {
  }
  children() {
  }
  id() {
    return this._id;
  }
  toJSON() {
    const { SAMPLES: e, GENOTYPES: n, ...i } = this.variant;
    return {
      uniqueId: this._id,
      ...i,
      ...this.data,
      samples: this.variant.SAMPLES()
    };
  }
}
async function $p({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: i
}) {
  const r = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new fp({
    tbiFilehandle: n === "TBI" ? new ve(r) : void 0,
    csiFilehandle: n === "CSI" ? new ve(r) : void 0,
    filehandle: new ve(t)
  }), s = new gp({
    header: await a.getHeader()
  }), o = [];
  let f = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (c) => {
      const u = s.parseLine(c), _ = new kp({
        variant: u,
        parser: s,
        id: `${f++}`
      }), p = _.get("INFO");
      o.push({
        id: _.get("ID"),
        reference_allele: _.get("REF"),
        alternative_alleles: { values: _.get("ALT") },
        name: _.get("name"),
        seqId: _.get("refName"),
        fmin: _.get("start"),
        fmax: _.get("end"),
        strand: 1,
        source: "",
        type: Na(p.soTerm[0]) ?? _.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([g, k]) => [
            g,
            {
              values: [JSON.stringify(k.map((F) => Na(F)))]
            }
          ])
        )
      });
    }
  }), o;
}
function Na(t) {
  return t?.replace(/['"]+/g, "");
}
function Sp(t) {
  const [e, n] = t.split(":"), [i, r] = n.split("..");
  return {
    chromosome: e,
    start: +i,
    end: +r
  };
}
Te.prototype.first = function() {
  return pt(this.nodes()[0]);
};
Te.prototype.last = function() {
  return pt(this.nodes()[this.size() - 1]);
};
class Ap {
  constructor(e, n, i, r) {
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Iu();
  }
  get tracks() {
    return this.config.tracks ?? [];
  }
  get genome() {
    return this.config.genome;
  }
  closeModal() {
    for (const e of document.getElementsByClassName("gfc-tooltip"))
      e.style.visibility = "hidden";
  }
  setSelectedAlleles(e, n) {
    const i = pt(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), qi(e, i);
  }
  _initViewer(e) {
    pt(e).selectAll("*").remove();
    const n = pt(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, pt(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? ku, i = this.config.variantTypes ?? Eu, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, f = a.chromosome, c = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], _ = this.config.htpVariant ?? "", p = s.start, g = s.end;
    new Ou({
      viewer: this.viewer,
      track: {
        chromosome: f,
        start: p,
        end: g,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let R = 100;
    const A = this.config.showVariantLabel ?? !0, { viewer: E, genome: b, height: y, tracks: S } = this;
    if (!S || !Array.isArray(S))
      throw new Error(`Tracks must be an array, got: ${typeof S}`);
    S.map((D) => {
      const { variantData: T, trackData: z } = D;
      if (D.type === Pe.ISOFORM_AND_VARIANT) {
        const H = new Ru({
          viewer: E,
          height: y,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: A,
          trackData: z,
          variantData: T,
          variantFilter: c,
          binRatio: r,
          isoformFilter: u,
          geneBounds: D.geneBounds,
          geneSymbol: D.geneSymbol,
          geneId: D.geneId
        });
        R += H.DrawTrack();
      } else if (D.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const H = new Mu({
          viewer: E,
          height: y,
          width: e,
          transcriptTypes: n,
          variantData: T,
          trackData: z,
          variantTypes: i,
          showVariantLabel: A,
          variantFilter: c
        });
        R += H.DrawTrack();
      } else if (D.type === Pe.ISOFORM) {
        const H = new Lu({
          region: a,
          viewer: E,
          height: y,
          width: e,
          genome: b,
          trackData: z,
          transcriptTypes: n,
          htpVariant: _
        });
        R += H.DrawTrack();
      } else D.type === Pe.VARIANT ? new ad({
        region: a,
        viewer: E,
        range: o,
        height: y,
        width: e
      }).DrawTrack() : D.type === Pe.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: E,
        track: {
          ...D,
          range: o
        },
        height: y,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${D.type}`);
      pt(this.svg_target).attr("height", R);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, i) {
    let r = null;
    const a = 17;
    let s = 0, o = [0, 0];
    if (e === n) {
      r = 300, s = a * r, e = e - r / 2 - 1, n = n + r / 2;
      const f = (
        // @ts-expect-error
        pt("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        f - s / 2,
        f + s / 2
      ];
    } else
      return {
        range: [0, i],
        start: e,
        end: n
      };
    return {
      range: o,
      start: e,
      end: n
    };
  }
}
export {
  Ap as GenomeFeatureViewer,
  Tp as fetchApolloAPIData,
  Ep as fetchNCListData,
  $p as fetchTabixVcfData,
  Sp as parseLocString
};
