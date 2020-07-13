function showInputError({formElement, inputElement, errorMessage, inputErrorClass, errorClass, ...rest}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
} 

function hideInputError({formElement, inputElement, inputErrorClass, errorClass, ...rest}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
} 

function checkInputValidity({formElement, inputElement, ...rest}) {
    if (!inputElement.validity.valid) {
        const errorMessage = inputElement.validationMessage;
        showInputError({formElement, inputElement, errorMessage, ...rest});
    }else {
        hideInputError({formElement, inputElement, ...rest});
    }
}

function setEventListeners({formElement, inputSelector, submitButtonSelector, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState({inputList, buttonElement, ...rest});

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity({formElement, inputElement, ...rest});
            toggleButtonState({inputList, buttonElement, ...rest});
        })
    })
}

function enableValidation({formSelector, ...rest}) {

    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach(function(formElement) {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        })

        setEventListeners({formElement, ...rest});
    })
}

enableValidation({
    formSelector: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState({inputList, buttonElement, inactiveButtonClass, ...rest}) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }
}