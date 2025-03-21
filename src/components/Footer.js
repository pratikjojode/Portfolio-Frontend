import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.css";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="footer">
      <div className="date-time">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      {/* Copyright Text */}
      <p className="copyright">
        &copy; {new Date().getFullYear()} PJ WebWorks. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
