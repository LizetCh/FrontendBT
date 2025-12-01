import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const ReviewsList = ({ reviews }) => {
  return (
    <FlatList
      data={reviews.reverse()}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default ReviewsList;