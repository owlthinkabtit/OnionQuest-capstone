import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuest, setNewQuest] = useState({ name: "", description: "" });
  const [editingQuestId, setEditingQuestId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const campRes = await api.get(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCampaign(campRes.data);

        const questRes = await api.get(`/quests/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuests(questRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleCreateQuest = async (e) => {
    e.preventDefault();
    console.log("Attempting to forge quest for campaign:", id); // 🔦 Log 1
    console.log("New Quest Data:", newQuest); // 🔦 Log 2
    try {
      const response = await api.post(`/quests/${id}`, newQuest, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuests([...quests, response.data]);
      setNewQuest({ name: "", description: "" });
    } catch (err) {
      console.error("Failed to forge quest:", err);
    }
  };

  const handleStatusChange = async (questId, newStatus) => {
    try {
      const response = await api.put(
        `/quests/id/${questId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      setQuests(quests.map((q) => (q._id === questId ? response.data : q)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteQuest = async (questId) => {
    if (!window.confirm("Are you sure this quest is gone forever?")) return;

    try {
      await api.delete(`/quests/id/${questId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setQuests(quests.filter((q) => q._id !== questId));
    } catch (err) {
      console.error("Failed to delete quest", err);
    }
  };

  const handleUpdateQuest = async (questId) => {
    try {
      const response = await api.put(`/quests/id/${questId}`, editFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setQuests(quests.map((q) => (q._id === questId ? response.data : q)));
      setEditingQuestId(null);
    } catch (err) {
      console.error("Failed to update quest details:", err);
    }
  };

  if (loading) return <p>Consulting the map...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="details-container">
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
      <hr />

      <section className="quest-section">
        <h2>Active Quests</h2>
        <form onSubmit={handleCreateQuest} className="quest-forge-form">
          <input
            type="text"
            placeholder="Quest Name (e.g, Find the Golden Frog)"
            value={newQuest.name}
            onChange={(e) => setNewQuest({ ...newQuest, name: e.target.value })}
            required
          />
          <textarea
            className="quest-input-area"
            placeholder="Quest Description"
            value={newQuest.description}
            onChange={(e) =>
              setNewQuest({ ...newQuest, description: e.target.value })
            }
          />
          <button type="submit">Forge Quest</button>
        </form>
        <div className="quest-list">
          {quests.length > 0 ? (
            quests.map((q) => (
              <div key={q._id} className="quest-card">
                {editingQuestId === q._id ? (
                  <>
                    <input
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="quest-input-area"
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          description: e.target.value,
                        })
                      }
                    />
                    <button onClick={() => handleUpdateQuest(q._id)}>
                      Save Changes
                    </button>
                    <button onClick={() => setEditingQuestId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h4>{q.name}</h4>
                    <p>{q.description}</p>
                    <label>Status: </label>
                    <select
                      value={q.status}
                      onChange={(e) =>
                        handleStatusChange(q._id, e.target.value)
                      }
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    <button
                      onClick={() => {
                        setEditingQuestId(q._id);
                        setEditFormData({ name: q.name, description: q.description });
                      }}
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={() => handleDeleteQuest(q._id)}
                    >
                      Done
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No quests in the log yet. Start a new one above!</p>
          )}
        </div>
      </section>
    </div>
  );
}


export default CampaignDetails;
