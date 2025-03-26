import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Burger } from "@/components/icons/Burger";
import StatisticsChart from "@/components/elements/StatisticsChart/StatisticsChart";
import TestimonialCard from "@/components/elements/TestimonialCard/TestimonialCard";
import ArticleCard from '@/components/elements/ArticleCard/ArticleCard';
import { articleService } from '@/services/article';
import { Footer } from "@/components/elements/Layout/Footer";


async function getArticles() {
  try {
    return await articleService.getArticles()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export const Landing = async () => {
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
      <footer className="bg-slate-200 py-8 mt-auto w-full">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </main>
  );
}
