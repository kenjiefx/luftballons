/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /gh/kenjiefx/plunc@0.8.6/dist/plunc.0.8.6.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(() => {
  const e48 = (e) => {
    const t = `${e.x88()}`,
      n = `\n      [${XAttr.e42(APP_ATTR, e, t)}]\n    `,
      r = document.querySelectorAll(`${n.trim()}`);
    if (0 === r.length) throw new Error("100");
    if (r.length > 1) throw new Error("101");
    return r[0];
  };
  class ApplicationAPI {
    constructor() {
      (Object.defineProperty(this, "listeners", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        (this.listeners = { ready: [] }));
    }
    ready(e) {
      return (this.listeners.ready.push(e), this.listeners.ready.length - 1);
    }
    a60(e) {
      var t;
      return null !== (t = this.listeners[e]) && void 0 !== t ? t : [];
    }
  }
  const a49 = (e) => e.a95(),
    x78 = (e, t, n, r) => {
      if (!t.a89()) throw new Error("cannot use $block outside $app.ready");
      const o = XAttr.e42(BLOCK_ELEMENT_ATTR, t, n),
        i = XAttr.x43(e48(t), t, e.e100());
      if (null === i) throw new Error("unknown component element");
      const s = XAttr.e42(ELEMENT_REFERENCE_ATTR, t, e.e100()),
        l = i.querySelectorAll(`[${o}][${s}]`);
      if (0 !== l.length)
        for (let e = 0; e < l.length; e++) r(new PluncElement(l[e]));
      else r(null);
    },
    a23 = () => ({}),
    x61 = (e, t, n) => ({
      id: e.e100(),
      name: e.x88(),
      alias: e.a79(),
      element: () => {
        if (!n.a89())
          throw new Error(
            "cannot invoke component.get().element() outside $app.ready",
          );
        let t = XAttr.x43(e48(n), n, e.e100());
        return null === t ? null : new PluncElement(t);
      },
    }),
    x75 = (e, t, n) => {
      const r = t.parent(e.e100());
      if (null === r) return null;
      const o = n.x80().e90(r);
      if (null === o) return null;
      if (!(o instanceof Component)) return null;
      const i = {};
      return ((i[r] = o), x24(i));
    },
    a81 = (e, t, n, r = null) =>
      new Promise(async (o, i) => {
        try {
          if (!t.a89()) throw new Error("cannot use $patch outside $app.ready");
          let i = "component",
            s = [XAttr.x43(e48(t), t, e.e100())];
          if (null !== r) {
            i = "block";
            const o = x1(XAttr.e42(BLOCK_ELEMENT_ATTR, t, r), e, n, t);
            if (null === o) return;
            s = Array.from(o);
          }
          if (0 === s.length || null === s[0]) return o();
          for (let o = 0; o < s.length; o++) {
            const l = s[o];
            if (null === l) continue;
            let a = x44();
            if ("component" === i) a.innerHTML = await e50(e.e100(), l, t, n);
            else {
              if (null === r) continue;
              const o = x57(t, e.x88(), r);
              if (null === o) continue;
              const i = document.implementation.createHTMLDocument();
              ((i.body.innerHTML = o),
                e7(e.e100(), i, t),
                (a.innerHTML = i.body.innerHTML),
                e2(l, a, t, n));
            }
            if (
              (a16(a, n.children(e.e100()), t), await x62(a, e, t), null === l)
            )
              continue;
            const c = n.children(e.e100());
            x36(a, l, t, c);
            for (let e = 0; e < c.length; e++) {
              const r = c[e],
                o = XAttr.x43(l, t, r);
              null !== o &&
                "" === o.innerHTML.trim() &&
                (await x4(o, t.x80().e90(r), n, t));
            }
          }
          o();
        } catch (e) {
          (console.error(`plunc.js $patch error: ${e.message}`), i(e));
        }
      }),
    x4 = (e, t, n, r) =>
      new Promise(async (o, i) => {
        try {
          const i = x44();
          ((i.innerHTML = await e50(t.e100(), e, r, n)), await x62(i, t, r));
          const s = n.children(t.e100());
          for (let e = 0; e < s.length; e++) {
            const t = s[e],
              o = XAttr.x43(i, r, t);
            null !== o && (await x4(o, r.x80().e90(t), n, r));
          }
          (x36(i, e, r, s), o());
        } catch (e) {
          i(e);
        }
      }),
    e2 = (e, t, n, r) => {
      const o = XAttr.a31(e, n, COMPONENT_ELEMENT_ATTR),
        i = XAttr.a31(t, n, COMPONENT_ELEMENT_ATTR);
      for (let e = 0; e < o.length; e++) {
        const t = o[e],
          s = XAttr.x82(t, n, STRAWBERRY_ID_ATTR),
          l = XAttr.e96(STRAWBERRY_ID_ATTR, n);
        if (null === s) throw new Error();
        (i[e].setAttribute(l, s), x36(t, i[e], n, r.children(s)));
      }
    };
  var XAttr;
  !(function (e) {
    ((e.e76 = (e, t) => `${t.a97().prefix}${COMPONENT_ELEMENT_ATTR}="@${e}"`),
      (e.e96 = (e, t) => `${t.a97().prefix}${e}`),
      (e.e42 = (e, t, n) => `${t.a97().prefix}${e}="${n}"`),
      (e.x82 = (e, t, n) => {
        const r = t.a97().prefix;
        return e.getAttribute(`${r}${n}`);
      }),
      (e.x43 = (e, t, n) => {
        const r = `${t.a97().prefix}id="${n}"`;
        return e.querySelector(`[${r}]`);
      }),
      (e.a31 = (t, n, r) => {
        const o = e.e96(r, n);
        return t.querySelectorAll(`[${o}]`);
      }));
  })(XAttr || (XAttr = {}));
  const APP_ATTR = "app",
    TEMPL_NAME_ATTR = "name",
    SERVICE_OBJECT = "service_object",
    FACTORY_OBJECT = "factory_object",
    COMPONENT_OBJECT = "component_object",
    COMPONENT_ELEMENT_ATTR = "component",
    REPEAT_ELEMENT_ATTR = "repeat",
    IF_ELEMENT_ATTR = "if",
    HIDE_ELEMENT_ATTR = "hide",
    SHOW_ELEMENT_ATTR = "show",
    CHECK_ELEMENT_ATTR = "check",
    STYLE_ELEMENT_ATTR = "style",
    MODEL_ELEMENT_ATTR = "model",
    DISABLE_ELEMENT_ATTR = "disable",
    CLICK_EVENT_ATTR = "click",
    CHANGE_EVENT_ATTR = "change",
    TOUCH_EVENT_ATTR = "touch",
    BLOCK_ELEMENT_ATTR = "block",
    SCOPE_ARGUMENT_KEY = "$scope",
    BLOCK_ARGUMENT_KEY = "$block",
    PARENT_ARGUMENT_KEY = "$parent",
    CHILDREN_ARGUMENT_KEY = "$children",
    PATCH_ARGUMENT_KEY = "$patch",
    APP_ARGUMENT_KEY = "$app",
    COMPONENT_ARGUMENT_KEY = "$this",
    STRAWBERRY_ID_ATTR = "id",
    REPEAT_REFERENCE_TOKEN = "$$index",
    LOCK_ID_ATTR_KEY = "set",
    LOCK_ID_ATTR_VALUE = "true",
    EVENT_ELEMENT_ATTR = "event",
    ELEMENT_REFERENCE_ATTR = "rid",
    a45 = (e, t, n = "") =>
      "" !== n
        ? `${n}.${t.toString()}`
        : `${e.e100().toString()}.${t.toString()}`,
    e50 = (e, t, n, r) =>
      new Promise(async (o, i) => {
        try {
          const i = XAttr.x82(t, n, COMPONENT_ELEMENT_ATTR);
          if (null === i) return o("");
          const s = a32(i).name,
            l = x83(n, s),
            a = document.implementation.createHTMLDocument();
          ((a.body.innerHTML = l),
            e7(e, a, n),
            await e58(e, a, n, r),
            o(a.body.innerHTML));
        } catch (e) {
          i(e);
        }
      }),
    e7 = (e, t, n) => {
      const r = XAttr.e96(ELEMENT_REFERENCE_ATTR, n),
        o = [];
      ([BLOCK_ELEMENT_ATTR].forEach((e) => {
        const r = Array.from(t.body.querySelectorAll(`[${XAttr.e96(e, n)}]`));
        for (let t = 0; t < r.length; t++) {
          const o = r[t],
            i = XAttr.x82(o, n, e);
          e8(i);
        }
        o.push(...r);
      }),
        o.forEach((t) => {
          t.setAttribute(r, e);
        }));
    },
    e8 = (e) => {
      const t =
        "named element name must not be empty or contain invalid characters";
      if (null === e) throw new Error(t);
      if ("string" != typeof e) throw new Error(t);
      if (e.includes("\\")) throw new Error(t);
    },
    e58 = async (e, t, n, r) =>
      new Promise(async (o, i) => {
        const s = COMPONENT_ELEMENT_ATTR,
          l = XAttr.e96(s, n),
          a = t.querySelectorAll(`[${l}]`);
        for (let t = 0; t < a.length; t++) {
          const o = a[t],
            i = XAttr.x82(o, n, s);
          if (null === i) continue;
          const l = a45(n, t, e);
          let c;
          (o.setAttribute(XAttr.e96("id", n), l), r.begat(e, l));
          const u = n.x80().e90(l);
          ((c = null !== u && u instanceof Component ? u : new Component(l, i)),
            a11(r, c, n),
            n.x80().a84(l, c),
            (o.innerHTML = await e50(l, o, n, r)));
        }
        o();
      }),
    a11 = (e, t, n) => {
      const r = t.x88(),
        o = e.lookup(t.e100());
      n.x80()
        .e85(o)
        .forEach((e) => {
          if (e.x88() === r)
            throw new Error(
              `plunc.js circular dependency of component\n          "${r}" detected in registry`,
            );
        });
    },
    a32 = (e) => {
      var t;
      return {
        name: e.split(" as ")[0],
        alias: null !== (t = e.split(" as ")[1]) && void 0 !== t ? t : null,
      };
    },
    a63 = (e) => {
      var t, n, r;
      return {
        prefix:
          null !== (t = null == e ? void 0 : e.prefix) && void 0 !== t
            ? t
            : "plunc-",
        startFn:
          null !== (n = null == e ? void 0 : e.startFn) && void 0 !== n
            ? n
            : () => new Promise((e) => e(!0)),
        endFn:
          null !== (r = null == e ? void 0 : e.endFn) && void 0 !== r
            ? r
            : () => new Promise((e) => e()),
      };
    },
    x20 = (e) =>
      new Promise(async (t, n) => {
        try {
          const n = [];
          for (let t = 0; t < e.dependencies.length; t++) {
            const r = e.dependencies[t];
            if (r === SCOPE_ARGUMENT_KEY) {
              if ("component" === e.type || "helper" === e.type) {
                n.push(e.scope);
                continue;
              }
              n.push(null);
              continue;
            }
            if ("$" === r.charAt(0)) {
              if ("service" === e.type || "factory" === e.type) {
                n.push({});
                continue;
              }
              switch (r) {
                case BLOCK_ARGUMENT_KEY:
                  n.push((t, n) => x78(e.component, e.instance, t, n));
                  break;
                case PATCH_ARGUMENT_KEY:
                  n.push((t = null) =>
                    a81(e.component, e.instance, e.lineage, t),
                  );
                  break;
                case PARENT_ARGUMENT_KEY:
                  n.push(x75(e.component, e.lineage, e.instance));
                  break;
                case APP_ARGUMENT_KEY:
                  n.push(a49(e.instance));
                  break;
                case CHILDREN_ARGUMENT_KEY:
                  n.push(a23());
                  break;
                case COMPONENT_ARGUMENT_KEY:
                  n.push(x61(e.component, e.lineage, e.instance));
                  break;
                default:
                  n.push({});
              }
              continue;
            }
            if (null !== e.instance.e91().e92(r)) {
              const t = await x12(r, e.instance);
              n.push(t);
              continue;
            }
            if (null === e.instance.e91().x93(r)) {
              if ("helper" === e.type || "component" === e.type) {
                if (null !== e.instance.e91().x98(r) && null !== e.scope) {
                  const t = await e17(
                    e.component,
                    e.scope,
                    r,
                    e.lineage,
                    e.instance,
                  );
                  n.push(t);
                  continue;
                }
              }
              if ("component" === e.type) {
                const t = e.lineage
                  .children(e.component.e100())
                  .filter((t) => e.instance.x80().e90(t).x88() === r)
                  .map((t) => e.instance.x80().e90(t));
                if (t.length > 0) {
                  const r = {};
                  for (let n = 0; n < t.length; n++) {
                    const o = t[n];
                    (await e10(o, e.instance, e.lineage), (r[o.e100()] = o));
                  }
                  const o = x24(r);
                  n.push(o);
                  continue;
                }
                const o = e.lineage
                  .children(e.component.e100())
                  .filter((t) => e.instance.x80().e90(t).a79() === r)
                  .map((t) => e.instance.x80().e90(t));
                if (o.length > 0) {
                  const t = {};
                  for (let n = 0; n < o.length; n++) {
                    const r = o[n];
                    (await e10(r, e.instance, e.lineage), (t[r.e100()] = r));
                  }
                  const r = x24(t);
                  n.push(r);
                  continue;
                }
              }
              (n.push(null), console.warn(`plunc.js "${r}" not found`));
            } else {
              const t = await a13(r, e.instance);
              n.push(t);
            }
          }
          t(n);
        } catch (e) {
          n(e);
        }
      }),
    x21 = (e) =>
      new Promise(async (t, n) => {
        try {
          const n = e.toString().split("{")[0];
          if ("(" !== n.charAt(0)) {
            const e = n.split("=>")[0];
            return e === n ? void t([]) : void t([e.trim()]);
          }
          const r = n.match(/(?<=\().+?(?=\))/g);
          if (null === r || /[(={})]/g.test(r[0])) return t([]);
          t(r[0].split(",").map((e) => e.trim()));
        } catch (e) {
          n(e);
        }
      }),
    x24 = (e) =>
      new Proxy(e, {
        get: function (e, t) {
          for (const n in e) {
            const r = e[n],
              o = r.a71();
            if (null === o) {
              const e = r.x88();
              throw new Error(
                `cannot invoke component "${e}}" before $app is ready`,
              );
            }
            if (!(t in o))
              throw new Error(
                `calling undefined member "${t}" in component "${r.x88()}"`,
              );
            return o[t];
          }
        },
      }),
    userAgent = navigator.userAgent.toLowerCase(),
    browser = {
      version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
      safari: /webkit/.test(userAgent),
      opera: /opera/.test(userAgent),
      msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
      mozilla:
        /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
    };
  let readyBound = !1,
    isReady = !1,
    readyList = [];
  function domReady() {
    if (!isReady && ((isReady = !0), readyList)) {
      for (var e = 0; e < readyList.length; e++) readyList[e].call(window, []);
      readyList = [];
    }
  }
  function addLoadEvent(e) {
    var t = window.onload;
    "function" != typeof window.onload
      ? (window.onload = e)
      : (window.onload = function () {
          (t && t(), e());
        });
  }
  function bindReady() {
    if (!readyBound) {
      var e;
      if (
        ((readyBound = !0),
        document.addEventListener &&
          !browser.opera &&
          document.addEventListener("DOMContentLoaded", domReady, !1),
        browser.msie &&
          window == top &&
          (function () {
            if (!isReady) {
              try {
                document.documentElement.doScroll("left");
              } catch (e) {
                return void setTimeout(arguments.callee, 0);
              }
              domReady();
            }
          })(),
        browser.opera &&
          document.addEventListener(
            "DOMContentLoaded",
            function () {
              if (!isReady) {
                for (var e = 0; e < document.styleSheets.length; e++)
                  if (document.styleSheets[e].disabled)
                    return void setTimeout(arguments.callee, 0);
                domReady();
              }
            },
            !1,
          ),
        browser.safari)
      )
        !(function () {
          if (!isReady)
            if (
              "loaded" == document.readyState ||
              "complete" == document.readyState
            ) {
              if (void 0 === e) {
                for (
                  var t = document.getElementsByTagName("link"), n = 0;
                  n < t.length;
                  n++
                )
                  "stylesheet" == t[n].getAttribute("rel") && e++;
                var r = document.getElementsByTagName("style");
                e += r.length;
              }
              document.styleSheets.length == e
                ? domReady()
                : setTimeout(arguments.callee, 0);
            } else setTimeout(arguments.callee, 0);
        })();
      addLoadEvent(domReady);
    }
  }
  const DOMHelper = {
    ready: function (e) {
      if ((bindReady(), isReady)) return e.call(window, []);
      readyList.push(function () {
        return e.call(window, []);
      });
    },
  };
  bindReady();
  const a16 = (e, t, n) => {
      for (let r = 0; r < t.length; r++) {
        const o = t[r],
          i = XAttr.x43(e, n, o);
        null !== i && (i.innerHTML = "");
      }
    },
    x44 = () => document.implementation.createHTMLDocument().body,
    a46 = (e, t) => {
      if (null !== e)
        for (; e.childNodes.length > 0; ) t.appendChild(e.childNodes[0]);
    },
    a68 = (e, t) => {
      const n = XAttr.e96(LOCK_ID_ATTR_KEY, t);
      e.setAttribute(n, LOCK_ID_ATTR_VALUE);
    },
    e47 = (e, t) => {
      const n = XAttr.e96(LOCK_ID_ATTR_KEY, t);
      return null !== e.getAttribute(n);
    },
    x51 = (e, t) => {
      null !== e &&
        ((e.innerHTML = ""),
        null !== e.parentNode &&
          (e.outerHTML =
            "\x3c!-- plunc.js: " + e.outerHTML + " | " + t + " --\x3e"));
    },
    x36 = (e, t, n, r) => {
      const o = {};
      for (let e = 0; e < r.length; e++) {
        const i = r[e],
          s = x44(),
          l = XAttr.x43(t, n, i);
        null !== l && (a46(l, s), (o[i] = s));
      }
      ((t.innerHTML = ""), a46(e, t));
      for (const e in o) {
        const r = XAttr.x43(t, n, e);
        null !== r && a46(o[e], r);
      }
    },
    a18 = (e, t, n) => {
      const r = XAttr.e96(EVENT_ELEMENT_ATTR, n);
      let o = !1;
      const i = e.getAttribute(r);
      if (null === i) return !1;
      const s = i.split(",");
      for (let e = 0; e < s.length; e++) t === s[e] && (o = !0);
      return o;
    },
    x37 = (e, t, n) => {
      const r = XAttr.e96(EVENT_ELEMENT_ATTR, n),
        o = e.getAttribute(r);
      if (null === o) return void e.setAttribute(r, t);
      let i = o.split(",");
      for (var s = 0; s < i.length; s++) t !== i[s] && i.push(t);
      e.setAttribute(r, i.join(","));
    },
    x1 = (e, t, n, r) => {
      const o = n.children(t.e100());
      let i = "";
      for (let e = 0; e < o.length; e++) {
        const t = o[e];
        i += ":not([" + XAttr.e42(STRAWBERRY_ID_ATTR, r, t) + "])";
      }
      if (((i += ` > [${e}]`), 0 === o.length)) {
        i = `[${XAttr.e42(STRAWBERRY_ID_ATTR, r, t.e100())}] [${e}]`;
      }
      const s = XAttr.x43(e48(r), r, t.e100());
      return null === s ? null : s.querySelectorAll(i);
    },
    e10 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = e.x88(),
            i = t.e91().e76(o);
          if (null === i) throw new Error(`missing component handler ${o}`);
          const s = e.a71();
          if (null !== s) return r(s);
          const l = await x21(i),
            a = i(
              ...(await x20({
                dependencies: l,
                type: "component",
                scope: e.a86(),
                instance: t,
                lineage: n,
                component: e,
              })),
            );
          (e.a72(a), r(a));
        } catch (e) {
          o(e);
        }
      }),
    a25 = (e, t, n) => {
      const r = n.children(e.e100());
      return t
        .x80()
        .e85(r)
        .map((e) => e.x88());
    },
    x12 = (e, t) =>
      new Promise(async (n, r) => {
        try {
          let r = t.x80().e90(e);
          if (null !== r) return n(r);
          const o = t.e91().e92(e);
          if (null === o) throw new Error(`missing service handler ${e}`);
          const i = await x21(o);
          if (
            ((r = o(
              ...(await x20({ dependencies: i, type: "service", instance: t })),
            )),
            null == r)
          )
            throw new Error(`service ${e} must not return ${typeof r}`);
          (t.x80().a84(e, r), n(r));
        } catch (e) {
          r(e);
        }
      }),
    a13 = (e, t) =>
      new Promise(async (n, r) => {
        try {
          let r = t.e91().x93(e);
          if (null === r) throw new Error(`missing factory handler ${e}`);
          const o = await x21(r),
            i = r(
              ...(await x20({ dependencies: o, type: "factory", instance: t })),
            );
          if ("function" == typeof i) return void n(i);
          throw new Error(`factory ${e} handler must return class reference`);
        } catch (e) {
          r(e);
        }
      }),
    e17 = (e, t, n, r, o) =>
      new Promise(async (i, s) => {
        try {
          let s = o.e91().x98(n);
          if (null === s) throw new Error(`missing helper handler ${n}`);
          const l = await x21(s),
            a = await x20({
              component: e,
              dependencies: l,
              type: "helper",
              scope: t,
              instance: o,
              lineage: r,
            });
          i(s(...a));
        } catch (e) {
          s(e);
        }
      });
  class TypeofFactory {}
  const a69 = (e) => e.a97().startFn(),
    x83 = (e, t) => {
      const n = a32(t).name,
        r = `\n      template[${XAttr.e42(TEMPL_NAME_ATTR, e, n)}]\n    `,
        o = document.querySelectorAll(`${r.trim()}`);
      if (0 === o.length) throw new Error(`102:${n}`);
      if (o.length > 1) throw new Error(`103:${n}`);
      return o[0].innerHTML;
    },
    x57 = (e, t, n) => {
      const r = x83(e, t),
        o = x44();
      o.innerHTML = r;
      const i = XAttr.e42(BLOCK_ELEMENT_ATTR, e, n),
        s = o.querySelector(`[${i}]`);
      return null === s ? null : s.innerHTML;
    };
  class Component {
    constructor(e, t) {
      (Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "alias", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "scope", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "exposed", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }));
      const n = a32(t);
      ((this.id = e),
        (this.name = n.name),
        (this.alias = n.alias),
        (this.scope = new Scope()),
        (this.exposed = null));
    }
    x88() {
      return this.name;
    }
    e100() {
      return this.id;
    }
    a86() {
      return this.scope;
    }
    a70(e) {
      this.scope = e;
    }
    a72(e) {
      null === this.exposed && (this.exposed = e);
    }
    a71() {
      return this.exposed;
    }
    a79() {
      return this.alias;
    }
  }
  class PluncElement {
    constructor(e, t = null) {
      (Object.defineProperty(this, "$element", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        Object.defineProperty(this, "$parent", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "scope", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.$element = e),
        (this.state = null),
        this.e73(null != t ? t : 1));
    }
    e73(e) {
      const t = this.$element.parentElement;
      e > 3 || null === t || (this.$parent = new PluncElement(t, e++));
    }
    get() {
      return this.$element;
    }
    getState() {
      return this.state;
    }
    setState(e) {
      null !== e && (this.state = e);
    }
    setScope(e) {
      this.scope = e;
    }
    getScope() {
      return this.scope;
    }
    addClass(e) {
      this.$element.classList.add(e);
    }
    listClass() {
      return this.$element.className.split(" ");
    }
    removeClass(e) {
      this.$element.classList.remove(e);
    }
    toggleClass(e) {
      const t = this.listClass();
      for (var n = 0; n < t.length; n++) {
        t[n] === e ? this.removeClass(e) : this.addClass(e);
      }
    }
  }
  class Library {
    constructor() {
      (Object.defineProperty(this, "handlers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        (this.handlers = {}));
    }
    a84(e, t, n) {
      const r = this.a77(t, e);
      this.handlers[r] = n;
    }
    a77(e, t) {
      return `${e}.${t}`;
    }
    e76(e) {
      const t = this.a77("component", e);
      return this.handlers[t];
    }
    e92(e) {
      var t;
      const n = this.a77("service", e);
      return null !== (t = this.handlers[n]) && void 0 !== t ? t : null;
    }
    x93(e) {
      var t;
      const n = this.a77("factory", e);
      return null !== (t = this.handlers[n]) && void 0 !== t ? t : null;
    }
    x98(e) {
      var t;
      const n = this.a77("helper", e);
      return null !== (t = this.handlers[n]) && void 0 !== t ? t : null;
    }
  }
  class Lineage {
    constructor() {
      (Object.defineProperty(this, "genealogy", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        (this.genealogy = {}));
    }
    begat(e, t) {
      (void 0 === this.genealogy[e] &&
        (this.genealogy[e] = { parent: null, children: [] }),
        null !== t &&
          (this.genealogy[e].children.push(t),
          void 0 === this.genealogy[t] &&
            (this.genealogy[t] = { parent: e, children: [] })));
    }
    lookup(e) {
      if (void 0 === this.genealogy[e]) return [];
      const t = [];
      let n = this.genealogy[e].parent;
      for (; null !== n; ) (t.push(n), (n = this.genealogy[n].parent));
      return t;
    }
    children(e) {
      if (void 0 === this.genealogy[e]) return [];
      return this.genealogy[e].children;
    }
    parent(e) {
      return void 0 === this.genealogy[e] ? null : this.genealogy[e].parent;
    }
  }
  class PluncApp {
    constructor(e, t, n) {
      (Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "config", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "library", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "registry", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "api", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "ready", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.name = e),
        (this.id = t),
        (this.config = n),
        (this.library = new Library()),
        (this.registry = new Registry()),
        (this.api = new ApplicationAPI()),
        (this.ready = !1));
    }
    a97() {
      return this.config;
    }
    e91() {
      return this.library;
    }
    x80() {
      return this.registry;
    }
    x88() {
      return this.name;
    }
    e100() {
      return this.id;
    }
    a95() {
      return this.api;
    }
    x87() {
      this.ready = !0;
    }
    a89() {
      return this.ready;
    }
  }
  class Registry {
    constructor() {
      (Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        (this.data = {}));
    }
    a84(e, t) {
      this.data[e] = t;
    }
    e85(e) {
      const t = [];
      for (const n in this.data) e.includes(n) && t.push(this.data[n]);
      return t;
    }
    e90(e) {
      var t;
      return null !== (t = this.data[e]) && void 0 !== t ? t : null;
    }
    e99() {
      return this.data;
    }
  }
  var Resolver;
  (function (Resolver) {
    ((Resolver.a33 = (e, t, n = null) => {
      const r = Resolver.x52(t);
      return x94(e, t, r, n);
    }),
      (Resolver.x52 = (e) =>
        /^'.*'$/.test(e)
          ? "string"
          : isNaN(e)
            ? (e.includes("(") && e.includes("==")) ||
              (e.includes("(") && e.includes("is ")) ||
              (e.includes("(") && e.includes(">")) ||
              (e.includes("(") && e.includes("<"))
              ? "conditional"
              : e.includes("(")
                ? "function"
                : e.includes("==") ||
                    e.includes("is ") ||
                    e.includes(">") ||
                    e.includes("<")
                  ? "conditional"
                  : e.includes("+") ||
                      e.includes("-") ||
                      e.includes("/") ||
                      e.includes("*") ||
                      e.includes("%")
                    ? "operation"
                    : "false" == e || "true" == e || "null" == e
                      ? "boolean"
                      : "object"
            : "number"));
    const x94 = (scope, expression, resolveType, element = null) => {
        switch (resolveType) {
          case "string":
            return expression.slice(1, -1);
          case "boolean":
            if ("true" == expression) return !0;
            if ("false" == expression) return !1;
            if ("null" == expression) return null;
            break;
          case "object":
            return a74(scope, expression);
          case "function":
            let structure = expression.split("("),
              expressionTest = structure[0].split(".");
            if (expressionTest.length > 1) {
              let e = Resolver.a33(scope, a26(structure[0])),
                t = expression
                  .split(".")
                  .slice(expressionTest.length - 1)
                  .join(".");
              return x53(e, scope, t, element);
            }
            return scope.hasOwnProperty(structure[0])
              ? x53(scope, scope, expression, element)
              : "";
          case "conditional":
            const evaluatorMap = {
              "!==": e5,
              "==": x9,
              "is not ": e5,
              "is ": x9,
              ">=": a3,
              ">": a14,
              "<=": e6,
              "<": x27,
            };
            for (const e in evaluatorMap)
              if (expression.includes(e))
                return evaluatorMap[e](scope, expression, e);
            return !1;
          case "number":
            return Number(expression);
          case "operation":
            let finalExpression = expression,
              operations = ["+", "-", "*", "/", "%"];
            for (var i = 0; i < operations.length; i++)
              if (expression.includes(operations[i])) {
                let e = expression.split(operations[i]),
                  t = Resolver.a33(scope, e[0].trim());
                var right = Resolver.a33(scope, e[1].trim());
                finalExpression = t + operations[i] + right;
              }
            return eval(finalExpression);
        }
      },
      a74 = (e, t) =>
        "$scope" === t
          ? e
          : t.split(".").reduce(function (e, t) {
              if (null != e && void 0 !== e[t]) return e[t];
            }, e),
      x53 = (e, t, n, r) => {
        if (void 0 === e) return "";
        const o = n.match(/\(([^)]+)\)/);
        let i = n.split("(")[0];
        if (null !== o) {
          const n = new Array(),
            s = o[1].split(",");
          for (let e = 0; e < s.length; e++) n.push(Resolver.a33(t, s[e]));
          return (
            null !== r && n.push(new PluncElement(r)),
            e[i] instanceof Function ? e[i](...n) : ""
          );
        }
        if (null !== r) {
          const t = new Array();
          return (t.push(new PluncElement(r)), e[i](...t));
        }
        return e[i] instanceof Function ? e[i]() : "";
      },
      a26 = (e) => {
        let t = e.split(".");
        return t.length < 2 ? "$scope" : (t.pop(), t.join("."));
      };
    ((Resolver.x19 = (e, t) => {
      const n = a26(t);
      return Resolver.a33(e, n);
    }),
      (Resolver.a34 = (e) => {
        let t = e.split(".");
        return t[t.length - 1];
      }));
    const x9 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r === o;
      },
      e5 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r !== o;
      },
      a14 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r > o;
      },
      a3 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r >= o;
      },
      x27 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r < o;
      },
      e6 = (e, t, n) => {
        const [r, o] = t.split(n).map((t) => Resolver.a33(e, t.trim()));
        return r <= o;
      };
  })(Resolver || (Resolver = {}));
  class Scope {
    constructor() {}
  }
  class Service {}
  const a64 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = CHECK_ELEMENT_ATTR,
            i = XAttr.a31(e, n, o);
          for (let e = 0; e < i.length; e++) {
            const r = i[e];
            if (e47(r, n)) continue;
            const s = XAttr.x82(r, n, o),
              l = t.a86();
            if (null === l || null === s || "" === s.trim()) continue;
            const a = Resolver.a33(l, s);
            ("boolean" == typeof a &&
              (a
                ? r.setAttribute("checked", "")
                : r.removeAttribute("checked")),
              a68(r, n));
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    x28 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = IF_ELEMENT_ATTR,
            i = XAttr.a31(e, n, o);
          for (let e = 0; e < i.length; e++) {
            const r = i[e];
            if (!e47(r, n)) {
              const e = XAttr.x82(r, n, o),
                i = t.a86();
              if (null === i || null === e) continue;
              const s = Resolver.a33(i, e);
              ("boolean" != typeof s || s || x51(r, "false"), a68(r, n));
            }
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    e54 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = DISABLE_ELEMENT_ATTR,
            i = XAttr.a31(e, n, o);
          for (let e = 0; e < i.length; e++) {
            const r = i[e];
            if (e47(r, n)) continue;
            const s = XAttr.x82(r, n, o),
              l = t.a86();
            if (null === l || null === s || "" === s.trim()) continue;
            const a = Resolver.a33(l, s);
            ("boolean" == typeof a &&
              (a
                ? r.setAttribute("disabled", "true")
                : r.removeAttribute("disabled")),
              a68(r, n));
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    e29 = (e, t, n, r) => {
      "function" === Resolver.x52(n) &&
        t.addEventListener(r, () => {
          Resolver.a33(e, n, t);
        });
    },
    a65 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = [
            { type: "click", attr: CLICK_EVENT_ATTR },
            { type: "change", attr: CHANGE_EVENT_ATTR },
            { type: "keyup", attr: TOUCH_EVENT_ATTR },
          ];
          for (let r = 0; r < o.length; r++) {
            const i = o[r],
              s = XAttr.a31(e, n, i.attr);
            for (let e = 0; e < s.length; e++) {
              const r = s[e],
                o = XAttr.x82(r, n, i.attr);
              if (a18(r, i.type, n)) continue;
              const l = t.a86();
              null !== l &&
                null != o &&
                (e29(l, r, o, i.type), x37(r, i.type, n));
            }
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    x62 = (e, t, n, r = !1) =>
      new Promise(async (o, i) => {
        try {
          (await e59(e, t, n),
            await x28(e, t, n),
            await e30(e, t, n),
            await a64(e, t, n),
            await a66(e, t, n),
            await e67(e, t, n),
            await e54(e, t, n),
            r || (await a65(e, t, n)),
            o());
        } catch (e) {
          i(e);
        }
      });
  function a38(e) {
    var t, n, r;
    const o = e.split("-"),
      i = null !== (t = o[0]) && void 0 !== t ? t : null;
    if (null === i || i.length < 4)
      throw new Error(
        "models assigned to Date input elements must follow standard HTML5 format YYYY-MM-DD",
      );
    const s = null !== (n = o[1]) && void 0 !== n ? n : null;
    if (null === s || parseInt(s) > 12) throw new Error(s);
    const l = null !== (r = o[2]) && void 0 !== r ? r : null;
    if (null === l || parseInt(l) > 31) throw new Error(l);
  }
  function a39(e) {
    var t, n;
    const r =
        "models assigned to Time input elements must follow standard HTML5 format HH:MM",
      o = e.split(":"),
      i = null !== (t = o[0]) && void 0 !== t ? t : null;
    if (null === i || i.length < 2 || parseInt(i) > 23) throw new Error(r);
    const s = null !== (n = o[1]) && void 0 !== n ? n : null;
    if (null === s || s.length < 2 || parseInt(s) > 59) throw new Error(r);
  }
  const a40 = (e, t, n) => {
      const r = Resolver.x19(e, t),
        o = Resolver.a34(t);
      void 0 !== r && (r[o] = n);
    },
    e41 = (e, t) => {
      "boolean" == typeof t && t
        ? e.setAttribute("checked", "")
        : e.removeAttribute("checked");
    },
    a55 = () => {
      const e = new Date(Date.now()),
        t = e.getMonth() + 1,
        n = t < 10 ? `0${t}` : t,
        r = `${e.getFullYear()}-${n}-${e.getDate()}`;
      return (a38(r), r);
    },
    x56 = () => {
      const e = new Date(Date.now()),
        t =
          (e.getHours() < 10 ? `0${e.getHours()}` : e.getHours()) +
          ":" +
          (e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes());
      return (a39(t), t);
    },
    e67 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = MODEL_ELEMENT_ATTR,
            i = XAttr.a31(e, n, o);
          for (let e = 0; e < i.length; e++) {
            const r = i[e];
            if (null === r) continue;
            const s = XAttr.x82(r, n, o),
              l = t.a86();
            if (null === l || null === s || "" === s.trim()) continue;
            const a = Resolver.a33(l, s);
            let c = !0;
            if ("INPUT" === r.tagName || "SELECT" === r.tagName) {
              if (r instanceof HTMLInputElement) {
                const e = r.type;
                if (
                  (("radio" !== e && "checkbox" !== e) ||
                    ((c = !1), void 0 === a ? a40(l, s, !1) : e41(r, a)),
                  ("text" !== e && "password" !== e && " email" !== e) ||
                    (void 0 === a ? a40(l, s, r.value) : (r.value = a)),
                  "number" === e)
                ) {
                  let e = a;
                  (void 0 === a && (e = "0"), a40(l, s, e), (r.value = e));
                }
                if ("date" === e) {
                  let e = a55();
                  (void 0 !== a ? (a38(a), (e = a)) : a40(l, s, e),
                    (r.value = e));
                }
                if ("time" === e) {
                  let e = x56();
                  (void 0 !== a ? (a39(a), (e = a)) : a40(l, s, e),
                    (r.value = e));
                }
              }
              (r instanceof HTMLSelectElement &&
                (void 0 === a ? a40(l, s, r.value) : (r.value = a)),
                r.addEventListener("change", (e) => {
                  const t = e.target;
                  if (t instanceof HTMLInputElement) {
                    const e = c ? t.value : t.checked;
                    a40(l, s, e);
                  }
                  t instanceof HTMLSelectElement && a40(l, s, t.value);
                }));
            } else
              "TEXTAREA" === r.tagName &&
                r instanceof HTMLTextAreaElement &&
                (void 0 === a ? a40(l, s, r.value) : (r.value = a),
                r.addEventListener("change", (e) => {
                  const t = e.target;
                  if (!(t instanceof HTMLTextAreaElement)) return;
                  const n = t.value;
                  a40(l, s, n);
                }));
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    e30 = (e, t, n) =>
      new Promise(async (n, r) => {
        try {
          const r = /(?<=\{{).+?(?=\}})/g;
          let o = e.innerHTML;
          e.innerHTML = "";
          const i = o.match(r);
          if (null !== i)
            for (let e = 0; e < i.length; e++) {
              const n = t.a86();
              if (null === n) continue;
              let r = Resolver.a33(n, i[e].trim());
              (void 0 === r && (r = ""),
                (o = o.replace("{{" + i[e] + "}}", r)));
            }
          ((e.innerHTML = o), n());
        } catch (e) {
          r(e);
        }
      }),
    x35 = (e) =>
      e.includes("until ")
        ? [REPEAT_REFERENCE_TOKEN, e.split("until")[1].trim()]
        : [e.split(" as ")[0].trim(), e.split(" as ")[1].trim()],
    a22 = (e) => {
      if (e instanceof Array) return e.length;
      if ("number" == typeof e && Number.isInteger(e)) return e;
      throw new Error("repeatable elements must have repeatable values");
    },
    a15 = (e) => null !== e && ("object" == typeof e || Array.isArray(e)),
    e59 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = XAttr.a31(e, n, REPEAT_ELEMENT_ATTR),
            i = t.a86();
          if (null === i) return r();
          for (let e = 0; e < o.length; e++) {
            const t = o[e],
              r = t.innerHTML;
            t.innerHTML = "";
            let s = XAttr.x82(t, n, REPEAT_ELEMENT_ATTR);
            if (null === s || "" === s.trim()) continue;
            let [l, a] = x35(s);
            if (l === REPEAT_REFERENCE_TOKEN) {
              let e = Resolver.a33(i, a),
                t = a22(e);
              i.$$index = {};
              let n = 0;
              for (; n < t; ) i.$$index["props" + n++] = new Object();
            }
            const c = Resolver.a33(i, l);
            if (a15(c)) {
              let e = 0;
              for (const [o, s] of Object.entries(c)) {
                let s = new Component("any", "any");
                s.a70({ $parent: i, $index: e++, [a]: c[o] });
                const l = x44();
                ((l.innerHTML = r), await x62(l, s, n, !0), a46(l, t));
              }
            }
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    a66 = (e, t, n) =>
      new Promise(async (r, o) => {
        try {
          const o = STYLE_ELEMENT_ATTR,
            i = XAttr.a31(e, n, o);
          for (let e = 0; e < i.length; e++) {
            const r = i[e];
            if (e47(r, n)) continue;
            const s = XAttr.x82(r, n, o),
              l = t.a86();
            if (null === l || null === s || "" === s.trim()) continue;
            const a = Resolver.a33(l, s);
            (null !== a && "" !== a && void 0 !== a && r.classList.add(a),
              a68(r, n));
          }
          r();
        } catch (e) {
          o(e);
        }
      }),
    instances = [];
  let instanceId = 0;
  const AppPublicAPI = {
      create: (e, t = null) => {
        const n = a63(t),
          r = new PluncApp(e, instanceId++, n);
        return (
          instances.push(r),
          {
            component: (e, t) => {
              r.e91().a84(e, "component", t);
            },
            service: (e, t) => {
              r.e91().a84(e, "service", t);
            },
            factory: (e, t) => {
              r.e91().a84(e, "factory", t);
            },
            helper: (e, t) => {
              r.e91().a84(e, "helper", t);
            },
          }
        );
      },
    },
    plunc = (window.plunc = AppPublicAPI);
  DOMHelper.ready(async () => {
    for (let e = 0; e < instances.length; e++) {
      const t = instances[e];
      try {
        const e = t.x88();
        if (!(await a69(t))) continue;
        const n = document.implementation.createHTMLDocument(e);
        n.body.innerHTML = x83(t, e);
        const r = XAttr.e96(COMPONENT_ELEMENT_ATTR, t),
          o = n.body.querySelectorAll(`[${r}]`);
        let i = 0;
        const s = new Lineage();
        for (let e = 0; e < o.length; e++) {
          const n = o[e],
            r = XAttr.x82(n, t, COMPONENT_ELEMENT_ATTR);
          if (null === r) continue;
          const l = a45(t, i++),
            a = XAttr.e96("id", t);
          (n.setAttribute(a, l), s.begat(l, null));
          const c = new Component(l, r);
          (t.x80().a84(l, c), (n.innerHTML = await e50(l, n, t, s)));
        }
        const l = t.x80().e99();
        for (const e in l) await e10(l[e], t, s);
        const a = x44();
        a.innerHTML = n.body.innerHTML;
        for (const e in l) {
          const n = l[e];
          if (!(n instanceof Component)) continue;
          const r = n.e100(),
            o = XAttr.x43(a, t, r);
          if (null === o) continue;
          const i = x44();
          ((i.innerHTML = o.innerHTML),
            a16(i, s.children(r), t),
            await x62(i, n, t),
            x36(i, o, t, s.children(r)));
        }
        const c = e48(t);
        (a46(a, c), t.x87());
        const u = t.a95().a60("ready");
        for (let e = 0; e < u.length; e++) u[e]();
      } catch (e) {
        const t = `plunc.js error: ${e.message}`;
        ((e.message = t), console.error(e));
      }
    }
  });
})();
//# sourceMappingURL=/sm/81482824ac472d29ce8299a890d6e8321d39e764197876ab52a52053822a5a0b.map
