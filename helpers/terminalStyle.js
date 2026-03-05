const COLORS = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  gray: "\x1b[90m",
  white: "\x1b[37m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

const BOX_COLOR = COLORS.cyan;
const TEXT_COLOR = COLORS.white;
const BOX_WIDTH = 80;

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, "");
}

function stripWide(str) {
  return stripAnsi(str).replace(/[^\x00-\x7F]/g, "");
}

function line(text = "") {
  const visible = stripWide(text);
  const padded = visible.padEnd(BOX_WIDTH - 2, " ");
  return (
    BOX_COLOR +
    "║" +
    TEXT_COLOR +
    " " +
    padded +
    " " +
    BOX_COLOR +
    "║" +
    COLORS.reset
  );
}

function box(lines = []) {
  console.log(BOX_COLOR + "╔" + "═".repeat(BOX_WIDTH) + "╗" + COLORS.reset);
  console.log(line());
  lines.forEach((entry) => console.log(line(entry)));
  console.log(line());
  console.log(BOX_COLOR + "╚" + "═".repeat(BOX_WIDTH) + "╝" + COLORS.reset);
}

function methodLabel(method) {
  return `${COLORS.magenta}${method.padEnd(6)}${COLORS.reset}`;
}

function printBootSequence() {
  console.log(`\n${COLORS.gray}⏳ Loading modules...${COLORS.reset}`);
  console.log(`${COLORS.green}✔ Express loaded${COLORS.reset}`);
  console.log(`${COLORS.green}✔ CORS configured${COLORS.reset}`);
  console.log(`${COLORS.green}✔ Database configured${COLORS.reset}`);
  console.log(
    `${COLORS.green}✔ Authentication middleware loaded${COLORS.reset}`,
  );
  console.log(`${COLORS.green}✔ Routes mounted${COLORS.reset}\n`);
}

function printRoutesHeader() {
  console.log(`\n${COLORS.blue}📋 REGISTERED ROUTES:${COLORS.reset}\n`);
}

export { box, COLORS, methodLabel, printBootSequence, printRoutesHeader };
