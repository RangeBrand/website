<script setup lang="ts">
import Palette from "~/components/palette/index.vue";
import Main from "~/components/layout/main/index.vue";
import ColorTable from "~/components/brand/colorTable.vue";

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
  <Palette class="h-[75vh]!" v-if="brand" :colors="brand.colors" />
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
    <ColorTable :colors="brand.colors" class="my-4 mx-auto max-w-180 w-full" />
  </Main>
</template>
