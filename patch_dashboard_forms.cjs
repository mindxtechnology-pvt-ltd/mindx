const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin/Dashboard.jsx', 'utf8');

const productsFormsHtml = `
            {/* TAB: PRODUCTS CONTAINER */}
            {activeTab === 'products' && (
              isProductFormOpen ? (
                // Add / Edit Product Form
                <div className="max-w-2xl mx-auto bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-900 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wide">
                    {editingProductId ? 'Update Product' : 'Add New Product'}
                  </h3>

                  <form onSubmit={handleProductSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Title</label>
                        <input
                          type="text" required
                          value={productForm.title}
                          onChange={e => setProductForm({...productForm, title: e.target.value})}
                          placeholder="YatraMind"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Tagline</label>
                        <input
                          type="text" required
                          value={productForm.tagline}
                          onChange={e => setProductForm({...productForm, tagline: e.target.value})}
                          placeholder="The ultimate booking intelligence."
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Description</label>
                      <textarea
                        required rows={3}
                        value={productForm.desc}
                        onChange={e => setProductForm({...productForm, desc: e.target.value})}
                        placeholder="Detailed explanation of the product..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none font-medium"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">App URL / Link</label>
                        <input
                          type="text"
                          value={productForm.link}
                          onChange={e => setProductForm({...productForm, link: e.target.value})}
                          placeholder="https://yatramind.app"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Domain Label</label>
                        <input
                          type="text" required
                          value={productForm.domain}
                          onChange={e => setProductForm({...productForm, domain: e.target.value})}
                          placeholder="yatramind.app"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Icon Name</label>
                        <select
                          value={productForm.icon}
                          onChange={e => setProductForm({...productForm, icon: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        >
                          <option value="Plane">Plane</option>
                          <option value="ShoppingCart">ShoppingCart</option>
                          <option value="Wallet">Wallet</option>
                          <option value="Package">Package</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</label>
                        <select
                          value={productForm.status}
                          onChange={e => setProductForm({...productForm, status: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        >
                          <option value="Live">Live</option>
                          <option value="In Development">In Development</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Image Asset URL</label>
                        <input
                          type="text" required
                          value={productForm.image}
                          onChange={e => setProductForm({...productForm, image: e.target.value})}
                          placeholder="/images/yatramind_ui.png"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Metrics Label</label>
                        <input
                          type="text"
                          value={productForm.metricsLabel}
                          onChange={e => setProductForm({...productForm, metricsLabel: e.target.value})}
                          placeholder="Active Planners"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Metrics Value</label>
                        <input
                          type="text"
                          value={productForm.metricsValue}
                          onChange={e => setProductForm({...productForm, metricsValue: e.target.value})}
                          placeholder="15,000+"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsProductFormOpen(false)}
                        className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold cursor-pointer"
                      >
                        {editingProductId ? 'Save Product' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : selectedProduct ? (
                // View Product details
                <div className="max-w-2xl mx-auto space-y-8 bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-900 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
                    <div>
                      <span className={\`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider \${selectedProduct.status === 'Live' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}\`}>
                        {selectedProduct.status}
                      </span>
                      <h2 className="text-xl font-extrabold text-white mt-3 tracking-tight">{selectedProduct.title}</h2>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">{selectedProduct.tagline}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditProductForm(selectedProduct)}
                        className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(selectedProduct.id)}
                        className="p-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Description</span>
                      <p className="text-xs text-zinc-300 font-medium leading-relaxed">{selectedProduct.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
                      {selectedProduct.metricsLabel && (
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">{selectedProduct.metricsLabel}</span>
                          <h3 className="text-lg font-bold text-zinc-100 mt-1">{selectedProduct.metricsValue}</h3>
                        </div>
                      )}
                      {selectedProduct.domain && (
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Domain</span>
                          <h3 className="text-sm font-bold text-zinc-100 mt-2 flex items-center gap-1.5">
                            <Link size={14} className="text-emerald-400" /> {selectedProduct.domain}
                          </h3>
                        </div>
                      )}
                    </div>

                    {selectedProduct.image && (
                      <div className="mt-4 pt-4 border-t border-zinc-900">
                        <img src={selectedProduct.image} alt="UI Preview" className="w-full rounded-xl border border-zinc-800 shadow-lg opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
                  <Package size={36} className="text-zinc-800" />
                  <p className="text-xs font-semibold">Select a product to preview or modify.</p>
                </div>
              )
            )}`;

content = content.replace(
  '          </main>',
  productsFormsHtml + '\n          </main>'
);

fs.writeFileSync('src/pages/Admin/Dashboard.jsx', content);
console.log('Patched Dashboard.jsx Part 2');
