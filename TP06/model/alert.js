const uuidv1 = require("uuid/v1")

const config = require("config")
const host = config.get("Database.host")
const port = config.get("Database.port")
const user = config.get("Database.user")
const password = config.get("Database.password")

const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect(`mongodb://${host}:${port}/alert`, {
  useNewUrlParser: true,
  user: user,
  pass: password
})

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const alertSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  label: String,
  status: String,
  from: String,
  to: String
})

const Alert = mongoose.model("Alert", alertSchema)

const add = (alertData, callback) => {
  const alert = new Alert({ 
    id: uuidv1(),
    ...alertData 
  })
  alert.save((err, alert) => {
    callback(err, alert)
  })
}

const get = (id, callback) => {
  Alert.find({ id: id }, callback)
}

const search = (tag, callback) => {
  Alert.find(tag, callback)
}

const update = (id, newAlertData, callback) => {
  Alert.updateOne({ id: id }, newAlertData, (err, raw) => {
    callback(err, raw);
  })
}

const remove = (id, callback) => {
  Alert.deleteOne({ id: id }, err => {
    callback(err)
  })
}

exports.get = get
exports.search = search
exports.add = add
exports.remove = remove
exports.update = update
