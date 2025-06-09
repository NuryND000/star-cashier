<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Suplay;
use App\Models\Produk;

class SuplayController extends Controller
{
    /**
     * Menampilkan daftar suplay dengan relasi produk.
     */
    public function index()
    {
        $suplays = Suplay::with('produk')->get();
        return response()->json([
            'data' => $suplays,
        ], Response::HTTP_OK);
    }

    /**
     * Menyimpan data suplay baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'produk_id' => 'required|exists:produks,id',
            'jumlah' => 'required|integer|min:1',
            'beli' => 'nullable|numeric|min:0',
            'jual' => 'nullable|numeric|min:0'
        ]);

        $produk = Produk::find($request->produk_id);

        // Menambahkan data suplay
        $suplay = Suplay::create([
            'produk_id' => $produk->id,
            'jumlah' => $request->jumlah,
        ]);

        // Menambahkan stok produk
        $produk->stok += $request->jumlah;

        if ($request->filled('beli')) {
            $produk->beli = $request->beli;
        }

        if ($request->filled('jual')) {
            $produk->jual = $request->jual;
        }

        $produk->save();

        return response()->json([
            'message' => 'Suplay berhasil ditambahkan!',
            'data' => $suplay,
        ], Response::HTTP_CREATED);
    }

    /**
     * Memperbarui data suplay.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'jumlah' => 'required|integer|min:1',
            'beli' => 'nullable|numeric|min:0',
            'jual' => 'nullable|numeric|min:0'
        ]);

        $suplay = Suplay::findOrFail($id);
        $produk = $suplay->produk;

        // Menyesuaikan stok produk
        $produk->stok -= $suplay->jumlah; // Kurangi stok lama
        $produk->stok += $request->jumlah; // Tambahkan stok baru

        if ($request->filled('beli')) {
            $produk->beli = $request->beli;
        }

        if ($request->filled('jual')) {
            $produk->jual = $request->jual;
        }

        $produk->save();

        // Memperbarui jumlah suplay
        $suplay->update([
            'jumlah' => $request->jumlah,
        ]);

        return response()->json([
            'message' => 'Suplay berhasil diperbarui!',
            'data' => $suplay,
        ], Response::HTTP_OK);
    }

    /**
     * Menghapus data suplay.
     */
    public function destroy($id)
    {
        $suplay = Suplay::findOrFail($id);
        $produk = $suplay->produk;

        // Mengurangi stok produk
        $produk->stok -= $suplay->jumlah;
        $produk->save();

        // Menghapus data suplay
        $suplay->delete();

        return response()->json([
            'message' => 'Suplay berhasil dihapus!',
        ], Response::HTTP_OK);
    }
}
