"use strict";
// ==UserScript==
// @name         On Off UI Netflix
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.netflix.com/*
// @icon         https://www.google.com/s2/favicons?domain=netflix.com
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function () {
    window.onload = () => {
        const KEY = "u";
        let switchUI = true;
        window.addEventListener('keydown', (e) => {
            if (e.key == KEY) {
                if (switchUI) {
                    console.log("UI OFF");
                    switchUI = false;
                }
                else {
                    console.log("UI On");
                    switchUI = true;
                }
            }
        }, false);
        let E_player = document.querySelector("[data-uia=\"player\"]");
        let GetPlayerInterval = setInterval(() => {
            if (E_player == null) {
                E_player = document.querySelector("[data-uia=\"player\"]");
            }
            else {
                E_player.addEventListener("DOMSubtreeModified", () => {
                    const MyElement = document.evaluate("//*[@id=\"appMountPoint\"]/div/div/div[1]/div/div[2]/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (MyElement != null) {
                        if (!switchUI) {
                            MyElement.style.display = "none";
                            if (!(MyElement.style.display == "none")) {
                                console.log("UI Error");
                            }
                            let Time = document.querySelector("[data-uia=\"controls-time-remaining\"]");
                            if (Time != null) {
                                Time.addEventListener("DOMSubtreeModified", (e) => {
                                    console.log(e.target.textContent);
                                });
                            }
                        }
                        else {
                            MyElement.style.display = "";
                        }
                    }
                });
                clearInterval(GetPlayerInterval);
            }
        }, 300);
    };
})();
