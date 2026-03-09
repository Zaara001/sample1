const BASE_URL = "http://localhost:5000/api/admin";

export const adminApi = {
  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/dashboard`);
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return res.json();
  },
};
