import type { AppProps /*, AppContext */ } from 'next/app'
import { ToastContainer, Slide } from 'react-toastify'
import Script from 'next/script'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

React.useLayoutEffect = React.useEffect
const App = ({ Component, pageProps }: AppProps) => (
  <>
    {/* Global site tag (gtag.js) - Google Analytics */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
    />
    <Script>
      {`
          window.dataLayer = window.dataLayer || []
          function gtag () { dataLayer.push(arguments) }
          gtag('js', new Date())
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}')
        `}
    </Script>
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        bodyClassName='font-semibold'
        transition={Slide}
      />
      <Component {...pageProps} />
    </AnimatePresence>
  </>
)

export default App
