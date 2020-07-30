import {popupCloseByEsc} from './utils.js'

class Card {
    constructor(image, title, templateSelector) {
        this._image = image;
        this._title = title;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.gallery__card').cloneNode(true);
    }

    generateTemplate() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.gallery__photo').src = this._image;
        this._element.querySelector('.gallery__photo-title').textContent = this._title;
        this._element.querySelector('.gallery__photo').alt = this._title;

        return this._element;
    }

    _handleLikeButton() {
        this._element.querySelector('.gallery__like-button').classList.toggle('gallery__like-button_active');
    }

    _handleTrashButton() {
        this._element.remove();
    }

    _handlePopupViewOpen() {
        const popupView = document.querySelector('.popup_type_view');
        popupView.querySelector('.popup__photo').src = this._image; 
        popupView.querySelector('.popup__photo-caption').textContent = this._title; 
        popupView.classList.add('popup_opened');
        document.addEventListener('keydown', popupCloseByEsc);
    }

    _setEventListeners() {
        this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
            this._handleLikeButton();
        })
    
        this._element.querySelector('.gallery__trash-button').addEventListener('click', () => {
            this._handleTrashButton();
        })

        this._element.querySelector('.gallery__photo').addEventListener('click', () => {
            this._handlePopupViewOpen();
        })
    }
}

export {Card};