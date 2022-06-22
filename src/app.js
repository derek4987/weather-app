// single page weather app js 


// functions to import

// default background and weather data
const initialPage = () => {
    let defaultValue = 'Kansas+City';
    unsplashBg(defaultValue);
}

// update background
const searchCity = () => {
    const seachButton = document.querySelector('#searchButton');
    seachButton.addEventListener('click', function(e) {
        updateBg();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key ==='Enter') {
          updateBg();
        }
    });
}

export { initialPage };
export { searchCity };


// background image
// load unsplash image
function unsplashBg(value) {
    const img = document.querySelector('#bgImage');
    const client_id = "v1qiZp2SUUh-SN7uY-Kg5s8qkPtUgcj3vHM_dSGuwTI"
    fetch(`https://api.unsplash.com/search/photos?query=${value}&client_id=${client_id}`)
        .then(function(response) {    
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            let selectedPhoto = Math.floor(Math.random() * 10);
            img.src = response.results[selectedPhoto].urls.regular;
            // response.results.forEach(photo => {
            //     img.src = photo.urls.regular;
            // });
        })
        .catch(function() {
            // add default image or message to DOM if it fails
            console.log('Cannot retrieve data');
        });
}

function updateBg() {
    let searchValue = document.querySelector('.weatherSearch').value;
    searchValue = searchValue.split(' ').join('+');
    unsplashBg(searchValue);
}