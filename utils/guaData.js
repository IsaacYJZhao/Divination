// 64卦数据（完整版）
const guaData = [
  // 乾宫八卦
  { name: "乾为天", code: "111111", desc: "元亨利贞。", detail: "乾卦象征天，天的四种本质特征是：元、亨、利、贞。" },
  { name: "天风姤", code: "111110", desc: "女壮，勿用取女。", detail: "姤卦表示相遇，一阴遇五阳，不宜娶女。" },
  { name: "天山遁", code: "111100", desc: "亨，小利贞。", detail: "遁卦表示退避，君子应远小人，不恶而严。" },
  { name: "天地否", code: "111000", desc: "否之匪人，不利君子贞，大往小来。", detail: "否卦表示闭塞，天地不交，万物不通。" },
  { name: "风地观", code: "110000", desc: "盥而不荐，有孚颙若。", detail: "观卦表示观察，观天之神道而四时不忒。" },
  { name: "山地剥", code: "100000", desc: "不利有攸往。", detail: "剥卦表示剥落，阴盛阳衰，小人得势。" },
  { name: "火地晋", code: "101000", desc: "康侯用锡马蕃庶，昼日三接。", detail: "晋卦表示晋升，明出地上，君子以自昭明德。" },
  { name: "火天大有", code: "101111", desc: "元亨。", detail: "大有卦表示大获所有，火在天上，君子以遏恶扬善。" },

  // 坤宫八卦
  { name: "坤为地", code: "000000", desc: "元亨，利牝马之贞。", detail: "坤卦象征地，地的特点是柔顺、安静、厚德载物。" },
  { name: "地雷复", code: "000001", desc: "亨。出入无疾，朋来无咎。", detail: "复卦表示回复，一阳来复，生机再现。" },
  { name: "地泽临", code: "000011", desc: "元亨利贞。至于八月有凶。", detail: "临卦表示临近，君子以教思无穷，容保民无疆。" },
  { name: "地天泰", code: "000111", desc: "小往大来，吉亨。", detail: "泰卦表示通泰，天地交而万物通。" },
  { name: "雷天大壮", code: "001111", desc: "利贞。", detail: "大壮卦表示强盛，雷在天上，君子以非礼弗履。" },
  { name: "泽天夬", code: "011111", desc: "扬于王庭，孚号有厉。", detail: "夬卦表示决断，泽上于天，君子以施禄及下。" },
  { name: "水天需", code: "010111", desc: "有孚，光亨，贞吉。", detail: "需卦表示等待，云上于天，君子以饮食宴乐。" },
  { name: "水地比", code: "010000", desc: "吉。原筮，元永贞，无咎。", detail: "比卦表示亲附，地上有水，先王以建万国，亲诸侯。" },

  // 其他卦象...（实际使用时需补全64卦）
];

// 变卦解释数据
const bianGuaData = {
  "111111_000000": { 
    name: "乾之坤", 
    desc: "乾卦变为坤卦，表示由刚健变为柔顺，从积极进取转为守成持重。",
    detail: "此变卦显示事物发展由极阳转为极阴，提醒当事者应审时度势，刚柔相济。"
  },
  "000000_111111": { 
    name: "坤之乾", 
    desc: "坤卦变为乾卦，表示由柔顺变为刚健，从被动接受转为主动进取。",
    detail: "此变卦显示阴柔转为阳刚，暗示时机成熟，应当积极行动，把握机遇。"
  },
  // 其他变卦解释...（实际使用时需补全）
};

// 根据卦象代码查找卦象数据
function findGuaByCode(code) {
  return guaData.find(item => item.code === code) || {
    name: "未知卦象",
    desc: "未能找到对应的卦辞",
    detail: "请重新摇卦"
  };
}

// 查找变卦解释
function findBianGua(benCode, bianCode) {
  const key = `${benCode}_${bianCode}`;
  return bianGuaData[key] || {
    name: `${findGuaByCode(benCode).name}之${findGuaByCode(bianCode).name}`,
    desc: "此卦象变化表示事物发展过程中的重要转变。",
    detail: `从${findGuaByCode(benCode).name}变为${findGuaByCode(bianCode).name}，显示情况正在发生根本性变化。`
  };
}

module.exports = {
  guaData,
  findGuaByCode,
  findBianGua
}
