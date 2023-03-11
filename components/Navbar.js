import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Upload from 'components/Upload';
import Avatar from 'components/Avatar';
import { Menu } from '@headlessui/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <nav className="bg-amber-50 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between ">
          <Link href="/" className="flex items-center">
            <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
            <span className="self-center m-2 text-xl text-amber-800 font-bold whitespace-nowrap dark:text-white">
              Kawaii Moment
            </span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-amber-50 w-full px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="flex flex-wrap w-full items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
          <span className="self-center m-2 text-xl text-amber-800 font-bold whitespace-nowrap dark:text-white">
            Kawaii Moment
          </span>
        </Link>

        <Menu>
          <Menu.Button className="inline-flex items-center p-1 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <svg
              className="w-6 h-6 text-amber-800"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Menu.Button>
          <Menu.Items className="absolute z-10 right-4 top-10 mt-6 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-amber-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Menu.Item className="w-full">
              <Upload />
            </Menu.Item>
            <Menu.Item>
              <Link
                href={`/channel/${session.user.name}`}
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Your Channel
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                href="/subscriptions"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Subscriptions
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                href="/setup"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Setup
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                href={session ? '/api/auth/signout' : '/api/auth/signin'}
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {session ? 'Logout' : 'Login'}
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-amber-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Upload />
            </li>
            <li>
              <Link
                href="/subscriptions"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Subscriptions
              </Link>
            </li>
            <li>
              <Link
                href="/setup"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Setup
              </Link>
            </li>
            <li>
              <Link
                href={session ? '/api/auth/signout' : '/api/auth/signin'}
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {session ? 'Logout' : 'Login'}
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  href={`/channel/${session.user.name}`}
                  className="block p-2 rounded-full hover:ring-2 hover:ring-amber-500 md:p-0"
                >
                  <Avatar image={session.user.image} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
