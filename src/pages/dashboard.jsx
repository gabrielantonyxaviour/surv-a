import React, { useEffect, useContext } from 'react'
import Header from '@/components/app/AppHeader'
import Head from 'next/head'

import { useState } from 'react'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
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
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const session = useSession()

  const [totalCreatedSurveys, setTotalCreatedSurveys] = useState(0)
  const [totalResponses, setTotalResponses] = useState(0)
  const [surveyFilled, setSurveyFilled] = useState(0)

  const [positivePercent, setPositivePercent] = useState(0)
  const [negativePercent, setNegativePercent] = useState(0)
  const [neutralPercent, setNeutralPercent] = useState(0)

  const [positiveCount, setPositiveCount] = useState(0)
  const [negativeCount, setNegativeCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)

  const [countries, setCountries] = useState([])
  const [positiveData, setPositiveData] = useState([])
  const [negativeData, setNegativeData] = useState([])

  useEffect(() => {
    privateRoute()
  }, [session])

  const privateRoute = async () => {
    try {
      if (session) {
        await dashboardAnalytics()
        await positiveLineGraph()
        await negativeLineGraph()
      } else {
        router.push('/login')
      }
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }

  const dashboardAnalytics = async () => {
    try {
      const { data: surveys, error: surveysError } = await supabase
        .from('survey')
        .select('id')
      setTotalCreatedSurveys(surveys.length)
      const { data: responses, error: responsesError } = await supabase
        .from('answers')
        .select('id')
      setTotalResponses(responses.length)
      const { data: filledSurvey } = await supabase
        .from('answers')
        .select()
      setSurveyFilled(filledSurvey.length)
      const { data: positive, error: positiveError } = await supabase
        .from('answers')
        .select()
        .eq('label', "\"POSITIVE\"")
      setPositiveCount(positive.length)
      setPositivePercent(Math.round(positive.length / responses.length * 100))
      const { data: negative, error: negativeError } = await supabase
        .from('answers')
        .select()
        .eq('label', "\"NEGATIVE\"")
      setNegativeCount(negative.length)
      setNegativePercent(Math.round(negative.length / responses.length * 100))
      setNeutralCount(responses.length - positive.length - negative.length)
      setNeutralPercent(Math.round((1 - positive.length / responses.length - negative.length / responses.length) * 100))
    } catch (error) { }
  }

  const getDistinctCountries = (data) => {
    const countries = new Set();
    data.forEach(obj => {
      if (obj.country) {
        countries.add(obj.country);
      }
    });
    return Array.from(countries);
  }

  const positiveLineGraph = async () => {
    // const { data: countryData, error } = await supabase.rpc('count_answers_by_country_and_label')

    const { data: responses } = await supabase.from('survey').select(`
    id,
    questions (
      id,
      question, 
      answers (
        id,
        label,
        created_at,
        response_country
      )
    )
    `)
    const lineGraphData = []
    responses.map((survey) => {
      survey.questions.map((question) => {
        question.answers.map((answer) => {
          lineGraphData.push({
            survey_id: survey.id,
            question_id: question.id,
            answer_id: answer.id,
            label: answer.label,
            created_at: answer.created_at,
            country: answer.response_country
          })
        })
      })
    })
    const distinctCountries = getDistinctCountries(lineGraphData)
    setCountries(distinctCountries)
    let count = 0;
    let data = []
    distinctCountries.map((country) => {
      lineGraphData.map((obj) => {
        if (obj.country == country && obj.label == "\"POSITIVE\"") {
          count++;
        }
      })
      data.push({
        value: count,
        itemStyle: {
          color: '#50C878',
        },
      })
      count = 0;
    })
    setPositiveData(data)
  }


  const negativeLineGraph = async () => {
    // const { data: countryData, error } = await supabase.rpc('count_answers_by_country_and_label')

    const { data: responses } = await supabase.from('survey').select(`
    id,
    questions (
      id,
      question, 
      answers (
        id,
        label,
        created_at,
        response_country
      )
    )
    `)
    const lineGraphData = []
    responses.map((survey) => {
      survey.questions.map((question) => {
        question.answers.map((answer) => {
          lineGraphData.push({
            survey_id: survey.id,
            question_id: question.id,
            answer_id: answer.id,
            label: answer.label,
            created_at: answer.created_at,
            country: answer.response_country
          })
        })
      })
    })
    const distinctCountries = getDistinctCountries(lineGraphData)
    let count = 0;
    let data = []
    distinctCountries.map((country) => {
      lineGraphData.map((obj) => {
        if (obj.country == country && obj.label == "\"NEGATIVE\"") {
          count++;
        }
      })
      data.push({
        value: count,
        itemStyle: {
          color: '#D22B2B',
        },
      })
      count = 0;
    })
    // console.log(data)
    setNegativeData(data)
  }


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
      text: 'Positive Response Count',
      left: '30%',
    },
    xAxis: {
      type: 'category',
      data: countries,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: positiveData,
        type: 'bar',
      },
    ],
  }

  const negativeLineOption = {
    title: {
      show: true,
      text: 'Negative Response Count',
      left: '30%',
    },
    xAxis: {
      type: 'category',
      data: countries,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: negativeData,
        type: 'bar',
      },
    ],
  }

  const barChartOptions = {
    title: {
      show: true,
      text: 'Total Response Count',
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
            value: positiveCount,
            itemStyle: {
              color: '#50C878',
            },
          },
          {
            value: neutralCount,
            itemStyle: {
              color: '#FAC858',
            },
          },
          {
            value: negativeCount,
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
            value: positivePercent,
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
            value: neutralPercent,
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
            value: negativePercent,
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
                count={totalCreatedSurveys}
              />
              <NumberElement
                title="Total Responses"
                icon={faCommentAlt}
                count={totalResponses}
              />
              <NumberElement
                title="Filled Surveys"
                icon={faClipboardCheck}
                count={surveyFilled}
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
            <h1 className="ml-8 text-xl font-bold text-indigo-900">
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
