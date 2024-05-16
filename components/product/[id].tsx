"use client";

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/utils/proData';
import { SelectProduct } from '@/db/scheme';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  img: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sale: boolean;
  stock: number;
  createdAt: number;
}

const Products = () => {
  const [products, setProducts] = useState<SelectProduct[]>([]);
  const [sortBy, setSortBy] = useState<keyof SelectProduct>("name"); // Use setSortBy for changing sortBy state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Use setSortOrder for changing sortOrder state

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const result = await getAllProducts(sortBy, sortOrder);
      setProducts(result);
    }
    fetchData();
  }, [sortBy, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <label className="mr-2">Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as keyof SelectProduct)} className="border p-2">
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="border p-2 ml-2">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product?.id} className="bg-white p-4 rounded-lg shadow relative">
            <img src={product.img} alt={product?.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 bg-gray-100 px-2 py-1 rounded text-sm">
              <a href={`${product?.id}.pdf`} className="text-blue-500">PDF</a>
            </div>
            <h2 className="text-xl font-bold mt-2">{product?.name}</h2>
            <p className="text-gray-700 mt-1">${product?.price.toFixed(2)}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => router.push(`/product/${product?.id}`)}>Details</button> // route 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
