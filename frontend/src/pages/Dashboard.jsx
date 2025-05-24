import React, { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth"; // Your auth hook
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();

  // Documents state (example dummy data)
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Project Proposal.pdf",
      uploadedAt: "2025-05-20",
      size: "1.2 MB",
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      uploadedAt: "2025-05-22",
      size: "540 KB",
    },
  ]);

  // Upload input state
  const [uploadFile, setUploadFile] = useState(null);
  const [confirmation, setConfirmation] = useState("");
  const [qaOpen, setQaOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Q&A state
  const [qaMessages, setQaMessages] = useState([]); // {sender:'user'|'ai', text:''}
  const [questionInput, setQuestionInput] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const qaContentRef = useRef(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (qaContentRef.current) {
      qaContentRef.current.scrollTop = qaContentRef.current.scrollHeight;
    }
  }, [qaMessages]);

  // Handle file upload
  const handleUpload = () => {
    if (!uploadFile) return alert("Please select a file to upload.");

    // Simulate upload, parsing, and indexing with delay
    setTimeout(() => {
      // Add new document to list
      const newDoc = {
        id: Date.now().toString(),
        name: uploadFile.name,
        uploadedAt: new Date().toISOString().split("T")[0],
        size: (uploadFile.size / 1024 / 1024).toFixed(2) + " MB",
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadFile(null);
      setConfirmation(
        `"${newDoc.name}" uploaded, parsed, and indexed successfully!`
      );

      // Clear confirmation after 5 sec
      setTimeout(() => setConfirmation(""), 5000);
    }, 1200);
  };

  // Handle document delete
  const handleDelete = (docId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
      setConfirmation("Document deleted successfully.");
      setTimeout(() => setConfirmation(""), 4000);

      if (selectedDoc?.id === docId) {
        setQaOpen(false);
        setSelectedDoc(null);
        setQaMessages([]);
      }
    }
  };

  // Handle document download (simulate)
  const handleDownload = (doc) => {
    alert(`Starting download for "${doc.name}"`);
    // Implement real download logic here
  };

  // Open Q&A modal for document
  const openQA = (doc) => {
    setSelectedDoc(doc);
    setQaMessages([]);
    setQaOpen(true);
    setQuestionInput("");
  };

  // Close Q&A modal
  const closeQA = () => {
    setQaOpen(false);
    setSelectedDoc(null);
    setQaMessages([]);
    setQuestionInput("");
  };

  // Simulate AI answer generation (replace with real API call)
  const getAIAnswer = async (question) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `This is a simulated answer for your question: "${question}" based on the document "${selectedDoc.name}".`
        );
      }, 1500);
    });
  };

  // Handle question submit
  const submitQuestion = async () => {
    if (!questionInput.trim()) return;
    const question = questionInput.trim();
    setQaMessages((msgs) => [...msgs, { sender: "user", text: question }]);
    setQuestionInput("");
    setLoadingAnswer(true);

    const answer = await getAIAnswer(question);

    setQaMessages((msgs) => [...msgs, { sender: "ai", text: answer }]);
    setLoadingAnswer(false);
  };

  return (
    <div className="dashboard-wrapper">
      <header className="header">
        <div className="user-info">
          <div className="user-name">Welcome, {user.name}!</div>
          <div className="user-email">{user.email}</div>
        </div>
        <button className="action-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {confirmation && <div className="confirmation">{confirmation}</div>}

      <section className="upload-section">
        <input
          type="file"
          onChange={(e) => setUploadFile(e.target.files[0])}
          value={uploadFile ? undefined : ""}
        />
        <button onClick={handleUpload}>Upload Document</button>
      </section>

      <section className="documents-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Uploaded At</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  No documents uploaded yet.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.uploadedAt}</td>
                  <td>{doc.size}</td>
                  <td>
                    <button className="action-btn" onClick={() => openQA(doc)}>
                      View / Q&A
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDownload(doc)}
                    >
                      Download
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {qaOpen && (
        <div className="modal-backdrop" onClick={closeQA}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Q&A: {selectedDoc.name}</h3>
              <button className="close-btn" onClick={closeQA}>
                &times;
              </button>
            </div>

            <div className="qa-content" ref={qaContentRef}>
              {qaMessages.length === 0 ? (
                <p style={{ fontStyle: "italic", color: "#6b7280" }}>
                  Ask a question about this document.
                </p>
              ) : (
                qaMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`qa-message ${
                      msg.sender === "user" ? "user" : "ai"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            <div className="qa-input-container">
              <input
                type="text"
                placeholder="Type your question here..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loadingAnswer) submitQuestion();
                }}
                disabled={loadingAnswer}
              />
              <button
                onClick={submitQuestion}
                disabled={loadingAnswer || !questionInput.trim()}
              >
                {loadingAnswer ? "Waiting..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
