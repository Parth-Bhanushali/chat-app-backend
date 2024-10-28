import cron from "node-cron";
import axios from "axios";

// Function to ping the server
const pingServer = async () => {
  try {
    await axios.get(process.env.SERVER!);
  } catch (error) {
    console.error("Error pinging server:", error);
  }
};

// Schedule the ping job every 10 minutes
const startPingJob = () => {
  cron.schedule("*/10 * * * *", pingServer);
};

export default startPingJob;
