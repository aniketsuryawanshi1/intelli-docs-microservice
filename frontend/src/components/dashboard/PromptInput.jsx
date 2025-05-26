import React from "react";
import { Form, Input, Button } from "antd";

const PromptInput = ({
  form,
  inputValue,
  setInputValue,
  handleInputKeyDown,
  handleFinish,
  loading,
  inputRef,
}) => (
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
            background: "linear-gradient(90deg, #1d7efd 60%, #8f6fff 100%)",
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
);

export default PromptInput;
