<script setup>
import { ref, watchEffect } from "vue";
import useApi from "@/hooks/useApi";
import { useRouter } from "vue-router";
import MoviesCard from "@/components/Card.vue";
import {
  deleteMovieRequest,
  getAllMoviesByCategoryRequest,
  getAllMoviesRequest,
} from "../api/movies.api";

const props = defineProps({
  getAllMoviesByCategory: {
    type: Boolean,
    default: false,
  },
});
const movies = ref([]);
const getMoviesRequest = useApi(
  props.getAllMoviesByCategory
    ? getAllMoviesByCategoryRequest
    : getAllMoviesRequest
);
const deleteMovie = useApi(deleteMovieRequest);
const router = useRouter();
const category = router.currentRoute.value.params.category;

watchEffect(async () => {
  const response = await getMoviesRequest.request(
    props.getAllMoviesByCategory ? category : null
  );
  movies.value = response.data.message;
  return () => {
    movies.value = [];
    getMoviesRequest.abort();
  };
});

const handleBtnClick = (id) => {
  router.push({ name: "EditMovie", params: { movieId: id } });
};
async function handleDeleteBtnClick(id) {
  await deleteMovie.request(id);
  movies.value = movies.value.filter((movie) => movie.id !== id);
}
</script>
<template>
  <VContainer>
    <VBtn :to="{ name: 'CreateMovie' }" color="success"> Create Movie </VBtn>
    <VRow>
      <VCol v-for="movie in movies" :key="movie.id" cols="12" md="4">
        <MoviesCard
          :name="movie.title"
          :description="movie.description"
          :image="movie.image"
          :id="movie.id"
          @btn-click="handleBtnClick"
          @delete-btn-click="handleDeleteBtnClick"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
