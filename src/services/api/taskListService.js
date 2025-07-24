import taskListsData from "@/services/mockData/taskLists.json";

let taskLists = [...taskListsData.taskLists];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskListService = {
  async getAll() {
    await delay(200);
    return [...taskLists];
  },

  async getById(id) {
    await delay(150);
    const list = taskLists.find(l => l.Id === parseInt(id));
    return list ? { ...list } : null;
  },

  async create(listData) {
    await delay(250);
    const maxId = taskLists.length > 0 ? Math.max(...taskLists.map(l => l.Id)) : 0;
    const newList = {
      Id: maxId + 1,
      name: listData.name,
      color: listData.color || "#7c3aed",
      taskCount: 0,
      completedCount: 0
    };
    taskLists.push(newList);
    return { ...newList };
  },

  async update(id, updates) {
    await delay(200);
    const index = taskLists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) throw new Error("Task list not found");
    
    taskLists[index] = { ...taskLists[index], ...updates };
    return { ...taskLists[index] };
  },

  async delete(id) {
    await delay(200);
    const index = taskLists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) throw new Error("Task list not found");
    
    const deletedList = taskLists[index];
    taskLists.splice(index, 1);
    return { ...deletedList };
  },

  async updateCounts(listId, taskCount, completedCount) {
    await delay(100);
    const list = taskLists.find(l => l.Id === parseInt(listId));
    if (list) {
      list.taskCount = taskCount;
      list.completedCount = completedCount;
      return { ...list };
    }
    return null;
  }
};