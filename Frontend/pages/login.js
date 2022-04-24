import { useRouter } from 'next/router';
import axios from 'axios';
import config from '../config/config';
import { useState } from 'react';
import { message } from 'antd';

export default function Login({ token }) {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const onFinish = async () => {
        if (!user.username || !user.password) message.error('invalid user or password')
        else {

            const data = await axios.post(config.URL + "/api/login", { ...user }, { withCredentials: true })
            if (data.data.token) {
                message.success(data.data.message)
                router.push('/home')
            } else {
                message.error(data.data.message)
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='bg-amber-100 h-screen text-mono'>
            <div className='flex justify-between items-center pl-4 bg-amber-700'>
                <div>
                    <h1 className='ml-2 text-4xl text-orange-300 tracking-wide uppercase bg-amber-700'>Chanom Shop</h1>
                    <a href='/home' className='ml-10 text-xl text-amber-100 tracking-wide uppercase bg-amber-700 hover:text-amber-500'>HOME</a>
                    <a href='/buy' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700 hover:text-amber-500'>BUY</a>
                    <a href='/order' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700 hover:text-amber-500'>ORDER</a>
                </div>
                <div className='flex mr-4'>
                    <button onClick={() => {
                        router.push({
                            pathname: 'login'
                        })
                    }}
                        className='bg-orange-200 hover:bg-amber-500 w-20 h-8 mr-2 rounded-lg text-amber-900'
                    >Login</button>
                    <button onClick={() => {
                        router.push({
                            pathname: 'register'
                        })
                    }}
                        className='bg-orange-200 hover:bg-amber-500 w-20 h-8 rounded-lg text-amber-900'
                    >Register</button>
                </div>

            </div>
            <form className='grid justify-items-center gap-4 place-items-center mt-32'>
                <div className='bg-amber-700 mt-4 rounded-full w-64 grid justify-items-center'>
                    <h1 className='text-2xl text-amber-100 justify-center'>Log in</h1>
                </div>
                <span>or use your account</span>
                <input className='rounded-lg border-2 border-orange-400' onChange={e => setUser({ ...user, username: e.target.value })} type="email" placeholder="Username" />
                <input className='rounded-lg border-2 border-orange-400' onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                <button onClick={onFinish} className="rounded-full bg-amber-300 w-24">Log In</button>
            </form>
        </div>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}