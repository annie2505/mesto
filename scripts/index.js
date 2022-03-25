let popup = document.querySelector('.popup');
let openedPopup = document.querySelector('.profile__edit-button');
let closedPopup = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

/* popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}) */

openedPopup.addEventListener('click', openPopup);
closedPopup.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

