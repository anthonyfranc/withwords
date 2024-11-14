<template>
  <UMain>
    <NuxtLoadingIndicator color="#00d266" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :ui="{ strategy: 'override', position: 'top-0 right-0' }" />
    <UModals />
  </UMain>
</template>