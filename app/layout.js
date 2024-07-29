import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Payglocal Assignment",
  description: "Assignment developed for front-end interview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="flex flex-col min-h-screen">
          <header className="bg-black text-white h-[80px] flex items-center justify-center  fixed w-full z-10 ">
          </header>
          <div className="flex flex-grow overflow-hidden   pt-[80px]">
            <aside className="bg-black text-white w-[5%]  fixed left-0 h-full z-10 flex  items-center flex-col">
              <div className="basis-[50%]  flex flex-col space-y-10 ">
                <img src="/gallary.svg" className="w-10 h-10" />
                <img src="/meta.svg" className="w-10 h-10" />
                <img src="/shopify.svg" className="w-10 h-10" />
              </div>
              <div className=" basis-[50%]   flex justify-center items-center">
                <img src="/settings.svg" className="w-10 h-10" />

              </div>

            </aside>
            <main className="flex-grow overflow-auto ml-[5%] py-[20px] px-[20px]">
              {children}
            </main>
          </div>
          <footer className="bg-black text-white h-[80px] flex items-center justify-center  fixed bottom-0 w-full z-10">
          </footer>
        </div>

      </body>
    </html>
  );
}
