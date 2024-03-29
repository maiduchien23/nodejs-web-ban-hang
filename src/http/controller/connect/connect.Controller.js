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
      return res.redirect("/admin");
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
      return res.redirect("/admin");
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
      return res.redirect("/admin");
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
      return res.redirect("/admin");
    }
  },
};
