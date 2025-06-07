"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signInGoogle } from "@/packages/auth/src/auth-client"; // Assuming this handles Google sign-in
import { useState, type ComponentProps } from "react"; // Added useState
import { Google } from "./icons/google";
import { Input } from "./ui/input";
import { ArrowLeft, ArrowRight, Eye, EyeClosed } from "lucide-react"; // Added Eye, EyeClosed

// Basic email validation function (similar to SignupForm)
const isValidEmail = (email: string): boolean => {
  // A simple regex for email validation
  return /\S+@\S+\.\S+/.test(email);
};

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setErrorContent(""); // Clear previous errors

    if (!isValidEmail(email)) {
      setErrorContent("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorContent("Please enter a password.");
      return;
    }

    // If all validations pass:
    console.log("Login attempt with:", { email }); // Password intentionally not logged for security best practice in client console
    // TODO: Add your actual login logic here (e.g., API call to your backend)
    // Example of what you might do:
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Handle successful login, e.g., redirect to dashboard
    //     // import { useRouter } from 'next/navigation'; const router = useRouter(); router.push('/dashboard');
    //     alert("Login successful (placeholder)!");
    //   } else {
    //     setErrorContent(data.message || "Login failed. Please check your credentials.");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   setErrorContent("An unexpected error occurred. Please try again.");
    // }
    alert("Login form submitted (check console for email). Implement actual login logic."); // Placeholder
  };

  // Determine if the login button should be disabled
  const isLoginButtonDisabled = !email || !isValidEmail(email) || !password;

  return (
    <div className={cn("flex flex-col gap-0 size-full items-center justify-center select-none", className)} {...props}>
      <Card className="gap-6 w-full pb-0">
        <CardHeader>
          <div className="flex flex-row justify-between items-center -mx-6 border-b gap-0">
            <Button className="pl-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
              <Link href={`/`}>
                <ArrowLeft />
                Go back
              </Link>
            </Button>
            <Button className="pr-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
              <Link href={`/signup`}>
                Sign Up
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="gap-2 pt-6">
            <CardTitle className="text-center whitespace-nowrap overflow-none">Welcome back to Nimbus.storage</CardTitle>
            <CardDescription className="text-center">You do the files, we store them.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col gap-4 px-4 pb-6"> {/* This div handles overall padding and structure */}
            <div className={cn(
                "flex-col w-full justify-center items-center p-3 border rounded-md bg-orange-400/40",
                // "flex", // Show notice
                "hidden", // Hide notice
              )}>
              <div className="font-semibold">Notice:</div>
              <div>We are currently experiencing increased usage. Some logins may be throttled.</div>
            </div>
            
            
            {/* log in with Google */}
            <Button
              variant="outline"
              type="button" // Ensures this button doesn't submit the form
              className="w-full justify-between shadow-lg transition-all duration-250 shadow-blue-600/10 hover:shadow-blue-600/20"
              onClick={signInGoogle} // Assumes signInGoogle handles its own logic
            >
              <Google />
              Log in with Google
              <div className="w-[0.98em]" /> {/* For Text centering */}
            </Button>

            <div className="text-center text-muted-foreground text-sm">OR</div>

            {/* login with email form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5 w-full">
                <div className="font-semibold text-sm text-muted-foreground pl-1">Email</div>
                <Input
                  placeholder="example@0.email"
                  type="email"
                  className="placeholder:text-sm shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-0.5 w-full">
                <div className="font-semibold text-sm text-muted-foreground pl-1">Password</div>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    placeholder="password"
                    type={isPasswordVisible ? "text" : "password"}
                    className="text-2xl tracking-wider text-primary/75 placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-sm shadow-md flex-grow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button" // Prevents form submission
                    onClick={togglePasswordVisibility}
                    className="shrink-0" // Prevents button from shrinking
                  >
                    {!isPasswordVisible ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Error display */}
              {errorContent && (
                <div className="w-full text-sm text-red-500 pl-1 -mt-2 mb-1 font-medium">
                  {errorContent}
                </div>
              )}

              <div className="w-full mt-1">
                <Button type="submit" className="w-full cursor-pointer font-semibold" disabled={isLoginButtonDisabled}>
                  Log in
                </Button>
                <div className="flex flex-row w-full justify-end items-center pt-1 pr-1">
                  <Link href="/password-reset" className="whitespace-nowrap transition duration-200 text-muted-foreground hover:text-primary text-sm">
                    Reset password
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm text-neutral-600">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 cursor-pointer whitespace-nowrap">
          terms of service
        </Link>
        .
      </div>
    </div>
  );
}