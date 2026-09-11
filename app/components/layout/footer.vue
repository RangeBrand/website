<script setup lang="ts">
const socialLinks = [
  {
    title: "ایکس",
    icon: "hugeicons:new-twitter",
    url: "https://x.com/RangeBrand",
  },
  {
    title: "گیتهاب",
    icon: "hugeicons:github",
    url: "https://github.com/RangeBrand",
  },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-rb-violet-100 py-4 text-center">
    <ul class="flex w-full items-center justify-center gap-3 text-sm">
      <li v-for="(link, index) in socialLinks" :key="index">
        <a
          :href="link.url"
          :title="`رنگ برند در ${link.title}`"
          class="link block p-1"
          rb-link-variant="ghost"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon :name="link.icon" size="24" />
        </a>
      </li>
    </ul>
    <p class="text-opacity-70 mt-2 text-lg font-bold text-black">رنگ برند</p>
  </footer>
</template>
