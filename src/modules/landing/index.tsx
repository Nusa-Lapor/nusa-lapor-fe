import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatisticsChart from "@/components/elements/StatisticsChart/StatisticsChart";
import TestimonialCard from "@/components/elements/TestimonialCard/TestimonialCard";
import ArticleCard from "@/components/elements/ArticleCard/ArticleCard";
import { articleService } from "@/services/article";

async function getArticles() {
  try {
    return await articleService.getArticles();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export const Landing = async () => {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
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
        <div className="relative w-full md:w-[400px] h-[300px]">
          <Image
            src="/hero-illustration.svg"
            alt="Hero Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md">
            <StatisticsChart />
          </Card>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Ini bisa geser geser, statistik laporan, laporan terbaru,
              artikel
            </h2>
            <p className="text-gray-600 mb-6">
              Ini juga buat apa saya tidak tau lorem ipsum kayaknya awkokawkaw
            </p>
            <Button variant="primary">Tekan Tombol</Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Artikel Terbaru</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            Belum ada artikel tersedia
          </p>
        )}
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Testimonial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <TestimonialCard
                key={i}
                title={`Testimonial ${i}`}
                content="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story."
                imageUrl={`/testimonial${i}.jpg`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Improved */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            About <span className="text-red-600">Us</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Hi, Nusawan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nusa Lapor adalah platform pelaporan yang dibuat untuk memudahkan 
                  masyarakat dalam melaporkan berbagai masalah. Kami berkomitmen untuk 
                  menghubungkan suara masyarakat dengan pihak berwenang secara efisien dan transparan.
                </p>
              </div>
              
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                <Image 
                  src="/about-us-image.jpg" 
                  alt="About Nusa Lapor" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Visi Kami</h4>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform pelaporan terdepan yang menjembatani masyarakat dengan 
                  instansi pemerintah untuk menciptakan lingkungan yang lebih aman dan nyaman 
                  bagi semua warga negara.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Misi Kami</h4>
                <p className="text-gray-600 leading-relaxed">
                  Menyediakan layanan pelaporan yang mudah diakses, cepat ditanggapi, dan 
                  transparan dalam penanganannya. Kami berusaha memastikan setiap laporan 
                  ditindaklanjuti dengan tepat dan efisien.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Tim Kami</h4>
                <p className="text-gray-600 leading-relaxed">
                  Kami adalah tim yang berdedikasi untuk membangun jembatan komunikasi antara 
                  masyarakat dan pemerintah, membawa perubahan positif melalui platform teknologi yang inovatif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
