import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import timeDifference from '@/utils/timeDifference'
export default function index() {
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      title: 'Session Feedback',
      description: 'This is a feedback form for the session',
      totalResponses: 223,
      positive: 100,
      negative: 26,
      neutral: 97,
      createdAt: '2020-05-12T12:00:00.000Z',
      updatedAt: '2022-09-12T12:00:00.000Z',
    },
    {
      id: 2,
      title: 'How effective is WFH?',
      description: 'This is a survey to know about effectiveness of WFH',
      totalResponses: 500,
      positive: 64,
      negative: 33,
      neutral: 12,
      createdAt: '2021-11-09T12:00:00.000Z',
      updatedAt: '2021-12-12T12:00:00.000Z',
    },
    {
      id: 3,
      title: 'Goa or Kerala?',
      description: 'Opinion on the best place to visit',
      totalResponses: 1000,
      positive: 200,
      negative: 26,
      neutral: 97,
      createdAt: '2021-09-12T12:00:00.000Z',
      updatedAt: '2021-10-12T12:00:00.000Z',
    },
    {
      id: 4,
      title: 'Goa or Kerala?',
      description: 'Opinion on the best place to visit',
      totalResponses: 1000,
      positive: 200,
      negative: 26,
      neutral: 97,
      createdAt: '2021-09-12T12:00:00.000Z',
      updatedAt: '2021-10-12T12:00:00.000Z',
    },
  ])
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
              {surveys.map((e) => {
                return (
                  <button
                    className="rounded-xl border-[1px] border-slate-100 bg-white py-4 text-black drop-shadow-xl transition delay-150 duration-300 ease-in-out hover:border-none hover:bg-indigo-500 hover:text-white"
                    onClick={() => {
                      window.location = '/admin/1'
                    }}
                  >
                    <h1 className="px-4 text-lg font-bold">{e.title}</h1>
                    <div className=" h-[60px] px-4">
                      <p className="text-sm font-normal ">{e.description}</p>
                    </div>
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
                        Created {timeDifference(e.createdAt)}
                      </p>
                      <p className="text-xs">
                        Updated {timeDifference(e.updatedAt)}
                      </p>
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
