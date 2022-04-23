import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import withAuth from '../components/withAuth'

function Buy() {
    const allaction = bindActionCreators(allActions, useDispatch())
    const chanoms = useSelector((state) => state.chanoms)

    const getChanoms = async () => {
        allaction.getChanoms()
        console.log(chanoms);
    }
    useEffect(() => {
        getChanom

        s()
    }, [])
    return (
        <div>
            <div className='bg-amber-100 h-screen font-mono'>
                <div className='flex items-end pl-4 bg-amber-700'>
                    <h1 className='ml-2 text-4xl text-amber-100 tracking-wide uppercase bg-amber-700'>Chanom Shop</h1>
                    <a href='/home' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>HOME</a>
                    <a href='/buy' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>BUY</a>
                    <a href='/order' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>ORDER</a>
                </div>
                <div >
                    {
                        chanoms ? chonoms.map((item, index) => {
                            return (
                                <div style={{ marginTop: "30px", }} key={index}>
                                    <CatCard index={true} sell={false} cat={item} id={index} />
                                </div>
                            )
                        }) : "NO DATA"
                    }
                </div>
            </div>
        </div>
    )
}

export default withAuth(Buy)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}