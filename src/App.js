import React, { useState } from "react";

const API_URL = "https://sv47gyej3e.execute-api.us-east-1.amazonaws.com";

function App() {
  const [dev, setDev] = useState("");
  const [prod, setProd] = useState("");

  const getDev = async () => {
    const res = await fetch(`${API_URL}/dev`);
    const data = await res.json();
    setDev(data.mensaje);
  };

  const getProd = async () => {
    const res = await fetch(`${API_URL}/prod`);
    const data = await res.json();
    setProd(data.mensaje);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>API Gateway + Lambda</h1>

      <button onClick={getDev}>Consultar DEV</button>
      <p>{dev}</p>

      <button onClick={getProd}>Consultar PROD</button>
      <p>{prod}</p>
    </div>
  );
}

export default App;