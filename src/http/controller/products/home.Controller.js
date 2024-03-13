const model = require("../../../models/index");

module.exports = {
  index: async (req, res) => {
    res.render("products/home/index");
  },
};
