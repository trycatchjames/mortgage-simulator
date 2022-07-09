import React, { useState } from 'react';
import CurrencyFormatter from '../Components/CurrencyFormatter'
import NumberFormat from 'react-number-format';

interface OverrideObject {
  [key: number]: number;
}
interface Props {
  rowId: number;
  balance: number;
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

export default function MortgageRow(props: Props) {
  const currentYear = new Date().getFullYear();
  const [isEditing, setIsEditing] = useState(false);
  const interestEdited = typeof props.interestOverrides[props.rowId] !== 'undefined';
  const repaymentsEdited = typeof props.repaymentOverrides[props.rowId] !== 'undefined';
  const [interestRate, setInterestRate] = useState(props.interestOverrides[props.rowId] || props.interest);
  const [repayments, setRepayments] = useState(props.repaymentOverrides[props.rowId] || props.repayments);

  const handleUpdateRow = () => {
    setIsEditing(false);
    if (props.interestOverrides[props.rowId] !== interestRate) {
      const newOverride: OverrideObject = {};
      newOverride[props.rowId] = interestRate;
      props.updateInterestOverrides(Object.assign({}, props.interestOverrides, newOverride));
    }
    if (props.repaymentOverrides[props.rowId] !== interestRate) {
      const newOverride: OverrideObject = {};
      newOverride[props.rowId] = repayments;
      props.updateRepaymentOverrides(Object.assign({}, props.repaymentOverrides, newOverride));
    }
  };

  return (
    <tr>
      <th>{currentYear + props.rowId - 1} - Year {props.rowId+1}</th>
      <td className='text-right font-mono'><CurrencyFormatter value={+props.balance} /></td>
      <td>
        {isEditing ? (
          <>
            <NumberFormat
              className={`input input-bordered w-24`}
              thousandSeparator={true}
              suffix={'%'}
              onValueChange={(value) => {setInterestRate(value.floatValue!)}}
              defaultValue={interestRate}
            />
          </>
        ) : (
          <>
            {interestEdited ? (
              <>
                {interestRate}%
              </>
            ) : (
              <>-</>
            )}
          </>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <NumberFormat
              prefix={'$'}
              thousandSeparator={true}
              isNumericString={true}
              className="input input-bordered w-36"
              onValueChange={(value) => {setRepayments(value.floatValue!)}}
              defaultValue={repayments}
            />
          </>
        ) : (
          <>
            {repaymentsEdited ? (
              <div className='font-mono'>
                <CurrencyFormatter value={repayments} />
              </div>
            ) : (
              <>-</>
            )}
          </>
        )}
      </td>
      <td>
        {isEditing ? (
          <button className="btn btn-xs btn-primary btn-outline" onClick={handleUpdateRow}>Save</button>
        ) : (
          <button className="btn btn-xs btn-outline btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </td>
    </tr>
  );
};