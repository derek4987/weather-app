// single page weather app js 


// functions to import

// default background and weather data
const initialPage = () => {
    let defaultValue = 'Kansas+City';
    loadgif(defaultValue);
}

// update background
const updateBg = () => {


}

export { initialPage };


// background image

function loadgif(value) {
    const img = document.querySelector('#bgImage');
    const client_id = "v1qiZp2SUUh-SN7uY-Kg5s8qkPtUgcj3vHM_dSGuwTI"
    fetch(`https://api.unsplash.com/search/photos/?query=${value}$page=1&per_page=1&client_id=${client_id}`)
        .then(function(response) {
            console.log(response);    
            return response.json();
        })
        .then(function(response) {
            // const imageSrc = response.results.urls.regular;
            // console.log(imageSrc);
            // img.src = response.results.urls.regular;
            // console.log(img.src);
            console.log(response);
            response.results.forEach(photo => {
                img.src = photo.urls.regular;
            });
        })
        .catch(function() {
            // add default image or message to DOM if it fails
            console.log('Cannot retrieve data');
        });
}