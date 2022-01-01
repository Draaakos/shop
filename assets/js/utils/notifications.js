const notify = (message) => {
  alert(message);
};

const askForConfirm = (message) => {
  return confirm(message);
};

export { notify, askForConfirm };
