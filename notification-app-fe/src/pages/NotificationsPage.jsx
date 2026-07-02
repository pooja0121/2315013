import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function NotificationsPage() {
  const [priorityOnly, setPriorityOnly] = useState(false);

  const notifications = [
    { Type: "Placement", Message: "Afformed Drive" },
    { Type: "Result", Message: "Semester Results Published" },
    { Type: "Event", Message: "Workshop Registration Open" }
  ];

  function calculatePriority(n) {
    let score = 0;

    if (n.Type === "Placement") score += 50;
    else if (n.Type === "Result") score += 40;
    else score += 30;

    return score;
  }

  let display = [...notifications];

  if (priorityOnly) {
    display.sort((a, b) => calculatePriority(b) - calculatePriority(a));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications App</h2>

      <Button
        variant="contained"
        onClick={() => setPriorityOnly(false)}
      >
        All Notifications
      </Button>

      <Button
        variant="contained"
        onClick={() => setPriorityOnly(true)}
        style={{ marginLeft: "10px" }}
      >
        Priority Notifications
      </Button>

      {display.map((n, i) => (
        <Card key={i} style={{ marginTop: "15px" }}>
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography>{n.Message}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}