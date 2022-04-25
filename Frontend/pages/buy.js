import React from 'react';
import withAuth from '../component/withAuth'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router'
import config from '../config/config'

function Buy() {
    //const URL = 'http://localhost:3001/chanom'
    const router = useRouter()
    const [list, setList] = useState([])
    //    chanoms: [
    //         { id: 1, name: 'Chanom', price: '08-08-19', picture: 'female' },
    //         { id: 2, name: 'Lookchup', price: '08-08-19', picture: 'male' }
    //     ] 
    // })
    const getChanoms = async () => {
        let chanoms = await axios.get(config.URL + "/chanom/show");
        console.log("URL", chanoms.data)
        setList(chanoms.data)
    }
    const updateChanom = async (id) => {
        const chanom = await axios.put(config.URL + "/chanom/update" + `${id}`, { name, price })
        setList(chanom.data)

    }
    const addChanom = async () => {
        const chanom = await axios.post(config.URL + "/chanom/add", { name, price })
        setList(chanom.data)
    }
    const printChanoms = () => {
        console.log('list', list)
        if (list && list.length) {
            return (list.map((item, index) =>
            (
                <li key={index} className="mt-2 py-4 px-4 border-2 border-amber-900 rounded-lg flex items-center grid justify-items-center text-xl text-amber-900">
                    <div>{item.picture}</div>
                    <a className='text-mono'>{item.id}. {item.name}</a>
                    <a className='text-mono'>PRICE : {item.price} Bath</a>
                    <button className='bg-amber-900 text-orange-200 hover:bg-amber-300 hover:text-orange-500 text-base rounded-full px-2' onClick={() => updateChanom(item.id)}>Update</button>
                </li>
            )
            ))
        }
    }
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

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
                <div className='py-4 px-4 flex items-center grid justify-items-center text-xl text-amber-900 text-mono mt-2'>
                    <h1 className='text-2xl'>Add Menu</h1>
                    <a>Name : <input className='border-2 border-amber-300 rounded-lg bg-orange-200 hover:border-amber-900 mt-2 shadow' type="text" onChange={(e) => setName(e.target.value)} /></a>
                    <a>Price : <input className='border-2 border-amber-300 rounded-lg bg-orange-200 hover:border-amber-900 mt-2 shadow' type="text" onChange={(e) => setPrice(e.target.value)} /></a>
                    <button className='bg-amber-900 text-orange-200 hover:bg-amber-300 hover:text-orange-500 text-base rounded-full px-2 mt-2' onClick={() => addChanom()}>Add</button>
                </div>
                <div className='mt-2 h-56 grid grid-cols-3 gap-4  justify-items-center'>
                    {printChanoms()}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Buy)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}