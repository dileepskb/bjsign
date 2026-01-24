import BreadcrumbsNested from "@/components/Breadcrumbsnested/Breadcrumbsnested";
import Image from "next/image";
import Link from "next/link";
export default async function SingleBlog({ params }: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  const blogs = await res.json();

  const blog = blogs.find((b: any) => b.slug === params.slug);

  return (
    <>    <div className="bg-gray-200 pt-3 pb-1">
        <div className="container mx-auto">
    <BreadcrumbsNested
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: `/blog` },
              { label: blog.title, href: `/blog/${blog.slug}` },
            ]}
          />
          </div>
         </div>
    <div className="bg-gray-100 pt-2">
      <section>
        <div className="container mx-auto ">
            <div className="bg-gray-200">
          
          </div>
          <div className="flex">
            <div className="w-3/4">
              <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
              <div className="relative h-[600px] w-full mb-3 rounded overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="flex items-center gap-x-4 text-sm">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-black hover:bg-gray-100"
                >
                  Marketing
                </Link>
              </div>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            <div className="w-1/4">category</div>
          </div>
        </div>
      </section>
    </div>
   </>

  );
}
