import { useEffect, useMemo, useState } from 'react';
import { CartItem, addToCart, clearCart, loadCart, removeFromCart, toolCatalog } from '../../utils/smartQR';

function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [category, setCategory] = useState('All');
  const [message, setMessage] = useState('Select useful SmartQR tools and save them in the cart view.');

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(toolCatalog.map((item) => item.category)))], []);
  const filteredTools = category === 'All' ? toolCatalog : toolCatalog.filter((item) => item.category === category);
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const handleAdd = (item: CartItem) => {
    const updated = addToCart(item);
    setItems(updated);
    setMessage(`${item.title} added to cart view.`);
  };

  const handleRemove = (id: string) => {
    const updated = removeFromCart(id);
    setItems(updated);
    setMessage('Item removed from cart view.');
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
    setMessage('Cart view has been cleared.');
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Cart View</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This project is not an e-commerce store, so the cart is adapted as a SmartQR tools/services cart. It demonstrates cart view, category search and selected items using localStorage.</p>
      </section>

      <section className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <label htmlFor="categoryFilter" className="font-bold text-slate-700 dark:text-slate-200">Search by Category</label>
        <select id="categoryFilter" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950 md:max-w-md">
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredTools.map((tool) => (
          <article key={tool.id} className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
            <p className="text-sm font-extrabold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{tool.category}</p>
            <h2 className="mt-3 text-xl font-black text-slate-950 dark:text-white">{tool.title}</h2>
            <p className="mt-3 min-h-20 leading-7 text-slate-600 dark:text-slate-300">{tool.description}</p>
            <p className="mt-4 text-2xl font-black text-emerald-700 dark:text-emerald-300">Rs. {tool.price}</p>
            <button type="button" onClick={() => handleAdd(tool)} className="mt-5 w-full rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Add to Cart</button>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Selected Cart Items</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Total items: {items.length} | Total price: Rs. {totalPrice}</p>
          </div>
          <button type="button" onClick={handleClear} className="rounded-2xl border border-red-500 px-5 py-3 font-extrabold text-red-600 transition hover:-translate-y-1 hover:bg-red-600 hover:text-white dark:text-red-300">Clear Cart</button>
        </div>
        <p className="mt-5 rounded-2xl bg-cyan-50 p-4 text-sm font-bold text-cyan-800 dark:bg-slate-800 dark:text-cyan-200">{message}</p>
        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cyan-300 p-6 text-center text-slate-500 dark:border-cyan-800 dark:text-slate-400">No items selected.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-black text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.category} | Rs. {item.price}</p>
                </div>
                <button type="button" onClick={() => handleRemove(item.id)} className="rounded-xl border border-red-500 px-4 py-2 text-sm font-extrabold text-red-600 transition hover:bg-red-600 hover:text-white dark:text-red-300">Remove</button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Cart;
