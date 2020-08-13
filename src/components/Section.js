class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._items.forEach(item => { 
            this.addItem(item);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.prepend(element);
    }
}

export {Section};