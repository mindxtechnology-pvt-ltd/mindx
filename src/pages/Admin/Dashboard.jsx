import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchMessages, markAsRead, deleteMessage,
  fetchBlogs, createBlog, updateBlog, deleteBlog,
  fetchTeam, createMember, updateMember, deleteMember,
  fetchProducts, createProduct, updateProduct, deleteProduct
} from '../../utils/api';
import { 
  LogOut, Trash2, MailOpen, Mail, Clock, RefreshCw, 
  ChevronRight, Inbox, Plus, Edit, Users, FileText, 
  MailWarning, Loader2, ArrowRight, Package, Link
} from 'lucide-react';
import SEO from '../../components/seo/SEO';

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const adminEmail = localStorage.getItem('admin_email');

  // Tabs: 'inquiries' | 'blogs' | 'team'
  const [activeTab, setActiveTab] = useState('inquiries');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Data states
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [team, setTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Form states
  const [blogForm, setBlogForm] = useState({
    title: '', category: 'Engineering Deep Dive', readTime: '5 min read',
    desc: '', author: '', paragraphs: ''
  });

  const [teamForm, setTeamForm] = useState({
    name: '', role: '', img: '/images/default.png',
    stack: '', github: '', email: '', linkedin: ''
  });

  const [productForm, setProductForm] = useState({
    title: '', tagline: '', desc: '', link: '',
    icon: 'Plane', image: '', status: 'Live',
    metricsLabel: '', metricsValue: '', domain: ''
  });

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (activeTab === 'inquiries') {
        const data = await fetchMessages(token);
        setMessages(data);
        if (data.length > 0 && !selectedMessage) setSelectedMessage(data[0]);
      } else if (activeTab === 'blogs') {
        const data = await fetchBlogs();
        setBlogs(data);
        if (data.length > 0 && !selectedBlog) setSelectedBlog(data[0]);
      } else if (activeTab === 'team') {
        const data = await fetchTeam();
        setTeam(data);
        if (data.length > 0 && !selectedMember) setSelectedMember(data[0]);
      } else if (activeTab === 'products') {
        const data = await fetchProducts();
        setProducts(data);
        if (data.length > 0 && !selectedProduct) setSelectedProduct(data[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Your session may have expired.');
      // If unauthorized, send back to login
      if (err.message?.includes('unauthorized') || err.message?.includes('token') || err.message?.includes('expired')) {
        localStorage.clear();
        navigate('/admin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [token, activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin');
  };

  // --- Message Actions ---
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id, token);
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteMessage(id, token);
      const filtered = messages.filter(m => m.id !== id);
      setMessages(filtered);
      setSelectedMessage(filtered.length > 0 ? filtered[0] : null);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Blog Actions ---
  const openNewBlogForm = () => {
    setBlogForm({
      title: '', category: 'Engineering Deep Dive', readTime: '5 min read',
      desc: '', author: '', paragraphs: ''
    });
    setEditingBlogId(null);
    setIsBlogFormOpen(true);
  };

  const openEditBlogForm = (post) => {
    let rawParagraphs = '';
    try {
      const blocks = typeof post.content === 'string' ? JSON.parse(post.content) : post.content;
      rawParagraphs = blocks.map(b => b.text).join('\n\n');
    } catch (e) {
      rawParagraphs = post.content;
    }

    setBlogForm({
      title: post.title, category: post.category, readTime: post.readTime,
      desc: post.desc, author: post.author, paragraphs: rawParagraphs
    });
    setEditingBlogId(post.id);
    setIsBlogFormOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Map paragraphs text area to JSON blocks: split by double newline, filter, map
    const blocks = blogForm.paragraphs
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map((p, idx) => {
        // First paragraph is regular p, but let them insert h2 if they write custom headers
        if (p.startsWith('## ')) {
          return { type: 'h2', text: p.replace('## ', '') };
        }
        return { type: 'p', text: p };
      });

    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      readTime: blogForm.readTime,
      desc: blogForm.desc,
      author: blogForm.author,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: JSON.stringify(blocks)
    };

    try {
      if (editingBlogId) {
        await updateBlog(editingBlogId, payload, token);
      } else {
        await createBlog(payload, token);
      }
      setIsBlogFormOpen(false);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await deleteBlog(id, token);
      const filtered = blogs.filter(b => b.id !== id);
      setBlogs(filtered);
      setSelectedBlog(filtered.length > 0 ? filtered[0] : null);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Team Actions ---
  const openNewTeamForm = () => {
    setTeamForm({
      name: '', role: '', img: '/images/default.png',
      stack: '', github: '', email: '', linkedin: ''
    });
    setEditingMemberId(null);
    setIsTeamFormOpen(true);
  };

  const openEditTeamForm = (member) => {
    setTeamForm({
      name: member.name, role: member.role, img: member.img,
      stack: member.stack, github: member.github || '',
      email: member.email || '', linkedin: member.linkedin || ''
    });
    setEditingMemberId(member.id);
    setIsTeamFormOpen(true);
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingMemberId) {
        await updateMember(editingMemberId, teamForm, token);
      } else {
        await createMember(teamForm, token);
      }
      setIsTeamFormOpen(false);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to save team member');
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await deleteMember(id, token);
      const filtered = team.filter(t => t.id !== id);
      setTeam(filtered);
      setSelectedMember(filtered.length > 0 ? filtered[0] : null);
    } catch (err) {
      console.error(err);
    }
  };


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

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <>
      <SEO title="Admin Workspace | MindX Technology" description="Secure workspace dashboard." />
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col pt-20">
        
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">MindX Workspace</h1>
            <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-300 dark:border-zinc-800">
              <button
                onClick={() => { setActiveTab('inquiries'); setSelectedMessage(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'inquiries' ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white'
                }`}
              >
                <Mail size={14} /> Inquiries {unreadCount > 0 && <span className="bg-blue-600 text-zinc-900 dark:text-white rounded-full px-1.5 py-0.2 ml-0.5">{unreadCount}</span>}
              </button>
              <button
                onClick={() => { setActiveTab('blogs'); setSelectedBlog(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'blogs' ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white'
                }`}
              >
                <FileText size={14} /> Insights Blog
              </button>
              <button
                onClick={() => { setActiveTab('team'); setSelectedMember(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'team' ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white'
                }`}
              >
                <Users size={14} /> Team Members
              </button>
              <button
                onClick={() => { setActiveTab('products'); setSelectedProduct(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'products' ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white'
                }`}
              >
                <Package size={14} /> Products
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
              Signed in: <strong className="text-zinc-900 dark:text-white">{adminEmail}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 px-4 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-800 cursor-pointer"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Main List Sidebar */}
          <aside className="w-full md:w-5/12 border-r border-zinc-200 dark:border-zinc-900 flex flex-col overflow-y-auto max-h-[calc(100vh-140px)]">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 uppercase tracking-wide">
                  {activeTab === 'inquiries' ? 'Client Leads' : activeTab === 'blogs' ? 'Blog Posts' : activeTab === 'team' ? 'Team Roster' : 'Products'}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {activeTab === 'inquiries' ? `${messages.length} inquiries received` : activeTab === 'blogs' ? `${blogs.length} articles published` : activeTab === 'team' ? `${team.length} specialists active` : `${products.length} products listed`}
                </p>
              </div>

              <div className="flex gap-2">
                {activeTab === 'blogs' && (
                  <button
                    onClick={openNewBlogForm}
                    className="flex items-center gap-1 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Plus size={14} /> New Post
                  </button>
                )}
                {activeTab === 'team' && (
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
                )}
                <button
                  onClick={loadData}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors cursor-pointer"
                  title="Refresh Data"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 gap-3">
                <Loader2 className="animate-spin text-blue-500" size={24} />
                <p className="text-xs">Fetching workspace database...</p>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-sm text-red-400">{error}</div>
            ) : activeTab === 'inquiries' && messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 gap-3">
                <Inbox size={32} />
                <p className="text-sm font-medium">No inquiries in registry.</p>
              </div>
            ) : activeTab === 'blogs' && blogs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 gap-3">
                <Inbox size={32} />
                <p className="text-sm font-medium">No published blog posts.</p>
              </div>
            ) : activeTab === 'team' && team.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 gap-3">
                <Inbox size={32} />
                <p className="text-sm font-medium">No team members registered.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-900/60">
                {/* 1. INQUIRIES LIST */}
                {activeTab === 'inquiries' && messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => { setSelectedMessage(msg); if (!msg.isRead) handleMarkAsRead(msg.id); }}
                    className={`p-6 cursor-pointer transition-all hover:bg-zinc-100 dark:bg-zinc-900/50 flex gap-4 ${
                      selectedMessage?.id === msg.id ? 'bg-zinc-100 dark:bg-zinc-900/40 border-l-4 border-blue-500' : ''
                    } ${!msg.isRead ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}
                  >
                    <div className="mt-1">
                      {msg.isRead ? <MailOpen size={16} className="text-zinc-600" /> : <Mail size={16} className="text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-100">{msg.name}</h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0 font-medium">
                          <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold mt-1 truncate">{msg.subject || 'Discovery Call Request'}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 font-medium">{msg.message}</p>
                    </div>
                    <ChevronRight size={14} className="self-center text-zinc-700" />
                  </div>
                ))}

                {/* 2. BLOG LIST */}
                {activeTab === 'blogs' && blogs.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => { setSelectedBlog(post); setIsBlogFormOpen(false); }}
                    className={`p-6 cursor-pointer transition-all hover:bg-zinc-100 dark:bg-zinc-900/50 flex gap-4 ${
                      selectedBlog?.id === post.id ? 'bg-zinc-100 dark:bg-zinc-900/40 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <FileText size={16} className="text-zinc-500 dark:text-zinc-400 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-100">{post.title}</h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0 font-medium">
                          {post.date}
                        </span>
                      </div>
                      <p className="text-xs text-blue-400 font-semibold mt-1">{post.category}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 font-medium">{post.desc}</p>
                    </div>
                    <ChevronRight size={14} className="self-center text-zinc-700" />
                  </div>
                ))}

                {/* 3. TEAM LIST */}
                {activeTab === 'team' && team.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => { setSelectedMember(member); setIsTeamFormOpen(false); }}
                    className={`p-6 cursor-pointer transition-all hover:bg-zinc-100 dark:bg-zinc-900/50 flex gap-4 items-center ${
                      selectedMember?.id === member.id ? 'bg-zinc-100 dark:bg-zinc-900/40 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{member.name}</h4>
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">{member.role}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 truncate font-medium">{member.stack}</p>
                    </div>
                    <ChevronRight size={14} className="self-center text-zinc-700" />
                  </div>
                ))}
              
                {/* 4. PRODUCTS LIST */}
                {activeTab === 'products' && products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => { setSelectedProduct(product); setIsProductFormOpen(false); }}
                    className={`p-6 cursor-pointer transition-all hover:bg-zinc-100 dark:bg-zinc-900/50 flex gap-4 items-center ${
                      selectedProduct?.id === product.id ? 'bg-zinc-100 dark:bg-zinc-900/40 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <Package size={20} className="text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{product.title}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 truncate font-medium">{product.tagline}</p>
                    </div>
                    <ChevronRight size={14} className="self-center text-zinc-700" />
                  </div>
                ))}
              </div>
            )}
          </aside>

          {/* Details Pane / Forms */}
          <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-140px)]">
            
            {/* TAB: INQUIRIES CONTAINER */}
            {activeTab === 'inquiries' && (
              selectedMessage ? (
                <div className="max-w-2xl mx-auto space-y-8 bg-zinc-100 dark:bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-6">
                    <div>
                      <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{selectedMessage.name}</h2>
                      <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-400 hover:underline font-semibold mt-1 inline-block">
                        {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Phone: {selectedMessage.phone}</p>}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Subject</span>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">{selectedMessage.subject || 'Discovery Call Request'}</h3>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Received</span>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold mt-1">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-900 pt-6">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Message Specifications</span>
                      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900/50 whitespace-pre-wrap font-medium shadow-inner">
                        {selectedMessage.message}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 gap-3">
                  <Inbox size={36} className="text-zinc-800" />
                  <p className="text-xs font-semibold">Select a client lead to review specs.</p>
                </div>
              )
            )}

            {/* TAB: BLOG CONTAINER */}
            {activeTab === 'blogs' && (
              isBlogFormOpen ? (
                // Add / Edit Blog Form
                <div className="max-w-2xl mx-auto bg-zinc-100 dark:bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-xl">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wide">
                    {editingBlogId ? 'Modify Insight Article' : 'Draft New Insight Article'}
                  </h3>

                  <form onSubmit={handleBlogSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Title</label>
                        <input
                          type="text" required
                          value={blogForm.title}
                          onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                          placeholder="The Future of SaaS Databases"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Author</label>
                        <input
                          type="text" required
                          value={blogForm.author}
                          onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                          placeholder="Nawaraj Karki"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Category</label>
                        <select
                          value={blogForm.category}
                          onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        >
                          <option>Engineering Deep Dive</option>
                          <option>Web Systems</option>
                          <option>UI/UX Systems</option>
                          <option>Cloud Infrastructure</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Read Time</label>
                        <input
                          type="text" required
                          value={blogForm.readTime}
                          onChange={e => setBlogForm({...blogForm, readTime: e.target.value})}
                          placeholder="6 min read"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Short Summary</label>
                      <textarea
                        required rows={2}
                        value={blogForm.desc}
                        onChange={e => setBlogForm({...blogForm, desc: e.target.value})}
                        placeholder="A brief overview displayed in the blog listing cards..."
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-medium"
                      ></textarea>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Body Content</label>
                        <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium">Use ## for Section Headings</span>
                      </div>
                      <textarea
                        required rows={10}
                        value={blogForm.paragraphs}
                        onChange={e => setBlogForm({...blogForm, paragraphs: e.target.value})}
                        placeholder="Type paragraphs here. Separate paragraphs with double enters (empty line).&#10;&#10;## Subheading here&#10;Type subheading paragraph here..."
                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 resize-y font-medium shadow-inner"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsBlogFormOpen(false)}
                        className="px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold cursor-pointer"
                      >
                        {editingBlogId ? 'Save Edits' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : selectedBlog ? (
                // View Blog details
                <div className="max-w-2xl mx-auto space-y-8 bg-zinc-100 dark:bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-6">
                    <div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold uppercase tracking-wider">
                        {selectedBlog.category}
                      </span>
                      <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white mt-3 tracking-tight leading-snug">{selectedBlog.title}</h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">Published: {selectedBlog.date} &bull; Author: {selectedBlog.author} &bull; {selectedBlog.readTime}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditBlogForm(selectedBlog)}
                        className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(selectedBlog.id)}
                        className="p-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">Snippet Summary</span>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 italic font-medium leading-relaxed">{selectedBlog.desc}</p>
                    </div>

                    <div className="border-t border-zinc-200 dark:border-zinc-900 pt-6">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">Article Content Preview</span>
                      <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal bg-white dark:bg-zinc-950/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900/50">
                        {(() => {
                          try {
                            const blocks = typeof selectedBlog.content === 'string' ? JSON.parse(selectedBlog.content) : selectedBlog.content;
                            return blocks.map((b, i) => {
                              if (b.type === 'h2') return <h4 key={i} className="text-sm font-bold text-zinc-900 dark:text-white pt-2">{b.text}</h4>;
                              return <p key={i} className="mb-2">{b.text}</p>;
                            });
                          } catch (e) {
                            return <p>{selectedBlog.content}</p>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 gap-3">
                  <Inbox size={36} className="text-zinc-800" />
                  <p className="text-xs font-semibold">Select an article to preview or modify.</p>
                </div>
              )
            )}

            {/* TAB: TEAM CONTAINER */}
            {activeTab === 'team' && (
              isTeamFormOpen ? (
                // Add / Edit Team Form
                <div className="max-w-2xl mx-auto bg-zinc-100 dark:bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-xl">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wide">
                    {editingMemberId ? 'Update Specialist profile' : 'Onboard New Specialist'}
                  </h3>

                  <form onSubmit={handleTeamSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Full Name</label>
                        <input
                          type="text" required
                          value={teamForm.name}
                          onChange={e => setTeamForm({...teamForm, name: e.target.value})}
                          placeholder="Alex Mercer"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Role / Designation</label>
                        <input
                          type="text" required
                          value={teamForm.role}
                          onChange={e => setTeamForm({...teamForm, role: e.target.value})}
                          placeholder="Core Systems Architect"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Image Asset URL</label>
                        <input
                          type="text" required
                          value={teamForm.img}
                          onChange={e => setTeamForm({...teamForm, img: e.target.value})}
                          placeholder="/images/default.png"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Tech Stack (comma-separated)</label>
                        <input
                          type="text" required
                          value={teamForm.stack}
                          onChange={e => setTeamForm({...teamForm, stack: e.target.value})}
                          placeholder="Go, Rust, AWS"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Email Address</label>
                        <input
                          type="email"
                          value={teamForm.email}
                          onChange={e => setTeamForm({...teamForm, email: e.target.value})}
                          placeholder="alex@mindx.com"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">GitHub Link</label>
                        <input
                          type="url"
                          value={teamForm.github}
                          onChange={e => setTeamForm({...teamForm, github: e.target.value})}
                          placeholder="https://github.com/alex"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">LinkedIn Link</label>
                        <input
                          type="url"
                          value={teamForm.linkedin}
                          onChange={e => setTeamForm({...teamForm, linkedin: e.target.value})}
                          placeholder="https://linkedin.com/in/alex"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsTeamFormOpen(false)}
                        className="px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold cursor-pointer"
                      >
                        {editingMemberId ? 'Save Profile' : 'Onboard Specialist'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : selectedMember ? (
                // View Member details
                <div className="max-w-2xl mx-auto space-y-8 bg-zinc-100 dark:bg-zinc-900/20 p-8 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-6">
                    <div className="flex items-center gap-5">
                      <img 
                        src={selectedMember.img} 
                        alt={selectedMember.name} 
                        className="w-16 h-16 rounded-full object-cover border border-zinc-850"
                      />
                      <div>
                        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{selectedMember.name}</h2>
                        <p className="text-xs text-blue-400 font-semibold mt-0.5">{selectedMember.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditTeamForm(selectedMember)}
                        className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors cursor-pointer"
                        title="Edit Profile"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(selectedMember.id)}
                        className="p-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Remove Specialist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-medium">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Expertise Core</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {selectedMember.stack.split(',').map((s, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold">
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Credentials & Directories</span>
                        <div className="space-y-1 text-zinc-450 mt-1 font-semibold text-xs">
                          {selectedMember.email && <div>Email: <a href={`mailto:${selectedMember.email}`} className="text-blue-400 hover:underline">{selectedMember.email}</a></div>}
                          {selectedMember.github && <div>GitHub: <a href={selectedMember.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{selectedMember.github}</a></div>}
                          {selectedMember.linkedin && <div>LinkedIn: <a href={selectedMember.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{selectedMember.linkedin}</a></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 gap-3">
                  <Inbox size={36} className="text-zinc-800" />
                  <p className="text-xs font-semibold">Select a team specialist to preview or edit.</p>
                </div>
              )
            )}

          </main>
        </div>
      </div>
    </>
  );
}
