const stylesheets = [
  'css-js/reset.css',
  'css-js/header.css',
  'css-js/start-end-time.css',

  'css-js/main.css',
  'css-js/prayer-times-day.css',
  'css-js/list-sites.css',
  'css-js/calendar-ru.css',

  'css-js/footer.css',
  'css-js/razn.css',
];


stylesheets.forEach((stylesheet) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylesheet;
  document.head.appendChild(link);
});