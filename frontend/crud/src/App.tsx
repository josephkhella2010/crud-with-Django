import { useEffect } from "react";
import "./App.css";
import RoutesPage from "./pages/Routes/RoutesPage";

function App() {
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <>
      <RoutesPage />
    </>
  );
}

export default App;
