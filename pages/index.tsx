import Link from 'next/link';
import { GetStaticProps} from 'next';

export default function Blog({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id}>
            <Link href={`blog/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const blog = await fetch('https://philitanblog.microcms.io/api/v1/blog', key)
  .then(res => res.json())
  .catch(() => null);
  return {
    props: {
      posts: blog.contents,
    },
  };
};
