/*! For license information please see tonweb.js.LICENSE.txt */ ! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.tonweb = e() : t.TonWeb = e()
}(self, (function() {
    return (() => {
        var t = [(t, e, r) => {
                const i = r(1),
                    n = i.Address,
                    o = r(19),
                    s = r(22),
                    a = r(24).default,
                    {
                        Contract: h
                    } = r(23),
                    u = r(27).default,
                    l = r(34).default,
                    c = r(35).default,
                    f = r(41).default,
                    {
                        BlockSubscription: d,
                        InMemoryBlockStorage: p
                    } = r(44),
                    {
                        SubscriptionContract: m
                    } = r(47),
                    g = r(48).default,
                    v = r(103).default,
                    y = r(104).default,
                    w = "0.0.41";
                class b {
                    constructor(t) {
                        this.version = w, this.utils = i, this.Address = n, this.boc = o, this.Contract = h, this.BlockSubscription = d, this.InMemoryBlockStorage = p, this.provider = t || new a, this.wallet = new u(this.provider), this.lockupWallet = l
                    }
                    async getTransactions(t, e = 20, r, i, n) {
                        return this.provider.getTransactions(t.toString(), e, r, i, n)
                    }
                    async getBalance(t) {
                        return this.provider.getBalance(t.toString())
                    }
                    async sendBoc(t) {
                        return this.provider.sendBoc(i.bytesToBase64(t))
                    }
                    async call(t, e, r = []) {
                        return this.provider.call(t.toString(), e, r)
                    }
                }
                b.version = w, b.utils = i, b.Address = n, b.boc = o, b.HttpProvider = a, b.Contract = h, b.Wallets = u, b.LockupWallets = l, b.SubscriptionContract = m, b.BlockSubscription = d, b.InMemoryBlockStorage = p, b.ledger = {
                    TransportWebUSB: g,
                    TransportWebHID: v,
                    BluetoothTransport: y,
                    AppTon: s
                }, b.token = {
                    nft: c,
                    ft: f,
                    jetton: f
                }, t.exports = b
            }, (t, e, r) => {
                const {
                    BN: i,
                    nacl: n,
                    sha256: o,
                    fromNano: s,
                    toNano: a,
                    bytesToHex: h,
                    hexToBytes: u,
                    stringToBytes: l,
                    crc32c: c,
                    crc16: f,
                    concatBytes: d,
                    bytesToBase64: p,
                    base64ToBytes: m,
                    base64toString: g,
                    stringToBase64: v,
                    compareBytes: y,
                    readNBytesUIntFromArray: w
                } = r(2), b = r(18).default;
                t.exports = {
                    Address: b,
                    BN: i,
                    nacl: n,
                    sha256: o,
                    fromNano: s,
                    toNano: a,
                    bytesToHex: h,
                    hexToBytes: u,
                    stringToBytes: l,
                    crc32c: c,
                    crc16: f,
                    concatBytes: d,
                    bytesToBase64: p,
                    base64ToBytes: m,
                    base64toString: g,
                    stringToBase64: v,
                    compareBytes: y,
                    readNBytesUIntFromArray: w,
                    parseTransferUrl: function(t) {
                        const e = "ton://transfer/";
                        if (!t.startsWith(e)) throw new Error("must starts with " + e);
                        const r = t.substring(e.length).split("?");
                        if (r.length > 2) throw new Error('multiple "?"');
                        const n = r[0];
                        if (!b.isValid(n)) throw new Error("invalid address format " + n);
                        const o = {
                                address: n
                            },
                            s = r[1];
                        if (s && s.length) {
                            const t = s.split("&").map((t => t.split("=")));
                            for (const e of t) {
                                if (2 !== e.length) throw new Error("invalid url pair");
                                const t = e[0],
                                    r = e[1];
                                if ("amount" === t) {
                                    if (o.amount) throw new Error("amount already set");
                                    if (new i(r).isNeg()) throw new Error("negative amount");
                                    o.amount = r
                                } else {
                                    if ("text" !== t) throw new Error("unknown url var " + t);
                                    if (o.text) throw new Error("text already set");
                                    o.text = decodeURIComponent(r)
                                }
                            }
                        }
                        return o
                    },
                    formatTransferUrl: function(t, e, r) {
                        let i = "ton://transfer/" + t;
                        const n = [];
                        return e && n.push("amount=" + e), r && n.push("text=" + encodeURIComponent(r)), 0 === n.length ? i : i + "?" + n.join("&")
                    }
                }
            }, (t, e, r) => {
                var i = r(9).Buffer;
                const n = r(3),
                    o = r(5),
                    s = r(7),
                    a = "undefined" != typeof self && self.crypto && self.crypto.subtle;
                let h = null;
                a || (h = r(16));
                const u = [],
                    l = {};
                for (let t = 0; t <= 255; t++) {
                    let e = t.toString(16);
                    e.length < 2 && (e = "0" + e), u.push(e), l[e] = t
                }
                const c = (() => {
                    const t = [],
                        e = "A".charCodeAt(0),
                        r = "a".charCodeAt(0),
                        i = "0".charCodeAt(0);
                    for (let r = 0; r < 26; ++r) t.push(String.fromCharCode(e + r));
                    for (let e = 0; e < 26; ++e) t.push(String.fromCharCode(r + e));
                    for (let e = 0; e < 10; ++e) t.push(String.fromCharCode(i + e));
                    return t.push("+"), t.push("/"), t
                })();

                function f(t) {
                    return "undefined" == typeof self ? i.from(t, "base64").toString("binary") : atob(t)
                }
                t.exports = {
                    BN: n,
                    nacl: o,
                    sha256: function(t) {
                        return a ? crypto.subtle.digest("SHA-256", t) : h.subtle.digest({
                            name: "SHA-256"
                        }, t)
                    },
                    fromNano: function(t) {
                        if (!n.isBN(t) && "string" != typeof t) throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
                        return s.fromWei(t, "gwei")
                    },
                    toNano: function(t) {
                        if (!n.isBN(t) && "string" != typeof t) throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
                        return s.toWei(t, "gwei")
                    },
                    bytesToHex: function(t) {
                        const e = [];
                        for (let r = 0; r < t.byteLength; r++) e.push(u[t[r]]);
                        return e.join("")
                    },
                    hexToBytes: function(t) {
                        const e = (t = t.toLowerCase()).length;
                        if (e % 2 != 0) throw "hex string must have length a multiple of 2";
                        const r = e / 2,
                            i = new Uint8Array(r);
                        for (let e = 0; e < r; e++) {
                            const r = 2 * e,
                                n = t.substring(r, r + 2);
                            if (!l.hasOwnProperty(n)) throw new Error("invalid hex character " + n);
                            i[e] = l[n]
                        }
                        return i
                    },
                    stringToBytes: function(t, e = 1) {
                        let r, i;
                        1 === e && (r = new ArrayBuffer(t.length), i = new Uint8Array(r)), 2 === e && (r = new ArrayBuffer(2 * t.length), i = new Uint16Array(r)), 4 === e && (r = new ArrayBuffer(4 * t.length), i = new Uint32Array(r));
                        for (let e = 0, r = t.length; e < r; e++) i[e] = t.charCodeAt(e);
                        return new Uint8Array(i.buffer)
                    },
                    crc32c: function(t) {
                        const e = function(t, e) {
                                const r = 2197175160;
                                t ^= 4294967295;
                                for (let i = 0; i < e.length; i++) t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t ^= e[i]) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1) ? t >>> 1 ^ r : t >>> 1;
                                return 4294967295 ^ t
                            }(0, t),
                            r = new ArrayBuffer(4);
                        return new DataView(r).setUint32(0, e, !1), new Uint8Array(r).reverse()
                    },
                    crc16: function(t) {
                        let e = 0;
                        const r = new Uint8Array(t.length + 2);
                        r.set(t);
                        for (let t of r) {
                            let r = 128;
                            for (; r > 0;) e <<= 1, t & r && (e += 1), r >>= 1, e > 65535 && (e &= 65535, e ^= 4129)
                        }
                        return new Uint8Array([Math.floor(e / 256), e % 256])
                    },
                    concatBytes: function(t, e) {
                        const r = new Uint8Array(t.length + e.length);
                        return r.set(t), r.set(e, t.length), r
                    },
                    bytesToBase64: function(t) {
                        let e, r = "";
                        const i = t.length;
                        for (e = 2; e < i; e += 3) r += c[t[e - 2] >> 2], r += c[(3 & t[e - 2]) << 4 | t[e - 1] >> 4], r += c[(15 & t[e - 1]) << 2 | t[e] >> 6], r += c[63 & t[e]];
                        return e === i + 1 && (r += c[t[e - 2] >> 2], r += c[(3 & t[e - 2]) << 4], r += "=="), e === i && (r += c[t[e - 2] >> 2], r += c[(3 & t[e - 2]) << 4 | t[e - 1] >> 4], r += c[(15 & t[e - 1]) << 2], r += "="), r
                    },
                    base64ToBytes: function(t) {
                        const e = f(t),
                            r = e.length,
                            i = new Uint8Array(r);
                        for (let t = 0; t < r; t++) i[t] = e.charCodeAt(t);
                        return i
                    },
                    base64toString: f,
                    stringToBase64: function(t) {
                        return "undefined" == typeof self ? i.from(t, "binary").toString("base64") : btoa(t)
                    },
                    compareBytes: function(t, e) {
                        return t.toString() === e.toString()
                    },
                    readNBytesUIntFromArray: function(t, e) {
                        let r = 0;
                        for (let i = 0; i < t; i++) r *= 256, r += e[i];
                        return r
                    }
                }
            }, function(t, e, r) {
                ! function(t, e) {
                    "use strict";

                    function i(t, e) {
                        if (!t) throw new Error(e || "Assertion failed")
                    }

                    function n(t, e) {
                        t.super_ = e;
                        var r = function() {};
                        r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                    }

                    function o(t, e, r) {
                        if (o.isBN(t)) return t;
                        this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
                    }
                    var s;
                    "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                    try {
                        s = r(4).Buffer
                    } catch (t) {}

                    function a(t, e, r) {
                        for (var n = 0, o = Math.min(t.length, r), s = 0, a = e; a < o; a++) {
                            var h, u = t.charCodeAt(a) - 48;
                            n <<= 4, n |= h = u >= 49 && u <= 54 ? u - 49 + 10 : u >= 17 && u <= 22 ? u - 17 + 10 : u, s |= h
                        }
                        return i(!(240 & s), "Invalid character in " + t), n
                    }

                    function h(t, e, r, n) {
                        for (var o = 0, s = 0, a = Math.min(t.length, r), h = e; h < a; h++) {
                            var u = t.charCodeAt(h) - 48;
                            o *= n, s = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u, i(u >= 0 && s < n, "Invalid character"), o += s
                        }
                        return o
                    }

                    function u(t, e) {
                        t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
                    }

                    function l() {
                        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                    }
                    o.isBN = function(t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function(t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function(t, e) {
                        return t.cmp(e) < 0 ? t : e
                    }, o.prototype._init = function(t, e, r) {
                        if ("number" == typeof t) return this._initNumber(t, e, r);
                        if ("object" == typeof t) return this._initArray(t, e, r);
                        "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
                        var n = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this._strip(), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initNumber = function(t, e, r) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (i(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initArray = function(t, e, r) {
                        if (i("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                        for (var n = 0; n < this.length; n++) this.words[n] = 0;
                        var o, s, a = 0;
                        if ("be" === r)
                            for (n = t.length - 1, o = 0; n >= 0; n -= 3) s = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        else if ("le" === r)
                            for (n = 0, o = 0; n < t.length; n += 3) s = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        return this._strip()
                    }, o.prototype._parseHex = function(t, e) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                        for (var r = 0; r < this.length; r++) this.words[r] = 0;
                        var i, n, o = 0;
                        for (r = t.length - 6, i = 0; r >= e; r -= 6) n = a(t, r, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, i++);
                        r + 6 !== e && (n = a(t, e, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303), this._strip()
                    }, o.prototype._parseBase = function(t, e, r) {
                        this.words = [0], this.length = 1;
                        for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
                        i--, n = n / e | 0;
                        for (var o = t.length - r, s = o % i, a = Math.min(o, o - s) + r, u = 0, l = r; l < a; l += i) u = h(t, l, l + i, e), this.imuln(n), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                        if (0 !== s) {
                            var c = 1;
                            for (u = h(t, l, t.length, e), l = 0; l < s; l++) c *= e;
                            this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                        }
                    }, o.prototype.copy = function(t) {
                        t.words = new Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype._move = function(t) {
                        u(t, this)
                    }, o.prototype.clone = function() {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function(t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype._strip = function() {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function() {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, "undefined" != typeof Symbol && "function" == typeof Symbol.for ? o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l : o.prototype.inspect = l;
                    var c = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                        f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        d = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                    function p(t, e, r) {
                        r.negative = e.negative ^ t.negative;
                        var i = t.length + e.length | 0;
                        r.length = i, i = i - 1 | 0;
                        var n = 0 | t.words[0],
                            o = 0 | e.words[0],
                            s = n * o,
                            a = 67108863 & s,
                            h = s / 67108864 | 0;
                        r.words[0] = a;
                        for (var u = 1; u < i; u++) {
                            for (var l = h >>> 26, c = 67108863 & h, f = Math.min(u, e.length - 1), d = Math.max(0, u - t.length + 1); d <= f; d++) {
                                var p = u - d | 0;
                                l += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + c) / 67108864 | 0, c = 67108863 & s
                            }
                            r.words[u] = 0 | c, h = 0 | l
                        }
                        return 0 !== h ? r.words[u] = 0 | h : r.length--, r._strip()
                    }
                    o.prototype.toString = function(t, e) {
                        var r;
                        if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                            r = "";
                            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                                var a = this.words[s],
                                    h = (16777215 & (a << n | o)).toString(16);
                                r = 0 != (o = a >>> 24 - n & 16777215) || s !== this.length - 1 ? c[6 - h.length] + h + r : h + r, (n += 2) >= 26 && (n -= 26, s--)
                            }
                            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        if (t === (0 | t) && t >= 2 && t <= 36) {
                            var u = f[t],
                                l = d[t];
                            r = "";
                            var p = this.clone();
                            for (p.negative = 0; !p.isZero();) {
                                var m = p.modrn(l).toString(t);
                                r = (p = p.idivn(l)).isZero() ? m + r : c[u - m.length] + m + r
                            }
                            for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        i(!1, "Base should be between 2 and 36")
                    }, o.prototype.toNumber = function() {
                        var t = this.words[0];
                        return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                    }, o.prototype.toJSON = function() {
                        return this.toString(16, 2)
                    }, s && (o.prototype.toBuffer = function(t, e) {
                        return this.toArrayLike(s, t, e)
                    }), o.prototype.toArray = function(t, e) {
                        return this.toArrayLike(Array, t, e)
                    }, o.prototype.toArrayLike = function(t, e, r) {
                        this._strip();
                        var n = this.byteLength(),
                            o = r || Math.max(1, n);
                        i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0");
                        var s = function(t, e) {
                            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
                        }(t, o);
                        return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, n), s
                    }, o.prototype._toArrayLikeLE = function(t, e) {
                        for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
                            var s = this.words[n] << o | i;
                            t[r++] = 255 & s, r < t.length && (t[r++] = s >> 8 & 255), r < t.length && (t[r++] = s >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                        }
                        if (r < t.length)
                            for (t[r++] = i; r < t.length;) t[r++] = 0
                    }, o.prototype._toArrayLikeBE = function(t, e) {
                        for (var r = t.length - 1, i = 0, n = 0, o = 0; n < this.length; n++) {
                            var s = this.words[n] << o | i;
                            t[r--] = 255 & s, r >= 0 && (t[r--] = s >> 8 & 255), r >= 0 && (t[r--] = s >> 16 & 255), 6 === o ? (r >= 0 && (t[r--] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                        }
                        if (r >= 0)
                            for (t[r--] = i; r >= 0;) t[r--] = 0
                    }, Math.clz32 ? o.prototype._countBits = function(t) {
                        return 32 - Math.clz32(t)
                    } : o.prototype._countBits = function(t) {
                        var e = t,
                            r = 0;
                        return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
                    }, o.prototype._zeroBits = function(t) {
                        if (0 === t) return 26;
                        var e = t,
                            r = 0;
                        return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
                    }, o.prototype.bitLength = function() {
                        var t = this.words[this.length - 1],
                            e = this._countBits(t);
                        return 26 * (this.length - 1) + e
                    }, o.prototype.zeroBits = function() {
                        if (this.isZero()) return 0;
                        for (var t = 0, e = 0; e < this.length; e++) {
                            var r = this._zeroBits(this.words[e]);
                            if (t += r, 26 !== r) break
                        }
                        return t
                    }, o.prototype.byteLength = function() {
                        return Math.ceil(this.bitLength() / 8)
                    }, o.prototype.toTwos = function(t) {
                        return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                    }, o.prototype.fromTwos = function(t) {
                        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                    }, o.prototype.isNeg = function() {
                        return 0 !== this.negative
                    }, o.prototype.neg = function() {
                        return this.clone().ineg()
                    }, o.prototype.ineg = function() {
                        return this.isZero() || (this.negative ^= 1), this
                    }, o.prototype.iuor = function(t) {
                        for (; this.length < t.length;) this.words[this.length++] = 0;
                        for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                        return this._strip()
                    }, o.prototype.ior = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuor(t)
                    }, o.prototype.or = function(t) {
                        return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                    }, o.prototype.uor = function(t) {
                        return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                    }, o.prototype.iuand = function(t) {
                        var e;
                        e = this.length > t.length ? t : this;
                        for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                        return this.length = e.length, this._strip()
                    }, o.prototype.iand = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuand(t)
                    }, o.prototype.and = function(t) {
                        return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                    }, o.prototype.uand = function(t) {
                        return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                    }, o.prototype.iuxor = function(t) {
                        var e, r;
                        this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                        for (var i = 0; i < r.length; i++) this.words[i] = e.words[i] ^ r.words[i];
                        if (this !== e)
                            for (; i < e.length; i++) this.words[i] = e.words[i];
                        return this.length = e.length, this._strip()
                    }, o.prototype.ixor = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuxor(t)
                    }, o.prototype.xor = function(t) {
                        return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                    }, o.prototype.uxor = function(t) {
                        return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                    }, o.prototype.inotn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = 0 | Math.ceil(t / 26),
                            r = t % 26;
                        this._expand(e), r > 0 && e--;
                        for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                        return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this._strip()
                    }, o.prototype.notn = function(t) {
                        return this.clone().inotn(t)
                    }, o.prototype.setn = function(t, e) {
                        i("number" == typeof t && t >= 0);
                        var r = t / 26 | 0,
                            n = t % 26;
                        return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << n : this.words[r] & ~(1 << n), this._strip()
                    }, o.prototype.iadd = function(t) {
                        var e, r, i;
                        if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                        if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                        this.length > t.length ? (r = this, i = t) : (r = t, i = this);
                        for (var n = 0, o = 0; o < i.length; o++) e = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        for (; 0 !== n && o < r.length; o++) e = (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                        else if (r !== this)
                            for (; o < r.length; o++) this.words[o] = r.words[o];
                        return this
                    }, o.prototype.add = function(t) {
                        var e;
                        return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                    }, o.prototype.isub = function(t) {
                        if (0 !== t.negative) {
                            t.negative = 0;
                            var e = this.iadd(t);
                            return t.negative = 1, e._normSign()
                        }
                        if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                        var r, i, n = this.cmp(t);
                        if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                        n > 0 ? (r = this, i = t) : (r = t, i = this);
                        for (var o = 0, s = 0; s < i.length; s++) o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        if (0 === o && s < r.length && r !== this)
                            for (; s < r.length; s++) this.words[s] = r.words[s];
                        return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this._strip()
                    }, o.prototype.sub = function(t) {
                        return this.clone().isub(t)
                    };
                    var m = function(t, e, r) {
                        var i, n, o, s = t.words,
                            a = e.words,
                            h = r.words,
                            u = 0,
                            l = 0 | s[0],
                            c = 8191 & l,
                            f = l >>> 13,
                            d = 0 | s[1],
                            p = 8191 & d,
                            m = d >>> 13,
                            g = 0 | s[2],
                            v = 8191 & g,
                            y = g >>> 13,
                            w = 0 | s[3],
                            b = 8191 & w,
                            M = w >>> 13,
                            E = 0 | s[4],
                            A = 8191 & E,
                            C = E >>> 13,
                            B = 0 | s[5],
                            F = 8191 & B,
                            _ = B >>> 13,
                            S = 0 | s[6],
                            D = 8191 & S,
                            x = S >>> 13,
                            I = 0 | s[7],
                            T = 8191 & I,
                            R = I >>> 13,
                            N = 0 | s[8],
                            O = 8191 & N,
                            U = N >>> 13,
                            k = 0 | s[9],
                            L = 8191 & k,
                            P = k >>> 13,
                            j = 0 | a[0],
                            $ = 8191 & j,
                            q = j >>> 13,
                            K = 0 | a[1],
                            H = 8191 & K,
                            G = K >>> 13,
                            z = 0 | a[2],
                            V = 8191 & z,
                            W = z >>> 13,
                            Z = 0 | a[3],
                            Y = 8191 & Z,
                            X = Z >>> 13,
                            J = 0 | a[4],
                            Q = 8191 & J,
                            tt = J >>> 13,
                            et = 0 | a[5],
                            rt = 8191 & et,
                            it = et >>> 13,
                            nt = 0 | a[6],
                            ot = 8191 & nt,
                            st = nt >>> 13,
                            at = 0 | a[7],
                            ht = 8191 & at,
                            ut = at >>> 13,
                            lt = 0 | a[8],
                            ct = 8191 & lt,
                            ft = lt >>> 13,
                            dt = 0 | a[9],
                            pt = 8191 & dt,
                            mt = dt >>> 13;
                        r.negative = t.negative ^ e.negative, r.length = 19;
                        var gt = (u + (i = Math.imul(c, $)) | 0) + ((8191 & (n = (n = Math.imul(c, q)) + Math.imul(f, $) | 0)) << 13) | 0;
                        u = ((o = Math.imul(f, q)) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, i = Math.imul(p, $), n = (n = Math.imul(p, q)) + Math.imul(m, $) | 0, o = Math.imul(m, q);
                        var vt = (u + (i = i + Math.imul(c, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, G) | 0) + Math.imul(f, H) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, G) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, i = Math.imul(v, $), n = (n = Math.imul(v, q)) + Math.imul(y, $) | 0, o = Math.imul(y, q), i = i + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, G) | 0) + Math.imul(m, H) | 0, o = o + Math.imul(m, G) | 0;
                        var yt = (u + (i = i + Math.imul(c, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, W) | 0) + Math.imul(f, V) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, W) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, i = Math.imul(b, $), n = (n = Math.imul(b, q)) + Math.imul(M, $) | 0, o = Math.imul(M, q), i = i + Math.imul(v, H) | 0, n = (n = n + Math.imul(v, G) | 0) + Math.imul(y, H) | 0, o = o + Math.imul(y, G) | 0, i = i + Math.imul(p, V) | 0, n = (n = n + Math.imul(p, W) | 0) + Math.imul(m, V) | 0, o = o + Math.imul(m, W) | 0;
                        var wt = (u + (i = i + Math.imul(c, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, X) | 0) + Math.imul(f, Y) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, X) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, i = Math.imul(A, $), n = (n = Math.imul(A, q)) + Math.imul(C, $) | 0, o = Math.imul(C, q), i = i + Math.imul(b, H) | 0, n = (n = n + Math.imul(b, G) | 0) + Math.imul(M, H) | 0, o = o + Math.imul(M, G) | 0, i = i + Math.imul(v, V) | 0, n = (n = n + Math.imul(v, W) | 0) + Math.imul(y, V) | 0, o = o + Math.imul(y, W) | 0, i = i + Math.imul(p, Y) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(m, Y) | 0, o = o + Math.imul(m, X) | 0;
                        var bt = (u + (i = i + Math.imul(c, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, tt) | 0) + Math.imul(f, Q) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, tt) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, i = Math.imul(F, $), n = (n = Math.imul(F, q)) + Math.imul(_, $) | 0, o = Math.imul(_, q), i = i + Math.imul(A, H) | 0, n = (n = n + Math.imul(A, G) | 0) + Math.imul(C, H) | 0, o = o + Math.imul(C, G) | 0, i = i + Math.imul(b, V) | 0, n = (n = n + Math.imul(b, W) | 0) + Math.imul(M, V) | 0, o = o + Math.imul(M, W) | 0, i = i + Math.imul(v, Y) | 0, n = (n = n + Math.imul(v, X) | 0) + Math.imul(y, Y) | 0, o = o + Math.imul(y, X) | 0, i = i + Math.imul(p, Q) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
                        var Mt = (u + (i = i + Math.imul(c, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, it) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, it) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, i = Math.imul(D, $), n = (n = Math.imul(D, q)) + Math.imul(x, $) | 0, o = Math.imul(x, q), i = i + Math.imul(F, H) | 0, n = (n = n + Math.imul(F, G) | 0) + Math.imul(_, H) | 0, o = o + Math.imul(_, G) | 0, i = i + Math.imul(A, V) | 0, n = (n = n + Math.imul(A, W) | 0) + Math.imul(C, V) | 0, o = o + Math.imul(C, W) | 0, i = i + Math.imul(b, Y) | 0, n = (n = n + Math.imul(b, X) | 0) + Math.imul(M, Y) | 0, o = o + Math.imul(M, X) | 0, i = i + Math.imul(v, Q) | 0, n = (n = n + Math.imul(v, tt) | 0) + Math.imul(y, Q) | 0, o = o + Math.imul(y, tt) | 0, i = i + Math.imul(p, rt) | 0, n = (n = n + Math.imul(p, it) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, it) | 0;
                        var Et = (u + (i = i + Math.imul(c, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, st) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, i = Math.imul(T, $), n = (n = Math.imul(T, q)) + Math.imul(R, $) | 0, o = Math.imul(R, q), i = i + Math.imul(D, H) | 0, n = (n = n + Math.imul(D, G) | 0) + Math.imul(x, H) | 0, o = o + Math.imul(x, G) | 0, i = i + Math.imul(F, V) | 0, n = (n = n + Math.imul(F, W) | 0) + Math.imul(_, V) | 0, o = o + Math.imul(_, W) | 0, i = i + Math.imul(A, Y) | 0, n = (n = n + Math.imul(A, X) | 0) + Math.imul(C, Y) | 0, o = o + Math.imul(C, X) | 0, i = i + Math.imul(b, Q) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(M, Q) | 0, o = o + Math.imul(M, tt) | 0, i = i + Math.imul(v, rt) | 0, n = (n = n + Math.imul(v, it) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, it) | 0, i = i + Math.imul(p, ot) | 0, n = (n = n + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                        var At = (u + (i = i + Math.imul(c, ht) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ut) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ut) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, i = Math.imul(O, $), n = (n = Math.imul(O, q)) + Math.imul(U, $) | 0, o = Math.imul(U, q), i = i + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, G) | 0) + Math.imul(R, H) | 0, o = o + Math.imul(R, G) | 0, i = i + Math.imul(D, V) | 0, n = (n = n + Math.imul(D, W) | 0) + Math.imul(x, V) | 0, o = o + Math.imul(x, W) | 0, i = i + Math.imul(F, Y) | 0, n = (n = n + Math.imul(F, X) | 0) + Math.imul(_, Y) | 0, o = o + Math.imul(_, X) | 0, i = i + Math.imul(A, Q) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(C, Q) | 0, o = o + Math.imul(C, tt) | 0, i = i + Math.imul(b, rt) | 0, n = (n = n + Math.imul(b, it) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, it) | 0, i = i + Math.imul(v, ot) | 0, n = (n = n + Math.imul(v, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, i = i + Math.imul(p, ht) | 0, n = (n = n + Math.imul(p, ut) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, ut) | 0;
                        var Ct = (u + (i = i + Math.imul(c, ct) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ft) | 0) + Math.imul(f, ct) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ft) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, i = Math.imul(L, $), n = (n = Math.imul(L, q)) + Math.imul(P, $) | 0, o = Math.imul(P, q), i = i + Math.imul(O, H) | 0, n = (n = n + Math.imul(O, G) | 0) + Math.imul(U, H) | 0, o = o + Math.imul(U, G) | 0, i = i + Math.imul(T, V) | 0, n = (n = n + Math.imul(T, W) | 0) + Math.imul(R, V) | 0, o = o + Math.imul(R, W) | 0, i = i + Math.imul(D, Y) | 0, n = (n = n + Math.imul(D, X) | 0) + Math.imul(x, Y) | 0, o = o + Math.imul(x, X) | 0, i = i + Math.imul(F, Q) | 0, n = (n = n + Math.imul(F, tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(A, rt) | 0, n = (n = n + Math.imul(A, it) | 0) + Math.imul(C, rt) | 0, o = o + Math.imul(C, it) | 0, i = i + Math.imul(b, ot) | 0, n = (n = n + Math.imul(b, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, i = i + Math.imul(v, ht) | 0, n = (n = n + Math.imul(v, ut) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, ut) | 0, i = i + Math.imul(p, ct) | 0, n = (n = n + Math.imul(p, ft) | 0) + Math.imul(m, ct) | 0, o = o + Math.imul(m, ft) | 0;
                        var Bt = (u + (i = i + Math.imul(c, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, mt) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, i = Math.imul(L, H), n = (n = Math.imul(L, G)) + Math.imul(P, H) | 0, o = Math.imul(P, G), i = i + Math.imul(O, V) | 0, n = (n = n + Math.imul(O, W) | 0) + Math.imul(U, V) | 0, o = o + Math.imul(U, W) | 0, i = i + Math.imul(T, Y) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(R, Y) | 0, o = o + Math.imul(R, X) | 0, i = i + Math.imul(D, Q) | 0, n = (n = n + Math.imul(D, tt) | 0) + Math.imul(x, Q) | 0, o = o + Math.imul(x, tt) | 0, i = i + Math.imul(F, rt) | 0, n = (n = n + Math.imul(F, it) | 0) + Math.imul(_, rt) | 0, o = o + Math.imul(_, it) | 0, i = i + Math.imul(A, ot) | 0, n = (n = n + Math.imul(A, st) | 0) + Math.imul(C, ot) | 0, o = o + Math.imul(C, st) | 0, i = i + Math.imul(b, ht) | 0, n = (n = n + Math.imul(b, ut) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, ut) | 0, i = i + Math.imul(v, ct) | 0, n = (n = n + Math.imul(v, ft) | 0) + Math.imul(y, ct) | 0, o = o + Math.imul(y, ft) | 0;
                        var Ft = (u + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(m, mt) | 0) + (n >>> 13) | 0) + (Ft >>> 26) | 0, Ft &= 67108863, i = Math.imul(L, V), n = (n = Math.imul(L, W)) + Math.imul(P, V) | 0, o = Math.imul(P, W), i = i + Math.imul(O, Y) | 0, n = (n = n + Math.imul(O, X) | 0) + Math.imul(U, Y) | 0, o = o + Math.imul(U, X) | 0, i = i + Math.imul(T, Q) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(R, Q) | 0, o = o + Math.imul(R, tt) | 0, i = i + Math.imul(D, rt) | 0, n = (n = n + Math.imul(D, it) | 0) + Math.imul(x, rt) | 0, o = o + Math.imul(x, it) | 0, i = i + Math.imul(F, ot) | 0, n = (n = n + Math.imul(F, st) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, st) | 0, i = i + Math.imul(A, ht) | 0, n = (n = n + Math.imul(A, ut) | 0) + Math.imul(C, ht) | 0, o = o + Math.imul(C, ut) | 0, i = i + Math.imul(b, ct) | 0, n = (n = n + Math.imul(b, ft) | 0) + Math.imul(M, ct) | 0, o = o + Math.imul(M, ft) | 0;
                        var _t = (u + (i = i + Math.imul(v, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(v, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(y, mt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, i = Math.imul(L, Y), n = (n = Math.imul(L, X)) + Math.imul(P, Y) | 0, o = Math.imul(P, X), i = i + Math.imul(O, Q) | 0, n = (n = n + Math.imul(O, tt) | 0) + Math.imul(U, Q) | 0, o = o + Math.imul(U, tt) | 0, i = i + Math.imul(T, rt) | 0, n = (n = n + Math.imul(T, it) | 0) + Math.imul(R, rt) | 0, o = o + Math.imul(R, it) | 0, i = i + Math.imul(D, ot) | 0, n = (n = n + Math.imul(D, st) | 0) + Math.imul(x, ot) | 0, o = o + Math.imul(x, st) | 0, i = i + Math.imul(F, ht) | 0, n = (n = n + Math.imul(F, ut) | 0) + Math.imul(_, ht) | 0, o = o + Math.imul(_, ut) | 0, i = i + Math.imul(A, ct) | 0, n = (n = n + Math.imul(A, ft) | 0) + Math.imul(C, ct) | 0, o = o + Math.imul(C, ft) | 0;
                        var St = (u + (i = i + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(M, mt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, i = Math.imul(L, Q), n = (n = Math.imul(L, tt)) + Math.imul(P, Q) | 0, o = Math.imul(P, tt), i = i + Math.imul(O, rt) | 0, n = (n = n + Math.imul(O, it) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, it) | 0, i = i + Math.imul(T, ot) | 0, n = (n = n + Math.imul(T, st) | 0) + Math.imul(R, ot) | 0, o = o + Math.imul(R, st) | 0, i = i + Math.imul(D, ht) | 0, n = (n = n + Math.imul(D, ut) | 0) + Math.imul(x, ht) | 0, o = o + Math.imul(x, ut) | 0, i = i + Math.imul(F, ct) | 0, n = (n = n + Math.imul(F, ft) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, ft) | 0;
                        var Dt = (u + (i = i + Math.imul(A, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, mt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(C, mt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, i = Math.imul(L, rt), n = (n = Math.imul(L, it)) + Math.imul(P, rt) | 0, o = Math.imul(P, it), i = i + Math.imul(O, ot) | 0, n = (n = n + Math.imul(O, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, i = i + Math.imul(T, ht) | 0, n = (n = n + Math.imul(T, ut) | 0) + Math.imul(R, ht) | 0, o = o + Math.imul(R, ut) | 0, i = i + Math.imul(D, ct) | 0, n = (n = n + Math.imul(D, ft) | 0) + Math.imul(x, ct) | 0, o = o + Math.imul(x, ft) | 0;
                        var xt = (u + (i = i + Math.imul(F, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(F, mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(_, mt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, i = Math.imul(L, ot), n = (n = Math.imul(L, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), i = i + Math.imul(O, ht) | 0, n = (n = n + Math.imul(O, ut) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, ut) | 0, i = i + Math.imul(T, ct) | 0, n = (n = n + Math.imul(T, ft) | 0) + Math.imul(R, ct) | 0, o = o + Math.imul(R, ft) | 0;
                        var It = (u + (i = i + Math.imul(D, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(D, mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(x, mt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, i = Math.imul(L, ht), n = (n = Math.imul(L, ut)) + Math.imul(P, ht) | 0, o = Math.imul(P, ut), i = i + Math.imul(O, ct) | 0, n = (n = n + Math.imul(O, ft) | 0) + Math.imul(U, ct) | 0, o = o + Math.imul(U, ft) | 0;
                        var Tt = (u + (i = i + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, mt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(R, mt) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, i = Math.imul(L, ct), n = (n = Math.imul(L, ft)) + Math.imul(P, ct) | 0, o = Math.imul(P, ft);
                        var Rt = (u + (i = i + Math.imul(O, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(U, mt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863;
                        var Nt = (u + (i = Math.imul(L, pt)) | 0) + ((8191 & (n = (n = Math.imul(L, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                        return u = ((o = Math.imul(P, mt)) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, h[0] = gt, h[1] = vt, h[2] = yt, h[3] = wt, h[4] = bt, h[5] = Mt, h[6] = Et, h[7] = At, h[8] = Ct, h[9] = Bt, h[10] = Ft, h[11] = _t, h[12] = St, h[13] = Dt, h[14] = xt, h[15] = It, h[16] = Tt, h[17] = Rt, h[18] = Nt, 0 !== u && (h[19] = u, r.length++), r
                    };

                    function g(t, e, r) {
                        r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                        for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                            var s = n;
                            n = 0;
                            for (var a = 67108863 & i, h = Math.min(o, e.length - 1), u = Math.max(0, o - t.length + 1); u <= h; u++) {
                                var l = o - u,
                                    c = (0 | t.words[l]) * (0 | e.words[u]),
                                    f = 67108863 & c;
                                a = 67108863 & (f = f + a | 0), n += (s = (s = s + (c / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                            }
                            r.words[o] = a, i = s, s = n
                        }
                        return 0 !== i ? r.words[o] = i : r.length--, r._strip()
                    }

                    function v(t, e, r) {
                        return g(t, e, r)
                    }

                    function y(t, e) {
                        this.x = t, this.y = e
                    }
                    Math.imul || (m = p), o.prototype.mulTo = function(t, e) {
                        var r = this.length + t.length;
                        return 10 === this.length && 10 === t.length ? m(this, t, e) : r < 63 ? p(this, t, e) : r < 1024 ? g(this, t, e) : v(this, t, e)
                    }, y.prototype.makeRBT = function(t) {
                        for (var e = new Array(t), r = o.prototype._countBits(t) - 1, i = 0; i < t; i++) e[i] = this.revBin(i, r, t);
                        return e
                    }, y.prototype.revBin = function(t, e, r) {
                        if (0 === t || t === r - 1) return t;
                        for (var i = 0, n = 0; n < e; n++) i |= (1 & t) << e - n - 1, t >>= 1;
                        return i
                    }, y.prototype.permute = function(t, e, r, i, n, o) {
                        for (var s = 0; s < o; s++) i[s] = e[t[s]], n[s] = r[t[s]]
                    }, y.prototype.transform = function(t, e, r, i, n, o) {
                        this.permute(o, t, e, r, i, n);
                        for (var s = 1; s < n; s <<= 1)
                            for (var a = s << 1, h = Math.cos(2 * Math.PI / a), u = Math.sin(2 * Math.PI / a), l = 0; l < n; l += a)
                                for (var c = h, f = u, d = 0; d < s; d++) {
                                    var p = r[l + d],
                                        m = i[l + d],
                                        g = r[l + d + s],
                                        v = i[l + d + s],
                                        y = c * g - f * v;
                                    v = c * v + f * g, g = y, r[l + d] = p + g, i[l + d] = m + v, r[l + d + s] = p - g, i[l + d + s] = m - v, d !== a && (y = h * c - u * f, f = h * f + u * c, c = y)
                                }
                    }, y.prototype.guessLen13b = function(t, e) {
                        var r = 1 | Math.max(e, t),
                            i = 1 & r,
                            n = 0;
                        for (r = r / 2 | 0; r; r >>>= 1) n++;
                        return 1 << n + 1 + i
                    }, y.prototype.conjugate = function(t, e, r) {
                        if (!(r <= 1))
                            for (var i = 0; i < r / 2; i++) {
                                var n = t[i];
                                t[i] = t[r - i - 1], t[r - i - 1] = n, n = e[i], e[i] = -e[r - i - 1], e[r - i - 1] = -n
                            }
                    }, y.prototype.normalize13b = function(t, e) {
                        for (var r = 0, i = 0; i < e / 2; i++) {
                            var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
                            t[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                        }
                        return t
                    }, y.prototype.convert13b = function(t, e, r, n) {
                        for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                        for (s = 2 * e; s < n; ++s) r[s] = 0;
                        i(0 === o), i(0 == (-8192 & o))
                    }, y.prototype.stub = function(t) {
                        for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                        return e
                    }, y.prototype.mulp = function(t, e, r) {
                        var i = 2 * this.guessLen13b(t.length, e.length),
                            n = this.makeRBT(i),
                            o = this.stub(i),
                            s = new Array(i),
                            a = new Array(i),
                            h = new Array(i),
                            u = new Array(i),
                            l = new Array(i),
                            c = new Array(i),
                            f = r.words;
                        f.length = i, this.convert13b(t.words, t.length, s, i), this.convert13b(e.words, e.length, u, i), this.transform(s, o, a, h, i, n), this.transform(u, o, l, c, i, n);
                        for (var d = 0; d < i; d++) {
                            var p = a[d] * l[d] - h[d] * c[d];
                            h[d] = a[d] * c[d] + h[d] * l[d], a[d] = p
                        }
                        return this.conjugate(a, h, i), this.transform(a, h, f, o, i, n), this.conjugate(f, o, i), this.normalize13b(f, i), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r._strip()
                    }, o.prototype.mul = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                    }, o.prototype.mulf = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), v(this, t, e)
                    }, o.prototype.imul = function(t) {
                        return this.clone().mulTo(t, this)
                    }, o.prototype.imuln = function(t) {
                        var e = t < 0;
                        e && (t = -t), i("number" == typeof t), i(t < 67108864);
                        for (var r = 0, n = 0; n < this.length; n++) {
                            var o = (0 | this.words[n]) * t,
                                s = (67108863 & o) + (67108863 & r);
                            r >>= 26, r += o / 67108864 | 0, r += s >>> 26, this.words[n] = 67108863 & s
                        }
                        return 0 !== r && (this.words[n] = r, this.length++), e ? this.ineg() : this
                    }, o.prototype.muln = function(t) {
                        return this.clone().imuln(t)
                    }, o.prototype.sqr = function() {
                        return this.mul(this)
                    }, o.prototype.isqr = function() {
                        return this.imul(this.clone())
                    }, o.prototype.pow = function(t) {
                        var e = function(t) {
                            for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                                var i = r / 26 | 0,
                                    n = r % 26;
                                e[r] = t.words[i] >>> n & 1
                            }
                            return e
                        }(t);
                        if (0 === e.length) return new o(1);
                        for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
                        if (++i < e.length)
                            for (var n = r.sqr(); i < e.length; i++, n = n.sqr()) 0 !== e[i] && (r = r.mul(n));
                        return r
                    }, o.prototype.iushln = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e, r = t % 26,
                            n = (t - r) / 26,
                            o = 67108863 >>> 26 - r << 26 - r;
                        if (0 !== r) {
                            var s = 0;
                            for (e = 0; e < this.length; e++) {
                                var a = this.words[e] & o,
                                    h = (0 | this.words[e]) - a << r;
                                this.words[e] = h | s, s = a >>> 26 - r
                            }
                            s && (this.words[e] = s, this.length++)
                        }
                        if (0 !== n) {
                            for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                            for (e = 0; e < n; e++) this.words[e] = 0;
                            this.length += n
                        }
                        return this._strip()
                    }, o.prototype.ishln = function(t) {
                        return i(0 === this.negative), this.iushln(t)
                    }, o.prototype.iushrn = function(t, e, r) {
                        var n;
                        i("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                        var o = t % 26,
                            s = Math.min((t - o) / 26, this.length),
                            a = 67108863 ^ 67108863 >>> o << o,
                            h = r;
                        if (n -= s, n = Math.max(0, n), h) {
                            for (var u = 0; u < s; u++) h.words[u] = this.words[u];
                            h.length = s
                        }
                        if (0 === s);
                        else if (this.length > s)
                            for (this.length -= s, u = 0; u < this.length; u++) this.words[u] = this.words[u + s];
                        else this.words[0] = 0, this.length = 1;
                        var l = 0;
                        for (u = this.length - 1; u >= 0 && (0 !== l || u >= n); u--) {
                            var c = 0 | this.words[u];
                            this.words[u] = l << 26 - o | c >>> o, l = c & a
                        }
                        return h && 0 !== l && (h.words[h.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip()
                    }, o.prototype.ishrn = function(t, e, r) {
                        return i(0 === this.negative), this.iushrn(t, e, r)
                    }, o.prototype.shln = function(t) {
                        return this.clone().ishln(t)
                    }, o.prototype.ushln = function(t) {
                        return this.clone().iushln(t)
                    }, o.prototype.shrn = function(t) {
                        return this.clone().ishrn(t)
                    }, o.prototype.ushrn = function(t) {
                        return this.clone().iushrn(t)
                    }, o.prototype.testn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        return !(this.length <= r || !(this.words[r] & n))
                    }, o.prototype.imaskn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26;
                        if (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                        if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                            var n = 67108863 ^ 67108863 >>> e << e;
                            this.words[this.length - 1] &= n
                        }
                        return this._strip()
                    }, o.prototype.maskn = function(t) {
                        return this.clone().imaskn(t)
                    }, o.prototype.iaddn = function(t) {
                        return i("number" == typeof t), i(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                    }, o.prototype._iaddn = function(t) {
                        this.words[0] += t;
                        for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                        return this.length = Math.max(this.length, e + 1), this
                    }, o.prototype.isubn = function(t) {
                        if (i("number" == typeof t), i(t < 67108864), t < 0) return this.iaddn(-t);
                        if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                        if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                        else
                            for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                        return this._strip()
                    }, o.prototype.addn = function(t) {
                        return this.clone().iaddn(t)
                    }, o.prototype.subn = function(t) {
                        return this.clone().isubn(t)
                    }, o.prototype.iabs = function() {
                        return this.negative = 0, this
                    }, o.prototype.abs = function() {
                        return this.clone().iabs()
                    }, o.prototype._ishlnsubmul = function(t, e, r) {
                        var n, o, s = t.length + r;
                        this._expand(s);
                        var a = 0;
                        for (n = 0; n < t.length; n++) {
                            o = (0 | this.words[n + r]) + a;
                            var h = (0 | t.words[n]) * e;
                            a = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[n + r] = 67108863 & o
                        }
                        for (; n < this.length - r; n++) a = (o = (0 | this.words[n + r]) + a) >> 26, this.words[n + r] = 67108863 & o;
                        if (0 === a) return this._strip();
                        for (i(-1 === a), a = 0, n = 0; n < this.length; n++) a = (o = -(0 | this.words[n]) + a) >> 26, this.words[n] = 67108863 & o;
                        return this.negative = 1, this._strip()
                    }, o.prototype._wordDiv = function(t, e) {
                        var r = (this.length, t.length),
                            i = this.clone(),
                            n = t,
                            s = 0 | n.words[n.length - 1];
                        0 != (r = 26 - this._countBits(s)) && (n = n.ushln(r), i.iushln(r), s = 0 | n.words[n.length - 1]);
                        var a, h = i.length - n.length;
                        if ("mod" !== e) {
                            (a = new o(null)).length = h + 1, a.words = new Array(a.length);
                            for (var u = 0; u < a.length; u++) a.words[u] = 0
                        }
                        var l = i.clone()._ishlnsubmul(n, 1, h);
                        0 === l.negative && (i = l, a && (a.words[h] = 1));
                        for (var c = h - 1; c >= 0; c--) {
                            var f = 67108864 * (0 | i.words[n.length + c]) + (0 | i.words[n.length + c - 1]);
                            for (f = Math.min(f / s | 0, 67108863), i._ishlnsubmul(n, f, c); 0 !== i.negative;) f--, i.negative = 0, i._ishlnsubmul(n, 1, c), i.isZero() || (i.negative ^= 1);
                            a && (a.words[c] = f)
                        }
                        return a && a._strip(), i._strip(), "div" !== e && 0 !== r && i.iushrn(r), {
                            div: a || null,
                            mod: i
                        }
                    }, o.prototype.divmod = function(t, e, r) {
                        return i(!t.isZero()), this.isZero() ? {
                            div: new o(0),
                            mod: new o(0)
                        } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e), "mod" !== e && (n = a.div.neg()), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                            div: n,
                            mod: s
                        }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e), "mod" !== e && (n = a.div.neg()), {
                            div: n,
                            mod: a.mod
                        }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                            div: a.div,
                            mod: s
                        }) : t.length > this.length || this.cmp(t) < 0 ? {
                            div: new o(0),
                            mod: this
                        } : 1 === t.length ? "div" === e ? {
                            div: this.divn(t.words[0]),
                            mod: null
                        } : "mod" === e ? {
                            div: null,
                            mod: new o(this.modrn(t.words[0]))
                        } : {
                            div: this.divn(t.words[0]),
                            mod: new o(this.modrn(t.words[0]))
                        } : this._wordDiv(t, e);
                        var n, s, a
                    }, o.prototype.div = function(t) {
                        return this.divmod(t, "div", !1).div
                    }, o.prototype.mod = function(t) {
                        return this.divmod(t, "mod", !1).mod
                    }, o.prototype.umod = function(t) {
                        return this.divmod(t, "mod", !0).mod
                    }, o.prototype.divRound = function(t) {
                        var e = this.divmod(t);
                        if (e.mod.isZero()) return e.div;
                        var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                            i = t.ushrn(1),
                            n = t.andln(1),
                            o = r.cmp(i);
                        return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                    }, o.prototype.modrn = function(t) {
                        var e = t < 0;
                        e && (t = -t), i(t <= 67108863);
                        for (var r = (1 << 26) % t, n = 0, o = this.length - 1; o >= 0; o--) n = (r * n + (0 | this.words[o])) % t;
                        return e ? -n : n
                    }, o.prototype.modn = function(t) {
                        return this.modrn(t)
                    }, o.prototype.idivn = function(t) {
                        var e = t < 0;
                        e && (t = -t), i(t <= 67108863);
                        for (var r = 0, n = this.length - 1; n >= 0; n--) {
                            var o = (0 | this.words[n]) + 67108864 * r;
                            this.words[n] = o / t | 0, r = o % t
                        }
                        return this._strip(), e ? this.ineg() : this
                    }, o.prototype.divn = function(t) {
                        return this.clone().idivn(t)
                    }, o.prototype.egcd = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n = new o(1), s = new o(0), a = new o(0), h = new o(1), u = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++u;
                        for (var l = r.clone(), c = e.clone(); !e.isZero();) {
                            for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                            if (f > 0)
                                for (e.iushrn(f); f-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(c)), n.iushrn(1), s.iushrn(1);
                            for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                            if (p > 0)
                                for (r.iushrn(p); p-- > 0;)(a.isOdd() || h.isOdd()) && (a.iadd(l), h.isub(c)), a.iushrn(1), h.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), n.isub(a), s.isub(h)) : (r.isub(e), a.isub(n), h.isub(s))
                        }
                        return {
                            a,
                            b: h,
                            gcd: r.iushln(u)
                        }
                    }, o.prototype._invmp = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n, s = new o(1), a = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                            for (var u = 0, l = 1; 0 == (e.words[0] & l) && u < 26; ++u, l <<= 1);
                            if (u > 0)
                                for (e.iushrn(u); u-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                            for (var c = 0, f = 1; 0 == (r.words[0] & f) && c < 26; ++c, f <<= 1);
                            if (c > 0)
                                for (r.iushrn(c); c-- > 0;) a.isOdd() && a.iadd(h), a.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), s.isub(a)) : (r.isub(e), a.isub(s))
                        }
                        return (n = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && n.iadd(t), n
                    }, o.prototype.gcd = function(t) {
                        if (this.isZero()) return t.abs();
                        if (t.isZero()) return this.abs();
                        var e = this.clone(),
                            r = t.clone();
                        e.negative = 0, r.negative = 0;
                        for (var i = 0; e.isEven() && r.isEven(); i++) e.iushrn(1), r.iushrn(1);
                        for (;;) {
                            for (; e.isEven();) e.iushrn(1);
                            for (; r.isEven();) r.iushrn(1);
                            var n = e.cmp(r);
                            if (n < 0) {
                                var o = e;
                                e = r, r = o
                            } else if (0 === n || 0 === r.cmpn(1)) break;
                            e.isub(r)
                        }
                        return r.iushln(i)
                    }, o.prototype.invm = function(t) {
                        return this.egcd(t).a.umod(t)
                    }, o.prototype.isEven = function() {
                        return 0 == (1 & this.words[0])
                    }, o.prototype.isOdd = function() {
                        return 1 == (1 & this.words[0])
                    }, o.prototype.andln = function(t) {
                        return this.words[0] & t
                    }, o.prototype.bincn = function(t) {
                        i("number" == typeof t);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                        for (var o = n, s = r; 0 !== o && s < this.length; s++) {
                            var a = 0 | this.words[s];
                            o = (a += o) >>> 26, a &= 67108863, this.words[s] = a
                        }
                        return 0 !== o && (this.words[s] = o, this.length++), this
                    }, o.prototype.isZero = function() {
                        return 1 === this.length && 0 === this.words[0]
                    }, o.prototype.cmpn = function(t) {
                        var e, r = t < 0;
                        if (0 !== this.negative && !r) return -1;
                        if (0 === this.negative && r) return 1;
                        if (this._strip(), this.length > 1) e = 1;
                        else {
                            r && (t = -t), i(t <= 67108863, "Number is too big");
                            var n = 0 | this.words[0];
                            e = n === t ? 0 : n < t ? -1 : 1
                        }
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.cmp = function(t) {
                        if (0 !== this.negative && 0 === t.negative) return -1;
                        if (0 === this.negative && 0 !== t.negative) return 1;
                        var e = this.ucmp(t);
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.ucmp = function(t) {
                        if (this.length > t.length) return 1;
                        if (this.length < t.length) return -1;
                        for (var e = 0, r = this.length - 1; r >= 0; r--) {
                            var i = 0 | this.words[r],
                                n = 0 | t.words[r];
                            if (i !== n) {
                                i < n ? e = -1 : i > n && (e = 1);
                                break
                            }
                        }
                        return e
                    }, o.prototype.gtn = function(t) {
                        return 1 === this.cmpn(t)
                    }, o.prototype.gt = function(t) {
                        return 1 === this.cmp(t)
                    }, o.prototype.gten = function(t) {
                        return this.cmpn(t) >= 0
                    }, o.prototype.gte = function(t) {
                        return this.cmp(t) >= 0
                    }, o.prototype.ltn = function(t) {
                        return -1 === this.cmpn(t)
                    }, o.prototype.lt = function(t) {
                        return -1 === this.cmp(t)
                    }, o.prototype.lten = function(t) {
                        return this.cmpn(t) <= 0
                    }, o.prototype.lte = function(t) {
                        return this.cmp(t) <= 0
                    }, o.prototype.eqn = function(t) {
                        return 0 === this.cmpn(t)
                    }, o.prototype.eq = function(t) {
                        return 0 === this.cmp(t)
                    }, o.red = function(t) {
                        return new B(t)
                    }, o.prototype.toRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                    }, o.prototype.fromRed = function() {
                        return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                    }, o.prototype._forceRed = function(t) {
                        return this.red = t, this
                    }, o.prototype.forceRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), this._forceRed(t)
                    }, o.prototype.redAdd = function(t) {
                        return i(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                    }, o.prototype.redIAdd = function(t) {
                        return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                    }, o.prototype.redSub = function(t) {
                        return i(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                    }, o.prototype.redISub = function(t) {
                        return i(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                    }, o.prototype.redShl = function(t) {
                        return i(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                    }, o.prototype.redMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                    }, o.prototype.redIMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                    }, o.prototype.redSqr = function() {
                        return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                    }, o.prototype.redISqr = function() {
                        return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                    }, o.prototype.redSqrt = function() {
                        return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                    }, o.prototype.redInvm = function() {
                        return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                    }, o.prototype.redNeg = function() {
                        return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                    }, o.prototype.redPow = function(t) {
                        return i(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                    };
                    var w = {
                        k256: null,
                        p224: null,
                        p192: null,
                        p25519: null
                    };

                    function b(t, e) {
                        this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                    }

                    function M() {
                        b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                    }

                    function E() {
                        b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                    }

                    function A() {
                        b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                    }

                    function C() {
                        b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                    }

                    function B(t) {
                        if ("string" == typeof t) {
                            var e = o._prime(t);
                            this.m = e.p, this.prime = e
                        } else i(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                    }

                    function F(t) {
                        B.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                    }
                    b.prototype._tmp = function() {
                        var t = new o(null);
                        return t.words = new Array(Math.ceil(this.n / 13)), t
                    }, b.prototype.ireduce = function(t) {
                        var e, r = t;
                        do {
                            this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                        } while (e > this.n);
                        var i = e < this.n ? -1 : r.ucmp(this.p);
                        return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : r._strip(), r
                    }, b.prototype.split = function(t, e) {
                        t.iushrn(this.n, 0, e)
                    }, b.prototype.imulK = function(t) {
                        return t.imul(this.k)
                    }, n(M, b), M.prototype.split = function(t, e) {
                        for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++) e.words[n] = t.words[n];
                        if (e.length = i, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                        var o = t.words[9];
                        for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
                            var s = 0 | t.words[n];
                            t.words[n - 10] = (s & r) << 4 | o >>> 22, o = s
                        }
                        o >>>= 22, t.words[n - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
                    }, M.prototype.imulK = function(t) {
                        t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 0 | t.words[r];
                            e += 977 * i, t.words[r] = 67108863 & e, e = 64 * i + (e / 67108864 | 0)
                        }
                        return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                    }, n(E, b), n(A, b), n(C, b), C.prototype.imulK = function(t) {
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 19 * (0 | t.words[r]) + e,
                                n = 67108863 & i;
                            i >>>= 26, t.words[r] = n, e = i
                        }
                        return 0 !== e && (t.words[t.length++] = e), t
                    }, o._prime = function(t) {
                        if (w[t]) return w[t];
                        var e;
                        if ("k256" === t) e = new M;
                        else if ("p224" === t) e = new E;
                        else if ("p192" === t) e = new A;
                        else {
                            if ("p25519" !== t) throw new Error("Unknown prime " + t);
                            e = new C
                        }
                        return w[t] = e, e
                    }, B.prototype._verify1 = function(t) {
                        i(0 === t.negative, "red works only with positives"), i(t.red, "red works only with red numbers")
                    }, B.prototype._verify2 = function(t, e) {
                        i(0 == (t.negative | e.negative), "red works only with positives"), i(t.red && t.red === e.red, "red works only with red numbers")
                    }, B.prototype.imod = function(t) {
                        return this.prime ? this.prime.ireduce(t)._forceRed(this) : (u(t, t.umod(this.m)._forceRed(this)), t)
                    }, B.prototype.neg = function(t) {
                        return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                    }, B.prototype.add = function(t, e) {
                        this._verify2(t, e);
                        var r = t.add(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                    }, B.prototype.iadd = function(t, e) {
                        this._verify2(t, e);
                        var r = t.iadd(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r
                    }, B.prototype.sub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.sub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
                    }, B.prototype.isub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.isub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r
                    }, B.prototype.shl = function(t, e) {
                        return this._verify1(t), this.imod(t.ushln(e))
                    }, B.prototype.imul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.imul(e))
                    }, B.prototype.mul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.mul(e))
                    }, B.prototype.isqr = function(t) {
                        return this.imul(t, t.clone())
                    }, B.prototype.sqr = function(t) {
                        return this.mul(t, t)
                    }, B.prototype.sqrt = function(t) {
                        if (t.isZero()) return t.clone();
                        var e = this.m.andln(3);
                        if (i(e % 2 == 1), 3 === e) {
                            var r = this.m.add(new o(1)).iushrn(2);
                            return this.pow(t, r)
                        }
                        for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                        i(!n.isZero());
                        var a = new o(1).toRed(this),
                            h = a.redNeg(),
                            u = this.m.subn(1).iushrn(1),
                            l = this.m.bitLength();
                        for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, u).cmp(h);) l.redIAdd(h);
                        for (var c = this.pow(l, n), f = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), p = s; 0 !== d.cmp(a);) {
                            for (var m = d, g = 0; 0 !== m.cmp(a); g++) m = m.redSqr();
                            i(g < p);
                            var v = this.pow(c, new o(1).iushln(p - g - 1));
                            f = f.redMul(v), c = v.redSqr(), d = d.redMul(c), p = g
                        }
                        return f
                    }, B.prototype.invm = function(t) {
                        var e = t._invmp(this.m);
                        return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                    }, B.prototype.pow = function(t, e) {
                        if (e.isZero()) return new o(1).toRed(this);
                        if (0 === e.cmpn(1)) return t.clone();
                        var r = new Array(16);
                        r[0] = new o(1).toRed(this), r[1] = t;
                        for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
                        var n = r[0],
                            s = 0,
                            a = 0,
                            h = e.bitLength() % 26;
                        for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                            for (var u = e.words[i], l = h - 1; l >= 0; l--) {
                                var c = u >> l & 1;
                                n !== r[0] && (n = this.sqr(n)), 0 !== c || 0 !== s ? (s <<= 1, s |= c, (4 == ++a || 0 === i && 0 === l) && (n = this.mul(n, r[s]), a = 0, s = 0)) : a = 0
                            }
                            h = 26
                        }
                        return n
                    }, B.prototype.convertTo = function(t) {
                        var e = t.umod(this.m);
                        return e === t ? e.clone() : e
                    }, B.prototype.convertFrom = function(t) {
                        var e = t.clone();
                        return e.red = null, e
                    }, o.mont = function(t) {
                        return new F(t)
                    }, n(F, B), F.prototype.convertTo = function(t) {
                        return this.imod(t.ushln(this.shift))
                    }, F.prototype.convertFrom = function(t) {
                        var e = this.imod(t.mul(this.rinv));
                        return e.red = null, e
                    }, F.prototype.imul = function(t, e) {
                        if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                        var r = t.imul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            o = n;
                        return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
                    }, F.prototype.mul = function(t, e) {
                        if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                        var r = t.mul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            s = n;
                        return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
                    }, F.prototype.invm = function(t) {
                        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                    }
                }(t = r.nmd(t), this)
            }, () => {}, (t, e, r) => {
                ! function(t) {
                    "use strict";
                    var e = function(t) {
                            var e, r = new Float64Array(16);
                            if (t)
                                for (e = 0; e < t.length; e++) r[e] = t[e];
                            return r
                        },
                        i = function() {
                            throw new Error("no PRNG")
                        },
                        n = new Uint8Array(16),
                        o = new Uint8Array(32);
                    o[0] = 9;
                    var s = e(),
                        a = e([1]),
                        h = e([56129, 1]),
                        u = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
                        l = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
                        c = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
                        f = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
                        d = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

                    function p(t, e, r, i) {
                        t[e] = r >> 24 & 255, t[e + 1] = r >> 16 & 255, t[e + 2] = r >> 8 & 255, t[e + 3] = 255 & r, t[e + 4] = i >> 24 & 255, t[e + 5] = i >> 16 & 255, t[e + 6] = i >> 8 & 255, t[e + 7] = 255 & i
                    }

                    function m(t, e, r, i, n) {
                        var o, s = 0;
                        for (o = 0; o < n; o++) s |= t[e + o] ^ r[i + o];
                        return (1 & s - 1 >>> 8) - 1
                    }

                    function g(t, e, r, i) {
                        return m(t, e, r, i, 16)
                    }

                    function v(t, e, r, i) {
                        return m(t, e, r, i, 32)
                    }

                    function y(t, e, r, i) {
                        ! function(t, e, r, i) {
                            for (var n, o = 255 & i[0] | (255 & i[1]) << 8 | (255 & i[2]) << 16 | (255 & i[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, h = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, l = 255 & i[4] | (255 & i[5]) << 8 | (255 & i[6]) << 16 | (255 & i[7]) << 24, c = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, f = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, m = 255 & i[8] | (255 & i[9]) << 8 | (255 & i[10]) << 16 | (255 & i[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, v = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, y = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, w = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, b = 255 & i[12] | (255 & i[13]) << 8 | (255 & i[14]) << 16 | (255 & i[15]) << 24, M = o, E = s, A = a, C = h, B = u, F = l, _ = c, S = f, D = d, x = p, I = m, T = g, R = v, N = y, O = w, U = b, k = 0; k < 20; k += 2) M ^= (n = (R ^= (n = (D ^= (n = (B ^= (n = M + R | 0) << 7 | n >>> 25) + M | 0) << 9 | n >>> 23) + B | 0) << 13 | n >>> 19) + D | 0) << 18 | n >>> 14, F ^= (n = (E ^= (n = (N ^= (n = (x ^= (n = F + E | 0) << 7 | n >>> 25) + F | 0) << 9 | n >>> 23) + x | 0) << 13 | n >>> 19) + N | 0) << 18 | n >>> 14, I ^= (n = (_ ^= (n = (A ^= (n = (O ^= (n = I + _ | 0) << 7 | n >>> 25) + I | 0) << 9 | n >>> 23) + O | 0) << 13 | n >>> 19) + A | 0) << 18 | n >>> 14, U ^= (n = (T ^= (n = (S ^= (n = (C ^= (n = U + T | 0) << 7 | n >>> 25) + U | 0) << 9 | n >>> 23) + C | 0) << 13 | n >>> 19) + S | 0) << 18 | n >>> 14, M ^= (n = (C ^= (n = (A ^= (n = (E ^= (n = M + C | 0) << 7 | n >>> 25) + M | 0) << 9 | n >>> 23) + E | 0) << 13 | n >>> 19) + A | 0) << 18 | n >>> 14, F ^= (n = (B ^= (n = (S ^= (n = (_ ^= (n = F + B | 0) << 7 | n >>> 25) + F | 0) << 9 | n >>> 23) + _ | 0) << 13 | n >>> 19) + S | 0) << 18 | n >>> 14, I ^= (n = (x ^= (n = (D ^= (n = (T ^= (n = I + x | 0) << 7 | n >>> 25) + I | 0) << 9 | n >>> 23) + T | 0) << 13 | n >>> 19) + D | 0) << 18 | n >>> 14, U ^= (n = (O ^= (n = (N ^= (n = (R ^= (n = U + O | 0) << 7 | n >>> 25) + U | 0) << 9 | n >>> 23) + R | 0) << 13 | n >>> 19) + N | 0) << 18 | n >>> 14;
                            M = M + o | 0, E = E + s | 0, A = A + a | 0, C = C + h | 0, B = B + u | 0, F = F + l | 0, _ = _ + c | 0, S = S + f | 0, D = D + d | 0, x = x + p | 0, I = I + m | 0, T = T + g | 0, R = R + v | 0, N = N + y | 0, O = O + w | 0, U = U + b | 0, t[0] = M >>> 0 & 255, t[1] = M >>> 8 & 255, t[2] = M >>> 16 & 255, t[3] = M >>> 24 & 255, t[4] = E >>> 0 & 255, t[5] = E >>> 8 & 255, t[6] = E >>> 16 & 255, t[7] = E >>> 24 & 255, t[8] = A >>> 0 & 255, t[9] = A >>> 8 & 255, t[10] = A >>> 16 & 255, t[11] = A >>> 24 & 255, t[12] = C >>> 0 & 255, t[13] = C >>> 8 & 255, t[14] = C >>> 16 & 255, t[15] = C >>> 24 & 255, t[16] = B >>> 0 & 255, t[17] = B >>> 8 & 255, t[18] = B >>> 16 & 255, t[19] = B >>> 24 & 255, t[20] = F >>> 0 & 255, t[21] = F >>> 8 & 255, t[22] = F >>> 16 & 255, t[23] = F >>> 24 & 255, t[24] = _ >>> 0 & 255, t[25] = _ >>> 8 & 255, t[26] = _ >>> 16 & 255, t[27] = _ >>> 24 & 255, t[28] = S >>> 0 & 255, t[29] = S >>> 8 & 255, t[30] = S >>> 16 & 255, t[31] = S >>> 24 & 255, t[32] = D >>> 0 & 255, t[33] = D >>> 8 & 255, t[34] = D >>> 16 & 255, t[35] = D >>> 24 & 255, t[36] = x >>> 0 & 255, t[37] = x >>> 8 & 255, t[38] = x >>> 16 & 255, t[39] = x >>> 24 & 255, t[40] = I >>> 0 & 255, t[41] = I >>> 8 & 255, t[42] = I >>> 16 & 255, t[43] = I >>> 24 & 255, t[44] = T >>> 0 & 255, t[45] = T >>> 8 & 255, t[46] = T >>> 16 & 255, t[47] = T >>> 24 & 255, t[48] = R >>> 0 & 255, t[49] = R >>> 8 & 255, t[50] = R >>> 16 & 255, t[51] = R >>> 24 & 255, t[52] = N >>> 0 & 255, t[53] = N >>> 8 & 255, t[54] = N >>> 16 & 255, t[55] = N >>> 24 & 255, t[56] = O >>> 0 & 255, t[57] = O >>> 8 & 255, t[58] = O >>> 16 & 255, t[59] = O >>> 24 & 255, t[60] = U >>> 0 & 255, t[61] = U >>> 8 & 255, t[62] = U >>> 16 & 255, t[63] = U >>> 24 & 255
                        }(t, e, r, i)
                    }

                    function w(t, e, r, i) {
                        ! function(t, e, r, i) {
                            for (var n, o = 255 & i[0] | (255 & i[1]) << 8 | (255 & i[2]) << 16 | (255 & i[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, h = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, l = 255 & i[4] | (255 & i[5]) << 8 | (255 & i[6]) << 16 | (255 & i[7]) << 24, c = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, f = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, m = 255 & i[8] | (255 & i[9]) << 8 | (255 & i[10]) << 16 | (255 & i[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, v = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, y = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, w = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, b = 255 & i[12] | (255 & i[13]) << 8 | (255 & i[14]) << 16 | (255 & i[15]) << 24, M = 0; M < 20; M += 2) o ^= (n = (v ^= (n = (d ^= (n = (u ^= (n = o + v | 0) << 7 | n >>> 25) + o | 0) << 9 | n >>> 23) + u | 0) << 13 | n >>> 19) + d | 0) << 18 | n >>> 14, l ^= (n = (s ^= (n = (y ^= (n = (p ^= (n = l + s | 0) << 7 | n >>> 25) + l | 0) << 9 | n >>> 23) + p | 0) << 13 | n >>> 19) + y | 0) << 18 | n >>> 14, m ^= (n = (c ^= (n = (a ^= (n = (w ^= (n = m + c | 0) << 7 | n >>> 25) + m | 0) << 9 | n >>> 23) + w | 0) << 13 | n >>> 19) + a | 0) << 18 | n >>> 14, b ^= (n = (g ^= (n = (f ^= (n = (h ^= (n = b + g | 0) << 7 | n >>> 25) + b | 0) << 9 | n >>> 23) + h | 0) << 13 | n >>> 19) + f | 0) << 18 | n >>> 14, o ^= (n = (h ^= (n = (a ^= (n = (s ^= (n = o + h | 0) << 7 | n >>> 25) + o | 0) << 9 | n >>> 23) + s | 0) << 13 | n >>> 19) + a | 0) << 18 | n >>> 14, l ^= (n = (u ^= (n = (f ^= (n = (c ^= (n = l + u | 0) << 7 | n >>> 25) + l | 0) << 9 | n >>> 23) + c | 0) << 13 | n >>> 19) + f | 0) << 18 | n >>> 14, m ^= (n = (p ^= (n = (d ^= (n = (g ^= (n = m + p | 0) << 7 | n >>> 25) + m | 0) << 9 | n >>> 23) + g | 0) << 13 | n >>> 19) + d | 0) << 18 | n >>> 14, b ^= (n = (w ^= (n = (y ^= (n = (v ^= (n = b + w | 0) << 7 | n >>> 25) + b | 0) << 9 | n >>> 23) + v | 0) << 13 | n >>> 19) + y | 0) << 18 | n >>> 14;
                            t[0] = o >>> 0 & 255, t[1] = o >>> 8 & 255, t[2] = o >>> 16 & 255, t[3] = o >>> 24 & 255, t[4] = l >>> 0 & 255, t[5] = l >>> 8 & 255, t[6] = l >>> 16 & 255, t[7] = l >>> 24 & 255, t[8] = m >>> 0 & 255, t[9] = m >>> 8 & 255, t[10] = m >>> 16 & 255, t[11] = m >>> 24 & 255, t[12] = b >>> 0 & 255, t[13] = b >>> 8 & 255, t[14] = b >>> 16 & 255, t[15] = b >>> 24 & 255, t[16] = c >>> 0 & 255, t[17] = c >>> 8 & 255, t[18] = c >>> 16 & 255, t[19] = c >>> 24 & 255, t[20] = f >>> 0 & 255, t[21] = f >>> 8 & 255, t[22] = f >>> 16 & 255, t[23] = f >>> 24 & 255, t[24] = d >>> 0 & 255, t[25] = d >>> 8 & 255, t[26] = d >>> 16 & 255, t[27] = d >>> 24 & 255, t[28] = p >>> 0 & 255, t[29] = p >>> 8 & 255, t[30] = p >>> 16 & 255, t[31] = p >>> 24 & 255
                        }(t, e, r, i)
                    }
                    var b = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

                    function M(t, e, r, i, n, o, s) {
                        var a, h, u = new Uint8Array(16),
                            l = new Uint8Array(64);
                        for (h = 0; h < 16; h++) u[h] = 0;
                        for (h = 0; h < 8; h++) u[h] = o[h];
                        for (; n >= 64;) {
                            for (y(l, u, s, b), h = 0; h < 64; h++) t[e + h] = r[i + h] ^ l[h];
                            for (a = 1, h = 8; h < 16; h++) a = a + (255 & u[h]) | 0, u[h] = 255 & a, a >>>= 8;
                            n -= 64, e += 64, i += 64
                        }
                        if (n > 0)
                            for (y(l, u, s, b), h = 0; h < n; h++) t[e + h] = r[i + h] ^ l[h];
                        return 0
                    }

                    function E(t, e, r, i, n) {
                        var o, s, a = new Uint8Array(16),
                            h = new Uint8Array(64);
                        for (s = 0; s < 16; s++) a[s] = 0;
                        for (s = 0; s < 8; s++) a[s] = i[s];
                        for (; r >= 64;) {
                            for (y(h, a, n, b), s = 0; s < 64; s++) t[e + s] = h[s];
                            for (o = 1, s = 8; s < 16; s++) o = o + (255 & a[s]) | 0, a[s] = 255 & o, o >>>= 8;
                            r -= 64, e += 64
                        }
                        if (r > 0)
                            for (y(h, a, n, b), s = 0; s < r; s++) t[e + s] = h[s];
                        return 0
                    }

                    function A(t, e, r, i, n) {
                        var o = new Uint8Array(32);
                        w(o, i, n, b);
                        for (var s = new Uint8Array(8), a = 0; a < 8; a++) s[a] = i[a + 16];
                        return E(t, e, r, s, o)
                    }

                    function C(t, e, r, i, n, o, s) {
                        var a = new Uint8Array(32);
                        w(a, o, s, b);
                        for (var h = new Uint8Array(8), u = 0; u < 8; u++) h[u] = o[u + 16];
                        return M(t, e, r, i, n, h, a)
                    }
                    var B = function(t) {
                        var e, r, i, n, o, s, a, h;
                        this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, e = 255 & t[0] | (255 & t[1]) << 8, this.r[0] = 8191 & e, r = 255 & t[2] | (255 & t[3]) << 8, this.r[1] = 8191 & (e >>> 13 | r << 3), i = 255 & t[4] | (255 & t[5]) << 8, this.r[2] = 7939 & (r >>> 10 | i << 6), n = 255 & t[6] | (255 & t[7]) << 8, this.r[3] = 8191 & (i >>> 7 | n << 9), o = 255 & t[8] | (255 & t[9]) << 8, this.r[4] = 255 & (n >>> 4 | o << 12), this.r[5] = o >>> 1 & 8190, s = 255 & t[10] | (255 & t[11]) << 8, this.r[6] = 8191 & (o >>> 14 | s << 2), a = 255 & t[12] | (255 & t[13]) << 8, this.r[7] = 8065 & (s >>> 11 | a << 5), h = 255 & t[14] | (255 & t[15]) << 8, this.r[8] = 8191 & (a >>> 8 | h << 8), this.r[9] = h >>> 5 & 127, this.pad[0] = 255 & t[16] | (255 & t[17]) << 8, this.pad[1] = 255 & t[18] | (255 & t[19]) << 8, this.pad[2] = 255 & t[20] | (255 & t[21]) << 8, this.pad[3] = 255 & t[22] | (255 & t[23]) << 8, this.pad[4] = 255 & t[24] | (255 & t[25]) << 8, this.pad[5] = 255 & t[26] | (255 & t[27]) << 8, this.pad[6] = 255 & t[28] | (255 & t[29]) << 8, this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
                    };

                    function F(t, e, r, i, n, o) {
                        var s = new B(o);
                        return s.update(r, i, n), s.finish(t, e), 0
                    }

                    function _(t, e, r, i, n, o) {
                        var s = new Uint8Array(16);
                        return F(s, 0, r, i, n, o), g(t, e, s, 0)
                    }

                    function S(t, e, r, i, n) {
                        var o;
                        if (r < 32) return -1;
                        for (C(t, 0, e, 0, r, i, n), F(t, 16, t, 32, r - 32, t), o = 0; o < 16; o++) t[o] = 0;
                        return 0
                    }

                    function D(t, e, r, i, n) {
                        var o, s = new Uint8Array(32);
                        if (r < 32) return -1;
                        if (A(s, 0, 32, i, n), 0 !== _(e, 16, e, 32, r - 32, s)) return -1;
                        for (C(t, 0, e, 0, r, i, n), o = 0; o < 32; o++) t[o] = 0;
                        return 0
                    }

                    function x(t, e) {
                        var r;
                        for (r = 0; r < 16; r++) t[r] = 0 | e[r]
                    }

                    function I(t) {
                        var e, r, i = 1;
                        for (e = 0; e < 16; e++) r = t[e] + i + 65535, i = Math.floor(r / 65536), t[e] = r - 65536 * i;
                        t[0] += i - 1 + 37 * (i - 1)
                    }

                    function T(t, e, r) {
                        for (var i, n = ~(r - 1), o = 0; o < 16; o++) i = n & (t[o] ^ e[o]), t[o] ^= i, e[o] ^= i
                    }

                    function R(t, r) {
                        var i, n, o, s = e(),
                            a = e();
                        for (i = 0; i < 16; i++) a[i] = r[i];
                        for (I(a), I(a), I(a), n = 0; n < 2; n++) {
                            for (s[0] = a[0] - 65517, i = 1; i < 15; i++) s[i] = a[i] - 65535 - (s[i - 1] >> 16 & 1), s[i - 1] &= 65535;
                            s[15] = a[15] - 32767 - (s[14] >> 16 & 1), o = s[15] >> 16 & 1, s[14] &= 65535, T(a, s, 1 - o)
                        }
                        for (i = 0; i < 16; i++) t[2 * i] = 255 & a[i], t[2 * i + 1] = a[i] >> 8
                    }

                    function N(t, e) {
                        var r = new Uint8Array(32),
                            i = new Uint8Array(32);
                        return R(r, t), R(i, e), v(r, 0, i, 0)
                    }

                    function O(t) {
                        var e = new Uint8Array(32);
                        return R(e, t), 1 & e[0]
                    }

                    function U(t, e) {
                        var r;
                        for (r = 0; r < 16; r++) t[r] = e[2 * r] + (e[2 * r + 1] << 8);
                        t[15] &= 32767
                    }

                    function k(t, e, r) {
                        for (var i = 0; i < 16; i++) t[i] = e[i] + r[i]
                    }

                    function L(t, e, r) {
                        for (var i = 0; i < 16; i++) t[i] = e[i] - r[i]
                    }

                    function P(t, e, r) {
                        var i, n, o = 0,
                            s = 0,
                            a = 0,
                            h = 0,
                            u = 0,
                            l = 0,
                            c = 0,
                            f = 0,
                            d = 0,
                            p = 0,
                            m = 0,
                            g = 0,
                            v = 0,
                            y = 0,
                            w = 0,
                            b = 0,
                            M = 0,
                            E = 0,
                            A = 0,
                            C = 0,
                            B = 0,
                            F = 0,
                            _ = 0,
                            S = 0,
                            D = 0,
                            x = 0,
                            I = 0,
                            T = 0,
                            R = 0,
                            N = 0,
                            O = 0,
                            U = r[0],
                            k = r[1],
                            L = r[2],
                            P = r[3],
                            j = r[4],
                            $ = r[5],
                            q = r[6],
                            K = r[7],
                            H = r[8],
                            G = r[9],
                            z = r[10],
                            V = r[11],
                            W = r[12],
                            Z = r[13],
                            Y = r[14],
                            X = r[15];
                        o += (i = e[0]) * U, s += i * k, a += i * L, h += i * P, u += i * j, l += i * $, c += i * q, f += i * K, d += i * H, p += i * G, m += i * z, g += i * V, v += i * W, y += i * Z, w += i * Y, b += i * X, s += (i = e[1]) * U, a += i * k, h += i * L, u += i * P, l += i * j, c += i * $, f += i * q, d += i * K, p += i * H, m += i * G, g += i * z, v += i * V, y += i * W, w += i * Z, b += i * Y, M += i * X, a += (i = e[2]) * U, h += i * k, u += i * L, l += i * P, c += i * j, f += i * $, d += i * q, p += i * K, m += i * H, g += i * G, v += i * z, y += i * V, w += i * W, b += i * Z, M += i * Y, E += i * X, h += (i = e[3]) * U, u += i * k, l += i * L, c += i * P, f += i * j, d += i * $, p += i * q, m += i * K, g += i * H, v += i * G, y += i * z, w += i * V, b += i * W, M += i * Z, E += i * Y, A += i * X, u += (i = e[4]) * U, l += i * k, c += i * L, f += i * P, d += i * j, p += i * $, m += i * q, g += i * K, v += i * H, y += i * G, w += i * z, b += i * V, M += i * W, E += i * Z, A += i * Y, C += i * X, l += (i = e[5]) * U, c += i * k, f += i * L, d += i * P, p += i * j, m += i * $, g += i * q, v += i * K, y += i * H, w += i * G, b += i * z, M += i * V, E += i * W, A += i * Z, C += i * Y, B += i * X, c += (i = e[6]) * U, f += i * k, d += i * L, p += i * P, m += i * j, g += i * $, v += i * q, y += i * K, w += i * H, b += i * G, M += i * z, E += i * V, A += i * W, C += i * Z, B += i * Y, F += i * X, f += (i = e[7]) * U, d += i * k, p += i * L, m += i * P, g += i * j, v += i * $, y += i * q, w += i * K, b += i * H, M += i * G, E += i * z, A += i * V, C += i * W, B += i * Z, F += i * Y, _ += i * X, d += (i = e[8]) * U, p += i * k, m += i * L, g += i * P, v += i * j, y += i * $, w += i * q, b += i * K, M += i * H, E += i * G, A += i * z, C += i * V, B += i * W, F += i * Z, _ += i * Y, S += i * X, p += (i = e[9]) * U, m += i * k, g += i * L, v += i * P, y += i * j, w += i * $, b += i * q, M += i * K, E += i * H, A += i * G, C += i * z, B += i * V, F += i * W, _ += i * Z, S += i * Y, D += i * X, m += (i = e[10]) * U, g += i * k, v += i * L, y += i * P, w += i * j, b += i * $, M += i * q, E += i * K, A += i * H, C += i * G, B += i * z, F += i * V, _ += i * W, S += i * Z, D += i * Y, x += i * X, g += (i = e[11]) * U, v += i * k, y += i * L, w += i * P, b += i * j, M += i * $, E += i * q, A += i * K, C += i * H, B += i * G, F += i * z, _ += i * V, S += i * W, D += i * Z, x += i * Y, I += i * X, v += (i = e[12]) * U, y += i * k, w += i * L, b += i * P, M += i * j, E += i * $, A += i * q, C += i * K, B += i * H, F += i * G, _ += i * z, S += i * V, D += i * W, x += i * Z, I += i * Y, T += i * X, y += (i = e[13]) * U, w += i * k, b += i * L, M += i * P, E += i * j, A += i * $, C += i * q, B += i * K, F += i * H, _ += i * G, S += i * z, D += i * V, x += i * W, I += i * Z, T += i * Y, R += i * X, w += (i = e[14]) * U, b += i * k, M += i * L, E += i * P, A += i * j, C += i * $, B += i * q, F += i * K, _ += i * H, S += i * G, D += i * z, x += i * V, I += i * W, T += i * Z, R += i * Y, N += i * X, b += (i = e[15]) * U, s += 38 * (E += i * L), a += 38 * (A += i * P), h += 38 * (C += i * j), u += 38 * (B += i * $), l += 38 * (F += i * q), c += 38 * (_ += i * K), f += 38 * (S += i * H), d += 38 * (D += i * G), p += 38 * (x += i * z), m += 38 * (I += i * V), g += 38 * (T += i * W), v += 38 * (R += i * Z), y += 38 * (N += i * Y), w += 38 * (O += i * X), o = (i = (o += 38 * (M += i * k)) + (n = 1) + 65535) - 65536 * (n = Math.floor(i / 65536)), s = (i = s + n + 65535) - 65536 * (n = Math.floor(i / 65536)), a = (i = a + n + 65535) - 65536 * (n = Math.floor(i / 65536)), h = (i = h + n + 65535) - 65536 * (n = Math.floor(i / 65536)), u = (i = u + n + 65535) - 65536 * (n = Math.floor(i / 65536)), l = (i = l + n + 65535) - 65536 * (n = Math.floor(i / 65536)), c = (i = c + n + 65535) - 65536 * (n = Math.floor(i / 65536)), f = (i = f + n + 65535) - 65536 * (n = Math.floor(i / 65536)), d = (i = d + n + 65535) - 65536 * (n = Math.floor(i / 65536)), p = (i = p + n + 65535) - 65536 * (n = Math.floor(i / 65536)), m = (i = m + n + 65535) - 65536 * (n = Math.floor(i / 65536)), g = (i = g + n + 65535) - 65536 * (n = Math.floor(i / 65536)), v = (i = v + n + 65535) - 65536 * (n = Math.floor(i / 65536)), y = (i = y + n + 65535) - 65536 * (n = Math.floor(i / 65536)), w = (i = w + n + 65535) - 65536 * (n = Math.floor(i / 65536)), b = (i = b + n + 65535) - 65536 * (n = Math.floor(i / 65536)), o = (i = (o += n - 1 + 37 * (n - 1)) + (n = 1) + 65535) - 65536 * (n = Math.floor(i / 65536)), s = (i = s + n + 65535) - 65536 * (n = Math.floor(i / 65536)), a = (i = a + n + 65535) - 65536 * (n = Math.floor(i / 65536)), h = (i = h + n + 65535) - 65536 * (n = Math.floor(i / 65536)), u = (i = u + n + 65535) - 65536 * (n = Math.floor(i / 65536)), l = (i = l + n + 65535) - 65536 * (n = Math.floor(i / 65536)), c = (i = c + n + 65535) - 65536 * (n = Math.floor(i / 65536)), f = (i = f + n + 65535) - 65536 * (n = Math.floor(i / 65536)), d = (i = d + n + 65535) - 65536 * (n = Math.floor(i / 65536)), p = (i = p + n + 65535) - 65536 * (n = Math.floor(i / 65536)), m = (i = m + n + 65535) - 65536 * (n = Math.floor(i / 65536)), g = (i = g + n + 65535) - 65536 * (n = Math.floor(i / 65536)), v = (i = v + n + 65535) - 65536 * (n = Math.floor(i / 65536)), y = (i = y + n + 65535) - 65536 * (n = Math.floor(i / 65536)), w = (i = w + n + 65535) - 65536 * (n = Math.floor(i / 65536)), b = (i = b + n + 65535) - 65536 * (n = Math.floor(i / 65536)), o += n - 1 + 37 * (n - 1), t[0] = o, t[1] = s, t[2] = a, t[3] = h, t[4] = u, t[5] = l, t[6] = c, t[7] = f, t[8] = d, t[9] = p, t[10] = m, t[11] = g, t[12] = v, t[13] = y, t[14] = w, t[15] = b
                    }

                    function j(t, e) {
                        P(t, e, e)
                    }

                    function $(t, r) {
                        var i, n = e();
                        for (i = 0; i < 16; i++) n[i] = r[i];
                        for (i = 253; i >= 0; i--) j(n, n), 2 !== i && 4 !== i && P(n, n, r);
                        for (i = 0; i < 16; i++) t[i] = n[i]
                    }

                    function q(t, r) {
                        var i, n = e();
                        for (i = 0; i < 16; i++) n[i] = r[i];
                        for (i = 250; i >= 0; i--) j(n, n), 1 !== i && P(n, n, r);
                        for (i = 0; i < 16; i++) t[i] = n[i]
                    }

                    function K(t, r, i) {
                        var n, o, s = new Uint8Array(32),
                            a = new Float64Array(80),
                            u = e(),
                            l = e(),
                            c = e(),
                            f = e(),
                            d = e(),
                            p = e();
                        for (o = 0; o < 31; o++) s[o] = r[o];
                        for (s[31] = 127 & r[31] | 64, s[0] &= 248, U(a, i), o = 0; o < 16; o++) l[o] = a[o], f[o] = u[o] = c[o] = 0;
                        for (u[0] = f[0] = 1, o = 254; o >= 0; --o) T(u, l, n = s[o >>> 3] >>> (7 & o) & 1), T(c, f, n), k(d, u, c), L(u, u, c), k(c, l, f), L(l, l, f), j(f, d), j(p, u), P(u, c, u), P(c, l, d), k(d, u, c), L(u, u, c), j(l, u), L(c, f, p), P(u, c, h), k(u, u, f), P(c, c, u), P(u, f, p), P(f, l, a), j(l, d), T(u, l, n), T(c, f, n);
                        for (o = 0; o < 16; o++) a[o + 16] = u[o], a[o + 32] = c[o], a[o + 48] = l[o], a[o + 64] = f[o];
                        var m = a.subarray(32),
                            g = a.subarray(16);
                        return $(m, m), P(g, g, m), R(t, g), 0
                    }

                    function H(t, e) {
                        return K(t, e, o)
                    }

                    function G(t, e) {
                        return i(e, 32), H(t, e)
                    }

                    function z(t, e, r) {
                        var i = new Uint8Array(32);
                        return K(i, r, e), w(t, n, i, b)
                    }
                    B.prototype.blocks = function(t, e, r) {
                        for (var i, n, o, s, a, h, u, l, c, f, d, p, m, g, v, y, w, b, M, E = this.fin ? 0 : 2048, A = this.h[0], C = this.h[1], B = this.h[2], F = this.h[3], _ = this.h[4], S = this.h[5], D = this.h[6], x = this.h[7], I = this.h[8], T = this.h[9], R = this.r[0], N = this.r[1], O = this.r[2], U = this.r[3], k = this.r[4], L = this.r[5], P = this.r[6], j = this.r[7], $ = this.r[8], q = this.r[9]; r >= 16;) f = c = 0, f += (A += 8191 & (i = 255 & t[e + 0] | (255 & t[e + 1]) << 8)) * R, f += (C += 8191 & (i >>> 13 | (n = 255 & t[e + 2] | (255 & t[e + 3]) << 8) << 3)) * (5 * q), f += (B += 8191 & (n >>> 10 | (o = 255 & t[e + 4] | (255 & t[e + 5]) << 8) << 6)) * (5 * $), f += (F += 8191 & (o >>> 7 | (s = 255 & t[e + 6] | (255 & t[e + 7]) << 8) << 9)) * (5 * j), c = (f += (_ += 8191 & (s >>> 4 | (a = 255 & t[e + 8] | (255 & t[e + 9]) << 8) << 12)) * (5 * P)) >>> 13, f &= 8191, f += (S += a >>> 1 & 8191) * (5 * L), f += (D += 8191 & (a >>> 14 | (h = 255 & t[e + 10] | (255 & t[e + 11]) << 8) << 2)) * (5 * k), f += (x += 8191 & (h >>> 11 | (u = 255 & t[e + 12] | (255 & t[e + 13]) << 8) << 5)) * (5 * U), f += (I += 8191 & (u >>> 8 | (l = 255 & t[e + 14] | (255 & t[e + 15]) << 8) << 8)) * (5 * O), d = c += (f += (T += l >>> 5 | E) * (5 * N)) >>> 13, d += A * N, d += C * R, d += B * (5 * q), d += F * (5 * $), c = (d += _ * (5 * j)) >>> 13, d &= 8191, d += S * (5 * P), d += D * (5 * L), d += x * (5 * k), d += I * (5 * U), c += (d += T * (5 * O)) >>> 13, d &= 8191, p = c, p += A * O, p += C * N, p += B * R, p += F * (5 * q), c = (p += _ * (5 * $)) >>> 13, p &= 8191, p += S * (5 * j), p += D * (5 * P), p += x * (5 * L), p += I * (5 * k), m = c += (p += T * (5 * U)) >>> 13, m += A * U, m += C * O, m += B * N, m += F * R, c = (m += _ * (5 * q)) >>> 13, m &= 8191, m += S * (5 * $), m += D * (5 * j), m += x * (5 * P), m += I * (5 * L), g = c += (m += T * (5 * k)) >>> 13, g += A * k, g += C * U, g += B * O, g += F * N, c = (g += _ * R) >>> 13, g &= 8191, g += S * (5 * q), g += D * (5 * $), g += x * (5 * j), g += I * (5 * P), v = c += (g += T * (5 * L)) >>> 13, v += A * L, v += C * k, v += B * U, v += F * O, c = (v += _ * N) >>> 13, v &= 8191, v += S * R, v += D * (5 * q), v += x * (5 * $), v += I * (5 * j), y = c += (v += T * (5 * P)) >>> 13, y += A * P, y += C * L, y += B * k, y += F * U, c = (y += _ * O) >>> 13, y &= 8191, y += S * N, y += D * R, y += x * (5 * q), y += I * (5 * $), w = c += (y += T * (5 * j)) >>> 13, w += A * j, w += C * P, w += B * L, w += F * k, c = (w += _ * U) >>> 13, w &= 8191, w += S * O, w += D * N, w += x * R, w += I * (5 * q), b = c += (w += T * (5 * $)) >>> 13, b += A * $, b += C * j, b += B * P, b += F * L, c = (b += _ * k) >>> 13, b &= 8191, b += S * U, b += D * O, b += x * N, b += I * R, M = c += (b += T * (5 * q)) >>> 13, M += A * q, M += C * $, M += B * j, M += F * P, c = (M += _ * L) >>> 13, M &= 8191, M += S * k, M += D * U, M += x * O, M += I * N, A = f = 8191 & (c = (c = ((c += (M += T * R) >>> 13) << 2) + c | 0) + (f &= 8191) | 0), C = d += c >>>= 13, B = p &= 8191, F = m &= 8191, _ = g &= 8191, S = v &= 8191, D = y &= 8191, x = w &= 8191, I = b &= 8191, T = M &= 8191, e += 16, r -= 16;
                        this.h[0] = A, this.h[1] = C, this.h[2] = B, this.h[3] = F, this.h[4] = _, this.h[5] = S, this.h[6] = D, this.h[7] = x, this.h[8] = I, this.h[9] = T
                    }, B.prototype.finish = function(t, e) {
                        var r, i, n, o, s = new Uint16Array(10);
                        if (this.leftover) {
                            for (o = this.leftover, this.buffer[o++] = 1; o < 16; o++) this.buffer[o] = 0;
                            this.fin = 1, this.blocks(this.buffer, 0, 16)
                        }
                        for (r = this.h[1] >>> 13, this.h[1] &= 8191, o = 2; o < 10; o++) this.h[o] += r, r = this.h[o] >>> 13, this.h[o] &= 8191;
                        for (this.h[0] += 5 * r, r = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += r, r = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += r, s[0] = this.h[0] + 5, r = s[0] >>> 13, s[0] &= 8191, o = 1; o < 10; o++) s[o] = this.h[o] + r, r = s[o] >>> 13, s[o] &= 8191;
                        for (s[9] -= 8192, i = (1 ^ r) - 1, o = 0; o < 10; o++) s[o] &= i;
                        for (i = ~i, o = 0; o < 10; o++) this.h[o] = this.h[o] & i | s[o];
                        for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), n = this.h[0] + this.pad[0], this.h[0] = 65535 & n, o = 1; o < 8; o++) n = (this.h[o] + this.pad[o] | 0) + (n >>> 16) | 0, this.h[o] = 65535 & n;
                        t[e + 0] = this.h[0] >>> 0 & 255, t[e + 1] = this.h[0] >>> 8 & 255, t[e + 2] = this.h[1] >>> 0 & 255, t[e + 3] = this.h[1] >>> 8 & 255, t[e + 4] = this.h[2] >>> 0 & 255, t[e + 5] = this.h[2] >>> 8 & 255, t[e + 6] = this.h[3] >>> 0 & 255, t[e + 7] = this.h[3] >>> 8 & 255, t[e + 8] = this.h[4] >>> 0 & 255, t[e + 9] = this.h[4] >>> 8 & 255, t[e + 10] = this.h[5] >>> 0 & 255, t[e + 11] = this.h[5] >>> 8 & 255, t[e + 12] = this.h[6] >>> 0 & 255, t[e + 13] = this.h[6] >>> 8 & 255, t[e + 14] = this.h[7] >>> 0 & 255, t[e + 15] = this.h[7] >>> 8 & 255
                    }, B.prototype.update = function(t, e, r) {
                        var i, n;
                        if (this.leftover) {
                            for ((n = 16 - this.leftover) > r && (n = r), i = 0; i < n; i++) this.buffer[this.leftover + i] = t[e + i];
                            if (r -= n, e += n, this.leftover += n, this.leftover < 16) return;
                            this.blocks(this.buffer, 0, 16), this.leftover = 0
                        }
                        if (r >= 16 && (n = r - r % 16, this.blocks(t, e, n), e += n, r -= n), r) {
                            for (i = 0; i < r; i++) this.buffer[this.leftover + i] = t[e + i];
                            this.leftover += r
                        }
                    };
                    var V = S,
                        W = D,
                        Z = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

                    function Y(t, e, r, i) {
                        for (var n, o, s, a, h, u, l, c, f, d, p, m, g, v, y, w, b, M, E, A, C, B, F, _, S, D, x = new Int32Array(16), I = new Int32Array(16), T = t[0], R = t[1], N = t[2], O = t[3], U = t[4], k = t[5], L = t[6], P = t[7], j = e[0], $ = e[1], q = e[2], K = e[3], H = e[4], G = e[5], z = e[6], V = e[7], W = 0; i >= 128;) {
                            for (E = 0; E < 16; E++) A = 8 * E + W, x[E] = r[A + 0] << 24 | r[A + 1] << 16 | r[A + 2] << 8 | r[A + 3], I[E] = r[A + 4] << 24 | r[A + 5] << 16 | r[A + 6] << 8 | r[A + 7];
                            for (E = 0; E < 80; E++)
                                if (n = T, o = R, s = N, a = O, h = U, u = k, l = L, f = j, d = $, p = q, m = K, g = H, v = G, y = z, F = 65535 & (B = V), _ = B >>> 16, S = 65535 & (C = P), D = C >>> 16, F += 65535 & (B = (H >>> 14 | U << 18) ^ (H >>> 18 | U << 14) ^ (U >>> 9 | H << 23)), _ += B >>> 16, S += 65535 & (C = (U >>> 14 | H << 18) ^ (U >>> 18 | H << 14) ^ (H >>> 9 | U << 23)), D += C >>> 16, F += 65535 & (B = H & G ^ ~H & z), _ += B >>> 16, S += 65535 & (C = U & k ^ ~U & L), D += C >>> 16, F += 65535 & (B = Z[2 * E + 1]), _ += B >>> 16, S += 65535 & (C = Z[2 * E]), D += C >>> 16, C = x[E % 16], _ += (B = I[E % 16]) >>> 16, S += 65535 & C, D += C >>> 16, S += (_ += (F += 65535 & B) >>> 16) >>> 16, F = 65535 & (B = M = 65535 & F | _ << 16), _ = B >>> 16, S = 65535 & (C = b = 65535 & S | (D += S >>> 16) << 16), D = C >>> 16, F += 65535 & (B = (j >>> 28 | T << 4) ^ (T >>> 2 | j << 30) ^ (T >>> 7 | j << 25)), _ += B >>> 16, S += 65535 & (C = (T >>> 28 | j << 4) ^ (j >>> 2 | T << 30) ^ (j >>> 7 | T << 25)), D += C >>> 16, _ += (B = j & $ ^ j & q ^ $ & q) >>> 16, S += 65535 & (C = T & R ^ T & N ^ R & N), D += C >>> 16, c = 65535 & (S += (_ += (F += 65535 & B) >>> 16) >>> 16) | (D += S >>> 16) << 16, w = 65535 & F | _ << 16, F = 65535 & (B = m), _ = B >>> 16, S = 65535 & (C = a), D = C >>> 16, _ += (B = M) >>> 16, S += 65535 & (C = b), D += C >>> 16, R = n, N = o, O = s, U = a = 65535 & (S += (_ += (F += 65535 & B) >>> 16) >>> 16) | (D += S >>> 16) << 16, k = h, L = u, P = l, T = c, $ = f, q = d, K = p, H = m = 65535 & F | _ << 16, G = g, z = v, V = y, j = w, E % 16 == 15)
                                    for (A = 0; A < 16; A++) C = x[A], F = 65535 & (B = I[A]), _ = B >>> 16, S = 65535 & C, D = C >>> 16, C = x[(A + 9) % 16], F += 65535 & (B = I[(A + 9) % 16]), _ += B >>> 16, S += 65535 & C, D += C >>> 16, b = x[(A + 1) % 16], F += 65535 & (B = ((M = I[(A + 1) % 16]) >>> 1 | b << 31) ^ (M >>> 8 | b << 24) ^ (M >>> 7 | b << 25)), _ += B >>> 16, S += 65535 & (C = (b >>> 1 | M << 31) ^ (b >>> 8 | M << 24) ^ b >>> 7), D += C >>> 16, b = x[(A + 14) % 16], _ += (B = ((M = I[(A + 14) % 16]) >>> 19 | b << 13) ^ (b >>> 29 | M << 3) ^ (M >>> 6 | b << 26)) >>> 16, S += 65535 & (C = (b >>> 19 | M << 13) ^ (M >>> 29 | b << 3) ^ b >>> 6), D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, x[A] = 65535 & S | D << 16, I[A] = 65535 & F | _ << 16;
                            F = 65535 & (B = j), _ = B >>> 16, S = 65535 & (C = T), D = C >>> 16, C = t[0], _ += (B = e[0]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[0] = T = 65535 & S | D << 16, e[0] = j = 65535 & F | _ << 16, F = 65535 & (B = $), _ = B >>> 16, S = 65535 & (C = R), D = C >>> 16, C = t[1], _ += (B = e[1]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[1] = R = 65535 & S | D << 16, e[1] = $ = 65535 & F | _ << 16, F = 65535 & (B = q), _ = B >>> 16, S = 65535 & (C = N), D = C >>> 16, C = t[2], _ += (B = e[2]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[2] = N = 65535 & S | D << 16, e[2] = q = 65535 & F | _ << 16, F = 65535 & (B = K), _ = B >>> 16, S = 65535 & (C = O), D = C >>> 16, C = t[3], _ += (B = e[3]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[3] = O = 65535 & S | D << 16, e[3] = K = 65535 & F | _ << 16, F = 65535 & (B = H), _ = B >>> 16, S = 65535 & (C = U), D = C >>> 16, C = t[4], _ += (B = e[4]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[4] = U = 65535 & S | D << 16, e[4] = H = 65535 & F | _ << 16, F = 65535 & (B = G), _ = B >>> 16, S = 65535 & (C = k), D = C >>> 16, C = t[5], _ += (B = e[5]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[5] = k = 65535 & S | D << 16, e[5] = G = 65535 & F | _ << 16, F = 65535 & (B = z), _ = B >>> 16, S = 65535 & (C = L), D = C >>> 16, C = t[6], _ += (B = e[6]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[6] = L = 65535 & S | D << 16, e[6] = z = 65535 & F | _ << 16, F = 65535 & (B = V), _ = B >>> 16, S = 65535 & (C = P), D = C >>> 16, C = t[7], _ += (B = e[7]) >>> 16, S += 65535 & C, D += C >>> 16, D += (S += (_ += (F += 65535 & B) >>> 16) >>> 16) >>> 16, t[7] = P = 65535 & S | D << 16, e[7] = V = 65535 & F | _ << 16, W += 128, i -= 128
                        }
                        return i
                    }

                    function X(t, e, r) {
                        var i, n = new Int32Array(8),
                            o = new Int32Array(8),
                            s = new Uint8Array(256),
                            a = r;
                        for (n[0] = 1779033703, n[1] = 3144134277, n[2] = 1013904242, n[3] = 2773480762, n[4] = 1359893119, n[5] = 2600822924, n[6] = 528734635, n[7] = 1541459225, o[0] = 4089235720, o[1] = 2227873595, o[2] = 4271175723, o[3] = 1595750129, o[4] = 2917565137, o[5] = 725511199, o[6] = 4215389547, o[7] = 327033209, Y(n, o, e, r), r %= 128, i = 0; i < r; i++) s[i] = e[a - r + i];
                        for (s[r] = 128, s[(r = 256 - 128 * (r < 112 ? 1 : 0)) - 9] = 0, p(s, r - 8, a / 536870912 | 0, a << 3), Y(n, o, s, r), i = 0; i < 8; i++) p(t, 8 * i, n[i], o[i]);
                        return 0
                    }

                    function J(t, r) {
                        var i = e(),
                            n = e(),
                            o = e(),
                            s = e(),
                            a = e(),
                            h = e(),
                            u = e(),
                            c = e(),
                            f = e();
                        L(i, t[1], t[0]), L(f, r[1], r[0]), P(i, i, f), k(n, t[0], t[1]), k(f, r[0], r[1]), P(n, n, f), P(o, t[3], r[3]), P(o, o, l), P(s, t[2], r[2]), k(s, s, s), L(a, n, i), L(h, s, o), k(u, s, o), k(c, n, i), P(t[0], a, h), P(t[1], c, u), P(t[2], u, h), P(t[3], a, c)
                    }

                    function Q(t, e, r) {
                        var i;
                        for (i = 0; i < 4; i++) T(t[i], e[i], r)
                    }

                    function tt(t, r) {
                        var i = e(),
                            n = e(),
                            o = e();
                        $(o, r[2]), P(i, r[0], o), P(n, r[1], o), R(t, n), t[31] ^= O(i) << 7
                    }

                    function et(t, e, r) {
                        var i, n;
                        for (x(t[0], s), x(t[1], a), x(t[2], a), x(t[3], s), n = 255; n >= 0; --n) Q(t, e, i = r[n / 8 | 0] >> (7 & n) & 1), J(e, t), J(t, t), Q(t, e, i)
                    }

                    function rt(t, r) {
                        var i = [e(), e(), e(), e()];
                        x(i[0], c), x(i[1], f), x(i[2], a), P(i[3], c, f), et(t, i, r)
                    }

                    function it(t, r, n) {
                        var o, s = new Uint8Array(64),
                            a = [e(), e(), e(), e()];
                        for (n || i(r, 32), X(s, r, 32), s[0] &= 248, s[31] &= 127, s[31] |= 64, rt(a, s), tt(t, a), o = 0; o < 32; o++) r[o + 32] = t[o];
                        return 0
                    }
                    var nt = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

                    function ot(t, e) {
                        var r, i, n, o;
                        for (i = 63; i >= 32; --i) {
                            for (r = 0, n = i - 32, o = i - 12; n < o; ++n) e[n] += r - 16 * e[i] * nt[n - (i - 32)], r = Math.floor((e[n] + 128) / 256), e[n] -= 256 * r;
                            e[n] += r, e[i] = 0
                        }
                        for (r = 0, n = 0; n < 32; n++) e[n] += r - (e[31] >> 4) * nt[n], r = e[n] >> 8, e[n] &= 255;
                        for (n = 0; n < 32; n++) e[n] -= r * nt[n];
                        for (i = 0; i < 32; i++) e[i + 1] += e[i] >> 8, t[i] = 255 & e[i]
                    }

                    function st(t) {
                        var e, r = new Float64Array(64);
                        for (e = 0; e < 64; e++) r[e] = t[e];
                        for (e = 0; e < 64; e++) t[e] = 0;
                        ot(t, r)
                    }

                    function at(t, r, i, n) {
                        var o, s, a = new Uint8Array(64),
                            h = new Uint8Array(64),
                            u = new Uint8Array(64),
                            l = new Float64Array(64),
                            c = [e(), e(), e(), e()];
                        X(a, n, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64;
                        var f = i + 64;
                        for (o = 0; o < i; o++) t[64 + o] = r[o];
                        for (o = 0; o < 32; o++) t[32 + o] = a[32 + o];
                        for (X(u, t.subarray(32), i + 32), st(u), rt(c, u), tt(t, c), o = 32; o < 64; o++) t[o] = n[o];
                        for (X(h, t, i + 64), st(h), o = 0; o < 64; o++) l[o] = 0;
                        for (o = 0; o < 32; o++) l[o] = u[o];
                        for (o = 0; o < 32; o++)
                            for (s = 0; s < 32; s++) l[o + s] += h[o] * a[s];
                        return ot(t.subarray(32), l), f
                    }

                    function ht(t, r, i, n) {
                        var o, h = new Uint8Array(32),
                            l = new Uint8Array(64),
                            c = [e(), e(), e(), e()],
                            f = [e(), e(), e(), e()];
                        if (i < 64) return -1;
                        if (function(t, r) {
                                var i = e(),
                                    n = e(),
                                    o = e(),
                                    h = e(),
                                    l = e(),
                                    c = e(),
                                    f = e();
                                return x(t[2], a), U(t[1], r), j(o, t[1]), P(h, o, u), L(o, o, t[2]), k(h, t[2], h), j(l, h), j(c, l), P(f, c, l), P(i, f, o), P(i, i, h), q(i, i), P(i, i, o), P(i, i, h), P(i, i, h), P(t[0], i, h), j(n, t[0]), P(n, n, h), N(n, o) && P(t[0], t[0], d), j(n, t[0]), P(n, n, h), N(n, o) ? -1 : (O(t[0]) === r[31] >> 7 && L(t[0], s, t[0]), P(t[3], t[0], t[1]), 0)
                            }(f, n)) return -1;
                        for (o = 0; o < i; o++) t[o] = r[o];
                        for (o = 0; o < 32; o++) t[o + 32] = n[o];
                        if (X(l, t, i), st(l), et(c, f, l), rt(f, r.subarray(32)), J(c, f), tt(h, c), i -= 64, v(r, 0, h, 0)) {
                            for (o = 0; o < i; o++) t[o] = 0;
                            return -1
                        }
                        for (o = 0; o < i; o++) t[o] = r[o + 64];
                        return i
                    }
                    var ut = 64,
                        lt = 32,
                        ct = 64;

                    function ft(t, e) {
                        if (32 !== t.length) throw new Error("bad key size");
                        if (24 !== e.length) throw new Error("bad nonce size")
                    }

                    function dt() {
                        for (var t = 0; t < arguments.length; t++)
                            if (!(arguments[t] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
                    }

                    function pt(t) {
                        for (var e = 0; e < t.length; e++) t[e] = 0
                    }
                    t.lowlevel = {
                            crypto_core_hsalsa20: w,
                            crypto_stream_xor: C,
                            crypto_stream: A,
                            crypto_stream_salsa20_xor: M,
                            crypto_stream_salsa20: E,
                            crypto_onetimeauth: F,
                            crypto_onetimeauth_verify: _,
                            crypto_verify_16: g,
                            crypto_verify_32: v,
                            crypto_secretbox: S,
                            crypto_secretbox_open: D,
                            crypto_scalarmult: K,
                            crypto_scalarmult_base: H,
                            crypto_box_beforenm: z,
                            crypto_box_afternm: V,
                            crypto_box: function(t, e, r, i, n, o) {
                                var s = new Uint8Array(32);
                                return z(s, n, o), V(t, e, r, i, s)
                            },
                            crypto_box_open: function(t, e, r, i, n, o) {
                                var s = new Uint8Array(32);
                                return z(s, n, o), W(t, e, r, i, s)
                            },
                            crypto_box_keypair: G,
                            crypto_hash: X,
                            crypto_sign: at,
                            crypto_sign_keypair: it,
                            crypto_sign_open: ht,
                            crypto_secretbox_KEYBYTES: 32,
                            crypto_secretbox_NONCEBYTES: 24,
                            crypto_secretbox_ZEROBYTES: 32,
                            crypto_secretbox_BOXZEROBYTES: 16,
                            crypto_scalarmult_BYTES: 32,
                            crypto_scalarmult_SCALARBYTES: 32,
                            crypto_box_PUBLICKEYBYTES: 32,
                            crypto_box_SECRETKEYBYTES: 32,
                            crypto_box_BEFORENMBYTES: 32,
                            crypto_box_NONCEBYTES: 24,
                            crypto_box_ZEROBYTES: 32,
                            crypto_box_BOXZEROBYTES: 16,
                            crypto_sign_BYTES: ut,
                            crypto_sign_PUBLICKEYBYTES: lt,
                            crypto_sign_SECRETKEYBYTES: ct,
                            crypto_sign_SEEDBYTES: 32,
                            crypto_hash_BYTES: 64,
                            gf: e,
                            D: u,
                            L: nt,
                            pack25519: R,
                            unpack25519: U,
                            M: P,
                            A: k,
                            S: j,
                            Z: L,
                            pow2523: q,
                            add: J,
                            set25519: x,
                            modL: ot,
                            scalarmult: et,
                            scalarbase: rt
                        }, t.randomBytes = function(t) {
                            var e = new Uint8Array(t);
                            return i(e, t), e
                        }, t.secretbox = function(t, e, r) {
                            dt(t, e, r), ft(r, e);
                            for (var i = new Uint8Array(32 + t.length), n = new Uint8Array(i.length), o = 0; o < t.length; o++) i[o + 32] = t[o];
                            return S(n, i, i.length, e, r), n.subarray(16)
                        }, t.secretbox.open = function(t, e, r) {
                            dt(t, e, r), ft(r, e);
                            for (var i = new Uint8Array(16 + t.length), n = new Uint8Array(i.length), o = 0; o < t.length; o++) i[o + 16] = t[o];
                            return i.length < 32 || 0 !== D(n, i, i.length, e, r) ? null : n.subarray(32)
                        }, t.secretbox.keyLength = 32, t.secretbox.nonceLength = 24, t.secretbox.overheadLength = 16, t.scalarMult = function(t, e) {
                            if (dt(t, e), 32 !== t.length) throw new Error("bad n size");
                            if (32 !== e.length) throw new Error("bad p size");
                            var r = new Uint8Array(32);
                            return K(r, t, e), r
                        }, t.scalarMult.base = function(t) {
                            if (dt(t), 32 !== t.length) throw new Error("bad n size");
                            var e = new Uint8Array(32);
                            return H(e, t), e
                        }, t.scalarMult.scalarLength = 32, t.scalarMult.groupElementLength = 32, t.box = function(e, r, i, n) {
                            var o = t.box.before(i, n);
                            return t.secretbox(e, r, o)
                        }, t.box.before = function(t, e) {
                            dt(t, e),
                                function(t, e) {
                                    if (32 !== t.length) throw new Error("bad public key size");
                                    if (32 !== e.length) throw new Error("bad secret key size")
                                }(t, e);
                            var r = new Uint8Array(32);
                            return z(r, t, e), r
                        }, t.box.after = t.secretbox, t.box.open = function(e, r, i, n) {
                            var o = t.box.before(i, n);
                            return t.secretbox.open(e, r, o)
                        }, t.box.open.after = t.secretbox.open, t.box.keyPair = function() {
                            var t = new Uint8Array(32),
                                e = new Uint8Array(32);
                            return G(t, e), {
                                publicKey: t,
                                secretKey: e
                            }
                        }, t.box.keyPair.fromSecretKey = function(t) {
                            if (dt(t), 32 !== t.length) throw new Error("bad secret key size");
                            var e = new Uint8Array(32);
                            return H(e, t), {
                                publicKey: e,
                                secretKey: new Uint8Array(t)
                            }
                        }, t.box.publicKeyLength = 32, t.box.secretKeyLength = 32, t.box.sharedKeyLength = 32, t.box.nonceLength = 24, t.box.overheadLength = t.secretbox.overheadLength, t.sign = function(t, e) {
                            if (dt(t, e), e.length !== ct) throw new Error("bad secret key size");
                            var r = new Uint8Array(ut + t.length);
                            return at(r, t, t.length, e), r
                        }, t.sign.open = function(t, e) {
                            if (dt(t, e), e.length !== lt) throw new Error("bad public key size");
                            var r = new Uint8Array(t.length),
                                i = ht(r, t, t.length, e);
                            if (i < 0) return null;
                            for (var n = new Uint8Array(i), o = 0; o < n.length; o++) n[o] = r[o];
                            return n
                        }, t.sign.detached = function(e, r) {
                            for (var i = t.sign(e, r), n = new Uint8Array(ut), o = 0; o < n.length; o++) n[o] = i[o];
                            return n
                        }, t.sign.detached.verify = function(t, e, r) {
                            if (dt(t, e, r), e.length !== ut) throw new Error("bad signature size");
                            if (r.length !== lt) throw new Error("bad public key size");
                            var i, n = new Uint8Array(ut + t.length),
                                o = new Uint8Array(ut + t.length);
                            for (i = 0; i < ut; i++) n[i] = e[i];
                            for (i = 0; i < t.length; i++) n[i + ut] = t[i];
                            return ht(o, n, n.length, r) >= 0
                        }, t.sign.keyPair = function() {
                            var t = new Uint8Array(lt),
                                e = new Uint8Array(ct);
                            return it(t, e), {
                                publicKey: t,
                                secretKey: e
                            }
                        }, t.sign.keyPair.fromSecretKey = function(t) {
                            if (dt(t), t.length !== ct) throw new Error("bad secret key size");
                            for (var e = new Uint8Array(lt), r = 0; r < e.length; r++) e[r] = t[32 + r];
                            return {
                                publicKey: e,
                                secretKey: new Uint8Array(t)
                            }
                        }, t.sign.keyPair.fromSeed = function(t) {
                            if (dt(t), 32 !== t.length) throw new Error("bad seed size");
                            for (var e = new Uint8Array(lt), r = new Uint8Array(ct), i = 0; i < 32; i++) r[i] = t[i];
                            return it(e, r, !0), {
                                publicKey: e,
                                secretKey: r
                            }
                        }, t.sign.publicKeyLength = lt, t.sign.secretKeyLength = ct, t.sign.seedLength = 32, t.sign.signatureLength = ut, t.hash = function(t) {
                            dt(t);
                            var e = new Uint8Array(64);
                            return X(e, t, t.length), e
                        }, t.hash.hashLength = 64, t.verify = function(t, e) {
                            return dt(t, e), 0 !== t.length && 0 !== e.length && t.length === e.length && 0 === m(t, 0, e, 0, t.length)
                        }, t.setPRNG = function(t) {
                            i = t
                        },
                        function() {
                            var e = "undefined" != typeof self ? self.crypto || self.msCrypto : null;
                            e && e.getRandomValues ? t.setPRNG((function(t, r) {
                                var i, n = new Uint8Array(r);
                                for (i = 0; i < r; i += 65536) e.getRandomValues(n.subarray(i, i + Math.min(r - i, 65536)));
                                for (i = 0; i < r; i++) t[i] = n[i];
                                pt(n)
                            })) : (e = r(6)) && e.randomBytes && t.setPRNG((function(t, r) {
                                var i, n = e.randomBytes(r);
                                for (i = 0; i < r; i++) t[i] = n[i];
                                pt(n)
                            }))
                        }()
                }(t.exports ? t.exports : self.nacl = self.nacl || {})
            }, () => {}, (t, e, r) => {
                "use strict";
                var i = r(8),
                    n = r(12),
                    o = new i(0),
                    s = new i(-1),
                    a = {
                        noether: "0",
                        wei: "1",
                        kwei: "1000",
                        Kwei: "1000",
                        babbage: "1000",
                        femtoether: "1000",
                        mwei: "1000000",
                        Mwei: "1000000",
                        lovelace: "1000000",
                        picoether: "1000000",
                        gwei: "1000000000",
                        Gwei: "1000000000",
                        shannon: "1000000000",
                        nanoether: "1000000000",
                        nano: "1000000000",
                        szabo: "1000000000000",
                        microether: "1000000000000",
                        micro: "1000000000000",
                        finney: "1000000000000000",
                        milliether: "1000000000000000",
                        milli: "1000000000000000",
                        ether: "1000000000000000000",
                        kether: "1000000000000000000000",
                        grand: "1000000000000000000000",
                        mether: "1000000000000000000000000",
                        gether: "1000000000000000000000000000",
                        tether: "1000000000000000000000000000000"
                    };

                function h(t) {
                    var e = t ? t.toLowerCase() : "ether",
                        r = a[e];
                    if ("string" != typeof r) throw new Error("[ethjs-unit] the unit provided " + t + " doesn't exists, please use the one of the following units " + JSON.stringify(a, null, 2));
                    return new i(r, 10)
                }

                function u(t) {
                    if ("string" == typeof t) {
                        if (!t.match(/^-?[0-9.]+$/)) throw new Error("while converting number to string, invalid number value '" + t + "', should be a number matching (^-?[0-9.]+).");
                        return t
                    }
                    if ("number" == typeof t) return String(t);
                    if ("object" == typeof t && t.toString && (t.toTwos || t.dividedToIntegerBy)) return t.toPrecision ? String(t.toPrecision()) : t.toString(10);
                    throw new Error("while converting number to string, invalid number value '" + t + "' type " + typeof t + ".")
                }
                t.exports = {
                    unitMap: a,
                    numberToString: u,
                    getValueOfUnit: h,
                    fromWei: function(t, e, r) {
                        var i = n(t),
                            u = i.lt(o),
                            l = h(e),
                            c = a[e].length - 1 || 1,
                            f = r || {};
                        u && (i = i.mul(s));
                        for (var d = i.mod(l).toString(10); d.length < c;) d = "0" + d;
                        f.pad || (d = d.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
                        var p = i.div(l).toString(10);
                        f.commify && (p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        var m = p + ("0" == d ? "" : "." + d);
                        return u && (m = "-" + m), m
                    },
                    toWei: function(t, e) {
                        var r = u(t),
                            n = h(e),
                            o = a[e].length - 1 || 1,
                            l = "-" === r.substring(0, 1);
                        if (l && (r = r.substring(1)), "." === r) throw new Error("[ethjs-unit] while converting number " + t + " to wei, invalid value");
                        var c = r.split(".");
                        if (c.length > 2) throw new Error("[ethjs-unit] while converting number " + t + " to wei,  too many decimal points");
                        var f = c[0],
                            d = c[1];
                        if (f || (f = "0"), d || (d = "0"), d.length > o) throw new Error("[ethjs-unit] while converting number " + t + " to wei, too many decimal places");
                        for (; d.length < o;) d += "0";
                        f = new i(f), d = new i(d);
                        var p = f.mul(n).add(d);
                        return l && (p = p.mul(s)), new i(p.toString(10), 10)
                    }
                }
            }, function(t, e, r) {
                ! function(t, e) {
                    "use strict";

                    function i(t, e) {
                        if (!t) throw new Error(e || "Assertion failed")
                    }

                    function n(t, e) {
                        t.super_ = e;
                        var r = function() {};
                        r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                    }

                    function o(t, e, r) {
                        if (o.isBN(t)) return t;
                        this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
                    }
                    var s;
                    "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                    try {
                        s = r(9).Buffer
                    } catch (t) {}

                    function a(t, e, r) {
                        for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
                            var s = t.charCodeAt(o) - 48;
                            i <<= 4, i |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
                        }
                        return i
                    }

                    function h(t, e, r, i) {
                        for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
                            var a = t.charCodeAt(s) - 48;
                            n *= i, n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
                        }
                        return n
                    }
                    o.isBN = function(t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function(t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function(t, e) {
                        return t.cmp(e) < 0 ? t : e
                    }, o.prototype._init = function(t, e, r) {
                        if ("number" == typeof t) return this._initNumber(t, e, r);
                        if ("object" == typeof t) return this._initArray(t, e, r);
                        "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
                        var n = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initNumber = function(t, e, r) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (i(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initArray = function(t, e, r) {
                        if (i("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                        for (var n = 0; n < this.length; n++) this.words[n] = 0;
                        var o, s, a = 0;
                        if ("be" === r)
                            for (n = t.length - 1, o = 0; n >= 0; n -= 3) s = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        else if ("le" === r)
                            for (n = 0, o = 0; n < t.length; n += 3) s = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        return this.strip()
                    }, o.prototype._parseHex = function(t, e) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                        for (var r = 0; r < this.length; r++) this.words[r] = 0;
                        var i, n, o = 0;
                        for (r = t.length - 6, i = 0; r >= e; r -= 6) n = a(t, r, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, i++);
                        r + 6 !== e && (n = a(t, e, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303), this.strip()
                    }, o.prototype._parseBase = function(t, e, r) {
                        this.words = [0], this.length = 1;
                        for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
                        i--, n = n / e | 0;
                        for (var o = t.length - r, s = o % i, a = Math.min(o, o - s) + r, u = 0, l = r; l < a; l += i) u = h(t, l, l + i, e), this.imuln(n), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                        if (0 !== s) {
                            var c = 1;
                            for (u = h(t, l, t.length, e), l = 0; l < s; l++) c *= e;
                            this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                        }
                    }, o.prototype.copy = function(t) {
                        t.words = new Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype.clone = function() {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function(t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype.strip = function() {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function() {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, o.prototype.inspect = function() {
                        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                    };
                    var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                        l = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                    function f(t, e, r) {
                        r.negative = e.negative ^ t.negative;
                        var i = t.length + e.length | 0;
                        r.length = i, i = i - 1 | 0;
                        var n = 0 | t.words[0],
                            o = 0 | e.words[0],
                            s = n * o,
                            a = 67108863 & s,
                            h = s / 67108864 | 0;
                        r.words[0] = a;
                        for (var u = 1; u < i; u++) {
                            for (var l = h >>> 26, c = 67108863 & h, f = Math.min(u, e.length - 1), d = Math.max(0, u - t.length + 1); d <= f; d++) {
                                var p = u - d | 0;
                                l += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + c) / 67108864 | 0, c = 67108863 & s
                            }
                            r.words[u] = 0 | c, h = 0 | l
                        }
                        return 0 !== h ? r.words[u] = 0 | h : r.length--, r.strip()
                    }
                    o.prototype.toString = function(t, e) {
                        var r;
                        if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                            r = "";
                            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                                var a = this.words[s],
                                    h = (16777215 & (a << n | o)).toString(16);
                                r = 0 != (o = a >>> 24 - n & 16777215) || s !== this.length - 1 ? u[6 - h.length] + h + r : h + r, (n += 2) >= 26 && (n -= 26, s--)
                            }
                            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        if (t === (0 | t) && t >= 2 && t <= 36) {
                            var f = l[t],
                                d = c[t];
                            r = "";
                            var p = this.clone();
                            for (p.negative = 0; !p.isZero();) {
                                var m = p.modn(d).toString(t);
                                r = (p = p.idivn(d)).isZero() ? m + r : u[f - m.length] + m + r
                            }
                            for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        i(!1, "Base should be between 2 and 36")
                    }, o.prototype.toNumber = function() {
                        var t = this.words[0];
                        return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                    }, o.prototype.toJSON = function() {
                        return this.toString(16)
                    }, o.prototype.toBuffer = function(t, e) {
                        return i(void 0 !== s), this.toArrayLike(s, t, e)
                    }, o.prototype.toArray = function(t, e) {
                        return this.toArrayLike(Array, t, e)
                    }, o.prototype.toArrayLike = function(t, e, r) {
                        var n = this.byteLength(),
                            o = r || Math.max(1, n);
                        i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0"), this.strip();
                        var s, a, h = "le" === e,
                            u = new t(o),
                            l = this.clone();
                        if (h) {
                            for (a = 0; !l.isZero(); a++) s = l.andln(255), l.iushrn(8), u[a] = s;
                            for (; a < o; a++) u[a] = 0
                        } else {
                            for (a = 0; a < o - n; a++) u[a] = 0;
                            for (a = 0; !l.isZero(); a++) s = l.andln(255), l.iushrn(8), u[o - a - 1] = s
                        }
                        return u
                    }, Math.clz32 ? o.prototype._countBits = function(t) {
                        return 32 - Math.clz32(t)
                    } : o.prototype._countBits = function(t) {
                        var e = t,
                            r = 0;
                        return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
                    }, o.prototype._zeroBits = function(t) {
                        if (0 === t) return 26;
                        var e = t,
                            r = 0;
                        return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
                    }, o.prototype.bitLength = function() {
                        var t = this.words[this.length - 1],
                            e = this._countBits(t);
                        return 26 * (this.length - 1) + e
                    }, o.prototype.zeroBits = function() {
                        if (this.isZero()) return 0;
                        for (var t = 0, e = 0; e < this.length; e++) {
                            var r = this._zeroBits(this.words[e]);
                            if (t += r, 26 !== r) break
                        }
                        return t
                    }, o.prototype.byteLength = function() {
                        return Math.ceil(this.bitLength() / 8)
                    }, o.prototype.toTwos = function(t) {
                        return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                    }, o.prototype.fromTwos = function(t) {
                        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                    }, o.prototype.isNeg = function() {
                        return 0 !== this.negative
                    }, o.prototype.neg = function() {
                        return this.clone().ineg()
                    }, o.prototype.ineg = function() {
                        return this.isZero() || (this.negative ^= 1), this
                    }, o.prototype.iuor = function(t) {
                        for (; this.length < t.length;) this.words[this.length++] = 0;
                        for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                        return this.strip()
                    }, o.prototype.ior = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuor(t)
                    }, o.prototype.or = function(t) {
                        return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                    }, o.prototype.uor = function(t) {
                        return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                    }, o.prototype.iuand = function(t) {
                        var e;
                        e = this.length > t.length ? t : this;
                        for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                        return this.length = e.length, this.strip()
                    }, o.prototype.iand = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuand(t)
                    }, o.prototype.and = function(t) {
                        return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                    }, o.prototype.uand = function(t) {
                        return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                    }, o.prototype.iuxor = function(t) {
                        var e, r;
                        this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                        for (var i = 0; i < r.length; i++) this.words[i] = e.words[i] ^ r.words[i];
                        if (this !== e)
                            for (; i < e.length; i++) this.words[i] = e.words[i];
                        return this.length = e.length, this.strip()
                    }, o.prototype.ixor = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuxor(t)
                    }, o.prototype.xor = function(t) {
                        return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                    }, o.prototype.uxor = function(t) {
                        return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                    }, o.prototype.inotn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = 0 | Math.ceil(t / 26),
                            r = t % 26;
                        this._expand(e), r > 0 && e--;
                        for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                        return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this.strip()
                    }, o.prototype.notn = function(t) {
                        return this.clone().inotn(t)
                    }, o.prototype.setn = function(t, e) {
                        i("number" == typeof t && t >= 0);
                        var r = t / 26 | 0,
                            n = t % 26;
                        return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << n : this.words[r] & ~(1 << n), this.strip()
                    }, o.prototype.iadd = function(t) {
                        var e, r, i;
                        if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                        if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                        this.length > t.length ? (r = this, i = t) : (r = t, i = this);
                        for (var n = 0, o = 0; o < i.length; o++) e = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        for (; 0 !== n && o < r.length; o++) e = (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                        else if (r !== this)
                            for (; o < r.length; o++) this.words[o] = r.words[o];
                        return this
                    }, o.prototype.add = function(t) {
                        var e;
                        return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                    }, o.prototype.isub = function(t) {
                        if (0 !== t.negative) {
                            t.negative = 0;
                            var e = this.iadd(t);
                            return t.negative = 1, e._normSign()
                        }
                        if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                        var r, i, n = this.cmp(t);
                        if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                        n > 0 ? (r = this, i = t) : (r = t, i = this);
                        for (var o = 0, s = 0; s < i.length; s++) o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        if (0 === o && s < r.length && r !== this)
                            for (; s < r.length; s++) this.words[s] = r.words[s];
                        return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip()
                    }, o.prototype.sub = function(t) {
                        return this.clone().isub(t)
                    };
                    var d = function(t, e, r) {
                        var i, n, o, s = t.words,
                            a = e.words,
                            h = r.words,
                            u = 0,
                            l = 0 | s[0],
                            c = 8191 & l,
                            f = l >>> 13,
                            d = 0 | s[1],
                            p = 8191 & d,
                            m = d >>> 13,
                            g = 0 | s[2],
                            v = 8191 & g,
                            y = g >>> 13,
                            w = 0 | s[3],
                            b = 8191 & w,
                            M = w >>> 13,
                            E = 0 | s[4],
                            A = 8191 & E,
                            C = E >>> 13,
                            B = 0 | s[5],
                            F = 8191 & B,
                            _ = B >>> 13,
                            S = 0 | s[6],
                            D = 8191 & S,
                            x = S >>> 13,
                            I = 0 | s[7],
                            T = 8191 & I,
                            R = I >>> 13,
                            N = 0 | s[8],
                            O = 8191 & N,
                            U = N >>> 13,
                            k = 0 | s[9],
                            L = 8191 & k,
                            P = k >>> 13,
                            j = 0 | a[0],
                            $ = 8191 & j,
                            q = j >>> 13,
                            K = 0 | a[1],
                            H = 8191 & K,
                            G = K >>> 13,
                            z = 0 | a[2],
                            V = 8191 & z,
                            W = z >>> 13,
                            Z = 0 | a[3],
                            Y = 8191 & Z,
                            X = Z >>> 13,
                            J = 0 | a[4],
                            Q = 8191 & J,
                            tt = J >>> 13,
                            et = 0 | a[5],
                            rt = 8191 & et,
                            it = et >>> 13,
                            nt = 0 | a[6],
                            ot = 8191 & nt,
                            st = nt >>> 13,
                            at = 0 | a[7],
                            ht = 8191 & at,
                            ut = at >>> 13,
                            lt = 0 | a[8],
                            ct = 8191 & lt,
                            ft = lt >>> 13,
                            dt = 0 | a[9],
                            pt = 8191 & dt,
                            mt = dt >>> 13;
                        r.negative = t.negative ^ e.negative, r.length = 19;
                        var gt = (u + (i = Math.imul(c, $)) | 0) + ((8191 & (n = (n = Math.imul(c, q)) + Math.imul(f, $) | 0)) << 13) | 0;
                        u = ((o = Math.imul(f, q)) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, i = Math.imul(p, $), n = (n = Math.imul(p, q)) + Math.imul(m, $) | 0, o = Math.imul(m, q);
                        var vt = (u + (i = i + Math.imul(c, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, G) | 0) + Math.imul(f, H) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, G) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, i = Math.imul(v, $), n = (n = Math.imul(v, q)) + Math.imul(y, $) | 0, o = Math.imul(y, q), i = i + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, G) | 0) + Math.imul(m, H) | 0, o = o + Math.imul(m, G) | 0;
                        var yt = (u + (i = i + Math.imul(c, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, W) | 0) + Math.imul(f, V) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, W) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, i = Math.imul(b, $), n = (n = Math.imul(b, q)) + Math.imul(M, $) | 0, o = Math.imul(M, q), i = i + Math.imul(v, H) | 0, n = (n = n + Math.imul(v, G) | 0) + Math.imul(y, H) | 0, o = o + Math.imul(y, G) | 0, i = i + Math.imul(p, V) | 0, n = (n = n + Math.imul(p, W) | 0) + Math.imul(m, V) | 0, o = o + Math.imul(m, W) | 0;
                        var wt = (u + (i = i + Math.imul(c, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, X) | 0) + Math.imul(f, Y) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, X) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, i = Math.imul(A, $), n = (n = Math.imul(A, q)) + Math.imul(C, $) | 0, o = Math.imul(C, q), i = i + Math.imul(b, H) | 0, n = (n = n + Math.imul(b, G) | 0) + Math.imul(M, H) | 0, o = o + Math.imul(M, G) | 0, i = i + Math.imul(v, V) | 0, n = (n = n + Math.imul(v, W) | 0) + Math.imul(y, V) | 0, o = o + Math.imul(y, W) | 0, i = i + Math.imul(p, Y) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(m, Y) | 0, o = o + Math.imul(m, X) | 0;
                        var bt = (u + (i = i + Math.imul(c, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, tt) | 0) + Math.imul(f, Q) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, tt) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, i = Math.imul(F, $), n = (n = Math.imul(F, q)) + Math.imul(_, $) | 0, o = Math.imul(_, q), i = i + Math.imul(A, H) | 0, n = (n = n + Math.imul(A, G) | 0) + Math.imul(C, H) | 0, o = o + Math.imul(C, G) | 0, i = i + Math.imul(b, V) | 0, n = (n = n + Math.imul(b, W) | 0) + Math.imul(M, V) | 0, o = o + Math.imul(M, W) | 0, i = i + Math.imul(v, Y) | 0, n = (n = n + Math.imul(v, X) | 0) + Math.imul(y, Y) | 0, o = o + Math.imul(y, X) | 0, i = i + Math.imul(p, Q) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
                        var Mt = (u + (i = i + Math.imul(c, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, it) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, it) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, i = Math.imul(D, $), n = (n = Math.imul(D, q)) + Math.imul(x, $) | 0, o = Math.imul(x, q), i = i + Math.imul(F, H) | 0, n = (n = n + Math.imul(F, G) | 0) + Math.imul(_, H) | 0, o = o + Math.imul(_, G) | 0, i = i + Math.imul(A, V) | 0, n = (n = n + Math.imul(A, W) | 0) + Math.imul(C, V) | 0, o = o + Math.imul(C, W) | 0, i = i + Math.imul(b, Y) | 0, n = (n = n + Math.imul(b, X) | 0) + Math.imul(M, Y) | 0, o = o + Math.imul(M, X) | 0, i = i + Math.imul(v, Q) | 0, n = (n = n + Math.imul(v, tt) | 0) + Math.imul(y, Q) | 0, o = o + Math.imul(y, tt) | 0, i = i + Math.imul(p, rt) | 0, n = (n = n + Math.imul(p, it) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, it) | 0;
                        var Et = (u + (i = i + Math.imul(c, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, st) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, i = Math.imul(T, $), n = (n = Math.imul(T, q)) + Math.imul(R, $) | 0, o = Math.imul(R, q), i = i + Math.imul(D, H) | 0, n = (n = n + Math.imul(D, G) | 0) + Math.imul(x, H) | 0, o = o + Math.imul(x, G) | 0, i = i + Math.imul(F, V) | 0, n = (n = n + Math.imul(F, W) | 0) + Math.imul(_, V) | 0, o = o + Math.imul(_, W) | 0, i = i + Math.imul(A, Y) | 0, n = (n = n + Math.imul(A, X) | 0) + Math.imul(C, Y) | 0, o = o + Math.imul(C, X) | 0, i = i + Math.imul(b, Q) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(M, Q) | 0, o = o + Math.imul(M, tt) | 0, i = i + Math.imul(v, rt) | 0, n = (n = n + Math.imul(v, it) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, it) | 0, i = i + Math.imul(p, ot) | 0, n = (n = n + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                        var At = (u + (i = i + Math.imul(c, ht) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ut) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ut) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, i = Math.imul(O, $), n = (n = Math.imul(O, q)) + Math.imul(U, $) | 0, o = Math.imul(U, q), i = i + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, G) | 0) + Math.imul(R, H) | 0, o = o + Math.imul(R, G) | 0, i = i + Math.imul(D, V) | 0, n = (n = n + Math.imul(D, W) | 0) + Math.imul(x, V) | 0, o = o + Math.imul(x, W) | 0, i = i + Math.imul(F, Y) | 0, n = (n = n + Math.imul(F, X) | 0) + Math.imul(_, Y) | 0, o = o + Math.imul(_, X) | 0, i = i + Math.imul(A, Q) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(C, Q) | 0, o = o + Math.imul(C, tt) | 0, i = i + Math.imul(b, rt) | 0, n = (n = n + Math.imul(b, it) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, it) | 0, i = i + Math.imul(v, ot) | 0, n = (n = n + Math.imul(v, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, i = i + Math.imul(p, ht) | 0, n = (n = n + Math.imul(p, ut) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, ut) | 0;
                        var Ct = (u + (i = i + Math.imul(c, ct) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ft) | 0) + Math.imul(f, ct) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ft) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, i = Math.imul(L, $), n = (n = Math.imul(L, q)) + Math.imul(P, $) | 0, o = Math.imul(P, q), i = i + Math.imul(O, H) | 0, n = (n = n + Math.imul(O, G) | 0) + Math.imul(U, H) | 0, o = o + Math.imul(U, G) | 0, i = i + Math.imul(T, V) | 0, n = (n = n + Math.imul(T, W) | 0) + Math.imul(R, V) | 0, o = o + Math.imul(R, W) | 0, i = i + Math.imul(D, Y) | 0, n = (n = n + Math.imul(D, X) | 0) + Math.imul(x, Y) | 0, o = o + Math.imul(x, X) | 0, i = i + Math.imul(F, Q) | 0, n = (n = n + Math.imul(F, tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(A, rt) | 0, n = (n = n + Math.imul(A, it) | 0) + Math.imul(C, rt) | 0, o = o + Math.imul(C, it) | 0, i = i + Math.imul(b, ot) | 0, n = (n = n + Math.imul(b, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, i = i + Math.imul(v, ht) | 0, n = (n = n + Math.imul(v, ut) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, ut) | 0, i = i + Math.imul(p, ct) | 0, n = (n = n + Math.imul(p, ft) | 0) + Math.imul(m, ct) | 0, o = o + Math.imul(m, ft) | 0;
                        var Bt = (u + (i = i + Math.imul(c, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, mt) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, i = Math.imul(L, H), n = (n = Math.imul(L, G)) + Math.imul(P, H) | 0, o = Math.imul(P, G), i = i + Math.imul(O, V) | 0, n = (n = n + Math.imul(O, W) | 0) + Math.imul(U, V) | 0, o = o + Math.imul(U, W) | 0, i = i + Math.imul(T, Y) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(R, Y) | 0, o = o + Math.imul(R, X) | 0, i = i + Math.imul(D, Q) | 0, n = (n = n + Math.imul(D, tt) | 0) + Math.imul(x, Q) | 0, o = o + Math.imul(x, tt) | 0, i = i + Math.imul(F, rt) | 0, n = (n = n + Math.imul(F, it) | 0) + Math.imul(_, rt) | 0, o = o + Math.imul(_, it) | 0, i = i + Math.imul(A, ot) | 0, n = (n = n + Math.imul(A, st) | 0) + Math.imul(C, ot) | 0, o = o + Math.imul(C, st) | 0, i = i + Math.imul(b, ht) | 0, n = (n = n + Math.imul(b, ut) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, ut) | 0, i = i + Math.imul(v, ct) | 0, n = (n = n + Math.imul(v, ft) | 0) + Math.imul(y, ct) | 0, o = o + Math.imul(y, ft) | 0;
                        var Ft = (u + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(m, mt) | 0) + (n >>> 13) | 0) + (Ft >>> 26) | 0, Ft &= 67108863, i = Math.imul(L, V), n = (n = Math.imul(L, W)) + Math.imul(P, V) | 0, o = Math.imul(P, W), i = i + Math.imul(O, Y) | 0, n = (n = n + Math.imul(O, X) | 0) + Math.imul(U, Y) | 0, o = o + Math.imul(U, X) | 0, i = i + Math.imul(T, Q) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(R, Q) | 0, o = o + Math.imul(R, tt) | 0, i = i + Math.imul(D, rt) | 0, n = (n = n + Math.imul(D, it) | 0) + Math.imul(x, rt) | 0, o = o + Math.imul(x, it) | 0, i = i + Math.imul(F, ot) | 0, n = (n = n + Math.imul(F, st) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, st) | 0, i = i + Math.imul(A, ht) | 0, n = (n = n + Math.imul(A, ut) | 0) + Math.imul(C, ht) | 0, o = o + Math.imul(C, ut) | 0, i = i + Math.imul(b, ct) | 0, n = (n = n + Math.imul(b, ft) | 0) + Math.imul(M, ct) | 0, o = o + Math.imul(M, ft) | 0;
                        var _t = (u + (i = i + Math.imul(v, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(v, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(y, mt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, i = Math.imul(L, Y), n = (n = Math.imul(L, X)) + Math.imul(P, Y) | 0, o = Math.imul(P, X), i = i + Math.imul(O, Q) | 0, n = (n = n + Math.imul(O, tt) | 0) + Math.imul(U, Q) | 0, o = o + Math.imul(U, tt) | 0, i = i + Math.imul(T, rt) | 0, n = (n = n + Math.imul(T, it) | 0) + Math.imul(R, rt) | 0, o = o + Math.imul(R, it) | 0, i = i + Math.imul(D, ot) | 0, n = (n = n + Math.imul(D, st) | 0) + Math.imul(x, ot) | 0, o = o + Math.imul(x, st) | 0, i = i + Math.imul(F, ht) | 0, n = (n = n + Math.imul(F, ut) | 0) + Math.imul(_, ht) | 0, o = o + Math.imul(_, ut) | 0, i = i + Math.imul(A, ct) | 0, n = (n = n + Math.imul(A, ft) | 0) + Math.imul(C, ct) | 0, o = o + Math.imul(C, ft) | 0;
                        var St = (u + (i = i + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(M, mt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, i = Math.imul(L, Q), n = (n = Math.imul(L, tt)) + Math.imul(P, Q) | 0, o = Math.imul(P, tt), i = i + Math.imul(O, rt) | 0, n = (n = n + Math.imul(O, it) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, it) | 0, i = i + Math.imul(T, ot) | 0, n = (n = n + Math.imul(T, st) | 0) + Math.imul(R, ot) | 0, o = o + Math.imul(R, st) | 0, i = i + Math.imul(D, ht) | 0, n = (n = n + Math.imul(D, ut) | 0) + Math.imul(x, ht) | 0, o = o + Math.imul(x, ut) | 0, i = i + Math.imul(F, ct) | 0, n = (n = n + Math.imul(F, ft) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, ft) | 0;
                        var Dt = (u + (i = i + Math.imul(A, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, mt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(C, mt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, i = Math.imul(L, rt), n = (n = Math.imul(L, it)) + Math.imul(P, rt) | 0, o = Math.imul(P, it), i = i + Math.imul(O, ot) | 0, n = (n = n + Math.imul(O, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, i = i + Math.imul(T, ht) | 0, n = (n = n + Math.imul(T, ut) | 0) + Math.imul(R, ht) | 0, o = o + Math.imul(R, ut) | 0, i = i + Math.imul(D, ct) | 0, n = (n = n + Math.imul(D, ft) | 0) + Math.imul(x, ct) | 0, o = o + Math.imul(x, ft) | 0;
                        var xt = (u + (i = i + Math.imul(F, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(F, mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(_, mt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, i = Math.imul(L, ot), n = (n = Math.imul(L, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), i = i + Math.imul(O, ht) | 0, n = (n = n + Math.imul(O, ut) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, ut) | 0, i = i + Math.imul(T, ct) | 0, n = (n = n + Math.imul(T, ft) | 0) + Math.imul(R, ct) | 0, o = o + Math.imul(R, ft) | 0;
                        var It = (u + (i = i + Math.imul(D, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(D, mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(x, mt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, i = Math.imul(L, ht), n = (n = Math.imul(L, ut)) + Math.imul(P, ht) | 0, o = Math.imul(P, ut), i = i + Math.imul(O, ct) | 0, n = (n = n + Math.imul(O, ft) | 0) + Math.imul(U, ct) | 0, o = o + Math.imul(U, ft) | 0;
                        var Tt = (u + (i = i + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, mt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(R, mt) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, i = Math.imul(L, ct), n = (n = Math.imul(L, ft)) + Math.imul(P, ct) | 0, o = Math.imul(P, ft);
                        var Rt = (u + (i = i + Math.imul(O, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(U, mt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863;
                        var Nt = (u + (i = Math.imul(L, pt)) | 0) + ((8191 & (n = (n = Math.imul(L, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                        return u = ((o = Math.imul(P, mt)) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, h[0] = gt, h[1] = vt, h[2] = yt, h[3] = wt, h[4] = bt, h[5] = Mt, h[6] = Et, h[7] = At, h[8] = Ct, h[9] = Bt, h[10] = Ft, h[11] = _t, h[12] = St, h[13] = Dt, h[14] = xt, h[15] = It, h[16] = Tt, h[17] = Rt, h[18] = Nt, 0 !== u && (h[19] = u, r.length++), r
                    };

                    function p(t, e, r) {
                        return (new m).mulp(t, e, r)
                    }

                    function m(t, e) {
                        this.x = t, this.y = e
                    }
                    Math.imul || (d = f), o.prototype.mulTo = function(t, e) {
                        var r, i = this.length + t.length;
                        return r = 10 === this.length && 10 === t.length ? d(this, t, e) : i < 63 ? f(this, t, e) : i < 1024 ? function(t, e, r) {
                            r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                            for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                                var s = n;
                                n = 0;
                                for (var a = 67108863 & i, h = Math.min(o, e.length - 1), u = Math.max(0, o - t.length + 1); u <= h; u++) {
                                    var l = o - u,
                                        c = (0 | t.words[l]) * (0 | e.words[u]),
                                        f = 67108863 & c;
                                    a = 67108863 & (f = f + a | 0), n += (s = (s = s + (c / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                                }
                                r.words[o] = a, i = s, s = n
                            }
                            return 0 !== i ? r.words[o] = i : r.length--, r.strip()
                        }(this, t, e) : p(this, t, e), r
                    }, m.prototype.makeRBT = function(t) {
                        for (var e = new Array(t), r = o.prototype._countBits(t) - 1, i = 0; i < t; i++) e[i] = this.revBin(i, r, t);
                        return e
                    }, m.prototype.revBin = function(t, e, r) {
                        if (0 === t || t === r - 1) return t;
                        for (var i = 0, n = 0; n < e; n++) i |= (1 & t) << e - n - 1, t >>= 1;
                        return i
                    }, m.prototype.permute = function(t, e, r, i, n, o) {
                        for (var s = 0; s < o; s++) i[s] = e[t[s]], n[s] = r[t[s]]
                    }, m.prototype.transform = function(t, e, r, i, n, o) {
                        this.permute(o, t, e, r, i, n);
                        for (var s = 1; s < n; s <<= 1)
                            for (var a = s << 1, h = Math.cos(2 * Math.PI / a), u = Math.sin(2 * Math.PI / a), l = 0; l < n; l += a)
                                for (var c = h, f = u, d = 0; d < s; d++) {
                                    var p = r[l + d],
                                        m = i[l + d],
                                        g = r[l + d + s],
                                        v = i[l + d + s],
                                        y = c * g - f * v;
                                    v = c * v + f * g, g = y, r[l + d] = p + g, i[l + d] = m + v, r[l + d + s] = p - g, i[l + d + s] = m - v, d !== a && (y = h * c - u * f, f = h * f + u * c, c = y)
                                }
                    }, m.prototype.guessLen13b = function(t, e) {
                        var r = 1 | Math.max(e, t),
                            i = 1 & r,
                            n = 0;
                        for (r = r / 2 | 0; r; r >>>= 1) n++;
                        return 1 << n + 1 + i
                    }, m.prototype.conjugate = function(t, e, r) {
                        if (!(r <= 1))
                            for (var i = 0; i < r / 2; i++) {
                                var n = t[i];
                                t[i] = t[r - i - 1], t[r - i - 1] = n, n = e[i], e[i] = -e[r - i - 1], e[r - i - 1] = -n
                            }
                    }, m.prototype.normalize13b = function(t, e) {
                        for (var r = 0, i = 0; i < e / 2; i++) {
                            var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
                            t[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                        }
                        return t
                    }, m.prototype.convert13b = function(t, e, r, n) {
                        for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                        for (s = 2 * e; s < n; ++s) r[s] = 0;
                        i(0 === o), i(0 == (-8192 & o))
                    }, m.prototype.stub = function(t) {
                        for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                        return e
                    }, m.prototype.mulp = function(t, e, r) {
                        var i = 2 * this.guessLen13b(t.length, e.length),
                            n = this.makeRBT(i),
                            o = this.stub(i),
                            s = new Array(i),
                            a = new Array(i),
                            h = new Array(i),
                            u = new Array(i),
                            l = new Array(i),
                            c = new Array(i),
                            f = r.words;
                        f.length = i, this.convert13b(t.words, t.length, s, i), this.convert13b(e.words, e.length, u, i), this.transform(s, o, a, h, i, n), this.transform(u, o, l, c, i, n);
                        for (var d = 0; d < i; d++) {
                            var p = a[d] * l[d] - h[d] * c[d];
                            h[d] = a[d] * c[d] + h[d] * l[d], a[d] = p
                        }
                        return this.conjugate(a, h, i), this.transform(a, h, f, o, i, n), this.conjugate(f, o, i), this.normalize13b(f, i), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r.strip()
                    }, o.prototype.mul = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                    }, o.prototype.mulf = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), p(this, t, e)
                    }, o.prototype.imul = function(t) {
                        return this.clone().mulTo(t, this)
                    }, o.prototype.imuln = function(t) {
                        i("number" == typeof t), i(t < 67108864);
                        for (var e = 0, r = 0; r < this.length; r++) {
                            var n = (0 | this.words[r]) * t,
                                o = (67108863 & n) + (67108863 & e);
                            e >>= 26, e += n / 67108864 | 0, e += o >>> 26, this.words[r] = 67108863 & o
                        }
                        return 0 !== e && (this.words[r] = e, this.length++), this
                    }, o.prototype.muln = function(t) {
                        return this.clone().imuln(t)
                    }, o.prototype.sqr = function() {
                        return this.mul(this)
                    }, o.prototype.isqr = function() {
                        return this.imul(this.clone())
                    }, o.prototype.pow = function(t) {
                        var e = function(t) {
                            for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                                var i = r / 26 | 0,
                                    n = r % 26;
                                e[r] = (t.words[i] & 1 << n) >>> n
                            }
                            return e
                        }(t);
                        if (0 === e.length) return new o(1);
                        for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
                        if (++i < e.length)
                            for (var n = r.sqr(); i < e.length; i++, n = n.sqr()) 0 !== e[i] && (r = r.mul(n));
                        return r
                    }, o.prototype.iushln = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e, r = t % 26,
                            n = (t - r) / 26,
                            o = 67108863 >>> 26 - r << 26 - r;
                        if (0 !== r) {
                            var s = 0;
                            for (e = 0; e < this.length; e++) {
                                var a = this.words[e] & o,
                                    h = (0 | this.words[e]) - a << r;
                                this.words[e] = h | s, s = a >>> 26 - r
                            }
                            s && (this.words[e] = s, this.length++)
                        }
                        if (0 !== n) {
                            for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                            for (e = 0; e < n; e++) this.words[e] = 0;
                            this.length += n
                        }
                        return this.strip()
                    }, o.prototype.ishln = function(t) {
                        return i(0 === this.negative), this.iushln(t)
                    }, o.prototype.iushrn = function(t, e, r) {
                        var n;
                        i("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                        var o = t % 26,
                            s = Math.min((t - o) / 26, this.length),
                            a = 67108863 ^ 67108863 >>> o << o,
                            h = r;
                        if (n -= s, n = Math.max(0, n), h) {
                            for (var u = 0; u < s; u++) h.words[u] = this.words[u];
                            h.length = s
                        }
                        if (0 === s);
                        else if (this.length > s)
                            for (this.length -= s, u = 0; u < this.length; u++) this.words[u] = this.words[u + s];
                        else this.words[0] = 0, this.length = 1;
                        var l = 0;
                        for (u = this.length - 1; u >= 0 && (0 !== l || u >= n); u--) {
                            var c = 0 | this.words[u];
                            this.words[u] = l << 26 - o | c >>> o, l = c & a
                        }
                        return h && 0 !== l && (h.words[h.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
                    }, o.prototype.ishrn = function(t, e, r) {
                        return i(0 === this.negative), this.iushrn(t, e, r)
                    }, o.prototype.shln = function(t) {
                        return this.clone().ishln(t)
                    }, o.prototype.ushln = function(t) {
                        return this.clone().iushln(t)
                    }, o.prototype.shrn = function(t) {
                        return this.clone().ishrn(t)
                    }, o.prototype.ushrn = function(t) {
                        return this.clone().iushrn(t)
                    }, o.prototype.testn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        return !(this.length <= r || !(this.words[r] & n))
                    }, o.prototype.imaskn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26;
                        if (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                        if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                            var n = 67108863 ^ 67108863 >>> e << e;
                            this.words[this.length - 1] &= n
                        }
                        return this.strip()
                    }, o.prototype.maskn = function(t) {
                        return this.clone().imaskn(t)
                    }, o.prototype.iaddn = function(t) {
                        return i("number" == typeof t), i(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                    }, o.prototype._iaddn = function(t) {
                        this.words[0] += t;
                        for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                        return this.length = Math.max(this.length, e + 1), this
                    }, o.prototype.isubn = function(t) {
                        if (i("number" == typeof t), i(t < 67108864), t < 0) return this.iaddn(-t);
                        if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                        if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                        else
                            for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                        return this.strip()
                    }, o.prototype.addn = function(t) {
                        return this.clone().iaddn(t)
                    }, o.prototype.subn = function(t) {
                        return this.clone().isubn(t)
                    }, o.prototype.iabs = function() {
                        return this.negative = 0, this
                    }, o.prototype.abs = function() {
                        return this.clone().iabs()
                    }, o.prototype._ishlnsubmul = function(t, e, r) {
                        var n, o, s = t.length + r;
                        this._expand(s);
                        var a = 0;
                        for (n = 0; n < t.length; n++) {
                            o = (0 | this.words[n + r]) + a;
                            var h = (0 | t.words[n]) * e;
                            a = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[n + r] = 67108863 & o
                        }
                        for (; n < this.length - r; n++) a = (o = (0 | this.words[n + r]) + a) >> 26, this.words[n + r] = 67108863 & o;
                        if (0 === a) return this.strip();
                        for (i(-1 === a), a = 0, n = 0; n < this.length; n++) a = (o = -(0 | this.words[n]) + a) >> 26, this.words[n] = 67108863 & o;
                        return this.negative = 1, this.strip()
                    }, o.prototype._wordDiv = function(t, e) {
                        var r = (this.length, t.length),
                            i = this.clone(),
                            n = t,
                            s = 0 | n.words[n.length - 1];
                        0 != (r = 26 - this._countBits(s)) && (n = n.ushln(r), i.iushln(r), s = 0 | n.words[n.length - 1]);
                        var a, h = i.length - n.length;
                        if ("mod" !== e) {
                            (a = new o(null)).length = h + 1, a.words = new Array(a.length);
                            for (var u = 0; u < a.length; u++) a.words[u] = 0
                        }
                        var l = i.clone()._ishlnsubmul(n, 1, h);
                        0 === l.negative && (i = l, a && (a.words[h] = 1));
                        for (var c = h - 1; c >= 0; c--) {
                            var f = 67108864 * (0 | i.words[n.length + c]) + (0 | i.words[n.length + c - 1]);
                            for (f = Math.min(f / s | 0, 67108863), i._ishlnsubmul(n, f, c); 0 !== i.negative;) f--, i.negative = 0, i._ishlnsubmul(n, 1, c), i.isZero() || (i.negative ^= 1);
                            a && (a.words[c] = f)
                        }
                        return a && a.strip(), i.strip(), "div" !== e && 0 !== r && i.iushrn(r), {
                            div: a || null,
                            mod: i
                        }
                    }, o.prototype.divmod = function(t, e, r) {
                        return i(!t.isZero()), this.isZero() ? {
                            div: new o(0),
                            mod: new o(0)
                        } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e), "mod" !== e && (n = a.div.neg()), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                            div: n,
                            mod: s
                        }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e), "mod" !== e && (n = a.div.neg()), {
                            div: n,
                            mod: a.mod
                        }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                            div: a.div,
                            mod: s
                        }) : t.length > this.length || this.cmp(t) < 0 ? {
                            div: new o(0),
                            mod: this
                        } : 1 === t.length ? "div" === e ? {
                            div: this.divn(t.words[0]),
                            mod: null
                        } : "mod" === e ? {
                            div: null,
                            mod: new o(this.modn(t.words[0]))
                        } : {
                            div: this.divn(t.words[0]),
                            mod: new o(this.modn(t.words[0]))
                        } : this._wordDiv(t, e);
                        var n, s, a
                    }, o.prototype.div = function(t) {
                        return this.divmod(t, "div", !1).div
                    }, o.prototype.mod = function(t) {
                        return this.divmod(t, "mod", !1).mod
                    }, o.prototype.umod = function(t) {
                        return this.divmod(t, "mod", !0).mod
                    }, o.prototype.divRound = function(t) {
                        var e = this.divmod(t);
                        if (e.mod.isZero()) return e.div;
                        var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                            i = t.ushrn(1),
                            n = t.andln(1),
                            o = r.cmp(i);
                        return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                    }, o.prototype.modn = function(t) {
                        i(t <= 67108863);
                        for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--) r = (e * r + (0 | this.words[n])) % t;
                        return r
                    }, o.prototype.idivn = function(t) {
                        i(t <= 67108863);
                        for (var e = 0, r = this.length - 1; r >= 0; r--) {
                            var n = (0 | this.words[r]) + 67108864 * e;
                            this.words[r] = n / t | 0, e = n % t
                        }
                        return this.strip()
                    }, o.prototype.divn = function(t) {
                        return this.clone().idivn(t)
                    }, o.prototype.egcd = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n = new o(1), s = new o(0), a = new o(0), h = new o(1), u = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++u;
                        for (var l = r.clone(), c = e.clone(); !e.isZero();) {
                            for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                            if (f > 0)
                                for (e.iushrn(f); f-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(c)), n.iushrn(1), s.iushrn(1);
                            for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                            if (p > 0)
                                for (r.iushrn(p); p-- > 0;)(a.isOdd() || h.isOdd()) && (a.iadd(l), h.isub(c)), a.iushrn(1), h.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), n.isub(a), s.isub(h)) : (r.isub(e), a.isub(n), h.isub(s))
                        }
                        return {
                            a,
                            b: h,
                            gcd: r.iushln(u)
                        }
                    }, o.prototype._invmp = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n, s = new o(1), a = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                            for (var u = 0, l = 1; 0 == (e.words[0] & l) && u < 26; ++u, l <<= 1);
                            if (u > 0)
                                for (e.iushrn(u); u-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                            for (var c = 0, f = 1; 0 == (r.words[0] & f) && c < 26; ++c, f <<= 1);
                            if (c > 0)
                                for (r.iushrn(c); c-- > 0;) a.isOdd() && a.iadd(h), a.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), s.isub(a)) : (r.isub(e), a.isub(s))
                        }
                        return (n = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && n.iadd(t), n
                    }, o.prototype.gcd = function(t) {
                        if (this.isZero()) return t.abs();
                        if (t.isZero()) return this.abs();
                        var e = this.clone(),
                            r = t.clone();
                        e.negative = 0, r.negative = 0;
                        for (var i = 0; e.isEven() && r.isEven(); i++) e.iushrn(1), r.iushrn(1);
                        for (;;) {
                            for (; e.isEven();) e.iushrn(1);
                            for (; r.isEven();) r.iushrn(1);
                            var n = e.cmp(r);
                            if (n < 0) {
                                var o = e;
                                e = r, r = o
                            } else if (0 === n || 0 === r.cmpn(1)) break;
                            e.isub(r)
                        }
                        return r.iushln(i)
                    }, o.prototype.invm = function(t) {
                        return this.egcd(t).a.umod(t)
                    }, o.prototype.isEven = function() {
                        return 0 == (1 & this.words[0])
                    }, o.prototype.isOdd = function() {
                        return 1 == (1 & this.words[0])
                    }, o.prototype.andln = function(t) {
                        return this.words[0] & t
                    }, o.prototype.bincn = function(t) {
                        i("number" == typeof t);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                        for (var o = n, s = r; 0 !== o && s < this.length; s++) {
                            var a = 0 | this.words[s];
                            o = (a += o) >>> 26, a &= 67108863, this.words[s] = a
                        }
                        return 0 !== o && (this.words[s] = o, this.length++), this
                    }, o.prototype.isZero = function() {
                        return 1 === this.length && 0 === this.words[0]
                    }, o.prototype.cmpn = function(t) {
                        var e, r = t < 0;
                        if (0 !== this.negative && !r) return -1;
                        if (0 === this.negative && r) return 1;
                        if (this.strip(), this.length > 1) e = 1;
                        else {
                            r && (t = -t), i(t <= 67108863, "Number is too big");
                            var n = 0 | this.words[0];
                            e = n === t ? 0 : n < t ? -1 : 1
                        }
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.cmp = function(t) {
                        if (0 !== this.negative && 0 === t.negative) return -1;
                        if (0 === this.negative && 0 !== t.negative) return 1;
                        var e = this.ucmp(t);
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.ucmp = function(t) {
                        if (this.length > t.length) return 1;
                        if (this.length < t.length) return -1;
                        for (var e = 0, r = this.length - 1; r >= 0; r--) {
                            var i = 0 | this.words[r],
                                n = 0 | t.words[r];
                            if (i !== n) {
                                i < n ? e = -1 : i > n && (e = 1);
                                break
                            }
                        }
                        return e
                    }, o.prototype.gtn = function(t) {
                        return 1 === this.cmpn(t)
                    }, o.prototype.gt = function(t) {
                        return 1 === this.cmp(t)
                    }, o.prototype.gten = function(t) {
                        return this.cmpn(t) >= 0
                    }, o.prototype.gte = function(t) {
                        return this.cmp(t) >= 0
                    }, o.prototype.ltn = function(t) {
                        return -1 === this.cmpn(t)
                    }, o.prototype.lt = function(t) {
                        return -1 === this.cmp(t)
                    }, o.prototype.lten = function(t) {
                        return this.cmpn(t) <= 0
                    }, o.prototype.lte = function(t) {
                        return this.cmp(t) <= 0
                    }, o.prototype.eqn = function(t) {
                        return 0 === this.cmpn(t)
                    }, o.prototype.eq = function(t) {
                        return 0 === this.cmp(t)
                    }, o.red = function(t) {
                        return new E(t)
                    }, o.prototype.toRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                    }, o.prototype.fromRed = function() {
                        return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                    }, o.prototype._forceRed = function(t) {
                        return this.red = t, this
                    }, o.prototype.forceRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), this._forceRed(t)
                    }, o.prototype.redAdd = function(t) {
                        return i(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                    }, o.prototype.redIAdd = function(t) {
                        return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                    }, o.prototype.redSub = function(t) {
                        return i(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                    }, o.prototype.redISub = function(t) {
                        return i(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                    }, o.prototype.redShl = function(t) {
                        return i(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                    }, o.prototype.redMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                    }, o.prototype.redIMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                    }, o.prototype.redSqr = function() {
                        return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                    }, o.prototype.redISqr = function() {
                        return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                    }, o.prototype.redSqrt = function() {
                        return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                    }, o.prototype.redInvm = function() {
                        return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                    }, o.prototype.redNeg = function() {
                        return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                    }, o.prototype.redPow = function(t) {
                        return i(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                    };
                    var g = {
                        k256: null,
                        p224: null,
                        p192: null,
                        p25519: null
                    };

                    function v(t, e) {
                        this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                    }

                    function y() {
                        v.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                    }

                    function w() {
                        v.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                    }

                    function b() {
                        v.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                    }

                    function M() {
                        v.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                    }

                    function E(t) {
                        if ("string" == typeof t) {
                            var e = o._prime(t);
                            this.m = e.p, this.prime = e
                        } else i(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                    }

                    function A(t) {
                        E.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                    }
                    v.prototype._tmp = function() {
                        var t = new o(null);
                        return t.words = new Array(Math.ceil(this.n / 13)), t
                    }, v.prototype.ireduce = function(t) {
                        var e, r = t;
                        do {
                            this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                        } while (e > this.n);
                        var i = e < this.n ? -1 : r.ucmp(this.p);
                        return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(), r
                    }, v.prototype.split = function(t, e) {
                        t.iushrn(this.n, 0, e)
                    }, v.prototype.imulK = function(t) {
                        return t.imul(this.k)
                    }, n(y, v), y.prototype.split = function(t, e) {
                        for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++) e.words[n] = t.words[n];
                        if (e.length = i, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                        var o = t.words[9];
                        for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
                            var s = 0 | t.words[n];
                            t.words[n - 10] = (s & r) << 4 | o >>> 22, o = s
                        }
                        o >>>= 22, t.words[n - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
                    }, y.prototype.imulK = function(t) {
                        t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 0 | t.words[r];
                            e += 977 * i, t.words[r] = 67108863 & e, e = 64 * i + (e / 67108864 | 0)
                        }
                        return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                    }, n(w, v), n(b, v), n(M, v), M.prototype.imulK = function(t) {
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 19 * (0 | t.words[r]) + e,
                                n = 67108863 & i;
                            i >>>= 26, t.words[r] = n, e = i
                        }
                        return 0 !== e && (t.words[t.length++] = e), t
                    }, o._prime = function(t) {
                        if (g[t]) return g[t];
                        var e;
                        if ("k256" === t) e = new y;
                        else if ("p224" === t) e = new w;
                        else if ("p192" === t) e = new b;
                        else {
                            if ("p25519" !== t) throw new Error("Unknown prime " + t);
                            e = new M
                        }
                        return g[t] = e, e
                    }, E.prototype._verify1 = function(t) {
                        i(0 === t.negative, "red works only with positives"), i(t.red, "red works only with red numbers")
                    }, E.prototype._verify2 = function(t, e) {
                        i(0 == (t.negative | e.negative), "red works only with positives"), i(t.red && t.red === e.red, "red works only with red numbers")
                    }, E.prototype.imod = function(t) {
                        return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
                    }, E.prototype.neg = function(t) {
                        return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                    }, E.prototype.add = function(t, e) {
                        this._verify2(t, e);
                        var r = t.add(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                    }, E.prototype.iadd = function(t, e) {
                        this._verify2(t, e);
                        var r = t.iadd(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r
                    }, E.prototype.sub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.sub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
                    }, E.prototype.isub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.isub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r
                    }, E.prototype.shl = function(t, e) {
                        return this._verify1(t), this.imod(t.ushln(e))
                    }, E.prototype.imul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.imul(e))
                    }, E.prototype.mul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.mul(e))
                    }, E.prototype.isqr = function(t) {
                        return this.imul(t, t.clone())
                    }, E.prototype.sqr = function(t) {
                        return this.mul(t, t)
                    }, E.prototype.sqrt = function(t) {
                        if (t.isZero()) return t.clone();
                        var e = this.m.andln(3);
                        if (i(e % 2 == 1), 3 === e) {
                            var r = this.m.add(new o(1)).iushrn(2);
                            return this.pow(t, r)
                        }
                        for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                        i(!n.isZero());
                        var a = new o(1).toRed(this),
                            h = a.redNeg(),
                            u = this.m.subn(1).iushrn(1),
                            l = this.m.bitLength();
                        for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, u).cmp(h);) l.redIAdd(h);
                        for (var c = this.pow(l, n), f = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), p = s; 0 !== d.cmp(a);) {
                            for (var m = d, g = 0; 0 !== m.cmp(a); g++) m = m.redSqr();
                            i(g < p);
                            var v = this.pow(c, new o(1).iushln(p - g - 1));
                            f = f.redMul(v), c = v.redSqr(), d = d.redMul(c), p = g
                        }
                        return f
                    }, E.prototype.invm = function(t) {
                        var e = t._invmp(this.m);
                        return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                    }, E.prototype.pow = function(t, e) {
                        if (e.isZero()) return new o(1);
                        if (0 === e.cmpn(1)) return t.clone();
                        var r = new Array(16);
                        r[0] = new o(1).toRed(this), r[1] = t;
                        for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
                        var n = r[0],
                            s = 0,
                            a = 0,
                            h = e.bitLength() % 26;
                        for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                            for (var u = e.words[i], l = h - 1; l >= 0; l--) {
                                var c = u >> l & 1;
                                n !== r[0] && (n = this.sqr(n)), 0 !== c || 0 !== s ? (s <<= 1, s |= c, (4 == ++a || 0 === i && 0 === l) && (n = this.mul(n, r[s]), a = 0, s = 0)) : a = 0
                            }
                            h = 26
                        }
                        return n
                    }, E.prototype.convertTo = function(t) {
                        var e = t.umod(this.m);
                        return e === t ? e.clone() : e
                    }, E.prototype.convertFrom = function(t) {
                        var e = t.clone();
                        return e.red = null, e
                    }, o.mont = function(t) {
                        return new A(t)
                    }, n(A, E), A.prototype.convertTo = function(t) {
                        return this.imod(t.ushln(this.shift))
                    }, A.prototype.convertFrom = function(t) {
                        var e = this.imod(t.mul(this.rinv));
                        return e.red = null, e
                    }, A.prototype.imul = function(t, e) {
                        if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                        var r = t.imul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            o = n;
                        return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
                    }, A.prototype.mul = function(t, e) {
                        if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                        var r = t.mul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            s = n;
                        return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
                    }, A.prototype.invm = function(t) {
                        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                    }
                }(t = r.nmd(t), this)
            }, (t, e, r) => {
                "use strict";
                const i = r(10),
                    n = r(11),
                    o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                e.Buffer = h, e.SlowBuffer = function(t) {
                    return +t != t && (t = 0), h.alloc(+t)
                }, e.INSPECT_MAX_BYTES = 50;
                const s = 2147483647;

                function a(t) {
                    if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    const e = new Uint8Array(t);
                    return Object.setPrototypeOf(e, h.prototype), e
                }

                function h(t, e, r) {
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return c(t)
                    }
                    return u(t, e, r)
                }

                function u(t, e, r) {
                    if ("string" == typeof t) return function(t, e) {
                        if ("string" == typeof e && "" !== e || (e = "utf8"), !h.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                        const r = 0 | m(t, e);
                        let i = a(r);
                        const n = i.write(t, e);
                        return n !== r && (i = i.slice(0, n)), i
                    }(t, e);
                    if (ArrayBuffer.isView(t)) return function(t) {
                        if (Z(t, Uint8Array)) {
                            const e = new Uint8Array(t);
                            return d(e.buffer, e.byteOffset, e.byteLength)
                        }
                        return f(t)
                    }(t);
                    if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (Z(t, ArrayBuffer) || t && Z(t.buffer, ArrayBuffer)) return d(t, e, r);
                    if ("undefined" != typeof SharedArrayBuffer && (Z(t, SharedArrayBuffer) || t && Z(t.buffer, SharedArrayBuffer))) return d(t, e, r);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const i = t.valueOf && t.valueOf();
                    if (null != i && i !== t) return h.from(i, e, r);
                    const n = function(t) {
                        if (h.isBuffer(t)) {
                            const e = 0 | p(t.length),
                                r = a(e);
                            return 0 === r.length || t.copy(r, 0, 0, e), r
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || Y(t.length) ? a(0) : f(t) : "Buffer" === t.type && Array.isArray(t.data) ? f(t.data) : void 0
                    }(t);
                    if (n) return n;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return h.from(t[Symbol.toPrimitive]("string"), e, r);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function l(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function c(t) {
                    return l(t), a(t < 0 ? 0 : 0 | p(t))
                }

                function f(t) {
                    const e = t.length < 0 ? 0 : 0 | p(t.length),
                        r = a(e);
                    for (let i = 0; i < e; i += 1) r[i] = 255 & t[i];
                    return r
                }

                function d(t, e, r) {
                    if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let i;
                    return i = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), Object.setPrototypeOf(i, h.prototype), i
                }

                function p(t) {
                    if (t >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                    return 0 | t
                }

                function m(t, e) {
                    if (h.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || Z(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    const r = t.length,
                        i = arguments.length > 2 && !0 === arguments[2];
                    if (!i && 0 === r) return 0;
                    let n = !1;
                    for (;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                            return z(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return V(t).length;
                        default:
                            if (n) return i ? -1 : z(t).length;
                            e = ("" + e).toLowerCase(), n = !0
                    }
                }

                function g(t, e, r) {
                    let i = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return x(this, e, r);
                        case "utf8":
                        case "utf-8":
                            return F(this, e, r);
                        case "ascii":
                            return S(this, e, r);
                        case "latin1":
                        case "binary":
                            return D(this, e, r);
                        case "base64":
                            return B(this, e, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return I(this, e, r);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), i = !0
                    }
                }

                function v(t, e, r) {
                    const i = t[e];
                    t[e] = t[r], t[r] = i
                }

                function y(t, e, r, i, n) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), Y(r = +r) && (r = n ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                        if (n) return -1;
                        r = t.length - 1
                    } else if (r < 0) {
                        if (!n) return -1;
                        r = 0
                    }
                    if ("string" == typeof e && (e = h.from(e, i)), h.isBuffer(e)) return 0 === e.length ? -1 : w(t, e, r, i, n);
                    if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : w(t, [e], r, i, n);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function w(t, e, r, i, n) {
                    let o, s = 1,
                        a = t.length,
                        h = e.length;
                    if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        s = 2, a /= 2, h /= 2, r /= 2
                    }

                    function u(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s)
                    }
                    if (n) {
                        let i = -1;
                        for (o = r; o < a; o++)
                            if (u(t, o) === u(e, -1 === i ? 0 : o - i)) {
                                if (-1 === i && (i = o), o - i + 1 === h) return i * s
                            } else -1 !== i && (o -= o - i), i = -1
                    } else
                        for (r + h > a && (r = a - h), o = r; o >= 0; o--) {
                            let r = !0;
                            for (let i = 0; i < h; i++)
                                if (u(t, o + i) !== u(e, i)) {
                                    r = !1;
                                    break
                                }
                            if (r) return o
                        }
                    return -1
                }

                function b(t, e, r, i) {
                    r = Number(r) || 0;
                    const n = t.length - r;
                    i ? (i = Number(i)) > n && (i = n) : i = n;
                    const o = e.length;
                    let s;
                    for (i > o / 2 && (i = o / 2), s = 0; s < i; ++s) {
                        const i = parseInt(e.substr(2 * s, 2), 16);
                        if (Y(i)) return s;
                        t[r + s] = i
                    }
                    return s
                }

                function M(t, e, r, i) {
                    return W(z(e, t.length - r), t, r, i)
                }

                function E(t, e, r, i) {
                    return W(function(t) {
                        const e = [];
                        for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                        return e
                    }(e), t, r, i)
                }

                function A(t, e, r, i) {
                    return W(V(e), t, r, i)
                }

                function C(t, e, r, i) {
                    return W(function(t, e) {
                        let r, i, n;
                        const o = [];
                        for (let s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), i = r >> 8, n = r % 256, o.push(n), o.push(i);
                        return o
                    }(e, t.length - r), t, r, i)
                }

                function B(t, e, r) {
                    return 0 === e && r === t.length ? i.fromByteArray(t) : i.fromByteArray(t.slice(e, r))
                }

                function F(t, e, r) {
                    r = Math.min(t.length, r);
                    const i = [];
                    let n = e;
                    for (; n < r;) {
                        const e = t[n];
                        let o = null,
                            s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                        if (n + s <= r) {
                            let r, i, a, h;
                            switch (s) {
                                case 1:
                                    e < 128 && (o = e);
                                    break;
                                case 2:
                                    r = t[n + 1], 128 == (192 & r) && (h = (31 & e) << 6 | 63 & r, h > 127 && (o = h));
                                    break;
                                case 3:
                                    r = t[n + 1], i = t[n + 2], 128 == (192 & r) && 128 == (192 & i) && (h = (15 & e) << 12 | (63 & r) << 6 | 63 & i, h > 2047 && (h < 55296 || h > 57343) && (o = h));
                                    break;
                                case 4:
                                    r = t[n + 1], i = t[n + 2], a = t[n + 3], 128 == (192 & r) && 128 == (192 & i) && 128 == (192 & a) && (h = (15 & e) << 18 | (63 & r) << 12 | (63 & i) << 6 | 63 & a, h > 65535 && h < 1114112 && (o = h))
                            }
                        }
                        null === o ? (o = 65533, s = 1) : o > 65535 && (o -= 65536, i.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), i.push(o), n += s
                    }
                    return function(t) {
                        const e = t.length;
                        if (e <= _) return String.fromCharCode.apply(String, t);
                        let r = "",
                            i = 0;
                        for (; i < e;) r += String.fromCharCode.apply(String, t.slice(i, i += _));
                        return r
                    }(i)
                }
                e.kMaxLength = s, h.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        const t = new Uint8Array(1),
                            e = {
                                foo: function() {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), h.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(h.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (h.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(h.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (h.isBuffer(this)) return this.byteOffset
                    }
                }), h.poolSize = 8192, h.from = function(t, e, r) {
                    return u(t, e, r)
                }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array), h.alloc = function(t, e, r) {
                    return function(t, e, r) {
                        return l(t), t <= 0 ? a(t) : void 0 !== e ? "string" == typeof r ? a(t).fill(e, r) : a(t).fill(e) : a(t)
                    }(t, e, r)
                }, h.allocUnsafe = function(t) {
                    return c(t)
                }, h.allocUnsafeSlow = function(t) {
                    return c(t)
                }, h.isBuffer = function(t) {
                    return null != t && !0 === t._isBuffer && t !== h.prototype
                }, h.compare = function(t, e) {
                    if (Z(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), Z(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), !h.isBuffer(t) || !h.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === e) return 0;
                    let r = t.length,
                        i = e.length;
                    for (let n = 0, o = Math.min(r, i); n < o; ++n)
                        if (t[n] !== e[n]) {
                            r = t[n], i = e[n];
                            break
                        }
                    return r < i ? -1 : i < r ? 1 : 0
                }, h.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, h.concat = function(t, e) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return h.alloc(0);
                    let r;
                    if (void 0 === e)
                        for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                    const i = h.allocUnsafe(e);
                    let n = 0;
                    for (r = 0; r < t.length; ++r) {
                        let e = t[r];
                        if (Z(e, Uint8Array)) n + e.length > i.length ? (h.isBuffer(e) || (e = h.from(e)), e.copy(i, n)) : Uint8Array.prototype.set.call(i, e, n);
                        else {
                            if (!h.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                            e.copy(i, n)
                        }
                        n += e.length
                    }
                    return i
                }, h.byteLength = m, h.prototype._isBuffer = !0, h.prototype.swap16 = function() {
                    const t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let e = 0; e < t; e += 2) v(this, e, e + 1);
                    return this
                }, h.prototype.swap32 = function() {
                    const t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2);
                    return this
                }, h.prototype.swap64 = function() {
                    const t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let e = 0; e < t; e += 8) v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4);
                    return this
                }, h.prototype.toString = function() {
                    const t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? F(this, 0, t) : g.apply(this, arguments)
                }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(t) {
                    if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === h.compare(this, t)
                }, h.prototype.inspect = function() {
                    let t = "";
                    const r = e.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">"
                }, o && (h.prototype[o] = h.prototype.inspect), h.prototype.compare = function(t, e, r, i, n) {
                    if (Z(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === i && (i = 0), void 0 === n && (n = this.length), e < 0 || r > t.length || i < 0 || n > this.length) throw new RangeError("out of range index");
                    if (i >= n && e >= r) return 0;
                    if (i >= n) return -1;
                    if (e >= r) return 1;
                    if (this === t) return 0;
                    let o = (n >>>= 0) - (i >>>= 0),
                        s = (r >>>= 0) - (e >>>= 0);
                    const a = Math.min(o, s),
                        u = this.slice(i, n),
                        l = t.slice(e, r);
                    for (let t = 0; t < a; ++t)
                        if (u[t] !== l[t]) {
                            o = u[t], s = l[t];
                            break
                        }
                    return o < s ? -1 : s < o ? 1 : 0
                }, h.prototype.includes = function(t, e, r) {
                    return -1 !== this.indexOf(t, e, r)
                }, h.prototype.indexOf = function(t, e, r) {
                    return y(this, t, e, r, !0)
                }, h.prototype.lastIndexOf = function(t, e, r) {
                    return y(this, t, e, r, !1)
                }, h.prototype.write = function(t, e, r, i) {
                    if (void 0 === e) i = "utf8", r = this.length, e = 0;
                    else if (void 0 === r && "string" == typeof e) i = e, r = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === i && (i = "utf8")) : (i = r, r = void 0)
                    }
                    const n = this.length - e;
                    if ((void 0 === r || r > n) && (r = n), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    i || (i = "utf8");
                    let o = !1;
                    for (;;) switch (i) {
                        case "hex":
                            return b(this, t, e, r);
                        case "utf8":
                        case "utf-8":
                            return M(this, t, e, r);
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return E(this, t, e, r);
                        case "base64":
                            return A(this, t, e, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return C(this, t, e, r);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase(), o = !0
                    }
                }, h.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                const _ = 4096;

                function S(t, e, r) {
                    let i = "";
                    r = Math.min(t.length, r);
                    for (let n = e; n < r; ++n) i += String.fromCharCode(127 & t[n]);
                    return i
                }

                function D(t, e, r) {
                    let i = "";
                    r = Math.min(t.length, r);
                    for (let n = e; n < r; ++n) i += String.fromCharCode(t[n]);
                    return i
                }

                function x(t, e, r) {
                    const i = t.length;
                    (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
                    let n = "";
                    for (let i = e; i < r; ++i) n += X[t[i]];
                    return n
                }

                function I(t, e, r) {
                    const i = t.slice(e, r);
                    let n = "";
                    for (let t = 0; t < i.length - 1; t += 2) n += String.fromCharCode(i[t] + 256 * i[t + 1]);
                    return n
                }

                function T(t, e, r) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function R(t, e, r, i, n, o) {
                    if (!h.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > n || e < o) throw new RangeError('"value" argument is out of bounds');
                    if (r + i > t.length) throw new RangeError("Index out of range")
                }

                function N(t, e, r, i, n) {
                    q(e, i, n, t, r, 7);
                    let o = Number(e & BigInt(4294967295));
                    t[r++] = o, o >>= 8, t[r++] = o, o >>= 8, t[r++] = o, o >>= 8, t[r++] = o;
                    let s = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[r++] = s, s >>= 8, t[r++] = s, s >>= 8, t[r++] = s, s >>= 8, t[r++] = s, r
                }

                function O(t, e, r, i, n) {
                    q(e, i, n, t, r, 7);
                    let o = Number(e & BigInt(4294967295));
                    t[r + 7] = o, o >>= 8, t[r + 6] = o, o >>= 8, t[r + 5] = o, o >>= 8, t[r + 4] = o;
                    let s = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[r + 3] = s, s >>= 8, t[r + 2] = s, s >>= 8, t[r + 1] = s, s >>= 8, t[r] = s, r + 8
                }

                function U(t, e, r, i, n, o) {
                    if (r + i > t.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function k(t, e, r, i, o) {
                    return e = +e, r >>>= 0, o || U(t, 0, r, 4), n.write(t, e, r, i, 23, 4), r + 4
                }

                function L(t, e, r, i, o) {
                    return e = +e, r >>>= 0, o || U(t, 0, r, 8), n.write(t, e, r, i, 52, 8), r + 8
                }
                h.prototype.slice = function(t, e) {
                    const r = this.length;
                    (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
                    const i = this.subarray(t, e);
                    return Object.setPrototypeOf(i, h.prototype), i
                }, h.prototype.readUintLE = h.prototype.readUIntLE = function(t, e, r) {
                    t >>>= 0, e >>>= 0, r || T(t, e, this.length);
                    let i = this[t],
                        n = 1,
                        o = 0;
                    for (; ++o < e && (n *= 256);) i += this[t + o] * n;
                    return i
                }, h.prototype.readUintBE = h.prototype.readUIntBE = function(t, e, r) {
                    t >>>= 0, e >>>= 0, r || T(t, e, this.length);
                    let i = this[t + --e],
                        n = 1;
                    for (; e > 0 && (n *= 256);) i += this[t + --e] * n;
                    return i
                }, h.prototype.readUint8 = h.prototype.readUInt8 = function(t, e) {
                    return t >>>= 0, e || T(t, 1, this.length), this[t]
                }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(t, e) {
                    return t >>>= 0, e || T(t, 2, this.length), this[t] | this[t + 1] << 8
                }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(t, e) {
                    return t >>>= 0, e || T(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, h.prototype.readBigUInt64LE = J((function(t) {
                    K(t >>>= 0, "offset");
                    const e = this[t],
                        r = this[t + 7];
                    void 0 !== e && void 0 !== r || H(t, this.length - 8);
                    const i = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                        n = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
                    return BigInt(i) + (BigInt(n) << BigInt(32))
                })), h.prototype.readBigUInt64BE = J((function(t) {
                    K(t >>>= 0, "offset");
                    const e = this[t],
                        r = this[t + 7];
                    void 0 !== e && void 0 !== r || H(t, this.length - 8);
                    const i = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                        n = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
                    return (BigInt(i) << BigInt(32)) + BigInt(n)
                })), h.prototype.readIntLE = function(t, e, r) {
                    t >>>= 0, e >>>= 0, r || T(t, e, this.length);
                    let i = this[t],
                        n = 1,
                        o = 0;
                    for (; ++o < e && (n *= 256);) i += this[t + o] * n;
                    return n *= 128, i >= n && (i -= Math.pow(2, 8 * e)), i
                }, h.prototype.readIntBE = function(t, e, r) {
                    t >>>= 0, e >>>= 0, r || T(t, e, this.length);
                    let i = e,
                        n = 1,
                        o = this[t + --i];
                    for (; i > 0 && (n *= 256);) o += this[t + --i] * n;
                    return n *= 128, o >= n && (o -= Math.pow(2, 8 * e)), o
                }, h.prototype.readInt8 = function(t, e) {
                    return t >>>= 0, e || T(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, h.prototype.readInt16LE = function(t, e) {
                    t >>>= 0, e || T(t, 2, this.length);
                    const r = this[t] | this[t + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, h.prototype.readInt16BE = function(t, e) {
                    t >>>= 0, e || T(t, 2, this.length);
                    const r = this[t + 1] | this[t] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, h.prototype.readInt32LE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, h.prototype.readInt32BE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, h.prototype.readBigInt64LE = J((function(t) {
                    K(t >>>= 0, "offset");
                    const e = this[t],
                        r = this[t + 7];
                    void 0 !== e && void 0 !== r || H(t, this.length - 8);
                    const i = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
                    return (BigInt(i) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
                })), h.prototype.readBigInt64BE = J((function(t) {
                    K(t >>>= 0, "offset");
                    const e = this[t],
                        r = this[t + 7];
                    void 0 !== e && void 0 !== r || H(t, this.length - 8);
                    const i = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                    return (BigInt(i) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r)
                })), h.prototype.readFloatLE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), n.read(this, t, !0, 23, 4)
                }, h.prototype.readFloatBE = function(t, e) {
                    return t >>>= 0, e || T(t, 4, this.length), n.read(this, t, !1, 23, 4)
                }, h.prototype.readDoubleLE = function(t, e) {
                    return t >>>= 0, e || T(t, 8, this.length), n.read(this, t, !0, 52, 8)
                }, h.prototype.readDoubleBE = function(t, e) {
                    return t >>>= 0, e || T(t, 8, this.length), n.read(this, t, !1, 52, 8)
                }, h.prototype.writeUintLE = h.prototype.writeUIntLE = function(t, e, r, i) {
                    t = +t, e >>>= 0, r >>>= 0, i || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                    let n = 1,
                        o = 0;
                    for (this[e] = 255 & t; ++o < r && (n *= 256);) this[e + o] = t / n & 255;
                    return e + r
                }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(t, e, r, i) {
                    t = +t, e >>>= 0, r >>>= 0, i || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                    let n = r - 1,
                        o = 1;
                    for (this[e + n] = 255 & t; --n >= 0 && (o *= 256);) this[e + n] = t / o & 255;
                    return e + r
                }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
                }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
                }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, h.prototype.writeBigUInt64LE = J((function(t, e = 0) {
                    return N(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), h.prototype.writeBigUInt64BE = J((function(t, e = 0) {
                    return O(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), h.prototype.writeIntLE = function(t, e, r, i) {
                    if (t = +t, e >>>= 0, !i) {
                        const i = Math.pow(2, 8 * r - 1);
                        R(this, t, e, r, i - 1, -i)
                    }
                    let n = 0,
                        o = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++n < r && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + n - 1] && (s = 1), this[e + n] = (t / o >> 0) - s & 255;
                    return e + r
                }, h.prototype.writeIntBE = function(t, e, r, i) {
                    if (t = +t, e >>>= 0, !i) {
                        const i = Math.pow(2, 8 * r - 1);
                        R(this, t, e, r, i - 1, -i)
                    }
                    let n = r - 1,
                        o = 1,
                        s = 0;
                    for (this[e + n] = 255 & t; --n >= 0 && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + n + 1] && (s = 1), this[e + n] = (t / o >> 0) - s & 255;
                    return e + r
                }, h.prototype.writeInt8 = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, h.prototype.writeInt16LE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, h.prototype.writeInt16BE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, h.prototype.writeInt32LE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
                }, h.prototype.writeInt32BE = function(t, e, r) {
                    return t = +t, e >>>= 0, r || R(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, h.prototype.writeBigInt64LE = J((function(t, e = 0) {
                    return N(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), h.prototype.writeBigInt64BE = J((function(t, e = 0) {
                    return O(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), h.prototype.writeFloatLE = function(t, e, r) {
                    return k(this, t, e, !0, r)
                }, h.prototype.writeFloatBE = function(t, e, r) {
                    return k(this, t, e, !1, r)
                }, h.prototype.writeDoubleLE = function(t, e, r) {
                    return L(this, t, e, !0, r)
                }, h.prototype.writeDoubleBE = function(t, e, r) {
                    return L(this, t, e, !1, r)
                }, h.prototype.copy = function(t, e, r, i) {
                    if (!h.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (r || (r = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < r && (i = r), i === r) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r);
                    const n = i - r;
                    return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, i) : Uint8Array.prototype.set.call(t, this.subarray(r, i), e), n
                }, h.prototype.fill = function(t, e, r, i) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (i = e, e = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !h.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        if (1 === t.length) {
                            const e = t.charCodeAt(0);
                            ("utf8" === i && e < 128 || "latin1" === i) && (t = e)
                        }
                    } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                    if (r <= e) return this;
                    let n;
                    if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                        for (n = e; n < r; ++n) this[n] = t;
                    else {
                        const o = h.isBuffer(t) ? t : h.from(t, i),
                            s = o.length;
                        if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (n = 0; n < r - e; ++n) this[n + e] = o[n % s]
                    }
                    return this
                };
                const P = {};

                function j(t, e, r) {
                    P[t] = class extends r {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: e.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                        }
                        get code() {
                            return t
                        }
                        set code(t) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: t,
                                writable: !0
                            })
                        }
                        toString() {
                            return `${this.name} [${t}]: ${this.message}`
                        }
                    }
                }

                function $(t) {
                    let e = "",
                        r = t.length;
                    const i = "-" === t[0] ? 1 : 0;
                    for (; r >= i + 4; r -= 3) e = `_${t.slice(r-3,r)}${e}`;
                    return `${t.slice(0,r)}${e}`
                }

                function q(t, e, r, i, n, o) {
                    if (t > r || t < e) {
                        const i = "bigint" == typeof e ? "n" : "";
                        let n;
                        throw n = o > 3 ? 0 === e || e === BigInt(0) ? `>= 0${i} and < 2${i} ** ${8*(o+1)}${i}` : `>= -(2${i} ** ${8*(o+1)-1}${i}) and < 2 ** ${8*(o+1)-1}${i}` : `>= ${e}${i} and <= ${r}${i}`, new P.ERR_OUT_OF_RANGE("value", n, t)
                    }! function(t, e, r) {
                        K(e, "offset"), void 0 !== t[e] && void 0 !== t[e + r] || H(e, t.length - (r + 1))
                    }(i, n, o)
                }

                function K(t, e) {
                    if ("number" != typeof t) throw new P.ERR_INVALID_ARG_TYPE(e, "number", t)
                }

                function H(t, e, r) {
                    if (Math.floor(t) !== t) throw K(t, r), new P.ERR_OUT_OF_RANGE(r || "offset", "an integer", t);
                    if (e < 0) throw new P.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new P.ERR_OUT_OF_RANGE(r || "offset", `>= ${r?1:0} and <= ${e}`, t)
                }
                j("ERR_BUFFER_OUT_OF_BOUNDS", (function(t) {
                    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
                }), RangeError), j("ERR_INVALID_ARG_TYPE", (function(t, e) {
                    return `The "${t}" argument must be of type number. Received type ${typeof e}`
                }), TypeError), j("ERR_OUT_OF_RANGE", (function(t, e, r) {
                    let i = `The value of "${t}" is out of range.`,
                        n = r;
                    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? n = $(String(r)) : "bigint" == typeof r && (n = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (n = $(n)), n += "n"), i += ` It must be ${e}. Received ${n}`, i
                }), RangeError);
                const G = /[^+/0-9A-Za-z-_]/g;

                function z(t, e) {
                    let r;
                    e = e || 1 / 0;
                    const i = t.length;
                    let n = null;
                    const o = [];
                    for (let s = 0; s < i; ++s) {
                        if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
                            if (!n) {
                                if (r > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === i) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                n = r;
                                continue
                            }
                            if (r < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), n = r;
                                continue
                            }
                            r = 65536 + (n - 55296 << 10 | r - 56320)
                        } else n && (e -= 3) > -1 && o.push(239, 191, 189);
                        if (n = null, r < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(r)
                        } else if (r < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return o
                }

                function V(t) {
                    return i.toByteArray(function(t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(G, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function W(t, e, r, i) {
                    let n;
                    for (n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n) e[n + r] = t[n];
                    return n
                }

                function Z(t, e) {
                    return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
                }

                function Y(t) {
                    return t != t
                }
                const X = function() {
                    const t = "0123456789abcdef",
                        e = new Array(256);
                    for (let r = 0; r < 16; ++r) {
                        const i = 16 * r;
                        for (let n = 0; n < 16; ++n) e[i + n] = t[r] + t[n]
                    }
                    return e
                }();

                function J(t) {
                    return "undefined" == typeof BigInt ? Q : t
                }

                function Q() {
                    throw new Error("BigInt not supported")
                }
            }, (t, e) => {
                "use strict";
                e.byteLength = function(t) {
                    var e = h(t),
                        r = e[0],
                        i = e[1];
                    return 3 * (r + i) / 4 - i
                }, e.toByteArray = function(t) {
                    var e, r, o = h(t),
                        s = o[0],
                        a = o[1],
                        u = new n(function(t, e, r) {
                            return 3 * (e + r) / 4 - r
                        }(0, s, a)),
                        l = 0,
                        c = a > 0 ? s - 4 : s;
                    for (r = 0; r < c; r += 4) e = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 | i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)], u[l++] = e >> 16 & 255, u[l++] = e >> 8 & 255, u[l++] = 255 & e;
                    return 2 === a && (e = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4, u[l++] = 255 & e), 1 === a && (e = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 | i[t.charCodeAt(r + 2)] >> 2, u[l++] = e >> 8 & 255, u[l++] = 255 & e), u
                }, e.fromByteArray = function(t) {
                    for (var e, i = t.length, n = i % 3, o = [], s = 16383, a = 0, h = i - n; a < h; a += s) o.push(u(t, a, a + s > h ? h : a + s));
                    return 1 === n ? (e = t[i - 1], o.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === n && (e = (t[i - 2] << 8) + t[i - 1], o.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=")), o.join("")
                };
                for (var r = [], i = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s) r[s] = o[s], i[o.charCodeAt(s)] = s;

                function h(t) {
                    var e = t.length;
                    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var r = t.indexOf("=");
                    return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
                }

                function u(t, e, i) {
                    for (var n, o, s = [], a = e; a < i; a += 3) n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(r[(o = n) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
                    return s.join("")
                }
                i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
            }, (t, e) => {
                e.read = function(t, e, r, i, n) {
                    var o, s, a = 8 * n - i - 1,
                        h = (1 << a) - 1,
                        u = h >> 1,
                        l = -7,
                        c = r ? n - 1 : 0,
                        f = r ? -1 : 1,
                        d = t[e + c];
                    for (c += f, o = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; o = 256 * o + t[e + c], c += f, l -= 8);
                    for (s = o & (1 << -l) - 1, o >>= -l, l += i; l > 0; s = 256 * s + t[e + c], c += f, l -= 8);
                    if (0 === o) o = 1 - u;
                    else {
                        if (o === h) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                        s += Math.pow(2, i), o -= u
                    }
                    return (d ? -1 : 1) * s * Math.pow(2, o - i)
                }, e.write = function(t, e, r, i, n, o) {
                    var s, a, h, u = 8 * o - n - 1,
                        l = (1 << u) - 1,
                        c = l >> 1,
                        f = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        d = i ? 0 : o - 1,
                        p = i ? 1 : -1,
                        m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), (e += s + c >= 1 ? f / h : f * Math.pow(2, 1 - c)) * h >= 2 && (s++, h /= 2), s + c >= l ? (a = 0, s = l) : s + c >= 1 ? (a = (e * h - 1) * Math.pow(2, n), s += c) : (a = e * Math.pow(2, c - 1) * Math.pow(2, n), s = 0)); n >= 8; t[r + d] = 255 & a, d += p, a /= 256, n -= 8);
                    for (s = s << n | a, u += n; u > 0; t[r + d] = 255 & s, d += p, s /= 256, u -= 8);
                    t[r + d - p] |= 128 * m
                }
            }, (t, e, r) => {
                var i = r(13),
                    n = r(14);
                t.exports = function(t) {
                    if ("string" == typeof t || "number" == typeof t) {
                        var e = new i(1),
                            r = String(t).toLowerCase().trim(),
                            o = "0x" === r.substr(0, 2) || "-0x" === r.substr(0, 3),
                            s = n(r);
                        if ("-" === s.substr(0, 1) && (s = n(s.slice(1)), e = new i(-1, 10)), !(s = "" === s ? "0" : s).match(/^-?[0-9]+$/) && s.match(/^[0-9A-Fa-f]+$/) || s.match(/^[a-fA-F]+$/) || !0 === o && s.match(/^[0-9A-Fa-f]+$/)) return new i(s, 16).mul(e);
                        if ((s.match(/^-?[0-9]+$/) || "" === s) && !1 === o) return new i(s, 10).mul(e)
                    } else if ("object" == typeof t && t.toString && !t.pop && !t.push && t.toString(10).match(/^-?[0-9]+$/) && (t.mul || t.dividedToIntegerBy)) return new i(t.toString(10), 10);
                    throw new Error("[number-to-bn] while converting number " + JSON.stringify(t) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.")
                }
            }, function(t, e, r) {
                ! function(t, e) {
                    "use strict";

                    function i(t, e) {
                        if (!t) throw new Error(e || "Assertion failed")
                    }

                    function n(t, e) {
                        t.super_ = e;
                        var r = function() {};
                        r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                    }

                    function o(t, e, r) {
                        if (o.isBN(t)) return t;
                        this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
                    }
                    var s;
                    "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                    try {
                        s = r(9).Buffer
                    } catch (t) {}

                    function a(t, e, r) {
                        for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
                            var s = t.charCodeAt(o) - 48;
                            i <<= 4, i |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
                        }
                        return i
                    }

                    function h(t, e, r, i) {
                        for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
                            var a = t.charCodeAt(s) - 48;
                            n *= i, n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
                        }
                        return n
                    }
                    o.isBN = function(t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function(t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function(t, e) {
                        return t.cmp(e) < 0 ? t : e
                    }, o.prototype._init = function(t, e, r) {
                        if ("number" == typeof t) return this._initNumber(t, e, r);
                        if ("object" == typeof t) return this._initArray(t, e, r);
                        "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
                        var n = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initNumber = function(t, e, r) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (i(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initArray = function(t, e, r) {
                        if (i("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                        for (var n = 0; n < this.length; n++) this.words[n] = 0;
                        var o, s, a = 0;
                        if ("be" === r)
                            for (n = t.length - 1, o = 0; n >= 0; n -= 3) s = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        else if ("le" === r)
                            for (n = 0, o = 0; n < t.length; n += 3) s = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
                        return this.strip()
                    }, o.prototype._parseHex = function(t, e) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                        for (var r = 0; r < this.length; r++) this.words[r] = 0;
                        var i, n, o = 0;
                        for (r = t.length - 6, i = 0; r >= e; r -= 6) n = a(t, r, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, i++);
                        r + 6 !== e && (n = a(t, e, r + 6), this.words[i] |= n << o & 67108863, this.words[i + 1] |= n >>> 26 - o & 4194303), this.strip()
                    }, o.prototype._parseBase = function(t, e, r) {
                        this.words = [0], this.length = 1;
                        for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
                        i--, n = n / e | 0;
                        for (var o = t.length - r, s = o % i, a = Math.min(o, o - s) + r, u = 0, l = r; l < a; l += i) u = h(t, l, l + i, e), this.imuln(n), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                        if (0 !== s) {
                            var c = 1;
                            for (u = h(t, l, t.length, e), l = 0; l < s; l++) c *= e;
                            this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                        }
                    }, o.prototype.copy = function(t) {
                        t.words = new Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype.clone = function() {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function(t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype.strip = function() {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function() {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, o.prototype.inspect = function() {
                        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                    };
                    var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                        l = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                    function f(t, e, r) {
                        r.negative = e.negative ^ t.negative;
                        var i = t.length + e.length | 0;
                        r.length = i, i = i - 1 | 0;
                        var n = 0 | t.words[0],
                            o = 0 | e.words[0],
                            s = n * o,
                            a = 67108863 & s,
                            h = s / 67108864 | 0;
                        r.words[0] = a;
                        for (var u = 1; u < i; u++) {
                            for (var l = h >>> 26, c = 67108863 & h, f = Math.min(u, e.length - 1), d = Math.max(0, u - t.length + 1); d <= f; d++) {
                                var p = u - d | 0;
                                l += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + c) / 67108864 | 0, c = 67108863 & s
                            }
                            r.words[u] = 0 | c, h = 0 | l
                        }
                        return 0 !== h ? r.words[u] = 0 | h : r.length--, r.strip()
                    }
                    o.prototype.toString = function(t, e) {
                        var r;
                        if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                            r = "";
                            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                                var a = this.words[s],
                                    h = (16777215 & (a << n | o)).toString(16);
                                r = 0 != (o = a >>> 24 - n & 16777215) || s !== this.length - 1 ? u[6 - h.length] + h + r : h + r, (n += 2) >= 26 && (n -= 26, s--)
                            }
                            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        if (t === (0 | t) && t >= 2 && t <= 36) {
                            var f = l[t],
                                d = c[t];
                            r = "";
                            var p = this.clone();
                            for (p.negative = 0; !p.isZero();) {
                                var m = p.modn(d).toString(t);
                                r = (p = p.idivn(d)).isZero() ? m + r : u[f - m.length] + m + r
                            }
                            for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                            return 0 !== this.negative && (r = "-" + r), r
                        }
                        i(!1, "Base should be between 2 and 36")
                    }, o.prototype.toNumber = function() {
                        var t = this.words[0];
                        return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                    }, o.prototype.toJSON = function() {
                        return this.toString(16)
                    }, o.prototype.toBuffer = function(t, e) {
                        return i(void 0 !== s), this.toArrayLike(s, t, e)
                    }, o.prototype.toArray = function(t, e) {
                        return this.toArrayLike(Array, t, e)
                    }, o.prototype.toArrayLike = function(t, e, r) {
                        var n = this.byteLength(),
                            o = r || Math.max(1, n);
                        i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0"), this.strip();
                        var s, a, h = "le" === e,
                            u = new t(o),
                            l = this.clone();
                        if (h) {
                            for (a = 0; !l.isZero(); a++) s = l.andln(255), l.iushrn(8), u[a] = s;
                            for (; a < o; a++) u[a] = 0
                        } else {
                            for (a = 0; a < o - n; a++) u[a] = 0;
                            for (a = 0; !l.isZero(); a++) s = l.andln(255), l.iushrn(8), u[o - a - 1] = s
                        }
                        return u
                    }, Math.clz32 ? o.prototype._countBits = function(t) {
                        return 32 - Math.clz32(t)
                    } : o.prototype._countBits = function(t) {
                        var e = t,
                            r = 0;
                        return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
                    }, o.prototype._zeroBits = function(t) {
                        if (0 === t) return 26;
                        var e = t,
                            r = 0;
                        return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r
                    }, o.prototype.bitLength = function() {
                        var t = this.words[this.length - 1],
                            e = this._countBits(t);
                        return 26 * (this.length - 1) + e
                    }, o.prototype.zeroBits = function() {
                        if (this.isZero()) return 0;
                        for (var t = 0, e = 0; e < this.length; e++) {
                            var r = this._zeroBits(this.words[e]);
                            if (t += r, 26 !== r) break
                        }
                        return t
                    }, o.prototype.byteLength = function() {
                        return Math.ceil(this.bitLength() / 8)
                    }, o.prototype.toTwos = function(t) {
                        return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                    }, o.prototype.fromTwos = function(t) {
                        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                    }, o.prototype.isNeg = function() {
                        return 0 !== this.negative
                    }, o.prototype.neg = function() {
                        return this.clone().ineg()
                    }, o.prototype.ineg = function() {
                        return this.isZero() || (this.negative ^= 1), this
                    }, o.prototype.iuor = function(t) {
                        for (; this.length < t.length;) this.words[this.length++] = 0;
                        for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                        return this.strip()
                    }, o.prototype.ior = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuor(t)
                    }, o.prototype.or = function(t) {
                        return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                    }, o.prototype.uor = function(t) {
                        return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                    }, o.prototype.iuand = function(t) {
                        var e;
                        e = this.length > t.length ? t : this;
                        for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                        return this.length = e.length, this.strip()
                    }, o.prototype.iand = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuand(t)
                    }, o.prototype.and = function(t) {
                        return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                    }, o.prototype.uand = function(t) {
                        return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                    }, o.prototype.iuxor = function(t) {
                        var e, r;
                        this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                        for (var i = 0; i < r.length; i++) this.words[i] = e.words[i] ^ r.words[i];
                        if (this !== e)
                            for (; i < e.length; i++) this.words[i] = e.words[i];
                        return this.length = e.length, this.strip()
                    }, o.prototype.ixor = function(t) {
                        return i(0 == (this.negative | t.negative)), this.iuxor(t)
                    }, o.prototype.xor = function(t) {
                        return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                    }, o.prototype.uxor = function(t) {
                        return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                    }, o.prototype.inotn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = 0 | Math.ceil(t / 26),
                            r = t % 26;
                        this._expand(e), r > 0 && e--;
                        for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                        return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this.strip()
                    }, o.prototype.notn = function(t) {
                        return this.clone().inotn(t)
                    }, o.prototype.setn = function(t, e) {
                        i("number" == typeof t && t >= 0);
                        var r = t / 26 | 0,
                            n = t % 26;
                        return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << n : this.words[r] & ~(1 << n), this.strip()
                    }, o.prototype.iadd = function(t) {
                        var e, r, i;
                        if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                        if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                        this.length > t.length ? (r = this, i = t) : (r = t, i = this);
                        for (var n = 0, o = 0; o < i.length; o++) e = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        for (; 0 !== n && o < r.length; o++) e = (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                        if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                        else if (r !== this)
                            for (; o < r.length; o++) this.words[o] = r.words[o];
                        return this
                    }, o.prototype.add = function(t) {
                        var e;
                        return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                    }, o.prototype.isub = function(t) {
                        if (0 !== t.negative) {
                            t.negative = 0;
                            var e = this.iadd(t);
                            return t.negative = 1, e._normSign()
                        }
                        if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                        var r, i, n = this.cmp(t);
                        if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                        n > 0 ? (r = this, i = t) : (r = t, i = this);
                        for (var o = 0, s = 0; s < i.length; s++) o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        for (; 0 !== o && s < r.length; s++) o = (e = (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
                        if (0 === o && s < r.length && r !== this)
                            for (; s < r.length; s++) this.words[s] = r.words[s];
                        return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip()
                    }, o.prototype.sub = function(t) {
                        return this.clone().isub(t)
                    };
                    var d = function(t, e, r) {
                        var i, n, o, s = t.words,
                            a = e.words,
                            h = r.words,
                            u = 0,
                            l = 0 | s[0],
                            c = 8191 & l,
                            f = l >>> 13,
                            d = 0 | s[1],
                            p = 8191 & d,
                            m = d >>> 13,
                            g = 0 | s[2],
                            v = 8191 & g,
                            y = g >>> 13,
                            w = 0 | s[3],
                            b = 8191 & w,
                            M = w >>> 13,
                            E = 0 | s[4],
                            A = 8191 & E,
                            C = E >>> 13,
                            B = 0 | s[5],
                            F = 8191 & B,
                            _ = B >>> 13,
                            S = 0 | s[6],
                            D = 8191 & S,
                            x = S >>> 13,
                            I = 0 | s[7],
                            T = 8191 & I,
                            R = I >>> 13,
                            N = 0 | s[8],
                            O = 8191 & N,
                            U = N >>> 13,
                            k = 0 | s[9],
                            L = 8191 & k,
                            P = k >>> 13,
                            j = 0 | a[0],
                            $ = 8191 & j,
                            q = j >>> 13,
                            K = 0 | a[1],
                            H = 8191 & K,
                            G = K >>> 13,
                            z = 0 | a[2],
                            V = 8191 & z,
                            W = z >>> 13,
                            Z = 0 | a[3],
                            Y = 8191 & Z,
                            X = Z >>> 13,
                            J = 0 | a[4],
                            Q = 8191 & J,
                            tt = J >>> 13,
                            et = 0 | a[5],
                            rt = 8191 & et,
                            it = et >>> 13,
                            nt = 0 | a[6],
                            ot = 8191 & nt,
                            st = nt >>> 13,
                            at = 0 | a[7],
                            ht = 8191 & at,
                            ut = at >>> 13,
                            lt = 0 | a[8],
                            ct = 8191 & lt,
                            ft = lt >>> 13,
                            dt = 0 | a[9],
                            pt = 8191 & dt,
                            mt = dt >>> 13;
                        r.negative = t.negative ^ e.negative, r.length = 19;
                        var gt = (u + (i = Math.imul(c, $)) | 0) + ((8191 & (n = (n = Math.imul(c, q)) + Math.imul(f, $) | 0)) << 13) | 0;
                        u = ((o = Math.imul(f, q)) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, i = Math.imul(p, $), n = (n = Math.imul(p, q)) + Math.imul(m, $) | 0, o = Math.imul(m, q);
                        var vt = (u + (i = i + Math.imul(c, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, G) | 0) + Math.imul(f, H) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, G) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, i = Math.imul(v, $), n = (n = Math.imul(v, q)) + Math.imul(y, $) | 0, o = Math.imul(y, q), i = i + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, G) | 0) + Math.imul(m, H) | 0, o = o + Math.imul(m, G) | 0;
                        var yt = (u + (i = i + Math.imul(c, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, W) | 0) + Math.imul(f, V) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, W) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, i = Math.imul(b, $), n = (n = Math.imul(b, q)) + Math.imul(M, $) | 0, o = Math.imul(M, q), i = i + Math.imul(v, H) | 0, n = (n = n + Math.imul(v, G) | 0) + Math.imul(y, H) | 0, o = o + Math.imul(y, G) | 0, i = i + Math.imul(p, V) | 0, n = (n = n + Math.imul(p, W) | 0) + Math.imul(m, V) | 0, o = o + Math.imul(m, W) | 0;
                        var wt = (u + (i = i + Math.imul(c, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, X) | 0) + Math.imul(f, Y) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, X) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, i = Math.imul(A, $), n = (n = Math.imul(A, q)) + Math.imul(C, $) | 0, o = Math.imul(C, q), i = i + Math.imul(b, H) | 0, n = (n = n + Math.imul(b, G) | 0) + Math.imul(M, H) | 0, o = o + Math.imul(M, G) | 0, i = i + Math.imul(v, V) | 0, n = (n = n + Math.imul(v, W) | 0) + Math.imul(y, V) | 0, o = o + Math.imul(y, W) | 0, i = i + Math.imul(p, Y) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(m, Y) | 0, o = o + Math.imul(m, X) | 0;
                        var bt = (u + (i = i + Math.imul(c, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, tt) | 0) + Math.imul(f, Q) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, tt) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, i = Math.imul(F, $), n = (n = Math.imul(F, q)) + Math.imul(_, $) | 0, o = Math.imul(_, q), i = i + Math.imul(A, H) | 0, n = (n = n + Math.imul(A, G) | 0) + Math.imul(C, H) | 0, o = o + Math.imul(C, G) | 0, i = i + Math.imul(b, V) | 0, n = (n = n + Math.imul(b, W) | 0) + Math.imul(M, V) | 0, o = o + Math.imul(M, W) | 0, i = i + Math.imul(v, Y) | 0, n = (n = n + Math.imul(v, X) | 0) + Math.imul(y, Y) | 0, o = o + Math.imul(y, X) | 0, i = i + Math.imul(p, Q) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
                        var Mt = (u + (i = i + Math.imul(c, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, it) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, it) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, i = Math.imul(D, $), n = (n = Math.imul(D, q)) + Math.imul(x, $) | 0, o = Math.imul(x, q), i = i + Math.imul(F, H) | 0, n = (n = n + Math.imul(F, G) | 0) + Math.imul(_, H) | 0, o = o + Math.imul(_, G) | 0, i = i + Math.imul(A, V) | 0, n = (n = n + Math.imul(A, W) | 0) + Math.imul(C, V) | 0, o = o + Math.imul(C, W) | 0, i = i + Math.imul(b, Y) | 0, n = (n = n + Math.imul(b, X) | 0) + Math.imul(M, Y) | 0, o = o + Math.imul(M, X) | 0, i = i + Math.imul(v, Q) | 0, n = (n = n + Math.imul(v, tt) | 0) + Math.imul(y, Q) | 0, o = o + Math.imul(y, tt) | 0, i = i + Math.imul(p, rt) | 0, n = (n = n + Math.imul(p, it) | 0) + Math.imul(m, rt) | 0, o = o + Math.imul(m, it) | 0;
                        var Et = (u + (i = i + Math.imul(c, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, st) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, i = Math.imul(T, $), n = (n = Math.imul(T, q)) + Math.imul(R, $) | 0, o = Math.imul(R, q), i = i + Math.imul(D, H) | 0, n = (n = n + Math.imul(D, G) | 0) + Math.imul(x, H) | 0, o = o + Math.imul(x, G) | 0, i = i + Math.imul(F, V) | 0, n = (n = n + Math.imul(F, W) | 0) + Math.imul(_, V) | 0, o = o + Math.imul(_, W) | 0, i = i + Math.imul(A, Y) | 0, n = (n = n + Math.imul(A, X) | 0) + Math.imul(C, Y) | 0, o = o + Math.imul(C, X) | 0, i = i + Math.imul(b, Q) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(M, Q) | 0, o = o + Math.imul(M, tt) | 0, i = i + Math.imul(v, rt) | 0, n = (n = n + Math.imul(v, it) | 0) + Math.imul(y, rt) | 0, o = o + Math.imul(y, it) | 0, i = i + Math.imul(p, ot) | 0, n = (n = n + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
                        var At = (u + (i = i + Math.imul(c, ht) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ut) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ut) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, i = Math.imul(O, $), n = (n = Math.imul(O, q)) + Math.imul(U, $) | 0, o = Math.imul(U, q), i = i + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, G) | 0) + Math.imul(R, H) | 0, o = o + Math.imul(R, G) | 0, i = i + Math.imul(D, V) | 0, n = (n = n + Math.imul(D, W) | 0) + Math.imul(x, V) | 0, o = o + Math.imul(x, W) | 0, i = i + Math.imul(F, Y) | 0, n = (n = n + Math.imul(F, X) | 0) + Math.imul(_, Y) | 0, o = o + Math.imul(_, X) | 0, i = i + Math.imul(A, Q) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(C, Q) | 0, o = o + Math.imul(C, tt) | 0, i = i + Math.imul(b, rt) | 0, n = (n = n + Math.imul(b, it) | 0) + Math.imul(M, rt) | 0, o = o + Math.imul(M, it) | 0, i = i + Math.imul(v, ot) | 0, n = (n = n + Math.imul(v, st) | 0) + Math.imul(y, ot) | 0, o = o + Math.imul(y, st) | 0, i = i + Math.imul(p, ht) | 0, n = (n = n + Math.imul(p, ut) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, ut) | 0;
                        var Ct = (u + (i = i + Math.imul(c, ct) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ft) | 0) + Math.imul(f, ct) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, ft) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, i = Math.imul(L, $), n = (n = Math.imul(L, q)) + Math.imul(P, $) | 0, o = Math.imul(P, q), i = i + Math.imul(O, H) | 0, n = (n = n + Math.imul(O, G) | 0) + Math.imul(U, H) | 0, o = o + Math.imul(U, G) | 0, i = i + Math.imul(T, V) | 0, n = (n = n + Math.imul(T, W) | 0) + Math.imul(R, V) | 0, o = o + Math.imul(R, W) | 0, i = i + Math.imul(D, Y) | 0, n = (n = n + Math.imul(D, X) | 0) + Math.imul(x, Y) | 0, o = o + Math.imul(x, X) | 0, i = i + Math.imul(F, Q) | 0, n = (n = n + Math.imul(F, tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(A, rt) | 0, n = (n = n + Math.imul(A, it) | 0) + Math.imul(C, rt) | 0, o = o + Math.imul(C, it) | 0, i = i + Math.imul(b, ot) | 0, n = (n = n + Math.imul(b, st) | 0) + Math.imul(M, ot) | 0, o = o + Math.imul(M, st) | 0, i = i + Math.imul(v, ht) | 0, n = (n = n + Math.imul(v, ut) | 0) + Math.imul(y, ht) | 0, o = o + Math.imul(y, ut) | 0, i = i + Math.imul(p, ct) | 0, n = (n = n + Math.imul(p, ft) | 0) + Math.imul(m, ct) | 0, o = o + Math.imul(m, ft) | 0;
                        var Bt = (u + (i = i + Math.imul(c, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(f, mt) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, i = Math.imul(L, H), n = (n = Math.imul(L, G)) + Math.imul(P, H) | 0, o = Math.imul(P, G), i = i + Math.imul(O, V) | 0, n = (n = n + Math.imul(O, W) | 0) + Math.imul(U, V) | 0, o = o + Math.imul(U, W) | 0, i = i + Math.imul(T, Y) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(R, Y) | 0, o = o + Math.imul(R, X) | 0, i = i + Math.imul(D, Q) | 0, n = (n = n + Math.imul(D, tt) | 0) + Math.imul(x, Q) | 0, o = o + Math.imul(x, tt) | 0, i = i + Math.imul(F, rt) | 0, n = (n = n + Math.imul(F, it) | 0) + Math.imul(_, rt) | 0, o = o + Math.imul(_, it) | 0, i = i + Math.imul(A, ot) | 0, n = (n = n + Math.imul(A, st) | 0) + Math.imul(C, ot) | 0, o = o + Math.imul(C, st) | 0, i = i + Math.imul(b, ht) | 0, n = (n = n + Math.imul(b, ut) | 0) + Math.imul(M, ht) | 0, o = o + Math.imul(M, ut) | 0, i = i + Math.imul(v, ct) | 0, n = (n = n + Math.imul(v, ft) | 0) + Math.imul(y, ct) | 0, o = o + Math.imul(y, ft) | 0;
                        var Ft = (u + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(m, mt) | 0) + (n >>> 13) | 0) + (Ft >>> 26) | 0, Ft &= 67108863, i = Math.imul(L, V), n = (n = Math.imul(L, W)) + Math.imul(P, V) | 0, o = Math.imul(P, W), i = i + Math.imul(O, Y) | 0, n = (n = n + Math.imul(O, X) | 0) + Math.imul(U, Y) | 0, o = o + Math.imul(U, X) | 0, i = i + Math.imul(T, Q) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(R, Q) | 0, o = o + Math.imul(R, tt) | 0, i = i + Math.imul(D, rt) | 0, n = (n = n + Math.imul(D, it) | 0) + Math.imul(x, rt) | 0, o = o + Math.imul(x, it) | 0, i = i + Math.imul(F, ot) | 0, n = (n = n + Math.imul(F, st) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, st) | 0, i = i + Math.imul(A, ht) | 0, n = (n = n + Math.imul(A, ut) | 0) + Math.imul(C, ht) | 0, o = o + Math.imul(C, ut) | 0, i = i + Math.imul(b, ct) | 0, n = (n = n + Math.imul(b, ft) | 0) + Math.imul(M, ct) | 0, o = o + Math.imul(M, ft) | 0;
                        var _t = (u + (i = i + Math.imul(v, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(v, mt) | 0) + Math.imul(y, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(y, mt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, i = Math.imul(L, Y), n = (n = Math.imul(L, X)) + Math.imul(P, Y) | 0, o = Math.imul(P, X), i = i + Math.imul(O, Q) | 0, n = (n = n + Math.imul(O, tt) | 0) + Math.imul(U, Q) | 0, o = o + Math.imul(U, tt) | 0, i = i + Math.imul(T, rt) | 0, n = (n = n + Math.imul(T, it) | 0) + Math.imul(R, rt) | 0, o = o + Math.imul(R, it) | 0, i = i + Math.imul(D, ot) | 0, n = (n = n + Math.imul(D, st) | 0) + Math.imul(x, ot) | 0, o = o + Math.imul(x, st) | 0, i = i + Math.imul(F, ht) | 0, n = (n = n + Math.imul(F, ut) | 0) + Math.imul(_, ht) | 0, o = o + Math.imul(_, ut) | 0, i = i + Math.imul(A, ct) | 0, n = (n = n + Math.imul(A, ft) | 0) + Math.imul(C, ct) | 0, o = o + Math.imul(C, ft) | 0;
                        var St = (u + (i = i + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(M, mt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, i = Math.imul(L, Q), n = (n = Math.imul(L, tt)) + Math.imul(P, Q) | 0, o = Math.imul(P, tt), i = i + Math.imul(O, rt) | 0, n = (n = n + Math.imul(O, it) | 0) + Math.imul(U, rt) | 0, o = o + Math.imul(U, it) | 0, i = i + Math.imul(T, ot) | 0, n = (n = n + Math.imul(T, st) | 0) + Math.imul(R, ot) | 0, o = o + Math.imul(R, st) | 0, i = i + Math.imul(D, ht) | 0, n = (n = n + Math.imul(D, ut) | 0) + Math.imul(x, ht) | 0, o = o + Math.imul(x, ut) | 0, i = i + Math.imul(F, ct) | 0, n = (n = n + Math.imul(F, ft) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, ft) | 0;
                        var Dt = (u + (i = i + Math.imul(A, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, mt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(C, mt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, i = Math.imul(L, rt), n = (n = Math.imul(L, it)) + Math.imul(P, rt) | 0, o = Math.imul(P, it), i = i + Math.imul(O, ot) | 0, n = (n = n + Math.imul(O, st) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, st) | 0, i = i + Math.imul(T, ht) | 0, n = (n = n + Math.imul(T, ut) | 0) + Math.imul(R, ht) | 0, o = o + Math.imul(R, ut) | 0, i = i + Math.imul(D, ct) | 0, n = (n = n + Math.imul(D, ft) | 0) + Math.imul(x, ct) | 0, o = o + Math.imul(x, ft) | 0;
                        var xt = (u + (i = i + Math.imul(F, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(F, mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(_, mt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, i = Math.imul(L, ot), n = (n = Math.imul(L, st)) + Math.imul(P, ot) | 0, o = Math.imul(P, st), i = i + Math.imul(O, ht) | 0, n = (n = n + Math.imul(O, ut) | 0) + Math.imul(U, ht) | 0, o = o + Math.imul(U, ut) | 0, i = i + Math.imul(T, ct) | 0, n = (n = n + Math.imul(T, ft) | 0) + Math.imul(R, ct) | 0, o = o + Math.imul(R, ft) | 0;
                        var It = (u + (i = i + Math.imul(D, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(D, mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(x, mt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, i = Math.imul(L, ht), n = (n = Math.imul(L, ut)) + Math.imul(P, ht) | 0, o = Math.imul(P, ut), i = i + Math.imul(O, ct) | 0, n = (n = n + Math.imul(O, ft) | 0) + Math.imul(U, ct) | 0, o = o + Math.imul(U, ft) | 0;
                        var Tt = (u + (i = i + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, mt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(R, mt) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, i = Math.imul(L, ct), n = (n = Math.imul(L, ft)) + Math.imul(P, ct) | 0, o = Math.imul(P, ft);
                        var Rt = (u + (i = i + Math.imul(O, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, mt) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                        u = ((o = o + Math.imul(U, mt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863;
                        var Nt = (u + (i = Math.imul(L, pt)) | 0) + ((8191 & (n = (n = Math.imul(L, mt)) + Math.imul(P, pt) | 0)) << 13) | 0;
                        return u = ((o = Math.imul(P, mt)) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, h[0] = gt, h[1] = vt, h[2] = yt, h[3] = wt, h[4] = bt, h[5] = Mt, h[6] = Et, h[7] = At, h[8] = Ct, h[9] = Bt, h[10] = Ft, h[11] = _t, h[12] = St, h[13] = Dt, h[14] = xt, h[15] = It, h[16] = Tt, h[17] = Rt, h[18] = Nt, 0 !== u && (h[19] = u, r.length++), r
                    };

                    function p(t, e, r) {
                        return (new m).mulp(t, e, r)
                    }

                    function m(t, e) {
                        this.x = t, this.y = e
                    }
                    Math.imul || (d = f), o.prototype.mulTo = function(t, e) {
                        var r, i = this.length + t.length;
                        return r = 10 === this.length && 10 === t.length ? d(this, t, e) : i < 63 ? f(this, t, e) : i < 1024 ? function(t, e, r) {
                            r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                            for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                                var s = n;
                                n = 0;
                                for (var a = 67108863 & i, h = Math.min(o, e.length - 1), u = Math.max(0, o - t.length + 1); u <= h; u++) {
                                    var l = o - u,
                                        c = (0 | t.words[l]) * (0 | e.words[u]),
                                        f = 67108863 & c;
                                    a = 67108863 & (f = f + a | 0), n += (s = (s = s + (c / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863
                                }
                                r.words[o] = a, i = s, s = n
                            }
                            return 0 !== i ? r.words[o] = i : r.length--, r.strip()
                        }(this, t, e) : p(this, t, e), r
                    }, m.prototype.makeRBT = function(t) {
                        for (var e = new Array(t), r = o.prototype._countBits(t) - 1, i = 0; i < t; i++) e[i] = this.revBin(i, r, t);
                        return e
                    }, m.prototype.revBin = function(t, e, r) {
                        if (0 === t || t === r - 1) return t;
                        for (var i = 0, n = 0; n < e; n++) i |= (1 & t) << e - n - 1, t >>= 1;
                        return i
                    }, m.prototype.permute = function(t, e, r, i, n, o) {
                        for (var s = 0; s < o; s++) i[s] = e[t[s]], n[s] = r[t[s]]
                    }, m.prototype.transform = function(t, e, r, i, n, o) {
                        this.permute(o, t, e, r, i, n);
                        for (var s = 1; s < n; s <<= 1)
                            for (var a = s << 1, h = Math.cos(2 * Math.PI / a), u = Math.sin(2 * Math.PI / a), l = 0; l < n; l += a)
                                for (var c = h, f = u, d = 0; d < s; d++) {
                                    var p = r[l + d],
                                        m = i[l + d],
                                        g = r[l + d + s],
                                        v = i[l + d + s],
                                        y = c * g - f * v;
                                    v = c * v + f * g, g = y, r[l + d] = p + g, i[l + d] = m + v, r[l + d + s] = p - g, i[l + d + s] = m - v, d !== a && (y = h * c - u * f, f = h * f + u * c, c = y)
                                }
                    }, m.prototype.guessLen13b = function(t, e) {
                        var r = 1 | Math.max(e, t),
                            i = 1 & r,
                            n = 0;
                        for (r = r / 2 | 0; r; r >>>= 1) n++;
                        return 1 << n + 1 + i
                    }, m.prototype.conjugate = function(t, e, r) {
                        if (!(r <= 1))
                            for (var i = 0; i < r / 2; i++) {
                                var n = t[i];
                                t[i] = t[r - i - 1], t[r - i - 1] = n, n = e[i], e[i] = -e[r - i - 1], e[r - i - 1] = -n
                            }
                    }, m.prototype.normalize13b = function(t, e) {
                        for (var r = 0, i = 0; i < e / 2; i++) {
                            var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
                            t[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                        }
                        return t
                    }, m.prototype.convert13b = function(t, e, r, n) {
                        for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                        for (s = 2 * e; s < n; ++s) r[s] = 0;
                        i(0 === o), i(0 == (-8192 & o))
                    }, m.prototype.stub = function(t) {
                        for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                        return e
                    }, m.prototype.mulp = function(t, e, r) {
                        var i = 2 * this.guessLen13b(t.length, e.length),
                            n = this.makeRBT(i),
                            o = this.stub(i),
                            s = new Array(i),
                            a = new Array(i),
                            h = new Array(i),
                            u = new Array(i),
                            l = new Array(i),
                            c = new Array(i),
                            f = r.words;
                        f.length = i, this.convert13b(t.words, t.length, s, i), this.convert13b(e.words, e.length, u, i), this.transform(s, o, a, h, i, n), this.transform(u, o, l, c, i, n);
                        for (var d = 0; d < i; d++) {
                            var p = a[d] * l[d] - h[d] * c[d];
                            h[d] = a[d] * c[d] + h[d] * l[d], a[d] = p
                        }
                        return this.conjugate(a, h, i), this.transform(a, h, f, o, i, n), this.conjugate(f, o, i), this.normalize13b(f, i), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r.strip()
                    }, o.prototype.mul = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                    }, o.prototype.mulf = function(t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), p(this, t, e)
                    }, o.prototype.imul = function(t) {
                        return this.clone().mulTo(t, this)
                    }, o.prototype.imuln = function(t) {
                        i("number" == typeof t), i(t < 67108864);
                        for (var e = 0, r = 0; r < this.length; r++) {
                            var n = (0 | this.words[r]) * t,
                                o = (67108863 & n) + (67108863 & e);
                            e >>= 26, e += n / 67108864 | 0, e += o >>> 26, this.words[r] = 67108863 & o
                        }
                        return 0 !== e && (this.words[r] = e, this.length++), this
                    }, o.prototype.muln = function(t) {
                        return this.clone().imuln(t)
                    }, o.prototype.sqr = function() {
                        return this.mul(this)
                    }, o.prototype.isqr = function() {
                        return this.imul(this.clone())
                    }, o.prototype.pow = function(t) {
                        var e = function(t) {
                            for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                                var i = r / 26 | 0,
                                    n = r % 26;
                                e[r] = (t.words[i] & 1 << n) >>> n
                            }
                            return e
                        }(t);
                        if (0 === e.length) return new o(1);
                        for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
                        if (++i < e.length)
                            for (var n = r.sqr(); i < e.length; i++, n = n.sqr()) 0 !== e[i] && (r = r.mul(n));
                        return r
                    }, o.prototype.iushln = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e, r = t % 26,
                            n = (t - r) / 26,
                            o = 67108863 >>> 26 - r << 26 - r;
                        if (0 !== r) {
                            var s = 0;
                            for (e = 0; e < this.length; e++) {
                                var a = this.words[e] & o,
                                    h = (0 | this.words[e]) - a << r;
                                this.words[e] = h | s, s = a >>> 26 - r
                            }
                            s && (this.words[e] = s, this.length++)
                        }
                        if (0 !== n) {
                            for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                            for (e = 0; e < n; e++) this.words[e] = 0;
                            this.length += n
                        }
                        return this.strip()
                    }, o.prototype.ishln = function(t) {
                        return i(0 === this.negative), this.iushln(t)
                    }, o.prototype.iushrn = function(t, e, r) {
                        var n;
                        i("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                        var o = t % 26,
                            s = Math.min((t - o) / 26, this.length),
                            a = 67108863 ^ 67108863 >>> o << o,
                            h = r;
                        if (n -= s, n = Math.max(0, n), h) {
                            for (var u = 0; u < s; u++) h.words[u] = this.words[u];
                            h.length = s
                        }
                        if (0 === s);
                        else if (this.length > s)
                            for (this.length -= s, u = 0; u < this.length; u++) this.words[u] = this.words[u + s];
                        else this.words[0] = 0, this.length = 1;
                        var l = 0;
                        for (u = this.length - 1; u >= 0 && (0 !== l || u >= n); u--) {
                            var c = 0 | this.words[u];
                            this.words[u] = l << 26 - o | c >>> o, l = c & a
                        }
                        return h && 0 !== l && (h.words[h.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
                    }, o.prototype.ishrn = function(t, e, r) {
                        return i(0 === this.negative), this.iushrn(t, e, r)
                    }, o.prototype.shln = function(t) {
                        return this.clone().ishln(t)
                    }, o.prototype.ushln = function(t) {
                        return this.clone().iushln(t)
                    }, o.prototype.shrn = function(t) {
                        return this.clone().ishrn(t)
                    }, o.prototype.ushrn = function(t) {
                        return this.clone().iushrn(t)
                    }, o.prototype.testn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        return !(this.length <= r || !(this.words[r] & n))
                    }, o.prototype.imaskn = function(t) {
                        i("number" == typeof t && t >= 0);
                        var e = t % 26,
                            r = (t - e) / 26;
                        if (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                        if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
                            var n = 67108863 ^ 67108863 >>> e << e;
                            this.words[this.length - 1] &= n
                        }
                        return this.strip()
                    }, o.prototype.maskn = function(t) {
                        return this.clone().imaskn(t)
                    }, o.prototype.iaddn = function(t) {
                        return i("number" == typeof t), i(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                    }, o.prototype._iaddn = function(t) {
                        this.words[0] += t;
                        for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                        return this.length = Math.max(this.length, e + 1), this
                    }, o.prototype.isubn = function(t) {
                        if (i("number" == typeof t), i(t < 67108864), t < 0) return this.iaddn(-t);
                        if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                        if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                        else
                            for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                        return this.strip()
                    }, o.prototype.addn = function(t) {
                        return this.clone().iaddn(t)
                    }, o.prototype.subn = function(t) {
                        return this.clone().isubn(t)
                    }, o.prototype.iabs = function() {
                        return this.negative = 0, this
                    }, o.prototype.abs = function() {
                        return this.clone().iabs()
                    }, o.prototype._ishlnsubmul = function(t, e, r) {
                        var n, o, s = t.length + r;
                        this._expand(s);
                        var a = 0;
                        for (n = 0; n < t.length; n++) {
                            o = (0 | this.words[n + r]) + a;
                            var h = (0 | t.words[n]) * e;
                            a = ((o -= 67108863 & h) >> 26) - (h / 67108864 | 0), this.words[n + r] = 67108863 & o
                        }
                        for (; n < this.length - r; n++) a = (o = (0 | this.words[n + r]) + a) >> 26, this.words[n + r] = 67108863 & o;
                        if (0 === a) return this.strip();
                        for (i(-1 === a), a = 0, n = 0; n < this.length; n++) a = (o = -(0 | this.words[n]) + a) >> 26, this.words[n] = 67108863 & o;
                        return this.negative = 1, this.strip()
                    }, o.prototype._wordDiv = function(t, e) {
                        var r = (this.length, t.length),
                            i = this.clone(),
                            n = t,
                            s = 0 | n.words[n.length - 1];
                        0 != (r = 26 - this._countBits(s)) && (n = n.ushln(r), i.iushln(r), s = 0 | n.words[n.length - 1]);
                        var a, h = i.length - n.length;
                        if ("mod" !== e) {
                            (a = new o(null)).length = h + 1, a.words = new Array(a.length);
                            for (var u = 0; u < a.length; u++) a.words[u] = 0
                        }
                        var l = i.clone()._ishlnsubmul(n, 1, h);
                        0 === l.negative && (i = l, a && (a.words[h] = 1));
                        for (var c = h - 1; c >= 0; c--) {
                            var f = 67108864 * (0 | i.words[n.length + c]) + (0 | i.words[n.length + c - 1]);
                            for (f = Math.min(f / s | 0, 67108863), i._ishlnsubmul(n, f, c); 0 !== i.negative;) f--, i.negative = 0, i._ishlnsubmul(n, 1, c), i.isZero() || (i.negative ^= 1);
                            a && (a.words[c] = f)
                        }
                        return a && a.strip(), i.strip(), "div" !== e && 0 !== r && i.iushrn(r), {
                            div: a || null,
                            mod: i
                        }
                    }, o.prototype.divmod = function(t, e, r) {
                        return i(!t.isZero()), this.isZero() ? {
                            div: new o(0),
                            mod: new o(0)
                        } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e), "mod" !== e && (n = a.div.neg()), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                            div: n,
                            mod: s
                        }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e), "mod" !== e && (n = a.div.neg()), {
                            div: n,
                            mod: a.mod
                        }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e), "div" !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                            div: a.div,
                            mod: s
                        }) : t.length > this.length || this.cmp(t) < 0 ? {
                            div: new o(0),
                            mod: this
                        } : 1 === t.length ? "div" === e ? {
                            div: this.divn(t.words[0]),
                            mod: null
                        } : "mod" === e ? {
                            div: null,
                            mod: new o(this.modn(t.words[0]))
                        } : {
                            div: this.divn(t.words[0]),
                            mod: new o(this.modn(t.words[0]))
                        } : this._wordDiv(t, e);
                        var n, s, a
                    }, o.prototype.div = function(t) {
                        return this.divmod(t, "div", !1).div
                    }, o.prototype.mod = function(t) {
                        return this.divmod(t, "mod", !1).mod
                    }, o.prototype.umod = function(t) {
                        return this.divmod(t, "mod", !0).mod
                    }, o.prototype.divRound = function(t) {
                        var e = this.divmod(t);
                        if (e.mod.isZero()) return e.div;
                        var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                            i = t.ushrn(1),
                            n = t.andln(1),
                            o = r.cmp(i);
                        return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                    }, o.prototype.modn = function(t) {
                        i(t <= 67108863);
                        for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--) r = (e * r + (0 | this.words[n])) % t;
                        return r
                    }, o.prototype.idivn = function(t) {
                        i(t <= 67108863);
                        for (var e = 0, r = this.length - 1; r >= 0; r--) {
                            var n = (0 | this.words[r]) + 67108864 * e;
                            this.words[r] = n / t | 0, e = n % t
                        }
                        return this.strip()
                    }, o.prototype.divn = function(t) {
                        return this.clone().idivn(t)
                    }, o.prototype.egcd = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n = new o(1), s = new o(0), a = new o(0), h = new o(1), u = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++u;
                        for (var l = r.clone(), c = e.clone(); !e.isZero();) {
                            for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                            if (f > 0)
                                for (e.iushrn(f); f-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(c)), n.iushrn(1), s.iushrn(1);
                            for (var p = 0, m = 1; 0 == (r.words[0] & m) && p < 26; ++p, m <<= 1);
                            if (p > 0)
                                for (r.iushrn(p); p-- > 0;)(a.isOdd() || h.isOdd()) && (a.iadd(l), h.isub(c)), a.iushrn(1), h.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), n.isub(a), s.isub(h)) : (r.isub(e), a.isub(n), h.isub(s))
                        }
                        return {
                            a,
                            b: h,
                            gcd: r.iushln(u)
                        }
                    }, o.prototype._invmp = function(t) {
                        i(0 === t.negative), i(!t.isZero());
                        var e = this,
                            r = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var n, s = new o(1), a = new o(0), h = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                            for (var u = 0, l = 1; 0 == (e.words[0] & l) && u < 26; ++u, l <<= 1);
                            if (u > 0)
                                for (e.iushrn(u); u-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                            for (var c = 0, f = 1; 0 == (r.words[0] & f) && c < 26; ++c, f <<= 1);
                            if (c > 0)
                                for (r.iushrn(c); c-- > 0;) a.isOdd() && a.iadd(h), a.iushrn(1);
                            e.cmp(r) >= 0 ? (e.isub(r), s.isub(a)) : (r.isub(e), a.isub(s))
                        }
                        return (n = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && n.iadd(t), n
                    }, o.prototype.gcd = function(t) {
                        if (this.isZero()) return t.abs();
                        if (t.isZero()) return this.abs();
                        var e = this.clone(),
                            r = t.clone();
                        e.negative = 0, r.negative = 0;
                        for (var i = 0; e.isEven() && r.isEven(); i++) e.iushrn(1), r.iushrn(1);
                        for (;;) {
                            for (; e.isEven();) e.iushrn(1);
                            for (; r.isEven();) r.iushrn(1);
                            var n = e.cmp(r);
                            if (n < 0) {
                                var o = e;
                                e = r, r = o
                            } else if (0 === n || 0 === r.cmpn(1)) break;
                            e.isub(r)
                        }
                        return r.iushln(i)
                    }, o.prototype.invm = function(t) {
                        return this.egcd(t).a.umod(t)
                    }, o.prototype.isEven = function() {
                        return 0 == (1 & this.words[0])
                    }, o.prototype.isOdd = function() {
                        return 1 == (1 & this.words[0])
                    }, o.prototype.andln = function(t) {
                        return this.words[0] & t
                    }, o.prototype.bincn = function(t) {
                        i("number" == typeof t);
                        var e = t % 26,
                            r = (t - e) / 26,
                            n = 1 << e;
                        if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                        for (var o = n, s = r; 0 !== o && s < this.length; s++) {
                            var a = 0 | this.words[s];
                            o = (a += o) >>> 26, a &= 67108863, this.words[s] = a
                        }
                        return 0 !== o && (this.words[s] = o, this.length++), this
                    }, o.prototype.isZero = function() {
                        return 1 === this.length && 0 === this.words[0]
                    }, o.prototype.cmpn = function(t) {
                        var e, r = t < 0;
                        if (0 !== this.negative && !r) return -1;
                        if (0 === this.negative && r) return 1;
                        if (this.strip(), this.length > 1) e = 1;
                        else {
                            r && (t = -t), i(t <= 67108863, "Number is too big");
                            var n = 0 | this.words[0];
                            e = n === t ? 0 : n < t ? -1 : 1
                        }
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.cmp = function(t) {
                        if (0 !== this.negative && 0 === t.negative) return -1;
                        if (0 === this.negative && 0 !== t.negative) return 1;
                        var e = this.ucmp(t);
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.ucmp = function(t) {
                        if (this.length > t.length) return 1;
                        if (this.length < t.length) return -1;
                        for (var e = 0, r = this.length - 1; r >= 0; r--) {
                            var i = 0 | this.words[r],
                                n = 0 | t.words[r];
                            if (i !== n) {
                                i < n ? e = -1 : i > n && (e = 1);
                                break
                            }
                        }
                        return e
                    }, o.prototype.gtn = function(t) {
                        return 1 === this.cmpn(t)
                    }, o.prototype.gt = function(t) {
                        return 1 === this.cmp(t)
                    }, o.prototype.gten = function(t) {
                        return this.cmpn(t) >= 0
                    }, o.prototype.gte = function(t) {
                        return this.cmp(t) >= 0
                    }, o.prototype.ltn = function(t) {
                        return -1 === this.cmpn(t)
                    }, o.prototype.lt = function(t) {
                        return -1 === this.cmp(t)
                    }, o.prototype.lten = function(t) {
                        return this.cmpn(t) <= 0
                    }, o.prototype.lte = function(t) {
                        return this.cmp(t) <= 0
                    }, o.prototype.eqn = function(t) {
                        return 0 === this.cmpn(t)
                    }, o.prototype.eq = function(t) {
                        return 0 === this.cmp(t)
                    }, o.red = function(t) {
                        return new E(t)
                    }, o.prototype.toRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                    }, o.prototype.fromRed = function() {
                        return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                    }, o.prototype._forceRed = function(t) {
                        return this.red = t, this
                    }, o.prototype.forceRed = function(t) {
                        return i(!this.red, "Already a number in reduction context"), this._forceRed(t)
                    }, o.prototype.redAdd = function(t) {
                        return i(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                    }, o.prototype.redIAdd = function(t) {
                        return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                    }, o.prototype.redSub = function(t) {
                        return i(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                    }, o.prototype.redISub = function(t) {
                        return i(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                    }, o.prototype.redShl = function(t) {
                        return i(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                    }, o.prototype.redMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                    }, o.prototype.redIMul = function(t) {
                        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                    }, o.prototype.redSqr = function() {
                        return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                    }, o.prototype.redISqr = function() {
                        return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                    }, o.prototype.redSqrt = function() {
                        return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                    }, o.prototype.redInvm = function() {
                        return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                    }, o.prototype.redNeg = function() {
                        return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                    }, o.prototype.redPow = function(t) {
                        return i(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                    };
                    var g = {
                        k256: null,
                        p224: null,
                        p192: null,
                        p25519: null
                    };

                    function v(t, e) {
                        this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                    }

                    function y() {
                        v.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                    }

                    function w() {
                        v.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                    }

                    function b() {
                        v.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                    }

                    function M() {
                        v.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                    }

                    function E(t) {
                        if ("string" == typeof t) {
                            var e = o._prime(t);
                            this.m = e.p, this.prime = e
                        } else i(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                    }

                    function A(t) {
                        E.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                    }
                    v.prototype._tmp = function() {
                        var t = new o(null);
                        return t.words = new Array(Math.ceil(this.n / 13)), t
                    }, v.prototype.ireduce = function(t) {
                        var e, r = t;
                        do {
                            this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                        } while (e > this.n);
                        var i = e < this.n ? -1 : r.ucmp(this.p);
                        return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(), r
                    }, v.prototype.split = function(t, e) {
                        t.iushrn(this.n, 0, e)
                    }, v.prototype.imulK = function(t) {
                        return t.imul(this.k)
                    }, n(y, v), y.prototype.split = function(t, e) {
                        for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++) e.words[n] = t.words[n];
                        if (e.length = i, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                        var o = t.words[9];
                        for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
                            var s = 0 | t.words[n];
                            t.words[n - 10] = (s & r) << 4 | o >>> 22, o = s
                        }
                        o >>>= 22, t.words[n - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
                    }, y.prototype.imulK = function(t) {
                        t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 0 | t.words[r];
                            e += 977 * i, t.words[r] = 67108863 & e, e = 64 * i + (e / 67108864 | 0)
                        }
                        return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                    }, n(w, v), n(b, v), n(M, v), M.prototype.imulK = function(t) {
                        for (var e = 0, r = 0; r < t.length; r++) {
                            var i = 19 * (0 | t.words[r]) + e,
                                n = 67108863 & i;
                            i >>>= 26, t.words[r] = n, e = i
                        }
                        return 0 !== e && (t.words[t.length++] = e), t
                    }, o._prime = function(t) {
                        if (g[t]) return g[t];
                        var e;
                        if ("k256" === t) e = new y;
                        else if ("p224" === t) e = new w;
                        else if ("p192" === t) e = new b;
                        else {
                            if ("p25519" !== t) throw new Error("Unknown prime " + t);
                            e = new M
                        }
                        return g[t] = e, e
                    }, E.prototype._verify1 = function(t) {
                        i(0 === t.negative, "red works only with positives"), i(t.red, "red works only with red numbers")
                    }, E.prototype._verify2 = function(t, e) {
                        i(0 == (t.negative | e.negative), "red works only with positives"), i(t.red && t.red === e.red, "red works only with red numbers")
                    }, E.prototype.imod = function(t) {
                        return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
                    }, E.prototype.neg = function(t) {
                        return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                    }, E.prototype.add = function(t, e) {
                        this._verify2(t, e);
                        var r = t.add(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                    }, E.prototype.iadd = function(t, e) {
                        this._verify2(t, e);
                        var r = t.iadd(e);
                        return r.cmp(this.m) >= 0 && r.isub(this.m), r
                    }, E.prototype.sub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.sub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
                    }, E.prototype.isub = function(t, e) {
                        this._verify2(t, e);
                        var r = t.isub(e);
                        return r.cmpn(0) < 0 && r.iadd(this.m), r
                    }, E.prototype.shl = function(t, e) {
                        return this._verify1(t), this.imod(t.ushln(e))
                    }, E.prototype.imul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.imul(e))
                    }, E.prototype.mul = function(t, e) {
                        return this._verify2(t, e), this.imod(t.mul(e))
                    }, E.prototype.isqr = function(t) {
                        return this.imul(t, t.clone())
                    }, E.prototype.sqr = function(t) {
                        return this.mul(t, t)
                    }, E.prototype.sqrt = function(t) {
                        if (t.isZero()) return t.clone();
                        var e = this.m.andln(3);
                        if (i(e % 2 == 1), 3 === e) {
                            var r = this.m.add(new o(1)).iushrn(2);
                            return this.pow(t, r)
                        }
                        for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                        i(!n.isZero());
                        var a = new o(1).toRed(this),
                            h = a.redNeg(),
                            u = this.m.subn(1).iushrn(1),
                            l = this.m.bitLength();
                        for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, u).cmp(h);) l.redIAdd(h);
                        for (var c = this.pow(l, n), f = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), p = s; 0 !== d.cmp(a);) {
                            for (var m = d, g = 0; 0 !== m.cmp(a); g++) m = m.redSqr();
                            i(g < p);
                            var v = this.pow(c, new o(1).iushln(p - g - 1));
                            f = f.redMul(v), c = v.redSqr(), d = d.redMul(c), p = g
                        }
                        return f
                    }, E.prototype.invm = function(t) {
                        var e = t._invmp(this.m);
                        return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                    }, E.prototype.pow = function(t, e) {
                        if (e.isZero()) return new o(1);
                        if (0 === e.cmpn(1)) return t.clone();
                        var r = new Array(16);
                        r[0] = new o(1).toRed(this), r[1] = t;
                        for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
                        var n = r[0],
                            s = 0,
                            a = 0,
                            h = e.bitLength() % 26;
                        for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                            for (var u = e.words[i], l = h - 1; l >= 0; l--) {
                                var c = u >> l & 1;
                                n !== r[0] && (n = this.sqr(n)), 0 !== c || 0 !== s ? (s <<= 1, s |= c, (4 == ++a || 0 === i && 0 === l) && (n = this.mul(n, r[s]), a = 0, s = 0)) : a = 0
                            }
                            h = 26
                        }
                        return n
                    }, E.prototype.convertTo = function(t) {
                        var e = t.umod(this.m);
                        return e === t ? e.clone() : e
                    }, E.prototype.convertFrom = function(t) {
                        var e = t.clone();
                        return e.red = null, e
                    }, o.mont = function(t) {
                        return new A(t)
                    }, n(A, E), A.prototype.convertTo = function(t) {
                        return this.imod(t.ushln(this.shift))
                    }, A.prototype.convertFrom = function(t) {
                        var e = this.imod(t.mul(this.rinv));
                        return e.red = null, e
                    }, A.prototype.imul = function(t, e) {
                        if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                        var r = t.imul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            o = n;
                        return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
                    }, A.prototype.mul = function(t, e) {
                        if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                        var r = t.mul(e),
                            i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            n = r.isub(i).iushrn(this.shift),
                            s = n;
                        return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
                    }, A.prototype.invm = function(t) {
                        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                    }
                }(t = r.nmd(t), this)
            }, (t, e, r) => {
                var i = r(15);
                t.exports = function(t) {
                    return "string" != typeof t ? t : i(t) ? t.slice(2) : t
                }
            }, t => {
                t.exports = function(t) {
                    if ("string" != typeof t) throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof t + ", while checking isHexPrefixed.");
                    return "0x" === t.slice(0, 2)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    default: () => i
                }), r(17);
                const i = window.crypto
            }, (t, e, r) => {
                "use strict";
                var i, n;
                r.r(e), r.d(e, {
                    default: () => o
                }), i = "undefined" != typeof self ? self : void 0, n = function(t) {
                    if ("function" != typeof Promise) throw "Promise support required";
                    var e = t.crypto || t.msCrypto;
                    if (e) {
                        var r = e.subtle || e.webkitSubtle;
                        if (r) {
                            var i = t.Crypto || e.constructor || Object,
                                n = t.SubtleCrypto || r.constructor || Object,
                                o = (t.CryptoKey || t.Key, t.navigator.userAgent.indexOf("Edge/") > -1),
                                s = !!t.msCrypto && !o,
                                a = !e.subtle && !!e.webkitSubtle;
                            if (s || a) {
                                var h = {
                                        KoZIhvcNAQEB: "1.2.840.113549.1.1.1"
                                    },
                                    u = {
                                        "1.2.840.113549.1.1.1": "KoZIhvcNAQEB"
                                    };
                                if (["generateKey", "importKey", "unwrapKey"].forEach((function(t) {
                                        var i = r[t];
                                        r[t] = function(n, o, h) {
                                            var u, l, c, p, b = [].slice.call(arguments);
                                            switch (t) {
                                                case "generateKey":
                                                    u = m(n), l = o, c = h;
                                                    break;
                                                case "importKey":
                                                    u = m(h), l = b[3], c = b[4], "jwk" === n && ((o = v(o)).alg || (o.alg = g(u)), o.key_ops || (o.key_ops = "oct" !== o.kty ? "d" in o ? c.filter(B) : c.filter(C) : c.slice()), b[1] = y(o));
                                                    break;
                                                case "unwrapKey":
                                                    u = b[4], l = b[5], c = b[6], b[2] = h._key
                                            }
                                            if ("generateKey" === t && "HMAC" === u.name && u.hash) return u.length = u.length || {
                                                "SHA-1": 512,
                                                "SHA-256": 512,
                                                "SHA-384": 1024,
                                                "SHA-512": 1024
                                            }[u.hash.name], r.importKey("raw", e.getRandomValues(new Uint8Array(u.length + 7 >> 3)), u, l, c);
                                            if (a && "generateKey" === t && "RSASSA-PKCS1-v1_5" === u.name && (!u.modulusLength || u.modulusLength >= 2048)) return (n = m(n)).name = "RSAES-PKCS1-v1_5", delete n.hash, r.generateKey(n, !0, ["encrypt", "decrypt"]).then((function(t) {
                                                return Promise.all([r.exportKey("jwk", t.publicKey), r.exportKey("jwk", t.privateKey)])
                                            })).then((function(t) {
                                                return t[0].alg = t[1].alg = g(u), t[0].key_ops = c.filter(C), t[1].key_ops = c.filter(B), Promise.all([r.importKey("jwk", t[0], u, !0, t[0].key_ops), r.importKey("jwk", t[1], u, l, t[1].key_ops)])
                                            })).then((function(t) {
                                                return {
                                                    publicKey: t[0],
                                                    privateKey: t[1]
                                                }
                                            }));
                                            if ((a || s && "SHA-1" === (u.hash || {}).name) && "importKey" === t && "jwk" === n && "HMAC" === u.name && "oct" === o.kty) return r.importKey("raw", d(f(o.k)), h, b[3], b[4]);
                                            if (a && "importKey" === t && ("spki" === n || "pkcs8" === n)) return r.importKey("jwk", w(o), h, b[3], b[4]);
                                            if (s && "unwrapKey" === t) return r.decrypt(b[3], h, o).then((function(t) {
                                                return r.importKey(n, t, b[4], b[5], b[6])
                                            }));
                                            try {
                                                p = i.apply(r, b)
                                            } catch (t) {
                                                return Promise.reject(t)
                                            }
                                            return s && (p = new Promise((function(t, e) {
                                                p.onabort = p.onerror = function(t) {
                                                    e(t)
                                                }, p.oncomplete = function(e) {
                                                    t(e.target.result)
                                                }
                                            }))), p = p.then((function(t) {
                                                return "HMAC" === u.name && (u.length || (u.length = 8 * t.algorithm.length)), 0 == u.name.search("RSA") && (u.modulusLength || (u.modulusLength = (t.publicKey || t).algorithm.modulusLength), u.publicExponent || (u.publicExponent = (t.publicKey || t).algorithm.publicExponent)), t.publicKey && t.privateKey ? {
                                                    publicKey: new A(t.publicKey, u, l, c.filter(C)),
                                                    privateKey: new A(t.privateKey, u, l, c.filter(B))
                                                } : new A(t, u, l, c)
                                            }))
                                        }
                                    })), ["exportKey", "wrapKey"].forEach((function(t) {
                                        var e = r[t];
                                        r[t] = function(i, n, o) {
                                            var h, u = [].slice.call(arguments);
                                            switch (t) {
                                                case "exportKey":
                                                    u[1] = n._key;
                                                    break;
                                                case "wrapKey":
                                                    u[1] = n._key, u[2] = o._key
                                            }
                                            if ((a || s && "SHA-1" === (n.algorithm.hash || {}).name) && "exportKey" === t && "jwk" === i && "HMAC" === n.algorithm.name && (u[0] = "raw"), !a || "exportKey" !== t || "spki" !== i && "pkcs8" !== i || (u[0] = "jwk"), s && "wrapKey" === t) return r.exportKey(i, n).then((function(t) {
                                                return "jwk" === i && (t = d(unescape(encodeURIComponent(JSON.stringify(v(t)))))), r.encrypt(u[3], o, t)
                                            }));
                                            try {
                                                h = e.apply(r, u)
                                            } catch (t) {
                                                return Promise.reject(t)
                                            }
                                            return s && (h = new Promise((function(t, e) {
                                                h.onabort = h.onerror = function(t) {
                                                    e(t)
                                                }, h.oncomplete = function(e) {
                                                    t(e.target.result)
                                                }
                                            }))), "exportKey" === t && "jwk" === i && (h = h.then((function(t) {
                                                return (a || s && "SHA-1" === (n.algorithm.hash || {}).name) && "HMAC" === n.algorithm.name ? {
                                                    kty: "oct",
                                                    alg: g(n.algorithm),
                                                    key_ops: n.usages.slice(),
                                                    ext: !0,
                                                    k: c(p(t))
                                                } : ((t = v(t)).alg || (t.alg = g(n.algorithm)), t.key_ops || (t.key_ops = "public" === n.type ? n.usages.filter(C) : "private" === n.type ? n.usages.filter(B) : n.usages.slice()), t)
                                            }))), !a || "exportKey" !== t || "spki" !== i && "pkcs8" !== i || (h = h.then((function(t) {
                                                return b(v(t))
                                            }))), h
                                        }
                                    })), ["encrypt", "decrypt", "sign", "verify"].forEach((function(t) {
                                        var e = r[t];
                                        r[t] = function(i, n, o, a) {
                                            if (s && (!o.byteLength || a && !a.byteLength)) throw new Error("Empy input is not allowed");
                                            var h, u = [].slice.call(arguments),
                                                l = m(i);
                                            if (s && "decrypt" === t && "AES-GCM" === l.name) {
                                                var c = i.tagLength >> 3;
                                                u[2] = (o.buffer || o).slice(0, o.byteLength - c), i.tag = (o.buffer || o).slice(o.byteLength - c)
                                            }
                                            u[1] = n._key;
                                            try {
                                                h = e.apply(r, u)
                                            } catch (t) {
                                                return Promise.reject(t)
                                            }
                                            return s && (h = new Promise((function(e, r) {
                                                h.onabort = h.onerror = function(t) {
                                                    r(t)
                                                }, h.oncomplete = function(r) {
                                                    if (r = r.target.result, "encrypt" === t && r instanceof AesGcmEncryptResult) {
                                                        var i = r.ciphertext,
                                                            n = r.tag;
                                                        (r = new Uint8Array(i.byteLength + n.byteLength)).set(new Uint8Array(i), 0), r.set(new Uint8Array(n), i.byteLength), r = r.buffer
                                                    }
                                                    e(r)
                                                }
                                            }))), h
                                        }
                                    })), s) {
                                    var l = r.digest;
                                    r.digest = function(t, e) {
                                        if (!e.byteLength) throw new Error("Empy input is not allowed");
                                        var i;
                                        try {
                                            i = l.call(r, t, e)
                                        } catch (t) {
                                            return Promise.reject(t)
                                        }
                                        return i = new Promise((function(t, e) {
                                            i.onabort = i.onerror = function(t) {
                                                e(t)
                                            }, i.oncomplete = function(e) {
                                                t(e.target.result)
                                            }
                                        }))
                                    }, t.crypto = Object.create(e, {
                                        getRandomValues: {
                                            value: function(t) {
                                                return e.getRandomValues(t)
                                            }
                                        },
                                        subtle: {
                                            value: r
                                        }
                                    }), t.CryptoKey = A
                                }
                                a && (e.subtle = r, t.Crypto = i, t.SubtleCrypto = n, t.CryptoKey = A)
                            }
                        }
                    }

                    function c(t) {
                        return btoa(t).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")
                    }

                    function f(t) {
                        return t = (t += "===").slice(0, -t.length % 4), atob(t.replace(/-/g, "+").replace(/_/g, "/"))
                    }

                    function d(t) {
                        for (var e = new Uint8Array(t.length), r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
                        return e
                    }

                    function p(t) {
                        return t instanceof ArrayBuffer && (t = new Uint8Array(t)), String.fromCharCode.apply(String, t)
                    }

                    function m(t) {
                        var e = {
                            name: (t.name || t || "").toUpperCase().replace("V", "v")
                        };
                        switch (e.name) {
                            case "SHA-1":
                            case "SHA-256":
                            case "SHA-384":
                            case "SHA-512":
                                break;
                            case "AES-CBC":
                            case "AES-GCM":
                            case "AES-KW":
                                t.length && (e.length = t.length);
                                break;
                            case "HMAC":
                                t.hash && (e.hash = m(t.hash)), t.length && (e.length = t.length);
                                break;
                            case "RSAES-PKCS1-v1_5":
                                t.publicExponent && (e.publicExponent = new Uint8Array(t.publicExponent)), t.modulusLength && (e.modulusLength = t.modulusLength);
                                break;
                            case "RSASSA-PKCS1-v1_5":
                            case "RSA-OAEP":
                                t.hash && (e.hash = m(t.hash)), t.publicExponent && (e.publicExponent = new Uint8Array(t.publicExponent)), t.modulusLength && (e.modulusLength = t.modulusLength);
                                break;
                            default:
                                throw new SyntaxError("Bad algorithm name")
                        }
                        return e
                    }

                    function g(t) {
                        return {
                            HMAC: {
                                "SHA-1": "HS1",
                                "SHA-256": "HS256",
                                "SHA-384": "HS384",
                                "SHA-512": "HS512"
                            },
                            "RSASSA-PKCS1-v1_5": {
                                "SHA-1": "RS1",
                                "SHA-256": "RS256",
                                "SHA-384": "RS384",
                                "SHA-512": "RS512"
                            },
                            "RSAES-PKCS1-v1_5": {
                                "": "RSA1_5"
                            },
                            "RSA-OAEP": {
                                "SHA-1": "RSA-OAEP",
                                "SHA-256": "RSA-OAEP-256"
                            },
                            "AES-KW": {
                                128: "A128KW",
                                192: "A192KW",
                                256: "A256KW"
                            },
                            "AES-GCM": {
                                128: "A128GCM",
                                192: "A192GCM",
                                256: "A256GCM"
                            },
                            "AES-CBC": {
                                128: "A128CBC",
                                192: "A192CBC",
                                256: "A256CBC"
                            }
                        }[t.name][(t.hash || {}).name || t.length || ""]
                    }

                    function v(t) {
                        (t instanceof ArrayBuffer || t instanceof Uint8Array) && (t = JSON.parse(decodeURIComponent(escape(p(t)))));
                        var e = {
                            kty: t.kty,
                            alg: t.alg,
                            ext: t.ext || t.extractable
                        };
                        switch (e.kty) {
                            case "oct":
                                e.k = t.k;
                            case "RSA":
                                ["n", "e", "d", "p", "q", "dp", "dq", "qi", "oth"].forEach((function(r) {
                                    r in t && (e[r] = t[r])
                                }));
                                break;
                            default:
                                throw new TypeError("Unsupported key type")
                        }
                        return e
                    }

                    function y(t) {
                        var e = v(t);
                        return s && (e.extractable = e.ext, delete e.ext), d(unescape(encodeURIComponent(JSON.stringify(e)))).buffer
                    }

                    function w(t) {
                        var e = M(t),
                            r = !1;
                        e.length > 2 && (r = !0, e.shift());
                        var i = {
                            ext: !0
                        };
                        if ("1.2.840.113549.1.1.1" !== e[0][0]) throw new TypeError("Unsupported key type");
                        var n = ["n", "e", "d", "p", "q", "dp", "dq", "qi"],
                            o = M(e[1]);
                        r && o.shift();
                        for (var s = 0; s < o.length; s++) o[s][0] || (o[s] = o[s].subarray(1)), i[n[s]] = c(p(o[s]));
                        return i.kty = "RSA", i
                    }

                    function b(t) {
                        var e, r = [
                                ["", null]
                            ],
                            i = !1;
                        if ("RSA" !== t.kty) throw new TypeError("Unsupported key type");
                        for (var n = ["n", "e", "d", "p", "q", "dp", "dq", "qi"], o = [], s = 0; s < n.length && n[s] in t; s++) {
                            var a = o[s] = d(f(t[n[s]]));
                            128 & a[0] && (o[s] = new Uint8Array(a.length + 1), o[s].set(a, 1))
                        }
                        return o.length > 2 && (i = !0, o.unshift(new Uint8Array([0]))), r[0][0] = "1.2.840.113549.1.1.1", e = o, r.push(new Uint8Array(E(e)).buffer), i ? r.unshift(new Uint8Array([0])) : r[1] = {
                            tag: 3,
                            value: r[1]
                        }, new Uint8Array(E(r)).buffer
                    }

                    function M(t, e) {
                        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), e || (e = {
                                pos: 0,
                                end: t.length
                            }), e.end - e.pos < 2 || e.end > t.length) throw new RangeError("Malformed DER");
                        var r, i = t[e.pos++],
                            n = t[e.pos++];
                        if (n >= 128) {
                            if (n &= 127, e.end - e.pos < n) throw new RangeError("Malformed DER");
                            for (var o = 0; n--;) o <<= 8, o |= t[e.pos++];
                            n = o
                        }
                        if (e.end - e.pos < n) throw new RangeError("Malformed DER");
                        switch (i) {
                            case 2:
                                r = t.subarray(e.pos, e.pos += n);
                                break;
                            case 3:
                                if (t[e.pos++]) throw new Error("Unsupported bit string");
                                n--;
                            case 4:
                                r = new Uint8Array(t.subarray(e.pos, e.pos += n)).buffer;
                                break;
                            case 5:
                                r = null;
                                break;
                            case 6:
                                var s = btoa(p(t.subarray(e.pos, e.pos += n)));
                                if (!(s in h)) throw new Error("Unsupported OBJECT ID " + s);
                                r = h[s];
                                break;
                            case 48:
                                r = [];
                                for (var a = e.pos + n; e.pos < a;) r.push(M(t, e));
                                break;
                            default:
                                throw new Error("Unsupported DER tag 0x" + i.toString(16))
                        }
                        return r
                    }

                    function E(t, e) {
                        e || (e = []);
                        var r = 0,
                            i = 0,
                            n = e.length + 2;
                        if (e.push(0, 0), t instanceof Uint8Array) {
                            r = 2, i = t.length;
                            for (var o = 0; o < i; o++) e.push(t[o])
                        } else if (t instanceof ArrayBuffer)
                            for (r = 4, i = t.byteLength, t = new Uint8Array(t), o = 0; o < i; o++) e.push(t[o]);
                        else if (null === t) r = 5, i = 0;
                        else if ("string" == typeof t && t in u) {
                            var s = d(atob(u[t]));
                            for (r = 6, i = s.length, o = 0; o < i; o++) e.push(s[o])
                        } else if (t instanceof Array) {
                            for (o = 0; o < t.length; o++) E(t[o], e);
                            r = 48, i = e.length - n
                        } else {
                            if (!("object" == typeof t && 3 === t.tag && t.value instanceof ArrayBuffer)) throw new Error("Unsupported DER value " + t);
                            for (r = 3, i = (t = new Uint8Array(t.value)).byteLength, e.push(0), o = 0; o < i; o++) e.push(t[o]);
                            i++
                        }
                        if (i >= 128) {
                            var a = i;
                            for (i = 4, e.splice(n, 0, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a); i > 1 && !(a >> 24);) a <<= 8, i--;
                            i < 4 && e.splice(n, 4 - i), i |= 128
                        }
                        return e.splice(n - 2, 2, r, i), e
                    }

                    function A(t, e, r, i) {
                        Object.defineProperties(this, {
                            _key: {
                                value: t
                            },
                            type: {
                                value: t.type,
                                enumerable: !0
                            },
                            extractable: {
                                value: void 0 === r ? t.extractable : r,
                                enumerable: !0
                            },
                            algorithm: {
                                value: void 0 === e ? t.algorithm : e,
                                enumerable: !0
                            },
                            usages: {
                                value: void 0 === i ? t.usages : i,
                                enumerable: !0
                            }
                        })
                    }

                    function C(t) {
                        return "verify" === t || "encrypt" === t || "wrapKey" === t
                    }

                    function B(t) {
                        return "sign" === t || "decrypt" === t || "unwrapKey" === t
                    }
                }, "function" == typeof define && define.amd ? define([], (function() {
                    return n(i)
                })) : "object" == typeof module && module.exports ? module.exports = n(i) : n(i);
                const o = {}
            }, (t, e, r) => {
                const {
                    crc16: i,
                    hexToBytes: n,
                    bytesToHex: o,
                    stringToBytes: s,
                    base64toString: a,
                    stringToBase64: h
                } = r(2);
                class u {
                    static isValid(t) {
                        try {
                            return new u(t), !0
                        } catch (t) {
                            return !1
                        }
                    }
                    constructor(t) {
                        if (null == t) throw "Invalid address";
                        if (t instanceof u) return this.wc = t.wc, this.hashPart = t.hashPart, this.isTestOnly = t.isTestOnly, this.isUserFriendly = t.isUserFriendly, this.isBounceable = t.isBounceable, void(this.isUrlSafe = t.isUrlSafe);
                        if (t.search(/\-/) > 0 || t.search(/_/) > 0 ? (this.isUrlSafe = !0, t = t.replace(/\-/g, "+").replace(/_/g, "/")) : this.isUrlSafe = !1, t.indexOf(":") > -1) {
                            const e = t.split(":");
                            if (2 !== e.length) throw new Error("Invalid address " + t);
                            const r = parseInt(e[0]);
                            if (0 !== r && -1 !== r) throw new Error("Invalid address wc " + t);
                            const i = e[1];
                            if (64 !== i.length) throw new Error("Invalid address hex " + t);
                            this.isUserFriendly = !1, this.wc = r, this.hashPart = n(i), this.isTestOnly = !1, this.isBounceable = !1
                        } else {
                            this.isUserFriendly = !0;
                            const e = function(t) {
                                if (48 !== t.length) throw new Error("User-friendly address should contain strictly 48 characters");
                                const e = s(a(t));
                                if (36 !== e.length) throw "Unknown address type: byte length is not equal to 36";
                                const r = e.slice(0, 34),
                                    n = e.slice(34, 36),
                                    o = i(r);
                                if (o[0] !== n[0] || o[1] !== n[1]) throw "Wrong crc16 hashsum";
                                let h = r[0],
                                    u = !1,
                                    l = !1;
                                if (128 & h && (u = !0, h ^= 128), 17 !== h && 81 !== h) throw "Unknown address tag";
                                l = 17 === h;
                                let c = null;
                                if (c = 255 === r[1] ? -1 : r[1], 0 !== c && -1 !== c) throw new Error("Invalid address wc " + c);
                                return {
                                    isTestOnly: u,
                                    isBounceable: l,
                                    workchain: c,
                                    hashPart: r.slice(2, 34)
                                }
                            }(t);
                            this.wc = e.workchain, this.hashPart = e.hashPart, this.isTestOnly = e.isTestOnly, this.isBounceable = e.isBounceable
                        }
                    }
                    toString(t, e, r, n) {
                        if (void 0 === t && (t = this.isUserFriendly), void 0 === e && (e = this.isUrlSafe), void 0 === r && (r = this.isBounceable), void 0 === n && (n = this.isTestOnly), t) {
                            let t = r ? 17 : 81;
                            n && (t |= 128);
                            const o = new Int8Array(34);
                            o[0] = t, o[1] = this.wc, o.set(this.hashPart, 2);
                            const s = new Uint8Array(36);
                            s.set(o), s.set(i(o), 34);
                            let a = h(String.fromCharCode.apply(null, new Uint8Array(s)));
                            return e && (a = a.replace(/\+/g, "-").replace(/\//g, "_")), a
                        }
                        return this.wc + ":" + o(this.hashPart)
                    }
                }
                t.exports.default = u
            }, (t, e, r) => {
                const {
                    BitString: i
                } = r(20), {
                    Cell: n
                } = r(21);
                t.exports = {
                    BitString: i,
                    Cell: n
                }
            }, (t, e, r) => {
                const {
                    BN: i,
                    bytesToHex: n
                } = r(1);
                class o {
                    constructor(t) {
                        this.array = Uint8Array.from({
                            length: Math.ceil(t / 8)
                        }, (() => 0)), this.cursor = 0, this.length = t
                    }
                    getFreeBits() {
                        return this.length - this.cursor
                    }
                    getUsedBits() {
                        return this.cursor
                    }
                    getUsedBytes() {
                        return Math.ceil(this.cursor / 8)
                    }
                    get(t) {
                        return (this.array[t / 8 | 0] & 1 << 7 - t % 8) > 0
                    }
                    checkRange(t) {
                        if (t > this.length) throw Error("BitString overflow")
                    }
                    on(t) {
                        this.checkRange(t), this.array[t / 8 | 0] |= 1 << 7 - t % 8
                    }
                    off(t) {
                        this.checkRange(t), this.array[t / 8 | 0] &= ~(1 << 7 - t % 8)
                    }
                    toggle(t) {
                        this.checkRange(t), this.array[t / 8 | 0] ^= 1 << 7 - t % 8
                    }
                    forEach(t) {
                        const e = this.cursor;
                        for (let r = 0; r < e; r++) t(this.get(r))
                    }
                    writeBit(t) {
                        t && t > 0 ? this.on(this.cursor) : this.off(this.cursor), this.cursor = this.cursor + 1
                    }
                    writeBitArray(t) {
                        for (let e = 0; e < t.length; e++) this.writeBit(t[e])
                    }
                    writeUint(t, e) {
                        if (t = new i(t), 0 == e || t.toString(2).length > e) {
                            if (0 == t) return;
                            throw Error("bitLength is too small for number, got number=" + t + ",bitLength=" + e)
                        }
                        const r = t.toString(2, e);
                        for (let t = 0; t < e; t++) this.writeBit(1 == r[t])
                    }
                    writeInt(t, e) {
                        if (t = new i(t), 1 == e) {
                            if (-1 == t) return void this.writeBit(!0);
                            if (0 == t) return void this.writeBit(!1);
                            throw Error("Bitlength is too small for number")
                        }
                        if (t.isNeg()) {
                            this.writeBit(!0);
                            const r = new i(2).pow(new i(e - 1));
                            this.writeUint(r.add(t), e - 1)
                        } else this.writeBit(!1), this.writeUint(t, e - 1)
                    }
                    writeUint8(t) {
                        this.writeUint(t, 8)
                    }
                    writeBytes(t) {
                        for (let e = 0; e < t.length; e++) this.writeUint8(t[e])
                    }
                    writeString(t) {
                        this.writeBytes((new TextEncoder).encode(t))
                    }
                    writeGrams(t) {
                        if (0 == t) this.writeUint(0, 4);
                        else {
                            t = new i(t);
                            const e = Math.ceil(t.toString(16).length / 2);
                            this.writeUint(e, 4), this.writeUint(t, 8 * e)
                        }
                    }
                    writeCoins(t) {
                        this.writeGrams(t)
                    }
                    writeAddress(t) {
                        null == t ? this.writeUint(0, 2) : (this.writeUint(2, 2), this.writeUint(0, 1), this.writeInt(t.wc, 8), this.writeBytes(t.hashPart))
                    }
                    writeBitString(t) {
                        t.forEach((t => {
                            this.writeBit(t)
                        }))
                    }
                    clone() {
                        const t = new o(0);
                        return t.array = this.array.slice(0), t.length = this.length, t.cursor = this.cursor, t
                    }
                    toString() {
                        return this.toHex()
                    }
                    getTopUppedArray() {
                        const t = this.clone();
                        let e = 8 * Math.ceil(t.cursor / 8) - t.cursor;
                        if (e > 0)
                            for (e -= 1, t.writeBit(!0); e > 0;) e -= 1, t.writeBit(!1);
                        return t.array = t.array.slice(0, Math.ceil(t.cursor / 8)), t.array
                    }
                    toHex() {
                        if (this.cursor % 4 == 0) {
                            const t = n(this.array.slice(0, Math.ceil(this.cursor / 8))).toUpperCase();
                            return this.cursor % 8 == 0 ? t : t.substr(0, t.length - 1)
                        } {
                            const t = this.clone();
                            for (t.writeBit(1); t.cursor % 4 != 0;) t.writeBit(0);
                            return t.toHex().toUpperCase() + "_"
                        }
                    }
                    setTopUppedArray(t, e = !0) {
                        if (this.length = 8 * t.length, this.array = t, this.cursor = this.length, !e && this.length) {
                            let r = !1;
                            for (let t = 0; t < 7; t++)
                                if (this.cursor -= 1, this.get(this.cursor)) {
                                    r = !0, this.off(this.cursor);
                                    break
                                }
                            if (!r) throw console.log(t, e), new Error("Incorrect TopUppedArray")
                        }
                    }
                }
                t.exports = {
                    BitString: o
                }
            }, (t, e, r) => {
                const {
                    BitString: i
                } = r(20), {
                    bytesToBase64: n,
                    compareBytes: o,
                    concatBytes: s,
                    crc32c: a,
                    hexToBytes: h,
                    readNBytesUIntFromArray: u,
                    sha256: l,
                    bytesToHex: c
                } = r(1), f = h("B5EE9C72"), d = h("68ff65f3"), p = h("acc3a728");
                class m {
                    constructor() {
                        this.bits = new i(1023), this.refs = [], this.isExotic = !1
                    }
                    static fromBoc(t) {
                        return w(t)
                    }
                    static oneFromBoc(t) {
                        const e = w(t);
                        if (1 !== e.length) throw new Error("expected 1 root cell but have " + e.length);
                        return e[0]
                    }
                    writeCell(t) {
                        this.bits.writeBitString(t.bits), this.refs = this.refs.concat(t.refs)
                    }
                    getMaxLevel() {
                        let t = 0;
                        for (let e in this.refs) {
                            const r = this.refs[e];
                            r.getMaxLevel() > t && (t = r.getMaxLevel())
                        }
                        return t
                    }
                    isExplicitlyStoredHashes() {
                        return 0
                    }
                    getMaxDepth() {
                        let t = 0;
                        if (this.refs.length > 0) {
                            for (let e in this.refs) {
                                const r = this.refs[e];
                                r.getMaxDepth() > t && (t = r.getMaxDepth())
                            }
                            t += 1
                        }
                        return t
                    }
                    getMaxDepthAsArray() {
                        const t = this.getMaxDepth(),
                            e = Uint8Array.from({
                                length: 2
                            }, (() => 0));
                        return e[1] = t % 256, e[0] = Math.floor(t / 256), e
                    }
                    getRefsDescriptor() {
                        const t = Uint8Array.from({
                            length: 1
                        }, (() => 0));
                        return t[0] = this.refs.length + 8 * this.isExotic + 32 * this.getMaxLevel(), t
                    }
                    getBitsDescriptor() {
                        const t = Uint8Array.from({
                            length: 1
                        }, (() => 0));
                        return t[0] = Math.ceil(this.bits.cursor / 8) + Math.floor(this.bits.cursor / 8), t
                    }
                    getDataWithDescriptors() {
                        const t = this.getRefsDescriptor(),
                            e = this.getBitsDescriptor(),
                            r = this.bits.getTopUppedArray();
                        return s(s(t, e), r)
                    }
                    async getRepr() {
                        const t = [];
                        t.push(this.getDataWithDescriptors());
                        for (let e in this.refs) {
                            const r = this.refs[e];
                            t.push(r.getMaxDepthAsArray())
                        }
                        for (let e in this.refs) {
                            const r = this.refs[e];
                            t.push(await r.hash())
                        }
                        let e = new Uint8Array;
                        for (let r in t) {
                            const i = t[r];
                            e = s(e, i)
                        }
                        return e
                    }
                    async hash() {
                        return new Uint8Array(await l(await this.getRepr()))
                    }
                    print(t) {
                        let e = (t = t || "") + "x{" + this.bits.toHex() + "}\n";
                        for (let r in this.refs) e += this.refs[r].print(t + " ");
                        return e
                    }
                    async toBoc(t = !0, e = !0, r = !1, n = 0) {
                        const o = await this.treeWalk(),
                            h = o[0],
                            u = o[1],
                            l = h.length,
                            c = l.toString(2).length,
                            d = Math.min(Math.ceil(c / 8), 1);
                        let p = 0,
                            m = [];
                        for (let t of h) m.push(p), p += await t[1].bocSerializationSize(u, d);
                        const g = p.toString(2).length,
                            v = Math.max(Math.ceil(g / 8), 1),
                            y = new i(1247 * h.length);
                        y.writeBytes(f), y.writeBitArray([t, e, r]), y.writeUint(n, 2), y.writeUint(d, 3), y.writeUint8(v), y.writeUint(l, 8 * d), y.writeUint(1, 8 * d), y.writeUint(0, 8 * d), y.writeUint(p, 8 * v), y.writeUint(0, 8 * d), t && h.forEach(((t, e) => y.writeUint(m[e], 8 * v)));
                        for (let t of h) {
                            const e = await t[1].serializeForBoc(u, d);
                            y.writeBytes(e)
                        }
                        let w = y.getTopUppedArray();
                        return e && (w = s(w, a(w))), w
                    }
                    async serializeForBoc(t, e) {
                        const r = [];
                        if (r.push(this.getDataWithDescriptors()), this.isExplicitlyStoredHashes()) throw new Error("Cell hashes explicit storing is not implemented");
                        for (let e in this.refs) {
                            const i = this.refs[e];
                            let n = t[await i.hash()].toString(16);
                            n.length % 2 && (n = "0" + n);
                            const o = h(n);
                            r.push(o)
                        }
                        let i = new Uint8Array;
                        for (let t in r) {
                            const e = r[t];
                            i = s(i, e)
                        }
                        return i
                    }
                    async bocSerializationSize(t, e) {
                        return (await this.serializeForBoc(t, e)).length
                    }
                    async treeWalk() {
                        return v(this, [], {})
                    }
                }
                async function g(t, e, r) {
                    const i = t[r];
                    for (let e in t) t[e] > i && (t[e] = t[e] - 1);
                    t[r] = e.length - 1;
                    const n = e.splice(i, 1)[0];
                    e.push(n);
                    for (let r of n[1].refs) await g(t, e, await r.hash())
                }
                async function v(t, e, r, i = null) {
                    const n = await t.hash();
                    if (n in r) return i && r[i] > r[n] && await g(r, e, n), [e, r];
                    r[n] = e.length, e.push([n, t]);
                    for (let i of t.refs) {
                        const t = await v(i, e, r, n);
                        e = t[0], r = t[1]
                    }
                    return [e, r]
                }

                function y(t, e) {
                    if (t.length < 2) throw "Not enough bytes to encode cell descriptors";
                    const r = t[0],
                        i = t[1];
                    t = t.slice(2), Math.floor(r / 32);
                    const n = 8 & r,
                        o = r % 8,
                        s = Math.ceil(i / 2),
                        a = !(i % 2);
                    let h = new m;
                    if (h.isExotic = n, t.length < s + e * o) throw "Not enough bytes to encode cell data";
                    h.bits.setTopUppedArray(t.slice(0, s), a), t = t.slice(s);
                    for (let r = 0; r < o; r++) h.refs.push(u(e, t)), t = t.slice(e);
                    return {
                        cell: h,
                        residue: t
                    }
                }

                function w(t) {
                    "string" == typeof t && (t = h(t));
                    const e = function(t) {
                        if (t.length < 5) throw "Not enough bytes for magic prefix";
                        const e = t,
                            r = t.slice(0, 4);
                        let i, n, s, h, l;
                        if (t = t.slice(4), o(r, f)) {
                            const e = t[0];
                            i = 128 & e, n = 64 & e, s = 32 & e, h = 2 * (16 & e) + (8 & e), l = e % 8
                        }
                        if (o(r, d) && (i = 1, n = 0, s = 0, h = 0, l = t[0]), o(r, p) && (i = 1, n = 1, s = 0, h = 0, l = t[0]), (t = t.slice(1)).length < 1 + 5 * l) throw "Not enough bytes for encoding cells counters";
                        const c = t[0];
                        t = t.slice(1);
                        const m = u(l, t);
                        t = t.slice(l);
                        const g = u(l, t);
                        t = t.slice(l);
                        const v = u(l, t);
                        t = t.slice(l);
                        const y = u(c, t);
                        if ((t = t.slice(c)).length < g * l) throw "Not enough bytes for encoding root cells hashes";
                        let w = [];
                        for (let e = 0; e < g; e++) w.push(u(l, t)), t = t.slice(l);
                        let b = !1;
                        if (i) {
                            if (b = [], t.length < c * m) throw "Not enough bytes for index encoding";
                            for (let e = 0; e < m; e++) b.push(u(c, t)), t = t.slice(c)
                        }
                        if (t.length < y) throw "Not enough bytes for cells data";
                        const M = t.slice(0, y);
                        if (t = t.slice(y), n) {
                            if (t.length < 4) throw "Not enough bytes for crc32c hashsum";
                            const r = e.length;
                            if (!o(a(e.slice(0, r - 4)), t.slice(0, 4))) throw "Crc32c hashsum mismatch";
                            t = t.slice(4)
                        }
                        if (t.length) throw "Too much bytes in BoC serialization";
                        return {
                            has_idx: i,
                            hash_crc32: n,
                            has_cache_bits: s,
                            flags: h,
                            size_bytes: l,
                            off_bytes: c,
                            cells_num: m,
                            roots_num: g,
                            absent_num: v,
                            tot_cells_size: y,
                            root_list: w,
                            index: b,
                            cells_data: M
                        }
                    }(t);
                    let r = e.cells_data,
                        i = [];
                    for (let t = 0; t < e.cells_num; t++) {
                        let t = y(r, e.size_bytes);
                        r = t.residue, i.push(t.cell)
                    }
                    for (let t = e.cells_num - 1; t >= 0; t--) {
                        let e = i[t];
                        for (let r = 0; r < e.refs.length; r++) {
                            const n = e.refs[r];
                            if (n < t) throw "Topological order is broken";
                            e.refs[r] = i[n]
                        }
                    }
                    let n = [];
                    for (let t of e.root_list) n.push(i[t]);
                    return n
                }
                t.exports = {
                    Cell: m
                }
            }, (t, e, r) => {
                var i = r(9).Buffer;
                const {
                    Cell: n
                } = r(19), {
                    Address: o,
                    BN: s,
                    bytesToHex: a
                } = r(1), {
                    Contract: h
                } = r(23);
                t.exports = class {
                    constructor(t, e) {
                        this.transport = t, this.ton = e, this.ADDRESS_FORMAT_HEX = 0, this.ADDRESS_FORMAT_USER_FRIENDLY = 1, this.ADDRESS_FORMAT_URL_SAFE = 2, this.ADDRESS_FORMAT_BOUNCEABLE = 4, this.ADDRESS_FORMAT_TEST_ONLY = 8
                    }
                    async getAppConfiguration() {
                        const t = await this.transport.send(224, 1, 0, 0);
                        return {
                            version: t[0] + "." + t[1] + "." + t[2]
                        }
                    }
                    async getPublicKey(t, e) {
                        const r = i.alloc(4);
                        r.writeInt32BE(t);
                        const n = await this.transport.send(224, 2, e ? 1 : 0, 0, r),
                            o = n[0];
                        return {
                            publicKey: new Uint8Array(n.slice(1, 1 + o))
                        }
                    }
                    async getAddress(t, e, r) {
                        const n = i.alloc(4);
                        n.writeInt32BE(t);
                        const s = await this.transport.send(224, 5, e ? 1 : 0, r, n),
                            h = s[0],
                            u = new Uint8Array(s.slice(1, 1 + h));
                        return {
                            address: new o("0:" + a(u))
                        }
                    }
                    async sign(t, e) {
                        const r = i.alloc(4);
                        r.writeInt32BE(t);
                        const n = i.concat([r, i.from(e)]),
                            o = await this.transport.send(224, 3, 0, 0, n),
                            s = o[0];
                        return {
                            signature: o.slice(1, 1 + s)
                        }
                    }
                    async transfer(t, e, r, o, s, a) {
                        const u = await e.createTransferMessage(null, r, o, s, null, 3, !0),
                            l = i.alloc(4);
                        l.writeInt32BE(t);
                        const c = i.concat([l, i.from(await u.signingMessage.toBoc())]),
                            f = await this.transport.send(224, 4, a, 0, c),
                            d = f[0],
                            p = f.slice(1, 1 + d),
                            m = new Uint8Array(p),
                            g = new n;
                        g.bits.writeBytes(m), g.writeCell(u.signingMessage);
                        let v = null,
                            y = null,
                            w = null;
                        if (0 === s) {
                            const t = await e.createStateInit();
                            v = t.stateInit, y = t.code, w = t.data
                        }
                        const b = await e.getAddress(),
                            M = h.createExternalMessageHeader(b),
                            E = h.createCommonMsgInfo(M, v, g),
                            A = new Promise((t => {
                                t({
                                    address: b,
                                    message: E,
                                    body: g,
                                    signature: m,
                                    signingMessage: u.signingMessage,
                                    stateInit: v,
                                    code: y,
                                    data: w
                                })
                            }));
                        return h.createMethod(this.ton.provider, A)
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    Address: n,
                    bytesToBase64: o,
                    bytesToHex: s
                } = r(1);
                class a {
                    constructor(t, e) {
                        this.provider = t, this.options = e, this.address = e.address ? new n(e.address) : null, e.wc || (e.wc = this.address ? this.address.wc : 0), this.methods = {}
                    }
                    async getAddress() {
                        return this.address || (this.address = (await this.createStateInit()).address), this.address
                    }
                    createCodeCell() {
                        if (!this.options.code) throw new Error("Contract: options.code is not defined");
                        return this.options.code
                    }
                    createDataCell() {
                        return new i
                    }
                    async createStateInit() {
                        const t = this.createCodeCell(),
                            e = this.createDataCell(),
                            r = a.createStateInit(t, e),
                            i = await r.hash();
                        return {
                            stateInit: r,
                            address: new n(this.options.wc + ":" + s(i)),
                            code: t,
                            data: e
                        }
                    }
                    static createStateInit(t, e, r = null, n = null, o = null) {
                        if (r) throw "Library in state init is not implemented";
                        if (n) throw "Split depth in state init is not implemented";
                        if (o) throw "Ticktock in state init is not implemented";
                        const s = new i;
                        return s.bits.writeBitArray([Boolean(n), Boolean(o), Boolean(t), Boolean(e), Boolean(r)]), t && s.refs.push(t), e && s.refs.push(e), r && s.refs.push(r), s
                    }
                    static createInternalMessageHeader(t, e = 0, r = !0, o = null, s = !1, a = null, h = null, u = 0, l = 0, c = 0, f = 0) {
                        const d = new i;
                        if (d.bits.writeBit(!1), d.bits.writeBit(r), null !== o ? d.bits.writeBit(o) : d.bits.writeBit(new n(t).isBounceable), d.bits.writeBit(s), d.bits.writeAddress(a ? new n(a) : null), d.bits.writeAddress(new n(t)), d.bits.writeGrams(e), h) throw "Currency collections are not implemented yet";
                        return d.bits.writeBit(Boolean(h)), d.bits.writeGrams(u), d.bits.writeGrams(l), d.bits.writeUint(c, 64), d.bits.writeUint(f, 32), d
                    }
                    static createExternalMessageHeader(t, e = null, r = 0) {
                        const o = new i;
                        return o.bits.writeUint(2, 2), o.bits.writeAddress(e ? new n(e) : null), o.bits.writeAddress(new n(t)), o.bits.writeGrams(r), o
                    }
                    static createCommonMsgInfo(t, e = null, r = null) {
                        const n = new i;
                        return n.writeCell(t), e ? (n.bits.writeBit(!0), n.bits.getFreeBits() - 1 >= e.bits.getUsedBits() ? (n.bits.writeBit(!1), n.writeCell(e)) : (n.bits.writeBit(!0), n.refs.push(e))) : n.bits.writeBit(!1), r ? n.bits.getFreeBits() >= r.bits.getUsedBits() ? (n.bits.writeBit(!1), n.writeCell(r)) : (n.bits.writeBit(!0), n.refs.push(r)) : n.bits.writeBit(!1), n
                    }
                    static createMethod(t, e) {
                        return {
                            getQuery: async () => (await e).message,
                            send: async () => {
                                const r = await e,
                                    i = o(await r.message.toBoc(!1));
                                return t.sendBoc(i)
                            },
                            estimateFee: async () => {
                                const r = await e,
                                    i = r.code ? {
                                        address: r.address.toString(!0, !0, !1),
                                        body: o(await r.body.toBoc(!1)),
                                        init_code: o(await r.code.toBoc(!1)),
                                        init_data: o(await r.data.toBoc(!1))
                                    } : {
                                        address: r.address.toString(!0, !0, !0),
                                        body: o(await r.body.toBoc(!1))
                                    };
                                return t.getEstimateFee(i)
                            }
                        }
                    }
                }
                t.exports = {
                    Contract: a
                }
            }, (t, e, r) => {
                const i = r(25).default;
                "undefined" == typeof fetch && (fetch = r(26));
                const n = "-9223372036854775808";
                class o {
                    constructor(t, e) {
                        this.host = t || "https://toncenter.com/api/v2/jsonRPC", this.options = e || {}
                    }
                    sendImpl(t, e) {
                        const r = {
                            "Content-Type": "application/json"
                        };
                        return this.options.apiKey && (r["X-API-Key"] = this.options.apiKey), fetch(t, {
                            method: "POST",
                            headers: r,
                            body: JSON.stringify(e)
                        }).then((t => t.json())).then((({
                            result: t,
                            error: e
                        }) => t || Promise.reject(e)))
                    }
                    send(t, e) {
                        return this.sendImpl(this.host, {
                            id: 1,
                            jsonrpc: "2.0",
                            method: t,
                            params: e
                        })
                    }
                    async getAddressInfo(t) {
                        return this.send("getAddressInformation", {
                            address: t
                        })
                    }
                    async getExtendedAddressInfo(t) {
                        return this.send("getExtendedAddressInformation", {
                            address: t
                        })
                    }
                    async getWalletInfo(t) {
                        return this.send("getWalletInformation", {
                            address: t
                        })
                    }
                    async getTransactions(t, e = 20, r, i, n, o) {
                        return this.send("getTransactions", {
                            address: t,
                            limit: e,
                            lt: r,
                            hash: i,
                            to_lt: n,
                            archival: o
                        })
                    }
                    async getBalance(t) {
                        return this.send("getAddressBalance", {
                            address: t
                        })
                    }
                    async sendBoc(t) {
                        return this.send("sendBoc", {
                            boc: t
                        })
                    }
                    async sendQuery(t) {
                        return this.send("sendQuerySimple", t)
                    }
                    async getEstimateFee(t) {
                        return this.send("estimateFee", t)
                    }
                    async call(t, e, r = []) {
                        return this.send("runGetMethod", {
                            address: t,
                            method: e,
                            stack: r
                        })
                    }
                    async call2(t, e, r = []) {
                        const n = await this.send("runGetMethod", {
                            address: t,
                            method: e,
                            stack: r
                        });
                        return i.parseResponse(n)
                    }
                    async getMasterchainInfo() {
                        return this.send("getMasterchainInfo", {})
                    }
                    async getBlockShards(t) {
                        return this.send("shards", {
                            seqno: t
                        })
                    }
                    async getBlockTransactions(t, e, r) {
                        return this.send("getBlockTransactions", {
                            workchain: t,
                            shard: e,
                            seqno: r
                        })
                    }
                    async getMasterchainBlockTransactions(t) {
                        return this.getBlockTransactions(-1, n, t)
                    }
                    async getBlockHeader(t, e, r) {
                        return this.send("getBlockHeader", {
                            workchain: t,
                            shard: e,
                            seqno: r
                        })
                    }
                    async getMasterchainBlockHeader(t) {
                        return this.getBlockHeader(-1, n, t)
                    }
                }
                o.SHARD_ID_ALL = n, t.exports.default = o
            }, (t, e, r) => {
                const {
                    BN: i,
                    base64ToBytes: n
                } = r(1), {
                    Cell: o
                } = r(19);
                class s {
                    static parseObject(t) {
                        const e = t["@type"];
                        switch (e) {
                            case "tvm.list":
                            case "tvm.tuple":
                                return t.elements.map(s.parseObject);
                            case "tvm.stackEntryTuple":
                                return s.parseObject(t.tuple);
                            case "tvm.stackEntryNumber":
                                return s.parseObject(t.number);
                            case "tvm.numberDecimal":
                                return new i(t.number, 10);
                            default:
                                throw new Error("unknown type " + e)
                        }
                    }
                    static parseResponseStack(t) {
                        const e = t[0],
                            r = t[1];
                        switch (e) {
                            case "num":
                                return new i(r.replace(/0x/, ""), 16);
                            case "list":
                            case "tuple":
                                return s.parseObject(r);
                            case "cell":
                                const t = n(r.bytes);
                                return o.oneFromBoc(t);
                            default:
                                throw new Error("unknown type " + e)
                        }
                    }
                    static parseResponse(t) {
                        if (0 !== t.exit_code) {
                            const e = new Error("http provider parse response error");
                            throw e.result = t, e
                        }
                        const e = t.stack.map(s.parseResponseStack);
                        return 1 === e.length ? e[0] : e
                    }
                    static makeArg(t) {
                        if (t instanceof i || t instanceof Number) return ["num", t];
                        throw new Error("unknown arg type " + t)
                    }
                    static makeArgs(t) {
                        return t.map(this.makeArg)
                    }
                }
                t.exports.default = s
            }, () => {}, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    Address: n,
                    BN: o,
                    toNano: s,
                    bytesToHex: a,
                    hexToBytes: h,
                    nacl: u,
                    stringToBytes: l,
                    bytesToBase64: c
                } = r(1), {
                    Contract: f
                } = r(23), {
                    SimpleWalletContractR1: d,
                    SimpleWalletContractR2: p,
                    SimpleWalletContractR3: m
                } = r(28), {
                    WalletV2ContractR1: g,
                    WalletV2ContractR2: v
                } = r(30), {
                    WalletV3ContractR1: y,
                    WalletV3ContractR2: w
                } = r(31), {
                    WalletV4ContractR1: b
                } = r(32), {
                    WalletV4ContractR2: M
                } = r(33), E = {
                    simpleR1: d,
                    simpleR2: p,
                    simpleR3: m,
                    v2R1: g,
                    v2R2: v,
                    v3R1: y,
                    v3R2: w,
                    v4R1: b,
                    v4R2: M
                }, A = [d, p, m, g, v, y, w, b, M];
                class C {
                    constructor(t) {
                        this.provider = t, this.all = E, this.list = A, this.defaultVersion = "v3R1", this.default = this.all[this.defaultVersion]
                    }
                    create(t) {
                        return new this.default(this.provider, t)
                    }
                }
                C.all = E, C.list = A, t.exports.default = C
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    WalletContract: n
                } = r(29);
                t.exports = {
                    SimpleWalletContractR1: class extends n {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C72410101010044000084FF0020DDA4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED5441FDF089"), super(t, e)
                        }
                        getName() {
                            return "simpleR1"
                        }
                    },
                    SimpleWalletContractR2: class extends n {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C724101010100530000A2FF0020DD2082014C97BA9730ED44D0D70B1FE0A4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED54D0E2786F"), super(t, e)
                        }
                        getName() {
                            return "simpleR2"
                        }
                    },
                    SimpleWalletContractR3: class extends n {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C7241010101005F0000BAFF0020DD2082014C97BA218201339CBAB19C71B0ED44D0D31FD70BFFE304E0A4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED54B5B86E42"), super(t, e)
                        }
                        getName() {
                            return "simpleR3"
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    nacl: o,
                    stringToBytes: s,
                    Address: a,
                    BN: h
                } = r(1);
                t.exports = {
                    WalletContract: class extends i {
                        constructor(t, e) {
                            if (!e.publicKey && !e.address) throw new Error("WalletContract required publicKey or address in options");
                            super(t, e), this.methods = {
                                transfer: e => i.createMethod(t, this.createTransferMessage(e.secretKey, e.toAddress, e.amount, e.seqno, e.payload, e.sendMode, !Boolean(e.secretKey), e.stateInit)),
                                seqno: () => ({
                                    call: async () => {
                                        const e = await this.getAddress();
                                        let r = null;
                                        try {
                                            r = (await t.call2(e.toString(), "seqno")).toNumber()
                                        } catch (t) {}
                                        return r
                                    }
                                })
                            }, this.deploy = e => i.createMethod(t, this.createInitExternalMessage(e))
                        }
                        getName() {
                            throw new Error("override me")
                        }
                        createDataCell() {
                            const t = new n;
                            return t.bits.writeUint(0, 32), t.bits.writeBytes(this.options.publicKey), t
                        }
                        createSigningMessage(t) {
                            t = t || 0;
                            const e = new n;
                            return e.bits.writeUint(t, 32), e
                        }
                        async createInitExternalMessage(t) {
                            if (!this.options.publicKey) {
                                const e = o.sign.keyPair.fromSecretKey(t);
                                this.options.publicKey = e.publicKey
                            }
                            const {
                                stateInit: e,
                                address: r,
                                code: s,
                                data: a
                            } = await this.createStateInit(), h = this.createSigningMessage(), u = o.sign.detached(await h.hash(), t), l = new n;
                            l.bits.writeBytes(u), l.writeCell(h);
                            const c = i.createExternalMessageHeader(r);
                            return {
                                address: r,
                                message: i.createCommonMsgInfo(c, e, l),
                                body: l,
                                signingMessage: h,
                                stateInit: e,
                                code: s,
                                data: a
                            }
                        }
                        async createExternalMessage(t, e, r, s = !1) {
                            const a = s ? new Uint8Array(64) : o.sign.detached(await t.hash(), e),
                                h = new n;
                            h.bits.writeBytes(a), h.writeCell(t);
                            let u = null,
                                l = null,
                                c = null;
                            if (0 === r) {
                                if (!this.options.publicKey) {
                                    const t = o.sign.keyPair.fromSecretKey(e);
                                    this.options.publicKey = t.publicKey
                                }
                                const t = await this.createStateInit();
                                u = t.stateInit, l = t.code, c = t.data
                            }
                            const f = await this.getAddress(),
                                d = i.createExternalMessageHeader(f);
                            return {
                                address: f,
                                message: i.createCommonMsgInfo(d, u, h),
                                body: h,
                                signature: a,
                                signingMessage: t,
                                stateInit: u,
                                code: l,
                                data: c
                            }
                        }
                        async createTransferMessage(t, e, r, o, s = "", u = 3, l = !1, c = null) {
                            let f = new n;
                            s && (s.refs ? f = s : "string" == typeof s ? s.length > 0 && (f.bits.writeUint(0, 32), f.bits.writeString(s)) : f.bits.writeBytes(s));
                            const d = i.createInternalMessageHeader(new a(e), new h(r)),
                                p = i.createCommonMsgInfo(d, c, f),
                                m = this.createSigningMessage(o);
                            return m.bits.writeUint8(u), m.refs.push(p), this.createExternalMessage(m, t, o, l)
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    WalletContract: n
                } = r(29);
                class o extends n {
                    createSigningMessage(t) {
                        t = t || 0;
                        const e = new i;
                        if (e.bits.writeUint(t, 32), 0 === t)
                            for (let t = 0; t < 32; t++) e.bits.writeBit(1);
                        else {
                            const t = new Date,
                                r = Math.floor(t.getTime() / 1e3);
                            e.bits.writeUint(r + 60, 32)
                        }
                        return e
                    }
                }
                t.exports = {
                    WalletV2ContractR1: class extends o {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C724101010100570000AAFF0020DD2082014C97BA9730ED44D0D70B1FE0A4F2608308D71820D31FD31F01F823BBF263ED44D0D31FD3FFD15131BAF2A103F901541042F910F2A2F800029320D74A96D307D402FB00E8D1A4C8CB1FCBFFC9ED54A1370BB6"), super(t, e)
                        }
                        getName() {
                            return "v2R1"
                        }
                    },
                    WalletV2ContractR2: class extends o {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C724101010100630000C2FF0020DD2082014C97BA218201339CBAB19C71B0ED44D0D31FD70BFFE304E0A4F2608308D71820D31FD31F01F823BBF263ED44D0D31FD3FFD15131BAF2A103F901541042F910F2A2F800029320D74A96D307D402FB00E8D1A4C8CB1FCBFFC9ED54044CD7A1"), super(t, e)
                        }
                        getName() {
                            return "v2R2"
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    WalletContract: n
                } = r(29);
                class o extends n {
                    createSigningMessage(t) {
                        t = t || 0;
                        const e = new i;
                        if (e.bits.writeUint(this.options.walletId, 32), 0 === t)
                            for (let t = 0; t < 32; t++) e.bits.writeBit(1);
                        else {
                            const t = new Date,
                                r = Math.floor(t.getTime() / 1e3);
                            e.bits.writeUint(r + 60, 32)
                        }
                        return e.bits.writeUint(t, 32), e
                    }
                    createDataCell() {
                        const t = new i;
                        return t.bits.writeUint(0, 32), t.bits.writeUint(this.options.walletId, 32), t.bits.writeBytes(this.options.publicKey), t
                    }
                }
                t.exports = {
                    WalletV3ContractR1: class extends o {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C724101010100620000C0FF0020DD2082014C97BA9730ED44D0D70B1FE0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED543FBE6EE0"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc)
                        }
                        getName() {
                            return "v3R1"
                        }
                    },
                    WalletV3ContractR2: class extends o {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C724101010100710000DEFF0020DD2082014C97BA218201339CBAB19F71B0ED44D0D31FD31F31D70BFFE304E0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED5410BD6DAD"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc)
                        }
                        getName() {
                            return "v3R2"
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    Contract: n
                } = r(23), {
                    Address: o,
                    bytesToHex: s,
                    BN: a
                } = r(1), {
                    WalletContract: h
                } = r(29);
                t.exports = {
                    WalletV4ContractR1: class extends h {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C72410215010002F5000114FF00F4A413F4BCF2C80B010201200203020148040504F8F28308D71820D31FD31FD31F02F823BBF263ED44D0D31FD31FD3FFF404D15143BAF2A15151BAF2A205F901541064F910F2A3F80024A4C8CB1F5240CB1F5230CBFF5210F400C9ED54F80F01D30721C0009F6C519320D74A96D307D402FB00E830E021C001E30021C002E30001C0039130E30D03A4C8CB1F12CB1FCBFF1112131403EED001D0D3030171B0915BE021D749C120915BE001D31F218210706C7567BD228210626C6E63BDB022821064737472BDB0925F03E002FA403020FA4401C8CA07CBFFC9D0ED44D0810140D721F404305C810108F40A6FA131B3925F05E004D33FC8258210706C7567BA9131E30D248210626C6E63BAE30004060708020120090A005001FA00F404308210706C7567831EB17080185005CB0527CF165003FA02F40012CB69CB1F5210CB3F0052F8276F228210626C6E63831EB17080185005CB0527CF1624FA0214CB6A13CB1F5230CB3F01FA02F4000092821064737472BA8E3504810108F45930ED44D0810140D720C801CF16F400C9ED54821064737472831EB17080185004CB0558CF1622FA0212CB6ACB1FCB3F9410345F04E2C98040FB000201200B0C0059BD242B6F6A2684080A06B90FA0218470D4080847A4937D29910CE6903E9FF9837812801B7810148987159F31840201580D0E0011B8C97ED44D0D70B1F8003DB29DFB513420405035C87D010C00B23281F2FFF274006040423D029BE84C600201200F100019ADCE76A26840206B90EB85FFC00019AF1DF6A26840106B90EB858FC0006ED207FA00D4D422F90005C8CA0715CBFFC9D077748018C8CB05CB0222CF165005FA0214CB6B12CCCCC971FB00C84014810108F451F2A702006C810108D718C8542025810108F451F2A782106E6F746570748018C8CB05CB025004CF16821005F5E100FA0213CB6A12CB1FC971FB00020072810108D718305202810108F459F2A7F82582106473747270748018C8CB05CB025005CF16821005F5E100FA0214CB6A13CB1F12CB3FC973FB00000AF400C9ED5446A9F34F"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc), this.methods.getPublicKey = this.getPublicKey.bind(this)
                        }
                        getName() {
                            return "v4R1"
                        }
                        createSigningMessage(t, e) {
                            t = t || 0;
                            const r = new i;
                            if (r.bits.writeUint(this.options.walletId, 32), 0 === t)
                                for (let t = 0; t < 32; t++) r.bits.writeBit(1);
                            else {
                                const t = new Date,
                                    e = Math.floor(t.getTime() / 1e3);
                                r.bits.writeUint(e + 60, 32)
                            }
                            return r.bits.writeUint(t, 32), e || r.bits.writeUint(0, 8), r
                        }
                        createDataCell() {
                            const t = new i;
                            return t.bits.writeUint(0, 32), t.bits.writeUint(this.options.walletId, 32), t.bits.writeBytes(this.options.publicKey), t.bits.writeUint(0, 1), t
                        }
                        async getPublicKey() {
                            const t = await this.getAddress();
                            return this.provider.call2(t.toString(), "get_public_key")
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    Contract: n
                } = r(23), {
                    Address: o,
                    bytesToHex: s,
                    BN: a,
                    toNano: h
                } = r(1), {
                    WalletContract: u
                } = r(29);
                t.exports = {
                    WalletV4ContractR2: class extends u {
                        constructor(t, e) {
                            e.code = i.oneFromBoc("B5EE9C72410214010002D4000114FF00F4A413F4BCF2C80B010201200203020148040504F8F28308D71820D31FD31FD31F02F823BBF264ED44D0D31FD31FD3FFF404D15143BAF2A15151BAF2A205F901541064F910F2A3F80024A4C8CB1F5240CB1F5230CBFF5210F400C9ED54F80F01D30721C0009F6C519320D74A96D307D402FB00E830E021C001E30021C002E30001C0039130E30D03A4C8CB1F12CB1FCBFF1011121302E6D001D0D3032171B0925F04E022D749C120925F04E002D31F218210706C7567BD22821064737472BDB0925F05E003FA403020FA4401C8CA07CBFFC9D0ED44D0810140D721F404305C810108F40A6FA131B3925F07E005D33FC8258210706C7567BA923830E30D03821064737472BA925F06E30D06070201200809007801FA00F40430F8276F2230500AA121BEF2E0508210706C7567831EB17080185004CB0526CF1658FA0219F400CB6917CB1F5260CB3F20C98040FB0006008A5004810108F45930ED44D0810140D720C801CF16F400C9ED540172B08E23821064737472831EB17080185005CB055003CF1623FA0213CB6ACB1FCB3FC98040FB00925F03E20201200A0B0059BD242B6F6A2684080A06B90FA0218470D4080847A4937D29910CE6903E9FF9837812801B7810148987159F31840201580C0D0011B8C97ED44D0D70B1F8003DB29DFB513420405035C87D010C00B23281F2FFF274006040423D029BE84C600201200E0F0019ADCE76A26840206B90EB85FFC00019AF1DF6A26840106B90EB858FC0006ED207FA00D4D422F90005C8CA0715CBFFC9D077748018C8CB05CB0222CF165005FA0214CB6B12CCCCC973FB00C84014810108F451F2A7020070810108D718FA00D33FC8542047810108F451F2A782106E6F746570748018C8CB05CB025006CF165004FA0214CB6A12CB1FCB3FC973FB0002006C810108D718FA00D33F305224810108F459F2A782106473747270748018C8CB05CB025005CF165003FA0213CB6ACB1F12CB3FC973FB00000AF400C9ED54696225E5"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc), this.methods.deployAndInstallPlugin = e => n.createMethod(t, this.deployAndInstallPlugin(e)), this.methods.installPlugin = e => n.createMethod(t, this.installPlugin(e)), this.methods.removePlugin = e => n.createMethod(t, this.removePlugin(e)), this.methods.getPublicKey = this.getPublicKey.bind(this), this.methods.getWalletId = this.getWalletId.bind(this), this.methods.isPluginInstalled = this.isPluginInstalled.bind(this), this.methods.getPluginsList = this.getPluginsList.bind(this)
                        }
                        getName() {
                            return "v4R2"
                        }
                        createSigningMessage(t, e) {
                            t = t || 0;
                            const r = new i;
                            if (r.bits.writeUint(this.options.walletId, 32), 0 === t)
                                for (let t = 0; t < 32; t++) r.bits.writeBit(1);
                            else {
                                const t = new Date,
                                    e = Math.floor(t.getTime() / 1e3);
                                r.bits.writeUint(e + 60, 32)
                            }
                            return r.bits.writeUint(t, 32), e || r.bits.writeUint(0, 8), r
                        }
                        createDataCell() {
                            const t = new i;
                            return t.bits.writeUint(0, 32), t.bits.writeUint(this.options.walletId, 32), t.bits.writeBytes(this.options.publicKey), t.bits.writeUint(0, 1), t
                        }
                        async deployAndInstallPlugin(t) {
                            const {
                                secretKey: e,
                                seqno: r,
                                pluginWc: i,
                                amount: n,
                                stateInit: o,
                                body: s
                            } = t, a = this.createSigningMessage(r, !0);
                            return a.bits.writeUint(1, 8), a.bits.writeInt(i, 8), a.bits.writeGrams(n), a.refs.push(o), a.refs.push(s), this.createExternalMessage(a, e, r, !1)
                        }
                        async _setPlugin(t, e) {
                            const {
                                secretKey: r,
                                seqno: i,
                                amount: n,
                                queryId: s
                            } = t, a = new o(t.pluginAddress), u = this.createSigningMessage(i, !0);
                            return u.bits.writeUint(e ? 2 : 3, 8), u.bits.writeInt(a.wc, 8), u.bits.writeBytes(a.hashPart), u.bits.writeGrams(n || h(.1)), u.bits.writeUint(s || 0, 64), this.createExternalMessage(u, r, i, !1)
                        }
                        async installPlugin(t) {
                            return this._setPlugin(t, !0)
                        }
                        async removePlugin(t) {
                            return this._setPlugin(t, !1)
                        }
                        async getWalletId() {
                            const t = await this.getAddress();
                            return (await this.provider.call2(t.toString(), "get_subwallet_id")).toNumber()
                        }
                        async getPublicKey() {
                            const t = await this.getAddress();
                            return this.provider.call2(t.toString(), "get_public_key")
                        }
                        async isPluginInstalled(t) {
                            t = new o(t);
                            const e = "0x" + s(t.hashPart),
                                r = await this.getAddress();
                            return !(await this.provider.call2(r.toString(), "is_plugin_installed", [
                                ["num", t.wc],
                                ["num", e]
                            ])).isZero()
                        }
                        async getPluginsList() {
                            const t = await this.getAddress();
                            return (await this.provider.call2(t.toString(), "get_plugin_list")).map((t => t[0].toNumber() + ":" + t[1].toString(16)))
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Cell: i
                } = r(19), {
                    Address: n,
                    BN: o,
                    toNano: s,
                    bytesToHex: a,
                    hexToBytes: h,
                    nacl: u,
                    stringToBytes: l,
                    bytesToBase64: c,
                    base64ToBytes: f
                } = r(1), {
                    Contract: d
                } = r(23), {
                    WalletContract: p
                } = r(29);
                class m extends p {
                    constructor(t, e) {
                        e.code = i.oneFromBoc("B5EE9C7241021E01000261000114FF00F4A413F4BCF2C80B010201200203020148040501F2F28308D71820D31FD31FD31F802403F823BB13F2F2F003802251A9BA1AF2F4802351B7BA1BF2F4801F0BF9015410C5F9101AF2F4F8005057F823F0065098F823F0062071289320D74A8E8BD30731D4511BDB3C12B001E8309229A0DF72FB02069320D74A96D307D402FB00E8D103A4476814154330F004ED541D0202CD0607020120131402012008090201200F100201200A0B002D5ED44D0D31FD31FD3FFD3FFF404FA00F404FA00F404D1803F7007434C0C05C6C2497C0F83E900C0871C02497C0F80074C7C87040A497C1383C00D46D3C00608420BABE7114AC2F6C2497C338200A208420BABE7106EE86BCBD20084AE0840EE6B2802FBCBD01E0C235C62008087E4055040DBE4404BCBD34C7E00A60840DCEAA7D04EE84BCBD34C034C7CC0078C3C412040DD78CA00C0D0E00130875D27D2A1BE95B0C60000C1039480AF00500161037410AF0050810575056001010244300F004ED540201201112004548E1E228020F4966FA520933023BB9131E2209835FA00D113A14013926C21E2B3E6308003502323287C5F287C572FFC4F2FFFD00007E80BD00007E80BD00326000431448A814C4E0083D039BE865BE803444E800A44C38B21400FE809004E0083D10C06002012015160015BDE9F780188242F847800C02012017180201481B1C002DB5187E006D88868A82609E00C6207E00C63F04EDE20B30020158191A0017ADCE76A268699F98EB85FFC00017AC78F6A268698F98EB858FC00011B325FB513435C2C7E00017B1D1BE08E0804230FB50F620002801D0D3030178B0925B7FE0FA4031FA403001F001A80EDAA4"), super(t, e), this.options.walletId || (this.options.walletId = 698983191 + this.options.wc), this.methods.getPublicKey = this.getPublicKey.bind(this), this.methods.getWalletId = this.getWalletId.bind(this), this.methods.getLiquidBalance = this.getLiquidBalance.bind(this), this.methods.getNominalRestrictedBalance = this.getNominalRestrictedBalance.bind(this), this.methods.getNominalLockedBalance = this.getNominalLockedBalance.bind(this)
                    }
                    getName() {
                        return "lockup-0.1"
                    }
                    createSigningMessage(t, e) {
                        t = t || 0;
                        const r = new i;
                        if (r.bits.writeUint(this.options.walletId, 32), 0 === t)
                            for (let t = 0; t < 32; t++) r.bits.writeBit(1);
                        else {
                            const t = new Date,
                                e = Math.floor(t.getTime() / 1e3);
                            r.bits.writeUint(e + 60, 32)
                        }
                        return r.bits.writeUint(t, 32), r
                    }
                    createDataCell() {
                        const t = new i;
                        return t.bits.writeUint(0, 32), t.bits.writeUint(this.options.walletId, 32), t.bits.writeBytes(this.options.publicKey), t.bits.writeBytes(f(this.options.config.config_public_key)), this.options.config.allowed_destinations ? (t.bits.writeUint(1, 1), t.refs.push(i.oneFromBoc(f(this.options.config.allowed_destinations)))) : t.bits.writeUint(0, 1), t.bits.writeGrams(0), t.bits.writeUint(0, 1), t.bits.writeGrams(0), t.bits.writeUint(0, 1), t
                    }
                    async getWalletId() {
                        const t = await this.getAddress();
                        return (await this.provider.call2(t.toString(), "get_subwallet_id")).toNumber()
                    }
                    async getPublicKey() {
                        const t = await this.getAddress();
                        return this.provider.call2(t.toString(), "get_public_key")
                    }
                    async getLiquidBalance() {
                        const t = await this.getBalances();
                        return t[0] - t[1] - t[2]
                    }
                    async getNominalRestrictedBalance() {
                        return await this.getBalances()[1]
                    }
                    async getNominalLockedBalance() {
                        return await this.getBalances()[2]
                    }
                    async getBalances() {
                        const t = await this.getAddress();
                        return this.provider.call2(t.toString(), "get_balances")
                    }
                }
                t.exports.default = {
                    LockupWalletV1: m,
                    all: {
                        "lockup-0.1": m
                    },
                    list: [m]
                }
            }, (t, e, r) => {
                const {
                    NftCollection: i
                } = r(36), {
                    NftItem: n
                } = r(38), {
                    NftMarketplace: o
                } = r(39), {
                    NftSale: s
                } = r(40);
                t.exports.default = {
                    NftCollection: i,
                    NftItem: n,
                    NftMarketplace: o,
                    NftSale: s
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    Address: o,
                    bytesToBase64: s
                } = r(1), {
                    parseAddress: a
                } = r(37), {
                    createOffchainUriCell: h,
                    serializeUri: u,
                    parseOffchainUriCell: l,
                    getRoyaltyParams: c
                } = r(37);
                t.exports = {
                    NftCollection: class extends i {
                        constructor(t, e) {
                            if (e.wc = 0, e.code = e.code || n.oneFromBoc("B5EE9C724102140100021F000114FF00F4A413F4BCF2C80B0102016202030202CD04050201200E0F04E7D10638048ADF000E8698180B8D848ADF07D201800E98FE99FF6A2687D20699FEA6A6A184108349E9CA829405D47141BAF8280E8410854658056B84008646582A802E78B127D010A65B509E58FE59F80E78B64C0207D80701B28B9E382F970C892E000F18112E001718112E001F181181981E0024060708090201200A0B00603502D33F5313BBF2E1925313BA01FA00D43028103459F0068E1201A44343C85005CF1613CB3FCCCCCCC9ED54925F05E200A6357003D4308E378040F4966FA5208E2906A4208100FABE93F2C18FDE81019321A05325BBF2F402FA00D43022544B30F00623BA9302A402DE04926C21E2B3E6303250444313C85005CF1613CB3FCCCCCCC9ED54002C323401FA40304144C85005CF1613CB3FCCCCCCC9ED54003C8E15D4D43010344130C85005CF1613CB3FCCCCCCC9ED54E05F04840FF2F00201200C0D003D45AF0047021F005778018C8CB0558CF165004FA0213CB6B12CCCCC971FB008002D007232CFFE0A33C5B25C083232C044FD003D0032C03260001B3E401D3232C084B281F2FFF2742002012010110025BC82DF6A2687D20699FEA6A6A182DE86A182C40043B8B5D31ED44D0FA40D33FD4D4D43010245F04D0D431D430D071C8CB0701CF16CCC980201201213002FB5DAFDA89A1F481A67FA9A9A860D883A1A61FA61FF480610002DB4F47DA89A1F481A67FA9A9A86028BE09E008E003E00B01A500C6E"), e.royalty > 1) throw new Error("royalty > 1");
                            e.royaltyBase = 1e3, e.royaltyFactor = Math.floor(e.royalty * e.royaltyBase), super(t, e), this.methods.getCollectionData = this.getCollectionData.bind(this), this.methods.getNftItemAddressByIndex = this.getNftItemAddressByIndex.bind(this), this.methods.getNftItemContent = this.getNftItemContent.bind(this), this.methods.getRoyaltyParams = this.getRoyaltyParams.bind(this)
                        }
                        createContentCell(t) {
                            const e = h(t.collectionContentUri),
                                r = new n;
                            r.bits.writeBytes(u(t.nftItemContentBaseUri));
                            const i = new n;
                            return i.refs[0] = e, i.refs[1] = r, i
                        }
                        createRoyaltyCell(t) {
                            const e = new n;
                            return e.bits.writeUint(t.royaltyFactor, 16), e.bits.writeUint(t.royaltyBase, 16), e.bits.writeAddress(t.royaltyAddress), e
                        }
                        createDataCell() {
                            const t = new n;
                            return t.bits.writeAddress(this.options.ownerAddress), t.bits.writeUint(0, 64), t.refs[0] = this.createContentCell(this.options), t.refs[1] = n.oneFromBoc(this.options.nftItemCodeHex), t.refs[2] = this.createRoyaltyCell(this.options), t
                        }
                        createMintBody(t) {
                            const e = new n;
                            e.bits.writeUint(1, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeUint(t.itemIndex, 64), e.bits.writeCoins(t.amount);
                            const r = new n;
                            r.bits.writeAddress(t.itemOwnerAddress);
                            const i = new n;
                            return i.bits.writeBytes(u(t.itemContentUri)), r.refs[0] = i, e.refs[0] = r, e
                        }
                        createGetRoyaltyParamsBody(t) {
                            const e = new n;
                            return e.bits.writeUint(1765620048, 32), e.bits.writeUint(t.queryId || 0, 64), e
                        }
                        createChangeOwnerBody(t) {
                            const e = new n;
                            return e.bits.writeUint(3, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeAddress(t.newOwnerAddress), e
                        }
                        createEditContentBody(t) {
                            if (t.royalty > 1) throw new Error("royalty > 1");
                            t.royaltyBase = 1e3, t.royaltyFactor = Math.floor(t.royalty * t.royaltyBase);
                            const e = new n;
                            return e.bits.writeUint(4, 32), e.bits.writeUint(t.queryId || 0, 64), e.refs[0] = this.createContentCell(t), e.refs[1] = this.createRoyaltyCell(t), e
                        }
                        async getCollectionData() {
                            const t = await this.getAddress(),
                                e = await this.provider.call2(t.toString(), "get_collection_data"),
                                r = e[0].toNumber(),
                                i = l(e[1]);
                            return {
                                nextItemIndex: r,
                                ownerAddress: a(e[2]),
                                collectionContentUri: i
                            }
                        }
                        async getNftItemContent(t) {
                            const e = await this.getAddress(),
                                r = await t.getData();
                            if (r.isInitialized) {
                                const t = await this.provider.call2(e.toString(), "get_nft_content", [
                                    ["num", r.index],
                                    ["tvm.Cell", s(await r.contentCell.toBoc(!1))]
                                ]);
                                r.contentUri = l(t), delete r.contentCell
                            }
                            return r
                        }
                        async getNftItemAddressByIndex(t) {
                            const e = await this.getAddress(),
                                r = await this.provider.call2(e.toString(), "get_nft_address_by_index", [
                                    ["num", t]
                                ]);
                            return a(r)
                        }
                        async getRoyaltyParams() {
                            const t = await this.getAddress();
                            return c(this.provider, t.toString())
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    base64ToBytes: i,
                    Address: n
                } = r(1), {
                    Cell: o
                } = r(19), s = t => (new TextEncoder).encode(encodeURI(t)), a = t => (new TextDecoder).decode(t), h = (t, e, r) => {
                    let i = BigInt(0);
                    for (let n = 0; n < r; n++) i *= BigInt(2), i += BigInt(t.get(e + n));
                    return i
                }, u = t => {
                    let e = h(t.bits, 3, 8);
                    e > BigInt(127) && (e -= BigInt(256));
                    const r = h(t.bits, 11, 256);
                    if (e.toString(10) + ":" + r.toString(16) == "0:0") return null;
                    const i = e.toString(10) + ":" + r.toString(16).padStart(64, "0");
                    return new n(i)
                };
                t.exports = {
                    SNAKE_DATA_PREFIX: 0,
                    CHUNK_DATA_PREFIX: 1,
                    ONCHAIN_CONTENT_PREFIX: 0,
                    OFFCHAIN_CONTENT_PREFIX: 1,
                    parseAddress: u,
                    serializeUri: s,
                    parseUri: a,
                    createOffchainUriCell: t => {
                        const e = new o;
                        return e.bits.writeUint(1, 8), e.bits.writeBytes(s(t)), e
                    },
                    parseOffchainUriCell: t => {
                        let e = 0,
                            r = t;
                        for (; r;) e += r.bits.array.length, r = r.refs[0];
                        const i = new Uint8Array(e);
                        for (e = 0, r = t; r;) i.set(r.bits.array, e), e += r.bits.array.length, r = r.refs[0];
                        return a(i.slice(1))
                    },
                    getRoyaltyParams: async (t, e) => {
                        const r = await t.call2(e, "royalty_params"),
                            i = r[0].toNumber(),
                            n = r[1].toNumber();
                        return {
                            royalty: i / n,
                            royaltyBase: n,
                            royaltyFactor: i,
                            royaltyAddress: u(r[2])
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    Address: o,
                    BN: s
                } = r(1), {
                    parseAddress: a,
                    getRoyaltyParams: h
                } = r(37), {
                    parseOffchainUriCell: u
                } = r(37), l = "B5EE9C7241020D010001D0000114FF00F4A413F4BCF2C80B0102016202030202CE04050009A11F9FE00502012006070201200B0C02D70C8871C02497C0F83434C0C05C6C2497C0F83E903E900C7E800C5C75C87E800C7E800C3C00812CE3850C1B088D148CB1C17CB865407E90350C0408FC00F801B4C7F4CFE08417F30F45148C2EA3A1CC840DD78C9004F80C0D0D0D4D60840BF2C9A884AEB8C097C12103FCBC20080900113E910C1C2EBCB8536001F65135C705F2E191FA4021F001FA40D20031FA00820AFAF0801BA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E821005138D91C85009CF16500BCF16712449145446A0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00104794102A375BE20A00727082108B77173505C8CBFF5004CF1610248040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB000082028E3526F0018210D53276DB103744006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303234E25502F003003B3B513434CFFE900835D27080269FC07E90350C04090408F80C1C165B5B60001D00F232CFD633C58073C5B3327B5520BF75041B";
                class c extends i {
                    constructor(t, e) {
                        e.wc = 0, e.code = e.code || n.oneFromBoc(l), super(t, e), this.methods.getData = this.getData.bind(this)
                    }
                    createDataCell() {
                        const t = new n;
                        return t.bits.writeUint(this.options.index, 64), t.bits.writeAddress(this.options.collectionAddress), t
                    }
                    async getData() {
                        const t = await this.getAddress(),
                            e = await this.provider.call2(t.toString(), "get_nft_data"),
                            r = -1 === e[0].toNumber(),
                            i = e[1].toNumber(),
                            n = a(e[2]),
                            o = r ? a(e[3]) : null,
                            s = e[4];
                        return {
                            isInitialized: r,
                            index: i,
                            collectionAddress: n,
                            ownerAddress: o,
                            contentCell: s,
                            contentUri: r && null === n ? u(s) : null
                        }
                    }
                    async createTransferBody(t) {
                        const e = new n;
                        return e.bits.writeUint(1607220500, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeAddress(t.newOwnerAddress), e.bits.writeAddress(t.responseAddress), e.bits.writeBit(!1), e.bits.writeCoins(t.forwardAmount || new s(0)), e.bits.writeBit(!1), t.forwardPayload && e.bits.writeBytes(t.forwardPayload), e
                    }
                    createGetStaticDataBody(t) {
                        const e = new n;
                        return e.bits.writeUint(801842850, 32), e.bits.writeUint(t.queryId || 0, 64), e
                    }
                    async getRoyaltyParams() {
                        const t = await this.getAddress();
                        return h(this.provider, t.toString())
                    }
                }
                c.codeHex = l, t.exports = {
                    NftItem: c
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    Address: o
                } = r(1), {
                    parseAddress: s
                } = r(37);
                t.exports = {
                    NftMarketplace: class extends i {
                        constructor(t, e) {
                            e.wc = 0, e.code = e.code || n.oneFromBoc("B5EE9C7241010401006D000114FF00F4A413F4BCF2C80B01020120020300AAD23221C700915BE0D0D3030171B0915BE0FA40ED44D0FA403012C705F2E19101D31F01C0018E2BFA003001D4D43021F90070C8CA07CBFFC9D077748018C8CB05CB0258CF165004FA0213CB6BCCCCC971FB00915BE20004F2308EF7CCE7"), super(t, e)
                        }
                        createDataCell() {
                            const t = new n;
                            return t.bits.writeAddress(this.options.ownerAddress), t
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    parseAddress: o
                } = r(37), {
                    BN: s
                } = r(1), a = "B5EE9C7241020A010001B4000114FF00F4A413F4BCF2C80B01020120020302014804050004F2300202CD0607002FA03859DA89A1F481F481F481F401A861A1F401F481F4006101F7D00E8698180B8D8492F82707D201876A2687D207D207D207D006A18116BA4E10159C71D991B1B2990E382C92F837028916382F970FA01698FC1080289C6C8895D7970FAE99F98FD2018201A642802E78B2801E78B00E78B00FD016664F6AA701363804C9B081B2299823878027003698FE99F9810E000C92F857010C0801F5D41081DCD650029285029185F7970E101E87D007D207D0018384008646582A804E78B28B9D090D0A85AD08A500AFD010AE5B564B8FD80384008646582AC678B2803FD010B65B564B8FD80384008646582A802E78B00FD0109E5B564B8FD80381041082FE61E8A10C00C646582A802E78B117D010A65B509E58F8A40900C8C0029A3110471036454012F004E032363704C0038E4782103B9ACA0015BEF2E1C95312C70559C705B1F2E1CA702082105FCC3D14218010C8CB055006CF1622FA0215CB6A14CB1F14CB3F21CF1601CF16CA0021FA02CA00C98100A0FB00E05F06840FF2F0002ACB3F22CF1658CF16CA0021FA02CA00C98100A0FB00AECABAD1";
                class h extends i {
                    constructor(t, e) {
                        e.wc = 0, e.code = e.code || n.oneFromBoc(a), super(t, e), this.methods.getData = this.getData.bind(this)
                    }
                    createDataCell() {
                        const t = new n;
                        t.bits.writeAddress(this.options.marketplaceAddress), t.bits.writeAddress(this.options.nftAddress), t.bits.writeAddress(null), t.bits.writeCoins(this.options.fullPrice);
                        const e = new n;
                        return e.bits.writeCoins(this.options.marketplaceFee), e.bits.writeAddress(this.options.royaltyAddress), e.bits.writeCoins(this.options.royaltyAmount), t.refs[0] = e, t
                    }
                    async getData() {
                        const t = await this.getAddress(),
                            e = await this.provider.call2(t.toString(), "get_sale_data");
                        return {
                            marketplaceAddress: o(e[0]),
                            nftAddress: o(e[1]),
                            nftOwnerAddress: o(e[2]),
                            fullPrice: e[3],
                            marketplaceFee: e[4],
                            royaltyAddress: o(e[5]),
                            royaltyAmount: e[6]
                        }
                    }
                    async createCancelBody(t) {
                        const e = new n;
                        return e.bits.writeUint(3, 32), e.bits.writeUint(t.queryId || 0, 64), e
                    }
                }
                h.codeHex = a, t.exports = {
                    NftSale: h
                }
            }, (t, e, r) => {
                const {
                    JettonMinter: i
                } = r(42), {
                    JettonWallet: n
                } = r(43);
                t.exports.default = {
                    JettonMinter: i,
                    JettonWallet: n
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    createOffchainUriCell: o,
                    parseOffchainUriCell: s,
                    parseAddress: a
                } = r(37), {
                    Address: h,
                    BN: u,
                    bytesToBase64: l
                } = r(1);
                t.exports = {
                    JettonMinter: class extends i {
                        constructor(t, e) {
                            e.wc = 0, e.code = e.code || n.oneFromBoc("B5EE9C72410209010001AA000114FF00F4A413F4BCF2C80B0102016202030202CC040502037A60070801D5D9910E38048ADF068698180B8D848ADF07D201800E98FE99FF6A2687D007D206A6A18400AA9385D47181A9AA8AAE382F9702480FD207D006A18106840306B90FD001812881A28217804502A906428027D012C678B666664F6AA7041083DEECBEF0BDD71812F83C207F9784060093DFC142201B82A1009AA0A01E428027D012C678B00E78B666491646580897A007A00658064907C80383A6465816503E5FFE4E83BC00C646582AC678B28027D0109E5B589666664B8FD80400FC03FA00FA40F82854120870542013541403C85004FA0258CF1601CF16CCC922C8CB0112F400F400CB00C9F9007074C8CB02CA07CBFFC9D05008C705F2E04A12A1035024C85004FA0258CF16CCCCC9ED5401FA403020D70B01C3008E1F8210D53276DB708010C8CB055003CF1622FA0212CB6ACB1FCB3FC98042FB00915BE2007DADBCF6A2687D007D206A6A183618FC1400B82A1009AA0A01E428027D012C678B00E78B666491646580897A007A00658064FC80383A6465816503E5FFE4E840001FAF16F6A2687D007D206A6A183FAA9040F6B06B3C"), super(t, e)
                        }
                        createDataCell() {
                            const t = new n;
                            return t.bits.writeCoins(0), t.bits.writeAddress(this.options.adminAddress), t.refs[0] = o(this.options.jettonContentUri), t.refs[1] = n.oneFromBoc(this.options.jettonWalletCodeHex), t
                        }
                        createMintBody(t) {
                            const e = new n;
                            e.bits.writeUint(21, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeAddress(t.destination), e.bits.writeCoins(t.amount);
                            const r = new n;
                            return r.bits.writeUint(395134233, 32), r.bits.writeUint(t.queryId || 0, 64), r.bits.writeCoins(t.jettonAmount), r.bits.writeAddress(null), r.bits.writeAddress(null), r.bits.writeCoins(new u(0)), r.bits.writeBit(!1), e.refs[0] = r, e
                        }
                        async getJettonData() {
                            const t = await this.getAddress(),
                                e = await this.provider.call2(t.toString(), "get_jetton_data");
                            return {
                                totalSupply: e[0],
                                isMutable: -1 === e[1].toNumber(),
                                adminAddress: a(e[2]),
                                jettonContentUri: s(e[3]),
                                tokenWalletCode: e[4]
                            }
                        }
                        async getJettonWalletAddress(t) {
                            const e = await this.getAddress(),
                                r = new n;
                            r.bits.writeAddress(t);
                            const i = await this.provider.call2(e.toString(), "get_wallet_address", [
                                ["tvm.Slice", l(await r.toBoc(!1))]
                            ]);
                            return a(i)
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    parseAddress: o
                } = r(37), {
                    BN: s
                } = r(1), a = "B5EE9C7241021101000319000114FF00F4A413F4BCF2C80B0102016202030202CC0405001BA0F605DA89A1F401F481F481A8610201D40607020148080900BB0831C02497C138007434C0C05C6C2544D7C0FC02F83E903E900C7E800C5C75C87E800C7E800C00B4C7E08403E29FA954882EA54C4D167C0238208405E3514654882EA58C4CD00CFC02780D60841657C1EF2EA4D67C02B817C12103FCBC2000113E910C1C2EBCB853600201200A0B0201200F1001F500F4CFFE803E90087C007B51343E803E903E90350C144DA8548AB1C17CB8B04A30BFFCB8B0950D109C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF274013E903D010C7E801DE0063232C1540233C59C3E8085F2DAC4F3208405E351467232C7C6600C02F13B51343E803E903E90350C01F4CFFE80145468017E903E9014D6B1C1551CDB1C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C0327E401C1D3232C0B281F2FFF274140331C146EC7CB8B0C27E8020822625A020822625A02806A8486544124E17C138C34975C2C070C00930802C200D0E008ECB3F5007FA0222CF165006CF1625FA025003CF16C95005CC07AA0013A08208989680AA008208989680A0A014BCF2E2C504C98040FB001023C85004FA0258CF1601CF16CCC9ED54006C5219A018A182107362D09CC8CB1F5240CB3F5003FA0201CF165007CF16C9718018C8CB0525CF165007FA0216CB6A15CCC971FB00103400828E2A820898968072FB028210D53276DB708010C8CB055008CF165005FA0216CB6A13CB1F13CB3FC972FB0058926C33E25502C85004FA0258CF1601CF16CCC9ED5400DB3B51343E803E903E90350C01F4CFFE803E900C145468549271C17CB8B049F0BFFCB8B0A0822625A02A8005A805AF3CB8B0E0841EF765F7B232C7C572CFD400FE8088B3C58073C5B25C60043232C14933C59C3E80B2DAB33260103EC01004F214013E809633C58073C5B3327B55200083200835C87B51343E803E903E90350C0134C7E08405E3514654882EA0841EF765F784EE84AC7CB8B174CFCC7E800C04E81408F214013E809633C58073C5B3327B55204F664B79";
                class h extends i {
                    constructor(t, e) {
                        e.wc = 0, e.code = e.code || n.oneFromBoc(a), super(t, e)
                    }
                    async createTransferBody(t) {
                        const e = new n;
                        return e.bits.writeUint(260734629, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeCoins(t.jettonAmount), e.bits.writeAddress(t.toAddress), e.bits.writeAddress(t.responseAddress), e.bits.writeBit(!1), e.bits.writeCoins(t.forwardAmount || new s(0)), e.bits.writeBit(!1), t.forwardPayload && e.bits.writeBytes(t.forwardPayload), e
                    }
                    async createBurnBody(t) {
                        const e = new n;
                        return e.bits.writeUint(1499400124, 32), e.bits.writeUint(t.queryId || 0, 64), e.bits.writeCoins(t.jettonAmount), e.bits.writeAddress(t.responseAddress), e
                    }
                    async getData() {
                        const t = await this.getAddress(),
                            e = await this.provider.call2(t.toString(), "get_wallet_data");
                        return {
                            balance: e[0],
                            ownerAddress: o(e[1]),
                            jettonMinterAddress: o(e[2]),
                            jettonWalletCode: e[3]
                        }
                    }
                }
                h.codeHex = a, t.exports = {
                    JettonWallet: h
                }
            }, (t, e, r) => {
                const {
                    BlockSubscription: i
                } = r(45), {
                    InMemoryBlockStorage: n
                } = r(46);
                t.exports = {
                    BlockSubscription: i,
                    InMemoryBlockStorage: n
                }
            }, t => {
                const e = t => ({
                    workchain: t.workchain,
                    shardId: t.shard,
                    shardBlockNumber: t.seqno
                });
                t.exports = {
                    BlockSubscription: class {
                        constructor(t, e, r, i) {
                            this.provider = t, this.storage = e, this.onBlock = r, this.startMcBlockNumber = i ? i.startMcBlockNumber : void 0, this.mcInterval = (i ? i.mcInterval : void 0) || 1e4, this.shardsInterval = (i ? i.shardsInterval : void 0) || 1e3
                        }
                        async start() {
                            if (this.stop(), !this.startMcBlockNumber && (this.startMcBlockNumber = (await this.provider.getMasterchainInfo()).last.seqno, !this.startMcBlockNumber)) throw new Error("Cannot get start mc block number from provider");
                            const t = await this.provider.getMasterchainBlockHeader(this.startMcBlockNumber);
                            if (this.startLT = t.end_lt, !this.startLT) throw new Error("Cannot get startLT from provider");
                            let r = !1;
                            const i = async () => {
                                if (!r) {
                                    r = !0;
                                    try {
                                        const t = await this.storage.getLastMasterchainBlockNumber() || this.startMcBlockNumber;
                                        if (!t) throw new Error("no init masterchain block in storage");
                                        const r = (await this.provider.getMasterchainInfo()).last.seqno;
                                        if (!r) throw new Error("invalid last masterchain block from provider");
                                        for (let i = t + 1; i < r; i++) {
                                            const t = await this.provider.getBlockShards(i),
                                                r = await this.provider.getMasterchainBlockHeader(i);
                                            await this.onBlock(r, t), await this.storage.insertBlocks(i, t.shards.map(e))
                                        }
                                    } catch (t) {
                                        console.error(t)
                                    }
                                    r = !1
                                }
                            };
                            this.mcIntervalId = setInterval((() => i()), this.mcInterval), i();
                            let n = !1;
                            const o = async () => {
                                if (!n) {
                                    n = !0;
                                    try {
                                        const t = await this.storage.getUnprocessedShardBlock();
                                        if (t) {
                                            const {
                                                workchain: r,
                                                shardId: i,
                                                shardBlockNumber: n
                                            } = t, o = await this.provider.getBlockHeader(r, i, n);
                                            if (o.end_lt < this.startLT) await this.storage.setBlockProcessed(r, i, n, []);
                                            else {
                                                await this.onBlock(o);
                                                const t = o.prev_blocks.map(e);
                                                await this.storage.setBlockProcessed(r, i, n, t)
                                            }
                                        }
                                    } catch (t) {
                                        console.log(t)
                                    }
                                    n = !1
                                }
                            };
                            this.shardsIntervalId = setInterval((() => o()), this.shardsInterval)
                        }
                        stop() {
                            clearInterval(this.mcIntervalId), clearInterval(this.shardsIntervalId)
                        }
                    }
                }
            }, t => {
                t.exports = {
                    InMemoryBlockStorage: class {
                        constructor(t) {
                            this.masterchainBlocks = {}, this.shardchainBlocks = {}, this.logFunction = t
                        }
                        async insertShardBlocks(t) {
                            for (const {
                                    workchain: e,
                                    shardId: r,
                                    shardBlockNumber: i
                                } of t) void 0 === this.shardchainBlocks[e + "_" + r + "_" + i] && (this.logFunction && this.logFunction("insert shard " + e + " " + r + " " + i), this.shardchainBlocks[e + "_" + r + "_" + i] = !1)
                        }
                        async insertBlocks(t, e) {
                            if (this.logFunction && this.logFunction("mc processed " + t), void 0 !== this.masterchainBlocks[t]) throw new Error("mc already exists " + t);
                            this.masterchainBlocks[t] = !0, await this.insertShardBlocks(e)
                        }
                        async getLastMasterchainBlockNumber() {
                            return Object.keys(this.masterchainBlocks).map((t => Number(t))).sort(((t, e) => e - t))[0]
                        }
                        async setBlockProcessed(t, e, r, i) {
                            if (this.logFunction && this.logFunction("shard processed " + t + " " + e + " " + r), void 0 === this.shardchainBlocks[t + "_" + e + "_" + r]) throw new Error("shard not exists " + t + "_" + e + "_" + r);
                            this.shardchainBlocks[t + "_" + e + "_" + r] = !0, await this.insertShardBlocks(i)
                        }
                        async getUnprocessedShardBlock() {
                            for (let t in this.shardchainBlocks)
                                if (!1 === this.shardchainBlocks[t]) {
                                    const e = t.split("_");
                                    return {
                                        workchain: Number(e[0]),
                                        shardId: e[1],
                                        shardBlockNumber: Number(e[2])
                                    }
                                }
                        }
                    }
                }
            }, (t, e, r) => {
                const {
                    Contract: i
                } = r(23), {
                    Cell: n
                } = r(19), {
                    hexToBytes: o,
                    BN: s,
                    nacl: a,
                    bytesToBase64: h
                } = r(1);
                t.exports = {
                    SubscriptionContract: class extends i {
                        constructor(t, e) {
                            e.code = n.oneFromBoc("B5EE9C7241020F01000262000114FF00F4A413F4BCF2C80B0102012002030201480405036AF230DB3C5335A127A904F82327A128A90401BC5135A0F823B913B0F29EF800725210BE945387F0078E855386DB3CA4E2F82302DB3C0B0C0D0202CD06070121A0D0C9B67813F488DE0411F488DE0410130B048FD6D9E05E8698198FD201829846382C74E2F841999E98F9841083239BA395D497803F018B841083AB735BBED9E702984E382D9C74688462F863841083AB735BBED9E70156BA4E09040B0A0A080269F10FD22184093886D9E7C12C1083239BA39384008646582A803678B2801FD010A65B5658F89659FE4B9FD803FC1083239BA396D9E40E0A04F08E8D108C5F0C708210756E6B77DB3CE00AD31F308210706C7567831EB15210BA8F48305324A126A904F82326A127A904BEF27109FA4430A619F833D078D721D70B3F5260A11BBE8E923036F82370708210737562732759DB3C5077DE106910581047103645135042DB3CE0395F076C2232821064737472BA0A0A0D09011A8E897F821064737472DB3CE0300A006821B39982100400000072FB02DE70F8276F118010C8CB055005CF1621FA0214F40013CB6912CB1F830602948100A032DEC901FB000030ED44D0FA40FA40FA00D31FD31FD31FD31FD31FD307D31F30018021FA443020813A98DB3C01A619F833D078D721D70B3FA070F8258210706C7567228018C8CB055007CF165004FA0215CB6A12CB1F13CB3F01FA02CB00C973FB000E0040C8500ACF165008CF165006FA0214CB1F12CB1FCB1FCB1FCB1FCB07CB1FC9ED54005801A615F833D020D70B078100D1BA95810088D721DED307218100DDBA028100DEBA12B1F2E047D33F30A8AB0FE5855AB4"), super(t, e), this.methods.pay = () => i.createMethod(t, this.createPayExternalMessage()), this.methods.getSubscriptionData = this.getSubscriptionData.bind(this)
                        }
                        createDataCell() {
                            const t = new n;
                            return t.bits.writeAddress(this.options.wallet), t.bits.writeAddress(this.options.beneficiary), t.bits.writeGrams(this.options.amount), t.bits.writeUint(this.options.period, 32), t.bits.writeUint(this.options.startAt, 32), t.bits.writeUint(this.options.timeout, 32), t.bits.writeUint(0, 32), t.bits.writeUint(0, 32), t.bits.writeUint(0, 8), t.bits.writeUint(this.options.subscriptionId, 32), t
                        }
                        createBody() {
                            const t = new n;
                            return t.bits.writeUint(new s(1886156135).add(new s(2147483648)), 32), t
                        }
                        createSelfDestructBody() {
                            const t = new n;
                            return t.bits.writeUint(1685288050, 32), t
                        }
                        async getSubscriptionData() {
                            const t = t => t[0].toNumber() + ":" + t[1].toString(16),
                                e = await this.getAddress(),
                                r = await this.provider.call2(e.toString(), "get_subscription_data");
                            return {
                                wallet: t(r[0]),
                                beneficiary: t(r[1]),
                                amount: r[2],
                                period: r[3].toNumber(),
                                startAt: r[4].toNumber(),
                                timeout: r[5].toNumber(),
                                lastPayment: r[6].toNumber(),
                                lastRequest: r[7].toNumber(),
                                failedAttempts: r[8].toNumber(),
                                subscriptionId: r[9].toNumber()
                            }
                        }
                        async createPayExternalMessage() {
                            const t = await this.getAddress(),
                                e = i.createExternalMessageHeader(t),
                                r = i.createCommonMsgInfo(e, null, null),
                                o = new n;
                            return o.bits.writeUint(Math.floor(Date.now() / 1e3), 64), {
                                address: t,
                                message: r,
                                body: o
                            }
                        }
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    default: () => l
                });
                var i = r(49),
                    n = r(52),
                    o = r(53),
                    s = r(101),
                    a = r(51),
                    h = r(102),
                    u = r(9).Buffer;
                class l extends i.default {
                    constructor(t, e) {
                        super(), this.device = void 0, this.deviceModel = void 0, this.channel = Math.floor(65535 * Math.random()), this.packetSize = 64, this.interfaceNumber = void 0, this._disconnectEmitted = !1, this._emitDisconnect = t => {
                            this._disconnectEmitted || (this._disconnectEmitted = !0, this.emit("disconnect", t))
                        }, this.exchange = t => this.exchangeAtomicImpl((async () => {
                            const {
                                channel: e,
                                packetSize: r
                            } = this;
                            (0, s.log)("apdu", "=> " + t.toString("hex"));
                            const i = (0, n.default)(e, r),
                                o = i.makeBlocks(t);
                            for (let t = 0; t < o.length; t++) await this.device.transferOut(3, o[t]);
                            let a, h;
                            for (; !(a = i.getReducedResult(h));) {
                                const t = await this.device.transferIn(3, r),
                                    e = u.from(t.data.buffer);
                                h = i.reduceResponse(h, e)
                            }
                            return (0, s.log)("apdu", "<= " + a.toString("hex")), a
                        })).catch((t => {
                            if (t && t.message && t.message.includes("disconnected")) throw this._emitDisconnect(t), new a.DisconnectedDeviceDuringOperation(t.message);
                            throw t
                        })), this.device = t, this.interfaceNumber = e, this.deviceModel = (0, o.identifyUSBProductId)(t.productId)
                    }
                    static async request() {
                        const t = await (0, h.requestLedgerDevice)();
                        return l.open(t)
                    }
                    static async openConnected() {
                        const t = await (0, h.getLedgerDevices)();
                        return 0 === t.length ? null : l.open(t[0])
                    }
                    static async open(t) {
                        await t.open(), null === t.configuration && await t.selectConfiguration(1), await c(t);
                        const e = t.configurations[0].interfaces.find((({
                            alternates: t
                        }) => t.some((t => 255 === t.interfaceClass))));
                        if (!e) throw new a.TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                        const r = e.interfaceNumber;
                        try {
                            await t.claimInterface(r)
                        } catch (e) {
                            throw await t.close(), new a.TransportInterfaceNotAvailable(e.message)
                        }
                        const i = new l(t, r),
                            n = e => {
                                t === e.device && (navigator.usb.removeEventListener("disconnect", n), i._emitDisconnect(new a.DisconnectedDevice))
                            };
                        return navigator.usb.addEventListener("disconnect", n), i
                    }
                    async close() {
                        await this.exchangeBusyPromise, await this.device.releaseInterface(this.interfaceNumber), await c(this.device), await this.device.close()
                    }
                    setScrambleKey() {}
                }
                async function c(t) {
                    try {
                        await t.reset()
                    } catch (t) {
                        console.warn(t)
                    }
                }
                l.isSupported = h.isSupported, l.list = h.getLedgerDevices, l.listen = t => {
                    let e = !1;
                    return (0, h.getFirstLedgerDevice)().then((r => {
                        if (!e) {
                            const e = (0, o.identifyUSBProductId)(r.productId);
                            t.next({
                                type: "add",
                                descriptor: r,
                                deviceModel: e
                            }), t.complete()
                        }
                    }), (e => {
                        window.DOMException && e instanceof window.DOMException && 18 === e.code ? t.error(new a.TransportWebUSBGestureRequired(e.message)) : t.error(new a.TransportOpenUserCancelled(e.message))
                    })), {
                        unsubscribe: function() {
                            e = !0
                        }
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    StatusCodes: () => o.StatusCodes,
                    TransportError: () => o.TransportError,
                    TransportStatusError: () => o.TransportStatusError,
                    default: () => a,
                    getAltStatusMessage: () => o.getAltStatusMessage
                });
                var i = r(50),
                    n = r.n(i),
                    o = r(51),
                    s = r(9).Buffer;
                class a {
                    constructor() {
                        this.exchangeTimeout = 3e4, this.unresponsiveTimeout = 15e3, this.deviceModel = null, this._events = new(n()), this.send = async (t, e, r, i, n = s.alloc(0), a = [o.StatusCodes.OK]) => {
                            if (n.length >= 256) throw new o.TransportError("data.length exceed 256 bytes limit. Got: " + n.length, "DataLengthTooBig");
                            const h = await this.exchange(s.concat([s.from([t, e, r, i]), s.from([n.length]), n])),
                                u = h.readUInt16BE(h.length - 2);
                            if (!a.some((t => t === u))) throw new o.TransportStatusError(u);
                            return h
                        }, this.exchangeBusyPromise = void 0, this.exchangeAtomicImpl = async t => {
                            if (this.exchangeBusyPromise) throw new o.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
                            let e;
                            const r = new Promise((t => {
                                e = t
                            }));
                            this.exchangeBusyPromise = r;
                            let i = !1;
                            const n = setTimeout((() => {
                                i = !0, this.emit("unresponsive")
                            }), this.unresponsiveTimeout);
                            try {
                                const r = await t();
                                return i && this.emit("responsive"), r
                            } finally {
                                clearTimeout(n), e && e(), this.exchangeBusyPromise = null
                            }
                        }, this._appAPIlock = null
                    }
                    exchange(t) {
                        throw new Error("exchange not implemented")
                    }
                    setScrambleKey(t) {}
                    close() {
                        return Promise.resolve()
                    }
                    on(t, e) {
                        this._events.on(t, e)
                    }
                    off(t, e) {
                        this._events.removeListener(t, e)
                    }
                    emit(t, ...e) {
                        this._events.emit(t, ...e)
                    }
                    setDebugMode() {
                        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.")
                    }
                    setExchangeTimeout(t) {
                        this.exchangeTimeout = t
                    }
                    setExchangeUnresponsiveTimeout(t) {
                        this.unresponsiveTimeout = t
                    }
                    static create(t = 3e3, e) {
                        return new Promise(((r, i) => {
                            let n = !1;
                            const s = this.listen({
                                    next: e => {
                                        n = !0, s && s.unsubscribe(), a && clearTimeout(a), this.open(e.descriptor, t).then(r, i)
                                    },
                                    error: t => {
                                        a && clearTimeout(a), i(t)
                                    },
                                    complete: () => {
                                        a && clearTimeout(a), n || i(new o.TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"))
                                    }
                                }),
                                a = e ? setTimeout((() => {
                                    s.unsubscribe(), i(new o.TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"))
                                }), e) : null
                        }))
                    }
                    decorateAppAPIMethods(t, e, r) {
                        for (let i of e) t[i] = this.decorateAppAPIMethod(i, t[i], t, r)
                    }
                    decorateAppAPIMethod(t, e, r, i) {
                        return async (...n) => {
                            const {
                                _appAPIlock: s
                            } = this;
                            if (s) return Promise.reject(new o.TransportError("Ledger Device is busy (lock " + s + ")", "TransportLocked"));
                            try {
                                return this._appAPIlock = t, this.setScrambleKey(i), await e.apply(r, n)
                            } finally {
                                this._appAPIlock = null
                            }
                        }
                    }
                }
                a.isSupported = void 0, a.list = void 0, a.listen = void 0, a.open = void 0, a.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)", a.ErrorMessage_NoDeviceFound = "No Ledger device found"
            }, t => {
                "use strict";
                var e, r = "object" == typeof Reflect ? Reflect : null,
                    i = r && "function" == typeof r.apply ? r.apply : function(t, e, r) {
                        return Function.prototype.apply.call(t, e, r)
                    };
                e = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(t) {
                    return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
                } : function(t) {
                    return Object.getOwnPropertyNames(t)
                };
                var n = Number.isNaN || function(t) {
                    return t != t
                };

                function o() {
                    o.init.call(this)
                }
                t.exports = o, t.exports.once = function(t, e) {
                    return new Promise((function(r, i) {
                        function n(r) {
                            t.removeListener(e, o), i(r)
                        }

                        function o() {
                            "function" == typeof t.removeListener && t.removeListener("error", n), r([].slice.call(arguments))
                        }
                        m(t, e, o, {
                            once: !0
                        }), "error" !== e && function(t, e, r) {
                            "function" == typeof t.on && m(t, "error", e, {
                                once: !0
                            })
                        }(t, n)
                    }))
                }, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
                var s = 10;

                function a(t) {
                    if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
                }

                function h(t) {
                    return void 0 === t._maxListeners ? o.defaultMaxListeners : t._maxListeners
                }

                function u(t, e, r, i) {
                    var n, o, s, u;
                    if (a(r), void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), s = o[e]), void 0 === s) s = o[e] = r, ++t._eventsCount;
                    else if ("function" == typeof s ? s = o[e] = i ? [r, s] : [s, r] : i ? s.unshift(r) : s.push(r), (n = h(t)) > 0 && s.length > n && !s.warned) {
                        s.warned = !0;
                        var l = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                        l.name = "MaxListenersExceededWarning", l.emitter = t, l.type = e, l.count = s.length, u = l, console && console.warn && console.warn(u)
                    }
                    return t
                }

                function l() {
                    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                }

                function c(t, e, r) {
                    var i = {
                            fired: !1,
                            wrapFn: void 0,
                            target: t,
                            type: e,
                            listener: r
                        },
                        n = l.bind(i);
                    return n.listener = r, i.wrapFn = n, n
                }

                function f(t, e, r) {
                    var i = t._events;
                    if (void 0 === i) return [];
                    var n = i[e];
                    return void 0 === n ? [] : "function" == typeof n ? r ? [n.listener || n] : [n] : r ? function(t) {
                        for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                        return e
                    }(n) : p(n, n.length)
                }

                function d(t) {
                    var e = this._events;
                    if (void 0 !== e) {
                        var r = e[t];
                        if ("function" == typeof r) return 1;
                        if (void 0 !== r) return r.length
                    }
                    return 0
                }

                function p(t, e) {
                    for (var r = new Array(e), i = 0; i < e; ++i) r[i] = t[i];
                    return r
                }

                function m(t, e, r, i) {
                    if ("function" == typeof t.on) i.once ? t.once(e, r) : t.on(e, r);
                    else {
                        if ("function" != typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
                        t.addEventListener(e, (function n(o) {
                            i.once && t.removeEventListener(e, n), r(o)
                        }))
                    }
                }
                Object.defineProperty(o, "defaultMaxListeners", {
                    enumerable: !0,
                    get: function() {
                        return s
                    },
                    set: function(t) {
                        if ("number" != typeof t || t < 0 || n(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                        s = t
                    }
                }), o.init = function() {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
                }, o.prototype.setMaxListeners = function(t) {
                    if ("number" != typeof t || t < 0 || n(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                    return this._maxListeners = t, this
                }, o.prototype.getMaxListeners = function() {
                    return h(this)
                }, o.prototype.emit = function(t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
                    var n = "error" === t,
                        o = this._events;
                    if (void 0 !== o) n = n && void 0 === o.error;
                    else if (!n) return !1;
                    if (n) {
                        var s;
                        if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
                        var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                        throw a.context = s, a
                    }
                    var h = o[t];
                    if (void 0 === h) return !1;
                    if ("function" == typeof h) i(h, this, e);
                    else {
                        var u = h.length,
                            l = p(h, u);
                        for (r = 0; r < u; ++r) i(l[r], this, e)
                    }
                    return !0
                }, o.prototype.addListener = function(t, e) {
                    return u(this, t, e, !1)
                }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(t, e) {
                    return u(this, t, e, !0)
                }, o.prototype.once = function(t, e) {
                    return a(e), this.on(t, c(this, t, e)), this
                }, o.prototype.prependOnceListener = function(t, e) {
                    return a(e), this.prependListener(t, c(this, t, e)), this
                }, o.prototype.removeListener = function(t, e) {
                    var r, i, n, o, s;
                    if (a(e), void 0 === (i = this._events)) return this;
                    if (void 0 === (r = i[t])) return this;
                    if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e));
                    else if ("function" != typeof r) {
                        for (n = -1, o = r.length - 1; o >= 0; o--)
                            if (r[o] === e || r[o].listener === e) {
                                s = r[o].listener, n = o;
                                break
                            }
                        if (n < 0) return this;
                        0 === n ? r.shift() : function(t, e) {
                            for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                            t.pop()
                        }(r, n), 1 === r.length && (i[t] = r[0]), void 0 !== i.removeListener && this.emit("removeListener", t, s || e)
                    }
                    return this
                }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(t) {
                    var e, r, i;
                    if (void 0 === (r = this._events)) return this;
                    if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
                    if (0 === arguments.length) {
                        var n, o = Object.keys(r);
                        for (i = 0; i < o.length; ++i) "removeListener" !== (n = o[i]) && this.removeAllListeners(n);
                        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                    }
                    if ("function" == typeof(e = r[t])) this.removeListener(t, e);
                    else if (void 0 !== e)
                        for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
                    return this
                }, o.prototype.listeners = function(t) {
                    return f(this, t, !0)
                }, o.prototype.rawListeners = function(t) {
                    return f(this, t, !1)
                }, o.listenerCount = function(t, e) {
                    return "function" == typeof t.listenerCount ? t.listenerCount(e) : d.call(t, e)
                }, o.prototype.listenerCount = d, o.prototype.eventNames = function() {
                    return this._eventsCount > 0 ? e(this._events) : []
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AccountNameRequiredError: () => l,
                    AccountNotSupported: () => c,
                    AmountRequired: () => f,
                    BluetoothRequired: () => d,
                    BtcUnmatchedApp: () => p,
                    CantOpenDevice: () => m,
                    CantScanQRCode: () => kt,
                    CashAddrNotSupported: () => g,
                    CurrencyNotSupported: () => v,
                    DBNotReset: () => Zt,
                    DBWrongPassword: () => Wt,
                    DeviceAppVerifyNotSupported: () => y,
                    DeviceGenuineSocketEarlyClose: () => w,
                    DeviceHalted: () => C,
                    DeviceInOSUExpected: () => A,
                    DeviceNameInvalid: () => B,
                    DeviceNotGenuineError: () => b,
                    DeviceOnDashboardExpected: () => M,
                    DeviceOnDashboardUnexpected: () => E,
                    DeviceShouldStayInApp: () => It,
                    DeviceSocketFail: () => F,
                    DeviceSocketNoBulkStatus: () => _,
                    DisconnectedDevice: () => S,
                    DisconnectedDeviceDuringOperation: () => D,
                    ETHAddressNonEIP: () => Ut,
                    EnpointConfigError: () => x,
                    EthAppPleaseEnableContractData: () => I,
                    FeeEstimationFailed: () => T,
                    FeeNotLoaded: () => Lt,
                    FeeRequired: () => Pt,
                    FeeTooHigh: () => jt,
                    FirmwareNotRecognized: () => R,
                    FirmwareOrAppUpdateRequired: () => zt,
                    GasLessThanEstimate: () => at,
                    GenuineCheckFailed: () => Kt,
                    HardResetFail: () => N,
                    InvalidAddress: () => U,
                    InvalidAddressBecauseDestinationIsAlsoSource: () => k,
                    InvalidXRPTag: () => O,
                    LatestMCUInstalledError: () => L,
                    LedgerAPI4xx: () => Ht,
                    LedgerAPI5xx: () => Gt,
                    LedgerAPIError: () => j,
                    LedgerAPIErrorWithMessage: () => $,
                    LedgerAPINotAvailable: () => q,
                    MCUNotGenuineToDashboard: () => pt,
                    ManagerAppAlreadyInstalledError: () => K,
                    ManagerAppDepInstallRequired: () => G,
                    ManagerAppDepUninstallRequired: () => z,
                    ManagerAppRelyOnBTCError: () => H,
                    ManagerDeviceLockedError: () => V,
                    ManagerFirmwareNotEnoughSpaceError: () => W,
                    ManagerNotEnoughSpaceError: () => Z,
                    ManagerUninstallBTCDep: () => Y,
                    NetworkDown: () => X,
                    NoAccessToCamera: () => nt,
                    NoAddressesFound: () => J,
                    NoDBPathGiven: () => Vt,
                    NotEnoughBalance: () => Q,
                    NotEnoughBalanceBecauseDestinationNotCreated: () => it,
                    NotEnoughBalanceInParentAccount: () => et,
                    NotEnoughBalanceToDelegate: () => tt,
                    NotEnoughGas: () => ot,
                    NotEnoughSpendableBalance: () => rt,
                    NotSupportedLegacyAddress: () => st,
                    PairingFailed: () => qt,
                    PasswordIncorrectError: () => ut,
                    PasswordsDontMatchError: () => ht,
                    RecipientRequired: () => mt,
                    RecommendSubAccountsToEmpty: () => lt,
                    RecommendUndelegation: () => ct,
                    StatusCodes: () => Xt,
                    SyncError: () => $t,
                    TimeoutTagged: () => ft,
                    TransportError: () => Yt,
                    TransportInterfaceNotAvailable: () => St,
                    TransportOpenUserCancelled: () => _t,
                    TransportRaceCondition: () => Dt,
                    TransportStatusError: () => Qt,
                    TransportWebUSBGestureRequired: () => xt,
                    UnavailableTezosOriginatedAccountReceive: () => gt,
                    UnavailableTezosOriginatedAccountSend: () => vt,
                    UnexpectedBootloader: () => dt,
                    UnknownMCU: () => P,
                    UpdateFetchFileFail: () => yt,
                    UpdateIncorrectHash: () => wt,
                    UpdateIncorrectSig: () => bt,
                    UpdateYourApp: () => Mt,
                    UserRefusedAddress: () => At,
                    UserRefusedAllowManager: () => Bt,
                    UserRefusedDeviceNameChange: () => Et,
                    UserRefusedFirmwareUpdate: () => Ct,
                    UserRefusedOnDevice: () => Ft,
                    WebsocketConnectionError: () => Tt,
                    WebsocketConnectionFailed: () => Rt,
                    WrongAppForCurrency: () => Ot,
                    WrongDeviceForAccount: () => Nt,
                    addCustomErrorDeserializer: () => o,
                    createCustomErrorClass: () => s,
                    deserializeError: () => a,
                    getAltStatusMessage: () => Jt,
                    serializeError: () => h
                });
                var i = {},
                    n = {},
                    o = function(t, e) {
                        n[t] = e
                    },
                    s = function(t) {
                        var e = function(e, r) {
                            Object.assign(this, r), this.name = t, this.message = e || t, this.stack = (new Error).stack
                        };
                        return e.prototype = new Error, i[t] = e, e
                    },
                    a = function(t) {
                        if ("object" == typeof t && t) {
                            try {
                                var e = JSON.parse(t.message);
                                e.message && e.name && (t = e)
                            } catch (t) {}
                            var r = void 0;
                            if ("string" == typeof t.name) {
                                var o = t.name,
                                    h = n[o];
                                if (h) r = h(t);
                                else {
                                    var u = "Error" === o ? Error : i[o];
                                    u || (console.warn("deserializing an unknown class '" + o + "'"), u = s(o)), r = Object.create(u.prototype);
                                    try {
                                        for (var l in t) t.hasOwnProperty(l) && (r[l] = t[l])
                                    } catch (t) {}
                                }
                            } else r = new Error(t.message);
                            return !r.stack && Error.captureStackTrace && Error.captureStackTrace(r, a), r
                        }
                        return new Error(String(t))
                    },
                    h = function(t) {
                        return t ? "object" == typeof t ? u(t, []) : "function" == typeof t ? "[Function: " + (t.name || "anonymous") + "]" : t : t
                    };

                function u(t, e) {
                    var r = {};
                    e.push(t);
                    for (var i = 0, n = Object.keys(t); i < n.length; i++) {
                        var o = n[i],
                            s = t[o];
                        "function" != typeof s && (s && "object" == typeof s ? -1 !== e.indexOf(t[o]) ? r[o] = "[Circular]" : r[o] = u(t[o], e.slice(0)) : r[o] = s)
                    }
                    return "string" == typeof t.name && (r.name = t.name), "string" == typeof t.message && (r.message = t.message), "string" == typeof t.stack && (r.stack = t.stack), r
                }
                var l = s("AccountNameRequired"),
                    c = s("AccountNotSupported"),
                    f = s("AmountRequired"),
                    d = s("BluetoothRequired"),
                    p = s("BtcUnmatchedApp"),
                    m = s("CantOpenDevice"),
                    g = s("CashAddrNotSupported"),
                    v = s("CurrencyNotSupported"),
                    y = s("DeviceAppVerifyNotSupported"),
                    w = s("DeviceGenuineSocketEarlyClose"),
                    b = s("DeviceNotGenuine"),
                    M = s("DeviceOnDashboardExpected"),
                    E = s("DeviceOnDashboardUnexpected"),
                    A = s("DeviceInOSUExpected"),
                    C = s("DeviceHalted"),
                    B = s("DeviceNameInvalid"),
                    F = s("DeviceSocketFail"),
                    _ = s("DeviceSocketNoBulkStatus"),
                    S = s("DisconnectedDevice"),
                    D = s("DisconnectedDeviceDuringOperation"),
                    x = s("EnpointConfig"),
                    I = s("EthAppPleaseEnableContractData"),
                    T = s("FeeEstimationFailed"),
                    R = s("FirmwareNotRecognized"),
                    N = s("HardResetFail"),
                    O = s("InvalidXRPTag"),
                    U = s("InvalidAddress"),
                    k = s("InvalidAddressBecauseDestinationIsAlsoSource"),
                    L = s("LatestMCUInstalledError"),
                    P = s("UnknownMCU"),
                    j = s("LedgerAPIError"),
                    $ = s("LedgerAPIErrorWithMessage"),
                    q = s("LedgerAPINotAvailable"),
                    K = s("ManagerAppAlreadyInstalled"),
                    H = s("ManagerAppRelyOnBTC"),
                    G = s("ManagerAppDepInstallRequired"),
                    z = s("ManagerAppDepUninstallRequired"),
                    V = s("ManagerDeviceLocked"),
                    W = s("ManagerFirmwareNotEnoughSpace"),
                    Z = s("ManagerNotEnoughSpace"),
                    Y = s("ManagerUninstallBTCDep"),
                    X = s("NetworkDown"),
                    J = s("NoAddressesFound"),
                    Q = s("NotEnoughBalance"),
                    tt = s("NotEnoughBalanceToDelegate"),
                    et = s("NotEnoughBalanceInParentAccount"),
                    rt = s("NotEnoughSpendableBalance"),
                    it = s("NotEnoughBalanceBecauseDestinationNotCreated"),
                    nt = s("NoAccessToCamera"),
                    ot = s("NotEnoughGas"),
                    st = s("NotSupportedLegacyAddress"),
                    at = s("GasLessThanEstimate"),
                    ht = s("PasswordsDontMatch"),
                    ut = s("PasswordIncorrect"),
                    lt = s("RecommendSubAccountsToEmpty"),
                    ct = s("RecommendUndelegation"),
                    ft = s("TimeoutTagged"),
                    dt = s("UnexpectedBootloader"),
                    pt = s("MCUNotGenuineToDashboard"),
                    mt = s("RecipientRequired"),
                    gt = s("UnavailableTezosOriginatedAccountReceive"),
                    vt = s("UnavailableTezosOriginatedAccountSend"),
                    yt = s("UpdateFetchFileFail"),
                    wt = s("UpdateIncorrectHash"),
                    bt = s("UpdateIncorrectSig"),
                    Mt = s("UpdateYourApp"),
                    Et = s("UserRefusedDeviceNameChange"),
                    At = s("UserRefusedAddress"),
                    Ct = s("UserRefusedFirmwareUpdate"),
                    Bt = s("UserRefusedAllowManager"),
                    Ft = s("UserRefusedOnDevice"),
                    _t = s("TransportOpenUserCancelled"),
                    St = s("TransportInterfaceNotAvailable"),
                    Dt = s("TransportRaceCondition"),
                    xt = s("TransportWebUSBGestureRequired"),
                    It = s("DeviceShouldStayInApp"),
                    Tt = s("WebsocketConnectionError"),
                    Rt = s("WebsocketConnectionFailed"),
                    Nt = s("WrongDeviceForAccount"),
                    Ot = s("WrongAppForCurrency"),
                    Ut = s("ETHAddressNonEIP"),
                    kt = s("CantScanQRCode"),
                    Lt = s("FeeNotLoaded"),
                    Pt = s("FeeRequired"),
                    jt = s("FeeTooHigh"),
                    $t = s("SyncError"),
                    qt = s("PairingFailed"),
                    Kt = s("GenuineCheckFailed"),
                    Ht = s("LedgerAPI4xx"),
                    Gt = s("LedgerAPI5xx"),
                    zt = s("FirmwareOrAppUpdateRequired"),
                    Vt = s("NoDBPathGiven"),
                    Wt = s("DBWrongPassword"),
                    Zt = s("DBNotReset");

                function Yt(t, e) {
                    this.name = "TransportError", this.message = t, this.stack = (new Error).stack, this.id = e
                }
                Yt.prototype = new Error, o("TransportError", (function(t) {
                    return new Yt(t.message, t.id)
                }));
                var Xt = {
                    PIN_REMAINING_ATTEMPTS: 25536,
                    INCORRECT_LENGTH: 26368,
                    MISSING_CRITICAL_PARAMETER: 26624,
                    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 27009,
                    SECURITY_STATUS_NOT_SATISFIED: 27010,
                    CONDITIONS_OF_USE_NOT_SATISFIED: 27013,
                    INCORRECT_DATA: 27264,
                    NOT_ENOUGH_MEMORY_SPACE: 27268,
                    REFERENCED_DATA_NOT_FOUND: 27272,
                    FILE_ALREADY_EXISTS: 27273,
                    INCORRECT_P1_P2: 27392,
                    INS_NOT_SUPPORTED: 27904,
                    CLA_NOT_SUPPORTED: 28160,
                    TECHNICAL_PROBLEM: 28416,
                    OK: 36864,
                    MEMORY_PROBLEM: 37440,
                    NO_EF_SELECTED: 37888,
                    INVALID_OFFSET: 37890,
                    FILE_NOT_FOUND: 37892,
                    INCONSISTENT_FILE: 37896,
                    ALGORITHM_NOT_SUPPORTED: 38020,
                    INVALID_KCV: 38021,
                    CODE_NOT_INITIALIZED: 38914,
                    ACCESS_CONDITION_NOT_FULFILLED: 38916,
                    CONTRADICTION_SECRET_CODE_STATUS: 38920,
                    CONTRADICTION_INVALIDATION: 38928,
                    CODE_BLOCKED: 38976,
                    MAX_VALUE_REACHED: 38992,
                    GP_AUTH_FAILED: 25344,
                    LICENSING: 28482,
                    HALTED: 28586
                };

                function Jt(t) {
                    switch (t) {
                        case 26368:
                            return "Incorrect length";
                        case 26624:
                            return "Missing critical parameter";
                        case 27010:
                            return "Security not satisfied (dongle locked or have invalid access rights)";
                        case 27013:
                            return "Condition of use not satisfied (denied by the user?)";
                        case 27264:
                            return "Invalid data received";
                        case 27392:
                            return "Invalid parameter received"
                    }
                    if (28416 <= t && t <= 28671) return "Internal error, please report"
                }

                function Qt(t) {
                    this.name = "TransportStatusError";
                    var e = Object.keys(Xt).find((function(e) {
                            return Xt[e] === t
                        })) || "UNKNOWN_ERROR",
                        r = Jt(t) || e,
                        i = t.toString(16);
                    this.message = "Ledger device: " + r + " (0x" + i + ")", this.stack = (new Error).stack, this.statusCode = t, this.statusText = e
                }
                Qt.prototype = new Error, o("TransportStatusError", (function(t) {
                    return new Qt(t.statusCode)
                }))
            }, (t, e, r) => {
                "use strict";
                var i = r(9).Buffer;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var n = r(51);

                function o(t) {
                    const e = i.alloc(2);
                    return e.writeUInt16BE(t, 0), e
                }
                const s = {
                    data: i.alloc(0),
                    dataLength: 0,
                    sequence: 0
                };
                e.default = (t, e) => ({
                    makeBlocks(r) {
                        let n = i.concat([o(r.length), r]);
                        const s = e - 5,
                            a = Math.ceil(n.length / s);
                        n = i.concat([n, i.alloc(a * s - n.length + 1).fill(0)]);
                        const h = [];
                        for (let e = 0; e < a; e++) {
                            const r = i.alloc(5);
                            r.writeUInt16BE(t, 0), r.writeUInt8(5, 2), r.writeUInt16BE(e, 3);
                            const o = n.slice(e * s, (e + 1) * s);
                            h.push(i.concat([r, o]))
                        }
                        return h
                    },
                    reduceResponse(e, r) {
                        let {
                            data: o,
                            dataLength: a,
                            sequence: h
                        } = e || s;
                        if (r.readUInt16BE(0) !== t) throw new n.TransportError("Invalid channel", "InvalidChannel");
                        if (5 !== r.readUInt8(2)) throw new n.TransportError("Invalid tag", "InvalidTag");
                        if (r.readUInt16BE(3) !== h) throw new n.TransportError("Invalid sequence", "InvalidSequence");
                        e || (a = r.readUInt16BE(5)), h++;
                        const u = r.slice(e ? 5 : 7);
                        return o = i.concat([o, u]), o.length > a && (o = o.slice(0, a)), {
                            data: o,
                            dataLength: a,
                            sequence: h
                        }
                    },
                    getReducedResult(t) {
                        if (t && t.dataLength === t.data.length) return t.data
                    }
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    IICCID: () => h,
                    IIGenericHID: () => o,
                    IIKeyboardHID: () => s,
                    IIU2F: () => a,
                    IIWebUSB: () => u,
                    getBluetoothServiceUuids: () => w,
                    getDeviceModel: () => p,
                    getInfosForServiceUuid: () => b,
                    identifyProductName: () => g,
                    identifyUSBProductId: () => m,
                    ledgerUSBVendorId: () => d
                });
                var i = r(54),
                    n = r.n(i);
                const o = 1,
                    s = 2,
                    a = 4,
                    h = 8,
                    u = 16,
                    l = {
                        blue: {
                            id: "blue",
                            productName: "Ledger Blue",
                            productIdMM: 0,
                            legacyUsbProductId: 0,
                            usbOnly: !0,
                            memorySize: 491520,
                            blockSize: 4096,
                            getBlockSize: t => 4096
                        },
                        nanoS: {
                            id: "nanoS",
                            productName: "Ledger Nano S",
                            productIdMM: 16,
                            legacyUsbProductId: 1,
                            usbOnly: !0,
                            memorySize: 327680,
                            blockSize: 4096,
                            getBlockSize: t => n().lt(n().coerce(t), "2.0.0") ? 4096 : 2048
                        },
                        nanoX: {
                            id: "nanoX",
                            productName: "Ledger Nano X",
                            productIdMM: 64,
                            legacyUsbProductId: 4,
                            usbOnly: !1,
                            memorySize: 2097152,
                            blockSize: 4096,
                            getBlockSize: t => 4096,
                            bluetoothSpec: [{
                                serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
                                notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
                                writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
                            }, {
                                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                                writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
                            }]
                        }
                    },
                    c = {
                        Blue: "blue",
                        "Nano S": "nanoS",
                        "Nano X": "nanoX"
                    },
                    f = Object.values(l),
                    d = 11415,
                    p = t => {
                        const e = l[t];
                        if (!e) throw new Error("device '" + t + "' does not exist");
                        return e
                    },
                    m = t => {
                        const e = f.find((e => e.legacyUsbProductId === t));
                        if (e) return e;
                        const r = t >> 8;
                        return f.find((t => t.productIdMM === r))
                    },
                    g = t => {
                        const e = c[t];
                        return f.find((t => t.id === e))
                    },
                    v = [],
                    y = {};
                for (let t in l) {
                    const e = l[t],
                        {
                            bluetoothSpec: r
                        } = e;
                    if (r)
                        for (let t = 0; t < r.length; t++) {
                            const i = r[t];
                            v.push(i.serviceUuid), y[i.serviceUuid] = y[i.serviceUuid.replace(/-/g, "")] = {
                                deviceModel: e,
                                ...i
                            }
                        }
                }
                const w = () => v,
                    b = t => y[t.toLowerCase()]
            }, (t, e, r) => {
                const i = r(55);
                t.exports = {
                    re: i.re,
                    src: i.src,
                    tokens: i.t,
                    SEMVER_SPEC_VERSION: r(56).SEMVER_SPEC_VERSION,
                    SemVer: r(58),
                    compareIdentifiers: r(60).compareIdentifiers,
                    rcompareIdentifiers: r(60).rcompareIdentifiers,
                    parse: r(61),
                    valid: r(62),
                    clean: r(63),
                    inc: r(64),
                    diff: r(65),
                    major: r(68),
                    minor: r(69),
                    patch: r(70),
                    prerelease: r(71),
                    compare: r(67),
                    rcompare: r(72),
                    compareLoose: r(73),
                    compareBuild: r(74),
                    sort: r(75),
                    rsort: r(76),
                    gt: r(77),
                    lt: r(78),
                    eq: r(66),
                    neq: r(79),
                    gte: r(80),
                    lte: r(81),
                    cmp: r(82),
                    coerce: r(83),
                    Comparator: r(84),
                    Range: r(85),
                    satisfies: r(89),
                    toComparators: r(90),
                    maxSatisfying: r(91),
                    minSatisfying: r(92),
                    minVersion: r(93),
                    validRange: r(94),
                    outside: r(95),
                    gtr: r(96),
                    ltr: r(97),
                    intersects: r(98),
                    simplifyRange: r(99),
                    subset: r(100)
                }
            }, (t, e, r) => {
                const {
                    MAX_SAFE_COMPONENT_LENGTH: i
                } = r(56), n = r(57), o = (e = t.exports = {}).re = [], s = e.src = [], a = e.t = {};
                let h = 0;
                const u = (t, e, r) => {
                    const i = h++;
                    n(i, e), a[t] = i, s[i] = e, o[i] = new RegExp(e, r ? "g" : void 0)
                };
                u("NUMERICIDENTIFIER", "0|[1-9]\\d*"), u("NUMERICIDENTIFIERLOOSE", "[0-9]+"), u("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), u("MAINVERSION", `(${s[a.NUMERICIDENTIFIER]})\\.(${s[a.NUMERICIDENTIFIER]})\\.(${s[a.NUMERICIDENTIFIER]})`), u("MAINVERSIONLOOSE", `(${s[a.NUMERICIDENTIFIERLOOSE]})\\.(${s[a.NUMERICIDENTIFIERLOOSE]})\\.(${s[a.NUMERICIDENTIFIERLOOSE]})`), u("PRERELEASEIDENTIFIER", `(?:${s[a.NUMERICIDENTIFIER]}|${s[a.NONNUMERICIDENTIFIER]})`), u("PRERELEASEIDENTIFIERLOOSE", `(?:${s[a.NUMERICIDENTIFIERLOOSE]}|${s[a.NONNUMERICIDENTIFIER]})`), u("PRERELEASE", `(?:-(${s[a.PRERELEASEIDENTIFIER]}(?:\\.${s[a.PRERELEASEIDENTIFIER]})*))`), u("PRERELEASELOOSE", `(?:-?(${s[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${s[a.PRERELEASEIDENTIFIERLOOSE]})*))`), u("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), u("BUILD", `(?:\\+(${s[a.BUILDIDENTIFIER]}(?:\\.${s[a.BUILDIDENTIFIER]})*))`), u("FULLPLAIN", `v?${s[a.MAINVERSION]}${s[a.PRERELEASE]}?${s[a.BUILD]}?`), u("FULL", `^${s[a.FULLPLAIN]}$`), u("LOOSEPLAIN", `[v=\\s]*${s[a.MAINVERSIONLOOSE]}${s[a.PRERELEASELOOSE]}?${s[a.BUILD]}?`), u("LOOSE", `^${s[a.LOOSEPLAIN]}$`), u("GTLT", "((?:<|>)?=?)"), u("XRANGEIDENTIFIERLOOSE", `${s[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), u("XRANGEIDENTIFIER", `${s[a.NUMERICIDENTIFIER]}|x|X|\\*`), u("XRANGEPLAIN", `[v=\\s]*(${s[a.XRANGEIDENTIFIER]})(?:\\.(${s[a.XRANGEIDENTIFIER]})(?:\\.(${s[a.XRANGEIDENTIFIER]})(?:${s[a.PRERELEASE]})?${s[a.BUILD]}?)?)?`), u("XRANGEPLAINLOOSE", `[v=\\s]*(${s[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[a.XRANGEIDENTIFIERLOOSE]})(?:${s[a.PRERELEASELOOSE]})?${s[a.BUILD]}?)?)?`), u("XRANGE", `^${s[a.GTLT]}\\s*${s[a.XRANGEPLAIN]}$`), u("XRANGELOOSE", `^${s[a.GTLT]}\\s*${s[a.XRANGEPLAINLOOSE]}$`), u("COERCE", `(^|[^\\d])(\\d{1,${i}})(?:\\.(\\d{1,${i}}))?(?:\\.(\\d{1,${i}}))?(?:$|[^\\d])`), u("COERCERTL", s[a.COERCE], !0), u("LONETILDE", "(?:~>?)"), u("TILDETRIM", `(\\s*)${s[a.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", u("TILDE", `^${s[a.LONETILDE]}${s[a.XRANGEPLAIN]}$`), u("TILDELOOSE", `^${s[a.LONETILDE]}${s[a.XRANGEPLAINLOOSE]}$`), u("LONECARET", "(?:\\^)"), u("CARETTRIM", `(\\s*)${s[a.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", u("CARET", `^${s[a.LONECARET]}${s[a.XRANGEPLAIN]}$`), u("CARETLOOSE", `^${s[a.LONECARET]}${s[a.XRANGEPLAINLOOSE]}$`), u("COMPARATORLOOSE", `^${s[a.GTLT]}\\s*(${s[a.LOOSEPLAIN]})$|^$`), u("COMPARATOR", `^${s[a.GTLT]}\\s*(${s[a.FULLPLAIN]})$|^$`), u("COMPARATORTRIM", `(\\s*)${s[a.GTLT]}\\s*(${s[a.LOOSEPLAIN]}|${s[a.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", u("HYPHENRANGE", `^\\s*(${s[a.XRANGEPLAIN]})\\s+-\\s+(${s[a.XRANGEPLAIN]})\\s*$`), u("HYPHENRANGELOOSE", `^\\s*(${s[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${s[a.XRANGEPLAINLOOSE]})\\s*$`), u("STAR", "(<|>)?=?\\s*\\*"), u("GTE0", "^\\s*>=\\s*0.0.0\\s*$"), u("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$")
            }, t => {
                const e = Number.MAX_SAFE_INTEGER || 9007199254740991;
                t.exports = {
                    SEMVER_SPEC_VERSION: "2.0.0",
                    MAX_LENGTH: 256,
                    MAX_SAFE_INTEGER: e,
                    MAX_SAFE_COMPONENT_LENGTH: 16
                }
            }, t => {
                const e = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {};
                t.exports = e
            }, (t, e, r) => {
                const i = r(57),
                    {
                        MAX_LENGTH: n,
                        MAX_SAFE_INTEGER: o
                    } = r(56),
                    {
                        re: s,
                        t: a
                    } = r(55),
                    h = r(59),
                    {
                        compareIdentifiers: u
                    } = r(60);
                class l {
                    constructor(t, e) {
                        if (e = h(e), t instanceof l) {
                            if (t.loose === !!e.loose && t.includePrerelease === !!e.includePrerelease) return t;
                            t = t.version
                        } else if ("string" != typeof t) throw new TypeError(`Invalid Version: ${t}`);
                        if (t.length > n) throw new TypeError(`version is longer than ${n} characters`);
                        i("SemVer", t, e), this.options = e, this.loose = !!e.loose, this.includePrerelease = !!e.includePrerelease;
                        const r = t.trim().match(e.loose ? s[a.LOOSE] : s[a.FULL]);
                        if (!r) throw new TypeError(`Invalid Version: ${t}`);
                        if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > o || this.major < 0) throw new TypeError("Invalid major version");
                        if (this.minor > o || this.minor < 0) throw new TypeError("Invalid minor version");
                        if (this.patch > o || this.patch < 0) throw new TypeError("Invalid patch version");
                        r[4] ? this.prerelease = r[4].split(".").map((t => {
                            if (/^[0-9]+$/.test(t)) {
                                const e = +t;
                                if (e >= 0 && e < o) return e
                            }
                            return t
                        })) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format()
                    }
                    format() {
                        return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version
                    }
                    toString() {
                        return this.version
                    }
                    compare(t) {
                        if (i("SemVer.compare", this.version, this.options, t), !(t instanceof l)) {
                            if ("string" == typeof t && t === this.version) return 0;
                            t = new l(t, this.options)
                        }
                        return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t)
                    }
                    compareMain(t) {
                        return t instanceof l || (t = new l(t, this.options)), u(this.major, t.major) || u(this.minor, t.minor) || u(this.patch, t.patch)
                    }
                    comparePre(t) {
                        if (t instanceof l || (t = new l(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
                        if (!this.prerelease.length && t.prerelease.length) return 1;
                        if (!this.prerelease.length && !t.prerelease.length) return 0;
                        let e = 0;
                        do {
                            const r = this.prerelease[e],
                                n = t.prerelease[e];
                            if (i("prerelease compare", e, r, n), void 0 === r && void 0 === n) return 0;
                            if (void 0 === n) return 1;
                            if (void 0 === r) return -1;
                            if (r !== n) return u(r, n)
                        } while (++e)
                    }
                    compareBuild(t) {
                        t instanceof l || (t = new l(t, this.options));
                        let e = 0;
                        do {
                            const r = this.build[e],
                                n = t.build[e];
                            if (i("prerelease compare", e, r, n), void 0 === r && void 0 === n) return 0;
                            if (void 0 === n) return 1;
                            if (void 0 === r) return -1;
                            if (r !== n) return u(r, n)
                        } while (++e)
                    }
                    inc(t, e) {
                        switch (t) {
                            case "premajor":
                                this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", e);
                                break;
                            case "preminor":
                                this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", e);
                                break;
                            case "prepatch":
                                this.prerelease.length = 0, this.inc("patch", e), this.inc("pre", e);
                                break;
                            case "prerelease":
                                0 === this.prerelease.length && this.inc("patch", e), this.inc("pre", e);
                                break;
                            case "major":
                                0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
                                break;
                            case "minor":
                                0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
                                break;
                            case "patch":
                                0 === this.prerelease.length && this.patch++, this.prerelease = [];
                                break;
                            case "pre":
                                if (0 === this.prerelease.length) this.prerelease = [0];
                                else {
                                    let t = this.prerelease.length;
                                    for (; --t >= 0;) "number" == typeof this.prerelease[t] && (this.prerelease[t]++, t = -2); - 1 === t && this.prerelease.push(0)
                                }
                                e && (this.prerelease[0] === e ? isNaN(this.prerelease[1]) && (this.prerelease = [e, 0]) : this.prerelease = [e, 0]);
                                break;
                            default:
                                throw new Error(`invalid increment argument: ${t}`)
                        }
                        return this.format(), this.raw = this.version, this
                    }
                }
                t.exports = l
            }, t => {
                const e = ["includePrerelease", "loose", "rtl"];
                t.exports = t => t ? "object" != typeof t ? {
                    loose: !0
                } : e.filter((e => t[e])).reduce(((t, e) => (t[e] = !0, t)), {}) : {}
            }, t => {
                const e = /^[0-9]+$/,
                    r = (t, r) => {
                        const i = e.test(t),
                            n = e.test(r);
                        return i && n && (t = +t, r = +r), t === r ? 0 : i && !n ? -1 : n && !i ? 1 : t < r ? -1 : 1
                    };
                t.exports = {
                    compareIdentifiers: r,
                    rcompareIdentifiers: (t, e) => r(e, t)
                }
            }, (t, e, r) => {
                const {
                    MAX_LENGTH: i
                } = r(56), {
                    re: n,
                    t: o
                } = r(55), s = r(58), a = r(59);
                t.exports = (t, e) => {
                    if (e = a(e), t instanceof s) return t;
                    if ("string" != typeof t) return null;
                    if (t.length > i) return null;
                    if (!(e.loose ? n[o.LOOSE] : n[o.FULL]).test(t)) return null;
                    try {
                        return new s(t, e)
                    } catch (t) {
                        return null
                    }
                }
            }, (t, e, r) => {
                const i = r(61);
                t.exports = (t, e) => {
                    const r = i(t, e);
                    return r ? r.version : null
                }
            }, (t, e, r) => {
                const i = r(61);
                t.exports = (t, e) => {
                    const r = i(t.trim().replace(/^[=v]+/, ""), e);
                    return r ? r.version : null
                }
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e, r, n) => {
                    "string" == typeof r && (n = r, r = void 0);
                    try {
                        return new i(t, r).inc(e, n).version
                    } catch (t) {
                        return null
                    }
                }
            }, (t, e, r) => {
                const i = r(61),
                    n = r(66);
                t.exports = (t, e) => {
                    if (n(t, e)) return null; {
                        const r = i(t),
                            n = i(e),
                            o = r.prerelease.length || n.prerelease.length,
                            s = o ? "pre" : "",
                            a = o ? "prerelease" : "";
                        for (const t in r)
                            if (("major" === t || "minor" === t || "patch" === t) && r[t] !== n[t]) return s + t;
                        return a
                    }
                }
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => 0 === i(t, e, r)
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e, r) => new i(t, r).compare(new i(e, r))
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e) => new i(t, e).major
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e) => new i(t, e).minor
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e) => new i(t, e).patch
            }, (t, e, r) => {
                const i = r(61);
                t.exports = (t, e) => {
                    const r = i(t, e);
                    return r && r.prerelease.length ? r.prerelease : null
                }
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => i(e, t, r)
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e) => i(t, e, !0)
            }, (t, e, r) => {
                const i = r(58);
                t.exports = (t, e, r) => {
                    const n = new i(t, r),
                        o = new i(e, r);
                    return n.compare(o) || n.compareBuild(o)
                }
            }, (t, e, r) => {
                const i = r(74);
                t.exports = (t, e) => t.sort(((t, r) => i(t, r, e)))
            }, (t, e, r) => {
                const i = r(74);
                t.exports = (t, e) => t.sort(((t, r) => i(r, t, e)))
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => i(t, e, r) > 0
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => i(t, e, r) < 0
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => 0 !== i(t, e, r)
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => i(t, e, r) >= 0
            }, (t, e, r) => {
                const i = r(67);
                t.exports = (t, e, r) => i(t, e, r) <= 0
            }, (t, e, r) => {
                const i = r(66),
                    n = r(79),
                    o = r(77),
                    s = r(80),
                    a = r(78),
                    h = r(81);
                t.exports = (t, e, r, u) => {
                    switch (e) {
                        case "===":
                            return "object" == typeof t && (t = t.version), "object" == typeof r && (r = r.version), t === r;
                        case "!==":
                            return "object" == typeof t && (t = t.version), "object" == typeof r && (r = r.version), t !== r;
                        case "":
                        case "=":
                        case "==":
                            return i(t, r, u);
                        case "!=":
                            return n(t, r, u);
                        case ">":
                            return o(t, r, u);
                        case ">=":
                            return s(t, r, u);
                        case "<":
                            return a(t, r, u);
                        case "<=":
                            return h(t, r, u);
                        default:
                            throw new TypeError(`Invalid operator: ${e}`)
                    }
                }
            }, (t, e, r) => {
                const i = r(58),
                    n = r(61),
                    {
                        re: o,
                        t: s
                    } = r(55);
                t.exports = (t, e) => {
                    if (t instanceof i) return t;
                    if ("number" == typeof t && (t = String(t)), "string" != typeof t) return null;
                    let r = null;
                    if ((e = e || {}).rtl) {
                        let e;
                        for (;
                            (e = o[s.COERCERTL].exec(t)) && (!r || r.index + r[0].length !== t.length);) r && e.index + e[0].length === r.index + r[0].length || (r = e), o[s.COERCERTL].lastIndex = e.index + e[1].length + e[2].length;
                        o[s.COERCERTL].lastIndex = -1
                    } else r = t.match(o[s.COERCE]);
                    return null === r ? null : n(`${r[2]}.${r[3]||"0"}.${r[4]||"0"}`, e)
                }
            }, (t, e, r) => {
                const i = Symbol("SemVer ANY");
                class n {
                    static get ANY() {
                        return i
                    }
                    constructor(t, e) {
                        if (e = o(e), t instanceof n) {
                            if (t.loose === !!e.loose) return t;
                            t = t.value
                        }
                        u("comparator", t, e), this.options = e, this.loose = !!e.loose, this.parse(t), this.semver === i ? this.value = "" : this.value = this.operator + this.semver.version, u("comp", this)
                    }
                    parse(t) {
                        const e = this.options.loose ? s[a.COMPARATORLOOSE] : s[a.COMPARATOR],
                            r = t.match(e);
                        if (!r) throw new TypeError(`Invalid comparator: ${t}`);
                        this.operator = void 0 !== r[1] ? r[1] : "", "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new l(r[2], this.options.loose) : this.semver = i
                    }
                    toString() {
                        return this.value
                    }
                    test(t) {
                        if (u("Comparator.test", t, this.options.loose), this.semver === i || t === i) return !0;
                        if ("string" == typeof t) try {
                            t = new l(t, this.options)
                        } catch (t) {
                            return !1
                        }
                        return h(t, this.operator, this.semver, this.options)
                    }
                    intersects(t, e) {
                        if (!(t instanceof n)) throw new TypeError("a Comparator is required");
                        if (e && "object" == typeof e || (e = {
                                loose: !!e,
                                includePrerelease: !1
                            }), "" === this.operator) return "" === this.value || new c(t.value, e).test(this.value);
                        if ("" === t.operator) return "" === t.value || new c(this.value, e).test(t.semver);
                        const r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== t.operator && ">" !== t.operator),
                            i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== t.operator && "<" !== t.operator),
                            o = this.semver.version === t.semver.version,
                            s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== t.operator && "<=" !== t.operator),
                            a = h(this.semver, "<", t.semver, e) && (">=" === this.operator || ">" === this.operator) && ("<=" === t.operator || "<" === t.operator),
                            u = h(this.semver, ">", t.semver, e) && ("<=" === this.operator || "<" === this.operator) && (">=" === t.operator || ">" === t.operator);
                        return r || i || o && s || a || u
                    }
                }
                t.exports = n;
                const o = r(59),
                    {
                        re: s,
                        t: a
                    } = r(55),
                    h = r(82),
                    u = r(57),
                    l = r(58),
                    c = r(85)
            }, (t, e, r) => {
                class i {
                    constructor(t, e) {
                        if (e = o(e), t instanceof i) return t.loose === !!e.loose && t.includePrerelease === !!e.includePrerelease ? t : new i(t.raw, e);
                        if (t instanceof s) return this.raw = t.value, this.set = [
                            [t]
                        ], this.format(), this;
                        if (this.options = e, this.loose = !!e.loose, this.includePrerelease = !!e.includePrerelease, this.raw = t, this.set = t.split(/\s*\|\|\s*/).map((t => this.parseRange(t.trim()))).filter((t => t.length)), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${t}`);
                        if (this.set.length > 1) {
                            const t = this.set[0];
                            if (this.set = this.set.filter((t => !p(t[0]))), 0 === this.set.length) this.set = [t];
                            else if (this.set.length > 1)
                                for (const t of this.set)
                                    if (1 === t.length && m(t[0])) {
                                        this.set = [t];
                                        break
                                    }
                        }
                        this.format()
                    }
                    format() {
                        return this.range = this.set.map((t => t.join(" ").trim())).join("||").trim(), this.range
                    }
                    toString() {
                        return this.range
                    }
                    parseRange(t) {
                        t = t.trim();
                        const e = `parseRange:${Object.keys(this.options).join(",")}:${t}`,
                            r = n.get(e);
                        if (r) return r;
                        const i = this.options.loose,
                            o = i ? u[l.HYPHENRANGELOOSE] : u[l.HYPHENRANGE];
                        t = t.replace(o, _(this.options.includePrerelease)), a("hyphen replace", t), t = t.replace(u[l.COMPARATORTRIM], c), a("comparator trim", t, u[l.COMPARATORTRIM]), t = (t = (t = t.replace(u[l.TILDETRIM], f)).replace(u[l.CARETTRIM], d)).split(/\s+/).join(" ");
                        const h = i ? u[l.COMPARATORLOOSE] : u[l.COMPARATOR],
                            m = t.split(" ").map((t => v(t, this.options))).join(" ").split(/\s+/).map((t => F(t, this.options))).filter(this.options.loose ? t => !!t.match(h) : () => !0).map((t => new s(t, this.options))),
                            g = (m.length, new Map);
                        for (const t of m) {
                            if (p(t)) return [t];
                            g.set(t.value, t)
                        }
                        g.size > 1 && g.has("") && g.delete("");
                        const y = [...g.values()];
                        return n.set(e, y), y
                    }
                    intersects(t, e) {
                        if (!(t instanceof i)) throw new TypeError("a Range is required");
                        return this.set.some((r => g(r, e) && t.set.some((t => g(t, e) && r.every((r => t.every((t => r.intersects(t, e)))))))))
                    }
                    test(t) {
                        if (!t) return !1;
                        if ("string" == typeof t) try {
                            t = new h(t, this.options)
                        } catch (t) {
                            return !1
                        }
                        for (let e = 0; e < this.set.length; e++)
                            if (S(this.set[e], t, this.options)) return !0;
                        return !1
                    }
                }
                t.exports = i;
                const n = new(r(86))({
                        max: 1e3
                    }),
                    o = r(59),
                    s = r(84),
                    a = r(57),
                    h = r(58),
                    {
                        re: u,
                        t: l,
                        comparatorTrimReplace: c,
                        tildeTrimReplace: f,
                        caretTrimReplace: d
                    } = r(55),
                    p = t => "<0.0.0-0" === t.value,
                    m = t => "" === t.value,
                    g = (t, e) => {
                        let r = !0;
                        const i = t.slice();
                        let n = i.pop();
                        for (; r && i.length;) r = i.every((t => n.intersects(t, e))), n = i.pop();
                        return r
                    },
                    v = (t, e) => (a("comp", t, e), t = M(t, e), a("caret", t), t = w(t, e), a("tildes", t), t = A(t, e), a("xrange", t), t = B(t, e), a("stars", t), t),
                    y = t => !t || "x" === t.toLowerCase() || "*" === t,
                    w = (t, e) => t.trim().split(/\s+/).map((t => b(t, e))).join(" "),
                    b = (t, e) => {
                        const r = e.loose ? u[l.TILDELOOSE] : u[l.TILDE];
                        return t.replace(r, ((e, r, i, n, o) => {
                            let s;
                            return a("tilde", t, e, r, i, n, o), y(r) ? s = "" : y(i) ? s = `>=${r}.0.0 <${+r+1}.0.0-0` : y(n) ? s = `>=${r}.${i}.0 <${r}.${+i+1}.0-0` : o ? (a("replaceTilde pr", o), s = `>=${r}.${i}.${n}-${o} <${r}.${+i+1}.0-0`) : s = `>=${r}.${i}.${n} <${r}.${+i+1}.0-0`, a("tilde return", s), s
                        }))
                    },
                    M = (t, e) => t.trim().split(/\s+/).map((t => E(t, e))).join(" "),
                    E = (t, e) => {
                        a("caret", t, e);
                        const r = e.loose ? u[l.CARETLOOSE] : u[l.CARET],
                            i = e.includePrerelease ? "-0" : "";
                        return t.replace(r, ((e, r, n, o, s) => {
                            let h;
                            return a("caret", t, e, r, n, o, s), y(r) ? h = "" : y(n) ? h = `>=${r}.0.0${i} <${+r+1}.0.0-0` : y(o) ? h = "0" === r ? `>=${r}.${n}.0${i} <${r}.${+n+1}.0-0` : `>=${r}.${n}.0${i} <${+r+1}.0.0-0` : s ? (a("replaceCaret pr", s), h = "0" === r ? "0" === n ? `>=${r}.${n}.${o}-${s} <${r}.${n}.${+o+1}-0` : `>=${r}.${n}.${o}-${s} <${r}.${+n+1}.0-0` : `>=${r}.${n}.${o}-${s} <${+r+1}.0.0-0`) : (a("no pr"), h = "0" === r ? "0" === n ? `>=${r}.${n}.${o}${i} <${r}.${n}.${+o+1}-0` : `>=${r}.${n}.${o}${i} <${r}.${+n+1}.0-0` : `>=${r}.${n}.${o} <${+r+1}.0.0-0`), a("caret return", h), h
                        }))
                    },
                    A = (t, e) => (a("replaceXRanges", t, e), t.split(/\s+/).map((t => C(t, e))).join(" ")),
                    C = (t, e) => {
                        t = t.trim();
                        const r = e.loose ? u[l.XRANGELOOSE] : u[l.XRANGE];
                        return t.replace(r, ((r, i, n, o, s, h) => {
                            a("xRange", t, r, i, n, o, s, h);
                            const u = y(n),
                                l = u || y(o),
                                c = l || y(s),
                                f = c;
                            return "=" === i && f && (i = ""), h = e.includePrerelease ? "-0" : "", u ? r = ">" === i || "<" === i ? "<0.0.0-0" : "*" : i && f ? (l && (o = 0), s = 0, ">" === i ? (i = ">=", l ? (n = +n + 1, o = 0, s = 0) : (o = +o + 1, s = 0)) : "<=" === i && (i = "<", l ? n = +n + 1 : o = +o + 1), "<" === i && (h = "-0"), r = `${i+n}.${o}.${s}${h}`) : l ? r = `>=${n}.0.0${h} <${+n+1}.0.0-0` : c && (r = `>=${n}.${o}.0${h} <${n}.${+o+1}.0-0`), a("xRange return", r), r
                        }))
                    },
                    B = (t, e) => (a("replaceStars", t, e), t.trim().replace(u[l.STAR], "")),
                    F = (t, e) => (a("replaceGTE0", t, e), t.trim().replace(u[e.includePrerelease ? l.GTE0PRE : l.GTE0], "")),
                    _ = t => (e, r, i, n, o, s, a, h, u, l, c, f, d) => `${r=y(i)?"":y(n)?`>=${i}.0.0${t?"-0":""}`:y(o)?`>=${i}.${n}.0${t?"-0":""}`:s?`>=${r}`:`>=${r}${t?"-0":""}`} ${h=y(u)?"":y(l)?`<${+u+1}.0.0-0`:y(c)?`<${u}.${+l+1}.0-0`:f?`<=${u}.${l}.${c}-${f}`:t?`<${u}.${l}.${+c+1}-0`:`<=${h}`}`.trim(),
                    S = (t, e, r) => {
                        for (let r = 0; r < t.length; r++)
                            if (!t[r].test(e)) return !1;
                        if (e.prerelease.length && !r.includePrerelease) {
                            for (let r = 0; r < t.length; r++)
                                if (a(t[r].semver), t[r].semver !== s.ANY && t[r].semver.prerelease.length > 0) {
                                    const i = t[r].semver;
                                    if (i.major === e.major && i.minor === e.minor && i.patch === e.patch) return !0
                                }
                            return !1
                        }
                        return !0
                    }
            }, (t, e, r) => {
                "use strict";
                const i = r(87),
                    n = Symbol("max"),
                    o = Symbol("length"),
                    s = Symbol("lengthCalculator"),
                    a = Symbol("allowStale"),
                    h = Symbol("maxAge"),
                    u = Symbol("dispose"),
                    l = Symbol("noDisposeOnSet"),
                    c = Symbol("lruList"),
                    f = Symbol("cache"),
                    d = Symbol("updateAgeOnGet"),
                    p = () => 1,
                    m = (t, e, r) => {
                        const i = t[f].get(e);
                        if (i) {
                            const e = i.value;
                            if (g(t, e)) {
                                if (y(t, i), !t[a]) return
                            } else r && (t[d] && (i.value.now = Date.now()), t[c].unshiftNode(i));
                            return e.value
                        }
                    },
                    g = (t, e) => {
                        if (!e || !e.maxAge && !t[h]) return !1;
                        const r = Date.now() - e.now;
                        return e.maxAge ? r > e.maxAge : t[h] && r > t[h]
                    },
                    v = t => {
                        if (t[o] > t[n])
                            for (let e = t[c].tail; t[o] > t[n] && null !== e;) {
                                const r = e.prev;
                                y(t, e), e = r
                            }
                    },
                    y = (t, e) => {
                        if (e) {
                            const r = e.value;
                            t[u] && t[u](r.key, r.value), t[o] -= r.length, t[f].delete(r.key), t[c].removeNode(e)
                        }
                    };
                class w {
                    constructor(t, e, r, i, n) {
                        this.key = t, this.value = e, this.length = r, this.now = i, this.maxAge = n || 0
                    }
                }
                const b = (t, e, r, i) => {
                    let n = r.value;
                    g(t, n) && (y(t, r), t[a] || (n = void 0)), n && e.call(i, n.value, n.key, t)
                };
                t.exports = class {
                    constructor(t) {
                        if ("number" == typeof t && (t = {
                                max: t
                            }), t || (t = {}), t.max && ("number" != typeof t.max || t.max < 0)) throw new TypeError("max must be a non-negative number");
                        this[n] = t.max || 1 / 0;
                        const e = t.length || p;
                        if (this[s] = "function" != typeof e ? p : e, this[a] = t.stale || !1, t.maxAge && "number" != typeof t.maxAge) throw new TypeError("maxAge must be a number");
                        this[h] = t.maxAge || 0, this[u] = t.dispose, this[l] = t.noDisposeOnSet || !1, this[d] = t.updateAgeOnGet || !1, this.reset()
                    }
                    set max(t) {
                        if ("number" != typeof t || t < 0) throw new TypeError("max must be a non-negative number");
                        this[n] = t || 1 / 0, v(this)
                    }
                    get max() {
                        return this[n]
                    }
                    set allowStale(t) {
                        this[a] = !!t
                    }
                    get allowStale() {
                        return this[a]
                    }
                    set maxAge(t) {
                        if ("number" != typeof t) throw new TypeError("maxAge must be a non-negative number");
                        this[h] = t, v(this)
                    }
                    get maxAge() {
                        return this[h]
                    }
                    set lengthCalculator(t) {
                        "function" != typeof t && (t = p), t !== this[s] && (this[s] = t, this[o] = 0, this[c].forEach((t => {
                            t.length = this[s](t.value, t.key), this[o] += t.length
                        }))), v(this)
                    }
                    get lengthCalculator() {
                        return this[s]
                    }
                    get length() {
                        return this[o]
                    }
                    get itemCount() {
                        return this[c].length
                    }
                    rforEach(t, e) {
                        e = e || this;
                        for (let r = this[c].tail; null !== r;) {
                            const i = r.prev;
                            b(this, t, r, e), r = i
                        }
                    }
                    forEach(t, e) {
                        e = e || this;
                        for (let r = this[c].head; null !== r;) {
                            const i = r.next;
                            b(this, t, r, e), r = i
                        }
                    }
                    keys() {
                        return this[c].toArray().map((t => t.key))
                    }
                    values() {
                        return this[c].toArray().map((t => t.value))
                    }
                    reset() {
                        this[u] && this[c] && this[c].length && this[c].forEach((t => this[u](t.key, t.value))), this[f] = new Map, this[c] = new i, this[o] = 0
                    }
                    dump() {
                        return this[c].map((t => !g(this, t) && {
                            k: t.key,
                            v: t.value,
                            e: t.now + (t.maxAge || 0)
                        })).toArray().filter((t => t))
                    }
                    dumpLru() {
                        return this[c]
                    }
                    set(t, e, r) {
                        if ((r = r || this[h]) && "number" != typeof r) throw new TypeError("maxAge must be a number");
                        const i = r ? Date.now() : 0,
                            a = this[s](e, t);
                        if (this[f].has(t)) {
                            if (a > this[n]) return y(this, this[f].get(t)), !1;
                            const s = this[f].get(t).value;
                            return this[u] && (this[l] || this[u](t, s.value)), s.now = i, s.maxAge = r, s.value = e, this[o] += a - s.length, s.length = a, this.get(t), v(this), !0
                        }
                        const d = new w(t, e, a, i, r);
                        return d.length > this[n] ? (this[u] && this[u](t, e), !1) : (this[o] += d.length, this[c].unshift(d), this[f].set(t, this[c].head), v(this), !0)
                    }
                    has(t) {
                        if (!this[f].has(t)) return !1;
                        const e = this[f].get(t).value;
                        return !g(this, e)
                    }
                    get(t) {
                        return m(this, t, !0)
                    }
                    peek(t) {
                        return m(this, t, !1)
                    }
                    pop() {
                        const t = this[c].tail;
                        return t ? (y(this, t), t.value) : null
                    }
                    del(t) {
                        y(this, this[f].get(t))
                    }
                    load(t) {
                        this.reset();
                        const e = Date.now();
                        for (let r = t.length - 1; r >= 0; r--) {
                            const i = t[r],
                                n = i.e || 0;
                            if (0 === n) this.set(i.k, i.v);
                            else {
                                const t = n - e;
                                t > 0 && this.set(i.k, i.v, t)
                            }
                        }
                    }
                    prune() {
                        this[f].forEach(((t, e) => m(this, e, !1)))
                    }
                }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    var e = this;
                    if (e instanceof i || (e = new i), e.tail = null, e.head = null, e.length = 0, t && "function" == typeof t.forEach) t.forEach((function(t) {
                        e.push(t)
                    }));
                    else if (arguments.length > 0)
                        for (var r = 0, n = arguments.length; r < n; r++) e.push(arguments[r]);
                    return e
                }

                function n(t, e, r) {
                    var i = e === t.head ? new a(r, null, e, t) : new a(r, e, e.next, t);
                    return null === i.next && (t.tail = i), null === i.prev && (t.head = i), t.length++, i
                }

                function o(t, e) {
                    t.tail = new a(e, t.tail, null, t), t.head || (t.head = t.tail), t.length++
                }

                function s(t, e) {
                    t.head = new a(e, null, t.head, t), t.tail || (t.tail = t.head), t.length++
                }

                function a(t, e, r, i) {
                    if (!(this instanceof a)) return new a(t, e, r, i);
                    this.list = i, this.value = t, e ? (e.next = this, this.prev = e) : this.prev = null, r ? (r.prev = this, this.next = r) : this.next = null
                }
                t.exports = i, i.Node = a, i.create = i, i.prototype.removeNode = function(t) {
                    if (t.list !== this) throw new Error("removing node which does not belong to this list");
                    var e = t.next,
                        r = t.prev;
                    return e && (e.prev = r), r && (r.next = e), t === this.head && (this.head = e), t === this.tail && (this.tail = r), t.list.length--, t.next = null, t.prev = null, t.list = null, e
                }, i.prototype.unshiftNode = function(t) {
                    if (t !== this.head) {
                        t.list && t.list.removeNode(t);
                        var e = this.head;
                        t.list = this, t.next = e, e && (e.prev = t), this.head = t, this.tail || (this.tail = t), this.length++
                    }
                }, i.prototype.pushNode = function(t) {
                    if (t !== this.tail) {
                        t.list && t.list.removeNode(t);
                        var e = this.tail;
                        t.list = this, t.prev = e, e && (e.next = t), this.tail = t, this.head || (this.head = t), this.length++
                    }
                }, i.prototype.push = function() {
                    for (var t = 0, e = arguments.length; t < e; t++) o(this, arguments[t]);
                    return this.length
                }, i.prototype.unshift = function() {
                    for (var t = 0, e = arguments.length; t < e; t++) s(this, arguments[t]);
                    return this.length
                }, i.prototype.pop = function() {
                    if (this.tail) {
                        var t = this.tail.value;
                        return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, t
                    }
                }, i.prototype.shift = function() {
                    if (this.head) {
                        var t = this.head.value;
                        return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, t
                    }
                }, i.prototype.forEach = function(t, e) {
                    e = e || this;
                    for (var r = this.head, i = 0; null !== r; i++) t.call(e, r.value, i, this), r = r.next
                }, i.prototype.forEachReverse = function(t, e) {
                    e = e || this;
                    for (var r = this.tail, i = this.length - 1; null !== r; i--) t.call(e, r.value, i, this), r = r.prev
                }, i.prototype.get = function(t) {
                    for (var e = 0, r = this.head; null !== r && e < t; e++) r = r.next;
                    if (e === t && null !== r) return r.value
                }, i.prototype.getReverse = function(t) {
                    for (var e = 0, r = this.tail; null !== r && e < t; e++) r = r.prev;
                    if (e === t && null !== r) return r.value
                }, i.prototype.map = function(t, e) {
                    e = e || this;
                    for (var r = new i, n = this.head; null !== n;) r.push(t.call(e, n.value, this)), n = n.next;
                    return r
                }, i.prototype.mapReverse = function(t, e) {
                    e = e || this;
                    for (var r = new i, n = this.tail; null !== n;) r.push(t.call(e, n.value, this)), n = n.prev;
                    return r
                }, i.prototype.reduce = function(t, e) {
                    var r, i = this.head;
                    if (arguments.length > 1) r = e;
                    else {
                        if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
                        i = this.head.next, r = this.head.value
                    }
                    for (var n = 0; null !== i; n++) r = t(r, i.value, n), i = i.next;
                    return r
                }, i.prototype.reduceReverse = function(t, e) {
                    var r, i = this.tail;
                    if (arguments.length > 1) r = e;
                    else {
                        if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
                        i = this.tail.prev, r = this.tail.value
                    }
                    for (var n = this.length - 1; null !== i; n--) r = t(r, i.value, n), i = i.prev;
                    return r
                }, i.prototype.toArray = function() {
                    for (var t = new Array(this.length), e = 0, r = this.head; null !== r; e++) t[e] = r.value, r = r.next;
                    return t
                }, i.prototype.toArrayReverse = function() {
                    for (var t = new Array(this.length), e = 0, r = this.tail; null !== r; e++) t[e] = r.value, r = r.prev;
                    return t
                }, i.prototype.slice = function(t, e) {
                    (e = e || this.length) < 0 && (e += this.length), (t = t || 0) < 0 && (t += this.length);
                    var r = new i;
                    if (e < t || e < 0) return r;
                    t < 0 && (t = 0), e > this.length && (e = this.length);
                    for (var n = 0, o = this.head; null !== o && n < t; n++) o = o.next;
                    for (; null !== o && n < e; n++, o = o.next) r.push(o.value);
                    return r
                }, i.prototype.sliceReverse = function(t, e) {
                    (e = e || this.length) < 0 && (e += this.length), (t = t || 0) < 0 && (t += this.length);
                    var r = new i;
                    if (e < t || e < 0) return r;
                    t < 0 && (t = 0), e > this.length && (e = this.length);
                    for (var n = this.length, o = this.tail; null !== o && n > e; n--) o = o.prev;
                    for (; null !== o && n > t; n--, o = o.prev) r.push(o.value);
                    return r
                }, i.prototype.splice = function(t, e, ...r) {
                    t > this.length && (t = this.length - 1), t < 0 && (t = this.length + t);
                    for (var i = 0, o = this.head; null !== o && i < t; i++) o = o.next;
                    var s = [];
                    for (i = 0; o && i < e; i++) s.push(o.value), o = this.removeNode(o);
                    for (null === o && (o = this.tail), o !== this.head && o !== this.tail && (o = o.prev), i = 0; i < r.length; i++) o = n(this, o, r[i]);
                    return s
                }, i.prototype.reverse = function() {
                    for (var t = this.head, e = this.tail, r = t; null !== r; r = r.prev) {
                        var i = r.prev;
                        r.prev = r.next, r.next = i
                    }
                    return this.head = e, this.tail = t, this
                };
                try {
                    r(88)(i)
                } catch (t) {}
            }, t => {
                "use strict";
                t.exports = function(t) {
                    t.prototype[Symbol.iterator] = function*() {
                        for (let t = this.head; t; t = t.next) yield t.value
                    }
                }
            }, (t, e, r) => {
                const i = r(85);
                t.exports = (t, e, r) => {
                    try {
                        e = new i(e, r)
                    } catch (t) {
                        return !1
                    }
                    return e.test(t)
                }
            }, (t, e, r) => {
                const i = r(85);
                t.exports = (t, e) => new i(t, e).set.map((t => t.map((t => t.value)).join(" ").trim().split(" ")))
            }, (t, e, r) => {
                const i = r(58),
                    n = r(85);
                t.exports = (t, e, r) => {
                    let o = null,
                        s = null,
                        a = null;
                    try {
                        a = new n(e, r)
                    } catch (t) {
                        return null
                    }
                    return t.forEach((t => {
                        a.test(t) && (o && -1 !== s.compare(t) || (o = t, s = new i(o, r)))
                    })), o
                }
            }, (t, e, r) => {
                const i = r(58),
                    n = r(85);
                t.exports = (t, e, r) => {
                    let o = null,
                        s = null,
                        a = null;
                    try {
                        a = new n(e, r)
                    } catch (t) {
                        return null
                    }
                    return t.forEach((t => {
                        a.test(t) && (o && 1 !== s.compare(t) || (o = t, s = new i(o, r)))
                    })), o
                }
            }, (t, e, r) => {
                const i = r(58),
                    n = r(85),
                    o = r(77);
                t.exports = (t, e) => {
                    t = new n(t, e);
                    let r = new i("0.0.0");
                    if (t.test(r)) return r;
                    if (r = new i("0.0.0-0"), t.test(r)) return r;
                    r = null;
                    for (let e = 0; e < t.set.length; ++e) {
                        const n = t.set[e];
                        let s = null;
                        n.forEach((t => {
                            const e = new i(t.semver.version);
                            switch (t.operator) {
                                case ">":
                                    0 === e.prerelease.length ? e.patch++ : e.prerelease.push(0), e.raw = e.format();
                                case "":
                                case ">=":
                                    s && !o(e, s) || (s = e);
                                    break;
                                case "<":
                                case "<=":
                                    break;
                                default:
                                    throw new Error(`Unexpected operation: ${t.operator}`)
                            }
                        })), !s || r && !o(r, s) || (r = s)
                    }
                    return r && t.test(r) ? r : null
                }
            }, (t, e, r) => {
                const i = r(85);
                t.exports = (t, e) => {
                    try {
                        return new i(t, e).range || "*"
                    } catch (t) {
                        return null
                    }
                }
            }, (t, e, r) => {
                const i = r(58),
                    n = r(84),
                    {
                        ANY: o
                    } = n,
                    s = r(85),
                    a = r(89),
                    h = r(77),
                    u = r(78),
                    l = r(81),
                    c = r(80);
                t.exports = (t, e, r, f) => {
                    let d, p, m, g, v;
                    switch (t = new i(t, f), e = new s(e, f), r) {
                        case ">":
                            d = h, p = l, m = u, g = ">", v = ">=";
                            break;
                        case "<":
                            d = u, p = c, m = h, g = "<", v = "<=";
                            break;
                        default:
                            throw new TypeError('Must provide a hilo val of "<" or ">"')
                    }
                    if (a(t, e, f)) return !1;
                    for (let r = 0; r < e.set.length; ++r) {
                        const i = e.set[r];
                        let s = null,
                            a = null;
                        if (i.forEach((t => {
                                t.semver === o && (t = new n(">=0.0.0")), s = s || t, a = a || t, d(t.semver, s.semver, f) ? s = t : m(t.semver, a.semver, f) && (a = t)
                            })), s.operator === g || s.operator === v) return !1;
                        if ((!a.operator || a.operator === g) && p(t, a.semver)) return !1;
                        if (a.operator === v && m(t, a.semver)) return !1
                    }
                    return !0
                }
            }, (t, e, r) => {
                const i = r(95);
                t.exports = (t, e, r) => i(t, e, ">", r)
            }, (t, e, r) => {
                const i = r(95);
                t.exports = (t, e, r) => i(t, e, "<", r)
            }, (t, e, r) => {
                const i = r(85);
                t.exports = (t, e, r) => (t = new i(t, r), e = new i(e, r), t.intersects(e))
            }, (t, e, r) => {
                const i = r(89),
                    n = r(67);
                t.exports = (t, e, r) => {
                    const o = [];
                    let s = null,
                        a = null;
                    const h = t.sort(((t, e) => n(t, e, r)));
                    for (const t of h) i(t, e, r) ? (a = t, s || (s = t)) : (a && o.push([s, a]), a = null, s = null);
                    s && o.push([s, null]);
                    const u = [];
                    for (const [t, e] of o) t === e ? u.push(t) : e || t !== h[0] ? e ? t === h[0] ? u.push(`<=${e}`) : u.push(`${t} - ${e}`) : u.push(`>=${t}`) : u.push("*");
                    const l = u.join(" || "),
                        c = "string" == typeof e.raw ? e.raw : String(e);
                    return l.length < c.length ? l : e
                }
            }, (t, e, r) => {
                const i = r(85),
                    n = r(84),
                    {
                        ANY: o
                    } = n,
                    s = r(89),
                    a = r(67),
                    h = (t, e, r) => {
                        if (t === e) return !0;
                        if (1 === t.length && t[0].semver === o) {
                            if (1 === e.length && e[0].semver === o) return !0;
                            t = r.includePrerelease ? [new n(">=0.0.0-0")] : [new n(">=0.0.0")]
                        }
                        if (1 === e.length && e[0].semver === o) {
                            if (r.includePrerelease) return !0;
                            e = [new n(">=0.0.0")]
                        }
                        const i = new Set;
                        let h, c, f, d, p, m, g;
                        for (const e of t) ">" === e.operator || ">=" === e.operator ? h = u(h, e, r) : "<" === e.operator || "<=" === e.operator ? c = l(c, e, r) : i.add(e.semver);
                        if (i.size > 1) return null;
                        if (h && c) {
                            if (f = a(h.semver, c.semver, r), f > 0) return null;
                            if (0 === f && (">=" !== h.operator || "<=" !== c.operator)) return null
                        }
                        for (const t of i) {
                            if (h && !s(t, String(h), r)) return null;
                            if (c && !s(t, String(c), r)) return null;
                            for (const i of e)
                                if (!s(t, String(i), r)) return !1;
                            return !0
                        }
                        let v = !(!c || r.includePrerelease || !c.semver.prerelease.length) && c.semver,
                            y = !(!h || r.includePrerelease || !h.semver.prerelease.length) && h.semver;
                        v && 1 === v.prerelease.length && "<" === c.operator && 0 === v.prerelease[0] && (v = !1);
                        for (const t of e) {
                            if (g = g || ">" === t.operator || ">=" === t.operator, m = m || "<" === t.operator || "<=" === t.operator, h)
                                if (y && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === y.major && t.semver.minor === y.minor && t.semver.patch === y.patch && (y = !1), ">" === t.operator || ">=" === t.operator) {
                                    if (d = u(h, t, r), d === t && d !== h) return !1
                                } else if (">=" === h.operator && !s(h.semver, String(t), r)) return !1;
                            if (c)
                                if (v && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === v.major && t.semver.minor === v.minor && t.semver.patch === v.patch && (v = !1), "<" === t.operator || "<=" === t.operator) {
                                    if (p = l(c, t, r), p === t && p !== c) return !1
                                } else if ("<=" === c.operator && !s(c.semver, String(t), r)) return !1;
                            if (!t.operator && (c || h) && 0 !== f) return !1
                        }
                        return !(h && m && !c && 0 !== f || c && g && !h && 0 !== f || y || v)
                    },
                    u = (t, e, r) => {
                        if (!t) return e;
                        const i = a(t.semver, e.semver, r);
                        return i > 0 ? t : i < 0 || ">" === e.operator && ">=" === t.operator ? e : t
                    },
                    l = (t, e, r) => {
                        if (!t) return e;
                        const i = a(t.semver, e.semver, r);
                        return i < 0 ? t : i > 0 || "<" === e.operator && "<=" === t.operator ? e : t
                    };
                t.exports = (t, e, r = {}) => {
                    if (t === e) return !0;
                    t = new i(t, r), e = new i(e, r);
                    let n = !1;
                    t: for (const i of t.set) {
                        for (const t of e.set) {
                            const e = h(i, t, r);
                            if (n = n || null !== e, e) continue t
                        }
                        if (n) return !1
                    }
                    return !0
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    listen: () => s,
                    log: () => o
                });
                let i = 0;
                const n = [],
                    o = (t, e, r) => {
                        const o = {
                            type: t,
                            id: String(++i),
                            date: new Date
                        };
                        e && (o.message = e), r && (o.data = r),
                            function(t) {
                                for (let e = 0; e < n.length; e++) try {
                                    n[e](t)
                                } catch (t) {
                                    console.error(t)
                                }
                            }(o)
                    },
                    s = t => (n.push(t), () => {
                        const e = n.indexOf(t); - 1 !== e && (n[e] = n[n.length - 1], n.pop())
                    });
                "undefined" != typeof window && (window.__ledgerLogsListen = s)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    getFirstLedgerDevice: () => a,
                    getLedgerDevices: () => s,
                    isSupported: () => h,
                    requestLedgerDevice: () => o
                });
                var i = r(53);
                const n = [{
                    vendorId: i.ledgerUSBVendorId
                }];
                async function o() {
                    return await navigator.usb.requestDevice({
                        filters: n
                    })
                }
                async function s() {
                    return (await navigator.usb.getDevices()).filter((t => t.vendorId === i.ledgerUSBVendorId))
                }
                async function a() {
                    const t = await s();
                    return t.length > 0 ? t[0] : o()
                }
                const h = () => Promise.resolve(!!navigator && !!navigator.usb && "function" == typeof navigator.usb.getDevices)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    default: () => d
                });
                var i = r(49),
                    n = r(52),
                    o = r(53),
                    s = r(101),
                    a = r(51),
                    h = r(9).Buffer;
                const u = [{
                        vendorId: o.ledgerUSBVendorId
                    }],
                    l = () => {
                        const {
                            hid: t
                        } = navigator;
                        if (!t) throw new a.TransportError("navigator.hid is not supported", "HIDNotSupported");
                        return t
                    };
                async function c() {
                    const t = await l().requestDevice({
                        filters: u
                    });
                    return Array.isArray(t) ? t : [t]
                }
                async function f() {
                    return (await l().getDevices()).filter((t => t.vendorId === o.ledgerUSBVendorId))
                }
                class d extends i.default {
                    constructor(t) {
                        super(), this.device = void 0, this.deviceModel = void 0, this.channel = Math.floor(65535 * Math.random()), this.packetSize = 64, this.inputs = [], this.inputCallback = void 0, this.read = () => this.inputs.length ? Promise.resolve(this.inputs.shift()) : new Promise((t => {
                            this.inputCallback = t
                        })), this.onInputReport = t => {
                            const e = h.from(t.data.buffer);
                            this.inputCallback ? (this.inputCallback(e), this.inputCallback = null) : this.inputs.push(e)
                        }, this._disconnectEmitted = !1, this._emitDisconnect = t => {
                            this._disconnectEmitted || (this._disconnectEmitted = !0, this.emit("disconnect", t))
                        }, this.exchange = t => this.exchangeAtomicImpl((async () => {
                            const {
                                channel: e,
                                packetSize: r
                            } = this;
                            (0, s.log)("apdu", "=> " + t.toString("hex"));
                            const i = (0, n.default)(e, r),
                                o = i.makeBlocks(t);
                            for (let t = 0; t < o.length; t++) await this.device.sendReport(0, o[t]);
                            let a, h;
                            for (; !(a = i.getReducedResult(h));) {
                                const t = await this.read();
                                h = i.reduceResponse(h, t)
                            }
                            return (0, s.log)("apdu", "<= " + a.toString("hex")), a
                        })).catch((t => {
                            if (t && t.message && t.message.includes("write")) throw this._emitDisconnect(t), new a.DisconnectedDeviceDuringOperation(t.message);
                            throw t
                        })), this.device = t, this.deviceModel = (0, o.identifyUSBProductId)(t.productId), t.addEventListener("inputreport", this.onInputReport)
                    }
                    static async request() {
                        const [t] = await c();
                        return d.open(t)
                    }
                    static async openConnected() {
                        const t = await f();
                        return 0 === t.length ? null : d.open(t[0])
                    }
                    static async open(t) {
                        await t.open();
                        const e = new d(t),
                            r = i => {
                                t === i.device && (l().removeEventListener("disconnect", r), e._emitDisconnect(new a.DisconnectedDevice))
                            };
                        return l().addEventListener("disconnect", r), e
                    }
                    async close() {
                        await this.exchangeBusyPromise, this.device.removeEventListener("inputreport", this.onInputReport), await this.device.close()
                    }
                    setScrambleKey() {}
                }
                d.isSupported = () => Promise.resolve(!(!r.g.navigator || !r.g.navigator.hid)), d.list = f, d.listen = t => {
                    let e = !1;
                    return async function() {
                        const t = await f();
                        return t.length > 0 ? t[0] : (await c())[0]
                    }().then((r => {
                        if (r) {
                            if (!e) {
                                const e = (0, o.identifyUSBProductId)(r.productId);
                                t.next({
                                    type: "add",
                                    descriptor: r,
                                    deviceModel: e
                                }), t.complete()
                            }
                        } else t.error(new a.TransportOpenUserCancelled("Access denied to use Ledger device"))
                    }), (e => {
                        t.error(new a.TransportOpenUserCancelled(e.message))
                    })), {
                        unsubscribe: function() {
                            e = !0
                        }
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    default: () => B
                });
                var i = r(49),
                    n = r(51),
                    o = r(53),
                    s = r(105),
                    a = r(209),
                    h = r(101),
                    u = r(107),
                    l = r(197),
                    c = r(189),
                    f = r(181),
                    d = r(211),
                    p = r(212),
                    m = r(214),
                    g = r(164),
                    v = r(218),
                    y = r(210),
                    w = r(9).Buffer;
                const b = () => {
                        const {
                            bluetooth: t
                        } = navigator;
                        if (void 0 === t) throw new Error("web bluetooth not supported");
                        return t
                    },
                    M = () => u.Observable.create((t => {
                        const e = b(),
                            r = e => {
                                t.next(e.value)
                            };
                        e.addEventListener("availabilitychanged", r);
                        let i = !1;
                        return e.getAvailability().then((e => {
                            i || t.next(e)
                        })), () => {
                            i = !0, e.removeEventListener("availabilitychanged", r)
                        }
                    })),
                    E = {},
                    A = () => ({
                        filters: (0, o.getBluetoothServiceUuids)().map((t => ({
                            services: [t]
                        })))
                    });
                async function C(t, e) {
                    let r;
                    if ("string" == typeof t) {
                        if (E[t]) return (0, h.log)("ble-verbose", "Transport in cache, using that."), E[t];
                        const e = b();
                        r = await e.requestDevice(A())
                    } else r = t;
                    r.gatt.connected || ((0, h.log)("ble-verbose", "not connected. connecting..."), await r.gatt.connect());
                    const [i, s] = await (async t => {
                        if (!t.gatt) throw new Error("bluetooth gatt not found");
                        const [e] = await t.gatt.getPrimaryServices();
                        if (!e) throw new Error("bluetooth service not found");
                        const r = (0, o.getInfosForServiceUuid)(e.uuid);
                        if (!r) throw new Error("bluetooth service infos not found");
                        return [e, r]
                    })(r), {
                        deviceModel: a,
                        writeUuid: u,
                        notifyUuid: l
                    } = s, [c, f] = await Promise.all([i.getCharacteristic(u), i.getCharacteristic(l)]), m = (0, y.monitorCharacteristic)(f).pipe((0, d.tap)((t => {
                        (0, h.log)("ble-frame", "<= " + t.toString("hex"))
                    })), (0, p.share)()), g = m.subscribe(), v = new B(r, c, m, a);
                    if (!r.gatt.connected) throw new n.DisconnectedDevice;
                    E[v.id] = v;
                    const w = t => {
                        console.log("onDisconnect!", t), delete E[v.id], v.notYetDisconnected = !1, g.unsubscribe(), r.removeEventListener("gattserverdisconnected", w), (0, h.log)("ble-verbose", `BleTransport(${v.id}) disconnected`), v.emit("disconnect", t)
                    };
                    r.addEventListener("gattserverdisconnected", w);
                    let M = Date.now();
                    try {
                        await v.inferMTU()
                    } finally {
                        Date.now() - M < 1e3 && (e = !1), e && (await r.gatt.disconnect(), await new Promise((t => setTimeout(t, 4e3))))
                    }
                    return e ? C(r, !1) : v
                }
                class B extends i.default {
                    static listen(t) {
                        let e;
                        return (0, h.log)("ble-verbose", "listen..."), b().requestDevice(A()).then((async r => {
                            e || (t.next({
                                type: "add",
                                descriptor: r
                            }), t.complete())
                        }), (e => {
                            t.error(new n.TransportOpenUserCancelled(e.message))
                        })), {
                            unsubscribe: function() {
                                e = !0
                            }
                        }
                    }
                    static async open(t) {
                        return C(t, !0)
                    }
                    constructor(t, e, r, i) {
                        super(), this.id = void 0, this.device = void 0, this.mtuSize = 20, this.writeCharacteristic = void 0, this.notifyObservable = void 0, this.notYetDisconnected = !0, this.deviceModel = void 0, this.exchange = t => this.exchangeAtomicImpl((async () => {
                            try {
                                const e = t.toString("hex");
                                (0, h.log)("apdu", `=> ${e}`);
                                const r = await (0, l.merge)(this.notifyObservable.pipe(a.receiveAPDU), (0, s.sendAPDU)(this.write, t, this.mtuSize)).toPromise(),
                                    i = r.toString("hex");
                                return (0, h.log)("apdu", `<= ${i}`), r
                            } catch (t) {
                                throw (0, h.log)("ble-error", "exchange got " + String(t)), this.notYetDisconnected && this.device.gatt.disconnect(), t
                            }
                        })), this.write = async t => {
                            (0, h.log)("ble-frame", "=> " + t.toString("hex")), await this.writeCharacteristic.writeValue(t)
                        }, this.id = t.id, this.device = t, this.writeCharacteristic = e, this.notifyObservable = r, this.deviceModel = i, (0, h.log)("ble-verbose", `BleTransport(${String(this.id)}) new instance`)
                    }
                    async inferMTU() {
                        let t = 23;
                        if (await this.exchangeAtomicImpl((async () => {
                                try {
                                    t = await (0, l.merge)(this.notifyObservable.pipe((0, m.first)((t => 8 === t.readUInt8(0))), (0, g.map)((t => t.readUInt8(5)))), (0, c.defer)((() => (0, f.from)(this.write(w.from([8, 0, 0, 0, 0]))))).pipe((0, v.ignoreElements)())).toPromise() + 3
                                } catch (t) {
                                    throw (0, h.log)("ble-error", "inferMTU got " + String(t)), this.device.gatt.disconnect(), t
                                }
                            })), t > 23) {
                            const e = t - 3;
                            (0, h.log)("ble-verbose", `BleTransport(${String(this.id)}) mtu set to ${String(e)}`), this.mtuSize = e
                        }
                        return this.mtuSize
                    }
                    setScrambleKey() {}
                    async close() {
                        this.exchangeBusyPromise && await this.exchangeBusyPromise
                    }
                }
                B.isSupported = () => Promise.resolve().then(b).then((() => !0), (() => !1)), B.observeAvailability = t => M.subscribe(t), B.list = () => Promise.resolve([]), B.disconnect = async t => {
                    (0, h.log)("ble-verbose", `user disconnect(${t})`);
                    const e = E[t];
                    e && e.device.gatt.disconnect()
                }
            }, (t, e, r) => {
                "use strict";
                var i = r(9).Buffer;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.sendAPDU = void 0;
                var n = r(106),
                    o = r(101);
                e.sendAPDU = (t, e, r) => {
                    const s = function(t, e) {
                        const r = [];
                        for (let i = 0, n = e(0); i < t.length; i += n, n = e(i)) r.push(t.slice(i, i + n));
                        return r
                    }(e, (t => r - (0 === t ? 5 : 3))).map(((t, r) => {
                        const n = i.alloc(0 === r ? 5 : 3);
                        return n.writeUInt8(5, 0), n.writeUInt16BE(r, 1), 0 === r && n.writeUInt16BE(e.length, 3), i.concat([n, t])
                    }));
                    return n.Observable.create((e => {
                        let r = !1;
                        return async function() {
                            for (const e of s) {
                                if (r) return;
                                await t(e)
                            }
                        }().then((() => {
                            r = !0, e.complete()
                        }), (t => {
                            r = !0, (0, o.log)("ble-error", "sendAPDU failure " + String(t)), e.error(t)
                        })), () => {
                            r || ((0, o.log)("ble-verbose", "sendAPDU interruption"), r = !0)
                        }
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ArgumentOutOfRangeError: () => C.ArgumentOutOfRangeError,
                    AsyncSubject: () => l.AsyncSubject,
                    BehaviorSubject: () => h.BehaviorSubject,
                    ConnectableObservable: () => n.ConnectableObservable,
                    EMPTY: () => N.EMPTY,
                    EmptyError: () => B.EmptyError,
                    GroupedObservable: () => o.GroupedObservable,
                    NEVER: () => K.NEVER,
                    Notification: () => w.Notification,
                    NotificationKind: () => w.NotificationKind,
                    ObjectUnsubscribedError: () => F.ObjectUnsubscribedError,
                    Observable: () => i.Observable,
                    ReplaySubject: () => u.ReplaySubject,
                    Scheduler: () => g.Scheduler,
                    Subject: () => a.Subject,
                    Subscriber: () => y.Subscriber,
                    Subscription: () => v.Subscription,
                    TimeoutError: () => S.TimeoutError,
                    UnsubscriptionError: () => _.UnsubscriptionError,
                    VirtualAction: () => m.VirtualAction,
                    VirtualTimeScheduler: () => m.VirtualTimeScheduler,
                    animationFrame: () => p.animationFrame,
                    animationFrameScheduler: () => p.animationFrameScheduler,
                    asap: () => c.asap,
                    asapScheduler: () => c.asapScheduler,
                    async: () => f.async,
                    asyncScheduler: () => f.asyncScheduler,
                    bindCallback: () => D.bindCallback,
                    bindNodeCallback: () => x.bindNodeCallback,
                    combineLatest: () => I.combineLatest,
                    concat: () => T.concat,
                    config: () => et.config,
                    defer: () => R.defer,
                    empty: () => N.empty,
                    forkJoin: () => O.forkJoin,
                    from: () => U.from,
                    fromEvent: () => k.fromEvent,
                    fromEventPattern: () => L.fromEventPattern,
                    generate: () => P.generate,
                    identity: () => E.identity,
                    iif: () => j.iif,
                    interval: () => $.interval,
                    isObservable: () => A.isObservable,
                    merge: () => q.merge,
                    never: () => K.never,
                    noop: () => M.noop,
                    observable: () => s.observable,
                    of: () => H.of,
                    onErrorResumeNext: () => G.onErrorResumeNext,
                    pairs: () => z.pairs,
                    partition: () => V.partition,
                    pipe: () => b.pipe,
                    queue: () => d.queue,
                    queueScheduler: () => d.queueScheduler,
                    race: () => W.race,
                    range: () => Z.range,
                    scheduled: () => tt.scheduled,
                    throwError: () => Y.throwError,
                    timer: () => X.timer,
                    using: () => J.using,
                    zip: () => Q.zip
                });
                var i = r(107),
                    n = r(124),
                    o = r(129),
                    s = r(121),
                    a = r(126),
                    h = r(130),
                    u = r(131),
                    l = r(148),
                    c = r(149),
                    f = r(153),
                    d = r(141),
                    p = r(154),
                    m = r(157),
                    g = r(144),
                    v = r(115),
                    y = r(109),
                    w = r(133),
                    b = r(122),
                    M = r(158),
                    E = r(123),
                    A = r(159),
                    C = r(160),
                    B = r(161),
                    F = r(127),
                    _ = r(117),
                    S = r(162),
                    D = r(163),
                    x = r(165),
                    I = r(166),
                    T = r(177),
                    R = r(189),
                    N = r(140),
                    O = r(190),
                    U = r(181),
                    k = r(191),
                    L = r(192),
                    P = r(193),
                    j = r(194),
                    $ = r(195),
                    q = r(197),
                    K = r(198),
                    H = r(134),
                    G = r(199),
                    z = r(200),
                    V = r(201),
                    W = r(204),
                    Z = r(205),
                    Y = r(139),
                    X = r(206),
                    J = r(207),
                    Q = r(208),
                    tt = r(182),
                    et = r(112)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Observable: () => h
                });
                var i = r(120),
                    n = r(108),
                    o = r(121),
                    s = r(122),
                    a = r(112),
                    h = function() {
                        function t(t) {
                            this._isScalar = !1, t && (this._subscribe = t)
                        }
                        return t.prototype.lift = function(e) {
                            var r = new t;
                            return r.source = this, r.operator = e, r
                        }, t.prototype.subscribe = function(t, e, r) {
                            var i = this.operator,
                                o = (0, n.toSubscriber)(t, e, r);
                            if (i ? o.add(i.call(o, this.source)) : o.add(this.source || a.config.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)), a.config.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && (o.syncErrorThrowable = !1, o.syncErrorThrown)) throw o.syncErrorValue;
                            return o
                        }, t.prototype._trySubscribe = function(t) {
                            try {
                                return this._subscribe(t)
                            } catch (e) {
                                a.config.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), (0, i.canReportError)(t) ? t.error(e) : console.warn(e)
                            }
                        }, t.prototype.forEach = function(t, e) {
                            var r = this;
                            return new(e = u(e))((function(e, i) {
                                var n;
                                n = r.subscribe((function(e) {
                                    try {
                                        t(e)
                                    } catch (t) {
                                        i(t), n && n.unsubscribe()
                                    }
                                }), i, e)
                            }))
                        }, t.prototype._subscribe = function(t) {
                            var e = this.source;
                            return e && e.subscribe(t)
                        }, t.prototype[o.observable] = function() {
                            return this
                        }, t.prototype.pipe = function() {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            return 0 === t.length ? this : (0, s.pipeFromArray)(t)(this)
                        }, t.prototype.toPromise = function(t) {
                            var e = this;
                            return new(t = u(t))((function(t, r) {
                                var i;
                                e.subscribe((function(t) {
                                    return i = t
                                }), (function(t) {
                                    return r(t)
                                }), (function() {
                                    return t(i)
                                }))
                            }))
                        }, t.create = function(e) {
                            return new t(e)
                        }, t
                    }();

                function u(t) {
                    if (t || (t = a.config.Promise || Promise), !t) throw new Error("no Promise impl found");
                    return t
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    toSubscriber: () => s
                });
                var i = r(109),
                    n = r(114),
                    o = r(111);

                function s(t, e, r) {
                    if (t) {
                        if (t instanceof i.Subscriber) return t;
                        if (t[n.rxSubscriber]) return t[n.rxSubscriber]()
                    }
                    return t || e || r ? new i.Subscriber(t, e, r) : new i.Subscriber(o.empty)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    SafeSubscriber: () => c,
                    Subscriber: () => l
                });
                var i = r(110),
                    n = r(116),
                    o = r(111),
                    s = r(115),
                    a = r(114),
                    h = r(112),
                    u = r(113),
                    l = function(t) {
                        function e(r, i, n) {
                            var s = t.call(this) || this;
                            switch (s.syncErrorValue = null, s.syncErrorThrown = !1, s.syncErrorThrowable = !1, s.isStopped = !1, arguments.length) {
                                case 0:
                                    s.destination = o.empty;
                                    break;
                                case 1:
                                    if (!r) {
                                        s.destination = o.empty;
                                        break
                                    }
                                    if ("object" == typeof r) {
                                        r instanceof e ? (s.syncErrorThrowable = r.syncErrorThrowable, s.destination = r, r.add(s)) : (s.syncErrorThrowable = !0, s.destination = new c(s, r));
                                        break
                                    }
                                default:
                                    s.syncErrorThrowable = !0, s.destination = new c(s, r, i, n)
                            }
                            return s
                        }
                        return i.__extends(e, t), e.prototype[a.rxSubscriber] = function() {
                            return this
                        }, e.create = function(t, r, i) {
                            var n = new e(t, r, i);
                            return n.syncErrorThrowable = !1, n
                        }, e.prototype.next = function(t) {
                            this.isStopped || this._next(t)
                        }, e.prototype.error = function(t) {
                            this.isStopped || (this.isStopped = !0, this._error(t))
                        }, e.prototype.complete = function() {
                            this.isStopped || (this.isStopped = !0, this._complete())
                        }, e.prototype.unsubscribe = function() {
                            this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this))
                        }, e.prototype._next = function(t) {
                            this.destination.next(t)
                        }, e.prototype._error = function(t) {
                            this.destination.error(t), this.unsubscribe()
                        }, e.prototype._complete = function() {
                            this.destination.complete(), this.unsubscribe()
                        }, e.prototype._unsubscribeAndRecycle = function() {
                            var t = this._parentOrParents;
                            return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
                        }, e
                    }(s.Subscription),
                    c = function(t) {
                        function e(e, r, i, s) {
                            var a, h = t.call(this) || this;
                            h._parentSubscriber = e;
                            var u = h;
                            return (0, n.isFunction)(r) ? a = r : r && (a = r.next, i = r.error, s = r.complete, r !== o.empty && (u = Object.create(r), (0, n.isFunction)(u.unsubscribe) && h.add(u.unsubscribe.bind(u)), u.unsubscribe = h.unsubscribe.bind(h))), h._context = u, h._next = a, h._error = i, h._complete = s, h
                        }
                        return i.__extends(e, t), e.prototype.next = function(t) {
                            if (!this.isStopped && this._next) {
                                var e = this._parentSubscriber;
                                h.config.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                            }
                        }, e.prototype.error = function(t) {
                            if (!this.isStopped) {
                                var e = this._parentSubscriber,
                                    r = h.config.useDeprecatedSynchronousErrorHandling;
                                if (this._error) r && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                                else if (e.syncErrorThrowable) r ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : (0, u.hostReportError)(t), this.unsubscribe();
                                else {
                                    if (this.unsubscribe(), r) throw t;
                                    (0, u.hostReportError)(t)
                                }
                            }
                        }, e.prototype.complete = function() {
                            var t = this;
                            if (!this.isStopped) {
                                var e = this._parentSubscriber;
                                if (this._complete) {
                                    var r = function() {
                                        return t._complete.call(t._context)
                                    };
                                    h.config.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, r), this.unsubscribe()) : (this.__tryOrUnsub(r), this.unsubscribe())
                                } else this.unsubscribe()
                            }
                        }, e.prototype.__tryOrUnsub = function(t, e) {
                            try {
                                t.call(this._context, e)
                            } catch (t) {
                                if (this.unsubscribe(), h.config.useDeprecatedSynchronousErrorHandling) throw t;
                                (0, u.hostReportError)(t)
                            }
                        }, e.prototype.__tryOrSetError = function(t, e, r) {
                            if (!h.config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                            try {
                                e.call(this._context, r)
                            } catch (e) {
                                return h.config.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = e, t.syncErrorThrown = !0, !0) : ((0, u.hostReportError)(e), !0)
                            }
                            return !1
                        }, e.prototype._unsubscribe = function() {
                            var t = this._parentSubscriber;
                            this._context = null, this._parentSubscriber = null, t.unsubscribe()
                        }, e
                    }(l)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    __assign: () => o,
                    __asyncDelegator: () => w,
                    __asyncGenerator: () => y,
                    __asyncValues: () => b,
                    __await: () => v,
                    __awaiter: () => l,
                    __classPrivateFieldGet: () => C,
                    __classPrivateFieldSet: () => B,
                    __decorate: () => a,
                    __exportStar: () => f,
                    __extends: () => n,
                    __generator: () => c,
                    __importDefault: () => A,
                    __importStar: () => E,
                    __makeTemplateObject: () => M,
                    __metadata: () => u,
                    __param: () => h,
                    __read: () => p,
                    __rest: () => s,
                    __spread: () => m,
                    __spreadArrays: () => g,
                    __values: () => d
                });
                var i = function(t, e) {
                    return i = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                    }, i(t, e)
                };

                function n(t, e) {
                    function r() {
                        this.constructor = t
                    }
                    i(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
                }
                var o = function() {
                    return o = Object.assign || function(t) {
                        for (var e, r = 1, i = arguments.length; r < i; r++)
                            for (var n in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        return t
                    }, o.apply(this, arguments)
                };

                function s(t, e) {
                    var r = {};
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (r[i] = t[i]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var n = 0;
                        for (i = Object.getOwnPropertySymbols(t); n < i.length; n++) e.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[n]) && (r[i[n]] = t[i[n]])
                    }
                    return r
                }

                function a(t, e, r, i) {
                    var n, o = arguments.length,
                        s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i);
                    else
                        for (var a = t.length - 1; a >= 0; a--)(n = t[a]) && (s = (o < 3 ? n(s) : o > 3 ? n(e, r, s) : n(e, r)) || s);
                    return o > 3 && s && Object.defineProperty(e, r, s), s
                }

                function h(t, e) {
                    return function(r, i) {
                        e(r, i, t)
                    }
                }

                function u(t, e) {
                    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e)
                }

                function l(t, e, r, i) {
                    return new(r || (r = Promise))((function(n, o) {
                        function s(t) {
                            try {
                                h(i.next(t))
                            } catch (t) {
                                o(t)
                            }
                        }

                        function a(t) {
                            try {
                                h(i.throw(t))
                            } catch (t) {
                                o(t)
                            }
                        }

                        function h(t) {
                            var e;
                            t.done ? n(t.value) : (e = t.value, e instanceof r ? e : new r((function(t) {
                                t(e)
                            }))).then(s, a)
                        }
                        h((i = i.apply(t, e || [])).next())
                    }))
                }

                function c(t, e) {
                    var r, i, n, o, s = {
                        label: 0,
                        sent: function() {
                            if (1 & n[0]) throw n[1];
                            return n[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return o = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                        return this
                    }), o;

                    function a(o) {
                        return function(a) {
                            return function(o) {
                                if (r) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                                    switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                                        case 0:
                                        case 1:
                                            n = o;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: o[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, i = o[1], o = [0];
                                            continue;
                                        case 7:
                                            o = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!((n = (n = s.trys).length > 0 && n[n.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                                                s.label = o[1];
                                                break
                                            }
                                            if (6 === o[0] && s.label < n[1]) {
                                                s.label = n[1], n = o;
                                                break
                                            }
                                            if (n && s.label < n[2]) {
                                                s.label = n[2], s.ops.push(o);
                                                break
                                            }
                                            n[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    o = e.call(t, s)
                                } catch (t) {
                                    o = [6, t], i = 0
                                } finally {
                                    r = n = 0
                                }
                                if (5 & o[0]) throw o[1];
                                return {
                                    value: o[0] ? o[1] : void 0,
                                    done: !0
                                }
                            }([o, a])
                        }
                    }
                }

                function f(t, e) {
                    for (var r in t) e.hasOwnProperty(r) || (e[r] = t[r])
                }

                function d(t) {
                    var e = "function" == typeof Symbol && Symbol.iterator,
                        r = e && t[e],
                        i = 0;
                    if (r) return r.call(t);
                    if (t && "number" == typeof t.length) return {
                        next: function() {
                            return t && i >= t.length && (t = void 0), {
                                value: t && t[i++],
                                done: !t
                            }
                        }
                    };
                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }

                function p(t, e) {
                    var r = "function" == typeof Symbol && t[Symbol.iterator];
                    if (!r) return t;
                    var i, n, o = r.call(t),
                        s = [];
                    try {
                        for (;
                            (void 0 === e || e-- > 0) && !(i = o.next()).done;) s.push(i.value)
                    } catch (t) {
                        n = {
                            error: t
                        }
                    } finally {
                        try {
                            i && !i.done && (r = o.return) && r.call(o)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                    return s
                }

                function m() {
                    for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(p(arguments[e]));
                    return t
                }

                function g() {
                    for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
                    var i = Array(t),
                        n = 0;
                    for (e = 0; e < r; e++)
                        for (var o = arguments[e], s = 0, a = o.length; s < a; s++, n++) i[n] = o[s];
                    return i
                }

                function v(t) {
                    return this instanceof v ? (this.v = t, this) : new v(t)
                }

                function y(t, e, r) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var i, n = r.apply(t, e || []),
                        o = [];
                    return i = {}, s("next"), s("throw"), s("return"), i[Symbol.asyncIterator] = function() {
                        return this
                    }, i;

                    function s(t) {
                        n[t] && (i[t] = function(e) {
                            return new Promise((function(r, i) {
                                o.push([t, e, r, i]) > 1 || a(t, e)
                            }))
                        })
                    }

                    function a(t, e) {
                        try {
                            (r = n[t](e)).value instanceof v ? Promise.resolve(r.value.v).then(h, u) : l(o[0][2], r)
                        } catch (t) {
                            l(o[0][3], t)
                        }
                        var r
                    }

                    function h(t) {
                        a("next", t)
                    }

                    function u(t) {
                        a("throw", t)
                    }

                    function l(t, e) {
                        t(e), o.shift(), o.length && a(o[0][0], o[0][1])
                    }
                }

                function w(t) {
                    var e, r;
                    return e = {}, i("next"), i("throw", (function(t) {
                        throw t
                    })), i("return"), e[Symbol.iterator] = function() {
                        return this
                    }, e;

                    function i(i, n) {
                        e[i] = t[i] ? function(e) {
                            return (r = !r) ? {
                                value: v(t[i](e)),
                                done: "return" === i
                            } : n ? n(e) : e
                        } : n
                    }
                }

                function b(t) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var e, r = t[Symbol.asyncIterator];
                    return r ? r.call(t) : (t = d(t), e = {}, i("next"), i("throw"), i("return"), e[Symbol.asyncIterator] = function() {
                        return this
                    }, e);

                    function i(r) {
                        e[r] = t[r] && function(e) {
                            return new Promise((function(i, n) {
                                ! function(t, e, r, i) {
                                    Promise.resolve(i).then((function(e) {
                                        t({
                                            value: e,
                                            done: r
                                        })
                                    }), e)
                                }(i, n, (e = t[r](e)).done, e.value)
                            }))
                        }
                    }
                }

                function M(t, e) {
                    return Object.defineProperty ? Object.defineProperty(t, "raw", {
                        value: e
                    }) : t.raw = e, t
                }

                function E(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t, e
                }

                function A(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }

                function C(t, e) {
                    if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
                    return e.get(t)
                }

                function B(t, e, r) {
                    if (!e.has(t)) throw new TypeError("attempted to set private field on non-instance");
                    return e.set(t, r), r
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    empty: () => o
                });
                var i = r(112),
                    n = r(113),
                    o = {
                        closed: !0,
                        next: function(t) {},
                        error: function(t) {
                            if (i.config.useDeprecatedSynchronousErrorHandling) throw t;
                            (0, n.hostReportError)(t)
                        },
                        complete: function() {}
                    }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    config: () => n
                });
                var i = !1,
                    n = {
                        Promise: void 0,
                        set useDeprecatedSynchronousErrorHandling(t) {
                            t && (new Error).stack, i = t
                        },
                        get useDeprecatedSynchronousErrorHandling() {
                            return i
                        }
                    }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    setTimeout((function() {
                        throw t
                    }), 0)
                }
                r.r(e), r.d(e, {
                    hostReportError: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    $$rxSubscriber: () => n,
                    rxSubscriber: () => i
                });
                var i = function() {
                        return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
                    }(),
                    n = i
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Subscription: () => a
                });
                var i = r(118),
                    n = r(119),
                    o = r(116),
                    s = r(117),
                    a = function() {
                        function t(t) {
                            this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
                        }
                        var e;
                        return t.prototype.unsubscribe = function() {
                            var e;
                            if (!this.closed) {
                                var r = this,
                                    a = r._parentOrParents,
                                    u = r._ctorUnsubscribe,
                                    l = r._unsubscribe,
                                    c = r._subscriptions;
                                if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, a instanceof t) a.remove(this);
                                else if (null !== a)
                                    for (var f = 0; f < a.length; ++f) a[f].remove(this);
                                if ((0, o.isFunction)(l)) {
                                    u && (this._unsubscribe = void 0);
                                    try {
                                        l.call(this)
                                    } catch (t) {
                                        e = t instanceof s.UnsubscriptionError ? h(t.errors) : [t]
                                    }
                                }
                                if ((0, i.isArray)(c)) {
                                    f = -1;
                                    for (var d = c.length; ++f < d;) {
                                        var p = c[f];
                                        if ((0, n.isObject)(p)) try {
                                            p.unsubscribe()
                                        } catch (t) {
                                            e = e || [], t instanceof s.UnsubscriptionError ? e = e.concat(h(t.errors)) : e.push(t)
                                        }
                                    }
                                }
                                if (e) throw new s.UnsubscriptionError(e)
                            }
                        }, t.prototype.add = function(e) {
                            var r = e;
                            if (!e) return t.EMPTY;
                            switch (typeof e) {
                                case "function":
                                    r = new t(e);
                                case "object":
                                    if (r === this || r.closed || "function" != typeof r.unsubscribe) return r;
                                    if (this.closed) return r.unsubscribe(), r;
                                    if (!(r instanceof t)) {
                                        var i = r;
                                        (r = new t)._subscriptions = [i]
                                    }
                                    break;
                                default:
                                    throw new Error("unrecognized teardown " + e + " added to Subscription.")
                            }
                            var n = r._parentOrParents;
                            if (null === n) r._parentOrParents = this;
                            else if (n instanceof t) {
                                if (n === this) return r;
                                r._parentOrParents = [n, this]
                            } else {
                                if (-1 !== n.indexOf(this)) return r;
                                n.push(this)
                            }
                            var o = this._subscriptions;
                            return null === o ? this._subscriptions = [r] : o.push(r), r
                        }, t.prototype.remove = function(t) {
                            var e = this._subscriptions;
                            if (e) {
                                var r = e.indexOf(t); - 1 !== r && e.splice(r, 1)
                            }
                        }, t.EMPTY = ((e = new t).closed = !0, e), t
                    }();

                function h(t) {
                    return t.reduce((function(t, e) {
                        return t.concat(e instanceof s.UnsubscriptionError ? e.errors : e)
                    }), [])
                }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    return "function" == typeof t
                }
                r.r(e), r.d(e, {
                    isFunction: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    UnsubscriptionError: () => i
                });
                var i = function() {
                    function t(t) {
                        return Error.call(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(t, e) {
                            return e + 1 + ") " + t.toString()
                        })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t, this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isArray: () => i
                });
                var i = function() {
                    return Array.isArray || function(t) {
                        return t && "number" == typeof t.length
                    }
                }()
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    return null !== t && "object" == typeof t
                }
                r.r(e), r.d(e, {
                    isObject: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    canReportError: () => n
                });
                var i = r(109);

                function n(t) {
                    for (; t;) {
                        var e = t,
                            r = e.closed,
                            n = e.destination,
                            o = e.isStopped;
                        if (r || o) return !1;
                        t = n && n instanceof i.Subscriber ? n : null
                    }
                    return !0
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    observable: () => i
                });
                var i = function() {
                    return "function" == typeof Symbol && Symbol.observable || "@@observable"
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    pipe: () => n,
                    pipeFromArray: () => o
                });
                var i = r(123);

                function n() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    return o(t)
                }

                function o(t) {
                    return 0 === t.length ? i.identity : 1 === t.length ? t[0] : function(e) {
                        return t.reduce((function(t, e) {
                            return e(t)
                        }), e)
                    }
                }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    return t
                }
                r.r(e), r.d(e, {
                    identity: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ConnectableObservable: () => u,
                    connectableObservableDescriptor: () => l
                });
                var i = r(110),
                    n = r(126),
                    o = r(107),
                    s = r(109),
                    a = r(115),
                    h = r(125),
                    u = function(t) {
                        function e(e, r) {
                            var i = t.call(this) || this;
                            return i.source = e, i.subjectFactory = r, i._refCount = 0, i._isComplete = !1, i
                        }
                        return i.__extends(e, t), e.prototype._subscribe = function(t) {
                            return this.getSubject().subscribe(t)
                        }, e.prototype.getSubject = function() {
                            var t = this._subject;
                            return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
                        }, e.prototype.connect = function() {
                            var t = this._connection;
                            return t || (this._isComplete = !1, (t = this._connection = new a.Subscription).add(this.source.subscribe(new c(this.getSubject(), this))), t.closed && (this._connection = null, t = a.Subscription.EMPTY)), t
                        }, e.prototype.refCount = function() {
                            return (0, h.refCount)()(this)
                        }, e
                    }(o.Observable),
                    l = function() {
                        var t = u.prototype;
                        return {
                            operator: {
                                value: null
                            },
                            _refCount: {
                                value: 0,
                                writable: !0
                            },
                            _subject: {
                                value: null,
                                writable: !0
                            },
                            _connection: {
                                value: null,
                                writable: !0
                            },
                            _subscribe: {
                                value: t._subscribe
                            },
                            _isComplete: {
                                value: t._isComplete,
                                writable: !0
                            },
                            getSubject: {
                                value: t.getSubject
                            },
                            connect: {
                                value: t.connect
                            },
                            refCount: {
                                value: t.refCount
                            }
                        }
                    }(),
                    c = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.connectable = r, i
                        }
                        return i.__extends(e, t), e.prototype._error = function(e) {
                            this._unsubscribe(), t.prototype._error.call(this, e)
                        }, e.prototype._complete = function() {
                            this.connectable._isComplete = !0, this._unsubscribe(), t.prototype._complete.call(this)
                        }, e.prototype._unsubscribe = function() {
                            var t = this.connectable;
                            if (t) {
                                this.connectable = null;
                                var e = t._connection;
                                t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
                            }
                        }, e
                    }(n.SubjectSubscriber);
                s.Subscriber
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    refCount: () => o
                });
                var i = r(110),
                    n = r(109);

                function o() {
                    return function(t) {
                        return t.lift(new s(t))
                    }
                }
                var s = function() {
                        function t(t) {
                            this.connectable = t
                        }
                        return t.prototype.call = function(t, e) {
                            var r = this.connectable;
                            r._refCount++;
                            var i = new a(t, r),
                                n = e.subscribe(i);
                            return i.closed || (i.connection = r.connect()), n
                        }, t
                    }(),
                    a = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.connectable = r, i
                        }
                        return i.__extends(e, t), e.prototype._unsubscribe = function() {
                            var t = this.connectable;
                            if (t) {
                                this.connectable = null;
                                var e = t._refCount;
                                if (e <= 0) this.connection = null;
                                else if (t._refCount = e - 1, e > 1) this.connection = null;
                                else {
                                    var r = this.connection,
                                        i = t._connection;
                                    this.connection = null, !i || r && i !== r || i.unsubscribe()
                                }
                            } else this.connection = null
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AnonymousSubject: () => f,
                    Subject: () => c,
                    SubjectSubscriber: () => l
                });
                var i = r(110),
                    n = r(107),
                    o = r(109),
                    s = r(115),
                    a = r(127),
                    h = r(128),
                    u = r(114),
                    l = function(t) {
                        function e(e) {
                            var r = t.call(this, e) || this;
                            return r.destination = e, r
                        }
                        return i.__extends(e, t), e
                    }(o.Subscriber),
                    c = function(t) {
                        function e() {
                            var e = t.call(this) || this;
                            return e.observers = [], e.closed = !1, e.isStopped = !1, e.hasError = !1, e.thrownError = null, e
                        }
                        return i.__extends(e, t), e.prototype[u.rxSubscriber] = function() {
                            return new l(this)
                        }, e.prototype.lift = function(t) {
                            var e = new f(this, this);
                            return e.operator = t, e
                        }, e.prototype.next = function(t) {
                            if (this.closed) throw new a.ObjectUnsubscribedError;
                            if (!this.isStopped)
                                for (var e = this.observers, r = e.length, i = e.slice(), n = 0; n < r; n++) i[n].next(t)
                        }, e.prototype.error = function(t) {
                            if (this.closed) throw new a.ObjectUnsubscribedError;
                            this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                            for (var e = this.observers, r = e.length, i = e.slice(), n = 0; n < r; n++) i[n].error(t);
                            this.observers.length = 0
                        }, e.prototype.complete = function() {
                            if (this.closed) throw new a.ObjectUnsubscribedError;
                            this.isStopped = !0;
                            for (var t = this.observers, e = t.length, r = t.slice(), i = 0; i < e; i++) r[i].complete();
                            this.observers.length = 0
                        }, e.prototype.unsubscribe = function() {
                            this.isStopped = !0, this.closed = !0, this.observers = null
                        }, e.prototype._trySubscribe = function(e) {
                            if (this.closed) throw new a.ObjectUnsubscribedError;
                            return t.prototype._trySubscribe.call(this, e)
                        }, e.prototype._subscribe = function(t) {
                            if (this.closed) throw new a.ObjectUnsubscribedError;
                            return this.hasError ? (t.error(this.thrownError), s.Subscription.EMPTY) : this.isStopped ? (t.complete(), s.Subscription.EMPTY) : (this.observers.push(t), new h.SubjectSubscription(this, t))
                        }, e.prototype.asObservable = function() {
                            var t = new n.Observable;
                            return t.source = this, t
                        }, e.create = function(t, e) {
                            return new f(t, e)
                        }, e
                    }(n.Observable),
                    f = function(t) {
                        function e(e, r) {
                            var i = t.call(this) || this;
                            return i.destination = e, i.source = r, i
                        }
                        return i.__extends(e, t), e.prototype.next = function(t) {
                            var e = this.destination;
                            e && e.next && e.next(t)
                        }, e.prototype.error = function(t) {
                            var e = this.destination;
                            e && e.error && this.destination.error(t)
                        }, e.prototype.complete = function() {
                            var t = this.destination;
                            t && t.complete && this.destination.complete()
                        }, e.prototype._subscribe = function(t) {
                            return this.source ? this.source.subscribe(t) : s.Subscription.EMPTY
                        }, e
                    }(c)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ObjectUnsubscribedError: () => i
                });
                var i = function() {
                    function t() {
                        return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    SubjectSubscription: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r) {
                            var i = t.call(this) || this;
                            return i.subject = e, i.subscriber = r, i.closed = !1, i
                        }
                        return i.__extends(e, t), e.prototype.unsubscribe = function() {
                            if (!this.closed) {
                                this.closed = !0;
                                var t = this.subject,
                                    e = t.observers;
                                if (this.subject = null, e && 0 !== e.length && !t.isStopped && !t.closed) {
                                    var r = e.indexOf(this.subscriber); - 1 !== r && e.splice(r, 1)
                                }
                            }
                        }, e
                    }(r(115).Subscription)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    GroupedObservable: () => f,
                    groupBy: () => h
                });
                var i = r(110),
                    n = r(109),
                    o = r(115),
                    s = r(107),
                    a = r(126);

                function h(t, e, r, i) {
                    return function(n) {
                        return n.lift(new u(t, e, r, i))
                    }
                }
                var u = function() {
                        function t(t, e, r, i) {
                            this.keySelector = t, this.elementSelector = e, this.durationSelector = r, this.subjectSelector = i
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new l(t, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector))
                        }, t
                    }(),
                    l = function(t) {
                        function e(e, r, i, n, o) {
                            var s = t.call(this, e) || this;
                            return s.keySelector = r, s.elementSelector = i, s.durationSelector = n, s.subjectSelector = o, s.groups = null, s.attemptedToUnsubscribe = !1, s.count = 0, s
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            var e;
                            try {
                                e = this.keySelector(t)
                            } catch (t) {
                                return void this.error(t)
                            }
                            this._group(t, e)
                        }, e.prototype._group = function(t, e) {
                            var r = this.groups;
                            r || (r = this.groups = new Map);
                            var i, n = r.get(e);
                            if (this.elementSelector) try {
                                i = this.elementSelector(t)
                            } catch (t) {
                                this.error(t)
                            } else i = t;
                            if (!n) {
                                n = this.subjectSelector ? this.subjectSelector() : new a.Subject, r.set(e, n);
                                var o = new f(e, n, this);
                                if (this.destination.next(o), this.durationSelector) {
                                    var s = void 0;
                                    try {
                                        s = this.durationSelector(new f(e, n))
                                    } catch (t) {
                                        return void this.error(t)
                                    }
                                    this.add(s.subscribe(new c(e, n, this)))
                                }
                            }
                            n.closed || n.next(i)
                        }, e.prototype._error = function(t) {
                            var e = this.groups;
                            e && (e.forEach((function(e, r) {
                                e.error(t)
                            })), e.clear()), this.destination.error(t)
                        }, e.prototype._complete = function() {
                            var t = this.groups;
                            t && (t.forEach((function(t, e) {
                                t.complete()
                            })), t.clear()), this.destination.complete()
                        }, e.prototype.removeGroup = function(t) {
                            this.groups.delete(t)
                        }, e.prototype.unsubscribe = function() {
                            this.closed || (this.attemptedToUnsubscribe = !0, 0 === this.count && t.prototype.unsubscribe.call(this))
                        }, e
                    }(n.Subscriber),
                    c = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this, r) || this;
                            return n.key = e, n.group = r, n.parent = i, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.complete()
                        }, e.prototype._unsubscribe = function() {
                            var t = this.parent,
                                e = this.key;
                            this.key = this.parent = null, t && t.removeGroup(e)
                        }, e
                    }(n.Subscriber),
                    f = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this) || this;
                            return n.key = e, n.groupSubject = r, n.refCountSubscription = i, n
                        }
                        return i.__extends(e, t), e.prototype._subscribe = function(t) {
                            var e = new o.Subscription,
                                r = this.refCountSubscription,
                                i = this.groupSubject;
                            return r && !r.closed && e.add(new d(r)), e.add(i.subscribe(t)), e
                        }, e
                    }(s.Observable),
                    d = function(t) {
                        function e(e) {
                            var r = t.call(this) || this;
                            return r.parent = e, e.count++, r
                        }
                        return i.__extends(e, t), e.prototype.unsubscribe = function() {
                            var e = this.parent;
                            e.closed || this.closed || (t.prototype.unsubscribe.call(this), e.count -= 1, 0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe())
                        }, e
                    }(o.Subscription)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    BehaviorSubject: () => s
                });
                var i = r(110),
                    n = r(126),
                    o = r(127),
                    s = function(t) {
                        function e(e) {
                            var r = t.call(this) || this;
                            return r._value = e, r
                        }
                        return i.__extends(e, t), Object.defineProperty(e.prototype, "value", {
                            get: function() {
                                return this.getValue()
                            },
                            enumerable: !0,
                            configurable: !0
                        }), e.prototype._subscribe = function(e) {
                            var r = t.prototype._subscribe.call(this, e);
                            return r && !r.closed && e.next(this._value), r
                        }, e.prototype.getValue = function() {
                            if (this.hasError) throw this.thrownError;
                            if (this.closed) throw new o.ObjectUnsubscribedError;
                            return this._value
                        }, e.prototype.next = function(e) {
                            t.prototype.next.call(this, this._value = e)
                        }, e
                    }(n.Subject)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ReplaySubject: () => l
                });
                var i = r(110),
                    n = r(126),
                    o = r(141),
                    s = r(115),
                    a = r(132),
                    h = r(127),
                    u = r(128),
                    l = function(t) {
                        function e(e, r, i) {
                            void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === r && (r = Number.POSITIVE_INFINITY);
                            var n = t.call(this) || this;
                            return n.scheduler = i, n._events = [], n._infiniteTimeWindow = !1, n._bufferSize = e < 1 ? 1 : e, n._windowTime = r < 1 ? 1 : r, r === Number.POSITIVE_INFINITY ? (n._infiniteTimeWindow = !0, n.next = n.nextInfiniteTimeWindow) : n.next = n.nextTimeWindow, n
                        }
                        return i.__extends(e, t), e.prototype.nextInfiniteTimeWindow = function(e) {
                            if (!this.isStopped) {
                                var r = this._events;
                                r.push(e), r.length > this._bufferSize && r.shift()
                            }
                            t.prototype.next.call(this, e)
                        }, e.prototype.nextTimeWindow = function(e) {
                            this.isStopped || (this._events.push(new c(this._getNow(), e)), this._trimBufferThenGetEvents()), t.prototype.next.call(this, e)
                        }, e.prototype._subscribe = function(t) {
                            var e, r = this._infiniteTimeWindow,
                                i = r ? this._events : this._trimBufferThenGetEvents(),
                                n = this.scheduler,
                                o = i.length;
                            if (this.closed) throw new h.ObjectUnsubscribedError;
                            if (this.isStopped || this.hasError ? e = s.Subscription.EMPTY : (this.observers.push(t), e = new u.SubjectSubscription(this, t)), n && t.add(t = new a.ObserveOnSubscriber(t, n)), r)
                                for (var l = 0; l < o && !t.closed; l++) t.next(i[l]);
                            else
                                for (l = 0; l < o && !t.closed; l++) t.next(i[l].value);
                            return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), e
                        }, e.prototype._getNow = function() {
                            return (this.scheduler || o.queue).now()
                        }, e.prototype._trimBufferThenGetEvents = function() {
                            for (var t = this._getNow(), e = this._bufferSize, r = this._windowTime, i = this._events, n = i.length, o = 0; o < n && !(t - i[o].time < r);) o++;
                            return n > e && (o = Math.max(o, n - e)), o > 0 && i.splice(0, o), i
                        }, e
                    }(n.Subject),
                    c = function() {
                        return function(t, e) {
                            this.time = t, this.value = e
                        }
                    }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ObserveOnMessage: () => u,
                    ObserveOnOperator: () => a,
                    ObserveOnSubscriber: () => h,
                    observeOn: () => s
                });
                var i = r(110),
                    n = r(109),
                    o = r(133);

                function s(t, e) {
                    return void 0 === e && (e = 0),
                        function(r) {
                            return r.lift(new a(t, e))
                        }
                }
                var a = function() {
                        function t(t, e) {
                            void 0 === e && (e = 0), this.scheduler = t, this.delay = e
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new h(t, this.scheduler, this.delay))
                        }, t
                    }(),
                    h = function(t) {
                        function e(e, r, i) {
                            void 0 === i && (i = 0);
                            var n = t.call(this, e) || this;
                            return n.scheduler = r, n.delay = i, n
                        }
                        return i.__extends(e, t), e.dispatch = function(t) {
                            var e = t.notification,
                                r = t.destination;
                            e.observe(r), this.unsubscribe()
                        }, e.prototype.scheduleMessage = function(t) {
                            this.destination.add(this.scheduler.schedule(e.dispatch, this.delay, new u(t, this.destination)))
                        }, e.prototype._next = function(t) {
                            this.scheduleMessage(o.Notification.createNext(t))
                        }, e.prototype._error = function(t) {
                            this.scheduleMessage(o.Notification.createError(t)), this.unsubscribe()
                        }, e.prototype._complete = function() {
                            this.scheduleMessage(o.Notification.createComplete()), this.unsubscribe()
                        }, e
                    }(n.Subscriber),
                    u = function() {
                        return function(t, e) {
                            this.notification = t, this.destination = e
                        }
                    }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Notification: () => a,
                    NotificationKind: () => i
                });
                var i, n = r(140),
                    o = r(134),
                    s = r(139);
                i || (i = {});
                var a = function() {
                    function t(t, e, r) {
                        this.kind = t, this.value = e, this.error = r, this.hasValue = "N" === t
                    }
                    return t.prototype.observe = function(t) {
                        switch (this.kind) {
                            case "N":
                                return t.next && t.next(this.value);
                            case "E":
                                return t.error && t.error(this.error);
                            case "C":
                                return t.complete && t.complete()
                        }
                    }, t.prototype.do = function(t, e, r) {
                        switch (this.kind) {
                            case "N":
                                return t && t(this.value);
                            case "E":
                                return e && e(this.error);
                            case "C":
                                return r && r()
                        }
                    }, t.prototype.accept = function(t, e, r) {
                        return t && "function" == typeof t.next ? this.observe(t) : this.do(t, e, r)
                    }, t.prototype.toObservable = function() {
                        switch (this.kind) {
                            case "N":
                                return (0, o.of)(this.value);
                            case "E":
                                return (0, s.throwError)(this.error);
                            case "C":
                                return (0, n.empty)()
                        }
                        throw new Error("unexpected notification kind value")
                    }, t.createNext = function(e) {
                        return void 0 !== e ? new t("N", e) : t.undefinedValueNotification
                    }, t.createError = function(e) {
                        return new t("E", void 0, e)
                    }, t.createComplete = function() {
                        return t.completeNotification
                    }, t.completeNotification = new t("C"), t.undefinedValueNotification = new t("N", void 0), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { of: () => s
                });
                var i = r(135),
                    n = r(137),
                    o = r(136);

                function s() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var r = t[t.length - 1];
                    return (0, i.isScheduler)(r) ? (t.pop(), (0, o.scheduleArray)(t, r)) : (0, n.fromArray)(t)
                }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    return t && "function" == typeof t.schedule
                }
                r.r(e), r.d(e, {
                    isScheduler: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    scheduleArray: () => o
                });
                var i = r(107),
                    n = r(115);

                function o(t, e) {
                    return new i.Observable((function(r) {
                        var i = new n.Subscription,
                            o = 0;
                        return i.add(e.schedule((function() {
                            o !== t.length ? (r.next(t[o++]), r.closed || i.add(this.schedule())) : r.complete()
                        }))), i
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    fromArray: () => s
                });
                var i = r(107),
                    n = r(138),
                    o = r(136);

                function s(t, e) {
                    return e ? (0, o.scheduleArray)(t, e) : new i.Observable((0, n.subscribeToArray)(t))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeToArray: () => i
                });
                var i = function(t) {
                    return function(e) {
                        for (var r = 0, i = t.length; r < i && !e.closed; r++) e.next(t[r]);
                        e.complete()
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    throwError: () => n
                });
                var i = r(107);

                function n(t, e) {
                    return e ? new i.Observable((function(r) {
                        return e.schedule(o, 0, {
                            error: t,
                            subscriber: r
                        })
                    })) : new i.Observable((function(e) {
                        return e.error(t)
                    }))
                }

                function o(t) {
                    var e = t.error;
                    t.subscriber.error(e)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    EMPTY: () => n,
                    empty: () => o
                });
                var i = r(107),
                    n = new i.Observable((function(t) {
                        return t.complete()
                    }));

                function o(t) {
                    return t ? function(t) {
                        return new i.Observable((function(e) {
                            return t.schedule((function() {
                                return e.complete()
                            }))
                        }))
                    }(t) : n
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    queue: () => o,
                    queueScheduler: () => n
                });
                var i = r(145),
                    n = new(r(142).QueueScheduler)(i.QueueAction),
                    o = n
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    QueueScheduler: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e
                    }(r(143).AsyncScheduler)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AsyncScheduler: () => o
                });
                var i = r(110),
                    n = r(144),
                    o = function(t) {
                        function e(r, i) {
                            void 0 === i && (i = n.Scheduler.now);
                            var o = t.call(this, r, (function() {
                                return e.delegate && e.delegate !== o ? e.delegate.now() : i()
                            })) || this;
                            return o.actions = [], o.active = !1, o.scheduled = void 0, o
                        }
                        return i.__extends(e, t), e.prototype.schedule = function(r, i, n) {
                            return void 0 === i && (i = 0), e.delegate && e.delegate !== this ? e.delegate.schedule(r, i, n) : t.prototype.schedule.call(this, r, i, n)
                        }, e.prototype.flush = function(t) {
                            var e = this.actions;
                            if (this.active) e.push(t);
                            else {
                                var r;
                                this.active = !0;
                                do {
                                    if (r = t.execute(t.state, t.delay)) break
                                } while (t = e.shift());
                                if (this.active = !1, r) {
                                    for (; t = e.shift();) t.unsubscribe();
                                    throw r
                                }
                            }
                        }, e
                    }(n.Scheduler)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Scheduler: () => i
                });
                var i = function() {
                    function t(e, r) {
                        void 0 === r && (r = t.now), this.SchedulerAction = e, this.now = r
                    }
                    return t.prototype.schedule = function(t, e, r) {
                        return void 0 === e && (e = 0), new this.SchedulerAction(this, t).schedule(r, e)
                    }, t.now = function() {
                        return Date.now()
                    }, t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    QueueAction: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e, r) || this;
                            return i.scheduler = e, i.work = r, i
                        }
                        return i.__extends(e, t), e.prototype.schedule = function(e, r) {
                            return void 0 === r && (r = 0), r > 0 ? t.prototype.schedule.call(this, e, r) : (this.delay = r, this.state = e, this.scheduler.flush(this), this)
                        }, e.prototype.execute = function(e, r) {
                            return r > 0 || this.closed ? t.prototype.execute.call(this, e, r) : this._execute(e, r)
                        }, e.prototype.requestAsyncId = function(e, r, i) {
                            return void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0 ? t.prototype.requestAsyncId.call(this, e, r, i) : e.flush(this)
                        }, e
                    }(r(146).AsyncAction)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AsyncAction: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e, r) || this;
                            return i.scheduler = e, i.work = r, i.pending = !1, i
                        }
                        return i.__extends(e, t), e.prototype.schedule = function(t, e) {
                            if (void 0 === e && (e = 0), this.closed) return this;
                            this.state = t;
                            var r = this.id,
                                i = this.scheduler;
                            return null != r && (this.id = this.recycleAsyncId(i, r, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(i, this.id, e), this
                        }, e.prototype.requestAsyncId = function(t, e, r) {
                            return void 0 === r && (r = 0), setInterval(t.flush.bind(t, this), r)
                        }, e.prototype.recycleAsyncId = function(t, e, r) {
                            if (void 0 === r && (r = 0), null !== r && this.delay === r && !1 === this.pending) return e;
                            clearInterval(e)
                        }, e.prototype.execute = function(t, e) {
                            if (this.closed) return new Error("executing a cancelled action");
                            this.pending = !1;
                            var r = this._execute(t, e);
                            if (r) return r;
                            !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                        }, e.prototype._execute = function(t, e) {
                            var r = !1,
                                i = void 0;
                            try {
                                this.work(t)
                            } catch (t) {
                                r = !0, i = !!t && t || new Error(t)
                            }
                            if (r) return this.unsubscribe(), i
                        }, e.prototype._unsubscribe = function() {
                            var t = this.id,
                                e = this.scheduler,
                                r = e.actions,
                                i = r.indexOf(this);
                            this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== i && r.splice(i, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
                        }, e
                    }(r(147).Action)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Action: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r) {
                            return t.call(this) || this
                        }
                        return i.__extends(e, t), e.prototype.schedule = function(t, e) {
                            return void 0 === e && (e = 0), this
                        }, e
                    }(r(115).Subscription)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AsyncSubject: () => s
                });
                var i = r(110),
                    n = r(126),
                    o = r(115),
                    s = function(t) {
                        function e() {
                            var e = null !== t && t.apply(this, arguments) || this;
                            return e.value = null, e.hasNext = !1, e.hasCompleted = !1, e
                        }
                        return i.__extends(e, t), e.prototype._subscribe = function(e) {
                            return this.hasError ? (e.error(this.thrownError), o.Subscription.EMPTY) : this.hasCompleted && this.hasNext ? (e.next(this.value), e.complete(), o.Subscription.EMPTY) : t.prototype._subscribe.call(this, e)
                        }, e.prototype.next = function(t) {
                            this.hasCompleted || (this.value = t, this.hasNext = !0)
                        }, e.prototype.error = function(e) {
                            this.hasCompleted || t.prototype.error.call(this, e)
                        }, e.prototype.complete = function() {
                            this.hasCompleted = !0, this.hasNext && t.prototype.next.call(this, this.value), t.prototype.complete.call(this)
                        }, e
                    }(n.Subject)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    asap: () => o,
                    asapScheduler: () => n
                });
                var i = r(151),
                    n = new(r(150).AsapScheduler)(i.AsapAction),
                    o = n
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AsapScheduler: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype.flush = function(t) {
                            this.active = !0, this.scheduled = void 0;
                            var e, r = this.actions,
                                i = -1,
                                n = r.length;
                            t = t || r.shift();
                            do {
                                if (e = t.execute(t.state, t.delay)) break
                            } while (++i < n && (t = r.shift()));
                            if (this.active = !1, e) {
                                for (; ++i < n && (t = r.shift());) t.unsubscribe();
                                throw e
                            }
                        }, e
                    }(r(143).AsyncScheduler)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AsapAction: () => o
                });
                var i = r(110),
                    n = r(152),
                    o = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e, r) || this;
                            return i.scheduler = e, i.work = r, i
                        }
                        return i.__extends(e, t), e.prototype.requestAsyncId = function(e, r, i) {
                            return void 0 === i && (i = 0), null !== i && i > 0 ? t.prototype.requestAsyncId.call(this, e, r, i) : (e.actions.push(this), e.scheduled || (e.scheduled = n.Immediate.setImmediate(e.flush.bind(e, null))))
                        }, e.prototype.recycleAsyncId = function(e, r, i) {
                            if (void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, r, i);
                            0 === e.actions.length && (n.Immediate.clearImmediate(r), e.scheduled = void 0)
                        }, e
                    }(r(146).AsyncAction)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    Immediate: () => a,
                    TestTools: () => h
                });
                var i = 1,
                    n = function() {
                        return Promise.resolve()
                    }(),
                    o = {};

                function s(t) {
                    return t in o && (delete o[t], !0)
                }
                var a = {
                        setImmediate: function(t) {
                            var e = i++;
                            return o[e] = !0, n.then((function() {
                                return s(e) && t()
                            })), e
                        },
                        clearImmediate: function(t) {
                            s(t)
                        }
                    },
                    h = {
                        pending: function() {
                            return Object.keys(o).length
                        }
                    }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    async: () => o,
                    asyncScheduler: () => n
                });
                var i = r(146),
                    n = new(r(143).AsyncScheduler)(i.AsyncAction),
                    o = n
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    animationFrame: () => o,
                    animationFrameScheduler: () => n
                });
                var i = r(156),
                    n = new(r(155).AnimationFrameScheduler)(i.AnimationFrameAction),
                    o = n
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AnimationFrameScheduler: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype.flush = function(t) {
                            this.active = !0, this.scheduled = void 0;
                            var e, r = this.actions,
                                i = -1,
                                n = r.length;
                            t = t || r.shift();
                            do {
                                if (e = t.execute(t.state, t.delay)) break
                            } while (++i < n && (t = r.shift()));
                            if (this.active = !1, e) {
                                for (; ++i < n && (t = r.shift());) t.unsubscribe();
                                throw e
                            }
                        }, e
                    }(r(143).AsyncScheduler)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    AnimationFrameAction: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e, r) || this;
                            return i.scheduler = e, i.work = r, i
                        }
                        return i.__extends(e, t), e.prototype.requestAsyncId = function(e, r, i) {
                            return void 0 === i && (i = 0), null !== i && i > 0 ? t.prototype.requestAsyncId.call(this, e, r, i) : (e.actions.push(this), e.scheduled || (e.scheduled = requestAnimationFrame((function() {
                                return e.flush(null)
                            }))))
                        }, e.prototype.recycleAsyncId = function(e, r, i) {
                            if (void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, r, i);
                            0 === e.actions.length && (cancelAnimationFrame(r), e.scheduled = void 0)
                        }, e
                    }(r(146).AsyncAction)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    VirtualAction: () => s,
                    VirtualTimeScheduler: () => o
                });
                var i = r(110),
                    n = r(146),
                    o = function(t) {
                        function e(e, r) {
                            void 0 === e && (e = s), void 0 === r && (r = Number.POSITIVE_INFINITY);
                            var i = t.call(this, e, (function() {
                                return i.frame
                            })) || this;
                            return i.maxFrames = r, i.frame = 0, i.index = -1, i
                        }
                        return i.__extends(e, t), e.prototype.flush = function() {
                            for (var t, e, r = this.actions, i = this.maxFrames;
                                (e = r[0]) && e.delay <= i && (r.shift(), this.frame = e.delay, !(t = e.execute(e.state, e.delay))););
                            if (t) {
                                for (; e = r.shift();) e.unsubscribe();
                                throw t
                            }
                        }, e.frameTimeFactor = 10, e
                    }(r(143).AsyncScheduler),
                    s = function(t) {
                        function e(e, r, i) {
                            void 0 === i && (i = e.index += 1);
                            var n = t.call(this, e, r) || this;
                            return n.scheduler = e, n.work = r, n.index = i, n.active = !0, n.index = e.index = i, n
                        }
                        return i.__extends(e, t), e.prototype.schedule = function(r, i) {
                            if (void 0 === i && (i = 0), !this.id) return t.prototype.schedule.call(this, r, i);
                            this.active = !1;
                            var n = new e(this.scheduler, this.work);
                            return this.add(n), n.schedule(r, i)
                        }, e.prototype.requestAsyncId = function(t, r, i) {
                            void 0 === i && (i = 0), this.delay = t.frame + i;
                            var n = t.actions;
                            return n.push(this), n.sort(e.sortActions), !0
                        }, e.prototype.recycleAsyncId = function(t, e, r) {
                            void 0 === r && (r = 0)
                        }, e.prototype._execute = function(e, r) {
                            if (!0 === this.active) return t.prototype._execute.call(this, e, r)
                        }, e.sortActions = function(t, e) {
                            return t.delay === e.delay ? t.index === e.index ? 0 : t.index > e.index ? 1 : -1 : t.delay > e.delay ? 1 : -1
                        }, e
                    }(n.AsyncAction)
            }, (t, e, r) => {
                "use strict";

                function i() {}
                r.r(e), r.d(e, {
                    noop: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isObservable: () => n
                });
                var i = r(107);

                function n(t) {
                    return !!t && (t instanceof i.Observable || "function" == typeof t.lift && "function" == typeof t.subscribe)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ArgumentOutOfRangeError: () => i
                });
                var i = function() {
                    function t() {
                        return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    EmptyError: () => i
                });
                var i = function() {
                    function t() {
                        return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    TimeoutError: () => i
                });
                var i = function() {
                    function t() {
                        return Error.call(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    bindCallback: () => u
                });
                var i = r(107),
                    n = r(148),
                    o = r(164),
                    s = r(120),
                    a = r(118),
                    h = r(135);

                function u(t, e, r) {
                    if (e) {
                        if (!(0, h.isScheduler)(e)) return function() {
                            for (var i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                            return u(t, r).apply(void 0, i).pipe((0, o.map)((function(t) {
                                return (0, a.isArray)(t) ? e.apply(void 0, t) : e(t)
                            })))
                        };
                        r = e
                    }
                    return function() {
                        for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
                        var a, h = this,
                            u = {
                                context: h,
                                subject: a,
                                callbackFunc: t,
                                scheduler: r
                            };
                        return new i.Observable((function(i) {
                            if (r) {
                                var o = {
                                    args: e,
                                    subscriber: i,
                                    params: u
                                };
                                return r.schedule(l, 0, o)
                            }
                            if (!a) {
                                a = new n.AsyncSubject;
                                try {
                                    t.apply(h, e.concat([function() {
                                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                        a.next(t.length <= 1 ? t[0] : t), a.complete()
                                    }]))
                                } catch (t) {
                                    (0, s.canReportError)(a) ? a.error(t): console.warn(t)
                                }
                            }
                            return a.subscribe(i)
                        }))
                    }
                }

                function l(t) {
                    var e = this,
                        r = t.args,
                        i = t.subscriber,
                        o = t.params,
                        s = o.callbackFunc,
                        a = o.context,
                        h = o.scheduler,
                        u = o.subject;
                    if (!u) {
                        u = o.subject = new n.AsyncSubject;
                        try {
                            s.apply(a, r.concat([function() {
                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                var i = t.length <= 1 ? t[0] : t;
                                e.add(h.schedule(c, 0, {
                                    value: i,
                                    subject: u
                                }))
                            }]))
                        } catch (t) {
                            u.error(t)
                        }
                    }
                    this.add(u.subscribe(i))
                }

                function c(t) {
                    var e = t.value,
                        r = t.subject;
                    r.next(e), r.complete()
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    MapOperator: () => s,
                    map: () => o
                });
                var i = r(110),
                    n = r(109);

                function o(t, e) {
                    return function(r) {
                        if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                        return r.lift(new s(t, e))
                    }
                }
                var s = function() {
                        function t(t, e) {
                            this.project = t, this.thisArg = e
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new a(t, this.project, this.thisArg))
                        }, t
                    }(),
                    a = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this, e) || this;
                            return n.project = r, n.count = 0, n.thisArg = i || n, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            var e;
                            try {
                                e = this.project.call(this.thisArg, t, this.count++)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.destination.next(e)
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    bindNodeCallback: () => u
                });
                var i = r(107),
                    n = r(148),
                    o = r(164),
                    s = r(120),
                    a = r(135),
                    h = r(118);

                function u(t, e, r) {
                    if (e) {
                        if (!(0, a.isScheduler)(e)) return function() {
                            for (var i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                            return u(t, r).apply(void 0, i).pipe((0, o.map)((function(t) {
                                return (0, h.isArray)(t) ? e.apply(void 0, t) : e(t)
                            })))
                        };
                        r = e
                    }
                    return function() {
                        for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
                        var a = {
                            subject: void 0,
                            args: e,
                            callbackFunc: t,
                            scheduler: r,
                            context: this
                        };
                        return new i.Observable((function(i) {
                            var o = a.context,
                                h = a.subject;
                            if (r) return r.schedule(l, 0, {
                                params: a,
                                subscriber: i,
                                context: o
                            });
                            if (!h) {
                                h = a.subject = new n.AsyncSubject;
                                try {
                                    t.apply(o, e.concat([function() {
                                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                        var r = t.shift();
                                        r ? h.error(r) : (h.next(t.length <= 1 ? t[0] : t), h.complete())
                                    }]))
                                } catch (t) {
                                    (0, s.canReportError)(h) ? h.error(t): console.warn(t)
                                }
                            }
                            return h.subscribe(i)
                        }))
                    }
                }

                function l(t) {
                    var e = this,
                        r = t.params,
                        i = t.subscriber,
                        o = t.context,
                        s = r.callbackFunc,
                        a = r.args,
                        h = r.scheduler,
                        u = r.subject;
                    if (!u) {
                        u = r.subject = new n.AsyncSubject;
                        try {
                            s.apply(o, a.concat([function() {
                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                var i = t.shift();
                                if (i) e.add(h.schedule(f, 0, {
                                    err: i,
                                    subject: u
                                }));
                                else {
                                    var n = t.length <= 1 ? t[0] : t;
                                    e.add(h.schedule(c, 0, {
                                        value: n,
                                        subject: u
                                    }))
                                }
                            }]))
                        } catch (t) {
                            this.add(h.schedule(f, 0, {
                                err: t,
                                subject: u
                            }))
                        }
                    }
                    this.add(u.subscribe(i))
                }

                function c(t) {
                    var e = t.value,
                        r = t.subject;
                    r.next(e), r.complete()
                }

                function f(t) {
                    var e = t.err;
                    t.subject.error(e)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    CombineLatestOperator: () => c,
                    CombineLatestSubscriber: () => f,
                    combineLatest: () => l
                });
                var i = r(110),
                    n = r(135),
                    o = r(118),
                    s = r(176),
                    a = r(167),
                    h = r(137),
                    u = {};

                function l() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var r = void 0,
                        i = void 0;
                    return (0, n.isScheduler)(t[t.length - 1]) && (i = t.pop()), "function" == typeof t[t.length - 1] && (r = t.pop()), 1 === t.length && (0, o.isArray)(t[0]) && (t = t[0]), (0, h.fromArray)(t, i).lift(new c(r))
                }
                var c = function() {
                        function t(t) {
                            this.resultSelector = t
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new f(t, this.resultSelector))
                        }, t
                    }(),
                    f = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.resultSelector = r, i.active = 0, i.values = [], i.observables = [], i
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.values.push(u), this.observables.push(t)
                        }, e.prototype._complete = function() {
                            var t = this.observables,
                                e = t.length;
                            if (0 === e) this.destination.complete();
                            else {
                                this.active = e, this.toRespond = e;
                                for (var r = 0; r < e; r++) {
                                    var i = t[r];
                                    this.add((0, a.subscribeToResult)(this, i, void 0, r))
                                }
                            }
                        }, e.prototype.notifyComplete = function(t) {
                            0 == (this.active -= 1) && this.destination.complete()
                        }, e.prototype.notifyNext = function(t, e, r) {
                            var i = this.values,
                                n = i[r],
                                o = this.toRespond ? n === u ? --this.toRespond : this.toRespond : 0;
                            i[r] = e, 0 === o && (this.resultSelector ? this._tryResultSelector(i) : this.destination.next(i.slice()))
                        }, e.prototype._tryResultSelector = function(t) {
                            var e;
                            try {
                                e = this.resultSelector.apply(this, t)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.destination.next(e)
                        }, e
                    }(s.OuterSubscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeToResult: () => s
                });
                var i = r(168),
                    n = r(169),
                    o = r(107);

                function s(t, e, r, s, a) {
                    if (void 0 === a && (a = new i.InnerSubscriber(t, r, s)), !a.closed) return e instanceof o.Observable ? e.subscribe(a) : (0, n.subscribeTo)(e)(a)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    InnerSubscriber: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this) || this;
                            return n.parent = e, n.outerValue = r, n.outerIndex = i, n.index = 0, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
                        }, e.prototype._error = function(t) {
                            this.parent.notifyError(t, this), this.unsubscribe()
                        }, e.prototype._complete = function() {
                            this.parent.notifyComplete(this), this.unsubscribe()
                        }, e
                    }(r(109).Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeTo: () => f
                });
                var i = r(138),
                    n = r(173),
                    o = r(175),
                    s = r(170),
                    a = r(171),
                    h = r(172),
                    u = r(119),
                    l = r(174),
                    c = r(121),
                    f = function(t) {
                        if (t && "function" == typeof t[c.observable]) return (0, s.subscribeToObservable)(t);
                        if ((0, a.isArrayLike)(t)) return (0, i.subscribeToArray)(t);
                        if ((0, h.isPromise)(t)) return (0, n.subscribeToPromise)(t);
                        if (t && "function" == typeof t[l.iterator]) return (0, o.subscribeToIterable)(t);
                        var e = (0, u.isObject)(t) ? "an invalid object" : "'" + t + "'";
                        throw new TypeError("You provided " + e + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")
                    }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeToObservable: () => n
                });
                var i = r(121),
                    n = function(t) {
                        return function(e) {
                            var r = t[i.observable]();
                            if ("function" != typeof r.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                            return r.subscribe(e)
                        }
                    }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isArrayLike: () => i
                });
                var i = function(t) {
                    return t && "number" == typeof t.length && "function" != typeof t
                }
            }, (t, e, r) => {
                "use strict";

                function i(t) {
                    return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
                }
                r.r(e), r.d(e, {
                    isPromise: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeToPromise: () => n
                });
                var i = r(113),
                    n = function(t) {
                        return function(e) {
                            return t.then((function(t) {
                                e.closed || (e.next(t), e.complete())
                            }), (function(t) {
                                return e.error(t)
                            })).then(null, i.hostReportError), e
                        }
                    }
            }, (t, e, r) => {
                "use strict";

                function i() {
                    return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
                }
                r.r(e), r.d(e, {
                    $$iterator: () => o,
                    getSymbolIterator: () => i,
                    iterator: () => n
                });
                var n = i(),
                    o = n
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    subscribeToIterable: () => n
                });
                var i = r(174),
                    n = function(t) {
                        return function(e) {
                            for (var r = t[i.iterator]();;) {
                                var n = void 0;
                                try {
                                    n = r.next()
                                } catch (t) {
                                    return e.error(t), e
                                }
                                if (n.done) {
                                    e.complete();
                                    break
                                }
                                if (e.next(n.value), e.closed) break
                            }
                            return "function" == typeof r.return && e.add((function() {
                                r.return && r.return()
                            })), e
                        }
                    }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    OuterSubscriber: () => n
                });
                var i = r(110),
                    n = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype.notifyNext = function(t, e, r, i, n) {
                            this.destination.next(e)
                        }, e.prototype.notifyError = function(t, e) {
                            this.destination.error(t)
                        }, e.prototype.notifyComplete = function(t) {
                            this.destination.complete()
                        }, e
                    }(r(109).Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    concat: () => o
                });
                var i = r(134),
                    n = r(178);

                function o() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    return (0, n.concatAll)()(i.of.apply(void 0, t))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    concatAll: () => n
                });
                var i = r(179);

                function n() {
                    return (0, i.mergeAll)(1)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    mergeAll: () => o
                });
                var i = r(180),
                    n = r(123);

                function o(t) {
                    return void 0 === t && (t = Number.POSITIVE_INFINITY), (0, i.mergeMap)(n.identity, t)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    MergeMapOperator: () => h,
                    MergeMapSubscriber: () => u,
                    flatMap: () => l,
                    mergeMap: () => a
                });
                var i = r(110),
                    n = r(164),
                    o = r(181),
                    s = r(188);

                function a(t, e, r) {
                    return void 0 === r && (r = Number.POSITIVE_INFINITY), "function" == typeof e ? function(i) {
                        return i.pipe(a((function(r, i) {
                            return (0, o.from)(t(r, i)).pipe((0, n.map)((function(t, n) {
                                return e(r, t, i, n)
                            })))
                        }), r))
                    } : ("number" == typeof e && (r = e), function(e) {
                        return e.lift(new h(t, r))
                    })
                }
                var h = function() {
                        function t(t, e) {
                            void 0 === e && (e = Number.POSITIVE_INFINITY), this.project = t, this.concurrent = e
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new u(t, this.project, this.concurrent))
                        }, t
                    }(),
                    u = function(t) {
                        function e(e, r, i) {
                            void 0 === i && (i = Number.POSITIVE_INFINITY);
                            var n = t.call(this, e) || this;
                            return n.project = r, n.concurrent = i, n.hasCompleted = !1, n.buffer = [], n.active = 0, n.index = 0, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
                        }, e.prototype._tryNext = function(t) {
                            var e, r = this.index++;
                            try {
                                e = this.project(t, r)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.active++, this._innerSub(e)
                        }, e.prototype._innerSub = function(t) {
                            var e = new s.SimpleInnerSubscriber(this),
                                r = this.destination;
                            r.add(e);
                            var i = (0, s.innerSubscribe)(t, e);
                            i !== e && r.add(i)
                        }, e.prototype._complete = function() {
                            this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
                        }, e.prototype.notifyNext = function(t) {
                            this.destination.next(t)
                        }, e.prototype.notifyComplete = function() {
                            var t = this.buffer;
                            this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                        }, e
                    }(s.SimpleOuterSubscriber),
                    l = a
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    from: () => s
                });
                var i = r(107),
                    n = r(169),
                    o = r(182);

                function s(t, e) {
                    return e ? (0, o.scheduled)(t, e) : t instanceof i.Observable ? t : new i.Observable((0, n.subscribeTo)(t))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    scheduled: () => c
                });
                var i = r(184),
                    n = r(185),
                    o = r(136),
                    s = r(187),
                    a = r(183),
                    h = r(172),
                    u = r(171),
                    l = r(186);

                function c(t, e) {
                    if (null != t) {
                        if ((0, a.isInteropObservable)(t)) return (0, i.scheduleObservable)(t, e);
                        if ((0, h.isPromise)(t)) return (0, n.schedulePromise)(t, e);
                        if ((0, u.isArrayLike)(t)) return (0, o.scheduleArray)(t, e);
                        if ((0, l.isIterable)(t) || "string" == typeof t) return (0, s.scheduleIterable)(t, e)
                    }
                    throw new TypeError((null !== t && typeof t || t) + " is not observable")
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isInteropObservable: () => n
                });
                var i = r(121);

                function n(t) {
                    return t && "function" == typeof t[i.observable]
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    scheduleObservable: () => s
                });
                var i = r(107),
                    n = r(115),
                    o = r(121);

                function s(t, e) {
                    return new i.Observable((function(r) {
                        var i = new n.Subscription;
                        return i.add(e.schedule((function() {
                            var n = t[o.observable]();
                            i.add(n.subscribe({
                                next: function(t) {
                                    i.add(e.schedule((function() {
                                        return r.next(t)
                                    })))
                                },
                                error: function(t) {
                                    i.add(e.schedule((function() {
                                        return r.error(t)
                                    })))
                                },
                                complete: function() {
                                    i.add(e.schedule((function() {
                                        return r.complete()
                                    })))
                                }
                            }))
                        }))), i
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    schedulePromise: () => o
                });
                var i = r(107),
                    n = r(115);

                function o(t, e) {
                    return new i.Observable((function(r) {
                        var i = new n.Subscription;
                        return i.add(e.schedule((function() {
                            return t.then((function(t) {
                                i.add(e.schedule((function() {
                                    r.next(t), i.add(e.schedule((function() {
                                        return r.complete()
                                    })))
                                })))
                            }), (function(t) {
                                i.add(e.schedule((function() {
                                    return r.error(t)
                                })))
                            }))
                        }))), i
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isIterable: () => n
                });
                var i = r(174);

                function n(t) {
                    return t && "function" == typeof t[i.iterator]
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    scheduleIterable: () => s
                });
                var i = r(107),
                    n = r(115),
                    o = r(174);

                function s(t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new i.Observable((function(r) {
                        var i, s = new n.Subscription;
                        return s.add((function() {
                            i && "function" == typeof i.return && i.return()
                        })), s.add(e.schedule((function() {
                            i = t[o.iterator](), s.add(e.schedule((function() {
                                if (!r.closed) {
                                    var t, e;
                                    try {
                                        var n = i.next();
                                        t = n.value, e = n.done
                                    } catch (t) {
                                        return void r.error(t)
                                    }
                                    e ? r.complete() : (r.next(t), this.schedule())
                                }
                            })))
                        }))), s
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ComplexInnerSubscriber: () => h,
                    ComplexOuterSubscriber: () => l,
                    SimpleInnerSubscriber: () => a,
                    SimpleOuterSubscriber: () => u,
                    innerSubscribe: () => c
                });
                var i = r(110),
                    n = r(109),
                    o = r(107),
                    s = r(169),
                    a = function(t) {
                        function e(e) {
                            var r = t.call(this) || this;
                            return r.parent = e, r
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.parent.notifyNext(t)
                        }, e.prototype._error = function(t) {
                            this.parent.notifyError(t), this.unsubscribe()
                        }, e.prototype._complete = function() {
                            this.parent.notifyComplete(), this.unsubscribe()
                        }, e
                    }(n.Subscriber),
                    h = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this) || this;
                            return n.parent = e, n.outerValue = r, n.outerIndex = i, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.parent.notifyNext(this.outerValue, t, this.outerIndex, this)
                        }, e.prototype._error = function(t) {
                            this.parent.notifyError(t), this.unsubscribe()
                        }, e.prototype._complete = function() {
                            this.parent.notifyComplete(this), this.unsubscribe()
                        }, e
                    }(n.Subscriber),
                    u = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype.notifyNext = function(t) {
                            this.destination.next(t)
                        }, e.prototype.notifyError = function(t) {
                            this.destination.error(t)
                        }, e.prototype.notifyComplete = function() {
                            this.destination.complete()
                        }, e
                    }(n.Subscriber),
                    l = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype.notifyNext = function(t, e, r, i) {
                            this.destination.next(e)
                        }, e.prototype.notifyError = function(t) {
                            this.destination.error(t)
                        }, e.prototype.notifyComplete = function(t) {
                            this.destination.complete()
                        }, e
                    }(n.Subscriber);

                function c(t, e) {
                    if (!e.closed) {
                        if (t instanceof o.Observable) return t.subscribe(e);
                        var r;
                        try {
                            r = (0, s.subscribeTo)(t)(e)
                        } catch (t) {
                            e.error(t)
                        }
                        return r
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    defer: () => s
                });
                var i = r(107),
                    n = r(181),
                    o = r(140);

                function s(t) {
                    return new i.Observable((function(e) {
                        var r;
                        try {
                            r = t()
                        } catch (t) {
                            return void e.error(t)
                        }
                        return (r ? (0, n.from)(r) : (0, o.empty)()).subscribe(e)
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    forkJoin: () => h
                });
                var i = r(107),
                    n = r(118),
                    o = r(164),
                    s = r(119),
                    a = r(181);

                function h() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    if (1 === t.length) {
                        var r = t[0];
                        if ((0, n.isArray)(r)) return u(r, null);
                        if ((0, s.isObject)(r) && Object.getPrototypeOf(r) === Object.prototype) {
                            var i = Object.keys(r);
                            return u(i.map((function(t) {
                                return r[t]
                            })), i)
                        }
                    }
                    if ("function" == typeof t[t.length - 1]) {
                        var a = t.pop();
                        return u(t = 1 === t.length && (0, n.isArray)(t[0]) ? t[0] : t, null).pipe((0, o.map)((function(t) {
                            return a.apply(void 0, t)
                        })))
                    }
                    return u(t, null)
                }

                function u(t, e) {
                    return new i.Observable((function(r) {
                        var i = t.length;
                        if (0 !== i)
                            for (var n = new Array(i), o = 0, s = 0, h = function(h) {
                                    var u = (0, a.from)(t[h]),
                                        l = !1;
                                    r.add(u.subscribe({
                                        next: function(t) {
                                            l || (l = !0, s++), n[h] = t
                                        },
                                        error: function(t) {
                                            return r.error(t)
                                        },
                                        complete: function() {
                                            ++o !== i && l || (s === i && r.next(e ? e.reduce((function(t, e, r) {
                                                return t[e] = n[r], t
                                            }), {}) : n), r.complete())
                                        }
                                    }))
                                }, u = 0; u < i; u++) h(u);
                        else r.complete()
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    fromEvent: () => a
                });
                var i = r(107),
                    n = r(118),
                    o = r(116),
                    s = r(164);

                function a(t, e, r, u) {
                    return (0, o.isFunction)(r) && (u = r, r = void 0), u ? a(t, e, r).pipe((0, s.map)((function(t) {
                        return (0, n.isArray)(t) ? u.apply(void 0, t) : u(t)
                    }))) : new i.Observable((function(i) {
                        h(t, e, (function(t) {
                            arguments.length > 1 ? i.next(Array.prototype.slice.call(arguments)) : i.next(t)
                        }), i, r)
                    }))
                }

                function h(t, e, r, i, n) {
                    var o;
                    if (function(t) {
                            return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
                        }(t)) {
                        var s = t;
                        t.addEventListener(e, r, n), o = function() {
                            return s.removeEventListener(e, r, n)
                        }
                    } else if (function(t) {
                            return t && "function" == typeof t.on && "function" == typeof t.off
                        }(t)) {
                        var a = t;
                        t.on(e, r), o = function() {
                            return a.off(e, r)
                        }
                    } else if (function(t) {
                            return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
                        }(t)) {
                        var u = t;
                        t.addListener(e, r), o = function() {
                            return u.removeListener(e, r)
                        }
                    } else {
                        if (!t || !t.length) throw new TypeError("Invalid event target");
                        for (var l = 0, c = t.length; l < c; l++) h(t[l], e, r, i, n)
                    }
                    i.add(o)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    fromEventPattern: () => a
                });
                var i = r(107),
                    n = r(118),
                    o = r(116),
                    s = r(164);

                function a(t, e, r) {
                    return r ? a(t, e).pipe((0, s.map)((function(t) {
                        return (0, n.isArray)(t) ? r.apply(void 0, t) : r(t)
                    }))) : new i.Observable((function(r) {
                        var i, n = function() {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            return r.next(1 === t.length ? t[0] : t)
                        };
                        try {
                            i = t(n)
                        } catch (t) {
                            return void r.error(t)
                        }
                        if ((0, o.isFunction)(e)) return function() {
                            return e(n, i)
                        }
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    generate: () => s
                });
                var i = r(107),
                    n = r(123),
                    o = r(135);

                function s(t, e, r, s, h) {
                    var u, l;
                    if (1 == arguments.length) {
                        var c = t;
                        l = c.initialState, e = c.condition, r = c.iterate, u = c.resultSelector || n.identity, h = c.scheduler
                    } else void 0 === s || (0, o.isScheduler)(s) ? (l = t, u = n.identity, h = s) : (l = t, u = s);
                    return new i.Observable((function(t) {
                        var i = l;
                        if (h) return h.schedule(a, 0, {
                            subscriber: t,
                            iterate: r,
                            condition: e,
                            resultSelector: u,
                            state: i
                        });
                        for (;;) {
                            if (e) {
                                var n = void 0;
                                try {
                                    n = e(i)
                                } catch (e) {
                                    return void t.error(e)
                                }
                                if (!n) {
                                    t.complete();
                                    break
                                }
                            }
                            var o = void 0;
                            try {
                                o = u(i)
                            } catch (e) {
                                return void t.error(e)
                            }
                            if (t.next(o), t.closed) break;
                            try {
                                i = r(i)
                            } catch (e) {
                                return void t.error(e)
                            }
                        }
                    }))
                }

                function a(t) {
                    var e = t.subscriber,
                        r = t.condition;
                    if (!e.closed) {
                        if (t.needIterate) try {
                            t.state = t.iterate(t.state)
                        } catch (t) {
                            return void e.error(t)
                        } else t.needIterate = !0;
                        if (r) {
                            var i = void 0;
                            try {
                                i = r(t.state)
                            } catch (t) {
                                return void e.error(t)
                            }
                            if (!i) return void e.complete();
                            if (e.closed) return
                        }
                        var n;
                        try {
                            n = t.resultSelector(t.state)
                        } catch (t) {
                            return void e.error(t)
                        }
                        if (!e.closed && (e.next(n), !e.closed)) return this.schedule(t)
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    iif: () => o
                });
                var i = r(189),
                    n = r(140);

                function o(t, e, r) {
                    return void 0 === e && (e = n.EMPTY), void 0 === r && (r = n.EMPTY), (0, i.defer)((function() {
                        return t() ? e : r
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    interval: () => s
                });
                var i = r(107),
                    n = r(153),
                    o = r(196);

                function s(t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = n.async), (!(0, o.isNumeric)(t) || t < 0) && (t = 0), e && "function" == typeof e.schedule || (e = n.async), new i.Observable((function(r) {
                        return r.add(e.schedule(a, t, {
                            subscriber: r,
                            counter: 0,
                            period: t
                        })), r
                    }))
                }

                function a(t) {
                    var e = t.subscriber,
                        r = t.counter,
                        i = t.period;
                    e.next(r), this.schedule({
                        subscriber: e,
                        counter: r + 1,
                        period: i
                    }, i)
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    isNumeric: () => n
                });
                var i = r(118);

                function n(t) {
                    return !(0, i.isArray)(t) && t - parseFloat(t) + 1 >= 0
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    merge: () => a
                });
                var i = r(107),
                    n = r(135),
                    o = r(179),
                    s = r(137);

                function a() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var r = Number.POSITIVE_INFINITY,
                        a = null,
                        h = t[t.length - 1];
                    return (0, n.isScheduler)(h) ? (a = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (r = t.pop())) : "number" == typeof h && (r = t.pop()), null === a && 1 === t.length && t[0] instanceof i.Observable ? t[0] : (0, o.mergeAll)(r)((0, s.fromArray)(t, a))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    NEVER: () => o,
                    never: () => s
                });
                var i = r(107),
                    n = r(158),
                    o = new i.Observable(n.noop);

                function s() {
                    return o
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    onErrorResumeNext: () => a
                });
                var i = r(107),
                    n = r(181),
                    o = r(118),
                    s = r(140);

                function a() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    if (0 === t.length) return s.EMPTY;
                    var r = t[0],
                        h = t.slice(1);
                    return 1 === t.length && (0, o.isArray)(r) ? a.apply(void 0, r) : new i.Observable((function(t) {
                        var e = function() {
                            return t.add(a.apply(void 0, h).subscribe(t))
                        };
                        return (0, n.from)(r).subscribe({
                            next: function(e) {
                                t.next(e)
                            },
                            error: e,
                            complete: e
                        })
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    dispatch: () => s,
                    pairs: () => o
                });
                var i = r(107),
                    n = r(115);

                function o(t, e) {
                    return e ? new i.Observable((function(r) {
                        var i = Object.keys(t),
                            o = new n.Subscription;
                        return o.add(e.schedule(s, 0, {
                            keys: i,
                            index: 0,
                            subscriber: r,
                            subscription: o,
                            obj: t
                        })), o
                    })) : new i.Observable((function(e) {
                        for (var r = Object.keys(t), i = 0; i < r.length && !e.closed; i++) {
                            var n = r[i];
                            t.hasOwnProperty(n) && e.next([n, t[n]])
                        }
                        e.complete()
                    }))
                }

                function s(t) {
                    var e = t.keys,
                        r = t.index,
                        i = t.subscriber,
                        n = t.subscription,
                        o = t.obj;
                    if (!i.closed)
                        if (r < e.length) {
                            var s = e[r];
                            i.next([s, o[s]]), n.add(this.schedule({
                                keys: e,
                                index: r + 1,
                                subscriber: i,
                                subscription: n,
                                obj: o
                            }))
                        } else i.complete()
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    partition: () => a
                });
                var i = r(203),
                    n = r(169),
                    o = r(202),
                    s = r(107);

                function a(t, e, r) {
                    return [(0, o.filter)(e, r)(new s.Observable((0, n.subscribeTo)(t))), (0, o.filter)((0, i.not)(e, r))(new s.Observable((0, n.subscribeTo)(t)))]
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    filter: () => o
                });
                var i = r(110),
                    n = r(109);

                function o(t, e) {
                    return function(r) {
                        return r.lift(new s(t, e))
                    }
                }
                var s = function() {
                        function t(t, e) {
                            this.predicate = t, this.thisArg = e
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new a(t, this.predicate, this.thisArg))
                        }, t
                    }(),
                    a = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this, e) || this;
                            return n.predicate = r, n.thisArg = i, n.count = 0, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            var e;
                            try {
                                e = this.predicate.call(this.thisArg, t, this.count++)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            e && this.destination.next(t)
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";

                function i(t, e) {
                    function r() {
                        return !r.pred.apply(r.thisArg, arguments)
                    }
                    return r.pred = t, r.thisArg = e, r
                }
                r.r(e), r.d(e, {
                    not: () => i
                })
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    RaceOperator: () => u,
                    RaceSubscriber: () => l,
                    race: () => h
                });
                var i = r(110),
                    n = r(118),
                    o = r(137),
                    s = r(176),
                    a = r(167);

                function h() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    if (1 === t.length) {
                        if (!(0, n.isArray)(t[0])) return t[0];
                        t = t[0]
                    }
                    return (0, o.fromArray)(t, void 0).lift(new u)
                }
                var u = function() {
                        function t() {}
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new l(t))
                        }, t
                    }(),
                    l = function(t) {
                        function e(e) {
                            var r = t.call(this, e) || this;
                            return r.hasFirst = !1, r.observables = [], r.subscriptions = [], r
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.observables.push(t)
                        }, e.prototype._complete = function() {
                            var t = this.observables,
                                e = t.length;
                            if (0 === e) this.destination.complete();
                            else {
                                for (var r = 0; r < e && !this.hasFirst; r++) {
                                    var i = t[r],
                                        n = (0, a.subscribeToResult)(this, i, void 0, r);
                                    this.subscriptions && this.subscriptions.push(n), this.add(n)
                                }
                                this.observables = null
                            }
                        }, e.prototype.notifyNext = function(t, e, r) {
                            if (!this.hasFirst) {
                                this.hasFirst = !0;
                                for (var i = 0; i < this.subscriptions.length; i++)
                                    if (i !== r) {
                                        var n = this.subscriptions[i];
                                        n.unsubscribe(), this.remove(n)
                                    }
                                this.subscriptions = null
                            }
                            this.destination.next(e)
                        }, e
                    }(s.OuterSubscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    dispatch: () => o,
                    range: () => n
                });
                var i = r(107);

                function n(t, e, r) {
                    return void 0 === t && (t = 0), new i.Observable((function(i) {
                        void 0 === e && (e = t, t = 0);
                        var n = 0,
                            s = t;
                        if (r) return r.schedule(o, 0, {
                            index: n,
                            count: e,
                            start: t,
                            subscriber: i
                        });
                        for (;;) {
                            if (n++ >= e) {
                                i.complete();
                                break
                            }
                            if (i.next(s++), i.closed) break
                        }
                    }))
                }

                function o(t) {
                    var e = t.start,
                        r = t.index,
                        i = t.count,
                        n = t.subscriber;
                    r >= i ? n.complete() : (n.next(e), n.closed || (t.index = r + 1, t.start = e + 1, this.schedule(t)))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    timer: () => a
                });
                var i = r(107),
                    n = r(153),
                    o = r(196),
                    s = r(135);

                function a(t, e, r) {
                    void 0 === t && (t = 0);
                    var a = -1;
                    return (0, o.isNumeric)(e) ? a = Number(e) < 1 ? 1 : Number(e) : (0, s.isScheduler)(e) && (r = e), (0, s.isScheduler)(r) || (r = n.async), new i.Observable((function(e) {
                        var i = (0, o.isNumeric)(t) ? t : +t - r.now();
                        return r.schedule(h, i, {
                            index: 0,
                            period: a,
                            subscriber: e
                        })
                    }))
                }

                function h(t) {
                    var e = t.index,
                        r = t.period,
                        i = t.subscriber;
                    if (i.next(e), !i.closed) {
                        if (-1 === r) return i.complete();
                        t.index = e + 1, this.schedule(t, r)
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    using: () => s
                });
                var i = r(107),
                    n = r(181),
                    o = r(140);

                function s(t, e) {
                    return new i.Observable((function(r) {
                        var i, s;
                        try {
                            i = t()
                        } catch (t) {
                            return void r.error(t)
                        }
                        try {
                            s = e(i)
                        } catch (t) {
                            return void r.error(t)
                        }
                        var a = (s ? (0, n.from)(s) : o.EMPTY).subscribe(r);
                        return function() {
                            a.unsubscribe(), i && i.unsubscribe()
                        }
                    }))
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ZipOperator: () => l,
                    ZipSubscriber: () => c,
                    zip: () => u
                });
                var i = r(110),
                    n = r(137),
                    o = r(118),
                    s = r(109),
                    a = r(174),
                    h = r(188);

                function u() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var r = t[t.length - 1];
                    return "function" == typeof r && t.pop(), (0, n.fromArray)(t, void 0).lift(new l(r))
                }
                var l = function() {
                        function t(t) {
                            this.resultSelector = t
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new c(t, this.resultSelector))
                        }, t
                    }(),
                    c = function(t) {
                        function e(e, r, i) {
                            void 0 === i && (i = Object.create(null));
                            var n = t.call(this, e) || this;
                            return n.resultSelector = r, n.iterators = [], n.active = 0, n.resultSelector = "function" == typeof r ? r : void 0, n
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            var e = this.iterators;
                            (0, o.isArray)(t) ? e.push(new d(t)): "function" == typeof t[a.iterator] ? e.push(new f(t[a.iterator]())) : e.push(new p(this.destination, this, t))
                        }, e.prototype._complete = function() {
                            var t = this.iterators,
                                e = t.length;
                            if (this.unsubscribe(), 0 !== e) {
                                this.active = e;
                                for (var r = 0; r < e; r++) {
                                    var i = t[r];
                                    i.stillUnsubscribed ? this.destination.add(i.subscribe()) : this.active--
                                }
                            } else this.destination.complete()
                        }, e.prototype.notifyInactive = function() {
                            this.active--, 0 === this.active && this.destination.complete()
                        }, e.prototype.checkIterators = function() {
                            for (var t = this.iterators, e = t.length, r = this.destination, i = 0; i < e; i++)
                                if ("function" == typeof(s = t[i]).hasValue && !s.hasValue()) return;
                            var n = !1,
                                o = [];
                            for (i = 0; i < e; i++) {
                                var s, a = (s = t[i]).next();
                                if (s.hasCompleted() && (n = !0), a.done) return void r.complete();
                                o.push(a.value)
                            }
                            this.resultSelector ? this._tryresultSelector(o) : r.next(o), n && r.complete()
                        }, e.prototype._tryresultSelector = function(t) {
                            var e;
                            try {
                                e = this.resultSelector.apply(this, t)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.destination.next(e)
                        }, e
                    }(s.Subscriber),
                    f = function() {
                        function t(t) {
                            this.iterator = t, this.nextResult = t.next()
                        }
                        return t.prototype.hasValue = function() {
                            return !0
                        }, t.prototype.next = function() {
                            var t = this.nextResult;
                            return this.nextResult = this.iterator.next(), t
                        }, t.prototype.hasCompleted = function() {
                            var t = this.nextResult;
                            return Boolean(t && t.done)
                        }, t
                    }(),
                    d = function() {
                        function t(t) {
                            this.array = t, this.index = 0, this.length = 0, this.length = t.length
                        }
                        return t.prototype[a.iterator] = function() {
                            return this
                        }, t.prototype.next = function(t) {
                            var e = this.index++,
                                r = this.array;
                            return e < this.length ? {
                                value: r[e],
                                done: !1
                            } : {
                                value: null,
                                done: !0
                            }
                        }, t.prototype.hasValue = function() {
                            return this.array.length > this.index
                        }, t.prototype.hasCompleted = function() {
                            return this.array.length === this.index
                        }, t
                    }(),
                    p = function(t) {
                        function e(e, r, i) {
                            var n = t.call(this, e) || this;
                            return n.parent = r, n.observable = i, n.stillUnsubscribed = !0, n.buffer = [], n.isComplete = !1, n
                        }
                        return i.__extends(e, t), e.prototype[a.iterator] = function() {
                            return this
                        }, e.prototype.next = function() {
                            var t = this.buffer;
                            return 0 === t.length && this.isComplete ? {
                                value: null,
                                done: !0
                            } : {
                                value: t.shift(),
                                done: !1
                            }
                        }, e.prototype.hasValue = function() {
                            return this.buffer.length > 0
                        }, e.prototype.hasCompleted = function() {
                            return 0 === this.buffer.length && this.isComplete
                        }, e.prototype.notifyComplete = function() {
                            this.buffer.length > 0 ? (this.isComplete = !0, this.parent.notifyInactive()) : this.destination.complete()
                        }, e.prototype.notifyNext = function(t) {
                            this.buffer.push(t), this.parent.checkIterators()
                        }, e.prototype.subscribe = function() {
                            return (0, h.innerSubscribe)(this.observable, new h.SimpleInnerSubscriber(this))
                        }, e
                    }(h.SimpleOuterSubscriber)
            }, (t, e, r) => {
                "use strict";
                var i = r(9).Buffer;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.receiveAPDU = void 0;
                var n = r(51),
                    o = r(106),
                    s = r(101);
                e.receiveAPDU = t => o.Observable.create((e => {
                    let r = 0,
                        o = 0,
                        a = i.alloc(0);
                    const h = t.subscribe({
                        complete: () => {
                            e.error(new n.DisconnectedDevice), h.unsubscribe()
                        },
                        error: t => {
                            (0, s.log)("ble-error", "in receiveAPDU " + String(t)), e.error(t), h.unsubscribe()
                        },
                        next: t => {
                            const s = t.readUInt8(0),
                                u = t.readUInt16BE(1);
                            let l = t.slice(3);
                            5 === s ? r === u ? (0 === u && (o = l.readUInt16BE(0), l = l.slice(2)), r++, a = i.concat([a, l]), a.length > o ? e.error(new n.TransportError("BLE: received too much data. discontinued chunk. Received " + a.length + " but expected " + o, "BLETooMuchData")) : a.length === o && (e.next(a), e.complete(), h.unsubscribe())) : e.error(new n.TransportError("BLE: Invalid sequence number. discontinued chunk. Received " + u + " but expected " + r, "InvalidSequence")) : e.error(new n.TransportError("Invalid tag " + s.toString(16), "InvalidTag"))
                        }
                    });
                    return () => {
                        h.unsubscribe()
                    }
                }))
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    monitorCharacteristic: () => s
                });
                var i = r(107),
                    n = r(101),
                    o = r(9).Buffer;
                const s = t => i.Observable.create((e => {
                    function r(t) {
                        const r = t.target;
                        r.value && e.next(o.from(r.value.buffer))
                    }
                    return (0, n.log)("ble-verbose", "start monitor " + t.uuid), t.startNotifications().then((() => {
                        t.addEventListener("characteristicvaluechanged", r)
                    })), () => {
                        (0, n.log)("ble-verbose", "end monitor " + t.uuid), t.stopNotifications()
                    }
                }))
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    tap: () => a
                });
                var i = r(110),
                    n = r(109),
                    o = r(158),
                    s = r(116);

                function a(t, e, r) {
                    return function(i) {
                        return i.lift(new h(t, e, r))
                    }
                }
                var h = function() {
                        function t(t, e, r) {
                            this.nextOrObserver = t, this.error = e, this.complete = r
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new u(t, this.nextOrObserver, this.error, this.complete))
                        }, t
                    }(),
                    u = function(t) {
                        function e(e, r, i, n) {
                            var a = t.call(this, e) || this;
                            return a._tapNext = o.noop, a._tapError = o.noop, a._tapComplete = o.noop, a._tapError = i || o.noop, a._tapComplete = n || o.noop, (0, s.isFunction)(r) ? (a._context = a, a._tapNext = r) : r && (a._context = r, a._tapNext = r.next || o.noop, a._tapError = r.error || o.noop, a._tapComplete = r.complete || o.noop), a
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            try {
                                this._tapNext.call(this._context, t)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.destination.next(t)
                        }, e.prototype._error = function(t) {
                            try {
                                this._tapError.call(this._context, t)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            this.destination.error(t)
                        }, e.prototype._complete = function() {
                            try {
                                this._tapComplete.call(this._context)
                            } catch (t) {
                                return void this.destination.error(t)
                            }
                            return this.destination.complete()
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    share: () => a
                });
                var i = r(213),
                    n = r(125),
                    o = r(126);

                function s() {
                    return new o.Subject
                }

                function a() {
                    return function(t) {
                        return (0, n.refCount)()((0, i.multicast)(s)(t))
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    MulticastOperator: () => o,
                    multicast: () => n
                });
                var i = r(124);

                function n(t, e) {
                    return function(r) {
                        var n;
                        if (n = "function" == typeof t ? t : function() {
                                return t
                            }, "function" == typeof e) return r.lift(new o(n, e));
                        var s = Object.create(r, i.connectableObservableDescriptor);
                        return s.source = r, s.subjectFactory = n, s
                    }
                }
                var o = function() {
                    function t(t, e) {
                        this.subjectFactory = t, this.selector = e
                    }
                    return t.prototype.call = function(t, e) {
                        var r = this.selector,
                            i = this.subjectFactory(),
                            n = r(i).subscribe(t);
                        return n.add(e.subscribe(i)), n
                    }, t
                }()
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    first: () => u
                });
                var i = r(161),
                    n = r(202),
                    o = r(215),
                    s = r(216),
                    a = r(217),
                    h = r(123);

                function u(t, e) {
                    var r = arguments.length >= 2;
                    return function(u) {
                        return u.pipe(t ? (0, n.filter)((function(e, r) {
                            return t(e, r, u)
                        })) : h.identity, (0, o.take)(1), r ? (0, s.defaultIfEmpty)(e) : (0, a.throwIfEmpty)((function() {
                            return new i.EmptyError
                        })))
                    }
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    take: () => a
                });
                var i = r(110),
                    n = r(109),
                    o = r(160),
                    s = r(140);

                function a(t) {
                    return function(e) {
                        return 0 === t ? (0, s.empty)() : e.lift(new h(t))
                    }
                }
                var h = function() {
                        function t(t) {
                            if (this.total = t, this.total < 0) throw new o.ArgumentOutOfRangeError
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new u(t, this.total))
                        }, t
                    }(),
                    u = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.total = r, i.count = 0, i
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            var e = this.total,
                                r = ++this.count;
                            r <= e && (this.destination.next(t), r === e && (this.destination.complete(), this.unsubscribe()))
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    defaultIfEmpty: () => o
                });
                var i = r(110),
                    n = r(109);

                function o(t) {
                    return void 0 === t && (t = null),
                        function(e) {
                            return e.lift(new s(t))
                        }
                }
                var s = function() {
                        function t(t) {
                            this.defaultValue = t
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new a(t, this.defaultValue))
                        }, t
                    }(),
                    a = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.defaultValue = r, i.isEmpty = !0, i
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.isEmpty = !1, this.destination.next(t)
                        }, e.prototype._complete = function() {
                            this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
                        }, e
                    }(n.Subscriber)
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    throwIfEmpty: () => s
                });
                var i = r(110),
                    n = r(161),
                    o = r(109);

                function s(t) {
                    return void 0 === t && (t = u),
                        function(e) {
                            return e.lift(new a(t))
                        }
                }
                var a = function() {
                        function t(t) {
                            this.errorFactory = t
                        }
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new h(t, this.errorFactory))
                        }, t
                    }(),
                    h = function(t) {
                        function e(e, r) {
                            var i = t.call(this, e) || this;
                            return i.errorFactory = r, i.hasValue = !1, i
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {
                            this.hasValue = !0, this.destination.next(t)
                        }, e.prototype._complete = function() {
                            if (this.hasValue) return this.destination.complete();
                            var t = void 0;
                            try {
                                t = this.errorFactory()
                            } catch (e) {
                                t = e
                            }
                            this.destination.error(t)
                        }, e
                    }(o.Subscriber);

                function u() {
                    return new n.EmptyError
                }
            }, (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, {
                    ignoreElements: () => o
                });
                var i = r(110),
                    n = r(109);

                function o() {
                    return function(t) {
                        return t.lift(new s)
                    }
                }
                var s = function() {
                        function t() {}
                        return t.prototype.call = function(t, e) {
                            return e.subscribe(new a(t))
                        }, t
                    }(),
                    a = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return i.__extends(e, t), e.prototype._next = function(t) {}, e
                    }(n.Subscriber)
            }],
            e = {};

        function r(i) {
            var n = e[i];
            if (void 0 !== n) return n.exports;
            var o = e[i] = {
                id: i,
                loaded: !1,
                exports: {}
            };
            return t[i].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
        }
        return r.n = t => {
            var e = t && t.__esModule ? () => t.default : () => t;
            return r.d(e, {
                a: e
            }), e
        }, r.d = (t, e) => {
            for (var i in e) r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, {
                enumerable: !0,
                get: e[i]
            })
        }, r.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (t) {
                if ("object" == typeof window) return window
            }
        }(), r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = t => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, r.nmd = t => (t.paths = [], t.children || (t.children = []), t), r(0)
    })()
}));