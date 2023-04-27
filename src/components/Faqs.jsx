import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What types of surveys can Surv-A analyze?',
      answer:
        'Surv-A can analyze any type of survey, whether it\'s a customer satisfaction survey, employee feedback survey, or any other type of survey',
    },
    {
      question: 'Can I export my survey data to other software programs?',
      answer: 'Yes , you can export data but only in the form of an image',
    },
    {
      question: 'Does Surv-A offer support if I have any issues?',
      answer:
        'Yes, Surv-A provides customer support through email and chat, and has a comprehensive knowledge base with tutorials and guides',
    },
  ],
  [
    {
      question: 'How much does Surv-A cost?',
      answer:
        'Surv-A offers a range of pricing plans to suit your needs, from free basic accounts to paid plans with more advanced features. Check out our pricing page for more information.',
    },
    {
      question:
        'Is Surv-A secure and reliable?',
      answer:
        'Yes, Surv-A uses secure SSL encryption to protect your data and is hosted on reliable servers with regular backups and maintenance.',
    },
    {
      question:
        'Is my survey data safe with Surv-A?',
      answer:
        'Absolutely - we take data security very seriously at Surv-A. All survey data is stored securely on our servers, and we use industry-standard encryption and security measures to protect your data.',
    },
  ],
  [
    {
      question: 'How many responses can I collect with Surv-A?',
      answer:
        'There is no limit to the number of responses you can collect with Surv-A.',
    },
    {
      question: 'Can we expect more AI features?',
      answer: 'In life it’s really better to never expect anything at all.',
    },
    {
      question: 'I lost my password, how do I get into my account?',
      answer:
        'Send us an email and we will send you a copy of our latest password spreadsheet so you can find your information.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
