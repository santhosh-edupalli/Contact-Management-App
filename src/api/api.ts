// api.ts

import { QueryFunctionContext } from 'react-query';
import { GraphData, Country } from '../types'

// export const fetchWorldwideData = async (): Promise<WorldwideData> => {
//   const response = await fetch('https://disease.sh/v3/covid-19/all');
//   const data = await response.json();
//   return data;
// };

export const fetchCountryData = async (): Promise<Country[]> => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  const data = await response.json();
  return data;
};

export const fetchGraphData = async (context: QueryFunctionContext): Promise<GraphData> => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  const data = await response.json();
  return data;
};
