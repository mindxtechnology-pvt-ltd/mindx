const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin/Dashboard.jsx', 'utf8');

// 1. Add api imports
content = content.replace(
  '  fetchTeam, createMember, updateMember, deleteMember \n} from \'../../utils/api\';',
  '  fetchTeam, createMember, updateMember, deleteMember,\n  fetchProducts, createProduct, updateProduct, deleteProduct\n} from \'../../utils/api\';'
);

// 2. Add lucide icons
content = content.replace(
  '  MailWarning, Loader2, ArrowRight\n} from \'lucide-react\';',
  '  MailWarning, Loader2, ArrowRight, Package, Link\n} from \'lucide-react\';'
);

// 3. Add state variables
content = content.replace(
  '  const [editingMemberId, setEditingMemberId] = useState(null);',
  '  const [editingMemberId, setEditingMemberId] = useState(null);\n\n  const [products, setProducts] = useState([]);\n  const [selectedProduct, setSelectedProduct] = useState(null);\n  const [isProductFormOpen, setIsProductFormOpen] = useState(false);\n  const [editingProductId, setEditingProductId] = useState(null);'
);

// 4. Add form state
content = content.replace(
  '    stack: \'\', github: \'\', email: \'\', linkedin: \'\'\n  });',
  '    stack: \'\', github: \'\', email: \'\', linkedin: \'\'\n  });\n\n  const [productForm, setProductForm] = useState({\n    title: \'\', tagline: \'\', desc: \'\', link: \'\',\n    icon: \'Plane\', image: \'\', status: \'Live\',\n    metricsLabel: \'\', metricsValue: \'\', domain: \'\'\n  });'
);

// 5. Add load data
content = content.replace(
  '        if (data.length > 0 && !selectedMember) setSelectedMember(data[0]);\n      }',
  '        if (data.length > 0 && !selectedMember) setSelectedMember(data[0]);\n      } else if (activeTab === \'products\') {\n        const data = await fetchProducts();\n        setProducts(data);\n        if (data.length > 0 && !selectedProduct) setSelectedProduct(data[0]);\n      }'
);

// 6. Add handlers before unreadCount
const handlers = `
  // --- Product Actions ---
  const openNewProductForm = () => {
    setProductForm({
      title: '', tagline: '', desc: '', link: '',
      icon: 'Plane', image: '', status: 'Live',
      metricsLabel: '', metricsValue: '', domain: ''
    });
    setEditingProductId(null);
    setIsProductFormOpen(true);
  };

  const openEditProductForm = (product) => {
    setProductForm({
      title: product.title, tagline: product.tagline, desc: product.desc, link: product.link || '',
      icon: product.icon, image: product.image, status: product.status,
      metricsLabel: product.metricsLabel || '', metricsValue: product.metricsValue || '', domain: product.domain
    });
    setEditingProductId(product.id);
    setIsProductFormOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productForm, token);
      } else {
        await createProduct(productForm, token);
      }
      setIsProductFormOpen(false);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id, token);
      const filtered = products.filter(p => p.id !== id);
      setProducts(filtered);
      setSelectedProduct(filtered.length > 0 ? filtered[0] : null);
    } catch (err) {
      console.error(err);
    }
  };
`;

content = content.replace(
  '  const unreadCount = messages.filter(m => !m.isRead).length;',
  handlers + '\n  const unreadCount = messages.filter(m => !m.isRead).length;'
);

// 7. Add Products Tab in UI
const tabHtml = `              <button
                onClick={() => { setActiveTab('team'); setSelectedMember(null); }}
                className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all \${
                  activeTab === 'team' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                }\`}
              >
                <Users size={14} /> Team Members
              </button>
              <button
                onClick={() => { setActiveTab('products'); setSelectedProduct(null); }}
                className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all \${
                  activeTab === 'products' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                }\`}
              >
                <Package size={14} /> Products
              </button>`;

content = content.replace(
  /<button[\s\S]*?<Users size=\{14\} \/> Team Members[\s\S]*?<\/button>/,
  tabHtml
);

// 8. Add Product Tab headers in Sidebar
content = content.replace(
  '{activeTab === \'inquiries\' ? \'Client Leads\' : activeTab === \'blogs\' ? \'Blog Posts\' : \'Team Roster\'}',
  '{activeTab === \'inquiries\' ? \'Client Leads\' : activeTab === \'blogs\' ? \'Blog Posts\' : activeTab === \'team\' ? \'Team Roster\' : \'Products\'}'
);

content = content.replace(
  '{activeTab === \'inquiries\' ? `${messages.length} inquiries received` : activeTab === \'blogs\' ? `${blogs.length} articles published` : `${team.length} specialists active`}',
  '{activeTab === \'inquiries\' ? `${messages.length} inquiries received` : activeTab === \'blogs\' ? `${blogs.length} articles published` : activeTab === \'team\' ? `${team.length} specialists active` : `${products.length} products listed`}'
);

const newProductButton = `                {activeTab === 'team' && (
                  <button
                    onClick={openNewTeamForm}
                    className="flex items-center gap-1 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Plus size={14} /> Add Member
                  </button>
                )}
                {activeTab === 'products' && (
                  <button
                    onClick={openNewProductForm}
                    className="flex items-center gap-1 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Plus size={14} /> Add Product
                  </button>
                )}`;
content = content.replace(
  /<button[\s\S]*?onClick=\{openNewTeamForm\}[\s\S]*?<\/button>\s*\)}/,
  newProductButton
);

// 9. Add Products Sidebar List
const productsSidebarList = `
                {/* 4. PRODUCTS LIST */}
                {activeTab === 'products' && products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => { setSelectedProduct(product); setIsProductFormOpen(false); }}
                    className={\`p-6 cursor-pointer transition-all hover:bg-zinc-900/50 flex gap-4 items-center \${
                      selectedProduct?.id === product.id ? 'bg-zinc-900/40 border-l-4 border-blue-500' : ''
                    }\`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Package size={20} className="text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-100 truncate">{product.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 truncate font-medium">{product.tagline}</p>
                    </div>
                    <ChevronRight size={14} className="self-center text-zinc-700" />
                  </div>
                ))}
              </div>`;

content = content.replace(
  /<\/div>\s*\)}/,
  productsSidebarList + '\n            )}'
);


fs.writeFileSync('src/pages/Admin/Dashboard.jsx', content);
console.log('Patched Dashboard.jsx Part 1');
