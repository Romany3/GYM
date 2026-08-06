import React, { useState } from 'react';
import { 
  Clock, 
  Slash, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Check, 
  X, 
  ExternalLink,
  Settings as SyncIcon
} from 'lucide-react';

export default function ScheduleManager({ 
  onSetHours, 
  onBlockTime, 
  showToast 
}) {
  const [viewMode, setViewMode] = useState('Week');
  const [selectedDayHeader, setSelectedDayHeader] = useState('WED 18');

  // Requests state
  const [requests, setRequests] = useState([
    {
      id: 'r1',
      client: 'Sophia Chen',
      service: 'Strength Assessment',
      datetime: 'Thu, Sept 19 • 2:00 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'r2',
      client: 'Ryan Miller',
      service: 'Olympic Lifting Prep',
      datetime: 'Fri, Sept 20 • 4:30 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ]);

  // Facilities sync state
  const [facilities, setFacilities] = useState([
    { id: 'f1', name: 'Titan Gym Main', synced: true },
    { id: 'f2', name: 'West Side Hub', synced: false },
  ]);

  // Interactive booking grid items state
  const [scheduleGrid, setScheduleGrid] = useState({
    '08:00 AM': {
      'MON 16': { type: 'available' },
      'TUE 17': { type: 'booked', title: 'Marcus G.', sub: 'Hypertrophy' },
      'THU 19': { type: 'booked', title: 'Elena V.', sub: 'Yoga Prep' },
    },
    '09:00 AM': {
      'TUE 17': { type: 'blocked', title: 'Personal' },
      'WED 18': { type: 'booked', title: 'David L.', sub: 'HIIT Core' },
      'FRI 20': { type: 'available' },
    },
    '10:00 AM': {
      'WED 18': { type: 'booked', title: 'Sarah J.', sub: 'Power Lifting' },
      'THU 19': { type: 'available' },
    },
    '11:00 AM': {
      'MON 16': { type: 'blocked', title: 'Facility Maintenance' },
      'FRI 20': { type: 'booked', title: 'Staff Meeting' },
    },
  });

  const handleAcceptRequest = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    if (showToast) showToast(`Accepted booking with ${req.client}!`);
  };

  const handleDeclineRequest = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    if (showToast) showToast(`Declined request from ${req.client}`, 'info');
  };

  const handleSuggestReschedule = (req) => {
    if (showToast) showToast(`Sent reschedule request to ${req.client}`, 'info');
  };

  const handleSlotClick = (time, day, currentSlot) => {
    if (!currentSlot || currentSlot.type === 'available') {
      // Book slot
      setScheduleGrid((prev) => ({
        ...prev,
        [time]: {
          ...(prev[time] || {}),
          [day]: { type: 'booked', title: 'Quick Booking', sub: 'Client Session' },
        },
      }));
      if (showToast) showToast(`Booked session on ${day} at ${time}`);
    } else if (currentSlot.type === 'booked') {
      if (showToast) showToast(`Session: ${currentSlot.title} (${currentSlot.sub || ''})`, 'info');
    }
  };

  const handleLinkFacility = (facilityId) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === facilityId ? { ...f, synced: true } : f))
    );
    if (showToast) showToast('Facility location synced!');
  };

  const daysHeader = [
    { code: 'MON 16', label: 'MON 16' },
    { code: 'TUE 17', label: 'TUE 17' },
    { code: 'WED 18', label: 'WED 18' },
    { code: 'THU 19', label: 'THU 19' },
    { code: 'FRI 20', label: 'FRI 20' },
  ];

  const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-header text-3xl md:text-4xl font-bold tracking-tight text-white">
            Availability <span className="italic font-normal text-blue-300">&</span> Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure your performance windows, manage bookings, and sync facility locations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSetHours}
            className="flex items-center gap-2 py-2.5 px-4 bg-[#121826] hover:bg-[#182033] text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Set Hours</span>
          </button>

          <button
            onClick={onBlockTime}
            className="flex items-center gap-2 py-2.5 px-4 bg-[#121826] hover:bg-[#182033] text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Slash className="w-3.5 h-3.5 text-slate-400" />
            <span>Block Time</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Schedule Table Card (Col 8) */}
        <div className="lg:col-span-8 bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Calendar Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif-header text-2xl font-bold text-slate-100">
              September 16 — 22
            </h2>

            <div className="flex items-center gap-4">
              {/* Navigation Controls */}
              <div className="flex items-center bg-[#182033] border border-slate-700/60 rounded-xl p-1 text-xs">
                <button 
                  onClick={() => showToast && showToast('Previous Week', 'info')}
                  className="p-1 text-slate-400 hover:text-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => showToast && showToast('Navigated to Today')}
                  className="px-3 py-0.5 text-xs font-semibold text-slate-200"
                >
                  Today
                </button>
                <button 
                  onClick={() => showToast && showToast('Next Week', 'info')}
                  className="p-1 text-slate-400 hover:text-slate-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-[#182033] border border-slate-700/60 rounded-xl p-1 text-xs font-semibold">
                {['Week', 'Month', 'Day'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      viewMode === mode
                        ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timetable Grid Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 tracking-wider">
                  <th className="py-3 px-3 uppercase text-slate-500 w-24">TIME</th>
                  {daysHeader.map((d) => {
                    const isSelected = selectedDayHeader === d.code;
                    return (
                      <th
                        key={d.code}
                        onClick={() => setSelectedDayHeader(d.code)}
                        className={`py-3 px-3 uppercase text-center cursor-pointer transition-colors ${
                          isSelected
                            ? 'text-blue-300 font-bold border-b-2 border-blue-400 bg-blue-950/20'
                            : 'hover:text-slate-200'
                        }`}
                      >
                        {d.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {times.map((time) => (
                  <tr key={time} className="h-20">
                    {/* Time Label */}
                    <td className="py-3 px-3 font-mono font-medium text-slate-400 align-middle">
                      {time}
                    </td>

                    {/* Day Cells */}
                    {daysHeader.map((d) => {
                      const slot = scheduleGrid[time]?.[d.code];

                      if (slot?.type === 'booked') {
                        return (
                          <td key={d.code} className="p-1.5 align-middle">
                            <div
                              onClick={() => handleSlotClick(time, d.code, slot)}
                              className="h-full bg-[#a3c2fe] text-slate-950 font-bold rounded-xl p-3 shadow-md hover:brightness-105 cursor-pointer transition-all flex flex-col justify-center"
                            >
                              <span className="text-xs">{slot.title}</span>
                              {slot.sub && (
                                <span className="text-[10px] font-normal text-slate-800">
                                  {slot.sub}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      }

                      if (slot?.type === 'blocked') {
                        return (
                          <td key={d.code} className="p-1.5 align-middle">
                            <div
                              onClick={() => handleSlotClick(time, d.code, slot)}
                              className="h-full bg-[#222a3a] border border-slate-700/60 text-slate-300 font-semibold rounded-xl p-3 cursor-pointer hover:bg-[#283246] transition-all flex flex-col justify-center"
                            >
                              <span className="text-xs">{slot.title}</span>
                            </div>
                          </td>
                        );
                      }

                      if (slot?.type === 'available') {
                        return (
                          <td key={d.code} className="p-1.5 align-middle">
                            <div
                              onClick={() => handleSlotClick(time, d.code, slot)}
                              className="h-full border-2 border-dashed border-slate-700/80 hover:border-blue-400/80 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all group"
                            >
                              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-300 tracking-wider">
                                AVAILABLE
                              </span>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={d.code}
                          onClick={() => handleSlotClick(time, d.code, null)}
                          className="p-1.5 align-middle cursor-pointer hover:bg-slate-800/20 transition-colors"
                        >
                          <div className="h-full rounded-xl border border-transparent hover:border-slate-800" />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded border-2 border-dashed border-slate-400" />
              <span>Available Gym Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#a3c2fe]" />
              <span className="text-slate-300 font-medium">Booked Client Session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#222a3a]" />
              <span>Blocked / Personal Time</span>
            </div>
          </div>
        </div>

        {/* Right Side Column (Col 4): Requests & Facility Sync */}
        <div className="lg:col-span-4 space-y-6">
          {/* Requests Panel */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Requests
              </h3>
              <span className="bg-slate-800 text-blue-300 font-bold text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-slate-700">
                {requests.length} NEW
              </span>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={req.avatar}
                      alt={req.client}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">
                        {req.client}
                      </h4>
                      <p className="text-[11px] text-slate-400">{req.service}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#1e273a] px-3 py-2 rounded-lg">
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{req.datetime}</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAcceptRequest(req)}
                        className="py-1.5 bg-[#a3c2fe] hover:bg-blue-300 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req)}
                        className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5 text-slate-400" /> Decline
                      </button>
                    </div>

                    <button
                      onClick={() => handleSuggestReschedule(req)}
                      className="w-full py-1.5 bg-[#1a2132] hover:bg-[#20293e] text-slate-300 border border-slate-700/60 text-[11px] font-semibold rounded-lg transition-all cursor-pointer"
                    >
                      Suggest Reschedule
                    </button>
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-4">No pending requests</p>
              )}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => showToast && showToast('Viewing all bookings')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <span>View All Bookings</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Facility Sync Card */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-slate-200">
              <SyncIcon className="w-4 h-4 text-blue-400" />
              <h3 className="font-serif-header text-sm font-semibold">
                Facility Sync
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {facilities.map((fac) => (
                <div
                  key={fac.id}
                  className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0"
                >
                  <span className="font-semibold text-slate-300">{fac.name}</span>
                  {fac.synced ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
                      Synced
                    </span>
                  ) : (
                    <button
                      onClick={() => handleLinkFacility(fac.id)}
                      className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Link Facility
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
