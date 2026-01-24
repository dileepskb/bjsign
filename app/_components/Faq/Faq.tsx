"use client"
import { Product } from "@/types/ProductTypes";
import { useState } from "react";

export interface FAQ {
  id: number;
  question: string;
  answer: string;

}
interface ProductClientProps {
  products: Product | null;
}

const Faq = ({products}:ProductClientProps) => {
    const [activeIndex, setActiveIndex] = useState(0); // first open by default
    const faqs = products?.faq || []

   const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
    return(
     <section className="px-4">
      <div className="mx-auto">
        <div className="mb-5">
          <h2
            className="text-2xl text-center font-bold text-gray-900 "
          >
            Frequently asked questions
          </h2>
        </div>
        <div className="accordion-group space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`accordion border border-solid rounded-xl p-4 transition-all duration-500 ${
            activeIndex === index
              ? "bg-orange-50 border-orange-600"
              : "border-gray-300"
          }`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="accordion-toggle group flex w-full items-center justify-between text-left text-lg font-medium text-gray-900 transition-all duration-300 hover:text-orange-600"
          >
            <h5 className="font-bold">{faq.question}</h5>
            {activeIndex === index ? (
              // minus icon when open
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12h12"
                />
              </svg>
            ) : (
              // plus icon when closed
              <svg
                className="w-6 h-6 text-gray-900 group-hover:text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            )}
          </button>

          <div
            className={`accordion-content transition-all duration-500 overflow-hidden ${
              activeIndex === index ? "max-h-40 mt-2" : "max-h-0"
            }`}
          >
            <p className="text-base text-gray-700 leading-6">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
      </div>
    </section>
                                            
    )
}

export default Faq