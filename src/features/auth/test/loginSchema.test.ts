import { loginSchema, signupSchema } from "@/validators";

describe("login", () => {
  it("should return errors  if email and password are empty", () => {
    const result = loginSchema.safeParse({ email: "", password: "" });
    expect(result.success).toBe(false);
  });
  it("should return valid if email and password are provided", () => {
    const result = loginSchema.safeParse({
      email: "test@gmail.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
  it("should return errors if password is less than 8 characters", () => {
    const result = loginSchema.safeParse({
      email: "test@gmail.com",
      password: "11",
    });
    expect(result.success).toBe(false);
  });
});
