import ProductClient from "@/app/_components/Product/Product";
import ProductItemBox from "@/app/_components/ProductItemBox/ProductItemBox";


export default async function ProductOrCategoryPage(props: {
  params: Promise<{ category: string; product?: string[] }>;
}) {
  const { category, product } = await props.params;


  function formatCategory(category: string) {
    return category
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // 🧭 Example data fetching from your backend or API
  if (!product) {
    // Category-only page
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${category}`);
    const products = await res.json();
    console.log(products)
    return (
      <div>
<div className="container mx-auto mt-5"><h1 className="relative uppercase text-2xl font-bold pt-3 pb-3 capitalize text-gray-700">{formatCategory(category)}
  <div className="absolute w-[100px] h-[3px] bg-orange-400 mt-3 " />
  </h1></div>
         {/* <pre>{JSON.stringify(products, null, 2)}</pre>  */}
<ProductItemBox catList={products} cat={category} />
        
        
      </div>
    );
  }

  // Product detail page
  const productSlug = product[0];
  const slug = product[1]

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${category}/${productSlug}`);
  const singleProduct = await res.json();

  return (
    <div>
      {/* <h1>Product: {singleProduct?.title}</h1>
      <p>{singleProduct?.description}</p> */}
      <ProductClient product={singleProduct} slug={slug} />
    </div>
  );
}
