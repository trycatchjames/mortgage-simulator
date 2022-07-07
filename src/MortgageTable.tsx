import React from 'react';
import {makeSeries} from './MortgageChart';
import CurrencyFormatter from './Components/CurrencyFormatter'

interface Props {
  principle: number;
  repayments: number;
  interest: number;
  repaymentFrequency: string;
  scenarios: number;
}

export default function MortgageTable(props: Props) {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Year</th>
              <th className='text-right'>End of Year Balance</th>
              {/* <th>Interest Rate</th>
              <th>Yearly Repayments</th> */}
            </tr>
          </thead>
          <tbody>
            {makeSeries(props.repayments, props.principle, props.interest, props.repaymentFrequency).map((balance, i) => (
              <tr key={i}>
                <th>{currentYear + i - 1} - Year {i+1}</th>
                <td className='text-right font-mono'><CurrencyFormatter value={+balance} /></td>
                {/* <td></td>
                <td></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};