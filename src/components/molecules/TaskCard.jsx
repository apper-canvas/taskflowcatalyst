import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  categories = [],
  className 
}) => {
  const category = categories.find(c => c.Id === task.categoryId);
  
  const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);
    if (isToday(dueDate)) return "Today";
    if (isTomorrow(dueDate)) return "Tomorrow";
    return format(dueDate, "MMM d");
  };

  const getDueDateColor = (date) => {
    if (!date) return "text-gray-500";
    const dueDate = new Date(date);
    if (isPast(dueDate) && !isToday(dueDate)) return "text-red-600";
    if (isToday(dueDate)) return "text-accent-600";
    return "text-gray-600";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-200 task-card-hover",
        task.completed && "opacity-75",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                getPriorityColor(task.priority)
              )}
            />
            <h3 className={cn(
              "font-medium text-gray-900 truncate",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 line-clamp-2",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <ApperIcon 
                    name="Calendar" 
                    size={14} 
                    className={getDueDateColor(task.dueDate)} 
                  />
                  <span className={cn(
                    "text-xs font-medium",
                    getDueDateColor(task.dueDate)
                  )}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              )}
              
              {category && (
                <Badge 
                  variant="default"
                  size="sm"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color 
                  }}
                >
                  {category.name}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                onClick={() => onEdit?.(task)}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Edit2" size={14} />
              </motion.button>
              
              <motion.button
                onClick={() => onDelete?.(task.Id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Trash2" size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;