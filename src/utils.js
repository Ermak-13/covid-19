export function formatNumber(number) {
  if (number >= 1000) {
    return `${Math.floor(number / 1000)}K`;
  }

  return number;
}

export function formatDelta(number) {
  if (number >= 0) {
    return `+${this.formatNumber(number)}`;
  } else {
    return this.formatNumber(number);
  }
}

export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function config(...keys) {
  const CONFIG = Object.freeze({
    covid_metrics: ['confirmed', 'deaths', 'recovered', 'active'],

    confirmed: {
      title: 'Confirmed',
      key: 'confirmed',
      borderColor: '#000000',
      backgroundColor: '#000000',
      color: '#ffffff'
    },
    deaths: {
      title: 'Deaths',
      key: 'deaths',
      borderColor: '#dc3545',
      backgroundColor: '#dc3545',
      color: '#ffffff'
    },
    recovered: {
      title: 'Recovered',
      key: 'recovered',
      borderColor: '#28a745',
      backgroundColor: '#28a745',
      color: '#ffffff'
    },
    active: {
      title: 'Active',
      key: 'active',
      borderColor: '#ffc107',
      backgroundColor: '#ffc107',
      color: '#000000'
    },

    line_chart: {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    },

    radar_chart: {
      borderColor: '#dc3545',
      backgroundColor: 'rgba(220, 53, 69, 0.5)'
    }
  });

  let result = CONFIG;
  keys.forEach((key) => {
    result = result[key];
  });
  return result;
}

export function multiCovidLineChartData(dataOfCountries) {
  const firstData = Object.values(dataOfCountries)[0] || [];
  const labels = firstData.map(_data => formatDate(_data.date));

  const datasets = [];
  Object.entries(dataOfCountries).forEach(([country, dataOfCountry]) => {
    config('covid_metrics').forEach((metric) => {
      datasets.push({
        label: `${country} - ${config(metric, 'title')}`,
        borderColor: randomColor(),
        data: dataOfCountry.map(_data => _data[metric]),
        backgroundColor: 'transparent'
      });
    });
  });

  return {
    labels: labels,
    datasets: datasets
  };
}

export function covidLineChartData(data) {
  const labels = data.map(_data => formatDate(_data.date))
  const datasets = config('covid_metrics').map(metric => {
    return {
      label: config(metric, 'title'),
      borderColor: config(metric, 'borderColor'),
      data: data.map(_data => _data[metric]),
      backgroundColor: 'transparent'
    };
  });

  return {
    labels: labels,
    datasets: datasets
  };
}

export function covidRadarChartData(data) {
  const labels = config('covid_metrics');
  const datasets = [
    {
      label: 'Last Data',
      borderColor: config('radar_chart', 'borderColor'),
      backgroundColor: config('radar_chart', 'backgroundColor'),
      data: labels.map(metric => {
        const last = data[data.length - 1];
        return last[metric];
      })
    }
  ]

  return {
    labels: labels,
    datasets: datasets
  };
}

export function multiCovidRadarChartData(dataOfCountries) {
  const labels = config('covid_metrics');
  const datasets = Object.entries(dataOfCountries).map(([country, dataOfCountry]) => {
    const color = randomColor()
    return {
      label: country,
      borderColor: color,
      backgroundColor: transparencyColor(color, '50%'),
      data: labels.map(metric => {
        const last = dataOfCountry[dataOfCountry.length - 1];
        return last[metric];
      })
    };
  });

  return {
    labels: labels,
    datasets: datasets
  };
}

// active covid-19
export function active(data) {
  return (data.confirmed - (data.deaths + data.recovered));
}

export function randomColor() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
}

export function transparencyColor(hex, opacity){
  const _hex = hex.replace('#','');
  const r = parseInt(_hex.substring(0,2), 16);
  const g = parseInt(_hex.substring(2,4), 16);
  const b = parseInt(_hex.substring(4,6), 16);
  return `rgba(${r}, ${g}, ${b}, ${ parseInt(opacity) / 100 })`;
}
