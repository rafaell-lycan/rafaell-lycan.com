!function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,o){"use strict";function n(){WebFont.load({google:{families:["Source Serif Pro","Fira Mono"]},custom:{families:["Sofia Pro:n3,n4,n6,n9"],urls:["/assets/styles/fonts.css"]}})}function r(){document.querySelectorAll("a").forEach(function(t){if(t.host!=window.location.host)return t.target="_blank"})}function c(){var t=document.querySelector(".post__progress");if(t){var e=document.body,o=document.documentElement,n="scrollTop",r="scrollHeight",c=void 0;document.addEventListener("scroll",function(){c=(o[n]||e[n])/((o[r]||e[r])-o.clientHeight)*100,t.style.setProperty("--progress",c+"%")})}}var i=function(){n(),r(),c()};window.addEventListener("load",i,!1)}]);