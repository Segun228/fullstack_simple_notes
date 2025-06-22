import { useState, useEffect } from "react";
import api from "../../../api";
import Note from "../../components/note/Note";
import styles from "./homePage.module.css";
import ActionButton from "../../components/actionButton/ActionButton";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204);
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201){ 
                    setSuccess(true)
                    setError(false)
                    setContent("")
                    setTitle("")
                }
                else{
                    setSuccess(false)
                    setError(true)
                };
                getNotes();
            })
            .catch((err) => alert(err));
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.formSection}>
                <div className={styles.title}>Create a Note</div>
                <form onSubmit={createNote} className={styles.form}>
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
            <div className={styles.notesContainer}>
                <div className={styles.title}>Notes</div>
                <div className={styles.gridContainer}>
                    {notes.map((note) => (
                        <Note 
                            note={note} 
                            onDelete={deleteNote} 
                            key={note.id} 
                            className={styles.noteItem}
                            updater = {getNotes}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Home;