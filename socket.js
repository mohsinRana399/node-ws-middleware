"use strict";
const WebSocket = require("ws");
const WebSocketServer = require("ws").Server;
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors")
var route = express();
require('dotenv').config();

route.use(cors());
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));

var wss = null;

wss = new WebSocketServer({ port: 7020 });

async function GlobalSocket() {
    wss.on("connection", async (ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(
                JSON.stringify({
                    msg1: "WELCOME TO OXHAIN",
                })
            );
        }
    });
}

GlobalSocket();
