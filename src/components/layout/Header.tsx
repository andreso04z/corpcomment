import { useFeedbackItemsContext } from "../../lib/hooks";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";
import FeedbackForm from "../feedback/FeedbackForm";

export default function Header() {
  const { handleAddToList } = useFeedbackItemsContext();

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  );
}
