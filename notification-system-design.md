# Notification System Design
the campus notification is designed to help students receive important updates like placements

##1.Notification API
The API is used by the admin to create and send a new notifications to students
Endpoint:
POST /api/notifications

Headers:

Content-Type:application/json
Authorization:Bearer Token

Request Body:
```json
{
  "title": "Placement Opportunity",
  "message": "Affordmed",
  "type": "placement"
}
```

Response:

```json
{
  "success": true,
  "message": "Notification created successfully"
}
```
## 2.View Notifications API
This API allows students to view all notifications sent by the system
Endpoint:

GET /api/notifications

Headers:

Authorization: Bearer Token

Response:

```json
{
  "notifications": [
    {
      "id": 1,
      "title": "Placement Opportunity",
      "message": "Afformed",
      "type": "placement"
    }
  ]
}
```
## 3. Delete Notification API

This API allows admin to remove old or invalid notifications from the system.

Endpoint:
DELETE /api/notifications/{id}
Headers:
Authorization: Bearer Token

Response:

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```
#Stage 2

# Database Design and Storage Planning

After designing the APIs in Stage 1, the next step is to store the notification data permanently in a database. Since the application handles student notifications related to placements, events, and results, the database should be able to manage structured data efficiently and support fast retrieval when the number of users increases.

For this system, MySQL is chosen as the database because it is reliable, easy to manage, supports structured data, and performs well when handling multiple users at the same time.

---

## Database Choice

Selected Database:

MySQL
## Database Schema

The system requires three main tables.

### 1. Students Table

This table stores student information.

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(50)
);
```
### 2. Notifications Table

This table stores all notifications created by the admin.

```sql
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    message TEXT,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fetch All Notifications
used when students open the notification page
```sql
Select * From notifications;


### Delete Notification

Used by admin to remove notifications.

```sql
DELETE FROM notifications
WHERE notification_id = 1;
```
---
## Problems When Data Increases

As the number of students and notifications increase, some issues may occur.

Possible problems:

- Database queries may become slower.
- Large notification records can reduce performance.
- Too many users accessing at the same time may increase server load.
- Delay in fetching notifications.

---

## Solutions for Large Data Handling

To improve performance when data increases, the following solutions can be used.

- Use indexing to speed up searching.
- Use caching to reduce repeated database access.
- Apply pagination instead of loading all notifications together.
- Optimize SQL queries for faster execution.
- Scale database when user traffic increases.

---