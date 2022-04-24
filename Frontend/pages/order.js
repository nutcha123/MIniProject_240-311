import withAuth from '../component/withAuth'

function Order() {

    return (
        <div>
            <div className='bg-amber-100 h-screen font-mono'>
                <div className='flex items-end pl-4 bg-amber-700'>
                    <h1 className='ml-2 text-4xl text-amber-100 tracking-wide uppercase bg-amber-700'>Chanom Shop</h1>
                    <a href='/home' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>HOME</a>
                    <a href='/buy' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>BUY</a>
                    <a href='/order' className='ml-4 text-xl text-amber-100 tracking-wide uppercase bg-amber-700'>ORDER</a>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Order)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}