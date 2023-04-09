import Notiflix from 'notiflix';

const delayElem = document.querySelector('input[name="delay"]');
const stepElem = document.querySelector('input[name="step"]');
const amountElem = document.querySelector('input[name="amount"]');
const buttonCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

buttonCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delayElem.value);
  let delayStep = Number(stepElem.value);
  for (let i = 0; i < amountElem.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
