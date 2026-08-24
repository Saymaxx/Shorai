'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Download, 
  Search, 
  RefreshCw, 
  Building2, 
  Phone, 
  Mail, 
  PlusCircle, 
  FileSpreadsheet, 
  Save, 
  RotateCcw, 
  Home, 
  Lightbulb, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  Zap,
  Sparkles,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useContent } from '@/context/ContentContext';
import { SiteContent } from '@/config/defaultContent';

interface Lead {
  id: string;
  name: string;
  email: string;
  contact: string;
  organisation: string;
  purpose: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'converted';
  createdAt: string;
  syncedToGoogleSheet?: boolean;
}

type AdminTab = 'leads' | 'home-cms' | 'why-cms' | 'schools-cms' | 'about-contact-cms';

export default function AdminPage() {
  usePageMeta({
    title: 'Visual CMS & Admin Portal | Shorai STEM Inquiries',
    description: 'Internal management console for viewing leads and visually editing all pages of the Shorai platform.',
  });

  const { content, updateContent, resetToDefaults, isCustomized } = useContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [secret, setSecret] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  
  // Leads CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ totalLeads: 0, newLeads: 0, contactedLeads: 0, scheduledLeads: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [pasteData, setPasteData] = useState('');
  const [importStatus, setImportStatus] = useState('');

  // CMS Editor State (Deep copy of live content for editing)
  const [editableContent, setEditableContent] = useState<SiteContent>(content);
  const [saveStatus, setSaveStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const fetchLeads = async (authSecret: string) => {
    setIsLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${authSecret}` },
      });

      if (res.status === 401) {
        setAuthError('Invalid Admin Secret key.');
        setIsLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setStats(data.stats || { totalLeads: 0, newLeads: 0, contactedLeads: 0, scheduledLeads: 0 });
        setIsAuthenticated(true);
        sessionStorage.setItem('shorai_admin_secret', authSecret);
      }
    } catch {
      setAuthError('Could not connect to backend API server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('shorai_admin_secret');
    if (saved) {
      setSecret(saved);
      fetchLeads(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret.trim()) {
      fetchLeads(secret.trim());
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secret}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        setStats(prev => {
          const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
          return {
            totalLeads: updated.length,
            newLeads: updated.filter(l => l.status === 'new').length,
            contactedLeads: updated.filter(l => l.status === 'contacted').length,
            scheduledLeads: updated.filter(l => l.status === 'scheduled').length,
          };
        });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleBatchImport = async () => {
    if (!pasteData.trim()) return;

    const lines = pasteData.trim().split('\n');
    const parsedList: any[] = [];

    for (const line of lines) {
      const parts = line.split('\t').length > 1 ? line.split('\t') : line.split(',');
      if (parts.length >= 2) {
        parsedList.push({
          name: parts[0]?.trim() || 'Inquiry',
          email: parts[1]?.trim() || '',
          contact: parts[2]?.trim() || '',
          organisation: parts[3]?.trim() || '',
          purpose: parts[4]?.trim() || 'School Innovation Lab Setup',
          message: parts[5]?.trim() || '',
        });
      }
    }

    if (parsedList.length === 0) {
      setImportStatus('No valid rows found. Please separate fields by tab or comma.');
      return;
    }

    try {
      setImportStatus(`Importing ${parsedList.length} rows...`);
      const res = await fetch('/api/leads/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secret}`,
        },
        body: JSON.stringify({ leads: parsedList }),
      });

      if (res.ok) {
        setImportStatus(`Successfully imported ${parsedList.length} leads!`);
        setTimeout(() => {
          setIsImportOpen(false);
          setPasteData('');
          setImportStatus('');
          fetchLeads(secret);
        }, 1000);
      }
    } catch {
      setImportStatus('Import failed.');
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Contact', 'Organisation', 'Purpose', 'Status', 'Message', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.contact}"`,
      `"${l.organisation || ''}"`,
      `"${l.purpose}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      l.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shorai_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CMS Save Handler
  const handleSaveCMS = async () => {
    setIsSaving(true);
    setSaveStatus({ message: '', type: '' });

    const res = await updateContent(editableContent, secret);
    setIsSaving(false);

    if (res.success) {
      setSaveStatus({ message: '✨ All changes saved live to the website!', type: 'success' });
      setTimeout(() => setSaveStatus({ message: '', type: '' }), 4000);
    } else {
      setSaveStatus({ message: 'Error saving changes.', type: 'error' });
    }
  };

  // Reset to Defaults
  const handleResetCMS = async () => {
    if (confirm('Are you sure you want to reset all website text and sections to original factory defaults?')) {
      const res = await resetToDefaults(secret);
      if (res.success) {
        setSaveStatus({ message: 'Reset all site content to original defaults.', type: 'success' });
      }
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.organisation && l.organisation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.contact.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ── LOGIN VIEW ── */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-card border-2 border-border shadow-2xl text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/40 bg-white dark:bg-[#0B0F19] p-1 shadow-lg mx-auto mb-4">
              <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
            </div>
            
            <h2 className="text-2xl font-black text-foreground mb-1">Shorai Visual CMS &amp; Admin</h2>
            <p className="text-xs text-muted-foreground mb-6">Enter your administrator secret to access the visual page editor and leads manager.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Admin Secret..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-muted border border-border focus:border-primary text-sm focus:outline-none transition-all text-center font-mono"
              />

              {authError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Access CMS & Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* ── AUTHENTICATED: VISUAL CMS & CRM PLATFORM ── */
          <div className="space-y-8">
            
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SHORAI VISUAL CMS &amp; MANAGEMENT CONSOLE</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                  Content Management &amp; Inquiries
                </h1>
              </div>

              {/* Top Navigation Tabs */}
              <div className="flex flex-wrap items-center bg-muted/60 p-1.5 rounded-2xl border border-border gap-1 text-xs font-mono font-bold">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'leads' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Leads CRM ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('home-cms')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'home-cms' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home CMS</span>
                </button>

                <button
                  onClick={() => setActiveTab('why-cms')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'why-cms' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Why Shorai CMS</span>
                </button>

                <button
                  onClick={() => setActiveTab('schools-cms')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'schools-cms' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Schools &amp; Curriculum</span>
                </button>

                <button
                  onClick={() => setActiveTab('about-contact-cms')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'about-contact-cms' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>About &amp; Contact</span>
                </button>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                TAB 1: LEADS & INQUIRIES CRM
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsImportOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1.5 transition-all"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Import Google Sheet Rows</span>
                    </button>

                    <button
                      onClick={() => fetchLeads(secret)}
                      className="px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 border border-border text-xs font-bold font-mono flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <button
                    onClick={exportCSV}
                    disabled={leads.length === 0}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-md hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-card border border-border">
                    <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase">TOTAL INQUIRIES</div>
                    <div className="text-2xl font-black text-foreground mt-1">{stats.totalLeads}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-amber-500/30 bg-amber-500/[0.03]">
                    <div className="text-[10px] font-mono font-bold text-amber-500 uppercase">NEW / UNTOUCHED</div>
                    <div className="text-2xl font-black text-amber-500 mt-1">{stats.newLeads}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-sky-500/30 bg-sky-500/[0.03]">
                    <div className="text-[10px] font-mono font-bold text-sky-500 uppercase">CONTACTED</div>
                    <div className="text-2xl font-black text-sky-500 mt-1">{stats.contactedLeads}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-emerald-500/30 bg-emerald-500/[0.03]">
                    <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase">SCHEDULED DEMOS</div>
                    <div className="text-2xl font-black text-emerald-500 mt-1">{stats.scheduledLeads}</div>
                  </div>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by school, principal name, email, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary text-xs sm:text-sm focus:outline-none transition-all"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary text-xs font-mono font-bold focus:outline-none"
                  >
                    <option value="all">All Statuses ({leads.length})</option>
                    <option value="new">New Only</option>
                    <option value="contacted">Contacted</option>
                    <option value="scheduled">Scheduled Demo</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>

                {/* Table */}
                <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/60 text-muted-foreground font-mono uppercase text-[10px] border-b border-border">
                        <tr>
                          <th className="py-3 px-4">Educator / School</th>
                          <th className="py-3 px-4">Contact Details</th>
                          <th className="py-3 px-4">Program Interest</th>
                          <th className="py-3 px-4">Action Status</th>
                          <th className="py-3 px-4">Received At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-muted-foreground font-medium">
                              No inquiries found. Click <strong>&quot;Import Google Sheet Rows&quot;</strong> above to paste rows from your spreadsheet.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                              <td className="py-4 px-4">
                                <div className="font-bold text-foreground text-sm">{lead.name}</div>
                                <div className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <Building2 className="w-3 h-3 text-primary" />
                                  <span>{lead.organisation || 'Independent / Individual'}</span>
                                </div>
                                {lead.message && (
                                  <div className="mt-1 text-[11px] text-muted-foreground/90 bg-muted/50 p-1.5 rounded-lg line-clamp-2">
                                    &quot;{lead.message}&quot;
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4 space-y-1 font-mono">
                                <a href={`tel:${lead.contact}`} className="flex items-center gap-1.5 text-foreground hover:text-primary font-bold">
                                  <Phone className="w-3 h-3 text-emerald-500" />
                                  <span>{lead.contact}</span>
                                </a>
                                {lead.email && (
                                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                                    <Mail className="w-3 h-3 text-sky-500" />
                                    <span>{lead.email}</span>
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold font-mono text-[11px]">
                                  {lead.purpose}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                  className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black uppercase border cursor-pointer focus:outline-none ${
                                    lead.status === 'new' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' :
                                    lead.status === 'contacted' ? 'bg-sky-500/15 text-sky-500 border-sky-500/30' :
                                    lead.status === 'scheduled' ? 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30' :
                                    'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                                  }`}
                                >
                                  <option value="new">NEW</option>
                                  <option value="contacted">CONTACTED</option>
                                  <option value="scheduled">DEMO SCHEDULED</option>
                                  <option value="converted">CONVERTED</option>
                                </select>
                              </td>
                              <td className="py-4 px-4 font-mono text-muted-foreground text-[11px]">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Import Modal */}
                {isImportOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-xl p-6 rounded-3xl bg-card border-2 border-border shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                          <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                          <span>Import Historical Google Sheet Rows</span>
                        </h3>
                        <button onClick={() => setIsImportOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Copy rows from your Google Sheet (Columns: Name, Email, Contact, School, Purpose, Message) and paste them here:
                      </p>

                      <textarea
                        rows={6}
                        placeholder="Paste rows from Google Sheets here..."
                        value={pasteData}
                        onChange={(e) => setPasteData(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-muted border border-border text-xs font-mono focus:outline-none focus:border-primary"
                      />

                      {importStatus && (
                        <div className="text-xs font-mono font-bold text-primary">{importStatus}</div>
                      )}

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => setIsImportOpen(false)}
                          className="px-4 py-2 rounded-xl bg-muted text-xs font-bold hover:bg-muted/80"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleBatchImport}
                          className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold font-mono hover:bg-emerald-600 shadow-md"
                        >
                          Process &amp; Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 2: HOME PAGE CMS EDITOR (ALL SECTIONS COVERED)
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'home-cms' && (
              <div className="space-y-8">
                
                {/* 1. Hero Section Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      <span>1. Hero Section &amp; CTAs</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">HERO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Top Eyebrow Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Main Text (Line 1)</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.titleLine1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, titleLine1: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Tagline Under Headline</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.tagline || 'AI • ROBOTICS • STEM • CODING • INNOVATION LABS'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, tagline: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.primaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, primaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.home.hero.secondaryButtonText || 'Explore 3D Labs'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            hero: { ...editableContent.home.hero, secondaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={2}
                      value={editableContent.home.hero.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        home: {
                          ...editableContent.home,
                          hero: { ...editableContent.home.hero, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 2. What Is Shorai Section Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-indigo-500" />
                      <span>2. &quot;What is Shorai?&quot; Section</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">WHAT IS SHORAI</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.whatIsShorai.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whatIsShorai: { ...editableContent.home.whatIsShorai, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.home.whatIsShorai.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whatIsShorai: { ...editableContent.home.whatIsShorai, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.whatIsShorai.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whatIsShorai: { ...editableContent.home.whatIsShorai, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Lead Sentence</label>
                    <input
                      type="text"
                      value={editableContent.home.whatIsShorai.leadSentence || 'The Next-Generation STEM, Robotics & AI Innovation Ecosystem for Future-Ready Schools.'}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        home: {
                          ...editableContent.home,
                          whatIsShorai: { ...editableContent.home.whatIsShorai, leadSentence: e.target.value }
                        }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Description Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={editableContent.home.whatIsShorai.description1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whatIsShorai: { ...editableContent.home.whatIsShorai, description1: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Description Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={editableContent.home.whatIsShorai.description2}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whatIsShorai: { ...editableContent.home.whatIsShorai, description2: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Why Schools Need Shorai Section & Data-Driven Insights Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <span>3. Why Schools Need Shorai &amp; Data-Driven Insights</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">WHY SHORAI</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.whySchoolsNeedShorai.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.home.whySchoolsNeedShorai.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.whySchoolsNeedShorai.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.home.whySchoolsNeedShorai.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        home: {
                          ...editableContent.home,
                          whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* 4 Data-Driven Insights Cards Editor */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Data-Driven Insights Metrics (4 Stat Cards):
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {editableContent.home.whySchoolsNeedShorai.insights.map((ins, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                          <span className="text-[10px] font-mono font-bold text-accent block">CARD {idx + 1}</span>
                          <input
                            type="text"
                            placeholder="Stat (e.g. 9 in 10)"
                            value={ins.stat}
                            onChange={(e) => {
                              const newIns = [...editableContent.home.whySchoolsNeedShorai.insights];
                              newIns[idx].stat = e.target.value;
                              setEditableContent({
                                ...editableContent,
                                home: {
                                  ...editableContent.home,
                                  whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, insights: newIns }
                                }
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-bold font-mono"
                          />
                          <input
                            type="text"
                            placeholder="Label"
                            value={ins.label}
                            onChange={(e) => {
                              const newIns = [...editableContent.home.whySchoolsNeedShorai.insights];
                              newIns[idx].label = e.target.value;
                              setEditableContent({
                                ...editableContent,
                                home: {
                                  ...editableContent.home,
                                  whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, insights: newIns }
                                }
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Description"
                            value={ins.desc}
                            onChange={(e) => {
                              const newIns = [...editableContent.home.whySchoolsNeedShorai.insights];
                              newIns[idx].desc = e.target.value;
                              setEditableContent({
                                ...editableContent,
                                home: {
                                  ...editableContent.home,
                                  whySchoolsNeedShorai: { ...editableContent.home.whySchoolsNeedShorai, insights: newIns }
                                }
                              });
                            }}
                            className="w-full p-2 rounded-lg bg-card border border-border text-[11px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Innovation Labs Section Box (WHERE STUDENTS BUILD THE FUTURE) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      <span>4. &quot;WHERE STUDENTS BUILD THE FUTURE&quot; (Innovation Labs)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-lg">INNOVATION LABS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.innovationLabs.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            innovationLabs: { ...editableContent.home.innovationLabs, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Prefix</label>
                      <input
                        type="text"
                        value={editableContent.home.innovationLabs.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            innovationLabs: { ...editableContent.home.innovationLabs, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.innovationLabs.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            innovationLabs: { ...editableContent.home.innovationLabs, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.home.innovationLabs.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        home: {
                          ...editableContent.home,
                          innovationLabs: { ...editableContent.home.innovationLabs, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 5. Young Innovators Testimonials Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <span>5. &quot;HEAR FROM OUR YOUNG INNOVATORS&quot; (Testimonials)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">TESTIMONIALS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.testimonials.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            testimonials: { ...editableContent.home.testimonials, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.home.testimonials.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            testimonials: { ...editableContent.home.testimonials, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.testimonials.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            testimonials: { ...editableContent.home.testimonials, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* 4 Student Reviews Editor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {editableContent.home.testimonials.reviews.map((rev, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">{rev.name}</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">{rev.tag}</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Grade & School"
                          value={rev.grade}
                          onChange={(e) => {
                            const newRevs = [...editableContent.home.testimonials.reviews];
                            newRevs[idx].grade = e.target.value;
                            setEditableContent({
                              ...editableContent,
                              home: {
                                ...editableContent.home,
                                testimonials: { ...editableContent.home.testimonials, reviews: newRevs }
                              }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground"
                        />
                        <textarea
                          rows={2}
                          placeholder="Student Quote"
                          value={rev.quote}
                          onChange={(e) => {
                            const newRevs = [...editableContent.home.testimonials.reviews];
                            newRevs[idx].quote = e.target.value;
                            setEditableContent({
                              ...editableContent,
                              home: {
                                ...editableContent.home,
                                testimonials: { ...editableContent.home.testimonials, reviews: newRevs }
                              }
                            });
                          }}
                          className="w-full p-2.5 rounded-lg bg-card border border-border text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Get in Touch Form & Final CTA Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sky-500" />
                      <span>6. &quot;Get in Touch&quot; &amp; Consultation Form</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-lg">GET IN TOUCH</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.home.getInTouch.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            getInTouch: { ...editableContent.home.getInTouch, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Title Line 1</label>
                      <input
                        type="text"
                        value={editableContent.home.getInTouch.titleLine1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            getInTouch: { ...editableContent.home.getInTouch, titleLine1: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Title Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.home.getInTouch.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            getInTouch: { ...editableContent.home.getInTouch, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Form Card Heading</label>
                      <input
                        type="text"
                        value={editableContent.home.getInTouch.formTitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            getInTouch: { ...editableContent.home.getInTouch, formTitle: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Form Card Subtitle</label>
                      <input
                        type="text"
                        value={editableContent.home.getInTouch.formSubtitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          home: {
                            ...editableContent.home,
                            getInTouch: { ...editableContent.home.getInTouch, formSubtitle: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.home.getInTouch.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        home: {
                          ...editableContent.home,
                          getInTouch: { ...editableContent.home.getInTouch, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 3: WHY SHORAI CMS EDITOR (ALL SECTIONS COVERED)
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'why-cms' && (
              <div className="space-y-8">
                
                {/* 1. Hero Section Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      <span>1. Hero Section &amp; CTAs</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">HERO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.hero.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            hero: { ...editableContent.whyShorai.hero, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.hero.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            hero: { ...editableContent.whyShorai.hero, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.hero.titleGradient || 'SHORAI LABS'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            hero: { ...editableContent.whyShorai.hero, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.hero.primaryButtonText || 'Book School Demonstration'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            hero: { ...editableContent.whyShorai.hero, primaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.hero.secondaryButtonText || 'Explore Lab Packages'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            hero: { ...editableContent.whyShorai.hero, secondaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.whyShorai.hero.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        whyShorai: {
                          ...editableContent.whyShorai,
                          hero: { ...editableContent.whyShorai.hero, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 2. Why Schools Need Shorai Banner Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-indigo-500" />
                      <span>2. Why Schools Need Shorai Banner (Brochure Match)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">BANNER</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.banner.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            banner: { ...editableContent.whyShorai.banner, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.banner.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            banner: { ...editableContent.whyShorai.banner, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.banner.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            banner: { ...editableContent.whyShorai.banner, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Core Narrative Paragraph</label>
                    <textarea
                      rows={3}
                      value={editableContent.whyShorai.banner.narrative}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        whyShorai: {
                          ...editableContent.whyShorai,
                          banner: { ...editableContent.whyShorai.banner, narrative: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Floating Purple Quote</label>
                      <textarea
                        rows={3}
                        value={editableContent.whyShorai.banner.quote}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            banner: { ...editableContent.whyShorai.banner, quote: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Prominent Bottom Statement Banner</label>
                      <textarea
                        rows={3}
                        value={editableContent.whyShorai.banner.bottomStatement}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            banner: { ...editableContent.whyShorai.banner, bottomStatement: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. AT SHORAI, we build. 3D Lab Demos */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <span>3. &quot;AT SHORAI, we build.&quot; (4 Interactive 3D Demos)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">3D LABS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.badge || 'INTERACTIVE 3D LAB EXPERIENCES'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Heading</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.subtitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, subtitle: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* 4 Models Text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <div className="text-xs font-bold text-sky-500 font-mono">1. DRONE DEMO</div>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.droneTitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, droneTitle: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={editableContent.whyShorai.atShoraiWeBuild.droneDesc}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, droneDesc: e.target.value }
                          }
                        })}
                        className="w-full p-2 rounded-xl bg-card border border-border text-[11px]"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <div className="text-xs font-bold text-purple-500 font-mono">2. AI NEURAL DEMO</div>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.aiTitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, aiTitle: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={editableContent.whyShorai.atShoraiWeBuild.aiDesc}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, aiDesc: e.target.value }
                          }
                        })}
                        className="w-full p-2 rounded-xl bg-card border border-border text-[11px]"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <div className="text-xs font-bold text-emerald-500 font-mono">3. CODING DEMO</div>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.codingTitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, codingTitle: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={editableContent.whyShorai.atShoraiWeBuild.codingDesc}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, codingDesc: e.target.value }
                          }
                        })}
                        className="w-full p-2 rounded-xl bg-card border border-border text-[11px]"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <div className="text-xs font-bold text-amber-500 font-mono">4. MARS ROVER DEMO</div>
                      <input
                        type="text"
                        value={editableContent.whyShorai.atShoraiWeBuild.roverTitle}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, roverTitle: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={editableContent.whyShorai.atShoraiWeBuild.roverDesc}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            atShoraiWeBuild: { ...editableContent.whyShorai.atShoraiWeBuild, roverDesc: e.target.value }
                          }
                        })}
                        className="w-full p-2 rounded-xl bg-card border border-border text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Shorai 360° Education Ecosystem Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      <span>4. Shorai 360° Education Ecosystem</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-lg">360° ECOSYSTEM</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.ecosystem360.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            ecosystem360: { ...editableContent.whyShorai.ecosystem360, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.ecosystem360.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            ecosystem360: { ...editableContent.whyShorai.ecosystem360, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.ecosystem360.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            ecosystem360: { ...editableContent.whyShorai.ecosystem360, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.whyShorai.ecosystem360.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        whyShorai: {
                          ...editableContent.whyShorai,
                          ecosystem360: { ...editableContent.whyShorai.ecosystem360, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 5. Future Skills Ecosystem Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <span>5. Future Skills Ecosystem</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">FUTURE SKILLS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.futureSkills.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            futureSkills: { ...editableContent.whyShorai.futureSkills, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.futureSkills.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            futureSkills: { ...editableContent.whyShorai.futureSkills, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.futureSkills.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            futureSkills: { ...editableContent.whyShorai.futureSkills, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.whyShorai.futureSkills.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        whyShorai: {
                          ...editableContent.whyShorai,
                          futureSkills: { ...editableContent.whyShorai.futureSkills, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 6. Closing Final CTA Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sky-500" />
                      <span>6. Closing Institutional Acceleration CTA</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-lg">FINAL CTA</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.finalCta.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            finalCta: { ...editableContent.whyShorai.finalCta, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Title Line 1</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.finalCta.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            finalCta: { ...editableContent.whyShorai.finalCta, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Title Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.finalCta.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            finalCta: { ...editableContent.whyShorai.finalCta, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.finalCta.primaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            finalCta: { ...editableContent.whyShorai.finalCta, primaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.whyShorai.finalCta.secondaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          whyShorai: {
                            ...editableContent.whyShorai,
                            finalCta: { ...editableContent.whyShorai.finalCta, secondaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.whyShorai.finalCta.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        whyShorai: {
                          ...editableContent.whyShorai,
                          finalCta: { ...editableContent.whyShorai.finalCta, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 4: SCHOOLS & CURRICULUM CMS EDITOR (ALL SECTIONS COVERED)
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'schools-cms' && (
              <div className="space-y-8">
                
                {/* 1. Hero Section Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      <span>1. Hero Section &amp; Advantage Badges</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">HERO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Eyebrow Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.hero.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            hero: { ...editableContent.schools.hero, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Main Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.hero.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            hero: { ...editableContent.schools.hero, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Gradient Focus Word</label>
                      <input
                        type="text"
                        value={editableContent.schools.hero.titleGradient || 'FUTURE-READY STEM HUB.'}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            hero: { ...editableContent.schools.hero, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.hero.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          hero: { ...editableContent.schools.hero, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 2. Grade-Wise Continuous Curriculum Journey */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span>2. Grade-Wise Curriculum Journey (Pre-Primary to Grade 12)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">CURRICULUM</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.curriculum.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            curriculum: { ...editableContent.schools.curriculum, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.schools.curriculum.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            curriculum: { ...editableContent.schools.curriculum, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.schools.curriculum.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            curriculum: { ...editableContent.schools.curriculum, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.curriculum.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          curriculum: { ...editableContent.schools.curriculum, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {editableContent.schools.curriculum.levels.map((level, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-foreground">{level.grades} • {level.tier}</span>
                          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">TIER {idx + 1}</span>
                        </div>

                        <textarea
                          rows={2}
                          value={level.description}
                          onChange={(e) => {
                            const newLevels = [...editableContent.schools.curriculum.levels];
                            newLevels[idx].description = e.target.value;
                            setEditableContent({
                              ...editableContent,
                              schools: {
                                ...editableContent.schools,
                                curriculum: { ...editableContent.schools.curriculum, levels: newLevels }
                              }
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-card border border-border text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Shorai vs. Traditional Providers Comparison */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span>3. Not a Vendor. A Transformation Partner (Comparison)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">COMPARISON</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.comparison.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            comparison: { ...editableContent.schools.comparison, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.schools.comparison.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            comparison: { ...editableContent.schools.comparison, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.schools.comparison.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            comparison: { ...editableContent.schools.comparison, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.comparison.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          comparison: { ...editableContent.schools.comparison, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 4. Three Partnership Tracks */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-indigo-500" />
                      <span>4. Three Ways to Begin the Partnership (Engagement Tracks)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">TRACKS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.partnershipTracks.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            partnershipTracks: { ...editableContent.schools.partnershipTracks, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.schools.partnershipTracks.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            partnershipTracks: { ...editableContent.schools.partnershipTracks, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.schools.partnershipTracks.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            partnershipTracks: { ...editableContent.schools.partnershipTracks, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.partnershipTracks.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          partnershipTracks: { ...editableContent.schools.partnershipTracks, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {editableContent.schools.partnershipTracks.tracks.map((tr, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                        <span className="text-[10px] font-mono font-bold text-primary block">TRACK 0{idx + 1}</span>
                        <input
                          type="text"
                          value={tr.name}
                          onChange={(e) => {
                            const newTracks = [...editableContent.schools.partnershipTracks.tracks];
                            newTracks[idx].name = e.target.value;
                            setEditableContent({
                              ...editableContent,
                              schools: {
                                ...editableContent.schools,
                                partnershipTracks: { ...editableContent.schools.partnershipTracks, tracks: newTracks }
                              }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                        />
                        <textarea
                          rows={2}
                          value={tr.tagline}
                          onChange={(e) => {
                            const newTracks = [...editableContent.schools.partnershipTracks.tracks];
                            newTracks[idx].tagline = e.target.value;
                            setEditableContent({
                              ...editableContent,
                              schools: {
                                ...editableContent.schools,
                                partnershipTracks: { ...editableContent.schools.partnershipTracks, tracks: newTracks }
                              }
                            });
                          }}
                          className="w-full p-2 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. 5-Step Deployment Methodology */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span>5. 5-Step Turnkey Implementation Roadmap</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">ROADMAP</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.methodology.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            methodology: { ...editableContent.schools.methodology, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.schools.methodology.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            methodology: { ...editableContent.schools.methodology, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.schools.methodology.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            methodology: { ...editableContent.schools.methodology, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.methodology.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          methodology: { ...editableContent.schools.methodology, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 6. Closing Transformation CTA */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sky-500" />
                      <span>6. Closing School Audit CTA</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-lg">AUDIT CTA</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline</label>
                      <input
                        type="text"
                        value={editableContent.schools.closingCta.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            closingCta: { ...editableContent.schools.closingCta, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Button Text</label>
                      <input
                        type="text"
                        value={editableContent.schools.closingCta.buttonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          schools: {
                            ...editableContent.schools,
                            closingCta: { ...editableContent.schools.closingCta, buttonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.schools.closingCta.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        schools: {
                          ...editableContent.schools,
                          closingCta: { ...editableContent.schools.closingCta, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 5: ABOUT, CONTACT & FOOTER CMS EDITOR (ALL SECTIONS COVERED)
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'about-contact-cms' && (
              <div className="space-y-8">
                
                {/* ── PART A: ABOUT PAGE SECTIONS ── */}
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="font-mono font-bold text-xs uppercase tracking-wider text-purple-400">PART 1: ABOUT US PAGE CONTROLS</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">/about</span>
                </div>

                {/* 1. About Hero Section */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span>1. About Hero Section (Brochure Style)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">HERO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Line 1</label>
                      <input
                        type="text"
                        value={editableContent.about.hero.titleLine1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, titleLine1: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.about.hero.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline Line 2</label>
                      <input
                        type="text"
                        value={editableContent.about.hero.titleLine2}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, titleLine2: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Framed Definition Quote</label>
                      <textarea
                        rows={2}
                        value={editableContent.about.hero.quote}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, quote: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Mission Tagline</label>
                      <textarea
                        rows={2}
                        value={editableContent.about.hero.mission}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, mission: e.target.value }
                          }
                        })}
                        className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.about.hero.primaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, primaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={editableContent.about.hero.secondaryButtonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            hero: { ...editableContent.about.hero, secondaryButtonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. SEG Academy Heritage & Foundation */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-indigo-500" />
                      <span>2. SEG Academy Heritage &amp; Foundation</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">LEGACY</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.about.segAcademy.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            segAcademy: { ...editableContent.about.segAcademy, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.about.segAcademy.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            segAcademy: { ...editableContent.about.segAcademy, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.about.segAcademy.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            segAcademy: { ...editableContent.about.segAcademy, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Narrative Paragraph 1</label>
                    <textarea
                      rows={2}
                      value={editableContent.about.segAcademy.narrative1}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        about: {
                          ...editableContent.about,
                          segAcademy: { ...editableContent.about.segAcademy, narrative1: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Narrative Paragraph 2</label>
                    <textarea
                      rows={2}
                      value={editableContent.about.segAcademy.narrative2}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        about: {
                          ...editableContent.about,
                          segAcademy: { ...editableContent.about.segAcademy, narrative2: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Inspiring Philosophy Quote</label>
                    <textarea
                      rows={2}
                      value={editableContent.about.segAcademy.quote}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        about: {
                          ...editableContent.about,
                          segAcademy: { ...editableContent.about.segAcademy, quote: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-semibold"
                    />
                  </div>
                </div>

                {/* 3. Institutional Impact Stats */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span>3. Institutional Impact Statistics (3 Key Figures)</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">STATS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-primary block">STATISTIC 1</span>
                      <input
                        type="text"
                        placeholder="Value (e.g. 360°)"
                        value={editableContent.about.impact.stat1Value}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat1Value: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={editableContent.about.impact.stat1Label}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat1Label: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-primary block">STATISTIC 2</span>
                      <input
                        type="text"
                        placeholder="Value (e.g. 12+)"
                        value={editableContent.about.impact.stat2Value}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat2Value: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={editableContent.about.impact.stat2Label}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat2Label: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-primary block">STATISTIC 3</span>
                      <input
                        type="text"
                        placeholder="Value (e.g. 1000+)"
                        value={editableContent.about.impact.stat3Value}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat3Value: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={editableContent.about.impact.stat3Label}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            impact: { ...editableContent.about.impact, stat3Label: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Leadership & Mentors Heading */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span>4. Leadership &amp; Mentorship Heading</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-lg">TEAM</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.about.meetTeam.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            meetTeam: { ...editableContent.about.meetTeam, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.about.meetTeam.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            meetTeam: { ...editableContent.about.meetTeam, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.about.meetTeam.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            meetTeam: { ...editableContent.about.meetTeam, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.about.meetTeam.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        about: {
                          ...editableContent.about,
                          meetTeam: { ...editableContent.about.meetTeam, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 5. Closing About CTA */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sky-500" />
                      <span>5. Closing About Partner CTA</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-lg">PARTNER CTA</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Headline</label>
                      <input
                        type="text"
                        value={editableContent.about.closingCta.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            closingCta: { ...editableContent.about.closingCta, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Button Text</label>
                      <input
                        type="text"
                        value={editableContent.about.closingCta.buttonText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          about: {
                            ...editableContent.about,
                            closingCta: { ...editableContent.about.closingCta, buttonText: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.about.closingCta.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        about: {
                          ...editableContent.about,
                          closingCta: { ...editableContent.about.closingCta, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* ── PART B: CONTACT PAGE CONTROLS ── */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between mt-10">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400">PART 2: CONTACT PAGE CONTROLS</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">/contact</span>
                </div>

                {/* 6. Contact Hero Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span>6. Contact Hero Banner</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">CONTACT HERO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editableContent.contact.hero.badge}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            hero: { ...editableContent.contact.hero, badge: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={editableContent.contact.hero.title}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            hero: { ...editableContent.contact.hero, title: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Heading Gradient Word</label>
                      <input
                        type="text"
                        value={editableContent.contact.hero.titleGradient}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            hero: { ...editableContent.contact.hero, titleGradient: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={editableContent.contact.hero.subtitle}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        contact: {
                          ...editableContent.contact,
                          hero: { ...editableContent.contact.hero, subtitle: e.target.value }
                        }
                      })}
                      className="w-full p-3 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* 7. Direct Reach Out Channels & Helplines */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Phone className="w-5 h-5 text-emerald-500" />
                      <span>7. Direct Helplines &amp; Advisory Contacts</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">CHANNELS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-primary block">PRIMARY PHONE / HELPLINE</span>
                      <input
                        type="text"
                        placeholder="Label"
                        value={editableContent.contact.directReach.phone1Label}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, phone1Label: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={editableContent.contact.directReach.phone1}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, phone1: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-secondary block">INSTITUTIONAL ADVISORY PHONE</span>
                      <input
                        type="text"
                        placeholder="Label"
                        value={editableContent.contact.directReach.phone2Label}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, phone2Label: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Secondary Phone Number"
                        value={editableContent.contact.directReach.phone2}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, phone2: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Official Inquiry Email</label>
                      <input
                        type="text"
                        value={editableContent.contact.directReach.email}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, email: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Operational Hours</label>
                      <input
                        type="text"
                        value={editableContent.contact.directReach.hours}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          contact: {
                            ...editableContent.contact,
                            directReach: { ...editableContent.contact.directReach, hours: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 8. Locations & Centers */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      <span>8. Varanasi &amp; Kolkata Campus Addresses</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg">ADDRESSES</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Varanasi Center */}
                    <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-500 font-mono">1. VARANASI MAIN CENTER</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Center Title</label>
                        <input
                          type="text"
                          value={editableContent.contact.locations.varanasiTitle}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: {
                              ...editableContent.contact,
                              locations: { ...editableContent.contact.locations, varanasiTitle: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Full Physical Address</label>
                        <textarea
                          rows={3}
                          value={editableContent.contact.locations.varanasiAddress}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: {
                              ...editableContent.contact,
                              locations: { ...editableContent.contact.locations, varanasiAddress: e.target.value }
                            }
                          })}
                          className="w-full p-2.5 rounded-xl bg-card border border-border text-xs"
                        />
                      </div>
                    </div>

                    {/* Kolkata Center */}
                    <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-sky-500 font-mono">2. KOLKATA INNOVATION HQ</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Center Title</label>
                        <input
                          type="text"
                          value={editableContent.contact.locations.kolkataTitle}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: {
                              ...editableContent.contact,
                              locations: { ...editableContent.contact.locations, kolkataTitle: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-1.5 rounded-xl bg-card border border-border font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Full Physical Address</label>
                        <textarea
                          rows={3}
                          value={editableContent.contact.locations.kolkataAddress}
                          onChange={(e) => setEditableContent({
                            ...editableContent,
                            contact: {
                              ...editableContent.contact,
                              locations: { ...editableContent.contact.locations, kolkataAddress: e.target.value }
                            }
                          })}
                          className="w-full p-2.5 rounded-xl bg-card border border-border text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── PART C: FOOTER & LEGAL BRANDING ── */}
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between mt-10">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-sky-400" />
                    <span className="font-mono font-bold text-xs uppercase tracking-wider text-sky-400">PART 3: GLOBAL FOOTER &amp; LEGAL INFO</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">All Pages</span>
                </div>

                {/* 9. Global Footer Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-sky-500" />
                      <span>9. Footer Brand, CIN &amp; Copyright Notice</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-lg">FOOTER</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={editableContent.footer.brandName}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          footer: { ...editableContent.footer, brandName: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Brand Tagline</label>
                      <input
                        type="text"
                        value={editableContent.footer.tagline}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          footer: { ...editableContent.footer, tagline: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">MCA Corporate CIN</label>
                      <input
                        type="text"
                        value={editableContent.footer.cin}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          footer: { ...editableContent.footer, cin: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">SEG Academy Endorsement Notice</label>
                      <input
                        type="text"
                        value={editableContent.footer.segEndorsement}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          footer: { ...editableContent.footer, segEndorsement: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Copyright Statement</label>
                      <input
                        type="text"
                        value={editableContent.footer.copyrightText}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          footer: { ...editableContent.footer, copyrightText: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                FLOATING SAVE & RESET BAR FOR CMS TABS
               ═══════════════════════════════════════════════════════════════ */}
            {activeTab !== 'leads' && (
              <div className="sticky bottom-6 z-40 p-4 rounded-3xl bg-card/95 border-2 border-primary/40 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Save className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-foreground">Visual CMS Controls</div>
                    <div className="text-[11px] text-muted-foreground">Changes save live across all 6 pages instantly.</div>
                  </div>
                </div>

                {saveStatus.message && (
                  <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${
                    saveStatus.type === 'success' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' : 'bg-destructive/15 text-destructive border border-destructive/30'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{saveStatus.message}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetCMS}
                    className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-xs font-bold font-mono flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>

                  <button
                    onClick={handleSaveCMS}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white text-xs font-bold font-mono flex items-center gap-2 shadow-lg hover:opacity-95 transition-all disabled:opacity-50 hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Live Changes'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
