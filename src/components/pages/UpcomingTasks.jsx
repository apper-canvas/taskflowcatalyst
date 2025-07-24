import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addDays, format, startOfDay } from "date-fns";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";
import TaskList from "@/components/organisms/TaskList";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

const UpcomingTasks = () => {
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
      const [upcomingTasks, categoriesData] = await Promise.all([
        taskService.getUpcomingTasks(),
        categoryService.getAll()
      ]);
      
      setTasks(upcomingTasks || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error("Failed to load upcoming tasks:", err);
      setError("Failed to load upcoming tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      if (updatedTask.completed_c) {
        // Remove completed tasks from upcoming view
        setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
        toast.success("Task completed! 🎉");
      } else {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.Id === taskId ? updatedTask : task
          )
        );
        toast.success("Task marked as active");
      }
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
    return <Loading title="Loading upcoming tasks..." />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load upcoming tasks"
        message={error}
        onRetry={loadData}
      />
    );
  }

// Group tasks by day
  const groupedTasks = tasks.reduce((groups, task) => {
    if (!task.due_date_c) return groups;
    
    const dueDate = startOfDay(new Date(task.due_date_c));
    const dateKey = format(dueDate, "yyyy-MM-dd");
    
    if (!groups[dateKey]) {
      groups[dateKey] = {
        date: dueDate,
        tasks: []
      };
    }
    
    groups[dateKey].tasks.push(task);
    return groups;
  }, {});

  const sortedGroups = Object.values(groupedTasks).sort((a, b) => a.date - b.date);

  const totalTasks = tasks.length;
const next7Days = tasks.filter(task => {
    if (!task.due_date_c) return false;
    const dueDate = new Date(task.due_date_c);
    const sevenDaysFromNow = addDays(new Date(), 7);
    return dueDate <= sevenDaysFromNow;
  }).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              <p className="text-sm text-gray-600">Total Upcoming</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{next7Days}</p>
              <p className="text-sm text-gray-600">Next 7 Days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sortedGroups.length}</p>
              <p className="text-sm text-gray-600">Days Scheduled</p>
            </div>
          </div>
        </div>
      </div>

      {sortedGroups.length === 0 ? (
        <TaskList
          tasks={tasks}
          categories={categories}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          title="Upcoming Tasks"
          subtitle="Tasks scheduled for future dates"
          showFilters={true}
        />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Upcoming Tasks</h1>
            <p className="text-gray-600">Tasks scheduled for future dates</p>
          </div>
          
          {sortedGroups.map(({ date, tasks: dayTasks }) => (
            <div key={format(date, "yyyy-MM-dd")} className="space-y-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {format(date, "EEEE, MMMM d")}
                </h2>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                  {dayTasks.length} task{dayTasks.length !== 1 ? "s" : ""}
                </span>
              </div>
              
              <div className="space-y-3">
                {dayTasks.map((task) => (
                  <div key={task.Id} className="ml-4">
                    <TaskList
                      tasks={[task]}
                      categories={categories}
                      onToggleComplete={handleToggleComplete}
                      onEditTask={handleEditTask}
                      onDeleteTask={handleDeleteTask}
                      showFilters={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;