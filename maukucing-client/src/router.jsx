import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";
import { MyPosts } from "./pages/MyPosts";

const loader = async () => {
  if(!localStorage.access_token) return redirect('/login')
  return null
}
const throwToPosts = async () => {
  if(localStorage.access_token) return redirect('/posts')
  return null
}

export const router = createBrowserRouter([
    {
    element : <MainLayout/>,
    children:[
      {
        path : '/posts',
        element : < MainPage />,
        loader
      },
      {
        path : '/myposts',
        element : < MyPosts />,
        loader
      } 
    ]},
    {
        path : '/',
        element : < LandingPage />,
        loader : throwToPosts
      }
  ])