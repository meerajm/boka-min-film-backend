const { connect } = require("./config/database");
const app = require("./server");
var PORT = process.env.PORT || 5000;

connect();
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log("Running on Port 5000"));
