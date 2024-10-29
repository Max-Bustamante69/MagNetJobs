import fetcher from "./fetcher";

export default async function LoadUser(username) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/username/${username}/`;

    const data = await fetcher(url);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {};
  }
}
