import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./Dashboard.css";

const projectSuggestions = [
  {
    title: "Upload Legal Document",
    tagline: "Securely upload and analyze your contracts.",
    icon: "upload_file",
  },
  {
    title: "Ask About Your Document",
    tagline: "Get instant answers from your uploaded files.",
    icon: "gavel",
  },
  {
    title: "Summarize & Extract Key Points",
    tagline: "AI-powered summaries and clause extraction.",
    icon: "summarize",
  },
];

const chatHistoryDummy = [
  {
    id: 1,
    query: "Summarize the NDA document.",
    answer: "The NDA restricts sharing confidential info for 2 years.",
    time: "2025-05-25 10:00",
  },
  {
    id: 2,
    query: "Who are the parties in the agreement?",
    answer: "ABC Corp and John Doe.",
    time: "2025-05-25 10:05",
  },
];

const Dashboard = () => {
  const [form] = Form.useForm();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatHistory, setChatHistory] = useState(chatHistoryDummy);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const chatListRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when chatHistory or loading changes
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  // Handle Enter to send, Shift+Enter for newline
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !loading) {
        form.submit();
      }
    }
  };

  const handleFinish = (values) => {
    if (!values.message) return;
    const newChat = [
      ...chatHistory,
      {
        id: chatHistory.length + 1,
        query: values.message,
        answer: null,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setChatHistory(newChat);
    setShowSuggestions(false);
    setInputValue("");
    form.resetFields();
    setLoading(true);

    setTimeout(() => {
      setChatHistory((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1
            ? {
                ...item,
                answer: "AI is thinking... (replace with real answer)",
              }
            : item
        )
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="dashboard-root no-sidebar">
      <div className="dashboard-main">
        <header className="app-header sticky-header">
          <h1 className="heading">Welcome to DocIntel.AI</h1>
          <h3 className="sub-heading">
            Your AI-powered legal document assistant
          </h3>
        </header>

        {showSuggestions && (
          <ul className="suggestions hide-scrollbar">
            {projectSuggestions.map((s, idx) => (
              <li className="suggestions-item" key={idx}>
                <span className="icon material-symbols-rounded">{s.icon}</span>
                <p className="text">{s.title}</p>
                <p className="suggestion-tagline">{s.tagline}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Chat History */}
        {!showSuggestions && (
          <section className="history-section chat-section">
            <div className="chat-list hide-scrollbar" ref={chatListRef}>
              {chatHistory.map((item) => (
                <React.Fragment key={item.id}>
                  {/* User message */}
                  <div className="chat-row chat-row-user">
                    <div className="chat-bubble user-bubble">
                      <span className="material-symbols-rounded chat-avatar user-avatar">
                        person
                      </span>
                      <span className="chat-text">{item.query}</span>
                    </div>
                  </div>
                  {/* Bot message */}
                  {item.answer && (
                    <div className="chat-row chat-row-bot">
                      <div className="chat-bubble bot-bubble">
                        <span className="material-symbols-rounded chat-avatar bot-avatar">
                          smart_toy
                        </span>
                        <span className="chat-text">{item.answer}</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              {/* Typing/loading indicator */}
              {loading && (
                <div className="chat-row chat-row-bot">
                  <div className="chat-bubble bot-bubble">
                    <span className="material-symbols-rounded chat-avatar bot-avatar">
                      smart_toy
                    </span>
                    <span className="chat-text">
                      <span className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Prompt Input */}
        <div className="prompt-container no-sidebar">
          <Form
            form={form}
            className="prompt-form"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Form.Item
              name="message"
              style={{ flex: 1, marginBottom: 0 }}
              rules={[{ required: true, message: "" }]}
            >
              <Input.TextArea
                ref={inputRef}
                className="prompt-input"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                autoSize={false}
                autoComplete="off"
                disabled={loading}
                maxLength={2000}
                rows={1}
              />
            </Form.Item>
            <div className="prompt-actions">
              <Button
                htmlType="submit"
                className="material-symbols-rounded prompt-send"
                style={{
                  background:
                    "linear-gradient(90deg, #1d7efd 60%, #8f6fff 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  fontSize: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(29,126,253,0.10)",
                  transition: "background 0.2s, transform 0.1s",
                }}
                disabled={!inputValue.trim() || loading}
              >
                arrow_upward
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
