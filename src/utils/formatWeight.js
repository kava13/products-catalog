export default (weight) => {
  let formatedWeight = Math.round(weight / 100) * 100;
  let measure = "";

  if (formatedWeight >= 1000) {
    formatedWeight = (weight / 1000).toFixed(1);
    measure = "кг";
  } else {
    measure = "г";
  }

  return `${formatedWeight} ${measure}`;
};
