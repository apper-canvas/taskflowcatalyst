import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";
import { taskListService } from "@/services/api/taskListService";
import { categoryService } from "@/services/api/categoryService";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [projectTasks, projectData, categoriesData] = await Promise.all([
        taskService.getByListId(projectId),
        taskListService.getById(projectId),
        categoryService.getAll()
      ]);
      
      if (!projectData) {
        setError("Project not found");
        return;
      }
      
      setTasks(projectTasks);
      setProject(projectData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load project data:", err);
      setError("Failed to load project tasks. Please try again.");
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
      toast.success(updatedTask.completed ? "Task completed!" : "Task marked as active");
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

  if (!projectId || isNaN(projectId)) {
    return <Navigate to="/all" replace />;
  }

  if (loading) {
    return <Loading title="Loading project tasks..." />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load project"
        message={error}
        onRetry={loadData}
      />
    );
  }

  if (!project) {
    return <Navigate to="/all" replace />;
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">Project tasks and progress</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">{progress}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${project.color}, ${project.color}dd)`
            }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
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
        showFilters={true}
      />
    </div>
  );
};

export default ProjectTasks;