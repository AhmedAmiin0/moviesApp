<script setup>
import { reactive, ref, watchEffect } from "vue";
// import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import {
  getMovieRequest,
  updateMovieRequest,
} from "@/views/Movies/api/movies.api";
import MoviesForm from "@/views/Movies/components/MoviesForm.vue";
import { useRouter } from "vue-router";
const movie = reactive({
  name: "",
  description: "",
  category_id: "",
  image: "",
});
const valid = ref(false);
const form = ref(null);

const router = useRouter();
const movieId = router.currentRoute.value.params.movieId;
const updateMovie = useApi(updateMovieRequest);
const getMovie = useApi(getMovieRequest);

async function getMovieById() {
  const { data } = await getMovie.request(movieId);
  movie.name = data.message.name;
  movie.description = data.message.description;
  movie.category_id = data.message.category;
  movie.image = data.message.image;
}

getMovieById();
async function handleSubmit(e) {
  try {
    const validate = await form.value.validate();
    if (validate.valid === false) return;
    const formData = new FormData(e.target);
    formData.append("_method", "PUT");
    formData.append("category_id", movie.category_id.id);
    if (movie.image instanceof File) formData.append("image", movie.image);
    const { data } = await updateMovie.request(movieId, formData);
  } catch (err) {
    console.log(err);
  }
}

function getMoviesByCategory() {
  router.push({
    name: "MoviesByCategory",
    params: { category: movie.category_id.id },
  });
}
</script>

<template>
  <VCard class="elevation-12">
    <VForm @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <VToolbar dark color="primary">
        <VToolbarTitle>Edit {{ movie?.name || "" }}</VToolbarTitle>
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
            :loading="updateMovie.loading && updateMovie.loading === true"
            >Save</VBtn
          >
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
  <VBtn @click="getMoviesByCategory" color="primary" style="margin-top: 10"
    >Get movies by category
  </VBtn>
</template>
