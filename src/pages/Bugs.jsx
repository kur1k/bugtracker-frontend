import { useEffect, useState } from "react";
import api from "../api";

export default function Bugs() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    api.get("/bugs/").then((res) => setBugs(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Bug List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {bugs.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.status}</td>
              <td>{b.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}