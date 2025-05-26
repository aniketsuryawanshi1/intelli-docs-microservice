import React from "react";

const ChatHistory = ({ chatHistory, loading, chatListRef }) => (
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
);

export default ChatHistory;
