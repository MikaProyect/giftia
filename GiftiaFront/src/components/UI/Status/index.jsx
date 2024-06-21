import "./status.css";
import { useEffect, useState } from "react";

const Status = ({ status }) => {
  const [statusText, setStatusText] = useState("");
  const [statusColor, setStatusColor] = useState("");

  const handleColor = (status) => {
    setStatusText(status);
    if (status === "Pendiente") {
      setStatusColor("bg-yellow-600");
    } else if (status === "Finalizado") {
      setStatusColor("bg-green-600");
    } else {
      setStatusText("Aún no respondido");
      setStatusColor("bg-red-600");
    }
  };

  useEffect(() => {
    handleColor(status);
  }, [status]);

  return <span className={"statusText " + statusColor}>{statusText}</span>;
};

export { Status };
