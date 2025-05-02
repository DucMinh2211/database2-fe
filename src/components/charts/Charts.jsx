// BarChart.jsx
import { Bar } from 'react-chartjs-2'

export const BarChart = ({ data, labels }) => {
  return (
    <div className="h-64">
      <Bar
        data={{
          labels,
          datasets: [{
            label: 'Hoạt động',
            data,
            backgroundColor: '#3B82F6'
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}

// PieChart.jsx
import { Pie } from 'react-chartjs-2'

export const PieChart = ({ data, labels, colors }) => {
  return (
    <div className="h-64">
      <Pie
        data={{
          labels,
          datasets: [{
            data,
            backgroundColor: colors
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}
