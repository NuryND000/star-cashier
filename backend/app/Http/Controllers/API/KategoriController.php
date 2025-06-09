<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $kategoris = Kategori::all();
        return response()->json(['data' => $kategoris], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $kategori = Kategori::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Kategori berhasil dibuat', 'data' => $kategori]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Kategori $kategori)
    {
        return response()->json(['data' => $kategori], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Kategori $kategori)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $kategori->update([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Kategori berhasil diperbarui', 'data' => $kategori], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Kategori $kategori)
    {
        // Delete related data
        foreach ($kategori->produks as $produk) {
            $produk->transaksis()->delete();
        }
        $kategori->produks()->delete();
        $kategori->delete();

        return response()->json(['message' => 'Kategori dan data terkait berhasil dihapus'], Response::HTTP_OK);
    }
}
