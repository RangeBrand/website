<script setup lang="ts">
import Logo from "@/components/layout/header/logo.vue";

const { isMobile } = useDevice();

const links: {
  to: string;
  label: string;
}[] = [
  {
    to: "/brands/",
    label: "برندها",
  },
  {
    to: "/colors/",
    label: "رنگ‌ها",
  },
  {
    to: "/about/",
    label: "درباره ما",
  },
];
</script>

<template>
  <div class="relative overflow-hidden bg-rb-violet-100 text-rb-violet-900">
    <NuxtImg
      src="/aare.svg"
      alt="banner"
      class="absolute top-0 left-0 md:h-screen max-w-full md:max-w-3/4 2xl:max-w-full -translate-y-1/5 -scale-x-140 scale-y-140"
      role="presentation"
    />
    <div
      class="p-2 md:p-16 row gap-8 content-end md:content-between min-h-screen relative z-10"
    >
      <div class="w-full mt-4">
        <Logo no-link img-class="md:size-12 size-14" />
        <ul v-if="!isMobile" class="no-list py-4">
          <li v-for="link in links" :key="link.to" class="p-1">
            <NuxtLink
              :to="link.to"
              :title="`دیدن ${link.label}`"
              class="link inline-block"
              rb-link-variant="ghost"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="col gap-8 w-full md:w-1/3">
        <h1 class="block text-6xl md:text-9xl font-black">رنگـ‌برند</h1>
        <p class="text-lg md:text-2xl leading-9">
          لیستی از رنگ‌هایی که دور و بر خودمون توی ایران میبینیم. شاید این
          رنگ‌ها بتونن کمکمون کنن تا برای برندمون
          <NuxtLink to="/colors/" title="دیدن رنگ‌ها" class="link">
            رنگ بهتری انتخاب کنیم
          </NuxtLink>
        </p>
        <div class="row items-center gap-4">
          <NuxtLink
            class="btn"
            rb-btn-size="lg"
            to="/brands/"
            title="دیدن برند‌ها"
          >
            <span>
              <template v-if="!isMobile"> دیدن </template>
              برند‌ها
            </span>
          </NuxtLink>
          <NuxtLink
            href="https://github.com/RangeBrand"
            class="link text-lg text-center"
            rb-link-variant="ghost"
            target="_blank"
            title="سورس رنگ‌برند در گیتهاب"
            rel="help"
          >
            <template v-if="!isMobile">یا شاید دوست داشته باشید</template>
            توی گیتهاب بهمون کمک کنین
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
