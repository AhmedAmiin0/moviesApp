<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import { createMovieRequest } from "@/views/Movies/api/movies.api";
import MoviesForm from "@/views/Movies/components/MoviesForm.vue";
const movie = reactive({
  name: "",
  description: "",
  category_id: "",
  image: "",
});
const valid = ref(false);
const form = ref(null);

const router = useRouter();

const { request } = useApi(createMovieRequest);
// console .log movie when it changes
watchEffect(() => {
  console.log(movie);
});
async function handleSubmit(e) {
  try {
    const validate = await form.value.validate()
    if (validate.valid === false) return;

    const formData = new FormData(e.target);
    formData.append("category_id", movie.category_id.id);

    const { data } = await request(formData);
    router.push({
      name: "Movies",
    });
  } catch (err) {
    console.log(err);
  }
}
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
        <VToolbarTitle>Add New Movie</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <MoviesForm
          :movie="movie"
          @nameChange="(value) => (movie.name = value)"
          @descriptionChange="(value) => (movie.description = value)"
          @categoryChange="(value) => (movie.category_id = value)"
          @imageChange="(value) => (movie.image = value)"
        />
        <VCardActions>
          <VSpacer />
          <VBtn
            color="primary"
            type="submit"
            :loading="createMovieRequest.loading"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
