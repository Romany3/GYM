import { useState, useRef } from 'react';
import { X, FileText, Download, Loader2, User, Phone, Award, Target, Video } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function WorkoutPdfModal({
  isOpen,
  onClose,
  days = [],
  routineExercises = {},
  libraryExercises = [],
  showToast
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfContainerRef = useRef(null);

  // Form State for PDF Metadata
  const [coachInfo, setCoachInfo] = useState({
    name: 'Alex Thorne',
    title: 'HEAD PERFORMANCE COACH',
    certifications: 'ISSA CPT | CSCS | Precision Nutrition',
    phone: '+1 (555) 019-2834',
    whatsapp: '+1 (555) 019-2834',
  });

  const [clientInfo, setClientInfo] = useState({
    name: 'Marcus Jensen',
    goal: 'Hypertrophy Phase 2 - Split Protocol',
  });

  if (!isOpen) return null;

  // Total pages count (Cover + Training Days)
  const totalPages = days.length + 1;

  // Calculate total exercises count
  const totalExercisesCount = days.reduce((acc, d) => {
    const exList = routineExercises[d.id] || [];
    return acc + exList.length;
  }, 0);

  // Helper to resolve exercise video URL from routine or library
  const getExerciseVideoUrl = (ex) => {
    if (ex.videoUrl) return ex.videoUrl;
    const match = libraryExercises.find(
      (lib) => lib.name?.toLowerCase() === ex.name?.toLowerCase()
    );
    return match?.videoUrl || 'https://www.youtube.com';
  };

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 600));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const totalPages = days.length + 1; // Cover + Days

      for (let i = 0; i < totalPages; i++) {
        const pageEl = document.getElementById(`pdf-page-${i}`);
        if (!pageEl) continue;

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0d1219',
          logging: false,
          width: 794,
          height: 1123,
          windowWidth: 794,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

        // Map clickable hyperlinks in PDF for video demo links
        const videoLinks = pageEl.querySelectorAll('.yt-link-target[data-url]');
        const pageRect = pageEl.getBoundingClientRect();

        videoLinks.forEach((link) => {
          let url = link.getAttribute('data-url');
          if (url && !url.match(/^https?:\/\//i)) {
            url = 'https://' + url;
          }

          const rect = link.getBoundingClientRect();
          const xPx = rect.left - pageRect.left;
          const yPx = rect.top - pageRect.top;

          const scaleX = 210 / 794;
          const scaleY = 297 / 1123;

          const x = xPx * scaleX;
          const y = yPx * scaleY;
          const w = rect.width * scaleX;
          const h = rect.height * scaleY;

          pdf.link(x, y, w, h, { url });
        });
      }

      // Format filename with client name and today's date (YYYY-MM-DD)
      const clientNameSanitized = (clientInfo.name || 'Client')
        .trim()
        .replace(/[/\\?%*:|"<>]/g, '')
        .replace(/\s+/g, '_');
      const todayStr = new Date().toISOString().split('T')[0];
      const fileName = `${clientNameSanitized}_${todayStr}.pdf`;
      pdf.save(fileName);

      if (showToast) showToast('✅ Workout PDF exported successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      if (showToast) showToast(`❌ Error generating PDF: ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 text-slate-200 relative overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Export Workout PDF
              </h2>
              <p className="text-xs text-slate-400">
                Cinematic layout with coach details, exercise protocols & demo video links
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Inputs */}
        <div className="space-y-4 text-xs">
          {/* Coach Details Header */}
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Coach Profile Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Coach Name</label>
              <input
                type="text"
                value={coachInfo.name}
                onChange={(e) => setCoachInfo({ ...coachInfo, name: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Title & Role</label>
              <input
                type="text"
                value={coachInfo.title}
                onChange={(e) => setCoachInfo({ ...coachInfo, title: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Certifications</label>
              <input
                type="text"
                value={coachInfo.certifications}
                onChange={(e) => setCoachInfo({ ...coachInfo, certifications: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Phone / WhatsApp</label>
              <input
                type="text"
                value={coachInfo.phone}
                onChange={(e) => setCoachInfo({ ...coachInfo, phone: e.target.value, whatsapp: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Client Details Header */}
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 pt-2">
            <Target className="w-3.5 h-3.5" />
            <span>Client & Protocol Summary</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Client Name</label>
              <input
                type="text"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Program Goal</label>
              <input
                type="text"
                value={clientInfo.goal}
                onChange={(e) => setClientInfo({ ...clientInfo, goal: e.target.value })}
                className="w-full bg-[#171e2e] border border-slate-700/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* PDF Summary Stats Pill */}
          <div className="bg-[#171e2e]/80 border border-slate-800 rounded-xl p-3 flex items-center justify-around text-center">
            <div>
              <span className="block text-lg font-bold text-red-400">{days.length}</span>
              <span className="text-[10px] text-slate-400 uppercase">Training Days</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="block text-lg font-bold text-red-400">{totalExercisesCount}</span>
              <span className="text-[10px] text-slate-400 uppercase">Exercises</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="block text-lg font-bold text-emerald-400">100%</span>
              <span className="text-[10px] text-slate-400 uppercase">Interactive PDF</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>

        {/* HIDDEN PDF RENDER CONTAINER (Cinematic Onyx & Red/Gold Theme) */}
        <div
          ref={pdfContainerRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '794px',
          }}
        >
          {/* PAGE 0: COVER PAGE */}
          <div
            id="pdf-page-0"
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#0d1219',
              color: '#ffffff',
              boxSizing: 'border-box',
            }}
          >
            {/* Background Pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                backgroundImage:
                  'linear-gradient(#d63031 1px, transparent 1px), linear-gradient(90deg, #d63031 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Red Border Box */}
            <div
              style={{
                position: 'absolute',
                inset: '20px',
                border: '1px solid rgba(214, 48, 49, 0.35)',
                borderRadius: '8px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 3,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 50px 60px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ flexGrow: 1 }} />

              {/* Coach Name */}
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#ffffff',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.2,
                  flexShrink: 0,
                }}
              >
                {coachInfo.name}
              </div>

              {/* Coach Subtitle / Contact */}
              <div
                style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: 700,
                  marginTop: '8px',
                  direction: 'ltr',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  flexShrink: 0,
                }}
              >
                <span>{coachInfo.title}</span>
                <span style={{ color: '#d63031' }}>|</span>
                <span>📞 {coachInfo.phone}</span>
                <span style={{ color: '#d63031' }}>|</span>
                <span>💬 {coachInfo.whatsapp}</span>
              </div>

              {/* Certifications Card */}
              <div
                style={{
                  width: '85%',
                  marginTop: '20px',
                  background: 'rgba(13, 18, 25, 0.8)',
                  border: '1px solid rgba(214, 48, 49, 0.35)',
                  borderRadius: '6px',
                  padding: '16px 24px',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    color: '#d63031',
                    fontSize: '15px',
                    fontWeight: 900,
                    marginBottom: '8px',
                  }}
                >
                  الشهادات والخبرات | CERTIFICATIONS
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '13px',
                    textAlign: 'center',
                    fontWeight: 600,
                    lineHeight: '1.6',
                  }}
                >
                  • {coachInfo.certifications}
                </div>
              </div>

              {/* Client Summary Card */}
              <div
                style={{
                  marginTop: '16px',
                  background: 'rgba(20, 29, 39, 0.6)',
                  border: '1px solid rgba(214, 48, 49, 0.35)',
                  borderRadius: '8px',
                  padding: '16px 30px',
                  width: '85%',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    color: '#d63031',
                    fontSize: '16px',
                    fontWeight: 900,
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  بيانات المشترك | CLIENT PROFILE
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px 20px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#d63031', fontWeight: 800 }}>اسم المشترك</span>
                    <span style={{ fontSize: '18px', color: '#ffffff', fontWeight: 800 }}>{clientInfo.name}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#d63031', fontWeight: 800 }}>الهدف</span>
                    <span style={{ fontSize: '18px', color: '#ffffff', fontWeight: 800 }}>{clientInfo.goal}</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  width: '85%',
                  marginTop: '16px',
                  direction: 'ltr',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: '12px 6px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    border: '1px solid #d63031',
                    background: 'rgba(13, 18, 25, 0.6)',
                    color: '#d63031',
                  }}
                >
                  <span style={{ fontSize: '22px', fontWeight: 900, display: 'block' }}>{days.length}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>أيام التدريب</span>
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: '12px 6px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    border: '1px solid #d63031',
                    background: 'rgba(13, 18, 25, 0.6)',
                    color: '#d63031',
                  }}
                >
                  <span style={{ fontSize: '22px', fontWeight: 900, display: 'block' }}>{totalExercisesCount}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>تمارين مختلفة</span>
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: '12px 6px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    border: '1px solid #2ecc71',
                    background: 'rgba(13, 18, 25, 0.6)',
                    color: '#2ecc71',
                  }}
                >
                  <span style={{ fontSize: '22px', fontWeight: 900, display: 'block' }}>100%</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>التزام ونتائج</span>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  width: '100%',
                  borderTop: '1px solid rgba(214, 48, 49, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>
                  {coachInfo.name} | {coachInfo.title}
                </span>
                <span style={{ fontSize: '11px', color: '#a0a0a0' }}>الصفحة 1 من {totalPages}</span>
              </div>
            </div>
          </div>

          {/* PAGES 1..N: DAY TRAINING PAGES */}
          {days.map((day, dIdx) => {
            const exercises = routineExercises[day.id] || [];

            return (
              <div
                key={day.id}
                id={`pdf-page-${dIdx + 1}`}
                style={{
                  width: '794px',
                  height: '1123px',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: 'Cairo, sans-serif',
                  direction: 'rtl',
                  background: '#0d1219',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                {/* Background Grid Pattern */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.03,
                    backgroundImage:
                      'linear-gradient(#d63031 1px, transparent 1px), linear-gradient(90deg, #d63031 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Red Border Box */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '20px',
                    border: '1px solid rgba(214, 48, 49, 0.35)',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px 50px 40px',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Day Header Bar */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid rgba(214, 48, 49, 0.3)',
                    }}
                  >
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#d63031', margin: 0 }}>
                        برنامج التدريب الاحترافي
                      </h2>
                      <div style={{ fontSize: '12px', color: '#ffffff', marginTop: '2px' }}>
                        الكابتن: {coachInfo.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff' }}>
                        {day.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#d63031', fontWeight: 700 }}>
                        {exercises.length} تمارين مخصصة
                      </div>
                    </div>
                  </div>

                  {/* Exercises Stack */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      width: '100%',
                    }}
                  >
                    {exercises.map((ex, eIdx) => {
                      const videoUrl = getExerciseVideoUrl(ex);

                      return (
                        <div
                          key={ex.id || eIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            background: 'rgba(13, 18, 25, 0.65)',
                            border: '1px solid rgba(214, 48, 49, 0.3)',
                            borderRight: '4px solid #d63031',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            width: '100%',
                            direction: 'rtl',
                          }}
                        >
                          {/* Number Badge */}
                          <div
                            style={{
                              width: '46px',
                              background: 'rgba(214, 48, 49, 0.12)',
                              color: '#d63031',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px',
                              fontWeight: 900,
                              borderLeft: '1px solid rgba(214, 48, 49, 0.25)',
                              flexShrink: 0,
                            }}
                          >
                            {String(eIdx + 1).padStart(2, '0')}
                          </div>

                          {/* Exercise Content */}
                          <div
                            style={{
                              flex: 1,
                              padding: '14px 18px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: '18px',
                                  fontWeight: 800,
                                  color: '#ffffff',
                                  lineHeight: 1.2,
                                  marginBottom: '6px',
                                }}
                              >
                                {ex.name}
                              </div>

                              {/* Sets, Reps, Rest, Tempo Tags */}
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <div
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    background: 'rgba(214, 48, 49, 0.1)',
                                    color: '#ffffff',
                                    border: '1px solid rgba(214, 48, 49, 0.4)',
                                  }}
                                >
                                  <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: '4px' }}>المجموعات</span>
                                  {ex.sets || '3'}
                                </div>

                                <div
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    background: 'rgba(214, 48, 49, 0.1)',
                                    color: '#ffffff',
                                    border: '1px solid rgba(214, 48, 49, 0.4)',
                                  }}
                                >
                                  <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: '4px' }}>التكرارات</span>
                                  {ex.reps || '10'}
                                </div>

                                <div
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    background: 'rgba(214, 48, 49, 0.15)',
                                    color: '#ff2a3b',
                                    border: '1px solid #ff2a3b',
                                  }}
                                >
                                  <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: '4px' }}>الراحة</span>
                                  {ex.rest ? `${ex.rest} ثانية` : '60 ثانية'}
                                </div>

                                {ex.tempo && (
                                  <div
                                    style={{
                                      padding: '4px 10px',
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      fontWeight: 800,
                                      background: 'rgba(255, 255, 255, 0.05)',
                                      color: '#94a3b8',
                                      border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}
                                  >
                                    <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: '4px' }}>التيمبو</span>
                                    {ex.tempo}
                                  </div>
                                )}
                              </div>

                              {ex.notes && (
                                <div
                                  style={{
                                    fontSize: '11px',
                                    color: '#94a3b8',
                                    marginTop: '8px',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  💡 {ex.notes}
                                </div>
                              )}
                            </div>

                            {/* Demo Video Hyperlink Target */}
                            <div
                              style={{
                                width: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRight: '1px solid rgba(214, 48, 49, 0.25)',
                                paddingRight: '12px',
                                flexShrink: 0,
                              }}
                            >
                              <div
                                className="yt-link-target"
                                data-url={videoUrl}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '4px',
                                  color: '#ff2a3b',
                                  textDecoration: 'none',
                                  padding: '8px',
                                  borderRadius: '6px',
                                  background: 'rgba(214, 48, 49, 0.08)',
                                  width: '84px',
                                  height: '70px',
                                  cursor: 'pointer',
                                }}
                              >
                                <Video style={{ width: '22px', height: '22px', color: '#ff2a3b' }} />
                                <span style={{ fontSize: '10px', fontWeight: 800 }}>شاهد الفيديو</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Footer */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '12px',
                      width: '100%',
                      borderTop: '1px solid rgba(214, 48, 49, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>
                      {coachInfo.name} | مدرب لياقة بدنية
                    </span>
                    <span style={{ fontSize: '11px', color: '#a0a0a0' }}>
                      الصفحة {dIdx + 2} من {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
