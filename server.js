const http = require("http");
const url = require("url");

let state = { connected: false, country: null };

const countries = [
  { id: "md", name: "Moldova" },
  { id: "us", name: "United States" }
];

function send(res, data) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (req.method === "GET" && parsed.pathname === "/api/vpn/countries") {
    return send(res, { countries });
  }

  if (req.method === "POST" && parsed.pathname === "/api/vpn/connect") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      const { country } = JSON.parse(body || "{}");
      state = { connected: true, country };
      send(res, state);
    });
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/api/vpn/disconnect") {
    state = { connected: false, country: null };
    return send(res, state);
  }

  send(res, { error: "not found" });
}).listen(3000);

console.log("VPN API running on http://localhost:3000");
