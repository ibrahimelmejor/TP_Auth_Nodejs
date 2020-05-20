const express = require("express")
const bodyParser = require("body-parser")
const helmet = require("helmet")

const alertsRouter = require("./routes/alert-v1").router
const loggerModel = require("./model/auth")

const app = express()


let verifyaccess = (req, res, next) => {
  let token = req.header("Authorization")
  if (token) {
    token = token.replace("Bearer ", "")
    loggerModel
      .verifyacess(token)
      .then(decoded => {
        next();
      })
      .catch(() => {
        res
          .status(401)
          .json({ message: "Unauthorized" })
      });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized" })
  }
};

app.use(verifyaccess);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele
app.use("/v1/alerts", alertsRouter)

// For unit tests
exports.app = app
