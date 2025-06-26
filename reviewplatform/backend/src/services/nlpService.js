import Sentiment from "sentiment";
const sentiment = new Sentiment();
export const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  return result.score;
};