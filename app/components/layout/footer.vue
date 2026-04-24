<script setup lang="ts">
const socialLinks = [
  {
    title: "ایکس",
    icon: "streamline-logos:x-twitter-logo-solid",
    url: "https://ط.com/RangeBrand",
  },
  {
    title: "گیتهاب",
    icon: "streamline-logos:github-logo-2-solid",
    url: "https://github.com/RangeBrand",
  },
];
</script>

<template>
  <footer class="bg-rb-violet-100 border-t border-gray-200 text-center py-4">
    <ul class="flex justify-center items-center text-sm w-full gap-3">
      <li v-for="(link, index) in socialLinks" :key="index">
        <a
          :href="link.url"
          :title="`رنگ برند در ${link.title}`"
          class="link p-1 block"
          rb-link-variant="ghost"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon :name="link.icon" size="24" />
        </a>
      </li>
    </ul>
    <p class="text-black text-opacity-70 mt-2 text-lg font-bold">رنگ برند</p>
  </footer>
</template>
