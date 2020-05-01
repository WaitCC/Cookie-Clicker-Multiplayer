// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    var data;
    var url;
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
                    Game.Notify("Cookie Clicker Multiplayer","Mod loaded!",null,true);
            clearInterval(checkReady);
        }
    }, 1000);
    url = "http://secretsociety.store:5750";
    var uploadData = setInterval(function() {
        data = "method=post&name="+Game.bakeryName+"&cookies="+Game.cookies+"&cps="+Game.cookiesPs;
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url+"?"+data,true);
        xhr.send();
    },3000);
})();
