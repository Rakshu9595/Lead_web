// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Parser } = require("json2csv");

export const generateCSV = (data: any[]) => {
  const parser = new Parser();
  return parser.parse(data);
};