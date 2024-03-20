const model = require("../../../models/index");
const Type = model.Type;
const SocialAccount = model.SocialAccount;

module.exports = {
  connectFacebook: async (req, res) => {
    const userTypeId = req.user.typeId;

    const typeName = await Type.findOne({
      where: {
        id: userTypeId,
      },
    });

    if (typeName.name === "Admin") {
      return res.redirect("/admin/profile");
    } else if (typeName.name === "Teacher" || typeName.name === "TA") {
      return res.redirect("/teacher/profile");
    } else {
      return res.redirect("/profile");
    }
  },

  connectGoogle: async (req, res) => {
    const userTypeId = req.user.typeId;

    const typeName = await Type.findOne({
      where: {
        id: userTypeId,
      },
    });

    if (typeName.name === "Admin") {
      return res.redirect("/admin/profile");
    } else {
      return res.redirect("/profile");
    }
  },

  disconnectFacebook: async (req, res) => {
    const userId = req.user.id;
    const provider = "facebook";
    await SocialAccount.destroy({
      where: {
        userId: userId,
        socialMedia: provider,
      },
    });

    const userTypeId = req.user.typeId;

    const typeName = await Type.findOne({
      where: {
        id: userTypeId,
      },
    });

    if (typeName.name === "Admin") {
    } else {
      return res.redirect("/profile");
    }
  },

  disconnectGoogle: async (req, res) => {
    const userId = req.user.id;
    const provider = "google";
    await SocialAccount.destroy({
      where: {
        userId: userId,
        socialMedia: provider,
      },
    });

    const userTypeId = req.user.typeId;

    const typeName = await Type.findOne({
      where: {
        id: userTypeId,
      },
    });

    if (typeName.name === "Admin") {
      return res.redirect("/admin/profile");
    } else {
      return res.redirect("/profile");
    }
  },

  // disconnectGithub: async (req, res) => {
  //   const userId = req.user.id;
  //   const provider = "github";
  //   await SocialAccount.destroy({
  //     where: {
  //       userId: userId,
  //       socialMedia: provider,
  //     },
  //   });

  //   const userTypeId = req.user.typeId;

  //   const typeName = await Type.findOne({
  //     where: {
  //       id: userTypeId,
  //     },
  //   });

  //   if (typeName.name === "Admin") {
  //     return res.redirect("/admin/profile");
  //
  //   } else {
  //     return res.redirect("/profile");
  //   }
  // },
};
