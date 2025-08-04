import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MemberList from "./pages/MemberList";  // import the new component
import MemberForm from "./components/MemberForm";
import Overdue from './pages/Overdue';


import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/members/add" element={<MemberForm />} />
        <Route path="/members/edit/:id" element={<MemberForm />} />   
        <Route path="/members/overdue" element={<Overdue/>} />
   
          <Route path="*" element={<Dashboard />} /> {/* fallback route */}
      </Routes>
    </Router>
  );
}

export default App
