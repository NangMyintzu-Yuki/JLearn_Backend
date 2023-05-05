const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "Get, POST, PUT, DELETE,OPTIONS");
  next();
}
module.exports = { cors }