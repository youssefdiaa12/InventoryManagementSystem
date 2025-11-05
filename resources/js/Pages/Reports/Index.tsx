import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
    Download,
    Printer,
    DollarSign,
    TrendingUp,
    Package,
    ArrowDownCircle,
} from "lucide-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

interface ReportProps {
    metrics: {
        totalSales: number;
        totalInbound: number;
        profitMargin: number;
        lowStock: number;
    };
    chartData: { date: string; total: number }[];
    products: {
        name: string;
        sku: string;
        units_sold: number;
        revenue: string | number;
        stock_level: string;
    }[];
    suppliers: { id: number; name: string }[];
    filters: {
        startDate: string;
        endDate: string;
        supplierId?: string | null;
    };
}

export default function Reports({
    metrics,
    chartData,
    products,
    suppliers = [],
    filters = {},
}: ReportProps) {
    const [startDate, setStartDate] = useState(filters.startDate || "");
    const [endDate, setEndDate] = useState(filters.endDate || "");
    const [supplierId, setSupplierId] = useState(filters.supplierId || "");

    const safeNum = (val: any) =>
        typeof val === "number" && !isNaN(val) ? val : 0;

const handleGenerate = () => {
    router.get(
        route("reports.index"),
        { startDate, endDate, supplierId: supplierId || null },
        { preserveState: true, replace: true }
    );
};


    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setSupplierId("");
        router.get(route("reports.index"));
    };

    return (
        <DashboardLayout>
            <Head title="Reports" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                    <p className="text-gray-500">
                        Analyze your stock, supplier, and transaction performance.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <SummaryCard
                        icon={<DollarSign className="w-5 h-5 text-green-600" />}
                        title="Total Sales"
                        color="green"
                        value={`EGP ${safeNum(metrics?.totalSales).toFixed(2)}`}
                    />
                    <SummaryCard
                        icon={<ArrowDownCircle className="w-5 h-5 text-indigo-600" />}
                        title="Total Inbound"
                        color="indigo"
                        value={`$${safeNum(metrics?.totalInbound).toFixed(2)}`}
                    />
                    <SummaryCard
                        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                        title="Profit Margin"
                        color="blue"
                        value={`${safeNum(metrics?.profitMargin).toFixed(2)}%`}
                    />
                    <SummaryCard
                        icon={<Package className="w-5 h-5 text-red-600" />}
                        title="Low Stock Items"
                        color="red"
                        value={safeNum(metrics?.lowStock).toString()}
                    />
                </div>

                {/* Report Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <Card className="p-4 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Generate Report
                        </h2>
                        <div className="space-y-4">
                            {/* Supplier Filter */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Supplier
                                </label>
                                <select
                                    value={supplierId}
                                    onChange={(e) => setSupplierId(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md"
                                >
                                    <option value="">All Suppliers</option>
                                    {suppliers?.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Date Range
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 w-full border-gray-300 rounded-md"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-2 w-full border-gray-300 rounded-md"
                                />
                            </div>

                            <Button
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleGenerate}
                            >
                                Generate Report
                            </Button>

                            <button
                                onClick={handleReset}
                                className="w-full text-blue-600 text-sm hover:underline"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </Card>

                    {/* Main Data */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Chart */}
                        <Card>
                            <CardHeader className="flex justify-between items-center">
                                <CardTitle>Inventory Activity</CardTitle>
                                <div className="flex gap-2">
                                    {/* <Button variant="outline" size="sm">
        <Download className="w-4 h-4 mr-1" /> Export
      </Button>
      <Button variant="outline" size="sm">
        <Printer className="w-4 h-4 mr-1" /> Print
      </Button> */}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar
                                            dataKey="inbound"
                                            name="Inbound (Purchases)"
                                            fill="#10b981"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="outbound"
                                            name="Outbound (Sales)"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>


                        {/* Product Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="overflow-x-auto p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3 font-medium text-gray-600">
                                                Product Name
                                            </th>
                                            <th className="p-3 font-medium text-gray-600">SKU</th>
                                            <th className="p-3 font-medium text-gray-600">
                                                Units Sold
                                            </th>
                                            <th className="p-3 font-medium text-gray-600">Revenue</th>
                                            <th className="p-3 font-medium text-gray-600">
                                                Stock Level
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p, i) => (
                                            <motion.tr
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="border-t hover:bg-gray-50"
                                            >
                                                <td className="p-3 font-medium">{p.name}</td>
                                                <td className="p-3">{p.sku}</td>
                                                <td className="p-3">{p.units_sold}</td>
                                                <td className="p-3">EGP {p.revenue}</td>
                                                <td className="p-3">
                                                    {p.stock_level === "Low Stock" ? (
                                                        <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded">
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

/* Helper Card Component */
function SummaryCard({
    icon,
    title,
    color,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    color: string;
    value: string;
}) {
    return (
        <Card className={`border-l-4 border-${color}-500 shadow-sm`}>
            <CardHeader className="pb-1">
                <CardTitle className="text-sm text-gray-500 flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </CardContent>
        </Card>
    );
}
