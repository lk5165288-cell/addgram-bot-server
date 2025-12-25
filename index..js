const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔴 তোমার BOT TOKEN এখানে বসাও
const BOT_TOKEN = "8532395139:AAGHhJurz1kkjtyejfdwNd7ntgdehzx30Xc";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.get("/", (req, res) => {
  res.send("Addgram Bot Server Running");
});

// ✅ User + Bot Admin Check
app.post("/check-admin", async (req, res) => {
  const { channel, user_id } = req.body;

  try {
    const response = await axios.get(
      `${TG_API}/getChatMember?chat_id=${channel}&user_id=${user_id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Admin check failed" });
  }
});

// ✅ Send Ad Post
app.post("/send-post", async (req, res) => {
  const { channel, text, image } = req.body;

  try {
    if (image) {
      await axios.post(`${TG_API}/sendPhoto`, {
        chat_id: channel,
        photo: image,
        caption: text,
      });
    } else {
      await axios.post(`${TG_API}/sendMessage`, {
        chat_id: channel,
        text: text,
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Post failed" });
  }
});

app.listen(3000, () => {
  console.log("Bot Server Started on Port 3000");
});