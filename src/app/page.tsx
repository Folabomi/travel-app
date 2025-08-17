'use client';

import { useState } from 'react';
import itineraryData from '@/data/itinerary.json';
import { Itinerary } from '@/types/itinerary';
import FlightCard from '@/components/FlightCard';
import AccommodationCard from '@/components/AccommodationCard';
import CostSummary from '@/components/CostSummary';
import FlightSearch from '@/components/FlightSearch';
import HotelSearch from '@/components/HotelSearch';
import FlightPath from '@/components/FlightPath';

const itinerary = itineraryData as Itinerary;

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {itinerary.trip_overview.destination}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {itinerary.trip_overview.dates}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {itinerary.trip_overview.duration_days} days
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {itinerary.trip_overview.traveler_status.citizenship} citizen, {itinerary.trip_overview.traveler_status.residency} resident
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'flight-path', label: 'Flight Path' },
              { key: 'flights', label: 'Flights' },
              { key: 'hotels', label: 'Hotels' },
              { key: 'search-flights', label: 'Search Flights' },
              { key: 'search-hotels', label: 'Search Hotels' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-medium ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CostSummary costSummary={itinerary.cost_summary} />
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Visa Requirements</h2>
                <div className="space-y-3">
                  {itinerary.visas.map((visa, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      visa.required ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{visa.country}</h3>
                          <p className="text-sm text-gray-600">{visa.notes}</p>
                          {visa.type && (
                            <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-xs rounded">
                              {visa.type}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            visa.required ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {visa.required ? 'Required' : 'Not Required'}
                          </span>
                          {visa.cost > 0 && (
                            <p className="text-sm text-gray-600 mt-1">${visa.cost}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Travel Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {itinerary.insights.map((insight, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-medium text-blue-800 capitalize">
                        {insight.type.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-blue-700 mt-2">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flight-path' && <FlightPath flights={itinerary.flights} />}

          {activeTab === 'flights' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Flight Itinerary</h2>
              {itinerary.flights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Accommodations</h2>
              {itinerary.accommodations.map((accommodation, index) => (
                <AccommodationCard key={index} accommodation={accommodation} />
              ))}
            </div>
          )}

          {activeTab === 'search-flights' && <FlightSearch />}
          {activeTab === 'search-hotels' && <HotelSearch />}
        </div>
      </div>
    </main>
  );
}
