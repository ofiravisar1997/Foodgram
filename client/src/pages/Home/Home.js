import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const fetch = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const { data: userData } = await axios.get(
      "https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109cc",
      {
        headers: {
          "app-id": "62f9d31c82c5efb60e7a09a0",
        },
      }
    );
    setPosts(data);
    setUser(userData);
  };

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      <Modal open={true}></Modal>
      <Header user={user} />
      <div className={styles.feedContainer}>
        <Feed />
      </div>
    </div>
  );
};

export default Home;
