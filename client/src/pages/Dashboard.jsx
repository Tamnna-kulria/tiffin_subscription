import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await api.get("/auth/me");

        setOwner(response.data.owner);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchOwner();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Tiffin Subscription Dashboard</h1>

      {owner && (
        <div>
          <h2>Welcome, {owner.name}</h2>
          <p>{owner.email}</p>
        </div>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;