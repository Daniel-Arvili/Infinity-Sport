"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function Contactus() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsMessageSent(true);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  return (
    <div className="py-4 px-1 sm:p-4 rounded-lg shadow-md flex dark:shadow-gray-800 dark:shadow-xl w-full">
      <div className="w-1/2 sm:pr-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xs sm:text-sm text-naivyBlue dark:text-gray-400">
              First Name:
            </label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-xs sm:text-sm text-naivyBlue dark:text-gray-400">
              Last Name:
            </label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {formErrors.lastName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-xs sm:text-sm text-naivyBlue dark:text-gray-400">
              Email:
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-xs sm:text-sm text-naivyBlue dark:text-gray-400">
              Your message...
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        </form>
        {isMessageSent && (
          <p className="text-green-600 mt-2">Message sent successfully!</p>
        )}
      </div>

      <div className="w-px bg-gray-300 sm:mx-2 mx-1" />

      <div className="w-1/2 pl-2 bg-contact-us bg-cover dark:grayscale rounded-r-md text-naivyBlue ">
        <div className="text-md text-center sm:text-lg font-medium mb-4 dark:text-black">
          Ways of Contact us
        </div>
        <ul className="text-xs sm:text-sm text-center space-y-2 dark:text-gray-700">
          <li>
            <a href="mailto:InfinitySport@gmail.com">InfinitySport@gmail.com</a>
          </li>
          <li>
            <a href="tel:1-800-207-777">1-800-207-777</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
