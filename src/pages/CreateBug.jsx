import { useState } from "react";
import api from "../api";

export default function CreateBug() {
    const [title, setTitle] = useState("");

    const create = async () => {
        await api.post("/bugs/", {
            title,
            description: "test bug",
            status: "open",
            priority: "high",
            author: "tester",
        });

        alert("Bug created!");
    };

    return (
        <div>
            <h2>Create Bug</h2>
            <input onChange={(e) => setTitle(e.target.value)} />
            <button onClick={create}>Create</button>
        </div>
    );
}