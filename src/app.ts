import 'reflect-metadata';
import express from 'express';
import mongoose from "mongoose";
import {NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE} from "@config";
import {buildSchemaSync} from "type-graphql";
import {ApolloServer} from "apollo-server-express";

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(resolvers) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.connectToDatabase();
        this.initApolloServer(resolvers);
    }
    public async listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    private connectToDatabase() {
        mongoose.connect("mongodb://"+DB_HOST+":"+DB_PORT+"/"+DB_DATABASE)
            .then(() => {
                console.log("Connected to Database.")
            })
    }
    private async initApolloServer(resolvers) {
        const schema = buildSchemaSync({
            resolvers: resolvers,
            dateScalarMode: "timestamp"
        });

        const apolloServer = new ApolloServer({
            schema
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({ app: this.app, cors: true });
    }
}

export default App;