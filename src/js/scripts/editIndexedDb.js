class EditIndexedDB {

    constructor() {
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    }

    add = (data) => {
        const open = indexedDB.open("Events", 1);

        open.onupgradeneeded = function() {
            const db = open.result;
            const store = db.createObjectStore("EventsObj", {keyPath: "id"});
            //const index = store.createIndex("id","id", {unique:true});
        };

        open.onsuccess = function() {
            // Start a new transaction
            const db = open.result;
            const tx = db.transaction("EventsObj", "readwrite");
            const store = tx.objectStore("EventsObj");

            store.add(data);

            tx.oncomplete = function() {
                db.close();
            };
        }        
    };

    read = () => {
        return new Promise(function (resolve) {

            const open = indexedDB.open("Events", 1);

            open.onupgradeneeded = function () {
                const db = open.result;
                const store = db.createObjectStore("EventsObj", {keyPath: "id"});
            };



            open.onsuccess = function () {

                // Start a new transaction
                const db = open.result;
                const tx = db.transaction("EventsObj", "readonly");
                const objectStore = tx.objectStore("EventsObj");


                objectStore.getAll().onsuccess = res => {resolve(res.target.result) }

                tx.oncomplete = function() {
                    db.close();
                };
            };
        });
    };

    update = (key, data) => {
        const open = indexedDB.open("Events", 1);

        open.onupgradeneeded = function() {
            const db = open.result;
            const store = db.createObjectStore("EventsObj", {keyPath: "id"});
            //const index = store.createIndex("id","id", {unique:true});
        };

        open.onsuccess = function() {
            // Start a new transaction
            const db = open.result;
            const tx = db.transaction("EventsObj", "readwrite");
            const store = tx.objectStore("EventsObj");

            store.put(data);

            tx.oncomplete = function() {
                db.close();
            };
        }
    };

    del = (key) => {
        const open = indexedDB.open("Events", 1);

        open.onupgradeneeded = function() {
            const db = open.result;
            const store = db.createObjectStore("EventsObj", {keyPath: "id"});
        };

        open.onsuccess = function() {
            // Start a new transaction
            const db = open.result;
            const tx = db.transaction("EventsObj", "readwrite");
            const store = tx.objectStore("EventsObj");

            store.delete(key);

            tx.oncomplete = function() {
                db.close();
            };
        }
    };
}

export {EditIndexedDB};