import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(formElHandler, 500));
formEl.addEventListener('submit', formSubmit);

let formStateObj = {
  email: '',
  message: '',
};

const localFormState = localStorage.getItem(STORAGE_KEY);

if (localFormState) {
  formStateObj = JSON.parse(localFormState);
  formEl.elements.email.value = formStateObj.email;
  formEl.elements.message.value = formStateObj.message;
}

function formElHandler(event) {
  const targetName = event.target.name;
  const value = event.target.value;

  if (targetName === 'email') {
    formStateObj.email = value;
  } else if (targetName === 'message') {
    formStateObj.message = value;
  }
  const savedString = { ...formStateObj };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedString));
}

function setLocalData(data) {
  try {
    localStorage.setItem(keyFormLocalData, JSON.stringify(data));
  } catch (error) {
    console.log('Błąd podczas zapisu');
    console.log(error);
  }
}

function formSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;

  if (!elements.email.value || !elements.message.value) {
    return alert('Brak danych w lokalnym magazynie!');
  }

  console.log({
    emali: elements.email.value,
    message: elements.message.value,
  });

  function removeLocalStorage(STORAGE_KEY) {
    localStorage.removeItem(STORAGE_KEY);
  }

  // event.target.reset();

  // localStorage.clear(STORAGE_KEY);
}
