function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function uo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function La(t) {
  let e, n, i;
  t.length !== 2 ? (e = vn, n = (o, c) => vn(t(o), c), i = (o, c) => t(o) - c) : (e = t === vn || t === uo ? t : ho, n = t, i = t);
  function r(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(o[m], c) < 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function a(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(o[m], c) <= 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function s(o, c, f = 0, u = o.length) {
    const m = r(o, c, f, u - 1);
    return m > f && i(o[m - 1], c) > -i(o[m], c) ? m - 1 : m;
  }
  return { left: r, center: s, right: a };
}
function ho() {
  return 0;
}
function po(t) {
  return t === null ? NaN : +t;
}
const _o = La(vn), go = _o.right;
La(po).center;
const mo = Math.sqrt(50), vo = Math.sqrt(10), wo = Math.sqrt(2);
function En(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= mo ? 10 : a >= vo ? 5 : a >= wo ? 2 : 1;
  let o, c, f;
  return r < 0 ? (f = Math.pow(10, -r) / s, o = Math.round(t * f), c = Math.round(e * f), o / f < t && ++o, c / f > e && --c, f = -f) : (f = Math.pow(10, r) * s, o = Math.round(t / f), c = Math.round(e / f), o * f < t && ++o, c * f > e && --c), c < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, c, f];
}
function yo(t, e, n) {
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
function bo(t) {
  return t;
}
var wn = 1, Gn = 2, mi = 3, an = 4, or = 1e-6;
function ko(t) {
  return "translate(" + t + ",0)";
}
function To(t) {
  return "translate(0," + t + ")";
}
function Eo(t) {
  return (e) => +t(e);
}
function So(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ao() {
  return !this.__axis;
}
function Oa(t, e) {
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === wn || t === an ? -1 : 1, u = t === an || t === Gn ? "x" : "y", m = t === wn || t === mi ? ko : To;
  function p(d) {
    var v = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), O = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : bo), M = Math.max(a, 0) + o, $ = e.range(), T = +$[0] + c, k = +$[$.length - 1] + c, b = (e.bandwidth ? So : Eo)(e.copy(), c), A = d.selection ? d.selection() : d, D = A.selectAll(".domain").data([null]), E = A.selectAll(".tick").data(v, e).order(), z = E.exit(), F = E.enter().append("g").attr("class", "tick"), C = E.select("line"), y = E.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), E = E.merge(F), C = C.merge(F.append("line").attr("stroke", "currentColor").attr(u + "2", f * a)), y = y.merge(F.append("text").attr("fill", "currentColor").attr(u, f * M).attr("dy", t === wn ? "0em" : t === mi ? "0.71em" : "0.32em")), d !== A && (D = D.transition(d), E = E.transition(d), C = C.transition(d), y = y.transition(d), z = z.transition(d).attr("opacity", or).attr("transform", function(V) {
      return isFinite(V = b(V)) ? m(V + c) : this.getAttribute("transform");
    }), F.attr("opacity", or).attr("transform", function(V) {
      var P = this.parentNode.__axis;
      return m((P && isFinite(P = P(V)) ? P : b(V)) + c);
    })), z.remove(), D.attr("d", t === an || t === Gn ? s ? "M" + f * s + "," + T + "H" + c + "V" + k + "H" + f * s : "M" + c + "," + T + "V" + k : s ? "M" + T + "," + f * s + "V" + c + "H" + k + "V" + f * s : "M" + T + "," + c + "H" + k), E.attr("opacity", 1).attr("transform", function(V) {
      return m(b(V) + c);
    }), C.attr(u + "2", f * a), y.attr(u, f * M).text(O), A.filter(Ao).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Gn ? "start" : t === an ? "end" : "middle"), A.each(function() {
      this.__axis = b;
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
  return Oa(wn, t);
}
function $o(t) {
  return Oa(mi, t);
}
var No = { value: () => {
} };
function Ca() {
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
yn.prototype = Ca.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, i = Io(t + "", n), r, a = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((r = (t = i[a]).type) && (r = Do(n[r], t.name))) return r;
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
function Do(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function cr(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = No, t = t.slice(0, i).concat(t.slice(i + 1));
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
function Ro(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === vi && e.documentElement.namespaceURI === vi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Mo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Fa(t) {
  var e = Hn(t);
  return (e.local ? Mo : Ro)(e);
}
function Lo() {
}
function zi(t) {
  return t == null ? Lo : function() {
    return this.querySelector(t);
  };
}
function Oo(t) {
  typeof t != "function" && (t = zi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
  return new Ht(i, this._parents);
}
function za(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Co() {
  return [];
}
function Ba(t) {
  return t == null ? Co : function() {
    return this.querySelectorAll(t);
  };
}
function Fo(t) {
  return function() {
    return za(t.apply(this, arguments));
  };
}
function zo(t) {
  typeof t == "function" ? t = Fo(t) : t = Ba(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new Ht(i, r);
}
function Ha(t) {
  return function() {
    return this.matches(t);
  };
}
function Pa(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Bo = Array.prototype.find;
function Ho(t) {
  return function() {
    return Bo.call(this.children, t);
  };
}
function Po() {
  return this.firstElementChild;
}
function Vo(t) {
  return this.select(t == null ? Po : Ho(typeof t == "function" ? t : Pa(t)));
}
var Uo = Array.prototype.filter;
function Zo() {
  return Array.from(this.children);
}
function qo(t) {
  return function() {
    return Uo.call(this.children, t);
  };
}
function Go(t) {
  return this.selectAll(t == null ? Zo : qo(typeof t == "function" ? t : Pa(t)));
}
function Wo(t) {
  typeof t != "function" && (t = Ha(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Ht(i, this._parents);
}
function Va(t) {
  return new Array(t.length);
}
function Xo() {
  return new Ht(this._enter || this._groups.map(Va), this._parents);
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
function Yo(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Sn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Jo(t, e, n, i, r, a, s) {
  var o, c, f = /* @__PURE__ */ new Map(), u = e.length, m = a.length, p = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = d = s.call(c, c.__data__, o, e) + "", f.has(d) ? r[o] = c : f.set(d, c));
  for (o = 0; o < m; ++o)
    d = s.call(t, a[o], o, a) + "", (c = f.get(d)) ? (i[o] = c, c.__data__ = a[o], f.delete(d)) : n[o] = new Sn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f.get(p[o]) === c && (r[o] = c);
}
function Qo(t) {
  return t.__data__;
}
function jo(t, e) {
  if (!arguments.length) return Array.from(this, Qo);
  var n = e ? Jo : Yo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], p = m.length, d = tl(t.call(u, u && u.__data__, f, i)), v = d.length, O = o[f] = new Array(v), M = s[f] = new Array(v), $ = c[f] = new Array(p);
    n(u, m, O, M, $, d, e);
    for (var T = 0, k = 0, b, A; T < v; ++T)
      if (b = O[T]) {
        for (T >= k && (k = T + 1); !(A = M[k]) && ++k < v; ) ;
        b._next = A || null;
      }
  }
  return s = new Ht(s, i), s._enter = o, s._exit = c, s;
}
function tl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function el() {
  return new Ht(this._exit || this._groups.map(Va), this._parents);
}
function nl(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function il(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), c = 0; c < s; ++c)
    for (var f = n[c], u = i[c], m = f.length, p = o[c] = new Array(m), d, v = 0; v < m; ++v)
      (d = f[v] || u[v]) && (p[v] = d);
  for (; c < r; ++c)
    o[c] = n[c];
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
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
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
  var n = Hn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? pl : dl : typeof e == "function" ? n.local ? vl : ml : n.local ? gl : _l)(n, e));
}
function Ua(t) {
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
  return arguments.length > 1 ? this.each((e == null ? yl : typeof e == "function" ? bl : xl)(t, e, n ?? "")) : Oe(this.node(), t);
}
function Oe(t, e) {
  return t.style.getPropertyValue(e) || Ua(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Tl(t) {
  return function() {
    delete this[t];
  };
}
function El(t, e) {
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
function Al(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Tl : typeof e == "function" ? Sl : El)(t, e)) : this.node()[t];
}
function Za(t) {
  return t.trim().split(/^|\s+/);
}
function Bi(t) {
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
function Ga(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Wa(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function $l(t) {
  return function() {
    Ga(this, t);
  };
}
function Nl(t) {
  return function() {
    Wa(this, t);
  };
}
function Il(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ga : Wa)(this, t);
  };
}
function Dl(t, e) {
  var n = Za(t + "");
  if (arguments.length < 2) {
    for (var i = Bi(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Il : e ? $l : Nl)(n, e));
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
function zl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Bl(t) {
  return arguments.length ? this.each(t == null ? Cl : (typeof t == "function" ? zl : Fl)(t)) : this.node().innerHTML;
}
function Hl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Pl() {
  return this.each(Hl);
}
function Vl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ul() {
  return this.each(Vl);
}
function Zl(t) {
  var e = typeof t == "function" ? t : Fa(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ql() {
  return null;
}
function Gl(t, e) {
  var n = typeof t == "function" ? t : Fa(t), i = e == null ? ql : typeof e == "function" ? e : zi(e);
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
      for (var c = 0, f = o.length, u; c < f; ++c)
        for (r = 0, u = o[c]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? nc : ec, r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Xa(t, e, n) {
  var i = Ua(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function rc(t, e) {
  return function() {
    return Xa(this, t, e);
  };
}
function ac(t, e) {
  return function() {
    return Xa(this, t, e.apply(this, arguments));
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
var Hi = [null];
function Ht(t, e) {
  this._groups = t, this._parents = e;
}
function Se() {
  return new Ht([[document.documentElement]], Hi);
}
function lc() {
  return this;
}
Ht.prototype = Se.prototype = {
  constructor: Ht,
  select: Oo,
  selectAll: zo,
  selectChild: Vo,
  selectChildren: Go,
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
  property: Al,
  classed: Dl,
  text: Ol,
  html: Bl,
  raise: Pl,
  lower: Ul,
  append: Zl,
  insert: Gl,
  remove: Xl,
  clone: Jl,
  datum: Ql,
  on: ic,
  dispatch: sc,
  [Symbol.iterator]: oc
};
function wt(t) {
  return typeof t == "string" ? new Ht([[document.querySelector(t)]], [document.documentElement]) : new Ht([[t]], Hi);
}
function Qt(t) {
  return typeof t == "string" ? new Ht([document.querySelectorAll(t)], [document.documentElement]) : new Ht([za(t)], Hi);
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
var Ke = 0.7, An = 1 / Ke, Me = "\\s*([+-]?\\d+)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", re = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cc = /^#([0-9a-f]{3,8})$/, fc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), uc = new RegExp(`^rgb\\(${re},${re},${re}\\)$`), hc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ye}\\)$`), dc = new RegExp(`^rgba\\(${re},${re},${re},${Ye}\\)$`), pc = new RegExp(`^hsl\\(${Ye},${re},${re}\\)$`), _c = new RegExp(`^hsla\\(${Ye},${re},${re},${Ye}\\)$`), ur = {
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
Pi(en, be, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hr,
  // Deprecated! Use color.formatHex.
  formatHex: hr,
  formatHex8: gc,
  formatHsl: mc,
  formatRgb: dr,
  toString: dr
});
function hr() {
  return this.rgb().formatHex();
}
function gc() {
  return this.rgb().formatHex8();
}
function mc() {
  return Ya(this).formatHsl();
}
function dr() {
  return this.rgb().formatRgb();
}
function be(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = cc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pr(e) : n === 3 ? new Vt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = fc.exec(t)) ? new Vt(e[1], e[2], e[3], 1) : (e = uc.exec(t)) ? new Vt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = hc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = dc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = pc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, 1) : (e = _c.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, e[4]) : ur.hasOwnProperty(t) ? pr(ur[t]) : t === "transparent" ? new Vt(NaN, NaN, NaN, 0) : null;
}
function pr(t) {
  return new Vt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function sn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new Vt(t, e, n, i);
}
function vc(t) {
  return t instanceof en || (t = be(t)), t ? (t = t.rgb(), new Vt(t.r, t.g, t.b, t.opacity)) : new Vt();
}
function wi(t, e, n, i) {
  return arguments.length === 1 ? vc(t) : new Vt(t, e, n, i ?? 1);
}
function Vt(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Pi(Vt, wi, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new Vt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new Vt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Vt(ye(this.r), ye(this.g), ye(this.b), $n(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: wc,
  formatRgb: gr,
  toString: gr
}));
function _r() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}`;
}
function wc() {
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
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new te(t, e, n, i);
}
function Ya(t) {
  if (t instanceof te) return new te(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = be(t)), !t) return new te();
  if (t instanceof te) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, c = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + r : 2 - a - r, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new te(s, o, c, t.opacity);
}
function yc(t, e, n, i) {
  return arguments.length === 1 ? Ya(t) : new te(t, e, n, i ?? 1);
}
function te(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Pi(te, yc, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new te(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new te(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new Vt(
      Wn(t >= 240 ? t - 240 : t + 120, r, i),
      Wn(t, r, i),
      Wn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new te(vr(this.h), on(this.s), on(this.l), $n(this.opacity));
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
function bc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function kc(t) {
  return (t = +t) == 1 ? Ja : function(e, n) {
    return n - e ? bc(e, n, t) : Vi(isNaN(e) ? n : e);
  };
}
function Ja(t, e) {
  var n = e - t;
  return n ? xc(t, n) : Vi(isNaN(t) ? e : t);
}
const Nn = function t(e) {
  var n = kc(e);
  function i(r, a) {
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), c = n(r.b, a.b), f = Ja(r.opacity, a.opacity);
    return function(u) {
      return r.r = s(u), r.g = o(u), r.b = c(u), r.opacity = f(u), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Tc(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(a) {
    for (r = 0; r < n; ++r) i[r] = t[r] * (1 - a) + e[r] * a;
    return i;
  };
}
function Ec(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Sc(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = Ui(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < i; ++s) a[s] = r[s](o);
    return a;
  };
}
function Ac(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function jt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function $c(t, e) {
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
function Qa(t, e) {
  var n = yi.lastIndex = Xn.lastIndex = 0, i, r, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Xn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, c.push({ i: s, x: jt(i, r) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Ic(c[0].x) : Nc(e) : (e = c.length, function(f) {
    for (var u = 0, m; u < e; ++u) o[(m = c[u]).i] = m.x(f);
    return o.join("");
  });
}
function Ui(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Vi(e) : (n === "number" ? jt : n === "string" ? (i = be(e)) ? (e = i, Nn) : Qa : e instanceof be ? Nn : e instanceof Date ? Ac : Ec(e) ? Tc : Array.isArray(e) ? Sc : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? $c : jt)(t, e);
}
function Dc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var wr = 180 / Math.PI, xi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ja(t, e, n, i, r, a) {
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
function Rc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? xi : ja(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Mc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? xi : (t = t.matrix, ja(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ts(t, e, n, i) {
  function r(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, u, m, p, d, v) {
    if (f !== m || u !== p) {
      var O = d.push("translate(", null, e, null, n);
      v.push({ i: O - 4, x: jt(f, m) }, { i: O - 2, x: jt(u, p) });
    } else (m || p) && d.push("translate(" + m + e + p + n);
  }
  function s(f, u, m, p) {
    f !== u ? (f - u > 180 ? u += 360 : u - f > 180 && (f += 360), p.push({ i: m.push(r(m) + "rotate(", null, i) - 2, x: jt(f, u) })) : u && m.push(r(m) + "rotate(" + u + i);
  }
  function o(f, u, m, p) {
    f !== u ? p.push({ i: m.push(r(m) + "skewX(", null, i) - 2, x: jt(f, u) }) : u && m.push(r(m) + "skewX(" + u + i);
  }
  function c(f, u, m, p, d, v) {
    if (f !== m || u !== p) {
      var O = d.push(r(d) + "scale(", null, ",", null, ")");
      v.push({ i: O - 4, x: jt(f, m) }, { i: O - 2, x: jt(u, p) });
    } else (m !== 1 || p !== 1) && d.push(r(d) + "scale(" + m + "," + p + ")");
  }
  return function(f, u) {
    var m = [], p = [];
    return f = t(f), u = t(u), a(f.translateX, f.translateY, u.translateX, u.translateY, m, p), s(f.rotate, u.rotate, m, p), o(f.skewX, u.skewX, m, p), c(f.scaleX, f.scaleY, u.scaleX, u.scaleY, m, p), f = u = null, function(d) {
      for (var v = -1, O = p.length, M; ++v < O; ) m[(M = p[v]).i] = M.x(d);
      return m.join("");
    };
  };
}
var Lc = ts(Rc, "px, ", "px)", "deg)"), Oc = ts(Mc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, es = 1e3, In, Ze, Dn = 0, ke = 0, Pn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, ns = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zi() {
  return ke || (ns(Cc), ke = Je.now() + Pn);
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
    n = (n == null ? Zi() : +n) + (e == null ? 0 : +e), !this._next && Ze !== this && (Ze ? Ze._next = this : In = this, Ze = this), this._call = t, this._time = n, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function is(t, e, n) {
  var i = new Rn();
  return i.restart(t, e, n), i;
}
function Fc() {
  Zi(), ++Ce;
  for (var t = In, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ce;
}
function yr() {
  ke = (Dn = Je.now()) + Pn, Ce = Ue = 0;
  try {
    Fc();
  } finally {
    Ce = 0, Bc(), ke = 0;
  }
}
function zc() {
  var t = Je.now(), e = t - Dn;
  e > es && (Pn -= e, Dn = t);
}
function Bc() {
  for (var t, e = In, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : In = n);
  Ze = t, bi(i);
}
function bi(t) {
  if (!Ce) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yr, t - Je.now() - Pn)), He && (He = clearInterval(He))) : (He || (Dn = Je.now(), He = setInterval(zc, es)), Ce = 1, ns(yr));
  }
}
function xr(t, e, n) {
  var i = new Rn();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var Hc = Ca("start", "end", "cancel", "interrupt"), Pc = [], rs = 0, br = 1, ki = 2, xn = 3, kr = 4, Ti = 5, bn = 6;
function Vn(t, e, n, i, r, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Vc(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Hc,
    tween: Pc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: rs
  });
}
function qi(t, e) {
  var n = ee(t, e);
  if (n.state > rs) throw new Error("too late; already scheduled");
  return n;
}
function ae(t, e) {
  var n = ee(t, e);
  if (n.state > xn) throw new Error("too late; already running");
  return n;
}
function ee(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Vc(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = is(a, 0, n.time);
  function a(f) {
    n.state = br, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  function s(f) {
    var u, m, p, d;
    if (n.state !== br) return c();
    for (u in i)
      if (d = i[u], d.name === n.name) {
        if (d.state === xn) return xr(s);
        d.state === kr ? (d.state = bn, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete i[u]) : +u < e && (d.state = bn, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete i[u]);
      }
    if (xr(function() {
      n.state === xn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = xn, r = new Array(p = n.tween.length), u = 0, m = -1; u < p; ++u)
        (d = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++m] = d);
      r.length = m + 1;
    }
  }
  function o(f) {
    for (var u = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = Ti, 1), m = -1, p = r.length; ++m < p; )
      r[m].call(t, u);
    n.state === Ti && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = bn, n.timer.stop(), delete i[e];
    for (var f in i) return;
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
      r = i.state > ki && i.state < Ti, i.state = bn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function Zc(t) {
  return this.each(function() {
    Uc(this, t);
  });
}
function qc(t, e) {
  var n, i;
  return function() {
    var r = ae(this, t), a = r.tween;
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
function Gc(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = ae(this, t), s = a.tween;
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
function Wc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = ee(this.node(), n).tween, r = 0, a = i.length, s; r < a; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? qc : Gc)(n, t, e));
}
function Gi(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = ae(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return ee(r, i).value[e];
  };
}
function as(t, e) {
  var n;
  return (typeof e == "number" ? jt : e instanceof be ? Nn : (n = be(e)) ? (e = n, Nn) : Qa)(t, e);
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
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function jc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function tf(t, e) {
  var n = Hn(t), i = n === "transform" ? Oc : as;
  return this.attrTween(t, typeof e == "function" ? (n.local ? jc : Qc)(n, i, Gi(this, "attr." + t, e)) : e == null ? (n.local ? Kc : Xc)(n) : (n.local ? Jc : Yc)(n, i, e));
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
  var i = Hn(t);
  return this.tween(n, (i.local ? rf : af)(i, e));
}
function of(t, e) {
  return function() {
    qi(this, t).delay = +e.apply(this, arguments);
  };
}
function lf(t, e) {
  return e = +e, function() {
    qi(this, t).delay = e;
  };
}
function cf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? of : lf)(e, t)) : ee(this.node(), e).delay;
}
function ff(t, e) {
  return function() {
    ae(this, t).duration = +e.apply(this, arguments);
  };
}
function uf(t, e) {
  return e = +e, function() {
    ae(this, t).duration = e;
  };
}
function hf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ff : uf)(e, t)) : ee(this.node(), e).duration;
}
function df(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ae(this, t).ease = e;
  };
}
function pf(t) {
  var e = this._id;
  return arguments.length ? this.each(df(e, t)) : ee(this.node(), e).ease;
}
function _f(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ae(this, t).ease = n;
  };
}
function gf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_f(this._id, t));
}
function mf(t) {
  typeof t != "function" && (t = Ha(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new fe(i, this._parents, this._name, this._id);
}
function vf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], u = c.length, m = s[o] = new Array(u), p, d = 0; d < u; ++d)
      (p = c[d] || f[d]) && (m[d] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new fe(s, this._parents, this._name, this._id);
}
function wf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function yf(t, e, n) {
  var i, r, a = wf(e) ? qi : ae;
  return function() {
    var s = a(this, t), o = s.on;
    o !== i && (r = (i = o).copy()).on(e, n), s.on = r;
  };
}
function xf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ee(this.node(), n).on.on(t) : this.each(yf(n, t, e));
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
function Tf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = zi(t));
  for (var i = this._groups, r = i.length, a = new Array(r), s = 0; s < r; ++s)
    for (var o = i[s], c = o.length, f = a[s] = new Array(c), u, m, p = 0; p < c; ++p)
      (u = o[p]) && (m = t.call(u, u.__data__, p, o)) && ("__data__" in u && (m.__data__ = u.__data__), f[p] = m, Vn(f[p], e, n, p, f, ee(u, n)));
  return new fe(a, this._parents, e, n);
}
function Ef(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ba(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var c = i[o], f = c.length, u, m = 0; m < f; ++m)
      if (u = c[m]) {
        for (var p = t.call(u, u.__data__, m, c), d, v = ee(u, n), O = 0, M = p.length; O < M; ++O)
          (d = p[O]) && Vn(d, e, n, O, p, v);
        a.push(p), s.push(u);
      }
  return new fe(a, s, e, n);
}
var Sf = Se.prototype.constructor;
function Af() {
  return new Sf(this._groups, this._parents);
}
function $f(t, e) {
  var n, i, r;
  return function() {
    var a = Oe(this, t), s = (this.style.removeProperty(t), Oe(this, t));
    return a === s ? null : a === n && s === i ? r : r = e(n = a, i = s);
  };
}
function ss(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Nf(t, e, n) {
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
function Df(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = ae(this, t), f = c.on, u = c.value[a] == null ? o || (o = ss(e)) : void 0;
    (f !== n || r !== u) && (i = (n = f).copy()).on(s, r = u), c.on = i;
  };
}
function Rf(t, e, n) {
  var i = (t += "") == "transform" ? Lc : as;
  return e == null ? this.styleTween(t, $f(t, i)).on("end.style." + t, ss(t)) : typeof e == "function" ? this.styleTween(t, If(t, i, Gi(this, "style." + t, e))).each(Df(this._id, t)) : this.styleTween(t, Nf(t, i, e), n).on("end.style." + t, null);
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
function zf(t) {
  return this.tween("text", typeof t == "function" ? Ff(Gi(this, "text", t)) : Cf(t == null ? "" : t + ""));
}
function Bf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Hf(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Bf(r)), e;
  }
  return i._value = t, i;
}
function Pf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Hf(t));
}
function Vf() {
  for (var t = this._name, e = this._id, n = os(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      if (c = s[f]) {
        var u = ee(c, e);
        Vn(c, t, n, f, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new fe(i, this._parents, t, n);
}
function Uf() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var f = ae(this, i), u = f.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
    }), r === 0 && a();
  });
}
var Zf = 0;
function fe(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function os() {
  return ++Zf;
}
var oe = Se.prototype;
fe.prototype = {
  constructor: fe,
  select: Tf,
  selectAll: Ef,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: mf,
  merge: vf,
  selection: Af,
  transition: Vf,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: xf,
  attr: tf,
  attrTween: sf,
  style: Rf,
  styleTween: Of,
  text: zf,
  textTween: Pf,
  remove: kf,
  tween: Wc,
  delay: cf,
  duration: hf,
  ease: pf,
  easeVarying: gf,
  end: Uf,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function qf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Gf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: qf
};
function Wf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Xf(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = os(), (n = Gf).time = Zi(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && Vn(c, t, e, f, s, n || Wf(c, e));
  return new fe(i, this._parents, t, e);
}
Se.prototype.interrupt = Zc;
Se.prototype.transition = Xf;
const Ei = Math.PI, Si = 2 * Ei, me = 1e-6, Kf = Si - me;
function ls(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Yf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return ls;
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
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? ls : Yf(e);
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
    let s = this._x1, o = this._y1, c = i - e, f = r - n, u = s - e, m = o - n, p = u * u + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > me) if (!(Math.abs(m * c - f * u) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let d = i - s, v = r - o, O = c * c + f * f, M = d * d + v * v, $ = Math.sqrt(O), T = Math.sqrt(p), k = a * Math.tan((Ei - Math.acos((O + p - M) / (2 * $ * T))) / 2), b = k / T, A = k / $;
      Math.abs(b - 1) > me && this._append`L${e + b * u},${n + b * m}`, this._append`A${a},${a},0,0,${+(m * d > u * v)},${this._x1 = e + A * c},${this._y1 = n + A * f}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), c = i * Math.sin(r), f = e + o, u = n + c, m = 1 ^ s, p = s ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${u}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - u) > me) && this._append`L${f},${u}`, i && (p < 0 && (p = p % Si + Si), p > Kf ? this._append`A${i},${i},0,1,${m},${e - o},${n - c}A${i},${i},0,1,${m},${this._x1 = f},${this._y1 = u}` : p > me && this._append`A${i},${i},0,${+(p >= Ei)},${m},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
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
function jf(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], c = 0; r > 0 && o > 0 && (c + o + 1 > i && (o = Math.max(1, i - c)), a.push(n.substring(r -= o, r + o)), !((c += o + 1) > i)); )
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
function Ln(t) {
  if (!(e = eu.exec(t))) throw new Error("invalid format: " + t);
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
var cs;
function iu(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (cs = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
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
  d: Qf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Tr(t * 100, e),
  r: Tr,
  s: iu,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Ar = Array.prototype.map, $r = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ru(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : jf(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : tu(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(m) {
    m = Ln(m);
    var p = m.fill, d = m.align, v = m.sign, O = m.symbol, M = m.zero, $ = m.width, T = m.comma, k = m.precision, b = m.trim, A = m.type;
    A === "n" ? (T = !0, A = "g") : Er[A] || (k === void 0 && (k = 12), b = !0, A = "g"), (M || p === "0" && d === "=") && (M = !0, p = "0", d = "=");
    var D = O === "$" ? n : O === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : "", E = O === "$" ? i : /[%p]/.test(A) ? s : "", z = Er[A], F = /[defgprs%]/.test(A);
    k = k === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function C(y) {
      var V = D, P = E, J, nt, lt;
      if (A === "c")
        P = z(y) + P, y = "";
      else {
        y = +y;
        var X = y < 0 || 1 / y < 0;
        if (y = isNaN(y) ? c : z(Math.abs(y), k), b && (y = nu(y)), X && +y == 0 && v !== "+" && (X = !1), V = (X ? v === "(" ? v : o : v === "-" || v === "(" ? "" : v) + V, P = (A === "s" ? $r[8 + cs / 3] : "") + P + (X && v === "(" ? ")" : ""), F) {
          for (J = -1, nt = y.length; ++J < nt; )
            if (lt = y.charCodeAt(J), 48 > lt || lt > 57) {
              P = (lt === 46 ? r + y.slice(J + 1) : y.slice(J)) + P, y = y.slice(0, J);
              break;
            }
        }
      }
      T && !M && (y = e(y, 1 / 0));
      var et = V.length + y.length + P.length, U = et < $ ? new Array($ - et + 1).join(p) : "";
      switch (T && M && (y = e(U + y, U.length ? $ - P.length : 1 / 0), U = ""), d) {
        case "<":
          y = V + y + P + U;
          break;
        case "=":
          y = V + U + y + P;
          break;
        case "^":
          y = U.slice(0, et = U.length >> 1) + V + y + P + U.slice(et);
          break;
        default:
          y = U + V + y + P;
          break;
      }
      return a(y);
    }
    return C.toString = function() {
      return m + "";
    }, C;
  }
  function u(m, p) {
    var d = f((m = Ln(m), m.type = "f", m)), v = Math.max(-8, Math.min(8, Math.floor(Fe(p) / 3))) * 3, O = Math.pow(10, -v), M = $r[8 + v / 3];
    return function($) {
      return d(O * $) + M;
    };
  }
  return {
    format: f,
    formatPrefix: u
  };
}
var cn, fs, us;
au({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function au(t) {
  return cn = ru(t), fs = cn.format, us = cn.formatPrefix, cn;
}
function su(t) {
  return Math.max(0, -Fe(Math.abs(t)));
}
function ou(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Fe(e) / 3))) * 3 - Fe(Math.abs(t)));
}
function lu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Fe(e) - Fe(t)) + 1;
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
var Nr = [0, 1];
function Re(t) {
  return t;
}
function Ai(t, e) {
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
  return r < i ? (i = Ai(r, i), a = n(s, a)) : (i = Ai(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function pu(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Ai(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = go(t, o, 1, i) - 1;
    return a[c](r[c](o));
  };
}
function _u(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function gu() {
  var t = Nr, e = Nr, n = Ui, i, r, a, s = Re, o, c, f;
  function u() {
    var p = Math.min(t.length, e.length);
    return s !== Re && (s = hu(t[0], t[p - 1])), o = p > 2 ? pu : du, c = f = null, m;
  }
  function m(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = o(t.map(i), e, n)))(i(s(p)));
  }
  return m.invert = function(p) {
    return s(r((f || (f = o(e, t.map(i), jt)))(p)));
  }, m.domain = function(p) {
    return arguments.length ? (t = Array.from(p, uu), u()) : t.slice();
  }, m.range = function(p) {
    return arguments.length ? (e = Array.from(p), u()) : e.slice();
  }, m.rangeRound = function(p) {
    return e = Array.from(p), n = Dc, u();
  }, m.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : Re, u()) : s !== Re;
  }, m.interpolate = function(p) {
    return arguments.length ? (n = p, u()) : n;
  }, m.unknown = function(p) {
    return arguments.length ? (a = p, m) : a;
  }, function(p, d) {
    return i = p, r = d, u();
  };
}
function mu() {
  return gu()(Re, Re);
}
function vu(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = Ln(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = ou(r, s)) && (i.precision = a), us(i, s);
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
  return fs(i);
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
  var t = mu();
  return t.copy = function() {
    return _u(t, he());
  }, cu.apply(t, arguments), wu(t);
}
function fn(t) {
  return function() {
    return t;
  };
}
const Xi = Math.sqrt, hs = Math.PI, yu = 2 * hs;
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
    const n = Xi(e / hs);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, yu);
  }
}, Kn = Xi(3), ds = {
  draw(t, e) {
    const n = -Xi(e / (Kn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Kn * n, -n), t.lineTo(Kn * n, -n), t.closePath();
  }
};
function ps(t, e) {
  let n = null, i = xu(r);
  t = typeof t == "function" ? t : fn(t || bu), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
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
function Ki(t, e, n) {
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
function _s(t, e, n, i, r) {
  var f, u, m;
  let a = -1, s = -1;
  const o = [];
  if (!i && !r) {
    for (const p of t) {
      const d = p.children;
      d && d.forEach((v) => {
        e.includes(v.type) && ((a < 0 || v.fmin < a) && (a = v.fmin), (s < 0 || v.fmax > s) && (s = v.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  const c = [];
  for (const p of t)
    (i && ((f = p.name) == null ? void 0 : f.toLowerCase().includes(i.toLowerCase())) || r && (((u = p.name) == null ? void 0 : u.includes(r)) || ((m = p.id) == null ? void 0 : m.includes(r)))) && c.push(p);
  if (c.length === 0) {
    for (const p of t) {
      const d = p.children;
      d && d.forEach((v) => {
        e.includes(v.type) && ((a < 0 || v.fmin < a) && (a = v.fmin), (s < 0 || v.fmax > s) && (s = v.fmax));
      });
    }
    return { fmin: a, fmax: s };
  }
  for (const p of c) {
    const d = p.children;
    d && d.forEach((v) => {
      if (e.includes(v.type)) {
        if (n) {
          const O = v.fmin < n.start, M = v.fmax > n.end;
          if (O && M)
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
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = Qt(i).nodes();
  let a = 0;
  return r.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function Yi(t, e) {
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
    let a = wt(this).attr("x"), s = +wt(this).attr("width");
    (s === 0 || Number.isNaN(s)) && (s = 3, a = String(+a - s / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", s).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
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
], Tu = [
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
function gs(t) {
  if (!t)
    return "black";
  const e = Ge(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const i = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return gs(i);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = kn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? kn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? kn.three_prime_UTR_variant.color : "#f0f";
}
const xe = 10, ue = 10;
function Ji(t) {
  return `${t},${xe} ${t + ue / 2},${xe / 2} ${t},0 ${t - ue / 2},${xe / 2}`;
}
function ms(t) {
  return `${t - ue / 2},${xe} ${t},0 ${t + ue / 2},${xe}`;
}
function Eu(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let i = !0, r = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => r != a.row && i ? !1 : (r != a.row && (r = a.row, i = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (i = !1), !0)), i ? r : r + 1;
  }
}
function vs(t) {
  return `${t - ue / 2},${xe} ${t + ue / 2},${xe} ${t - ue / 2},0 ${t + ue / 2},0`;
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
function ws(t, e) {
  const n = [];
  return t.forEach((i) => {
    var f, u;
    const r = ys(i), { type: a, fmax: s, fmin: o } = i, c = Au(
      n,
      i,
      e
    );
    if (c >= 0 && a != "deletion") {
      const m = n[c], p = m.variantSet ? m.variantSet.findIndex(
        (d) => d.type === a && d.consequence === r
      ) : -1;
      if (p >= 0) {
        const d = Math.min(
          m.variantSet[p].fmin,
          o
        ), v = Math.max(
          m.variantSet[p].fmax,
          s
        );
        m.fmin = d, m.fmax = v, m.variantSet[p].fmin = d, m.variantSet[p].fmax = v, (f = m.variantSet[p].variants) == null || f.push(
          i
        );
      } else {
        const d = Math.min(m.fmin, o), v = Math.max(m.fmax, s);
        m.fmin = d, m.fmax = v, m.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      (u = m.variants) == null || u.push(i), m.fmin = Math.min(o, m.fmin), m.fmax = Math.max(s, m.fmax), n[c] = m;
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
    let m;
    s === "ALT_MISSING" ? (m = "unknown length inserted", s = "n+") : m = `${s.length - 1}bp inserted`, c = `${u}; ${m}`;
  } else
    c = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td style="word-break: break-all; max-width: 600px;">${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td style="word-break: break-all; max-width: 600px;">${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
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
  return t.map((e) => gs(e.consequence));
}
function ys(t) {
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
    consequence: ys(t),
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
function Iu(t, e = 15) {
  const n = {};
  t.forEach((r) => {
    if (r.type.toLowerCase() === "deletion")
      return;
    let a = "";
    const s = r.type.toLowerCase();
    s === "snv" || s === "point_mutation" ? a = "snv" : s === "insertion" ? a = "insertion" : (s === "delins" || s === "substitution" || s === "indel" || s === "mnv") && (a = "delins"), a && (n[a] || (n[a] = []), n[a].push(r));
  });
  const i = [];
  return Object.entries(n).forEach(([r, a]) => {
    a.sort((o, c) => o.fmin - c.fmin);
    const s = [];
    a.forEach((o) => {
      let c = !1, f = 0;
      const u = o.pixelFmin !== void 0 ? o.pixelFmin : o.fmin, m = o.pixelFmax !== void 0 ? o.pixelFmax : o.fmax;
      for (; !c; )
        s[f] || (s[f] = []), s[f].some((d) => {
          const v = d.pixelFmin - e, O = d.pixelFmax + e;
          return !(m < v || u > O);
        }) ? f++ : (s[f].push({ pixelFmin: u, pixelFmax: m }), i.push({ variant: o, row: f, type: r }), c = !0);
    });
  }), i;
}
function Ri(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Mt(t) {
  return t == "unknown" ? Ri("grey", t.replace(/_/g, " ")) : Ri(
    kn[t].color,
    t.replace(/_/g, " ")
  );
}
function Du() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ji(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ms(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Mt("transcript_ablation")}</li>`, t += `<li>${Mt("splice_acceptor_variant")}</li>`, t += `<li>${Mt("splice_donor_variant")}</li>`, t += `<li>${Mt("stop_gained")}</li>`, t += `<li>${Mt("frameshift_variant")}</li>`, t += `<li>${Mt("stop_lost")}</li>`, t += `<li>${Mt("start_lost")}</li>`, t += `<li>${Mt("inframe_insertion")}</li>`, t += `<li>${Mt("inframe_deletion")}</li>`, t += `<li>${Mt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Mt("protein_altering_variant")}</li>`, t += `<li>${Mt("splice_region_variant")}</li>`, t += `<li>${Mt("start_retained_variant")}</li>`, t += `<li>${Mt("stop_retained_variant")}</li>`, t += `<li>${Mt("synonymous_variant")}</li>`, t += `<li>${Mt("coding_sequence_variant")}</li>`, t += `<li>${Mt("five_prime_UTR_variant")}</li>`, t += `<li>${Mt("three_prime_UTR_variant")}</li>`, t += `<li>${Mt("intron_variant")}</li>`, t += `<li>${Mt("non_coding_transcript_variant")}</li>`, t += `<li>${Mt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Ru(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ot(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Ru(t.strand)})</td></tr>`, e += "</tbody></table>", e;
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
class Mu {
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
    trackData: m,
    variantData: p,
    geneBounds: d,
    geneSymbol: v,
    geneId: O
  }) {
    this.trackData = m ?? [], this.variantData = p ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0, this.geneBounds = d, this.geneSymbol = v, this.geneId = O;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.binRatio;
    let f = Nu(r).length;
    if (!this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0)
      throw new Error("trackData must be a non-empty array");
    const u = this.trackData[0].source, m = this.trackData[0].seqId, p = !e || e.length === 0 ? 9 : 30, d = ["UTR", "five_prime_UTR", "three_prime_UTR"], v = ["CDS"], O = ["exon"], M = this.transcriptTypes, $ = _s(n, M, this.geneBounds, this.geneSymbol, this.geneId);
    let T = $.fmin, k = $.fmax;
    this.geneBounds && (T = this.geneBounds.start, k = this.geneBounds.end, $.fmin < T && (T = $.fmin), $.fmax > k && (k = $.fmax));
    const b = 10, A = 10, D = 40, E = 20, z = 2, F = 0, C = 10, y = 10, V = 5, P = 4, J = 20, nt = 10, lt = `0,0 0,${J} ${nt},${nt}`, X = 10, et = 22.5, U = he().domain([T, k]).range([0, s]), it = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,35)"), Dt = a.append("g").attr("class", "label"), Q = {};
    for (let Y = 0, at = d.length; Y < at; Y++)
      Q[d[Y]] = 200;
    for (let Y = 0, at = v.length; Y < at; Y++)
      Q[v[Y]] = 1e3;
    for (let Y = 0, at = O.length; Y < at; Y++)
      Q[O[Y]] = 100;
    const gt = {};
    n = n.sort((Y, at) => {
      if (Y.selected && !at.selected)
        return -1;
      if (!Y.selected && at.selected)
        return 1;
      const dt = Y.fmin || 0, g = at.fmin || 0;
      return dt - g;
    });
    let kt = 0;
    const ht = wt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), j = () => {
      ht.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, ot = ws(
      r,
      (k - T) * o
    );
    (!r || r.length === 0) && a.append("g").attr("class", "variant-message track").attr("transform", "translate(0,5)").append("text").attr("x", 10).attr("y", 15).attr("fill", "#d9534f").attr("opacity", 0.8).attr("font-size", "12px").text("No variant data available for this region. Please contact help@alliancegenome.org if this is unexpected.");
    const bt = ot.filter((Y) => Y.type === "deletion"), Nt = ot.filter((Y) => Y.type !== "deletion"), Tt = [];
    bt.forEach((Y) => {
      var tt;
      const { fmax: at, fmin: dt } = Y, g = this.width, B = Qe(Y), I = Ni(Y), W = Ii(Y), x = $i(I), L = Di(I)[0], h = Eu(Tt, dt, at);
      Tt.push({
        fmin: dt,
        fmax: at,
        row: h
      });
      const H = Math.max(Math.ceil(U(at) - U(dt)), z);
      it.append("rect").attr("class", "variant-deletion").attr("id", `variant-${dt}`).attr("x", U(dt)).attr(
        "transform",
        `translate(0,${(y + V) * h})`
      ).attr("z-index", 30).attr("fill", L).attr("height", y).attr("width", H).on("click", function(l) {
        vt(ht, x, j);
      }).on("mouseover", function(l) {
        const R = wt(this).datum().variant;
        Qt(
          ".variant-deletion"
        ).filter((_) => _.variant === R).style("stroke", "black"), wt(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((_) => _.variant === R).style("opacity", 1);
      }).on("mouseout", function(l) {
        Qt(".variant-deletion").filter((S) => S.selected !== "true").style("stroke", null), wt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: dt,
        fmax: at,
        variant: B + dt,
        alleles: W
      });
      {
        let l = 0;
        l = U(dt);
        const S = (y + V) * f + et, R = Dt.append("text").attr("class", "variantLabel").attr("fill", L).attr("opacity", 0).attr("height", F).attr("transform", `translate(${l},${S})`).text(B).on("click", () => {
          vt(ht, x, j);
        }).datum({ fmin: dt, variant: B + dt }), _ = ((tt = R.node()) == null ? void 0 : tt.getBBox().width) ?? 0;
        if (_ + l > g) {
          const w = _ + l - g;
          l -= w, R.attr(
            "transform",
            `translate(${l},${S})`
          );
        }
      }
    });
    const st = ze(this.viewer), rt = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${st})`), yt = Nt.map((Y) => ({
      ...Y,
      pixelFmin: U(Y.fmin),
      pixelFmax: U(Y.fmax)
    })), It = Iu(yt, 15);
    let ct = 0;
    It.forEach((Y) => {
      Y.row > ct && (ct = Y.row);
    }), f = Math.max(ct + 1, 1);
    const _t = /* @__PURE__ */ new Map();
    It.forEach((Y) => {
      const at = `${Y.variant.fmin}-${Y.type}`;
      _t.set(at, Y.row);
    }), Nt.forEach((Y) => {
      var l;
      const { type: at, fmax: dt, fmin: g } = Y;
      let B = !0, I = !1;
      const W = this.width, x = Qe(Y), L = Ni(Y), h = Ii(Y), H = $i(L), tt = Di(L)[0];
      if (at.toLowerCase() === "snv" || at.toLowerCase() === "point_mutation") {
        I = !0;
        const S = _t.get(`${g}-snv`) || 0;
        rt.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${g}`).attr("points", Ji(U(g))).attr("fill", tt).attr("x", U(g)).attr(
          "transform",
          `translate(0,${(y + V) * S})`
        ).attr("z-index", 30).on("click", () => {
          vt(ht, H, j);
        }).on("mouseover", function(R) {
          const w = wt(this).datum().variant;
          Qt(
            ".variant-SNV"
          ).filter((N) => N.variant === w).style("stroke", "black"), wt(".label").selectAll(
            ".variantLabel,.variantLabelBackground"
          ).raise().filter((N) => N.variant === w).style("opacity", 1);
        }).on("mouseout", () => {
          Qt(".variant-SNV").filter((R) => R.selected != "true").style("stroke", null), wt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
        }).datum({
          fmin: g,
          fmax: dt,
          variant: x + g,
          alleles: h
        });
      } else if (at.toLowerCase() === "insertion") {
        I = !0;
        const S = _t.get(`${g}-insertion`) || 0;
        rt.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${g}`).attr("points", ms(U(g))).attr("fill", tt).attr("x", U(g)).attr(
          "transform",
          `translate(0,${(y + V) * S})`
        ).attr("z-index", 30).on("click", () => {
          vt(ht, H, j);
        }).on("mouseover", function(R) {
          const w = wt(this).datum().variant;
          Qt(
            ".variant-insertion"
          ).filter((N) => N.variant === w).style("stroke", "black"), wt(".label").selectAll(
            ".variantLabel,.variantLabelBackground"
          ).raise().filter((N) => N.variant === w).style("opacity", 1);
        }).on("mouseout", () => {
          Qt(
            ".variant-insertion"
          ).filter((R) => R.selected != "true").style("stroke", null), wt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
        }).datum({
          fmin: g,
          fmax: dt,
          variant: x + g,
          alleles: h
        });
      } else if (at.toLowerCase() === "delins" || at.toLowerCase() === "substitution" || at.toLowerCase() === "indel" || at.toLowerCase() === "mnv") {
        I = !0;
        const S = _t.get(`${g}-delins`) || 0;
        rt.append("polygon").attr("class", "variant-delins").attr("id", `variant-${g}`).attr("points", vs(U(g))).attr("x", U(g)).attr(
          "transform",
          `translate(0,${(y + V) * S})`
        ).attr("fill", tt).attr("z-index", 30).on("click", () => {
          vt(ht, H, j);
        }).on("mouseover", function(R) {
          const w = wt(this).datum().variant;
          Qt(
            ".variant-delins"
          ).filter((N) => N.variant === w).style("stroke", "black"), wt(".label").selectAll(
            ".variantLabel,.variantLabelBackground"
          ).raise().filter((N) => N.variant === w).style("opacity", 1);
        }).on("mouseout", () => {
          Qt(".variant-delins").filter((R) => R.selected != "true").style("stroke", null), wt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
        }).datum({
          fmin: g,
          fmax: dt,
          variant: x + g,
          alleles: h
        });
      } else
        B = !1;
      if (B) {
        let S = 0;
        S = I ? U(g) - X / 2 : U(g);
        const R = (y + V) * f + et, _ = Dt.append("text").attr("class", "variantLabel").attr("fill", tt).attr("opacity", 0).attr("height", F).attr("transform", `translate(${S},${R})`).text(x).on("click", () => {
          vt(ht, H, j);
        }).datum({ fmin: g, variant: x + g }), w = ((l = _.node()) == null ? void 0 : l.getBBox().width) ?? 0;
        if (w + S > W) {
          const N = w + S - W;
          S -= N, _.attr("transform", `translate(${S},35)`);
        }
      }
    });
    const Z = st;
    Dt.attr("transform", `translate(0,${Z})`);
    const xt = ze(this.viewer) + et, Ft = a.append("g").attr("transform", `translate(0,${xt})`).attr("class", "track");
    let Et = 0;
    const Rt = [];
    let Ut = -1, St = -1;
    const vt = this.renderTooltipDescription, qt = [];
    for (let Y = 0; Y < n.length && Et < p; Y++) {
      const at = n[Y];
      let dt = at.children;
      if (dt) {
        const g = at.selected;
        dt = dt.sort((I, W) => {
          const x = I.name || "", L = W.name || "";
          return x.localeCompare(L);
        });
        let B = !1;
        dt.forEach((I) => {
          var x;
          if (e && e.length !== 0 && !(e.includes(I.id) || e.includes(I.name)))
            return;
          if (this.geneBounds) {
            const L = I.fmin < this.geneBounds.start, h = I.fmax > this.geneBounds.end;
            if (L && h)
              return;
          }
          if (qt.includes(I.id))
            return;
          qt.push(I.id);
          const W = I.type;
          if (M.includes(W)) {
            let L = Ki(
              Rt,
              U(I.fmin),
              U(I.fmax)
            );
            if (Et < p) {
              let h = "", H, tt = !1;
              const l = at.name;
              Object.keys(gt).includes(l) || (kt += E, tt = !0, gt[l] = "Green");
              const S = Ft.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${Et * D + 10 + kt})`
              );
              tt && (h = l, H = S.append("text").attr("class", "geneLabel").attr("fill", g ? "sandybrown" : "black").attr("height", F).attr(
                "transform",
                `translate(${U(I.fmin)},-${E})`
              ).text(h).on("click", () => {
                vt(
                  ht,
                  Ot(at),
                  j
                );
              }).datum({
                fmin: I.fmin
              })), S.append("polygon").datum(() => ({
                fmin: I.fmin,
                fmax: I.fmax,
                strand: at.strand
              })).attr("class", "transArrow").attr("points", lt).attr(
                "transform",
                (q) => at.strand > 0 ? `translate(${Number(U(q.fmax))},0)` : `translate(${Number(U(q.fmin))},${J}) rotate(180)`
              ).on("click", () => {
                vt(
                  ht,
                  Ot(I),
                  j
                );
              });
              const R = U(I.fmin), _ = U(I.fmax) - U(I.fmin);
              S.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", P).attr("transform", `translate(${R},0)`).attr("width", _).on("click", () => {
                vt(
                  ht,
                  Ot(I),
                  j
                );
              }).datum({
                fmin: I.fmin,
                fmax: I.fmax
              }), h = I.name || "", H = S.append("text").attr("class", "transcriptLabel").attr("fill", g ? "sandybrown" : "gray").attr("opacity", g ? 1 : 0.5).attr("height", F).attr("transform", `translate(${U(I.fmin)},0)`).text(h).on("click", () => {
                vt(
                  ht,
                  Ot(I),
                  j
                );
              }).datum({
                fmin: I.fmin
              });
              let w = h.length * 2;
              try {
                w = ((x = H.node()) == null ? void 0 : x.getBBox().width) ?? 0;
              } catch {
              }
              Number(w + U(I.fmin)) > s;
              const N = w > U(I.fmax) - U(I.fmin) ? U(I.fmin) + w : U(I.fmax);
              if (Rt[L]) {
                const q = Rt[L];
                q.push(`${U(I.fmin)}:${N}`), Rt[L] = q;
              } else
                Rt[L] = [
                  `${U(I.fmin)}:${N}`
                ];
              (Ut < 0 || Ut > I.fmin) && (Ut = I.fmin), (St < 0 || St < I.fmax) && (St = I.fmax), I.children && (I.children = I.children.sort((q, G) => {
                const K = Q[q.type], pt = Q[G.type];
                if (typeof K == "number" && typeof pt == "number")
                  return K - pt;
                if (typeof K == "number" && typeof pt != "number")
                  return -1;
                if (typeof K != "number" && typeof pt == "number")
                  return 1;
                const Yt = q.type || "", At = G.type || "";
                return Yt.localeCompare(At);
              }), I.children.forEach((q) => {
                const G = q.type;
                O.includes(G) ? S.append("rect").attr("class", "exon").attr("x", U(q.fmin)).attr(
                  "transform",
                  `translate(0,${b - P})`
                ).attr("height", b).attr("z-index", 10).attr("width", U(q.fmax) - U(q.fmin)).on("click", () => {
                  vt(
                    ht,
                    Ot(I),
                    j
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax }) : v.includes(G) ? S.append("rect").attr("class", "CDS").attr("x", U(q.fmin)).attr(
                  "transform",
                  `translate(0,${A - P})`
                ).attr("z-index", 20).attr("height", A).attr("width", U(q.fmax) - U(q.fmin)).on("click", () => {
                  vt(
                    ht,
                    Ot(I),
                    j
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax }) : d.includes(G) && S.append("rect").attr("class", "UTR").attr("x", U(q.fmin)).attr(
                  "transform",
                  `translate(0,${C - P})`
                ).attr("z-index", 20).attr("height", C).attr("width", U(q.fmax) - U(q.fmin)).on("click", () => {
                  vt(
                    ht,
                    Ot(I),
                    j
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax });
              })), Et += 1;
            }
            if (Et === p && !B) {
              const h = bs(u, m, T, k);
              ++L, B = !0, Ft.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${Et * D + 20 + kt})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(h);
            }
          }
        });
      }
    }
    i && Yi(i, a), Et === 0 && Ft.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    );
    const ut = f * (y + V) + et;
    return Et * D + kt + ut;
  }
  filterVariantData(e, n) {
    return !n || n.length === 0 ? e : !e || !Array.isArray(e) ? [] : e.filter((i) => {
      var s, o, c, f, u;
      let r = !1;
      return (n.includes(i.name) || (s = i.allele_symbols) != null && s.values && n.includes(
        i.allele_symbols.values[0].replace(/"/g, "")
      ) || (o = i.symbol) != null && o.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (c = i.symbol_text) != null && c.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((u = (f = i.allele_ids) == null ? void 0 : f.values[0]) == null ? void 0 : u.replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((m) => {
        n.includes(m) && (r = !0);
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
      const s = +(wt(this).attr("width") || 3), o = +wt(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Lu {
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
    ), a = ws(
      r,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    a.forEach((rt) => {
      const yt = Ii(rt);
      s.set(rt, yt);
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], m = ["CDS"], p = ["exon"], d = this.transcriptTypes, v = _s(i, d), O = v.fmin, M = v.fmax, $ = 10, T = 10, k = 10, b = 40, A = 20, D = 2, E = 0, z = 10, F = 10, C = 20, y = 4, V = 20, P = 10, J = `0,0 0,${V} ${P},${P}`, nt = 10, lt = 10, X = (rt) => `${rt - lt / 2},${nt} ${rt},0 ${rt + lt / 2},${nt}`, et = (rt) => `${rt - lt / 2},${nt} ${rt + lt / 2},${nt} ${rt - lt / 2},0 ${rt + lt / 2},0`, U = (rt) => `${rt},${nt} ${rt + lt / 2},${nt / 2} ${rt},0 ${rt - lt / 2},${nt / 2}`, it = he().domain([O, M]).range([0, c]), Dt = ze(this.viewer), Q = o.append("g").attr("transform", `translate(0,${Dt})`).attr("class", "track"), gt = {};
    for (const rt of u)
      gt[rt] = 200;
    for (const rt of m)
      gt[rt] = 1e3;
    for (const rt of p)
      gt[rt] = 100;
    const kt = {};
    i = i.sort((rt, yt) => rt.selected && !yt.selected ? -1 : !rt.selected && yt.selected ? 1 : rt.name - yt.name);
    let ht = 0;
    const j = wt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ot = () => {
      j.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ft = 0;
    const bt = [];
    let Nt = -1, Tt = -1;
    const st = this.renderTooltipDescription;
    for (let rt = 0; rt < i.length && ft < $; rt++) {
      const yt = i[rt];
      let It = yt.children;
      if (It) {
        const ct = yt.selected;
        It = It.sort((Z, xt) => Z.name < xt.name ? -1 : Z.name > xt.name ? 1 : Z - xt);
        let _t = !1;
        It.forEach((Z) => {
          const xt = Z.type;
          if (d.includes(xt)) {
            let Ft = Ki(
              bt,
              it(Z.fmin),
              it(Z.fmax)
            );
            if (ft < $) {
              let Et, Rt, Ut = !1;
              Object.keys(kt).includes(yt.name) || (ht += A, Ut = !0, kt[yt.name] = "Green");
              const St = Q.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ft * b + 10 + ht})`
              );
              Ut && (Et = yt.name, Rt = St.append("text").attr("class", "geneLabel").attr("fill", ct ? "sandybrown" : "black").attr("height", E).attr(
                "transform",
                `translate(${it(Z.fmin)},-${A})`
              ).text(Et).on("click", () => {
                st(
                  j,
                  Ot(yt),
                  ot
                );
              }).datum({ fmin: Z.fmin })), St.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: yt.strand
              })).attr("class", "transArrow").attr("points", J).attr("transform", (ut) => yt.strand > 0 ? `translate(${Number(it(ut.fmax))},0)` : `translate(${Number(it(ut.fmin))},${V}) rotate(180)`).on("click", () => {
                st(
                  j,
                  Ot(Z),
                  ot
                );
              }), St.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + E).attr("height", y).attr("transform", `translate(${it(Z.fmin)},0)`).attr("width", it(Z.fmax) - it(Z.fmin)).on("click", () => {
                st(
                  j,
                  Ot(Z),
                  ot
                );
              }).datum({ fmin: Z.fmin, fmax: Z.fmax }), Et = Z.name, Rt = St.append("text").attr("class", "transcriptLabel").attr("fill", ct ? "sandybrown" : "gray").attr("opacity", ct ? 1 : 0.5).attr("height", E).attr("transform", `translate(${it(Z.fmin)},0)`).text(Et).on("click", () => {
                st(
                  j,
                  Ot(Z),
                  ot
                );
              }).datum({ fmin: Z.fmin });
              let vt = Et.length * 2;
              try {
                vt = Rt.node().getBBox().width;
              } catch {
              }
              Number(vt + it(Z.fmin)) > c;
              const qt = vt > it(Z.fmax) - it(Z.fmin) ? it(Z.fmin) + vt : it(Z.fmax);
              if (bt[Ft]) {
                const ut = bt[Ft];
                ut.push(`${it(Z.fmin)}:${qt}`), bt[Ft] = ut;
              } else
                bt[Ft] = [
                  `${it(Z.fmin)}:${qt}`
                ];
              (Nt < 0 || Nt > Z.fmin) && (Nt = Z.fmin), (Tt < 0 || Tt < Z.fmax) && (Tt = Z.fmax), Z.children && (Z.children = Z.children.sort((ut, Y) => {
                const at = gt[ut.type], dt = gt[Y.type];
                return typeof at == "number" && typeof dt == "number" ? at - dt : typeof at == "number" && typeof dt != "number" ? -1 : typeof at != "number" && typeof dt == "number" ? 1 : ut.type - Y.type;
              }), Z.children.forEach((ut) => {
                const Y = ut.type;
                let at = !1;
                p.includes(Y) ? (at = !0, St.append("rect").attr("class", "exon").attr("x", it(ut.fmin)).attr(
                  "transform",
                  `translate(0,${T - y})`
                ).attr("height", T).attr("z-index", 10).attr("width", it(ut.fmax) - it(ut.fmin)).on("click", () => {
                  st(
                    j,
                    Ot(Z),
                    ot
                  );
                }).datum({ fmin: ut.fmin, fmax: ut.fmax })) : m.includes(Y) ? (at = !0, St.append("rect").attr("class", "CDS").attr("x", it(ut.fmin)).attr(
                  "transform",
                  `translate(0,${k - y})`
                ).attr("z-index", 20).attr("height", k).attr("width", it(ut.fmax) - it(ut.fmin)).on("click", () => {
                  st(
                    j,
                    Ot(Z),
                    ot
                  );
                }).datum({ fmin: ut.fmin, fmax: ut.fmax })) : u.includes(Y) && (at = !0, St.append("rect").attr("class", "UTR").attr("x", it(ut.fmin)).attr(
                  "transform",
                  `translate(0,${z - y})`
                ).attr("z-index", 20).attr("height", z).attr("width", it(ut.fmax) - it(ut.fmin)).on("click", () => {
                  st(
                    j,
                    Ot(Z),
                    ot
                  );
                }).datum({ fmin: ut.fmin, fmax: ut.fmax })), at && a.forEach((dt) => {
                  const { type: g, fmax: B, fmin: I } = dt;
                  if (I < ut.fmin && B > ut.fmin || B > ut.fmax && I < ut.fmax || B <= ut.fmax && I >= ut.fmin) {
                    let x = !0;
                    const L = Ni(dt), h = Di(L)[0], H = $i(L), tt = Math.max(
                      Math.ceil(it(B) - it(I)),
                      D
                    );
                    if (g.toLowerCase() === "deletion" || g.toLowerCase() === "mnv" ? St.append("rect").attr("class", "variant-deletion").attr("x", it(I)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", F).attr("width", tt).on("click", () => {
                      st(
                        j,
                        H,
                        ot
                      );
                    }).datum({
                      fmin: I,
                      fmax: B,
                      alleles: s.get(dt) ?? []
                    }) : g.toLowerCase() === "snv" || g.toLowerCase() === "point_mutation" ? St.append("polygon").attr("class", "variant-SNV").attr("points", U(it(I))).attr("fill", h).attr("x", it(I)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).on("click", () => {
                      st(
                        j,
                        H,
                        ot
                      );
                    }).datum({
                      fmin: I,
                      fmax: B,
                      alleles: s.get(dt) ?? []
                    }) : g.toLowerCase() === "insertion" ? St.append("polygon").attr("class", "variant-insertion").attr("points", X(it(I))).attr("fill", h).attr("x", it(I)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("z-index", 30).on("click", () => {
                      st(
                        j,
                        H,
                        ot
                      );
                    }).datum({
                      fmin: I,
                      fmax: B,
                      alleles: s.get(dt) ?? []
                    }) : g.toLowerCase() === "delins" || g.toLowerCase() === "substitution" || g.toLowerCase() === "indel" ? St.append("polygon").attr("class", "variant-delins").attr("points", et(it(I))).attr("x", it(I)).attr(
                      "transform",
                      `translate(0,${C - y})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      st(
                        j,
                        H,
                        ot
                      );
                    }).datum({
                      fmin: I,
                      fmax: B,
                      alleles: s.get(dt) ?? []
                    }) : x = !1, x && f) {
                      const l = Qe(dt), S = l.length || 1;
                      St.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        ct ? "sandybrown" : h
                      ).attr("opacity", ct ? 1 : 0.5).attr("height", E).attr(
                        "transform",
                        `translate(${it(I - S / 2 * 100)},${C * 2.2 - y})`
                      ).html(l).on("click", () => {
                        st(
                          j,
                          H,
                          ot
                        );
                      }).datum({ fmin: Z.fmin });
                    }
                  }
                });
              })), ft += 1;
            }
            ft === $ && !_t && (++Ft, _t = !0, Q.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ft * b + 20 + ht})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", E).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (ft === 0 && Q.append("text").attr("x", 30).attr("y", E + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        Yi(this.initialHighlight, this.viewer);
      } catch {
      }
    return ft * b + ht;
  }
  filterVariantData(e, n) {
    if (!n || n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a) => {
      var o, c, f, u, m;
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
        const p = (m = (u = a.allele_ids) == null ? void 0 : u.values) == null ? void 0 : m[0];
        if (p) {
          let d = [];
          if (p.startsWith("[") && p.endsWith("]"))
            try {
              const v = JSON.parse(p);
              d = (Array.isArray(v) ? v : [v]).map(String);
            } catch {
              d = p.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            d = p.replace(/"|\\[|\\]| /g, "").split(",");
          for (const v of d)
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
class Ou {
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
    var X;
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = (X = e[0]) == null ? void 0 : X.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], u = ["exon"], m = this.transcriptTypes, p = 10, d = 10, v = 40, O = 0, M = 10, $ = 4, T = 20, k = 10, b = `0,0 0,${T} ${k},${k}`, A = this.renderTooltipDescription, D = he().domain([this.region.start, this.region.end]).range([0, r]), E = {};
    for (let et = 0, U = c.length; et < U; et++)
      E[c[et]] = 200;
    for (let et = 0, U = f.length; et < U; et++)
      E[f[et]] = 1e3;
    for (let et = 0, U = u.length; et < U; et++)
      E[u[et]] = 100;
    e = e.sort((et, U) => et.selected && !U.selected ? -1 : !et.selected && U.selected ? 1 : et.name - U.name);
    const z = wt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), F = () => {
      z.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const et = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, U] = n.split(":");
      et.append("polygon").attr("class", "variant-SNV").attr("points", Ji(D(+U))).attr("fill", "red").attr("x", D(+U)).attr("z-index", 30);
    }
    const C = ze(this.viewer), y = i.append("g").attr("transform", `translate(0,${C})`).attr("class", "track");
    let V = 0;
    const P = [];
    let J = -1, nt = -1;
    const lt = [];
    for (let et = 0; et < e.length && V < o; et++) {
      const U = e[et];
      let it = U.children;
      if (it) {
        const Dt = U.selected;
        it = it.sort((Q, gt) => Q.name < gt.name ? -1 : Q.name > gt.name ? 1 : 0), it.forEach((Q) => {
          var kt, ht;
          const gt = Q.type;
          if (!lt.includes(Q.id) && (lt.push(Q.id), m.includes(gt))) {
            let j = Ki(
              P,
              D(Q.fmin),
              D(Q.fmax)
            );
            if (V < o) {
              const ot = y.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${V * v + 10})`
              ), ft = Math.max(D(Q.fmin), 0), bt = Math.min(D(Q.fmax), this.width);
              ot.append("polygon").datum(() => ({
                strand: U.strand
              })).attr("class", "transArrow").attr("points", b).attr(
                "transform",
                () => U.strand > 0 ? `translate(${bt},0)` : `translate(${ft},${T}) rotate(180)`
              ).on("click", () => {
                A(
                  z,
                  Ot(Q),
                  F
                );
              }), ot.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + O).attr("height", $).attr("transform", `translate(${ft},0)`).attr("width", bt - ft).datum({
                fmin: Q.fmin,
                fmax: Q.fmax
              }).on("click", () => {
                A(
                  z,
                  Ot(Q),
                  F
                );
              });
              let Nt = Q.name;
              U.name !== Q.name && (Nt += ` (${U.name})`);
              let Tt = Math.max(D(Q.fmin), 0);
              const st = ot.append("svg:text").attr("class", "transcriptLabel").attr("fill", Dt ? "sandybrown" : "gray").attr("opacity", Dt ? 1 : 0.5).attr("height", O).attr("transform", `translate(${Tt},0)`).text(Nt).datum({
                fmin: Q.fmin
              }).on("click", () => {
                A(
                  z,
                  Ot(Q),
                  F
                );
              });
              let rt = 100;
              try {
                rt = ((kt = st.node()) == null ? void 0 : kt.getBBox().width) ?? 0;
              } catch {
              }
              if (rt + Tt > this.width) {
                const ct = rt + Tt - this.width;
                Tt -= ct, st.attr("transform", `translate(${Tt},0)`);
              }
              let yt = Nt.length * 2;
              try {
                yt = ((ht = st.node()) == null ? void 0 : ht.getBBox().width) ?? 0;
              } catch {
              }
              Number(yt + D(Q.fmin)) > r;
              const It = yt > D(Q.fmax) - D(Q.fmin) ? D(Q.fmin) + yt : D(Q.fmax);
              if (P[j]) {
                const ct = P[j];
                ct.push(`${D(Q.fmin)}:${It}`), P[j] = ct;
              } else
                P[j] = [`${D(Q.fmin)}:${It}`];
              (J < 0 || J > Q.fmin) && (J = Q.fmin), (nt < 0 || nt < Q.fmax) && (nt = Q.fmax), Q.children && (Q.children = Q.children.sort(
                function(ct, _t) {
                  const Z = E[ct.type], xt = E[_t.type];
                  if (typeof Z == "number" && typeof xt == "number")
                    return Z - xt;
                  if (typeof Z == "number" && typeof xt != "number")
                    return -1;
                  if (typeof Z != "number" && typeof xt == "number")
                    return 1;
                  const Ft = ct.type || "", Et = _t.type || "";
                  return Ft.localeCompare(Et);
                }
              ), Q.children.forEach((ct) => {
                const _t = ct.type;
                if (D(ct.fmin) > this.width || D(ct.fmax) < 0)
                  return;
                const Z = Math.max(D(ct.fmin), 0), xt = Math.min(D(ct.fmax), this.width);
                u.includes(_t) ? ot.append("rect").attr("class", "exon").attr("x", Z).attr(
                  "transform",
                  `translate(0,${p - $})`
                ).attr("height", p).attr("z-index", 10).attr("width", xt - Z).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ot(Q),
                    F
                  );
                }) : f.includes(_t) ? ot.append("rect").attr("class", "CDS").attr("x", Z).attr(
                  "transform",
                  `translate(0,${d - $})`
                ).attr("z-index", 20).attr("height", d).attr("width", xt - Z).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ot(Q),
                    F
                  );
                }) : c.includes(_t) && ot.append("rect").attr("class", "UTR").attr("x", Z).attr(
                  "transform",
                  `translate(0,${M - $})`
                ).attr("z-index", 20).attr("height", M).attr("width", xt - Z).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ot(Q),
                    F
                  );
                });
              })), V += 1;
            }
            if (V === o) {
              const ot = bs(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++j, y.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${V * v + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", O).html(ot);
            }
          }
        });
      }
    }
    return V === 0 && y.append("text").attr("x", 30).attr("y", O + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), V * v;
  }
}
class Cu {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = he().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = $o(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Qt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Qt(".x-local-axis .tick text").each(function() {
      const f = wt(this).text();
      let u = "nucleotide nt-a";
      f === "T" ? u = "nucleotide nt-t" : f === "C" ? u = "nucleotide nt-c" : f === "G" && (u = "nucleotide nt-g"), wt(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
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
function Dr() {
}
var pe = Qi.prototype;
Dr.prototype = {
  constructor: Dr,
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
const Rr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ks(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Rr.hasOwnProperty(e) ? { space: Rr[e], local: t } : t;
}
function Fu(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mi && e.documentElement.namespaceURI === Mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function zu(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ts(t) {
  var e = ks(t);
  return (e.local ? zu : Fu)(e);
}
function Bu() {
}
function Es(t) {
  return t == null ? Bu : function() {
    return this.querySelector(t);
  };
}
function Hu(t) {
  typeof t != "function" && (t = Es(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
  return new Zt(i, this._parents);
}
function Pu() {
  return [];
}
function Vu(t) {
  return t == null ? Pu : function() {
    return this.querySelectorAll(t);
  };
}
function Uu(t) {
  typeof t != "function" && (t = Vu(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new Zt(i, r);
}
function Zu(t) {
  return function() {
    return this.matches(t);
  };
}
function qu(t) {
  typeof t != "function" && (t = Zu(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Zt(i, this._parents);
}
function Ss(t) {
  return new Array(t.length);
}
function Gu() {
  return new Zt(this._enter || this._groups.map(Ss), this._parents);
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
function Wu(t) {
  return function() {
    return t;
  };
}
var Mr = "$";
function Xu(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Cn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Ku(t, e, n, i, r, a, s) {
  var o, c, f = {}, u = e.length, m = a.length, p = new Array(u), d;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = d = Mr + s.call(c, c.__data__, o, e), d in f ? r[o] = c : f[d] = c);
  for (o = 0; o < m; ++o)
    d = Mr + s.call(t, a[o], o, a), (c = f[d]) ? (i[o] = c, c.__data__ = a[o], f[d] = null) : n[o] = new Cn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f[p[o]] === c && (r[o] = c);
}
function Yu(t, e) {
  if (!t)
    return d = new Array(this.size()), f = -1, this.each(function(D) {
      d[++f] = D;
    }), d;
  var n = e ? Ku : Xu, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Wu(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], p = m.length, d = t.call(u, u && u.__data__, f, i), v = d.length, O = o[f] = new Array(v), M = s[f] = new Array(v), $ = c[f] = new Array(p);
    n(u, m, O, M, $, d, e);
    for (var T = 0, k = 0, b, A; T < v; ++T)
      if (b = O[T]) {
        for (T >= k && (k = T + 1); !(A = M[k]) && ++k < v; ) ;
        b._next = A || null;
      }
  }
  return s = new Zt(s, i), s._enter = o, s._exit = c, s;
}
function Ju() {
  return new Zt(this._exit || this._groups.map(Ss), this._parents);
}
function Qu(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function ju(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], u = c.length, m = s[o] = new Array(u), p, d = 0; d < u; ++d)
      (p = c[d] || f[d]) && (m[d] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new Zt(s, this._parents);
}
function th() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function eh(t) {
  t || (t = nh);
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
  }
  return new Zt(r, this._parents).order();
}
function nh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ih() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function rh() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function ah() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function sh() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function oh() {
  return !this.node();
}
function lh(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function ch(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function fh(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function uh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function hh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function dh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ph(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function _h(t, e) {
  var n = ks(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? fh : ch : typeof e == "function" ? n.local ? ph : dh : n.local ? hh : uh)(n, e));
}
function As(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function gh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function mh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function vh(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function wh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? gh : typeof e == "function" ? vh : mh)(t, e, n ?? "")) : yh(this.node(), t);
}
function yh(t, e) {
  return t.style.getPropertyValue(e) || As(t).getComputedStyle(t, null).getPropertyValue(e);
}
function xh(t) {
  return function() {
    delete this[t];
  };
}
function bh(t, e) {
  return function() {
    this[t] = e;
  };
}
function kh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Th(t, e) {
  return arguments.length > 1 ? this.each((e == null ? xh : typeof e == "function" ? kh : bh)(t, e)) : this.node()[t];
}
function $s(t) {
  return t.trim().split(/^|\s+/);
}
function ji(t) {
  return t.classList || new Ns(t);
}
function Ns(t) {
  this._node = t, this._names = $s(t.getAttribute("class") || "");
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
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Ds(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Eh(t) {
  return function() {
    Is(this, t);
  };
}
function Sh(t) {
  return function() {
    Ds(this, t);
  };
}
function Ah(t, e) {
  return function() {
    (e.apply(this, arguments) ? Is : Ds)(this, t);
  };
}
function $h(t, e) {
  var n = $s(t + "");
  if (arguments.length < 2) {
    for (var i = ji(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ah : e ? Eh : Sh)(n, e));
}
function Nh() {
  this.textContent = "";
}
function Ih(t) {
  return function() {
    this.textContent = t;
  };
}
function Dh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Rh(t) {
  return arguments.length ? this.each(t == null ? Nh : (typeof t == "function" ? Dh : Ih)(t)) : this.node().textContent;
}
function Mh() {
  this.innerHTML = "";
}
function Lh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Oh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ch(t) {
  return arguments.length ? this.each(t == null ? Mh : (typeof t == "function" ? Oh : Lh)(t)) : this.node().innerHTML;
}
function Fh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function zh() {
  return this.each(Fh);
}
function Bh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Hh() {
  return this.each(Bh);
}
function Ph(t) {
  var e = typeof t == "function" ? t : Ts(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vh() {
  return null;
}
function Uh(t, e) {
  var n = typeof t == "function" ? t : Ts(t), i = e == null ? Vh : typeof e == "function" ? e : Es(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Zh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function qh() {
  return this.each(Zh);
}
function Gh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xh(t) {
  return this.select(t ? Wh : Gh);
}
function Kh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Rs = {};
if (typeof document < "u") {
  var Yh = document.documentElement;
  "onmouseenter" in Yh || (Rs = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Jh(t, e, n) {
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
function Qh(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function jh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function td(t, e, n) {
  var i = Rs.hasOwnProperty(t.type) ? Jh : Ms;
  return function(r, a, s) {
    var o = this.__on, c, f = i(e, a, s);
    if (o) {
      for (var u = 0, m = o.length; u < m; ++u)
        if ((c = o[u]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function ed(t, e, n) {
  var i = Qh(t + ""), r, a = i.length, s;
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
  for (o = e ? td : jh, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ls(t, e, n) {
  var i = As(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function nd(t, e) {
  return function() {
    return Ls(this, t, e);
  };
}
function id(t, e) {
  return function() {
    return Ls(this, t, e.apply(this, arguments));
  };
}
function rd(t, e) {
  return this.each((typeof e == "function" ? id : nd)(t, e));
}
var Os = [null];
function Zt(t, e) {
  this._groups = t, this._parents = e;
}
function Li() {
  return new Zt([[document.documentElement]], Os);
}
Zt.prototype = Li.prototype = {
  constructor: Zt,
  select: Hu,
  selectAll: Uu,
  filter: qu,
  data: Yu,
  enter: Gu,
  exit: Ju,
  join: Qu,
  merge: ju,
  order: th,
  sort: eh,
  call: ih,
  nodes: rh,
  node: ah,
  size: sh,
  empty: oh,
  each: lh,
  attr: _h,
  style: wh,
  property: Th,
  classed: $h,
  text: Rh,
  html: Ch,
  raise: zh,
  lower: Hh,
  append: Ph,
  insert: Uh,
  remove: qh,
  clone: Xh,
  datum: Kh,
  on: ed,
  dispatch: rd
};
function Lr(t) {
  return typeof t == "string" ? new Zt([[document.querySelector(t)]], [document.documentElement]) : new Zt([[t]], Os);
}
function ad() {
  var t = f, e = u, n = m, i = document.body, r = D(), a = null, s = null, o = null;
  function c(y) {
    a = E(y), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var y = Array.prototype.slice.call(arguments);
    y[y.length - 1] instanceof SVGElement && (o = y.pop());
    var V = n.apply(this, y), P = e.apply(this, y), J = t.apply(this, y), nt = z(), lt = d.length, X, et = document.documentElement.scrollTop || i.scrollTop, U = document.documentElement.scrollLeft || i.scrollLeft;
    for (nt.html(V).style("opacity", 1).style("pointer-events", "all"); lt--; ) nt.classed(d[lt], !1);
    return X = p.get(J).apply(this), nt.classed(J, !0).style("top", X.top + P[0] + et + "px").style("left", X.left + P[1] + U + "px"), c;
  }, c.hide = function() {
    var y = z();
    return y.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(y, V) {
    if (arguments.length < 2 && typeof y == "string")
      return z().attr(y);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.attr.apply(z(), P), c;
  }, c.style = function(y, V) {
    if (arguments.length < 2 && typeof y == "string")
      return z().style(y);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.style.apply(z(), P), c;
  }, c.direction = function(y) {
    return arguments.length ? (t = y == null ? y : C(y), c) : t;
  }, c.offset = function(y) {
    return arguments.length ? (e = y == null ? y : C(y), c) : e;
  }, c.html = function(y) {
    return arguments.length ? (n = y == null ? y : C(y), c) : n;
  }, c.rootElement = function(y) {
    return arguments.length ? (i = y == null ? y : C(y), c) : i;
  }, c.destroy = function() {
    return r && (z().remove(), r = null), c;
  };
  function f() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function m() {
    return " ";
  }
  var p = Qi({
    n: v,
    s: O,
    e: M,
    w: $,
    nw: T,
    ne: k,
    sw: b,
    se: A
  }), d = p.keys();
  function v() {
    var y = F(this);
    return {
      top: y.n.y - r.offsetHeight,
      left: y.n.x - r.offsetWidth / 2
    };
  }
  function O() {
    var y = F(this);
    return {
      top: y.s.y,
      left: y.s.x - r.offsetWidth / 2
    };
  }
  function M() {
    var y = F(this);
    return {
      top: y.e.y - r.offsetHeight / 2,
      left: y.e.x
    };
  }
  function $() {
    var y = F(this);
    return {
      top: y.w.y - r.offsetHeight / 2,
      left: y.w.x - r.offsetWidth
    };
  }
  function T() {
    var y = F(this);
    return {
      top: y.nw.y - r.offsetHeight,
      left: y.nw.x - r.offsetWidth
    };
  }
  function k() {
    var y = F(this);
    return {
      top: y.ne.y - r.offsetHeight,
      left: y.ne.x
    };
  }
  function b() {
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
  function D() {
    var y = Lr(document.createElement("div"));
    return y.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), y.node();
  }
  function E(y) {
    var V = y.node();
    return V ? V.tagName.toLowerCase() === "svg" ? V : V.ownerSVGElement : null;
  }
  function z() {
    return r == null && (r = D(), i.appendChild(r)), Lr(r);
  }
  function F(y) {
    for (var V = o || y; V.getScreenCTM == null && V.parentNode != null; )
      V = V.parentNode;
    var P = {}, J = V.getScreenCTM(), nt = V.getBBox(), lt = nt.width, X = nt.height, et = nt.x, U = nt.y;
    return s.x = et, s.y = U, P.nw = s.matrixTransform(J), s.x += lt, P.ne = s.matrixTransform(J), s.y += X, P.se = s.matrixTransform(J), s.x -= lt, P.sw = s.matrixTransform(J), s.y -= X / 2, P.w = s.matrixTransform(J), s.x += lt, P.e = s.matrixTransform(J), s.x -= lt / 2, s.y -= X / 2, P.n = s.matrixTransform(J), s.y += X, P.s = s.matrixTransform(J), P;
  }
  function C(y) {
    return typeof y == "function" ? y : function() {
      return y;
    };
  }
  return c;
}
class sd {
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end + 1]).range(this.range), r = ps().type(ds).size(20), a = ad();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (m) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${m.position}</td></tr><tr><td>Mutation</td> <td>${m.ref} > ${m.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (m) => `translate(${i(m.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = wt("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    u.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), u.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class od {
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end]).range(this.track.range), r = ps().type(ds).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${i(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function tr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Yn, Or;
function ld() {
  if (Or) return Yn;
  Or = 1;
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
  return Yn = t, Yn;
}
var cd = ld();
const Un = /* @__PURE__ */ tr(cd);
class fd {
}
class ud {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new fd()) {
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
    const a = new ud(), s = new hd();
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
var Tn = { exports: {} }, dd = Tn.exports, Cr;
function pd() {
  return Cr || (Cr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(dd, function() {
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
      function u(T) {
        const k = i.exec(T);
        return p(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function m(T) {
        const k = r.exec(T), b = k[2];
        return p("file:", "", k[1] || "", "", o(b) ? b : "/" + b, k[3] || "", k[4] || "");
      }
      function p(T, k, b, A, D, E, z) {
        return {
          scheme: T,
          user: k,
          host: b,
          port: A,
          path: D,
          query: E,
          hash: z,
          type: 7
        };
      }
      function d(T) {
        if (s(T)) {
          const b = u("http:" + T);
          return b.scheme = "", b.type = 6, b;
        }
        if (o(T)) {
          const b = u("http://foo.com" + T);
          return b.scheme = "", b.host = "", b.type = 5, b;
        }
        if (c(T))
          return m(T);
        if (a(T))
          return u(T);
        const k = u("http://foo.com/" + T);
        return k.scheme = "", k.host = "", k.type = T ? T.startsWith("?") ? 3 : T.startsWith("#") ? 2 : 4 : 1, k;
      }
      function v(T) {
        if (T.endsWith("/.."))
          return T;
        const k = T.lastIndexOf("/");
        return T.slice(0, k + 1);
      }
      function O(T, k) {
        M(k, k.type), T.path === "/" ? T.path = k.path : T.path = v(k.path) + T.path;
      }
      function M(T, k) {
        const b = k <= 4, A = T.path.split("/");
        let D = 1, E = 0, z = !1;
        for (let C = 1; C < A.length; C++) {
          const y = A[C];
          if (!y) {
            z = !0;
            continue;
          }
          if (z = !1, y !== ".") {
            if (y === "..") {
              E ? (z = !0, E--, D--) : b && (A[D++] = y);
              continue;
            }
            A[D++] = y, E++;
          }
        }
        let F = "";
        for (let C = 1; C < D; C++)
          F += "/" + A[C];
        (!F || z && !F.endsWith("/..")) && (F += "/"), T.path = F;
      }
      function $(T, k) {
        if (!T && !k)
          return "";
        const b = d(T);
        let A = b.type;
        if (k && A !== 7) {
          const E = d(k), z = E.type;
          switch (A) {
            case 1:
              b.hash = E.hash;
            // fall through
            case 2:
              b.query = E.query;
            // fall through
            case 3:
            case 4:
              O(b, E);
            // fall through
            case 5:
              b.user = E.user, b.host = E.host, b.port = E.port;
            // fall through
            case 6:
              b.scheme = E.scheme;
          }
          z > A && (A = z);
        }
        M(b, A);
        const D = b.query + b.hash;
        switch (A) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return D;
          case 4: {
            const E = b.path.slice(1);
            return E ? f(k || T) && !f(E) ? "./" + E + D : E + D : D || ".";
          }
          case 5:
            return b.path + D;
          default:
            return b.scheme + "//" + b.user + b.host + b.port + b.path + D;
        }
      }
      return $;
    });
  }(Tn)), Tn.exports;
}
var _d = pd();
const gd = /* @__PURE__ */ tr(_d);
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
  return gd(t, e);
}
class md {
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
    for (let m = this.binarySearch(e, n, a); m < e.length && m >= 0 && r * s(e[m]) < r * i; m += r) {
      if (e[m][0] === this.lazyClass) {
        const d = c(e[m]), v = this.chunkCache.get(d, d).then((O) => [O, d]);
        u.push(v);
      } else
        yield [e[m], o.concat(m)];
      const p = f(e[m]);
      p && (yield* this.iterateSublist(p, n, i, r, a, s, o.concat(m)));
    }
    for (const m of u) {
      const [p, d] = await m;
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
class vd {
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
class wd {
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
function yd() {
  return this._uniqueID;
}
function xd() {
  return this._parent;
}
function bd() {
  return this.get("subfeatures");
}
class kd {
  constructor({ baseUrl: e, urlTemplate: n, readFile: i, cacheSize: r = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = i, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new Te({
      cache: new Un({ maxSize: r }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new md({ readFile: this.readFile });
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
    e.intervals && (i.attrs = new vd(e.intervals.classes), this.loadNCList(i, e, n));
    const { histograms: r } = e;
    if (r != null && r.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new wd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
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
      for (let v = 0; v < r; v += 1)
        d[v] = 0;
      for await (const [v, O] of f.lazyArray.range(p, p + u * r - 1))
        d[Math.floor((v - p) / u)] += O;
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
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = yd, n._parent = r, n.parent = xd, n.children = bd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${i}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const Td = 3, Ed = 258, Cs = 29, Sd = 256, Ad = Sd + 1 + Cs, Fs = 30, $d = 512, Nd = new Array((Ad + 2) * 2);
Be(Nd);
const Id = new Array(Fs * 2);
Be(Id);
const Dd = new Array($d);
Be(Dd);
const Rd = new Array(Ed - Td + 1);
Be(Rd);
const Md = new Array(Cs);
Be(Md);
const Ld = new Array(Fs);
Be(Ld);
const Od = (t, e, n, i) => {
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
var Oi = Od;
const Cd = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, Fd = new Uint32Array(Cd()), zd = (t, e, n, i) => {
  const r = Fd, a = i + n;
  t ^= -1;
  for (let s = i; s < a; s++)
    t = t >>> 8 ^ r[(t ^ e[s]) & 255];
  return t ^ -1;
};
var ie = zd, Ci = {
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
}, zs = {
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
var Hd = function(t) {
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
}, Bs = {
  assign: Hd,
  flattenChunks: Pd
};
let Hs = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Hs = !1;
}
const je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
je[254] = je[254] = 1;
var Vd = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, i, r, a, s = t.length, o = 0;
  for (r = 0; r < s; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, r = 0; a < o; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const Ud = (t, e) => {
  if (e < 65534 && t.subarray && Hs)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let i = 0; i < e; i++)
    n += String.fromCharCode(t[i]);
  return n;
};
var Zd = (t, e) => {
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
  return Ud(a, r);
}, qd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + je[t[n]] > e ? n : e;
}, Fi = {
  string2buf: Vd,
  buf2string: Zd,
  utf8border: qd
};
function Gd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Wd = Gd;
const hn = 16209, Xd = 16191;
var Kd = function(e, n) {
  let i, r, a, s, o, c, f, u, m, p, d, v, O, M, $, T, k, b, A, D, E, z, F, C;
  const y = e.state;
  i = e.next_in, F = e.input, r = i + (e.avail_in - 5), a = e.next_out, C = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = y.dmax, f = y.wsize, u = y.whave, m = y.wnext, p = y.window, d = y.hold, v = y.bits, O = y.lencode, M = y.distcode, $ = (1 << y.lenbits) - 1, T = (1 << y.distbits) - 1;
  t:
    do {
      v < 15 && (d += F[i++] << v, v += 8, d += F[i++] << v, v += 8), k = O[d & $];
      e:
        for (; ; ) {
          if (b = k >>> 24, d >>>= b, v -= b, b = k >>> 16 & 255, b === 0)
            C[a++] = k & 65535;
          else if (b & 16) {
            A = k & 65535, b &= 15, b && (v < b && (d += F[i++] << v, v += 8), A += d & (1 << b) - 1, d >>>= b, v -= b), v < 15 && (d += F[i++] << v, v += 8, d += F[i++] << v, v += 8), k = M[d & T];
            n:
              for (; ; ) {
                if (b = k >>> 24, d >>>= b, v -= b, b = k >>> 16 & 255, b & 16) {
                  if (D = k & 65535, b &= 15, v < b && (d += F[i++] << v, v += 8, v < b && (d += F[i++] << v, v += 8)), D += d & (1 << b) - 1, D > c) {
                    e.msg = "invalid distance too far back", y.mode = hn;
                    break t;
                  }
                  if (d >>>= b, v -= b, b = a - s, D > b) {
                    if (b = D - b, b > u && y.sane) {
                      e.msg = "invalid distance too far back", y.mode = hn;
                      break t;
                    }
                    if (E = 0, z = p, m === 0) {
                      if (E += f - b, b < A) {
                        A -= b;
                        do
                          C[a++] = p[E++];
                        while (--b);
                        E = a - D, z = C;
                      }
                    } else if (m < b) {
                      if (E += f + m - b, b -= m, b < A) {
                        A -= b;
                        do
                          C[a++] = p[E++];
                        while (--b);
                        if (E = 0, m < A) {
                          b = m, A -= b;
                          do
                            C[a++] = p[E++];
                          while (--b);
                          E = a - D, z = C;
                        }
                      }
                    } else if (E += m - b, b < A) {
                      A -= b;
                      do
                        C[a++] = p[E++];
                      while (--b);
                      E = a - D, z = C;
                    }
                    for (; A > 2; )
                      C[a++] = z[E++], C[a++] = z[E++], C[a++] = z[E++], A -= 3;
                    A && (C[a++] = z[E++], A > 1 && (C[a++] = z[E++]));
                  } else {
                    E = a - D;
                    do
                      C[a++] = C[E++], C[a++] = C[E++], C[a++] = C[E++], A -= 3;
                    while (A > 2);
                    A && (C[a++] = C[E++], A > 1 && (C[a++] = C[E++]));
                  }
                } else if ((b & 64) === 0) {
                  k = M[(k & 65535) + (d & (1 << b) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", y.mode = hn;
                  break t;
                }
                break;
              }
          } else if ((b & 64) === 0) {
            k = O[(k & 65535) + (d & (1 << b) - 1)];
            continue e;
          } else if (b & 32) {
            y.mode = Xd;
            break t;
          } else {
            e.msg = "invalid literal/length code", y.mode = hn;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  A = v >> 3, i -= A, v -= A << 3, d &= (1 << v) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), y.hold = d, y.bits = v;
};
const $e = 15, Fr = 852, zr = 592, Br = 0, Jn = 1, Hr = 2, Yd = new Uint16Array([
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
]), Jd = new Uint8Array([
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
]), Qd = new Uint16Array([
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
]), jd = new Uint8Array([
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
]), t0 = (t, e, n, i, r, a, s, o) => {
  const c = o.bits;
  let f = 0, u = 0, m = 0, p = 0, d = 0, v = 0, O = 0, M = 0, $ = 0, T = 0, k, b, A, D, E, z = null, F;
  const C = new Uint16Array($e + 1), y = new Uint16Array($e + 1);
  let V = null, P, J, nt;
  for (f = 0; f <= $e; f++)
    C[f] = 0;
  for (u = 0; u < i; u++)
    C[e[n + u]]++;
  for (d = c, p = $e; p >= 1 && C[p] === 0; p--)
    ;
  if (d > p && (d = p), p === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (m = 1; m < p && C[m] === 0; m++)
    ;
  for (d < m && (d = m), M = 1, f = 1; f <= $e; f++)
    if (M <<= 1, M -= C[f], M < 0)
      return -1;
  if (M > 0 && (t === Br || p !== 1))
    return -1;
  for (y[1] = 0, f = 1; f < $e; f++)
    y[f + 1] = y[f] + C[f];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (s[y[e[n + u]]++] = u);
  if (t === Br ? (z = V = s, F = 20) : t === Jn ? (z = Yd, V = Jd, F = 257) : (z = Qd, V = jd, F = 0), T = 0, u = 0, f = m, E = a, v = d, O = 0, A = -1, $ = 1 << d, D = $ - 1, t === Jn && $ > Fr || t === Hr && $ > zr)
    return 1;
  for (; ; ) {
    P = f - O, s[u] + 1 < F ? (J = 0, nt = s[u]) : s[u] >= F ? (J = V[s[u] - F], nt = z[s[u] - F]) : (J = 96, nt = 0), k = 1 << f - O, b = 1 << v, m = b;
    do
      b -= k, r[E + (T >> O) + b] = P << 24 | J << 16 | nt | 0;
    while (b !== 0);
    for (k = 1 << f - 1; T & k; )
      k >>= 1;
    if (k !== 0 ? (T &= k - 1, T += k) : T = 0, u++, --C[f] === 0) {
      if (f === p)
        break;
      f = e[n + s[u]];
    }
    if (f > d && (T & D) !== A) {
      for (O === 0 && (O = d), E += m, v = f - O, M = 1 << v; v + O < p && (M -= C[v + O], !(M <= 0)); )
        v++, M <<= 1;
      if ($ += 1 << v, t === Jn && $ > Fr || t === Hr && $ > zr)
        return 1;
      A = T & D, r[A] = d << 24 | v << 16 | E - a | 0;
    }
  }
  return T !== 0 && (r[E + T] = f - O << 24 | 64 << 16 | 0), o.bits = d, 0;
};
var Xe = t0;
const e0 = 0, Ps = 1, Vs = 2, {
  Z_FINISH: Pr,
  Z_BLOCK: n0,
  Z_TREES: dn,
  Z_OK: Ee,
  Z_STREAM_END: i0,
  Z_NEED_DICT: r0,
  Z_STREAM_ERROR: Kt,
  Z_DATA_ERROR: Us,
  Z_MEM_ERROR: Zs,
  Z_BUF_ERROR: a0,
  Z_DEFLATED: Vr
} = zs, Zn = 16180, Ur = 16181, Zr = 16182, qr = 16183, Gr = 16184, Wr = 16185, Xr = 16186, Kr = 16187, Yr = 16188, Jr = 16189, Fn = 16190, le = 16191, Qn = 16192, Qr = 16193, jn = 16194, jr = 16195, ta = 16196, ea = 16197, na = 16198, pn = 16199, _n = 16200, ia = 16201, ra = 16202, aa = 16203, sa = 16204, oa = 16205, ti = 16206, la = 16207, ca = 16208, $t = 16209, qs = 16210, Gs = 16211, s0 = 852, o0 = 592, l0 = 15, c0 = l0, fa = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function f0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Ae = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Zn || e.mode > Gs ? 1 : 0;
}, Ws = (t) => {
  if (Ae(t))
    return Kt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Zn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(s0), e.distcode = e.distdyn = new Int32Array(o0), e.sane = 1, e.back = -1, Ee;
}, Xs = (t) => {
  if (Ae(t))
    return Kt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Ws(t);
}, Ks = (t, e) => {
  let n;
  if (Ae(t))
    return Kt;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Kt : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, Xs(t));
}, Ys = (t, e) => {
  if (!t)
    return Kt;
  const n = new f0();
  t.state = n, n.strm = t, n.window = null, n.mode = Zn;
  const i = Ks(t, e);
  return i !== Ee && (t.state = null), i;
}, u0 = (t) => Ys(t, c0);
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
    for (Xe(Ps, t.lens, 0, 288, ei, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    Xe(Vs, t.lens, 0, 32, ni, 0, t.work, { bits: 5 }), ua = !1;
  }
  t.lencode = ei, t.lenbits = 9, t.distcode = ni, t.distbits = 5;
}, Js = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, d0 = (t, e) => {
  let n, i, r, a, s, o, c, f, u, m, p, d, v, O, M = 0, $, T, k, b, A, D, E, z;
  const F = new Uint8Array(4);
  let C, y;
  const V = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Kt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, m = o, p = c, z = Ee;
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
            n.wbits === 0 && (n.wbits = 15), n.check = 0, F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0), f = 0, u = 0, n.mode = Ur;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = $t;
            break;
          }
          if ((f & 15) !== Vr) {
            t.msg = "unknown compression method", n.mode = $t;
            break;
          }
          if (f >>>= 4, u -= 4, E = (f & 15) + 8, n.wbits === 0 && (n.wbits = E), E > 15 || E > n.wbits) {
            t.msg = "invalid window size", n.mode = $t;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Jr : le, f = 0, u = 0;
          break;
        case Ur:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Vr) {
            t.msg = "unknown compression method", n.mode = $t;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = $t;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, u = 0, n.mode = Zr;
        /* falls through */
        case Zr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, F[2] = f >>> 16 & 255, F[3] = f >>> 24 & 255, n.check = ie(n.check, F, 4, 0)), f = 0, u = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, u = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024 && (d = n.length, d > o && (d = o), d && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + d
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, d, a)), o -= d, a += d, n.length -= d), n.length))
            break t;
          n.length = 0, n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            d = 0;
            do
              E = i[a + d++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && d < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, d, a)), o -= d, a += d, E)
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
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, d, a)), o -= d, a += d, E)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Yr;
        /* falls through */
        case Yr:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = $t;
              break;
            }
            f = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Jr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          t.adler = n.check = fa(f), f = 0, u = 0, n.mode = Fn;
        /* falls through */
        case Fn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, r0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === n0 || e === dn)
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
              n.mode = Qr;
              break;
            case 1:
              if (h0(n), n.mode = pn, e === dn) {
                f >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ta;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = $t;
          }
          f >>>= 2, u -= 2;
          break;
        case Qr:
          for (f >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = $t;
            break;
          }
          if (n.length = f & 65535, f = 0, u = 0, n.mode = jn, e === dn)
            break t;
        /* falls through */
        case jn:
          n.mode = jr;
        /* falls through */
        case jr:
          if (d = n.length, d) {
            if (d > o && (d = o), d > c && (d = c), d === 0)
              break t;
            r.set(i.subarray(a, a + d), s), o -= d, a += d, c -= d, s += d, n.length -= d;
            break;
          }
          n.mode = le;
          break;
        case ta:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, u -= 5, n.ndist = (f & 31) + 1, f >>>= 5, u -= 5, n.ncode = (f & 15) + 4, f >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = $t;
            break;
          }
          n.have = 0, n.mode = ea;
        /* falls through */
        case ea:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.lens[V[n.have++]] = f & 7, f >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[V[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, C = { bits: n.lenbits }, z = Xe(e0, n.lens, 0, 19, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid code lengths set", n.mode = $t;
            break;
          }
          n.have = 0, n.mode = na;
        /* falls through */
        case na:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; M = n.lencode[f & (1 << n.lenbits) - 1], $ = M >>> 24, T = M >>> 16 & 255, k = M & 65535, !($ <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (k < 16)
              f >>>= $, u -= $, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (y = $ + 2; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                if (f >>>= $, u -= $, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = $t;
                  break;
                }
                E = n.lens[n.have - 1], d = 3 + (f & 3), f >>>= 2, u -= 2;
              } else if (k === 17) {
                for (y = $ + 3; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= $, u -= $, E = 0, d = 3 + (f & 7), f >>>= 3, u -= 3;
              } else {
                for (y = $ + 7; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= $, u -= $, E = 0, d = 11 + (f & 127), f >>>= 7, u -= 7;
              }
              if (n.have + d > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = $t;
                break;
              }
              for (; d--; )
                n.lens[n.have++] = E;
            }
          }
          if (n.mode === $t)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = $t;
            break;
          }
          if (n.lenbits = 9, C = { bits: n.lenbits }, z = Xe(Ps, n.lens, 0, n.nlen, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid literal/lengths set", n.mode = $t;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, C = { bits: n.distbits }, z = Xe(Vs, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, C), n.distbits = C.bits, z) {
            t.msg = "invalid distances set", n.mode = $t;
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
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, Kd(t, p), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; M = n.lencode[f & (1 << n.lenbits) - 1], $ = M >>> 24, T = M >>> 16 & 255, k = M & 65535, !($ <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (T && (T & 240) === 0) {
            for (b = $, A = T, D = k; M = n.lencode[D + ((f & (1 << b + A) - 1) >> b)], $ = M >>> 24, T = M >>> 16 & 255, k = M & 65535, !(b + $ <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= b, u -= b, n.back += b;
          }
          if (f >>>= $, u -= $, n.back += $, n.length = k, T === 0) {
            n.mode = oa;
            break;
          }
          if (T & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (T & 64) {
            t.msg = "invalid literal/length code", n.mode = $t;
            break;
          }
          n.extra = T & 15, n.mode = ia;
        /* falls through */
        case ia:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = ra;
        /* falls through */
        case ra:
          for (; M = n.distcode[f & (1 << n.distbits) - 1], $ = M >>> 24, T = M >>> 16 & 255, k = M & 65535, !($ <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((T & 240) === 0) {
            for (b = $, A = T, D = k; M = n.distcode[D + ((f & (1 << b + A) - 1) >> b)], $ = M >>> 24, T = M >>> 16 & 255, k = M & 65535, !(b + $ <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= b, u -= b, n.back += b;
          }
          if (f >>>= $, u -= $, n.back += $, T & 64) {
            t.msg = "invalid distance code", n.mode = $t;
            break;
          }
          n.offset = k, n.extra = T & 15, n.mode = aa;
        /* falls through */
        case aa:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = $t;
            break;
          }
          n.mode = sa;
        /* falls through */
        case sa:
          if (c === 0)
            break t;
          if (d = p - c, n.offset > d) {
            if (d = n.offset - d, d > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = $t;
              break;
            }
            d > n.wnext ? (d -= n.wnext, v = n.wsize - d) : v = n.wnext - d, d > n.length && (d = n.length), O = n.window;
          } else
            O = r, v = s - n.offset, d = n.length;
          d > c && (d = c), c -= d, n.length -= d;
          do
            r[s++] = O[v++];
          while (--d);
          n.length === 0 && (n.mode = _n);
          break;
        case oa:
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
            n.flags ? ie(n.check, r, p, s - p) : Oi(n.check, r, p, s - p)), p = c, n.wrap & 4 && (n.flags ? f : fa(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = $t;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = la;
        /* falls through */
        case la:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = $t;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          z = i0;
          break t;
        case $t:
          z = Us;
          break t;
        case qs:
          return Zs;
        case Gs:
        /* falls through */
        default:
          return Kt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, (n.wsize || p !== t.avail_out && n.mode < $t && (n.mode < ti || e !== Pr)) && Js(t, t.output, t.next_out, p - t.avail_out), m -= t.avail_in, p -= t.avail_out, t.total_in += m, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ie(n.check, r, p, t.next_out - p) : Oi(n.check, r, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (m === 0 && p === 0 || e === Pr) && z === Ee && (z = a0), z;
}, p0 = (t) => {
  if (Ae(t))
    return Kt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ee;
}, _0 = (t, e) => {
  if (Ae(t))
    return Kt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Kt : (n.head = e, e.done = !1, Ee);
}, g0 = (t, e) => {
  const n = e.length;
  let i, r, a;
  return Ae(t) || (i = t.state, i.wrap !== 0 && i.mode !== Fn) ? Kt : i.mode === Fn && (r = 1, r = Oi(r, e, n, 0), r !== i.check) ? Us : (a = Js(t, e, n, n), a ? (i.mode = qs, Zs) : (i.havedict = 1, Ee));
};
var m0 = Xs, v0 = Ks, w0 = Ws, y0 = u0, x0 = Ys, b0 = d0, k0 = p0, T0 = _0, E0 = g0, S0 = "pako inflate (from Nodeca project)", ce = {
  inflateReset: m0,
  inflateReset2: v0,
  inflateResetKeep: w0,
  inflateInit: y0,
  inflateInit2: x0,
  inflate: b0,
  inflateEnd: k0,
  inflateGetHeader: T0,
  inflateSetDictionary: E0,
  inflateInfo: S0
};
function A0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var $0 = A0;
const Qs = Object.prototype.toString, {
  Z_NO_FLUSH: N0,
  Z_FINISH: I0,
  Z_OK: tn,
  Z_STREAM_END: ii,
  Z_NEED_DICT: ri,
  Z_STREAM_ERROR: D0,
  Z_DATA_ERROR: ha,
  Z_MEM_ERROR: R0
} = zs;
function qn(t) {
  this.options = Bs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Wd(), this.strm.avail_out = 0;
  let n = ce.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== tn)
    throw new Error(Ci[n]);
  if (this.header = new $0(), ce.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Fi.string2buf(e.dictionary) : Qs.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = ce.inflateSetDictionary(this.strm, e.dictionary), n !== tn)))
    throw new Error(Ci[n]);
}
qn.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? I0 : N0, Qs.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = ce.inflate(n, s), a === ri && r && (a = ce.inflateSetDictionary(n, r), a === tn ? a = ce.inflate(n, s) : a === ha && (a = ri)); n.avail_in > 0 && a === ii && n.state.wrap > 0 && t[n.next_in] !== 0; )
      ce.inflateReset(n), a = ce.inflate(n, s);
    switch (a) {
      case D0:
      case ha:
      case ri:
      case R0:
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
  t === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Bs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function M0(t, e) {
  const n = new qn(e);
  if (n.push(t), n.err) throw n.msg || Ci[n.err];
  return n.result;
}
var L0 = M0, O0 = {
  inflate: L0
};
const { inflate: C0 } = O0;
var F0 = C0;
const z0 = { refName: "seq_id" }, B0 = { seq_id: "refName" };
class zn {
  constructor(e, n, i) {
    this.ncFeature = e, this.uniqueId = i || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (z0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return B0[n] || n;
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
function H0(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function P0(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return H0(new Uint8Array(n)) ? F0(n) : n;
}
async function Ep({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const i = new kd({
    urlTemplate: t,
    baseUrl: e,
    readFile: P0
  }), r = [];
  for await (const a of i.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    r.push(new zn(a).toJSON());
  return r;
}
async function Sp({
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
function da(t) {
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
          throw new Error(`${da(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${da(r)} fetching ${e}`, { cause: r });
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
var ai = {}, pa;
function de() {
  return pa || (pa = 1, function(t) {
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
        var s, o, c, f, u, m;
        for (c = 0, s = 0, o = a.length; s < o; s++)
          c += a[s].length;
        for (m = new Uint8Array(c), f = 0, s = 0, o = a.length; s < o; s++)
          u = a[s], m.set(u, f), f += u.length;
        return m;
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
var Ne = {}, Jt = {}, _e = {}, _a;
function V0() {
  if (_a) return _e;
  _a = 1;
  var t = de(), e = 4, n = 0, i = 1, r = 2;
  function a(g) {
    for (var B = g.length; --B >= 0; )
      g[B] = 0;
  }
  var s = 0, o = 1, c = 2, f = 3, u = 258, m = 29, p = 256, d = p + 1 + m, v = 30, O = 19, M = 2 * d + 1, $ = 15, T = 16, k = 7, b = 256, A = 16, D = 17, E = 18, z = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), F = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), C = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], V = 512, P = new Array((d + 2) * 2);
  a(P);
  var J = new Array(v * 2);
  a(J);
  var nt = new Array(V);
  a(nt);
  var lt = new Array(u - f + 1);
  a(lt);
  var X = new Array(m);
  a(X);
  var et = new Array(v);
  a(et);
  function U(g, B, I, W, x) {
    this.static_tree = g, this.extra_bits = B, this.extra_base = I, this.elems = W, this.max_length = x, this.has_stree = g && g.length;
  }
  var it, Dt, Q;
  function gt(g, B) {
    this.dyn_tree = g, this.max_code = 0, this.stat_desc = B;
  }
  function kt(g) {
    return g < 256 ? nt[g] : nt[256 + (g >>> 7)];
  }
  function ht(g, B) {
    g.pending_buf[g.pending++] = B & 255, g.pending_buf[g.pending++] = B >>> 8 & 255;
  }
  function j(g, B, I) {
    g.bi_valid > T - I ? (g.bi_buf |= B << g.bi_valid & 65535, ht(g, g.bi_buf), g.bi_buf = B >> T - g.bi_valid, g.bi_valid += I - T) : (g.bi_buf |= B << g.bi_valid & 65535, g.bi_valid += I);
  }
  function ot(g, B, I) {
    j(
      g,
      I[B * 2],
      I[B * 2 + 1]
      /*.Len*/
    );
  }
  function ft(g, B) {
    var I = 0;
    do
      I |= g & 1, g >>>= 1, I <<= 1;
    while (--B > 0);
    return I >>> 1;
  }
  function bt(g) {
    g.bi_valid === 16 ? (ht(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : g.bi_valid >= 8 && (g.pending_buf[g.pending++] = g.bi_buf & 255, g.bi_buf >>= 8, g.bi_valid -= 8);
  }
  function Nt(g, B) {
    var I = B.dyn_tree, W = B.max_code, x = B.stat_desc.static_tree, L = B.stat_desc.has_stree, h = B.stat_desc.extra_bits, H = B.stat_desc.extra_base, tt = B.stat_desc.max_length, l, S, R, _, w, N, q = 0;
    for (_ = 0; _ <= $; _++)
      g.bl_count[_] = 0;
    for (I[g.heap[g.heap_max] * 2 + 1] = 0, l = g.heap_max + 1; l < M; l++)
      S = g.heap[l], _ = I[I[S * 2 + 1] * 2 + 1] + 1, _ > tt && (_ = tt, q++), I[S * 2 + 1] = _, !(S > W) && (g.bl_count[_]++, w = 0, S >= H && (w = h[S - H]), N = I[S * 2], g.opt_len += N * (_ + w), L && (g.static_len += N * (x[S * 2 + 1] + w)));
    if (q !== 0) {
      do {
        for (_ = tt - 1; g.bl_count[_] === 0; )
          _--;
        g.bl_count[_]--, g.bl_count[_ + 1] += 2, g.bl_count[tt]--, q -= 2;
      } while (q > 0);
      for (_ = tt; _ !== 0; _--)
        for (S = g.bl_count[_]; S !== 0; )
          R = g.heap[--l], !(R > W) && (I[R * 2 + 1] !== _ && (g.opt_len += (_ - I[R * 2 + 1]) * I[R * 2], I[R * 2 + 1] = _), S--);
    }
  }
  function Tt(g, B, I) {
    var W = new Array($ + 1), x = 0, L, h;
    for (L = 1; L <= $; L++)
      W[L] = x = x + I[L - 1] << 1;
    for (h = 0; h <= B; h++) {
      var H = g[h * 2 + 1];
      H !== 0 && (g[h * 2] = ft(W[H]++, H));
    }
  }
  function st() {
    var g, B, I, W, x, L = new Array($ + 1);
    for (I = 0, W = 0; W < m - 1; W++)
      for (X[W] = I, g = 0; g < 1 << z[W]; g++)
        lt[I++] = W;
    for (lt[I - 1] = W, x = 0, W = 0; W < 16; W++)
      for (et[W] = x, g = 0; g < 1 << F[W]; g++)
        nt[x++] = W;
    for (x >>= 7; W < v; W++)
      for (et[W] = x << 7, g = 0; g < 1 << F[W] - 7; g++)
        nt[256 + x++] = W;
    for (B = 0; B <= $; B++)
      L[B] = 0;
    for (g = 0; g <= 143; )
      P[g * 2 + 1] = 8, g++, L[8]++;
    for (; g <= 255; )
      P[g * 2 + 1] = 9, g++, L[9]++;
    for (; g <= 279; )
      P[g * 2 + 1] = 7, g++, L[7]++;
    for (; g <= 287; )
      P[g * 2 + 1] = 8, g++, L[8]++;
    for (Tt(P, d + 1, L), g = 0; g < v; g++)
      J[g * 2 + 1] = 5, J[g * 2] = ft(g, 5);
    it = new U(P, z, p + 1, d, $), Dt = new U(J, F, 0, v, $), Q = new U(new Array(0), C, 0, O, k);
  }
  function rt(g) {
    var B;
    for (B = 0; B < d; B++)
      g.dyn_ltree[B * 2] = 0;
    for (B = 0; B < v; B++)
      g.dyn_dtree[B * 2] = 0;
    for (B = 0; B < O; B++)
      g.bl_tree[B * 2] = 0;
    g.dyn_ltree[b * 2] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0;
  }
  function yt(g) {
    g.bi_valid > 8 ? ht(g, g.bi_buf) : g.bi_valid > 0 && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0;
  }
  function It(g, B, I, W) {
    yt(g), ht(g, I), ht(g, ~I), t.arraySet(g.pending_buf, g.window, B, I, g.pending), g.pending += I;
  }
  function ct(g, B, I, W) {
    var x = B * 2, L = I * 2;
    return g[x] < g[L] || g[x] === g[L] && W[B] <= W[I];
  }
  function _t(g, B, I) {
    for (var W = g.heap[I], x = I << 1; x <= g.heap_len && (x < g.heap_len && ct(B, g.heap[x + 1], g.heap[x], g.depth) && x++, !ct(B, W, g.heap[x], g.depth)); )
      g.heap[I] = g.heap[x], I = x, x <<= 1;
    g.heap[I] = W;
  }
  function Z(g, B, I) {
    var W, x, L = 0, h, H;
    if (g.last_lit !== 0)
      do
        W = g.pending_buf[g.d_buf + L * 2] << 8 | g.pending_buf[g.d_buf + L * 2 + 1], x = g.pending_buf[g.l_buf + L], L++, W === 0 ? ot(g, x, B) : (h = lt[x], ot(g, h + p + 1, B), H = z[h], H !== 0 && (x -= X[h], j(g, x, H)), W--, h = kt(W), ot(g, h, I), H = F[h], H !== 0 && (W -= et[h], j(g, W, H)));
      while (L < g.last_lit);
    ot(g, b, B);
  }
  function xt(g, B) {
    var I = B.dyn_tree, W = B.stat_desc.static_tree, x = B.stat_desc.has_stree, L = B.stat_desc.elems, h, H, tt = -1, l;
    for (g.heap_len = 0, g.heap_max = M, h = 0; h < L; h++)
      I[h * 2] !== 0 ? (g.heap[++g.heap_len] = tt = h, g.depth[h] = 0) : I[h * 2 + 1] = 0;
    for (; g.heap_len < 2; )
      l = g.heap[++g.heap_len] = tt < 2 ? ++tt : 0, I[l * 2] = 1, g.depth[l] = 0, g.opt_len--, x && (g.static_len -= W[l * 2 + 1]);
    for (B.max_code = tt, h = g.heap_len >> 1; h >= 1; h--)
      _t(g, I, h);
    l = L;
    do
      h = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[
        1
        /*SMALLEST*/
      ] = g.heap[g.heap_len--], _t(
        g,
        I,
        1
        /*SMALLEST*/
      ), H = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[--g.heap_max] = h, g.heap[--g.heap_max] = H, I[l * 2] = I[h * 2] + I[H * 2], g.depth[l] = (g.depth[h] >= g.depth[H] ? g.depth[h] : g.depth[H]) + 1, I[h * 2 + 1] = I[H * 2 + 1] = l, g.heap[
        1
        /*SMALLEST*/
      ] = l++, _t(
        g,
        I,
        1
        /*SMALLEST*/
      );
    while (g.heap_len >= 2);
    g.heap[--g.heap_max] = g.heap[
      1
      /*SMALLEST*/
    ], Nt(g, B), Tt(I, tt, g.bl_count);
  }
  function Ft(g, B, I) {
    var W, x = -1, L, h = B[0 * 2 + 1], H = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), B[(I + 1) * 2 + 1] = 65535, W = 0; W <= I; W++)
      L = h, h = B[(W + 1) * 2 + 1], !(++H < tt && L === h) && (H < l ? g.bl_tree[L * 2] += H : L !== 0 ? (L !== x && g.bl_tree[L * 2]++, g.bl_tree[A * 2]++) : H <= 10 ? g.bl_tree[D * 2]++ : g.bl_tree[E * 2]++, H = 0, x = L, h === 0 ? (tt = 138, l = 3) : L === h ? (tt = 6, l = 3) : (tt = 7, l = 4));
  }
  function Et(g, B, I) {
    var W, x = -1, L, h = B[0 * 2 + 1], H = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), W = 0; W <= I; W++)
      if (L = h, h = B[(W + 1) * 2 + 1], !(++H < tt && L === h)) {
        if (H < l)
          do
            ot(g, L, g.bl_tree);
          while (--H !== 0);
        else L !== 0 ? (L !== x && (ot(g, L, g.bl_tree), H--), ot(g, A, g.bl_tree), j(g, H - 3, 2)) : H <= 10 ? (ot(g, D, g.bl_tree), j(g, H - 3, 3)) : (ot(g, E, g.bl_tree), j(g, H - 11, 7));
        H = 0, x = L, h === 0 ? (tt = 138, l = 3) : L === h ? (tt = 6, l = 3) : (tt = 7, l = 4);
      }
  }
  function Rt(g) {
    var B;
    for (Ft(g, g.dyn_ltree, g.l_desc.max_code), Ft(g, g.dyn_dtree, g.d_desc.max_code), xt(g, g.bl_desc), B = O - 1; B >= 3 && g.bl_tree[y[B] * 2 + 1] === 0; B--)
      ;
    return g.opt_len += 3 * (B + 1) + 5 + 5 + 4, B;
  }
  function Ut(g, B, I, W) {
    var x;
    for (j(g, B - 257, 5), j(g, I - 1, 5), j(g, W - 4, 4), x = 0; x < W; x++)
      j(g, g.bl_tree[y[x] * 2 + 1], 3);
    Et(g, g.dyn_ltree, B - 1), Et(g, g.dyn_dtree, I - 1);
  }
  function St(g) {
    var B = 4093624447, I;
    for (I = 0; I <= 31; I++, B >>>= 1)
      if (B & 1 && g.dyn_ltree[I * 2] !== 0)
        return n;
    if (g.dyn_ltree[9 * 2] !== 0 || g.dyn_ltree[10 * 2] !== 0 || g.dyn_ltree[13 * 2] !== 0)
      return i;
    for (I = 32; I < p; I++)
      if (g.dyn_ltree[I * 2] !== 0)
        return i;
    return n;
  }
  var vt = !1;
  function qt(g) {
    vt || (st(), vt = !0), g.l_desc = new gt(g.dyn_ltree, it), g.d_desc = new gt(g.dyn_dtree, Dt), g.bl_desc = new gt(g.bl_tree, Q), g.bi_buf = 0, g.bi_valid = 0, rt(g);
  }
  function ut(g, B, I, W) {
    j(g, (s << 1) + (W ? 1 : 0), 3), It(g, B, I);
  }
  function Y(g) {
    j(g, o << 1, 3), ot(g, b, P), bt(g);
  }
  function at(g, B, I, W) {
    var x, L, h = 0;
    g.level > 0 ? (g.strm.data_type === r && (g.strm.data_type = St(g)), xt(g, g.l_desc), xt(g, g.d_desc), h = Rt(g), x = g.opt_len + 3 + 7 >>> 3, L = g.static_len + 3 + 7 >>> 3, L <= x && (x = L)) : x = L = I + 5, I + 4 <= x && B !== -1 ? ut(g, B, I, W) : g.strategy === e || L === x ? (j(g, (o << 1) + (W ? 1 : 0), 3), Z(g, P, J)) : (j(g, (c << 1) + (W ? 1 : 0), 3), Ut(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, h + 1), Z(g, g.dyn_ltree, g.dyn_dtree)), rt(g), W && yt(g);
  }
  function dt(g, B, I) {
    return g.pending_buf[g.d_buf + g.last_lit * 2] = B >>> 8 & 255, g.pending_buf[g.d_buf + g.last_lit * 2 + 1] = B & 255, g.pending_buf[g.l_buf + g.last_lit] = I & 255, g.last_lit++, B === 0 ? g.dyn_ltree[I * 2]++ : (g.matches++, B--, g.dyn_ltree[(lt[I] + p + 1) * 2]++, g.dyn_dtree[kt(B) * 2]++), g.last_lit === g.lit_bufsize - 1;
  }
  return _e._tr_init = qt, _e._tr_stored_block = ut, _e._tr_flush_block = at, _e._tr_tally = dt, _e._tr_align = Y, _e;
}
var si, ga;
function js() {
  if (ga) return si;
  ga = 1;
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
var oi, ma;
function to() {
  if (ma) return oi;
  ma = 1;
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
var li, va;
function ir() {
  return va || (va = 1, li = {
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
var wa;
function U0() {
  if (wa) return Jt;
  wa = 1;
  var t = de(), e = V0(), n = js(), i = to(), r = ir(), a = 0, s = 1, o = 3, c = 4, f = 5, u = 0, m = 1, p = -2, d = -3, v = -5, O = -1, M = 1, $ = 2, T = 3, k = 4, b = 0, A = 2, D = 8, E = 9, z = 15, F = 8, C = 29, y = 256, V = y + 1 + C, P = 30, J = 19, nt = 2 * V + 1, lt = 15, X = 3, et = 258, U = et + X + 1, it = 32, Dt = 42, Q = 69, gt = 73, kt = 91, ht = 103, j = 113, ot = 666, ft = 1, bt = 2, Nt = 3, Tt = 4, st = 3;
  function rt(l, S) {
    return l.msg = r[S], S;
  }
  function yt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function It(l) {
    for (var S = l.length; --S >= 0; )
      l[S] = 0;
  }
  function ct(l) {
    var S = l.state, R = S.pending;
    R > l.avail_out && (R = l.avail_out), R !== 0 && (t.arraySet(l.output, S.pending_buf, S.pending_out, R, l.next_out), l.next_out += R, S.pending_out += R, l.total_out += R, l.avail_out -= R, S.pending -= R, S.pending === 0 && (S.pending_out = 0));
  }
  function _t(l, S) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, S), l.block_start = l.strstart, ct(l.strm);
  }
  function Z(l, S) {
    l.pending_buf[l.pending++] = S;
  }
  function xt(l, S) {
    l.pending_buf[l.pending++] = S >>> 8 & 255, l.pending_buf[l.pending++] = S & 255;
  }
  function Ft(l, S, R, _) {
    var w = l.avail_in;
    return w > _ && (w = _), w === 0 ? 0 : (l.avail_in -= w, t.arraySet(S, l.input, l.next_in, w, R), l.state.wrap === 1 ? l.adler = n(l.adler, S, w, R) : l.state.wrap === 2 && (l.adler = i(l.adler, S, w, R)), l.next_in += w, l.total_in += w, w);
  }
  function Et(l, S) {
    var R = l.max_chain_length, _ = l.strstart, w, N, q = l.prev_length, G = l.nice_match, K = l.strstart > l.w_size - U ? l.strstart - (l.w_size - U) : 0, pt = l.window, Yt = l.w_mask, At = l.prev, mt = l.strstart + et, Ct = pt[_ + q - 1], Bt = pt[_ + q];
    l.prev_length >= l.good_match && (R >>= 2), G > l.lookahead && (G = l.lookahead);
    do
      if (w = S, !(pt[w + q] !== Bt || pt[w + q - 1] !== Ct || pt[w] !== pt[_] || pt[++w] !== pt[_ + 1])) {
        _ += 2, w++;
        do
          ;
        while (pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && pt[++_] === pt[++w] && _ < mt);
        if (N = et - (mt - _), _ = mt - et, N > q) {
          if (l.match_start = S, q = N, N >= G)
            break;
          Ct = pt[_ + q - 1], Bt = pt[_ + q];
        }
      }
    while ((S = At[S & Yt]) > K && --R !== 0);
    return q <= l.lookahead ? q : l.lookahead;
  }
  function Rt(l) {
    var S = l.w_size, R, _, w, N, q;
    do {
      if (N = l.window_size - l.lookahead - l.strstart, l.strstart >= S + (S - U)) {
        t.arraySet(l.window, l.window, S, S, 0), l.match_start -= S, l.strstart -= S, l.block_start -= S, _ = l.hash_size, R = _;
        do
          w = l.head[--R], l.head[R] = w >= S ? w - S : 0;
        while (--_);
        _ = S, R = _;
        do
          w = l.prev[--R], l.prev[R] = w >= S ? w - S : 0;
        while (--_);
        N += S;
      }
      if (l.strm.avail_in === 0)
        break;
      if (_ = Ft(l.strm, l.window, l.strstart + l.lookahead, N), l.lookahead += _, l.lookahead + l.insert >= X)
        for (q = l.strstart - l.insert, l.ins_h = l.window[q], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[q + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[q + X - 1]) & l.hash_mask, l.prev[q & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = q, q++, l.insert--, !(l.lookahead + l.insert < X)); )
          ;
    } while (l.lookahead < U && l.strm.avail_in !== 0);
  }
  function Ut(l, S) {
    var R = 65535;
    for (R > l.pending_buf_size - 5 && (R = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (Rt(l), l.lookahead === 0 && S === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var _ = l.block_start + R;
      if ((l.strstart === 0 || l.strstart >= _) && (l.lookahead = l.strstart - _, l.strstart = _, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - U && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, S === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : Tt) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ft);
  }
  function St(l, S) {
    for (var R, _; ; ) {
      if (l.lookahead < U) {
        if (Rt(l), l.lookahead < U && S === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (R = 0, l.lookahead >= X && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, R = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), R !== 0 && l.strstart - R <= l.w_size - U && (l.match_length = Et(l, R)), l.match_length >= X)
        if (_ = e._tr_tally(l, l.strstart - l.match_start, l.match_length - X), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= X) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, R = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        _ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (_ && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = l.strstart < X - 1 ? l.strstart : X - 1, S === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : Tt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : bt;
  }
  function vt(l, S) {
    for (var R, _, w; ; ) {
      if (l.lookahead < U) {
        if (Rt(l), l.lookahead < U && S === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (R = 0, l.lookahead >= X && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, R = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = X - 1, R !== 0 && l.prev_length < l.max_lazy_match && l.strstart - R <= l.w_size - U && (l.match_length = Et(l, R), l.match_length <= 5 && (l.strategy === M || l.match_length === X && l.strstart - l.match_start > 4096) && (l.match_length = X - 1)), l.prev_length >= X && l.match_length <= l.prev_length) {
        w = l.strstart + l.lookahead - X, _ = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - X), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= w && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, R = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = X - 1, l.strstart++, _ && (_t(l, !1), l.strm.avail_out === 0))
          return ft;
      } else if (l.match_available) {
        if (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), _ && _t(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ft;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < X - 1 ? l.strstart : X - 1, S === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : Tt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : bt;
  }
  function qt(l, S) {
    for (var R, _, w, N, q = l.window; ; ) {
      if (l.lookahead <= et) {
        if (Rt(l), l.lookahead <= et && S === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= X && l.strstart > 0 && (w = l.strstart - 1, _ = q[w], _ === q[++w] && _ === q[++w] && _ === q[++w])) {
        N = l.strstart + et;
        do
          ;
        while (_ === q[++w] && _ === q[++w] && _ === q[++w] && _ === q[++w] && _ === q[++w] && _ === q[++w] && _ === q[++w] && _ === q[++w] && w < N);
        l.match_length = et - (N - w), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= X ? (R = e._tr_tally(l, 1, l.match_length - X), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (R = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), R && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, S === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : Tt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : bt;
  }
  function ut(l, S) {
    for (var R; ; ) {
      if (l.lookahead === 0 && (Rt(l), l.lookahead === 0)) {
        if (S === a)
          return ft;
        break;
      }
      if (l.match_length = 0, R = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, R && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, S === c ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : Tt) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : bt;
  }
  function Y(l, S, R, _, w) {
    this.good_length = l, this.max_lazy = S, this.nice_length = R, this.max_chain = _, this.func = w;
  }
  var at;
  at = [
    /*      good lazy nice chain */
    new Y(0, 0, 0, 0, Ut),
    /* 0 store only */
    new Y(4, 4, 8, 4, St),
    /* 1 max speed, no lazy matches */
    new Y(4, 5, 16, 8, St),
    /* 2 */
    new Y(4, 6, 32, 32, St),
    /* 3 */
    new Y(4, 4, 16, 16, vt),
    /* 4 lazy matches */
    new Y(8, 16, 32, 32, vt),
    /* 5 */
    new Y(8, 16, 128, 128, vt),
    /* 6 */
    new Y(8, 32, 128, 256, vt),
    /* 7 */
    new Y(32, 128, 258, 1024, vt),
    /* 8 */
    new Y(32, 258, 258, 4096, vt)
    /* 9 max compression */
  ];
  function dt(l) {
    l.window_size = 2 * l.w_size, It(l.head), l.max_lazy_match = at[l.level].max_lazy, l.good_match = at[l.level].good_length, l.nice_match = at[l.level].nice_length, l.max_chain_length = at[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = X - 1, l.match_available = 0, l.ins_h = 0;
  }
  function g() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = D, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(nt * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * J + 1) * 2), It(this.dyn_ltree), It(this.dyn_dtree), It(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(lt + 1), this.heap = new t.Buf16(2 * V + 1), It(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * V + 1), It(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function B(l) {
    var S;
    return !l || !l.state ? rt(l, p) : (l.total_in = l.total_out = 0, l.data_type = A, S = l.state, S.pending = 0, S.pending_out = 0, S.wrap < 0 && (S.wrap = -S.wrap), S.status = S.wrap ? Dt : j, l.adler = S.wrap === 2 ? 0 : 1, S.last_flush = a, e._tr_init(S), u);
  }
  function I(l) {
    var S = B(l);
    return S === u && dt(l.state), S;
  }
  function W(l, S) {
    return !l || !l.state || l.state.wrap !== 2 ? p : (l.state.gzhead = S, u);
  }
  function x(l, S, R, _, w, N) {
    if (!l)
      return p;
    var q = 1;
    if (S === O && (S = 6), _ < 0 ? (q = 0, _ = -_) : _ > 15 && (q = 2, _ -= 16), w < 1 || w > E || R !== D || _ < 8 || _ > 15 || S < 0 || S > 9 || N < 0 || N > k)
      return rt(l, p);
    _ === 8 && (_ = 9);
    var G = new g();
    return l.state = G, G.strm = l, G.wrap = q, G.gzhead = null, G.w_bits = _, G.w_size = 1 << G.w_bits, G.w_mask = G.w_size - 1, G.hash_bits = w + 7, G.hash_size = 1 << G.hash_bits, G.hash_mask = G.hash_size - 1, G.hash_shift = ~~((G.hash_bits + X - 1) / X), G.window = new t.Buf8(G.w_size * 2), G.head = new t.Buf16(G.hash_size), G.prev = new t.Buf16(G.w_size), G.lit_bufsize = 1 << w + 6, G.pending_buf_size = G.lit_bufsize * 4, G.pending_buf = new t.Buf8(G.pending_buf_size), G.d_buf = 1 * G.lit_bufsize, G.l_buf = 3 * G.lit_bufsize, G.level = S, G.strategy = N, G.method = R, I(l);
  }
  function L(l, S) {
    return x(l, S, D, z, F, b);
  }
  function h(l, S) {
    var R, _, w, N;
    if (!l || !l.state || S > f || S < 0)
      return l ? rt(l, p) : p;
    if (_ = l.state, !l.output || !l.input && l.avail_in !== 0 || _.status === ot && S !== c)
      return rt(l, l.avail_out === 0 ? v : p);
    if (_.strm = l, R = _.last_flush, _.last_flush = S, _.status === Dt)
      if (_.wrap === 2)
        l.adler = 0, Z(_, 31), Z(_, 139), Z(_, 8), _.gzhead ? (Z(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), Z(_, _.gzhead.time & 255), Z(_, _.gzhead.time >> 8 & 255), Z(_, _.gzhead.time >> 16 & 255), Z(_, _.gzhead.time >> 24 & 255), Z(_, _.level === 9 ? 2 : _.strategy >= $ || _.level < 2 ? 4 : 0), Z(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (Z(_, _.gzhead.extra.length & 255), Z(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (l.adler = i(l.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = Q) : (Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, 0), Z(_, _.level === 9 ? 2 : _.strategy >= $ || _.level < 2 ? 4 : 0), Z(_, st), _.status = j);
      else {
        var q = D + (_.w_bits - 8 << 4) << 8, G = -1;
        _.strategy >= $ || _.level < 2 ? G = 0 : _.level < 6 ? G = 1 : _.level === 6 ? G = 2 : G = 3, q |= G << 6, _.strstart !== 0 && (q |= it), q += 31 - q % 31, _.status = j, xt(_, q), _.strstart !== 0 && (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), l.adler = 1;
      }
    if (_.status === Q)
      if (_.gzhead.extra) {
        for (w = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), ct(l), w = _.pending, _.pending === _.pending_buf_size)); )
          Z(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = gt);
      } else
        _.status = gt;
    if (_.status === gt)
      if (_.gzhead.name) {
        w = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), ct(l), w = _.pending, _.pending === _.pending_buf_size)) {
            N = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? N = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : N = 0, Z(_, N);
        } while (N !== 0);
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), N === 0 && (_.gzindex = 0, _.status = kt);
      } else
        _.status = kt;
    if (_.status === kt)
      if (_.gzhead.comment) {
        w = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), ct(l), w = _.pending, _.pending === _.pending_buf_size)) {
            N = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? N = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : N = 0, Z(_, N);
        } while (N !== 0);
        _.gzhead.hcrc && _.pending > w && (l.adler = i(l.adler, _.pending_buf, _.pending - w, w)), N === 0 && (_.status = ht);
      } else
        _.status = ht;
    if (_.status === ht && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && ct(l), _.pending + 2 <= _.pending_buf_size && (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), l.adler = 0, _.status = j)) : _.status = j), _.pending !== 0) {
      if (ct(l), l.avail_out === 0)
        return _.last_flush = -1, u;
    } else if (l.avail_in === 0 && yt(S) <= yt(R) && S !== c)
      return rt(l, v);
    if (_.status === ot && l.avail_in !== 0)
      return rt(l, v);
    if (l.avail_in !== 0 || _.lookahead !== 0 || S !== a && _.status !== ot) {
      var K = _.strategy === $ ? ut(_, S) : _.strategy === T ? qt(_, S) : at[_.level].func(_, S);
      if ((K === Nt || K === Tt) && (_.status = ot), K === ft || K === Nt)
        return l.avail_out === 0 && (_.last_flush = -1), u;
      if (K === bt && (S === s ? e._tr_align(_) : S !== f && (e._tr_stored_block(_, 0, 0, !1), S === o && (It(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), ct(l), l.avail_out === 0))
        return _.last_flush = -1, u;
    }
    return S !== c ? u : _.wrap <= 0 ? m : (_.wrap === 2 ? (Z(_, l.adler & 255), Z(_, l.adler >> 8 & 255), Z(_, l.adler >> 16 & 255), Z(_, l.adler >> 24 & 255), Z(_, l.total_in & 255), Z(_, l.total_in >> 8 & 255), Z(_, l.total_in >> 16 & 255), Z(_, l.total_in >> 24 & 255)) : (xt(_, l.adler >>> 16), xt(_, l.adler & 65535)), ct(l), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? u : m);
  }
  function H(l) {
    var S;
    return !l || !l.state ? p : (S = l.state.status, S !== Dt && S !== Q && S !== gt && S !== kt && S !== ht && S !== j && S !== ot ? rt(l, p) : (l.state = null, S === j ? rt(l, d) : u));
  }
  function tt(l, S) {
    var R = S.length, _, w, N, q, G, K, pt, Yt;
    if (!l || !l.state || (_ = l.state, q = _.wrap, q === 2 || q === 1 && _.status !== Dt || _.lookahead))
      return p;
    for (q === 1 && (l.adler = n(l.adler, S, R, 0)), _.wrap = 0, R >= _.w_size && (q === 0 && (It(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), Yt = new t.Buf8(_.w_size), t.arraySet(Yt, S, R - _.w_size, _.w_size, 0), S = Yt, R = _.w_size), G = l.avail_in, K = l.next_in, pt = l.input, l.avail_in = R, l.next_in = 0, l.input = S, Rt(_); _.lookahead >= X; ) {
      w = _.strstart, N = _.lookahead - (X - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[w + X - 1]) & _.hash_mask, _.prev[w & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = w, w++;
      while (--N);
      _.strstart = w, _.lookahead = X - 1, Rt(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = X - 1, _.match_available = 0, l.next_in = K, l.input = pt, l.avail_in = G, _.wrap = q, u;
  }
  return Jt.deflateInit = L, Jt.deflateInit2 = x, Jt.deflateReset = I, Jt.deflateResetKeep = B, Jt.deflateSetHeader = W, Jt.deflate = h, Jt.deflateEnd = H, Jt.deflateSetDictionary = tt, Jt.deflateInfo = "pako deflate (from Nodeca project)", Jt;
}
var ge = {}, ya;
function eo() {
  if (ya) return ge;
  ya = 1;
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
    var o, c, f, u, m, p = s.length, d = 0;
    for (u = 0; u < p; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), d += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (o = new t.Buf8(d), m = 0, u = 0; m < d; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), c < 128 ? o[m++] = c : c < 2048 ? (o[m++] = 192 | c >>> 6, o[m++] = 128 | c & 63) : c < 65536 ? (o[m++] = 224 | c >>> 12, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63) : (o[m++] = 240 | c >>> 18, o[m++] = 128 | c >>> 12 & 63, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63);
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
    var c, f, u, m, p = o || s.length, d = new Array(p * 2);
    for (f = 0, c = 0; c < p; ) {
      if (u = s[c++], u < 128) {
        d[f++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        d[f++] = 65533, c += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && c < p; )
        u = u << 6 | s[c++] & 63, m--;
      if (m > 1) {
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
function no() {
  if (xa) return ci;
  xa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return ci = t, ci;
}
var ba;
function Z0() {
  if (ba) return Ne;
  ba = 1;
  var t = U0(), e = de(), n = eo(), i = ir(), r = no(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, u = 2, m = -1, p = 0, d = 8;
  function v(T) {
    if (!(this instanceof v)) return new v(T);
    this.options = e.assign({
      level: m,
      method: d,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, T || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var b = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (b !== c)
      throw new Error(i[b]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var A;
      if (typeof k.dictionary == "string" ? A = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? A = new Uint8Array(k.dictionary) : A = k.dictionary, b = t.deflateSetDictionary(this.strm, A), b !== c)
        throw new Error(i[b]);
      this._dict_set = !0;
    }
  }
  v.prototype.push = function(T, k) {
    var b = this.strm, A = this.options.chunkSize, D, E;
    if (this.ended)
      return !1;
    E = k === ~~k ? k : k === !0 ? o : s, typeof T == "string" ? b.input = n.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? b.input = new Uint8Array(T) : b.input = T, b.next_in = 0, b.avail_in = b.input.length;
    do {
      if (b.avail_out === 0 && (b.output = new e.Buf8(A), b.next_out = 0, b.avail_out = A), D = t.deflate(b, E), D !== f && D !== c)
        return this.onEnd(D), this.ended = !0, !1;
      (b.avail_out === 0 || b.avail_in === 0 && (E === o || E === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(b.output, b.next_out))) : this.onData(e.shrinkBuf(b.output, b.next_out)));
    } while ((b.avail_in > 0 || b.avail_out === 0) && D !== f);
    return E === o ? (D = t.deflateEnd(this.strm), this.onEnd(D), this.ended = !0, D === c) : (E === u && (this.onEnd(c), b.avail_out = 0), !0);
  }, v.prototype.onData = function(T) {
    this.chunks.push(T);
  }, v.prototype.onEnd = function(T) {
    T === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function O(T, k) {
    var b = new v(k);
    if (b.push(T, !0), b.err)
      throw b.msg || i[b.err];
    return b.result;
  }
  function M(T, k) {
    return k = k || {}, k.raw = !0, O(T, k);
  }
  function $(T, k) {
    return k = k || {}, k.gzip = !0, O(T, k);
  }
  return Ne.Deflate = v, Ne.deflate = O, Ne.deflateRaw = M, Ne.gzip = $, Ne;
}
var Ie = {}, Wt = {}, fi, ka;
function q0() {
  if (ka) return fi;
  ka = 1;
  var t = 30, e = 12;
  return fi = function(i, r) {
    var a, s, o, c, f, u, m, p, d, v, O, M, $, T, k, b, A, D, E, z, F, C, y, V, P;
    a = i.state, s = i.next_in, V = i.input, o = s + (i.avail_in - 5), c = i.next_out, P = i.output, f = c - (r - i.avail_out), u = c + (i.avail_out - 257), m = a.dmax, p = a.wsize, d = a.whave, v = a.wnext, O = a.window, M = a.hold, $ = a.bits, T = a.lencode, k = a.distcode, b = (1 << a.lenbits) - 1, A = (1 << a.distbits) - 1;
    t:
      do {
        $ < 15 && (M += V[s++] << $, $ += 8, M += V[s++] << $, $ += 8), D = T[M & b];
        e:
          for (; ; ) {
            if (E = D >>> 24, M >>>= E, $ -= E, E = D >>> 16 & 255, E === 0)
              P[c++] = D & 65535;
            else if (E & 16) {
              z = D & 65535, E &= 15, E && ($ < E && (M += V[s++] << $, $ += 8), z += M & (1 << E) - 1, M >>>= E, $ -= E), $ < 15 && (M += V[s++] << $, $ += 8, M += V[s++] << $, $ += 8), D = k[M & A];
              n:
                for (; ; ) {
                  if (E = D >>> 24, M >>>= E, $ -= E, E = D >>> 16 & 255, E & 16) {
                    if (F = D & 65535, E &= 15, $ < E && (M += V[s++] << $, $ += 8, $ < E && (M += V[s++] << $, $ += 8)), F += M & (1 << E) - 1, F > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (M >>>= E, $ -= E, E = c - f, F > E) {
                      if (E = F - E, E > d && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (C = 0, y = O, v === 0) {
                        if (C += p - E, E < z) {
                          z -= E;
                          do
                            P[c++] = O[C++];
                          while (--E);
                          C = c - F, y = P;
                        }
                      } else if (v < E) {
                        if (C += p + v - E, E -= v, E < z) {
                          z -= E;
                          do
                            P[c++] = O[C++];
                          while (--E);
                          if (C = 0, v < z) {
                            E = v, z -= E;
                            do
                              P[c++] = O[C++];
                            while (--E);
                            C = c - F, y = P;
                          }
                        }
                      } else if (C += v - E, E < z) {
                        z -= E;
                        do
                          P[c++] = O[C++];
                        while (--E);
                        C = c - F, y = P;
                      }
                      for (; z > 2; )
                        P[c++] = y[C++], P[c++] = y[C++], P[c++] = y[C++], z -= 3;
                      z && (P[c++] = y[C++], z > 1 && (P[c++] = y[C++]));
                    } else {
                      C = c - F;
                      do
                        P[c++] = P[C++], P[c++] = P[C++], P[c++] = P[C++], z -= 3;
                      while (z > 2);
                      z && (P[c++] = P[C++], z > 1 && (P[c++] = P[C++]));
                    }
                  } else if ((E & 64) === 0) {
                    D = k[(D & 65535) + (M & (1 << E) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((E & 64) === 0) {
              D = T[(D & 65535) + (M & (1 << E) - 1)];
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
    z = $ >> 3, s -= z, $ -= z << 3, M &= (1 << $) - 1, i.next_in = s, i.next_out = c, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = c < u ? 257 + (u - c) : 257 - (c - u), a.hold = M, a.bits = $;
  }, fi;
}
var ui, Ta;
function G0() {
  if (Ta) return ui;
  Ta = 1;
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
  return ui = function(p, d, v, O, M, $, T, k) {
    var b = k.bits, A = 0, D = 0, E = 0, z = 0, F = 0, C = 0, y = 0, V = 0, P = 0, J = 0, nt, lt, X, et, U, it = null, Dt = 0, Q, gt = new t.Buf16(e + 1), kt = new t.Buf16(e + 1), ht = null, j = 0, ot, ft, bt;
    for (A = 0; A <= e; A++)
      gt[A] = 0;
    for (D = 0; D < O; D++)
      gt[d[v + D]]++;
    for (F = b, z = e; z >= 1 && gt[z] === 0; z--)
      ;
    if (F > z && (F = z), z === 0)
      return M[$++] = 1 << 24 | 64 << 16 | 0, M[$++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (E = 1; E < z && gt[E] === 0; E++)
      ;
    for (F < E && (F = E), V = 1, A = 1; A <= e; A++)
      if (V <<= 1, V -= gt[A], V < 0)
        return -1;
    if (V > 0 && (p === r || z !== 1))
      return -1;
    for (kt[1] = 0, A = 1; A < e; A++)
      kt[A + 1] = kt[A] + gt[A];
    for (D = 0; D < O; D++)
      d[v + D] !== 0 && (T[kt[d[v + D]]++] = D);
    if (p === r ? (it = ht = T, Q = 19) : p === a ? (it = o, Dt -= 257, ht = c, j -= 257, Q = 256) : (it = f, ht = u, Q = -1), J = 0, D = 0, A = E, U = $, C = F, y = 0, X = -1, P = 1 << F, et = P - 1, p === a && P > n || p === s && P > i)
      return 1;
    for (; ; ) {
      ot = A - y, T[D] < Q ? (ft = 0, bt = T[D]) : T[D] > Q ? (ft = ht[j + T[D]], bt = it[Dt + T[D]]) : (ft = 96, bt = 0), nt = 1 << A - y, lt = 1 << C, E = lt;
      do
        lt -= nt, M[U + (J >> y) + lt] = ot << 24 | ft << 16 | bt | 0;
      while (lt !== 0);
      for (nt = 1 << A - 1; J & nt; )
        nt >>= 1;
      if (nt !== 0 ? (J &= nt - 1, J += nt) : J = 0, D++, --gt[A] === 0) {
        if (A === z)
          break;
        A = d[v + T[D]];
      }
      if (A > F && (J & et) !== X) {
        for (y === 0 && (y = F), U += E, C = A - y, V = 1 << C; C + y < z && (V -= gt[C + y], !(V <= 0)); )
          C++, V <<= 1;
        if (P += 1 << C, p === a && P > n || p === s && P > i)
          return 1;
        X = J & et, M[X] = F << 24 | C << 16 | U - $ | 0;
      }
    }
    return J !== 0 && (M[U + J] = A - y << 24 | 64 << 16 | 0), k.bits = F, 0;
  }, ui;
}
var Ea;
function W0() {
  if (Ea) return Wt;
  Ea = 1;
  var t = de(), e = js(), n = to(), i = q0(), r = G0(), a = 0, s = 1, o = 2, c = 4, f = 5, u = 6, m = 0, p = 1, d = 2, v = -2, O = -3, M = -4, $ = -5, T = 8, k = 1, b = 2, A = 3, D = 4, E = 5, z = 6, F = 7, C = 8, y = 9, V = 10, P = 11, J = 12, nt = 13, lt = 14, X = 15, et = 16, U = 17, it = 18, Dt = 19, Q = 20, gt = 21, kt = 22, ht = 23, j = 24, ot = 25, ft = 26, bt = 27, Nt = 28, Tt = 29, st = 30, rt = 31, yt = 32, It = 852, ct = 592, _t = 15, Z = _t;
  function xt(x) {
    return (x >>> 24 & 255) + (x >>> 8 & 65280) + ((x & 65280) << 8) + ((x & 255) << 24);
  }
  function Ft() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Et(x) {
    var L;
    return !x || !x.state ? v : (L = x.state, x.total_in = x.total_out = L.total = 0, x.msg = "", L.wrap && (x.adler = L.wrap & 1), L.mode = k, L.last = 0, L.havedict = 0, L.dmax = 32768, L.head = null, L.hold = 0, L.bits = 0, L.lencode = L.lendyn = new t.Buf32(It), L.distcode = L.distdyn = new t.Buf32(ct), L.sane = 1, L.back = -1, m);
  }
  function Rt(x) {
    var L;
    return !x || !x.state ? v : (L = x.state, L.wsize = 0, L.whave = 0, L.wnext = 0, Et(x));
  }
  function Ut(x, L) {
    var h, H;
    return !x || !x.state || (H = x.state, L < 0 ? (h = 0, L = -L) : (h = (L >> 4) + 1, L < 48 && (L &= 15)), L && (L < 8 || L > 15)) ? v : (H.window !== null && H.wbits !== L && (H.window = null), H.wrap = h, H.wbits = L, Rt(x));
  }
  function St(x, L) {
    var h, H;
    return x ? (H = new Ft(), x.state = H, H.window = null, h = Ut(x, L), h !== m && (x.state = null), h) : v;
  }
  function vt(x) {
    return St(x, Z);
  }
  var qt = !0, ut, Y;
  function at(x) {
    if (qt) {
      var L;
      for (ut = new t.Buf32(512), Y = new t.Buf32(32), L = 0; L < 144; )
        x.lens[L++] = 8;
      for (; L < 256; )
        x.lens[L++] = 9;
      for (; L < 280; )
        x.lens[L++] = 7;
      for (; L < 288; )
        x.lens[L++] = 8;
      for (r(s, x.lens, 0, 288, ut, 0, x.work, { bits: 9 }), L = 0; L < 32; )
        x.lens[L++] = 5;
      r(o, x.lens, 0, 32, Y, 0, x.work, { bits: 5 }), qt = !1;
    }
    x.lencode = ut, x.lenbits = 9, x.distcode = Y, x.distbits = 5;
  }
  function dt(x, L, h, H) {
    var tt, l = x.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), H >= l.wsize ? (t.arraySet(l.window, L, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (tt = l.wsize - l.wnext, tt > H && (tt = H), t.arraySet(l.window, L, h - H, tt, l.wnext), H -= tt, H ? (t.arraySet(l.window, L, h - H, H, 0), l.wnext = H, l.whave = l.wsize) : (l.wnext += tt, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += tt))), 0;
  }
  function g(x, L) {
    var h, H, tt, l, S, R, _, w, N, q, G, K, pt, Yt, At = 0, mt, Ct, Bt, Pt, nn, rn, Lt, Gt, zt = new t.Buf8(4), se, ne, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!x || !x.state || !x.output || !x.input && x.avail_in !== 0)
      return v;
    h = x.state, h.mode === J && (h.mode = nt), S = x.next_out, tt = x.output, _ = x.avail_out, l = x.next_in, H = x.input, R = x.avail_in, w = h.hold, N = h.bits, q = R, G = _, Gt = m;
    t:
      for (; ; )
        switch (h.mode) {
          case k:
            if (h.wrap === 0) {
              h.mode = nt;
              break;
            }
            for (; N < 16; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if (h.wrap & 2 && w === 35615) {
              h.check = 0, zt[0] = w & 255, zt[1] = w >>> 8 & 255, h.check = n(h.check, zt, 2, 0), w = 0, N = 0, h.mode = b;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((w & 255) << 8) + (w >> 8)) % 31) {
              x.msg = "incorrect header check", h.mode = st;
              break;
            }
            if ((w & 15) !== T) {
              x.msg = "unknown compression method", h.mode = st;
              break;
            }
            if (w >>>= 4, N -= 4, Lt = (w & 15) + 8, h.wbits === 0)
              h.wbits = Lt;
            else if (Lt > h.wbits) {
              x.msg = "invalid window size", h.mode = st;
              break;
            }
            h.dmax = 1 << Lt, x.adler = h.check = 1, h.mode = w & 512 ? V : J, w = 0, N = 0;
            break;
          case b:
            for (; N < 16; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if (h.flags = w, (h.flags & 255) !== T) {
              x.msg = "unknown compression method", h.mode = st;
              break;
            }
            if (h.flags & 57344) {
              x.msg = "unknown header flags set", h.mode = st;
              break;
            }
            h.head && (h.head.text = w >> 8 & 1), h.flags & 512 && (zt[0] = w & 255, zt[1] = w >>> 8 & 255, h.check = n(h.check, zt, 2, 0)), w = 0, N = 0, h.mode = A;
          /* falls through */
          case A:
            for (; N < 32; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            h.head && (h.head.time = w), h.flags & 512 && (zt[0] = w & 255, zt[1] = w >>> 8 & 255, zt[2] = w >>> 16 & 255, zt[3] = w >>> 24 & 255, h.check = n(h.check, zt, 4, 0)), w = 0, N = 0, h.mode = D;
          /* falls through */
          case D:
            for (; N < 16; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            h.head && (h.head.xflags = w & 255, h.head.os = w >> 8), h.flags & 512 && (zt[0] = w & 255, zt[1] = w >>> 8 & 255, h.check = n(h.check, zt, 2, 0)), w = 0, N = 0, h.mode = E;
          /* falls through */
          case E:
            if (h.flags & 1024) {
              for (; N < 16; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              h.length = w, h.head && (h.head.extra_len = w), h.flags & 512 && (zt[0] = w & 255, zt[1] = w >>> 8 & 255, h.check = n(h.check, zt, 2, 0)), w = 0, N = 0;
            } else h.head && (h.head.extra = null);
            h.mode = z;
          /* falls through */
          case z:
            if (h.flags & 1024 && (K = h.length, K > R && (K = R), K && (h.head && (Lt = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              H,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              K,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Lt
            )), h.flags & 512 && (h.check = n(h.check, H, K, l)), R -= K, l += K, h.length -= K), h.length))
              break t;
            h.length = 0, h.mode = F;
          /* falls through */
          case F:
            if (h.flags & 2048) {
              if (R === 0)
                break t;
              K = 0;
              do
                Lt = H[l + K++], h.head && Lt && h.length < 65536 && (h.head.name += String.fromCharCode(Lt));
              while (Lt && K < R);
              if (h.flags & 512 && (h.check = n(h.check, H, K, l)), R -= K, l += K, Lt)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = C;
          /* falls through */
          case C:
            if (h.flags & 4096) {
              if (R === 0)
                break t;
              K = 0;
              do
                Lt = H[l + K++], h.head && Lt && h.length < 65536 && (h.head.comment += String.fromCharCode(Lt));
              while (Lt && K < R);
              if (h.flags & 512 && (h.check = n(h.check, H, K, l)), R -= K, l += K, Lt)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = y;
          /* falls through */
          case y:
            if (h.flags & 512) {
              for (; N < 16; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              if (w !== (h.check & 65535)) {
                x.msg = "header crc mismatch", h.mode = st;
                break;
              }
              w = 0, N = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), x.adler = h.check = 0, h.mode = J;
            break;
          case V:
            for (; N < 32; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            x.adler = h.check = xt(w), w = 0, N = 0, h.mode = P;
          /* falls through */
          case P:
            if (h.havedict === 0)
              return x.next_out = S, x.avail_out = _, x.next_in = l, x.avail_in = R, h.hold = w, h.bits = N, d;
            x.adler = h.check = 1, h.mode = J;
          /* falls through */
          case J:
            if (L === f || L === u)
              break t;
          /* falls through */
          case nt:
            if (h.last) {
              w >>>= N & 7, N -= N & 7, h.mode = bt;
              break;
            }
            for (; N < 3; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            switch (h.last = w & 1, w >>>= 1, N -= 1, w & 3) {
              case 0:
                h.mode = lt;
                break;
              case 1:
                if (at(h), h.mode = Q, L === u) {
                  w >>>= 2, N -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = U;
                break;
              case 3:
                x.msg = "invalid block type", h.mode = st;
            }
            w >>>= 2, N -= 2;
            break;
          case lt:
            for (w >>>= N & 7, N -= N & 7; N < 32; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if ((w & 65535) !== (w >>> 16 ^ 65535)) {
              x.msg = "invalid stored block lengths", h.mode = st;
              break;
            }
            if (h.length = w & 65535, w = 0, N = 0, h.mode = X, L === u)
              break t;
          /* falls through */
          case X:
            h.mode = et;
          /* falls through */
          case et:
            if (K = h.length, K) {
              if (K > R && (K = R), K > _ && (K = _), K === 0)
                break t;
              t.arraySet(tt, H, l, K, S), R -= K, l += K, _ -= K, S += K, h.length -= K;
              break;
            }
            h.mode = J;
            break;
          case U:
            for (; N < 14; ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if (h.nlen = (w & 31) + 257, w >>>= 5, N -= 5, h.ndist = (w & 31) + 1, w >>>= 5, N -= 5, h.ncode = (w & 15) + 4, w >>>= 4, N -= 4, h.nlen > 286 || h.ndist > 30) {
              x.msg = "too many length or distance symbols", h.mode = st;
              break;
            }
            h.have = 0, h.mode = it;
          /* falls through */
          case it:
            for (; h.have < h.ncode; ) {
              for (; N < 3; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              h.lens[sr[h.have++]] = w & 7, w >>>= 3, N -= 3;
            }
            for (; h.have < 19; )
              h.lens[sr[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, se = { bits: h.lenbits }, Gt = r(a, h.lens, 0, 19, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              x.msg = "invalid code lengths set", h.mode = st;
              break;
            }
            h.have = 0, h.mode = Dt;
          /* falls through */
          case Dt:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; At = h.lencode[w & (1 << h.lenbits) - 1], mt = At >>> 24, Ct = At >>> 16 & 255, Bt = At & 65535, !(mt <= N); ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              if (Bt < 16)
                w >>>= mt, N -= mt, h.lens[h.have++] = Bt;
              else {
                if (Bt === 16) {
                  for (ne = mt + 2; N < ne; ) {
                    if (R === 0)
                      break t;
                    R--, w += H[l++] << N, N += 8;
                  }
                  if (w >>>= mt, N -= mt, h.have === 0) {
                    x.msg = "invalid bit length repeat", h.mode = st;
                    break;
                  }
                  Lt = h.lens[h.have - 1], K = 3 + (w & 3), w >>>= 2, N -= 2;
                } else if (Bt === 17) {
                  for (ne = mt + 3; N < ne; ) {
                    if (R === 0)
                      break t;
                    R--, w += H[l++] << N, N += 8;
                  }
                  w >>>= mt, N -= mt, Lt = 0, K = 3 + (w & 7), w >>>= 3, N -= 3;
                } else {
                  for (ne = mt + 7; N < ne; ) {
                    if (R === 0)
                      break t;
                    R--, w += H[l++] << N, N += 8;
                  }
                  w >>>= mt, N -= mt, Lt = 0, K = 11 + (w & 127), w >>>= 7, N -= 7;
                }
                if (h.have + K > h.nlen + h.ndist) {
                  x.msg = "invalid bit length repeat", h.mode = st;
                  break;
                }
                for (; K--; )
                  h.lens[h.have++] = Lt;
              }
            }
            if (h.mode === st)
              break;
            if (h.lens[256] === 0) {
              x.msg = "invalid code -- missing end-of-block", h.mode = st;
              break;
            }
            if (h.lenbits = 9, se = { bits: h.lenbits }, Gt = r(s, h.lens, 0, h.nlen, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              x.msg = "invalid literal/lengths set", h.mode = st;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, se = { bits: h.distbits }, Gt = r(o, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, se), h.distbits = se.bits, Gt) {
              x.msg = "invalid distances set", h.mode = st;
              break;
            }
            if (h.mode = Q, L === u)
              break t;
          /* falls through */
          case Q:
            h.mode = gt;
          /* falls through */
          case gt:
            if (R >= 6 && _ >= 258) {
              x.next_out = S, x.avail_out = _, x.next_in = l, x.avail_in = R, h.hold = w, h.bits = N, i(x, G), S = x.next_out, tt = x.output, _ = x.avail_out, l = x.next_in, H = x.input, R = x.avail_in, w = h.hold, N = h.bits, h.mode === J && (h.back = -1);
              break;
            }
            for (h.back = 0; At = h.lencode[w & (1 << h.lenbits) - 1], mt = At >>> 24, Ct = At >>> 16 & 255, Bt = At & 65535, !(mt <= N); ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if (Ct && (Ct & 240) === 0) {
              for (Pt = mt, nn = Ct, rn = Bt; At = h.lencode[rn + ((w & (1 << Pt + nn) - 1) >> Pt)], mt = At >>> 24, Ct = At >>> 16 & 255, Bt = At & 65535, !(Pt + mt <= N); ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              w >>>= Pt, N -= Pt, h.back += Pt;
            }
            if (w >>>= mt, N -= mt, h.back += mt, h.length = Bt, Ct === 0) {
              h.mode = ft;
              break;
            }
            if (Ct & 32) {
              h.back = -1, h.mode = J;
              break;
            }
            if (Ct & 64) {
              x.msg = "invalid literal/length code", h.mode = st;
              break;
            }
            h.extra = Ct & 15, h.mode = kt;
          /* falls through */
          case kt:
            if (h.extra) {
              for (ne = h.extra; N < ne; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              h.length += w & (1 << h.extra) - 1, w >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = ht;
          /* falls through */
          case ht:
            for (; At = h.distcode[w & (1 << h.distbits) - 1], mt = At >>> 24, Ct = At >>> 16 & 255, Bt = At & 65535, !(mt <= N); ) {
              if (R === 0)
                break t;
              R--, w += H[l++] << N, N += 8;
            }
            if ((Ct & 240) === 0) {
              for (Pt = mt, nn = Ct, rn = Bt; At = h.distcode[rn + ((w & (1 << Pt + nn) - 1) >> Pt)], mt = At >>> 24, Ct = At >>> 16 & 255, Bt = At & 65535, !(Pt + mt <= N); ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              w >>>= Pt, N -= Pt, h.back += Pt;
            }
            if (w >>>= mt, N -= mt, h.back += mt, Ct & 64) {
              x.msg = "invalid distance code", h.mode = st;
              break;
            }
            h.offset = Bt, h.extra = Ct & 15, h.mode = j;
          /* falls through */
          case j:
            if (h.extra) {
              for (ne = h.extra; N < ne; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              h.offset += w & (1 << h.extra) - 1, w >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              x.msg = "invalid distance too far back", h.mode = st;
              break;
            }
            h.mode = ot;
          /* falls through */
          case ot:
            if (_ === 0)
              break t;
            if (K = G - _, h.offset > K) {
              if (K = h.offset - K, K > h.whave && h.sane) {
                x.msg = "invalid distance too far back", h.mode = st;
                break;
              }
              K > h.wnext ? (K -= h.wnext, pt = h.wsize - K) : pt = h.wnext - K, K > h.length && (K = h.length), Yt = h.window;
            } else
              Yt = tt, pt = S - h.offset, K = h.length;
            K > _ && (K = _), _ -= K, h.length -= K;
            do
              tt[S++] = Yt[pt++];
            while (--K);
            h.length === 0 && (h.mode = gt);
            break;
          case ft:
            if (_ === 0)
              break t;
            tt[S++] = h.length, _--, h.mode = gt;
            break;
          case bt:
            if (h.wrap) {
              for (; N < 32; ) {
                if (R === 0)
                  break t;
                R--, w |= H[l++] << N, N += 8;
              }
              if (G -= _, x.total_out += G, h.total += G, G && (x.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, tt, G, S - G) : e(h.check, tt, G, S - G)), G = _, (h.flags ? w : xt(w)) !== h.check) {
                x.msg = "incorrect data check", h.mode = st;
                break;
              }
              w = 0, N = 0;
            }
            h.mode = Nt;
          /* falls through */
          case Nt:
            if (h.wrap && h.flags) {
              for (; N < 32; ) {
                if (R === 0)
                  break t;
                R--, w += H[l++] << N, N += 8;
              }
              if (w !== (h.total & 4294967295)) {
                x.msg = "incorrect length check", h.mode = st;
                break;
              }
              w = 0, N = 0;
            }
            h.mode = Tt;
          /* falls through */
          case Tt:
            Gt = p;
            break t;
          case st:
            Gt = O;
            break t;
          case rt:
            return M;
          case yt:
          /* falls through */
          default:
            return v;
        }
    return x.next_out = S, x.avail_out = _, x.next_in = l, x.avail_in = R, h.hold = w, h.bits = N, (h.wsize || G !== x.avail_out && h.mode < st && (h.mode < bt || L !== c)) && dt(x, x.output, x.next_out, G - x.avail_out), q -= x.avail_in, G -= x.avail_out, x.total_in += q, x.total_out += G, h.total += G, h.wrap && G && (x.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, tt, G, x.next_out - G) : e(h.check, tt, G, x.next_out - G)), x.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === J ? 128 : 0) + (h.mode === Q || h.mode === X ? 256 : 0), (q === 0 && G === 0 || L === c) && Gt === m && (Gt = $), Gt;
  }
  function B(x) {
    if (!x || !x.state)
      return v;
    var L = x.state;
    return L.window && (L.window = null), x.state = null, m;
  }
  function I(x, L) {
    var h;
    return !x || !x.state || (h = x.state, (h.wrap & 2) === 0) ? v : (h.head = L, L.done = !1, m);
  }
  function W(x, L) {
    var h = L.length, H, tt, l;
    return !x || !x.state || (H = x.state, H.wrap !== 0 && H.mode !== P) ? v : H.mode === P && (tt = 1, tt = e(tt, L, h, 0), tt !== H.check) ? O : (l = dt(x, L, h, h), l ? (H.mode = rt, M) : (H.havedict = 1, m));
  }
  return Wt.inflateReset = Rt, Wt.inflateReset2 = Ut, Wt.inflateResetKeep = Et, Wt.inflateInit = vt, Wt.inflateInit2 = St, Wt.inflate = g, Wt.inflateEnd = B, Wt.inflateGetHeader = I, Wt.inflateSetDictionary = W, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var hi, Sa;
function io() {
  return Sa || (Sa = 1, hi = {
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
var di, Aa;
function X0() {
  if (Aa) return di;
  Aa = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return di = t, di;
}
var $a;
function K0() {
  if ($a) return Ie;
  $a = 1;
  var t = W0(), e = de(), n = eo(), i = io(), r = ir(), a = no(), s = X0(), o = Object.prototype.toString;
  function c(m) {
    if (!(this instanceof c)) return new c(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(m && m.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var d = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (d !== i.Z_OK)
      throw new Error(r[d]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (d = t.inflateSetDictionary(this.strm, p.dictionary), d !== i.Z_OK)))
      throw new Error(r[d]);
  }
  c.prototype.push = function(m, p) {
    var d = this.strm, v = this.options.chunkSize, O = this.options.dictionary, M, $, T, k, b, A = !1;
    if (this.ended)
      return !1;
    $ = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? d.input = n.binstring2buf(m) : o.call(m) === "[object ArrayBuffer]" ? d.input = new Uint8Array(m) : d.input = m, d.next_in = 0, d.avail_in = d.input.length;
    do {
      if (d.avail_out === 0 && (d.output = new e.Buf8(v), d.next_out = 0, d.avail_out = v), M = t.inflate(d, i.Z_NO_FLUSH), M === i.Z_NEED_DICT && O && (M = t.inflateSetDictionary(this.strm, O)), M === i.Z_BUF_ERROR && A === !0 && (M = i.Z_OK, A = !1), M !== i.Z_STREAM_END && M !== i.Z_OK)
        return this.onEnd(M), this.ended = !0, !1;
      d.next_out && (d.avail_out === 0 || M === i.Z_STREAM_END || d.avail_in === 0 && ($ === i.Z_FINISH || $ === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = n.utf8border(d.output, d.next_out), k = d.next_out - T, b = n.buf2string(d.output, T), d.next_out = k, d.avail_out = v - k, k && e.arraySet(d.output, d.output, T, k, 0), this.onData(b)) : this.onData(e.shrinkBuf(d.output, d.next_out))), d.avail_in === 0 && d.avail_out === 0 && (A = !0);
    } while ((d.avail_in > 0 || d.avail_out === 0) && M !== i.Z_STREAM_END);
    return M === i.Z_STREAM_END && ($ = i.Z_FINISH), $ === i.Z_FINISH ? (M = t.inflateEnd(this.strm), this.onEnd(M), this.ended = !0, M === i.Z_OK) : ($ === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), d.avail_out = 0), !0);
  }, c.prototype.onData = function(m) {
    this.chunks.push(m);
  }, c.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, p) {
    var d = new c(p);
    if (d.push(m, !0), d.err)
      throw d.msg || r[d.err];
    return d.result;
  }
  function u(m, p) {
    return p = p || {}, p.raw = !0, f(m, p);
  }
  return Ie.Inflate = c, Ie.inflate = f, Ie.inflateRaw = u, Ie.ungzip = f, Ie;
}
var pi, Na;
function Y0() {
  if (Na) return pi;
  Na = 1;
  var t = de().assign, e = Z0(), n = K0(), i = io(), r = {};
  return t(r, e, n, i), pi = r, pi;
}
var J0 = Y0();
const Q0 = /* @__PURE__ */ tr(J0);
function j0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ro(t) {
  const e = new Uint8Array(j0(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: ao, Inflate: so } = Q0;
async function rr(t) {
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
async function tp(t, e) {
  try {
    let n;
    const { minv: i, maxv: r } = e;
    let a = i.blockPosition, s = i.dataPosition;
    const o = [], c = [], f = [];
    let u = 0;
    do {
      const m = t.subarray(a - i.blockPosition), p = new so();
      if ({ strm: n } = p, p.push(m, ao), p.err)
        throw new Error(p.msg);
      const d = p.result;
      o.push(d);
      let v = d.length;
      c.push(a), f.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), v = o[0].length);
      const O = a;
      if (a += n.next_in, s += v, O >= r.blockPosition) {
        o[u] = o[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: ro(o),
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
    var r;
    return !!((r = (await this.parse(n)).indices[e]) != null && r.binIndex);
  }
}
const Ia = 65536, ep = Ia * Ia;
function lo(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * ep + (n >>> 0);
}
class np extends Error {
}
function We(t) {
  if (t && t.aborted) {
    if (typeof DOMException < "u")
      throw new DOMException("aborted", "AbortError");
    {
      const e = new np("aborted");
      throw e.code = "ERR_ABORTED", e;
    }
  }
}
function ip(t, e) {
  return e.minv.blockPosition - t.maxv.blockPosition < 65e3 && e.maxv.blockPosition - t.minv.blockPosition < 5e6;
}
function co(t, e) {
  const n = [];
  let i = null;
  return t.length === 0 ? t : (t.sort(function(r, a) {
    const s = r.minv.blockPosition - a.minv.blockPosition;
    return s !== 0 ? s : r.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((r) => {
    (!e || r.maxv.compareTo(e) > 0) && (i === null ? (n.push(r), i = r) : ip(i, r) ? r.maxv.compareTo(i.maxv) > 0 && (i.maxv = r.maxv) : (n.push(r), i = r));
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
const rp = 21582659, ap = 38359875, sp = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function op(t, e) {
  return t * 2 ** e;
}
function Da(t, e) {
  return Math.floor(t / 2 ** e);
}
class _i extends oo {
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
    const i = new DataView(e.buffer), r = i.getInt32(n, !0), a = r & 65536 ? "zero-based-half-open" : "1-based-closed", s = sp[r & 15];
    if (!s)
      throw new Error(`invalid Tabix preset format flags ${r}`);
    const o = {
      ref: i.getInt32(n + 4, !0),
      start: i.getInt32(n + 8, !0),
      end: i.getInt32(n + 12, !0)
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, u = i.getInt32(n + 20, !0), m = i.getInt32(n + 24, !0), { refIdToName: p, refNameToId: d } = this._parseNameBytes(e.subarray(n + 28, n + 28 + m));
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
    if (i.getUint32(0, !0) === rp)
      r = 1;
    else if (i.getUint32(0, !0) === ap)
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
    const m = new Array(c).fill(0).map(() => {
      const p = i.getInt32(u, !0);
      u += 4;
      const d = {};
      let v;
      for (let O = 0; O < p; O += 1) {
        const M = i.getUint32(u, !0);
        if (M > this.maxBinNumber)
          v = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const $ = Le(n, u + 4);
          f = this._findFirstData(f, $);
          const T = i.getInt32(u + 12, !0);
          u += 16;
          const k = new Array(T);
          for (let b = 0; b < T; b += 1) {
            const A = Le(n, u), D = Le(n, u + 8);
            u += 16, k[b] = new Bn(A, D, M);
          }
          d[M] = k;
        }
      }
      return { binIndex: d, stats: v };
    });
    return {
      ...o,
      csi: !0,
      refCount: c,
      maxBlockSize: 65536,
      firstDataLine: f,
      csiVersion: r,
      indices: m,
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
    const c = this.reg2bins(n, i), f = [];
    for (const [u, m] of c)
      for (let p = u; p <= m; p++)
        if (o.binIndex[p])
          for (const d of o.binIndex[p])
            f.push(new Bn(d.minv, d.maxv, p));
    return co(f, new ar(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += op(1, i * 3), i += 1) {
      const o = r + Da(e, a), c = r + Da(n, a);
      if (c - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, c]);
    }
    return s;
  }
}
const lp = 21578324, Ra = 14;
function cp(t, e) {
  return t += 1, e -= 1, [
    [0, 0],
    [1 + (t >> 26), 1 + (e >> 26)],
    [9 + (t >> 23), 9 + (e >> 23)],
    [73 + (t >> 20), 73 + (e >> 20)],
    [585 + (t >> 17), 585 + (e >> 17)],
    [4681 + (t >> 14), 4681 + (e >> 14)]
  ];
}
class Ve extends oo {
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
    if (r.getUint32(0, !0) !== lp)
      throw new Error("Not a TBI file");
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const m = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, p = r.getInt32(24, !0), d = 5, v = ((1 << (d + 1) * 3) - 1) / 7, O = 2 ** (14 + d * 3), M = p ? String.fromCharCode(p) : null, $ = r.getInt32(28, !0), T = r.getInt32(32, !0), { refNameToId: k, refIdToName: b } = this._parseNameBytes(i.slice(36, 36 + T));
    let A = 36 + T, D;
    return {
      indices: new Array(s).fill(0).map(() => {
        const z = r.getInt32(A, !0);
        A += 4;
        const F = {};
        let C;
        for (let P = 0; P < z; P += 1) {
          const J = r.getUint32(A, !0);
          if (A += 4, J > v + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (J === v + 1) {
            const nt = r.getInt32(A, !0);
            A += 4, nt === 2 && (C = this.parsePseudoBin(i, A)), A += 16 * nt;
          } else {
            const nt = r.getInt32(A, !0);
            A += 4;
            const lt = new Array(nt);
            for (let X = 0; X < nt; X += 1) {
              const et = Le(i, A), U = Le(i, A + 8);
              A += 16, D = this._findFirstData(D, et), lt[X] = new Bn(et, U, J);
            }
            F[J] = lt;
          }
        }
        const y = r.getInt32(A, !0);
        A += 4;
        const V = new Array(y);
        for (let P = 0; P < y; P += 1)
          V[P] = Le(i, A), A += 8, D = this._findFirstData(D, V[P]);
        return {
          binIndex: F,
          linearIndex: V,
          stats: C
        };
      }),
      metaChar: M,
      maxBinNumber: v,
      maxRefLength: O,
      skipLines: $,
      firstDataLine: D,
      columnNumbers: m,
      coordinateType: c,
      format: u,
      refIdToName: b,
      refNameToId: k,
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
    (o.linearIndex.length ? o.linearIndex[n >> Ra >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> Ra] : new ar(0, 0)) || console.warn("querying outside of possible tabix range");
    const f = cp(n, i), u = [];
    for (const [O, M] of f)
      for (let $ = O; $ <= M; $++)
        if (o.binIndex[$])
          for (const T of o.binIndex[$])
            u.push(new Bn(T.minv, T.maxv, $));
    const m = o.linearIndex.length;
    let p = null;
    const d = Math.min(n >> 14, m - 1), v = Math.min(i >> 14, m - 1);
    for (let O = d; O <= v; ++O) {
      const M = o.linearIndex[O];
      M && (!p || M.compareTo(p) < 0) && (p = M);
    }
    return co(u, p);
  }
}
function fp(t) {
  return /^[\u0000-\u007F]*$/.test(t);
}
class up {
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: u = (p) => p, chunkCacheSize: m = 5 * 2 ** 20 }) {
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
      cache: new Un({ maxSize: Math.floor(m / 65536) }),
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
    const m = await this.index.blocksForRange(e, f, u, s);
    We(a);
    const p = new TextDecoder("utf8");
    for (const d of m) {
      const { buffer: v, cpositions: O, dpositions: M } = await this.chunkCache.get(d.toString(), d, a);
      We(a);
      let $ = 0, T = 0;
      const k = p.decode(v), b = fp(k);
      for (; $ < k.length; ) {
        let A, D;
        if (b) {
          if (D = k.indexOf(`
`, $), D === -1)
            break;
          A = k.slice($, D);
        } else {
          if (D = v.indexOf(10, $), D === -1)
            break;
          const F = v.slice($, D);
          A = p.decode(F);
        }
        if (M) {
          for (; $ + d.minv.dataPosition >= M[T++]; )
            ;
          T--;
        }
        const { startCoordinate: E, overlaps: z } = this.checkLine(c, e, f, u, A);
        if (z)
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
            O[T] * 256 + ($ - M[T]) + d.minv.dataPosition + 1
          );
        else if (E !== void 0 && E >= u)
          return;
        $ = D + 1;
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
      for (let m = 0; m < o.length && !(m === c + 1 && o[m] !== u); m += 1)
        o[m] === f && (c = m);
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
    let { ref: u, start: m, end: p } = s;
    u || (u = 0), m || (m = 0), p || (p = 0), f === "VCF" && (p = 8);
    const d = Math.max(u, m, p);
    let v = 1, O = 0, M = "", $ = -1 / 0;
    const T = a.length;
    for (let k = 0; k < T + 1; k++)
      if (a[k] === "	" || k === T) {
        if (v === u) {
          if (this.renameRefSeq(a.slice(O, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (v === m) {
          if ($ = parseInt(a.slice(O, k), 10), c === "1-based-closed" && ($ -= 1), $ >= r)
            return {
              startCoordinate: $,
              overlaps: !1
            };
          if ((p === 0 || p === m) && $ + 1 <= i)
            return {
              startCoordinate: $,
              overlaps: !1
            };
        } else if (f === "VCF" && v === 4)
          M = a.slice(O, k);
        else if (v === p && (f === "VCF" ? this._getVcfEnd($, M, a.slice(O, k)) : Number.parseInt(a.slice(O, k), 10)) <= i)
          return {
            overlaps: !1
          };
        if (O = k + 1, v += 1, v > d)
          break;
      }
    return {
      startCoordinate: $,
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
    return tp(i, e);
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
function dp(t) {
  const e = [];
  let n = "", i = !1, r = !1;
  for (const a of t)
    a === '"' ? (i = !i, n += a) : a === "[" ? (r = !0, n += a) : a === "]" ? (r = !1, n += a) : a === "," && !i && !r ? (e.push(n.trim()), n = "") : n += a;
  return n && e.push(n.trim()), e;
}
function pp(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function _p(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(dp(e).map((n) => {
    const [i, r] = pp(n, "=");
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
function gp(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class mp {
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
          const m = f[u];
          i[c][a[u]] = m === "" || m === "." ? void 0 : m.split(",").map((p) => p === "." ? void 0 : s[u] ? +p : p);
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
    const n = _p(e), i = n.ID;
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
    var D;
    let n = 0;
    for (let E = 0; n < e.length && (e[n] === "	" && (E += 1), E !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, c, f, u, m] = i, p = a, d = +s, v = o === "." ? void 0 : o.split(";"), O = c, M = f === "." ? void 0 : f.split(","), $ = u === "." ? void 0 : +u, T = m === "." ? void 0 : m.split(";"), k = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const b = (D = i[7]) == null ? void 0 : D.includes("%"), A = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((E) => {
      const [z, F] = E.split("="), C = F == null ? void 0 : F.split(",").map((V) => V === "." ? void 0 : V).map((V) => V && b ? gp(V) : V), y = this.getMetadata("INFO", z, "Type");
      return y === "Integer" || y === "Float" ? [
        z,
        C == null ? void 0 : C.map((V) => V === void 0 ? void 0 : Number(V))
      ] : y === "Flag" ? [z, !0] : [z, C ?? !0];
    }));
    return {
      CHROM: p,
      POS: d,
      ALT: M,
      INFO: A,
      REF: O,
      FILTER: T && T.length === 1 && T[0] === "PASS" ? "PASS" : T,
      ID: v,
      QUAL: $,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => hp(i[8] ?? "", r, this.samples)
    };
  }
}
function vp(t) {
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
const wp = {
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
function yp(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const i = /* @__PURE__ */ new Set();
  let r = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [s, o] = fo(a, n);
    s || ([s, o] = xp(t, a)), s && o && (i.add(s), r.add(o));
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
function fo(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = wp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? fo(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function xp(t, e) {
  if (vp(e))
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
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [c, f] = yp(n, i, e);
  return {
    refName: a,
    start: o,
    end: kp(t),
    description: f,
    type: c,
    name: s == null ? void 0 : s.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function kp(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i == null ? void 0 : i.includes("<TRA>"), a = e - 1;
  if (i == null ? void 0 : i.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !r)
      return +o.END[0];
  }
  return a + n.length;
}
class Tp {
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
async function Ap({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: i
}) {
  const r = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new up({
    tbiFilehandle: n === "TBI" ? new we(r) : void 0,
    csiFilehandle: n === "CSI" ? new we(r) : void 0,
    filehandle: new we(t)
  }), s = new mp({
    header: await a.getHeader()
  }), o = [];
  let c = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (f) => {
      const u = s.parseLine(f), m = new Tp({
        variant: u,
        parser: s,
        id: `${c++}`
      }), p = m.get("INFO");
      o.push({
        id: m.get("ID"),
        reference_allele: m.get("REF"),
        alternative_alleles: { values: m.get("ALT") },
        name: m.get("name"),
        seqId: m.get("refName"),
        fmin: m.get("start"),
        fmax: m.get("end"),
        strand: 1,
        source: "",
        type: Ma(p.soTerm[0]) ?? m.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([d, v]) => [
            d,
            {
              values: [JSON.stringify(v.map((O) => Ma(O)))]
            }
          ])
        )
      });
    }
  }), o;
}
function Ma(t) {
  return t == null ? void 0 : t.replace(/['"]+/g, "");
}
function $p(t) {
  const [e, n] = t.split(":"), [i, r] = n.split("..");
  return {
    chromosome: e,
    start: +i,
    end: +r
  };
}
Se.prototype.first = function() {
  return wt(this.nodes()[0]);
};
Se.prototype.last = function() {
  return wt(this.nodes()[this.size() - 1]);
};
class Np {
  constructor(e, n, i, r) {
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Du();
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
    const i = wt(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), Yi(e, i);
  }
  _initViewer(e) {
    wt(e).selectAll("*").remove();
    const n = wt(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, wt(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? ku, i = this.config.variantTypes ?? Tu, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome, f = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], m = this.config.htpVariant ?? "", p = s.start, d = s.end;
    new Cu({
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
    let M = 100;
    const $ = this.config.showVariantLabel ?? !0, { viewer: T, genome: k, height: b, tracks: A } = this;
    if (!A || !Array.isArray(A))
      throw new Error(`Tracks must be an array, got: ${typeof A}`);
    A.map((D) => {
      const { variantData: E, trackData: z } = D;
      if (D.type === Pe.ISOFORM_AND_VARIANT) {
        const F = new Mu({
          viewer: T,
          height: b,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: $,
          trackData: z,
          variantData: E,
          variantFilter: f,
          binRatio: r,
          isoformFilter: u,
          geneBounds: D.geneBounds,
          geneSymbol: D.geneSymbol,
          geneId: D.geneId
        });
        M += F.DrawTrack();
      } else if (D.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const F = new Lu({
          viewer: T,
          height: b,
          width: e,
          transcriptTypes: n,
          variantData: E,
          trackData: z,
          variantTypes: i,
          showVariantLabel: $,
          variantFilter: f
        });
        M += F.DrawTrack();
      } else if (D.type === Pe.ISOFORM) {
        const F = new Ou({
          region: a,
          viewer: T,
          height: b,
          width: e,
          genome: k,
          trackData: z,
          transcriptTypes: n,
          htpVariant: m
        });
        M += F.DrawTrack();
      } else D.type === Pe.VARIANT ? new sd({
        region: a,
        viewer: T,
        range: o,
        height: b,
        width: e
      }).DrawTrack() : D.type === Pe.VARIANT_GLOBAL ? new od({
        region: a,
        viewer: T,
        track: {
          ...D,
          range: o
        },
        height: b,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${D.type}`);
      wt(this.svg_target).attr("height", M);
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
        wt("#clip-rect").node().getBoundingClientRect().width / 2 + 100
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
  Np as GenomeFeatureViewer,
  Sp as fetchApolloAPIData,
  Ep as fetchNCListData,
  Ap as fetchTabixVcfData,
  $p as parseLocString
};
