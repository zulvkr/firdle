export const COMMA = '\u060C'
export const SEMICOLON = '\u061B'
export const QUESTION = '\u061F'
export const HAMZA = '\u0621'
export const ALEF_MADDA = '\u0622'
export const ALEF_HAMZA_ABOVE = '\u0623'
export const WAW_HAMZA = '\u0624'
export const ALEF_HAMZA_BELOW = '\u0625'
export const YEH_HAMZA = '\u0626'
export const ALEF = '\u0627'
export const BEH = '\u0628'
export const TEH_MARBUTA = '\u0629'
export const TEH = '\u062a'
export const THEH = '\u062b'
export const JEEM = '\u062c'
export const HAH = '\u062d'
export const KHAH = '\u062e'
export const DAL = '\u062f'
export const THAL = '\u0630'
export const REH = '\u0631'
export const ZAIN = '\u0632'
export const SEEN = '\u0633'
export const SHEEN = '\u0634'
export const SAD = '\u0635'
export const DAD = '\u0636'
export const TAH = '\u0637'
export const ZAH = '\u0638'
export const AIN = '\u0639'
export const GHAIN = '\u063a'
export const TATWEEL = '\u0640'
export const FEH = '\u0641'
export const QAF = '\u0642'
export const KAF = '\u0643'
export const LAM = '\u0644'
export const MEEM = '\u0645'
export const NOON = '\u0646'
export const HEH = '\u0647'
export const WAW = '\u0648'
export const ALEF_MAKSURA = '\u0649'
export const YEH = '\u064a'
export const MADDA_ABOVE = '\u0653'
export const HAMZA_ABOVE = '\u0654'
export const HAMZA_BELOW = '\u0655'

// Diacritics
export const FATHATAN = '\u064b'
export const DAMMATAN = '\u064c'
export const KASRATAN = '\u064d'
export const FATHA = '\u064e'
export const DAMMA = '\u064f'
export const KASRA = '\u0650'
export const SHADDA = '\u0651'
export const SUKUN = '\u0652'

// Multiletters
export const LAM_ALEF = '\ufefb'
export const LAM_ALEF_HAMZA_ABOVE = '\ufef7'
export const LAM_ALEF_HAMZA_BELOW = '\ufef9'
export const LAM_ALEF_MADDA_ABOVE = '\ufef5'
export const SIMPLE_LAM_ALEF = LAM + ALEF
export const SIMPLE_LAM_ALEF_HAMZA_ABOVE = LAM + HAMZA_ABOVE
export const SIMPLE_LAM_ALEF_HAMZA_BELOW = LAM + HAMZA_BELOW
export const SIMPLE_LAM_ALEF_MADDA_ABOVE = LAM + ALEF_MADDA
export const SIMPLE_ALEF_MADDA = HAMZA + ALEF

// Groups
export const LETTERS = [
  ALEF,
  BEH,
  TEH,
  TEH_MARBUTA,
  THEH,
  JEEM,
  HAH,
  KHAH,
  DAL,
  THAL,
  REH,
  ZAIN,
  SEEN,
  SHEEN,
  SAD,
  DAD,
  TAH,
  ZAH,
  AIN,
  GHAIN,
  FEH,
  QAF,
  KAF,
  LAM,
  MEEM,
  NOON,
  HEH,
  WAW,
  ALEF_MAKSURA,
  YEH,
  HAMZA,
  ALEF_HAMZA_ABOVE,
  WAW_HAMZA,
  ALEF_HAMZA_BELOW,
  YEH_HAMZA
]

export const MULTILETTERS = [
  LAM_ALEF,
  LAM_ALEF_HAMZA_ABOVE,
  LAM_ALEF_HAMZA_BELOW,
  LAM_ALEF_MADDA_ABOVE,
  ALEF_MADDA
]
export const SHORTHARAKAT = [FATHA, DAMMA, KASRA, SUKUN]
export const TANWIN = [FATHATAN, DAMMATAN, KASRATAN]
export const HARAKAT = [...SHORTHARAKAT, ...TANWIN]
export const TASHKEEL = [...HARAKAT, SHADDA]
export const HAMZAT = [
  HAMZA,
  WAW_HAMZA,
  YEH_HAMZA,
  HAMZA_ABOVE,
  HAMZA_BELOW,
  ALEF_HAMZA_BELOW,
  ALEF_HAMZA_ABOVE
]

export const ALEFAT = [ALEF, ALEF_MAKSURA]

