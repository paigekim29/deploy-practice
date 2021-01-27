const {user} = require("../models");

module.exports = {
  signInController: async (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성

    const userInfo = await user.findOne({
      where: {
        email: req.body.email, password: req.body.password
      }
    })

    if (!userInfo) {
      res.status(404).send("invalid user")
    } else {
      req.session.email = userInfo.email;

      res.status(200).json({
        id: userInfo.username
      })
    }
  },

  signUpController: async (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    console.log(req.body)
    if (Object.keys(req.body).length !== 4) {
      res.status(422).send("insufficient parameters supplied")
    } else {
      user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
          password: req.body.password,
          username: req.body.username,
          mobile: req.body.mobile
        }
      }).then(([result, created]) => {
        if (!created) {
          res.status(409).send("email exists")
        } else {
          res.status(201).json(result)
        }
      }).catch((e) => console.log(e))

    }
  },

  signOutController: async (req, res) => {
    // TODO: 로그아웃 로직 작성
    req.session.destroy();
    res.status(205).send("Logged out successfully");

  },

  userController: async (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성
    if (!req.session.email) {
      res.status(401).json("not authorized")

    } else {
      const userInfo = await user.findOne({where: {email: req.session.email}})

      res.status(200).json({
        id: userInfo.id,
        email: userInfo.email,
        username: userInfo.username,
        mobile: userInfo.mobile
      })
    }
  },
};
