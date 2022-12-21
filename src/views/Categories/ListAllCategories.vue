<template>
  <VContainer>
    <VBtn :to="{ name: 'CreateCategory' }" color="success">
      Create Category
    </VBtn>
    <VRow>
      <VCol v-for="category in categories" :key="category.id" cols="12" md="4">
        <CategoryCard
          :name="category.name"
          :id="category.id"
          @btn-click="handleBtnClick"
          @delete-btn-click="handleDeleteBtnClick"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import useApi from "@/hooks/useApi";
import { useRouter } from "vue-router";
import {
  deleteCategoryRequest,
  getAllCategoriesRequest,
} from "@/views/Categories/api/categories.api";
import CategoryCard from "@/components/Card.vue";
const categories = ref([]);
const getAllCategories = useApi(getAllCategoriesRequest);
const deleteCategory = useApi(deleteCategoryRequest);

const router = useRouter();
watchEffect(async () => {
  const response = await getAllCategories.request();
  categories.value = response.data.message;
  return () => {
    categories.value = [];
    getAllCategories.abort();
  };
});
const handleBtnClick = (id) => {
  router.push({ name: "EditCategory", params: { categoryId: id } });
};
async function handleDeleteBtnClick(id) {
  await deleteCategory.request(id);
  categories.value = categories.value.filter((category) => category.id !== id);
}
</script>
