import { useState } from "react";
import Heading from "./Heading";

export default function FAQ({ classess }) {
    const [openIndex, setOpenIndex] = useState(null);

    const ToggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }
    const faqs = [
        {
            title: 'How do I choose the right teacher?',
            Decription: 'Use our filters to narrow down teachers by language, experience, and ratings. Read reviews and watch introduction videos to find the best fit.'
        },
        {
            title: 'Can I manage multiple teams and tournaments on my platform?',
            Decription: 'Use our filters to narrow down teachers by language, experience, and ratings. Read reviews and watch introduction videos to find the best fit.'
        },
        {
            title: 'How long does it take to develop a sports website or app?',
            Decription: 'Use our filters to narrow down teachers by language, experience, and ratings. Read reviews and watch introduction videos to find the best fit.'
        },
        {
            title: 'Can I manage multiple teams and tournaments on my platform?',
            Decription: 'Use our filters to narrow down teachers by language, experience, and ratings. Read reviews and watch introduction videos to find the best fit.'
        },
        {
            title: 'How much does it cost to develop a sports website or app?',
            Decription: 'Use our filters to narrow down teachers by language, experience, and ratings. Read reviews and watch introduction videos to find the best fit.'
        },

    ]
    return (
        <div className={`pb-[40px] md:pb-[40px] lg:pb-[60px] ${classess}`}>
            <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
                <Heading classess={'text-[#1E1E1E] mb-3 '} title={'Frequently Asked Questions'} />
                {faqs && faqs?.map((items, index) => (
                    <div key={index} className="border-b border-[#C6C7C8]">
                        <button onClick={() => ToggleFaq(index)} className={`block w-full text-left bg-white border-none py-3 md:py-5 -tracking-[0.04em] font-semibold text-base md:text-lg lg:text-xl cursor-pointer relative pr-20`} >
                            {items.title}
                            {
                                openIndex === index ? (
                                    <span className="text-[#008F70] bg-[#C6E4DE] h-[32px] w-[32px] md:h-[38px] md:w-[38px]  lg:h-[44px] lg:w-[44px] flex items-center justify-center block rounded-full absolute right-0 top-1/2 -translate-y-1/2 ">-</span>
                                ) : (
                                    <span className="text-[#008F70] bg-[#C6E4DE] h-[32px] w-[32px] md:h-[38px] md:w-[38px]  lg:h-[44px] lg:w-[44px] flex items-center justify-center block rounded-full absolute right-0 top-1/2 -translate-y-1/2">+</span>
                                )}
                        </button>
                        <div
                            className={`pb-5 transition-all duration-500 overflow-hidden ${openIndex === index ? "block" : "hidden"
                                }`}>
                            {items.Decription}
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}