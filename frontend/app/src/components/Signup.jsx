import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegistration = () => {
    const payload = {
      username: username,
      email: email,
      pass: pass
    };
    fetch("http://localhost:8080/users/register", { // Fixed the typo in the URL
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // Logging the response data from the server
        // You can add further logic here based on the response from the server
      })
      .catch(error => {
        console.error("Error:", error); // Logging any errors that occur during the fetch request
      });
  };

  return (
    <div>
      <h3>Signup Page</h3>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleRegistration}>Signup</button>
    </div>
  );
};

export default Signup;
