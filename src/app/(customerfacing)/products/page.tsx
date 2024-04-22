import { ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";

const getProducts =  cache(async () => {
    const data = await db.product.findMany({where: {isAvailableForPurchase: true}, orderBy: {name: "asc"}});
    return data
}, ["/products", "getProducts"])

async function ProductPage () {
    const products = await getProducts();
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        { products.map(product => (
        <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
}

export default ProductPage