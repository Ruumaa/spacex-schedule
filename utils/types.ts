export interface LaunchesUpcoming {
  __typename: string;
  id: string;
  launch_date_utc: string;
  launch_year: string;
  mission_name: string;
  rocket: Rocket;
}

interface Rocket {
  __typename: string;
  rocket: {
    __typename: string;
    id: string;
    name: string;
    country: string;
    first_flight: string;
    success_rate_pct: number;
    cost_per_launch: number;
    wikipedia: string;
  };
}
