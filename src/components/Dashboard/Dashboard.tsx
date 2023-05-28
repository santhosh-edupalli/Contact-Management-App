import React from 'react';
import { useQuery } from 'react-query';
import { fetchGraphData, fetchCountryData } from '../../api/api';
import LineChart from './LineChart';
import Map from './Map';

const Dashboard: React.FC = () => {
  const countryCovidDataQuery = useQuery('countryCovidData', fetchCountryData);
  const graphDataQuery = useQuery('graphData', fetchGraphData);

  // useEffect(() => {
  //   // Refresh the data every 10 minutes
  //   const interval = setInterval(() => {
  //     graphDataQuery.refetch();
  //     countryCovidDataQuery.refetch();
  //   }, 600000);

  //   return () => clearInterval(interval);
  // }, [graphDataQuery]);

  if (graphDataQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (graphDataQuery.isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const countryCovidData = countryCovidDataQuery.data || [];
  const graphData = graphDataQuery.data;

  return (
    <div>
      <h2>Graph Data</h2>
      {graphData && <LineChart graphData={graphData} />}
      <Map countries={countryCovidData}></Map>
    </div>
  );
};

export default Dashboard;
