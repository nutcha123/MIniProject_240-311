import withAuth from '../component/withAuth'
import { useRouter } from 'next/router'

function Home() {
    const router = useRouter();
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
                <div className='flex justify-center mt-10'>
                    <h1 className='text-mono text-amber-900 text-3xl uppercase font-bold '>WELCOME TO CHANOM SHOP</h1>
                </div>
                <div className='flex justify-center mt-2'>
                    <img src="/HomePage.png" width={700} height={350} alt='Promotion' />
                </div>
                <div className='flex justify-center mt-4'>
                    <button className='bg-amber-800 w-24 h-8 rounded-full text-orange-200 hover:bg-amber-500'
                        onClick={() => {
                            router.push({
                                pathname: 'buy'
                            })
                        }}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}