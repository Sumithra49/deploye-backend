import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    const payload = {
      email: email,
      pass: pass
    };

    // Network call
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
