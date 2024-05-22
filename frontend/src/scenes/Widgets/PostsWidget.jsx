import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../state/state";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const [posts, setposts] = useState([]);
  // const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // const [loading, setloading] = useState(false);
  
  const getposts= async () => {
    const response = await axios.get("http://localhost:4000/posts");
    dispatch(setposts(response.data));
  }

const getuserposts=async ()=>{
  const responce=await axios.get(`http://localhost:4000/posts/${userId}/posts`)
  dispatch(setposts(responce.data))
}

useEffect(() => {
  if (isProfile) {
        getuserposts();
      } else {
        getposts();
      }
}, []);
// if(posts.length>0){
//   setloading(true)
// }
  // const getPosts = async () => {
  //   const response = await fetch("http://localhost:4000/posts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   dispatch(setPost({ posts: data }));
  // };

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `http://localhost:4000/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  //   // console.log(posts)
  // };
  // console.log(posts)
  // useEffect(() => {
  //   if (isProfile) {
  //     getUserPosts();
  //   } else {
  //     getPosts();
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(posts);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
