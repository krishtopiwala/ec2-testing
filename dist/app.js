"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// import morgan from './'
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config({});
// dotenv.config({ path: "./.env" });
// app.use(morgan("dev"));
app.use((0, morgan_1.default)('common', {
    stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' })
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const PORT = Number(process.env.PORT);
const DBURL = String(process.env.MONGO_URL);
(0, db_1.default)(DBURL);
app.get("/", async (request, response) => {
    try {
        await response.json({ msg: "Hello" });
    }
    catch (error) {
        console.error(error);
        response.status(404).json({ msg: "Page not found" });
    }
});
app.listen(PORT || 5001, () => {
    console.log("Server is started at PORT:", PORT);
});
//# sourceMappingURL=app.js.map