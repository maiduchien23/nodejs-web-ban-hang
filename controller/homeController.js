module.exports = {
  index: (req, res) => {
    const title = "Trang chủ F8";
    const products = ["Sản phẩm 1", "Sản phẩm 2", "Sản phẩm 3"];
    return res.render("home", { title, products });
  },
  about: (req, res) => {
    return res.send("Trang chủ");
  },
};
