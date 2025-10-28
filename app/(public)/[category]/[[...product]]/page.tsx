import ProductClient from "@/app/_components/Product/Product";


export default async function ProductOrCategoryPage(props: {
  params: Promise<{ category: string; product?: string[] }>;
}) {
  const { category, product } = await props.params;

  // 🧭 Example data fetching from your backend or API
  if (!product) {
    // Category-only page
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${category}`);
    const products = await res.json();

    return (
      <div>
        <h1>Category: {category}</h1>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
    );
  }

  // Product detail page
  const productSlug = product.join("/");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${category}/${productSlug}`);
  const singleProduct = await res.json();

  return (
    <div>
      {/* <h1>Product: {singleProduct?.title}</h1>
      <p>{singleProduct?.description}</p> */}
      <ProductClient product={singleProduct} />
    </div>
  );
}
