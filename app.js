console.log("conectado");

const API_KEY = "fb8dfbfec5a79a44561fdc36fafc4167"
const API_ESP="sp"


const log = position => console.log(position);

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${API_ESP}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => setWeatherData(data))


}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        locacion: data.name,
        ciudad: data.sys.country,
        descripcion: data.weather[0].description,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        temperatura: data.main.temp,
        dato: getDate(),
    }
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    })

}

const getDate=()=>{
    let date= new Date();
    return `${date.getDate()}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}