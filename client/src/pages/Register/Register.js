import React, { useState, useEffect } from "react";
import styles from "./Register.module.scss";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const regiser = () => {
    const promise = axios.post("/api/register", {
      email,
      password: pass,
      name,
      confirmPassword: confirmPass,
    });
    toast.promise(
      promise,
      {
        loading: "Saving User",
        error: (err) => `${err.response.data.message}`,
        success: (success) => {
          setTimeout(navigate("/"), 5000);
          return "User successfully signed in.";
        },
      },
      {
        style: {
          minWidth: "300px",
          fontSize: "1.4rem",
          fontFamily: "DynaPuff, cursive",
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.top_card}>
        <h1 className={styles.logo}>Foodgram</h1>
        <div className={styles.inputs_container}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email:"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
            value={email}
            minLength={1}
            onChange={(newValue) => setEmail(newValue.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password:"
            minLength={6}
            value={pass}
            onChange={(newValue) => setPass(newValue.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Confirm password:"
            minLength={6}
            value={confirmPass}
            onChange={(newValue) => setConfirmPass(newValue.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Name:"
            minLength={1}
            value={name}
            onChange={(newValue) => setName(newValue.target.value)}
          />
        </div>
        <button
          className={styles.login_btn}
          onClick={(e) => {
            e.preventDefault();
            regiser();
          }}
        >
          REGISTER
        </button>
        <div
          style={{
            height: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BeatLoader
            size={12}
            color="#ee5454"
            loading={false}
            isLoading={isLoading}
          />
        </div>
      </form>
      <div className={styles.bottom_card}>
        <p onClick={() => navigate("/")}>
          Already a user?<span>Login Here.</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
