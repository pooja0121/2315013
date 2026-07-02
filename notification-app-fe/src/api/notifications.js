import axios from "axios";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDEzQG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5Njg2ODksImlhdCI6MTc4Mjk2Nzc4OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEyMmFlMjc5LWQzZmMtNGUwMi1hYzQwLWYwOWNkMmQxZmExNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBvb2phIiwic3ViIjoiNzZlZDA5NTctM2RlMC00NzRmLWJiZWUtYWE4ZDJiNjkxNjE5In0sImVtYWlsIjoiMjMxNTAxM0BuZWMuZWR1LmluIiwibmFtZSI6InBvb2phIiwicm9sbE5vIjoiMjMxNTAxMyIsImFjY2Vzc0NvZGUiOiJFUnpVeXgiLCJjbGllbnRJRCI6Ijc2ZWQwOTU3LTNkZTAtNDc0Zi1iYmVlLWFhOGQyYjY5MTYxOSIsImNsaWVudFNlY3JldCI6IkNjYmNkRkt1QVRRcWFDdHcifQ.xepTwQg3aacPGRhowcC2ffls8eUD63AmVZ2-3e1MVKE";

export const getNotifications = async () => {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications?limit=10&page=1",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );
  return response.data;
};