const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1];
const months = [
  { month: 1, descMonth: 'Jan' },
  { month: 2, descMonth: 'Fev' },
  { month: 3, descMonth: 'Mar' },
  { month: 4, descMonth: 'Apr' },
  { month: 5, descMonth: 'May' },
  { month: 6, descMonth: 'Jun' },
  { month: 7, descMonth: 'Jul' },
  { month: 8, descMonth: 'Aug' },
  { month: 9, descMonth: 'Sep' },
  { month: 10, descMonth: 'Oct' },
  { month: 11, descMonth: 'Nov' },
  { month: 12, descMonth: 'Dec' },
];

const periodHelper = [];
const monthsHelper = [];

years.forEach((year) => {
  months.forEach((month) => {
    const datePeriod = `${year}-${month.month.toString().padStart(2, '0')}`;
    const dateDesc = month.descMonth;
    periodHelper.push(datePeriod);
    monthsHelper.push({ period: datePeriod, desc: dateDesc, year: year });
  });
});

export { periodHelper, monthsHelper };
