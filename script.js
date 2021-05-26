const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const apiAccessKey = 'owGRKD3dAGhIg-7Qm8xYBwxci1kRRzpli-79E7Z1JPE';
let imageCount;
const query = 'horse';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiAccessKey}&query=${query}&count=${imageCount}`;

function setImageCount() {
    imageCount = totalImages === 0 ? 5 : 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiAccessKey}&query=${query}&count=${imageCount}`;
}

// Check if all images has loaded
function imageLoaded() {
    imagesLoaded++;
    
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Get photos from Unsplash API
async function getPhotos() {
    setImageCount();
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('error...');
    }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach(photo => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        // Event listener, check when image has loaded
        img.addEventListener('load', imageLoaded)

        // Add to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Check if scrolling near bottom of page, if so load more photos.
window.addEventListener('scroll', () => {
    if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
