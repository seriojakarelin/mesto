import {Popup} from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitAction(action) {
        this._formSubmitCallback = action;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitCallback();
            this.close();
        })
    }

    setDefaultButton() {
        super.setDefaultButton();

        this._submitButton = this._popupSelector.querySelector('.popup__submit-button')
        this._submitButton.textContent = 'Да';
    }
}

export {PopupWithSubmit}