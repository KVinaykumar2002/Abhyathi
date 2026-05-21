import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { menuItems } from "@/data/menuData";

export function useProducts(category) {
  const queryCategory =
    category && category !== "All Products" ? category : undefined;

  return useQuery({
    queryKey: ["products", queryCategory ?? "all"],
    queryFn: () => fetchProducts(queryCategory),
    placeholderData: menuItems,
    retry: 1,
  });
}
