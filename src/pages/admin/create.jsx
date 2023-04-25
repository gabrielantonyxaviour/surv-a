import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useState } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function create() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [viewOptions, setViewOptions] = useState(false)
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
              return e.type == 'text' ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  {/* Input box for question */}
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">Question</h2>
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                      onChange={(e) => {
                        setQuestions(...questions, {
                          id:
                            questions[questions.length - 1] != null
                              ? questions[questions.length - 1].id + 1
                              : 0,
                          question: e.target.value,
                          type: 'text',
                          options: [],
                          required: true,
                        })
                      }}
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
                        setViewOptions(true)
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
            {viewOptions == 1 ? (
              <div className="flex justify-around gap-4">
                <button
                  className="mt-8 grow  rounded-xl bg-indigo-500 px-4 py-2 text-white"
                  onClick={() => {
                    setQuestions([
                      ...questions,
                      {
                        id: questions.length + 1,
                        question: '',
                        type: 'text',
                        options: [],
                        required: false,
                      },
                    ])
                    setViewOptions(false)
                  }}
                >
                  Text answer
                </button>
                <button
                  className="mt-8 grow rounded-xl bg-indigo-500 px-4 py-2 text-white"
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
                    setViewOptions(false)
                  }}
                >
                  Options answer
                </button>
                <button
                  className="mt-8 grow rounded-xl bg-indigo-500 px-4 py-2 text-white"
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
                    setViewOptions(false)
                  }}
                >
                  Slider answer
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  className="mt-8  rounded-xl bg-indigo-500 px-4 py-2 text-white"
                  onClick={() => {
                    setViewOptions(true)
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
