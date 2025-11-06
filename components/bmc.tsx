"use client";

import { useEffect } from "react";

export default function BMC() {
  useEffect(() => {
    const script = document.createElement("script");
    const div = document.getElementById("supportByBMC");
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "mertduzgun");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "If you find this directory helpful, consider supporting me to build more features for boosting your Claude Code workflow!"
    );
    script.setAttribute("data-color", "#FF813F");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      const evt = new Event("DOMContentLoaded");
      window.dispatchEvent(evt);
    };

    div?.appendChild(script);
  }, []);

  return <div id="supportByBMC"></div>;
}
