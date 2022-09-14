"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const skills_1 = __importDefault(require("../../src/widgets/skills"));
const utils_1 = require("../../src/utils");
const error_1 = __importDefault(require("../../src/widgets/error"));
// Primary skills route
router.get('/', function (req, res) {
    const { names, includeNames } = req.query;
    // Set the header's type to svg/xml
    res.setHeader('Content-Type', 'image/svg+xml');
    // Check if languages argument is not present
    if (names === undefined || names === null) {
        res.send((0, error_1.default)('Skills', '-24%', 'Languages are undefined!', '-28%'));
        return;
    }
    // Grab the Skills widget
    res.send((0, skills_1.default)(String(names), (0, utils_1.getBoolean)(String(includeNames))));
});
exports.default = router;
//# sourceMappingURL=skills-route.js.map