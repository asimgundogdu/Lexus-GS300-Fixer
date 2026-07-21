// 2005 Lexus GS300 (2JZ-GE 3.0L Inline-6) - Kapsamlı Arıza Kodu Veritabanı

export interface RepairStep {
  order: number;
  description: string;
  estimatedTime: string | null;
  toolRequired: string | null;
}

export interface DtcCode {
  code: string;
  title: string;
  system: string;
  systemLabel: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  symptoms: string[];
  causes: string[];
  repairSteps: RepairStep[];
  estimatedCost: string;
  difficulty: "easy" | "medium" | "hard" | "professional";
  relatedCodes: string[];
}

export interface Symptom {
  id: string;
  label: string;
  systemHint: string | null;
}

export interface SymptomCategory {
  id: string;
  label: string;
  symptoms: Symptom[];
}

export interface VehicleSystem {
  id: string;
  label: string;
  icon: string;
  description: string;
  codeCount: number;
  criticalCount: number;
}

export const dtcCodes: DtcCode[] = [
  // ─── ENGINE / MOTOR ─────────────────────────────────────────────────────────
  {
    code: "P0300",
    title: "Rastgele / Çoklu Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description:
      "Motor kontrol ünitesi birden fazla silindirde veya rastgele ateşleme arızası tespit etti. 2005 Lexus GS300'de bu genellikle buji veya ateşleme bobini sorununa işaret eder.",
    symptoms: [
      "Motor titremesi ve sarsıntı",
      "Rölantide düzensiz çalışma",
      "Güç kaybı, gaz pedalına yanıt azalması",
      "Yakıt tüketiminde artış",
      "MIL (Arıza Işığı) yanıyor ve yanıp sönüyor",
      "Egzozdan patlama sesi",
    ],
    causes: [
      "Aşınmış veya kirli bujiler",
      "Hatalı ateşleme bobinleri",
      "Yakıt enjektörü tıkanması veya arızası",
      "Sıkıştırma kaybı (silindir contası)",
      "Hava-yakıt oranı dengesizliği",
      "Vakum kaçağı",
      "Düşük yakıt basıncı",
    ],
    repairSteps: [
      {
        order: 1,
        description: "OBD-II cihazıyla tüm arıza kodlarını okuyun ve kaydedin. Hangi silindirin en çok ateşleme arızası verdiğini belirleyin.",
        estimatedTime: "15 dakika",
        toolRequired: "OBD-II tarayıcı",
      },
      {
        order: 2,
        description: "Tüm 6 bujiye görsel inceleme yapın. Elektrot aşınması, yağlı veya kararmış buji ateşleme arızasının işareti. Boşluk değeri: 1.1 mm.",
        estimatedTime: "30 dakika",
        toolRequired: "Buji anahtarı, boşluk mastarı",
      },
      {
        order: 3,
        description: "Ateşleme bobinlerini komşu silindir arasında takas edin ve arızanın takip edip etmediğini test edin. Arıza takip ediyorsa bobin hatalı.",
        estimatedTime: "20 dakika",
        toolRequired: "El aleti seti",
      },
      {
        order: 4,
        description: "Hatalı buji ve bobinleri değiştirin. GS300 için NGK DILKAR7A11 veya dengi kullanın.",
        estimatedTime: "45 dakika",
        toolRequired: "Buji anahtarı, tork anahtarı (18 Nm)",
      },
      {
        order: 5,
        description: "Vakum hatlarını kontrol edin, çatlak veya gevşek bağlantı arayın. Giriş manifoldu contasını kontrol edin.",
        estimatedTime: "20 dakika",
        toolRequired: null,
      },
      {
        order: 6,
        description: "Yakıt enjektörlerini test etmek için injektör temizleyici kullanın veya enjektör akışını ölçtürün.",
        estimatedTime: "30 dakika",
        toolRequired: "Enjektör test cihazı",
      },
    ],
    estimatedCost: "800 - 4.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0301", "P0302", "P0303", "P0304", "P0305", "P0306"],
  },
  {
    code: "P0301",
    title: "1. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "1. silindirde ateşleme arızası tespit edildi. Belirtilen silindirin bujisi, bobini veya enjektörü kontrol edilmeli.",
    symptoms: [
      "Düzensiz rölanti, motor titriyor",
      "Güç kaybı",
      "Yakıt tüketimi artışı",
      "Arıza ikaz lambası yanıyor",
    ],
    causes: [
      "Hatalı buji (1. silindir)",
      "Hatalı ateşleme bobini (1. silindir)",
      "Tıkalı veya arızalı yakıt enjektörü",
      "Düşük silindir sıkıştırması",
      "Egzoz supap kaçağı",
    ],
    repairSteps: [
      {
        order: 1,
        description: "1. silindirin bujisini çıkarıp inceleyin ve gerekirse değiştirin.",
        estimatedTime: "15 dakika",
        toolRequired: "Buji anahtarı",
      },
      {
        order: 2,
        description: "1. silindirin ateşleme bobinini komşu silindirle takas edip test edin.",
        estimatedTime: "15 dakika",
        toolRequired: "El aleti seti",
      },
      {
        order: 3,
        description: "Kompresyon testi yapın. 1. silindirde 1.200 kPa altı değer, mekanik sorun işareti.",
        estimatedTime: "20 dakika",
        toolRequired: "Kompresyon ölçer",
      },
    ],
    estimatedCost: "500 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0302", "P0303"],
  },
  {
    code: "P0302",
    title: "2. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "2. silindirde ateşleme arızası tespit edildi.",
    symptoms: ["Düzensiz rölanti", "Güç kaybı", "Arıza ışığı"],
    causes: ["Hatalı buji", "Hatalı bobin", "Arızalı enjektör", "Düşük sıkıştırma"],
    repairSteps: [
      { order: 1, description: "2. silindirin bujisini kontrol edin ve değiştirin.", estimatedTime: "15 dakika", toolRequired: "Buji anahtarı" },
      { order: 2, description: "Bobini takas testi ile kontrol edin.", estimatedTime: "15 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "500 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0301", "P0303"],
  },
  {
    code: "P0303",
    title: "3. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "3. silindirde ateşleme arızası tespit edildi.",
    symptoms: ["Düzensiz rölanti", "Güç kaybı", "Arıza ışığı"],
    causes: ["Hatalı buji", "Hatalı bobin", "Arızalı enjektör", "Düşük sıkıştırma"],
    repairSteps: [
      { order: 1, description: "3. silindirin bujisini kontrol edin ve değiştirin.", estimatedTime: "15 dakika", toolRequired: "Buji anahtarı" },
      { order: 2, description: "Bobini takas testi ile kontrol edin.", estimatedTime: "15 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "500 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0302", "P0304"],
  },
  {
    code: "P0304",
    title: "4. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "4. silindirde ateşleme arızası. GS300 2JZ-GE motorunda bu hata özellikle arka bobinlerde sık görülür.",
    symptoms: ["Motor titremesi", "Rölanti düzensizliği", "Arıza ışığı"],
    causes: ["Hatalı buji", "Hatalı ateşleme bobini", "Arızalı enjektör"],
    repairSteps: [
      { order: 1, description: "4. silindirin bujisini inceleyin.", estimatedTime: "20 dakika", toolRequired: "Buji anahtarı" },
      { order: 2, description: "Bobin takas testi yapın.", estimatedTime: "15 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "500 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0303", "P0305"],
  },
  {
    code: "P0305",
    title: "5. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "5. silindirde ateşleme arızası.",
    symptoms: ["Motor titremesi", "Düzensiz rölanti", "Arıza ışığı"],
    causes: ["Hatalı buji", "Hatalı bobin", "Arızalı enjektör"],
    repairSteps: [
      { order: 1, description: "5. silindirin bujisini inceleyin.", estimatedTime: "20 dakika", toolRequired: "Buji anahtarı" },
    ],
    estimatedCost: "500 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0304", "P0306"],
  },
  {
    code: "P0306",
    title: "6. Silindir Ateşleme Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "6. (son) silindirde ateşleme arızası. Motor arka tarafındaki silindire erişim diğerlerine göre biraz daha zordur.",
    symptoms: ["Motor titremesi", "Düzensiz rölanti", "Arıza ışığı"],
    causes: ["Hatalı buji", "Hatalı bobin", "Arızalı enjektör"],
    repairSteps: [
      { order: 1, description: "6. silindirin bujisini inceleyin, erişim için bazı aksesuarların sökülmesi gerekebilir.", estimatedTime: "30 dakika", toolRequired: "Buji anahtarı, el aleti seti" },
    ],
    estimatedCost: "600 - 3.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0300", "P0305"],
  },
  {
    code: "P0171",
    title: "Sistem Çok Fakir (Banka 1)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description:
      "Motor kontrol modülü yakıt karışımının çok fakir (hava fazlası) olduğunu tespit etti. 2005 GS300'de yaygın bir sorun olup hava akış ölçer kirliliğinden kaynaklanır.",
    symptoms: [
      "Rölantide kararsız çalışma",
      "Güç kaybı özellikle düşük devirlerde",
      "Artan yakıt tüketimi",
      "Arıza ikaz lambası",
      "Motor düşük devire düşer veya söner",
    ],
    causes: [
      "Kirlenmiş veya arızalı MAF (Hava Kütlesi Sensörü)",
      "Vakum kaçağı (hortum, manifold contası)",
      "Tıkalı yakıt filtresi",
      "Düşük yakıt basıncı",
      "Hatalı oksijen sensörü",
      "PCV (Pozitif Krank Havalandırma) hortumu kaçağı",
    ],
    repairSteps: [
      {
        order: 1,
        description: "MAF sensörünü MAF temizleme spreyi ile temizleyin. Sprey dışında ürün kullanmayın, sensörü hasar verebilir.",
        estimatedTime: "20 dakika",
        toolRequired: "MAF sensör temizleyici sprey",
      },
      {
        order: 2,
        description: "Hava filtresi kutusundan turbo (supercharger yoksa giriş borusu) kadar tüm vakum hatlarını kontrol edin. Çatlak veya kopuk hortum arayın.",
        estimatedTime: "15 dakika",
        toolRequired: null,
      },
      {
        order: 3,
        description: "Yakıt basıncını ölçün. Çalışma basıncı: 304-343 kPa (44-50 psi). Düşükse yakıt pompası veya regülatör kontrol edin.",
        estimatedTime: "30 dakika",
        toolRequired: "Yakıt basınç göstergesi",
      },
      {
        order: 4,
        description: "PCV hortumunu ve valfini kontrol edin. Tıkalı veya kopuksa değiştirin.",
        estimatedTime: "15 dakika",
        toolRequired: null,
      },
      {
        order: 5,
        description: "Ön oksijen sensörünü (upstream O2) kontrol edin veya değiştirin.",
        estimatedTime: "45 dakika",
        toolRequired: "O2 sensör anahtarı",
      },
    ],
    estimatedCost: "200 - 3.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0174", "P0101", "P0131"],
  },
  {
    code: "P0174",
    title: "Sistem Çok Fakir (Banka 2)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "2. bankada yakıt karışımı çok fakir. P0171 ile birlikte görünüyorsa MAF sensörü veya büyük bir vakum kaçağı güçlü ihtimaldir.",
    symptoms: [
      "Rölantide kararsız çalışma",
      "Güç kaybı",
      "Artan yakıt tüketimi",
      "Arıza ikaz lambası",
    ],
    causes: [
      "Kirlenmiş MAF sensörü",
      "Büyük vakum kaçağı",
      "Düşük yakıt basıncı",
      "Arızalı oksijen sensörü (Banka 2)",
    ],
    repairSteps: [
      { order: 1, description: "P0171 ile aynı prosedürü uygulayın. İkisi birlikte çıkıyorsa MAF sensörü olasılığı çok yüksek.", estimatedTime: "20 dakika", toolRequired: "MAF temizleyici" },
      { order: 2, description: "MAF sensörü temizliği sonrası düzelmezse değiştirin.", estimatedTime: "30 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "200 - 4.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0171", "P0101", "P0132"],
  },
  {
    code: "P0101",
    title: "MAF Sensörü Aralık / Performans Hatası",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "Hava kütlesi akış sensörü (MAF) beklenen aralığın dışında bir değer gönderiyor. GS300'de kirlenen MAF çok sık görülür.",
    symptoms: [
      "Düşük devirde titreme ve güç kaybı",
      "Kötü yakıt ekonomisi",
      "Yavaş gaz tepkisi",
      "Arıza ışığı",
    ],
    causes: [
      "Kirlenmiş MAF sensör teli",
      "Hava filtresi tıkanması (MAF'a kirli hava ulaşması)",
      "Hava sızdırmazlık sorunu",
      "Arızalı MAF sensörü",
    ],
    repairSteps: [
      { order: 1, description: "Hava filtresini kontrol edin ve gerekirse değiştirin.", estimatedTime: "10 dakika", toolRequired: null },
      { order: 2, description: "MAF sensörünü özel temizleyici ile temizleyin.", estimatedTime: "20 dakika", toolRequired: "MAF sensör temizleyici" },
      { order: 3, description: "Test sürüşü ve live data ile MAF okumalarını kontrol edin (beklenen: 2-7 g/s rölantide).", estimatedTime: "15 dakika", toolRequired: "OBD-II tarayıcı" },
      { order: 4, description: "Temizleme yetmezse MAF sensörünü değiştirin.", estimatedTime: "20 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "300 - 2.500 TL",
    difficulty: "easy",
    relatedCodes: ["P0171", "P0174", "P0102", "P0103"],
  },
  {
    code: "P0420",
    title: "Katalitik Konvertör Verimi Düşük (Banka 1)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description:
      "Arka oksijen sensörü, katalitik konvertörün (katalizör) egzoz gazlarını yeterince temizlemediğini tespit etti. GS300'de 15-20 yaş arası araçlarda sıklıkla görülür.",
    symptoms: [
      "Arıza ikaz lambası (çoğu zaman tek belirti bu)",
      "Egzozdaki kükürt veya yanmış plastik kokusu",
      "Uzun vadeli yakıt tüketimi artışı",
    ],
    causes: [
      "Eski veya tükenmiş katalitik konvertör",
      "Yağ veya antifriz katalizörü zehirledi",
      "Hatalı oksijen sensörü okuması",
      "Uzun süreli ateşleme arızası katalizörü yaktı",
    ],
    repairSteps: [
      {
        order: 1,
        description: "Ön ve arka oksijen sensörlerinin live datayı kontrol edin. Arka sensör ön sensörle aynı dalga formunu gösteriyorsa katalizör bitmiş demektir.",
        estimatedTime: "15 dakika",
        toolRequired: "OBD-II tarayıcı",
      },
      {
        order: 2,
        description: "Önce P0300 gibi ateşleme arızaları ve yağ tüketimini giderin. Katalizörü değiştirmeden önce altta yatan neden çözülmeli.",
        estimatedTime: "Değişken",
        toolRequired: null,
      },
      {
        order: 3,
        description: "Arka oksijen sensörünü değiştirin (bazen bu yeterli olur). Sonuç değişmezse katalitik konvertörü değiştirin.",
        estimatedTime: "1-3 saat",
        toolRequired: "O2 sensör anahtarı, lift",
      },
    ],
    estimatedCost: "1.500 - 12.000 TL",
    difficulty: "professional",
    relatedCodes: ["P0430", "P0136", "P0141"],
  },
  {
    code: "P0430",
    title: "Katalitik Konvertör Verimi Düşük (Banka 2)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "2. banka katalitik konvertör verimi düşük. P0420 ile aynı tanı ve onarım prosedürü.",
    symptoms: ["Arıza ışığı", "Egzoz kokusu"],
    causes: ["Eskimiş katalitik konvertör", "Zehirlenmiş katalizör", "Hatalı O2 sensörü"],
    repairSteps: [
      { order: 1, description: "P0420 prosedürünü 2. banka için uygulayın.", estimatedTime: "15 dakika", toolRequired: "OBD-II tarayıcı" },
    ],
    estimatedCost: "1.500 - 12.000 TL",
    difficulty: "professional",
    relatedCodes: ["P0420", "P0156", "P0161"],
  },
  {
    code: "P0440",
    title: "EVAP Emisyon Kontrol Sistemi Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "low",
    description:
      "Yakıt buharı geri kazanım (EVAP) sisteminde genel hata. Çoğunlukla yakıt deposu kapağından kaynaklanır, ancak kanister veya purge valfi de hatalı olabilir.",
    symptoms: [
      "Arıza ikaz lambası (genellikle tek belirti)",
      "Yakıt kokusu araç içinde veya dışında",
      "Yakıt tüketimi hafif artış",
    ],
    causes: [
      "Gevşek, hasarlı veya kayıp yakıt deposu kapağı",
      "EVAP kanister arızası",
      "Purge valfi arızası",
      "EVAP hatlarında çatlak veya kopukluk",
    ],
    repairSteps: [
      { order: 1, description: "Yakıt deposu kapağını kontrol edin. 'Tık' sesi çıkana kadar sıkın veya yeni bir kapakla değiştirin (en ucuz ve yaygın çözüm).", estimatedTime: "2 dakika", toolRequired: null },
      { order: 2, description: "Arıza kodunu silin ve 1-2 gün kullanın. Kapak sorunduysa kod tekrar gelmez.", estimatedTime: "5 dakika", toolRequired: "OBD-II tarayıcı" },
      { order: 3, description: "Kod tekrar gelirse EVAP purge valfi ve kanisterini test edin.", estimatedTime: "1 saat", toolRequired: "Duman test cihazı" },
    ],
    estimatedCost: "50 - 2.500 TL",
    difficulty: "easy",
    relatedCodes: ["P0441", "P0442", "P0446", "P0456"],
  },
  {
    code: "P0441",
    title: "EVAP Sistemi Yanlış Temizleme Akışı",
    system: "engine",
    systemLabel: "Motor",
    severity: "low",
    description: "EVAP purge valfi veya devresi arızası. Yakıt buharı motora doğru oranda temizlenemiyor.",
    symptoms: ["Arıza ışığı", "Rölantide hafif düzensizlik", "Yakıt kokusu"],
    causes: ["Arızalı purge solenoid valfi", "Purge valfi elektrik devresinde sorun", "EVAP kanister doymuş"],
    repairSteps: [
      { order: 1, description: "Purge solenoid valfine 12V uygulayarak çalışıp çalışmadığını test edin.", estimatedTime: "20 dakika", toolRequired: "Multimetre" },
      { order: 2, description: "Arızalıysa purge solenoid valfini değiştirin.", estimatedTime: "30 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "300 - 1.200 TL",
    difficulty: "medium",
    relatedCodes: ["P0440", "P0446"],
  },
  {
    code: "P0446",
    title: "EVAP Vent Kontrol Sistemi Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "low",
    description: "EVAP sisteminin hava çıkış (vent) valfi arızası. Sistem basınç testinden geçemiyor.",
    symptoms: ["Arıza ışığı", "Yakıt kokusu", "Bazen depo kapağı açmak zorlaşır"],
    causes: ["Arızalı vent valfi (VSV)", "Vent hattında tıkanma", "Kanister tıkanması"],
    repairSteps: [
      { order: 1, description: "EVAP vent valfini kontrol edin (araç arkasında, kanisterin yakınında).", estimatedTime: "20 dakika", toolRequired: null },
      { order: 2, description: "Duman testi ile sızıntı noktasını belirleyin.", estimatedTime: "30 dakika", toolRequired: "Duman test cihazı" },
      { order: 3, description: "Hatalı valfi değiştirin.", estimatedTime: "30 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "400 - 1.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0440", "P0441"],
  },
  {
    code: "P0505",
    title: "Boşta Çalışma Kontrol Sistemi Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "Motor boşta hız kontrol sistemi (IAC veya elektronik gaz kelebeği) beklenen rölanti hızını sağlayamıyor.",
    symptoms: [
      "Rölantide dengesiz devir (700 yerine 400-1200 arasında salınım)",
      "Motor söner",
      "Isınma sırasında yüksek rölanti",
      "Arıza ışığı",
    ],
    causes: [
      "Kirlenmiş gaz kelebeği gövdesi",
      "Arızalı IAC (Boşta Hava Kontrol) valfi",
      "Vakum kaçağı",
      "Hatalı TPS (Gaz Kelebeği Konum Sensörü)",
    ],
    repairSteps: [
      { order: 1, description: "Gaz kelebeği gövdesini temizleyin. İçini throttle body temizleyici ile silin, özellikle IAC portunu.", estimatedTime: "30 dakika", toolRequired: "Throttle body temizleyici, bez" },
      { order: 2, description: "Temizlik sonrası gaz kelebeği adaptasyonunu sıfırlayın (OBD cihazıyla veya aküyü 10 dakika sökerek).", estimatedTime: "15 dakika", toolRequired: "OBD-II tarayıcı" },
      { order: 3, description: "IAC valfini kontrol edin ve gerekirse değiştirin.", estimatedTime: "40 dakika", toolRequired: "El aleti seti, multimetre" },
    ],
    estimatedCost: "200 - 2.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0506", "P0507"],
  },
  {
    code: "P1349",
    title: "VVT-i (Değişken Supap Zamanlaması) Sistem Arızası",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description:
      "2005 GS300'ün 2JZ-GE motorundaki VVT-i (Variable Valve Timing-Intelligent) sistemi beklenen konuma geçemiyor. Bu Lexus'a özgü önemli bir arıza kodudur. Motor yağı seviyesi ve kalitesi kritik rol oynar.",
    symptoms: [
      "Soğuk motorda sert veya düzensiz çalışma",
      "Düşük devirde güç kaybı",
      "Yakıt tüketimi artışı",
      "Egzozda tıklama sesi (özellikle soğukta)",
      "Motor gücü geç devreye girer",
    ],
    causes: [
      "Düşük veya kirlenmiş motor yağı (en yaygın neden)",
      "Tıkalı VVT-i OCV (Yağ Kontrol Valfi)",
      "Arızalı VVT-i OCV solenoid",
      "Kamşaft pozisyon sensörü arızası",
      "VVT-i dişlisi (cam gear) arızası",
    ],
    repairSteps: [
      {
        order: 1,
        description: "ÖNCE motor yağını kontrol edin. Seviye düşükse veya yağ çok koyuysa/koyulaşmışsa hemen yağ+filtre değişimi yapın. Bu adım tek başına sorunu çözebilir.",
        estimatedTime: "30 dakika",
        toolRequired: "Yağ çekme aparatı veya lift",
      },
      {
        order: 2,
        description: "Yağ değişimi sonrası VVT-i OCV'yi (Yağ Kontrol Valfi, giriş manifoldu yanında) sökün ve temizleyin. İçine temiz yağ damlayarak test edin.",
        estimatedTime: "30 dakika",
        toolRequired: "El aleti seti",
      },
      {
        order: 3,
        description: "OCV solenoidinin direncini ölçün (beklenen: 6-7 Ohm). Sapma varsa valfi değiştirin.",
        estimatedTime: "15 dakika",
        toolRequired: "Multimetre",
      },
      {
        order: 4,
        description: "Kamşaft pozisyon sensörünü kontrol edin ve gerekirse değiştirin.",
        estimatedTime: "30 dakika",
        toolRequired: "El aleti seti",
      },
    ],
    estimatedCost: "300 - 5.000 TL",
    difficulty: "hard",
    relatedCodes: ["P0010", "P0011", "P0012"],
  },
  {
    code: "P0521",
    title: "Motor Yağı Basınç Sensörü Aralık/Performans Hatası",
    system: "engine",
    systemLabel: "Motor",
    severity: "critical",
    description:
      "Yağ basınç sensörü beklenen aralığın dışında değer bildiriyor. Bu kod kritik önem taşır — motor yağı basıncı gerçekten düşük olabilir ve derhal durmayı gerektirebilir.",
    symptoms: [
      "Yağ ikaz lambası yanıyor",
      "Arıza ikaz lambası",
      "Motorda tıkırtı sesi (yağ basıncı gerçekten düşükse)",
      "Motor sıcaklığı artabilir",
    ],
    causes: [
      "Arızalı yağ basınç sensörü (sahte alarm)",
      "Gerçek yağ basıncı düşüklüğü",
      "Yağ pompası arızası",
      "Düşük yağ seviyesi",
      "Yağ filtresi tıkanması",
    ],
    repairSteps: [
      { order: 1, description: "HEMEN yağ seviyesini kontrol edin. Düşükse yağ ekleyin ve aracı kullanmayı bırakın.", estimatedTime: "5 dakika", toolRequired: null },
      { order: 2, description: "Gerçek yağ basıncını mekanik manometre ile ölçün (beklenen: rölantide min. 28 kPa, yüksek devirde 200-500 kPa).", estimatedTime: "20 dakika", toolRequired: "Mekanik yağ basınç manometresi" },
      { order: 3, description: "Basınç normalse sensörü değiştirin.", estimatedTime: "20 dakika", toolRequired: "Sensör anahtarı" },
      { order: 4, description: "Basınç düşükse motoru çalıştırmayın, servise çekin.", estimatedTime: null, toolRequired: null },
    ],
    estimatedCost: "200 - 8.000 TL",
    difficulty: "hard",
    relatedCodes: ["P0522", "P0523"],
  },
  {
    code: "P0016",
    title: "Krank-Kamşaft Konum Uyuşmazlığı (Banka 1 Sensör A)",
    system: "engine",
    systemLabel: "Motor",
    severity: "high",
    description: "Krank mili ve eksantrik mil (emme) pozisyon sensörleri arasında beklenen sinyale göre sapma var. Distribütör zinciri atlaması veya VVT-i sorunuyla ilişkili olabilir.",
    symptoms: [
      "Motor çalışmaz veya zor çalışır",
      "Güçlü titreme",
      "Güç kaybı",
      "Yakıt tüketimi artışı",
    ],
    causes: [
      "Distribütör (zamanlama) zinciri atlaması veya aşınması",
      "VVT-i OCV tıkanması",
      "Krank veya kamşaft sensörü arızası",
      "Yağ basıncı sorunuyla bağlantılı VVT-i gecikmesi",
    ],
    repairSteps: [
      { order: 1, description: "Motor yağını kontrol edin. VVT-i sistemi yağ basıncıyla çalışır.", estimatedTime: "5 dakika", toolRequired: null },
      { order: 2, description: "Distribütör zinciri ve gerdirici kontrolü için motor kaputunu açın, tık-tak sesini dinleyin (soğukken).", estimatedTime: "10 dakika", toolRequired: null },
      { order: 3, description: "VVT-i OCV valfini temizleyin veya değiştirin.", estimatedTime: "30 dakika", toolRequired: "El aleti seti" },
      { order: 4, description: "Sensör arızası şüphesinde krank/kamşaft sensörlerini değiştirin.", estimatedTime: "45 dakika", toolRequired: "El aleti seti, multimetre" },
    ],
    estimatedCost: "500 - 15.000 TL",
    difficulty: "professional",
    relatedCodes: ["P1349", "P0011", "P0012"],
  },

  // ─── TRANSMISSION / VİTES KUTUSU ────────────────────────────────────────────
  {
    code: "P0741",
    title: "Tork Konvertörü Kavraması - Performans Hatası veya Takılı Kalmış",
    system: "transmission",
    systemLabel: "Şanzıman",
    severity: "high",
    description:
      "Otomatik şanzıman tork konvertörü TCC (Torque Converter Clutch) sistemi sorunlu. 2005 GS300'de yaşlanan ATF yağı ve kirli şanzıman filtresi en yaygın nedendir.",
    symptoms: [
      "Vites geçişlerinde sarsılma veya vibrasyon",
      "Sabit hızda titreme (vites kilitlenme sorunsalı)",
      "Araç ilerlemiyor veya bağlanamıyor",
      "Yakıt tüketimi artışı",
      "Şanzıman uyarı lambası (OD off lambası)",
    ],
    causes: [
      "Kirlenmiş veya eskimiş şanzıman yağı (ATF)",
      "Tıkalı şanzıman filtresi",
      "TCC solenoid arızası",
      "Şanzıman iç mekanik aşınma",
    ],
    repairSteps: [
      { order: 1, description: "Şanzıman yağını (ATF) kontrol edin. Renk ve koku önemli: temiz ATF kırmızı, yanmış ATF siyah/kahve renkli ve yanık kokar.", estimatedTime: "10 dakika", toolRequired: null },
      { order: 2, description: "ATF değişimi + şanzıman filtresi değişimi yapın. Toyota WS ATF veya Lexus onaylı ATF kullanın.", estimatedTime: "1.5 saat", toolRequired: "Lift, ATF dolum aparatı" },
      { order: 3, description: "Değişim yeterli olmazsa TCC solenoidini kontrol edin ve değiştirin.", estimatedTime: "2 saat", toolRequired: "El aleti seti, multimetre" },
    ],
    estimatedCost: "800 - 8.000 TL",
    difficulty: "hard",
    relatedCodes: ["P0740", "P0742", "P0750"],
  },
  {
    code: "P0750",
    title: "Vites 1 Solenoid Devre Arızası",
    system: "transmission",
    systemLabel: "Şanzıman",
    severity: "high",
    description: "Şanzıman 1. vites solenoid valfi veya devresi arızalı. Şanzıman belirli viteslere geçemiyor veya takılı kalıyor.",
    symptoms: ["Şanzıman belli viteste takılı kalıyor", "Sert vites geçişleri", "OD lambası yanıyor", "Güç kaybı"],
    causes: ["Arızalı solenoid valfi", "Elektrik devresinde açık veya kısa devre", "Kirli ATF"],
    repairSteps: [
      { order: 1, description: "ATF değişimi yapın ve sonucu bekleyin.", estimatedTime: "1.5 saat", toolRequired: "Lift" },
      { order: 2, description: "Solenoid direncini ölçün (beklenen: 11-15 Ohm).", estimatedTime: "20 dakika", toolRequired: "Multimetre" },
      { order: 3, description: "Hatalı solenoid bloğunu değiştirin.", estimatedTime: "3 saat", toolRequired: "El aleti seti, lift" },
    ],
    estimatedCost: "1.500 - 7.000 TL",
    difficulty: "professional",
    relatedCodes: ["P0741", "P0755", "P0760"],
  },
  {
    code: "P0755",
    title: "Vites 2 Solenoid Devre Arızası",
    system: "transmission",
    systemLabel: "Şanzıman",
    severity: "high",
    description: "Şanzıman 2. vites solenoid valfi arızalı.",
    symptoms: ["2. viteste sorun", "Sert geçişler", "OD lambası", "Güç kaybı"],
    causes: ["Arızalı solenoid", "Elektrik sorunu", "Kirli ATF"],
    repairSteps: [
      { order: 1, description: "ATF değişimi deneyin.", estimatedTime: "1.5 saat", toolRequired: "Lift" },
      { order: 2, description: "Solenoid bloğunu test edin ve gerekirse değiştirin.", estimatedTime: "3 saat", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "1.500 - 7.000 TL",
    difficulty: "professional",
    relatedCodes: ["P0750", "P0760", "P0765"],
  },
  {
    code: "P0760",
    title: "Vites 3 Solenoid Devre Arızası",
    system: "transmission",
    systemLabel: "Şanzıman",
    severity: "high",
    description: "Şanzıman 3. vites solenoid valfi arızalı.",
    symptoms: ["3. viteste sorun", "Sert geçişler", "OD lambası"],
    causes: ["Arızalı solenoid", "Kirli ATF", "Elektrik sorunu"],
    repairSteps: [
      { order: 1, description: "ATF ve filtre değişimi yapın.", estimatedTime: "1.5 saat", toolRequired: "Lift" },
      { order: 2, description: "Solenoid bloğunu test et ve değiştir.", estimatedTime: "3 saat", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "1.500 - 7.000 TL",
    difficulty: "professional",
    relatedCodes: ["P0750", "P0755", "P0765"],
  },

  // ─── ABS / FRENLEMEi ────────────────────────────────────────────────────────
  {
    code: "C0200",
    title: "Sağ Ön Tekerlek Hız Sensörü Devre Arızası",
    system: "abs",
    systemLabel: "ABS / Fren",
    severity: "high",
    description: "Sağ ön tekerlek hız sensörü sinyal göndermiyor veya aralık dışı sinyal gönderiyor. ABS ve traksiyon kontrol sistemi devre dışı kalır.",
    symptoms: [
      "ABS uyarı lambası yanıyor",
      "TRC/VSC uyarı lambası yanıyor",
      "ABS çalışmıyor (normal fren çalışır)",
      "Fren sırasında pedal titremesi",
    ],
    causes: [
      "Kirlenmiş veya arızalı tekerlek hız sensörü",
      "Hasarlı sensör kablosu (özellikle kış yollarında korozyon)",
      "Aşınmış ABS halkası (tone ring)",
      "Sensör - halkası arası boşluk değişimi",
    ],
    repairSteps: [
      { order: 1, description: "Sağ ön tekerleği çıkarın ve sensörü görsel inceleyın. Kablo hasarı, korozyon arayın.", estimatedTime: "20 dakika", toolRequired: "Kriko, tekerlek anahtarı" },
      { order: 2, description: "Multimetre ile sensör direncini ölçün (beklenen: 800-1400 Ohm arası).", estimatedTime: "15 dakika", toolRequired: "Multimetre" },
      { order: 3, description: "ABS halkasını (hub'a entegre) kontrol edin. Çatlak veya aşınma varsa hub değişimi gerekir.", estimatedTime: "20 dakika", toolRequired: null },
      { order: 4, description: "Hatalı sensörü değiştirin.", estimatedTime: "30 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "400 - 2.000 TL",
    difficulty: "medium",
    relatedCodes: ["C0205", "C0210", "C0215"],
  },
  {
    code: "C0205",
    title: "Sağ Arka Tekerlek Hız Sensörü Devre Arızası",
    system: "abs",
    systemLabel: "ABS / Fren",
    severity: "high",
    description: "Sağ arka tekerlek hız sensörü arızalı. GS300'de arka tekerlek sensörleri daha kolay korozyon alabilir.",
    symptoms: ["ABS lambası", "VSC/TRC lambası", "ABS çalışmıyor"],
    causes: ["Arızalı sensör", "Kablo hasarı", "Korozyon", "ABS halkası hasarı"],
    repairSteps: [
      { order: 1, description: "Sağ arka tekerleği çıkarın ve sensörü inceleyin.", estimatedTime: "20 dakika", toolRequired: "Kriko, tekerlek anahtarı" },
      { order: 2, description: "Sensör direncini ölçün (800-1400 Ohm).", estimatedTime: "10 dakika", toolRequired: "Multimetre" },
      { order: 3, description: "Arızalı sensörü değiştirin.", estimatedTime: "25 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "400 - 2.000 TL",
    difficulty: "medium",
    relatedCodes: ["C0200", "C0210", "C0215"],
  },
  {
    code: "C0210",
    title: "Sol Ön Tekerlek Hız Sensörü Devre Arızası",
    system: "abs",
    systemLabel: "ABS / Fren",
    severity: "high",
    description: "Sol ön tekerlek hız sensörü arızalı.",
    symptoms: ["ABS lambası", "TRC/VSC lambası", "ABS çalışmıyor"],
    causes: ["Arızalı sensör", "Kablo hasarı", "ABS halkası aşınması"],
    repairSteps: [
      { order: 1, description: "Sol ön tekerleği çıkarın, sensörü kontrol edin.", estimatedTime: "20 dakika", toolRequired: "Kriko, tekerlek anahtarı" },
      { order: 2, description: "Sensörü değiştirin.", estimatedTime: "25 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "400 - 2.000 TL",
    difficulty: "medium",
    relatedCodes: ["C0200", "C0205", "C0215"],
  },
  {
    code: "C0215",
    title: "Sol Arka Tekerlek Hız Sensörü Devre Arızası",
    system: "abs",
    systemLabel: "ABS / Fren",
    severity: "high",
    description: "Sol arka tekerlek hız sensörü arızalı.",
    symptoms: ["ABS lambası", "TRC/VSC lambası", "ABS çalışmıyor"],
    causes: ["Arızalı sensör", "Kablo hasarı", "Korozyon"],
    repairSteps: [
      { order: 1, description: "Sol arka tekerleği çıkarın ve sensörü kontrol edin.", estimatedTime: "20 dakika", toolRequired: "Kriko, tekerlek anahtarı" },
      { order: 2, description: "Sensörü değiştirin.", estimatedTime: "25 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "400 - 2.000 TL",
    difficulty: "medium",
    relatedCodes: ["C0200", "C0205", "C0210"],
  },

  // ─── ELEKTRİK / GÖVDEi ──────────────────────────────────────────────────────
  {
    code: "B1410",
    title: "Hava Yastığı Sistemi Arızası",
    system: "electrical",
    systemLabel: "Elektrik / Gövde",
    severity: "critical",
    description:
      "Hava yastığı (airbag) SRS sistemi arızası. Bu kod kritik güvenlik önemi taşır. Hava yastıkları doğru çalışmayabilir ya da yanlış açılabilir. Mutlaka yetkili servise götürülmeli.",
    symptoms: [
      "SRS / Airbag uyarı lambası yanıyor",
      "Direksiyon üzerindeki kontroller çalışmıyor (bazı durumlarda)",
    ],
    causes: [
      "Koltuk altı veya kapı kenarındaki hava yastığı modülü sorunlu",
      "Arızalı kaza sensörü",
      "Hatalı saat yayı (spiralli kablo)",
      "Akü değişimi sonrası silinen SRS kaydı",
      "Nem veya korozyon",
    ],
    repairSteps: [
      { order: 1, description: "UYARI: SRS sistemine müdahale etmeden önce aküyü söküp 2 dakika bekleyin. Kazara tetikleme tehlikelidir.", estimatedTime: "5 dakika", toolRequired: null },
      { order: 2, description: "SRS tarayıcıyla hata kodunu okuyun. Kod kaynağı sensör mü yoksa modül mü belirleyin.", estimatedTime: "15 dakika", toolRequired: "SRS/ABS tarayıcı" },
      { order: 3, description: "Bu arıza için yetkili Lexus servisi veya SRS uzmanı gereklidir.", estimatedTime: null, toolRequired: null },
    ],
    estimatedCost: "500 - 15.000 TL",
    difficulty: "professional",
    relatedCodes: [],
  },
  {
    code: "U0100",
    title: "CAN Veri Yolu İletişim Arızası - Motor Kontrol Modülü",
    system: "electrical",
    systemLabel: "Elektrik / Gövde",
    severity: "high",
    description:
      "Motor kontrol modülü (ECM) ile diğer modüller arasında CAN veri yolu iletişimi yok veya kesildi. Birden fazla sistem aynı anda hata verebilir.",
    symptoms: [
      "Birden fazla uyarı lambası aynı anda yanıyor",
      "Motor çalışmıyor veya zor çalışıyor",
      "Çeşitli sistemler yanıt vermiyor",
      "Gösterge panelinde aşırı hata mesajı",
    ],
    causes: [
      "Düşük veya zayıf akü voltajı",
      "Arızalı veya gevşek toprak (mass) bağlantısı",
      "ECM güç veya toprak sorunu",
      "Kablo demeti hasarı",
    ],
    repairSteps: [
      { order: 1, description: "Aküyü test edin (beklenen: 12.4-12.7V dinlenim, 13.7-14.7V çalışırken). Zayıf akü pek çok CAN hatasına neden olur.", estimatedTime: "10 dakika", toolRequired: "Multimetre veya akü test cihazı" },
      { order: 2, description: "Tüm toprak (mass) bağlantılarını kontrol edin. Motor bloğu, şase ve ECM toprakları temiz ve sıkı olmalı.", estimatedTime: "20 dakika", toolRequired: "El aleti seti, zımpara" },
      { order: 3, description: "OBD tarayıcısıyla tüm kodları okuyun ve en temel kodu önce çözün.", estimatedTime: "15 dakika", toolRequired: "OBD-II tarayıcı" },
      { order: 4, description: "Sorun devam ederse ECM güç ve toprak devresini incelenmek üzere servise götürün.", estimatedTime: null, toolRequired: null },
    ],
    estimatedCost: "200 - 20.000 TL",
    difficulty: "professional",
    relatedCodes: ["U0121", "U0073"],
  },
  {
    code: "U0121",
    title: "CAN Veri Yolu İletişim Arızası - ABS Modülü",
    system: "electrical",
    systemLabel: "Elektrik / Gövde",
    severity: "high",
    description: "ABS modülüyle iletişim kesildi. ABS, VSC ve traksiyon kontrol sistemleri çalışmıyor.",
    symptoms: ["ABS lambası", "VSC lambası", "TRC lambası", "Tüm kontrol sistemleri devre dışı"],
    causes: ["ABS modülü arızası", "CAN veri yolu kablo hasarı", "Düşük akü voltajı", "Toprak sorunu"],
    repairSteps: [
      { order: 1, description: "Akü voltajını kontrol edin.", estimatedTime: "10 dakika", toolRequired: "Multimetre" },
      { order: 2, description: "ABS modülü kablo bağlantılarını kontrol edin.", estimatedTime: "15 dakika", toolRequired: null },
      { order: 3, description: "Sorun devam ederse ABS modülünü serviste test ettirin.", estimatedTime: null, toolRequired: null },
    ],
    estimatedCost: "500 - 12.000 TL",
    difficulty: "professional",
    relatedCodes: ["U0100", "C0200"],
  },

  // ─── SOĞUTMA SİSTEMİi ────────────────────────────────────────────────────────
  {
    code: "P0115",
    title: "Motor Soğutma Suyu Sıcaklık Sensörü Devre Arızası",
    system: "cooling",
    systemLabel: "Soğutma",
    severity: "medium",
    description: "Motor soğutma suyu sıcaklık sensörü (ECT) sinyal göndermiyorsa motor soğuk çalışmaya devam eder, yakıt fazla gönderilir.",
    symptoms: [
      "Gösterge panelinde sıcaklık hiç artmıyor veya tepki yok",
      "Yakıt tüketimi artışı (motor hep zengin karışımla çalışır)",
      "Arıza ışığı",
      "Fan sürekli yüksek devirde çalışıyor",
    ],
    causes: ["Arızalı ECT sensörü", "Kablo hasarı", "ECM giriş sorunu"],
    repairSteps: [
      { order: 1, description: "ECT sensörü direncini sıcaklığa göre ölçün (20°C'de ~2400 Ohm, 80°C'de ~300 Ohm).", estimatedTime: "20 dakika", toolRequired: "Multimetre, termometre" },
      { order: 2, description: "Değer dışındaysa sensörü değiştirin. Giriş manifoldu yanında, antifriz içinde.", estimatedTime: "20 dakika", toolRequired: "Sensör anahtarı, antifriz" },
    ],
    estimatedCost: "200 - 800 TL",
    difficulty: "easy",
    relatedCodes: ["P0116", "P0117", "P0118"],
  },
  {
    code: "P0128",
    title: "Soğutma Suyu Sıcaklığı Düşük - Termostat",
    system: "cooling",
    systemLabel: "Soğutma",
    severity: "medium",
    description: "Motor çalışma sıcaklığına yeterince yükselemiyor. Genellikle açık kalmış termostat. Kalorifer ısıtmaz, yakıt tüketimi artar.",
    symptoms: [
      "Motor çalışma sıcaklığı normale gelmez (gösterge düşük kalır)",
      "Kalorifer yeterince ısıtmıyor",
      "Yakıt tüketimi artışı",
      "Arıza ışığı",
    ],
    causes: ["Termostat açık kalmış (sıkışmış açık konumda)", "Arızalı ECT sensörü"],
    repairSteps: [
      { order: 1, description: "Motoru ısıtın ve üst radyatör hortumunun ne zaman ısındığını kontrol edin. Normalde 80-90°C'de ısınmalı. Erken ısınıyorsa termostat açık.", estimatedTime: "20 dakika", toolRequired: "Termometre (kızılötesi)" },
      { order: 2, description: "Termostatı değiştirin. GS300'de alt tarafta radyatör kanalının girişinde.", estimatedTime: "1 saat", toolRequired: "El aleti seti, antifriz" },
    ],
    estimatedCost: "300 - 1.000 TL",
    difficulty: "medium",
    relatedCodes: ["P0115", "P0117"],
  },

  // ─── AKARYAKIT ───────────────────────────────────────────────────────────────
  {
    code: "P0087",
    title: "Yakıt Rayı/Sistemi Basıncı Çok Düşük",
    system: "fuel",
    systemLabel: "Yakıt Sistemi",
    severity: "high",
    description: "Yakıt sistemi basıncı beklenen değerin altında. Araç ivmelenirken güç kesilmesi yaşanabilir.",
    symptoms: [
      "İvmede güç kesilmesi ve sarsıntı",
      "Motor yüksek yükte söner",
      "Soğuk çalışmada sorun",
      "Arıza ışığı",
    ],
    causes: [
      "Zayıflamış yakıt pompası",
      "Tıkalı yakıt filtresi",
      "Arızalı yakıt basınç regülatörü",
      "Tıkalı yakıt enjektörleri",
    ],
    repairSteps: [
      { order: 1, description: "Yakıt basıncını ölçün (beklenen: 304-343 kPa / 44-50 psi çalışırken).", estimatedTime: "20 dakika", toolRequired: "Yakıt basınç ölçer" },
      { order: 2, description: "Yakıt filtresini değiştirin (her 40.000 km'de bir tavsiye edilir).", estimatedTime: "45 dakika", toolRequired: "El aleti seti, yakıt hattı pensi" },
      { order: 3, description: "Basınç düşmeye devam ederse yakıt pompasını değiştirin.", estimatedTime: "2 saat", toolRequired: "El aleti seti, oturma aparatı" },
    ],
    estimatedCost: "500 - 4.000 TL",
    difficulty: "hard",
    relatedCodes: ["P0171", "P0174", "P0088"],
  },

  // ─── OKSİJEN SENSÖRÜ ─────────────────────────────────────────────────────────
  {
    code: "P0136",
    title: "O2 Sensörü Devresi Arızası (Banka 1 Sensör 2)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "Arka (post-katalitik) oksijen sensörü sinyal göndermiyor veya aralık dışı. Katalitik konvertör verimini doğrudan etkiler.",
    symptoms: ["Arıza ışığı", "Yakıt tüketimi artışı", "Bazen egzoz kokusu"],
    causes: ["Arızalı O2 sensörü", "Kablo hasarı veya korozyon", "Egzoz sızıntısı sensörün önüne"],
    repairSteps: [
      { order: 1, description: "Live data ile sensörün değerini kontrol edin (beklenen: stabil 0.5-0.9V arası katalitik konvertör sonrasında).", estimatedTime: "15 dakika", toolRequired: "OBD-II tarayıcı" },
      { order: 2, description: "O2 sensörünü değiştirin (Denso veya NGK orijinal tavsiye edilir).", estimatedTime: "30-45 dakika", toolRequired: "O2 sensör anahtarı" },
    ],
    estimatedCost: "500 - 1.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0420", "P0141"],
  },
  {
    code: "P0031",
    title: "O2 Isıtıcı Kontrol Devresi Düşük (Banka 1 Sensör 1)",
    system: "engine",
    systemLabel: "Motor",
    severity: "medium",
    description: "Ön oksijen sensörünün iç ısıtıcı devresi çok düşük akım çekiyor (devre açık veya sensör iç arıza).",
    symptoms: ["Arıza ışığı", "Soğuk çalışmada yakıt zenginleşmesi uzuyor", "Yakıt tüketimi artışı"],
    causes: ["Arızalı O2 sensör ısıtıcısı", "Kesik kablo", "Sigorta arızası"],
    repairSteps: [
      { order: 1, description: "Sensör kablosundaki ilgili sigortayı kontrol edin.", estimatedTime: "10 dakika", toolRequired: null },
      { order: 2, description: "Sensör ısıtıcı direncini ölçün (beklenen: 10-40 Ohm). Dışarıdaysa sensörü değiştirin.", estimatedTime: "20 dakika", toolRequired: "Multimetre" },
      { order: 3, description: "Ön O2 sensörünü değiştirin.", estimatedTime: "30 dakika", toolRequired: "O2 anahtarı" },
    ],
    estimatedCost: "600 - 1.800 TL",
    difficulty: "medium",
    relatedCodes: ["P0032", "P0037"],
  },

  // ─── SOĞUTMA FANI ─────────────────────────────────────────────────────────────
  {
    code: "P0480",
    title: "Soğutma Fanı 1 Kontrol Devresi Arızası",
    system: "cooling",
    systemLabel: "Soğutma",
    severity: "high",
    description: "Radyatör soğutma fanı kontrol devresi arızalı. Fan çalışmazsa motor aşırı ısınabilir.",
    symptoms: [
      "Motor aşırı ısınıyor (özellikle trafikte yavaş gidişte)",
      "Fan çalışmıyor veya sürekli çalışıyor",
      "Arıza ışığı",
      "Klima soğutmuyor (fan klima kondansörünü de soğutur)",
    ],
    causes: ["Arızalı fan motoru", "Fan rölesi arızası", "Fan sigortası", "ECM fan kontrol sorunu"],
    repairSteps: [
      { order: 1, description: "Fan sigorta ve rölesini kontrol edin (sigorta kutusu: motor bölümü, sol taraf).", estimatedTime: "10 dakika", toolRequired: null },
      { order: 2, description: "Fan motoruna doğrudan 12V uygulayarak çalışıp çalışmadığını test edin.", estimatedTime: "15 dakika", toolRequired: "Multimetre, kablo" },
      { order: 3, description: "Hatalı bileşeni (rölé, motor veya sigorta) değiştirin.", estimatedTime: "30-60 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "200 - 2.500 TL",
    difficulty: "medium",
    relatedCodes: ["P0481", "P0483"],
  },

  // ─── DİREKSİYON ──────────────────────────────────────────────────────────────
  {
    code: "C1511",
    title: "Direksiyon Açı Sensörü - Arıza",
    system: "steering",
    systemLabel: "Direksiyon",
    severity: "medium",
    description: "Direksiyon açı sensörü (saat yayının yanındaki) arızalı veya kalibre edilmemiş. VSC sistemi doğru çalışmayabilir.",
    symptoms: [
      "VSC uyarı lambası yanıyor",
      "Direksiyon sert dönüyor (bazen)",
      "EPS (elektrik direksiyon servosu) uyarı lambası",
    ],
    causes: [
      "Direksiyon açı sensörü arızası",
      "Akü değişimi veya sıfırlama sonrası kalibrasyon kaybı",
      "Saat yayı (spiral kablo) arızası",
    ],
    repairSteps: [
      { order: 1, description: "OBD tarayıcıyla direksiyon açı sensörü kalibrasyonunu yapın (akü söküldüğünde otomatik sıfırlanır, yeniden kalibrasyon gerekir).", estimatedTime: "15 dakika", toolRequired: "Toyota/Lexus uyumlu OBD tarayıcı" },
      { order: 2, description: "Kalibrasyon yetmezse sensörü değiştirin.", estimatedTime: "1 saat", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "300 - 3.000 TL",
    difficulty: "medium",
    relatedCodes: ["C1512"],
  },

  // ─── KLİMA ───────────────────────────────────────────────────────────────────
  {
    code: "B1411",
    title: "A/C İç Hava Sıcaklık Sensörü Devre Arızası",
    system: "ac",
    systemLabel: "Klima / İklimlendirme",
    severity: "low",
    description: "Klima kontrol sistemindeki iç hava sıcaklık sensörü arızalı. Otomatik iklim kontrolü doğru çalışmayabilir.",
    symptoms: [
      "Klima uyarı lambası",
      "Otoklima istenen sıcaklığa gelmiyor",
      "Isıtma veya soğutma aşırıya kaçıyor",
    ],
    causes: ["Arızalı iç hava sıcaklık sensörü", "Aspiratör fanı (sensörü soğutan küçük fan) arızası", "Kablo sorunu"],
    repairSteps: [
      { order: 1, description: "Torpido altında veya panel üzerindeki sensörü bulun ve direncini ölçün.", estimatedTime: "20 dakika", toolRequired: "Multimetre" },
      { order: 2, description: "Sensörü değiştirin.", estimatedTime: "20 dakika", toolRequired: "El aleti seti" },
    ],
    estimatedCost: "200 - 800 TL",
    difficulty: "easy",
    relatedCodes: [],
  },
];

// ─── SEMPTOMLARI ─────────────────────────────────────────────────────────────

export const symptomCategories: SymptomCategory[] = [
  {
    id: "engine_running",
    label: "Motor Çalışması",
    symptoms: [
      { id: "rough_idle", label: "Rölantide titreme / düzensiz çalışma", systemHint: "engine" },
      { id: "hard_start", label: "Motor zor çalışıyor", systemHint: "engine" },
      { id: "stall", label: "Motor söner / aniden durur", systemHint: "engine" },
      { id: "misfire_feel", label: "Silindirde patlama / motor tökezliyor", systemHint: "engine" },
      { id: "high_idle", label: "Rölanti çok yüksek", systemHint: "engine" },
      { id: "low_idle", label: "Rölanti çok düşük (devir düşüp söner)", systemHint: "engine" },
      { id: "cold_rough", label: "Soğuk motorda sert çalışma", systemHint: "engine" },
    ],
  },
  {
    id: "performance",
    label: "Performans",
    symptoms: [
      { id: "power_loss", label: "Güç kaybı / araç ivvicelenmiyor", systemHint: "engine" },
      { id: "hesitation", label: "Gaz basınca gecikme / tereddüt", systemHint: "engine" },
      { id: "no_boost", label: "Yüksek devirde güç kesilmesi", systemHint: "engine" },
      { id: "fuel_increase", label: "Yakıt tüketimi belirgin şekilde arttı", systemHint: "engine" },
    ],
  },
  {
    id: "transmission",
    label: "Vites / Şanzıman",
    symptoms: [
      { id: "hard_shift", label: "Sert / sarsıntılı vites geçişi", systemHint: "transmission" },
      { id: "no_shift", label: "Belli vitese geçmiyor", systemHint: "transmission" },
      { id: "stuck_gear", label: "Viteste takılı kalıyor", systemHint: "transmission" },
      { id: "slip", label: "Şanzıman kayıyor (devir artar ama hız artmaz)", systemHint: "transmission" },
      { id: "trans_noise", label: "Şanzımandan vızıltı / gürültü", systemHint: "transmission" },
      { id: "od_light", label: "OD (Overdrive) lambası yanıp sönüyor", systemHint: "transmission" },
    ],
  },
  {
    id: "brakes",
    label: "Fren / ABS",
    symptoms: [
      { id: "abs_light", label: "ABS uyarı lambası yanıyor", systemHint: "abs" },
      { id: "vsc_light", label: "VSC / TRC uyarı lambası yanıyor", systemHint: "abs" },
      { id: "brake_vibration", label: "Fren sırasında pedal titremesi", systemHint: "abs" },
      { id: "long_brake", label: "Fren yolu uzadı / fren zayıf hissettiriyor", systemHint: "abs" },
    ],
  },
  {
    id: "lights",
    label: "Uyarı Lambaları",
    symptoms: [
      { id: "check_engine", label: "Check Engine (Arıza) lambası yanıyor", systemHint: null },
      { id: "oil_light", label: "Yağ ikaz lambası yanıyor", systemHint: "engine" },
      { id: "temp_light", label: "Sıcaklık ikaz lambası (kırmızı) yanıyor", systemHint: "cooling" },
      { id: "battery_light", label: "Akü / Şarj lambası yanıyor", systemHint: "electrical" },
      { id: "airbag_light", label: "Hava yastığı / SRS lambası yanıyor", systemHint: "electrical" },
    ],
  },
  {
    id: "noises",
    label: "Sesler",
    symptoms: [
      { id: "ticking_cold", label: "Soğuk çalışmada tık-tak sesi (motor üstü)", systemHint: "engine" },
      { id: "knocking", label: "Motor vuruntulu çalışıyor (derin gürültü)", systemHint: "engine" },
      { id: "squeal_brake", label: "Frende metal-metal gıcırdama sesi", systemHint: "abs" },
      { id: "trans_clunk", label: "Vites geçişinde 'clunk' sesi", systemHint: "transmission" },
      { id: "rattle_exhaust", label: "Alttan gelen tıkırtı (egzoz / askı)", systemHint: "engine" },
    ],
  },
  {
    id: "cooling_fuel",
    label: "Soğutma / Yakıt",
    symptoms: [
      { id: "overheating", label: "Motor aşırı ısınıyor", systemHint: "cooling" },
      { id: "no_heat", label: "Kalorifer ısıtmıyor", systemHint: "cooling" },
      { id: "temp_no_rise", label: "Motor sıcaklık göstergesi çıkmıyor", systemHint: "cooling" },
      { id: "fuel_smell", label: "Yakıt kokusu (araç içi veya dışı)", systemHint: "engine" },
      { id: "vapor_lock", label: "Sıcak havada araç çalışmıyor", systemHint: "fuel" },
    ],
  },
];

// ─── ARAÇ SİSTEMLERİ ─────────────────────────────────────────────────────────

export function buildSystems(): VehicleSystem[] {
  const counts: Record<string, { total: number; critical: number }> = {};

  for (const dtc of dtcCodes) {
    if (!counts[dtc.system]) counts[dtc.system] = { total: 0, critical: 0 };
    counts[dtc.system].total++;
    if (dtc.severity === "critical") counts[dtc.system].critical++;
  }

  const systems = [
    { id: "engine", label: "Motor", icon: "engine", description: "2JZ-GE 3.0L motor, VVT-i, yakıt sistemi ve egzoz" },
    { id: "transmission", label: "Şanzıman", icon: "gear", description: "Otomatik vites kutusu (A650E) ve tork konvertörü" },
    { id: "abs", label: "ABS / Fren", icon: "brake", description: "ABS, VSC ve TRC güvenlik sistemleri" },
    { id: "electrical", label: "Elektrik / Gövde", icon: "zap", description: "CAN veriyolu, SRS ve elektrik sistemleri" },
    { id: "cooling", label: "Soğutma", icon: "thermometer", description: "Soğutma sistemi, termostat ve radyatör" },
    { id: "fuel", label: "Yakıt Sistemi", icon: "droplet", description: "Yakıt pompası, filtre ve enjektörler" },
    { id: "steering", label: "Direksiyon", icon: "steering", description: "EPS ve VSC direksiyon sistemleri" },
    { id: "ac", label: "Klima / İklimlendirme", icon: "wind", description: "Otomatik iklim kontrol sistemi" },
  ];

  return systems.map((s) => ({
    ...s,
    codeCount: counts[s.id]?.total ?? 0,
    criticalCount: counts[s.id]?.critical ?? 0,
  }));
}

// ─── SEMPTOM TABANLI TEŞHİS ───────────────────────────────────────────────────

const symptomToCodeMap: Record<string, string[]> = {
  rough_idle: ["P0300", "P0301", "P0302", "P0303", "P0304", "P0305", "P0306", "P0505", "P0171", "P0174"],
  hard_start: ["P0300", "P0087", "P0016", "P0521"],
  stall: ["P0505", "P0171", "P0174", "P0087"],
  misfire_feel: ["P0300", "P0301", "P0302", "P0303", "P0304", "P0305", "P0306"],
  high_idle: ["P0505"],
  low_idle: ["P0505", "P0171", "P0174"],
  cold_rough: ["P1349", "P0016", "P0300"],
  power_loss: ["P0300", "P0171", "P0174", "P1349", "P0087", "P0101"],
  hesitation: ["P0101", "P0171", "P0174", "P0087"],
  no_boost: ["P0087", "P0300"],
  fuel_increase: ["P0171", "P0174", "P0300", "P0128", "P0115"],
  hard_shift: ["P0741", "P0750", "P0755", "P0760"],
  no_shift: ["P0750", "P0755", "P0760"],
  stuck_gear: ["P0741", "P0750"],
  slip: ["P0741"],
  trans_noise: ["P0741", "P0750"],
  od_light: ["P0741", "P0750", "P0755", "P0760"],
  abs_light: ["C0200", "C0205", "C0210", "C0215", "U0121"],
  vsc_light: ["C0200", "C0205", "C0210", "C0215", "C1511", "U0121"],
  brake_vibration: ["C0200", "C0205", "C0210", "C0215"],
  long_brake: ["C0200", "C0205", "C0210", "C0215"],
  check_engine: ["P0300", "P0420", "P0440", "P0171", "P0174", "P1349"],
  oil_light: ["P0521"],
  temp_light: ["P0480"],
  battery_light: ["U0100"],
  airbag_light: ["B1410"],
  ticking_cold: ["P1349", "P0016"],
  knocking: ["P0300", "P0521", "P0087"],
  squeal_brake: ["C0200", "C0205", "C0210", "C0215"],
  trans_clunk: ["P0741", "P0750"],
  rattle_exhaust: ["P0420", "P0430"],
  overheating: ["P0480", "P0128"],
  no_heat: ["P0128", "P0115"],
  temp_no_rise: ["P0128", "P0115"],
  fuel_smell: ["P0440", "P0441", "P0446"],
  vapor_lock: ["P0087"],
};

export function diagnoseBySymptoms(symptoms: string[], system?: string | null): { dtcCode: DtcCode; score: number; matchedSymptoms: string[] }[] {
  const scoreMap: Record<string, { score: number; matched: string[] }> = {};

  for (const symptomId of symptoms) {
    const codes = symptomToCodeMap[symptomId] ?? [];
    for (const code of codes) {
      if (!scoreMap[code]) scoreMap[code] = { score: 0, matched: [] };
      scoreMap[code].score += 1;
      scoreMap[code].matched.push(symptomId);
    }
  }

  let results = Object.entries(scoreMap)
    .map(([code, { score, matched }]) => {
      const dtcCode = dtcCodes.find((d) => d.code === code);
      if (!dtcCode) return null;
      if (system && dtcCode.system !== system) return null;
      const percentage = Math.round((score / symptoms.length) * 100);
      return { dtcCode, score: Math.min(percentage, 100), matchedSymptoms: matched };
    })
    .filter(Boolean) as { dtcCode: DtcCode; score: number; matchedSymptoms: string[] }[];

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8);
}
