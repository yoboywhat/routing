import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductById } from '@/utils/proData';
import { SelectProduct } from '@/db/scheme';

const ProductoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<SelectProduct | null>(null);;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Convierte id a un string si es un array de strings
        const productId = Array.isArray(id) ? id[0] : id;
        const productData = await getProductById(productId);
        if (productData !== null) {
          setProduct(productData);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1> Product </h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductoPage;
