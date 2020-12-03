const { connect } = require("./config/database");
const app = require("./server");
var PORT = 5000 || process.env.PORT;

connect();
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log("Running on Port 5000"));
