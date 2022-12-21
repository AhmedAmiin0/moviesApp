<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: false,
    default: () => ({
      name: "",
    }),
  },
});
const emit = defineEmits(["nameChange"]);

function validateName() {
  if (props?.category?.name === "") {
    return "Name is required";
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
    :value="props?.category?.name"
    @input="(e) => $emit('nameChange', e.target.value)"
    :rules="[validateName]"
  />
</template>
