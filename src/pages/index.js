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

function renderCard(data, cardListEl) {
  const card = createCard(data);
  cardListEl.prepend(card);
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
      const cardEl = new Card(data, cardTemplate, (imgData) => {
        imagePopup.open(imgData);
      });
      cardSection.addItem(cardEl.getView());
    },
  },
  cardListEl
);
cardSection.renderItems(initialCards);

const userInfo = new UserInfo({
  profileName: "#profile_name",
  profileJob: "#profile_job",
});

//Profile Popup
const editFormPopup = new PopupWithForm("#profile-edit-modal", () => {
  userInfo.setUserInfo();
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
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  renderCard(cardData, cardListEl);
  addCardFormPopup.close();
  addCardForm.reset();
  console.log(formValidators);
  formValidators["card-form"].disableButton();
});

addCardFormPopup.setEventListeners();

addNewCardButton.addEventListener("click", function () {
  addCardFormPopup.open();
});

//Create Image Modal
const imagePopup = new PopupWithImage("#card-image-modal");
imagePopup.setEventListeners();
