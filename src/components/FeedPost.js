// import "./FeedPost.css";

function FeedPost({ post }) {
    const likesCount = post.likes ? post.likes.length : 0;
    const commentsCount = post.comments ? post.comments.length : 0;
  
    return (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <h2 className="postTitle">{post.title}</h2>
            </div>
            <div className="postCenter">
              <img className="postImg" src={post.image.url} alt="Post" />
              <p>{post.content}</p>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <span className="postLikeCounter">{likesCount} Likes</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{commentsCount} Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeedPost;
  