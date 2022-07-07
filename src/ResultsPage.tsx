import React from 'react';
import MortgageChart from './MortgageChart';
import { useSearchParams, useNavigate } from "react-router-dom";
import MortgageTable from './MortgageTable';

function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const principle = searchParams.get('principle');
  const interest = searchParams.get('interest');
  const repayments = searchParams.get('repayments');
  const repaymentFrequency = searchParams.get('repayment_frequency') || 'fortnightly';
  const scenarios = searchParams.get('scenarios') || 1;
  const handleBackButton = () => {
    navigate({
      pathname: '/',
      search: `?${searchParams.toString()}`,
    });
  };

  if (
    principle === null
    || interest === null
    || repayments === null
  ) {
    return <div className="App">Not enough data</div>
  }
  return (
    <div>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-3xl font-bold">${principle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} at {interest}%</h1>
            <p className="py-6">
              Repayments of ${repayments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {repaymentFrequency}.
            </p>
            <button className='btn btn-sm' onClick={handleBackButton}>Edit</button>
          </div>
        </div>
      </div>
      <div>

      
      </div>
      <div className='m-10'>
        <MortgageChart
          principle={+principle}
          interest={+interest}
          repayments={+repayments}
          repaymentFrequency={repaymentFrequency}
          scenarios={+scenarios}
        />
      </div>
      <div className='m-10'>
        <MortgageTable
          principle={+principle}
          interest={+interest}
          repayments={+repayments}
          repaymentFrequency={repaymentFrequency}
          scenarios={+scenarios}
        />
      </div>
    </div>
  );
}

export default ResultsPage;
