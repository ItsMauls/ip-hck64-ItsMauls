import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
    {
    element : <MainLayout/>,
    children:[
      {
        path : '/',
        element : < MainPage />
      }
      
    ]},
    {
        path : '/home',
        element : < LandingPage />
      }
  
  ])