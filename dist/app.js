"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./.env" });
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