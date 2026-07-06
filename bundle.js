// GitHub Pages frontend bridge

const API = "http://localhost:3000"; // change to deployed backend later

async function getCountries() {
  return fetch(`${API}/api/vpn/countries`).then(r => r.json());
}

async function connectVPN(country) {
  return fetch(`${API}/api/vpn/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country })
  }).then(r => r.json());
}

async function disconnectVPN() {
  return fetch(`${API}/api/vpn/disconnect`, {
    method: "POST"
  }).then(r => r.json());
}

// expose globally
window.VPN = {
  getCountries,
  connectVPN,
  disconnectVPN
};

console.log("bundle.js loaded for GitHub Pages");
