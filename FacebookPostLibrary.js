// facebookPostLibrary.js

class FacebookPostLibrary {
    constructor() {
        this.facebookconfigurl = 'https://github.com/hanxizu/facebook/raw/refs/heads/main/fbcommentconfig.csv';
        this.maincss = 'DIV:nth-of-type(1) > ul > LI:nth-of-type(1) > DIV[data-visualcompletion="ignore-dynamic"] a';
        this.popcommentcss = '.xwib8y2:nth-child(1) .xi81zsa:nth-child(1) .xdj266r:nth-child(1)';
        this.firstcommentcss = '.xwib8y2:nth-child(1) .x1r8uery:nth-child(2) .xzsf02u:nth-child(1)';
        this.sendbuttoncss = '#focused-state-composer-submit .x1i10hfl';
        this.closebutton = '.html-div:nth-child(3) > .x1i10hfl';
        this.commentallcss = 'div > .x1yztbdb:nth-child(1) .x9f619:nth-child(2) > .x1i10hfl:nth-child(1) > .x9f619:nth-child(1)';
        this.grouppageformcss = '.xu06os2:nth-of-type(4) INPUT';
        this.grouppagecss = 'LI:nth-of-type(4) .x1r8uery DIV.x9f619';

        this.initialPageUrl = "https://www.facebook.com/";
        this.newcommentWindow = null;
    }

    async checkmainelement() {
        await this.waitForElement(this.maincss);
        await this.getElementText(this.maincss);
    }

