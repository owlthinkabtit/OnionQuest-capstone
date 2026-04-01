import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuest, setNewQuest] = useState({ name: "", description: ""});


  useEffect(() => {
    async function fetchData() {
      try {
        const campRes = await api.get(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        setCampaign(campRes.data);

        const questRes = await api.get(`/quests/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
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

  // useEffect(() => {
  //  async function fetchDetails() {
  //   try {
  //     const response = await api.get(`/campaigns/${id}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
  //     });
  //     setCampaign(response.data);
  //   } catch (err) {
  //     console.error("Could not find this adventure:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  //  }
  //  fetchDetails();
  // }, [id]);

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
        <p>No quests added to this campaign yet.</p>
        <button>+ Add New Quest</button>
      </section>
    </div>
  );
}

export default CampaignDetails;
