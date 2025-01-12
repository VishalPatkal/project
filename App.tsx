import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Wallet, Calculator, MessageSquare } from 'lucide-react';
import VoiceLessons from './components/VoiceLessons';
import BudgetTracker from './components/BudgetTracker';
import BusinessPlanner from './components/BusinessPlanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl font-bold text-purple-900">
                Sahayika
              </Link>
              <div className="flex space-x-4">
                <NavLink to="/lessons" icon={<BookOpen size={20} />} text="Lessons" />
                <NavLink to="/budget" icon={<Wallet size={20} />} text="Budget" />
                <NavLink to="/business" icon={<Calculator size={20} />} text="Business" />
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<VoiceLessons />} />
            <Route path="/budget" element={<BudgetTracker />} />
            <Route path="/business" element={<BusinessPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold text-purple-900 mb-6">
        Welcome to Sahayika
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Your personal guide to financial independence and business success
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          to="/lessons"
          icon={<BookOpen className="w-8 h-8" />}
          title="Voice Lessons"
          description="Learn financial concepts in your language through interactive voice-guided lessons"
        />
        <FeatureCard
          to="/budget"
          icon={<Wallet className="w-8 h-8" />}
          title="Budget Tracker"
          description="Track your income and expenses with our easy-to-use budget tool"
        />
        <FeatureCard
          to="/business"
          icon={<Calculator className="w-8 h-8" />}
          title="Business Planner"
          description="Plan and analyze your business ideas with our smart planning tools"
        />
      </div>
    </div>
  );
}

function FeatureCard({ to, icon, title, description }) {
  return (
    <Link to={to} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-purple-600 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default App;