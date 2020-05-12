// import React, { createContext, useReducer, useEffect, useState } from "react";
// import axios from "axios";
// import reducer from "./reducer";
// import {
//   GET_POSTS,
//   ADD_POST,
//   LIKE_POST,
//   SINGLE_POST,
//   CREATE_COMMENT,
//   DELETE_POST,
// } from "./blogTypes";

// export const BlogContext = createContext();

// const initialState = {
//   posts: [],
//   added_post: {},
//   like_post: {},
//   single_post: {},
//   comments: [],
//   created_comment: {},
//   delete_message: "",
// };

// export const BlogProvider = ({ children }) => {
//   const url = `http://localhost:5005/api/posts`;
//   const [tracker, setTracker] = useState({
//     updateState: false,
//     like_style: "",
//   });
//   const [comment, setComment] = useState([]);
//   const [like, setLike] = useState([]);
//   const [iii, setIII] = useState("");
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const getPosts = async () => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       dispatch({ type: GET_POSTS, payload: response.data.data });
//     } catch (error) {}
//   };

//   const getAPost = async (id) => {
//     const token = sessionStorage.getItem("blog");
//     try {
//       const response = await axios.get(
//         `http://localhost:5005/api/posts/${id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: token,
//           },
//         }
//       );
//       const comments = response.data.data.comments;
//       const likes = response.data.data.likes;
//       setComment(comments);
//       setLike(likes);
//       dispatch({ type: SINGLE_POST, payload: response.data.data });
//     } catch (error) {}
//   };

//   const addPost = async (body) => {
//     const token = sessionStorage.getItem("blog");
//     try {
//       const response = await axios.post(url, body, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: token,
//         },
//       });
//       setTracker({
//         ...tracker,
//         updateState: !tracker.updateState,
//       });
//       dispatch({ type: ADD_POST, payload: response.data.data });
//     } catch (error) {}
//   };

//   const likePost = async (id) => {
//     const token = sessionStorage.getItem("blog");
//     try {
//       const response = await axios.post(
//         `http://localhost:5005/api/likes`,
//         { id },
//         {
//           headers: {
//             auth: token,
//           },
//         }
//       );
//       setTracker({
//         updateState: !tracker.updateState,
//         like_style: id,
//       });
//       dispatch({ type: LIKE_POST, payload: response.data });
//     } catch (error) {
//       // dispatch({typ})
//     }
//   };

//   const createComment = async (body, id) => {
//     const token = sessionStorage.getItem("blog");
//     try {
//       setIII(id);
//       const response = await axios.post(
//         `http://localhost:5005/api/comments/${id}`,
//         { body },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: token,
//           },
//         }
//       );
//       dispatch({ type: CREATE_COMMENT, payload: response.data.data });
//     } catch (error) {}
//   };

//   const deletePost = async (id) => {
//     const token = sessionStorage.getItem("blog");
//     try {
//       const response = await axios.delete(
//         `http://localhost:5005/api/posts/${id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: token,
//           },
//         }
//       );
//       console.log(response.data.data);
//       dispatch({ type: DELETE_POST, payload: response.data });
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getPosts();
//     getAPost();
//   }, [tracker.updateState]);
//   return (
//     <BlogContext.Provider
//       value={{
//         getPosts,
//         posts: state.posts[0],
//         addPost,
//         likePost,
//         deletePost,
//         like_style: tracker.like_style,
//         single_post: state.single_post,
//         getAPost,
//         createComment,
//         comment,
//         like,
//       }}
//     >
//       {children}
//     </BlogContext.Provider>
//   );
// };
