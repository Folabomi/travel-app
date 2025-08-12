import { Accommodation } from '@/types/itinerary';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {accommodation.hotel}
          </h3>
          <div className="text-lg text-gray-600 mb-2">
            {accommodation.location}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {accommodation.nights && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {accommodation.nights} nights
              </span>
            )}
            
            {accommodation.cost_cash > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                ${(accommodation.cost_cash / (accommodation.nights || 1)).toFixed(0)}/night
              </span>
            )}
          </div>
          
          {accommodation.notes && (
            <div className="text-sm text-gray-500 mt-2">
              {accommodation.notes}
            </div>
          )}
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 text-right">
          <div className="space-y-2">
            {typeof accommodation.cost_points === 'number' && accommodation.cost_points > 0 && (
              <div className="text-lg font-semibold text-blue-600">
                {accommodation.cost_points.toLocaleString()} pts
              </div>
            )}
            {accommodation.cost_cash > 0 && (
              <div className="text-lg font-semibold text-green-600">
                ${accommodation.cost_cash} {accommodation.currency}
              </div>
            )}
            {accommodation.cost_points === 'TBD' && (
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