const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/utils/request'",
  schemaPath: "http://localhost:8102/api/v2/api-docs",
  serversPath: "./src/api/generated"
});
