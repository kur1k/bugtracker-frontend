import { useState, useEffect } from 'react'
useEffect(() => {

    fetch('http://127.0.0.1:8000/api/bugs/')
        .then((response) => response.json())
        .then((data) => {
            setBugs(data)
        })

}, [])
import './App.css'

function App() {

    // LOGIN STATE
    const [loggedIn, setLoggedIn] = useState(false)

    // PAGE STATE
    const [page, setPage] = useState('dashboard')

    // BUGS STATE
    const [bugs, setBugs] = useState([])
        {
            id: 1,
            title: 'Login Error',
            status: 'Open',
            priority: 'High',
            author: 'igor'
        },
        {
            id: 2,
            title: '500 Server Error',
            status: 'In Progress',
            priority: 'Medium',
            author: 'developer'
        }
    ])

    // FORM STATE
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('High')

    // CREATE BUG
    const createBug = () => {

        const newBug = {
            title: title,
            status: 'Open',
            priority: priority,
            author: 'igor'
        }

        fetch('http://127.0.0.1:8000/api/bugs/', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(newBug)

        })

            .then((response) => response.json())

            .then((data) => {

                setBugs([
                    ...bugs,
                    data
                ])

                setTitle('')
                setPriority('High')

                setPage('dashboard')

            })
    }

    // LOGIN PAGE
    if (!loggedIn) {
        return (
            <div className="login-page">

                <div className="login-card">

                    <h1>Bug Tracking System</h1>

                    <input placeholder="Username" />
                    <input placeholder="Password" type="password" />

                    <button
                        className="login-btn"
                        onClick={() => setLoggedIn(true)}
                    >
                        Login
                    </button>

                </div>

            </div>
        )
    }

    return (

        <div className="app">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <h2>🐞 Bug Tracker</h2>

                <button onClick={() => setPage('dashboard')}>
                    Dashboard
                </button>

                <button onClick={() => setPage('create')}>
                    Create Bug
                </button>

                <button onClick={() => setPage('admin')}>
                    Admin Panel
                </button>

                <button onClick={() => setLoggedIn(false)}>
                    Logout
                </button>

            </aside>

            {/* MAIN */}
            <main className="main">

                {/* DASHBOARD */}
                {page === 'dashboard' && (

                    <div>

                        <div className="topbar">

                            <h1>Dashboard</h1>

                            <button
                                className="create-btn"
                                onClick={() => setPage('create')}
                            >
                                + Create Bug
                            </button>

                        </div>

                        {/* CARDS */}
                        <div className="cards">

                            <div className="card">
                                <h3>Total Bugs</h3>
                                <p>{bugs.length}</p>
                            </div>

                            <div className="card">
                                <h3>Open</h3>
                                <p>
                                    {
                                        bugs.filter(
                                            bug => bug.status === 'Open'
                                        ).length
                                    }
                                </p>
                            </div>

                            <div className="card">
                                <h3>High Priority</h3>
                                <p>
                                    {
                                        bugs.filter(
                                            bug => bug.priority === 'High'
                                        ).length
                                    }
                                </p>
                            </div>

                        </div>

                        {/* TABLE */}
                        <div className="table-container">

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

                                    {bugs.map((bug) => (

                                        <tr key={bug.id}>

                                            <td>#{bug.id}</td>

                                            <td>{bug.title}</td>

                                            <td>
                                                <span className="status open">
                                                    {bug.status}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="priority high">
                                                    {bug.priority}
                                                </span>
                                            </td>

                                            <td>{bug.author}</td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

                {/* CREATE BUG */}
                {page === 'create' && (

                    <div>

                        <div className="topbar">
                            <h1>Create Bug</h1>
                        </div>

                        <div className="form-card">

                            <input
                                placeholder="Bug title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                            <button
                                className="create-btn"
                                onClick={createBug}
                            >
                                Create Bug
                            </button>

                        </div>

                    </div>

                )}

                {/* ADMIN */}
                {page === 'admin' && (

                    <div>

                        <div className="topbar">
                            <h1>Admin Panel</h1>
                        </div>

                        <div className="table-container">

                            <table>

                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td>admin</td>
                                        <td>Administrator</td>
                                        <td>Active</td>
                                    </tr>

                                    <tr>
                                        <td>developer</td>
                                        <td>Developer</td>
                                        <td>Active</td>
                                    </tr>

                                    <tr>
                                        <td>tester</td>
                                        <td>Tester</td>
                                        <td>Blocked</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </main>

        </div>
    )
}

export default App