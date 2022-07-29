import Link from 'next/link';

export default function NavItem({ post, children }) {
  return (
    <li>
      <Link href={ post ? `/posts/${post}` : '/'}>
        <a>{children}</a>
      </Link>
    </li>
  );
}
