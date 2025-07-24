import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TodayTasks = () => {
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
      const [todayTasks, categoriesData] = await Promise.all([
        taskService.getTodayTasks(),
        categoryService.getAll()
      ]);
      
      setTasks(todayTasks);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load today's tasks:", err);
      setError("Failed to load today's tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      toast.success(updatedTask.completed ? "Great job! Task completed! 🎉" : "Task marked as active");
    } catch (err) {
      console.error("Failed to toggle task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleEditTask = (task) => {
    toast.info("Edit functionality coming soon!");
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return <Loading title="Loading today's tasks..." />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load today's tasks"
        message={error}
        onRetry={loadData}
      />
    );
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const todayDate = format(new Date(), "EEEE, MMMM d");

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Today's Focus</h1>
            <p className="text-primary-100">{todayDate}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progress}%</div>
            <div className="text-sm text-primary-100">Completed</div>
          </div>
        </div>
        
        <div className="w-full bg-primary-400 rounded-full h-3 mb-2">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-primary-100">
          <span>{completedCount} of {totalCount} tasks completed</span>
          <span>{totalCount - completedCount} remaining</span>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        categories={categories}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        showFilters={false}
      />
    </div>
  );
};

export default TodayTasks;