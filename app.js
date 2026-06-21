const STORAGE_KEY = "trainsnap.station";

const stationInput = document.getElementById("stationInput");
const lineInput = document.getElementById("lineInput");
const saveButton = document.getElementById("saveButton");
const setupPanel = document.getElementById("setupPanel");
const resultPanel = document.getElementById("resultPanel");
const stationName = document.getElementById("stationName");
const lineName = document.getElementById("lineName");
const nextTime = document.getElementById("nextTime");
const destination = document.getElementById("destination");
const delayBadge = document.getElementById("delayBadge");
const metaInfo = document.getElementById("metaInfo");
const upcomingList = document.getElementById("upcomingList");
const editButton = document.getElementById("editButton");
const refreshButton = document.getElementById("refreshButton");

const MORNING_END_MINUTES = 12 * 60;

const timetable = [
  { time: "05:00", type: "準", destination: "なんば(南海線)" },
  { time: "05:10", type: "中", destination: "中百舌鳥" },
  { time: "05:20", type: "準", destination: "なんば(南海線)" },
  { time: "05:32", type: "中", destination: "中百舌鳥" },
  { time: "05:43", type: "中", destination: "中百舌鳥" },
  { time: "05:54", type: "泉特", destination: "なんば(南海線)" },
  { time: "06:05", type: "準", destination: "中百舌鳥" },
  { time: "06:10", type: "中", destination: "中百舌鳥" },
  { time: "06:17", type: "中", destination: "中百舌鳥" },
  { time: "06:23", type: "準", destination: "中百舌鳥" },
  { time: "06:31", type: "中", destination: "中百舌鳥" },
  { time: "06:33", type: "泉特", destination: "なんば(南海線)" },
  { time: "06:43", type: "準", destination: "中百舌鳥" },
  { time: "06:46", type: "中", destination: "中百舌鳥" },
  { time: "06:50", type: "中", destination: "中百舌鳥" },
  { time: "06:57", type: "準", destination: "中百舌鳥" },
  { time: "07:02", type: "中", destination: "中百舌鳥" },
  { time: "07:10", type: "準", destination: "中百舌鳥" },
  { time: "07:16", type: "中", destination: "中百舌鳥" },
  { time: "07:23", type: "準", destination: "中百舌鳥" },
  { time: "07:33", type: "泉特", destination: "なんば(南海線)" },
  { time: "07:43", type: "準", destination: "中百舌鳥" },
  { time: "07:46", type: "中", destination: "中百舌鳥" },
  { time: "07:50", type: "中", destination: "中百舌鳥" },
  { time: "07:57", type: "準", destination: "中百舌鳥" },
  { time: "08:02", type: "中", destination: "中百舌鳥" },
  { time: "08:11", type: "準", destination: "中百舌鳥" },
  { time: "08:23", type: "準", destination: "中百舌鳥" },
  { time: "08:33", type: "泉特", destination: "なんば(南海線)" },
  { time: "08:43", type: "準", destination: "中百舌鳥" },
  { time: "08:50", type: "中", destination: "中百舌鳥" },
  { time: "08:58", type: "準", destination: "中百舌鳥" },
  { time: "09:10", type: "準", destination: "中百舌鳥" },
  { time: "09:15", type: "中", destination: "中百舌鳥" },
  { time: "09:24", type: "準", destination: "中百舌鳥" },
  { time: "09:33", type: "中", destination: "中百舌鳥" },
  { time: "09:43", type: "準", destination: "中百舌鳥" },
  { time: "09:47", type: "中", destination: "中百舌鳥" },
  { time: "09:54", type: "中", destination: "中百舌鳥" },
  { time: "10:01", type: "区", destination: "中百舌鳥" },
  { time: "10:10", type: "準", destination: "中百舌鳥" },
  { time: "10:20", type: "中", destination: "中百舌鳥" },
  { time: "10:26", type: "区", destination: "中百舌鳥" },
  { time: "10:33", type: "中", destination: "中百舌鳥" },
  { time: "10:41", type: "区", destination: "中百舌鳥" },
  { time: "10:45", type: "中", destination: "中百舌鳥" },
  { time: "10:52", type: "準", destination: "中百舌鳥" },
  { time: "10:58", type: "中", destination: "中百舌鳥" },
  { time: "11:07", type: "区", destination: "中百舌鳥" },
  { time: "11:14", type: "中", destination: "中百舌鳥" },
  { time: "11:22", type: "区", destination: "中百舌鳥" },
  { time: "11:27", type: "準", destination: "中百舌鳥" },
  { time: "11:37", type: "中", destination: "中百舌鳥" },
  { time: "11:44", type: "区", destination: "中百舌鳥" },
  { time: "11:52", type: "準", destination: "中百舌鳥" },
  { time: "11:57", type: "準", destination: "中百舌鳥" },
  { time: "12:07", type: "区", destination: "中百舌鳥" },
  { time: "12:14", type: "中", destination: "中百舌鳥" },
  { time: "12:22", type: "区", destination: "中百舌鳥" },
  { time: "12:27", type: "準", destination: "中百舌鳥" },
  { time: "12:37", type: "中", destination: "中百舌鳥" },
  { time: "12:44", type: "区", destination: "中百舌鳥" },
  { time: "12:52", type: "準", destination: "中百舌鳥" },
  { time: "12:57", type: "準", destination: "中百舌鳥" },
  { time: "13:07", type: "区", destination: "中百舌鳥" },
  { time: "13:14", type: "中", destination: "中百舌鳥" },
  { time: "13:22", type: "区", destination: "中百舌鳥" },
  { time: "13:27", type: "準", destination: "中百舌鳥" },
  { time: "13:37", type: "中", destination: "中百舌鳥" },
  { time: "13:44", type: "区", destination: "中百舌鳥" },
  { time: "13:52", type: "準", destination: "中百舌鳥" },
  { time: "13:57", type: "準", destination: "中百舌鳥" },
  { time: "14:07", type: "区", destination: "中百舌鳥" },
  { time: "14:14", type: "中", destination: "中百舌鳥" },
  { time: "14:22", type: "区", destination: "中百舌鳥" },
  { time: "14:27", type: "準", destination: "中百舌鳥" },
  { time: "14:37", type: "中", destination: "中百舌鳥" },
  { time: "14:44", type: "区", destination: "中百舌鳥" },
  { time: "14:52", type: "準", destination: "中百舌鳥" },
  { time: "14:57", type: "準", destination: "中百舌鳥" },
  { time: "15:07", type: "区", destination: "中百舌鳥" },
  { time: "15:14", type: "中", destination: "中百舌鳥" },
  { time: "15:21", type: "中", destination: "中百舌鳥" },
  { time: "15:27", type: "準", destination: "中百舌鳥" },
  { time: "15:36", type: "中", destination: "中百舌鳥" },
  { time: "15:41", type: "区", destination: "中百舌鳥" },
  { time: "15:46", type: "中", destination: "中百舌鳥" },
  { time: "15:50", type: "準", destination: "中百舌鳥" },
  { time: "15:58", type: "中", destination: "中百舌鳥" },
  { time: "16:10", type: "準", destination: "中百舌鳥" },
  { time: "16:20", type: "区", destination: "中百舌鳥" },
  { time: "16:25", type: "準", destination: "中百舌鳥" },
  { time: "16:33", type: "中", destination: "中百舌鳥" },
  { time: "16:37", type: "準", destination: "中百舌鳥" },
  { time: "16:45", type: "準", destination: "中百舌鳥" },
  { time: "16:56", type: "準", destination: "中百舌鳥" },
  { time: "17:02", type: "泉特", destination: "なんば(南海線)" },
  { time: "17:10", type: "準", destination: "中百舌鳥" },
  { time: "17:18", type: "中", destination: "中百舌鳥" },
  { time: "17:24", type: "準", destination: "中百舌鳥" },
  { time: "17:35", type: "準", destination: "中百舌鳥" },
  { time: "17:45", type: "準", destination: "中百舌鳥" },
  { time: "17:57", type: "泉特", destination: "なんば(南海線)" },
  { time: "18:06", type: "準", destination: "中百舌鳥" },
  { time: "18:09", type: "準", destination: "中百舌鳥" },
  { time: "18:23", type: "準", destination: "中百舌鳥" },
  { time: "18:35", type: "泉特", destination: "なんば(南海線)" },
  { time: "18:40", type: "準", destination: "中百舌鳥" },
  { time: "18:47", type: "準", destination: "中百舌鳥" },
  { time: "18:59", type: "準", destination: "中百舌鳥" },
  { time: "19:10", type: "準", destination: "中百舌鳥" },
  { time: "19:14", type: "中", destination: "中百舌鳥" },
  { time: "19:24", type: "準", destination: "中百舌鳥" },
  { time: "19:34", type: "準", destination: "中百舌鳥" },
  { time: "19:39", type: "泉特", destination: "なんば(南海線)" },
  { time: "19:46", type: "準", destination: "中百舌鳥" },
  { time: "19:59", type: "準", destination: "中百舌鳥" },
  { time: "20:07", type: "泉特", destination: "なんば(南海線)" },
  { time: "20:10", type: "準", destination: "中百舌鳥" },
  { time: "20:24", type: "準", destination: "中百舌鳥" },
  { time: "20:33", type: "中", destination: "中百舌鳥" },
  { time: "20:35", type: "泉特", destination: "なんば(南海線)" },
  { time: "20:47", type: "準", destination: "中百舌鳥" },
  { time: "20:57", type: "準", destination: "中百舌鳥" },
  { time: "21:03", type: "泉特", destination: "なんば(南海線)" },
  { time: "21:10", type: "準", destination: "中百舌鳥" },
  { time: "21:25", type: "準", destination: "中百舌鳥" },
  { time: "21:33", type: "中", destination: "中百舌鳥" },
  { time: "21:38", type: "泉特", destination: "なんば(南海線)" },
  { time: "21:50", type: "準", destination: "中百舌鳥" },
  { time: "22:01", type: "中", destination: "中百舌鳥" },
  { time: "22:10", type: "準", destination: "中百舌鳥" },
  { time: "22:17", type: "中", destination: "中百舌鳥" },
  { time: "22:34", type: "準", destination: "中百舌鳥" },
  { time: "22:47", type: "中", destination: "中百舌鳥" },
  { time: "23:05", type: "準", destination: "中百舌鳥" },
  { time: "23:13", type: "中", destination: "中百舌鳥" },
  { time: "23:21", type: "中", destination: "中百舌鳥" },
  { time: "23:37", type: "中", destination: "中百舌鳥" }
];

