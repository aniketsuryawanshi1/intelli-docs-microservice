import React, { useState, useRef, useEffect } from "react";
import { Form } from "antd";
import "./Dashboard.css";
import {
  ChatHistory,
  HeaderBar,
  PromptInput,
  Suggestions,
} from "../../components";

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

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

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
        <HeaderBar />
        {showSuggestions && (
          <Suggestions projectSuggestions={projectSuggestions} />
        )}
        {!showSuggestions && (
          <ChatHistory
            chatHistory={chatHistory}
            loading={loading}
            chatListRef={chatListRef}
          />
        )}
        <PromptInput
          form={form}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleInputKeyDown={handleInputKeyDown}
          handleFinish={handleFinish}
          loading={loading}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default Dashboard;
