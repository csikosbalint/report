const fetchPosts = async () => {
  console.log(`Fetching posts...`);
  console.time("fetchPosts");
  const posts = [];
  await Promise.all(
    process.env.BLOGGERS.split(",").map(async (blogger) => {
      const res = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${blogger}/posts?key=${process.env.BLOGGER_API_KEY}`,
        {
          next: {
            revalidate: 5,
            tags: [`${blogger}`, "posts"],
          },
        }
      );
      const data = await res.json();
      posts.push(...data.items);
    })
  );
  console.log(`Fetched ${posts.length} posts.`);
  console.timeEnd("fetchPosts");
  return posts;
};

const fetchPost = async ({ blogId, postId }) => {
  console.log(`Fetching post: ${blogId}/${postId}`);
  console.time(`fetchPost-${postId}`);
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${process.env.BLOGGER_API_KEY}`,
    {
      next: {
        revalidate: 5,
        tags: [`${blogId}`, `${postId}`, "post"],
      },
    }
  );
  const data = await res.json();
  console.timeEnd(`fetchPost-${postId}`);
  return data;
};

export { fetchPosts, fetchPost };
