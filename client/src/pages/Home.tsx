import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";
import { Eye, MessageCircle } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading } = trpc.posts.list.useQuery({
    limit: 12,
    offset: 0,
  });
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            OrlandoBlog
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Tu fuente de noticias, tutoriales y análisis sobre tecnología. Únete a nuestra comunidad y comparte tu conocimiento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          OrlandoBlog
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Tu fuente de noticias, tutoriales y análisis sobre tecnología. Únete a nuestra comunidad y comparte tu conocimiento.
        </p>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.imageUrl && (
                  <div className="relative h-48 bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>0</span>
                    </div>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No hay posts aún. ¡Sé el primero en crear uno!</p>
          </div>
        )}
      </div>
    </div>
  );
}
