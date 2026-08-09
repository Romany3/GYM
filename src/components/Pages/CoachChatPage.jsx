import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Search, 
  X, 
  Camera,
  ArrowLeft
} from 'lucide-react';

export default function CoachChatPage({ showToast }) {
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [showMobileChatView, setShowMobileChatView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // File or DataURL preview
  const [lightboxImage, setLightboxImage] = useState(null); // High-res image modal preview

  // Clients Directory Roster with Conversations
  const [clients] = useState([
    {
      id: 'c1',
      name: 'Marcus Jensen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      tier: 'PRO ATHLETE',
      program: 'Push Hypertrophy Split',
      online: true,
      lastMessage: 'Knees feel great coach! Ready for today\'s push session.',
      time: '09:20 AM',
      unread: 0,
    },
    {
      id: 'c2',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      tier: 'ELITE VIP',
      program: 'Glute & Leg Specialization',
      online: true,
      lastMessage: 'Attached my progress photo from this morning check-in.',
      time: 'Yesterday',
      unread: 2,
    },
    {
      id: 'c3',
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      tier: 'STARTER',
      program: 'Fat Loss Recomp',
      online: false,
      lastMessage: 'Will make sure to hit 200g protein today!',
      time: 'Aug 06',
      unread: 0,
    },
    {
      id: 'c4',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      tier: 'PRO ATHLETE',
      program: 'Powerlifting Prep',
      online: false,
      lastMessage: 'Hit a 100kg deadlift PR today!',
      time: 'Aug 04',
      unread: 0,
    },
  ]);

  // Master Messages Database by Client ID
  const [conversations, setConversations] = useState({
    c1: [
      { id: 1, sender: 'coach', text: 'Hey Marcus! Great job on hitting 225 lbs on deadlifts yesterday. How are your knees feeling today?', time: '09:15 AM' },
      { id: 2, sender: 'client', text: 'Knees feel great coach! Ready for today\'s push session.', time: '09:20 AM' },
      { 
        id: 3, 
        sender: 'coach', 
        text: 'Awesome! Here is your bench press setup guide for today:', 
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        time: '09:22 AM' 
      },
    ],
    c2: [
      { id: 1, sender: 'client', text: 'Good morning Coach Alex! I finished my morning check-in.', time: 'Yesterday, 08:00 AM' },
      { 
        id: 2, 
        sender: 'client', 
        text: 'Attached my progress photo from this morning check-in.', 
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
        time: 'Yesterday, 08:02 AM' 
      },
      { id: 3, sender: 'coach', text: 'Incredible shoulder and upper back definition! Let\'s increase daily carbs by 30g.', time: 'Yesterday, 09:15 AM' },
    ],
    c3: [
      { id: 1, sender: 'coach', text: 'David, how is your meal prep looking for this week?', time: 'Aug 06, 11:00 AM' },
      { id: 2, sender: 'client', text: 'Will make sure to hit 200g protein today!', time: 'Aug 06, 11:30 AM' },
    ],
    c4: [
      { id: 1, sender: 'client', text: 'Hit a 100kg deadlift PR today!', time: 'Aug 04, 06:15 PM' },
      { id: 2, sender: 'coach', text: 'Boom! Massive milestone Elena! Form was locked in.', time: 'Aug 04, 06:20 PM' },
    ],
  });

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];
  const activeMessages = conversations[selectedClientId] || [];

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && !selectedImage) return;

    const newMsg = {
      id: Date.now(),
      sender: 'coach',
      text: messageInput,
      image: selectedImage || null,
      time: 'Just now',
    };

    setConversations((prev) => ({
      ...prev,
      [selectedClientId]: [...(prev[selectedClientId] || []), newMsg],
    }));

    setMessageInput('');
    setSelectedImage(null);

    if (showToast) showToast(`Sent message to ${activeClient.name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-blue-400" /> REAL-TIME ATHLETE MESSAGING
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Coach Client Chat
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Directly communicate with your active athletes, review form check photos, and provide real-time guidance.
          </p>
        </div>
      </div>

      {/* Main 2-Column Chat Layout Container */}
      <div className="bg-[#121724] border border-slate-800 rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px] overflow-hidden">
        {/* Left Column (Col 4): Client Roster List */}
        <div className={`lg:col-span-4 border-r border-slate-800 flex flex-col bg-[#0f1422] ${showMobileChatView ? 'hidden lg:flex' : 'flex'}`}>
          {/* Roster Search Bar */}
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athlete or program..."
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-9 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Roster Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredClients.map((client) => {
              const isSelected = selectedClientId === client.id;
              return (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setShowMobileChatView(true);
                  }}
                  className={`w-full p-4 flex items-center gap-3.5 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#182133] border-l-4 border-l-blue-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-700"
                    />
                    {client.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0f1422] rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{client.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">{client.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{client.lastMessage}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60 uppercase">
                      {client.program}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (Col 8): Active Conversation Area */}
        <div className={`lg:col-span-8 flex flex-col bg-[#121724] ${showMobileChatView ? 'flex' : 'hidden lg:flex'}`}>
          {/* Active Conversation Header */}
          <div className="p-4 border-b border-slate-800 bg-[#151b2c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileChatView(false)}
                className="lg:hidden p-2 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold bg-[#171e2e] rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                title="Return"
              >
                <ArrowLeft className="w-4 h-4 text-blue-400" />
                <span>Return</span>
              </button>
              <div className="relative">
                <img
                  src={activeClient.avatar}
                  alt={activeClient.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                {activeClient.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#151b2c] rounded-full" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100">{activeClient.name}</h3>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60 uppercase">
                    {activeClient.tier}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{activeClient.program} • {activeClient.online ? 'Online Now' : 'Offline'}</p>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
            {activeMessages.map((msg) => {
              const isCoach = msg.sender === 'coach';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCoach ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-2 max-w-[80%]">
                    <div
                      className={`p-3.5 rounded-2xl shadow-md ${
                        isCoach
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                          : 'bg-[#171e2e] text-slate-200 border border-slate-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text && <p className="leading-relaxed">{msg.text}</p>}

                      {msg.image && (
                        <div className={`${msg.text ? 'mt-2.5' : ''} group relative overflow-hidden rounded-xl border border-slate-700/80 cursor-pointer`}>
                          <img
                            src={msg.image}
                            alt="Attachment"
                            onClick={() => setLightboxImage(msg.image)}
                            className="max-h-60 object-cover rounded-xl transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-[11px]">
                            <Camera className="w-4 h-4" />
                            <span>View Photo</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Image Attachment Preview Thumbnail */}
          {selectedImage && (
            <div className="px-6 py-2 bg-[#0c101c] border-t border-slate-800 flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Attachment preview"
                  className="w-14 h-14 object-cover rounded-lg border border-blue-500/60 shadow-md"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-0.5 shadow-md hover:bg-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <span className="text-xs text-blue-300 font-semibold">Image file attached ready to send</span>
            </div>
          )}

          {/* Message Input Box Bar */}
          <div className="p-4 border-t border-slate-800 bg-[#0c101c] flex items-center gap-2">
            <label
              className="p-2.5 bg-[#171e2e] hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl cursor-pointer transition-colors"
              title="Attach Image / Progress Photo"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>

            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Type a message to ${activeClient.name}...`}
              className="flex-1 bg-[#171e2e] text-slate-200 text-xs rounded-xl px-4 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 font-medium"
            />

            <button
              onClick={handleSendMessage}
              className="py-2.5 px-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Res Image Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
            <img src={lightboxImage} alt="Enlarged preview" className="w-full h-full object-contain" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 text-slate-200 hover:text-white rounded-full border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
