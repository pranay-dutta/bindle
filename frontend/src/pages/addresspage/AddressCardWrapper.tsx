import { useState } from "react";
import AddressForm, { type AddressFormData } from "./AddressForm";
import AddressCard from "./AddressCard";

const AddressCardWrapper = ({ address }: { address: AddressFormData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onCancel = () => {
    setIsEditing(false);
  };
  const onEdit = () => {
    setIsEditing(true);
  };

  return isEditing ? (
    <AddressForm address={address} onCancel={onCancel} />
  ) : (
    <AddressCard address={address} onEdit={onEdit} />
  );
};
export default AddressCardWrapper;
