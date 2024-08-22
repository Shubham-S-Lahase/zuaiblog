import styles from "./PostList.module.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage authentication state

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get("/posts", {
        params: {
          page,
          limit: 10,
        },
      });

      const newPosts = response.data;

      if (newPosts.length < 10) {
        setHasMore(false);
      }

      setPosts((prevPosts) => {
        const existingPostIds = new Set(prevPosts.map((post) => post._id));
        const filteredNewPosts = newPosts.filter(
          (post) => !existingPostIds.has(post._id)
        );
        return [...prevPosts, ...filteredNewPosts];
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to load posts", error);
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  const fetchComments = useCallback(async (postId) => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost._id);
    }
  }, [selectedPost, fetchComments]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePostClick = (post) => {
    if (!isLoggedIn) {
      toast.info("You must login to continue to read");
      return;
    }
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setComments([]);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/posts/${selectedPost._id}/comments`, {
        content: newComment,
      });
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <div className={styles.container}>
      {selectedPost ? (
        <div className={styles.detailedPost}>
          <button className={styles.backButton} onClick={handleBackToList}>
            Back to home
          </button>
          <h2 className={styles.postTitle}>{selectedPost.title}</h2>
          <div className={styles.postMeta}>
            <span className={styles.postAuthor}>
              By {selectedPost.author.username}
            </span>
            <span className={styles.postDate}>
              {moment(selectedPost.createdAt).fromNow()}
            </span>
          </div>
          {selectedPost.imageUrl && (
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className={styles.postImage}
            />
          )}
          <p className={styles.postContent}>{selectedPost.content}</p>

          <div className={styles.commentsSection}>
            <h3>Comments</h3>
            <ul className={styles.commentsList}>
              {comments.map((comment) => (
                <li key={comment._id} className={styles.comment}>
                  <p className={styles.commentContent}>{comment.content}</p>
                  <span className={styles.commentMeta}>
                    By {comment.user.username} - {moment(comment.createdAt).fromNow()}
                  </span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className={styles.commentInput}
              />
              <button type="submit" className={styles.commentSubmit}>
                Add Comment
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <h2 className={styles.heading}>Posts</h2>
          <div className={styles.postsContainer}>
            {posts.map((post) => (
              <div
                key={post._id}
                className={styles.postCard}
                onClick={() => handlePostClick(post)}
              >
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <span className={styles.postAuthor}>
                    By {post.author.username}
                  </span>
                  <span className={styles.postDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.postContent}>
                  {post.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
          {loading && <p className={styles.loading}>Loading more posts...</p>}
          {!hasMore && (
            <p className={styles.endMessage}>You have reached the end.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
