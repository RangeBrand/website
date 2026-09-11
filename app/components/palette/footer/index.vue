<template>
  <div class="bg-rb-violet-100">
    <div class="container mx-auto px-3 py-2 sm:px-0">
      <div class="flex items-center justify-between">
        <div class="flex gap-x-4">
          <slot name="right" />
        </div>
        <slot />
        <div class="flex gap-x-4">
          <slot name="left" />
        </div>
      </div>
    </div>
  </div>
</template>
