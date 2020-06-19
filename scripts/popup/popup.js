const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupInputElName = document.querySelector('.popup__input_el_name');
const popupInputElJob = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForms = document.querySelector('.popup__forms');

function popupToggle() {
    if (!popup.classList.contains('popup_opened')) {    
        popupInputElName.value = profileName.textContent;
        popupInputElJob.value = profileJob.textContent;
    }

    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    popupToggle();
}

profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupForms.addEventListener('submit', formSubmitHandler);
