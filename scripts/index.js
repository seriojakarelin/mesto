const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const popupInputElName = document.querySelector('.popup__input_el_name');
const popupInputElJob = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupFormsEdit = document.querySelector('.popup__forms_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
const popupFormsAdd = document.querySelector('.popup__forms_type_add');
const popupInputElPlaceName = document.querySelector('.popup__input_el_place-name');
const popupInputElPlaceUrl = document.querySelector('.popup__input_el_place-url');
const cardsContainer = document.querySelector('.gallery');
const cardTemplate = document.querySelector('.card-template');
const popupView = document.querySelector('.popup_type_view');
const popupViewCloseButton = document.querySelector('.popup__close-button_type_view');

function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
    document.activeElement.blur();
    resetError(popup);
}

function resetError(popup) {
    if (!popup.classList.contains('popup_opened')) { 
        const errorMessages = popup.querySelectorAll('.popup__input-error_active')
        const inputErrors = popup.querySelectorAll('.popup__input_type_error')
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

function popupClosingByOverlay(evt) {
    const popup = document.querySelector('.popup_opened')
    if (evt.target !== evt.currentTarget) {
        return;
    } 
    popupToggle(popup);
}

function handleEditPopup() {
    if (!popupEdit.classList.contains('popup_opened')) {    
        popupInputElName.value = profileName.textContent;
        popupInputElJob.value = profileJob.textContent;
    }
    
    popupToggle(popupEdit);
}

function handleAddPopup() {
    if (!popupAdd.classList.contains('popup_opened')) {    
        popupInputElPlaceUrl.value  = '';
        popupInputElPlaceName.value = '';
    }

    popupToggle(popupAdd);
}

function formEditSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    handleEditPopup();
}

function handleViewPopup(item) {

    document.querySelector('.popup__photo').src = item.link; 
    document.querySelector('.popup__photo-caption').textContent = item.name;

    popupToggle(popupView);
}

popupViewCloseButton.addEventListener('click', function() {
    popupToggle(popupView);
});

function handleLikeButton(evt) {
    const likeButton = evt.target.closest('.gallery__like-button');
    likeButton.classList.toggle('gallery__like-button_active');
}

function handleTrashButton(evt) {
    const card = evt.target.closest('.gallery__card');
    card.remove();
}

function addCard(item) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('.gallery__photo').src = item.link; 
    card.querySelector('.gallery__photo-title').textContent = item.name; 

    const likeButton = card.querySelector('.gallery__like-button');
    likeButton.addEventListener('click', handleLikeButton);

    const trashButton = card.querySelector('.gallery__trash-button');
    trashButton.addEventListener('click', handleTrashButton); 

    const galleryPhoto = card.querySelector('.gallery__photo');
    galleryPhoto.addEventListener('click', function() {
        handleViewPopup(item);
    });

    return card
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

    handleAddPopup();
}

function popupCloseByEsc(evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null && evt.code === 'Escape') {
        popupToggle(popup);
      }
}

document.querySelectorAll('.popup').forEach(function(popup) {
    popup.addEventListener('click', popupClosingByOverlay);
})
profileEditButton.addEventListener('click', handleEditPopup);
popupEditCloseButton.addEventListener('click', handleEditPopup);
popupFormsEdit.addEventListener('submit', formEditSubmitHandler);
profileAddButton.addEventListener('click', handleAddPopup);
popupAddCloseButton.addEventListener('click', handleAddPopup);
popupFormsAdd.addEventListener('submit', formAddSubmitHandler);
document.addEventListener('keydown', popupCloseByEsc);