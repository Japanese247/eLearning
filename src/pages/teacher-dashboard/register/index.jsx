import Link from 'next/link'
import React, { useState } from 'react'
import timeZones from "../../../Json/TimeZone";
import nationalities from "../../../Json/Nationality";
import Logo from "../../Assets/Images/logo.png"
import Image from 'next/image';
import Listing from '@/pages/api/Listing';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        confirm_email: "",
        timezone: "",
        nationalities: "",
        password: "",
        confirm_password: "",
        gender: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const hasMinLength = value.length >= 8;
            setIsPasswordValid(hasUpper && hasLower && hasNumber && hasSymbol && hasMinLength);
        }
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        if(!isPasswordValid){
            toast.error("Password must include at least one uppercase letter, one lowercase letter, a number, a special character, and be at least 8 characters long.");
            return;
        }

        if (data?.email !== data?.confirm_email) {
            toast.error("Email and Confirm Email do not match");
            return;
        }
        if (data?.password !== data?.confirm_password) {
            toast.error("Password and Confirm Password do not match");
            return;
        }
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.Register({
                email: data?.email,
                password: data?.password,
                name: data?.name,
                role: "teacher",
                nationality: data?.nationalities,
                time_zone: data?.timezone,
                gender: data?.gender,
            });

            if (response?.data?.status) {
                router.push("/login")
                toast.success(response.data.message);
                setData({
                    email: "",
                    confirm_email : "",
                    password: "",
                    confirm_password: "",
                    name: "",
                    role: "",
                    nationalities: "",
                    timezone: "",
                    gender: ""
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong!");
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white px-6 lg:px-16 pt-5 pb-10 lg:pb-20  rounded-[20px] md:rounded-[20px] lg:rounded-[40px] shadow lg:shadow-lg w-full max-w-[976px] login_custom">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                   <Link href="/"><Image src={Logo} alt="Japanese for me" /></Link>
                </div>

                {/* Heading */}
                <h2 className="text-center text-red-600 text-2xl font-semibold mb-2 uppercase">
                    REGISTER as a Teacher
                </h2>
                <p className="text-center text-sm text-black mb-8">
                    Want to register as a Student instead?{" "}
                    <Link
                        href="/student/register"
                        className="inline-block text-blue-600 font-medium hover:underline hover:text-blue-800 transition duration-200"
                    >
                        Click here
                    </Link>
                </p>

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap -mx-2.5 justify-center'>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">Name</label>
                            <input
                                value={data?.name}
                                onChange={handleChange}
                                type="text"
                                name='name'
                                placeholder="Name"
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required
                            />
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">Time-Zone</label>
                            {/* Time-Zone */}
                            <select className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                onChange={handleChange}
                                value={data?.timezone}
                                name='timezone'
                                required
                            >
                                <option value="">Please select Time-Zone</option>
                                {timeZones && timeZones?.map((zone, index) => (
                                    <option key={index} value={zone.value}>
                                        {zone.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">Email</label>
                            <input
                                value={data?.email}
                                onChange={handleChange}
                                type="email"
                                name='email'
                                placeholder="Email"
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[5 6px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required

                            />
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">Email</label>
                            <input
                                value={data?.confirm_email}
                                onChange={handleChange}
                                type="email"
                                name='confirm_email'
                                placeholder="Confirm Email"
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[5 6px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2.5 mb-5 relative">
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required
                            />
                            <div
                                className="absolute top-9 right-5 cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOff size={24} /> : <IoEye size={24} />}
                            </div>
                            {passwordFocused && !isPasswordValid && (
                                <p className="text-red-600 text-sm mt-1">
                                Password must include at least one uppercase letter, one lowercase letter, a number, a special character, and be at least 8 characters long.
                                </p>
                            )}
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5 relative'>
                            <label className="block text-base font-semibold text-[#727272] tracking-[-0.06em] mb-1">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={data?.confirm_password}
                                onChange={handleChange}
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required
                            />
                            <div
                                className="absolute top-9 right-5 cursor-pointer text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <IoEyeOff size={24} /> : <IoEye size={24} /> }
                            </div>
                        </div>

                        {/* Gender */}
                        {/* <select
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                onChange={handleChange}
                                value={data?.gender || ""}
                                name="gender"
                                required
                            >
                                <option value="">Please select gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select> */}

                        {/* Nationality */}
                        {/* <select className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                onChange={handleChange}
                                value={data?.nationalities}
                                name='nationalities'
                                required
                            >
                                <option value="">Please select nationality</option>

                                {nationalities && nationalities?.map((nation, idx) => (
                                    <option key={idx} value={nation.value}>
                                        {nation.label}
                                    </option>
                                ))}
                            </select> */}


                        {/* Register Button */}

                        <div className="w-full md:w-12/12 px-2.5 mb-5 flex flex-wrap justify-center">
                            <div className='w-full md:w-6/12'> 
                                <button
                                    type="submit"
                                    disabled={loading} //
                                    className="w-full py-[15px] bg-[#CC2828] hover:bg-[#a11f1f] cursor-pointer text-white py-2 rounded-md font-semibold transition"
                                >
                                    {loading ? "Loading.." : "Sign Up"} {/* Fixed typo */}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* Login Redirect */}
                <p className="text-center text-base text-[#727272] mt-6 lg:mt-12 tracking-[-0.03em] font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#CC2828] hover:underline">
                        Log in.
                    </Link>
                </p>
            </div>
        </div>
    )
}
