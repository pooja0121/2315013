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

#Stage 3
#Query Performance

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

This query is functionally correct because it fetches all unread notifications of a particular student. However, when the amount of data becomes very large, the query starts performing slowly.

##Improvements to the Query
Optimized Query:
``sql 
SELECT notification_id, title, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

This reduces unnecessary data transfer and improves efficiency.

---

##Indexing

```sql
CREATE INDEX idx_notification
ON notifications(studentID, isRead, createdAt);
```

This allows faster searching and sorting.

# Stage 4

# Improving Performance When Notifications are Loaded Frequently

Currently, notifications are being fetched every time a student opens or refreshes the page. As the number of users increases, the database receives too many requests continuously. This creates heavy load on the database and causes slow response time.

---
## Problem in Current System

The current system fetches notification data directly from the database on every page load.

This causes the following issues.

Database receives too many repeated requests.
Server load increases when many students access the system together.
## solution 1 :Caching
Frequently accessed notifications can be stored temporarily in cache memory.

Example:

Redis Cache

Advantages:

- Faster response time.
- Reduces database load.
- Avoids repeated database queries.
# Solution 2: Real Time Updates

Instead of checking database repeatedly, the server can push notifications only when a new notification is created.

Technology Used:
Socket.IO
Advantages:
Instant updates.
No repeated database polling.
Better user experience.

## Solution 3: Database Optimization

Database queries should be optimized by creating indexes and reducing unnecessary queries.

Advantages:
Faster searching.
Better handling of large datasets.

# Stage 5
# Reliable Notification Delivery for Large Number of Students

## Problems in Current Implementation

The current implementation processes each student one by one inside a loop.

This creates multiple problems.

Sending notifications to 50,000 students sequentially takes a lot of time.
If the email API becomes slow, the whole process gets delayed.
If sending email fails for some students, the process becomes inconsistent.
Database insertion and notification delivery are tightly connected.
Failure in one operation can interrupt the overall process.

Because of these reasons, this implementation is not reliable for large scale systems.

---
## What Happens if Email Fails for 200 Students?

Logs show that email sending failed for 200 students in between execution.

In the current system:

Some students may already receive notifications.
Some notification records may already be saved in the database.
## Better System Design

Instead of processing everything together, each task should be handled independently.

The process can be redesigned using asynchronous background processing.

Improved flow:

1. Save notification data in database first.
2. Add email tasks into a queue.
3. Add in-app notification tasks into another queue.
4. Process both queues independently.
5. Retry failed tasks automatically.

## Advantage of New Design

Faster processing because taks run asynchronosouly
failure in email service does not stop the entire system
database remain consistent