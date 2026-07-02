export function logMiddleware(action, message) {
  const time = new Date().toLocaleTimeString();

  console.log(`[${time}] ${action}: ${message}`);
}
