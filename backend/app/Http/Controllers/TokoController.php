<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use Illuminate\Http\Request;

class TokoController extends Controller
{
    public function index()
    {
        return response()->json(Toko::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'no_telp' => 'nullable|string|max:20',
        ]);

        $toko = Toko::create($validated);

        return response()->json([
            'message' => 'Toko berhasil ditambahkan',
            'toko' => $toko,
        ], 201);
    }

    public function show($id)
    {
        $toko = Toko::findOrFail($id);
        return response()->json($toko);
    }

    public function update(Request $request, $id)
    {
        $toko = Toko::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'no_telp' => 'nullable|string|max:20',
        ]);

        $toko->update($validated);

        return response()->json([
            'message' => 'Toko berhasil diperbarui',
            'toko' => $toko,
        ]);
    }

    public function destroy($id)
    {
        $toko = Toko::findOrFail($id);
        $toko->delete();

        return response()->json(['message' => 'Toko berhasil dihapus']);
    }
}

