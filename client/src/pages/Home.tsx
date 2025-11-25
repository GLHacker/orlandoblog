import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Eye, MessageCircle } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading } = trpc.posts.list.useQuery({ limit: 50, offset: 0 });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--instagram-purple)] via-[var(--instagram-pink)] to-[var(--instagram-orange)] bg-clip-text text-transparent">
            OrlandoBlog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu fuente de noticias, tutoriales y análisis sobre tecnología. 
            Únete a nuestra comunidad y comparte tu conocimiento.
          </p>
        </div>

        {/* Posts Grid - Instagram Style */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <a className="block group">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border">
                    {/* Post Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--instagram-purple)]/10 to-[var(--instagram-pink)]/10">
                          <span className="text-4xl font-bold text-muted-foreground/30">
                            {post.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                          <Eye className="h-5 w-5" />
                          <span className="font-semibold">{post.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <MessageCircle className="h-5 w-5" />
                          <span className="font-semibold">0</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Info */}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.category && (
                        <span className="inline-block mt-2 text-xs font-medium text-primary">
                          #{post.category}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay posts aún</h3>
            <p className="text-muted-foreground mb-6">
              Sé el primero en compartir contenido tecnológico
            </p>
            <Link href="/create">
              <a className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Crear Post
              </a>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
