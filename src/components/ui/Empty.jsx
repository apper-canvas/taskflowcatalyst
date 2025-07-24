import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "CheckSquare",
  title = "No tasks found",
  description = "Get started by creating your first task!",
  actionLabel = "Add Task",
  onAction,
  showAction = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
        <ApperIcon name={icon} size={48} className="text-primary-600 relative z-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h2>
      
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {showAction && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={20} />
          <span>{actionLabel}</span>
        </Button>
      )}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Zap" size={20} className="text-accent-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Quick Add</h3>
          <p className="text-sm text-gray-600">Use Ctrl+N to quickly add new tasks</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Tag" size={20} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Organize</h3>
          <p className="text-sm text-gray-600">Use categories and lists to stay organized</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Calendar" size={20} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Schedule</h3>
          <p className="text-sm text-gray-600">Set due dates to never miss deadlines</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;