    async getElementText(selector) {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            console.log('Element found:', targetElement);
            const text = targetElement.textContent || targetElement.innerText;
            const groupurl = `https://www.facebook.com/search/posts?q=${encodeURIComponent(text)}`;
            await this.openNewURL(groupurl);
            console.log('Text:', text);
        } else {
            console.log('Element not found.');
        }
    }

    async openNewURL(url) {
        this.newcommentWindow = window.open(url, '_blank');
    }

    async hoverAndClicktext(selectortext) {
        const element = document.querySelector(selectortext);
        if (element) {
            const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
            element.dispatchEvent(mouseOverEvent);
            console.log('Hovered over element:', element);
            await this.delay(500);
            element.click();
            await this.delay(2000);
            console.log('Element clicked:', element);
            return true;
        } else {
            console.log('No element found for selector or XPath');
            return false;
        }
    }

    async hoverAndClick(element) {
        if (element) {
            const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
            element.dispatchEvent(mouseOverEvent);
            console.log('Hovered over element:', element);
            await this.delay(1000);
            element.click();
            await this.delay(2000);
            console.log('Element clicked:', element);
            return true;
        } else {
            console.log('No element found for selector or XPath');
            return false;
        }
    }

    async clickElementsInCollection(selector) {
        const postconfigurl = this.facebookconfigurl;
        const urldata = await fetchAndConvertCSV(postconfigurl);
        const limit = urldata[1][1];
        console.log('limit' + limit)

        let count = 1; // 初始化计数器，从1开始

        console.log('Clicking elements in collection:', selector);
        const elements = Array.from(document.querySelectorAll(selector)).slice(0, limit);
        console.log('elements length' + elements.length);

        for (const element of elements) {
            try {
                await hoverAndClick(element);
                await delay(2000);

                const editorId = this.popcommentcss
                const JSeditorId = await waitForElement(editorId);
                if (JSeditorId) {
                    await startinsertText(editorId);
                } else {
                    const currentloop = count;
                    const currentcommentcss = `div:nth-child(${currentloop}) > .x1yztbdb:nth-child(1) .xb57i2i:nth-child(1) .xdj266r:nth-child(1)`;
                    await waitForElement(currentcommentcss);
                    await startinsertText(currentcommentcss);
                }

                const JSsend = this.sendbuttoncss
                const JSJSsendexist = await waitForElement(JSsend);
                if (JSJSsendexist) {
                    await hoverAndClicktext(JSsend);
                } else {
                    const nosendcommentcss = this.firstcommentcss
                    await hoverAndClicktext(nosendcommentcss);
                    console.log('再次点击输入框')
                    await delay(1000);
                    await hoverAndClicktext(JSsend);
                }

                const JSclose = this.closebutton
                await waitForElement(JSclose);
                await hoverAndClicktext(JSclose);
                await delay(2000);
            } catch (error) {
                console.error('Error in processing element:', error);
            }
            count++; // 每次循环后递增计数器
        }
    }

    async startinsertText(selector) {
        const randondata = await this.getRandomValueFrom();
        console.log('Random value (excluding first row):', randondata);
        await this.insertText(selector, randondata);
        await this.delay(1000);
        console.log('Text:', randondata);
    }

    async waitForElement(selector, timeout = 10000) {
        return new Promise((resolve) => {
            // 如果元素已经存在，立即返回 true
            if (document.querySelector(selector)) {
                return resolve(true);
            }

            // 使用 MutationObserver 来监听 DOM 变化
            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(true);  // 当找到元素时，返回 true
                    observer.disconnect();
                }
            });

            // 开始监听 DOM 变化
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 超时处理，超时后返回 false
            setTimeout(() => {
                observer.disconnect();
                resolve(false);  // 超时返回 false
            }, timeout);
        });
    }

    async insertText(editorId, text) {
        console.log('Inserting text into editor:', text);
        const editor = document.querySelector(editorId);
        editor.focus();
        editor.click();
        await this.delay(1000);
        document.execCommand('insertText', false, text);
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async checkcommenctcss() {
        await this.waitForElement(this.commentallcss);
        await this.clickElementsInCollection(this.commentallcss);
    }

    async checkgroupcss() {
        const grouppageformcsstext = this.grouppageformcss;
        await this.waitForElement(grouppageformcsstext);
        await this.hoverAndClick(document.querySelector(grouppageformcsstext));
        await this.delay(1000);

        const grouppagecsstext = this.grouppagecss
        await this.waitForElement(grouppagecsstext);
        await this.hoverAndClick(document.querySelector(grouppagecsstext));
    }

    async getRandomValueFrom() {
        const postconfigurl = this.facebookconfigurl;

        const urldata = await fetchAndConvertCSV(postconfigurl);
        console.log('urldata' + urldata)
        const url = urldata[1][0];
        const postnumber = urldata[1][1]
        console.log("Random URL:", url);
        console.log("postnumber:", postnumber);

        try {
            const jsonData = await fetchAndConvertXLSX(url);
            const randomValue = await getRandomValueFromJSON(jsonData);
            return randomValue

        } catch (error) {
            console.error("Failed to fetch and convert XLSX or get random value:", error);
        }
    }

    async getRandomValueFromJSON(jsonData) {
        if (!Array.isArray(jsonData) || jsonData.length < 2) {
            throw new Error("Invalid JSON data or not enough rows");
        }

        const dataWithoutHeader = jsonData.slice(1);

        const randomRowIndex = Math.floor(Math.random() * dataWithoutHeader.length);
        const randomRow = dataWithoutHeader[randomRowIndex];

        if (Array.isArray(randomRow)) {
            const randomValueIndex = Math.floor(Math.random() * randomRow.length);
            return randomRow[randomValueIndex];
        } else if (typeof randomRow === 'object' && randomRow !== null) {
            const keys = Object.keys(randomRow);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return randomRow[randomKey];
        } else {
            return randomRow;
        }
    }

    async fetchAndConvertXLSX(url) {
        async function fetchXLSX(url) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    responseType: 'arraybuffer',
                    onload: function (response) {
                        if (response.status === 200) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Failed to fetch XLSX. Status: ${response.status}`));
                        }
                    },
                    onerror: function (error) {
                        reject(error);
                    }
                });
            });
        }

        async function xlsxToJSON(data) {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        }

        try {
            const xlsxData = await fetchXLSX(url);
            const jsonData = await xlsxToJSON(xlsxData);
            console.log("XLSX data as JSON:", jsonData);
            return jsonData;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async fetchAndConvertCSV(url) {
        async function fetchCSV(url) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    responseType: 'text',
                    onload: function (response) {
                        if (response.status === 200) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Failed to fetch CSV. Status: ${response.status}`));
                        }
                    },
                    onerror: function (error) {
                        reject(error);
                    }
                });
            });
        }

        function csvToJSON(csvData) {
            const lines = csvData.split("\n");
            const result = [];

            for (let i = 0; i < lines.length; i++) {
                const row = lines[i].split(",");
                result.push(row);
            }

            return result;
        }

        try {
            const csvData = await fetchCSV(url);
            const jsonData = csvToJSON(csvData);
            console.log("CSV data as JSON:", jsonData);
            return jsonData;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async checkStateAndContinue() {
        console.log('checkStateAndContinue');
        await this.checkgroupcss();
        await this.delay(5000);
        await this.smoothScrollPage('down', 2000);
        await this.delay(5000);
        await this.checkcommenctcss();
        await this.delay(5000);
        await this.startfreshclosetab();
    }

    async smoothScrollPage(direction, distance, step = 10, delayTime = 10) {
        console.log('smoothScrollPage');
        let scrollX = 0, scrollY = 0;

        switch (direction.toLowerCase()) {
            case 'up':
                scrollY = -1;
                break;
            case 'down':
                scrollY = 1;
                break;
            case 'left':
                scrollX = -1;
                break;
            case 'right':
                scrollX = 1;
                break;
            default:
                console.error('Invalid direction. Use "up", "down", "left", or "right".');
                return;
        }

        const steps = Math.ceil(distance / step);

        for (let i = 0; i < steps; i++) {
            window.scrollBy(scrollX * step, scrollY * step);
            await delay(delayTime);
        }
    }

    async closetab() {
        console.log("Closing tab...");
        window.close();
    }

    async startfreshclosetab() {
        setInterval(() => this.closetab(), 1000);
    }

    async init() {
        await this.delay(5000);
        if (window.location.href === this.initialPageUrl) {
            await this.checkmainelement();
        } else {
            await this.checkStateAndContinue();
        }
    }
}
// 确保类在全局范围内可用
window.FacebookPostLibrary = FacebookPostLibrary;
// Export the class
//module.exports =  FacebookPostLibrary;
