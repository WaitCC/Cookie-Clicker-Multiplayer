// ==UserScript==
// @name         Cookie Clicker Multiplayer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds multiplayer functionality to Cookie Clicker
// @author       Louis Rust
// @match        https://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var toggle = 0;
    var url = "http://secretsociety.store:5750";

    function init() {
        var style = document.createElement("style");
        style.innerHTML = "#leaderboardTable {margin: 10px;min-height:50px;text-align: left;} #lbLabel {text-align: left;padding-right: 100px;} #lbSpacer {height:10px;}";
        document.head.appendChild(style);
        var lbTable = document.createElement("table");
        var titleRow = document.createElement("tr");
        titleRow.innerHTML = "<td id='lbLabel'>Name</td><td id='lbLabel'>CPS</td><td id='lbLabel'>Cookies</td>";
        lbTable.setAttribute("id","leaderboardTable");
        document.getElementById("buildingsMaster").appendChild(lbTable);
        lbTable.appendChild(titleRow);
        addLeaderboardStats();
    }
    function addLeaderboardStats() {
        var refreshLeaderboard = setInterval(function() {
            var table = document.getElementById("leaderboardTable");
            var getLeaderboardData = new XMLHttpRequest();
            getLeaderboardData.open("GET",url+"?apiAction=get",false);
            getLeaderboardData.send(null);
            var leaderboardData = JSON.parse(getLeaderboardData.responseText);
            for (var x in leaderboardData) {
                var identifier = "user-"+leaderboardData[x].name.replace(" ","-");
                if (document.getElementById(identifier)) {
                    var userData = "<td id='leaderboardName'>"+leaderboardData[x].name+"</td><td id='leaderboardCPS'>"+Beautify(Math.floor(leaderboardData[x].cps))+"</td><td id='leaderboardCookies'>"+Beautify(Math.floor(leaderboardData[x].cookies))+"</td>";
                    document.getElementById(identifier).innerHTML = userData;
                } else {
                    if (document.getElementById("lbSpacer")) {document.getElementById("lbSpacer").parentNode.removeChild(document.getElementById("lbSpacer"));}
                    var row = document.createElement("tr");
                    row.setAttribute("id","user-"+leaderboardData[x].name.replace(" ","-"));
                    var nameCol = document.createElement("td");
                    nameCol.innerHTML=leaderboardData[x].name;
                    var cpsCol = document.createElement("td");
                    cpsCol.innerHTML=Beautify(Math.floor(leaderboardData[x].cps));
                    var cookiesCol = document.createElement("td");
                    cookiesCol.innerHTML=Beautify(Math.floor(leaderboardData[x].cookies));
                    row.appendChild(nameCol);
                    row.appendChild(cpsCol);
                    row.appendChild(cookiesCol);
                    table.appendChild(row);
                    var spacer = document.createElement("div");
                    spacer.setAttribute("id","lbSpacer");
                    table.appendChild(spacer);
                }
            }
            if (!document.getElementById("lbSpacer")) {
                var spacer = document.createElement("div");
                spacer.setAttribute("id","lbSpacer");
                table.appendChild(spacer);
            }
        },3000);
    }
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.Notify("Cookie Clicker Multiplayer","Mod loaded!",null,true);
            init();
            clearInterval(checkReady);
        }
    }, 1000);
    var uploadData = setInterval(function() {
        var data = "apiAction=post&name="+Game.bakeryName+"&cookies="+Game.cookies+"&cps="+Game.cookiesPs;
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url+"?"+data,true);
        xhr.send();
    },3000);

    function stopIntervals() {
        clearInterval(refreshLeaderboard);
        clearInterval(uploadData);
    }

})();
