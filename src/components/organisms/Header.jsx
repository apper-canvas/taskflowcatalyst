import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onAddTask, onSearch, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
              <p className="text-sm text-gray-500">Efficient task management</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md ml-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tasks..."
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={onAddTask}
            variant="primary"
            size="md"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={18} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
          
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-2 bg-gray-50 rounded-lg">
              <ApperIcon name="Zap" size={16} className="text-accent-600" />
              <span className="text-sm font-medium text-gray-700">Quick Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search tasks..."
        />
      </div>
    </motion.header>
  );
};

export default Header;