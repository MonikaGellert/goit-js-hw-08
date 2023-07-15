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

function formSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;

  if (!elements.email.value || !elements.message.value) {
    return alert('Заповни всі поля форми перш ніж надсилати! Негайно!');
  }

  console.log({
    emali: elements.email.value,
    message: elements.message.value,
  });

  event.target.reset();
  // console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.clear(STORAGE_KEY);
}
