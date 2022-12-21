export const getAllCategoriesRequest = () => ({
  method: "get",
  url: "/category",
});

export const createCategoryRequest = (category) => ({
  method: "post",
  url: "/category",
  data: category,
});

export const updateCategoryRequest = (id, category) => ({
  method: "post",
  url: `/category/${id}`,
  data: category,
});

export const deleteCategoryRequest = (id) => ({
  method: "delete",
  url: `/category/${id}`,
});

export const getCategoryRequest = (id) => ({
  method: "get",
  url: `/category/${id}`,
});
