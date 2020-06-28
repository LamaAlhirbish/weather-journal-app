// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=86c6a44bc911527817ade2931977920a';

// create new date instance
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

let d = new Date();
let newDate = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then (function(data) {
         postData('/addData', {date: newDate, country: data.sys.country,
            name: data.name, temp: data.main.temp, content: content});
    })
    .then(
        function() {
            updateUI()
        })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch (baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch(err) {
        console.log('error', err);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)        
  });

  try {
      const newData = await res.json();
      return newData;
  } catch(err) {
      console.log("error", err);
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const req = await fetch('/getData');
    try{
      const getData = await req.json();
      console.log('getData app.js');
      console.log(getData);
      document.getElementById('date').innerHTML = getData["date"];
      document.getElementById('country').innerHTML = `Weather in ${getData["name"]}, ${getData["country"]}`;
      document.getElementById('temp').innerHTML = `${getData["temp"]} °C`;
      document.getElementById('content').innerHTML = `You feel ${getData["content"]}`;
  
    }catch(error){
      console.log("error updateUI", error);
    }
}