export const WEAK = [ALEF, WAW, YEH, ALEF_MAKSURA]
export const WEAK_CONSONANTS = [WAW, YEH]
export const STRONG = [
  BEH,
  TEH,
  TEH_MARBUTA,
  THEH,
  JEEM,
  HAH,
  KHAH,
  DAL,
  THAL,
  REH,
  ZAIN,
  SEEN,
  SHEEN,
  SAD,
  DAD,
  TAH,
  ZAH,
  AIN,
  GHAIN,
  FEH,
  QAF,
  KAF,
  LAM,
  MEEM,
  NOON,
  HEH,
  HAMZA,
  ALEF_HAMZA_ABOVE,
  WAW_HAMZA,
  ALEF_HAMZA_BELOW,
  YEH_HAMZA
]

export const CONSONANTS = [...STRONG, ...WEAK_CONSONANTS] 

export type hollowHarf = '\u0648' | '\u064A'

// export const ZERO = '\u0660'
// export const ONE = '\u0661'
// export const TWO = '\u0662'
// export const THREE = '\u0663'
// export const FOUR = '\u0664'
// export const FIVE = '\u0665'
// export const SIX = '\u0666'
// export const SEVEN = '\u0667'
// export const EIGHT = '\u0668'
// export const NINE = '\u0669'
// export const ZERO_W = '\u0030'
// export const ONE_W = '\u0031'
// export const TWO_W = '\u0032'
// export const THREE_W = '\u0033'
// export const FOUR_W = '\u0034'
// export const FIVE_W = '\u0035'
// export const SIX_W = '\u0036'
// export const SEVEN_W = '\u0037'
// export const EIGHT_W = '\u0038'
// export const NINE_W = '\u0039'
// export const ZERO_P = '\u06f0'
// export const ONE_P = '\u06f1'
// export const TWO_P = '\u06f2'
// export const THREE_P = '\u06f3'
// export const FOUR_P = '\u06f4'
// export const FIVE_P = '\u06f5'
// export const SIX_P = '\u06f6'
// export const SEVEN_P = '\u06f7'
// export const EIGHT_P = '\u06f8'
// export const NINE_P = '\u06f9'
// export const PERCENT = '\u066a'
// export const DECIMAL = '\u066b'
// export const THOUSANDS = '\u066c'
// export const STAR = '\u066d'
// export const MINI_ALEF = '\u0670'
// export const ALEF_WASLA = '\u0671'
// export const FULL_STOP = '\u06d4'
// export const BYTE_ORDER_MARK = '\ufeff'

// export const YEHLIKE = [YEH, YEH_HAMZA, ALEF_MAKSURA]
// export const WAWLIKE = [WAW, WAW_HAMZA]
// export const TEHLIKE = [TEH, TEH_MARBUTA]

// # Small Letters
// SMALL_ALEF = u"\u0670"
// SMALL_WAW = u"\u06E5"
// SMALL_YEH = u"\u06E6"

// NUMBERS_EAST = (ZERO, ONE, TWO, THREE, FOUR, FIVE,\
//                 SIX, SEVEN, EIGHT, NINE)
// NUMBERS_WEST = (ZERO_W, ONE_W, TWO_W, THREE_W, FOUR_W, FIVE_W,\
//                 SIX_W, SEVEN_W, EIGHT_W, NINE_W)
// NUMBERS_PERS = (ZERO_P, ONE_P, TWO_P, THREE_P, FOUR_P, FIVE_P,\
//                 SIX_P, SEVEN_P, EIGHT_P, NINE_P)

// NOT_DEF_HARAKA = TATWEEL

// SMALL = (SMALL_ALEF, SMALL_WAW, SMALL_YEH)

// MOON = (HAMZA, ALEF_MADDA, ALEF_HAMZA_ABOVE, ALEF_HAMZA_BELOW, ALEF, \
//         BEH, JEEM, HAH, KHAH, AIN, GHAIN, FEH, QAF, KAF, MEEM, HEH, WAW, YEH)

// SUN = (TEH, THEH, DAL, THAL, REH, ZAIN, SEEN, SHEEN, SAD, DAD \
//            , TAH, ZAH, LAM, NOON,)

