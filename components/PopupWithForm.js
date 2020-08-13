import {Popup} from './Popup.js';
import {popupEditValidator, popupAddValidator} from '../utils/constants.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
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

    close() {
        const inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        
        inputs.forEach((input) => {
            input.value = '';
        });

        super.close();

        popupEditValidator.resetError();
        popupAddValidator.resetError();
    }

}

export {PopupWithForm};