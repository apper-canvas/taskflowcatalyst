import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [categoriesData, allTasks] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ]);
      
      // Calculate stats for each category
      const stats = {};
      categoriesData.forEach(category => {
        const categoryTasks = allTasks.filter(task => task.categoryId === category.Id);
        const completedTasks = categoryTasks.filter(task => task.completed);
        
        stats[category.Id] = {
          total: categoryTasks.length,
          completed: completedTasks.length,
          progress: categoryTasks.length > 0 ? Math.round((completedTasks.length / categoryTasks.length) * 100) : 0
        };
      });
      
      setCategories(categoriesData);
      setCategoryStats(stats);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    toast.info("Category creation feature coming soon!");
  };

  const handleEditCategory = (category) => {
    toast.info("Category editing feature coming soon!");
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }

    try {
      await categoryService.delete(categoryId);
      setCategories(prevCategories => prevCategories.filter(cat => cat.Id !== categoryId));
      toast.success("Category deleted successfully");
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Failed to delete category");
    }
  };

  if (loading) {
    return <Loading title="Loading categories..." showCards={false} />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load categories"
        message={error}
        onRetry={loadData}
      />
    );
  }

  const totalTasks = Object.values(categoryStats).reduce((sum, stats) => sum + stats.total, 0);
  const totalCompleted = Object.values(categoryStats).reduce((sum, stats) => sum + stats.completed, 0);
  const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organize your tasks by category</p>
        </div>
        <Button
          onClick={handleAddCategory}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={18} />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon name="Tag" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <ApperIcon name="List" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <ApperIcon name="CheckCircle" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCompleted}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <ApperIcon name="TrendingUp" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{overallProgress}%</p>
              <p className="text-sm text-gray-600">Progress</p>
            </div>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <Empty
          icon="Tag"
          title="No categories yet"
          description="Create categories to organize your tasks better and track progress by topic."
          actionLabel="Add Category"
          onAction={handleAddCategory}
          showAction={true}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <ApperIcon 
                      name="Tag" 
                      size={20} 
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="default"
                        size="sm"
                        style={{ 
                          backgroundColor: `${category.color}20`,
                          color: category.color 
                        }}
                      >
                        {categoryStats[category.Id]?.total || 0} tasks
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleDeleteCategory(category.Id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </motion.button>
                </div>
              </div>
              
              {categoryStats[category.Id] && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {categoryStats[category.Id].progress}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${categoryStats[category.Id].progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {categoryStats[category.Id].completed} completed
                    </span>
                    <span>
                      {categoryStats[category.Id].total - categoryStats[category.Id].completed} remaining
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;