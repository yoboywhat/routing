export const getProductById = async (productId: string): Promise<SelectProduct | null> => {
  try {
    const allProducts = await db.select().from(product);
    const productData = allProducts.find(product => product.id === productId);

    if (productData) {
      return productData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};
