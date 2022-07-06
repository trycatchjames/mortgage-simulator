import React, { FormEvent, useState } from 'react';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('principle') ? 1 : 0);
  const [submitted, setSubmitted] = useState(false);
  const [loanAmount, setLoanAmount] = useState(searchParams.get('principle') || 0);
  const [interestRate, setInterestRate] = useState(searchParams.get('interest') || 0);
  const [repayments, setRepayments] = useState(searchParams.get('repayments') || 0);
  const [repaymentFrequency, setRepaymentFrequency] = useState(searchParams.get('repayment_frequency') || 'fortnightly');

  const handleBack = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPage(page - 1);
  };

  const handleNext = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
    if (!loanAmount || !interestRate) {
      return;
    }
    const params = {
      principle: `${loanAmount}`,
      interest: `${interestRate}`,
      repayments: `${repayments}`,
      repayment_frequency: repaymentFrequency,
    };
    navigate({
      pathname: '/results',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="hero min-h-screen">
      <header className="hero-content text-center">
        <div className='max-w-lg font-bold'>
          <h1 className='text-5xl mb-10'>Mortgage Simulator</h1>
          {page === 0 ? (
            <>
              <p className='mb-5'>
                How long will it take to pay off your mortgage?
              </p>
              <p>
                Simulate different repayment goals and different interest rates to see what happens to your loan duration.
              </p>

              <div className={`mt-10 flex flex-row justify-end`}>
                <button className='btn btn-primary' onClick={handleNext}>Next</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className='label'>
                Loan amount
                <input
                  type="number"
                  placeholder=""
                  required
                  className={`input input-bordered w-full max-w-xs ${submitted && !loanAmount ? 'input-bordered input-error' : ''}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setLoanAmount(+e.target.value)}}
                  defaultValue={loanAmount || ''}
                />
              </label>
              <label className='label'>
                Interest rate
                <input
                  type="number"
                  step="0.01"
                  placeholder=""
                  required
                  className={`input input-bordered w-full max-w-xs ${submitted && !interestRate ? 'input-bordered input-error' : ''}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setInterestRate(+e.target.value)}}
                  defaultValue={interestRate || ''}
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
              <div className="mt-10 flex flex-row justify-between">
              <button className='btn btn-outline btn-default' onClick={handleBack}>Back</button>
                <input type="submit" className='btn btn-primary' value="Submit" />
              </div>
            </form>
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;
