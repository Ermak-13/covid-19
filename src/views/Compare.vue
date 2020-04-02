<template>
  <div class="page">
    <div class="page__header">
      <multiselect
        v-model="countries"
        :options="$store.getters.countries"
        :close-on-select="false"
        :multiple="true">
      </multiselect>
    </div>

    <dashboard
      class="page__content"
      :covid19DataOfCountries="covid19DataOfCountries" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import Dashboard from '@/components/MutliDashboard.vue';

export default {
  name: 'Index',
  components: {
    Multiselect,
    Dashboard
  },

  data() {
    return {
      countries: []
    };
  },

  computed: {
    covid19DataOfCountries() {
      const result = {};
      this.countries.forEach((country) => {
        result[country] = this.$store.getters.getCovid19DataByCountry(country);
      });

      return result;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.page__header {
  margin-bottom: 25px;
}
</style>
