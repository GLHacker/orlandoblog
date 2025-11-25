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
    script.setAttribute("data-repo", "GLHacker/orlandoblog" );
    script.setAttribute("data-repo-id", "R_kgDOQcdwHw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQcdwH84Cy-pS");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
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
