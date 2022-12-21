<script setup>
const apiUrl = import.meta.env.VITE_BACKEND_URL + "/";

const props = defineProps({
  name: String,
  description: String,
  image: String,
  id: Number,
});
defineEmits(["btn-click", "delete-btn-click"]);
</script>
<template>
  <VCard class="mx-auto my-12" max-width="374">
    <VImg cover maxHeight="250" :src="apiUrl + image" v-if="image" />

    <VCardItem v-if="name">
      <VCardTitle>
        {{ name }}
      </VCardTitle>
    </VCardItem>

    <VCardText v-if="description">
      <div>
        {{ description }}
      </div>
    </VCardText>

    <VDivider class="mx-4 mb-1" />

    <VCardActions>
      <VBtn
        color="deep-purple-lighten-2"
        variant="text"
        @click="$emit('btn-click', id)"
      >
        details
      </VBtn>
      <VBtn color="error" variant="text" @click="$emit('delete-btn-click', id)">
        delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>
