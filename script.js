// This acts as your "backend" database for the map.
// Add all your map pin data here.
const mapData = [
    {
        type: 'history',
        x_percent: 45.2, // % from left
        y_percent: 60.5, // % from top
        title: 'Palus Village (Palus)',
        text: 'This was a major permanent settlement for the Palus people, located at the confluence of the Snake and Palouse rivers.',
        image: '',
        audio: '[Audio file of Palus oral history]' // 
    },
    {
        type: 'history',
        x_percent: 30.8,
        y_percent: 42.1,
        title: 'Camas Gathering Grounds',
        text: 'These fields were vital for harvesting camas bulbs, a primary food source managed by the Palus.',
        image: '',
        audio: ''
    },
    {
        type: 'restoration',
        x_percent: 52.0,
        y_percent: 35.0,
        title: 'PCEI Restoration Site',
        text: 'A modern restoration project by the Palouse Conservation Environmental Institute, working to replant native grasses. [cite: 22]',
        image: '',
        audio: '[Audio file of interview with conservationist]' // 
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
        popup.style.left = item.x_percent + '%'; // Position popup near pin
        popup.style.top = item.y_percent + '%';  // (Can be improved)

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
            // Your professor warned about copyright [cite: 24]
            // Be sure to use pre-recorded histories, e.g., from the Plateau Peoples' Portal [cite: 18]
            popupContent += `<audio controls src="${item.audio}">Your browser does not support the audio element.</audio>`;
        }
        
        popup.innerHTML = popupContent;
        
        // 4. Add click event to show/hide
        pin.addEventListener('click', () => {
            // Hide all other popups
            document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
            // Show this one
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
