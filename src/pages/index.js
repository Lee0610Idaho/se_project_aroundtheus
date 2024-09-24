import "./index.css";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import {
  initialCards,
  cardListEl,
  cardTemplate,
  addCardForm,
  profileEditButton,
  cardTitleInput,
  addNewCardButton,
  profileTitle,
  profileDescription,
  cardUrlInput,
  profileTitleInput,
  profileDescriptionInput,
  options,
} from "../utils/costants";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

//Helper Functions
function createCard(data) {
  const cardElement = new Card(data, cardTemplate, (imgData) => {
    imagePopup.open(imgData);
  });
  return cardElement.getView();
}

//Set up From Validators
const formValidators = {};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);

// Section class Instance
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      // Create a new card
      const cardElement = createCard(data);

      // Display each card
      cardSection.addItem(cardElement);
    },
  },
  cardListEl
);
cardSection.renderItems();
const userInfo = new UserInfo({
  profileName: "#profile_name",
  profileJob: "#profile_job",
});

//Profile Popup
const editFormPopup = new PopupWithForm("#profile-edit-modal", () => {
  userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  editFormPopup.close();
});

editFormPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;

  editFormPopup.open();
});

//Add Popup for adding Cards
const addCardFormPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const newCard = createCard(formData);
  cardSection.addItem(newCard);
  addCardFormPopup.close();
  addCardForm.reset();
  formValidators["card-form"].disableButton();
});

addCardFormPopup.setEventListeners();

addNewCardButton.addEventListener("click", function () {
  addCardFormPopup.open();
});

//Create Image Modal
const imagePopup = new PopupWithImage("#card-image-modal");
imagePopup.setEventListeners();
