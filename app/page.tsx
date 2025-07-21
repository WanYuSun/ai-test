import Header from '@/components/layout/Header'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import ModelShowcase from '@/components/home/ModelShowcase'
import Pricing from '@/components/home/Pricing'
import News from '@/components/home/News'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <ModelShowcase />
        <Pricing />
        <News />
      </main>
      <Footer />
    </div>
  )
}
