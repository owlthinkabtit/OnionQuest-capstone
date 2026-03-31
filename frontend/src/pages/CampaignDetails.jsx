import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function CampaignDetails () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   async function fetchDetails() {
    try {
      const response = await api.get(`/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      setCampaign(response.data);
    } catch (err) {
      console.error("Could not find this adventure:", err);
    } finally {
      setLoading(false);
    }
   }
   fetchDetails();
  }, [id]);

  if (loading) return <p>Consulting the map...</p>;
  if (!loading) return <p>Campaign not found.</p>;

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