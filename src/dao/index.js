import {connectDB} from "../config/dbConnection.js";
import { UsersMongo } from "./UsersMongo.js";

connectDB();
export const usersService = new UsersMongo();