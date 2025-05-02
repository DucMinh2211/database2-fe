// components/ui/StatCard.jsx

import React from "react";
import Card from "./Card";
import Icon from "./Icon";

const StatCard = ({ title, value, icon, description, className }) => {
  return (
    <Card className={`stat-card ${className || ""}`}>
      {icon && (
        <div className="stat-card-icon">
          {typeof icon === "string" ? <Icon name={icon} /> : icon}
        </div>
      )}
      <div className="stat-card-content">
        <div className="stat-card-title">{title}</div>
        <div className="stat-card-value">{value}</div>
        {description && (
          <div className="stat-card-description">{description}</div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
