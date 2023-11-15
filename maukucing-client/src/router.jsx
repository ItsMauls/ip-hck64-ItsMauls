import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";
import { MyPosts } from "./pages/MyPosts";


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
      } 
    ]},
    {
        path : '/',
        element : < LandingPage />
      }
  ])