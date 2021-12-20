import Head from 'next/head'
import Config from '../config'
import Header from '../components/Header'
import Roadmap from '../components/Roadmap'
import BackToTop from '../components/BackToTop'
import MetaTags from '../components/MetaTags'

export default function Home() {
  return (
    <>
      <Head>
        <MetaTags />
        <title>{Config.title}</title>
        <link rel='shortcut icon' href={Config.favicon} />
      </Head>
      <div className='flex flex-col p-4 space-y-4'>
        <Header />
        <Roadmap />
      </div>
      <BackToTop />
    </>
  )
}
