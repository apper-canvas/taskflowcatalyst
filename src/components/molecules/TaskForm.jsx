import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ 
  task = null,
  categories = [],
  taskLists = [],
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    categoryId: "",
    listId: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : "",
        priority: task.priority || "medium",
        categoryId: task.categoryId?.toString() || "",
        listId: task.listId?.toString() || ""
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.listId) {
      newErrors.listId = "Please select a list";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const submitData = {
      ...formData,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      listId: parseInt(formData.listId),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };
    
    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
          <ApperIcon name="Plus" size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {task ? "Edit Task" : "Create New Task"}
        </h2>
      </div>

      <Input
        label="Task Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter task title..."
        error={errors.title}
        className="text-base"
      />

      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Add task description..."
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="datetime-local"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />

        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="List"
          value={formData.listId}
          onChange={(e) => handleChange("listId", e.target.value)}
          error={errors.listId}
        >
          <option value="">Select a list...</option>
          {taskLists.map(list => (
            <option key={list.Id} value={list.Id}>
              {list.name}
            </option>
          ))}
        </Select>

        <Select
          label="Category"
          value={formData.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          <option value="">No category</option>
          {categories.map(category => (
            <option key={category.Id} value={category.Id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            task ? "Update Task" : "Create Task"
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default TaskForm;