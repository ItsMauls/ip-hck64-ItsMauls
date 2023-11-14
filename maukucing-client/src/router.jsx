import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";
import { MyPosts } from "./pages/MyPosts";
import { ContentForm } from "./components/ContentForm";

export const router = createBrowserRouter([
    {
    element : <MainLayout/>,
    children:[
      {
        path : '/posts',
        element : < MainPage />
      },
      {
        path : '/myposts',
        element : < MyPosts />
      },
      {
        path : '/x',
        element : < ContentForm/>
      }
      
    ]},
    {
        path : '/',
        element : < LandingPage />
      }
  
  ])