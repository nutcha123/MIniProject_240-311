import Head from 'next/head'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useEffect } from 'react'


export default function Home({ token }) {
  console.log(token);

  const allaction = bindActionCreators(allActions, useDispatch())
  const cats = useSelector((state) => state.cats)

  const getCats = async () => {
    allaction.getCats()
    console.log(cats);
  }
  useEffect(() => {
    getCats()
  }, [])
  return (
    <div>
      <div>
        <a>WELCOME TO CAT SHOP</a>
      </div>
      <div>
        {
          cats ? cats.map((item, index) => {
            return (
              <div style={{ marginTop: "30px", }}>
                <CatCard index={false} cat={item} id={index} />
              </div>

            )
          }) : "NO DATA"
        }
      </div>
    </div>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}