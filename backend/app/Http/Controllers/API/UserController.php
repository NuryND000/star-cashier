<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Menampilkan data pengguna berdasarkan ID.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Memperbarui data pengguna berdasarkan ID.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->name = $request->input('name');
        $user->no_telp = $request->input('no_telp');
        $user->email = $request->input('email');

        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }
// GET /users
    public function index()
    {
        return response()->json(User::all());
    }

    // POST /user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => ['required', Rule::in(['admin', 'kasir'])],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'no_telp' => $validated['no_telp'] ?? null,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User berhasil dibuat',
            'user' => $user,
        ], 201);
    }

    // DELETE /user/{id}
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Cegah menghapus dirinya sendiri (opsional)
        if (auth()->id() === $user->id) {
            return response()->json(['message' => 'Tidak bisa menghapus akun Anda sendiri'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus']);
    }

   // Change Password
   public function changePassword(Request $request)
   {
    $request->validate([
        'current_password' => 'required',
        'new_password' => 'required|min:6',
    ]);

    $user = auth()->user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'message' => 'Password lama salah.'
        ], 400);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'message' => 'Password berhasil diubah.'
    ]);
}
}
