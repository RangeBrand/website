<script setup lang="ts">
import Action from "./action.vue";

const clipboard = useClipboard();
const toast = useToast();

const emit = defineEmits<{
  close: [];
}>();

const copyUrl = () => {
  clipboard
    .copy(window.location.href)
    .then(() => {
      toast.success({
        message: "کپی شد",
      });
      emit("close");
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};
</script>

<template>
  <Action label="کپی URL" icon="lucide:link" @click="copyUrl" />
</template>
