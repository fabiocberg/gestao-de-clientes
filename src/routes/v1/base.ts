import express from "express";
import customer from "./customer.routes";

const router = express.Router();

router.use(customer);

export default router;
