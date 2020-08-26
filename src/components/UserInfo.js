class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._nameSelector = nameSelector; 
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent,
            job: this._jobSelector.textContent,
            id: this._id
        }
    }

    setUserInfo(newUserInfo) {
        this._nameSelector.textContent = newUserInfo.name;
        this._jobSelector.textContent = newUserInfo.about;
        this._avatarSelector.style.backgroundImage = `url(${newUserInfo.avatar})`
        this._id = newUserInfo._id
    }
}

export {UserInfo};