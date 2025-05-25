"use client";

import { FileBrowser } from "components/file-browser";
import { Header } from "components/header";
import { Sidebar } from "components/sidebar";
import { UploadButton } from "components/upload-button";
import { authClient } from "@/packages/auth/src/auth-client";
import { redirect } from "next/navigation";

const session = authClient.getSession();

if (!session) {
  redirect("/login");
}

export default function DrivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">My Files</h1>
            <UploadButton />
          </div>
          <FileBrowser />
        </main>
      </div>
    </div>
  );
}
