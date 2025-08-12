import { CostSummary as CostSummaryType } from '@/types/itinerary';

interface CostSummaryProps {
  costSummary: CostSummaryType;
}

export default function CostSummary({ costSummary }: CostSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Cost Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Flights (Cash)</span>
          <span className="font-semibold">${costSummary.flights_cash}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Accommodations</span>
          <span className="font-semibold">${costSummary.accommodations_cash}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Visas</span>
          <span className="font-semibold">${costSummary.visas}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 bg-blue-50 px-3 rounded-lg">
          <span className="font-medium text-blue-800">Total Fixed Cash</span>
          <span className="text-xl font-bold text-blue-600">
            ${costSummary.total_fixed_cash}
          </span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 mb-3">Points Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Avios</span>
            <span className="font-medium">{costSummary.points_summary.avios.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">United Miles</span>
            <span className="font-medium">{costSummary.points_summary.united_miles.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Kenya Airways Miles</span>
            <span className="font-medium">{costSummary.points_summary.kenya_airways_miles.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}