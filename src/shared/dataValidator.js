const ValidateData = (errors) => {
  if (!errors.isEmpty()) {
    const { param } = errors.errors.find((value) => value.param);
    console.log(param);
    if (param) {
      return param;
    }
  }
};

export default ValidateData;
