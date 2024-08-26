import express from "express";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// global variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);