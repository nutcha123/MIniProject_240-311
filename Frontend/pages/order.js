import React from 'react';
import withAuth from '../component/withAuth'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router'
import config from '../config/config'

function Order() {
    const router = useRouter();
    const [list, setList] = useState([])

    const getChanoms = async () => {
        let chanoms = await axios.get(config.URL + "/chanom/show");
        console.log("URL", chanoms.data)
        setList(chanoms.data)
    }
    const deleteChanom = async (id) => {
        const chanom = await axios.delete(config.URL + "/chanom/delete/" + `${id}`)
        setList(chanom.data)
    }

    const printChanoms = () => {
        console.log('list', list)
        if (list && list.length) {
            return (list.map((item, index) =>
            (

                <li key={index} className="py-4 px-4 border-2 border-amber-900 rounded-lg flex items-center grid justify-items-center text-xl text-amber-900">
                    <div>{item.picture}</div>
                    <a className='text-mono text-2xl'>{item.name}</a>
                    <a className='text-mono'>PRICE : {item.price} Bath</a>
                    
                    <button className='bg-amber-900 text-orange-200 hover:bg-amber-300 hover:text-orange-500 text-base rounded-full px-2' onClick={() => deleteChanom(item.id)}>Delete</button>
                </li>
            )
            ))
        }
    }
    
    useEffect(() => {
        getChanoms()
    }, []);
    return (
        <div>
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
                <div className='h-56 grid grid-cols-3 gap-4 justify-items-center mt-8'>
                    {printChanoms()}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Order)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}