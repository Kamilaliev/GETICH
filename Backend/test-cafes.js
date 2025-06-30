const axios = require('axios');

const GOOGLE_API_KEY = 'AIzaSyC0_QjeURgqq5F0W7UA87YU-hLZ647PSzU';

async function getNearbyCafes(lat, lng, radius = 1000) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const params = {
      location: `${lat},${lng}`,
      radius,
      type: 'cafe',
      key: GOOGLE_API_KEY,
    };

    const response = await axios.get(url, { params });
    const cafes = response.data.results;

    cafes.forEach((cafe, i) => {
      console.log(`#${i + 1}: ${cafe.name}`);
      console.log(`   Координаты: ${cafe.geometry.location.lat}, ${cafe.geometry.location.lng}`);
      console.log(`   Адрес: ${cafe.vicinity}`);
      console.log('---');
    });

    return cafes;
  } catch (error) {
    console.error('Ошибка при получении кофеен:', error.message);
    return [];
  }
}

getNearbyCafes(40.375505, 49.846202); // координаты центра Баку (рядом с MADO)
