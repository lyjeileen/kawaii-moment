import Link from 'next/link';

export default function LoginMessage() {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-4"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>
        You need to{' '}
        <Link href="/api/auth/signin" className="underline">
          log in
        </Link>{' '}
        first.
      </p>
    </div>
  );
}
