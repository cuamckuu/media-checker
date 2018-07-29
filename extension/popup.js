"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const check_site = function (query){
		const getHTML = function (url) {
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
                    let html = document.createElement("html");
					html.innerHTML = this.responseText;
                    parseHTML(html);
				}
			};

			xhr.open("GET", url, true);
			xhr.send();
		}

        const get_formated_str = function (url, format) {
            const regex = /\{url\}\[(-?\d*)?:(-?\d*)?\]/;
            let [_, start, end] = format.match(regex);

            start = Number(start) || 0;
            while (start < 0) {
                start += url.length + 1;
            }

            end = Number(end) || url.length;
            while (end < 0) {
                end += url.length + 1;
            }

            return format.replace(regex, url.substring(start, end));
        }

        const parseHTML = function (html) {
            const arr = html.querySelectorAll(query.selector);
            while (query.index < 0) {
                query.index += arr.length;
            }

            const query_str = arr[query.index][query.attribute];
            const formated_str = get_formated_str(query.url, query.format);

            console.log(`Current compare for ${query.name}:
                        ${query_str} !==  ${formated_str}`);

            const state = (query_str !== formated_str);
            createDiv(state);
        }

        const createDiv = function (state) {
            let block = document.createElement("div");
            block.className = "entry";

            let link = document.createElement("a");
            link.href = query.url;
            link.innerHTML = `<span class='${state}'> ${state} </span>`;

            block.innerHTML = `${query.name.bold()}: `;
            block.appendChild(link);

            document.body.appendChild(block);
        }

        getHTML(query.url);
    };

    var myQuery1 = {
        name: "Tower of God",
        url: "https://read.yagami.me/read/tower_of_god/2/309/",
        selector: ".dropdown_chapter > li > a",
        attribute: "href",
        index: 0,
        format: "{url}[:]"
    };

    var myQuery2 = {
        name: "OnePiece",
        url: "https://mangaclub.ru/manga/view/156-one-piece/v91-c912.html#01",
        selector: ".manga-thumbs-chapters > a",
        attribute: "href",
        index: -1,
        format: "{url}[:]"
    };

    check_site(myQuery1);
    check_site(myQuery2);
});
