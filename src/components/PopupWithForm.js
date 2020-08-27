import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitPromise, formSubmitCallback, popupValidator, title) {
        super(popupSelector);
        this._formSubmitPromise = formSubmitPromise;
        this._formSubmitCallback = formSubmitCallback;
        this._popupValidator = popupValidator;
        this._title = title
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
            this.setLoading();
            this._formSubmitPromise(this._getInputValues())
                .then((res) => {
                    this.setDefaultButton(this._title);
                    this._formSubmitCallback(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            this.close();
        })
    }

    open(formData, prefix) {
        for (const inputName in formData) {
            if(this._popupSelector.querySelector(`.popup__input[name=${prefix}-${inputName}]`) !== null) {
            this._popupSelector.querySelector(`.popup__input[name=${prefix}-${inputName}]`).value = formData[inputName];
            }
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