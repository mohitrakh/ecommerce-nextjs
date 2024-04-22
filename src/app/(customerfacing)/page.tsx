import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const getPopularProducts = cache(() => {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  })
}, ["/", "getPopularProducts"], {revalidate: 60 * 60 * 24})


const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {createdAt: "desc"},
    take: 6
  })
}, ["/", "getNewestProducts"])

export default function Home() {
  return (
   <main className="space-y-12">
    <ProductGridSection title={"Most Popular"} productsFetcher={getPopularProducts} />
    <ProductGridSection productsFetcher={getNewestProducts} title={"Newest Products"} />
   </main>
  );
}


type ProductGridSectionProps = {
  title: String,
  productsFetcher: () => Promise<Product[]>
}

async function ProductGridSection ({
  productsFetcher,
  title
}: ProductGridSectionProps){
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button variant={"outline"} asChild>
          <Link href={"/products"} className="space-x-2" >
            <span>
              View All
              </span>
              <ArrowRight className="size-4" />
               </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {(await productsFetcher()).map(product => (

        <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
