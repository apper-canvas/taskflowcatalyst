import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";
import TaskList from "@/components/organisms/TaskList";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
      toast.success(updatedTask.completed ? "Task completed!" : "Task marked as active");
    } catch (err) {
      console.error("Failed to toggle task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleEditTask = (task) => {
    // This would open the edit modal
    toast.info("Edit functionality coming soon!");
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return <Loading title="Loading all tasks..." />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load tasks"
        message={error}
        onRetry={loadData}
      />
    );
  }

const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;
  return (
    <TaskList
      tasks={tasks}
      categories={categories}
      onToggleComplete={handleToggleComplete}
      onEditTask={handleEditTask}
      onDeleteTask={handleDeleteTask}
      title="All Tasks"
      subtitle={`${activeCount} active, ${completedCount} completed`}
      showFilters={true}
    />
  );
};

export default AllTasks;