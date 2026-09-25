import SideBar from "./components/sidebar";
import "./globals.css";

export const metadata = {
  title: "FluxLabs",
  description: "Overlapping books",
  icons: {
    icon: "/icon.png"
  },
};

export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      {/*-----------------------[siide bar]----------------------------*/}
      <body className="flex">
        <SideBar />
        <main className="flex-1">{children}</main>
      </body>

      

    </html>
  );
}