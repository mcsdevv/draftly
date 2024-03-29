export default async function fetcher(...args) {
  try {
    const res = await fetch(...args);
    const data = await res.json();

    // * Token expired, invalid, or missing - force login
    if (res.status === 401) {
      window.location.href = "/api/auth/login";
    }

    return { ...data };
  } catch (err) {
    console.error("Error fetching:", err);
    return { err };
  }
}
