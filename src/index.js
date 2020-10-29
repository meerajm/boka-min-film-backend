const { connect } = require('./config/database');
const app = require('./server');

connect();
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Running on Port 5000'));