function getLineLabel(type) {
  switch (type) {
    case "泉特":
      return "泉北ライナー";
    case "区":
      return "区間急行";
    case "準":
      return "準急";
    default:
      return "普通";
  }
}

function isWeekdayMorning(date = new Date()) {
  const day = date.getDay();
  const minutes = date.getHours() * 60 + date.getMinutes();
  return day >= 1 && day <= 5 && minutes < MORNING_END_MINUTES;
}

function getMorningTimetable() {
  return timetable.filter((item) => {
    const [hours] = item.time.split(":").map(Number);
    return hours * 60 < MORNING_END_MINUTES;
  });
}

function getStoredStation() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function setStoredStation(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNowString() {
  const now = new Date();
  return now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

function findNextTrain() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const morningTimetable = getMorningTimetable();

  const nextIndex = morningTimetable.findIndex((item) => {
    const [hours, minutes] = item.time.split(":").map(Number);
    return hours * 60 + minutes >= currentMinutes;
  });

  const index = nextIndex === -1 ? 0 : nextIndex;
  return morningTimetable.slice(index, index + 3);
}

function render(station) {
  const morningOnly = isWeekdayMorning();
  const upcoming = morningOnly ? findNextTrain() : [];
  const first = upcoming[0] ?? null;

  stationName.textContent = station.station;
  lineName.textContent = station.line ? station.line : "路線未入力";
  nextTime.textContent = first ? first.time : "--:--";
  destination.textContent = first ? `行き先: ${first.destination}` : "平日の朝だけ対応しています";
  delayBadge.textContent = morningOnly ? "平日朝" : "対象外";
  delayBadge.classList.toggle("is-delay", morningOnly);
  metaInfo.textContent = morningOnly
    ? `最終更新: ${getNowString()} / ${station.station}発の表示`
    : "このサイトは平日の朝だけ表示します。平日の朝に開くと次の電車が出ます。";

  upcomingList.innerHTML = upcoming
    .map((item) => {
      const label = getLineLabel(item.type);
      return `
        <li class="train-item">
          <div>
            <div class="time">${item.time}</div>
            <p class="line">${label} ・ ${item.destination}</p>
          </div>
          <p class="note">${item.type}</p>
        </li>
      `;
    })
    .join("");

  if (!morningOnly) {
    upcomingList.innerHTML = `
      <li class="train-item">
        <div>
          <div class="time">平日朝だけ</div>
          <p class="line">和泉中央駅 / 南海泉北線</p>
        </div>
        <p class="note">対象外</p>
      </li>
    `;
  }

  setupPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
}

function openSetup() {
  setupPanel.classList.remove("hidden");
  resultPanel.classList.add("hidden");
  stationInput.focus();
}

function saveStation() {
  const station = stationInput.value.trim();
  const line = lineInput.value.trim();

  if (!station) {
    stationInput.focus();
    stationInput.setAttribute("aria-invalid", "true");
    return;
  }

  stationInput.removeAttribute("aria-invalid");
  setStoredStation({ station, line });
  render({ station, line });
}

saveButton.addEventListener("click", saveStation);
editButton.addEventListener("click", openSetup);
refreshButton.addEventListener("click", () => {
  const stored = getStoredStation();
  if (stored) {
    render(stored);
  }
});

stationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveStation();
  }
});

lineInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveStation();
  }
});

const stored = getStoredStation();
if (stored?.station) {
  stationInput.value = stored.station;
  lineInput.value = stored.line || "";
  render(stored);
} else {
  stationInput.value = "和泉中央";
  lineInput.value = "南海泉北線";
  openSetup();
}
