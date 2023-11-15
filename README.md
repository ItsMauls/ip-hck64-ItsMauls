[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/eVluYqZE)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12858633&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

# MauKucing API Documentation

This documentation provides detailed information about the API endpoints for managing posts, including creating, retrieving, updating, and deleting posts.

## Table of Contents

- [Get Posts](#get-posts)
- [Get Post by ID](#get-post-by-id)
- [Create Post](#create-post)
- [Update Post](#update-post)
- [Delete Post](#delete-post)
- [Like/Unlike Post](#likeunlike-post)
- [Comment on Post](#comment-on-post)
- [Get My Posts](#get-my-posts)

---

## API Endpoints

### Get Posts

- **Method:** `GET`
- **Endpoint:** `/api/posts/`
- **Query Parameters:**
  - `search` (optional, string): Keyword for searching posts
  - `sort` (optional, string): Sort order ('ASC' or 'DESC')
  - `page` (optional, integer): Page number (default: 1)
  - `perPage` (optional, integer): Number of posts per page (default: 10)
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of post objects with `content` and `imageUrl`
- **Error Response:**
  - **Code:** 4xx / 5xx
  - **Content:** `{ error: "Error message" }`

### Get Post by ID

- **Method:** `GET`
- **Endpoint:** `/api/posts/:id`
- **URL Parameters:**
  - `id` (required, integer): The ID of the post
- **Success Response:**
  - **Code:** 200
  - **Content:** Post object with `content` and `imageUrl`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ error: "Post not found" }`

### Create Post

- **Method:** `POST`
- **Endpoint:** `/api/posts/`
- **Body Parameters:**
  - `content` (required, string): The content of the post
- **Success Response:**
  - **Code:** 201
  - **Content:** Newly created post object
- **Error Response:**
  - **Code:** 4xx / 5xx
  - **Content:** `{ error: "Error message" }`

### Update Post

- **Method:** `PUT`
- **Endpoint:** `/api/posts/:id`
- **URL Parameters:**
  - `id` (required, integer): The ID of the post to update
- **Body Parameters:**
  - `caption` (required, string): Updated caption of the post
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated post object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ error: "Post not found" }`

### Delete Post

- **Method:** `DELETE`
- **Endpoint:** `/api/posts/:id`
- **URL Parameters:**
  - `id` (required, integer): The ID of the post to delete
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message: "Post deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ error: "Post not found" }`

### Like/Unlike Post

- **Method:** `PATCH/DELETE`
- **Endpoint:** `/api/posts/like/:postId`
- **URL Parameters:**
  - `postId` (required, integer): The ID of the post to like or unlike
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message: "Post liked/unliked successfully" }`
- **Error Response:**
  - **Code:** 4xx / 5xx
  - **Content:** `{ error: "Error message" }`

### Comment on Post

- **Method:** `POST`
- **Endpoint:** `/api/posts/comment/:postId`
- **URL Parameters:**
  - `postId` (required, integer): The ID of the post to comment on
- **Body Parameters:**
  - `comment` (required, string): The comment content
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ comment: "Comment content" }`
- **Error Response:**
  - **Code:** 4xx / 5xx
  - **Content:** `{ error: "Error message" }`

### Get My Posts

- **Method:** `GET`
- **Endpoint:** `/api/posts/my`
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of the user's posts
- **Error Response:**
  - **Code:** 4xx / 5xx


  - **Content:** `{ error: "Error message" }`

---

## Additional Notes

- All endpoints require user authentication.
- The response error codes and messages should be handled based on the specific situation encountered.
- `imageUrl` in responses is derived from the user's uploaded image URL or the image URL specified during post creation/update.

---
