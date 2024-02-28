"use client"

import { useRouter } from "next/navigation";
// import { useState } from "react"

// export default function LoginSignup() {
//     const [state, setState] = useState("Login");
//     const [formData, setFormData] =useState({
//         username: "",
//         password: "",
//         email: ""
//     })

//     const changeHandler = (e) => {
//         setFormData({...formData, [e.target.name]:e.target.value})
//     }

//     const login = async () => {
//         console.log("login", formData);
//     }

//     const signup = async () => {
//         console.log("signup", formData);
//         let responseData;
//         await fetch('http://localhost:3000/signup', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         }).then((response) => response.json()).then((data) => responseData=data)

//         if (responseData.success) {
//             window.location.replace("/");
//         }
//     }

//     return (
//         <div className="flex justify-center items-center border rounded-xl h-full w-[400px] p-2">
//             <div className="space-y-8 p-5 w-full">
//                 <h1 className="font-bold text-2xl">{state}</h1>
//                 <div className="space-y-5">
//                     <form action="#" className="space-y-4">
//                         {state === "Sign Up" ?
//                             <div className="border border-slate-300 rounded-lg p-2">
//                                 <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" className="w-full" />
//                             </div> :
//                             <></>
//                         }

//                         <div className="border border-slate-300 rounded-lg p-2">
//                             <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" className="w-full" />
//                         </div>

//                         <div className="border border-slate-300 rounded-lg p-2">
//                             <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" className="w-full" />
//                             <i className=""></i>
//                         </div>

//                         <button onClick={() => { state === "Login" ? login() : signup() }} className="bg-sky-600 p-2 text-center rounded-lg text-white hover:bg-sky-500">Continue</button>
//                     </form>
//                     {state === "Sign Up" ?
//                         <div className="flex justify-center text-sm">
//                             <p className="text-slate-500">Already have an account? <span onClick={() => { setState("Login") }} className="text-sky-500 font-bold cursor-pointer">Login</span></p>
//                         </div> :
//                         <div className="flex justify-center text-sm">
//                             <p className="text-slate-500">Do not have an account? <span onClick={() => { setState("Sign Up") }} className="text-sky-500 font-bold cursor-pointer">Sign Up</span></p>
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState } from "react";

export default function LoginSignup() {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const router = useRouter();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();
        console.log("login", formData);
        let responseData;
        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            router.push("/dashboard")
        }
        else {
            alert(responseData.errors)
        }
    };

    const signup = async (e) => {
        e.preventDefault();
        console.log("signup", formData);
        let responseData;
        await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            router.push("/")
        }
        else {
            alert(responseData.errors)
        }
    };

    return (
        <div className="flex justify-center items-center border rounded-xl h-full w-[400px] p-2">
            <div className="space-y-8 p-5 w-full">
                <h1 className="font-bold text-2xl">{state}</h1>
                <div className="space-y-5">
                    <form className="space-y-4">
                        {state === "Sign Up" &&
                            <div className="border border-slate-300 rounded-lg p-2">
                                <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" className="w-full" />
                            </div>
                        }

                        <div className="border border-slate-300 rounded-lg p-2">
                            <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" className="w-full" />
                        </div>

                        <div className="border border-slate-300 rounded-lg p-2">
                            <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" className="w-full" />
                            <i className=""></i>
                        </div>

                        <button onClick={(e) => { state === "Login" ? login(e) : signup(e) }} className="bg-sky-600 p-2 text-center rounded-lg text-white hover:bg-sky-500">Continue</button>
                    </form>
                    {state === "Sign Up" ?
                        <div className="flex justify-center text-sm">
                            <p className="text-slate-500">Already have an account? <span onClick={() => { setState("Login") }} className="text-sky-500 font-bold cursor-pointer">Login</span></p>
                        </div> :
                        <div className="flex justify-center text-sm">
                            <p className="text-slate-500">Do not have an account? <span onClick={() => { setState("Sign Up") }} className="text-sky-500 font-bold cursor-pointer">Sign Up</span></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
