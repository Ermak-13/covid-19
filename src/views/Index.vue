<template>
  <div class="page">
    <dashboard
      class="page__content"
      :covid19Data="covid19Data" />
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Dashboard
  },

  computed: {
    covid19Data() {
      return this.$store.getters.covid19DataWorld;
    },
  }
}
</script>

<style scoped>
</style>
