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

export const sendPublishMessageRequest = async (message: string) => {
  try {
    await apiClient.post("/publish-message", { message });
  } catch (error) {
    console.error("Error sending publish message request:", error);
  }
};

interface Product {
  id: string;
  description: string;
  category: string;
  price: number;
  image: string;
  link: string;
  website: string;
  score: number;
}

interface SearchParams {
  category: string;
  website: string;
  searchValue: string;
  page?: number;
  limit?: number; 
}

// modular and reusable code
export const getSearch = async (searchParams: SearchParams) => {
  try {
    const message = `Search performed with parameters: ${JSON.stringify(searchParams)}`;
    sendPublishMessageRequest(message).catch(error => {
      console.error("Error sending publish message request:", error);
    });

    const keys = Object.keys(localStorage);
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

    let products = response.data.products;    

    products.data.forEach((product: Product) => {
      product.score = 0;
      const words = product.description.split(' ');

      [...words, product.category].forEach(word => {
        if (keys.includes(word)) {
          product.score += parseInt(localStorage.getItem(word) || '0');
        }
      });
    });

    let sortedProducts = products.data.sort((a: Product, b: Product) => b.score - a.score);
    return { total: products.total, data: sortedProducts };
  } catch (error) {
    console.error("Error fetching search data:", error);
    throw error;
  }
};
