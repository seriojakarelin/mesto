class Api {
    constructor( {url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getItems() {
        return fetch(this._url, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    createItem(item) {
        return fetch(this._url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeItem(item) {
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteItem(id) {
        return fetch(`${this._url}${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    putItem(item) {
        return fetch(`${this._url}${item._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

export {Api}