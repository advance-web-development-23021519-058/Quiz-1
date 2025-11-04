import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Plus,
  Trash2,
  FileText,
  Loader,
  Users,
  AlertTriangle,
  Clipboard,
} from 'lucide-react';

const useTheme = () => ({ 
    theme: 'light', 
    toggleTheme: () => console.log('Mock: Theme toggle called') 
});

const useAuth = () => ({
  isAuthenticated: true,
  user: { uid: 'mock-user-123', name: 'Mock User' },
  logout: () => console.log('Mock: User logged out'),
});

const initialDocuments = [
  { id: crypto.randomUUID(), name: 'Financial Report Q3 2024', type: 'PDF', timestamp: 1700000000000, ownerId: 'mock-user-123' },
  { id: crypto.randomUUID(), name: 'Annual Strategy Review', type: 'DOCX', timestamp: 1705000000000, ownerId: 'mock-user-123' },
  { id: crypto.randomUUID(), name: 'Q1 Budget Proposal', type: 'XLSX', timestamp: 1715000000000, ownerId: 'mock-user-123' },
];

const Dashboard = () => {
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth(); 
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [newDocName, setNewDocName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(true);
  
  const userId = user.uid;

  useEffect(() => {
    setDocuments(initialDocuments.sort((a, b) => b.timestamp - a.timestamp));
    console.log("Mock data loaded. Firebase integration is disabled.");
  }, []);

  const handleAddDoc = useCallback(() => {
    if (!newDocName.trim()) return;

    setLoading(true);
    setTimeout(() => {
        const newDoc = {
            id: crypto.randomUUID(),
            name: newDocName.trim(),
            type: 'PDF', 
            timestamp: Date.now(),
            ownerId: userId,
        };

        setDocuments(prevDocs => {
            const updatedDocs = [...prevDocs, newDoc];
            return updatedDocs.sort((a, b) => b.timestamp - a.timestamp);
        });

        setNewDocName('');
        setLoading(false);
        console.log(`Mock: Added document: ${newDoc.name}`);
    }, 500);

  }, [newDocName, userId]);

  const handleDeleteDoc = useCallback((docId) => {
    setLoading(true);
    setTimeout(() => {
        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
        setLoading(false);
        console.log(`Mock: Deleted document ID: ${docId}`);
    }, 300);
  }, []);

  const handleLogout = useCallback(() => {
    logout(); 
    navigate('/login');
  }, [logout, navigate]);

  const handleCopyUserId = () => {
    if (userId) {
      const tempInput = document.createElement('textarea');
      tempInput.value = userId;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      console.log('User ID copied to clipboard!'); 
    }
  };


  if (!isAuthenticated && !loading) {
    navigate('/login');
    return null;
  }

  const COLOR_LIGHT_BG = '#F9FAFB';
  const COLOR_DARK_BG = '#0F172A';
  const COLOR_ACCENT = 'cyan';
  const COLOR_TEXT_DARK = '#1E293B';
  const COLOR_TEXT_MUTED = '#94A3B8';


  return (
    <div className={`min-h-screen pt-12 pb-12 font-inter transition-colors duration-300 ${theme === 'dark' ? `bg-[${COLOR_DARK_BG}] text-white` : `bg-[${COLOR_LIGHT_BG}] text-[${COLOR_TEXT_DARK}]`}`}>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 p-6 rounded-2xl shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800/70 shadow-gray-900/50' : 'bg-white shadow-gray-300/50'}`}>
          <div className="mb-4 sm:mb-0">
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : `text-[${COLOR_TEXT_DARK}]`} mb-2`}>
              👋 Welcome, {user?.name || 'User'}!
            </h1>
            <div className="flex items-center space-x-2 text-sm">
                <Users size={16} className="text-cyan-500" />
                <span className={`font-mono truncate max-w-xs ${theme === 'dark' ? `text-[${COLOR_TEXT_MUTED}]` : `text-[${COLOR_TEXT_DARK}]/70`}`}>
                  Mock User ID: {userId}
                </span>
                <button
                    onClick={handleCopyUserId}
                    className={`p-1 rounded-full hover:bg-cyan-500/20 transition-colors duration-150`}
                    title="Copy User ID (See console for confirmation)"
                >
                    <Clipboard size={14} className="text-cyan-500" />
                </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {loading && (
            <div className={`flex items-center justify-center p-6 mb-8 rounded-xl bg-cyan-500/10 ${theme === 'dark' ? 'text-white' : `text-[${COLOR_TEXT_DARK}]`}`}>
                <Loader size={24} className="animate-spin mr-3 text-cyan-500" />
                <span className="font-medium">Processing mock operation...</span>
            </div>
        )}
        {error && (
            <div className={`flex items-center p-4 mb-8 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30`}>
                <AlertTriangle size={20} className="mr-3" />
                <span className="font-medium">{error}</span>
            </div>
        )}

        <div className={`mb-10 p-6 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800/70 shadow-gray-900/50' : 'bg-white shadow-gray-300/50'}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : `text-[${COLOR_TEXT_DARK}]`}`}>
            Upload New Document
          </h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="Enter document name (e.g., Q4 Report.pdf)"
              className={`flex-grow p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              disabled={loading || !isReady}
              onKeyDown={(e) => e.key === 'Enter' && handleAddDoc()}
            />
            <button
              onClick={handleAddDoc}
              className={`flex items-center justify-center px-6 py-3 font-bold text-white rounded-xl transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl ${newDocName.trim() && !loading && isReady 
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/50' 
                : 'bg-gray-400 cursor-not-allowed shadow-none'}`}
              disabled={!newDocName.trim() || loading || !isReady}
            >
              <Plus size={20} className="mr-2" />
              {loading ? 'Processing...' : 'Upload & Add'}
            </button>
          </div>
        </div>

        <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : `text-[${COLOR_TEXT_DARK}]`}`}>
          My Documents ({documents.length})
        </h2>
        
        {documents.length === 0 && !loading && isReady && (
          <p className={`p-8 text-center rounded-xl border border-cyan-500/20 ${theme === 'dark' ? `text-[${COLOR_TEXT_MUTED}]` : 'text-gray-500'}`}>
            You have no documents yet. Add one above to get started!
          </p>
        )}

        <div className="space-y-4">
          {documents.map((docItem) => (
            <div
              key={docItem.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
            >
              <FileText size={24} className="mr-4 text-cyan-500 shrink-0" />
              
              <div className="flex-grow my-2 sm:my-0">
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : `text-[${COLOR_TEXT_DARK}]`}`}>
                  {docItem.name}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? `text-[${COLOR_TEXT_MUTED}]` : 'text-gray-500'}`}>
                  {docItem.type} - Uploaded: {new Date(docItem.timestamp).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-3 sm:mt-0 sm:ml-auto">
                <Link
                    to={`/services?docId=${docItem.id}`}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-500/30 hover:bg-cyan-600 transition duration-150 transform hover:scale-[1.05] active:scale-[0.98] whitespace-nowrap"
                >
                    Process (Mock)
                </Link>
                <button
                  onClick={() => handleDeleteDoc(docItem.id)}
                  className={`p-2 rounded-full transition duration-150 hover:bg-red-500/20 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}
                  title="Delete Document"
                  disabled={loading}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;