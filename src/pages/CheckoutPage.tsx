import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const countryCode = {
  US: "United States",
  IN: "India",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  CN: "China",
  JP: "Japan",
  BR: "Brazil",
  RU: "Russia",
  ZA: "South Africa",
  IT: "Italy",
  ES: "Spain",
  MX: "Mexico",
  KR: "South Korea"
} as const;

type CountryCodeKey = keyof typeof countryCode;
const countryCodes = Object.keys(countryCode) as CountryCodeKey[];

//TODO: Add validation using zod or similar library
type FormData = {
  countryCode: CountryCodeKey;
  fullName: string;
  pinCode: string;
  phoneNumber: string;
  address: string;
};

const CheckoutPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log("Form Data Submitted:", data);
  });

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={onSubmit}>
      <label htmlFor="country-code">Country Code</label>
      <input type="text" placeholder="Enter country code" list="country" {...register("countryCode")} />
      <datalist id="country">
        {countryCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </datalist>
      <label htmlFor="full-name">Full Name</label>
      <input type="text" placeholder="Enter full name" {...register("fullName")} />

      <label htmlFor="pin-code">PIN Code</label>
      <input type="text" placeholder="6 digits [0-9] PIN code" {...register("pinCode")} />

      <label htmlFor="phone-number">Phone Number</label>
      <input type="text" placeholder="Enter phone number" {...register("phoneNumber")} />

      <label htmlFor="address">Address</label>
      <input type="text" placeholder="Enter address" {...register("address")} />

      <Button disabled={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CheckoutPage;
