let poll = null;

export function createPoll(question, options) {
  poll = {
    question,
    options: options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {}),
    isopen: true,
  };
  return poll;
}

export function vote(option) {
  if (poll.options[option] !== undefined) {
    poll.options[option]++;
  }
}

export function getPollResults() {
  return {
    question: poll.question,
    results: poll.options,
  };
}
