<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProdukController extends Controller
{
    public function index()
    {
        $produks = Produk::with('kategori:id,name')->get();
        return response()->json(['data' => $produks], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'merk' => 'required|string|max:255',
            'kategori_id' => 'required|integer|exists:kategoris,id',
            'beli' => 'required|numeric',
            'jual' => 'required|numeric',
            'stok' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'barcode' => 'nullable|string|max:255',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $produk = Produk::create([
            'name' => $request->name,
            'merk' => $request->merk,
            'kategori_id' => $request->kategori_id,
            'beli' => $request->beli,
            'jual' => $request->jual,
            'stok' => $request->stok,
            'barcode' => $request->barcode,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Produk berhasil dibuat', 'data' => $produk], Response::HTTP_CREATED);
    }

    public function update(Request $request, Produk $produk)
    {

    if ($request->_method === 'PUT') {
        $request->validate([
            'barcode' => 'nullable|string|max:255',
            'beli' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'jual' => 'required|numeric',
            'kategori_id' => 'required|integer|exists:kategoris,id',
            'merk' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'stok' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            if ($produk->image) {
                Storage::disk('public')->delete($produk->image);
            }
            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            $imagePath = $produk->image;
        }

        $produk->update([
            'name' => $request->name,
            'merk' => $request->merk,
            'kategori_id' => $request->kategori_id,
            'beli' => $request->beli,
            'jual' => $request->jual,
            'stok' => $request->stok,
            'barcode' => $request->barcode,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Produk berhasil diperbarui', 'data' => $produk], Response::HTTP_OK);
    }
}

    public function destroy(Produk $produk)
    {
        if ($produk->image) {
            Storage::disk('public')->delete($produk->image);
        }

        $produk->delete();

        return response()->json(['message' => 'Produk berhasil dihapus'], Response::HTTP_OK);
    }
}
