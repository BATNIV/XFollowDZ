/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #121212;
  color: #fff;
  line-height: 1.5;
}

header {
  background: linear-gradient(90deg, #ff3ca6, #000);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 1.8em;
  font-weight: bold;
  color: #fff;
}

.nav button {
  background: transparent;
  border: 2px solid #ff3ca6;
  color: #ff3ca6;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.nav button:hover {
  background: #ff3ca6;
  color: #000;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.panel {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.authGrid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.authGrid div {
  flex: 1;
  min-width: 250px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin: 8px 0 15px 0;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #fff;
}

input::placeholder {
  color: #aaa;
}

.btn {
  background: #ff3ca6;
  border: none;
  color: #000;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn:hover {
  background: #fff;
  color: #ff3ca6;
}

.btn.muted {
  background: #555;
  color: #ccc;
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.service-card {
  background: #2a2a2a;
  border-radius: 15px;
  padding: 15px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px #ff3ca6;
}

.service-card img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.service-card h4 {
  margin-bottom: 5px;
}

.service-card p {
  font-size: 0.9em;
  color: #ccc;
  margin-bottom: 5px;
}

.invoice, .paymentBox {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 12px;
  margin-top: 15px;
}

footer {
  text-align: center;
  padding: 15px 0;
  background-color: #1a1a1a;
  border-top: 2px solid #ff3ca6;
  margin-top: 20px;
  border-radius: 0 0 15px 15px;
  }
