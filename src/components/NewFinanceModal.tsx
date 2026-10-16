import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionType, FinanceCategory } from '../types';
import { X, DollarSign, TrendingUp, TrendingDown, Calendar, Receipt, FileText } from 'lucide-react';

interface NewFinanceModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewFinanceModal: React.FC<NewFinanceModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addFinance, currentUser } = useApp();

  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<FinanceCategory>('payroll');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');

  if (!isOpen) return null;

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReceiptUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !description.trim()) return;

    addFinance({
      project_id: projectId,
      transaction_type: transactionType,
      category,
      amount: parsedAmount,
      currency,
      transaction_date: transactionDate,
      description: description.trim(),
      receipt_url: receiptUrl || undefined,
      created_by: currentUser.id,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              transactionType === 'income' ? 'bg-emerald-500/15 text-trackaa-green' : 'bg-rose-500/15 text-rose-500'
            }`}>
              {transactionType === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Record Transaction</h2>
              <p className="text-[11px] text-slate-400">Update startup cash balance & calculate runway</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transaction Type Segmented Toggle */}
        <div className="mt-4 flex p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setTransactionType('income');
              setCategory('investment');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              transactionType === 'income'
                ? 'bg-trackaa-green text-slate-950 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Capital In (Income)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTransactionType('expense');
              setCategory('payroll');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              transactionType === 'expense'
                ? 'bg-rose-500 text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Capital Out (Burn)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Amount & Currency */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Amount *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g., 25000.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40 font-mono"
                />
                <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40 font-semibold"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as FinanceCategory)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40 capitalize"
              >
                {transactionType === 'income' ? (
                  <>
                    <option value="investment">Angel / VC Investment</option>
                    <option value="grant">Grant / Non-Dilutive</option>
                    <option value="revenue">Customer Revenue / Sales</option>
                    <option value="founder_capital">Founder Capital In</option>
                    <option value="other">Other Income</option>
                  </>
                ) : (
                  <>
                    <option value="payroll">Payroll & Stipends</option>
                    <option value="cloud_infra">Cloud Infrastructure & DB</option>
                    <option value="tooling">SaaS Software & Tooling</option>
                    <option value="marketing">Marketing & Paid Growth</option>
                    <option value="legal">Legal, Filing & Accounting</option>
                    <option value="other">General Operational Burn</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Transaction Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={transactionDate}
                  onChange={e => setTransactionDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description / Payee / Source *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Lead Angel SAFE Wire, AWS Server hosting bill"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          {/* Receipt attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Receipt or Invoice Attachment (optional)
            </label>
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-trackaa-green/60 bg-black/5 dark:bg-white/5 cursor-pointer text-xs text-slate-500 hover:text-trackaa-green transition-all">
              <Receipt className="w-4 h-4" />
              <span>{receiptUrl ? 'Receipt attached' : 'Upload invoice or wire receipt'}</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleReceiptUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                transactionType === 'income'
                  ? 'bg-trackaa-green text-slate-950 hover:bg-[#00DDA0]'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
            >
              Log {transactionType === 'income' ? 'Income' : 'Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
