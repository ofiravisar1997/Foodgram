import React, { useEffect, useState } from "react";
import styles from "./Feed.module.scss";
import axios from "axios";
import Post from "./Posts/Post";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://dummyapi.io/data/v1/post?limit=20",
        {
          headers: {
            "app-id": "62f9d31c82c5efb60e7a09a0",
          },
        }
      );
      setFeed(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {feed.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
