function fetchImg() {
  return fetch(
    `https://pixabay.com/api/?key=30150755-c61622b73d763821aed9d9577`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function onInputChange() {
  const name = inputForm.value.trim();
  if (name === '') {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return (listEl.innerHTML = ''), (countryEl.innerHTML = '');
  }
  fetchCountries(name)
    .then(response => {
      listEl.innerHTML = '';
      countryEl.innerHTML = '';

      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length < 10 && response.length >= 2) {
        listEl.insertAdjacentHTML('beforeend', renderCountryList(response));
      } else {
        countryEl.insertAdjacentHTML('beforeend', renderCountryInfo(response));
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    });
}

// рендер по условию
function renderCountryList(amount) {
  return amount
    .map(({ flags, name }) => {
      return
    })
    .join('');
}

function renderCountryInfo(amount) {
  return amount
    .map(({ flags, name, capital, population, languages }) => {
      return
    })
    .join('');
}