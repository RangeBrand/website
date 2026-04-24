<template>
  <div class="bg-rb-violet-100">
    <div class="container mx-auto py-2 px-3 sm:px-0">
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
