const container=document.querySelector(".container");
const search=document.querySelector(".searchbox button");
const weatherbox=document.querySelector(".weatherbox");
const weatherdetails=document.querySelector(".weatherdetails");
const error404 = document.querySelector(".notfound");
const cityhide = document.querySelector('.cityhide');
const cityinput =document.querySelector('.searchbox input');

const fetchweatherdata = () =>{
    const APIKey ="497e3fa6a8f4c9c5952e2d6b68876d4e";
    const city =cityinput.value;
    if(city=="")
    return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod == '404'){
            cityhide.textContent = city;
            container.style.height ="400px";
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            error404.classList.add('active');
        }else{

        container.style.height ="555px";
        container.classList.add('active');
        weatherbox.classList.add('active');
        weatherdetails.classList.add('active');
        error404.classList.remove('active');
        
        const image =document.querySelector('.weatherbox img');
        const temperature =document.querySelector('.weatherbox .temperature');
        const description =document.querySelector('.weatherbox .description');
        const humidity =document.querySelector('.weatherdetails .humidity span');
        const wind =document.querySelector('.weatherdetails .wind span');

        if(cityhide.textContent == city){
            return;
        }
        else{
            cityhide.textContent = city;

         container.style.height ="555px";
         weatherbox.classList.add('active');
         weatherdetails.classList.add('active');
         error404.classList.remove('active');

         switch(json.weather[0].main){
            case 'Clear':
               image.src = './images/clear.png';
               break;
           
            case 'Rain':
                image.src = './images/rain.png';
               break;   
               
            case 'Snow':
              image.src = './images/snow.png';
              break; 
       
            case 'Cloud':
             image.src = './images/cloud.png';
             break;  
             
            case 'Mist':
               image.src = './images/mist.png';
               break;
           
            case 'Haze':
             image.src = './images/mist.png';
             break;    
             
            default:
            image.src ='./images/cloud.png';
       }

       temperature.textContent = json.main.temp + "°C";
       description.textContent = json.weather[0].description;
       humidity.textContent = json.main.humidity + "%";
       wind.textContent = json.wind.speed + " Km/h";

        }};
    });
};

search.addEventListener('click', fetchweatherdata);

cityinput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        fetchweatherdata();
    }
});





