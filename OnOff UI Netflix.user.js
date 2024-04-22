"use strict";
// ==UserScript==
// @name         On Off UI Netflix
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.netflix.com/*
// @icon         https://www.google.com/s2/favicons?domain=netflix.com
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function () {
    window.onload = () => {
        const KEY_UI = "u";
        const KEY_TIME = "t";
        let switchUI = true;
        let switchTIME = false;
        let old_text = "";
        window.addEventListener('keydown', (e) => {
            if (e.key == KEY_UI) {
                if (switchUI) {
                    console.log("UI OFF");
                    switchUI = false;
                }
                else {
                    console.log("UI On");
                    switchUI = true;
                }
            }
            if (e.key == KEY_TIME) {
                if (switchTIME) {
                    console.log("TIME OFF");
                    switchTIME = false;
                }
                else {
                    console.log("TIME On");
                    switchTIME = true;
                }
            }
        }, false);
        const TimeMultiplier = (seconds, speed) => {
            if (speed >= 1) {
                return seconds / speed;
            }
            return seconds;
        };
        const TimeFormats = (seconds, speed) => {
            let s = TimeMultiplier(seconds, speed);
            let m = Math.floor((s % 3600) / 60);
            let h = Math.floor(s / 3600);
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
        };
        let E_player = document.querySelector("[data-uia=\"player\"]");
        let GetPlayerInterval = setInterval(() => {
            if (E_player == null) {
                E_player = document.querySelector("[data-uia=\"player\"]");
            }
            else {
                E_player.addEventListener("DOMSubtreeModified", () => {
                    const MyElement = document.evaluate("//*[@id=\"appMountPoint\"]/div/div/div[1]/div/div/div[2]/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (MyElement != null) {
                        if (!switchUI) {
                            MyElement.style.display = "none";
                            if (!(MyElement.style.display == "none")) {
                                console.log("UI Error");
                            }
                        }
                        else {
                            MyElement.style.display = "";
                        }
                    }
                    if (switchTIME) {
                        let video = document.querySelector("video");
                        if (video != null) {
                            let playbackSpeed = video.playbackRate;
                            let duration = video.duration;
                            let currentSeconds = video.currentTime;
                            let remainingTime = duration - currentSeconds;
                            let endOra = new Date(new Date().getTime() + (TimeMultiplier(remainingTime, playbackSpeed) * 1000));
                            let new_text = `${TimeFormats(duration, 1)} ( -${TimeFormats(remainingTime, playbackSpeed)} / ${endOra.getHours().toString().padStart(2, '0')}:${endOra.getMinutes().toString().padStart(2, '0')} )`;
                            if (new_text != old_text) {
                                console.clear();
                                console.log(new_text);
                                old_text = new_text;
                            }
                        }
                    }
                });
                clearInterval(GetPlayerInterval);
            }
        }, 300);
    };
})();
