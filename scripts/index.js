'use strict';

// places list
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements__list');

// popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupZoomImage = popupImage.querySelector('.popup__zoom-image');
const popupZoomImageCaption = popupImage.querySelector('.popup__image-caption');
const popupEditForm = popupEdit.querySelector('.popup__form_type_edit');
const popupAddForm = popupAdd.querySelector('.popup__form_type_add');

// buttons
const openedEditPopup = document.querySelector('.profile__edit-button');
const openedAddPopup = document.querySelector('.profile__add-button');
const closedEditPopup = popupEdit.querySelector('.popup__close-button_type_edit');
const closedAddPopup = popupAdd.querySelector('.popup__close-button_type_add');
const closedImagePopup = popupImage.querySelector('.popup__close-button_type_image');
const popupEditSubmitButton = popupEditForm.querySelector('.popup__submit-button_edit');
const popupAddSubmitButton = popupAddForm.querySelector('.popup__submit-button_add');

// profile data
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// popup form data
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_job');
const placeInput = popupAddForm.querySelector('.popup__input_type_place');
const placeLinkInput = popupAddForm.querySelector('.popup__input_type_link');


// functions

// toggle any popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  closePopupOverlay(popup);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const closePopupOverlay = (popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
};

// edit popup actions
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupEditSubmitButton.classList.remove('popup__submit-button_disabled');
  popupEditSubmitButton.removeAttribute('disabled', false);

  openPopup(popupEdit);
}

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', submitEditPopupForm);

openedEditPopup.addEventListener('click', openEditPopup);
closedEditPopup.addEventListener('click', () => {
  closePopup(popupEdit);
});

// remove card
const removeCard = (evt) => {
  evt.preventDefault();
  evt.target.closest('.element').remove();
};

// add like
const toggleLike = (evt) => {
  evt.preventDefault();
  evt.target.classList.toggle('element__like-button_active');
};

// zoom image
const zoomImage = (cardImage) => {
  cardImage.addEventListener('click', () => {
    popupZoomImage.src = cardImage.src;
    popupZoomImage.alt = cardImage.alt;
    popupZoomImageCaption.textContent = cardImage.alt;
    openPopup(popupImage);
  });
};

closedImagePopup.addEventListener('click', () => {
  closePopup(popupImage);
});

// card creation
const createCard = (data) => {
  const elementTemplate = document.querySelector('.element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__trash-button');
  const cardImage = cardElement.querySelector('.element__image');
  const cardImageTitle = cardElement.querySelector('.element__name');

  cardImageTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', removeCard);
  zoomImage(cardImage);

  return cardElement;
};

// add new card
const renderCard = (data, cardsContainer) => {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
};

// add initial cards
const addInitialCards = (initialCards) => {
  initialCards.forEach((card) => {
    renderCard({name: card.name, link: card.link}, cardsContainer);
  });
};

addInitialCards(initialCards);

// add popup actions
function submitAddPopupForm (evt) {
  evt.preventDefault();
  renderCard({name: placeInput.value, link: placeLinkInput.value}, cardsContainer);
  popupAddForm.reset();
  closePopup(popupAdd);
}

popupAddForm.addEventListener('submit', submitAddPopupForm);

openedAddPopup.addEventListener('click', () => {
  openPopup(popupAdd);
  popupAddSubmitButton.classList.add('popup__submit-button_disabled');
  popupAddSubmitButton.setAttribute('disabled', true);
});
closedAddPopup.addEventListener('click', () => {
  closePopup(popupAdd);
});


