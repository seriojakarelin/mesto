import {initialCards, popupEdit, popupAdd, profileName, profileJob, popupView, profileAddButton, profileEditButton, cardsContainer, popupEditValidator, popupAddValidator} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';

const userInfo = new UserInfo(profileName, profileJob);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(
            item.link, 
            item.name, 
            '.card-template', 
            () => {
                const popupWithImage = new PopupWithImage(popupView, item.name, item.link);
                popupWithImage.open();
            });
        const cardElement = card.generateTemplate();

        return cardElement;
    }
}, cardsContainer);

cardList.renderItems();

const popupWithFormEdit = new PopupWithForm(
    popupEdit,
    (formInfo) => {
        const item = {
            name: formInfo['user-name'], 
            job: formInfo['user-job']
        }

        userInfo.setUserInfo(item);
    }
)

const popupWithFormAdd = new PopupWithForm(
    popupAdd,
    (formInfo) => {
        const item = {
            name: formInfo['place-name'], 
            link: formInfo['place-url']
        }
    
        cardList.addItem(item);
    }
)

profileEditButton.addEventListener('click', () => { 
    popupWithFormEdit.open(userInfo.getUserInfo());
    popupEditValidator.enableValidation();
    popupEditValidator.toggleButtonState(true);
});
profileAddButton.addEventListener('click', () => {
    popupWithFormAdd.open();
    popupAddValidator.enableValidation();
    popupAddValidator.toggleButtonState(true);
});