function QuestCard({
  q,
  editingQuestId,
  editFormData,
  setEditFormData,
  setEditingQuestId,
  handleUpdateQuest,
  handleStatusChange,
  handleDeleteQuest,
}) {
  return (
    <div className={`quest-card ${q.status === "Done" ? "completed" : ""}`}>
      {editingQuestId === q._id ? (
        <>
          <input
            value={editFormData.name}
            onChange={(e) =>
              setEditFormData({ ...editFormData, name: e.target.value })
            }
          />
          <textarea
            className="quest-input-area"
            value={editFormData.description}
            onChange={(e) =>
              setEditFormData({ ...editFormData, description: e.target.value })
            }
          />
          <button className="save-btn" onClick={() => handleUpdateQuest(q._id)}>
            Save Changes
          </button>
          <div className="edit-actions-row">
            <button
              className="cancel-btn"
              onClick={() => setEditingQuestId(null)}
            >
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteQuest(q._id)}
            >
              Abandon Quest
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>{q.name}</h4>
          <p>{q.description}</p>
          <div className="quest-meta">
            <span>
              📜 Embarked:{" "}
              {q.createdAt
                ? new Date(q.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
            {q.status === "Done" && q.updatedAt && (
              <span className="complete-date">
                {" "}
                | ✅ Completed: {new Date(q.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
          <label>Status: </label>
          <select
            value={q.status}
            onChange={(e) => handleStatusChange(q._id, e.target.value)}
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
          <button onClick={() => handleStatusChange(q._id, "Done")}>
            Quest Complete!
          </button>
        </>
      )}
    </div>
  );
}

export default QuestCard;
