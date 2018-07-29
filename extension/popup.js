"use strict";

document.addEventListener("DOMContentLoaded", function () {
    function check_site(query){
		function getHTML(url) {
			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
                    var html = document.createElement("html");
					html.innerHTML = this.responseText;
                    parseHTML(html);
				}

			};

			xhr.open("GET", url, true);
			xhr.send();
		}

        function get_formated_str(url, format) {
            var regex = /\{url\}\[(-?\d*)?:(-?\d*)?\]/;
            var arr = format.match(regex);

            var start = Number(arr[1]) || 0;
            while(start < 0) {
                start += url.length + 1;
            }

            var end = Number(arr[2]) || url.length;
            while(end < 0) {
                end += url.length + 1;
            }

            format = format.replace(regex, url.substring(start, end))
            return format;
        }

        function parseHTML(html) {
            var arr = html.querySelectorAll(query.selector);
            while(query.index < 0) {
                query.index += arr.length;
            }

            var query_str = arr[query.index][query.attribute];
            var formated_str = get_formated_str(query.url, query.format);
            console.log("Current compare to " + query.name + ": "
                        + query_str + " !== " + formated_str);
            var state = query_str !== formated_str;

            createDiv(state);
        }

        function createDiv(state) {
            var block = document.createElement("div");
            block.className = "entry";

            var link = document.createElement("a");
            link.href = query.url;
            if(state) {
                link.innerHTML = "<span class='true'>" + state + "</span>";
            }else{
                link.innerHTML = "<span class='false'>" + state + "</span>";
            }
            block.innerHTML = "<b>" + query.name + "</b>: ";
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
