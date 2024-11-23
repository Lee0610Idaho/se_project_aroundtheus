export default class UserInfo {
  constructor(profileName, profileJob, profileImage) {
    this.profileName = profileName;
    this.profileJob = profileJob;
    this.profileImage = profileImage;
  }

  getUserInfo() {
    return {
      name: this.profileName.textContent,
      job: this.profileJob.textContent,
    };
  }

  setUserInfo(profileName, profileDescription) {
    this.profileName.textContent = profileName;
    this.profileJob.textContent = profileDescription;
  }

  setUserImage(link) {
    this.profileImage.src = link;
  }
}
