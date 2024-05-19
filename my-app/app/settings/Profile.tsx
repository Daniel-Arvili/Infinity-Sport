"use client";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useState } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zoom } from "react-awesome-reveal";
import { UpdateUserDetails } from "../ServerAction/ServerAction";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ProfileProps {
  session: Session;
}
const Profile: React.FC<ProfileProps> = ({ session }) => {
  const [name, setName] = useState<string | null>(session.user.name);
  const [ErrorName, setErrorName] = useState<boolean>(false);
  const [uploadSuccessful, setuploadSuccessful] = useState<boolean>(false);
  const [EditImage, setEditImage] = useState<boolean>(false);
  const [ErrorImage, setErrorImage] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    session.user.image
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      setImagePreviewUrl(e.target.value);
      setErrorImage(false);
    } else if (e.target.name === "name") {
      setName(e.target.value);
      setErrorName(false);
    }
  };

  const handleEditImage = () => {
    setEditImage(!EditImage);
  };

  const validURL = (str: string) => {
    return /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3})(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
      str.trim()
    );
  };

  const handleSaveChanges = async () => {
    let valid = true;
    let updateNeeded = false;
    if (!name) {
      setErrorName(true);
      valid = false;
    }
    if (!imagePreviewUrl || !validURL(imagePreviewUrl)) {
      setErrorImage(true);
      valid = false;
    }
    const nameChanged = name !== session.user.name;
    const imageChanged = imagePreviewUrl !== session.user.image;
    updateNeeded = nameChanged || imageChanged;

    if (valid && updateNeeded) {
      await UpdateUserDetails(
        nameChanged ? name : null,
        imageChanged ? imagePreviewUrl : null
      );
      setuploadSuccessful(true);
      await signOut();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {session.user.image && !EditImage ? (
          <>
            <div className="flex flex-col items-center justify-center w-full py-4">
              <h1 className="text-center text-xl sm:text-2xl">Profile</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <>
                <div className="flex-shrink-0 relative">
                  <Image
                    src={imagePreviewUrl || session.user.image}
                    height={100}
                    width={100}
                    alt={`${session.user.name}'s picture`}
                    className="rounded-full border border-black dark:border-gray-600 shadow-lg dark:shadow-gray-700"
                  />
                  <div className="absolute bottom-0 right-0 text-white bg-gray-500 opacity-85 dark:opacity-75 rounded-full p-1 cursor-pointer">
                    <PencilIcon
                      className="h-6 w-6 text-white"
                      onClick={handleEditImage}
                    />
                  </div>
                </div>
              </>
            </div>
            <div className="text-center text-naivyBlue dark:text-glowGreen">
              {session.user.name}
            </div>
          </>
        ) : (
          <Zoom>
            <div className="flex flex-col w-full sm:w-4/5 mx-auto">
              <div className="flex justify-between pb-2">
                <div className="text-base sm:text-xl text-naivyBlue dark:text-glowGreen">
                  Edit Profile{" "}
                </div>
                <XMarkIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleEditImage}
                />
              </div>
              <Label className="text-base text-naivyBlue dark:text-glowGreen">
                Image Url
              </Label>
              <Input
                id="image"
                type="text"
                name="image"
                value={imagePreviewUrl || ""}
                onChange={handleChange}
              />
              {ErrorImage ? (
                <p className="text-sm text-red-600">Insert currect image URL</p>
              ) : null}
              <Label className="text-base text-naivyBlue dark:text-glowGreen">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={name || ""}
                onChange={handleChange}
              />
              {ErrorName ? (
                <p className="text-sm text-red-600">Insert currect name</p>
              ) : null}
              <div className="flex flex-col items-center justify-center mt-8 text-naivyBlue dark:text-glowGreen">
                <Button variant={"outline"} onClick={() => handleSaveChanges()}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Zoom>
        )}
      </div>
    </>
  );
};
export default Profile;
