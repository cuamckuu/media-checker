"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const checkSite = function (query){
		const getHTML = function (url) {
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
                    let html = document.createElement("html");
					html.innerHTML = this.responseText;
                    parseHTML(html);
				}
			};

			xhr.open("GET", url, true);
			xhr.send();
		}

        const getFormatedString = function (url, format) {
            const regex = /\{url\}\[(-?\d*)?:(-?\d*)?\]/;
            let arr = format.match(regex);
            if (!!arr && arr.length === 3) {
                let start = Number(arr[1]) || 0;
                let end   = Number(arr[2]) || url.length;

                return format.replace(regex, url.slice(start, end));
            } else {
                return format;
            }
    }

        const parseHTML = function (html) {
            const arr = html.querySelectorAll(query.selector);
            query.index = +query.index; // Here was the bug with endless loop
            while (query.index < 0) {
                query.index += arr.length;
            }

            const query_str = arr[query.index][query.attribute];
            const formated_str = getFormatedString(query.url, query.format);

            console.log(`Current compare for ${query.name}: ${query_str} !==  ${formated_str}`);

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

    const getQueries = function () {
        return JSON.parse(localStorage.queries);
    }

    // TODO: Some kind of validateQuery(query) func
    let queries = getQueries();
    queries.forEach((query, i, arr) => {
        checkSite(query);
    });
});

