import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { logMiddleware } from "../api/logger";

export default function NotificationsPage() {
  const [priorityOnly, setPriorityOnly] = useState(false);

  const notifications = [
    { Type: "Placement", Message: "Afformed Drive Tomorrow" },
    { Type: "Result", Message: "Semester Results Published" },
    { Type: "Event", Message: "Workshop Registration Open" }
  ];

  logMiddleware("PAGE_LOAD", "Notifications page opened");

  // Priority logic
  function calculatePriority(n) {
    let score = 0;

    if (n.Type === "Placement") {
      score += 50;
    } else if (n.Type === "Result") {
      score += 40;
    } else {
      score += 30;
    }

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
        onClick={() => {
          logMiddleware("BUTTON_CLICK", "All notifications selected");
          setPriorityOnly(false);
        }}
      >
        All Notifications
      </Button>

      {/* Priority notifications button */}
      <Button
        variant="contained"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          logMiddleware("BUTTON_CLICK", "Priority notifications selected");
          setPriorityOnly(true);
        }}
      >
        Priority Notifications
      </Button>

      {/* Display notifications */}
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