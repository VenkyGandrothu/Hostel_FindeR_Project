import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface-white, #ffffff)",
      }}
    >
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home