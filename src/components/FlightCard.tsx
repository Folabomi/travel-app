import { Flight } from '@/types/itinerary';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const [origin, destination] = flight.route.split(' → ');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-2xl font-bold text-gray-800">
              {origin}
            </div>
            <div className="flex-1 relative">
              <div className="border-t-2 border-dashed border-gray-300"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {destination}
            </div>
          </div>
          
          {flight.airline_program && (
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Program:</span> {flight.airline_program}
            </div>
          )}
          
          {flight.cabin_class && (
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Class:</span> {flight.cabin_class}
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            {flight.notes}
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 text-right">
          <div className="space-y-2">
            {flight.cost_points > 0 && (
              <div className="text-lg font-semibold text-blue-600">
                {flight.cost_points.toLocaleString()} pts
              </div>
            )}
            {flight.cost_cash > 0 && (
              <div className="text-lg font-semibold text-green-600">
                ${flight.cost_cash} {flight.currency}
              </div>
            )}
            {flight.cost_points === 0 && flight.cost_cash === 0 && (
              <div className="text-lg font-semibold text-gray-400">
                TBD
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}