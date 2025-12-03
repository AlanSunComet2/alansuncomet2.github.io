// This acts as your "backend" database for the map.
// I have implemented your new images here.
const mapData = [
    {
        type: 'history',
        x_percent: 18.0, // Confluence of Snake & Palouse rivers (southwest)
        y_percent: 45.0,
        title: 'Palus Village (Palus)',
        text: 'This was a major permanent settlement for the Palus people, located at the confluence of the Snake and Palouse rivers (Trafzer, 1985). Here, the river provided sustenance and a connection to the broader region.',
        image: 'palus-woman-child.jpg',
        audio: ''
    },
    {
        type: 'history',
        x_percent: 94.0, // Weippe Prairie area (east of main Palouse)
        y_percent: 70.0,
        title: 'Camas Gathering Grounds',
        text: 'These fields were vital for harvesting camas bulbs. The Palus used selective harvesting (TEK) to ensure the plants would return year after year (NPS).',
        image: 'camas-field.png',
        audio: ''
    },
    {
        type: 'history',
        x_percent: 50.0, // Central Palouse agricultural region
        y_percent: 50.0,
        title: 'The Consequence: Soil Erosion',
        text: 'The displacement of the Palus led to intensive farming on steep slopes, resulting in catastrophic soil erosion, as seen in this photo (Duffin, 2007).',
        image: 'soil-erosion.png',
        audio: ''
    },
    {
        type: 'restoration',
        x_percent: 78.0, // Near Bovill, Idaho (northeast)
        y_percent: 25.0,
        title: 'Bobs Creek Restoration',
        text: 'Located near Bovill, Idaho, this project by PCEI restores riparian buffers. It demonstrates how modern science can align with Indigenous values of water stewardship (PCEI).',
        image: 'pcei-restoration.jpeg',
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
