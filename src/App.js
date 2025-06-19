import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import TrainingVideosPage from "./pages/TrainingVideosPage";
import ReportsPage from "./pages/ReportsPage";
import HelplinePage from "./pages/HelplinePage";
import UserDataPage from "./pages/UserDataPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/training-videos" element={<TrainingVideosPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/helplines" element={<HelplinePage />} />
        <Route path="/UserDataPage" element={<UserDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
