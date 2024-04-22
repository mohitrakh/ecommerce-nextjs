import db from "@/db/db";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../new/_components/ProductForm";

export default async function EditProductPage ({params : {id}} : {
    params : {id: string}
}) {
    const product = await db.product.findUnique({where : {
        id
    }})
    return <>
    <PageHeader>Add Products</PageHeader>
    <ProductForm product={product} />
    </>
}