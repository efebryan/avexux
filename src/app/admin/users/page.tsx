"use client";

import { useState, useEffect } from "react";
import { Search, Download, UserPlus, SlidersHorizontal, ChevronDown, Info, Eye, Edit2, Trash2, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { CreateUserModal } from "@/components/admin/CreateUserModal";
import { DeleteModal } from "@/components/ui/delete-modal";

// UI User Type
type AdminUser = {
  id: string;
  username: string;
  email: string;
  joined: string;
  status: string;
  earnings: number;
  tasks: number;
  initials: string;
  role: string;
  referralCode: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  async function fetchUsers() {
    setIsLoading(true);
    // Fetch profiles with their associated wallet data
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email,
        role,
        status,
        created_at,
        referral_code,
        wallets(total_earned)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load users from database");
      setIsLoading(false);
      return;
    }

    const { data: submissions } = await supabase
      .from("task_submissions")
      .select("user_id")
      .eq("status", "Approved");

    const formattedUsers: AdminUser[] = (profiles || []).map((p: any) => {
      // Calculate initials
      const nameParts = (p.full_name || "User").split(" ");
      const initials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : (p.full_name || "U").substring(0, 2).toUpperCase();

      // Extract earnings
      const earnings = p.wallets 
        ? (Array.isArray(p.wallets) ? Number(p.wallets[0]?.total_earned || 0) : Number(p.wallets.total_earned || 0))
        : 0;

      // Format Date
      const dateObj = new Date(p.created_at);
      const joined = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      // Count approved tasks
      const completedTasks = submissions 
        ? submissions.filter((s: any) => s.user_id === p.id).length 
        : 0;

      return {
        id: p.id,
        username: p.full_name || "Unknown User",
        email: p.email || "",
        joined,
        status: p.status || "ACTIVE",
        earnings,
        tasks: completedTasks,
        initials,
        role: p.role === "admin" ? "Admin" : p.role === "moderator" ? "Moderator" : "User",
        referralCode: p.referral_code || ""
      };
    });

    setUsers(formattedUsers);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [joinedFilter, setJoinedFilter] = useState("All"); // All, 2023, 2024
  const [activeDropdown, setActiveDropdown] = useState<"status" | "role" | "joined" | null>(null);

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // View Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userToView, setUserToView] = useState<AdminUser | null>(null);
  
  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    // Call secure RPC to delete user from auth.users (cascades to all other tables)
    const { error } = await supabase.rpc('delete_user_completely', { p_user_id: userToDelete.id });

    if (error) {
      toast.error(`Failed to delete user: ${error.message}`);
      setIsDeleteModalOpen(false);
      return;
    }

    setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
    setIsDeleteModalOpen(false);
    toast.success(`${userToDelete.username} has been permanently deleted.`);
    setUserToDelete(null);
  };

  const handleViewDetails = (user: AdminUser) => {
    setUserToView(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Update referral code in database if changed
    const originalUser = users.find(u => u.id === selectedUser.id);
    if (originalUser && originalUser.referralCode !== selectedUser.referralCode) {
      const { error } = await supabase
        .from('profiles')
        .update({ referral_code: selectedUser.referralCode })
        .eq('id', selectedUser.id);
        
      if (error) {
        toast.error(`Failed to update referral code: ${error.message}`);
        return;
      }
    }

    setUsers(prev => prev.map(user => user.id === selectedUser.id ? selectedUser : user));
    setIsEditModalOpen(false);
    toast.success(`${selectedUser.username}'s details have been successfully updated!`);
  };

  // Dynamic Filtering Logic
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.id.includes(searchLower);

    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    let matchesJoined = true;
    if (joinedFilter !== "All") {
      matchesJoined = user.joined.endsWith(joinedFilter);
    }

    return matchesSearch && matchesStatus && matchesRole && matchesJoined;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Total users: <span className="font-bold text-slate-700">{users.length}</span></p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 hidden sm:flex shadow-sm">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export CSV
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/95 text-white font-semibold shadow-sm rounded-lg px-5 w-full md:w-auto"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-2 sm:p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-4 justify-between items-center relative z-20">
        
        {/* Search */}
        <div className="w-full xl:max-w-md">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user ID, transaction, or task..."
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto justify-between">
          {/* Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            
            {/* Status Selector */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "status" ? null : "status")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                Status: <span className="text-slate-500 font-bold">{statusFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>
              {activeDropdown === "status" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                  {["All", "ACTIVE", "PENDING", "SUSPENDED"].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${
                        statusFilter === status ? "text-primary bg-primary/10" : "text-slate-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Selector */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "role" ? null : "role")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-slate-400" />
                Role: <span className="text-slate-500 font-bold">{roleFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>
              {activeDropdown === "role" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                  {["All", "Admin", "User", "Moderator"].map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleFilter(role);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${
                        roleFilter === role ? "text-primary bg-primary/10" : "text-slate-700"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Joined Selector */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === "joined" ? null : "joined")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-slate-400" />
                Joined: <span className="text-slate-500 font-bold">{joinedFilter === "All" ? "Anytime" : joinedFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>
              {activeDropdown === "joined" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                  {["All", "2023", "2024"].map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setJoinedFilter(year);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${
                        joinedFilter === year ? "text-primary bg-primary/10" : "text-slate-700"
                      }`}
                    >
                      {year === "All" ? "Anytime" : year}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">USER</th>
                <th className="px-6 py-4 text-center">ROLE</th>
                <th className="px-6 py-4 text-center">STATUS</th>
                <th className="px-6 py-4">JOINED DATE</th>
                <th className="px-6 py-4 text-center">TASKS</th>
                <th className="px-6 py-4">EARNINGS</th>
                <th className="px-6 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 w-[300px]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {user.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{user.username}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        user.status === 'ACTIVE' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : user.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === 'ACTIVE' ? 'bg-green-500' : user.status === 'PENDING' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-900 font-bold">
                      {user.tasks}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦ {user.earnings.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4 text-slate-400">
                        <button 
                          onClick={() => handleViewDetails(user)}
                          className="hover:text-primary transition-colors" 
                          title="View details"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="hover:text-blue-500 transition-colors" 
                          title="Edit user"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)}
                          className="hover:text-red-500 transition-colors" 
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400 font-medium">
                    No users found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing <span className="font-bold text-slate-700">1-{filteredUsers.length}</span> of <span className="font-bold text-slate-700">{filteredUsers.length}</span> users
          </p>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-400 border-slate-200">
              <span className="sr-only">Previous</span>
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-primary text-white border-primary hover:bg-primary/90 hover:text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-100">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-100">
              3
            </Button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs tracking-widest">...</span>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-100">
              125
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-100">
              <span className="sr-only">Next</span>
              &gt;
            </Button>
          </div>
        </div>
      </div>

      <CreateUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchUsers} 
      />

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden transform transition-all duration-300 animate-in scale-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit User Details</h3>
                <p className="text-xs text-slate-500 mt-1">Modify account parameters for {selectedUser.username}</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveChanges}>
              <div className="p-6 space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={selectedUser.username}
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                  />
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Referral Code</label>
                  <input
                    type="text"
                    required
                    value={selectedUser.referralCode}
                    onChange={(e) => setSelectedUser({ ...selectedUser, referralCode: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tasks */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tasks Completed</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={selectedUser.tasks}
                      onChange={(e) => setSelectedUser({ ...selectedUser, tasks: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                    />
                  </div>

                  {/* Earnings */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Earnings (₦)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={selectedUser.earnings}
                      onChange={(e) => setSelectedUser({ ...selectedUser, earnings: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Account Status</label>
                    <select
                      value={selectedUser.status}
                      onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="PENDING">PENDING</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">User Role</label>
                    <select
                      value={selectedUser.role || "User"}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-slate-900 font-semibold"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 px-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 font-semibold text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="lg"
                  className="px-5 font-semibold text-xs"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={userToDelete?.username || ""}
      />

      {/* View User Modal */}
      {isViewModalOpen && userToView && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden transform transition-all duration-300 animate-in scale-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">
                  {userToView.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{userToView.username}</h3>
                  <p className="text-xs text-slate-500 mt-1">{userToView.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold self-start"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role</p>
                  <p className="font-semibold text-slate-900">{userToView.role}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <p className={`font-semibold ${userToView.status === 'ACTIVE' ? 'text-green-600' : userToView.status === 'PENDING' ? 'text-amber-600' : 'text-red-600'}`}>
                    {userToView.status}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Joined Date</p>
                  <p className="font-semibold text-slate-900">{userToView.joined}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Referral Code</p>
                  <p className="font-semibold text-slate-900 uppercase">{userToView.referralCode}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tasks Completed</p>
                  <p className="font-semibold text-slate-900">{userToView.tasks}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Earnings</p>
                  <p className="text-xl font-bold text-slate-900">₦{userToView.earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 px-6">
              <Button 
                type="button" 
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 font-semibold text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
