import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import QuestCard from "../components/QuestCard";
import Spinner from "../components/Spinner";

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
        const campRes = await api.get(`/campaigns/${id}`);
        setCampaign(campRes.data);

        const questRes = await api.get(`/quests/${id}`);
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

    const questPayLoad = {
      name: newQuest.name,
      description: newQuest.description,
      status: "To Do",
    };

    try {
      const response = await api.post(`/quests/${id}`, questPayLoad);
      setQuests([...quests, response.data]);
      setNewQuest({ name: "", description: "" });
    } catch (err) {
      console.error("Failed to forge quest:", err);
    }
  };

  const handleStatusChange = async (questId, newStatus) => {
    try {
      const response = await api.put(`/quests/id/${questId}`, {
        status: newStatus,
      });

      setQuests(quests.map((q) => (q._id === questId ? response.data : q)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteQuest = async (questId) => {
    if (!window.confirm("Are you sure this quest is gone forever?")) return;

    try {
      await api.delete(`/quests/id/${questId}`);

      setQuests(quests.filter((q) => q._id !== questId));
    } catch (err) {
      console.error("Failed to delete quest", err);
    }
  };

  const handleUpdateQuest = async (questId) => {
    try {
      const response = await api.put(`/quests/id/${questId}`, editFormData);

      setQuests(quests.map((q) => (q._id === questId ? response.data : q)));
      setEditingQuestId(null);
    } catch (err) {
      console.error("Failed to update quest details:", err);
    }
  };

  if (loading) return <Spinner />

  if (!campaign) return <Spinner />

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
              <QuestCard
                key={q._id}
                q={q}
                editingQuestId={editingQuestId}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                setEditingQuestId={setEditingQuestId}
                handleUpdateQuest={handleUpdateQuest}
                handleStatusChange={handleStatusChange}
                handleDeleteQuest={handleDeleteQuest}
              />
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
