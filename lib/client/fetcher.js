export default async function fetcher(...args) {
  const res = await fetch(...args);
  const resJson = await res.json();

  // * Token expired, invalid, or missing - force login
  if (res.status === 401) {
    window.location.href = "/api/auth/login";
  }

  return resJson;
}
