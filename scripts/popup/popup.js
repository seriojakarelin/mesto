const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseIcon = document.querySelector('.popup__close-button');
const popupInputElName = document.querySelector('.popup__input_el_name');
const popupInputElJob = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForms = document.querySelector('.popup__forms');

function popupToggle() {
    popup.classList.toggle('popup_opened');
    popupInputElName.value = profileName.textContent;
    popupInputElJob.value = profileJob.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', popupToggle);
popupCloseIcon.addEventListener('click', popupToggle);
popupForms.addEventListener('submit', formSubmitHandler);
