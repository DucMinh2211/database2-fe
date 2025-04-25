// src/App.jsx
import React from "react";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reddit Clone</h1>
      <Input
      type="text"
      placeholder="Enter your username"
      className="mb-4"
      />
      <Button>Click me</Button>
    </div>
  );
}

export default App;
