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
const gallery = document.querySelector('.gallery');
const cardTemplate = document.querySelector('.card-template');

function popupEditToggle() {
    if (!popupEdit.classList.contains('popup_opened')) {    
        popupInputElName.value = profileName.textContent;
        popupInputElJob.value = profileJob.textContent;
    }

    document.activeElement.blur();

    popupEdit.classList.toggle('popup_opened');
}

function popupAddToggle() {
    if (!popupAdd.classList.contains('popup_opened')) {    
        popupInputElPlaceUrl.value  = '';
        popupInputElPlaceName.value = '';
    }

    document.activeElement.blur();

    popupAdd.classList.toggle('popup_opened');
}

function formEditSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    popupEditToggle();
}

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

function addCard(item) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('.gallery__photo').src = item.link; 
    card.querySelector('.gallery__photo-title').textContent = item.name; 

    gallery.prepend(card);

    const likeButton = gallery.querySelector('.gallery__like-button');

    function like(evt) {
        const likeButton = evt.target.closest('.gallery__like-button');
        likeButton.classList.toggle('gallery__like-button_active');
    }

    likeButton.addEventListener('click', like);

    const trashButton = document.querySelector('.gallery__trash-button');

    function trash(evt) {
        const card = evt.target.closest('.gallery__card');
        card.remove();
    }

    trashButton.addEventListener('click', trash); 

    const popupView = document.querySelector('.popup_type_view');
    const galleryPhoto = document.querySelector('.gallery__photo');
    const popupViewCloseButton = document.querySelector('.popup__close-button_type_view');

    function popupViewOpen(evt) {
        popupView.classList.toggle('popup_opened');

        document.querySelector('.popup__photo').src = item.link; 
        document.querySelector('.popup__photo-caption').textContent = item.name;

    }

    galleryPhoto.addEventListener('click', popupViewOpen);

    function popupViewClose(evt) {
        popupView.classList.remove('popup_opened');
    }

    popupViewCloseButton.addEventListener('click', popupViewClose);
}

initialCards.forEach(addCard);

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    const item = {
        name: popupInputElPlaceName.value, 
        link: popupInputElPlaceUrl.value
    }

    addCard(item);

    popupAddToggle();
}

profileEditButton.addEventListener('click', popupEditToggle);
popupEditCloseButton.addEventListener('click', popupEditToggle);
popupFormsEdit.addEventListener('submit', formEditSubmitHandler);
profileAddButton.addEventListener('click', popupAddToggle);
popupAddCloseButton.addEventListener('click', popupAddToggle);
popupFormsAdd.addEventListener('submit', formAddSubmitHandler);