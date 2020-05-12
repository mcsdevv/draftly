import styles from "./comment.module.css";
import ago from "s-ago";

interface CommentProps {
  addedAt: string;
  addedBy: string;
  avatar: string;
  comment: string;
  handleDeleteComment: () => void;
}

const Comment = ({
  addedAt,
  addedBy,
  avatar,
  comment,
  handleDeleteComment,
}: CommentProps) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <p className={styles.comment}>{comment}</p>
      <div>
        <img className={styles.avatar} src={avatar} />
      </div>
    </div>
    <div className={styles.bottom}>
      <span className={styles.addedBy}>
        {addedBy} - {ago(new Date(addedAt))}
      </span>
      <svg
        className={styles.trash}
        onClick={handleDeleteComment}
        viewBox="0 0 24 24"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  </div>
);

export default Comment;
