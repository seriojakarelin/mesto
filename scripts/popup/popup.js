//открыть попап
let profileEditButton = document.querySelector('.profile__edit-button');

function popupOn() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
}
    
profileEditButton.addEventListener('click', popupOn);

//закрыть попап
let popupCloseIcon = document.querySelector('.popup__close-icon');

function popupOff() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}
    
popupCloseIcon.addEventListener('click', popupOff);

//установить значения полей ввода
let popupInputElName = document.querySelector('.popup__input_el_name');
let profileName = document.querySelector('.profile__name');

popupInputElName.setAttribute('value', profileName.textContent);

let popupInputElJob = document.querySelector('.popup__input_el_job');
let profileJob = document.querySelector('.profile__job');

popupInputElJob.setAttribute('value', profileJob.textContent);

//вернуть в поля ввода значения из профиля по закрытию попапа
function descDefaultValue() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
    popupInputElName.value = profileName.textContent;
    popupInputElJob.value = profileJob.textContent;
}

popupCloseIcon.addEventListener('click', descDefaultValue);

//установить сохранение информации из полей ввода в попапе 
let popupForms = document.querySelector('.popup__forms');

function formSubmitHandler(evt) {
    evt.preventDefault();

    let popupInputElName = document.querySelector('.popup__input_el_name');
    let popupInputElJob = document.querySelector('.popup__input_el_job');

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = popupInputElName.value;
    profileJob.textContent = popupInputElJob.value;

    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

popupForms.addEventListener('submit', formSubmitHandler);
