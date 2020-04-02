<template>
  <div class="dashboard" v-if="selectedData">
    <number-widget
      v-for="(widget, i) in $options.CONFIG.dashboard.numbers"
      :key="i"
      :class="getNumberWidgetClassName(widget)"
      :style="getNumberWidgetStyles(widget)"
      :title="widget.title"
      :value="lastCovid19Data[widget.key]"
      :delta="getNumberWidgetDelta(widget)"
      :date="lastCovid19Data.date"
    />

    <line-chart-widget
      class="dashboard__line-chart"
      :data="lineChartData"
    />

    <radar-chart-widget
      class="dashboard__radar-chart"
      :data="radarChartData"
    />
  </div>
  <div v-else>
    Please select few countries.
  </div>
</template>

<script>
import {
  config,
  multiCovidLineChartData,
  multiCovidRadarChartData
} from '@/utils.js';

import NumberWidget from '@/components/NumberWidget.vue';
import LineChartWidget from '@/components/LineChartWidget.vue';
import RadarChartWidget from '@/components/RadarChartWidget.vue';

export default {
  name: 'MutliDashboard',

  components: {
    NumberWidget,
    LineChartWidget,
    RadarChartWidget
  },

  props: {
    covid19Data: {
      type: Array,
      required: false
    },
    covid19DataOfCountries: {
      type: Object,
      required: true
    }
  },

  CONFIG: {
    dashboard: {
      numbers: config('covid_metrics').map(metric => config(metric)),
    }
  },

  computed: {
    selectedData() {
      return Object.keys(this.covid19DataOfCountries).length > 0;
    },

    lastCovid19Data() {
      const result = {};

      config('covid_metrics').forEach(metric => result[metric] = 0);
      Object.entries(this.covid19DataOfCountries).forEach(([, covid19Data]) => {
        config('covid_metrics').forEach((metric) => {
          result[metric] = result[metric] + covid19Data[covid19Data.length - 1][metric];
        });
        result.date = covid19Data[covid19Data.length - 1].date;
      });

      return result;
    },

    lineChartData() {
      return multiCovidLineChartData(this.covid19DataOfCountries);
    },

    radarChartData() {
      return multiCovidRadarChartData(this.covid19DataOfCountries);
    }
  },

  methods: {
    getNumberWidgetClassName(widget) {
      return `dashboard__${widget.key}`;
    },

    getNumberWidgetStyles(widget) {
      return {
        borderColor: config(widget.key, 'borderColor'),
        backgroundColor: config(widget.key, 'backgroundColor'),
        color: config(widget.key, 'color')
      };
    },

    getNumberWidgetDelta(widget) {
      let result = 0;
      Object.entries(this.covid19DataOfCountries).forEach(([, covid19Data]) => {
        result += covid19Data[covid19Data.length - 1][widget.key] - covid19Data[covid19Data.length - 2][widget.key];
      });

      return result;
    }
  }
}
</script>

<style scoped>

.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    'confirmed-number confirmed-number confirmed-number deaths-number deaths-number deaths-number recovered-number recovered-number recovered-number active-number active-number active-number'
    'radar-chart radar-chart radar-chart radar-chart . . . . . . . .'
    'line-chart line-chart line-chart line-chart line-chart line-chart line-chart line-chart line-chart line-chart line-chart line-chart'
  ;
  grid-gap: 25px;
}

.dashboard__confirmed {
  grid-area: confirmed-number;
}

.dashboard__deaths {
  grid-area: deaths-number;
}

.dashboard__recovered {
  grid-area: recovered-number;
}

.dashboard__active {
  grid-area: active-number;
}

.dashboard__line-chart {
  grid-area: line-chart;
}

.dashboard__radar-chart {
  grid-area: radar-chart;
}
</style>
