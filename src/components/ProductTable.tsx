'use client';
import ProductFormModal from './ProductFormModal';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/actions';

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await getProducts(page);
      setProducts(res.products);
      setTotalPages(res.totalPages);
    }

    fetchData();
  }, [page]);
  const [showCreateModal, setShowCreateModal] = useState(false);


  return (
    <div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t hover:bg-gray-50 group">
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2 opacity-0 group-hover:opacity-100 transition">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
  onClick={() => setShowCreateModal(true)}
  className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
>
  + Create Product
</button>
{showCreateModal && <ProductFormModal onClose={() => setShowCreateModal(false)} />}

      </div>
    </div>
  );
}
