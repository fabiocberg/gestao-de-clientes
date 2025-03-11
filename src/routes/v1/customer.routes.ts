import express from "express";
import { CustomerController } from "../../controllers/customer.controller";

const router = express.Router();

router.post("/customer", CustomerController.create);
router.put("/customer/:id", CustomerController.update);
router.get("/customer", CustomerController.findAll);
router.get("/customer/:id", CustomerController.findById);
router.delete("/customer/:id", CustomerController.delete);

export default router;
