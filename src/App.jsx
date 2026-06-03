import { useEffect, useState } from "react";
import "./App.css";
import {
    login as loginAPI,
    getBugs,
    createBug as createBugAPI,
    getUsers
} from "./api";



function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [page, setPage] = useState("dashboard");

    const [bugs, setBugs] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersError, setUsersError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Open");
    const [assignee, setAssignee] = useState("");

    // загрузка багов
    useEffect(() => {
        if (loggedIn) {
            loadBugs();
        }
    }, [loggedIn]);

    const loadBugs = async () => {
        try {
            const res = await getBugs();
            setBugs(res.data);
        } catch (err) {
            console.error("Error loading bugs:", err);
        }
    };

    const loadUsers = async () => {
        setUsersError("");
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (err) {
            if (err.response?.status === 403) {
                setUsersError("403 — Нет доступа к пользователям");
                setUsers([]);
            }
        }
    };

    // LOGIN
    const handleLogin = async () => {
        setLoginError("");

        try {
            const res = await loginAPI(username, password);

            localStorage.setItem("token", res.data.access);

            setRole(res.data.role);
            setLoggedIn(true);

        } catch (err) {
            setLoginError("Неверный логин или пароль");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setRole("");
        setUsername("");
        setPassword("");
        setBugs([]);
        setUsers([]);
    };

    const createBug = async () => {
        if (!title.trim()) return;

        try {
            await createBugAPI({
                title,
                priority,
                status,
                author: username
            });

            await loadBugs();
            setTitle("");
            setPage("bugs");

        } catch (err) {
            console.error("Error creating bug:", err);
        }
    };

    // LOGIN PAGE
    if (!loggedIn) {
        return (
            <div className="login-page">
                <div className="login-box">
                    <h1>Bug Tracker</h1>

                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {loginError && <p style={{ color: "red" }}>{loginError}</p>}

                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        );
    }

    // MAIN UI
    return (
        <div className="container">

            <aside className="sidebar">
                <h2>Bug Tracker</h2>

                <p style={{ color: "#aaa" }}>
                    Role: <b>{role}</b>
                </p>

                <button onClick={() => setPage("dashboard")}>Dashboard</button>
                <button onClick={() => setPage("bugs")}>Bugs</button>
                <button onClick={() => setPage("create")}>Create Bug</button>
                <button onClick={() => { setPage("users"); loadUsers(); }}>Users</button>
                <button onClick={handleLogout}>Logout</button>
            </aside>

            <main className="content">

                {page === "dashboard" && (
                    <>
                        <h1>Dashboard</h1>

                        <div className="cards">
                            <div className="card">
                                <h3>Total</h3>
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
                        <h1>Bugs</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Author</th>
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

                {page === "users" && (
                    <>
                        <h1>Users</h1>

                        {usersError ? (
                            <div style={{ color: "red" }}>
                                {usersError}
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

            </main>
        </div>
    );
}

export default App;