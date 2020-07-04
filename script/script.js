// Опредлеяем кнопки редактирования и закрытия, находим попап
let profileEditBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');

// Функция открытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
    console.log('Открыть форму');
}

// Функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
    console.log('Закрыть форму');
}

// Присваеваем функции открытия и закрытия кнопкам
profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);


// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('#fullname');
    let jobInput = document.querySelector('#profession');

    // Получаем значение полей из свойства value
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    // Выбераем элементы, куда должны быть вставлены значения полей
    let profileHeading = document.querySelector('.profile__heading');
    let profileCaption = document.querySelector('.profile__caption');

    // Вставляем новые значения с помощью textContent
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);