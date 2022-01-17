const { todosService } = require("../services");
const { InvalidRequestError } = require("../helpers");

class TodosController {
  constructor() {
    this.todosService = todosService;
  }

  create = async (req, res) => {
    try {
      const { title } = req.body;
      if (!title || (title && title.trim().length === 0)) {
        throw new InvalidRequestError(
          400,
          "Invalid request, missing require param `title`"
        );
      }

      const todo = await this.todosService.create({ title });
      return res.status(201).json({
        success: true,
        message: "Todo created",
        data: todo,
        error: null,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  }

  edit = async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const { title, isCompleted } = req.body;
      const data = {};
      if (title) data["title"] = title;
      if (typeof isCompleted !== "undefined") data["isCompleted"] = isCompleted;

      const todo = await this.todosService.edit(todoId, data);
      return res.status(200).json({
        success: true,
        message: "Todo updated",
        error: null,
        data: todo,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  }

  delete = async (req, res) => {
    try {
      const todoId = req.params.todoId;
      await this.todosService.delete(todoId);
      return res.status(200).json({
        success: true,
        message: "Todo deleted",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  }

  getAll = async (req, res) => {
    try {
      const todos = await this.todosService.getAll();
      return res.status(200).json({
        success: true,
        message: "Todo list",
        data: todos,
        error: null,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  }

  getById = async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const todo = await this.todosService.getById(todoId);
      return res.status(200).json({
        success: true,
        message: "Todo details",
        data: todo,
        error: null,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  }
}

module.exports = new TodosController();
