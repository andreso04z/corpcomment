import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 593,
    badgeLetter: "B",
    companyName: "ByteGrad",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    daysAgo: 4,
  },
  {
    upvoteCount: 123,
    badgeLetter: "A",
    companyName: "TechCorp",
    text: `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    daysAgo: 2,
  },
  {
    upvoteCount: 45,
    badgeLetter: "C",
    companyName: "InnoSoft",
    text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    daysAgo: 7,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => {
        return <FeedbackItem feedbackItem={feedbackItem} />;
      })}
    </ol>
  );
}
