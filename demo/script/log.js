let oldLog = console.log;
let newLog = (...s) => {
  let log = document.createElement('pre');
  log.innerHTML = s.join(" ");
  document.body.appendChild(log)
  oldLog(...s);
};
console.log = newLog;