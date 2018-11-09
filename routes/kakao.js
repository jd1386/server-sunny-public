const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// kakao 로그인
router.get('/', passport.authenticate('kakao-login', {
  failureRedirect: '/login'
}));
// kakao 로그인 연동 콜백
// router.get('/callback', passport.authenticate('kakao-login', {
//   successRedirect: '/test',
//   failureRedirect: '/login'
// }));
router.get('/callback',
  passport.authenticate('kakao-login'),
  (req, res) => {
    console.log(req.user);
    // generate token
    const token = jwt.sign({
      provider: req.user.provider,
      id: req.user.id,
      username: req.user.username,
      profile_image: req.user._json.properties.profile_image,
      thumbnail_image: req.user._json.properties.thumbnail_image
    }, process.env.JWT_TOKEN, {
      expiresIn: '1 day',
      issuer: 'SunnyApp'
    });

    res.redirect(`http://localhost:3001?token=${token}`);
  }
);

module.exports = router;
