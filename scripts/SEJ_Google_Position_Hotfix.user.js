// ==UserScript==
// @name         SEJ Google Position Hotfix
// @namespace    https://local.test/sej-google-hotfix
// @version      0.1.0
// @description  Hotfix: keep searchEngineJump bar aligned under Google search box without restarting Chrome
// @author       codex
// @match        *://www.google.*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var timer = null;

    function getSEJ() {
        return document.querySelector('#sej-container');
    }

    function getSearchBox() {
        return document.querySelector('form[role="search"] .A8SBwf')
            || document.querySelector('.A8SBwf')
            || null;
    }

    function getAnchor() {
        return document.querySelector('div.Fgyi2e.rZj61')
            || document.querySelector('div.Fgyi2e')
            || document.querySelector('div.GG4mbd')
            || document.querySelector('div.CvDJxb')
            || document.querySelector('#appbar')
            || null;
    }

    function applyHotfix() {
        var sej = getSEJ();
        if (!sej) return;

        var anchor = getAnchor();
        if (anchor && sej.parentElement !== anchor) {
            anchor.appendChild(sej);
        }

        sej.style.position = 'relative';
        sej.style.left = '0';
        sej.style.right = 'auto';
        sej.style.top = 'auto';
        sej.style.marginTop = '6px';
        sej.style.marginBottom = '0';
        sej.style.transform = 'none';
        sej.style.boxSizing = 'border-box';

        var box = getSearchBox();
        if (!box || !sej.parentElement) return;

        var boxRect = box.getBoundingClientRect();
        var parentRect = sej.parentElement.getBoundingClientRect();
        var left = Math.round(boxRect.left - parentRect.left);
        var width = Math.round(boxRect.width);

        if (width > 0) {
            sej.style.marginLeft = left + 'px';
            sej.style.width = width + 'px';
            sej.style.maxWidth = width + 'px';
        }
    }

    function schedule() {
        if (timer) return;
        timer = setTimeout(function () {
            timer = null;
            applyHotfix();
        }, 50);
    }

    new MutationObserver(schedule).observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });

    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });

    setInterval(applyHotfix, 1000);
    applyHotfix();
})();
