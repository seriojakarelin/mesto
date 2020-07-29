class FormValidator {
    constructor(formElement, popup) {
        this._formSelector = '.popup__forms';
        this._inputSelector = '.popup__input';
        this._submitButtonSelector = '.popup__submit-button';
        this._inactiveButtonClass = 'popup__submit-button_inactive';
        this._inputErrorClass = 'popup__input_type_error';
        this._errorClass = 'popup__input-error_active';
        this._formElement = formElement;
        this._inputElements = this._formElement.querySelectorAll(this._inputSelector);
        this._popup = popup;
    }

    _showInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        const errorMessage = input.validationMessage;
        input.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    } 

    _checkInputValidity() {
        this._inputElements.forEach((input) => {
            if (!input.validity.valid) {
                this._showInputError(input);
            } else {
                this._hideInputError(input);
            }  
        });
    }

    _setEventListeners() {
        this.toggleButtonState(this._hasInvalidInput());
        
        this._inputElements.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity();
                this.toggleButtonState(this._hasInvalidInput());
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    
        this._setEventListeners();
    }

    _hasInvalidInput() {
        return Array.from(this._inputElements).some((input) => {
            return !input.validity.valid;
        })
    }

    toggleButtonState(condition) {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
        if (condition) {
            if (buttonElement === null) {
                return;
            }
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled', true);
        }
    }

    resetError() {
        if (!this._popup.classList.contains('popup_opened')) { 
            const errorMessages = this._popup.querySelectorAll('.popup__input-error_active');
            const inputErrors = this._popup.querySelectorAll('.popup__input_type_error');
            if (errorMessages === null && inputErrors === null) {
                return;
            }
    
            errorMessages.forEach(function(errorMessage) {
                errorMessage.classList.remove('popup__input-error_active');
            })
    
            inputErrors.forEach(function(inputError) {
                inputError.classList.remove('popup__input_type_error');
            })
        }
    }
}

export {FormValidator}