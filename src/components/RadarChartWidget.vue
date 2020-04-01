<template>
  <div class="chart-widget widget">
    <radar-chart
      :chart-data="data"
      :style="{ position: 'relative', }"
    />
  </div>
</template>

<script>
import RadarChart from './RadarChart.vue';

export default {
  name: 'RadarChartWidget',
  components: {
    RadarChart
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
