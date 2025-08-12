'use client';

import { useState } from 'react';

export default function HotelSearch() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkinDate: '',
    checkoutDate: '',
    guests: 2,
    rooms: 1
  });

  const handleGoogleSearch = () => {
    const checkin = searchParams.checkinDate.replace(/-/g, '-');
    const checkout = searchParams.checkoutDate.replace(/-/g, '-');
    
    const googleHotelsUrl = `https://www.google.com/travel/hotels/${searchParams.destination}?q=${encodeURIComponent(searchParams.destination + ' hotels')}&g2lb=2502548%2C2503781%2C2503771%2C2503893&hl=en-US&gl=us&cs=1&ssta=1&ts=CAESCAoCCAMKAggDGhwSGhIUCgcI5w8QDBgDEgcI5w8QDBgEGAEyAhAAKicKJRIjCgwKCi9tLzAxa3NiNjYSEwrQASIOEQAEAgQEAhQCAADWASMoAQ&rp=EAI&ictx=111&ved=0CAAQ5JsGahcKEwio4JSr8Y2EAxUAAAAAHQAAAAAQAw&utm_campaign=sharing&utm_medium=link&utm_source=htls&hrf=${checkin}&hrt=${checkout}&hrc=${searchParams.rooms}&hrs=${searchParams.guests}`;
    
    window.open(googleHotelsUrl, '_blank');
  };

  const handleBookingSearch = () => {
    const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(searchParams.destination)}&checkin=${searchParams.checkinDate}&checkout=${searchParams.checkoutDate}&group_adults=${searchParams.guests}&no_rooms=${searchParams.rooms}&group_children=0`;
    window.open(bookingUrl, '_blank');
  };

  const handleExpediaSearch = () => {
    const expediaUrl = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(searchParams.destination)}&startDate=${searchParams.checkinDate}&endDate=${searchParams.checkoutDate}&rooms=${searchParams.rooms}&adults=${searchParams.guests}`;
    window.open(expediaUrl, '_blank');
  };

  const cities = [
    { name: 'Doha, Qatar', code: 'DOH' },
    { name: 'Nairobi, Kenya', code: 'NBO' },
    { name: 'Diani Beach, Kenya', code: 'Diani' },
    { name: 'Cape Town, South Africa', code: 'CPT' },
    { name: 'Johannesburg, South Africa', code: 'JNB' },
    { name: 'Lagos, Nigeria', code: 'LOS' }
  ];

  const currentHotels = [
    { city: 'Doha', hotel: 'Qatar hotel program', cost: 'TBD', nights: 2 },
    { city: 'Nairobi', hotel: 'JW Marriott', cost: '$1,100', nights: 5 },
    { city: 'Diani Beach', hotel: 'TBD', cost: '$300', nights: 'TBD' },
    { city: 'Cape Town', hotel: 'Protea North Wharf', cost: '$2,200', nights: 14 },
    { city: 'Johannesburg', hotel: 'Melrose Marriott', cost: '$400', nights: 2 },
    { city: 'Lagos', hotel: 'Four Points by Sheraton', cost: '$2,300', nights: 9 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Hotels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={searchParams.destination}
              onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
              placeholder="City or hotel name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              value={searchParams.checkinDate}
              onChange={(e) => setSearchParams({...searchParams, checkinDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              value={searchParams.checkoutDate}
              onChange={(e) => setSearchParams({...searchParams, checkoutDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
            <select
              value={searchParams.guests}
              onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
            <select
              value={searchParams.rooms}
              onChange={(e) => setSearchParams({...searchParams, rooms: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'room' : 'rooms'}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGoogleSearch}
            disabled={!searchParams.destination || !searchParams.checkinDate || !searchParams.checkoutDate}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Search Google Hotels
          </button>
          
          <button
            onClick={handleBookingSearch}
            disabled={!searchParams.destination || !searchParams.checkinDate || !searchParams.checkoutDate}
            className="px-6 py-3 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Search Booking.com
          </button>
          
          <button
            onClick={handleExpediaSearch}
            disabled={!searchParams.destination || !searchParams.checkinDate || !searchParams.checkoutDate}
            className="px-6 py-3 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Search Expedia
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Itinerary Cities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => setSearchParams({
                ...searchParams,
                destination: city.name
              })}
            >
              <div className="font-medium text-gray-800">{city.name}</div>
              <div className="text-sm text-gray-600">Click to search hotels</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Hotel Bookings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentHotels.map((hotel, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{hotel.hotel}</h4>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                  {hotel.nights !== 'TBD' && (
                    <p className="text-sm text-gray-600">{hotel.nights} nights</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{hotel.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}