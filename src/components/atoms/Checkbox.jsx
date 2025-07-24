import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  label,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={cn(
            "w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-all duration-200",
            checked 
              ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-600 shadow-lg" 
              : "bg-white border-gray-300 hover:border-primary-400",
            className
          )}
          onClick={() => onChange?.({ target: { checked: !checked } })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <ApperIcon 
                name="Check" 
                size={14} 
                className="text-white" 
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <label 
          className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;