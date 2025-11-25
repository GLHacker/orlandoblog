import { useEffect, useRef } from "react";

interface GiscusCommentsProps {
  postId: number;
  postTitle: string;
}

export default function GiscusComments({ postId, postTitle }: GiscusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // Clear any existing giscus instance
    commentsRef.current.innerHTML = "";

    // Create script element
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "[ENTER REPO HERE]"); // Usuario debe configurar
    script.setAttribute("data-repo-id", "[ENTER REPO ID HERE]"); // Usuario debe configurar
    script.setAttribute("data-category", "General"); // Usuario puede cambiar
    script.setAttribute("data-category-id", "[ENTER CATEGORY ID HERE]"); // Usuario debe configurar
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", `post-${postId}-${postTitle}`);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "es");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = "";
      }
    };
  }, [postId, postTitle]);

  return (
    <div className="giscus-comments">
      <div ref={commentsRef} />
    </div>
  );
}
