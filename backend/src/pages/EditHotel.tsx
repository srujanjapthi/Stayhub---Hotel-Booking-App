import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const queryClient = useQueryClient();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    { enabled: !!hotelId },
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({
        message: "Hotel Saved!",
        type: "SUCCESS",
      });
      queryClient.invalidateQueries("fetchMyHotelById");
    },
    onError: () => {
      showToast({
        message: "Error Saving Hotel",
        description: "Something went wrong. Please try again",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
