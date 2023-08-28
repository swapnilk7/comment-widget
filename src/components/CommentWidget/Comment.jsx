/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import styles from "./Comment.module.css";
import Modal from "../Modal/Modal";

const Comment = ({
  comment,
  addComment,
  deleteComment,
  updateLike,
  editComment,
  user,
}) => {
  const {
    commentText,
    childCommments,
    id,
    userId,
    userName,
    timestamp,
    likeCount,
    likedBy,
  } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddComponet, setShowAddComponet] = useState(false);

  const inputRef = useRef();

  const onAdd = () => {
    if (childComment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    addComment(id, childComment);
    setChildComment("");
    setShowAddComponet(false);
  };

  const onEdit = () => {
    const val = inputRef.current.innerText;
    if (val.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    editComment(id, val, user.id);
    setEditMode(false);
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="Comment">
      {showDeleteModal && (
        <Modal
          id={id}
          setShowDeleteModal={setShowDeleteModal}
          deleteComment={deleteComment}
        />
      )}
      <div className={styles.commentCard}>
        <div style={{ display: "inline-flex", gap: "10px" }}>
          <span className={styles.profileContainer}>
            {getInitials(userName)}
          </span>
          <span className={styles.name}>{userName}</span>
          <span className={styles.time}>{timestamp}</span>

          {childCommments.length > 0 && (
            <button
              className={styles.showReplyBtn}
              onClick={() => setShow((show) => !show)}
            >
              {show ? "Hide Reply" : "View Reply"}
            </button>
          )}
        </div>
        <div style={{ display: "inline-flex", gap: "2px" }}>
          <p
            className={styles.commentText}
            contentEditable={editMode}
            ref={inputRef}
            onBlur={() => setEditMode(false)}
          >
            {inputRef?.current?.innerText
              ? inputRef.current.innerText
              : commentText}
          </p>
          {editMode ? (
            <>
              <button className={styles.addReplyBtn} onClick={onEdit}>
                Save
              </button>
              <button
                className={styles.addReplyBtn}
                onClick={() => {
                  inputRef.current.innerText = commentText;
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{ display: "inline-flex", gap: "1rem", margin: "2px 10px" }}
        >
          <i
            className={
              likedBy.includes(user.id) ? "fa fa-heart" : "fa fa-heart-o"
            }
            style={{ color: "blue" }}
            onClick={() => updateLike(id, user.id)}
          >
            {likeCount}
          </i>
          {user.id === userId ? (
            <>
              <i
                className="fa fa-edit"
                style={{ color: "blue" }}
                onClick={() => {
                  inputRef.current.focus();
                  setEditMode(true);
                }}
              ></i>
              <i
                className="fa fa-trash"
                style={{ color: "red" }}
                onClick={() => setShowDeleteModal(true)}
              ></i>
            </>
          ) : (
            <></>
          )}
        </div>

        {showAddComponet ? (
          <>
            <input
              type="text"
              value={childComment}
              className="addComment_Input"
              onChange={(e) => setChildComment(e.target.value)}
              placeholder="Add reply ..."
            />
            <div>
              <button className={styles.addReplyBtn} onClick={onAdd}>
                Reply
              </button>
              <button
                className={styles.addReplyBtn}
                onClick={() => setShowAddComponet(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <span
            className={styles.addReplyBtn}
            onClick={() => setShowAddComponet(true)}
          >
            Add Reply
          </span>
        )}
      </div>

      {show &&
        childCommments.map((childCommentEl, key) => {
          return (
            <Comment
              key={key}
              comment={childCommentEl}
              addComment={addComment}
              deleteComment={deleteComment}
              editComment={editComment}
              updateLike={updateLike}
              user={user}
            />
          );
        })}
    </div>
  );
};

export default Comment;
