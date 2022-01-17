const express = require("express");

const { todosController } = require("../controllers");

const router = express.Router();

router.get("/", todosController.getAll);
router.get("/:todoId", todosController.getById);
router.post("/", todosController.create);
router.put("/:todoId", todosController.edit);
router.delete("/:todoId", todosController.delete);

module.exports = router;
