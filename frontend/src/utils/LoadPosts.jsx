import fetcher from "./fetcher";

export default async function loadPosts(userId, page = 1, self = false) {
  const postType = self ? "user" : "following";

  const limit = 10;

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${userId}/${postType}_posts?page=${page}&page_size=${limit}/`;

    const data = await fetcher(url);

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { results: [] };
  }
}
