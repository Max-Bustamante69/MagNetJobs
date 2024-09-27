// utils/fetcher.js
const fetcher = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Cache-Control": "no-store",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default fetcher;
