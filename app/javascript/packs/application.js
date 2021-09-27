[...document.getElementsByTagName('form')].forEach((form) => {
  form.addEventListener('change', (e) => {
    if (e.target.value !== '') {
      e.target.parentElement.classList.add('has-value');
    } else {
      e.target.parentElement.classList.remove('has-value');
    }
  });
});
