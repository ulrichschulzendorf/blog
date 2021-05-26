const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getBlog = (req, res) => {
  try {
    const post = db.get("post").value();
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
