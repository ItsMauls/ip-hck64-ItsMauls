import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";
import { MyPosts } from "./pages/MyPosts";
import { CommentForm } from "./components/CommentForm";
import { CommentSection } from "./components/CommentSection";
import { Cats } from "./pages/Cats";
import ChatWithGPT from "./pages/AskCat";

const loader = async () => {
  if(!localStorage.access_token) return redirect('/')
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
      },
      {
        path : '/cats',
        element : < Cats />,
        loader
      },
      {
        path : '/ask',
        element : < ChatWithGPT />
      }
    ]},
    {
        path : '/',
        element : < LandingPage />,
        loader : throwToPosts
      }
  ])