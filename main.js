const button = document.querySelector('#button');
const textarea = document.querySelector('#textarea');
const info = document.querySelector('#info');
const input = document.querySelector('#input');
let country;

info.addEventListener('click', ()=>{
    console.log('fdfdfdf')
    input.classList.remove('hidden')
    info.classList.add('hidden')
})

button.addEventListener('click', () => {
    country = textarea.value;
    const countryPromise = fetch('https://api.sampleapis.com/countries/countries');
    countryPromise
        .then((data) => data.json()
        .then(list => {
            const item = list.find((value) => value.name.toLowerCase() === country.toLowerCase());
            textarea.value = ''
            input.classList.add('hidden')
            info.classList.remove('hidden')
            if (item) {
                info.innerHTML = drawInfo(item)
            }
            else{
                console.error('check correct input')
                info.innerHTML = 'Please, check correct input<br><br>(tap to try again)'
            }
        })
    )
    .catch((error) => {
        console.error(error);
    });
});


function drawInfo(countryInfo){
    return `
        <h2 class="country__name">${countryInfo.name}</h2>
        <img src="${countryInfo.media.flag}" alt="" class="country__img">
        <p class="country__info-text">Capital: ${countryInfo.capital}</p>
        <p class="country__info-text">Phone: +${countryInfo.phone}</p>
        <p class="country__info-text">Population: ${countryInfo.population}</p>
    `
}