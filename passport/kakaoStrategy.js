const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = (passport) => {
  passport.use('kakao-login', new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    console.log('profile', profile);

    passport.serializeUser((profile, done) => {
      console.log('serializedUserID', profile.id);
      return done(null, profile.id);
    });
    console.log('logged in');
    return done(null, profile);
  }
  ));
}
;
