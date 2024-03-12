const model = require("../../../models/index");
console.log(model);
module.exports = {
  index: async (req, res) => {
    res.render("products/home/index");
  },
};
