<template>
  <div class="page">
    <div class="page__header">
      <multiselect
        v-model="country"
        :options="$store.getters.countries"
        :close-on-select="true"
        :multiple="false">
      </multiselect>
    </div>

    <dashboard
      class="page__content"
      :covid19Data="covid19Data" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Multiselect,
    Dashboard
  },

  data() {
    return {
      country: 'Belarus'
    }
  },

  computed: {
    covid19Data() {
      return this.$store.getters.getCovid19DataByCountry(this.country);
    },
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.page__header {
  margin-bottom: 25px;
}
</style>
