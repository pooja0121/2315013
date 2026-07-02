const axios=require('axios');
const API_URL="http://4.224.186.213/evaluation-service/notifications";
const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDEzQG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5Njg2ODksImlhdCI6MTc4Mjk2Nzc4OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEyMmFlMjc5LWQzZmMtNGUwMi1hYzQwLWYwOWNkMmQxZmExNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBvb2phIiwic3ViIjoiNzZlZDA5NTctM2RlMC00NzRmLWJiZWUtYWE4ZDJiNjkxNjE5In0sImVtYWlsIjoiMjMxNTAxM0BuZWMuZWR1LmluIiwibmFtZSI6InBvb2phIiwicm9sbE5vIjoiMjMxNTAxMyIsImFjY2Vzc0NvZGUiOiJFUnpVeXgiLCJjbGllbnRJRCI6Ijc2ZWQwOTU3LTNkZTAtNDc0Zi1iYmVlLWFhOGQyYjY5MTYxOSIsImNsaWVudFNlY3JldCI6IkNjYmNkRkt1QVRRcWFDdHcifQ.xepTwQg3aacPGRhowcC2ffls8eUD63AmVZ2-3e1MVKE"
    
function calculatePriority(notification) {
    let score=0;
     if (notification.Type.toLowerCase() === "placement") {
        score += 50;
    } else if (notification.Type.toLowerCase() === "result") {
        score += 40;
    } else if (notification.Type.toLowerCase() === "event") {
        score += 30;
    }
    if(notification.Message.length>100){
        score+=20;
    }else{
        score+=10;      

    }   
     const notificationTime = new Date(notification.Timestamp);
  const currentTime = new Date();

  const hoursDifference =
    (currentTime - notificationTime) / (1000 * 60 * 60);

  if (hoursDifference < 1) {
    score += 30;
  } else if (hoursDifference < 24) {
    score += 20;
  } else {
    score += 10;
  }

  return score;
}


async function fetchNotifications() {
    try {
        const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const notifications = response.data.notifications;
    const prioritizedNotifications = notifications.map(notification => {
      const priorityScore = calculatePriority(notification);
      return {
        ...notification,
        priorityScore
      };
    });

    prioritizedNotifications.sort(
      (a, b) => b.priorityScore - a.priorityScore
    );
    const top10 = prioritizedNotifications.slice(0, 10); 
    console.log("Top 10 Priority Notifications");
    console.log("--------------------------------");

    top10.forEach((notification, index) => {
      console.log(
        `${index + 1}. ${notification.Type} | Score: ${notification.priorityScore}`
      );
      console.log("Message:", notification.Message);
      console.log("--------------");
    });
        
    }catch (error) {
        console.error("Error fetching notifications:", error.message);
    }   
}
fetchNotifications();