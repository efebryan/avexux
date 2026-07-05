import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Wallet, Activity, ExternalLink, ShieldAlert, CheckCircle, Ban } from "lucide-react";
import Link from "next/link";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onToggleStatus: (userId: string) => void;
}

export function UserDetailsModal({ isOpen, onClose, user, onToggleStatus }: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl sm:rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-gray-50">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-2xl font-bold uppercase shadow-lg border border-white/10">
                {user.username.substring(0, 2)}
              </div>
              <div>
                <DialogTitle className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  {user.username}
                  {user.status === 'Active' && <CheckCircle className="w-5 h-5 text-green-400 drop-shadow" />}
                </DialogTitle>
                <DialogDescription className="text-slate-300 mt-1 flex items-center gap-2 text-sm">
                  {user.email} • Joined {user.joined}
                </DialogDescription>
              </div>
            </div>
            
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                user.status === 'Active' 
                  ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5" /> Wallet Balance
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900">₦{user.balance.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Tasks Done
              </p>
              <h3 className="text-2xl font-extrabold text-blue-600">{user.tasksCompleted}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Referrals
              </p>
              <h3 className="text-2xl font-extrabold text-amber-600">{user.referrals}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h4 className="font-bold text-gray-900 text-sm">Account Settings</h4>
            </div>
            <div className="p-4 space-y-4">
               <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                 <div>
                   <p className="text-sm font-bold text-gray-900">Current Tier</p>
                   <p className="text-xs text-gray-500">The user's subscription level.</p>
                 </div>
                 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                   {user.tier} Plan
                 </span>
               </div>
               
               <div className="flex justify-between items-center">
                 <div>
                   <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                     <ShieldAlert className="w-4 h-4 text-red-500" /> Account Status
                   </p>
                   <p className="text-xs text-gray-500 max-w-xs mt-1">
                     Suspending a user blocks their login and freezes their wallet balance.
                   </p>
                 </div>
                 <Button 
                   onClick={() => {
                     onToggleStatus(user.id);
                     // Don't auto-close — let admin see the status change reflected immediately
                   }}
                   variant="outline"
                   className={`rounded-xl border shadow-sm font-bold transition-all ${
                     user.status === 'Active' 
                      ? 'border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700' 
                      : 'border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700'
                   }`}
                 >
                   {user.status === 'Active' ? <><Ban className="w-4 h-4 mr-2" /> Suspend User</> : <><CheckCircle className="w-4 h-4 mr-2" /> Reactivate User</>}
                 </Button>
               </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
             <Button variant="ghost" onClick={onClose} className="rounded-xl text-gray-600 hover:bg-gray-200">
               Close
             </Button>
             <Link href="/admin/users">
               <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-md flex items-center gap-2">
                 Full User Log <ExternalLink className="w-4 h-4" />
               </Button>
             </Link>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
