"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const compression = require("compression");
const dotenv = require("dotenv");
const helmet = require("helmet");
const l10n = require("jm-ez-l10n");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const database_1 = require("./database");
const logger_1 = require("./helpers/logger");
const routes_1 = require("./routes");
const fileUpload = require("express-fileupload");
var cors = require('cors');
dotenv.config();
// Database
database_1.DB.init();
class App {
    constructor() {
        this.logger = logger_1.Log.getLogger();
        const NODE_ENV = process.env.NODE_ENV;
        const PORT = process.env.PORT;
        this.app = express();
        this.app.use(helmet());
        this.app.use(cors());
        this.app.all("/*", (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, x-device-type, x-app-version, x-build-number, uuid, x-l10n-locale");
            res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
            if (req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
            }
            else {
                next();
            }
        });
        if (NODE_ENV === "development") {
            this.app.use(express.static(path.join(process.cwd(), "public")));
            this.app.use(morgan("dev"));
        }
        else {
            this.app.use(compression());
            this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
        }
        l10n.setTranslationsFile("en", "src/language/translation.en.json");
        this.app.use(l10n.enableL10NExpress);
        this.app.use(fileUpload({
            parseNested: true,
        }));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
        this.app.use(methodOverride());
        const routes = new routes_1.Routes(NODE_ENV);
        this.app.use("/api", routes.path());
        this.app.use((err, req, res, next) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: req.t("SOMETHING_WENT_WRONG") });
            }
        });
        this.app.listen(PORT, () => {
            this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=server.js.map