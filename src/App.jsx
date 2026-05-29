import { useState } from "react";
import "./App.css";

function App() {
    const [page, setPage] = useState("dashboard");

    const [bugs, setBugs] = useState([
        {
            id: 1,
            description: "Login Error",
            status: "Open",
            assignee: "igor",
        },
        {
            id: 2,
            description: "500 Server Error",
            status: "In Progress",
            assignee: "developer",
        },
    ]);

    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Open");
    const [assignee, setAssignee] = useState("");

    const createBug = () => {
        if (!description || !assignee) return;

        const newBug = {
            id: bugs.length + 1,
            description,
            status,
            assignee,
        };

        setBugs([...bugs, newBug]);

        setDescription("");
        setStatus("Open");
        setAssignee("");

        setPage("dashboard");
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <h2>Bug Tracker</h2>

                <button onClick={() => setPage("dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => setPage("create")}>
                    Create Bug
                </button>
            </aside>

            <main className="content">
                {page === "dashboard" && (
                    <>
                        <h1>Dashboard</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Assignee</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bugs.map((bug) => (
                                    <tr key={bug.id}>
                                        <td>#{bug.id}</td>
                                        <td>{bug.description}</td>
                                        <td>{bug.status}</td>
                                        <td>{bug.assignee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {page === "create" && (
                    <>
                        <h1>Create Bug</h1>

                        <div className="form">
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Closed</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Assignee"
                                value={assignee}
                                onChange={(e) =>
                                    setAssignee(e.target.value)
                                }
                            />

                            <button onClick={createBug}>
                                Create
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;