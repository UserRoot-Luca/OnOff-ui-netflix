"use strict";
// ==UserScript==
// @name         On Off UI Netflix
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.netflix.com/*
// @icon         https://www.google.com/s2/favicons?domain=netflix.com
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function () {
    document.onload = () => {
        const KEY = "u";
        let switchUI = true;
        window.addEventListener('keydown', (e) => {
            if (e.key == KEY) {
                if (switchUI) {
                    switchUI = false;
                }
                else {
                    switchUI = true;
                }
            }
        }, false);
        document.querySelector("[data-uia=\"player\"]").addEventListener("DOMSubtreeModified", () => {
            const MyElement = document.evaluate("//*[@id=\"appMountPoint\"]/div/div/div[1]/div/div[2]/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (MyElement != null) {
                if (!switchUI) {
                    MyElement.style.display = "none";
                }
                else {
                    MyElement.style.display = "";
                }
            }
        });
    };
})();
