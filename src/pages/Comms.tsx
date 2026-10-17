import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, ChatAttachment, ActiveStatus } from '../types';
import { InviteMemberModal } from '../components/InviteMemberModal';
import {
  Hash,
  MessageSquare,
  Users,
  Send,
  Paperclip,
  CheckSquare,
  DollarSign,
  AlertOctagon,
  FolderLock,
  Plus,
  Smile,
  Search,
  Circle,
  Shield,
  ChevronRight,
  ExternalLink,
  X,
  Sparkles,
  UserPlus,
} from 'lucide-react';

export const Comms: React.FC = () => {
  const {
    currentStartup,
    profiles,
    channels,
    messages,
    sendMessage,
    createSubgroup,
    currentUser,
    toggleUserActiveStatus,
    clearUnreadForUser,
    tasks,
    finances,
    blockers,
    interactions,
    assets,
  } = useApp();

  // Active channel or DM target
  const [activeChannelId, setActiveChannelId] = useState<string>('common-room');
  const [activeDmUserId, setActiveDmUserId] = useState<string | null>(null);

  // Message composer
  const [inputText, setInputText] = useState('');
  const [selectedAttachment, setSelectedAttachment] = useState<ChatAttachment | null>(null);
  const [isAttachDrawerOpen, setIsAttachDrawerOpen] = useState(false);
  const [attachCategory, setAttachCategory] = useState<'task' | 'finance' | 'blocker' | 'interaction' | 'asset'>('task');

  // Modals
  const [isNewSubgroupOpen, setIsNewSubgroupOpen] = useState(false);
  const [newSubgroupName, setNewSubgroupName] = useState('');
  const [newSubgroupDesc, setNewSubgroupDesc] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Search filter
  const [searchMember, setSearchMember] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages based on active channel or active DM
  const currentMessages = messages.filter(m => {
    if (activeDmUserId) {
      return (
        (m.sender_id === currentUser.id && m.dm_user_id === activeDmUserId) ||
        (m.sender_id === activeDmUserId && (m.dm_user_id === currentUser.id || !m.channel_id))
      );
    }
    return m.channel_id === activeChannelId;
  });

  const activeChannel = channels.find(c => c.id === activeChannelId);
  const activeDmUser = profiles.find(p => p.id === activeDmUserId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSelectDm = (user: (typeof profiles)[0]) => {
    setActiveDmUserId(user.id);
    setActiveChannelId('');
    clearUnreadForUser(user.id);
  };

  const handleSelectChannel = (channelId: string) => {
    setActiveChannelId(channelId);
    setActiveDmUserId(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedAttachment) return;

    sendMessage({
      startup_id: currentStartup?.id || 'startup-trackaa',
      channel_id: activeDmUserId ? undefined : activeChannelId,
      dm_user_id: activeDmUserId || undefined,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      sender_avatar: currentUser.avatar_url,
      sender_hierarchy: currentUser.hierarchy_path || `${currentUser.full_name} > Trackaa > Founder`,
      text: inputText.trim(),
      attachment: selectedAttachment || undefined,
    });

    setInputText('');
    setSelectedAttachment(null);
    setIsAttachDrawerOpen(false);
  };

  const handleCreateSubgroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubgroupName.trim()) return;

    const created = createSubgroup(newSubgroupName.trim(), newSubgroupDesc.trim());
    setNewSubgroupName('');
    setNewSubgroupDesc('');
    setIsNewSubgroupOpen(false);
    handleSelectChannel(created.id);
  };

  // Filtered members for direct messages
  const filteredProfiles = profiles.filter(
    p =>
      p.id !== currentUser.id &&
      (p.full_name.toLowerCase().includes(searchMember.toLowerCase()) ||
        p.role.toLowerCase().includes(searchMember.toLowerCase()) ||
        (p.department && p.department.toLowerCase().includes(searchMember.toLowerCase())))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)] flex flex-col animate-fade-in">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Comms Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-trackaa-green text-white shadow-sm">
              Unified OS Communications
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time DMs, Common Room town hall, and contextual startup artifact tagging
          </p>
        </div>

        {/* Presence toggle for current user */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-pill text-xs">
            <span className="text-[11px] text-slate-500 pl-2 font-medium">My Presence:</span>
            {(['online', 'away', 'offline'] as ActiveStatus[]).map(st => (
              <button
                key={st}
                type="button"
                onClick={() => toggleUserActiveStatus(st)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                  currentUser.active_status === st
                    ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    st === 'online'
                      ? 'bg-trackaa-green'
                      : st === 'away'
                      ? 'bg-amber-400'
                      : 'bg-slate-400'
                  }`}
                />
                <span>{st}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Invite Member</span>
          </button>
        </div>
      </div>

      {/* Main Glass Workspace Grid */}
      <div className="mt-4 flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
        {/* Left Sidebar: Channels & Team DMs (Cols 4) */}
        <div className="md:col-span-4 lg:col-span-4 rounded-3xl glass-panel p-4 flex flex-col justify-between overflow-hidden border border-black/5 dark:border-white/10">
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            {/* Search filter for team members */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search teammates or channels..."
                value={searchMember}
                onChange={e => setSearchMember(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Channels & Common Room */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Town Hall & Channels
                </span>
                <button
                  type="button"
                  onClick={() => setIsNewSubgroupOpen(true)}
                  className="text-[11px] font-semibold text-trackaa-green hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Sub-Group</span>
                </button>
              </div>

              <div className="space-y-1">
                {channels.map(chan => {
                  const isActive = !activeDmUserId && activeChannelId === chan.id;
                  return (
                    <button
                      key={chan.id}
                      type="button"
                      onClick={() => handleSelectChannel(chan.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-trackaa-green text-white font-semibold shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {chan.is_common_room ? (
                        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : (
                        <Hash className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                      <span className="flex-1 truncate">{chan.name}</span>
                      {chan.is_common_room && (
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-400'
                        }`}>
                          All
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Messages with Member Hierarchy & Head Counters */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Direct Messages (DMs)
                </span>
                <span className="text-[10px] text-slate-400">{filteredProfiles.length} Members</span>
              </div>

              <div className="space-y-1.5">
                {filteredProfiles.map(member => {
                  const isActive = activeDmUserId === member.id;
                  const unread = member.unread_count || 0;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleSelectDm(member)}
                      className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center gap-3 relative group ${
                        isActive
                          ? 'bg-black/10 dark:bg-white/15 ring-1 ring-trackaa-green/40 shadow-sm'
                          : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {/* Avatar with unread message counter over their head & active status light */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={member.avatar_url}
                          alt={member.full_name}
                          className="w-10 h-10 rounded-2xl object-cover ring-1 ring-black/10 dark:ring-white/10"
                        />

                        {/* Unread Message Counter Icon OVER THEIR HEAD */}
                        {unread > 0 && (
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md animate-bounce ring-2 ring-white dark:ring-[#111827]">
                            {unread}
                          </div>
                        )}

                        {/* Active status indicator light */}
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#111827] ${
                            member.active_status === 'online'
                              ? 'bg-trackaa-green'
                              : member.active_status === 'away'
                              ? 'bg-amber-400'
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>

                      {/* Name, Role & Hierarchy Breadcrumbs */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {member.full_name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono capitalize">
                            {member.active_status}
                          </span>
                        </div>

                        {/* Exact hierarchy format requested by user: Mirabel > Trackaa > PM2 > Dev team */}
                        <div className="text-[10px] font-mono text-trackaa-green truncate mt-0.5">
                          {member.hierarchy_path || `${member.full_name} > Trackaa > ${member.role}`}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Conversation Stream & Composer (Cols 8) */}
        <div className="md:col-span-8 lg:col-span-8 rounded-3xl glass-panel flex flex-col justify-between overflow-hidden border border-black/5 dark:border-white/10">
          {/* Conversation Header */}
          <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-3">
              {activeDmUser ? (
                <div className="relative">
                  <img
                    src={activeDmUser.avatar_url}
                    alt={activeDmUser.full_name}
                    className="w-10 h-10 rounded-2xl object-cover ring-1 ring-black/10 dark:ring-white/10"
                  />
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#111827] ${
                      activeDmUser.active_status === 'online'
                        ? 'bg-trackaa-green'
                        : activeDmUser.active_status === 'away'
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center font-bold">
                  {activeChannel?.is_common_room ? <Users className="w-5 h-5" /> : <Hash className="w-5 h-5" />}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeDmUser ? activeDmUser.full_name : activeChannel?.name}
                  </h2>
                  {activeDmUser && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-trackaa-green font-semibold">
                      {activeDmUser.active_status}
                    </span>
                  )}
                </div>

                {/* Subtitle / Hierarchy breadcrumb */}
                <div className="text-[11px] text-slate-400 font-mono">
                  {activeDmUser
                    ? activeDmUser.hierarchy_path || `${activeDmUser.full_name} > Trackaa > ${activeDmUser.role}`
                    : activeChannel?.description}
                </div>
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {currentMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <MessageSquare className="w-10 h-10 mb-2 opacity-40 text-trackaa-green" />
                <div className="text-xs font-semibold">No messages yet in this room</div>
                <div className="text-[11px] mt-1 max-w-xs">
                  Break the ice or attach a task, pitch deck, or blocker from your startup workspace!
                </div>
              </div>
            ) : (
              currentMessages.map(msg => {
                const isMe = msg.sender_id === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <img
                      src={msg.sender_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                      alt={msg.sender_name}
                      className="w-8 h-8 rounded-xl object-cover flex-shrink-0"
                    />

                    <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                          {msg.sender_name}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      {/* Bubble */}
                      <div
                        className={`rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-trackaa-green text-white rounded-tr-sm'
                            : 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-black/5 dark:border-white/10'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Rich Attached Startup OS Artifact Preview */}
                        {msg.attachment && (
                          <div
                            className={`mt-2.5 p-2.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                              isMe
                                ? 'bg-black/20 border-white/20 text-white'
                                : 'bg-black/5 dark:bg-black/20 border-black/10 dark:border-white/10 text-slate-900 dark:text-white'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-white/20 flex-shrink-0 mt-0.5">
                              {msg.attachment.type === 'task' && <CheckSquare className="w-3.5 h-3.5" />}
                              {msg.attachment.type === 'finance' && <DollarSign className="w-3.5 h-3.5" />}
                              {msg.attachment.type === 'blocker' && <AlertOctagon className="w-3.5 h-3.5" />}
                              {msg.attachment.type === 'interaction' && <MessageSquare className="w-3.5 h-3.5" />}
                              {msg.attachment.type === 'asset' && <FolderLock className="w-3.5 h-3.5" />}
                              {msg.attachment.type === 'common_ref' && <Users className="w-3.5 h-3.5" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-bold truncate">{msg.attachment.title}</div>
                              {msg.attachment.subtitle && (
                                <div className="text-[10px] opacity-80">{msg.attachment.subtitle}</div>
                              )}
                              {msg.attachment.metadata && (
                                <div className="text-[10px] font-mono mt-0.5 opacity-70">
                                  {msg.attachment.metadata}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer & Contextual Attachment Engine */}
          <div className="p-4 border-t border-black/5 dark:border-white/10 backdrop-blur-xl relative">
            {/* Active Attachment Chip */}
            {selectedAttachment && (
              <div className="mb-2 p-2 rounded-xl bg-trackaa-green/10 border border-trackaa-green/30 flex items-center justify-between text-xs text-trackaa-green">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold capitalize">Attached {selectedAttachment.type}:</span>
                  <span className="truncate">{selectedAttachment.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAttachment(null)}
                  className="p-1 hover:text-rose-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Attachment Drawer Modal / Popover */}
            {isAttachDrawerOpen && (
              <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:w-96 glass-dropdown rounded-3xl p-4 shadow-2xl border border-white/15 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10 mb-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-trackaa-green" />
                    <span>Tag from Startup Environment</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAttachDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Category Pills */}
                <div className="flex gap-1 overflow-x-auto pb-2 mb-2">
                  {[
                    { id: 'task', label: 'Task' },
                    { id: 'finance', label: 'Receipt' },
                    { id: 'blocker', label: 'Blocker' },
                    { id: 'asset', label: 'Vault' },
                    { id: 'interaction', label: 'Feedback' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setAttachCategory(cat.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        attachCategory === cat.id
                          ? 'bg-trackaa-green text-white shadow-sm'
                          : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Item List to pick from */}
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                  {attachCategory === 'task' &&
                    tasks.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setSelectedAttachment({
                            type: 'task',
                            id: t.id,
                            title: t.title,
                            subtitle: `Due: ${t.due_date} • Priority: ${t.priority}`,
                          });
                          setIsAttachDrawerOpen(false);
                        }}
                        className="w-full p-2 rounded-xl text-left text-xs bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all truncate"
                      >
                        <div className="font-semibold truncate">{t.title}</div>
                        <div className="text-[10px] text-slate-400">Due {t.due_date}</div>
                      </button>
                    ))}

                  {attachCategory === 'finance' &&
                    finances.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          setSelectedAttachment({
                            type: 'finance',
                            id: f.id,
                            title: f.description,
                            subtitle: `${f.transaction_type === 'income' ? '+' : '-'}$${f.amount.toLocaleString()} (${f.category})`,
                          });
                          setIsAttachDrawerOpen(false);
                        }}
                        className="w-full p-2 rounded-xl text-left text-xs bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all truncate"
                      >
                        <div className="font-semibold truncate">{f.description}</div>
                        <div className="text-[10px] text-emerald-500 font-mono">${f.amount.toLocaleString()}</div>
                      </button>
                    ))}

                  {attachCategory === 'blocker' &&
                    blockers.map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedAttachment({
                            type: 'blocker',
                            id: b.id,
                            title: b.description,
                            subtitle: `Severity: ${b.severity} • ${b.resolved ? 'Resolved' : 'Active Roadblock'}`,
                          });
                          setIsAttachDrawerOpen(false);
                        }}
                        className="w-full p-2 rounded-xl text-left text-xs bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all truncate"
                      >
                        <div className="font-semibold truncate">{b.description}</div>
                        <div className="text-[10px] text-rose-400 uppercase font-bold">{b.severity} severity</div>
                      </button>
                    ))}

                  {attachCategory === 'asset' &&
                    assets.map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          setSelectedAttachment({
                            type: 'asset',
                            id: a.id,
                            title: a.title,
                            subtitle: `Category: ${a.category} • ${a.asset_type}`,
                          });
                          setIsAttachDrawerOpen(false);
                        }}
                        className="w-full p-2 rounded-xl text-left text-xs bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all truncate"
                      >
                        <div className="font-semibold truncate">{a.title}</div>
                        <div className="text-[10px] text-cyan-400 capitalize">{a.category}</div>
                      </button>
                    ))}

                  {attachCategory === 'interaction' &&
                    interactions.map(ci => (
                      <button
                        key={ci.id}
                        type="button"
                        onClick={() => {
                          setSelectedAttachment({
                            type: 'interaction',
                            id: ci.id,
                            title: `Feedback: ${ci.customer_name} (${ci.customer_role})`,
                            subtitle: ci.client_notes || ci.handler_report,
                          });
                          setIsAttachDrawerOpen(false);
                        }}
                        className="w-full p-2 rounded-xl text-left text-xs bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all truncate"
                      >
                        <div className="font-semibold truncate">{ci.customer_name}</div>
                        <div className="text-[10px] text-purple-400">{ci.interaction_type}</div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              {/* Attach Button */}
              <button
                type="button"
                onClick={() => setIsAttachDrawerOpen(prev => !prev)}
                title="Tag stuff from startup environment (Task, Receipt, Blocker, Vault item)"
                className="p-2.5 rounded-2xl glass-pill text-slate-500 hover:text-trackaa-green hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={
                  activeDmUser
                    ? `Message ${activeDmUser.full_name}...`
                    : `Message ${activeChannel?.name || 'channel'}...`
                }
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />

              <button
                type="submit"
                className="p-2.5 rounded-2xl bg-trackaa-green text-white font-bold hover:bg-[#059669] shadow-glow-emerald transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Creating Subgroup */}
      {isNewSubgroupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-white/15 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Create Comms Sub-Group</h2>
              <button
                type="button"
                onClick={() => setIsNewSubgroupOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubgroupSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Channel Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g., growth-sprint, design-critique"
                    value={newSubgroupName}
                    onChange={e => setNewSubgroupName(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                  />
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What is this sub-group channel focused on?"
                  value={newSubgroupDesc}
                  onChange={e => setNewSubgroupDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewSubgroupOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald"
                >
                  Create Sub-Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RBAC Member Invite Modal */}
      <InviteMemberModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </div>
  );
};
