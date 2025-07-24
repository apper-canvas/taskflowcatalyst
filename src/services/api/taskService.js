import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData.tasks];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async getByListId(listId) {
    await delay(250);
    return tasks.filter(t => t.listId === parseInt(listId)).map(t => ({ ...t }));
  },

  async getTodayTasks() {
    await delay(250);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return tasks.filter(t => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    }).map(t => ({ ...t }));
  },

  async getUpcomingTasks() {
    await delay(250);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return tasks.filter(t => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate > today && !t.completed;
    }).map(t => ({ ...t }));
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(t => t.categoryId === parseInt(categoryId)).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay(300);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || "medium",
      categoryId: taskData.categoryId || null,
      listId: taskData.listId || 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    tasks[index] = { ...tasks[index], ...updates };
    
    // Handle completion status change
    if (updates.hasOwnProperty("completed")) {
      tasks[index].completedAt = updates.completed ? new Date().toISOString() : null;
    }
    
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return { ...deletedTask };
  },

  async toggleComplete(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) throw new Error("Task not found");
    
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    
    return { ...task };
  }
};