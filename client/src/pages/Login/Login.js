import React, { useState } from "react";
import styles from "./Login.module.scss";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/feature/userSlice";

const saveAuthTokenInSession = (token) => {
  window.sessionStorage.setItem("token", token);
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = (email, password) => {
    const myPromise = axios.post("/api/login", {
      email,
      password,
    });
    toast.promise(
      myPromise,
      {
        loading: "Connecting...",
        success: ({ data }) => {
          if (data) {
            saveAuthTokenInSession(data.token);
            const token = window.sessionStorage.getItem("token");
            if (token) {
              dispatch(getUser());
              navigate("/home", { replace: true });
            }
            return "Succesfully logged in.";
          }
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
      {
        style: {
          fontFamily: "Dyna Puff, cursive",
          fontSize: "1.4rem",
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
        </div>
        <button
          className={styles.login_btn}
          onClick={(e) => {
            e.preventDefault();
            login(email, pass);
          }}
        >
          LOGIN
        </button>
        <div className={styles.separator}>
          <div className={styles.line} />
          <p>Or</p>
          <div className={styles.line} />
        </div>
        <p className={styles.forgot_pass}>Forgot password?</p>
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
        <p onClick={() => navigate("/register")}>
          Not a member yet? <span>Register Here.</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
