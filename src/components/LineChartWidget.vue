<template>
  <div class="chart-widget widget">
    <line-chart
      :chart-data="data"
      :style="{ position: 'relative', }"
      :options="$options.CONFIG.options"
    />
  </div>
</template>

<script>
import {
  config
} from '@/utils.js';
import LineChart from './LineChart.vue';

export default {
  name: 'LineChartWidget',
  components: {
    LineChart
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  CONFIG: {
    options: config('line_chart', 'options')
  }
}
</script>

<style>
</style>
