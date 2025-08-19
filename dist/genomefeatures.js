function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ho(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oa(t) {
  let e, n, i;
  t.length !== 2 ? (e = vn, n = (o, c) => vn(t(o), c), i = (o, c) => t(o) - c) : (e = t === vn || t === ho ? t : po, n = t, i = t);
  function r(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const g = f + u >>> 1;
        n(o[g], c) < 0 ? f = g + 1 : u = g;
      } while (f < u);
    }
    return f;
  }
  function a(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const g = f + u >>> 1;
        n(o[g], c) <= 0 ? f = g + 1 : u = g;
      } while (f < u);
    }
    return f;
  }
  function s(o, c, f = 0, u = o.length) {
    const g = r(o, c, f, u - 1);
    return g > f && i(o[g - 1], c) > -i(o[g], c) ? g - 1 : g;
  }
  return { left: r, center: s, right: a };
}
function po() {
  return 0;
}
function _o(t) {
  return t === null ? NaN : +t;
}
const go = Oa(vn), mo = go.right;
Oa(_o).center;
const vo = Math.sqrt(50), wo = Math.sqrt(10), yo = Math.sqrt(2);
function En(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= vo ? 10 : a >= wo ? 5 : a >= yo ? 2 : 1;
  let o, c, f;
  return r < 0 ? (f = Math.pow(10, -r) / s, o = Math.round(t * f), c = Math.round(e * f), o / f < t && ++o, c / f > e && --c, f = -f) : (f = Math.pow(10, r) * s, o = Math.round(t / f), c = Math.round(e / f), o * f < t && ++o, c * f > e && --c), c < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, c, f];
}
function bo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, a, s] = i ? En(e, t, n) : En(t, e, n);
  if (!(a >= r)) return [];
  const o = a - r + 1, c = new Array(o);
  if (i)
    if (s < 0) for (let f = 0; f < o; ++f) c[f] = (a - f) / -s;
    else for (let f = 0; f < o; ++f) c[f] = (a - f) * s;
  else if (s < 0) for (let f = 0; f < o; ++f) c[f] = (r + f) / -s;
  else for (let f = 0; f < o; ++f) c[f] = (r + f) * s;
  return c;
}
function gi(t, e, n) {
  return e = +e, t = +t, n = +n, En(t, e, n)[2];
}
function xo(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? gi(e, t, n) : gi(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function ko(t) {
  return t;
}
var wn = 1, Gn = 2, mi = 3, an = 4, or = 1e-6;
function To(t) {
  return "translate(" + t + ",0)";
}
function Eo(t) {
  return "translate(0," + t + ")";
}
function So(t) {
  return (e) => +t(e);
}
function Ao(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function $o() {
  return !this.__axis;
}
function Ca(t, e) {
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === wn || t === an ? -1 : 1, u = t === an || t === Gn ? "x" : "y", g = t === wn || t === mi ? To : Eo;
  function p(d) {
    var T = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), H = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ko), N = Math.max(a, 0) + o, S = e.range(), k = +S[0] + c, b = +S[S.length - 1] + c, x = (e.bandwidth ? Ao : So)(e.copy(), c), A = d.selection ? d.selection() : d, $ = A.selectAll(".domain").data([null]), E = A.selectAll(".tick").data(T, e).order(), B = E.exit(), F = E.enter().append("g").attr("class", "tick"), C = E.select("line"), y = E.select("text");
    $ = $.merge($.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), E = E.merge(F), C = C.merge(F.append("line").attr("stroke", "currentColor").attr(u + "2", f * a)), y = y.merge(F.append("text").attr("fill", "currentColor").attr(u, f * N).attr("dy", t === wn ? "0em" : t === mi ? "0.71em" : "0.32em")), d !== A && ($ = $.transition(d), E = E.transition(d), C = C.transition(d), y = y.transition(d), B = B.transition(d).attr("opacity", or).attr("transform", function(U) {
      return isFinite(U = x(U)) ? g(U + c) : this.getAttribute("transform");
    }), F.attr("opacity", or).attr("transform", function(U) {
      var P = this.parentNode.__axis;
      return g((P && isFinite(P = P(U)) ? P : x(U)) + c);
    })), B.remove(), $.attr("d", t === an || t === Gn ? s ? "M" + f * s + "," + k + "H" + c + "V" + b + "H" + f * s : "M" + c + "," + k + "V" + b : s ? "M" + k + "," + f * s + "V" + c + "H" + b + "V" + f * s : "M" + k + "," + c + "H" + b), E.attr("opacity", 1).attr("transform", function(U) {
      return g(x(U) + c);
    }), C.attr(u + "2", f * a), y.attr(u, f * N).text(H), A.filter($o).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Gn ? "start" : t === an ? "end" : "middle"), A.each(function() {
      this.__axis = x;
    });
  }
  return p.scale = function(d) {
    return arguments.length ? (e = d, p) : e;
  }, p.ticks = function() {
    return n = Array.from(arguments), p;
  }, p.tickArguments = function(d) {
    return arguments.length ? (n = d == null ? [] : Array.from(d), p) : n.slice();
  }, p.tickValues = function(d) {
    return arguments.length ? (i = d == null ? null : Array.from(d), p) : i && i.slice();
  }, p.tickFormat = function(d) {
    return arguments.length ? (r = d, p) : r;
  }, p.tickSize = function(d) {
    return arguments.length ? (a = s = +d, p) : a;
  }, p.tickSizeInner = function(d) {
    return arguments.length ? (a = +d, p) : a;
  }, p.tickSizeOuter = function(d) {
    return arguments.length ? (s = +d, p) : s;
  }, p.tickPadding = function(d) {
    return arguments.length ? (o = +d, p) : o;
  }, p.offset = function(d) {
    return arguments.length ? (c = +d, p) : c;
  }, p;
}
function lr(t) {
  return Ca(wn, t);
}
function No(t) {
  return Ca(mi, t);
}
var Io = { value: () => {
} };
function Fa() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new yn(n);
}
function yn(t) {
  this._ = t;
}
function Do(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
yn.prototype = Fa.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, i = Do(t + "", n), r, a = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((r = (t = i[a]).type) && (r = Ro(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (r = (t = i[a]).type) n[r] = cr(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = cr(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new yn(t);
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
function Ro(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function cr(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Io, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var vi = "http://www.w3.org/1999/xhtml";
const fr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), fr.hasOwnProperty(e) ? { space: fr[e], local: t } : t;
}
function Mo(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === vi && e.documentElement.namespaceURI === vi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Lo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function za(t) {
  var e = Hn(t);
  return (e.local ? Lo : Mo)(e);
}
function Oo() {
}
function zi(t) {
  return t == null ? Oo : function() {
    return this.querySelector(t);
  };
}
function Co(t) {
  typeof t != "function" && (t = zi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
  return new Vt(i, this._parents);
}
function Ba(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Fo() {
  return [];
}
function Ha(t) {
  return t == null ? Fo : function() {
    return this.querySelectorAll(t);
  };
}
function zo(t) {
  return function() {
    return Ba(t.apply(this, arguments));
  };
}
function Bo(t) {
  typeof t == "function" ? t = zo(t) : t = Ha(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new Vt(i, r);
}
function Pa(t) {
  return function() {
    return this.matches(t);
  };
}
function Va(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ho = Array.prototype.find;
function Po(t) {
  return function() {
    return Ho.call(this.children, t);
  };
}
function Vo() {
  return this.firstElementChild;
}
function Uo(t) {
  return this.select(t == null ? Vo : Po(typeof t == "function" ? t : Va(t)));
}
var Zo = Array.prototype.filter;
function qo() {
  return Array.from(this.children);
}
function Go(t) {
  return function() {
    return Zo.call(this.children, t);
  };
}
function Wo(t) {
  return this.selectAll(t == null ? qo : Go(typeof t == "function" ? t : Va(t)));
}
function Xo(t) {
  typeof t != "function" && (t = Pa(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Vt(i, this._parents);
}
function Ua(t) {
  return new Array(t.length);
}
function Yo() {
  return new Vt(this._enter || this._groups.map(Ua), this._parents);
}
function Sn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Sn.prototype = {
  constructor: Sn,
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
function Jo(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Sn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Qo(t, e, n, i, r, a, s) {
  var o, c, f = /* @__PURE__ */ new Map(), u = e.length, g = a.length, p = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = d = s.call(c, c.__data__, o, e) + "", f.has(d) ? r[o] = c : f.set(d, c));
  for (o = 0; o < g; ++o)
    d = s.call(t, a[o], o, a) + "", (c = f.get(d)) ? (i[o] = c, c.__data__ = a[o], f.delete(d)) : n[o] = new Sn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f.get(p[o]) === c && (r[o] = c);
}
function jo(t) {
  return t.__data__;
}
function tl(t, e) {
  if (!arguments.length) return Array.from(this, jo);
  var n = e ? Qo : Jo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], g = r[f], p = g.length, d = el(t.call(u, u && u.__data__, f, i)), T = d.length, H = o[f] = new Array(T), N = s[f] = new Array(T), S = c[f] = new Array(p);
    n(u, g, H, N, S, d, e);
    for (var k = 0, b = 0, x, A; k < T; ++k)
      if (x = H[k]) {
        for (k >= b && (b = k + 1); !(A = N[b]) && ++b < T; ) ;
        x._next = A || null;
      }
  }
  return s = new Vt(s, i), s._enter = o, s._exit = c, s;
}
function el(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function nl() {
  return new Vt(this._exit || this._groups.map(Ua), this._parents);
}
function il(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function rl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), c = 0; c < s; ++c)
    for (var f = n[c], u = i[c], g = f.length, p = o[c] = new Array(g), d, T = 0; T < g; ++T)
      (d = f[T] || u[T]) && (p[T] = d);
  for (; c < r; ++c)
    o[c] = n[c];
  return new Vt(o, this._parents);
}
function al() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function sl(t) {
  t || (t = ol);
  function e(g, p) {
    return g && p ? t(g.__data__, p.__data__) : !g - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
  }
  return new Vt(r, this._parents).order();
}
function ol(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ll() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function cl() {
  return Array.from(this);
}
function fl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function ul() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function hl() {
  return !this.node();
}
function dl(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function pl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function _l(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function gl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ml(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function vl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function wl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function yl(t, e) {
  var n = Hn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? _l : pl : typeof e == "function" ? n.local ? wl : vl : n.local ? ml : gl)(n, e));
}
function Za(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function bl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function kl(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Tl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? bl : typeof e == "function" ? kl : xl)(t, e, n ?? "")) : Oe(this.node(), t);
}
function Oe(t, e) {
  return t.style.getPropertyValue(e) || Za(t).getComputedStyle(t, null).getPropertyValue(e);
}
function El(t) {
  return function() {
    delete this[t];
  };
}
function Sl(t, e) {
  return function() {
    this[t] = e;
  };
}
function Al(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function $l(t, e) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? Al : Sl)(t, e)) : this.node()[t];
}
function qa(t) {
  return t.trim().split(/^|\s+/);
}
function Bi(t) {
  return t.classList || new Ga(t);
}
function Ga(t) {
  this._node = t, this._names = qa(t.getAttribute("class") || "");
}
Ga.prototype = {
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
function Wa(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Xa(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Nl(t) {
  return function() {
    Wa(this, t);
  };
}
function Il(t) {
  return function() {
    Xa(this, t);
  };
}
function Dl(t, e) {
  return function() {
    (e.apply(this, arguments) ? Wa : Xa)(this, t);
  };
}
function Rl(t, e) {
  var n = qa(t + "");
  if (arguments.length < 2) {
    for (var i = Bi(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Dl : e ? Nl : Il)(n, e));
}
function Ml() {
  this.textContent = "";
}
function Ll(t) {
  return function() {
    this.textContent = t;
  };
}
function Ol(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Cl(t) {
  return arguments.length ? this.each(t == null ? Ml : (typeof t == "function" ? Ol : Ll)(t)) : this.node().textContent;
}
function Fl() {
  this.innerHTML = "";
}
function zl(t) {
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
function Hl(t) {
  return arguments.length ? this.each(t == null ? Fl : (typeof t == "function" ? Bl : zl)(t)) : this.node().innerHTML;
}
function Pl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vl() {
  return this.each(Pl);
}
function Ul() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Zl() {
  return this.each(Ul);
}
function ql(t) {
  var e = typeof t == "function" ? t : za(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Gl() {
  return null;
}
function Wl(t, e) {
  var n = typeof t == "function" ? t : za(t), i = e == null ? Gl : typeof e == "function" ? e : zi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Xl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yl() {
  return this.each(Xl);
}
function Kl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Jl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ql(t) {
  return this.select(t ? Jl : Kl);
}
function jl(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function tc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ec(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function nc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function ic(t, e, n) {
  return function() {
    var i = this.__on, r, a = tc(e);
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
function rc(t, e, n) {
  var i = ec(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, u; c < f; ++c)
        for (r = 0, u = o[c]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? ic : nc, r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ya(t, e, n) {
  var i = Za(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ac(t, e) {
  return function() {
    return Ya(this, t, e);
  };
}
function sc(t, e) {
  return function() {
    return Ya(this, t, e.apply(this, arguments));
  };
}
function oc(t, e) {
  return this.each((typeof e == "function" ? sc : ac)(t, e));
}
function* lc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length, s; r < a; ++r)
      (s = i[r]) && (yield s);
}
var Hi = [null];
function Vt(t, e) {
  this._groups = t, this._parents = e;
}
function Se() {
  return new Vt([[document.documentElement]], Hi);
}
function cc() {
  return this;
}
Vt.prototype = Se.prototype = {
  constructor: Vt,
  select: Co,
  selectAll: Bo,
  selectChild: Uo,
  selectChildren: Wo,
  filter: Xo,
  data: tl,
  enter: Yo,
  exit: nl,
  join: il,
  merge: rl,
  selection: cc,
  order: al,
  sort: sl,
  call: ll,
  nodes: cl,
  node: fl,
  size: ul,
  empty: hl,
  each: dl,
  attr: yl,
  style: Tl,
  property: $l,
  classed: Rl,
  text: Cl,
  html: Hl,
  raise: Vl,
  lower: Zl,
  append: ql,
  insert: Wl,
  remove: Yl,
  clone: Ql,
  datum: jl,
  on: rc,
  dispatch: oc,
  [Symbol.iterator]: lc
};
function At(t) {
  return typeof t == "string" ? new Vt([[document.querySelector(t)]], [document.documentElement]) : new Vt([[t]], Hi);
}
function Jt(t) {
  return typeof t == "string" ? new Vt([document.querySelectorAll(t)], [document.documentElement]) : new Vt([Ba(t)], Hi);
}
function Pi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ka(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function en() {
}
var Ye = 0.7, An = 1 / Ye, Me = "\\s*([+-]?\\d+)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ie = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fc = /^#([0-9a-f]{3,8})$/, uc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), hc = new RegExp(`^rgb\\(${ie},${ie},${ie}\\)$`), dc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ke}\\)$`), pc = new RegExp(`^rgba\\(${ie},${ie},${ie},${Ke}\\)$`), _c = new RegExp(`^hsl\\(${Ke},${ie},${ie}\\)$`), gc = new RegExp(`^hsla\\(${Ke},${ie},${ie},${Ke}\\)$`), ur = {
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
Pi(en, xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hr,
  // Deprecated! Use color.formatHex.
  formatHex: hr,
  formatHex8: mc,
  formatHsl: vc,
  formatRgb: dr,
  toString: dr
});
function hr() {
  return this.rgb().formatHex();
}
function mc() {
  return this.rgb().formatHex8();
}
function vc() {
  return Ja(this).formatHsl();
}
function dr() {
  return this.rgb().formatRgb();
}
function xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = fc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pr(e) : n === 3 ? new Zt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = uc.exec(t)) ? new Zt(e[1], e[2], e[3], 1) : (e = hc.exec(t)) ? new Zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = dc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = pc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = _c.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, 1) : (e = gc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, e[4]) : ur.hasOwnProperty(t) ? pr(ur[t]) : t === "transparent" ? new Zt(NaN, NaN, NaN, 0) : null;
}
function pr(t) {
  return new Zt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function sn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new Zt(t, e, n, i);
}
function wc(t) {
  return t instanceof en || (t = xe(t)), t ? (t = t.rgb(), new Zt(t.r, t.g, t.b, t.opacity)) : new Zt();
}
function wi(t, e, n, i) {
  return arguments.length === 1 ? wc(t) : new Zt(t, e, n, i ?? 1);
}
function Zt(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Pi(Zt, wi, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new Zt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ye : Math.pow(Ye, t), new Zt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Zt(ye(this.r), ye(this.g), ye(this.b), $n(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: yc,
  formatRgb: gr,
  toString: gr
}));
function _r() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}`;
}
function yc() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}${ve((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gr() {
  const t = $n(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ye(this.r)}, ${ye(this.g)}, ${ye(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function $n(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ye(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ve(t) {
  return t = ye(t), (t < 16 ? "0" : "") + t.toString(16);
}
function mr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new jt(t, e, n, i);
}
function Ja(t) {
  if (t instanceof jt) return new jt(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = xe(t)), !t) return new jt();
  if (t instanceof jt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, c = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + r : 2 - a - r, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new jt(s, o, c, t.opacity);
}
function bc(t, e, n, i) {
  return arguments.length === 1 ? Ja(t) : new jt(t, e, n, i ?? 1);
}
function jt(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Pi(jt, bc, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ye : Math.pow(Ye, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new Zt(
      Wn(t >= 240 ? t - 240 : t + 120, r, i),
      Wn(t, r, i),
      Wn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new jt(vr(this.h), on(this.s), on(this.l), $n(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = $n(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${vr(this.h)}, ${on(this.s) * 100}%, ${on(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function vr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function on(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Vi = (t) => () => t;
function xc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function kc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Tc(t) {
  return (t = +t) == 1 ? Qa : function(e, n) {
    return n - e ? kc(e, n, t) : Vi(isNaN(e) ? n : e);
  };
}
function Qa(t, e) {
  var n = e - t;
  return n ? xc(t, n) : Vi(isNaN(t) ? e : t);
}
const Nn = function t(e) {
  var n = Tc(e);
  function i(r, a) {
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), c = n(r.b, a.b), f = Qa(r.opacity, a.opacity);
    return function(u) {
      return r.r = s(u), r.g = o(u), r.b = c(u), r.opacity = f(u), r + "";
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
function Sc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ac(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = Ui(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < i; ++s) a[s] = r[s](o);
    return a;
  };
}
function $c(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function Qt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Nc(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = Ui(t[r], e[r]) : i[r] = e[r];
  return function(a) {
    for (r in n) i[r] = n[r](a);
    return i;
  };
}
var yi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Xn = new RegExp(yi.source, "g");
function Ic(t) {
  return function() {
    return t;
  };
}
function Dc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ja(t, e) {
  var n = yi.lastIndex = Xn.lastIndex = 0, i, r, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Xn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, c.push({ i: s, x: Qt(i, r) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Dc(c[0].x) : Ic(e) : (e = c.length, function(f) {
    for (var u = 0, g; u < e; ++u) o[(g = c[u]).i] = g.x(f);
    return o.join("");
  });
}
function Ui(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Vi(e) : (n === "number" ? Qt : n === "string" ? (i = xe(e)) ? (e = i, Nn) : ja : e instanceof xe ? Nn : e instanceof Date ? $c : Sc(e) ? Ec : Array.isArray(e) ? Ac : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Nc : Qt)(t, e);
}
function Rc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var wr = 180 / Math.PI, bi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ts(t, e, n, i, r, a) {
  var s, o, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * i) && (n -= t * c, i -= e * c), (o = Math.sqrt(n * n + i * i)) && (n /= o, i /= o, c /= o), t * i < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(e, t) * wr,
    skewX: Math.atan(c) * wr,
    scaleX: s,
    scaleY: o
  };
}
var ln;
function Mc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? bi : ts(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Lc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? bi : (t = t.matrix, ts(t.a, t.b, t.c, t.d, t.e, t.f));
}
function es(t, e, n, i) {
  function r(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, u, g, p, d, T) {
    if (f !== g || u !== p) {
      var H = d.push("translate(", null, e, null, n);
      T.push({ i: H - 4, x: Qt(f, g) }, { i: H - 2, x: Qt(u, p) });
    } else (g || p) && d.push("translate(" + g + e + p + n);
  }
  function s(f, u, g, p) {
    f !== u ? (f - u > 180 ? u += 360 : u - f > 180 && (f += 360), p.push({ i: g.push(r(g) + "rotate(", null, i) - 2, x: Qt(f, u) })) : u && g.push(r(g) + "rotate(" + u + i);
  }
  function o(f, u, g, p) {
    f !== u ? p.push({ i: g.push(r(g) + "skewX(", null, i) - 2, x: Qt(f, u) }) : u && g.push(r(g) + "skewX(" + u + i);
  }
  function c(f, u, g, p, d, T) {
    if (f !== g || u !== p) {
      var H = d.push(r(d) + "scale(", null, ",", null, ")");
      T.push({ i: H - 4, x: Qt(f, g) }, { i: H - 2, x: Qt(u, p) });
    } else (g !== 1 || p !== 1) && d.push(r(d) + "scale(" + g + "," + p + ")");
  }
  return function(f, u) {
    var g = [], p = [];
    return f = t(f), u = t(u), a(f.translateX, f.translateY, u.translateX, u.translateY, g, p), s(f.rotate, u.rotate, g, p), o(f.skewX, u.skewX, g, p), c(f.scaleX, f.scaleY, u.scaleX, u.scaleY, g, p), f = u = null, function(d) {
      for (var T = -1, H = p.length, N; ++T < H; ) g[(N = p[T]).i] = N.x(d);
      return g.join("");
    };
  };
}
var Oc = es(Mc, "px, ", "px)", "deg)"), Cc = es(Lc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, ns = 1e3, In, Ze, Dn = 0, ke = 0, Pn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zi() {
  return ke || (is(Fc), ke = Je.now() + Pn);
}
function Fc() {
  ke = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = rs.prototype = {
  constructor: Rn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Zi() : +n) + (e == null ? 0 : +e), !this._next && Ze !== this && (Ze ? Ze._next = this : In = this, Ze = this), this._call = t, this._time = n, xi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xi());
  }
};
function rs(t, e, n) {
  var i = new Rn();
  return i.restart(t, e, n), i;
}
function zc() {
  Zi(), ++Ce;
  for (var t = In, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ce;
}
function yr() {
  ke = (Dn = Je.now()) + Pn, Ce = Ue = 0;
  try {
    zc();
  } finally {
    Ce = 0, Hc(), ke = 0;
  }
}
function Bc() {
  var t = Je.now(), e = t - Dn;
  e > ns && (Pn -= e, Dn = t);
}
function Hc() {
  for (var t, e = In, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : In = n);
  Ze = t, xi(i);
}
function xi(t) {
  if (!Ce) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yr, t - Je.now() - Pn)), He && (He = clearInterval(He))) : (He || (Dn = Je.now(), He = setInterval(Bc, ns)), Ce = 1, is(yr));
  }
}
function br(t, e, n) {
  var i = new Rn();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var Pc = Fa("start", "end", "cancel", "interrupt"), Vc = [], as = 0, xr = 1, ki = 2, bn = 3, kr = 4, Ti = 5, xn = 6;
function Vn(t, e, n, i, r, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Uc(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Pc,
    tween: Vc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: as
  });
}
function qi(t, e) {
  var n = te(t, e);
  if (n.state > as) throw new Error("too late; already scheduled");
  return n;
}
function re(t, e) {
  var n = te(t, e);
  if (n.state > bn) throw new Error("too late; already running");
  return n;
}
function te(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Uc(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = rs(a, 0, n.time);
  function a(f) {
    n.state = xr, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  function s(f) {
    var u, g, p, d;
    if (n.state !== xr) return c();
    for (u in i)
      if (d = i[u], d.name === n.name) {
        if (d.state === bn) return br(s);
        d.state === kr ? (d.state = xn, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete i[u]) : +u < e && (d.state = xn, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete i[u]);
      }
    if (br(function() {
      n.state === bn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = bn, r = new Array(p = n.tween.length), u = 0, g = -1; u < p; ++u)
        (d = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++g] = d);
      r.length = g + 1;
    }
  }
  function o(f) {
    for (var u = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = Ti, 1), g = -1, p = r.length; ++g < p; )
      r[g].call(t, u);
    n.state === Ti && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = xn, n.timer.stop(), delete i[e];
    for (var f in i) return;
    delete t.__transition;
  }
}
function Zc(t, e) {
  var n = t.__transition, i, r, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        a = !1;
        continue;
      }
      r = i.state > ki && i.state < Ti, i.state = xn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function qc(t) {
  return this.each(function() {
    Zc(this, t);
  });
}
function Gc(t, e) {
  var n, i;
  return function() {
    var r = re(this, t), a = r.tween;
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
function Wc(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = re(this, t), s = a.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var o = { name: e, value: n }, c = 0, f = r.length; c < f; ++c)
        if (r[c].name === e) {
          r[c] = o;
          break;
        }
      c === f && r.push(o);
    }
    a.tween = r;
  };
}
function Xc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = te(this.node(), n).tween, r = 0, a = i.length, s; r < a; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Gc : Wc)(n, t, e));
}
function Gi(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = re(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return te(r, i).value[e];
  };
}
function ss(t, e) {
  var n;
  return (typeof e == "number" ? Qt : e instanceof xe ? Nn : (n = xe(e)) ? (e = n, Nn) : ja)(t, e);
}
function Yc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Kc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Jc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Qc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function jc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function tf(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function ef(t, e) {
  var n = Hn(t), i = n === "transform" ? Cc : ss;
  return this.attrTween(t, typeof e == "function" ? (n.local ? tf : jc)(n, i, Gi(this, "attr." + t, e)) : e == null ? (n.local ? Kc : Yc)(n) : (n.local ? Qc : Jc)(n, i, e));
}
function nf(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function rf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function af(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && rf(t, a)), n;
  }
  return r._value = e, r;
}
function sf(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && nf(t, a)), n;
  }
  return r._value = e, r;
}
function of(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = Hn(t);
  return this.tween(n, (i.local ? af : sf)(i, e));
}
function lf(t, e) {
  return function() {
    qi(this, t).delay = +e.apply(this, arguments);
  };
}
function cf(t, e) {
  return e = +e, function() {
    qi(this, t).delay = e;
  };
}
function ff(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? lf : cf)(e, t)) : te(this.node(), e).delay;
}
function uf(t, e) {
  return function() {
    re(this, t).duration = +e.apply(this, arguments);
  };
}
function hf(t, e) {
  return e = +e, function() {
    re(this, t).duration = e;
  };
}
function df(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? uf : hf)(e, t)) : te(this.node(), e).duration;
}
function pf(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    re(this, t).ease = e;
  };
}
function _f(t) {
  var e = this._id;
  return arguments.length ? this.each(pf(e, t)) : te(this.node(), e).ease;
}
function gf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    re(this, t).ease = n;
  };
}
function mf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(gf(this._id, t));
}
function vf(t) {
  typeof t != "function" && (t = Pa(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new fe(i, this._parents, this._name, this._id);
}
function wf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], u = c.length, g = s[o] = new Array(u), p, d = 0; d < u; ++d)
      (p = c[d] || f[d]) && (g[d] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new fe(s, this._parents, this._name, this._id);
}
function yf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function bf(t, e, n) {
  var i, r, a = yf(e) ? qi : re;
  return function() {
    var s = a(this, t), o = s.on;
    o !== i && (r = (i = o).copy()).on(e, n), s.on = r;
  };
}
function xf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? te(this.node(), n).on.on(t) : this.each(bf(n, t, e));
}
function kf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Tf() {
  return this.on("end.remove", kf(this._id));
}
function Ef(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = zi(t));
  for (var i = this._groups, r = i.length, a = new Array(r), s = 0; s < r; ++s)
    for (var o = i[s], c = o.length, f = a[s] = new Array(c), u, g, p = 0; p < c; ++p)
      (u = o[p]) && (g = t.call(u, u.__data__, p, o)) && ("__data__" in u && (g.__data__ = u.__data__), f[p] = g, Vn(f[p], e, n, p, f, te(u, n)));
  return new fe(a, this._parents, e, n);
}
function Sf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var c = i[o], f = c.length, u, g = 0; g < f; ++g)
      if (u = c[g]) {
        for (var p = t.call(u, u.__data__, g, c), d, T = te(u, n), H = 0, N = p.length; H < N; ++H)
          (d = p[H]) && Vn(d, e, n, H, p, T);
        a.push(p), s.push(u);
      }
  return new fe(a, s, e, n);
}
var Af = Se.prototype.constructor;
function $f() {
  return new Af(this._groups, this._parents);
}
function Nf(t, e) {
  var n, i, r;
  return function() {
    var a = Oe(this, t), s = (this.style.removeProperty(t), Oe(this, t));
    return a === s ? null : a === n && s === i ? r : r = e(n = a, i = s);
  };
}
function os(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function If(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = Oe(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Df(t, e, n) {
  var i, r, a;
  return function() {
    var s = Oe(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), Oe(this, t))), s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o));
  };
}
function Rf(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = re(this, t), f = c.on, u = c.value[a] == null ? o || (o = os(e)) : void 0;
    (f !== n || r !== u) && (i = (n = f).copy()).on(s, r = u), c.on = i;
  };
}
function Mf(t, e, n) {
  var i = (t += "") == "transform" ? Oc : ss;
  return e == null ? this.styleTween(t, Nf(t, i)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, Df(t, i, Gi(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, If(t, i, e), n).on("end.style." + t, null);
}
function Lf(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Of(t, e, n) {
  var i, r;
  function a() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Lf(t, s, n)), i;
  }
  return a._value = e, a;
}
function Cf(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Of(t, e, n ?? ""));
}
function Ff(t) {
  return function() {
    this.textContent = t;
  };
}
function zf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Bf(t) {
  return this.tween("text", typeof t == "function" ? zf(Gi(this, "text", t)) : Ff(t == null ? "" : t + ""));
}
function Hf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Pf(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Hf(r)), e;
  }
  return i._value = t, i;
}
function Vf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Pf(t));
}
function Uf() {
  for (var t = this._name, e = this._id, n = ls(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      if (c = s[f]) {
        var u = te(c, e);
        Vn(c, t, n, f, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new fe(i, this._parents, t, n);
}
function Zf() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var f = re(this, i), u = f.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
    }), r === 0 && a();
  });
}
var qf = 0;
function fe(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function ls() {
  return ++qf;
}
var oe = Se.prototype;
fe.prototype = {
  constructor: fe,
  select: Ef,
  selectAll: Sf,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: vf,
  merge: wf,
  selection: $f,
  transition: Uf,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: xf,
  attr: ef,
  attrTween: of,
  style: Mf,
  styleTween: Cf,
  text: Bf,
  textTween: Vf,
  remove: Tf,
  tween: Xc,
  delay: ff,
  duration: df,
  ease: _f,
  easeVarying: mf,
  end: Zf,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function Gf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Gf
};
function Xf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Yf(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = ls(), (n = Wf).time = Zi(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && Vn(c, t, e, f, s, n || Xf(c, e));
  return new fe(i, this._parents, t, e);
}
Se.prototype.interrupt = qc;
Se.prototype.transition = Yf;
const Ei = Math.PI, Si = 2 * Ei, me = 1e-6, Kf = Si - me;
function cs(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Jf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return cs;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, a = i.length; r < a; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Qf {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? cs : Jf(e);
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
    let s = this._x1, o = this._y1, c = i - e, f = r - n, u = s - e, g = o - n, p = u * u + g * g;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > me) if (!(Math.abs(g * c - f * u) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let d = i - s, T = r - o, H = c * c + f * f, N = d * d + T * T, S = Math.sqrt(H), k = Math.sqrt(p), b = a * Math.tan((Ei - Math.acos((H + p - N) / (2 * S * k))) / 2), x = b / k, A = b / S;
      Math.abs(x - 1) > me && this._append`L${e + x * u},${n + x * g}`, this._append`A${a},${a},0,0,${+(g * d > u * T)},${this._x1 = e + A * c},${this._y1 = n + A * f}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), c = i * Math.sin(r), f = e + o, u = n + c, g = 1 ^ s, p = s ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${u}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - u) > me) && this._append`L${f},${u}`, i && (p < 0 && (p = p % Si + Si), p > Kf ? this._append`A${i},${i},0,1,${g},${e - o},${n - c}A${i},${i},0,1,${g},${this._x1 = f},${this._y1 = u}` : p > me && this._append`A${i},${i},0,${+(p >= Ei)},${g},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function jf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Mn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function Fe(t) {
  return t = Mn(Math.abs(t)), t ? t[1] : NaN;
}
function tu(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], c = 0; r > 0 && o > 0 && (c + o + 1 > i && (o = Math.max(1, i - c)), a.push(n.substring(r -= o, r + o)), !((c += o + 1) > i)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function eu(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var nu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ln(t) {
  if (!(e = nu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Wi({
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
Ln.prototype = Wi.prototype;
function Wi(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Wi.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function iu(t) {
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
var fs;
function ru(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (fs = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return a === s ? i : a > s ? i + new Array(a - s + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + Mn(t, Math.max(0, e + a - 1))[0];
}
function Tr(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const Er = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: jf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Tr(t * 100, e),
  r: Tr,
  s: ru,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Ar = Array.prototype.map, $r = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function au(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : tu(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : eu(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(g) {
    g = Ln(g);
    var p = g.fill, d = g.align, T = g.sign, H = g.symbol, N = g.zero, S = g.width, k = g.comma, b = g.precision, x = g.trim, A = g.type;
    A === "n" ? (k = !0, A = "g") : Er[A] || (b === void 0 && (b = 12), x = !0, A = "g"), (N || p === "0" && d === "=") && (N = !0, p = "0", d = "=");
    var $ = H === "$" ? n : H === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : "", E = H === "$" ? i : /[%p]/.test(A) ? s : "", B = Er[A], F = /[defgprs%]/.test(A);
    b = b === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b));
    function C(y) {
      var U = $, P = E, K, nt, ct;
      if (A === "c")
        P = B(y) + P, y = "";
      else {
        y = +y;
        var W = y < 0 || 1 / y < 0;
        if (y = isNaN(y) ? c : B(Math.abs(y), b), x && (y = iu(y)), W && +y == 0 && T !== "+" && (W = !1), U = (W ? T === "(" ? T : o : T === "-" || T === "(" ? "" : T) + U, P = (A === "s" ? $r[8 + fs / 3] : "") + P + (W && T === "(" ? ")" : ""), F) {
          for (K = -1, nt = y.length; ++K < nt; )
            if (ct = y.charCodeAt(K), 48 > ct || ct > 57) {
              P = (ct === 46 ? r + y.slice(K + 1) : y.slice(K)) + P, y = y.slice(0, K);
              break;
            }
        }
      }
      k && !N && (y = e(y, 1 / 0));
      var j = U.length + y.length + P.length, V = j < S ? new Array(S - j + 1).join(p) : "";
      switch (k && N && (y = e(V + y, V.length ? S - P.length : 1 / 0), V = ""), d) {
        case "<":
          y = U + y + P + V;
          break;
        case "=":
          y = U + V + y + P;
          break;
        case "^":
          y = V.slice(0, j = V.length >> 1) + U + y + P + V.slice(j);
          break;
        default:
          y = V + U + y + P;
          break;
      }
      return a(y);
    }
    return C.toString = function() {
      return g + "";
    }, C;
  }
  function u(g, p) {
    var d = f((g = Ln(g), g.type = "f", g)), T = Math.max(-8, Math.min(8, Math.floor(Fe(p) / 3))) * 3, H = Math.pow(10, -T), N = $r[8 + T / 3];
    return function(S) {
      return d(H * S) + N;
    };
  }
  return {
    format: f,
    formatPrefix: u
  };
}
var cn, us, hs;
su({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function su(t) {
  return cn = au(t), us = cn.format, hs = cn.formatPrefix, cn;
}
function ou(t) {
  return Math.max(0, -Fe(Math.abs(t)));
}
function lu(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Fe(e) / 3))) * 3 - Fe(Math.abs(t)));
}
function cu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Fe(e) - Fe(t)) + 1;
}
function fu(t, e) {
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
function uu(t) {
  return function() {
    return t;
  };
}
function hu(t) {
  return +t;
}
var Nr = [0, 1];
function Re(t) {
  return t;
}
function Ai(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : uu(isNaN(e) ? NaN : 0.5);
}
function du(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function pu(t, e, n) {
  var i = t[0], r = t[1], a = e[0], s = e[1];
  return r < i ? (i = Ai(r, i), a = n(s, a)) : (i = Ai(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function _u(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Ai(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = mo(t, o, 1, i) - 1;
    return a[c](r[c](o));
  };
}
function gu(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function mu() {
  var t = Nr, e = Nr, n = Ui, i, r, a, s = Re, o, c, f;
  function u() {
    var p = Math.min(t.length, e.length);
    return s !== Re && (s = du(t[0], t[p - 1])), o = p > 2 ? _u : pu, c = f = null, g;
  }
  function g(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = o(t.map(i), e, n)))(i(s(p)));
  }
  return g.invert = function(p) {
    return s(r((f || (f = o(e, t.map(i), Qt)))(p)));
  }, g.domain = function(p) {
    return arguments.length ? (t = Array.from(p, hu), u()) : t.slice();
  }, g.range = function(p) {
    return arguments.length ? (e = Array.from(p), u()) : e.slice();
  }, g.rangeRound = function(p) {
    return e = Array.from(p), n = Rc, u();
  }, g.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : Re, u()) : s !== Re;
  }, g.interpolate = function(p) {
    return arguments.length ? (n = p, u()) : n;
  }, g.unknown = function(p) {
    return arguments.length ? (a = p, g) : a;
  }, function(p, d) {
    return i = p, r = d, u();
  };
}
function vu() {
  return mu()(Re, Re);
}
function wu(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = Ln(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = lu(r, s)) && (i.precision = a), hs(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = cu(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = ou(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return us(i);
}
function yu(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return bo(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return wu(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], c, f, u = 10;
    for (o < s && (f = s, s = o, o = f, f = r, r = a, a = f); u-- > 0; ) {
      if (f = gi(s, o, n), f === c)
        return i[r] = s, i[a] = o, e(i);
      if (f > 0)
        s = Math.floor(s / f) * f, o = Math.ceil(o / f) * f;
      else if (f < 0)
        s = Math.ceil(s * f) / f, o = Math.floor(o * f) / f;
      else
        break;
      c = f;
    }
    return t;
  }, t;
}
function he() {
  var t = vu();
  return t.copy = function() {
    return gu(t, he());
  }, fu.apply(t, arguments), yu(t);
}
function fn(t) {
  return function() {
    return t;
  };
}
const Xi = Math.sqrt, ds = Math.PI, bu = 2 * ds;
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
  }, () => new Qf(e);
}
const ku = {
  draw(t, e) {
    const n = Xi(e / ds);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, bu);
  }
}, Yn = Xi(3), ps = {
  draw(t, e) {
    const n = -Xi(e / (Yn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Yn * n, -n), t.lineTo(Yn * n, -n), t.closePath();
  }
};
function _s(t, e) {
  let n = null, i = xu(r);
  t = typeof t == "function" ? t : fn(t || ku), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
  function r() {
    let a;
    if (n || (n = a = i()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return r.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : fn(a), r) : t;
  }, r.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : fn(+a), r) : e;
  }, r.context = function(a) {
    return arguments.length ? (n = a ?? null, r) : n;
  }, r;
}
function qe(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
qe.prototype = {
  constructor: qe,
  scale: function(t) {
    return t === 1 ? this : new qe(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new qe(this.k, this.x + this.k * t, this.y + this.k * e);
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
qe.prototype;
function Yi(t, e, n) {
  let i = 0, r, a;
  if (t.length == 0)
    i = 1;
  else {
    for (let s = 1; s < t.length; s++) {
      for (const o of t[s]) {
        const [c, f] = o.split(":");
        if (n < +c || e > +f)
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
function gs(t, e) {
  let n = -1, i = -1;
  for (const r of t) {
    const a = r.children;
    a && a.forEach((s) => {
      e.includes(s.type) && ((n < 0 || s.fmin < n) && (n = s.fmin), (i < 0 || s.fmax > i) && (i = s.fmax));
    });
  }
  return {
    fmin: n,
    fmax: i
  };
}
function ze(t) {
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = Jt(i).nodes();
  let a = 0;
  return r.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function Ki(t, e) {
  var r;
  const n = ((r = e.node()) == null ? void 0 : r.getBBox().height) ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    var o;
    let s = !1;
    return (o = a.alleles) != null && o.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
      t.includes(f) && (s = !0);
    }), a.alleles.forEach((f) => {
      t.includes(f) && (s = !0);
    })), s;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = At(this).attr("x"), s = +At(this).attr("width");
    (s === 0 || Number.isNaN(s)) && (s = 3, a = String(+a - s / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", s).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const Tu = [
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
function Ge(t) {
  return t.replace(/\|/g, " ").replace(/"/g, "").replace(/^\[/, "").replace(/\]$/, "").trim();
}
const kn = {
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
function ms(t) {
  if (!t)
    return "black";
  const e = Ge(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const i = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return ms(i);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = kn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? kn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? kn.three_prime_UTR_variant.color : "#f0f";
}
const be = 10, ue = 10;
function Ji(t) {
  return `${t},${be} ${t + ue / 2},${be / 2} ${t},0 ${t - ue / 2},${be / 2}`;
}
function vs(t) {
  return `${t - ue / 2},${be} ${t},0 ${t + ue / 2},${be}`;
}
function Ir(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let i = !0, r = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => r != a.row && i ? !1 : (r != a.row && (r = a.row, i = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (i = !1), !0)), i ? r : r + 1;
  }
}
function ws(t) {
  return `${t - ue / 2},${be} ${t + ue / 2},${be} ${t - ue / 2},0 ${t + ue / 2},0`;
}
function Su(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((i) => {
        var r;
        return ((r = i[1]) == null ? void 0 : r.length) ?? 0;
      })
    ),
    descriptionHeight: e
  };
}
function Au(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= r && c >= r || c <= i && c >= i || o >= r && c <= i;
  });
}
function ys(t, e) {
  const n = [];
  return t.forEach((i) => {
    var f, u;
    const r = bs(i), { type: a, fmax: s, fmin: o } = i, c = Au(
      n,
      i,
      e
    );
    if (c >= 0 && a != "deletion") {
      const g = n[c], p = g.variantSet ? g.variantSet.findIndex(
        (d) => d.type === a && d.consequence === r
      ) : -1;
      if (p >= 0) {
        const d = Math.min(
          g.variantSet[p].fmin,
          o
        ), T = Math.max(
          g.variantSet[p].fmax,
          s
        );
        g.fmin = d, g.fmax = T, g.variantSet[p].fmin = d, g.variantSet[p].fmax = T, (f = g.variantSet[p].variants) == null || f.push(
          i
        );
      } else {
        const d = Math.min(g.fmin, o), T = Math.max(g.fmax, s);
        g.fmin = d, g.fmax = T, g.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      (u = g.variants) == null || u.push(i), g.fmin = Math.min(o, g.fmin), g.fmax = Math.max(s, g.fmax), n[c] = g;
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
function $i(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Dr(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Dr(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Dr(t) {
  const { descriptionWidth: e } = Su(t);
  let n = "";
  const i = t.location, [r, a] = i.split(":")[1].split("..");
  let s = t.alternative_alleles, o = t.reference_allele, c;
  if (t.type === "SNV")
    c = "1bp";
  else if (t.type === "deletion")
    c = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (c = "unknown length inserted", s = "n+") : c = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    c = `${o.length}bp`;
  else if (t.type === "delins") {
    const u = `${o.length - 1}bp deleted`;
    let g;
    s === "ALT_MISSING" ? (g = "unknown length inserted", s = "n+") : g = `${s.length - 1}bp inserted`, c = `${u}; ${g}`;
  } else
    c = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
}
function Ni(t) {
  return (t.variants ?? []).map((n) => {
    const i = $u(n);
    return {
      ...i,
      consequence: i.consequence || "UNKNOWN"
    };
  });
}
function Ii(t) {
  return (t.variants ?? []).flatMap((e) => {
    var i, r;
    const n = (r = (i = e.allele_ids) == null ? void 0 : i.values) == null ? void 0 : r[0];
    if (!n)
      return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const a = JSON.parse(n);
        return (Array.isArray(a) ? a : [a]).map(String);
      } catch {
      }
    return n.replace(/"/g, "").split(",").map((a) => a.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function Di(t) {
  return t.map((e) => ms(e.consequence));
}
function bs(t) {
  var n;
  if ((n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0)
    return Ge(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return Ge(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return Ge(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const i of e)
      if (i.consequence && typeof i.consequence == "string")
        return Ge(i.consequence);
  }
  return "UNKNOWN";
}
function un(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function $u(t) {
  var e, n;
  return {
    symbol: Qe(t),
    symbolDetail: xs(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: bs(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: (e = t.allele_of_gene_ids) == null ? void 0 : e.values[0].replace(/"/g, ""),
    geneSymbol: (n = t.allele_of_gene_symbols) == null ? void 0 : n.values[0].replace(/"/g, ""),
    allele_of_genes: un(t.allele_of_genes),
    allele_ids: un(t.allele_ids),
    alternative_alleles: un(t.alternative_alleles),
    impact: un(t.impact)
  };
}
function xs(t) {
  var e, n, i;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xs(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const r = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), s = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", o = a.split(","), c = s.split(",");
        for (let f = 0; f < c.length; f++)
          r.push(
            `${o[f].trim()} (${c[f].trim()})`
          );
        return r.join(", ");
      } catch {
        return `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${(i = t.allele_ids) == null ? void 0 : i.values[0].replace(
        /"|\[|\]/g,
        ""
      )})`;
  return "";
}
function Qe(t) {
  var e;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Qe(t.variants[0]);
  if ((e = t.allele_symbols_text) != null && e.values) {
    const n = t.allele_symbols_text.values[0].split(",");
    return n.length > 1 ? `${n.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function Nu(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Ri(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Lt(t) {
  return t == "unknown" ? Ri("grey", t.replace(/_/g, " ")) : Ri(
    kn[t].color,
    t.replace(/_/g, " ")
  );
}
function Iu() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ji(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("transcript_ablation")}</li>`, t += `<li>${Lt("splice_acceptor_variant")}</li>`, t += `<li>${Lt("splice_donor_variant")}</li>`, t += `<li>${Lt("stop_gained")}</li>`, t += `<li>${Lt("frameshift_variant")}</li>`, t += `<li>${Lt("stop_lost")}</li>`, t += `<li>${Lt("start_lost")}</li>`, t += `<li>${Lt("inframe_insertion")}</li>`, t += `<li>${Lt("inframe_deletion")}</li>`, t += `<li>${Lt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("protein_altering_variant")}</li>`, t += `<li>${Lt("splice_region_variant")}</li>`, t += `<li>${Lt("start_retained_variant")}</li>`, t += `<li>${Lt("stop_retained_variant")}</li>`, t += `<li>${Lt("synonymous_variant")}</li>`, t += `<li>${Lt("coding_sequence_variant")}</li>`, t += `<li>${Lt("five_prime_UTR_variant")}</li>`, t += `<li>${Lt("three_prime_UTR_variant")}</li>`, t += `<li>${Lt("intron_variant")}</li>`, t += `<li>${Lt("non_coding_transcript_variant")}</li>`, t += `<li>${Lt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Du(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ct(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Du(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function ks(t, e, n, i) {
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
    binRatio: c,
    isoformFilter: f,
    initialHighlight: u,
    trackData: g,
    variantData: p,
    geneBounds: d
  }) {
    this.trackData = g ?? [], this.variantData = p ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0, this.geneBounds = d;
  }
  DrawTrack() {
    console.log("🔍 IsoformAndVariantTrack.DrawTrack() called with:", {
      geneBounds: this.geneBounds,
      trackDataLength: this.trackData.length,
      variantDataLength: this.variantData.length,
      width: this.width
    });
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    );
    console.log("🧬 Filtered variant data:", {
      originalLength: this.variantData.length,
      filteredLength: r.length,
      variantFilter: this.variantFilter
    });
    const a = this.viewer, s = this.width, o = this.binRatio, c = Nu(r), f = c.length, u = this.trackData[0].source, g = this.trackData[0].seqId, p = e.length === 0 ? 9 : 30, d = ["UTR", "five_prime_UTR", "three_prime_UTR"], T = ["CDS"], H = ["exon"], N = this.transcriptTypes, S = gs(n, N);
    console.log("📊 Data range from findRange:", {
      dataRange: S,
      display_feats: N,
      isoformDataLength: n.length
    });
    let k = S.fmin, b = S.fmax;
    console.log("🎯 Initial view bounds:", {
      viewStart: k,
      viewEnd: b,
      viewWidth: b - k
    }), this.geneBounds ? (console.log("📍 Applying gene bounds:", {
      geneBounds: this.geneBounds,
      beforeViewStart: k,
      beforeViewEnd: b
    }), k = this.geneBounds.start, b = this.geneBounds.end, S.fmin < k && (console.log("⬅️ Extending viewStart for transcripts:", {
      oldViewStart: k,
      newViewStart: S.fmin
    }), k = S.fmin), S.fmax > b && (console.log("➡️ Extending viewEnd for transcripts:", {
      oldViewEnd: b,
      newViewEnd: S.fmax
    }), b = S.fmax), console.log("📍 After applying gene bounds:", {
      finalViewStart: k,
      finalViewEnd: b,
      finalViewWidth: b - k
    })) : console.log("⚠️ No gene bounds provided!");
    const x = 10, A = 10, $ = 40, E = 20, B = 2, F = 0, C = 10, y = 10, U = 4, P = 20, K = 10, nt = `0,0 0,${P} ${K},${K}`, ct = 10, W = 40, j = 22.5, V = he().domain([k, b]).range([0, s]);
    console.log("📐 D3 Scale created:", {
      domain: [k, b],
      range: [0, s],
      testMapping: {
        viewStart: V(k),
        viewEnd: V(b),
        midpoint: V((k + b) / 2)
      }
    });
    const it = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,35)"), Rt = a.append("g").attr("class", "label"), J = {};
    for (let st = 0, pt = d.length; st < pt; st++)
      J[d[st]] = 200;
    for (let st = 0, pt = T.length; st < pt; st++)
      J[T[st]] = 1e3;
    for (let st = 0, pt = H.length; st < pt; st++)
      J[H[st]] = 100;
    const gt = {};
    n = n.sort((st, pt) => {
      if (st.selected && !pt.selected)
        return -1;
      if (!st.selected && pt.selected)
        return 1;
      const ht = st.fmin || 0, ut = pt.fmin || 0;
      return ht - ut;
    });
    let Et = 0;
    const dt = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), Q = () => {
      dt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, lt = ys(
      r,
      (b - k) * o
    ), ft = lt.filter((st) => st.type === "deletion"), Tt = lt.filter((st) => st.type !== "deletion"), Nt = [];
    ft.forEach((st) => {
      var z;
      const { fmax: pt, fmin: ht } = st, ut = this.width, Ft = Qe(st), q = Ni(st), wt = Ii(st), yt = $i(q), xt = Di(q)[0];
      Nt.push({
        fmin: ht,
        fmax: pt,
        row: Ir(Nt, ht, pt)
      });
      const m = Math.max(Math.ceil(V(pt) - V(ht)), B);
      it.append("rect").attr("class", "variant-deletion").attr("id", `variant-${ht}`).attr("x", V(ht)).attr(
        "transform",
        `translate(0,${y * Ir(Nt, ht, pt)})`
      ).attr("z-index", 30).attr("fill", xt).attr("height", y).attr("width", m).on("click", () => {
        St(dt, yt, Q);
      }).on("mouseover", (O) => {
        const G = O.variant;
        Jt(
          ".variant-deletion"
        ).filter((v) => v.variant === G).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((v) => v.variant === G).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-deletion").filter((O) => O.selected !== "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ht,
        fmax: pt,
        variant: Ft + ht,
        alleles: wt
      });
      {
        let O = 0;
        O = V(ht);
        const G = y * f + j, v = Rt.append("text").attr("class", "variantLabel").attr("fill", xt).attr("opacity", 0).attr("height", F).attr("transform", `translate(${O},${G})`).text(Ft).on("click", () => {
          St(dt, yt, Q);
        }).datum({ fmin: ht, variant: Ft + ht }), R = ((z = v.node()) == null ? void 0 : z.getBBox().width) ?? 0;
        if (R + O > ut) {
          const h = R + O - ut;
          O -= h, v.attr(
            "transform",
            `translate(${O},${G})`
          );
        }
      }
    });
    const $t = ze(this.viewer), ot = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${$t})`);
    Tt.forEach((st) => {
      var G;
      const { type: pt, fmax: ht, fmin: ut } = st;
      let Ft = !0, q = !1;
      const wt = this.width, yt = Qe(st), xt = Ni(st), m = Ii(st), z = $i(xt), O = Di(xt)[0];
      if (pt.toLowerCase() === "snv" || pt.toLowerCase() === "point_mutation" ? (q = !0, ot.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${ut}`).attr("points", Ji(V(ut))).attr("fill", O).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * c.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        St(dt, z, Q);
      }).on("mouseover", function(v) {
        const R = v.variant;
        Jt(
          ".variant-SNV"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-SNV").filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: yt + ut,
        alleles: m
      })) : pt.toLowerCase() === "insertion" ? (q = !0, ot.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${ut}`).attr("points", vs(V(ut))).attr("fill", O).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * c.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        St(dt, z, Q);
      }).on("mouseover", (v) => {
        const R = v.variant;
        Jt(
          ".variant-insertion"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(
          ".variant-insertion"
        ).filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: yt + ut,
        alleles: m
      })) : pt.toLowerCase() === "delins" || pt.toLowerCase() === "substitution" || pt.toLowerCase() === "indel" || pt.toLowerCase() === "mnv" ? (q = !0, ot.append("polygon").attr("class", "variant-delins").attr("id", `variant-${ut}`).attr("points", ws(V(ut))).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * c.indexOf("delins")})`
      ).attr("fill", O).attr("z-index", 30).on("click", () => {
        St(dt, z, Q);
      }).on("mouseover", (v) => {
        const R = v.variant;
        Jt(
          ".variant-delins"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-delins").filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: yt + ut,
        alleles: m
      })) : (console.warn("type not found", pt, st), Ft = !1), Ft) {
        let v = 0;
        v = q ? V(ut) - ct / 2 : V(ut);
        const R = y * f + j, h = Rt.append("text").attr("class", "variantLabel").attr("fill", O).attr("opacity", 0).attr("height", F).attr("transform", `translate(${v},${R})`).text(yt).on("click", () => {
          St(dt, z, Q);
        }).datum({ fmin: ut, variant: yt + ut }), M = ((G = h.node()) == null ? void 0 : G.getBBox().width) ?? 0;
        if (M + v > wt) {
          const tt = M + v - wt;
          v -= tt, h.attr("transform", `translate(${v},35)`);
        }
      }
    });
    const rt = $t;
    Rt.attr("transform", `translate(0,${rt})`);
    const kt = ze(this.viewer) + j, It = a.append("g").attr("transform", `translate(0,${kt})`).attr("class", "track");
    let at = 0;
    const _t = [];
    let Z = -1, bt = -1;
    const St = this.renderTooltipDescription, Bt = [];
    for (let st = 0; st < n.length && at < p; st++) {
      const pt = n[st];
      let ht = pt.children;
      if (ht) {
        const ut = pt.selected;
        ht = ht.sort(
          (q, wt) => q.name.localeCompare(wt.name)
        );
        let Ft = !1;
        ht.forEach((q) => {
          var yt;
          if (!(e.includes(q.id) || e.includes(q.name)) && e.length !== 0 || Bt.includes(q.id))
            return;
          Bt.push(q.id);
          const wt = q.type;
          if (N.includes(wt)) {
            let xt = Yi(
              _t,
              V(q.fmin),
              V(q.fmax)
            );
            if (at < p) {
              let m = "", z, O = !1;
              const G = pt.name;
              Object.keys(gt).includes(G) || (Et += E, O = !0, gt[G] = "Green");
              const v = It.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${at * $ + 10 + Et})`
              );
              O && (m = G, z = v.append("text").attr("class", "geneLabel").attr("fill", ut ? "sandybrown" : "black").attr("height", F).attr(
                "transform",
                `translate(${V(q.fmin)},-${E})`
              ).text(m).on("click", () => {
                St(
                  dt,
                  Ct(pt),
                  Q
                );
              }).datum({
                fmin: q.fmin
              })), v.append("polygon").datum(() => ({
                fmin: q.fmin,
                fmax: q.fmax,
                strand: pt.strand
              })).attr("class", "transArrow").attr("points", nt).attr(
                "transform",
                (M) => pt.strand > 0 ? `translate(${Number(V(M.fmax))},0)` : `translate(${Number(V(M.fmin))},${P}) rotate(180)`
              ).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }), v.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", U).attr("transform", `translate(${V(q.fmin)},0)`).attr("width", V(q.fmax) - V(q.fmin)).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }).datum({
                fmin: q.fmin,
                fmax: q.fmax
              }), m = q.name, z = v.append("text").attr("class", "transcriptLabel").attr("fill", ut ? "sandybrown" : "gray").attr("opacity", ut ? 1 : 0.5).attr("height", F).attr("transform", `translate(${V(q.fmin)},0)`).text(m).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }).datum({
                fmin: q.fmin
              });
              let R = m.length * 2;
              try {
                R = ((yt = z.node()) == null ? void 0 : yt.getBBox().width) ?? 0;
              } catch {
              }
              Number(R + V(q.fmin)) > s;
              const h = R > V(q.fmax) - V(q.fmin) ? V(q.fmin) + R : V(q.fmax);
              if (_t[xt]) {
                const M = _t[xt];
                M.push(`${V(q.fmin)}:${h}`), _t[xt] = M;
              } else
                _t[xt] = [
                  `${V(q.fmin)}:${h}`
                ];
              (Z < 0 || Z > q.fmin) && (Z = q.fmin), (bt < 0 || bt < q.fmax) && (bt = q.fmax), q.children && (q.children = q.children.sort((M, tt) => {
                const l = J[M.type], D = J[tt.type];
                return typeof l == "number" && typeof D == "number" ? l - D : typeof l == "number" && typeof D != "number" ? -1 : typeof l != "number" && typeof D == "number" ? 1 : M.type.localeCompare(tt.type);
              }), q.children.forEach((M) => {
                const tt = M.type;
                H.includes(tt) ? v.append("rect").attr("class", "exon").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${x - U})`
                ).attr("height", x).attr("z-index", 10).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : T.includes(tt) ? v.append("rect").attr("class", "CDS").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${A - U})`
                ).attr("z-index", 20).attr("height", A).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : d.includes(tt) && v.append("rect").attr("class", "UTR").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${C - U})`
                ).attr("z-index", 20).attr("height", C).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax });
              })), at += 1;
            }
            if (at === p && !Ft) {
              const m = ks(u, g, k, b);
              ++xt, Ft = !0, It.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${at * $ + 20 + Et})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(m);
            }
          }
        });
      }
    }
    return i && Ki(i, a), at === 0 && It.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), at * $ + Et + W;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((i) => {
      var a, s, o, c;
      let r = !1;
      try {
        (n.includes(i.name) || (a = i.allele_symbols) != null && a.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = i.symbol) != null && s.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (o = i.symbol_text) != null && o.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((c = i.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((u) => {
          n.includes(u) && (r = !0);
        });
      } catch (f) {
        console.error(
          "error processing filter with so returning anyway",
          n,
          i,
          f
        ), r = !0;
      }
      return r;
    });
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  setInitialHighlight(e, n) {
    var a;
    const i = ((a = n.node()) == null ? void 0 : a.getBBox().height) ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((s) => {
      let o = !1;
      return s.alleles && (s.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
        e.includes(f) && (o = !0);
      }), s.alleles.forEach((f) => {
        e.includes(f) && (o = !0);
      })), o;
    }).datum((s) => (s.selected = "true", s)).style("stroke", "black").each(function() {
      const s = +(At(this).attr("width") || 3), o = +At(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
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
    initialHighlight: c,
    trackData: f,
    variantData: u
  }) {
    this.trackData = f ?? [], this.variantData = u ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = c, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let i = this.trackData;
    const r = this.filterVariantData(
      e,
      this.variantFilter
    ), a = ys(
      r,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    a.forEach((rt) => {
      const kt = Ii(rt);
      s.set(rt, kt);
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], g = ["CDS"], p = ["exon"], d = this.transcriptTypes, T = gs(i, d), H = T.fmin, N = T.fmax, S = 10, k = 10, b = 10, x = 40, A = 20, $ = 2, E = 0, B = 10, F = 10, C = 20, y = 4, U = 20, P = 10, K = `0,0 0,${U} ${P},${P}`, nt = 10, ct = 10, W = (rt) => `${rt - ct / 2},${nt} ${rt},0 ${rt + ct / 2},${nt}`, j = (rt) => `${rt - ct / 2},${nt} ${rt + ct / 2},${nt} ${rt - ct / 2},0 ${rt + ct / 2},0`, V = (rt) => `${rt},${nt} ${rt + ct / 2},${nt / 2} ${rt},0 ${rt - ct / 2},${nt / 2}`, it = he().domain([H, N]).range([0, c]), Rt = ze(this.viewer), J = o.append("g").attr("transform", `translate(0,${Rt})`).attr("class", "track"), gt = {};
    for (const rt of u)
      gt[rt] = 200;
    for (const rt of g)
      gt[rt] = 1e3;
    for (const rt of p)
      gt[rt] = 100;
    const Et = {};
    i = i.sort((rt, kt) => rt.selected && !kt.selected ? -1 : !rt.selected && kt.selected ? 1 : rt.name - kt.name);
    let dt = 0;
    const Q = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), lt = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ft = 0;
    const Tt = [];
    let Nt = -1, $t = -1;
    const ot = this.renderTooltipDescription;
    for (let rt = 0; rt < i.length && ft < S; rt++) {
      const kt = i[rt];
      let It = kt.children;
      if (It) {
        const at = kt.selected;
        It = It.sort((Z, bt) => Z.name < bt.name ? -1 : Z.name > bt.name ? 1 : Z - bt);
        let _t = !1;
        It.forEach((Z) => {
          const bt = Z.type;
          if (d.includes(bt)) {
            let St = Yi(
              Tt,
              it(Z.fmin),
              it(Z.fmax)
            );
            if (ft < S) {
              let Bt, st, pt = !1;
              Object.keys(Et).includes(kt.name) || (dt += A, pt = !0, Et[kt.name] = "Green");
              const ht = J.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ft * x + 10 + dt})`
              );
              pt && (Bt = kt.name, st = ht.append("text").attr("class", "geneLabel").attr("fill", at ? "sandybrown" : "black").attr("height", E).attr(
                "transform",
                `translate(${it(Z.fmin)},-${A})`
              ).text(Bt).on("click", () => {
                ot(
                  Q,
                  Ct(kt),
                  lt
                );
              }).datum({ fmin: Z.fmin })), ht.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: kt.strand
              })).attr("class", "transArrow").attr("points", K).attr("transform", (q) => kt.strand > 0 ? `translate(${Number(it(q.fmax))},0)` : `translate(${Number(it(q.fmin))},${U}) rotate(180)`).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }), ht.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + E).attr("height", y).attr("transform", `translate(${it(Z.fmin)},0)`).attr("width", it(Z.fmax) - it(Z.fmin)).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin, fmax: Z.fmax }), Bt = Z.name, st = ht.append("text").attr("class", "transcriptLabel").attr("fill", at ? "sandybrown" : "gray").attr("opacity", at ? 1 : 0.5).attr("height", E).attr("transform", `translate(${it(Z.fmin)},0)`).text(Bt).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin });
              let ut = Bt.length * 2;
              try {
                ut = st.node().getBBox().width;
              } catch {
              }
              Number(ut + it(Z.fmin)) > c;
              const Ft = ut > it(Z.fmax) - it(Z.fmin) ? it(Z.fmin) + ut : it(Z.fmax);
              if (Tt[St]) {
                const q = Tt[St];
                q.push(`${it(Z.fmin)}:${Ft}`), Tt[St] = q;
              } else
                Tt[St] = [
                  `${it(Z.fmin)}:${Ft}`
                ];
              (Nt < 0 || Nt > Z.fmin) && (Nt = Z.fmin), ($t < 0 || $t < Z.fmax) && ($t = Z.fmax), Z.children && (Z.children = Z.children.sort((q, wt) => {
                const yt = gt[q.type], xt = gt[wt.type];
                return typeof yt == "number" && typeof xt == "number" ? yt - xt : typeof yt == "number" && typeof xt != "number" ? -1 : typeof yt != "number" && typeof xt == "number" ? 1 : q.type - wt.type;
              }), Z.children.forEach((q) => {
                const wt = q.type;
                let yt = !1;
                p.includes(wt) ? (yt = !0, ht.append("rect").attr("class", "exon").attr("x", it(q.fmin)).attr(
                  "transform",
                  `translate(0,${k - y})`
                ).attr("height", k).attr("z-index", 10).attr("width", it(q.fmax) - it(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })) : g.includes(wt) ? (yt = !0, ht.append("rect").attr("class", "CDS").attr("x", it(q.fmin)).attr(
                  "transform",
                  `translate(0,${b - y})`
                ).attr("z-index", 20).attr("height", b).attr("width", it(q.fmax) - it(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })) : u.includes(wt) && (yt = !0, ht.append("rect").attr("class", "UTR").attr("x", it(q.fmin)).attr(
                  "transform",
                  `translate(0,${B - y})`
                ).attr("z-index", 20).attr("height", B).attr("width", it(q.fmax) - it(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })), yt && a.forEach((xt) => {
                  const { type: m, fmax: z, fmin: O } = xt;
                  if (O < q.fmin && z > q.fmin || z > q.fmax && O < q.fmax || z <= q.fmax && O >= q.fmin) {
                    let v = !0;
                    const R = Ni(xt), h = Di(R)[0], M = $i(R), tt = Math.max(
                      Math.ceil(it(z) - it(O)),
                      $
                    );
                    if (m.toLowerCase() === "deletion" || m.toLowerCase() === "mnv" ? ht.append("rect").attr("class", "variant-deletion").attr("x", it(O)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", F).attr("width", tt).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: O,
                      fmax: z,
                      alleles: s.get(xt) ?? []
                    }) : m.toLowerCase() === "snv" || m.toLowerCase() === "point_mutation" ? ht.append("polygon").attr("class", "variant-SNV").attr("points", V(it(O))).attr("fill", h).attr("x", it(O)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: O,
                      fmax: z,
                      alleles: s.get(xt) ?? []
                    }) : m.toLowerCase() === "insertion" ? ht.append("polygon").attr("class", "variant-insertion").attr("points", W(it(O))).attr("fill", h).attr("x", it(O)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: O,
                      fmax: z,
                      alleles: s.get(xt) ?? []
                    }) : m.toLowerCase() === "delins" || m.toLowerCase() === "substitution" || m.toLowerCase() === "indel" ? ht.append("polygon").attr("class", "variant-delins").attr("points", j(it(O))).attr("x", it(O)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: O,
                      fmax: z,
                      alleles: s.get(xt) ?? []
                    }) : v = !1, v && f) {
                      const l = Qe(xt), D = l.length || 1;
                      ht.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        at ? "sandybrown" : h
                      ).attr("opacity", at ? 1 : 0.5).attr("height", E).attr(
                        "transform",
                        `translate(${it(O - D / 2 * 100)},${C * 2.2 - y})`
                      ).html(l).on("click", () => {
                        ot(
                          Q,
                          M,
                          lt
                        );
                      }).datum({ fmin: Z.fmin });
                    }
                  }
                });
              })), ft += 1;
            }
            ft === S && !_t && (++St, _t = !0, J.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ft * x + 20 + dt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", E).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (ft === 0 && J.append("text").attr("x", 30).attr("y", E + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        Ki(this.initialHighlight, this.viewer);
      } catch {
      }
    return ft * x + dt;
  }
  filterVariantData(e, n) {
    if (n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a) => {
      var o, c, f, u, g;
      let s = !1;
      try {
        if (i.has(a.name) && (s = !0), (o = a.allele_symbols) != null && o.values) {
          const d = a.allele_symbols.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(d) && (s = !0);
        }
        if ((c = a.symbol) != null && c.values) {
          const d = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(d) && (s = !0);
        }
        if ((f = a.symbol_text) != null && f.values) {
          const d = a.symbol_text.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(d) && (s = !0);
        }
        const p = (g = (u = a.allele_ids) == null ? void 0 : u.values) == null ? void 0 : g[0];
        if (p) {
          let d = [];
          if (p.startsWith("[") && p.endsWith("]"))
            try {
              const T = JSON.parse(p);
              d = (Array.isArray(T) ? T : [T]).map(String);
            } catch {
              d = p.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            d = p.replace(/"|\\[|\\]| /g, "").split(",");
          for (const T of d)
            if (i.has(T)) {
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
    genome: c
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = i, this.height = n, this.transcriptTypes = r, this.htpVariant = a, this.region = o, this.genome = c;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  DrawTrack() {
    var W;
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = (W = e[0]) == null ? void 0 : W.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], u = ["exon"], g = this.transcriptTypes, p = 10, d = 10, T = 40, H = 0, N = 10, S = 4, k = 20, b = 10, x = `0,0 0,${k} ${b},${b}`, A = this.renderTooltipDescription, $ = he().domain([this.region.start, this.region.end]).range([0, r]), E = {};
    for (let j = 0, V = c.length; j < V; j++)
      E[c[j]] = 200;
    for (let j = 0, V = f.length; j < V; j++)
      E[f[j]] = 1e3;
    for (let j = 0, V = u.length; j < V; j++)
      E[u[j]] = 100;
    e = e.sort((j, V) => j.selected && !V.selected ? -1 : !j.selected && V.selected ? 1 : j.name - V.name);
    const B = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), F = () => {
      B.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const j = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, V] = n.split(":");
      j.append("polygon").attr("class", "variant-SNV").attr("points", Ji($(+V))).attr("fill", "red").attr("x", $(+V)).attr("z-index", 30);
    }
    const C = ze(this.viewer), y = i.append("g").attr("transform", `translate(0,${C})`).attr("class", "track");
    let U = 0;
    const P = [];
    let K = -1, nt = -1;
    const ct = [];
    for (let j = 0; j < e.length && U < o; j++) {
      const V = e[j];
      let it = V.children;
      if (it) {
        const Rt = V.selected;
        it = it.sort((J, gt) => J.name < gt.name ? -1 : J.name > gt.name ? 1 : 0), it.forEach((J) => {
          var Et, dt;
          const gt = J.type;
          if (!ct.includes(J.id) && (ct.push(J.id), g.includes(gt))) {
            let Q = Yi(
              P,
              $(J.fmin),
              $(J.fmax)
            );
            if (U < o) {
              const lt = y.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${U * T + 10})`
              ), ft = Math.max($(J.fmin), 0), Tt = Math.min($(J.fmax), this.width);
              lt.append("polygon").datum(() => ({
                strand: V.strand
              })).attr("class", "transArrow").attr("points", x).attr(
                "transform",
                () => V.strand > 0 ? `translate(${Tt},0)` : `translate(${ft},${k}) rotate(180)`
              ).on("click", () => {
                A(
                  B,
                  Ct(J),
                  F
                );
              }), lt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + H).attr("height", S).attr("transform", `translate(${ft},0)`).attr("width", Tt - ft).datum({
                fmin: J.fmin,
                fmax: J.fmax
              }).on("click", () => {
                A(
                  B,
                  Ct(J),
                  F
                );
              });
              let Nt = J.name;
              V.name !== J.name && (Nt += ` (${V.name})`);
              let $t = Math.max($(J.fmin), 0);
              const ot = lt.append("svg:text").attr("class", "transcriptLabel").attr("fill", Rt ? "sandybrown" : "gray").attr("opacity", Rt ? 1 : 0.5).attr("height", H).attr("transform", `translate(${$t},0)`).text(Nt).datum({
                fmin: J.fmin
              }).on("click", () => {
                A(
                  B,
                  Ct(J),
                  F
                );
              });
              let rt = 100;
              try {
                rt = ((Et = ot.node()) == null ? void 0 : Et.getBBox().width) ?? 0;
              } catch {
              }
              if (rt + $t > this.width) {
                const at = rt + $t - this.width;
                $t -= at, ot.attr("transform", `translate(${$t},0)`);
              }
              let kt = Nt.length * 2;
              try {
                kt = ((dt = ot.node()) == null ? void 0 : dt.getBBox().width) ?? 0;
              } catch (at) {
                console.error("Not yet rendered", at);
              }
              Number(kt + $(J.fmin)) > r;
              const It = kt > $(J.fmax) - $(J.fmin) ? $(J.fmin) + kt : $(J.fmax);
              if (P[Q]) {
                const at = P[Q];
                at.push(`${$(J.fmin)}:${It}`), P[Q] = at;
              } else
                P[Q] = [`${$(J.fmin)}:${It}`];
              (K < 0 || K > J.fmin) && (K = J.fmin), (nt < 0 || nt < J.fmax) && (nt = J.fmax), J.children && (J.children = J.children.sort(
                function(at, _t) {
                  const Z = E[at.type], bt = E[_t.type];
                  return typeof Z == "number" && typeof bt == "number" ? Z - bt : typeof Z == "number" && typeof bt != "number" ? -1 : typeof Z != "number" && typeof bt == "number" ? 1 : at.type.localeCompare(_t.type);
                }
              ), J.children.forEach((at) => {
                const _t = at.type;
                if ($(at.fmin) > this.width || $(at.fmax) < 0)
                  return;
                const Z = Math.max($(at.fmin), 0), bt = Math.min($(at.fmax), this.width);
                u.includes(_t) ? lt.append("rect").attr("class", "exon").attr("x", Z).attr(
                  "transform",
                  `translate(0,${p - S})`
                ).attr("height", p).attr("z-index", 10).attr("width", bt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ct(J),
                    F
                  );
                }) : f.includes(_t) ? lt.append("rect").attr("class", "CDS").attr("x", Z).attr(
                  "transform",
                  `translate(0,${d - S})`
                ).attr("z-index", 20).attr("height", d).attr("width", bt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ct(J),
                    F
                  );
                }) : c.includes(_t) && lt.append("rect").attr("class", "UTR").attr("x", Z).attr(
                  "transform",
                  `translate(0,${N - S})`
                ).attr("z-index", 20).attr("height", N).attr("width", bt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ct(J),
                    F
                  );
                });
              })), U += 1;
            }
            if (U === o) {
              const lt = ks(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++Q, y.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${U * T + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", H).html(lt);
            }
          }
        });
      }
    }
    return U === 0 && y.append("text").attr("x", 30).attr("y", H + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), U * T;
  }
}
class Ou {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = he().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = No(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Jt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Jt(".x-local-axis .tick text").each(function() {
      const f = At(this).text();
      let u = "nucleotide nt-a";
      f === "T" ? u = "nucleotide nt-t" : f === "C" ? u = "nucleotide nt-c" : f === "G" && (u = "nucleotide nt-g"), At(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = he().domain([n, i]).range(this.track.range), s = lr(a).ticks(8, "s").tickSize(8);
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
function On() {
}
On.prototype = Qi.prototype = {
  constructor: On,
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
function Qi(t, e) {
  var n = new On();
  if (t instanceof On) t.each(function(o, c) {
    n.set(c, o);
  });
  else if (Array.isArray(t)) {
    var i = -1, r = t.length, a;
    if (e == null) for (; ++i < r; ) n.set(i, t[i]);
    else for (; ++i < r; ) n.set(e(a = t[i], i, t), a);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Rr() {
}
var pe = Qi.prototype;
Rr.prototype = {
  constructor: Rr,
  has: pe.has,
  add: function(t) {
    return t += "", this[Xt + t] = t, this;
  },
  remove: pe.remove,
  clear: pe.clear,
  values: pe.keys,
  size: pe.size,
  empty: pe.empty,
  each: pe.each
};
var Mi = "http://www.w3.org/1999/xhtml";
const Mr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ts(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Mr.hasOwnProperty(e) ? { space: Mr[e], local: t } : t;
}
function Cu(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mi && e.documentElement.namespaceURI === Mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Fu(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = Ts(t);
  return (e.local ? Fu : Cu)(e);
}
function zu() {
}
function Ss(t) {
  return t == null ? zu : function() {
    return this.querySelector(t);
  };
}
function Bu(t) {
  typeof t != "function" && (t = Ss(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
  return new qt(i, this._parents);
}
function Hu() {
  return [];
}
function Pu(t) {
  return t == null ? Hu : function() {
    return this.querySelectorAll(t);
  };
}
function Vu(t) {
  typeof t != "function" && (t = Pu(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new qt(i, r);
}
function Uu(t) {
  return function() {
    return this.matches(t);
  };
}
function Zu(t) {
  typeof t != "function" && (t = Uu(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new qt(i, this._parents);
}
function As(t) {
  return new Array(t.length);
}
function qu() {
  return new qt(this._enter || this._groups.map(As), this._parents);
}
function Cn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Cn.prototype = {
  constructor: Cn,
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
function Gu(t) {
  return function() {
    return t;
  };
}
var Lr = "$";
function Wu(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Cn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Xu(t, e, n, i, r, a, s) {
  var o, c, f = {}, u = e.length, g = a.length, p = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = d = Lr + s.call(c, c.__data__, o, e), d in f ? r[o] = c : f[d] = c);
  for (o = 0; o < g; ++o)
    d = Lr + s.call(t, a[o], o, a), (c = f[d]) ? (i[o] = c, c.__data__ = a[o], f[d] = null) : n[o] = new Cn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f[p[o]] === c && (r[o] = c);
}
function Yu(t, e) {
  if (!t)
    return d = new Array(this.size()), f = -1, this.each(function($) {
      d[++f] = $;
    }), d;
  var n = e ? Xu : Wu, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Gu(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], g = r[f], p = g.length, d = t.call(u, u && u.__data__, f, i), T = d.length, H = o[f] = new Array(T), N = s[f] = new Array(T), S = c[f] = new Array(p);
    n(u, g, H, N, S, d, e);
    for (var k = 0, b = 0, x, A; k < T; ++k)
      if (x = H[k]) {
        for (k >= b && (b = k + 1); !(A = N[b]) && ++b < T; ) ;
        x._next = A || null;
      }
  }
  return s = new qt(s, i), s._enter = o, s._exit = c, s;
}
function Ku() {
  return new qt(this._exit || this._groups.map(As), this._parents);
}
function Ju(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function Qu(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], u = c.length, g = s[o] = new Array(u), p, d = 0; d < u; ++d)
      (p = c[d] || f[d]) && (g[d] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new qt(s, this._parents);
}
function ju() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function th(t) {
  t || (t = eh);
  function e(g, p) {
    return g && p ? t(g.__data__, p.__data__) : !g - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
  }
  return new qt(r, this._parents).order();
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
  var n = Ts(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ch : lh : typeof e == "function" ? n.local ? dh : hh : n.local ? uh : fh)(n, e));
}
function $s(t) {
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
  return t.style.getPropertyValue(e) || $s(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yh(t) {
  return function() {
    delete this[t];
  };
}
function bh(t, e) {
  return function() {
    this[t] = e;
  };
}
function xh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function kh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yh : typeof e == "function" ? xh : bh)(t, e)) : this.node()[t];
}
function Ns(t) {
  return t.trim().split(/^|\s+/);
}
function ji(t) {
  return t.classList || new Is(t);
}
function Is(t) {
  this._node = t, this._names = Ns(t.getAttribute("class") || "");
}
Is.prototype = {
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
function Ds(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Rs(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Th(t) {
  return function() {
    Ds(this, t);
  };
}
function Eh(t) {
  return function() {
    Rs(this, t);
  };
}
function Sh(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ds : Rs)(this, t);
  };
}
function Ah(t, e) {
  var n = Ns(t + "");
  if (arguments.length < 2) {
    for (var i = ji(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Sh : e ? Th : Eh)(n, e));
}
function $h() {
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
  return arguments.length ? this.each(t == null ? $h : (typeof t == "function" ? Ih : Nh)(t)) : this.node().textContent;
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
function zh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Bh() {
  return this.each(zh);
}
function Hh(t) {
  var e = typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ph() {
  return null;
}
function Vh(t, e) {
  var n = typeof t == "function" ? t : Es(t), i = e == null ? Ph : typeof e == "function" ? e : Ss(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Uh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Zh() {
  return this.each(Uh);
}
function qh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wh(t) {
  return this.select(t ? Gh : qh);
}
function Xh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ms = {};
if (typeof document < "u") {
  var Yh = document.documentElement;
  "onmouseenter" in Yh || (Ms = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Kh(t, e, n) {
  return t = Ls(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Ls(t, e, n) {
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
  var i = Ms.hasOwnProperty(t.type) ? Kh : Ls;
  return function(r, a, s) {
    var o = this.__on, c, f = i(e, a, s);
    if (o) {
      for (var u = 0, g = o.length; u < g; ++u)
        if ((c = o[u]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function td(t, e, n) {
  var i = Jh(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, u; c < f; ++c)
        for (r = 0, u = o[c]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? jh : Qh, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Os(t, e, n) {
  var i = $s(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ed(t, e) {
  return function() {
    return Os(this, t, e);
  };
}
function nd(t, e) {
  return function() {
    return Os(this, t, e.apply(this, arguments));
  };
}
function id(t, e) {
  return this.each((typeof e == "function" ? nd : ed)(t, e));
}
var Cs = [null];
function qt(t, e) {
  this._groups = t, this._parents = e;
}
function Li() {
  return new qt([[document.documentElement]], Cs);
}
qt.prototype = Li.prototype = {
  constructor: qt,
  select: Bu,
  selectAll: Vu,
  filter: Zu,
  data: Yu,
  enter: qu,
  exit: Ku,
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
  classed: Ah,
  text: Dh,
  html: Oh,
  raise: Fh,
  lower: Bh,
  append: Hh,
  insert: Vh,
  remove: Zh,
  clone: Wh,
  datum: Xh,
  on: td,
  dispatch: id
};
function Or(t) {
  return typeof t == "string" ? new qt([[document.querySelector(t)]], [document.documentElement]) : new qt([[t]], Cs);
}
function rd() {
  var t = f, e = u, n = g, i = document.body, r = $(), a = null, s = null, o = null;
  function c(y) {
    a = E(y), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var y = Array.prototype.slice.call(arguments);
    y[y.length - 1] instanceof SVGElement && (o = y.pop());
    var U = n.apply(this, y), P = e.apply(this, y), K = t.apply(this, y), nt = B(), ct = d.length, W, j = document.documentElement.scrollTop || i.scrollTop, V = document.documentElement.scrollLeft || i.scrollLeft;
    for (nt.html(U).style("opacity", 1).style("pointer-events", "all"); ct--; ) nt.classed(d[ct], !1);
    return W = p.get(K).apply(this), nt.classed(K, !0).style("top", W.top + P[0] + j + "px").style("left", W.left + P[1] + V + "px"), c;
  }, c.hide = function() {
    var y = B();
    return y.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(y, U) {
    if (arguments.length < 2 && typeof y == "string")
      return B().attr(y);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.attr.apply(B(), P), c;
  }, c.style = function(y, U) {
    if (arguments.length < 2 && typeof y == "string")
      return B().style(y);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.style.apply(B(), P), c;
  }, c.direction = function(y) {
    return arguments.length ? (t = y == null ? y : C(y), c) : t;
  }, c.offset = function(y) {
    return arguments.length ? (e = y == null ? y : C(y), c) : e;
  }, c.html = function(y) {
    return arguments.length ? (n = y == null ? y : C(y), c) : n;
  }, c.rootElement = function(y) {
    return arguments.length ? (i = y == null ? y : C(y), c) : i;
  }, c.destroy = function() {
    return r && (B().remove(), r = null), c;
  };
  function f() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function g() {
    return " ";
  }
  var p = Qi({
    n: T,
    s: H,
    e: N,
    w: S,
    nw: k,
    ne: b,
    sw: x,
    se: A
  }), d = p.keys();
  function T() {
    var y = F(this);
    return {
      top: y.n.y - r.offsetHeight,
      left: y.n.x - r.offsetWidth / 2
    };
  }
  function H() {
    var y = F(this);
    return {
      top: y.s.y,
      left: y.s.x - r.offsetWidth / 2
    };
  }
  function N() {
    var y = F(this);
    return {
      top: y.e.y - r.offsetHeight / 2,
      left: y.e.x
    };
  }
  function S() {
    var y = F(this);
    return {
      top: y.w.y - r.offsetHeight / 2,
      left: y.w.x - r.offsetWidth
    };
  }
  function k() {
    var y = F(this);
    return {
      top: y.nw.y - r.offsetHeight,
      left: y.nw.x - r.offsetWidth
    };
  }
  function b() {
    var y = F(this);
    return {
      top: y.ne.y - r.offsetHeight,
      left: y.ne.x
    };
  }
  function x() {
    var y = F(this);
    return {
      top: y.sw.y,
      left: y.sw.x - r.offsetWidth
    };
  }
  function A() {
    var y = F(this);
    return {
      top: y.se.y,
      left: y.se.x
    };
  }
  function $() {
    var y = Or(document.createElement("div"));
    return y.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), y.node();
  }
  function E(y) {
    var U = y.node();
    return U ? U.tagName.toLowerCase() === "svg" ? U : U.ownerSVGElement : null;
  }
  function B() {
    return r == null && (r = $(), i.appendChild(r)), Or(r);
  }
  function F(y) {
    for (var U = o || y; U.getScreenCTM == null && U.parentNode != null; )
      U = U.parentNode;
    var P = {}, K = U.getScreenCTM(), nt = U.getBBox(), ct = nt.width, W = nt.height, j = nt.x, V = nt.y;
    return s.x = j, s.y = V, P.nw = s.matrixTransform(K), s.x += ct, P.ne = s.matrixTransform(K), s.y += W, P.se = s.matrixTransform(K), s.x -= ct, P.sw = s.matrixTransform(K), s.y -= W / 2, P.w = s.matrixTransform(K), s.x += ct, P.e = s.matrixTransform(K), s.x -= ct / 2, s.y -= W / 2, P.n = s.matrixTransform(K), s.y += W, P.s = s.matrixTransform(K), P;
  }
  function C(y) {
    return typeof y == "function" ? y : function() {
      return y;
    };
  }
  return c;
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end + 1]).range(this.range), r = _s().type(ps).size(20), a = rd();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (g) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${g.position}</td></tr><tr><td>Mutation</td> <td>${g.ref} > ${g.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (g) => `translate(${i(g.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = At("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end]).range(this.track.range), r = _s().type(ps).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${i(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function tr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Kn, Cr;
function od() {
  if (Cr) return Kn;
  Cr = 1;
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
const Un = /* @__PURE__ */ tr(ld);
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
class Te {
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
      promise: this.fillCallback(n, a.signal, (c) => {
        s.callback(c);
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
    }).catch((c) => {
      throw console.error(c), c;
    }), this.cache.set(e, o);
  }
  static checkSinglePromise(e, n) {
    function i() {
      if (n != null && n.aborted)
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
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, i, r)) : a.settled ? a.promise : (a.aborter.addSignal(i), a.statusReporter.addCallback(r), Te.checkSinglePromise(a.promise, i)) : (this.fill(e, n, i, r), Te.checkSinglePromise(
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
var Tn = { exports: {} }, hd = Tn.exports, Fr;
function dd() {
  return Fr || (Fr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(hd, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(k) {
        return n.test(k);
      }
      function s(k) {
        return k.startsWith("//");
      }
      function o(k) {
        return k.startsWith("/");
      }
      function c(k) {
        return k.startsWith("file:");
      }
      function f(k) {
        return /^[.?#]/.test(k);
      }
      function u(k) {
        const b = i.exec(k);
        return p(b[1], b[2] || "", b[3], b[4] || "", b[5] || "/", b[6] || "", b[7] || "");
      }
      function g(k) {
        const b = r.exec(k), x = b[2];
        return p("file:", "", b[1] || "", "", o(x) ? x : "/" + x, b[3] || "", b[4] || "");
      }
      function p(k, b, x, A, $, E, B) {
        return {
          scheme: k,
          user: b,
          host: x,
          port: A,
          path: $,
          query: E,
          hash: B,
          type: 7
        };
      }
      function d(k) {
        if (s(k)) {
          const x = u("http:" + k);
          return x.scheme = "", x.type = 6, x;
        }
        if (o(k)) {
          const x = u("http://foo.com" + k);
          return x.scheme = "", x.host = "", x.type = 5, x;
        }
        if (c(k))
          return g(k);
        if (a(k))
          return u(k);
        const b = u("http://foo.com/" + k);
        return b.scheme = "", b.host = "", b.type = k ? k.startsWith("?") ? 3 : k.startsWith("#") ? 2 : 4 : 1, b;
      }
      function T(k) {
        if (k.endsWith("/.."))
          return k;
        const b = k.lastIndexOf("/");
        return k.slice(0, b + 1);
      }
      function H(k, b) {
        N(b, b.type), k.path === "/" ? k.path = b.path : k.path = T(b.path) + k.path;
      }
      function N(k, b) {
        const x = b <= 4, A = k.path.split("/");
        let $ = 1, E = 0, B = !1;
        for (let C = 1; C < A.length; C++) {
          const y = A[C];
          if (!y) {
            B = !0;
            continue;
          }
          if (B = !1, y !== ".") {
            if (y === "..") {
              E ? (B = !0, E--, $--) : x && (A[$++] = y);
              continue;
            }
            A[$++] = y, E++;
          }
        }
        let F = "";
        for (let C = 1; C < $; C++)
          F += "/" + A[C];
        (!F || B && !F.endsWith("/..")) && (F += "/"), k.path = F;
      }
      function S(k, b) {
        if (!k && !b)
          return "";
        const x = d(k);
        let A = x.type;
        if (b && A !== 7) {
          const E = d(b), B = E.type;
          switch (A) {
            case 1:
              x.hash = E.hash;
            // fall through
            case 2:
              x.query = E.query;
            // fall through
            case 3:
            case 4:
              H(x, E);
            // fall through
            case 5:
              x.user = E.user, x.host = E.host, x.port = E.port;
            // fall through
            case 6:
              x.scheme = E.scheme;
          }
          B > A && (A = B);
        }
        N(x, A);
        const $ = x.query + x.hash;
        switch (A) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return $;
          case 4: {
            const E = x.path.slice(1);
            return E ? f(b || k) && !f(E) ? "./" + E + $ : E + $ : $ || ".";
          }
          case 5:
            return x.path + $;
          default:
            return x.scheme + "//" + x.user + x.host + x.port + x.path + $;
        }
      }
      return S;
    });
  }(Tn)), Tn.exports;
}
var pd = dd();
const _d = /* @__PURE__ */ tr(pd);
async function er(t, e, n = {}) {
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
function nr(t, e = ".") {
  return _d(t, e);
}
class gd {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new Te({
      cache: new Un({ maxSize: n }),
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
    const n = nr(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return er(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, i, r, a, s, o) {
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), u = [];
    for (let g = this.binarySearch(e, n, a); g < e.length && g >= 0 && r * s(e[g]) < r * i; g += r) {
      if (e[g][0] === this.lazyClass) {
        const d = c(e[g]), T = this.chunkCache.get(d, d).then((H) => [H, d]);
        u.push(T);
      } else
        yield [e[g], o.concat(g)];
      const p = f(e[g]);
      p && (yield* this.iterateSublist(p, n, i, r, a, s, o.concat(g)));
    }
    for (const g of u) {
      const [p, d] = await g;
      p && (yield* this.iterateSublist(p, n, i, r, a, s, [
        ...o,
        d
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
      const o = Math.max(0, (this.start(s) - e) / a | 0), c = Math.min(i, (this.end(s) - e) / a | 0);
      for (let f = o; f <= c; f += 1)
        r[f] += 1;
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
    this.chunkCache = new Te({
      cache: new Un({ maxSize: r }),
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
      const [o, c] = await s;
      yield* this.filterChunkData(e, n, o, c);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = nr(n, this.baseUrl));
    const i = await er(n, this.readFile);
    return [e, i];
  }
  *filterChunkData(e, n, i, r) {
    const a = i * this.chunkSize, s = Math.max(0, e - a), o = Math.min(n - a, this.chunkSize - 1);
    for (let c = s; c <= o; c += 1)
      yield [c + a, r[c]];
  }
}
function wd() {
  return this._uniqueID;
}
function yd() {
  return this._parent;
}
function bd() {
  return this.get("subfeatures");
}
class xd {
  constructor({ baseUrl: e, urlTemplate: n, readFile: i, cacheSize: r = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = i, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new Te({
      cache: new Un({ maxSize: r }),
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
    const n = nr(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return er(n, this.readFile).then((i) => (
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
    if (r != null && r.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new vd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
      i._histograms = r;
    }
    return i._histograms && Object.keys(i._histograms).forEach((a) => {
      i._histograms[a].forEach((o) => {
        Object.keys(o).forEach((c) => {
          typeof o[c] == "string" && String(Number(o[c])) === o[c] && (o[c] = Number(o[c]));
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
    const c = (s._histograms.stats || []).find((p) => p.basesPerBin >= a);
    let f = s._histograms.meta[0];
    for (let p = 0; p < s._histograms.meta.length; p += 1)
      a >= s._histograms.meta[p].basesPerBin && (f = s._histograms.meta[p]);
    let u = a / f.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const p = Math.floor(n / f.basesPerBin);
      u = Math.round(u);
      const d = [];
      for (let T = 0; T < r; T += 1)
        d[T] = 0;
      for await (const [T, H] of f.lazyArray.range(p, p + u * r - 1))
        d[Math.floor((T - p) / u)] += H;
      return { bins: d, stats: c };
    }
    return { bins: await s.nclist.histogram(n, i, r), stats: c };
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
    var s;
    const r = await this.getDataRoot(e), a = (s = r.attrs) == null ? void 0 : s.accessors();
    for await (const [o, c] of r.nclist.iterate(n, i)) {
      if (!o.decorated) {
        const f = c.join(",");
        this.decorateFeature(a, o, `${e},${f}`);
      }
      yield o;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, i, r) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = wd, n._parent = r, n.parent = yd, n.children = bd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${i}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const kd = 3, Td = 258, Fs = 29, Ed = 256, Sd = Ed + 1 + Fs, zs = 30, Ad = 512, $d = new Array((Sd + 2) * 2);
Be($d);
const Nd = new Array(zs * 2);
Be(Nd);
const Id = new Array(Ad);
Be(Id);
const Dd = new Array(Td - kd + 1);
Be(Dd);
const Rd = new Array(Fs);
Be(Rd);
const Md = new Array(zs);
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
var Oi = Ld;
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
var ne = Fd, Ci = {
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
const zd = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var Bd = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const i in n)
        zd(n, i) && (t[i] = n[i]);
    }
  }
  return t;
}, Hd = (t) => {
  let e = 0;
  for (let i = 0, r = t.length; i < r; i++)
    e += t[i].length;
  const n = new Uint8Array(e);
  for (let i = 0, r = 0, a = t.length; i < a; i++) {
    let s = t[i];
    n.set(s, r), r += s.length;
  }
  return n;
}, Hs = {
  assign: Bd,
  flattenChunks: Hd
};
let Ps = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Ps = !1;
}
const je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
je[254] = je[254] = 1;
var Pd = (t) => {
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
    let o = je[s];
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
}, Zd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + je[t[n]] > e ? n : e;
}, Fi = {
  string2buf: Pd,
  buf2string: Ud,
  utf8border: Zd
};
function qd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Gd = qd;
const hn = 16209, Wd = 16191;
var Xd = function(e, n) {
  let i, r, a, s, o, c, f, u, g, p, d, T, H, N, S, k, b, x, A, $, E, B, F, C;
  const y = e.state;
  i = e.next_in, F = e.input, r = i + (e.avail_in - 5), a = e.next_out, C = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = y.dmax, f = y.wsize, u = y.whave, g = y.wnext, p = y.window, d = y.hold, T = y.bits, H = y.lencode, N = y.distcode, S = (1 << y.lenbits) - 1, k = (1 << y.distbits) - 1;
  t:
    do {
      T < 15 && (d += F[i++] << T, T += 8, d += F[i++] << T, T += 8), b = H[d & S];
      e:
        for (; ; ) {
          if (x = b >>> 24, d >>>= x, T -= x, x = b >>> 16 & 255, x === 0)
            C[a++] = b & 65535;
          else if (x & 16) {
            A = b & 65535, x &= 15, x && (T < x && (d += F[i++] << T, T += 8), A += d & (1 << x) - 1, d >>>= x, T -= x), T < 15 && (d += F[i++] << T, T += 8, d += F[i++] << T, T += 8), b = N[d & k];
            n:
              for (; ; ) {
                if (x = b >>> 24, d >>>= x, T -= x, x = b >>> 16 & 255, x & 16) {
                  if ($ = b & 65535, x &= 15, T < x && (d += F[i++] << T, T += 8, T < x && (d += F[i++] << T, T += 8)), $ += d & (1 << x) - 1, $ > c) {
                    e.msg = "invalid distance too far back", y.mode = hn;
                    break t;
                  }
                  if (d >>>= x, T -= x, x = a - s, $ > x) {
                    if (x = $ - x, x > u && y.sane) {
                      e.msg = "invalid distance too far back", y.mode = hn;
                      break t;
                    }
                    if (E = 0, B = p, g === 0) {
                      if (E += f - x, x < A) {
                        A -= x;
                        do
                          C[a++] = p[E++];
                        while (--x);
                        E = a - $, B = C;
                      }
                    } else if (g < x) {
                      if (E += f + g - x, x -= g, x < A) {
                        A -= x;
                        do
                          C[a++] = p[E++];
                        while (--x);
                        if (E = 0, g < A) {
                          x = g, A -= x;
                          do
                            C[a++] = p[E++];
                          while (--x);
                          E = a - $, B = C;
                        }
                      }
                    } else if (E += g - x, x < A) {
                      A -= x;
                      do
                        C[a++] = p[E++];
                      while (--x);
                      E = a - $, B = C;
                    }
                    for (; A > 2; )
                      C[a++] = B[E++], C[a++] = B[E++], C[a++] = B[E++], A -= 3;
                    A && (C[a++] = B[E++], A > 1 && (C[a++] = B[E++]));
                  } else {
                    E = a - $;
                    do
                      C[a++] = C[E++], C[a++] = C[E++], C[a++] = C[E++], A -= 3;
                    while (A > 2);
                    A && (C[a++] = C[E++], A > 1 && (C[a++] = C[E++]));
                  }
                } else if ((x & 64) === 0) {
                  b = N[(b & 65535) + (d & (1 << x) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", y.mode = hn;
                  break t;
                }
                break;
              }
          } else if ((x & 64) === 0) {
            b = H[(b & 65535) + (d & (1 << x) - 1)];
            continue e;
          } else if (x & 32) {
            y.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", y.mode = hn;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  A = T >> 3, i -= A, T -= A << 3, d &= (1 << T) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), y.hold = d, y.bits = T;
};
const $e = 15, zr = 852, Br = 592, Hr = 0, Jn = 1, Pr = 2, Yd = new Uint16Array([
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
]), Kd = new Uint8Array([
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
  const c = o.bits;
  let f = 0, u = 0, g = 0, p = 0, d = 0, T = 0, H = 0, N = 0, S = 0, k = 0, b, x, A, $, E, B = null, F;
  const C = new Uint16Array($e + 1), y = new Uint16Array($e + 1);
  let U = null, P, K, nt;
  for (f = 0; f <= $e; f++)
    C[f] = 0;
  for (u = 0; u < i; u++)
    C[e[n + u]]++;
  for (d = c, p = $e; p >= 1 && C[p] === 0; p--)
    ;
  if (d > p && (d = p), p === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (g = 1; g < p && C[g] === 0; g++)
    ;
  for (d < g && (d = g), N = 1, f = 1; f <= $e; f++)
    if (N <<= 1, N -= C[f], N < 0)
      return -1;
  if (N > 0 && (t === Hr || p !== 1))
    return -1;
  for (y[1] = 0, f = 1; f < $e; f++)
    y[f + 1] = y[f] + C[f];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (s[y[e[n + u]]++] = u);
  if (t === Hr ? (B = U = s, F = 20) : t === Jn ? (B = Yd, U = Kd, F = 257) : (B = Jd, U = Qd, F = 0), k = 0, u = 0, f = g, E = a, T = d, H = 0, A = -1, S = 1 << d, $ = S - 1, t === Jn && S > zr || t === Pr && S > Br)
    return 1;
  for (; ; ) {
    P = f - H, s[u] + 1 < F ? (K = 0, nt = s[u]) : s[u] >= F ? (K = U[s[u] - F], nt = B[s[u] - F]) : (K = 96, nt = 0), b = 1 << f - H, x = 1 << T, g = x;
    do
      x -= b, r[E + (k >> H) + x] = P << 24 | K << 16 | nt | 0;
    while (x !== 0);
    for (b = 1 << f - 1; k & b; )
      b >>= 1;
    if (b !== 0 ? (k &= b - 1, k += b) : k = 0, u++, --C[f] === 0) {
      if (f === p)
        break;
      f = e[n + s[u]];
    }
    if (f > d && (k & $) !== A) {
      for (H === 0 && (H = d), E += g, T = f - H, N = 1 << T; T + H < p && (N -= C[T + H], !(N <= 0)); )
        T++, N <<= 1;
      if (S += 1 << T, t === Jn && S > zr || t === Pr && S > Br)
        return 1;
      A = k & $, r[A] = d << 24 | T << 16 | E - a | 0;
    }
  }
  return k !== 0 && (r[E + k] = f - H << 24 | 64 << 16 | 0), o.bits = d, 0;
};
var Xe = jd;
const t0 = 0, Vs = 1, Us = 2, {
  Z_FINISH: Vr,
  Z_BLOCK: e0,
  Z_TREES: dn,
  Z_OK: Ee,
  Z_STREAM_END: n0,
  Z_NEED_DICT: i0,
  Z_STREAM_ERROR: Yt,
  Z_DATA_ERROR: Zs,
  Z_MEM_ERROR: qs,
  Z_BUF_ERROR: r0,
  Z_DEFLATED: Ur
} = Bs, Zn = 16180, Zr = 16181, qr = 16182, Gr = 16183, Wr = 16184, Xr = 16185, Yr = 16186, Kr = 16187, Jr = 16188, Qr = 16189, Fn = 16190, le = 16191, Qn = 16192, jr = 16193, jn = 16194, ta = 16195, ea = 16196, na = 16197, ia = 16198, pn = 16199, _n = 16200, ra = 16201, aa = 16202, sa = 16203, oa = 16204, la = 16205, ti = 16206, ca = 16207, fa = 16208, Dt = 16209, Gs = 16210, Ws = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, ua = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function c0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Ae = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Zn || e.mode > Ws ? 1 : 0;
}, Xs = (t) => {
  if (Ae(t))
    return Yt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Zn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(a0), e.distcode = e.distdyn = new Int32Array(s0), e.sane = 1, e.back = -1, Ee;
}, Ys = (t) => {
  if (Ae(t))
    return Yt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Xs(t);
}, Ks = (t, e) => {
  let n;
  if (Ae(t))
    return Yt;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Yt : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, Ys(t));
}, Js = (t, e) => {
  if (!t)
    return Yt;
  const n = new c0();
  t.state = n, n.strm = t, n.window = null, n.mode = Zn;
  const i = Ks(t, e);
  return i !== Ee && (t.state = null), i;
}, f0 = (t) => Js(t, l0);
let ha = !0, ei, ni;
const u0 = (t) => {
  if (ha) {
    ei = new Int32Array(512), ni = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (Xe(Vs, t.lens, 0, 288, ei, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    Xe(Us, t.lens, 0, 32, ni, 0, t.work, { bits: 5 }), ha = !1;
  }
  t.lencode = ei, t.lenbits = 9, t.distcode = ni, t.distbits = 5;
}, Qs = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, h0 = (t, e) => {
  let n, i, r, a, s, o, c, f, u, g, p, d, T, H, N = 0, S, k, b, x, A, $, E, B;
  const F = new Uint8Array(4);
  let C, y;
  const U = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Yt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, g = o, p = c, B = Ee;
  t:
    for (; ; )
      switch (n.mode) {
        case Zn:
          if (n.wrap === 0) {
            n.mode = Qn;
            break;
          }
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0), f = 0, u = 0, n.mode = Zr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = Dt;
            break;
          }
          if ((f & 15) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (f >>>= 4, u -= 4, E = (f & 15) + 8, n.wbits === 0 && (n.wbits = E), E > 15 || E > n.wbits) {
            t.msg = "invalid window size", n.mode = Dt;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Qr : le, f = 0, u = 0;
          break;
        case Zr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = Dt;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, F[2] = f >>> 16 & 255, F[3] = f >>> 24 & 255, n.check = ne(n.check, F, 4, 0)), f = 0, u = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0, n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 1024 && (d = n.length, d > o && (d = o), d && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + d
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, d, a)), o -= d, a += d, n.length -= d), n.length))
            break t;
          n.length = 0, n.mode = Yr;
        /* falls through */
        case Yr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            d = 0;
            do
              E = i[a + d++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && d < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, d, a)), o -= d, a += d, E)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Kr;
        /* falls through */
        case Kr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            d = 0;
            do
              E = i[a + d++], n.head && E && n.length < 65536 && (n.head.comment += String.fromCharCode(E));
            while (E && d < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, d, a)), o -= d, a += d, E)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          t.adler = n.check = ua(f), f = 0, u = 0, n.mode = Fn;
        /* falls through */
        case Fn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, i0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Qn:
          if (n.last) {
            f >>>= u & 7, u -= u & 7, n.mode = ti;
            break;
          }
          for (; u < 3; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          switch (n.last = f & 1, f >>>= 1, u -= 1, f & 3) {
            case 0:
              n.mode = jr;
              break;
            case 1:
              if (u0(n), n.mode = pn, e === dn) {
                f >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ea;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = Dt;
          }
          f >>>= 2, u -= 2;
          break;
        case jr:
          for (f >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = Dt;
            break;
          }
          if (n.length = f & 65535, f = 0, u = 0, n.mode = jn, e === dn)
            break t;
        /* falls through */
        case jn:
          n.mode = ta;
        /* falls through */
        case ta:
          if (d = n.length, d) {
            if (d > o && (d = o), d > c && (d = c), d === 0)
              break t;
            r.set(i.subarray(a, a + d), s), o -= d, a += d, c -= d, s += d, n.length -= d;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, u -= 5, n.ndist = (f & 31) + 1, f >>>= 5, u -= 5, n.ncode = (f & 15) + 4, f >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = Dt;
            break;
          }
          n.have = 0, n.mode = na;
        /* falls through */
        case na:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.lens[U[n.have++]] = f & 7, f >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[U[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, C = { bits: n.lenbits }, B = Xe(t0, n.lens, 0, 19, n.lencode, 0, n.work, C), n.lenbits = C.bits, B) {
            t.msg = "invalid code lengths set", n.mode = Dt;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; N = n.lencode[f & (1 << n.lenbits) - 1], S = N >>> 24, k = N >>> 16 & 255, b = N & 65535, !(S <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (b < 16)
              f >>>= S, u -= S, n.lens[n.have++] = b;
            else {
              if (b === 16) {
                for (y = S + 2; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                if (f >>>= S, u -= S, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = Dt;
                  break;
                }
                E = n.lens[n.have - 1], d = 3 + (f & 3), f >>>= 2, u -= 2;
              } else if (b === 17) {
                for (y = S + 3; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= S, u -= S, E = 0, d = 3 + (f & 7), f >>>= 3, u -= 3;
              } else {
                for (y = S + 7; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= S, u -= S, E = 0, d = 11 + (f & 127), f >>>= 7, u -= 7;
              }
              if (n.have + d > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = Dt;
                break;
              }
              for (; d--; )
                n.lens[n.have++] = E;
            }
          }
          if (n.mode === Dt)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = Dt;
            break;
          }
          if (n.lenbits = 9, C = { bits: n.lenbits }, B = Xe(Vs, n.lens, 0, n.nlen, n.lencode, 0, n.work, C), n.lenbits = C.bits, B) {
            t.msg = "invalid literal/lengths set", n.mode = Dt;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, C = { bits: n.distbits }, B = Xe(Us, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, C), n.distbits = C.bits, B) {
            t.msg = "invalid distances set", n.mode = Dt;
            break;
          }
          if (n.mode = pn, e === dn)
            break t;
        /* falls through */
        case pn:
          n.mode = _n;
        /* falls through */
        case _n:
          if (o >= 6 && c >= 258) {
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, Xd(t, p), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; N = n.lencode[f & (1 << n.lenbits) - 1], S = N >>> 24, k = N >>> 16 & 255, b = N & 65535, !(S <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (k && (k & 240) === 0) {
            for (x = S, A = k, $ = b; N = n.lencode[$ + ((f & (1 << x + A) - 1) >> x)], S = N >>> 24, k = N >>> 16 & 255, b = N & 65535, !(x + S <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= x, u -= x, n.back += x;
          }
          if (f >>>= S, u -= S, n.back += S, n.length = b, k === 0) {
            n.mode = la;
            break;
          }
          if (k & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (k & 64) {
            t.msg = "invalid literal/length code", n.mode = Dt;
            break;
          }
          n.extra = k & 15, n.mode = ra;
        /* falls through */
        case ra:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; N = n.distcode[f & (1 << n.distbits) - 1], S = N >>> 24, k = N >>> 16 & 255, b = N & 65535, !(S <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((k & 240) === 0) {
            for (x = S, A = k, $ = b; N = n.distcode[$ + ((f & (1 << x + A) - 1) >> x)], S = N >>> 24, k = N >>> 16 & 255, b = N & 65535, !(x + S <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= x, u -= x, n.back += x;
          }
          if (f >>>= S, u -= S, n.back += S, k & 64) {
            t.msg = "invalid distance code", n.mode = Dt;
            break;
          }
          n.offset = b, n.extra = k & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = Dt;
            break;
          }
          n.mode = oa;
        /* falls through */
        case oa:
          if (c === 0)
            break t;
          if (d = p - c, n.offset > d) {
            if (d = n.offset - d, d > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = Dt;
              break;
            }
            d > n.wnext ? (d -= n.wnext, T = n.wsize - d) : T = n.wnext - d, d > n.length && (d = n.length), H = n.window;
          } else
            H = r, T = s - n.offset, d = n.length;
          d > c && (d = c), c -= d, n.length -= d;
          do
            r[s++] = H[T++];
          while (--d);
          n.length === 0 && (n.mode = _n);
          break;
        case la:
          if (c === 0)
            break t;
          r[s++] = n.length, c--, n.mode = _n;
          break;
        case ti:
          if (n.wrap) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, f |= i[a++] << u, u += 8;
            }
            if (p -= c, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ne(n.check, r, p, s - p) : Oi(n.check, r, p, s - p)), p = c, n.wrap & 4 && (n.flags ? f : ua(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = fa;
        /* falls through */
        case fa:
          B = n0;
          break t;
        case Dt:
          B = Zs;
          break t;
        case Gs:
          return qs;
        case Ws:
        /* falls through */
        default:
          return Yt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, (n.wsize || p !== t.avail_out && n.mode < Dt && (n.mode < ti || e !== Vr)) && Qs(t, t.output, t.next_out, p - t.avail_out), g -= t.avail_in, p -= t.avail_out, t.total_in += g, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ne(n.check, r, p, t.next_out - p) : Oi(n.check, r, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (g === 0 && p === 0 || e === Vr) && B === Ee && (B = r0), B;
}, d0 = (t) => {
  if (Ae(t))
    return Yt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ee;
}, p0 = (t, e) => {
  if (Ae(t))
    return Yt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Yt : (n.head = e, e.done = !1, Ee);
}, _0 = (t, e) => {
  const n = e.length;
  let i, r, a;
  return Ae(t) || (i = t.state, i.wrap !== 0 && i.mode !== Fn) ? Yt : i.mode === Fn && (r = 1, r = Oi(r, e, n, 0), r !== i.check) ? Zs : (a = Qs(t, e, n, n), a ? (i.mode = Gs, qs) : (i.havedict = 1, Ee));
};
var g0 = Ys, m0 = Ks, v0 = Xs, w0 = f0, y0 = Js, b0 = h0, x0 = d0, k0 = p0, T0 = _0, E0 = "pako inflate (from Nodeca project)", ce = {
  inflateReset: g0,
  inflateReset2: m0,
  inflateResetKeep: v0,
  inflateInit: w0,
  inflateInit2: y0,
  inflate: b0,
  inflateEnd: x0,
  inflateGetHeader: k0,
  inflateSetDictionary: T0,
  inflateInfo: E0
};
function S0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var A0 = S0;
const js = Object.prototype.toString, {
  Z_NO_FLUSH: $0,
  Z_FINISH: N0,
  Z_OK: tn,
  Z_STREAM_END: ii,
  Z_NEED_DICT: ri,
  Z_STREAM_ERROR: I0,
  Z_DATA_ERROR: da,
  Z_MEM_ERROR: D0
} = Bs;
function qn(t) {
  this.options = Hs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gd(), this.strm.avail_out = 0;
  let n = ce.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== tn)
    throw new Error(Ci[n]);
  if (this.header = new A0(), ce.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Fi.string2buf(e.dictionary) : js.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = ce.inflateSetDictionary(this.strm, e.dictionary), n !== tn)))
    throw new Error(Ci[n]);
}
qn.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? N0 : $0, js.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = ce.inflate(n, s), a === ri && r && (a = ce.inflateSetDictionary(n, r), a === tn ? a = ce.inflate(n, s) : a === da && (a = ri)); n.avail_in > 0 && a === ii && n.state.wrap > 0 && t[n.next_in] !== 0; )
      ce.inflateReset(n), a = ce.inflate(n, s);
    switch (a) {
      case I0:
      case da:
      case ri:
      case D0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === ii))
      if (this.options.to === "string") {
        let c = Fi.utf8border(n.output, n.next_out), f = n.next_out - c, u = Fi.buf2string(n.output, c);
        n.next_out = f, n.avail_out = i - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(u);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === tn && o === 0)) {
      if (a === ii)
        return a = ce.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
qn.prototype.onData = function(t) {
  this.chunks.push(t);
};
qn.prototype.onEnd = function(t) {
  t === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Hs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function R0(t, e) {
  const n = new qn(e);
  if (n.push(t), n.err) throw n.msg || Ci[n.err];
  return n.result;
}
var M0 = R0, L0 = {
  inflate: M0
};
const { inflate: O0 } = L0;
var C0 = O0;
const F0 = { refName: "seq_id" }, z0 = { seq_id: "refName" };
class zn {
  constructor(e, n, i) {
    this.ncFeature = e, this.uniqueId = i || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (F0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return z0[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((i) => new zn(i, this)) : n;
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
        (a) => new zn(a, this).toJSON()
      ) : e[i] = r;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function B0(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function H0(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return B0(new Uint8Array(n)) ? C0(n) : n;
}
async function Tp({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const i = new xd({
    urlTemplate: t,
    baseUrl: e,
    readFile: H0
  }), r = [];
  for await (const a of i.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    r.push(new zn(a).toJSON());
  return r;
}
async function Ep({
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
const gn = {};
function pa(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class we {
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
          throw new Error(`${pa(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${pa(r)} fetching ${e}`, { cause: r });
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
      const c = await o.arrayBuffer(), f = o.headers.get("content-range"), u = /\/(\d+)$/.exec(f || "");
      return u != null && u[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(c.slice(0, e));
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
var ai = {}, _a;
function de() {
  return _a || (_a = 1, function(t) {
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
          for (var c in o)
            n(o, c) && (a[c] = o[c]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, s) {
      return a.length === s ? a : a.subarray ? a.subarray(0, s) : (a.length = s, a);
    };
    var i = {
      arraySet: function(a, s, o, c, f) {
        if (s.subarray && a.subarray) {
          a.set(s.subarray(o, o + c), f);
          return;
        }
        for (var u = 0; u < c; u++)
          a[f + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, c, f, u, g;
        for (c = 0, s = 0, o = a.length; s < o; s++)
          c += a[s].length;
        for (g = new Uint8Array(c), f = 0, s = 0, o = a.length; s < o; s++)
          u = a[s], g.set(u, f), f += u.length;
        return g;
      }
    }, r = {
      arraySet: function(a, s, o, c, f) {
        for (var u = 0; u < c; u++)
          a[f + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, r));
    }, t.setTyped(e);
  }(ai)), ai;
}
var Ne = {}, Kt = {}, _e = {}, ga;
function P0() {
  if (ga) return _e;
  ga = 1;
  var t = de(), e = 4, n = 0, i = 1, r = 2;
  function a(m) {
    for (var z = m.length; --z >= 0; )
      m[z] = 0;
  }
  var s = 0, o = 1, c = 2, f = 3, u = 258, g = 29, p = 256, d = p + 1 + g, T = 30, H = 19, N = 2 * d + 1, S = 15, k = 16, b = 7, x = 256, A = 16, $ = 17, E = 18, B = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), F = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), C = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], U = 512, P = new Array((d + 2) * 2);
  a(P);
  var K = new Array(T * 2);
  a(K);
  var nt = new Array(U);
  a(nt);
  var ct = new Array(u - f + 1);
  a(ct);
  var W = new Array(g);
  a(W);
  var j = new Array(T);
  a(j);
  function V(m, z, O, G, v) {
    this.static_tree = m, this.extra_bits = z, this.extra_base = O, this.elems = G, this.max_length = v, this.has_stree = m && m.length;
  }
  var it, Rt, J;
  function gt(m, z) {
    this.dyn_tree = m, this.max_code = 0, this.stat_desc = z;
  }
  function Et(m) {
    return m < 256 ? nt[m] : nt[256 + (m >>> 7)];
  }
  function dt(m, z) {
    m.pending_buf[m.pending++] = z & 255, m.pending_buf[m.pending++] = z >>> 8 & 255;
  }
  function Q(m, z, O) {
    m.bi_valid > k - O ? (m.bi_buf |= z << m.bi_valid & 65535, dt(m, m.bi_buf), m.bi_buf = z >> k - m.bi_valid, m.bi_valid += O - k) : (m.bi_buf |= z << m.bi_valid & 65535, m.bi_valid += O);
  }
  function lt(m, z, O) {
    Q(
      m,
      O[z * 2],
      O[z * 2 + 1]
      /*.Len*/
    );
  }
  function ft(m, z) {
    var O = 0;
    do
      O |= m & 1, m >>>= 1, O <<= 1;
    while (--z > 0);
    return O >>> 1;
  }
  function Tt(m) {
    m.bi_valid === 16 ? (dt(m, m.bi_buf), m.bi_buf = 0, m.bi_valid = 0) : m.bi_valid >= 8 && (m.pending_buf[m.pending++] = m.bi_buf & 255, m.bi_buf >>= 8, m.bi_valid -= 8);
  }
  function Nt(m, z) {
    var O = z.dyn_tree, G = z.max_code, v = z.stat_desc.static_tree, R = z.stat_desc.has_stree, h = z.stat_desc.extra_bits, M = z.stat_desc.extra_base, tt = z.stat_desc.max_length, l, D, L, _, w, I, et = 0;
    for (_ = 0; _ <= S; _++)
      m.bl_count[_] = 0;
    for (O[m.heap[m.heap_max] * 2 + 1] = 0, l = m.heap_max + 1; l < N; l++)
      D = m.heap[l], _ = O[O[D * 2 + 1] * 2 + 1] + 1, _ > tt && (_ = tt, et++), O[D * 2 + 1] = _, !(D > G) && (m.bl_count[_]++, w = 0, D >= M && (w = h[D - M]), I = O[D * 2], m.opt_len += I * (_ + w), R && (m.static_len += I * (v[D * 2 + 1] + w)));
    if (et !== 0) {
      do {
        for (_ = tt - 1; m.bl_count[_] === 0; )
          _--;
        m.bl_count[_]--, m.bl_count[_ + 1] += 2, m.bl_count[tt]--, et -= 2;
      } while (et > 0);
      for (_ = tt; _ !== 0; _--)
        for (D = m.bl_count[_]; D !== 0; )
          L = m.heap[--l], !(L > G) && (O[L * 2 + 1] !== _ && (m.opt_len += (_ - O[L * 2 + 1]) * O[L * 2], O[L * 2 + 1] = _), D--);
    }
  }
  function $t(m, z, O) {
    var G = new Array(S + 1), v = 0, R, h;
    for (R = 1; R <= S; R++)
      G[R] = v = v + O[R - 1] << 1;
    for (h = 0; h <= z; h++) {
      var M = m[h * 2 + 1];
      M !== 0 && (m[h * 2] = ft(G[M]++, M));
    }
  }
  function ot() {
    var m, z, O, G, v, R = new Array(S + 1);
    for (O = 0, G = 0; G < g - 1; G++)
      for (W[G] = O, m = 0; m < 1 << B[G]; m++)
        ct[O++] = G;
    for (ct[O - 1] = G, v = 0, G = 0; G < 16; G++)
      for (j[G] = v, m = 0; m < 1 << F[G]; m++)
        nt[v++] = G;
    for (v >>= 7; G < T; G++)
      for (j[G] = v << 7, m = 0; m < 1 << F[G] - 7; m++)
        nt[256 + v++] = G;
    for (z = 0; z <= S; z++)
      R[z] = 0;
    for (m = 0; m <= 143; )
      P[m * 2 + 1] = 8, m++, R[8]++;
    for (; m <= 255; )
      P[m * 2 + 1] = 9, m++, R[9]++;
    for (; m <= 279; )
      P[m * 2 + 1] = 7, m++, R[7]++;
    for (; m <= 287; )
      P[m * 2 + 1] = 8, m++, R[8]++;
    for ($t(P, d + 1, R), m = 0; m < T; m++)
      K[m * 2 + 1] = 5, K[m * 2] = ft(m, 5);
    it = new V(P, B, p + 1, d, S), Rt = new V(K, F, 0, T, S), J = new V(new Array(0), C, 0, H, b);
  }
  function rt(m) {
    var z;
    for (z = 0; z < d; z++)
      m.dyn_ltree[z * 2] = 0;
    for (z = 0; z < T; z++)
      m.dyn_dtree[z * 2] = 0;
    for (z = 0; z < H; z++)
      m.bl_tree[z * 2] = 0;
    m.dyn_ltree[x * 2] = 1, m.opt_len = m.static_len = 0, m.last_lit = m.matches = 0;
  }
  function kt(m) {
    m.bi_valid > 8 ? dt(m, m.bi_buf) : m.bi_valid > 0 && (m.pending_buf[m.pending++] = m.bi_buf), m.bi_buf = 0, m.bi_valid = 0;
  }
  function It(m, z, O, G) {
    kt(m), dt(m, O), dt(m, ~O), t.arraySet(m.pending_buf, m.window, z, O, m.pending), m.pending += O;
  }
  function at(m, z, O, G) {
    var v = z * 2, R = O * 2;
    return m[v] < m[R] || m[v] === m[R] && G[z] <= G[O];
  }
  function _t(m, z, O) {
    for (var G = m.heap[O], v = O << 1; v <= m.heap_len && (v < m.heap_len && at(z, m.heap[v + 1], m.heap[v], m.depth) && v++, !at(z, G, m.heap[v], m.depth)); )
      m.heap[O] = m.heap[v], O = v, v <<= 1;
    m.heap[O] = G;
  }
  function Z(m, z, O) {
    var G, v, R = 0, h, M;
    if (m.last_lit !== 0)
      do
        G = m.pending_buf[m.d_buf + R * 2] << 8 | m.pending_buf[m.d_buf + R * 2 + 1], v = m.pending_buf[m.l_buf + R], R++, G === 0 ? lt(m, v, z) : (h = ct[v], lt(m, h + p + 1, z), M = B[h], M !== 0 && (v -= W[h], Q(m, v, M)), G--, h = Et(G), lt(m, h, O), M = F[h], M !== 0 && (G -= j[h], Q(m, G, M)));
      while (R < m.last_lit);
    lt(m, x, z);
  }
  function bt(m, z) {
    var O = z.dyn_tree, G = z.stat_desc.static_tree, v = z.stat_desc.has_stree, R = z.stat_desc.elems, h, M, tt = -1, l;
    for (m.heap_len = 0, m.heap_max = N, h = 0; h < R; h++)
      O[h * 2] !== 0 ? (m.heap[++m.heap_len] = tt = h, m.depth[h] = 0) : O[h * 2 + 1] = 0;
    for (; m.heap_len < 2; )
      l = m.heap[++m.heap_len] = tt < 2 ? ++tt : 0, O[l * 2] = 1, m.depth[l] = 0, m.opt_len--, v && (m.static_len -= G[l * 2 + 1]);
    for (z.max_code = tt, h = m.heap_len >> 1; h >= 1; h--)
      _t(m, O, h);
    l = R;
    do
      h = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[
        1
        /*SMALLEST*/
      ] = m.heap[m.heap_len--], _t(
        m,
        O,
        1
        /*SMALLEST*/
      ), M = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[--m.heap_max] = h, m.heap[--m.heap_max] = M, O[l * 2] = O[h * 2] + O[M * 2], m.depth[l] = (m.depth[h] >= m.depth[M] ? m.depth[h] : m.depth[M]) + 1, O[h * 2 + 1] = O[M * 2 + 1] = l, m.heap[
        1
        /*SMALLEST*/
      ] = l++, _t(
        m,
        O,
        1
        /*SMALLEST*/
      );
    while (m.heap_len >= 2);
    m.heap[--m.heap_max] = m.heap[
      1
      /*SMALLEST*/
    ], Nt(m, z), $t(O, tt, m.bl_count);
  }
  function St(m, z, O) {
    var G, v = -1, R, h = z[0 * 2 + 1], M = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), z[(O + 1) * 2 + 1] = 65535, G = 0; G <= O; G++)
      R = h, h = z[(G + 1) * 2 + 1], !(++M < tt && R === h) && (M < l ? m.bl_tree[R * 2] += M : R !== 0 ? (R !== v && m.bl_tree[R * 2]++, m.bl_tree[A * 2]++) : M <= 10 ? m.bl_tree[$ * 2]++ : m.bl_tree[E * 2]++, M = 0, v = R, h === 0 ? (tt = 138, l = 3) : R === h ? (tt = 6, l = 3) : (tt = 7, l = 4));
  }
  function Bt(m, z, O) {
    var G, v = -1, R, h = z[0 * 2 + 1], M = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), G = 0; G <= O; G++)
      if (R = h, h = z[(G + 1) * 2 + 1], !(++M < tt && R === h)) {
        if (M < l)
          do
            lt(m, R, m.bl_tree);
          while (--M !== 0);
        else R !== 0 ? (R !== v && (lt(m, R, m.bl_tree), M--), lt(m, A, m.bl_tree), Q(m, M - 3, 2)) : M <= 10 ? (lt(m, $, m.bl_tree), Q(m, M - 3, 3)) : (lt(m, E, m.bl_tree), Q(m, M - 11, 7));
        M = 0, v = R, h === 0 ? (tt = 138, l = 3) : R === h ? (tt = 6, l = 3) : (tt = 7, l = 4);
      }
  }
  function st(m) {
    var z;
    for (St(m, m.dyn_ltree, m.l_desc.max_code), St(m, m.dyn_dtree, m.d_desc.max_code), bt(m, m.bl_desc), z = H - 1; z >= 3 && m.bl_tree[y[z] * 2 + 1] === 0; z--)
      ;
    return m.opt_len += 3 * (z + 1) + 5 + 5 + 4, z;
  }
  function pt(m, z, O, G) {
    var v;
    for (Q(m, z - 257, 5), Q(m, O - 1, 5), Q(m, G - 4, 4), v = 0; v < G; v++)
      Q(m, m.bl_tree[y[v] * 2 + 1], 3);
    Bt(m, m.dyn_ltree, z - 1), Bt(m, m.dyn_dtree, O - 1);
  }
  function ht(m) {
    var z = 4093624447, O;
    for (O = 0; O <= 31; O++, z >>>= 1)
      if (z & 1 && m.dyn_ltree[O * 2] !== 0)
        return n;
    if (m.dyn_ltree[9 * 2] !== 0 || m.dyn_ltree[10 * 2] !== 0 || m.dyn_ltree[13 * 2] !== 0)
      return i;
    for (O = 32; O < p; O++)
      if (m.dyn_ltree[O * 2] !== 0)
        return i;
    return n;
  }
  var ut = !1;
  function Ft(m) {
    ut || (ot(), ut = !0), m.l_desc = new gt(m.dyn_ltree, it), m.d_desc = new gt(m.dyn_dtree, Rt), m.bl_desc = new gt(m.bl_tree, J), m.bi_buf = 0, m.bi_valid = 0, rt(m);
  }
  function q(m, z, O, G) {
    Q(m, (s << 1) + (G ? 1 : 0), 3), It(m, z, O);
  }
  function wt(m) {
    Q(m, o << 1, 3), lt(m, x, P), Tt(m);
  }
  function yt(m, z, O, G) {
    var v, R, h = 0;
    m.level > 0 ? (m.strm.data_type === r && (m.strm.data_type = ht(m)), bt(m, m.l_desc), bt(m, m.d_desc), h = st(m), v = m.opt_len + 3 + 7 >>> 3, R = m.static_len + 3 + 7 >>> 3, R <= v && (v = R)) : v = R = O + 5, O + 4 <= v && z !== -1 ? q(m, z, O, G) : m.strategy === e || R === v ? (Q(m, (o << 1) + (G ? 1 : 0), 3), Z(m, P, K)) : (Q(m, (c << 1) + (G ? 1 : 0), 3), pt(m, m.l_desc.max_code + 1, m.d_desc.max_code + 1, h + 1), Z(m, m.dyn_ltree, m.dyn_dtree)), rt(m), G && kt(m);
  }
  function xt(m, z, O) {
    return m.pending_buf[m.d_buf + m.last_lit * 2] = z >>> 8 & 255, m.pending_buf[m.d_buf + m.last_lit * 2 + 1] = z & 255, m.pending_buf[m.l_buf + m.last_lit] = O & 255, m.last_lit++, z === 0 ? m.dyn_ltree[O * 2]++ : (m.matches++, z--, m.dyn_ltree[(ct[O] + p + 1) * 2]++, m.dyn_dtree[Et(z) * 2]++), m.last_lit === m.lit_bufsize - 1;
  }
  return _e._tr_init = Ft, _e._tr_stored_block = q, _e._tr_flush_block = yt, _e._tr_tally = xt, _e._tr_align = wt, _e;
}
var si, ma;
function to() {
  if (ma) return si;
  ma = 1;
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
  return si = t, si;
}
var oi, va;
function eo() {
  if (va) return oi;
  va = 1;
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
    var o = e, c = s + a;
    i ^= -1;
    for (var f = s; f < c; f++)
      i = i >>> 8 ^ o[(i ^ r[f]) & 255];
    return i ^ -1;
  }
  return oi = n, oi;
}
var li, wa;
function ir() {
  return wa || (wa = 1, li = {
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
  }), li;
}
var ya;
function V0() {
  if (ya) return Kt;
  ya = 1;
  var t = de(), e = P0(), n = to(), i = eo(), r = ir(), a = 0, s = 1, o = 3, c = 4, f = 5, u = 0, g = 1, p = -2, d = -3, T = -5, H = -1, N = 1, S = 2, k = 3, b = 4, x = 0, A = 2, $ = 8, E = 9, B = 15, F = 8, C = 29, y = 256, U = y + 1 + C, P = 30, K = 19, nt = 2 * U + 1, ct = 15, W = 3, j = 258, V = j + W + 1, it = 32, Rt = 42, J = 69, gt = 73, Et = 91, dt = 103, Q = 113, lt = 666, ft = 1, Tt = 2, Nt = 3, $t = 4, ot = 3;
  function rt(l, D) {
    return l.msg = r[D], D;
  }
  function kt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function It(l) {
    for (var D = l.length; --D >= 0; )
      l[D] = 0;
  }
  function at(l) {
    var D = l.state, L = D.pending;
    L > l.avail_out && (L = l.avail_out), L !== 0 && (t.arraySet(l.output, D.pending_buf, D.pending_out, L, l.next_out), l.next_out += L, D.pending_out += L, l.total_out += L, l.avail_out -= L, D.pending -= L, D.pending === 0 && (D.pending_out = 0));
  }
  function _t(l, D) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, D), l.block_start = l.strstart, at(l.strm);
  }
  function Z(l, D) {
    l.pending_buf[l.pending++] = D;
  }
  function bt(l, D) {
    l.pending_buf[l.pending++] = D >>> 8 & 255, l.pending_buf[l.pending++] = D & 255;
  }
  function St(l, D, L, _) {
    var w = l.avail_in;
    return w > _ && (w = _), w === 0 ? 0 : (l.avail_in -= w, t.arraySet(D, l.input, l.next_in, w, L), l.state.wrap === 1 ? l.adler = n(l.adler, D, w, L) : l.state.wrap === 2 && (l.adler = i(l.adler, D, w, L)), l.next_in += w, l.total_in += w, w);
  }
  function Bt(l, D) {
    var L = l.max_chain_length, _ = l.strstart, w, I, et = l.prev_length, X = l.nice_match, Y = l.strstart > l.w_size - V ? l.strstart - (l.w_size - V) : 0, mt = l.window, ae = l.w_mask, Mt = l.prev, vt = l.strstart + j, zt = mt[_ + et - 1], Pt = mt[_ + et];
    l.prev_length >= l.good_match && (L >>= 2), X > l.lookahead && (X = l.lookahead);
    do
      if (w = D, !(mt[w + et] !== Pt || mt[w + et - 1] !== zt || mt[w] !== mt[_] || mt[++w] !== mt[_ + 1])) {
        _ += 2, w++;
        do
          ;
        while (mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && mt[++_] === mt[++w] && _ < vt);
        if (I = j - (vt - _), _ = vt - j, I > et) {
          if (l.match_start = D, et = I, I >= X)
            break;
          zt = mt[_ + et - 1], Pt = mt[_ + et];
        }
      }
    while ((D = Mt[D & ae]) > Y && --L !== 0);
    return et <= l.lookahead ? et : l.lookahead;
  }
  function st(l) {
    var D = l.w_size, L, _, w, I, et;
    do {
      if (I = l.window_size - l.lookahead - l.strstart, l.strstart >= D + (D - V)) {
        t.arraySet(l.window, l.window, D, D, 0), l.match_start -= D, l.strstart -= D, l.block_start -= D, _ = l.hash_size, L = _;
        do
          w = l.head[--L], l.head[L] = w >= D ? w - D : 0;
        while (--_);
        _ = D, L = _;
        do
          w = l.prev[--L], l.prev[L] = w >= D ? w - D : 0;
        while (--_);
        I += D;
      }
      if (l.strm.avail_in === 0)
        break;
      if (_ = St(l.strm, l.window, l.strstart + l.lookahead, I), l.lookahead += _, l.lookahead + l.insert >= W)
        for (et = l.strstart - l.insert, l.ins_h = l.window[et], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + W - 1]) & l.hash_mask, l.prev[et & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = et, et++, l.insert--, !(l.lookahead + l.insert < W)); )
          ;
    } while (l.lookahead < V && l.strm.avail_in !== 0);
  }
  function pt(l, D) {
    var L = 65535;
    for (L > l.pending_buf_size - 5 && (L = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (st(l), l.lookahead === 0 && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var _ = l.block_start + L;
      if ((l.strstart === 0 || l.strstart >= _) && (l.lookahead = l.strstart - _, l.strstart = _, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - V && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ft);
  }
  function ht(l, D) {
    for (var L, _; ; ) {
      if (l.lookahead < V) {
        if (st(l), l.lookahead < V && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (L = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, L = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), L !== 0 && l.strstart - L <= l.w_size - V && (l.match_length = Bt(l, L)), l.match_length >= W)
        if (_ = e._tr_tally(l, l.strstart - l.match_start, l.match_length - W), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= W) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, L = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        _ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (_ && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = l.strstart < W - 1 ? l.strstart : W - 1, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function ut(l, D) {
    for (var L, _, w; ; ) {
      if (l.lookahead < V) {
        if (st(l), l.lookahead < V && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (L = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, L = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = W - 1, L !== 0 && l.prev_length < l.max_lazy_match && l.strstart - L <= l.w_size - V && (l.match_length = Bt(l, L), l.match_length <= 5 && (l.strategy === N || l.match_length === W && l.strstart - l.match_start > 4096) && (l.match_length = W - 1)), l.prev_length >= W && l.match_length <= l.prev_length) {
        w = l.strstart + l.lookahead - W, _ = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - W), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= w && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, L = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = W - 1, l.strstart++, _ && (_t(l, !1), l.strm.avail_out === 0))
          return ft;
      } else if (l.match_available) {
        if (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), _ && _t(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ft;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < W - 1 ? l.strstart : W - 1, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function Ft(l, D) {
    for (var L, _, w, I, et = l.window; ; ) {
      if (l.lookahead <= j) {
        if (st(l), l.lookahead <= j && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= W && l.strstart > 0 && (w = l.strstart - 1, _ = et[w], _ === et[++w] && _ === et[++w] && _ === et[++w])) {
        I = l.strstart + j;
        do
          ;
        while (_ === et[++w] && _ === et[++w] && _ === et[++w] && _ === et[++w] && _ === et[++w] && _ === et[++w] && _ === et[++w] && _ === et[++w] && w < I);
        l.match_length = j - (I - w), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= W ? (L = e._tr_tally(l, 1, l.match_length - W), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (L = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), L && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function q(l, D) {
    for (var L; ; ) {
      if (l.lookahead === 0 && (st(l), l.lookahead === 0)) {
        if (D === a)
          return ft;
        break;
      }
      if (l.match_length = 0, L = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, L && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function wt(l, D, L, _, w) {
    this.good_length = l, this.max_lazy = D, this.nice_length = L, this.max_chain = _, this.func = w;
  }
  var yt;
  yt = [
    /*      good lazy nice chain */
    new wt(0, 0, 0, 0, pt),
    /* 0 store only */
    new wt(4, 4, 8, 4, ht),
    /* 1 max speed, no lazy matches */
    new wt(4, 5, 16, 8, ht),
    /* 2 */
    new wt(4, 6, 32, 32, ht),
    /* 3 */
    new wt(4, 4, 16, 16, ut),
    /* 4 lazy matches */
    new wt(8, 16, 32, 32, ut),
    /* 5 */
    new wt(8, 16, 128, 128, ut),
    /* 6 */
    new wt(8, 32, 128, 256, ut),
    /* 7 */
    new wt(32, 128, 258, 1024, ut),
    /* 8 */
    new wt(32, 258, 258, 4096, ut)
    /* 9 max compression */
  ];
  function xt(l) {
    l.window_size = 2 * l.w_size, It(l.head), l.max_lazy_match = yt[l.level].max_lazy, l.good_match = yt[l.level].good_length, l.nice_match = yt[l.level].nice_length, l.max_chain_length = yt[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = W - 1, l.match_available = 0, l.ins_h = 0;
  }
  function m() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(nt * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * K + 1) * 2), It(this.dyn_ltree), It(this.dyn_dtree), It(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ct + 1), this.heap = new t.Buf16(2 * U + 1), It(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * U + 1), It(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function z(l) {
    var D;
    return !l || !l.state ? rt(l, p) : (l.total_in = l.total_out = 0, l.data_type = A, D = l.state, D.pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? Rt : Q, l.adler = D.wrap === 2 ? 0 : 1, D.last_flush = a, e._tr_init(D), u);
  }
  function O(l) {
    var D = z(l);
    return D === u && xt(l.state), D;
  }
  function G(l, D) {
    return !l || !l.state || l.state.wrap !== 2 ? p : (l.state.gzhead = D, u);
  }
  function v(l, D, L, _, w, I) {
    if (!l)
      return p;
    var et = 1;
    if (D === H && (D = 6), _ < 0 ? (et = 0, _ = -_) : _ > 15 && (et = 2, _ -= 16), w < 1 || w > E || L !== $ || _ < 8 || _ > 15 || D < 0 || D > 9 || I < 0 || I > b)
      return rt(l, p);
    _ === 8 && (_ = 9);
    var X = new m();
    return l.state = X, X.strm = l, X.wrap = et, X.gzhead = null, X.w_bits = _, X.w_size = 1 << X.w_bits, X.w_mask = X.w_size - 1, X.hash_bits = w + 7, X.hash_size = 1 << X.hash_bits, X.hash_mask = X.hash_size - 1, X.hash_shift = ~~((X.hash_bits + W - 1) / W), X.window = new t.Buf8(X.w_size * 2), X.head = new t.Buf16(X.hash_size), X.prev = new t.Buf16(X.w_size), X.lit_bufsize = 1 << w + 6, X.pending_buf_size = X.lit_bufsize * 4, X.pending_buf = new t.Buf8(X.pending_buf_size), X.d_buf = 1 * X.lit_bufsize, X.l_buf = 3 * X.lit_bufsize, X.level = D, X.strategy = I, X.method = L, O(l);
  }
  function R(l, D) {
    return v(l, D, $, B, F, x);
  }
  function h(l, D) {
    var L, _, w, I;
    if (!l || !l.state || D > f || D < 0)
      return l ? rt(l, p) : p;
    if (_ = l.state, !l.output || !l.input && l.avail_in !== 0 || _.status === lt && D !== c)
      return rt(l, l.avail_out === 0 ? T : p);
    if (_.strm = l, L = _.last_flush, _.last_flush = D, _.status === Rt)
      if (_.wrap === 2)
        l.adler = 0, Z(_, 31), Z(_, 139), Z(_, 8), _.gzhead ? (Z(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), Z(_, _.gzhead.time & 255), Z(_, _.gzhead.time >> 8 & 255), Z(_, _.gzhead.time >> 16 & 255), Z(_, _.gzhead.time >> 24 & 255), Z(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), Z(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (Z(_, _.gzhead.extra.length & 255), Z(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (l.adler = i(l.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = J) : (Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), Z(_, ot), _.status = Q);
      else {
        var et = $ + (_.w_bits - 8 << 4) << 8, X = -1;
        _.strategy >= S || _.level < 2 ? X = 0 : _.level < 6 ? X = 1 : _.level === 6 ? X = 2 : X = 3, et |= X << 6, _.strstart !== 0 && (et |= it), et += 31 - et % 31, _.status = Q, bt(_, et), _.strstart !== 0 && (bt(_, l.adler >>> 16), bt(_, l.adler & 65535)), l.adler = 1;
      }
    if (_.status === J)
      if (_.gzhead.extra) {
        for (w = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), at(l), w = _.pending, _.pending === _.pending_buf_size)); )
          Z(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = gt);
      } else
        _.status = gt;
    if (_.status === gt)
      if (_.gzhead.name) {
        w = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), at(l), w = _.pending, _.pending === _.pending_buf_size)) {
            I = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? I = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : I = 0, Z(_, I);
        } while (I !== 0);
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), I === 0 && (_.gzindex = 0, _.status = Et);
      } else
        _.status = Et;
    if (_.status === Et)
      if (_.gzhead.comment) {
        w = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), at(l), w = _.pending, _.pending === _.pending_buf_size)) {
            I = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? I = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : I = 0, Z(_, I);
        } while (I !== 0);
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), I === 0 && (_.status = dt);
      } else
        _.status = dt;
    if (_.status === dt && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && at(l), _.pending + 2 <= _.pending_buf_size && (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), l.adler = 0, _.status = Q)) : _.status = Q), _.pending !== 0) {
      if (at(l), l.avail_out === 0)
        return _.last_flush = -1, u;
    } else if (l.avail_in === 0 && kt(D) <= kt(L) && D !== c)
      return rt(l, T);
    if (_.status === lt && l.avail_in !== 0)
      return rt(l, T);
    if (l.avail_in !== 0 || _.lookahead !== 0 || D !== a && _.status !== lt) {
      var Y = _.strategy === S ? q(_, D) : _.strategy === k ? Ft(_, D) : yt[_.level].func(_, D);
      if ((Y === Nt || Y === $t) && (_.status = lt), Y === ft || Y === Nt)
        return l.avail_out === 0 && (_.last_flush = -1), u;
      if (Y === Tt && (D === s ? e._tr_align(_) : D !== f && (e._tr_stored_block(_, 0, 0, !1), D === o && (It(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), at(l), l.avail_out === 0))
        return _.last_flush = -1, u;
    }
    return D !== c ? u : _.wrap <= 0 ? g : (_.wrap === 2 ? (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), Z(_, l.adler >> 16 & 255), Z(_, l.adler >> 24 & 255), Z(_, l.total_in & 255), Z(_, l.total_in >> 8 & 255), Z(_, l.total_in >> 16 & 255), Z(_, l.total_in >> 24 & 255)) : (bt(_, l.adler >>> 16), bt(_, l.adler & 65535)), at(l), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? u : g);
  }
  function M(l) {
    var D;
    return !l || !l.state ? p : (D = l.state.status, D !== Rt && D !== J && D !== gt && D !== Et && D !== dt && D !== Q && D !== lt ? rt(l, p) : (l.state = null, D === Q ? rt(l, d) : u));
  }
  function tt(l, D) {
    var L = D.length, _, w, I, et, X, Y, mt, ae;
    if (!l || !l.state || (_ = l.state, et = _.wrap, et === 2 || et === 1 && _.status !== Rt || _.lookahead))
      return p;
    for (et === 1 && (l.adler = n(l.adler, D, L, 0)), _.wrap = 0, L >= _.w_size && (et === 0 && (It(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), ae = new t.Buf8(_.w_size), t.arraySet(ae, D, L - _.w_size, _.w_size, 0), D = ae, L = _.w_size), X = l.avail_in, Y = l.next_in, mt = l.input, l.avail_in = L, l.next_in = 0, l.input = D, st(_); _.lookahead >= W; ) {
      w = _.strstart, I = _.lookahead - (W - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[w + W - 1]) & _.hash_mask, _.prev[w & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = w, w++;
      while (--I);
      _.strstart = w, _.lookahead = W - 1, st(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = W - 1, _.match_available = 0, l.next_in = Y, l.input = mt, l.avail_in = X, _.wrap = et, u;
  }
  return Kt.deflateInit = R, Kt.deflateInit2 = v, Kt.deflateReset = O, Kt.deflateResetKeep = z, Kt.deflateSetHeader = G, Kt.deflate = h, Kt.deflateEnd = M, Kt.deflateSetDictionary = tt, Kt.deflateInfo = "pako deflate (from Nodeca project)", Kt;
}
var ge = {}, ba;
function no() {
  if (ba) return ge;
  ba = 1;
  var t = de(), e = !0, n = !0;
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
  i[254] = i[254] = 1, ge.string2buf = function(s) {
    var o, c, f, u, g, p = s.length, d = 0;
    for (u = 0; u < p; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), d += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (o = new t.Buf8(d), g = 0, u = 0; g < d; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), c < 128 ? o[g++] = c : c < 2048 ? (o[g++] = 192 | c >>> 6, o[g++] = 128 | c & 63) : c < 65536 ? (o[g++] = 224 | c >>> 12, o[g++] = 128 | c >>> 6 & 63, o[g++] = 128 | c & 63) : (o[g++] = 240 | c >>> 18, o[g++] = 128 | c >>> 12 & 63, o[g++] = 128 | c >>> 6 & 63, o[g++] = 128 | c & 63);
    return o;
  };
  function a(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var c = "", f = 0; f < o; f++)
      c += String.fromCharCode(s[f]);
    return c;
  }
  return ge.buf2binstring = function(s) {
    return a(s, s.length);
  }, ge.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), c = 0, f = o.length; c < f; c++)
      o[c] = s.charCodeAt(c);
    return o;
  }, ge.buf2string = function(s, o) {
    var c, f, u, g, p = o || s.length, d = new Array(p * 2);
    for (f = 0, c = 0; c < p; ) {
      if (u = s[c++], u < 128) {
        d[f++] = u;
        continue;
      }
      if (g = i[u], g > 4) {
        d[f++] = 65533, c += g - 1;
        continue;
      }
      for (u &= g === 2 ? 31 : g === 3 ? 15 : 7; g > 1 && c < p; )
        u = u << 6 | s[c++] & 63, g--;
      if (g > 1) {
        d[f++] = 65533;
        continue;
      }
      u < 65536 ? d[f++] = u : (u -= 65536, d[f++] = 55296 | u >> 10 & 1023, d[f++] = 56320 | u & 1023);
    }
    return a(d, f);
  }, ge.utf8border = function(s, o) {
    var c;
    for (o = o || s.length, o > s.length && (o = s.length), c = o - 1; c >= 0 && (s[c] & 192) === 128; )
      c--;
    return c < 0 || c === 0 ? o : c + i[s[c]] > o ? c : o;
  }, ge;
}
var ci, xa;
function io() {
  if (xa) return ci;
  xa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return ci = t, ci;
}
var ka;
function U0() {
  if (ka) return Ne;
  ka = 1;
  var t = V0(), e = de(), n = no(), i = ir(), r = io(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, u = 2, g = -1, p = 0, d = 8;
  function T(k) {
    if (!(this instanceof T)) return new T(k);
    this.options = e.assign({
      level: g,
      method: d,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, k || {});
    var b = this.options;
    b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var x = t.deflateInit2(
      this.strm,
      b.level,
      b.method,
      b.windowBits,
      b.memLevel,
      b.strategy
    );
    if (x !== c)
      throw new Error(i[x]);
    if (b.header && t.deflateSetHeader(this.strm, b.header), b.dictionary) {
      var A;
      if (typeof b.dictionary == "string" ? A = n.string2buf(b.dictionary) : a.call(b.dictionary) === "[object ArrayBuffer]" ? A = new Uint8Array(b.dictionary) : A = b.dictionary, x = t.deflateSetDictionary(this.strm, A), x !== c)
        throw new Error(i[x]);
      this._dict_set = !0;
    }
  }
  T.prototype.push = function(k, b) {
    var x = this.strm, A = this.options.chunkSize, $, E;
    if (this.ended)
      return !1;
    E = b === ~~b ? b : b === !0 ? o : s, typeof k == "string" ? x.input = n.string2buf(k) : a.call(k) === "[object ArrayBuffer]" ? x.input = new Uint8Array(k) : x.input = k, x.next_in = 0, x.avail_in = x.input.length;
    do {
      if (x.avail_out === 0 && (x.output = new e.Buf8(A), x.next_out = 0, x.avail_out = A), $ = t.deflate(x, E), $ !== f && $ !== c)
        return this.onEnd($), this.ended = !0, !1;
      (x.avail_out === 0 || x.avail_in === 0 && (E === o || E === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(x.output, x.next_out))) : this.onData(e.shrinkBuf(x.output, x.next_out)));
    } while ((x.avail_in > 0 || x.avail_out === 0) && $ !== f);
    return E === o ? ($ = t.deflateEnd(this.strm), this.onEnd($), this.ended = !0, $ === c) : (E === u && (this.onEnd(c), x.avail_out = 0), !0);
  }, T.prototype.onData = function(k) {
    this.chunks.push(k);
  }, T.prototype.onEnd = function(k) {
    k === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = k, this.msg = this.strm.msg;
  };
  function H(k, b) {
    var x = new T(b);
    if (x.push(k, !0), x.err)
      throw x.msg || i[x.err];
    return x.result;
  }
  function N(k, b) {
    return b = b || {}, b.raw = !0, H(k, b);
  }
  function S(k, b) {
    return b = b || {}, b.gzip = !0, H(k, b);
  }
  return Ne.Deflate = T, Ne.deflate = H, Ne.deflateRaw = N, Ne.gzip = S, Ne;
}
var Ie = {}, Wt = {}, fi, Ta;
function Z0() {
  if (Ta) return fi;
  Ta = 1;
  var t = 30, e = 12;
  return fi = function(i, r) {
    var a, s, o, c, f, u, g, p, d, T, H, N, S, k, b, x, A, $, E, B, F, C, y, U, P;
    a = i.state, s = i.next_in, U = i.input, o = s + (i.avail_in - 5), c = i.next_out, P = i.output, f = c - (r - i.avail_out), u = c + (i.avail_out - 257), g = a.dmax, p = a.wsize, d = a.whave, T = a.wnext, H = a.window, N = a.hold, S = a.bits, k = a.lencode, b = a.distcode, x = (1 << a.lenbits) - 1, A = (1 << a.distbits) - 1;
    t:
      do {
        S < 15 && (N += U[s++] << S, S += 8, N += U[s++] << S, S += 8), $ = k[N & x];
        e:
          for (; ; ) {
            if (E = $ >>> 24, N >>>= E, S -= E, E = $ >>> 16 & 255, E === 0)
              P[c++] = $ & 65535;
            else if (E & 16) {
              B = $ & 65535, E &= 15, E && (S < E && (N += U[s++] << S, S += 8), B += N & (1 << E) - 1, N >>>= E, S -= E), S < 15 && (N += U[s++] << S, S += 8, N += U[s++] << S, S += 8), $ = b[N & A];
              n:
                for (; ; ) {
                  if (E = $ >>> 24, N >>>= E, S -= E, E = $ >>> 16 & 255, E & 16) {
                    if (F = $ & 65535, E &= 15, S < E && (N += U[s++] << S, S += 8, S < E && (N += U[s++] << S, S += 8)), F += N & (1 << E) - 1, F > g) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (N >>>= E, S -= E, E = c - f, F > E) {
                      if (E = F - E, E > d && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (C = 0, y = H, T === 0) {
                        if (C += p - E, E < B) {
                          B -= E;
                          do
                            P[c++] = H[C++];
                          while (--E);
                          C = c - F, y = P;
                        }
                      } else if (T < E) {
                        if (C += p + T - E, E -= T, E < B) {
                          B -= E;
                          do
                            P[c++] = H[C++];
                          while (--E);
                          if (C = 0, T < B) {
                            E = T, B -= E;
                            do
                              P[c++] = H[C++];
                            while (--E);
                            C = c - F, y = P;
                          }
                        }
                      } else if (C += T - E, E < B) {
                        B -= E;
                        do
                          P[c++] = H[C++];
                        while (--E);
                        C = c - F, y = P;
                      }
                      for (; B > 2; )
                        P[c++] = y[C++], P[c++] = y[C++], P[c++] = y[C++], B -= 3;
                      B && (P[c++] = y[C++], B > 1 && (P[c++] = y[C++]));
                    } else {
                      C = c - F;
                      do
                        P[c++] = P[C++], P[c++] = P[C++], P[c++] = P[C++], B -= 3;
                      while (B > 2);
                      B && (P[c++] = P[C++], B > 1 && (P[c++] = P[C++]));
                    }
                  } else if ((E & 64) === 0) {
                    $ = b[($ & 65535) + (N & (1 << E) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((E & 64) === 0) {
              $ = k[($ & 65535) + (N & (1 << E) - 1)];
              continue e;
            } else if (E & 32) {
              a.mode = e;
              break t;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && c < u);
    B = S >> 3, s -= B, S -= B << 3, N &= (1 << S) - 1, i.next_in = s, i.next_out = c, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = c < u ? 257 + (u - c) : 257 - (c - u), a.hold = N, a.bits = S;
  }, fi;
}
var ui, Ea;
function q0() {
  if (Ea) return ui;
  Ea = 1;
  var t = de(), e = 15, n = 852, i = 592, r = 0, a = 1, s = 2, o = [
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
  ], c = [
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
  ], f = [
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
  return ui = function(p, d, T, H, N, S, k, b) {
    var x = b.bits, A = 0, $ = 0, E = 0, B = 0, F = 0, C = 0, y = 0, U = 0, P = 0, K = 0, nt, ct, W, j, V, it = null, Rt = 0, J, gt = new t.Buf16(e + 1), Et = new t.Buf16(e + 1), dt = null, Q = 0, lt, ft, Tt;
    for (A = 0; A <= e; A++)
      gt[A] = 0;
    for ($ = 0; $ < H; $++)
      gt[d[T + $]]++;
    for (F = x, B = e; B >= 1 && gt[B] === 0; B--)
      ;
    if (F > B && (F = B), B === 0)
      return N[S++] = 1 << 24 | 64 << 16 | 0, N[S++] = 1 << 24 | 64 << 16 | 0, b.bits = 1, 0;
    for (E = 1; E < B && gt[E] === 0; E++)
      ;
    for (F < E && (F = E), U = 1, A = 1; A <= e; A++)
      if (U <<= 1, U -= gt[A], U < 0)
        return -1;
    if (U > 0 && (p === r || B !== 1))
      return -1;
    for (Et[1] = 0, A = 1; A < e; A++)
      Et[A + 1] = Et[A] + gt[A];
    for ($ = 0; $ < H; $++)
      d[T + $] !== 0 && (k[Et[d[T + $]]++] = $);
    if (p === r ? (it = dt = k, J = 19) : p === a ? (it = o, Rt -= 257, dt = c, Q -= 257, J = 256) : (it = f, dt = u, J = -1), K = 0, $ = 0, A = E, V = S, C = F, y = 0, W = -1, P = 1 << F, j = P - 1, p === a && P > n || p === s && P > i)
      return 1;
    for (; ; ) {
      lt = A - y, k[$] < J ? (ft = 0, Tt = k[$]) : k[$] > J ? (ft = dt[Q + k[$]], Tt = it[Rt + k[$]]) : (ft = 96, Tt = 0), nt = 1 << A - y, ct = 1 << C, E = ct;
      do
        ct -= nt, N[V + (K >> y) + ct] = lt << 24 | ft << 16 | Tt | 0;
      while (ct !== 0);
      for (nt = 1 << A - 1; K & nt; )
        nt >>= 1;
      if (nt !== 0 ? (K &= nt - 1, K += nt) : K = 0, $++, --gt[A] === 0) {
        if (A === B)
          break;
        A = d[T + k[$]];
      }
      if (A > F && (K & j) !== W) {
        for (y === 0 && (y = F), V += E, C = A - y, U = 1 << C; C + y < B && (U -= gt[C + y], !(U <= 0)); )
          C++, U <<= 1;
        if (P += 1 << C, p === a && P > n || p === s && P > i)
          return 1;
        W = K & j, N[W] = F << 24 | C << 16 | V - S | 0;
      }
    }
    return K !== 0 && (N[V + K] = A - y << 24 | 64 << 16 | 0), b.bits = F, 0;
  }, ui;
}
var Sa;
function G0() {
  if (Sa) return Wt;
  Sa = 1;
  var t = de(), e = to(), n = eo(), i = Z0(), r = q0(), a = 0, s = 1, o = 2, c = 4, f = 5, u = 6, g = 0, p = 1, d = 2, T = -2, H = -3, N = -4, S = -5, k = 8, b = 1, x = 2, A = 3, $ = 4, E = 5, B = 6, F = 7, C = 8, y = 9, U = 10, P = 11, K = 12, nt = 13, ct = 14, W = 15, j = 16, V = 17, it = 18, Rt = 19, J = 20, gt = 21, Et = 22, dt = 23, Q = 24, lt = 25, ft = 26, Tt = 27, Nt = 28, $t = 29, ot = 30, rt = 31, kt = 32, It = 852, at = 592, _t = 15, Z = _t;
  function bt(v) {
    return (v >>> 24 & 255) + (v >>> 8 & 65280) + ((v & 65280) << 8) + ((v & 255) << 24);
  }
  function St() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Bt(v) {
    var R;
    return !v || !v.state ? T : (R = v.state, v.total_in = v.total_out = R.total = 0, v.msg = "", R.wrap && (v.adler = R.wrap & 1), R.mode = b, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new t.Buf32(It), R.distcode = R.distdyn = new t.Buf32(at), R.sane = 1, R.back = -1, g);
  }
  function st(v) {
    var R;
    return !v || !v.state ? T : (R = v.state, R.wsize = 0, R.whave = 0, R.wnext = 0, Bt(v));
  }
  function pt(v, R) {
    var h, M;
    return !v || !v.state || (M = v.state, R < 0 ? (h = 0, R = -R) : (h = (R >> 4) + 1, R < 48 && (R &= 15)), R && (R < 8 || R > 15)) ? T : (M.window !== null && M.wbits !== R && (M.window = null), M.wrap = h, M.wbits = R, st(v));
  }
  function ht(v, R) {
    var h, M;
    return v ? (M = new St(), v.state = M, M.window = null, h = pt(v, R), h !== g && (v.state = null), h) : T;
  }
  function ut(v) {
    return ht(v, Z);
  }
  var Ft = !0, q, wt;
  function yt(v) {
    if (Ft) {
      var R;
      for (q = new t.Buf32(512), wt = new t.Buf32(32), R = 0; R < 144; )
        v.lens[R++] = 8;
      for (; R < 256; )
        v.lens[R++] = 9;
      for (; R < 280; )
        v.lens[R++] = 7;
      for (; R < 288; )
        v.lens[R++] = 8;
      for (r(s, v.lens, 0, 288, q, 0, v.work, { bits: 9 }), R = 0; R < 32; )
        v.lens[R++] = 5;
      r(o, v.lens, 0, 32, wt, 0, v.work, { bits: 5 }), Ft = !1;
    }
    v.lencode = q, v.lenbits = 9, v.distcode = wt, v.distbits = 5;
  }
  function xt(v, R, h, M) {
    var tt, l = v.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), M >= l.wsize ? (t.arraySet(l.window, R, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (tt = l.wsize - l.wnext, tt > M && (tt = M), t.arraySet(l.window, R, h - M, tt, l.wnext), M -= tt, M ? (t.arraySet(l.window, R, h - M, M, 0), l.wnext = M, l.whave = l.wsize) : (l.wnext += tt, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += tt))), 0;
  }
  function m(v, R) {
    var h, M, tt, l, D, L, _, w, I, et, X, Y, mt, ae, Mt = 0, vt, zt, Pt, Ut, nn, rn, Ot, Gt, Ht = new t.Buf8(4), se, ee, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!v || !v.state || !v.output || !v.input && v.avail_in !== 0)
      return T;
    h = v.state, h.mode === K && (h.mode = nt), D = v.next_out, tt = v.output, _ = v.avail_out, l = v.next_in, M = v.input, L = v.avail_in, w = h.hold, I = h.bits, et = L, X = _, Gt = g;
    t:
      for (; ; )
        switch (h.mode) {
          case b:
            if (h.wrap === 0) {
              h.mode = nt;
              break;
            }
            for (; I < 16; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if (h.wrap & 2 && w === 35615) {
              h.check = 0, Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0), w = 0, I = 0, h.mode = x;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((w & 255) << 8) + (w >> 8)) % 31) {
              v.msg = "incorrect header check", h.mode = ot;
              break;
            }
            if ((w & 15) !== k) {
              v.msg = "unknown compression method", h.mode = ot;
              break;
            }
            if (w >>>= 4, I -= 4, Ot = (w & 15) + 8, h.wbits === 0)
              h.wbits = Ot;
            else if (Ot > h.wbits) {
              v.msg = "invalid window size", h.mode = ot;
              break;
            }
            h.dmax = 1 << Ot, v.adler = h.check = 1, h.mode = w & 512 ? U : K, w = 0, I = 0;
            break;
          case x:
            for (; I < 16; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if (h.flags = w, (h.flags & 255) !== k) {
              v.msg = "unknown compression method", h.mode = ot;
              break;
            }
            if (h.flags & 57344) {
              v.msg = "unknown header flags set", h.mode = ot;
              break;
            }
            h.head && (h.head.text = w >> 8 & 1), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, I = 0, h.mode = A;
          /* falls through */
          case A:
            for (; I < 32; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            h.head && (h.head.time = w), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, Ht[2] = w >>> 16 & 255, Ht[3] = w >>> 24 & 255, h.check = n(h.check, Ht, 4, 0)), w = 0, I = 0, h.mode = $;
          /* falls through */
          case $:
            for (; I < 16; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            h.head && (h.head.xflags = w & 255, h.head.os = w >> 8), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, I = 0, h.mode = E;
          /* falls through */
          case E:
            if (h.flags & 1024) {
              for (; I < 16; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              h.length = w, h.head && (h.head.extra_len = w), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, I = 0;
            } else h.head && (h.head.extra = null);
            h.mode = B;
          /* falls through */
          case B:
            if (h.flags & 1024 && (Y = h.length, Y > L && (Y = L), Y && (h.head && (Ot = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              M,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              Y,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ot
            )), h.flags & 512 && (h.check = n(h.check, M, Y, l)), L -= Y, l += Y, h.length -= Y), h.length))
              break t;
            h.length = 0, h.mode = F;
          /* falls through */
          case F:
            if (h.flags & 2048) {
              if (L === 0)
                break t;
              Y = 0;
              do
                Ot = M[l + Y++], h.head && Ot && h.length < 65536 && (h.head.name += String.fromCharCode(Ot));
              while (Ot && Y < L);
              if (h.flags & 512 && (h.check = n(h.check, M, Y, l)), L -= Y, l += Y, Ot)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = C;
          /* falls through */
          case C:
            if (h.flags & 4096) {
              if (L === 0)
                break t;
              Y = 0;
              do
                Ot = M[l + Y++], h.head && Ot && h.length < 65536 && (h.head.comment += String.fromCharCode(Ot));
              while (Ot && Y < L);
              if (h.flags & 512 && (h.check = n(h.check, M, Y, l)), L -= Y, l += Y, Ot)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = y;
          /* falls through */
          case y:
            if (h.flags & 512) {
              for (; I < 16; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              if (w !== (h.check & 65535)) {
                v.msg = "header crc mismatch", h.mode = ot;
                break;
              }
              w = 0, I = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), v.adler = h.check = 0, h.mode = K;
            break;
          case U:
            for (; I < 32; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            v.adler = h.check = bt(w), w = 0, I = 0, h.mode = P;
          /* falls through */
          case P:
            if (h.havedict === 0)
              return v.next_out = D, v.avail_out = _, v.next_in = l, v.avail_in = L, h.hold = w, h.bits = I, d;
            v.adler = h.check = 1, h.mode = K;
          /* falls through */
          case K:
            if (R === f || R === u)
              break t;
          /* falls through */
          case nt:
            if (h.last) {
              w >>>= I & 7, I -= I & 7, h.mode = Tt;
              break;
            }
            for (; I < 3; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            switch (h.last = w & 1, w >>>= 1, I -= 1, w & 3) {
              case 0:
                h.mode = ct;
                break;
              case 1:
                if (yt(h), h.mode = J, R === u) {
                  w >>>= 2, I -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = V;
                break;
              case 3:
                v.msg = "invalid block type", h.mode = ot;
            }
            w >>>= 2, I -= 2;
            break;
          case ct:
            for (w >>>= I & 7, I -= I & 7; I < 32; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if ((w & 65535) !== (w >>> 16 ^ 65535)) {
              v.msg = "invalid stored block lengths", h.mode = ot;
              break;
            }
            if (h.length = w & 65535, w = 0, I = 0, h.mode = W, R === u)
              break t;
          /* falls through */
          case W:
            h.mode = j;
          /* falls through */
          case j:
            if (Y = h.length, Y) {
              if (Y > L && (Y = L), Y > _ && (Y = _), Y === 0)
                break t;
              t.arraySet(tt, M, l, Y, D), L -= Y, l += Y, _ -= Y, D += Y, h.length -= Y;
              break;
            }
            h.mode = K;
            break;
          case V:
            for (; I < 14; ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if (h.nlen = (w & 31) + 257, w >>>= 5, I -= 5, h.ndist = (w & 31) + 1, w >>>= 5, I -= 5, h.ncode = (w & 15) + 4, w >>>= 4, I -= 4, h.nlen > 286 || h.ndist > 30) {
              v.msg = "too many length or distance symbols", h.mode = ot;
              break;
            }
            h.have = 0, h.mode = it;
          /* falls through */
          case it:
            for (; h.have < h.ncode; ) {
              for (; I < 3; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              h.lens[sr[h.have++]] = w & 7, w >>>= 3, I -= 3;
            }
            for (; h.have < 19; )
              h.lens[sr[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, se = { bits: h.lenbits }, Gt = r(a, h.lens, 0, 19, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              v.msg = "invalid code lengths set", h.mode = ot;
              break;
            }
            h.have = 0, h.mode = Rt;
          /* falls through */
          case Rt:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; Mt = h.lencode[w & (1 << h.lenbits) - 1], vt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(vt <= I); ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              if (Pt < 16)
                w >>>= vt, I -= vt, h.lens[h.have++] = Pt;
              else {
                if (Pt === 16) {
                  for (ee = vt + 2; I < ee; ) {
                    if (L === 0)
                      break t;
                    L--, w += M[l++] << I, I += 8;
                  }
                  if (w >>>= vt, I -= vt, h.have === 0) {
                    v.msg = "invalid bit length repeat", h.mode = ot;
                    break;
                  }
                  Ot = h.lens[h.have - 1], Y = 3 + (w & 3), w >>>= 2, I -= 2;
                } else if (Pt === 17) {
                  for (ee = vt + 3; I < ee; ) {
                    if (L === 0)
                      break t;
                    L--, w += M[l++] << I, I += 8;
                  }
                  w >>>= vt, I -= vt, Ot = 0, Y = 3 + (w & 7), w >>>= 3, I -= 3;
                } else {
                  for (ee = vt + 7; I < ee; ) {
                    if (L === 0)
                      break t;
                    L--, w += M[l++] << I, I += 8;
                  }
                  w >>>= vt, I -= vt, Ot = 0, Y = 11 + (w & 127), w >>>= 7, I -= 7;
                }
                if (h.have + Y > h.nlen + h.ndist) {
                  v.msg = "invalid bit length repeat", h.mode = ot;
                  break;
                }
                for (; Y--; )
                  h.lens[h.have++] = Ot;
              }
            }
            if (h.mode === ot)
              break;
            if (h.lens[256] === 0) {
              v.msg = "invalid code -- missing end-of-block", h.mode = ot;
              break;
            }
            if (h.lenbits = 9, se = { bits: h.lenbits }, Gt = r(s, h.lens, 0, h.nlen, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              v.msg = "invalid literal/lengths set", h.mode = ot;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, se = { bits: h.distbits }, Gt = r(o, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, se), h.distbits = se.bits, Gt) {
              v.msg = "invalid distances set", h.mode = ot;
              break;
            }
            if (h.mode = J, R === u)
              break t;
          /* falls through */
          case J:
            h.mode = gt;
          /* falls through */
          case gt:
            if (L >= 6 && _ >= 258) {
              v.next_out = D, v.avail_out = _, v.next_in = l, v.avail_in = L, h.hold = w, h.bits = I, i(v, X), D = v.next_out, tt = v.output, _ = v.avail_out, l = v.next_in, M = v.input, L = v.avail_in, w = h.hold, I = h.bits, h.mode === K && (h.back = -1);
              break;
            }
            for (h.back = 0; Mt = h.lencode[w & (1 << h.lenbits) - 1], vt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(vt <= I); ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if (zt && (zt & 240) === 0) {
              for (Ut = vt, nn = zt, rn = Pt; Mt = h.lencode[rn + ((w & (1 << Ut + nn) - 1) >> Ut)], vt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + vt <= I); ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              w >>>= Ut, I -= Ut, h.back += Ut;
            }
            if (w >>>= vt, I -= vt, h.back += vt, h.length = Pt, zt === 0) {
              h.mode = ft;
              break;
            }
            if (zt & 32) {
              h.back = -1, h.mode = K;
              break;
            }
            if (zt & 64) {
              v.msg = "invalid literal/length code", h.mode = ot;
              break;
            }
            h.extra = zt & 15, h.mode = Et;
          /* falls through */
          case Et:
            if (h.extra) {
              for (ee = h.extra; I < ee; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              h.length += w & (1 << h.extra) - 1, w >>>= h.extra, I -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = dt;
          /* falls through */
          case dt:
            for (; Mt = h.distcode[w & (1 << h.distbits) - 1], vt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(vt <= I); ) {
              if (L === 0)
                break t;
              L--, w += M[l++] << I, I += 8;
            }
            if ((zt & 240) === 0) {
              for (Ut = vt, nn = zt, rn = Pt; Mt = h.distcode[rn + ((w & (1 << Ut + nn) - 1) >> Ut)], vt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + vt <= I); ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              w >>>= Ut, I -= Ut, h.back += Ut;
            }
            if (w >>>= vt, I -= vt, h.back += vt, zt & 64) {
              v.msg = "invalid distance code", h.mode = ot;
              break;
            }
            h.offset = Pt, h.extra = zt & 15, h.mode = Q;
          /* falls through */
          case Q:
            if (h.extra) {
              for (ee = h.extra; I < ee; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              h.offset += w & (1 << h.extra) - 1, w >>>= h.extra, I -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              v.msg = "invalid distance too far back", h.mode = ot;
              break;
            }
            h.mode = lt;
          /* falls through */
          case lt:
            if (_ === 0)
              break t;
            if (Y = X - _, h.offset > Y) {
              if (Y = h.offset - Y, Y > h.whave && h.sane) {
                v.msg = "invalid distance too far back", h.mode = ot;
                break;
              }
              Y > h.wnext ? (Y -= h.wnext, mt = h.wsize - Y) : mt = h.wnext - Y, Y > h.length && (Y = h.length), ae = h.window;
            } else
              ae = tt, mt = D - h.offset, Y = h.length;
            Y > _ && (Y = _), _ -= Y, h.length -= Y;
            do
              tt[D++] = ae[mt++];
            while (--Y);
            h.length === 0 && (h.mode = gt);
            break;
          case ft:
            if (_ === 0)
              break t;
            tt[D++] = h.length, _--, h.mode = gt;
            break;
          case Tt:
            if (h.wrap) {
              for (; I < 32; ) {
                if (L === 0)
                  break t;
                L--, w |= M[l++] << I, I += 8;
              }
              if (X -= _, v.total_out += X, h.total += X, X && (v.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, tt, X, D - X) : e(h.check, tt, X, D - X)), X = _, (h.flags ? w : bt(w)) !== h.check) {
                v.msg = "incorrect data check", h.mode = ot;
                break;
              }
              w = 0, I = 0;
            }
            h.mode = Nt;
          /* falls through */
          case Nt:
            if (h.wrap && h.flags) {
              for (; I < 32; ) {
                if (L === 0)
                  break t;
                L--, w += M[l++] << I, I += 8;
              }
              if (w !== (h.total & 4294967295)) {
                v.msg = "incorrect length check", h.mode = ot;
                break;
              }
              w = 0, I = 0;
            }
            h.mode = $t;
          /* falls through */
          case $t:
            Gt = p;
            break t;
          case ot:
            Gt = H;
            break t;
          case rt:
            return N;
          case kt:
          /* falls through */
          default:
            return T;
        }
    return v.next_out = D, v.avail_out = _, v.next_in = l, v.avail_in = L, h.hold = w, h.bits = I, (h.wsize || X !== v.avail_out && h.mode < ot && (h.mode < Tt || R !== c)) && xt(v, v.output, v.next_out, X - v.avail_out), et -= v.avail_in, X -= v.avail_out, v.total_in += et, v.total_out += X, h.total += X, h.wrap && X && (v.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, tt, X, v.next_out - X) : e(h.check, tt, X, v.next_out - X)), v.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === K ? 128 : 0) + (h.mode === J || h.mode === W ? 256 : 0), (et === 0 && X === 0 || R === c) && Gt === g && (Gt = S), Gt;
  }
  function z(v) {
    if (!v || !v.state)
      return T;
    var R = v.state;
    return R.window && (R.window = null), v.state = null, g;
  }
  function O(v, R) {
    var h;
    return !v || !v.state || (h = v.state, (h.wrap & 2) === 0) ? T : (h.head = R, R.done = !1, g);
  }
  function G(v, R) {
    var h = R.length, M, tt, l;
    return !v || !v.state || (M = v.state, M.wrap !== 0 && M.mode !== P) ? T : M.mode === P && (tt = 1, tt = e(tt, R, h, 0), tt !== M.check) ? H : (l = xt(v, R, h, h), l ? (M.mode = rt, N) : (M.havedict = 1, g));
  }
  return Wt.inflateReset = st, Wt.inflateReset2 = pt, Wt.inflateResetKeep = Bt, Wt.inflateInit = ut, Wt.inflateInit2 = ht, Wt.inflate = m, Wt.inflateEnd = z, Wt.inflateGetHeader = O, Wt.inflateSetDictionary = G, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var hi, Aa;
function ro() {
  return Aa || (Aa = 1, hi = {
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
  }), hi;
}
var di, $a;
function W0() {
  if ($a) return di;
  $a = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return di = t, di;
}
var Na;
function X0() {
  if (Na) return Ie;
  Na = 1;
  var t = G0(), e = de(), n = no(), i = ro(), r = ir(), a = io(), s = W0(), o = Object.prototype.toString;
  function c(g) {
    if (!(this instanceof c)) return new c(g);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, g || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(g && g.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var d = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (d !== i.Z_OK)
      throw new Error(r[d]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (d = t.inflateSetDictionary(this.strm, p.dictionary), d !== i.Z_OK)))
      throw new Error(r[d]);
  }
  c.prototype.push = function(g, p) {
    var d = this.strm, T = this.options.chunkSize, H = this.options.dictionary, N, S, k, b, x, A = !1;
    if (this.ended)
      return !1;
    S = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof g == "string" ? d.input = n.binstring2buf(g) : o.call(g) === "[object ArrayBuffer]" ? d.input = new Uint8Array(g) : d.input = g, d.next_in = 0, d.avail_in = d.input.length;
    do {
      if (d.avail_out === 0 && (d.output = new e.Buf8(T), d.next_out = 0, d.avail_out = T), N = t.inflate(d, i.Z_NO_FLUSH), N === i.Z_NEED_DICT && H && (N = t.inflateSetDictionary(this.strm, H)), N === i.Z_BUF_ERROR && A === !0 && (N = i.Z_OK, A = !1), N !== i.Z_STREAM_END && N !== i.Z_OK)
        return this.onEnd(N), this.ended = !0, !1;
      d.next_out && (d.avail_out === 0 || N === i.Z_STREAM_END || d.avail_in === 0 && (S === i.Z_FINISH || S === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (k = n.utf8border(d.output, d.next_out), b = d.next_out - k, x = n.buf2string(d.output, k), d.next_out = b, d.avail_out = T - b, b && e.arraySet(d.output, d.output, k, b, 0), this.onData(x)) : this.onData(e.shrinkBuf(d.output, d.next_out))), d.avail_in === 0 && d.avail_out === 0 && (A = !0);
    } while ((d.avail_in > 0 || d.avail_out === 0) && N !== i.Z_STREAM_END);
    return N === i.Z_STREAM_END && (S = i.Z_FINISH), S === i.Z_FINISH ? (N = t.inflateEnd(this.strm), this.onEnd(N), this.ended = !0, N === i.Z_OK) : (S === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), d.avail_out = 0), !0);
  }, c.prototype.onData = function(g) {
    this.chunks.push(g);
  }, c.prototype.onEnd = function(g) {
    g === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
  };
  function f(g, p) {
    var d = new c(p);
    if (d.push(g, !0), d.err)
      throw d.msg || r[d.err];
    return d.result;
  }
  function u(g, p) {
    return p = p || {}, p.raw = !0, f(g, p);
  }
  return Ie.Inflate = c, Ie.inflate = f, Ie.inflateRaw = u, Ie.ungzip = f, Ie;
}
var pi, Ia;
function Y0() {
  if (Ia) return pi;
  Ia = 1;
  var t = de().assign, e = U0(), n = X0(), i = ro(), r = {};
  return t(r, e, n, i), pi = r, pi;
}
var K0 = Y0();
const J0 = /* @__PURE__ */ tr(K0);
function Q0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ao(t) {
  const e = new Uint8Array(Q0(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: so, Inflate: oo } = J0;
async function rr(t) {
  try {
    let e, n = 0, i;
    const r = [];
    do {
      const a = t.subarray(n);
      if (i = new oo(), { strm: e } = i, i.push(a, so), i.err)
        throw new Error(i.msg);
      n += e.next_in, r.push(i.result);
    } while (e.avail_in);
    return ao(r);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function j0(t, e) {
  try {
    let n;
    const { minv: i, maxv: r } = e;
    let a = i.blockPosition, s = i.dataPosition;
    const o = [], c = [], f = [];
    let u = 0;
    do {
      const g = t.subarray(a - i.blockPosition), p = new oo();
      if ({ strm: n } = p, p.push(g, so), p.err)
        throw new Error(p.msg);
      const d = p.result;
      o.push(d);
      let T = d.length;
      c.push(a), f.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), T = o[0].length);
      const H = a;
      if (a += n.next_in, s += T, H >= r.blockPosition) {
        o[u] = o[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: ao(o),
      cpositions: c,
      dpositions: f
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class Bn {
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
class lo {
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
    var r;
    return !!((r = (await this.parse(n)).indices[e]) != null && r.binIndex);
  }
}
const Da = 65536, tp = Da * Da;
function co(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * tp + (n >>> 0);
}
class ep extends Error {
}
function We(t) {
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
function fo(t, e) {
  const n = [];
  let i = null;
  return t.length === 0 ? t : (t.sort(function(r, a) {
    const s = r.minv.blockPosition - a.minv.blockPosition;
    return s !== 0 ? s : r.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((r) => {
    (!e || r.maxv.compareTo(e) > 0) && (i === null ? (n.push(r), i = r) : np(i, r) ? r.maxv.compareTo(i.maxv) > 0 && (i.maxv = r.maxv) : (n.push(r), i = r));
  }), n);
}
class ar {
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
function Le(t, e = 0) {
  return new ar(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const ip = 21582659, rp = 38359875, ap = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function sp(t, e) {
  return t * 2 ** e;
}
function Ra(t, e) {
  return Math.floor(t / 2 ** e);
}
class _i extends lo {
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
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, u = i.getInt32(n + 20, !0), g = i.getInt32(n + 24, !0), { refIdToName: p, refNameToId: d } = this._parseNameBytes(e.subarray(n + 28, n + 28 + g));
    return {
      refIdToName: p,
      refNameToId: d,
      skipLines: u,
      metaChar: f,
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
          const c = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = c, a[c] = n;
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
    const n = await rr(await this.filehandle.readFile(e)), i = new DataView(n.buffer);
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
    }, c = i.getInt32(16 + s, !0);
    let f, u = 16 + s + 4;
    const g = new Array(c).fill(0).map(() => {
      const p = i.getInt32(u, !0);
      u += 4;
      const d = {};
      let T;
      for (let H = 0; H < p; H += 1) {
        const N = i.getUint32(u, !0);
        if (N > this.maxBinNumber)
          T = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const S = Le(n, u + 4);
          f = this._findFirstData(f, S);
          const k = i.getInt32(u + 12, !0);
          u += 16;
          const b = new Array(k);
          for (let x = 0; x < k; x += 1) {
            const A = Le(n, u), $ = Le(n, u + 8);
            u += 16, b[x] = new Bn(A, $, N);
          }
          d[N] = b;
        }
      }
      return { binIndex: d, stats: T };
    });
    return {
      ...o,
      csi: !0,
      refCount: c,
      maxBlockSize: 65536,
      firstDataLine: f,
      csiVersion: r,
      indices: g,
      depth: this.depth,
      maxBinNumber: this.maxBinNumber,
      maxRefLength: a
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: co(e, n + 28)
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
    const c = this.reg2bins(n, i), f = [];
    for (const [u, g] of c)
      for (let p = u; p <= g; p++)
        if (o.binIndex[p])
          for (const d of o.binIndex[p])
            f.push(new Bn(d.minv, d.maxv, p));
    return fo(f, new ar(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += sp(1, i * 3), i += 1) {
      const o = r + Ra(e, a), c = r + Ra(n, a);
      if (c - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, c]);
    }
    return s;
  }
}
const op = 21578324, Ma = 14;
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
class Ve extends lo {
  async lineCount(e, n = {}) {
    var s;
    const i = await this.parse(n), r = i.refNameToId[e];
    return r === void 0 || !i.indices[r] ? -1 : ((s = i.indices[r].stats) == null ? void 0 : s.lineCount) ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), i = await rr(n);
    We(e.signal);
    const r = new DataView(i.buffer);
    if (r.getUint32(0, !0) !== op)
      throw new Error("Not a TBI file");
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const g = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, p = r.getInt32(24, !0), d = 5, T = ((1 << (d + 1) * 3) - 1) / 7, H = 2 ** (14 + d * 3), N = p ? String.fromCharCode(p) : null, S = r.getInt32(28, !0), k = r.getInt32(32, !0), { refNameToId: b, refIdToName: x } = this._parseNameBytes(i.slice(36, 36 + k));
    let A = 36 + k, $;
    return {
      indices: new Array(s).fill(0).map(() => {
        const B = r.getInt32(A, !0);
        A += 4;
        const F = {};
        let C;
        for (let P = 0; P < B; P += 1) {
          const K = r.getUint32(A, !0);
          if (A += 4, K > T + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (K === T + 1) {
            const nt = r.getInt32(A, !0);
            A += 4, nt === 2 && (C = this.parsePseudoBin(i, A)), A += 16 * nt;
          } else {
            const nt = r.getInt32(A, !0);
            A += 4;
            const ct = new Array(nt);
            for (let W = 0; W < nt; W += 1) {
              const j = Le(i, A), V = Le(i, A + 8);
              A += 16, $ = this._findFirstData($, j), ct[W] = new Bn(j, V, K);
            }
            F[K] = ct;
          }
        }
        const y = r.getInt32(A, !0);
        A += 4;
        const U = new Array(y);
        for (let P = 0; P < y; P += 1)
          U[P] = Le(i, A), A += 8, $ = this._findFirstData($, U[P]);
        return {
          binIndex: F,
          linearIndex: U,
          stats: C
        };
      }),
      metaChar: N,
      maxBinNumber: T,
      maxRefLength: H,
      skipLines: S,
      firstDataLine: $,
      columnNumbers: g,
      coordinateType: c,
      format: u,
      refIdToName: x,
      refNameToId: b,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: co(e, n + 16)
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (i < o) {
          const c = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = c, a[c] = n;
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
    (o.linearIndex.length ? o.linearIndex[n >> Ma >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> Ma] : new ar(0, 0)) || console.warn("querying outside of possible tabix range");
    const f = lp(n, i), u = [];
    for (const [H, N] of f)
      for (let S = H; S <= N; S++)
        if (o.binIndex[S])
          for (const k of o.binIndex[S])
            u.push(new Bn(k.minv, k.maxv, S));
    const g = o.linearIndex.length;
    let p = null;
    const d = Math.min(n >> 14, g - 1), T = Math.min(i >> 14, g - 1);
    for (let H = d; H <= T; ++H) {
      const N = o.linearIndex[H];
      N && (!p || N.compareTo(p) < 0) && (p = N);
    }
    return fo(u, p);
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: u = (p) => p, chunkCacheSize: g = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new gn(e);
    else if (i)
      this.filehandle = new we(i);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new Ve({
        filehandle: s,
        renameRefSeqs: u
      });
    else if (f)
      this.index = new _i({
        filehandle: f,
        renameRefSeqs: u
      });
    else if (r)
      this.index = new Ve({
        filehandle: new gn(r),
        renameRefSeqs: u
      });
    else if (o)
      this.index = new _i({
        filehandle: new gn(o),
        renameRefSeqs: u
      });
    else if (e)
      this.index = new Ve({
        filehandle: new gn(`${e}.tbi`),
        renameRefSeqs: u
      });
    else if (c)
      this.index = new _i({
        filehandle: new we(c)
      });
    else if (a)
      this.index = new Ve({
        filehandle: new we(a)
      });
    else if (i)
      this.index = new Ve({
        filehandle: new we(`${i}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = u, this.chunkCache = new Te({
      cache: new Un({ maxSize: Math.floor(g / 65536) }),
      fill: (p, d) => this.readChunk(p, { signal: d })
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
    const c = await this.index.getMetadata(s);
    We(a);
    const f = n ?? 0, u = i ?? c.maxRefLength;
    if (!(f <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === u)
      return;
    const g = await this.index.blocksForRange(e, f, u, s);
    We(a);
    const p = new TextDecoder("utf8");
    for (const d of g) {
      const { buffer: T, cpositions: H, dpositions: N } = await this.chunkCache.get(d.toString(), d, a);
      We(a);
      let S = 0, k = 0;
      const b = p.decode(T), x = cp(b);
      for (; S < b.length; ) {
        let A, $;
        if (x) {
          if ($ = b.indexOf(`
`, S), $ === -1)
            break;
          A = b.slice(S, $);
        } else {
          if ($ = T.indexOf(10, S), $ === -1)
            break;
          const F = T.slice(S, $);
          A = p.decode(F);
        }
        if (N) {
          for (; S + d.minv.dataPosition >= N[k++]; )
            ;
          k--;
        }
        const { startCoordinate: E, overlaps: B } = this.checkLine(c, e, f, u, A);
        if (B)
          o(
            A,
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
            H[k] * 256 + (S - N[k]) + d.minv.dataPosition + 1
          );
        else if (E !== void 0 && E >= u)
          return;
        S = $ + 1;
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
    We(e.signal);
    const a = ((n == null ? void 0 : n.blockPosition) || 0) + r, s = await this.filehandle.read(a, 0, e), o = await rr(s);
    if (i) {
      let c = -1;
      const f = 10, u = i.charCodeAt(0);
      for (let g = 0; g < o.length && !(g === c + 1 && o[g] !== u); g += 1)
        o[g] === f && (c = g);
      return o.subarray(0, c + 1);
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
    const { columnNumbers: s, metaChar: o, coordinateType: c, format: f } = e;
    if (o && a.startsWith(o))
      return { overlaps: !1 };
    let { ref: u, start: g, end: p } = s;
    u || (u = 0), g || (g = 0), p || (p = 0), f === "VCF" && (p = 8);
    const d = Math.max(u, g, p);
    let T = 1, H = 0, N = "", S = -1 / 0;
    const k = a.length;
    for (let b = 0; b < k + 1; b++)
      if (a[b] === "	" || b === k) {
        if (T === u) {
          if (this.renameRefSeq(a.slice(H, b)) !== n)
            return {
              overlaps: !1
            };
        } else if (T === g) {
          if (S = parseInt(a.slice(H, b), 10), c === "1-based-closed" && (S -= 1), S >= r)
            return {
              startCoordinate: S,
              overlaps: !1
            };
          if ((p === 0 || p === g) && S + 1 <= i)
            return {
              startCoordinate: S,
              overlaps: !1
            };
        } else if (f === "VCF" && T === 4)
          N = a.slice(H, b);
        else if (T === p && (f === "VCF" ? this._getVcfEnd(S, N, a.slice(H, b)) : Number.parseInt(a.slice(H, b), 10)) <= i)
          return {
            overlaps: !1
          };
        if (H = b + 1, T += 1, T > d)
          break;
      }
    return {
      startCoordinate: S,
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
          let c = i.indexOf(";", o);
          c === -1 && (c = i.length), r = parseInt(i.slice(o + 4, c), 10);
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
        for (const c of n) {
          const f = i[a++], u = f.indexOf(":");
          r[c] = u !== -1 ? f.slice(0, u) : f;
        }
      else
        for (const c of n) {
          const f = i[a++].split(":");
          r[c] = f[o];
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
    ] : r && r.startsWith('"') && r.endsWith('"') ? [i, r.slice(1, -1)] : [i, r == null ? void 0 : r.replaceAll(/^"|"$/g, "")];
  }));
}
const mn = {
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
      INFO: mn.InfoFields,
      FORMAT: mn.GenotypeFields,
      ALT: mn.AltTypes,
      FILTER: mn.FilterTypes
    }));
    let r;
    if (i.forEach((c) => {
      if (c.startsWith("#"))
        c.startsWith("##") ? this.parseMetadata(c) : r = c;
      else throw new Error(`Bad line in header:
${c}`);
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
    if (s.length !== o.length || !s.every((c, f) => c === o[f]))
      throw new Error(`VCF column headers not correct:
${r}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const i = {};
    if (e) {
      const r = n.split("	"), a = e.split(":"), s = a.map((o) => {
        const c = this.getMetadata("FORMAT", o, "Type");
        return c === "Integer" || c === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const c = this.samples[o];
        i[c] = {};
        const f = r[o].split(":");
        for (let u = 0; u < f.length; u++) {
          const g = f[u];
          i[c][a[u]] = g === "" || g === "." ? void 0 : g.split(",").map((p) => p === "." ? void 0 : s[u] ? +p : p);
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
    if (r != null && r.startsWith("<")) {
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
    var $;
    let n = 0;
    for (let E = 0; n < e.length && (e[n] === "	" && (E += 1), E !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, c, f, u, g] = i, p = a, d = +s, T = o === "." ? void 0 : o.split(";"), H = c, N = f === "." ? void 0 : f.split(","), S = u === "." ? void 0 : +u, k = g === "." ? void 0 : g.split(";"), b = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const x = ($ = i[7]) == null ? void 0 : $.includes("%"), A = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((E) => {
      const [B, F] = E.split("="), C = F == null ? void 0 : F.split(",").map((U) => U === "." ? void 0 : U).map((U) => U && x ? _p(U) : U), y = this.getMetadata("INFO", B, "Type");
      return y === "Integer" || y === "Float" ? [
        B,
        C == null ? void 0 : C.map((U) => U === void 0 ? void 0 : Number(U))
      ] : y === "Flag" ? [B, !0] : [B, C ?? !0];
    }));
    return {
      CHROM: p,
      POS: d,
      ALT: N,
      INFO: A,
      REF: H,
      FILTER: k && k.length === 1 && k[0] === "PASS" ? "PASS" : k,
      ID: T,
      QUAL: S,
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
    let [s, o] = uo(a, n);
    s || ([s, o] = yp(t, a)), s && o && (i.add(s), r.add(o));
  }), r.size > 1) {
    const a = [...r], s = new Set(
      a.map((o) => {
        const c = o.split("->");
        return c[1] ? c[0] : o;
      }).filter((o) => !!o)
    );
    r = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const c = a.map((f) => f.split("->").map((u) => u.trim())).map((f) => f[1] && f[0] === o ? f[1] : "").filter((f) => !!f);
        return c.length ? `${o} -> ${c.join(",")}` : o;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function uo(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = vp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? uo(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function yp(t, e) {
  if (mp(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", De("SNV", t, e)];
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
    return t.split("").reverse().join("") === e ? ["inversion", De("inversion", t, e)] : ["substitution", De("substitution", t, e)];
  if (t.length <= e.length) {
    const i = e.length - t.length, r = i.toLocaleString("en-US");
    return [
      "insertion",
      i > 5 ? `${r}bp INS` : De("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const i = t.length - e.length, r = i.toLocaleString("en-US");
    return [
      "deletion",
      i > 5 ? `${r}bp DEL` : De("deletion", t, e)
    ];
  }
  return ["indel", De("indel", t, e)];
}
function De(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function bp(t, e) {
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [c, f] = wp(n, i, e);
  return {
    refName: a,
    start: o,
    end: xp(t),
    description: f,
    type: c,
    name: s == null ? void 0 : s.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function xp(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i == null ? void 0 : i.includes("<TRA>"), a = e - 1;
  if (i == null ? void 0 : i.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !r)
      return +o.END[0];
  }
  return a + n.length;
}
class kp {
  constructor(e) {
    this.variant = e.variant, this.parser = e.parser, this.data = bp(this.variant, this.parser), this._id = e.id;
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
async function Sp({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: i
}) {
  const r = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new fp({
    tbiFilehandle: n === "TBI" ? new we(r) : void 0,
    csiFilehandle: n === "CSI" ? new we(r) : void 0,
    filehandle: new we(t)
  }), s = new gp({
    header: await a.getHeader()
  }), o = [];
  let c = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (f) => {
      const u = s.parseLine(f), g = new kp({
        variant: u,
        parser: s,
        id: `${c++}`
      }), p = g.get("INFO");
      o.push({
        id: g.get("ID"),
        reference_allele: g.get("REF"),
        alternative_alleles: { values: g.get("ALT") },
        name: g.get("name"),
        seqId: g.get("refName"),
        fmin: g.get("start"),
        fmax: g.get("end"),
        strand: 1,
        source: "",
        type: La(p.soTerm[0]) ?? g.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([d, T]) => [
            d,
            {
              values: [JSON.stringify(T.map((H) => La(H)))]
            }
          ])
        )
      });
    }
  }), o;
}
function La(t) {
  return t == null ? void 0 : t.replace(/['"]+/g, "");
}
function Ap(t) {
  const [e, n] = t.split(":"), [i, r] = n.split("..");
  return {
    chromosome: e,
    start: +i,
    end: +r
  };
}
Se.prototype.first = function() {
  return At(this.nodes()[0]);
};
Se.prototype.last = function() {
  return At(this.nodes()[this.size() - 1]);
};
class $p {
  constructor(e, n, i, r) {
    console.log("🚀 GenomeFeatureViewer constructor called with:", {
      config: e,
      svg_target: n,
      width: i,
      height: r,
      tracks: e.tracks
    }), this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
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
    const i = At(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), Ki(e, i);
  }
  _initViewer(e) {
    At(e).selectAll("*").remove();
    const n = At(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, At(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? Tu, i = this.config.variantTypes ?? Eu, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome, f = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], g = this.config.htpVariant ?? "", p = s.start, d = s.end;
    new Ou({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: p,
        end: d,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let N = 100;
    const S = this.config.showVariantLabel ?? !0, { viewer: k, genome: b, height: x, tracks: A } = this;
    A.map(($) => {
      const { variantData: E, trackData: B } = $;
      if ($.type === Pe.ISOFORM_AND_VARIANT) {
        const F = new Ru({
          viewer: k,
          height: x,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: S,
          trackData: B,
          variantData: E,
          variantFilter: f,
          binRatio: r,
          isoformFilter: u,
          geneBounds: $.geneBounds
        });
        N += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const F = new Mu({
          viewer: k,
          height: x,
          width: e,
          transcriptTypes: n,
          variantData: E,
          trackData: B,
          variantTypes: i,
          showVariantLabel: S,
          variantFilter: f
        });
        N += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM) {
        const F = new Lu({
          region: a,
          viewer: k,
          height: x,
          width: e,
          genome: b,
          trackData: B,
          transcriptTypes: n,
          htpVariant: g
        });
        N += F.DrawTrack();
      } else $.type === Pe.VARIANT ? new ad({
        region: a,
        viewer: k,
        range: o,
        height: x,
        width: e
      }).DrawTrack() : $.type === Pe.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: k,
        track: {
          ...$,
          range: o
        },
        height: x,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${$.type}`);
      At(this.svg_target).attr("height", N);
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
      const c = (
        // @ts-expect-error
        At("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        c - s / 2,
        c + s / 2
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
  $p as GenomeFeatureViewer,
  Ep as fetchApolloAPIData,
  Tp as fetchNCListData,
  Sp as fetchTabixVcfData,
  Ap as parseLocString
};
