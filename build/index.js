"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./config"));
var entities_1 = __importDefault(require("./entities"));
var resolvers_1 = __importDefault(require("./resolvers"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: entities_1.default,
    resolvers: resolvers_1.default
});
server.applyMiddleware({ app: app, path: '/graphql' });
var PORT = config_1.default.port || 3000;
app.listen(PORT, function () {
    app.use('/', function (_, res) {
        res.send({ message: 'Hello buddy' });
    });
    console.log("Graphql endpoint at http://localhost:" + PORT + "/graphql");
});
