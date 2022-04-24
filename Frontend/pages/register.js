import { useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import { message } from 'antd'
import { useRouter } from 'next/router'


export default function Register({ token }) {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    })

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = async () => {
        const { username, password, confirmpassword, email } = { ...user }
        console.log(user.email.includes('@'));
        if (!user.email.includes('@')) {
            return message.error('wrong email')
        }
        if (password !== confirmpassword) {
            return message.error('Password not match');
        } else {
            const users = await axios.post(config.URL + "/api/register", { username, password, email })
            console.log(users.data);
            if (users.data.register) {
                message.success(users.data.message)
                router.push('/')
            } else {
                message.error(users.data.message);
            }
        }


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
            <form className='grid justify-items-center gap-4 place-items-center'>
                <h1 className='mt-20 text-6xl text-amber-700 tracking-wide uppercase'>Chanom Shop</h1>
                <div className='bg-amber-700 mt-4 rounded-full w-64 grid justify-items-center'>
                    <h1 className='text-2xl text-amber-100 justify-center'>Register</h1>
                </div>
                <input className='rounded-lg' onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder="E-mail" />
                <input className='rounded-lg' onChange={e => setUser({ ...user, username: e.target.value })} type="text" placeholder="Username" />
                <input className='rounded-lg' onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                <input className='rounded-lg' onChange={e => setUser({ ...user, confirmpassword: e.target.value })} type="password" placeholder="Confrim Password" />
                <button className="rounded-full bg-amber-300 w-24" onClick={onFinish}>Register</button>
            </form>


        </div>

    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}