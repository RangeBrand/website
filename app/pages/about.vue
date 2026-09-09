<script setup lang="ts">
import { SITE_DESCRIPTION } from "#shared/seo";

useSeoMeta({
  title: "درباره‌ی ما",
  description: SITE_DESCRIPTION,
  ogDescription: SITE_DESCRIPTION,
});
</script>

<template>
  <article class="text-black/80">
    <h1 class="my-4 text-3xl font-bold text-rb-violet-500">درباره‌ی ما</h1>
    <hr class="my-4 border-0 border-t border-gray-200" />
    <p class="mb-4">
      رنگ برند ابزاری برای مطالعه و انتخاب رنگ مناسب برای برندها است.
    </p>
    <p class="mb-4">
      رنگ برند را توسط <strong>جاوید ایزدفر</strong> به کمک
      <strong>ستاره کریمی</strong> و <strong>مهرنوش دشتی</strong> به عنوان یک
      پروژه‌ی متن باز در سال ۱۳۹۵
      <a
        href="https://github.com/IKAcc/RangeBrand"
        title="شروع پروژه‌ی رنگ برند در گیتهاب"
        rel="noreferrer noopener"
        class="link"
      >شروع شد</a>.
      همکنون نیز همچنان نگه‌داری از وبسایت و بروزرسانی داده‌ها به صورت مشارکتی
      و از طریق
      <a
        href="https://github.com/RangeBrand"
        title="رنگ برند در گیتهاب"
        rel="noreferrer noopener"
        class="link"
      >گیتهاب</a>
      انجام می‌شود.
    </p>
    <p class="mb-4">
      در حال حاضر، خدمتی که رنگ برند به کاربران خود ارائه می‌دهد،
      <NuxtLink to="/brands/" title="مشاهده‌ی لیست برندهای مطرح در ایران" class="link">
        لیستی از برندهای مطرح در ایران
      </NuxtLink>
      به همراه رنگ‌های رسمی آ‌ن‌هاست. به کمک این لیست می‌توان به عنوان مثال،
      رنگ‌های رسمی شبکه‌های اجتماعی را به سرعت پیدا کرد و در پروژه‌ها استفاده
      کرد.
    </p>
  </article>
</template>
