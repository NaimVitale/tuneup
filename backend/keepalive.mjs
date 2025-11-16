import fetch from "node-fetch";

function ping() {
  fetch("https://tuneup-5iiq.onrender.com/health") // ← aquí la URL completa
    .then(res => console.log("Ping interno OK:", res.status))
    .catch(err => console.log("Error ping interno:", err.message));
}

setInterval(ping, 1000 * 60 * 4);
ping();