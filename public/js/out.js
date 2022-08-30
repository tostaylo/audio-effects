(() => {
  // public/js/distortion.js
  function Distortion(audioContext) {
    const distortionFilter = audioContext.createWaveShaper();
    distortionFilter.curve = createDistortionCurve();
    return distortionFilter;
  }
  function createDistortionCurve(amount = 20) {
    let n_samples = 256,
      curve = new Float32Array(n_samples);
    for (let i2 = 0; i2 < n_samples; ++i2) {
      let x2 = (i2 * 2) / n_samples - 1;
      curve[i2] = ((Math.PI + amount) * x2) / (Math.PI + amount * Math.abs(x2));
    }
    return curve;
  }

  // public/js/events.js
  function handleGain(gainNode, value) {
    gainNode.gain.value = value;
    console.log(gainNode.gain.value);
  }
  function handleDistortion(distortionFilter, value) {
    const distortion = value * 10;
    console.log(distortion);
    distortionFilter.curve = createDistortionCurve(distortion);
  }

  // public/js/dom.js
  function DOM({ gainNode, distortionNode }, audioContext) {
    const volumeControl = document.querySelector('#volume');
    volumeControl.addEventListener(
      'input',
      (e) => handleGain(gainNode, e.target.value),
      false
    );
    const distortionControl = document.querySelector('#distortion');
    distortionControl.addEventListener(
      'input',
      (e) => handleDistortion(distortionNode, e.target.value),
      false
    );
  }

  // public/js/gain.js
  function Gain(audioContext, options = {}) {
    const gainNode = new GainNode(audioContext, options);
    return gainNode;
  }

  // public/js/track.js
  function createTrack(audioContext, audioElement) {
    const track = audioContext.createMediaElementSource(audioElement);
    return track;
  }

  // public/js/visualizer.js
  function waveformVisualizer(analyser) {
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    var canvas = document.getElementById('visualizer');
    var canvasCtx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      const sliceWidth = (WIDTH * 1) / bufferLength;
      let x2 = 0;
      for (let i2 = 0; i2 < bufferLength; i2++) {
        const v2 = dataArray[i2] / 128;
        const y2 = (v2 * HEIGHT) / 2;
        if (i2 === 0) {
          canvasCtx.moveTo(x2, y2);
        } else {
          canvasCtx.lineTo(x2, y2);
        }
        x2 += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }
    draw();
  }

  // public/js/impulse-response.js
  async function impulseResponse(context) {
    const convolver = new ConvolverNode(context);
    const response = await fetch(
      'rocksta-reactions-fender-twin-reverb-seiren-pro-l-a-8-4-45-45.wav'
    );
    const buffer = await response.arrayBuffer();
    await context.decodeAudioData(buffer, (decoded) => {
      convolver.buffer = decoded;
    });
    return convolver;
  }

  // node_modules/immer/dist/immer.esm.mjs
  function n(n2) {
    for (
      var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e = 1;
      e < r2;
      e++
    )
      t2[e - 1] = arguments[e];
    if (true) {
      var i2 = Y[n2],
        o2 = i2
          ? 'function' == typeof i2
            ? i2.apply(null, t2)
            : i2
          : 'unknown error nr: ' + n2;
      throw Error('[Immer] ' + o2);
    }
    throw Error(
      '[Immer] minified error nr: ' +
        n2 +
        (t2.length
          ? ' ' +
            t2
              .map(function (n3) {
                return "'" + n3 + "'";
              })
              .join(',')
          : '') +
        '. Find the full error at: https://bit.ly/3cXEKWf'
    );
  }
  function r(n2) {
    return !!n2 && !!n2[Q];
  }
  function t(n2) {
    return (
      !!n2 &&
      ((function (n3) {
        if (!n3 || 'object' != typeof n3) return false;
        var r2 = Object.getPrototypeOf(n3);
        if (null === r2) return true;
        var t2 =
          Object.hasOwnProperty.call(r2, 'constructor') && r2.constructor;
        return (
          t2 === Object ||
          ('function' == typeof t2 && Function.toString.call(t2) === Z)
        );
      })(n2) ||
        Array.isArray(n2) ||
        !!n2[L] ||
        !!n2.constructor[L] ||
        s(n2) ||
        v(n2))
    );
  }
  function i(n2, r2, t2) {
    void 0 === t2 && (t2 = false),
      0 === o(n2)
        ? (t2 ? Object.keys : nn)(n2).forEach(function (e) {
            (t2 && 'symbol' == typeof e) || r2(e, n2[e], n2);
          })
        : n2.forEach(function (t3, e) {
            return r2(e, t3, n2);
          });
  }
  function o(n2) {
    var r2 = n2[Q];
    return r2
      ? r2.i > 3
        ? r2.i - 4
        : r2.i
      : Array.isArray(n2)
      ? 1
      : s(n2)
      ? 2
      : v(n2)
      ? 3
      : 0;
  }
  function u(n2, r2) {
    return 2 === o(n2)
      ? n2.has(r2)
      : Object.prototype.hasOwnProperty.call(n2, r2);
  }
  function a(n2, r2) {
    return 2 === o(n2) ? n2.get(r2) : n2[r2];
  }
  function f(n2, r2, t2) {
    var e = o(n2);
    2 === e
      ? n2.set(r2, t2)
      : 3 === e
      ? (n2.delete(r2), n2.add(t2))
      : (n2[r2] = t2);
  }
  function c(n2, r2) {
    return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
  }
  function s(n2) {
    return X && n2 instanceof Map;
  }
  function v(n2) {
    return q && n2 instanceof Set;
  }
  function p(n2) {
    return n2.o || n2.t;
  }
  function l(n2) {
    if (Array.isArray(n2)) return Array.prototype.slice.call(n2);
    var r2 = rn(n2);
    delete r2[Q];
    for (var t2 = nn(r2), e = 0; e < t2.length; e++) {
      var i2 = t2[e],
        o2 = r2[i2];
      false === o2.writable && ((o2.writable = true), (o2.configurable = true)),
        (o2.get || o2.set) &&
          (r2[i2] = {
            configurable: true,
            writable: true,
            enumerable: o2.enumerable,
            value: n2[i2],
          });
    }
    return Object.create(Object.getPrototypeOf(n2), r2);
  }
  function d(n2, e) {
    return (
      void 0 === e && (e = false),
      y(n2) || r(n2) || !t(n2)
        ? n2
        : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h),
          Object.freeze(n2),
          e &&
            i(
              n2,
              function (n3, r2) {
                return d(r2, true);
              },
              true
            ),
          n2)
    );
  }
  function h() {
    n(2);
  }
  function y(n2) {
    return null == n2 || 'object' != typeof n2 || Object.isFrozen(n2);
  }
  function b(r2) {
    var t2 = tn[r2];
    return t2 || n(18, r2), t2;
  }
  function m(n2, r2) {
    tn[n2] || (tn[n2] = r2);
  }
  function _() {
    return U || n(0), U;
  }
  function j(n2, r2) {
    r2 && (b('Patches'), (n2.u = []), (n2.s = []), (n2.v = r2));
  }
  function O(n2) {
    g(n2), n2.p.forEach(S), (n2.p = null);
  }
  function g(n2) {
    n2 === U && (U = n2.l);
  }
  function w(n2) {
    return (U = { p: [], l: U, h: n2, m: true, _: 0 });
  }
  function S(n2) {
    var r2 = n2[Q];
    0 === r2.i || 1 === r2.i ? r2.j() : (r2.O = true);
  }
  function P(r2, e) {
    e._ = e.p.length;
    var i2 = e.p[0],
      o2 = void 0 !== r2 && r2 !== i2;
    return (
      e.h.g || b('ES5').S(e, r2, o2),
      o2
        ? (i2[Q].P && (O(e), n(4)),
          t(r2) && ((r2 = M(e, r2)), e.l || x(e, r2)),
          e.u && b('Patches').M(i2[Q].t, r2, e.u, e.s))
        : (r2 = M(e, i2, [])),
      O(e),
      e.u && e.v(e.u, e.s),
      r2 !== H ? r2 : void 0
    );
  }
  function M(n2, r2, t2) {
    if (y(r2)) return r2;
    var e = r2[Q];
    if (!e)
      return (
        i(
          r2,
          function (i2, o3) {
            return A(n2, e, r2, i2, o3, t2);
          },
          true
        ),
        r2
      );
    if (e.A !== n2) return r2;
    if (!e.P) return x(n2, e.t, true), e.t;
    if (!e.I) {
      (e.I = true), e.A._--;
      var o2 = 4 === e.i || 5 === e.i ? (e.o = l(e.k)) : e.o;
      i(3 === e.i ? new Set(o2) : o2, function (r3, i2) {
        return A(n2, e, o2, r3, i2, t2);
      }),
        x(n2, o2, false),
        t2 && n2.u && b('Patches').R(e, t2, n2.u, n2.s);
    }
    return e.o;
  }
  function A(e, i2, o2, a2, c2, s2) {
    if ((c2 === o2 && n(5), r(c2))) {
      var v2 = M(
        e,
        c2,
        s2 && i2 && 3 !== i2.i && !u(i2.D, a2) ? s2.concat(a2) : void 0
      );
      if ((f(o2, a2, v2), !r(v2))) return;
      e.m = false;
    }
    if (t(c2) && !y(c2)) {
      if (!e.h.F && e._ < 1) return;
      M(e, c2), (i2 && i2.A.l) || x(e, c2);
    }
  }
  function x(n2, r2, t2) {
    void 0 === t2 && (t2 = false), n2.h.F && n2.m && d(r2, t2);
  }
  function z(n2, r2) {
    var t2 = n2[Q];
    return (t2 ? p(t2) : n2)[r2];
  }
  function I(n2, r2) {
    if (r2 in n2)
      for (var t2 = Object.getPrototypeOf(n2); t2; ) {
        var e = Object.getOwnPropertyDescriptor(t2, r2);
        if (e) return e;
        t2 = Object.getPrototypeOf(t2);
      }
  }
  function k(n2) {
    n2.P || ((n2.P = true), n2.l && k(n2.l));
  }
  function E(n2) {
    n2.o || (n2.o = l(n2.t));
  }
  function R(n2, r2, t2) {
    var e = s(r2)
      ? b('MapSet').N(r2, t2)
      : v(r2)
      ? b('MapSet').T(r2, t2)
      : n2.g
      ? (function (n3, r3) {
          var t3 = Array.isArray(n3),
            e2 = {
              i: t3 ? 1 : 0,
              A: r3 ? r3.A : _(),
              P: false,
              I: false,
              D: {},
              l: r3,
              t: n3,
              k: null,
              o: null,
              j: null,
              C: false,
            },
            i2 = e2,
            o2 = en;
          t3 && ((i2 = [e2]), (o2 = on));
          var u2 = Proxy.revocable(i2, o2),
            a2 = u2.revoke,
            f2 = u2.proxy;
          return (e2.k = f2), (e2.j = a2), f2;
        })(r2, t2)
      : b('ES5').J(r2, t2);
    return (t2 ? t2.A : _()).p.push(e), e;
  }
  function D(e) {
    return (
      r(e) || n(22, e),
      (function n2(r2) {
        if (!t(r2)) return r2;
        var e2,
          u2 = r2[Q],
          c2 = o(r2);
        if (u2) {
          if (!u2.P && (u2.i < 4 || !b('ES5').K(u2))) return u2.t;
          (u2.I = true), (e2 = F(r2, c2)), (u2.I = false);
        } else e2 = F(r2, c2);
        return (
          i(e2, function (r3, t2) {
            (u2 && a(u2.t, r3) === t2) || f(e2, r3, n2(t2));
          }),
          3 === c2 ? new Set(e2) : e2
        );
      })(e)
    );
  }
  function F(n2, r2) {
    switch (r2) {
      case 2:
        return new Map(n2);
      case 3:
        return Array.from(n2);
    }
    return l(n2);
  }
  function N() {
    function t2(n2, r2) {
      var t3 = s2[n2];
      return (
        t3
          ? (t3.enumerable = r2)
          : (s2[n2] = t3 =
              {
                configurable: true,
                enumerable: r2,
                get: function () {
                  var r3 = this[Q];
                  return f2(r3), en.get(r3, n2);
                },
                set: function (r3) {
                  var t4 = this[Q];
                  f2(t4), en.set(t4, n2, r3);
                },
              }),
        t3
      );
    }
    function e(n2) {
      for (var r2 = n2.length - 1; r2 >= 0; r2--) {
        var t3 = n2[r2][Q];
        if (!t3.P)
          switch (t3.i) {
            case 5:
              a2(t3) && k(t3);
              break;
            case 4:
              o2(t3) && k(t3);
          }
      }
    }
    function o2(n2) {
      for (
        var r2 = n2.t, t3 = n2.k, e2 = nn(t3), i2 = e2.length - 1;
        i2 >= 0;
        i2--
      ) {
        var o3 = e2[i2];
        if (o3 !== Q) {
          var a3 = r2[o3];
          if (void 0 === a3 && !u(r2, o3)) return true;
          var f3 = t3[o3],
            s3 = f3 && f3[Q];
          if (s3 ? s3.t !== a3 : !c(f3, a3)) return true;
        }
      }
      var v2 = !!r2[Q];
      return e2.length !== nn(r2).length + (v2 ? 0 : 1);
    }
    function a2(n2) {
      var r2 = n2.k;
      if (r2.length !== n2.t.length) return true;
      var t3 = Object.getOwnPropertyDescriptor(r2, r2.length - 1);
      if (t3 && !t3.get) return true;
      for (var e2 = 0; e2 < r2.length; e2++)
        if (!r2.hasOwnProperty(e2)) return true;
      return false;
    }
    function f2(r2) {
      r2.O && n(3, JSON.stringify(p(r2)));
    }
    var s2 = {};
    m('ES5', {
      J: function (n2, r2) {
        var e2 = Array.isArray(n2),
          i2 = (function (n3, r3) {
            if (n3) {
              for (var e3 = Array(r3.length), i3 = 0; i3 < r3.length; i3++)
                Object.defineProperty(e3, '' + i3, t2(i3, true));
              return e3;
            }
            var o4 = rn(r3);
            delete o4[Q];
            for (var u2 = nn(o4), a3 = 0; a3 < u2.length; a3++) {
              var f3 = u2[a3];
              o4[f3] = t2(f3, n3 || !!o4[f3].enumerable);
            }
            return Object.create(Object.getPrototypeOf(r3), o4);
          })(e2, n2),
          o3 = {
            i: e2 ? 5 : 4,
            A: r2 ? r2.A : _(),
            P: false,
            I: false,
            D: {},
            l: r2,
            t: n2,
            k: i2,
            o: null,
            O: false,
            C: false,
          };
        return Object.defineProperty(i2, Q, { value: o3, writable: true }), i2;
      },
      S: function (n2, t3, o3) {
        o3
          ? r(t3) && t3[Q].A === n2 && e(n2.p)
          : (n2.u &&
              (function n3(r2) {
                if (r2 && 'object' == typeof r2) {
                  var t4 = r2[Q];
                  if (t4) {
                    var e2 = t4.t,
                      o4 = t4.k,
                      f3 = t4.D,
                      c2 = t4.i;
                    if (4 === c2)
                      i(o4, function (r3) {
                        r3 !== Q &&
                          (void 0 !== e2[r3] || u(e2, r3)
                            ? f3[r3] || n3(o4[r3])
                            : ((f3[r3] = true), k(t4)));
                      }),
                        i(e2, function (n4) {
                          void 0 !== o4[n4] ||
                            u(o4, n4) ||
                            ((f3[n4] = false), k(t4));
                        });
                    else if (5 === c2) {
                      if (
                        (a2(t4) && (k(t4), (f3.length = true)),
                        o4.length < e2.length)
                      )
                        for (var s3 = o4.length; s3 < e2.length; s3++)
                          f3[s3] = false;
                      else
                        for (var v2 = e2.length; v2 < o4.length; v2++)
                          f3[v2] = true;
                      for (
                        var p2 = Math.min(o4.length, e2.length), l2 = 0;
                        l2 < p2;
                        l2++
                      )
                        o4.hasOwnProperty(l2) || (f3[l2] = true),
                          void 0 === f3[l2] && n3(o4[l2]);
                    }
                  }
                }
              })(n2.p[0]),
            e(n2.p));
      },
      K: function (n2) {
        return 4 === n2.i ? o2(n2) : a2(n2);
      },
    });
  }
  var G;
  var U;
  var W = 'undefined' != typeof Symbol && 'symbol' == typeof Symbol('x');
  var X = 'undefined' != typeof Map;
  var q = 'undefined' != typeof Set;
  var B =
    'undefined' != typeof Proxy &&
    void 0 !== Proxy.revocable &&
    'undefined' != typeof Reflect;
  var H = W
    ? Symbol.for('immer-nothing')
    : (((G = {})['immer-nothing'] = true), G);
  var L = W ? Symbol.for('immer-draftable') : '__$immer_draftable';
  var Q = W ? Symbol.for('immer-state') : '__$immer_state';
  var Y = {
    0: 'Illegal state',
    1: 'Immer drafts cannot have computed properties',
    2: 'This object has been frozen and should not be mutated',
    3: function (n2) {
      return (
        'Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? ' +
        n2
      );
    },
    4: 'An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.',
    5: 'Immer forbids circular references',
    6: 'The first or second argument to `produce` must be a function',
    7: 'The third argument to `produce` must be a function or undefined',
    8: 'First argument to `createDraft` must be a plain object, an array, or an immerable object',
    9: 'First argument to `finishDraft` must be a draft returned by `createDraft`',
    10: 'The given draft is already finalized',
    11: 'Object.defineProperty() cannot be used on an Immer draft',
    12: 'Object.setPrototypeOf() cannot be used on an Immer draft',
    13: 'Immer only supports deleting array indices',
    14: "Immer only supports setting array indices and the 'length' property",
    15: function (n2) {
      return "Cannot apply patch, path doesn't resolve: " + n2;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function (n2) {
      return 'Unsupported patch operation: ' + n2;
    },
    18: function (n2) {
      return (
        "The plugin for '" +
        n2 +
        "' has not been loaded into Immer. To enable the plugin, import and call `enable" +
        n2 +
        '()` when initializing your application.'
      );
    },
    20: 'Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available',
    21: function (n2) {
      return (
        "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" +
        n2 +
        "'"
      );
    },
    22: function (n2) {
      return "'current' expects a draft, got: " + n2;
    },
    23: function (n2) {
      return "'original' expects a draft, got: " + n2;
    },
    24: 'Patching reserved attributes like __proto__, prototype and constructor is not allowed',
  };
  var Z = '' + Object.prototype.constructor;
  var nn =
    'undefined' != typeof Reflect && Reflect.ownKeys
      ? Reflect.ownKeys
      : void 0 !== Object.getOwnPropertySymbols
      ? function (n2) {
          return Object.getOwnPropertyNames(n2).concat(
            Object.getOwnPropertySymbols(n2)
          );
        }
      : Object.getOwnPropertyNames;
  var rn =
    Object.getOwnPropertyDescriptors ||
    function (n2) {
      var r2 = {};
      return (
        nn(n2).forEach(function (t2) {
          r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
        }),
        r2
      );
    };
  var tn = {};
  var en = {
    get: function (n2, r2) {
      if (r2 === Q) return n2;
      var e = p(n2);
      if (!u(e, r2))
        return (function (n3, r3, t2) {
          var e2,
            i3 = I(r3, t2);
          return i3
            ? 'value' in i3
              ? i3.value
              : null === (e2 = i3.get) || void 0 === e2
              ? void 0
              : e2.call(n3.k)
            : void 0;
        })(n2, e, r2);
      var i2 = e[r2];
      return n2.I || !t(i2)
        ? i2
        : i2 === z(n2.t, r2)
        ? (E(n2), (n2.o[r2] = R(n2.A.h, i2, n2)))
        : i2;
    },
    has: function (n2, r2) {
      return r2 in p(n2);
    },
    ownKeys: function (n2) {
      return Reflect.ownKeys(p(n2));
    },
    set: function (n2, r2, t2) {
      var e = I(p(n2), r2);
      if (null == e ? void 0 : e.set) return e.set.call(n2.k, t2), true;
      if (!n2.P) {
        var i2 = z(p(n2), r2),
          o2 = null == i2 ? void 0 : i2[Q];
        if (o2 && o2.t === t2) return (n2.o[r2] = t2), (n2.D[r2] = false), true;
        if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2))) return true;
        E(n2), k(n2);
      }
      return (
        (n2.o[r2] === t2 &&
          'number' != typeof t2 &&
          (void 0 !== t2 || r2 in n2.o)) ||
        ((n2.o[r2] = t2), (n2.D[r2] = true), true)
      );
    },
    deleteProperty: function (n2, r2) {
      return (
        void 0 !== z(n2.t, r2) || r2 in n2.t
          ? ((n2.D[r2] = false), E(n2), k(n2))
          : delete n2.D[r2],
        n2.o && delete n2.o[r2],
        true
      );
    },
    getOwnPropertyDescriptor: function (n2, r2) {
      var t2 = p(n2),
        e = Reflect.getOwnPropertyDescriptor(t2, r2);
      return e
        ? {
            writable: true,
            configurable: 1 !== n2.i || 'length' !== r2,
            enumerable: e.enumerable,
            value: t2[r2],
          }
        : e;
    },
    defineProperty: function () {
      n(11);
    },
    getPrototypeOf: function (n2) {
      return Object.getPrototypeOf(n2.t);
    },
    setPrototypeOf: function () {
      n(12);
    },
  };
  var on = {};
  i(en, function (n2, r2) {
    on[n2] = function () {
      return (arguments[0] = arguments[0][0]), r2.apply(this, arguments);
    };
  }),
    (on.deleteProperty = function (r2, t2) {
      return isNaN(parseInt(t2)) && n(13), on.set.call(this, r2, t2, void 0);
    }),
    (on.set = function (r2, t2, e) {
      return (
        'length' !== t2 && isNaN(parseInt(t2)) && n(14),
        en.set.call(this, r2[0], t2, e, r2[0])
      );
    });
  var un = (function () {
    function e(r2) {
      var e2 = this;
      (this.g = B),
        (this.F = true),
        (this.produce = function (r3, i3, o2) {
          if ('function' == typeof r3 && 'function' != typeof i3) {
            var u2 = i3;
            i3 = r3;
            var a2 = e2;
            return function (n2) {
              var r4 = this;
              void 0 === n2 && (n2 = u2);
              for (
                var t2 = arguments.length,
                  e3 = Array(t2 > 1 ? t2 - 1 : 0),
                  o3 = 1;
                o3 < t2;
                o3++
              )
                e3[o3 - 1] = arguments[o3];
              return a2.produce(n2, function (n3) {
                var t3;
                return (t3 = i3).call.apply(t3, [r4, n3].concat(e3));
              });
            };
          }
          var f2;
          if (
            ('function' != typeof i3 && n(6),
            void 0 !== o2 && 'function' != typeof o2 && n(7),
            t(r3))
          ) {
            var c2 = w(e2),
              s2 = R(e2, r3, void 0),
              v2 = true;
            try {
              (f2 = i3(s2)), (v2 = false);
            } finally {
              v2 ? O(c2) : g(c2);
            }
            return 'undefined' != typeof Promise && f2 instanceof Promise
              ? f2.then(
                  function (n2) {
                    return j(c2, o2), P(n2, c2);
                  },
                  function (n2) {
                    throw (O(c2), n2);
                  }
                )
              : (j(c2, o2), P(f2, c2));
          }
          if (!r3 || 'object' != typeof r3) {
            if (
              (void 0 === (f2 = i3(r3)) && (f2 = r3),
              f2 === H && (f2 = void 0),
              e2.F && d(f2, true),
              o2)
            ) {
              var p2 = [],
                l2 = [];
              b('Patches').M(r3, f2, p2, l2), o2(p2, l2);
            }
            return f2;
          }
          n(21, r3);
        }),
        (this.produceWithPatches = function (n2, r3) {
          if ('function' == typeof n2)
            return function (r4) {
              for (
                var t3 = arguments.length,
                  i4 = Array(t3 > 1 ? t3 - 1 : 0),
                  o3 = 1;
                o3 < t3;
                o3++
              )
                i4[o3 - 1] = arguments[o3];
              return e2.produceWithPatches(r4, function (r5) {
                return n2.apply(void 0, [r5].concat(i4));
              });
            };
          var t2,
            i3,
            o2 = e2.produce(n2, r3, function (n3, r4) {
              (t2 = n3), (i3 = r4);
            });
          return 'undefined' != typeof Promise && o2 instanceof Promise
            ? o2.then(function (n3) {
                return [n3, t2, i3];
              })
            : [o2, t2, i3];
        }),
        'boolean' == typeof (null == r2 ? void 0 : r2.useProxies) &&
          this.setUseProxies(r2.useProxies),
        'boolean' == typeof (null == r2 ? void 0 : r2.autoFreeze) &&
          this.setAutoFreeze(r2.autoFreeze);
    }
    var i2 = e.prototype;
    return (
      (i2.createDraft = function (e2) {
        t(e2) || n(8), r(e2) && (e2 = D(e2));
        var i3 = w(this),
          o2 = R(this, e2, void 0);
        return (o2[Q].C = true), g(i3), o2;
      }),
      (i2.finishDraft = function (r2, t2) {
        var e2 = r2 && r2[Q];
        (e2 && e2.C) || n(9), e2.I && n(10);
        var i3 = e2.A;
        return j(i3, t2), P(void 0, i3);
      }),
      (i2.setAutoFreeze = function (n2) {
        this.F = n2;
      }),
      (i2.setUseProxies = function (r2) {
        r2 && !B && n(20), (this.g = r2);
      }),
      (i2.applyPatches = function (n2, t2) {
        var e2;
        for (e2 = t2.length - 1; e2 >= 0; e2--) {
          var i3 = t2[e2];
          if (0 === i3.path.length && 'replace' === i3.op) {
            n2 = i3.value;
            break;
          }
        }
        e2 > -1 && (t2 = t2.slice(e2 + 1));
        var o2 = b('Patches').$;
        return r(n2)
          ? o2(n2, t2)
          : this.produce(n2, function (n3) {
              return o2(n3, t2);
            });
      }),
      e
    );
  })();
  var an = new un();
  var fn = an.produce;
  var cn = an.produceWithPatches.bind(an);
  var sn = an.setAutoFreeze.bind(an);
  var vn = an.setUseProxies.bind(an);
  var pn = an.applyPatches.bind(an);
  var ln = an.createDraft.bind(an);
  var dn = an.finishDraft.bind(an);

  // node_modules/@babel/runtime/helpers/esm/defineProperty.js
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  // node_modules/@babel/runtime/helpers/esm/objectSpread2.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = null != arguments[i2] ? arguments[i2] : {};
      i2 % 2
        ? ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  // node_modules/redux/es/redux.js
  var $$observable = (function () {
    return (
      (typeof Symbol === 'function' && Symbol.observable) || '@@observable'
    );
  })();
  var randomString = function randomString2() {
    return Math.random().toString(36).substring(7).split('').join('.');
  };
  var ActionTypes = {
    INIT: '@@redux/INIT' + randomString(),
    REPLACE: '@@redux/REPLACE' + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return '@@redux/PROBE_UNKNOWN_ACTION' + randomString();
    },
  };
  function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  }
  function miniKindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    var type = typeof val;
    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'symbol':
      case 'function': {
        return type;
      }
    }
    if (Array.isArray(val)) return 'array';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    var constructorName = ctorName(val);
    switch (constructorName) {
      case 'Symbol':
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return constructorName;
    }
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
  }
  function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
  }
  function isError(val) {
    return (
      val instanceof Error ||
      (typeof val.message === 'string' &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === 'number')
    );
  }
  function isDate(val) {
    if (val instanceof Date) return true;
    return (
      typeof val.toDateString === 'function' &&
      typeof val.getDate === 'function' &&
      typeof val.setDate === 'function'
    );
  }
  function kindOf(val) {
    var typeOfVal = typeof val;
    if (true) {
      typeOfVal = miniKindOf(val);
    }
    return typeOfVal;
  }
  function createStore(reducer, preloadedState, enhancer) {
    var _ref2;
    if (
      (typeof preloadedState === 'function' &&
        typeof enhancer === 'function') ||
      (typeof enhancer === 'function' && typeof arguments[3] === 'function')
    ) {
      throw new Error(
        false
          ? formatProdErrorMessage(0)
          : 'It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.'
      );
    }
    if (
      typeof preloadedState === 'function' &&
      typeof enhancer === 'undefined'
    ) {
      enhancer = preloadedState;
      preloadedState = void 0;
    }
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error(
          false
            ? formatProdErrorMessage(1)
            : "Expected the enhancer to be a function. Instead, received: '" +
              kindOf(enhancer) +
              "'"
        );
      }
      return enhancer(createStore)(reducer, preloadedState);
    }
    if (typeof reducer !== 'function') {
      throw new Error(
        false
          ? formatProdErrorMessage(2)
          : "Expected the root reducer to be a function. Instead, received: '" +
            kindOf(reducer) +
            "'"
      );
    }
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    function getState() {
      if (isDispatching) {
        throw new Error(
          false
            ? formatProdErrorMessage(3)
            : 'You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.'
        );
      }
      return currentState;
    }
    function subscribe(listener2) {
      if (typeof listener2 !== 'function') {
        throw new Error(
          false
            ? formatProdErrorMessage(4)
            : "Expected the listener to be a function. Instead, received: '" +
              kindOf(listener2) +
              "'"
        );
      }
      if (isDispatching) {
        throw new Error(
          false
            ? formatProdErrorMessage(5)
            : 'You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.'
        );
      }
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener2);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        if (isDispatching) {
          throw new Error(
            false
              ? formatProdErrorMessage(6)
              : 'You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.'
          );
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener2);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error(
          false
            ? formatProdErrorMessage(7)
            : "Actions must be plain objects. Instead, the actual type was: '" +
              kindOf(action) +
              "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples."
        );
      }
      if (typeof action.type === 'undefined') {
        throw new Error(
          false
            ? formatProdErrorMessage(8)
            : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
        );
      }
      if (isDispatching) {
        throw new Error(
          false
            ? formatProdErrorMessage(9)
            : 'Reducers may not dispatch actions.'
        );
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      var listeners = (currentListeners = nextListeners);
      for (var i2 = 0; i2 < listeners.length; i2++) {
        var listener2 = listeners[i2];
        listener2();
      }
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error(
          false
            ? formatProdErrorMessage(10)
            : "Expected the nextReducer to be a function. Instead, received: '" +
              kindOf(nextReducer)
        );
      }
      currentReducer = nextReducer;
      dispatch({
        type: ActionTypes.REPLACE,
      });
    }
    function observable() {
      var _ref;
      var outerSubscribe = subscribe;
      return (
        (_ref = {
          subscribe: function subscribe2(observer) {
            if (typeof observer !== 'object' || observer === null) {
              throw new Error(
                false
                  ? formatProdErrorMessage(11)
                  : "Expected the observer to be an object. Instead, received: '" +
                    kindOf(observer) +
                    "'"
              );
            }
            function observeState() {
              if (observer.next) {
                observer.next(getState());
              }
            }
            observeState();
            var unsubscribe = outerSubscribe(observeState);
            return {
              unsubscribe,
            };
          },
        }),
        (_ref[$$observable] = function () {
          return this;
        }),
        _ref
      );
    }
    dispatch({
      type: ActionTypes.INIT,
    });
    return (
      (_ref2 = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
      }),
      (_ref2[$$observable] = observable),
      _ref2
    );
  }
  function warning(message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (e) {}
  }
  function getUnexpectedStateShapeWarningMessage(
    inputState,
    reducers,
    action,
    unexpectedKeyCache
  ) {
    var reducerKeys = Object.keys(reducers);
    var argumentName =
      action && action.type === ActionTypes.INIT
        ? 'preloadedState argument passed to createStore'
        : 'previous state received by the reducer';
    if (reducerKeys.length === 0) {
      return 'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.';
    }
    if (!isPlainObject(inputState)) {
      return (
        'The ' +
        argumentName +
        ' has unexpected type of "' +
        kindOf(inputState) +
        '". Expected argument to be an object with the following ' +
        ('keys: "' + reducerKeys.join('", "') + '"')
      );
    }
    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function (key) {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE) return;
    if (unexpectedKeys.length > 0) {
      return (
        'Unexpected ' +
        (unexpectedKeys.length > 1 ? 'keys' : 'key') +
        ' ' +
        ('"' +
          unexpectedKeys.join('", "') +
          '" found in ' +
          argumentName +
          '. ') +
        'Expected to find one of the known reducer keys instead: ' +
        ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.')
      );
    }
  }
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function (key) {
      var reducer = reducers[key];
      var initialState = reducer(void 0, {
        type: ActionTypes.INIT,
      });
      if (typeof initialState === 'undefined') {
        throw new Error(
          false
            ? formatProdErrorMessage(12)
            : 'The slice reducer for key "' +
              key +
              `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`
        );
      }
      if (
        typeof reducer(void 0, {
          type: ActionTypes.PROBE_UNKNOWN_ACTION(),
        }) === 'undefined'
      ) {
        throw new Error(
          false
            ? formatProdErrorMessage(13)
            : 'The slice reducer for key "' +
              key +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle '" +
                ActionTypes.INIT +
                `' or other actions in "redux/*" `) +
              'namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
        );
      }
    });
  }
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i2 = 0; i2 < reducerKeys.length; i2++) {
      var key = reducerKeys[i2];
      if (true) {
        if (typeof reducers[key] === 'undefined') {
          warning('No reducer provided for key "' + key + '"');
        }
      }
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    var unexpectedKeyCache;
    if (true) {
      unexpectedKeyCache = {};
    }
    var shapeAssertionError;
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
      if (true) {
        var warningMessage = getUnexpectedStateShapeWarningMessage(
          state,
          finalReducers,
          action,
          unexpectedKeyCache
        );
        if (warningMessage) {
          warning(warningMessage);
        }
      }
      var hasChanged = false;
      var nextState = {};
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer = finalReducers[_key];
        var previousStateForKey = state[_key];
        var nextStateForKey = reducer(previousStateForKey, action);
        if (typeof nextStateForKey === 'undefined') {
          var actionType = action && action.type;
          throw new Error(
            false
              ? formatProdErrorMessage(14)
              : 'When called with an action of type ' +
                (actionType
                  ? '"' + String(actionType) + '"'
                  : '(unknown type)') +
                ', the slice reducer for key "' +
                _key +
                '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
          );
        }
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      hasChanged =
        hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  function compose() {
    for (
      var _len = arguments.length, funcs = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function (a2, b2) {
      return function () {
        return a2(b2.apply(void 0, arguments));
      };
    });
  }
  function applyMiddleware() {
    for (
      var _len = arguments.length, middlewares = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      middlewares[_key] = arguments[_key];
    }
    return function (createStore2) {
      return function () {
        var store2 = createStore2.apply(void 0, arguments);
        var _dispatch = function dispatch() {
          throw new Error(
            false
              ? formatProdErrorMessage(15)
              : 'Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.'
          );
        };
        var middlewareAPI = {
          getState: store2.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          },
        };
        var chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store2.dispatch);
        return _objectSpread2(
          _objectSpread2({}, store2),
          {},
          {
            dispatch: _dispatch,
          }
        );
      };
    };
  }
  function isCrushed() {}
  if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
    warning(
      'You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.'
    );
  }

  // node_modules/redux-thunk/es/index.js
  function createThunkMiddleware(extraArgument) {
    var middleware = function middleware2(_ref) {
      var dispatch = _ref.dispatch,
        getState = _ref.getState;
      return function (next) {
        return function (action) {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      };
    };
    return middleware;
  }
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  var es_default = thunk;

  // node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
  var __extends = (function () {
    var extendStatics = function (d2, b2) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d3, b3) {
            d3.__proto__ = b3;
          }) ||
        function (d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
        };
      return extendStatics(d2, b2);
    };
    return function (d2, b2) {
      if (typeof b2 !== 'function' && b2 !== null)
        throw new TypeError(
          'Class extends value ' + String(b2) + ' is not a constructor or null'
        );
      extendStatics(d2, b2);
      function __() {
        this.constructor = d2;
      }
      d2.prototype =
        b2 === null
          ? Object.create(b2)
          : ((__.prototype = b2.prototype), new __());
    };
  })();
  var __spreadArray = function (to, from) {
    for (var i2 = 0, il = from.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from[i2];
    return to;
  };
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function (obj, key, value) {
    return key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  };
  var __spreadValues = function (a2, b2) {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop)) __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var _i = 0, _c = __getOwnPropSymbols(b2); _i < _c.length; _i++) {
        var prop = _c[_i];
        if (__propIsEnum.call(b2, prop)) __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var composeWithDevTools =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length === 0) return void 0;
          if (typeof arguments[0] === 'object') return compose;
          return compose.apply(null, arguments);
        };
  var devToolsEnhancer =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__
      : function () {
          return function (noop2) {
            return noop2;
          };
        };
  function isPlainObject2(value) {
    if (typeof value !== 'object' || value === null) return false;
    var proto = Object.getPrototypeOf(value);
    if (proto === null) return true;
    var baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
      baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
  }
  function getTimeMeasureUtils(maxDelay, fnName) {
    var elapsed = 0;
    return {
      measureTime: function (fn2) {
        var started = Date.now();
        try {
          return fn2();
        } finally {
          var finished = Date.now();
          elapsed += finished - started;
        }
      },
      warnIfExceeded: function () {
        if (elapsed > maxDelay) {
          console.warn(
            fnName +
              ' took ' +
              elapsed +
              'ms, which is more than the warning threshold of ' +
              maxDelay +
              "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that."
          );
        }
      },
    };
  }
  var MiddlewareArray = (function (_super) {
    __extends(MiddlewareArray2, _super);
    function MiddlewareArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray2, Symbol.species, {
      get: function () {
        return MiddlewareArray2;
      },
      enumerable: false,
      configurable: true,
    });
    MiddlewareArray2.prototype.concat = function () {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray2.prototype.prepend = function () {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray2.bind.apply(
          MiddlewareArray2,
          __spreadArray([void 0], arr[0].concat(this))
        ))();
      }
      return new (MiddlewareArray2.bind.apply(
        MiddlewareArray2,
        __spreadArray([void 0], arr.concat(this))
      ))();
    };
    return MiddlewareArray2;
  })(Array);
  var isProduction = false;
  var prefix = 'Invariant failed';
  function invariant(condition, message) {
    if (condition) {
      return;
    }
    if (isProduction) {
      throw new Error(prefix);
    }
    throw new Error(prefix + ': ' + (message || ''));
  }
  function stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
  }
  function getSerialize(serializer, decycler) {
    var stack = [],
      keys = [];
    if (!decycler)
      decycler = function (_2, value) {
        if (stack[0] === value) return '[Circular ~]';
        return (
          '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']'
        );
      };
    return function (key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (~stack.indexOf(value)) value = decycler.call(this, key, value);
      } else stack.push(value);
      return serializer == null ? value : serializer.call(this, key, value);
    };
  }
  function isImmutableDefault(value) {
    return typeof value !== 'object' || value == null || Object.isFrozen(value);
  }
  function trackForMutations(isImmutable, ignorePaths, obj) {
    var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
      detectMutations: function () {
        return detectMutations(
          isImmutable,
          ignorePaths,
          trackedProperties,
          obj
        );
      },
    };
  }
  function trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (path === void 0) {
      path = '';
    }
    var tracked = { value: obj };
    if (!isImmutable(obj)) {
      tracked.children = {};
      for (var key in obj) {
        var childPath = path ? path + '.' + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
          continue;
        }
        tracked.children[key] = trackProperties(
          isImmutable,
          ignorePaths,
          obj[key],
          childPath
        );
      }
    }
    return tracked;
  }
  function detectMutations(
    isImmutable,
    ignorePaths,
    trackedProperty,
    obj,
    sameParentRef,
    path
  ) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (sameParentRef === void 0) {
      sameParentRef = false;
    }
    if (path === void 0) {
      path = '';
    }
    var prevObj = trackedProperty ? trackedProperty.value : void 0;
    var sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
      return { wasMutated: true, path };
    }
    if (isImmutable(prevObj) || isImmutable(obj)) {
      return { wasMutated: false };
    }
    var keysToDetect = {};
    for (var key in trackedProperty.children) {
      keysToDetect[key] = true;
    }
    for (var key in obj) {
      keysToDetect[key] = true;
    }
    for (var key in keysToDetect) {
      var childPath = path ? path + '.' + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      var result = detectMutations(
        isImmutable,
        ignorePaths,
        trackedProperty.children[key],
        obj[key],
        sameRef,
        childPath
      );
      if (result.wasMutated) {
        return result;
      }
    }
    return { wasMutated: false };
  }
  function createImmutableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    if (false) {
      return function () {
        return function (next) {
          return function (action) {
            return next(action);
          };
        };
      };
    }
    var _c = options.isImmutable,
      isImmutable = _c === void 0 ? isImmutableDefault : _c,
      ignoredPaths = options.ignoredPaths,
      _d = options.warnAfter,
      warnAfter = _d === void 0 ? 32 : _d,
      ignore = options.ignore;
    ignoredPaths = ignoredPaths || ignore;
    var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return function (_c2) {
      var getState = _c2.getState;
      var state = getState();
      var tracker = track(state);
      var result;
      return function (next) {
        return function (action) {
          var measureUtils = getTimeMeasureUtils(
            warnAfter,
            'ImmutableStateInvariantMiddleware'
          );
          measureUtils.measureTime(function () {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            invariant(
              !result.wasMutated,
              "A state mutation was detected between dispatches, in the path '" +
                (result.path || '') +
                "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)"
            );
          });
          var dispatchedAction = next(action);
          measureUtils.measureTime(function () {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            result.wasMutated &&
              invariant(
                !result.wasMutated,
                'A state mutation was detected inside a dispatch, in the path: ' +
                  (result.path || '') +
                  '. Take a look at the reducer(s) handling the action ' +
                  stringify(action) +
                  '. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)'
              );
          });
          measureUtils.warnIfExceeded();
          return dispatchedAction;
        };
      };
    };
  }
  function isPlain(val) {
    var type = typeof val;
    return (
      val == null ||
      type === 'string' ||
      type === 'boolean' ||
      type === 'number' ||
      Array.isArray(val) ||
      isPlainObject2(val)
    );
  }
  function findNonSerializableValue(
    value,
    path,
    isSerializable,
    getEntries,
    ignoredPaths
  ) {
    if (path === void 0) {
      path = '';
    }
    if (isSerializable === void 0) {
      isSerializable = isPlain;
    }
    if (ignoredPaths === void 0) {
      ignoredPaths = [];
    }
    var foundNestedSerializable;
    if (!isSerializable(value)) {
      return {
        keyPath: path || '<root>',
        value,
      };
    }
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    var entries =
      getEntries != null ? getEntries(value) : Object.entries(value);
    var hasIgnoredPaths = ignoredPaths.length > 0;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
      var _c = entries_1[_i],
        key = _c[0],
        nestedValue = _c[1];
      var nestedPath = path ? path + '.' + key : key;
      if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) {
        continue;
      }
      if (!isSerializable(nestedValue)) {
        return {
          keyPath: nestedPath,
          value: nestedValue,
        };
      }
      if (typeof nestedValue === 'object') {
        foundNestedSerializable = findNonSerializableValue(
          nestedValue,
          nestedPath,
          isSerializable,
          getEntries,
          ignoredPaths
        );
        if (foundNestedSerializable) {
          return foundNestedSerializable;
        }
      }
    }
    return false;
  }
  function createSerializableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    if (false) {
      return function () {
        return function (next) {
          return function (action) {
            return next(action);
          };
        };
      };
    }
    var _c = options.isSerializable,
      isSerializable = _c === void 0 ? isPlain : _c,
      getEntries = options.getEntries,
      _d = options.ignoredActions,
      ignoredActions = _d === void 0 ? [] : _d,
      _e = options.ignoredActionPaths,
      ignoredActionPaths =
        _e === void 0 ? ['meta.arg', 'meta.baseQueryMeta'] : _e,
      _f = options.ignoredPaths,
      ignoredPaths = _f === void 0 ? [] : _f,
      _g = options.warnAfter,
      warnAfter = _g === void 0 ? 32 : _g,
      _h = options.ignoreState,
      ignoreState = _h === void 0 ? false : _h,
      _j = options.ignoreActions,
      ignoreActions = _j === void 0 ? false : _j;
    return function (storeAPI) {
      return function (next) {
        return function (action) {
          var result = next(action);
          var measureUtils = getTimeMeasureUtils(
            warnAfter,
            'SerializableStateInvariantMiddleware'
          );
          if (
            !ignoreActions &&
            !(
              ignoredActions.length &&
              ignoredActions.indexOf(action.type) !== -1
            )
          ) {
            measureUtils.measureTime(function () {
              var foundActionNonSerializableValue = findNonSerializableValue(
                action,
                '',
                isSerializable,
                getEntries,
                ignoredActionPaths
              );
              if (foundActionNonSerializableValue) {
                var keyPath = foundActionNonSerializableValue.keyPath,
                  value = foundActionNonSerializableValue.value;
                console.error(
                  'A non-serializable value was detected in an action, in the path: `' +
                    keyPath +
                    '`. Value:',
                  value,
                  '\nTake a look at the logic that dispatched this action: ',
                  action,
                  '\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)',
                  '\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)'
                );
              }
            });
          }
          if (!ignoreState) {
            measureUtils.measureTime(function () {
              var state = storeAPI.getState();
              var foundStateNonSerializableValue = findNonSerializableValue(
                state,
                '',
                isSerializable,
                getEntries,
                ignoredPaths
              );
              if (foundStateNonSerializableValue) {
                var keyPath = foundStateNonSerializableValue.keyPath,
                  value = foundStateNonSerializableValue.value;
                console.error(
                  'A non-serializable value was detected in the state, in the path: `' +
                    keyPath +
                    '`. Value:',
                  value,
                  '\nTake a look at the reducer(s) handling this action type: ' +
                    action.type +
                    '.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)'
                );
              }
            });
            measureUtils.warnIfExceeded();
          }
          return result;
        };
      };
    };
  }
  function isBoolean(x2) {
    return typeof x2 === 'boolean';
  }
  function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
      return getDefaultMiddleware(options);
    };
  }
  function getDefaultMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    var _c = options.thunk,
      thunk2 = _c === void 0 ? true : _c,
      _d = options.immutableCheck,
      immutableCheck = _d === void 0 ? true : _d,
      _e = options.serializableCheck,
      serializableCheck = _e === void 0 ? true : _e;
    var middlewareArray = new MiddlewareArray();
    if (thunk2) {
      if (isBoolean(thunk2)) {
        middlewareArray.push(es_default);
      } else {
        middlewareArray.push(
          es_default.withExtraArgument(thunk2.extraArgument)
        );
      }
    }
    if (true) {
      if (immutableCheck) {
        var immutableOptions = {};
        if (!isBoolean(immutableCheck)) {
          immutableOptions = immutableCheck;
        }
        middlewareArray.unshift(
          createImmutableStateInvariantMiddleware(immutableOptions)
        );
      }
      if (serializableCheck) {
        var serializableOptions = {};
        if (!isBoolean(serializableCheck)) {
          serializableOptions = serializableCheck;
        }
        middlewareArray.push(
          createSerializableStateInvariantMiddleware(serializableOptions)
        );
      }
    }
    return middlewareArray;
  }
  var IS_PRODUCTION = false;
  function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _c = options || {},
      _d = _c.reducer,
      reducer = _d === void 0 ? void 0 : _d,
      _e = _c.middleware,
      middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e,
      _f = _c.devTools,
      devTools = _f === void 0 ? true : _f,
      _g = _c.preloadedState,
      preloadedState = _g === void 0 ? void 0 : _g,
      _h = _c.enhancers,
      enhancers = _h === void 0 ? void 0 : _h;
    var rootReducer;
    if (typeof reducer === 'function') {
      rootReducer = reducer;
    } else if (isPlainObject2(reducer)) {
      rootReducer = combineReducers(reducer);
    } else {
      throw new Error(
        '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
      );
    }
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === 'function') {
      finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
      if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
        throw new Error(
          'when using a middleware builder function, an array of middleware must be returned'
        );
      }
    }
    if (
      !IS_PRODUCTION &&
      finalMiddleware.some(function (item) {
        return typeof item !== 'function';
      })
    ) {
      throw new Error(
        'each middleware provided to configureStore must be a function'
      );
    }
    var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
    var finalCompose = compose;
    if (devTools) {
      finalCompose = composeWithDevTools(
        __spreadValues(
          {
            trace: !IS_PRODUCTION,
          },
          typeof devTools === 'object' && devTools
        )
      );
    }
    var storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
      storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
    } else if (typeof enhancers === 'function') {
      storeEnhancers = enhancers(storeEnhancers);
    }
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return createStore(rootReducer, preloadedState, composedEnhancer);
  }
  function createAction(type, prepareAction) {
    function actionCreator() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (prepareAction) {
        var prepared = prepareAction.apply(void 0, args);
        if (!prepared) {
          throw new Error('prepareAction did not return an object');
        }
        return __spreadValues(
          __spreadValues(
            {
              type,
              payload: prepared.payload,
            },
            'meta' in prepared && { meta: prepared.meta }
          ),
          'error' in prepared && { error: prepared.error }
        );
      }
      return { type, payload: args[0] };
    }
    actionCreator.toString = function () {
      return '' + type;
    };
    actionCreator.type = type;
    actionCreator.match = function (action) {
      return action.type === type;
    };
    return actionCreator;
  }
  var RejectWithValue = (function () {
    function RejectWithValue2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return RejectWithValue2;
  })();
  var FulfillWithMeta = (function () {
    function FulfillWithMeta2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return FulfillWithMeta2;
  })();
  var task = 'task';
  var listener = 'listener';
  var completed = 'completed';
  var cancelled = 'cancelled';
  var taskCancelled = 'task-' + cancelled;
  var taskCompleted = 'task-' + completed;
  var listenerCancelled = listener + '-' + cancelled;
  var listenerCompleted = listener + '-' + completed;
  var TaskAbortError = (function () {
    function TaskAbortError2(code) {
      this.code = code;
      this.name = 'TaskAbortError';
      this.message = task + ' ' + cancelled + ' (reason: ' + code + ')';
    }
    return TaskAbortError2;
  })();
  var alm = 'listenerMiddleware';
  var addListener = createAction(alm + '/add');
  var clearAllListeners = createAction(alm + '/removeAll');
  var removeListener = createAction(alm + '/remove');
  N();

  // public/js/audio.js
  function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 };
      case 'counter/decremented':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }
  var store = configureStore({ reducer: counterReducer });
  console.log(store);
  var createGraph = (nodes, track) =>
    nodes.reduce((acc, node) => acc.connect(node), track);
  async function initialize() {
    const audioContext = new AudioContext();
    const audioElement = document.querySelector('audio');
    const track = createTrack(audioContext, audioElement);
    const convolver = await impulseResponse(audioContext);
    const analyser = audioContext.createAnalyser();
    waveformVisualizer(analyser);
    const distortionNode = Distortion(audioContext);
    const preAmpGainNode = Gain(audioContext);
    const postAmpGainNode = Gain(audioContext, { gain: 2 });
    const nodes = [
      preAmpGainNode,
      distortionNode,
      convolver,
      postAmpGainNode,
      analyser,
      audioContext.destination,
    ];
    const createButton = document.getElementById('create');
    createButton.addEventListener('click', () => {
      createGraph(nodes, track);
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      audioElement.play();
    });
    const modifyButton = document.getElementById('modify');
    modifyButton.addEventListener('click', () => {
      const newNodes = [...nodes.slice(2)];
      nodes.reverse().forEach((node) => node.disconnect());
      createGraph(newNodes, track);
    });
    DOM({ gainNode: preAmpGainNode, distortionNode }, audioContext);
  }
  initialize();
})();
