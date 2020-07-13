function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
} 

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
} 

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__forms'));

    formList.forEach(function(formElement) {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        })

        setEventListeners(formElement);
    })
}

enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
    }else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
}