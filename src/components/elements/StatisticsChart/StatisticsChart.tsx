'use client'

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  // ChartData,
} from 'chart.js';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface StatisticsData {
  labels: string[];
  datasets: ChartDataset[];
}

// Data fallback jika terjadi error
const fallbackData: StatisticsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Jumlah Laporan',
      data: [10, 15, 20, 25, 30, 35],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
}

export default function StatisticsChart() {
  const [data, setData] = useState<StatisticsData>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistik Laporan',
      },
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Fetching statistics from:', API_ENDPOINTS.STATISTICS)
        const response = await api.get(API_ENDPOINTS.STATISTICS)
        console.log('Response:', response.data)
        if (response.data) {
          setData(response.data)
          setError(null)
        }
      } catch (error) {
        console.error('Error fetching statistics:', error)
        setError('Gagal memuat data statistik')
        // Gunakan fallback data jika terjadi error
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow p-4">
        <div className="text-gray-600">Memuat data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Line options={options} data={data} />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Line options={options} data={data} />
    </div>
  )
} 