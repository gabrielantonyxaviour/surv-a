import React, { useEffect, useContext } from 'react'
import Header from '@/components/app/AppHeader'
import Head from 'next/head'

import { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import {
  faUser,
  faFileAlt,
  faCommentAlt,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { NumberElement } from '@/components/NumberElement'
export default function dashboard() {
  const [loading, setLoading] = useState(true)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    try {
      if (user) {
        router.push('/login')
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }, [user])

  function getVirtualData(year) {
    const date = +echarts.time.parse(year + '-01-01')
    const end = +echarts.time.parse(year + '-12-31')
    const dayTime = 3600 * 24 * 1000
    const data = []
    for (let time = date; time <= end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 10000),
      ])
    }
    return data
  }

  if (loading) return <Loader />

  const positiveLineOption = {
    title: {
      show: true,
      text: 'Positive Responses',
      left: '35%',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Portugal', 'India', 'Japan', 'Canada', 'China'],
      top: '10%',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Portugal',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'India',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Japan',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Canada',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'China',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }
  const negativeLineOption = {
    title: {
      show: true,
      text: 'Negative Responses',
      left: '35%',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Portugal', 'India', 'Japan', 'Canada', 'China'],
      top: '10%',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Portugal',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'India',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Japan',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Canada',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'China',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }
  const barChartOptions = {
    title: {
      show: true,
      text: 'Response Count',
      left: '30%',
    },
    xAxis: {
      type: 'category',
      data: ['Postive', 'Neutral', 'Negative'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          {
            value: 120,
            itemStyle: {
              color: '#50C878',
            },
          },
          {
            value: 30,
            itemStyle: {
              color: '#FAC858',
            },
          },
          {
            value: 80,
            itemStyle: {
              color: '#D22B2B',
            },
          },
        ],
        type: 'bar',
      },
    ],
  }
  const gaugeOptions = {
    title: {
      show: true,
      text: 'Response Percentage',
      left: '20%',
      top: '10%',
    },
    series: [
      {
        type: 'gauge',
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: '#FAC858',
          },
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '80%',
          offsetCenter: [0, '8%'],
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
        },
        axisLine: {
          roundCap: true,
        },
        data: [
          {
            value: 20,
            name: 'Positive',
            title: {
              offsetCenter: ['-40%', '80%'],
            },
            itemStyle: {
              color: '#50C878',
            },
            detail: {
              offsetCenter: ['-40%', '95%'],
            },
          },
          {
            value: 40,
            name: 'Neutral',
            itemStyle: {
              color: '#FAC858',
            },
            title: {
              offsetCenter: ['0%', '80%'],
            },
            detail: {
              offsetCenter: ['0%', '95%'],
            },
          },
          {
            value: 60,
            name: 'Negative',
            itemStyle: {
              color: '#D22B2B',
            },
            title: {
              offsetCenter: ['40%', '80%'],
            },
            detail: {
              offsetCenter: ['40%', '95%'],
            },
          },
        ],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: '#fff',
          backgroundColor: 'inherit',
          borderRadius: 3,
          formatter: '{value}%',
        },
      },
    ],
  }

  // Total surveys created - Number
  // Total surveys filled - Number
  // Total responses for surveys - Number
  // Net sentiment for all surveys - Radar custom (positive, negative, more?)
  // Geographical - Map with pie
  // Bar chart for survey and response count
  //

  // On Right
  // Top Calender, Notifications, Messages and PFP
  // Your current Plan - If Basic Get Premium Now or else show Premium
  // Current Surveys List 4 and bottom more

  return (
    <>
      <Head>
        <title>Dashboard - TaxPal</title>
      </Head>
      <div className="mx-auto flex max-w-[1290px]">
        <Header />
        <main
          className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
          style={{ height: `calc(100vh - 40px)` }}
        >
          <div className="grow">
            <h1 className="ml-2 text-2xl font-bold text-indigo-900">
              Dashboard
            </h1>
            {/* <p className="mt-3 text-2xl">
            Get started by editing{' '}
            <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
              pages/dashboard.jsx
            </code>
          </p> */}
            <div className="flex">
              <NumberElement
                title="Created Surveys"
                icon={faFileAlt}
                count={24}
              />
              <NumberElement
                title="Total Responses"
                icon={faCommentAlt}
                count={2314}
              />
              <NumberElement
                title="Filled Surveys"
                icon={faClipboardCheck}
                count={43}
              />
            </div>
            <h1 className="my-4 ml-4 text-xl font-bold text-indigo-900">
              Geo Analysis
            </h1>
            <ReactECharts option={positiveLineOption} style={{ height: 300 }} />
            <ReactECharts
              option={negativeLineOption}
              style={{ height: 300 }}
              className="mt-6"
            />
          </div>
          <div className="ml-4 ">
            <h1 className=" text-xl font-bold text-indigo-900">
              Sentiment Analysis
            </h1>
            <ReactECharts
              option={gaugeOptions}
              style={{ height: 500, width: 400 }}
            />
            <ReactECharts option={barChartOptions} style={{ height: 400 }} />
          </div>
        </main>
      </div>
    </>
  )
}
