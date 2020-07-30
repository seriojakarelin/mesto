import {FormValidator} from './FormValidator.js'

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupFormsEdit = document.querySelector('.popup__forms_type_edit');
const popupFormsAdd = document.querySelector('.popup__forms_type_add');
const formSelectors = {
    formSelector: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const popupEditValidator = new FormValidator(popupFormsEdit, popupEdit, formSelectors);
const popupAddValidator = new FormValidator(popupFormsAdd, popupAdd, formSelectors);

function popupOpen(popup) {
    popup.classList.add('popup_opened');
    document.activeElement.blur();
    popupEditValidator.enableValidation();
    popupAddValidator.enableValidation();
    popupEditValidator.toggleButtonState(true);
    popupAddValidator.toggleButtonState(true);

    document.addEventListener('keydown', popupCloseByEsc);
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
    popupEditValidator.resetError();
    popupAddValidator.resetError();

    document.removeEventListener('keydown', popupCloseByEsc);
}

function popupCloseByEsc(evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null && evt.code === 'Escape') {
        popupClose(popup);
      }
}

export {initialCards, popupCloseByEsc, popupClose, popupOpen, popupEditValidator, popupAddValidator, popupEdit, popupAdd, popupFormsEdit, popupFormsAdd};