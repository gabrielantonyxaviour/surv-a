import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useState } from 'react'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function create() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [viewOptions, setViewOptions] = useState(0)
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
              Survey Builder
            </h1>
            <p className=" text-md  ml-2 font-medium text-black">
              Click the + icon to create questions!
            </p>
            {questions.map((e, index) => {
              return e.name == 'short-text' || 'long-text' ? (
                <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  {/* Input box for question */}
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">
                      {e.id} |{' '}
                      {e.name == 'short-text' ? 'Short Text' : 'Long Text'}{' '}
                      Question
                    </h2>
                    {<p>{questions[index].value}</p>}
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      value={questions[index].value}
                      onChange={(event) => {
                        const updatedQuestions = questions
                        updatedQuestions[index] = {
                          ...questions[index],
                          value: event.target.value,
                        }
                        console.log(updatedQuestions)

                        setQuestions(updatedQuestions)
                        console.log(questions[index].value)
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
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ) : e.type == 'radio' ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  {/* Input box for question */}
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">Question</h2>
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                      onChange={(e) => {
                        setQuestions([
                          ...questions,
                          {
                            id:
                              questions[questions.length - 1] != null
                                ? questions[questions.length - 1].id + 1
                                : 0,
                            question: e.target.value,
                            type: 'text',
                            options: [],
                            required: true,
                          },
                        ])
                      }}
                    />
                    <h2 className="ml-2 font-semibold">Options</h2>
                    {e.options.map((op, index) => {
                      return
                    })}
                    <button
                      className="mt-8  rounded-xl bg-[#50C878] px-4 py-2 text-white"
                      onClick={() => {
                        // setViewOptions(true)
                      }}
                    >
                      +
                    </button>
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
                      //  setCurrentQuestion(...questions, {
                      //    id:
                      //      questions[questions.length - 1] != null
                      //        ? questions[questions.length - 1].id + 1
                      //        : 0,
                      //    question: e.target.value,
                      //    type: 'text',
                      //    options: [],
                      //    required: true,
                      //  })
                      setCurrentQuestion({
                        ...currentQuestion,
                        value: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className="flex w-full justify-end">
                  <button
                    className="mx-2 rounded-xl bg-[#50C878] px-4 py-2 text-white"
                    onClick={() => {
                      const existingQuestions = [...questions]
                      existingQuestions.push(currentQuestion)
                      console.log(existingQuestions)
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
                    setQuestions([
                      ...questions,
                      {
                        id: questions.length + 1,
                        question: '',
                        type: 'radio',
                        options: [],
                        required: false,
                      },
                    ])
                    setViewOptions(3)
                  }}
                >
                  Long Text Answer
                </button>
                <button
                  className="mt-8 grow rounded-xl bg-gray-500 px-4 py-2 text-white"
                  onClick={() => {
                    setQuestions([
                      ...questions,
                      {
                        id: questions.length + 1,
                        question: '',
                        type: 'slider',
                        options: [],
                        required: false,
                      },
                    ])
                    setViewOptions(4)
                  }}
                >
                  Options Answer
                </button>
              </div>
            ) : viewOptions == 2 || viewOptions == 3 ? (
              <></>
            ) : viewOptions == 4 ? (
              <></>
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
          </div>
        </main>
      </div>
    </>
  )
}
