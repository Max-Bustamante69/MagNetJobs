// utils/formatTimeAgo.js
const formatTimeAgo = (publicationDate) => {
    const now = new Date();
    const pubDate = new Date(publicationDate);
    const diffInMs = now - pubDate; // Difference in milliseconds
  
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate value for months
    const diffInYears = Math.floor(diffInDays / 365); // Approximate value for years
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    }
    else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}w`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}mo`;
    } else {
      return `${diffInYears}y`;
    }
  };

  export default formatTimeAgo;
  