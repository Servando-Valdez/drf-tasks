// import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { TaskProvider } from './context/task.context';

function App() {

  return (
    <>
      <Navbar />

      <TaskProvider>
        <TaskList/>
      </TaskProvider>
    </>
  )
}

export default App
