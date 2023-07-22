import express from "express";
import dataController from "../controllers/dataController.js";

const router = express.Router();

router.post("/users", dataController.createDoc);
router.get("/users", dataController.getAllDoc);
router.get("/users/:id", dataController.getSingleDocById);
router.put("/users/:id", dataController.updateDocById);
router.delete("/users/:id", dataController.deleteDocById);

//team endpoint

router.post("/team", dataController.createTeam);
router.get("/team/:id", dataController.getTeamById);

export default router;
// "server": "nodemon index.js"
