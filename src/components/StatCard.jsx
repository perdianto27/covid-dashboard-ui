import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <Card className={`rounded-xl shadow-md ${bgColor}`}>
      <CardContent className="text-center">
        {/* Icon di atas */}
        <div className="mb-2 flex justify-center">{icon}</div>

        {/* Value */}
        <Typography variant="h5" component="div" className="font-bold">
          {value}
        </Typography>

        {/* Title */}
        <Typography color="text.secondary" className="text-sm">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;