import React, { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Loader from '@/components/Loader'

export default function view() {
  // const router = useRouter()
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const session = useSession()
  const [surveyId, setSurveyId] = useState('')
  const [survey, setSurvey] = useState([])

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
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }

  const fetchSurvey = async () => {
    const surveyId = window.location.href.split('/')[4]
    setSurveyId(surveyId)
    const { data: survey } = await supabase
      .from('survey')
      .select(`
        id,
        survey_title,
        created_at,
        questions (id, question, answers (id, answer, label, score))
      `)
      .eq('id', surveyId)
    setSurvey(survey[0])
  }


  if (loading) return <Loader />

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl divide-y divide-gray-900/10 px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">{survey.survey_title}</h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {survey.questions?.map((question) => (
              <div key={question.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{question.question}</dt>
                <dd dd className="mt-4 lg:col-span-7 lg:mt-0" >
                  {
                    question.answers.map((answer) => {
                      return (
                        <p className="text-base leading-7 text-gray-600">{answer.answer}</p>
                      )
                    })
                  }
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div >
    </div >
  )
}
