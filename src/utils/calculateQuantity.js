export default (quantity) => {
  let currentDotsArr = [];
  let text = "";
  const numberDots = Math.floor(quantity / 50);

  if (numberDots === 0) {
    text = "Мало";
    currentDotsArr = [{}];
  } else if (numberDots === 1) {
    text = "Средне";
    currentDotsArr = [{}, {}];
  } else if (numberDots >= 2) {
    text = "Много";
    currentDotsArr = [{}, {}, {}];
  }

  const dots = currentDotsArr.map((d) => (
    <img className="products-dot" src="/data/images/other/dot.png" />
  ));

  return (
    <>
      <span>{text}</span>
      <div className="products-dots">{dots}</div>
    </>
  );
};
