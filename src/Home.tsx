import React, { FormEvent, useState } from 'react';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import NumberFormat from 'react-number-format';

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('principle') ? 1 : 0);
  const [submitted, setSubmitted] = useState(false);
  const [loanAmount, setLoanAmount] = useState(searchParams.get('principle') || 0);
  const [interestRate, setInterestRate] = useState(searchParams.get('interest') || 0);
  const [repayments, setRepayments] = useState(searchParams.get('repayments') || 0);
  const [repaymentsOverriden, setRepaymentsOverriden] = useState(!!searchParams.get('repayments'));
  const [repaymentFrequency, setRepaymentFrequency] = useState(searchParams.get('repayment_frequency') || '');

  const calculateRepayments = (): number => {
    console.log(repayments || repaymentsOverriden);
    if (repayments && repaymentsOverriden) {
      return +repayments;
    }
    if (!loanAmount || !interestRate || !repaymentFrequency) {
      return 0;
    }
    
    let repaymentInterval = 12;
    if (repaymentFrequency === 'weekly') { 
      repaymentInterval = 52
    } else if (repaymentFrequency === 'fortnightly') {
      repaymentInterval = 26;
    }
    const principal = +loanAmount;
    const interest = +interestRate / 100 / repaymentInterval;
    const loanYears = 25;
    var payments = loanYears * repaymentInterval;

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest)/(x-1);

    // Check that the result is a finite number. If so, display the results.
    if (!isNaN(monthly) && 
        (monthly !== Number.POSITIVE_INFINITY) &&
        (monthly !== Number.NEGATIVE_INFINITY)) {

        return Math.round(monthly);
    }

    return 0;
  };

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
      repayments: `${calculateRepayments()}`,
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
                <NumberFormat
                  className={`input input-bordered w-full max-w-xs ${submitted && !loanAmount ? 'input-bordered input-error' : ''}`}
                  thousandSeparator={true}
                  prefix={'$'}
                  onValueChange={(value) => {setLoanAmount(value.floatValue!)}}
                  defaultValue={loanAmount || ''}
                />
              </label>
              <label className='label'>
                Interest rate
                <NumberFormat
                  className={`input input-bordered w-full max-w-xs ${submitted && !interestRate ? 'input-bordered input-error' : ''}`}
                  thousandSeparator={true}
                  suffix={'%'}
                  onValueChange={(value) => {setInterestRate(value.floatValue!)}}
                  defaultValue={interestRate || ''}
                />
              </label>
              <label className='label'>
                Repayment frequency
                <select 
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setRepaymentFrequency(e.target.value)}}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={repaymentFrequency}
                  required
                >
                  <option value=""></option>
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
              <label className='label'>
                Repayments
                <NumberFormat
                  prefix={'$'}
                  thousandSeparator={true}
                  isNumericString={true}
                  className="input input-bordered w-full max-w-xs"
                  onValueChange={(value, source) => {
                    if (source.source !== 'prop') {
                      setRepaymentsOverriden(true);
                    }
                    setRepayments(value.floatValue!);
                  }}
                  value={calculateRepayments()}
                />
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
