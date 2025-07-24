import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import SearchBar from "@/components/molecules/SearchBar";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const TaskList = ({ 
  tasks = [], 
  categories = [],
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  showFilters = true,
  title,
  subtitle,
  className
}) => {
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    search: ""
  });

  const statusOptions = [
    { value: "all", label: "All Tasks", icon: "List" },
    { value: "active", label: "Active", icon: "Circle" },
    { value: "completed", label: "Completed", icon: "CheckCircle" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities", icon: "Flag" },
    { value: "high", label: "High Priority", icon: "AlertTriangle" },
    { value: "medium", label: "Medium Priority", icon: "Minus" },
    { value: "low", label: "Low Priority", icon: "ArrowDown" }
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories", icon: "Grid" },
    ...categories.map(cat => ({
      value: cat.Id.toString(),
      label: cat.name,
      icon: "Tag"
    }))
  ];

  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (filters.status === "active" && task.completed) return false;
    if (filters.status === "completed" && !task.completed) return false;

    // Priority filter
    if (filters.priority !== "all" && task.priority !== filters.priority) return false;

    // Category filter
    if (filters.category !== "all" && task.categoryId?.toString() !== filters.category) return false;

    // Search filter
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;

    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  if (tasks.length === 0) {
    return (
      <div className={cn("flex-1", className)}>
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
        <Empty
          icon="CheckSquare"
          title="No tasks yet"
          description="Get started by creating your first task!"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex-1", className)}>
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              icon="Filter"
            />
            <FilterDropdown
              label="Priority"
              options={priorityOptions}
              value={filters.priority}
              onChange={(value) => handleFilterChange("priority", value)}
              icon="Flag"
            />
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              value={filters.category}
              onChange={(value) => handleFilterChange("category", value)}
              icon="Tag"
            />
          </div>
          
          <div className="max-w-md">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search tasks..."
            />
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <Empty
          icon="Search"
          title="No tasks found"
          description="Try adjusting your filters or search terms."
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                categories={categories}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                className="group"
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredTasks.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      )}
    </div>
  );
};

export default TaskList;