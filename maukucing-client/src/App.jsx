// App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from '../src/components/Toaster';
import { router } from './router';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