// ALPHABETIC_ORDER = { \
//     ALEF: 1, BEH: 2, TEH: 3, TEH_MARBUTA: 3, THEH: 4, JEEM: 5,
//     HAH: 6, KHAH: 7, DAL: 8, THAL: 9, REH: 10, ZAIN: 11, SEEN: 12, \
//     SHEEN: 13, SAD: 14, DAD: 15, TAH: 16, ZAH: 17, AIN: 18, \
//     GHAIN: 19, FEH: 20, QAF: 21, KAF: 22, LAM: 23, MEEM: 24, \
//     NOON: 25, HEH: 26, WAW: 27, YEH: 28, HAMZA: 29, ALEF_MADDA: 29, \
//     ALEF_HAMZA_ABOVE: 29, WAW_HAMZA: 29, ALEF_HAMZA_BELOW: 29, \
//     YEH_HAMZA: 29, \
//     }

// NAMES = { \
//     ALEF: u"ألف", \
//     BEH: u"باء", \
//     TEH: u'تاء', \
//     TEH_MARBUTA: u'تاء مربوطة', \
//     THEH: u'ثاء', \
//     JEEM: u'جيم', \
//     HAH: u'حاء', \
//     KHAH: u'خاء', \
//     DAL: u'دال', \
//     THAL: u'ذال', \
//     REH: u'راء', \
//     ZAIN: u'زاي', \
//     SEEN: u'سين', \
//     SHEEN: u'شين', \
//     SAD: u'صاد', \
//     DAD: u'ضاد', \
//     TAH: u'طاء', \
//     ZAH: u'ظاء', \
//     AIN: u'عين', \
//     GHAIN: u'غين', \
//     FEH: u'فاء', \
//     QAF: u'قاف', \
//     KAF: u'كاف', \
//     LAM: u'لام', \
//     MEEM: u'ميم', \
//     NOON: u'نون', \
//     HEH: u'هاء', \
//     WAW: u'واو', \
//     YEH: u'ياء', \
//     HAMZA: u'همزة', \
//     TATWEEL: u'تطويل', \
//     ALEF_MADDA: u'ألف ممدودة', \
//     ALEF_MAKSURA: u'ألف مقصورة', \
//     ALEF_HAMZA_ABOVE: u'همزة على الألف', \
//     WAW_HAMZA: u'همزة على الواو', \
//     ALEF_HAMZA_BELOW: u'همزة تحت الألف', \
//     YEH_HAMZA: u'همزة على الياء', \
//     FATHATAN: u'فتحتان', \
//     DAMMATAN: u'ضمتان', \
//     KASRATAN: u'كسرتان', \
//     FATHA: u'فتحة', \
//     DAMMA: u'ضمة', \
//     KASRA: u'كسرة', \
//     SHADDA: u'شدة', \
//     SUKUN: u'سكون', \
//     }
// HAMZAT_STRING = u"".join(HAMZAT)
// HARAKAT_STRING = u"".join(HARAKAT)
// TASHKEEL_STRING = u"".join(TASHKEEL)
// # regular expretion

// HARAKAT_PATTERN = re.compile(u"[" + u"".join(HARAKAT) + u"]", re.UNICODE)
// # ~ """ pattern to strip Harakat"""
// LASTHARAKA_PATTERN = \
//     re.compile(u"[%s]$|[%s]" % (u"".join(HARAKAT), u''.join(TANWIN)), re.UNICODE)
// # ~ """ Pattern to strip only the last haraka """
// SHORTHARAKAT_PATTERN = re.compile(u"[" + u"".join(SHORTHARAKAT) + u"]",
//                                   re.UNICODE)
// # ~ Pattern to lookup Short Harakat(Fatha, Damma, Kasra, sukun, tanwin),
// # but not shadda
// TASHKEEL_PATTERN = re.compile(u"[" + u"".join(TASHKEEL) + u"]", re.UNICODE)
// # ~ """ Harakat and shadda pattern  """
// HAMZAT_PATTERN = re.compile(u"[" + u"".join(HAMZAT) + u"]", re.UNICODE)
// # ~ """ all hamzat pattern"""
// ALEFAT_PATTERN = re.compile(u"[" + u"".join(ALEFAT) + u"]", re.UNICODE)
// # ~ """ all alef like letters """
// LIGUATURES_PATTERN = re.compile(u"[" + u"".join(LIGUATURES) + u"]", re.UNICODE)
// # ~ """ all liguatures pattern """
// TOKEN_PATTERN = re.compile(u"([^\w\u064b-\u0652']+)", re.UNICODE)
// # ~ """ pattern to tokenize a text"""
// TOKEN_PATTERN_SPLIT = re.compile(u"([\w\u064b-\u0652']+)", re.UNICODE)
// # ~ """ pattern to tokenize a text with positions"""
// TOKEN_REPLACE = re.compile(u'\t|\r|\f|\v| ')
