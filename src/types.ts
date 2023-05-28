
export interface RootState {
    contacts: Contact[];
}

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    status: 'active' | 'inactive';
}
  
  
export type Status = 'active' | 'inactive';
  

export interface ContactAction {
    type: string;
    payload: Contact;
}

export interface GraphData {
    cases: Record<string, number>; // Key-value pairs where the key is a date (string) and the value is the number of cases (number)
    deaths: Record<string, number>; // Key-value pairs where the key is a date (string) and the value is the number of deaths (number)
    recovered: Record<string, number>; // Key-value pairs where the key is a date (string) and the value is the number of recovered cases (number)
}

export type Country = {
    updated: number;
    country: string;
    countryInfo: {
      _id: number;
      iso2: string;
      iso3: string;
      lat: number;
      long: number;
      flag: string;
    };
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
};
  
  