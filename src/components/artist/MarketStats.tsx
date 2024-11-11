import { useEffect, useState } from 'react';
import { DiscogsClient } from '@/lib/discogs';
import { Disclosure } from '@headlessui/react';
import { ChevronDown, DollarSign, TrendingUp, History } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface MarketData {
  prices: number[];
  dates: string[];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  totalListings: number;
  recentSales: {
    price: number;
    date: string;
    condition: string;
  }[];
}

interface MarketStatsProps {
  releaseId: number;
}

export function MarketStats({ releaseId }: MarketStatsProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarketData() {
      setIsLoading(true);
      setError(null);
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getMarketData(releaseId);
        setMarketData(data);
      } catch (err) {
        setError('Failed to load market data');
        console.error('Failed to fetch market data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarketData();
  }, [releaseId]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/50 p-4 text-red-800 dark:text-red-200">
        <p>Unable to load market data. Please try again later.</p>
      </div>
    );
  }

  const chartData = marketData.prices.map((price, index) => ({
    date: marketData.dates[index],
    price,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Lowest Price</p>
          </div>
          <p className="mt-2 text-2xl font-bold">${marketData.lowestPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
          </div>
          <p className="mt-2 text-2xl font-bold">${marketData.averagePrice.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Based on {marketData.totalListings} listings</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Highest Price</p>
          </div>
          <p className="mt-2 text-2xl font-bold">${marketData.highestPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Price History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#4f46e5" 
                fillOpacity={1}
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-2">
        <Disclosure>
          {({ open }) => (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Recent Sales</h3>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-gray-500 transition-transform', {
                  'transform rotate-180': open,
                })} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <div className="space-y-4">
                  {marketData.recentSales.map((sale, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{sale.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Condition: {sale.condition}
                        </p>
                      </div>
                      <p className="font-medium">${sale.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}