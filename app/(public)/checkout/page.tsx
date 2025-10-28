const Checkout = () => {
    return(
        <div className="bg-white container mx-auto">
        <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
            

            <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
                <form>
                    <div>
                        <h2 className="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
                        <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                                <input type="text" placeholder="Enter First Name"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                                <input type="text" placeholder="Enter Last Name"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">Email</label>
                                <input type="email" placeholder="Enter Email"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                                <input type="number" placeholder="Enter Phone No."
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                                <input type="text" placeholder="Enter Address Line"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">City</label>
                                <input type="text" placeholder="Enter City"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">State</label>
                                <input type="text" placeholder="Enter State"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                                <input type="text" placeholder="Enter Zip Code"
                                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                                <div>
                                    <div className="flex items-center">
                                        <input type="radio" name="method" className="w-5 h-5 cursor-pointer" id="card" checked />
                                        <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                            <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                            <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                        </label>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-500 font-medium">Pay with your debit or credit card</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                                <div>
                                    <div className="flex items-center">
                                        <input type="radio" name="method" className="w-5 h-5 cursor-pointer" id="paypal" />
                                        <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                        </label>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-500 font-medium">Pay with your paypal account</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 max-w-md">
                        <p className="text-slate-900 text-sm font-medium mb-2">Do you have a promo code?</p>
                        <div className="flex gap-4">
                            <input type="email" placeholder="Promo code"
                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                            <button type='button' className="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer">
                                Apply
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
                <div className="relative h-full">
                    <div className="px-6 py-8 md:overflow-auto md:h-screen">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                                    <img src='https://bjsignworld.com/wp-content/uploads/2025/02/Automative-Brochure.jpg' className="w-full object-contain" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-sm text-slate-900 font-semibold">brochures</h3>
                                    <ul className="text-xs text-slate-900 space-y-2 mt-3">
                                        <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">25</span></li>
                                        <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto font-semibold">$40</span></li>
                                    </ul>
                                </div>
                            </div>

                          
                        </div>
                        <hr className="border-gray-300 my-8" />
                        <div>
                            <ul className="text-slate-500 font-medium space-y-4">
                                <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-slate-900">$102.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold text-slate-900">$6.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold text-slate-900">$5.00</span></li>
                                <hr className="border-slate-300" />
                                <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span className="ml-auto">$113.00</span></li>
                            </ul>

                            <div className="mt-8">
                                <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Complete Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Checkout