class Card {
    constructor(id, image, title, templateSelector, handleCardClick, deleteCardClick, likeCardClick, likes, isOwn, hasBeenLiked) {
        this._image = image;
        this._title = title;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCardClick = deleteCardClick;
        this._likes = likes;
        this._id = id;
        this._isOwn = isOwn;
        this._likeCardClick = likeCardClick;
        this._hasBeenLiked = hasBeenLiked
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.gallery__card').cloneNode(true);
    }

    generateTemplate() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._imageElement = this._element.querySelector('.gallery__photo');
        this._likesNumber = this._element.querySelector('.gallery__like-number');

        const trashButton = this._element.querySelector('.gallery__trash-button');
        trashButton.style.display = this._isOwn ? "block" : "none";

        this._imageElement.src = this._image;
        this._imageElement.alt = this._title;
        this._element.querySelector('.gallery__photo-title').textContent = this._title;
        this._likesNumber.textContent = this._likes.length;

        const likeButton = this._element.querySelector('.gallery__like-button');
        if (this._hasBeenLiked) {
            likeButton.classList.add('gallery__like-button_active');
        }

        return this._element;
    };

    handleLikeButton() {
        this._element.querySelector('.gallery__like-button').classList.toggle('gallery__like-button_active');
    };

    _likeButtonClick() {
        this._likeCardClick(this);
    }

    setLikes(likes) {
        this._likes = likes;
        this._likesNumber.textContent = this._likes.length;
    }

    trashSubmit() {
        this._element.remove();
        this._element = null;
    };

    _handlePopupViewOpen() {
        this._handleCardClick();
    };

    _handlePopupDeleteOpen() {
        this._deleteCardClick(this);
    };

    _setEventListeners() {
        this._element.querySelector('.gallery__like-button').addEventListener('click', this._likeButtonClick.bind(this));
    
        this._element.querySelector('.gallery__trash-button').addEventListener('click', this._handlePopupDeleteOpen.bind(this));

        this._element.querySelector('.gallery__photo').addEventListener('click', () => {
            this._handlePopupViewOpen();
        });
    };
}

export {Card};