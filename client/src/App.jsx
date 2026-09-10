import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import TraineeDashboard from './pages/TraineeDashboard';
import CoursePlayer from './pages/CoursePlayer';
import AssessmentPage from './pages/AssessmentPage';
import TrainerStudio from './pages/TrainerStudio';
import AdminAnalytics from './pages/AdminAnalytics';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<TraineeDashboard />} />
          <Route path="/course/:courseId" element={<CoursePlayer />} />
          <Route path="/assessment/:quizId" element={<AssessmentPage />} />
          <Route path="/trainer" element={<TrainerStudio />} />
          <Route path="/admin" element={<AdminAnalytics />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
