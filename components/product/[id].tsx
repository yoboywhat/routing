import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IProduct } from '@/app/types/types';
import { Button } from "@/components/ui/button";
import { useAppDispatch } from '@/Redux/hooks';
import { addProduct } from '@/Redux/features/cartSlice';
import { db } from '@/db/index';
import { product as productSchema } from '@/db/scheme';
import { eq } from 'drizzle-orm/expressions';

interface ProductPageProps {
    product: IProduct;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
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
            <h1 className="text-3xl font-bold">{product.name} {product.sale && (<span className="text-red-600">| 15 %</span>)}</h1>
            <div className="text-green-600 font-medium">{product.stock ? ' Stock' : 'No Stock'}</div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as Params;
    const numericId = Number(id);

    // Fetch product data from the database using the correct method
    const [product] = await db.select().from(productSchema).where(eq(productSchema.id, numericId));

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
    };
};
