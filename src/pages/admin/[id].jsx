import React, { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Loading from '@/components/Loading'
import Head from 'next/head'
import Header from '@/components/app/AppHeader'
import WordCloud from 'react-d3-cloud'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { supabase } from '@/helpers/supabase'
import PrivateRoute from '@/routes/PrivateRoute'

export default function view() {
  // const router = useRouter()
  // const [loading, setLoading] = useState(true)
  // const supabase = useSupabaseClient()
  // const session = useSession()
  const [surveyId, setSurveyId] = useState('')
  const [survey, setSurvey] = useState({})
  const [analytics, setAnalytics] = useState([])
  const [wordCloudData, setWordCloudData] = useState()

  // useEffect(() => {
  //   privateRoute()
  // }, [session])

  // const privateRoute = async () => {
  //   try {
  //     if (session) {
  //       await fetchSurvey()
  //     } else {
  //       router.push('/login')
  //     }
  //   } catch (error) {
  //   } finally {
  //     // setLoading(false)
  //   }
  // }

  useEffect(() => {
    fetchSurvey()
  }, [])

  const getDistinctCountries = (data) => {
    const score = {}
    data.forEach(({ response_country, label }) => {
      if (score[response_country]) {
        if (label == '"POSITIVE"') {
          score[response_country].positive += 1
        } else {
          score[response_country].negative += 1
        }
      } else {
        if (label == '"POSITIVE"') {
          score[response_country] = { positive: 1, negative: 0 }
        } else {
          score[response_country] = { positive: 0, negative: 1 }
        }
      }
    })
    return score
  }

  const handleWordClick = async (e, d) => {
    // console.log(`onWordClick: ${d.text}`);
    const clickedWord = d.text
    // filter only word
    let originalData = wordCloudData
    let filteredData = wordCloudData.filter((data) => data.text == clickedWord)
    // console.log(filteredData)
    setWordCloudData(filteredData)
    setTimeout(() => {
      setWordCloudData(originalData)
    }, 5000)

    // Do something else when a word is clicked
  }

  //   [
  //     {
  //         "id": "91db406a-0684-4f62-90d2-9b1f2bfb6846",
  //         "survey_title": "About India.",
  //         "created_at": "2023-04-28T19:12:34.404935+00:00",
  //         "questions": [
  //             {
  //                 "id": "651ee392-c4ab-4aff-a5c3-f7202526f91a",
  //                 "question": "Write about Incredible India.",
  //                 "answers": [
  //                     {
  //                         "id": "696f6aaa-1310-4927-9862-f10234e1c393",
  //                         "answer": "India is a land of diversity, with a rich cultural heritage that spans over thousands of years. It is a country of vibrant colors, spices, music, and festivals, which contribute to its vivid cultural landscape. The country has a plethora of languages, religions, and customs that make it one of the most diverse nations on earth.",
  //                         "label": "\"POSITIVE\"",
  //                         "score": 0.999857187271118,
  //                         "response_country": "India",
  //                         "keywords": [
  //                             "India"
  //                         ]
  //                     },
  //                     {
  //                         "id": "ea41a9b9-0c18-4fc9-aba5-70914ab969e9",
  //                         "answer": "India is also known for its natural beauty, with diverse landscapes ranging from the Himalayas in the north to the beaches in the south, and from the deserts of Rajasthan to the lush green forests of Kerala. The country has a rich flora and fauna, including tigers, elephants, lions, and many other exotic animals.",
  //                         "label": "\"POSITIVE\"",
  //                         "score": 0.999769985675812,
  //                         "response_country": "India",
  //                         "keywords": [
  //                             "India",
  //                             "Himalaya",
  //                             "Rajasthan",
  //                             "Kerala"
  //                         ]
  //                     },
  //                     {
  //                         "id": "f4402509-a5e4-488a-b658-fe1790ee202b",
  //                         "answer": "India faces significant challenges in providing adequate healthcare to its population, including a shortage of healthcare professionals, inadequate infrastructure, and limited access to medical care in rural areas.",
  //                         "label": "\"NEGATIVE\"",
  //                         "score": 0.998759746551514,
  //                         "response_country": "India",
  //                         "keywords": [
  //                             "India"
  //                         ]
  //                     },
  //                     {
  //                         "id": "aa902e10-1179-485f-8a81-5b7eb8bb1f0f",
  //                         "answer": "Finally, India is renowned for its delicious cuisine, which varies from region to region and reflects the country's diverse culinary traditions. Indian food is known for its bold flavors, spices, and aromas, and is loved by people all around the world.",
  //                         "label": "\"POSITIVE\"",
  //                         "score": 0.999880313873291,
  //                         "response_country": "China",
  //                         "keywords": [
  //                             "India"
  //                         ]
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  // ]


  const fetchSurvey = async () => {
    console.log('Fetching....')
    const surveyId = window.location.href.split('/')[4]
    setSurveyId(surveyId)
    const { data: survey } = await supabase
      .from('survey')
      .select(
        `
        id,
        survey_title,
        created_at,
        questions (id, question, answers (id, answer, label, score,response_country , keywords))
      `
      )
      .eq('id', surveyId)
    // console.log(survey)
    if (survey.length == 0) {
      setSurvey({})
      return
    }
    const analyticsData = []
    survey[0].questions.forEach((question) => {
      const temp = getDistinctCountries(question.answers)
      analyticsData.push(temp)
    })
    setSurvey(survey[0])

    // console.log(survey)
    setAnalytics(analyticsData)
    const data = []
    let currentSurvey = survey[0]
    currentSurvey.questions?.forEach((question) => {
      question.answers?.forEach((answer) => {
        answer.keywords?.forEach((keyword) => {
          data.push({ text: keyword, value: 1000 })
        })
      })
    })
    // combine value with same text
    // const combinedData = []
    // data.forEach((item) => {
    //   const existing = combinedData.filter((v, i) => {
    //     return v.text == item.text
    //   })
    //   if (existing.length) {
    //     const existingIndex = combinedData.indexOf(existing[0])
    //     combinedData[existingIndex].value = combinedData[existingIndex].value + item.value
    //   } else {
    //     combinedData.push(item)
    //   }
    // })
    // console.log(combinedData)
    setWordCloudData(data)

    // console.log('Entire Analytics Data: ' + JSON.stringify(analyticsData))
    // console.log('First Analytics Data: ' + JSON.stringify(analyticsData[0]))
    // console.log(
    //   'Only values: ' + JSON.stringify(Object.values(analyticsData[0]))
    // )
  }
  // const y = [
  //   {
  //     India: { positive: 12, negative: 34 },
  //   },
  // ]

  function getQuestionCountryOption(index, isOverall) {
    return {
      title: {
        text: isOverall == true ? 'Overall' : 'Geo Analysis',
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
          data: isOverall == true ? ['Overall'] : Object.keys(analytics[index]),
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
          data:
            isOverall == true
              ? [
                {
                  value: Object.values(analytics[index])
                    .map((item) => item.positive)
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue,
                      0
                    ),
                  itemStyle: {
                    color: '#50C878',
                  },
                },
              ]
              : Object.values(analytics[index]).map((item) => {
                return {
                  value: item.positive,
                  itemStyle: {
                    color: '#50C878',
                  },
                }
              }),
        },
        {
          name: 'Negative',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value
            },
          },
          data:
            isOverall == true
              ? [
                {
                  value: Object.values(analytics[index])
                    .map((item) => item.negative)
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue,
                      0
                    ),
                  itemStyle: {
                    color: '#D22B2B',
                  },
                },
              ]
              : Object.values(analytics[index]).map((item) => {
                return {
                  value: item.negative,
                  itemStyle: {
                    color: '#D22B2B',
                  },
                }
              }),
        },
      ],
    }
  }



  // const data = [
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  //   { text: 'Hey', value: 1000 },
  //   { text: 'lol', value: 200 },
  //   { text: 'first impression', value: 800 },
  //   { text: 'very cool', value: 1000 },
  //   { text: 'duck', value: 100 },
  // ]
  // if (loading)
  //   return (
  //     <Loading
  //       onComplete={() => {
  //         setLoading(false)
  //       }}
  //     />
  //   )
  // Array of countries
  // Array of positives
  // Array of negatives
  //  const x={
  //       survey_title:"Survey 1",
  //       questions: [
  //         {
  //           question:"How are you?",
  //           answers:[
  //             {
  //               answer:"Good",
  //               label:"POSITIVE",
  //               score:0.9,
  //               response_country:"India"
  //             },
  //             {
  //               answer:"Bad",
  //               label:"NEGATIVE",
  //               score:0.1,
  //               response_country:"India"
  //             },
  //           ],
  //         },
  //       ]
  //     }

  return (
    <>
      <Head>
        <title>Survey Response - SURV-A</title>
      </Head>
      <PrivateRoute>
        <div className="mx-auto flex max-w-[1290px]">
          <Header />
          <main
            className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
            style={{ height: `calc(100vh - 40px)` }}
          >
            <div className="grow">
              <div className="ml-2  rounded-xl bg-indigo-500 p-4 text-center text-2xl font-bold text-white">
                <h1>{survey.survey_title}</h1>
              </div>
              <h2 className=" ml-2 mt-6 text-2xl font-bold text-indigo-900">
                World Cloud Analysis
              </h2>
              <p className="text-md mb-4 ml-4 font-semibold text-gray-600">
                Hint: Hover over a word to view analytics. Click to view all
                responses
              </p>
              <div className="select-none">
                <WordCloud
                  data={wordCloudData}
                  height={300}
                  onWordClick={(e, d) => handleWordClick(e, d)}
                  onWordMouseOver={() => { }}
                />
              </div>
              <h2 className="ml-2  text-2xl font-bold text-indigo-900">
                Response Analysis
              </h2>
              <div className="my-4 mr-4 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                {Object.keys(survey).length > 0 ? (
                  survey.questions.map((question, index) => {
                    return (
                      <>
                        <div className="w-full">
                          <h2 className="ml-2 mt-4 font-semibold">
                            {index + 1 + ' | ' + question.question}
                          </h2>
                          <div className="px-auto my-3 flex justify-around rounded-2xl bg-white pt-4">
                            <ReactECharts
                              option={getQuestionCountryOption(index, false)}
                              style={{ height: 300, width: 400 }}
                            />
                            <ReactECharts
                              option={getQuestionCountryOption(index, true)}
                              style={{ height: 300, width: 400 }}
                            />
                          </div>
                          <div className="mb-4 grid grid-cols-3 gap-4">
                            {question.answers.length > 0 ? (
                              question.answers.map((answer) => {
                                return (
                                  <input
                                    type="text"
                                    className="mt-2 rounded-xl bg-indigo-700 px-4 py-2 text-white"
                                    value={answer.answer}
                                    disabled
                                  />
                                )
                              })
                            ) : (
                              <div className="text-md ml-6 mt-2 font-semibold text-gray-300">
                                No responses yet
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )
                  })
                ) : (
                  <div className="text-2xl text-black">
                    Session Expired. Log out and Log in back
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </PrivateRoute>
    </>
  )
}
