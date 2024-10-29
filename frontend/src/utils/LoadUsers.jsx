import fetcher from "./fetcher";

async function loadUsers() {
  try {
    // Construct the URL for fetching users
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;

    // Use the fetcher to make the API call
    const users = await fetcher(url);

    // Return the fetched users
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return an empty array in case of error
    return [];
  }
}

export { loadUsers };
