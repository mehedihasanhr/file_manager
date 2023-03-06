"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
var _credential = require("./middlewares/credential.middleware");
var _routes = _interopRequireDefault(require("./routes"));
var _corsOptions = require("./utils/corsOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* express instance */
const app = (0, _express.default)();

/* dotenv config */
_dotenv.default.config();
app.use(_credential.credentials);
app.use((0, _cors.default)(_corsOptions.corsOptions));
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

/* Routes */
app.use('/api', _routes.default);
_mongoose.default.set('strictQuery', false);

/* mongoose connection */
(async () => {
  try {
    await _mongoose.default.connect(_config.default.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected...'));
  } catch (error) {
    console.log(error);
  }
})();

/* server port */
const port = _config.default.PORT;

/* server listen */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});