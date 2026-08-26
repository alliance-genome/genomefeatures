function xn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Io(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function qa(t) {
  let e, n, r;
  t.length !== 2 ? (e = xn, n = (o, l) => xn(t(o), l), r = (o, l) => t(o) - l) : (e = t === xn || t === Io ? t : No, n = t, r = t);
  function a(o, l, c = 0, u = o.length) {
    if (c < u) {
      if (e(l, l) !== 0) return u;
      do {
        const h = c + u >>> 1;
        n(o[h], l) < 0 ? c = h + 1 : u = h;
      } while (c < u);
    }
    return c;
  }
  function i(o, l, c = 0, u = o.length) {
    if (c < u) {
      if (e(l, l) !== 0) return u;
      do {
        const h = c + u >>> 1;
        n(o[h], l) <= 0 ? c = h + 1 : u = h;
      } while (c < u);
    }
    return c;
  }
  function s(o, l, c = 0, u = o.length) {
    const h = a(o, l, c, u - 1);
    return h > c && r(o[h - 1], l) > -r(o[h], l) ? h - 1 : h;
  }
  return { left: a, center: s, right: i };
}
function No() {
  return 0;
}
function Do(t) {
  return t === null ? NaN : +t;
}
const Ro = qa(xn), Mo = Ro.right;
qa(Do).center;
const Co = Math.sqrt(50), Lo = Math.sqrt(10), Fo = Math.sqrt(2);
function In(t, e, n) {
  const r = (e - t) / Math.max(0, n), a = Math.floor(Math.log10(r)), i = r / Math.pow(10, a), s = i >= Co ? 10 : i >= Lo ? 5 : i >= Fo ? 2 : 1;
  let o, l, c;
  return a < 0 ? (c = Math.pow(10, -a) / s, o = Math.round(t * c), l = Math.round(e * c), o / c < t && ++o, l / c > e && --l, c = -c) : (c = Math.pow(10, a) * s, o = Math.round(t / c), l = Math.round(e / c), o * c < t && ++o, l * c > e && --l), l < o && 0.5 <= n && n < 2 ? In(t, e, n * 2) : [o, l, c];
}
function Oo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [a, i, s] = r ? In(e, t, n) : In(t, e, n);
  if (!(i >= a)) return [];
  const o = i - a + 1, l = new Array(o);
  if (r)
    if (s < 0) for (let c = 0; c < o; ++c) l[c] = (i - c) / -s;
    else for (let c = 0; c < o; ++c) l[c] = (i - c) * s;
  else if (s < 0) for (let c = 0; c < o; ++c) l[c] = (a + c) / -s;
  else for (let c = 0; c < o; ++c) l[c] = (a + c) * s;
  return l;
}
function kr(t, e, n) {
  return e = +e, t = +t, n = +n, In(t, e, n)[2];
}
function zo(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, a = r ? kr(e, t, n) : kr(t, e, n);
  return (r ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function Bo(t) {
  return t;
}
var kn = 1, jn = 2, Sr = 3, cn = 4, fi = 1e-6;
function Po(t) {
  return "translate(" + t + ",0)";
}
function Ho(t) {
  return "translate(0," + t + ")";
}
function Vo(t) {
  return (e) => +t(e);
}
function qo(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Uo() {
  return !this.__axis;
}
function Ua(t, e) {
  var n = [], r = null, a = null, i = 6, s = 6, o = 3, l = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, c = t === kn || t === cn ? -1 : 1, u = t === cn || t === jn ? "x" : "y", h = t === kn || t === Sr ? Po : Ho;
  function p(m) {
    var T = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), O = a ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Bo), R = Math.max(i, 0) + o, v = e.range(), w = +v[0] + l, x = +v[v.length - 1] + l, y = (e.bandwidth ? qo : Vo)(e.copy(), l), $ = m.selection ? m.selection() : m, I = $.selectAll(".domain").data([null]), A = $.selectAll(".tick").data(T, e).order(), B = A.exit(), P = A.enter().append("g").attr("class", "tick"), z = A.select("line"), k = A.select("text");
    I = I.merge(I.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), A = A.merge(P), z = z.merge(P.append("line").attr("stroke", "currentColor").attr(u + "2", c * i)), k = k.merge(P.append("text").attr("fill", "currentColor").attr(u, c * R).attr("dy", t === kn ? "0em" : t === Sr ? "0.71em" : "0.32em")), m !== $ && (I = I.transition(m), A = A.transition(m), z = z.transition(m), k = k.transition(m), B = B.transition(m).attr("opacity", fi).attr("transform", function(q) {
      return isFinite(q = y(q)) ? h(q + l) : this.getAttribute("transform");
    }), P.attr("opacity", fi).attr("transform", function(q) {
      var V = this.parentNode.__axis;
      return h((V && isFinite(V = V(q)) ? V : y(q)) + l);
    })), B.remove(), I.attr("d", t === cn || t === jn ? s ? "M" + c * s + "," + w + "H" + l + "V" + x + "H" + c * s : "M" + l + "," + w + "V" + x : s ? "M" + w + "," + c * s + "V" + l + "H" + x + "V" + c * s : "M" + w + "," + l + "H" + x), A.attr("opacity", 1).attr("transform", function(q) {
      return h(y(q) + l);
    }), z.attr(u + "2", c * i), k.attr(u, c * R).text(O), $.filter(Uo).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === jn ? "start" : t === cn ? "end" : "middle"), $.each(function() {
      this.__axis = y;
    });
  }
  return p.scale = function(m) {
    return arguments.length ? (e = m, p) : e;
  }, p.ticks = function() {
    return n = Array.from(arguments), p;
  }, p.tickArguments = function(m) {
    return arguments.length ? (n = m == null ? [] : Array.from(m), p) : n.slice();
  }, p.tickValues = function(m) {
    return arguments.length ? (r = m == null ? null : Array.from(m), p) : r && r.slice();
  }, p.tickFormat = function(m) {
    return arguments.length ? (a = m, p) : a;
  }, p.tickSize = function(m) {
    return arguments.length ? (i = s = +m, p) : i;
  }, p.tickSizeInner = function(m) {
    return arguments.length ? (i = +m, p) : i;
  }, p.tickSizeOuter = function(m) {
    return arguments.length ? (s = +m, p) : s;
  }, p.tickPadding = function(m) {
    return arguments.length ? (o = +m, p) : o;
  }, p.offset = function(m) {
    return arguments.length ? (l = +m, p) : l;
  }, p;
}
function ui(t) {
  return Ua(kn, t);
}
function Go(t) {
  return Ua(Sr, t);
}
var Zo = { value: () => {
} };
function Ga() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Sn(n);
}
function Sn(t) {
  this._ = t;
}
function Wo(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", a = n.indexOf(".");
    if (a >= 0 && (r = n.slice(a + 1), n = n.slice(0, a)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Sn.prototype = Ga.prototype = {
  constructor: Sn,
  on: function(t, e) {
    var n = this._, r = Wo(t + "", n), a, i = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((a = (t = r[i]).type) && (a = Xo(n[a], t.name))) return a;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++i < s; )
      if (a = (t = r[i]).type) n[a] = hi(n[a], t.name, e);
      else if (e == null) for (a in n) n[a] = hi(n[a], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Sn(t);
  },
  call: function(t, e) {
    if ((a = arguments.length - 2) > 0) for (var n = new Array(a), r = 0, a, i; r < a; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (i = this._[t], r = 0, a = i.length; r < a; ++r) i[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], a = 0, i = r.length; a < i; ++a) r[a].value.apply(e, n);
  }
};
function Xo(t, e) {
  for (var n = 0, r = t.length, a; n < r; ++n)
    if ((a = t[n]).name === e)
      return a.value;
}
function hi(t, e, n) {
  for (var r = 0, a = t.length; r < a; ++r)
    if (t[r].name === e) {
      t[r] = Zo, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Tr = "http://www.w3.org/1999/xhtml";
const di = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Tr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Gn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), di.hasOwnProperty(e) ? { space: di[e], local: t } : t;
}
function Ko(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Tr && e.documentElement.namespaceURI === Tr ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Yo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Za(t) {
  var e = Gn(t);
  return (e.local ? Yo : Ko)(e);
}
function Jo() {
}
function Vr(t) {
  return t == null ? Jo : function() {
    return this.querySelector(t);
  };
}
function Qo(t) {
  typeof t != "function" && (t = Vr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
    for (var i = e[a], s = i.length, o = r[a] = new Array(s), l, c, u = 0; u < s; ++u)
      (l = i[u]) && (c = t.call(l, l.__data__, u, i)) && ("__data__" in l && (c.__data__ = l.__data__), o[u] = c);
  return new Ht(r, this._parents);
}
function Wa(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function jo() {
  return [];
}
function Xa(t) {
  return t == null ? jo : function() {
    return this.querySelectorAll(t);
  };
}
function tl(t) {
  return function() {
    return Wa(t.apply(this, arguments));
  };
}
function el(t) {
  typeof t == "function" ? t = tl(t) : t = Xa(t);
  for (var e = this._groups, n = e.length, r = [], a = [], i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l, c = 0; c < o; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), a.push(l));
  return new Ht(r, a);
}
function Ka(t) {
  return function() {
    return this.matches(t);
  };
}
function Ya(t) {
  return function(e) {
    return e.matches(t);
  };
}
var nl = Array.prototype.find;
function rl(t) {
  return function() {
    return nl.call(this.children, t);
  };
}
function il() {
  return this.firstElementChild;
}
function al(t) {
  return this.select(t == null ? il : rl(typeof t == "function" ? t : Ya(t)));
}
var sl = Array.prototype.filter;
function ol() {
  return Array.from(this.children);
}
function ll(t) {
  return function() {
    return sl.call(this.children, t);
  };
}
function cl(t) {
  return this.selectAll(t == null ? ol : ll(typeof t == "function" ? t : Ya(t)));
}
function fl(t) {
  typeof t != "function" && (t = Ka(t));
  for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
    for (var i = e[a], s = i.length, o = r[a] = [], l, c = 0; c < s; ++c)
      (l = i[c]) && t.call(l, l.__data__, c, i) && o.push(l);
  return new Ht(r, this._parents);
}
function Ja(t) {
  return new Array(t.length);
}
function ul() {
  return new Ht(this._enter || this._groups.map(Ja), this._parents);
}
function Nn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Nn.prototype = {
  constructor: Nn,
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
function hl(t) {
  return function() {
    return t;
  };
}
function dl(t, e, n, r, a, i) {
  for (var s = 0, o, l = e.length, c = i.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = i[s], r[s] = o) : n[s] = new Nn(t, i[s]);
  for (; s < l; ++s)
    (o = e[s]) && (a[s] = o);
}
function pl(t, e, n, r, a, i, s) {
  var o, l, c = /* @__PURE__ */ new Map(), u = e.length, h = i.length, p = new Array(u), m;
  for (o = 0; o < u; ++o)
    (l = e[o]) && (p[o] = m = s.call(l, l.__data__, o, e) + "", c.has(m) ? a[o] = l : c.set(m, l));
  for (o = 0; o < h; ++o)
    m = s.call(t, i[o], o, i) + "", (l = c.get(m)) ? (r[o] = l, l.__data__ = i[o], c.delete(m)) : n[o] = new Nn(t, i[o]);
  for (o = 0; o < u; ++o)
    (l = e[o]) && c.get(p[o]) === l && (a[o] = l);
}
function _l(t) {
  return t.__data__;
}
function ml(t, e) {
  if (!arguments.length) return Array.from(this, _l);
  var n = e ? pl : dl, r = this._parents, a = this._groups;
  typeof t != "function" && (t = hl(t));
  for (var i = a.length, s = new Array(i), o = new Array(i), l = new Array(i), c = 0; c < i; ++c) {
    var u = r[c], h = a[c], p = h.length, m = gl(t.call(u, u && u.__data__, c, r)), T = m.length, O = o[c] = new Array(T), R = s[c] = new Array(T), v = l[c] = new Array(p);
    n(u, h, O, R, v, m, e);
    for (var w = 0, x = 0, y, $; w < T; ++w)
      if (y = O[w]) {
        for (w >= x && (x = w + 1); !($ = R[x]) && ++x < T; ) ;
        y._next = $ || null;
      }
  }
  return s = new Ht(s, r), s._enter = o, s._exit = l, s;
}
function gl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function vl() {
  return new Ht(this._exit || this._groups.map(Ja), this._parents);
}
function wl(t, e, n) {
  var r = this.enter(), a = this, i = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (a = e(a), a && (a = a.selection())), n == null ? i.remove() : n(i), r && a ? r.merge(a).order() : a;
}
function yl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, a = n.length, i = r.length, s = Math.min(a, i), o = new Array(a), l = 0; l < s; ++l)
    for (var c = n[l], u = r[l], h = c.length, p = o[l] = new Array(h), m, T = 0; T < h; ++T)
      (m = c[T] || u[T]) && (p[T] = m);
  for (; l < a; ++l)
    o[l] = n[l];
  return new Ht(o, this._parents);
}
function bl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], a = r.length - 1, i = r[a], s; --a >= 0; )
      (s = r[a]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function xl(t) {
  t || (t = kl);
  function e(h, p) {
    return h && p ? t(h.__data__, p.__data__) : !h - !p;
  }
  for (var n = this._groups, r = n.length, a = new Array(r), i = 0; i < r; ++i) {
    for (var s = n[i], o = s.length, l = a[i] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new Ht(a, this._parents).order();
}
function kl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Sl() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Tl() {
  return Array.from(this);
}
function El() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], a = 0, i = r.length; a < i; ++a) {
      var s = r[a];
      if (s) return s;
    }
  return null;
}
function Al() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function $l() {
  return !this.node();
}
function Il(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var a = e[n], i = 0, s = a.length, o; i < s; ++i)
      (o = a[i]) && t.call(o, o.__data__, i, a);
  return this;
}
function Nl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Rl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ml(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Cl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ll(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Fl(t, e) {
  var n = Gn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Dl : Nl : typeof e == "function" ? n.local ? Ll : Cl : n.local ? Ml : Rl)(n, e));
}
function Qa(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ol(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function zl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Bl(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Pl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ol : typeof e == "function" ? Bl : zl)(t, e, n ?? "")) : Pe(this.node(), t);
}
function Pe(t, e) {
  return t.style.getPropertyValue(e) || Qa(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Hl(t) {
  return function() {
    delete this[t];
  };
}
function Vl(t, e) {
  return function() {
    this[t] = e;
  };
}
function ql(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ul(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Hl : typeof e == "function" ? ql : Vl)(t, e)) : this.node()[t];
}
function ja(t) {
  return t.trim().split(/^|\s+/);
}
function qr(t) {
  return t.classList || new ts(t);
}
function ts(t) {
  this._node = t, this._names = ja(t.getAttribute("class") || "");
}
ts.prototype = {
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
function es(t, e) {
  for (var n = qr(t), r = -1, a = e.length; ++r < a; ) n.add(e[r]);
}
function ns(t, e) {
  for (var n = qr(t), r = -1, a = e.length; ++r < a; ) n.remove(e[r]);
}
function Gl(t) {
  return function() {
    es(this, t);
  };
}
function Zl(t) {
  return function() {
    ns(this, t);
  };
}
function Wl(t, e) {
  return function() {
    (e.apply(this, arguments) ? es : ns)(this, t);
  };
}
function Xl(t, e) {
  var n = ja(t + "");
  if (arguments.length < 2) {
    for (var r = qr(this.node()), a = -1, i = n.length; ++a < i; ) if (!r.contains(n[a])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Wl : e ? Gl : Zl)(n, e));
}
function Kl() {
  this.textContent = "";
}
function Yl(t) {
  return function() {
    this.textContent = t;
  };
}
function Jl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ql(t) {
  return arguments.length ? this.each(t == null ? Kl : (typeof t == "function" ? Jl : Yl)(t)) : this.node().textContent;
}
function jl() {
  this.innerHTML = "";
}
function tc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function ec(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function nc(t) {
  return arguments.length ? this.each(t == null ? jl : (typeof t == "function" ? ec : tc)(t)) : this.node().innerHTML;
}
function rc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ic() {
  return this.each(rc);
}
function ac() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function sc() {
  return this.each(ac);
}
function oc(t) {
  var e = typeof t == "function" ? t : Za(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function lc() {
  return null;
}
function cc(t, e) {
  var n = typeof t == "function" ? t : Za(t), r = e == null ? lc : typeof e == "function" ? e : Vr(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function fc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function uc() {
  return this.each(fc);
}
function hc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function dc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function pc(t) {
  return this.select(t ? dc : hc);
}
function _c(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function mc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function gc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function vc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, a = e.length, i; n < a; ++n)
        i = e[n], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.options) : e[++r] = i;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function wc(t, e, n) {
  return function() {
    var r = this.__on, a, i = mc(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((a = r[s]).type === t.type && a.name === t.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = i, a.options = n), a.value = e;
          return;
        }
    }
    this.addEventListener(t.type, i, n), a = { type: t.type, name: t.name, value: e, listener: i, options: n }, r ? r.push(a) : this.__on = [a];
  };
}
function yc(t, e, n) {
  var r = gc(t + ""), a, i = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var l = 0, c = o.length, u; l < c; ++l)
        for (a = 0, u = o[l]; a < i; ++a)
          if ((s = r[a]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? wc : vc, a = 0; a < i; ++a) this.each(o(r[a], e, n));
  return this;
}
function rs(t, e, n) {
  var r = Qa(t), a = r.CustomEvent;
  typeof a == "function" ? a = new a(e, n) : (a = r.document.createEvent("Event"), n ? (a.initEvent(e, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(e, !1, !1)), t.dispatchEvent(a);
}
function bc(t, e) {
  return function() {
    return rs(this, t, e);
  };
}
function xc(t, e) {
  return function() {
    return rs(this, t, e.apply(this, arguments));
  };
}
function kc(t, e) {
  return this.each((typeof e == "function" ? xc : bc)(t, e));
}
function* Sc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], a = 0, i = r.length, s; a < i; ++a)
      (s = r[a]) && (yield s);
}
var Ur = [null];
function Ht(t, e) {
  this._groups = t, this._parents = e;
}
function Ne() {
  return new Ht([[document.documentElement]], Ur);
}
function Tc() {
  return this;
}
Ht.prototype = Ne.prototype = {
  constructor: Ht,
  select: Qo,
  selectAll: el,
  selectChild: al,
  selectChildren: cl,
  filter: fl,
  data: ml,
  enter: ul,
  exit: vl,
  join: wl,
  merge: yl,
  selection: Tc,
  order: bl,
  sort: xl,
  call: Sl,
  nodes: Tl,
  node: El,
  size: Al,
  empty: $l,
  each: Il,
  attr: Fl,
  style: Pl,
  property: Ul,
  classed: Xl,
  text: Ql,
  html: nc,
  raise: ic,
  lower: sc,
  append: oc,
  insert: cc,
  remove: uc,
  clone: pc,
  datum: _c,
  on: yc,
  dispatch: kc,
  [Symbol.iterator]: Sc
};
function ht(t) {
  return typeof t == "string" ? new Ht([[document.querySelector(t)]], [document.documentElement]) : new Ht([[t]], Ur);
}
function Er(t) {
  return typeof t == "string" ? new Ht([document.querySelectorAll(t)], [document.documentElement]) : new Ht([Wa(t)], Ur);
}
function Gr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function is(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function sn() {
}
var tn = 0.7, Dn = 1 / tn, ze = "\\s*([+-]?\\d+)\\s*", en = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", se = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ec = /^#([0-9a-f]{3,8})$/, Ac = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), $c = new RegExp(`^rgb\\(${se},${se},${se}\\)$`), Ic = new RegExp(`^rgba\\(${ze},${ze},${ze},${en}\\)$`), Nc = new RegExp(`^rgba\\(${se},${se},${se},${en}\\)$`), Dc = new RegExp(`^hsl\\(${en},${se},${se}\\)$`), Rc = new RegExp(`^hsla\\(${en},${se},${se},${en}\\)$`), pi = {
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
Gr(sn, Ee, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _i,
  // Deprecated! Use color.formatHex.
  formatHex: _i,
  formatHex8: Mc,
  formatHsl: Cc,
  formatRgb: mi,
  toString: mi
});
function _i() {
  return this.rgb().formatHex();
}
function Mc() {
  return this.rgb().formatHex8();
}
function Cc() {
  return as(this).formatHsl();
}
function mi() {
  return this.rgb().formatRgb();
}
function Ee(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ec.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? gi(e) : n === 3 ? new qt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? fn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? fn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ac.exec(t)) ? new qt(e[1], e[2], e[3], 1) : (e = $c.exec(t)) ? new qt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ic.exec(t)) ? fn(e[1], e[2], e[3], e[4]) : (e = Nc.exec(t)) ? fn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Dc.exec(t)) ? yi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Rc.exec(t)) ? yi(e[1], e[2] / 100, e[3] / 100, e[4]) : pi.hasOwnProperty(t) ? gi(pi[t]) : t === "transparent" ? new qt(NaN, NaN, NaN, 0) : null;
}
function gi(t) {
  return new qt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fn(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new qt(t, e, n, r);
}
function Lc(t) {
  return t instanceof sn || (t = Ee(t)), t ? (t = t.rgb(), new qt(t.r, t.g, t.b, t.opacity)) : new qt();
}
function Ar(t, e, n, r) {
  return arguments.length === 1 ? Lc(t) : new qt(t, e, n, r ?? 1);
}
function qt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Gr(qt, Ar, is(sn, {
  brighter(t) {
    return t = t == null ? Dn : Math.pow(Dn, t), new qt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? tn : Math.pow(tn, t), new qt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new qt(Se(this.r), Se(this.g), Se(this.b), Rn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: vi,
  // Deprecated! Use color.formatHex.
  formatHex: vi,
  formatHex8: Fc,
  formatRgb: wi,
  toString: wi
}));
function vi() {
  return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}`;
}
function Fc() {
  return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}${ke((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wi() {
  const t = Rn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Se(this.r)}, ${Se(this.g)}, ${Se(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Rn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Se(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ke(t) {
  return t = Se(t), (t < 16 ? "0" : "") + t.toString(16);
}
function yi(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ee(t, e, n, r);
}
function as(t) {
  if (t instanceof ee) return new ee(t.h, t.s, t.l, t.opacity);
  if (t instanceof sn || (t = Ee(t)), !t) return new ee();
  if (t instanceof ee) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, a = Math.min(e, n, r), i = Math.max(e, n, r), s = NaN, o = i - a, l = (i + a) / 2;
  return o ? (e === i ? s = (n - r) / o + (n < r) * 6 : n === i ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= l < 0.5 ? i + a : 2 - i - a, s *= 60) : o = l > 0 && l < 1 ? 0 : s, new ee(s, o, l, t.opacity);
}
function Oc(t, e, n, r) {
  return arguments.length === 1 ? as(t) : new ee(t, e, n, r ?? 1);
}
function ee(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Gr(ee, Oc, is(sn, {
  brighter(t) {
    return t = t == null ? Dn : Math.pow(Dn, t), new ee(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? tn : Math.pow(tn, t), new ee(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, a = 2 * n - r;
    return new qt(
      tr(t >= 240 ? t - 240 : t + 120, a, r),
      tr(t, a, r),
      tr(t < 120 ? t + 240 : t - 120, a, r),
      this.opacity
    );
  },
  clamp() {
    return new ee(bi(this.h), un(this.s), un(this.l), Rn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Rn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${bi(this.h)}, ${un(this.s) * 100}%, ${un(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function bi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function un(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function tr(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Zr = (t) => () => t;
function zc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Bc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Pc(t) {
  return (t = +t) == 1 ? ss : function(e, n) {
    return n - e ? Bc(e, n, t) : Zr(isNaN(e) ? n : e);
  };
}
function ss(t, e) {
  var n = e - t;
  return n ? zc(t, n) : Zr(isNaN(t) ? e : t);
}
const Mn = function t(e) {
  var n = Pc(e);
  function r(a, i) {
    var s = n((a = Ar(a)).r, (i = Ar(i)).r), o = n(a.g, i.g), l = n(a.b, i.b), c = ss(a.opacity, i.opacity);
    return function(u) {
      return a.r = s(u), a.g = o(u), a.b = l(u), a.opacity = c(u), a + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Hc(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), a;
  return function(i) {
    for (a = 0; a < n; ++a) r[a] = t[a] * (1 - i) + e[a] * i;
    return r;
  };
}
function Vc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function qc(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, a = new Array(r), i = new Array(n), s;
  for (s = 0; s < r; ++s) a[s] = Wr(t[s], e[s]);
  for (; s < n; ++s) i[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s) i[s] = a[s](o);
    return i;
  };
}
function Uc(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function te(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Gc(t, e) {
  var n = {}, r = {}, a;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (a in e)
    a in t ? n[a] = Wr(t[a], e[a]) : r[a] = e[a];
  return function(i) {
    for (a in n) r[a] = n[a](i);
    return r;
  };
}
var $r = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, er = new RegExp($r.source, "g");
function Zc(t) {
  return function() {
    return t;
  };
}
function Wc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function os(t, e) {
  var n = $r.lastIndex = er.lastIndex = 0, r, a, i, s = -1, o = [], l = [];
  for (t = t + "", e = e + ""; (r = $r.exec(t)) && (a = er.exec(e)); )
    (i = a.index) > n && (i = e.slice(n, i), o[s] ? o[s] += i : o[++s] = i), (r = r[0]) === (a = a[0]) ? o[s] ? o[s] += a : o[++s] = a : (o[++s] = null, l.push({ i: s, x: te(r, a) })), n = er.lastIndex;
  return n < e.length && (i = e.slice(n), o[s] ? o[s] += i : o[++s] = i), o.length < 2 ? l[0] ? Wc(l[0].x) : Zc(e) : (e = l.length, function(c) {
    for (var u = 0, h; u < e; ++u) o[(h = l[u]).i] = h.x(c);
    return o.join("");
  });
}
function Wr(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Zr(e) : (n === "number" ? te : n === "string" ? (r = Ee(e)) ? (e = r, Mn) : os : e instanceof Ee ? Mn : e instanceof Date ? Uc : Vc(e) ? Hc : Array.isArray(e) ? qc : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Gc : te)(t, e);
}
function Xc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var xi = 180 / Math.PI, Ir = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ls(t, e, n, r, a, i) {
  var s, o, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * r) && (n -= t * l, r -= e * l), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, l /= o), t * r < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: a,
    translateY: i,
    rotate: Math.atan2(e, t) * xi,
    skewX: Math.atan(l) * xi,
    scaleX: s,
    scaleY: o
  };
}
var hn;
function Kc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ir : ls(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Yc(t) {
  return t == null || (hn || (hn = document.createElementNS("http://www.w3.org/2000/svg", "g")), hn.setAttribute("transform", t), !(t = hn.transform.baseVal.consolidate())) ? Ir : (t = t.matrix, ls(t.a, t.b, t.c, t.d, t.e, t.f));
}
function cs(t, e, n, r) {
  function a(c) {
    return c.length ? c.pop() + " " : "";
  }
  function i(c, u, h, p, m, T) {
    if (c !== h || u !== p) {
      var O = m.push("translate(", null, e, null, n);
      T.push({ i: O - 4, x: te(c, h) }, { i: O - 2, x: te(u, p) });
    } else (h || p) && m.push("translate(" + h + e + p + n);
  }
  function s(c, u, h, p) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), p.push({ i: h.push(a(h) + "rotate(", null, r) - 2, x: te(c, u) })) : u && h.push(a(h) + "rotate(" + u + r);
  }
  function o(c, u, h, p) {
    c !== u ? p.push({ i: h.push(a(h) + "skewX(", null, r) - 2, x: te(c, u) }) : u && h.push(a(h) + "skewX(" + u + r);
  }
  function l(c, u, h, p, m, T) {
    if (c !== h || u !== p) {
      var O = m.push(a(m) + "scale(", null, ",", null, ")");
      T.push({ i: O - 4, x: te(c, h) }, { i: O - 2, x: te(u, p) });
    } else (h !== 1 || p !== 1) && m.push(a(m) + "scale(" + h + "," + p + ")");
  }
  return function(c, u) {
    var h = [], p = [];
    return c = t(c), u = t(u), i(c.translateX, c.translateY, u.translateX, u.translateY, h, p), s(c.rotate, u.rotate, h, p), o(c.skewX, u.skewX, h, p), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, p), c = u = null, function(m) {
      for (var T = -1, O = p.length, R; ++T < O; ) h[(R = p[T]).i] = R.x(m);
      return h.join("");
    };
  };
}
var Jc = cs(Kc, "px, ", "px)", "deg)"), Qc = cs(Yc, ", ", ")", ")"), He = 0, Xe = 0, Ge = 0, fs = 1e3, Cn, Ke, Ln = 0, Ae = 0, Zn = 0, nn = typeof performance == "object" && performance.now ? performance : Date, us = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Xr() {
  return Ae || (us(jc), Ae = nn.now() + Zn);
}
function jc() {
  Ae = 0;
}
function Fn() {
  this._call = this._time = this._next = null;
}
Fn.prototype = hs.prototype = {
  constructor: Fn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Xr() : +n) + (e == null ? 0 : +e), !this._next && Ke !== this && (Ke ? Ke._next = this : Cn = this, Ke = this), this._call = t, this._time = n, Nr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Nr());
  }
};
function hs(t, e, n) {
  var r = new Fn();
  return r.restart(t, e, n), r;
}
function tf() {
  Xr(), ++He;
  for (var t = Cn, e; t; )
    (e = Ae - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --He;
}
function ki() {
  Ae = (Ln = nn.now()) + Zn, He = Xe = 0;
  try {
    tf();
  } finally {
    He = 0, nf(), Ae = 0;
  }
}
function ef() {
  var t = nn.now(), e = t - Ln;
  e > fs && (Zn -= e, Ln = t);
}
function nf() {
  for (var t, e = Cn, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Cn = n);
  Ke = t, Nr(r);
}
function Nr(t) {
  if (!He) {
    Xe && (Xe = clearTimeout(Xe));
    var e = t - Ae;
    e > 24 ? (t < 1 / 0 && (Xe = setTimeout(ki, t - nn.now() - Zn)), Ge && (Ge = clearInterval(Ge))) : (Ge || (Ln = nn.now(), Ge = setInterval(ef, fs)), He = 1, us(ki));
  }
}
function Si(t, e, n) {
  var r = new Fn();
  return e = e == null ? 0 : +e, r.restart((a) => {
    r.stop(), t(a + e);
  }, e, n), r;
}
var rf = Ga("start", "end", "cancel", "interrupt"), af = [], ds = 0, Ti = 1, Dr = 2, Tn = 3, Ei = 4, Rr = 5, En = 6;
function Wn(t, e, n, r, a, i) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  sf(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: a,
    // For context during callback.
    on: rf,
    tween: af,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: ds
  });
}
function Kr(t, e) {
  var n = ne(t, e);
  if (n.state > ds) throw new Error("too late; already scheduled");
  return n;
}
function oe(t, e) {
  var n = ne(t, e);
  if (n.state > Tn) throw new Error("too late; already running");
  return n;
}
function ne(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function sf(t, e, n) {
  var r = t.__transition, a;
  r[e] = n, n.timer = hs(i, 0, n.time);
  function i(c) {
    n.state = Ti, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, h, p, m;
    if (n.state !== Ti) return l();
    for (u in r)
      if (m = r[u], m.name === n.name) {
        if (m.state === Tn) return Si(s);
        m.state === Ei ? (m.state = En, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[u]) : +u < e && (m.state = En, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[u]);
      }
    if (Si(function() {
      n.state === Tn && (n.state = Ei, n.timer.restart(o, n.delay, n.time), o(c));
    }), n.state = Dr, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Dr) {
      for (n.state = Tn, a = new Array(p = n.tween.length), u = 0, h = -1; u < p; ++u)
        (m = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (a[++h] = m);
      a.length = h + 1;
    }
  }
  function o(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = Rr, 1), h = -1, p = a.length; ++h < p; )
      a[h].call(t, u);
    n.state === Rr && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = En, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function of(t, e) {
  var n = t.__transition, r, a, i = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        i = !1;
        continue;
      }
      a = r.state > Dr && r.state < Rr, r.state = En, r.timer.stop(), r.on.call(a ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    i && delete t.__transition;
  }
}
function lf(t) {
  return this.each(function() {
    of(this, t);
  });
}
function cf(t, e) {
  var n, r;
  return function() {
    var a = oe(this, t), i = a.tween;
    if (i !== n) {
      r = n = i;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    a.tween = r;
  };
}
function ff(t, e, n) {
  var r, a;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = oe(this, t), s = i.tween;
    if (s !== r) {
      a = (r = s).slice();
      for (var o = { name: e, value: n }, l = 0, c = a.length; l < c; ++l)
        if (a[l].name === e) {
          a[l] = o;
          break;
        }
      l === c && a.push(o);
    }
    i.tween = a;
  };
}
function uf(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = ne(this.node(), n).tween, a = 0, i = r.length, s; a < i; ++a)
      if ((s = r[a]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? cf : ff)(n, t, e));
}
function Yr(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var a = oe(this, r);
    (a.value || (a.value = {}))[e] = n.apply(this, arguments);
  }), function(a) {
    return ne(a, r).value[e];
  };
}
function ps(t, e) {
  var n;
  return (typeof e == "number" ? te : e instanceof Ee ? Mn : (n = Ee(e)) ? (e = n, Mn) : os)(t, e);
}
function hf(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function df(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function pf(t, e, n) {
  var r, a = n + "", i;
  return function() {
    var s = this.getAttribute(t);
    return s === a ? null : s === r ? i : i = e(r = s, n);
  };
}
function _f(t, e, n) {
  var r, a = n + "", i;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === a ? null : s === r ? i : i = e(r = s, n);
  };
}
function mf(t, e, n) {
  var r, a, i;
  return function() {
    var s, o = n(this), l;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = o + "", s === l ? null : s === r && l === a ? i : (a = l, i = e(r = s, o)));
  };
}
function gf(t, e, n) {
  var r, a, i;
  return function() {
    var s, o = n(this), l;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = o + "", s === l ? null : s === r && l === a ? i : (a = l, i = e(r = s, o)));
  };
}
function vf(t, e) {
  var n = Gn(t), r = n === "transform" ? Qc : ps;
  return this.attrTween(t, typeof e == "function" ? (n.local ? gf : mf)(n, r, Yr(this, "attr." + t, e)) : e == null ? (n.local ? df : hf)(n) : (n.local ? _f : pf)(n, r, e));
}
function wf(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function yf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function bf(t, e) {
  var n, r;
  function a() {
    var i = e.apply(this, arguments);
    return i !== r && (n = (r = i) && yf(t, i)), n;
  }
  return a._value = e, a;
}
function xf(t, e) {
  var n, r;
  function a() {
    var i = e.apply(this, arguments);
    return i !== r && (n = (r = i) && wf(t, i)), n;
  }
  return a._value = e, a;
}
function kf(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Gn(t);
  return this.tween(n, (r.local ? bf : xf)(r, e));
}
function Sf(t, e) {
  return function() {
    Kr(this, t).delay = +e.apply(this, arguments);
  };
}
function Tf(t, e) {
  return e = +e, function() {
    Kr(this, t).delay = e;
  };
}
function Ef(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Sf : Tf)(e, t)) : ne(this.node(), e).delay;
}
function Af(t, e) {
  return function() {
    oe(this, t).duration = +e.apply(this, arguments);
  };
}
function $f(t, e) {
  return e = +e, function() {
    oe(this, t).duration = e;
  };
}
function If(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Af : $f)(e, t)) : ne(this.node(), e).duration;
}
function Nf(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    oe(this, t).ease = e;
  };
}
function Df(t) {
  var e = this._id;
  return arguments.length ? this.each(Nf(e, t)) : ne(this.node(), e).ease;
}
function Rf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    oe(this, t).ease = n;
  };
}
function Mf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Rf(this._id, t));
}
function Cf(t) {
  typeof t != "function" && (t = Ka(t));
  for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
    for (var i = e[a], s = i.length, o = r[a] = [], l, c = 0; c < s; ++c)
      (l = i[c]) && t.call(l, l.__data__, c, i) && o.push(l);
  return new de(r, this._parents, this._name, this._id);
}
function Lf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, a = n.length, i = Math.min(r, a), s = new Array(r), o = 0; o < i; ++o)
    for (var l = e[o], c = n[o], u = l.length, h = s[o] = new Array(u), p, m = 0; m < u; ++m)
      (p = l[m] || c[m]) && (h[m] = p);
  for (; o < r; ++o)
    s[o] = e[o];
  return new de(s, this._parents, this._name, this._id);
}
function Ff(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Of(t, e, n) {
  var r, a, i = Ff(e) ? Kr : oe;
  return function() {
    var s = i(this, t), o = s.on;
    o !== r && (a = (r = o).copy()).on(e, n), s.on = a;
  };
}
function zf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ne(this.node(), n).on.on(t) : this.each(Of(n, t, e));
}
function Bf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Pf() {
  return this.on("end.remove", Bf(this._id));
}
function Hf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Vr(t));
  for (var r = this._groups, a = r.length, i = new Array(a), s = 0; s < a; ++s)
    for (var o = r[s], l = o.length, c = i[s] = new Array(l), u, h, p = 0; p < l; ++p)
      (u = o[p]) && (h = t.call(u, u.__data__, p, o)) && ("__data__" in u && (h.__data__ = u.__data__), c[p] = h, Wn(c[p], e, n, p, c, ne(u, n)));
  return new de(i, this._parents, e, n);
}
function Vf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Xa(t));
  for (var r = this._groups, a = r.length, i = [], s = [], o = 0; o < a; ++o)
    for (var l = r[o], c = l.length, u, h = 0; h < c; ++h)
      if (u = l[h]) {
        for (var p = t.call(u, u.__data__, h, l), m, T = ne(u, n), O = 0, R = p.length; O < R; ++O)
          (m = p[O]) && Wn(m, e, n, O, p, T);
        i.push(p), s.push(u);
      }
  return new de(i, s, e, n);
}
var qf = Ne.prototype.constructor;
function Uf() {
  return new qf(this._groups, this._parents);
}
function Gf(t, e) {
  var n, r, a;
  return function() {
    var i = Pe(this, t), s = (this.style.removeProperty(t), Pe(this, t));
    return i === s ? null : i === n && s === r ? a : a = e(n = i, r = s);
  };
}
function _s(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Zf(t, e, n) {
  var r, a = n + "", i;
  return function() {
    var s = Pe(this, t);
    return s === a ? null : s === r ? i : i = e(r = s, n);
  };
}
function Wf(t, e, n) {
  var r, a, i;
  return function() {
    var s = Pe(this, t), o = n(this), l = o + "";
    return o == null && (l = o = (this.style.removeProperty(t), Pe(this, t))), s === l ? null : s === r && l === a ? i : (a = l, i = e(r = s, o));
  };
}
function Xf(t, e) {
  var n, r, a, i = "style." + e, s = "end." + i, o;
  return function() {
    var l = oe(this, t), c = l.on, u = l.value[i] == null ? o || (o = _s(e)) : void 0;
    (c !== n || a !== u) && (r = (n = c).copy()).on(s, a = u), l.on = r;
  };
}
function Kf(t, e, n) {
  var r = (t += "") == "transform" ? Jc : ps;
  return e == null ? this.styleTween(t, Gf(t, r)).on("end.style." + t, _s(t)) : typeof e == "function" ? this.styleTween(t, Wf(t, r, Yr(this, "style." + t, e))).each(Xf(this._id, t)) : this.styleTween(t, Zf(t, r, e), n).on("end.style." + t, null);
}
function Yf(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Jf(t, e, n) {
  var r, a;
  function i() {
    var s = e.apply(this, arguments);
    return s !== a && (r = (a = s) && Yf(t, s, n)), r;
  }
  return i._value = e, i;
}
function Qf(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Jf(t, e, n ?? ""));
}
function jf(t) {
  return function() {
    this.textContent = t;
  };
}
function tu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function eu(t) {
  return this.tween("text", typeof t == "function" ? tu(Yr(this, "text", t)) : jf(t == null ? "" : t + ""));
}
function nu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ru(t) {
  var e, n;
  function r() {
    var a = t.apply(this, arguments);
    return a !== n && (e = (n = a) && nu(a)), e;
  }
  return r._value = t, r;
}
function iu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ru(t));
}
function au() {
  for (var t = this._name, e = this._id, n = ms(), r = this._groups, a = r.length, i = 0; i < a; ++i)
    for (var s = r[i], o = s.length, l, c = 0; c < o; ++c)
      if (l = s[c]) {
        var u = ne(l, e);
        Wn(l, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new de(r, this._parents, t, n);
}
function su() {
  var t, e, n = this, r = n._id, a = n.size();
  return new Promise(function(i, s) {
    var o = { value: s }, l = { value: function() {
      --a === 0 && i();
    } };
    n.each(function() {
      var c = oe(this, r), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(l)), c.on = e;
    }), a === 0 && i();
  });
}
var ou = 0;
function de(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function ms() {
  return ++ou;
}
var ce = Ne.prototype;
de.prototype = {
  constructor: de,
  select: Hf,
  selectAll: Vf,
  selectChild: ce.selectChild,
  selectChildren: ce.selectChildren,
  filter: Cf,
  merge: Lf,
  selection: Uf,
  transition: au,
  call: ce.call,
  nodes: ce.nodes,
  node: ce.node,
  size: ce.size,
  empty: ce.empty,
  each: ce.each,
  on: zf,
  attr: vf,
  attrTween: kf,
  style: Kf,
  styleTween: Qf,
  text: eu,
  textTween: iu,
  remove: Pf,
  tween: uf,
  delay: Ef,
  duration: If,
  ease: Df,
  easeVarying: Mf,
  end: su,
  [Symbol.iterator]: ce[Symbol.iterator]
};
function lu(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var cu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: lu
};
function fu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function uu(t) {
  var e, n;
  t instanceof de ? (e = t._id, t = t._name) : (e = ms(), (n = cu).time = Xr(), t = t == null ? null : t + "");
  for (var r = this._groups, a = r.length, i = 0; i < a; ++i)
    for (var s = r[i], o = s.length, l, c = 0; c < o; ++c)
      (l = s[c]) && Wn(l, t, e, c, s, n || fu(l, e));
  return new de(r, this._parents, t, e);
}
Ne.prototype.interrupt = lf;
Ne.prototype.transition = uu;
const Mr = Math.PI, Cr = 2 * Mr, xe = 1e-6, hu = Cr - xe;
function gs(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function du(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return gs;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let a = 1, i = r.length; a < i; ++a)
      this._ += Math.round(arguments[a] * n) / n + r[a];
  };
}
class pu {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? gs : du(e);
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
  quadraticCurveTo(e, n, r, a) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +a}`;
  }
  bezierCurveTo(e, n, r, a, i, s) {
    this._append`C${+e},${+n},${+r},${+a},${this._x1 = +i},${this._y1 = +s}`;
  }
  arcTo(e, n, r, a, i) {
    if (e = +e, n = +n, r = +r, a = +a, i = +i, i < 0) throw new Error(`negative radius: ${i}`);
    let s = this._x1, o = this._y1, l = r - e, c = a - n, u = s - e, h = o - n, p = u * u + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > xe) if (!(Math.abs(h * l - c * u) > xe) || !i)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let m = r - s, T = a - o, O = l * l + c * c, R = m * m + T * T, v = Math.sqrt(O), w = Math.sqrt(p), x = i * Math.tan((Mr - Math.acos((O + p - R) / (2 * v * w))) / 2), y = x / w, $ = x / v;
      Math.abs(y - 1) > xe && this._append`L${e + y * u},${n + y * h}`, this._append`A${i},${i},0,0,${+(h * m > u * T)},${this._x1 = e + $ * l},${this._y1 = n + $ * c}`;
    }
  }
  arc(e, n, r, a, i, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(a), l = r * Math.sin(a), c = e + o, u = n + l, h = 1 ^ s, p = s ? a - i : i - a;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > xe || Math.abs(this._y1 - u) > xe) && this._append`L${c},${u}`, r && (p < 0 && (p = p % Cr + Cr), p > hu ? this._append`A${r},${r},0,1,${h},${e - o},${n - l}A${r},${r},0,1,${h},${this._x1 = c},${this._y1 = u}` : p > xe && this._append`A${r},${r},0,${+(p >= Mr)},${h},${this._x1 = e + r * Math.cos(i)},${this._y1 = n + r * Math.sin(i)}`);
  }
  rect(e, n, r, a) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+a}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function _u(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function On(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Ve(t) {
  return t = On(Math.abs(t)), t ? t[1] : NaN;
}
function mu(t, e) {
  return function(n, r) {
    for (var a = n.length, i = [], s = 0, o = t[0], l = 0; a > 0 && o > 0 && (l + o + 1 > r && (o = Math.max(1, r - l)), i.push(n.substring(a -= o, a + o)), !((l += o + 1) > r)); )
      o = t[s = (s + 1) % t.length];
    return i.reverse().join(e);
  };
}
function gu(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var vu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function zn(t) {
  if (!(e = vu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Jr({
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
zn.prototype = Jr.prototype;
function Jr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Jr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function wu(t) {
  t: for (var e = t.length, n = 1, r = -1, a; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = a = n;
        break;
      case "0":
        r === 0 && (r = n), a = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(a + 1) : t;
}
var vs;
function yu(t, e) {
  var n = On(t, e);
  if (!n) return t + "";
  var r = n[0], a = n[1], i = a - (vs = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, s = r.length;
  return i === s ? r : i > s ? r + new Array(i - s + 1).join("0") : i > 0 ? r.slice(0, i) + "." + r.slice(i) : "0." + new Array(1 - i).join("0") + On(t, Math.max(0, e + i - 1))[0];
}
function Ai(t, e) {
  var n = On(t, e);
  if (!n) return t + "";
  var r = n[0], a = n[1];
  return a < 0 ? "0." + new Array(-a).join("0") + r : r.length > a + 1 ? r.slice(0, a + 1) + "." + r.slice(a + 1) : r + new Array(a - r.length + 2).join("0");
}
const $i = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: _u,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Ai(t * 100, e),
  r: Ai,
  s: yu,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Ii(t) {
  return t;
}
var Ni = Array.prototype.map, Di = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function bu(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ii : mu(Ni.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", a = t.decimal === void 0 ? "." : t.decimal + "", i = t.numerals === void 0 ? Ii : gu(Ni.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", l = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(h) {
    h = zn(h);
    var p = h.fill, m = h.align, T = h.sign, O = h.symbol, R = h.zero, v = h.width, w = h.comma, x = h.precision, y = h.trim, $ = h.type;
    $ === "n" ? (w = !0, $ = "g") : $i[$] || (x === void 0 && (x = 12), y = !0, $ = "g"), (R || p === "0" && m === "=") && (R = !0, p = "0", m = "=");
    var I = O === "$" ? n : O === "#" && /[boxX]/.test($) ? "0" + $.toLowerCase() : "", A = O === "$" ? r : /[%p]/.test($) ? s : "", B = $i[$], P = /[defgprs%]/.test($);
    x = x === void 0 ? 6 : /[gprs]/.test($) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function z(k) {
      var q = I, V = A, J, et, at;
      if ($ === "c")
        V = B(k) + V, k = "";
      else {
        k = +k;
        var F = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? l : B(Math.abs(k), x), y && (k = wu(k)), F && +k == 0 && T !== "+" && (F = !1), q = (F ? T === "(" ? T : o : T === "-" || T === "(" ? "" : T) + q, V = ($ === "s" ? Di[8 + vs / 3] : "") + V + (F && T === "(" ? ")" : ""), P) {
          for (J = -1, et = k.length; ++J < et; )
            if (at = k.charCodeAt(J), 48 > at || at > 57) {
              V = (at === 46 ? a + k.slice(J + 1) : k.slice(J)) + V, k = k.slice(0, J);
              break;
            }
        }
      }
      w && !R && (k = e(k, 1 / 0));
      var tt = q.length + k.length + V.length, rt = tt < v ? new Array(v - tt + 1).join(p) : "";
      switch (w && R && (k = e(rt + k, rt.length ? v - V.length : 1 / 0), rt = ""), m) {
        case "<":
          k = q + k + V + rt;
          break;
        case "=":
          k = q + rt + k + V;
          break;
        case "^":
          k = rt.slice(0, tt = rt.length >> 1) + q + k + V + rt.slice(tt);
          break;
        default:
          k = rt + q + k + V;
          break;
      }
      return i(k);
    }
    return z.toString = function() {
      return h + "";
    }, z;
  }
  function u(h, p) {
    var m = c((h = zn(h), h.type = "f", h)), T = Math.max(-8, Math.min(8, Math.floor(Ve(p) / 3))) * 3, O = Math.pow(10, -T), R = Di[8 + T / 3];
    return function(v) {
      return m(O * v) + R;
    };
  }
  return {
    format: c,
    formatPrefix: u
  };
}
var dn, ws, ys;
xu({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function xu(t) {
  return dn = bu(t), ws = dn.format, ys = dn.formatPrefix, dn;
}
function ku(t) {
  return Math.max(0, -Ve(Math.abs(t)));
}
function Su(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ve(e) / 3))) * 3 - Ve(Math.abs(t)));
}
function Tu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ve(e) - Ve(t)) + 1;
}
function Eu(t, e) {
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
function Au(t) {
  return function() {
    return t;
  };
}
function $u(t) {
  return +t;
}
var Ri = [0, 1];
function Oe(t) {
  return t;
}
function Lr(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Au(isNaN(e) ? NaN : 0.5);
}
function Iu(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Nu(t, e, n) {
  var r = t[0], a = t[1], i = e[0], s = e[1];
  return a < r ? (r = Lr(a, r), i = n(s, i)) : (r = Lr(r, a), i = n(i, s)), function(o) {
    return i(r(o));
  };
}
function Du(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, a = new Array(r), i = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    a[s] = Lr(t[s], t[s + 1]), i[s] = n(e[s], e[s + 1]);
  return function(o) {
    var l = Mo(t, o, 1, r) - 1;
    return i[l](a[l](o));
  };
}
function Ru(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Mu() {
  var t = Ri, e = Ri, n = Wr, r, a, i, s = Oe, o, l, c;
  function u() {
    var p = Math.min(t.length, e.length);
    return s !== Oe && (s = Iu(t[0], t[p - 1])), o = p > 2 ? Du : Nu, l = c = null, h;
  }
  function h(p) {
    return p == null || isNaN(p = +p) ? i : (l || (l = o(t.map(r), e, n)))(r(s(p)));
  }
  return h.invert = function(p) {
    return s(a((c || (c = o(e, t.map(r), te)))(p)));
  }, h.domain = function(p) {
    return arguments.length ? (t = Array.from(p, $u), u()) : t.slice();
  }, h.range = function(p) {
    return arguments.length ? (e = Array.from(p), u()) : e.slice();
  }, h.rangeRound = function(p) {
    return e = Array.from(p), n = Xc, u();
  }, h.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : Oe, u()) : s !== Oe;
  }, h.interpolate = function(p) {
    return arguments.length ? (n = p, u()) : n;
  }, h.unknown = function(p) {
    return arguments.length ? (i = p, h) : i;
  }, function(p, m) {
    return r = p, a = m, u();
  };
}
function Cu() {
  return Mu()(Oe, Oe);
}
function Lu(t, e, n, r) {
  var a = zo(t, e, n), i;
  switch (r = zn(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(i = Su(a, s)) && (r.precision = i), ys(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(i = Tu(a, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = i - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(i = ku(a)) && (r.precision = i - (r.type === "%") * 2);
      break;
    }
  }
  return ws(r);
}
function Fu(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Oo(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var a = e();
    return Lu(a[0], a[a.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), a = 0, i = r.length - 1, s = r[a], o = r[i], l, c, u = 10;
    for (o < s && (c = s, s = o, o = c, c = a, a = i, i = c); u-- > 0; ) {
      if (c = kr(s, o, n), c === l)
        return r[a] = s, r[i] = o, e(r);
      if (c > 0)
        s = Math.floor(s / c) * c, o = Math.ceil(o / c) * c;
      else if (c < 0)
        s = Math.ceil(s * c) / c, o = Math.floor(o * c) / c;
      else
        break;
      l = c;
    }
    return t;
  }, t;
}
function _e() {
  var t = Cu();
  return t.copy = function() {
    return Ru(t, _e());
  }, Eu.apply(t, arguments), Fu(t);
}
function pn(t) {
  return function() {
    return t;
  };
}
const Qr = Math.sqrt, bs = Math.PI, Ou = 2 * bs;
function zu(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new pu(e);
}
const Bu = {
  draw(t, e) {
    const n = Qr(e / bs);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, Ou);
  }
}, nr = Qr(3), xs = {
  draw(t, e) {
    const n = -Qr(e / (nr * 3));
    t.moveTo(0, n * 2), t.lineTo(-nr * n, -n), t.lineTo(nr * n, -n), t.closePath();
  }
};
function ks(t, e) {
  let n = null, r = zu(a);
  t = typeof t == "function" ? t : pn(t || Bu), e = typeof e == "function" ? e : pn(e === void 0 ? 64 : +e);
  function a() {
    let i;
    if (n || (n = i = r()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), i) return n = null, i + "" || null;
  }
  return a.type = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : pn(i), a) : t;
  }, a.size = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : pn(+i), a) : e;
  }, a.context = function(i) {
    return arguments.length ? (n = i ?? null, a) : n;
  }, a;
}
function Ye(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ye.prototype = {
  constructor: Ye,
  scale: function(t) {
    return t === 1 ? this : new Ye(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ye(this.k, this.x + this.k * t, this.y + this.k * e);
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
Ye.prototype;
function Re(t) {
  return t?.toLowerCase();
}
function Pu(t) {
  return t ? (Array.isArray(t) ? t : [t]).map((n) => n.toLowerCase()) : void 0;
}
function ge(t, e) {
  return !!(t && e && t.includes(e));
}
function Hu(t, e, n) {
  if (!e && !n)
    return !0;
  const r = Re(e), a = Re(n), i = Re(t.name), s = Re(t.id), o = Re(t.curie), l = Re(t.gene_id), c = Pu(t.alias), u = !!(r && (ge(i, r) || c?.some((p) => ge(p, r)))), h = !!(a && (ge(i, a) || ge(s, a) || ge(l, a) || ge(o, a) || c?.some((p) => ge(p, a))));
  return u || h;
}
function Ss(t, e, n) {
  if (!e && !n)
    return t;
  const r = t.filter(
    (a) => Hu(a, e, n)
  );
  return r.length > 0 ? r : t;
}
function jr(t, e, n) {
  let r = 0, a, i;
  if (t.length == 0)
    r = 1;
  else {
    for (let s = 1; s < t.length; s++) {
      for (const o of t[s]) {
        const [l, c] = o.split(":");
        if (n < +l || e > +c)
          i = 1;
        else {
          i = 0;
          break;
        }
      }
      if (i) {
        a = 1, r = s;
        break;
      }
    }
    a || (r = t.length);
  }
  return r;
}
function Ts(t, e, n, r, a) {
  let i = -1, s = -1;
  const o = [], l = Ss(t, r, a);
  for (const c of l) {
    const u = c.children;
    u && u.forEach((h) => {
      if (e.includes(h.type)) {
        if (n) {
          const p = h.fmin < n.start, m = h.fmax > n.end;
          if (p && m)
            return;
        }
        (i < 0 || h.fmin < i) && (i = h.fmin), (s < 0 || h.fmax > s) && (s = h.fmax, o.push({
          name: h.name || "unnamed",
          type: h.type,
          fmin: h.fmin,
          fmax: h.fmax
        }));
      }
    });
  }
  return {
    fmin: i,
    fmax: s
  };
}
function qe(t) {
  const n = t.attr("class").split(" "), r = `.${n[0]}.${n[1]} .track`, a = Er(r).nodes();
  let i = 0;
  return a.forEach((s) => {
    i += s.getBoundingClientRect().height + 1;
  }), i;
}
function ti(t, e) {
  const n = e.node()?.getBBox().height ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    let i = !1;
    return a.alleles?.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((o) => {
      t.includes(o) && (i = !0);
    }), a.alleles.forEach((o) => {
      t.includes(o) && (i = !0);
    })), i;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = ht(this).attr("x"), i = +ht(this).attr("width");
    (i === 0 || Number.isNaN(i)) && (i = 3, a = String(+a - i / 2));
    const s = e.select(".variants.track");
    (s.empty() ? e : s).append("rect").attr("class", "highlight").attr("x", a).attr("width", i).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const Vu = [
  "transcript",
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
], qu = [
  "point_mutation",
  "MNV",
  "Deletion",
  "Insertion",
  "Delins"
];
function Je(t) {
  return t.replace(/\|/g, " ").replace(/"/g, "").replace(/^\[/, "").replace(/\]$/, "").trim();
}
const An = {
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
function Es(t) {
  if (!t)
    return "black";
  const e = Je(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const r = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return Es(r);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = An[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? An.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? An.three_prime_UTR_variant.color : "#f0f";
}
const Te = 10, pe = 10;
function ei(t) {
  return `${t},${Te} ${t + pe / 2},${Te / 2} ${t},0 ${t - pe / 2},${Te / 2}`;
}
function As(t) {
  return `${t - pe / 2},${Te} ${t},0 ${t + pe / 2},${Te}`;
}
function $s(t) {
  return `${t - pe / 2},${Te} ${t + pe / 2},${Te} ${t - pe / 2},0 ${t + pe / 2},0`;
}
function Uu(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((r) => r[1]?.length ?? 0)
    ),
    descriptionHeight: e
  };
}
function Gu(t, e, n) {
  const { fmax: r, fmin: a, type: i } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, l = s.fmax - n;
    return i !== s.type ? !1 : o <= a && l >= a || l <= r && l >= r || o >= a && l <= r;
  });
}
function Is(t, e) {
  const n = [];
  return t.forEach((r) => {
    const a = Cs(r), { type: i, fmax: s, fmin: o } = r, l = Gu(
      n,
      r,
      e
    );
    if (l >= 0 && i != "deletion") {
      const c = n[l], u = c.variantSet ? c.variantSet.findIndex(
        (h) => h.type === i && h.consequence === a
      ) : -1;
      if (u >= 0) {
        const h = Math.min(
          c.variantSet[u].fmin,
          o
        ), p = Math.max(
          c.variantSet[u].fmax,
          s
        );
        c.fmin = h, c.fmax = p, c.variantSet[u].fmin = h, c.variantSet[u].fmax = p, c.variantSet[u].variants?.push(
          r
        );
      } else {
        const h = Math.min(c.fmin, o), p = Math.max(c.fmax, s);
        c.fmin = h, c.fmax = p, c.variantSet.push({
          variants: [r],
          type: i,
          consequence: a,
          fmin: o,
          fmax: s
        });
      }
      c.variants?.push(r), c.fmin = Math.min(o, c.fmin), c.fmax = Math.max(s, c.fmax), n[l] = c;
    } else
      n.push({
        fmin: o,
        fmax: s,
        type: i,
        consequence: a,
        variantSet: [
          // @ts-expect-error
          {
            variants: [r],
            type: i,
            consequence: a,
            fmin: o,
            fmax: s
          }
        ],
        variants: [r]
      });
  }), n;
}
function Ns(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Mi(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Mi(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Mi(t) {
  const { descriptionWidth: e } = Uu(t);
  let n = "";
  const r = t.location, [a, i] = r.split(":")[1].split("..");
  let s = t.alternative_alleles, o = t.reference_allele, l;
  if (t.type === "SNV")
    l = "1bp";
  else if (t.type === "deletion")
    l = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (l = "unknown length inserted", s = "n+") : l = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    l = `${o.length}bp`;
  else if (t.type === "delins") {
    const u = `${o.length - 1}bp deleted`;
    let h;
    s === "ALT_MISSING" ? (h = "unknown length inserted", s = "n+") : h = `${s.length - 1}bp inserted`, l = `${u}; ${h}`;
  } else
    l = `${+i - +a}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let c = "";
  return t.type === "insertion" ? c = `ins: ${s}` : t.type === "deletion" ? c = `del: ${o}` : c = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td style="word-break: break-all; max-width: 600px;">${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${l}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td style="word-break: break-all; max-width: 600px;">${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${c}</td></tr>`), n += "</tbody></table>", n;
}
function Ds(t) {
  return (t.variants ?? []).map((n) => {
    const r = Zu(n);
    return {
      ...r,
      consequence: r.consequence || "UNKNOWN"
    };
  });
}
function Rs(t) {
  return (t.variants ?? []).flatMap((e) => {
    const n = e.allele_ids?.values?.[0];
    if (!n)
      return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const r = JSON.parse(n);
        return (Array.isArray(r) ? r : [r]).map(String);
      } catch {
      }
    return n.replace(/"/g, "").split(",").map((r) => r.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function Ms(t) {
  return t.map((e) => Es(e.consequence));
}
function Cs(t) {
  if (t.geneLevelConsequence?.values && t.geneLevelConsequence.values.length > 0)
    return Je(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return Je(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return Je(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const n of e)
      if (n.consequence && typeof n.consequence == "string")
        return Je(n.consequence);
  }
  return "UNKNOWN";
}
function _n(t) {
  return (Array.isArray(t?.values) ? t.values.join(" ") : t?.values) ?? "";
}
function Zu(t) {
  return {
    symbol: Xn(t),
    symbolDetail: Ls(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: Cs(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: t.allele_of_gene_ids?.values[0].replace(/"/g, ""),
    geneSymbol: t.allele_of_gene_symbols?.values[0].replace(/"/g, ""),
    allele_of_genes: _n(t.allele_of_genes),
    allele_ids: _n(t.allele_ids),
    alternative_alleles: _n(t.alternative_alleles),
    impact: _n(t.impact)
  };
}
function Ls(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Ls(t.variants[0]);
  if (t.allele_symbols?.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const e = [], n = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), r = t.allele_ids?.values[0].replace(/"|\[|\]/g, "") ?? "", a = n.split(","), i = r.split(",");
        for (let s = 0; s < i.length; s++)
          e.push(
            `${a[s].trim()} (${i[s].trim()})`
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
function Xn(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Xn(t.variants[0]);
  if (t.allele_symbols_text?.values) {
    const e = t.allele_symbols_text.values[0].split(",");
    return e.length > 1 ? `${e.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function Wu(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Xu(t, e = 15) {
  const n = [], r = [...t].sort((i, s) => i.fmin - s.fmin), a = [];
  return r.forEach((i) => {
    let s = "";
    const o = i.type.toLowerCase();
    if (o === "snv" || o === "point_mutation" ? s = "snv" : o === "insertion" ? s = "insertion" : o === "delins" || o === "substitution" || o === "indel" || o === "mnv" ? s = "delins" : o === "deletion" && (s = "deletion"), !s) return;
    let l = !1, c = 0, u = i.pixelFmin !== void 0 ? i.pixelFmin : i.fmin, h = i.pixelFmax !== void 0 ? i.pixelFmax : i.fmax;
    if (s === "snv") {
      const p = (u + h) / 2;
      u = p - 5, h = p + 5;
    }
    if (s === "delins" && Math.abs(h - u) < 10) {
      const p = (u + h) / 2;
      u = p - 5, h = p + 5;
    }
    if (s === "deletion" && Math.abs(h - u) < 5) {
      const p = (u + h) / 2;
      u = p - 2.5, h = p + 2.5;
    }
    for (; !l; )
      a[c] || (a[c] = []), a[c].some((m) => {
        const T = m.pixelFmin - e, O = m.pixelFmax + e;
        return !(h < T || u > O);
      }) ? c++ : (a[c].push({ pixelFmin: u, pixelFmax: h }), n.push({ variant: i, row: c, type: s }), l = !0);
  }), n;
}
function Fr(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Rt(t) {
  return t == "unknown" ? Fr("grey", t.replace(/_/g, " ")) : Fr(
    An[t].color,
    t.replace(/_/g, " ")
  );
}
function Ku() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ei(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Fr("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${As(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${$s(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Rt("transcript_ablation")}</li>`, t += `<li>${Rt("splice_acceptor_variant")}</li>`, t += `<li>${Rt("splice_donor_variant")}</li>`, t += `<li>${Rt("stop_gained")}</li>`, t += `<li>${Rt("frameshift_variant")}</li>`, t += `<li>${Rt("stop_lost")}</li>`, t += `<li>${Rt("start_lost")}</li>`, t += `<li>${Rt("inframe_insertion")}</li>`, t += `<li>${Rt("inframe_deletion")}</li>`, t += `<li>${Rt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Rt("protein_altering_variant")}</li>`, t += `<li>${Rt("splice_region_variant")}</li>`, t += `<li>${Rt("start_retained_variant")}</li>`, t += `<li>${Rt("stop_retained_variant")}</li>`, t += `<li>${Rt("synonymous_variant")}</li>`, t += `<li>${Rt("coding_sequence_variant")}</li>`, t += `<li>${Rt("five_prime_UTR_variant")}</li>`, t += `<li>${Rt("three_prime_UTR_variant")}</li>`, t += `<li>${Rt("intron_variant")}</li>`, t += `<li>${Rt("non_coding_transcript_variant")}</li>`, t += `<li>${Rt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Yu(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Lt(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Yu(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function Fs(t, e, n, r) {
  let a = "";
  if (t === "FlyBase")
    a = `/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "MGI")
    a = `/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "WormBase")
    a = `/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "ZFIN")
    a = `/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "SGD")
    a = `/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "RGD")
    a = `/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "human")
    a = `/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else
    return console.warn("no source found", t), null;
  return a;
}
function Os(t, e, n) {
  if (e === void 0)
    return t;
  if (e.length === 0)
    return [];
  const r = new Set(e);
  return t.filter((a) => n(a, r));
}
class Ju {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: a,
    variantTypes: i,
    showVariantLabel: s,
    variantFilter: o,
    binRatio: l,
    isoformFilter: c,
    initialHighlight: u,
    trackData: h,
    variantData: p,
    geneBounds: m,
    geneSymbol: T,
    geneId: O,
    speciesTaxonId: R
  }) {
    this.trackData = h ?? [], this.variantData = p ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.isoformFilter = c, this.initialHighlight = u, this.height = n, this.transcriptTypes = a, this.variantTypes = i, this.binRatio = l, this.showVariantLabel = s ?? !0, this.geneBounds = m, this.geneSymbol = T, this.geneId = O, this.speciesTaxonId = R;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const r = this.initialHighlight, a = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), i = this.viewer, s = this.width, o = this.binRatio;
    let c = Wu(a).length;
    if (!this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0)
      throw new Error("trackData must be a non-empty array");
    const u = this.trackData[0].source, h = this.trackData[0].seqId, p = !e || e.length === 0 ? 9 : 30, m = ["UTR", "five_prime_UTR", "three_prime_UTR"], T = ["CDS"], O = ["exon"], R = this.transcriptTypes, v = Ts(n, R, this.geneBounds, this.geneSymbol, this.geneId);
    let w = v.fmin, x = v.fmax;
    this.geneBounds && (w = this.geneBounds.start, x = this.geneBounds.end, v.fmin < w && (w = v.fmin), v.fmax > x && (x = v.fmax));
    const y = 10, $ = 10, I = 40, A = 20, B = 0, P = 10, z = 10, k = 5, q = 4, V = 20, J = 10, et = `0,0 0,${V} ${J},${J}`, at = 22.5, F = _e().domain([w, x]).range([0, s]), tt = i.append("g").attr("class", "label"), rt = {};
    for (let K = 0, ct = m.length; K < ct; K++)
      rt[m[K]] = 200;
    for (let K = 0, ct = T.length; K < ct; K++)
      rt[T[K]] = 1e3;
    for (let K = 0, ct = O.length; K < ct; K++)
      rt[O[K]] = 100;
    const nt = {};
    n = n.sort((K, ct) => {
      if (K.selected && !ct.selected)
        return -1;
      if (!K.selected && ct.selected)
        return 1;
      const ut = K.fmin || 0, g = ct.fmin || 0;
      return ut - g;
    });
    let Q = 0;
    const _t = ht("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ot = () => {
      _t.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, yt = [...Is(
      a,
      (x - w) * o
    )], it = qe(this.viewer), dt = !a || a.length === 0, st = this.speciesTaxonId === "NCBITaxon:9606", kt = this.speciesTaxonId === "NCBITaxon:559292";
    dt && !(st || kt) && i.append("g").attr("class", "variant-message track").attr("transform", `translate(0,${it})`).append("text").attr("x", 10).attr("y", 15).attr("fill", "#d9534f").attr("opacity", 0.8).attr("font-size", "12px").text("No variant data available for this region. Please contact help@alliancegenome.org if this is unexpected.");
    const Tt = i.append("g").attr("class", "variants track").attr("transform", `translate(0,${it})`), lt = yt.map((K) => ({
      ...K,
      pixelFmin: F(K.fmin),
      pixelFmax: F(K.fmax)
    })), Y = Xu(lt, 15);
    let vt = 0;
    Y.forEach((K) => {
      K.row > vt && (vt = K.row);
    }), c = Math.max(vt + 1, 1);
    const pt = /* @__PURE__ */ new Map();
    Y.forEach((K) => {
      const ct = `${K.variant.fmin}-${K.type.toLowerCase()}`;
      pt.set(ct, K.row);
    });
    const gt = [];
    for (let K = 0; K < c; K++) {
      const ct = Tt.append("g").attr("class", `variant-row-${K}`).attr("transform", `translate(0,${K * (z + k)})`).style("pointer-events", "all").style("isolation", "isolate");
      gt.push(ct);
    }
    for (let K = gt.length - 1; K >= 0; K--)
      gt[K].raise();
    [...yt].sort((K, ct) => {
      const ut = K.type.toLowerCase(), g = ct.type.toLowerCase(), M = `${K.fmin}-${ut === "snv" || ut === "point_mutation" ? "snv" : ut === "insertion" ? "insertion" : ut === "deletion" ? "deletion" : "delins"}`, N = `${ct.fmin}-${g === "snv" || g === "point_mutation" ? "snv" : g === "insertion" ? "insertion" : g === "deletion" ? "deletion" : "delins"}`, Z = pt.get(M) || 0, S = pt.get(N) || 0;
      return Z - S;
    }).forEach((K, ct) => {
      const { type: ut, fmax: g, fmin: M } = K;
      let N = !0, Z = !1;
      const S = this.width, C = Xn(K), d = Ds(K), H = Rs(K), j = Ns(d), f = Ms(d)[0];
      if (ut.toLowerCase() === "snv" || ut.toLowerCase() === "point_mutation") {
        Z = !0;
        const D = pt.get(`${M}-snv`) || 0;
        (gt[D] || Tt).append("polygon").attr("class", "variant-SNV").attr("id", `variant-${M}`).attr("points", ei(F(M))).attr("fill", f).attr("x", F(M)).attr("z-index", 30).on("click", () => {
          St(_t, j, ot);
        }).on("mouseover", function(_) {
          const b = ht(this).datum();
          b && (ht(this).style("stroke", "black"), ht(".label").selectAll(".variantLabel,.variantLabelBackground").filter((E) => E && E.variant === b.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const _ = ht(this).datum();
          (!_ || _.selected !== "true") && ht(this).style("stroke", null), ht(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: M,
          fmax: g,
          variant: C + M,
          alleles: H
        });
      } else if (ut.toLowerCase() === "insertion") {
        Z = !0;
        const D = pt.get(`${M}-insertion`) || 0;
        (gt[D] || Tt).append("polygon").attr("class", "variant-insertion").attr("id", `variant-${M}`).attr("points", As(F(M))).attr("fill", f).attr("x", F(M)).attr("z-index", 30).on("click", () => {
          St(_t, j, ot);
        }).on("mouseover", function(_) {
          const b = ht(this).datum();
          b && (ht(this).style("stroke", "black"), ht(".label").selectAll(".variantLabel,.variantLabelBackground").filter((E) => E && E.variant === b.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const _ = ht(this).datum();
          (!_ || _.selected !== "true") && ht(this).style("stroke", null), ht(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: M,
          fmax: g,
          variant: C + M,
          alleles: H
        });
      } else if (ut.toLowerCase() === "delins" || ut.toLowerCase() === "substitution" || ut.toLowerCase() === "indel" || ut.toLowerCase() === "mnv") {
        Z = !0;
        const D = pt.get(`${M}-delins`) || 0;
        (gt[D] || Tt).append("polygon").attr("class", "variant-delins").attr("id", `variant-${M}`).attr("points", $s(F(M))).attr("x", F(M)).attr("fill", f).attr("z-index", 30).on("click", () => {
          St(_t, j, ot);
        }).on("mouseover", function(_) {
          const b = ht(this).datum();
          b && (ht(this).style("stroke", "black"), ht(".label").selectAll(".variantLabel,.variantLabelBackground").filter((E) => E && E.variant === b.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const _ = ht(this).datum();
          (!_ || _.selected !== "true") && ht(this).style("stroke", null), ht(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum({
          fmin: M,
          fmax: g,
          variant: C + M,
          alleles: H
        });
      } else if (ut.toLowerCase() === "deletion") {
        const D = pt.get(`${M}-deletion`) || 0, L = Math.max(Math.ceil(F(g) - F(M)), 5), _ = {
          fmin: M,
          fmax: g,
          variant: C + M,
          alleles: H,
          selected: !1
        };
        (gt[D] || Tt).append("rect").attr("class", "variant-deletion").attr("id", `variant-${M}`).attr("x", F(M)).attr("y", 0).attr("width", L).attr("height", z).attr("fill", f).attr("stroke-width", 2).style("cursor", "pointer").on("click", () => {
          St(_t, j, ot);
        }).on("mouseover", function(E) {
          const X = ht(this).datum();
          X && (ht(this).style("stroke", "black"), ht(".label").selectAll(".variantLabel,.variantLabelBackground").filter((G) => G && G.variant === X.variant).style("opacity", 1).style("pointer-events", "auto").raise());
        }).on("mouseout", function() {
          const E = ht(this).datum();
          (!E || E.selected !== "true") && ht(this).style("stroke", null), ht(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0).style("pointer-events", "none");
        }).datum(_);
      } else
        N = !1;
      if (N) {
        const D = ut.toLowerCase() === "deletion", L = F(D ? g : M), _ = Z ? 15 : 10;
        let b = L + _;
        const E = ut.toLowerCase();
        let X = 0;
        E === "deletion" ? X = pt.get(`${M}-deletion`) || 0 : E === "snv" || E === "point_mutation" ? X = pt.get(`${M}-snv`) || 0 : E === "insertion" ? X = pt.get(`${M}-insertion`) || 0 : (E === "delins" || E === "substitution" || E === "indel" || E === "mnv") && (X = pt.get(`${M}-delins`) || 0);
        const G = (z + k) * X + at, W = tt.append("text").attr("class", "variantLabel").attr("fill", "black").attr("opacity", 0).attr("height", B).attr("transform", `translate(${b},${G})`).text(C).style("pointer-events", "none").datum({ fmin: M, variant: C + M }), mt = W.node()?.getBBox().width ?? 0;
        b + mt > S - 5 && (b = (D ? F(M) : L) - mt - _, W.attr("transform", `translate(${b},${G})`));
      }
    });
    const U = it;
    tt.attr("transform", `translate(0,${U})`), tt.raise();
    const Mt = qe(this.viewer) + at, zt = i.append("g").attr("transform", `translate(0,${Mt})`).attr("class", "track");
    let $t = 0;
    const It = [];
    let Ut = -1, Et = -1;
    const St = this.renderTooltipDescription, Zt = [];
    for (let K = 0; K < n.length && $t < p; K++) {
      const ct = n[K];
      let ut = ct.children;
      if (ut) {
        const g = ct.selected;
        ut = ut.sort((N, Z) => {
          const S = N.name || "", C = Z.name || "";
          return S.localeCompare(C);
        });
        let M = !1;
        ut.forEach((N) => {
          if (e && e.length !== 0 && !(e.includes(N.id) || e.includes(N.name)))
            return;
          if (this.geneBounds) {
            const S = N.fmin < this.geneBounds.start, C = N.fmax > this.geneBounds.end;
            if (S && C)
              return;
          }
          if (Zt.includes(N.id))
            return;
          Zt.push(N.id);
          const Z = N.type;
          if (R.includes(Z)) {
            let S = jr(
              It,
              F(N.fmin),
              F(N.fmax)
            );
            if ($t < p) {
              let C = "", d, H = !1;
              const j = ct.name;
              Object.keys(nt).includes(j) || (Q += A, H = !0, nt[j] = "Green");
              const f = zt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${$t * I + 10 + Q})`
              );
              H && (C = j, d = f.append("text").attr("class", "geneLabel").attr("fill", g ? "sandybrown" : "black").attr("height", B).attr(
                "transform",
                `translate(${F(N.fmin)},-${A})`
              ).text(C).on("click", () => {
                St(
                  _t,
                  Lt(ct),
                  ot
                );
              }).datum({
                fmin: N.fmin
              })), f.append("polygon").datum(() => ({
                fmin: N.fmin,
                fmax: N.fmax,
                strand: ct.strand
              })).attr("class", "transArrow").attr("points", et).attr(
                "transform",
                (E) => ct.strand > 0 ? `translate(${Number(F(E.fmax))},0)` : `translate(${Number(F(E.fmin))},${V}) rotate(180)`
              ).on("click", () => {
                St(
                  _t,
                  Lt(N),
                  ot
                );
              });
              const D = F(N.fmin), L = F(N.fmax) - F(N.fmin);
              f.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + B).attr("height", q).attr("transform", `translate(${D},0)`).attr("width", L).on("click", () => {
                St(
                  _t,
                  Lt(N),
                  ot
                );
              }).datum({
                fmin: N.fmin,
                fmax: N.fmax
              }), C = N.name || "", d = f.append("text").attr("class", "transcriptLabel").attr("fill", g ? "sandybrown" : "gray").attr("opacity", g ? 1 : 0.5).attr("height", B).attr("transform", `translate(${F(N.fmin)},0)`).text(C).on("click", () => {
                St(
                  _t,
                  Lt(N),
                  ot
                );
              }).datum({
                fmin: N.fmin
              });
              let _ = C.length * 2;
              try {
                _ = d.node()?.getBBox().width ?? 0;
              } catch {
              }
              Number(_ + F(N.fmin)) > s;
              const b = _ > F(N.fmax) - F(N.fmin) ? F(N.fmin) + _ : F(N.fmax);
              if (It[S]) {
                const E = It[S];
                E.push(`${F(N.fmin)}:${b}`), It[S] = E;
              } else
                It[S] = [
                  `${F(N.fmin)}:${b}`
                ];
              (Ut < 0 || Ut > N.fmin) && (Ut = N.fmin), (Et < 0 || Et < N.fmax) && (Et = N.fmax), N.children && (N.children = N.children.sort((E, X) => {
                const G = rt[E.type], W = rt[X.type];
                if (typeof G == "number" && typeof W == "number")
                  return G - W;
                if (typeof G == "number" && typeof W != "number")
                  return -1;
                if (typeof G != "number" && typeof W == "number")
                  return 1;
                const mt = E.type || "", Wt = X.type || "";
                return mt.localeCompare(Wt);
              }), N.children.forEach((E) => {
                const X = E.type;
                O.includes(X) ? f.append("rect").attr("class", "exon").attr("x", F(E.fmin)).attr(
                  "transform",
                  `translate(0,${y - q})`
                ).attr("height", y).attr("z-index", 10).attr("width", F(E.fmax) - F(E.fmin)).on("click", () => {
                  St(
                    _t,
                    Lt(N),
                    ot
                  );
                }).datum({ fmin: E.fmin, fmax: E.fmax }) : T.includes(X) ? f.append("rect").attr("class", "CDS").attr("x", F(E.fmin)).attr(
                  "transform",
                  `translate(0,${$ - q})`
                ).attr("z-index", 20).attr("height", $).attr("width", F(E.fmax) - F(E.fmin)).on("click", () => {
                  St(
                    _t,
                    Lt(N),
                    ot
                  );
                }).datum({ fmin: E.fmin, fmax: E.fmax }) : m.includes(X) && f.append("rect").attr("class", "UTR").attr("x", F(E.fmin)).attr(
                  "transform",
                  `translate(0,${P - q})`
                ).attr("z-index", 20).attr("height", P).attr("width", F(E.fmax) - F(E.fmin)).on("click", () => {
                  St(
                    _t,
                    Lt(N),
                    ot
                  );
                }).datum({ fmin: E.fmin, fmax: E.fmax });
              })), $t += 1;
            }
            if ($t === p && !M) {
              const C = Fs(u, h, w, x);
              ++S, M = !0, zt.append("a").attr("class", "transcriptLabel").attr("href", C).attr("target", "_blank").attr("rel", "noopener noreferrer").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${$t * I + 20 + Q})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", B).text("Maximum features displayed.  See full view for more.");
            }
          }
        });
      }
    }
    r && ti(r, i), $t === 0 && zt.append("text").attr("x", 30).attr("y", B + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    );
    const ft = c * (z + k) + at;
    return $t * I + Q + ft;
  }
  filterVariantData(e, n) {
    return !e || !Array.isArray(e) ? [] : Os(
      e,
      n,
      (r, a) => {
        let i = !1;
        return (a.has(r.name) || r.allele_symbols?.values && a.has(r.allele_symbols.values[0].replace(/"/g, "")) || r.symbol?.values && a.has(r.symbol.values[0].replace(/"/g, "")) || r.symbol_text?.values && a.has(r.symbol_text.values[0].replace(/"/g, ""))) && (i = !0), (r.allele_ids?.values[0]?.replace(/"|\[|\]| /g, "").split(",") ?? []).forEach((o) => {
          a.has(o) && (i = !0);
        }), i;
      }
    );
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("max-width", "700px").style("height", "auto").style("overflow-wrap", "break-word").style("word-break", "break-all").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  setInitialHighlight(e, n) {
    const r = n.node()?.getBBox().height ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((i) => {
      let s = !1;
      return i.alleles && (i.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((l) => {
        e.includes(l) && (s = !0);
      }), i.alleles.forEach((l) => {
        e.includes(l) && (s = !0);
      })), s;
    }).datum((i) => (i.selected = "true", i)).style("stroke", "black").each(function() {
      const i = +(ht(this).attr("width") || 3), s = +ht(this).attr("x") - i / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", s).attr("width", i).attr("height", r).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Qu {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: a,
    variantTypes: i,
    showVariantLabel: s,
    variantFilter: o,
    initialHighlight: l,
    trackData: c,
    variantData: u
  }) {
    this.trackData = c ?? [], this.variantData = u ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.initialHighlight = l, this.height = n, this.transcriptTypes = a, this.variantTypes = i, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let r = this.trackData;
    const a = this.filterVariantData(
      e,
      this.variantFilter
    ), i = Is(
      a,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    i.forEach((Y) => {
      const vt = Rs(Y);
      s.set(Y, vt);
    });
    const o = this.viewer, l = this.width, c = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], h = ["CDS"], p = ["exon"], m = this.transcriptTypes, T = Ts(r, m), O = T.fmin, R = T.fmax, v = 10, w = 10, x = 10, y = 40, $ = 20, I = 2, A = 0, B = 10, P = 10, z = 20, k = 4, q = 20, V = 10, J = `0,0 0,${q} ${V},${V}`, et = 10, at = 10, F = (Y) => `${Y - at / 2},${et} ${Y},0 ${Y + at / 2},${et}`, tt = (Y) => `${Y - at / 2},${et} ${Y + at / 2},${et} ${Y - at / 2},0 ${Y + at / 2},0`, rt = (Y) => `${Y},${et} ${Y + at / 2},${et / 2} ${Y},0 ${Y - at / 2},${et / 2}`, nt = _e().domain([O, R]).range([0, l]), Q = qe(this.viewer), _t = o.append("g").attr("transform", `translate(0,${Q})`).attr("class", "track"), ot = {};
    for (const Y of u)
      ot[Y] = 200;
    for (const Y of h)
      ot[Y] = 1e3;
    for (const Y of p)
      ot[Y] = 100;
    const bt = {};
    r = r.sort((Y, vt) => Y.selected && !vt.selected ? -1 : !Y.selected && vt.selected ? 1 : Y.name - vt.name);
    let yt = 0;
    const it = ht("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), dt = () => {
      it.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let st = 0;
    const kt = [];
    let Dt = -1, Tt = -1;
    const lt = this.renderTooltipDescription;
    for (let Y = 0; Y < r.length && st < v; Y++) {
      const vt = r[Y];
      let pt = vt.children;
      if (pt) {
        const gt = vt.selected;
        pt = pt.sort((U, Mt) => U.name < Mt.name ? -1 : U.name > Mt.name ? 1 : U - Mt);
        let xt = !1;
        pt.forEach((U) => {
          const Mt = U.type;
          if (m.includes(Mt)) {
            let zt = jr(
              kt,
              nt(U.fmin),
              nt(U.fmax)
            );
            if (st < v) {
              let $t, It, Ut = !1;
              Object.keys(bt).includes(vt.name) || (yt += $, Ut = !0, bt[vt.name] = "Green");
              const Et = _t.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${st * y + 10 + yt})`
              );
              Ut && ($t = vt.name, It = Et.append("text").attr("class", "geneLabel").attr("fill", gt ? "sandybrown" : "black").attr("height", A).attr(
                "transform",
                `translate(${nt(U.fmin)},-${$})`
              ).text($t).on("click", () => {
                lt(
                  it,
                  Lt(vt),
                  dt
                );
              }).datum({ fmin: U.fmin })), Et.append("polygon").datum(() => ({
                fmin: U.fmin,
                fmax: U.fmax,
                strand: vt.strand
              })).attr("class", "transArrow").attr("points", J).attr("transform", (ft) => vt.strand > 0 ? `translate(${Number(nt(ft.fmax))},0)` : `translate(${Number(nt(ft.fmin))},${q}) rotate(180)`).on("click", () => {
                lt(
                  it,
                  Lt(U),
                  dt
                );
              }), Et.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + A).attr("height", k).attr("transform", `translate(${nt(U.fmin)},0)`).attr("width", nt(U.fmax) - nt(U.fmin)).on("click", () => {
                lt(
                  it,
                  Lt(U),
                  dt
                );
              }).datum({ fmin: U.fmin, fmax: U.fmax }), $t = U.name, It = Et.append("text").attr("class", "transcriptLabel").attr("fill", gt ? "sandybrown" : "gray").attr("opacity", gt ? 1 : 0.5).attr("height", A).attr("transform", `translate(${nt(U.fmin)},0)`).text($t).on("click", () => {
                lt(
                  it,
                  Lt(U),
                  dt
                );
              }).datum({ fmin: U.fmin });
              let St = $t.length * 2;
              try {
                St = It.node().getBBox().width;
              } catch {
              }
              Number(St + nt(U.fmin)) > l;
              const Zt = St > nt(U.fmax) - nt(U.fmin) ? nt(U.fmin) + St : nt(U.fmax);
              if (kt[zt]) {
                const ft = kt[zt];
                ft.push(`${nt(U.fmin)}:${Zt}`), kt[zt] = ft;
              } else
                kt[zt] = [
                  `${nt(U.fmin)}:${Zt}`
                ];
              (Dt < 0 || Dt > U.fmin) && (Dt = U.fmin), (Tt < 0 || Tt < U.fmax) && (Tt = U.fmax), U.children && (U.children = U.children.sort((ft, K) => {
                const ct = ot[ft.type], ut = ot[K.type];
                return typeof ct == "number" && typeof ut == "number" ? ct - ut : typeof ct == "number" && typeof ut != "number" ? -1 : typeof ct != "number" && typeof ut == "number" ? 1 : ft.type - K.type;
              }), U.children.forEach((ft) => {
                const K = ft.type;
                let ct = !1;
                p.includes(K) ? (ct = !0, Et.append("rect").attr("class", "exon").attr("x", nt(ft.fmin)).attr(
                  "transform",
                  `translate(0,${w - k})`
                ).attr("height", w).attr("z-index", 10).attr("width", nt(ft.fmax) - nt(ft.fmin)).on("click", () => {
                  lt(
                    it,
                    Lt(U),
                    dt
                  );
                }).datum({ fmin: ft.fmin, fmax: ft.fmax })) : h.includes(K) ? (ct = !0, Et.append("rect").attr("class", "CDS").attr("x", nt(ft.fmin)).attr(
                  "transform",
                  `translate(0,${x - k})`
                ).attr("z-index", 20).attr("height", x).attr("width", nt(ft.fmax) - nt(ft.fmin)).on("click", () => {
                  lt(
                    it,
                    Lt(U),
                    dt
                  );
                }).datum({ fmin: ft.fmin, fmax: ft.fmax })) : u.includes(K) && (ct = !0, Et.append("rect").attr("class", "UTR").attr("x", nt(ft.fmin)).attr(
                  "transform",
                  `translate(0,${B - k})`
                ).attr("z-index", 20).attr("height", B).attr("width", nt(ft.fmax) - nt(ft.fmin)).on("click", () => {
                  lt(
                    it,
                    Lt(U),
                    dt
                  );
                }).datum({ fmin: ft.fmin, fmax: ft.fmax })), ct && i.forEach((ut) => {
                  const { type: g, fmax: M, fmin: N } = ut;
                  if (N < ft.fmin && M > ft.fmin || M > ft.fmax && N < ft.fmax || M <= ft.fmax && N >= ft.fmin) {
                    let S = !0;
                    const C = Ds(ut), d = Ms(C)[0], H = Ns(C), j = Math.max(
                      Math.ceil(nt(M) - nt(N)),
                      I
                    );
                    if (g.toLowerCase() === "deletion" || g.toLowerCase() === "mnv" ? Et.append("rect").attr("class", "variant-deletion").attr("x", nt(N)).attr(
                      "transform",
                      `translate(0,${z - k})`
                    ).attr("z-index", 30).attr("fill", d).attr("height", P).attr("width", j).on("click", () => {
                      lt(
                        it,
                        H,
                        dt
                      );
                    }).datum({
                      fmin: N,
                      fmax: M,
                      alleles: s.get(ut) ?? []
                    }) : g.toLowerCase() === "snv" || g.toLowerCase() === "point_mutation" ? Et.append("polygon").attr("class", "variant-SNV").attr("points", rt(nt(N))).attr("fill", d).attr("x", nt(N)).attr(
                      "transform",
                      `translate(0,${z - k})`
                    ).attr("z-index", 30).on("click", () => {
                      lt(
                        it,
                        H,
                        dt
                      );
                    }).datum({
                      fmin: N,
                      fmax: M,
                      alleles: s.get(ut) ?? []
                    }) : g.toLowerCase() === "insertion" ? Et.append("polygon").attr("class", "variant-insertion").attr("points", F(nt(N))).attr("fill", d).attr("x", nt(N)).attr(
                      "transform",
                      `translate(0,${z - k})`
                    ).attr("z-index", 30).on("click", () => {
                      lt(
                        it,
                        H,
                        dt
                      );
                    }).datum({
                      fmin: N,
                      fmax: M,
                      alleles: s.get(ut) ?? []
                    }) : g.toLowerCase() === "delins" || g.toLowerCase() === "substitution" || g.toLowerCase() === "indel" ? Et.append("polygon").attr("class", "variant-delins").attr("points", tt(nt(N))).attr("x", nt(N)).attr(
                      "transform",
                      `translate(0,${z - k})`
                    ).attr("fill", d).attr("z-index", 30).on("click", () => {
                      lt(
                        it,
                        H,
                        dt
                      );
                    }).datum({
                      fmin: N,
                      fmax: M,
                      alleles: s.get(ut) ?? []
                    }) : S = !1, S && c) {
                      const f = Xn(ut), D = f.length || 1;
                      Et.append("text").attr("class", "variantLabel").attr("fill", "black").attr("opacity", gt ? 1 : 0.5).attr("height", A).attr(
                        "transform",
                        `translate(${nt(N - D / 2 * 100)},${z * 2.2 - k})`
                      ).html(f).on("click", () => {
                        lt(
                          it,
                          H,
                          dt
                        );
                      }).datum({ fmin: U.fmin });
                    }
                  }
                });
              })), st += 1;
            }
            st === v && !xt && (++zt, xt = !0, _t.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${st * y + 20 + yt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", A).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (st === 0 && _t.append("text").attr("x", 30).attr("y", A + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        ti(this.initialHighlight, this.viewer);
      } catch {
      }
    return st * y + yt;
  }
  filterVariantData(e, n) {
    return Os(
      e,
      n,
      (r, a) => {
        let i = !1;
        try {
          if (a.has(r.name) && (i = !0), r.allele_symbols?.values) {
            const o = r.allele_symbols.values[0].replace(
              /"|\\[|\\]| /g,
              ""
            );
            a.has(o) && (i = !0);
          }
          if (r.symbol?.values) {
            const o = r.symbol.values[0].replace(
              /"|\\[|\\]| /g,
              ""
            );
            a.has(o) && (i = !0);
          }
          if (r.symbol_text?.values) {
            const o = r.symbol_text.values[0].replace(
              /"|\\[|\\]| /g,
              ""
            );
            a.has(o) && (i = !0);
          }
          const s = r.allele_ids?.values?.[0];
          if (s) {
            let o = [];
            if (s.startsWith("[") && s.endsWith("]"))
              try {
                const l = JSON.parse(s);
                o = (Array.isArray(l) ? l : [l]).map(String);
              } catch {
                o = s.replace(/"|\\[|\\]| /g, "").split(",");
              }
            else
              o = s.replace(/"|\\[|\\]| /g, "").split(",");
            for (const l of o)
              if (a.has(l)) {
                i = !0;
                break;
              }
          }
        } catch {
          i = !0;
        }
        return i;
      }
    );
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
}
class ju {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: a,
    htpVariant: i,
    trackData: s,
    region: o,
    genome: l,
    geneBounds: c,
    geneSymbol: u,
    geneId: h
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = r, this.height = n, this.transcriptTypes = a, this.htpVariant = i, this.region = o, this.genome = l, this.geneBounds = c, this.geneSymbol = u, this.geneId = h;
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  DrawTrack() {
    let e = Ss(
      this.trackData,
      this.geneSymbol,
      this.geneId
    );
    const n = this.htpVariant, r = this.viewer, a = this.width, i = this.genome, s = e[0]?.seqId, o = 10, l = ["UTR", "five_prime_UTR", "three_prime_UTR"], c = ["CDS"], u = ["exon"], h = this.transcriptTypes, p = 10, m = 10, T = 40, O = 0, R = 10, v = 4, w = 20, x = 10, y = `0,0 0,${w} ${x},${x}`, $ = this.renderTooltipDescription, I = _e().domain([this.region.start, this.region.end]).range([0, a]), A = {};
    for (let F = 0, tt = l.length; F < tt; F++)
      A[l[F]] = 200;
    for (let F = 0, tt = c.length; F < tt; F++)
      A[c[F]] = 1e3;
    for (let F = 0, tt = u.length; F < tt; F++)
      A[u[F]] = 100;
    e = e.sort((F, tt) => F.selected && !tt.selected ? -1 : !F.selected && tt.selected ? 1 : F.name - tt.name);
    const B = ht("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), P = () => {
      B.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const F = r.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, tt] = n.split(":");
      F.append("polygon").attr("class", "variant-SNV").attr("points", ei(I(+tt))).attr("fill", "red").attr("x", I(+tt)).attr("z-index", 30);
    }
    const z = qe(this.viewer), k = r.append("g").attr("transform", `translate(0,${z})`).attr("class", "track");
    let q = 0;
    const V = [];
    let J = -1, et = -1;
    const at = [];
    for (let F = 0; F < e.length && q < o; F++) {
      const tt = e[F];
      let rt = tt.children;
      if (rt) {
        const nt = tt.selected;
        rt = rt.sort((Q, _t) => Q.name < _t.name ? -1 : Q.name > _t.name ? 1 : 0), rt.forEach((Q) => {
          const _t = Q.type;
          if (!at.includes(Q.id) && (at.push(Q.id), h.includes(_t))) {
            if (this.geneBounds) {
              const bt = Q.fmin < this.geneBounds.start, yt = Q.fmax > this.geneBounds.end;
              if (bt && yt)
                return;
            }
            let ot = jr(
              V,
              I(Q.fmin),
              I(Q.fmax)
            );
            if (q < o) {
              const bt = k.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${q * T + 10})`
              ), yt = Math.max(I(Q.fmin), 0), it = Math.min(I(Q.fmax), this.width);
              bt.append("polygon").datum(() => ({
                strand: tt.strand
              })).attr("class", "transArrow").attr("points", y).attr(
                "transform",
                () => tt.strand > 0 ? `translate(${it},0)` : `translate(${yt},${w}) rotate(180)`
              ).on("click", () => {
                $(
                  B,
                  Lt(Q),
                  P
                );
              }), bt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + O).attr("height", v).attr("transform", `translate(${yt},0)`).attr("width", it - yt).datum({
                fmin: Q.fmin,
                fmax: Q.fmax
              }).on("click", () => {
                $(
                  B,
                  Lt(Q),
                  P
                );
              });
              let dt = Q.name;
              tt.name !== Q.name && (dt += ` (${tt.name})`);
              let st = Math.max(I(Q.fmin), 0);
              const kt = bt.append("svg:text").attr("class", "transcriptLabel").attr("fill", nt ? "sandybrown" : "gray").attr("opacity", nt ? 1 : 0.5).attr("height", O).attr("transform", `translate(${st},0)`).text(dt).datum({
                fmin: Q.fmin
              }).on("click", () => {
                $(
                  B,
                  Lt(Q),
                  P
                );
              });
              let Dt = 100;
              try {
                Dt = kt.node()?.getBBox().width ?? 0;
              } catch {
              }
              if (Dt + st > this.width) {
                const Y = Dt + st - this.width;
                st -= Y, kt.attr("transform", `translate(${st},0)`);
              }
              let Tt = dt.length * 2;
              try {
                Tt = kt.node()?.getBBox().width ?? 0;
              } catch {
              }
              Number(Tt + I(Q.fmin)) > a;
              const lt = Tt > I(Q.fmax) - I(Q.fmin) ? I(Q.fmin) + Tt : I(Q.fmax);
              if (V[ot]) {
                const Y = V[ot];
                Y.push(`${I(Q.fmin)}:${lt}`), V[ot] = Y;
              } else
                V[ot] = [`${I(Q.fmin)}:${lt}`];
              (J < 0 || J > Q.fmin) && (J = Q.fmin), (et < 0 || et < Q.fmax) && (et = Q.fmax), Q.children && (Q.children = Q.children.sort(
                function(Y, vt) {
                  const pt = A[Y.type], gt = A[vt.type];
                  if (typeof pt == "number" && typeof gt == "number")
                    return pt - gt;
                  if (typeof pt == "number" && typeof gt != "number")
                    return -1;
                  if (typeof pt != "number" && typeof gt == "number")
                    return 1;
                  const xt = Y.type || "", U = vt.type || "";
                  return xt.localeCompare(U);
                }
              ), Q.children.forEach((Y) => {
                const vt = Y.type;
                if (I(Y.fmin) > this.width || I(Y.fmax) < 0)
                  return;
                const pt = Math.max(I(Y.fmin), 0), gt = Math.min(I(Y.fmax), this.width);
                u.includes(vt) ? bt.append("rect").attr("class", "exon").attr("x", pt).attr(
                  "transform",
                  `translate(0,${p - v})`
                ).attr("height", p).attr("z-index", 10).attr("width", gt - pt).datum({
                  fmin: Y.fmin,
                  fmax: Y.fmax
                }).on("click", () => {
                  $(
                    B,
                    Lt(Q),
                    P
                  );
                }) : c.includes(vt) ? bt.append("rect").attr("class", "CDS").attr("x", pt).attr(
                  "transform",
                  `translate(0,${m - v})`
                ).attr("z-index", 20).attr("height", m).attr("width", gt - pt).datum({
                  fmin: Y.fmin,
                  fmax: Y.fmax
                }).on("click", () => {
                  $(
                    B,
                    Lt(Q),
                    P
                  );
                }) : l.includes(vt) && bt.append("rect").attr("class", "UTR").attr("x", pt).attr(
                  "transform",
                  `translate(0,${R - v})`
                ).attr("z-index", 20).attr("height", R).attr("width", gt - pt).datum({
                  fmin: Y.fmin,
                  fmax: Y.fmax
                }).on("click", () => {
                  $(
                    B,
                    Lt(Q),
                    P
                  );
                });
              })), q += 1;
            }
            if (q === o) {
              const bt = Fs(
                i,
                s,
                this.region.start,
                this.region.end
              );
              ++ot, k.append("a").attr("class", "transcriptLabel").attr("href", bt).attr("target", "_blank").attr("rel", "noopener noreferrer").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${q * T + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", O).text("Maximum features displayed.  See full view for more.");
            }
          }
        });
      }
    }
    return q === 0 && k.append("text").attr("x", 30).attr("y", O + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), q * T;
  }
}
class th {
  constructor({ viewer: e, track: n, height: r, width: a }) {
    this.refSeq = "", this.viewer = e, this.width = a, this.height = r, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, r = _e().domain([this.track.start, this.track.end + 1]).range(this.track.range), a = Go(r).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((l, c) => n[c]).tickSize(8).tickSizeInner(8).tickPadding(6), i = Math.floor(n.length / 10), s = ui(r).ticks(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(a), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Er(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Er(".x-local-axis .tick text").each(function() {
      const c = ht(this).text();
      let u = "nucleotide nt-a";
      c === "T" ? u = "nucleotide nt-t" : c === "C" ? u = "nucleotide nt-c" : c === "G" && (u = "nucleotide nt-g"), ht(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, r = this.track.end, a = this.width, i = _e().domain([n, r]).range(this.track.range), s = ui(i).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", a).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, r) {
    return r ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((a, i) => e + i * 10) : new Array(n - e + 1).fill(0).map((a, i) => e + i);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const Ze = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var Yt = "$";
function Bn() {
}
Bn.prototype = ni.prototype = {
  constructor: Bn,
  has: function(t) {
    return Yt + t in this;
  },
  get: function(t) {
    return this[Yt + t];
  },
  set: function(t, e) {
    return this[Yt + t] = e, this;
  },
  remove: function(t) {
    var e = Yt + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === Yt && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === Yt && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === Yt) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === Yt && t(this[e], e.slice(1), this);
  }
};
function ni(t, e) {
  var n = new Bn();
  if (t instanceof Bn) t.each(function(o, l) {
    n.set(l, o);
  });
  else if (Array.isArray(t)) {
    var r = -1, a = t.length, i;
    if (e == null) for (; ++r < a; ) n.set(r, t[r]);
    else for (; ++r < a; ) n.set(e(i = t[r], r, t), i);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Ci() {
}
var ve = ni.prototype;
Ci.prototype = {
  constructor: Ci,
  has: ve.has,
  add: function(t) {
    return t += "", this[Yt + t] = t, this;
  },
  remove: ve.remove,
  clear: ve.clear,
  values: ve.keys,
  size: ve.size,
  empty: ve.empty,
  each: ve.each
};
var Or = "http://www.w3.org/1999/xhtml";
const Li = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Or,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function zs(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Li.hasOwnProperty(e) ? { space: Li[e], local: t } : t;
}
function eh(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Or && e.documentElement.namespaceURI === Or ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function nh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Bs(t) {
  var e = zs(t);
  return (e.local ? nh : eh)(e);
}
function rh() {
}
function Ps(t) {
  return t == null ? rh : function() {
    return this.querySelector(t);
  };
}
function ih(t) {
  typeof t != "function" && (t = Ps(t));
  for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
    for (var i = e[a], s = i.length, o = r[a] = new Array(s), l, c, u = 0; u < s; ++u)
      (l = i[u]) && (c = t.call(l, l.__data__, u, i)) && ("__data__" in l && (c.__data__ = l.__data__), o[u] = c);
  return new Gt(r, this._parents);
}
function ah() {
  return [];
}
function sh(t) {
  return t == null ? ah : function() {
    return this.querySelectorAll(t);
  };
}
function oh(t) {
  typeof t != "function" && (t = sh(t));
  for (var e = this._groups, n = e.length, r = [], a = [], i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l, c = 0; c < o; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), a.push(l));
  return new Gt(r, a);
}
function lh(t) {
  return function() {
    return this.matches(t);
  };
}
function ch(t) {
  typeof t != "function" && (t = lh(t));
  for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
    for (var i = e[a], s = i.length, o = r[a] = [], l, c = 0; c < s; ++c)
      (l = i[c]) && t.call(l, l.__data__, c, i) && o.push(l);
  return new Gt(r, this._parents);
}
function Hs(t) {
  return new Array(t.length);
}
function fh() {
  return new Gt(this._enter || this._groups.map(Hs), this._parents);
}
function Pn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Pn.prototype = {
  constructor: Pn,
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
function uh(t) {
  return function() {
    return t;
  };
}
var Fi = "$";
function hh(t, e, n, r, a, i) {
  for (var s = 0, o, l = e.length, c = i.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = i[s], r[s] = o) : n[s] = new Pn(t, i[s]);
  for (; s < l; ++s)
    (o = e[s]) && (a[s] = o);
}
function dh(t, e, n, r, a, i, s) {
  var o, l, c = {}, u = e.length, h = i.length, p = new Array(u), m;
  for (o = 0; o < u; ++o)
    (l = e[o]) && (p[o] = m = Fi + s.call(l, l.__data__, o, e), m in c ? a[o] = l : c[m] = l);
  for (o = 0; o < h; ++o)
    m = Fi + s.call(t, i[o], o, i), (l = c[m]) ? (r[o] = l, l.__data__ = i[o], c[m] = null) : n[o] = new Pn(t, i[o]);
  for (o = 0; o < u; ++o)
    (l = e[o]) && c[p[o]] === l && (a[o] = l);
}
function ph(t, e) {
  if (!t)
    return m = new Array(this.size()), c = -1, this.each(function(I) {
      m[++c] = I;
    }), m;
  var n = e ? dh : hh, r = this._parents, a = this._groups;
  typeof t != "function" && (t = uh(t));
  for (var i = a.length, s = new Array(i), o = new Array(i), l = new Array(i), c = 0; c < i; ++c) {
    var u = r[c], h = a[c], p = h.length, m = t.call(u, u && u.__data__, c, r), T = m.length, O = o[c] = new Array(T), R = s[c] = new Array(T), v = l[c] = new Array(p);
    n(u, h, O, R, v, m, e);
    for (var w = 0, x = 0, y, $; w < T; ++w)
      if (y = O[w]) {
        for (w >= x && (x = w + 1); !($ = R[x]) && ++x < T; ) ;
        y._next = $ || null;
      }
  }
  return s = new Gt(s, r), s._enter = o, s._exit = l, s;
}
function _h() {
  return new Gt(this._exit || this._groups.map(Hs), this._parents);
}
function mh(t, e, n) {
  var r = this.enter(), a = this, i = this.exit();
  return r = typeof t == "function" ? t(r) : r.append(t + ""), e != null && (a = e(a)), n == null ? i.remove() : n(i), r && a ? r.merge(a).order() : a;
}
function gh(t) {
  for (var e = this._groups, n = t._groups, r = e.length, a = n.length, i = Math.min(r, a), s = new Array(r), o = 0; o < i; ++o)
    for (var l = e[o], c = n[o], u = l.length, h = s[o] = new Array(u), p, m = 0; m < u; ++m)
      (p = l[m] || c[m]) && (h[m] = p);
  for (; o < r; ++o)
    s[o] = e[o];
  return new Gt(s, this._parents);
}
function vh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], a = r.length - 1, i = r[a], s; --a >= 0; )
      (s = r[a]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function wh(t) {
  t || (t = yh);
  function e(h, p) {
    return h && p ? t(h.__data__, p.__data__) : !h - !p;
  }
  for (var n = this._groups, r = n.length, a = new Array(r), i = 0; i < r; ++i) {
    for (var s = n[i], o = s.length, l = a[i] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new Gt(a, this._parents).order();
}
function yh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function bh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function xh() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function kh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], a = 0, i = r.length; a < i; ++a) {
      var s = r[a];
      if (s) return s;
    }
  return null;
}
function Sh() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function Th() {
  return !this.node();
}
function Eh(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var a = e[n], i = 0, s = a.length, o; i < s; ++i)
      (o = a[i]) && t.call(o, o.__data__, i, a);
  return this;
}
function Ah(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $h(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ih(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Nh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Dh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Rh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Mh(t, e) {
  var n = zs(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? $h : Ah : typeof e == "function" ? n.local ? Rh : Dh : n.local ? Nh : Ih)(n, e));
}
function Vs(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ch(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Lh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Fh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Oh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ch : typeof e == "function" ? Fh : Lh)(t, e, n ?? "")) : zh(this.node(), t);
}
function zh(t, e) {
  return t.style.getPropertyValue(e) || Vs(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Bh(t) {
  return function() {
    delete this[t];
  };
}
function Ph(t, e) {
  return function() {
    this[t] = e;
  };
}
function Hh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Vh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Bh : typeof e == "function" ? Hh : Ph)(t, e)) : this.node()[t];
}
function qs(t) {
  return t.trim().split(/^|\s+/);
}
function ri(t) {
  return t.classList || new Us(t);
}
function Us(t) {
  this._node = t, this._names = qs(t.getAttribute("class") || "");
}
Us.prototype = {
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
function Gs(t, e) {
  for (var n = ri(t), r = -1, a = e.length; ++r < a; ) n.add(e[r]);
}
function Zs(t, e) {
  for (var n = ri(t), r = -1, a = e.length; ++r < a; ) n.remove(e[r]);
}
function qh(t) {
  return function() {
    Gs(this, t);
  };
}
function Uh(t) {
  return function() {
    Zs(this, t);
  };
}
function Gh(t, e) {
  return function() {
    (e.apply(this, arguments) ? Gs : Zs)(this, t);
  };
}
function Zh(t, e) {
  var n = qs(t + "");
  if (arguments.length < 2) {
    for (var r = ri(this.node()), a = -1, i = n.length; ++a < i; ) if (!r.contains(n[a])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Gh : e ? qh : Uh)(n, e));
}
function Wh() {
  this.textContent = "";
}
function Xh(t) {
  return function() {
    this.textContent = t;
  };
}
function Kh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Yh(t) {
  return arguments.length ? this.each(t == null ? Wh : (typeof t == "function" ? Kh : Xh)(t)) : this.node().textContent;
}
function Jh() {
  this.innerHTML = "";
}
function Qh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function jh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function td(t) {
  return arguments.length ? this.each(t == null ? Jh : (typeof t == "function" ? jh : Qh)(t)) : this.node().innerHTML;
}
function ed() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function nd() {
  return this.each(ed);
}
function rd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function id() {
  return this.each(rd);
}
function ad(t) {
  var e = typeof t == "function" ? t : Bs(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function sd() {
  return null;
}
function od(t, e) {
  var n = typeof t == "function" ? t : Bs(t), r = e == null ? sd : typeof e == "function" ? e : Ps(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ld() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function cd() {
  return this.each(ld);
}
function fd() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ud() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function hd(t) {
  return this.select(t ? ud : fd);
}
function dd(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ws = {};
if (typeof document < "u") {
  var pd = document.documentElement;
  "onmouseenter" in pd || (Ws = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function _d(t, e, n) {
  return t = Xs(t, e, n), function(r) {
    var a = r.relatedTarget;
    (!a || a !== this && !(a.compareDocumentPosition(this) & 8)) && t.call(this, r);
  };
}
function Xs(t, e, n) {
  return function(r) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function md(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function gd(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, a = e.length, i; n < a; ++n)
        i = e[n], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.capture) : e[++r] = i;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function vd(t, e, n) {
  var r = Ws.hasOwnProperty(t.type) ? _d : Xs;
  return function(a, i, s) {
    var o = this.__on, l, c = r(e, i, s);
    if (o) {
      for (var u = 0, h = o.length; u < h; ++u)
        if ((l = o[u]).type === t.type && l.name === t.name) {
          this.removeEventListener(l.type, l.listener, l.capture), this.addEventListener(l.type, l.listener = c, l.capture = n), l.value = e;
          return;
        }
    }
    this.addEventListener(t.type, c, n), l = { type: t.type, name: t.name, value: e, listener: c, capture: n }, o ? o.push(l) : this.__on = [l];
  };
}
function wd(t, e, n) {
  var r = md(t + ""), a, i = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var l = 0, c = o.length, u; l < c; ++l)
        for (a = 0, u = o[l]; a < i; ++a)
          if ((s = r[a]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? vd : gd, n == null && (n = !1), a = 0; a < i; ++a) this.each(o(r[a], e, n));
  return this;
}
function Ks(t, e, n) {
  var r = Vs(t), a = r.CustomEvent;
  typeof a == "function" ? a = new a(e, n) : (a = r.document.createEvent("Event"), n ? (a.initEvent(e, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(e, !1, !1)), t.dispatchEvent(a);
}
function yd(t, e) {
  return function() {
    return Ks(this, t, e);
  };
}
function bd(t, e) {
  return function() {
    return Ks(this, t, e.apply(this, arguments));
  };
}
function xd(t, e) {
  return this.each((typeof e == "function" ? bd : yd)(t, e));
}
var Ys = [null];
function Gt(t, e) {
  this._groups = t, this._parents = e;
}
function zr() {
  return new Gt([[document.documentElement]], Ys);
}
Gt.prototype = zr.prototype = {
  constructor: Gt,
  select: ih,
  selectAll: oh,
  filter: ch,
  data: ph,
  enter: fh,
  exit: _h,
  join: mh,
  merge: gh,
  order: vh,
  sort: wh,
  call: bh,
  nodes: xh,
  node: kh,
  size: Sh,
  empty: Th,
  each: Eh,
  attr: Mh,
  style: Oh,
  property: Vh,
  classed: Zh,
  text: Yh,
  html: td,
  raise: nd,
  lower: id,
  append: ad,
  insert: od,
  remove: cd,
  clone: hd,
  datum: dd,
  on: wd,
  dispatch: xd
};
function Oi(t) {
  return typeof t == "string" ? new Gt([[document.querySelector(t)]], [document.documentElement]) : new Gt([[t]], Ys);
}
function kd() {
  var t = c, e = u, n = h, r = document.body, a = I(), i = null, s = null, o = null;
  function l(k) {
    i = A(k), i && (s = i.createSVGPoint(), r.appendChild(a));
  }
  l.show = function() {
    var k = Array.prototype.slice.call(arguments);
    k[k.length - 1] instanceof SVGElement && (o = k.pop());
    var q = n.apply(this, k), V = e.apply(this, k), J = t.apply(this, k), et = B(), at = m.length, F, tt = document.documentElement.scrollTop || r.scrollTop, rt = document.documentElement.scrollLeft || r.scrollLeft;
    for (et.html(q).style("opacity", 1).style("pointer-events", "all"); at--; ) et.classed(m[at], !1);
    return F = p.get(J).apply(this), et.classed(J, !0).style("top", F.top + V[0] + tt + "px").style("left", F.left + V[1] + rt + "px"), l;
  }, l.hide = function() {
    var k = B();
    return k.style("opacity", 0).style("pointer-events", "none"), l;
  }, l.attr = function(k, q) {
    if (arguments.length < 2 && typeof k == "string")
      return B().attr(k);
    var V = Array.prototype.slice.call(arguments);
    return zr.prototype.attr.apply(B(), V), l;
  }, l.style = function(k, q) {
    if (arguments.length < 2 && typeof k == "string")
      return B().style(k);
    var V = Array.prototype.slice.call(arguments);
    return zr.prototype.style.apply(B(), V), l;
  }, l.direction = function(k) {
    return arguments.length ? (t = k == null ? k : z(k), l) : t;
  }, l.offset = function(k) {
    return arguments.length ? (e = k == null ? k : z(k), l) : e;
  }, l.html = function(k) {
    return arguments.length ? (n = k == null ? k : z(k), l) : n;
  }, l.rootElement = function(k) {
    return arguments.length ? (r = k == null ? k : z(k), l) : r;
  }, l.destroy = function() {
    return a && (B().remove(), a = null), l;
  };
  function c() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function h() {
    return " ";
  }
  var p = ni({
    n: T,
    s: O,
    e: R,
    w: v,
    nw: w,
    ne: x,
    sw: y,
    se: $
  }), m = p.keys();
  function T() {
    var k = P(this);
    return {
      top: k.n.y - a.offsetHeight,
      left: k.n.x - a.offsetWidth / 2
    };
  }
  function O() {
    var k = P(this);
    return {
      top: k.s.y,
      left: k.s.x - a.offsetWidth / 2
    };
  }
  function R() {
    var k = P(this);
    return {
      top: k.e.y - a.offsetHeight / 2,
      left: k.e.x
    };
  }
  function v() {
    var k = P(this);
    return {
      top: k.w.y - a.offsetHeight / 2,
      left: k.w.x - a.offsetWidth
    };
  }
  function w() {
    var k = P(this);
    return {
      top: k.nw.y - a.offsetHeight,
      left: k.nw.x - a.offsetWidth
    };
  }
  function x() {
    var k = P(this);
    return {
      top: k.ne.y - a.offsetHeight,
      left: k.ne.x
    };
  }
  function y() {
    var k = P(this);
    return {
      top: k.sw.y,
      left: k.sw.x - a.offsetWidth
    };
  }
  function $() {
    var k = P(this);
    return {
      top: k.se.y,
      left: k.se.x
    };
  }
  function I() {
    var k = Oi(document.createElement("div"));
    return k.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), k.node();
  }
  function A(k) {
    var q = k.node();
    return q ? q.tagName.toLowerCase() === "svg" ? q : q.ownerSVGElement : null;
  }
  function B() {
    return a == null && (a = I(), r.appendChild(a)), Oi(a);
  }
  function P(k) {
    for (var q = o || k; q.getScreenCTM == null && q.parentNode != null; )
      q = q.parentNode;
    var V = {}, J = q.getScreenCTM(), et = q.getBBox(), at = et.width, F = et.height, tt = et.x, rt = et.y;
    return s.x = tt, s.y = rt, V.nw = s.matrixTransform(J), s.x += at, V.ne = s.matrixTransform(J), s.y += F, V.se = s.matrixTransform(J), s.x -= at, V.sw = s.matrixTransform(J), s.y -= F / 2, V.w = s.matrixTransform(J), s.x += at, V.e = s.matrixTransform(J), s.x -= at / 2, s.y -= F / 2, V.n = s.matrixTransform(J), s.y += F, V.s = s.matrixTransform(J), V;
  }
  function z(k) {
    return typeof k == "function" ? k : function() {
      return k;
    };
  }
  return l;
}
class Sd {
  constructor({
    region: e,
    viewer: n,
    height: r,
    width: a,
    range: i
  }) {
    this.variants = [], this.viewer = n, this.width = a, this.height = r, this.region = e, this.range = i;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = _e().domain([this.region.start, this.region.end + 1]).range(this.range), a = ks().type(xs).size(20), i = kd();
    i.attr("class", "d3-tip").html(
      // @ts-expect-error
      (h) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${h.position}</td></tr><tr><td>Mutation</td> <td>${h.ref} > ${h.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(i);
    const s = 20, o = qe(this.viewer), l = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    l.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), l.selectAll("path").data(n).enter().append("path").attr("d", a).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (h) => `translate(${r(h.position)},10)`).on("mouseenter", i.show).on("mouseout", i.hide);
    const u = ht("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    u.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), u.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class Td {
  constructor({
    viewer: e,
    track: n,
    height: r,
    width: a,
    region: i
  }) {
    this.variants = [], this.region = i, this.viewer = e, this.width = a, this.height = r, this.track = n;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = _e().domain([this.region.start, this.region.end]).range(this.track.range), a = ks().type(xs).size(20), i = 20, s = qe(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", i).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", a).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (l) => `translate(${r(l.position)},10)`);
  }
  async getTrackData() {
  }
}
function Kn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var rr, zi;
function Ed() {
  if (zi) return rr;
  zi = 1;
  class t {
    constructor(n = {}) {
      if (!(n.maxSize && n.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      this.maxSize = n.maxSize, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
    }
    _set(n, r) {
      this.cache.set(n, r), this._size++, this._size >= this.maxSize && (this._size = 0, this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
    }
    get(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n)) {
        const r = this.oldCache.get(n);
        return this.oldCache.delete(n), this._set(n, r), r;
      }
    }
    set(n, r) {
      return this.cache.has(n) ? this.cache.set(n, r) : this._set(n, r), this;
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
      const r = this.cache.delete(n);
      return r && this._size--, this.oldCache.delete(n) || r;
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
        const [r] = n;
        this.cache.has(r) || (yield n);
      }
    }
    get size() {
      let n = 0;
      for (const r of this.oldCache.keys())
        this.cache.has(r) || n++;
      return this._size + n;
    }
  }
  return rr = t, rr;
}
var Ad = Ed();
const Yn = /* @__PURE__ */ Kn(Ad);
class $d {
}
class Id {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new $d()) {
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
class Nd {
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
class $e {
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
  fill(e, n, r, a) {
    const i = new Id(), s = new Nd();
    s.addCallback(a);
    const o = {
      aborter: i,
      promise: this.fillCallback(n, i.signal, (l) => {
        s.callback(l);
      }),
      settled: !1,
      statusReporter: s,
      get aborted() {
        return this.aborter.signal.aborted;
      }
    };
    o.aborter.addSignal(r), o.aborter.signal.addEventListener("abort", () => {
      o.settled || this.evict(e, o);
    }), o.promise.then(() => {
      o.settled = !0;
    }, () => {
      o.settled = !0, this.evict(e, o);
    }).catch((l) => {
      throw console.error(l), l;
    }), this.cache.set(e, o);
  }
  static checkSinglePromise(e, n) {
    function r() {
      if (n?.aborted)
        throw Object.assign(new Error("aborted"), { code: "ERR_ABORTED" });
    }
    return e.then((a) => (r(), a), (a) => {
      throw r(), a;
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
  get(e, n, r, a) {
    if (!r && n instanceof AbortSignal)
      throw new TypeError("second get argument appears to be an AbortSignal, perhaps you meant to pass `null` for the fill data?");
    const i = this.cache.get(e);
    return i ? i.aborted && !i.settled ? (this.evict(e, i), this.get(e, n, r, a)) : i.settled ? i.promise : (i.aborter.addSignal(r), i.statusReporter.addCallback(a), $e.checkSinglePromise(i.promise, r)) : (this.fill(e, n, r, a), $e.checkSinglePromise(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.cache.get(e).promise,
      r
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
    for (let r = e.next(); !r.done; r = e.next())
      this.delete(r.value), n += 1;
    return n;
  }
}
var $n = { exports: {} }, Dd = $n.exports, Bi;
function Rd() {
  return Bi || (Bi = 1, function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Dd, function() {
      const n = /^[\w+.-]+:\/\//, r = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, a = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function i(w) {
        return n.test(w);
      }
      function s(w) {
        return w.startsWith("//");
      }
      function o(w) {
        return w.startsWith("/");
      }
      function l(w) {
        return w.startsWith("file:");
      }
      function c(w) {
        return /^[.?#]/.test(w);
      }
      function u(w) {
        const x = r.exec(w);
        return p(x[1], x[2] || "", x[3], x[4] || "", x[5] || "/", x[6] || "", x[7] || "");
      }
      function h(w) {
        const x = a.exec(w), y = x[2];
        return p("file:", "", x[1] || "", "", o(y) ? y : "/" + y, x[3] || "", x[4] || "");
      }
      function p(w, x, y, $, I, A, B) {
        return {
          scheme: w,
          user: x,
          host: y,
          port: $,
          path: I,
          query: A,
          hash: B,
          type: 7
        };
      }
      function m(w) {
        if (s(w)) {
          const y = u("http:" + w);
          return y.scheme = "", y.type = 6, y;
        }
        if (o(w)) {
          const y = u("http://foo.com" + w);
          return y.scheme = "", y.host = "", y.type = 5, y;
        }
        if (l(w))
          return h(w);
        if (i(w))
          return u(w);
        const x = u("http://foo.com/" + w);
        return x.scheme = "", x.host = "", x.type = w ? w.startsWith("?") ? 3 : w.startsWith("#") ? 2 : 4 : 1, x;
      }
      function T(w) {
        if (w.endsWith("/.."))
          return w;
        const x = w.lastIndexOf("/");
        return w.slice(0, x + 1);
      }
      function O(w, x) {
        R(x, x.type), w.path === "/" ? w.path = x.path : w.path = T(x.path) + w.path;
      }
      function R(w, x) {
        const y = x <= 4, $ = w.path.split("/");
        let I = 1, A = 0, B = !1;
        for (let z = 1; z < $.length; z++) {
          const k = $[z];
          if (!k) {
            B = !0;
            continue;
          }
          if (B = !1, k !== ".") {
            if (k === "..") {
              A ? (B = !0, A--, I--) : y && ($[I++] = k);
              continue;
            }
            $[I++] = k, A++;
          }
        }
        let P = "";
        for (let z = 1; z < I; z++)
          P += "/" + $[z];
        (!P || B && !P.endsWith("/..")) && (P += "/"), w.path = P;
      }
      function v(w, x) {
        if (!w && !x)
          return "";
        const y = m(w);
        let $ = y.type;
        if (x && $ !== 7) {
          const A = m(x), B = A.type;
          switch ($) {
            case 1:
              y.hash = A.hash;
            // fall through
            case 2:
              y.query = A.query;
            // fall through
            case 3:
            case 4:
              O(y, A);
            // fall through
            case 5:
              y.user = A.user, y.host = A.host, y.port = A.port;
            // fall through
            case 6:
              y.scheme = A.scheme;
          }
          B > $ && ($ = B);
        }
        R(y, $);
        const I = y.query + y.hash;
        switch ($) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return I;
          case 4: {
            const A = y.path.slice(1);
            return A ? c(x || w) && !c(A) ? "./" + A + I : A + I : I || ".";
          }
          case 5:
            return y.path + I;
          default:
            return y.scheme + "//" + y.user + y.host + y.port + y.path + I;
        }
      }
      return v;
    });
  }($n)), $n.exports;
}
var Md = Rd();
const Cd = /* @__PURE__ */ Kn(Md);
async function ii(t, e, n = {}) {
  const { defaultContent: r = {} } = n;
  try {
    const a = await e(t, { encoding: "utf8" }), i = new TextDecoder("utf8");
    return JSON.parse(i.decode(a));
  } catch (a) {
    if (a.code === "ENOENT" || a.status === 404 || a.message.includes("404") || a.message.includes("ENOENT"))
      return r;
    throw a;
  }
}
function ai(t, e = ".") {
  return Cd(t, e);
}
class Ld {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new $e({
      cache: new Yn({ maxSize: n }),
      fill: this.readChunkItems.bind(this)
    }), this.readFile = e, !this.readFile)
      throw new Error('must provide a "readFile" function');
  }
  importExisting(e, n, r, a, i) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = i, this.baseURL = r, this.lazyUrlTemplate = a;
  }
  binarySearch(e, n, r) {
    let a = -1, i = e.length, s;
    for (; i - a > 1; )
      s = a + i >>> 1, r(e[s]) >= n ? i = s : a = s;
    return r === this.end ? i : a;
  }
  readChunkItems(e) {
    const n = ai(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return ii(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, r, a, i, s, o) {
    const l = this.attrs.makeGetter("Chunk"), c = this.attrs.makeGetter("Sublist"), u = [];
    for (let h = this.binarySearch(e, n, i); h < e.length && h >= 0 && a * s(e[h]) < a * r; h += a) {
      if (e[h][0] === this.lazyClass) {
        const m = l(e[h]), T = this.chunkCache.get(m, m).then((O) => [O, m]);
        u.push(T);
      } else
        yield [e[h], o.concat(h)];
      const p = c(e[h]);
      p && (yield* this.iterateSublist(p, n, r, a, i, s, o.concat(h)));
    }
    for (const h of u) {
      const [p, m] = await h;
      p && (yield* this.iterateSublist(p, n, r, a, i, s, [
        ...o,
        m
      ]));
    }
  }
  async *iterate(e, n) {
    const r = e > n ? -1 : 1, a = e > n ? this.start : this.end, i = e > n ? this.end : this.start;
    this.topList.length > 0 && (yield* this.iterateSublist(this.topList, e, n, r, a, i, [0]));
  }
  async histogram(e, n, r) {
    const a = new Array(r);
    a.fill(0);
    const i = (n - e) / r;
    for await (const s of this.iterate(e, n)) {
      const o = Math.max(0, (this.start(s) - e) / i | 0), l = Math.min(r, (this.end(s) - e) / i | 0);
      for (let c = o; c <= l; c += 1)
        a[c] += 1;
    }
    return a;
  }
}
class Fd {
  constructor(e) {
    this.classes = e, this.fields = [];
    for (let n = 0; n < e.length; n += 1) {
      this.fields[n] = {};
      for (let r = 0; r < e[n].attributes.length; r += 1)
        this.fields[n][e[n].attributes[r]] = r + 1;
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
    const r = n.toLowerCase();
    if (r in this.fields[e[0]])
      return e[this.fields[e[0]][r]];
    const a = this.classes[e[0]].attributes.length + 1;
    return a >= e.length || !(n in e[a]) ? n in this.classes[e[0]].proto ? this.classes[e[0]].proto[n] : void 0 : e[a][n];
  }
  makeSetter(e) {
    return (n, r) => {
      this.set(n, e, r);
    };
  }
  makeGetter(e) {
    return (n) => this.get(n, e);
  }
  makeFastGetter(e) {
    const n = this.attrIndices(e);
    return function(a) {
      if (n[a[0]] !== void 0)
        return a[n[a[0]]];
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
      get(a) {
        const i = this.get.field_accessors[a.toLowerCase()];
        if (i)
          return i.call(this);
      },
      set(a, i) {
        const s = this.set.field_accessors[a];
        if (s)
          return s.call(this, i);
      },
      tags() {
        return r[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((a, i) => {
      (a.attributes || []).forEach((s, o) => {
        e[s] = e[s] || [], e[s][i] = o + 1, s = s.toLowerCase(), e[s] = e[s] || [], e[s][i] = o + 1;
      });
    });
    const r = this.classes.map((a) => a.attributes);
    return Object.keys(e).forEach((a) => {
      const i = e[a];
      n.get.field_accessors[a] = i ? function() {
        return this[i[this[0]]];
      } : function() {
      };
    }), n;
  }
}
class Od {
  constructor({ urlTemplate: e, chunkSize: n, length: r, cacheSize: a = 100, readFile: i }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = r, this.baseUrl = s === void 0 ? "" : s, this.readFile = i, !i)
      throw new Error("must provide readFile callback");
    this.chunkCache = new $e({
      cache: new Yn({ maxSize: a }),
      fill: this.getChunk.bind(this)
    });
  }
  /**
   * call the callback on one element of the array
   * @param i index
   * @param callback callback, gets called with (i, value, param)
   * @param param (optional) callback will get this as its last parameter
   */
  index(e, n, r) {
    this.range(e, e, n, void 0, r);
  }
  /**
   * async generator for the elements in the range [start,end]
   *
   * @param start index of first element to call the callback on
   * @param end index of last element to call the callback on
   */
  async *range(e, n) {
    e = Math.max(0, e), n = Math.min(n, this.length - 1);
    const r = Math.floor(e / this.chunkSize), a = Math.floor(n / this.chunkSize), i = [];
    for (let s = r; s <= a; s += 1)
      i.push(this.chunkCache.get(s, s));
    for (const s of i) {
      const [o, l] = await s;
      yield* this.filterChunkData(e, n, o, l);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = ai(n, this.baseUrl));
    const r = await ii(n, this.readFile);
    return [e, r];
  }
  *filterChunkData(e, n, r, a) {
    const i = r * this.chunkSize, s = Math.max(0, e - i), o = Math.min(n - i, this.chunkSize - 1);
    for (let l = s; l <= o; l += 1)
      yield [l + i, a[l]];
  }
}
function zd() {
  return this._uniqueID;
}
function Bd() {
  return this._parent;
}
function Pd() {
  return this.get("subfeatures");
}
class Hd {
  constructor({ baseUrl: e, urlTemplate: n, readFile: r, cacheSize: a = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = r, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new $e({
      cache: new Yn({ maxSize: a }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new Ld({ readFile: this.readFile });
  }
  loadNCList(e, n, r) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, r, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = ai(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return ii(n, this.readFile).then((r) => (
      // trackInfo = JSON.parse( trackInfo );
      this.parseTrackInfo(r, n)
    ));
  }
  parseTrackInfo(e, n) {
    const r = {
      nclist: this.makeNCList(),
      stats: {
        featureCount: e.featureCount || 0
      }
    };
    e.intervals && (r.attrs = new Fd(e.intervals.classes), this.loadNCList(r, e, n));
    const { histograms: a } = e;
    if (a?.meta) {
      for (let i = 0; i < a.meta.length; i += 1)
        a.meta[i].lazyArray = new Od({ ...a.meta[i].arrayParams, readFile: this.readFile }, n);
      r._histograms = a;
    }
    return r._histograms && Object.keys(r._histograms).forEach((i) => {
      r._histograms[i].forEach((o) => {
        Object.keys(o).forEach((l) => {
          typeof o[l] == "string" && String(Number(o[l])) === o[l] && (o[l] = Number(o[l]));
        });
      });
    }), r;
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
  async getRegionFeatureDensities({ refName: e, start: n, end: r, numBins: a, basesPerBin: i }) {
    const s = await this.getDataRoot(e);
    if (a)
      i = (r - n) / a;
    else if (i)
      a = Math.ceil((r - n) / i);
    else
      throw new TypeError("numBins or basesPerBin arg required for getRegionFeatureDensities");
    const l = (s._histograms.stats || []).find((p) => p.basesPerBin >= i);
    let c = s._histograms.meta[0];
    for (let p = 0; p < s._histograms.meta.length; p += 1)
      i >= s._histograms.meta[p].basesPerBin && (c = s._histograms.meta[p]);
    let u = i / c.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const p = Math.floor(n / c.basesPerBin);
      u = Math.round(u);
      const m = [];
      for (let T = 0; T < a; T += 1)
        m[T] = 0;
      for await (const [T, O] of c.lazyArray.range(p, p + u * a - 1))
        m[Math.floor((T - p) / u)] += O;
      return { bins: m, stats: l };
    }
    return { bins: await s.nclist.histogram(n, r, a), stats: l };
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
  async *getFeatures({ refName: e, start: n, end: r }) {
    const a = await this.getDataRoot(e), i = a.attrs?.accessors();
    for await (const [s, o] of a.nclist.iterate(n, r)) {
      if (!s.decorated) {
        const l = o.join(",");
        this.decorateFeature(i, s, `${e},${l}`);
      }
      yield s;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, r, a) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = r, n.id = zd, n._parent = a, n.parent = Bd, n.children = Pd, (n.get("subfeatures") || []).forEach((i, s) => {
      this.decorateFeature(e, i, `${r}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Ue(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const Vd = 3, qd = 258, Js = 29, Ud = 256, Gd = Ud + 1 + Js, Qs = 30, Zd = 512, Wd = new Array((Gd + 2) * 2);
Ue(Wd);
const Xd = new Array(Qs * 2);
Ue(Xd);
const Kd = new Array(Zd);
Ue(Kd);
const Yd = new Array(qd - Vd + 1);
Ue(Yd);
const Jd = new Array(Js);
Ue(Jd);
const Qd = new Array(Qs);
Ue(Qd);
const jd = (t, e, n, r) => {
  let a = t & 65535 | 0, i = t >>> 16 & 65535 | 0, s = 0;
  for (; n !== 0; ) {
    s = n > 2e3 ? 2e3 : n, n -= s;
    do
      a = a + e[r++] | 0, i = i + a | 0;
    while (--s);
    a %= 65521, i %= 65521;
  }
  return a | i << 16 | 0;
};
var Br = jd;
const t0 = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var r = 0; r < 8; r++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, e0 = new Uint32Array(t0()), n0 = (t, e, n, r) => {
  const a = e0, i = r + n;
  t ^= -1;
  for (let s = r; s < i; s++)
    t = t >>> 8 ^ a[(t ^ e[s]) & 255];
  return t ^ -1;
};
var ie = n0, Pr = {
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
}, js = {
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
const r0 = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var i0 = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const r in n)
        r0(n, r) && (t[r] = n[r]);
    }
  }
  return t;
}, a0 = (t) => {
  let e = 0;
  for (let r = 0, a = t.length; r < a; r++)
    e += t[r].length;
  const n = new Uint8Array(e);
  for (let r = 0, a = 0, i = t.length; r < i; r++) {
    let s = t[r];
    n.set(s, a), a += s.length;
  }
  return n;
}, to = {
  assign: i0,
  flattenChunks: a0
};
let eo = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  eo = !1;
}
const rn = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  rn[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
rn[254] = rn[254] = 1;
var s0 = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, r, a, i, s = t.length, o = 0;
  for (a = 0; a < s; a++)
    n = t.charCodeAt(a), (n & 64512) === 55296 && a + 1 < s && (r = t.charCodeAt(a + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), i = 0, a = 0; i < o; a++)
    n = t.charCodeAt(a), (n & 64512) === 55296 && a + 1 < s && (r = t.charCodeAt(a + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++)), n < 128 ? e[i++] = n : n < 2048 ? (e[i++] = 192 | n >>> 6, e[i++] = 128 | n & 63) : n < 65536 ? (e[i++] = 224 | n >>> 12, e[i++] = 128 | n >>> 6 & 63, e[i++] = 128 | n & 63) : (e[i++] = 240 | n >>> 18, e[i++] = 128 | n >>> 12 & 63, e[i++] = 128 | n >>> 6 & 63, e[i++] = 128 | n & 63);
  return e;
};
const o0 = (t, e) => {
  if (e < 65534 && t.subarray && eo)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let r = 0; r < e; r++)
    n += String.fromCharCode(t[r]);
  return n;
};
var l0 = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let r, a;
  const i = new Array(n * 2);
  for (a = 0, r = 0; r < n; ) {
    let s = t[r++];
    if (s < 128) {
      i[a++] = s;
      continue;
    }
    let o = rn[s];
    if (o > 4) {
      i[a++] = 65533, r += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < n; )
      s = s << 6 | t[r++] & 63, o--;
    if (o > 1) {
      i[a++] = 65533;
      continue;
    }
    s < 65536 ? i[a++] = s : (s -= 65536, i[a++] = 55296 | s >> 10 & 1023, i[a++] = 56320 | s & 1023);
  }
  return o0(i, a);
}, c0 = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + rn[t[n]] > e ? n : e;
}, Hr = {
  string2buf: s0,
  buf2string: l0,
  utf8border: c0
};
function f0() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var u0 = f0;
const mn = 16209, h0 = 16191;
var d0 = function(e, n) {
  let r, a, i, s, o, l, c, u, h, p, m, T, O, R, v, w, x, y, $, I, A, B, P, z;
  const k = e.state;
  r = e.next_in, P = e.input, a = r + (e.avail_in - 5), i = e.next_out, z = e.output, s = i - (n - e.avail_out), o = i + (e.avail_out - 257), l = k.dmax, c = k.wsize, u = k.whave, h = k.wnext, p = k.window, m = k.hold, T = k.bits, O = k.lencode, R = k.distcode, v = (1 << k.lenbits) - 1, w = (1 << k.distbits) - 1;
  t:
    do {
      T < 15 && (m += P[r++] << T, T += 8, m += P[r++] << T, T += 8), x = O[m & v];
      e:
        for (; ; ) {
          if (y = x >>> 24, m >>>= y, T -= y, y = x >>> 16 & 255, y === 0)
            z[i++] = x & 65535;
          else if (y & 16) {
            $ = x & 65535, y &= 15, y && (T < y && (m += P[r++] << T, T += 8), $ += m & (1 << y) - 1, m >>>= y, T -= y), T < 15 && (m += P[r++] << T, T += 8, m += P[r++] << T, T += 8), x = R[m & w];
            n:
              for (; ; ) {
                if (y = x >>> 24, m >>>= y, T -= y, y = x >>> 16 & 255, y & 16) {
                  if (I = x & 65535, y &= 15, T < y && (m += P[r++] << T, T += 8, T < y && (m += P[r++] << T, T += 8)), I += m & (1 << y) - 1, I > l) {
                    e.msg = "invalid distance too far back", k.mode = mn;
                    break t;
                  }
                  if (m >>>= y, T -= y, y = i - s, I > y) {
                    if (y = I - y, y > u && k.sane) {
                      e.msg = "invalid distance too far back", k.mode = mn;
                      break t;
                    }
                    if (A = 0, B = p, h === 0) {
                      if (A += c - y, y < $) {
                        $ -= y;
                        do
                          z[i++] = p[A++];
                        while (--y);
                        A = i - I, B = z;
                      }
                    } else if (h < y) {
                      if (A += c + h - y, y -= h, y < $) {
                        $ -= y;
                        do
                          z[i++] = p[A++];
                        while (--y);
                        if (A = 0, h < $) {
                          y = h, $ -= y;
                          do
                            z[i++] = p[A++];
                          while (--y);
                          A = i - I, B = z;
                        }
                      }
                    } else if (A += h - y, y < $) {
                      $ -= y;
                      do
                        z[i++] = p[A++];
                      while (--y);
                      A = i - I, B = z;
                    }
                    for (; $ > 2; )
                      z[i++] = B[A++], z[i++] = B[A++], z[i++] = B[A++], $ -= 3;
                    $ && (z[i++] = B[A++], $ > 1 && (z[i++] = B[A++]));
                  } else {
                    A = i - I;
                    do
                      z[i++] = z[A++], z[i++] = z[A++], z[i++] = z[A++], $ -= 3;
                    while ($ > 2);
                    $ && (z[i++] = z[A++], $ > 1 && (z[i++] = z[A++]));
                  }
                } else if ((y & 64) === 0) {
                  x = R[(x & 65535) + (m & (1 << y) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", k.mode = mn;
                  break t;
                }
                break;
              }
          } else if ((y & 64) === 0) {
            x = O[(x & 65535) + (m & (1 << y) - 1)];
            continue e;
          } else if (y & 32) {
            k.mode = h0;
            break t;
          } else {
            e.msg = "invalid literal/length code", k.mode = mn;
            break t;
          }
          break;
        }
    } while (r < a && i < o);
  $ = T >> 3, r -= $, T -= $ << 3, m &= (1 << T) - 1, e.next_in = r, e.next_out = i, e.avail_in = r < a ? 5 + (a - r) : 5 - (r - a), e.avail_out = i < o ? 257 + (o - i) : 257 - (i - o), k.hold = m, k.bits = T;
};
const Me = 15, Pi = 852, Hi = 592, Vi = 0, ir = 1, qi = 2, p0 = new Uint16Array([
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
]), _0 = new Uint8Array([
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
]), m0 = new Uint16Array([
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
]), g0 = new Uint8Array([
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
]), v0 = (t, e, n, r, a, i, s, o) => {
  const l = o.bits;
  let c = 0, u = 0, h = 0, p = 0, m = 0, T = 0, O = 0, R = 0, v = 0, w = 0, x, y, $, I, A, B = null, P;
  const z = new Uint16Array(Me + 1), k = new Uint16Array(Me + 1);
  let q = null, V, J, et;
  for (c = 0; c <= Me; c++)
    z[c] = 0;
  for (u = 0; u < r; u++)
    z[e[n + u]]++;
  for (m = l, p = Me; p >= 1 && z[p] === 0; p--)
    ;
  if (m > p && (m = p), p === 0)
    return a[i++] = 1 << 24 | 64 << 16 | 0, a[i++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (h = 1; h < p && z[h] === 0; h++)
    ;
  for (m < h && (m = h), R = 1, c = 1; c <= Me; c++)
    if (R <<= 1, R -= z[c], R < 0)
      return -1;
  if (R > 0 && (t === Vi || p !== 1))
    return -1;
  for (k[1] = 0, c = 1; c < Me; c++)
    k[c + 1] = k[c] + z[c];
  for (u = 0; u < r; u++)
    e[n + u] !== 0 && (s[k[e[n + u]]++] = u);
  if (t === Vi ? (B = q = s, P = 20) : t === ir ? (B = p0, q = _0, P = 257) : (B = m0, q = g0, P = 0), w = 0, u = 0, c = h, A = i, T = m, O = 0, $ = -1, v = 1 << m, I = v - 1, t === ir && v > Pi || t === qi && v > Hi)
    return 1;
  for (; ; ) {
    V = c - O, s[u] + 1 < P ? (J = 0, et = s[u]) : s[u] >= P ? (J = q[s[u] - P], et = B[s[u] - P]) : (J = 96, et = 0), x = 1 << c - O, y = 1 << T, h = y;
    do
      y -= x, a[A + (w >> O) + y] = V << 24 | J << 16 | et | 0;
    while (y !== 0);
    for (x = 1 << c - 1; w & x; )
      x >>= 1;
    if (x !== 0 ? (w &= x - 1, w += x) : w = 0, u++, --z[c] === 0) {
      if (c === p)
        break;
      c = e[n + s[u]];
    }
    if (c > m && (w & I) !== $) {
      for (O === 0 && (O = m), A += h, T = c - O, R = 1 << T; T + O < p && (R -= z[T + O], !(R <= 0)); )
        T++, R <<= 1;
      if (v += 1 << T, t === ir && v > Pi || t === qi && v > Hi)
        return 1;
      $ = w & I, a[$] = m << 24 | T << 16 | A - i | 0;
    }
  }
  return w !== 0 && (a[A + w] = c - O << 24 | 64 << 16 | 0), o.bits = m, 0;
};
var je = v0;
const w0 = 0, no = 1, ro = 2, {
  Z_FINISH: Ui,
  Z_BLOCK: y0,
  Z_TREES: gn,
  Z_OK: Ie,
  Z_STREAM_END: b0,
  Z_NEED_DICT: x0,
  Z_STREAM_ERROR: Jt,
  Z_DATA_ERROR: io,
  Z_MEM_ERROR: ao,
  Z_BUF_ERROR: k0,
  Z_DEFLATED: Gi
} = js, Jn = 16180, Zi = 16181, Wi = 16182, Xi = 16183, Ki = 16184, Yi = 16185, Ji = 16186, Qi = 16187, ji = 16188, ta = 16189, Hn = 16190, fe = 16191, ar = 16192, ea = 16193, sr = 16194, na = 16195, ra = 16196, ia = 16197, aa = 16198, vn = 16199, wn = 16200, sa = 16201, oa = 16202, la = 16203, ca = 16204, fa = 16205, or = 16206, ua = 16207, ha = 16208, At = 16209, so = 16210, oo = 16211, S0 = 852, T0 = 592, E0 = 15, A0 = E0, da = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function $0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const De = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Jn || e.mode > oo ? 1 : 0;
}, lo = (t) => {
  if (De(t))
    return Jt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Jn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(S0), e.distcode = e.distdyn = new Int32Array(T0), e.sane = 1, e.back = -1, Ie;
}, co = (t) => {
  if (De(t))
    return Jt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, lo(t);
}, fo = (t, e) => {
  let n;
  if (De(t))
    return Jt;
  const r = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Jt : (r.window !== null && r.wbits !== e && (r.window = null), r.wrap = n, r.wbits = e, co(t));
}, uo = (t, e) => {
  if (!t)
    return Jt;
  const n = new $0();
  t.state = n, n.strm = t, n.window = null, n.mode = Jn;
  const r = fo(t, e);
  return r !== Ie && (t.state = null), r;
}, I0 = (t) => uo(t, A0);
let pa = !0, lr, cr;
const N0 = (t) => {
  if (pa) {
    lr = new Int32Array(512), cr = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (je(no, t.lens, 0, 288, lr, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    je(ro, t.lens, 0, 32, cr, 0, t.work, { bits: 5 }), pa = !1;
  }
  t.lencode = lr, t.lenbits = 9, t.distcode = cr, t.distbits = 5;
}, ho = (t, e, n, r) => {
  let a;
  const i = t.state;
  return i.window === null && (i.wsize = 1 << i.wbits, i.wnext = 0, i.whave = 0, i.window = new Uint8Array(i.wsize)), r >= i.wsize ? (i.window.set(e.subarray(n - i.wsize, n), 0), i.wnext = 0, i.whave = i.wsize) : (a = i.wsize - i.wnext, a > r && (a = r), i.window.set(e.subarray(n - r, n - r + a), i.wnext), r -= a, r ? (i.window.set(e.subarray(n - r, n), 0), i.wnext = r, i.whave = i.wsize) : (i.wnext += a, i.wnext === i.wsize && (i.wnext = 0), i.whave < i.wsize && (i.whave += a))), 0;
}, D0 = (t, e) => {
  let n, r, a, i, s, o, l, c, u, h, p, m, T, O, R = 0, v, w, x, y, $, I, A, B;
  const P = new Uint8Array(4);
  let z, k;
  const q = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (De(t) || !t.output || !t.input && t.avail_in !== 0)
    return Jt;
  n = t.state, n.mode === fe && (n.mode = ar), s = t.next_out, a = t.output, l = t.avail_out, i = t.next_in, r = t.input, o = t.avail_in, c = n.hold, u = n.bits, h = o, p = l, B = Ie;
  t:
    for (; ; )
      switch (n.mode) {
        case Jn:
          if (n.wrap === 0) {
            n.mode = ar;
            break;
          }
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if (n.wrap & 2 && c === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, P[0] = c & 255, P[1] = c >>> 8 & 255, n.check = ie(n.check, P, 2, 0), c = 0, u = 0, n.mode = Zi;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((c & 255) << 8) + (c >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = At;
            break;
          }
          if ((c & 15) !== Gi) {
            t.msg = "unknown compression method", n.mode = At;
            break;
          }
          if (c >>>= 4, u -= 4, A = (c & 15) + 8, n.wbits === 0 && (n.wbits = A), A > 15 || A > n.wbits) {
            t.msg = "invalid window size", n.mode = At;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = c & 512 ? ta : fe, c = 0, u = 0;
          break;
        case Zi:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if (n.flags = c, (n.flags & 255) !== Gi) {
            t.msg = "unknown compression method", n.mode = At;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = At;
            break;
          }
          n.head && (n.head.text = c >> 8 & 1), n.flags & 512 && n.wrap & 4 && (P[0] = c & 255, P[1] = c >>> 8 & 255, n.check = ie(n.check, P, 2, 0)), c = 0, u = 0, n.mode = Wi;
        /* falls through */
        case Wi:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          n.head && (n.head.time = c), n.flags & 512 && n.wrap & 4 && (P[0] = c & 255, P[1] = c >>> 8 & 255, P[2] = c >>> 16 & 255, P[3] = c >>> 24 & 255, n.check = ie(n.check, P, 4, 0)), c = 0, u = 0, n.mode = Xi;
        /* falls through */
        case Xi:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          n.head && (n.head.xflags = c & 255, n.head.os = c >> 8), n.flags & 512 && n.wrap & 4 && (P[0] = c & 255, P[1] = c >>> 8 & 255, n.check = ie(n.check, P, 2, 0)), c = 0, u = 0, n.mode = Ki;
        /* falls through */
        case Ki:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            n.length = c, n.head && (n.head.extra_len = c), n.flags & 512 && n.wrap & 4 && (P[0] = c & 255, P[1] = c >>> 8 & 255, n.check = ie(n.check, P, 2, 0)), c = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Yi;
        /* falls through */
        case Yi:
          if (n.flags & 1024 && (m = n.length, m > o && (m = o), m && (n.head && (A = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            r.subarray(
              i,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              i + m
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            A
          )), n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, r, m, i)), o -= m, i += m, n.length -= m), n.length))
            break t;
          n.length = 0, n.mode = Ji;
        /* falls through */
        case Ji:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            m = 0;
            do
              A = r[i + m++], n.head && A && n.length < 65536 && (n.head.name += String.fromCharCode(A));
            while (A && m < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, r, m, i)), o -= m, i += m, A)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Qi;
        /* falls through */
        case Qi:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            m = 0;
            do
              A = r[i + m++], n.head && A && n.length < 65536 && (n.head.comment += String.fromCharCode(A));
            while (A && m < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, r, m, i)), o -= m, i += m, A)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = ji;
        /* falls through */
        case ji:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = At;
              break;
            }
            c = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = fe;
          break;
        case ta:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          t.adler = n.check = da(c), c = 0, u = 0, n.mode = Hn;
        /* falls through */
        case Hn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = l, t.next_in = i, t.avail_in = o, n.hold = c, n.bits = u, x0;
          t.adler = n.check = 1, n.mode = fe;
        /* falls through */
        case fe:
          if (e === y0 || e === gn)
            break t;
        /* falls through */
        case ar:
          if (n.last) {
            c >>>= u & 7, u -= u & 7, n.mode = or;
            break;
          }
          for (; u < 3; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          switch (n.last = c & 1, c >>>= 1, u -= 1, c & 3) {
            case 0:
              n.mode = ea;
              break;
            case 1:
              if (N0(n), n.mode = vn, e === gn) {
                c >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ra;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = At;
          }
          c >>>= 2, u -= 2;
          break;
        case ea:
          for (c >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if ((c & 65535) !== (c >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = At;
            break;
          }
          if (n.length = c & 65535, c = 0, u = 0, n.mode = sr, e === gn)
            break t;
        /* falls through */
        case sr:
          n.mode = na;
        /* falls through */
        case na:
          if (m = n.length, m) {
            if (m > o && (m = o), m > l && (m = l), m === 0)
              break t;
            a.set(r.subarray(i, i + m), s), o -= m, i += m, l -= m, s += m, n.length -= m;
            break;
          }
          n.mode = fe;
          break;
        case ra:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if (n.nlen = (c & 31) + 257, c >>>= 5, u -= 5, n.ndist = (c & 31) + 1, c >>>= 5, u -= 5, n.ncode = (c & 15) + 4, c >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = At;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            n.lens[q[n.have++]] = c & 7, c >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[q[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, z = { bits: n.lenbits }, B = je(w0, n.lens, 0, 19, n.lencode, 0, n.work, z), n.lenbits = z.bits, B) {
            t.msg = "invalid code lengths set", n.mode = At;
            break;
          }
          n.have = 0, n.mode = aa;
        /* falls through */
        case aa:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; R = n.lencode[c & (1 << n.lenbits) - 1], v = R >>> 24, w = R >>> 16 & 255, x = R & 65535, !(v <= u); ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            if (x < 16)
              c >>>= v, u -= v, n.lens[n.have++] = x;
            else {
              if (x === 16) {
                for (k = v + 2; u < k; ) {
                  if (o === 0)
                    break t;
                  o--, c += r[i++] << u, u += 8;
                }
                if (c >>>= v, u -= v, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = At;
                  break;
                }
                A = n.lens[n.have - 1], m = 3 + (c & 3), c >>>= 2, u -= 2;
              } else if (x === 17) {
                for (k = v + 3; u < k; ) {
                  if (o === 0)
                    break t;
                  o--, c += r[i++] << u, u += 8;
                }
                c >>>= v, u -= v, A = 0, m = 3 + (c & 7), c >>>= 3, u -= 3;
              } else {
                for (k = v + 7; u < k; ) {
                  if (o === 0)
                    break t;
                  o--, c += r[i++] << u, u += 8;
                }
                c >>>= v, u -= v, A = 0, m = 11 + (c & 127), c >>>= 7, u -= 7;
              }
              if (n.have + m > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = At;
                break;
              }
              for (; m--; )
                n.lens[n.have++] = A;
            }
          }
          if (n.mode === At)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = At;
            break;
          }
          if (n.lenbits = 9, z = { bits: n.lenbits }, B = je(no, n.lens, 0, n.nlen, n.lencode, 0, n.work, z), n.lenbits = z.bits, B) {
            t.msg = "invalid literal/lengths set", n.mode = At;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, z = { bits: n.distbits }, B = je(ro, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, z), n.distbits = z.bits, B) {
            t.msg = "invalid distances set", n.mode = At;
            break;
          }
          if (n.mode = vn, e === gn)
            break t;
        /* falls through */
        case vn:
          n.mode = wn;
        /* falls through */
        case wn:
          if (o >= 6 && l >= 258) {
            t.next_out = s, t.avail_out = l, t.next_in = i, t.avail_in = o, n.hold = c, n.bits = u, d0(t, p), s = t.next_out, a = t.output, l = t.avail_out, i = t.next_in, r = t.input, o = t.avail_in, c = n.hold, u = n.bits, n.mode === fe && (n.back = -1);
            break;
          }
          for (n.back = 0; R = n.lencode[c & (1 << n.lenbits) - 1], v = R >>> 24, w = R >>> 16 & 255, x = R & 65535, !(v <= u); ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if (w && (w & 240) === 0) {
            for (y = v, $ = w, I = x; R = n.lencode[I + ((c & (1 << y + $) - 1) >> y)], v = R >>> 24, w = R >>> 16 & 255, x = R & 65535, !(y + v <= u); ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            c >>>= y, u -= y, n.back += y;
          }
          if (c >>>= v, u -= v, n.back += v, n.length = x, w === 0) {
            n.mode = fa;
            break;
          }
          if (w & 32) {
            n.back = -1, n.mode = fe;
            break;
          }
          if (w & 64) {
            t.msg = "invalid literal/length code", n.mode = At;
            break;
          }
          n.extra = w & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (k = n.extra; u < k; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            n.length += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = oa;
        /* falls through */
        case oa:
          for (; R = n.distcode[c & (1 << n.distbits) - 1], v = R >>> 24, w = R >>> 16 & 255, x = R & 65535, !(v <= u); ) {
            if (o === 0)
              break t;
            o--, c += r[i++] << u, u += 8;
          }
          if ((w & 240) === 0) {
            for (y = v, $ = w, I = x; R = n.distcode[I + ((c & (1 << y + $) - 1) >> y)], v = R >>> 24, w = R >>> 16 & 255, x = R & 65535, !(y + v <= u); ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            c >>>= y, u -= y, n.back += y;
          }
          if (c >>>= v, u -= v, n.back += v, w & 64) {
            t.msg = "invalid distance code", n.mode = At;
            break;
          }
          n.offset = x, n.extra = w & 15, n.mode = la;
        /* falls through */
        case la:
          if (n.extra) {
            for (k = n.extra; u < k; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            n.offset += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = At;
            break;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (l === 0)
            break t;
          if (m = p - l, n.offset > m) {
            if (m = n.offset - m, m > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = At;
              break;
            }
            m > n.wnext ? (m -= n.wnext, T = n.wsize - m) : T = n.wnext - m, m > n.length && (m = n.length), O = n.window;
          } else
            O = a, T = s - n.offset, m = n.length;
          m > l && (m = l), l -= m, n.length -= m;
          do
            a[s++] = O[T++];
          while (--m);
          n.length === 0 && (n.mode = wn);
          break;
        case fa:
          if (l === 0)
            break t;
          a[s++] = n.length, l--, n.mode = wn;
          break;
        case or:
          if (n.wrap) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c |= r[i++] << u, u += 8;
            }
            if (p -= l, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ie(n.check, a, p, s - p) : Br(n.check, a, p, s - p)), p = l, n.wrap & 4 && (n.flags ? c : da(c)) !== n.check) {
              t.msg = "incorrect data check", n.mode = At;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = ua;
        /* falls through */
        case ua:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c += r[i++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = At;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = ha;
        /* falls through */
        case ha:
          B = b0;
          break t;
        case At:
          B = io;
          break t;
        case so:
          return ao;
        case oo:
        /* falls through */
        default:
          return Jt;
      }
  return t.next_out = s, t.avail_out = l, t.next_in = i, t.avail_in = o, n.hold = c, n.bits = u, (n.wsize || p !== t.avail_out && n.mode < At && (n.mode < or || e !== Ui)) && ho(t, t.output, t.next_out, p - t.avail_out), h -= t.avail_in, p -= t.avail_out, t.total_in += h, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ie(n.check, a, p, t.next_out - p) : Br(n.check, a, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === fe ? 128 : 0) + (n.mode === vn || n.mode === sr ? 256 : 0), (h === 0 && p === 0 || e === Ui) && B === Ie && (B = k0), B;
}, R0 = (t) => {
  if (De(t))
    return Jt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ie;
}, M0 = (t, e) => {
  if (De(t))
    return Jt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Jt : (n.head = e, e.done = !1, Ie);
}, C0 = (t, e) => {
  const n = e.length;
  let r, a, i;
  return De(t) || (r = t.state, r.wrap !== 0 && r.mode !== Hn) ? Jt : r.mode === Hn && (a = 1, a = Br(a, e, n, 0), a !== r.check) ? io : (i = ho(t, e, n, n), i ? (r.mode = so, ao) : (r.havedict = 1, Ie));
};
var L0 = co, F0 = fo, O0 = lo, z0 = I0, B0 = uo, P0 = D0, H0 = R0, V0 = M0, q0 = C0, U0 = "pako inflate (from Nodeca project)", he = {
  inflateReset: L0,
  inflateReset2: F0,
  inflateResetKeep: O0,
  inflateInit: z0,
  inflateInit2: B0,
  inflate: P0,
  inflateEnd: H0,
  inflateGetHeader: V0,
  inflateSetDictionary: q0,
  inflateInfo: U0
};
function G0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Z0 = G0;
const po = Object.prototype.toString, {
  Z_NO_FLUSH: W0,
  Z_FINISH: X0,
  Z_OK: an,
  Z_STREAM_END: fr,
  Z_NEED_DICT: ur,
  Z_STREAM_ERROR: K0,
  Z_DATA_ERROR: _a,
  Z_MEM_ERROR: Y0
} = js;
function Qn(t) {
  this.options = to.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new u0(), this.strm.avail_out = 0;
  let n = he.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== an)
    throw new Error(Pr[n]);
  if (this.header = new Z0(), he.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Hr.string2buf(e.dictionary) : po.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = he.inflateSetDictionary(this.strm, e.dictionary), n !== an)))
    throw new Error(Pr[n]);
}
Qn.prototype.push = function(t, e) {
  const n = this.strm, r = this.options.chunkSize, a = this.options.dictionary;
  let i, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? X0 : W0, po.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), i = he.inflate(n, s), i === ur && a && (i = he.inflateSetDictionary(n, a), i === an ? i = he.inflate(n, s) : i === _a && (i = ur)); n.avail_in > 0 && i === fr && n.state.wrap > 0 && t[n.next_in] !== 0; )
      he.inflateReset(n), i = he.inflate(n, s);
    switch (i) {
      case K0:
      case _a:
      case ur:
      case Y0:
        return this.onEnd(i), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || i === fr))
      if (this.options.to === "string") {
        let l = Hr.utf8border(n.output, n.next_out), c = n.next_out - l, u = Hr.buf2string(n.output, l);
        n.next_out = c, n.avail_out = r - c, c && n.output.set(n.output.subarray(l, l + c), 0), this.onData(u);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(i === an && o === 0)) {
      if (i === fr)
        return i = he.inflateEnd(this.strm), this.onEnd(i), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
Qn.prototype.onData = function(t) {
  this.chunks.push(t);
};
Qn.prototype.onEnd = function(t) {
  t === an && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = to.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function J0(t, e) {
  const n = new Qn(e);
  if (n.push(t), n.err) throw n.msg || Pr[n.err];
  return n.result;
}
var Q0 = J0, j0 = {
  inflate: Q0
};
const { inflate: tp } = j0;
var ep = tp;
const np = { refName: "seq_id" }, rp = { seq_id: "refName" };
class Vn {
  constructor(e, n, r) {
    this.ncFeature = e, this.uniqueId = r || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (np[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return rp[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((r) => new Vn(r, this)) : n;
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
      const r = this.jb1TagToJb2Tag(n), a = this.ncFeature.get(n);
      r === "subfeatures" ? e.children = (a || []).map(
        (i) => new Vn(i, this).toJSON()
      ) : e[r] = a;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function ip(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function ap(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return ip(new Uint8Array(n)) ? ep(n) : n;
}
async function Wp({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const r = new Hd({
    urlTemplate: t,
    baseUrl: e,
    readFile: ap
  }), a = [];
  for await (const i of r.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    a.push(new Vn(i).toJSON());
  return a;
}
async function Xp({
  region: t,
  baseUrl: e,
  genome: n,
  track: r,
  extra: a = ".json?ignoreCache=true&flatten=false"
}) {
  const i = `${t.chromosome}:${t.start}..${t.end}`, s = `${e}/${encodeURI(n)}/${encodeURI(r)}/${encodeURIComponent(i)}${a}`, o = await fetch(s);
  if (!o.ok)
    throw new Error(`HTTP ${o.status} fetching ${s}`);
  return o.json();
}
const yn = {};
function ma(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class ae {
  constructor(e, n = {}) {
    this.baseOverrides = {}, this.url = e;
    const r = n.fetch || globalThis.fetch.bind(globalThis);
    n.overrides && (this.baseOverrides = n.overrides), this.fetchImplementation = r;
  }
  async fetch(e, n) {
    let r;
    try {
      r = await this.fetchImplementation(e, n);
    } catch (a) {
      if (`${a}`.includes("Failed to fetch")) {
        console.warn(`generic-filehandle: refetching ${e} to attempt to work around chrome CORS header caching bug`);
        try {
          r = await this.fetchImplementation(e, {
            ...n,
            cache: "reload"
          });
        } catch (i) {
          throw new Error(`${ma(i)} fetching ${e}`, { cause: i });
        }
      } else
        throw new Error(`${ma(a)} fetching ${e}`, { cause: a });
    }
    return r;
  }
  async read(e, n, r = {}) {
    const { headers: a = {}, signal: i, overrides: s = {} } = r;
    e < 1 / 0 ? a.range = `bytes=${n}-${n + e}` : e === 1 / 0 && n !== 0 && (a.range = `bytes=${n}-`);
    const o = await this.fetch(this.url, {
      ...this.baseOverrides,
      ...s,
      headers: {
        ...a,
        ...s.headers,
        ...this.baseOverrides.headers
      },
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: i
    });
    if (!o.ok)
      throw new Error(`HTTP ${o.status} fetching ${this.url}`);
    if (o.status === 200 && n === 0 || o.status === 206) {
      const l = await o.arrayBuffer(), c = o.headers.get("content-range"), u = /\/(\d+)$/.exec(c || "");
      return u?.[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(l.slice(0, e));
    }
    throw o.status === 200 ? new Error(`${this.url} fetch returned status 200, expected 206`) : new Error(`HTTP ${o.status} fetching ${this.url}`);
  }
  async readFile(e = {}) {
    let n, r;
    typeof e == "string" ? (n = e, r = {}) : (n = e.encoding, r = e, delete r.encoding);
    const { headers: a = {}, signal: i, overrides: s = {} } = r, o = await this.fetch(this.url, {
      headers: a,
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: i,
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
var hr = {}, ga;
function me() {
  return ga || (ga = 1, function(t) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function n(i, s) {
      return Object.prototype.hasOwnProperty.call(i, s);
    }
    t.assign = function(i) {
      for (var s = Array.prototype.slice.call(arguments, 1); s.length; ) {
        var o = s.shift();
        if (o) {
          if (typeof o != "object")
            throw new TypeError(o + "must be non-object");
          for (var l in o)
            n(o, l) && (i[l] = o[l]);
        }
      }
      return i;
    }, t.shrinkBuf = function(i, s) {
      return i.length === s ? i : i.subarray ? i.subarray(0, s) : (i.length = s, i);
    };
    var r = {
      arraySet: function(i, s, o, l, c) {
        if (s.subarray && i.subarray) {
          i.set(s.subarray(o, o + l), c);
          return;
        }
        for (var u = 0; u < l; u++)
          i[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(i) {
        var s, o, l, c, u, h;
        for (l = 0, s = 0, o = i.length; s < o; s++)
          l += i[s].length;
        for (h = new Uint8Array(l), c = 0, s = 0, o = i.length; s < o; s++)
          u = i[s], h.set(u, c), c += u.length;
        return h;
      }
    }, a = {
      arraySet: function(i, s, o, l, c) {
        for (var u = 0; u < l; u++)
          i[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(i) {
        return [].concat.apply([], i);
      }
    };
    t.setTyped = function(i) {
      i ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, r)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, a));
    }, t.setTyped(e);
  }(hr)), hr;
}
var Ce = {}, Qt = {}, we = {}, va;
function sp() {
  if (va) return we;
  va = 1;
  var t = me(), e = 4, n = 0, r = 1, a = 2;
  function i(g) {
    for (var M = g.length; --M >= 0; )
      g[M] = 0;
  }
  var s = 0, o = 1, l = 2, c = 3, u = 258, h = 29, p = 256, m = p + 1 + h, T = 30, O = 19, R = 2 * m + 1, v = 15, w = 16, x = 7, y = 256, $ = 16, I = 17, A = 18, B = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), P = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), z = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), k = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], q = 512, V = new Array((m + 2) * 2);
  i(V);
  var J = new Array(T * 2);
  i(J);
  var et = new Array(q);
  i(et);
  var at = new Array(u - c + 1);
  i(at);
  var F = new Array(h);
  i(F);
  var tt = new Array(T);
  i(tt);
  function rt(g, M, N, Z, S) {
    this.static_tree = g, this.extra_bits = M, this.extra_base = N, this.elems = Z, this.max_length = S, this.has_stree = g && g.length;
  }
  var nt, Q, _t;
  function ot(g, M) {
    this.dyn_tree = g, this.max_code = 0, this.stat_desc = M;
  }
  function bt(g) {
    return g < 256 ? et[g] : et[256 + (g >>> 7)];
  }
  function yt(g, M) {
    g.pending_buf[g.pending++] = M & 255, g.pending_buf[g.pending++] = M >>> 8 & 255;
  }
  function it(g, M, N) {
    g.bi_valid > w - N ? (g.bi_buf |= M << g.bi_valid & 65535, yt(g, g.bi_buf), g.bi_buf = M >> w - g.bi_valid, g.bi_valid += N - w) : (g.bi_buf |= M << g.bi_valid & 65535, g.bi_valid += N);
  }
  function dt(g, M, N) {
    it(
      g,
      N[M * 2],
      N[M * 2 + 1]
      /*.Len*/
    );
  }
  function st(g, M) {
    var N = 0;
    do
      N |= g & 1, g >>>= 1, N <<= 1;
    while (--M > 0);
    return N >>> 1;
  }
  function kt(g) {
    g.bi_valid === 16 ? (yt(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : g.bi_valid >= 8 && (g.pending_buf[g.pending++] = g.bi_buf & 255, g.bi_buf >>= 8, g.bi_valid -= 8);
  }
  function Dt(g, M) {
    var N = M.dyn_tree, Z = M.max_code, S = M.stat_desc.static_tree, C = M.stat_desc.has_stree, d = M.stat_desc.extra_bits, H = M.stat_desc.extra_base, j = M.stat_desc.max_length, f, D, L, _, b, E, X = 0;
    for (_ = 0; _ <= v; _++)
      g.bl_count[_] = 0;
    for (N[g.heap[g.heap_max] * 2 + 1] = 0, f = g.heap_max + 1; f < R; f++)
      D = g.heap[f], _ = N[N[D * 2 + 1] * 2 + 1] + 1, _ > j && (_ = j, X++), N[D * 2 + 1] = _, !(D > Z) && (g.bl_count[_]++, b = 0, D >= H && (b = d[D - H]), E = N[D * 2], g.opt_len += E * (_ + b), C && (g.static_len += E * (S[D * 2 + 1] + b)));
    if (X !== 0) {
      do {
        for (_ = j - 1; g.bl_count[_] === 0; )
          _--;
        g.bl_count[_]--, g.bl_count[_ + 1] += 2, g.bl_count[j]--, X -= 2;
      } while (X > 0);
      for (_ = j; _ !== 0; _--)
        for (D = g.bl_count[_]; D !== 0; )
          L = g.heap[--f], !(L > Z) && (N[L * 2 + 1] !== _ && (g.opt_len += (_ - N[L * 2 + 1]) * N[L * 2], N[L * 2 + 1] = _), D--);
    }
  }
  function Tt(g, M, N) {
    var Z = new Array(v + 1), S = 0, C, d;
    for (C = 1; C <= v; C++)
      Z[C] = S = S + N[C - 1] << 1;
    for (d = 0; d <= M; d++) {
      var H = g[d * 2 + 1];
      H !== 0 && (g[d * 2] = st(Z[H]++, H));
    }
  }
  function lt() {
    var g, M, N, Z, S, C = new Array(v + 1);
    for (N = 0, Z = 0; Z < h - 1; Z++)
      for (F[Z] = N, g = 0; g < 1 << B[Z]; g++)
        at[N++] = Z;
    for (at[N - 1] = Z, S = 0, Z = 0; Z < 16; Z++)
      for (tt[Z] = S, g = 0; g < 1 << P[Z]; g++)
        et[S++] = Z;
    for (S >>= 7; Z < T; Z++)
      for (tt[Z] = S << 7, g = 0; g < 1 << P[Z] - 7; g++)
        et[256 + S++] = Z;
    for (M = 0; M <= v; M++)
      C[M] = 0;
    for (g = 0; g <= 143; )
      V[g * 2 + 1] = 8, g++, C[8]++;
    for (; g <= 255; )
      V[g * 2 + 1] = 9, g++, C[9]++;
    for (; g <= 279; )
      V[g * 2 + 1] = 7, g++, C[7]++;
    for (; g <= 287; )
      V[g * 2 + 1] = 8, g++, C[8]++;
    for (Tt(V, m + 1, C), g = 0; g < T; g++)
      J[g * 2 + 1] = 5, J[g * 2] = st(g, 5);
    nt = new rt(V, B, p + 1, m, v), Q = new rt(J, P, 0, T, v), _t = new rt(new Array(0), z, 0, O, x);
  }
  function Y(g) {
    var M;
    for (M = 0; M < m; M++)
      g.dyn_ltree[M * 2] = 0;
    for (M = 0; M < T; M++)
      g.dyn_dtree[M * 2] = 0;
    for (M = 0; M < O; M++)
      g.bl_tree[M * 2] = 0;
    g.dyn_ltree[y * 2] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0;
  }
  function vt(g) {
    g.bi_valid > 8 ? yt(g, g.bi_buf) : g.bi_valid > 0 && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0;
  }
  function pt(g, M, N, Z) {
    vt(g), yt(g, N), yt(g, ~N), t.arraySet(g.pending_buf, g.window, M, N, g.pending), g.pending += N;
  }
  function gt(g, M, N, Z) {
    var S = M * 2, C = N * 2;
    return g[S] < g[C] || g[S] === g[C] && Z[M] <= Z[N];
  }
  function xt(g, M, N) {
    for (var Z = g.heap[N], S = N << 1; S <= g.heap_len && (S < g.heap_len && gt(M, g.heap[S + 1], g.heap[S], g.depth) && S++, !gt(M, Z, g.heap[S], g.depth)); )
      g.heap[N] = g.heap[S], N = S, S <<= 1;
    g.heap[N] = Z;
  }
  function U(g, M, N) {
    var Z, S, C = 0, d, H;
    if (g.last_lit !== 0)
      do
        Z = g.pending_buf[g.d_buf + C * 2] << 8 | g.pending_buf[g.d_buf + C * 2 + 1], S = g.pending_buf[g.l_buf + C], C++, Z === 0 ? dt(g, S, M) : (d = at[S], dt(g, d + p + 1, M), H = B[d], H !== 0 && (S -= F[d], it(g, S, H)), Z--, d = bt(Z), dt(g, d, N), H = P[d], H !== 0 && (Z -= tt[d], it(g, Z, H)));
      while (C < g.last_lit);
    dt(g, y, M);
  }
  function Mt(g, M) {
    var N = M.dyn_tree, Z = M.stat_desc.static_tree, S = M.stat_desc.has_stree, C = M.stat_desc.elems, d, H, j = -1, f;
    for (g.heap_len = 0, g.heap_max = R, d = 0; d < C; d++)
      N[d * 2] !== 0 ? (g.heap[++g.heap_len] = j = d, g.depth[d] = 0) : N[d * 2 + 1] = 0;
    for (; g.heap_len < 2; )
      f = g.heap[++g.heap_len] = j < 2 ? ++j : 0, N[f * 2] = 1, g.depth[f] = 0, g.opt_len--, S && (g.static_len -= Z[f * 2 + 1]);
    for (M.max_code = j, d = g.heap_len >> 1; d >= 1; d--)
      xt(g, N, d);
    f = C;
    do
      d = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[
        1
        /*SMALLEST*/
      ] = g.heap[g.heap_len--], xt(
        g,
        N,
        1
        /*SMALLEST*/
      ), H = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[--g.heap_max] = d, g.heap[--g.heap_max] = H, N[f * 2] = N[d * 2] + N[H * 2], g.depth[f] = (g.depth[d] >= g.depth[H] ? g.depth[d] : g.depth[H]) + 1, N[d * 2 + 1] = N[H * 2 + 1] = f, g.heap[
        1
        /*SMALLEST*/
      ] = f++, xt(
        g,
        N,
        1
        /*SMALLEST*/
      );
    while (g.heap_len >= 2);
    g.heap[--g.heap_max] = g.heap[
      1
      /*SMALLEST*/
    ], Dt(g, M), Tt(N, j, g.bl_count);
  }
  function zt(g, M, N) {
    var Z, S = -1, C, d = M[0 * 2 + 1], H = 0, j = 7, f = 4;
    for (d === 0 && (j = 138, f = 3), M[(N + 1) * 2 + 1] = 65535, Z = 0; Z <= N; Z++)
      C = d, d = M[(Z + 1) * 2 + 1], !(++H < j && C === d) && (H < f ? g.bl_tree[C * 2] += H : C !== 0 ? (C !== S && g.bl_tree[C * 2]++, g.bl_tree[$ * 2]++) : H <= 10 ? g.bl_tree[I * 2]++ : g.bl_tree[A * 2]++, H = 0, S = C, d === 0 ? (j = 138, f = 3) : C === d ? (j = 6, f = 3) : (j = 7, f = 4));
  }
  function $t(g, M, N) {
    var Z, S = -1, C, d = M[0 * 2 + 1], H = 0, j = 7, f = 4;
    for (d === 0 && (j = 138, f = 3), Z = 0; Z <= N; Z++)
      if (C = d, d = M[(Z + 1) * 2 + 1], !(++H < j && C === d)) {
        if (H < f)
          do
            dt(g, C, g.bl_tree);
          while (--H !== 0);
        else C !== 0 ? (C !== S && (dt(g, C, g.bl_tree), H--), dt(g, $, g.bl_tree), it(g, H - 3, 2)) : H <= 10 ? (dt(g, I, g.bl_tree), it(g, H - 3, 3)) : (dt(g, A, g.bl_tree), it(g, H - 11, 7));
        H = 0, S = C, d === 0 ? (j = 138, f = 3) : C === d ? (j = 6, f = 3) : (j = 7, f = 4);
      }
  }
  function It(g) {
    var M;
    for (zt(g, g.dyn_ltree, g.l_desc.max_code), zt(g, g.dyn_dtree, g.d_desc.max_code), Mt(g, g.bl_desc), M = O - 1; M >= 3 && g.bl_tree[k[M] * 2 + 1] === 0; M--)
      ;
    return g.opt_len += 3 * (M + 1) + 5 + 5 + 4, M;
  }
  function Ut(g, M, N, Z) {
    var S;
    for (it(g, M - 257, 5), it(g, N - 1, 5), it(g, Z - 4, 4), S = 0; S < Z; S++)
      it(g, g.bl_tree[k[S] * 2 + 1], 3);
    $t(g, g.dyn_ltree, M - 1), $t(g, g.dyn_dtree, N - 1);
  }
  function Et(g) {
    var M = 4093624447, N;
    for (N = 0; N <= 31; N++, M >>>= 1)
      if (M & 1 && g.dyn_ltree[N * 2] !== 0)
        return n;
    if (g.dyn_ltree[9 * 2] !== 0 || g.dyn_ltree[10 * 2] !== 0 || g.dyn_ltree[13 * 2] !== 0)
      return r;
    for (N = 32; N < p; N++)
      if (g.dyn_ltree[N * 2] !== 0)
        return r;
    return n;
  }
  var St = !1;
  function Zt(g) {
    St || (lt(), St = !0), g.l_desc = new ot(g.dyn_ltree, nt), g.d_desc = new ot(g.dyn_dtree, Q), g.bl_desc = new ot(g.bl_tree, _t), g.bi_buf = 0, g.bi_valid = 0, Y(g);
  }
  function ft(g, M, N, Z) {
    it(g, (s << 1) + (Z ? 1 : 0), 3), pt(g, M, N);
  }
  function K(g) {
    it(g, o << 1, 3), dt(g, y, V), kt(g);
  }
  function ct(g, M, N, Z) {
    var S, C, d = 0;
    g.level > 0 ? (g.strm.data_type === a && (g.strm.data_type = Et(g)), Mt(g, g.l_desc), Mt(g, g.d_desc), d = It(g), S = g.opt_len + 3 + 7 >>> 3, C = g.static_len + 3 + 7 >>> 3, C <= S && (S = C)) : S = C = N + 5, N + 4 <= S && M !== -1 ? ft(g, M, N, Z) : g.strategy === e || C === S ? (it(g, (o << 1) + (Z ? 1 : 0), 3), U(g, V, J)) : (it(g, (l << 1) + (Z ? 1 : 0), 3), Ut(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, d + 1), U(g, g.dyn_ltree, g.dyn_dtree)), Y(g), Z && vt(g);
  }
  function ut(g, M, N) {
    return g.pending_buf[g.d_buf + g.last_lit * 2] = M >>> 8 & 255, g.pending_buf[g.d_buf + g.last_lit * 2 + 1] = M & 255, g.pending_buf[g.l_buf + g.last_lit] = N & 255, g.last_lit++, M === 0 ? g.dyn_ltree[N * 2]++ : (g.matches++, M--, g.dyn_ltree[(at[N] + p + 1) * 2]++, g.dyn_dtree[bt(M) * 2]++), g.last_lit === g.lit_bufsize - 1;
  }
  return we._tr_init = Zt, we._tr_stored_block = ft, we._tr_flush_block = ct, we._tr_tally = ut, we._tr_align = K, we;
}
var dr, wa;
function _o() {
  if (wa) return dr;
  wa = 1;
  function t(e, n, r, a) {
    for (var i = e & 65535 | 0, s = e >>> 16 & 65535 | 0, o = 0; r !== 0; ) {
      o = r > 2e3 ? 2e3 : r, r -= o;
      do
        i = i + n[a++] | 0, s = s + i | 0;
      while (--o);
      i %= 65521, s %= 65521;
    }
    return i | s << 16 | 0;
  }
  return dr = t, dr;
}
var pr, ya;
function mo() {
  if (ya) return pr;
  ya = 1;
  function t() {
    for (var r, a = [], i = 0; i < 256; i++) {
      r = i;
      for (var s = 0; s < 8; s++)
        r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
      a[i] = r;
    }
    return a;
  }
  var e = t();
  function n(r, a, i, s) {
    var o = e, l = s + i;
    r ^= -1;
    for (var c = s; c < l; c++)
      r = r >>> 8 ^ o[(r ^ a[c]) & 255];
    return r ^ -1;
  }
  return pr = n, pr;
}
var _r, ba;
function si() {
  return ba || (ba = 1, _r = {
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
  }), _r;
}
var xa;
function op() {
  if (xa) return Qt;
  xa = 1;
  var t = me(), e = sp(), n = _o(), r = mo(), a = si(), i = 0, s = 1, o = 3, l = 4, c = 5, u = 0, h = 1, p = -2, m = -3, T = -5, O = -1, R = 1, v = 2, w = 3, x = 4, y = 0, $ = 2, I = 8, A = 9, B = 15, P = 8, z = 29, k = 256, q = k + 1 + z, V = 30, J = 19, et = 2 * q + 1, at = 15, F = 3, tt = 258, rt = tt + F + 1, nt = 32, Q = 42, _t = 69, ot = 73, bt = 91, yt = 103, it = 113, dt = 666, st = 1, kt = 2, Dt = 3, Tt = 4, lt = 3;
  function Y(f, D) {
    return f.msg = a[D], D;
  }
  function vt(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function pt(f) {
    for (var D = f.length; --D >= 0; )
      f[D] = 0;
  }
  function gt(f) {
    var D = f.state, L = D.pending;
    L > f.avail_out && (L = f.avail_out), L !== 0 && (t.arraySet(f.output, D.pending_buf, D.pending_out, L, f.next_out), f.next_out += L, D.pending_out += L, f.total_out += L, f.avail_out -= L, D.pending -= L, D.pending === 0 && (D.pending_out = 0));
  }
  function xt(f, D) {
    e._tr_flush_block(f, f.block_start >= 0 ? f.block_start : -1, f.strstart - f.block_start, D), f.block_start = f.strstart, gt(f.strm);
  }
  function U(f, D) {
    f.pending_buf[f.pending++] = D;
  }
  function Mt(f, D) {
    f.pending_buf[f.pending++] = D >>> 8 & 255, f.pending_buf[f.pending++] = D & 255;
  }
  function zt(f, D, L, _) {
    var b = f.avail_in;
    return b > _ && (b = _), b === 0 ? 0 : (f.avail_in -= b, t.arraySet(D, f.input, f.next_in, b, L), f.state.wrap === 1 ? f.adler = n(f.adler, D, b, L) : f.state.wrap === 2 && (f.adler = r(f.adler, D, b, L)), f.next_in += b, f.total_in += b, b);
  }
  function $t(f, D) {
    var L = f.max_chain_length, _ = f.strstart, b, E, X = f.prev_length, G = f.nice_match, W = f.strstart > f.w_size - rt ? f.strstart - (f.w_size - rt) : 0, mt = f.window, Wt = f.w_mask, Nt = f.prev, wt = f.strstart + tt, Ft = mt[_ + X - 1], Bt = mt[_ + X];
    f.prev_length >= f.good_match && (L >>= 2), G > f.lookahead && (G = f.lookahead);
    do
      if (b = D, !(mt[b + X] !== Bt || mt[b + X - 1] !== Ft || mt[b] !== mt[_] || mt[++b] !== mt[_ + 1])) {
        _ += 2, b++;
        do
          ;
        while (mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && mt[++_] === mt[++b] && _ < wt);
        if (E = tt - (wt - _), _ = wt - tt, E > X) {
          if (f.match_start = D, X = E, E >= G)
            break;
          Ft = mt[_ + X - 1], Bt = mt[_ + X];
        }
      }
    while ((D = Nt[D & Wt]) > W && --L !== 0);
    return X <= f.lookahead ? X : f.lookahead;
  }
  function It(f) {
    var D = f.w_size, L, _, b, E, X;
    do {
      if (E = f.window_size - f.lookahead - f.strstart, f.strstart >= D + (D - rt)) {
        t.arraySet(f.window, f.window, D, D, 0), f.match_start -= D, f.strstart -= D, f.block_start -= D, _ = f.hash_size, L = _;
        do
          b = f.head[--L], f.head[L] = b >= D ? b - D : 0;
        while (--_);
        _ = D, L = _;
        do
          b = f.prev[--L], f.prev[L] = b >= D ? b - D : 0;
        while (--_);
        E += D;
      }
      if (f.strm.avail_in === 0)
        break;
      if (_ = zt(f.strm, f.window, f.strstart + f.lookahead, E), f.lookahead += _, f.lookahead + f.insert >= F)
        for (X = f.strstart - f.insert, f.ins_h = f.window[X], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[X + 1]) & f.hash_mask; f.insert && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[X + F - 1]) & f.hash_mask, f.prev[X & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = X, X++, f.insert--, !(f.lookahead + f.insert < F)); )
          ;
    } while (f.lookahead < rt && f.strm.avail_in !== 0);
  }
  function Ut(f, D) {
    var L = 65535;
    for (L > f.pending_buf_size - 5 && (L = f.pending_buf_size - 5); ; ) {
      if (f.lookahead <= 1) {
        if (It(f), f.lookahead === 0 && D === i)
          return st;
        if (f.lookahead === 0)
          break;
      }
      f.strstart += f.lookahead, f.lookahead = 0;
      var _ = f.block_start + L;
      if ((f.strstart === 0 || f.strstart >= _) && (f.lookahead = f.strstart - _, f.strstart = _, xt(f, !1), f.strm.avail_out === 0) || f.strstart - f.block_start >= f.w_size - rt && (xt(f, !1), f.strm.avail_out === 0))
        return st;
    }
    return f.insert = 0, D === l ? (xt(f, !0), f.strm.avail_out === 0 ? Dt : Tt) : (f.strstart > f.block_start && (xt(f, !1), f.strm.avail_out === 0), st);
  }
  function Et(f, D) {
    for (var L, _; ; ) {
      if (f.lookahead < rt) {
        if (It(f), f.lookahead < rt && D === i)
          return st;
        if (f.lookahead === 0)
          break;
      }
      if (L = 0, f.lookahead >= F && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + F - 1]) & f.hash_mask, L = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), L !== 0 && f.strstart - L <= f.w_size - rt && (f.match_length = $t(f, L)), f.match_length >= F)
        if (_ = e._tr_tally(f, f.strstart - f.match_start, f.match_length - F), f.lookahead -= f.match_length, f.match_length <= f.max_lazy_match && f.lookahead >= F) {
          f.match_length--;
          do
            f.strstart++, f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + F - 1]) & f.hash_mask, L = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart;
          while (--f.match_length !== 0);
          f.strstart++;
        } else
          f.strstart += f.match_length, f.match_length = 0, f.ins_h = f.window[f.strstart], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + 1]) & f.hash_mask;
      else
        _ = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++;
      if (_ && (xt(f, !1), f.strm.avail_out === 0))
        return st;
    }
    return f.insert = f.strstart < F - 1 ? f.strstart : F - 1, D === l ? (xt(f, !0), f.strm.avail_out === 0 ? Dt : Tt) : f.last_lit && (xt(f, !1), f.strm.avail_out === 0) ? st : kt;
  }
  function St(f, D) {
    for (var L, _, b; ; ) {
      if (f.lookahead < rt) {
        if (It(f), f.lookahead < rt && D === i)
          return st;
        if (f.lookahead === 0)
          break;
      }
      if (L = 0, f.lookahead >= F && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + F - 1]) & f.hash_mask, L = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), f.prev_length = f.match_length, f.prev_match = f.match_start, f.match_length = F - 1, L !== 0 && f.prev_length < f.max_lazy_match && f.strstart - L <= f.w_size - rt && (f.match_length = $t(f, L), f.match_length <= 5 && (f.strategy === R || f.match_length === F && f.strstart - f.match_start > 4096) && (f.match_length = F - 1)), f.prev_length >= F && f.match_length <= f.prev_length) {
        b = f.strstart + f.lookahead - F, _ = e._tr_tally(f, f.strstart - 1 - f.prev_match, f.prev_length - F), f.lookahead -= f.prev_length - 1, f.prev_length -= 2;
        do
          ++f.strstart <= b && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + F - 1]) & f.hash_mask, L = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart);
        while (--f.prev_length !== 0);
        if (f.match_available = 0, f.match_length = F - 1, f.strstart++, _ && (xt(f, !1), f.strm.avail_out === 0))
          return st;
      } else if (f.match_available) {
        if (_ = e._tr_tally(f, 0, f.window[f.strstart - 1]), _ && xt(f, !1), f.strstart++, f.lookahead--, f.strm.avail_out === 0)
          return st;
      } else
        f.match_available = 1, f.strstart++, f.lookahead--;
    }
    return f.match_available && (_ = e._tr_tally(f, 0, f.window[f.strstart - 1]), f.match_available = 0), f.insert = f.strstart < F - 1 ? f.strstart : F - 1, D === l ? (xt(f, !0), f.strm.avail_out === 0 ? Dt : Tt) : f.last_lit && (xt(f, !1), f.strm.avail_out === 0) ? st : kt;
  }
  function Zt(f, D) {
    for (var L, _, b, E, X = f.window; ; ) {
      if (f.lookahead <= tt) {
        if (It(f), f.lookahead <= tt && D === i)
          return st;
        if (f.lookahead === 0)
          break;
      }
      if (f.match_length = 0, f.lookahead >= F && f.strstart > 0 && (b = f.strstart - 1, _ = X[b], _ === X[++b] && _ === X[++b] && _ === X[++b])) {
        E = f.strstart + tt;
        do
          ;
        while (_ === X[++b] && _ === X[++b] && _ === X[++b] && _ === X[++b] && _ === X[++b] && _ === X[++b] && _ === X[++b] && _ === X[++b] && b < E);
        f.match_length = tt - (E - b), f.match_length > f.lookahead && (f.match_length = f.lookahead);
      }
      if (f.match_length >= F ? (L = e._tr_tally(f, 1, f.match_length - F), f.lookahead -= f.match_length, f.strstart += f.match_length, f.match_length = 0) : (L = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++), L && (xt(f, !1), f.strm.avail_out === 0))
        return st;
    }
    return f.insert = 0, D === l ? (xt(f, !0), f.strm.avail_out === 0 ? Dt : Tt) : f.last_lit && (xt(f, !1), f.strm.avail_out === 0) ? st : kt;
  }
  function ft(f, D) {
    for (var L; ; ) {
      if (f.lookahead === 0 && (It(f), f.lookahead === 0)) {
        if (D === i)
          return st;
        break;
      }
      if (f.match_length = 0, L = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++, L && (xt(f, !1), f.strm.avail_out === 0))
        return st;
    }
    return f.insert = 0, D === l ? (xt(f, !0), f.strm.avail_out === 0 ? Dt : Tt) : f.last_lit && (xt(f, !1), f.strm.avail_out === 0) ? st : kt;
  }
  function K(f, D, L, _, b) {
    this.good_length = f, this.max_lazy = D, this.nice_length = L, this.max_chain = _, this.func = b;
  }
  var ct;
  ct = [
    /*      good lazy nice chain */
    new K(0, 0, 0, 0, Ut),
    /* 0 store only */
    new K(4, 4, 8, 4, Et),
    /* 1 max speed, no lazy matches */
    new K(4, 5, 16, 8, Et),
    /* 2 */
    new K(4, 6, 32, 32, Et),
    /* 3 */
    new K(4, 4, 16, 16, St),
    /* 4 lazy matches */
    new K(8, 16, 32, 32, St),
    /* 5 */
    new K(8, 16, 128, 128, St),
    /* 6 */
    new K(8, 32, 128, 256, St),
    /* 7 */
    new K(32, 128, 258, 1024, St),
    /* 8 */
    new K(32, 258, 258, 4096, St)
    /* 9 max compression */
  ];
  function ut(f) {
    f.window_size = 2 * f.w_size, pt(f.head), f.max_lazy_match = ct[f.level].max_lazy, f.good_match = ct[f.level].good_length, f.nice_match = ct[f.level].nice_length, f.max_chain_length = ct[f.level].max_chain, f.strstart = 0, f.block_start = 0, f.lookahead = 0, f.insert = 0, f.match_length = f.prev_length = F - 1, f.match_available = 0, f.ins_h = 0;
  }
  function g() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = I, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(et * 2), this.dyn_dtree = new t.Buf16((2 * V + 1) * 2), this.bl_tree = new t.Buf16((2 * J + 1) * 2), pt(this.dyn_ltree), pt(this.dyn_dtree), pt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(at + 1), this.heap = new t.Buf16(2 * q + 1), pt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * q + 1), pt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function M(f) {
    var D;
    return !f || !f.state ? Y(f, p) : (f.total_in = f.total_out = 0, f.data_type = $, D = f.state, D.pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? Q : it, f.adler = D.wrap === 2 ? 0 : 1, D.last_flush = i, e._tr_init(D), u);
  }
  function N(f) {
    var D = M(f);
    return D === u && ut(f.state), D;
  }
  function Z(f, D) {
    return !f || !f.state || f.state.wrap !== 2 ? p : (f.state.gzhead = D, u);
  }
  function S(f, D, L, _, b, E) {
    if (!f)
      return p;
    var X = 1;
    if (D === O && (D = 6), _ < 0 ? (X = 0, _ = -_) : _ > 15 && (X = 2, _ -= 16), b < 1 || b > A || L !== I || _ < 8 || _ > 15 || D < 0 || D > 9 || E < 0 || E > x)
      return Y(f, p);
    _ === 8 && (_ = 9);
    var G = new g();
    return f.state = G, G.strm = f, G.wrap = X, G.gzhead = null, G.w_bits = _, G.w_size = 1 << G.w_bits, G.w_mask = G.w_size - 1, G.hash_bits = b + 7, G.hash_size = 1 << G.hash_bits, G.hash_mask = G.hash_size - 1, G.hash_shift = ~~((G.hash_bits + F - 1) / F), G.window = new t.Buf8(G.w_size * 2), G.head = new t.Buf16(G.hash_size), G.prev = new t.Buf16(G.w_size), G.lit_bufsize = 1 << b + 6, G.pending_buf_size = G.lit_bufsize * 4, G.pending_buf = new t.Buf8(G.pending_buf_size), G.d_buf = 1 * G.lit_bufsize, G.l_buf = 3 * G.lit_bufsize, G.level = D, G.strategy = E, G.method = L, N(f);
  }
  function C(f, D) {
    return S(f, D, I, B, P, y);
  }
  function d(f, D) {
    var L, _, b, E;
    if (!f || !f.state || D > c || D < 0)
      return f ? Y(f, p) : p;
    if (_ = f.state, !f.output || !f.input && f.avail_in !== 0 || _.status === dt && D !== l)
      return Y(f, f.avail_out === 0 ? T : p);
    if (_.strm = f, L = _.last_flush, _.last_flush = D, _.status === Q)
      if (_.wrap === 2)
        f.adler = 0, U(_, 31), U(_, 139), U(_, 8), _.gzhead ? (U(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), U(_, _.gzhead.time & 255), U(_, _.gzhead.time >> 8 & 255), U(_, _.gzhead.time >> 16 & 255), U(_, _.gzhead.time >> 24 & 255), U(_, _.level === 9 ? 2 : _.strategy >= v || _.level < 2 ? 4 : 0), U(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (U(_, _.gzhead.extra.length & 255), U(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (f.adler = r(f.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = _t) : (U(_, 0), U(_, 0), U(_, 0), U(_, 0), U(_, 0), U(_, _.level === 9 ? 2 : _.strategy >= v || _.level < 2 ? 4 : 0), U(_, lt), _.status = it);
      else {
        var X = I + (_.w_bits - 8 << 4) << 8, G = -1;
        _.strategy >= v || _.level < 2 ? G = 0 : _.level < 6 ? G = 1 : _.level === 6 ? G = 2 : G = 3, X |= G << 6, _.strstart !== 0 && (X |= nt), X += 31 - X % 31, _.status = it, Mt(_, X), _.strstart !== 0 && (Mt(_, f.adler >>> 16), Mt(_, f.adler & 65535)), f.adler = 1;
      }
    if (_.status === _t)
      if (_.gzhead.extra) {
        for (b = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), gt(f), b = _.pending, _.pending === _.pending_buf_size)); )
          U(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = ot);
      } else
        _.status = ot;
    if (_.status === ot)
      if (_.gzhead.name) {
        b = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), gt(f), b = _.pending, _.pending === _.pending_buf_size)) {
            E = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? E = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : E = 0, U(_, E);
        } while (E !== 0);
        _.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), E === 0 && (_.gzindex = 0, _.status = bt);
      } else
        _.status = bt;
    if (_.status === bt)
      if (_.gzhead.comment) {
        b = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), gt(f), b = _.pending, _.pending === _.pending_buf_size)) {
            E = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? E = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : E = 0, U(_, E);
        } while (E !== 0);
        _.gzhead.hcrc && _.pending > b && (f.adler = r(f.adler, _.pending_buf, _.pending - b, b)), E === 0 && (_.status = yt);
      } else
        _.status = yt;
    if (_.status === yt && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && gt(f), _.pending + 2 <= _.pending_buf_size && (U(_, f.adler & 255), U(_, f.adler >> 8 & 255), f.adler = 0, _.status = it)) : _.status = it), _.pending !== 0) {
      if (gt(f), f.avail_out === 0)
        return _.last_flush = -1, u;
    } else if (f.avail_in === 0 && vt(D) <= vt(L) && D !== l)
      return Y(f, T);
    if (_.status === dt && f.avail_in !== 0)
      return Y(f, T);
    if (f.avail_in !== 0 || _.lookahead !== 0 || D !== i && _.status !== dt) {
      var W = _.strategy === v ? ft(_, D) : _.strategy === w ? Zt(_, D) : ct[_.level].func(_, D);
      if ((W === Dt || W === Tt) && (_.status = dt), W === st || W === Dt)
        return f.avail_out === 0 && (_.last_flush = -1), u;
      if (W === kt && (D === s ? e._tr_align(_) : D !== c && (e._tr_stored_block(_, 0, 0, !1), D === o && (pt(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), gt(f), f.avail_out === 0))
        return _.last_flush = -1, u;
    }
    return D !== l ? u : _.wrap <= 0 ? h : (_.wrap === 2 ? (U(_, f.adler & 255), U(_, f.adler >> 8 & 255), U(_, f.adler >> 16 & 255), U(_, f.adler >> 24 & 255), U(_, f.total_in & 255), U(_, f.total_in >> 8 & 255), U(_, f.total_in >> 16 & 255), U(_, f.total_in >> 24 & 255)) : (Mt(_, f.adler >>> 16), Mt(_, f.adler & 65535)), gt(f), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? u : h);
  }
  function H(f) {
    var D;
    return !f || !f.state ? p : (D = f.state.status, D !== Q && D !== _t && D !== ot && D !== bt && D !== yt && D !== it && D !== dt ? Y(f, p) : (f.state = null, D === it ? Y(f, m) : u));
  }
  function j(f, D) {
    var L = D.length, _, b, E, X, G, W, mt, Wt;
    if (!f || !f.state || (_ = f.state, X = _.wrap, X === 2 || X === 1 && _.status !== Q || _.lookahead))
      return p;
    for (X === 1 && (f.adler = n(f.adler, D, L, 0)), _.wrap = 0, L >= _.w_size && (X === 0 && (pt(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), Wt = new t.Buf8(_.w_size), t.arraySet(Wt, D, L - _.w_size, _.w_size, 0), D = Wt, L = _.w_size), G = f.avail_in, W = f.next_in, mt = f.input, f.avail_in = L, f.next_in = 0, f.input = D, It(_); _.lookahead >= F; ) {
      b = _.strstart, E = _.lookahead - (F - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[b + F - 1]) & _.hash_mask, _.prev[b & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = b, b++;
      while (--E);
      _.strstart = b, _.lookahead = F - 1, It(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = F - 1, _.match_available = 0, f.next_in = W, f.input = mt, f.avail_in = G, _.wrap = X, u;
  }
  return Qt.deflateInit = C, Qt.deflateInit2 = S, Qt.deflateReset = N, Qt.deflateResetKeep = M, Qt.deflateSetHeader = Z, Qt.deflate = d, Qt.deflateEnd = H, Qt.deflateSetDictionary = j, Qt.deflateInfo = "pako deflate (from Nodeca project)", Qt;
}
var ye = {}, ka;
function go() {
  if (ka) return ye;
  ka = 1;
  var t = me(), e = !0, n = !0;
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
  for (var r = new t.Buf8(256), a = 0; a < 256; a++)
    r[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
  r[254] = r[254] = 1, ye.string2buf = function(s) {
    var o, l, c, u, h, p = s.length, m = 0;
    for (u = 0; u < p; u++)
      l = s.charCodeAt(u), (l & 64512) === 55296 && u + 1 < p && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (c - 56320), u++)), m += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
    for (o = new t.Buf8(m), h = 0, u = 0; h < m; u++)
      l = s.charCodeAt(u), (l & 64512) === 55296 && u + 1 < p && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (c - 56320), u++)), l < 128 ? o[h++] = l : l < 2048 ? (o[h++] = 192 | l >>> 6, o[h++] = 128 | l & 63) : l < 65536 ? (o[h++] = 224 | l >>> 12, o[h++] = 128 | l >>> 6 & 63, o[h++] = 128 | l & 63) : (o[h++] = 240 | l >>> 18, o[h++] = 128 | l >>> 12 & 63, o[h++] = 128 | l >>> 6 & 63, o[h++] = 128 | l & 63);
    return o;
  };
  function i(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var l = "", c = 0; c < o; c++)
      l += String.fromCharCode(s[c]);
    return l;
  }
  return ye.buf2binstring = function(s) {
    return i(s, s.length);
  }, ye.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), l = 0, c = o.length; l < c; l++)
      o[l] = s.charCodeAt(l);
    return o;
  }, ye.buf2string = function(s, o) {
    var l, c, u, h, p = o || s.length, m = new Array(p * 2);
    for (c = 0, l = 0; l < p; ) {
      if (u = s[l++], u < 128) {
        m[c++] = u;
        continue;
      }
      if (h = r[u], h > 4) {
        m[c++] = 65533, l += h - 1;
        continue;
      }
      for (u &= h === 2 ? 31 : h === 3 ? 15 : 7; h > 1 && l < p; )
        u = u << 6 | s[l++] & 63, h--;
      if (h > 1) {
        m[c++] = 65533;
        continue;
      }
      u < 65536 ? m[c++] = u : (u -= 65536, m[c++] = 55296 | u >> 10 & 1023, m[c++] = 56320 | u & 1023);
    }
    return i(m, c);
  }, ye.utf8border = function(s, o) {
    var l;
    for (o = o || s.length, o > s.length && (o = s.length), l = o - 1; l >= 0 && (s[l] & 192) === 128; )
      l--;
    return l < 0 || l === 0 ? o : l + r[s[l]] > o ? l : o;
  }, ye;
}
var mr, Sa;
function vo() {
  if (Sa) return mr;
  Sa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return mr = t, mr;
}
var Ta;
function lp() {
  if (Ta) return Ce;
  Ta = 1;
  var t = op(), e = me(), n = go(), r = si(), a = vo(), i = Object.prototype.toString, s = 0, o = 4, l = 0, c = 1, u = 2, h = -1, p = 0, m = 8;
  function T(w) {
    if (!(this instanceof T)) return new T(w);
    this.options = e.assign({
      level: h,
      method: m,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, w || {});
    var x = this.options;
    x.raw && x.windowBits > 0 ? x.windowBits = -x.windowBits : x.gzip && x.windowBits > 0 && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var y = t.deflateInit2(
      this.strm,
      x.level,
      x.method,
      x.windowBits,
      x.memLevel,
      x.strategy
    );
    if (y !== l)
      throw new Error(r[y]);
    if (x.header && t.deflateSetHeader(this.strm, x.header), x.dictionary) {
      var $;
      if (typeof x.dictionary == "string" ? $ = n.string2buf(x.dictionary) : i.call(x.dictionary) === "[object ArrayBuffer]" ? $ = new Uint8Array(x.dictionary) : $ = x.dictionary, y = t.deflateSetDictionary(this.strm, $), y !== l)
        throw new Error(r[y]);
      this._dict_set = !0;
    }
  }
  T.prototype.push = function(w, x) {
    var y = this.strm, $ = this.options.chunkSize, I, A;
    if (this.ended)
      return !1;
    A = x === ~~x ? x : x === !0 ? o : s, typeof w == "string" ? y.input = n.string2buf(w) : i.call(w) === "[object ArrayBuffer]" ? y.input = new Uint8Array(w) : y.input = w, y.next_in = 0, y.avail_in = y.input.length;
    do {
      if (y.avail_out === 0 && (y.output = new e.Buf8($), y.next_out = 0, y.avail_out = $), I = t.deflate(y, A), I !== c && I !== l)
        return this.onEnd(I), this.ended = !0, !1;
      (y.avail_out === 0 || y.avail_in === 0 && (A === o || A === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(y.output, y.next_out))) : this.onData(e.shrinkBuf(y.output, y.next_out)));
    } while ((y.avail_in > 0 || y.avail_out === 0) && I !== c);
    return A === o ? (I = t.deflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === l) : (A === u && (this.onEnd(l), y.avail_out = 0), !0);
  }, T.prototype.onData = function(w) {
    this.chunks.push(w);
  }, T.prototype.onEnd = function(w) {
    w === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
  };
  function O(w, x) {
    var y = new T(x);
    if (y.push(w, !0), y.err)
      throw y.msg || r[y.err];
    return y.result;
  }
  function R(w, x) {
    return x = x || {}, x.raw = !0, O(w, x);
  }
  function v(w, x) {
    return x = x || {}, x.gzip = !0, O(w, x);
  }
  return Ce.Deflate = T, Ce.deflate = O, Ce.deflateRaw = R, Ce.gzip = v, Ce;
}
var Le = {}, Kt = {}, gr, Ea;
function cp() {
  if (Ea) return gr;
  Ea = 1;
  var t = 30, e = 12;
  return gr = function(r, a) {
    var i, s, o, l, c, u, h, p, m, T, O, R, v, w, x, y, $, I, A, B, P, z, k, q, V;
    i = r.state, s = r.next_in, q = r.input, o = s + (r.avail_in - 5), l = r.next_out, V = r.output, c = l - (a - r.avail_out), u = l + (r.avail_out - 257), h = i.dmax, p = i.wsize, m = i.whave, T = i.wnext, O = i.window, R = i.hold, v = i.bits, w = i.lencode, x = i.distcode, y = (1 << i.lenbits) - 1, $ = (1 << i.distbits) - 1;
    t:
      do {
        v < 15 && (R += q[s++] << v, v += 8, R += q[s++] << v, v += 8), I = w[R & y];
        e:
          for (; ; ) {
            if (A = I >>> 24, R >>>= A, v -= A, A = I >>> 16 & 255, A === 0)
              V[l++] = I & 65535;
            else if (A & 16) {
              B = I & 65535, A &= 15, A && (v < A && (R += q[s++] << v, v += 8), B += R & (1 << A) - 1, R >>>= A, v -= A), v < 15 && (R += q[s++] << v, v += 8, R += q[s++] << v, v += 8), I = x[R & $];
              n:
                for (; ; ) {
                  if (A = I >>> 24, R >>>= A, v -= A, A = I >>> 16 & 255, A & 16) {
                    if (P = I & 65535, A &= 15, v < A && (R += q[s++] << v, v += 8, v < A && (R += q[s++] << v, v += 8)), P += R & (1 << A) - 1, P > h) {
                      r.msg = "invalid distance too far back", i.mode = t;
                      break t;
                    }
                    if (R >>>= A, v -= A, A = l - c, P > A) {
                      if (A = P - A, A > m && i.sane) {
                        r.msg = "invalid distance too far back", i.mode = t;
                        break t;
                      }
                      if (z = 0, k = O, T === 0) {
                        if (z += p - A, A < B) {
                          B -= A;
                          do
                            V[l++] = O[z++];
                          while (--A);
                          z = l - P, k = V;
                        }
                      } else if (T < A) {
                        if (z += p + T - A, A -= T, A < B) {
                          B -= A;
                          do
                            V[l++] = O[z++];
                          while (--A);
                          if (z = 0, T < B) {
                            A = T, B -= A;
                            do
                              V[l++] = O[z++];
                            while (--A);
                            z = l - P, k = V;
                          }
                        }
                      } else if (z += T - A, A < B) {
                        B -= A;
                        do
                          V[l++] = O[z++];
                        while (--A);
                        z = l - P, k = V;
                      }
                      for (; B > 2; )
                        V[l++] = k[z++], V[l++] = k[z++], V[l++] = k[z++], B -= 3;
                      B && (V[l++] = k[z++], B > 1 && (V[l++] = k[z++]));
                    } else {
                      z = l - P;
                      do
                        V[l++] = V[z++], V[l++] = V[z++], V[l++] = V[z++], B -= 3;
                      while (B > 2);
                      B && (V[l++] = V[z++], B > 1 && (V[l++] = V[z++]));
                    }
                  } else if ((A & 64) === 0) {
                    I = x[(I & 65535) + (R & (1 << A) - 1)];
                    continue n;
                  } else {
                    r.msg = "invalid distance code", i.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((A & 64) === 0) {
              I = w[(I & 65535) + (R & (1 << A) - 1)];
              continue e;
            } else if (A & 32) {
              i.mode = e;
              break t;
            } else {
              r.msg = "invalid literal/length code", i.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && l < u);
    B = v >> 3, s -= B, v -= B << 3, R &= (1 << v) - 1, r.next_in = s, r.next_out = l, r.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), r.avail_out = l < u ? 257 + (u - l) : 257 - (l - u), i.hold = R, i.bits = v;
  }, gr;
}
var vr, Aa;
function fp() {
  if (Aa) return vr;
  Aa = 1;
  var t = me(), e = 15, n = 852, r = 592, a = 0, i = 1, s = 2, o = [
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
  ], l = [
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
  return vr = function(p, m, T, O, R, v, w, x) {
    var y = x.bits, $ = 0, I = 0, A = 0, B = 0, P = 0, z = 0, k = 0, q = 0, V = 0, J = 0, et, at, F, tt, rt, nt = null, Q = 0, _t, ot = new t.Buf16(e + 1), bt = new t.Buf16(e + 1), yt = null, it = 0, dt, st, kt;
    for ($ = 0; $ <= e; $++)
      ot[$] = 0;
    for (I = 0; I < O; I++)
      ot[m[T + I]]++;
    for (P = y, B = e; B >= 1 && ot[B] === 0; B--)
      ;
    if (P > B && (P = B), B === 0)
      return R[v++] = 1 << 24 | 64 << 16 | 0, R[v++] = 1 << 24 | 64 << 16 | 0, x.bits = 1, 0;
    for (A = 1; A < B && ot[A] === 0; A++)
      ;
    for (P < A && (P = A), q = 1, $ = 1; $ <= e; $++)
      if (q <<= 1, q -= ot[$], q < 0)
        return -1;
    if (q > 0 && (p === a || B !== 1))
      return -1;
    for (bt[1] = 0, $ = 1; $ < e; $++)
      bt[$ + 1] = bt[$] + ot[$];
    for (I = 0; I < O; I++)
      m[T + I] !== 0 && (w[bt[m[T + I]]++] = I);
    if (p === a ? (nt = yt = w, _t = 19) : p === i ? (nt = o, Q -= 257, yt = l, it -= 257, _t = 256) : (nt = c, yt = u, _t = -1), J = 0, I = 0, $ = A, rt = v, z = P, k = 0, F = -1, V = 1 << P, tt = V - 1, p === i && V > n || p === s && V > r)
      return 1;
    for (; ; ) {
      dt = $ - k, w[I] < _t ? (st = 0, kt = w[I]) : w[I] > _t ? (st = yt[it + w[I]], kt = nt[Q + w[I]]) : (st = 96, kt = 0), et = 1 << $ - k, at = 1 << z, A = at;
      do
        at -= et, R[rt + (J >> k) + at] = dt << 24 | st << 16 | kt | 0;
      while (at !== 0);
      for (et = 1 << $ - 1; J & et; )
        et >>= 1;
      if (et !== 0 ? (J &= et - 1, J += et) : J = 0, I++, --ot[$] === 0) {
        if ($ === B)
          break;
        $ = m[T + w[I]];
      }
      if ($ > P && (J & tt) !== F) {
        for (k === 0 && (k = P), rt += A, z = $ - k, q = 1 << z; z + k < B && (q -= ot[z + k], !(q <= 0)); )
          z++, q <<= 1;
        if (V += 1 << z, p === i && V > n || p === s && V > r)
          return 1;
        F = J & tt, R[F] = P << 24 | z << 16 | rt - v | 0;
      }
    }
    return J !== 0 && (R[rt + J] = $ - k << 24 | 64 << 16 | 0), x.bits = P, 0;
  }, vr;
}
var $a;
function up() {
  if ($a) return Kt;
  $a = 1;
  var t = me(), e = _o(), n = mo(), r = cp(), a = fp(), i = 0, s = 1, o = 2, l = 4, c = 5, u = 6, h = 0, p = 1, m = 2, T = -2, O = -3, R = -4, v = -5, w = 8, x = 1, y = 2, $ = 3, I = 4, A = 5, B = 6, P = 7, z = 8, k = 9, q = 10, V = 11, J = 12, et = 13, at = 14, F = 15, tt = 16, rt = 17, nt = 18, Q = 19, _t = 20, ot = 21, bt = 22, yt = 23, it = 24, dt = 25, st = 26, kt = 27, Dt = 28, Tt = 29, lt = 30, Y = 31, vt = 32, pt = 852, gt = 592, xt = 15, U = xt;
  function Mt(S) {
    return (S >>> 24 & 255) + (S >>> 8 & 65280) + ((S & 65280) << 8) + ((S & 255) << 24);
  }
  function zt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function $t(S) {
    var C;
    return !S || !S.state ? T : (C = S.state, S.total_in = S.total_out = C.total = 0, S.msg = "", C.wrap && (S.adler = C.wrap & 1), C.mode = x, C.last = 0, C.havedict = 0, C.dmax = 32768, C.head = null, C.hold = 0, C.bits = 0, C.lencode = C.lendyn = new t.Buf32(pt), C.distcode = C.distdyn = new t.Buf32(gt), C.sane = 1, C.back = -1, h);
  }
  function It(S) {
    var C;
    return !S || !S.state ? T : (C = S.state, C.wsize = 0, C.whave = 0, C.wnext = 0, $t(S));
  }
  function Ut(S, C) {
    var d, H;
    return !S || !S.state || (H = S.state, C < 0 ? (d = 0, C = -C) : (d = (C >> 4) + 1, C < 48 && (C &= 15)), C && (C < 8 || C > 15)) ? T : (H.window !== null && H.wbits !== C && (H.window = null), H.wrap = d, H.wbits = C, It(S));
  }
  function Et(S, C) {
    var d, H;
    return S ? (H = new zt(), S.state = H, H.window = null, d = Ut(S, C), d !== h && (S.state = null), d) : T;
  }
  function St(S) {
    return Et(S, U);
  }
  var Zt = !0, ft, K;
  function ct(S) {
    if (Zt) {
      var C;
      for (ft = new t.Buf32(512), K = new t.Buf32(32), C = 0; C < 144; )
        S.lens[C++] = 8;
      for (; C < 256; )
        S.lens[C++] = 9;
      for (; C < 280; )
        S.lens[C++] = 7;
      for (; C < 288; )
        S.lens[C++] = 8;
      for (a(s, S.lens, 0, 288, ft, 0, S.work, { bits: 9 }), C = 0; C < 32; )
        S.lens[C++] = 5;
      a(o, S.lens, 0, 32, K, 0, S.work, { bits: 5 }), Zt = !1;
    }
    S.lencode = ft, S.lenbits = 9, S.distcode = K, S.distbits = 5;
  }
  function ut(S, C, d, H) {
    var j, f = S.state;
    return f.window === null && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new t.Buf8(f.wsize)), H >= f.wsize ? (t.arraySet(f.window, C, d - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (j = f.wsize - f.wnext, j > H && (j = H), t.arraySet(f.window, C, d - H, j, f.wnext), H -= j, H ? (t.arraySet(f.window, C, d - H, H, 0), f.wnext = H, f.whave = f.wsize) : (f.wnext += j, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += j))), 0;
  }
  function g(S, C) {
    var d, H, j, f, D, L, _, b, E, X, G, W, mt, Wt, Nt = 0, wt, Ft, Bt, Vt, on, ln, Ct, Xt, Ot = new t.Buf8(4), le, re, ci = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!S || !S.state || !S.output || !S.input && S.avail_in !== 0)
      return T;
    d = S.state, d.mode === J && (d.mode = et), D = S.next_out, j = S.output, _ = S.avail_out, f = S.next_in, H = S.input, L = S.avail_in, b = d.hold, E = d.bits, X = L, G = _, Xt = h;
    t:
      for (; ; )
        switch (d.mode) {
          case x:
            if (d.wrap === 0) {
              d.mode = et;
              break;
            }
            for (; E < 16; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if (d.wrap & 2 && b === 35615) {
              d.check = 0, Ot[0] = b & 255, Ot[1] = b >>> 8 & 255, d.check = n(d.check, Ot, 2, 0), b = 0, E = 0, d.mode = y;
              break;
            }
            if (d.flags = 0, d.head && (d.head.done = !1), !(d.wrap & 1) || /* check if zlib header allowed */
            (((b & 255) << 8) + (b >> 8)) % 31) {
              S.msg = "incorrect header check", d.mode = lt;
              break;
            }
            if ((b & 15) !== w) {
              S.msg = "unknown compression method", d.mode = lt;
              break;
            }
            if (b >>>= 4, E -= 4, Ct = (b & 15) + 8, d.wbits === 0)
              d.wbits = Ct;
            else if (Ct > d.wbits) {
              S.msg = "invalid window size", d.mode = lt;
              break;
            }
            d.dmax = 1 << Ct, S.adler = d.check = 1, d.mode = b & 512 ? q : J, b = 0, E = 0;
            break;
          case y:
            for (; E < 16; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if (d.flags = b, (d.flags & 255) !== w) {
              S.msg = "unknown compression method", d.mode = lt;
              break;
            }
            if (d.flags & 57344) {
              S.msg = "unknown header flags set", d.mode = lt;
              break;
            }
            d.head && (d.head.text = b >> 8 & 1), d.flags & 512 && (Ot[0] = b & 255, Ot[1] = b >>> 8 & 255, d.check = n(d.check, Ot, 2, 0)), b = 0, E = 0, d.mode = $;
          /* falls through */
          case $:
            for (; E < 32; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            d.head && (d.head.time = b), d.flags & 512 && (Ot[0] = b & 255, Ot[1] = b >>> 8 & 255, Ot[2] = b >>> 16 & 255, Ot[3] = b >>> 24 & 255, d.check = n(d.check, Ot, 4, 0)), b = 0, E = 0, d.mode = I;
          /* falls through */
          case I:
            for (; E < 16; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            d.head && (d.head.xflags = b & 255, d.head.os = b >> 8), d.flags & 512 && (Ot[0] = b & 255, Ot[1] = b >>> 8 & 255, d.check = n(d.check, Ot, 2, 0)), b = 0, E = 0, d.mode = A;
          /* falls through */
          case A:
            if (d.flags & 1024) {
              for (; E < 16; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              d.length = b, d.head && (d.head.extra_len = b), d.flags & 512 && (Ot[0] = b & 255, Ot[1] = b >>> 8 & 255, d.check = n(d.check, Ot, 2, 0)), b = 0, E = 0;
            } else d.head && (d.head.extra = null);
            d.mode = B;
          /* falls through */
          case B:
            if (d.flags & 1024 && (W = d.length, W > L && (W = L), W && (d.head && (Ct = d.head.extra_len - d.length, d.head.extra || (d.head.extra = new Array(d.head.extra_len)), t.arraySet(
              d.head.extra,
              H,
              f,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              W,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ct
            )), d.flags & 512 && (d.check = n(d.check, H, W, f)), L -= W, f += W, d.length -= W), d.length))
              break t;
            d.length = 0, d.mode = P;
          /* falls through */
          case P:
            if (d.flags & 2048) {
              if (L === 0)
                break t;
              W = 0;
              do
                Ct = H[f + W++], d.head && Ct && d.length < 65536 && (d.head.name += String.fromCharCode(Ct));
              while (Ct && W < L);
              if (d.flags & 512 && (d.check = n(d.check, H, W, f)), L -= W, f += W, Ct)
                break t;
            } else d.head && (d.head.name = null);
            d.length = 0, d.mode = z;
          /* falls through */
          case z:
            if (d.flags & 4096) {
              if (L === 0)
                break t;
              W = 0;
              do
                Ct = H[f + W++], d.head && Ct && d.length < 65536 && (d.head.comment += String.fromCharCode(Ct));
              while (Ct && W < L);
              if (d.flags & 512 && (d.check = n(d.check, H, W, f)), L -= W, f += W, Ct)
                break t;
            } else d.head && (d.head.comment = null);
            d.mode = k;
          /* falls through */
          case k:
            if (d.flags & 512) {
              for (; E < 16; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              if (b !== (d.check & 65535)) {
                S.msg = "header crc mismatch", d.mode = lt;
                break;
              }
              b = 0, E = 0;
            }
            d.head && (d.head.hcrc = d.flags >> 9 & 1, d.head.done = !0), S.adler = d.check = 0, d.mode = J;
            break;
          case q:
            for (; E < 32; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            S.adler = d.check = Mt(b), b = 0, E = 0, d.mode = V;
          /* falls through */
          case V:
            if (d.havedict === 0)
              return S.next_out = D, S.avail_out = _, S.next_in = f, S.avail_in = L, d.hold = b, d.bits = E, m;
            S.adler = d.check = 1, d.mode = J;
          /* falls through */
          case J:
            if (C === c || C === u)
              break t;
          /* falls through */
          case et:
            if (d.last) {
              b >>>= E & 7, E -= E & 7, d.mode = kt;
              break;
            }
            for (; E < 3; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            switch (d.last = b & 1, b >>>= 1, E -= 1, b & 3) {
              case 0:
                d.mode = at;
                break;
              case 1:
                if (ct(d), d.mode = _t, C === u) {
                  b >>>= 2, E -= 2;
                  break t;
                }
                break;
              case 2:
                d.mode = rt;
                break;
              case 3:
                S.msg = "invalid block type", d.mode = lt;
            }
            b >>>= 2, E -= 2;
            break;
          case at:
            for (b >>>= E & 7, E -= E & 7; E < 32; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if ((b & 65535) !== (b >>> 16 ^ 65535)) {
              S.msg = "invalid stored block lengths", d.mode = lt;
              break;
            }
            if (d.length = b & 65535, b = 0, E = 0, d.mode = F, C === u)
              break t;
          /* falls through */
          case F:
            d.mode = tt;
          /* falls through */
          case tt:
            if (W = d.length, W) {
              if (W > L && (W = L), W > _ && (W = _), W === 0)
                break t;
              t.arraySet(j, H, f, W, D), L -= W, f += W, _ -= W, D += W, d.length -= W;
              break;
            }
            d.mode = J;
            break;
          case rt:
            for (; E < 14; ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if (d.nlen = (b & 31) + 257, b >>>= 5, E -= 5, d.ndist = (b & 31) + 1, b >>>= 5, E -= 5, d.ncode = (b & 15) + 4, b >>>= 4, E -= 4, d.nlen > 286 || d.ndist > 30) {
              S.msg = "too many length or distance symbols", d.mode = lt;
              break;
            }
            d.have = 0, d.mode = nt;
          /* falls through */
          case nt:
            for (; d.have < d.ncode; ) {
              for (; E < 3; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              d.lens[ci[d.have++]] = b & 7, b >>>= 3, E -= 3;
            }
            for (; d.have < 19; )
              d.lens[ci[d.have++]] = 0;
            if (d.lencode = d.lendyn, d.lenbits = 7, le = { bits: d.lenbits }, Xt = a(i, d.lens, 0, 19, d.lencode, 0, d.work, le), d.lenbits = le.bits, Xt) {
              S.msg = "invalid code lengths set", d.mode = lt;
              break;
            }
            d.have = 0, d.mode = Q;
          /* falls through */
          case Q:
            for (; d.have < d.nlen + d.ndist; ) {
              for (; Nt = d.lencode[b & (1 << d.lenbits) - 1], wt = Nt >>> 24, Ft = Nt >>> 16 & 255, Bt = Nt & 65535, !(wt <= E); ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              if (Bt < 16)
                b >>>= wt, E -= wt, d.lens[d.have++] = Bt;
              else {
                if (Bt === 16) {
                  for (re = wt + 2; E < re; ) {
                    if (L === 0)
                      break t;
                    L--, b += H[f++] << E, E += 8;
                  }
                  if (b >>>= wt, E -= wt, d.have === 0) {
                    S.msg = "invalid bit length repeat", d.mode = lt;
                    break;
                  }
                  Ct = d.lens[d.have - 1], W = 3 + (b & 3), b >>>= 2, E -= 2;
                } else if (Bt === 17) {
                  for (re = wt + 3; E < re; ) {
                    if (L === 0)
                      break t;
                    L--, b += H[f++] << E, E += 8;
                  }
                  b >>>= wt, E -= wt, Ct = 0, W = 3 + (b & 7), b >>>= 3, E -= 3;
                } else {
                  for (re = wt + 7; E < re; ) {
                    if (L === 0)
                      break t;
                    L--, b += H[f++] << E, E += 8;
                  }
                  b >>>= wt, E -= wt, Ct = 0, W = 11 + (b & 127), b >>>= 7, E -= 7;
                }
                if (d.have + W > d.nlen + d.ndist) {
                  S.msg = "invalid bit length repeat", d.mode = lt;
                  break;
                }
                for (; W--; )
                  d.lens[d.have++] = Ct;
              }
            }
            if (d.mode === lt)
              break;
            if (d.lens[256] === 0) {
              S.msg = "invalid code -- missing end-of-block", d.mode = lt;
              break;
            }
            if (d.lenbits = 9, le = { bits: d.lenbits }, Xt = a(s, d.lens, 0, d.nlen, d.lencode, 0, d.work, le), d.lenbits = le.bits, Xt) {
              S.msg = "invalid literal/lengths set", d.mode = lt;
              break;
            }
            if (d.distbits = 6, d.distcode = d.distdyn, le = { bits: d.distbits }, Xt = a(o, d.lens, d.nlen, d.ndist, d.distcode, 0, d.work, le), d.distbits = le.bits, Xt) {
              S.msg = "invalid distances set", d.mode = lt;
              break;
            }
            if (d.mode = _t, C === u)
              break t;
          /* falls through */
          case _t:
            d.mode = ot;
          /* falls through */
          case ot:
            if (L >= 6 && _ >= 258) {
              S.next_out = D, S.avail_out = _, S.next_in = f, S.avail_in = L, d.hold = b, d.bits = E, r(S, G), D = S.next_out, j = S.output, _ = S.avail_out, f = S.next_in, H = S.input, L = S.avail_in, b = d.hold, E = d.bits, d.mode === J && (d.back = -1);
              break;
            }
            for (d.back = 0; Nt = d.lencode[b & (1 << d.lenbits) - 1], wt = Nt >>> 24, Ft = Nt >>> 16 & 255, Bt = Nt & 65535, !(wt <= E); ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if (Ft && (Ft & 240) === 0) {
              for (Vt = wt, on = Ft, ln = Bt; Nt = d.lencode[ln + ((b & (1 << Vt + on) - 1) >> Vt)], wt = Nt >>> 24, Ft = Nt >>> 16 & 255, Bt = Nt & 65535, !(Vt + wt <= E); ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              b >>>= Vt, E -= Vt, d.back += Vt;
            }
            if (b >>>= wt, E -= wt, d.back += wt, d.length = Bt, Ft === 0) {
              d.mode = st;
              break;
            }
            if (Ft & 32) {
              d.back = -1, d.mode = J;
              break;
            }
            if (Ft & 64) {
              S.msg = "invalid literal/length code", d.mode = lt;
              break;
            }
            d.extra = Ft & 15, d.mode = bt;
          /* falls through */
          case bt:
            if (d.extra) {
              for (re = d.extra; E < re; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              d.length += b & (1 << d.extra) - 1, b >>>= d.extra, E -= d.extra, d.back += d.extra;
            }
            d.was = d.length, d.mode = yt;
          /* falls through */
          case yt:
            for (; Nt = d.distcode[b & (1 << d.distbits) - 1], wt = Nt >>> 24, Ft = Nt >>> 16 & 255, Bt = Nt & 65535, !(wt <= E); ) {
              if (L === 0)
                break t;
              L--, b += H[f++] << E, E += 8;
            }
            if ((Ft & 240) === 0) {
              for (Vt = wt, on = Ft, ln = Bt; Nt = d.distcode[ln + ((b & (1 << Vt + on) - 1) >> Vt)], wt = Nt >>> 24, Ft = Nt >>> 16 & 255, Bt = Nt & 65535, !(Vt + wt <= E); ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              b >>>= Vt, E -= Vt, d.back += Vt;
            }
            if (b >>>= wt, E -= wt, d.back += wt, Ft & 64) {
              S.msg = "invalid distance code", d.mode = lt;
              break;
            }
            d.offset = Bt, d.extra = Ft & 15, d.mode = it;
          /* falls through */
          case it:
            if (d.extra) {
              for (re = d.extra; E < re; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              d.offset += b & (1 << d.extra) - 1, b >>>= d.extra, E -= d.extra, d.back += d.extra;
            }
            if (d.offset > d.dmax) {
              S.msg = "invalid distance too far back", d.mode = lt;
              break;
            }
            d.mode = dt;
          /* falls through */
          case dt:
            if (_ === 0)
              break t;
            if (W = G - _, d.offset > W) {
              if (W = d.offset - W, W > d.whave && d.sane) {
                S.msg = "invalid distance too far back", d.mode = lt;
                break;
              }
              W > d.wnext ? (W -= d.wnext, mt = d.wsize - W) : mt = d.wnext - W, W > d.length && (W = d.length), Wt = d.window;
            } else
              Wt = j, mt = D - d.offset, W = d.length;
            W > _ && (W = _), _ -= W, d.length -= W;
            do
              j[D++] = Wt[mt++];
            while (--W);
            d.length === 0 && (d.mode = ot);
            break;
          case st:
            if (_ === 0)
              break t;
            j[D++] = d.length, _--, d.mode = ot;
            break;
          case kt:
            if (d.wrap) {
              for (; E < 32; ) {
                if (L === 0)
                  break t;
                L--, b |= H[f++] << E, E += 8;
              }
              if (G -= _, S.total_out += G, d.total += G, G && (S.adler = d.check = /*UPDATE(state.check, put - _out, _out);*/
              d.flags ? n(d.check, j, G, D - G) : e(d.check, j, G, D - G)), G = _, (d.flags ? b : Mt(b)) !== d.check) {
                S.msg = "incorrect data check", d.mode = lt;
                break;
              }
              b = 0, E = 0;
            }
            d.mode = Dt;
          /* falls through */
          case Dt:
            if (d.wrap && d.flags) {
              for (; E < 32; ) {
                if (L === 0)
                  break t;
                L--, b += H[f++] << E, E += 8;
              }
              if (b !== (d.total & 4294967295)) {
                S.msg = "incorrect length check", d.mode = lt;
                break;
              }
              b = 0, E = 0;
            }
            d.mode = Tt;
          /* falls through */
          case Tt:
            Xt = p;
            break t;
          case lt:
            Xt = O;
            break t;
          case Y:
            return R;
          case vt:
          /* falls through */
          default:
            return T;
        }
    return S.next_out = D, S.avail_out = _, S.next_in = f, S.avail_in = L, d.hold = b, d.bits = E, (d.wsize || G !== S.avail_out && d.mode < lt && (d.mode < kt || C !== l)) && ut(S, S.output, S.next_out, G - S.avail_out), X -= S.avail_in, G -= S.avail_out, S.total_in += X, S.total_out += G, d.total += G, d.wrap && G && (S.adler = d.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    d.flags ? n(d.check, j, G, S.next_out - G) : e(d.check, j, G, S.next_out - G)), S.data_type = d.bits + (d.last ? 64 : 0) + (d.mode === J ? 128 : 0) + (d.mode === _t || d.mode === F ? 256 : 0), (X === 0 && G === 0 || C === l) && Xt === h && (Xt = v), Xt;
  }
  function M(S) {
    if (!S || !S.state)
      return T;
    var C = S.state;
    return C.window && (C.window = null), S.state = null, h;
  }
  function N(S, C) {
    var d;
    return !S || !S.state || (d = S.state, (d.wrap & 2) === 0) ? T : (d.head = C, C.done = !1, h);
  }
  function Z(S, C) {
    var d = C.length, H, j, f;
    return !S || !S.state || (H = S.state, H.wrap !== 0 && H.mode !== V) ? T : H.mode === V && (j = 1, j = e(j, C, d, 0), j !== H.check) ? O : (f = ut(S, C, d, d), f ? (H.mode = Y, R) : (H.havedict = 1, h));
  }
  return Kt.inflateReset = It, Kt.inflateReset2 = Ut, Kt.inflateResetKeep = $t, Kt.inflateInit = St, Kt.inflateInit2 = Et, Kt.inflate = g, Kt.inflateEnd = M, Kt.inflateGetHeader = N, Kt.inflateSetDictionary = Z, Kt.inflateInfo = "pako inflate (from Nodeca project)", Kt;
}
var wr, Ia;
function wo() {
  return Ia || (Ia = 1, wr = {
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
  }), wr;
}
var yr, Na;
function hp() {
  if (Na) return yr;
  Na = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return yr = t, yr;
}
var Da;
function dp() {
  if (Da) return Le;
  Da = 1;
  var t = up(), e = me(), n = go(), r = wo(), a = si(), i = vo(), s = hp(), o = Object.prototype.toString;
  function l(h) {
    if (!(this instanceof l)) return new l(h);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, h || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(h && h.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
    var m = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (m !== r.Z_OK)
      throw new Error(a[m]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (m = t.inflateSetDictionary(this.strm, p.dictionary), m !== r.Z_OK)))
      throw new Error(a[m]);
  }
  l.prototype.push = function(h, p) {
    var m = this.strm, T = this.options.chunkSize, O = this.options.dictionary, R, v, w, x, y, $ = !1;
    if (this.ended)
      return !1;
    v = p === ~~p ? p : p === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, typeof h == "string" ? m.input = n.binstring2buf(h) : o.call(h) === "[object ArrayBuffer]" ? m.input = new Uint8Array(h) : m.input = h, m.next_in = 0, m.avail_in = m.input.length;
    do {
      if (m.avail_out === 0 && (m.output = new e.Buf8(T), m.next_out = 0, m.avail_out = T), R = t.inflate(m, r.Z_NO_FLUSH), R === r.Z_NEED_DICT && O && (R = t.inflateSetDictionary(this.strm, O)), R === r.Z_BUF_ERROR && $ === !0 && (R = r.Z_OK, $ = !1), R !== r.Z_STREAM_END && R !== r.Z_OK)
        return this.onEnd(R), this.ended = !0, !1;
      m.next_out && (m.avail_out === 0 || R === r.Z_STREAM_END || m.avail_in === 0 && (v === r.Z_FINISH || v === r.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (w = n.utf8border(m.output, m.next_out), x = m.next_out - w, y = n.buf2string(m.output, w), m.next_out = x, m.avail_out = T - x, x && e.arraySet(m.output, m.output, w, x, 0), this.onData(y)) : this.onData(e.shrinkBuf(m.output, m.next_out))), m.avail_in === 0 && m.avail_out === 0 && ($ = !0);
    } while ((m.avail_in > 0 || m.avail_out === 0) && R !== r.Z_STREAM_END);
    return R === r.Z_STREAM_END && (v = r.Z_FINISH), v === r.Z_FINISH ? (R = t.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === r.Z_OK) : (v === r.Z_SYNC_FLUSH && (this.onEnd(r.Z_OK), m.avail_out = 0), !0);
  }, l.prototype.onData = function(h) {
    this.chunks.push(h);
  }, l.prototype.onEnd = function(h) {
    h === r.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = h, this.msg = this.strm.msg;
  };
  function c(h, p) {
    var m = new l(p);
    if (m.push(h, !0), m.err)
      throw m.msg || a[m.err];
    return m.result;
  }
  function u(h, p) {
    return p = p || {}, p.raw = !0, c(h, p);
  }
  return Le.Inflate = l, Le.inflate = c, Le.inflateRaw = u, Le.ungzip = c, Le;
}
var br, Ra;
function pp() {
  if (Ra) return br;
  Ra = 1;
  var t = me().assign, e = lp(), n = dp(), r = wo(), a = {};
  return t(a, e, n, r), br = a, br;
}
var _p = pp();
const mp = /* @__PURE__ */ Kn(_p);
function gp(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function yo(t) {
  const e = new Uint8Array(gp(t));
  let n = 0;
  for (const r of t)
    e.set(r, n), n += r.length;
  return e;
}
const { Z_SYNC_FLUSH: bo, Inflate: xo } = mp;
async function oi(t) {
  try {
    let e, n = 0, r;
    const a = [];
    do {
      const i = t.subarray(n);
      if (r = new xo(), { strm: e } = r, r.push(i, bo), r.err)
        throw new Error(r.msg);
      n += e.next_in, a.push(r.result);
    } while (e.avail_in);
    return yo(a);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function vp(t, e) {
  try {
    let n;
    const { minv: r, maxv: a } = e;
    let i = r.blockPosition, s = r.dataPosition;
    const o = [], l = [], c = [];
    let u = 0;
    do {
      const h = t.subarray(i - r.blockPosition), p = new xo();
      if ({ strm: n } = p, p.push(h, bo), p.err)
        throw new Error(p.msg);
      const m = p.result;
      o.push(m);
      let T = m.length;
      l.push(i), c.push(s), o.length === 1 && r.dataPosition && (o[0] = o[0].subarray(r.dataPosition), T = o[0].length);
      const O = i;
      if (i += n.next_in, s += T, O >= a.blockPosition) {
        o[u] = o[u].subarray(0, a.blockPosition === r.blockPosition ? a.dataPosition - r.dataPosition + 1 : a.dataPosition + 1), l.push(i), c.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: yo(o),
      cpositions: l,
      dpositions: c
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class qn {
  constructor(e, n, r, a = void 0) {
    this.minv = e, this.maxv = n, this.bin = r, this._fetchedSize = a;
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
class ko {
  constructor({ filehandle: e, renameRefSeqs: n = (r) => r }) {
    this.filehandle = e, this.renameRefSeq = n;
  }
  async getMetadata(e = {}) {
    const { indices: n, ...r } = await this.parse(e);
    return r;
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
const Ma = 65536, wp = Ma * Ma;
function So(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * wp + (n >>> 0);
}
class yp extends Error {
}
function Qe(t) {
  if (t && t.aborted) {
    if (typeof DOMException < "u")
      throw new DOMException("aborted", "AbortError");
    {
      const e = new yp("aborted");
      throw e.code = "ERR_ABORTED", e;
    }
  }
}
function bp(t, e) {
  return e.minv.blockPosition - t.maxv.blockPosition < 65e3 && e.maxv.blockPosition - t.minv.blockPosition < 5e6;
}
function To(t, e) {
  const n = [];
  let r = null;
  return t.length === 0 ? t : (t.sort(function(a, i) {
    const s = a.minv.blockPosition - i.minv.blockPosition;
    return s !== 0 ? s : a.minv.dataPosition - i.minv.dataPosition;
  }), t.forEach((a) => {
    (!e || a.maxv.compareTo(e) > 0) && (r === null ? (n.push(a), r = a) : bp(r, a) ? a.maxv.compareTo(r.maxv) > 0 && (r.maxv = a.maxv) : (n.push(a), r = a));
  }), n);
}
class li {
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
function Be(t, e = 0) {
  return new li(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const xp = 21582659, kp = 38359875, Sp = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function Tp(t, e) {
  return t * 2 ** e;
}
function Ca(t, e) {
  return Math.floor(t / 2 ** e);
}
class xr extends ko {
  constructor(e) {
    super(e), this.maxBinNumber = 0, this.depth = 0, this.minShift = 0;
  }
  async lineCount(e, n = {}) {
    const r = await this.parse(n), a = r.refNameToId[e];
    if (a === void 0 || !r.indices[a])
      return -1;
    const { stats: s } = r.indices[a];
    return s ? s.lineCount : -1;
  }
  indexCov() {
    throw new Error("CSI indexes do not support indexcov");
  }
  parseAuxData(e, n) {
    const r = new DataView(e.buffer), a = r.getInt32(n, !0), i = a & 65536 ? "zero-based-half-open" : "1-based-closed", s = Sp[a & 15];
    if (!s)
      throw new Error(`invalid Tabix preset format flags ${a}`);
    const o = {
      ref: r.getInt32(n + 4, !0),
      start: r.getInt32(n + 8, !0),
      end: r.getInt32(n + 12, !0)
    }, l = r.getInt32(n + 16, !0), c = l ? String.fromCharCode(l) : null, u = r.getInt32(n + 20, !0), h = r.getInt32(n + 24, !0), { refIdToName: p, refNameToId: m } = this._parseNameBytes(e.subarray(n + 28, n + 28 + h));
    return {
      refIdToName: p,
      refNameToId: m,
      skipLines: u,
      metaChar: c,
      columnNumbers: o,
      format: s,
      coordinateType: i
    };
  }
  _parseNameBytes(e) {
    let n = 0, r = 0;
    const a = [], i = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (r < o) {
          const l = this.renameRefSeq(s.decode(e.subarray(r, o)));
          a[n] = l, i[l] = n;
        }
        r = o + 1, n += 1;
      }
    return {
      refNameToId: i,
      refIdToName: a
    };
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await oi(await this.filehandle.readFile(e)), r = new DataView(n.buffer);
    let a;
    if (r.getUint32(0, !0) === xp)
      a = 1;
    else if (r.getUint32(0, !0) === kp)
      a = 2;
    else
      throw new Error("Not a CSI file");
    this.minShift = r.getInt32(4, !0), this.depth = r.getInt32(8, !0), this.maxBinNumber = ((1 << (this.depth + 1) * 3) - 1) / 7;
    const i = 2 ** (this.minShift + this.depth * 3), s = r.getInt32(12, !0), o = s && s >= 30 ? this.parseAuxData(n, 16) : {
      refIdToName: [],
      refNameToId: {},
      metaChar: null,
      columnNumbers: { ref: 0, start: 1, end: 2 },
      coordinateType: "zero-based-half-open",
      format: "generic"
    }, l = r.getInt32(16 + s, !0);
    let c, u = 16 + s + 4;
    const h = new Array(l).fill(0).map(() => {
      const p = r.getInt32(u, !0);
      u += 4;
      const m = {};
      let T;
      for (let O = 0; O < p; O += 1) {
        const R = r.getUint32(u, !0);
        if (R > this.maxBinNumber)
          T = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const v = Be(n, u + 4);
          c = this._findFirstData(c, v);
          const w = r.getInt32(u + 12, !0);
          u += 16;
          const x = new Array(w);
          for (let y = 0; y < w; y += 1) {
            const $ = Be(n, u), I = Be(n, u + 8);
            u += 16, x[y] = new qn($, I, R);
          }
          m[R] = x;
        }
      }
      return { binIndex: m, stats: T };
    });
    return {
      ...o,
      csi: !0,
      refCount: l,
      maxBlockSize: 65536,
      firstDataLine: c,
      csiVersion: a,
      indices: h,
      depth: this.depth,
      maxBinNumber: this.maxBinNumber,
      maxRefLength: i
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: So(e, n + 28)
    };
  }
  async blocksForRange(e, n, r, a = {}) {
    n < 0 && (n = 0);
    const i = await this.parse(a), s = i.refNameToId[e];
    if (s === void 0)
      return [];
    const o = i.indices[s];
    if (!o)
      return [];
    const l = this.reg2bins(n, r), c = [];
    for (const [u, h] of l)
      for (let p = u; p <= h; p++)
        if (o.binIndex[p])
          for (const m of o.binIndex[p])
            c.push(new qn(m.minv, m.maxv, p));
    return To(c, new li(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let r = 0, a = 0, i = this.minShift + this.depth * 3;
    const s = [];
    for (; r <= this.depth; i -= 3, a += Tp(1, r * 3), r += 1) {
      const o = a + Ca(e, i), l = a + Ca(n, i);
      if (l - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, l]);
    }
    return s;
  }
}
const Ep = 21578324, La = 14;
function Ap(t, e) {
  return t += 1, e -= 1, [
    [0, 0],
    [1 + (t >> 26), 1 + (e >> 26)],
    [9 + (t >> 23), 9 + (e >> 23)],
    [73 + (t >> 20), 73 + (e >> 20)],
    [585 + (t >> 17), 585 + (e >> 17)],
    [4681 + (t >> 14), 4681 + (e >> 14)]
  ];
}
class We extends ko {
  async lineCount(e, n = {}) {
    const r = await this.parse(n), a = r.refNameToId[e];
    return a === void 0 || !r.indices[a] ? -1 : r.indices[a].stats?.lineCount ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), r = await oi(n);
    Qe(e.signal);
    const a = new DataView(r.buffer);
    if (a.getUint32(0, !0) !== Ep)
      throw new Error("Not a TBI file");
    const s = a.getUint32(4, !0), o = a.getUint32(8, !0), l = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const h = {
      ref: a.getInt32(12, !0),
      start: a.getInt32(16, !0),
      end: a.getInt32(20, !0)
    }, p = a.getInt32(24, !0), m = 5, T = ((1 << (m + 1) * 3) - 1) / 7, O = 2 ** (14 + m * 3), R = p ? String.fromCharCode(p) : null, v = a.getInt32(28, !0), w = a.getInt32(32, !0), { refNameToId: x, refIdToName: y } = this._parseNameBytes(r.slice(36, 36 + w));
    let $ = 36 + w, I;
    return {
      indices: new Array(s).fill(0).map(() => {
        const B = a.getInt32($, !0);
        $ += 4;
        const P = {};
        let z;
        for (let V = 0; V < B; V += 1) {
          const J = a.getUint32($, !0);
          if ($ += 4, J > T + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (J === T + 1) {
            const et = a.getInt32($, !0);
            $ += 4, et === 2 && (z = this.parsePseudoBin(r, $)), $ += 16 * et;
          } else {
            const et = a.getInt32($, !0);
            $ += 4;
            const at = new Array(et);
            for (let F = 0; F < et; F += 1) {
              const tt = Be(r, $), rt = Be(r, $ + 8);
              $ += 16, I = this._findFirstData(I, tt), at[F] = new qn(tt, rt, J);
            }
            P[J] = at;
          }
        }
        const k = a.getInt32($, !0);
        $ += 4;
        const q = new Array(k);
        for (let V = 0; V < k; V += 1)
          q[V] = Be(r, $), $ += 8, I = this._findFirstData(I, q[V]);
        return {
          binIndex: P,
          linearIndex: q,
          stats: z
        };
      }),
      metaChar: R,
      maxBinNumber: T,
      maxRefLength: O,
      skipLines: v,
      firstDataLine: I,
      columnNumbers: h,
      coordinateType: l,
      format: u,
      refIdToName: y,
      refNameToId: x,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: So(e, n + 16)
    };
  }
  _parseNameBytes(e) {
    let n = 0, r = 0;
    const a = [], i = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (r < o) {
          const l = this.renameRefSeq(s.decode(e.subarray(r, o)));
          a[n] = l, i[l] = n;
        }
        r = o + 1, n += 1;
      }
    return {
      refNameToId: i,
      refIdToName: a
    };
  }
  async blocksForRange(e, n, r, a = {}) {
    n < 0 && (n = 0);
    const i = await this.parse(a), s = i.refNameToId[e];
    if (s === void 0)
      return [];
    const o = i.indices[s];
    if (!o)
      return [];
    (o.linearIndex.length ? o.linearIndex[n >> La >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> La] : new li(0, 0)) || console.warn("querying outside of possible tabix range");
    const c = Ap(n, r), u = [];
    for (const [O, R] of c)
      for (let v = O; v <= R; v++)
        if (o.binIndex[v])
          for (const w of o.binIndex[v])
            u.push(new qn(w.minv, w.maxv, v));
    const h = o.linearIndex.length;
    let p = null;
    const m = Math.min(n >> 14, h - 1), T = Math.min(r >> 14, h - 1);
    for (let O = m; O <= T; ++O) {
      const R = o.linearIndex[O];
      R && (!p || R.compareTo(p) < 0) && (p = R);
    }
    return To(u, p);
  }
}
function $p(t) {
  return /^[\u0000-\u007F]*$/.test(t);
}
class Eo {
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
  constructor({ path: e, filehandle: n, url: r, tbiPath: a, tbiUrl: i, tbiFilehandle: s, csiPath: o, csiUrl: l, csiFilehandle: c, renameRefSeqs: u = (p) => p, chunkCacheSize: h = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new yn(e);
    else if (r)
      this.filehandle = new ae(r);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new We({
        filehandle: s,
        renameRefSeqs: u
      });
    else if (c)
      this.index = new xr({
        filehandle: c,
        renameRefSeqs: u
      });
    else if (a)
      this.index = new We({
        filehandle: new yn(a),
        renameRefSeqs: u
      });
    else if (o)
      this.index = new xr({
        filehandle: new yn(o),
        renameRefSeqs: u
      });
    else if (e)
      this.index = new We({
        filehandle: new yn(`${e}.tbi`),
        renameRefSeqs: u
      });
    else if (l)
      this.index = new xr({
        filehandle: new ae(l)
      });
    else if (i)
      this.index = new We({
        filehandle: new ae(i)
      });
    else if (r)
      this.index = new We({
        filehandle: new ae(`${r}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = u, this.chunkCache = new $e({
      cache: new Yn({ maxSize: Math.floor(h / 65536) }),
      fill: (p, m) => this.readChunk(p, { signal: m })
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
  async getLines(e, n, r, a) {
    let i, s = {}, o;
    typeof a == "function" ? o = a : (s = a, o = a.lineCallback, i = a.signal);
    const l = await this.index.getMetadata(s);
    Qe(i);
    const c = n ?? 0, u = r ?? l.maxRefLength;
    if (!(c <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (c === u)
      return;
    const h = await this.index.blocksForRange(e, c, u, s);
    Qe(i);
    const p = new TextDecoder("utf8");
    for (const m of h) {
      const { buffer: T, cpositions: O, dpositions: R } = await this.chunkCache.get(m.toString(), m, i);
      Qe(i);
      let v = 0, w = 0;
      const x = p.decode(T), y = $p(x);
      for (; v < x.length; ) {
        let $, I;
        if (y) {
          if (I = x.indexOf(`
`, v), I === -1)
            break;
          $ = x.slice(v, I);
        } else {
          if (I = T.indexOf(10, v), I === -1)
            break;
          const P = T.slice(v, I);
          $ = p.decode(P);
        }
        if (R) {
          for (; v + m.minv.dataPosition >= R[w++]; )
            ;
          w--;
        }
        const { startCoordinate: A, overlaps: B } = this.checkLine(l, e, c, u, $);
        if (B)
          o(
            $,
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
            O[w] * 256 + (v - R[w]) + m.minv.dataPosition + 1
          );
        else if (A !== void 0 && A >= u)
          return;
        v = I + 1;
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
    const { firstDataLine: n, metaChar: r, maxBlockSize: a } = await this.getMetadata(e);
    Qe(e.signal);
    const i = (n?.blockPosition || 0) + a, s = await this.filehandle.read(i, 0, e), o = await oi(s);
    if (r) {
      let l = -1;
      const c = 10, u = r.charCodeAt(0);
      for (let h = 0; h < o.length && !(h === l + 1 && o[h] !== u); h += 1)
        o[h] === c && (l = h);
      return o.subarray(0, l + 1);
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
    const n = new TextDecoder("utf8"), r = await this.getHeaderBuffer(e);
    return n.decode(r);
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
  checkLine(e, n, r, a, i) {
    const { columnNumbers: s, metaChar: o, coordinateType: l, format: c } = e;
    if (o && i.startsWith(o))
      return { overlaps: !1 };
    let { ref: u, start: h, end: p } = s;
    u || (u = 0), h || (h = 0), p || (p = 0), c === "VCF" && (p = 8);
    const m = Math.max(u, h, p);
    let T = 1, O = 0, R = "", v = -1 / 0;
    const w = i.length;
    for (let x = 0; x < w + 1; x++)
      if (i[x] === "	" || x === w) {
        if (T === u) {
          if (this.renameRefSeq(i.slice(O, x)) !== n)
            return {
              overlaps: !1
            };
        } else if (T === h) {
          if (v = parseInt(i.slice(O, x), 10), l === "1-based-closed" && (v -= 1), v >= a)
            return {
              startCoordinate: v,
              overlaps: !1
            };
          if ((p === 0 || p === h) && v + 1 <= r)
            return {
              startCoordinate: v,
              overlaps: !1
            };
        } else if (c === "VCF" && T === 4)
          R = i.slice(O, x);
        else if (T === p && (c === "VCF" ? this._getVcfEnd(v, R, i.slice(O, x)) : Number.parseInt(i.slice(O, x), 10)) <= r)
          return {
            overlaps: !1
          };
        if (O = x + 1, T += 1, T > m)
          break;
      }
    return {
      startCoordinate: v,
      overlaps: !0
    };
  }
  _getVcfEnd(e, n, r) {
    let a = e + n.length;
    const i = r.includes("SVTYPE=TRA");
    if (r[0] !== "." && !i) {
      let s = ";";
      for (let o = 0; o < r.length; o += 1) {
        if (s === ";" && r.slice(o, o + 4) === "END=") {
          let l = r.indexOf(";", o);
          l === -1 && (l = r.length), a = parseInt(r.slice(o + 4, l), 10);
          break;
        }
        s = r[o];
      }
    } else if (i)
      return e + 1;
    return a;
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
    const r = await this.filehandle.read(e.fetchedSize(), e.minv.blockPosition, n);
    return vp(r, e);
  }
}
function Ip(t, e, n) {
  const r = e.split("	"), a = {};
  let i = 0;
  if (t.includes("GT")) {
    const s = t.split(":");
    if (s.length === 1)
      for (const o of n)
        a[o] = r[i++];
    else {
      const o = s.indexOf("GT");
      if (o === 0)
        for (const l of n) {
          const c = r[i++], u = c.indexOf(":");
          a[l] = u !== -1 ? c.slice(0, u) : c;
        }
      else
        for (const l of n) {
          const c = r[i++].split(":");
          a[l] = c[o];
        }
    }
  }
  return a;
}
function Np(t) {
  const e = [];
  let n = "", r = !1, a = !1;
  for (const i of t)
    i === '"' ? (r = !r, n += i) : i === "[" ? (a = !0, n += i) : i === "]" ? (a = !1, n += i) : i === "," && !r && !a ? (e.push(n.trim()), n = "") : n += i;
  return n && e.push(n.trim()), e;
}
function Dp(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function Rp(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(Np(e).map((n) => {
    const [r, a] = Dp(n, "=");
    return a && a.startsWith("[") && a.endsWith("]") ? [
      r,
      a.slice(1, -1).split(",").map((i) => i.trim())
    ] : a && a.startsWith('"') && a.endsWith('"') ? [r, a.slice(1, -1)] : [r, a?.replaceAll(/^"|"$/g, "")];
  }));
}
const bn = {
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
function Mp(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class Cp {
  constructor({ header: e = "", strict: n = !0 }) {
    if (!e.length)
      throw new Error("empty header received");
    const r = e.split(/[\r\n]+/).filter(Boolean);
    if (!r.length)
      throw new Error("no non-empty header lines specified");
    this.strict = n, this.metadata = JSON.parse(JSON.stringify({
      INFO: bn.InfoFields,
      FORMAT: bn.GenotypeFields,
      ALT: bn.AltTypes,
      FILTER: bn.FilterTypes
    }));
    let a;
    if (r.forEach((l) => {
      if (l.startsWith("#"))
        l.startsWith("##") ? this.parseMetadata(l) : a = l;
      else throw new Error(`Bad line in header:
${l}`);
    }), !a)
      throw new Error("No format line found in header");
    const i = a.trim().split("	"), s = i.slice(0, 8), o = [
      "#CHROM",
      "POS",
      "ID",
      "REF",
      "ALT",
      "QUAL",
      "FILTER",
      "INFO"
    ];
    if (i.length < 8)
      throw new Error(`VCF header missing columns:
${a}`);
    if (s.length !== o.length || !s.every((l, c) => l === o[c]))
      throw new Error(`VCF column headers not correct:
${a}`);
    this.samples = i.slice(9);
  }
  parseSamples(e, n) {
    const r = {};
    if (e) {
      const a = n.split("	"), i = e.split(":"), s = i.map((o) => {
        const l = this.getMetadata("FORMAT", o, "Type");
        return l === "Integer" || l === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const l = this.samples[o];
        r[l] = {};
        const c = a[o].split(":");
        for (let u = 0; u < c.length; u++) {
          const h = c[u];
          r[l][i[u]] = h === "" || h === "." ? void 0 : h.split(",").map((p) => p === "." ? void 0 : s[u] ? +p : p);
        }
      }
    }
    return r;
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
    const [r, a] = n.slice(1, 3), i = r;
    if (a?.startsWith("<")) {
      i in this.metadata || (this.metadata[i] = {});
      const [s, o] = this.parseStructuredMetaVal(a);
      s ? this.metadata[i][s] = o : this.metadata[i] = o;
    } else
      this.metadata[i] = a;
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
    const n = Rp(e), r = n.ID;
    return delete n.ID, "Number" in n && (Number.isNaN(Number(n.Number)) || (n.Number = Number(n.Number))), [r, n];
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
    for (const r of e)
      if (n = n[r], !n)
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
    for (let I = 0; n < e.length && (e[n] === "	" && (I += 1), I !== 9); n += 1)
      ;
    const r = e.slice(0, n).split("	"), a = e.slice(n + 1), [i, s, o, l, c, u, h] = r, p = i, m = +s, T = o === "." ? void 0 : o.split(";"), O = l, R = c === "." ? void 0 : c.split(","), v = u === "." ? void 0 : +u, w = h === "." ? void 0 : h.split(";"), x = r[8];
    if (this.strict && !r[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const y = r[7]?.includes("%"), $ = r[7] === void 0 || r[7] === "." ? {} : Object.fromEntries(r[7].split(";").map((I) => {
      const [A, B] = I.split("="), P = B?.split(",").map((k) => k === "." ? void 0 : k).map((k) => k && y ? Mp(k) : k), z = this.getMetadata("INFO", A, "Type");
      return z === "Integer" || z === "Float" ? [
        A,
        P?.map((k) => k === void 0 ? void 0 : Number(k))
      ] : z === "Flag" ? [A, !0] : [A, P ?? !0];
    }));
    return {
      CHROM: p,
      POS: m,
      ALT: R,
      INFO: $,
      REF: O,
      FILTER: w && w.length === 1 && w[0] === "PASS" ? "PASS" : w,
      ID: T,
      QUAL: v,
      FORMAT: x,
      SAMPLES: () => this.parseSamples(r[8] ?? "", a),
      GENOTYPES: () => Ip(r[8] ?? "", a, this.samples)
    };
  }
}
function Lp(t) {
  const e = t.split(/[[\]]/);
  if (e.length > 1) {
    const n = t.includes("[") ? "right" : "left";
    let r, a, i;
    for (const s of e)
      s && (s.includes(":") ? (i = s, r = a ? "right" : "left") : a = s);
    if (!(i && r && a))
      throw new Error(`Invalid breakend: ${t}`);
    return { MatePosition: i, Join: r, Replacement: a, MateDirection: n };
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
      const r = n[2];
      return r ? {
        Join: "left",
        Replacement: r,
        MateDirection: "right",
        MatePosition: `<${n[1]}>:1`
      } : void 0;
    } else if (t.includes("<")) {
      const n = /(.*)<(.*)>/.exec(t);
      if (!n)
        throw new Error(`failed to parse ${t}`);
      const r = n[1];
      return r ? {
        Join: "right",
        Replacement: r,
        MateDirection: "right",
        MatePosition: `<${n[2]}>:1`
      } : void 0;
    }
  }
}
const Fp = {
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
function Op(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const r = /* @__PURE__ */ new Set();
  let a = /* @__PURE__ */ new Set();
  if (e.forEach((i) => {
    let [s, o] = Ao(i, n);
    s || ([s, o] = zp(t, i)), s && o && (r.add(s), a.add(o));
  }), a.size > 1) {
    const i = [...a], s = new Set(
      i.map((o) => {
        const l = o.split("->");
        return l[1] ? l[0] : o;
      }).filter((o) => !!o)
    );
    a = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const l = i.map((c) => c.split("->").map((u) => u.trim())).map((c) => c[1] && c[0] === o ? c[1] : "").filter((c) => !!c);
        return l.length ? `${o} -> ${l.join(",")}` : o;
      })
    );
  }
  return r.size ? [[...r].join(","), [...a].join(",")] : [];
}
function Ao(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = Fp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const r = t.split(":");
  return r.length > 1 ? Ao(`<${r.slice(0, -1).join(":")}>`, e) : [];
}
function zp(t, e) {
  if (Lp(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", Fe("SNV", t, e)];
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
    return t.split("").reverse().join("") === e ? ["inversion", Fe("inversion", t, e)] : ["substitution", Fe("substitution", t, e)];
  if (t.length <= e.length) {
    const r = e.length - t.length, a = r.toLocaleString("en-US");
    return [
      "insertion",
      r > 5 ? `${a}bp INS` : Fe("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const r = t.length - e.length, a = r.toLocaleString("en-US");
    return [
      "deletion",
      r > 5 ? `${a}bp DEL` : Fe("deletion", t, e)
    ];
  }
  return ["indel", Fe("indel", t, e)];
}
function Fe(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function Bp(t, e) {
  const { REF: n = "", ALT: r, POS: a, CHROM: i, ID: s } = t, o = a - 1, [l, c] = Op(n, r, e);
  return {
    refName: i,
    start: o,
    end: Pp(t),
    description: c,
    type: l,
    name: s?.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function Pp(t) {
  const { POS: e, REF: n = "", ALT: r } = t, a = r?.includes("<TRA>"), i = e - 1;
  if (r?.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !a)
      return +o.END[0];
  }
  return i + n.length;
}
class Hp {
  constructor(e) {
    this.variant = e.variant, this.parser = e.parser, this.data = Bp(this.variant, this.parser), this._id = e.id;
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
    const { SAMPLES: e, GENOTYPES: n, ...r } = this.variant;
    return {
      uniqueId: this._id,
      ...r,
      ...this.data,
      samples: this.variant.SAMPLES()
    };
  }
}
async function Kp({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: r
}) {
  const a = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), i = new Eo({
    tbiFilehandle: n === "TBI" ? new ae(a) : void 0,
    csiFilehandle: n === "CSI" ? new ae(a) : void 0,
    filehandle: new ae(t)
  }), s = new Cp({
    header: await i.getHeader()
  }), o = [];
  let l = 0;
  return await i.getLines(r.chromosome, r.start, r.end, {
    lineCallback: (c) => {
      const u = s.parseLine(c), h = new Hp({
        variant: u,
        parser: s,
        id: `${l++}`
      }), p = h.get("INFO");
      o.push({
        id: h.get("ID"),
        reference_allele: h.get("REF"),
        alternative_alleles: { values: h.get("ALT") },
        name: h.get("name"),
        seqId: h.get("refName"),
        fmin: h.get("start"),
        fmax: h.get("end"),
        strand: 1,
        source: "",
        type: Fa(p.soTerm[0]) ?? h.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([m, T]) => [
            m,
            {
              values: [JSON.stringify(T.map((O) => Fa(O)))]
            }
          ])
        )
      });
    }
  }), o;
}
function Fa(t) {
  return t?.replace(/['"]+/g, "");
}
var jt = {}, ue = {}, be = {}, Pt = {}, Oa;
function Un() {
  if (Oa) return Pt;
  Oa = 1, Object.defineProperty(Pt, "__esModule", { value: !0 }), Pt.unescape = t, Pt.escape = n, Pt.escapeColumn = r, Pt.parseAttributes = a, Pt.parseFeature = i, Pt.parseDirective = s, Pt.formatAttributes = o, Pt.formatFeature = u, Pt.formatDirective = h, Pt.formatComment = p, Pt.formatSequence = m, Pt.formatItem = O;
  function t(v) {
    return decodeURIComponent(v);
  }
  function e(v, w) {
    return String(w).replaceAll(v, (x) => encodeURIComponent(x).toUpperCase());
  }
  function n(v) {
    return e(/[\n;\r\t=%&,\u0000-\u001f\u007f]/g, v);
  }
  function r(v) {
    return e(/[\n\r\t%\u0000-\u001f\u007f]/g, v);
  }
  function a(v) {
    if (!v?.length || v === ".")
      return {};
    const w = {};
    return v.replace(/\r\n|[\r\n]$/, "").split(";").forEach((x) => {
      const y = x.split("=", 2);
      if (!y[1]?.length)
        return;
      y[0] = y[0].trim();
      let $ = w[y[0].trim()];
      $ || ($ = [], w[y[0]] = $), $.push(...y[1].split(",").map((I) => I.trim()).map(t));
    }), w;
  }
  function i(v) {
    const w = v.trim().split("	").map((y) => y === "." || y === "" ? null : y);
    return {
      seq_id: w[0] && t(w[0]),
      source: w[1] && t(w[1]),
      type: w[2] && t(w[2]),
      start: w[3] === null ? null : parseInt(w[3], 10),
      end: w[4] === null ? null : parseInt(w[4], 10),
      score: w[5] === null ? null : parseFloat(w[5]),
      strand: w[6],
      phase: w[7],
      attributes: w[8] === null ? null : a(w[8])
    };
  }
  function s(v) {
    const w = /^\s*##\s*(\S+)\s*(.*)/.exec(v);
    if (!w)
      return null;
    const [, x] = w;
    let [, , y] = w;
    const $ = { directive: x };
    if (y.length && (y = y.replace(/\r\n|[\r\n]$/, ""), $.value = y), x === "sequence-region") {
      const I = y.split(/\s+/, 3);
      return {
        ...$,
        seq_id: I[0],
        start: I[1]?.replaceAll(/\D/g, ""),
        end: I[2]?.replaceAll(/\D/g, "")
      };
    } else if (x === "genome-build") {
      const [I, A] = y.split(/\s+/, 2);
      return {
        ...$,
        source: I,
        buildName: A
      };
    }
    return $;
  }
  function o(v) {
    const w = [];
    return Object.entries(v).forEach(([x, y]) => {
      const $ = y.map(n).join(",");
      w.push(`${n(x)}=${$}`);
    }), w.length ? w.join(";") : ".";
  }
  function l(v, w) {
    const x = v.attributes === null || v.attributes === void 0 ? "." : o(v.attributes), $ = `${[
      v.seq_id === null ? "." : r(v.seq_id),
      v.source === null ? "." : r(v.source),
      v.type === null ? "." : r(v.type),
      v.start === null ? "." : r(v.start),
      v.end === null ? "." : r(v.end),
      v.score === null ? "." : r(v.score),
      v.strand === null ? "." : r(v.strand),
      v.phase === null ? "." : r(v.phase),
      x
    ].join("	")}
`;
    return w[$] ? "" : (w[$] = !0, $);
  }
  function c(v, w) {
    if (Array.isArray(v))
      return v.map((y) => c(y, w)).join("");
    const x = [l(v, w)];
    return R(v) && x.push(...v.child_features.map((y) => c(y, w)), ...v.derived_features.map((y) => c(y, w))), x.join("");
  }
  function u(v) {
    return c(v, {});
  }
  function h(v) {
    let w = `##${v.directive}`;
    return v.value && (w += ` ${v.value}`), w += `
`, w;
  }
  function p(v) {
    return `# ${v.comment}
`;
  }
  function m(v) {
    const w = `>${v.id}${v.description ? ` ${v.description}` : ""}
`, x = 80, y = Math.ceil(v.sequence.length / x), $ = new Array(y);
    for (let I = 0; I < y; I += 1) {
      const A = I * x;
      $[I] = v.sequence.slice(A, A + x);
    }
    return `${w}${$.join(`
`)}
`;
  }
  function T(v) {
    return "attributes" in v ? u(v) : "directive" in v ? h(v) : "sequence" in v ? m(v) : "comment" in v ? p(v) : `# (invalid item found during format)
`;
  }
  function O(v) {
    return Array.isArray(v) ? v.map(T) : T(v);
  }
  function R(v) {
    return v.child_features !== void 0 && v.derived_features !== void 0;
  }
  return Pt;
}
var za;
function Vp() {
  if (za) return be;
  za = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.GFF3Parser = be.FASTAParser = void 0;
  const t = Un(), e = {
    Parent: "child_features",
    Derives_from: "derived_features"
  };
  class n {
    seqCallback;
    currentSequence;
    constructor(i = () => {
    }) {
      this.seqCallback = i, this.currentSequence = void 0;
    }
    addLine(i) {
      const s = /^>\s*(\S+)\s*(.*)/.exec(i);
      s ? (this.flush(), this.currentSequence = { id: s[1], sequence: "" }, s[2] && (this.currentSequence.description = s[2].trim())) : this.currentSequence && /\S/.test(i) && (this.currentSequence.sequence += i.replaceAll(/\s/g, ""));
    }
    flush() {
      this.currentSequence && this.seqCallback(this.currentSequence);
    }
    finish() {
      this.flush();
    }
  }
  be.FASTAParser = n;
  class r {
    endCallback;
    disableDerivesFromReferences;
    bufferSize;
    fastaParser = void 0;
    // if this is true, the parser ignores the  rest of the lines in the file.
    // currently set when the file switches over to FASTA
    eof = !1;
    lineNumber = 0;
    // features that we have to keep on hand for now because they might be
    // referenced by something else
    underConstructionTopLevel = [];
    // index of the above by ID
    underConstructionById = {};
    completedReferences = {};
    // features that reference something we have not seen yet. structured as:
    // {  'some_id' : {
    //     'Parent' : [ orphans that have a Parent attr referencing it ],
    //     'Derives_from' : [ orphans that have a Derives_from attr referencing it ],
    //    }
    // }
    underConstructionOrphans = /* @__PURE__ */ new Map();
    constructor(i) {
      const s = () => {
      };
      this.endCallback = i.endCallback || s, this.disableDerivesFromReferences = i.disableDerivesFromReferences || !1, this.bufferSize = i.bufferSize === void 0 ? 1 / 0 : i.bufferSize;
    }
    addLine(i, s) {
      if (this.fastaParser) {
        this.fastaParser.addLine(i);
        return;
      }
      if (this.eof)
        return;
      if (this.lineNumber += 1, /^\s*[^#\s>]/.test(i)) {
        this.bufferLine(i, s);
        return;
      }
      const o = /^\s*(#+)(.*)/.exec(i);
      if (o) {
        const [, l] = o;
        let [, , c] = o;
        if (l.length === 3)
          this.emitAllUnderConstructionFeatures(s);
        else if (l.length === 2) {
          const u = (0, t.parseDirective)(i);
          u && (u.directive === "FASTA" ? (this.emitAllUnderConstructionFeatures(s), this.eof = !0, this.fastaParser = new n(s.sequenceCallback)) : this.emitItem(u, s));
        } else
          c = c.replace(/\s*/, ""), this.emitItem({ comment: c }, s);
      } else if (!/^\s*$/.test(i)) if (/^\s*>/.test(i))
        this.emitAllUnderConstructionFeatures(s), this.eof = !0, this.fastaParser = new n(s.sequenceCallback), this.fastaParser.addLine(i);
      else {
        const l = i.replaceAll(/\r\n|[\r\n]$/g, "");
        this.parseError(`GFF3 parse error. Cannot parse '${l}'.`, s);
      }
    }
    finish(i) {
      this.emitAllUnderConstructionFeatures(i), this.fastaParser && this.fastaParser.finish(), this.endCallback();
    }
    emitItem(i, s) {
      Array.isArray(i) && s.featureCallback ? s.featureCallback(i) : "directive" in i && s.directiveCallback ? s.directiveCallback(i) : "comment" in i && s.commentCallback && s.commentCallback(i);
    }
    enforceBufferSizeLimit(i = 0, s) {
      const o = (l) => {
        l && Array.isArray(l) && l[0].attributes?.ID?.[0] && (l[0].attributes.ID.forEach((u) => {
          delete this.underConstructionById[u], delete this.completedReferences[u];
        }), l.forEach((u) => {
          u.child_features && u.child_features.forEach((h) => o(h)), u.derived_features && u.derived_features.forEach((h) => o(h));
        }));
      };
      for (; this.underConstructionTopLevel.length + i > this.bufferSize; ) {
        const l = this.underConstructionTopLevel.shift();
        l && (this.emitItem(l, s), o(l));
      }
    }
    /**
     * return all under-construction features, called when we know there will be
     * no additional data to attach to them
     */
    emitAllUnderConstructionFeatures(i) {
      this.underConstructionTopLevel.forEach((s) => this.emitItem.bind(this)(s, i)), this.underConstructionTopLevel = [], this.underConstructionById = {}, this.completedReferences = {}, this.underConstructionOrphans.size && this.parseError(`some features reference other features that do not exist in the file (or in the same '###' scope). ${Array.from(this.underConstructionOrphans.keys()).join(",")}`, i);
    }
    // do the right thing with a newly-parsed feature line
    bufferLine(i, s) {
      const l = {
        ...(0, t.parseFeature)(i),
        child_features: [],
        derived_features: []
      }, c = l.attributes?.ID || [], u = l.attributes?.Parent || [], h = this.disableDerivesFromReferences ? [] : l.attributes?.Derives_from || [];
      if (!c.length && !u.length && !h.length) {
        this.emitItem([l], s);
        return;
      }
      let p;
      c.forEach((m) => {
        const T = this.underConstructionById[m];
        T ? (T[T.length - 1].type !== l.type && this.parseError(`multi-line feature "${m}" has inconsistent types: "${l.type}", "${T[T.length - 1].type}"`, s), T.push(l), p = T) : (p = [l], this.enforceBufferSizeLimit(1, s), !u.length && !h.length && this.underConstructionTopLevel.push(p), this.underConstructionById[m] = p, this.resolveReferencesTo(p, m));
      }), this.resolveReferencesFrom(p || [l], { Parent: u, Derives_from: h }, c);
    }
    resolveReferencesTo(i, s) {
      const o = this.underConstructionOrphans.get(s);
      o && (i.forEach((l) => {
        l.child_features.push(...o.Parent);
      }), i.forEach((l) => {
        l.derived_features.push(...o.Derives_from);
      }), this.underConstructionOrphans.delete(s));
    }
    parseError(i, s) {
      this.eof = !0, s.errorCallback?.(`${this.lineNumber}: ${i}`);
    }
    // this is all a bit more awkward in javascript than it was in perl
    postSet(i, s, o) {
      let l = i[s];
      l || (l = {}, i[s] = l);
      const c = l[o] || !1;
      return l[o] = !0, c;
    }
    resolveReferencesFrom(i, s, o) {
      s.Parent.forEach((l) => {
        const c = this.underConstructionById[l];
        if (c) {
          const u = e.Parent;
          o.filter((h) => this.postSet(this.completedReferences, h, `Parent,${l}`)).length || c.forEach((h) => {
            h[u].push(i);
          });
        } else {
          let u = this.underConstructionOrphans.get(l);
          u || (u = {
            Parent: [],
            Derives_from: []
          }, this.underConstructionOrphans.set(l, u)), u.Parent.push(i);
        }
      }), s.Derives_from.forEach((l) => {
        const c = this.underConstructionById[l];
        if (c) {
          const u = e.Derives_from;
          o.filter((h) => this.postSet(this.completedReferences, h, `Derives_from,${l}`)).length || c.forEach((h) => {
            h[u].push(i);
          });
        } else {
          let u = this.underConstructionOrphans.get(l);
          u || (u = {
            Parent: [],
            Derives_from: []
          }, this.underConstructionOrphans.set(l, u)), u.Derives_from.push(i);
        }
      });
    }
  }
  return be.GFF3Parser = r, be;
}
var Ba;
function Pa() {
  if (Ba) return ue;
  Ba = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.GFFFormattingTransformer = ue.GFFTransformer = void 0, ue.parseStringSync = a, ue.formatSync = i;
  const t = Vp(), e = Un();
  function n(o) {
    return {
      parseFeatures: !0,
      parseDirectives: !1,
      parseSequences: !0,
      parseComments: !1,
      bufferSize: 1 / 0,
      disableDerivesFromReferences: !1,
      errorCallback: (c) => {
        throw new Error(c);
      },
      ...o
    };
  }
  class r {
    decoder;
    parser;
    lastString = "";
    parseFeatures;
    parseDirectives;
    parseComments;
    parseSequences;
    /**
     * Options for how the text stream is parsed
     * @param options - Parser options
     */
    constructor(l) {
      this.decoder = new TextDecoder();
      const c = n(l ?? {}), { bufferSize: u, disableDerivesFromReferences: h } = c;
      this.parser = new t.GFF3Parser({ bufferSize: u, disableDerivesFromReferences: h }), this.parseFeatures = c.parseFeatures, this.parseDirectives = c.parseDirectives, this.parseComments = c.parseComments, this.parseSequences = c.parseSequences, this.errorCallback = l?.errorCallback;
    }
    makeCallbacks(l) {
      const c = {
        errorCallback: this.emitErrorMessage.bind(this, l)
      };
      return this.parseFeatures && (c.featureCallback = (u) => {
        l.enqueue(u);
      }), this.parseDirectives && (c.directiveCallback = (u) => {
        l.enqueue(u);
      }), this.parseComments && (c.commentCallback = (u) => {
        l.enqueue(u);
      }), this.parseSequences && (c.sequenceCallback = (u) => {
        l.enqueue(u);
      }), c;
    }
    emitErrorMessage(l, c) {
      this.errorCallback ? this.errorCallback(c) : l.error(c);
    }
    transform(l, c) {
      const h = `${this.lastString}${this.decoder.decode(l, {
        stream: !0
      })}`.split(/\r\n|[\r\n]/g);
      this.lastString = h.pop() || "";
      for (const p of h)
        this.parser.addLine(p, this.makeCallbacks(c));
    }
    flush(l) {
      const c = this.makeCallbacks(l);
      this.lastString = `${this.lastString}${this.decoder.decode()}`, this.lastString && (this.parser.addLine(this.lastString, c), this.lastString = ""), this.parser.finish(c);
    }
  }
  ue.GFFTransformer = r;
  function a(o, l) {
    if (!o)
      return [];
    const c = n(l ?? {}), u = [], h = u.push.bind(u), p = {
      errorCallback: c.errorCallback
    };
    c.parseFeatures && (p.featureCallback = h), c.parseDirectives && (p.directiveCallback = h), c.parseComments && (p.commentCallback = h), c.parseSequences && (p.sequenceCallback = h);
    const m = new t.GFF3Parser({
      disableDerivesFromReferences: c.disableDerivesFromReferences || !1,
      bufferSize: 1 / 0
    });
    return o.split(/\r\n|[\r\n]/).forEach((T) => m.addLine.bind(m)(T, p)), m.finish(p), u;
  }
  function i(o) {
    const l = [], c = [];
    o.forEach((h) => {
      "sequence" in h ? c.push(h) : l.push(h);
    });
    let u = l.map((h) => Array.isArray(h) ? (0, e.formatItem)(h).join("") : (0, e.formatItem)(h)).join("");
    return c.length && (u += `##FASTA
`, u += c.map(e.formatSequence).join("")), u;
  }
  class s {
    linesSinceLastSyncMark = 0;
    haveWeEmittedData = !1;
    fastaMode = !1;
    minLinesBetweenSyncMarks;
    insertVersionDirective;
    /**
     * Options for how the output text stream is formatted
     * @param options - Formatter options
     */
    constructor(l = {}) {
      this.minLinesBetweenSyncMarks = l.minSyncLines || 100, this.insertVersionDirective = l.insertVersionDirective !== !1;
    }
    transform(l, c) {
      !this.haveWeEmittedData && this.insertVersionDirective && (!("directive" in l) || "directive" in l && l.directive !== "gff-version") && c.enqueue(`##gff-version 3
`), "sequence" in l && !this.fastaMode && (c.enqueue(`##FASTA
`), this.fastaMode = !0);
      const u = Array.isArray(l) ? l.map((h) => (0, e.formatItem)(h)).join("") : (0, e.formatItem)(l);
      if (c.enqueue(u), this.linesSinceLastSyncMark >= this.minLinesBetweenSyncMarks)
        c.enqueue(`###
`), this.linesSinceLastSyncMark = 0;
      else {
        let h = 0;
        for (let p = 0; p < u.length; p += 1)
          u[p] === `
` && (h += 1);
        this.linesSinceLastSyncMark += h;
      }
      this.haveWeEmittedData = !0;
    }
  }
  return ue.GFFFormattingTransformer = s, ue;
}
var Ha;
function qp() {
  return Ha || (Ha = 1, function(t) {
    var e = jt && jt.__createBinding || (Object.create ? function(o, l, c, u) {
      u === void 0 && (u = c);
      var h = Object.getOwnPropertyDescriptor(l, c);
      (!h || ("get" in h ? !l.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
        return l[c];
      } }), Object.defineProperty(o, u, h);
    } : function(o, l, c, u) {
      u === void 0 && (u = c), o[u] = l[c];
    }), n = jt && jt.__setModuleDefault || (Object.create ? function(o, l) {
      Object.defineProperty(o, "default", { enumerable: !0, value: l });
    } : function(o, l) {
      o.default = l;
    }), r = jt && jt.__importStar || /* @__PURE__ */ function() {
      var o = function(l) {
        return o = Object.getOwnPropertyNames || function(c) {
          var u = [];
          for (var h in c) Object.prototype.hasOwnProperty.call(c, h) && (u[u.length] = h);
          return u;
        }, o(l);
      };
      return function(l) {
        if (l && l.__esModule) return l;
        var c = {};
        if (l != null) for (var u = o(l), h = 0; h < u.length; h++) u[h] !== "default" && e(c, l, u[h]);
        return n(c, l), c;
      };
    }(), a = jt && jt.__exportStar || function(o, l) {
      for (var c in o) c !== "default" && !Object.prototype.hasOwnProperty.call(l, c) && e(l, o, c);
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.util = t.defaultExport = void 0;
    const i = r(Pa());
    a(Pa(), t);
    const s = r(Un());
    t.defaultExport = {
      ...i,
      util: s
    }, t.default = t.defaultExport, t.util = r(Un());
  }(jt)), jt;
}
var Up = qp();
const Gp = /* @__PURE__ */ Kn(Up);
function Zp(t) {
  return t === "+" ? 1 : t === "-" ? -1 : 0;
}
function Va(t, e) {
  return t?.[e]?.[0];
}
function $o(t) {
  const e = Va(t.attributes, "ID") ?? `${t.seq_id}:${t.start}..${t.end}:${t.type}`;
  return {
    id: e,
    seqId: t.seq_id ?? "",
    fmin: (t.start ?? 1) - 1,
    fmax: t.end ?? 0,
    strand: Zp(t.strand),
    type: t.type ?? "",
    source: t.source ?? "",
    name: Va(t.attributes, "Name") ?? e,
    children: t.child_features.flatMap(
      (n) => n.map($o)
    )
  };
}
async function Yp({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: r
}) {
  const a = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), i = new Eo({
    tbiFilehandle: n === "TBI" ? new ae(a) : void 0,
    csiFilehandle: n === "CSI" ? new ae(a) : void 0,
    filehandle: new ae(t)
  }), s = [];
  return await i.getLines(r.chromosome, r.start, r.end, {
    lineCallback: (l) => {
      s.push(l);
    }
  }), Gp.parseStringSync(s.join(`
`), {
    parseSequences: !1,
    // The queried region can cut through features whose parent line falls
    // outside the window (e.g. a neighboring gene); ignore unresolved
    // Parent/Derives_from references instead of throwing.
    errorCallback: () => {
    }
  }).map((l) => $o(l[0]));
}
function Jp(t) {
  const [e, n] = t.split(":"), [r, a] = n.split("..");
  return {
    chromosome: e,
    start: +r,
    end: +a
  };
}
Ne.prototype.first = function() {
  return ht(this.nodes()[0]);
};
Ne.prototype.last = function() {
  return ht(this.nodes()[this.size() - 1]);
};
class Qp {
  constructor(e, n, r, a) {
    this.height = a, this.width = r, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Ku();
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
    const r = ht(n);
    r.selectAll(".highlight").remove(), r.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((a) => a.selected === "true").style("stroke", null).datum((a) => (a.selected = "false", a)), ti(e, r);
  }
  _initViewer(e) {
    ht(e).selectAll("*").remove();
    const n = ht(e), a = `${e.replace("#", "")} main-view`, i = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${i.left},${i.top})`).attr("class", a), this.width = this.width - i.left - i.right, this.height = this.height - i.top - i.bottom, ht(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? Vu, r = this.config.variantTypes ?? qu, a = this.config.binRatio ?? 0.01, i = this.config.region, s = this._configureRange(
      i.start,
      i.end,
      e
    ), o = s.range, l = i.chromosome, c = this.config.variantFilter, u = this.config.isoformFilter ?? [], h = this.config.htpVariant ?? "", p = s.start, m = s.end;
    new th({
      viewer: this.viewer,
      track: {
        chromosome: l,
        start: p,
        end: m,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let R = 100;
    const v = this.config.showVariantLabel ?? !0, { viewer: w, genome: x, height: y, tracks: $ } = this;
    if (!$ || !Array.isArray($))
      throw new Error(`Tracks must be an array, got: ${typeof $}`);
    $.map((I) => {
      const { variantData: A, trackData: B } = I;
      if (I.type === Ze.ISOFORM_AND_VARIANT) {
        const P = new Ju({
          viewer: w,
          height: y,
          width: e,
          transcriptTypes: n,
          variantTypes: r,
          showVariantLabel: v,
          trackData: B,
          variantData: A,
          variantFilter: c,
          binRatio: a,
          isoformFilter: u,
          geneBounds: I.geneBounds,
          geneSymbol: I.geneSymbol,
          geneId: I.geneId,
          speciesTaxonId: I.speciesTaxonId
          // Pass species taxon ID
        });
        R += P.DrawTrack();
      } else if (I.type === Ze.ISOFORM_EMBEDDED_VARIANT) {
        const P = new Qu({
          viewer: w,
          height: y,
          width: e,
          transcriptTypes: n,
          variantData: A,
          trackData: B,
          variantTypes: r,
          showVariantLabel: v,
          variantFilter: c
        });
        R += P.DrawTrack();
      } else if (I.type === Ze.ISOFORM) {
        const P = new ju({
          region: i,
          viewer: w,
          height: y,
          width: e,
          genome: x,
          trackData: B,
          transcriptTypes: n,
          htpVariant: h,
          geneBounds: I.geneBounds,
          geneSymbol: I.geneSymbol,
          geneId: I.geneId
        });
        R += P.DrawTrack();
      } else I.type === Ze.VARIANT ? new Sd({
        region: i,
        viewer: w,
        range: o,
        height: y,
        width: e
      }).DrawTrack() : I.type === Ze.VARIANT_GLOBAL ? new Td({
        region: i,
        viewer: w,
        track: {
          ...I,
          range: o
        },
        height: y,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${I.type}`);
      ht(this.svg_target).attr("height", R);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, r) {
    let a = null;
    const i = 17;
    let s = 0, o = [0, 0];
    if (e === n) {
      a = 300, s = i * a, e = e - a / 2 - 1, n = n + a / 2;
      const l = (
        // @ts-expect-error
        ht("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        l - s / 2,
        l + s / 2
      ];
    } else
      return {
        range: [0, r],
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
  Qp as GenomeFeatureViewer,
  Xp as fetchApolloAPIData,
  Wp as fetchNCListData,
  Yp as fetchTabixGffData,
  Kp as fetchTabixVcfData,
  Jp as parseLocString
};
