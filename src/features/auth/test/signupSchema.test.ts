import { signupSchema } from "@/validators";

describe("signup", () => {
  it("should return errors if all fields are empty", () => {
    const result = signupSchema.safeParse({
      name: "",
      email: "",
      password: "",
    });
    expect(result.success).toBe(false);
  });
  it("should return valid if all fields are provided", () => {
    const result = signupSchema.safeParse({
      name: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});
