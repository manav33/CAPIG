const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(JSON.parse(data)));
      req.on("error", reject);
    });

    const response = await fetch("https://graph.facebook.com/v18.0/680163134867541/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [body],
        access_token: "EAATm6xYdzp0BOzepzYpTgXIA815c7UqsJGxYuDFCbLp9qWxNZCQjJiwWLpIUaIEbkQ4Wzk82aPQ5i2QVohdFNFWAXzRyUFnvaEc5LuckD45saDuNJLNZASKZCPMieFsU9J7ZCAypIgZAUqiX7whmtBAh8EkLcIqKo4PFlWuOOosD6ajRHa015G9QzyDItOyJccAZDZD"
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error forwarding to Meta:", error);
    res.status(500).json({ error: "Failed to send event" });
  }
};
