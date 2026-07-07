import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

export function BlogSection({
  title,
  subtitle,
  posts = [],
}: BlogSectionProps) {
  const displayTitle = title || "Blog";
  const displaySubtitle = subtitle || "Son Yazılarımız";

  return (
    <section className="py-24 md:py-36 bg-[#efeeeb] overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-20 space-y-4">
          <FadeIn direction="up" duration={0.6}>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              {displayTitle}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
              {displaySubtitle}
            </h2>
          </FadeIn>
        </div>

        {/* Content */}
        {posts && posts.length > 0 ? (
          <div className="space-y-16">
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.slice(0, 3).map((post: BlogPost) => (
                <Link key={post.slug?.current} href={`/blog/${post.slug?.current}`} className="group block">
                  <article className="bg-transparent overflow-hidden h-full flex flex-col justify-between rounded-none shadow-none border-0 transition-all duration-300 group-hover:-translate-y-1">
                    
                    {post.mainImage && (
                      <div className="relative aspect-video overflow-hidden bg-background border-b border-border/30">
                        <SanityImage
                          image={post.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    
                    <div className="pt-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        {/* Meta Tags */}
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className="text-[8px] font-semibold tracking-widest bg-background text-foreground border border-border/40 px-2 py-0.5 uppercase rounded-none">
                              {post.category.title}
                            </span>
                          )}
                          {post.publishedAt && (
                            <time className="text-[10px] tracking-wider text-muted-foreground uppercase font-medium">
                              {formatDate(post.publishedAt)}
                            </time>
                          )}
                        </div>
                        
                        <h3 className="font-serif text-lg text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="font-sans text-xs text-foreground/75 leading-relaxed line-clamp-3 mt-3">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      
                      <div className="pt-2 flex items-center gap-2.5">
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#111111] uppercase block group-hover:opacity-80 transition-opacity">
                          Devamını Oku
                        </span>
                        <span className="text-[#111111] group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </AnimateGroup>
            
            {/* Minimal Underlined Trigger Button */}
            <FadeIn delay={0.2} className="text-center pt-4">
              <Button 
                variant="outline" 
                size="lg" 
                render={<Link href="/blog" />}
                className="bg-transparent border-black hover:bg-black hover:text-white text-black rounded-none px-8 py-4 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              >
                Tüm Blog Yazılarını Gör
              </Button>
            </FadeIn>
          </div>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground font-sans text-sm text-center py-12">Henüz eklenmiş bir blog yazısı bulunmuyor.</p>
          </FadeIn>
        )}

      </div>

      {/* Editorial geometric lines */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
