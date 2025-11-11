"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OptionValue = {
  id: number;
  label: string;
  value: number;
  discount?: number;
  optionId: number;
};

type ProductOption = {
  id: number;
  name: string;
  type: "select";
  productId: number;
  optionValues: OptionValue[];
};

type Product = {
  id: number;
  name?: string;
  price: number;
  productOptions: ProductOption[];
};

export default function PriceCalculator({ product }: { product?: Product }) {
  const [formValues, setFormValues] = useState<Record<string, OptionValue>>({});

  // ✅ Set first option as default
  useEffect(() => {
    if (!product?.productOptions) return;

    const defaults: Record<string, OptionValue> = {};
    product.productOptions.forEach((option) => {
      if (option.optionValues.length > 0) {
        defaults[option.name] = option.optionValues[0];
      }
    });
    setFormValues(defaults);
  }, [product]);

  // ✅ Handle select change
  const handleChange = (optionName: string, valueLabel: string, optionList: OptionValue[]) => {
    const selected = optionList.find((opt) => opt.label === valueLabel);
    if (selected) {
      setFormValues((prev) => ({ ...prev, [optionName]: selected }));
    }
  };

  // ✅ Calculate price
  const { basePrice, discountAmount, finalPrice } = useMemo(() => {
    if (!product) return { basePrice: 0, discountAmount: 0, finalPrice: 0 };

    let total = product.price; // start with base product price
    let quantityValue = 1;
    let discount = 0;

    Object.entries(formValues).forEach(([name, opt]) => {
      if (name.toLowerCase() === "quantity") {
        // Quantity multiplies
        quantityValue = opt.value > 0 ? opt.value : 1;
        if (opt.discount && opt.discount > 0) {
          discount = opt.discount;
        }
      } else {
        // Other options add to price
        if (opt.value > 0) {
          total += opt.value;
        }
      }
    });

    // Multiply by quantity
    const totalWithQty = total * quantityValue;

    // Apply discount if available
    const discountAmount = (totalWithQty * discount) / 100;
    const finalPrice = totalWithQty - discountAmount;

    return { basePrice: totalWithQty, discountAmount, finalPrice };
  }, [formValues, product]);

  if (!product?.productOptions) {
    return <p className="text-gray-500">Loading product options...</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {product.productOptions.map((option) => (
          <div key={option.id} className="mb-3 w-[48%]">
            <label className="block font-bold mb-1 text-gray-700">{option.name}</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formValues[option.name]?.label || ""}
              onChange={(e) => handleChange(option.name, e.target.value, option.optionValues)}
            >
              {option.optionValues.map((opt) => (
                <option key={opt.id} value={opt.label}>
                  {opt.label} {opt.discount ? `(Discount ${opt.discount}%)` : ""}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded mt-3">
        <p className="text-gray-700">Base Product Price: ${product.price.toFixed(2)}</p>
        <p className="text-gray-700">Subtotal (with options): ${basePrice.toFixed(2)}</p>
        <p className="text-gray-700">
          Discount: <span className="text-green-700 font-bold">-${discountAmount.toFixed(2)}</span>
        </p>
        <p className="text-xl mt-2">
          Total Price: <span className="text-2xl font-bold">${finalPrice.toFixed(2)}</span>
        </p>
      </div>

      <div className="mt-3">
        <Link
          href="/checkout"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 -ms-2 me-2"
            xmlns="http://www.w3.org/2000/svg"
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
        </Link>
      </div>
    </div>
  );
}
