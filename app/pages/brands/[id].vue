<script setup lang="ts">
import Main from "~/components/layout/main/index.vue";

definePageMeta({
  middleware: "brand-detail-layout",
});

const { params } = useRoute();
const { data } = await useFetch(`/api/brands/${params.id}`);

const brand = computed(() => data.value);

useSeoMeta({
  title: `رنگ‌های ${brand.value?.title} - رنگ برند`,
});
</script>

<template>
  <div
    class="h-[75vh] flex items-center justify-center opacity-40 border-b"
    dir="ltr"
  >
    <code>// TODO: Add Palette Here</code>
  </div>
  <Main v-if="brand" class="text-black text-opacity-80 py-8">
    <h1 class="text-3xl font-bold mt-8 mb-4">
      پالت رنگ‌های رسمی {{ brand.title }} به همراه کدهای RGB و HEX
    </h1>
    <p v-for="paragraph in brand.content" :key="paragraph" class="mb-2">
      {{ paragraph }}
    </p>
    <p class="mb-2">
      در جدول زیر رنگ‌های رسمی برند {{ brand.title }} را مشاهده می‌کنید. برای
      اطمینان از این که متریال تبلیغاتی شما با برند {{ brand.title }} هماهنگ
      باشد، در کارهای خود از این رنگ‌ها استفاده کنید:
    </p>
    <div
      class="my-4 mx-auto max-w-180 h-[428px] flex items-center justify-center opacity-40"
      dir="ltr"
    >
      <code>// TODO: Add Brand Color Table</code>
    </div>
  </Main>
</template>
