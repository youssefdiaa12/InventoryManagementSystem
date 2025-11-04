import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  XCircle,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
} from "lucide-react";

import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/Progress";
import { Button } from "@/Components/ui/button";

// === Interfaces ===
interface Product {
  id: number;
  name: string;
  quantity: number;
  threshold: number;
}

interface Transaction {
  id: number;
  product: { name: string };
  user: { name: string };
  type: string;
  quantity: number;
  reason: string;
  created_at: string;
}

interface Stats {
  totalStock: number;
  lowStock: number;
  outOfStock: number;
  inventoryValue: number;
}

interface PageProps {
  stats: Stats;
  recentTransactions: Transaction[];
  lowStockAlerts: Product[];
  topProducts: Product[];
}

// === Helper Functions ===
const getProgressColor = (quantity: number, threshold: number) => {
  if (quantity <= threshold / 2) return "bg-red-500";
  if (quantity <= threshold) return "bg-yellow-500";
  return "bg-green-500";
};

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(val);

// === Main Component ===
export default function StockManagement() {
  const { stats, recentTransactions, lowStockAlerts, topProducts } =
    usePage<PageProps>().props;

  return (
    <DashboardLayout>
      <Head title="Stock Management" />

      {/* === Header === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        Stock Management
        </h1>
        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
          <Link href="/stock" className="flex items-center gap-2 justify-center">
            <PlusCircle className="w-4 h-4" />
            <span>New Transaction</span>
          </Link>
        </Button>
      </div>

      {/* === Stats Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Stock" value={stats.totalStock.toLocaleString()} icon={<Package className="text-blue-500" />} />
        <StatCard title="Low Stock Items" value={stats.lowStock} icon={<AlertTriangle className="text-yellow-500" />} />
        <StatCard title="Out of Stock" value={stats.outOfStock} icon={<XCircle className="text-red-500" />} />
        <StatCard title="Inventory Value" value={formatCurrency(stats.inventoryValue)} icon={<Coins className="text-green-600" />} />
      </div>

      {/* === Transactions + Alerts === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === Recent Transactions === */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <Card className="shadow-md border-t-4 border-blue-100 h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg font-semibold">
                Recent Transactions
                <Link href={route('stock.transactions')} className="text-sm text-blue-600 hover:underline">
                  View All →
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
                  {recentTransactions.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center border-b pb-2 last:border-none"
                    >
                      <div>
                        <p className="font-medium text-gray-800 truncate max-w-[180px] sm:max-w-none">
                          {t.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t.reason} — by {t.user?.name}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          t.type === "in"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.type === "in" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                        {t.type === "in" ? "+" : "-"}
                        {t.quantity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">
                  No recent transactions 📭
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* === Low Stock Alerts === */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-md border-t-3 border-yellow-200">
            <CardHeader>
              <CardTitle>⚠️ Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockAlerts.length > 0 ? (
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                  {lowStockAlerts.map((p) => {
                    const progress = Math.min((p.quantity / p.threshold) * 100, 100);
                    return (
                      <div key={p.id}>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span className="text-gray-700">{p.name}</span>
                          <span className="text-gray-600">
                            {p.quantity}/{p.threshold}
                          </span>
                        </div>
                        <Progress
                          value={progress}
                          className={`h-2 rounded-full ${getProgressColor(p.quantity, p.threshold)}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">
                  All products are sufficiently stocked 🎉
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* === Top Products === */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
        <Card className="shadow-md border-t-4 border-green-200">
          <CardHeader>
            <CardTitle>🏆 Top 10 Products by Stock Level</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {topProducts.map((p) => (
                  <div key={p.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{p.name}</span>
                      <span className="text-gray-600">{p.quantity}</span>
                    </div>
                    <Progress
                      value={(p.quantity / topProducts[0].quantity) * 100 || 0}
                      className={`h-2 rounded-full ${getProgressColor(p.quantity, p.threshold || 1)}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">
                No products found 📦
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}

//  StatCard Component 
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
}) {
  return (
    <motion.div whileHover={{ y: -3, scale: 1.02 }}>
      <Card className="shadow-sm hover:shadow-lg transition-all rounded-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-800 truncate">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
