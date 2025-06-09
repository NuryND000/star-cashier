<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TransaksiController extends Controller
{
    public function index()
    {
        $transaksi = Transaksi::with('produk')->get();
        return response()->json([
            'data' => $transaksi,
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'dataTransaksi' => 'required|array',
            'produkUpdate' => 'required|array',
        ]);

        foreach ($request->dataTransaksi as $transaksiItem) {
            Transaksi::create([
                'produk_id' => $transaksiItem['produk_id'],
                'jumlah' => $transaksiItem['jumlah'],
                'beli' => $transaksiItem['beli'],
                'jual' => $transaksiItem['jual'],
                'created_at' => $transaksiItem['tanggal'],
            ]);
        }

        foreach ($request->produkUpdate as $produkItem) {
            Produk::where('id', $produkItem['produk_id'])->update([
                'stok' => $produkItem['jumlah'],
            ]);
        }

        return response()->json(['message' => 'Transaksi berhasil disimpan'], Response::HTTP_CREATED);
    }

    public function show(Transaksi $transaksi)
    {
        $myTransaksi = $transaksi
            ->join('produks', 'transaksis.produk_id', '=', 'produks.id')
            ->select('transaksis.*', 'produks.name as produk_name')
            ->get();

        return response()->json(['data' => $myTransaksi], Response::HTTP_OK);
    }

    public function destroy(Transaksi $transaksi)
    {
        $transaksi->delete();

        return response()->json(['message' => 'Transaksi berhasil dihapus'], Response::HTTP_OK);
    }
}
