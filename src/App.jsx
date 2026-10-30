import { useEffect } from 'react'
import { Routes, Route, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CompareBar from './components/CompareBar.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import CarDetails from './pages/CarDetails.jsx'
import Brands from './pages/Brands.jsx'
import Compare from './pages/Compare.jsx'
import Wishlist from './pages/Wishlist.jsx'
import TestDrive from './pages/TestDrive.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CompareBar />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="collection/:id" element={<CarDetails />} />
        <Route path="brands" element={<Brands />} />
        <Route path="compare" element={<Compare />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="test-drive" element={<TestDrive />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
