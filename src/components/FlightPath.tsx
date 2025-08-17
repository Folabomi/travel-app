'use client';

import { Flight } from '@/types/itinerary';

interface FlightPathProps {
  flights: Flight[];
}

export default function FlightPath({ flights }: FlightPathProps) {
  const cities = [
    { code: 'SEA', name: 'Seattle', country: 'USA' },
    { code: 'DOH', name: 'Doha', country: 'Qatar' },
    { code: 'NBO', name: 'Nairobi', country: 'Kenya' },
    { code: 'CPT', name: 'Cape Town', country: 'South Africa' },
    { code: 'JNB', name: 'Johannesburg', country: 'South Africa' },
    { code: 'LOS', name: 'Lagos', country: 'Nigeria' }
  ];

  const getFlightStatus = (index: number) => {
    // For demo purposes, showing different states
    if (index === 0) return 'completed';
    if (index === 1) return 'upcoming';
    return 'planned';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'planned': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flight Path</h2>
      
      {/* Progress Overview */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Trip Progress</span>
          <span className="text-sm font-medium text-blue-600">1 of 6 flights</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '16.7%'}}></div>
        </div>
      </div>

      {/* Flight Path Visualization */}
      <div className="relative">
        {cities.map((city, index) => {
          const isLast = index === cities.length - 1;
          const flight = flights[index];
          const flightStatus = getFlightStatus(index);
          
          return (
            <div key={city.code} className="relative">
              {/* City Node */}
              <div className="flex items-center mb-6">
                {/* Airport Circle */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center font-bold text-sm ${getStatusColor(flightStatus)}`}>
                    <span className="text-white">{city.code}</span>
                  </div>
                  
                  {/* Connection Line */}
                  {!isLast && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Flight Path Indicator */}
                  {!isLast && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16">
                      <div 
                        className={`w-0.5 bg-gradient-to-b from-blue-400 to-transparent transition-all duration-1000 ${
                          flightStatus === 'completed' ? 'h-full' : flightStatus === 'upcoming' ? 'h-1/2' : 'h-0'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
                
                {/* City Information */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{city.name}</h3>
                      <p className="text-sm text-gray-600">{city.country}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        flightStatus === 'completed' ? 'bg-green-100 text-green-700' :
                        flightStatus === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {flightStatus === 'completed' ? 'Completed' :
                         flightStatus === 'upcoming' ? 'Next' : 'Planned'}
                      </span>
                    </div>
                    
                    {/* Flight Details */}
                    {flight && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-700">
                          {flight.airline_program || 'Cash'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.cost_points > 0 ? `${flight.cost_points.toLocaleString()} pts` : ''}
                          {flight.cost_cash > 0 ? ` + $${flight.cost_cash}` : ''}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Flight Route Info */}
                  {!isLast && flight && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{flight.route}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          {flight.cabin_class && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {flight.cabin_class}
                            </span>
                          )}
                          <span>{flight.notes}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Airplane Icon for Active Flight */}
              {flightStatus === 'upcoming' && !isLast && (
                <div className="absolute left-5 top-16 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white p-1 rounded-full shadow-lg animate-pulse">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18l9-12h-5L10 2 6 6H1l9 12z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Trip Stats - Flighty Style */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">32</div>
          <div className="text-xs uppercase tracking-wide text-gray-600">Days</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">6</div>
          <div className="text-xs uppercase tracking-wide text-gray-600">Flights</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">4</div>
          <div className="text-xs uppercase tracking-wide text-gray-600">Countries</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">402k</div>
          <div className="text-xs uppercase tracking-wide text-gray-600">Points</div>
        </div>
      </div>
    </div>
  );
}