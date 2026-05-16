"use client"

import Link from "next/link"
import React from "react"
import { useSearchParams } from "next/navigation"

function RegisterForBothtView() {

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-white px-4 mt-20">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Register</h1>
        <p className="text-lg text-gray-700">
          Choose the register option that fits with your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">

        {/* Usuario */}
        <Link href={`/register/user?token=${token}`}>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#1b5e20]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-[#1b5e20]">
                I'm a user
              </h2>
              <p className="text-gray-600 mb-6">
                Register as a user to explore adventures and experiences
              </p>
              <button className="px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#155019]">
                Register as a User
              </button>
            </div>
          </div>
        </Link>

        {/* Instructor */}
        <Link href={`/register/instructor?token=${token}`}>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#1b5e20]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-[#1b5e20]">
                I'm an Instructor
              </h2>
              <p className="text-gray-600 mb-6">
                Register as an instructor to share your work.
              </p>
              <button className="px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#155019]">
                Register as an Instructor
              </button>
            </div>
          </div>
        </Link>

      </div>

      <div className="mt-12">
        <Link href="/" className="text-[#1b5e20] font-semibold hover:underline">
          ← Home
        </Link>
      </div>

    </div>
  )
}

export default RegisterForBothtView