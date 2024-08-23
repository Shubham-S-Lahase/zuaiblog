import { useParams } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import styles from "./PostDetails.module.css";

const PostDetail = () => {
  const { id } = useParams();
  const { getPostById } = usePosts();
  const post = getPostById(id);

  if (!post) return <div>Post not found</div>;

  return (
    <div className={styles.postDetail}>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <img src={post.image} alt={post.title} className={styles.postImage} />
      <p className={styles.postAuthor}>
        {post.author} - {post.createdAt}
      </p>
      <p className={styles.postContent}>{post.content}</p>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <h3>Comments</h3>
        {/* Comments List and Add Comment Form */}
      </div>
    </div>
  );
};

export default PostDetail;
