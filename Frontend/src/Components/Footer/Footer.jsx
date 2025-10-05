import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="overflow-hidden py-4 bg-gray-800 border-t border-t-gray-700 text-gray-300">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-4 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-2 inline-flex items-center">
                                {/* Reduced logo size */}
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; Copyright 2023. All Rights Reserved by ArticleBlock.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-sm font-semibold uppercase text-gray-200">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-sm font-semibold uppercase text-gray-200">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-sm font-semibold uppercase text-gray-200">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-400 hover:text-white"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer