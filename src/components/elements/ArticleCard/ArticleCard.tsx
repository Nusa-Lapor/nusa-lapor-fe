import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Article } from '@/services/article';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/artikel/${article.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          {article.gambar && (
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              <Image
                src={article.gambar}
                alt={article.judul}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.judul}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {formatDate(article.tanggal_publikasi)}
          </p>
          <p className="text-gray-600 line-clamp-3">{article.konten}</p>
          <p className="text-sm text-gray-500 mt-2">Oleh: {article.penulis}</p>
        </CardContent>
      </Card>
    </Link>
  )
} 