<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockTransactionController extends Controller
{
    public function create()
    {
        return Inertia::render('StockTransactions/Create', [
    'products' => Product::select('id', 'name', 'sku', 'quantity', 'cost', 'price')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:inbound,outbound',
            'quantity' => 'required|integer|min:1',
            'reason' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $transactionValue = $validated['type'] === 'inbound'
        ? $product->cost * $validated['quantity']
        : $product->price * $validated['quantity'];

        // Handle stock change
        if ($validated['type'] === 'outbound') {
            if ($validated['quantity'] > $product->quantity) {
                return back()->withErrors([
                    'quantity' => 'Cannot process outbound. Quantity exceeds available stock.'
                ]);
            }
            $product->quantity -= $validated['quantity'];
        } else {
            $product->quantity += $validated['quantity'];
        }

        $product->save();

        // Save transaction
        StockTransaction::create([
            'product_id' => $validated['product_id'],
            'user_id' => auth()->id(),
            'type' => $validated['type'] === 'inbound' ? 'in' : 'out',
            'quantity' => $validated['quantity'],
            'reason' => $validated['reason'],
            'notes' => $validated['notes'],
            'value' => $transactionValue, 
        ]);


        return redirect()->route('stock-transactions.create')
            ->with('success', 'Stock transaction recorded successfully!');
    }
}
