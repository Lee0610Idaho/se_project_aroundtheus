//Elements//

//Buttons
export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const closeButtons = document.querySelectorAll(".modal__close");

//Profile Section
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add Card
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardForm = addCardModal.querySelector("#add-card-form");
export const cardTitleInput = addCardForm.querySelector(
  ".modal__field_type_title"
);
export const cardUrlInput = addCardForm.querySelector(".modal__field_type_url");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate = "#card-template";

//Card Image Modal
export const cardImageModal = document.querySelector("#card-image-modal");
export const cardImagePhoto = cardImageModal.querySelector(".modal__image");
export const cardImageName = cardImageModal.querySelector(".modal__image-name");

export const profileImage = document.querySelector(".profile__image");

//Validation Settings
export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
