function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function uo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oa(t) {
  let e, n, i;
  t.length !== 2 ? (e = vn, n = (o, c) => vn(t(o), c), i = (o, c) => t(o) - c) : (e = t === vn || t === uo ? t : po, n = t, i = t);
  function r(o, c, f = 0, h = o.length) {
    if (f < h) {
      if (e(c, c) !== 0) return h;
      do {
        const g = f + h >>> 1;
        n(o[g], c) < 0 ? f = g + 1 : h = g;
      } while (f < h);
    }
    return f;
  }
  function a(o, c, f = 0, h = o.length) {
    if (f < h) {
      if (e(c, c) !== 0) return h;
      do {
        const g = f + h >>> 1;
        n(o[g], c) <= 0 ? f = g + 1 : h = g;
      } while (f < h);
    }
    return f;
  }
  function s(o, c, f = 0, h = o.length) {
    const g = r(o, c, f, h - 1);
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
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === wn || t === an ? -1 : 1, h = t === an || t === Gn ? "x" : "y", g = t === wn || t === mi ? To : Eo;
  function d(p) {
    var v = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), C = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ko), I = Math.max(a, 0) + o, A = e.range(), T = +A[0] + c, k = +A[A.length - 1] + c, x = (e.bandwidth ? Ao : So)(e.copy(), c), S = p.selection ? p.selection() : p, $ = S.selectAll(".domain").data([null]), E = S.selectAll(".tick").data(v, e).order(), B = E.exit(), F = E.enter().append("g").attr("class", "tick"), O = E.select("line"), b = E.select("text");
    $ = $.merge($.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), E = E.merge(F), O = O.merge(F.append("line").attr("stroke", "currentColor").attr(h + "2", f * a)), b = b.merge(F.append("text").attr("fill", "currentColor").attr(h, f * I).attr("dy", t === wn ? "0em" : t === mi ? "0.71em" : "0.32em")), p !== S && ($ = $.transition(p), E = E.transition(p), O = O.transition(p), b = b.transition(p), B = B.transition(p).attr("opacity", or).attr("transform", function(Z) {
      return isFinite(Z = x(Z)) ? g(Z + c) : this.getAttribute("transform");
    }), F.attr("opacity", or).attr("transform", function(Z) {
      var V = this.parentNode.__axis;
      return g((V && isFinite(V = V(Z)) ? V : x(Z)) + c);
    })), B.remove(), $.attr("d", t === an || t === Gn ? s ? "M" + f * s + "," + T + "H" + c + "V" + k + "H" + f * s : "M" + c + "," + T + "V" + k : s ? "M" + T + "," + f * s + "V" + c + "H" + k + "V" + f * s : "M" + T + "," + c + "H" + k), E.attr("opacity", 1).attr("transform", function(Z) {
      return g(x(Z) + c);
    }), O.attr(h + "2", f * a), b.attr(h, f * I).text(C), S.filter($o).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Gn ? "start" : t === an ? "end" : "middle"), S.each(function() {
      this.__axis = x;
    });
  }
  return d.scale = function(p) {
    return arguments.length ? (e = p, d) : e;
  }, d.ticks = function() {
    return n = Array.from(arguments), d;
  }, d.tickArguments = function(p) {
    return arguments.length ? (n = p == null ? [] : Array.from(p), d) : n.slice();
  }, d.tickValues = function(p) {
    return arguments.length ? (i = p == null ? null : Array.from(p), d) : i && i.slice();
  }, d.tickFormat = function(p) {
    return arguments.length ? (r = p, d) : r;
  }, d.tickSize = function(p) {
    return arguments.length ? (a = s = +p, d) : a;
  }, d.tickSizeInner = function(p) {
    return arguments.length ? (a = +p, d) : a;
  }, d.tickSizeOuter = function(p) {
    return arguments.length ? (s = +p, d) : s;
  }, d.tickPadding = function(p) {
    return arguments.length ? (o = +p, d) : o;
  }, d.offset = function(p) {
    return arguments.length ? (c = +p, d) : c;
  }, d;
}
function lr(t) {
  return Ca(wn, t);
}
function No(t) {
  return Ca(mi, t);
}
var Do = { value: () => {
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
function Io(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
yn.prototype = Fa.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, i = Io(t + "", n), r, a = -1, s = i.length;
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
      t[i] = Do, t = t.slice(0, i).concat(t.slice(i + 1));
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
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
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
  var o, c, f = /* @__PURE__ */ new Map(), h = e.length, g = a.length, d = new Array(h), p;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (d[o] = p = s.call(c, c.__data__, o, e) + "", f.has(p) ? r[o] = c : f.set(p, c));
  for (o = 0; o < g; ++o)
    p = s.call(t, a[o], o, a) + "", (c = f.get(p)) ? (i[o] = c, c.__data__ = a[o], f.delete(p)) : n[o] = new Sn(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f.get(d[o]) === c && (r[o] = c);
}
function jo(t) {
  return t.__data__;
}
function tl(t, e) {
  if (!arguments.length) return Array.from(this, jo);
  var n = e ? Qo : Jo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = i[f], g = r[f], d = g.length, p = el(t.call(h, h && h.__data__, f, i)), v = p.length, C = o[f] = new Array(v), I = s[f] = new Array(v), A = c[f] = new Array(d);
    n(h, g, C, I, A, p, e);
    for (var T = 0, k = 0, x, S; T < v; ++T)
      if (x = C[T]) {
        for (T >= k && (k = T + 1); !(S = I[k]) && ++k < v; ) ;
        x._next = S || null;
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
    for (var f = n[c], h = i[c], g = f.length, d = o[c] = new Array(g), p, v = 0; v < g; ++v)
      (p = f[v] || h[v]) && (d[v] = p);
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
  function e(g, d) {
    return g && d ? t(g.__data__, d.__data__) : !g - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
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
function hl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ul() {
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
function Dl(t) {
  return function() {
    Xa(this, t);
  };
}
function Il(t, e) {
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
  return this.each((typeof e == "function" ? Il : e ? Nl : Dl)(n, e));
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
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (r = 0, h = o[c]; r < a; ++r)
          if ((s = i[r]).type === h.type && s.name === h.name)
            return h.value;
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
  size: hl,
  empty: ul,
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
var Ye = 0.7, An = 1 / Ye, Me = "\\s*([+-]?\\d+)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ie = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fc = /^#([0-9a-f]{3,8})$/, hc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), uc = new RegExp(`^rgb\\(${ie},${ie},${ie}\\)$`), dc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ke}\\)$`), pc = new RegExp(`^rgba\\(${ie},${ie},${ie},${Ke}\\)$`), _c = new RegExp(`^hsl\\(${Ke},${ie},${ie}\\)$`), gc = new RegExp(`^hsla\\(${Ke},${ie},${ie},${Ke}\\)$`), hr = {
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
  hex: ur,
  // Deprecated! Use color.formatHex.
  formatHex: ur,
  formatHex8: mc,
  formatHsl: vc,
  formatRgb: dr,
  toString: dr
});
function ur() {
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
  return t = (t + "").trim().toLowerCase(), (e = fc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pr(e) : n === 3 ? new Zt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = hc.exec(t)) ? new Zt(e[1], e[2], e[3], 1) : (e = uc.exec(t)) ? new Zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = dc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = pc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = _c.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, 1) : (e = gc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, e[4]) : hr.hasOwnProperty(t) ? pr(hr[t]) : t === "transparent" ? new Zt(NaN, NaN, NaN, 0) : null;
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
    return function(h) {
      return r.r = s(h), r.g = o(h), r.b = c(h), r.opacity = f(h), r + "";
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
function Dc(t) {
  return function() {
    return t;
  };
}
function Ic(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ja(t, e) {
  var n = yi.lastIndex = Xn.lastIndex = 0, i, r, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Xn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, c.push({ i: s, x: Qt(i, r) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Ic(c[0].x) : Dc(e) : (e = c.length, function(f) {
    for (var h = 0, g; h < e; ++h) o[(g = c[h]).i] = g.x(f);
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
  function a(f, h, g, d, p, v) {
    if (f !== g || h !== d) {
      var C = p.push("translate(", null, e, null, n);
      v.push({ i: C - 4, x: Qt(f, g) }, { i: C - 2, x: Qt(h, d) });
    } else (g || d) && p.push("translate(" + g + e + d + n);
  }
  function s(f, h, g, d) {
    f !== h ? (f - h > 180 ? h += 360 : h - f > 180 && (f += 360), d.push({ i: g.push(r(g) + "rotate(", null, i) - 2, x: Qt(f, h) })) : h && g.push(r(g) + "rotate(" + h + i);
  }
  function o(f, h, g, d) {
    f !== h ? d.push({ i: g.push(r(g) + "skewX(", null, i) - 2, x: Qt(f, h) }) : h && g.push(r(g) + "skewX(" + h + i);
  }
  function c(f, h, g, d, p, v) {
    if (f !== g || h !== d) {
      var C = p.push(r(p) + "scale(", null, ",", null, ")");
      v.push({ i: C - 4, x: Qt(f, g) }, { i: C - 2, x: Qt(h, d) });
    } else (g !== 1 || d !== 1) && p.push(r(p) + "scale(" + g + "," + d + ")");
  }
  return function(f, h) {
    var g = [], d = [];
    return f = t(f), h = t(h), a(f.translateX, f.translateY, h.translateX, h.translateY, g, d), s(f.rotate, h.rotate, g, d), o(f.skewX, h.skewX, g, d), c(f.scaleX, f.scaleY, h.scaleX, h.scaleY, g, d), f = h = null, function(p) {
      for (var v = -1, C = d.length, I; ++v < C; ) g[(I = d[v]).i] = I.x(p);
      return g.join("");
    };
  };
}
var Oc = es(Mc, "px, ", "px)", "deg)"), Cc = es(Lc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, ns = 1e3, Dn, Ze, In = 0, ke = 0, Pn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
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
    n = (n == null ? Zi() : +n) + (e == null ? 0 : +e), !this._next && Ze !== this && (Ze ? Ze._next = this : Dn = this, Ze = this), this._call = t, this._time = n, xi();
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
  for (var t = Dn, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ce;
}
function yr() {
  ke = (In = Je.now()) + Pn, Ce = Ue = 0;
  try {
    zc();
  } finally {
    Ce = 0, Hc(), ke = 0;
  }
}
function Bc() {
  var t = Je.now(), e = t - In;
  e > ns && (Pn -= e, In = t);
}
function Hc() {
  for (var t, e = Dn, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Dn = n);
  Ze = t, xi(i);
}
function xi(t) {
  if (!Ce) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yr, t - Je.now() - Pn)), He && (He = clearInterval(He))) : (He || (In = Je.now(), He = setInterval(Bc, ns)), Ce = 1, is(yr));
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
    var h, g, d, p;
    if (n.state !== xr) return c();
    for (h in i)
      if (p = i[h], p.name === n.name) {
        if (p.state === bn) return br(s);
        p.state === kr ? (p.state = xn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete i[h]) : +h < e && (p.state = xn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete i[h]);
      }
    if (br(function() {
      n.state === bn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = bn, r = new Array(d = n.tween.length), h = 0, g = -1; h < d; ++h)
        (p = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (r[++g] = p);
      r.length = g + 1;
    }
  }
  function o(f) {
    for (var h = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = Ti, 1), g = -1, d = r.length; ++g < d; )
      r[g].call(t, h);
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
function hf(t, e) {
  return function() {
    re(this, t).duration = +e.apply(this, arguments);
  };
}
function uf(t, e) {
  return e = +e, function() {
    re(this, t).duration = e;
  };
}
function df(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? hf : uf)(e, t)) : te(this.node(), e).duration;
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
    for (var c = e[o], f = n[o], h = c.length, g = s[o] = new Array(h), d, p = 0; p < h; ++p)
      (d = c[p] || f[p]) && (g[p] = d);
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
    for (var o = i[s], c = o.length, f = a[s] = new Array(c), h, g, d = 0; d < c; ++d)
      (h = o[d]) && (g = t.call(h, h.__data__, d, o)) && ("__data__" in h && (g.__data__ = h.__data__), f[d] = g, Vn(f[d], e, n, d, f, te(h, n)));
  return new fe(a, this._parents, e, n);
}
function Sf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var c = i[o], f = c.length, h, g = 0; g < f; ++g)
      if (h = c[g]) {
        for (var d = t.call(h, h.__data__, g, c), p, v = te(h, n), C = 0, I = d.length; C < I; ++C)
          (p = d[C]) && Vn(p, e, n, C, d, v);
        a.push(d), s.push(h);
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
function Df(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = Oe(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function If(t, e, n) {
  var i, r, a;
  return function() {
    var s = Oe(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), Oe(this, t))), s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o));
  };
}
function Rf(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = re(this, t), f = c.on, h = c.value[a] == null ? o || (o = os(e)) : void 0;
    (f !== n || r !== h) && (i = (n = f).copy()).on(s, r = h), c.on = i;
  };
}
function Mf(t, e, n) {
  var i = (t += "") == "transform" ? Oc : ss;
  return e == null ? this.styleTween(t, Nf(t, i)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, If(t, i, Gi(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, Df(t, i, e), n).on("end.style." + t, null);
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
        var h = te(c, e);
        Vn(c, t, n, f, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
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
      var f = re(this, i), h = f.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
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
    let s = this._x1, o = this._y1, c = i - e, f = r - n, h = s - e, g = o - n, d = h * h + g * g;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (d > me) if (!(Math.abs(g * c - f * h) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = i - s, v = r - o, C = c * c + f * f, I = p * p + v * v, A = Math.sqrt(C), T = Math.sqrt(d), k = a * Math.tan((Ei - Math.acos((C + d - I) / (2 * A * T))) / 2), x = k / T, S = k / A;
      Math.abs(x - 1) > me && this._append`L${e + x * h},${n + x * g}`, this._append`A${a},${a},0,0,${+(g * p > h * v)},${this._x1 = e + S * c},${this._y1 = n + S * f}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), c = i * Math.sin(r), f = e + o, h = n + c, g = 1 ^ s, d = s ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${h}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - h) > me) && this._append`L${f},${h}`, i && (d < 0 && (d = d % Si + Si), d > Kf ? this._append`A${i},${i},0,1,${g},${e - o},${n - c}A${i},${i},0,1,${g},${this._x1 = f},${this._y1 = h}` : d > me && this._append`A${i},${i},0,${+(d >= Ei)},${g},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
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
function th(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], c = 0; r > 0 && o > 0 && (c + o + 1 > i && (o = Math.max(1, i - c)), a.push(n.substring(r -= o, r + o)), !((c += o + 1) > i)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function eh(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var nh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ln(t) {
  if (!(e = nh.exec(t))) throw new Error("invalid format: " + t);
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
function ih(t) {
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
function rh(t, e) {
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
  s: rh,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Ar = Array.prototype.map, $r = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ah(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : th(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : eh(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(g) {
    g = Ln(g);
    var d = g.fill, p = g.align, v = g.sign, C = g.symbol, I = g.zero, A = g.width, T = g.comma, k = g.precision, x = g.trim, S = g.type;
    S === "n" ? (T = !0, S = "g") : Er[S] || (k === void 0 && (k = 12), x = !0, S = "g"), (I || d === "0" && p === "=") && (I = !0, d = "0", p = "=");
    var $ = C === "$" ? n : C === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", E = C === "$" ? i : /[%p]/.test(S) ? s : "", B = Er[S], F = /[defgprs%]/.test(S);
    k = k === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function O(b) {
      var Z = $, V = E, K, nt, ft;
      if (S === "c")
        V = B(b) + V, b = "";
      else {
        b = +b;
        var W = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : B(Math.abs(b), k), x && (b = ih(b)), W && +b == 0 && v !== "+" && (W = !1), Z = (W ? v === "(" ? v : o : v === "-" || v === "(" ? "" : v) + Z, V = (S === "s" ? $r[8 + fs / 3] : "") + V + (W && v === "(" ? ")" : ""), F) {
          for (K = -1, nt = b.length; ++K < nt; )
            if (ft = b.charCodeAt(K), 48 > ft || ft > 57) {
              V = (ft === 46 ? r + b.slice(K + 1) : b.slice(K)) + V, b = b.slice(0, K);
              break;
            }
        }
      }
      T && !I && (b = e(b, 1 / 0));
      var j = Z.length + b.length + V.length, U = j < A ? new Array(A - j + 1).join(d) : "";
      switch (T && I && (b = e(U + b, U.length ? A - V.length : 1 / 0), U = ""), p) {
        case "<":
          b = Z + b + V + U;
          break;
        case "=":
          b = Z + U + b + V;
          break;
        case "^":
          b = U.slice(0, j = U.length >> 1) + Z + b + V + U.slice(j);
          break;
        default:
          b = U + Z + b + V;
          break;
      }
      return a(b);
    }
    return O.toString = function() {
      return g + "";
    }, O;
  }
  function h(g, d) {
    var p = f((g = Ln(g), g.type = "f", g)), v = Math.max(-8, Math.min(8, Math.floor(Fe(d) / 3))) * 3, C = Math.pow(10, -v), I = $r[8 + v / 3];
    return function(A) {
      return p(C * A) + I;
    };
  }
  return {
    format: f,
    formatPrefix: h
  };
}
var cn, hs, us;
sh({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function sh(t) {
  return cn = ah(t), hs = cn.format, us = cn.formatPrefix, cn;
}
function oh(t) {
  return Math.max(0, -Fe(Math.abs(t)));
}
function lh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Fe(e) / 3))) * 3 - Fe(Math.abs(t)));
}
function ch(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Fe(e) - Fe(t)) + 1;
}
function fh(t, e) {
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
function hh(t) {
  return function() {
    return t;
  };
}
function uh(t) {
  return +t;
}
var Nr = [0, 1];
function Re(t) {
  return t;
}
function Ai(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : hh(isNaN(e) ? NaN : 0.5);
}
function dh(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function ph(t, e, n) {
  var i = t[0], r = t[1], a = e[0], s = e[1];
  return r < i ? (i = Ai(r, i), a = n(s, a)) : (i = Ai(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function _h(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Ai(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = mo(t, o, 1, i) - 1;
    return a[c](r[c](o));
  };
}
function gh(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function mh() {
  var t = Nr, e = Nr, n = Ui, i, r, a, s = Re, o, c, f;
  function h() {
    var d = Math.min(t.length, e.length);
    return s !== Re && (s = dh(t[0], t[d - 1])), o = d > 2 ? _h : ph, c = f = null, g;
  }
  function g(d) {
    return d == null || isNaN(d = +d) ? a : (c || (c = o(t.map(i), e, n)))(i(s(d)));
  }
  return g.invert = function(d) {
    return s(r((f || (f = o(e, t.map(i), Qt)))(d)));
  }, g.domain = function(d) {
    return arguments.length ? (t = Array.from(d, uh), h()) : t.slice();
  }, g.range = function(d) {
    return arguments.length ? (e = Array.from(d), h()) : e.slice();
  }, g.rangeRound = function(d) {
    return e = Array.from(d), n = Rc, h();
  }, g.clamp = function(d) {
    return arguments.length ? (s = d ? !0 : Re, h()) : s !== Re;
  }, g.interpolate = function(d) {
    return arguments.length ? (n = d, h()) : n;
  }, g.unknown = function(d) {
    return arguments.length ? (a = d, g) : a;
  }, function(d, p) {
    return i = d, r = p, h();
  };
}
function vh() {
  return mh()(Re, Re);
}
function wh(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = Ln(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = lh(r, s)) && (i.precision = a), us(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = ch(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = oh(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return hs(i);
}
function yh(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return bo(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return wh(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], c, f, h = 10;
    for (o < s && (f = s, s = o, o = f, f = r, r = a, a = f); h-- > 0; ) {
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
function ue() {
  var t = vh();
  return t.copy = function() {
    return gh(t, ue());
  }, fh.apply(t, arguments), yh(t);
}
function fn(t) {
  return function() {
    return t;
  };
}
const Xi = Math.sqrt, ds = Math.PI, bh = 2 * ds;
function xh(t) {
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
const kh = {
  draw(t, e) {
    const n = Xi(e / ds);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, bh);
  }
}, Yn = Xi(3), ps = {
  draw(t, e) {
    const n = -Xi(e / (Yn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Yn * n, -n), t.lineTo(Yn * n, -n), t.closePath();
  }
};
function _s(t, e) {
  let n = null, i = xh(r);
  t = typeof t == "function" ? t : fn(t || kh), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
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
function gs(t, e, n, i, r) {
  var f, h, g;
  let a = -1, s = -1;
  const o = [];
  if (!i && !r) {
    for (const d of t) {
      const p = d.children;
      p && p.forEach((v) => {
        e.includes(v.type) && ((a < 0 || v.fmin < a) && (a = v.fmin), (s < 0 || v.fmax > s) && (s = v.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  const c = [];
  for (const d of t)
    (i && ((f = d.name) == null ? void 0 : f.toLowerCase().includes(i.toLowerCase())) || r && (((h = d.name) == null ? void 0 : h.includes(r)) || ((g = d.id) == null ? void 0 : g.includes(r)))) && c.push(d);
  if (c.length === 0) {
    for (const d of t) {
      const p = d.children;
      p && p.forEach((v) => {
        e.includes(v.type) && ((a < 0 || v.fmin < a) && (a = v.fmin), (s < 0 || v.fmax > s) && (s = v.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  for (const d of c) {
    const p = d.children;
    p && p.forEach((v) => {
      if (e.includes(v.type)) {
        if (n) {
          const C = v.fmin < n.start, I = v.fmax > n.end;
          if (C && I)
            return;
        }
        (a < 0 || v.fmin < a) && (a = v.fmin), (s < 0 || v.fmax > s) && (s = v.fmax, o.push({
          name: v.name || "unnamed",
          type: v.type,
          fmin: v.fmin,
          fmax: v.fmax
        }));
      }
    });
  }
  return {
    fmin: a,
    fmax: s
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
const Th = [
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
], Eh = [
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
const be = 10, he = 10;
function Ji(t) {
  return `${t},${be} ${t + he / 2},${be / 2} ${t},0 ${t - he / 2},${be / 2}`;
}
function vs(t) {
  return `${t - he / 2},${be} ${t},0 ${t + he / 2},${be}`;
}
function Dr(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let i = !0, r = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => r != a.row && i ? !1 : (r != a.row && (r = a.row, i = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (i = !1), !0)), i ? r : r + 1;
  }
}
function ws(t) {
  return `${t - he / 2},${be} ${t + he / 2},${be} ${t - he / 2},0 ${t + he / 2},0`;
}
function Sh(t) {
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
function Ah(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= r && c >= r || c <= i && c >= i || o >= r && c <= i;
  });
}
function ys(t, e) {
  const n = [];
  return t.forEach((i) => {
    var f, h;
    const r = bs(i), { type: a, fmax: s, fmin: o } = i, c = Ah(
      n,
      i,
      e
    );
    if (c >= 0 && a != "deletion") {
      const g = n[c], d = g.variantSet ? g.variantSet.findIndex(
        (p) => p.type === a && p.consequence === r
      ) : -1;
      if (d >= 0) {
        const p = Math.min(
          g.variantSet[d].fmin,
          o
        ), v = Math.max(
          g.variantSet[d].fmax,
          s
        );
        g.fmin = p, g.fmax = v, g.variantSet[d].fmin = p, g.variantSet[d].fmax = v, (f = g.variantSet[d].variants) == null || f.push(
          i
        );
      } else {
        const p = Math.min(g.fmin, o), v = Math.max(g.fmax, s);
        g.fmin = p, g.fmax = v, g.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      (h = g.variants) == null || h.push(i), g.fmin = Math.min(o, g.fmin), g.fmax = Math.max(s, g.fmax), n[c] = g;
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
    return e += Ir(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Ir(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Ir(t) {
  const { descriptionWidth: e } = Sh(t);
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
    const h = `${o.length - 1}bp deleted`;
    let g;
    s === "ALT_MISSING" ? (g = "unknown length inserted", s = "n+") : g = `${s.length - 1}bp inserted`, c = `${h}; ${g}`;
  } else
    c = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
}
function Ni(t) {
  return (t.variants ?? []).map((n) => {
    const i = $h(n);
    return {
      ...i,
      consequence: i.consequence || "UNKNOWN"
    };
  });
}
function Di(t) {
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
function Ii(t) {
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
function hn(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function $h(t) {
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
    allele_of_genes: hn(t.allele_of_genes),
    allele_ids: hn(t.allele_ids),
    alternative_alleles: hn(t.alternative_alleles),
    impact: hn(t.impact)
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
function Nh(t) {
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
function Dh() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ji(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("transcript_ablation")}</li>`, t += `<li>${Lt("splice_acceptor_variant")}</li>`, t += `<li>${Lt("splice_donor_variant")}</li>`, t += `<li>${Lt("stop_gained")}</li>`, t += `<li>${Lt("frameshift_variant")}</li>`, t += `<li>${Lt("stop_lost")}</li>`, t += `<li>${Lt("start_lost")}</li>`, t += `<li>${Lt("inframe_insertion")}</li>`, t += `<li>${Lt("inframe_deletion")}</li>`, t += `<li>${Lt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("protein_altering_variant")}</li>`, t += `<li>${Lt("splice_region_variant")}</li>`, t += `<li>${Lt("start_retained_variant")}</li>`, t += `<li>${Lt("stop_retained_variant")}</li>`, t += `<li>${Lt("synonymous_variant")}</li>`, t += `<li>${Lt("coding_sequence_variant")}</li>`, t += `<li>${Lt("five_prime_UTR_variant")}</li>`, t += `<li>${Lt("three_prime_UTR_variant")}</li>`, t += `<li>${Lt("intron_variant")}</li>`, t += `<li>${Lt("non_coding_transcript_variant")}</li>`, t += `<li>${Lt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Ih(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ct(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Ih(t.strand)})</td></tr>`, e += "</tbody></table>", e;
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
class Rh {
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
    initialHighlight: h,
    trackData: g,
    variantData: d,
    geneBounds: p,
    geneSymbol: v,
    geneId: C
  }) {
    this.trackData = g ?? [], this.variantData = d ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = h, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0, this.geneBounds = p, this.geneSymbol = v, this.geneId = C;
  }
  DrawTrack() {
    console.log("IsoformAndVariantTrack.DrawTrack() START", {
      hasTrackData: !!this.trackData,
      trackDataType: typeof this.trackData,
      trackDataIsArray: Array.isArray(this.trackData),
      trackDataLength: this.trackData ? this.trackData.length : "UNDEFINED",
      hasVariantData: !!this.variantData,
      variantDataLength: this.variantData ? this.variantData.length : "UNDEFINED",
      isoformFilter: this.isoformFilter,
      variantFilter: this.variantFilter
    });
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight;
    console.log("IsoformAndVariantTrack.DrawTrack() - About to filter variant data");
    const r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    );
    console.log("IsoformAndVariantTrack.DrawTrack() - Variant data filtered", {
      filteredLength: r ? r.length : "UNDEFINED"
    });
    const a = this.viewer, s = this.width, o = this.binRatio, c = Nh(r), f = c.length;
    if (!this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0)
      throw console.error("IsoformAndVariantTrack.DrawTrack() - CRITICAL: trackData is invalid!", {
        trackData: this.trackData,
        type: typeof this.trackData,
        isArray: Array.isArray(this.trackData),
        length: this.trackData ? this.trackData.length : "UNDEFINED"
      }), new Error("trackData must be a non-empty array");
    const h = this.trackData[0].source, g = this.trackData[0].seqId, d = !e || e.length === 0 ? 9 : 30, p = ["UTR", "five_prime_UTR", "three_prime_UTR"], v = ["CDS"], C = ["exon"], I = this.transcriptTypes, A = gs(n, I, this.geneBounds, this.geneSymbol, this.geneId);
    let T = A.fmin, k = A.fmax;
    this.geneBounds && (T = this.geneBounds.start, k = this.geneBounds.end, A.fmin < T && (T = A.fmin), A.fmax > k && (k = A.fmax));
    const x = 10, S = 10, $ = 40, E = 20, B = 2, F = 0, O = 10, b = 10, Z = 4, V = 20, K = 10, nt = `0,0 0,${V} ${K},${K}`, ft = 10, W = 40, j = 22.5, U = ue().domain([T, k]).range([0, s]), rt = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,35)"), Rt = a.append("g").attr("class", "label"), J = {};
    for (let tt = 0, dt = p.length; tt < dt; tt++)
      J[p[tt]] = 200;
    for (let tt = 0, dt = v.length; tt < dt; tt++)
      J[v[tt]] = 1e3;
    for (let tt = 0, dt = C.length; tt < dt; tt++)
      J[C[tt]] = 100;
    const gt = {};
    console.log("IsoformAndVariantTrack DEBUG - Pre-sort isoformData:", {
      count: n.length,
      data: n.map((tt) => ({
        name: tt.name,
        id: tt.id,
        type: tt.type,
        fmin: tt.fmin,
        fmax: tt.fmax,
        selected: tt.selected,
        hasChildren: !!tt.children,
        childrenCount: tt.children ? tt.children.length : 0
      }))
    }), n = n.sort((tt, dt) => {
      if (tt.selected && !dt.selected)
        return -1;
      if (!tt.selected && dt.selected)
        return 1;
      const ct = tt.fmin || 0, ut = dt.fmin || 0;
      return ct - ut;
    });
    let St = 0;
    const pt = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), Q = () => {
      pt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, lt = ys(
      r,
      (k - T) * o
    ), ht = lt.filter((tt) => tt.type === "deletion"), Et = lt.filter((tt) => tt.type !== "deletion"), Nt = [];
    ht.forEach((tt) => {
      var z;
      const { fmax: dt, fmin: ct } = tt, ut = this.width, zt = Qe(tt), H = Ni(tt), yt = Di(tt), vt = $i(H), mt = Ii(H)[0];
      Nt.push({
        fmin: ct,
        fmax: dt,
        row: Dr(Nt, ct, dt)
      });
      const m = Math.max(Math.ceil(U(dt) - U(ct)), B);
      rt.append("rect").attr("class", "variant-deletion").attr("id", `variant-${ct}`).attr("x", U(ct)).attr(
        "transform",
        `translate(0,${b * Dr(Nt, ct, dt)})`
      ).attr("z-index", 30).attr("fill", mt).attr("height", b).attr("width", m).on("click", () => {
        Tt(pt, vt, Q);
      }).on("mouseover", (L) => {
        const G = L.variant;
        Jt(
          ".variant-deletion"
        ).filter((w) => w.variant === G).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((w) => w.variant === G).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-deletion").filter((L) => L.selected !== "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ct,
        fmax: dt,
        variant: zt + ct,
        alleles: yt
      });
      {
        let L = 0;
        L = U(ct);
        const G = b * f + j, w = Rt.append("text").attr("class", "variantLabel").attr("fill", mt).attr("opacity", 0).attr("height", F).attr("transform", `translate(${L},${G})`).text(zt).on("click", () => {
          Tt(pt, vt, Q);
        }).datum({ fmin: ct, variant: zt + ct }), R = ((z = w.node()) == null ? void 0 : z.getBBox().width) ?? 0;
        if (R + L > ut) {
          const u = R + L - ut;
          L -= u, w.attr(
            "transform",
            `translate(${L},${G})`
          );
        }
      }
    });
    const $t = ze(this.viewer), ot = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${$t})`);
    Et.forEach((tt) => {
      var G;
      const { type: dt, fmax: ct, fmin: ut } = tt;
      let zt = !0, H = !1;
      const yt = this.width, vt = Qe(tt), mt = Ni(tt), m = Di(tt), z = $i(mt), L = Ii(mt)[0];
      if (dt.toLowerCase() === "snv" || dt.toLowerCase() === "point_mutation" ? (H = !0, ot.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${ut}`).attr("points", Ji(U(ut))).attr("fill", L).attr("x", U(ut)).attr(
        "transform",
        `translate(0,${b * c.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        Tt(pt, z, Q);
      }).on("mouseover", function(w) {
        const R = w.variant;
        Jt(
          ".variant-SNV"
        ).filter((u) => u.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-SNV").filter((w) => w.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ct,
        variant: vt + ut,
        alleles: m
      })) : dt.toLowerCase() === "insertion" ? (H = !0, ot.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${ut}`).attr("points", vs(U(ut))).attr("fill", L).attr("x", U(ut)).attr(
        "transform",
        `translate(0,${b * c.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        Tt(pt, z, Q);
      }).on("mouseover", (w) => {
        const R = w.variant;
        Jt(
          ".variant-insertion"
        ).filter((u) => u.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(
          ".variant-insertion"
        ).filter((w) => w.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ct,
        variant: vt + ut,
        alleles: m
      })) : dt.toLowerCase() === "delins" || dt.toLowerCase() === "substitution" || dt.toLowerCase() === "indel" || dt.toLowerCase() === "mnv" ? (H = !0, ot.append("polygon").attr("class", "variant-delins").attr("id", `variant-${ut}`).attr("points", ws(U(ut))).attr("x", U(ut)).attr(
        "transform",
        `translate(0,${b * c.indexOf("delins")})`
      ).attr("fill", L).attr("z-index", 30).on("click", () => {
        Tt(pt, z, Q);
      }).on("mouseover", (w) => {
        const R = w.variant;
        Jt(
          ".variant-delins"
        ).filter((u) => u.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-delins").filter((w) => w.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ct,
        variant: vt + ut,
        alleles: m
      })) : zt = !1, zt) {
        let w = 0;
        w = H ? U(ut) - ft / 2 : U(ut);
        const R = b * f + j, u = Rt.append("text").attr("class", "variantLabel").attr("fill", L).attr("opacity", 0).attr("height", F).attr("transform", `translate(${w},${R})`).text(vt).on("click", () => {
          Tt(pt, z, Q);
        }).datum({ fmin: ut, variant: vt + ut }), P = ((G = u.node()) == null ? void 0 : G.getBBox().width) ?? 0;
        if (P + w > yt) {
          const it = P + w - yt;
          w -= it, u.attr("transform", `translate(${w},35)`);
        }
      }
    });
    const at = $t;
    Rt.attr("transform", `translate(0,${at})`);
    const kt = ze(this.viewer) + j, Dt = a.append("g").attr("transform", `translate(0,${kt})`).attr("class", "track");
    let st = 0;
    const _t = [];
    let q = -1, xt = -1;
    const Tt = this.renderTooltipDescription, Ft = [];
    for (let tt = 0; tt < n.length && st < d; tt++) {
      const dt = n[tt];
      let ct = dt.children;
      if (ct) {
        const ut = dt.selected;
        console.log("IsoformAndVariantTrack DEBUG - Before children sort:", {
          featureName: dt.name,
          featureId: dt.id,
          childrenCount: ct.length,
          children: ct.map((H) => ({
            name: H.name,
            type: H.type,
            id: H.id,
            hasName: H.name !== void 0,
            nameType: typeof H.name
          }))
        });
        try {
          ct = ct.sort((H, yt) => {
            const vt = H.name || "", mt = yt.name || "";
            return console.log("Sorting children:", { aName: vt, bName: mt, aHasName: !!H.name, bHasName: !!yt.name }), vt.localeCompare(mt);
          });
        } catch (H) {
          console.error("ERROR sorting feature children:", {
            error: H instanceof Error ? H.message : String(H),
            feature: dt.name,
            children: ct
          });
        }
        let zt = !1;
        ct.forEach((H) => {
          var vt;
          if (e && e.length !== 0 && !(e.includes(H.id) || e.includes(H.name)))
            return;
          if (this.geneBounds) {
            const mt = H.fmin < this.geneBounds.start, m = H.fmax > this.geneBounds.end;
            if (mt && m)
              return;
          }
          if (Ft.includes(H.id))
            return;
          Ft.push(H.id);
          const yt = H.type;
          if (I.includes(yt)) {
            let mt = Yi(
              _t,
              U(H.fmin),
              U(H.fmax)
            );
            if (st < d) {
              let m = "", z, L = !1;
              const G = dt.name;
              Object.keys(gt).includes(G) || (St += E, L = !0, gt[G] = "Green");
              const w = Dt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${st * $ + 10 + St})`
              );
              L && (m = G, z = w.append("text").attr("class", "geneLabel").attr("fill", ut ? "sandybrown" : "black").attr("height", F).attr(
                "transform",
                `translate(${U(H.fmin)},-${E})`
              ).text(m).on("click", () => {
                Tt(
                  pt,
                  Ct(dt),
                  Q
                );
              }).datum({
                fmin: H.fmin
              })), w.append("polygon").datum(() => ({
                fmin: H.fmin,
                fmax: H.fmax,
                strand: dt.strand
              })).attr("class", "transArrow").attr("points", nt).attr(
                "transform",
                (l) => dt.strand > 0 ? `translate(${Number(U(l.fmax))},0)` : `translate(${Number(U(l.fmin))},${V}) rotate(180)`
              ).on("click", () => {
                Tt(
                  pt,
                  Ct(H),
                  Q
                );
              });
              const R = U(H.fmin), u = U(H.fmax) - U(H.fmin);
              w.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", Z).attr("transform", `translate(${R},0)`).attr("width", u).on("click", () => {
                Tt(
                  pt,
                  Ct(H),
                  Q
                );
              }).datum({
                fmin: H.fmin,
                fmax: H.fmax
              }), console.log("DEBUG - About to set text_string:", {
                featureChildName: H.name,
                hasName: H.name !== void 0,
                nameType: typeof H.name,
                featureChildId: H.id,
                featureType: H.type
              }), m = H.name || "", console.log("DEBUG - text_string set to:", {
                text_string: m,
                text_string_length: m.length,
                isEmpty: m === ""
              }), z = w.append("text").attr("class", "transcriptLabel").attr("fill", ut ? "sandybrown" : "gray").attr("opacity", ut ? 1 : 0.5).attr("height", F).attr("transform", `translate(${U(H.fmin)},0)`).text(m).on("click", () => {
                Tt(
                  pt,
                  Ct(H),
                  Q
                );
              }).datum({
                fmin: H.fmin
              }), console.log("DEBUG - About to calculate text_width:", {
                text_string: m,
                hasLength: m != null,
                willCalculate: m.length * 2
              });
              let P = m.length * 2;
              try {
                P = ((vt = z.node()) == null ? void 0 : vt.getBBox().width) ?? 0;
              } catch {
              }
              Number(P + U(H.fmin)) > s;
              const it = P > U(H.fmax) - U(H.fmin) ? U(H.fmin) + P : U(H.fmax);
              if (_t[mt]) {
                const l = _t[mt];
                l.push(`${U(H.fmin)}:${it}`), _t[mt] = l;
              } else
                _t[mt] = [
                  `${U(H.fmin)}:${it}`
                ];
              if ((q < 0 || q > H.fmin) && (q = H.fmin), (xt < 0 || xt < H.fmax) && (xt = H.fmax), H.children) {
                console.log("IsoformAndVariantTrack DEBUG - Before exon/CDS sort:", {
                  parentName: H.name,
                  childrenCount: H.children.length,
                  children: H.children.map((l) => ({
                    type: l.type,
                    hasType: l.type !== void 0,
                    typeType: typeof l.type,
                    sortWeight: J[l.type] || "no-weight"
                  }))
                });
                try {
                  H.children = H.children.sort((l, N) => {
                    const M = J[l.type], _ = J[N.type];
                    if (typeof M == "number" && typeof _ == "number")
                      return M - _;
                    if (typeof M == "number" && typeof _ != "number")
                      return -1;
                    if (typeof M != "number" && typeof _ == "number")
                      return 1;
                    const y = l.type || "", D = N.type || "";
                    return console.log("Exon/CDS sort comparison:", {
                      aType: y,
                      bType: D,
                      aHasType: l.type !== void 0,
                      bHasType: N.type !== void 0,
                      aTypeType: typeof l.type,
                      bTypeType: typeof N.type
                    }), y.localeCompare(D);
                  });
                } catch (l) {
                  console.error("ERROR sorting exons/CDS:", {
                    error: l instanceof Error ? l.message : String(l),
                    stack: l instanceof Error ? l.stack : void 0,
                    parent: H.name,
                    children: H.children
                  });
                }
                H.children.forEach((l) => {
                  const N = l.type;
                  C.includes(N) ? w.append("rect").attr("class", "exon").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${x - Z})`
                  ).attr("height", x).attr("z-index", 10).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ct(H),
                      Q
                    );
                  }).datum({ fmin: l.fmin, fmax: l.fmax }) : v.includes(N) ? w.append("rect").attr("class", "CDS").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${S - Z})`
                  ).attr("z-index", 20).attr("height", S).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ct(H),
                      Q
                    );
                  }).datum({ fmin: l.fmin, fmax: l.fmax }) : p.includes(N) && w.append("rect").attr("class", "UTR").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${O - Z})`
                  ).attr("z-index", 20).attr("height", O).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ct(H),
                      Q
                    );
                  }).datum({ fmin: l.fmin, fmax: l.fmax });
                });
              }
              st += 1;
            }
            if (st === d && !zt) {
              const m = ks(h, g, T, k);
              ++mt, zt = !0, Dt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${st * $ + 20 + St})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(m);
            }
          }
        });
      }
    }
    return i && Ki(i, a), st === 0 && Dt.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), st * $ + St + W;
  }
  filterVariantData(e, n) {
    return console.log("IsoformAndVariantTrack.filterVariantData() START", {
      hasVariantData: !!e,
      variantDataType: typeof e,
      variantDataIsArray: Array.isArray(e),
      variantDataLength: e ? e.length : "UNDEFINED",
      hasVariantFilter: !!n,
      variantFilterType: typeof n,
      variantFilterIsArray: Array.isArray(n),
      variantFilterLength: n ? n.length : "UNDEFINED"
    }), !n || n.length === 0 ? (console.log("IsoformAndVariantTrack.filterVariantData() - No filter, returning all data"), e) : !e || !Array.isArray(e) ? (console.error("IsoformAndVariantTrack.filterVariantData() - Invalid variantData!", {
      variantData: e,
      type: typeof e
    }), []) : e.filter((i) => {
      var a, s, o, c;
      let r = !1;
      try {
        (n.includes(i.name) || (a = i.allele_symbols) != null && a.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = i.symbol) != null && s.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (o = i.symbol_text) != null && o.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((c = i.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((h) => {
          n.includes(h) && (r = !0);
        });
      } catch {
        r = !0;
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
class Mh {
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
    variantData: h
  }) {
    this.trackData = f ?? [], this.variantData = h ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = c, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
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
    a.forEach((at) => {
      const kt = Di(at);
      s.set(at, kt);
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, h = ["UTR", "five_prime_UTR", "three_prime_UTR"], g = ["CDS"], d = ["exon"], p = this.transcriptTypes, v = gs(i, p), C = v.fmin, I = v.fmax, A = 10, T = 10, k = 10, x = 40, S = 20, $ = 2, E = 0, B = 10, F = 10, O = 20, b = 4, Z = 20, V = 10, K = `0,0 0,${Z} ${V},${V}`, nt = 10, ft = 10, W = (at) => `${at - ft / 2},${nt} ${at},0 ${at + ft / 2},${nt}`, j = (at) => `${at - ft / 2},${nt} ${at + ft / 2},${nt} ${at - ft / 2},0 ${at + ft / 2},0`, U = (at) => `${at},${nt} ${at + ft / 2},${nt / 2} ${at},0 ${at - ft / 2},${nt / 2}`, rt = ue().domain([C, I]).range([0, c]), Rt = ze(this.viewer), J = o.append("g").attr("transform", `translate(0,${Rt})`).attr("class", "track"), gt = {};
    for (const at of h)
      gt[at] = 200;
    for (const at of g)
      gt[at] = 1e3;
    for (const at of d)
      gt[at] = 100;
    const St = {};
    i = i.sort((at, kt) => at.selected && !kt.selected ? -1 : !at.selected && kt.selected ? 1 : at.name - kt.name);
    let pt = 0;
    const Q = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), lt = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ht = 0;
    const Et = [];
    let Nt = -1, $t = -1;
    const ot = this.renderTooltipDescription;
    for (let at = 0; at < i.length && ht < A; at++) {
      const kt = i[at];
      let Dt = kt.children;
      if (Dt) {
        const st = kt.selected;
        Dt = Dt.sort((q, xt) => q.name < xt.name ? -1 : q.name > xt.name ? 1 : q - xt);
        let _t = !1;
        Dt.forEach((q) => {
          const xt = q.type;
          if (p.includes(xt)) {
            let Tt = Yi(
              Et,
              rt(q.fmin),
              rt(q.fmax)
            );
            if (ht < A) {
              let Ft, tt, dt = !1;
              Object.keys(St).includes(kt.name) || (pt += S, dt = !0, St[kt.name] = "Green");
              const ct = J.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ht * x + 10 + pt})`
              );
              dt && (Ft = kt.name, tt = ct.append("text").attr("class", "geneLabel").attr("fill", st ? "sandybrown" : "black").attr("height", E).attr(
                "transform",
                `translate(${rt(q.fmin)},-${S})`
              ).text(Ft).on("click", () => {
                ot(
                  Q,
                  Ct(kt),
                  lt
                );
              }).datum({ fmin: q.fmin })), ct.append("polygon").datum(() => ({
                fmin: q.fmin,
                fmax: q.fmax,
                strand: kt.strand
              })).attr("class", "transArrow").attr("points", K).attr("transform", (H) => kt.strand > 0 ? `translate(${Number(rt(H.fmax))},0)` : `translate(${Number(rt(H.fmin))},${Z}) rotate(180)`).on("click", () => {
                ot(
                  Q,
                  Ct(q),
                  lt
                );
              }), ct.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + E).attr("height", b).attr("transform", `translate(${rt(q.fmin)},0)`).attr("width", rt(q.fmax) - rt(q.fmin)).on("click", () => {
                ot(
                  Q,
                  Ct(q),
                  lt
                );
              }).datum({ fmin: q.fmin, fmax: q.fmax }), Ft = q.name, tt = ct.append("text").attr("class", "transcriptLabel").attr("fill", st ? "sandybrown" : "gray").attr("opacity", st ? 1 : 0.5).attr("height", E).attr("transform", `translate(${rt(q.fmin)},0)`).text(Ft).on("click", () => {
                ot(
                  Q,
                  Ct(q),
                  lt
                );
              }).datum({ fmin: q.fmin });
              let ut = Ft.length * 2;
              try {
                ut = tt.node().getBBox().width;
              } catch {
              }
              Number(ut + rt(q.fmin)) > c;
              const zt = ut > rt(q.fmax) - rt(q.fmin) ? rt(q.fmin) + ut : rt(q.fmax);
              if (Et[Tt]) {
                const H = Et[Tt];
                H.push(`${rt(q.fmin)}:${zt}`), Et[Tt] = H;
              } else
                Et[Tt] = [
                  `${rt(q.fmin)}:${zt}`
                ];
              (Nt < 0 || Nt > q.fmin) && (Nt = q.fmin), ($t < 0 || $t < q.fmax) && ($t = q.fmax), q.children && (q.children = q.children.sort((H, yt) => {
                const vt = gt[H.type], mt = gt[yt.type];
                return typeof vt == "number" && typeof mt == "number" ? vt - mt : typeof vt == "number" && typeof mt != "number" ? -1 : typeof vt != "number" && typeof mt == "number" ? 1 : H.type - yt.type;
              }), q.children.forEach((H) => {
                const yt = H.type;
                let vt = !1;
                d.includes(yt) ? (vt = !0, ct.append("rect").attr("class", "exon").attr("x", rt(H.fmin)).attr(
                  "transform",
                  `translate(0,${T - b})`
                ).attr("height", T).attr("z-index", 10).attr("width", rt(H.fmax) - rt(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(q),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : g.includes(yt) ? (vt = !0, ct.append("rect").attr("class", "CDS").attr("x", rt(H.fmin)).attr(
                  "transform",
                  `translate(0,${k - b})`
                ).attr("z-index", 20).attr("height", k).attr("width", rt(H.fmax) - rt(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(q),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : h.includes(yt) && (vt = !0, ct.append("rect").attr("class", "UTR").attr("x", rt(H.fmin)).attr(
                  "transform",
                  `translate(0,${B - b})`
                ).attr("z-index", 20).attr("height", B).attr("width", rt(H.fmax) - rt(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(q),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })), vt && a.forEach((mt) => {
                  const { type: m, fmax: z, fmin: L } = mt;
                  if (L < H.fmin && z > H.fmin || z > H.fmax && L < H.fmax || z <= H.fmax && L >= H.fmin) {
                    let w = !0;
                    const R = Ni(mt), u = Ii(R)[0], P = $i(R), it = Math.max(
                      Math.ceil(rt(z) - rt(L)),
                      $
                    );
                    if (m.toLowerCase() === "deletion" || m.toLowerCase() === "mnv" ? ct.append("rect").attr("class", "variant-deletion").attr("x", rt(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).attr("fill", u).attr("height", F).attr("width", it).on("click", () => {
                      ot(
                        Q,
                        P,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "snv" || m.toLowerCase() === "point_mutation" ? ct.append("polygon").attr("class", "variant-SNV").attr("points", U(rt(L))).attr("fill", u).attr("x", rt(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        P,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "insertion" ? ct.append("polygon").attr("class", "variant-insertion").attr("points", W(rt(L))).attr("fill", u).attr("x", rt(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        P,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "delins" || m.toLowerCase() === "substitution" || m.toLowerCase() === "indel" ? ct.append("polygon").attr("class", "variant-delins").attr("points", j(rt(L))).attr("x", rt(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("fill", u).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        P,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : w = !1, w && f) {
                      const l = Qe(mt), N = l.length || 1;
                      ct.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        st ? "sandybrown" : u
                      ).attr("opacity", st ? 1 : 0.5).attr("height", E).attr(
                        "transform",
                        `translate(${rt(L - N / 2 * 100)},${O * 2.2 - b})`
                      ).html(l).on("click", () => {
                        ot(
                          Q,
                          P,
                          lt
                        );
                      }).datum({ fmin: q.fmin });
                    }
                  }
                });
              })), ht += 1;
            }
            ht === A && !_t && (++Tt, _t = !0, J.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ht * x + 20 + pt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", E).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (ht === 0 && J.append("text").attr("x", 30).attr("y", E + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        Ki(this.initialHighlight, this.viewer);
      } catch {
      }
    return ht * x + pt;
  }
  filterVariantData(e, n) {
    if (!n || n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a) => {
      var o, c, f, h, g;
      let s = !1;
      try {
        if (i.has(a.name) && (s = !0), (o = a.allele_symbols) != null && o.values) {
          const p = a.allele_symbols.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(p) && (s = !0);
        }
        if ((c = a.symbol) != null && c.values) {
          const p = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(p) && (s = !0);
        }
        if ((f = a.symbol_text) != null && f.values) {
          const p = a.symbol_text.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(p) && (s = !0);
        }
        const d = (g = (h = a.allele_ids) == null ? void 0 : h.values) == null ? void 0 : g[0];
        if (d) {
          let p = [];
          if (d.startsWith("[") && d.endsWith("]"))
            try {
              const v = JSON.parse(d);
              p = (Array.isArray(v) ? v : [v]).map(String);
            } catch {
              p = d.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            p = d.replace(/"|\\[|\\]| /g, "").split(",");
          for (const v of p)
            if (i.has(v)) {
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
class Lh {
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
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = (W = e[0]) == null ? void 0 : W.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], h = ["exon"], g = this.transcriptTypes, d = 10, p = 10, v = 40, C = 0, I = 10, A = 4, T = 20, k = 10, x = `0,0 0,${T} ${k},${k}`, S = this.renderTooltipDescription, $ = ue().domain([this.region.start, this.region.end]).range([0, r]), E = {};
    for (let j = 0, U = c.length; j < U; j++)
      E[c[j]] = 200;
    for (let j = 0, U = f.length; j < U; j++)
      E[f[j]] = 1e3;
    for (let j = 0, U = h.length; j < U; j++)
      E[h[j]] = 100;
    e = e.sort((j, U) => j.selected && !U.selected ? -1 : !j.selected && U.selected ? 1 : j.name - U.name);
    const B = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), F = () => {
      B.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const j = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, U] = n.split(":");
      j.append("polygon").attr("class", "variant-SNV").attr("points", Ji($(+U))).attr("fill", "red").attr("x", $(+U)).attr("z-index", 30);
    }
    const O = ze(this.viewer), b = i.append("g").attr("transform", `translate(0,${O})`).attr("class", "track");
    let Z = 0;
    const V = [];
    let K = -1, nt = -1;
    const ft = [];
    for (let j = 0; j < e.length && Z < o; j++) {
      const U = e[j];
      let rt = U.children;
      if (rt) {
        const Rt = U.selected;
        rt = rt.sort((J, gt) => J.name < gt.name ? -1 : J.name > gt.name ? 1 : 0), rt.forEach((J) => {
          var St, pt;
          const gt = J.type;
          if (!ft.includes(J.id) && (ft.push(J.id), g.includes(gt))) {
            let Q = Yi(
              V,
              $(J.fmin),
              $(J.fmax)
            );
            if (Z < o) {
              const lt = b.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${Z * v + 10})`
              ), ht = Math.max($(J.fmin), 0), Et = Math.min($(J.fmax), this.width);
              lt.append("polygon").datum(() => ({
                strand: U.strand
              })).attr("class", "transArrow").attr("points", x).attr(
                "transform",
                () => U.strand > 0 ? `translate(${Et},0)` : `translate(${ht},${T}) rotate(180)`
              ).on("click", () => {
                S(
                  B,
                  Ct(J),
                  F
                );
              }), lt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + C).attr("height", A).attr("transform", `translate(${ht},0)`).attr("width", Et - ht).datum({
                fmin: J.fmin,
                fmax: J.fmax
              }).on("click", () => {
                S(
                  B,
                  Ct(J),
                  F
                );
              });
              let Nt = J.name;
              U.name !== J.name && (Nt += ` (${U.name})`);
              let $t = Math.max($(J.fmin), 0);
              const ot = lt.append("svg:text").attr("class", "transcriptLabel").attr("fill", Rt ? "sandybrown" : "gray").attr("opacity", Rt ? 1 : 0.5).attr("height", C).attr("transform", `translate(${$t},0)`).text(Nt).datum({
                fmin: J.fmin
              }).on("click", () => {
                S(
                  B,
                  Ct(J),
                  F
                );
              });
              let at = 100;
              try {
                at = ((St = ot.node()) == null ? void 0 : St.getBBox().width) ?? 0;
              } catch {
              }
              if (at + $t > this.width) {
                const st = at + $t - this.width;
                $t -= st, ot.attr("transform", `translate(${$t},0)`);
              }
              let kt = Nt.length * 2;
              try {
                kt = ((pt = ot.node()) == null ? void 0 : pt.getBBox().width) ?? 0;
              } catch {
              }
              Number(kt + $(J.fmin)) > r;
              const Dt = kt > $(J.fmax) - $(J.fmin) ? $(J.fmin) + kt : $(J.fmax);
              if (V[Q]) {
                const st = V[Q];
                st.push(`${$(J.fmin)}:${Dt}`), V[Q] = st;
              } else
                V[Q] = [`${$(J.fmin)}:${Dt}`];
              (K < 0 || K > J.fmin) && (K = J.fmin), (nt < 0 || nt < J.fmax) && (nt = J.fmax), J.children && (J.children = J.children.sort(
                function(st, _t) {
                  const q = E[st.type], xt = E[_t.type];
                  if (typeof q == "number" && typeof xt == "number")
                    return q - xt;
                  if (typeof q == "number" && typeof xt != "number")
                    return -1;
                  if (typeof q != "number" && typeof xt == "number")
                    return 1;
                  const Tt = st.type || "", Ft = _t.type || "";
                  return Tt.localeCompare(Ft);
                }
              ), J.children.forEach((st) => {
                const _t = st.type;
                if ($(st.fmin) > this.width || $(st.fmax) < 0)
                  return;
                const q = Math.max($(st.fmin), 0), xt = Math.min($(st.fmax), this.width);
                h.includes(_t) ? lt.append("rect").attr("class", "exon").attr("x", q).attr(
                  "transform",
                  `translate(0,${d - A})`
                ).attr("height", d).attr("z-index", 10).attr("width", xt - q).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(J),
                    F
                  );
                }) : f.includes(_t) ? lt.append("rect").attr("class", "CDS").attr("x", q).attr(
                  "transform",
                  `translate(0,${p - A})`
                ).attr("z-index", 20).attr("height", p).attr("width", xt - q).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(J),
                    F
                  );
                }) : c.includes(_t) && lt.append("rect").attr("class", "UTR").attr("x", q).attr(
                  "transform",
                  `translate(0,${I - A})`
                ).attr("z-index", 20).attr("height", I).attr("width", xt - q).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(J),
                    F
                  );
                });
              })), Z += 1;
            }
            if (Z === o) {
              const lt = ks(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++Q, b.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${Z * v + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", C).html(lt);
            }
          }
        });
      }
    }
    return Z === 0 && b.append("text").attr("x", 30).attr("y", C + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), Z * v;
  }
}
class Oh {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = ue().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = No(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Jt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Jt(".x-local-axis .tick text").each(function() {
      const f = At(this).text();
      let h = "nucleotide nt-a";
      f === "T" ? h = "nucleotide nt-t" : f === "C" ? h = "nucleotide nt-c" : f === "G" && (h = "nucleotide nt-g"), At(this.parentNode).append("rect").attr("class", h).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = ue().domain([n, i]).range(this.track.range), s = lr(a).ticks(8, "s").tickSize(8);
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
function Ch(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mi && e.documentElement.namespaceURI === Mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Fh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = Ts(t);
  return (e.local ? Fh : Ch)(e);
}
function zh() {
}
function Ss(t) {
  return t == null ? zh : function() {
    return this.querySelector(t);
  };
}
function Bh(t) {
  typeof t != "function" && (t = Ss(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
  return new qt(i, this._parents);
}
function Hh() {
  return [];
}
function Ph(t) {
  return t == null ? Hh : function() {
    return this.querySelectorAll(t);
  };
}
function Vh(t) {
  typeof t != "function" && (t = Ph(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new qt(i, r);
}
function Uh(t) {
  return function() {
    return this.matches(t);
  };
}
function Zh(t) {
  typeof t != "function" && (t = Uh(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new qt(i, this._parents);
}
function As(t) {
  return new Array(t.length);
}
function qh() {
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
function Gh(t) {
  return function() {
    return t;
  };
}
var Lr = "$";
function Wh(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Cn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Xh(t, e, n, i, r, a, s) {
  var o, c, f = {}, h = e.length, g = a.length, d = new Array(h), p;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (d[o] = p = Lr + s.call(c, c.__data__, o, e), p in f ? r[o] = c : f[p] = c);
  for (o = 0; o < g; ++o)
    p = Lr + s.call(t, a[o], o, a), (c = f[p]) ? (i[o] = c, c.__data__ = a[o], f[p] = null) : n[o] = new Cn(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f[d[o]] === c && (r[o] = c);
}
function Yh(t, e) {
  if (!t)
    return p = new Array(this.size()), f = -1, this.each(function($) {
      p[++f] = $;
    }), p;
  var n = e ? Xh : Wh, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Gh(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = i[f], g = r[f], d = g.length, p = t.call(h, h && h.__data__, f, i), v = p.length, C = o[f] = new Array(v), I = s[f] = new Array(v), A = c[f] = new Array(d);
    n(h, g, C, I, A, p, e);
    for (var T = 0, k = 0, x, S; T < v; ++T)
      if (x = C[T]) {
        for (T >= k && (k = T + 1); !(S = I[k]) && ++k < v; ) ;
        x._next = S || null;
      }
  }
  return s = new qt(s, i), s._enter = o, s._exit = c, s;
}
function Kh() {
  return new qt(this._exit || this._groups.map(As), this._parents);
}
function Jh(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function Qh(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], h = c.length, g = s[o] = new Array(h), d, p = 0; p < h; ++p)
      (d = c[p] || f[p]) && (g[p] = d);
  for (; o < i; ++o)
    s[o] = e[o];
  return new qt(s, this._parents);
}
function jh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function tu(t) {
  t || (t = eu);
  function e(g, d) {
    return g && d ? t(g.__data__, d.__data__) : !g - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
    c.sort(e);
  }
  return new qt(r, this._parents).order();
}
function eu(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nu() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function iu() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function ru() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function au() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function su() {
  return !this.node();
}
function ou(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function lu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function cu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fu(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function hu(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function uu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function du(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function pu(t, e) {
  var n = Ts(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? cu : lu : typeof e == "function" ? n.local ? du : uu : n.local ? hu : fu)(n, e));
}
function $s(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _u(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gu(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function mu(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function vu(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _u : typeof e == "function" ? mu : gu)(t, e, n ?? "")) : wu(this.node(), t);
}
function wu(t, e) {
  return t.style.getPropertyValue(e) || $s(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yu(t) {
  return function() {
    delete this[t];
  };
}
function bu(t, e) {
  return function() {
    this[t] = e;
  };
}
function xu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ku(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yu : typeof e == "function" ? xu : bu)(t, e)) : this.node()[t];
}
function Ns(t) {
  return t.trim().split(/^|\s+/);
}
function ji(t) {
  return t.classList || new Ds(t);
}
function Ds(t) {
  this._node = t, this._names = Ns(t.getAttribute("class") || "");
}
Ds.prototype = {
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
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Rs(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Tu(t) {
  return function() {
    Is(this, t);
  };
}
function Eu(t) {
  return function() {
    Rs(this, t);
  };
}
function Su(t, e) {
  return function() {
    (e.apply(this, arguments) ? Is : Rs)(this, t);
  };
}
function Au(t, e) {
  var n = Ns(t + "");
  if (arguments.length < 2) {
    for (var i = ji(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Su : e ? Tu : Eu)(n, e));
}
function $u() {
  this.textContent = "";
}
function Nu(t) {
  return function() {
    this.textContent = t;
  };
}
function Du(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Iu(t) {
  return arguments.length ? this.each(t == null ? $u : (typeof t == "function" ? Du : Nu)(t)) : this.node().textContent;
}
function Ru() {
  this.innerHTML = "";
}
function Mu(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Lu(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ou(t) {
  return arguments.length ? this.each(t == null ? Ru : (typeof t == "function" ? Lu : Mu)(t)) : this.node().innerHTML;
}
function Cu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fu() {
  return this.each(Cu);
}
function zu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Bu() {
  return this.each(zu);
}
function Hu(t) {
  var e = typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Pu() {
  return null;
}
function Vu(t, e) {
  var n = typeof t == "function" ? t : Es(t), i = e == null ? Pu : typeof e == "function" ? e : Ss(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Uu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Zu() {
  return this.each(Uu);
}
function qu() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wu(t) {
  return this.select(t ? Gu : qu);
}
function Xu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ms = {};
if (typeof document < "u") {
  var Yu = document.documentElement;
  "onmouseenter" in Yu || (Ms = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Ku(t, e, n) {
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
function Ju(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Qu(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function ju(t, e, n) {
  var i = Ms.hasOwnProperty(t.type) ? Ku : Ls;
  return function(r, a, s) {
    var o = this.__on, c, f = i(e, a, s);
    if (o) {
      for (var h = 0, g = o.length; h < g; ++h)
        if ((c = o[h]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function td(t, e, n) {
  var i = Ju(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (r = 0, h = o[c]; r < a; ++r)
          if ((s = i[r]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? ju : Qu, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
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
  select: Bh,
  selectAll: Vh,
  filter: Zh,
  data: Yh,
  enter: qh,
  exit: Kh,
  join: Jh,
  merge: Qh,
  order: jh,
  sort: tu,
  call: nu,
  nodes: iu,
  node: ru,
  size: au,
  empty: su,
  each: ou,
  attr: pu,
  style: vu,
  property: ku,
  classed: Au,
  text: Iu,
  html: Ou,
  raise: Fu,
  lower: Bu,
  append: Hu,
  insert: Vu,
  remove: Zu,
  clone: Wu,
  datum: Xu,
  on: td,
  dispatch: id
};
function Or(t) {
  return typeof t == "string" ? new qt([[document.querySelector(t)]], [document.documentElement]) : new qt([[t]], Cs);
}
function rd() {
  var t = f, e = h, n = g, i = document.body, r = $(), a = null, s = null, o = null;
  function c(b) {
    a = E(b), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var b = Array.prototype.slice.call(arguments);
    b[b.length - 1] instanceof SVGElement && (o = b.pop());
    var Z = n.apply(this, b), V = e.apply(this, b), K = t.apply(this, b), nt = B(), ft = p.length, W, j = document.documentElement.scrollTop || i.scrollTop, U = document.documentElement.scrollLeft || i.scrollLeft;
    for (nt.html(Z).style("opacity", 1).style("pointer-events", "all"); ft--; ) nt.classed(p[ft], !1);
    return W = d.get(K).apply(this), nt.classed(K, !0).style("top", W.top + V[0] + j + "px").style("left", W.left + V[1] + U + "px"), c;
  }, c.hide = function() {
    var b = B();
    return b.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(b, Z) {
    if (arguments.length < 2 && typeof b == "string")
      return B().attr(b);
    var V = Array.prototype.slice.call(arguments);
    return Li.prototype.attr.apply(B(), V), c;
  }, c.style = function(b, Z) {
    if (arguments.length < 2 && typeof b == "string")
      return B().style(b);
    var V = Array.prototype.slice.call(arguments);
    return Li.prototype.style.apply(B(), V), c;
  }, c.direction = function(b) {
    return arguments.length ? (t = b == null ? b : O(b), c) : t;
  }, c.offset = function(b) {
    return arguments.length ? (e = b == null ? b : O(b), c) : e;
  }, c.html = function(b) {
    return arguments.length ? (n = b == null ? b : O(b), c) : n;
  }, c.rootElement = function(b) {
    return arguments.length ? (i = b == null ? b : O(b), c) : i;
  }, c.destroy = function() {
    return r && (B().remove(), r = null), c;
  };
  function f() {
    return "n";
  }
  function h() {
    return [0, 0];
  }
  function g() {
    return " ";
  }
  var d = Qi({
    n: v,
    s: C,
    e: I,
    w: A,
    nw: T,
    ne: k,
    sw: x,
    se: S
  }), p = d.keys();
  function v() {
    var b = F(this);
    return {
      top: b.n.y - r.offsetHeight,
      left: b.n.x - r.offsetWidth / 2
    };
  }
  function C() {
    var b = F(this);
    return {
      top: b.s.y,
      left: b.s.x - r.offsetWidth / 2
    };
  }
  function I() {
    var b = F(this);
    return {
      top: b.e.y - r.offsetHeight / 2,
      left: b.e.x
    };
  }
  function A() {
    var b = F(this);
    return {
      top: b.w.y - r.offsetHeight / 2,
      left: b.w.x - r.offsetWidth
    };
  }
  function T() {
    var b = F(this);
    return {
      top: b.nw.y - r.offsetHeight,
      left: b.nw.x - r.offsetWidth
    };
  }
  function k() {
    var b = F(this);
    return {
      top: b.ne.y - r.offsetHeight,
      left: b.ne.x
    };
  }
  function x() {
    var b = F(this);
    return {
      top: b.sw.y,
      left: b.sw.x - r.offsetWidth
    };
  }
  function S() {
    var b = F(this);
    return {
      top: b.se.y,
      left: b.se.x
    };
  }
  function $() {
    var b = Or(document.createElement("div"));
    return b.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), b.node();
  }
  function E(b) {
    var Z = b.node();
    return Z ? Z.tagName.toLowerCase() === "svg" ? Z : Z.ownerSVGElement : null;
  }
  function B() {
    return r == null && (r = $(), i.appendChild(r)), Or(r);
  }
  function F(b) {
    for (var Z = o || b; Z.getScreenCTM == null && Z.parentNode != null; )
      Z = Z.parentNode;
    var V = {}, K = Z.getScreenCTM(), nt = Z.getBBox(), ft = nt.width, W = nt.height, j = nt.x, U = nt.y;
    return s.x = j, s.y = U, V.nw = s.matrixTransform(K), s.x += ft, V.ne = s.matrixTransform(K), s.y += W, V.se = s.matrixTransform(K), s.x -= ft, V.sw = s.matrixTransform(K), s.y -= W / 2, V.w = s.matrixTransform(K), s.x += ft, V.e = s.matrixTransform(K), s.x -= ft / 2, s.y -= W / 2, V.n = s.matrixTransform(K), s.y += W, V.s = s.matrixTransform(K), V;
  }
  function O(b) {
    return typeof b == "function" ? b : function() {
      return b;
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
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end + 1]).range(this.range), r = _s().type(ps).size(20), a = rd();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (g) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${g.position}</td></tr><tr><td>Mutation</td> <td>${g.ref} > ${g.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (g) => `translate(${i(g.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const h = At("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    h.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), h.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
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
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end]).range(this.track.range), r = _s().type(ps).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
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
class hd {
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
    const a = new fd(), s = new hd();
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
var Tn = { exports: {} }, ud = Tn.exports, Fr;
function dd() {
  return Fr || (Fr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(ud, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(T) {
        return n.test(T);
      }
      function s(T) {
        return T.startsWith("//");
      }
      function o(T) {
        return T.startsWith("/");
      }
      function c(T) {
        return T.startsWith("file:");
      }
      function f(T) {
        return /^[.?#]/.test(T);
      }
      function h(T) {
        const k = i.exec(T);
        return d(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function g(T) {
        const k = r.exec(T), x = k[2];
        return d("file:", "", k[1] || "", "", o(x) ? x : "/" + x, k[3] || "", k[4] || "");
      }
      function d(T, k, x, S, $, E, B) {
        return {
          scheme: T,
          user: k,
          host: x,
          port: S,
          path: $,
          query: E,
          hash: B,
          type: 7
        };
      }
      function p(T) {
        if (s(T)) {
          const x = h("http:" + T);
          return x.scheme = "", x.type = 6, x;
        }
        if (o(T)) {
          const x = h("http://foo.com" + T);
          return x.scheme = "", x.host = "", x.type = 5, x;
        }
        if (c(T))
          return g(T);
        if (a(T))
          return h(T);
        const k = h("http://foo.com/" + T);
        return k.scheme = "", k.host = "", k.type = T ? T.startsWith("?") ? 3 : T.startsWith("#") ? 2 : 4 : 1, k;
      }
      function v(T) {
        if (T.endsWith("/.."))
          return T;
        const k = T.lastIndexOf("/");
        return T.slice(0, k + 1);
      }
      function C(T, k) {
        I(k, k.type), T.path === "/" ? T.path = k.path : T.path = v(k.path) + T.path;
      }
      function I(T, k) {
        const x = k <= 4, S = T.path.split("/");
        let $ = 1, E = 0, B = !1;
        for (let O = 1; O < S.length; O++) {
          const b = S[O];
          if (!b) {
            B = !0;
            continue;
          }
          if (B = !1, b !== ".") {
            if (b === "..") {
              E ? (B = !0, E--, $--) : x && (S[$++] = b);
              continue;
            }
            S[$++] = b, E++;
          }
        }
        let F = "";
        for (let O = 1; O < $; O++)
          F += "/" + S[O];
        (!F || B && !F.endsWith("/..")) && (F += "/"), T.path = F;
      }
      function A(T, k) {
        if (!T && !k)
          return "";
        const x = p(T);
        let S = x.type;
        if (k && S !== 7) {
          const E = p(k), B = E.type;
          switch (S) {
            case 1:
              x.hash = E.hash;
            // fall through
            case 2:
              x.query = E.query;
            // fall through
            case 3:
            case 4:
              C(x, E);
            // fall through
            case 5:
              x.user = E.user, x.host = E.host, x.port = E.port;
            // fall through
            case 6:
              x.scheme = E.scheme;
          }
          B > S && (S = B);
        }
        I(x, S);
        const $ = x.query + x.hash;
        switch (S) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return $;
          case 4: {
            const E = x.path.slice(1);
            return E ? f(k || T) && !f(E) ? "./" + E + $ : E + $ : $ || ".";
          }
          case 5:
            return x.path + $;
          default:
            return x.scheme + "//" + x.user + x.host + x.port + x.path + $;
        }
      }
      return A;
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
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), h = [];
    for (let g = this.binarySearch(e, n, a); g < e.length && g >= 0 && r * s(e[g]) < r * i; g += r) {
      if (e[g][0] === this.lazyClass) {
        const p = c(e[g]), v = this.chunkCache.get(p, p).then((C) => [C, p]);
        h.push(v);
      } else
        yield [e[g], o.concat(g)];
      const d = f(e[g]);
      d && (yield* this.iterateSublist(d, n, i, r, a, s, o.concat(g)));
    }
    for (const g of h) {
      const [d, p] = await g;
      d && (yield* this.iterateSublist(d, n, i, r, a, s, [
        ...o,
        p
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
    const c = (s._histograms.stats || []).find((d) => d.basesPerBin >= a);
    let f = s._histograms.meta[0];
    for (let d = 0; d < s._histograms.meta.length; d += 1)
      a >= s._histograms.meta[d].basesPerBin && (f = s._histograms.meta[d]);
    let h = a / f.basesPerBin;
    if (h > 0.9 && Math.abs(h - Math.round(h)) < 1e-4) {
      const d = Math.floor(n / f.basesPerBin);
      h = Math.round(h);
      const p = [];
      for (let v = 0; v < r; v += 1)
        p[v] = 0;
      for await (const [v, C] of f.lazyArray.range(d, d + h * r - 1))
        p[Math.floor((v - d) / h)] += C;
      return { bins: p, stats: c };
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
const Dd = new Array(Ad);
Be(Dd);
const Id = new Array(Td - kd + 1);
Be(Id);
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
const un = 16209, Wd = 16191;
var Xd = function(e, n) {
  let i, r, a, s, o, c, f, h, g, d, p, v, C, I, A, T, k, x, S, $, E, B, F, O;
  const b = e.state;
  i = e.next_in, F = e.input, r = i + (e.avail_in - 5), a = e.next_out, O = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = b.dmax, f = b.wsize, h = b.whave, g = b.wnext, d = b.window, p = b.hold, v = b.bits, C = b.lencode, I = b.distcode, A = (1 << b.lenbits) - 1, T = (1 << b.distbits) - 1;
  t:
    do {
      v < 15 && (p += F[i++] << v, v += 8, p += F[i++] << v, v += 8), k = C[p & A];
      e:
        for (; ; ) {
          if (x = k >>> 24, p >>>= x, v -= x, x = k >>> 16 & 255, x === 0)
            O[a++] = k & 65535;
          else if (x & 16) {
            S = k & 65535, x &= 15, x && (v < x && (p += F[i++] << v, v += 8), S += p & (1 << x) - 1, p >>>= x, v -= x), v < 15 && (p += F[i++] << v, v += 8, p += F[i++] << v, v += 8), k = I[p & T];
            n:
              for (; ; ) {
                if (x = k >>> 24, p >>>= x, v -= x, x = k >>> 16 & 255, x & 16) {
                  if ($ = k & 65535, x &= 15, v < x && (p += F[i++] << v, v += 8, v < x && (p += F[i++] << v, v += 8)), $ += p & (1 << x) - 1, $ > c) {
                    e.msg = "invalid distance too far back", b.mode = un;
                    break t;
                  }
                  if (p >>>= x, v -= x, x = a - s, $ > x) {
                    if (x = $ - x, x > h && b.sane) {
                      e.msg = "invalid distance too far back", b.mode = un;
                      break t;
                    }
                    if (E = 0, B = d, g === 0) {
                      if (E += f - x, x < S) {
                        S -= x;
                        do
                          O[a++] = d[E++];
                        while (--x);
                        E = a - $, B = O;
                      }
                    } else if (g < x) {
                      if (E += f + g - x, x -= g, x < S) {
                        S -= x;
                        do
                          O[a++] = d[E++];
                        while (--x);
                        if (E = 0, g < S) {
                          x = g, S -= x;
                          do
                            O[a++] = d[E++];
                          while (--x);
                          E = a - $, B = O;
                        }
                      }
                    } else if (E += g - x, x < S) {
                      S -= x;
                      do
                        O[a++] = d[E++];
                      while (--x);
                      E = a - $, B = O;
                    }
                    for (; S > 2; )
                      O[a++] = B[E++], O[a++] = B[E++], O[a++] = B[E++], S -= 3;
                    S && (O[a++] = B[E++], S > 1 && (O[a++] = B[E++]));
                  } else {
                    E = a - $;
                    do
                      O[a++] = O[E++], O[a++] = O[E++], O[a++] = O[E++], S -= 3;
                    while (S > 2);
                    S && (O[a++] = O[E++], S > 1 && (O[a++] = O[E++]));
                  }
                } else if ((x & 64) === 0) {
                  k = I[(k & 65535) + (p & (1 << x) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", b.mode = un;
                  break t;
                }
                break;
              }
          } else if ((x & 64) === 0) {
            k = C[(k & 65535) + (p & (1 << x) - 1)];
            continue e;
          } else if (x & 32) {
            b.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", b.mode = un;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  S = v >> 3, i -= S, v -= S << 3, p &= (1 << v) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), b.hold = p, b.bits = v;
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
  let f = 0, h = 0, g = 0, d = 0, p = 0, v = 0, C = 0, I = 0, A = 0, T = 0, k, x, S, $, E, B = null, F;
  const O = new Uint16Array($e + 1), b = new Uint16Array($e + 1);
  let Z = null, V, K, nt;
  for (f = 0; f <= $e; f++)
    O[f] = 0;
  for (h = 0; h < i; h++)
    O[e[n + h]]++;
  for (p = c, d = $e; d >= 1 && O[d] === 0; d--)
    ;
  if (p > d && (p = d), d === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (g = 1; g < d && O[g] === 0; g++)
    ;
  for (p < g && (p = g), I = 1, f = 1; f <= $e; f++)
    if (I <<= 1, I -= O[f], I < 0)
      return -1;
  if (I > 0 && (t === Hr || d !== 1))
    return -1;
  for (b[1] = 0, f = 1; f < $e; f++)
    b[f + 1] = b[f] + O[f];
  for (h = 0; h < i; h++)
    e[n + h] !== 0 && (s[b[e[n + h]]++] = h);
  if (t === Hr ? (B = Z = s, F = 20) : t === Jn ? (B = Yd, Z = Kd, F = 257) : (B = Jd, Z = Qd, F = 0), T = 0, h = 0, f = g, E = a, v = p, C = 0, S = -1, A = 1 << p, $ = A - 1, t === Jn && A > zr || t === Pr && A > Br)
    return 1;
  for (; ; ) {
    V = f - C, s[h] + 1 < F ? (K = 0, nt = s[h]) : s[h] >= F ? (K = Z[s[h] - F], nt = B[s[h] - F]) : (K = 96, nt = 0), k = 1 << f - C, x = 1 << v, g = x;
    do
      x -= k, r[E + (T >> C) + x] = V << 24 | K << 16 | nt | 0;
    while (x !== 0);
    for (k = 1 << f - 1; T & k; )
      k >>= 1;
    if (k !== 0 ? (T &= k - 1, T += k) : T = 0, h++, --O[f] === 0) {
      if (f === d)
        break;
      f = e[n + s[h]];
    }
    if (f > p && (T & $) !== S) {
      for (C === 0 && (C = p), E += g, v = f - C, I = 1 << v; v + C < d && (I -= O[v + C], !(I <= 0)); )
        v++, I <<= 1;
      if (A += 1 << v, t === Jn && A > zr || t === Pr && A > Br)
        return 1;
      S = T & $, r[S] = p << 24 | v << 16 | E - a | 0;
    }
  }
  return T !== 0 && (r[E + T] = f - C << 24 | 64 << 16 | 0), o.bits = p, 0;
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
} = Bs, Zn = 16180, Zr = 16181, qr = 16182, Gr = 16183, Wr = 16184, Xr = 16185, Yr = 16186, Kr = 16187, Jr = 16188, Qr = 16189, Fn = 16190, le = 16191, Qn = 16192, jr = 16193, jn = 16194, ta = 16195, ea = 16196, na = 16197, ia = 16198, pn = 16199, _n = 16200, ra = 16201, aa = 16202, sa = 16203, oa = 16204, la = 16205, ti = 16206, ca = 16207, fa = 16208, It = 16209, Gs = 16210, Ws = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, ha = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
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
let ua = !0, ei, ni;
const h0 = (t) => {
  if (ua) {
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
    Xe(Us, t.lens, 0, 32, ni, 0, t.work, { bits: 5 }), ua = !1;
  }
  t.lencode = ei, t.lenbits = 9, t.distcode = ni, t.distbits = 5;
}, Qs = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, u0 = (t, e) => {
  let n, i, r, a, s, o, c, f, h, g, d, p, v, C, I = 0, A, T, k, x, S, $, E, B;
  const F = new Uint8Array(4);
  let O, b;
  const Z = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Yt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, h = n.bits, g = o, d = c, B = Ee;
  t:
    for (; ; )
      switch (n.mode) {
        case Zn:
          if (n.wrap === 0) {
            n.mode = Qn;
            break;
          }
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0), f = 0, h = 0, n.mode = Zr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = It;
            break;
          }
          if ((f & 15) !== Ur) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (f >>>= 4, h -= 4, E = (f & 15) + 8, n.wbits === 0 && (n.wbits = E), E > 15 || E > n.wbits) {
            t.msg = "invalid window size", n.mode = It;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Qr : le, f = 0, h = 0;
          break;
        case Zr:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ur) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = It;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, h = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, F[2] = f >>> 16 & 255, F[3] = f >>> 24 & 255, n.check = ne(n.check, F, 4, 0)), f = 0, h = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, h = 0, n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, h = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 1024 && (p = n.length, p > o && (p = o), p && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + p
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, p, a)), o -= p, a += p, n.length -= p), n.length))
            break t;
          n.length = 0, n.mode = Yr;
        /* falls through */
        case Yr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            p = 0;
            do
              E = i[a + p++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && p < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, p, a)), o -= p, a += p, E)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Kr;
        /* falls through */
        case Kr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            p = 0;
            do
              E = i[a + p++], n.head && E && n.length < 65536 && (n.head.comment += String.fromCharCode(E));
            while (E && p < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, p, a)), o -= p, a += p, E)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 512) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = It;
              break;
            }
            f = 0, h = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qr:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          t.adler = n.check = ha(f), f = 0, h = 0, n.mode = Fn;
        /* falls through */
        case Fn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, i0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Qn:
          if (n.last) {
            f >>>= h & 7, h -= h & 7, n.mode = ti;
            break;
          }
          for (; h < 3; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          switch (n.last = f & 1, f >>>= 1, h -= 1, f & 3) {
            case 0:
              n.mode = jr;
              break;
            case 1:
              if (h0(n), n.mode = pn, e === dn) {
                f >>>= 2, h -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ea;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = It;
          }
          f >>>= 2, h -= 2;
          break;
        case jr:
          for (f >>>= h & 7, h -= h & 7; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = It;
            break;
          }
          if (n.length = f & 65535, f = 0, h = 0, n.mode = jn, e === dn)
            break t;
        /* falls through */
        case jn:
          n.mode = ta;
        /* falls through */
        case ta:
          if (p = n.length, p) {
            if (p > o && (p = o), p > c && (p = c), p === 0)
              break t;
            r.set(i.subarray(a, a + p), s), o -= p, a += p, c -= p, s += p, n.length -= p;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; h < 14; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, h -= 5, n.ndist = (f & 31) + 1, f >>>= 5, h -= 5, n.ncode = (f & 15) + 4, f >>>= 4, h -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = It;
            break;
          }
          n.have = 0, n.mode = na;
        /* falls through */
        case na:
          for (; n.have < n.ncode; ) {
            for (; h < 3; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.lens[Z[n.have++]] = f & 7, f >>>= 3, h -= 3;
          }
          for (; n.have < 19; )
            n.lens[Z[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, O = { bits: n.lenbits }, B = Xe(t0, n.lens, 0, 19, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
            t.msg = "invalid code lengths set", n.mode = It;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; I = n.lencode[f & (1 << n.lenbits) - 1], A = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(A <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (k < 16)
              f >>>= A, h -= A, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (b = A + 2; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                if (f >>>= A, h -= A, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = It;
                  break;
                }
                E = n.lens[n.have - 1], p = 3 + (f & 3), f >>>= 2, h -= 2;
              } else if (k === 17) {
                for (b = A + 3; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                f >>>= A, h -= A, E = 0, p = 3 + (f & 7), f >>>= 3, h -= 3;
              } else {
                for (b = A + 7; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                f >>>= A, h -= A, E = 0, p = 11 + (f & 127), f >>>= 7, h -= 7;
              }
              if (n.have + p > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = It;
                break;
              }
              for (; p--; )
                n.lens[n.have++] = E;
            }
          }
          if (n.mode === It)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = It;
            break;
          }
          if (n.lenbits = 9, O = { bits: n.lenbits }, B = Xe(Vs, n.lens, 0, n.nlen, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
            t.msg = "invalid literal/lengths set", n.mode = It;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, O = { bits: n.distbits }, B = Xe(Us, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, O), n.distbits = O.bits, B) {
            t.msg = "invalid distances set", n.mode = It;
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
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, Xd(t, d), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, h = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; I = n.lencode[f & (1 << n.lenbits) - 1], A = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(A <= h); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (T && (T & 240) === 0) {
            for (x = A, S = T, $ = k; I = n.lencode[$ + ((f & (1 << x + S) - 1) >> x)], A = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(x + A <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= A, h -= A, n.back += A, n.length = k, T === 0) {
            n.mode = la;
            break;
          }
          if (T & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (T & 64) {
            t.msg = "invalid literal/length code", n.mode = It;
            break;
          }
          n.extra = T & 15, n.mode = ra;
        /* falls through */
        case ra:
          if (n.extra) {
            for (b = n.extra; h < b; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, h -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; I = n.distcode[f & (1 << n.distbits) - 1], A = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(A <= h); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if ((T & 240) === 0) {
            for (x = A, S = T, $ = k; I = n.distcode[$ + ((f & (1 << x + S) - 1) >> x)], A = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(x + A <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= A, h -= A, n.back += A, T & 64) {
            t.msg = "invalid distance code", n.mode = It;
            break;
          }
          n.offset = k, n.extra = T & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (b = n.extra; h < b; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, h -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = It;
            break;
          }
          n.mode = oa;
        /* falls through */
        case oa:
          if (c === 0)
            break t;
          if (p = d - c, n.offset > p) {
            if (p = n.offset - p, p > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = It;
              break;
            }
            p > n.wnext ? (p -= n.wnext, v = n.wsize - p) : v = n.wnext - p, p > n.length && (p = n.length), C = n.window;
          } else
            C = r, v = s - n.offset, p = n.length;
          p > c && (p = c), c -= p, n.length -= p;
          do
            r[s++] = C[v++];
          while (--p);
          n.length === 0 && (n.mode = _n);
          break;
        case la:
          if (c === 0)
            break t;
          r[s++] = n.length, c--, n.mode = _n;
          break;
        case ti:
          if (n.wrap) {
            for (; h < 32; ) {
              if (o === 0)
                break t;
              o--, f |= i[a++] << h, h += 8;
            }
            if (d -= c, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ne(n.check, r, d, s - d) : Oi(n.check, r, d, s - d)), d = c, n.wrap & 4 && (n.flags ? f : ha(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = It;
              break;
            }
            f = 0, h = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (n.wrap && n.flags) {
            for (; h < 32; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = It;
              break;
            }
            f = 0, h = 0;
          }
          n.mode = fa;
        /* falls through */
        case fa:
          B = n0;
          break t;
        case It:
          B = Zs;
          break t;
        case Gs:
          return qs;
        case Ws:
        /* falls through */
        default:
          return Yt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, (n.wsize || d !== t.avail_out && n.mode < It && (n.mode < ti || e !== Vr)) && Qs(t, t.output, t.next_out, d - t.avail_out), g -= t.avail_in, d -= t.avail_out, t.total_in += g, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ne(n.check, r, d, t.next_out - d) : Oi(n.check, r, d, t.next_out - d)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (g === 0 && d === 0 || e === Vr) && B === Ee && (B = r0), B;
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
var g0 = Ys, m0 = Ks, v0 = Xs, w0 = f0, y0 = Js, b0 = u0, x0 = d0, k0 = p0, T0 = _0, E0 = "pako inflate (from Nodeca project)", ce = {
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
  Z_STREAM_ERROR: D0,
  Z_DATA_ERROR: da,
  Z_MEM_ERROR: I0
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
      case D0:
      case da:
      case ri:
      case I0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === ii))
      if (this.options.to === "string") {
        let c = Fi.utf8border(n.output, n.next_out), f = n.next_out - c, h = Fi.buf2string(n.output, c);
        n.next_out = f, n.avail_out = i - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(h);
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
      const c = await o.arrayBuffer(), f = o.headers.get("content-range"), h = /\/(\d+)$/.exec(f || "");
      return h != null && h[1] && (this._stat = {
        size: parseInt(h[1], 10)
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
        for (var h = 0; h < c; h++)
          a[f + h] = s[o + h];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, c, f, h, g;
        for (c = 0, s = 0, o = a.length; s < o; s++)
          c += a[s].length;
        for (g = new Uint8Array(c), f = 0, s = 0, o = a.length; s < o; s++)
          h = a[s], g.set(h, f), f += h.length;
        return g;
      }
    }, r = {
      arraySet: function(a, s, o, c, f) {
        for (var h = 0; h < c; h++)
          a[f + h] = s[o + h];
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
  var s = 0, o = 1, c = 2, f = 3, h = 258, g = 29, d = 256, p = d + 1 + g, v = 30, C = 19, I = 2 * p + 1, A = 15, T = 16, k = 7, x = 256, S = 16, $ = 17, E = 18, B = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), F = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), O = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), b = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Z = 512, V = new Array((p + 2) * 2);
  a(V);
  var K = new Array(v * 2);
  a(K);
  var nt = new Array(Z);
  a(nt);
  var ft = new Array(h - f + 1);
  a(ft);
  var W = new Array(g);
  a(W);
  var j = new Array(v);
  a(j);
  function U(m, z, L, G, w) {
    this.static_tree = m, this.extra_bits = z, this.extra_base = L, this.elems = G, this.max_length = w, this.has_stree = m && m.length;
  }
  var rt, Rt, J;
  function gt(m, z) {
    this.dyn_tree = m, this.max_code = 0, this.stat_desc = z;
  }
  function St(m) {
    return m < 256 ? nt[m] : nt[256 + (m >>> 7)];
  }
  function pt(m, z) {
    m.pending_buf[m.pending++] = z & 255, m.pending_buf[m.pending++] = z >>> 8 & 255;
  }
  function Q(m, z, L) {
    m.bi_valid > T - L ? (m.bi_buf |= z << m.bi_valid & 65535, pt(m, m.bi_buf), m.bi_buf = z >> T - m.bi_valid, m.bi_valid += L - T) : (m.bi_buf |= z << m.bi_valid & 65535, m.bi_valid += L);
  }
  function lt(m, z, L) {
    Q(
      m,
      L[z * 2],
      L[z * 2 + 1]
      /*.Len*/
    );
  }
  function ht(m, z) {
    var L = 0;
    do
      L |= m & 1, m >>>= 1, L <<= 1;
    while (--z > 0);
    return L >>> 1;
  }
  function Et(m) {
    m.bi_valid === 16 ? (pt(m, m.bi_buf), m.bi_buf = 0, m.bi_valid = 0) : m.bi_valid >= 8 && (m.pending_buf[m.pending++] = m.bi_buf & 255, m.bi_buf >>= 8, m.bi_valid -= 8);
  }
  function Nt(m, z) {
    var L = z.dyn_tree, G = z.max_code, w = z.stat_desc.static_tree, R = z.stat_desc.has_stree, u = z.stat_desc.extra_bits, P = z.stat_desc.extra_base, it = z.stat_desc.max_length, l, N, M, _, y, D, et = 0;
    for (_ = 0; _ <= A; _++)
      m.bl_count[_] = 0;
    for (L[m.heap[m.heap_max] * 2 + 1] = 0, l = m.heap_max + 1; l < I; l++)
      N = m.heap[l], _ = L[L[N * 2 + 1] * 2 + 1] + 1, _ > it && (_ = it, et++), L[N * 2 + 1] = _, !(N > G) && (m.bl_count[_]++, y = 0, N >= P && (y = u[N - P]), D = L[N * 2], m.opt_len += D * (_ + y), R && (m.static_len += D * (w[N * 2 + 1] + y)));
    if (et !== 0) {
      do {
        for (_ = it - 1; m.bl_count[_] === 0; )
          _--;
        m.bl_count[_]--, m.bl_count[_ + 1] += 2, m.bl_count[it]--, et -= 2;
      } while (et > 0);
      for (_ = it; _ !== 0; _--)
        for (N = m.bl_count[_]; N !== 0; )
          M = m.heap[--l], !(M > G) && (L[M * 2 + 1] !== _ && (m.opt_len += (_ - L[M * 2 + 1]) * L[M * 2], L[M * 2 + 1] = _), N--);
    }
  }
  function $t(m, z, L) {
    var G = new Array(A + 1), w = 0, R, u;
    for (R = 1; R <= A; R++)
      G[R] = w = w + L[R - 1] << 1;
    for (u = 0; u <= z; u++) {
      var P = m[u * 2 + 1];
      P !== 0 && (m[u * 2] = ht(G[P]++, P));
    }
  }
  function ot() {
    var m, z, L, G, w, R = new Array(A + 1);
    for (L = 0, G = 0; G < g - 1; G++)
      for (W[G] = L, m = 0; m < 1 << B[G]; m++)
        ft[L++] = G;
    for (ft[L - 1] = G, w = 0, G = 0; G < 16; G++)
      for (j[G] = w, m = 0; m < 1 << F[G]; m++)
        nt[w++] = G;
    for (w >>= 7; G < v; G++)
      for (j[G] = w << 7, m = 0; m < 1 << F[G] - 7; m++)
        nt[256 + w++] = G;
    for (z = 0; z <= A; z++)
      R[z] = 0;
    for (m = 0; m <= 143; )
      V[m * 2 + 1] = 8, m++, R[8]++;
    for (; m <= 255; )
      V[m * 2 + 1] = 9, m++, R[9]++;
    for (; m <= 279; )
      V[m * 2 + 1] = 7, m++, R[7]++;
    for (; m <= 287; )
      V[m * 2 + 1] = 8, m++, R[8]++;
    for ($t(V, p + 1, R), m = 0; m < v; m++)
      K[m * 2 + 1] = 5, K[m * 2] = ht(m, 5);
    rt = new U(V, B, d + 1, p, A), Rt = new U(K, F, 0, v, A), J = new U(new Array(0), O, 0, C, k);
  }
  function at(m) {
    var z;
    for (z = 0; z < p; z++)
      m.dyn_ltree[z * 2] = 0;
    for (z = 0; z < v; z++)
      m.dyn_dtree[z * 2] = 0;
    for (z = 0; z < C; z++)
      m.bl_tree[z * 2] = 0;
    m.dyn_ltree[x * 2] = 1, m.opt_len = m.static_len = 0, m.last_lit = m.matches = 0;
  }
  function kt(m) {
    m.bi_valid > 8 ? pt(m, m.bi_buf) : m.bi_valid > 0 && (m.pending_buf[m.pending++] = m.bi_buf), m.bi_buf = 0, m.bi_valid = 0;
  }
  function Dt(m, z, L, G) {
    kt(m), pt(m, L), pt(m, ~L), t.arraySet(m.pending_buf, m.window, z, L, m.pending), m.pending += L;
  }
  function st(m, z, L, G) {
    var w = z * 2, R = L * 2;
    return m[w] < m[R] || m[w] === m[R] && G[z] <= G[L];
  }
  function _t(m, z, L) {
    for (var G = m.heap[L], w = L << 1; w <= m.heap_len && (w < m.heap_len && st(z, m.heap[w + 1], m.heap[w], m.depth) && w++, !st(z, G, m.heap[w], m.depth)); )
      m.heap[L] = m.heap[w], L = w, w <<= 1;
    m.heap[L] = G;
  }
  function q(m, z, L) {
    var G, w, R = 0, u, P;
    if (m.last_lit !== 0)
      do
        G = m.pending_buf[m.d_buf + R * 2] << 8 | m.pending_buf[m.d_buf + R * 2 + 1], w = m.pending_buf[m.l_buf + R], R++, G === 0 ? lt(m, w, z) : (u = ft[w], lt(m, u + d + 1, z), P = B[u], P !== 0 && (w -= W[u], Q(m, w, P)), G--, u = St(G), lt(m, u, L), P = F[u], P !== 0 && (G -= j[u], Q(m, G, P)));
      while (R < m.last_lit);
    lt(m, x, z);
  }
  function xt(m, z) {
    var L = z.dyn_tree, G = z.stat_desc.static_tree, w = z.stat_desc.has_stree, R = z.stat_desc.elems, u, P, it = -1, l;
    for (m.heap_len = 0, m.heap_max = I, u = 0; u < R; u++)
      L[u * 2] !== 0 ? (m.heap[++m.heap_len] = it = u, m.depth[u] = 0) : L[u * 2 + 1] = 0;
    for (; m.heap_len < 2; )
      l = m.heap[++m.heap_len] = it < 2 ? ++it : 0, L[l * 2] = 1, m.depth[l] = 0, m.opt_len--, w && (m.static_len -= G[l * 2 + 1]);
    for (z.max_code = it, u = m.heap_len >> 1; u >= 1; u--)
      _t(m, L, u);
    l = R;
    do
      u = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[
        1
        /*SMALLEST*/
      ] = m.heap[m.heap_len--], _t(
        m,
        L,
        1
        /*SMALLEST*/
      ), P = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[--m.heap_max] = u, m.heap[--m.heap_max] = P, L[l * 2] = L[u * 2] + L[P * 2], m.depth[l] = (m.depth[u] >= m.depth[P] ? m.depth[u] : m.depth[P]) + 1, L[u * 2 + 1] = L[P * 2 + 1] = l, m.heap[
        1
        /*SMALLEST*/
      ] = l++, _t(
        m,
        L,
        1
        /*SMALLEST*/
      );
    while (m.heap_len >= 2);
    m.heap[--m.heap_max] = m.heap[
      1
      /*SMALLEST*/
    ], Nt(m, z), $t(L, it, m.bl_count);
  }
  function Tt(m, z, L) {
    var G, w = -1, R, u = z[0 * 2 + 1], P = 0, it = 7, l = 4;
    for (u === 0 && (it = 138, l = 3), z[(L + 1) * 2 + 1] = 65535, G = 0; G <= L; G++)
      R = u, u = z[(G + 1) * 2 + 1], !(++P < it && R === u) && (P < l ? m.bl_tree[R * 2] += P : R !== 0 ? (R !== w && m.bl_tree[R * 2]++, m.bl_tree[S * 2]++) : P <= 10 ? m.bl_tree[$ * 2]++ : m.bl_tree[E * 2]++, P = 0, w = R, u === 0 ? (it = 138, l = 3) : R === u ? (it = 6, l = 3) : (it = 7, l = 4));
  }
  function Ft(m, z, L) {
    var G, w = -1, R, u = z[0 * 2 + 1], P = 0, it = 7, l = 4;
    for (u === 0 && (it = 138, l = 3), G = 0; G <= L; G++)
      if (R = u, u = z[(G + 1) * 2 + 1], !(++P < it && R === u)) {
        if (P < l)
          do
            lt(m, R, m.bl_tree);
          while (--P !== 0);
        else R !== 0 ? (R !== w && (lt(m, R, m.bl_tree), P--), lt(m, S, m.bl_tree), Q(m, P - 3, 2)) : P <= 10 ? (lt(m, $, m.bl_tree), Q(m, P - 3, 3)) : (lt(m, E, m.bl_tree), Q(m, P - 11, 7));
        P = 0, w = R, u === 0 ? (it = 138, l = 3) : R === u ? (it = 6, l = 3) : (it = 7, l = 4);
      }
  }
  function tt(m) {
    var z;
    for (Tt(m, m.dyn_ltree, m.l_desc.max_code), Tt(m, m.dyn_dtree, m.d_desc.max_code), xt(m, m.bl_desc), z = C - 1; z >= 3 && m.bl_tree[b[z] * 2 + 1] === 0; z--)
      ;
    return m.opt_len += 3 * (z + 1) + 5 + 5 + 4, z;
  }
  function dt(m, z, L, G) {
    var w;
    for (Q(m, z - 257, 5), Q(m, L - 1, 5), Q(m, G - 4, 4), w = 0; w < G; w++)
      Q(m, m.bl_tree[b[w] * 2 + 1], 3);
    Ft(m, m.dyn_ltree, z - 1), Ft(m, m.dyn_dtree, L - 1);
  }
  function ct(m) {
    var z = 4093624447, L;
    for (L = 0; L <= 31; L++, z >>>= 1)
      if (z & 1 && m.dyn_ltree[L * 2] !== 0)
        return n;
    if (m.dyn_ltree[9 * 2] !== 0 || m.dyn_ltree[10 * 2] !== 0 || m.dyn_ltree[13 * 2] !== 0)
      return i;
    for (L = 32; L < d; L++)
      if (m.dyn_ltree[L * 2] !== 0)
        return i;
    return n;
  }
  var ut = !1;
  function zt(m) {
    ut || (ot(), ut = !0), m.l_desc = new gt(m.dyn_ltree, rt), m.d_desc = new gt(m.dyn_dtree, Rt), m.bl_desc = new gt(m.bl_tree, J), m.bi_buf = 0, m.bi_valid = 0, at(m);
  }
  function H(m, z, L, G) {
    Q(m, (s << 1) + (G ? 1 : 0), 3), Dt(m, z, L);
  }
  function yt(m) {
    Q(m, o << 1, 3), lt(m, x, V), Et(m);
  }
  function vt(m, z, L, G) {
    var w, R, u = 0;
    m.level > 0 ? (m.strm.data_type === r && (m.strm.data_type = ct(m)), xt(m, m.l_desc), xt(m, m.d_desc), u = tt(m), w = m.opt_len + 3 + 7 >>> 3, R = m.static_len + 3 + 7 >>> 3, R <= w && (w = R)) : w = R = L + 5, L + 4 <= w && z !== -1 ? H(m, z, L, G) : m.strategy === e || R === w ? (Q(m, (o << 1) + (G ? 1 : 0), 3), q(m, V, K)) : (Q(m, (c << 1) + (G ? 1 : 0), 3), dt(m, m.l_desc.max_code + 1, m.d_desc.max_code + 1, u + 1), q(m, m.dyn_ltree, m.dyn_dtree)), at(m), G && kt(m);
  }
  function mt(m, z, L) {
    return m.pending_buf[m.d_buf + m.last_lit * 2] = z >>> 8 & 255, m.pending_buf[m.d_buf + m.last_lit * 2 + 1] = z & 255, m.pending_buf[m.l_buf + m.last_lit] = L & 255, m.last_lit++, z === 0 ? m.dyn_ltree[L * 2]++ : (m.matches++, z--, m.dyn_ltree[(ft[L] + d + 1) * 2]++, m.dyn_dtree[St(z) * 2]++), m.last_lit === m.lit_bufsize - 1;
  }
  return _e._tr_init = zt, _e._tr_stored_block = H, _e._tr_flush_block = vt, _e._tr_tally = mt, _e._tr_align = yt, _e;
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
  var t = de(), e = P0(), n = to(), i = eo(), r = ir(), a = 0, s = 1, o = 3, c = 4, f = 5, h = 0, g = 1, d = -2, p = -3, v = -5, C = -1, I = 1, A = 2, T = 3, k = 4, x = 0, S = 2, $ = 8, E = 9, B = 15, F = 8, O = 29, b = 256, Z = b + 1 + O, V = 30, K = 19, nt = 2 * Z + 1, ft = 15, W = 3, j = 258, U = j + W + 1, rt = 32, Rt = 42, J = 69, gt = 73, St = 91, pt = 103, Q = 113, lt = 666, ht = 1, Et = 2, Nt = 3, $t = 4, ot = 3;
  function at(l, N) {
    return l.msg = r[N], N;
  }
  function kt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function Dt(l) {
    for (var N = l.length; --N >= 0; )
      l[N] = 0;
  }
  function st(l) {
    var N = l.state, M = N.pending;
    M > l.avail_out && (M = l.avail_out), M !== 0 && (t.arraySet(l.output, N.pending_buf, N.pending_out, M, l.next_out), l.next_out += M, N.pending_out += M, l.total_out += M, l.avail_out -= M, N.pending -= M, N.pending === 0 && (N.pending_out = 0));
  }
  function _t(l, N) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, N), l.block_start = l.strstart, st(l.strm);
  }
  function q(l, N) {
    l.pending_buf[l.pending++] = N;
  }
  function xt(l, N) {
    l.pending_buf[l.pending++] = N >>> 8 & 255, l.pending_buf[l.pending++] = N & 255;
  }
  function Tt(l, N, M, _) {
    var y = l.avail_in;
    return y > _ && (y = _), y === 0 ? 0 : (l.avail_in -= y, t.arraySet(N, l.input, l.next_in, y, M), l.state.wrap === 1 ? l.adler = n(l.adler, N, y, M) : l.state.wrap === 2 && (l.adler = i(l.adler, N, y, M)), l.next_in += y, l.total_in += y, y);
  }
  function Ft(l, N) {
    var M = l.max_chain_length, _ = l.strstart, y, D, et = l.prev_length, X = l.nice_match, Y = l.strstart > l.w_size - U ? l.strstart - (l.w_size - U) : 0, wt = l.window, ae = l.w_mask, Mt = l.prev, bt = l.strstart + j, Bt = wt[_ + et - 1], Pt = wt[_ + et];
    l.prev_length >= l.good_match && (M >>= 2), X > l.lookahead && (X = l.lookahead);
    do
      if (y = N, !(wt[y + et] !== Pt || wt[y + et - 1] !== Bt || wt[y] !== wt[_] || wt[++y] !== wt[_ + 1])) {
        _ += 2, y++;
        do
          ;
        while (wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && _ < bt);
        if (D = j - (bt - _), _ = bt - j, D > et) {
          if (l.match_start = N, et = D, D >= X)
            break;
          Bt = wt[_ + et - 1], Pt = wt[_ + et];
        }
      }
    while ((N = Mt[N & ae]) > Y && --M !== 0);
    return et <= l.lookahead ? et : l.lookahead;
  }
  function tt(l) {
    var N = l.w_size, M, _, y, D, et;
    do {
      if (D = l.window_size - l.lookahead - l.strstart, l.strstart >= N + (N - U)) {
        t.arraySet(l.window, l.window, N, N, 0), l.match_start -= N, l.strstart -= N, l.block_start -= N, _ = l.hash_size, M = _;
        do
          y = l.head[--M], l.head[M] = y >= N ? y - N : 0;
        while (--_);
        _ = N, M = _;
        do
          y = l.prev[--M], l.prev[M] = y >= N ? y - N : 0;
        while (--_);
        D += N;
      }
      if (l.strm.avail_in === 0)
        break;
      if (_ = Tt(l.strm, l.window, l.strstart + l.lookahead, D), l.lookahead += _, l.lookahead + l.insert >= W)
        for (et = l.strstart - l.insert, l.ins_h = l.window[et], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + W - 1]) & l.hash_mask, l.prev[et & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = et, et++, l.insert--, !(l.lookahead + l.insert < W)); )
          ;
    } while (l.lookahead < U && l.strm.avail_in !== 0);
  }
  function dt(l, N) {
    var M = 65535;
    for (M > l.pending_buf_size - 5 && (M = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (tt(l), l.lookahead === 0 && N === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var _ = l.block_start + M;
      if ((l.strstart === 0 || l.strstart >= _) && (l.lookahead = l.strstart - _, l.strstart = _, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - U && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = 0, N === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ht);
  }
  function ct(l, N) {
    for (var M, _; ; ) {
      if (l.lookahead < U) {
        if (tt(l), l.lookahead < U && N === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), M !== 0 && l.strstart - M <= l.w_size - U && (l.match_length = Ft(l, M)), l.match_length >= W)
        if (_ = e._tr_tally(l, l.strstart - l.match_start, l.match_length - W), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= W) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        _ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (_ && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = l.strstart < W - 1 ? l.strstart : W - 1, N === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function ut(l, N) {
    for (var M, _, y; ; ) {
      if (l.lookahead < U) {
        if (tt(l), l.lookahead < U && N === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = W - 1, M !== 0 && l.prev_length < l.max_lazy_match && l.strstart - M <= l.w_size - U && (l.match_length = Ft(l, M), l.match_length <= 5 && (l.strategy === I || l.match_length === W && l.strstart - l.match_start > 4096) && (l.match_length = W - 1)), l.prev_length >= W && l.match_length <= l.prev_length) {
        y = l.strstart + l.lookahead - W, _ = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - W), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = W - 1, l.strstart++, _ && (_t(l, !1), l.strm.avail_out === 0))
          return ht;
      } else if (l.match_available) {
        if (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), _ && _t(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ht;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < W - 1 ? l.strstart : W - 1, N === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function zt(l, N) {
    for (var M, _, y, D, et = l.window; ; ) {
      if (l.lookahead <= j) {
        if (tt(l), l.lookahead <= j && N === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= W && l.strstart > 0 && (y = l.strstart - 1, _ = et[y], _ === et[++y] && _ === et[++y] && _ === et[++y])) {
        D = l.strstart + j;
        do
          ;
        while (_ === et[++y] && _ === et[++y] && _ === et[++y] && _ === et[++y] && _ === et[++y] && _ === et[++y] && _ === et[++y] && _ === et[++y] && y < D);
        l.match_length = j - (D - y), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= W ? (M = e._tr_tally(l, 1, l.match_length - W), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), M && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = 0, N === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function H(l, N) {
    for (var M; ; ) {
      if (l.lookahead === 0 && (tt(l), l.lookahead === 0)) {
        if (N === a)
          return ht;
        break;
      }
      if (l.match_length = 0, M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, M && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = 0, N === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function yt(l, N, M, _, y) {
    this.good_length = l, this.max_lazy = N, this.nice_length = M, this.max_chain = _, this.func = y;
  }
  var vt;
  vt = [
    /*      good lazy nice chain */
    new yt(0, 0, 0, 0, dt),
    /* 0 store only */
    new yt(4, 4, 8, 4, ct),
    /* 1 max speed, no lazy matches */
    new yt(4, 5, 16, 8, ct),
    /* 2 */
    new yt(4, 6, 32, 32, ct),
    /* 3 */
    new yt(4, 4, 16, 16, ut),
    /* 4 lazy matches */
    new yt(8, 16, 32, 32, ut),
    /* 5 */
    new yt(8, 16, 128, 128, ut),
    /* 6 */
    new yt(8, 32, 128, 256, ut),
    /* 7 */
    new yt(32, 128, 258, 1024, ut),
    /* 8 */
    new yt(32, 258, 258, 4096, ut)
    /* 9 max compression */
  ];
  function mt(l) {
    l.window_size = 2 * l.w_size, Dt(l.head), l.max_lazy_match = vt[l.level].max_lazy, l.good_match = vt[l.level].good_length, l.nice_match = vt[l.level].nice_length, l.max_chain_length = vt[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = W - 1, l.match_available = 0, l.ins_h = 0;
  }
  function m() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(nt * 2), this.dyn_dtree = new t.Buf16((2 * V + 1) * 2), this.bl_tree = new t.Buf16((2 * K + 1) * 2), Dt(this.dyn_ltree), Dt(this.dyn_dtree), Dt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ft + 1), this.heap = new t.Buf16(2 * Z + 1), Dt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * Z + 1), Dt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function z(l) {
    var N;
    return !l || !l.state ? at(l, d) : (l.total_in = l.total_out = 0, l.data_type = S, N = l.state, N.pending = 0, N.pending_out = 0, N.wrap < 0 && (N.wrap = -N.wrap), N.status = N.wrap ? Rt : Q, l.adler = N.wrap === 2 ? 0 : 1, N.last_flush = a, e._tr_init(N), h);
  }
  function L(l) {
    var N = z(l);
    return N === h && mt(l.state), N;
  }
  function G(l, N) {
    return !l || !l.state || l.state.wrap !== 2 ? d : (l.state.gzhead = N, h);
  }
  function w(l, N, M, _, y, D) {
    if (!l)
      return d;
    var et = 1;
    if (N === C && (N = 6), _ < 0 ? (et = 0, _ = -_) : _ > 15 && (et = 2, _ -= 16), y < 1 || y > E || M !== $ || _ < 8 || _ > 15 || N < 0 || N > 9 || D < 0 || D > k)
      return at(l, d);
    _ === 8 && (_ = 9);
    var X = new m();
    return l.state = X, X.strm = l, X.wrap = et, X.gzhead = null, X.w_bits = _, X.w_size = 1 << X.w_bits, X.w_mask = X.w_size - 1, X.hash_bits = y + 7, X.hash_size = 1 << X.hash_bits, X.hash_mask = X.hash_size - 1, X.hash_shift = ~~((X.hash_bits + W - 1) / W), X.window = new t.Buf8(X.w_size * 2), X.head = new t.Buf16(X.hash_size), X.prev = new t.Buf16(X.w_size), X.lit_bufsize = 1 << y + 6, X.pending_buf_size = X.lit_bufsize * 4, X.pending_buf = new t.Buf8(X.pending_buf_size), X.d_buf = 1 * X.lit_bufsize, X.l_buf = 3 * X.lit_bufsize, X.level = N, X.strategy = D, X.method = M, L(l);
  }
  function R(l, N) {
    return w(l, N, $, B, F, x);
  }
  function u(l, N) {
    var M, _, y, D;
    if (!l || !l.state || N > f || N < 0)
      return l ? at(l, d) : d;
    if (_ = l.state, !l.output || !l.input && l.avail_in !== 0 || _.status === lt && N !== c)
      return at(l, l.avail_out === 0 ? v : d);
    if (_.strm = l, M = _.last_flush, _.last_flush = N, _.status === Rt)
      if (_.wrap === 2)
        l.adler = 0, q(_, 31), q(_, 139), q(_, 8), _.gzhead ? (q(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), q(_, _.gzhead.time & 255), q(_, _.gzhead.time >> 8 & 255), q(_, _.gzhead.time >> 16 & 255), q(_, _.gzhead.time >> 24 & 255), q(_, _.level === 9 ? 2 : _.strategy >= A || _.level < 2 ? 4 : 0), q(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (q(_, _.gzhead.extra.length & 255), q(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (l.adler = i(l.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = J) : (q(_, 0), q(_, 0), q(_, 0), q(_, 0), q(_, 0), q(_, _.level === 9 ? 2 : _.strategy >= A || _.level < 2 ? 4 : 0), q(_, ot), _.status = Q);
      else {
        var et = $ + (_.w_bits - 8 << 4) << 8, X = -1;
        _.strategy >= A || _.level < 2 ? X = 0 : _.level < 6 ? X = 1 : _.level === 6 ? X = 2 : X = 3, et |= X << 6, _.strstart !== 0 && (et |= rt), et += 31 - et % 31, _.status = Q, xt(_, et), _.strstart !== 0 && (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), l.adler = 1;
      }
    if (_.status === J)
      if (_.gzhead.extra) {
        for (y = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)); )
          q(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = gt);
      } else
        _.status = gt;
    if (_.status === gt)
      if (_.gzhead.name) {
        y = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)) {
            D = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? D = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : D = 0, q(_, D);
        } while (D !== 0);
        _.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), D === 0 && (_.gzindex = 0, _.status = St);
      } else
        _.status = St;
    if (_.status === St)
      if (_.gzhead.comment) {
        y = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)) {
            D = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? D = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : D = 0, q(_, D);
        } while (D !== 0);
        _.gzhead.hcrc && _.pending > y && (l.adler = i(l.adler, _.pending_buf, _.pending - y, y)), D === 0 && (_.status = pt);
      } else
        _.status = pt;
    if (_.status === pt && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && st(l), _.pending + 2 <= _.pending_buf_size && (q(_, l.adler & 255), q(_, l.adler >> 8 & 255), l.adler = 0, _.status = Q)) : _.status = Q), _.pending !== 0) {
      if (st(l), l.avail_out === 0)
        return _.last_flush = -1, h;
    } else if (l.avail_in === 0 && kt(N) <= kt(M) && N !== c)
      return at(l, v);
    if (_.status === lt && l.avail_in !== 0)
      return at(l, v);
    if (l.avail_in !== 0 || _.lookahead !== 0 || N !== a && _.status !== lt) {
      var Y = _.strategy === A ? H(_, N) : _.strategy === T ? zt(_, N) : vt[_.level].func(_, N);
      if ((Y === Nt || Y === $t) && (_.status = lt), Y === ht || Y === Nt)
        return l.avail_out === 0 && (_.last_flush = -1), h;
      if (Y === Et && (N === s ? e._tr_align(_) : N !== f && (e._tr_stored_block(_, 0, 0, !1), N === o && (Dt(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), st(l), l.avail_out === 0))
        return _.last_flush = -1, h;
    }
    return N !== c ? h : _.wrap <= 0 ? g : (_.wrap === 2 ? (q(_, l.adler & 255), q(_, l.adler >> 8 & 255), q(_, l.adler >> 16 & 255), q(_, l.adler >> 24 & 255), q(_, l.total_in & 255), q(_, l.total_in >> 8 & 255), q(_, l.total_in >> 16 & 255), q(_, l.total_in >> 24 & 255)) : (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), st(l), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? h : g);
  }
  function P(l) {
    var N;
    return !l || !l.state ? d : (N = l.state.status, N !== Rt && N !== J && N !== gt && N !== St && N !== pt && N !== Q && N !== lt ? at(l, d) : (l.state = null, N === Q ? at(l, p) : h));
  }
  function it(l, N) {
    var M = N.length, _, y, D, et, X, Y, wt, ae;
    if (!l || !l.state || (_ = l.state, et = _.wrap, et === 2 || et === 1 && _.status !== Rt || _.lookahead))
      return d;
    for (et === 1 && (l.adler = n(l.adler, N, M, 0)), _.wrap = 0, M >= _.w_size && (et === 0 && (Dt(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), ae = new t.Buf8(_.w_size), t.arraySet(ae, N, M - _.w_size, _.w_size, 0), N = ae, M = _.w_size), X = l.avail_in, Y = l.next_in, wt = l.input, l.avail_in = M, l.next_in = 0, l.input = N, tt(_); _.lookahead >= W; ) {
      y = _.strstart, D = _.lookahead - (W - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[y + W - 1]) & _.hash_mask, _.prev[y & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = y, y++;
      while (--D);
      _.strstart = y, _.lookahead = W - 1, tt(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = W - 1, _.match_available = 0, l.next_in = Y, l.input = wt, l.avail_in = X, _.wrap = et, h;
  }
  return Kt.deflateInit = R, Kt.deflateInit2 = w, Kt.deflateReset = L, Kt.deflateResetKeep = z, Kt.deflateSetHeader = G, Kt.deflate = u, Kt.deflateEnd = P, Kt.deflateSetDictionary = it, Kt.deflateInfo = "pako deflate (from Nodeca project)", Kt;
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
    var o, c, f, h, g, d = s.length, p = 0;
    for (h = 0; h < d; h++)
      c = s.charCodeAt(h), (c & 64512) === 55296 && h + 1 < d && (f = s.charCodeAt(h + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), h++)), p += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (o = new t.Buf8(p), g = 0, h = 0; g < p; h++)
      c = s.charCodeAt(h), (c & 64512) === 55296 && h + 1 < d && (f = s.charCodeAt(h + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), h++)), c < 128 ? o[g++] = c : c < 2048 ? (o[g++] = 192 | c >>> 6, o[g++] = 128 | c & 63) : c < 65536 ? (o[g++] = 224 | c >>> 12, o[g++] = 128 | c >>> 6 & 63, o[g++] = 128 | c & 63) : (o[g++] = 240 | c >>> 18, o[g++] = 128 | c >>> 12 & 63, o[g++] = 128 | c >>> 6 & 63, o[g++] = 128 | c & 63);
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
    var c, f, h, g, d = o || s.length, p = new Array(d * 2);
    for (f = 0, c = 0; c < d; ) {
      if (h = s[c++], h < 128) {
        p[f++] = h;
        continue;
      }
      if (g = i[h], g > 4) {
        p[f++] = 65533, c += g - 1;
        continue;
      }
      for (h &= g === 2 ? 31 : g === 3 ? 15 : 7; g > 1 && c < d; )
        h = h << 6 | s[c++] & 63, g--;
      if (g > 1) {
        p[f++] = 65533;
        continue;
      }
      h < 65536 ? p[f++] = h : (h -= 65536, p[f++] = 55296 | h >> 10 & 1023, p[f++] = 56320 | h & 1023);
    }
    return a(p, f);
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
  var t = V0(), e = de(), n = no(), i = ir(), r = io(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, h = 2, g = -1, d = 0, p = 8;
  function v(T) {
    if (!(this instanceof v)) return new v(T);
    this.options = e.assign({
      level: g,
      method: p,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: d,
      to: ""
    }, T || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var x = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (x !== c)
      throw new Error(i[x]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var S;
      if (typeof k.dictionary == "string" ? S = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? S = new Uint8Array(k.dictionary) : S = k.dictionary, x = t.deflateSetDictionary(this.strm, S), x !== c)
        throw new Error(i[x]);
      this._dict_set = !0;
    }
  }
  v.prototype.push = function(T, k) {
    var x = this.strm, S = this.options.chunkSize, $, E;
    if (this.ended)
      return !1;
    E = k === ~~k ? k : k === !0 ? o : s, typeof T == "string" ? x.input = n.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? x.input = new Uint8Array(T) : x.input = T, x.next_in = 0, x.avail_in = x.input.length;
    do {
      if (x.avail_out === 0 && (x.output = new e.Buf8(S), x.next_out = 0, x.avail_out = S), $ = t.deflate(x, E), $ !== f && $ !== c)
        return this.onEnd($), this.ended = !0, !1;
      (x.avail_out === 0 || x.avail_in === 0 && (E === o || E === h)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(x.output, x.next_out))) : this.onData(e.shrinkBuf(x.output, x.next_out)));
    } while ((x.avail_in > 0 || x.avail_out === 0) && $ !== f);
    return E === o ? ($ = t.deflateEnd(this.strm), this.onEnd($), this.ended = !0, $ === c) : (E === h && (this.onEnd(c), x.avail_out = 0), !0);
  }, v.prototype.onData = function(T) {
    this.chunks.push(T);
  }, v.prototype.onEnd = function(T) {
    T === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function C(T, k) {
    var x = new v(k);
    if (x.push(T, !0), x.err)
      throw x.msg || i[x.err];
    return x.result;
  }
  function I(T, k) {
    return k = k || {}, k.raw = !0, C(T, k);
  }
  function A(T, k) {
    return k = k || {}, k.gzip = !0, C(T, k);
  }
  return Ne.Deflate = v, Ne.deflate = C, Ne.deflateRaw = I, Ne.gzip = A, Ne;
}
var De = {}, Wt = {}, fi, Ta;
function Z0() {
  if (Ta) return fi;
  Ta = 1;
  var t = 30, e = 12;
  return fi = function(i, r) {
    var a, s, o, c, f, h, g, d, p, v, C, I, A, T, k, x, S, $, E, B, F, O, b, Z, V;
    a = i.state, s = i.next_in, Z = i.input, o = s + (i.avail_in - 5), c = i.next_out, V = i.output, f = c - (r - i.avail_out), h = c + (i.avail_out - 257), g = a.dmax, d = a.wsize, p = a.whave, v = a.wnext, C = a.window, I = a.hold, A = a.bits, T = a.lencode, k = a.distcode, x = (1 << a.lenbits) - 1, S = (1 << a.distbits) - 1;
    t:
      do {
        A < 15 && (I += Z[s++] << A, A += 8, I += Z[s++] << A, A += 8), $ = T[I & x];
        e:
          for (; ; ) {
            if (E = $ >>> 24, I >>>= E, A -= E, E = $ >>> 16 & 255, E === 0)
              V[c++] = $ & 65535;
            else if (E & 16) {
              B = $ & 65535, E &= 15, E && (A < E && (I += Z[s++] << A, A += 8), B += I & (1 << E) - 1, I >>>= E, A -= E), A < 15 && (I += Z[s++] << A, A += 8, I += Z[s++] << A, A += 8), $ = k[I & S];
              n:
                for (; ; ) {
                  if (E = $ >>> 24, I >>>= E, A -= E, E = $ >>> 16 & 255, E & 16) {
                    if (F = $ & 65535, E &= 15, A < E && (I += Z[s++] << A, A += 8, A < E && (I += Z[s++] << A, A += 8)), F += I & (1 << E) - 1, F > g) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (I >>>= E, A -= E, E = c - f, F > E) {
                      if (E = F - E, E > p && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (O = 0, b = C, v === 0) {
                        if (O += d - E, E < B) {
                          B -= E;
                          do
                            V[c++] = C[O++];
                          while (--E);
                          O = c - F, b = V;
                        }
                      } else if (v < E) {
                        if (O += d + v - E, E -= v, E < B) {
                          B -= E;
                          do
                            V[c++] = C[O++];
                          while (--E);
                          if (O = 0, v < B) {
                            E = v, B -= E;
                            do
                              V[c++] = C[O++];
                            while (--E);
                            O = c - F, b = V;
                          }
                        }
                      } else if (O += v - E, E < B) {
                        B -= E;
                        do
                          V[c++] = C[O++];
                        while (--E);
                        O = c - F, b = V;
                      }
                      for (; B > 2; )
                        V[c++] = b[O++], V[c++] = b[O++], V[c++] = b[O++], B -= 3;
                      B && (V[c++] = b[O++], B > 1 && (V[c++] = b[O++]));
                    } else {
                      O = c - F;
                      do
                        V[c++] = V[O++], V[c++] = V[O++], V[c++] = V[O++], B -= 3;
                      while (B > 2);
                      B && (V[c++] = V[O++], B > 1 && (V[c++] = V[O++]));
                    }
                  } else if ((E & 64) === 0) {
                    $ = k[($ & 65535) + (I & (1 << E) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((E & 64) === 0) {
              $ = T[($ & 65535) + (I & (1 << E) - 1)];
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
      } while (s < o && c < h);
    B = A >> 3, s -= B, A -= B << 3, I &= (1 << A) - 1, i.next_in = s, i.next_out = c, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = c < h ? 257 + (h - c) : 257 - (c - h), a.hold = I, a.bits = A;
  }, fi;
}
var hi, Ea;
function q0() {
  if (Ea) return hi;
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
  ], h = [
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
  return hi = function(d, p, v, C, I, A, T, k) {
    var x = k.bits, S = 0, $ = 0, E = 0, B = 0, F = 0, O = 0, b = 0, Z = 0, V = 0, K = 0, nt, ft, W, j, U, rt = null, Rt = 0, J, gt = new t.Buf16(e + 1), St = new t.Buf16(e + 1), pt = null, Q = 0, lt, ht, Et;
    for (S = 0; S <= e; S++)
      gt[S] = 0;
    for ($ = 0; $ < C; $++)
      gt[p[v + $]]++;
    for (F = x, B = e; B >= 1 && gt[B] === 0; B--)
      ;
    if (F > B && (F = B), B === 0)
      return I[A++] = 1 << 24 | 64 << 16 | 0, I[A++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (E = 1; E < B && gt[E] === 0; E++)
      ;
    for (F < E && (F = E), Z = 1, S = 1; S <= e; S++)
      if (Z <<= 1, Z -= gt[S], Z < 0)
        return -1;
    if (Z > 0 && (d === r || B !== 1))
      return -1;
    for (St[1] = 0, S = 1; S < e; S++)
      St[S + 1] = St[S] + gt[S];
    for ($ = 0; $ < C; $++)
      p[v + $] !== 0 && (T[St[p[v + $]]++] = $);
    if (d === r ? (rt = pt = T, J = 19) : d === a ? (rt = o, Rt -= 257, pt = c, Q -= 257, J = 256) : (rt = f, pt = h, J = -1), K = 0, $ = 0, S = E, U = A, O = F, b = 0, W = -1, V = 1 << F, j = V - 1, d === a && V > n || d === s && V > i)
      return 1;
    for (; ; ) {
      lt = S - b, T[$] < J ? (ht = 0, Et = T[$]) : T[$] > J ? (ht = pt[Q + T[$]], Et = rt[Rt + T[$]]) : (ht = 96, Et = 0), nt = 1 << S - b, ft = 1 << O, E = ft;
      do
        ft -= nt, I[U + (K >> b) + ft] = lt << 24 | ht << 16 | Et | 0;
      while (ft !== 0);
      for (nt = 1 << S - 1; K & nt; )
        nt >>= 1;
      if (nt !== 0 ? (K &= nt - 1, K += nt) : K = 0, $++, --gt[S] === 0) {
        if (S === B)
          break;
        S = p[v + T[$]];
      }
      if (S > F && (K & j) !== W) {
        for (b === 0 && (b = F), U += E, O = S - b, Z = 1 << O; O + b < B && (Z -= gt[O + b], !(Z <= 0)); )
          O++, Z <<= 1;
        if (V += 1 << O, d === a && V > n || d === s && V > i)
          return 1;
        W = K & j, I[W] = F << 24 | O << 16 | U - A | 0;
      }
    }
    return K !== 0 && (I[U + K] = S - b << 24 | 64 << 16 | 0), k.bits = F, 0;
  }, hi;
}
var Sa;
function G0() {
  if (Sa) return Wt;
  Sa = 1;
  var t = de(), e = to(), n = eo(), i = Z0(), r = q0(), a = 0, s = 1, o = 2, c = 4, f = 5, h = 6, g = 0, d = 1, p = 2, v = -2, C = -3, I = -4, A = -5, T = 8, k = 1, x = 2, S = 3, $ = 4, E = 5, B = 6, F = 7, O = 8, b = 9, Z = 10, V = 11, K = 12, nt = 13, ft = 14, W = 15, j = 16, U = 17, rt = 18, Rt = 19, J = 20, gt = 21, St = 22, pt = 23, Q = 24, lt = 25, ht = 26, Et = 27, Nt = 28, $t = 29, ot = 30, at = 31, kt = 32, Dt = 852, st = 592, _t = 15, q = _t;
  function xt(w) {
    return (w >>> 24 & 255) + (w >>> 8 & 65280) + ((w & 65280) << 8) + ((w & 255) << 24);
  }
  function Tt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Ft(w) {
    var R;
    return !w || !w.state ? v : (R = w.state, w.total_in = w.total_out = R.total = 0, w.msg = "", R.wrap && (w.adler = R.wrap & 1), R.mode = k, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new t.Buf32(Dt), R.distcode = R.distdyn = new t.Buf32(st), R.sane = 1, R.back = -1, g);
  }
  function tt(w) {
    var R;
    return !w || !w.state ? v : (R = w.state, R.wsize = 0, R.whave = 0, R.wnext = 0, Ft(w));
  }
  function dt(w, R) {
    var u, P;
    return !w || !w.state || (P = w.state, R < 0 ? (u = 0, R = -R) : (u = (R >> 4) + 1, R < 48 && (R &= 15)), R && (R < 8 || R > 15)) ? v : (P.window !== null && P.wbits !== R && (P.window = null), P.wrap = u, P.wbits = R, tt(w));
  }
  function ct(w, R) {
    var u, P;
    return w ? (P = new Tt(), w.state = P, P.window = null, u = dt(w, R), u !== g && (w.state = null), u) : v;
  }
  function ut(w) {
    return ct(w, q);
  }
  var zt = !0, H, yt;
  function vt(w) {
    if (zt) {
      var R;
      for (H = new t.Buf32(512), yt = new t.Buf32(32), R = 0; R < 144; )
        w.lens[R++] = 8;
      for (; R < 256; )
        w.lens[R++] = 9;
      for (; R < 280; )
        w.lens[R++] = 7;
      for (; R < 288; )
        w.lens[R++] = 8;
      for (r(s, w.lens, 0, 288, H, 0, w.work, { bits: 9 }), R = 0; R < 32; )
        w.lens[R++] = 5;
      r(o, w.lens, 0, 32, yt, 0, w.work, { bits: 5 }), zt = !1;
    }
    w.lencode = H, w.lenbits = 9, w.distcode = yt, w.distbits = 5;
  }
  function mt(w, R, u, P) {
    var it, l = w.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), P >= l.wsize ? (t.arraySet(l.window, R, u - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (it = l.wsize - l.wnext, it > P && (it = P), t.arraySet(l.window, R, u - P, it, l.wnext), P -= it, P ? (t.arraySet(l.window, R, u - P, P, 0), l.wnext = P, l.whave = l.wsize) : (l.wnext += it, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += it))), 0;
  }
  function m(w, R) {
    var u, P, it, l, N, M, _, y, D, et, X, Y, wt, ae, Mt = 0, bt, Bt, Pt, Ut, nn, rn, Ot, Gt, Ht = new t.Buf8(4), se, ee, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!w || !w.state || !w.output || !w.input && w.avail_in !== 0)
      return v;
    u = w.state, u.mode === K && (u.mode = nt), N = w.next_out, it = w.output, _ = w.avail_out, l = w.next_in, P = w.input, M = w.avail_in, y = u.hold, D = u.bits, et = M, X = _, Gt = g;
    t:
      for (; ; )
        switch (u.mode) {
          case k:
            if (u.wrap === 0) {
              u.mode = nt;
              break;
            }
            for (; D < 16; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if (u.wrap & 2 && y === 35615) {
              u.check = 0, Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0), y = 0, D = 0, u.mode = x;
              break;
            }
            if (u.flags = 0, u.head && (u.head.done = !1), !(u.wrap & 1) || /* check if zlib header allowed */
            (((y & 255) << 8) + (y >> 8)) % 31) {
              w.msg = "incorrect header check", u.mode = ot;
              break;
            }
            if ((y & 15) !== T) {
              w.msg = "unknown compression method", u.mode = ot;
              break;
            }
            if (y >>>= 4, D -= 4, Ot = (y & 15) + 8, u.wbits === 0)
              u.wbits = Ot;
            else if (Ot > u.wbits) {
              w.msg = "invalid window size", u.mode = ot;
              break;
            }
            u.dmax = 1 << Ot, w.adler = u.check = 1, u.mode = y & 512 ? Z : K, y = 0, D = 0;
            break;
          case x:
            for (; D < 16; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if (u.flags = y, (u.flags & 255) !== T) {
              w.msg = "unknown compression method", u.mode = ot;
              break;
            }
            if (u.flags & 57344) {
              w.msg = "unknown header flags set", u.mode = ot;
              break;
            }
            u.head && (u.head.text = y >> 8 & 1), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0, u.mode = S;
          /* falls through */
          case S:
            for (; D < 32; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            u.head && (u.head.time = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, Ht[2] = y >>> 16 & 255, Ht[3] = y >>> 24 & 255, u.check = n(u.check, Ht, 4, 0)), y = 0, D = 0, u.mode = $;
          /* falls through */
          case $:
            for (; D < 16; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            u.head && (u.head.xflags = y & 255, u.head.os = y >> 8), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0, u.mode = E;
          /* falls through */
          case E:
            if (u.flags & 1024) {
              for (; D < 16; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              u.length = y, u.head && (u.head.extra_len = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0;
            } else u.head && (u.head.extra = null);
            u.mode = B;
          /* falls through */
          case B:
            if (u.flags & 1024 && (Y = u.length, Y > M && (Y = M), Y && (u.head && (Ot = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), t.arraySet(
              u.head.extra,
              P,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              Y,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ot
            )), u.flags & 512 && (u.check = n(u.check, P, Y, l)), M -= Y, l += Y, u.length -= Y), u.length))
              break t;
            u.length = 0, u.mode = F;
          /* falls through */
          case F:
            if (u.flags & 2048) {
              if (M === 0)
                break t;
              Y = 0;
              do
                Ot = P[l + Y++], u.head && Ot && u.length < 65536 && (u.head.name += String.fromCharCode(Ot));
              while (Ot && Y < M);
              if (u.flags & 512 && (u.check = n(u.check, P, Y, l)), M -= Y, l += Y, Ot)
                break t;
            } else u.head && (u.head.name = null);
            u.length = 0, u.mode = O;
          /* falls through */
          case O:
            if (u.flags & 4096) {
              if (M === 0)
                break t;
              Y = 0;
              do
                Ot = P[l + Y++], u.head && Ot && u.length < 65536 && (u.head.comment += String.fromCharCode(Ot));
              while (Ot && Y < M);
              if (u.flags & 512 && (u.check = n(u.check, P, Y, l)), M -= Y, l += Y, Ot)
                break t;
            } else u.head && (u.head.comment = null);
            u.mode = b;
          /* falls through */
          case b:
            if (u.flags & 512) {
              for (; D < 16; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              if (y !== (u.check & 65535)) {
                w.msg = "header crc mismatch", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = !0), w.adler = u.check = 0, u.mode = K;
            break;
          case Z:
            for (; D < 32; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            w.adler = u.check = xt(y), y = 0, D = 0, u.mode = V;
          /* falls through */
          case V:
            if (u.havedict === 0)
              return w.next_out = N, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, p;
            w.adler = u.check = 1, u.mode = K;
          /* falls through */
          case K:
            if (R === f || R === h)
              break t;
          /* falls through */
          case nt:
            if (u.last) {
              y >>>= D & 7, D -= D & 7, u.mode = Et;
              break;
            }
            for (; D < 3; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            switch (u.last = y & 1, y >>>= 1, D -= 1, y & 3) {
              case 0:
                u.mode = ft;
                break;
              case 1:
                if (vt(u), u.mode = J, R === h) {
                  y >>>= 2, D -= 2;
                  break t;
                }
                break;
              case 2:
                u.mode = U;
                break;
              case 3:
                w.msg = "invalid block type", u.mode = ot;
            }
            y >>>= 2, D -= 2;
            break;
          case ft:
            for (y >>>= D & 7, D -= D & 7; D < 32; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if ((y & 65535) !== (y >>> 16 ^ 65535)) {
              w.msg = "invalid stored block lengths", u.mode = ot;
              break;
            }
            if (u.length = y & 65535, y = 0, D = 0, u.mode = W, R === h)
              break t;
          /* falls through */
          case W:
            u.mode = j;
          /* falls through */
          case j:
            if (Y = u.length, Y) {
              if (Y > M && (Y = M), Y > _ && (Y = _), Y === 0)
                break t;
              t.arraySet(it, P, l, Y, N), M -= Y, l += Y, _ -= Y, N += Y, u.length -= Y;
              break;
            }
            u.mode = K;
            break;
          case U:
            for (; D < 14; ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if (u.nlen = (y & 31) + 257, y >>>= 5, D -= 5, u.ndist = (y & 31) + 1, y >>>= 5, D -= 5, u.ncode = (y & 15) + 4, y >>>= 4, D -= 4, u.nlen > 286 || u.ndist > 30) {
              w.msg = "too many length or distance symbols", u.mode = ot;
              break;
            }
            u.have = 0, u.mode = rt;
          /* falls through */
          case rt:
            for (; u.have < u.ncode; ) {
              for (; D < 3; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              u.lens[sr[u.have++]] = y & 7, y >>>= 3, D -= 3;
            }
            for (; u.have < 19; )
              u.lens[sr[u.have++]] = 0;
            if (u.lencode = u.lendyn, u.lenbits = 7, se = { bits: u.lenbits }, Gt = r(a, u.lens, 0, 19, u.lencode, 0, u.work, se), u.lenbits = se.bits, Gt) {
              w.msg = "invalid code lengths set", u.mode = ot;
              break;
            }
            u.have = 0, u.mode = Rt;
          /* falls through */
          case Rt:
            for (; u.have < u.nlen + u.ndist; ) {
              for (; Mt = u.lencode[y & (1 << u.lenbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Pt = Mt & 65535, !(bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              if (Pt < 16)
                y >>>= bt, D -= bt, u.lens[u.have++] = Pt;
              else {
                if (Pt === 16) {
                  for (ee = bt + 2; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += P[l++] << D, D += 8;
                  }
                  if (y >>>= bt, D -= bt, u.have === 0) {
                    w.msg = "invalid bit length repeat", u.mode = ot;
                    break;
                  }
                  Ot = u.lens[u.have - 1], Y = 3 + (y & 3), y >>>= 2, D -= 2;
                } else if (Pt === 17) {
                  for (ee = bt + 3; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += P[l++] << D, D += 8;
                  }
                  y >>>= bt, D -= bt, Ot = 0, Y = 3 + (y & 7), y >>>= 3, D -= 3;
                } else {
                  for (ee = bt + 7; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += P[l++] << D, D += 8;
                  }
                  y >>>= bt, D -= bt, Ot = 0, Y = 11 + (y & 127), y >>>= 7, D -= 7;
                }
                if (u.have + Y > u.nlen + u.ndist) {
                  w.msg = "invalid bit length repeat", u.mode = ot;
                  break;
                }
                for (; Y--; )
                  u.lens[u.have++] = Ot;
              }
            }
            if (u.mode === ot)
              break;
            if (u.lens[256] === 0) {
              w.msg = "invalid code -- missing end-of-block", u.mode = ot;
              break;
            }
            if (u.lenbits = 9, se = { bits: u.lenbits }, Gt = r(s, u.lens, 0, u.nlen, u.lencode, 0, u.work, se), u.lenbits = se.bits, Gt) {
              w.msg = "invalid literal/lengths set", u.mode = ot;
              break;
            }
            if (u.distbits = 6, u.distcode = u.distdyn, se = { bits: u.distbits }, Gt = r(o, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, se), u.distbits = se.bits, Gt) {
              w.msg = "invalid distances set", u.mode = ot;
              break;
            }
            if (u.mode = J, R === h)
              break t;
          /* falls through */
          case J:
            u.mode = gt;
          /* falls through */
          case gt:
            if (M >= 6 && _ >= 258) {
              w.next_out = N, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, i(w, X), N = w.next_out, it = w.output, _ = w.avail_out, l = w.next_in, P = w.input, M = w.avail_in, y = u.hold, D = u.bits, u.mode === K && (u.back = -1);
              break;
            }
            for (u.back = 0; Mt = u.lencode[y & (1 << u.lenbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Pt = Mt & 65535, !(bt <= D); ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if (Bt && (Bt & 240) === 0) {
              for (Ut = bt, nn = Bt, rn = Pt; Mt = u.lencode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              y >>>= Ut, D -= Ut, u.back += Ut;
            }
            if (y >>>= bt, D -= bt, u.back += bt, u.length = Pt, Bt === 0) {
              u.mode = ht;
              break;
            }
            if (Bt & 32) {
              u.back = -1, u.mode = K;
              break;
            }
            if (Bt & 64) {
              w.msg = "invalid literal/length code", u.mode = ot;
              break;
            }
            u.extra = Bt & 15, u.mode = St;
          /* falls through */
          case St:
            if (u.extra) {
              for (ee = u.extra; D < ee; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              u.length += y & (1 << u.extra) - 1, y >>>= u.extra, D -= u.extra, u.back += u.extra;
            }
            u.was = u.length, u.mode = pt;
          /* falls through */
          case pt:
            for (; Mt = u.distcode[y & (1 << u.distbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Pt = Mt & 65535, !(bt <= D); ) {
              if (M === 0)
                break t;
              M--, y += P[l++] << D, D += 8;
            }
            if ((Bt & 240) === 0) {
              for (Ut = bt, nn = Bt, rn = Pt; Mt = u.distcode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              y >>>= Ut, D -= Ut, u.back += Ut;
            }
            if (y >>>= bt, D -= bt, u.back += bt, Bt & 64) {
              w.msg = "invalid distance code", u.mode = ot;
              break;
            }
            u.offset = Pt, u.extra = Bt & 15, u.mode = Q;
          /* falls through */
          case Q:
            if (u.extra) {
              for (ee = u.extra; D < ee; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              u.offset += y & (1 << u.extra) - 1, y >>>= u.extra, D -= u.extra, u.back += u.extra;
            }
            if (u.offset > u.dmax) {
              w.msg = "invalid distance too far back", u.mode = ot;
              break;
            }
            u.mode = lt;
          /* falls through */
          case lt:
            if (_ === 0)
              break t;
            if (Y = X - _, u.offset > Y) {
              if (Y = u.offset - Y, Y > u.whave && u.sane) {
                w.msg = "invalid distance too far back", u.mode = ot;
                break;
              }
              Y > u.wnext ? (Y -= u.wnext, wt = u.wsize - Y) : wt = u.wnext - Y, Y > u.length && (Y = u.length), ae = u.window;
            } else
              ae = it, wt = N - u.offset, Y = u.length;
            Y > _ && (Y = _), _ -= Y, u.length -= Y;
            do
              it[N++] = ae[wt++];
            while (--Y);
            u.length === 0 && (u.mode = gt);
            break;
          case ht:
            if (_ === 0)
              break t;
            it[N++] = u.length, _--, u.mode = gt;
            break;
          case Et:
            if (u.wrap) {
              for (; D < 32; ) {
                if (M === 0)
                  break t;
                M--, y |= P[l++] << D, D += 8;
              }
              if (X -= _, w.total_out += X, u.total += X, X && (w.adler = u.check = /*UPDATE(state.check, put - _out, _out);*/
              u.flags ? n(u.check, it, X, N - X) : e(u.check, it, X, N - X)), X = _, (u.flags ? y : xt(y)) !== u.check) {
                w.msg = "incorrect data check", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.mode = Nt;
          /* falls through */
          case Nt:
            if (u.wrap && u.flags) {
              for (; D < 32; ) {
                if (M === 0)
                  break t;
                M--, y += P[l++] << D, D += 8;
              }
              if (y !== (u.total & 4294967295)) {
                w.msg = "incorrect length check", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.mode = $t;
          /* falls through */
          case $t:
            Gt = d;
            break t;
          case ot:
            Gt = C;
            break t;
          case at:
            return I;
          case kt:
          /* falls through */
          default:
            return v;
        }
    return w.next_out = N, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, (u.wsize || X !== w.avail_out && u.mode < ot && (u.mode < Et || R !== c)) && mt(w, w.output, w.next_out, X - w.avail_out), et -= w.avail_in, X -= w.avail_out, w.total_in += et, w.total_out += X, u.total += X, u.wrap && X && (w.adler = u.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    u.flags ? n(u.check, it, X, w.next_out - X) : e(u.check, it, X, w.next_out - X)), w.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === K ? 128 : 0) + (u.mode === J || u.mode === W ? 256 : 0), (et === 0 && X === 0 || R === c) && Gt === g && (Gt = A), Gt;
  }
  function z(w) {
    if (!w || !w.state)
      return v;
    var R = w.state;
    return R.window && (R.window = null), w.state = null, g;
  }
  function L(w, R) {
    var u;
    return !w || !w.state || (u = w.state, (u.wrap & 2) === 0) ? v : (u.head = R, R.done = !1, g);
  }
  function G(w, R) {
    var u = R.length, P, it, l;
    return !w || !w.state || (P = w.state, P.wrap !== 0 && P.mode !== V) ? v : P.mode === V && (it = 1, it = e(it, R, u, 0), it !== P.check) ? C : (l = mt(w, R, u, u), l ? (P.mode = at, I) : (P.havedict = 1, g));
  }
  return Wt.inflateReset = tt, Wt.inflateReset2 = dt, Wt.inflateResetKeep = Ft, Wt.inflateInit = ut, Wt.inflateInit2 = ct, Wt.inflate = m, Wt.inflateEnd = z, Wt.inflateGetHeader = L, Wt.inflateSetDictionary = G, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var ui, Aa;
function ro() {
  return Aa || (Aa = 1, ui = {
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
  if (Na) return De;
  Na = 1;
  var t = G0(), e = de(), n = no(), i = ro(), r = ir(), a = io(), s = W0(), o = Object.prototype.toString;
  function c(g) {
    if (!(this instanceof c)) return new c(g);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, g || {});
    var d = this.options;
    d.raw && d.windowBits >= 0 && d.windowBits < 16 && (d.windowBits = -d.windowBits, d.windowBits === 0 && (d.windowBits = -15)), d.windowBits >= 0 && d.windowBits < 16 && !(g && g.windowBits) && (d.windowBits += 32), d.windowBits > 15 && d.windowBits < 48 && (d.windowBits & 15) === 0 && (d.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var p = t.inflateInit2(
      this.strm,
      d.windowBits
    );
    if (p !== i.Z_OK)
      throw new Error(r[p]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), d.dictionary && (typeof d.dictionary == "string" ? d.dictionary = n.string2buf(d.dictionary) : o.call(d.dictionary) === "[object ArrayBuffer]" && (d.dictionary = new Uint8Array(d.dictionary)), d.raw && (p = t.inflateSetDictionary(this.strm, d.dictionary), p !== i.Z_OK)))
      throw new Error(r[p]);
  }
  c.prototype.push = function(g, d) {
    var p = this.strm, v = this.options.chunkSize, C = this.options.dictionary, I, A, T, k, x, S = !1;
    if (this.ended)
      return !1;
    A = d === ~~d ? d : d === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof g == "string" ? p.input = n.binstring2buf(g) : o.call(g) === "[object ArrayBuffer]" ? p.input = new Uint8Array(g) : p.input = g, p.next_in = 0, p.avail_in = p.input.length;
    do {
      if (p.avail_out === 0 && (p.output = new e.Buf8(v), p.next_out = 0, p.avail_out = v), I = t.inflate(p, i.Z_NO_FLUSH), I === i.Z_NEED_DICT && C && (I = t.inflateSetDictionary(this.strm, C)), I === i.Z_BUF_ERROR && S === !0 && (I = i.Z_OK, S = !1), I !== i.Z_STREAM_END && I !== i.Z_OK)
        return this.onEnd(I), this.ended = !0, !1;
      p.next_out && (p.avail_out === 0 || I === i.Z_STREAM_END || p.avail_in === 0 && (A === i.Z_FINISH || A === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = n.utf8border(p.output, p.next_out), k = p.next_out - T, x = n.buf2string(p.output, T), p.next_out = k, p.avail_out = v - k, k && e.arraySet(p.output, p.output, T, k, 0), this.onData(x)) : this.onData(e.shrinkBuf(p.output, p.next_out))), p.avail_in === 0 && p.avail_out === 0 && (S = !0);
    } while ((p.avail_in > 0 || p.avail_out === 0) && I !== i.Z_STREAM_END);
    return I === i.Z_STREAM_END && (A = i.Z_FINISH), A === i.Z_FINISH ? (I = t.inflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === i.Z_OK) : (A === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), p.avail_out = 0), !0);
  }, c.prototype.onData = function(g) {
    this.chunks.push(g);
  }, c.prototype.onEnd = function(g) {
    g === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
  };
  function f(g, d) {
    var p = new c(d);
    if (p.push(g, !0), p.err)
      throw p.msg || r[p.err];
    return p.result;
  }
  function h(g, d) {
    return d = d || {}, d.raw = !0, f(g, d);
  }
  return De.Inflate = c, De.inflate = f, De.inflateRaw = h, De.ungzip = f, De;
}
var pi, Da;
function Y0() {
  if (Da) return pi;
  Da = 1;
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
    let h = 0;
    do {
      const g = t.subarray(a - i.blockPosition), d = new oo();
      if ({ strm: n } = d, d.push(g, so), d.err)
        throw new Error(d.msg);
      const p = d.result;
      o.push(p);
      let v = p.length;
      c.push(a), f.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), v = o[0].length);
      const C = a;
      if (a += n.next_in, s += v, C >= r.blockPosition) {
        o[h] = o[h].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(s);
        break;
      }
      h++;
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
const Ia = 65536, tp = Ia * Ia;
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
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, h = i.getInt32(n + 20, !0), g = i.getInt32(n + 24, !0), { refIdToName: d, refNameToId: p } = this._parseNameBytes(e.subarray(n + 28, n + 28 + g));
    return {
      refIdToName: d,
      refNameToId: p,
      skipLines: h,
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
    let f, h = 16 + s + 4;
    const g = new Array(c).fill(0).map(() => {
      const d = i.getInt32(h, !0);
      h += 4;
      const p = {};
      let v;
      for (let C = 0; C < d; C += 1) {
        const I = i.getUint32(h, !0);
        if (I > this.maxBinNumber)
          v = this.parsePseudoBin(n, h + 4), h += 48;
        else {
          const A = Le(n, h + 4);
          f = this._findFirstData(f, A);
          const T = i.getInt32(h + 12, !0);
          h += 16;
          const k = new Array(T);
          for (let x = 0; x < T; x += 1) {
            const S = Le(n, h), $ = Le(n, h + 8);
            h += 16, k[x] = new Bn(S, $, I);
          }
          p[I] = k;
        }
      }
      return { binIndex: p, stats: v };
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
    for (const [h, g] of c)
      for (let d = h; d <= g; d++)
        if (o.binIndex[d])
          for (const p of o.binIndex[d])
            f.push(new Bn(p.minv, p.maxv, d));
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
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", h = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!h)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const g = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, d = r.getInt32(24, !0), p = 5, v = ((1 << (p + 1) * 3) - 1) / 7, C = 2 ** (14 + p * 3), I = d ? String.fromCharCode(d) : null, A = r.getInt32(28, !0), T = r.getInt32(32, !0), { refNameToId: k, refIdToName: x } = this._parseNameBytes(i.slice(36, 36 + T));
    let S = 36 + T, $;
    return {
      indices: new Array(s).fill(0).map(() => {
        const B = r.getInt32(S, !0);
        S += 4;
        const F = {};
        let O;
        for (let V = 0; V < B; V += 1) {
          const K = r.getUint32(S, !0);
          if (S += 4, K > v + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (K === v + 1) {
            const nt = r.getInt32(S, !0);
            S += 4, nt === 2 && (O = this.parsePseudoBin(i, S)), S += 16 * nt;
          } else {
            const nt = r.getInt32(S, !0);
            S += 4;
            const ft = new Array(nt);
            for (let W = 0; W < nt; W += 1) {
              const j = Le(i, S), U = Le(i, S + 8);
              S += 16, $ = this._findFirstData($, j), ft[W] = new Bn(j, U, K);
            }
            F[K] = ft;
          }
        }
        const b = r.getInt32(S, !0);
        S += 4;
        const Z = new Array(b);
        for (let V = 0; V < b; V += 1)
          Z[V] = Le(i, S), S += 8, $ = this._findFirstData($, Z[V]);
        return {
          binIndex: F,
          linearIndex: Z,
          stats: O
        };
      }),
      metaChar: I,
      maxBinNumber: v,
      maxRefLength: C,
      skipLines: A,
      firstDataLine: $,
      columnNumbers: g,
      coordinateType: c,
      format: h,
      refIdToName: x,
      refNameToId: k,
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
    const f = lp(n, i), h = [];
    for (const [C, I] of f)
      for (let A = C; A <= I; A++)
        if (o.binIndex[A])
          for (const T of o.binIndex[A])
            h.push(new Bn(T.minv, T.maxv, A));
    const g = o.linearIndex.length;
    let d = null;
    const p = Math.min(n >> 14, g - 1), v = Math.min(i >> 14, g - 1);
    for (let C = p; C <= v; ++C) {
      const I = o.linearIndex[C];
      I && (!d || I.compareTo(d) < 0) && (d = I);
    }
    return fo(h, d);
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: h = (d) => d, chunkCacheSize: g = 5 * 2 ** 20 }) {
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
        renameRefSeqs: h
      });
    else if (f)
      this.index = new _i({
        filehandle: f,
        renameRefSeqs: h
      });
    else if (r)
      this.index = new Ve({
        filehandle: new gn(r),
        renameRefSeqs: h
      });
    else if (o)
      this.index = new _i({
        filehandle: new gn(o),
        renameRefSeqs: h
      });
    else if (e)
      this.index = new Ve({
        filehandle: new gn(`${e}.tbi`),
        renameRefSeqs: h
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
    this.renameRefSeq = h, this.chunkCache = new Te({
      cache: new Un({ maxSize: Math.floor(g / 65536) }),
      fill: (d, p) => this.readChunk(d, { signal: p })
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
    const f = n ?? 0, h = i ?? c.maxRefLength;
    if (!(f <= h))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === h)
      return;
    const g = await this.index.blocksForRange(e, f, h, s);
    We(a);
    const d = new TextDecoder("utf8");
    for (const p of g) {
      const { buffer: v, cpositions: C, dpositions: I } = await this.chunkCache.get(p.toString(), p, a);
      We(a);
      let A = 0, T = 0;
      const k = d.decode(v), x = cp(k);
      for (; A < k.length; ) {
        let S, $;
        if (x) {
          if ($ = k.indexOf(`
`, A), $ === -1)
            break;
          S = k.slice(A, $);
        } else {
          if ($ = v.indexOf(10, A), $ === -1)
            break;
          const F = v.slice(A, $);
          S = d.decode(F);
        }
        if (I) {
          for (; A + p.minv.dataPosition >= I[T++]; )
            ;
          T--;
        }
        const { startCoordinate: E, overlaps: B } = this.checkLine(c, e, f, h, S);
        if (B)
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
            C[T] * 256 + (A - I[T]) + p.minv.dataPosition + 1
          );
        else if (E !== void 0 && E >= h)
          return;
        A = $ + 1;
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
      const f = 10, h = i.charCodeAt(0);
      for (let g = 0; g < o.length && !(g === c + 1 && o[g] !== h); g += 1)
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
    let { ref: h, start: g, end: d } = s;
    h || (h = 0), g || (g = 0), d || (d = 0), f === "VCF" && (d = 8);
    const p = Math.max(h, g, d);
    let v = 1, C = 0, I = "", A = -1 / 0;
    const T = a.length;
    for (let k = 0; k < T + 1; k++)
      if (a[k] === "	" || k === T) {
        if (v === h) {
          if (this.renameRefSeq(a.slice(C, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (v === g) {
          if (A = parseInt(a.slice(C, k), 10), c === "1-based-closed" && (A -= 1), A >= r)
            return {
              startCoordinate: A,
              overlaps: !1
            };
          if ((d === 0 || d === g) && A + 1 <= i)
            return {
              startCoordinate: A,
              overlaps: !1
            };
        } else if (f === "VCF" && v === 4)
          I = a.slice(C, k);
        else if (v === d && (f === "VCF" ? this._getVcfEnd(A, I, a.slice(C, k)) : Number.parseInt(a.slice(C, k), 10)) <= i)
          return {
            overlaps: !1
          };
        if (C = k + 1, v += 1, v > p)
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
function hp(t, e, n) {
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
          const f = i[a++], h = f.indexOf(":");
          r[c] = h !== -1 ? f.slice(0, h) : f;
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
function up(t) {
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
  return Object.fromEntries(up(e).map((n) => {
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
        for (let h = 0; h < f.length; h++) {
          const g = f[h];
          i[c][a[h]] = g === "" || g === "." ? void 0 : g.split(",").map((d) => d === "." ? void 0 : s[h] ? +d : d);
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
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, c, f, h, g] = i, d = a, p = +s, v = o === "." ? void 0 : o.split(";"), C = c, I = f === "." ? void 0 : f.split(","), A = h === "." ? void 0 : +h, T = g === "." ? void 0 : g.split(";"), k = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const x = ($ = i[7]) == null ? void 0 : $.includes("%"), S = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((E) => {
      const [B, F] = E.split("="), O = F == null ? void 0 : F.split(",").map((Z) => Z === "." ? void 0 : Z).map((Z) => Z && x ? _p(Z) : Z), b = this.getMetadata("INFO", B, "Type");
      return b === "Integer" || b === "Float" ? [
        B,
        O == null ? void 0 : O.map((Z) => Z === void 0 ? void 0 : Number(Z))
      ] : b === "Flag" ? [B, !0] : [B, O ?? !0];
    }));
    return {
      CHROM: d,
      POS: p,
      ALT: I,
      INFO: S,
      REF: C,
      FILTER: T && T.length === 1 && T[0] === "PASS" ? "PASS" : T,
      ID: v,
      QUAL: A,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => hp(i[8] ?? "", r, this.samples)
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
    let [s, o] = ho(a, n);
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
        const c = a.map((f) => f.split("->").map((h) => h.trim())).map((f) => f[1] && f[0] === o ? f[1] : "").filter((f) => !!f);
        return c.length ? `${o} -> ${c.join(",")}` : o;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function ho(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = vp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? ho(`<${i.slice(0, -1).join(":")}>`, e) : [];
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
      const h = s.parseLine(f), g = new kp({
        variant: h,
        parser: s,
        id: `${c++}`
      }), d = g.get("INFO");
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
        type: La(d.soTerm[0]) ?? g.get("type"),
        ...Object.fromEntries(
          Object.entries(d).map(([p, v]) => [
            p,
            {
              values: [JSON.stringify(v.map((C) => La(C)))]
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
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Dh();
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
    const e = this.width, n = this.config.transcriptTypes ?? Th, i = this.config.variantTypes ?? Eh, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome, f = this.config.variantFilter ?? [], h = this.config.isoformFilter ?? [], g = this.config.htpVariant ?? "", d = s.start, p = s.end;
    new Oh({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: d,
        end: p,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let I = 100;
    const A = this.config.showVariantLabel ?? !0, { viewer: T, genome: k, height: x, tracks: S } = this;
    if (!S || !Array.isArray(S))
      throw new Error(`Tracks must be an array, got: ${typeof S}`);
    S.map(($) => {
      const { variantData: E, trackData: B } = $;
      if ($.type === Pe.ISOFORM_AND_VARIANT) {
        const F = new Rh({
          viewer: T,
          height: x,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: A,
          trackData: B,
          variantData: E,
          variantFilter: f,
          binRatio: r,
          isoformFilter: h,
          geneBounds: $.geneBounds,
          geneSymbol: $.geneSymbol,
          geneId: $.geneId
        });
        I += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const F = new Mh({
          viewer: T,
          height: x,
          width: e,
          transcriptTypes: n,
          variantData: E,
          trackData: B,
          variantTypes: i,
          showVariantLabel: A,
          variantFilter: f
        });
        I += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM) {
        const F = new Lh({
          region: a,
          viewer: T,
          height: x,
          width: e,
          genome: k,
          trackData: B,
          transcriptTypes: n,
          htpVariant: g
        });
        I += F.DrawTrack();
      } else $.type === Pe.VARIANT ? new ad({
        region: a,
        viewer: T,
        range: o,
        height: x,
        width: e
      }).DrawTrack() : $.type === Pe.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: T,
        track: {
          ...$,
          range: o
        },
        height: x,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${$.type}`);
      At(this.svg_target).attr("height", I);
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
