/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {  AdditionalDescription, Product } from "../Product/Product";


interface Tab {
  id: string;
  label: string;
  content?:React.ReactNode
}



interface ProductClientProps {
  products: Product | null;
}

const Tabs = ({products}:ProductClientProps) => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const HtmlContent = ({ html }: { html?: string }) => {
  if (!html) return null;

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

  const tabs: Tab[] = [
    { id: "tab1", label: "Description", content: <HtmlContent html={products?.description} /> },
    { id: "tab2", label: "Additional Details", content: <Tabledata products={products} /> },
    { id: "tab3", label: "Rating", content: "This is the Settings content." },
  ];



  return (
    <div >
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;

const Tabledata = ({products}:any) => {
    return(
       <>
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200">
       <tbody>
            
            {products?.additionalDescriptions?.map((item:AdditionalDescription, index:number) => {
              return(
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                 <td className="border-r border-r-gray-200 p-2 font-medium text-black">{item?.name}</td>
                  <td className="p-2">{item?.value}</td>
                </tr>
              )
            })}
          </tbody>  
         </table>
       </>
    )
  }
