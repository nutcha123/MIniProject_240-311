import { useRouter } from 'next/router'
import axios from 'axios'
import config from '../config/config'
import { useState } from 'react';
import { message } from 'antd'

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
                router.push('/')
            } else {
                message.error(data.data.message)
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='bg-amber-100 h-screen font-mono'>
            <div className='flex items-end pl-4 bg-amber-700'>
                <h1 className='ml-2 text-4xl text-amber-100 tracking-wide uppercase bg-amber-700'>Chanom Shop</h1>
                <a href='/home' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>HOME</a>
                <a href='/buy' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>BUY</a>
                <a href='/order' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>ORDER</a>
            </div>
            <form className='grid justify-items-center gap-4 place-items-center mt-32'>
                <div className='bg-amber-700 mt-4 rounded-full w-64 grid justify-items-center'>
                    <h1 className='text-2xl text-amber-100 justify-center'>Log in</h1>
                </div>
                <span>or use your account</span>
                <input className='rounded-lg border-2 border-orange-400' onChange={e => setUser({ ...user, username: e.target.value })} type="email" placeholder="Username"/>
                <input className='rounded-lg border-2 border-orange-400' onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                <button onClick={onFinish} className="rounded-full bg-amber-300 w-24">Log In</button>
            </form>
        </div>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}