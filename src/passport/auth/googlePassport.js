const GoogleStrategy = require("passport-google-oauth2").Strategy;
const model = require("../../models/index");
const SocialAccount = model.SocialAccount;
const User = model.User;

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile", "email"],
    prompt: "select_account",
  },

  async (req, accessToken, refreshToken, profile, done) => {
    const { id } = profile;

    const social_media = "google";
    let socialDetail = await SocialAccount.findOne({
      where: {
        social_media: social_media,
        social_media_id: id,
      },
    });
    if (!socialDetail?.user_id) {
      done(null, false, {
        message: req.flash(
          "error",
          "Không tồn tại tài khoản nào liên kết với google này!"
        ),
      });
      return;
    }
    const user = await User.findOne({
      where: {
        id: socialDetail.user_id,
      },
    });
    return done(null, user);
  }
);
