<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // List all products with their suppliers
    public function index()
    {
        $products = Product::with('supplier')
            ->orderBy('name')
            ->paginate(5);
            

        return Inertia::render('Products/Index', [
            'products' => $products,
            'suppliers' => Supplier::select('id', 'name')->get(),
        ]);
    }

    // Show the form for creating a new product
    public function create()
    {
        $suppliers = Supplier::orderBy('name')->get();

        return Inertia::render('Products/Create', [
            'suppliers' => $suppliers,
        ]);
    }

    // Store a new product
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:2|max:100',
            'sku' => 'required|string|max:50|unique:products,sku',
            'cost' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        Product::create($data);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    // Show edit form for an existing product
    public function edit(Product $product)
    {
        $suppliers = Supplier::orderBy('name')->get();

        return Inertia::render('Products/Edit', [
            'product' => $product->load('supplier'),
            'suppliers' => $suppliers,
        ]);
    }

    // Update a product
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|min:2|max:100',
            'sku' => 'required|string|max:50|unique:products,sku,' . $product->id,
            'cost' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product->update($data);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    // Delete a product
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }

    // product detail page
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product->load('supplier'),
        ]);
    }

    public function trash()
{
    $products = Product::onlyTrashed()
        ->with('supplier')
        ->orderBy('deleted_at', 'desc')
        ->paginate(10);

    return Inertia::render('Products/Trash', [
        'products' => $products,
    ]);
}

    // Restore a soft-deleted product
public function restore($id)
{
    $product = Product::withTrashed()->findOrFail($id);
    $product->restore();

    return redirect()->route('products.index')
        ->with('success', 'Product restored successfully.');
}

// Permanently delete (hard delete)
public function forceDelete($id)
{
    $product = Product::withTrashed()->findOrFail($id);
    $product->forceDelete();

    return redirect()->route('products.index')
        ->with('success', 'Product permanently deleted.');
}

}
