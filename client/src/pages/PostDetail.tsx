import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Calendar, User, Download } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import GiscusComments from "@/components/GiscusComments";

export default function PostDetail() {
  const [, params] = useRoute("/post/:id");
  const postId = params?.id ? parseInt(params.id) : 0;

  const { data: postData, isLoading } = trpc.posts.getById.useQuery(
    { id: postId },
    { enabled: postId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Post no encontrado</h2>
            <Link href="/">
              <a>
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al inicio
                </Button>
              </a>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const post = postData;
  const tags = post.tags ? JSON.parse(post.tags as string) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Button */}
        <Link href="/">
          <a>
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </a>
        </Link>

        {/* Post Content */}
        <article className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Post Header */}
            <CardHeader className="space-y-4">
              <div>
                {post.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Usuario #{post.userId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.viewCount} vistas</span>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardHeader>

            {/* Post Image */}
            {post.imageUrl && (
              <div className="px-6">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full rounded-lg object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Post Content */}
            <CardContent className="pt-6">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <Streamdown>{post.content}</Streamdown>
              </div>

              {/* Attachments */}
              {post.attachments && post.attachments.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Archivos Adjuntos</h3>
                  <div className="grid gap-3">
                    {post.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <Download className="h-5 w-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{attachment.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.fileSize
                              ? `${(attachment.fileSize / 1024).toFixed(2)} KB`
                              : "Tamaño desconocido"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments Section with Giscus */}
          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Comentarios</h3>
                <GiscusComments postId={post.id} postTitle={post.title} />
              </CardContent>
            </Card>
          </div>
        </article>
      </main>
    </div>
  );
}
