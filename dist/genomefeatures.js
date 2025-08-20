function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function uo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oa(t) {
  let e, n, r;
  t.length !== 2 ? (e = vn, n = (o, c) => vn(t(o), c), r = (o, c) => t(o) - c) : (e = t === vn || t === uo ? t : po, n = t, r = t);
  function i(o, c, f = 0, h = o.length) {
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
    const g = i(o, c, f, h - 1);
    return g > f && r(o[g - 1], c) > -r(o[g], c) ? g - 1 : g;
  }
  return { left: i, center: s, right: a };
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
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= vo ? 10 : a >= wo ? 5 : a >= yo ? 2 : 1;
  let o, c, f;
  return i < 0 ? (f = Math.pow(10, -i) / s, o = Math.round(t * f), c = Math.round(e * f), o / f < t && ++o, c / f > e && --c, f = -f) : (f = Math.pow(10, i) * s, o = Math.round(t / f), c = Math.round(e / f), o * f < t && ++o, c * f > e && --c), c < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, c, f];
}
function bo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, a, s] = r ? En(e, t, n) : En(t, e, n);
  if (!(a >= i)) return [];
  const o = a - i + 1, c = new Array(o);
  if (r)
    if (s < 0) for (let f = 0; f < o; ++f) c[f] = (a - f) / -s;
    else for (let f = 0; f < o; ++f) c[f] = (a - f) * s;
  else if (s < 0) for (let f = 0; f < o; ++f) c[f] = (i + f) / -s;
  else for (let f = 0; f < o; ++f) c[f] = (i + f) * s;
  return c;
}
function gr(t, e, n) {
  return e = +e, t = +t, n = +n, En(t, e, n)[2];
}
function xo(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? gr(e, t, n) : gr(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function ko(t) {
  return t;
}
var wn = 1, qn = 2, mr = 3, an = 4, oi = 1e-6;
function To(t) {
  return "translate(" + t + ",0)";
}
function Eo(t) {
  return "translate(0," + t + ")";
}
function Ao(t) {
  return (e) => +t(e);
}
function So(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function No() {
  return !this.__axis;
}
function Fa(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === wn || t === an ? -1 : 1, h = t === an || t === qn ? "x" : "y", g = t === wn || t === mr ? To : Eo;
  function d(p) {
    var v = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), F = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ko), I = Math.max(a, 0) + o, S = e.range(), T = +S[0] + c, k = +S[S.length - 1] + c, x = (e.bandwidth ? So : Ao)(e.copy(), c), A = p.selection ? p.selection() : p, N = A.selectAll(".domain").data([null]), E = A.selectAll(".tick").data(v, e).order(), B = E.exit(), C = E.enter().append("g").attr("class", "tick"), O = E.select("line"), b = E.select("text");
    N = N.merge(N.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), E = E.merge(C), O = O.merge(C.append("line").attr("stroke", "currentColor").attr(h + "2", f * a)), b = b.merge(C.append("text").attr("fill", "currentColor").attr(h, f * I).attr("dy", t === wn ? "0em" : t === mr ? "0.71em" : "0.32em")), p !== A && (N = N.transition(p), E = E.transition(p), O = O.transition(p), b = b.transition(p), B = B.transition(p).attr("opacity", oi).attr("transform", function(G) {
      return isFinite(G = x(G)) ? g(G + c) : this.getAttribute("transform");
    }), C.attr("opacity", oi).attr("transform", function(G) {
      var P = this.parentNode.__axis;
      return g((P && isFinite(P = P(G)) ? P : x(G)) + c);
    })), B.remove(), N.attr("d", t === an || t === qn ? s ? "M" + f * s + "," + T + "H" + c + "V" + k + "H" + f * s : "M" + c + "," + T + "V" + k : s ? "M" + T + "," + f * s + "V" + c + "H" + k + "V" + f * s : "M" + T + "," + c + "H" + k), E.attr("opacity", 1).attr("transform", function(G) {
      return g(x(G) + c);
    }), O.attr(h + "2", f * a), b.attr(h, f * I).text(F), A.filter(No).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === qn ? "start" : t === an ? "end" : "middle"), A.each(function() {
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
    return arguments.length ? (r = p == null ? null : Array.from(p), d) : r && r.slice();
  }, d.tickFormat = function(p) {
    return arguments.length ? (i = p, d) : i;
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
function li(t) {
  return Fa(wn, t);
}
function $o(t) {
  return Fa(mr, t);
}
var Do = { value: () => {
} };
function Ca() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new yn(n);
}
function yn(t) {
  this._ = t;
}
function Io(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
yn.prototype = Ca.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, r = Io(t + "", n), i, a = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (t = r[a]).type) && (i = Ro(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (i = (t = r[a]).type) n[i] = ci(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = ci(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new yn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r) a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(e, n);
  }
};
function Ro(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ci(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Do, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var vr = "http://www.w3.org/1999/xhtml";
const fi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), fi.hasOwnProperty(e) ? { space: fi[e], local: t } : t;
}
function Mo(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === vr && e.documentElement.namespaceURI === vr ? e.createElement(t) : e.createElementNS(n, t);
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
function zr(t) {
  return t == null ? Oo : function() {
    return this.querySelector(t);
  };
}
function Fo(t) {
  typeof t != "function" && (t = zr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
  return new Pt(r, this._parents);
}
function Ba(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Co() {
  return [];
}
function Ha(t) {
  return t == null ? Co : function() {
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
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (r.push(t.call(c, c.__data__, f, s)), i.push(c));
  return new Pt(r, i);
}
function Va(t) {
  return function() {
    return this.matches(t);
  };
}
function Pa(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ho = Array.prototype.find;
function Vo(t) {
  return function() {
    return Ho.call(this.children, t);
  };
}
function Po() {
  return this.firstElementChild;
}
function Uo(t) {
  return this.select(t == null ? Po : Vo(typeof t == "function" ? t : Pa(t)));
}
var Go = Array.prototype.filter;
function Zo() {
  return Array.from(this.children);
}
function qo(t) {
  return function() {
    return Go.call(this.children, t);
  };
}
function Wo(t) {
  return this.selectAll(t == null ? Zo : qo(typeof t == "function" ? t : Pa(t)));
}
function Xo(t) {
  typeof t != "function" && (t = Va(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Pt(r, this._parents);
}
function Ua(t) {
  return new Array(t.length);
}
function Ko() {
  return new Pt(this._enter || this._groups.map(Ua), this._parents);
}
function An(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
An.prototype = {
  constructor: An,
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
function Yo(t) {
  return function() {
    return t;
  };
}
function Jo(t, e, n, r, i, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new An(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (i[s] = o);
}
function Qo(t, e, n, r, i, a, s) {
  var o, c, f = /* @__PURE__ */ new Map(), h = e.length, g = a.length, d = new Array(h), p;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (d[o] = p = s.call(c, c.__data__, o, e) + "", f.has(p) ? i[o] = c : f.set(p, c));
  for (o = 0; o < g; ++o)
    p = s.call(t, a[o], o, a) + "", (c = f.get(p)) ? (r[o] = c, c.__data__ = a[o], f.delete(p)) : n[o] = new An(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f.get(d[o]) === c && (i[o] = c);
}
function jo(t) {
  return t.__data__;
}
function tl(t, e) {
  if (!arguments.length) return Array.from(this, jo);
  var n = e ? Qo : Jo, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Yo(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = r[f], g = i[f], d = g.length, p = el(t.call(h, h && h.__data__, f, r)), v = p.length, F = o[f] = new Array(v), I = s[f] = new Array(v), S = c[f] = new Array(d);
    n(h, g, F, I, S, p, e);
    for (var T = 0, k = 0, x, A; T < v; ++T)
      if (x = F[T]) {
        for (T >= k && (k = T + 1); !(A = I[k]) && ++k < v; ) ;
        x._next = A || null;
      }
  }
  return s = new Pt(s, r), s._enter = o, s._exit = c, s;
}
function el(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function nl() {
  return new Pt(this._exit || this._groups.map(Ua), this._parents);
}
function rl(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function il(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, s = Math.min(i, a), o = new Array(i), c = 0; c < s; ++c)
    for (var f = n[c], h = r[c], g = f.length, d = o[c] = new Array(g), p, v = 0; v < g; ++v)
      (p = f[v] || h[v]) && (d[v] = p);
  for (; c < i; ++c)
    o[c] = n[c];
  return new Pt(o, this._parents);
}
function al() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function sl(t) {
  t || (t = ol);
  function e(g, d) {
    return g && d ? t(g.__data__, d.__data__) : !g - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
    c.sort(e);
  }
  return new Pt(i, this._parents).order();
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
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
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
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
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
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? _l : pl : typeof e == "function" ? n.local ? wl : vl : n.local ? ml : gl)(n, e));
}
function Ga(t) {
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
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Tl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? bl : typeof e == "function" ? kl : xl)(t, e, n ?? "")) : Oe(this.node(), t);
}
function Oe(t, e) {
  return t.style.getPropertyValue(e) || Ga(t).getComputedStyle(t, null).getPropertyValue(e);
}
function El(t) {
  return function() {
    delete this[t];
  };
}
function Al(t, e) {
  return function() {
    this[t] = e;
  };
}
function Sl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Nl(t, e) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? Sl : Al)(t, e)) : this.node()[t];
}
function Za(t) {
  return t.trim().split(/^|\s+/);
}
function Br(t) {
  return t.classList || new qa(t);
}
function qa(t) {
  this._node = t, this._names = Za(t.getAttribute("class") || "");
}
qa.prototype = {
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
  for (var n = Br(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Xa(t, e) {
  for (var n = Br(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function $l(t) {
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
  var n = Za(t + "");
  if (arguments.length < 2) {
    for (var r = Br(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Il : e ? $l : Dl)(n, e));
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
function Fl(t) {
  return arguments.length ? this.each(t == null ? Ml : (typeof t == "function" ? Ol : Ll)(t)) : this.node().textContent;
}
function Cl() {
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
  return arguments.length ? this.each(t == null ? Cl : (typeof t == "function" ? Bl : zl)(t)) : this.node().innerHTML;
}
function Vl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Pl() {
  return this.each(Vl);
}
function Ul() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Gl() {
  return this.each(Ul);
}
function Zl(t) {
  var e = typeof t == "function" ? t : za(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ql() {
  return null;
}
function Wl(t, e) {
  var n = typeof t == "function" ? t : za(t), r = e == null ? ql : typeof e == "function" ? e : zr(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Xl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Kl() {
  return this.each(Xl);
}
function Yl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Jl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ql(t) {
  return this.select(t ? Jl : Yl);
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
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function nc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function rc(t, e, n) {
  return function() {
    var r = this.__on, i, a = tc(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ic(t, e, n) {
  var r = ec(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (i = 0, h = o[c]; i < a; ++i)
          if ((s = r[i]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? rc : nc, i = 0; i < a; ++i) this.each(o(r[i], e, n));
  return this;
}
function Ka(t, e, n) {
  var r = Ga(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function ac(t, e) {
  return function() {
    return Ka(this, t, e);
  };
}
function sc(t, e) {
  return function() {
    return Ka(this, t, e.apply(this, arguments));
  };
}
function oc(t, e) {
  return this.each((typeof e == "function" ? sc : ac)(t, e));
}
function* lc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, s; i < a; ++i)
      (s = r[i]) && (yield s);
}
var Hr = [null];
function Pt(t, e) {
  this._groups = t, this._parents = e;
}
function Ae() {
  return new Pt([[document.documentElement]], Hr);
}
function cc() {
  return this;
}
Pt.prototype = Ae.prototype = {
  constructor: Pt,
  select: Fo,
  selectAll: Bo,
  selectChild: Uo,
  selectChildren: Wo,
  filter: Xo,
  data: tl,
  enter: Ko,
  exit: nl,
  join: rl,
  merge: il,
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
  property: Nl,
  classed: Rl,
  text: Fl,
  html: Hl,
  raise: Pl,
  lower: Gl,
  append: Zl,
  insert: Wl,
  remove: Kl,
  clone: Ql,
  datum: jl,
  on: ic,
  dispatch: oc,
  [Symbol.iterator]: lc
};
function St(t) {
  return typeof t == "string" ? new Pt([[document.querySelector(t)]], [document.documentElement]) : new Pt([[t]], Hr);
}
function Jt(t) {
  return typeof t == "string" ? new Pt([document.querySelectorAll(t)], [document.documentElement]) : new Pt([Ba(t)], Hr);
}
function Vr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ya(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function en() {
}
var Ke = 0.7, Sn = 1 / Ke, Me = "\\s*([+-]?\\d+)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", re = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fc = /^#([0-9a-f]{3,8})$/, hc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), uc = new RegExp(`^rgb\\(${re},${re},${re}\\)$`), dc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ye}\\)$`), pc = new RegExp(`^rgba\\(${re},${re},${re},${Ye}\\)$`), _c = new RegExp(`^hsl\\(${Ye},${re},${re}\\)$`), gc = new RegExp(`^hsla\\(${Ye},${re},${re},${Ye}\\)$`), hi = {
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
Vr(en, xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ui,
  // Deprecated! Use color.formatHex.
  formatHex: ui,
  formatHex8: mc,
  formatHsl: vc,
  formatRgb: di,
  toString: di
});
function ui() {
  return this.rgb().formatHex();
}
function mc() {
  return this.rgb().formatHex8();
}
function vc() {
  return Ja(this).formatHsl();
}
function di() {
  return this.rgb().formatRgb();
}
function xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = fc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pi(e) : n === 3 ? new Gt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = hc.exec(t)) ? new Gt(e[1], e[2], e[3], 1) : (e = uc.exec(t)) ? new Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = dc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = pc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = _c.exec(t)) ? mi(e[1], e[2] / 100, e[3] / 100, 1) : (e = gc.exec(t)) ? mi(e[1], e[2] / 100, e[3] / 100, e[4]) : hi.hasOwnProperty(t) ? pi(hi[t]) : t === "transparent" ? new Gt(NaN, NaN, NaN, 0) : null;
}
function pi(t) {
  return new Gt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function sn(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Gt(t, e, n, r);
}
function wc(t) {
  return t instanceof en || (t = xe(t)), t ? (t = t.rgb(), new Gt(t.r, t.g, t.b, t.opacity)) : new Gt();
}
function wr(t, e, n, r) {
  return arguments.length === 1 ? wc(t) : new Gt(t, e, n, r ?? 1);
}
function Gt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Vr(Gt, wr, Ya(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Gt(ye(this.r), ye(this.g), ye(this.b), Nn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _i,
  // Deprecated! Use color.formatHex.
  formatHex: _i,
  formatHex8: yc,
  formatRgb: gi,
  toString: gi
}));
function _i() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}`;
}
function yc() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}${ve((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gi() {
  const t = Nn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ye(this.r)}, ${ye(this.g)}, ${ye(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Nn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ye(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ve(t) {
  return t = ye(t), (t < 16 ? "0" : "") + t.toString(16);
}
function mi(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new jt(t, e, n, r);
}
function Ja(t) {
  if (t instanceof jt) return new jt(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = xe(t)), !t) return new jt();
  if (t instanceof jt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), s = NaN, o = a - i, c = (a + i) / 2;
  return o ? (e === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + i : 2 - a - i, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new jt(s, o, c, t.opacity);
}
function bc(t, e, n, r) {
  return arguments.length === 1 ? Ja(t) : new jt(t, e, n, r ?? 1);
}
function jt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Vr(jt, bc, Ya(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Gt(
      Wn(t >= 240 ? t - 240 : t + 120, i, r),
      Wn(t, i, r),
      Wn(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new jt(vi(this.h), on(this.s), on(this.l), Nn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Nn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${vi(this.h)}, ${on(this.s) * 100}%, ${on(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function vi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function on(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Pr = (t) => () => t;
function xc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function kc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Tc(t) {
  return (t = +t) == 1 ? Qa : function(e, n) {
    return n - e ? kc(e, n, t) : Pr(isNaN(e) ? n : e);
  };
}
function Qa(t, e) {
  var n = e - t;
  return n ? xc(t, n) : Pr(isNaN(t) ? e : t);
}
const $n = function t(e) {
  var n = Tc(e);
  function r(i, a) {
    var s = n((i = wr(i)).r, (a = wr(a)).r), o = n(i.g, a.g), c = n(i.b, a.b), f = Qa(i.opacity, a.opacity);
    return function(h) {
      return i.r = s(h), i.g = o(h), i.b = c(h), i.opacity = f(h), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Ec(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Ac(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Sc(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Ur(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function Nc(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Qt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function $c(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Ur(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var yr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Xn = new RegExp(yr.source, "g");
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
  var n = yr.lastIndex = Xn.lastIndex = 0, r, i, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (r = yr.exec(t)) && (i = Xn.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, c.push({ i: s, x: Qt(r, i) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Ic(c[0].x) : Dc(e) : (e = c.length, function(f) {
    for (var h = 0, g; h < e; ++h) o[(g = c[h]).i] = g.x(f);
    return o.join("");
  });
}
function Ur(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Pr(e) : (n === "number" ? Qt : n === "string" ? (r = xe(e)) ? (e = r, $n) : ja : e instanceof xe ? $n : e instanceof Date ? Nc : Ac(e) ? Ec : Array.isArray(e) ? Sc : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? $c : Qt)(t, e);
}
function Rc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var wi = 180 / Math.PI, br = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ts(t, e, n, r, i, a) {
  var s, o, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * wi,
    skewX: Math.atan(c) * wi,
    scaleX: s,
    scaleY: o
  };
}
var ln;
function Mc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? br : ts(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Lc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? br : (t = t.matrix, ts(t.a, t.b, t.c, t.d, t.e, t.f));
}
function es(t, e, n, r) {
  function i(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, h, g, d, p, v) {
    if (f !== g || h !== d) {
      var F = p.push("translate(", null, e, null, n);
      v.push({ i: F - 4, x: Qt(f, g) }, { i: F - 2, x: Qt(h, d) });
    } else (g || d) && p.push("translate(" + g + e + d + n);
  }
  function s(f, h, g, d) {
    f !== h ? (f - h > 180 ? h += 360 : h - f > 180 && (f += 360), d.push({ i: g.push(i(g) + "rotate(", null, r) - 2, x: Qt(f, h) })) : h && g.push(i(g) + "rotate(" + h + r);
  }
  function o(f, h, g, d) {
    f !== h ? d.push({ i: g.push(i(g) + "skewX(", null, r) - 2, x: Qt(f, h) }) : h && g.push(i(g) + "skewX(" + h + r);
  }
  function c(f, h, g, d, p, v) {
    if (f !== g || h !== d) {
      var F = p.push(i(p) + "scale(", null, ",", null, ")");
      v.push({ i: F - 4, x: Qt(f, g) }, { i: F - 2, x: Qt(h, d) });
    } else (g !== 1 || d !== 1) && p.push(i(p) + "scale(" + g + "," + d + ")");
  }
  return function(f, h) {
    var g = [], d = [];
    return f = t(f), h = t(h), a(f.translateX, f.translateY, h.translateX, h.translateY, g, d), s(f.rotate, h.rotate, g, d), o(f.skewX, h.skewX, g, d), c(f.scaleX, f.scaleY, h.scaleX, h.scaleY, g, d), f = h = null, function(p) {
      for (var v = -1, F = d.length, I; ++v < F; ) g[(I = d[v]).i] = I.x(p);
      return g.join("");
    };
  };
}
var Oc = es(Mc, "px, ", "px)", "deg)"), Fc = es(Lc, ", ", ")", ")"), Fe = 0, Ue = 0, He = 0, ns = 1e3, Dn, Ge, In = 0, ke = 0, Vn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, rs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Gr() {
  return ke || (rs(Cc), ke = Je.now() + Vn);
}
function Cc() {
  ke = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = is.prototype = {
  constructor: Rn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Gr() : +n) + (e == null ? 0 : +e), !this._next && Ge !== this && (Ge ? Ge._next = this : Dn = this, Ge = this), this._call = t, this._time = n, xr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xr());
  }
};
function is(t, e, n) {
  var r = new Rn();
  return r.restart(t, e, n), r;
}
function zc() {
  Gr(), ++Fe;
  for (var t = Dn, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Fe;
}
function yi() {
  ke = (In = Je.now()) + Vn, Fe = Ue = 0;
  try {
    zc();
  } finally {
    Fe = 0, Hc(), ke = 0;
  }
}
function Bc() {
  var t = Je.now(), e = t - In;
  e > ns && (Vn -= e, In = t);
}
function Hc() {
  for (var t, e = Dn, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Dn = n);
  Ge = t, xr(r);
}
function xr(t) {
  if (!Fe) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yi, t - Je.now() - Vn)), He && (He = clearInterval(He))) : (He || (In = Je.now(), He = setInterval(Bc, ns)), Fe = 1, rs(yi));
  }
}
function bi(t, e, n) {
  var r = new Rn();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Vc = Ca("start", "end", "cancel", "interrupt"), Pc = [], as = 0, xi = 1, kr = 2, bn = 3, ki = 4, Tr = 5, xn = 6;
function Pn(t, e, n, r, i, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Uc(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Vc,
    tween: Pc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: as
  });
}
function Zr(t, e) {
  var n = te(t, e);
  if (n.state > as) throw new Error("too late; already scheduled");
  return n;
}
function ie(t, e) {
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
  var r = t.__transition, i;
  r[e] = n, n.timer = is(a, 0, n.time);
  function a(f) {
    n.state = xi, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  function s(f) {
    var h, g, d, p;
    if (n.state !== xi) return c();
    for (h in r)
      if (p = r[h], p.name === n.name) {
        if (p.state === bn) return bi(s);
        p.state === ki ? (p.state = xn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[h]) : +h < e && (p.state = xn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[h]);
      }
    if (bi(function() {
      n.state === bn && (n.state = ki, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = kr, n.on.call("start", t, t.__data__, n.index, n.group), n.state === kr) {
      for (n.state = bn, i = new Array(d = n.tween.length), h = 0, g = -1; h < d; ++h)
        (p = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++g] = p);
      i.length = g + 1;
    }
  }
  function o(f) {
    for (var h = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = Tr, 1), g = -1, d = i.length; ++g < d; )
      i[g].call(t, h);
    n.state === Tr && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = xn, n.timer.stop(), delete r[e];
    for (var f in r) return;
    delete t.__transition;
  }
}
function Gc(t, e) {
  var n = t.__transition, r, i, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > kr && r.state < Tr, r.state = xn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function Zc(t) {
  return this.each(function() {
    Gc(this, t);
  });
}
function qc(t, e) {
  var n, r;
  return function() {
    var i = ie(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Wc(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = ie(this, t), s = a.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var o = { name: e, value: n }, c = 0, f = i.length; c < f; ++c)
        if (i[c].name === e) {
          i[c] = o;
          break;
        }
      c === f && i.push(o);
    }
    a.tween = i;
  };
}
function Xc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = te(this.node(), n).tween, i = 0, a = r.length, s; i < a; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? qc : Wc)(n, t, e));
}
function qr(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ie(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return te(i, r).value[e];
  };
}
function ss(t, e) {
  var n;
  return (typeof e == "number" ? Qt : e instanceof xe ? $n : (n = xe(e)) ? (e = n, $n) : ja)(t, e);
}
function Kc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Yc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Jc(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function Qc(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function jc(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function tf(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function ef(t, e) {
  var n = Hn(t), r = n === "transform" ? Fc : ss;
  return this.attrTween(t, typeof e == "function" ? (n.local ? tf : jc)(n, r, qr(this, "attr." + t, e)) : e == null ? (n.local ? Yc : Kc)(n) : (n.local ? Qc : Jc)(n, r, e));
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
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && rf(t, a)), n;
  }
  return i._value = e, i;
}
function sf(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && nf(t, a)), n;
  }
  return i._value = e, i;
}
function of(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Hn(t);
  return this.tween(n, (r.local ? af : sf)(r, e));
}
function lf(t, e) {
  return function() {
    Zr(this, t).delay = +e.apply(this, arguments);
  };
}
function cf(t, e) {
  return e = +e, function() {
    Zr(this, t).delay = e;
  };
}
function ff(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? lf : cf)(e, t)) : te(this.node(), e).delay;
}
function hf(t, e) {
  return function() {
    ie(this, t).duration = +e.apply(this, arguments);
  };
}
function uf(t, e) {
  return e = +e, function() {
    ie(this, t).duration = e;
  };
}
function df(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? hf : uf)(e, t)) : te(this.node(), e).duration;
}
function pf(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ie(this, t).ease = e;
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
    ie(this, t).ease = n;
  };
}
function mf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(gf(this._id, t));
}
function vf(t) {
  typeof t != "function" && (t = Va(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new fe(r, this._parents, this._name, this._id);
}
function wf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], h = c.length, g = s[o] = new Array(h), d, p = 0; p < h; ++p)
      (d = c[p] || f[p]) && (g[p] = d);
  for (; o < r; ++o)
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
  var r, i, a = yf(e) ? Zr : ie;
  return function() {
    var s = a(this, t), o = s.on;
    o !== r && (i = (r = o).copy()).on(e, n), s.on = i;
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
  typeof t != "function" && (t = zr(t));
  for (var r = this._groups, i = r.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = r[s], c = o.length, f = a[s] = new Array(c), h, g, d = 0; d < c; ++d)
      (h = o[d]) && (g = t.call(h, h.__data__, d, o)) && ("__data__" in h && (g.__data__ = h.__data__), f[d] = g, Pn(f[d], e, n, d, f, te(h, n)));
  return new fe(a, this._parents, e, n);
}
function Af(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var r = this._groups, i = r.length, a = [], s = [], o = 0; o < i; ++o)
    for (var c = r[o], f = c.length, h, g = 0; g < f; ++g)
      if (h = c[g]) {
        for (var d = t.call(h, h.__data__, g, c), p, v = te(h, n), F = 0, I = d.length; F < I; ++F)
          (p = d[F]) && Pn(p, e, n, F, d, v);
        a.push(d), s.push(h);
      }
  return new fe(a, s, e, n);
}
var Sf = Ae.prototype.constructor;
function Nf() {
  return new Sf(this._groups, this._parents);
}
function $f(t, e) {
  var n, r, i;
  return function() {
    var a = Oe(this, t), s = (this.style.removeProperty(t), Oe(this, t));
    return a === s ? null : a === n && s === r ? i : i = e(n = a, r = s);
  };
}
function os(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Df(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = Oe(this, t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function If(t, e, n) {
  var r, i, a;
  return function() {
    var s = Oe(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), Oe(this, t))), s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o));
  };
}
function Rf(t, e) {
  var n, r, i, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = ie(this, t), f = c.on, h = c.value[a] == null ? o || (o = os(e)) : void 0;
    (f !== n || i !== h) && (r = (n = f).copy()).on(s, i = h), c.on = r;
  };
}
function Mf(t, e, n) {
  var r = (t += "") == "transform" ? Oc : ss;
  return e == null ? this.styleTween(t, $f(t, r)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, If(t, r, qr(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, Df(t, r, e), n).on("end.style." + t, null);
}
function Lf(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Of(t, e, n) {
  var r, i;
  function a() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Lf(t, s, n)), r;
  }
  return a._value = e, a;
}
function Ff(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Of(t, e, n ?? ""));
}
function Cf(t) {
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
  return this.tween("text", typeof t == "function" ? zf(qr(this, "text", t)) : Cf(t == null ? "" : t + ""));
}
function Hf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Vf(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Hf(i)), e;
  }
  return r._value = t, r;
}
function Pf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Vf(t));
}
function Uf() {
  for (var t = this._name, e = this._id, n = ls(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, f = 0; f < o; ++f)
      if (c = s[f]) {
        var h = te(c, e);
        Pn(c, t, n, f, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new fe(r, this._parents, t, n);
}
function Gf() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var f = ie(this, r), h = f.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
    }), i === 0 && a();
  });
}
var Zf = 0;
function fe(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function ls() {
  return ++Zf;
}
var oe = Ae.prototype;
fe.prototype = {
  constructor: fe,
  select: Ef,
  selectAll: Af,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: vf,
  merge: wf,
  selection: Nf,
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
  styleTween: Ff,
  text: Bf,
  textTween: Pf,
  remove: Tf,
  tween: Xc,
  delay: ff,
  duration: df,
  ease: _f,
  easeVarying: mf,
  end: Gf,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function qf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: qf
};
function Xf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Kf(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = ls(), (n = Wf).time = Gr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && Pn(c, t, e, f, s, n || Xf(c, e));
  return new fe(r, this._parents, t, e);
}
Ae.prototype.interrupt = Zc;
Ae.prototype.transition = Kf;
const Er = Math.PI, Ar = 2 * Er, me = 1e-6, Yf = Ar - me;
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
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
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
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, a, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, a) {
    if (e = +e, n = +n, r = +r, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, c = r - e, f = i - n, h = s - e, g = o - n, d = h * h + g * g;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (d > me) if (!(Math.abs(g * c - f * h) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - s, v = i - o, F = c * c + f * f, I = p * p + v * v, S = Math.sqrt(F), T = Math.sqrt(d), k = a * Math.tan((Er - Math.acos((F + d - I) / (2 * S * T))) / 2), x = k / T, A = k / S;
      Math.abs(x - 1) > me && this._append`L${e + x * h},${n + x * g}`, this._append`A${a},${a},0,0,${+(g * p > h * v)},${this._x1 = e + A * c},${this._y1 = n + A * f}`;
    }
  }
  arc(e, n, r, i, a, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), f = e + o, h = n + c, g = 1 ^ s, d = s ? i - a : a - i;
    this._x1 === null ? this._append`M${f},${h}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - h) > me) && this._append`L${f},${h}`, r && (d < 0 && (d = d % Ar + Ar), d > Yf ? this._append`A${r},${r},0,1,${g},${e - o},${n - c}A${r},${r},0,1,${g},${this._x1 = f},${this._y1 = h}` : d > me && this._append`A${r},${r},0,${+(d >= Er)},${g},${this._x1 = e + r * Math.cos(a)},${this._y1 = n + r * Math.sin(a)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
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
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Ce(t) {
  return t = Mn(Math.abs(t)), t ? t[1] : NaN;
}
function th(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = t[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), a.push(n.substring(i -= o, i + o)), !((c += o + 1) > r)); )
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
  return new Wr({
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
Ln.prototype = Wr.prototype;
function Wr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Wr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function rh(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var fs;
function ih(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], a = i - (fs = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Mn(t, Math.max(0, e + a - 1))[0];
}
function Ti(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Ei = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: jf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Ti(t * 100, e),
  r: Ti,
  s: ih,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Ai(t) {
  return t;
}
var Si = Array.prototype.map, Ni = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ah(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ai : th(Si.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Ai : eh(Si.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(g) {
    g = Ln(g);
    var d = g.fill, p = g.align, v = g.sign, F = g.symbol, I = g.zero, S = g.width, T = g.comma, k = g.precision, x = g.trim, A = g.type;
    A === "n" ? (T = !0, A = "g") : Ei[A] || (k === void 0 && (k = 12), x = !0, A = "g"), (I || d === "0" && p === "=") && (I = !0, d = "0", p = "=");
    var N = F === "$" ? n : F === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : "", E = F === "$" ? r : /[%p]/.test(A) ? s : "", B = Ei[A], C = /[defgprs%]/.test(A);
    k = k === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function O(b) {
      var G = N, P = E, Y, nt, ft;
      if (A === "c")
        P = B(b) + P, b = "";
      else {
        b = +b;
        var W = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : B(Math.abs(b), k), x && (b = rh(b)), W && +b == 0 && v !== "+" && (W = !1), G = (W ? v === "(" ? v : o : v === "-" || v === "(" ? "" : v) + G, P = (A === "s" ? Ni[8 + fs / 3] : "") + P + (W && v === "(" ? ")" : ""), C) {
          for (Y = -1, nt = b.length; ++Y < nt; )
            if (ft = b.charCodeAt(Y), 48 > ft || ft > 57) {
              P = (ft === 46 ? i + b.slice(Y + 1) : b.slice(Y)) + P, b = b.slice(0, Y);
              break;
            }
        }
      }
      T && !I && (b = e(b, 1 / 0));
      var j = G.length + b.length + P.length, U = j < S ? new Array(S - j + 1).join(d) : "";
      switch (T && I && (b = e(U + b, U.length ? S - P.length : 1 / 0), U = ""), p) {
        case "<":
          b = G + b + P + U;
          break;
        case "=":
          b = G + U + b + P;
          break;
        case "^":
          b = U.slice(0, j = U.length >> 1) + G + b + P + U.slice(j);
          break;
        default:
          b = U + G + b + P;
          break;
      }
      return a(b);
    }
    return O.toString = function() {
      return g + "";
    }, O;
  }
  function h(g, d) {
    var p = f((g = Ln(g), g.type = "f", g)), v = Math.max(-8, Math.min(8, Math.floor(Ce(d) / 3))) * 3, F = Math.pow(10, -v), I = Ni[8 + v / 3];
    return function(S) {
      return p(F * S) + I;
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
  return Math.max(0, -Ce(Math.abs(t)));
}
function lh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ce(e) / 3))) * 3 - Ce(Math.abs(t)));
}
function ch(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ce(e) - Ce(t)) + 1;
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
var $i = [0, 1];
function Re(t) {
  return t;
}
function Sr(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : hh(isNaN(e) ? NaN : 0.5);
}
function dh(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function ph(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = Sr(i, r), a = n(s, a)) : (r = Sr(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function _h(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = Sr(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = mo(t, o, 1, r) - 1;
    return a[c](i[c](o));
  };
}
function gh(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function mh() {
  var t = $i, e = $i, n = Ur, r, i, a, s = Re, o, c, f;
  function h() {
    var d = Math.min(t.length, e.length);
    return s !== Re && (s = dh(t[0], t[d - 1])), o = d > 2 ? _h : ph, c = f = null, g;
  }
  function g(d) {
    return d == null || isNaN(d = +d) ? a : (c || (c = o(t.map(r), e, n)))(r(s(d)));
  }
  return g.invert = function(d) {
    return s(i((f || (f = o(e, t.map(r), Qt)))(d)));
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
    return r = d, i = p, h();
  };
}
function vh() {
  return mh()(Re, Re);
}
function wh(t, e, n, r) {
  var i = xo(t, e, n), a;
  switch (r = Ln(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = lh(i, s)) && (r.precision = a), us(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = ch(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = oh(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return hs(r);
}
function yh(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return bo(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return wh(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], o = r[a], c, f, h = 10;
    for (o < s && (f = s, s = o, o = f, f = i, i = a, a = f); h-- > 0; ) {
      if (f = gr(s, o, n), f === c)
        return r[i] = s, r[a] = o, e(r);
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
const Xr = Math.sqrt, ds = Math.PI, bh = 2 * ds;
function xh(t) {
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
  }, () => new Qf(e);
}
const kh = {
  draw(t, e) {
    const n = Xr(e / ds);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, bh);
  }
}, Kn = Xr(3), ps = {
  draw(t, e) {
    const n = -Xr(e / (Kn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Kn * n, -n), t.lineTo(Kn * n, -n), t.closePath();
  }
};
function _s(t, e) {
  let n = null, r = xh(i);
  t = typeof t == "function" ? t : fn(t || kh), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
  function i() {
    let a;
    if (n || (n = a = r()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : fn(a), i) : t;
  }, i.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : fn(+a), i) : e;
  }, i.context = function(a) {
    return arguments.length ? (n = a ?? null, i) : n;
  }, i;
}
function Ze(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ze.prototype = {
  constructor: Ze,
  scale: function(t) {
    return t === 1 ? this : new Ze(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ze(this.k, this.x + this.k * t, this.y + this.k * e);
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
Ze.prototype;
function Kr(t, e, n) {
  let r = 0, i, a;
  if (t.length == 0)
    r = 1;
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
        i = 1, r = s;
        break;
      }
    }
    i || (r = t.length);
  }
  return r;
}
function gs(t, e, n, r, i) {
  var f, h, g;
  let a = -1, s = -1;
  const o = [];
  if (!r && !i) {
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
    (r && ((f = d.name) == null ? void 0 : f.toLowerCase().includes(r.toLowerCase())) || i && (((h = d.name) == null ? void 0 : h.includes(i)) || ((g = d.id) == null ? void 0 : g.includes(i)))) && c.push(d);
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
          const F = v.fmin < n.start, I = v.fmax > n.end;
          if (F && I)
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
  const n = t.attr("class").split(" "), r = `.${n[0]}.${n[1]} .track`, i = Jt(r).nodes();
  let a = 0;
  return i.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function Yr(t, e) {
  var i;
  const n = ((i = e.node()) == null ? void 0 : i.getBBox().height) ?? 0;
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
    let a = St(this).attr("x"), s = +St(this).attr("width");
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
function qe(t) {
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
  const e = qe(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const r = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return ms(r);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = kn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? kn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? kn.three_prime_UTR_variant.color : "#f0f";
}
const be = 10, he = 10;
function Jr(t) {
  return `${t},${be} ${t + he / 2},${be / 2} ${t},0 ${t - he / 2},${be / 2}`;
}
function vs(t) {
  return `${t - he / 2},${be} ${t},0 ${t + he / 2},${be}`;
}
function Di(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let r = !0, i = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => i != a.row && r ? !1 : (i != a.row && (i = a.row, r = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (r = !1), !0)), r ? i : i + 1;
  }
}
function ws(t) {
  return `${t - he / 2},${be} ${t + he / 2},${be} ${t - he / 2},0 ${t + he / 2},0`;
}
function Ah(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((r) => {
        var i;
        return ((i = r[1]) == null ? void 0 : i.length) ?? 0;
      })
    ),
    descriptionHeight: e
  };
}
function Sh(t, e, n) {
  const { fmax: r, fmin: i, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= i && c >= i || c <= r && c >= r || o >= i && c <= r;
  });
}
function ys(t, e) {
  const n = [];
  return t.forEach((r) => {
    var f, h;
    const i = bs(r), { type: a, fmax: s, fmin: o } = r, c = Sh(
      n,
      r,
      e
    );
    if (c >= 0 && a != "deletion") {
      const g = n[c], d = g.variantSet ? g.variantSet.findIndex(
        (p) => p.type === a && p.consequence === i
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
          r
        );
      } else {
        const p = Math.min(g.fmin, o), v = Math.max(g.fmax, s);
        g.fmin = p, g.fmax = v, g.variantSet.push({
          variants: [r],
          type: a,
          consequence: i,
          fmin: o,
          fmax: s
        });
      }
      (h = g.variants) == null || h.push(r), g.fmin = Math.min(o, g.fmin), g.fmax = Math.max(s, g.fmax), n[c] = g;
    } else
      n.push({
        fmin: o,
        fmax: s,
        type: a,
        consequence: i,
        variantSet: [
          // @ts-expect-error
          {
            variants: [r],
            type: a,
            consequence: i,
            fmin: o,
            fmax: s
          }
        ],
        variants: [r]
      });
  }), n;
}
function Nr(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Ii(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Ii(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Ii(t) {
  const { descriptionWidth: e } = Ah(t);
  let n = "";
  const r = t.location, [i, a] = r.split(":")[1].split("..");
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
    c = `${+a - +i}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
}
function $r(t) {
  return (t.variants ?? []).map((n) => {
    const r = Nh(n);
    return {
      ...r,
      consequence: r.consequence || "UNKNOWN"
    };
  });
}
function Dr(t) {
  return (t.variants ?? []).flatMap((e) => {
    var r, i;
    const n = (i = (r = e.allele_ids) == null ? void 0 : r.values) == null ? void 0 : i[0];
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
function Ir(t) {
  return t.map((e) => ms(e.consequence));
}
function bs(t) {
  var n;
  if ((n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0)
    return qe(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return qe(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return qe(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const r of e)
      if (r.consequence && typeof r.consequence == "string")
        return qe(r.consequence);
  }
  return "UNKNOWN";
}
function hn(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function Nh(t) {
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
  var e, n, r;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xs(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const i = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), s = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", o = a.split(","), c = s.split(",");
        for (let f = 0; f < c.length; f++)
          i.push(
            `${o[f].trim()} (${c[f].trim()})`
          );
        return i.join(", ");
      } catch {
        return `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${(r = t.allele_ids) == null ? void 0 : r.values[0].replace(
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
function $h(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Rr(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Lt(t) {
  return t == "unknown" ? Rr("grey", t.replace(/_/g, " ")) : Rr(
    kn[t].color,
    t.replace(/_/g, " ")
  );
}
function Dh() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Jr(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Rr("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("transcript_ablation")}</li>`, t += `<li>${Lt("splice_acceptor_variant")}</li>`, t += `<li>${Lt("splice_donor_variant")}</li>`, t += `<li>${Lt("stop_gained")}</li>`, t += `<li>${Lt("frameshift_variant")}</li>`, t += `<li>${Lt("stop_lost")}</li>`, t += `<li>${Lt("start_lost")}</li>`, t += `<li>${Lt("inframe_insertion")}</li>`, t += `<li>${Lt("inframe_deletion")}</li>`, t += `<li>${Lt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("protein_altering_variant")}</li>`, t += `<li>${Lt("splice_region_variant")}</li>`, t += `<li>${Lt("start_retained_variant")}</li>`, t += `<li>${Lt("stop_retained_variant")}</li>`, t += `<li>${Lt("synonymous_variant")}</li>`, t += `<li>${Lt("coding_sequence_variant")}</li>`, t += `<li>${Lt("five_prime_UTR_variant")}</li>`, t += `<li>${Lt("three_prime_UTR_variant")}</li>`, t += `<li>${Lt("intron_variant")}</li>`, t += `<li>${Lt("non_coding_transcript_variant")}</li>`, t += `<li>${Lt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Ih(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ft(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Ih(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function ks(t, e, n, r) {
  let i = "";
  if (t === "FlyBase")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "MGI")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "WormBase")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "ZFIN")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "SGD")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "RGD")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "human")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else
    return console.warn("no source found", t), "Maximum features displayed.  See full view for more.";
  return `<a href="${i}">Maximum features displayed.  See full view for more.</a>`;
}
class Rh {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
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
    geneId: F
  }) {
    this.trackData = g ?? [], this.variantData = d ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = h, this.height = n, this.transcriptTypes = i, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0, this.geneBounds = p, this.geneSymbol = v, this.geneId = F;
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
    const r = this.initialHighlight;
    console.log("IsoformAndVariantTrack.DrawTrack() - About to filter variant data");
    const i = this.filterVariantData(
      this.variantData,
      this.variantFilter
    );
    console.log("IsoformAndVariantTrack.DrawTrack() - Variant data filtered", {
      filteredLength: i ? i.length : "UNDEFINED"
    });
    const a = this.viewer, s = this.width, o = this.binRatio;
    console.log("IsoformAndVariantTrack.DrawTrack() - Getting variant track positions");
    const c = $h(i), f = c.length;
    if (console.log("IsoformAndVariantTrack.DrawTrack() - Accessing trackData[0]", {
      trackData: this.trackData,
      hasTrackData: !!this.trackData,
      trackDataLength: this.trackData ? this.trackData.length : "UNDEFINED",
      hasFirstElement: this.trackData && this.trackData.length > 0,
      firstElement: this.trackData && this.trackData[0] ? this.trackData[0] : "NO FIRST ELEMENT"
    }), !this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0)
      throw console.error("IsoformAndVariantTrack.DrawTrack() - CRITICAL: trackData is invalid!", {
        trackData: this.trackData,
        type: typeof this.trackData,
        isArray: Array.isArray(this.trackData),
        length: this.trackData ? this.trackData.length : "UNDEFINED"
      }), new Error("trackData must be a non-empty array");
    const h = this.trackData[0].source, g = this.trackData[0].seqId, d = !e || e.length === 0 ? 9 : 30, p = ["UTR", "five_prime_UTR", "three_prime_UTR"], v = ["CDS"], F = ["exon"], I = this.transcriptTypes, S = gs(n, I, this.geneBounds, this.geneSymbol, this.geneId);
    let T = S.fmin, k = S.fmax;
    this.geneBounds && (T = this.geneBounds.start, k = this.geneBounds.end, S.fmin < T && (T = S.fmin), S.fmax > k && (k = S.fmax));
    const x = 10, A = 10, N = 40, E = 20, B = 2, C = 0, O = 10, b = 10, G = 4, P = 20, Y = 10, nt = `0,0 0,${P} ${Y},${Y}`, ft = 10, W = 40, j = 22.5, U = ue().domain([T, k]).range([0, s]), it = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,35)"), Rt = a.append("g").attr("class", "label"), J = {};
    for (let tt = 0, dt = p.length; tt < dt; tt++)
      J[p[tt]] = 200;
    for (let tt = 0, dt = v.length; tt < dt; tt++)
      J[v[tt]] = 1e3;
    for (let tt = 0, dt = F.length; tt < dt; tt++)
      J[F[tt]] = 100;
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
    let At = 0;
    const pt = St("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), Q = () => {
      pt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, lt = ys(
      i,
      (k - T) * o
    ), ht = lt.filter((tt) => tt.type === "deletion"), Et = lt.filter((tt) => tt.type !== "deletion"), $t = [];
    ht.forEach((tt) => {
      var z;
      const { fmax: dt, fmin: ct } = tt, ut = this.width, zt = Qe(tt), H = $r(tt), yt = Dr(tt), vt = Nr(H), mt = Ir(H)[0];
      $t.push({
        fmin: ct,
        fmax: dt,
        row: Di($t, ct, dt)
      });
      const m = Math.max(Math.ceil(U(dt) - U(ct)), B);
      it.append("rect").attr("class", "variant-deletion").attr("id", `variant-${ct}`).attr("x", U(ct)).attr(
        "transform",
        `translate(0,${b * Di($t, ct, dt)})`
      ).attr("z-index", 30).attr("fill", mt).attr("height", b).attr("width", m).on("click", () => {
        Tt(pt, vt, Q);
      }).on("mouseover", (L) => {
        const q = L.variant;
        Jt(
          ".variant-deletion"
        ).filter((w) => w.variant === q).style("stroke", "black"), St(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((w) => w.variant === q).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-deletion").filter((L) => L.selected !== "true").style("stroke", null), St(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ct,
        fmax: dt,
        variant: zt + ct,
        alleles: yt
      });
      {
        let L = 0;
        L = U(ct);
        const q = b * f + j, w = Rt.append("text").attr("class", "variantLabel").attr("fill", mt).attr("opacity", 0).attr("height", C).attr("transform", `translate(${L},${q})`).text(zt).on("click", () => {
          Tt(pt, vt, Q);
        }).datum({ fmin: ct, variant: zt + ct }), R = ((z = w.node()) == null ? void 0 : z.getBBox().width) ?? 0;
        if (R + L > ut) {
          const u = R + L - ut;
          L -= u, w.attr(
            "transform",
            `translate(${L},${q})`
          );
        }
      }
    });
    const Nt = ze(this.viewer), ot = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${Nt})`);
    Et.forEach((tt) => {
      var q;
      const { type: dt, fmax: ct, fmin: ut } = tt;
      let zt = !0, H = !1;
      const yt = this.width, vt = Qe(tt), mt = $r(tt), m = Dr(tt), z = Nr(mt), L = Ir(mt)[0];
      if (dt.toLowerCase() === "snv" || dt.toLowerCase() === "point_mutation" ? (H = !0, ot.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${ut}`).attr("points", Jr(U(ut))).attr("fill", L).attr("x", U(ut)).attr(
        "transform",
        `translate(0,${b * c.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        Tt(pt, z, Q);
      }).on("mouseover", function(w) {
        const R = w.variant;
        Jt(
          ".variant-SNV"
        ).filter((u) => u.variant === R).style("stroke", "black"), St(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-SNV").filter((w) => w.selected != "true").style("stroke", null), St(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
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
        ).filter((u) => u.variant === R).style("stroke", "black"), St(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(
          ".variant-insertion"
        ).filter((w) => w.selected != "true").style("stroke", null), St(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
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
        ).filter((u) => u.variant === R).style("stroke", "black"), St(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-delins").filter((w) => w.selected != "true").style("stroke", null), St(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ct,
        variant: vt + ut,
        alleles: m
      })) : zt = !1, zt) {
        let w = 0;
        w = H ? U(ut) - ft / 2 : U(ut);
        const R = b * f + j, u = Rt.append("text").attr("class", "variantLabel").attr("fill", L).attr("opacity", 0).attr("height", C).attr("transform", `translate(${w},${R})`).text(vt).on("click", () => {
          Tt(pt, z, Q);
        }).datum({ fmin: ut, variant: vt + ut }), V = ((q = u.node()) == null ? void 0 : q.getBBox().width) ?? 0;
        if (V + w > yt) {
          const rt = V + w - yt;
          w -= rt, u.attr("transform", `translate(${w},35)`);
        }
      }
    });
    const at = Nt;
    Rt.attr("transform", `translate(0,${at})`);
    const kt = ze(this.viewer) + j, Dt = a.append("g").attr("transform", `translate(0,${kt})`).attr("class", "track");
    let st = 0;
    const _t = [];
    let Z = -1, xt = -1;
    const Tt = this.renderTooltipDescription, Ct = [];
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
          if (Ct.includes(H.id))
            return;
          Ct.push(H.id);
          const yt = H.type;
          if (I.includes(yt)) {
            let mt = Kr(
              _t,
              U(H.fmin),
              U(H.fmax)
            );
            if (st < d) {
              let m = "", z, L = !1;
              const q = dt.name;
              Object.keys(gt).includes(q) || (At += E, L = !0, gt[q] = "Green");
              const w = Dt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${st * N + 10 + At})`
              );
              L && (m = q, z = w.append("text").attr("class", "geneLabel").attr("fill", ut ? "sandybrown" : "black").attr("height", C).attr(
                "transform",
                `translate(${U(H.fmin)},-${E})`
              ).text(m).on("click", () => {
                Tt(
                  pt,
                  Ft(dt),
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
                (l) => dt.strand > 0 ? `translate(${Number(U(l.fmax))},0)` : `translate(${Number(U(l.fmin))},${P}) rotate(180)`
              ).on("click", () => {
                Tt(
                  pt,
                  Ft(H),
                  Q
                );
              });
              const R = U(H.fmin), u = U(H.fmax) - U(H.fmin);
              w.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + C).attr("height", G).attr("transform", `translate(${R},0)`).attr("width", u).on("click", () => {
                Tt(
                  pt,
                  Ft(H),
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
              }), z = w.append("text").attr("class", "transcriptLabel").attr("fill", ut ? "sandybrown" : "gray").attr("opacity", ut ? 1 : 0.5).attr("height", C).attr("transform", `translate(${U(H.fmin)},0)`).text(m).on("click", () => {
                Tt(
                  pt,
                  Ft(H),
                  Q
                );
              }).datum({
                fmin: H.fmin
              }), console.log("DEBUG - About to calculate text_width:", {
                text_string: m,
                hasLength: m != null,
                willCalculate: m.length * 2
              });
              let V = m.length * 2;
              try {
                V = ((vt = z.node()) == null ? void 0 : vt.getBBox().width) ?? 0;
              } catch {
              }
              Number(V + U(H.fmin)) > s;
              const rt = V > U(H.fmax) - U(H.fmin) ? U(H.fmin) + V : U(H.fmax);
              if (_t[mt]) {
                const l = _t[mt];
                l.push(`${U(H.fmin)}:${rt}`), _t[mt] = l;
              } else
                _t[mt] = [
                  `${U(H.fmin)}:${rt}`
                ];
              if ((Z < 0 || Z > H.fmin) && (Z = H.fmin), (xt < 0 || xt < H.fmax) && (xt = H.fmax), H.children) {
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
                  H.children = H.children.sort((l, $) => {
                    const M = J[l.type], _ = J[$.type];
                    if (typeof M == "number" && typeof _ == "number")
                      return M - _;
                    if (typeof M == "number" && typeof _ != "number")
                      return -1;
                    if (typeof M != "number" && typeof _ == "number")
                      return 1;
                    const y = l.type || "", D = $.type || "";
                    return console.log("Exon/CDS sort comparison:", {
                      aType: y,
                      bType: D,
                      aHasType: l.type !== void 0,
                      bHasType: $.type !== void 0,
                      aTypeType: typeof l.type,
                      bTypeType: typeof $.type
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
                  const $ = l.type;
                  F.includes($) ? w.append("rect").attr("class", "exon").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${x - G})`
                  ).attr("height", x).attr("z-index", 10).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ft(H),
                      Q
                    );
                  }).datum({ fmin: l.fmin, fmax: l.fmax }) : v.includes($) ? w.append("rect").attr("class", "CDS").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${A - G})`
                  ).attr("z-index", 20).attr("height", A).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ft(H),
                      Q
                    );
                  }).datum({ fmin: l.fmin, fmax: l.fmax }) : p.includes($) && w.append("rect").attr("class", "UTR").attr("x", U(l.fmin)).attr(
                    "transform",
                    `translate(0,${O - G})`
                  ).attr("z-index", 20).attr("height", O).attr("width", U(l.fmax) - U(l.fmin)).on("click", () => {
                    Tt(
                      pt,
                      Ft(H),
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
                `translate(0,${st * N + 20 + At})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", C).html(m);
            }
          }
        });
      }
    }
    return r && Yr(r, a), st === 0 && Dt.append("text").attr("x", 30).attr("y", C + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), st * N + At + W;
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
    }), []) : e.filter((r) => {
      var a, s, o, c;
      let i = !1;
      try {
        (n.includes(r.name) || (a = r.allele_symbols) != null && a.values && n.includes(
          r.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = r.symbol) != null && s.values && n.includes(r.symbol.values[0].replace(/"/g, "")) || (o = r.symbol_text) != null && o.values && n.includes(r.symbol_text.values[0].replace(/"/g, ""))) && (i = !0), (((c = r.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((h) => {
          n.includes(h) && (i = !0);
        });
      } catch {
        i = !0;
      }
      return i;
    });
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  setInitialHighlight(e, n) {
    var a;
    const r = ((a = n.node()) == null ? void 0 : a.getBBox().height) ?? 0;
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
      const s = +(St(this).attr("width") || 3), o = +St(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", r).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Mh {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    initialHighlight: c,
    trackData: f,
    variantData: h
  }) {
    this.trackData = f ?? [], this.variantData = h ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.initialHighlight = c, this.height = n, this.transcriptTypes = i, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let r = this.trackData;
    const i = this.filterVariantData(
      e,
      this.variantFilter
    ), a = ys(
      i,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    a.forEach((at) => {
      const kt = Dr(at);
      s.set(at, kt);
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, h = ["UTR", "five_prime_UTR", "three_prime_UTR"], g = ["CDS"], d = ["exon"], p = this.transcriptTypes, v = gs(r, p), F = v.fmin, I = v.fmax, S = 10, T = 10, k = 10, x = 40, A = 20, N = 2, E = 0, B = 10, C = 10, O = 20, b = 4, G = 20, P = 10, Y = `0,0 0,${G} ${P},${P}`, nt = 10, ft = 10, W = (at) => `${at - ft / 2},${nt} ${at},0 ${at + ft / 2},${nt}`, j = (at) => `${at - ft / 2},${nt} ${at + ft / 2},${nt} ${at - ft / 2},0 ${at + ft / 2},0`, U = (at) => `${at},${nt} ${at + ft / 2},${nt / 2} ${at},0 ${at - ft / 2},${nt / 2}`, it = ue().domain([F, I]).range([0, c]), Rt = ze(this.viewer), J = o.append("g").attr("transform", `translate(0,${Rt})`).attr("class", "track"), gt = {};
    for (const at of h)
      gt[at] = 200;
    for (const at of g)
      gt[at] = 1e3;
    for (const at of d)
      gt[at] = 100;
    const At = {};
    r = r.sort((at, kt) => at.selected && !kt.selected ? -1 : !at.selected && kt.selected ? 1 : at.name - kt.name);
    let pt = 0;
    const Q = St("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), lt = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ht = 0;
    const Et = [];
    let $t = -1, Nt = -1;
    const ot = this.renderTooltipDescription;
    for (let at = 0; at < r.length && ht < S; at++) {
      const kt = r[at];
      let Dt = kt.children;
      if (Dt) {
        const st = kt.selected;
        Dt = Dt.sort((Z, xt) => Z.name < xt.name ? -1 : Z.name > xt.name ? 1 : Z - xt);
        let _t = !1;
        Dt.forEach((Z) => {
          const xt = Z.type;
          if (p.includes(xt)) {
            let Tt = Kr(
              Et,
              it(Z.fmin),
              it(Z.fmax)
            );
            if (ht < S) {
              let Ct, tt, dt = !1;
              Object.keys(At).includes(kt.name) || (pt += A, dt = !0, At[kt.name] = "Green");
              const ct = J.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ht * x + 10 + pt})`
              );
              dt && (Ct = kt.name, tt = ct.append("text").attr("class", "geneLabel").attr("fill", st ? "sandybrown" : "black").attr("height", E).attr(
                "transform",
                `translate(${it(Z.fmin)},-${A})`
              ).text(Ct).on("click", () => {
                ot(
                  Q,
                  Ft(kt),
                  lt
                );
              }).datum({ fmin: Z.fmin })), ct.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: kt.strand
              })).attr("class", "transArrow").attr("points", Y).attr("transform", (H) => kt.strand > 0 ? `translate(${Number(it(H.fmax))},0)` : `translate(${Number(it(H.fmin))},${G}) rotate(180)`).on("click", () => {
                ot(
                  Q,
                  Ft(Z),
                  lt
                );
              }), ct.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + E).attr("height", b).attr("transform", `translate(${it(Z.fmin)},0)`).attr("width", it(Z.fmax) - it(Z.fmin)).on("click", () => {
                ot(
                  Q,
                  Ft(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin, fmax: Z.fmax }), Ct = Z.name, tt = ct.append("text").attr("class", "transcriptLabel").attr("fill", st ? "sandybrown" : "gray").attr("opacity", st ? 1 : 0.5).attr("height", E).attr("transform", `translate(${it(Z.fmin)},0)`).text(Ct).on("click", () => {
                ot(
                  Q,
                  Ft(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin });
              let ut = Ct.length * 2;
              try {
                ut = tt.node().getBBox().width;
              } catch {
              }
              Number(ut + it(Z.fmin)) > c;
              const zt = ut > it(Z.fmax) - it(Z.fmin) ? it(Z.fmin) + ut : it(Z.fmax);
              if (Et[Tt]) {
                const H = Et[Tt];
                H.push(`${it(Z.fmin)}:${zt}`), Et[Tt] = H;
              } else
                Et[Tt] = [
                  `${it(Z.fmin)}:${zt}`
                ];
              ($t < 0 || $t > Z.fmin) && ($t = Z.fmin), (Nt < 0 || Nt < Z.fmax) && (Nt = Z.fmax), Z.children && (Z.children = Z.children.sort((H, yt) => {
                const vt = gt[H.type], mt = gt[yt.type];
                return typeof vt == "number" && typeof mt == "number" ? vt - mt : typeof vt == "number" && typeof mt != "number" ? -1 : typeof vt != "number" && typeof mt == "number" ? 1 : H.type - yt.type;
              }), Z.children.forEach((H) => {
                const yt = H.type;
                let vt = !1;
                d.includes(yt) ? (vt = !0, ct.append("rect").attr("class", "exon").attr("x", it(H.fmin)).attr(
                  "transform",
                  `translate(0,${T - b})`
                ).attr("height", T).attr("z-index", 10).attr("width", it(H.fmax) - it(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ft(Z),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : g.includes(yt) ? (vt = !0, ct.append("rect").attr("class", "CDS").attr("x", it(H.fmin)).attr(
                  "transform",
                  `translate(0,${k - b})`
                ).attr("z-index", 20).attr("height", k).attr("width", it(H.fmax) - it(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ft(Z),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : h.includes(yt) && (vt = !0, ct.append("rect").attr("class", "UTR").attr("x", it(H.fmin)).attr(
                  "transform",
                  `translate(0,${B - b})`
                ).attr("z-index", 20).attr("height", B).attr("width", it(H.fmax) - it(H.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ft(Z),
                    lt
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })), vt && a.forEach((mt) => {
                  const { type: m, fmax: z, fmin: L } = mt;
                  if (L < H.fmin && z > H.fmin || z > H.fmax && L < H.fmax || z <= H.fmax && L >= H.fmin) {
                    let w = !0;
                    const R = $r(mt), u = Ir(R)[0], V = Nr(R), rt = Math.max(
                      Math.ceil(it(z) - it(L)),
                      N
                    );
                    if (m.toLowerCase() === "deletion" || m.toLowerCase() === "mnv" ? ct.append("rect").attr("class", "variant-deletion").attr("x", it(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).attr("fill", u).attr("height", C).attr("width", rt).on("click", () => {
                      ot(
                        Q,
                        V,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "snv" || m.toLowerCase() === "point_mutation" ? ct.append("polygon").attr("class", "variant-SNV").attr("points", U(it(L))).attr("fill", u).attr("x", it(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        V,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "insertion" ? ct.append("polygon").attr("class", "variant-insertion").attr("points", W(it(L))).attr("fill", u).attr("x", it(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        V,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : m.toLowerCase() === "delins" || m.toLowerCase() === "substitution" || m.toLowerCase() === "indel" ? ct.append("polygon").attr("class", "variant-delins").attr("points", j(it(L))).attr("x", it(L)).attr(
                      "transform",
                      `translate(0,${O - b})`
                    ).attr("fill", u).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        V,
                        lt
                      );
                    }).datum({
                      fmin: L,
                      fmax: z,
                      alleles: s.get(mt) ?? []
                    }) : w = !1, w && f) {
                      const l = Qe(mt), $ = l.length || 1;
                      ct.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        st ? "sandybrown" : u
                      ).attr("opacity", st ? 1 : 0.5).attr("height", E).attr(
                        "transform",
                        `translate(${it(L - $ / 2 * 100)},${O * 2.2 - b})`
                      ).html(l).on("click", () => {
                        ot(
                          Q,
                          V,
                          lt
                        );
                      }).datum({ fmin: Z.fmin });
                    }
                  }
                });
              })), ht += 1;
            }
            ht === S && !_t && (++Tt, _t = !0, J.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
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
        Yr(this.initialHighlight, this.viewer);
      } catch {
      }
    return ht * x + pt;
  }
  filterVariantData(e, n) {
    if (!n || n.length === 0)
      return e;
    const r = new Set(n);
    return e.filter((a) => {
      var o, c, f, h, g;
      let s = !1;
      try {
        if (r.has(a.name) && (s = !0), (o = a.allele_symbols) != null && o.values) {
          const p = a.allele_symbols.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          r.has(p) && (s = !0);
        }
        if ((c = a.symbol) != null && c.values) {
          const p = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          r.has(p) && (s = !0);
        }
        if ((f = a.symbol_text) != null && f.values) {
          const p = a.symbol_text.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          r.has(p) && (s = !0);
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
            if (r.has(v)) {
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
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
}
class Lh {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
    htpVariant: a,
    trackData: s,
    region: o,
    genome: c
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = r, this.height = n, this.transcriptTypes = i, this.htpVariant = a, this.region = o, this.genome = c;
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  DrawTrack() {
    var W;
    let e = this.trackData;
    const n = this.htpVariant, r = this.viewer, i = this.width, a = this.genome, s = (W = e[0]) == null ? void 0 : W.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], h = ["exon"], g = this.transcriptTypes, d = 10, p = 10, v = 40, F = 0, I = 10, S = 4, T = 20, k = 10, x = `0,0 0,${T} ${k},${k}`, A = this.renderTooltipDescription, N = ue().domain([this.region.start, this.region.end]).range([0, i]), E = {};
    for (let j = 0, U = c.length; j < U; j++)
      E[c[j]] = 200;
    for (let j = 0, U = f.length; j < U; j++)
      E[f[j]] = 1e3;
    for (let j = 0, U = h.length; j < U; j++)
      E[h[j]] = 100;
    e = e.sort((j, U) => j.selected && !U.selected ? -1 : !j.selected && U.selected ? 1 : j.name - U.name);
    const B = St("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), C = () => {
      B.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const j = r.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, U] = n.split(":");
      j.append("polygon").attr("class", "variant-SNV").attr("points", Jr(N(+U))).attr("fill", "red").attr("x", N(+U)).attr("z-index", 30);
    }
    const O = ze(this.viewer), b = r.append("g").attr("transform", `translate(0,${O})`).attr("class", "track");
    let G = 0;
    const P = [];
    let Y = -1, nt = -1;
    const ft = [];
    for (let j = 0; j < e.length && G < o; j++) {
      const U = e[j];
      let it = U.children;
      if (it) {
        const Rt = U.selected;
        it = it.sort((J, gt) => J.name < gt.name ? -1 : J.name > gt.name ? 1 : 0), it.forEach((J) => {
          var At, pt;
          const gt = J.type;
          if (!ft.includes(J.id) && (ft.push(J.id), g.includes(gt))) {
            let Q = Kr(
              P,
              N(J.fmin),
              N(J.fmax)
            );
            if (G < o) {
              const lt = b.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${G * v + 10})`
              ), ht = Math.max(N(J.fmin), 0), Et = Math.min(N(J.fmax), this.width);
              lt.append("polygon").datum(() => ({
                strand: U.strand
              })).attr("class", "transArrow").attr("points", x).attr(
                "transform",
                () => U.strand > 0 ? `translate(${Et},0)` : `translate(${ht},${T}) rotate(180)`
              ).on("click", () => {
                A(
                  B,
                  Ft(J),
                  C
                );
              }), lt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", S).attr("transform", `translate(${ht},0)`).attr("width", Et - ht).datum({
                fmin: J.fmin,
                fmax: J.fmax
              }).on("click", () => {
                A(
                  B,
                  Ft(J),
                  C
                );
              });
              let $t = J.name;
              U.name !== J.name && ($t += ` (${U.name})`);
              let Nt = Math.max(N(J.fmin), 0);
              const ot = lt.append("svg:text").attr("class", "transcriptLabel").attr("fill", Rt ? "sandybrown" : "gray").attr("opacity", Rt ? 1 : 0.5).attr("height", F).attr("transform", `translate(${Nt},0)`).text($t).datum({
                fmin: J.fmin
              }).on("click", () => {
                A(
                  B,
                  Ft(J),
                  C
                );
              });
              let at = 100;
              try {
                at = ((At = ot.node()) == null ? void 0 : At.getBBox().width) ?? 0;
              } catch {
              }
              if (at + Nt > this.width) {
                const st = at + Nt - this.width;
                Nt -= st, ot.attr("transform", `translate(${Nt},0)`);
              }
              let kt = $t.length * 2;
              try {
                kt = ((pt = ot.node()) == null ? void 0 : pt.getBBox().width) ?? 0;
              } catch {
              }
              Number(kt + N(J.fmin)) > i;
              const Dt = kt > N(J.fmax) - N(J.fmin) ? N(J.fmin) + kt : N(J.fmax);
              if (P[Q]) {
                const st = P[Q];
                st.push(`${N(J.fmin)}:${Dt}`), P[Q] = st;
              } else
                P[Q] = [`${N(J.fmin)}:${Dt}`];
              (Y < 0 || Y > J.fmin) && (Y = J.fmin), (nt < 0 || nt < J.fmax) && (nt = J.fmax), J.children && (J.children = J.children.sort(
                function(st, _t) {
                  const Z = E[st.type], xt = E[_t.type];
                  if (typeof Z == "number" && typeof xt == "number")
                    return Z - xt;
                  if (typeof Z == "number" && typeof xt != "number")
                    return -1;
                  if (typeof Z != "number" && typeof xt == "number")
                    return 1;
                  const Tt = st.type || "", Ct = _t.type || "";
                  return Tt.localeCompare(Ct);
                }
              ), J.children.forEach((st) => {
                const _t = st.type;
                if (N(st.fmin) > this.width || N(st.fmax) < 0)
                  return;
                const Z = Math.max(N(st.fmin), 0), xt = Math.min(N(st.fmax), this.width);
                h.includes(_t) ? lt.append("rect").attr("class", "exon").attr("x", Z).attr(
                  "transform",
                  `translate(0,${d - S})`
                ).attr("height", d).attr("z-index", 10).attr("width", xt - Z).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ft(J),
                    C
                  );
                }) : f.includes(_t) ? lt.append("rect").attr("class", "CDS").attr("x", Z).attr(
                  "transform",
                  `translate(0,${p - S})`
                ).attr("z-index", 20).attr("height", p).attr("width", xt - Z).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ft(J),
                    C
                  );
                }) : c.includes(_t) && lt.append("rect").attr("class", "UTR").attr("x", Z).attr(
                  "transform",
                  `translate(0,${I - S})`
                ).attr("z-index", 20).attr("height", I).attr("width", xt - Z).datum({
                  fmin: st.fmin,
                  fmax: st.fmax
                }).on("click", () => {
                  A(
                    B,
                    Ft(J),
                    C
                  );
                });
              })), G += 1;
            }
            if (G === o) {
              const lt = ks(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++Q, b.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${G * v + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(lt);
            }
          }
        });
      }
    }
    return G === 0 && b.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), G * v;
  }
}
class Oh {
  constructor({ viewer: e, track: n, height: r, width: i }) {
    this.refSeq = "", this.viewer = e, this.width = i, this.height = r, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, r = ue().domain([this.track.start, this.track.end + 1]).range(this.track.range), i = $o(r).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = li(r).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(i), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Jt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Jt(".x-local-axis .tick text").each(function() {
      const f = St(this).text();
      let h = "nucleotide nt-a";
      f === "T" ? h = "nucleotide nt-t" : f === "C" ? h = "nucleotide nt-c" : f === "G" && (h = "nucleotide nt-g"), St(this.parentNode).append("rect").attr("class", h).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, r = this.track.end, i = this.width, a = ue().domain([n, r]).range(this.track.range), s = li(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", i).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, r) {
    return r ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((i, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((i, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const Ve = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var Xt = "$";
function On() {
}
On.prototype = Qr.prototype = {
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
function Qr(t, e) {
  var n = new On();
  if (t instanceof On) t.each(function(o, c) {
    n.set(c, o);
  });
  else if (Array.isArray(t)) {
    var r = -1, i = t.length, a;
    if (e == null) for (; ++r < i; ) n.set(r, t[r]);
    else for (; ++r < i; ) n.set(e(a = t[r], r, t), a);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Ri() {
}
var pe = Qr.prototype;
Ri.prototype = {
  constructor: Ri,
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
var Mr = "http://www.w3.org/1999/xhtml";
const Mi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ts(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Mi.hasOwnProperty(e) ? { space: Mi[e], local: t } : t;
}
function Fh(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mr && e.documentElement.namespaceURI === Mr ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Ch(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = Ts(t);
  return (e.local ? Ch : Fh)(e);
}
function zh() {
}
function As(t) {
  return t == null ? zh : function() {
    return this.querySelector(t);
  };
}
function Bh(t) {
  typeof t != "function" && (t = As(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
  return new Zt(r, this._parents);
}
function Hh() {
  return [];
}
function Vh(t) {
  return t == null ? Hh : function() {
    return this.querySelectorAll(t);
  };
}
function Ph(t) {
  typeof t != "function" && (t = Vh(t));
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (r.push(t.call(c, c.__data__, f, s)), i.push(c));
  return new Zt(r, i);
}
function Uh(t) {
  return function() {
    return this.matches(t);
  };
}
function Gh(t) {
  typeof t != "function" && (t = Uh(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Zt(r, this._parents);
}
function Ss(t) {
  return new Array(t.length);
}
function Zh() {
  return new Zt(this._enter || this._groups.map(Ss), this._parents);
}
function Fn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Fn.prototype = {
  constructor: Fn,
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
function qh(t) {
  return function() {
    return t;
  };
}
var Li = "$";
function Wh(t, e, n, r, i, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new Fn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (i[s] = o);
}
function Xh(t, e, n, r, i, a, s) {
  var o, c, f = {}, h = e.length, g = a.length, d = new Array(h), p;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (d[o] = p = Li + s.call(c, c.__data__, o, e), p in f ? i[o] = c : f[p] = c);
  for (o = 0; o < g; ++o)
    p = Li + s.call(t, a[o], o, a), (c = f[p]) ? (r[o] = c, c.__data__ = a[o], f[p] = null) : n[o] = new Fn(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f[d[o]] === c && (i[o] = c);
}
function Kh(t, e) {
  if (!t)
    return p = new Array(this.size()), f = -1, this.each(function(N) {
      p[++f] = N;
    }), p;
  var n = e ? Xh : Wh, r = this._parents, i = this._groups;
  typeof t != "function" && (t = qh(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = r[f], g = i[f], d = g.length, p = t.call(h, h && h.__data__, f, r), v = p.length, F = o[f] = new Array(v), I = s[f] = new Array(v), S = c[f] = new Array(d);
    n(h, g, F, I, S, p, e);
    for (var T = 0, k = 0, x, A; T < v; ++T)
      if (x = F[T]) {
        for (T >= k && (k = T + 1); !(A = I[k]) && ++k < v; ) ;
        x._next = A || null;
      }
  }
  return s = new Zt(s, r), s._enter = o, s._exit = c, s;
}
function Yh() {
  return new Zt(this._exit || this._groups.map(Ss), this._parents);
}
function Jh(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return r = typeof t == "function" ? t(r) : r.append(t + ""), e != null && (i = e(i)), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function Qh(t) {
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], h = c.length, g = s[o] = new Array(h), d, p = 0; p < h; ++p)
      (d = c[p] || f[p]) && (g[p] = d);
  for (; o < r; ++o)
    s[o] = e[o];
  return new Zt(s, this._parents);
}
function jh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function tu(t) {
  t || (t = eu);
  function e(g, d) {
    return g && d ? t(g.__data__, d.__data__) : !g - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
    c.sort(e);
  }
  return new Zt(i, this._parents).order();
}
function eu(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nu() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ru() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function iu() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
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
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
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
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? cu : lu : typeof e == "function" ? n.local ? du : uu : n.local ? hu : fu)(n, e));
}
function Ns(t) {
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
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function vu(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _u : typeof e == "function" ? mu : gu)(t, e, n ?? "")) : wu(this.node(), t);
}
function wu(t, e) {
  return t.style.getPropertyValue(e) || Ns(t).getComputedStyle(t, null).getPropertyValue(e);
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
function $s(t) {
  return t.trim().split(/^|\s+/);
}
function jr(t) {
  return t.classList || new Ds(t);
}
function Ds(t) {
  this._node = t, this._names = $s(t.getAttribute("class") || "");
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
  for (var n = jr(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Rs(t, e) {
  for (var n = jr(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
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
function Au(t, e) {
  return function() {
    (e.apply(this, arguments) ? Is : Rs)(this, t);
  };
}
function Su(t, e) {
  var n = $s(t + "");
  if (arguments.length < 2) {
    for (var r = jr(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Au : e ? Tu : Eu)(n, e));
}
function Nu() {
  this.textContent = "";
}
function $u(t) {
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
  return arguments.length ? this.each(t == null ? Nu : (typeof t == "function" ? Du : $u)(t)) : this.node().textContent;
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
function Fu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Cu() {
  return this.each(Fu);
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
function Vu() {
  return null;
}
function Pu(t, e) {
  var n = typeof t == "function" ? t : Es(t), r = e == null ? Vu : typeof e == "function" ? e : As(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Uu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gu() {
  return this.each(Uu);
}
function Zu() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function qu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wu(t) {
  return this.select(t ? qu : Zu);
}
function Xu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ms = {};
if (typeof document < "u") {
  var Ku = document.documentElement;
  "onmouseenter" in Ku || (Ms = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Yu(t, e, n) {
  return t = Ls(t, e, n), function(r) {
    var i = r.relatedTarget;
    (!i || i !== this && !(i.compareDocumentPosition(this) & 8)) && t.call(this, r);
  };
}
function Ls(t, e, n) {
  return function(r) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function Ju(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Qu(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ju(t, e, n) {
  var r = Ms.hasOwnProperty(t.type) ? Yu : Ls;
  return function(i, a, s) {
    var o = this.__on, c, f = r(e, a, s);
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
  var r = Ju(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (i = 0, h = o[c]; i < a; ++i)
          if ((s = r[i]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? ju : Qu, n == null && (n = !1), i = 0; i < a; ++i) this.each(o(r[i], e, n));
  return this;
}
function Os(t, e, n) {
  var r = Ns(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
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
function rd(t, e) {
  return this.each((typeof e == "function" ? nd : ed)(t, e));
}
var Fs = [null];
function Zt(t, e) {
  this._groups = t, this._parents = e;
}
function Lr() {
  return new Zt([[document.documentElement]], Fs);
}
Zt.prototype = Lr.prototype = {
  constructor: Zt,
  select: Bh,
  selectAll: Ph,
  filter: Gh,
  data: Kh,
  enter: Zh,
  exit: Yh,
  join: Jh,
  merge: Qh,
  order: jh,
  sort: tu,
  call: nu,
  nodes: ru,
  node: iu,
  size: au,
  empty: su,
  each: ou,
  attr: pu,
  style: vu,
  property: ku,
  classed: Su,
  text: Iu,
  html: Ou,
  raise: Cu,
  lower: Bu,
  append: Hu,
  insert: Pu,
  remove: Gu,
  clone: Wu,
  datum: Xu,
  on: td,
  dispatch: rd
};
function Oi(t) {
  return typeof t == "string" ? new Zt([[document.querySelector(t)]], [document.documentElement]) : new Zt([[t]], Fs);
}
function id() {
  var t = f, e = h, n = g, r = document.body, i = N(), a = null, s = null, o = null;
  function c(b) {
    a = E(b), a && (s = a.createSVGPoint(), r.appendChild(i));
  }
  c.show = function() {
    var b = Array.prototype.slice.call(arguments);
    b[b.length - 1] instanceof SVGElement && (o = b.pop());
    var G = n.apply(this, b), P = e.apply(this, b), Y = t.apply(this, b), nt = B(), ft = p.length, W, j = document.documentElement.scrollTop || r.scrollTop, U = document.documentElement.scrollLeft || r.scrollLeft;
    for (nt.html(G).style("opacity", 1).style("pointer-events", "all"); ft--; ) nt.classed(p[ft], !1);
    return W = d.get(Y).apply(this), nt.classed(Y, !0).style("top", W.top + P[0] + j + "px").style("left", W.left + P[1] + U + "px"), c;
  }, c.hide = function() {
    var b = B();
    return b.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(b, G) {
    if (arguments.length < 2 && typeof b == "string")
      return B().attr(b);
    var P = Array.prototype.slice.call(arguments);
    return Lr.prototype.attr.apply(B(), P), c;
  }, c.style = function(b, G) {
    if (arguments.length < 2 && typeof b == "string")
      return B().style(b);
    var P = Array.prototype.slice.call(arguments);
    return Lr.prototype.style.apply(B(), P), c;
  }, c.direction = function(b) {
    return arguments.length ? (t = b == null ? b : O(b), c) : t;
  }, c.offset = function(b) {
    return arguments.length ? (e = b == null ? b : O(b), c) : e;
  }, c.html = function(b) {
    return arguments.length ? (n = b == null ? b : O(b), c) : n;
  }, c.rootElement = function(b) {
    return arguments.length ? (r = b == null ? b : O(b), c) : r;
  }, c.destroy = function() {
    return i && (B().remove(), i = null), c;
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
  var d = Qr({
    n: v,
    s: F,
    e: I,
    w: S,
    nw: T,
    ne: k,
    sw: x,
    se: A
  }), p = d.keys();
  function v() {
    var b = C(this);
    return {
      top: b.n.y - i.offsetHeight,
      left: b.n.x - i.offsetWidth / 2
    };
  }
  function F() {
    var b = C(this);
    return {
      top: b.s.y,
      left: b.s.x - i.offsetWidth / 2
    };
  }
  function I() {
    var b = C(this);
    return {
      top: b.e.y - i.offsetHeight / 2,
      left: b.e.x
    };
  }
  function S() {
    var b = C(this);
    return {
      top: b.w.y - i.offsetHeight / 2,
      left: b.w.x - i.offsetWidth
    };
  }
  function T() {
    var b = C(this);
    return {
      top: b.nw.y - i.offsetHeight,
      left: b.nw.x - i.offsetWidth
    };
  }
  function k() {
    var b = C(this);
    return {
      top: b.ne.y - i.offsetHeight,
      left: b.ne.x
    };
  }
  function x() {
    var b = C(this);
    return {
      top: b.sw.y,
      left: b.sw.x - i.offsetWidth
    };
  }
  function A() {
    var b = C(this);
    return {
      top: b.se.y,
      left: b.se.x
    };
  }
  function N() {
    var b = Oi(document.createElement("div"));
    return b.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), b.node();
  }
  function E(b) {
    var G = b.node();
    return G ? G.tagName.toLowerCase() === "svg" ? G : G.ownerSVGElement : null;
  }
  function B() {
    return i == null && (i = N(), r.appendChild(i)), Oi(i);
  }
  function C(b) {
    for (var G = o || b; G.getScreenCTM == null && G.parentNode != null; )
      G = G.parentNode;
    var P = {}, Y = G.getScreenCTM(), nt = G.getBBox(), ft = nt.width, W = nt.height, j = nt.x, U = nt.y;
    return s.x = j, s.y = U, P.nw = s.matrixTransform(Y), s.x += ft, P.ne = s.matrixTransform(Y), s.y += W, P.se = s.matrixTransform(Y), s.x -= ft, P.sw = s.matrixTransform(Y), s.y -= W / 2, P.w = s.matrixTransform(Y), s.x += ft, P.e = s.matrixTransform(Y), s.x -= ft / 2, s.y -= W / 2, P.n = s.matrixTransform(Y), s.y += W, P.s = s.matrixTransform(Y), P;
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
    height: r,
    width: i,
    range: a
  }) {
    this.variants = [], this.viewer = n, this.width = i, this.height = r, this.region = e, this.range = a;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = ue().domain([this.region.start, this.region.end + 1]).range(this.range), i = _s().type(ps).size(20), a = id();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (g) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${g.position}</td></tr><tr><td>Mutation</td> <td>${g.ref} > ${g.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", i).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (g) => `translate(${r(g.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const h = St("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
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
    height: r,
    width: i,
    region: a
  }) {
    this.variants = [], this.region = a, this.viewer = e, this.width = i, this.height = r, this.track = n;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = ue().domain([this.region.start, this.region.end]).range(this.track.range), i = _s().type(ps).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", i).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${r(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function ti(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Yn, Fi;
function od() {
  if (Fi) return Yn;
  Fi = 1;
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
  return Yn = t, Yn;
}
var ld = od();
const Un = /* @__PURE__ */ ti(ld);
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
  fill(e, n, r, i) {
    const a = new fd(), s = new hd();
    s.addCallback(i);
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
    o.aborter.addSignal(r), o.aborter.signal.addEventListener("abort", () => {
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
    function r() {
      if (n != null && n.aborted)
        throw Object.assign(new Error("aborted"), { code: "ERR_ABORTED" });
    }
    return e.then((i) => (r(), i), (i) => {
      throw r(), i;
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
  get(e, n, r, i) {
    if (!r && n instanceof AbortSignal)
      throw new TypeError("second get argument appears to be an AbortSignal, perhaps you meant to pass `null` for the fill data?");
    const a = this.cache.get(e);
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, r, i)) : a.settled ? a.promise : (a.aborter.addSignal(r), a.statusReporter.addCallback(i), Te.checkSinglePromise(a.promise, r)) : (this.fill(e, n, r, i), Te.checkSinglePromise(
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
var Tn = { exports: {} }, ud = Tn.exports, Ci;
function dd() {
  return Ci || (Ci = 1, function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(ud, function() {
      const n = /^[\w+.-]+:\/\//, r = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, i = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
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
        const k = r.exec(T);
        return d(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function g(T) {
        const k = i.exec(T), x = k[2];
        return d("file:", "", k[1] || "", "", o(x) ? x : "/" + x, k[3] || "", k[4] || "");
      }
      function d(T, k, x, A, N, E, B) {
        return {
          scheme: T,
          user: k,
          host: x,
          port: A,
          path: N,
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
      function F(T, k) {
        I(k, k.type), T.path === "/" ? T.path = k.path : T.path = v(k.path) + T.path;
      }
      function I(T, k) {
        const x = k <= 4, A = T.path.split("/");
        let N = 1, E = 0, B = !1;
        for (let O = 1; O < A.length; O++) {
          const b = A[O];
          if (!b) {
            B = !0;
            continue;
          }
          if (B = !1, b !== ".") {
            if (b === "..") {
              E ? (B = !0, E--, N--) : x && (A[N++] = b);
              continue;
            }
            A[N++] = b, E++;
          }
        }
        let C = "";
        for (let O = 1; O < N; O++)
          C += "/" + A[O];
        (!C || B && !C.endsWith("/..")) && (C += "/"), T.path = C;
      }
      function S(T, k) {
        if (!T && !k)
          return "";
        const x = p(T);
        let A = x.type;
        if (k && A !== 7) {
          const E = p(k), B = E.type;
          switch (A) {
            case 1:
              x.hash = E.hash;
            // fall through
            case 2:
              x.query = E.query;
            // fall through
            case 3:
            case 4:
              F(x, E);
            // fall through
            case 5:
              x.user = E.user, x.host = E.host, x.port = E.port;
            // fall through
            case 6:
              x.scheme = E.scheme;
          }
          B > A && (A = B);
        }
        I(x, A);
        const N = x.query + x.hash;
        switch (A) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return N;
          case 4: {
            const E = x.path.slice(1);
            return E ? f(k || T) && !f(E) ? "./" + E + N : E + N : N || ".";
          }
          case 5:
            return x.path + N;
          default:
            return x.scheme + "//" + x.user + x.host + x.port + x.path + N;
        }
      }
      return S;
    });
  }(Tn)), Tn.exports;
}
var pd = dd();
const _d = /* @__PURE__ */ ti(pd);
async function ei(t, e, n = {}) {
  const { defaultContent: r = {} } = n;
  try {
    const i = await e(t, { encoding: "utf8" }), a = new TextDecoder("utf8");
    return JSON.parse(a.decode(i));
  } catch (i) {
    if (i.code === "ENOENT" || i.status === 404 || i.message.includes("404") || i.message.includes("ENOENT"))
      return r;
    throw i;
  }
}
function ni(t, e = ".") {
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
  importExisting(e, n, r, i, a) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = a, this.baseURL = r, this.lazyUrlTemplate = i;
  }
  binarySearch(e, n, r) {
    let i = -1, a = e.length, s;
    for (; a - i > 1; )
      s = i + a >>> 1, r(e[s]) >= n ? a = s : i = s;
    return r === this.end ? a : i;
  }
  readChunkItems(e) {
    const n = ni(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return ei(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, r, i, a, s, o) {
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), h = [];
    for (let g = this.binarySearch(e, n, a); g < e.length && g >= 0 && i * s(e[g]) < i * r; g += i) {
      if (e[g][0] === this.lazyClass) {
        const p = c(e[g]), v = this.chunkCache.get(p, p).then((F) => [F, p]);
        h.push(v);
      } else
        yield [e[g], o.concat(g)];
      const d = f(e[g]);
      d && (yield* this.iterateSublist(d, n, r, i, a, s, o.concat(g)));
    }
    for (const g of h) {
      const [d, p] = await g;
      d && (yield* this.iterateSublist(d, n, r, i, a, s, [
        ...o,
        p
      ]));
    }
  }
  async *iterate(e, n) {
    const r = e > n ? -1 : 1, i = e > n ? this.start : this.end, a = e > n ? this.end : this.start;
    this.topList.length > 0 && (yield* this.iterateSublist(this.topList, e, n, r, i, a, [0]));
  }
  async histogram(e, n, r) {
    const i = new Array(r);
    i.fill(0);
    const a = (n - e) / r;
    for await (const s of this.iterate(e, n)) {
      const o = Math.max(0, (this.start(s) - e) / a | 0), c = Math.min(r, (this.end(s) - e) / a | 0);
      for (let f = o; f <= c; f += 1)
        i[f] += 1;
    }
    return i;
  }
}
class md {
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
    const i = this.classes[e[0]].attributes.length + 1;
    return i >= e.length || !(n in e[i]) ? n in this.classes[e[0]].proto ? this.classes[e[0]].proto[n] : void 0 : e[i][n];
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
    return function(i) {
      if (n[i[0]] !== void 0)
        return i[n[i[0]]];
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
      get(i) {
        const a = this.get.field_accessors[i.toLowerCase()];
        if (a)
          return a.call(this);
      },
      set(i, a) {
        const s = this.set.field_accessors[i];
        if (s)
          return s.call(this, a);
      },
      tags() {
        return r[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((i, a) => {
      (i.attributes || []).forEach((s, o) => {
        e[s] = e[s] || [], e[s][a] = o + 1, s = s.toLowerCase(), e[s] = e[s] || [], e[s][a] = o + 1;
      });
    });
    const r = this.classes.map((i) => i.attributes);
    return Object.keys(e).forEach((i) => {
      const a = e[i];
      n.get.field_accessors[i] = a ? function() {
        return this[a[this[0]]];
      } : function() {
      };
    }), n;
  }
}
class vd {
  constructor({ urlTemplate: e, chunkSize: n, length: r, cacheSize: i = 100, readFile: a }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = r, this.baseUrl = s === void 0 ? "" : s, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new Te({
      cache: new Un({ maxSize: i }),
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
    const r = Math.floor(e / this.chunkSize), i = Math.floor(n / this.chunkSize), a = [];
    for (let s = r; s <= i; s += 1)
      a.push(this.chunkCache.get(s, s));
    for (const s of a) {
      const [o, c] = await s;
      yield* this.filterChunkData(e, n, o, c);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = ni(n, this.baseUrl));
    const r = await ei(n, this.readFile);
    return [e, r];
  }
  *filterChunkData(e, n, r, i) {
    const a = r * this.chunkSize, s = Math.max(0, e - a), o = Math.min(n - a, this.chunkSize - 1);
    for (let c = s; c <= o; c += 1)
      yield [c + a, i[c]];
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
  constructor({ baseUrl: e, urlTemplate: n, readFile: r, cacheSize: i = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = r, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new Te({
      cache: new Un({ maxSize: i }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new gd({ readFile: this.readFile });
  }
  loadNCList(e, n, r) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, r, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = ni(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return ei(n, this.readFile).then((r) => (
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
    e.intervals && (r.attrs = new md(e.intervals.classes), this.loadNCList(r, e, n));
    const { histograms: i } = e;
    if (i != null && i.meta) {
      for (let a = 0; a < i.meta.length; a += 1)
        i.meta[a].lazyArray = new vd({ ...i.meta[a].arrayParams, readFile: this.readFile }, n);
      r._histograms = i;
    }
    return r._histograms && Object.keys(r._histograms).forEach((a) => {
      r._histograms[a].forEach((o) => {
        Object.keys(o).forEach((c) => {
          typeof o[c] == "string" && String(Number(o[c])) === o[c] && (o[c] = Number(o[c]));
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
  async getRegionFeatureDensities({ refName: e, start: n, end: r, numBins: i, basesPerBin: a }) {
    const s = await this.getDataRoot(e);
    if (i)
      a = (r - n) / i;
    else if (a)
      i = Math.ceil((r - n) / a);
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
      for (let v = 0; v < i; v += 1)
        p[v] = 0;
      for await (const [v, F] of f.lazyArray.range(d, d + h * i - 1))
        p[Math.floor((v - d) / h)] += F;
      return { bins: p, stats: c };
    }
    return { bins: await s.nclist.histogram(n, r, i), stats: c };
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
    var s;
    const i = await this.getDataRoot(e), a = (s = i.attrs) == null ? void 0 : s.accessors();
    for await (const [o, c] of i.nclist.iterate(n, r)) {
      if (!o.decorated) {
        const f = c.join(",");
        this.decorateFeature(a, o, `${e},${f}`);
      }
      yield o;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, r, i) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = r, n.id = wd, n._parent = i, n.parent = yd, n.children = bd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${r}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const kd = 3, Td = 258, Cs = 29, Ed = 256, Ad = Ed + 1 + Cs, zs = 30, Sd = 512, Nd = new Array((Ad + 2) * 2);
Be(Nd);
const $d = new Array(zs * 2);
Be($d);
const Dd = new Array(Sd);
Be(Dd);
const Id = new Array(Td - kd + 1);
Be(Id);
const Rd = new Array(Cs);
Be(Rd);
const Md = new Array(zs);
Be(Md);
const Ld = (t, e, n, r) => {
  let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
  for (; n !== 0; ) {
    s = n > 2e3 ? 2e3 : n, n -= s;
    do
      i = i + e[r++] | 0, a = a + i | 0;
    while (--s);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
};
var Or = Ld;
const Od = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var r = 0; r < 8; r++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, Fd = new Uint32Array(Od()), Cd = (t, e, n, r) => {
  const i = Fd, a = r + n;
  t ^= -1;
  for (let s = r; s < a; s++)
    t = t >>> 8 ^ i[(t ^ e[s]) & 255];
  return t ^ -1;
};
var ne = Cd, Fr = {
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
      for (const r in n)
        zd(n, r) && (t[r] = n[r]);
    }
  }
  return t;
}, Hd = (t) => {
  let e = 0;
  for (let r = 0, i = t.length; r < i; r++)
    e += t[r].length;
  const n = new Uint8Array(e);
  for (let r = 0, i = 0, a = t.length; r < a; r++) {
    let s = t[r];
    n.set(s, i), i += s.length;
  }
  return n;
}, Hs = {
  assign: Bd,
  flattenChunks: Hd
};
let Vs = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Vs = !1;
}
const je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
je[254] = je[254] = 1;
var Vd = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, r, i, a, s = t.length, o = 0;
  for (i = 0; i < s; i++)
    n = t.charCodeAt(i), (n & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, i = 0; a < o; i++)
    n = t.charCodeAt(i), (n & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const Pd = (t, e) => {
  if (e < 65534 && t.subarray && Vs)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let r = 0; r < e; r++)
    n += String.fromCharCode(t[r]);
  return n;
};
var Ud = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let r, i;
  const a = new Array(n * 2);
  for (i = 0, r = 0; r < n; ) {
    let s = t[r++];
    if (s < 128) {
      a[i++] = s;
      continue;
    }
    let o = je[s];
    if (o > 4) {
      a[i++] = 65533, r += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < n; )
      s = s << 6 | t[r++] & 63, o--;
    if (o > 1) {
      a[i++] = 65533;
      continue;
    }
    s < 65536 ? a[i++] = s : (s -= 65536, a[i++] = 55296 | s >> 10 & 1023, a[i++] = 56320 | s & 1023);
  }
  return Pd(a, i);
}, Gd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + je[t[n]] > e ? n : e;
}, Cr = {
  string2buf: Vd,
  buf2string: Ud,
  utf8border: Gd
};
function Zd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var qd = Zd;
const un = 16209, Wd = 16191;
var Xd = function(e, n) {
  let r, i, a, s, o, c, f, h, g, d, p, v, F, I, S, T, k, x, A, N, E, B, C, O;
  const b = e.state;
  r = e.next_in, C = e.input, i = r + (e.avail_in - 5), a = e.next_out, O = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = b.dmax, f = b.wsize, h = b.whave, g = b.wnext, d = b.window, p = b.hold, v = b.bits, F = b.lencode, I = b.distcode, S = (1 << b.lenbits) - 1, T = (1 << b.distbits) - 1;
  t:
    do {
      v < 15 && (p += C[r++] << v, v += 8, p += C[r++] << v, v += 8), k = F[p & S];
      e:
        for (; ; ) {
          if (x = k >>> 24, p >>>= x, v -= x, x = k >>> 16 & 255, x === 0)
            O[a++] = k & 65535;
          else if (x & 16) {
            A = k & 65535, x &= 15, x && (v < x && (p += C[r++] << v, v += 8), A += p & (1 << x) - 1, p >>>= x, v -= x), v < 15 && (p += C[r++] << v, v += 8, p += C[r++] << v, v += 8), k = I[p & T];
            n:
              for (; ; ) {
                if (x = k >>> 24, p >>>= x, v -= x, x = k >>> 16 & 255, x & 16) {
                  if (N = k & 65535, x &= 15, v < x && (p += C[r++] << v, v += 8, v < x && (p += C[r++] << v, v += 8)), N += p & (1 << x) - 1, N > c) {
                    e.msg = "invalid distance too far back", b.mode = un;
                    break t;
                  }
                  if (p >>>= x, v -= x, x = a - s, N > x) {
                    if (x = N - x, x > h && b.sane) {
                      e.msg = "invalid distance too far back", b.mode = un;
                      break t;
                    }
                    if (E = 0, B = d, g === 0) {
                      if (E += f - x, x < A) {
                        A -= x;
                        do
                          O[a++] = d[E++];
                        while (--x);
                        E = a - N, B = O;
                      }
                    } else if (g < x) {
                      if (E += f + g - x, x -= g, x < A) {
                        A -= x;
                        do
                          O[a++] = d[E++];
                        while (--x);
                        if (E = 0, g < A) {
                          x = g, A -= x;
                          do
                            O[a++] = d[E++];
                          while (--x);
                          E = a - N, B = O;
                        }
                      }
                    } else if (E += g - x, x < A) {
                      A -= x;
                      do
                        O[a++] = d[E++];
                      while (--x);
                      E = a - N, B = O;
                    }
                    for (; A > 2; )
                      O[a++] = B[E++], O[a++] = B[E++], O[a++] = B[E++], A -= 3;
                    A && (O[a++] = B[E++], A > 1 && (O[a++] = B[E++]));
                  } else {
                    E = a - N;
                    do
                      O[a++] = O[E++], O[a++] = O[E++], O[a++] = O[E++], A -= 3;
                    while (A > 2);
                    A && (O[a++] = O[E++], A > 1 && (O[a++] = O[E++]));
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
            k = F[(k & 65535) + (p & (1 << x) - 1)];
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
    } while (r < i && a < o);
  A = v >> 3, r -= A, v -= A << 3, p &= (1 << v) - 1, e.next_in = r, e.next_out = a, e.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), b.hold = p, b.bits = v;
};
const Ne = 15, zi = 852, Bi = 592, Hi = 0, Jn = 1, Vi = 2, Kd = new Uint16Array([
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
]), jd = (t, e, n, r, i, a, s, o) => {
  const c = o.bits;
  let f = 0, h = 0, g = 0, d = 0, p = 0, v = 0, F = 0, I = 0, S = 0, T = 0, k, x, A, N, E, B = null, C;
  const O = new Uint16Array(Ne + 1), b = new Uint16Array(Ne + 1);
  let G = null, P, Y, nt;
  for (f = 0; f <= Ne; f++)
    O[f] = 0;
  for (h = 0; h < r; h++)
    O[e[n + h]]++;
  for (p = c, d = Ne; d >= 1 && O[d] === 0; d--)
    ;
  if (p > d && (p = d), d === 0)
    return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (g = 1; g < d && O[g] === 0; g++)
    ;
  for (p < g && (p = g), I = 1, f = 1; f <= Ne; f++)
    if (I <<= 1, I -= O[f], I < 0)
      return -1;
  if (I > 0 && (t === Hi || d !== 1))
    return -1;
  for (b[1] = 0, f = 1; f < Ne; f++)
    b[f + 1] = b[f] + O[f];
  for (h = 0; h < r; h++)
    e[n + h] !== 0 && (s[b[e[n + h]]++] = h);
  if (t === Hi ? (B = G = s, C = 20) : t === Jn ? (B = Kd, G = Yd, C = 257) : (B = Jd, G = Qd, C = 0), T = 0, h = 0, f = g, E = a, v = p, F = 0, A = -1, S = 1 << p, N = S - 1, t === Jn && S > zi || t === Vi && S > Bi)
    return 1;
  for (; ; ) {
    P = f - F, s[h] + 1 < C ? (Y = 0, nt = s[h]) : s[h] >= C ? (Y = G[s[h] - C], nt = B[s[h] - C]) : (Y = 96, nt = 0), k = 1 << f - F, x = 1 << v, g = x;
    do
      x -= k, i[E + (T >> F) + x] = P << 24 | Y << 16 | nt | 0;
    while (x !== 0);
    for (k = 1 << f - 1; T & k; )
      k >>= 1;
    if (k !== 0 ? (T &= k - 1, T += k) : T = 0, h++, --O[f] === 0) {
      if (f === d)
        break;
      f = e[n + s[h]];
    }
    if (f > p && (T & N) !== A) {
      for (F === 0 && (F = p), E += g, v = f - F, I = 1 << v; v + F < d && (I -= O[v + F], !(I <= 0)); )
        v++, I <<= 1;
      if (S += 1 << v, t === Jn && S > zi || t === Vi && S > Bi)
        return 1;
      A = T & N, i[A] = p << 24 | v << 16 | E - a | 0;
    }
  }
  return T !== 0 && (i[E + T] = f - F << 24 | 64 << 16 | 0), o.bits = p, 0;
};
var Xe = jd;
const t0 = 0, Ps = 1, Us = 2, {
  Z_FINISH: Pi,
  Z_BLOCK: e0,
  Z_TREES: dn,
  Z_OK: Ee,
  Z_STREAM_END: n0,
  Z_NEED_DICT: r0,
  Z_STREAM_ERROR: Kt,
  Z_DATA_ERROR: Gs,
  Z_MEM_ERROR: Zs,
  Z_BUF_ERROR: i0,
  Z_DEFLATED: Ui
} = Bs, Gn = 16180, Gi = 16181, Zi = 16182, qi = 16183, Wi = 16184, Xi = 16185, Ki = 16186, Yi = 16187, Ji = 16188, Qi = 16189, Cn = 16190, le = 16191, Qn = 16192, ji = 16193, jn = 16194, ta = 16195, ea = 16196, na = 16197, ra = 16198, pn = 16199, _n = 16200, ia = 16201, aa = 16202, sa = 16203, oa = 16204, la = 16205, tr = 16206, ca = 16207, fa = 16208, It = 16209, qs = 16210, Ws = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, ha = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function c0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Se = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Gn || e.mode > Ws ? 1 : 0;
}, Xs = (t) => {
  if (Se(t))
    return Kt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Gn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(a0), e.distcode = e.distdyn = new Int32Array(s0), e.sane = 1, e.back = -1, Ee;
}, Ks = (t) => {
  if (Se(t))
    return Kt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Xs(t);
}, Ys = (t, e) => {
  let n;
  if (Se(t))
    return Kt;
  const r = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Kt : (r.window !== null && r.wbits !== e && (r.window = null), r.wrap = n, r.wbits = e, Ks(t));
}, Js = (t, e) => {
  if (!t)
    return Kt;
  const n = new c0();
  t.state = n, n.strm = t, n.window = null, n.mode = Gn;
  const r = Ys(t, e);
  return r !== Ee && (t.state = null), r;
}, f0 = (t) => Js(t, l0);
let ua = !0, er, nr;
const h0 = (t) => {
  if (ua) {
    er = new Int32Array(512), nr = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (Xe(Ps, t.lens, 0, 288, er, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    Xe(Us, t.lens, 0, 32, nr, 0, t.work, { bits: 5 }), ua = !1;
  }
  t.lencode = er, t.lenbits = 9, t.distcode = nr, t.distbits = 5;
}, Qs = (t, e, n, r) => {
  let i;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), r >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(e.subarray(n - r, n - r + i), a.wnext), r -= i, r ? (a.window.set(e.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}, u0 = (t, e) => {
  let n, r, i, a, s, o, c, f, h, g, d, p, v, F, I = 0, S, T, k, x, A, N, E, B;
  const C = new Uint8Array(4);
  let O, b;
  const G = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Se(t) || !t.output || !t.input && t.avail_in !== 0)
    return Kt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, i = t.output, c = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, f = n.hold, h = n.bits, g = o, d = c, B = Ee;
  t:
    for (; ; )
      switch (n.mode) {
        case Gn:
          if (n.wrap === 0) {
            n.mode = Qn;
            break;
          }
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, C[0] = f & 255, C[1] = f >>> 8 & 255, n.check = ne(n.check, C, 2, 0), f = 0, h = 0, n.mode = Gi;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = It;
            break;
          }
          if ((f & 15) !== Ui) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (f >>>= 4, h -= 4, E = (f & 15) + 8, n.wbits === 0 && (n.wbits = E), E > 15 || E > n.wbits) {
            t.msg = "invalid window size", n.mode = It;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Qi : le, f = 0, h = 0;
          break;
        case Gi:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ui) {
            t.msg = "unknown compression method", n.mode = It;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = It;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (C[0] = f & 255, C[1] = f >>> 8 & 255, n.check = ne(n.check, C, 2, 0)), f = 0, h = 0, n.mode = Zi;
        /* falls through */
        case Zi:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (C[0] = f & 255, C[1] = f >>> 8 & 255, C[2] = f >>> 16 & 255, C[3] = f >>> 24 & 255, n.check = ne(n.check, C, 4, 0)), f = 0, h = 0, n.mode = qi;
        /* falls through */
        case qi:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (C[0] = f & 255, C[1] = f >>> 8 & 255, n.check = ne(n.check, C, 2, 0)), f = 0, h = 0, n.mode = Wi;
        /* falls through */
        case Wi:
          if (n.flags & 1024) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (C[0] = f & 255, C[1] = f >>> 8 & 255, n.check = ne(n.check, C, 2, 0)), f = 0, h = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Xi;
        /* falls through */
        case Xi:
          if (n.flags & 1024 && (p = n.length, p > o && (p = o), p && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            r.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + p
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, r, p, a)), o -= p, a += p, n.length -= p), n.length))
            break t;
          n.length = 0, n.mode = Ki;
        /* falls through */
        case Ki:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && p < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, r, p, a)), o -= p, a += p, E)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Yi;
        /* falls through */
        case Yi:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.comment += String.fromCharCode(E));
            while (E && p < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, r, p, a)), o -= p, a += p, E)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Ji;
        /* falls through */
        case Ji:
          if (n.flags & 512) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = It;
              break;
            }
            f = 0, h = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qi:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          t.adler = n.check = ha(f), f = 0, h = 0, n.mode = Cn;
        /* falls through */
        case Cn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, r0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Qn:
          if (n.last) {
            f >>>= h & 7, h -= h & 7, n.mode = tr;
            break;
          }
          for (; h < 3; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          switch (n.last = f & 1, f >>>= 1, h -= 1, f & 3) {
            case 0:
              n.mode = ji;
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
        case ji:
          for (f >>>= h & 7, h -= h & 7; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
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
            i.set(r.subarray(a, a + p), s), o -= p, a += p, c -= p, s += p, n.length -= p;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; h < 14; ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
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
              o--, f += r[a++] << h, h += 8;
            }
            n.lens[G[n.have++]] = f & 7, f >>>= 3, h -= 3;
          }
          for (; n.have < 19; )
            n.lens[G[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, O = { bits: n.lenbits }, B = Xe(t0, n.lens, 0, 19, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
            t.msg = "invalid code lengths set", n.mode = It;
            break;
          }
          n.have = 0, n.mode = ra;
        /* falls through */
        case ra:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; I = n.lencode[f & (1 << n.lenbits) - 1], S = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(S <= h); ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            if (k < 16)
              f >>>= S, h -= S, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (b = S + 2; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += r[a++] << h, h += 8;
                }
                if (f >>>= S, h -= S, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = It;
                  break;
                }
                E = n.lens[n.have - 1], p = 3 + (f & 3), f >>>= 2, h -= 2;
              } else if (k === 17) {
                for (b = S + 3; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += r[a++] << h, h += 8;
                }
                f >>>= S, h -= S, E = 0, p = 3 + (f & 7), f >>>= 3, h -= 3;
              } else {
                for (b = S + 7; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += r[a++] << h, h += 8;
                }
                f >>>= S, h -= S, E = 0, p = 11 + (f & 127), f >>>= 7, h -= 7;
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
          if (n.lenbits = 9, O = { bits: n.lenbits }, B = Xe(Ps, n.lens, 0, n.nlen, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
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
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, Xd(t, d), s = t.next_out, i = t.output, c = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, f = n.hold, h = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; I = n.lencode[f & (1 << n.lenbits) - 1], S = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(S <= h); ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          if (T && (T & 240) === 0) {
            for (x = S, A = T, N = k; I = n.lencode[N + ((f & (1 << x + A) - 1) >> x)], S = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(x + S <= h); ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= S, h -= S, n.back += S, n.length = k, T === 0) {
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
          n.extra = T & 15, n.mode = ia;
        /* falls through */
        case ia:
          if (n.extra) {
            for (b = n.extra; h < b; ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, h -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; I = n.distcode[f & (1 << n.distbits) - 1], S = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(S <= h); ) {
            if (o === 0)
              break t;
            o--, f += r[a++] << h, h += 8;
          }
          if ((T & 240) === 0) {
            for (x = S, A = T, N = k; I = n.distcode[N + ((f & (1 << x + A) - 1) >> x)], S = I >>> 24, T = I >>> 16 & 255, k = I & 65535, !(x + S <= h); ) {
              if (o === 0)
                break t;
              o--, f += r[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= S, h -= S, n.back += S, T & 64) {
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
              o--, f += r[a++] << h, h += 8;
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
            p > n.wnext ? (p -= n.wnext, v = n.wsize - p) : v = n.wnext - p, p > n.length && (p = n.length), F = n.window;
          } else
            F = i, v = s - n.offset, p = n.length;
          p > c && (p = c), c -= p, n.length -= p;
          do
            i[s++] = F[v++];
          while (--p);
          n.length === 0 && (n.mode = _n);
          break;
        case la:
          if (c === 0)
            break t;
          i[s++] = n.length, c--, n.mode = _n;
          break;
        case tr:
          if (n.wrap) {
            for (; h < 32; ) {
              if (o === 0)
                break t;
              o--, f |= r[a++] << h, h += 8;
            }
            if (d -= c, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ne(n.check, i, d, s - d) : Or(n.check, i, d, s - d)), d = c, n.wrap & 4 && (n.flags ? f : ha(f)) !== n.check) {
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
              o--, f += r[a++] << h, h += 8;
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
          B = Gs;
          break t;
        case qs:
          return Zs;
        case Ws:
        /* falls through */
        default:
          return Kt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, (n.wsize || d !== t.avail_out && n.mode < It && (n.mode < tr || e !== Pi)) && Qs(t, t.output, t.next_out, d - t.avail_out), g -= t.avail_in, d -= t.avail_out, t.total_in += g, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ne(n.check, i, d, t.next_out - d) : Or(n.check, i, d, t.next_out - d)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (g === 0 && d === 0 || e === Pi) && B === Ee && (B = i0), B;
}, d0 = (t) => {
  if (Se(t))
    return Kt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ee;
}, p0 = (t, e) => {
  if (Se(t))
    return Kt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Kt : (n.head = e, e.done = !1, Ee);
}, _0 = (t, e) => {
  const n = e.length;
  let r, i, a;
  return Se(t) || (r = t.state, r.wrap !== 0 && r.mode !== Cn) ? Kt : r.mode === Cn && (i = 1, i = Or(i, e, n, 0), i !== r.check) ? Gs : (a = Qs(t, e, n, n), a ? (r.mode = qs, Zs) : (r.havedict = 1, Ee));
};
var g0 = Ks, m0 = Ys, v0 = Xs, w0 = f0, y0 = Js, b0 = u0, x0 = d0, k0 = p0, T0 = _0, E0 = "pako inflate (from Nodeca project)", ce = {
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
function A0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var S0 = A0;
const js = Object.prototype.toString, {
  Z_NO_FLUSH: N0,
  Z_FINISH: $0,
  Z_OK: tn,
  Z_STREAM_END: rr,
  Z_NEED_DICT: ir,
  Z_STREAM_ERROR: D0,
  Z_DATA_ERROR: da,
  Z_MEM_ERROR: I0
} = Bs;
function Zn(t) {
  this.options = Hs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new qd(), this.strm.avail_out = 0;
  let n = ce.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== tn)
    throw new Error(Fr[n]);
  if (this.header = new S0(), ce.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Cr.string2buf(e.dictionary) : js.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = ce.inflateSetDictionary(this.strm, e.dictionary), n !== tn)))
    throw new Error(Fr[n]);
}
Zn.prototype.push = function(t, e) {
  const n = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? $0 : N0, js.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), a = ce.inflate(n, s), a === ir && i && (a = ce.inflateSetDictionary(n, i), a === tn ? a = ce.inflate(n, s) : a === da && (a = ir)); n.avail_in > 0 && a === rr && n.state.wrap > 0 && t[n.next_in] !== 0; )
      ce.inflateReset(n), a = ce.inflate(n, s);
    switch (a) {
      case D0:
      case da:
      case ir:
      case I0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === rr))
      if (this.options.to === "string") {
        let c = Cr.utf8border(n.output, n.next_out), f = n.next_out - c, h = Cr.buf2string(n.output, c);
        n.next_out = f, n.avail_out = r - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(h);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === tn && o === 0)) {
      if (a === rr)
        return a = ce.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
Zn.prototype.onData = function(t) {
  this.chunks.push(t);
};
Zn.prototype.onEnd = function(t) {
  t === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Hs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function R0(t, e) {
  const n = new Zn(e);
  if (n.push(t), n.err) throw n.msg || Fr[n.err];
  return n.result;
}
var M0 = R0, L0 = {
  inflate: M0
};
const { inflate: O0 } = L0;
var F0 = O0;
const C0 = { refName: "seq_id" }, z0 = { seq_id: "refName" };
class zn {
  constructor(e, n, r) {
    this.ncFeature = e, this.uniqueId = r || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (C0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return z0[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((r) => new zn(r, this)) : n;
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
      const r = this.jb1TagToJb2Tag(n), i = this.ncFeature.get(n);
      r === "subfeatures" ? e.children = (i || []).map(
        (a) => new zn(a, this).toJSON()
      ) : e[r] = i;
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
  return B0(new Uint8Array(n)) ? F0(n) : n;
}
async function Tp({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const r = new xd({
    urlTemplate: t,
    baseUrl: e,
    readFile: H0
  }), i = [];
  for await (const a of r.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    i.push(new zn(a).toJSON());
  return i;
}
async function Ep({
  region: t,
  baseUrl: e,
  genome: n,
  track: r,
  extra: i = ".json?ignoreCache=true&flatten=false"
}) {
  const a = `${t.chromosome}:${t.start}..${t.end}`, s = `${e}/${encodeURI(n)}/${encodeURI(r)}/${encodeURIComponent(a)}${i}`, o = await fetch(s);
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
    const r = n.fetch || globalThis.fetch.bind(globalThis);
    n.overrides && (this.baseOverrides = n.overrides), this.fetchImplementation = r;
  }
  async fetch(e, n) {
    let r;
    try {
      r = await this.fetchImplementation(e, n);
    } catch (i) {
      if (`${i}`.includes("Failed to fetch")) {
        console.warn(`generic-filehandle: refetching ${e} to attempt to work around chrome CORS header caching bug`);
        try {
          r = await this.fetchImplementation(e, {
            ...n,
            cache: "reload"
          });
        } catch (a) {
          throw new Error(`${pa(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${pa(i)} fetching ${e}`, { cause: i });
    }
    return r;
  }
  async read(e, n, r = {}) {
    const { headers: i = {}, signal: a, overrides: s = {} } = r;
    e < 1 / 0 ? i.range = `bytes=${n}-${n + e}` : e === 1 / 0 && n !== 0 && (i.range = `bytes=${n}-`);
    const o = await this.fetch(this.url, {
      ...this.baseOverrides,
      ...s,
      headers: {
        ...i,
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
    let n, r;
    typeof e == "string" ? (n = e, r = {}) : (n = e.encoding, r = e, delete r.encoding);
    const { headers: i = {}, signal: a, overrides: s = {} } = r, o = await this.fetch(this.url, {
      headers: i,
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
var ar = {}, _a;
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
    var r = {
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
    }, i = {
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
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, r)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, i));
    }, t.setTyped(e);
  }(ar)), ar;
}
var $e = {}, Yt = {}, _e = {}, ga;
function V0() {
  if (ga) return _e;
  ga = 1;
  var t = de(), e = 4, n = 0, r = 1, i = 2;
  function a(m) {
    for (var z = m.length; --z >= 0; )
      m[z] = 0;
  }
  var s = 0, o = 1, c = 2, f = 3, h = 258, g = 29, d = 256, p = d + 1 + g, v = 30, F = 19, I = 2 * p + 1, S = 15, T = 16, k = 7, x = 256, A = 16, N = 17, E = 18, B = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), C = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), O = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), b = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = 512, P = new Array((p + 2) * 2);
  a(P);
  var Y = new Array(v * 2);
  a(Y);
  var nt = new Array(G);
  a(nt);
  var ft = new Array(h - f + 1);
  a(ft);
  var W = new Array(g);
  a(W);
  var j = new Array(v);
  a(j);
  function U(m, z, L, q, w) {
    this.static_tree = m, this.extra_bits = z, this.extra_base = L, this.elems = q, this.max_length = w, this.has_stree = m && m.length;
  }
  var it, Rt, J;
  function gt(m, z) {
    this.dyn_tree = m, this.max_code = 0, this.stat_desc = z;
  }
  function At(m) {
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
  function $t(m, z) {
    var L = z.dyn_tree, q = z.max_code, w = z.stat_desc.static_tree, R = z.stat_desc.has_stree, u = z.stat_desc.extra_bits, V = z.stat_desc.extra_base, rt = z.stat_desc.max_length, l, $, M, _, y, D, et = 0;
    for (_ = 0; _ <= S; _++)
      m.bl_count[_] = 0;
    for (L[m.heap[m.heap_max] * 2 + 1] = 0, l = m.heap_max + 1; l < I; l++)
      $ = m.heap[l], _ = L[L[$ * 2 + 1] * 2 + 1] + 1, _ > rt && (_ = rt, et++), L[$ * 2 + 1] = _, !($ > q) && (m.bl_count[_]++, y = 0, $ >= V && (y = u[$ - V]), D = L[$ * 2], m.opt_len += D * (_ + y), R && (m.static_len += D * (w[$ * 2 + 1] + y)));
    if (et !== 0) {
      do {
        for (_ = rt - 1; m.bl_count[_] === 0; )
          _--;
        m.bl_count[_]--, m.bl_count[_ + 1] += 2, m.bl_count[rt]--, et -= 2;
      } while (et > 0);
      for (_ = rt; _ !== 0; _--)
        for ($ = m.bl_count[_]; $ !== 0; )
          M = m.heap[--l], !(M > q) && (L[M * 2 + 1] !== _ && (m.opt_len += (_ - L[M * 2 + 1]) * L[M * 2], L[M * 2 + 1] = _), $--);
    }
  }
  function Nt(m, z, L) {
    var q = new Array(S + 1), w = 0, R, u;
    for (R = 1; R <= S; R++)
      q[R] = w = w + L[R - 1] << 1;
    for (u = 0; u <= z; u++) {
      var V = m[u * 2 + 1];
      V !== 0 && (m[u * 2] = ht(q[V]++, V));
    }
  }
  function ot() {
    var m, z, L, q, w, R = new Array(S + 1);
    for (L = 0, q = 0; q < g - 1; q++)
      for (W[q] = L, m = 0; m < 1 << B[q]; m++)
        ft[L++] = q;
    for (ft[L - 1] = q, w = 0, q = 0; q < 16; q++)
      for (j[q] = w, m = 0; m < 1 << C[q]; m++)
        nt[w++] = q;
    for (w >>= 7; q < v; q++)
      for (j[q] = w << 7, m = 0; m < 1 << C[q] - 7; m++)
        nt[256 + w++] = q;
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
    for (Nt(P, p + 1, R), m = 0; m < v; m++)
      Y[m * 2 + 1] = 5, Y[m * 2] = ht(m, 5);
    it = new U(P, B, d + 1, p, S), Rt = new U(Y, C, 0, v, S), J = new U(new Array(0), O, 0, F, k);
  }
  function at(m) {
    var z;
    for (z = 0; z < p; z++)
      m.dyn_ltree[z * 2] = 0;
    for (z = 0; z < v; z++)
      m.dyn_dtree[z * 2] = 0;
    for (z = 0; z < F; z++)
      m.bl_tree[z * 2] = 0;
    m.dyn_ltree[x * 2] = 1, m.opt_len = m.static_len = 0, m.last_lit = m.matches = 0;
  }
  function kt(m) {
    m.bi_valid > 8 ? pt(m, m.bi_buf) : m.bi_valid > 0 && (m.pending_buf[m.pending++] = m.bi_buf), m.bi_buf = 0, m.bi_valid = 0;
  }
  function Dt(m, z, L, q) {
    kt(m), pt(m, L), pt(m, ~L), t.arraySet(m.pending_buf, m.window, z, L, m.pending), m.pending += L;
  }
  function st(m, z, L, q) {
    var w = z * 2, R = L * 2;
    return m[w] < m[R] || m[w] === m[R] && q[z] <= q[L];
  }
  function _t(m, z, L) {
    for (var q = m.heap[L], w = L << 1; w <= m.heap_len && (w < m.heap_len && st(z, m.heap[w + 1], m.heap[w], m.depth) && w++, !st(z, q, m.heap[w], m.depth)); )
      m.heap[L] = m.heap[w], L = w, w <<= 1;
    m.heap[L] = q;
  }
  function Z(m, z, L) {
    var q, w, R = 0, u, V;
    if (m.last_lit !== 0)
      do
        q = m.pending_buf[m.d_buf + R * 2] << 8 | m.pending_buf[m.d_buf + R * 2 + 1], w = m.pending_buf[m.l_buf + R], R++, q === 0 ? lt(m, w, z) : (u = ft[w], lt(m, u + d + 1, z), V = B[u], V !== 0 && (w -= W[u], Q(m, w, V)), q--, u = At(q), lt(m, u, L), V = C[u], V !== 0 && (q -= j[u], Q(m, q, V)));
      while (R < m.last_lit);
    lt(m, x, z);
  }
  function xt(m, z) {
    var L = z.dyn_tree, q = z.stat_desc.static_tree, w = z.stat_desc.has_stree, R = z.stat_desc.elems, u, V, rt = -1, l;
    for (m.heap_len = 0, m.heap_max = I, u = 0; u < R; u++)
      L[u * 2] !== 0 ? (m.heap[++m.heap_len] = rt = u, m.depth[u] = 0) : L[u * 2 + 1] = 0;
    for (; m.heap_len < 2; )
      l = m.heap[++m.heap_len] = rt < 2 ? ++rt : 0, L[l * 2] = 1, m.depth[l] = 0, m.opt_len--, w && (m.static_len -= q[l * 2 + 1]);
    for (z.max_code = rt, u = m.heap_len >> 1; u >= 1; u--)
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
      ), V = m.heap[
        1
        /*SMALLEST*/
      ], m.heap[--m.heap_max] = u, m.heap[--m.heap_max] = V, L[l * 2] = L[u * 2] + L[V * 2], m.depth[l] = (m.depth[u] >= m.depth[V] ? m.depth[u] : m.depth[V]) + 1, L[u * 2 + 1] = L[V * 2 + 1] = l, m.heap[
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
    ], $t(m, z), Nt(L, rt, m.bl_count);
  }
  function Tt(m, z, L) {
    var q, w = -1, R, u = z[0 * 2 + 1], V = 0, rt = 7, l = 4;
    for (u === 0 && (rt = 138, l = 3), z[(L + 1) * 2 + 1] = 65535, q = 0; q <= L; q++)
      R = u, u = z[(q + 1) * 2 + 1], !(++V < rt && R === u) && (V < l ? m.bl_tree[R * 2] += V : R !== 0 ? (R !== w && m.bl_tree[R * 2]++, m.bl_tree[A * 2]++) : V <= 10 ? m.bl_tree[N * 2]++ : m.bl_tree[E * 2]++, V = 0, w = R, u === 0 ? (rt = 138, l = 3) : R === u ? (rt = 6, l = 3) : (rt = 7, l = 4));
  }
  function Ct(m, z, L) {
    var q, w = -1, R, u = z[0 * 2 + 1], V = 0, rt = 7, l = 4;
    for (u === 0 && (rt = 138, l = 3), q = 0; q <= L; q++)
      if (R = u, u = z[(q + 1) * 2 + 1], !(++V < rt && R === u)) {
        if (V < l)
          do
            lt(m, R, m.bl_tree);
          while (--V !== 0);
        else R !== 0 ? (R !== w && (lt(m, R, m.bl_tree), V--), lt(m, A, m.bl_tree), Q(m, V - 3, 2)) : V <= 10 ? (lt(m, N, m.bl_tree), Q(m, V - 3, 3)) : (lt(m, E, m.bl_tree), Q(m, V - 11, 7));
        V = 0, w = R, u === 0 ? (rt = 138, l = 3) : R === u ? (rt = 6, l = 3) : (rt = 7, l = 4);
      }
  }
  function tt(m) {
    var z;
    for (Tt(m, m.dyn_ltree, m.l_desc.max_code), Tt(m, m.dyn_dtree, m.d_desc.max_code), xt(m, m.bl_desc), z = F - 1; z >= 3 && m.bl_tree[b[z] * 2 + 1] === 0; z--)
      ;
    return m.opt_len += 3 * (z + 1) + 5 + 5 + 4, z;
  }
  function dt(m, z, L, q) {
    var w;
    for (Q(m, z - 257, 5), Q(m, L - 1, 5), Q(m, q - 4, 4), w = 0; w < q; w++)
      Q(m, m.bl_tree[b[w] * 2 + 1], 3);
    Ct(m, m.dyn_ltree, z - 1), Ct(m, m.dyn_dtree, L - 1);
  }
  function ct(m) {
    var z = 4093624447, L;
    for (L = 0; L <= 31; L++, z >>>= 1)
      if (z & 1 && m.dyn_ltree[L * 2] !== 0)
        return n;
    if (m.dyn_ltree[9 * 2] !== 0 || m.dyn_ltree[10 * 2] !== 0 || m.dyn_ltree[13 * 2] !== 0)
      return r;
    for (L = 32; L < d; L++)
      if (m.dyn_ltree[L * 2] !== 0)
        return r;
    return n;
  }
  var ut = !1;
  function zt(m) {
    ut || (ot(), ut = !0), m.l_desc = new gt(m.dyn_ltree, it), m.d_desc = new gt(m.dyn_dtree, Rt), m.bl_desc = new gt(m.bl_tree, J), m.bi_buf = 0, m.bi_valid = 0, at(m);
  }
  function H(m, z, L, q) {
    Q(m, (s << 1) + (q ? 1 : 0), 3), Dt(m, z, L);
  }
  function yt(m) {
    Q(m, o << 1, 3), lt(m, x, P), Et(m);
  }
  function vt(m, z, L, q) {
    var w, R, u = 0;
    m.level > 0 ? (m.strm.data_type === i && (m.strm.data_type = ct(m)), xt(m, m.l_desc), xt(m, m.d_desc), u = tt(m), w = m.opt_len + 3 + 7 >>> 3, R = m.static_len + 3 + 7 >>> 3, R <= w && (w = R)) : w = R = L + 5, L + 4 <= w && z !== -1 ? H(m, z, L, q) : m.strategy === e || R === w ? (Q(m, (o << 1) + (q ? 1 : 0), 3), Z(m, P, Y)) : (Q(m, (c << 1) + (q ? 1 : 0), 3), dt(m, m.l_desc.max_code + 1, m.d_desc.max_code + 1, u + 1), Z(m, m.dyn_ltree, m.dyn_dtree)), at(m), q && kt(m);
  }
  function mt(m, z, L) {
    return m.pending_buf[m.d_buf + m.last_lit * 2] = z >>> 8 & 255, m.pending_buf[m.d_buf + m.last_lit * 2 + 1] = z & 255, m.pending_buf[m.l_buf + m.last_lit] = L & 255, m.last_lit++, z === 0 ? m.dyn_ltree[L * 2]++ : (m.matches++, z--, m.dyn_ltree[(ft[L] + d + 1) * 2]++, m.dyn_dtree[At(z) * 2]++), m.last_lit === m.lit_bufsize - 1;
  }
  return _e._tr_init = zt, _e._tr_stored_block = H, _e._tr_flush_block = vt, _e._tr_tally = mt, _e._tr_align = yt, _e;
}
var sr, ma;
function to() {
  if (ma) return sr;
  ma = 1;
  function t(e, n, r, i) {
    for (var a = e & 65535 | 0, s = e >>> 16 & 65535 | 0, o = 0; r !== 0; ) {
      o = r > 2e3 ? 2e3 : r, r -= o;
      do
        a = a + n[i++] | 0, s = s + a | 0;
      while (--o);
      a %= 65521, s %= 65521;
    }
    return a | s << 16 | 0;
  }
  return sr = t, sr;
}
var or, va;
function eo() {
  if (va) return or;
  va = 1;
  function t() {
    for (var r, i = [], a = 0; a < 256; a++) {
      r = a;
      for (var s = 0; s < 8; s++)
        r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
      i[a] = r;
    }
    return i;
  }
  var e = t();
  function n(r, i, a, s) {
    var o = e, c = s + a;
    r ^= -1;
    for (var f = s; f < c; f++)
      r = r >>> 8 ^ o[(r ^ i[f]) & 255];
    return r ^ -1;
  }
  return or = n, or;
}
var lr, wa;
function ri() {
  return wa || (wa = 1, lr = {
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
  }), lr;
}
var ya;
function P0() {
  if (ya) return Yt;
  ya = 1;
  var t = de(), e = V0(), n = to(), r = eo(), i = ri(), a = 0, s = 1, o = 3, c = 4, f = 5, h = 0, g = 1, d = -2, p = -3, v = -5, F = -1, I = 1, S = 2, T = 3, k = 4, x = 0, A = 2, N = 8, E = 9, B = 15, C = 8, O = 29, b = 256, G = b + 1 + O, P = 30, Y = 19, nt = 2 * G + 1, ft = 15, W = 3, j = 258, U = j + W + 1, it = 32, Rt = 42, J = 69, gt = 73, At = 91, pt = 103, Q = 113, lt = 666, ht = 1, Et = 2, $t = 3, Nt = 4, ot = 3;
  function at(l, $) {
    return l.msg = i[$], $;
  }
  function kt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function Dt(l) {
    for (var $ = l.length; --$ >= 0; )
      l[$] = 0;
  }
  function st(l) {
    var $ = l.state, M = $.pending;
    M > l.avail_out && (M = l.avail_out), M !== 0 && (t.arraySet(l.output, $.pending_buf, $.pending_out, M, l.next_out), l.next_out += M, $.pending_out += M, l.total_out += M, l.avail_out -= M, $.pending -= M, $.pending === 0 && ($.pending_out = 0));
  }
  function _t(l, $) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, $), l.block_start = l.strstart, st(l.strm);
  }
  function Z(l, $) {
    l.pending_buf[l.pending++] = $;
  }
  function xt(l, $) {
    l.pending_buf[l.pending++] = $ >>> 8 & 255, l.pending_buf[l.pending++] = $ & 255;
  }
  function Tt(l, $, M, _) {
    var y = l.avail_in;
    return y > _ && (y = _), y === 0 ? 0 : (l.avail_in -= y, t.arraySet($, l.input, l.next_in, y, M), l.state.wrap === 1 ? l.adler = n(l.adler, $, y, M) : l.state.wrap === 2 && (l.adler = r(l.adler, $, y, M)), l.next_in += y, l.total_in += y, y);
  }
  function Ct(l, $) {
    var M = l.max_chain_length, _ = l.strstart, y, D, et = l.prev_length, X = l.nice_match, K = l.strstart > l.w_size - U ? l.strstart - (l.w_size - U) : 0, wt = l.window, ae = l.w_mask, Mt = l.prev, bt = l.strstart + j, Bt = wt[_ + et - 1], Vt = wt[_ + et];
    l.prev_length >= l.good_match && (M >>= 2), X > l.lookahead && (X = l.lookahead);
    do
      if (y = $, !(wt[y + et] !== Vt || wt[y + et - 1] !== Bt || wt[y] !== wt[_] || wt[++y] !== wt[_ + 1])) {
        _ += 2, y++;
        do
          ;
        while (wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && wt[++_] === wt[++y] && _ < bt);
        if (D = j - (bt - _), _ = bt - j, D > et) {
          if (l.match_start = $, et = D, D >= X)
            break;
          Bt = wt[_ + et - 1], Vt = wt[_ + et];
        }
      }
    while (($ = Mt[$ & ae]) > K && --M !== 0);
    return et <= l.lookahead ? et : l.lookahead;
  }
  function tt(l) {
    var $ = l.w_size, M, _, y, D, et;
    do {
      if (D = l.window_size - l.lookahead - l.strstart, l.strstart >= $ + ($ - U)) {
        t.arraySet(l.window, l.window, $, $, 0), l.match_start -= $, l.strstart -= $, l.block_start -= $, _ = l.hash_size, M = _;
        do
          y = l.head[--M], l.head[M] = y >= $ ? y - $ : 0;
        while (--_);
        _ = $, M = _;
        do
          y = l.prev[--M], l.prev[M] = y >= $ ? y - $ : 0;
        while (--_);
        D += $;
      }
      if (l.strm.avail_in === 0)
        break;
      if (_ = Tt(l.strm, l.window, l.strstart + l.lookahead, D), l.lookahead += _, l.lookahead + l.insert >= W)
        for (et = l.strstart - l.insert, l.ins_h = l.window[et], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + W - 1]) & l.hash_mask, l.prev[et & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = et, et++, l.insert--, !(l.lookahead + l.insert < W)); )
          ;
    } while (l.lookahead < U && l.strm.avail_in !== 0);
  }
  function dt(l, $) {
    var M = 65535;
    for (M > l.pending_buf_size - 5 && (M = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (tt(l), l.lookahead === 0 && $ === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var _ = l.block_start + M;
      if ((l.strstart === 0 || l.strstart >= _) && (l.lookahead = l.strstart - _, l.strstart = _, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - U && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = 0, $ === c ? (_t(l, !0), l.strm.avail_out === 0 ? $t : Nt) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ht);
  }
  function ct(l, $) {
    for (var M, _; ; ) {
      if (l.lookahead < U) {
        if (tt(l), l.lookahead < U && $ === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), M !== 0 && l.strstart - M <= l.w_size - U && (l.match_length = Ct(l, M)), l.match_length >= W)
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
    return l.insert = l.strstart < W - 1 ? l.strstart : W - 1, $ === c ? (_t(l, !0), l.strm.avail_out === 0 ? $t : Nt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function ut(l, $) {
    for (var M, _, y; ; ) {
      if (l.lookahead < U) {
        if (tt(l), l.lookahead < U && $ === a)
          return ht;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = W - 1, M !== 0 && l.prev_length < l.max_lazy_match && l.strstart - M <= l.w_size - U && (l.match_length = Ct(l, M), l.match_length <= 5 && (l.strategy === I || l.match_length === W && l.strstart - l.match_start > 4096) && (l.match_length = W - 1)), l.prev_length >= W && l.match_length <= l.prev_length) {
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
    return l.match_available && (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < W - 1 ? l.strstart : W - 1, $ === c ? (_t(l, !0), l.strm.avail_out === 0 ? $t : Nt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function zt(l, $) {
    for (var M, _, y, D, et = l.window; ; ) {
      if (l.lookahead <= j) {
        if (tt(l), l.lookahead <= j && $ === a)
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
    return l.insert = 0, $ === c ? (_t(l, !0), l.strm.avail_out === 0 ? $t : Nt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function H(l, $) {
    for (var M; ; ) {
      if (l.lookahead === 0 && (tt(l), l.lookahead === 0)) {
        if ($ === a)
          return ht;
        break;
      }
      if (l.match_length = 0, M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, M && (_t(l, !1), l.strm.avail_out === 0))
        return ht;
    }
    return l.insert = 0, $ === c ? (_t(l, !0), l.strm.avail_out === 0 ? $t : Nt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ht : Et;
  }
  function yt(l, $, M, _, y) {
    this.good_length = l, this.max_lazy = $, this.nice_length = M, this.max_chain = _, this.func = y;
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
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = N, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(nt * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * Y + 1) * 2), Dt(this.dyn_ltree), Dt(this.dyn_dtree), Dt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ft + 1), this.heap = new t.Buf16(2 * G + 1), Dt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * G + 1), Dt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function z(l) {
    var $;
    return !l || !l.state ? at(l, d) : (l.total_in = l.total_out = 0, l.data_type = A, $ = l.state, $.pending = 0, $.pending_out = 0, $.wrap < 0 && ($.wrap = -$.wrap), $.status = $.wrap ? Rt : Q, l.adler = $.wrap === 2 ? 0 : 1, $.last_flush = a, e._tr_init($), h);
  }
  function L(l) {
    var $ = z(l);
    return $ === h && mt(l.state), $;
  }
  function q(l, $) {
    return !l || !l.state || l.state.wrap !== 2 ? d : (l.state.gzhead = $, h);
  }
  function w(l, $, M, _, y, D) {
    if (!l)
      return d;
    var et = 1;
    if ($ === F && ($ = 6), _ < 0 ? (et = 0, _ = -_) : _ > 15 && (et = 2, _ -= 16), y < 1 || y > E || M !== N || _ < 8 || _ > 15 || $ < 0 || $ > 9 || D < 0 || D > k)
      return at(l, d);
    _ === 8 && (_ = 9);
    var X = new m();
    return l.state = X, X.strm = l, X.wrap = et, X.gzhead = null, X.w_bits = _, X.w_size = 1 << X.w_bits, X.w_mask = X.w_size - 1, X.hash_bits = y + 7, X.hash_size = 1 << X.hash_bits, X.hash_mask = X.hash_size - 1, X.hash_shift = ~~((X.hash_bits + W - 1) / W), X.window = new t.Buf8(X.w_size * 2), X.head = new t.Buf16(X.hash_size), X.prev = new t.Buf16(X.w_size), X.lit_bufsize = 1 << y + 6, X.pending_buf_size = X.lit_bufsize * 4, X.pending_buf = new t.Buf8(X.pending_buf_size), X.d_buf = 1 * X.lit_bufsize, X.l_buf = 3 * X.lit_bufsize, X.level = $, X.strategy = D, X.method = M, L(l);
  }
  function R(l, $) {
    return w(l, $, N, B, C, x);
  }
  function u(l, $) {
    var M, _, y, D;
    if (!l || !l.state || $ > f || $ < 0)
      return l ? at(l, d) : d;
    if (_ = l.state, !l.output || !l.input && l.avail_in !== 0 || _.status === lt && $ !== c)
      return at(l, l.avail_out === 0 ? v : d);
    if (_.strm = l, M = _.last_flush, _.last_flush = $, _.status === Rt)
      if (_.wrap === 2)
        l.adler = 0, Z(_, 31), Z(_, 139), Z(_, 8), _.gzhead ? (Z(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), Z(_, _.gzhead.time & 255), Z(_, _.gzhead.time >> 8 & 255), Z(_, _.gzhead.time >> 16 & 255), Z(_, _.gzhead.time >> 24 & 255), Z(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), Z(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (Z(_, _.gzhead.extra.length & 255), Z(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (l.adler = r(l.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = J) : (Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), Z(_, ot), _.status = Q);
      else {
        var et = N + (_.w_bits - 8 << 4) << 8, X = -1;
        _.strategy >= S || _.level < 2 ? X = 0 : _.level < 6 ? X = 1 : _.level === 6 ? X = 2 : X = 3, et |= X << 6, _.strstart !== 0 && (et |= it), et += 31 - et % 31, _.status = Q, xt(_, et), _.strstart !== 0 && (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), l.adler = 1;
      }
    if (_.status === J)
      if (_.gzhead.extra) {
        for (y = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)); )
          Z(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = gt);
      } else
        _.status = gt;
    if (_.status === gt)
      if (_.gzhead.name) {
        y = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)) {
            D = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? D = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : D = 0, Z(_, D);
        } while (D !== 0);
        _.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), D === 0 && (_.gzindex = 0, _.status = At);
      } else
        _.status = At;
    if (_.status === At)
      if (_.gzhead.comment) {
        y = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), st(l), y = _.pending, _.pending === _.pending_buf_size)) {
            D = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? D = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : D = 0, Z(_, D);
        } while (D !== 0);
        _.gzhead.hcrc && _.pending > y && (l.adler = r(l.adler, _.pending_buf, _.pending - y, y)), D === 0 && (_.status = pt);
      } else
        _.status = pt;
    if (_.status === pt && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && st(l), _.pending + 2 <= _.pending_buf_size && (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), l.adler = 0, _.status = Q)) : _.status = Q), _.pending !== 0) {
      if (st(l), l.avail_out === 0)
        return _.last_flush = -1, h;
    } else if (l.avail_in === 0 && kt($) <= kt(M) && $ !== c)
      return at(l, v);
    if (_.status === lt && l.avail_in !== 0)
      return at(l, v);
    if (l.avail_in !== 0 || _.lookahead !== 0 || $ !== a && _.status !== lt) {
      var K = _.strategy === S ? H(_, $) : _.strategy === T ? zt(_, $) : vt[_.level].func(_, $);
      if ((K === $t || K === Nt) && (_.status = lt), K === ht || K === $t)
        return l.avail_out === 0 && (_.last_flush = -1), h;
      if (K === Et && ($ === s ? e._tr_align(_) : $ !== f && (e._tr_stored_block(_, 0, 0, !1), $ === o && (Dt(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), st(l), l.avail_out === 0))
        return _.last_flush = -1, h;
    }
    return $ !== c ? h : _.wrap <= 0 ? g : (_.wrap === 2 ? (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), Z(_, l.adler >> 16 & 255), Z(_, l.adler >> 24 & 255), Z(_, l.total_in & 255), Z(_, l.total_in >> 8 & 255), Z(_, l.total_in >> 16 & 255), Z(_, l.total_in >> 24 & 255)) : (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), st(l), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? h : g);
  }
  function V(l) {
    var $;
    return !l || !l.state ? d : ($ = l.state.status, $ !== Rt && $ !== J && $ !== gt && $ !== At && $ !== pt && $ !== Q && $ !== lt ? at(l, d) : (l.state = null, $ === Q ? at(l, p) : h));
  }
  function rt(l, $) {
    var M = $.length, _, y, D, et, X, K, wt, ae;
    if (!l || !l.state || (_ = l.state, et = _.wrap, et === 2 || et === 1 && _.status !== Rt || _.lookahead))
      return d;
    for (et === 1 && (l.adler = n(l.adler, $, M, 0)), _.wrap = 0, M >= _.w_size && (et === 0 && (Dt(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), ae = new t.Buf8(_.w_size), t.arraySet(ae, $, M - _.w_size, _.w_size, 0), $ = ae, M = _.w_size), X = l.avail_in, K = l.next_in, wt = l.input, l.avail_in = M, l.next_in = 0, l.input = $, tt(_); _.lookahead >= W; ) {
      y = _.strstart, D = _.lookahead - (W - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[y + W - 1]) & _.hash_mask, _.prev[y & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = y, y++;
      while (--D);
      _.strstart = y, _.lookahead = W - 1, tt(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = W - 1, _.match_available = 0, l.next_in = K, l.input = wt, l.avail_in = X, _.wrap = et, h;
  }
  return Yt.deflateInit = R, Yt.deflateInit2 = w, Yt.deflateReset = L, Yt.deflateResetKeep = z, Yt.deflateSetHeader = q, Yt.deflate = u, Yt.deflateEnd = V, Yt.deflateSetDictionary = rt, Yt.deflateInfo = "pako deflate (from Nodeca project)", Yt;
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
  for (var r = new t.Buf8(256), i = 0; i < 256; i++)
    r[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  r[254] = r[254] = 1, ge.string2buf = function(s) {
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
      if (g = r[h], g > 4) {
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
    return c < 0 || c === 0 ? o : c + r[s[c]] > o ? c : o;
  }, ge;
}
var cr, xa;
function ro() {
  if (xa) return cr;
  xa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return cr = t, cr;
}
var ka;
function U0() {
  if (ka) return $e;
  ka = 1;
  var t = P0(), e = de(), n = no(), r = ri(), i = ro(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, h = 2, g = -1, d = 0, p = 8;
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
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
    var x = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (x !== c)
      throw new Error(r[x]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var A;
      if (typeof k.dictionary == "string" ? A = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? A = new Uint8Array(k.dictionary) : A = k.dictionary, x = t.deflateSetDictionary(this.strm, A), x !== c)
        throw new Error(r[x]);
      this._dict_set = !0;
    }
  }
  v.prototype.push = function(T, k) {
    var x = this.strm, A = this.options.chunkSize, N, E;
    if (this.ended)
      return !1;
    E = k === ~~k ? k : k === !0 ? o : s, typeof T == "string" ? x.input = n.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? x.input = new Uint8Array(T) : x.input = T, x.next_in = 0, x.avail_in = x.input.length;
    do {
      if (x.avail_out === 0 && (x.output = new e.Buf8(A), x.next_out = 0, x.avail_out = A), N = t.deflate(x, E), N !== f && N !== c)
        return this.onEnd(N), this.ended = !0, !1;
      (x.avail_out === 0 || x.avail_in === 0 && (E === o || E === h)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(x.output, x.next_out))) : this.onData(e.shrinkBuf(x.output, x.next_out)));
    } while ((x.avail_in > 0 || x.avail_out === 0) && N !== f);
    return E === o ? (N = t.deflateEnd(this.strm), this.onEnd(N), this.ended = !0, N === c) : (E === h && (this.onEnd(c), x.avail_out = 0), !0);
  }, v.prototype.onData = function(T) {
    this.chunks.push(T);
  }, v.prototype.onEnd = function(T) {
    T === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function F(T, k) {
    var x = new v(k);
    if (x.push(T, !0), x.err)
      throw x.msg || r[x.err];
    return x.result;
  }
  function I(T, k) {
    return k = k || {}, k.raw = !0, F(T, k);
  }
  function S(T, k) {
    return k = k || {}, k.gzip = !0, F(T, k);
  }
  return $e.Deflate = v, $e.deflate = F, $e.deflateRaw = I, $e.gzip = S, $e;
}
var De = {}, Wt = {}, fr, Ta;
function G0() {
  if (Ta) return fr;
  Ta = 1;
  var t = 30, e = 12;
  return fr = function(r, i) {
    var a, s, o, c, f, h, g, d, p, v, F, I, S, T, k, x, A, N, E, B, C, O, b, G, P;
    a = r.state, s = r.next_in, G = r.input, o = s + (r.avail_in - 5), c = r.next_out, P = r.output, f = c - (i - r.avail_out), h = c + (r.avail_out - 257), g = a.dmax, d = a.wsize, p = a.whave, v = a.wnext, F = a.window, I = a.hold, S = a.bits, T = a.lencode, k = a.distcode, x = (1 << a.lenbits) - 1, A = (1 << a.distbits) - 1;
    t:
      do {
        S < 15 && (I += G[s++] << S, S += 8, I += G[s++] << S, S += 8), N = T[I & x];
        e:
          for (; ; ) {
            if (E = N >>> 24, I >>>= E, S -= E, E = N >>> 16 & 255, E === 0)
              P[c++] = N & 65535;
            else if (E & 16) {
              B = N & 65535, E &= 15, E && (S < E && (I += G[s++] << S, S += 8), B += I & (1 << E) - 1, I >>>= E, S -= E), S < 15 && (I += G[s++] << S, S += 8, I += G[s++] << S, S += 8), N = k[I & A];
              n:
                for (; ; ) {
                  if (E = N >>> 24, I >>>= E, S -= E, E = N >>> 16 & 255, E & 16) {
                    if (C = N & 65535, E &= 15, S < E && (I += G[s++] << S, S += 8, S < E && (I += G[s++] << S, S += 8)), C += I & (1 << E) - 1, C > g) {
                      r.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (I >>>= E, S -= E, E = c - f, C > E) {
                      if (E = C - E, E > p && a.sane) {
                        r.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (O = 0, b = F, v === 0) {
                        if (O += d - E, E < B) {
                          B -= E;
                          do
                            P[c++] = F[O++];
                          while (--E);
                          O = c - C, b = P;
                        }
                      } else if (v < E) {
                        if (O += d + v - E, E -= v, E < B) {
                          B -= E;
                          do
                            P[c++] = F[O++];
                          while (--E);
                          if (O = 0, v < B) {
                            E = v, B -= E;
                            do
                              P[c++] = F[O++];
                            while (--E);
                            O = c - C, b = P;
                          }
                        }
                      } else if (O += v - E, E < B) {
                        B -= E;
                        do
                          P[c++] = F[O++];
                        while (--E);
                        O = c - C, b = P;
                      }
                      for (; B > 2; )
                        P[c++] = b[O++], P[c++] = b[O++], P[c++] = b[O++], B -= 3;
                      B && (P[c++] = b[O++], B > 1 && (P[c++] = b[O++]));
                    } else {
                      O = c - C;
                      do
                        P[c++] = P[O++], P[c++] = P[O++], P[c++] = P[O++], B -= 3;
                      while (B > 2);
                      B && (P[c++] = P[O++], B > 1 && (P[c++] = P[O++]));
                    }
                  } else if ((E & 64) === 0) {
                    N = k[(N & 65535) + (I & (1 << E) - 1)];
                    continue n;
                  } else {
                    r.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((E & 64) === 0) {
              N = T[(N & 65535) + (I & (1 << E) - 1)];
              continue e;
            } else if (E & 32) {
              a.mode = e;
              break t;
            } else {
              r.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && c < h);
    B = S >> 3, s -= B, S -= B << 3, I &= (1 << S) - 1, r.next_in = s, r.next_out = c, r.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), r.avail_out = c < h ? 257 + (h - c) : 257 - (c - h), a.hold = I, a.bits = S;
  }, fr;
}
var hr, Ea;
function Z0() {
  if (Ea) return hr;
  Ea = 1;
  var t = de(), e = 15, n = 852, r = 592, i = 0, a = 1, s = 2, o = [
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
  return hr = function(d, p, v, F, I, S, T, k) {
    var x = k.bits, A = 0, N = 0, E = 0, B = 0, C = 0, O = 0, b = 0, G = 0, P = 0, Y = 0, nt, ft, W, j, U, it = null, Rt = 0, J, gt = new t.Buf16(e + 1), At = new t.Buf16(e + 1), pt = null, Q = 0, lt, ht, Et;
    for (A = 0; A <= e; A++)
      gt[A] = 0;
    for (N = 0; N < F; N++)
      gt[p[v + N]]++;
    for (C = x, B = e; B >= 1 && gt[B] === 0; B--)
      ;
    if (C > B && (C = B), B === 0)
      return I[S++] = 1 << 24 | 64 << 16 | 0, I[S++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (E = 1; E < B && gt[E] === 0; E++)
      ;
    for (C < E && (C = E), G = 1, A = 1; A <= e; A++)
      if (G <<= 1, G -= gt[A], G < 0)
        return -1;
    if (G > 0 && (d === i || B !== 1))
      return -1;
    for (At[1] = 0, A = 1; A < e; A++)
      At[A + 1] = At[A] + gt[A];
    for (N = 0; N < F; N++)
      p[v + N] !== 0 && (T[At[p[v + N]]++] = N);
    if (d === i ? (it = pt = T, J = 19) : d === a ? (it = o, Rt -= 257, pt = c, Q -= 257, J = 256) : (it = f, pt = h, J = -1), Y = 0, N = 0, A = E, U = S, O = C, b = 0, W = -1, P = 1 << C, j = P - 1, d === a && P > n || d === s && P > r)
      return 1;
    for (; ; ) {
      lt = A - b, T[N] < J ? (ht = 0, Et = T[N]) : T[N] > J ? (ht = pt[Q + T[N]], Et = it[Rt + T[N]]) : (ht = 96, Et = 0), nt = 1 << A - b, ft = 1 << O, E = ft;
      do
        ft -= nt, I[U + (Y >> b) + ft] = lt << 24 | ht << 16 | Et | 0;
      while (ft !== 0);
      for (nt = 1 << A - 1; Y & nt; )
        nt >>= 1;
      if (nt !== 0 ? (Y &= nt - 1, Y += nt) : Y = 0, N++, --gt[A] === 0) {
        if (A === B)
          break;
        A = p[v + T[N]];
      }
      if (A > C && (Y & j) !== W) {
        for (b === 0 && (b = C), U += E, O = A - b, G = 1 << O; O + b < B && (G -= gt[O + b], !(G <= 0)); )
          O++, G <<= 1;
        if (P += 1 << O, d === a && P > n || d === s && P > r)
          return 1;
        W = Y & j, I[W] = C << 24 | O << 16 | U - S | 0;
      }
    }
    return Y !== 0 && (I[U + Y] = A - b << 24 | 64 << 16 | 0), k.bits = C, 0;
  }, hr;
}
var Aa;
function q0() {
  if (Aa) return Wt;
  Aa = 1;
  var t = de(), e = to(), n = eo(), r = G0(), i = Z0(), a = 0, s = 1, o = 2, c = 4, f = 5, h = 6, g = 0, d = 1, p = 2, v = -2, F = -3, I = -4, S = -5, T = 8, k = 1, x = 2, A = 3, N = 4, E = 5, B = 6, C = 7, O = 8, b = 9, G = 10, P = 11, Y = 12, nt = 13, ft = 14, W = 15, j = 16, U = 17, it = 18, Rt = 19, J = 20, gt = 21, At = 22, pt = 23, Q = 24, lt = 25, ht = 26, Et = 27, $t = 28, Nt = 29, ot = 30, at = 31, kt = 32, Dt = 852, st = 592, _t = 15, Z = _t;
  function xt(w) {
    return (w >>> 24 & 255) + (w >>> 8 & 65280) + ((w & 65280) << 8) + ((w & 255) << 24);
  }
  function Tt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Ct(w) {
    var R;
    return !w || !w.state ? v : (R = w.state, w.total_in = w.total_out = R.total = 0, w.msg = "", R.wrap && (w.adler = R.wrap & 1), R.mode = k, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new t.Buf32(Dt), R.distcode = R.distdyn = new t.Buf32(st), R.sane = 1, R.back = -1, g);
  }
  function tt(w) {
    var R;
    return !w || !w.state ? v : (R = w.state, R.wsize = 0, R.whave = 0, R.wnext = 0, Ct(w));
  }
  function dt(w, R) {
    var u, V;
    return !w || !w.state || (V = w.state, R < 0 ? (u = 0, R = -R) : (u = (R >> 4) + 1, R < 48 && (R &= 15)), R && (R < 8 || R > 15)) ? v : (V.window !== null && V.wbits !== R && (V.window = null), V.wrap = u, V.wbits = R, tt(w));
  }
  function ct(w, R) {
    var u, V;
    return w ? (V = new Tt(), w.state = V, V.window = null, u = dt(w, R), u !== g && (w.state = null), u) : v;
  }
  function ut(w) {
    return ct(w, Z);
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
      for (i(s, w.lens, 0, 288, H, 0, w.work, { bits: 9 }), R = 0; R < 32; )
        w.lens[R++] = 5;
      i(o, w.lens, 0, 32, yt, 0, w.work, { bits: 5 }), zt = !1;
    }
    w.lencode = H, w.lenbits = 9, w.distcode = yt, w.distbits = 5;
  }
  function mt(w, R, u, V) {
    var rt, l = w.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), V >= l.wsize ? (t.arraySet(l.window, R, u - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (rt = l.wsize - l.wnext, rt > V && (rt = V), t.arraySet(l.window, R, u - V, rt, l.wnext), V -= rt, V ? (t.arraySet(l.window, R, u - V, V, 0), l.wnext = V, l.whave = l.wsize) : (l.wnext += rt, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += rt))), 0;
  }
  function m(w, R) {
    var u, V, rt, l, $, M, _, y, D, et, X, K, wt, ae, Mt = 0, bt, Bt, Vt, Ut, nn, rn, Ot, qt, Ht = new t.Buf8(4), se, ee, si = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!w || !w.state || !w.output || !w.input && w.avail_in !== 0)
      return v;
    u = w.state, u.mode === Y && (u.mode = nt), $ = w.next_out, rt = w.output, _ = w.avail_out, l = w.next_in, V = w.input, M = w.avail_in, y = u.hold, D = u.bits, et = M, X = _, qt = g;
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
              M--, y += V[l++] << D, D += 8;
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
            u.dmax = 1 << Ot, w.adler = u.check = 1, u.mode = y & 512 ? G : Y, y = 0, D = 0;
            break;
          case x:
            for (; D < 16; ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            if (u.flags = y, (u.flags & 255) !== T) {
              w.msg = "unknown compression method", u.mode = ot;
              break;
            }
            if (u.flags & 57344) {
              w.msg = "unknown header flags set", u.mode = ot;
              break;
            }
            u.head && (u.head.text = y >> 8 & 1), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0, u.mode = A;
          /* falls through */
          case A:
            for (; D < 32; ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            u.head && (u.head.time = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, Ht[2] = y >>> 16 & 255, Ht[3] = y >>> 24 & 255, u.check = n(u.check, Ht, 4, 0)), y = 0, D = 0, u.mode = N;
          /* falls through */
          case N:
            for (; D < 16; ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            u.head && (u.head.xflags = y & 255, u.head.os = y >> 8), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0, u.mode = E;
          /* falls through */
          case E:
            if (u.flags & 1024) {
              for (; D < 16; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              u.length = y, u.head && (u.head.extra_len = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, D = 0;
            } else u.head && (u.head.extra = null);
            u.mode = B;
          /* falls through */
          case B:
            if (u.flags & 1024 && (K = u.length, K > M && (K = M), K && (u.head && (Ot = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), t.arraySet(
              u.head.extra,
              V,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              K,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ot
            )), u.flags & 512 && (u.check = n(u.check, V, K, l)), M -= K, l += K, u.length -= K), u.length))
              break t;
            u.length = 0, u.mode = C;
          /* falls through */
          case C:
            if (u.flags & 2048) {
              if (M === 0)
                break t;
              K = 0;
              do
                Ot = V[l + K++], u.head && Ot && u.length < 65536 && (u.head.name += String.fromCharCode(Ot));
              while (Ot && K < M);
              if (u.flags & 512 && (u.check = n(u.check, V, K, l)), M -= K, l += K, Ot)
                break t;
            } else u.head && (u.head.name = null);
            u.length = 0, u.mode = O;
          /* falls through */
          case O:
            if (u.flags & 4096) {
              if (M === 0)
                break t;
              K = 0;
              do
                Ot = V[l + K++], u.head && Ot && u.length < 65536 && (u.head.comment += String.fromCharCode(Ot));
              while (Ot && K < M);
              if (u.flags & 512 && (u.check = n(u.check, V, K, l)), M -= K, l += K, Ot)
                break t;
            } else u.head && (u.head.comment = null);
            u.mode = b;
          /* falls through */
          case b:
            if (u.flags & 512) {
              for (; D < 16; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              if (y !== (u.check & 65535)) {
                w.msg = "header crc mismatch", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = !0), w.adler = u.check = 0, u.mode = Y;
            break;
          case G:
            for (; D < 32; ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            w.adler = u.check = xt(y), y = 0, D = 0, u.mode = P;
          /* falls through */
          case P:
            if (u.havedict === 0)
              return w.next_out = $, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, p;
            w.adler = u.check = 1, u.mode = Y;
          /* falls through */
          case Y:
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
              M--, y += V[l++] << D, D += 8;
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
              M--, y += V[l++] << D, D += 8;
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
            if (K = u.length, K) {
              if (K > M && (K = M), K > _ && (K = _), K === 0)
                break t;
              t.arraySet(rt, V, l, K, $), M -= K, l += K, _ -= K, $ += K, u.length -= K;
              break;
            }
            u.mode = Y;
            break;
          case U:
            for (; D < 14; ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            if (u.nlen = (y & 31) + 257, y >>>= 5, D -= 5, u.ndist = (y & 31) + 1, y >>>= 5, D -= 5, u.ncode = (y & 15) + 4, y >>>= 4, D -= 4, u.nlen > 286 || u.ndist > 30) {
              w.msg = "too many length or distance symbols", u.mode = ot;
              break;
            }
            u.have = 0, u.mode = it;
          /* falls through */
          case it:
            for (; u.have < u.ncode; ) {
              for (; D < 3; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              u.lens[si[u.have++]] = y & 7, y >>>= 3, D -= 3;
            }
            for (; u.have < 19; )
              u.lens[si[u.have++]] = 0;
            if (u.lencode = u.lendyn, u.lenbits = 7, se = { bits: u.lenbits }, qt = i(a, u.lens, 0, 19, u.lencode, 0, u.work, se), u.lenbits = se.bits, qt) {
              w.msg = "invalid code lengths set", u.mode = ot;
              break;
            }
            u.have = 0, u.mode = Rt;
          /* falls through */
          case Rt:
            for (; u.have < u.nlen + u.ndist; ) {
              for (; Mt = u.lencode[y & (1 << u.lenbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Vt = Mt & 65535, !(bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              if (Vt < 16)
                y >>>= bt, D -= bt, u.lens[u.have++] = Vt;
              else {
                if (Vt === 16) {
                  for (ee = bt + 2; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += V[l++] << D, D += 8;
                  }
                  if (y >>>= bt, D -= bt, u.have === 0) {
                    w.msg = "invalid bit length repeat", u.mode = ot;
                    break;
                  }
                  Ot = u.lens[u.have - 1], K = 3 + (y & 3), y >>>= 2, D -= 2;
                } else if (Vt === 17) {
                  for (ee = bt + 3; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += V[l++] << D, D += 8;
                  }
                  y >>>= bt, D -= bt, Ot = 0, K = 3 + (y & 7), y >>>= 3, D -= 3;
                } else {
                  for (ee = bt + 7; D < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += V[l++] << D, D += 8;
                  }
                  y >>>= bt, D -= bt, Ot = 0, K = 11 + (y & 127), y >>>= 7, D -= 7;
                }
                if (u.have + K > u.nlen + u.ndist) {
                  w.msg = "invalid bit length repeat", u.mode = ot;
                  break;
                }
                for (; K--; )
                  u.lens[u.have++] = Ot;
              }
            }
            if (u.mode === ot)
              break;
            if (u.lens[256] === 0) {
              w.msg = "invalid code -- missing end-of-block", u.mode = ot;
              break;
            }
            if (u.lenbits = 9, se = { bits: u.lenbits }, qt = i(s, u.lens, 0, u.nlen, u.lencode, 0, u.work, se), u.lenbits = se.bits, qt) {
              w.msg = "invalid literal/lengths set", u.mode = ot;
              break;
            }
            if (u.distbits = 6, u.distcode = u.distdyn, se = { bits: u.distbits }, qt = i(o, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, se), u.distbits = se.bits, qt) {
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
              w.next_out = $, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, r(w, X), $ = w.next_out, rt = w.output, _ = w.avail_out, l = w.next_in, V = w.input, M = w.avail_in, y = u.hold, D = u.bits, u.mode === Y && (u.back = -1);
              break;
            }
            for (u.back = 0; Mt = u.lencode[y & (1 << u.lenbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Vt = Mt & 65535, !(bt <= D); ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            if (Bt && (Bt & 240) === 0) {
              for (Ut = bt, nn = Bt, rn = Vt; Mt = u.lencode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Vt = Mt & 65535, !(Ut + bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              y >>>= Ut, D -= Ut, u.back += Ut;
            }
            if (y >>>= bt, D -= bt, u.back += bt, u.length = Vt, Bt === 0) {
              u.mode = ht;
              break;
            }
            if (Bt & 32) {
              u.back = -1, u.mode = Y;
              break;
            }
            if (Bt & 64) {
              w.msg = "invalid literal/length code", u.mode = ot;
              break;
            }
            u.extra = Bt & 15, u.mode = At;
          /* falls through */
          case At:
            if (u.extra) {
              for (ee = u.extra; D < ee; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              u.length += y & (1 << u.extra) - 1, y >>>= u.extra, D -= u.extra, u.back += u.extra;
            }
            u.was = u.length, u.mode = pt;
          /* falls through */
          case pt:
            for (; Mt = u.distcode[y & (1 << u.distbits) - 1], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Vt = Mt & 65535, !(bt <= D); ) {
              if (M === 0)
                break t;
              M--, y += V[l++] << D, D += 8;
            }
            if ((Bt & 240) === 0) {
              for (Ut = bt, nn = Bt, rn = Vt; Mt = u.distcode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], bt = Mt >>> 24, Bt = Mt >>> 16 & 255, Vt = Mt & 65535, !(Ut + bt <= D); ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              y >>>= Ut, D -= Ut, u.back += Ut;
            }
            if (y >>>= bt, D -= bt, u.back += bt, Bt & 64) {
              w.msg = "invalid distance code", u.mode = ot;
              break;
            }
            u.offset = Vt, u.extra = Bt & 15, u.mode = Q;
          /* falls through */
          case Q:
            if (u.extra) {
              for (ee = u.extra; D < ee; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
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
            if (K = X - _, u.offset > K) {
              if (K = u.offset - K, K > u.whave && u.sane) {
                w.msg = "invalid distance too far back", u.mode = ot;
                break;
              }
              K > u.wnext ? (K -= u.wnext, wt = u.wsize - K) : wt = u.wnext - K, K > u.length && (K = u.length), ae = u.window;
            } else
              ae = rt, wt = $ - u.offset, K = u.length;
            K > _ && (K = _), _ -= K, u.length -= K;
            do
              rt[$++] = ae[wt++];
            while (--K);
            u.length === 0 && (u.mode = gt);
            break;
          case ht:
            if (_ === 0)
              break t;
            rt[$++] = u.length, _--, u.mode = gt;
            break;
          case Et:
            if (u.wrap) {
              for (; D < 32; ) {
                if (M === 0)
                  break t;
                M--, y |= V[l++] << D, D += 8;
              }
              if (X -= _, w.total_out += X, u.total += X, X && (w.adler = u.check = /*UPDATE(state.check, put - _out, _out);*/
              u.flags ? n(u.check, rt, X, $ - X) : e(u.check, rt, X, $ - X)), X = _, (u.flags ? y : xt(y)) !== u.check) {
                w.msg = "incorrect data check", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.mode = $t;
          /* falls through */
          case $t:
            if (u.wrap && u.flags) {
              for (; D < 32; ) {
                if (M === 0)
                  break t;
                M--, y += V[l++] << D, D += 8;
              }
              if (y !== (u.total & 4294967295)) {
                w.msg = "incorrect length check", u.mode = ot;
                break;
              }
              y = 0, D = 0;
            }
            u.mode = Nt;
          /* falls through */
          case Nt:
            qt = d;
            break t;
          case ot:
            qt = F;
            break t;
          case at:
            return I;
          case kt:
          /* falls through */
          default:
            return v;
        }
    return w.next_out = $, w.avail_out = _, w.next_in = l, w.avail_in = M, u.hold = y, u.bits = D, (u.wsize || X !== w.avail_out && u.mode < ot && (u.mode < Et || R !== c)) && mt(w, w.output, w.next_out, X - w.avail_out), et -= w.avail_in, X -= w.avail_out, w.total_in += et, w.total_out += X, u.total += X, u.wrap && X && (w.adler = u.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    u.flags ? n(u.check, rt, X, w.next_out - X) : e(u.check, rt, X, w.next_out - X)), w.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === Y ? 128 : 0) + (u.mode === J || u.mode === W ? 256 : 0), (et === 0 && X === 0 || R === c) && qt === g && (qt = S), qt;
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
  function q(w, R) {
    var u = R.length, V, rt, l;
    return !w || !w.state || (V = w.state, V.wrap !== 0 && V.mode !== P) ? v : V.mode === P && (rt = 1, rt = e(rt, R, u, 0), rt !== V.check) ? F : (l = mt(w, R, u, u), l ? (V.mode = at, I) : (V.havedict = 1, g));
  }
  return Wt.inflateReset = tt, Wt.inflateReset2 = dt, Wt.inflateResetKeep = Ct, Wt.inflateInit = ut, Wt.inflateInit2 = ct, Wt.inflate = m, Wt.inflateEnd = z, Wt.inflateGetHeader = L, Wt.inflateSetDictionary = q, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var ur, Sa;
function io() {
  return Sa || (Sa = 1, ur = {
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
  }), ur;
}
var dr, Na;
function W0() {
  if (Na) return dr;
  Na = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return dr = t, dr;
}
var $a;
function X0() {
  if ($a) return De;
  $a = 1;
  var t = q0(), e = de(), n = no(), r = io(), i = ri(), a = ro(), s = W0(), o = Object.prototype.toString;
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
    if (p !== r.Z_OK)
      throw new Error(i[p]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), d.dictionary && (typeof d.dictionary == "string" ? d.dictionary = n.string2buf(d.dictionary) : o.call(d.dictionary) === "[object ArrayBuffer]" && (d.dictionary = new Uint8Array(d.dictionary)), d.raw && (p = t.inflateSetDictionary(this.strm, d.dictionary), p !== r.Z_OK)))
      throw new Error(i[p]);
  }
  c.prototype.push = function(g, d) {
    var p = this.strm, v = this.options.chunkSize, F = this.options.dictionary, I, S, T, k, x, A = !1;
    if (this.ended)
      return !1;
    S = d === ~~d ? d : d === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, typeof g == "string" ? p.input = n.binstring2buf(g) : o.call(g) === "[object ArrayBuffer]" ? p.input = new Uint8Array(g) : p.input = g, p.next_in = 0, p.avail_in = p.input.length;
    do {
      if (p.avail_out === 0 && (p.output = new e.Buf8(v), p.next_out = 0, p.avail_out = v), I = t.inflate(p, r.Z_NO_FLUSH), I === r.Z_NEED_DICT && F && (I = t.inflateSetDictionary(this.strm, F)), I === r.Z_BUF_ERROR && A === !0 && (I = r.Z_OK, A = !1), I !== r.Z_STREAM_END && I !== r.Z_OK)
        return this.onEnd(I), this.ended = !0, !1;
      p.next_out && (p.avail_out === 0 || I === r.Z_STREAM_END || p.avail_in === 0 && (S === r.Z_FINISH || S === r.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = n.utf8border(p.output, p.next_out), k = p.next_out - T, x = n.buf2string(p.output, T), p.next_out = k, p.avail_out = v - k, k && e.arraySet(p.output, p.output, T, k, 0), this.onData(x)) : this.onData(e.shrinkBuf(p.output, p.next_out))), p.avail_in === 0 && p.avail_out === 0 && (A = !0);
    } while ((p.avail_in > 0 || p.avail_out === 0) && I !== r.Z_STREAM_END);
    return I === r.Z_STREAM_END && (S = r.Z_FINISH), S === r.Z_FINISH ? (I = t.inflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === r.Z_OK) : (S === r.Z_SYNC_FLUSH && (this.onEnd(r.Z_OK), p.avail_out = 0), !0);
  }, c.prototype.onData = function(g) {
    this.chunks.push(g);
  }, c.prototype.onEnd = function(g) {
    g === r.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
  };
  function f(g, d) {
    var p = new c(d);
    if (p.push(g, !0), p.err)
      throw p.msg || i[p.err];
    return p.result;
  }
  function h(g, d) {
    return d = d || {}, d.raw = !0, f(g, d);
  }
  return De.Inflate = c, De.inflate = f, De.inflateRaw = h, De.ungzip = f, De;
}
var pr, Da;
function K0() {
  if (Da) return pr;
  Da = 1;
  var t = de().assign, e = U0(), n = X0(), r = io(), i = {};
  return t(i, e, n, r), pr = i, pr;
}
var Y0 = K0();
const J0 = /* @__PURE__ */ ti(Y0);
function Q0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ao(t) {
  const e = new Uint8Array(Q0(t));
  let n = 0;
  for (const r of t)
    e.set(r, n), n += r.length;
  return e;
}
const { Z_SYNC_FLUSH: so, Inflate: oo } = J0;
async function ii(t) {
  try {
    let e, n = 0, r;
    const i = [];
    do {
      const a = t.subarray(n);
      if (r = new oo(), { strm: e } = r, r.push(a, so), r.err)
        throw new Error(r.msg);
      n += e.next_in, i.push(r.result);
    } while (e.avail_in);
    return ao(i);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function j0(t, e) {
  try {
    let n;
    const { minv: r, maxv: i } = e;
    let a = r.blockPosition, s = r.dataPosition;
    const o = [], c = [], f = [];
    let h = 0;
    do {
      const g = t.subarray(a - r.blockPosition), d = new oo();
      if ({ strm: n } = d, d.push(g, so), d.err)
        throw new Error(d.msg);
      const p = d.result;
      o.push(p);
      let v = p.length;
      c.push(a), f.push(s), o.length === 1 && r.dataPosition && (o[0] = o[0].subarray(r.dataPosition), v = o[0].length);
      const F = a;
      if (a += n.next_in, s += v, F >= i.blockPosition) {
        o[h] = o[h].subarray(0, i.blockPosition === r.blockPosition ? i.dataPosition - r.dataPosition + 1 : i.dataPosition + 1), c.push(a), f.push(s);
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
  constructor(e, n, r, i = void 0) {
    this.minv = e, this.maxv = n, this.bin = r, this._fetchedSize = i;
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
    var i;
    return !!((i = (await this.parse(n)).indices[e]) != null && i.binIndex);
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
  let r = null;
  return t.length === 0 ? t : (t.sort(function(i, a) {
    const s = i.minv.blockPosition - a.minv.blockPosition;
    return s !== 0 ? s : i.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((i) => {
    (!e || i.maxv.compareTo(e) > 0) && (r === null ? (n.push(i), r = i) : np(r, i) ? i.maxv.compareTo(r.maxv) > 0 && (r.maxv = i.maxv) : (n.push(i), r = i));
  }), n);
}
class ai {
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
  return new ai(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const rp = 21582659, ip = 38359875, ap = {
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
class _r extends lo {
  constructor(e) {
    super(e), this.maxBinNumber = 0, this.depth = 0, this.minShift = 0;
  }
  async lineCount(e, n = {}) {
    const r = await this.parse(n), i = r.refNameToId[e];
    if (i === void 0 || !r.indices[i])
      return -1;
    const { stats: s } = r.indices[i];
    return s ? s.lineCount : -1;
  }
  indexCov() {
    throw new Error("CSI indexes do not support indexcov");
  }
  parseAuxData(e, n) {
    const r = new DataView(e.buffer), i = r.getInt32(n, !0), a = i & 65536 ? "zero-based-half-open" : "1-based-closed", s = ap[i & 15];
    if (!s)
      throw new Error(`invalid Tabix preset format flags ${i}`);
    const o = {
      ref: r.getInt32(n + 4, !0),
      start: r.getInt32(n + 8, !0),
      end: r.getInt32(n + 12, !0)
    }, c = r.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, h = r.getInt32(n + 20, !0), g = r.getInt32(n + 24, !0), { refIdToName: d, refNameToId: p } = this._parseNameBytes(e.subarray(n + 28, n + 28 + g));
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
    let n = 0, r = 0;
    const i = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (r < o) {
          const c = this.renameRefSeq(s.decode(e.subarray(r, o)));
          i[n] = c, a[c] = n;
        }
        r = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: i
    };
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await ii(await this.filehandle.readFile(e)), r = new DataView(n.buffer);
    let i;
    if (r.getUint32(0, !0) === rp)
      i = 1;
    else if (r.getUint32(0, !0) === ip)
      i = 2;
    else
      throw new Error("Not a CSI file");
    this.minShift = r.getInt32(4, !0), this.depth = r.getInt32(8, !0), this.maxBinNumber = ((1 << (this.depth + 1) * 3) - 1) / 7;
    const a = 2 ** (this.minShift + this.depth * 3), s = r.getInt32(12, !0), o = s && s >= 30 ? this.parseAuxData(n, 16) : {
      refIdToName: [],
      refNameToId: {},
      metaChar: null,
      columnNumbers: { ref: 0, start: 1, end: 2 },
      coordinateType: "zero-based-half-open",
      format: "generic"
    }, c = r.getInt32(16 + s, !0);
    let f, h = 16 + s + 4;
    const g = new Array(c).fill(0).map(() => {
      const d = r.getInt32(h, !0);
      h += 4;
      const p = {};
      let v;
      for (let F = 0; F < d; F += 1) {
        const I = r.getUint32(h, !0);
        if (I > this.maxBinNumber)
          v = this.parsePseudoBin(n, h + 4), h += 48;
        else {
          const S = Le(n, h + 4);
          f = this._findFirstData(f, S);
          const T = r.getInt32(h + 12, !0);
          h += 16;
          const k = new Array(T);
          for (let x = 0; x < T; x += 1) {
            const A = Le(n, h), N = Le(n, h + 8);
            h += 16, k[x] = new Bn(A, N, I);
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
      csiVersion: i,
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
  async blocksForRange(e, n, r, i = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(i), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    const c = this.reg2bins(n, r), f = [];
    for (const [h, g] of c)
      for (let d = h; d <= g; d++)
        if (o.binIndex[d])
          for (const p of o.binIndex[d])
            f.push(new Bn(p.minv, p.maxv, d));
    return fo(f, new ai(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let r = 0, i = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; r <= this.depth; a -= 3, i += sp(1, r * 3), r += 1) {
      const o = i + Ra(e, a), c = i + Ra(n, a);
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
class Pe extends lo {
  async lineCount(e, n = {}) {
    var s;
    const r = await this.parse(n), i = r.refNameToId[e];
    return i === void 0 || !r.indices[i] ? -1 : ((s = r.indices[i].stats) == null ? void 0 : s.lineCount) ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), r = await ii(n);
    We(e.signal);
    const i = new DataView(r.buffer);
    if (i.getUint32(0, !0) !== op)
      throw new Error("Not a TBI file");
    const s = i.getUint32(4, !0), o = i.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", h = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!h)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const g = {
      ref: i.getInt32(12, !0),
      start: i.getInt32(16, !0),
      end: i.getInt32(20, !0)
    }, d = i.getInt32(24, !0), p = 5, v = ((1 << (p + 1) * 3) - 1) / 7, F = 2 ** (14 + p * 3), I = d ? String.fromCharCode(d) : null, S = i.getInt32(28, !0), T = i.getInt32(32, !0), { refNameToId: k, refIdToName: x } = this._parseNameBytes(r.slice(36, 36 + T));
    let A = 36 + T, N;
    return {
      indices: new Array(s).fill(0).map(() => {
        const B = i.getInt32(A, !0);
        A += 4;
        const C = {};
        let O;
        for (let P = 0; P < B; P += 1) {
          const Y = i.getUint32(A, !0);
          if (A += 4, Y > v + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (Y === v + 1) {
            const nt = i.getInt32(A, !0);
            A += 4, nt === 2 && (O = this.parsePseudoBin(r, A)), A += 16 * nt;
          } else {
            const nt = i.getInt32(A, !0);
            A += 4;
            const ft = new Array(nt);
            for (let W = 0; W < nt; W += 1) {
              const j = Le(r, A), U = Le(r, A + 8);
              A += 16, N = this._findFirstData(N, j), ft[W] = new Bn(j, U, Y);
            }
            C[Y] = ft;
          }
        }
        const b = i.getInt32(A, !0);
        A += 4;
        const G = new Array(b);
        for (let P = 0; P < b; P += 1)
          G[P] = Le(r, A), A += 8, N = this._findFirstData(N, G[P]);
        return {
          binIndex: C,
          linearIndex: G,
          stats: O
        };
      }),
      metaChar: I,
      maxBinNumber: v,
      maxRefLength: F,
      skipLines: S,
      firstDataLine: N,
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
    let n = 0, r = 0;
    const i = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (r < o) {
          const c = this.renameRefSeq(s.decode(e.subarray(r, o)));
          i[n] = c, a[c] = n;
        }
        r = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: i
    };
  }
  async blocksForRange(e, n, r, i = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(i), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    (o.linearIndex.length ? o.linearIndex[n >> Ma >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> Ma] : new ai(0, 0)) || console.warn("querying outside of possible tabix range");
    const f = lp(n, r), h = [];
    for (const [F, I] of f)
      for (let S = F; S <= I; S++)
        if (o.binIndex[S])
          for (const T of o.binIndex[S])
            h.push(new Bn(T.minv, T.maxv, S));
    const g = o.linearIndex.length;
    let d = null;
    const p = Math.min(n >> 14, g - 1), v = Math.min(r >> 14, g - 1);
    for (let F = p; F <= v; ++F) {
      const I = o.linearIndex[F];
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
  constructor({ path: e, filehandle: n, url: r, tbiPath: i, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: h = (d) => d, chunkCacheSize: g = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new gn(e);
    else if (r)
      this.filehandle = new we(r);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new Pe({
        filehandle: s,
        renameRefSeqs: h
      });
    else if (f)
      this.index = new _r({
        filehandle: f,
        renameRefSeqs: h
      });
    else if (i)
      this.index = new Pe({
        filehandle: new gn(i),
        renameRefSeqs: h
      });
    else if (o)
      this.index = new _r({
        filehandle: new gn(o),
        renameRefSeqs: h
      });
    else if (e)
      this.index = new Pe({
        filehandle: new gn(`${e}.tbi`),
        renameRefSeqs: h
      });
    else if (c)
      this.index = new _r({
        filehandle: new we(c)
      });
    else if (a)
      this.index = new Pe({
        filehandle: new we(a)
      });
    else if (r)
      this.index = new Pe({
        filehandle: new we(`${r}.tbi`)
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
  async getLines(e, n, r, i) {
    let a, s = {}, o;
    typeof i == "function" ? o = i : (s = i, o = i.lineCallback, a = i.signal);
    const c = await this.index.getMetadata(s);
    We(a);
    const f = n ?? 0, h = r ?? c.maxRefLength;
    if (!(f <= h))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === h)
      return;
    const g = await this.index.blocksForRange(e, f, h, s);
    We(a);
    const d = new TextDecoder("utf8");
    for (const p of g) {
      const { buffer: v, cpositions: F, dpositions: I } = await this.chunkCache.get(p.toString(), p, a);
      We(a);
      let S = 0, T = 0;
      const k = d.decode(v), x = cp(k);
      for (; S < k.length; ) {
        let A, N;
        if (x) {
          if (N = k.indexOf(`
`, S), N === -1)
            break;
          A = k.slice(S, N);
        } else {
          if (N = v.indexOf(10, S), N === -1)
            break;
          const C = v.slice(S, N);
          A = d.decode(C);
        }
        if (I) {
          for (; S + p.minv.dataPosition >= I[T++]; )
            ;
          T--;
        }
        const { startCoordinate: E, overlaps: B } = this.checkLine(c, e, f, h, A);
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
            F[T] * 256 + (S - I[T]) + p.minv.dataPosition + 1
          );
        else if (E !== void 0 && E >= h)
          return;
        S = N + 1;
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
    const { firstDataLine: n, metaChar: r, maxBlockSize: i } = await this.getMetadata(e);
    We(e.signal);
    const a = ((n == null ? void 0 : n.blockPosition) || 0) + i, s = await this.filehandle.read(a, 0, e), o = await ii(s);
    if (r) {
      let c = -1;
      const f = 10, h = r.charCodeAt(0);
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
  checkLine(e, n, r, i, a) {
    const { columnNumbers: s, metaChar: o, coordinateType: c, format: f } = e;
    if (o && a.startsWith(o))
      return { overlaps: !1 };
    let { ref: h, start: g, end: d } = s;
    h || (h = 0), g || (g = 0), d || (d = 0), f === "VCF" && (d = 8);
    const p = Math.max(h, g, d);
    let v = 1, F = 0, I = "", S = -1 / 0;
    const T = a.length;
    for (let k = 0; k < T + 1; k++)
      if (a[k] === "	" || k === T) {
        if (v === h) {
          if (this.renameRefSeq(a.slice(F, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (v === g) {
          if (S = parseInt(a.slice(F, k), 10), c === "1-based-closed" && (S -= 1), S >= i)
            return {
              startCoordinate: S,
              overlaps: !1
            };
          if ((d === 0 || d === g) && S + 1 <= r)
            return {
              startCoordinate: S,
              overlaps: !1
            };
        } else if (f === "VCF" && v === 4)
          I = a.slice(F, k);
        else if (v === d && (f === "VCF" ? this._getVcfEnd(S, I, a.slice(F, k)) : Number.parseInt(a.slice(F, k), 10)) <= r)
          return {
            overlaps: !1
          };
        if (F = k + 1, v += 1, v > p)
          break;
      }
    return {
      startCoordinate: S,
      overlaps: !0
    };
  }
  _getVcfEnd(e, n, r) {
    let i = e + n.length;
    const a = r.includes("SVTYPE=TRA");
    if (r[0] !== "." && !a) {
      let s = ";";
      for (let o = 0; o < r.length; o += 1) {
        if (s === ";" && r.slice(o, o + 4) === "END=") {
          let c = r.indexOf(";", o);
          c === -1 && (c = r.length), i = parseInt(r.slice(o + 4, c), 10);
          break;
        }
        s = r[o];
      }
    } else if (a)
      return e + 1;
    return i;
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
    return j0(r, e);
  }
}
function hp(t, e, n) {
  const r = e.split("	"), i = {};
  let a = 0;
  if (t.includes("GT")) {
    const s = t.split(":");
    if (s.length === 1)
      for (const o of n)
        i[o] = r[a++];
    else {
      const o = s.indexOf("GT");
      if (o === 0)
        for (const c of n) {
          const f = r[a++], h = f.indexOf(":");
          i[c] = h !== -1 ? f.slice(0, h) : f;
        }
      else
        for (const c of n) {
          const f = r[a++].split(":");
          i[c] = f[o];
        }
    }
  }
  return i;
}
function up(t) {
  const e = [];
  let n = "", r = !1, i = !1;
  for (const a of t)
    a === '"' ? (r = !r, n += a) : a === "[" ? (i = !0, n += a) : a === "]" ? (i = !1, n += a) : a === "," && !r && !i ? (e.push(n.trim()), n = "") : n += a;
  return n && e.push(n.trim()), e;
}
function dp(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function pp(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(up(e).map((n) => {
    const [r, i] = dp(n, "=");
    return i && i.startsWith("[") && i.endsWith("]") ? [
      r,
      i.slice(1, -1).split(",").map((a) => a.trim())
    ] : i && i.startsWith('"') && i.endsWith('"') ? [r, i.slice(1, -1)] : [r, i == null ? void 0 : i.replaceAll(/^"|"$/g, "")];
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
    const r = e.split(/[\r\n]+/).filter(Boolean);
    if (!r.length)
      throw new Error("no non-empty header lines specified");
    this.strict = n, this.metadata = JSON.parse(JSON.stringify({
      INFO: mn.InfoFields,
      FORMAT: mn.GenotypeFields,
      ALT: mn.AltTypes,
      FILTER: mn.FilterTypes
    }));
    let i;
    if (r.forEach((c) => {
      if (c.startsWith("#"))
        c.startsWith("##") ? this.parseMetadata(c) : i = c;
      else throw new Error(`Bad line in header:
${c}`);
    }), !i)
      throw new Error("No format line found in header");
    const a = i.trim().split("	"), s = a.slice(0, 8), o = [
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
${i}`);
    if (s.length !== o.length || !s.every((c, f) => c === o[f]))
      throw new Error(`VCF column headers not correct:
${i}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const r = {};
    if (e) {
      const i = n.split("	"), a = e.split(":"), s = a.map((o) => {
        const c = this.getMetadata("FORMAT", o, "Type");
        return c === "Integer" || c === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const c = this.samples[o];
        r[c] = {};
        const f = i[o].split(":");
        for (let h = 0; h < f.length; h++) {
          const g = f[h];
          r[c][a[h]] = g === "" || g === "." ? void 0 : g.split(",").map((d) => d === "." ? void 0 : s[h] ? +d : d);
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
    const [r, i] = n.slice(1, 3), a = r;
    if (i != null && i.startsWith("<")) {
      a in this.metadata || (this.metadata[a] = {});
      const [s, o] = this.parseStructuredMetaVal(i);
      s ? this.metadata[a][s] = o : this.metadata[a] = o;
    } else
      this.metadata[a] = i;
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
    const n = pp(e), r = n.ID;
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
    var N;
    let n = 0;
    for (let E = 0; n < e.length && (e[n] === "	" && (E += 1), E !== 9); n += 1)
      ;
    const r = e.slice(0, n).split("	"), i = e.slice(n + 1), [a, s, o, c, f, h, g] = r, d = a, p = +s, v = o === "." ? void 0 : o.split(";"), F = c, I = f === "." ? void 0 : f.split(","), S = h === "." ? void 0 : +h, T = g === "." ? void 0 : g.split(";"), k = r[8];
    if (this.strict && !r[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const x = (N = r[7]) == null ? void 0 : N.includes("%"), A = r[7] === void 0 || r[7] === "." ? {} : Object.fromEntries(r[7].split(";").map((E) => {
      const [B, C] = E.split("="), O = C == null ? void 0 : C.split(",").map((G) => G === "." ? void 0 : G).map((G) => G && x ? _p(G) : G), b = this.getMetadata("INFO", B, "Type");
      return b === "Integer" || b === "Float" ? [
        B,
        O == null ? void 0 : O.map((G) => G === void 0 ? void 0 : Number(G))
      ] : b === "Flag" ? [B, !0] : [B, O ?? !0];
    }));
    return {
      CHROM: d,
      POS: p,
      ALT: I,
      INFO: A,
      REF: F,
      FILTER: T && T.length === 1 && T[0] === "PASS" ? "PASS" : T,
      ID: v,
      QUAL: S,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(r[8] ?? "", i),
      GENOTYPES: () => hp(r[8] ?? "", i, this.samples)
    };
  }
}
function mp(t) {
  const e = t.split(/[[\]]/);
  if (e.length > 1) {
    const n = t.includes("[") ? "right" : "left";
    let r, i, a;
    for (const s of e)
      s && (s.includes(":") ? (a = s, r = i ? "right" : "left") : i = s);
    if (!(a && r && i))
      throw new Error(`Invalid breakend: ${t}`);
    return { MatePosition: a, Join: r, Replacement: i, MateDirection: n };
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
  const r = /* @__PURE__ */ new Set();
  let i = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [s, o] = ho(a, n);
    s || ([s, o] = yp(t, a)), s && o && (r.add(s), i.add(o));
  }), i.size > 1) {
    const a = [...i], s = new Set(
      a.map((o) => {
        const c = o.split("->");
        return c[1] ? c[0] : o;
      }).filter((o) => !!o)
    );
    i = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const c = a.map((f) => f.split("->").map((h) => h.trim())).map((f) => f[1] && f[0] === o ? f[1] : "").filter((f) => !!f);
        return c.length ? `${o} -> ${c.join(",")}` : o;
      })
    );
  }
  return r.size ? [[...r].join(","), [...i].join(",")] : [];
}
function ho(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = vp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const r = t.split(":");
  return r.length > 1 ? ho(`<${r.slice(0, -1).join(":")}>`, e) : [];
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
    const r = e.length - t.length, i = r.toLocaleString("en-US");
    return [
      "insertion",
      r > 5 ? `${i}bp INS` : Ie("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const r = t.length - e.length, i = r.toLocaleString("en-US");
    return [
      "deletion",
      r > 5 ? `${i}bp DEL` : Ie("deletion", t, e)
    ];
  }
  return ["indel", Ie("indel", t, e)];
}
function Ie(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function bp(t, e) {
  const { REF: n = "", ALT: r, POS: i, CHROM: a, ID: s } = t, o = i - 1, [c, f] = wp(n, r, e);
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
  const { POS: e, REF: n = "", ALT: r } = t, i = r == null ? void 0 : r.includes("<TRA>"), a = e - 1;
  if (r == null ? void 0 : r.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !i)
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
    const { SAMPLES: e, GENOTYPES: n, ...r } = this.variant;
    return {
      uniqueId: this._id,
      ...r,
      ...this.data,
      samples: this.variant.SAMPLES()
    };
  }
}
async function Ap({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: r
}) {
  const i = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new fp({
    tbiFilehandle: n === "TBI" ? new we(i) : void 0,
    csiFilehandle: n === "CSI" ? new we(i) : void 0,
    filehandle: new we(t)
  }), s = new gp({
    header: await a.getHeader()
  }), o = [];
  let c = 0;
  return await a.getLines(r.chromosome, r.start, r.end, {
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
              values: [JSON.stringify(v.map((F) => La(F)))]
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
function Sp(t) {
  const [e, n] = t.split(":"), [r, i] = n.split("..");
  return {
    chromosome: e,
    start: +r,
    end: +i
  };
}
Ae.prototype.first = function() {
  return St(this.nodes()[0]);
};
Ae.prototype.last = function() {
  return St(this.nodes()[this.size() - 1]);
};
class Np {
  constructor(e, n, r, i) {
    console.log("GenomeFeatureViewer CONSTRUCTOR START", {
      configKeys: e ? Object.keys(e) : "CONFIG IS NULL/UNDEFINED",
      svg_target: n,
      width: r,
      height: i,
      hasConfig: !!e,
      hasTracks: e && e.tracks ? e.tracks.length : "NO TRACKS",
      hasRegion: !!(e && e.region)
    });
    try {
      this.height = i, this.width = r, this.config = e, this.svg_target = n, console.log("GenomeFeatureViewer - About to init viewer"), this.viewer = this._initViewer(n), console.log("GenomeFeatureViewer - Viewer initialized, about to draw"), this.draw(), console.log("GenomeFeatureViewer - Draw completed successfully");
    } catch (a) {
      throw console.error("GenomeFeatureViewer CONSTRUCTOR ERROR:", {
        error: a instanceof Error ? a.message : String(a),
        stack: a instanceof Error ? a.stack : void 0,
        at: "constructor",
        config: e
      }), a;
    }
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
    const r = St(n);
    r.selectAll(".highlight").remove(), r.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((i) => i.selected === "true").style("stroke", null).datum((i) => (i.selected = "false", i)), Yr(e, r);
  }
  _initViewer(e) {
    St(e).selectAll("*").remove();
    const n = St(e), i = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", i), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, St(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    console.log("GenomeFeatureViewer.draw() START", {
      configExists: !!this.config,
      configKeys: this.config ? Object.keys(this.config) : [],
      width: this.width,
      height: this.height
    });
    const e = this.width, n = this.config.transcriptTypes ?? Th, r = this.config.variantTypes ?? Eh, i = this.config.binRatio ?? 0.01;
    console.log("GenomeFeatureViewer.draw() - Getting region", {
      hasRegion: !!this.config.region,
      region: this.config.region
    });
    const a = this.config.region;
    console.log("GenomeFeatureViewer.draw() - Configuring range", {
      regionStart: a == null ? void 0 : a.start,
      regionEnd: a == null ? void 0 : a.end,
      width: e
    });
    const s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome;
    console.log("GenomeFeatureViewer.draw() - Processing filters", {
      variantFilter: this.config.variantFilter,
      variantFilterLength: this.config.variantFilter ? this.config.variantFilter.length : "UNDEFINED",
      isoformFilter: this.config.isoformFilter,
      isoformFilterLength: this.config.isoformFilter ? this.config.isoformFilter.length : "UNDEFINED"
    });
    const f = this.config.variantFilter ?? [], h = this.config.isoformFilter ?? [], g = this.config.htpVariant ?? "", d = s.start, p = s.end;
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
    const S = this.config.showVariantLabel ?? !0;
    console.log("GenomeFeatureViewer.draw() - About to process tracks", {
      tracks: this.tracks,
      tracksIsArray: Array.isArray(this.tracks),
      tracksLength: this.tracks ? this.tracks.length : "TRACKS IS UNDEFINED/NULL",
      configTracks: this.config.tracks,
      configTracksIsArray: Array.isArray(this.config.tracks),
      configTracksLength: this.config.tracks ? this.config.tracks.length : "CONFIG.TRACKS IS UNDEFINED/NULL"
    });
    const { viewer: T, genome: k, height: x, tracks: A } = this;
    if (console.log("GenomeFeatureViewer.draw() - After destructuring", {
      hasViewer: !!T,
      hasGenome: !!k,
      height: x,
      tracks: A,
      tracksType: typeof A,
      tracksIsArray: Array.isArray(A),
      tracksLength: A ? A.length : "UNDEFINED"
    }), !A || !Array.isArray(A))
      throw console.error("GenomeFeatureViewer.draw() - CRITICAL: tracks is not an array!", {
        tracks: A,
        type: typeof A,
        config: this.config
      }), new Error(`Tracks must be an array, got: ${typeof A}`);
    A.map((N) => {
      console.log("GenomeFeatureViewer.draw() - Processing track", {
        trackType: N.type,
        hasVariantData: !!N.variantData,
        hasTrackData: !!N.trackData,
        track: N
      });
      const { variantData: E, trackData: B } = N;
      if (N.type === Ve.ISOFORM_AND_VARIANT) {
        const C = new Rh({
          viewer: T,
          height: x,
          width: e,
          transcriptTypes: n,
          variantTypes: r,
          showVariantLabel: S,
          trackData: B,
          variantData: E,
          variantFilter: f,
          binRatio: i,
          isoformFilter: h,
          geneBounds: N.geneBounds,
          geneSymbol: N.geneSymbol,
          geneId: N.geneId
        });
        I += C.DrawTrack();
      } else if (N.type === Ve.ISOFORM_EMBEDDED_VARIANT) {
        const C = new Mh({
          viewer: T,
          height: x,
          width: e,
          transcriptTypes: n,
          variantData: E,
          trackData: B,
          variantTypes: r,
          showVariantLabel: S,
          variantFilter: f
        });
        I += C.DrawTrack();
      } else if (N.type === Ve.ISOFORM) {
        const C = new Lh({
          region: a,
          viewer: T,
          height: x,
          width: e,
          genome: k,
          trackData: B,
          transcriptTypes: n,
          htpVariant: g
        });
        I += C.DrawTrack();
      } else N.type === Ve.VARIANT ? new ad({
        region: a,
        viewer: T,
        range: o,
        height: x,
        width: e
      }).DrawTrack() : N.type === Ve.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: T,
        track: {
          ...N,
          range: o
        },
        height: x,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${N.type}`);
      St(this.svg_target).attr("height", I);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, r) {
    let i = null;
    const a = 17;
    let s = 0, o = [0, 0];
    if (e === n) {
      i = 300, s = a * i, e = e - i / 2 - 1, n = n + i / 2;
      const c = (
        // @ts-expect-error
        St("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        c - s / 2,
        c + s / 2
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
  Np as GenomeFeatureViewer,
  Ep as fetchApolloAPIData,
  Tp as fetchNCListData,
  Ap as fetchTabixVcfData,
  Sp as parseLocString
};
