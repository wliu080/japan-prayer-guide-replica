import Link from 'next/link';

export default function NavItem({ page, children }) {
  return (
    <li>
      <Link href={ page ? `/${page}` : '/'}>
        <a>{children}</a>
      </Link>
    </li>
  );
}
