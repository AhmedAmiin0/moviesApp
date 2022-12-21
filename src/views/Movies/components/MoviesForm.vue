<script setup>
import useApi from "@/hooks/useApi";
import { getAllCategoriesRequest } from "@/views/Categories/api/categories.api";
import { ref, watchEffect } from "vue";
const props = defineProps({
  movie: {
    type: Object,
    required: false,
    default: () => ({
      name: "",
      description: "",
      category_id: "",
      image: "",
    }),
  },
});
const emit = defineEmits([
  "nameChange",
  "descriptionChange",
  "categoryChange",
  "imageChange",
  "handleFormSubmit",
]);

const items = ref([]);

const { request, loading } = useApi(getAllCategoriesRequest);
watchEffect(async () => {
  const { data } = await request();
  items.value = data.message;
});
function validateName() {
  if (props?.movie?.name === "") {
    return "Name is required";
  }
  return true;
}
function validateDescription() {
  if (props?.movie?.description === "") {
    return "Description is required";
  }
  return true;
}
function validateCategory() {
  if (
    !props.movie.category_id ||
    props.movie.category_id === "" ||
    props.movie.category_id === null
  ) {
    return "Category is required";
  }
  return true;
}
function validateImage() {
  if (props.movie.image === "") {
    return "Image is required";
  }
  if (props.image instanceof File) {
    if (
      props?.movie?.image?.type !== "image/jpeg" &&
      props?.movie?.image?.type !== "image/png"
    ) {
      return "Image must be a jpeg or png";
    }
    if (props?.movie?.image?.size > 1000000) {
      return "Image must be less than 1MB";
    }
  }
  return true;
}
</script>
<template>
  <VTextField
    id="name"
    prepend-icon="mdi-human-greeting"
    name="name"
    label="Name"
    type="text"
    :value="props?.movie?.name || ''"
    @input="(e) => $emit('nameChange', e.target.value)"
    :rules="[validateName]"
  />
  <VTextarea
    id="description"
    name="description"
    label="Description"
    prepend-icon="mdi-book"
    :value="props.movie.description"
    @input="(e) => $emit('descriptionChange', e.target.value)"
    :rules="[validateDescription]"
  />
  <VAutocomplete
    id="category_id"
    name="category_id"
    label="Category"
    :items="items"
    prepend-icon="mdi-package-variant"
    @update:model-value="(e) => $emit('categoryChange', e)"
    :value="props.movie.category_id.name"
    item-title="name"
    :item-value="(item) => item"
    :rules="[validateCategory]"
    :loading="loading"
  />
  <VFileInput
    id="image"
    name="image"
    label="Image"
    @change="(e) => $emit('imageChange', e.target.files[0])"
    :rules="[validateImage]"
  />
</template>
