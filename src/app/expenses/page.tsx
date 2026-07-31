"use client";
import {
  ExpenseByCategorySummary,
  useGetExpenseByCategoryQuery,
} from "@/state/api";
import { useMemo, useState } from "react";
import Header from "../(components)/Header";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Sector,
  Tooltip,
  Legend,
} from "recharts";
import type { PieSectorShapeProps } from "recharts";

type AggregatedDataItem = {
  name: string;
  fill: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

interface CustomSectorProps {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload: AggregatedDataItem;
  index?: number;
}

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isError,
    isLoading,
  } = useGetExpenseByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  function stringToColor(str: string): string {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += value.toString(16).padStart(2, "0");
    }

    return color;
  }

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          (!startDate || new Date(data.date) >= new Date(startDate)) &&
          (!endDate || new Date(data.date) <= new Date(endDate));
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = Number(data.amount);

        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
            fill: stringToColor(data.category),
          };
        }

        acc[data.category].amount += amount;

        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  if (isLoading) {
    return <div className='py-4'>Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className='text-center text-red-500 py-4'>
        Failed to fetch expenses
      </div>
    );
  }

  const CustomSector = (props: PieSectorShapeProps) => {
    const { payload, index } = props;

    return (
      <Sector
        {...props}
        fill={
          index === activeIndex
            ? "rgb(29, 78, 216)"
            : (payload as AggregatedDataItem | undefined)?.fill
        }
      />
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className='mb-5'>
        <Header name='Expenses' />
        <p className='text-sm text-gray-500'>
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <div className='w-full md:w-1/3 bg-white shadow rounded-lg p-6'>
          <h3 className='text-lg font-semibold mb-4'>
            Filter by Category and Date
          </h3>
          {/* CATEGORY */}
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='category'
                className={classNames.label}
              >
                Category
              </label>
              <select
                name='category'
                id='category'
                className={classNames.selectInput}
                defaultValue='All'
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label
                htmlFor='start-date'
                className={classNames.label}
              >
                Start Date
              </label>
              <input
                type='date'
                name='start-date'
                id='start-date'
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* END DATE */}
            <div>
              <label
                htmlFor='end-date'
                className={classNames.label}
              >
                End Date
              </label>
              <input
                type='date'
                name='end-date'
                id='end-date'
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className='flex-grow bg-white shadow rounded-lg p-4 md:p-6'>
          <ResponsiveContainer
            width='100%'
            height={400}
          >
            <PieChart>
              <Pie
                data={aggregatedData}
                dataKey='amount'
                cx='50%'
                cy='50%'
                outerRadius={150}
                label
                shape={CustomSector}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              />
              <Tooltip />
              <Legend
                formatter={(value) => (
                  <span className='text-gray-600 dark:text-gray-500'>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
