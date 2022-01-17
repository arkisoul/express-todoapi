const { TodosModel } = require("../models");

class TodoService {
    create = async (data) => {
        const todo = await TodosModel.create(data)
        return todo;
    }

    edit = async (id, data) => {
        const todo = await TodosModel.findByIdAndUpdate(id, {$set: data}, {new: true});
        return todo;
    }

    delete = async (id) => {
        await TodosModel.findByIdAndDelete(id);
    }

    getAll = async (filterQuery = {}) => {
        return await TodosModel.find(filterQuery)
    }

    getById = async (id) => {
        return await TodosModel.findById(id);
    }
}

module.exports = new TodoService();
