import {initialCards, popupClose, popupOpen, popupEdit, popupAdd, popupFormsEdit, popupFormsAdd} from './utils.js';
import {Card} from './Card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const popupInputElName = document.querySelector('.popup__input_el_name');
const popupInputElJob = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
const popupInputElPlaceName = document.querySelector('.popup__input_el_place-name');
const popupInputElPlaceUrl = document.querySelector('.popup__input_el_place-url');
const cardsContainer = document.querySelector('.gallery');
const popupView = document.querySelector('.popup_type_view');
const popupViewCloseButton = document.querySelector('.popup__close-button_type_view');

function popupClosingByOverlay(evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.target !== evt.currentTarget) {
        return;
    } 
    popupClose(popup);
}

function handleEditPopupOpen() {
    if (!popupEdit.classList.contains('popup_opened')) {    
        popupInputElName.value = profileName.textContent;
        popupInputElJob.value = profileJob.textContent;
    }
    
    popupOpen(popupEdit);
}

function handleEditPopupClose() {
    popupClose(popupEdit);
}

function handleAddPopupOpen() {
    if (!popupAdd.classList.contains('popup_opened')) {    
        popupInputElPlaceUrl.value  = '';
        popupInputElPlaceName.value = '';
    }

    popupOpen(popupAdd);
}

function handleAddPopupClose() {
    popupClose(popupAdd);
}

function formEditSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    handleEditPopupClose();
}

popupViewCloseButton.addEventListener('click', function() {
    popupClose(popupView);
});

function addCard(item) {
    const card = new Card(item.link, item.name, '.card-template');

    return card.generateTemplate();
}

function renderCard(item) {
    const card = addCard(item);
    cardsContainer.prepend(card);
}

initialCards.forEach(renderCard);

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    const item = {
        name: popupInputElPlaceName.value, 
        link: popupInputElPlaceUrl.value
    }

    renderCard(item);

    handleAddPopupClose();
}

document.querySelectorAll('.popup').forEach(function(popup) {
    popup.addEventListener('click', popupClosingByOverlay);
})
profileEditButton.addEventListener('click', handleEditPopupOpen);
popupEditCloseButton.addEventListener('click', handleEditPopupClose);
popupFormsEdit.addEventListener('submit', formEditSubmitHandler);
profileAddButton.addEventListener('click', handleAddPopupOpen);
popupAddCloseButton.addEventListener('click', handleAddPopupClose);
popupFormsAdd.addEventListener('submit', formAddSubmitHandler);