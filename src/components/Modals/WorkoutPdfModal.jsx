import { useState, useRef } from 'react';
import { X, FileText, Download, Loader2, User, Target, Video } from 'lucide-react';
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
          className="absolute -left-[9999px] top-0 w-[794px]"
        >
          {/* PAGE 0: COVER PAGE */}
          <div
            id="pdf-page-0"
            className="w-[794px] h-[1123px] relative overflow-hidden font-sans rtl bg-[#0d1219] text-white box-border"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#d63031 1px, transparent 1px), linear-gradient(90deg, #d63031 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Red Border Box */}
            <div
              className="absolute inset-[20px] border border-[#d63031]/35 rounded-lg pointer-events-none z-[2]"
            />

            <div
              className="relative z-[3] w-full h-full flex flex-col items-center px-[50px] pt-[40px] pb-[60px] box-border"
            >
              <div className="grow" />

              {/* Coach Name */}
              <div
                className="text-[36px] font-black text-white text-center uppercase drop-shadow-lg leading-[1.2] shrink-0"
              >
                {coachInfo.name}
              </div>

              {/* Coach Subtitle / Contact */}
              <div
                className="text-[14px] text-white font-bold mt-[8px] ltr flex items-center justify-center gap-[10px] shrink-0"
              >
                <span>{coachInfo.title}</span>
                <span className="text-[#d63031]">|</span>
                <span>📞 {coachInfo.phone}</span>
                <span className="text-[#d63031]">|</span>
                <span>💬 {coachInfo.whatsapp}</span>
              </div>

              {/* Certifications Card */}
              <div
                className="w-[85%] mt-[20px] bg-[#0d1219]/80 border border-[#d63031]/35 rounded-md px-[24px] py-[16px] shrink-0 relative"
              >
                <div
                  className="text-center text-[#d63031] text-[15px] font-black mb-[8px]"
                >
                  الشهادات والخبرات | CERTIFICATIONS
                </div>
                <div
                  className="text-white text-[13px] text-center font-semibold leading-[1.6]"
                >
                  • {coachInfo.certifications}
                </div>
              </div>

              {/* Client Summary Card */}
              <div
                className="mt-[16px] bg-[#141d27]/60 border border-[#d63031]/35 rounded-lg px-[30px] py-[16px] w-[85%] shrink-0"
              >
                <div
                  className="text-center text-[#d63031] text-[16px] font-black mb-[12px] uppercase"
                >
                  بيانات المشترك | CLIENT PROFILE
                </div>
                <div
                  className="grid grid-cols-2 gap-x-[20px] gap-y-[12px]"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-[12px] text-[#d63031] font-extrabold">اسم المشترك</span>
                    <span className="text-[18px] text-white font-extrabold">{clientInfo.name}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[12px] text-[#d63031] font-extrabold">الهدف</span>
                    <span className="text-[18px] text-white font-extrabold">{clientInfo.goal}</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div
                className="flex gap-[16px] w-[85%] mt-[16px] ltr shrink-0"
              >
                <div
                  className="flex-1 px-[6px] py-[12px] rounded text-center border border-[#d63031] bg-[#0d1219]/60 text-[#d63031]"
                >
                  <span className="text-[22px] font-black block">{days.length}</span>
                  <span className="text-[11px] font-extrabold">أيام التدريب</span>
                </div>

                <div
                  className="flex-1 px-[6px] py-[12px] rounded text-center border border-[#d63031] bg-[#0d1219]/60 text-[#d63031]"
                >
                  <span className="text-[22px] font-black block">{totalExercisesCount}</span>
                  <span className="text-[11px] font-extrabold">تمارين مختلفة</span>
                </div>

                <div
                  className="flex-1 px-[6px] py-[12px] rounded text-center border border-[#2ecc71] bg-[#0d1219]/60 text-[#2ecc71]"
                >
                  <span className="text-[22px] font-black block">100%</span>
                  <span className="text-[11px] font-extrabold">التزام ونتائج</span>
                </div>
              </div>

              {/* Footer */}
              <div
                className="mt-auto pt-[16px] w-full border-t border-[#d63031]/25 flex items-center justify-between"
              >
                <span className="text-[12px] text-white font-bold">
                  {coachInfo.name} | {coachInfo.title}
                </span>
                <span className="text-[11px] text-[#a0a0a0]">الصفحة 1 من {totalPages}</span>
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
                className="w-[794px] h-[1123px] relative overflow-hidden font-sans rtl bg-[#0d1219] text-white box-border"
              >
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(#d63031 1px, transparent 1px), linear-gradient(90deg, #d63031 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Red Border Box */}
                <div
                  className="absolute inset-[20px] border border-[#d63031]/35 rounded-lg pointer-events-none z-[2]"
                />

                <div
                  className="relative z-[3] w-full h-full flex flex-col px-[50px] pt-[40px] pb-[40px] box-border"
                >
                  {/* Day Header Bar */}
                  <div
                    className="w-full flex justify-between items-center mb-[20px] pb-[14px] border-b border-[#d63031]/30"
                  >
                    <div>
                      <h2 className="text-[20px] font-black text-[#d63031] m-0">
                        برنامج التدريب الاحترافي
                      </h2>
                      <div className="text-[12px] text-white mt-[2px]">
                        الكابتن: {coachInfo.name}
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-[22px] font-black text-white">
                        {day.label}
                      </div>
                      <div className="text-[11px] text-[#d63031] font-bold">
                        {exercises.length} تمارين مخصصة
                      </div>
                    </div>
                  </div>

                  {/* Exercises Stack */}
                  <div
                    className="flex flex-col gap-[12px] w-full"
                  >
                    {exercises.map((ex, eIdx) => {
                      const videoUrl = getExerciseVideoUrl(ex);

                      return (
                        <div
                          key={ex.id || eIdx}
                          className="flex items-stretch bg-[#0d1219]/65 border border-[#d63031]/30 border-r-4 border-r-[#d63031] rounded-md overflow-hidden w-full rtl"
                        >
                          {/* Number Badge */}
                          <div
                            className="w-[46px] bg-[#d63031]/12 text-[#d63031] flex items-center justify-center text-[18px] font-black border-l border-[#d63031]/25 shrink-0"
                          >
                            {String(eIdx + 1).padStart(2, '0')}
                          </div>

                          {/* Exercise Content */}
                          <div
                            className="flex-1 px-[18px] py-[14px] flex justify-between items-center"
                          >
                            <div className="flex-1">
                              <div
                                className="text-[18px] font-extrabold text-white leading-[1.2] mb-[6px]"
                              >
                                {ex.name}
                              </div>

                              {/* Sets, Reps, Rest, Tempo Tags */}
                              <div
                                className="flex gap-[10px] items-center flex-wrap"
                              >
                                <div
                                  className="px-[10px] py-[4px] rounded-md text-[11px] font-extrabold bg-[#d63031]/10 text-white border border-[#d63031]/40"
                                >
                                  <span className="text-[9px] opacity-70 ml-[4px]">المجموعات</span>
                                  {ex.sets || '3'}
                                </div>

                                <div
                                  className="px-[10px] py-[4px] rounded-md text-[11px] font-extrabold bg-[#d63031]/10 text-white border border-[#d63031]/40"
                                >
                                  <span className="text-[9px] opacity-70 ml-[4px]">التكرارات</span>
                                  {ex.reps || '10'}
                                </div>

                                <div
                                  className="px-[10px] py-[4px] rounded-md text-[11px] font-extrabold bg-[#ff2a3b]/15 text-[#ff2a3b] border border-[#ff2a3b]"
                                >
                                  <span className="text-[9px] opacity-70 ml-[4px]">الراحة</span>
                                  {ex.rest ? `${ex.rest} ثانية` : '60 ثانية'}
                                </div>

                                {ex.tempo && (
                                  <div
                                    className="px-[10px] py-[4px] rounded-md text-[11px] font-extrabold bg-white/5 text-[#94a3b8] border border-white/10"
                                  >
                                    <span className="text-[9px] opacity-70 ml-[4px]">التيمبو</span>
                                    {ex.tempo}
                                  </div>
                                )}
                              </div>

                              {ex.notes && (
                                <div
                                  className="text-[11px] text-[#94a3b8] mt-[8px] italic"
                                >
                                  💡 {ex.notes}
                                </div>
                              )}
                            </div>

                            {/* Demo Video Hyperlink Target */}
                            <div
                              className="w-[100px] flex items-center justify-center border-r border-[#d63031]/25 pr-[12px] shrink-0"
                            >
                              <div
                                className="yt-link-target flex flex-col items-center justify-center gap-[4px] text-[#ff2a3b] no-underline p-[8px] rounded-md bg-[#d63031]/8 w-[84px] h-[70px] cursor-pointer"
                                data-url={videoUrl}
                              >
                                <Video className="w-[22px] h-[22px] text-[#ff2a3b]" />
                                <span className="text-[10px] font-extrabold">شاهد الفيديو</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Footer */}
                  <div
                    className="mt-auto pt-[12px] w-full border-t border-[#d63031]/25 flex items-center justify-between"
                  >
                    <span className="text-[12px] text-white font-bold">
                      {coachInfo.name} | مدرب لياقة بدنية
                    </span>
                    <span className="text-[11px] text-[#a0a0a0]">
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
