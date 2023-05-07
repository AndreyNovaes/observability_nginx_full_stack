import apiClient from "./axiosClient";

export const getCategories = async () => {
  const response = await apiClient.get("/categories");
  const { categories } = response.data;
  return categories;
};

export const getWebsites = async () => {
  const response = await apiClient.get("/websites");
  const { websites } = response.data;
  return websites;
};

interface SearchParams {
  category: string;
  website: string;
  searchValue: string;
  page?: number;
  limit?: number;
}

interface SearchParams {
  category: string;
  website: string;
  searchValue: string;
  page?: number;
  limit?: number;
}

export const getSearch = async (searchParams: SearchParams) => {
  try {
    const { category, website, searchValue, page, limit } = searchParams;

    const params: Record<string, string | number> = {};

    if (category && category !== "Todos") {
      params.category = category;
    }

    if (website && website !== "Todos") {
      params.website = website;
    }

    if (searchValue) {
      params.search = searchValue;
    }

    if (page) {
      params.page = page;
    }

    if (limit) {
      params.limit = limit;
    }

    const response = await apiClient.get("/search", { params });
    const { products } = response.data;

    return products;
  } catch (error) {
    console.error("Error fetching search data:", error);
    throw error;
  }
};
