"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signInGoogle } from "@/packages/auth/src/auth-client";
import { useState, type ComponentProps } from "react";
import { Google } from "./icons/google";
import { Input } from "./ui/input";
import { redirect } from "next/navigation"; // Keep for login redirect
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

// Basic email validation function
const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [showPasswordAndTos, setShowPasswordAndTos] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tosAccepted, setTosAccepted] = useState(false);

  const handleContinue = () => {
    setErrorContent(""); // Clear previous errors
    if (!isValidEmail(email)) { // Relies on the button being enabled by valid email
      setErrorContent("Please enter a valid email address.");
      return;
    }
    setShowPasswordAndTos(true);
  };

  const handleSignUp = () => {
    setErrorContent(""); // Clear previous errors

    if (!isValidEmail(email)) {
      setErrorContent("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorContent("Please enter a password.");
      return;
    }
    if (password !== repeatPassword) {
      setErrorContent("Passwords do not match.");
      return;
    }
    if (!tosAccepted) {
      setErrorContent("You must accept the Terms and Conditions to continue.");
      return;
    }

    // If all validations pass:
    console.log("Sign up attempt with:", { email, password, tosAccepted });
    // TODO: Add your actual sign-up logic here (e.g., API call)
    alert("Sign up successful (check console for details)!"); // Placeholder for success
  };

  // Determine if the sign-up button should be disabled
  const isSignUpButtonDisabled = 
    !password || 
    !repeatPassword || 
    password !== repeatPassword || 
    !tosAccepted;

  return (
    <div className={cn("flex flex-col gap-0 size-full items-center justify-center", className)} {...props}>
      <Card className="gap-6 w-full pb-0">
        <CardHeader>
          <div className="flex flex-row justify-start items-center -mx-6 border-b">
            <Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
              <Link href={`/login`}>
                <ArrowLeft/>
                Log In
              </Link>
            </Button>
          </div>
          <div className="gap-2 pt-6">
            <CardTitle className="text-center whitespace-nowrap overflow-none">Sign up for Nimbus.storage</CardTitle>
            <CardDescription className="text-center">{!showPasswordAndTos ? "Let's create your Nimbus storage account" : "Let's secure your account"}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col gap-4 px-4 pb-6">
            
            {/* log in with Google */}
            {!showPasswordAndTos &&
              <>
                <Button variant="outline" className="w-full justify-between shadow-lg transition-all duration-250 shadow-blue-600/10 hover:shadow-blue-600/20" onClick={signInGoogle}>
                  <Google />
                  Log in with Google
                  <div className="w-[0.98em]" /> {/* For Text centering */}
                </Button>
                <div className="text-center text-muted-foreground text-sm">OR</div>
              </>
            }
            
            {/* login with email */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col gap-0.5 w-full">
                <div className="font-semibold text-sm text-muted-foreground pl-1">Email</div>
                <Input 
                  placeholder="you@example.com" 
                  type="email" 
                  className="placeholder:text-sm shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={showPasswordAndTos} // Optionally disable email after continuing
                />
              </div> 
              
              {/* Email validation error display (only if password section is NOT shown) */}
              {!showPasswordAndTos && errorContent && (
                <div className="w-full text-sm text-red-500 pl-1 -mt-2 mb-1">{errorContent}</div>
              )}
              
              {/* Continue Button - Conditionally Rendered */}
              {!showPasswordAndTos && (
                <div className="w-full mt-1">
                  <style>
                    {`.animate-bounce-subtle { animation: bounce-subtle 2.5s infinite; } @keyframes bounce-subtle { 0%, 100% { transform: translateY(-1.5px); } 50% { transform: translateY(3.5px); } }`}
                  </style>
                  <Button
                    className="w-full cursor-pointer font-semibold group"
                    onClick={handleContinue}
                    disabled={!email || !isValidEmail(email)} // Disable if email is empty or invalid
                  >
                    Continue
                    <ArrowDown className={cn("absolute translate-x-11", isValidEmail(email) && "animate-bounce-subtle")} />
                  </Button>
                </div>
              )}

              {/* Conditionally render Password, TOS, and Sign Up button */}
              {showPasswordAndTos && (
                <>
                  {/* Password Section */}
                  <div className="flex flex-col w-full gap-3">
                    <Button >
                      Go Back
                    </Button>
                    <Separator  className="mt-2"/>
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="font-semibold text-sm text-muted-foreground pl-1">Password</div>
                      <Input 
                        placeholder="password" 
                        type="password" 
                        className="text-2xl tracking-wider text-primary/75 placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-sm shadow-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="font-semibold text-sm text-muted-foreground pl-1">Repeat Password</div>
                      <Input 
                        placeholder="repeat password" 
                        type="password" 
                        className="text-2xl tracking-wider text-primary/75 placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-sm shadow-md"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* TOS compliance section */}
                  <div className="flex flex-row w-full items-center">
                    <Label className="flex items-start gap-3 w-full rounded-lg border p-3 hover:border-neutral-500 hover:bg-neutral-800 has-[[aria-checked=true]]:border-neutral-600 has-[[aria-checked=true]]:bg-neutral-800 transition-all duration-200">
                      <Checkbox
                        id="tos-checkbox"
                        className="data-[state=checked]:border-neutral-600 data-[state=checked]:bg-neutral-600 data-[state=checked]:text-white dark:data-[state=checked]:border-neutral-700 dark:data-[state=checked]:bg-neutral-700 "
                        checked={tosAccepted}
                        onCheckedChange={(checked) => setTosAccepted(checked === true)}
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          Accept Terms and conditions
                        </p>
                        <p className="text-muted-foreground text-sm">
                        Check this box if you have read and agree with the terms of service and privacy policy
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  {/* Sign Up Button - Conditionally Rendered */}
                  <div className="w-full mt-1">
                    {/* Error display for password/TOS/signup (only if password section IS shown) */}
                    {errorContent && (
                      <div className="pl-1 mb-2 font-semibold text-sm text-red-500 ">{errorContent}</div>
                    )}
                    <Button 
                      onClick={handleSignUp} 
                      disabled={isSignUpButtonDisabled} 
                      className="w-full cursor-pointer font-semibold"
                    >
                      Sign Up
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm text-neutral-600">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 cursor-pointer whitespace-nowrap">
          terms of service
        </Link>
        .
      </div>
    </div>
  );
}