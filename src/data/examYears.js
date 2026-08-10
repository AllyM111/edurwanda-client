const currentYear = new Date().getFullYear();

const examYears = [];

for (let year = currentYear; year >= 2020; year--) {
  examYears.push(year);
}

export default examYears;