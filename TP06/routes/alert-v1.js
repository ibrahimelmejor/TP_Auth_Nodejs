const express = require("express")
const router = express.Router()

const alerts = require("../model/alert")

router.post("/", (req, res, next) => {
  alerts.add(req.body, (err, alert) => {
    if (err) {
      res
        .status(405)
        .json({ message: "Invalid input" })
    } else {
      res
        .status(200)
        .json({ message: "sucefull operation", alert: alert })
    }
  })
})

router.get("/search", (req, res, next) => {
  alerts.search(req.body, (err, alerts) => {
    if (err) {
      res
        .status(404)
        .json({ message: "invalid tag value" })
    } else {
      res
        .status(200)
        .json(alerts)
    }
  })
})

router.get("/:id", (req, res, next) => {
  alerts.get(req.params.id, (err, alerts) => {
    if (err) {
      res
        .status(404)
        .json({ message: "Alert not found", error: err })
    } else {
      res
        .status(200)
        .json(alerts[0])
    }
  })
})

router.patch("/:id", (req, res, next) => {
  alerts.update(req.params.id, req.body, (err, raw) => {
    if (err) {
      res
        .status(405)
        .json({ message: "invalid input" })
    } else {
      res
        .status(200)
        .json(raw);
    }
  })
})

router.delete("/:id", (req, res, next) => {
  alerts.remove(req.params.id, err => {
    if (err) {
      res
        .status(404)
        .json({ message: "Alert not found" })
    } else {
      res
        .status(200)
        .json({ message: "successful operation" })
    }
  })
})

exports.router = router
