import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialCardProps {
  title: string
  content: string
  imageUrl: string
}

export default function TestimonialCard({ title, content, imageUrl }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  )
} 