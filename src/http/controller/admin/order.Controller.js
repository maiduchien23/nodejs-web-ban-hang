const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Sequelize = require("sequelize");

const SendEmail = require("../../../services/SendEmail");
const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const permissionUtils = require("../../../utils/permissionUtils");
const validate = require("../../../utils/validate");
const generatePass = require("../../../utils/generatePass");
const model = require("../../../models/index");
const Order = model.Order;
const OrderDetail = model.OrderDetail;
const Product = model.Product;
const User = model.User;
const Combo = model.Combo;

const moduleName = "Đơn hàng";

function generateOrderCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderCode = "";
  for (let i = 0; i < length; i++) {
    orderCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return `#${orderCode}`;
}

// Hàm kiểm tra xem mã đơn hàng đã tồn tại trong cơ sở dữ liệu chưa
async function isOrderCodeUnique(orderCode) {
  const existingOrder = await Order.findOne({
    where: { orderCode: orderCode },
  });
  return !existingOrder; // Trả về true nếu mã đơn hàng chưa tồn tại, ngược lại trả về false
}
async function generateUniqueOrderCode(length) {
  let orderCode = generateOrderCode(length);
  // Kiểm tra xem mã đơn hàng đã tồn tại trong cơ sở dữ liệu chưa
  while (!(await isOrderCodeUnique(orderCode))) {
    orderCode = generateOrderCode(length); // Nếu mã đơn hàng đã tồn tại, tạo lại mã mới
  }
  return orderCode;
}
module.exports = {
  index: async (req, res) => {
    const title = "Danh sách đơn hàng";
    const userName = req.user.name;
    const filters = {};

    let { keyword, page, recordNumber } = req.query;
    if (!recordNumber) {
      recordNumber = 5;
    }

    if (keyword) {
      filters[Op.or] = [
        {
          order_number: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    const totalCountObj = await Order.findAndCountAll({
      where: filters,
    });
    const totalCount = totalCountObj.count;
    const totalPage = Math.ceil(totalCount / recordNumber);
    if (!page || page < 1) {
      page = 1;
    }
    if (page > totalPage && page > 1) {
      page = totalPage;
    }

    const offset = (page - 1) * recordNumber;
    const orders = await Order.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
      include: [
        { model: OrderDetail, include: [Product] },
        {
          model: User,
          as: "User",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const orderCode = await generateUniqueOrderCode(6);

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/order/index", {
      title,
      moduleName,
      orders,
      moment,
      userName,
      totalPage,
      page,
      recordNumber,
      getPaginateUrl,
      req,
      permissionUser,
      permissionUtils,
      orderCode,
    });
  },

  add: async (req, res) => {
    const title = "Thêm đơn hàng";
    const userName = req.user.name;
    const orderCode = await generateUniqueOrderCode(6);
    const products = await Product.findAll();
    const users = await User.findAll();
    const combos = await Combo.findAll();

    const permissionUser = await permissionUtils.roleUser(req);
    // Truyền dữ liệu vào view
    res.render("admin/order/add", {
      title,
      moduleName,
      userName,
      orderCode,
      combos,
      products,
      users,
      permissionUser,
      permissionUtils,
    });
  },

  store: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        userId,
        totalAmount,
        status,
        orderDate,
        phone,
        province,
        district,
        ward,
        addressDetail,
        orderNote,
        orderItems,
        orderQuantities,
        orderPricePerUnits,
      } = req.body;

      const orderCode = await generateUniqueOrderCode(6);

      const newOrder = await Order.create({
        userId,
        status,
        orderDate,
        phone,
        province,
        district,
        ward,
        addressDetail,
        orderNote,
        totalAmount,
        orderCode,
      });

      // Lưu chi tiết đơn hàng
      for (let i = 0; i < orderItems.length; i++) {
        await OrderDetail.create({
          orderId: newOrder.id,
          productId: orderItems[i],
          quantity: orderQuantities[i],
          pricePerUnit: orderPricePerUnits[i],
        });
      }

      req.flash("success", "Thêm đơn hàng thành công");
      res.redirect("/admin/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      req.flash("errors", "Đã xảy ra lỗi khi tạo đơn hàng");
      res.redirect("/admin/orders/add");
    }
  },

  edit: async (req, res) => {
    const orderId = req.params.id;
    try {
      // Tìm đơn hàng cần sửa trong cơ sở dữ liệu
      const order = await Order.findByPk(orderId, {
        include: {
          model: OrderDetail,
          include: Product,
        },
      });
      if (!order) {
        // Nếu không tìm thấy đơn hàng, redirect đến trang danh sách đơn hàng
        return res.redirect("/admin/orders");
      }
      const title = `Sửa đơn hàng`;
      const moduleName = "Order";
      const userName = req.user.name;
      const errors = req.flash("errors");
      const combos = await Combo.findAll();
      // Lấy thông tin người dùng hiện tại
      const users = await User.findAll();

      // Lấy danh sách sản phẩm từ cơ sở dữ liệu
      const products = await Product.findAll();

      // Kiểm tra quyền của người dùng
      const permissionUser = await permissionUtils.roleUser(req);

      // Truyền dữ liệu vào view
      res.render("admin/order/edit", {
        title,
        moduleName,
        userName,
        permissionUser,
        permissionUtils,
        order,
        combos,
        products,
        users,
        errors,
        moment,
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error in editing order:", error);
      // Redirect hoặc render trang lỗi
      res.redirect("/admin/orders"); // Ví dụ: redirect về trang danh sách đơn hàng
    }
  },

  // Định nghĩa phương thức để cập nhật đơn hàng trong cơ sở dữ liệu
  update: async (req, res) => {
    const orderId = req.params.id;
    // Tìm đơn hàng cần cập nhật trong cơ sở dữ liệu
    const order = await Order.findByPk(orderId);
    if (!order) {
      // Nếu không tìm thấy đơn hàng, redirect đến trang danh sách đơn hàng
      return res.redirect("/admin/orders");
    }
    // Validate dữ liệu nhập vào từ form sửa đơn hàng
    const result = validationResult(req);

    if (result.isEmpty()) {
      try {
        // Lấy thông tin đơn hàng từ req.body
        const {
          userId,
          orderDate,
          totalAmount,
          status,
          phone,
          province,
          district,
          ward,
          addressDetail,
          orderNote,
        } = req.body;
        // Cập nhật thông tin đơn hàng
        await order.update({
          userId,
          orderDate,
          totalAmount,
          phone,
          province,
          district,
          ward,
          addressDetail,
          orderNote,
          status,
        });

        req.flash("success", "Cập nhật đơn hàng thành công");
        // Redirect đến trang danh sách đơn hàng sau khi cập nhật thành công
        res.redirect(`/admin/orders/edit/${orderId}`);
      } catch (error) {
        console.error("Error updating order:", error);
        req.flash("errors", "Đã xảy ra lỗi khi cập nhật đơn hàng");
        res.redirect(`/admin/orders/edit/${orderId}`);
      }
    } else {
      // Nếu dữ liệu không hợp lệ, render lại trang sửa đơn hàng với thông báo lỗi
      res.render("admin/order/edit", {
        title: `Sửa đơn hàng`,
        moduleName,
        userName: req.user.name,
        errors: result.errors,
        order,
      });
    }
  },

  orderDetail: async (req, res) => {
    const orderId = req.params.id;
    const title = `Chi tiết đơn hàng`;
    const userName = req.user.name;
    const error = req.flash("errors");
    const success = req.flash("success");

    const order = await Order.findByPk(orderId, {
      include: [
        { model: OrderDetail, include: [Product] },
        { model: User, as: "User" },
      ],
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/order/orderDetail", {
      title,
      moduleName,
      userName,
      permissionUser,
      permissionUtils,
      order,
      error,
      success,
      moment,
    });
  },

  // Định nghĩa phương thức để xóa đơn hàng khỏi cơ sở dữ liệu
  destroy: async (req, res) => {
    try {
      const orderId = req.params.id;
      // Tìm đơn hàng cần xóa trong cơ sở dữ liệu và thực hiện xóa
      await Order.destroy({ where: { id: orderId } });
      // Redirect đến trang danh sách đơn hàng sau khi xóa thành công
      res.redirect("/admin/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  export: async (req, res) => {
    const title = "Export File";
    const userName = req.user.name;
    const orders = await Order.findAll({
      include: [
        { model: OrderDetail, include: [Product] },
        { model: User, as: "User" },
      ],
    });

    const columns = constants.orderColumnFile;
    const date = new Date().getTime();
    const fileName = `order_${date}.xlsx`;
    exportFile(res, orders, "Order", fileName, columns);
  },

  // Định nghĩa phương thức để nhập danh sách đơn hàng từ file Excel vào cơ sở dữ liệu
  import: async (req, res) => {
    const title = "Import File";
    const userName = req.user.name;

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/order/import", {
      title,
      moduleName,
      permissionUser,
      permissionUtils,
      userName,
    });
  },

  handleImport: async (req, res) => {
    const file = req.file;

    // Kiểm tra xem tệp không được xuất trước đó hay không
    if (!file.originalname.includes("order")) {
      req.flash("errors", [
        { msg: "Tếp không hợp lệ. Hãy chọn tếp không xuất này hệ thống." },
      ]);
      return res.redirect("/admin/orders/import");
    }

    // Tiến hành nhap dữ liệu
    const data = await importFile(file.path);

    try {
      for (let index = 0; index < data.length; index++) {
        await Order.create({
          orderCode: data[index].column_1,
          userId: data[index].column_2,
          phone: data[index].column_3,
          totalAmount: data[index].column_4,
          status: data[index].column_5,
          province: data[index].column_6,
          district: data[index].column_7,
          ward: data[index].column_8,
          addressDetail: data[index].column_9,
          orderDate: req.body.orderDate,
        });
      }
      redirect("/admin/orders");
    } catch (error) {
      console.error("Error importing file:", error);
      req.flash("errors", [
        { msg: "Đã xảy ra lỗi khi nhập khẩu tệp. Vui lòng thử lại." },
      ]);
      res.redirect("/admin/orders/import");
    }
  },
};
