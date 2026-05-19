"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = void 0;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Parser } = require("json2csv");
const generateCSV = (data) => {
    const parser = new Parser();
    return parser.parse(data);
};
exports.generateCSV = generateCSV;
