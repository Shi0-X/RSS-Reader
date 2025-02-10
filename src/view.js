export const renderFeedback = (input, feedback, message, isValid) => {
  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    feedback.style.display = 'none';
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
};

