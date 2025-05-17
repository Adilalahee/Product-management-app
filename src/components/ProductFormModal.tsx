'use client';

import { useState } from 'react';
import { createProduct } from '@/lib/actions';

export default function ProductFormModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ name, price: parseFloat(price) });
    onClose(); // Close modal
    window.location.reload(); // Refresh to see changes (or use state lifting)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full border p-2 mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
