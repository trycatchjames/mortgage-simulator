interface Props {
  value: number;
}

function CurrencyFormatter(props: Props) {
  const display = '$' + props.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <>{display}</>
  );
}

export default CurrencyFormatter;