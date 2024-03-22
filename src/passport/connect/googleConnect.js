const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User, SocialAccounts } = require("../../models/index");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.CONNECT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.CONNECT_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CONNECT_GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile", "email"],
    prompt: "select_account",
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { id } = profile;
    const userId = req.user.id;
    const socialMedia = "google";

    try {
      await SocialAccounts.create({
        userId: userId,
        socialMedia: socialMedia,
        socialMediaId: id,
      });

      const user = await User.findByPk(userId);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
