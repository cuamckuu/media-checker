"use strict";

document.addEventListener("DOMContentLoaded", function () {
/*    var myQuery1 = {
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
*/

    function drawQuery(query) {
        var block = document.createElement("div");
        block.className = "note";

        var res = "";
        for(key in query){
            res += key.bold() + ": " + query[key] + "<br>";
        }

        block.innerHTML = res;

        var background = document.getElementsByClassName("background")[0];
        background.append(block);
    }

    function drawInput() {
        var block = document.createElement("div");
        block.className = "note";

        var form = document.createElement("form");
        form.id = "form";
        block.append(form);

        function createTextInput(form, title, placeholder) {
            var input = document.createElement("input");
            input.type = "text";
            input.title = title;
            input.placeholder = placeholder;
            form.append(input);
        }

        createTextInput(form, "name", "Name");
        createTextInput(form, "url", "URL");
        createTextInput(form, "selector", "Selector");
        createTextInput(form, "attribute", "Attribute");
        createTextInput(form, "index", "Index");
        createTextInput(form, "format", "Format");

        var submit = document.createElement("input");
        submit.type = "submit";
        form.append(submit);

        var background = document.getElementsByClassName("background")[0];
        background.append(block);

        return form;
    }

    function saveQuery(event) {
        var form = event.target;
        var formData = {};
        for(var i = 0; i < form.length - 1; i++){
            var input = form[i];
            formData[input.title] = (input.value == 0?input.placeholder:input.value);
        }

        queries.push(formData);
        localStorage["queries"] = JSON.stringify(queries);
    };

    function getQueries() {
        var queries = JSON.parse(localStorage["queries"]);
        return queries;
    }

    function initLocalStorage() {
        if(localStorage["queries"] == "" || localStorage["queries"] === undefined){
            localStorage["queries"] = "[]";
        }
    }

    initLocalStorage();
    var queries = getQueries();
    queries.forEach(drawQuery);
    var form = drawInput();
    form.addEventListener("submit", saveQuery);

});
