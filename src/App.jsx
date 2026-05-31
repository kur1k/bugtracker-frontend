import { useState } from "react";
import "./App.css";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("dashboard");

    const [bugs, setBugs] = useState([
        {
            id: 1,
            title: "Login Error",
            status: "Open",
            priority: "High",
            author: "igor",
            created: "2026-05-27",
        },
        {
            id: 2,
            title: "500 Server Error",
            status: "In Progress",
            priority: "Medium",
            author: "developer",
            created: "2026-05-27",
        },
    ]);

    const [users, setUsers] = useState([
        {
            id: 1,
            login: "admin",
            role: "Administrator",
            email: "admin@company.com",
            status: "Active",
        },
        {
            id: 2,
            login: "developer",
            role: "Developer",
            email: "dev@company.com",
            status: "Active",
        },
        {
            id: 3,
            login: "tester",
            role: "Tester",
            email: "tester@company.com",
            status: "Active",
        },
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Open");
    const [assignee, setAssignee] = useState("");

    const createBug = () => {
        if (!title.trim()) return;

        const newBug = {
            id: Date.now(),
            title,
            description,
            status,
            priority,
            author: assignee || "admin",
            created: new Date().toISOString().split("T")[0],
        };

        setBugs([...bugs, newBug]);

        setTitle("");
        setDescription("");
        setPriority("Medium");
        setStatus("Open");
        setAssignee("");

        setPage("bugs");
    };

    const deleteUser = (id) => {
        setUsers(users.filter((u) => u.id !== id));
    };

    const editUser = (user) => {
        const newLogin = prompt("Login:", user.login);
        const newRole = prompt("Role:", user.role);
        const newEmail = prompt("Email:", user.email);
        const newStatus = prompt("Status:", user.status);

        if (!newLogin || !newRole || !newEmail || !newStatus) return;

        setUsers(
            users.map((u) =>
                u.id === user.id
                    ? {
                        ...u,
                        login: newLogin,
                        role: newRole,
                        email: newEmail,
                        status: newStatus,
                    }
                    : u
            )
        );
    };

    if (!loggedIn) {
        return (
            <div className="login-page">
                <div className="login-box">
                    <h1>Bug Tracker System</h1>

                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button onClick={() => setLoggedIn(true)}>
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <aside className="sidebar">
                <h2>Bug Tracker</h2>

                <button onClick={() => setPage("dashboard")}>Dashboard</button>
                <button onClick={() => setPage("bugs")}>Bugs</button>
                <button onClick={() => setPage("create")}>Create Bug</button>
                <button onClick={() => setPage("tasks")}>My Tasks</button>
                <button onClick={() => setPage("users")}>Users</button>
                <button onClick={() => setPage("reports")}>Reports</button>

                <button onClick={() => setLoggedIn(false)}>Logout</button>
            </aside>

            <main className="content">

                {page === "dashboard" && (
                    <>
                        <h1>Dashboard</h1>

                        <div className="cards">
                            <div className="card">
                                <h3>Total Bugs</h3>
                                <p>{bugs.length}</p>
                            </div>

                            <div className="card">
                                <h3>Open</h3>
                                <p>{bugs.filter(b => b.status === "Open").length}</p>
                            </div>

                            <div className="card">
                                <h3>In Progress</h3>
                                <p>{bugs.filter(b => b.status === "In Progress").length}</p>
                            </div>

                            <div className="card">
                                <h3>Closed</h3>
                                <p>{bugs.filter(b => b.status === "Closed").length}</p>
                            </div>
                        </div>
                    </>
                )}

                {page === "bugs" && (
                    <>
                        <h1>Bug List</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Author</th>
                                    <th>Created</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bugs.map(bug => (
                                    <tr key={bug.id}>
                                        <td>{bug.id}</td>
                                        <td>{bug.title}</td>
                                        <td>{bug.status}</td>
                                        <td>{bug.priority}</td>
                                        <td>{bug.author}</td>
                                        <td>{bug.created}</td>
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
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>

                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Closed</option>
                            </select>

                            <input
                                placeholder="Assign To"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                            />

                            <button onClick={createBug}>Create Bug</button>
                        </div>
                    </>
                )}

                {page === "tasks" && (
                    <>
                        <h1>My Tasks</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bugs.map(bug => (
                                    <tr key={bug.id}>
                                        <td>{bug.id}</td>
                                        <td>{bug.title}</td>
                                        <td>{bug.status}</td>
                                        <td>{bug.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {page === "users" && (
                    <>
                        <h1>Administration Panel</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Login</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.login}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button onClick={() => editUser(user)}>Edit</button>
                                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {page === "reports" && (
                    <>
                        <h1>Reports</h1>

                        <div className="cards">
                            <div className="card">
                                <h3>Total Bugs</h3>
                                <p>{bugs.length}</p>
                            </div>

                            <div className="card">
                                <h3>Open</h3>
                                <p>{bugs.filter(b => b.status === "Open").length}</p>
                            </div>

                            <div className="card">
                                <h3>Closed</h3>
                                <p>{bugs.filter(b => b.status === "Closed").length}</p>
                            </div>
                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default App;