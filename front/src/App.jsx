// import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { TaskProvider } from './context/task.context';
import { ModalProvider } from './context/modal.context';
import {FilterProvider} from './context/filter.context';
function App() {

  return (
    <>
      <Navbar />

      <FilterProvider>
        <TaskProvider>
          <ModalProvider>
              <TaskList/>
          </ModalProvider>
        </TaskProvider>
      </FilterProvider>
    </>
  )
}

export default App
