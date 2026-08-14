import { useState, useRef } from 'react';
import { X, FileText, Download, Loader2, User, Target, Sparkles, BookOpen, HelpCircle, ShieldAlert } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function NutritionPdfModal({
  isOpen,
  onClose,
  targetKcal = 1660,
  proteinGrams = 124,
  carbsGrams = 172,
  fatsGrams = 30,
  clientData = null,
  showToast
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState('meta'); // 'meta' | 'intro' | 'rules' | 'meals' | 'guidelines' | 'faq'
  const pdfContainerRef = useRef(null);

  // 1. Coach & Client Information
  const [coachInfo, setCoachInfo] = useState({
    name: 'COACH. PHELOPATER AFRAEM',
    title: 'مدرب شخصي • أخصائي تغذية • حجامة ومساج',
    certifications: 'خبرة سنوات في مجال كمال الأجسام\nمدرب شخصي وأخصائي تغذية معتمد\nأخصائي حجامة ومساج علاجي ورياضي',
    phone: '201221599689',
    whatsapp: '201221599689',
  });

  const [clientInfo, setClientInfo] = useState({
    name: clientData?.name || 'مرقس جينسن',
    age: clientData?.age || '26',
    height: clientData?.height || '178 سم',
    weight: clientData?.weight || '82 كجم',
    goal: clientData?.goal || 'تخسيس وتنشيف',
  });

  // Macro Targets State
  const [macroTargets, setMacroTargets] = useState({
    kcal: targetKcal || 1660,
    protein: proteinGrams || 124,
    carbs: carbsGrams || 172,
    fats: fatsGrams || 30,
  });

  // 2. Introduction Page Section Text
  const [introText, setIntroText] = useState({
    p1: 'هنا هتلاقي كل اللي انت محتاجه بالتفصيل من أول خطة الدايت والمكملات. هنا هتلاقي كل الاسئلة والإجابات اللي ممكن تخطر على بالك عشان توصل لأحسن نتيجة.',
    p2: 'كل شخص ليه الحق انه يغير من شكل جسمه ويبقى أحسن نسخة من نفسه. شكلتك في المرايا وثقتك في هيئتك هيغير من معظم جوانب حياتك.',
    p3: 'اعتبر النظام ده الخريطة بتاعتك للوصول لهدفك. هشرحلك كل اللي محتاج تعرفه بشكل يديك المختصر المفيد علمياً.',
  });

  // 3. Nutrition Info & Golden Rules Text
  const [nutritionInfoText, setNutritionInfoText] = useState({
    mainInfo: 'هدفك هنا أنك تكمل تمرينك بالتغذية أو الدايت الصح اللي هيوصلك لهدفك. الدايت هو اللي بيوجه التغيير، ومن أهم عناصر التغذية تغيير شكل جسمك هو الـ ENERGY BALANCE أو توازن الطاقة. السعرات الحرارية أو الكالوري هي وحدة قياس الطاقة والدايت بتاعك هيكون سعراته محسوبة على حسب هدفك.',
    rules: [
      'خلال الأسبوع، كل الأكل للأداء، مش للمتعة. وسيب وجبة واحدة بس في الأسبوع تاكل فيها براحتك.',
      'لو قللت أكلك زيادة عن اللزوم، مش هتخس أكثر، بالعكس جسمك هيهبط الحرق وهتحس بتعب أسرع.',
      'لو بوظت أكلك في يوم أو اتنين مش هيحصل حاجة لو زودت سعراتك النهارده عادي تعوض بكرة أو بعده، المهم توازن أسبوعك كله.',
      'لو هدفكم خسارة الدهون، بلاش بعد التمرين تعمل Shake سعراته كتير.',
      'لو عايز تخسر الدهون، امشي بعد كل تمرين لمد من 20 لـ 30 دقيقة (كارديو).',
      'النوم مش رفاهية ده أساس خسارة الدهون، قلة النوم بتبوظ الحرق وتزود الجوع، نام كويس.',
      'اتحرك كل يوم مش بس وقت التمرين، امشي أكثر، اتحرك أكثر، أي حركة صغيرة بتفرق في النتيجة.',
    ],
  });

  // 4. Meals Protocol Custom List
  const [mealList, setMealList] = useState([
    {
      id: 'm1',
      titleEn: 'MEAL ONE',
      titleAr: 'الوجبة الأولى',
      option1En: '3 eggs + 1 high protein tortilla+200 gm tomato',
      option1Ar: '3 بيضات + 1 تورتيلا عالية البروتين + 200 جم طماطم',
      option1Note: 'YOU CAN REPLACE TORTILLA WITH 2 BROWN TOAST',
      option2En: '3 eggs + 100 gm boiled potato + 200 gm tomato',
      option2Ar: '3 بيضات + 100 جم بطاطس مسلوقة + 200 جم طماطم',
    },
    {
      id: 'm2',
      titleEn: 'MEAL TWO',
      titleAr: 'الوجبة الثانية',
      option1En: '150 gm chicken breast + 150 gm cooked rice + green salad',
      option1Ar: '150 جرام صدر دجاج + 150 جرام رز مطبوخ + سلطة خضراء',
      option1Note: '',
      option2En: '150 gm beef steak or grilled fish',
      option2Ar: '150 جرام ستيك لحم أو سمك مشوي',
    },
    {
      id: 'm3',
      titleEn: 'MEAL THREE',
      titleAr: 'سناك قبل التمرين',
      option1En: '1 banana + 3 dates',
      option1Ar: '1 موزه + 3 تمرات',
      option1Note: '',
      option2En: '',
      option2Ar: '',
    },
    {
      id: 'm4',
      titleEn: 'MEAL FOUR',
      titleAr: 'الوجبة الرابعة',
      option1En: '150 gm chicken breast + 100 gm cooked rice + green salad',
      option1Ar: '150 جرام صدر دجاج + 100 جرام رز مطبوخ + سلطة خضراء',
      option1Note: '',
      option2En: '',
      option2Ar: '',
    },
  ]);

  // 5. Guidelines & Supplements Section Text
  const [guidelines, setGuidelines] = useState({
    supplements: 'ال كارتين (L-Carnitine)',
    vitamins: '• فيتامين سي قرص واحد بعد الفطار\n• اوميجا 3 قرص واحد بعد الغدا\n• مغنيسيوم قرص واحد قبل النوم\n• زنك قرص واحد قبل النوم\n• كروميوم 200 ميكروجرام قبل الفطار بنص ساعه',
    care: '• شرب 4 لتر من الماء يومياً\n• جميع الوجبات يكون بها طبق سلطة خضار\n• 3 كوب مغلي البقدونس قبل كل وجبه بنصف ساعه',
    reduction: '• الحد من تناول الاملاح',
    forbidden: '• بيبسي\n• المأكولات السريعة\n• الحلويات بأنواعه\n• الشوكولاته\n• الزيوت المصنعة\n• السكريات المضافة\n• المشروبات الغازية\n• الأطعمة المقلية بالزيوت',
  });

  // 6. FAQ Questions Section
  const [faqs, setFaqs] = useState([
    {
      q: 'هل لازم أوزن أكلي؟',
      a: 'أيوة من أهم أدوات الدايت هي ميزان الأكل لدقة الكميات المستخدمة.',
    },
    {
      q: 'أوزن أكلي قبل ولا بعد الطبخ؟',
      a: 'النشويات قبل الطبخ، البروتين بعد الطبخ.',
    },
    {
      q: 'ميعاد الأكل بيفرق؟',
      a: 'مش فارقة براحتك، المهم متزودش أو تقلل حاجه بمزاجك.',
    },
    {
      q: 'هل ترتيب الوجبات بيفرق؟',
      a: 'لا مش بيفرق، العامل الاساسي هو نوع الاكل وعدد السعرات.',
    },
    {
      q: 'هل ينفع ابني عضلات واخسر دهون في نفس الوقت؟',
      a: 'اه ينفع ودي حاجه اسمها Body Recomposition بس مش لأي حد.',
    },
    {
      q: 'لماذا أشعر بالجوع دائماً؟',
      a: 'قد تكون قلقاً أو لا تحصل على قسط كاف من النوم أو نظامك يفتقر للألياف والبروتين.',
    },
  ]);

  if (!isOpen) return null;

  // Calculate total pages for export
  // Cover (1) + Intro (1) + Nutrition Rules (1) + Meals (N) + Guidelines (1) + FAQ (1)
  const totalPdfPages = 3 + mealList.length + 2;

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

      for (let i = 0; i < totalPdfPages; i++) {
        const pageEl = document.getElementById(`nutr-full-page-${i}`);
        if (!pageEl) continue;

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#090d14',
          logging: false,
          width: 794,
          height: 1123,
          windowWidth: 794,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      const clientNameSanitized = (clientInfo.name || 'Client')
        .trim()
        .replace(/[/\\?%*:|"<>]/g, '')
        .replace(/\s+/g, '_');
      const fileName = `NutriPlan_${clientNameSanitized}_CoachPhelopater.pdf`;
      pdf.save(fileName);

      if (showToast) showToast('✅ Full NutriPlan PDF exported successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to generate NutriPlan PDF:', err);
      if (showToast) showToast(`❌ Error generating PDF: ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0e1320] border border-slate-800 rounded-3xl max-w-4xl w-full p-4 sm:p-6 md:p-8 shadow-2xl space-y-4 sm:space-y-6 text-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 shrink-0">
          <div className="flex items-start justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-inner shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight font-serif-header">
                  NutriPlan PDF Program Builder
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                  Customize coach branding, rules, meal plans & guidelines
                </p>
              </div>
            </div>

            {/* Close X Button for Mobile */}
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="sm:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleGeneratePdf}
              disabled={isGenerating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs shadow-lg shadow-red-950/50 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.02]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Exporting PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export NutriPlan PDF</span>
                </>
              )}
            </button>

            {/* Close X Button for Tablet & Desktop */}
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Tabs Navbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#131928] p-1.5 rounded-2xl border border-slate-800 shrink-0 text-xs font-semibold scrollbar-none max-w-full">
          <button
            onClick={() => setActiveFormTab('meta')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'meta'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. البيانات والماكروز</span>
          </button>

          <button
            onClick={() => setActiveFormTab('intro')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'intro'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. مقدمة النظام</span>
          </button>

          <button
            onClick={() => setActiveFormTab('rules')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'rules'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. معلومات التغذية</span>
          </button>

          <button
            onClick={() => setActiveFormTab('meals')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'meals'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>4. الوجبات والتوريد</span>
          </button>

          <button
            onClick={() => setActiveFormTab('guidelines')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'guidelines'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>5. التعليمات والمكملات</span>
          </button>

          <button
            onClick={() => setActiveFormTab('faq')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              activeFormTab === 'faq'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>6. أسئلة شائعة</span>
          </button>
        </div>

        {/* Tab Form Editors Container */}
        <div className="flex-1 overflow-y-auto space-y-5 text-xs pr-1">
          
          {/* TAB 1: META & MACROS */}
          {activeFormTab === 'meta' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                بيانات المدرب والمشترك وأهداف الماكروز
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#141a2a] p-4 rounded-2xl border border-slate-800 space-y-3">
                  <span className="font-bold text-white text-xs block border-b border-slate-800 pb-2">بيانات الكوتش:</span>
                  <div>
                    <label className="block text-slate-400 mb-1">اسم المدرب</label>
                    <input
                      type="text"
                      value={coachInfo.name}
                      onChange={(e) => setCoachInfo({ ...coachInfo, name: e.target.value })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">المسمى الوظيفي</label>
                    <input
                      type="text"
                      value={coachInfo.title}
                      onChange={(e) => setCoachInfo({ ...coachInfo, title: e.target.value })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم الهاتف / الواتساب</label>
                    <input
                      type="text"
                      value={coachInfo.phone}
                      onChange={(e) => setCoachInfo({ ...coachInfo, phone: e.target.value, whatsapp: e.target.value })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="bg-[#141a2a] p-4 rounded-2xl border border-slate-800 space-y-3">
                  <span className="font-bold text-white text-xs block border-b border-slate-800 pb-2">بيانات المشترك:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">اسم المشترك</label>
                      <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">العمر</label>
                      <input
                        type="text"
                        value={clientInfo.age}
                        onChange={(e) => setClientInfo({ ...clientInfo, age: e.target.value })}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">الطول</label>
                      <input
                        type="text"
                        value={clientInfo.height}
                        onChange={(e) => setClientInfo({ ...clientInfo, height: e.target.value })}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">الوزن</label>
                      <input
                        type="text"
                        value={clientInfo.weight}
                        onChange={(e) => setClientInfo({ ...clientInfo, weight: e.target.value })}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">الهدف</label>
                    <input
                      type="text"
                      value={clientInfo.goal}
                      onChange={(e) => setClientInfo({ ...clientInfo, goal: e.target.value })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-red-400 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Target Macro Cards Setup */}
              <div className="bg-[#141a2a] p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-white text-xs block border-b border-slate-800 pb-2">بطاقات الماكروز اليومية:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">السعرات (Kcal)</label>
                    <input
                      type="number"
                      value={macroTargets.kcal}
                      onChange={(e) => setMacroTargets({ ...macroTargets, kcal: Number(e.target.value) })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-white font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-400 mb-1 font-bold">البروتين (g)</label>
                    <input
                      type="number"
                      value={macroTargets.protein}
                      onChange={(e) => setMacroTargets({ ...macroTargets, protein: Number(e.target.value) })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-blue-300 font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sky-400 mb-1 font-bold">الكارب (g)</label>
                    <input
                      type="number"
                      value={macroTargets.carbs}
                      onChange={(e) => setMacroTargets({ ...macroTargets, carbs: Number(e.target.value) })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-sky-300 font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-400 mb-1 font-bold">الدهون (g)</label>
                    <input
                      type="number"
                      value={macroTargets.fats}
                      onChange={(e) => setMacroTargets({ ...macroTargets, fats: Number(e.target.value) })}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-amber-300 font-mono font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTRODUCTION PAGE */}
          {activeFormTab === 'intro' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                صفحة مقدمة عن النظام (Page 2)
              </h3>
              <div className="space-y-3 bg-[#141a2a] p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">فقرة الترحيب الأولى:</label>
                  <textarea
                    rows={3}
                    value={introText.p1}
                    onChange={(e) => setIntroText({ ...introText, p1: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-3 text-slate-200 leading-relaxed font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">الفقرة الثانية (الدافع والهدف):</label>
                  <textarea
                    rows={3}
                    value={introText.p2}
                    onChange={(e) => setIntroText({ ...introText, p2: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-3 text-slate-200 leading-relaxed font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">الفقرة الثالثة (الختام والتوجيه):</label>
                  <textarea
                    rows={3}
                    value={introText.p3}
                    onChange={(e) => setIntroText({ ...introText, p3: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-3 text-slate-200 leading-relaxed font-arabic"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION RULES */}
          {activeFormTab === 'rules' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                صفحة معلومات عن التغذية ونصائح ذهبية (Page 3)
              </h3>
              <div className="space-y-3 bg-[#141a2a] p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">الشرح العلمي للتغذية والتوازن:</label>
                  <textarea
                    rows={3}
                    value={nutritionInfoText.mainInfo}
                    onChange={(e) => setNutritionInfoText({ ...nutritionInfoText, mainInfo: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-3 text-slate-200 leading-relaxed font-arabic"
                  />
                </div>

                <span className="font-bold text-red-400 text-xs block pt-2 border-t border-slate-800">
                  النصائح الذهبية (7 بنود):
                </span>
                {nutritionInfoText.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-950 text-red-400 border border-red-800/60 flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => {
                        const newRules = [...nutritionInfoText.rules];
                        newRules[idx] = e.target.value;
                        setNutritionInfoText({ ...nutritionInfoText, rules: newRules });
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEAL PROTOCOL (PAGES 4 - 7) */}
          {activeFormTab === 'meals' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                  صفحات الوجبات والخيارات البديلة
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const nextNum = mealList.length + 1;
                    setMealList([
                      ...mealList,
                      {
                        id: `m${Date.now()}`,
                        titleEn: `MEAL ${nextNum}`,
                        titleAr: `الوجبة ${nextNum}`,
                        option1En: '150 gm chicken breast + 100 gm rice',
                        option1Ar: '150 جرام صدر دجاج + 100 جرام رز',
                        option1Note: '',
                        option2En: '',
                        option2Ar: '',
                      },
                    ]);
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  + إضافة وجبة جديدة
                </button>
              </div>

              {mealList.map((meal, mealIdx) => (
                <div key={meal.id} className="bg-[#141a2a] p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-xs">
                      صفحة {meal.titleEn} ({meal.titleAr})
                    </span>
                    {mealList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setMealList(mealList.filter((m) => m.id !== meal.id))}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        حذف الوجبة
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">اسم الوجبة بالإنجليزي</label>
                      <input
                        type="text"
                        value={meal.titleEn}
                        onChange={(e) => {
                          const updated = [...mealList];
                          updated[mealIdx].titleEn = e.target.value;
                          setMealList(updated);
                        }}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">اسم الوجبة بالعربي</label>
                      <input
                        type="text"
                        value={meal.titleAr}
                        onChange={(e) => {
                          const updated = [...mealList];
                          updated[mealIdx].titleAr = e.target.value;
                          setMealList(updated);
                        }}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-white font-bold font-arabic"
                      />
                    </div>
                  </div>

                  {/* Option 1 */}
                  <div className="p-3 bg-[#101522] rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-red-400 text-xs block">الخيار الأول (Option 1):</span>
                    <input
                      type="text"
                      placeholder="English description..."
                      value={meal.option1En}
                      onChange={(e) => {
                        const updated = [...mealList];
                        updated[mealIdx].option1En = e.target.value;
                        setMealList(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="الوصف بالعربي..."
                      value={meal.option1Ar}
                      onChange={(e) => {
                        const updated = [...mealList];
                        updated[mealIdx].option1Ar = e.target.value;
                        setMealList(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-slate-200 font-arabic"
                    />
                    <input
                      type="text"
                      placeholder="ملاحظات الاستبدال (مثال: YOU CAN REPLACE...)"
                      value={meal.option1Note}
                      onChange={(e) => {
                        const updated = [...mealList];
                        updated[mealIdx].option1Note = e.target.value;
                        setMealList(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-amber-400 italic text-[11px]"
                    />
                  </div>

                  {/* Option 2 (OR) */}
                  <div className="p-3 bg-[#101522] rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-400 text-xs block">الخيار البديل OR (اخبياري):</span>
                    <input
                      type="text"
                      placeholder="Alternative English option..."
                      value={meal.option2En}
                      onChange={(e) => {
                        const updated = [...mealList];
                        updated[mealIdx].option2En = e.target.value;
                        setMealList(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="الخيار البديل بالعربي..."
                      value={meal.option2Ar}
                      onChange={(e) => {
                        const updated = [...mealList];
                        updated[mealIdx].option2Ar = e.target.value;
                        setMealList(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-slate-200 font-arabic"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: GUIDELINES & SUPPLEMENTS */}
          {activeFormTab === 'guidelines' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                صفحة التعليمات والمكملات (Page 8)
              </h3>
              <div className="space-y-3 bg-[#141a2a] p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-red-400 font-bold mb-1">اقتراح بالمكملات (( اختياري )):</label>
                  <textarea
                    rows={2}
                    value={guidelines.supplements}
                    onChange={(e) => setGuidelines({ ...guidelines, supplements: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-red-400 font-bold mb-1">اقتراح بالفيتامينات (( اختياري )):</label>
                  <textarea
                    rows={4}
                    value={guidelines.vitamins}
                    onChange={(e) => setGuidelines({ ...guidelines, vitamins: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 font-bold mb-1">✅ الاهتمام (تعليمات يجب الالتزام بها):</label>
                  <textarea
                    rows={3}
                    value={guidelines.care}
                    onChange={(e) => setGuidelines({ ...guidelines, care: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-amber-400 font-bold mb-1">⚠️ التقليل:</label>
                  <textarea
                    rows={2}
                    value={guidelines.reduction}
                    onChange={(e) => setGuidelines({ ...guidelines, reduction: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                  />
                </div>
                <div>
                  <label className="block text-rose-500 font-bold mb-1">🚫 الممنوع:</label>
                  <textarea
                    rows={4}
                    value={guidelines.forbidden}
                    onChange={(e) => setGuidelines({ ...guidelines, forbidden: e.target.value })}
                    className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2.5 text-slate-200 font-arabic"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FAQ QUESTIONS */}
          {activeFormTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                صفحة أسئلة شائعة عن الدايت (Page 9)
              </h3>
              <div className="space-y-3 bg-[#141a2a] p-4 rounded-2xl border border-slate-800">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-[#101522] rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-500 text-sm">؟</span>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[idx].q = e.target.value;
                          setFaqs(updated);
                        }}
                        className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-white font-bold font-arabic"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const updated = [...faqs];
                        updated[idx].a = e.target.value;
                        setFaqs(updated);
                      }}
                      className="w-full bg-[#1c2438] border border-slate-700/60 rounded-xl p-2 text-slate-300 font-arabic"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HIDDEN PDF RENDER CONTAINER MATCHING COACH PHELOPATER TEMPLATE */}
        <div
          ref={pdfContainerRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '794px',
          }}
        >
          {/* PAGE 0: COVER PAGE (بيانات المشترك والماكروز) */}
          <div
            id="nutr-full-page-0"
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#090d14',
              color: '#ffffff',
              boxSizing: 'border-box',
              padding: '40px',
            }}
          >
            {/* Red Border Box */}
            <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(239, 68, 68, 0.25)', pointerEvents: 'none' }} />

            {/* Coach Header Title */}
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
                {coachInfo.name}
              </h1>
              <div style={{ display: 'flex', itemsCenter: 'center', justifyContent: 'center', gap: '10px', fontSize: '13px', color: '#cbd5e1', marginTop: '8px' }}>
                <span>🟢 {coachInfo.whatsapp}</span>
                <span>|</span>
                <span>📞 {coachInfo.phone}</span>
                <span>|</span>
                <span style={{ fontWeight: 'bold' }}>{coachInfo.title}</span>
              </div>
            </div>

            {/* Certifications Box (الشهادات والخبرات) */}
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '20px', marginBottom: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderRight: '2px solid #ef4444', borderTop: '2px solid #ef4444' }} />
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', marginBottom: '12px', textAlign: 'right' }}>الشهادات والخبرات</h3>
              <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {coachInfo.certifications}
              </div>
            </div>

            {/* Client Info Box (بيانات المشترك) */}
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '24px', marginBottom: '30px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#ef4444', marginBottom: '20px' }}>بيانات المشترك</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#ef4444', display: 'block', fontWeight: 'bold' }}>الاسم</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{clientInfo.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#ef4444', display: 'block', fontWeight: 'bold' }}>العمر</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{clientInfo.age}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#ef4444', display: 'block', fontWeight: 'bold' }}>الطول</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{clientInfo.height}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#ef4444', display: 'block', fontWeight: 'bold' }}>الوزن</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{clientInfo.weight}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#ef4444', display: 'block', fontWeight: 'bold' }}>الهدف</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>{clientInfo.goal}</span>
              </div>
            </div>

            {/* Macro Cards 4 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div style={{ background: '#0f172a', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', display: 'block' }}>{macroTargets.kcal}</span>
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>سعرات</span>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', display: 'block' }}>{macroTargets.fats}g</span>
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>دهون</span>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', display: 'block' }}>{macroTargets.carbs}g</span>
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>كارب</span>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', display: 'block' }}>{macroTargets.protein}g</span>
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>بروتين</span>
              </div>
            </div>
          </div>

          {/* PAGE 1: مقدمة عن النظام (INTRODUCTION) */}
          <div
            id="nutr-full-page-1"
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#090d14',
              color: '#ffffff',
              boxSizing: 'border-box',
              padding: '50px 40px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', letterSpacing: '2px' }}>NUTRIPLAN</span>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#ffffff', margin: 0 }}>مقدمة عن النظام</h1>
                <span style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '4px', textTransform: 'uppercase' }}>I N T R O D U C T I O N</span>
              </div>
              <span style={{ width: '40px' }} />
            </div>

            <div style={{ marginTop: '40px', spaceY: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>مقدمة عامة</h2>
              
              <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '2.2', marginBottom: '24px' }}>
                {introText.p1}
              </p>

              <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '2.2', marginBottom: '24px' }}>
                {introText.p2}
              </p>

              <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '2.2' }}>
                {introText.p3}
              </p>
            </div>
          </div>

          {/* PAGE 2: معلومات عن التغذية (NUTRITION INFO) */}
          <div
            id="nutr-full-page-2"
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#090d14',
              color: '#ffffff',
              boxSizing: 'border-box',
              padding: '50px 40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', letterSpacing: '2px' }}>NUTRIPLAN</span>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff', margin: 0 }}>معلومات عن التغذية</h1>
                <span style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '4px', textTransform: 'uppercase' }}>N U T R I T I O N   I N F O</span>
              </div>
              <span style={{ width: '40px' }} />
            </div>

            <div style={{ marginTop: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444', marginBottom: '12px' }}>معلومات عن التغذية</h2>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '2', marginBottom: '24px' }}>
                {nutritionInfoText.mainInfo}
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', marginBottom: '14px' }}>نصائح ذهبية لخسارة الدهون:</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {nutritionInfoText.rules.map((rule, idx) => (
                  <div key={idx} style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '1.8' }}>
                    <strong>{idx + 1}.</strong> {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PAGES 3 to 3+N: MEAL PAGES (MEAL ONE, MEAL TWO, MEAL THREE, MEAL FOUR) */}
          {mealList.map((meal, mealIdx) => (
            <div
              key={meal.id}
              id={`nutr-full-page-${3 + mealIdx}`}
              style={{
                width: '794px',
                height: '1123px',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                background: '#090d14',
                color: '#ffffff',
                boxSizing: 'border-box',
                padding: '40px',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', letterSpacing: '2px' }}>NUTRIPLAN</span>
                <span style={{ width: '40px' }} />
              </div>

              {/* Meal Title Box with Red Corners */}
              <div style={{ border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '40px', background: 'rgba(15,23,42,0.8)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444', letterSpacing: '3px', margin: 0, textTransform: 'uppercase' }}>
                  {meal.titleEn}
                </h1>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px', display: 'block' }}>
                  {meal.titleAr}
                </span>
              </div>

              {/* Option 1 Card */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px', position: 'relative' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', lineHeight: '1.8', textAlign: 'center' }}>
                  <div style={{ direction: 'ltr', color: '#ffffff', marginBottom: '6px' }}>{meal.option1En}</div>
                  <div style={{ color: '#cbd5e1' }}>{meal.option1Ar}</div>
                </div>
                {meal.option1Note && (
                  <div style={{ textAlign: 'center', color: '#ef4444', fontStyle: 'italic', fontSize: '11px', marginTop: '10px', textTransform: 'uppercase' }}>
                    {meal.option1Note}
                  </div>
                )}
              </div>

              {/* Option 2 (OR) Card if present */}
              {meal.option2En && (
                <>
                  <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: '20px 0' }}>
                    OR
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '14px', padding: '24px', position: 'relative' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', lineHeight: '1.8', textAlign: 'center' }}>
                      <div style={{ direction: 'ltr', color: '#ffffff', marginBottom: '6px' }}>{meal.option2En}</div>
                      <div style={{ color: '#cbd5e1' }}>{meal.option2Ar}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Footer Quote */}
              <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#ffffff', letterSpacing: '2px' }}>".NO GUTS, NO GLORY"</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ width: '20px', height: '4px', background: '#334155' }} />
                  <span style={{ width: '20px', height: '4px', background: '#334155' }} />
                  <span style={{ width: '20px', height: '4px', background: '#ef4444' }} />
                </div>
              </div>
            </div>
          ))}

          {/* PAGE N+1: التعليمات والمكملات (GUIDELINES & SUPPLEMENTS) */}
          <div
            id={`nutr-full-page-${3 + mealList.length}`}
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#090d14',
              color: '#ffffff',
              boxSizing: 'border-box',
              padding: '40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', letterSpacing: '2px' }}>NUTRIPLAN</span>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff', margin: 0 }}>التعليمات والمكملات</h1>
                <span style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '4px', textTransform: 'uppercase' }}>G U I D E L I N E S</span>
              </div>
              <span style={{ width: '40px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444', margin: '0 0 6px 0' }}>اقتراح بالمكملات (( اختياري ))</h3>
                <div style={{ fontSize: '12px', color: '#cbd5e1', whiteSpace: 'pre-line' }}>{guidelines.supplements}</div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444', margin: '0 0 6px 0' }}>اقتراح بالفيتامينات (( اختياري ))</h3>
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{guidelines.vitamins}</div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#22c55e', margin: '0 0 6px 0' }}>✅ الاهتمام</h3>
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{guidelines.care}</div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 6px 0' }}>⚠️ التقليل</h3>
                <div style={{ fontSize: '12px', color: '#cbd5e1', whiteSpace: 'pre-line' }}>{guidelines.reduction}</div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f43f5e', margin: '0 0 6px 0' }}>🚫 الممنوع</h3>
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{guidelines.forbidden}</div>
              </div>
            </div>
          </div>

          {/* PAGE N+2: أسئلة شائعة عن الدايت (F.A.Q) */}
          <div
            id={`nutr-full-page-${4 + mealList.length}`}
            style={{
              width: '794px',
              height: '1123px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              background: '#090d14',
              color: '#ffffff',
              boxSizing: 'border-box',
              padding: '40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', letterSpacing: '2px' }}>NUTRIPLAN</span>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff', margin: 0 }}>أسئلة شائعة عن الدايت</h1>
                <span style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '4px', textTransform: 'uppercase' }}>F . A . Q</span>
              </div>
              <span style={{ width: '40px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
                    ؟ {faq.q}
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.7' }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
