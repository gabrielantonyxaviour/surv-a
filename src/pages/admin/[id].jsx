import React, { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Loading from '@/components/Loading'
import Head from 'next/head'
import Header from '@/components/app/AppHeader'
import WordCloud from 'react-d3-cloud'

export default function view() {
  // const router = useRouter()
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const session = useSession()
  const [surveyId, setSurveyId] = useState('')
  const [survey, setSurvey] = useState([])

  // [
  //   { question: 'How are you?', answers: ['Hello', 'Hi', 'Hey'] }
  // ]

  useEffect(() => {
    privateRoute()
  }, [session])

  const privateRoute = async () => {
    try {
      if (session) {
        await fetchSurvey()
      } else {
        router.push('/login')
      }
    } catch (error) {
    } finally {
      // setLoading(false)
    }
  }

  const getDistinctCountries = (data) => {
    const score = {}
    data.forEach(({ response_country, label }) => {
      if (score[response_country]) {
        if (label == '"POSITIVE"') {
          score[response_country].postive += 1
        } else {
          score[response_country].negative += 1
        }
      } else {
        if (label == '"POSITIVE"') {
          score[response_country] = { postive: 1, negative: 0 }
        } else {
          score[response_country] = { postive: 0, negative: 1 }
        }
      }
    })
    return score
  }

  const fetchSurvey = async () => {
    const surveyId = window.location.href.split('/')[4]
    setSurveyId(surveyId)
    const { data: survey } = await supabase
      .from('survey')
      .select(
        `
        id,
        survey_title,
        created_at,
        questions (id, question, answers (id, answer, label, score,response_country))
      `
      )
      .eq('id', surveyId)
    console.log(survey)
    // const countries = [{
    //   India:{positive: 12,negative: 34}
    // }]
    // const data = []
    // survey[0].questions.forEach((question) => {
    //   const temp = getDistinctCountries(question.answers)
    //   Object.keys(temp).forEach((country) => {
    //     data.push({
    //       value: country[positive],
    //     itemStyle: {
    //       color: '#50C878',
    //     },
    //     })
    //   })
    // })
    setSurvey(survey[0])
    // {
    //   india:{positive: 23,negative: 32},
    //   england:
    // }
  }
  // "\"POSITIVE\""
  const data = [
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000 },
    { text: 'duck', value: 100 },
  ]
  if (loading)
    return (
      <Loading
        onComplete={() => {
          setLoading(false)
        }}
      />
    )

  return (
    <>
      <Head>
        <title>Survey Response - SURV-A</title>
      </Head>
      <div className="mx-auto flex max-w-[1290px]">
        <Header />
        <main
          className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
          style={{ height: `calc(100vh - 40px)` }}
        >
          <div className="grow">
            <h2 className="ml-2  text-2xl font-bold text-indigo-900">
              {survey.survey_title}
            </h2>

            {/* <div className="my-4 mr-4 flex h-[400px] flex-col items-center justify-center rounded-xl border-2 bg-white p-6 text-2xl font-bold text-gray-600"> */}
            <WordCloud data={data} height={300} />
            {/* </div> */}
            <h2 className="ml-2  text-2xl font-bold text-indigo-900">
              Responses
            </h2>
            <div className="my-4 mr-4 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
              {survey.questions.map((question, index) => {
                return (
                  <>
                    <div className="w-full">
                      <h2 className="ml-2 mt-4 font-semibold">
                        {index + 1 + ' | ' + question.question}
                      </h2>
                      <div className="mb-4 grid grid-cols-3 gap-4">
                        {question.answers.map((answer) => {
                          return (
                            <input
                              type="text"
                              className="mt-2 rounded-xl bg-indigo-700 px-4 py-2 text-white"
                              value={answer.answer}
                              disabled
                            />
                          )
                        })}
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
