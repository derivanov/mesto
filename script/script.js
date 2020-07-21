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




// Профиль
// Находим профиль
const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Находим попап профиля, и форму
const popupProfile = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('#profile-container');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#profession')
const profileCloseBtn = document.querySelector('#close-profile');

// Функция открытия и закрытия попапа профиля
function profilePopupToggle() {
    if (popupProfile.classList.contains('popup_opened')) {
        popupProfile.classList.remove('popup_opened');
    } else {
        popupProfile.classList.add('popup_opened');
        nameInput.value = profileHeading.textContent;
        jobInput.value = profileCaption.textContent;
    }
}

// Функция отправки данных из формы в профиль
function formSubmitProfileHandler (evt) {
    evt.preventDefault();
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    profilePopupToggle();
}

// Кнопка отправки данных из формы в профиль
profileForm.addEventListener('submit', formSubmitProfileHandler);

// Присваиваем кнопкам профиля открытие и закрытие
profileEditBtn.addEventListener('click', profilePopupToggle);
profileCloseBtn.addEventListener('click', profilePopupToggle);




// Новая карточка
// Находим кнопку создания карточки
const newCardBtn = document.querySelector('.profile__add-button');

// Находим попап создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('#new-card-container');
const cardTitleInput = document.querySelector('#card-title');
const cardLinkInput = document.querySelector('#card-link');
const newCardCloseBtn = document.querySelector('#close-new-card');

// Функция открытия и закрытия попапа создания новой карточки
function newCardPopupToggle() {
    if (popupNewCard.classList.contains('popup_opened')) {
        popupNewCard.classList.remove('popup_opened');
    } else {
        popupNewCard.classList.add('popup_opened');
    }
}

// Функция отправки данных из формы в новую карточку
function formSubmitNewCardHandler (evt) {
    evt.preventDefault();
    addCard(cardTitleInput.value, cardLinkInput.value);
    newCardPopupToggle();
    cardTitleInput.value = '';
    cardLinkInput.value = '';
}

// Кнопка отпраки данных из формы в новую карточку
newCardForm.addEventListener('submit', formSubmitNewCardHandler);

// Присваиваем кнопкам создания карточки открытие и закрытие
newCardBtn.addEventListener('click', newCardPopupToggle);
newCardCloseBtn.addEventListener('click', newCardPopupToggle);




// Находим попап полноэкранного просмотра фото карточек
const popupFullscreen = document.querySelector('.popup_fullscreen');
const fullscreenHeading = document.querySelector('.fullscreen__heading');
const fullscreenPic = document.getElementById('fullscreen-pic');
const fullscreenCloseBtn = document.querySelector('#close-fullscreen');




// Карточки
// Находим контейнер для карточек
const cardsContainer = document.querySelector('.elements');

// Задаем исходное состояние карточек при загрузке страницы
initialCards.map(item => addCard(item.name, item.link));

// Очень сложная функция добавления карточки которую я не знаю как разбить чтобы ничего не сломалось
function addCard(titleValue, imgValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__heading').textContent = titleValue;
    cardElement.getElementById('card-pic').src = imgValue;
    cardElement.getElementById('card-pic').alt = titleValue;
    cardElement.getElementById('card-pic').addEventListener('click', function () {
        popupFullscreen.classList.add('popup_opened');
        fullscreenHeading.textContent = titleValue;
        fullscreenPic.src = imgValue;
    });
    fullscreenCloseBtn.addEventListener('click', function () {
        popupFullscreen.classList.remove('popup_opened');
    });
    cardElement.querySelector('.element__btn-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__btn-like_active');
    });
    cardElement.querySelector('.element__btn-delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    cardsContainer.prepend(cardElement);
}