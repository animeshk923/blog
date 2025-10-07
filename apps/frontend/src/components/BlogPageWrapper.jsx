import { useParams } from "react-router-dom";
import BlogPage from "./BlogPage";

export default function BlogPageWrapper() {
  const { slug } = useParams();
  const blogPath = `/blogs/${slug}.md`;
  return <BlogPage blogPath={blogPath} />;
}