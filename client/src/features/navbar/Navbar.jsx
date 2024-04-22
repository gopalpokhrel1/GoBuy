import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CartById } from '../cart/cartSlice'
import { validUser, logOutAsync } from '../auth/authSlice'



const navigation = [
    { name: 'Shop Smart, Shop Online!', href: '#', user: true },
    { name: 'admin', href: '/admin', admin: true },
    { name: 'Orders', href: '/admin/order', admin: true },
]
const userNavigation = [
    { name: 'My Profile', href: '/profile', signout: false },
    { name: 'My Orders', href: '/order', signout: false },
    { name: 'Sign out', href: '#', signout: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
    const data = useSelector(CartById);
    const user = useSelector(validUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 const handleSignOut = ()=>{
     dispatch(logOutAsync())
    navigate('/login');
 }


    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Link to='/'>
                                                <img
                                                    className="h-16 w-16"
                                                    src='/public/logo/logo.png'
                                                    alt="GoBuy"
                                                /></Link>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => item[user.role] ? (
                                                    <Link

                                                        to={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ) : null)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <Link to='/cart'>
                                                <button
                                                    type="button"
                                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">View notifications</span>
                                                    <ShoppingCartIcon className="h-6 w-6 " aria-hidden="true" />

                                                </button>
                                            </Link>
                                            {
                                                data.length > 0 && <span className="inline-flex items-center rounded-md bg-red-50 px-2 text-center py-1 mb-7 -ml-3 z-10 text-xs font-medium text-red-700  ring-inset ring-red-600/10">
                                                    {data.length}
                                                </span>
                                            }

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    item.signout ? ( // Check if the item is a signout link
                                                                        <button
                                                                            onClick={handleSignOut} // Attach handleSignOut function to onClick event
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            to={item.href}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </Menu.Item>
                                                        ))}

                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="Link"
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.profileImage} alt="Hello" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <Link to='/cart'>
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />

                                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

                                            </button>
                                        </Link>
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 mb-7 -ml-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                            3
                                        </span>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    item.signout ? ( // Check if the item is a signout link
                                                                        <button
                                                                            onClick={handleSignOut} // Attach handleSignOut function to onClick event
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            to={item.href}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-600">GoBuy</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}
