import express from "express";
import { admninLogin, admninLogout, allChats, allMessages, allUsers, getDashboardStats } from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();


app.post("/verify",adminLoginValidator(),validateHandler,admninLogin);

app.get("/logout", admninLogout);

//Only Admin can access these routes
app.get("/");
app.get("/users", allUsers);
app.get("/chats",allChats);
app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);

export default app;
