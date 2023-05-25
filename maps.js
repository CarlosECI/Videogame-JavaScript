const emojis = {
    "-": " ",
    O: "🚪",
    X: "💣",
    I: "🎁",
    PLAYER: "💀",
    BOMB_COLLISION: "🔥",
    GAME_OVER: "👎",
    WIN: "🏆",
    HEART: "❤️"
};
const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O--XX----X
  XX-XX-XX-X
  XX----XX-X
  XX-XXXXXXX
  ---X-----X
  -XXX-XXX-X
  -----XXX-X
  XX-XXIXX-X
  XXXX-----X
  XXXXXXXXXX
`);
maps.push(`
  X-----XXXX
  X-XXX---XX
  X----XX---
  XXXX--XXX-
  ---XX-XXI-
  -XX---XXXX
  -XX-XXX---
  ----XO--X-
  XXX-XXXXX-
  XXX-------
`);
maps.push(`
  XXXXXX---X
  XXXX---X-X
  XXXX-XX--X
  X----X--XX
  X-XXX--XOX
  --XXX----X
  -X---XXXXX
  -X-X------
  ---XXXXXX-
  XXXI------
`);
maps.push(`
  X-----XXXX
  X-XXX----X
  X-XX-XXX-X
  X----X---X
  X-X-X--XXX
  --X-XX--XX
  XX--XXX--X
  IX-XXXXX--
  ---XXXXXX-
  XXXO------
`);