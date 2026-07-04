"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, Ban, CheckCircle, Wallet, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock User Data
const mockUsers = [
  { id: "1", username: "john_doe99", email: "john@example.com", joined: "Oct 24, 2023", tier: "Free", status: "Active", balance: 2450, tasksCompleted: 12, referrals: 0 },
  { id: "2", username: "sarah_tasks", email: "sarah@example.com", joined: "Oct 20, 2023", tier: "Pro", status: "Active", balance: 15400, tasksCompleted: 45, referrals: 12 },
  { id: "3", username: "mike_hustle", email: "mike.h@example.com", joined: "Oct 15, 2023", tier: "Free", status: "Suspended", balance: 500, tasksCompleted: 2, referrals: 1 },
  { id: "4", username: "crypto_king", email: "crypto@example.com", joined: "Sep 30, 2023", tier: "Pro", status: "Active", balance: 42000, tasksCompleted: 156, referrals: 45 },
  { id: "5", username: "new_guy12", email: "new@example.com", joined: "Oct 25, 2023", tier: "Free", status: "Active", balance: 1000, tasksCompleted: 0, referrals: 0 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = users.filter(user => {
    if (statusFilter !== "All" && user.status !== statusFilter) return false;
    if (searchQuery && !user.username.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "Active" ? "Suspended" : "Active";
        toast.success(`User ${u.username} marked as ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-500 text-sm">View and manage all registered users on the platform.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {["All", "Active", "Suspended"].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                statusFilter === filter 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Status & Tier</th>
                <th className="px-6 py-4 font-semibold">Wallet Balance</th>
                <th className="px-6 py-4 font-semibold">Activity</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{user.username}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                        <span className="text-[10px] text-gray-400 mt-1">Joined: {user.joined}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                          {user.tier}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900">
                        <Wallet className="w-4 h-4 text-gray-400" />
                        ₦{user.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs text-gray-600 space-y-1">
                        <span><strong className="text-gray-900">{user.tasksCompleted}</strong> tasks done</span>
                        <span><strong className="text-gray-900">{user.referrals}</strong> referrals</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleUserStatus(user.id)}
                          className={`h-8 w-8 p-0 ${
                            user.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                        >
                          {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
