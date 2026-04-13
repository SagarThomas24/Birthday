import { useState } from "react";
import Home from "./pages/Home";
import Party from "./pages/Party";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState("");

  return (
    <>
      {!entered ? (
        <Home setEntered={setEntered} setName={setName} />
      ) : (
        <Party name={name} />
      )}
    </>
  );
}