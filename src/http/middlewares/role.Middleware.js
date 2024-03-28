// const model = require("../../models/index");
// const Type = model.Type;
// /**
//  * type.name: [Admin, Customer, Manager]
//  */
// module.exports = async (req, res, next) => {
//   const type = await Type.findOne({
//     where: {
//       id: req.user.typeId,
//     },
//   });

//   const rolePath = `/${type.name.toLowerCase()}`;

//   if (req.originalUrl.startsWith(rolePath)) {
//     return next();
//   } else {
//     const isNotCustomer = /\/(manager|admin)/.test(req.originalUrl);

//     if (isNotCustomer) {
//       if (type.name === "Customer") {
//         return res.render("error/404.ejs", {
//           layout: "layouts/auth.layout.ejs",
//         });
//       } else {
//         return res.redirect(rolePath);
//       }
//     } else {
//       if (req.originalUrl === "/" && !(type.name === "Customer")) {
//         return res.redirect(rolePath);
//       } else {
//         return next();
//       }
//     }
//   }
// };
