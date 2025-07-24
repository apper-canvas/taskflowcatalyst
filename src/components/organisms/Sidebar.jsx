import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Sidebar = ({ taskLists = [], isOpen, onClose, onAddList }) => {
  const location = useLocation();
  
const mainNavItems = [
    { 
      label: "All Tasks", 
      path: "/all", 
      icon: "List",
      count: taskLists.reduce((sum, list) => sum + (list.taskCount || 0), 0)
    },
    { 
      label: "Today", 
      path: "/today", 
      icon: "Calendar",
      count: null
    },
    { 
      label: "Upcoming", 
      path: "/upcoming", 
      icon: "Clock",
      count: null
    },
    { 
      label: "Categories", 
      path: "/categories", 
      icon: "Tag",
      count: null
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text">TaskFlow</h2>
              </div>
            </div>

            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    )
                  }
                >
                  <div className="flex items-center space-x-3">
                    <ApperIcon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </div>
{item.count !== null && !isNaN(item.count) && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Projects</h3>
              <Button
                onClick={onAddList}
                variant="ghost"
                size="sm"
                className="p-1"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>
            
            <div className="space-y-1">
              {taskLists.map((list) => (
                <NavLink
                  key={list.Id}
                  to={`/project/${list.Id}`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: list.color }}
                    />
                    <span className="truncate">{list.name}</span>
                  </div>
<span className="text-xs text-gray-500">
                    {list.taskCount || 0}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="w-64 bg-white h-full shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                      <ApperIcon name="CheckSquare" size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold gradient-text">TaskFlow</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>

                <nav className="space-y-2">
                  {mainNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        )
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name={item.icon} size={18} />
                        <span>{item.label}</span>
                      </div>
{item.count !== null && !isNaN(item.count) && (
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Projects</h3>
                  <Button
                    onClick={() => {
                      onAddList();
                      onClose();
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-1"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  {taskLists.map((list) => (
                    <NavLink
                      key={list.Id}
                      to={`/project/${list.Id}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive
                            ? "bg-primary-50 text-primary-700 border border-primary-200"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: list.color }}
                        />
                        <span className="truncate">{list.name}</span>
                      </div>
<span className="text-xs text-gray-500">
                        {list.taskCount || 0}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;