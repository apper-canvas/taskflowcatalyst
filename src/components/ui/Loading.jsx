import React from "react";
import { motion } from "framer-motion";

const Loading = ({ 
  title = "Loading tasks...",
  showCards = true,
  cardCount = 3 
}) => {
  const shimmer = {
    animate: {
      x: ["-100%", "100%"],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  };

  const TaskCardSkeleton = () => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 bg-gray-200 rounded mt-1 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-5 bg-gray-200 rounded-full w-20" />
            </div>
            <div className="flex space-x-1">
              <div className="w-6 h-6 bg-gray-200 rounded" />
              <div className="w-6 h-6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-72 animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse" />
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-64 animate-pulse" />
      </div>

      {/* Task cards skeleton */}
      {showCards && (
        <div className="space-y-3">
          {Array.from({ length: cardCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskCardSkeleton />
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <span className="text-gray-600 font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;