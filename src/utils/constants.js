const profileEditButton = document.querySelector('.profile__edit-button');
const profileAvatarButton = document.querySelector('.profile__avatar-edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.gallery');
const popupView = document.querySelector('.popup_type_view');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupFormsEdit = document.querySelector('.popup__forms_type_edit');
const popupFormsAdd = document.querySelector('.popup__forms_type_add');
const popupFormsAvatar = document.querySelector('.popup__forms_type_avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupDelete = document.querySelector('.popup_type_delete');
const formSelectors = {
    formSelector: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export {popupEdit, popupAdd, popupFormsEdit, popupFormsAdd, formSelectors, profileName, profileJob, popupView, profileAddButton, profileEditButton, cardsContainer, popupFormsAvatar,
popupAvatar, profileAvatarButton, profileAvatar, popupDelete};