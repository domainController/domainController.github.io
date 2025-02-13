!function i(r, s, d) {
    function l(t, e) {
        if (!s[t]) {
            if (!r[t]) {
                var a = "function" == typeof require && require;
                if (!e && a)
                    return a(t, !0);
                if (c)
                    return c(t, !0);
                var n = new Error("Cannot find module '" + t + "'");
                throw n.code = "MODULE_NOT_FOUND",
                n
            }
            var o = s[t] = {
                exports: {}
            };
            r[t][0].call(o.exports, function(e) {
                return l(r[t][1][e] || e)
            }, o, o.exports, i, r, s, d)
        }
        return s[t].exports
    }
    for (var c = "function" == typeof require && require, e = 0; e < d.length; e++)
        l(d[e]);
    return l
}({
    1: [function(e, t, a) {
        var n = e("./lib/replace")
          , o = e("./lib/getSlotPlaceholder").getSlotPlaceholder
          , i = e("./lib/getSlotPlaceholder").getClickTrackingParamWithSlotId;
        t.exports.replace = n,
        t.exports.getSlotPlaceholder = o,
        t.exports.getClickTrackingParamWithSlotId = i
    }
    , {
        "./lib/getSlotPlaceholder": 2,
        "./lib/replace": 4
    }],
    2: [function(e, t, a) {
        var n = e("./globals")
          , o = "data-val";
        function i(e) {
            if ("string" != typeof e || "" === e)
                return "";
            var t = n.getDocument().getElementById("ape_" + e + "_placement_ClickTracking");
            if (!(t && t.hasAttribute && "function" == typeof t.hasAttribute && t.hasAttribute(o) && t.getAttribute && "function" == typeof t.getAttribute))
                return "";
            var a = t.getAttribute(o);
            return "string" != typeof a ? "" : a
        }
        t.exports.getSlotPlaceholder = function(e, t, a) {
            return i([e, a, t].join("_"))
        }
        ,
        t.exports.getClickTrackingParamWithSlotId = i
    }
    , {
        "./globals": 3
    }],
    3: [function(e, t, a) {
        t.exports.getDocument = function() {
            return document
        }
    }
    , {}],
    4: [function(e, t, a) {
        var o = "&pd_rd_plhdr=t"
          , i = /(&amp;|\?){1}pd_rd_plhdr=t(&amp;|'|&quot;){1}/g
          , r = /(&|\?){1}pd_rd_plhdr=t(&|'|"|\\"|\\'){1}/g;
        t.exports = function(e, t) {
            var a = t
              , n = e;
            "string" != typeof e || e === o ? n = "" : (n.startsWith("&") && (n = n.replace(/^&+/, "")),
            n.endsWith("&") && (n = n.replace(/&+$/, "")));
            try {
                return "" === n ? a.replace(new RegExp("\\bpd_rd_plhdr=t&"), "").replace(new RegExp(o + "\\b"), "").replace(new RegExp("\\?pd_rd_plhdr=t\\b"), "") : a.replace(r, "$1" + n + "$2").replace(i, "$1" + n.replace(/&/g, "&amp;") + "$2")
            } catch (e) {
                return t
            }
        }
    }
    , {}],
    5: [function(e, t, a) {
        var n = e("./ajaxRequest");
        t.exports.Tracer = function(e, t) {
            return this.traceId = e,
            this.adStartTime = t,
            this.storedTrace = {},
            this.logTrace = function(e, t) {
                if (void 0 !== this.traceId) {
                    var a, n = (new Date).getTime();
                    this.storedTrace.hasOwnProperty(e) || (this.storedTrace[e] = []),
                    (a = t === Object(t) ? Object.assign && "function" == typeof Object.assign ? Object.assign({}, t) : JSON.parse(JSON.stringify(t)) : (a = '{ "' + e + '":"' + t + '"}',
                    JSON.parse(a))).timeStamp = n,
                    a.timeSinceAdStart = n - this.adStartTime,
                    this.storedTrace[e].push(a)
                }
            }
            ,
            this.sendTrace = function() {
                var t = function() {
                    console.log("failed to send request to /gp/adbarplus")
                };
                if (!function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t))
                            return !1;
                    return !0
                }(this.storedTrace)) {
                    var e = "/gp/adbarplus?traceId=" + this.traceId + "&systemName=browser";
                    for (var a in n.sendAjaxRequest(e, "POST", JSON.stringify(this.storedTrace), {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }, function(e) {
                        4 === e.readyState && 200 !== e.status && t()
                    }, t),
                    this.storedTrace)
                        this.storedTrace.hasOwnProperty(a) && delete this.storedTrace[a]
                }
            }
            ,
            this.bindSendTraceToPageOnLoad = function() {
                var e = function(e, t) {
                    return function() {
                        return e.apply(t)
                    }
                }
                  , t = function() {
                    this.sendTrace()
                }
                  , a = function() {
                    this.sendTrace(),
                    window.setInterval(e(t, this), 3e3)
                };
                "loading" !== document.readyState ? e(a, this)() : window.addEventListener ? window.addEventListener("load", e(a, this)) : document.attachEvent("onreadystatechange", function() {
                    "complete" === document.readyState && e(a, this)()
                })
            }
            ,
            void 0 !== e && this.bindSendTraceToPageOnLoad(),
            {
                traceId: this.traceId,
                adStartTime: this.adStartTime,
                storedTrace: this.storedTrace,
                allData: this.allData,
                logTrace: this.logTrace,
                sendTrace: this.sendTrace
            }
        }
    }
    , {
        "./ajaxRequest": 6
    }],
    6: [function(e, t, a) {
        t.exports.sendAjaxRequest = function(e, t, a, n, o, i) {
            try {
                var r = null;
                if (window.XMLHttpRequest ? r = new XMLHttpRequest : i(),
                r) {
                    if (r.onreadystatechange = function() {
                        o(r)
                    }
                    ,
                    r.open(t, e, !0),
                    null !== n)
                        for (var s in n)
                            r.setRequestHeader(s, n[s]);
                    r.send(a)
                } else
                    i()
            } catch (e) {
                i()
            }
        }
    }
    , {}],
    7: [function(e, t, a) {
        var c = e("../host/metrics/counters");
        t.exports.checkCache = function(e, t, a, n, o) {
            var i = c.CACHE_COUNTERS;
            if ("undefined" != typeof performance && void 0 !== performance.getEntriesByType) {
                var r = performance.getEntriesByType("resource");
                if (void 0 !== r && Array.isArray(r) && !(r.length < 1) && void 0 !== r[0].duration) {
                    var s = void 0 !== r[0].transferSize ? function(e, t) {
                        0 === e.transferSize ? d(t + "cached") : d(t + "uncached")
                    }
                    : function(e, t) {
                        e.duration < 20 ? d(t + "fastload") : d(t + "slowload")
                    }
                    ;
                    l(e, i.SF_LIBRARY),
                    l(t, i.SF_HTML)
                }
            }
            function d(e) {
                o(a, n, e, 1)
            }
            function l(e, t) {
                if (e)
                    for (var a = 0; a < r.length; a++) {
                        var n = r[a];
                        if (n.name && -1 !== n.name.indexOf(e))
                            return void s(n, t)
                    }
            }
        }
    }
    , {
        "../host/metrics/counters": 14
    }],
    8: [function(e, t, a) {
        var n = e("@apejs/click-tracking");
        t.exports.getSlotPlaceholder = function(e) {
            if (!("pageType"in e && "subPageType"in e && "slotName"in e))
                return "";
            try {
                return n.getSlotPlaceholder(e.pageType, e.subPageType, e.slotName)
            } catch (e) {
                return ""
            }
        }
    }
    , {
        "@apejs/click-tracking": 1
    }],
    9: [function(e, u, t) {
        /*
    @license
    Underscore.js 1.8.3
    http://underscorejs.org
    (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    Underscore may be freely distributed under the MIT license.
*/
        var n = function() {
            return window.P && window.P.AUI_BUILD_DATE
        };
        u.exports.throttle = function(a, n, o) {
            var i, r, s, d = null, l = 0;
            o || (o = {});
            var c = function() {
                l = !1 === o.leading ? 0 : u.exports.now(),
                d = null,
                s = a.apply(i, r),
                d || (i = r = null)
            };
            return function() {
                var e = u.exports.now();
                l || !1 !== o.leading || (l = e);
                var t = n - (e - l);
                return i = this,
                r = arguments,
                t <= 0 || n < t ? (d && (clearTimeout(d),
                d = null),
                l = e,
                s = a.apply(i, r),
                d || (i = r = null)) : d || !1 === o.trailing || (d = setTimeout(c, t)),
                s
            }
        }
        ,
        u.exports.now = function() {
            return Date.now ? Date.now() : (new Date).getTime()
        }
        ,
        u.exports.addListener = function(e, t, a) {
            e.addEventListener ? e.addEventListener(t, a, !1) : window.attachEvent && e.attachEvent("on" + t, a)
        }
        ,
        u.exports.addWindowListener = function(e, t) {
            u.exports.addListener(window, e, t)
        }
        ,
        u.exports.removeWindowListener = function(e, t) {
            window.removeEventListener ? window.removeEventListener(e, t, !1) : window.detachEvent && window.detachEvent("on" + e, t)
        }
        ,
        u.exports.ensureMessageListener = function(e) {
            u.exports.removeWindowListener("message", e),
            u.exports.addWindowListener("message", e)
        }
        ,
        u.exports.decodeBase64 = function(e) {
            var t, a, n, o, i, r, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = "", l = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < e.length; )
                t = s.indexOf(e.charAt(l++)) << 2 | (o = s.indexOf(e.charAt(l++))) >> 4,
                a = (15 & o) << 4 | (i = s.indexOf(e.charAt(l++))) >> 2,
                n = (3 & i) << 6 | (r = s.indexOf(e.charAt(l++))),
                d += String.fromCharCode(t),
                64 != i && (d += String.fromCharCode(a)),
                64 != r && (d += String.fromCharCode(n));
            return d = function(e) {
                for (var t = "", a = 0, n = 0, o = 0, i = 0; a < e.length; )
                    (n = e.charCodeAt(a)) < 128 ? (t += String.fromCharCode(n),
                    a++) : 191 < n && n < 224 ? (o = e.charCodeAt(a + 1),
                    t += String.fromCharCode((31 & n) << 6 | 63 & o),
                    a += 2) : (o = e.charCodeAt(a + 1),
                    i = e.charCodeAt(a + 2),
                    t += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & i),
                    a += 3);
                return t
            }(d)
        }
        ,
        u.exports.createScript = function(e, t, a, n, o) {
            if (!document.getElementById(a)) {
                var i = document.createElement("script");
                return i.async = !0,
                i.setAttribute("crossorigin", "anonymous"),
                i.src = e,
                i.type = t,
                i.id = a,
                i.onerror = n,
                i.onload = o,
                i
            }
        }
        ,
        u.exports.isAUIAvailable = n,
        u.exports.safeFunctionWrapper = function(e, t, a) {
            return n() && "function" == typeof window.P.guardError ? P.guardError("APE-SafeFrame", e) : function() {
                try {
                    e.apply(this, arguments)
                } catch (e) {
                    "function" == typeof t && a && t(a, e)
                }
            }
        }
        ,
        u.exports.getCookie = function(e) {
            var t = e + "=";
            try {
                for (var a = decodeURIComponent(document.cookie).split(";"), n = 0; n < a.length; n++) {
                    for (var o = a[n]; " " == o.charAt(0); )
                        o = o.substring(1);
                    if (0 == o.indexOf(t))
                        return o.substring(t.length, o.length)
                }
            } catch (e) {}
            return ""
        }
        ,
        u.exports.disableCookieAccess = function() {
            try {
                Object && Object.defineProperty && "function" == typeof Object.defineProperty ? Object.defineProperty(document, "cookie", {
                    get: function() {
                        return ""
                    },
                    set: function() {}
                }) : (document.__defineGetter__("cookie", function() {
                    return ""
                }),
                document.__defineSetter__("cookie", function() {}))
            } catch (e) {}
        }
        ,
        u.exports.setObjectStyles = function(e, t) {
            if (e && t)
                for (var a in t)
                    e.style[a] = t[a];
            return e
        }
        ,
        u.exports.ABP_STATUS = {
            1: "Enabled",
            0: "NotEnabled",
            "-1": "Unknown"
        },
        u.exports.hasHostname = function(e) {
            var t = "";
            return e && (t = -1 < e.indexOf("//") ? e.split("/")[2] : e.split("/")[0]),
            0 != t.length
        }
    }
    , {}],
    10: [function(m, e, t) {
        /**
 * @license
 * Copyright (c) 2014, Amazon.com
 * APE SafeFrame v1.50.b82475b -- 2020-12-16T22:55:22+0000
*/
        !function(L, O) {
            var e = m("./messenger/msgHandler")
              , t = m("./metrics/counters")
              , r = m("../components/cacheChecker")
              , R = m("../components/adBarTracer")
              , n = m("./components/adFeedback")
              , a = m("./metrics/csm")
              , N = m("../components/clickTrackingHelper")
              , D = e.util
              , _ = e.messenger
              , F = e.logError
              , s = _.appendErrorDetails
              , o = e.loadScript
              , P = a.sendCsmLatencyMetric
              , W = a.sendCsmCounter
              , z = a.addCsmTag
              , d = e.fireViewableLatencyMetrics
              , B = e.hasClass
              , l = e.createIframeWithAttributes
              , H = e.logCounter
              , U = e.collapseSlot
              , c = e.resizeSafeFrameAd
              , V = e.delayLoad
              , u = e.getMediaCentralOrigin
              , p = e.sizeValidator
              , f = e.checkAgainstAllowlist
              , j = D.ABP_STATUS;
            function i() {
                if (L.DAsf)
                    L.DAsf.loadAds();
                else {
                    L.DAsf = {
                        version: "1.50.b82475b"
                    },
                    W(null, null, t.SF_VERSION_COUNTERS.VERSION + ":" + L.DAsf.version, 1);
                    var h = "text/x-dacx-safeframe"
                      , e = u()
                      , w = e + "/images/S/apesafeframe/ape/sf/desktop/sf-1.50.b82475b.html"
                      , v = e + "/images/S/apesafeframe/ape/sf/whitelisted/desktop/sf-1.50.b82475b.html"
                      , y = "data-arid"
                      , S = "d16g_postMessageUnsupported"
                      , T = "d16g_postMessageSupported"
                      , b = t.ABP_STATUS_COUNTERS
                      , x = t.AD_LOAD_COUNTERS
                      , a = t.MESSENGER_COUNTERS
                      , o = {}
                      , A = {}
                      , E = {}
                      , i = null;
                    _.supportedCommands = {
                        sendAdBarTrace: function(e, t) {
                            e.options.arid in E && E[e.options.arid].logTrace(t.field, t.traceInfo)
                        },
                        logAPIInvocation: function(e, t) {
                            W(null, null, a.API + t.apiName, 1),
                            W(e.options.slot, e.options.placementId, a.API + t.apiName, 1),
                            e.options.arid in E && E[e.options.arid].logTrace("apiCalls", t)
                        },
                        resizeSafeFrameAd: function(e, t) {
                            D.addWindowListener("resize", o[e.options.arid].defaultResizeSafeFrameHandler),
                            c(e.options.arid, e.options.size.width, e.options.size.height, e.options.maxAdWidth, e.options.adCreativeMetaData && e.options.adCreativeMetaData.adProgramId, e.options.programIdsToCollapse, e.options.minWidthToPunt, _, A)
                        },
                        changeSize: function(e, t) {
                            var a = e.options.allowedSizes;
                            if (f(t, a, p))
                                e.slot.style.width = t.width,
                                e.iframe.height = t.height,
                                e.iframe.width = t.width;
                            else {
                                var n = "Size is not allowlisted: " + t.width + " x " + t.height + s(e.options.arid);
                                F(n)
                            }
                        },
                        collapseSlot: function(e, t) {
                            U(A[e.options.arid].placementDivId),
                            "nav-sitewide-msg" === e.options.slotName && V("amznJQ.available:navbarJSLoaded", function() {
                                void 0 !== parent.navbar && "function" == typeof parent.navbar.unHideSWM && parent.navbar.unHideSWM()
                            })
                        },
                        logError: function(e, t) {
                            F(t.message + s(e.options.arid) + ": " + e.options.slot, t.error)
                        },
                        sendCsmLatencyMetric: function(e, t) {
                            P(t.metric, e.options.slot, e.options.placementId, t.metricMsg, t.timestamp)
                        },
                        countMetric: function(e, t) {
                            t.isGlobal ? W(null, null, t.metricMsg, t.value) : W(e.options.slot, e.options.placementId, t.metricMsg, t.value)
                        },
                        addCsmTag: function(e, t) {
                            z(t.tag, e.options.slot, e.options.placementId, t.msg)
                        },
                        fireViewableLatencyMetrics: function(e, t) {
                            d(e.options.arid, e.options.slot, e.options.placementId, t.adLoadedTimestamp)
                        },
                        customMessage: function(e, t) {
                            var a = null != e.options.allowlistedCustomMessageEvents ? e.options.allowlistedCustomMessageEvents : e.options.whitelistedCustomMessageEvents;
                            _.customMessage(t.key, t.body, a, e.options.slot, e.options.placementId)
                        },
                        enableViewabilityTracker: function(e) {
                            _.updateViewability(e.options.arid);
                            var t = D.throttle(_.updateViewability, 20);
                            C(e.options.arid, e.options.slot, "viewabilityTracker", function() {
                                t(e.options.arid)
                            }),
                            D.addWindowListener("scroll", o[e.options.arid].viewabilityTracker),
                            D.addWindowListener("resize", o[e.options.arid].viewabilityTracker),
                            D.addListener(O, "visibilitychange", o[e.options.arid].viewabilityTracker)
                        },
                        enableNoInventoryViewabilityTrackerAndInvokeFallback: function(e) {
                            _.takeSnapshotOfSlotPosition(e.options.arid),
                            _.updateNoInventoryViewability(e.options.arid),
                            _.sendMessageToAd(e.options.arid, "handleFallbackBehavior", {});
                            var t = D.throttle(_.updateNoInventoryViewability, 20);
                            C(e.options.arid, e.options.slot, "noInventoryViewabilityTracker", function() {
                                t(e.options.arid)
                            }),
                            D.addWindowListener("scroll", o[e.options.arid].noInventoryViewabilityTracker),
                            D.addWindowListener("resize", o[e.options.arid].noInventoryViewabilityTracker),
                            D.addListener(O, "visibilitychange", o[e.options.arid].noInventoryViewabilityTracker)
                        },
                        loadAdFeedback: function(e, t) {
                            var a = _.adMap[e.options.arid].iframe;
                            e.options.adCreativeMetaData = t,
                            n.appendAdFeedbackLinkToIframe(a, e.options, E)
                        },
                        safeFrameReady: function(e) {},
                        requestVideoAutoplay: function(e, t) {
                            if (i === e.options.arid && _.sendCustomMessageToAd(e.options.arid, "videoAutoplayResponse", !0),
                            null === i && null !== e.options.arid) {
                                var a = O.getElementsByTagName("video")
                                  , n = a && 0 === a.length;
                                i = n ? e.options.arid : null,
                                _.sendCustomMessageToAd(e.options.arid, "videoAutoplayResponse", n)
                            }
                        },
                        releaseVideoAutoplay: function(e, t) {
                            i = null,
                            _.sendCustomMessageToAd(e.options.arid, "videoAutoplayReleased")
                        },
                        logSafeframeResourceTimingData: function(e, t) {
                            L.logSafeframeResourceTimingData(e.options, t)
                        }
                    },
                    D.addWindowListener("message", _.receiveMessage),
                    L.DAsf.registerCustomMessageListener = _.registerCustomMessageListener,
                    L.DAsf.sendCustomMessage = _.sendCustomMessage,
                    L.DAsf.loadAds = function() {
                        var e, t, a = 0, n = null, o = [];
                        if ("function" != typeof O.getElementsByClassName) {
                            var i = O.getElementsByTagName("div")
                              , r = O.getElementsByTagName("script")
                              , s = 0;
                            for (s = 0; s < i.length; s++)
                                o[s] = i[s];
                            for (s = 0; s < r.length; s++)
                                o[s + i.length] = r[s]
                        } else
                            o = O.getElementsByClassName(h);
                        for (0 === o.length && (o = O.getElementsByTagName("script")); n = o[a++]; )
                            if ("DIV" === n.tagName && B(n, h) || n.getAttribute("type") === h) {
                                var d = n.getAttribute("data-ad-details") || n.text || n.innerHTML || n.innerText;
                                try {
                                    (d = JSON.parse(d)).fallbackStaticAdClickUrl && (D.hasHostname(d.fallbackStaticAdClickUrl) || (d.fallbackStaticAdClickUrl = L.location.protocol + "//" + L.location.host + d.fallbackStaticAdClickUrl));
                                    var l = "ape_" + d.slot + "_placement"
                                      , c = O.getElementById(l);
                                    if (!_.adMap[d.arid] && c && c.innerHTML && (c.innerHTML = "",
                                    n.removeAttribute(y)),
                                    n.getAttribute(y))
                                        continue;
                                    d.arid = d.arid || Math.random().toString(16).slice(2),
                                    E[d.arid] = new R.Tracer(d.traceId,L[d.slotName] && L[d.slotName].adStartTime || 0),
                                    E[d.arid].logTrace("safeFrameInput", d);
                                    var u = {};
                                    u.caches = L.caches ? L.caches : null,
                                    u.plugins = O.plugins ? O.plugins : null,
                                    u.cookies = O.cookie ? O.cookie : null,
                                    u.userAgents = navigator.userAgent ? navigator.userAgent : null,
                                    E[d.arid].logTrace("browserData", u),
                                    n.setAttribute(y, d.arid),
                                    d.hostDomain = location.protocol + "//" + location.host,
                                    d.allowedSizes = "object" == typeof d.allowedSizes && 0 <= d.allowedSizes.length ? d.allowedSizes.concat(d.size) : [d.size];
                                    var p = "d3l3lkinz3f56t.cloudfront.net,g-ecx.images-amazon.com,z-ecx.images-amazon.com,images-na.ssl-images-amazon.com,g-ec4.images-amazon.com,images-cn.ssl-images-amazon.com".split(",");
                                    d.allowedDomains = "object" == typeof d.allowedDomains && 0 <= d.allowedDomains.length ? d.allowedDomains.concat(p) : p;
                                    var f = null != d.allowlistedQueryParamKeys ? d.allowlistedQueryParamKeys : d.whitelistedQueryParamKeys;
                                    if (d.queryParams = M(f),
                                    d.aPageStart = L.aPageStart,
                                    d.adStartTime = L[d.slotName] && L[d.slotName].adStartTime || 0,
                                    C(d.arid, d.slot, "defaultResizeSafeFrameHandler", I(d)),
                                    e = d.arid,
                                    t = d.slot,
                                    A[e] = {
                                        slotId: t,
                                        placementDivId: "ape_" + t + "_placement",
                                        iframeId: "ape_" + t + "_iframe"
                                    },
                                    "clickTracking"in d && "" === d.clickTracking && (d.clickTracking = N.getSlotPlaceholder(d)),
                                    d.minWidthToPunt && d.programIdsToCollapse && -1 < d.programIdsToCollapse.indexOf(d.adCreativeMetaData.adProgramId) && c.offsetWidth < d.minWidthToPunt) {
                                        W(d.slot, null, "puntOnMinWidth:beforeRendering", 1),
                                        U(A[d.arid].placementDivId);
                                        continue
                                    }
                                    if (d.forcePunt) {
                                        z("forcePunt", d.slot, d.placementId),
                                        U(A[d.arid].placementDivId);
                                        continue
                                    }
                                    if (d.safeFrameSrc = "true" !== d.abpAcceptable || "1" !== d.abpStatus && "-1" !== d.abpStatus ? w : v,
                                    d.abpStatus)
                                        for (var m in z("ABPStatus" + j[d.abpStatus], d.slot),
                                        j)
                                            W(d.slot, d.placementId, b[m], d.abpStatus === m ? 1 : 0);
                                    d.collectSafeframeRTD = L.collectSafeframeRTD,
                                    P("af", d.slot, d.placementId),
                                    W(d.slot, d.placementId, x.START, 1);
                                    var g = {};
                                    if (g.hostDomain = d.hostDomain,
                                    g.allowedSizes = d.allowedSizes,
                                    g.allowedDomains = d.allowedDomains,
                                    g.queryParams = d.queryParams,
                                    g.aPageStart = d.aPageStart,
                                    g.adStartTime = d.adStartTime,
                                    g.safeFrameSrc = d.safeFrameSrc,
                                    g.abpStatus = d.abpStatus,
                                    "function" != typeof L.postMessage) {
                                        H(S, 1),
                                        U(A[d.arid].placementDivId),
                                        g.postMessage = "postMessageNotSupported";
                                        continue
                                    }
                                    H(T, 1),
                                    V(d.loadAfter, k(d), 0, n),
                                    g.postMessage = "postMessageSupported",
                                    g.loadAfter = d.loadAfter,
                                    E[d.arid].logTrace("additionalInitilizationParams", g)
                                } catch (e) {
                                    d = null,
                                    F("Error parsing sf tag", e)
                                }
                            }
                    }
                    ,
                    L.DAsf.loadAds()
                }
                function C(e, t, a, n) {
                    o[e] = o[e] || {},
                    o[e][a] = D.safeFunctionWrapper(n, F, "Error within ad handler " + a + ": " + t)
                }
                function M(e) {
                    var t = {};
                    try {
                        for (var a = L.location.search.substring(1).split("&"), n = 0; n < a.length; n++) {
                            var o = a[n].split("=")
                              , i = o[0];
                            1 < o.length && -1 < e.indexOf(i) && (t[i] = o[1])
                        }
                    } catch (e) {
                        F("Error parsing query parameters", e)
                    }
                    return t
                }
                function I(e) {
                    return function() {
                        c(e.arid, e.size.width, e.size.height, e.maxAdWidth, e.adCreativeMetaData.adProgramId, e.programIdsToCollapse, e.minWidthToPunt, _, A)
                    }
                }
                function k(t) {
                    return D.safeFunctionWrapper(function() {
                        var e = {
                            callbackOccurred: !0
                        };
                        e.loadAfter = t.loadAfter,
                        E[t.arid].logTrace("pageCallBack", e),
                        W(t.slot, t.placementId, x.CALLBACK, 1),
                        function(e, t) {
                            if (!e)
                                return !1;
                            var a = O.getElementById(e);
                            if (a && !a.innerHTML) {
                                var n = a.getAttribute(y);
                                if (n && n === t.arid)
                                    return !0
                            }
                            return !1
                        }(A[t.arid].placementDivId, t) && function(t) {
                            try {
                                var e = O.getElementById(A[t.arid].placementDivId)
                                  , a = {}
                                  , n = A[t.arid].iframeId
                                  , o = t.safeFrameSrc
                                  , i = l(t, n, o);
                                i.onload = function() {
                                    r.checkCache(t.DAsfUrl, t.safeFrameSrc, t.slot, t.placementId, W)
                                }
                                ,
                                e.appendChild(i),
                                P("cf", t.slot, t.placementId),
                                W(t.slot, t.placementId, x.IFRAME_CREATED, 1),
                                _.adMap[t.arid] = {
                                    slot: e,
                                    iframe: i,
                                    options: t
                                },
                                a.id = i.id,
                                a.src = i.src,
                                a.scrolling = i.scrolling,
                                a.height = i.height,
                                a.width = i.width,
                                a.className = i.className,
                                a.styleCssText = i.style.cssText,
                                a.sandbox = i.sandbox,
                                E[t.arid].logTrace("createSafeFrame", a)
                            } catch (e) {
                                F("Error creating safeFrame", e),
                                E[t.arid] && E[t.arid].logTrace("createSafeFrame", {
                                    error: {
                                        message: "errorCreatingSafeFrame",
                                        ex: e
                                    }
                                })
                            }
                        }(t)
                    }, F, "Error in callback to create Safeframe.")
                }
            }
            D.safeFunctionWrapper(function() {
                "undefined" == typeof JSON ? o("https://images-na.ssl-images-amazon.com/images/G/01/da/js/json3.min._V308851628_.js", i) : i()
            }, F, "Error initializing safeFrame")()
        }(window, document)
    }
    , {
        "../components/adBarTracer": 5,
        "../components/cacheChecker": 7,
        "../components/clickTrackingHelper": 8,
        "./components/adFeedback": 11,
        "./messenger/msgHandler": 13,
        "./metrics/counters": 14,
        "./metrics/csm": 15
    }],
    11: [function(e, t, a) {
        var w = e("../metrics/csm").sendCsmCounter
          , v = e("../metrics/counters")
          , y = e("../../components/ajaxRequest")
          , S = e("../../components/util").setObjectStyles;
        t.exports.appendAdFeedbackLinkToIframe = function(e, o, i) {
            var t, a = {};
            if (a.isFeedbackLoaded = e.isFeedbackLoaded,
            e && !e.isFeedbackLoaded && o.adFeedbackInfo.boolFeedback) {
                e.isFeedbackLoaded = !0;
                var n = e.parentNode
                  , r = o.placementId
                  , s = o.adFeedbackInfo.slugText
                  , d = o.adFeedbackInfo.endPoint
                  , l = o.advertisementStyle
                  , c = o.feedbackDivStyle
                  , u = v.FEEDBACK_COUNTERS
                  , p = {
                    adPlacementMetaData: o.adPlacementMetaData,
                    adCreativeMetaData: o.adCreativeMetaData
                };
                a.slot = n,
                a.placementId = r,
                a.slugText = s,
                a.endPoint = d,
                a.advertisementStyle = l,
                a.feedbackDivStyle = c,
                a.adFeedbackParams = p;
                var f = function(e, t, a, n) {
                    var o = document.createElement(e);
                    for (var i in t)
                        o.setAttribute(i, t[i]);
                    return S(o, a),
                    n && n.insertBefore(o, null),
                    o
                }
                  , m = n.getElementsByTagName("div")[0] || f("div", {
                    id: n.id + "_Feedback"
                }, c, n)
                  , g = function() {
                    i[o.arid].logTrace("adFeedBack", {
                        renderFallbackAdvertisement: !0
                    }),
                    w(o.slot, r, u.FALLBACK, 1),
                    (m.getElementsByTagName("div")[0] || f("div", 0, l, m)).innerHTML = s
                }
                  , h = d && d.length ? window.location.protocol + "//" + window.location.hostname + d + "?pl=" + (t = p,
                encodeURIComponent(JSON.stringify(t))) : d;
                a.requestUrl = h,
                i[o.arid].logTrace("adFeedBack", {
                    adFeedbackRequest: a
                }),
                h ? (w(o.slot, r, u.REQUEST, 1),
                y.sendAjaxRequest(h, "GET", null, null, function(e) {
                    var t = {
                        feedbackResponseStarted: !0
                    };
                    if (4 === e.readyState) {
                        if (200 === e.status)
                            try {
                                var a = e.responseText
                                  , n = JSON.parse(a);
                                (t.response = n) && "ok" === n.status ? ("html"in n && n.html && (m.innerHTML = n.html),
                                "script"in n && n.script && ((m.getElementsByTagName("script")[0] || f("script", 0, null, m)).innerHTML = n.script),
                                w(o.slot, r, u.SUCCESS, 1),
                                t.feedBackResponseReturned = !0) : g()
                            } catch (e) {
                                g()
                            }
                        else
                            t.feedBackResponseReturned = !1,
                            g();
                        i[o.arid].logTrace("adFeedBack", {
                            adFeedBackResponse: t
                        })
                    }
                }, g)) : g()
            }
        }
    }
    , {
        "../../components/ajaxRequest": 6,
        "../../components/util": 9,
        "../metrics/counters": 14,
        "../metrics/csm": 15
    }],
    12: [function(e, l, t) {
        function d(e, t, a) {
            var n = 0;
            return document.hidden ? n : (n = 0 < e ? a - e : 0 < t ? Math.min(t, a) : 0,
            Math.min(n, t - e))
        }
        function r() {
            try {
                var e = {};
                return e.t = window.screenY ? window.screenY : window.screenTop,
                e.l = window.screenX ? window.screenX : window.screenLeft,
                e.w = l.exports.windowWidth(),
                e.h = l.exports.windowHeight(),
                e.b = e.t + e.h,
                e.r = e.l + e.w,
                e
            } catch (e) {
                return null
            }
        }
        function s(e, t) {
            try {
                var a = {}
                  , n = c(e, t)
                  , o = function(e) {
                    try {
                        var t = {}
                          , a = l.exports.windowWidth()
                          , n = l.exports.windowHeight()
                          , o = Math.max(0, d(e.t, e.b, n))
                          , i = Math.max(0, d(e.l, e.r, a))
                          , r = o * i
                          , s = e.h * Math.min(e.w, l.exports.windowWidth());
                        return t.xiv = Number(Math.min(1, i / e.w).toFixed(2)),
                        t.yiv = Number(Math.min(1, o / e.h).toFixed(2)),
                        t.iv = Number(Math.min(1, Math.max(0, r / s)).toFixed(2)),
                        t
                    } catch (e) {
                        return null
                    }
                }(n);
                return a.t = n.t,
                a.l = n.l,
                a.r = n.r,
                a.b = n.b,
                a.w = n.w,
                a.h = n.h,
                a.z = n.z,
                a.xiv = o.xiv,
                a.yiv = o.yiv,
                a.iv = o.iv,
                a
            } catch (e) {
                return null
            }
        }
        function c(e, t) {
            try {
                var a = {}
                  , n = t || e.getBoundingClientRect();
                return a.t = n.top,
                a.l = n.left,
                a.r = n.right,
                a.b = n.bottom,
                a.w = n.width || a.r - a.l,
                a.h = n.height || a.b - a.t,
                a.z = e ? Number(window.getComputedStyle(e, null).zIndex) : NaN,
                a
            } catch (e) {
                return null
            }
        }
        function u(e, t) {
            try {
                var a = {}
                  , n = t || e.getBoundingClientRect();
                return a.t = n.top,
                a.l = n.left,
                a.r = l.exports.windowWidth() - n.right,
                a.b = l.exports.windowHeight() - n.bottom,
                a.xs = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > l.exports.windowWidth() ? 1 : 0,
                a.yx = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) > l.exports.windowHeight() ? 1 : 0,
                a
            } catch (e) {
                return null
            }
        }
        l.exports.findVerticalPositionReached = function() {
            try {
                return window.scrollY + l.exports.windowHeight()
            } catch (e) {
                return null
            }
        }
        ,
        l.exports.findDistanceFromViewport = function(e) {
            try {
                return e.getBoundingClientRect().top - l.exports.windowHeight()
            } catch (e) {
                return null
            }
        }
        ,
        l.exports.getViewableInfo = function(e) {
            var t = {};
            if (t.atf = function(e) {
                if (!e)
                    return "unknown";
                var t = function(e) {
                    try {
                        var t = c(e, null)
                          , a = l.exports.windowHeight()
                          , n = l.exports.windowWidth()
                          , o = document.body.getBoundingClientRect()
                          , i = Math.max(0, Math.min(o.left + n, t.r) - t.l)
                          , r = Math.max(0, Math.min(o.top + a, t.b) - t.t)
                          , s = i * r / (t.h * Math.min(t.w, n))
                          , d = Number(Math.min(1, Math.max(0, s)).toFixed(2));
                        return d
                    } catch (e) {
                        return null
                    }
                }(e);
                {
                    if (null == t)
                        return "unknown";
                    if (.5 <= t)
                        return !0
                }
                return !1
            }(e),
            !e)
                return t;
            var a = r()
              , n = s(e)
              , o = u(e);
            return a && n && o && (t.geom = {},
            t.geom.win = a,
            t.geom.self = n,
            t.geom.exp = o,
            t.payload = {},
            t.payload.wh = a.h,
            t.payload.ww = a.w,
            t.payload.sx = window.scrollX,
            t.payload.sy = window.scrollY,
            t.payload.ah = n.h,
            t.payload.aw = n.w,
            t.payload.top = n.t,
            t.payload.left = n.l),
            t
        }
        ,
        l.exports.takeSnapshotOfSlotPosition = function(e) {
            try {
                return {
                    initialBoundingRect: e.getBoundingClientRect(),
                    adHeight: e.offsetHeight,
                    adWidth: e.offsetWidth,
                    originalScrollX: window.scrollX,
                    originalScrollY: window.scrollY
                }
            } catch (e) {
                return null
            }
        }
        ,
        l.exports.getNoInventoryViewabilityData = function(e) {
            var t = {}
              , a = function(e) {
                try {
                    var t = e.initialBoundingRect
                      , a = t.top - (window.scrollY - e.originalScrollY)
                      , n = a + e.adHeight
                      , o = t.left - (window.scrollX - e.originalScrollX)
                      , i = o + e.adWidth;
                    return {
                        top: a,
                        bottom: n,
                        left: o,
                        right: i,
                        width: e.adWidth,
                        height: e.adHeight
                    }
                } catch (e) {
                    return null
                }
            }(e)
              , n = r()
              , o = s(null, a)
              , i = u(null, a);
            return n && o && i ? (t.geom = {},
            t.geom.win = n,
            t.geom.self = o,
            t.geom.exp = i,
            t.payload = {},
            t.payload.wh = n.h,
            t.payload.ww = n.w,
            t.payload.sx = window.scrollX,
            t.payload.sy = window.scrollY,
            t.payload.ah = o.h,
            t.payload.aw = o.w,
            t.payload.top = o.t,
            t.payload.left = o.l,
            t) : null
        }
        ,
        l.exports.windowHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }
        ,
        l.exports.windowWidth = function() {
            return window.innerWidth || document.documentElement.clientWidth
        }
    }
    , {}],
    13: [function(e, t, a) {
        var x = e("../components/viewability")
          , p = e("../../components/util")
          , n = e("../metrics/csm")
          , s = e("../metrics/counters").CUSTOM_MESSAGE_COUNTERS
          , o = n.sendCsmLatencyMetric
          , A = n.sendCsmCounter
          , i = {
            ERROR: "ERROR",
            WARN: "WARN",
            FATAL: "FATAL"
        }
          , c = r();
        function E(e, t) {
            var a = t || new Error(e);
            A("", null, "safeFrameError", 1),
            window.sfLogErrors && (window.ueLogError ? window.ueLogError(a, {
                logLevel: i.ERROR,
                attribution: "APE-safeframe",
                message: e + " "
            }) : "undefined" != typeof console && console.error && console.error(e, a))
        }
        function r() {
            var e = window.location.hostname.split(".").pop()
              , t = "na";
            return /^(com|ca|mx|br)$/.test(e) ? t = "na" : /^(uk|de|fr|it|es|in|ae|sa|nl)$/.test(e) ? t = "eu" : /^(jp|au)$/.test(e) ? t = "fe" : /^(cn)$/.test(e) && (t = "cn"),
            "https://images-" + t + ".ssl-images-amazon.com"
        }
        function u(e) {
            return e.replace(/^.{1,5}:\/\/|^\/\//, "")
        }
        function C(e) {
            var t = document.getElementById(e);
            void 0 !== t && t && (t.style.display = "none")
        }
        function M(e) {
            return !e || I(e) || 2 < (t = e).length && "px" === t.substring(t.length - 2) ? e : e + "px";
            var t
        }
        function I(e) {
            return 1 < e.length && "%" === e.charAt(e.length - 1)
        }
        function f(e, t, a, n) {
            var o = !1
              , i = function() {
                n(a, e) && (t(),
                o = !0)
            }
              , r = p.safeFunctionWrapper(p.throttle(function() {
                i(),
                o && (p.removeWindowListener("scroll", i),
                p.removeWindowListener("resize", i))
            }, 20));
            p.addWindowListener("scroll", r),
            p.addWindowListener("resize", r)
        }
        t.exports.util = p,
        t.exports.viewability = x,
        t.exports.messenger = new function(e, t, a) {
            var l = this;
            this.adMap = e || {},
            this.supportedCommands = t || {},
            this.msgListeners = a || {};
            var r = function(e) {
                var t = l.adMap
                  , a = t[e].options;
                if (t === {} || a === {})
                    return null;
                var n = "ape_" + a.slot + "_iframe";
                return t[e].iframe && (t[e].iframe = t[e].iframe && t[e].iframe.innerHTML ? t[e].iframe : document.getElementById(n)),
                t[e].iframe
            };
            this.sendMessageToAd = function(e, t, a) {
                var n = r(e)
                  , o = n ? n.contentWindow : null;
                if (o) {
                    var i = {
                        command: t,
                        data: a
                    };
                    i = JSON.stringify(i),
                    o.postMessage(i, "*")
                }
            }
            ,
            this.receiveMessage = function(t) {
                var e = l.adMap
                  , a = l.supportedCommands;
                if (e !== {}) {
                    var n, o, i, r, s;
                    try {
                        if (t.data && t.data.message && t.data.message.id && -1 < t.data.message.id.toLowerCase().indexOf("mash"))
                            throw "Received Mash message";
                        o = e[(n = JSON.parse(t.data)).arid]
                    } catch (e) {
                        return
                    }
                    try {
                        if (s = t,
                        !(r = o) || !r.options || u(s.origin) !== u(c) || "object" != typeof n.data || !a.hasOwnProperty(n.command))
                            throw "Invalid Message: " + JSON.stringify(t.data);
                        var d = a[n.command];
                        d && (o.options.debug && "undefined" != typeof console && console.log(t),
                        d(o, n.data))
                    } catch (e) {
                        i = "Problem with message: " + t.data,
                        void 0 !== n && (i += l.appendErrorDetails(n.arid)),
                        E(i, e)
                    }
                }
            }
            ,
            this.appendErrorDetails = function(e) {
                var t = l.adMap;
                if (t === {})
                    return "";
                var a = "";
                if (void 0 !== t[e]) {
                    var n = t[e].options;
                    void 0 !== n.aanResponse && (a = " Ad Details: " + JSON.stringify(n.aanResponse))
                }
                return a
            }
            ,
            this.customMessage = function(e, t, a, n, o) {
                var i = l.msgListeners;
                try {
                    "undefined" !== a && Array.isArray(a) && (-1 < a.indexOf(e) && i[e] ? (A(null, null, s.ALLOWLISTED + ":" + e, 1),
                    i[e](t)) : -1 === a.indexOf(e) ? (A(null, null, s.NOT_ALLOWLISTED, 1),
                    A(n, o, s.NOT_ALLOWLISTED, 1)) : E("Unrecognized custom message key: " + e))
                } catch (e) {
                    E("Custom Message Error", e)
                }
            }
            ,
            this.registerCustomMessageListener = function(e, t, a) {
                var n = !1
                  , o = l.msgListeners;
                try {
                    !o[e] || "function" != typeof o[e] || a ? (o[e] = t,
                    n = !0) : E("Duplicate Key", new Error("Custom message listener already exists for key: " + e))
                } catch (e) {
                    E("Error registering custom message listener", e)
                }
                return n
            }
            ,
            this.sendCustomMessage = function(e, t) {
                var a = l.adMap
                  , n = {
                    key: e,
                    data: t
                };
                for (var o in a)
                    l.sendMessageToAd(o, "customMessage", n)
            }
            ,
            this.sendCustomMessageToAd = function(e, t, a) {
                var n = {
                    key: t,
                    data: a
                };
                l.sendMessageToAd(e, "customMessage", n)
            }
            ,
            this.takeSnapshotOfSlotPosition = function(e) {
                var t = l.adMap
                  , a = t && t[e] && t[e].options;
                if (t && t !== {} && a && a !== {}) {
                    var n = r(e);
                    l.adMap[e].options.slotSnapshot = x.takeSnapshotOfSlotPosition(n)
                }
            }
            ,
            this.updateViewability = function(e) {
                var t = l.adMap
                  , a = t && t[e] && t[e].options;
                if (t && t !== {} && a && a !== {}) {
                    var n = r(e)
                      , o = t[e].options.viewabilityStandards
                      , i = x.getViewableInfo(n);
                    null !== i && (i.viewabilityStandards = o,
                    l.sendMessageToAd(e, "updateViewability", i))
                }
            }
            ,
            this.updateNoInventoryViewability = function(e) {
                var t = l.adMap
                  , a = t && t[e] && t[e].options
                  , n = a && a.slotSnapshot;
                if (t && t !== {} && a && a !== {} && n) {
                    var o = a.viewabilityStandards
                      , i = x.getNoInventoryViewabilityData(n);
                    null !== i && (i.viewabilityStandards = o,
                    l.sendMessageToAd(e, "updateViewability", i))
                }
            }
        }
        ,
        t.exports.logError = E,
        t.exports.SF_DOMAIN = c,
        t.exports.loadScript = function(e, t) {
            var a = document.createElement("script");
            a.src = e,
            a.setAttribute("crossorigin", "anonymous"),
            a.onload = a.onreadystatechange = function() {
                a.readyState && "loaded" !== a.readyState && "complete" !== a.readyState || (a.onload = a.onreadystatechange = null,
                t && "function" == typeof t && t())
            }
            ,
            a.onerror = function(e) {
                return E("Error loading script", e),
                !1
            }
            ,
            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
        }
        ,
        t.exports.fireViewableLatencyMetrics = function(e, t, a, n) {
            window.apeViewableLatencyTrackers && window.apeViewableLatencyTrackers[e] && window.apeViewableLatencyTrackers[e].valid && (window.apeViewableLatencyTrackers[e].loaded = !0,
            window.apeViewableLatencyTrackers[e].viewed && (o("ld", t, a, "viewablelatency", n),
            A(t, a, "htmlviewed:loaded", 1)))
        }
        ,
        t.exports.hasClass = function(e, t) {
            var a = new RegExp("(^|\\s)" + t + "(\\s|$)")
              , n = e.className;
            return n && a.test(n)
        }
        ,
        t.exports.createIframeWithAttributes = function(e, t, a) {
            var n = document.createElement("iframe");
            return n.name = JSON.stringify(e),
            n.id = t,
            n.src = a,
            n.height = M(e.size.height) || "250px",
            n.width = M(e.size.width) || "300px",
            n.className = e.iframeClass || "",
            n.setAttribute("frameborder", "0"),
            n.setAttribute("marginheight", "0"),
            n.setAttribute("marginwidth", "0"),
            n.setAttribute("scrolling", "no"),
            n.setAttribute("allowtransparency", "true"),
            n.setAttribute("data-arid", e.arid),
            n.style.cssText = e.iframeExtraStyle || "",
            n.sandbox = "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin",
            /(Chrome|Safari|AppleWebKit|Amazon)/.test(navigator.userAgent) ? n.sandbox += " allow-top-navigation-by-user-activation" : n.sandbox += " allow-top-navigation",
            n
        }
        ,
        t.exports.logCounter = function(e, t) {
            window.ue && "function" == typeof window.ue.count && window.ue.count(e, t)
        }
        ,
        t.exports.collapseSlot = C,
        t.exports.resizeSafeFrameAd = function(t, e, a, n, o, i, r, s, d) {
            try {
                var l = document.getElementById(d[t].placementDivId)
                  , c = document.getElementById(d[t].wrapperDivId) || l
                  , u = document.getElementById(d[t].iframeId);
                if (null === c || null === l || null === u)
                    return;
                if (r && i && -1 < i.indexOf(o) && 0 < l.offsetWidth && l.offsetWidth < r)
                    return A(d[t].slotId, null, "puntOnMinWidth:afterRendering", 1),
                    void C(d[t].placementDivId);
                var p = I(a)
                  , f = I(e)
                  , m = !f && !p
                  , g = f ? u.offsetWidth : parseInt(e, 10)
                  , h = p ? u.offsetHeight : parseInt(a, 10)
                  , w = parseInt(n, 10)
                  , v = function(e) {
                    m && (h = Math.round(e * h / g)),
                    g = Math.round(e)
                }
                  , y = 0 === c.offsetWidth ? x.windowWidth() : c.offsetWidth;
                w && x.windowHeight() < x.windowWidth() ? v(w) : v(y),
                s && s.adMap && s.adMap[t] && s.adMap[t].options && s.adMap[t].options.slotSnapshot && (s.adMap[t].options.slotSnapshot.adHeight = h,
                s.adMap[t].options.slotSnapshot.adWidth = g);
                var S = M(g)
                  , T = M(m ? h : a);
                u.style.height = T;
                var b = {
                    width: u.style.width = S,
                    height: T
                };
                c !== l && (l.style.height = T,
                s.sendMessageToAd(t, "resizeCreativeWrapper", b)),
                "Detail_hero-quick-promo_Desktop" === d[t].slotId && (A(d[t].slotId, s.adMap[t].options.placementId, "OffsetLeft", u.offsetLeft),
                A(d[t].slotId, s.adMap[t].options.placementId, "OffsetTop", u.offsetTop),
                A(d[t].slotId, s.adMap[t].options.placementId, "OffsetWidth", u.offsetWidth),
                A(d[t].slotId, s.adMap[t].options.placementId, "OffsetHeight", u.offsetHeight))
            } catch (e) {
                E("Error resizing ad: " + d[t].slotId, e)
            }
        }
        ,
        t.exports.delayLoad = function(e, t, a, n) {
            var o = "undefined" != typeof P
              , i = "undefined" != typeof amznJQ
              , r = "number" == typeof a && 0 !== a ? function() {
                setTimeout(t, a)
            }
            : t;
            if ("windowOnLoad" === e)
                "complete" === document.readyState ? r() : p.addWindowListener("load", r);
            else if ("spATFEvent" === e)
                o ? P.when("search-page-utilities").execute(function(e) {
                    e.afterEvent("spATFEvent", r)
                }) : i ? amznJQ.available("search-js-general", function() {
                    window.SPUtils.afterEvent("spATFEvent", r)
                }) : r();
            else if ("aboveTheFold" === e)
                o ? P.when("af").execute(r) : i ? amznJQ.onCompletion("amznJQ.AboveTheFold", r) : r();
            else if ("criticalFeature" === e)
                o ? P.when("cf").execute(r) : i ? amznJQ.onCompletion("amznJQ.criticalFeature", r) : r();
            else if ("r2OnLoad" === e)
                o ? P.when("r2Loaded").execute(r) : i ? amznJQ.onReady("r2Loaded", r) : r();
            else if (e.match("[^:]+:.+")) {
                var s = e.split(":")
                  , d = s[0].split(".")
                  , l = s[1]
                  , c = 2 < s.length ? s[2] : l;
                o ? P.when(c, "A").execute(r) : i && 1 < d.length ? amznJQ[d[1]](l, r) : r()
            } else if (e.match(/^\d{1,4}px$/g))
                f(parseInt(e, 10), r, n, function(e, t) {
                    return e && x.findDistanceFromViewport(e) <= t
                });
            else {
                var u = /^reached(\d{1,5}px)FromTop$/g.exec(e);
                u ? f(parseInt(u[1], 10), r, n, function(e, t) {
                    return x.findVerticalPositionReached() >= t
                }) : r()
            }
        }
        ,
        t.exports.getMediaCentralOrigin = r,
        t.exports.sizeValidator = function(e, t) {
            return e.height === t.height && e.width === t.width
        }
        ,
        t.exports.checkAgainstAllowlist = function(e, t, a) {
            if (!t || "object" != typeof t)
                return !1;
            for (var n = 0, o = t.length; n < o; n++)
                if (a(e, t[n]))
                    return !0;
            return !1
        }
    }
    , {
        "../../components/util": 9,
        "../components/viewability": 12,
        "../metrics/counters": 14,
        "../metrics/csm": 15
    }],
    14: [function(e, t, a) {
        t.exports.AD_LOAD_COUNTERS = {
            START: "adload:start",
            CALLBACK: "adload:delayloadcallback",
            IFRAME_CREATED: "adload:iframecreated"
        },
        t.exports.CACHE_COUNTERS = {
            SF_LIBRARY: "cache:sflibrary:",
            SF_HTML: "cache:sfhtml:"
        },
        t.exports.FEEDBACK_COUNTERS = {
            REQUEST: "adfeedback:request",
            SUCCESS: "adfeedback:success",
            FALLBACK: "adfeedback:fallback"
        },
        t.exports.MESSENGER_COUNTERS = {
            API: "messenger:"
        },
        t.exports.ABP_STATUS_COUNTERS = {
            1: "abpstatus:enabled",
            0: "abpstatus:notenabled",
            "-1": "abpstatus:unknown"
        },
        t.exports.SF_VERSION_COUNTERS = {
            VERSION: "sfversion"
        },
        t.exports.RESOURCE_TIMING_DATA_COUNTERS = {
            NEXUS_CLIENT_NOT_DEFINED: "ResourceTimingData.NexusClientNotDefined",
            LOGGING_FAILED: "ResourceTimingData.LoggingFailed",
            LOGGING_SUCCESSFUL: "ResourceTimingData.LoggingSuccessful",
            DEPENDENCIES_NOT_MET: "ResourceTimingData.DependenciesNotMet"
        },
        t.exports.CUSTOM_MESSAGE_COUNTERS = {
            ALLOWLISTED: "custommessage:allowlisted",
            NOT_ALLOWLISTED: "custommessage:notallowlisted"
        }
    }
    , {}],
    15: [function(e, t, a) {
        var s = {
            bb: "uet",
            af: "uet",
            cf: "uet",
            be: "uet",
            ld: "uex"
        };
        function d(e, t, a, n) {
            var o = [e, t, a];
            return n && o.push(n),
            o
        }
        t.exports.sendCsmLatencyMetric = function(e, t, a, n, o) {
            if (s.hasOwnProperty(e)) {
                var i = s[e]
                  , r = n ? n + ":" : "";
                "function" == typeof window[i] && (window[i].apply(this, d(e, "adplacements:" + r + t.replace(/_/g, ":"), {
                    wb: 1
                }, o)),
                a && window[i].apply(this, d(e, "adplacements:" + r + a, {
                    wb: 1
                }, o)))
            }
        }
        ,
        t.exports.sendCsmCounter = function(e, t, a, n) {
            if (window.ue && "function" == typeof window.ue.count) {
                var o = "adplacements:" + a;
                if (e && (o += ":" + e.replace(/_/g, ":")),
                window.ue.count(o, n),
                t) {
                    var i = "adplacements:" + (a && t ? a + ":" : a) + t;
                    window.ue.count(i, n)
                }
            }
        }
        ,
        t.exports.addCsmTag = function(e, t, a, n) {
            if (window.ue && window.ue.tag) {
                var o = e + ":" + t.replace(/_/g, ":") + (n ? ":" + n : "");
                if (window.ue.tag(o),
                a) {
                    var i = e + ":" + a + (n ? ":" + n : "");
                    window.ue.tag(i)
                }
            }
        }
    }
    , {}]
}, {}, [10]);
