"use strict";

const awsServerlessExpress = require("aws-serverless-express");
const expressApp = require("./app");
const server = awsServerlessExpress.createServer(expressApp);

exports.handler = (event: any, context: any) =>
  awsServerlessExpress.proxy(server, event, context);
