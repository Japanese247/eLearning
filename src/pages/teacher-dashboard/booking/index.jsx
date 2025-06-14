import React, { useEffect, useMemo, useState } from 'react';
import TeacherLayout from '../Common/TeacherLayout';
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import { formatMultiPrice } from '@/components/ValueDataHook';

export default function Index() {
  const [TabOpen, setTabOpen] = useState('upcoming');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherBooking(TabOpen);
      setData(response?.data?.data || []);
    } catch (error) {
      console.log('error', error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, [TabOpen]);

  return (
    <TeacherLayout>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center mb-4 lg:mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
            Bookings
          </h2>
        </div>

        <div className="">
          <div className="flex flex-wrap gap-5 mb-4">
            <button
              onClick={() => setTabOpen('upcoming')}
              className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-6 lg:px-10 py-3 lg:py-2 rounded-[10px] cursor-pointer ${
                TabOpen === 'upcoming'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setTabOpen('past')}
              className={`text-sm lg:text-lg font-medium tracking-[-0.04em] px-6 lg:px-10 py-3 lg:py-2 rounded-[10px] cursor-pointer ${
                TabOpen === 'past'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
              }`}
            >
              Past
            </button>
          </div>

          <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                <tr>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson date and time
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Student Name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Duration
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Amount
                  </th>
                </tr>
              </thead>
               {loading ? 
                  <TableLoader length={5} />
                :
              <tbody>
                {data && data.length > 0 ? (
                  data?.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                    >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.LessonId?.title}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.UserId?.name}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.LessonId?.duration} min{" "}
                        ({moment(item?.startDateTime).format('hh:mm A')} -{" "}
                        {moment(item?.endDateTime).format('hh:mm A')})
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {formatMultiPrice(item?.teacherEarning, "USD")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="mt-2">
                          <NoData
                              Heading={"No bookings found."}
                              content={
                                  `Your account does not have any ${TabOpen} booking. If a booking is made it will be shown here`
                              }
                          />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>}
            </table>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}