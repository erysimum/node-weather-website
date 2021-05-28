const form = document.querySelector('form');
const searchTerm = document.querySelector('input');
const messagezero = document.querySelector('#messagezero');
const messageone = document.querySelector('#messageone');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchTerm.value;

  messagezero.textContent = 'Loading..';

  messageone.textContent = '';

  const url = `/weather?address=${location}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messagezero.textContent = data.error;
      } else {
        messageone.textContent = `temperature:${data.temperature},
                                  feelslike: ${data.feelslike},
                                   wind_speed: ${data.wind_speed},
                                    humidity: ${data.humidity},
                                     visibility: ${data.visibility}`;
        messagezero.textContent = '';
      }
    });
  });
});
