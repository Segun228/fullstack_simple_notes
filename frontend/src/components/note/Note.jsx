import React from "react";
import styles from "./Note.module.css";
import { IoCloseCircle } from "react-icons/io5";
import EditNoteModal from "../editNoteModal/EditNoteModal";
function Note({ note, onDelete, updater }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className={styles.noteContainer}>
            <div className={styles.noteTitle}>{note.title}</div>
            <div className={styles.noteContent}>{note.content}</div>
            <div className={styles.noteDate}>{formattedDate}</div>
            <IoCloseCircle 
                className={styles.deleteButton} 
                onClick={() => onDelete(note.id)}
            />
            <EditNoteModal note={note} updater={updater}/>
        </div>
    );
}

export default Note;