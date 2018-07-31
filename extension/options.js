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

    const deleteQuery = function (queries, index) {
        queries.splice(index, 1);

        localStorage.queries = JSON.stringify(queries);
        location.reload();
    }

    const changeValue = function (queries, index, key, old_val){
        const new_val = prompt("Edit value: ", old_val);

        if (new_val === false || new_val === old_val) return;
        queries[index][key] = new_val;

        localStorage.queries = JSON.stringify(queries);
        location.reload();
    }

    const drawQuery = function (query, index, arr) {
        let block = document.createElement("div");
        block.className = "note";
        block.index = index;

        let removeBtn = document.createElement("div");
        removeBtn.className = "button";
        removeBtn.innerHTML = "X";
        removeBtn.addEventListener("click", event => deleteQuery(arr, index));
        block.append(removeBtn);

        let res = document.createDocumentFragment();
        Object.keys(query).forEach((key) => {
            let key_el = document.createElement("span");
            key_el.className = "key";
            key_el.innerHTML = `${key.bold()}: `;
            res.append(key_el);

            let val_el = document.createElement("span");
            val_el.className = "value";
            val_el.innerHTML = query[key];
            res.append(val_el);
            val_el.addEventListener("click", (event) => {
                changeValue(arr, index, key, query[key]);
            });

            const br_el = document.createElement("br");
            res.append(br_el);
        });

        block.append(res);

        let background = document.getElementsByClassName("background")[0];
        background.append(block);
    }

    const drawInput = function () {
        let block = document.createElement("div");
        block.className = "note";

        let form = document.createElement("form");
        form.id = "form";
        block.append(form);

        const createTextInput = function (form, title, placeholder) {
            let input = document.createElement("input");
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

        let submit = document.createElement("input");
        submit.className = "button";
        submit.type = "submit";
        form.append(submit);

        let background = document.getElementsByClassName("background")[0];
        background.append(block);

        return form;
    }

    const saveFromForm = function (event) {
        const form = event.target;

        let formData = {};
        Object.keys(form).forEach( (index) => {
            if (+index === form.length - 1) return;

            let input = form[index];
            formData[input.title] = input.value.length === 0?
                                    input.placeholder:
                                    input.value;
        });

        queries.push(formData);
        localStorage.queries = JSON.stringify(queries);
     };

    const getQueries = function () {
        return JSON.parse(localStorage.queries);
    }

    const initLocalStorage = function () {
        if (!localStorage.queries) {
            localStorage.queries = "[]";
        }
    }

    initLocalStorage();

    let queries = getQueries();
    queries.forEach(drawQuery);

    let form = drawInput();
    form.addEventListener("submit", saveFromForm);
});

