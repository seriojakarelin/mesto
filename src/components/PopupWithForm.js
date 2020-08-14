import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback, popupValidator) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._popupValidator = popupValidator;
    }

    _getInputValues() {
        const values = {};
        const inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitCallback(this._getInputValues());
            this.close();
        })
    }

    open(formData, prefix) {
        for (const inputName in formData) {
            this._popupSelector.querySelector(`.popup__input[name=${prefix}-${inputName}]`).value = formData[inputName];
        }
        super.open();
        this._popupValidator.enableValidation();
        this._popupValidator.toggleButtonState(true);
    }

    close() {
        const inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        
        inputs.forEach((input) => {
            input.value = '';
        });

        super.close();

        this._popupValidator.resetError();
    }

}

export {PopupWithForm};