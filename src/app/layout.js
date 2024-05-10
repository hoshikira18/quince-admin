"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {MedusaProvider, useAdminGetSession} from "medusa-react";
import {MantineProvider} from "@mantine/core";
import {QueryClient} from "@tanstack/react-query";
const queryClient = new QueryClient()
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const Page = ({children}) => {

  return (
      <MedusaProvider queryClientProviderProps={{client: queryClient}}
                      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}
      >
          <MantineProvider>
                {children}
          </MantineProvider>
      </MedusaProvider>
  )
}

export default function RootLayout({ children }) {


    return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
      <Page>
          {children}
      </Page>
      </body>
    </html>
  );
}
