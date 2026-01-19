import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Blog from '@/components/Blog';
import SocialFeed from '@/components/SocialFeed';
import Contact from '@/components/Contact';




export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Services />
      <Blog />
      <SocialFeed />
      <Contact />
    </main>
  );
}
