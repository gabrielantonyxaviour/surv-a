import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import timeDifference from '@/utils/timeDifference'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Loader from '@/components/Loader'

export default function index() {

  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const [formattedSurveys, setFormattedSurveys] = useState([

  ])

  useEffect(() => {
    fetchSurveys().finally(() => setLoading(false))
  }, [])

  const fetchSurveys = async () => {
    try {
      const { data, error } = await supabase.from('survey').select(`
          id, 
          survey_title, 
          created_at,
          questions ( id, question , answers (id , answer , label , score))
        `)
      data.forEach((survey) => {
        setFormattedSurveys(() => [
          ...formattedSurveys,
          {
            id: survey.id,
            title: survey.survey_title,
            // description: survey.questions[0].question,
            totalResponses: calculateTotalResponses(survey),
            positive: calculatePositiveCount(survey),
            negative: calculateNegativeCount(survey),
            neutral: calculateTotalResponses(survey) - calculatePositiveCount(survey) - calculateNegativeCount(survey),
            createdAt: timeDifference(new Date(survey.created_at)),
            // updatedAt: timeDifference(new Date(survey.updated_at)),
          },
        ])
      })
    }
    catch (error) { }
  }

  const calculateTotalResponses = (survey) => {
    let totalResponses = 0
    survey.questions.forEach((question) => {
      totalResponses += question.answers.length
    })
    return totalResponses
  }

  const calculatePositiveCount = (survey) => {
    let positive = 0
    survey.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.label == "\"POSITIVE\"") positive++
      })
    })
    return positive
  }

  const calculateNegativeCount = (survey) => {
    let negative = 0
    survey.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.label == "\"NEGATIVE\"") negative++
      })
    })
    return negative
  }

  const lastUpdated = (survey) => {
    // return timeDifference(new Date(survey.updated_at))
  }

  // const [surveys, setSurveys] = useState([
  //   {
  //     id: 1,
  //     title: 'Session Feedback',
  //     description: 'This is a feedback form for the session',
  //     totalResponses: 223,
  //     positive: 100,
  //     negative: 26,
  //     neutral: 97,
  //     createdAt: '2020-05-12T12:00:00.000Z',
  //     updatedAt: '2022-09-12T12:00:00.000Z',
  //   },
  //   {
  //     id: 2,
  //     title: 'How effective is WFH?',
  //     description: 'This is a survey to know about effectiveness of WFH',
  //     totalResponses: 500,
  //     positive: 64,
  //     negative: 33,
  //     neutral: 12,
  //     createdAt: '2021-11-09T12:00:00.000Z',
  //     updatedAt: '2021-12-12T12:00:00.000Z',
  //   },
  //   {
  //     id: 3,
  //     title: 'Goa or Kerala?',
  //     description: 'Opinion on the best place to visit',
  //     totalResponses: 1000,
  //     positive: 200,
  //     negative: 26,
  //     neutral: 97,
  //     createdAt: '2021-09-12T12:00:00.000Z',
  //     updatedAt: '2021-10-12T12:00:00.000Z',
  //   },
  //   {
  //     id: 4,
  //     title: 'Goa or Kerala?',
  //     description: 'Opinion on the best place to visit',
  //     totalResponses: 1000,
  //     positive: 200,
  //     negative: 26,
  //     neutral: 97,
  //     createdAt: '2021-09-12T12:00:00.000Z',
  //     updatedAt: '2021-10-12T12:00:00.000Z',
  //   },
  // ])

  function getOption(positive, neutral, negative) {
    return {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Sentiment',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          startAngle: 180,

          data: [
            {
              value: positive,
              name: 'Positive',
              itemStyle: { color: '#50C878' },
            },
            {
              value: neutral,
              name: 'Neutral',
              itemStyle: { color: '#FAC858' },
            },
            {
              value: negative,
              name: 'Negative',
              itemStyle: { color: '#D22B2B' },
            },
            {
              // make an record to fill the bottom 50%
              value: positive + neutral + negative,
              itemStyle: {
                // stop the chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none',
                },
              },
              label: {
                show: false,
              },
            },
          ],
        },
      ],
    }
  }


  if (loading) return <Loader />

  return (
    <>
      <Head>
        <title>Your Surveys - TaxPal</title>
      </Head>
      <div className="mx-auto flex max-w-[1290px]">
        <Header />
        <main
          className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
          style={{ height: `calc(100vh - 40px)` }}
        >
          <div className="grow">
            <h1 className="ml-2 text-2xl font-bold text-indigo-900">
              Created Surveys
            </h1>
            <div className="mt-6 grid grid-cols-3 gap-5">
              {formattedSurveys.map((e, index) => {
                return (
                  <button
                    key={index}
                    className="rounded-xl border-[1px] border-slate-100 bg-white py-4 text-black drop-shadow-xl transition delay-150 duration-300 ease-in-out hover:border-none hover:bg-indigo-500 hover:text-white"
                    onClick={() => {
                      window.location = `/admin/${e.id}`
                    }}
                  >
                    <h1 className="px-4 text-lg font-bold">{e.title}</h1>
                    {/* <div className=" h-[60px] px-4">
                      <p className="text-sm font-normal ">{e.description}</p>
                    </div> */}
                    <p className=" text-center ">
                      <span className="font-bold">{e.totalResponses}</span>{' '}
                      Responses
                    </p>
                    <ReactECharts
                      option={getOption(e.positive, e.neutral, e.negative)}
                      style={{ height: 100 }}
                      className="mt-6 bg-white"
                    />
                    <div className="mt-4 flex justify-around">
                      <p className="text-xs">
                        Created {e.createdAt}
                      </p>
                      {/* <p className="text-xs">
                        Updated {timeDifference(e.updatedAt)}
                      </p> */}
                    </div>

                    {/* <div className="h-[1px] border-[1px] border-slate-200"></div> */}
                  </button>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
