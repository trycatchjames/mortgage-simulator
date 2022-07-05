import React, { FormEvent, useState } from 'react';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loanAmount, setLoanAmount] = useState(searchParams.get('principle') || 0);
  const [interestRate, setInterestRate] = useState(searchParams.get('interest') || 0);
  const [repayments, setRepayments] = useState(searchParams.get('repayments') || 0);
  const [repaymentFrequency, setRepaymentFrequency] = useState(searchParams.get('repayment_frequency') || 'fortnightly');
  const [multipleScenarios, setMultipleScenarios] = useState(searchParams.get('scenarios') !== '1');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const params = {
      principle: `${loanAmount}`,
      interest: `${interestRate}`,
      repayments: `${repayments}`,
      repayment_frequency: repaymentFrequency,
      scenarios: multipleScenarios ? '5' : '1',
    };
    navigate({
      pathname: '/results',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <header className="hero-content text-center">
        <div className='max-w-lg font-bold'>
          <h1 className='text-5xl mb-10'>Mortgage Simulator</h1>
          <p className='mb-5'>
            How long will it take to pay off your mortgage? Simulate different repayment goals and different interest rates to see what happens to your loan duration.
          </p>
          <form onSubmit={handleSubmit}>
            <label className='label'>
              Loan amount
              <input
                type="number"
                placeholder=""
                required
                className="input input-bordered w-full max-w-xs"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setLoanAmount(+e.target.value)}}
                defaultValue={loanAmount || ''}
              />
            </label>
            <label className='label'>
              Repayments
              <input
                type="number"
                placeholder=""
                required
                className="input input-bordered w-full max-w-xs"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setRepayments(+e.target.value)}}
                defaultValue={repayments || ''}
              />
            </label>
            <label className='label'>
              Repayment frequency
              <select 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setRepaymentFrequency(e.target.value)}}
                className="select select-bordered w-full max-w-xs"
                defaultValue={repaymentFrequency}
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
            <label className='label'>
              Interest rate
              <input
                type="number"
                step="0.01"
                placeholder=""
                required
                className="input input-bordered w-full max-w-xs"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setInterestRate(+e.target.value)}}
                defaultValue={interestRate || ''}
              />
            </label>
            
            <label className='label'>
              Simulate multiple interet rates
              <input
                type="checkbox"
                className="checkbox bg-white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMultipleScenarios(e.target.checked)}}
              />
            </label>
            <div>
              <input type="submit" className='btn btn-primary' value="Run" />
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Home;
