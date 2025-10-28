"use client";

import { useState } from "react";

type OptionValue = {
  label: string;
  value: number;
  discount?: number; // percentage
};

type ProductOption = {
  name: string;
  type: "select" | "radio"; // extensible later
  optionValue: OptionValue[];
};

const productOption: ProductOption[] = [
  {
    name: "Size",
    type: "select",
    optionValue: [
      { label: "A4", value: 20 },
      { label: "10X20", value: 25 },
    ],
  },
  {
    name: "Quantity",
    type: "select",
    optionValue: [
      { label: "1", value: 1, discount: 0 },
      { label: "10", value: 10, discount: 1 },
      { label: "20", value: 20, discount: 20 },
    ],
  },
];

export default function PriceCalculator() {
  // store selected values dynamically
  const [formValues, setFormValues] = useState<Record<string, OptionValue>>({});

  // handle selection change
  const handleChange = (optionName: string, valueLabel: string, optionList: OptionValue[]) => {
    const selected = optionList.find((opt) => opt.label === valueLabel);
    if (selected) {
      setFormValues((prev) => ({ ...prev, [optionName]: selected }));
    }
  };

  // calculate price dynamically
  let basePrice = 1;
  let discountAmount = 0;

  if (formValues["Size"] && formValues["Quantity"]) {
    const size = formValues["Size"];
    const quantity = formValues["Quantity"];
    basePrice = size.value * quantity.value;
    discountAmount = (basePrice * (quantity.discount || 0)) / 100;
  }

  const finalPrice = basePrice - discountAmount;

  return (
    <div className="">
    <div className="flex gap-3">
      {/* <h2 className="text-2xl font-bold">Product Calculator</h2> */}

      {productOption.map((option) => (
        <div key={option.name} className="mb-3 w-[50%]">
          <label className="block font-bold mb-1 text-gray-700">{option.name}</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formValues[option.name]?.label || ""}
            onChange={(e) => handleChange(option.name, e.target.value, option.optionValue)}
          >
            <option value="">Select {option.name}</option>
            {option.optionValue.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label} {opt.discount ? `(Discount ${opt.discount}%)` : ""}
              </option>
            ))}
          </select>
        </div>
      ))}

      
    </div>
    <div className="bg-gray-100 p-4 rounded mt-3">
        <p className="text-gray-700">Base Price: ${basePrice.toFixed(2)}</p>
        <p className="text-gray-700">Discount: <span className="text-green-700 font-bold">-${discountAmount.toFixed(2)}</span></p>
        <p className="text-xl  mt-2">Total Price: <span className="text-2xl font-bold">${finalPrice.toFixed(2)}</span></p>
      </div>
       <div className="mt-3">
        <a
              href="#"
              title=""
              className="text-white mt-4 sm:mt-0 bg-red-600  hover:bg-red-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              role="button"
            >
              <svg
                className="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>

              Check Out
            </a>
    </div>
  </div>
   
  );
}
