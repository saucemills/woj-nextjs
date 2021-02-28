import { AuthProvider } from '../hooks/useAuth'
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>Woj: Workout Journal</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  )
}

export default MyApp
