const div = document.getElementById('div');
const btn = document.getElementById('btn');
const infa = document.getElementById('infa');

let latitude, longitude; 

fetch("https://ipinfo.io/json?token=7a2cb3aeb4861a")
  .then((response) => response.json())
  .then((jsonResponse) => {
    
    console.log(jsonResponse);

    const [lat, lon] = jsonResponse.loc.split(',');

    
    latitude = lat;
    longitude = lon;

    infa.innerHTML = `
      <h2>Долгота и широта: ${jsonResponse.loc}</h2>
      <h2>Страна: ${jsonResponse.country}</h2>
      <h2>Город: ${jsonResponse.city}</h2>
      <h2>IP адрес: ${jsonResponse.ip}</h2>
      <h2>Internet provayder: ${jsonResponse.org}</h2>
    `;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=12&output=embed`;
    iframe.width = "600";
    iframe.height = "450";
    iframe.allowFullScreen = true;

    infa.appendChild(iframe);
  })
  .catch((error) => {
    console.error('Ошибка при получении данных: ', error);
  });

btn.addEventListener('click', () => {
  if (latitude && longitude) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
    iframe.width = "600";
    iframe.height = "450";
    iframe.allowFullScreen = true;

    infa.innerHTML = ''; 
    infa.appendChild(iframe);
  } else {
    console.log("Координаты еще не получены.");
  }
});
