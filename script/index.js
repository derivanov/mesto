// Создаем массив для карточек
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




// Функция открытия и закрытия попапа
function popupToggle(modal) {
    modal.classList.toggle('popup_opened');
}

// Профиль
// Находим профиль
const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Находим попап профиля, и форму
const popupProfile = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#profession');
const profileCloseBtn = document.querySelector('#close-profile');

// Функция отправки данных из формы в профиль
function formSubmitProfileHandler (evt) {
    evt.preventDefault();
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    popupToggle(popupProfile);
}

// Кнопка отправки данных из формы в профиль
profileForm.addEventListener('submit', formSubmitProfileHandler);

// Присваиваем кнопкам профиля открытие и закрытие
profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileCaption.textContent;
    popupToggle(popupProfile);
  });
profileCloseBtn.addEventListener('click', () => popupToggle(popupProfile));



// Новая карточка
// Находим кнопку создания карточки
const newCardBtn = document.querySelector('.profile__add-button');

// Находим попап создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('#new-card-form');
const cardTitleInput = document.querySelector('#card-title');
const cardLinkInput = document.querySelector('#card-link');
const newCardCloseBtn = document.querySelector('#close-new-card');

// Функция отправки данных из формы в новую карточку
function formSubmitNewCardHandler (evt) {
    evt.preventDefault();
    renderCardPrepend(cardTitleInput.value, cardLinkInput.value);
    popupToggle(popupNewCard);
    cardTitleInput.value = '';
    cardLinkInput.value = '';
}

// Кнопка отпраки данных из формы в новую карточку
newCardForm.addEventListener('submit', formSubmitNewCardHandler);

// Присваиваем кнопкам создания карточки открытие и закрытие
newCardBtn.addEventListener('click', () => popupToggle(popupNewCard));
newCardCloseBtn.addEventListener('click', () => popupToggle(popupNewCard));




// Находим попап полноэкранного просмотра фото карточек
const popupFullscreen = document.querySelector('.popup_fullscreen');
const fullscreenHeading = document.querySelector('.fullscreen__heading');
const fullscreenPic = document.getElementById('fullscreen-pic');
const fullscreenCloseBtn = document.querySelector('#close-fullscreen');




// Карточки
// Находим контейнер для карточек темплейт
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// Задаем исходное состояние карточек при загрузке страницы
initialCards.forEach(item => renderCardAppend(item.name, item.link));

// Обозначем сбор конкретных данных
const handleOpenImgPopup = (titleValue, imgValue) => {
    fullscreenHeading.textContent = titleValue;
    fullscreenPic.src = imgValue;
    popupToggle(popupFullscreen);
};

// Функции переключателей для кнопок лайка и удаления карточки
function handleCardLike(evt) {
    evt.target.classList.toggle('element__btn-like_active');
}

function handleCardDelete(evt) {
    evt.target.closest('.element').remove();
}

// Функция создания карточки
function addCard(titleValue, imgValue) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardIconLike = cardElement.querySelector('.element__btn-like');
    const cardPic = cardElement.getElementById('card-pic');
    const cardDelete = cardElement.querySelector('.element__btn-delete');

    cardElement.querySelector('.element__heading').textContent = titleValue;
    cardPic.src = imgValue;
    cardPic.alt = titleValue;
    cardPic.addEventListener('click', () => handleOpenImgPopup(titleValue, imgValue));

    fullscreenCloseBtn.addEventListener('click', function () {
        popupFullscreen.classList.remove('popup_opened');
    });
    cardIconLike.addEventListener('click', handleCardLike);
    
    cardDelete.addEventListener('click', handleCardDelete);

    return cardElement;
}

// Функции рендера карточек
function renderCardAppend(titleValue, imgValue) {
    cardsContainer.append(addCard(titleValue, imgValue));
};

function renderCardPrepend(titleValue, imgValue) {
    cardsContainer.prepend(addCard(titleValue, imgValue));
};