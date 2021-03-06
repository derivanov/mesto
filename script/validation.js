// Создаем объект для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible'
};

// Создаем функцию валидации объекта
const enableValidation = ({ formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass }) => {
  const form = Array.from(document.querySelectorAll(formSelector));
  form.forEach((formElement) => {
      formElement.addEventListener('sumbit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass);
  });
}

// Создаем функцию-слушатель где собираем все инпуты и кнопки 
const setEventListeners = (formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass) => {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);
  inputs.forEach((inputElement) => {
      formElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
          toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
      });
  });
};

// Создаем функцию активации и деактивации кнопок после проверки валидации
const toggleButtonState = (inputs, buttonSubmit, inactiveButtonClass) => {
  if (isFormValid(inputs)) {
      buttonSubmit.classList.add(inactiveButtonClass);
      buttonSubmit.disabled = true;
  } else {
      buttonSubmit.classList.remove(inactiveButtonClass);
      buttonSubmit.disabled = false;
  }
};

// Создаем функцию валидации инпутов
const isFormValid = (inputs) => {
  return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

// Создаем функцию показа и скрытия ошибок после проверки валидации
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Функция показа ошибок
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция скрытия ошибок
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

// Запускаем валидацию объекта
enableValidation(validationConfig);