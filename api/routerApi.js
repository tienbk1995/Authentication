const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoApi = require("./dbApi");
const userModel = require("./model");
const jwt = require("jsonwebtoken");

// Use body parser to encode form data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.post("/signup/create", (req, res, next) => {
//   mongoApi.createUser(
//     req.body.user,
//     req.body.pass,
//     (err, user) => {
//       if (err) {
//         console.error(err);
//         return next(err);
//       }
//       if (user) {
//         console.log(user);
//         res.status(200).send(user);
//       }
//     },
//     userModel
//   );
// });

router.post("/signup/create", (req, res, next) => {
  mongoApi.findOne(
    req.body.user,
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        mongoApi.createUser(
          req.body.user,
          req.body.pass,
          (err, user) => {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (user) {
              console.log(user);
              res.status(200).send(user);
            }
          },
          userModel
        );
      } else {
        res.status(404).send("User already exists");
      }
    },
    userModel
  );
});

const verifyToken = (req, res, next) => {
  const headerBearer = req.headers["authorization"];
  if (typeof headerBearer !== "undefined") {
    const bearer = headerBearer.split(" ");
    const token = bearer[1];
    tokenGetter = token;
    next();
  } else {
    res.status(403).send("Unauthenticated");
  }
};

router.post("/login", (req, res, next) => {
  mongoApi.findOne(
    req.body.user,
    (err, user) => {
      if (err) {
        res.status(404).send(err);
      }
      if (user) {
        jwt.sign({ user }, process.env.KEY, (err, token) => {
          if (err) {
            res.status(404).send(err);
          }
          if (token) {
            res.status(200).send(token);
          }
        });
      }
      res.status(500);
    },
    userModel
  );
});

// function findUser(user, model, req, res) {
//   return new Promise((resolve, reject) => {
//     resolve(
//       mongoApi.findOne(
//         user,
//         (err, result) => {
//           if (err) {
//             res.status(404).send(err);
//           }
//           if (result) {
//             jwt.sign({ user }, process.env.KEY, (err, token) => {
//               if (err) {
//                 res.status(404).send(err);
//               }
//               if (token) {
//                 res.status(200).send(token);
//               }
//             });
//           }
//         },
//         model
//       )
//     );
//   });
// }

// router.post("/login", async (req, res, next) => {
//   // console.log(req.body.user);
//   let result = await findUser(req.body.user, userModel, req, res);
//   //console.log(result);
// });

router.get("/login/token", verifyToken, (req, res) => {
  jwt.verify(tokenGetter, process.env.KEY, (err, token) => {
    if (err) {
      res.status(403).send("Unauthenticated");
    } else {
      res.json({ message: "verified", token });
    }
  });
});

router.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/index.html", (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent successfully");
    }
  });
});

module.exports = router;
