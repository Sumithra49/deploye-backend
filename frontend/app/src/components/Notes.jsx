import { useEffect } from 'react';

const Notes = () => {
  useEffect(() => {
    fetch("http://localhost:8080/notes", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}` // Use backticks for string interpolation
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error)); // Add catch block to handle errors
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <h3>Notes Dashboard</h3>
    </>
  );
};

export { Notes };
