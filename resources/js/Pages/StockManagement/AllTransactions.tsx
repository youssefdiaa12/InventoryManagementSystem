import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  ChevronRight,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@headlessui/react";

interface Transaction {
  id: number;
  product: { name: string; cost?: number };
  user: { name: string };
  type: string;
  quantity: number;
  reason: string;
  created_at: string;
}

interface PageProps {
  transactions: Transaction[];
}

export default function AllTransactions() {
  const { transactions } = usePage<PageProps>().props;
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");

  // === Totals ===
  const totalInbound = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.quantity, 0);

  const totalOutbound = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.quantity, 0);

  const totalCost = transactions.reduce((sum, t) => {
    const cost = t.product?.cost ?? 0;
    return sum + t.quantity * cost;
  }, 0);

  const netChange = totalInbound - totalOutbound;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.product?.name.toLowerCase().includes(search.toLowerCase()) ||
      t.user?.name.toLowerCase().includes(search.toLowerCase()) ||
      t.reason.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "all" ? true : t.type.toLowerCase() === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <Head title="All Transactions" />

      {/* === Breadcrumbs === */}
      <nav className="flex items-center flex-wrap text-sm text-gray-500 mb-6 gap-1 sm:gap-2">
        <Link
          href="/stockmanagement"
          className="hover:text-gray-700 transition font-medium"
        >
          Stock Management
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-800 font-semibold">All Transactions</span>
      </nav>

      {/* === Header === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Stock Transactions
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Overview of all inbound and outbound inventory movements.
        </p>
      </div>

      {/* === Summary Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Inbound */}
        <Card className="shadow-sm border-l-4 border-green-500 bg-green-50/60 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Total Inbound
            </CardTitle>
            <ArrowDownRight className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              +{totalInbound.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">
              Total items received into stock.
            </p>
          </CardContent>
        </Card>

        {/* Outbound */}
        <Card className="shadow-sm border-l-4 border-red-500 bg-red-50/60 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              Total Outbound
            </CardTitle>
            <ArrowUpRight className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              -{totalOutbound.toLocaleString()}
            </div>
            <p className="text-xs text-red-600 mt-1">
              Total items issued from stock.
            </p>
          </CardContent>
        </Card>

        {/* Net Change */}
        <Card className="shadow-sm border-l-4 border-blue-500 bg-blue-50/60 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Net Change
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                netChange >= 0 ? "text-blue-700" : "text-red-700"
              }`}
            >
              {netChange >= 0 ? "+" : ""}
              {netChange.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Difference between inbound and outbound.
            </p>
          </CardContent>
        </Card>

        {/* Total Cost */}
        {/* <Card className="shadow-sm border-l-4 border-amber-500 bg-amber-50/60 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">
              Total Inventory Cost
            </CardTitle>
            <DollarSign className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              ${totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-amber-600 mt-1">
              Estimated total cost value of all transactions.
            </p>
          </CardContent>
        </Card> */}
      </div>

      {/* === Filters === */}
      <div className="sticky top-0 z-10  bg-white/70 backdrop-blur-md border-b border-gray-100 mb-6 p-3 sm:p-0 rounded-md">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search product, user, or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full focus:ring-2 focus:ring-blue-500 transition rounded-md border border-gray-200 py-2 text-sm"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All", color: "bg-gray-100 text-gray-700" },
              {
                key: "in",
                label: "Inbound",
                color: "bg-green-100 text-green-700",
              },
              {
                key: "out",
                label: "Outbound",
                color: "bg-red-100 text-red-700",
              },
            ].map(({ key, label, color }) => (
              <Button
                key={key}
                variant={filterType === key ? "default" : "outline"}
                onClick={() => setFilterType(key as any)}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-md shadow-sm text-xs sm:text-sm font-medium transition-all ${
                  filterType === key
                    ? `${color} ring-1 ring-offset-1 ring-gray-300`
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                {key === "in" && <ArrowDownRight className="w-4 h-4" />}
                {key === "out" && <ArrowUpRight className="w-4 h-4" />}
                {key === "all" && <Filter className="w-4 h-4" />}
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* === Transactions Table === */}
      <Card className="shadow-sm border border-gray-100 overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 flex justify-between items-center">
            Transaction History
            <span className="text-xs sm:text-sm font-normal text-gray-500">
              {filteredTransactions.length} records
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Item</th>
                    <th className="py-3 px-4 whitespace-nowrap">Type</th>
                    <th className="py-3 px-4 whitespace-nowrap">Qty</th>
                    <th className="py-3 px-4 whitespace-nowrap">Reason</th>
                    <th className="py-3 px-4 whitespace-nowrap">User</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, index) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                        {t.product?.name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                            t.type === "in"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.type === "in" ? (
                            <ArrowDownRight size={12} />
                          ) : (
                            <ArrowUpRight size={12} />
                          )}
                          {t.type === "in" ? "Inbound" : "Outbound"}
                        </span>
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          t.type === "in" ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {t.type === "in" ? "+" : "-"}
                        {t.quantity}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{t.reason}</td>
                      <td className="py-3 px-4 text-gray-600">{t.user?.name}</td>
                      <td className="py-3 px-4 text-gray-500 text-right whitespace-nowrap">
                        {new Date(t.created_at).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-base font-medium">No transactions found 📭</p>
              <p className="text-sm mt-1">
                Try adjusting filters or check back later.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
