// import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { TaskProvider } from './context/task.context';
import { ModalProvider } from './context/modal.context';

function App() {

  return (
    <>
      <Navbar />

      <TaskProvider>
        <ModalProvider>
          <TaskList/>
        </ModalProvider>
      </TaskProvider>
    </>
  )
}

export default App
