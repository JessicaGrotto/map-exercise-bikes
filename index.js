const centerButton = document.getElementById("center-button");

//mapa inicializado y centrado en Madrid
const map = new maplibregl.Map({
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [-3.7038, 40.4168],
    zoom: 9.5,
    container: 'map',
});

//Conseguir as infos de las bikes
const bikeStation = async() => {
  try {
    const response = await fetch('https://api.citybik.es/v2/networks/bicimad');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
}}

//cambiar el color del marcador según disponibilidad:  
const tieneBicis = (free) => {
  if (free > 10) {return "#28b463"} 
  else if (free < 5) {return "#e74c3c"} 
  else {return "#f7dc6f"}
};

bikeStation().then(data2 => {
    data2.network.stations.forEach(({name, latitude, longitude, free_bikes, empty_slots}) => { 
      //agregar marcadores donde hay rees de bikes
        var marker = new maplibregl.Marker({color: tieneBicis(free_bikes)})//color de acuerdo con disponibilidad
          .setLngLat([longitude, latitude])
          .setPopup(new maplibregl.Popup().setHTML(
            `<p>Station: ${name}</p>
            <p>Free Bikes: ${free_bikes} || Empty Slots: ${empty_slots}</p>`
          ))
          .addTo(map);
  });
});

bikeStation();
setInterval(bikeStation, 10000);

//Hacer funcion para centrar en la localizacion del usuario:
//function btBuscarCerca(){}

centerButton.addEventListener("click", btBuscarCerca())