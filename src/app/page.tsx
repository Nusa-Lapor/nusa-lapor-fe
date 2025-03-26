import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Burger } from "@/components/icons/Burger";
import { Twitter } from "@/components/icons/Twitter";
import { Instagram } from "@/components/icons/Instagram";
import { LinkedIn } from "@/components/icons/LinkedIn";
import { Youtube } from "@/components/icons/Youtube";
import StatisticsChart from "@/components/elements/StatisticsChart/StatisticsChart";
import TestimonialCard from "@/components/elements/TestimonialCard/TestimonialCard";
import ArticleCard from '@/components/elements/ArticleCard/ArticleCard';
import { articleService } from '@/services/article';

async function getArticles() {
  try {
    return await articleService.getArticles()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function Home() {
  const articles = await getArticles()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Nusa Lapor, Anda lapor apa saya tidak tau
          </h1>
          <p className="text-gray-600 mb-6">
            Ini Juga buat apa saya tidak tau lorem ipsum kayaknya awkokawkaw
          </p>
          <Button variant="primary" asChild>
            <Link href="/hotline">Hotline Darurat</Link>
          </Button>
        </div>
        <div className="relative w-[400px] h-[300px]">
          <Image
            src="/hero-illustration.svg"
            alt="Hero Illustration"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-6">
            <StatisticsChart />
          </Card>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Ini bisa geser geser, statistik laporan, laporan terbaru, artikel
            </h2>
            <p className="text-gray-600 mb-6">
              Ini juga buat apa saya tidak tau lorem ipsum kayaknya awkokawkaw
            </p>
            <Button variant="primary">
              Tekan Tombol
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Artikel Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonial</h2>
          <div className="grid grid-cols-3 gap-8">
            <TestimonialCard
              title="Title"
              content="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story."
              imageUrl="/testimonial1.jpg"
            />
            <TestimonialCard
              title="Title"
              content="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story."
              imageUrl="/testimonial2.jpg"
            />
            <TestimonialCard
              title="Title"
              content="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story."
              imageUrl="/testimonial3.jpg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">About <span className="text-red-600">Us</span></h2>
            <h3 className="text-2xl font-semibold mb-4">Hi, Nusawan</h3>
            <p className="text-gray-600">
              Nusa Lapor adalah aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Title</h4>
              <p className="text-gray-600">
                Body text for whatever you&apos;d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Title</h4>
              <p className="text-gray-600">
                Body text for whatever you&apos;d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4">Use cases</h5>
              <ul className="space-y-2">
                <li>UI design</li>
                <li>UX design</li>
                <li>Wireframing</li>
                <li>Diagramming</li>
                <li>Brainstorming</li>
                <li>Online whiteboard</li>
                <li>Team collaboration</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-2">
                <li>Design</li>
                <li>Prototyping</li>
                <li>Development features</li>
                <li>Design systems</li>
                <li>Collaboration features</li>
                <li>Design process</li>
                <li>FigJam</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Best practices</li>
                <li>Colors</li>
                <li>Color wheel</li>
                <li>Support</li>
                <li>Developers</li>
              </ul>
            </div>
            <div>
              <div className="flex space-x-4 mb-4">
                <Twitter className="w-6 h-6" size="24" />
                <Instagram className="w-6 h-6" size="24" />
                <LinkedIn className="w-6 h-6" size="24" />
                <Youtube className="w-6 h-6" size="24" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
