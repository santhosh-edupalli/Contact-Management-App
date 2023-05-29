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
    <div className="flex flex-col w-4/6 justify-center mx-auto">
      <div className="border rounded-lg shadow-lg p-4 flex-start">
      <p className="text-xl font-bold uppercase mb-4">Graph Data</p>
        {graphData && <LineChart graphData={graphData} />}
      </div>
      <div className="border rounded-lg shadow-lg p-4 flex-end mt-10">
      <p className="text-xl font-bold uppercase mb-4">Country Wise Data</p>
        <Map countries={countryCovidData}></Map>
      </div>
    </div>
  );
};

export default Dashboard;
