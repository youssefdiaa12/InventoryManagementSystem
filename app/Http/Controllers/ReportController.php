<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockTransaction;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Filters from request
        $startDate = $request->input('startDate', now()->subWeek()->startOfDay());
        $endDate = $request->input('endDate', now()->endOfDay());
        $supplierId = $request->input('supplierId'); 

        // Base query for stock transactions with optional supplier filter
        $baseQuery = StockTransaction::join('products', 'stock_transactions.product_id', '=', 'products.id');
        if ($supplierId) {
            $baseQuery->where('products.supplier_id', $supplierId);
        }

        // Total outbound value (Sales)
        $totalSales = (clone $baseQuery)
            ->where('stock_transactions.type', 'out')
            ->selectRaw('SUM(stock_transactions.quantity * products.price) as revenue')
            ->value('revenue') ?? 0;

        // Total cost of outbound items (COGS)
        $totalOutboundCost = (clone $baseQuery)
            ->where('stock_transactions.type', 'out')
            ->selectRaw('SUM(stock_transactions.quantity * products.cost) as cogs')
            ->value('cogs') ?? 0;

        // Total inbound value (Purchases)
        $totalInbound = (clone $baseQuery)
            ->where('stock_transactions.type', 'in')
            ->selectRaw('SUM(stock_transactions.quantity * products.cost) as inbound')
            ->value('inbound') ?? 0;

        // Profit margin calculation
        $profitMargin = $totalSales > 0
            ? round((($totalSales - $totalOutboundCost) / $totalSales) * 100, 2)
            : 0;

        // Low stock count
        $lowStock = Product::when($supplierId, fn($q) => $q->where('supplier_id', $supplierId))
            ->whereColumn('quantity', '<=', 'threshold')
            ->count();

        // Chart data
        $chartData = StockTransaction::selectRaw("
            DATE(created_at) as date,
            SUM(CASE WHEN type = 'in' THEN quantity ELSE 0 END) as inbound,
            SUM(CASE WHEN type = 'out' THEN quantity ELSE 0 END) as outbound
        ")
        ->when($supplierId, fn($q) => $q->whereHas('product', fn($q2) => $q2->where('supplier_id', $supplierId)))
        ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        // Product performance table
        $products = Product::when($supplierId, fn($q) => $q->where('supplier_id', $supplierId))
            ->select('id', 'name', 'sku', 'quantity', 'cost', 'price', 'threshold')
            ->get()
            ->map(function ($p) {
                $unitsSold = StockTransaction::where('product_id', $p->id)
                    ->where('type', 'out')
                    ->sum('quantity');

                return [
                    'name' => $p->name,
                    'sku' => $p->sku,
                    'units_sold' => $unitsSold,
                    'revenue' => number_format($unitsSold * $p->price, 2),
                    'stock_level' => $p->quantity <= $p->threshold ? 'Low Stock' : 'In Stock',
                ];
            });

        // All suppliers for dropdown filter
        $suppliers = Supplier::select('id', 'name')->get();

        return Inertia::render('Reports/Index', [
            'metrics' => [
                'totalSales' => (float) $totalSales,
                'totalInbound' => (float) $totalInbound,
                'profitMargin' => (float) $profitMargin,
                'lowStock' => (int) $lowStock,
            ],
            'chartData' => $chartData,
            'products' => $products,
            'suppliers' => $suppliers,
            'filters' => [
                'startDate' => $startDate instanceof \Carbon\Carbon ? $startDate->toDateString() : (string)$startDate,
                'endDate' => $endDate instanceof \Carbon\Carbon ? $endDate->toDateString() : (string)$endDate,
                'supplierId' => $supplierId,
            ],
        ]);
    }
}
