export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this.profileName = document.querySelector(profileName);
    this.profileJob = document.querySelector(profileJob);
    this._element = this._element;
  }

  getUserInfo() {
    return {
      name: this.profileName.textContent,
      job: this.profileJob.textContent,
    };
  }

  setUserInfo() {
    this.profileName.textContent = document.querySelector(
      "#profile-title-input"
    ).value;
    this.profileJob.textContent = document.querySelector(
      "#profile-description-input"
    ).value;
  }
}
