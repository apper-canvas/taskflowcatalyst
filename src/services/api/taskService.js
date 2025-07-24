export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async getByListId(listId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "list_id_c",
            Operator: "EqualTo",
            Values: [parseInt(listId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by list ID:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks by list ID:", error.message);
        throw error;
      }
    }
  },

  async getTodayTasks() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const today = new Date();
      const todayISO = today.toISOString().split('T')[0];

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "due_date_c",
            Operator: "RelativeMatch",
            Values: ["Today"]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching today's tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching today's tasks:", error.message);
        throw error;
      }
    }
  },

  async getUpcomingTasks() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const today = new Date();
      today.setHours(23, 59, 59, 999);

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "due_date_c",
            Operator: "GreaterThan",
            Values: [today.toISOString()]
          },
          {
            FieldName: "completed_c",
            Operator: "EqualTo",
            Values: [false]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching upcoming tasks:", error.message);
        throw error;
      }
    }
  },

  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "list_id_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "category_id_c",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
        throw error;
      }
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: taskData.Name || taskData.title || taskData.title_c,
          title_c: taskData.title_c || taskData.title,
          description_c: taskData.description_c || taskData.description || "",
          due_date_c: taskData.due_date_c || taskData.dueDate || null,
          priority_c: taskData.priority_c || taskData.priority || "medium",
          category_id_c: taskData.category_id_c ? parseInt(taskData.category_id_c) : (taskData.categoryId ? parseInt(taskData.categoryId) : null),
          list_id_c: taskData.list_id_c ? parseInt(taskData.list_id_c) : (taskData.listId ? parseInt(taskData.listId) : 1),
          completed_c: false,
          created_at_c: new Date().toISOString(),
          completed_at_c: null
        }]
      };

      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating task:", error.message);
        throw error;
      }
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateData = {
        Id: parseInt(id)
      };

      // Map field names to database schema
      if (updates.Name || updates.title || updates.title_c) {
        updateData.Name = updates.Name || updates.title || updates.title_c;
        updateData.title_c = updates.title_c || updates.title || updates.Name;
      }
      if (updates.description_c || updates.description) updateData.description_c = updates.description_c || updates.description;
      if (updates.due_date_c || updates.dueDate) updateData.due_date_c = updates.due_date_c || updates.dueDate;
      if (updates.priority_c || updates.priority) updateData.priority_c = updates.priority_c || updates.priority;
      if (updates.completed_c !== undefined || updates.completed !== undefined) {
        updateData.completed_c = updates.completed_c !== undefined ? updates.completed_c : updates.completed;
      }
      if (updates.category_id_c !== undefined || updates.categoryId !== undefined) {
        updateData.category_id_c = updates.category_id_c !== undefined ? parseInt(updates.category_id_c) : parseInt(updates.categoryId);
      }
      if (updates.list_id_c !== undefined || updates.listId !== undefined) {
        updateData.list_id_c = updates.list_id_c !== undefined ? parseInt(updates.list_id_c) : parseInt(updates.listId);
      }

      // Handle completion status change
      if (updates.hasOwnProperty("completed_c") || updates.hasOwnProperty("completed")) {
        const completed = updates.completed_c !== undefined ? updates.completed_c : updates.completed;
        updateData.completed_at_c = completed ? new Date().toISOString() : null;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update task records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulUpdates = response.results.filter(result => result.success);
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating task:", error.message);
        throw error;
      }
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete task records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return response.results.filter(result => result.success).length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting task:", error.message);
        throw error;
      }
    }
  },

  async toggleComplete(id) {
    try {
      // Get current task first
      const currentTask = await this.getById(id);
      if (!currentTask) throw new Error("Task not found");
      
      // Toggle completion status
      const newCompletedStatus = !currentTask.completed_c;
      
      return await this.update(id, {
        completed_c: newCompletedStatus,
        completed_at_c: newCompletedStatus ? new Date().toISOString() : null
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error toggling task completion:", error.message);
        throw error;
      }
}
  }
};