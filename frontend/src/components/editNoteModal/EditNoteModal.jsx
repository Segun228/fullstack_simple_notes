import styles from "./editNoteModal.module.css"
import ActionButton from "../actionButton/ActionButton";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import api from "../../../api";

const EditNoteModal = ({note, updater}) => {
    
    const [open, setOpen] = useState();
    const [content, setContent] = useState(note.content || "");
    const [title, setTitle] = useState(note.title || "");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleClose = () => {
        setOpen(false)
    }

    const id = note?.id

    const editNote = (e) => {
        e.preventDefault();
        api
            .put(`/api/notes/edit/${id}/`, { content, title })
            .then((res) => {
                if (res.status === 200){ 
                    setSuccess(true)
                    setError(false)
                    setContent("")
                    setTitle("")
                    setOpen(false)
                    updater()
                }
                else{
                    setSuccess(false)
                    setError(true)
                    console.log(res)
                };
            })
            .catch((err) => alert(err));
    };

    return ( 
        <>
            <FaEdit className={styles.editButton} onClick={()=>{setOpen(true)}}/>
            {open && <div className={styles.background}>
                <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                    <MdOutlineCancel className={styles.cancel} onClick={()=>{handleClose()}} />
                    <div className={styles.title}>Edit note</div>
                    <form onSubmit={editNote} className={styles.form}>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter the title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className={styles.formInput}
                        />
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Enter the content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={styles.formTextarea}
                        ></textarea>
                        {error &&
                            <div className={styles.error}>Failed to create a note</div>
                        }
                        {success &&
                            <div className={styles.success}>Note created succesfully</div>
                        }
                        <ActionButton type="submit">Submit</ActionButton>
                    </form>
                </div>
            </div>}
        </>
    );
}

export default EditNoteModal;