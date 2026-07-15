import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, AlertTriangle, LogOut, Paperclip, FileText, CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { db } from '../firebase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  
  // Form Data State
  const [formData, setFormData] = useState({
    id: '', title: '', description: '', price: '', stockQuantity: '', maxQuantityPerUser: '', category: 'Ceramics', majorImageUrl: '', minorImageUrl1: '', minorImageUrl2: '', minorImageUrl3: '', minorImageUrl4: '', documentUrl: ''
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [navigate, activeTab]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const snapshot = await get(ref(db, 'products'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const snapshot = await get(ref(db, 'orders'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const ordersList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setOrders(ordersList);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await update(ref(db, `orders/${id}`), { status });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
    }, 3000);
  };

  const openCreateModal = () => {
    setFormMode('create');
    setFormData({ id: '', title: '', description: '', price: '', stockQuantity: '', maxQuantityPerUser: '', category: 'Ceramics', majorImageUrl: '', minorImageUrl1: '', minorImageUrl2: '', minorImageUrl3: '', minorImageUrl4: '', documentUrl: '' });
    setIsFormOpen(true);
  };

  const openEditModal = (product) => {
    setFormMode('edit');
    setFormData(product);
    setIsFormOpen(true);
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
        maxQuantityPerUser: parseInt(formData.maxQuantityPerUser, 10)
      };

      if (formMode === 'create') {
        delete payload.id;
        const newRef = push(ref(db, 'products'));
        await set(newRef, payload);
      } else {
        await update(ref(db, `products/${formData.id}`), payload);
      }
      setIsFormOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Form submission failed:", err);
      alert("Failed to save product.");
    }
  };

  const handleDeleteExecute = async () => {
    try {
      await remove(ref(db, `products/${productToDelete.id}`));
      setIsDeleteOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Deletion failed:", err);
      setIsDeleteOpen(false);
      fetchProducts();
    }
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Compress the image using Canvas
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get highly compressed base64 (60% quality JPEG)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setFormData({ ...formData, [fieldName]: compressedBase64 });
        };
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        alert("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Image conversion failed", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing': return <Clock className="text-amber-500" size={16} />;
      case 'shipped': return <Truck className="text-mochi-teal" size={16} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={16} />;
      default: return <Package className="text-mochi-navy/50" size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-mochi-cream text-mochi-navy font-sans selection:bg-mochi-teal selection:text-white p-6 md:p-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-mochi-navy">Admin Portal</h1>
          <p className="text-sm text-mochi-ocean">Mochi Store Management</p>
        </div>
        <div className="flex items-center gap-4">
          {activeTab === 'products' && (
            <button 
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-mochi-teal hover:bg-mochi-ocean text-white px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors shadow-sm"
            >
              <Plus size={16} /> Add New Product
            </button>
          )}
          <button onClick={handleLogout} className="text-mochi-ocean hover:text-mochi-navy transition-colors" title="Log Out">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-mochi-sky/30">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'products' ? 'border-b-2 border-mochi-teal text-mochi-teal' : 'text-mochi-ocean hover:text-mochi-navy'}`}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'orders' ? 'border-b-2 border-mochi-teal text-mochi-teal' : 'text-mochi-ocean hover:text-mochi-navy'}`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          {/* Data Table */}
          <div className="bg-white/60 border border-mochi-sky rounded-lg shadow-sm overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-mochi-navy text-mochi-cream text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-medium w-16">Image</th>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr><td colSpan="6" className="text-center py-20"><div className="inline-block w-6 h-6 border-2 border-mochi-ocean border-t-transparent rounded-full animate-spin"></div></td></tr>
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-mochi-sky/50">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-white/80 transition-colors">
                        <td className="px-6 py-4">
                          {product.majorImageUrl ? (
                            <img src={product.majorImageUrl} alt={product.title} className="w-10 h-10 object-cover rounded shadow-sm" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 text-gray-500 font-bold flex items-center justify-center rounded shadow-sm">M</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-mochi-ocean font-mono text-xs">{product.id}</td>
                        <td className="px-6 py-4 font-medium">{product.title}</td>
                        <td className="px-6 py-4 font-mono">${Number(product.price).toFixed(2)}</td>
                        <td className="px-6 py-4">{product.stockQuantity}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => openEditModal(product)} className="text-mochi-ocean hover:text-mochi-teal transition-colors" title="Edit"><Edit2 size={16} /></button>
                            <button onClick={() => confirmDelete(product)} className="text-red-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Orders View */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-20"><div className="inline-block w-6 h-6 border-2 border-mochi-ocean border-t-transparent rounded-full animate-spin"></div></div>
            ) : orders.length === 0 ? (
              <p className="text-center text-mochi-navy/50 py-20 font-bold">No orders found.</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-mochi-sky/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-mochi-navy/60 font-bold">Order {order.orderNumber}</p>
                      <p className="text-xs text-mochi-navy/50">{new Date(order.orderDate).toLocaleString()}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                      <div className="flex items-center gap-2 border px-3 py-1 rounded-sm border-mochi-sky text-sm">
                        {getStatusIcon(order.status)}
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-transparent focus:outline-none uppercase text-xs font-bold tracking-widest text-mochi-navy"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-mochi-sky/30 pt-4 mb-4">
                    <p className="text-xs text-mochi-navy/70 mb-2 font-bold uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-medium">{order.shippingFirstName} {order.shippingLastName}</p>
                    <p className="text-sm">{order.shippingStreet}, {order.shippingCity} {order.shippingZipCode}</p>
                  </div>

                  <div className="border-t border-mochi-sky/30 pt-4">
                    <p className="text-xs text-mochi-navy/70 mb-2 font-bold uppercase tracking-widest">Items</p>
                    {order.orderItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm py-1">
                        <span>{item.quantity}x {item.productName}</span>
                        <span className="font-mono">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-lg font-bold pt-4 mt-2 border-t border-mochi-sky/30">
                      <span>Total</span>
                      <span className="font-mono text-mochi-teal">${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modals for Create/Edit/Delete omitted for brevity, logic remains from original */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-mochi-navy/60 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-mochi-cream rounded-xl shadow-2xl p-8 border border-mochi-sky max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-mochi-ocean hover:text-mochi-navy transition-colors">
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-mochi-navy">
                {formMode === 'create' ? 'Add New Product' : 'Edit Product'}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Product Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-mochi-sky focus:outline-none focus:border-mochi-teal py-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Major Product Image</label>
                  <div className="flex items-center gap-4">
                    {formData.majorImageUrl && <img src={formData.majorImageUrl} alt="Preview" className="w-12 h-12 object-cover rounded shadow" />}
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'majorImageUrl')} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-mochi-teal file:text-white hover:file:bg-mochi-ocean transition-colors cursor-pointer" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Gallery Image 1</label>
                    <div className="flex items-center gap-4">
                      {formData.minorImageUrl1 && <img src={formData.minorImageUrl1} alt="Preview" className="w-10 h-10 object-cover rounded shadow" />}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'minorImageUrl1')} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-mochi-sky file:text-mochi-navy hover:file:bg-mochi-teal hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Gallery Image 2</label>
                    <div className="flex items-center gap-4">
                      {formData.minorImageUrl2 && <img src={formData.minorImageUrl2} alt="Preview" className="w-10 h-10 object-cover rounded shadow" />}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'minorImageUrl2')} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-mochi-sky file:text-mochi-navy hover:file:bg-mochi-teal hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Gallery Image 3</label>
                    <div className="flex items-center gap-4">
                      {formData.minorImageUrl3 && <img src={formData.minorImageUrl3} alt="Preview" className="w-10 h-10 object-cover rounded shadow" />}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'minorImageUrl3')} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-mochi-sky file:text-mochi-navy hover:file:bg-mochi-teal hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Gallery Image 4</label>
                    <div className="flex items-center gap-4">
                      {formData.minorImageUrl4 && <img src={formData.minorImageUrl4} alt="Preview" className="w-10 h-10 object-cover rounded shadow" />}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'minorImageUrl4')} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-mochi-sky file:text-mochi-navy hover:file:bg-mochi-teal hover:file:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-b border-mochi-sky focus:outline-none focus:border-mochi-teal py-2 h-20" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-b border-mochi-sky focus:outline-none focus:border-mochi-teal py-2 text-sm">
                    <option value="Ceramics">Ceramics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Decor">Decor</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Price (USD)</label>
                    <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-transparent border-b border-mochi-sky focus:outline-none focus:border-mochi-teal py-2" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-mochi-ocean mb-1">Stock Qty</label>
                    <input type="number" required value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})} className="w-full bg-transparent border-b border-mochi-sky focus:outline-none focus:border-mochi-teal py-2" />
                  </div>
                </div>
                <div className="pt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-mochi-ocean">Cancel</button>
                  <button type="submit" className="bg-mochi-teal hover:bg-mochi-ocean text-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest shadow-sm">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-mochi-navy/60 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-mochi-cream rounded-xl shadow-2xl p-8 border border-mochi-sky text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6"><AlertTriangle size={32} /></div>
              <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 bg-white border border-mochi-sky font-bold uppercase text-xs">Cancel</button>
                <button onClick={handleDeleteExecute} className="flex-1 py-3 bg-red-600 text-white font-bold uppercase text-xs">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Overlay Message */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-mochi-navy/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-12 text-center max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Logged Out</h2>
              <p className="text-gray-500 font-light">
                Successfully signed out of the dashboard. Redirecting...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
