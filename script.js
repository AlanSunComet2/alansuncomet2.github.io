// This acts as your "backend" database for the map.
// I have implemented your images here.
const mapData = [
    {
        type: 'history',
        x_percent: 45.2, // % from left (You still need to adjust this!)
        y_percent: 60.5, // % from top (You still need to adjust this!)
        title: 'Palus Village (Palus)',
        text: 'This was a major permanent settlement for the Palus people, located near the confluence of the Snake and Palouse rivers.',
        image: 'palus-woman-child.jpg', // NEW IMAGE
        audio: '[Audio file of Palus oral history]' 
    },
    {
        type: 'history',
        x_percent: 30.8, // % from left (You still need to adjust this!)
        y_percent: 42.1, // % from top (You still need to adjust this!)
        title: 'Camas Gathering Grounds',
        text: 'These fields were vital for harvesting camas bulbs, a primary food source managed by the Palus.',
        image: '', // No image provided for this, which is fine
        audio: ''
    },
    {
        type: 'history', // Changed from 'restoration' to fit the image
        x_percent: 55.0, // % from left (You still need to adjust this!)
        y_percent: 40.0, // % from top (You still need to adjust this!)
        title: 'The Agricultural Transformation', // NEW TITLE
        text: 'The displacement of the Palus led to intensive, large-scale farming, as seen in this historical photo of a drill seeder. This practice transformed the native prairie ecosystem.', // NEW TEXT
        image: 'palouse-farming.jpg', // NEW IMAGE
        audio: ''
    }
];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('interactive-map-container');

    // Loop through the "database" and create pins and popups
    mapData.forEach(item => {
        // 1. Create the Pin
        const pin = document.createElement('div');
        pin.className = 'map-pin ' + (item.type === 'history' ? 'pin-history' : 'pin-restoration');
        pin.style.left = item.x_percent + '%';
        pin.style.top = item.y_percent + '%';
        
        // 2. Create the Pop-up
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.style.left = item.x_percent + '%'; 
        popup.style.top = item.y_percent + '%';  

        // 3. Add content to the Pop-up
        let popupContent = `
            <span class="close-btn">&times;</span>
            <h4>${item.title}</h4>
            <p>${item.text}</p>
        `;
        
        if (item.image) {
            popupContent += `<img src="${item.image}" alt="${item.title}">`;
        }
        
        if (item.audio) {
            popupContent += `<audio controls src="${item.audio}">Your browser does not support the audio element.</audio>`;
        }
        
        popup.innerHTML = popupContent;
        
        // 4. Add click event to show/hide
        pin.addEventListener('click', () => {
            document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
            popup.style.display = 'block';
        });

        popup.querySelector('.close-btn').addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // 5. Add them to the map
        mapContainer.appendChild(pin);
        mapContainer.appendChild(popup);
    });
});
