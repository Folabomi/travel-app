'use client';

import { useState } from 'react';

export default function FlightSearch() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy'
  });

  const handleSearch = () => {
    const params = new URLSearchParams({
      f: '0',
      gl: 'US',
      hl: 'en',
      curr: 'USD',
      tfs: `f.${searchParams.origin}.${searchParams.destination}.${searchParams.departureDate}` +
            (searchParams.returnDate ? `.${searchParams.returnDate}` : '') +
            `*t.${searchParams.passengers}.${searchParams.cabinClass.toUpperCase()}.LX.${searchParams.passengers}`
    });

    const googleFlightsUrl = `https://www.google.com/travel/flights?${params.toString()}`;
    window.open(googleFlightsUrl, '_blank');
  };

  const presetRoutes = [
    { name: 'SEA → DOH', origin: 'SEA', destination: 'DOH', route: 'Seattle to Doha' },
    { name: 'DOH → NBO', origin: 'DOH', destination: 'NBO', route: 'Doha to Nairobi' },
    { name: 'NBO → CPT', origin: 'NBO', destination: 'CPT', route: 'Nairobi to Cape Town' },
    { name: 'CPT → JNB', origin: 'CPT', destination: 'JNB', route: 'Cape Town to Johannesburg' },
    { name: 'JNB → LOS', origin: 'JNB', destination: 'LOS', route: 'Johannesburg to Lagos' },
    { name: 'LOS → SEA', origin: 'LOS', destination: 'SEA', route: 'Lagos to Seattle' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Flights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              value={searchParams.origin}
              onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
              placeholder="Airport code (e.g., SEA)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              value={searchParams.destination}
              onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
              placeholder="Airport code (e.g., DOH)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Return (Optional)</label>
            <input
              type="date"
              value={searchParams.returnDate}
              onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <select
              value={searchParams.passengers}
              onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cabin Class</label>
            <select
              value={searchParams.cabinClass}
              onChange={(e) => setSearchParams({...searchParams, cabinClass: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!searchParams.origin || !searchParams.destination || !searchParams.departureDate}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Search on Google Flights
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Itinerary Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presetRoutes.map((route, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => setSearchParams({
                ...searchParams,
                origin: route.origin,
                destination: route.destination
              })}
            >
              <div className="font-medium text-gray-800">{route.name}</div>
              <div className="text-sm text-gray-600">{route.route}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}