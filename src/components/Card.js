export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteClick, handleLikeClick },
    cardSelector
  ) {
    // Obtain the card's elements
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;

    // Find the card template
    this._cardSelector = cardSelector;

    // Functions
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    // Add event listner for like button
    this._likeButton.addEventListener("click", this._handleLikeClick);

    // Add event listener for image
    this._imageWindow = this._cardElement.querySelector(".cards__image");
    this._imageWindow.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );

    this._deleteButton.addEventListener("click", this._handleDeleteClick);
  }

  //Check if the card is liked
  isLiked() {
    return this._likeButton.classList.contains("cards__like-button_active");
  }

  //Set the card to liked or not
  setLikes() {
    this._renderLikes();
  }

  // Change the like icon based on its status
  _renderLikes() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  //Initial Heart Icon when loading page
  _loadLike(active) {
    if (active) {
      this._likeButton.classList.add("cards__like-button_active");
    } else {
      this._likeButton.classList.remove("cards__like-button_active");
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView(active) {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );

    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._loadLike(active);

    //Card Image Link and Alt title
    const cardImageElement = this._cardElement.querySelector(".cards__image");
    cardImageElement.src = this._link;
    cardImageElement.alt = `Photo of ${this._name}`;

    //Set up Card Title
    const cardTitleElement = this._cardElement.querySelector(".cards__title");

    cardTitleElement.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
