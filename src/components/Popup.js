class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this.setEventListeners();
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.activeElement.blur();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (document.querySelector('.popup_opened') !== null && evt.code === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target !== evt.currentTarget) {
            return;
          } 
        
          this.close();
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', (evt) => {
            this.close(evt);
        });

        this._popupSelector.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}

export {Popup};