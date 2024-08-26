import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import cors from "cors";
import corsResolver from "./middlewares/CORSResolver";
import globalErrorHandler from "./middlewares/GlobalErrorHandling";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";


const server = express();


// global variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middlewares
server.use(express.json());
server.use(corsResolver);
server.use(cors());
server.use(express.static(join(__dirname, "static")));
server.use(express.urlencoded({ extended: true }));