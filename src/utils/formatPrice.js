export default (price) => {
  let formatedPrice = Math.round(price / 100) * 100;

  if (formatedPrice >= 1000) {
    formatedPrice = formatedPrice / 100;
    formatedPrice =
      formatedPrice.toString().slice(0, 1) +
      " " +
      formatedPrice.toString().slice(1) +
      "00";
  }

  return `${formatedPrice} ₽`;
};
