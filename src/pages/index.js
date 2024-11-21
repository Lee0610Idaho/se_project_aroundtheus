import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
  profileImage,
  options,
  config,
} from "../utils/costants";

const addCreateButton = addCardForm.querySelector(".modal__button");

const profileEditForm = document.forms["profile-form"];
const profileFormButton = profileEditForm.querySelector(".modal__button");
const avatarEditButton = document.querySelector(".profile__image-overlay");
const avatarForm = document.forms["avatar-form"];
const avatarFormButton = avatarForm.querySelector(".modal__button");
const deleteConfirmButton = document.querySelector("#delete-card-button");

function createCard(data, userId, active) {
  const cardElement = new Card(
    {
      data,
      handleImageClick: (imageData) => {
        // Open image popup on click
        cardPreviewPopup.open(imageData);
      },
      handleDeleteClick: () => {
        // Set the deletion action
        deletePopup.setAction(() => {
          // Render loading status
          setSubmitButtonText(deleteConfirmButton, "Deleting...");

          // Handle card deletion
          api
            .deleteCard(data._id)
            .then(() => {
              // Delete card from page
              cardElement.deleteCard();

              // Close the confirmation popup
              deletePopup.close();
            })
            .catch((err) => {
              // If the server returns an error, reject the promise
              console.error(`Error: ${err.status}`);
            })
            .finally(() => {
              // Restore button text
              setSubmitButtonText(deleteConfirmButton, "Yes");
            });
        });

        // Open confirmation popup on click
        deletePopup.open();
      },
      handleLikeClick: () => {
        // If the user has liked the card, remove the like; vice versa
        if (cardElement.isLiked()) {
          // Remove like from the server if user has already liked the card
          api
            .removeLike(data._id)
            .then((card) => {
              // Update like count
              cardElement.setLikes(false);
            })
            .catch((err) => {
              // If the server returns an error, reject the promise
              console.error(`Error: ${err.status}`);
            });
        } else {
          // Add like to the server if user has not liked the card
          api
            .addLike(data._id)
            .then((card) => {
              // Update like count
              cardElement.setLikes(true);
            })
            .catch((err) => {
              // If the server returns an error, reject the promise
              console.error(`Error: ${err.status}`);
            });
        }
      },
    },
    cardTemplate,
    userId
  );

  // Display the card
  return cardElement.getView(active);
  //return cardElement;
}

function setSubmitButtonText(buttonElement, text) {
  // Set text of form button
  buttonElement.textContent = text;
}

//Set up API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d6ed683f-c1fa-483e-b027-e66d0bfd0883",
    "Content-Type": "application/json",
  },
});

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

//Create Image Modal
const imagePopup = new PopupWithImage("#card-image-modal");
//initially closed
imagePopup.close();

const deletePopup = new PopupWithConfirmation("#delete-modal");
deletePopup.setEventListeners();

let cardSection;
let userId;

const userInfo = new UserInfo(profileTitle, profileDescription, profileImage);

api
  .getAppInfo()
  .then(([cards, userData]) => {
    // Find the user id
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserImage(userData.avatar);

    // Create cards section
    cardSection = new Section(
      {
        items: cards,
        renderer: (card) => {
          // Create a new card
          console.log(cards);
          const cardElement = createCard(card, userId, card.isLiked);
          // Display each card
          cardSection.addItem(cardElement);
        },
      },
      cardListEl,
      userId
    );

    // Render the entire list of cards on the page
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    // If the server returns an error, reject the promise
    console.error(`Error: ${err}`);
  });

//Profile Popup
const editFormPopup = new PopupWithForm("#profile-edit-modal", (values) => {
  setSubmitButtonText(profileFormButton, "Saving...");

  api
    .updateUserinfo(values.profile__title, values.profile__description)
    .then((values) => {
      userInfo.setUserInfo(values.name, values.about);
      editFormPopup.close();
    })
    .catch((err) => {
      console.error("Error: ${err.status}");
    })
    .finally(() => {
      setSubmitButtonText(profileFormButton, "Save");
    });
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;

  editFormPopup.open();
  editFormPopup.setEventListeners();
});

//Add Popup for adding Cards
const addCardFormPopup = new PopupWithForm("#add-card-modal", (formData) => {
  setSubmitButtonText(addCreateButton, "Creating...");

  api
    .addNewCard(formData)
    .then((formData) => {
      const newCard = createCard(formData, userId);
      cardSection.addItem(newCard);
    })
    .then(() => {
      addCardFormPopup.close();
    })

    .catch((err) => {
      console.error(`Error: ${err.status}`);
    })
    .finally(() => {
      setSubmitButtonText(addCreateButton, "Create");
    });
  addCardForm.reset();
});

//Add Card Button Pressed
addNewCardButton.addEventListener("click", function () {
  formValidators["card-form"].disableButton();
  addCardFormPopup.open();
  addCardFormPopup.setEventListeners();
});

const avatarPopup = new PopupWithForm("#avatar-modal", (formData) => {
  // Render loading status
  setSubmitButtonText(avatarFormButton, "Saving...");

  // Update the user's image in the server
  api
    .updateAvatar(formData)
    .then((userData) => {
      // Set the user's image
      userInfo.setUserImage(userData.avatar);
    })
    .then(() => {
      // Close the avatar popup
      avatarPopup.close();
    })
    .catch((err) => {
      // If the server returns an error, reject the promise
      console.error(`Error: ${err.status}`);
    })
    .finally(() => {
      // Restore button text
      setSubmitButtonText(avatarFormButton, "Save");
    });
});

avatarEditButton.addEventListener("click", () => {
  // Open the avatar popup
  avatarPopup.open();

  // Set the event listeners for the avatar popup
  avatarPopup.setEventListeners();
});
