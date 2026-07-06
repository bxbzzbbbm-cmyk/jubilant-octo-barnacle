const e = React.createElement;

function App() {
  const [countries, setCountries] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [status, setStatus] = React.useState("offline");

  React.useEffect(() => {
    fetch("/api/vpn/countries")
      .then(r => r.json())
      .then(d => setCountries(d.countries));
  }, []);

  async function connect() {
    const res = await fetch("/api/vpn/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selected })
    });

    const data = await res.json();
    setStatus(data.connected ? "connected" : "offline");
  }

  async function disconnect() {
    const res = await fetch("/api/vpn/disconnect", {
      method: "POST"
    });

    const data = await res.json();
    setStatus(data.connected ? "connected" : "offline");
  }

  return e("div", { style: { fontFamily: "Arial", padding: 20 } },
    e("h2", null, "VPN Dashboard"),

    e("p", null, "Status: ", e("b", null, status)),

    e("select", { onChange: e => setSelected(e.target.value) },
      e("option", { value: "" }, "Select Country"),
      countries.map(c =>
        e("option", { key: c.id, value: c.name }, c.name)
      )
    ),

    e("br"),

    e("button", { onClick: connect }, "Connect VPN"),
    e("button", { onClick: disconnect, style: { marginLeft: 10 } }, "Disconnect VPN")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(e(App));
