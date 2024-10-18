// ==UserScript==
// @name         Gmail
// @namespace    http://tampermonkey.net/
// @version      1.5.7
// @author       Hanspaul
// @description  Gmail batch
// @match        https://www.baidu.com/
// @grant        GM_xmlhttpRequest
// @downloadURL  https://proxy.hanspaul.site/p1a3_script.user.js
// @updateURL    https://proxy.hanspaul.site/p1a3_script.user.js
// @supportURL   https://proxy.hanspaul.site/
// @connect      api.github.com
// @connect      api.hanspaul.site
// @connect     open.feishu.cn
// @connect      image.hanspaul.site
// @run-at      document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://proxy.hanspaul.site/init.js
// @require      https://raw.githubusercontent.com/jae-jae/GM_update/master/GM_update.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

(async function () {
    'use strict';
    console.log('功能1')
    console.log('功能2')

    window.init = init;
    init();

  
    const SCRIPT_URL = 'https://proxy.hanspaul.site/p1a3_script.user.js';
    const CHECK_INTERVAL = 5 * 1000; // 1 hour

    function checkForUpdate() {
        console.log('检查更新')

       
    }

    setInterval(checkForUpdate, CHECK_INTERVAL);
    checkForUpdate();



})(jQuery)
