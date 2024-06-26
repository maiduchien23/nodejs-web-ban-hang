const permissionUtils = require("../../../utils/permissionUtils");
const model = require("../../../models/index");
const User = model.User;
const Product = model.Product;
const Order = model.Order;
const Type = model.Type;
const News = model.News;

const moduleName = "Tổng quan";

module.exports = {
  index: async (req, res) => {
    const title = "Dashboard";
    const userName = req.user.name;

    const productQuantity = await Product.count();
    const orderQuantity = await Order.count();
    const newsQuantity = await News.count();

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/dashboard/index", {
      title,
      moduleName,
      productQuantity,
      orderQuantity,
      newsQuantity,
      permissionUser,
      permissionUtils,
      userName,
    });
  },
};
