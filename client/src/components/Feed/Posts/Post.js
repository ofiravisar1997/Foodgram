import React from 'react'
import styles from './Post.module.scss'
import {FaHeart,FaRegHeart,FaRegComment,FaRegStar} from 'react-icons/fa'
import moment from 'moment';

const Post = ({post}) => {
    return (
        <div className={styles.post}>
            <div className={styles.post__header}>
                <img className={styles.post__header__img} src={post.owner.picture} alt="Image of a user"/>
                <p className={styles.post__header__name}>{post.owner.firstName + " " + post.owner.lastName}</p>
            </div>
            <img  src={post.image} alt="Image of a post" className={styles.post__img}/>
            <div className={styles.post__bottomContent}>
                <div className={styles.post__bottomContent__icons}>
                    <FaRegHeart/>
                    <FaRegComment/>
                    <FaRegStar/>
                </div>
                <p className={styles.post__bottomContent__likesCount}>{post.likes + " likes"}</p>
                <p className={styles.post__bottomContent__recipe}><span>{post.owner.firstName + " " + post.owner.lastName}</span>{" " + post.text}</p>
                <p className={styles.post__bottomContent__createdAt}>{moment(post.publishDate).fromNow()}</p>

            </div>
            <div className={styles.post__bottomContent__AddMessage}>
                <input type="text" placeholder="Add a comment..."/>
                <button>Post</button>
            </div>
        </div>
    )
}

export default Post;