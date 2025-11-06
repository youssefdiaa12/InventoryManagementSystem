<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockManagementController;
use App\Http\Controllers\StockTransactionController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


oute::get('/debug', function () {
    try {
        \DB::connection()->getPdo();
        return 'Database connection OK';
    } catch (\Exception $e) {
        return 'DB connection failed: ' . $e->getMessage();
    }
})
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware(['auth', 'verified', 'Admin.only'])->group(function () {
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
    Route::get('/suppliers/create', [SupplierController::class, 'create'])->name('suppliers.create');
    Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
    Route::get('/suppliers/{supplier}/edit', [SupplierController::class, 'edit'])->name('suppliers.edit');
    Route::get('/suppliers/trash', [SupplierController::class, 'trash'])->name('suppliers.trash');
    Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
    Route::delete('/suppliers/{supplier}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');
    Route::post('/suppliers/{id}/restore', [SupplierController::class, 'restore'])->name('suppliers.restore');
    Route::delete('/suppliers/{id}/force-delete', [SupplierController::class, 'forceDelete'])->name('suppliers.forceDelete');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::put('/users/{user}/role', [UserController::class, 'updateRole'])
    ->name('users.updateRole');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

Route::middleware(['auth', 'verified', 'not.user'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::get('products/trash', [ProductController::class, 'trash'])->name('products.trash');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
    Route::delete('products/{id}/force', [ProductController::class, 'forceDelete'])->name('products.forceDelete');



    Route::get('/stock', [StockTransactionController::class, 'create'])
        ->name('stock.create');
    Route::post('/stock', [StockTransactionController::class, 'store'])
        ->name('stock.store');

    Route::get('/stock-transactions/create', [StockTransactionController::class, 'create'])
        ->name('stock-transactions.create');
    Route::post('/stock-transactions', [StockTransactionController::class, 'store'])
        ->name('stock-transactions.store');
        

        Route::get('/stockmanagement', [StockManagementController::class, 'index'])
        ->name('stockmanagement.index');

       Route::get('stockmanagement/transactions', [StockManagementController::class, 'allTransactions'])
    ->name('stock.transactions');
Route::get('/reports', [ReportController::class, 'index'])
    ->name('reports.index');

        

});
Route::fallback(function () {
    return Inertia::render('not-found/not-found', ["user" => Auth::user()]);
});







require __DIR__ . '/auth.php';
