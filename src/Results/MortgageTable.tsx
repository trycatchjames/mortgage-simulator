import React from 'react';
import {makeSeries} from './MortgageChart';
import MortgageRow from './MortgageRow';

interface OverrideObject {
  [key: number]: number;
}
interface Props {
  principle: number;
  repayments: number;
  interest: number;
  repaymentFrequency: string;
  scenarios: number;
  interestOverrides: OverrideObject;
  repaymentOverrides: OverrideObject;
  updateInterestOverrides: CallableFunction;
  updateRepaymentOverrides: CallableFunction;
}

export default function MortgageTable(props: Props) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Year</th>
              <th className='text-right'>Start of Year Balance</th>
              <th>Interest Rate</th>
              <th>Repayments {props.repaymentFrequency}</th>
              <th className='w-16'></th>
            </tr>
          </thead>
          <tbody>
            {makeSeries(props.repayments, props.principle, props.interest, props.repaymentFrequency, props.interestOverrides, props.repaymentOverrides).map((balance, i) => (
              <MortgageRow
                key={i}
                rowId={i}
                balance={+balance}
                {...props}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};