const button = document.querySelector(".locations");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerHTML = "Tu navegador no soporta la geolocalizacion.";
  }
});

function onSuccess(position) {
  let {latitude, longitude} = position.coords;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=25eb412ee5d447f39c819e2b8163a6c9`;
  fetch(url).then((response) =>
    response.json().then((data) => {
        let detalles = data.results[0].components;
        let {state, county, postcode, country} = detalles;
        button.innerHTML = `${state}, ${county}, ${country}`;
        console.log(detalles)
    })
  );
}

function onError(error) {
  if (error.code == 1) {
    button.innerHTML = `¡Has denegado la localizacion!`;
  } else if (error.code == 2) {
    button.innerHTML = `¡Localizacion no valida!`;
  } else if (error.code == 3) {
    button.innerHTML = `¡Ha ocurrido un error!`;
  }
  button.setAttribute("disabled", "true");
}
