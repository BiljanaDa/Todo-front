import HttpService from "./Http.service";

class TodoService extends HttpService {
  static async getTodoList() {
    console.log("Calling getTodoList");
    const response = await this.request({
      method: "GET",
      url: "/getTodoList",
    });
    console.log(response);
    return response;
  }

  static async addTodo(data) {
    const response = await this.request({
      method: "POST",
      url: "/addToDoList",
      data: data,
    });
    console.log("add", response);
    return response;
  }

  static async editTodo(id, data) {
    const response = await this.request({
      method: "PUT",
      url: `/updateTodoList/${id}`,
      data: data,
    });
    console.log("edit", id);
    return response;
  }

  static async deleteTodo(id) {
    const response = await this.request({
      method: "DELETE",
      url: `deleteTodoList/${id}`,
    });
    console.log("Delete", id);
    return response;
  }
}

export default TodoService;
