"use client";
import { addProducts, updateProducts } from "@/app/admin/_actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";

const ProductForm = ({product} : {product? : Product | null}) => {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

  const [error, action] = useFormState( product == null ?  addProducts : updateProducts.bind(null, product.id), {}) // todo understand



  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" defaultValue={product?.name || ""}  />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price in cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          defaultValue={product?.name || ""}
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />

        <div className="">
            {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
          
        <Textarea id="description" name="description" defaultValue={product?.description || ""}  />
        {error.description && <div className="text-destructive">{error.description}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="file">file</Label>
        <Input type="file" id="file" name="file" required={product == null}  />
        {product !== null && <div className="text-muted-foreground">{product?.filePath}</div> }
        {error.file && <div className="text-destructive">{error.file}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null}  />
        {product !== null && (
          <Image src={product?.imagePath || ""} height={"400"} width={"400"} alt="product image" />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}

      </div>
      <SubmitButton />
    </form>
  );
};

export default ProductForm;


function SubmitButton () {

  const {pending} = useFormStatus()

    return  <Button type="submit" disabled={pending} >
      {
        pending ? "Saving..." : "Save"
      }
    </Button>
}