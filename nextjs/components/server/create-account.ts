const registerUser = async () => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "12@example.com",
      password: "StrongPassword1234",
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("User registered successfully:", data);
  } else {
    console.error("Failed to register user:", data.message);
  }
};
