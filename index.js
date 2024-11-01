const centerButton = document.getElementById("center-button");

//mapa inicializado y centrado en Madrid
const map = new maplibregl.Map({
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [-3.7038, 40.4168],
    zoom: 9.5,
    container: 'map',
  });

//Conseguir as infos das bikes
const bikeStation = async() => {
  try {
    const response = await fetch('https://api.citybik.es/v2/networks/bicimad');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

bikeStation()

//agregar marcadores donde hay rees de bikes
const markers = [];
  bikeStation().then(data2 => {
  data2.network.stations.forEach(({name, latitude, longitude, free_bikes, slots}) => {
    marker.push({name, latitude, longitude, free_bikes, empty_slots})
  });

  var marker = new maplibregl.Marker({color: tieneBicis(station.free_bikes)})//color de acuerdo con disponibilidad
    .setLngLat([station.longitude, station.latitude])
    .setPopup(new maplibregl.Popup().setHTML(`Station: ${station.name}`<br>`Free Bikes: ${station.free_bikes} Empty Slots: ${station.empty_slots}`))
    .addTo(map);

  //cambiar el color del marcador según disponibilidad:  
  const tieneBicis = (free) => {
        if (free > 10) {return "#28b463"} 
        else if (free < 5) {return "#e74c3c"} 
        else {return "#f7dc6f"}
      };
});
 

//Hacer funcion para centrar en la localizacion del usuario:
//function btBuscarCerca(){}

//centerButton.addEventListener("click", btBuscarCerca)