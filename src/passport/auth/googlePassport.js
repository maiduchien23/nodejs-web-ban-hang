const GoogleStrategy = require("passport-google-oauth2").Strategy;
const model = require("../../models/index");
const User = model.User;
const SocialAccount = model.SocialAccount;

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
    const { id, displayName, email } = profile;

    const provider = "google";
    let providerDetail = await SocialAccount.findOne({
      where: {
        socialMedia: provider,
        socialMediaId: id,
      },
    });

    if (!providerDetail?.userId) {
      done(null, false, {
        message: req.flash(
          "error",
          "Không tồn tại tài khoản nào liên kết với Google này!"
        ),
      });
      return;
    }

    let user = await User.findOne({
      where: {
        id: providerDetail.userId,
      },
    });

    if (!user) {
      user = await User.create({
        username: displayName,
        email,
      });
    }

    return done(null, user);
  }
);
