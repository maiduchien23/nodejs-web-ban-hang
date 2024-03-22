const FacebookStrategy = require("passport-facebook").Strategy;
const model = require("../../models/index");
const User = model.User;
const SocialAccount = model.SocialAccount;

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["email"],
    profileFields: ["id", "displayName", "email"],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { id, displayName, email } = profile;
    const provider = "facebook";

    let socialAccount = await SocialAccount.findOne({
      where: {
        socialMedia: provider,
        socialMediaId: id,
      },
    });

    if (!socialAccount) {
      done(null, false, {
        message: req.flash(
          "error",
          "Không tồn tại tài khoản nào liên kết với Facebook này!"
        ),
      });
      return;
    }

    let user = await User.findByPk(socialAccount.userId);

    if (!user) {
      user = await User.create({
        username: displayName,
        email,
      });
    } else {
      user.username = displayName;
      user.email = email;

      await user.save();
    }

    done(null, user);
  }
);
