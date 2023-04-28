import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { faCheck, faRocket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import Loading from '@/components/Loading'
import { supabase } from '@/helpers/supabase'
import PrivateRoute from '@/routes/PrivateRoute'

export default function create() {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  // const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [viewOptions, setViewOptions] = useState(0)
  // const user = useUser()
  // const session = useSession()
  // const supabase = useSupabaseClient()

  // useEffect(() => {
  //   privateRoute()
  // }, [session])

  // const privateRoute = async () => {
  //   try {
  //     if (session) {
  //       // await dashboardAnalytics()
  //       // await positiveLineGraph()
  //       // await negativeLineGraph()
  //     } else {
  //       router.push('/login')
  //     }
  //   } catch (error) {
  //   } finally {
  //     // setLoading(false)
  //   }
  // }

  const handleClick = async (e) => {
    // setLoading(true)
    let { data: { user } } = await supabase.auth.getUser()
    // console.log(id)
    let user_id = user.id
    let surveyId = ''
    // let survey_title = title;
    if (user_id && user_id !== null) {
      const { data: surveyInput } = await supabase
        .from('survey')
        .insert({
          user_id,
          survey_title: title,
        })
        .select()
      // console.log(surveyInput)
      if (surveyInput.length > 0) {
        let survey = surveyInput[0]
        let survey_id = survey.id
        surveyId = survey_id
        for (let i = 0; i < questions.length; i++) {
          let question = questions[i]
          let question_type = question.name
          let question_text = question.value
          let question_options = question.options
          const { data: questionInput } = await supabase
            .from('questions')
            .insert({
              survey_id: survey_id,
              question_type: question_type,
              question: question_text,
            })
            .select()
          if (questionInput.length > 0 && question_type == 'multiple-choice') {
            let question_id = questionInput[0].id
            for (let j = 0; j < question_options.length; j++) {
              let option = question_options[j]
              const { data: optionInput } = await supabase
                .from('options')
                .insert({
                  question_id: question_id,
                  option: option,
                })
                .select()
            }
          }
        }
      }
    }
    console.log(`http://localhost:3000/survey/${surveyId}`)
    // setLoading(false)
  }

  //   [
  //     {
  //         "name": "short-text",
  //         "id": 1,
  //         "value": "How was WFH."
  //     },
  //     {
  //         "name": "multiple-choice",
  //         "id": 2,
  //         "options": [
  //             "Yes",
  //             "No"
  //         ],
  //         "value": "Will you suggest WFH."
  //     }
  // ]

  // if (loading)
  //   return (
  //     <Loading
  //       onComplete={() => {
  //         setLoading(false)
  //       }}
  //     />
  //   )

  return (
    <>
      <Head>
        <title>Your Surveys - SURV-A</title>
      </Head>
      <PrivateRoute>
        <div className="mx-auto flex max-w-[1290px]">
          <Header />
          <main
            className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
            style={{ height: `calc(100vh - 40px)` }}
          >
            <div className="grow">
              <h1 className="ml-2 text-2xl font-bold text-indigo-900">
                Survey Builder
              </h1>
              <p className=" text-md  ml-2 font-medium text-black">
                Click the + icon to create questions!
              </p>
              <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                <div className="w-full">
                  <h2 className="ml-2  text-2xl font-semibold">Survey Title</h2>
                  <input
                    type="text"
                    placeholder="Enter the title here"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value)
                    }}
                    className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <h2 className="ml-2 mt-5 text-2xl font-bold text-indigo-900">
                Questions
              </h2>
              {questions.map((e, index) => {
                return e.name == 'short-text' || e.name == 'long-text' ? (
                  <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                    {/* Input box for question */}
                    <div className="w-full">
                      <h2 className="ml-2 font-semibold">
                        {e.id} |{' '}
                        {e.name == 'short-text' ? 'Short Text' : 'Long Text'}{' '}
                        Question
                      </h2>
                      <input
                        type="text"
                        placeholder="Enter your question here"
                        value={e.value}
                        onChange={(event) => {
                          const updatedArray = questions.map((item) => {
                            if (item.id == questions[index].id)
                              return { ...item, value: event.target.value }
                            else return item
                          })
                          setQuestions(updatedArray)
                        }}
                        className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex w-full justify-end">
                      <button
                        className="rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                        onClick={() => {
                          const newQuestions = [...questions]
                          newQuestions.splice(index, 1)
                          setQuestions(newQuestions)
                          setViewOptions(0)
                          setCurrentQuestion(null)
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ) : e.name == 'multiple-choice' ? (
                  <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                    <div className="w-full">
                      <h2 className="ml-2 font-semibold">
                        Multiple Choice Question
                      </h2>
                      <input
                        type="text"
                        placeholder="Enter your question here"
                        value={e.value}
                        className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                        onChange={(event) => {
                          const updatedArray = questions.map((item) => {
                            if (item.id == questions[index].id)
                              return { ...item, value: event.target.value }
                            else return item
                          })
                          setQuestions(updatedArray)
                        }}
                      />
                      <h2 className="ml-2 font-semibold">Options</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {e.options != null &&
                          e.options?.map((op, idx) => {
                            return (
                              <input
                                type="text"
                                placeholder={'Option' + (idx + 1)}
                                value={op.value}
                                className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                                onChange={(event) => {
                                  const updatedOptions = [...e.options]
                                  updatedOptions[idx] = event.target.value
                                  const updatedArray = questions.map((item) => {
                                    if (item.id == questions[index].id) {
                                      return {
                                        ...item,
                                        options: updatedOptions,
                                      }
                                    } else return item
                                  })
                                  // console.log('Final Updated Array', updatedArray)
                                  setQuestions(updatedArray)
                                  // console.log(questions)
                                }}
                              />
                            )
                          })}
                        <button
                          className="my-3  rounded-xl bg-[#50C878] px-4 py-2 text-white"
                          onClick={() => {
                            const updatedOptions = [...e.options]
                            updatedOptions.push('')
                            const updatedArray = questions.map((item) => {
                              if (item.id == questions[index].id)
                                return { ...item, options: updatedOptions }
                              else return item
                            })
                            setQuestions(updatedArray)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex w-full justify-end">
                      <button
                        className="rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                        onClick={() => {
                          const newQuestions = [...questions]
                          newQuestions.splice(index, 1)
                          setQuestions(newQuestions)
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              })}
              {currentQuestion != null && (
                <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-gray-500 p-5 text-white">
                  {/* Input box for question */}
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">Question</h2>
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      value={currentQuestion.value}
                      className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                      onChange={(e) => {
                        setCurrentQuestion({
                          ...currentQuestion,
                          value: e.target.value,
                        })
                        // console.log(currentQuestion)
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      className="mx-2 rounded-xl bg-[#50C878] px-4 py-2 text-white"
                      onClick={() => {
                        const existingQuestions = [...questions]
                        existingQuestions.push(currentQuestion)
                        // console.log(existingQuestions)
                        setQuestions(existingQuestions)
                        setCurrentQuestion(null)
                        setViewOptions(0)
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="mx-2 rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                      onClick={() => {
                        setCurrentQuestion(null)
                        setViewOptions(0)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              )}
              {viewOptions == 1 ? (
                <div className="mr-4 flex justify-around gap-4">
                  <button
                    className=" mt-8  grow  rounded-xl bg-gray-500 px-4 py-2 text-white"
                    onClick={() => {
                      setCurrentQuestion({
                        name: 'short-text',
                        id: questions.length + 1,
                      })
                      setViewOptions(2)
                    }}
                  >
                    Short Text Answer
                  </button>
                  <button
                    className="mt-8 grow rounded-xl bg-gray-500 px-4 py-2 text-white"
                    onClick={() => {
                      setCurrentQuestion({
                        name: 'long-text',
                        id: questions.length + 1,
                      })
                      setViewOptions(3)
                    }}
                  >
                    Long Text Answer
                  </button>
                  <button
                    className="mt-8 grow rounded-xl bg-gray-500 px-4 py-2 text-white"
                    onClick={() => {
                      setCurrentQuestion({
                        name: 'multiple-choice',
                        id: questions.length + 1,
                        options: [],
                      })
                      setViewOptions(4)
                    }}
                  >
                    Options Answer
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    className="mt-8  rounded-xl bg-indigo-500 px-4 py-2 text-white"
                    onClick={() => {
                      setViewOptions(1)
                    }}
                  >
                    +
                  </button>
                </div>
              )}
              {questions.length > 0 && (
                <div className="flex justify-end">
                  <button
                    className="mr-4 rounded-xl bg-[#50C878] p-2 text-xl font-semibold text-white"
                    onClick={(e) => {
                      // console.log(questions)
                      // console.log(title)
                      // Submit Form
                      handleClick(e)
                    }}
                  >
                    <FontAwesomeIcon icon={faRocket} /> &nbsp; Create
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </PrivateRoute>
    </>
  )
}
