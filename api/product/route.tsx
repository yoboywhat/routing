import { getProductById } from "@/utils/proData";

export default async function handler(req: any, res: any) {
    const { id } = req.query;

    try {
        if (!id) {
            // If id is not provided in the request, return a bad request response
            return res.status(400).json({ error: 'ID parameter is missing' });
        }

        // Fetch the product data using the getProductById function
        const product = await getProductById(id);

        if (product) {
            // If product is found, send it as the API response
            return res.status(200).json(product);
        } else {
            // If product is not found, send a not found response
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        // If an error occurs, send a server error response
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
