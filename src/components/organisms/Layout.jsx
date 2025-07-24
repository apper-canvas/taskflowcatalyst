import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import TaskForm from "@/components/molecules/TaskForm";
import { taskListService } from "@/services/api/taskListService";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskLists, setTaskLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTaskLists();
    loadCategories();
  }, []);

const loadTaskLists = async () => {
    try {
      const lists = await taskListService.getAll();
      setTaskLists(lists || []);
    } catch (error) {
      console.error("Failed to load task lists:", error);
      toast.error("Failed to load task lists");
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await categoryService.getAll();
      setCategories(cats || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleAddTask = () => {
    setShowTaskForm(true);
  };

  const handleAddList = () => {
    // For now, just show a toast. In a real app, this would open a list creation modal
    toast.info("List creation feature coming soon!");
  };

const handleTaskSubmit = async (taskData) => {
    setIsSubmitting(true);
    try {
      // Map form data to database field names
      const mappedData = {
        title_c: taskData.title,
        description_c: taskData.description,
        due_date_c: taskData.dueDate,
        priority_c: taskData.priority,
        category_id_c: taskData.categoryId,
        list_id_c: taskData.listId
      };
      
      await taskService.create(mappedData);
      toast.success("Task created successfully!");
      setShowTaskForm(false);
      // Trigger a refresh of the current page data
      window.location.reload();
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (query) => {
    // This would typically update a global search state
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        taskLists={taskLists}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddList={handleAddList}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onAddTask={handleAddTask}
          onSearch={handleSearch}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <TaskForm
              categories={categories}
              taskLists={taskLists}
              onSubmit={handleTaskSubmit}
              onCancel={() => setShowTaskForm(false)}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Layout;