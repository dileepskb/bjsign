
import BreadcrumbsNested from "@/components/Breadcrumbsnested/Breadcrumbsnested";
import Image from "next/image";
import Link from "next/link";
export default async function BlogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  const blogs = await res.json();

  return (
    <>
      <section className="container mx-auto flex justify-center">
            <Image src={'/images/blog-typographic-header-concept_277904-6681.jpg'} alt="BJ Sign World Blog" width={'800'} height={'500'} />
        </section>
    <div className=" pt-0 pb-8">
      
      <section>
        <div className="container mx-auto ">
         {/* <BreadcrumbsNested
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: `/blog` },
            ]}
          /> */}

          {/* <H1>Blogs</H1> */}
          <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.map((blog: any) => (
              // <a key={blog.id} href={`/blog/${blog.slug}`} className="">
              //   <h2 className="text-xl font-semibold">{blog.title}</h2>
              //   <p>{blog.excerpt}</p>
              // </a>
              <article className="flex max-w-xl flex-col items-start justify-between border p-3 rounded bg-gray-50">
                <Link href={`/blog/${blog.slug}`}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={400}
                    className="rounded mb-3"
                  />
                </Link>
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
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${blog.slug}`}>
                      <span className="absolute inset-0"></span>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    <p>{blog.excerpt}</p>
                  </p>
                </div>
                {/* <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Michael Foster
                      </a>
                    </p>
                    <p className="text-gray-600">Co-Founder / CTO</p>
                  </div>
                </div> */}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
