import React from "react";
import styles from "./Header.module.scss";
import { AiFillPlusSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>FOODGRAM</h1>
      <div className={styles.search_div}>
        <input
          className={styles.search_div__input}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className={styles.buttonsContainer}>
        <AiFillPlusSquare size={32} />
        <div className={styles.profileDiv}>
          <img
            className={styles.profileDiv_img}
            src={user.picture}
            alt="User profile"
          />
          <h4 className={styles.profileDiv_name}>
            {user.firstName + " " + user.lastName}
          </h4>
          <div className={styles.profileDiv_dropdown}>
            <ul className={styles.profileDiv_dropdown_menu}>
              <li className={styles.profileDiv_dropdown_menu_item}>
                My profile
              </li>
              <li className={styles.profileDiv_dropdown_menu_item}>
                My Bookmarks
              </li>
              <li
                className={styles.profileDiv_dropdown_menu_item}
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
