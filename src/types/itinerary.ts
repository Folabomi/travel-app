export interface Flight {
  route: string;
  airline_program: string | null;
  cost_points: number;
  cost_cash: number;
  currency: string;
  cabin_class?: string;
  notes: string;
}

export interface Accommodation {
  location: string;
  hotel: string;
  nights: number | null;
  cost_cash: number;
  cost_points: number | string;
  currency: string;
  notes?: string;
}

export interface Visa {
  country: string;
  required: boolean;
  cost: number;
  currency: string;
  type?: string;
  notes: string;
}

export interface TripOverview {
  destination: string;
  dates: string;
  duration_days: number;
  traveler_status: {
    citizenship: string;
    residency: string;
  };
}

export interface CostSummary {
  flights_cash: number;
  accommodations_cash: number;
  visas: number;
  total_fixed_cash: number;
  currency: string;
  points_summary: {
    avios: number;
    united_miles: number;
    kenya_airways_miles: number;
  };
}

export interface BudgetItem {
  category: string;
  items: string[];
  estimated_daily_cost?: {
    min: number;
    max: number;
    currency: string;
  };
  estimated_cost?: string;
}

export interface Insight {
  type: string;
  description: string;
}

export interface EstimatedCosts {
  conservative_estimate: number;
  moderate_estimate: number;
  luxury_estimate: number;
  currency: string;
  notes: string;
}

export interface TotalBudget {
  conservative: number;
  moderate: number;
  luxury: number;
  currency: string;
  excludes: string;
}

export interface Itinerary {
  trip_overview: TripOverview;
  flights: Flight[];
  accommodations: Accommodation[];
  visas: Visa[];
  cost_summary: CostSummary;
  missing_budget_items: BudgetItem[];
  insights: Insight[];
  estimated_additional_costs: EstimatedCosts;
  total_estimated_budget: TotalBudget;
}