import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading your tasks. Please try again.",
  onRetry,
  showRetry = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" size={40} className="text-red-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        {title}
      </h2>
      
      <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <div className="flex items-center space-x-4">
          <Button
            onClick={onRetry}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" size={18} />
            <span>Try Again</span>
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" size={18} />
            <span>Refresh Page</span>
          </Button>
        </div>
      )}
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          If the problem persists, please contact support.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-400">
          <span>Error Code: TASK_LOAD_FAILED</span>
          <span>•</span>
          <span>Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;