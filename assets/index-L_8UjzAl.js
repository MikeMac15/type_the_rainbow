(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();var n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=Symbol.for("react.transitional.element"),d=Symbol.for("react.fragment");function u(l,r,o){var s=null;if(o!==void 0&&(s=""+o),r.key!==void 0&&(s=""+r.key),"key"in r){o={};for(var e in r)e!=="key"&&(o[e]=r[e])}else o=r;return r=o.ref,{$$typeof:c,type:l,key:s,ref:r!==void 0?r:null,props:o}}n.Fragment=d;n.jsx=u;n.jsxs=u;
