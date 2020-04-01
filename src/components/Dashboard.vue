<template>
  <div class="dashboard">
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
</template>

<script>
import {
  config,
  covidLineChartData,
  covidRadarChartData
} from '@/utils.js';

import NumberWidget from '@/components/NumberWidget.vue';
import LineChartWidget from '@/components/LineChartWidget.vue';
import RadarChartWidget from '@/components/RadarChartWidget.vue';

export default {
  name: 'Dashboard',

  components: {
    NumberWidget,
    LineChartWidget,
    RadarChartWidget
  },

  props: {
    covid19Data: {
      type: Array,
      required: true
    }
  },

  CONFIG: {
    dashboard: {
      numbers: config('covid_metrics').map(metric => config(metric)),
    }
  },

  computed: {
    lastCovid19Data() {
      return this.covid19Data[this.covid19Data.length - 1];
    },

    lineChartData() {
      return covidLineChartData(this.covid19Data);
    },

    radarChartData() {
      return covidRadarChartData(this.covid19Data);
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
      }
    },

    getNumberWidgetDelta(widget) {
      const last = this.covid19Data[this.covid19Data.length - 1];
      const nextToLast = this.covid19Data[this.covid19Data.length - 2];
      return last[widget.key] - nextToLast[widget.key];
    }
  }
}
</script>

<style scoped>

.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  /* grid-template-rows: repeat(4, 200px); */
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
