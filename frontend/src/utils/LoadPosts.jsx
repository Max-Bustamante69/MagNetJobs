import fetcher from "./fetcher";

export default async function loadPosts(page = 1, limit = 10, self = false) {
  const postType = self ? "self" : "following";

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/rebckwyariztdmsv/${postType}_posts?page=${page}&page_size=${limit}/`;

    const data = await fetcher(url);

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { results: [] };
  }
}
