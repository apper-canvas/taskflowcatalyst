import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import AllTasks from "@/components/pages/AllTasks";
import TodayTasks from "@/components/pages/TodayTasks";
import UpcomingTasks from "@/components/pages/UpcomingTasks";
import ProjectTasks from "@/components/pages/ProjectTasks";
import Categories from "@/components/pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/all" element={<AllTasks />} />
            <Route path="/today" element={<TodayTasks />} />
            <Route path="/upcoming" element={<UpcomingTasks />} />
            <Route path="/project/:projectId" element={<ProjectTasks />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;