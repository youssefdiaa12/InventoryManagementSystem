<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockTransaction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockManagementController extends Controller
{
    public function index()
    {
        //  Summary stats 
        $totalStock = Product::sum('quantity');
        $lowStock = Product::whereColumn('quantity', '<=', 'threshold')->count();
        $outOfStock = Product::where('quantity', '=', 0)->count();
        $inventoryValue = Product::sum(DB::raw('quantity * cost'));

        //  Recent transactions 
        $recentTransactions = StockTransaction::with(['product:id,name', 'user:id,name'])
            ->latest()
            ->take(5)
            ->get();

        //  Low stock alerts 
        $lowStockAlerts = Product::whereColumn('quantity', '<=', 'threshold')
            ->orderBy('quantity')
            ->take(10)
            ->get(['id', 'name', 'quantity', 'threshold']);

        //  Top products by stock 
        $topProducts = Product::orderBy('quantity', 'desc')
            ->take(10)
            ->get(['name', 'quantity']);

        return Inertia::render('StockManagement/Index', [
            'stats' => [
                'totalStock' => $totalStock,
                'lowStock' => $lowStock,
                'outOfStock' => $outOfStock,
                'inventoryValue' => $inventoryValue,
            ],
            'recentTransactions' => $recentTransactions,
            'lowStockAlerts' => $lowStockAlerts,
            'topProducts' => $topProducts,
        ]);
    }

 public function allTransactions()
{
    $transactions = \App\Models\StockTransaction::with(['product:id,name', 'user:id,name'])
        ->latest()
        ->get();

    return inertia('StockManagement/AllTransactions', [
        'transactions' => $transactions,
    ]);
}


}
