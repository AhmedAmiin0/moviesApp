<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import { createCategoryRequest } from "./api/categories.api";
import CategoriesForm from "@/views/Categories/components/CategoriesForm.vue";
const valid = ref(false);

const category = reactive({
  name: "",
});
const createCategory = useApi(createCategoryRequest);
const router = useRouter();
const handleSubmit = async () => {
  try {
    const validate = await form.value.validate();
    if (validate.valid === false) return;
    const res = await createCategory.request(category);
    console.log(res);
    router.push({ name: "Categories" });
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
        <VToolbarTitle>Add New Category</VToolbarTitle>
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
            :loading="createCategory.loading && createCategory.loading === true"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
