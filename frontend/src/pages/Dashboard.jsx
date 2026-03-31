import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCampaign, setNewCampaign] = useState({ name: "", description: ""});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const response = await api.get("/campaigns", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/campaigns", newCampaign, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCampaigns([...campaigns, response.data]);

      setNewCampaign({ name: "", description: ""});
    } catch (err) {
      console.error("The forge failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to abandon this quest forever?")) {
      try {
        await api.delete(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });

        setCampaigns(campaigns.filter((c) => c._id !== id));
      } catch (err) {
        console.error("Failed to delete the scrolls:", err)
      }
    }
  };

  const handleEdit = async (id, currentName) => {
    const newName = window.prompt("Enter new Campaign Name:", currentName);
    if (!newName) return;

    try {
      const response = await api.put(`/campaigns/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setCampaigns(campaigns.map((c) => (c._id === id ? response.data : c)))
    } catch (err) {
      console.error("The rewrite failed:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome Back, {user?.username}!</h1>
      <button onClick={handleLogout}>Leave the Realm</button>

      <hr />
      <section className="create-section">
        <h2>Forge a New Campaign</h2>
        <form onSubmit={handleCreateCampaign}>
          <input
            type="text"
            placeholder="Campaign Title"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value})}
            required
          />
          <textarea 
            placeholder="Breif Description"
            value={newCampaign.description}
            onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value})}
          />
          <button type="submit">Create Campaign</button>
        </form>
      </section>

      <h2>Your Active Campaigns</h2>
      {loading ? (
        <p>Searching the archives...</p>
      ) : (
        <div className="campaign-grid">
          {campaigns.length > 0 ? (
            campaigns.map((camp) => (
              <div key={camp._id} className="campaign-card" style={cardStyle}>
                <h3>{camp.name}</h3>
                <p>{camp.description}</p>

                <div className="card-actions">
                  <button onClick={() => navigate(`/campaign/${camp._id}`)}>
                    Enter Quest
                  </button>
                  <button onClick={() => handleEdit(camp._id, camp.name)} style={{backgroundColor: '#ffcc00' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(camp._id)} style={{backgroundColor: '#ff4444', color: 'white' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No campaigns found. Your journey begins here, Hero!</p>
          )}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default Dashboard;
