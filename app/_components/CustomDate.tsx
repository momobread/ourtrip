'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';

const CustomDate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  useEffect(() => {
    if (range === undefined || range.from === undefined || range.to === undefined) return;
    const params = new URLSearchParams(searchParams);
    params.set('checkIn', `${format(range?.from, 'yyyy-MM-dd')}`);
    params.set('checkOut', `${format(range?.to, 'yyyy-MM-dd')}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, []);

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) return;
    if (!newRange.from) return;

    setRange({
      from: newRange.from,
      to: newRange.to ?? addDays(newRange.from, 1),
    });
  };

  const handleClick = () => {
    if (range === undefined || range.from === undefined || range.to === undefined) return;
    const params = new URLSearchParams(searchParams);
    params.set('checkIn', `${format(range?.from, 'yyyy-MM-dd')}`);
    params.set('checkOut', `${format(range?.to, 'yyyy-MM-dd')}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  console.log(range);
  return (
    <div className="flex items-center justify-center gap-[1rem] border border-primary-600">
      <div className="flex flex-col">
        <span>선택된날짜</span>
        <span>
          {format(`${range?.from}`, 'yyyy-MM-dd')} ~ {format(`${range?.to}`, 'yyyy-MM-dd')}
        </span>
        <button className="bg-amber-400 p-[1rem]" onClick={handleClick}>
          검색하기
        </button>
      </div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        min={1}
        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
      />
    </div>
  );
};
export default CustomDate;
