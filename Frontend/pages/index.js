import Head from 'next/head' 
import Layout from '../component/layout' 
import Navbar from '../component/navbar'
import styles from '../styles/Home.module.css'

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <h1>Home page</h1>
        No login required!
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}