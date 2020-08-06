class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.activeElement.blur();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (document.querySelector('.popup_opened') !== null && evt.code === 'Escape') {
            this.close();
          }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
    }
}