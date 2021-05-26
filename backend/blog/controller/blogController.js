const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getBlog = (req, res) => {
  try {
    // get all data
    const posts = db.get("post").value();
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addBlog = (req, res, next) => {
  try {
    const post = req.body;
    db.get("post")
      .push(post)
      .last()
      .assign({ id: Date.now().toString() })
      .write();
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteBlog = (req, res, next) => {
  try {
    const inputId = req.body.id;
    db.get("post").remove({ id: inputId }).write();
    res.status(200).send("yeah");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
