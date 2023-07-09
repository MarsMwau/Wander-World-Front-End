// postService.js
const API_URL = "http://localhost:3000/posts";

export async function getPosts() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw error;
  }
}
  

export async function likePost(postId) {
  try {
    const response = await fetch(`${API_URL}/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to like post", error);
    throw error;
  }
}

export async function unlikePost(postId) {
  try {
    const response = await fetch(`${API_URL}/${postId}/unlike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to unlike post", error);
    throw error;
  }
}

export async function addComment(postId, content) {
  try {
    const response = await fetch(`${API_URL}/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add comment", error);
    throw error;
  }
}

export async function deleteComment(postId, commentId) {
  try {
    const response = await fetch(`${API_URL}/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      return;
    } else {
      const data = await response.json();
      throw new Error(data.errors[0]);
    }
  } catch (error) {
    console.error("Failed to delete comment", error);
    throw error;
  }
}
