class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._nameSelector = nameSelector; 
        this._jobSelector = jobSelector;
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent,
            job: this._jobSelector.textContent
        }
    }

    setUserInfo(newUserInfo) {
        this._nameSelector.textContent = newUserInfo.name;
        this._jobSelector.textContent = newUserInfo.job;
    }
}

export {UserInfo};