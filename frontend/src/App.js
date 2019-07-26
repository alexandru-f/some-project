import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';

import './App.css';

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
    <div>
      <Header></Header>
      <Sidebar></Sidebar>

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />

      <Footer></Footer>
    </div>
  </Router>
  );
}

export default App;
