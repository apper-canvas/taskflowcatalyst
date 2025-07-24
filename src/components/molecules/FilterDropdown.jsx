import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterDropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  icon = "Filter" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          isOpen && "border-primary-500 ring-2 ring-primary-500"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name={icon} size={16} className="text-gray-500" />
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className={cn(
            "text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
            >
              <div className="py-2">
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm transition-colors flex items-center space-x-2",
                      "hover:bg-primary-50 hover:text-primary-700",
                      value === option.value && "bg-primary-100 text-primary-800 font-medium"
                    )}
                    whileHover={{ x: 4 }}
                  >
                    {option.icon && (
                      <ApperIcon 
                        name={option.icon} 
                        size={16} 
                        className="text-current opacity-70" 
                      />
                    )}
                    <span>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;