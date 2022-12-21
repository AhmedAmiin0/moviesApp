<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import {
  getCategoryRequest,
  updateCategoryRequest,
} from "./api/categories.api";
import CategoriesForm from "@/views/Categories/components/CategoriesForm.vue";
const valid = ref(false);
const router = useRouter();

const category = reactive({ name: "" });
const categoryId = router.currentRoute.value.params.categoryId;
const getCategory = useApi(getCategoryRequest);
const updateCategory = useApi(updateCategoryRequest);

watchEffect(async () => {
  const response = await getCategory.request(categoryId);
  category.name = response.data.message.name;
  return () => {
    category.name = "";
    getCategory.abort();
  };
});

const handleSubmit = async (e) => {
  try {
    const validate = await form.value.validate();
    if (validate.valid === false) return;
    const formData = new FormData(e.target);
    formData.append("_method", "PUT");
    const res = await updateCategory.request(categoryId, formData);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <VCard class="elevation-12">
    <VForm
      lazy-validation
      @submit.prevent="handleSubmit"
      v-model="valid"
      ref="form"
    >
      <VToolbar dark color="primary">
        <VToolbarTitle>Edit Category</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <CategoriesForm
          :category="category"
          @nameChange="(value) => (category.name = value)"
        />
        <VCardActions>
          <VSpacer />
          <VBtn
            color="primary"
            type="submit"
            :loading="
              (updateCategory.loading && updateCategory.loading === true) ||
              (getCategory.loading && getCategory.loading === true)
            "
          >
            Save
          </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
