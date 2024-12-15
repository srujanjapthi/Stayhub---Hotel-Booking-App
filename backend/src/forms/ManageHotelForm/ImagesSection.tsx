import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import ConfirmDialogTrigger from "../../components/confirm-dialog/ConfirmDialogTrigger";
import { DialogContextProvider } from "../../contexts/DialogContext";
import ConfirmDeleteDialog from "../../components/confirm-dialog/ConfirmDeleteDialog";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (imageUrl: string) => {
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Images</h2>
      <p className="text-sm font-normal text-gray-500 mb-3">
        Choose upto 6 Images
      </p>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingImageUrls.map((currUrl, index) => (
              <div
                key={index}
                className="relative group rounded-md overflow-hidden"
              >
                <img
                  className="h-full w-full object-cover"
                  src={currUrl}
                  alt=""
                />
                <DialogContextProvider>
                  <ConfirmDialogTrigger className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Delete
                  </ConfirmDialogTrigger>
                  <ConfirmDeleteDialog
                    header={`Delete image`}
                    content="Are you sure you want to delete this image?"
                    note="This won't delete the image permanently. Hit save to delete permanently"
                    onAccept={() => handleDelete(currUrl)}
                    onReject={() => {}}
                  />
                </DialogContextProvider>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalFiles =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalFiles == 0) {
                return "At lease one image should be added";
              }

              if (totalFiles > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-semibold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
