"use client";

import { useState } from "react";
import { Search, Download, UserPlus, SlidersHorizontal, ChevronDown, Info, Eye, Edit2, Ban, RefreshCw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data from the image
const mockUsers = [
  { 
    id: "1", 
    username: "Adebayo Chidubem", 
    email: "adebayo.c@provider.com", 
    joined: "Oct 12, 2023", 
    status: "ACTIVE", 
    earnings: 452000, 
    tasks: 142, 
    initials: "AC", 
    img: "https://ui-avatars.com/api/?name=Adebayo+Chidubem&background=E2E8F0&color=333" 
  },
  { 
    id: "2", 
    username: "Okonkwo Ifeanyi", 
    email: "ifeanyi.o@service.io", 
    joined: "Nov 05, 2023", 
    status: "PENDING", 
    earnings: 28500, 
    tasks: 12, 
    initials: "OI", 
    img: "https://ui-avatars.com/api/?name=Okonkwo+Ifeanyi&background=E2E8F0&color=333" 
  },
  { 
    id: "3", 
    username: "Fatima Yusuf", 
    email: "fatima.y@corpmail.net", 
    joined: "Sep 28, 2023", 
    status: "SUSPENDED", 
    earnings: 1120400, 
    tasks: 305, 
    initials: "FY", 
    img: "https://ui-avatars.com/api/?name=Fatima+Yusuf&background=E2E8F0&color=333" 
  },
  { 
    id: "4", 
    username: "Nnamdi Azikiwe", 
    email: "nnamdi.z@techhub.com", 
    joined: "Jan 15, 2024", 
    status: "ACTIVE", 
    earnings: 185200, 
    tasks: 54, 
    initials: "NA", 
    img: "https://ui-avatars.com/api/?name=Nnamdi+Azikiwe&background=E2E8F0&color=333" 
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);

  return (
    <div className="space-y-6 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Total active users: <span className="font-bold text-slate-700">1,245</span></p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 hidden sm:flex shadow-sm">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export CSV
          </Button>
          <Button className="bg-[#22c55e] hover:bg-green-600 text-white font-semibold shadow-sm rounded-lg px-5 w-full md:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-2 sm:p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="w-full xl:max-w-md">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user ID, transaction, or task..."
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto justify-between">
          {/* Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              Status: <span className="text-slate-500">All</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
              <Users className="w-4 h-4 text-slate-400" />
              Role: <span className="text-slate-500">All Roles</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
              <Search className="w-4 h-4 text-slate-400" />
              Joined: <span className="text-slate-500">Anytime</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
            <Info className="w-4 h-4 text-slate-400" />
            Updates every 5 minutes
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">USER</th>
                <th className="px-6 py-4 text-center">STATUS</th>
                <th className="px-6 py-4">JOINED DATE</th>
                <th className="px-6 py-4 text-center">TASKS</th>
                <th className="px-6 py-4">EARNINGS</th>
                <th className="px-6 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 w-[300px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
                        <img src={user.img} alt={user.username} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-[#22c55e] transition-colors cursor-pointer">{user.username}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{user.email}</span>
                      </div>
                    </div>
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
                      <button className="hover:text-[#22c55e] transition-colors" title="View details">
                        <Eye className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                      <button className="hover:text-blue-500 transition-colors" title="Edit user">
                        <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                      {user.status === 'SUSPENDED' ? (
                        <button className="hover:text-[#22c55e] transition-colors" title="Reactivate user">
                          <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      ) : (
                        <button className="hover:text-red-500 transition-colors" title="Suspend user">
                          <Ban className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-700">1-10</span> of <span className="font-bold text-slate-700">1,245</span> users
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-slate-400 border-slate-200">
              <span className="sr-only">Previous</span>
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-green-700 text-white border-green-700 hover:bg-green-800 hover:text-white">
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
    </div>
  );
}
