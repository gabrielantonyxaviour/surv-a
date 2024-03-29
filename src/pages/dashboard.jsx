import React, { useEffect, useContext } from 'react'
import Header from '@/components/app/AppHeader'
import Head from 'next/head'

import { useState } from 'react'
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import {
  faUser,
  faFileAlt,
  faCommentAlt,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { NumberElement } from '@/components/NumberElement'
import Loading from '@/components/Loading'
import PrivateRoute from '@/routes/PrivateRoute'
import { supabase } from '@/helpers/supabase'

export default function dashboard() {
  // const [loading, setLoading] = useState(true)
  // const [animationComplete, setAnimationComplete] = useState(false)
  // const supabase = useSupabaseClient()
  // const user = useUser()
  // const router = useRouter()
  // const session = useSession()

  const [userId, setUserId] = useState('')

  const [totalCreatedSurveys, setTotalCreatedSurveys] = useState(0)
  const [totalResponses, setTotalResponses] = useState(0)
  const [surveyFilled, setSurveyFilled] = useState(1)

  const [positivePercent, setPositivePercent] = useState(0)
  const [negativePercent, setNegativePercent] = useState(0)

  const [positiveCount, setPositiveCount] = useState(0)
  const [negativeCount, setNegativeCount] = useState(0)

  const [countries, setCountries] = useState([])
  const [positiveData, setPositiveData] = useState([])
  const [negativeData, setNegativeData] = useState([])

  // useEffect(() => {
  //   privateRoute()
  // }, [session])

  // const privateRoute = async () => {
  //   try {
  //     if (session) {
  //       await dashboardAnalytics()
  //       await positiveLineGraph()
  //       await negativeLineGraph()
  //     } else {
  //       router.push('/login')
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    initalFunction()
  }, [])

  const initalFunction = async () => {
    dashboardAnalytics().then(() => {
      positiveLineGraph()
    }).then(() => {
      negativeLineGraph()
    })
  }

  const dashboardAnalytics = async () => {
    try {
      const user_id = (await supabase.auth.getUser()).data.user.id;
      // Get card data for total survey created by user
      const { data: surveys, error: surveysError } = await supabase
        .from('survey')
        .select('id')
        .eq('user_id', user_id)
      setTotalCreatedSurveys(surveys.length)


      // Get card data for total responses for the survey created by user
      const { data: responses, error: responsesError } = await supabase
        .from('survey')
        .select(`
        id,
        questions (
          id,
          answers (
            id
          )
        )
        `)
        .eq('user_id', user_id)
      let responseCount = 0;
      responses.map((survey) => {
        survey.questions.map((question) => {
          responseCount += question.answers.length
        })
      })
      setTotalResponses(responseCount)


      // Get card data for total survey filled by user
      const { data: filledSurvey } = await supabase
        .from('survey')
        .select(`
        id,
        questions (
          id,
          answers (
            id,
            user_id
          )
        )`)
      let filledResponseCount = 0;
      filledSurvey.map((survey) => {
        survey.questions.map((question) => {
          question.answers.map((answer) => {
            if (answer.user_id === user_id) {
              filledResponseCount++
            }
          })
        })
      })
      setSurveyFilled(filledResponseCount)


      // Get data for positive count and positive percent
      const { data: positive, error: positiveError } = await supabase
        .from('survey')
        .select(`
      id,
      questions (
        id,
        answers (
          id,
          label
        )
      )
      `)
        .eq('user_id', user_id)
      let positiveResponseCount = 0;
      positive.map((survey) => {
        survey.questions.map((question) => {
          question.answers.map((answer) => {
            if (answer.label === '"POSITIVE"') {
              positiveResponseCount++
            }
          })
        })
      })
      // .eq('label', '"POSITIVE"')
      setPositiveCount(positiveResponseCount)
      setPositivePercent(Math.round((positiveResponseCount / responseCount) * 100))


      const { data: negative, error: negativeError } = await supabase
        .from('survey')
        .select(`
    id,
    questions (
      id,
      answers (
        id,
        label
      )
    )
    `)
        .eq('user_id', user_id)
      let negativeResponseCount = 0;
      positive.map((survey) => {
        survey.questions.map((question) => {
          question.answers.map((answer) => {
            if (answer.label === '"NEGATIVE"') {
              negativeResponseCount++
            }
          })
        })
      })
      setNegativeCount(negativeResponseCount)
      setNegativePercent(Math.round((negativeResponseCount / responseCount) * 100))
      setNeutralCount(responseCount - positiveResponseCount - negativeResponseCount)
      setNeutralPercent(
        Math.round(
          (1 -
            positiveResponseCount / responseCount -
            negativeResponseCount / responseCount) *
          100
        )
      )
    } catch (error) { }
  }

  const getDistinctCountries = (data) => {
    const countries = new Set()
    data.forEach((obj) => {
      if (obj.country) {
        countries.add(obj.country)
      }
    })
    return Array.from(countries)
  }

  const positiveLineGraph = async () => {
    // const { data: countryData, error } = await supabase.rpc('count_answers_by_country_and_label')
    const user_id = (await supabase.auth.getUser()).data.user.id;

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
    `).eq('user_id', user_id)
    const lineGraphData = []
    responses?.map((survey) => {
      survey.questions.map((question) => {
        question.answers.map((answer) => {
          lineGraphData.push({
            survey_id: survey.id,
            question_id: question.id,
            answer_id: answer.id,
            label: answer.label,
            created_at: answer.created_at,
            country: answer.response_country,
          })
        })
      })
    })
    const distinctCountries = getDistinctCountries(lineGraphData)
    setCountries(distinctCountries)
    // console.log(distinctCountries)
    let count = 0
    let data = []
    distinctCountries.map((country) => {
      lineGraphData.map((obj) => {
        if (obj.country == country && obj.label == '"POSITIVE"') {
          count++
        }
      })
      data.push({
        value: count,
        itemStyle: {
          color: '#50C878',
        },
      })
      count = 0
    })
    // console.log(data)
    setPositiveData(data)
  }

  const negativeLineGraph = async () => {
    // const { data: countryData, error } = await supabase.rpc('count_answers_by_country_and_label')
    const user_id = (await supabase.auth.getUser()).data.user.id;

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
    `).eq('user_id', user_id)
    const lineGraphData = []
    responses?.map((survey) => {
      survey.questions.map((question) => {
        question.answers.map((answer) => {
          lineGraphData.push({
            survey_id: survey.id,
            question_id: question.id,
            answer_id: answer.id,
            label: answer.label,
            created_at: answer.created_at,
            country: answer.response_country,
          })
        })
      })
    })
    const distinctCountries = getDistinctCountries(lineGraphData)
    let count = 0
    let data = []
    distinctCountries.map((country) => {
      lineGraphData.map((obj) => {
        if (obj.country == country && obj.label == '"NEGATIVE"') {
          count++
        }
      })
      data.push({
        value: count,
        itemStyle: {
          color: '#D22B2B',
        },
      })
      count = 0
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

  // if (loading || !animationComplete)
  //   return (
  //     <Loading
  //       onComplete={() => {
  //         setAnimationComplete(true)
  //       }}
  //       isLong={true}
  //     />
  //   )

  const geobarChartOption = {
    title: {
      text: 'Sentiment Comparison',
      left: 30,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      bottom: 10,
      data: [
        { name: 'Positive', itemStyle: { color: '#50C878' } },
        { name: 'Negative', itemStyle: { color: '#D22B2B' } },
      ],
    },
    xAxis: [
      {
        type: 'category',
        data: countries,
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Surveys',
        min: 0,
        max: 10,
        interval: 2,
      },
    ],
    series: [
      {
        name: 'Positive',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: positiveData,
      },
      {
        name: 'Negative',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: negativeData,
      },
    ],
  }

  const nightingaleOption = {
    title: {
      text: 'Volume Comparison',
      left: 30,
    },
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: countries.map((country, index) => {
          return {
            value: positiveData[index]?.value + negativeData[index]?.value,
            name: country,
          }
        }),
        // [
        //   { value: 40, name: 'rose 1' },
        //   { value: 38, name: 'rose 2' },
        //   { value: 32, name: 'rose 3' },
        //   { value: 30, name: 'rose 4' },
        //   { value: 28, name: 'rose 5' },
        //   { value: 26, name: 'rose 6' },
        //   { value: 22, name: 'rose 7' },
        //   { value: 18, name: 'rose 8' }
        // ]
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
      data: ['Postive', 'Negative'],
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

  return (
    <>
      <Head>
        <title>Dashboard - SURV-A</title>
      </Head>
      <PrivateRoute>
        <div className="mx-auto flex max-w-[1290px]">
          <Header />
          <main
            className="mb-6 ml-8 mt-10 flex min-h-full w-[82%] text-black"
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
                  title="Filled Responses"
                  icon={faClipboardCheck}
                  count={surveyFilled}
                />
              </div>
              <h1 className="my-4 ml-4 text-xl font-bold text-indigo-900">
                Geo Analysis
              </h1>
              <ReactECharts option={geobarChartOption} style={{ height: 300 }} />
              <ReactECharts
                option={nightingaleOption}
                style={{ height: 600 }}
                className="mt-6"
              />
            </div>
            <div className="ml-4">
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
      </PrivateRoute>
    </>
  )
}
