<script setup lang="ts">
import ColorInput from "~/components/layout/colorInput.vue"
import Result from "~/components/contrast/result.vue"

import { CONTRAST_RESULT_ITEMS, CONTRAST_STANDARD_STARS } from "~/consts/contrast"
import { parseContrastQuery, serializeContrastColors } from "~/utils/contrastQuery"
import { paletteQueryString } from "~/utils/paletteQuery"
import { CONTRAST_DESCRIPTION } from "#shared/seo"
import { getContrastStandard, getContrastValue } from "#shared/utils/contrast"

const route = useRoute()
const router = useRouter()

const fromQuery = computed(() => parseContrastQuery(route.query.colors))

const textHex = ref(fromQuery.value.text)
const backgroundHex = ref(fromQuery.value.background)

watch(
  fromQuery,
  (next) => {
    if (
      serializeContrastColors({ text: textHex.value, background: backgroundHex.value }) ===
      serializeContrastColors(next)
    ) {
      return
    }
    textHex.value = next.text
    backgroundHex.value = next.background
  },
  { immediate: true },
)

watch([textHex, backgroundHex], ([text, background]) => {
  if (!import.meta.client) return
  const next = serializeContrastColors({ text, background })
  if (next === paletteQueryString(route.query.colors)) return
  void router.replace({
    path: "/contrast-checker",
    query: { ...route.query, colors: next },
  })
})

const contrast = computed(() => getContrastValue(backgroundHex.value, textHex.value))

const results = computed(() =>
  CONTRAST_RESULT_ITEMS.map((item) => {
    const standard = getContrastStandard(contrast.value, item.id)
    return {
      ...item,
      standard,
      stars: CONTRAST_STANDARD_STARS[standard],
    }
  }),
)

useSeoMeta({
  title: "محاسبه کنتراست رنگ‌ها",
  description: CONTRAST_DESCRIPTION,
  ogDescription: CONTRAST_DESCRIPTION,
})
</script>

<template>
  <div class="text-black/80">
    <div class="row mb-8">
      <div class="col w-full sm:w-1/2 sm:pe-4">
        <ColorInput v-model="backgroundHex" label="رنگ زمینه" name="background-color" />
      </div>
      <div class="col w-full sm:w-1/2 sm:ps-4">
        <ColorInput v-model="textHex" label="رنگ متن" name="text-color" />
      </div>
    </div>
    <div class="rounded-lg bg-rb-violet-100 px-4 py-4">
      <div
        class="-mt-8 cursor-default rounded-lg p-8 transition-colors"
        :style="{ backgroundColor: backgroundHex, color: textHex }"
      >
        <h1 class="mb-4 text-2xl font-bold">محاسبه‌ی کنتراست رنگ‌ها</h1>
        <p class="mb-4">
          ابزار محاسبه کننده‌ی کنتراست رنگ‌های رنگ برند، از قوانین دسترسی‌پذیری محتوای وب (WCAG) که
          مجموعه‌ای از پیشنهادات برای تبدیل وب به مکانی با دسترسی‌پذیری بیشتر است پیروی می‌کند.
        </p>
        <p class="mb-4">
          بنابر WCAG، دو استاندارد برای سطح کنتراست بین رنگ‌ها تعریف شده است: AA (حداقل کنتراست) و
          AAA ( کنتراست بهبودیافته).
          <br />
          سطح AA به نسبت کنتراست حداقل 4.5:1 برای نوشته‌های معمولی و 3:1 برای نوشته‌های بزرگ و یا
          توپر نیاز دارد.
          <br />
          سطح AAA نیز به نسبت کنتراست حداقل 7:1 برای نوشته‌های معمولی و 4.5:1 برای نوشته‌های بزرگ و
          یا توپر نیاز دارد.
        </p>
        <p class="cursor-text" contenteditable="true">
          شما می‌توانید با کلیک کردن بر روی این نوشته، متن را ویرایش کنید.
        </p>
      </div>
    </div>
    <div class="row mt-8 gap-y-4">
      <div v-for="result in results" :key="result.id" class="col w-full sm:w-1/3 sm:px-2">
        <Result :label="result.label" :standard="result.standard" :stars="result.stars" />
      </div>
    </div>
  </div>
</template>
