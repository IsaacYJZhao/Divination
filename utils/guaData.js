// 64卦数据
const guaData = [
  {
    name: "乾为天",
    code: "111111",
    desc: "元亨利贞。",
    detail: "乾卦象征天，天的四种本质特征是：元、亨、利、贞。表示天是万物创始的伟大根源，通行无阻，祥和有益，无所不正。"
  },
  {
    name: "坤为地",
    code: "000000",
    desc: "元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞，吉。",
    detail: "坤卦象征地，地的特点是柔顺、安静、厚德载物。坤卦表示应当像母马那样柔顺、安静、厚德载物。"
  },
  // 其他62卦数据...
  {
    name: "水火既济",
    code: "101010",
    desc: "亨小，利贞。初吉终乱。",
    detail: "既济卦象征成功，表示事情已经完成。但成功之后容易松懈，导致混乱，所以要保持警惕。"
  },
  {
    name: "火水未济",
    code: "010101",
    desc: "亨。小狐汔济，濡其尾，无攸利。",
    detail: "未济卦象征未完成，表示事情还没有完成。需要继续努力，不能半途而废。"
  }
];

// 根据卦象代码查找卦象数据
function findGuaByCode(code) {
  return guaData.find(item => item.code === code) || {
    name: "未知卦象",
    desc: "未能找到对应的卦辞",
    detail: "请重新摇卦"
  };
}

module.exports = {
  guaData,
  findGuaByCode
}
