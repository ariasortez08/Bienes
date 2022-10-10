(function () {
  const lat = 15.5;
  const lng = -88.0333;
  const mapa = L.map('mapa').setView([lat, lng], 13);
  let marker;

  //Utilizar Provider y Geocoder

  const geoCodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  // PIN MAPA

  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  // DETECTAR MOVIMIENTO PIN

  marker.on('moveend', function (e) {
    marker = e.target;
    const posicion = marker.getLatLng();
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

    //Obtener informacion de las calles al soltar el pin

    geoCodeService
      .reverse()
      .latlng(posicion, 13)
      .run(function (err, result) {
        // console.log(result);
        marker.bindPopup(result.address.LongLabel);

        //Llenar los campos

        document.querySelector('#direccion').value =
          result?.address?.Address ?? '';
      });
  });
})();
