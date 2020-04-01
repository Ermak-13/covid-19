<template>
  <div class="number-widget widget">
    <h1 class="number-widget__title">
      {{ title }}
    </h1>
    <p class="number-widget__value">
      {{ formatNumber(value) }}
    </p>
    <div class="number-widget__footer">
      <p class="number-widget__delta" v-if="delta !== undefined">
        Delta: {{ formatDelta(delta) }}
      </p>
      <p class="number-widget__date">
        {{ formatDate(date) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberWidget',

  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    delta: {
      type: Number,
      required: false
    },
    date: {
      type: Date,
      requred: true
    }
  }
}
</script>

<style scoped>
.number-widget__date {
  opacity: 0.5;
  font-weight: 100;
  font-size: 14px;
}
</style>

<style scoped>
.number-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number-widget__title {
  margin: 0;
  width: 100%;
  font-size: 18px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.number-widget__value {
  margin: 0;
  font-size: 72px;
  line-height: 1.5;
}

.number-widget__footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}

.number-widget__delta {
  margin: 0;
}

.number-widget__date {
  margin: 0;
}
</style>
