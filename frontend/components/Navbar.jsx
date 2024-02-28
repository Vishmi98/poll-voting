"use client"

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();

//   const handleLogout = () => {
//     if (localStorage.getItem('auth-token')) {
//       localStorage.removeItem('auth-token');
//     }
//     router.push('/');
//   };

//   return (
//     <div className="flex justify-end pt-5 px-5">
//       {/* <UserButton afterSignOutUrl="/sign-in" /> */}
//       {localStorage.getItem('auth-token')
//         ? <button onClick={handleLogout} className="bg-sky-600 p-2 text-center rounded-lg text-white hover:bg-sky-500">Logout</button>
//         : <Link href={"/login"}><button className="px-5 py-2 rounded-full text-white bg-sky-600 hover:bg-sky-500">Login</button></Link>
//       }
//     </div>
//   );
// }

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    setIsLoggedIn(!!authToken); // Set isLoggedIn based on the presence of the auth token
  }, []); // Run this effect only once after the component mounts

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/');
  };

  return (
    <div className="flex justify-end pt-5 px-5">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="px-5 py-2 rounded-full text-white bg-sky-600 hover:bg-sky-500">Logout</button>
      ) : (
        <Link href="/login">
          <button className="px-5 py-2 rounded-full text-white bg-sky-600 hover:bg-sky-500">Login</button>
        </Link>
      )}
    </div>
  );
}
