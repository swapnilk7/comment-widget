/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Comment from "./Comment";
import "./CommentWidget.css";

const getNewComment = (
  commentValue,
  isRootNode = false,
  parentNodeId,
  user
) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
    timestamp: new Date().toLocaleString(),
    likeCount: 0,
    likedBy: [],
    userId: user.id,
    userName: user.name,
  };
};

const CommentWidget = ({ initialState, user }) => {
  const [comments, setComments] = useState(() => {
    if (!localStorage.getItem("comments")) return initialState;
    else {
      const val = JSON.parse(localStorage.getItem("comments"));
      return val;
    }
  });
  const [rootComment, setRootComment] = useState("");

  const addComment = (parentId, newCommentText) => {
    let newComment = null;
    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId, user);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childCommments: [...comments[parentId].childCommments, newComment.id],
        },
      }));
    } else {
      newComment = getNewComment(newCommentText, true, null, user);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
    localStorage.setItem(
      "comments",
      JSON.stringify({ ...comments, [newComment.id]: newComment })
    );
  };

  const deleteComment = (commentId) => {
    const commentToDelete = comments[commentId];

    if (!commentToDelete) {
      return;
    }

    if (commentToDelete.isRootNode) {
      commentToDelete.childCommments.forEach((childId) => {
        deleteComment(childId);
      });
    } else {
      const parentComment = comments[commentToDelete.parentNodeId];
      if (parentComment) {
        parentComment.childCommments = parentComment.childCommments.filter(
          (childId) => childId !== commentId
        );
      }
    }

    const updatedComments = { ...comments };
    delete updatedComments[commentId];

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const editComment = (commentId, newCommentText, userId) => {
    const commentToEdit = comments[commentId];

    if (!commentToEdit || commentToEdit.userId !== userId) {
      return; // Comment not found or user is not the author
    }

    const updatedComment = {
      ...commentToEdit,
      commentText: newCommentText,
    };

    const updatedComments = {
      ...comments,
      [commentId]: updatedComment,
    };

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const updateLike = (commentId, userId) => {
    const commentToUpdate = comments[commentId];

    if (!commentToUpdate || commentToUpdate.likedBy.includes(userId)) {
      return; // Comment not found or user already liked
    }

    const updatedComment = {
      ...commentToUpdate,
      likeCount: commentToUpdate.likeCount + 1,
      likedBy: [...commentToUpdate.likedBy, userId],
    };

    const updatedComments = {
      ...comments,
      [commentId]: updatedComment,
    };

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const commentMapper = (comment) => {
    return {
      ...comment,
      childCommments: comment.childCommments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => {
      return !comment.parentNodeId;
    })
    .map(commentMapper);

  const onAdd = () => {
    if (rootComment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    addComment(null, rootComment);
    setRootComment("");
  };

  return (
    <div className="App">
      <header style={{ marginBottom: "2rem", fontSize: "2rem" }}>
        Comment Widget
      </header>
      <div className="comments-container">
        <img src="user-icon.png" alt="userIcon" />{" "}
        <input
          type="text"
          className="addComment_Input"
          value={rootComment}
          maxLength={200}
          onChange={(e) => setRootComment(e.target.value)}
          placeholder="Add comment ..."
          style={{ width: "80%", margin: "0 0.5rem" }}
        />{" "}
        <button className="addComment_Btn" onClick={onAdd}>
          Comment
        </button>
      </div>
      {enhancedComments.length > 0 && (
        <div
          style={{
            border: "1px solid blue",
            width: "90%",
            overflowX: "auto",
            padding: "1rem",
          }}
        >
          {enhancedComments.map((comment, key) => {
            return (
              <Comment
                key={key}
                comment={comment}
                addComment={addComment}
                deleteComment={deleteComment}
                editComment={editComment}
                updateLike={updateLike}
                user={user}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentWidget;
