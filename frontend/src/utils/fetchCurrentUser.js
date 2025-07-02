export const fetchCurrentUser = async (token) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch current user: ", error.message);
    return null;
  }
};
