// Contact-form rules shared by the browser (instant feedback) and the API route (authoritative).

export const CONTACT_FIELDS = ["name", "phone", "email", "service", "location", "destination", "details"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactInput = Record<ContactField, string>;
export type ContactErrorCode = "required" | "phone" | "email" | "tooLong";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

const REQUIRED: ContactField[] = ["name", "phone", "service", "location"];

const MAX_LENGTH: Record<ContactField, number> = {
  name: 80,
  phone: 30,
  email: 120,
  service: 80,
  location: 300,
  destination: 300,
  details: 1500,
};

/** Accepts local (05XXXXXXXX) and international (+966…, 00966…) formats with common separators. */
export function isValidPhone(value: string) {
  const compact = value.replace(/[\s\-().]/g, "");
  if (!/^(\+|00)?\d+$/.test(compact)) return false;
  const digits = compact.replace(/^(\+|00)/, "");
  return digits.length >= 8 && digits.length <= 15;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContact(raw: Partial<Record<string, unknown>>): ContactInput {
  const out = {} as ContactInput;
  for (const field of CONTACT_FIELDS) {
    const value = raw[field];
    out[field] = typeof value === "string" ? value.trim() : "";
  }
  return out;
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const value = input[field];
    if (!value) {
      if (REQUIRED.includes(field)) errors[field] = "required";
      continue;
    }
    if (value.length > MAX_LENGTH[field]) errors[field] = "tooLong";
    else if (field === "phone" && !isValidPhone(value)) errors.phone = "phone";
    else if (field === "email" && !EMAIL.test(value)) errors.email = "email";
  }
  return errors;
}

export const isRequired = (field: ContactField) => REQUIRED.includes(field);
export const maxLengthOf = (field: ContactField) => MAX_LENGTH[field];
