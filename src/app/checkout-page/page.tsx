"use client";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [selectedShipping, setSelectedShipping] = useState("radio_1");

  return (
    <main className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-20">
        <div className="px-4 pt-8">
          <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
            סיכום הזמנה
          </h2>
          <p className="text-gray-400">
            בדוק את הפריטים שלך ובחר שיטת משלוח מתאימה.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                height={200}
                width={200}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Nike Air Max Pro 8888 - קל במיוחד
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg font-bold">138.99$</p>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                height={200}
                width={200}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Nike Air Max Pro 8888 - קל במיוחד
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="mt-auto text-lg font-bold">238.99$</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-lg font-medium">שיטות משלוח</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked={selectedShipping === "radio_1"}
                onChange={() => setSelectedShipping("radio_1")}
              />
              <span className="peer-checked:border-gray-700 absolute left-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <div className="ml-5">
                  <span className="mt-2 font-semibold">משלוח פדקס</span>
                  <p className="text-slate-500  leading-6">משלוח: 2-4 ימים</p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked={selectedShipping === "radio_2"}
                onChange={() => setSelectedShipping("radio_2")}
              />
              <span className="peer-checked:border-gray-700 absolute left-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <div className="ml-5">
                  <span className="mt-2 font-semibold">משלוח פדקס</span>
                  <p className="text-slate-500  leading-6">משלוח: 2-4 ימים</p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
            פרטי תשלום{" "}
          </h2>
          <p className="text-gray-400">
            השלם את ההזמנה על ידי מתן פרטי התשלום שלך.
          </p>
          <div className="">
            <label htmlFor="email" className="mt-4 mb-2 block  font-medium">
              אימייל
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block  font-medium"
            >
              בעל הכרטיס
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11  uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="שם מלא כאן"
              />
            </div>
            <label htmlFor="card-no" className="mt-4 mb-2 block  font-medium">
              פרטי כרטיס
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-200 px-2 py-3  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="חודש/שנה"
              />
              <input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block  font-medium"
            >
              כתובת לחיוב
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="כתובת רחוב"
                />
              </div>
              <select
                defaultValue="State"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">מדינה</option>
                <option value="CA">קליפורניה</option>
                <option value="NY">ניו יורק</option>
              </select>
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3  shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="מיקוד"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className=" font-medium text-gray-900">סה&quot;כ ביניים</p>
                <p className="font-semibold text-gray-900">$399.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className=" font-medium text-gray-900">משלוח</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className=" font-medium text-gray-900">סה&quot;כ</p>
              <p className="text-2xl font-semibold text-gray-900">$408.00</p>
            </div>
          </div>
          <button className="mt-4 mb-8 w-full rounded-md bg-customGreen px-6 py-3 font-medium text-white">
            בצע הזמנה
          </button>
        </div>
      </div>
    </main>
  );
}
