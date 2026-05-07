/**
 * Utility to provide a fallback image if the database does not have an image_url.
 */

interface ProductImageParams {
  category?: string;
  color?: string;
  name?: string;
  image_url?: string | null;
}

export const getProductImage = (product: ProductImageParams): string => {
  if (!product) return '/placeholder.jpg'; // or any local static placeholder

  // Prioritize the specific database image_url if provided
  if (product.image_url) {
    return product.image_url;
  }

  // If no image is set in Supabase, return a generic placeholder
  return 'https://placehold.co/800x600/f3f4f6/a1a1aa?text=No+Image';
};
