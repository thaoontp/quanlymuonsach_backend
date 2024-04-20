module.exports = {
  multipleMongoseToObject: function (mongseArray) {
    return mongseArray.map((mongseArray) => mongseArray.toObject());
  },
  mongooseToObject: function (mongose) {
    return mongose ? mongose.toObject() : mongose;
  },
};
