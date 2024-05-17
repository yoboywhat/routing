"use client";

// pages/product/[id]/page.tsx
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IProduct } from '@/app/types/types';
import { Button } from "@/components/ui/button";
import { useAppDispatch } from '@/Redux/hooks';
import { addProduct } from '@/Redux/features/cartSlice';
import { db } from '@/db/index';
import { product, product as productSchema } from '@/db/scheme';
import { eq } from 'drizzle-orm/expressions';
import { useEffect, useState } from 'react';
import { getAllProducts } from '@/utils/proData';

interface ProductPageProps {
    product: IProduct | null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const allProducts: IProduct[] = await getAllProducts();
    const product = allProducts.find((product) => product.id === String(params?.id));

    // If product is not found, return a 404 page
    if (!product) {
        return <div>Product not found</div>;
    }

    return { props: { product } };
};

export default function ProductPage({ product }: { product: IProduct }) {

    const dispatch = useAppDispatch();

    const addProductToCart = () => {
        const payload = {
            id: product.id,
            name: product.name,
            img: product.img,
            price: product.price,
            quantity: 1,
        };

        dispatch(addProduct(payload));
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold">{product.name} {product.sale && (<span className="text-red-600">| 15</span>)}</h1>
            <div className="text-green-600 font-medium">{product.stock ? ' Stock' : 'no Stock'}</div>
            <div className="text-sm text-gray-500">15 units</div>

            <div className="my-4">
                <h2 className="text-xl font-bold">Product Details</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                {/* Additional product information */}
            </div>

            <Button onClick={addProductToCart} className="bg-blue-600 text-white w-full sm:w-auto">Add to Cart</Button>
        </div>
    );
};
