import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TFeedbackItem } from "../../lib/types";

type FeedbackItemContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
  filteredFeedbackItems: TFeedbackItem[];
  selectCompany: string;
  setSelectCompany: React.Dispatch<React.SetStateAction<string>>;
} | null;

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const companyList: string[] = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  const handleAddToList = async (text: string) => {
    const found = text.split(" ").find((word) => word.includes("#"));
    const companyName = found ? found.substring(1) : "";

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch {
        setErrorMessage("Something went wrong.");
      }
      setIsLoading(false);
    };
    fetchFeedback();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems: feedbackItems,
        isLoading: isLoading,
        errorMessage: errorMessage,
        companyList: companyList,
        handleAddToList: handleAddToList,
        handleSelectCompany: handleSelectCompany,
        filteredFeedbackItems: filteredFeedbackItems,
        selectCompany: selectedCompany,
        setSelectCompany: setSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
